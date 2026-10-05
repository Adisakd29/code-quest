/*
 * py-grade.js — ตัดสินผลของกรณีทดสอบ Python v2 (ใช้ร่วมกันทั้งเบราว์เซอร์และเซิร์ฟเวอร์ เกณฑ์ผ่านจึงตรงกันเสมอ)
 */
(function (root) {
  "use strict";
  // ตัดช่องว่างท้ายบรรทัด · บรรทัดว่างท้ายผลลัพธ์ · \r (เหมือนตัวตรวจ C/C++)
  const norm = s => String(s == null ? "" : s).replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");

  const describeChar = c => c === undefined ? "(จบข้อความ)" : c === " " ? "ช่องว่าง" : c === "\t" ? "แท็บ (\\t)" : c === "\n" ? "การขึ้นบรรทัดใหม่" : "\"" + c + "\"";
  function firstDiff(want, got) {
    const a = [...want], b = [...got];
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    if (i === a.length && i === b.length) return "";
    const before = a.slice(0, i), line = before.filter(c => c === "\n").length + 1, col = i - before.lastIndexOf("\n");
    return "จุดแรกที่ต่างกัน: บรรทัด " + line + " ตัวที่ " + col + " — ต้องการ " + describeChar(a[i]) + " แต่ได้ " + describeChar(b[i]);
  }

  /**
   * ตัดสินหนึ่งกรณีทดสอบ
   * @returns {{ pass: boolean, kind: string, title?: string, detail?: string }}
   *   kind: pass | timeout | output_limit | error | output | call
   */
  function judge(test, r, opts) {
    opts = opts || {};
    if (!r || r.crashed) return { pass: false, kind: "error", title: "Runtime Error", detail: "ตัวรันหยุดทำงานผิดปกติ" };
    if (r.timeout) return { pass: false, kind: "timeout", title: "Timeout", detail: "โปรแกรมทำงานนานเกิน " + ((opts.timeoutMs || 3000) / 1000) + " วินาที — อาจมีลูปที่ไม่มีวันจบ หรือวิธีคิดช้าเกินไปสำหรับข้อมูลชุดนี้" };
    if (r.truncated) return { pass: false, kind: "output_limit", title: "Output Limit", detail: "โปรแกรมพิมพ์ผลลัพธ์มากเกินกำหนด — อาจพิมพ์ในลูปที่ไม่มีวันจบ" };
    if (r.error && ["SyntaxError", "IndentationError", "TabError"].includes(r.errorType)) return { pass: false, kind: "error", title: "Syntax Error", detail: r.error };
    if ("call" in test) {
      if (r.error && r.callOk === undefined) return { pass: false, kind: "error", title: (r.errorType || "Error") + " ระหว่างโหลดโปรแกรม", detail: r.error };
      if (r.callOk) return { pass: true, kind: "pass" };
      if (r.callMessage) return { pass: false, kind: "call", title: "Test Failed", detail: (r.callText ? r.callText + "\n" : "") + r.callMessage };
      if (r.error) return { pass: false, kind: "error", title: (r.errorType || "Error") + " ขณะเรียก " + (r.callText || test.call), detail: r.error };
      return { pass: false, kind: "call", title: "Test Failed", detail: (r.callText || test.call) + "\nได้: " + r.got + "\nต้องการ: " + r.want };
    }
    if (r.error) return { pass: false, kind: "error", title: (r.errorType || "Error"), detail: r.error };
    const got = norm(r.stdout), want = norm(test.out);
    if (got === want) return { pass: true, kind: "pass" };
    return { pass: false, kind: "output", title: "Test Failed", detail: "ผลลัพธ์ที่ต้องการ:\n" + want + "\nผลลัพธ์ของคุณ:\n" + (got || "(ไม่มีผลลัพธ์)") + "\n" + firstDiff(want, got) };
  }

  const api = { norm, firstDiff, judge };
  root.PYGrade = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
