/**
 * e2e-py-v2.js — Python v2 กับบัญชีจริงและฐานข้อมูลจริง (ต้องมี DATABASE_URL)
 *   ด่าน v2 ได้ XP เมื่อเซิร์ฟเวอร์ตรวจซ้ำผ่านเท่านั้น · คำตอบผิดและ infinite loop ถูกปฏิเสธโดยเซิร์ฟเวอร์ไม่ค้าง
 *   เล่นซ้ำไม่ได้ XP · ด่าน Python เดิมยังผ่านได้แบบเดิม · XP รวมของบัญชีถูกต้อง
 */
"use strict";
const { spawn } = require("child_process");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const DB = process.env.DATABASE_URL;
const VERSION = String((require("fs").readFileSync(path.join(ROOT, "server.js"), "utf8").match(/const CONTENT_VERSION = (\d+)/) || [])[1]);
const sols = require("./sols-py2.js");
const results = [];
const ok = (cond, name, extra) => results.push((cond ? "✓ " : "❌ ") + name + (cond || extra === undefined ? "" : " → " + JSON.stringify(extra).slice(0, 200)));

(async () => {
  if (!DB) { console.log("ข้าม e2e-py-v2 (ไม่มี DATABASE_URL)"); return; }
  const port = 3711;
  const srv = spawn("node", ["server.js"], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(port), JWT_SECRET: "py2-e2e" }), stdio: ["ignore", "pipe", "pipe"] });
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${port}/api/version`)).ok) break; } catch {} await new Promise(r => setTimeout(r, 500)); }
  let cookie = "";
  const req = async (method, p, body) => {
    const r = await fetch(`http://localhost:${port}${p}`, { method, headers: { "Content-Type": "application/json", "X-CQ-Version": VERSION, ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const sc = r.headers.getSetCookie(); if (sc.length) cookie = sc.map(c => c.split(";")[0]).join("; ");
    let data; try { data = await r.json(); } catch { data = null; }
    return { status: r.status, data };
  };
  try {
    const reg = await req("POST", "/api/register", { email: `py2.${Date.now().toString(36)}@gmail.com`, password: "ชอบกินมะม่วงตอนเช้า2026", name: "ผู้เรียน Python v2" });
    ok(reg.status === 200, "ลงทะเบียนผู้เรียน", reg.data);
    const xp0 = (await req("GET", "/api/me")).data.user.xp;

    const legacy = require(path.join(ROOT, "verify.js")).COURSES.python.legacyTopics.find(t => t.id === "string");
    const leg = await req("POST", "/api/complete", { language: "python", topic: "string", stage: 0, proof: { code: "print('x')" } });
    ok(leg.status === 200 && leg.data.gained === legacy.stages[0].xp && leg.data.verified === false, `ด่าน Python เดิม (string/0) ยังผ่านได้แบบเดิม (ได้ ${leg.data && leg.data.gained} XP · verified: false)`, leg.data);

    const t1 = Date.now();
    const good = await req("POST", "/api/complete", { language: "python", topic: "py2-io", stage: 0, proof: { code: sols["py2-io/0"].sol } });
    ok(good.status === 200 && good.data.gained === 40 && good.data.verified === true, `ด่าน v2 ผ่านด้วยการตรวจซ้ำที่เซิร์ฟเวอร์ (ได้ ${good.data && good.data.gained} XP · ${Date.now() - t1}ms รวมโหลด Pyodide ครั้งแรก)`, good.data);

    const bad = await req("POST", "/api/complete", { language: "python", topic: "py2-io", stage: 1, proof: { code: sols["py2-io/1"].wrong[0] } });
    ok(bad.status === 422 && bad.data.code === "NOT_PASSED", "คำตอบผิดถูกปฏิเสธ (422 NOT_PASSED)", bad);

    const t2 = Date.now();
    const loopP = req("POST", "/api/complete", { language: "python", topic: "py2-io", stage: 1, proof: { code: "while True:\n    pass\n" } });
    await new Promise(r => setTimeout(r, 800));
    const tv = Date.now(); const ver = await fetch(`http://localhost:${port}/api/version`); const verMs = Date.now() - tv;
    ok(ver.ok && verMs < 1000, `ระหว่างตรวจ infinite loop เซิร์ฟเวอร์ยังตอบคำขออื่นได้ (${verMs}ms)`, verMs);
    const loop = await loopP;
    ok(loop.status === 422 && Date.now() - t2 < 15000, `infinite loop ถูกปฏิเสธตาม timeout (${Date.now() - t2}ms)`, loop);

    const after = await req("POST", "/api/complete", { language: "python", topic: "py2-io", stage: 1, proof: { code: sols["py2-io/1"].sol } });
    ok(after.status === 200 && after.data.gained === 50, "หลัง timeout ตรวจข้อถัดไปผ่านตามปกติ", after.data);

    const again = await req("POST", "/api/complete", { language: "python", topic: "py2-io", stage: 0, proof: { code: sols["py2-io/0"].sol } });
    ok(again.status === 200 && again.data.gained === 0, "ผ่านซ้ำไม่ได้ XP เพิ่ม", again.data);

    const me = await req("GET", "/api/me");
    const expect = xp0 + legacy.stages[0].xp + 40 + 50;
    ok(me.data.user.xp === expect || me.data.user.level > 1, `XP รวมของบัญชีถูกต้อง (${me.data.user.xp} · คาด ${expect} หรือขึ้นเลเวลแล้ว)`, me.data.user);
  } finally {
    srv.kill();
  }
  results.forEach(r => console.log(r));
  const bad = results.filter(r => r.startsWith("❌")).length;
  console.log((bad ? "❌ " : "") + "ทดสอบ Python v2 กับบัญชีจริง: ผ่าน " + (results.length - bad) + " / " + results.length);
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
