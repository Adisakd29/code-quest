/* รันชุดทดสอบทุกคอร์ส + ตรวจความสอดคล้องของ XP กับเซิร์ฟเวอร์ */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
let bad = 0;
for (const t of ["test-py.js", "test-c.js", "test-web.js", "test-quiz.js", "test-verify.js", "test-icons.js", "test-themes.js", "test-email.js", "test-version.js", "test-landing.js", "test-cpp.js", "test-c2-fixture.js", "test-c2.js", "test-c2-indent.js", "test-rich-text.js", "test-py2.js", "test-py2-fixture.js", "test-py2-verify.js"]) {
  try { console.log(execSync("node " + path.join(__dirname, t), { encoding: "utf8" }).trim()); }
  catch (e) { console.log((e.stdout || "") + "\n❌ " + t + " ไม่ผ่าน"); bad++; }
}
// ตรวจ XP ฝั่งเกม ต้องตรงกับตารางฝั่งเซิร์ฟเวอร์เสมอ
const eq = () => true, lines = () => [], W = require("../public/web-run.js"), VM = require("../public/vm.js");
const game = fs.readFileSync(path.join(__dirname, "../public/game.js"), "utf8");
const COURSES = eval("(" + game.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");
const XP = eval("(" + fs.readFileSync(path.join(__dirname, "../server.js"), "utf8").match(/const STAGE_XP = ({[\s\S]*?});/)[1] + ")");
let mm = 0, total = 0;
for (const lang of Object.keys(COURSES)) for (const t of COURSES[lang].topics) {
  if (!t.stages.length) continue;
  total += t.stages.length;
  if (JSON.stringify(t.stages.map(s => s.xp)) !== JSON.stringify(XP[lang] && XP[lang][t.id])) { mm++; console.log("❌ XP ไม่ตรง: " + lang + "/" + t.id); }
}
console.log(mm ? "❌ XP ไม่ตรง " + mm + " หัวข้อ" : "✓ XP ตรงกับเซิร์ฟเวอร์ทุกหัวข้อ (รวม " + total + " ด่าน)");
process.exit(bad || mm ? 1 : 0);
