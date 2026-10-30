/* กันบั๊กกลับมา: ตัวตรวจการย่อหน้าของหลักสูตร C เดิม (CRUN.checkIndent) ต้องไม่ใช้กับด่าน C v2
   เคยเกิดขึ้นจริง: ด่านที่มี #define ในฟังก์ชันถูกตัดสินว่าไม่ผ่านทั้งที่กรณีทดสอบผ่านครบ (C v2 คอมไพล์ด้วย Clang และสไตล์ไม่ใช่ความถูกต้อง) */
const fs = require("fs"), path = require("path");
const CRUN = require("../public/c-interp.js");
const sols = require("./sols-c2.js");
const game = fs.readFileSync(path.join(__dirname, "..", "public", "game.js"), "utf8");
const errors = [];
// 1) เงื่อนไขในหน้าเกม: ตรวจการย่อหน้าเฉพาะเมื่อไม่ได้ใช้ Clang
const m = game.match(/if\s*\((.*)\)\s*\{[ \t]*\n\s*const ind = CRUN\.checkIndent\(code\);/);   // เงื่อนไขทั้งบรรทัด (มีวงเล็บของ usesClang() อยู่ข้างใน)
if (!m) errors.push("หาจุดเรียก CRUN.checkIndent ใน game.js ไม่เจอ");
else if (!/!\s*usesClang\(\)/.test(m[1])) errors.push("game.js เรียก CRUN.checkIndent โดยไม่ยกเว้นด่าน Clang (C v2) — เงื่อนไขปัจจุบัน: " + m[1].trim());
// 2) ข้อมูลยืนยันว่าทำไมต้องยกเว้น: นับเฉลย C v2 ที่ถูกต้องแต่ตัวตรวจเดิมจะตัดสินว่าไม่ผ่าน
const flagged = Object.entries(sols).filter(([, s]) => s.sol && !CRUN.checkIndent(s.sol).ok).map(([k]) => k);
if (errors.length) { errors.forEach(e => console.log("❌ " + e)); process.exit(1); }
console.log("ตัวตรวจการย่อหน้าของ C เดิมไม่ใช้กับ C v2 ✓ (ถ้าใช้ จะตัดสินเฉลยที่ถูกต้องว่าไม่ผ่าน " + flagged.length + " ข้อ เช่น " + flagged.slice(0, 3).join(", ") + ")");
