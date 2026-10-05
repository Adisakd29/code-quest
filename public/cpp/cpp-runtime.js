/**
 * cpp-runtime.js — ตัวรันและตัวตรวจ C++ ในเบราว์เซอร์ (window.CPP)
 *
 *   CPP.state      "idle" | "loading" | "ready" | "error"
 *   CPP.warm()     เริ่มโหลดคอมไพเลอร์ล่วงหน้า (เรียกเมื่อเข้าโลก C++)
 *   CPP.runStage(code, stage, { mode, ownInput })
 *        mode "run"    → คอมไพล์ + รันด้วย input ตัวอย่าง แสดงผลลัพธ์
 *        mode "submit" → คอมไพล์ครั้งเดียว + รันทุกกรณีทดสอบ (แสดง + ซ่อน)
 *
 * กรณีทดสอบของด่าน: stage.tests = [{ in, out, hidden?, label? }]
 *   label = คำอธิบายกรณีที่ไม่เปิดเผย input เช่น "ค่าติดลบ" — ใช้บอกผู้เรียนเมื่อกรณีซ่อนไม่ผ่าน
 * ความต้องการด้านโค้ด (ถ้าโจทย์ระบุชัด): stage.require = [{ re, msg }]
 */
(() => {
  const VER = "22.0.0-git20542-10";          // ต้องตรงกับ @yowasp/clang ใน package.json (tests/test-cpp.js ตรวจให้)
  const RUN_TIMEOUT_MS = 3000;
  const listeners = new Set();
  const CPP = { state: "idle", progress: 0, error: "" };
  const notify = () => listeners.forEach(f => { try { f(CPP); } catch {} });
  CPP.onChange = f => { listeners.add(f); return () => listeners.delete(f); };

  let worker = null, seq = 0;
  const pending = new Map();
  function getWorker() {
    if (worker) return worker;
    worker = new Worker("/cpp/compile-worker.js?v=" + encodeURIComponent(VER), { type: "module" });
    worker.onmessage = ({ data }) => {
      if (data.type === "progress") { CPP.progress = data.pct; notify(); return; }
      const p = pending.get(data.id);
      if (data.type === "fatal") {
        CPP.state = "error"; CPP.error = data.error; notify();
        pending.forEach(x => x.reject(new Error("โหลดคอมไพเลอร์ C++ ไม่สำเร็จ — ตรวจอินเทอร์เน็ตแล้วลองใหม่")));
        pending.clear(); worker.terminate(); worker = null; return;
      }
      if (p) { pending.delete(data.id); p.resolve(data); }
    };
    worker.onerror = () => { CPP.state = "error"; notify(); };
    return worker;
  }
  function call(msg) {
    const id = ++seq;
    return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); getWorker().postMessage(Object.assign({ id }, msg)); });
  }
  let warmP = null;
  CPP.warm = function () {
    if (CPP.state === "ready") return Promise.resolve();
    if (warmP && CPP.state === "loading") return warmP;
    CPP.state = "loading"; CPP.progress = 0; CPP.error = ""; notify();
    warmP = call({ type: "warm" }).then(() => { CPP.state = "ready"; CPP.progress = 100; notify(); })
      .catch(e => { CPP.state = "error"; CPP.error = e.message; notify(); throw e; });
    return warmP;
  };

  // cache ผลคอมไพล์ตามเนื้อหาโค้ด → กด "รัน" แล้ว "ส่งคำตอบ" ไม่ต้องรอคอมไพล์ซ้ำ
  const cache = new Map();
  async function compile(code, opts = {}) {
    const key = (opts.compiler || "cpp") + "|" + (opts.memcheck ? 1 : 0) + "|" + code;   // โหมดต่างกัน = ผลคอมไพล์คนละชุด
    if (cache.has(key)) return cache.get(key);
    await CPP.warm();
    const r = await call({ type: "compile", code, compiler: opts.compiler || "cpp", memcheck: !!opts.memcheck });
    const res = r.ok ? { ok: true, wasm: r.wasm, warnings: r.warnings } : { ok: false, diag: r.diag };
    cache.set(key, res);
    if (cache.size > 12) cache.delete(cache.keys().next().value);
    return res;
  }
  CPP.compile = compile;

  /** รันหนึ่งครั้งใน worker แยก พร้อมจำกัดเวลา */
  function runOnce(wasm, stdin, files) {
    return new Promise(resolve => {
      const w = new Worker("/cpp/run-worker.js", { type: "module" });
      const t = setTimeout(() => { w.terminate(); resolve({ out: "", err: "", timeout: true }); }, RUN_TIMEOUT_MS);
      w.onmessage = ({ data }) => { clearTimeout(t); w.terminate(); resolve(data); };
      w.onerror = e => { clearTimeout(t); w.terminate(); resolve({ out: "", err: "", crash: "รันโปรแกรมไม่สำเร็จ: " + (e.message || "") }); };
      w.postMessage({ wasm: wasm.slice(0), stdin, files });   // สำเนา เพื่อใช้ wasm ชุดเดิมรันหลายกรณี
    });
  }
  CPP.runOnce = runOnce;

  /** ปรับผลลัพธ์ก่อนเทียบ: ช่องว่างท้ายบรรทัดและบรรทัดว่างท้ายสุดไม่มีผล */
  const norm = s => String(s || "").replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
  // บอกจุดแรกที่ผลลัพธ์ต่างกัน พร้อมชื่ออักขระที่มองไม่เห็น — แท็บกับช่องว่างที่แสดงกว้างเท่ากันจะดูเหมือนกันทุกตัวอักษร
  const describeChar = c => c === undefined ? "(จบข้อความ)" : c === " " ? "ช่องว่าง" : c === "\t" ? "แท็บ (\\t)" : c === "\n" ? "การขึ้นบรรทัดใหม่" : "\"" + c + "\"";
  const firstDiff = (want, got) => {
    const a = [...want], b = [...got];   // นับเป็นอักขระ (ภาษาไทยไม่ถูกตัดกลางตัว)
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    if (i === a.length && i === b.length) return "";
    const before = a.slice(0, i), line = before.filter(c => c === "\n").length + 1, col = i - before.lastIndexOf("\n");
    return "\nจุดแรกที่ต่างกัน: บรรทัด " + line + " ตัวที่ " + col + " — ต้องการ " + describeChar(a[i]) + " แต่ได้ " + describeChar(b[i]);
  };
  CPP.normalize = norm;

  /** ประเภทของปัญหาตอนรัน: Timeout · Memory Error (Memory Checker) · Runtime Error */
  function runtimeProblem(r) {
    if (r.timeout) return "Timeout · โปรแกรมทำงานนานเกิน " + RUN_TIMEOUT_MS / 1000 + " วินาที — อาจมีลูปที่ไม่มีวันจบ";
    if (r.exitCode === 97 || r.exitCode === 98) return "Memory Error · " + (String(r.err || "").replace(/\[memcheck\]\s*/g, "").trim() || "พบปัญหาการใช้หน่วยความจำ");
    if (r.crash) return "Runtime Error · " + r.crash;
    if (r.exitCode) return "Runtime Error · โปรแกรมจบด้วยรหัส " + r.exitCode + " (ปกติ main ควร return 0)";
    return "";
  }

  CPP.runStage = async function (code, stage, opts = {}) {
    const tests = stage.tests || [{ in: "", out: "" }];
    // ความต้องการด้านโค้ดที่โจทย์ระบุชัด (ตรวจก่อนคอมไพล์ ประหยัดเวลา)
    if (opts.mode === "submit") for (const r of stage.require || []) {
      const src = r.noComments ? code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "") : code;   // "ห้ามใช้ X" ไม่นับคำในคอมเมนต์
      if (!new RegExp(r.re, r.flags || "").test(src)) return { stdout: "", error: "", pass: false, feedback: r.msg };
    }
    let c;
    try { c = await compile(code, { compiler: opts.compiler, memcheck: stage.memcheck }); } catch (e) { return { stdout: "", error: e.message, pass: false }; }
    if (!c.ok) {
      const linker = /ข้อผิดพลาดตอน link/.test(c.diag);
      return { stdout: "", error: (linker ? "Linker Error · link ไม่ผ่าน" : "Compilation Error · คอมไพล์ไม่ผ่าน") + "\n\n" + c.diag, pass: false, compileError: true };
    }
    const warn = c.warnings ? "\n\n⚠ Warning · คำเตือนจากคอมไพเลอร์ (โค้ดรันได้ แต่ควรแก้):\n" + c.warnings : "";
    // ด่านระดับ Professional กำหนดได้ว่าต้องไม่มีคำเตือน (ด่านทั่วไปคำเตือนเป็นแค่ feedback)
    if (opts.mode === "submit" && stage.noWarnings && c.warnings) {
      return { stdout: "", error: "", pass: false, warnings: warn, feedback: "Warning · ด่านนี้กำหนดว่าต้องไม่มีคำเตือนจากคอมไพเลอร์ — แก้คำเตือนด้านล่างให้หมดก่อนส่ง" };
    }

    if (opts.mode !== "submit") {
      const sample = tests.find(t => !t.hidden) || tests[0];
      let stdin = sample.in || "";
      if (opts.ownInput) { const v = window.prompt("ป้อนข้อมูลให้โปรแกรม (หลายค่าเว้นวรรคหรือขึ้นบรรทัดใหม่):", stdin); if (v === null) return { stdout: "", error: "", pass: false }; stdin = v; }
      const r = await runOnce(c.wasm, stdin, sample.files || stage.files);   // ไฟล์ของกรณีทดสอบ (ถ้ามี) อยู่ใน /data
      const prob = runtimeProblem(r);
      return { stdout: (r.out || "") + (r.truncated ? "\n…(ตัดผลลัพธ์ที่ยาวเกินออก)" : ""), error: prob ? prob + (r.err && r.exitCode !== 97 && r.exitCode !== 98 ? "\n" + r.err : "") : (r.err || ""), pass: false, warnings: warn };   // Memory Error รวมข้อความ memcheck ไว้แล้ว ไม่ต่อซ้ำ
    }

    // ส่งคำตอบ: รันทุกกรณี แสดง → ซ่อน หยุดที่กรณีแรกที่ไม่ผ่าน
    const visible = tests.filter(t => !t.hidden), hidden = tests.filter(t => t.hidden);
    let shown = null;
    const inputOf = t => t.gen ? (t._in || (t._in = window.CPPTestGen.make(t.gen))) : (t.in || "");   // ข้อมูลใหญ่สร้างครั้งเดียวแล้วจำไว้
    for (const [i, t] of [...visible, ...hidden].entries()) {
      const r = await runOnce(c.wasm, inputOf(t), t.files || stage.files);
      if (shown === null) shown = r.out || "";
      const prob = r.timeout && t.gen
        ? "Timeout · ช้าเกินไปสำหรับข้อมูลขนาดใหญ่ (n = " + t.gen.n.toLocaleString() + ") — ลองใช้ container หรืออัลกอริทึมที่มีความซับซ้อนต่ำกว่า"
        : runtimeProblem(r);
      const got = norm(r.out), want = norm(t.out);
      if (prob || got !== want) {
        if (!t.hidden) {
          return { stdout: r.out || "", error: prob, pass: false, warnings: warn,
            feedback: "Test Failed · กรณีทดสอบที่ " + (i + 1) + " ไม่ผ่าน" + (t.in ? "\ninput: " + t.in.trim().replace(/\n/g, " ⏎ ") : "") +
              "\nผลลัพธ์ที่ต้องการ:\n" + want + "\nผลลัพธ์ของคุณ:\n" + (got || "(ไม่มีผลลัพธ์)") + (prob ? "\n" + prob : firstDiff(want, got)) };
        }
        const passed = visible.length + hidden.indexOf(t);
        return { stdout: shown, error: "", pass: false, warnings: warn,
          feedback: "Test Failed · ผ่านกรณีตัวอย่างแล้ว แต่ไม่ผ่านกรณีทดสอบที่ซ่อนไว้ (" + passed + "/" + tests.length + " ผ่าน)" +
            (t.label ? "\nลองตรวจกรณี: " + t.label : "") + (prob ? "\n" + prob : "") +
            "\nเคล็ดลับ: อย่าพิมพ์คำตอบตายตัว — ให้โปรแกรมคำนวณจาก input" };
      }
    }
    return { stdout: shown, error: "", pass: true, warnings: warn, feedback: "ผ่านทุกกรณีทดสอบ (" + tests.length + "/" + tests.length + ")" };
  };

  window.CPP = CPP;
})();
