/**
 * world-themes.js — "4 โลกย่อย ในจักรวาลเดียวของ Code Quest"
 *
 * หลักการ: ทุกโลกใช้ typography, card, radius, spacing, ปุ่ม, interaction และไอคอน (Lucide) ชุดเดียวกัน
 * สิ่งที่ต่างกันมีแค่ "รส" (flavor) ซึ่งทั้งหมดมาจากไฟล์นี้:
 *   accent colors · ลวดลายพื้นหลัง (pattern) · ของประกอบ (props) · ตรา (emblem) · คำบรรยายโลก
 *
 * วิธีใช้กับ element ใดก็ได้:  WorldThemes.applyWorldTheme(el, "python")
 *   → ใส่ data-world และตัวแปร CSS (--w-accent, --w-ink, --w-soft, --w-line, --w-pattern)
 *   → CSS ใช้ตัวแปรเหล่านี้เท่านั้น ไม่มีสีของภาษาไหน hardcode ใน component
 *
 * ปรับเองได้ง่าย: แก้ LANGUAGE_THEME_MAP (สี/คำบรรยาย/ของประกอบ) หรือ PATTERNS (ลวดลาย)
 * ไอคอนของประกอบต้องมีใน tools/build-icons.js
 */
(function (root) {
  /**
   * @typedef {Object} WorldAccent
   * @property {string} base  สี accent หลัก (เส้นทาง, ขอบ, ของประกอบ)
   * @property {string} ink   สีสำหรับข้อความบนพื้นขาว/พื้นอ่อน — ต้องคอนทราสต์ ≥ 4.5:1 (ตรวจใน tests/test-themes.js)
   * @property {string} soft  พื้นอ่อนมากสำหรับฉากหลัง
   * @property {string} line  สีเส้นลวดลาย (โปร่งใสสูง)
   */
  /**
   * @typedef {Object} WorldTheme
   * @property {string} id           รหัสโลก (html กับ css อยู่โลกเดียวกัน: "builder")
   * @property {string} displayName  ชื่อภาษา
   * @property {string} worldName    ชื่อโลก
   * @property {string} tagline      คำบรรยายสั้น
   * @property {string} blurb        คำอธิบายสั้นมากสำหรับรายการภาษาในหน้าแรก
   * @property {string} mood         อารมณ์ของโลก (ใช้เป็นแนวทางออกแบบ/เอกสาร)
   * @property {WorldAccent} accent
   * @property {"vines"|"circuit"|"wireframe"|"network"|"blueprint"} pattern  ลวดลายพื้นหลัง
   * @property {string[]} props      ไอคอน Lucide ที่ใช้เป็นของประกอบฉาก
   * @property {string} emblem       ไอคอนตราประจำโลก
   * @property {"leaf"|"rivet"|"frame"|"spark"} badgeStyle  ลายมุมของกรอบโลโก้/การ์ด
   * @property {boolean} [recommended]
   */

  /** @type {Record<string, WorldTheme>} */
  const LANGUAGE_THEME_MAP = {
    python: {
      id: "jungle", displayName: "Python", worldName: "Python Planet",
      tagline: "ดาวป่าสีเขียวของงูน้อย — เหมาะกับมือใหม่ที่สุด", blurb: "เหมาะกับมือใหม่",
      mood: "เป็นมิตร สงบ เป็นธรรมชาติ เหมาะกับการเริ่มต้น",
      accent: { base: "#0f9d77", ink: "#0a6b52", soft: "#eaf7f2", line: "rgba(15,157,119,.16)" },
      pattern: "vines", props: ["leaf", "sprout", "trees", "compass"], emblem: "sprout", badgeStyle: "leaf", recommended: true,
    },
    c: {
      id: "forge", displayName: "C", worldName: "C Forge",
      tagline: "โรงงานเครื่องจักรและหน่วยความจำ — ฝึกคิดแบบคอมพิวเตอร์", blurb: "ตัวแปร ลูป พอยน์เตอร์ ฟังก์ชัน",
      mood: "เทคนิค แม่นยำ เป็นระบบ แบบเครื่องจักร",
      accent: { base: "#0e7490", ink: "#155e75", soft: "#edf3f6", line: "rgba(71,85,105,.16)" },
      pattern: "circuit", props: ["cog", "cpu", "circuit-board", "terminal"], emblem: "cpu", badgeStyle: "rivet",
    },
    cpp: {
      id: "foundry", displayName: "C++", worldName: "C++ Foundry",
      tagline: "โรงหล่อวิศวกรรมความเร็วสูง — จากพื้นฐานถึง C++20 ระดับมืออาชีพ", blurb: "C++20 คอมไพล์จริงในเบราว์เซอร์",
      mood: "วิศวกรรม ประสิทธิภาพสูง แม่นยำ ทันสมัย",
      accent: { base: "#00599C", ink: "#004a82", soft: "#eaf2f9", line: "rgba(0,89,156,.15)" },
      pattern: "blueprint", props: ["cpu", "cog", "wrench", "circuit-board"], emblem: "cpu", badgeStyle: "rivet",
    },
    html: {
      id: "builder", displayName: "HTML5", worldName: "HTML World",
      tagline: "เมืองแห่งการก่อสร้าง — วางโครงของทุกเว็บไซต์", blurb: "โครงสร้างหน้าเว็บ",
      mood: "สร้างสรรค์ เป็นรูปธรรม ประกอบทีละชิ้น",
      accent: { base: "#e4572e", ink: "#ae3a12", soft: "#fff3ec", line: "rgba(228,87,46,.15)" },
      pattern: "wireframe", props: ["building-2", "layout-panel-top", "hammer", "ruler"], emblem: "building-2", badgeStyle: "frame",
    },
    css: {
      id: "builder", displayName: "CSS3", worldName: "CSS Garden",
      tagline: "เมืองเดียวกับ HTML — มาแต่งสี ตัวอักษร และเลย์เอาต์", blurb: "สี เลย์เอาต์ Flexbox Grid",
      mood: "สร้างสรรค์ งานออกแบบ ตกแต่งสิ่งที่สร้างไว้",
      accent: { base: "#2563eb", ink: "#1d4ed8", soft: "#eef3ff", line: "rgba(37,99,235,.14)" },
      pattern: "wireframe", props: ["palette", "ruler", "layout-panel-top", "blocks"], emblem: "palette", badgeStyle: "frame",
    },
    js: {
      id: "energy", displayName: "JavaScript", worldName: "JavaScript City",
      tagline: "มหานครพลังงาน — ทำให้หน้าเว็บขยับและตอบสนอง", blurb: "ทำให้เว็บโต้ตอบได้",
      mood: "มีพลัง ตื่นตัว ตอบสนองไว สนุก",
      accent: { base: "#d99a00", ink: "#8a5a00", soft: "#fff8e3", line: "rgba(29,25,54,.13)" },
      pattern: "network", props: ["zap", "share-2", "activity", "sparkles"], emblem: "zap", badgeStyle: "spark",
    },
  };
  const FALLBACK = "python";

  /**
   * ลวดลายพื้นหลังแบบกระเบื้อง (SVG เล็กมาก < 1KB) — เส้น 1.5px ปลายมน ให้เข้ากับไอคอน Lucide
   * @type {Record<string, (c: string) => string>}
   */
  const PATTERNS = {
    // เถาวัลย์และใบไม้ — เส้นโค้งนุ่ม
    vines: c => `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"><path d="M-4 70c18-6 26-26 44-30s30 10 60 2"/><path d="M26 44c-6-8-2-16 6-18 2 8-1 15-6 18z"/><path d="M58 36c4-9 13-11 19-6-5 7-12 9-19 6z"/><circle cx="14" cy="18" r="1.6"/><circle cx="80" cy="78" r="1.6"/></svg>`,
    // ตาราง + ลายวงจร — แม่นยำเป็นระบบ
    circuit: c => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"><path d="M0 .5h64M.5 0v64" opacity=".6"/><path d="M12 12h16v14h14"/><circle cx="12" cy="12" r="2.2"/><circle cx="42" cy="26" r="2.2"/><path d="M50 44v10H34"/><rect x="28" y="50" width="6" height="8" rx="1"/></svg>`,
    // โครงร่างหน้าเว็บ — กล่องและหน้าต่าง
    wireframe: c => `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="80" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"><rect x="8" y="8" width="38" height="26" rx="4"/><path d="M8 15h38"/><rect x="54" y="8" width="30" height="12" rx="3"/><rect x="54" y="26" width="30" height="8" rx="3"/><rect x="8" y="44" width="76" height="24" rx="4" stroke-dasharray="4 5"/></svg>`,
    // พิมพ์เขียววิศวกรรม — ตารางละเอียด + เส้นบอกขนาด
    blueprint: c => `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" stroke="${c}" stroke-width="1.2" stroke-linecap="round"><path d="M0 .5h80M.5 0v80M0 40.5h80M40.5 0v80" opacity=".5"/><rect x="12" y="12" width="20" height="14" rx="2"/><path d="M12 32h20M12 30v4M32 30v4"/><circle cx="60" cy="58" r="8"/><path d="M60 46v-4M72 58h4"/></svg>`,
    // โหนดเชื่อมกัน + ประกายไฟ — พลังงานและการเชื่อมต่อ
    network: c => `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"><path d="M14 20l30 14 28-18M44 34l-6 32 34 6"/><circle cx="14" cy="20" r="3"/><circle cx="44" cy="34" r="3.5"/><circle cx="72" cy="16" r="3"/><circle cx="38" cy="66" r="3"/><circle cx="72" cy="72" r="3"/><path d="M66 44l-4 8h6l-4 8"/></svg>`,
  };
  const patternUrl = (name, color) => 'url("data:image/svg+xml,' + encodeURIComponent((PATTERNS[name] || PATTERNS.vines)(color)) + '")';

  /**
   * @param {string} lang  "python" | "c" | "html" | "css" | "js"
   * @returns {WorldTheme & {lang: string}}
   */
  function getLanguageTheme(lang) {
    const key = LANGUAGE_THEME_MAP[lang] ? lang : FALLBACK;
    return Object.assign({ lang: key }, LANGUAGE_THEME_MAP[key]);
  }

  /** ตัวแปร CSS ของโลก — component ทุกตัวอ่านจากตัวแปรเหล่านี้ */
  function themeVars(lang) {
    const t = getLanguageTheme(lang);
    return { "--w-accent": t.accent.base, "--w-ink": t.accent.ink, "--w-soft": t.accent.soft, "--w-line": t.accent.line, "--w-pattern": patternUrl(t.pattern, t.accent.line) };
  }

  /**
   * ใส่ธีมของโลกให้ element (ใช้ได้กับการ์ด, หน้า, แผง) — โครงสร้างของ element ไม่เปลี่ยน
   * @param {HTMLElement} el
   * @param {string} lang
   */
  function applyWorldTheme(el, lang) {
    if (!el) return;
    const t = getLanguageTheme(lang), v = themeVars(lang);
    el.dataset.world = t.id;
    el.dataset.lang = t.lang;
    el.dataset.badge = t.badgeStyle;
    for (const k of Object.keys(v)) el.style.setProperty(k, v[k]);
  }

  /** ของประกอบฉาก (ตกแต่งล้วน aria-hidden) — ตำแหน่งกำหนดใน CSS ด้วยคลาส p1..p4 */
  function propsHtml(t, size) {
    return t.props.map((ic, i) => '<span class="w-prop p' + (i + 1) + '">' + UIKit.AppIcon(ic, { size: size || 28, stroke: 1.75 }) + "</span>").join("");
  }

  /**
   * <LanguageThemeBanner /> — แถบหัวของโลก ใช้ในหน้าบทเรียน/หัวแผนที่
   * @param {string} lang
   * @param {{eyebrow?: string, title?: string, subtitle?: string}} [o]
   * @returns {string}
   */
  function LanguageThemeBanner(lang, o) {
    o = o || {};
    const t = getLanguageTheme(lang), esc = UIKit.esc;
    return '<div class="world-banner" data-world="' + t.id + '">' +
      '<div class="wb-emblem">' + UIKit.LanguageIcon(t.lang, { box: 52, logo: 30, title: false }) + "</div>" +
      '<div class="wb-text"><div class="wb-eyebrow">' + UIKit.AppIcon(t.emblem, { size: 14 }) + "<span>" + esc(o.eyebrow || t.worldName) + "</span></div>" +
        (o.title ? '<div class="wb-title">' + esc(o.title) + "</div>" : "") +
        '<div class="wb-sub">' + esc(o.subtitle || t.tagline) + "</div></div>" +
      '<div class="wb-props" aria-hidden="true">' + propsHtml(t, 26) + "</div></div>";
  }

  /**
   * <QuestWorldDecoration /> — ของประกอบฉากรอบแผนที่ (ไม่ทับเส้นทาง/โหนด, ไม่รับคลิก)
   * @param {string} lang
   * @returns {string}
   */
  function QuestWorldDecoration(lang) {
    const t = getLanguageTheme(lang);
    return '<div class="world-deco" aria-hidden="true">' + propsHtml(t, 34) + "</div>";
  }

  /**
   * <LanguageAccentCard /> — ใส่รสของโลกให้การ์ดที่มีอยู่แล้ว (โครงสร้างการ์ดเหมือนเดิมทุกภาษา)
   * @param {HTMLElement} card
   * @param {string} lang
   */
  function decorateAccentCard(card, lang) {
    applyWorldTheme(card, lang);
    if (card.querySelector(":scope > .card-motif")) return;
    const m = document.createElement("span");
    m.className = "card-motif"; m.setAttribute("aria-hidden", "true");
    m.innerHTML = UIKit.AppIcon(getLanguageTheme(lang).emblem, { size: 22, stroke: 1.75 });
    card.appendChild(m);
  }

  const api = { LANGUAGE_THEME_MAP, PATTERNS, getLanguageTheme, themeVars, applyWorldTheme, LanguageThemeBanner, QuestWorldDecoration, decorateAccentCard };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.WorldThemes = api;
})(typeof window !== "undefined" ? window : globalThis);
