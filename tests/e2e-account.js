/**
 * ชุดทดสอบหน้าตั้งค่าบัญชี (v34) — ยิง HTTP จริง + ตรวจฐานข้อมูล
 * รันเซิร์ฟเวอร์ด้วย GOOGLE_OAUTH_MOCK=1 (โหมดจำลอง ใช้ไม่ได้บน production)
 * ใช้:  BASE=http://localhost:3000 DATABASE_URL=... node tests/e2e-account.js
 */
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const SOL_C = require("./sols-c.js");

const BASE = process.env.BASE || "http://localhost:3000";
const VER = String(fs.readFileSync(path.join(__dirname, "../server.js"), "utf8").match(/const CONTENT_VERSION = (\d+)/)[1]);
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const uniq = Date.now().toString(36);
const PW = "ชอบกินมะม่วงตอนเช้า2026", PW2 = "แมวส้มนอนบนหลังคา2027";
let pass = 0, fail = 0;
const ok = (c, label, extra) => { if (c) { pass++; console.log("✓ " + label); } else { fail++; console.log("❌ " + label + (extra !== undefined ? "  → " + JSON.stringify(extra).slice(0, 300) : "")); } };

function agent(ua) {
  const jar = {};
  const store = res => {
    for (const c of (res.headers.getSetCookie ? res.headers.getSetCookie() : [])) {
      const [kv] = c.split(";"); const i = kv.indexOf("="); const k = kv.slice(0, i), v = kv.slice(i + 1);
      if (!v || /Expires=Thu, 01 Jan 1970/i.test(c)) delete jar[k]; else jar[k] = v;
    }
  };
  return {
    jar,
    async req(method, p, body) {
      const r = await fetch(BASE + p, { method, redirect: "manual",
        headers: Object.assign({ "Content-Type": "application/json", "X-CQ-Version": VER, "User-Agent": ua || "Mozilla/5.0 (Windows NT 10.0) Chrome/120.0 Safari/537.36" },
          Object.keys(jar).length ? { Cookie: Object.entries(jar).map(([k, v]) => k + "=" + v).join("; ") } : {}),
        body: body ? JSON.stringify(body) : undefined });
      store(r);
      let data = {}; try { data = await r.json(); } catch {}
      return { status: r.status, data, location: r.headers.get("location") };
    },
    async google(claims, mode) {
      const qs = new URLSearchParams(Object.assign({ mode: mode || "login" }, Object.fromEntries(Object.entries(claims).map(([k, v]) => ["mock_" + k, String(v)]))));
      const s = await this.req("GET", "/api/auth/google/start?" + qs);
      const c = await this.req("GET", s.location);
      return new URL(c.location, BASE);
    },
  };
}
const user = async email => (await db.query(`SELECT * FROM users WHERE lower(email) = $1`, [email])).rows[0];

(async () => {
  const email = "settings." + uniq + "@gmail.com";
  const A = agent("Mozilla/5.0 (Windows NT 10.0; Win64) Chrome/120.0 Safari/537.36");
  await A.req("POST", "/api/register", { email, password: PW, name: "ผู้ทดสอบตั้งค่า" });

  // 1–2) โปรไฟล์
  const ov = await A.req("GET", "/api/account/overview");
  ok(ov.status === 200 && ov.data.user.name === "ผู้ทดสอบตั้งค่า" && ov.data.createdAt && !JSON.stringify(ov.data).includes(email), "1) ดูโปรไฟล์ได้ (อีเมลแบบปิดบางส่วน)", ov.data);
  await A.req("POST", "/api/profile", { name: "ชื่อใหม่" });
  ok((await A.req("GET", "/api/account/overview")).data.user.name === "ชื่อใหม่" && (await user(email)).display_name === "ชื่อใหม่", "2) แก้ชื่อแล้วบันทึกจริง");

  // 8) อุปกรณ์หลายเครื่อง
  const B = agent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148 Safari/604.1");
  await B.req("POST", "/api/login", { email, password: PW });
  const C = agent("Mozilla/5.0 (Linux; Android 14) Chrome/120.0 Mobile Safari/537.36");
  await C.req("POST", "/api/login", { email, password: PW });
  const ss = await A.req("GET", "/api/account/sessions");
  const cur = ss.data.sessions.filter(s => s.current);
  ok(ss.data.sessions.length === 3 && cur.length === 1 && ss.data.sessions.some(s => s.os === "iPhone") && ss.data.sessions.some(s => s.os === "Android"), "8) ดูรายการอุปกรณ์ (3 เครื่อง ระบุชนิดได้ มีเครื่องปัจจุบันหนึ่งเครื่อง)", ss.data.sessions.map(s => s.os));
  ok(!JSON.stringify(ss.data).match(/\d+\.\d+\.\d+\.\d+/) && !("user_agent" in ss.data.sessions[0]), "   รายการอุปกรณ์ไม่มี IP และไม่ส่ง user agent ดิบ");
  const iphone = ss.data.sessions.find(s => s.os === "iPhone");
  const rv = await A.req("POST", "/api/account/sessions/" + iphone.id + "/revoke", {});
  ok(rv.status === 200 && (await B.req("GET", "/api/me")).status === 401 && (await C.req("GET", "/api/me")).status === 200, "8) ออกจากระบบอุปกรณ์เดียว → เครื่องนั้นหลุด เครื่องอื่นอยู่");
  const other = agent(); await other.req("POST", "/api/register", { email: "other." + uniq + "@gmail.com", password: PW, name: "อีกคน" });
  ok((await other.req("POST", "/api/account/sessions/" + ss.data.sessions.find(s => s.os === "Android").id + "/revoke", {})).status === 404, "   ยกเลิก session ของผู้ใช้อื่นไม่ได้");

  // 9) ออกจากระบบอุปกรณ์อื่นทั้งหมด
  const B2 = agent("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Safari/605.1.15");
  await B2.req("POST", "/api/login", { email, password: PW });
  await A.req("POST", "/api/account/sessions/revoke-others", {});
  ok((await A.req("GET", "/api/me")).status === 200 && (await C.req("GET", "/api/me")).status === 401 && (await B2.req("GET", "/api/me")).status === 401, "9) ออกจากระบบอุปกรณ์อื่นทั้งหมด → เครื่องนี้ยังอยู่");

  // logout ยกเลิก session ที่ฝั่งเซิร์ฟเวอร์ด้วย (token ที่ถูกคัดลอกไปใช้ต่อไม่ได้)
  const L = agent(); await L.req("POST", "/api/login", { email, password: PW });
  const stolen = Object.assign({}, L.jar);
  await L.req("POST", "/api/logout", {});
  const thief = agent(); Object.assign(thief.jar, stolen);
  ok((await thief.req("GET", "/api/me")).status === 401, "   logout แล้ว token ที่คัดลอกไว้ใช้ไม่ได้");

  // 3–4) เปลี่ยนรหัสผ่าน
  const D = agent(); await D.req("POST", "/api/login", { email, password: PW });
  ok((await A.req("POST", "/api/account/password", { currentPassword: "ผิดแน่นอน12345", newPassword: PW2 })).status === 401, "4) รหัสผ่านปัจจุบันผิด → เปลี่ยนไม่ได้");
  ok((await A.req("POST", "/api/account/password", { currentPassword: PW, newPassword: "0618538064" })).status === 400, "   รหัสใหม่ไม่ผ่านนโยบาย → เปลี่ยนไม่ได้");
  const cp = await A.req("POST", "/api/account/password", { currentPassword: PW, newPassword: PW2 });
  ok(cp.status === 200 && (await A.req("GET", "/api/me")).status === 200 && (await D.req("GET", "/api/me")).status === 401, "3) เปลี่ยนรหัสผ่าน → เครื่องนี้ใช้ต่อได้ เครื่องอื่นหลุด");
  ok((await agent().req("POST", "/api/login", { email, password: PW })).status === 401 && (await agent().req("POST", "/api/login", { email, password: PW2 })).status === 200, "3) รหัสเดิมใช้ไม่ได้ รหัสใหม่ใช้ได้");

  // 5–7) Google
  const sub = "g-set-" + uniq;
  const lk = await A.google({ sub, email: "linked." + uniq + "@gmail.com" }, "link");
  const ov2 = (await A.req("GET", "/api/account/overview")).data;
  ok(lk.searchParams.get("auth") === "google-linked" && lk.searchParams.get("open") === "settings" && ov2.identities.some(i => i.provider === "google"), "5) เชื่อม Google ขณะล็อกอิน → สำเร็จ และกลับหน้าตั้งค่า", lk.search);
  const G = agent(); await G.google({ sub, email: "linked." + uniq + "@gmail.com" });
  ok((await G.req("GET", "/api/me")).status === 200 && (await user(email)).id === (await db.query(`SELECT user_id FROM auth_identities WHERE provider_user_id=$1`, [sub])).rows[0].user_id, "5) หลังเชื่อม: เข้าด้วย Google → บัญชีเดิม");
  const X = agent(); await X.req("POST", "/api/register", { email: "x." + uniq + "@gmail.com", password: PW, name: "คนอื่น" });
  const steal = await X.google({ sub, email: "linked." + uniq + "@gmail.com" }, "link");
  ok(steal.searchParams.get("reason") === "linked-other", "   Google ที่เชื่อมกับบัญชีอื่นแล้ว → เชื่อมซ้ำไม่ได้");
  ok((await A.req("POST", "/api/account/google/unlink", { password: "ผิด" })).status === 401, "6) ยกเลิกการเชื่อมต้องยืนยันรหัสผ่าน");
  const ul = await A.req("POST", "/api/account/google/unlink", { password: PW2 });
  ok(ul.status === 200 && !(await A.req("GET", "/api/account/overview")).data.identities.length, "6) ยกเลิกการเชื่อม Google สำเร็จ");
  const GO = agent(); await GO.google({ sub: "g-only-" + uniq, email: "gonly." + uniq + "@gmail.com" });
  const last = await GO.req("POST", "/api/account/google/unlink", {});
  ok(last.status === 400 && last.data.code === "LAST_METHOD", "7) บัญชี Google-only ยกเลิก Google ไม่ได้ (ช่องทางสุดท้าย)");
  const setpw = await GO.req("POST", "/api/account/password", { newPassword: PW });
  ok(setpw.status === 200 && setpw.data.firstPassword && (await GO.req("POST", "/api/account/google/unlink", { password: PW })).status === 200, "7) ตั้งรหัสผ่านก่อน → จึงยกเลิก Google ได้");

  // 13) การตั้งค่า sync ข้ามอุปกรณ์ + ตรวจค่าที่ไม่อนุญาต
  await A.req("POST", "/api/account/prefs", { prefs: { fontScale: 130, editorTheme: "light", tabSize: 2, hacker: "x", fontScale2: 999, timezone: "Mars/Base" } });
  const P = agent(); await P.req("POST", "/api/login", { email, password: PW2 });
  const pr = (await P.req("GET", "/api/account/prefs")).data.prefs;
  ok(pr.fontScale === 130 && pr.editorTheme === "light" && pr.tabSize === 2 && !("hacker" in pr) && !("timezone" in pr), "13) การตั้งค่าคงอยู่หลังเข้าสู่ระบบเครื่องอื่น และค่าที่ไม่อนุญาตถูกทิ้ง", pr);

  // ความเป็นส่วนตัว: ซ่อนจากตารางอันดับ
  await A.req("POST", "/api/complete", { language: "c", topic: "cintro", stage: 0, proof: { code: SOL_C["cintro/0"] } });
  const inBoard = async () => ((await agent().req("GET", "/api/leaderboard?period=all")).data.top || []).some(r => r.name === "ชื่อใหม่");
  // ให้ขึ้นอันดับ 1 แน่นอน และยืนยันอีเมลแล้ว (เมื่อเปิดระบบยืนยันอีเมล ตารางอันดับแสดงเฉพาะบัญชีที่ยืนยันแล้ว) → การซ่อนจึงพิสูจน์ได้ไม่ว่าเซิร์ฟเวอร์ตั้งค่าแบบไหน
  await db.query(`UPDATE users SET level = 999, email_verified = true WHERE lower(email) = $1`, [email]);
  const before = await inBoard();
  await A.req("POST", "/api/account/prefs", { prefs: { showOnLeaderboard: false } });
  ok(before && !(await inBoard()), "   ปิด 'แสดงในตารางอันดับ' → ชื่อหายจากตารางอันดับ", { before });
  await A.req("POST", "/api/account/prefs", { prefs: { showOnLeaderboard: true } });
  ok(await inBoard(), "   เปิดกลับ → ชื่อกลับมาในตารางอันดับ");

  // 10) ส่งออกข้อมูล
  ok((await A.req("POST", "/api/account/export", { password: "ผิด" })).status === 401, "10) ส่งออกข้อมูลต้องยืนยันรหัสผ่าน");
  const ex = await A.req("POST", "/api/account/export", { password: PW2 });
  const js = JSON.stringify(ex.data);
  ok(ex.status === 200 && ex.data.profile.email === email && ex.data.progress.length >= 1 && ex.data.devices.length >= 1 && ex.data.settings.fontScale === 130, "10) ส่งออกข้อมูลครบ (โปรไฟล์ ความคืบหน้า อุปกรณ์ การตั้งค่า)");
  ok(!/password_hash|\$2[aby]\$|email_code|token_version|provider_user_id|"token"|JWT/i.test(js), "10) ไฟล์ส่งออกไม่มีรหัสผ่าน hash / token / รหัสยืนยัน / Google ID");

  // 11–12) ลบบัญชี
  const code = (await db.query(`SELECT code FROM rooms ORDER BY id DESC LIMIT 1`)).rows[0];
  const uid = (await user(email)).id;
  const rm = await db.query(`INSERT INTO room_members (room_id, token, name, user_id) SELECT id, 'tok-${uniq}', 'ชื่อใหม่', $1 FROM rooms ORDER BY id DESC LIMIT 1 RETURNING id`, [uid]).catch(() => ({ rows: [] }));
  ok((await A.req("POST", "/api/account/delete", { password: PW2, confirm: "ลบ" })).status === 400, "11) ลบบัญชีต้องพิมพ์คำยืนยัน");
  ok((await A.req("POST", "/api/account/delete", { password: "ผิด", confirm: "ลบบัญชี" })).status === 401, "11) ลบบัญชีต้องยืนยันรหัสผ่าน");
  const del = await A.req("POST", "/api/account/delete", { password: PW2, confirm: "ลบบัญชี" });
  const left = async t => (await db.query(`SELECT COUNT(*)::int n FROM ${t} WHERE user_id = $1`, [uid])).rows[0].n;
  ok(del.status === 200 && !(await user(email)) && (await left("progress")) === 0 && (await left("auth_identities")) === 0 && (await left("user_sessions")) === 0 && (await left("user_settings")) === 0,
     "12) ลบบัญชี → ผู้ใช้ ความคืบหน้า identity อุปกรณ์ การตั้งค่า ถูกลบหมด");
  if (rm.rows.length) {
    const m = (await db.query(`SELECT name, user_id FROM room_members WHERE id = $1`, [rm.rows[0].id])).rows[0];
    ok(m.user_id === null && m.name === "ผู้เล่นที่ลบบัญชี", "12) ประวัติห้องแข่ง: ตัดการเชื่อมกับบัญชีและไม่แสดงชื่อเดิม");
  }
  ok((await A.req("GET", "/api/me")).status === 401, "12) หลังลบ session ใช้ไม่ได้");
  ok((await agent().req("POST", "/api/register", { email, password: PW, name: "สมัครใหม่" })).status === 200, "12) อีเมลเดิมสมัครใหม่ได้หลังลบบัญชี");

  // Google-only: ส่งออก/ลบต้อง "เพิ่งเข้าสู่ระบบ" (recent auth)
  const GR = agent(); await GR.google({ sub: "g-recent-" + uniq, email: "grecent." + uniq + "@gmail.com" });
  const gsid = JSON.parse(Buffer.from(GR.jar.token.split(".")[1], "base64url")).sid;
  ok((await GR.req("POST", "/api/account/export", {})).status === 200, "   Google-only ที่เพิ่งเข้าสู่ระบบ → ส่งออกได้โดยไม่ต้องใช้รหัสผ่าน");
  await db.query(`UPDATE user_sessions SET created_at = now() - interval '1 hour' WHERE id = $1`, [gsid]);
  const old = await GR.req("POST", "/api/account/export", {});
  ok(old.status === 401 && old.data.code === "REAUTH_GOOGLE", "   Google-only ที่เข้าสู่ระบบนานแล้ว → ต้องเข้าด้วย Google ใหม่ก่อน", old.data);

  console.log("\nทดสอบหน้าตั้งค่าบัญชี E2E: ผ่าน " + pass + " / " + (pass + fail));
  await db.end();
  process.exit(fail ? 1 : 0);
})().catch(async e => { console.error(e); await db.end(); process.exit(1); });
