/**
 * lib/py-engine.js — รันโค้ด Python ของผู้เรียนบนเซิร์ฟเวอร์ด้วย Pyodide (รุ่นเดียวกับเบราว์เซอร์)
 *
 * ใช้ harness.py ตัวเดียวกับ Web Worker ในเบราว์เซอร์ ผลตรวจทั้งสองฝั่งจึงตรงกัน
 * โค้ดรันใน worker_threads แยกจาก event loop ของเซิร์ฟเวอร์ · timeout = หยุด worker แล้วสร้างใหม่
 * (โค้ดที่วนไม่รู้จบไม่คืนการควบคุม จึงหยุดจากภายในไม่ได้)
 */
"use strict";
const path = require("path");
const fs = require("fs");
const { Worker } = require("worker_threads");

const HARNESS = fs.readFileSync(path.join(__dirname, "..", "public", "py", "harness.py"), "utf8");

const WORKER_SRC = `
const { parentPort, workerData } = require("worker_threads");
(async () => {
  const { loadPyodide } = require(workerData.pyodidePath);
  const py = await loadPyodide();
  py.setStdout({ batched: () => {} });
  py.setStderr({ batched: () => {} });
  await py.runPythonAsync(workerData.harness);
  const runJob = py.globals.get("run_job");
  parentPort.postMessage({ type: "ready" });
  parentPort.on("message", async (msg) => {
    try {
      const out = await runJob(JSON.stringify(msg.job));
      parentPort.postMessage({ type: "result", id: msg.id, result: JSON.parse(out) });
    } catch (e) {
      parentPort.postMessage({ type: "result", id: msg.id, result: { error: String(e && e.message || e), errorType: "HarnessError", stdout: "" } });
    }
  });
})().catch(e => parentPort.postMessage({ type: "fatal", error: String(e && e.message || e) }));
`;

class PyEngine {
  constructor() {
    this.worker = null;
    this.ready = null;
    this.seq = 0;
    this.pending = new Map();
    this.queue = Promise.resolve();   // ทีละงาน — worker เดียวรันได้ทีละโปรแกรม
  }

  _spawn() {
    const w = new Worker(WORKER_SRC, { eval: true, workerData: { harness: HARNESS, pyodidePath: require.resolve("pyodide") }, resourceLimits: { maxOldGenerationSizeMb: 512 } });
    this.worker = w;
    this.ready = new Promise((resolve, reject) => {
      const onMsg = (m) => {
        if (m.type === "ready") { w.off("message", onMsg); resolve(); }
        else if (m.type === "fatal") { w.off("message", onMsg); reject(new Error(m.error)); }
      };
      w.on("message", onMsg);
      w.once("error", reject);
    });
    w.on("message", (m) => {
      if (m.type !== "result") return;
      const p = this.pending.get(m.id);
      if (p) { this.pending.delete(m.id); p.resolve(m.result); }
    });
    w.on("exit", () => {
      if (this.worker === w) { this.worker = null; this.ready = null; }
      for (const [, p] of this.pending) p.resolve({ crashed: true, stdout: "", error: "ตัวรันหยุดทำงาน" });
      this.pending.clear();
    });
    return this.ready;
  }

  async warm() {
    if (!this.worker) this._spawn();
    return this.ready;
  }

  /** รันหนึ่งกรณีทดสอบ · timeout → { timeout: true } และเริ่ม worker ใหม่ */
  run(job, timeoutMs = 4000) {
    const task = this.queue.then(async () => {
      await this.warm();
      const id = ++this.seq;
      const w = this.worker;
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          this.pending.delete(id);
          this.worker = null; this.ready = null;
          w.terminate();
          resolve({ timeout: true, stdout: "" });
        }, timeoutMs);
        this.pending.set(id, { resolve: (r) => { clearTimeout(timer); resolve(r); } });
        w.postMessage({ id, job });
      });
    });
    this.queue = task.catch(() => {});
    return task;
  }

  async close() {
    if (this.worker) await this.worker.terminate();
    this.worker = null;
  }
}

module.exports = { PyEngine, HARNESS };
