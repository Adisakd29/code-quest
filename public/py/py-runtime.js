/*
 * py-runtime.js — ตัวควบคุมการรัน Python v2 ฝั่งหน้าเว็บ (window.PY)
 *
 * - รันใน Web Worker (py-worker.js) · หน้าเว็บไม่ค้างแม้โค้ดวนไม่รู้จบ
 * - timeout ต่อกรณีทดสอบ: หยุด worker แล้วสร้างใหม่ครั้งถัดไป
 * - ส่งคำตอบ: กรณีแสดง → กรณีซ่อน · หยุดที่กรณีแรกที่ไม่ผ่าน (แบบเดียวกับ C/C++)
 * - คืนค่า { stdout, error, pass, feedback } รูปแบบเดียวกับ CPP.runStage
 */
(function () {
  "use strict";
  const G = window.PYGrade;
  const DEFAULT_TIMEOUT = 3000;
  let worker = null, ready = null, ver = null, seq = 0;
  const pending = new Map();
  const listeners = new Set();
  const PY = { state: "idle" };

  function setState(s) { PY.state = s; listeners.forEach(fn => { try { fn(s); } catch (e) { /* ไม่ให้ผู้ฟังทำให้ตัวรันพัง */ } }); }
  PY.onState = fn => { listeners.add(fn); return () => listeners.delete(fn); };

  async function version() {
    if (ver) return ver;
    const r = await fetch("/api/pyodide-version");
    ver = (await r.json()).version;
    return ver;
  }

  function spawn() {
    const w = new Worker("/py/py-worker.js");
    worker = w;
    setState("loading");
    ready = version().then(v => new Promise((resolve, reject) => {
      const onMsg = ({ data }) => {
        if (data.type === "ready") { w.removeEventListener("message", onMsg); setState("ready"); resolve(); }
        else if (data.type === "fatal") { w.removeEventListener("message", onMsg); setState("error"); reject(new Error(data.error)); }
      };
      w.addEventListener("message", onMsg);
      w.postMessage({ type: "boot", ver: v });
    }));
    w.addEventListener("message", ({ data }) => {
      if (data.type !== "result") return;
      const p = pending.get(data.id);
      if (p) { pending.delete(data.id); p(data.result); }
    });
    w.addEventListener("error", () => { if (worker === w) { worker = null; ready = null; setState("error"); } });
    return ready;
  }

  PY.warm = () => { if (!worker) spawn(); return ready; };

  async function runOne(job, timeoutMs) {
    if (!worker) spawn();
    await ready;
    const w = worker, id = ++seq;
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        pending.delete(id);
        if (worker === w) { worker = null; ready = null; }
        w.terminate();
        setState("idle");
        resolve({ timeout: true, stdout: "" });
      }, timeoutMs);
      pending.set(id, r => { clearTimeout(timer); resolve(r); });
      w.postMessage({ type: "run", id, job, ver });
    });
  }
  PY.runOne = runOne;

  const stripComments = code => code.replace(/(^|[^"'\\])#.*$/gm, "$1");
  function checkRequire(code, stage) {
    for (const r of stage.require || []) {
      const src = r.noComments ? stripComments(code) : code;
      if (!new RegExp(r.re, r.flags || "").test(src)) return r.msg;
    }
    return "";
  }

  const inputOf = t => t.gen ? (t._in || (t._in = window.CPPTestGen.make(t.gen))) : (t.in || "");
  const showInput = s => s.trim().length > 200 ? s.trim().slice(0, 200) + " …" : s.trim().replace(/\n/g, " ⏎ ");

  // เคล็ดลับเมื่อไม่ผ่านกรณีซ่อน: ชี้ให้ลองกรณีนั้นเองด้วยวิธีที่ใช้ได้จริงกับโจทย์ชนิดนี้ (ไม่บอกข้อมูลของกรณีซ่อน)
  function hiddenTip(t) {
    const kind = t.label ? "ข้อมูลแบบ “" + t.label + "”" : "ข้อมูลที่ต่างจากกรณีตัวอย่าง";
    if (t.call) return "\nเคล็ดลับ: ลองเรียกฟังก์ชันของคุณด้วย" + kind + " แล้วไล่ดูว่าคืนค่าอะไร";
    if (t.files || t.gen) return "\nเคล็ดลับ: นึกถึง" + kind + " แล้วไล่ด้วยมือว่าโปรแกรมของคุณทำอะไรกับมัน";
    return "\nเคล็ดลับ: กด “ป้อนค่าเอง” แล้วลอง" + kind + " เพื่อดูว่าโปรแกรมของคุณทำอะไร";
  }

  PY.runStage = async function (code, stage, opts) {
    opts = opts || {};
    const tests = stage.tests || [];
    const timeoutMs = stage.timeoutMs || DEFAULT_TIMEOUT;
    let booted;
    try { booted = await PY.warm(); } catch (e) { return { stdout: "", error: "โหลดตัวรัน Python ไม่สำเร็จ: " + e.message, pass: false }; }
    void booted;

    if (opts.mode !== "submit") {
      // รันอย่างเดียว: โปรแกรมทั้งไฟล์ด้วยข้อมูลของกรณีตัวอย่าง (ไม่เรียกฟังก์ชันทดสอบ)
      const sample = tests.find(t => !t.hidden) || tests[0] || {};
      let stdin = inputOf(sample);
      if (opts.ownInput) { const v = window.prompt("ป้อนข้อมูลให้โปรแกรม (หลายค่าขึ้นบรรทัดใหม่):", stdin); if (v === null) return { stdout: "", error: "", pass: false }; stdin = v; }
      const r = await runOne({ code, files: sample.files || stage.files, test: { in: stdin } }, timeoutMs);
      const v = G.judge({ out: r.stdout }, r, { timeoutMs });
      const err = v.pass ? "" : (v.title + (v.detail && v.kind !== "output" ? " · " + v.detail : ""));
      return { stdout: (r.stdout || "") + (r.truncated ? "\n…(ตัดผลลัพธ์ที่ยาวเกินออก)" : ""), error: err, pass: false };
    }

    const reqMsg = checkRequire(code, stage);
    if (reqMsg) return { stdout: "", error: "", pass: false, feedback: "ยังไม่ตรงข้อกำหนดของโจทย์ · " + reqMsg };

    const visible = tests.filter(t => !t.hidden), hidden = tests.filter(t => t.hidden);
    let shown = null;
    for (const [i, t] of [...visible, ...hidden].entries()) {
      const job = { code, files: t.files || stage.files, test: Object.assign({}, t, { in: inputOf(t) }) };
      const r = await runOne(job, timeoutMs);
      if (shown === null) shown = r.stdout || "";
      const v = G.judge(t, r, { timeoutMs });
      if (v.pass) continue;
      if (!t.hidden) {
        const head = v.title + " · กรณีทดสอบที่ " + (i + 1) + " ไม่ผ่าน" + (t.in && !t.call ? "\ninput: " + showInput(inputOf(t)) : "");
        return { stdout: r.stdout || "", error: v.kind === "error" ? v.detail : "", pass: false, feedback: head + "\n" + v.detail };
      }
      const passed = visible.length + hidden.indexOf(t);
      return { stdout: shown, error: "", pass: false,
        feedback: (v.kind === "timeout" ? "Timeout" : v.kind === "error" ? v.title : "Test Failed") + " · ผ่านกรณีตัวอย่างแล้ว แต่ไม่ผ่านกรณีทดสอบที่ซ่อนไว้ (" + passed + "/" + tests.length + " ผ่าน)" +
          (t.label ? "\nลองตรวจกรณี: " + t.label : "") +
          (v.kind === "timeout" ? "\nโปรแกรมช้าเกินไปหรือวนไม่รู้จบกับข้อมูลชุดนี้"
            : stage.mutation ? "\nเคล็ดลับ: test ของคุณยังจับโค้ดที่มีบั๊กแบบนี้ไม่ได้ — เพิ่ม test ที่ล้มเหลวเมื่อเจอบั๊กนี้"
            : hiddenTip(t)) };
    }
    return { stdout: shown || "", error: "", pass: true, feedback: "ผ่านทุกกรณีทดสอบ (" + tests.length + "/" + tests.length + ")" };
  };

  window.PY = PY;
})();
