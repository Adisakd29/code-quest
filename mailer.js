/**
 * mailer.js — ยืนยันอีเมลด้วยรหัส OTP (ชั้นที่ 1)
 *
 * เปิดใช้งานด้วย environment variable บน Railway:
 *   RESEND_API_KEY = re_xxx                       (สมัครที่ resend.com)
 *   MAIL_FROM      = "Code Quest <noreply@โดเมนของคุณ>"   (โดเมนต้องยืนยันใน Resend ก่อน)
 * ถ้าไม่ตั้งค่า → ระบบยืนยันอีเมล "ปิด" และทุกอย่างทำงานเหมือนเดิม
 *
 * โหมดทดสอบ: MAIL_PROVIDER=log → ไม่ส่งจริง พิมพ์รหัสลง log ของเซิร์ฟเวอร์ (ห้ามใช้บน production)
 */
const crypto = require("crypto");

const PROVIDER = process.env.MAIL_PROVIDER || (process.env.RESEND_API_KEY ? "resend" : "none");
const FROM = process.env.MAIL_FROM || "Code Quest <onboarding@resend.dev>";
const CODE_TTL_MIN = 10;
const MAX_ATTEMPTS = 5;

const enabled = () => PROVIDER === "resend" || PROVIDER === "log";

/** รหัส 6 หลักแบบสุ่มที่ปลอดภัย */
const newCode = () => String(crypto.randomInt(0, 1000000)).padStart(6, "0");

/** เก็บเฉพาะ hash ของรหัส (ผูกกับ user id) — ถ้าฐานข้อมูลรั่วก็ไม่ได้รหัสจริง */
function hashCode(userId, code) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return crypto.createHmac("sha256", secret).update(userId + ":" + code).digest("hex");
}
function codeMatches(userId, code, storedHash) {
  if (!storedHash || !/^\d{6}$/.test(String(code || ""))) return false;
  const a = Buffer.from(hashCode(userId, String(code)), "hex"), b = Buffer.from(storedHash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/** ส่งรหัสยืนยันทางอีเมล */
async function sendVerificationCode(to, name, code) {
  const subject = "รหัสยืนยันอีเมล Code Quest: " + code;
  const text = "สวัสดี " + name + "\n\nรหัสยืนยันอีเมลของคุณคือ " + code + "\nรหัสนี้ใช้ได้ " + CODE_TTL_MIN + " นาที\n\nถ้าคุณไม่ได้สมัคร Code Quest ไม่ต้องทำอะไร ละเว้นอีเมลนี้ได้เลย";
  const html = '<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;color:#241f45">' +
    '<h2 style="color:#5230e0;margin:0 0 12px">Code Quest</h2><p>สวัสดี ' + esc(name) + "</p><p>รหัสยืนยันอีเมลของคุณคือ</p>" +
    '<p style="font-size:32px;font-weight:800;letter-spacing:8px;background:#efe9ff;padding:16px;text-align:center;border-radius:12px">' + code + "</p>" +
    "<p>รหัสนี้ใช้ได้ " + CODE_TTL_MIN + ' นาที</p><p style="color:#625c86;font-size:13px">ถ้าคุณไม่ได้สมัคร Code Quest ละเว้นอีเมลนี้ได้เลย</p></div>';

  if (PROVIDER === "log") {
    console.log("[mailer:log] รหัสยืนยันสำหรับ " + to + " = " + code);
    return { ok: true };
  }
  if (PROVIDER !== "resend") return { ok: false, error: "ระบบส่งอีเมลยังไม่ได้ตั้งค่า" };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], subject, text, html }),
    });
    if (!r.ok) {
      console.error("[mailer] Resend ตอบกลับ", r.status, (await r.text()).slice(0, 200));
      return { ok: false, error: "ส่งอีเมลไม่สำเร็จ ลองใหม่อีกครั้ง" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[mailer] ส่งอีเมลไม่สำเร็จ:", e.message);
    return { ok: false, error: "ส่งอีเมลไม่สำเร็จ ลองใหม่อีกครั้ง" };
  }
}

module.exports = { enabled, newCode, hashCode, codeMatches, sendVerificationCode, CODE_TTL_MIN, MAX_ATTEMPTS, PROVIDER };
