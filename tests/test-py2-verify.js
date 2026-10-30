/* ตรวจซ้ำที่เซิร์ฟเวอร์สำหรับ Python v2 (verifyAsync) — ใช้หลักสูตรตัวอย่าง เพราะ Phase 0 ยังไม่มีบท v2 จริง */
"use strict";
const V = require("../verify.js");
const fixture = require("./fixtures/py2-fixture.js");
const sols = require("./fixtures/sols-py2-fixture.js");
const py = V.COURSES.python;
// บท Python เดิมที่มีด่านโค้ด (ใช้ตรวจว่าเส้นทางเดิมไม่เปลี่ยน) — เอาจาก legacyTopics เมื่อ v2 ลงทะเบียนแล้ว
const legacyList = py.legacyTopics || py.topics;
const legacyId = legacyList.find(t => t.stages.some(s => !s.quiz && !Array.isArray(s.tests))).id;
py.legacyTopics = legacyList; py.topics = fixture.topics.concat(legacyList); py.version = 2;   // หลักสูตรตัวอย่างแทนบท v2 จริงชั่วคราว
const results = [];
const ok = (name, cond, extra) => results.push((cond ? "✓ " : "❌ ") + name + (cond || !extra ? "" : " → " + JSON.stringify(extra)));
(async () => {
  const t0 = Date.now();
  const s1 = await V.verifyAsync("python", "py2-fx-basics", 1, { code: sols["py2-fx-basics/1"].sol });
  ok("เฉลยผ่าน และ verified: true", s1.ok && s1.verified === true, s1);
  const w1 = await V.verifyAsync("python", "py2-fx-basics", 1, { code: sols["py2-fx-basics/1"].wrong[0] });
  ok("คำตอบผิด (ลืมลิสต์ว่าง) ไม่ผ่าน", !w1.ok && w1.verified === true, w1);
  const t1 = Date.now();
  const loop = await V.verifyAsync("python", "py2-fx-basics", 0, { code: "while True:\n    pass\n" });
  ok("infinite loop ไม่ผ่าน และหยุดตาม timeout (" + (Date.now() - t1) + "ms)", !loop.ok && Date.now() - t1 < 15000, loop);
  const after = await V.verifyAsync("python", "py2-fx-basics", 0, { code: sols["py2-fx-basics/0"].sol });
  ok("หลัง timeout ตรวจข้อถัดไปได้ตามปกติ", after.ok, after);
  ok("ไม่ส่งโค้ด ไม่ผ่าน", !(await V.verifyAsync("python", "py2-fx-basics", 0, {})).ok);
  const multi = await V.verifyAsync("python", "py2-fx-advanced", 0, { code: sols["py2-fx-advanced/0"].sol });
  ok("โปรแกรมหลายไฟล์ (package) ตรวจผ่าน", multi.ok, multi);
  const quiz = await V.verifyAsync("python", "py2-fx-basics", 3, { answers: [0] });
  ok("ข้อสอบยังตรวจด้วย gradeQuestion ตามเดิม", quiz.ok && quiz.verified === true, quiz);
  const legacy = await V.verifyAsync("python", legacyId, 0, { code: "print('x')" });
  ok("ด่าน Python เดิมยังใช้เส้นทางเดิม (verified: false)", legacy.ok && legacy.verified === false, legacy);
  results.forEach(r => console.log(r));
  const bad = results.filter(r => r.startsWith("❌")).length;
  console.log((bad ? "❌ " : "") + "ตรวจซ้ำที่เซิร์ฟเวอร์ (Python v2): ผ่าน " + (results.length - bad) + " / " + results.length + " · " + ((Date.now() - t0) / 1000).toFixed(0) + " วินาที" + (bad ? "" : " ✓"));
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
