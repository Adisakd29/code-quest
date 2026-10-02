/* กันลืม: เลขเวอร์ชันเนื้อหาต้องตรงกันระหว่างเซิร์ฟเวอร์และหน้าเว็บ (ถ้าไม่ตรง ผู้ใช้จะเห็นแถบ "ระบบกำลังอัปเดต" ตลอด) */
const fs = require("fs"), path = require("path");
const v = f => (fs.readFileSync(path.join(__dirname, "..", f), "utf8").match(/const CONTENT_VERSION = (\d+)/) || [])[1];
const s = v("server.js"), g = v("public/game.js");
console.log(s === g ? "เวอร์ชันเนื้อหาตรงกัน (" + s + ") ✓" : "❌ เวอร์ชันไม่ตรง: server.js = " + s + " · public/game.js = " + g);
process.exit(s === g ? 0 : 1);
