/**
 * email-check.js — กรองอีเมลเบื้องต้นตอนสมัคร (ชั้นที่ 2)
 *
 * กันได้:   รูปแบบผิด · โดเมนพิมพ์ผิด (gmial.com) · โดเมนที่ไม่มีระบบรับอีเมล · อีเมลใช้แล้วทิ้ง
 * กันไม่ได้: ชื่อผู้ใช้ที่ไม่มีจริงในโดเมนจริง (abc123@gmail.com) → ต้องใช้การยืนยันด้วย OTP (mailer.js)
 *
 * ถ้า DNS ขัดข้อง (หมดเวลา/เซิร์ฟเวอร์ DNS ล่ม) จะ "ปล่อยผ่าน" เพื่อไม่ให้ผู้ใช้จริงสมัครไม่ได้เพราะปัญหาเครือข่าย
 */
const dns = require("dns").promises;

/** โดเมนยอดนิยม — ใช้แนะนำเมื่อพิมพ์ผิด */
const COMMON = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com", "live.com", "msn.com",
  "hotmail.co.th", "yahoo.co.th", "outlook.co.th", "me.com", "proton.me", "protonmail.com"];

/** โดเมนอีเมลใช้แล้วทิ้งที่พบบ่อย (ขยายได้ด้วย env DISPOSABLE_EMAIL_DOMAINS="a.com,b.com") */
const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "sharklasers.com", "grr.la",
  "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org", "temp-mail.io", "tempmail.dev", "tempmailo.com",
  "yopmail.com", "yopmail.net", "yopmail.fr", "trashmail.com", "trashmail.de", "getnada.com", "nada.email",
  "throwawaymail.com", "dispostable.com", "maildrop.cc", "mailnesia.com", "fakeinbox.com", "mintemail.com",
  "mohmal.com", "emailondeck.com", "spamgourmet.com", "mailcatch.com", "moakt.com", "tmpmail.org", "tmpmail.net",
  "burnermail.io", "inboxkitten.com", "mail.tm", "mailpoof.com", "33mail.com", "spambox.us", "discard.email",
  ...String(process.env.DISPOSABLE_EMAIL_DOMAINS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
]);

/** ระยะแก้ไข (Levenshtein) สำหรับหาโดเมนที่ใกล้เคียง */
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** แนะนำโดเมนที่น่าจะตั้งใจพิมพ์ (เช่น gmial.com → gmail.com) */
function suggestDomain(domain) {
  if (COMMON.includes(domain)) return null;
  let best = null, bestD = 3;
  for (const c of COMMON) { const x = distance(domain, c); if (x < bestD) { bestD = x; best = c; } }
  // ห่าง 1 ตัวอักษร: แนะนำได้เลย · ห่าง 2: เฉพาะโดเมนที่ยาวพอ (กันโดเมนสั้นที่มีจริง เช่น q.com ถูกเข้าใจผิดว่าเป็น me.com)
  if (bestD === 1 || (bestD === 2 && domain.length >= 8)) return best;
  return null;
}

/**
 * กฎชื่อผู้ใช้ของผู้ให้บริการอีเมลรายใหญ่ — จับอีเมลที่ "เป็นไปไม่ได้" แม้โดเมนจะจริง (เช่น 1@gmail.com)
 * hard = กฎที่ผู้ให้บริการประกาศชัดเจน ห้ามข้าม · soft = กฎที่อาจมีบัญชีเก่าเป็นข้อยกเว้น ผู้ใช้ยืนยันเองได้
 */
const PROVIDER_RULES = [
  { domains: ["gmail.com", "googlemail.com"], hard: true, label: "Gmail",
    test: local => {                                   // 6–30 ตัว (ไม่นับจุด) · a-z 0-9 และจุด · +tag ต่อท้ายได้
      const base = local.split("+")[0];
      if (!/^[a-z0-9.]+$/.test(base) || base.startsWith(".") || base.endsWith(".") || base.includes("..")) return false;
      const n = base.replace(/\./g, "").length;
      return n >= 6 && n <= 30;
    },
    msg: "ชื่อผู้ใช้ Gmail ต้องยาว 6–30 ตัว ใช้ได้เฉพาะ a-z, 0-9 และจุด — ตรวจการสะกดอีกครั้ง" },
  { domains: ["outlook.com", "hotmail.com", "live.com", "msn.com", "outlook.co.th", "hotmail.co.th"], hard: false, label: "Outlook/Hotmail",
    test: local => /^[a-z][a-z0-9._-]{0,63}$/.test(local.split("+")[0]),
    msg: "อีเมล Outlook/Hotmail ต้องขึ้นต้นด้วยตัวอักษร" },
  { domains: ["yahoo.com", "yahoo.co.th"], hard: false, label: "Yahoo",
    test: local => /^[a-z][a-z0-9._]{3,31}$/.test(local),
    msg: "อีเมล Yahoo ต้องขึ้นต้นด้วยตัวอักษรและยาว 4–32 ตัว" },
  { domains: ["icloud.com", "me.com", "mac.com"], hard: false, label: "iCloud",
    test: local => /^[a-z][a-z0-9._]{2,19}$/.test(local),
    msg: "อีเมล iCloud ต้องขึ้นต้นด้วยตัวอักษรและยาว 3–20 ตัว" },
];
function providerProblem(local, domain) {
  const rule = PROVIDER_RULES.find(r => r.domains.includes(domain));
  if (!rule || rule.test(local)) return null;
  return rule;
}

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error("timeout"), { code: "ETIMEOUT" })), ms))]);

/**
 * ตรวจอีเมลก่อนสมัคร
 * @param {string} email
 * @param {{ resolveMx?: (d: string) => Promise<Array<{exchange: string}>>, timeoutMs?: number }} [opts]  ใส่ resolver ปลอมได้ในการทดสอบ
 * @returns {Promise<{ ok: boolean, error?: string, suggestion?: string, reason?: string }>}
 */
async function checkEmail(email, opts = {}) {
  const e = String(email || "").trim().toLowerCase();
  const m = /^[^\s@]+@([a-z0-9-]+(?:\.[a-z0-9-]+)+)$/.exec(e);
  if (!m || e.length > 254) return { ok: false, reason: "format", error: "รูปแบบอีเมลไม่ถูกต้อง" };
  const domain = m[1];

  if (DISPOSABLE.has(domain)) return { ok: false, reason: "disposable", error: "ไม่รองรับอีเมลใช้แล้วทิ้ง กรุณาใช้อีเมลที่คุณใช้งานจริง" };

  const local = e.slice(0, e.indexOf("@"));
  const pr = providerProblem(local, domain);
  if (pr && pr.hard) return { ok: false, reason: "provider", error: pr.msg };
  if (pr && !opts.allowTypo) return { ok: false, reason: "provider-soft", error: pr.msg + " — ถ้าแน่ใจว่าถูกต้อง กด “อีเมลเดิมถูกต้องแล้ว”" };

  const suggestion = opts.allowTypo ? null : suggestDomain(domain);   // allowTypo = ผู้ใช้ยืนยันแล้วว่าอีเมลนี้ถูกต้อง
  if (suggestion) {
    const fixed = e.slice(0, e.indexOf("@") + 1) + suggestion;
    return { ok: false, reason: "typo", suggestion: fixed, error: "โดเมนอีเมลน่าจะพิมพ์ผิด หมายถึง " + fixed + " หรือเปล่า?" };
  }

  if (process.env.EMAIL_MX_CHECK === "off") return { ok: true };
  const resolveMx = opts.resolveMx || (d => dns.resolveMx(d));
  try {
    const mx = await withTimeout(resolveMx(domain), opts.timeoutMs || 3000);
    // "null MX" (RFC 7505: exchange ว่าง/".") = โดเมนประกาศว่าไม่รับอีเมล
    const usable = (mx || []).filter(r => r && r.exchange && r.exchange !== ".");
    if (!usable.length) return { ok: false, reason: "nomx", error: "โดเมน " + domain + " ไม่มีระบบรับอีเมล ตรวจการสะกดอีกครั้ง" };
    return { ok: true };
  } catch (err) {
    if (err.code === "ENOTFOUND" || err.code === "ENODATA" || err.code === "NXDOMAIN")
      return { ok: false, reason: "nomx", error: "ไม่พบโดเมน " + domain + " ตรวจการสะกดอีกครั้ง" };
    console.warn("[email-check] DNS ขัดข้อง ปล่อยผ่าน:", domain, err.code || err.message);
    return { ok: true, reason: "dns-unavailable" };
  }
}

module.exports = { checkEmail, suggestDomain, DISPOSABLE, providerProblem };
