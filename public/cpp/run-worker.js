/**
 * run-worker.js — รันโปรแกรม WebAssembly ของผู้เรียนหนึ่งครั้ง (สร้าง worker ใหม่ทุกครั้ง)
 * sandbox: อยู่ใน Web Worker ของเบราว์เซอร์ ไม่มี DOM/cookie/network ของหน้าเว็บ
 * หน้าเว็บสั่ง terminate() เมื่อเกินเวลา → หยุด while(true) ได้แน่นอน
 */
import { WASI, File, OpenFile, ConsoleStdout, PreopenDirectory } from "/vendor/wasi-shim/index.js";
const MAX_OUT = 64 * 1024;   // ผลลัพธ์สูงสุด 64KB
self.onmessage = async ({ data }) => {
  const { wasm, stdin, files } = data;
  let out = "", err = "", truncated = false;
  const dec = new TextDecoder();
  const sink = which => new ConsoleStdout(buf => {
    const s = dec.decode(buf, { stream: true });
    if (which === "out") { if (out.length < MAX_OUT) out += s; else truncated = true; }
    else if (err.length < MAX_OUT) err += s;
  });
  const dir = new Map(Object.entries(files || {}).map(([k, v]) => [k, new File(new TextEncoder().encode(v))]));
  const fds = [new OpenFile(new File(new TextEncoder().encode(stdin || ""))), sink("out"), sink("err"), new PreopenDirectory("/data", dir)];
  const wasi = new WASI(["main"], [], fds, { debug: false });
  let exitCode = 0, crash = "";
  try {
    const mod = await WebAssembly.compile(wasm);
    const inst = await WebAssembly.instantiate(mod, { wasi_snapshot_preview1: wasi.wasiImport });
    exitCode = wasi.start(inst);
  } catch (e) {
    const m = String(e && e.message || e);
    crash = /unreachable/.test(m) ? "โปรแกรมหยุดทำงานผิดปกติ (เช่น เข้าถึงข้อมูลนอกขอบเขต เรียกฟังก์ชันซ้อนลึกเกินไป หรือใช้ฟีเจอร์ที่ตัวรันไม่รองรับ)"
      : /memory access out of bounds|out of memory|Maximum call stack/i.test(m) ? "โปรแกรมใช้หน่วยความจำเกินขีดจำกัดหรือเข้าถึงหน่วยความจำนอกขอบเขต" : "โปรแกรมหยุดทำงาน: " + m;
  }
  // ไฟล์ที่โปรแกรมเขียนไว้ใน /data (สำหรับบทเรื่องไฟล์)
  const outFiles = {};
  for (const [k, f] of dir) outFiles[k] = dec.decode(f.data);
  self.postMessage({ out, err, exitCode, crash, truncated, files: outFiles });
};
