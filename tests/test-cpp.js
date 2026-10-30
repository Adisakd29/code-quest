/**
 * test-cpp.js — ตรวจคุณภาพเนื้อหาหลักสูตร C++ ก่อนใช้งาน
 *
 *  1. โครงสร้างข้อมูลครบ (คำใบ้ 3 ขั้น, XP อยู่ในช่วงเดิม, มีกรณีทดสอบ, ข้อสอบถูกรูปแบบ)
 *  2. คอมไพล์เฉลยทุกข้อด้วย Clang จริง (-std=c++20 -Wall -Wextra) → ต้องผ่านทุกกรณี (แสดง+ซ่อน) และทุก require
 *  3. คำตอบผิดที่เตรียมไว้ + โค้ดตั้งต้น ต้อง "ไม่ผ่าน" (พิสูจน์ว่า hidden tests กันคำตอบตายตัวได้ และโจทย์ไม่ง่ายเกินไป)
 *  4. เฉลยต้องไม่ใช้เนื้อหาที่ยังไม่ได้สอน (prerequisite) และไม่มีคำเตือนจากคอมไพเลอร์
 *  5. ชนิดโจทย์ไม่ซ้ำติดกันเกิน 2 ข้อ · ชื่อ/กรณีทดสอบ/คำโจทย์ไม่ซ้ำกัน
 * ใช้ worker threads คอมไพล์พร้อมกันหลายตัว (คอมไพเลอร์ใช้เวลา ~4 วินาทีต่อครั้ง)
 */
const { Worker, isMainThread, parentPort } = require("worker_threads");
process.removeAllListeners("warning");
const path = require("path");
const os = require("os");
const fs = require("fs");

/** ใช้ engine เดียวกันตรวจทุกหลักสูตรที่คอมไพล์ด้วย Clang: --lang=cpp (ค่าเริ่มต้น) หรือ --lang=c (C v2 · C17) */
const COMMON = ["-O1", "-Wall", "-Wextra", "-Wl,--max-memory=67108864", "-Wl,-z,stack-size=1048576"];
const arg = name => (process.argv.find(a => a.startsWith("--" + name + "=")) || "").slice(name.length + 3);
const LANG = arg("lang") || "cpp";
const PROFILES = {
  // ลำดับ flags ของ C++ ต้องเหมือนเดิมทุกตัว — เป็นส่วนหนึ่งของ key ใน cache (เปลี่ยนแล้วต้องคอมไพล์ใหม่ทั้งหมด)
  cpp: { label: "C++", driver: "clang++", flags: ["-std=c++20", "-O1", "-Wall", "-Wextra", "-fno-exceptions", "-Wl,--max-memory=67108864", "-Wl,-z,stack-size=1048576"], main: "main.cpp", course: "../public/courses/cpp.js", sols: "./sols-cpp.js" },
  c: { label: "C (v2)", driver: "clang", flags: ["-x", "c", "-std=c17", "-Wpedantic", ...COMMON], main: "main.c", course: "../public/courses/c2.js", sols: "./sols-c2.js" },
};
const PROFILE = PROFILES[LANG];
const FLAGS = PROFILE.flags;
// บทที่ระบุ compiler: "c23" (เช่น Bonus Modern C) คอมไพล์ด้วย -std=c23 · บทอื่นใช้มาตรฐานของหลักสูตร
const flagsFor = t => (t && t.compiler === "c23") ? FLAGS.map(f => f === "-std=c17" ? "-std=c23" : f) : FLAGS;
const norm = s => String(s || "").replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");

if (!isMainThread) {
  // ── worker: คอมไพล์ + รันทุกกรณีทดสอบ ──
  const { WASI } = require("node:wasi");
  let clang = null;
  const runProgram = (wasm, stdin, dataFiles) => new Promise(resolve => {
    // รันใน worker ย่อยพร้อมจำกัดเวลา (กันลูปไม่รู้จบในคำตอบผิด)
    const w = new Worker(`
      const { parentPort, workerData } = require("worker_threads");
      const { WASI } = require("node:wasi"); const fs = require("fs"), os = require("os"), path = require("path");
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cqrun-"));
      fs.writeFileSync(path.join(dir, "in"), workerData.stdin);
      const fin = fs.openSync(path.join(dir, "in"), "r"), fout = fs.openSync(path.join(dir, "out"), "w"), ferr = fs.openSync(path.join(dir, "err"), "w");
      fs.mkdirSync(path.join(dir, "data"));
      for (const [name, text] of Object.entries(workerData.dataFiles || {})) fs.writeFileSync(path.join(dir, "data", name), text);
      let crash = "", code = 0;
      (async () => {
        try {
          const wasi = new WASI({ version: "preview1", stdin: fin, stdout: fout, stderr: ferr, returnOnExit: true, preopens: { "/data": path.join(dir, "data") } });
          const inst = await WebAssembly.instantiate(await WebAssembly.compile(workerData.wasm), { wasi_snapshot_preview1: wasi.wasiImport });
          code = wasi.start(inst);
        } catch (e) { crash = String(e.message || e); }
        fs.closeSync(fout); fs.closeSync(ferr);
        parentPort.postMessage({ out: fs.readFileSync(path.join(dir, "out"), "utf8"), crash, code });
        fs.rmSync(dir, { recursive: true, force: true });
      })();`, { eval: true, workerData: { wasm, stdin, dataFiles }, execArgv: ["--no-warnings"] });
    const t = setTimeout(() => { w.terminate(); resolve({ out: "", timeout: true }); }, 5000);
    w.on("message", m => { clearTimeout(t); w.terminate(); resolve(m); });
    w.on("error", e => { clearTimeout(t); resolve({ out: "", crash: String(e) }); });
  });
  parentPort.on("message", async job => {
    if (!clang) clang = await import("@yowasp/clang");
    let diag = "";
    const cap = b => { if (b) diag += new TextDecoder().decode(b); };
    let files;
    const MF = require("../public/cpp/multifile.js");
    const srcFiles = MF.split(job.code, job.main);
    const units = MF.sources(srcFiles), extra = [];
    if (job.memcheck) {
      const MC = require("../public/cpp/memcheck.js");
      srcFiles["cq_memcheck.h"] = MC.header;
      srcFiles["cq_memcheck.c"] = MC.source;
      units.push("cq_memcheck.c");
      extra.push("-include", "cq_memcheck.h");
    }
    try { files = await clang.runClang([job.driver, ...job.flags, ...extra, ...units, "-o", "prog"], srcFiles, { stdout: cap, stderr: cap }); }
    catch { return parentPort.postMessage({ id: job.id, compiled: false, diag }); }
    const results = [];
    for (const t of job.tests) {
      const r = await runProgram(files.prog, t.in || "", t.files);
      results.push({ ok: !r.timeout && !r.crash && !r.code && norm(r.out) === norm(t.out), got: norm(r.out), timeout: r.timeout, crash: r.crash });
    }
    parentPort.postMessage({ id: job.id, compiled: true, warnings: diag.trim(), results });
  });
  return;
}

// ── main ──
(async () => {
  const CPP = require(arg("course") ? path.resolve(arg("course")) : PROFILE.course);
  const SOL = require(arg("sols") ? path.resolve(arg("sols")) : PROFILE.sols);
  const TestGen = require("../public/cpp/testgen.js");
  const pkgVer = require("../node_modules/@yowasp/clang/package.json").version;
  const rtVer = (fs.readFileSync(path.join(__dirname, "../public/cpp/cpp-runtime.js"), "utf8").match(/const VER = "([^"]+)"/) || [])[1];
  let bad = 0;
  const fail = m => { bad++; console.log("❌ " + m); };
  if (LANG === "cpp" && pkgVer !== rtVer) fail("เวอร์ชันคอมไพเลอร์ไม่ตรง: package " + pkgVer + " · cpp-runtime.js " + rtVer);

  // 1) โครงสร้าง + prerequisite + ความหลากหลาย + ความซ้ำ
  const FORBID_ALL = [[/\bthrow\b|\btry\b|\bcatch\b/, "exception (ตัวรันไม่รองรับ)"]];
  /** แนวคิด → [regex, index ของบทที่เริ่มสอน, ชื่อ] — เฉลยและโค้ดตั้งต้นต้องไม่ใช้ก่อนถึงบทนั้น */
  const PREREQ = LANG === "c" ? (CPP.prereq || []).map(([re, at, name]) => [new RegExp(re, "m"), at, name]) : [
    [/\bstd::cin\b/, 1, "std::cin"], [/\bsetprecision\b|\bsetw\b/, 1, "iomanip"], [/\bstatic_cast\b/, 3, "static_cast"], [/\bboolalpha\b/, 3, "boolalpha"],
    [/\b(if|else|switch)\b/, 4, "if/switch"], [/\b(for|while|do)\b/, 5, "ลูป"], [/\blong long\b/, 5, "long long"],
    [/^\s*(?:int|void|double|bool|char|long long|std::string)\s+(?!main\b)\w+\s*\([^)]*\)\s*\{/m, 6, "ฟังก์ชันที่เขียนเอง"],
    [/\w\s*&\s*\w+\s*[,)]/, 7, "reference parameter"], [/\w+\s*\[\s*\d*\s*\]\s*(=|;|\{)/, 8, "อาร์เรย์"], [/\bstd::getline\b/, 9, "getline"],
    [/\b(?:int|double|char|bool|const int|const char|std::string)\s*\*\s*\w+/, 10, "พอยน์เตอร์"], [/\bnew\b|\bdelete\b|unique_ptr|make_unique/, 11, "หน่วยความจำไดนามิก/smart pointer"],
    [/\bclass\b|\bstruct\b/, 12, "class/struct"], [/\bvirtual\b|\boverride\b|\bprotected\b/, 14, "inheritance/virtual"],
    [/\bstd::vector\b|\bstd::deque\b|\bstd::list\b|\bstd::array\b/, 16, "sequence container"],
    [/\bstd::(?:stack|queue|priority_queue|unordered_set)\b/, 17, "container adapter/unordered"],
    [/\btemplate\s*<|\brequires\b|\bconcept\b/, 21, "template/concept"],
    [/\bstd::(?:sort|accumulate|count_if|transform|lower_bound|binary_search|unique|max_element|min_element)\b|\[[=&]?\]\s*\(/, 18, "STL algorithm/lambda"], [/\bstd::(map|set|unordered_map)\b/, 17, "associative container"],
  ];
  const jobs = [], titles = new Map(), sigs = new Map(), descs = [], projects = {};
  let codeCount = 0, quizCount = 0, qCount = 0;
  CPP.topics.forEach((t, ti) => {
    if (!Array.isArray(t.lesson) || t.lesson.length < 3) fail(t.id + ": บทเรียนควรมีอย่างน้อย 3 ส่วน");
    let lastKind = null, run = 0;
    t.stages.forEach((s, si) => {
      const key = t.id + "/" + si;
      if (s.quiz) {
        quizCount++; qCount += s.quiz.length;
        s.quiz.forEach((q, qi) => {
          const where = key + " ข้อ " + (qi + 1);
          if (q.t === "mc" && !(Array.isArray(q.c) && q.a >= 0 && q.a < q.c.length && new Set(q.c).size === q.c.length)) fail(where + ": ปรนัยต้องมีตัวเลือกไม่ซ้ำและเฉลยอยู่ในช่วง");
          if (q.t === "tf" && typeof q.a !== "boolean") fail(where + ": ถูก/ผิดต้องมีเฉลย true/false");
          if (q.t === "fill" && !(Array.isArray(q.a) && q.a.length)) fail(where + ": เติมคำต้องมีคำตอบที่รับได้");
          if (q.t === "order" && !(Array.isArray(q.items) && q.items.length >= 3)) fail(where + ": เรียงลำดับต้องมีอย่างน้อย 3 รายการ");
          if (!q.e) fail(where + ": ควรมีคำอธิบายเฉลย");
          // ทำนายผลลัพธ์: คอมไพล์ + รันโค้ดจริง ผลต้องตรงกับตัวเลือกที่เป็นเฉลยเท่านั้น
          if (q.src && q.compileOnly) {   // อ่านโค้ด: โค้ดที่ให้อ่านต้องคอมไพล์ผ่านและไม่มีคำเตือน
            jobs.push({ id: where + "#reading", key, role: "reading", code: q.src, tests: [], driver: PROFILE.driver, flags: flagsFor(t), main: PROFILE.main });
          } else if (q.src) {
            if (q.t !== "mc") fail(where + ": ด่านทำนายผลต้องเป็นปรนัย");
            // หลักสูตร C ใช้ · แทนช่องว่างในตัวเลือกให้อ่านง่าย (ระบุไว้ในคำถาม) — แปลงกลับเฉพาะ C เพื่อไม่ให้ key ของ cache C++ เปลี่ยน
            const asOut = c => { const o = String(c).replace(/<[^>]+>/g, "").replace(/ ⏎ /g, "\n"); return LANG === "c" ? o.replace(/·/g, " ") : o; };
            jobs.push({ id: where + "#predict", key, role: "predict", code: q.src, tests: [{ in: "", out: asOut(q.c[q.a]) }], driver: PROFILE.driver, flags: flagsFor(t), main: PROFILE.main,
              others: q.c.filter((_, k) => k !== q.a).map(asOut) });
          }
        });
        return;
      }
      codeCount++;
      for (const f of ["title", "desc", "goal", "starter", "kind"]) if (!s[f]) fail(key + ": ไม่มี " + f);
      if (!(Array.isArray(s.hints) && s.hints.length === 3)) fail(key + ": ต้องมีคำใบ้ 3 ขั้น");
      if (!(s.xp >= 30 && s.xp <= 150)) fail(key + ": XP " + s.xp + " อยู่นอกช่วงเดิมของเกม (30–150)");
      if (!(Array.isArray(s.tests) && s.tests.length)) fail(key + ": ไม่มีกรณีทดสอบ");
      const needsHidden = s.tests.some(x => x.in);
      if (needsHidden && !s.tests.some(x => x.hidden)) fail(key + ": โจทย์ที่รับ input ต้องมีกรณีซ่อน");
      s.tests.filter(x => x.hidden && !x.label).forEach(() => fail(key + ": กรณีซ่อนต้องมี label อธิบายกรณี"));
      run = s.kind === lastKind ? run + 1 : 1; lastKind = s.kind;
      if (run > 2 && s.kind !== "Capstone") fail(key + ": ชนิดโจทย์ \"" + s.kind + "\" ติดกันเกิน 2 ข้อ");
      if (titles.has(s.title)) fail(key + ": ชื่อซ้ำกับ " + titles.get(s.title)); titles.set(s.title, key);
      const sig = JSON.stringify(s.tests.map(x => [x.in, x.out]));
      if (sigs.has(sig)) fail(key + ": กรณีทดสอบซ้ำกับ " + sigs.get(sig)); sigs.set(sig, key);
      descs.push([key, new Set(s.desc.replace(/<[^>]+>/g, " ").split(/\s+/).filter(w => w.length > 1))]);
      const sol = SOL[key];
      if (!sol) return fail(key + ": ไม่มีเฉลยใน sols-cpp.js");
      for (const [re, what] of FORBID_ALL) if (re.test(sol.sol.replace(/"[^"]*"/g, '""')) || re.test(s.starter.replace(/"[^"]*"/g, '""'))) fail(key + ": ใช้ " + what);
      // มินิโปรเจกต์: ตอนต้องเรียงต่อกันและชื่อเดียวกันทั้งโปรเจกต์
      if (s.project) { const pj = projects[s.project.id] = projects[s.project.id] || []; pj.push({ key, ...s.project }); }
      const strip = c => c.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/\/\/.*$/gm, "");
      for (const [re, at, name] of PREREQ) if (ti < at && (re.test(strip(sol.sol)) || re.test(strip(s.starter)))) fail(key + ": ใช้ " + name + " ก่อนบทที่ " + (at + 1) + " ซึ่งเป็นบทที่สอน");
      // noComments ลบคอมเมนต์ทั้งหมด รวมถึงบรรทัดแบ่งไฟล์ "// === x.c ===" — regex ที่อ้างถึงบรรทัดนั้นจะผ่านเสมอหรือตกเสมอโดยไม่ได้ตรวจจริง
      for (const r of s.require || []) if (r.noComments && /\/\/\\s\*=\+/.test(r.re)) fail(key + ": require ใช้ noComments คู่กับการอ้างถึงบรรทัดแบ่งไฟล์ (บรรทัดนั้นถูกลบก่อนตรวจ) — " + r.msg);
      for (const r of s.require || []) if (!new RegExp(r.re, r.flags || "").test(r.noComments ? sol.sol.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "") : sol.sol)) fail(key + ": เฉลยไม่ผ่าน require (" + r.msg + ")");
      // Performance Challenge: สร้าง input จากตัวสร้างชุดเดียวกับที่เบราว์เซอร์ใช้
      // ไฟล์ใน /data: ของกรณีทดสอบ (x.files) หรือของด่าน (s.files)
      // (เพิ่ม files เฉพาะเมื่อมีจริง — key ของ cache จะได้ไม่เปลี่ยนสำหรับกรณีที่ไม่มีไฟล์)
      const tests = s.tests.map(x => Object.assign({}, x, x.gen ? { in: TestGen.make(x.gen) } : {}, (x.files || s.files) ? { files: x.files || s.files } : {}));
      if (s.tests.some(x => x.gen) && s.kind !== "Performance") fail(key + ": กรณีข้อมูลใหญ่ควรอยู่ในโจทย์ชนิด Performance");
      const base = { key, tests, require: s.require, driver: PROFILE.driver, flags: flagsFor(t), main: PROFILE.main, memcheck: !!s.memcheck, noWarnings: !!s.noWarnings };
      jobs.push(Object.assign({ id: key + "#sol", role: "sol", code: sol.sol }, base));
      (sol.wrong || []).forEach((w, wi) => jobs.push(Object.assign({ id: key + "#wrong" + wi, role: "wrong", code: w }, base)));
      jobs.push(Object.assign({ id: key + "#starter", role: "starter", code: s.starter }, base));
    });
  });
  for (const [id, parts] of Object.entries(projects)) {
    parts.forEach((p, i) => { if (p.part !== i + 1 || p.of !== parts.length || p.name !== parts[0].name) fail(p.key + ": มินิโปรเจกต์ " + id + " ตอน " + p.part + "/" + p.of + " ไม่ต่อเนื่องหรือชื่อไม่ตรงกัน"); });
  }
  for (let i = 0; i < descs.length; i++) for (let j = i + 1; j < descs.length; j++) {
    const a = descs[i][1], b = descs[j][1]; const inter = [...a].filter(x => b.has(x)).length;
    if (inter / Math.max(1, Math.min(a.size, b.size)) > 0.8 && Math.min(a.size, b.size) > 5) fail(descs[i][0] + " กับ " + descs[j][0] + ": คำโจทย์คล้ายกันมาก");
  }

  // 2–3) คอมไพล์และรันด้วย worker pool (จำผลของโค้ดที่ไม่เปลี่ยนไว้ใน cache)
  const crypto = require("crypto");
  const CACHE_FILE = path.join(os.tmpdir(), "cq-cpp-cache.json");
  let cache = {}; try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")); } catch {}
  const hashOf = j => crypto.createHash("sha1").update((j.flags || FLAGS).join(" ") + (j.memcheck ? " memcheck" : "") + "\0" + j.code + "\0" + JSON.stringify(j.tests)).digest("hex");
  const only = (process.argv.find(a => a.startsWith("--topic=")) || "").slice(8);
  const results = new Map();
  const todo = jobs.filter(j => {
    // --topic=บท หรือ --topic=บท/ลำดับ,บท/ลำดับ (เลือกได้หลายรายการ คั่นด้วย ,)
    if (only && !only.split(",").some(o => j.key === o || j.key.startsWith(o + "/"))) { results.set(j.id, "skip"); return false; }
    const c = cache[hashOf(j)]; if (c) { results.set(j.id, c); return false; } return true;
  });
  const N = Math.max(1, Math.min(4, os.cpus().length));
  const workers = Array.from({ length: Math.min(N, todo.length) }, () => new Worker(__filename, { execArgv: ["--no-warnings"] }));
  let next = 0;
  const t0 = Date.now();
  await Promise.all(workers.map(w => new Promise(resolve => {
    const feed = () => { if (next >= todo.length) { w.terminate(); return resolve(); } w.postMessage(todo[next++]); };
    w.on("message", m => { results.set(m.id, m); cache[hashOf(todo.find(j => j.id === m.id))] = m; feed(); });
    feed();
  })));
  try { fs.writeFileSync(CACHE_FILE, JSON.stringify(cache)); } catch {}
  let skipped = 0;
  for (const j of jobs) {
    const r = results.get(j.id);
    if (r === "skip") { skipped++; continue; }
    const reqOk = (j.require || []).every(x => new RegExp(x.re, x.flags || "").test(x.noComments ? j.code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "") : j.code));
    const passed = r.compiled && reqOk && r.results.every(x => x.ok) && !(j.noWarnings && r.warnings);
    if (j.role === "reading") {
      if (!r.compiled) fail(j.id + ": โค้ดของด่านอ่านโค้ดคอมไพล์ไม่ผ่าน\n   " + r.diag.split("\n").slice(0, 2).join("\n   "));
      else if (r.warnings) fail(j.id + ": โค้ดของด่านอ่านโค้ดมีคำเตือน — " + r.warnings.split("\n")[0]);
      continue;
    }
    if (j.role === "predict") {
      if (!r.compiled) fail(j.id + ": โค้ดของด่านทำนายผลคอมไพล์ไม่ผ่าน\n   " + r.diag.split("\n").slice(0, 2).join("\n   "));
      else if (!r.results[0].ok) fail(j.id + ": เฉลยไม่ตรงกับผลจริง — ผลจริงคือ " + JSON.stringify(r.results[0].got));
      else if (j.others.some(o => norm(o) === r.results[0].got)) fail(j.id + ": มีตัวเลือกอื่นที่ตรงกับผลจริงด้วย (คำตอบถูกมากกว่าหนึ่งข้อ)");
      else if (r.warnings) fail(j.id + ": โค้ดมีคำเตือนจากคอมไพเลอร์ — " + r.warnings.split("\n")[0]);
      continue;
    }
    if (j.role === "sol") {
      if (r.compiled && j.tests.some(t => t.gen)) r.results.forEach((x, i) => { if (j.tests[i].gen && x.timeout) fail(j.key + ": เฉลยช้าเกินกับข้อมูลใหญ่ (กรณีที่ " + (i + 1) + ")"); });
      if (!r.compiled) fail(j.key + ": เฉลยคอมไพล์ไม่ผ่าน\n   " + r.diag.split("\n").slice(0, 3).join("\n   "));
      else {
        r.results.forEach((x, i) => { if (!x.ok) fail(j.key + ": เฉลยไม่ผ่านกรณีที่ " + (i + 1) + (x.timeout ? " (หมดเวลา)" : x.crash ? " (" + x.crash + ")" : " ได้ " + JSON.stringify(x.got) + " ต้องการ " + JSON.stringify(norm(j.tests[i].out)))); });
        if (r.warnings) fail(j.key + ": เฉลยมีคำเตือนจากคอมไพเลอร์ — " + r.warnings.split("\n")[0]);
      }
    } else if (passed) fail(j.key + ": " + (j.role === "starter" ? "โค้ดตั้งต้นผ่านทุกกรณีโดยไม่ต้องแก้ (โจทย์ง่ายเกินไป)" : "คำตอบผิดชุดที่ " + j.id.slice(-1) + " กลับผ่าน — กรณีทดสอบยังไม่พอ"));
  }
  const wrongs = jobs.filter(j => j.role === "wrong").length;
  console.log("\nหลักสูตร " + PROFILE.label + ": " + CPP.topics.length + " บท · ด่านเขียนโค้ด " + codeCount + " · ข้อสอบ " + quizCount + " ชุด " + qCount + " ข้อ · กรณีทดสอบ " +
    jobs.filter(j => j.role === "sol").reduce((n, j) => n + j.tests.length, 0) + " · คำตอบผิดที่ถูกจับได้ " + wrongs + " · ด่านทำนายผลที่ยืนยันด้วยคอมไพเลอร์ " + jobs.filter(j => j.role === "predict").length + " · มินิโปรเจกต์ " + Object.keys(projects).length + " · ด่านอ่านโค้ด " + jobs.filter(j => j.role === "reading").length +
    " · คอมไพล์ใหม่ " + todo.length + "/" + jobs.length + " ครั้ง" + (skipped ? " (ข้าม " + skipped + " เพราะเลือกเฉพาะบท " + only + ")" : "") + " ใน " + Math.round((Date.now() - t0) / 1000) + " วินาที" + (bad ? " | พบปัญหา " + bad + " จุด" : " ✓"));
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
