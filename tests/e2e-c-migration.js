/**
 * e2e-c-migration.js — progress regression test ของการย้ายหลักสูตร C เป็น v2
 *
 * จำลองเส้นทางจริงทั้งหมด:  เซิร์ฟเวอร์ปกติ → ผู้เรียนผ่านด่าน C เดิม → backup → เซิร์ฟเวอร์โหมดหลัง migration
 * จริง (ฐานข้อมูลเดิม) → ตรวจว่าไม่มีอะไรของผู้เรียนหาย และหลักสูตรใหม่ใช้งานได้
 * เซิร์ฟเวอร์ "ก่อน" ใช้ CQ_C_LEGACY_ONLY=1 จำลอง production ก่อน migration · เซิร์ฟเวอร์ "หลัง" คือโค้ดจริงที่จะ deploy
 *
 *   DATABASE_URL=... node tests/e2e-c-migration.js
 */
const { spawn, execFileSync } = require("child_process");
const path = require("path");
const DB = process.env.DATABASE_URL;
if (!DB) { console.log("ต้องตั้ง DATABASE_URL"); process.exit(2); }
const ROOT = path.join(__dirname, "..");
const VERSION = String(require("fs").readFileSync(path.join(ROOT, "server.js"), "utf8").match(/CONTENT_VERSION = (\d+)/)[1]);
let pass = 0, fail = 0;
const ok = (c, m, x) => { if (c) { pass++; console.log("✓ " + m); } else { fail++; console.log("❌ " + m + (x !== undefined ? "  → " + JSON.stringify(x).slice(0, 300) : "")); } };

function startServer(port, extraEnv) {
  const p = spawn("node", ["server.js"], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(port), DATABASE_URL: DB, JWT_SECRET: "migration-test" }, extraEnv), stdio: ["ignore", "pipe", "pipe"] });
  let log = ""; p.stdout.on("data", d => log += d); p.stderr.on("data", d => log += d);
  p.logText = () => log;
  return p;
}
async function waitReady(port) {
  for (let i = 0; i < 60; i++) { try { const r = await fetch(`http://localhost:${port}/api/version`); if (r.ok) return; } catch {} await new Promise(r => setTimeout(r, 500)); }
  throw new Error("server ไม่พร้อม: " + port);
}
function client(port) {
  let cookie = "";
  return async (method, p, body) => {
    const r = await fetch(`http://localhost:${port}${p}`, { method, headers: { "Content-Type": "application/json", "X-CQ-Version": VERSION, ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const sc = r.headers.getSetCookie(); if (sc.length) cookie = sc.map(c => c.split(";")[0]).join("; ");
    const text = await r.text(); let data; try { data = JSON.parse(text); } catch { data = text; }
    return { status: r.status, data, cookie: () => cookie, setCookie: c => { cookie = c; } };
  };
}
/** คำตอบที่ถูกของด่านข้อสอบ (ตรวจฝั่งเซิร์ฟเวอร์) */
function quizProof(stage) {
  return { answers: stage.quiz.map(q => q.t === "fill" ? q.a[0] : (q.t === "order" ? null : q.a)), orders: stage.quiz.map(q => q.t === "order" ? q.items.slice() : null) };
}

(async () => {
  // หลักสูตร C เดิม (ก่อน migration) — ใช้หัวข้อข้อสอบที่เซิร์ฟเวอร์ตรวจเองได้
  const legacy = require(path.join(ROOT, "verify.js")).COURSES.c.legacyTopics;
  const C2 = require(path.join(ROOT, "public/courses/c2.js"));
  const v2Quiz = C2.topics[0].stages.map((s, i) => ({ s, i })).find(x => x.s.quiz);
  const v2Total = C2.topics.reduce((n, t) => n + t.stages.length, 0);
  const quizStages = legacy.flatMap(t => t.stages.map((s, i) => ({ topic: t.id, stage: i, s }))).filter(x => x.s.quiz);
  const firstThree = quizStages.slice(0, 3), later = quizStages[3];

  // ── 1) ก่อน migration ──
  const A = startServer(3701, { CQ_C_LEGACY_ONLY: "1" });
  await waitReady(3701);
  ok(/โหมดจำลองก่อน migration/.test(A.logText()), "เซิร์ฟเวอร์ก่อน migration (หลักสูตร C เดิม)");
  const a = client(3701);
  const email = `cmig.${Date.now().toString(36)}@gmail.com`;
  const reg = await a("POST", "/api/register", { email, password: "ชอบกินมะม่วงตอนเช้า2026", name: "ผู้เรียน C รุ่นแรก" });
  ok(reg.status === 200, "ลงทะเบียนผู้เรียน", reg.data);
  for (const q of firstThree) {
    const r = await a("POST", "/api/complete", { language: "c", topic: q.topic, stage: q.stage, proof: quizProof(q.s) });
    ok(r.status === 200 && r.data.gained > 0, `ผ่านด่าน C เดิม ${q.topic}/${q.stage} (ได้ ${r.data && r.data.gained} XP)`, r.data);
  }
  const before = (await a("GET", "/api/me")).data;
  const cookie = a.length ? null : null;
  const savedCookie = (await a("GET", "/api/me")).cookie();
  const lbBefore = (await a("GET", "/api/leaderboard")).data;
  const backupFile = path.join(require("os").tmpdir(), `cq-mig-${Date.now()}.json`);
  execFileSync("node", [path.join(ROOT, "scripts/backup-progress.js"), "backup", backupFile], { env: Object.assign({}, process.env, { DATABASE_URL: DB }), stdio: "pipe" });
  ok(require("fs").existsSync(backupFile), "backup ข้อมูลก่อน migration");
  A.kill(); await new Promise(r => setTimeout(r, 800));

  // ── 2) หลัง migration (ฐานข้อมูลเดิม · หลักสูตร C = v2 + legacy) ──
  const B = startServer(3702, {});
  await waitReady(3702);
  ok(!/\[test\]/.test(B.logText()), "เซิร์ฟเวอร์หลัง migration = โค้ดจริง ไม่มีโหมดทดสอบ");
  const b = client(3702);
  b.length; const probe = await b("GET", "/api/version"); probe.setCookie(savedCookie);
  const after = (await b("GET", "/api/me")).data;
  ok(after.user && after.user.xp === before.user.xp && after.user.level === before.user.level, "XP และ level ไม่เปลี่ยน", { before: before.user && [before.user.xp, before.user.level], after: after.user && [after.user.xp, after.user.level] });
  const keyset = arr => (arr || []).filter(p => p.language === "c").map(p => p.topic + "/" + p.stage).sort().join(",");
  ok(keyset(after.progress) === keyset(before.progress) && keyset(after.progress).length > 0, "ความคืบหน้า C เดิมอยู่ครบทุกแถว", keyset(after.progress));
  const lbAfter = (await b("GET", "/api/leaderboard")).data;
  const rowOf = (lb, name) => JSON.stringify(lb).includes(name);
  ok(rowOf(lbBefore, "ผู้เรียน C รุ่นแรก") === rowOf(lbAfter, "ผู้เรียน C รุ่นแรก"), "ตารางอันดับยังเห็นผู้เรียนเหมือนเดิม");

  const legacyMore = await b("POST", "/api/complete", { language: "c", topic: later.topic, stage: later.stage, proof: quizProof(later.s) });
  ok(legacyMore.status === 200 && legacyMore.data.gained > 0, "ด่าน C เดิมยังตรวจคำตอบได้ (ห้องแข่งขันที่ค้างอยู่ไม่พัง)", legacyMore.data);
  const v2 = await b("POST", "/api/complete", { language: "c", topic: C2.topics[0].id, stage: v2Quiz.i, proof: quizProof(v2Quiz.s) });
  ok(v2.status === 200 && v2.data.gained === v2Quiz.s.xp, "ด่าน C v2 ได้ XP ตามตาราง XP ที่สร้างจากข้อมูลคอร์ส", v2.data);
  const wrongProof = quizProof(v2Quiz.s); wrongProof.answers[0] = wrongProof.answers[0] === 0 ? 1 : 0;
  const bad = await b("POST", "/api/complete", { language: "c", topic: C2.topics[1].id, stage: C2.topics[1].stages.findIndex(s => s.quiz), proof: { answers: [], orders: [] } });
  ok(bad.status !== 200, "ตอบผิดในด่านข้อสอบ v2 ไม่ได้ XP (เซิร์ฟเวอร์ตรวจคำตอบ)", bad.data);
  const code = await b("POST", "/api/complete", { language: "c", topic: C2.topics[0].id, stage: 0, proof: { code: "#include <stdio.h>\nint main(void){puts(\"x\");return 0;}" } });
  ok(code.status === 200 && code.data.verified === false, "ด่านโค้ด C v2 ไม่ถูกรันด้วย CRUN เดิม (ตรวจฝั่งเบราว์เซอร์ verified: false)", code.data);

  const room = await b("POST", "/api/rooms", { name: "ครูทดสอบ", title: "ห้อง C v2", languages: ["c"], count: 3 });
  const roomJson = JSON.stringify(room.data);
  const topicsInRoom = [...roomJson.matchAll(/"topic":"([^"]+)"/g)].map(m => m[1]);
  ok(room.status === 200 && !legacy.some(t => roomJson.includes('"topic":"' + t.id + '"')), "ห้องใหม่ไม่สุ่มด่านจากหลักสูตร C เดิม", topicsInRoom.length ? topicsInRoom : room.data);

  const home = await (await fetch("http://localhost:3702/")).text();
  ok(new RegExp("C Forge · " + v2Total + " ภารกิจ").test(home), "หน้าแรกนับเฉพาะหัวข้อปัจจุบันของ C (" + v2Total + " ภารกิจ)");

  let verified = true;
  try { execFileSync("node", [path.join(ROOT, "scripts/backup-progress.js"), "verify", backupFile], { env: Object.assign({}, process.env, { DATABASE_URL: DB }), stdio: "pipe" }); } catch { verified = false; }
  ok(verified, "สคริปต์ verify: ข้อมูลทุกคนในไฟล์ backup อยู่ครบ และ XP/level ไม่ลดลง");
  require("fs").unlinkSync(backupFile);
  B.kill();

  // ── 3) โหมดทดสอบต้องเปิดบน production ไม่ได้ ──
  const P = startServer(3703, { CQ_C_LEGACY_ONLY: "1", RAILWAY_ENVIRONMENT: "production" });
  await new Promise(r => setTimeout(r, 2500));
  ok(/ใช้บน production ไม่ได้/.test(P.logText()), "CQ_C_LEGACY_ONLY ถูกปฏิเสธบน production");
  P.kill();

  console.log(`\nทดสอบ migration หลักสูตร C: ผ่าน ${pass} / ${pass + fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
