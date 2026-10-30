/**
 * ชุดทดสอบ Authentication แบบ end-to-end (ยิง HTTP จริง + ตรวจฐานข้อมูล)
 * ต้องรันเซิร์ฟเวอร์ด้วย: MAIL_PROVIDER=log GOOGLE_OAUTH_MOCK=1 (โหมดจำลอง ใช้ไม่ได้บน production)
 * ใช้:  BASE=http://localhost:3000 LOG=/tmp/server.log DATABASE_URL=... node tests/e2e-auth.js
 */
const fs = require("fs");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SOL_C = require("./sols-c.js");

const BASE = process.env.BASE || "http://localhost:3000";
const LOG = process.env.LOG || "/tmp/server.log";
const VER = String(fs.readFileSync(require("path").join(__dirname, "../server.js"), "utf8").match(/const CONTENT_VERSION = (\d+)/)[1]);
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const uniq = Date.now().toString(36);
let pass = 0, fail = 0;
const ok = (c, label, extra) => { if (c) { pass++; console.log("✓ " + label); } else { fail++; console.log("❌ " + label + (extra !== undefined ? "  → " + JSON.stringify(extra) : "")); } };

/** เบราว์เซอร์จำลอง: เก็บ cookie ของตัวเอง */
function agent() {
  const jar = {};
  const cookieHeader = () => Object.entries(jar).map(([k, v]) => k + "=" + v).join("; ");
  const store = res => {
    const raw = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
    for (const c of raw) {
      const [kv] = c.split(";"); const i = kv.indexOf("=");
      const k = kv.slice(0, i), v = kv.slice(i + 1);
      if (!v || /Expires=Thu, 01 Jan 1970/i.test(c)) delete jar[k]; else jar[k] = v;
    }
  };
  return {
    jar,
    async req(method, path, body) {
      const r = await fetch(BASE + path, { method, redirect: "manual",
        headers: Object.assign({ "Content-Type": "application/json", "X-CQ-Version": VER }, Object.keys(jar).length ? { Cookie: cookieHeader() } : {}),
        body: body ? JSON.stringify(body) : undefined });
      store(r);
      let data = {}; try { data = await r.json(); } catch {}
      return { status: r.status, data, location: r.headers.get("location") };
    },
    /** เดินตามขั้นตอน Google: /start → (Google จำลอง) → /callback → กลับหน้าเว็บ */
    async google(claims, opts = {}) {
      const qs = new URLSearchParams(Object.assign({ mode: "login" }, Object.fromEntries(Object.entries(claims).map(([k, v]) => ["mock_" + k, String(v)]))));
      const s = await this.req("GET", "/api/auth/google/start?" + qs);
      let cb = s.location;
      if (opts.tamperState) cb = cb.replace(/state=[^&]+/, "state=forged");
      const c = await this.req("GET", cb);
      return new URL(c.location, BASE);
    },
  };
}
const codeFor = email => { const m = [...fs.readFileSync(LOG, "utf8").matchAll(new RegExp("รหัสยืนยันสำหรับ " + email.replace(/[.+]/g, "\\$&") + " = (\\d{6})", "g"))]; return m.length ? m[m.length - 1][1] : null; };
const userRow = async email => (await db.query(`SELECT * FROM users WHERE lower(email) = $1`, [email.toLowerCase()])).rows[0];
const PW = "ชอบกินมะม่วงตอนเช้า2026";

(async () => {
  const a = agent();
  // ── PART 1: ตรวจรูปแบบอีเมล ──
  for (const bad of ["abc", "abc@", "abc@gmail"]) {
    const r = await a.req("POST", "/api/register", { email: bad, password: PW, name: "ทดสอบ" });
    ok(r.status === 400, "อีเมล \"" + bad + "\" → สมัครไม่ได้", r);
  }
  const r1g = await a.req("POST", "/api/register", { email: "1@gmail.com", password: PW, name: "ทดสอบ" });
  ok(r1g.status === 400 && /Gmail/.test(r1g.data.error), "\"1@gmail.com\" (เป็นไปไม่ได้สำหรับ Gmail) → สมัครไม่ได้", r1g.data);
  const rph = await a.req("POST", "/api/register", { email: "phone.pw." + uniq + "@gmail.com", password: "0618538064", name: "ทดสอบ" });
  ok(rph.status === 400 && /ตัวเลขล้วน/.test(rph.data.error), "รหัสผ่านเบอร์โทร (ตัวเลขล้วน 10 หลัก) → สมัครไม่ได้", rph.data);
  const e4 = "  NoSuchUser." + uniq + "@Gmail.com ";
  const r4 = await a.req("POST", "/api/register", { email: e4, password: PW, name: "ผู้ใช้ทดสอบ" });
  const norm = e4.trim().toLowerCase();
  ok(r4.status === 200 && r4.data.user.emailVerified === false, "อีเมลรูปแบบถูกแต่อาจไม่มีจริง → สมัครได้ในสถานะยังไม่ยืนยัน", r4.status);
  ok((await userRow(norm)).email === norm, "ตัดช่องว่าง + ตัวพิมพ์เล็กก่อนบันทึก");
  ok(r4.data.user.emailMasked && !r4.data.user.emailMasked.includes("nosuchuser"), "หน้าเว็บได้อีเมลแบบปิดบางส่วน ไม่ใช่อีเมลเต็ม", r4.data.user.emailMasked);
  ok(!("password_hash" in r4.data.user) && !JSON.stringify(r4.data).includes("$2a$"), "ไม่ส่ง password hash กลับหน้าเว็บ");
  const b = agent();
  const r5 = await b.req("POST", "/api/register", { email: norm.toUpperCase(), password: PW, name: "ซ้ำ" });
  const cnt = (await db.query(`SELECT COUNT(*)::int n FROM users WHERE lower(email) = $1`, [norm])).rows[0].n;
  ok(r5.status === 409 && cnt === 1, "อีเมลซ้ำ (แม้ต่างตัวพิมพ์) → ไม่สร้างบัญชีซ้ำ", { status: r5.status, cnt });

  // ── PART 2: ยืนยันอีเมล ──
  const code1 = codeFor(norm);
  ok(!!code1, "ส่งรหัสยืนยันตอนสมัคร");
  const rl = await a.req("POST", "/api/email/send-code", {});
  ok(rl.status === 429, "ขอรหัสใหม่ทันที → ติด cooldown 60 วินาที", rl.status);
  await db.query(`UPDATE users SET email_code_sent_at = now() - interval '2 minutes' WHERE lower(email) = $1`, [norm]);
  const rs = await a.req("POST", "/api/email/send-code", {});
  const code2 = codeFor(norm);
  ok(rs.status === 200 && code2, "ครบ cooldown → ขอรหัสใหม่ได้");
  if (code1 !== code2) { const old = await a.req("POST", "/api/email/verify", { code: code1 }); ok(old.status === 400, "รหัสเก่าหลังขอรหัสใหม่ → ใช้ไม่ได้", old.data); }
  await db.query(`UPDATE users SET email_code_expires = now() - interval '1 minute' WHERE lower(email) = $1`, [norm]);
  const exp = await a.req("POST", "/api/email/verify", { code: code2 });
  ok(exp.status === 400 && exp.data.code === "CODE_EXPIRED", "รหัสหมดอายุ → ใช้ไม่ได้", exp.data);
  await db.query(`UPDATE users SET email_code_sent_at = now() - interval '2 minutes' WHERE lower(email) = $1`, [norm]);
  await a.req("POST", "/api/email/send-code", {});
  const code3 = codeFor(norm);
  const vv = await a.req("POST", "/api/email/verify", { code: code3 });
  const after = await userRow(norm);
  ok(vv.status === 200 && after.email_verified && after.email_verified_at, "ยืนยันสำเร็จ → email_verified_at ถูกบันทึก", { status: vv.status });
  ok(after.email_code_hash === null, "รหัสถูกลบหลังใช้ (ใช้ซ้ำไม่ได้)");

  // ── PART 3: Google ──
  const sub1 = "g-sub-" + uniq, gmail1 = "newgoogle." + uniq + "@gmail.com";
  const g = agent();
  const u10 = await g.google({ sub: sub1, email: gmail1, name: "Google ใหม่" });
  const gu = await userRow(gmail1);
  ok(u10.searchParams.get("auth") === "google-ok" && gu && gu.email_verified && gu.password_hash === null, "Google ผู้ใช้ใหม่ → สร้างบัญชีที่ยืนยันแล้ว ไม่มีรหัสผ่าน", u10.search);
  const idn = (await db.query(`SELECT * FROM auth_identities WHERE provider='google' AND provider_user_id=$1`, [sub1])).rows[0];
  ok(idn && idn.user_id === gu.id, "บันทึก identity (provider=google, sub)");
  const me10 = await g.req("GET", "/api/me");
  ok(me10.status === 200 && me10.data.user.googleLinked && !me10.data.user.hasPassword, "session จาก Google ใช้งานได้");
  const g2 = agent();
  await g2.google({ sub: sub1, email: gmail1 });
  const me11 = await g2.req("GET", "/api/me");
  ok(me11.status === 200 && (await userRow(gmail1)).id === gu.id, "Google ครั้งถัดไป → user id เดิม");
  const g3 = agent();
  await g3.google({ sub: sub1, email: "changed." + uniq + "@gmail.com" });
  ok((await g3.req("GET", "/api/me")).status === 200 && !(await userRow("changed." + uniq + "@gmail.com")), "อีเมล Google เปลี่ยน แต่ sub เดิม → บัญชีเดิม ไม่สร้างใหม่");
  const pwl = await agent().req("POST", "/api/login", { email: gmail1, password: "อะไรก็ได้ยาวสิบตัว" });
  ok(pwl.status === 401 && pwl.data.error === "อีเมลหรือรหัสผ่านไม่ถูกต้อง", "บัญชี Google-only ล็อกอินด้วยรหัสผ่าน → error กลาง ไม่พัง", pwl);

  // OAuth ที่ไม่ปลอดภัยต้องถูกปฏิเสธ
  ok((await agent().google({ sub: "x" + uniq, email: "x" + uniq + "@gmail.com" }, { tamperState: true })).searchParams.get("reason") === "state", "state ไม่ตรง → ปฏิเสธ (กัน login CSRF)");
  ok((await agent().google({ sub: "y" + uniq, email: "y" + uniq + "@gmail.com", nonce: "forged-nonce-value-xxxxxxxxxxxx" })).searchParams.get("reason") === "token", "nonce ไม่ตรง → ปฏิเสธ (กัน replay)");
  const unv = await agent().google({ sub: "z" + uniq, email: "z" + uniq + "@gmail.com", verified: "0" });
  ok(unv.searchParams.get("reason") === "unverified" && !(await userRow("z" + uniq + "@gmail.com")), "Google email_verified=false → ไม่สร้างบัญชี");

  // ── บัญชีอีเมลเดียวกัน: ห้ามเชื่อมอัตโนมัติ ──
  const localV = "linkme." + uniq + "@gmail.com";
  const L = agent();
  await L.req("POST", "/api/register", { email: localV, password: PW, name: "บัญชีเดิม" });
  await db.query(`UPDATE users SET email_verified = true, email_verified_at = now() WHERE lower(email) = $1`, [localV]);
  const localId = (await userRow(localV)).id;
  const G = agent();
  const lk = await G.google({ sub: "g-link-" + uniq, email: localV });
  const n12 = (await db.query(`SELECT COUNT(*)::int n FROM users WHERE lower(email)=$1`, [localV])).rows[0].n;
  ok(lk.searchParams.get("auth") === "google-link" && lk.searchParams.get("claimable") === "0" && n12 === 1 && (await G.req("GET", "/api/me")).status === 401,
     "บัญชีเดิม (ยืนยันแล้ว) + Google อีเมลเดียวกัน → ไม่สร้างซ้ำ ไม่เชื่อมอัตโนมัติ ไม่ได้ session", lk.search);
  ok((await G.req("POST", "/api/auth/google/claim", {})).status === 409, "บัญชีที่ยืนยันแล้ว → ยึดคืนด้วย Google ไม่ได้ ต้องใช้รหัสผ่าน");
  const lg = await G.req("POST", "/api/login", { email: localV, password: PW });
  ok(lg.status === 200 && lg.data.linked === true, "เข้าสู่ระบบด้วยรหัสผ่านเดิม → เชื่อม Google สำเร็จ");
  const G2 = agent(); await G2.google({ sub: "g-link-" + uniq, email: localV });
  ok((await G2.req("GET", "/api/me")).status === 200 && (await userRow(localV)).id === localId, "หลังเชื่อม: Google → บัญชีเดิม user id เดิม");

  // บัญชีที่ยังไม่ยืนยัน (อาจถูกคนอื่นสมัครอีเมลเราไว้) → เจ้าของอีเมลตัวจริงยึดคืนได้ และคนที่รู้รหัสเดิมถูกตัดสิทธิ์
  const squat = "squat." + uniq + "@gmail.com";
  const S = agent(); await S.req("POST", "/api/register", { email: squat, password: PW, name: "คนสมัครแทน" });
  ok((await S.req("GET", "/api/me")).status === 200, "(ก่อนยึดคืน) คนสมัครแทนมี session");
  const O = agent(); const ck = await O.google({ sub: "g-owner-" + uniq, email: squat });
  ok(ck.searchParams.get("claimable") === "1", "บัญชียังไม่ยืนยัน → เสนอให้ยืนยันความเป็นเจ้าของด้วย Google");
  const cl = await O.req("POST", "/api/auth/google/claim", {});
  const sq = await userRow(squat);
  ok(cl.status === 200 && sq.email_verified && sq.password_hash === null && sq.token_version === 1, "ยึดคืน → ยืนยันอีเมล ลบรหัสผ่านเดิม", cl.status);
  ok((await S.req("GET", "/api/me")).status === 401, "session ของคนที่รู้รหัสเดิมถูกยกเลิก");
  ok((await agent().req("POST", "/api/login", { email: squat, password: PW })).status === 401, "รหัสผ่านเดิมใช้ไม่ได้อีก");

  // ── PART 6: Guest → บัญชี (ความคืบหน้าในเครื่องถูกส่งพร้อมหลักฐานให้เซิร์ฟเวอร์ตรวจซ้ำ) ──
  const complete = (ag, stage) => ag.req("POST", "/api/complete", { language: "c", topic: "cintro", stage, proof: { code: SOL_C["cintro/" + stage] } });
  const gg = agent(); await gg.google({ sub: "g-guest-" + uniq, email: "guestg." + uniq + "@gmail.com" });
  const c1 = await complete(gg, 0), c2 = await complete(gg, 1);
  const pg1 = (await gg.req("GET", "/api/me")).data;
  ok(c1.status === 200 && c2.status === 200 && pg1.progress.length === 2, "Guest → Google: ความคืบหน้าถูกนำเข้า", pg1.progress && pg1.progress.length);
  const dup = await complete(gg, 0);
  ok(dup.data.gained === 0, "นำเข้าด่านเดิมซ้ำ → ไม่นับ XP ซ้ำ");
  const ge = agent(); await ge.req("POST", "/api/register", { email: "guestm." + uniq + "@gmail.com", password: PW, name: "เกสต์" });
  await complete(ge, 0);
  const pe = (await ge.req("GET", "/api/me")).data;
  ok(pe.progress.length === 1 && pe.user.xp > 0, "Guest → สมัครด้วยอีเมล: ความคืบหน้าถูกนำเข้า");

  // ── ภาษาที่อยู่ไฟล์หลักสูตรแยก (C++) ต้องบันทึก XP ในบัญชีได้เหมือนภาษาอื่น ──
  const cx = await ge.req("POST", "/api/complete", { language: "cpp", topic: "cppintro", stage: 0, proof: { code: "int main(){}" } });
  ok(cx.status === 200 && cx.data.gained > 0, "ผ่านด่าน C++ ขณะล็อกอิน → ได้ XP และบันทึกความคืบหน้า", cx);

  // ── logout / login ──
  const before = (await L.req("GET", "/api/me")).data;
  await complete(L, 0);
  const b2 = (await L.req("GET", "/api/me")).data;
  await L.req("POST", "/api/logout", {});
  ok((await L.req("GET", "/api/me")).status === 401, "logout แล้ว session ใช้ไม่ได้");
  const re = await L.req("POST", "/api/login", { email: localV, password: PW });
  ok(re.data.user.xp === b2.user.xp && re.data.user.level === b2.user.level && re.data.progress.length === b2.progress.length, "logout/login → XP/Level/progress เหมือนเดิม", { before: b2.user, after: re.data.user });

  // ── ผู้ใช้เดิมก่อน migration ──
  const legacyEmail = "legacy." + uniq + "@gmail.com";
  const lh = await bcrypt.hash(PW, 10);
  const lr = (await db.query(`INSERT INTO users (email, password_hash, display_name, xp, level) VALUES ($1, $2, 'ผู้ใช้เก่า', 40, 3) RETURNING id`, [legacyEmail, lh])).rows[0];
  const oldCookie = jwt.sign({ id: lr.id }, process.env.JWT_SECRET || "t", { expiresIn: "30d" });   // token รุ่นเก่า ไม่มี tv
  const old = await fetch(BASE + "/api/me", { headers: { Cookie: "token=" + oldCookie } });
  ok(old.status === 200, "session เดิม (ก่อนอัปเดต) ยังใช้งานได้");
  const ll = await agent().req("POST", "/api/login", { email: legacyEmail, password: PW });
  ok(ll.status === 200 && ll.data.user.level === 3 && ll.data.user.xp === 40, "ผู้ใช้เดิมล็อกอินได้ ข้อมูลครบ");

  // ── ความปลอดภัยทั่วไป ──
  const cfg = await (await fetch(BASE + "/api/auth/config")).json();
  ok(!JSON.stringify(cfg).match(/secret|GOCSPX/i), "config ที่ส่งให้หน้าเว็บไม่มี secret");
  const idx = (await db.query(`SELECT 1 FROM pg_indexes WHERE indexname = 'users_email_lower_idx'`)).rows.length;
  ok(idx === 1, "มี unique index ของอีเมลแบบไม่สนตัวพิมพ์");

  console.log("\nทดสอบ Authentication E2E: ผ่าน " + pass + " / " + (pass + fail));
  await db.end();
  process.exit(fail ? 1 : 0);
})().catch(async e => { console.error(e); await db.end(); process.exit(1); });
