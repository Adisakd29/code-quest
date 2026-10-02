/**
 * verify.js — ตรวจคำตอบซ้ำฝั่งเซิร์ฟเวอร์ ก่อนให้ EXP หรือคะแนนห้องแข่ง
 *
 * หลักการ: ห้ามเชื่อผลตรวจจาก browser — client ส่งมาแค่ "หลักฐาน" (โค้ดหรือคำตอบข้อสอบ)
 * แล้วเซิร์ฟเวอร์ตรวจเองด้วยตัวตรวจชุดเดียวกับที่หน้าเกมใช้ (โหลดจาก public/game.js)
 *
 *  - ข้อสอบทฤษฎี      : ตรวจคำตอบด้วย gradeQuestion ตัวเดียวกับหน้าเกม
 *  - ภาษา C           : รันโค้ดด้วยตัวแปล CRUN (มีเพดานจำนวนก้าว กันลูปไม่รู้จบ) + ตรวจการย่อหน้า
 *  - HTML / CSS       : เรนเดอร์ด้วย jsdom โดย "ปิดการรันสคริปต์" แล้วตรวจ DOM/สไตล์
 *  - Python / JS      : ต้องรันโค้ดของผู้เรียน ซึ่งไม่ปลอดภัยที่จะรันบนเซิร์ฟเวอร์โดยไม่มี sandbox
 *                       จึงตรวจฝั่ง browser (verified: false) — ผลกระทบจำกัด เพราะแต่ละด่านให้ EXP
 *                       ได้ครั้งเดียวและค่า EXP มาจากตารางฝั่งเซิร์ฟเวอร์เสมอ
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

module.exports = { verify, findStage, COURSES };
