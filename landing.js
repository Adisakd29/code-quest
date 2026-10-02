/**
 * landing.js — ค่าที่ใช้ในหน้าแรก (index.html) คำนวณจากข้อมูลคอร์สทั้งหมด
 * ไม่มีจำนวนภาษา/จำนวนภารกิจ/รายชื่อภาษาเขียนตายตัว — เพิ่มภาษาหรือภารกิจแล้วหน้าแรกอัปเดตเอง
 * ลำดับภาษา = ลำดับโลกใน public/world-themes.js (ชุดเดียวกับการ์ดในแดชบอร์ด)
 */
const WT = require("./public/world-themes.js");

const stageCount = c => c.topics.reduce((n, t) => n + t.stages.length, 0);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/** รายการภาษาตามลำดับโลก (เฉพาะภาษาที่มีคอร์สจริง) */
function languages(courses) {
  const order = Object.keys(WT.LANGUAGE_THEME_MAP).filter(k => courses[k]);
  const rest = Object.keys(courses).filter(k => !order.includes(k));   // ภาษาที่ยังไม่มีธีม ต่อท้าย
  return [...order, ...rest].map(id => {
    const t = WT.LANGUAGE_THEME_MAP[id] || {};
    return { id, name: courses[id].name || id, world: t.worldName || courses[id].name, blurb: t.blurb || "", stages: stageCount(courses[id]) };
  });
}
/** "ก, ข และ ค" */
const thaiList = names => names.length <= 1 ? names.join("") : names.slice(0, -1).join(", ") + " และ " + names[names.length - 1];

/**
 * @param {object} courses  COURSES ทั้งหมด (รวม C++)
 * @param {(lang: string, box: number) => string} languageIcon  ตัววาดโลโก้ภาษา (UIKit.LanguageIcon)
 */
function landingValues(courses, languageIcon) {
  const langs = languages(courses);
  const vals = {
    STAGES: langs.reduce((n, l) => n + l.stages, 0),
    N_LANGS: langs.length,
    LANG_NAMES_DOT: langs.map(l => l.name).join(" · "),
    LANG_NAMES_LIST: thaiList(langs.map(l => l.name)),
    LANG_NAMES_PLAIN: langs.map(l => l.name).join(", "),
    LANG_CARDS: langs.map(l => "<li>" + languageIcon(l.id, 64) + "<b>" + esc(l.name) + "</b><span>" + esc(l.world) + " · " + l.stages + " ภารกิจ" +
      (l.blurb ? " · " + esc(l.blurb) : "") + "</span></li>").join("\n      "),
  };
  for (const l of langs) vals["N_" + l.id.toUpperCase()] = l.stages;   // N_PYTHON, N_CPP, … (คงไว้ให้ใช้ในข้อความอื่นได้)
  return vals;
}

module.exports = { languages, landingValues, stageCount };
