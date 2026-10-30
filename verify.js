/**
 * verify.js — ตรวจคำตอบซ้ำฝั่งเซิร์ฟเวอร์ ก่อนให้ EXP หรือคะแนนห้องแข่ง
 *
 * หลักการ: ห้ามเชื่อผลตรวจจาก browser — client ส่งมาแค่ "หลักฐาน" (โค้ดหรือคำตอบข้อสอบ)
 * แล้วเซิร์ฟเวอร์ตรวจเองด้วยตัวตรวจชุดเดียวกับที่หน้าเกมใช้ (โหลดจาก public/game.js)
 *
 *  - ข้อสอบทฤษฎี      : ตรวจคำตอบด้วย gradeQuestion ตัวเดียวกับหน้าเกม
 *  - ภาษา C           : รันโค้ดด้วยตัวแปล CRUN (มีเพดานจำนวนก้าว กันลูปไม่รู้จบ) + ตรวจการย่อหน้า
 *  - HTML / CSS       : เรนเดอร์ด้วย jsdom โดย "ปิดการรันสคริปต์" แล้วตรวจ DOM/สไตล์
 *  - Python v2        : รันซ้ำด้วย Pyodide (รุ่นเดียวกับเบราว์เซอร์) ใน worker_threads พร้อม timeout
 *                       ด้วย harness และเกณฑ์ตัดสินชุดเดียวกับเบราว์เซอร์ (lib/py-engine.js · public/py/py-grade.js)
 *                       → verifyAsync() · ผลตรวจจึงน่าเชื่อถือสำหรับ EXP และห้องแข่งขัน
 *  - Python เดิม / JS : ตรวจฝั่ง browser (verified: false) — แต่ละด่านให้ EXP ได้ครั้งเดียวจากตารางฝั่งเซิร์ฟเวอร์
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const CRUN = require("./public/c-interp.js");
const W = require("./public/web-run.js");
const VMOD = require("./public/vm.js");
let JSDOM = null;
try { JSDOM = require("jsdom").JSDOM; } catch { /* ไม่มี jsdom = ตรวจ HTML/CSS ฝั่ง client แทน */ }

const MAX_CODE = 20000;
const src = fs.readFileSync(path.join(__dirname, "public/game.js"), "utf8");

const eq = (out, s) => String(out).trim() === s;
const lines = out => String(out).trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));

// โหลดข้อมูลคอร์สใน context แยก ให้ตัวตรวจของแต่ละด่านเห็นตัวช่วยชุดเดียวกับหน้าเกม
const ctx = vm.createContext({ eq, lines, W, VM: VMOD });
const COURSES = vm.runInContext(
  "(" + src.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")", ctx
);
// หลักสูตร C++ อยู่ไฟล์แยก (คอมไพล์และตรวจด้วย Clang ในเบราว์เซอร์ของผู้เรียน)
COURSES.cpp = require("./public/courses/cpp.js");
const normSrc = src.match(/const normAns = [^\n]+/)[0];
const gradeSrc = src.match(/function gradeQuestion\(q, ans, order\) \{[\s\S]*?\n\}/)[0];
const { gradeQuestion } = new Function(normSrc + "\n" + gradeSrc + "\nreturn { gradeQuestion };")();

// หลักสูตร C v2 (C17): หัวข้อเดิมย้ายเป็น legacyTopics — ความคืบหน้าเดิมยังตรวจและนับได้
{
  const C2 = require("./public/courses/c2.js");
  COURSES.c.legacyTopics = COURSES.c.topics;
  COURSES.c.topics = C2.topics;
  COURSES.c.compiler = C2.compiler;
  COURSES.c.version = C2.version;
}
// หลักสูตร Python v2: ย้ายหัวข้อเดิมเป็น legacy เมื่อมีหัวข้อ v2 แล้วเท่านั้น (Phase 0 ยังว่าง → ไม่เปลี่ยนอะไร)
const PY2 = require("./public/courses/py2.js");
PY2.register(COURSES);
const PYG = require("./public/py/py-grade.js");
let pyEngine = null;   // สร้างเมื่อมีการตรวจ Python v2 ครั้งแรก (โหลด Pyodide ~3 วินาที แล้วใช้ซ้ำ)
const PY_TIMEOUT_MS = 4000;   // เผื่อเครื่องเซิร์ฟเวอร์ช้ากว่าเบราว์เซอร์เล็กน้อย (เบราว์เซอร์ใช้ 3 วินาที)

function findStage(lang, topic, idx) {
  const c = COURSES[lang];
  if (!c) return null;
  const t = c.topics.find(x => x.id === topic) || (c.legacyTopics || []).find(x => x.id === topic);   // รวมหัวข้อรุ่นก่อน (course versioning)
  return t && t.stages[idx] ? t.stages[idx] : null;
}

/**
 * ตรวจหลักฐานการผ่านด่าน
 * @returns {{ ok: boolean, verified: boolean, reason?: string }}
 */
function verify(lang, topic, idx, proof) {
  const stage = findStage(lang, topic, idx);
  if (!stage) return { ok: false, verified: true, reason: "ด่านไม่ถูกต้อง" };
  proof = proof || {};

  // ── ข้อสอบทฤษฎี ──
  if (Array.isArray(stage.quiz)) {
    const answers = Array.isArray(proof.answers) ? proof.answers : [];
    const orders = Array.isArray(proof.orders) ? proof.orders : [];
    const all = stage.quiz.every((q, i) => {
      try { return gradeQuestion(q, answers[i], Array.isArray(orders[i]) ? orders[i].map(String) : null); }
      catch { return false; }
    });
    return all ? { ok: true, verified: true } : { ok: false, verified: true, reason: "คำตอบข้อสอบยังไม่ถูกต้องครบทุกข้อ" };
  }

  const code = typeof proof.code === "string" ? proof.code : "";
  if (!code.trim()) return { ok: false, verified: true, reason: "ไม่พบโค้ดคำตอบ" };
  if (code.length > MAX_CODE) return { ok: false, verified: true, reason: "โค้ดยาวเกินกำหนด" };

  // ── ภาษา C หลักสูตรเดิม (legacy): รันซ้ำบนเซิร์ฟเวอร์ด้วย CRUN · ด่าน C v2 (มี tests) คอมไพล์ด้วย Clang ฝั่งเบราว์เซอร์ ──
  if (lang === "c" && !Array.isArray(stage.tests)) {
    try {
      const r = CRUN.run(code, stage.stdin || []);
      if (r.error) return { ok: false, verified: true, reason: "โค้ดทำงานผิดพลาด" };
      if (!stage.check(r.stdout, code)) return { ok: false, verified: true, reason: "ผลลัพธ์ไม่ตรงโจทย์" };
      if (!CRUN.checkIndent(code).ok) return { ok: false, verified: true, reason: "การย่อหน้ายังไม่ถูกต้อง" };
      return { ok: true, verified: true };
    } catch { return { ok: false, verified: true, reason: "ตรวจโค้ดไม่สำเร็จ" }; }
  }

  // ── HTML / CSS: เรนเดอร์โดยไม่รันสคริปต์ ──
  if ((lang === "html" || lang === "css") && JSDOM) {
    try {
      const dom = new JSDOM(W.buildSource(lang, code, stage)); // runScripts ปิดโดยปริยาย
      const doc = dom.window.document;
      const ok = !!stage.check(W.pageText(doc), code, doc);
      dom.window.close();
      return ok ? { ok: true, verified: true } : { ok: false, verified: true, reason: "หน้าเว็บยังไม่ตรงโจทย์" };
    } catch { return { ok: false, verified: true, reason: "ตรวจหน้าเว็บไม่สำเร็จ" }; }
  }

  // ── Python / JavaScript: ตรวจฝั่ง browser ──
  return { ok: true, verified: false };
}

/** ด่าน Python v2 (มี tests[]) — ต้องรันโค้ดจริง จึงเป็น async */
const isPyV2Stage = (lang, stage) => lang === "python" && !!stage && Array.isArray(stage.tests) && !stage.quiz;

async function verifyPython(stage, code) {
  if (!pyEngine) { const { PyEngine } = require("./lib/py-engine.js"); pyEngine = new PyEngine(); }
  for (const r of stage.require || []) {
    const srcCode = r.noComments ? code.replace(/(^|[^"'\\])#.*$/gm, "$1") : code;
    if (!new RegExp(r.re, r.flags || "").test(srcCode)) return { ok: false, verified: true, reason: "ยังไม่ตรงข้อกำหนดของโจทย์" };
  }
  const timeoutMs = Math.max(stage.timeoutMs || 0, PY_TIMEOUT_MS);
  for (const t of stage.tests) {
    const input = t.gen ? require("./public/cpp/testgen.js").make(t.gen) : (t.in || "");
    const r = await pyEngine.run({ code, files: t.files || stage.files, test: Object.assign({}, t, { in: input }) }, timeoutMs);
    if (!PYG.judge(t, r, { timeoutMs }).pass) return { ok: false, verified: true, reason: "ผลลัพธ์ไม่ตรงโจทย์" };
  }
  return { ok: true, verified: true };
}

/** ตรวจหลักฐานการผ่านด่าน — รองรับทุกภาษา (Python v2 รันโค้ดจริงจึงต้อง await) */
async function verifyAsync(lang, topic, idx, proof) {
  const stage = findStage(lang, topic, idx);
  if (!isPyV2Stage(lang, stage)) return verify(lang, topic, idx, proof);
  const code = proof && typeof proof.code === "string" ? proof.code : "";
  if (!code.trim()) return { ok: false, verified: true, reason: "ไม่พบโค้ดคำตอบ" };
  if (code.length > MAX_CODE) return { ok: false, verified: true, reason: "โค้ดยาวเกินกำหนด" };
  try { return await verifyPython(stage, code); }
  catch { return { ok: false, verified: true, reason: "ตรวจโค้ดไม่สำเร็จ" }; }
}

module.exports = { verify, verifyAsync, findStage, COURSES, isPyV2Stage };
