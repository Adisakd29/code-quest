/* ชุดทดสอบคอร์ส Python: รันเฉลยด้วย python3 จริง (รวมด่านเครื่องเสมือน: ไฟล์ / Tkinter / SQLite) */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");
const SOL = require("./sols-py.js");
global.W = require("../public/web-run.js");
global.VM = require("../public/vm.js");
const VM = global.VM, W = global.W;

const eq = (out, s) => out.trim() === s;
const lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));
const src = fs.readFileSync(path.join(__dirname, "../public/game.js"), "utf8");
const COURSES = eval("(" + src.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");

/** ประกอบโค้ดให้เหมือนที่เกมรันใน Pyodide: ไฟล์ตั้งต้น + Tk จำลอง + input จำลอง */
function build(sol, stage, gui) {
  let pre = "";
  if (stage.stdin && stage.stdin.length) {
    pre += "import builtins, json\n_gi = json.loads(" + JSON.stringify(JSON.stringify(stage.stdin)) + ")\n" +
      "def _in(p=\"\"):\n    return str(_gi.pop(0)) if _gi else \"\"\nbuiltins.input = _in\n";
  }
  if (gui) pre += VM.TK_MOCK + "\n_cq_reset()\n";
  if (stage.files) pre += VM.filesPrelude(stage.files);
  let post = "";
  if (gui) {
    if (stage.vmInput) post += "\n_cq_fill_first_entry(" + JSON.stringify(stage.vmInput) + ")";
    if (stage.vmClick) post += "\n_cq_click_text(" + JSON.stringify(stage.vmClick) + ")";
    post += "\nprint(\"__GUI__\" + _cq_dump())\n";
  }
  return pre + sol + "\n" + post;
}

function run(code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cq-"));
  fs.writeFileSync(path.join(dir, "main.py"), code);
  try { return execSync("python3 main.py", { cwd: dir, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }); }
  finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

let pass = 0, fail = 0;
for (const topic of COURSES.python.topics) {
  topic.stages.forEach((stage, i) => {
    if (stage.quiz) return; // ข้อสอบทฤษฎีมีชุดทดสอบแยก (test-quiz.js)
    const key = topic.id + "/" + i;
    const sol = SOL[key];
    if (!sol) { console.log("❌ " + key + " — ไม่มีเฉลย (" + stage.title + ")"); fail++; return; }
    const gui = !!stage.gui || /\bimport\s+tkinter|\bfrom\s+tkinter/.test(sol);
    let out, tree = null;
    try { out = run(build(sol, stage, gui)); }
    catch (e) { console.log("❌ " + key + " \"" + stage.title + "\" — โปรแกรมพัง: " + String(e.stderr || e.message).split("\n").slice(-3).join(" ")); fail++; return; }
    if (gui) { const parts = out.split("__GUI__"); out = parts[0]; tree = JSON.parse(parts[1]); }
    if (!stage.check(out, sol, tree)) { console.log("❌ " + key + " \"" + stage.title + "\" — เฉลยไม่ผ่าน | out: " + JSON.stringify(out) + (tree ? " | gui: " + JSON.stringify(VM.widgets(tree).map(w => w.type + ":" + w.text)) : "")); fail++; return; }
    pass++;
    if (stage.check("", "", gui ? { windows: [], messages: [] } : null)) { console.log("⚠️ " + key + " — โค้ดเปล่าดันผ่าน!"); fail++; }
  });
}
console.log("\nคอร์ส Python: ผ่าน " + pass + " / " + (pass + fail));
process.exit(fail ? 1 : 0);
