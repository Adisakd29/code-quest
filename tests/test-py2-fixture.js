/**
 * test-py2-fixture.js — พิสูจน์สายการตรวจ Python v2 ทั้งสองด้าน (รันใน run-all ระหว่างที่ยังไม่มีเนื้อหาจริง)
 *   1. หลักสูตรตัวอย่างที่ถูกต้อง → ตัวตรวจต้องผ่าน
 *   2. หลักสูตรตัวอย่างที่จงใจใส่ข้อผิดพลาด 8 แบบ → ตัวตรวจต้องรายงานครบทุกแบบ (กันตัวตรวจที่ \"ผ่านเสมอ\")
 */
"use strict";
const { spawnSync } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path");
const ROOT = path.join(__dirname, "..");
const run = args => spawnSync(process.execPath, [path.join(__dirname, "test-py2.js"), ...args], { cwd: ROOT, encoding: "utf8", timeout: 240000 });

const good = run(["--course=tests/fixtures/py2-fixture.js", "--sols=tests/fixtures/sols-py2-fixture.js", "--lockfile=tests/fixtures/none.json"]);
const goodLine = (good.stdout || "").trim().split("\n").pop();
if (good.status !== 0) { console.log("❌ หลักสูตรตัวอย่างที่ถูกต้องไม่ผ่านตัวตรวจ\n" + good.stdout + good.stderr); process.exit(1); }

// หลักสูตรที่จงใจผิด: สร้างจาก fixture เดิมแล้วแก้ทีละจุด
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "py2bad-"));
const bad = `
const base = require(${JSON.stringify(path.join(__dirname, "fixtures", "py2-fixture.js"))});
const c = JSON.parse(JSON.stringify(base, (k, v) => typeof v === "function" ? undefined : v));
const check = () => false;
const a = c.topics[0], b = c.topics[1];
a.id = "py2-welcome";                                                     // บทที่ 1 → ห้ามใช้ def
a.stages.forEach(s => { if (!s.quiz) s.check = check; });
a.stages[1].tests = a.stages[1].tests.filter(t => !t.raises);              // (1) ตัดกรณีลิสต์ว่าง → คำตอบผิดจะผ่าน
a.stages[2].quiz[0].a = 1;                                                 // (2) เฉลยของข้อทำนายผลผิด
b.stages.forEach(s => { if (!s.quiz) s.check = check; });
b.stages[3].tests = b.stages[3].tests.filter(t => !t.hidden);              // (6) ไม่มีกรณีซ่อน
module.exports = c;`;
fs.writeFileSync(path.join(tmp, "course.js"), bad);
const sols = require("./fixtures/sols-py2-fixture.js");
const badSols = {};
for (const [k, v] of Object.entries(sols)) badSols[k.replace("py2-fx-basics", "py2-welcome")] = v;
badSols["py2-fx-advanced/2"] = Object.assign({}, sols["py2-fx-advanced/2"], { sol: "import numpy\n" + sols["py2-fx-advanced/2"].sol });   // (4)
badSols["py2-welcome/0"] = Object.assign({}, sols["py2-fx-basics/0"], { sol: "nums = [int(input()) for _ in range(2)]\nprint(f\"ผลรวม: {sum(nums)}\")\n" });   // (7) comprehension ก่อน Stage 16
badSols["py2-fx-advanced/1"] = Object.assign({}, sols["py2-fx-advanced/1"], { wrong: [sols["py2-fx-advanced/1"].sol] });   // (8) คำตอบผิดที่เหมือนเฉลย
fs.writeFileSync(path.join(tmp, "sols.js"), "module.exports = " + JSON.stringify(badSols) + ";");
fs.writeFileSync(path.join(tmp, "lock.json"), JSON.stringify({ "py2-fx-advanced": ["นับบรรทัดในไฟล์", "แพ็กเกจคำนวณภาษี"] }));   // (5) ลำดับเดิมสลับกัน

const r = run(["--course=" + path.join(tmp, "course.js"), "--sols=" + path.join(tmp, "sols.js"), "--lockfile=" + path.join(tmp, "lock.json")]);
const out = (r.stdout || "") + (r.stderr || "");
const expected = [
  ["กรณีทดสอบไม่พอ", /py2-welcome\/1: คำตอบผิดชุดที่ \d+ กลับผ่าน/],
  ["ข้อทำนายผลเฉลยผิด", /py2-welcome\/2 ข้อ 1: ผลจริงคือ/],
  ["ใช้ def ก่อนบทฟังก์ชัน", /py2-welcome\/1: เฉลย ใช้ def ก่อนบทฟังก์ชัน/],
  ["import นอก stdlib", /py2-fx-advanced\/2: เฉลย import แพ็กเกจนอก stdlib: numpy/],
  ["ลำดับด่านที่ deploy แล้วถูกสลับ", /py2-fx-advanced\/0: ลำดับด่านเปลี่ยนจากที่ deploy แล้ว/],
  ["ไม่มีกรณีซ่อน", /py2-fx-advanced\/3: ต้องมีกรณีซ่อนอย่างน้อย 1 กรณี/],
  ["comprehension ก่อนบทที่สอน", /py2-welcome\/0: เฉลย ใช้ comprehension หรือ generator expression ก่อน Stage 16/],
  ["คำตอบผิดที่เหมือนเฉลย", /py2-fx-advanced\/1: คำตอบผิดชุดที่ 0 เหมือนเฉลยทุกตัวอักษร/],
];
const missed = expected.filter(([, re]) => !re.test(out));
fs.rmSync(tmp, { recursive: true, force: true });
if (r.status === 0 || missed.length) {
  console.log("❌ ตัวตรวจ Python v2 ไม่จับข้อผิดพลาดที่จงใจใส่: " + (missed.map(m => m[0]).join(", ") || "(ตัวตรวจคืนผ่าน)") + "\n" + out);
  process.exit(1);
}
console.log("สายการตรวจ Python v2 ✓ — " + goodLine.replace(/^หลักสูตร Python v2 \([^)]*\): /, "หลักสูตรตัวอย่าง: ") + " · จับข้อผิดพลาดที่จงใจใส่ได้ครบ " + expected.length + "/" + expected.length);
