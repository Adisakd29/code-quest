/**
 * tools/build-icons.js — สร้าง public/icons.js จากแพ็กเกจไอคอน (รันเมื่อเพิ่ม/ลดไอคอน: npm run build:icons)
 *
 * - UI icons     : Lucide (lucide-static, ISC)       — ชุดเดียวสำหรับไอคอน UI ทั้งเว็บ
 * - Language logo: Simple Icons (simple-icons, CC0)  — โลโก้แบรนด์จริง + สีทางการจากแพ็กเกจ
 *
 * ผลลัพธ์เป็นไฟล์ในโปรเจกต์ (ไม่ hotlink จากเว็บภายนอก) และ commit ไว้เลย
 * เซิร์ฟเวอร์ production จึงไม่ต้องมีขั้นตอน build เพิ่ม
 */
const fs = require("fs");
const path = require("path");
const si = require("simple-icons");

const ROOT = path.join(__dirname, "..");
const LUCIDE_DIR = path.join(ROOT, "node_modules/lucide-static/icons");
const pkg = name => JSON.parse(fs.readFileSync(path.join(ROOT, "node_modules", name, "package.json"), "utf8"));

/** ชื่อที่ใช้ในโค้ด → ชื่อไฟล์ใน Lucide */
const UI = {
  home: "house", learn: "book-open", book: "book-open", trophy: "trophy", user: "user", settings: "settings",
  hint: "lightbulb", play: "play", reset: "rotate-ccw", copy: "copy", users: "users", battle: "swords",
  login: "log-in", logout: "log-out", "check-circle": "circle-check", lock: "lock", "chevron-right": "chevron-right",
  "chevron-left": "chevron-left", back: "arrow-left", "volume-on": "volume-2", "volume-off": "volume-x", eye: "eye",
  "eye-off": "eye-off", maximize: "maximize-2", minimize: "minimize-2", keyboard: "keyboard", camera: "camera",
  edit: "pencil", crown: "crown", medal: "medal", award: "award", rocket: "rocket", compass: "compass", globe: "globe",
  orbit: "orbit", graduation: "graduation-cap", calendar: "calendar", flag: "flag", quiz: "clipboard-check",
  spinner: "loader-circle", "x-circle": "circle-x", warning: "triangle-alert", guest: "flask-conical", sparkles: "sparkles",
  target: "target", bug: "bug", repeat: "repeat", blocks: "blocks", cog: "cog", code: "code", star: "star", hand: "hand",
  shield: "shield", timer: "timer", trash: "trash-2", close: "x", check: "check", map: "map", door: "door-open",
  "user-plus": "user-plus", zap: "zap", gift: "gift", refresh: "refresh-cw", info: "info", terminal: "terminal",
  monitor: "monitor", checklist: "list-checks",
  // ── ไอคอนประจำหัวข้อบนแผนที่ภารกิจ (ใช้ชื่อไฟล์ Lucide ตรงๆ ดู public/stage-icons.js) ──
  "square-terminal": "square-terminal", "code-xml": "code-xml", package: "package", layers: "layers", quote: "quote",
  list: "list", "list-ordered": "list-ordered", brackets: "brackets", "key-round": "key-round", calculator: "calculator",
  split: "split", workflow: "workflow", "square-function": "square-function", "shield-alert": "shield-alert",
  boxes: "boxes", "file-text": "file-text", "app-window": "app-window", database: "database", plug: "plug",
  "chart-column": "chart-column", lightbulb: "lightbulb", "arrow-left-right": "arrow-left-right", "at-sign": "at-sign",
  type: "type", link: "link", image: "image", table: "table", "text-cursor-input": "text-cursor-input",
  "layout-template": "layout-template", palette: "palette", baseline: "baseline", "square-dashed": "square-dashed",
  crosshair: "crosshair", "columns-3": "columns-3", "layout-grid": "layout-grid", move: "move",
  "monitor-smartphone": "monitor-smartphone", braces: "braces", network: "network", "mouse-pointer-click": "mouse-pointer-click",
  hourglass: "hourglass", "toggle-right": "toggle-right", "circle-dot": "circle-dot", wrench: "wrench", laptop: "laptop",
  // ── ของประกอบประจำโลก (ใช้ใน public/world-themes.js) — เส้นแบบ Lucide เดียวกับไอคอน UI ──
  leaf: "leaf", sprout: "sprout", trees: "trees", cpu: "cpu", "circuit-board": "circuit-board",
  "building-2": "building-2", "layout-panel-top": "layout-panel-top", hammer: "hammer", ruler: "ruler",
  "share-2": "share-2", activity: "activity",
};

/** ภาษาในเกม → ไอคอนใน Simple Icons (ใช้เป็นตัวสำรองเมื่อไม่มีไฟล์โลโก้) */
const LANGS = { python: "siPython", c: "siC", cpp: "siCplusplus", html: "siHtml5", css: "siCss", js: "siJavascript" };

/**
 * โลโก้ภาษาแบบหลายสีที่เจ้าของโปรเจกต์จัดหาให้ (public/img/lang/*.png ขนาด 192px จัตุรัส)
 * ถ้ามีไฟล์ จะใช้แทนโลโก้สีเดียวของ Simple Icons · สีแบรนด์วัดจากสีหลักของไฟล์โลโก้
 * แทนที่โลโก้: วางไฟล์ใหม่ชื่อเดิมแล้วรัน npm run build:icons (ชื่อไฟล์ได้ ?v=hash ใหม่ เบราว์เซอร์จึงไม่ใช้ภาพเก่า)
 */
const LANG_LOGOS = {"js": "#D8B838", "css": "#2848E8", "html": "#E84828", "c": "#5868C8", "python": "#3878A8"};

function lucideInner(file) {
  const f = path.join(LUCIDE_DIR, file + ".svg");
  if (!fs.existsSync(f)) throw new Error("ไม่พบไอคอน Lucide ชื่อ \"" + file + "\"");
  const svg = fs.readFileSync(f, "utf8");
  const inner = svg.replace(/<!--[\s\S]*?-->/g, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return inner.replace(/\s*\n\s*/g, "").replace(/\s+\/>/g, "/>").trim();
}

/** ความสว่างสัมพัทธ์ (WCAG) — ใช้เลือกพื้นหลังกรอบโลโก้ให้โลโก้สีอ่อนยังมองเห็นชัด */
function luminance(hex) {
  const c = [0, 2, 4].map(i => parseInt(hex.substr(i, 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

const ui = {};
for (const [name, file] of Object.entries(UI)) ui[name] = lucideInner(file);

const lang = {};
for (const [id, key] of Object.entries(LANGS)) {
  const icon = si[key];
  if (!icon) throw new Error("ไม่พบโลโก้ " + key + " ใน simple-icons");
  // โลโก้สีอ่อน (เช่น JavaScript สีเหลือง, C สีฟ้าอ่อน) จะวางบนพื้นเข้มเพื่อคอนทราสต์ที่ดี
  lang[id] = { title: icon.title, hex: "#" + icon.hex, path: icon.path, onDark: luminance(icon.hex) > 0.4 };
  const file = path.join(ROOT, "public/img/lang", id + ".png");
  if (fs.existsSync(file) && LANG_LOGOS[id]) {
    const v = require("crypto").createHash("sha1").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
    Object.assign(lang[id], { img: "/img/lang/" + id + ".png?v=" + v, hex: LANG_LOGOS[id], onDark: false });   // โลโก้หลายสีอ่านได้บนพื้นขาว
  }
}

const out = `/* ไฟล์นี้สร้างอัตโนมัติด้วย tools/build-icons.js — อย่าแก้ด้วยมือ
 * UI icons: Lucide v${pkg("lucide-static").version} (ISC License) · Language logos: Simple Icons v${pkg("simple-icons").version} (CC0-1.0)
 * รายละเอียดสัญญาอนุญาต: /ICONS-LICENSES.md */
const ICON_DATA = ${JSON.stringify({ ui, lang })};
if (typeof module !== "undefined") module.exports = ICON_DATA;
`;
fs.writeFileSync(path.join(ROOT, "public/icon-data.js"), out);

// โลโก้ภาษาแบบ SVG สีเดียว (ตัวสำรอง) — เขียนเฉพาะภาษาที่ไม่มีไฟล์โลโก้หลายสี
for (const [id, l] of Object.entries(lang)) {
  if (l.img) continue;
  fs.writeFileSync(path.join(ROOT, "public/img/lang-" + id + ".svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" role="img"><title>${l.title}</title><path fill="${l.hex}" d="${l.path}"/></svg>`);
}

fs.writeFileSync(path.join(ROOT, "public/ICONS-LICENSES.md"), `# สัญญาอนุญาตของไอคอน

## Lucide (ไอคอน UI)
แพ็กเกจ lucide-static v${pkg("lucide-static").version} — ISC License
Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
https://lucide.dev

## โลโก้ภาษาโปรแกรม (public/img/lang/*.png)
ไฟล์โลโก้หลายสีที่เจ้าของโปรเจกต์จัดหาให้ ใช้เพื่อระบุภาษาโปรแกรมเท่านั้น โลโก้เป็นเครื่องหมายการค้าของเจ้าของแต่ละราย
(Python — Python Software Foundation · HTML5 — W3C, สัญญาอนุญาต CC BY 3.0 · CSS3 และ JavaScript — โลโก้จากชุมชนผู้พัฒนา)
เจ้าของโปรเจกต์รับผิดชอบตรวจสอบสิทธิ์การใช้ไฟล์ที่นำมาใส่ โดยเฉพาะไฟล์ที่ได้มาจากเว็บคลังภาพทั่วไป

## Simple Icons (โลโก้ภาษาสำรอง)
แพ็กเกจ simple-icons v${pkg("simple-icons").version} — CC0 1.0 Universal
โลโก้เป็นเครื่องหมายการค้าของเจ้าของแต่ละราย (Python Software Foundation, W3C ฯลฯ) ใช้เพื่อระบุภาษาโปรแกรมเท่านั้น
ไม่ได้แสดงว่าเจ้าของเครื่องหมายรับรองหรือสนับสนุน Code Quest — ดู DISCLAIMER ของ Simple Icons
https://simpleicons.org
`);

console.log("สร้าง icon-data.js: UI " + Object.keys(ui).length + " ไอคอน, โลโก้ภาษา " + Object.keys(lang).length + " ภาษา");
for (const [id, l] of Object.entries(lang)) console.log("  " + id.padEnd(7) + l.title.padEnd(11) + l.hex + (l.onDark ? "  (วางบนพื้นเข้ม)" : ""));
