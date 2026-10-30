/**
 * ชุดทดสอบความปลอดภัยแบบ end-to-end (ต้องมีเซิร์ฟเวอร์ + ฐานข้อมูลรันอยู่)
 * ใช้: BASE=http://localhost:3000 node tests/e2e-security.js
 * ครอบคลุมทุกข้อ P0: เวอร์ชัน, ตรวจคำตอบฝั่งเซิร์ฟเวอร์, EXP ซ้ำ, รหัสผ่าน, rate limit, สิทธิ์โฮสต์, ชื่อผู้เล่น
 */
const BASE = process.env.BASE || "http://localhost:3000";
const { COURSES } = require("../verify.js");
const SOL_C = require("./sols-c.js");
const VER = String(require("fs").readFileSync(require("path").join(__dirname, "../server.js"), "utf8").match(/const CONTENT_VERSION = (\d+)/)[1]);

let pass = 0, fail = 0;
const ok = (cond, label, extra) => { if (cond) { pass++; console.log("✓ " + label); } else { fail++; console.log("❌ " + label + (extra ? "  → " + extra : "")); } };

let cookie = "";
async function call(method, path, body, headers = {}, opts = {}) {
  const h = Object.assign({ "Content-Type": "application/json" }, opts.noVersion ? {} : { "X-CQ-Version": VER }, cookie && !opts.noCookie ? { Cookie: cookie } : {}, headers);
  const r = await fetch(BASE + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  const sc = r.headers.get("set-cookie");
  if (sc && opts.keepCookie) cookie = sc.split(";")[0];
  let data = {};
  try { data = await r.json(); } catch {}
  return { status: r.status, data, setCookie: sc };
}
const uniq = Date.now().toString(36);

(async () => {
  // ── 1) เวอร์ชัน ──
  const v = await call("GET", "/api/version");
  ok(String(v.data.version) === VER, "เวอร์ชันตรงกัน (" + VER + ")");

  // ── 2) นโยบายรหัสผ่าน ──
  let r = await call("POST", "/api/register", { email: "short" + uniq + "@gmail.com", password: "abc123", name: "ทดสอบ" });
  ok(r.status === 400 && /อย่างน้อย 10/.test(r.data.error), "ปฏิเสธรหัสผ่านสั้นกว่า 10 ตัว", r.data.error);
  r = await call("POST", "/api/register", { email: "common" + uniq + "@gmail.com", password: "1234567890", name: "ทดสอบ" });
  ok(r.status === 400, "ปฏิเสธรหัสผ่านยอดนิยมที่เดาง่าย", r.data.error);
  const email = "p0" + uniq + "@gmail.com";
  r = await call("POST", "/api/register", { email, password: "ชอบกินมะม่วงตอนเช้า2026", name: "<script>alert(1)</script>นักเรียน" }, {}, { keepCookie: true });
  ok(r.status === 200, "สมัครด้วยรหัสผ่านประโยคยาว (ภาษาไทย) ได้");
  ok(!/[<>]/.test(r.data.user && r.data.user.name), "ชื่อผู้เล่นถูกตัดเครื่องหมาย < > ออก", r.data.user && r.data.user.name);
  ok(/HttpOnly/i.test(r.setCookie || "") && /SameSite=Lax/i.test(r.setCookie || ""), "cookie เป็น HttpOnly + SameSite");

  // ── 3) กันบันทึกเมื่อเวอร์ชันไม่ตรง ──
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: 0, proof: { code: SOL_C["cintro/0"] } }, {}, { noVersion: true });
  ok(r.status === 409 && r.data.code === "VERSION", "ไม่ส่งเวอร์ชัน (หน้าเกมเก่าใน cache) → ห้ามบันทึก");
  ok(!/github|railway|push/i.test(r.data.error || ""), "ข้อความสำหรับผู้ใช้ไม่มีศัพท์ developer", r.data.error);

  // ── 4) EXP ต้องผ่านการตรวจฝั่งเซิร์ฟเวอร์ ──
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: 0 });
  ok(r.status === 422, "อ้างว่าผ่านด่านโดยไม่ส่งโค้ด → ไม่ได้ EXP");
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: 0, proof: { code: '#include <stdio.h>\n\nint main() {\n    printf("ผิด");\n    return 0;\n}' } });
  ok(r.status === 422, "ส่งโค้ดที่ผลลัพธ์ผิด → ไม่ได้ EXP");
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: 0, xp: 99999, gained: 99999, proof: { code: SOL_C["cintro/0"] } });
  ok(r.status === 200 && r.data.gained === 30 && r.data.verified === true, "โค้ดถูก → ได้ EXP ตามตารางเซิร์ฟเวอร์ (30) ไม่สนค่า xp ที่ client ส่งมา", JSON.stringify(r.data));
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: 0, proof: { code: SOL_C["cintro/0"] } });
  ok(r.status === 200 && r.data.gained === 0, "ส่งด่านเดิมซ้ำ → ไม่ได้ EXP ซ้ำ");
  const concurrent = await Promise.all([1, 2, 3, 4, 5].map(() => call("POST", "/api/complete", { language: "c", topic: "cintro", stage: 7, proof: { code: SOL_C["cintro/7"] } })));
  ok(concurrent.filter(x => x.data.gained > 0).length === 1, "ยิงคำขอพร้อมกัน 5 ครั้ง → ได้ EXP แค่ครั้งเดียว (transaction)");

  // ข้อสอบทฤษฎี
  // หัวข้อ cintro อยู่ใน legacyTopics หลังเปลี่ยนเป็น C v2 — ใช้หัวข้อเดียวกับที่ส่งไป (ไม่ปนกับหัวข้อ v2)
  const cintro = [...COURSES.c.topics, ...(COURSES.c.legacyTopics || [])].find(t => t.id === "cintro");
  const qi = cintro.stages.findIndex(s => s.quiz);
  const quiz = cintro.stages[qi].quiz;
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: qi, proof: { answers: quiz.map(() => 0), orders: [] } });
  ok(r.status === 422, "ข้อสอบตอบผิด → ไม่ได้ EXP");
  r = await call("POST", "/api/complete", { language: "c", topic: "cintro", stage: qi, proof: {
    answers: quiz.map(q => q.t === "fill" ? q.a[0] : (q.t === "order" ? null : q.a)), orders: quiz.map(q => q.t === "order" ? q.items : null) } });
  ok(r.status === 200 && r.data.gained > 0, "ข้อสอบตอบถูกครบ → ได้ EXP");

  // ── 5) rate limit การเข้าสู่ระบบ ──
  let got429 = false;
  for (let i = 0; i < 10; i++) {
    const x = await call("POST", "/api/login", { email, password: "wrong-password-" + i }, {}, { noCookie: true });
    if (x.status === 429) { got429 = true; break; }
  }
  ok(got429, "เดารหัสผ่านผิดติดกัน → ถูกจำกัด (429) พร้อมให้รอ");

  // ── 6) ห้องแข่งขัน: สิทธิ์โฮสต์ / ผู้เล่นขั้นต่ำ / ตรวจคำตอบ / เชื่อมต่อใหม่ ──
  const created = await call("POST", "/api/rooms", { name: "ครูมะลิ", title: "ทดสอบ P0", languages: ["c"], count: 3 });
  const code = created.data.code, hostT = created.data.hostToken, hostM = created.data.memberToken;
  ok(!!code && hostT && hostM && hostT !== hostM && hostT.length >= 40, "เซิร์ฟเวอร์ออก hostToken แยกจาก memberToken และรหัสห้อง");
  r = await call("POST", "/api/rooms/" + code + "/start", {}, { "X-Host-Token": hostT });
  ok(r.status === 400 && /อย่างน้อย/.test(r.data.error), "มีผู้เล่นคนเดียว → โฮสต์กดเริ่มไม่ได้");
  const joined = await call("POST", "/api/rooms/" + code + "/join", { name: '<img src=x onerror="alert(1)">ฟ้า' });
  const pT = joined.data.memberToken;
  ok(!!pT && pT !== hostT, "ผู้เล่นเข้าห้องได้ token ของตัวเอง");
  const board = await call("GET", "/api/rooms/" + code, null, { "X-Room-Token": pT });
  ok(board.data.members.every(m => !/[<>]/.test(m.name)), "ชื่อที่มีแท็ก HTML ถูกทำความสะอาดก่อนเก็บ");
  ok(!JSON.stringify(board.data).includes(hostT) && !JSON.stringify(board.data).includes(pT), "ข้อมูลห้องไม่เปิดเผย token ของใคร");
  r = await call("POST", "/api/rooms/" + code + "/start", {}, { "X-Host-Token": pT });
  ok(r.status === 403, "ผู้เล่นใช้ token ตัวเองสั่งเริ่มแข่ง → ถูกปฏิเสธ");
  r = await call("POST", "/api/rooms/" + code + "/start", {}, { "X-Host-Token": hostT });
  ok(r.status === 200 && r.data.status === "playing", "โฮสต์ตัวจริงเริ่มแข่งได้");
  const st = r.data.stages[0];
  r = await call("POST", "/api/rooms/" + code + "/solve", { index: 0 }, { "X-Room-Token": pT });
  ok(r.status === 422, "ส่งคะแนนห้องแข่งโดยไม่มีคำตอบ → ไม่ได้คะแนน");
  const stageObj = COURSES[st.language].topics.find(t => t.id === st.topic).stages[st.stage];
  const proof = stageObj.quiz
    ? { answers: stageObj.quiz.map(q => q.t === "fill" ? q.a[0] : (q.t === "order" ? null : q.a)), orders: stageObj.quiz.map(q => q.t === "order" ? q.items : null) }
    : { code: SOL_C[st.topic + "/" + st.stage] };
  r = await call("POST", "/api/rooms/" + code + "/solve", { index: 0, proof, score: 99999 }, { "X-Room-Token": pT });
  ok(r.status === 200 && r.data.gained <= st.xp * 1.5 && r.data.gained >= st.xp, "คำตอบถูก → เซิร์ฟเวอร์คิดคะแนนเอง (ไม่สน score ที่ส่งมา)", JSON.stringify(r.data));
  const re = await call("POST", "/api/rooms/" + code + "/join", {}, { "X-Room-Token": pT });
  ok(re.status === 200 && re.data.reconnected && re.data.members.find(m => m.isMe).score === r.data.score, "Wi-Fi หลุดแล้วเชื่อมต่อใหม่ด้วย token เดิม → คะแนนยังอยู่");
  r = await call("POST", "/api/rooms/" + code + "/join", { name: "มาสาย" });
  ok(r.status === 400, "คนใหม่เข้าห้องหลังเริ่มแข่งแล้วไม่ได้");

  console.log("\nทดสอบความปลอดภัย E2E: ผ่าน " + pass + " / " + (pass + fail));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
