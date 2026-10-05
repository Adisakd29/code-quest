/**
 * compile-worker.js — คอมไพล์ C++20 เป็น WebAssembly ในเบราว์เซอร์ (Clang ผ่าน @yowasp/clang)
 * โหลดคอมไพเลอร์ครั้งเดียวต่อหน้า (~20MB หลังบีบอัด เบราว์เซอร์เก็บ cache ไว้)
 * ข้อจำกัดของ toolchain: ไม่มี exceptions และ threads → คอมไพล์ด้วย -fno-exceptions
 */
const params = new URL(self.location.href).searchParams;
const BUNDLE = "/vendor/clang/" + encodeURIComponent(params.get("v") || "x") + "/bundle.js";
/** โหมดคอมไพเลอร์: cpp = C++20 · c17 / c23 = ภาษา C (หลักสูตร C v2) */
const MODES = {
  cpp: { driver: "clang++", std: ["-std=c++20", "-fno-exceptions"], main: "main.cpp" },
  c17: { driver: "clang", std: ["-x", "c", "-std=c17", "-Wpedantic"], main: "main.c" },
  c23: { driver: "clang", std: ["-x", "c", "-std=c23", "-Wpedantic"], main: "main.c" },
};
const COMMON = ["-O1", "-Wall", "-Wextra",
  "-Wl,--max-memory=67108864",          // โปรแกรมของผู้เรียนใช้หน่วยความจำได้สูงสุด 64MB
  "-Wl,-z,stack-size=1048576"];         // stack 1MB (recursion ลึกเกิน → หยุดแทนการค้าง)
let clangP = null;

// คอมไพเลอร์รายงานความคืบหน้าการดาวน์โหลดผ่าน console → ส่งต่อให้หน้าเว็บแสดงแถบโหลด
const origLog = console.log;
console.log = (...a) => {
  const m = /fetched\s+(\d+)%/.exec(a.join(" "));
  if (m) self.postMessage({ type: "progress", pct: +m[1] }); else origLog(...a);
};
function loadClang() {
  if (!clangP) clangP = Promise.all([import(BUNDLE), import("/cpp/multifile.js"), import("/cpp/memcheck.js")]).then(([mod]) => mod);
  return clangP;
}
/** ตัดรายละเอียดภายในออกจากข้อความของคอมไพเลอร์ (path ชั่วคราว, ชื่อไฟล์ object) */
function clean(diag) {
  // 1) ย่อข้อความที่มาจากไลบรารีมาตรฐาน: ตัด "In file included from…" และ snippet ภายในไลบรารี
  //    เก็บข้อความคำเตือน/ข้อผิดพลาด และทุกบรรทัดที่ชี้มาที่ main.cpp (โค้ดของผู้เรียน)
  const out = [];
  let skip = false;
  for (const line of String(diag).split("\n")) {
    if (/^In file included from /.test(line)) continue;
    const sys = /^(\/[^:]+):\d+:\d+: (warning|error|note): (.*)$/.exec(line);   // path แบบเต็ม = ไลบรารีมาตรฐาน · ไฟล์ของผู้เรียนเป็นชื่อสั้น
    if (sys) {
      skip = true;
      if (sys[2] !== "note") out.push("(ภายในไลบรารีมาตรฐาน) " + sys[2] + ": " + sys[3]);
      continue;
    }
    if (/^[\w.\-]+\.(?:cpp|cc|h|hpp):\d+:\d+: /.test(line) || /^\S/.test(line)) skip = false;
    if (!skip) out.push(line);
  }
  if (out.length > 60) out.splice(60, out.length - 60, "… (ตัดข้อความที่ยาวเกินออก — แก้ข้อผิดพลาดแรกก่อน)");
  return out.join("\n")
    .replace(/\/tmp\/[\w.\-]+\.o:\s*/g, "")
    .replace(/wasm-ld: error: undefined symbol: __cxa_[a-z_]+.*$/gm, "โค้ดนี้ใช้ exception (throw/try/catch) ซึ่งตัวรันในเบราว์เซอร์ยังไม่รองรับ — ใช้วิธีตามบทเรียนแทน")
    .replace(/clang\+\+: error: linker command failed.*$/gm, "")
    .replace(/^wasm-ld: error: /gm, "ข้อผิดพลาดตอน link: ")
    .replace(/\n{3,}/g, "\n\n").trim();
}
self.onmessage = async ({ data }) => {
  const { id, type, code } = data;
  const mode = MODES[data.compiler] || MODES.cpp;
  try {
    const { runClang } = await loadClang();
    if (type === "warm") {           // บังคับดาวน์โหลด+เตรียมคอมไพเลอร์ล่วงหน้า
      await runClang(["clang++", "--version"], {}, { stdout: () => {}, stderr: () => {} });
      return self.postMessage({ id, type: "ready" });
    }
    let diag = "";
    const cap = b => { if (b) diag += new TextDecoder().decode(b); };
    let files;
    // หลายไฟล์: แยกด้วยบรรทัดคั่น แล้วคอมไพล์ทุก .cpp และ link รวมกัน (linker error เกิดจริงแบบเครื่องจริง)
    const srcFiles = globalThis.CPPMultiFile.split(code, mode.main);
    const units = globalThis.CPPMultiFile.sources(srcFiles);
    const extra = [];
    if (data.memcheck) {   // Memory Checker: ห่อ malloc/free ของผู้เรียนด้วยตัวติดตาม
      srcFiles["cq_memcheck.h"] = globalThis.CPPMemcheck.header;
      srcFiles["cq_memcheck.c"] = globalThis.CPPMemcheck.source;
      units.push("cq_memcheck.c");
      extra.push("-include", "cq_memcheck.h");
    }
    try { files = await runClang([mode.driver, ...mode.std, ...COMMON, ...extra, ...units, "-o", "prog"], srcFiles, { stdout: cap, stderr: cap }); }
    catch (e) { return self.postMessage({ id, type: "compiled", ok: false, diag: clean(diag || String(e.message || e)) }); }
    const wasm = files.prog;
    self.postMessage({ id, type: "compiled", ok: true, wasm, warnings: clean(diag) }, [wasm.buffer]);
  } catch (e) {
    self.postMessage({ id, type: "fatal", error: String(e && e.message || e) });
  }
};
