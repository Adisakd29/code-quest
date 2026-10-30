/*
 * nb-worker.js — เคอร์เนล Python ของห้องเขียนโค้ด (/code) แบบ Jupyter
 *
 * worker ตัวนี้อยู่ยาวตลอดการใช้งาน (ตัวแปรอยู่ต่อข้ามเซลล์) — ต่างจาก py-worker.js ของบทเรียนที่รันแยกทีละกรณีทดสอบ
 * ถ้าหน้าเว็บ cross-origin isolated (มี SharedArrayBuffer):
 *   - input() รอคำตอบจริงด้วย Atomics.wait (โปรแกรมหยุดรอ ไม่ต้องรันเซลล์ซ้ำ)
 *   - ปุ่มหยุดส่ง KeyboardInterrupt ผ่าน interrupt buffer — ตัวแปรเดิมยังอยู่
 * ถ้าไม่ได้: input() ใช้วิธีรันเซลล์ซ้ำพร้อมคำตอบที่สะสม และปุ่มหยุดต้องปิด worker (ตัวแปรหาย)
 *
 * ข้อความ: main → { type: "boot", ver, ctl?, data?, intr? } · { type: "run", id, code, count, replay? } · { type: "reset" }
 *          worker → ready | fatal | stream { id, name, text } | input { id, prompt } | done { id, result }
 */
/* global loadPyodide, importScripts */
let py = null, kernel = null, ctl = null, data = null;
const dec = new TextDecoder();

async function boot(msg) {
  const base = "/vendor/pyodide/" + msg.ver + "/";
  importScripts(base + "pyodide.js");
  py = await loadPyodide({ indexURL: base });
  if (msg.ctl && msg.data) {
    ctl = new Int32Array(msg.ctl);
    data = new Uint8Array(msg.data);
    if (msg.intr) py.setInterruptBuffer(new Uint8Array(msg.intr));
  }
  const src = await (await fetch("/py/kernel.py?v=" + encodeURIComponent(msg.ver))).text();
  py.runPython(src);
  kernel = { run: py.globals.get("run_cell"), reset: py.globals.get("reset") };
  // ปิดโมดูลที่แตะสภาพแวดล้อมของเบราว์เซอร์ (โค้ดผู้เรียนไม่ควรส่งข้อความปลอมถึงหน้าเว็บ)
  py.runPython('import sys\nfor _m in ("js", "pyodide_js", "pyodide.http"):\n    sys.modules[_m] = None\ndel _m');
}

/** โหมดปกติ: ขอคำตอบจากหน้าเว็บแล้วรอ (worker หยุดจนกว่าจะได้คำตอบหรือถูกขัดจังหวะ) */
function readInputFor(id) {
  return prompt => {
    Atomics.store(ctl, 0, 0);
    self.postMessage({ type: "input", id, prompt });
    Atomics.wait(ctl, 0, 0);
    const state = Atomics.load(ctl, 0);
    if (state !== 1) return null;            // 2 = ผู้ใช้กดหยุด → KeyboardInterrupt
    return dec.decode(data.slice(0, Atomics.load(ctl, 1)));
  };
}

self.onmessage = async ({ data: msg }) => {
  if (msg.type === "boot") {
    try { await boot(msg); self.postMessage({ type: "ready", isolated: !!ctl }); }
    catch (e) { self.postMessage({ type: "fatal", error: String(e && e.message || e) }); }
    return;
  }
  if (msg.type === "reset") { kernel.reset(); return; }
  if (msg.type === "run") {
    const emit = (name, text) => self.postMessage({ type: "stream", id: msg.id, name, text });
    let result;
    try {
      const r = kernel.run(msg.code, msg.count, emit, ctl ? readInputFor(msg.id) : null, msg.replay ? py.toPy(msg.replay) : null);
      result = r.toJs({ dict_converter: Object.fromEntries });
      r.destroy();
    } catch (e) {
      result = { status: "error", error_type: "KernelError", error: String(e && e.message || e) };
    }
    self.postMessage({ type: "done", id: msg.id, result });
  }
};
