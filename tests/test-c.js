/* ชุดทดสอบคอร์สภาษา C: รันเฉลยผ่านตัวแปล CRUN แล้วให้ตัวตรวจของด่านตัดสิน */
const fs = require("fs");
const path = require("path");
const CRUN = require("../public/c-interp.js");
const SOL = require("./sols-c.js");

const eq = (out, s) => out.trim() === s;
const lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));
const src = fs.readFileSync(path.join(__dirname, "../public/game.js"), "utf8");
const W = require("../public/web-run.js");
const COURSES = eval("(" + src.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");

let pass = 0, fail = 0;
for (const topic of COURSES.c.topics) {
  topic.stages.forEach((stage, i) => {
    const key = topic.id + "/" + i;
    const sol = SOL[key];
    if (!sol) { console.log("❌ " + key + " — ไม่มีเฉลย (" + stage.title + ")"); fail++; return; }
    const r = CRUN.run(sol, stage.stdin || null);
    if (r.error) { console.log("❌ " + key + " \"" + stage.title + "\" — ตัวแปลฟ้อง: " + r.error); fail++; return; }
    if (!stage.check(r.stdout, sol)) { console.log("❌ " + key + " \"" + stage.title + "\" — เฉลยไม่ผ่านตัวตรวจ | out: " + JSON.stringify(r.stdout)); fail++; return; }
    const ind = CRUN.checkIndent(sol);
    if (!ind.ok) { console.log("❌ " + key + " — ย่อหน้าไม่ผ่าน: " + ind.msg); fail++; return; }
    pass++;
    if (stage.check("", "")) { console.log("⚠️ " + key + " — โค้ดเปล่าดันผ่าน!"); fail++; }
    const raw = CRUN.run(stage.starter, stage.stdin || null);
    if (!raw.error && stage.check(raw.stdout, stage.starter)) { console.log("⚠️ " + key + " — starter ที่ยังไม่แก้ดันผ่าน!"); fail++; }
  });
}
console.log("\nคอร์ส C: ผ่าน " + pass + " / " + (pass + fail));
process.exit(fail ? 1 : 0);
