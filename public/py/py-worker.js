/*
 * py-worker.js — รันโค้ด Python v2 ใน Web Worker (แยกจากหน้าเว็บ: ไม่มี DOM · ไม่มี localStorage · หน้าเว็บไม่ค้าง)
 * หน้าเว็บส่ง { type: "run", id, job } ทีละกรณีทดสอบ · timeout ทำฝั่งหน้าเว็บด้วยการหยุด worker นี้
 */
/* global loadPyodide, importScripts */
let runJob = null;
let booting = null;

function boot(ver) {
  if (booting) return booting;
  booting = (async () => {
    const base = "/vendor/pyodide/" + ver + "/";
    importScripts(base + "pyodide.js");
    const py = await loadPyodide({ indexURL: base });
    py.setStdout({ batched: () => {} });
    py.setStderr({ batched: () => {} });
    const harness = await (await fetch("/py/harness.py?v=" + encodeURIComponent(ver))).text();
    await py.runPythonAsync(harness);
    runJob = py.globals.get("run_job");
  })();
  return booting;
}

self.onmessage = async ({ data }) => {
  if (data.type === "boot") {
    try { await boot(data.ver); self.postMessage({ type: "ready" }); }
    catch (e) { self.postMessage({ type: "fatal", error: String(e && e.message || e) }); }
    return;
  }
  if (data.type === "run") {
    try {
      await boot(data.ver);
      const out = await runJob(JSON.stringify(data.job));
      self.postMessage({ type: "result", id: data.id, result: JSON.parse(out) });
    } catch (e) {
      self.postMessage({ type: "result", id: data.id, result: { error: String(e && e.message || e), errorType: "HarnessError", stdout: "" } });
    }
  }
};
