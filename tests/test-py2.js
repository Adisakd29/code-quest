/**
 * test-py2.js — ตัวตรวจเนื้อหาหลักสูตร Python v2 (ต้องผ่าน 100% ก่อน deploy ทุก Phase)
 *
 * ใช้เครื่องรันชุดเดียวกับที่เซิร์ฟเวอร์ใช้ตรวจซ้ำ (lib/py-engine.js + public/py/harness.py + py-grade.js)
 *   1. โครงสร้าง: ID ขึ้นต้น py2- · บทเรียน ≥ 3 ส่วน · kind · hints 3 ขั้น · XP 30–150 · กรณีแสดง ≥ 1 และกรณีซ่อน ≥ 1
 *   2. เฉลยผ่านทุกกรณี · คำตอบผิดทุกชุดต้องไม่ผ่านอย่างน้อยหนึ่งกรณี (กันกรณีทดสอบไม่พอ) · starter ต้องไม่ผ่าน
 *   3. ตัวอย่างในบทเรียนรันได้จริง · ข้อทำนายผลรันแล้วตรงกับตัวเลือกที่เป็นเฉลยเท่านั้น
 *   4. Prerequisite ด้วย AST (เช่น ห้ามมี class ก่อนบท OOP) · import ได้เฉพาะ stdlib และโมดูลของโจทย์เอง
 *   5. โจทย์ซ้ำ · ล็อกลำดับด่านของบทที่ deploy แล้ว (tests/py2-ids.json · --lock เพื่ออัปเดตหลัง deploy)
 *
 * ใช้: node tests/test-py2.js [--course=path] [--sols=path] [--topic=py2-xxx] [--lock]
 */
"use strict";
const path = require("path");
const fs = require("fs");
const { PyEngine } = require("../lib/py-engine.js");
const G = require("../public/py/py-grade.js");
const TESTGEN = require("../public/cpp/testgen.js");

const arg = (k, d) => { const a = process.argv.find(x => x.startsWith("--" + k + "=")); return a ? a.slice(k.length + 3) : d; };
const COURSE_PATH = path.resolve(__dirname, "..", arg("course", "public/courses/py2.js"));
const SOLS_PATH = path.resolve(__dirname, "..", arg("sols", "tests/sols-py2.js"));
const ONLY = arg("topic", "");
const LOCK_PATH = path.resolve(__dirname, "..", arg("lockfile", "tests/py2-ids.json"));
const DEFAULT_TIMEOUT = 3000;

// ลำดับของ Stage ตาม Blueprint (ใช้กับกฎ prerequisite) — หัวข้อที่ไม่อยู่ในรายการ (เช่น fixture) ไม่ตรวจกฎนี้
const ORDER = ["py2-welcome", "py2-names", "py2-types", "py2-io", "py2-ops", "py2-convert", "py2-if", "py2-while", "py2-for", "py2-loopctl",
  "py2-str1", "py2-str2", "py2-list", "py2-tupleset", "py2-dict", "py2-choose", "py2-func", "py2-scope", "py2-firstclass", "py2-objmodel",
  "py2-except", "py2-files", "py2-modules", "py2-oop1", "py2-oop2", "py2-iter", "py2-deco", "py2-functools", "py2-stdlib", "py2-regex",
  "py2-typing", "py2-testing", "py2-algo", "py2-async", "py2-data", "py2-craft", "py2-perf"];
const stageNo = id => { const i = ORDER.indexOf(id); return i < 0 ? null : i + 1; };
// แนวคิด → Stage ที่เริ่มใช้ได้ (ตรงกับตาราง Prerequisite ใน Blueprint)
const RULES = [
  { feature: "def", from: 17, msg: "ใช้ def ก่อนบทฟังก์ชัน (Stage 17)" },
  { feature: "lambda", from: 19, msg: "ใช้ lambda ก่อน Stage 19" },
  { feature: "class", from: 24, msg: "ใช้ class ก่อนบท OOP (Stage 24)" },
  { feature: "yield", from: 26, msg: "ใช้ yield/generator ก่อน Stage 26" },
  { feature: "customDecorator", from: 27, msg: "ใช้ decorator (นอกจาก property/dataclass/staticmethod/classmethod/abstractmethod) ก่อน Stage 27" },
  { feature: "async", from: 34, msg: "ใช้ async/await ก่อน Stage 34" },
  { feature: "multiFile", from: 23, msg: "โจทย์หลายไฟล์ก่อนบทโมดูล (Stage 23)" },
  { feature: "comprehension", from: 16, msg: "ใช้ comprehension หรือ generator expression ก่อน Stage 16" },
];

const ANALYZER = String.raw`
import ast, json, sys
src = open("__src__.py", encoding="utf-8").read()
files = [l.strip() for l in src.splitlines() if l.strip().startswith("# ===") and l.strip().endswith("===")]
own = set()
for f in files:
    parts = f.split("===")[1].strip().split("/")
    own.add(parts[0].rsplit(".", 1)[0])    # โฟลเดอร์/ไฟล์ระดับบนสุด เช่น shop
    own.add(parts[-1].rsplit(".", 1)[0])   # ไฟล์ข้างในแพ็กเกจ เช่น tax (ไม่ใช่แพ็กเกจนอก stdlib)
feat = {"def": False, "lambda": False, "class": False, "yield": False, "customDecorator": False, "async": False, "comprehension": False, "multiFile": bool(files), "imports": [], "syntax": None}
OK_DECOS = {"property", "dataclass", "staticmethod", "classmethod", "abstractmethod", "setter", "getter", "deleter", "cache", "lru_cache", "total_ordering", "wraps"}
try:
    tree = ast.parse(src)
except SyntaxError as e:
    feat["syntax"] = str(e)
    tree = ast.Module(body=[], type_ignores=[])
for n in ast.walk(tree):
    if isinstance(n, ast.FunctionDef): feat["def"] = True
    if isinstance(n, (ast.AsyncFunctionDef, ast.Await, ast.AsyncFor, ast.AsyncWith)): feat["async"] = True; feat["def"] = feat["def"] or isinstance(n, ast.AsyncFunctionDef)
    if isinstance(n, ast.Lambda): feat["lambda"] = True
    if isinstance(n, (ast.ListComp, ast.SetComp, ast.DictComp, ast.GeneratorExp)): feat["comprehension"] = True
    if isinstance(n, ast.ClassDef):
        # ยกเว้นคลาส exception แบบง่าย (บทที่ 21 สอน custom exception ก่อน OOP): สืบจาก ...Error/...Exception และมีแค่ pass/docstring
        bases = [b.id if isinstance(b, ast.Name) else getattr(b, "attr", "") for b in n.bases]
        simple_body = all(isinstance(s, ast.Pass) or (isinstance(s, ast.Expr) and isinstance(getattr(s, "value", None), ast.Constant)) for s in n.body)
        if not (bases and all(str(b).endswith(("Error", "Exception")) for b in bases) and simple_body):
            feat["class"] = True
    if isinstance(n, (ast.Yield, ast.YieldFrom)): feat["yield"] = True
    if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
        for d in n.decorator_list:
            target = d.func if isinstance(d, ast.Call) else d
            name = target.attr if isinstance(target, ast.Attribute) else getattr(target, "id", "")
            if name not in OK_DECOS: feat["customDecorator"] = True
    if isinstance(n, ast.Import):
        feat["imports"] += [a.name.split(".")[0] for a in n.names]
    if isinstance(n, ast.ImportFrom) and n.level == 0 and n.module:
        feat["imports"].append(n.module.split(".")[0])
std = set(sys.stdlib_module_names)
feat["thirdParty"] = sorted({m for m in feat["imports"] if m not in std and m not in own})
print(json.dumps(feat))
`;

// ID ของบท Python เดิม (ใช้ตรวจ replaces / legacyEquivalent) — อ่านจากข้อมูลคอร์สเดียวกับเซิร์ฟเวอร์
const LEGACY_IDS = (() => { const P = require("../verify.js").COURSES.python; return (P.legacyTopics || P.topics).map(t => t.id); })();
const errors = [];
const fail = msg => errors.push(msg);
const engine = new PyEngine();

async function runTest(code, t, stage) {
  const input = t.gen ? TESTGEN.make(t.gen) : (t.in || "");
  const timeoutMs = stage.timeoutMs || DEFAULT_TIMEOUT;
  const r = await engine.run({ code, files: t.files || stage.files, test: Object.assign({}, t, { in: input }) }, timeoutMs);
  return G.judge(t, r, { timeoutMs });
}
async function passesAll(code, stage) {
  for (const t of stage.tests) { const v = await runTest(code, t, stage); if (!v.pass) return { pass: false, test: t, v }; }
  return { pass: true };
}
async function analyze(code) {
  const r = await engine.run({ code: ANALYZER, test: { in: "", files: { "__src__.py": code } } }, 5000);
  try { return JSON.parse(r.stdout); } catch { return null; }
}
const normTitle = s => String(s).toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "");

(async () => {
  const t0 = Date.now();
  const course = require(COURSE_PATH);
  const sols = fs.existsSync(SOLS_PATH) ? require(SOLS_PATH) : {};
  const topics = course.topics.filter(t => !ONLY || t.id === ONLY);
  if (!course.topics.length) {
    console.log("หลักสูตร Python v2: ยังไม่มีหัวข้อ (Phase 0) — ตรวจสายการทำงานด้วย test-py2-fixture.js ✓");
    await engine.close(); return;
  }
  await engine.warm();
  const lock = fs.existsSync(LOCK_PATH) ? JSON.parse(fs.readFileSync(LOCK_PATH, "utf8")) : {};
  const seenTitles = new Map(), seenTopicIds = new Set();
  let coding = 0, quizzes = 0, questions = 0, testsN = 0, hiddenN = 0, wrongCaught = 0, examples = 0, predicts = 0;

  for (const t of topics) {
    if (!/^py2-[a-z0-9-]+$/.test(t.id)) fail(t.id + ": ID ต้องขึ้นต้นด้วย py2- และเป็นตัวพิมพ์เล็ก");
    if (seenTopicIds.has(t.id)) fail(t.id + ": ID หัวข้อซ้ำ"); seenTopicIds.add(t.id);
    if (!Array.isArray(t.lesson) || t.lesson.length < 3) fail(t.id + ": บทเรียนควรมีอย่างน้อย 3 ส่วน");
    if (Array.isArray(course.worlds) && !t.world) fail(t.id + ": ยังไม่ได้กำหนด World (เพิ่มใน PY2.worlds) — ไม่เช่นนั้นจะไปอยู่กลุ่มบทเรียนรุ่นเดิมบนแผนที่");
    for (const k of ["replaces", "legacyEquivalent"]) {
      if (t[k] && !Array.isArray(t[k])) fail(t.id + ": " + k + " ต้องเป็นอาร์เรย์ของ ID บทเดิม");
      for (const id of t[k] || []) if (!LEGACY_IDS.includes(id)) fail(t.id + ": " + k + " อ้างถึงบทเดิมที่ไม่มีอยู่จริง \"" + id + "\"");
    }
    // ตัวอย่างในบทเรียนต้องรันได้จริง (ยกเว้นที่ระบุ noRun เช่น ตัวอย่างที่ตั้งใจให้ error)
    for (const [i, sec] of (t.lesson || []).entries()) {
      if (!sec.code || sec.noRun) continue;
      examples++;
      const r = await engine.run({ code: sec.code, test: { in: sec.stdin || "" } }, 4000);
      if (r.timeout || r.error) fail(t.id + " บทเรียนส่วนที่ " + (i + 1) + ": ตัวอย่างรันไม่ผ่าน — " + (r.timeout ? "timeout" : (r.errorType + ": " + String(r.error).trim().split("\n").pop())));
    }
    // prerequisite ของตัวอย่างในบทเรียน (ผู้เรียนเห็นโดยตรง) — ตรวจด้วยกฎเดียวกับเฉลย
    if (stageNo(t.id)) for (const [i, sec] of (t.lesson || []).entries()) {
      if (!sec.code || sec.noRun) continue;
      const f = await analyze(sec.code);
      if (f) for (const rule of RULES) if (f[rule.feature] && stageNo(t.id) < rule.from) fail(t.id + " บทเรียนส่วนที่ " + (i + 1) + ": ตัวอย่าง" + rule.msg);
    }
    // ล็อกลำดับด่าน: ด่านเดิมของบทที่ deploy แล้วต้องคงชื่อและลำดับ (ต่อท้ายได้)
    if (lock[t.id]) lock[t.id].forEach((title, i) => { if (!t.stages[i] || t.stages[i].title !== title) fail(t.id + "/" + i + ": ลำดับด่านเปลี่ยนจากที่ deploy แล้ว (เดิม \"" + title + "\") — ความคืบหน้าผูกกับลำดับ ห้ามแทรก ลบ หรือสลับ"); });
    // จำนวนด่านบังคับ (ไม่ใช่ bonus) ของบทที่ deploy แล้วห้ามเพิ่ม — ด่านใหม่ต้องเป็น bonus
    // ไม่เช่นนั้นผู้เรียนที่เคยผ่านบทครบจะกลายเป็น "ยังไม่ครบ" และถูกล็อกบทถัดไป
    const lockedRequired = (lock.__required__ || {})[t.id];
    const requiredNow = t.stages.filter(s => !s.bonus).length;
    if (lockedRequired !== undefined && requiredNow !== lockedRequired) fail(t.id + ": จำนวนด่านบังคับเปลี่ยนจาก " + lockedRequired + " เป็น " + requiredNow + " หลัง deploy — ด่านที่เพิ่มต้องมี bonus: true (ไม่เช่นนั้นผู้เรียนที่เคยผ่านบทครบจะถูกล็อกบทถัดไป)");
    { const fb = t.stages.findIndex(s => s.bonus); if (fb >= 0) t.stages.slice(fb).forEach((s, k) => { if (!s.bonus) fail(t.id + "/" + (fb + k) + ": ด่านปกติต้องอยู่ก่อนด่าน bonus ทั้งหมด"); }); }
    const sn = stageNo(t.id);

    for (const [si, s] of t.stages.entries()) {
      const key = t.id + "/" + si;
      const nt = normTitle(s.title);
      if (seenTitles.has(nt)) fail(key + ": ชื่อด่านซ้ำกับ " + seenTitles.get(nt)); else seenTitles.set(nt, key);
      if (!(s.xp >= 30 && s.xp <= 150)) fail(key + ": XP ต้องอยู่ระหว่าง 30–150");
      if (s.quiz) {
        quizzes++; questions += s.quiz.length;
        for (const [qi, q] of s.quiz.entries()) {
          const where = key + " ข้อ " + (qi + 1);
          if (q.t === "mc" && !(Array.isArray(q.c) && q.a >= 0 && q.a < q.c.length && new Set(q.c).size === q.c.length)) fail(where + ": ปรนัยต้องมีตัวเลือกไม่ซ้ำและเฉลยอยู่ในช่วง");
          if (!q.e) fail(where + ": ควรมีคำอธิบายเฉลย");
          if (q.src && q.lang === "python") {
            predicts++;
            const r = await engine.run({ code: q.src, test: { in: "" } }, 4000);
            const out = G.norm(r.stdout), want = G.norm(String(q.c[q.a]).replace(/ ⏎ /g, "\n"));
            if (r.error || r.timeout) fail(where + ": โค้ดของข้อทำนายผลรันไม่ผ่าน");
            else if (out !== want) fail(where + ": ผลจริงคือ " + JSON.stringify(out) + " ไม่ตรงกับเฉลย " + JSON.stringify(want));
            else q.c.forEach((c, ci) => { if (ci !== q.a && G.norm(String(c).replace(/ ⏎ /g, "\n")) === out) fail(where + ": ตัวเลือกที่ " + (ci + 1) + " ก็ตรงกับผลจริง (ต้องมีคำตอบเดียว)"); });
          }
        }
        continue;
      }
      coding++;
      if (!s.kind) fail(key + ": ต้องระบุ kind");
      if (!Array.isArray(s.hints) || s.hints.length !== 3) fail(key + ": ต้องมีคำใบ้ 3 ขั้น");
      if (!Array.isArray(s.tests) || !s.tests.length) { fail(key + ": ไม่มีกรณีทดสอบ"); continue; }
      if (!s.tests.some(x => !x.hidden)) fail(key + ": ต้องมีกรณีที่แสดงให้ผู้เรียนเห็นอย่างน้อย 1 กรณี");
      // ด่านที่ไม่รับข้อมูล (fixedOutput: ก่อนเรียน input()) มีผลลัพธ์เดียว กรณีซ่อนจะซ้ำกรณีแสดงเปล่าๆ
      if (s.fixedOutput && s.tests.some(x => x.in)) fail(key + ": fixedOutput ใช้ได้เฉพาะด่านที่ไม่รับข้อมูล");
      if (!s.fixedOutput && !s.tests.some(x => x.hidden)) fail(key + ": ต้องมีกรณีซ่อนอย่างน้อย 1 กรณี (edge cases)");
      if (s.tests.some(x => x.hidden && !x.label)) fail(key + ": กรณีซ่อนต้องมี label บอกประเภท");
      for (const r of s.require || []) if (!r.msg) fail(key + ": require ต้องมีข้อความอธิบาย");
      testsN += s.tests.length; hiddenN += s.tests.filter(x => x.hidden).length;
      const sol = sols[key];
      if (!sol) { fail(key + ": ไม่มีเฉลยใน " + path.basename(SOLS_PATH)); continue; }
      const req = (code) => (s.require || []).every(r => new RegExp(r.re, r.flags || "").test(r.noComments ? code.replace(/(^|[^"'\\])#.*$/gm, "$1") : code));
      if (!req(sol.sol)) fail(key + ": เฉลยไม่ผ่าน require");
      const okSol = await passesAll(sol.sol, s);
      if (!okSol.pass) fail(key + ": เฉลยไม่ผ่านกรณี " + JSON.stringify(okSol.test.label || okSol.test.in || okSol.test.call) + " — " + okSol.v.title + ": " + String(okSol.v.detail).split("\n").slice(0, 3).join(" | "));
      if (!sol.wrong || !sol.wrong.length) fail(key + ": ต้องมีคำตอบผิดอย่างน้อย 1 ชุด");
      for (const [wi, w] of (sol.wrong || []).entries()) {
        // คำตอบผิดที่เหมือนเฉลย (เช่น replace ที่ไม่ตรงข้อความ) จะทำให้รายงานผิดว่า "กรณีทดสอบไม่พอ"
        if (w.trim() === sol.sol.trim()) { fail(key + ": คำตอบผิดชุดที่ " + wi + " เหมือนเฉลยทุกตัวอักษร — ตรวจวิธีสร้างคำตอบผิด"); continue; }
        const r = req(w) ? await passesAll(w, s) : { pass: false };
        if (r.pass) fail(key + ": คำตอบผิดชุดที่ " + wi + " กลับผ่าน — กรณีทดสอบยังไม่พอ"); else wrongCaught++;
      }
      if (s.starter && (await passesAll(s.starter, s)).pass && req(s.starter)) fail(key + ": โค้ดตั้งต้นผ่านเองโดยไม่ต้องแก้");
      // prerequisite + import เฉพาะ stdlib (ตรวจทั้งเฉลยและโค้ดตั้งต้น)
      for (const [label, code] of [["เฉลย", sol.sol], ["โค้ดตั้งต้น", s.starter || ""]]) {
        const f = await analyze(code);
        if (!f) { fail(key + ": วิเคราะห์" + label + "ไม่สำเร็จ"); continue; }
        if (f.thirdParty && f.thirdParty.length) fail(key + ": " + label + " import แพ็กเกจนอก stdlib: " + f.thirdParty.join(", "));
        if (sn) for (const rule of RULES) if (f[rule.feature] && sn < rule.from) fail(key + ": " + label + " " + rule.msg);
      }
    }
  }
  // ด่านที่ deploy แล้วแต่หายไปทั้งบท
  if (!ONLY) for (const id of Object.keys(lock)) if (!id.startsWith("__") && !course.topics.some(t => t.id === id)) fail(id + ": บทที่ deploy แล้วหายไป — ความคืบหน้าของผู้เรียนจะหาบทไม่เจอ");

  await engine.close();
  if (process.argv.includes("--lock") && !errors.length) {
    const next = Object.assign({}, lock);
    next.__required__ = Object.assign({}, lock.__required__ || {});
    for (const t of course.topics) { next[t.id] = t.stages.map(s => s.title); next.__required__[t.id] = t.stages.filter(s => !s.bonus).length; }
    fs.writeFileSync(LOCK_PATH, JSON.stringify(next, null, 2) + "\n");
    console.log("ล็อกลำดับด่านแล้ว:", Object.keys(next).length, "บท");
  }
  errors.forEach(e => console.log("❌ " + e));
  const sec = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`หลักสูตร Python v2 (${path.basename(COURSE_PATH)}): ${topics.length} บท · ด่านเขียนโค้ด ${coding} · ข้อสอบ ${quizzes} ชุด ${questions} ข้อ · กรณีทดสอบ ${testsN} (ซ่อน ${hiddenN}) · คำตอบผิดที่ถูกจับได้ ${wrongCaught} · ตัวอย่างในบทเรียน ${examples} · ข้อทำนายผล ${predicts} · ${sec} วินาที` + (errors.length ? ` | พบปัญหา ${errors.length} จุด` : " ✓"));
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
