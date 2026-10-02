/* ชุดทดสอบข้อสอบทฤษฎี: ตรวจโครงสร้างทุกข้อ และยืนยันว่าตัวตรวจของเกมยอมรับคำตอบที่ถูก/ปฏิเสธคำตอบที่ผิด */
const fs = require("fs");
const path = require("path");
global.W = require("../public/web-run.js");
global.VM = require("../public/vm.js");
const eq = () => true, lines = () => [];
const src = fs.readFileSync(path.join(__dirname, "../public/game.js"), "utf8");
const COURSES = eval("(" + src.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");

// ดึงตัวตรวจคำตอบตัวจริงจากเกมมาใช้ (ไม่เขียนซ้ำ เพื่อให้ทดสอบโค้ดเดียวกับที่ผู้เล่นใช้)
const normSrc = src.match(/const normAns = [^\n]+/)[0];
const gradeSrc = src.match(/function gradeQuestion\(q, ans, order\) \{[\s\S]*?\n\}/)[0];
const { gradeQuestion } = new Function(normSrc + "\n" + gradeSrc + "\nreturn { gradeQuestion };")();

let pass = 0, fail = 0, questions = 0;
const kinds = { mc: 0, tf: 0, fill: 0, order: 0 };
const bad = (key, msg) => { console.log("❌ " + key + " — " + msg); fail++; };

for (const lang of Object.keys(COURSES)) {
  for (const topic of COURSES[lang].topics) {
    topic.stages.forEach((stage, si) => {
      if (!stage.quiz) return;
      const key = lang + ":" + topic.id + "/" + si;
      if (!Array.isArray(stage.quiz) || stage.quiz.length < 3) return bad(key, "ข้อสอบต้องมีอย่างน้อย 3 ข้อ");
      if (!(stage.xp > 0)) return bad(key, "ไม่มี xp");
      let ok = true;
      stage.quiz.forEach((q, qi) => {
        const k = key + " ข้อ " + (qi + 1);
        questions++;
        kinds[q.t] = (kinds[q.t] || 0) + 1;
        if (!q.q || !q.e) { bad(k, "ไม่มีคำถามหรือคำอธิบาย"); ok = false; return; }
        let right, wrong;
        if (q.t === "mc") {
          if (!Array.isArray(q.c) || q.c.length < 3 || !(q.a >= 0 && q.a < q.c.length)) { bad(k, "ตัวเลือก/เฉลยปรนัยไม่ถูกต้อง"); ok = false; return; }
          if (new Set(q.c).size !== q.c.length) { bad(k, "มีตัวเลือกซ้ำกัน"); ok = false; return; }
          right = [q.a]; wrong = [(q.a + 1) % q.c.length];
        } else if (q.t === "tf") {
          if (typeof q.a !== "boolean") { bad(k, "เฉลยถูก/ผิดต้องเป็น true/false"); ok = false; return; }
          right = [q.a]; wrong = [!q.a];
        } else if (q.t === "fill") {
          if (!Array.isArray(q.a) || !q.a.length || !q.q.includes("___")) { bad(k, "ข้อเติมคำต้องมี ___ และเฉลย"); ok = false; return; }
          right = [q.a[0], "  " + String(q.a[0]).toUpperCase() + " "]; wrong = ["คำตอบผิดแน่นอน"];
        } else if (q.t === "order") {
          if (!Array.isArray(q.items) || q.items.length < 3) { bad(k, "ข้อเรียงลำดับต้องมีอย่างน้อย 3 รายการ"); ok = false; return; }
          right = [null, q.items.slice()]; wrong = [null, q.items.slice().reverse()];
        } else { bad(k, "ไม่รู้จักรูปแบบคำถาม " + q.t); ok = false; return; }
        const g = arr => q.t === "order" ? gradeQuestion(q, null, arr[1]) : gradeQuestion(q, arr[0]);
        if (!g(right)) { bad(k, "ตัวตรวจไม่ยอมรับคำตอบที่ถูก"); ok = false; }
        if (g(wrong)) { bad(k, "ตัวตรวจยอมรับคำตอบที่ผิด"); ok = false; }
      });
      if (ok) pass++;
    });
  }
}
console.log("\nข้อสอบทฤษฎี: ผ่าน " + pass + " ชุด (" + questions + " ข้อ — ปรนัย " + kinds.mc + ", ถูก/ผิด " + kinds.tf + ", เติมคำ " + kinds.fill + ", เรียงลำดับ " + kinds.order + ")" + (fail ? " | พบปัญหา " + fail + " จุด" : " ✓"));
process.exit(fail ? 1 : 0);
