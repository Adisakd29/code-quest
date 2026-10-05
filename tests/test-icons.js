/* ชุดทดสอบระบบไอคอน: ทุกชื่อที่โค้ดเรียกใช้ต้องมีอยู่จริง และทุกหัวข้อบนแผนที่ต้องมีไอคอน */
const fs = require("fs");
const path = require("path");
const D = require("../public/icon-data.js");
const SI = require("../public/stage-icons.js");
const pub = f => fs.readFileSync(path.join(__dirname, "../public", f), "utf8");
let bad = 0;
const names = new Set();
for (const f of ["game.js", "quest.js", "quest-social.js", "ui.js", "ui-kit.js"])
  for (const m of pub(f).matchAll(/AppIcon\("([\w-]+)"/g)) names.add(m[1]);
for (const m of pub("index.html").matchAll(/\{\{icon:([\w-]+)/g)) names.add(m[1]);
for (const n of names) if (!D.ui[n]) { console.log("❌ ไอคอน \"" + n + "\" ถูกเรียกใช้แต่ไม่มีในระบบ (เพิ่มใน tools/build-icons.js)"); bad++; }
for (const n of [...Object.values(SI.STAGE_ICON_MAP), ...SI.STAGE_ICON_RULES.map(r => r[1]), SI.DEFAULT_STAGE_ICON])
  if (!D.ui[n]) { console.log("❌ stage-icons ใช้ไอคอน \"" + n + "\" ที่ไม่มีในระบบ"); bad++; }
global.W = require("../public/web-run.js"); global.VM = require("../public/vm.js");
const eq = () => true, lines = () => [];
const C = eval("(" + pub("game.js").match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");
let topics = 0;
for (const l of Object.keys(C)) for (const t of C[l].topics) { topics++; if (!D.ui[SI.getStageIcon(t)]) { console.log("❌ หัวข้อ " + l + "/" + t.id + " ไม่มีไอคอน"); bad++; } }
console.log("\nระบบไอคอน: เรียกใช้ " + names.size + " ชื่อ · หัวข้อ " + topics + " หัวข้อ" + (bad ? " | พบปัญหา " + bad + " จุด" : " — ครบทุกตัว ✓"));
process.exit(bad ? 1 : 0);
