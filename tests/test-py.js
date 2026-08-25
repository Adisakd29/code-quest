/* ชุดทดสอบคอร์ส Python: รันเฉลยด้วย python3 จริง แล้วให้ตัวตรวจของด่านตัดสิน */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const SOL = require("./sols-py.js");

const eq = (out, s) => out.trim() === s;
const lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));
const W = require("../public/web-run.js");
const src = fs.readFileSync(path.join(__dirname, "../public/game.js"), "utf8");
const COURSES = eval("(" + src.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");

// จำลอง input() ให้ป้อนค่าตามที่โจทย์กำหนด เหมือนที่เกมทำใน Pyodide
function withShim(sol, stdin) {
  if (!stdin || !stdin.length) return sol;
  return "import builtins, json\n_gi = json.loads(" + JSON.stringify(JSON.stringify(stdin)) + ")\n" +
    "def _in(p=\"\"):\n    return str(_gi.pop(0)) if _gi else \"\"\nbuiltins.input = _in\n" + sol;
}

let pass = 0, fail = 0;
for (const topic of COURSES.python.topics) {
  if (!topic.stages.length) continue; // หัวข้อทฤษฎีไม่มีด่าน
  topic.stages.forEach((stage, i) => {
    const key = topic.id + "/" + i;
    const sol = SOL[key];
    if (!sol) { console.log("❌ " + key + " — ไม่มีเฉลย (" + stage.title + ")"); fail++; return; }
    let out;
    try {
      fs.writeFileSync("/tmp/_cq_sol.py", withShim(sol, stage.stdin));
      out = execSync("python3 /tmp/_cq_sol.py", { encoding: "utf8" });
    } catch (e) { console.log("❌ " + key + " \"" + stage.title + "\" — โปรแกรมพัง"); fail++; return; }
    if (!stage.check(out, sol)) { console.log("❌ " + key + " \"" + stage.title + "\" — เฉลยไม่ผ่าน | out: " + JSON.stringify(out)); fail++; return; }
    pass++;
    if (stage.check("", "")) { console.log("⚠️ " + key + " — โค้ดเปล่าดันผ่าน!"); fail++; }
  });
}
console.log("\nคอร์ส Python: ผ่าน " + pass + " / " + (pass + fail));
process.exit(fail ? 1 : 0);
