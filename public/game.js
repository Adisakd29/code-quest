/* ═══════════════ เนื้อหาเกม ═══════════════
   ⚠️ ค่า xp ของแต่ละด่านต้องตรงกับ STAGE_XP ใน server.js */
const eq = (out, s) => out.trim() === s;
const lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));
const W = typeof WEB !== "undefined" ? WEB : null; // ตัวช่วยตรวจ DOM/สไตล์ สำหรับคอร์ส HTML/CSS/JS

/* ═══════════════ ไอคอนกราฟิก (SVG) ═══════════════ */
const ICONS = {
  input: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 5v7" stroke="#6ee7a0" stroke-width="3" stroke-linecap="round"/><path d="M20 9l4 4 4-4" fill="#6ee7a0"/><rect x="4" y="15" width="40" height="24" rx="5" fill="#1b2040" stroke="#62e6ff" stroke-width="3"/><rect x="9" y="20" width="5" height="4.5" rx="1.2" fill="#9aa2d8"/><rect x="16.5" y="20" width="5" height="4.5" rx="1.2" fill="#9aa2d8"/><rect x="24" y="20" width="5" height="4.5" rx="1.2" fill="#9aa2d8"/><rect x="31.5" y="20" width="7.5" height="4.5" rx="1.2" fill="#ff6b81"/><rect x="12" y="29" width="24" height="5.5" rx="2.2" fill="#ffb347"/></svg>',
  python: '<svg viewBox="0 0 48 48" fill="none"><path d="M23.6 4c-5.5 0-8.4 2.2-8.4 6.2V14h9.2v1.6H10.9C6.6 15.6 3 18.3 3 24c0 5.7 3.6 8.4 7.9 8.4h3.5v-4.8c0-4.4 3.5-7.6 8-7.6h8.2c3.6 0 6.6-2.9 6.6-6.6v-3.2C37.2 6.1 33.8 4 29.5 4h-5.9z" fill="#3776ab"/><circle cx="18.6" cy="9.6" r="2.1" fill="#fff"/><path d="M24.4 44c5.5 0 8.4-2.2 8.4-6.2V34h-9.2v-1.6h13.5c4.3 0 7.9-2.7 7.9-8.4 0-5.7-3.6-8.4-7.9-8.4h-3.5v4.8c0 4.4-3.5 7.6-8 7.6h-8.2c-3.6 0-6.6 2.9-6.6 6.6v3.2c0 4.1 3.4 6.2 7.7 6.2h5.9z" fill="#ffd43b"/><circle cx="29.4" cy="38.4" r="2.1" fill="#fff"/></svg>',
  print: '<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="5" width="20" height="9" rx="2" fill="#9aa2d8"/><rect x="7" y="14" width="34" height="15" rx="4" fill="#62e6ff"/><circle cx="35" cy="19" r="2" fill="#0f1226"/><rect x="13" y="24" width="22" height="17" rx="2" fill="#eef0ff"/><rect x="17" y="30" width="14" height="2.5" rx="1.2" fill="#2e3563"/><rect x="17" y="35" width="9" height="2.5" rx="1.2" fill="#2e3563"/></svg>',
  variable: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 5l17 8.5v17L24 43 7 30.5v-17L24 5z" fill="#e09a2f"/><path d="M24 5l17 8.5L24 22 7 13.5 24 5z" fill="#ffd98a"/><path d="M24 22v21l17-12.5v-17L24 22z" fill="#ffb347"/><rect x="14" y="27" width="6" height="6" rx="1.4" fill="#fff3d6" opacity=".65"/></svg>',
  string: '<svg viewBox="0 0 48 48" fill="none"><rect x="5" y="9" width="38" height="30" rx="7" fill="#1b2040" stroke="#62e6ff" stroke-width="3"/><path d="M14 19c0-3.4 2.2-5.5 5.5-5.5v4c-1.3 0-2 .6-2 2.1h3.2V26H14v-7z" fill="#ffb347"/><path d="M25.5 19c0-3.4 2.2-5.5 5.5-5.5v4c-1.3 0-2 .6-2 2.1h3.2V26h-6.7v-7z" fill="#ffb347"/><rect x="13" y="30" width="22" height="3.4" rx="1.7" fill="#62e6ff"/></svg>',
  datastructure: '<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="7" width="15" height="15" rx="4" fill="#62e6ff"/><rect x="26" y="7" width="15" height="15" rx="4" fill="#6ee7a0"/><rect x="7" y="26" width="15" height="15" rx="4" fill="#ffb347"/><rect x="26" y="26" width="15" height="15" rx="4" fill="#ff6b81"/><rect x="12" y="12" width="5" height="5" rx="1.4" fill="#0f1226" opacity=".4"/><rect x="31" y="12" width="5" height="5" rx="1.4" fill="#0f1226" opacity=".4"/><rect x="12" y="31" width="5" height="5" rx="1.4" fill="#0f1226" opacity=".4"/><rect x="31" y="31" width="5" height="5" rx="1.4" fill="#0f1226" opacity=".4"/></svg>',
  operator: '<svg viewBox="0 0 48 48" fill="none"><rect x="5" y="5" width="38" height="38" rx="9" fill="#1b2040" stroke="#2e3563" stroke-width="2.5"/><path d="M13 17h9M17.5 12.5v9" stroke="#62e6ff" stroke-width="3.2" stroke-linecap="round"/><path d="M26 17h9" stroke="#ffb347" stroke-width="3.2" stroke-linecap="round"/><path d="M13.5 28.5l7.5 7.5M21 28.5L13.5 36" stroke="#6ee7a0" stroke-width="3.2" stroke-linecap="round"/><path d="M26 32.5h9" stroke="#ff6b81" stroke-width="3.2" stroke-linecap="round"/><circle cx="30.5" cy="27.5" r="1.9" fill="#ff6b81"/><circle cx="30.5" cy="37.5" r="1.9" fill="#ff6b81"/></svg>',
  ifelse: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="9" r="5.5" fill="#62e6ff"/><path d="M24 14.5V21M24 21L13 30M24 21l11 9" stroke="#9aa2d8" stroke-width="3" stroke-linecap="round"/><rect x="5" y="30" width="14" height="11" rx="3.5" fill="#6ee7a0"/><rect x="29" y="30" width="14" height="11" rx="3.5" fill="#ff6b81"/><path d="M10 35.5l1.8 1.8 3.4-3.6" stroke="#06301a" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M33.8 33.5l4.4 4.4M38.2 33.5l-4.4 4.4" stroke="#4d0f1a" stroke-width="2" stroke-linecap="round"/></svg>',
  loop: '<svg viewBox="0 0 48 48" fill="none"><path d="M39 24c0 8.3-6.7 15-15 15S9 32.3 9 24 15.7 9 24 9h4" stroke="#62e6ff" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M27 2l9 7-9 7V2z" fill="#ffb347"/><circle cx="24" cy="24" r="4" fill="#6ee7a0"/></svg>',
  flowchart: '<svg viewBox="0 0 48 48" fill="none"><rect x="15" y="3" width="18" height="9" rx="3" fill="#62e6ff"/><path d="M24 12v5" stroke="#9aa2d8" stroke-width="2.6"/><path d="M24 17l10 9-10 9-10-9 10-9z" fill="#ffb347"/><path d="M24 35v5" stroke="#9aa2d8" stroke-width="2.6"/><path d="M34 26h8v10" stroke="#9aa2d8" stroke-width="2.6" fill="none"/><rect x="15" y="40" width="18" height="7" rx="3" fill="#6ee7a0"/><circle cx="42" cy="38.5" r="2.4" fill="#ff6b81"/></svg>',
  function: '<svg viewBox="0 0 48 48" fill="none"><rect x="5" y="5" width="38" height="38" rx="10" fill="#1b2040" stroke="#6ee7a0" stroke-width="3"/><path d="M29 13c-3.4 0-4.6 2.2-4.6 5.4v11.2c0 3.2-1.2 5.4-4.6 5.4" stroke="#6ee7a0" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M17 24h11" stroke="#ffb347" stroke-width="3.6" stroke-linecap="round"/><circle cx="35" cy="14" r="2.4" fill="#62e6ff"/></svg>',
  project: '<svg viewBox="0 0 48 48" fill="none"><path d="M14 6h20v11c0 7.2-4.2 12.5-10 12.5S14 24.2 14 17V6z" fill="#ffb347"/><path d="M14 9H7c.3 6.5 3.2 9.8 8.4 10.8M34 9h7c-.3 6.5-3.2 9.8-8.4 10.8" stroke="#e09a2f" stroke-width="3" fill="none"/><rect x="21" y="29" width="6" height="7" fill="#e09a2f"/><rect x="13" y="36" width="22" height="6.5" rx="2.2" fill="#9aa2d8"/><path d="M24 11l1.7 3.4 3.8.6-2.8 2.7.7 3.8-3.4-1.8-3.4 1.8.7-3.8-2.8-2.7 3.8-.6L24 11z" fill="#fff3d6"/></svg>'
};
ICONS.c = '<svg viewBox="0 0 48 48" fill="none"><path d="M24 2 5 13v22l19 11 19-11V13L24 2z" fill="#03599c"/><path d="M24 2 5 13v22l19 11V2z" fill="#659ad2"/><path d="M24 2l19 11-19 11V2z" fill="#659ad2" opacity=".55"/><path d="M33.2 17.2A12 12 0 1 0 33.2 30.8" stroke="#fff" stroke-width="7.5" fill="none"/></svg>';
ICONS.cintro = '<svg viewBox="0 0 48 48" fill="none"><rect x="5" y="5" width="38" height="38" rx="11" fill="#e9e4fb" stroke="#7b5cf0" stroke-width="2.5"/><path d="M30 18c-1.6-2-3.8-3.2-6.3-3.2-4.5 0-8.2 3.7-8.2 8.2s3.7 8.2 8.2 8.2c2.5 0 4.7-1.2 6.3-3.2" stroke="#7b5cf0" stroke-width="4.5" stroke-linecap="round" fill="none"/><circle cx="36" cy="13" r="5" fill="#f5b942"/><path d="M34.2 13l1.3 1.3 2.3-2.6" stroke="#5a3c00" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';
ICONS.cvs = '<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="27" rx="4" fill="#1b1a2e" stroke="#8a7cf0" stroke-width="2.5"/><path d="M10 15l6 5.5-6 5.5" stroke="#62e6ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="20" y="24" width="12" height="3" rx="1.5" fill="#f5b942"/><rect x="17" y="38" width="14" height="3" rx="1.5" fill="#9aa2d8"/><rect x="21" y="35" width="6" height="4" fill="#9aa2d8"/></svg>';
ICONS.cptr = '<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="16" width="16" height="16" rx="4" fill="#e9e4fb" stroke="#7b5cf0" stroke-width="2.5"/><circle cx="12" cy="24" r="3" fill="#7b5cf0"/><path d="M20 24h13" stroke="#f5b942" stroke-width="4" stroke-linecap="round"/><path d="M30 17l9 7-9 7v-14z" fill="#f5b942"/><rect x="36" y="16" width="8" height="16" rx="3" fill="#ecfaf3" stroke="#27c07d" stroke-width="2.5"/></svg>';
ICONS.html = '<svg viewBox="0 0 48 48" fill="none"><path d="M8 4h32l-2.9 33.2L24 41l-13.1-3.8L8 4z" fill="#e44d26"/><path d="M24 7.5v30.7l10.6-3.1L37 7.5H24z" fill="#f16529"/><path d="M15 12h18l-.4 4.4H19.8l.3 3.4h12.1l-1.2 13.3-7 2-7-2-.5-5.3h3.4l.25 2.8 3.85 1.05 3.85-1.05.4-4.5H15.9L15 12z" fill="#fff"/></svg>';
ICONS.css = '<svg viewBox="0 0 48 48" fill="none"><path d="M8 4h32l-2.9 33.2L24 41l-13.1-3.8L8 4z" fill="#1572b6"/><path d="M24 7.5v30.7l10.6-3.1L37 7.5H24z" fill="#33a9dc"/><path d="M24 12h9l-.3 4.3H24V12zm0 8.6h8.4l-1.2 13.2-7.2 2v-4.5l3.8-1.05.4-4.35H24v-5.3z" fill="#fff"/><path d="M24 12v4.3h-8.6l-.35-4.3H24zm0 8.6v4.3h-3.8l.3 3.4H24v4.5l-7-1.95-.5-5.35h3.4l.15 1.85H24z" fill="#ebebeb"/></svg>';
ICONS.js = '<svg viewBox="0 0 48 48" fill="none"><rect x="5" y="5" width="38" height="38" rx="6" fill="#f0db4f"/><path d="M27.5 35.3c.8 1.3 1.8 2.2 3.6 2.2 1.5 0 2.5-.75 2.5-1.8 0-1.25-1-1.7-2.7-2.44l-.9-.4c-2.65-1.13-4.4-2.55-4.4-5.55 0-2.75 2.1-4.85 5.4-4.85 2.35 0 4 .82 5.2 2.96l-2.85 1.83c-.63-1.12-1.3-1.56-2.35-1.56-1.07 0-1.75.68-1.75 1.56 0 1.1.68 1.54 2.26 2.22l.9.39c3.12 1.34 4.87 2.71 4.87 5.79 0 3.3-2.6 5.11-6.08 5.11-3.41 0-5.61-1.62-6.69-3.75l2.99-1.73zm-12.9.31c.58 1.03 1.11 1.9 2.38 1.9 1.21 0 1.98-.48 1.98-2.34V22.7h3.66v12.53c0 3.79-2.22 5.51-5.46 5.51-2.93 0-4.63-1.51-5.49-3.34l2.93-1.79z" fill="#323330"/></svg>';
const ICON_ALIAS = { concept: "flowchart", ctypes: "variable", coper: "operator", cio: "input", cctrl: "ifelse", carray: "datastructure", cfunc: "function", intro: "python", datatype: "datastructure", list: "datastructure", tupleset: "datastructure", dict: "datastructure", exception: "ifelse", oop: "function", filehandling: "datastructure", gui: "operator", database: "datastructure", webapp: "operator", api: "function", datascience: "datastructure" };
const iconFor = k => ICONS[k] || ICONS[ICON_ALIAS[k]] || "";
const fmt = n => (n || 0).toLocaleString("th-TH");

const COURSES = {
  python: {
    name: "Python", icon: "🐍",
    tagline: "หลักสูตร Python เต็มรูปแบบตามหนังสือ — พื้นฐานการเขียนโปรแกรม, OOP, ไฟล์, ฐานข้อมูล, เว็บ, API และ Data Science",
    topics: [
      {
        id: "intro", icon: "python", title: "บทที่ 1-2: รู้จัก Python และเครื่องมือ",
        blurb: "ภาษา Python คืออะไร ต่างจากภาษาอื่นยังไง และเครื่องมือที่ใช้เขียน (IDLE, PyCharm, Jupyter)",
        lesson: [
          { h: "ภาษาคอมพิวเตอร์และ Python", p: "ภาษาคอมพิวเตอร์แบ่งเป็นภาษาระดับต่ำ (low level — ใกล้เครื่อง เช่น Assembly) และภาษาระดับสูง (high level — ใกล้ภาษามนุษย์ เช่น Python) Python เป็นภาษาระดับสูงที่อ่านง่าย เขียนสั้น เหมาะกับผู้เริ่มต้น และใช้ได้ตั้งแต่งานทั่วไป เว็บ ไปจนถึง AI" },
          { h: "Interpreter vs Compiler", p: "Python เป็นภาษาแบบ <b>Interpreter</b> — แปลและรันโค้ดทีละบรรทัด ต่างจากภาษาแบบ <b>Compiler</b> (เช่น C) ที่แปลทั้งโปรแกรมเป็นไฟล์ก่อนแล้วค่อยรัน ข้อดีของ interpreter คือทดลองโค้ดได้ทันที เห็นผลเร็ว เหมาะกับการเรียนรู้" },
          { h: "เครื่องมือเขียน Python", p: "มีหลายทางเลือก: <b>Python IDLE</b> (มากับ Python ใช้ง่ายสุด), <b>PyCharm</b> (IDE ครบเครื่องสำหรับงานใหญ่), <b>Jupyter Notebook</b> (รันโค้ดทีละเซลล์ เหมาะกับ Data Science) — ในเกมนี้เรารันโค้ด Python ได้เลยในเบราว์เซอร์ ไม่ต้องติดตั้งอะไร" },
          { h: "โครงสร้างโปรแกรม Python", p: "Python ใช้<b>การย่อหน้า (indentation)</b> แทนปีกกาเพื่อจัดกลุ่มคำสั่ง (ปกติ 4 ช่อง) และ<b>ไม่ต้องมี ; ท้ายบรรทัด</b> คอมเมนต์ใช้ <code>#</code> — ความเรียบง่ายนี้คือเหตุผลที่ Python ได้รับความนิยม", code: "# นี่คือคอมเมนต์\nprint(\"บรรทัดแรก\")\nprint(\"บรรทัดสอง\")" }
        ],
        stages: []
      },
      {
        id: "print", icon: "print", title: "บทที่ 3: เริ่มเขียนโปรแกรม (print/input)",
        blurb: "การแสดงผลด้วย print() และรับข้อมูลด้วย input() — ก้าวแรกของการสื่อสารกับโปรแกรม",
        lesson: [
          { h: "print() แสดงผลออกจอ", p: "คำสั่งพื้นฐานที่สุด แสดงข้อความหรือค่าออกทางหน้าจอ ข้อความ (string) ต้องอยู่ในเครื่องหมายคำพูดเสมอ", code: "print(\"สวัสดีชาวโลก\")" },
          { h: "พิมพ์หลายค่า + ตัวเลือกเสริม", p: "คั่นค่าด้วย <code>,</code> print จะเว้นวรรคให้ • <code>\\n</code> ขึ้นบรรทัดใหม่ • <code>sep=</code> เปลี่ยนตัวคั่น • <code>end=</code> เปลี่ยนตัวปิดท้าย", code: "print(\"คะแนน:\", 99)\nprint(1, 2, 3, sep=\"-\")\nprint(\"ต่อ\", end=\"\")" },
          { h: "input() รับข้อมูลจากผู้ใช้", p: "หยุดรอรับสิ่งที่ผู้ใช้พิมพ์ แล้วคืนค่าเป็น<b>ข้อความเสมอ</b> ถ้าจะคำนวณต้องแปลงด้วย int() หรือ float() ก่อน", code: "name = input(\"ชื่อ: \")\nage = int(input(\"อายุ: \"))\nprint(name, \"อายุ\", age + 1, \"ในปีหน้า\")" }
        ],
        stages: [
          { title: "สวัสดี Python", desc: "print() แสดงข้อความออกจอ — ข้อความต้องอยู่ในเครื่องหมายคำพูด", goal: "แสดงข้อความ <b>สวัสดี Python</b>", starter: "# แสดงข้อความออกหน้าจอ\n", hint: "<code>print(\"สวัสดี Python\")</code>", xp: 30, check: (out) => eq(out, "สวัสดี Python") },
          { title: "หลายบรรทัด", desc: "เรียก print หลายครั้ง ได้ผลลัพธ์หลายบรรทัด", goal: "แสดง 3 บรรทัด: <b>Python</b>, <b>สนุก</b>, <b>มาก</b>", starter: "", hint: "print 3 ครั้ง", xp: 40, check: (out) => { const l = lines(out); return l.length === 3 && l[0] === "Python" && l[1] === "สนุก" && l[2] === "มาก"; } },
          { title: "พิมพ์หลายค่า", desc: "คั่นค่าด้วย , print เว้นวรรคให้อัตโนมัติ", goal: "ใช้ print เดียวแสดง <b>คะแนน: 100</b> (คั่นด้วย ,)", starter: "", hint: "<code>print(\"คะแนน:\", 100)</code>", xp: 40, check: (out, code) => eq(out, "คะแนน: 100") && code.includes(",") },
          { title: "เปลี่ยนตัวคั่น sep", desc: "sep= เปลี่ยนตัวที่คั่นระหว่างค่า", goal: "ใช้ sep แสดง <b>2026-07-09</b>", starter: "", hint: "<code>print(2026, \"07\", \"09\", sep=\"-\")</code>", xp: 50, check: (out, code) => eq(out, "2026-07-09") && code.includes("sep") },
          { title: "รับชื่อมาทักทาย", desc: "input() รับข้อมูลเก็บในตัวแปร (ระบบป้อนค่าให้ในกล่อง ⌨️)", goal: "รับชื่อแล้วแสดง <b>สวัสดี มะลิ</b> (ระบบป้อน \"มะลิ\")", starter: "name = input()\n", hint: "<code>print(\"สวัสดี\", name)</code>", xp: 50, stdin: ["มะลิ"], check: (out, code) => eq(out, "สวัสดี มะลิ") && /input\(/.test(code) },
          { title: "รับเลขมาบวก", desc: "input() ได้ข้อความเสมอ ต้องแปลงเป็น int ก่อนคำนวณ", goal: "รับเลขแล้วแสดงค่าที่บวก 10 (ระบบป้อน \"5\" ต้องได้ <b>15</b>)", starter: "n = input()\n", hint: "<code>print(int(n) + 10)</code>", xp: 60, stdin: ["5"], check: (out, code) => eq(out, "15") && /int\(/.test(code) }
        ]
      },
      {
        id: "variable", icon: "variable", title: "บทที่ 4: ตัวแปร (Variables)",
        blurb: "การกำหนดค่า ตั้งชื่อ และเปลี่ยนค่าตัวแปร รวมถึงการแปลงชนิดข้อมูล",
        lesson: [
          { h: "การกำหนดค่าตัวแปร", p: "ตัวแปรคือกล่องเก็บค่า ใช้ <code>=</code> กำหนดค่า ไม่ต้องประกาศชนิดล่วงหน้า Python รู้ชนิดเองจากค่าที่ใส่", code: "name = \"มะลิ\"\nage = 15\nheight = 158.5" },
          { h: "กฎการตั้งชื่อตัวแปร", p: "ขึ้นต้นด้วยตัวอักษรหรือ _ (ห้ามขึ้นด้วยตัวเลข), ใช้ตัวเลขตามหลังได้, ห้ามเว้นวรรค (ใช้ _ แทน), แยกตัวพิมพ์เล็กใหญ่ (age กับ Age คนละตัว), ห้ามใช้คำสงวน" },
          { h: "เปลี่ยนแปลงค่าตัวแปร", p: "กำหนดค่าใหม่ทับได้ตลอด และใช้ตัวดำเนินการย่อ (+=, -=) เพื่อปรับค่าจากเดิม", code: "score = 10\nscore = score + 5\nscore += 3   # เท่ากับ score = score + 3\nprint(score) # 18" }
        ],
        stages: [
          { title: "กล่องแรก", desc: "สร้างตัวแปรด้วย = แล้วนำไปใช้", goal: "สร้าง <b>name = \"มะลิ\"</b> แล้วแสดง <b>ฉันชื่อ มะลิ</b>", starter: "", hint: "<code>print(\"ฉันชื่อ\", name)</code>", xp: 40, check: (out, code) => eq(out, "ฉันชื่อ มะลิ") && /name\s*=/.test(code) },
          { title: "บวกตัวแปร", desc: "ตัวแปรตัวเลขนำมาคำนวณได้", goal: "มี hp=80, potion=25 แสดงผลรวม (ต้องได้ <b>105</b>)", starter: "hp = 80\npotion = 25\n", hint: "<code>print(hp + potion)</code>", xp: 40, check: (out) => eq(out, "105") },
          { title: "ปรับค่าด้วย +=", desc: "+= เพิ่มค่าจากเดิม, -= ลดค่า", goal: "coins=10 เพิ่ม 8 แล้วลด 3 แสดง <b>15</b>", starter: "coins = 10\n", hint: "<code>coins += 8</code> แล้ว <code>coins -= 3</code>", xp: 50, check: (out, code) => eq(out, "15") && /\+=/.test(code) },
          { title: "แปลงข้อความเป็นเลข", desc: "int() แปลงข้อความเป็นจำนวนเต็ม", goal: "มี age=\"12\" (ข้อความ) แสดงค่าที่บวก 1 เป็นตัวเลข (ต้องได้ <b>13</b>)", starter: "age = \"12\"\n", hint: "<code>print(int(age) + 1)</code>", xp: 50, check: (out, code) => eq(out, "13") && /int\(/.test(code) },
          { title: "f-string", desc: "f-string ฝังค่าตัวแปรลงในข้อความด้วย {}", goal: "level=5 ใช้ f-string แสดง <b>ตอนนี้เลเวล 5</b>", starter: "level = 5\n", hint: "<code>print(f\"ตอนนี้เลเวล {level}\")</code>", xp: 60, check: (out, code) => eq(out, "ตอนนี้เลเวล 5") && /f["']/.test(code) },
          { title: "สลับค่า", desc: "Python สลับค่าตัวแปรได้ในบรรทัดเดียว: a, b = b, a", goal: "a=5, b=9 สลับค่ากัน แล้วแสดง a และ b (ต้องได้ <b>9</b> แล้ว <b>5</b>)", starter: "a = 5\nb = 9\n", hint: "<code>a, b = b, a</code>", xp: 60, check: (out) => { const l = lines(out); return l.length === 2 && l[0] === "9" && l[1] === "5"; } }
        ]
      },
      {
        id: "datatype", icon: "datastructure", title: "บทที่ 5: ชนิดข้อมูล (Data Types)",
        blurb: "ชนิดข้อมูลพื้นฐาน: ตัวเลข (int/float/complex), Boolean, และการแปลงชนิดข้อมูล",
        lesson: [
          { h: "ชนิดข้อมูลตัวเลข", p: "<b>int</b> จำนวนเต็ม (10, -3) • <b>float</b> ทศนิยม (3.14, -0.5) • <b>complex</b> จำนวนเชิงซ้อน (3+4j) — ใช้ <code>type()</code> ดูชนิดของค่าได้", code: "print(type(10))     # int\nprint(type(3.14))   # float\nprint(type(3 + 4j)) # complex" },
          { h: "ชนิดข้อมูล Boolean", p: "มีแค่ 2 ค่า: <b>True</b> และ <b>False</b> (ขึ้นต้นตัวใหญ่) เกิดจากการเปรียบเทียบ และเป็นพื้นฐานของเงื่อนไข", code: "print(10 > 5)   # True\nprint(3 == 5)   # False" },
          { h: "การแปลงชนิดข้อมูล", p: "<b>Implicit</b> Python แปลงเองเมื่อคำนวณ (int + float = float) • <b>Explicit</b> เราแปลงเองด้วย int(), float(), str(), bool()", code: "x = 5 + 2.0      # float โดยอัตโนมัติ\ny = int(3.9)     # 3 (ตัดเศษ)\nz = str(100)     # \"100\" ข้อความ" }
        ],
        stages: [
          { title: "ดูชนิดข้อมูล", desc: "type() บอกชนิดของค่า", goal: "แสดงชนิดของ 3.14 (ผลลัพธ์ต้องมีคำว่า <b>float</b>)", starter: "", hint: "<code>print(type(3.14))</code>", xp: 40, check: (out) => /float/.test(out) },
          { title: "จำนวนเต็มหาร", desc: "/ ได้ทศนิยมเสมอ, // ได้จำนวนเต็ม (ปัดลง)", goal: "แสดง 2 บรรทัด: <b>7 / 2</b> และ <b>7 // 2</b> (ต้องได้ <b>3.5</b> และ <b>3</b>)", starter: "", hint: "<code>print(7 / 2)</code> และ <code>print(7 // 2)</code>", xp: 50, check: (out) => { const l = lines(out); return l[0] === "3.5" && l[1] === "3"; } },
          { title: "Boolean จากการเทียบ", desc: "การเปรียบเทียบให้ผลเป็น True/False", goal: "แสดงผลของ <b>10 > 7</b> (ต้องได้ <b>True</b>)", starter: "", hint: "<code>print(10 > 7)</code>", xp: 40, check: (out) => eq(out, "True") },
          { title: "แปลง float เป็น int", desc: "int() ตัดเศษทศนิยมทิ้ง (ไม่ปัด)", goal: "แปลง 3.9 เป็น int แล้วแสดง (ต้องได้ <b>3</b>)", starter: "", hint: "<code>print(int(3.9))</code>", xp: 50, check: (out, code) => eq(out, "3") && /int\(/.test(code) },
          { title: "แปลงเลขเป็นข้อความ", desc: "str() แปลงตัวเลขเป็นข้อความ เพื่อนำไปต่อกับข้อความอื่น", goal: "แปลง 100 เป็น str แล้วต่อกับ \"แต้ม\" ให้ได้ <b>100แต้ม</b>", starter: "", hint: "<code>print(str(100) + \"แต้ม\")</code>", xp: 50, check: (out, code) => eq(out, "100แต้ม") && /str\(/.test(code) }
        ]
      },
      {
        id: "string", icon: "string", title: "บทที่ 5: ข้อความ (String)",
        blurb: "การจัดการข้อความ: เข้าถึงตัวอักษร, ตัดข้อความ, และเมท็อดที่ใช้บ่อย",
        lesson: [
          { h: "String และการเข้าถึง", p: "ข้อความคือลำดับของตัวอักษร เข้าถึงทีละตัวด้วยดัชนี (เริ่มที่ 0) และตัดช่วง (slice) ด้วย [start:end]", code: "s = \"Python\"\nprint(s[0])    # P\nprint(s[0:3])  # Pyt\nprint(len(s))  # 6" },
          { h: "เมท็อดของ String", p: "<code>.upper()</code> ตัวใหญ่ • <code>.lower()</code> ตัวเล็ก • <code>.replace(a,b)</code> แทนที่ • <code>.split(x)</code> แยกเป็นลิสต์ • <code>.strip()</code> ตัดช่องว่างหัวท้าย", code: "print(\"abc\".upper())          # ABC\nprint(\"a,b,c\".split(\",\"))     # ['a','b','c']" },
          { h: "ตรวจสอบและนับ", p: "<code>in</code> เช็คว่ามีคำนั้นไหม • <code>.count(x)</code> นับจำนวนครั้ง • <code>*</code> ทำซ้ำข้อความ", code: "print(\"ก\" in \"กขค\")   # True\nprint(\"ฮา\" * 3)        # ฮาฮาฮา" }
        ],
        stages: [
          { title: "ตัวพิมพ์ใหญ่", desc: ".upper() แปลงเป็นตัวพิมพ์ใหญ่ทั้งหมด", goal: "แปลง \"victory\" เป็นตัวใหญ่ (ต้องได้ <b>VICTORY</b>)", starter: "word = \"victory\"\n", hint: "<code>print(word.upper())</code>", xp: 40, check: (out, code) => eq(out, "VICTORY") && /\.upper\(\)/.test(code) },
          { title: "ความยาว", desc: "len() นับจำนวนตัวอักษร", goal: "หาความยาวของ \"abrakadabra\" (ต้องได้ <b>11</b>)", starter: "spell = \"abrakadabra\"\n", hint: "<code>print(len(spell))</code>", xp: 40, check: (out, code) => eq(out, "11") && /len\(/.test(code) },
          { title: "ตัดข้อความ", desc: "slice [start:end] ตัดช่วงตัวอักษร (ไม่รวม end)", goal: "ตัด 6 ตัวแรกของ \"python-master\" (ต้องได้ <b>python</b>)", starter: "s = \"python-master\"\n", hint: "<code>print(s[0:6])</code>", xp: 50, check: (out, code) => eq(out, "python") && /\[.*:.*\]/.test(code) },
          { title: "แทนที่คำ", desc: ".replace(เก่า, ใหม่) แทนที่ข้อความ", goal: "เปลี่ยน \"เกลียด\" เป็น \"รัก\" ใน \"ฉันเกลียดบั๊ก\" (ต้องได้ <b>ฉันรักบั๊ก</b>)", starter: "msg = \"ฉันเกลียดบั๊ก\"\n", hint: "<code>print(msg.replace(\"เกลียด\", \"รัก\"))</code>", xp: 60, check: (out, code) => eq(out, "ฉันรักบั๊ก") && /\.replace\(/.test(code) },
          { title: "แยกข้อความ", desc: ".split(ตัวคั่น) แยกข้อความเป็นลิสต์", goal: "แยก \"มะลิ,15,นักเวท\" ด้วย , แล้วแสดงช่องที่ 3 (ต้องได้ <b>นักเวท</b>)", starter: "data = \"มะลิ,15,นักเวท\"\n", hint: "<code>parts = data.split(\",\")</code> แล้ว <code>print(parts[2])</code>", xp: 60, check: (out, code) => eq(out, "นักเวท") && /\.split\(/.test(code) },
          { title: "นับคำ", desc: ".count(คำ) นับจำนวนครั้งที่พบ", goal: "นับคำว่า \"นา\" ใน \"นานานา นา\" (ต้องได้ <b>4</b>)", starter: "song = \"นานานา นา\"\n", hint: "<code>print(song.count(\"นา\"))</code>", xp: 60, check: (out, code) => eq(out, "4") && /\.count\(/.test(code) }
        ]
      },
      {
        id: "list", icon: "datastructure", title: "บทที่ 5: ลิสต์ (List)",
        blurb: "ชนิดข้อมูลรายการที่แก้ไขได้ — เพิ่ม ลบ เข้าถึง และเมท็อดที่ใช้บ่อย",
        lesson: [
          { h: "List คืออะไร", p: "รายการที่เก็บหลายค่าเรียงลำดับ อยู่ใน <b>[ ]</b> คั่นด้วย , เข้าถึงด้วยดัชนี (เริ่ม 0) และแก้ไขค่าได้", code: "items = [\"ดาบ\", \"โล่\", \"ยา\"]\nprint(items[0])   # ดาบ\nprint(items[-1])  # ยา (ตัวสุดท้าย)" },
          { h: "เพิ่มและลบสมาชิก", p: "<code>.append(x)</code> เพิ่มท้าย • <code>.insert(i,x)</code> แทรก • <code>.remove(x)</code> ลบตามค่า • <code>.pop()</code> ลบท้าย/ตามดัชนี", code: "items = [\"ดาบ\", \"โล่\"]\nitems.append(\"ยา\")\nitems.remove(\"โล่\")\nprint(items)  # ['ดาบ', 'ยา']" },
          { h: "เมท็อดที่มีประโยชน์", p: "<code>len()</code> นับจำนวน • <code>sum()</code> รวมค่า • <code>.sort()</code> เรียง • <code>max()/min()</code> ค่ามาก/น้อยสุด", code: "nums = [30, 5, 12]\nnums.sort()\nprint(nums)      # [5, 12, 30]\nprint(sum(nums)) # 47" }
        ],
        stages: [
          { title: "หยิบสมาชิก", desc: "เข้าถึงด้วยดัชนี เริ่มนับจาก 0", goal: "แสดงสมาชิกตัวแรกของลิสต์ (ต้องได้ <b>ดาบ</b>)", starter: "items = [\"ดาบ\", \"โล่\", \"ยา\"]\n", hint: "<code>print(items[0])</code>", xp: 40, check: (out, code) => eq(out, "ดาบ") && /\[0\]/.test(code) },
          { title: "เพิ่มท้าย", desc: ".append() เพิ่มสมาชิกท้ายลิสต์", goal: "เพิ่ม \"คบเพลิง\" แล้วแสดงจำนวนสมาชิก (ต้องได้ <b>4</b>)", starter: "items = [\"ดาบ\", \"โล่\", \"ยา\"]\n", hint: "<code>items.append(\"คบเพลิง\")</code> แล้ว <code>print(len(items))</code>", xp: 50, check: (out, code) => eq(out, "4") && /\.append\(/.test(code) },
          { title: "ตัวสุดท้าย", desc: "ดัชนีลบ [-1] คือตัวสุดท้าย", goal: "แสดงสมาชิกตัวสุดท้าย (ต้องได้ <b>ยา</b>)", starter: "items = [\"ดาบ\", \"โล่\", \"ยา\"]\n", hint: "<code>print(items[-1])</code>", xp: 50, check: (out, code) => eq(out, "ยา") && /\[-1\]/.test(code) },
          { title: "รวมค่า", desc: "sum() รวมตัวเลขทั้งลิสต์", goal: "รวมค่าใน [12, 30, 25] (ต้องได้ <b>67</b>)", starter: "powers = [12, 30, 25]\n", hint: "<code>print(sum(powers))</code>", xp: 50, check: (out, code) => eq(out, "67") && /sum\(/.test(code) },
          { title: "ลบสมาชิก", desc: ".remove() ลบตามค่าที่ระบุ", goal: "ลบ \"โล่\" แล้วแสดงจำนวนที่เหลือ (ต้องได้ <b>2</b>)", starter: "items = [\"ดาบ\", \"โล่\", \"ยา\"]\n", hint: "<code>items.remove(\"โล่\")</code> แล้ว <code>print(len(items))</code>", xp: 60, check: (out, code) => eq(out, "2") && /\.remove\(/.test(code) },
          { title: "เรียงลำดับ", desc: ".sort() เรียงจากน้อยไปมาก", goal: "เรียง [30, 5, 12] แล้วแสดงตัวแรก (ต้องได้ <b>5</b>)", starter: "nums = [30, 5, 12]\n", hint: "<code>nums.sort()</code> แล้ว <code>print(nums[0])</code>", xp: 60, check: (out, code) => eq(out, "5") && /\.sort\(\)/.test(code) }
        ]
      },
      {
        id: "tupleset", icon: "datastructure", title: "บทที่ 5: Tuple และ Set",
        blurb: "Tuple (รายการที่แก้ไม่ได้) และ Set (เซตไม่มีค่าซ้ำ) — ชนิดข้อมูลที่ใช้เฉพาะงาน",
        lesson: [
          { h: "Tuple — แก้ไขไม่ได้", p: "คล้าย list แต่อยู่ใน <b>( )</b> และ<b>แก้ไขค่าไม่ได้</b> (immutable) เหมาะกับข้อมูลที่ไม่ควรเปลี่ยน เช่น พิกัด สีคงที่ — เข้าถึงด้วยดัชนีเหมือน list", code: "point = (10, 20)\nprint(point[0])   # 10\nprint(len(point)) # 2" },
          { h: "Set — ไม่มีค่าซ้ำ", p: "เซตอยู่ใน <b>{ }</b> เก็บค่าไม่ซ้ำกัน และไม่มีลำดับ เหมาะกับการกำจัดค่าซ้ำหรือตรวจสมาชิก — <code>.add()</code> เพิ่ม • <code>.discard()</code> ลบ", code: "s = {1, 2, 2, 3}\nprint(s)        # {1, 2, 3} ตัดซ้ำ\ns.add(4)\nprint(len(s))   # 4" },
          { h: "การดำเนินการ Set", p: "Set ทำงานแบบเซตในคณิตศาสตร์: <code>|</code> ยูเนียน (รวม) • <code>&</code> อินเตอร์เซกชัน (ร่วม) • <code>-</code> ผลต่าง", code: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)  # {2, 3}\nprint(a | b)  # {1, 2, 3, 4}" }
        ],
        stages: [
          { title: "เข้าถึง Tuple", desc: "tuple เข้าถึงด้วยดัชนีเหมือน list", goal: "มี point=(10, 20) แสดงค่าแรก (ต้องได้ <b>10</b>)", starter: "point = (10, 20)\n", hint: "<code>print(point[0])</code>", xp: 50, check: (out, code) => eq(out, "10") && /point\[0\]/.test(code) },
          { title: "ความยาว Tuple", desc: "len() ใช้กับ tuple ได้เช่นกัน", goal: "แสดงจำนวนสมาชิกของ (3, 6, 9, 12) (ต้องได้ <b>4</b>)", starter: "nums = (3, 6, 9, 12)\n", hint: "<code>print(len(nums))</code>", xp: 50, check: (out, code) => eq(out, "4") && /len\(/.test(code) },
          { title: "ตัดค่าซ้ำด้วย Set", desc: "แปลง list เป็น set เพื่อกำจัดค่าซ้ำ", goal: "มี list [1,2,2,3,3,3] แปลงเป็น set แล้วแสดงจำนวนค่าที่ไม่ซ้ำ (ต้องได้ <b>3</b>)", starter: "nums = [1, 2, 2, 3, 3, 3]\n", hint: "<code>print(len(set(nums)))</code>", xp: 60, check: (out, code) => eq(out, "3") && /set\(/.test(code) },
          { title: "เพิ่มสมาชิก Set", desc: ".add() เพิ่มค่าเข้าเซต (ถ้าซ้ำจะไม่เพิ่ม)", goal: "เซต {1,2,3} เพิ่ม 4 แล้วแสดงจำนวน (ต้องได้ <b>4</b>)", starter: "s = {1, 2, 3}\n", hint: "<code>s.add(4)</code> แล้ว <code>print(len(s))</code>", xp: 60, check: (out, code) => eq(out, "4") && /\.add\(/.test(code) },
          { title: "สมาชิกร่วม", desc: "& หาสมาชิกที่อยู่ในทั้งสองเซต", goal: "หาค่าร่วมของ {1,2,3} และ {2,3,4} แล้วแสดงจำนวน (ต้องได้ <b>2</b>)", starter: "a = {1, 2, 3}\nb = {2, 3, 4}\n", hint: "<code>print(len(a & b))</code>", xp: 60, check: (out, code) => eq(out, "2") && /&/.test(code) }
        ]
      },
      {
        id: "dict", icon: "datastructure", title: "บทที่ 5: Dictionary",
        blurb: "โครงสร้างข้อมูลแบบคู่ คีย์-ค่า (key-value) — เก็บข้อมูลที่มีป้ายกำกับ",
        lesson: [
          { h: "Dictionary คืออะไร", p: "เก็บข้อมูลเป็นคู่ <b>คีย์: ค่า</b> อยู่ใน <b>{ }</b> เข้าถึงค่าผ่านคีย์ (ไม่ใช่ดัชนี) เหมาะกับข้อมูลที่มีป้ายกำกับ เช่น ข้อมูลผู้เล่น", code: "player = {\"name\": \"มะลิ\", \"hp\": 100}\nprint(player[\"name\"])  # มะลิ\nprint(player[\"hp\"])    # 100" },
          { h: "เพิ่มและแก้ไข", p: "กำหนดค่าผ่านคีย์ใหม่เพื่อเพิ่ม หรือคีย์เดิมเพื่อแก้ไข • <code>.pop(key)</code> ลบ • <code>in</code> เช็คว่ามีคีย์ไหม", code: "player = {\"hp\": 100}\nplayer[\"mp\"] = 50    # เพิ่มคีย์ใหม่\nplayer[\"hp\"] = 80    # แก้ค่าเดิม\nprint(\"mp\" in player) # True" },
          { h: "วนลูปและเมท็อด", p: "<code>.keys()</code> คีย์ทั้งหมด • <code>.values()</code> ค่าทั้งหมด • <code>.items()</code> คู่คีย์-ค่า — ใช้กับ for เพื่อวนทุกรายการ", code: "score = {\"a\": 10, \"b\": 20}\nfor k in score:\n    print(k, score[k])" }
        ],
        stages: [
          { title: "อ่านค่าจากคีย์", desc: "เข้าถึงค่าผ่านคีย์ในวงเล็บเหลี่ยม", goal: "แสดงค่า hp ของ player (ต้องได้ <b>100</b>)", starter: "player = {\"name\": \"มะลิ\", \"hp\": 100}\n", hint: "<code>print(player[\"hp\"])</code>", xp: 50, check: (out, code) => eq(out, "100") && /\[.hp.\]/.test(code) },
          { title: "เพิ่มคีย์ใหม่", desc: "กำหนดค่าให้คีย์ใหม่เพื่อเพิ่มเข้า dict", goal: "เพิ่ม mp=50 แล้วแสดงค่า mp (ต้องได้ <b>50</b>)", starter: "player = {\"name\": \"มะลิ\", \"hp\": 100}\n", hint: "<code>player[\"mp\"] = 50</code> แล้ว <code>print(player[\"mp\"])</code>", xp: 50, check: (out, code) => eq(out, "50") && /\[.mp.\]\s*=/.test(code) },
          { title: "แก้ค่าเดิม", desc: "กำหนดค่าให้คีย์ที่มีอยู่เพื่อแก้ไข", goal: "เปลี่ยน hp เป็น 75 แล้วแสดง (ต้องได้ <b>75</b>)", starter: "player = {\"name\": \"มะลิ\", \"hp\": 100}\n", hint: "<code>player[\"hp\"] = 75</code> แล้ว print", xp: 50, check: (out, code) => eq(out, "75") && /\[.hp.\]\s*=\s*75/.test(code) },
          { title: "เช็คคีย์", desc: "in เช็คว่ามีคีย์นั้นใน dict ไหม", goal: "เช็คว่ามีคีย์ \"hp\" ไหม (ต้องได้ <b>True</b>)", starter: "player = {\"name\": \"มะลิ\", \"hp\": 100}\n", hint: "<code>print(\"hp\" in player)</code>", xp: 60, check: (out, code) => eq(out, "True") && /in\s+player/.test(code) },
          { title: "หาความยาว", desc: "len() นับจำนวนคู่คีย์-ค่า", goal: "แสดงจำนวนคีย์ใน player (ต้องได้ <b>2</b>)", starter: "player = {\"name\": \"มะลิ\", \"hp\": 100}\n", hint: "<code>print(len(player))</code>", xp: 50, check: (out, code) => eq(out, "2") && /len\(/.test(code) }
        ]
      },
      {
        id: "operator", icon: "operator", title: "บทที่ 6: ตัวดำเนินการ (Operators)",
        blurb: "เลขคณิต, ตรรกะ, เปรียบเทียบ, bitwise, identity และ membership",
        lesson: [
          { h: "เลขคณิตและเปรียบเทียบ", p: "<b>เลขคณิต:</b> + - * / // (หารปัดลง) % (เศษ) ** (ยกกำลัง) • <b>เปรียบเทียบ:</b> > < >= <= == != ให้ผลเป็น True/False", code: "print(17 % 5)   # 2 (เศษ)\nprint(2 ** 10)  # 1024\nprint(10 >= 10) # True" },
          { h: "ตรรกะ (Logical)", p: "<b>and</b> จริงทั้งคู่ • <b>or</b> จริงตัวใดตัวหนึ่ง • <b>not</b> กลับค่า — ใช้รวมเงื่อนไขหลายอย่าง", code: "print(True and False)  # False\nprint(True or False)   # True\nprint(not True)        # False" },
          { h: "Identity และ Membership", p: "<b>is</b> เช็คว่าเป็นวัตถุเดียวกันไหม • <b>in</b> เช็คว่าอยู่ในลำดับไหม (ใช้บ่อยกับ list/string)", code: "print(\"a\" in \"abc\")     # True\nprint(3 in [1, 2, 3])   # True" },
          { h: "Bitwise", p: "ทำงานระดับบิต: <code>&</code> AND • <code>|</code> OR • <code>^</code> XOR • <code>&lt;&lt;</code> เลื่อนซ้าย • <code>&gt;&gt;</code> เลื่อนขวา", code: "print(5 & 3)   # 1\nprint(5 | 2)   # 7\nprint(1 << 3)  # 8" }
        ],
        stages: [
          { title: "หารและเศษ", desc: "// หารปัดลง, % เศษจากการหาร", goal: "แสดง 2 บรรทัด: <b>17 % 5</b> และ <b>17 // 5</b> (ต้องได้ <b>2</b> และ <b>3</b>)", starter: "", hint: "<code>print(17 % 5)</code> และ <code>print(17 // 5)</code>", xp: 40, check: (out) => { const l = lines(out); return l[0] === "2" && l[1] === "3"; } },
          { title: "ยกกำลัง", desc: "** คือการยกกำลัง", goal: "แสดง 2 ยกกำลัง 10 (ต้องได้ <b>1024</b>)", starter: "", hint: "<code>print(2 ** 10)</code>", xp: 40, check: (out, code) => eq(out, "1024") && /\*\*/.test(code) },
          { title: "ตรรกะ and/or", desc: "and จริงทั้งคู่, or จริงตัวใดตัวหนึ่ง", goal: "แสดง 2 บรรทัด: <b>True and False</b> และ <b>True or False</b> (ต้องได้ <b>False</b> และ <b>True</b>)", starter: "", hint: "<code>print(True and False)</code> และ <code>print(True or False)</code>", xp: 50, check: (out) => { const l = lines(out); return l[0] === "False" && l[1] === "True"; } },
          { title: "membership in", desc: "in เช็คว่าอยู่ในลำดับไหม", goal: "เช็คว่า 3 อยู่ใน [1,2,3] ไหม (ต้องได้ <b>True</b>)", starter: "", hint: "<code>print(3 in [1, 2, 3])</code>", xp: 50, check: (out, code) => eq(out, "True") && /\bin\b/.test(code) },
          { title: "เทียบช่วง", desc: "Python เขียนเงื่อนไขช่วงต่อกันได้ เช่น 10 <= x <= 20", goal: "age=15 เช็คว่า 10 ≤ age ≤ 18 ไหม (ต้องได้ <b>True</b>)", starter: "age = 15\n", hint: "<code>print(10 <= age <= 18)</code>", xp: 60, check: (out) => eq(out, "True") },
          { title: "bitwise AND", desc: "& ทำ AND ระดับบิต", goal: "แสดงผลของ <b>5 & 3</b> (ต้องได้ <b>1</b>)", starter: "", hint: "<code>print(5 & 3)</code>", xp: 60, check: (out, code) => eq(out, "1") && /&/.test(code) }
        ]
      },
      {
        id: "ifelse", icon: "ifelse", title: "บทที่ 7: คำสั่งเงื่อนไข (if)",
        blurb: "if, if-else, if-elif-else และ nested if — สอนโปรแกรมให้ตัดสินใจ",
        lesson: [
          { h: "if และ else", p: "<b>if</b> ทำเมื่อเงื่อนไขจริง <b>else</b> ทำเมื่อเท็จ — สังเกต : ท้ายเงื่อนไข และ<b>การย่อหน้า</b>บอกว่าคำสั่งไหนอยู่ในเงื่อนไข", code: "if score >= 50:\n    print(\"ผ่าน\")\nelse:\n    print(\"ไม่ผ่าน\")" },
          { h: "if-elif-else", p: "หลายเงื่อนไขใช้ <b>elif</b> ต่อกัน เช็คจากบนลงล่าง เข้าอันแรกที่จริง", code: "if score >= 80:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"F\")" },
          { h: "Nested if", p: "if ซ้อนใน if ได้ ใช้เมื่อต้องเช็คหลายเงื่อนไขเป็นชั้นๆ — ระวังการย่อหน้าให้ถูกชั้น", code: "if hp > 0:\n    if level > 10:\n        print(\"สู้บอส\")\n    else:\n        print(\"ฝึกต่อ\")" }
        ],
        stages: [
          { title: "ประตูเงื่อนไข", desc: "if-else เลือกทำตามเงื่อนไข", goal: "key=7 ถ้า > 5 แสดง <b>ประตูเปิด</b> ไม่งั้น <b>ประตูล็อก</b>", starter: "key = 7\n", hint: "<code>if key > 5:</code> ... <code>else:</code> ...", xp: 50, check: (out, code) => eq(out, "ประตูเปิด") && /if\s+/.test(code) },
          { title: "บันไดเกรด", desc: "elif เช็คหลายช่วง จากมากไปน้อย", goal: "score=75: ≥80 A / ≥70 B / นอกนั้น F (ต้องได้ <b>B</b>)", starter: "score = 75\n", hint: "<code>if score >= 80: ... elif score >= 70: ... else: ...</code>", xp: 60, check: (out, code) => eq(out, "B") && /elif/.test(code) },
          { title: "เงื่อนไขร่วม and", desc: "รวมสองเงื่อนไขด้วย and", goal: "hp=50, has_key=True ถ้า hp>0 และมีกุญแจ แสดง <b>ไปต่อ</b> ไม่งั้น <b>ติดอยู่</b>", starter: "hp = 50\nhas_key = True\n", hint: "<code>if hp > 0 and has_key:</code>", xp: 60, check: (out, code) => eq(out, "ไปต่อ") && /and/.test(code) },
          { title: "คู่หรือคี่", desc: "% 2 == 0 คือเลขคู่", goal: "n=7 แสดง <b>คู่</b> หรือ <b>คี่</b> (ต้องได้ <b>คี่</b>)", starter: "n = 7\n", hint: "<code>if n % 2 == 0:</code>", xp: 50, check: (out, code) => eq(out, "คี่") && /%\s*2/.test(code) },
          { title: "เงื่อนไขซ้อน", desc: "if ซ้อนใน if ตรวจเป็นชั้นๆ", goal: "hp=70, lv=12 ถ้า hp>50 และ lv>10 แสดง <b>สู้บอส</b>", starter: "hp = 70\nlv = 12\n", hint: "if hp>50 ข้างในมี if lv>10 อีกชั้น", xp: 60, check: (out, code) => eq(out, "สู้บอส") && (code.match(/if\s+/g) || []).length >= 2 }
        ]
      },
      {
        id: "loop", icon: "loop", title: "บทที่ 8: คำสั่งทำซ้ำ (Loop)",
        blurb: "while และ for พร้อม break, continue, else และลูปซ้อน",
        lesson: [
          { h: "ลูป for", p: "วนตามลำดับหรือช่วงตัวเลข <b>range(a, b)</b> ให้เลข a ถึง b-1 — เหมาะเมื่อรู้จำนวนรอบ", code: "for i in range(1, 4):\n    print(i)  # 1 2 3" },
          { h: "ลูป while", p: "วนตราบใดที่เงื่อนไขจริง — ต้องมีบรรทัดเปลี่ยนค่าเพื่อให้เงื่อนไขเป็นเท็จ ไม่งั้นวนไม่จบ", code: "n = 3\nwhile n > 0:\n    print(n)\n    n -= 1" },
          { h: "break และ continue", p: "<b>break</b> ออกจากลูปทันที • <b>continue</b> ข้ามไปรอบถัดไป — ใช้ควบคุมการวนละเอียดขึ้น", code: "for i in range(1, 6):\n    if i == 3:\n        continue  # ข้าม 3\n    print(i)  # 1 2 4 5" }
        ],
        stages: [
          { title: "วนด้วย for", desc: "range(1, 6) ให้ 1 ถึง 5", goal: "แสดง <b>เก็บเหรียญที่ 1</b> ถึง <b>5</b>", starter: "", hint: "<code>for i in range(1, 6): print(\"เก็บเหรียญที่\", i)</code>", xp: 50, check: (out, code) => { const l = lines(out); return l.length === 5 && l[0] === "เก็บเหรียญที่ 1" && l[4] === "เก็บเหรียญที่ 5" && /for\s+/.test(code); } },
          { title: "ผลรวม 1 ถึง 10", desc: "สะสมค่าในตัวแปรระหว่างวนลูป", goal: "หาผลรวม 1 ถึง 10 (ต้องได้ <b>55</b>)", starter: "total = 0\n", hint: "<code>for i in range(1, 11): total += i</code> จบลูปค่อย print", xp: 60, check: (out, code) => eq(out, "55") && /for\s+/.test(code) },
          { title: "นับถอยหลัง while", desc: "while วนจนเงื่อนไขเป็นเท็จ", goal: "count=3 นับถอยหลัง 3,2,1 แล้วแสดง <b>ทะยาน!</b>", starter: "count = 3\n", hint: "<code>while count > 0:</code> print แล้ว <code>count -= 1</code>", xp: 60, check: (out, code) => { const l = lines(out); return l.join(",") === "3,2,1,ทะยาน!" && /while/.test(code); } },
          { title: "เฉพาะเลขคู่", desc: "รวม for กับ if กรองค่า", goal: "แสดงเลขคู่ 1 ถึง 10 (2,4,6,8,10 บรรทัดละเลข)", starter: "", hint: "<code>for i in range(1, 11): if i % 2 == 0: print(i)</code>", xp: 60, check: (out) => { const l = lines(out); return l.join(",") === "2,4,6,8,10"; } },
          { title: "continue ข้ามค่า", desc: "continue ข้ามไปรอบถัดไป", goal: "แสดง 1-5 แต่ข้าม 3 (ต้องได้ 1,2,4,5)", starter: "", hint: "<code>if i == 3: continue</code>", xp: 60, check: (out, code) => { const l = lines(out); return l.join(",") === "1,2,4,5" && /continue/.test(code); } },
          { title: "ลูปซ้อน", desc: "ลูปใน ลูป — สร้างตาราง/รูปทรง", goal: "พิมพ์ตาราง 3 แถว แต่ละแถวมี *** (ดาว 3 ดวง)", starter: "", hint: "<code>for i in range(3): print(\"*\" * 3)</code> หรือลูปซ้อน", xp: 80, check: (out) => { const l = lines(out); return l.length === 3 && l.every(s => s === "***"); } }
        ]
      },
      {
        id: "flowchart", icon: "flowchart", title: "Flowchart สู่โค้ด",
        blurb: "อ่านผังงานสัญลักษณ์มาตรฐานแล้วแปลงเป็นโค้ด Python — ฝึกคิดก่อนเขียน",
        lesson: [
          { h: "สัญลักษณ์ผังงานมาตรฐาน", p: 'ก่อนเขียนโค้ด นักออกแบบวาดผังงานด้วยสัญลักษณ์สากลชุดนี้ — จำให้ได้เพราะออกข้อสอบบ่อย:<span class="fc-slot" data-flow="legend"></span>' },
          { h: "จากผังงานสู่โค้ด", p: "ข้าวหลามตัด = if, เส้นวนกลับ = loop, สี่เหลี่ยมด้านขนาน = input/print — อ่านทีละกล่องแล้วแปลงเป็น Python ตามลำดับ" }
        ],
        stages: [
          { title: "ผังงานเงื่อนไข", desc: "ข้าวหลามตัด = การตัดสินใจ (if-else)", goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc0"></span>', starter: "x = 10\n", hint: "<code>if x > 5: print(\"มากกว่า\") else: print(\"น้อยกว่า\")</code>", xp: 80, check: (out, code) => eq(out, "มากกว่า") && /if\s+/.test(code) },
          { title: "ผังงานลูป", desc: "เส้นวนกลับ = การวนซ้ำ (while)", goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc1"></span>', starter: "", hint: "i เริ่ม 1, while i<=3 พิมพ์แล้วเพิ่มค่า จบพิมพ์ \"จบ\"", xp: 80, check: (out, code) => { const l = lines(out); return l.length === 4 && l[0] === "รอบที่ 1" && l[3] === "จบ" && /while|for/.test(code); } },
          { title: "ผังงานสะสมค่า", desc: "ลูปพร้อมตัวแปรสะสม", goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc3"></span>(ต้องได้ <b>20</b>)', starter: "total = 0\n", hint: "วน i 1-4 บวก i*2 เข้า total", xp: 100, check: (out, code) => eq(out, "20") && /for|while/.test(code) },
          { title: "ผังงานหาค่ามากสุด", desc: "ลูป + เงื่อนไขหาค่าสูงสุด", goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc4"></span>(ต้องได้ <b>75</b>)', starter: "", hint: "best=0 วนเทียบ ถ้า s>best ให้ best=s", xp: 100, check: (out, code) => eq(out, "75") && /if\s+/.test(code) }
        ]
      },
      {
        id: "function", icon: "function", title: "บทที่ 9: ฟังก์ชันและโมดูล",
        blurb: "สร้างฟังก์ชัน, พารามิเตอร์, return, ค่าเริ่มต้น, Lambda และการใช้โมดูล",
        lesson: [
          { h: "สร้างฟังก์ชัน", p: "ใช้ <b>def</b> ตามด้วยชื่อและ ( ) — จัดกลุ่มโค้ดที่ใช้ซ้ำ เรียกใช้ด้วยชื่อฟังก์ชัน", code: "def greet():\n    print(\"สวัสดี\")\n\ngreet()  # เรียกใช้" },
          { h: "พารามิเตอร์และ return", p: "รับค่าเข้าผ่านพารามิเตอร์ ส่งผลกลับด้วย <b>return</b> — ตั้งค่าเริ่มต้นให้พารามิเตอร์ได้ด้วย =", code: "def add(a, b=10):\n    return a + b\n\nprint(add(5))     # 15\nprint(add(5, 3))  # 8" },
          { h: "Lambda และโมดูล", p: "<b>lambda</b> ฟังก์ชันสั้นบรรทัดเดียว • <b>import</b> เรียกใช้โมดูลสำเร็จรูป เช่น math, random", code: "square = lambda x: x * x\nprint(square(5))  # 25\n\nimport math\nprint(math.sqrt(16))  # 4.0" }
        ],
        stages: [
          { title: "ฟังก์ชันแรก", desc: "def สร้างฟังก์ชัน แล้วเรียกใช้ด้วยชื่อ", goal: "สร้างฟังก์ชัน greet ที่แสดง <b>สวัสดีนักผจญภัย</b> แล้วเรียกใช้", starter: "def greet():\n    # เติมโค้ด\n\n", hint: "ในฟังก์ชัน print แล้วข้างนอกเรียก <code>greet()</code>", xp: 60, check: (out, code) => eq(out, "สวัสดีนักผจญภัย") && /def\s+greet/.test(code) },
          { title: "return ค่า", desc: "return ส่งผลลัพธ์กลับ", goal: "สร้าง double(x) คืน x*2 แล้วแสดง double(21) (ต้องได้ <b>42</b>)", starter: "def double(x):\n    # return x คูณ 2\n\nprint(double(21))\n", hint: "<code>return x * 2</code>", xp: 60, check: (out, code) => eq(out, "42") && /return/.test(code) },
          { title: "หลายพารามิเตอร์", desc: "ฟังก์ชันรับหลายค่าได้", goal: "สร้าง attack(name, dmg) แสดง <b>อัศวิน โจมตี 30</b> เมื่อเรียก attack(\"อัศวิน\", 30)", starter: "def attack(name, dmg):\n    # แสดงผล\n\nattack(\"อัศวิน\", 30)\n", hint: "<code>print(name, \"โจมตี\", dmg)</code>", xp: 80, check: (out, code) => eq(out, "อัศวิน โจมตี 30") && /def\s+attack/.test(code) },
          { title: "ค่าเริ่มต้น", desc: "พารามิเตอร์มีค่าเริ่มต้นได้", goal: "สร้าง heal(amount=10) คืน amount แสดง heal() และ heal(50) (ต้องได้ <b>10</b> และ <b>50</b>)", starter: "def heal(amount=10):\n    return amount\n\n", hint: "<code>print(heal())</code> และ <code>print(heal(50))</code>", xp: 80, check: (out) => { const l = lines(out); return l[0] === "10" && l[1] === "50"; } },
          { title: "Lambda", desc: "lambda ฟังก์ชันสั้นบรรทัดเดียว", goal: "สร้าง lambda square คืนกำลังสอง แสดง square(6) (ต้องได้ <b>36</b>)", starter: "square = lambda x: x * x\n", hint: "<code>print(square(6))</code>", xp: 80, check: (out, code) => eq(out, "36") && /lambda/.test(code) },
          { title: "ใช้โมดูล math", desc: "import เรียกใช้โมดูลสำเร็จรูป", goal: "ใช้ math.sqrt หารากที่สองของ 144 (ต้องได้ <b>12.0</b>)", starter: "import math\n", hint: "<code>print(math.sqrt(144))</code>", xp: 80, check: (out, code) => eq(out, "12.0") && /import\s+math/.test(code) }
        ]
      },
      {
        id: "exception", icon: "ifelse", title: "บทที่ 10: การจัดการข้อผิดพลาด (Exception)",
        blurb: "try-except-else-finally และ raise — จัดการข้อผิดพลาดไม่ให้โปรแกรมพัง",
        lesson: [
          { h: "try-except", p: "โค้ดที่อาจ error ใส่ใน <b>try</b> ถ้าเกิดข้อผิดพลาดจะกระโดดไป <b>except</b> แทนที่จะพังทั้งโปรแกรม", code: "try:\n    x = 10 / 0\nexcept:\n    print(\"หารด้วยศูนย์ไม่ได้\")" },
          { h: "else และ finally", p: "<b>else</b> ทำเมื่อไม่มี error • <b>finally</b> ทำเสมอไม่ว่าจะ error หรือไม่ (เหมาะกับการปิดไฟล์/เชื่อมต่อ)", code: "try:\n    x = int(\"5\")\nexcept:\n    print(\"แปลงไม่ได้\")\nelse:\n    print(\"ได้\", x)\nfinally:\n    print(\"จบ\")" },
          { h: "raise", p: "สั่งให้เกิด error เองด้วย <b>raise</b> เมื่อพบข้อมูลไม่ถูกต้อง เช่น อายุติดลบ", code: "age = -5\nif age < 0:\n    raise ValueError(\"อายุติดลบไม่ได้\")" }
        ],
        stages: [
          { title: "จับ error", desc: "try-except ป้องกันโปรแกรมพัง", goal: "ใช้ try-except หาร 10/0 แล้วแสดง <b>error</b> เมื่อเกิดข้อผิดพลาด", starter: "try:\n    x = 10 / 0\n", hint: "<code>except: print(\"error\")</code>", xp: 60, check: (out, code) => eq(out, "error") && /except/.test(code) },
          { title: "แปลงเลขปลอดภัย", desc: "จับ error ตอนแปลงข้อความที่ไม่ใช่ตัวเลข", goal: "ลอง int(\"abc\") ใน try ถ้า error แสดง <b>ไม่ใช่ตัวเลข</b>", starter: "try:\n    n = int(\"abc\")\n", hint: "<code>except: print(\"ไม่ใช่ตัวเลข\")</code>", xp: 80, check: (out, code) => eq(out, "ไม่ใช่ตัวเลข") && /try/.test(code) && /except/.test(code) },
          { title: "finally ทำเสมอ", desc: "finally ทำงานทุกกรณี", goal: "try แปลง int(\"5\") สำเร็จ แล้ว finally แสดง <b>จบการทำงาน</b>", starter: "try:\n    n = int(\"5\")\nexcept:\n    print(\"error\")\n", hint: "<code>finally: print(\"จบการทำงาน\")</code>", xp: 80, check: (out, code) => eq(out, "จบการทำงาน") && /finally/.test(code) }
        ]
      },
      {
        id: "oop", icon: "function", title: "บทที่ 12: การเขียนโปรแกรมเชิงวัตถุ (OOP)",
        blurb: "คลาส, ออบเจ็กต์, __init__, encapsulation, inheritance และ polymorphism",
        lesson: [
          { h: "คลาสและออบเจ็กต์", p: "<b>คลาส</b> คือแม่พิมพ์ <b>ออบเจ็กต์</b> คือของจริงที่สร้างจากแม่พิมพ์ — <code>__init__</code> คือเมท็อดที่ทำงานตอนสร้างออบเจ็กต์ (กำหนดค่าเริ่มต้น) <code>self</code> คือตัวออบเจ็กต์เอง", code: "class Hero:\n    def __init__(self, name):\n        self.name = name\n\nh = Hero(\"มะลิ\")\nprint(h.name)  # มะลิ" },
          { h: "เมท็อดและ Encapsulation", p: "เมท็อดคือฟังก์ชันในคลาส — <b>Encapsulation</b> ซ่อนข้อมูลด้วย __ นำหน้า และให้เข้าถึงผ่านเมท็อด (getter/setter)", code: "class Hero:\n    def __init__(self, hp):\n        self.hp = hp\n    def attack(self):\n        print(\"โจมตี!\")\n\nHero(100).attack()" },
          { h: "Inheritance และ Polymorphism", p: "<b>Inheritance</b> คลาสลูกสืบทอดจากคลาสแม่ (ใช้โค้ดซ้ำ) • <b>Polymorphism</b> เมท็อดชื่อเดียวกันทำงานต่างกันในแต่ละคลาส", code: "class Animal:\n    def sound(self):\n        print(\"...\")\nclass Cat(Animal):\n    def sound(self):\n        print(\"เหมียว\")\n\nCat().sound()  # เหมียว" }
        ],
        stages: [
          { title: "สร้างคลาสแรก", desc: "class สร้างแม่พิมพ์ __init__ กำหนดค่าเริ่มต้น", goal: "สร้างคลาส Hero รับ name แล้วสร้างออบเจ็กต์ชื่อ \"มะลิ\" แสดงชื่อ (ต้องได้ <b>มะลิ</b>)", starter: "class Hero:\n    def __init__(self, name):\n        self.name = name\n\n# สร้างออบเจ็กต์แล้วแสดงชื่อ\n", hint: "<code>h = Hero(\"มะลิ\")</code> แล้ว <code>print(h.name)</code>", xp: 80, check: (out, code) => eq(out, "มะลิ") && /class\s+Hero/.test(code) },
          { title: "เมท็อด", desc: "เมท็อดคือฟังก์ชันในคลาส (มี self)", goal: "เพิ่มเมท็อด attack ที่แสดง <b>โจมตี!</b> แล้วเรียกใช้", starter: "class Hero:\n    def attack(self):\n        # แสดงข้อความ\n\nh = Hero()\nh.attack()\n", hint: "ในเมท็อด <code>print(\"โจมตี!\")</code>", xp: 80, check: (out, code) => eq(out, "โจมตี!") && /def\s+attack\s*\(\s*self/.test(code) },
          { title: "เก็บค่าในออบเจ็กต์", desc: "self.x เก็บข้อมูลประจำออบเจ็กต์", goal: "คลาส Hero รับ hp เก็บใน self.hp สร้างด้วย hp=100 แล้วแสดง hp (ต้องได้ <b>100</b>)", starter: "class Hero:\n    def __init__(self, hp):\n        self.hp = hp\n\n", hint: "<code>h = Hero(100)</code> แล้ว <code>print(h.hp)</code>", xp: 80, check: (out, code) => eq(out, "100") && /self\.hp/.test(code) },
          { title: "การสืบทอด", desc: "คลาสลูกสืบทอดจากคลาสแม่ด้วย (แม่)", goal: "คลาส Cat สืบทอดจาก Animal มีเมท็อด sound แสดง <b>เหมียว</b> แล้วเรียกใช้", starter: "class Animal:\n    def sound(self):\n        print(\"...\")\n\nclass Cat(Animal):\n    def sound(self):\n        # แสดงเหมียว\n\nCat().sound()\n", hint: "ใน Cat.sound: <code>print(\"เหมียว\")</code>", xp: 100, check: (out, code) => eq(out, "เหมียว") && /class\s+Cat\s*\(\s*Animal\s*\)/.test(code) }
        ]
      },
      {
        id: "filehandling", icon: "datastructure", title: "บทที่ 11: การจัดการไฟล์ (File Handling)",
        blurb: "อ่าน-เขียนไฟล์ Text, CSV, Excel — บทเรียนทฤษฎี (ต้องใช้ระบบไฟล์จริง)",
        lesson: [
          { h: "เปิดและเขียนไฟล์", p: "ใช้ <b>open(ชื่อไฟล์, โหมด)</b> โหมด: <code>\"r\"</code> อ่าน • <code>\"w\"</code> เขียนทับ • <code>\"a\"</code> เขียนต่อท้าย — เขียนด้วย <code>.write()</code> อ่านด้วย <code>.read()</code> และควรปิดไฟล์ด้วย <code>.close()</code>", code: "f = open(\"data.txt\", \"w\")\nf.write(\"สวัสดี\")\nf.close()" },
          { h: "with statement", p: "การเปิดไฟล์ด้วย <b>with</b> จะปิดไฟล์ให้อัตโนมัติเมื่อจบบล็อก ปลอดภัยกว่าและเป็นวิธีที่แนะนำ", code: "with open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    print(content)" },
          { h: "ไฟล์ CSV และ Excel", p: "<b>CSV</b> ใช้โมดูล csv หรือ pandas อ่าน-เขียนข้อมูลตาราง • <b>Excel</b> ใช้ openpyxl หรือ pandas — เหมาะกับข้อมูลจำนวนมากที่เป็นตาราง (หมายเหตุ: ต้องรันบนเครื่องจริงที่มีระบบไฟล์)", code: "import pandas as pd\ndf = pd.read_csv(\"data.csv\")\nprint(df.head())" }
        ],
        stages: []
      },
      {
        id: "gui", icon: "operator", title: "บทที่ 13: สร้าง GUI ด้วย Tkinter",
        blurb: "หน้าต่างโปรแกรมและ widget ต่างๆ — บทเรียนทฤษฎี (ต้องใช้หน้าต่างจริง)",
        lesson: [
          { h: "รู้จัก Tkinter", p: "<b>Tkinter</b> คือไลบรารีสร้างหน้าต่างโปรแกรม (GUI) ที่มากับ Python — สร้างหน้าต่างด้วย <code>Tk()</code> และแสดงด้วย <code>mainloop()</code> ส่วน <b>ttk</b> คือ widget รุ่นใหม่ที่สวยกว่า", code: "import tkinter as tk\nwin = tk.Tk()\nwin.title(\"โปรแกรมแรก\")\nwin.mainloop()" },
          { h: "Widget พื้นฐาน", p: "<b>Label</b> ข้อความ • <b>Button</b> ปุ่ม • <b>Entry</b> ช่องกรอก • <b>Text</b> กล่องข้อความหลายบรรทัด • <b>Checkbutton/Radiobutton</b> ตัวเลือก — แต่ละ widget มี option ปรับสี ขนาด ฟอนต์ได้", code: "label = tk.Label(win, text=\"สวัสดี\")\nbtn = tk.Button(win, text=\"กดฉัน\")\nlabel.pack()\nbtn.pack()" },
          { h: "การจัดวาง (Layout)", p: "3 วิธีจัดวาง widget: <b>pack()</b> เรียงต่อกัน • <b>grid()</b> จัดเป็นตารางแถว-คอลัมน์ • <b>place()</b> ระบุพิกัดเอง — และผูกเหตุการณ์ปุ่มด้วย command หรือ bind()" }
        ],
        stages: []
      },
      {
        id: "database", icon: "datastructure", title: "บทที่ 14-15: ฐานข้อมูล (MariaDB/MongoDB)",
        blurb: "เชื่อมต่อและจัดการฐานข้อมูล SQL และ NoSQL — บทเรียนทฤษฎี",
        lesson: [
          { h: "ฐานข้อมูลและ DBMS", p: "<b>ฐานข้อมูล</b> คือที่เก็บข้อมูลอย่างเป็นระบบ <b>DBMS</b> คือโปรแกรมจัดการฐานข้อมูล — แบ่งเป็น <b>SQL</b> (ตาราง เช่น MariaDB/MySQL) และ <b>NoSQL</b> (เอกสาร เช่น MongoDB)" },
          { h: "เชื่อมต่อ MariaDB", p: "Python เชื่อม MariaDB ด้วยโมดูล <b>pymysql</b> — เชื่อมต่อ, ส่งคำสั่ง SQL (INSERT/SELECT/UPDATE/DELETE), และดึงผลลัพธ์ด้วย fetchall()", code: "import pymysql\nconn = pymysql.connect(host=\"localhost\",\n    user=\"root\", database=\"game\")\ncur = conn.cursor()\ncur.execute(\"SELECT * FROM players\")\nprint(cur.fetchall())" },
          { h: "MongoDB (NoSQL)", p: "MongoDB เก็บข้อมูลเป็น<b>เอกสาร (document)</b> คล้าย dict ของ Python — เชื่อมด้วยโมดูล <b>pymongo</b> จัดการด้วย insert_one(), find(), update_one(), delete_one()", code: "from pymongo import MongoClient\nclient = MongoClient(\"localhost\", 27017)\ndb = client.game\ndb.players.insert_one({\"name\": \"มะลิ\", \"hp\": 100})" }
        ],
        stages: []
      },
      {
        id: "webapp", icon: "operator", title: "บทที่ 16-17: เว็บแอปฯ (Django) และ Web Scraping",
        blurb: "พัฒนาเว็บด้วย Django และดึงข้อมูลจากเว็บ — บทเรียนทฤษฎี",
        lesson: [
          { h: "Django MVT Architecture", p: "<b>Django</b> คือเฟรมเวิร์กสร้างเว็บด้วย Python ใช้สถาปัตยกรรม <b>MVT</b>: <b>Model</b> (ข้อมูล/ฐานข้อมูล), <b>View</b> (ตรรกะ), <b>Template</b> (หน้าเว็บ HTML) — สร้างโปรเจกต์ด้วย django-admin startproject" },
          { h: "โครงสร้างโปรเจกต์", p: "แบ่งเว็บเป็น <b>Apps</b> ย่อยๆ แต่ละแอปมี models, views, templates, urls — รันเซิร์ฟเวอร์ทดสอบด้วย <code>python manage.py runserver</code>", code: "# views.py\nfrom django.shortcuts import render\ndef home(request):\n    return render(request, \"home.html\")" },
          { h: "Web Scraping", p: "การดึงข้อมูลจากเว็บด้วย <b>BeautifulSoup</b> (แกะ HTML) และ <b>Requests</b> (โหลดหน้าเว็บ) หรือ <b>Selenium</b> (ควบคุมเบราว์เซอร์) — ควรเคารพไฟล์ robots.txt และกฎหมายลิขสิทธิ์", code: "import requests\nfrom bs4 import BeautifulSoup\nr = requests.get(\"https://example.com\")\nsoup = BeautifulSoup(r.text, \"html.parser\")\nprint(soup.title.text)" }
        ],
        stages: []
      },
      {
        id: "api", icon: "function", title: "บทที่ 18-21: API และ Microservices",
        blurb: "REST API, Flask, FastAPI และ Automated Testing — บทเรียนทฤษฎี",
        lesson: [
          { h: "REST API คืออะไร", p: "<b>API</b> คือช่องทางให้โปรแกรมคุยกัน <b>REST API</b> ใช้ HTTP Method: <b>GET</b> (ดึงข้อมูล), <b>POST</b> (เพิ่ม), <b>PUT</b> (แก้), <b>DELETE</b> (ลบ) — ส่งข้อมูลในรูปแบบ <b>JSON</b>" },
          { h: "Flask และ FastAPI", p: "<b>Flask</b> เฟรมเวิร์กเล็กยืดหยุ่นสำหรับสร้าง API • <b>FastAPI</b> ทันสมัย เร็ว มีเอกสารอัตโนมัติ (Swagger) — กำหนด endpoint ด้วย decorator", code: "from fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\"/hello\")\ndef hello():\n    return {\"message\": \"สวัสดี\"}" },
          { h: "Automated Testing", p: "<b>Unit Test</b> คือการทดสอบโค้ดอัตโนมัติด้วยโมดูล <b>unittest</b> — เขียน test case ตรวจว่าฟังก์ชันทำงานถูกต้อง ช่วยจับบั๊กก่อนขึ้นระบบจริง", code: "import unittest\nclass TestAdd(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(2 + 3, 5)" }
        ],
        stages: []
      },
      {
        id: "datascience", icon: "datastructure", title: "บทที่ 22-26: Data Science",
        blurb: "NumPy, Pandas, Matplotlib และ Machine Learning — บทเรียนทฤษฎี",
        lesson: [
          { h: "Data Science กับ Python", p: "Python เป็นภาษายอดนิยมสำหรับ Data Science ด้วยไลบรารีทรงพลัง: <b>NumPy</b> (คำนวณอาร์เรย์), <b>Pandas</b> (จัดการตารางข้อมูล), <b>Matplotlib</b> (กราฟ), <b>Scikit-learn</b> (Machine Learning)" },
          { h: "NumPy และ Pandas", p: "<b>NumPy</b> จัดการอาร์เรย์หลายมิติ (ndarray) คำนวณเร็วมาก • <b>Pandas</b> จัดการข้อมูลตาราง (DataFrame) เหมือน Excel ในโค้ด — อ่านไฟล์ กรอง จัดกลุ่ม วิเคราะห์", code: "import numpy as np\nimport pandas as pd\narr = np.array([1, 2, 3])\nprint(arr.mean())  # 2.0\ndf = pd.DataFrame({\"a\": [1, 2], \"b\": [3, 4]})" },
          { h: "Machine Learning", p: "<b>Scikit-learn</b> ทำ Machine Learning: <b>Supervised</b> (มีเฉลย เช่น Linear Regression, K-NN, SVM), <b>Unsupervised</b> (ไม่มีเฉลย เช่น K-Means) — สอนโมเดลด้วยข้อมูล แล้วให้ทำนายข้อมูลใหม่", code: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npred = model.predict(X_test)" }
        ],
        stages: []
      }
    ]
  },
  c: {
    name: "C", icon: "🅲",
    tagline: "รากฐานของทุกภาษา — เร็ว ตรงไปตรงมา และใกล้ชิดหน่วยความจำที่สุด เรียนครบ 10 หน่วยตามหลักสูตร",
    topics: [
      {
        id: "cintro", icon: "🅲", title: "หน่วยที่ 1: แนะนำภาษาซี",
        blurb: "ประวัติภาษาซี ขั้นตอนพัฒนาโปรแกรม โครงสร้าง 3 ส่วน คอมเมนต์ และกฎการตั้งชื่อ — ประจำหน่วยที่ 1",
        lesson: [
          { h: "ประวัติความเป็นมาของภาษาซี", p: "ค.ศ. 1972 <b>Dennis Ritchie</b> คิดค้นภาษาซีโดยพัฒนามาจากภาษา B และ BCPL • ค.ศ. 1978 <b>Brian Kernighan</b> ร่วมกับ Ritchie วางมาตรฐาน <b>K&R</b> และเขียนหนังสือ \"The C Programming Language\" • ค.ศ. 1988 เกิดมาตรฐาน <b>ANSI C</b> • ต่อมาปรับเป็น ISO/IEC 9899:1999 (<b>C99</b>) แล้วพัฒนาต่อเป็น C11, C17 (ค.ศ. 2018) และ C23 — ปัจจุบันภาษาซีเป็นภาษาระดับกลาง (middle-level) เหมาะกับการเขียนโปรแกรมแบบโครงสร้าง และเป็นพื้นฐานของ C++, C#, Objective-C, Java, PHP<br><br><i>หมายเหตุ: หน่วยที่ 1 นี้ตรงกับบทที่ 1 ในหนังสือเรียน — เลขตัวอย่างในเกมใช้เลขหน่วย (1.x) ซึ่งตรงกับหนังสือพอดี</i>" },
          { h: "ขั้นตอนการพัฒนาโปรแกรมภาษาซี (4 ขั้น)", p: "<b>1) เขียนโปรแกรม</b> — ใช้ editor เขียน source code บันทึกเป็นไฟล์ .c • <b>2) คอมไพล์</b> — คอมไพเลอร์ตรวจข้อผิดพลาด แล้วแปลเป็นภาษาเครื่อง (.obj) • <b>3) เชื่อมโยง (link)</b> — รวมกับ library ได้ executable program (.exe) • <b>4) รัน</b> — ประมวลผลได้ผลลัพธ์ — ภาษาซีใช้ตัวแปลแบบ<b>คอมไพเลอร์</b> (แปลทีเดียวทั้งโปรแกรม ทำงานเร็ว) ต่างจาก<b>อินเตอร์พรีเตอร์</b>ที่แปลทีละบรรทัด (หาข้อผิดพลาดง่ายแต่ช้ากว่า — Python ใช้แบบนี้) ในเกมนี้กดรันครั้งเดียว ระบบทำครบทุกขั้นให้อัตโนมัติ" },
          { h: "โครงสร้างของโปรแกรมภาษาซี (3 ส่วน)", p: "<b>1) ส่วนหัวของโปรแกรม</b> — Preprocessing Directives ขึ้นต้นด้วยเครื่องหมาย # เสมอ เช่น #include &lt;stdio.h&gt; บอกคอมไพเลอร์ให้นำเฮดเดอร์ไฟล์ที่รวมการประกาศ printf()/scanf() เข้ามาด้วย • <b>2) ฟังก์ชั่นหลัก main()</b> — ทุกโปรแกรมต้องมี ขอบเขตการทำงานอยู่ในเครื่องหมาย { และ } (เขียน main() หรือ void main(void) ก็ได้ ความหมายเหมือนกัน แต่มาตรฐานใหม่นิยม int main() คู่กับ return 0;) • <b>3) ส่วนรายละเอียดของโปรแกรม</b> — คำสั่งต่างๆ ที่ให้โปรแกรมทำงานตามที่ออกแบบไว้", code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\");\n    return 0;\n}" },
          { h: "คอมเมนต์ในภาษาซี (2 แบบ)", p: "คอมเมนต์คือหมายเหตุที่คอมไพเลอร์จะข้ามไม่แปลผล: <b>//</b> คอมเมนต์บรรทัดเดียว และ <b>/* ... */</b> คอมเมนต์หลายบรรทัด — ข้อควรระวัง: คอมเมนต์แบบหลายบรรทัด<b>ซ้อนกันไม่ได้</b> เช่น /* /* */ */ จะเกิดข้อผิดพลาดตอนคอมไพล์", code: "// คอมเมนต์บรรทัดเดียว\n/* คอมเมนต์\n   หลายบรรทัด */" },
          { h: "กฎการตั้งชื่อ (Identifier)", p: "การตั้งชื่อตัวแปร ฟังก์ชั่น และเลเบล มีกฎดังนี้: • ห้ามซ้ำกับ<b>คำสงวน</b> (reserved word) เช่น auto, break, case, char, const, continue, default, do, double, else, enum, extern, float, for, goto, if, int, long, return, short, signed, sizeof, static, struct, switch, typedef, union, unsigned, void, volatile, while • เป็นแบบ <b>case-sensitive</b> — TEST, Test, test, tEsT ถือเป็นคนละชื่อกัน • ต้องขึ้นต้นด้วย<b>ตัวอักษรหรือ _ เท่านั้น</b> ห้ามขึ้นต้นด้วยตัวเลข (ภายในชื่อมีตัวเลขได้) • ห้ามเว้นวรรคในชื่อ • ห้ามใช้อักขระพิเศษ เช่น $, @, #, & — ตัวอย่างชื่อที่ถูก: b1, app_passwd, _testValue / ชื่อที่ผิด: $hello, User name, 3people, while" }
        ],
        stages: [
          {
            title: "โปรแกรมแรก: Hello World",
            desc: "ตัวอย่างที่ 1.3 — โปรแกรมภาษาซีโปรแกรมแรกของทุกคน สังเกตโครงสร้าง 3 ส่วน: #include, main() และคำสั่งใน { }",
            goal: 'เขียนโปรแกรมสมบูรณ์แสดงข้อความ <b>Hello World</b>',
            starter: "// เริ่มด้วย #include <stdio.h> แล้วเขียนโครง main เองทั้งหมด\n\n",
            hint: 'โครงเต็ม: <code>#include &lt;stdio.h&gt;</code> ↵ <code>int main() {</code> ↵ <code>printf("Hello World");</code> ↵ <code>return 0;</code> ↵ <code>}</code>',
            xp: 30,
            check: (out, code) => eq(out, "Hello World") && /printf/.test(code)
          },
          {
            title: "เครื่องหมาย ; ที่หายไป",
            desc: "ขั้นคอมไพล์จะตรวจ error ให้เรา — โค้ดนี้ลืม ; สองจุด ลองกดรันดูข้อความ error แล้วแก้ตามที่มันบอก",
            goal: 'แก้โค้ดให้คอมไพล์ผ่าน และได้ผลลัพธ์ <b>สวัสดีภาษาซี</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    printf(\"สวัสดี\")\n    printf(\"ภาษาซี\")\n    return 0;\n}\n",
            hint: 'เติม <code>;</code> ท้ายคำสั่ง printf ทั้งสองบรรทัด',
            xp: 40,
            check: (out) => eq(out, "สวัสดีภาษาซี")
          },
          {
            title: "ขึ้นบรรทัดใหม่ด้วย \\n",
            desc: "printf ไม่ขึ้นบรรทัดใหม่ให้เอง! ใช้รหัส \\n ในข้อความเพื่อบอกให้ขึ้นบรรทัดใหม่ตรงนั้น",
            goal: 'ใช้ printf <b>คำสั่งเดียว</b> แสดง 2 บรรทัด: <b>C คือ</b> และ <b>รากฐานของทุกภาษา</b>',
            starter: "// อย่าลืม #include <stdio.h> และโครง main\n\n",
            hint: 'ลอง <code>printf("C คือ\\nรากฐานของทุกภาษา");</code>',
            xp: 40,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "C คือ" && l[1] === "รากฐานของทุกภาษา" && (code.match(/printf/g) || []).length === 1 && code.includes("\\n"); }
          },
          {
            title: "คอมเมนต์บรรทัดเดียว //",
            desc: "มีบรรทัดที่ไม่ใช่ภาษา C ปนอยู่ ทำให้คอมไพล์พัง — ใช้ // ปิดบรรทัดนั้นเป็นคอมเมนต์ คอมไพเลอร์จะข้ามให้",
            goal: 'ทำให้โปรแกรมรันผ่านโดย<b>ไม่ลบ</b>บรรทัดที่พัง (ใช้คอมเมนต์) และได้ผลลัพธ์ <b>โปรแกรมทำงานแล้ว</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    บรรทัดนี้ไม่ใช่ภาษา C เลยทำให้พัง\n    printf(\"โปรแกรมทำงานแล้ว\");\n    return 0;\n}\n",
            hint: 'เติม <code>//</code> หน้าบรรทัดที่พัง',
            xp: 50,
            check: (out, code) => eq(out, "โปรแกรมทำงานแล้ว") && /\/\//.test(code)
          },
          {
            title: "คอมเมนต์หลายบรรทัด /* */",
            desc: "ตัวอย่างที่ 1.2 — โน้ตยาวหลายบรรทัดใช้ /* เปิด และ */ ปิด ครอบทีเดียวได้ทั้งก้อน (แต่ห้ามซ้อนกันนะ!)",
            goal: 'ใช้คอมเมนต์แบบ <b>/* */</b> ครอบสองบรรทัดที่พังไว้ด้วยกัน ให้ได้ผลลัพธ์ <b>คอมไพล์ผ่านแล้ว</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    โน้ตบรรทัดที่หนึ่ง\n    โน้ตบรรทัดที่สอง\n    printf(\"คอมไพล์ผ่านแล้ว\");\n    return 0;\n}\n",
            hint: 'เติม <code>/*</code> หน้าบรรทัดแรก และ <code>*/</code> ท้ายบรรทัดที่สอง',
            xp: 50,
            check: (out, code) => eq(out, "คอมไพล์ผ่านแล้ว") && /\/\*/.test(code) && /\*\//.test(code)
          },
          {
            title: "กฎการตั้งชื่อ",
            desc: "แบบฝึกหัดท้ายหน่วย — ชื่อตัวแปรในโค้ดนี้ผิดกฎ 2 ตัว: ตัวหนึ่งขึ้นต้นด้วยตัวเลข อีกตัวมีช่องว่างในชื่อ",
            goal: 'แก้ชื่อตัวแปรให้ถูกกฎ (เช่น <b>people3</b> และ <b>user_name</b>) แล้วให้ได้ผลลัพธ์ <b>รวม = 15</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    int 3people = 5;\n    int User name = 10;\n    printf(\"รวม = %d\", 3people + User name);\n    return 0;\n}\n",
            hint: 'ชื่อห้ามขึ้นต้นด้วยตัวเลขและห้ามเว้นวรรค — เปลี่ยนทั้งจุดประกาศและจุดใช้งานให้ตรงกัน',
            xp: 50,
            check: (out, code) => eq(out, "รวม = 15") && !/3people/.test(code) && !/User name/.test(code)
          },
          {
            title: "ตัวพิมพ์ใหญ่-เล็ก คนละตัวกัน",
            desc: "แบบฝึกหัดท้ายหน่วย — ภาษาซีเป็น case-sensitive: score กับ Score ถือเป็นคนละตัวแปรกันโดยสิ้นเชิง!",
            goal: 'โค้ดประกาศ <b>score</b> แต่ดันเรียกใช้ <b>Score</b> — แก้ให้ถูกต้อง ให้ได้ผลลัพธ์ <b>คะแนน 80</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    int score = 80;\n    printf(\"คะแนน %d\", Score);\n    return 0;\n}\n",
            hint: 'เปลี่ยน Score เป็น score ให้ตรงกับที่ประกาศไว้',
            xp: 50,
            check: (out, code) => eq(out, "คะแนน 80") && !/Score/.test(code)
          },
          {
            title: "เขียนเองทั้งโครง",
            desc: "ปิดบทที่ 1: เขียนโปรแกรม C ที่สมบูรณ์ด้วยตัวเองทั้งหมด ครบโครงสร้าง 3 ส่วนตามบทเรียน",
            goal: 'เขียนโปรแกรมสมบูรณ์ที่แสดงข้อความ <b>จบหน่วยที่ 1</b> (ต้องมี int main และ return 0)',
            starter: "",
            hint: 'โครง: <code>#include &lt;stdio.h&gt;</code> → <code>int main() {</code> → printf → <code>return 0;</code> → <code>}</code>',
            xp: 50,
            check: (out, code) => eq(out, "จบหน่วยที่ 1") && /int\s+main/.test(code) && /return\s+0/.test(code)
          }
        ]
      },
      {
        id: "cvs", icon: "🖥️", title: "หน่วยที่ 2: โปรแกรม Visual Studio 2022",
        blurb: "ใช้เครื่องมือระดับมืออาชีพ: สร้างโปรเจกต์ Build/Run และอ่าน Error List ให้เป็น",
        lesson: [
          { h: "สร้างโปรเจกต์แรกใน Visual Studio 2022", p: "เปิดโปรแกรม → <b>Create a new project</b> → เลือก <b>Empty Project</b> (C++) → ตั้งชื่อโปรเจกต์ → คลิกขวาที่ <b>Source Files</b> ใน Solution Explorer → Add → New Item → ตั้งชื่อไฟล์ลงท้ายด้วย <b>.c</b> (สำคัญมาก! ถ้าลงท้าย .cpp จะถูกคอมไพล์เป็น C++)" },
          { h: "Build และ Run", p: "<b>Ctrl+Shift+B</b> = Build (คอมไพล์อย่างเดียว ยังไม่รัน) • <b>F5</b> = รันแบบดีบัก • <b>Ctrl+F5</b> = รันแบบไม่ดีบัก — หน้าต่างผลลัพธ์จะค้างไว้ให้อ่าน เหมาะกับการทดสอบโปรแกรม" },
          { h: "อ่าน Error List ให้เป็น", p: "เมื่อ Build ไม่ผ่าน หน้าต่าง <b>Error List</b> จะบอกไฟล์ บรรทัด และสาเหตุ เช่น <code>error C2143: syntax error: missing ';'</code> — ดับเบิลคลิกที่ error เพื่อกระโดดไปบรรทัดนั้นได้ทันที ในเกมนี้ช่องผลลัพธ์จะแสดงข้อความ error แบบเดียวกัน" },
          { h: "Error กับ Warning ต่างกัน", p: "<b>Error</b> = คอมไพล์ไม่ผ่าน ต้องแก้เท่านั้น • <b>Warning</b> = คอมไพล์ผ่านแต่เสี่ยงบั๊ก เช่น C4700: uninitialized variable (ใช้ตัวแปรก่อนกำหนดค่า) — โปรแกรมเมอร์ที่ดีเก็บ warning ให้หมดด้วย" }
        ],
        stages: [
          {
            title: "แก้ error: missing ';'",
            desc: "จำลองสถานการณ์จริง: Error List ฟ้อง \"error C2143: syntax error: missing ';'\" — อ่านข้อความ error ในช่องผลลัพธ์ แล้วแก้ตามที่มันบอก",
            goal: 'แก้โค้ดให้ Build ผ่าน และได้ผลลัพธ์ <b>Build สำเร็จ!</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    printf(\"Build สำเร็จ!\")\n    return 0;\n}\n",
            hint: 'error บอกว่าขาด ; — เติมท้ายบรรทัด printf',
            xp: 40,
            check: (out) => eq(out, "Build สำเร็จ!")
          },
          {
            title: "error: undeclared identifier",
            desc: "error ยอดฮิตอันดับสอง: ใช้ตัวแปรที่ยังไม่ได้ประกาศ (C2065: undeclared identifier) — C ต้องประกาศตัวแปรก่อนใช้เสมอ",
            goal: 'ประกาศตัวแปร <b>score</b> ให้ถูกต้อง (ค่า 100) แล้วได้ผลลัพธ์ <b>คะแนน 100</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    // ประกาศตัวแปร score ตรงนี้\n\n    printf(\"คะแนน %d\", score);\n    return 0;\n}\n",
            hint: 'ประกาศพร้อมค่า: <code>int score = 100;</code>',
            xp: 40,
            check: (out, code) => eq(out, "คะแนน 100") && /int\s+score/.test(code)
          },
          {
            title: "กำจัด warning",
            desc: "โค้ดนี้ Build ผ่านใน Visual Studio แต่มี warning C4700: ใช้ตัวแปร x โดยยังไม่กำหนดค่า — ค่าที่ได้จะมั่วไม่แน่นอน",
            goal: 'กำหนดค่า <b>x = 7</b> ก่อนนำไปใช้ ให้ได้ผลลัพธ์ <b>ค่า x = 7</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    int x;\n    // กำหนดค่าให้ x ก่อนใช้\n\n    printf(\"ค่า x = %d\", x);\n    return 0;\n}\n",
            hint: 'เติม <code>x = 7;</code> ก่อนบรรทัด printf',
            xp: 50,
            check: (out, code) => eq(out, "ค่า x = 7") && /x\s*=\s*7/.test(code)
          },
          {
            title: "รันแบบ Ctrl+F5",
            desc: "โปรแกรม console ที่ดีมักพิมพ์ข้อความปิดท้ายให้ผู้ใช้รู้ว่าจบแล้ว — ฝึกจัดระเบียบผลลัพธ์ให้เหมือนโปรแกรมจริงใน Visual Studio",
            goal: 'แสดงผล 2 บรรทัด: <b>ผลลัพธ์: 42</b> และ <b>กด Enter เพื่อปิดหน้าต่าง...</b>',
            starter: "int main() {\n    int answer = 42;\n\n    return 0;\n}\n",
            hint: 'printf สองครั้ง อย่าลืม \\n ท้ายบรรทัดแรก และใช้ %d กับ answer',
            xp: 50,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "ผลลัพธ์: 42" && l[1] === "กด Enter เพื่อปิดหน้าต่าง..." && /%d/.test(code); }
          },
          {
            title: "error: type ไม่ตรง",
            desc: "Visual Studio เตือน C4477: รหัสรูปแบบไม่ตรงชนิดข้อมูล — ใช้ %d กับ float จะได้ค่าเพี้ยน ต้องจับคู่ให้ถูก",
            goal: 'ประกาศ <b>float avg = 8.5</b> แล้วแสดง <b>ค่าเฉลี่ย 8.50</b> ด้วยรหัสรูปแบบที่ถูกต้อง',
            starter: "// อย่าลืม #include <stdio.h> ด้านบน\n\nint main() {\n    float avg = 8.5;\n    // แสดงผลด้วยรหัสรูปแบบให้ตรงชนิด\n\n    return 0;\n}\n",
            hint: 'float ต้องใช้ %f ไม่ใช่ %d: <code>printf("ค่าเฉลี่ย %.2f", avg);</code>',
            xp: 50,
            check: (out, code) => eq(out, "ค่าเฉลี่ย 8.50") && /%\.2f/.test(code)
          },
          {
            title: "จัดระเบียบด้วยหลายตัวแปร",
            desc: "ฝึกประกาศตัวแปรหลายตัวและคำนวณ เหมือนโปรแกรมคิดเงินจริงใน Visual Studio — เขียนทั้งโปรแกรมเองตั้งแต่ header",
            goal: 'สินค้าราคา <b>120</b> ซื้อ <b>3</b> ชิ้น แสดง <b>รวมเป็นเงิน 360 บาท</b>',
            starter: "// เขียนโปรแกรมทั้งหมดเองตั้งแต่ #include\n\n",
            hint: 'ประกาศ price กับ qty แล้ว <code>printf("รวมเป็นเงิน %d บาท", price * qty);</code>',
            xp: 50,
            check: (out, code) => eq(out, "รวมเป็นเงิน 360 บาท") && /#include\s*<stdio\.h>/.test(code) && /\*/.test(code)
          }
        ]
      },
      {
        id: "concept", icon: "🧭", title: "หน่วยที่ 3: แนวคิดในการเขียนโปรแกรม",
        blurb: "ขั้นตอนพัฒนาโปรแกรม 5 ขั้น ซูโดโค้ด โฟลวชาร์ต และตัวอย่างสำคัญประจำหน่วยที่ 3",
        lesson: [
          { h: "ขั้นตอนการพัฒนาโปรแกรม 5 ขั้นตอน", p: "<b>1) วิเคราะห์ปัญหา (Analysis)</b> — แยกให้ออกว่าต้องรับข้อมูลอะไร ใช้ตัวแปรอะไร และผลลัพธ์คืออะไร • <b>2) วางแผนและออกแบบ (Planning & Design)</b> — เขียนขั้นตอนแก้ปัญหาเป็น<b>อัลกอริทึม</b> ในรูปซูโดโค้ดหรือโฟลวชาร์ต • <b>3) เขียนโปรแกรม (Coding)</b> — แปลงอัลกอริทึมเป็นภาษา C ตามหลักไวยากรณ์ • <b>4) ทดสอบโปรแกรม (Testing)</b> — รันหลายๆ ครั้งด้วยข้อมูลต่างกันจนมั่นใจ • <b>5) จัดทำคู่มือ (Documentation)</b> — จดชื่อโปรแกรม ตัวแปร ชนิดข้อมูล และวิธีแก้ปัญหาไว้ให้คนอื่น (และตัวเราในอนาคต) อ่านเข้าใจ — ตัวอย่างประจำหน่วย: โปรแกรมบวกเลข 2 จำนวน วิเคราะห์ได้ตัวแปร x, y และ sum = x + y<br><br><i>หมายเหตุ: หน่วยที่ 3 นี้ตรงกับบทที่ 4 ในหนังสือเรียน — เลขตัวอย่าง/รูป/ตารางในเกมใช้เลขหน่วย (3.x) ส่วนในหนังสือจะเป็น (4.x)</i>" },
          { h: "อัลกอริทึม 2 รูปแบบ: ซูโดโค้ดและโฟลวชาร์ต", p: "<b>ซูโดโค้ด (Pseudocode)</b> คือการเขียนอัลกอริทึมด้วยประโยคง่ายๆ อ่านแล้วเข้าใจทันที • <b>โฟลวชาร์ต (Flowchart)</b> คือการเขียนด้วยสัญลักษณ์รูปภาพ เห็นทางเดินของโปรแกรมชัดเจน — รูปที่ 3.1 เขียนโปรแกรมบวกเลขเป็นซูโดโค้ดได้แบบนี้", code: "START\nREAD X\nREAD Y\nCOMPUTE SUM = X + Y\nPRINT SUM\nSTOP" },
          { h: "สัญลักษณ์โฟลวชาร์ต (ตารางที่ 3.1)", p: 'สัญลักษณ์มาตรฐานที่ใช้ในเกมนี้:<span class="fc-slot" data-flow="legend"></span>ยังมีสัญลักษณ์อื่นอีก เช่น <b>การทำงานย่อย (subprogram)</b> สี่เหลี่ยมมีขีดคู่ด้านข้าง • <b>จุดเชื่อมต่อ (connection)</b> วงกลมเล็ก ใช้เชื่อมผังข้ามหน้า • <b>แสดงผลทางเครื่องพิมพ์ (printer)</b>' },
          { h: "ตัวอย่างสำคัญประจำหน่วย", p: "<b>ตัวอย่างที่ 3.3</b> ตัดเกรดนักศึกษา — ใช้ข้าวหลามตัดต่อกันเป็นบันไดเช็คช่วงคะแนน (≥80 A, 70-79 B, 60-69 C, 50-59 D, ต่ำกว่า 50 F) และวนอ่านจนจบแฟ้มข้อมูล (EOF) • <b>ตัวอย่างที่ 3.4</b> ผลบวกเลขคู่ 1-100 — ใช้ลูปกับสูตร count = count + 2 และ sum = sum + count พร้อม<b>ตารางไล่มือ (trace)</b> ดูค่าทีละรอบ • <b>ตัวอย่างที่ 3.5</b> แปลงปี ค.ศ. เป็น พ.ศ. — แยกงานเป็น<b>โปรแกรมย่อย (subprogram)</b> ชื่อ Convertion ที่คำนวณ BE = CE + 543 (แนวคิดนี้คือฟังก์ชัน ซึ่งจะได้เขียนจริงในหน่วยที่ 10)" },
          { h: "ทดสอบและจัดทำคู่มือ", p: "ข้อควรจำ: ต้อง<b>ทดสอบหลายชุดข้อมูล</b> เช่น 7+8=15, 23+37=60, 51+60=111 จนมั่นใจว่าถูกทุกกรณี — ส่วน<b>คู่มือ</b> (รูปที่ 3.4) ระบุ: ชื่อโปรแกรม, ตัวแปรที่ใช้ (X, Y, SUM), ชนิดของข้อมูล (integer) และวิธีการแก้ปัญหา (ใช้สมการ SUM = X + Y)" }
        ],
        stages: [
          {
            title: "ตามรอยตัวอย่างที่ 3.1",
            desc: "เขียนโปรแกรมแรกของหน่วยนี้: รับเลขจำนวนเต็ม 2 จำนวน หาผลบวก — ครบทั้ง 5 ขั้นตอนในโจทย์เดียว (วิเคราะห์แล้ว: ตัวแปร x, y, sum)",
            goal: 'รับเลข 2 จำนวน แล้วแสดงผลตามรูปแบบนี้: <b>Sum of 7 + 8 is 15</b> (ระบบป้อน "7" และ "8")',
            starter: "// ภารกิจ: รับเลข 2 จำนวน หาผลบวก แสดงแบบ Sum of x + y is ผลรวม\n// อย่าลืม #include และโครง main\n\n",
            hint: '<code>scanf("%d", &x);</code> สองครั้ง แล้ว <code>printf("Sum of %d + %d is %d", x, y, sum);</code>',
            xp: 50,
            stdin: ["7", "8"],
            check: (out, code) => out.includes("Sum of 7 + 8 is 15") && /scanf/.test(code) && /sum/.test(code)
          },
          {
            title: "แปลงซูโดโค้ด (รูปที่ 3.1)",
            desc: "อ่านซูโดโค้ดทีละบรรทัดแล้วแปลงเป็นภาษา C — READ คือ scanf, COMPUTE คือการคำนวณ, PRINT คือ printf",
            goal: 'แปลงซูโดโค้ดนี้เป็นภาษา C:<span class="fc">START\nREAD X\nREAD Y\nCOMPUTE SUM = X + Y\nPRINT SUM\nSTOP</span>(ระบบป้อน "12" และ "30" — ต้องได้ <b>42</b>)',
            starter: "// ภารกิจ: แปลงซูโดโค้ดเป็นภาษา C\n\n",
            hint: 'รับสองค่า บวกกัน แล้ว <code>printf("%d", sum);</code>',
            xp: 50,
            stdin: ["12", "30"],
            check: (out, code) => eq(out, "42") && /scanf/.test(code) && /\+/.test(code)
          },
          {
            title: "ผังงานพื้นที่คางหมู (ตัวอย่างที่ 3.2)",
            desc: "อ่านผังงานสัญลักษณ์แล้วเขียนตาม: สี่เหลี่ยมด้านขนาน = รับ/แสดงข้อมูล สี่เหลี่ยม = คำนวณ — สูตรพื้นที่คางหมู = ½ × ผลบวกด้านคู่ขนาน × สูง",
            goal: 'เขียนโปรแกรม C ตามผังงานนี้:<span class="fc-slot" data-flow="cseq1"></span>(ระบบป้อน w1=4, w2=6, h=3 — ต้องได้ <b>พื้นที่ = 15</b>)',
            starter: "// ภารกิจ: รับ w1, w2, h แล้วคำนวณพื้นที่คางหมูตามผัง\n\n",
            hint: '<code>printf("พื้นที่ = %d", (w1 + w2) * h / 2);</code> — ใส่วงเล็บ (w1+w2) ก่อนคูณ',
            xp: 60,
            stdin: ["4", "6", "3"],
            check: (out, code) => eq(out, "พื้นที่ = 15") && /scanf/.test(code) && /\/\s*2/.test(code)
          },
          {
            title: "ตัดเกรดตามเกณฑ์ (ตัวอย่างที่ 3.3)",
            desc: "จากผังตัดเกรดในบทเรียน (สมชายได้ 73 คะแนน) — เช็คเป็นบันไดจากมากไปน้อย และอย่าลืมเกรด D ด้วย! (พรีวิวคำสั่ง if ที่จะเรียนละเอียดในหน่วยที่ 7)",
            goal: 'กำหนด <b>points = 73</b> ตัดเกรดตามเกณฑ์: ≥80 <b>เกรด A</b> / 70-79 <b>เกรด B</b> / 60-69 <b>เกรด C</b> / 50-59 <b>เกรด D</b> / ต่ำกว่า 50 <b>เกรด F</b> (คำตอบต้องได้ <b>เกรด B</b>)',
            starter: "// ภารกิจ: ตัดเกรดด้วยบันได else if ครบ 5 เกรด\n\nint main() {\n    int points = 73;\n\n    return 0;\n}\n",
            hint: '<code>if (points >= 80) ... else if (points >= 70) ... else if (points >= 60) ... else if (points >= 50) ... else ...</code>',
            xp: 80,
            check: (out, code) => eq(out, "เกรด B") && (code.match(/else\s+if/g) || []).length >= 3 && /เกรด D/.test(code)
          },
          {
            title: "ไล่มือผลบวกเลขคู่ (ตัวอย่างที่ 3.4)",
            desc: "ผังลูปสะสมค่าจากบทเรียน (ย่อเหลือ 1 ถึง 10) — ไล่มือตามตาราง: count 2,4,6,8,10 / sum 2,6,12,20,30 แล้วเขียนโค้ดให้ได้ตามผัง",
            goal: 'เขียนโปรแกรม C ตามผังงานนี้:<span class="fc-slot" data-flow="clp1"></span>(ต้องได้ <b>ผลบวกเลขคู่ = 30</b>)',
            starter: "// ภารกิจ: ลูปสะสมค่าตามผัง count = count + 2, sum = sum + count\n\n",
            hint: '<code>while (count < 10) { count = count + 2; sum = sum + count; }</code> จบลูปค่อย printf',
            xp: 80,
            check: (out, code) => eq(out, "ผลบวกเลขคู่ = 30") && (/while\s*\(/.test(code) || /for\s*\(/.test(code))
          },
          {
            title: "แปลง ค.ศ. เป็น พ.ศ. (ตัวอย่างที่ 3.5)",
            desc: "ผังในบทเรียนแยกงานคำนวณเป็นโปรแกรมย่อย Convertion (BE = CE + 543) — ตอนนี้เขียนรวมใน main ก่อน แล้วหน่วยที่ 10 จะได้แยกเป็นฟังก์ชันจริง",
            goal: 'เขียนโปรแกรม C ตามผังงานนี้:<span class="fc-slot" data-flow="cseq2"></span>(ระบบป้อน "2026" — ต้องได้ <b>พ.ศ. 2569</b>)',
            starter: "// ภารกิจ: รับปี ค.ศ. บวก 543 เป็น พ.ศ.\n\n",
            hint: '<code>be = ce + 543;</code> แล้ว <code>printf("พ.ศ. %d", be);</code>',
            xp: 60,
            stdin: ["2026"],
            check: (out, code) => eq(out, "พ.ศ. 2569") && /543/.test(code) && /scanf/.test(code)
          },
          {
            title: "แบบฝึกหัดท้ายหน่วย: คู่หรือคี่",
            desc: "โจทย์ท้ายหน่วย: ตรวจสอบตัวเลขด้วย Modulo (%) — หารด้วย 2 แล้วเหลือเศษ 0 คือเลขคู่ ตามหลักการหารเอาเศษ",
            goal: 'รับตัวเลขหนึ่งค่า ถ้าหาร 2 ลงตัวแสดง <b>เลขคู่</b> ไม่งั้นแสดง <b>เลขคี่</b> (ระบบป้อน "8")',
            starter: "// ภารกิจ: รับเลข ตรวจคู่/คี่ ด้วย % 2\n\n",
            hint: '<code>if (n % 2 == 0) { printf("เลขคู่"); } else { printf("เลขคี่"); }</code>',
            xp: 60,
            stdin: ["8"],
            check: (out, code) => eq(out, "เลขคู่") && /%\s*2/.test(code) && /scanf/.test(code)
          },
          {
            title: "แบบฝึกหัดท้ายหน่วย: ผลบวก 1 ถึง 50",
            desc: "โจทย์ท้ายหน่วยอีกข้อ: หาผลบวกของเลขจำนวนเต็ม 1 ถึง 50 — ใช้ลูปกับตัวแปรสะสมแบบเดียวกับตัวอย่างที่ 3.4",
            goal: 'วนบวกเลข 1 ถึง 50 แล้วแสดง <b>ผลรวม = 1275</b>',
            starter: "// ภารกิจ: ลูปสะสมค่า 1 ถึง 50\n\n",
            hint: '<code>for (int i = 1; i <= 50; i++) { sum = sum + i; }</code>',
            xp: 80,
            check: (out, code) => eq(out, "ผลรวม = 1275") && (/for\s*\(/.test(code) || /while\s*\(/.test(code))
          }
        ]
      },
      {
        id: "ctypes", icon: "📦", title: "หน่วยที่ 4: ตัวแปรกับชนิดของข้อมูล",
        blurb: "int, float, double, char และรหัสรูปแบบ %d %f %c — เลือกชนิดให้ถูกกับงาน",
        lesson: [
          { h: "4 ชนิดข้อมูลหลัก", p: "<b>int</b> จำนวนเต็ม • <b>float / double</b> ทศนิยม (double ละเอียดกว่า) • <b>char</b> ตัวอักษรตัวเดียวในเครื่องหมาย ' ' — ประกาศ: ชนิด ชื่อ = ค่า;", code: "int age = 15;\nfloat price = 19.5;\nchar grade = 'A';" },
          { h: "รหัสรูปแบบใน printf", p: "<b>%d</b> = int • <b>%f</b> = float/double (ปกติ 6 ตำแหน่ง ใช้ <b>%.2f</b> คุมเหลือ 2 ตำแหน่ง) • <b>%c</b> = char • <b>%s</b> = ข้อความ", code: "printf(\"อายุ %d ปี\", age);\nprintf(\"ราคา %.2f บาท\", price);" },
          { h: "กับดักการหารจำนวนเต็ม", p: "int หาร int ได้ int เสมอ — เศษถูกตัดทิ้ง! เช่น 7 / 2 = 3 ไม่ใช่ 3.5 ต้องแปลงชนิด (casting) ด้วย (float) ก่อน", code: "int a = 7, b = 2;\nprintf(\"%.1f\", (float)a / b);  // 3.5" }
        ],
        stages: [
          {
            title: "จำนวนเต็มกับ %d",
            desc: "ประกาศตัวแปร int แล้วแสดงผลด้วยรหัส %d ในตำแหน่งที่อยากให้ค่าปรากฏ",
            goal: 'ประกาศ <b>int age = 15</b> แล้วแสดง <b>อายุ 15 ปี</b> ด้วย %d',
            starter: "int main() {\n\n    return 0;\n}\n",
            hint: '<code>int age = 15;</code> แล้ว <code>printf("อายุ %d ปี", age);</code>',
            xp: 40,
            check: (out, code) => eq(out, "อายุ 15 ปี") && /%d/.test(code) && /int\s+age/.test(code)
          },
          {
            title: "ทศนิยมกับ %.2f",
            desc: "%f เฉยๆ จะได้ทศนิยม 6 ตำแหน่ง (19.500000) — ใช้ %.2f เพื่อคุมให้เหลือ 2 ตำแหน่งแบบราคาสินค้า",
            goal: 'ประกาศ <b>float price = 19.5</b> แล้วแสดง <b>ราคา 19.50 บาท</b>',
            starter: "int main() {\n    float price = 19.5;\n\n    return 0;\n}\n",
            hint: '<code>printf("ราคา %.2f บาท", price);</code>',
            xp: 50,
            check: (out, code) => eq(out, "ราคา 19.50 บาท") && /%\.2f/.test(code)
          },
          {
            title: "ตัวอักษรกับ %c",
            desc: "char เก็บตัวอักษรตัวเดียวในเครื่องหมายคำพูดเดี่ยว ' ' และแสดงผลด้วย %c",
            goal: "ประกาศ <b>char grade = 'A'</b> แล้วแสดง <b>ได้เกรด A</b>",
            starter: "int main() {\n\n    return 0;\n}\n",
            hint: "<code>char grade = 'A';</code> แล้ว <code>printf(\"ได้เกรด %c\", grade);</code>",
            xp: 50,
            check: (out, code) => eq(out, "ได้เกรด A") && /%c/.test(code) && /'A'/.test(code)
          },
          {
            title: "หลายค่าใน printf เดียว",
            desc: "printf รับหลายค่าได้ — รหัส % ตัวแรกจับคู่ค่าแรก ตัวสองจับคู่ค่าสอง เรียงตามลำดับ",
            goal: 'กำหนด <b>w = 7</b>, <b>h = 4</b> แล้วใช้ printf เดียวแสดง <b>กว้าง 7 สูง 4 พื้นที่ 28</b>',
            starter: "int main() {\n    int w = 7;\n    int h = 4;\n\n    return 0;\n}\n",
            hint: '<code>printf("กว้าง %d สูง %d พื้นที่ %d", w, h, w * h);</code>',
            xp: 50,
            check: (out, code) => eq(out, "กว้าง 7 สูง 4 พื้นที่ 28") && (code.match(/%d/g) || []).length >= 3
          },
          {
            title: "casting แก้หารเศษหาย",
            desc: "7/2 ใน C ได้ 3 เพราะ int หาร int! ใส่ (float) หน้าตัวใดตัวหนึ่งเพื่อบังคับให้คิดแบบทศนิยม",
            goal: 'กำหนด <b>a = 7</b>, <b>b = 2</b> แสดง 2 บรรทัด: ผลหารแบบ int (<b>3</b>) และแบบ casting เป็น float ทศนิยม 1 ตำแหน่ง (<b>3.5</b>)',
            starter: "int main() {\n    int a = 7;\n    int b = 2;\n    printf(\"%d\\n\", a / b);\n    // บรรทัดสอง: casting เป็น float\n\n    return 0;\n}\n",
            hint: '<code>printf("%.1f", (float)a / b);</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "3" && l[1] === "3.5" && /\(float\)/.test(code); }
          },
          {
            title: "ค่าคงที่ด้วย const",
            desc: "ค่าที่ไม่ควรเปลี่ยน (เช่น ค่า Pi, อัตราภาษี) ประกาศด้วย const กันแก้พลาด — ลองแก้แล้วคอมไพเลอร์จะฟ้อง",
            goal: 'ประกาศ <b>const float PI = 3.14</b> คำนวณเส้นรอบวงของรัศมี 10 (2 × PI × r) แสดง <b>เส้นรอบวง = 62.80</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\n",
            hint: '<code>const float PI = 3.14;</code> แล้ว <code>printf("เส้นรอบวง = %.2f", 2 * PI * 10);</code>',
            xp: 60,
            check: (out, code) => eq(out, "เส้นรอบวง = 62.80") && /const/.test(code)
          },
          {
            title: "char เป็นตัวเลขได้ด้วย",
            desc: "ความลับของ char: จริงๆ มันคือตัวเลข (รหัส ASCII) — 'A' มีค่าเท่ากับ 65 พิมพ์ด้วย %d เห็นตัวเลข พิมพ์ด้วย %c เห็นตัวอักษร",
            goal: "ประกาศ <b>char c = 'A'</b> แล้วแสดงรหัส ASCII ของมันในรูปแบบ <b>A มีรหัส 65</b>",
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\n",
            hint: "<code>printf(\"%c มีรหัส %d\", c, c);</code> — ตัวแปรเดียวแสดงได้สองแบบ",
            xp: 60,
            check: (out, code) => eq(out, "A มีรหัส 65") && /%c/.test(code) && /%d/.test(code)
          }
        ]
      },
      {
        id: "coper", icon: "➗", title: "หน่วยที่ 5: โอเปอเรเตอร์และการดำเนินการ",
        blurb: "เลขคณิต หารเอาเศษ ++/-- และตรรกะแบบ C ที่คำตอบคือ 1 กับ 0",
        lesson: [
          { h: "เลขคณิต + - * / %", p: "เหมือนคณิตศาสตร์ แต่จำไว้: <b>int / int ได้ int</b> (17/5 = 3) และ <b>%</b> คือหารเอาเศษ (17%5 = 2) — คู่นี้ออกข้อสอบทุกปี" },
          { h: "++ และ --", p: "<b>x++</b> เพิ่ม 1, <b>x--</b> ลด 1 • ตำแหน่งสำคัญ: <b>++x</b> เพิ่มก่อนแล้วค่อยใช้ค่า ส่วน <b>x++</b> ใช้ค่าเดิมก่อนแล้วค่อยเพิ่ม", code: "int x = 5;\nprintf(\"%d\", ++x);  // 6\nprintf(\"%d\", x++);  // 6 (หลังบรรทัดนี้ x = 7)" },
          { h: "เปรียบเทียบและตรรกะได้ 1/0", p: "C ไม่มีค่า True/False — ผลเปรียบเทียบคือ <b>1</b> (จริง) กับ <b>0</b> (เท็จ) • <b>&&</b> และ • <b>||</b> หรือ • <b>!</b> ไม่", code: "printf(\"%d\", 10 > 7);   // 1\nprintf(\"%d\", 1 && 0);   // 0" }
        ],
        stages: [
          {
            title: "ครบสี่ตัวดำเนินการ",
            desc: "ลองเลขคณิตพื้นฐานทั้งสี่ — ดูผลการหารให้ดี 17/5 ใน C ไม่ได้ 3.4 นะ!",
            goal: 'กำหนด <b>a = 17</b>, <b>b = 5</b> แสดงผล a+b, a-b, a*b, a/b บรรทัดละค่า (ต้องได้ <b>22, 12, 85, 3</b>)',
            starter: "int main() {\n    int a = 17;\n    int b = 5;\n    printf(\"%d\\n\", a + b);\n\n    return 0;\n}\n",
            hint: 'เพิ่มอีก 3 บรรทัดตามแบบ — บรรทัดสุดท้าย <code>printf("%d\\n", a / b);</code> จะได้ 3 เพราะ int หาร int',
            xp: 40,
            check: (out) => { const l = lines(out); return l.join(",") === "22,12,85,3"; }
          },
          {
            title: "หารเอาเศษ %",
            desc: "% ให้เศษจากการหาร — ใช้เช็คเลขคู่คี่ วนรอบ แจกของ สารพัดประโยชน์ (ใน printf ถ้าอยากพิมพ์เครื่องหมาย % ต้องเขียน %%)",
            goal: 'แสดงเศษจากการหาร <b>17 % 5</b> ในรูปแบบ <b>เศษ = 2</b>',
            starter: "int main() {\n\n    return 0;\n}\n",
            hint: '<code>printf("เศษ = %d", 17 % 5);</code>',
            xp: 40,
            check: (out, code) => eq(out, "เศษ = 2") && /17\s*%\s*5/.test(code)
          },
          {
            title: "เพิ่มลดด้วย ++ และ --",
            desc: "x++ กับ x-- คือทางลัดเพิ่ม/ลดทีละ 1 ที่เจอทุกลูปในโลก C",
            goal: 'กำหนด <b>x = 5</b> ใช้ <b>x++</b> แล้วแสดงค่า จากนั้นใช้ <b>x--</b> สองครั้ง แล้วแสดงค่า (ต้องได้ <b>6</b> และ <b>4</b>)',
            starter: "int main() {\n    int x = 5;\n    x++;\n    printf(\"%d\\n\", x);\n    // ลดสองครั้ง แล้วแสดงผล\n\n    return 0;\n}\n",
            hint: '<code>x--;</code> สองบรรทัด แล้ว <code>printf("%d\\n", x);</code>',
            xp: 50,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "6" && l[1] === "4" && /\+\+/.test(code) && /--/.test(code); }
          },
          {
            title: "++x ต่างกับ x++ ยังไง",
            desc: "โจทย์วัดความเข้าใจสุดฮิต: ++x เพิ่มก่อนใช้ / x++ ใช้ก่อนเพิ่ม — ไล่มือให้ดีก่อนรัน",
            goal: 'กำหนด <b>x = 5</b> แสดง 3 บรรทัด: ค่า <b>++x</b>, ค่า <b>x++</b>, แล้วค่า <b>x</b> (ต้องได้ <b>6, 6, 7</b>)',
            starter: "int main() {\n    int x = 5;\n    printf(\"%d\\n\", ++x);\n\n    return 0;\n}\n",
            hint: 'ต่อด้วย <code>printf("%d\\n", x++);</code> และ <code>printf("%d\\n", x);</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.join(",") === "6,6,7" && /\+\+x/.test(code) && /x\+\+/.test(code); }
          },
          {
            title: "ตรรกะแบบ C: 1 กับ 0",
            desc: "C ตอบจริง/เท็จเป็นตัวเลข: 1 คือจริง 0 คือเท็จ — พิมพ์ผลเปรียบเทียบออกมาดูเลย",
            goal: 'แสดงผล 4 บรรทัด: <b>10 > 7</b>, <b>5 == 3</b>, <b>1 && 0</b>, <b>1 || 0</b> (ต้องได้ <b>1, 0, 0, 1</b>)',
            starter: "int main() {\n    printf(\"%d\\n\", 10 > 7);\n\n    return 0;\n}\n",
            hint: 'อีก 3 บรรทัด: <code>5 == 3</code>, <code>1 && 0</code>, <code>1 || 0</code> ใน printf แบบเดียวกัน',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,0,0,1" && /&&/.test(code) && /\|\|/.test(code); }
          },
          {
            title: "ตัวดำเนินการย่อ +=",
            desc: "ทางลัดสุดนิยม: x += 5 เท่ากับ x = x + 5 — มี -= *= /= %= ครบ ใช้ทุกวันในงานจริง",
            goal: 'เริ่ม <b>gold = 100</b> ใช้ <b>+=</b> เพิ่ม 50 แล้ว <b>-=</b> ลด 30 แล้ว <b>*=</b> คูณ 2 แสดง <b>gold = 240</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int gold = 100;\n\n    return 0;\n}\n",
            hint: '<code>gold += 50;</code> → <code>gold -= 30;</code> → <code>gold *= 2;</code>',
            xp: 50,
            check: (out, code) => eq(out, "gold = 240") && /\+=/.test(code) && /\*=/.test(code)
          },
          {
            title: "ทางเลือกด่วน ternary",
            desc: "ตัวดำเนินการ 3 ส่วน (เงื่อนไข ? ค่าจริง : ค่าเท็จ) เขียน if แบบสั้นในบรรทัดเดียว — เจอบ่อยในโค้ดมืออาชีพ",
            goal: 'มี <b>score = 45</b> ใช้ ternary เลือกข้อความ: ≥50 ได้ <b>ผ่าน</b> ไม่งั้น <b>ตก</b> แล้วแสดงผล (ต้องได้ <b>ตก</b>)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int score = 45;\n\n    return 0;\n}\n",
            hint: '<code>printf("%s", score >= 50 ? "ผ่าน" : "ตก");</code>',
            xp: 60,
            check: (out, code) => eq(out, "ตก") && /\?/.test(code) && /:/.test(code)
          }
        ]
      },
      {
        id: "cio", icon: "⌨️", title: "หน่วยที่ 6: การรับและแสดงผลข้อมูล",
        blurb: "scanf คู่หูของ printf — รับข้อมูลจากผู้ใช้ด้วย %d %f %c %s และเครื่องหมาย &",
        lesson: [
          { h: "scanf — รับข้อมูลเข้าโปรแกรม", p: "รูปแบบเหมือน printf แต่ต้องส่ง <b>ที่อยู่</b> ของตัวแปรด้วยเครื่องหมาย <b>&</b> เสมอ (ลืม & คือบั๊กยอดฮิตอันดับหนึ่งของ scanf)", code: "int x;\nscanf(\"%d\", &x);\nprintf(\"ได้ค่า %d\", x);" },
          { h: "ทำไมต้องมี &", p: "scanf ต้องรู้ว่าจะเอาค่าไปวางไว้ <b>ตรงไหน</b> ในหน่วยความจำ — & อ่านว่า \"ที่อยู่ของ\" (จะเข้าใจลึกสุดๆ ในหน่วยพอยน์เตอร์) ข้อยกเว้นเดียวคือชื่ออาร์เรย์ char สำหรับ %s ซึ่งเป็นที่อยู่อยู่แล้ว จึงไม่ต้องใส่ &" },
          { h: "รับได้ทุกชนิด", p: "<b>%d</b> จำนวนเต็ม • <b>%f</b> ทศนิยม (float) • <b>%c</b> ตัวอักษร • <b>%s</b> ข้อความ (หยุดที่ช่องว่าง) — ในเกมนี้ระบบจะป้อนค่าให้ตามกล่อง ⌨️ หรือกดปุ่ม \"⌨ ป้อนเอง\" เพื่อพิมพ์ค่าจริงด้วยตัวเอง" }
        ],
        stages: [
          {
            title: "scanf ครั้งแรก",
            desc: "รับจำนวนเต็มด้วย scanf(\"%d\", &x) — สังเกตเครื่องหมาย & หน้าตัวแปร ลืมเมื่อไหร่โปรแกรมพังเมื่อนั้น",
            goal: 'รับตัวเลขหนึ่งค่า แล้วแสดง <b>คุณพิมพ์ 7</b> (ระบบป้อน "7")',
            starter: "int main() {\n    int x;\n    scanf(\"%d\", &x);\n\n    return 0;\n}\n",
            hint: '<code>printf("คุณพิมพ์ %d", x);</code>',
            xp: 50,
            stdin: ["7"],
            check: (out, code) => eq(out, "คุณพิมพ์ 7") && /scanf/.test(code) && /&\s*x/.test(code)
          },
          {
            title: "รับสองค่ามาบวกกัน",
            desc: "scanf รับหลายค่าได้ในครั้งเดียว scanf(\"%d %d\", &a, &b) หรือจะเรียกสองครั้งก็ได้ผลเหมือนกัน",
            goal: 'รับจำนวนเต็ม 2 ค่า แล้วแสดง <b>รวม = 42</b> (ระบบป้อน "12" และ "30")',
            starter: "int main() {\n    int a, b;\n\n    return 0;\n}\n",
            hint: '<code>scanf("%d %d", &a, &b);</code> แล้ว <code>printf("รวม = %d", a + b);</code>',
            xp: 50,
            stdin: ["12", "30"],
            check: (out, code) => eq(out, "รวม = 42") && /&\s*a/.test(code) && /&\s*b/.test(code)
          },
          {
            title: "รับทศนิยมด้วย %f",
            desc: "รับ float ใช้ %f ใน scanf และแสดงผลแบบเงินด้วย %.2f ใน printf",
            goal: 'รับราคาสินค้า (float) แล้วแสดง <b>จ่าย 19.50 บาท</b> (ระบบป้อน "19.5")',
            starter: "int main() {\n    float price;\n\n    return 0;\n}\n",
            hint: '<code>scanf("%f", &price);</code> แล้ว <code>printf("จ่าย %.2f บาท", price);</code>',
            xp: 60,
            stdin: ["19.5"],
            check: (out, code) => eq(out, "จ่าย 19.50 บาท") && /scanf/.test(code) && /%\.2f/.test(code)
          },
          {
            title: "รับตัวอักษรด้วย %c",
            desc: "รับตัวอักษรตัวเดียวด้วย %c — เก็บในตัวแปร char",
            goal: 'รับเกรดหนึ่งตัวอักษร แล้วแสดง <b>ได้เกรด B</b> (ระบบป้อน "B")',
            starter: "int main() {\n    char grade;\n\n    return 0;\n}\n",
            hint: '<code>scanf("%c", &grade);</code> แล้ว <code>printf("ได้เกรด %c", grade);</code>',
            xp: 60,
            stdin: ["B"],
            check: (out, code) => eq(out, "ได้เกรด B") && /%c/.test(code)
          },
          {
            title: "รับข้อความด้วย %s",
            desc: "ข้อความใน C คืออาร์เรย์ของ char — ประกาศ char name[20] แล้วรับด้วย %s (ชื่ออาร์เรย์ไม่ต้องใส่ & เพราะเป็นที่อยู่อยู่แล้ว)",
            goal: 'รับชื่อผู้เล่น แล้วแสดง <b>สวัสดี Mali</b> (ระบบป้อน "Mali")',
            starter: "int main() {\n    char name[20];\n\n    return 0;\n}\n",
            hint: '<code>scanf("%s", name);</code> แล้ว <code>printf("สวัสดี %s", name);</code>',
            xp: 80,
            stdin: ["Mali"],
            check: (out, code) => eq(out, "สวัสดี Mali") && /char\s+\w+\s*\[/.test(code) && /%s/.test(code)
          },
          {
            title: "รับแล้วคำนวณ",
            desc: "รวม scanf กับการคำนวณ: รับสองค่ามาแล้วประมวลผลต่อ — หัวใจของโปรแกรมโต้ตอบทุกตัว",
            goal: 'รับความกว้างและความยาว (จำนวนเต็ม) แล้วแสดงพื้นที่ <b>พื้นที่ = 24</b> (ระบบป้อน "4" และ "6")',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int w, h;\n\n    return 0;\n}\n",
            hint: '<code>scanf("%d %d", &w, &h);</code> แล้ว <code>printf("พื้นที่ = %d", w * h);</code>',
            xp: 60,
            stdin: ["4", "6"],
            check: (out, code) => eq(out, "พื้นที่ = 24") && /scanf/.test(code) && /\*/.test(code)
          },
          {
            title: "เมนูโต้ตอบด้วย scanf + if",
            desc: "รับตัวเลือกจากผู้ใช้แล้วตัดสินใจ — จำลองเมนูโปรแกรมจริง (รับค่า → เช็คเงื่อนไข → ตอบสนอง)",
            goal: 'รับหมายเลขเมนู ถ้าเป็น <b>1</b> แสดง <b>คุณเลือกเริ่มเกม</b> ไม่งั้นแสดง <b>ออกจากโปรแกรม</b> (ระบบป้อน "1")',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int choice;\n\n    return 0;\n}\n",
            hint: '<code>scanf("%d", &choice);</code> แล้ว <code>if (choice == 1) { ... } else { ... }</code>',
            xp: 80,
            stdin: ["1"],
            check: (out, code) => eq(out, "คุณเลือกเริ่มเกม") && /scanf/.test(code) && /if\s*\(/.test(code)
          },
          {
            title: "พิมพ์เครื่องหมาย % ด้วย %%",
            desc: "รหัสรูปแบบใช้ % นำหน้า — ถ้าอยากแสดงเครื่องหมาย % จริงๆ ต้องพิมพ์ %% ซ้อนกัน เป็นกับดักยอดฮิตเวลาแสดงเปอร์เซ็นต์",
            goal: 'ประกาศ <b>int p = 50</b> แล้วแสดง <b>ความคืบหน้า 50%</b> (มีเครื่องหมาย % หนึ่งตัว)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int p = 50;\n\n    return 0;\n}\n",
            hint: '<code>printf("ความคืบหน้า %d%%", p);</code>',
            xp: 50,
            check: (out, code) => eq(out, "ความคืบหน้า 50%") && /%%/.test(code)
          }
        ]
      },
      {
        id: "cctrl", icon: "🚦", title: "หน่วยที่ 7: คำสั่งควบคุม",
        blurb: "if/else, switch-case และลูป for/while — สอนโปรแกรมให้ตัดสินใจและทำซ้ำ",
        lesson: [
          { h: "if / else if / else", p: "เงื่อนไขอยู่ในวงเล็บ ( ) และบล็อกคำสั่งอยู่ในปีกกา { } — เช็คจากบนลงล่าง เข้าทางแรกที่เป็นจริง", code: "if (score >= 50) {\n    printf(\"ผ่าน\");\n} else {\n    printf(\"ไม่ผ่าน\");\n}" },
          { h: "switch-case", p: "เลือกทางตามค่าที่แน่นอน (เมนู ตัวเลือก ระดับ) — <b>อย่าลืม break;</b> ท้ายแต่ละ case ไม่งั้นจะไหลทะลุลงไปทำ case ถัดไปด้วย", code: "switch (menu) {\n    case 1: printf(\"กาแฟ\"); break;\n    case 2: printf(\"ชาเย็น\"); break;\n    default: printf(\"น้ำเปล่า\");\n}" },
          { h: "ลูป for / while / do-while", p: "<b>for</b>(เริ่ม; เงื่อนไข; อัปเดต) เหมาะกับรู้จำนวนรอบ • <b>while</b> เช็คก่อนทำ • <b>do-while</b> ทำก่อนเช็ค (ได้อย่างน้อย 1 รอบเสมอ)", code: "for (int i = 1; i <= 5; i++) {\n    printf(\"%d\\n\", i);\n}" }
        ],
        stages: [
          {
            title: "ประตู if/else",
            desc: "เงื่อนไขแรกของคุณในภาษา C — วงเล็บครอบเงื่อนไข ปีกกาครอบคำสั่ง",
            goal: 'กำหนด <b>score = 75</b> ถ้า ≥ 50 แสดง <b>ผ่าน</b> ไม่งั้นแสดง <b>ไม่ผ่าน</b>',
            starter: "int main() {\n    int score = 75;\n\n    return 0;\n}\n",
            hint: '<code>if (score >= 50) { printf("ผ่าน"); } else { printf("ไม่ผ่าน"); }</code>',
            xp: 50,
            check: (out, code) => eq(out, "ผ่าน") && /if\s*\(/.test(code) && /else/.test(code)
          },
          {
            title: "บันไดเกรด else if",
            desc: "หลายช่วงคะแนนใช้ else if ต่อกันเป็นบันได — เช็คจากมากไปน้อยเสมอ",
            goal: 'กำหนด <b>score = 75</b>: ≥80 <b>เกรด A</b> / ≥70 <b>เกรด B</b> / ≥60 <b>เกรด C</b> / นอกนั้น <b>เกรด F</b> (คำตอบต้องได้ <b>เกรด B</b>)',
            starter: "int main() {\n    int score = 75;\n\n    return 0;\n}\n",
            hint: '<code>if (score >= 80) ... else if (score >= 70) ... else if (score >= 60) ... else ...</code>',
            xp: 60,
            check: (out, code) => eq(out, "เกรด B") && /else\s+if/.test(code)
          },
          {
            title: "เมนูเครื่องดื่ม switch",
            desc: "ค่าตายตัวหลายทางเลือก = งานของ switch — จบทุก case ด้วย break; ไม่งั้นไหลทะลุ!",
            goal: 'กำหนด <b>menu = 2</b> ใช้ switch: 1 = <b>กาแฟ</b>, 2 = <b>ชาเย็น</b>, 3 = <b>โกโก้</b>, อื่นๆ = <b>น้ำเปล่า</b> (คำตอบต้องได้ <b>ชาเย็น</b>)',
            starter: "int main() {\n    int menu = 2;\n\n    return 0;\n}\n",
            hint: '<code>switch (menu) { case 1: printf("กาแฟ"); break; case 2: ... default: ... }</code>',
            xp: 60,
            check: (out, code) => eq(out, "ชาเย็น") && /switch\s*\(/.test(code) && /break/.test(code)
          },
          {
            title: "ลูป for นับรอบ",
            desc: "for ของ C รวมสามอย่างในบรรทัดเดียว: ค่าเริ่ม เงื่อนไข และการอัปเดต — จำโครง for (int i = 1; i <= n; i++) ให้ขึ้นใจ",
            goal: 'ใช้ for แสดง <b>รอบที่ 1</b> ถึง <b>รอบที่ 5</b> (บรรทัดละรอบ)',
            starter: "int main() {\n\n    return 0;\n}\n",
            hint: '<code>for (int i = 1; i <= 5; i++) { printf("รอบที่ %d\\n", i); }</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.length === 5 && l.every((s, i) => s === "รอบที่ " + (i + 1)) && /for\s*\(/.test(code); }
          },
          {
            title: "while นับถอยหลัง",
            desc: "while วนตราบใดที่เงื่อนไขจริง — ต้องมีบรรทัดลดค่าข้างใน ไม่งั้นวนไม่จบ",
            goal: 'ใช้ <b>while</b> นับถอยหลัง <b>3, 2, 1</b> (บรรทัดละเลข) ปิดท้ายด้วย <b>เริ่ม!</b>',
            starter: "int main() {\n    int n = 3;\n\n    printf(\"เริ่ม!\");\n    return 0;\n}\n",
            hint: '<code>while (n > 0) { printf("%d\\n", n); n--; }</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.join(",") === "3,2,1,เริ่ม!" && /while\s*\(/.test(code); }
          },
          {
            title: "for + if กรองเลขคู่",
            desc: "รวมพลังลูปกับเงื่อนไข: วน 1 ถึง 10 แล้วเลือกพิมพ์เฉพาะตัวที่หาร 2 ลงตัว",
            goal: 'แสดงเฉพาะ<b>เลขคู่</b>ตั้งแต่ 1 ถึง 10 (ต้องได้ 2, 4, 6, 8, 10 บรรทัดละเลข)',
            starter: "int main() {\n    for (int i = 1; i <= 10; i++) {\n        // พิมพ์เฉพาะเลขคู่\n    }\n    return 0;\n}\n",
            hint: 'ในลูป: <code>if (i % 2 == 0) { printf("%d\\n", i); }</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "2,4,6,8,10" && /for\s*\(/.test(code) && /%\s*2/.test(code); }
          },
          {
            title: "ผังงานเงื่อนไขแบบ C",
            desc: "ข้าวหลามตัดหนึ่งลูก = if หนึ่งตัว — ตามเส้น ใช่/ไม่ ให้ถูกทาง แล้วเขียน if/else ภาษา C ตามผัง",
            goal: 'เขียนโปรแกรม C ตามผังงานนี้:<span class="fc-slot" data-flow="cbr0"></span>',
            starter: "// ภารกิจ: แปลงผังงานเงื่อนไขเป็นภาษา C\n\n",
            hint: '<code>int hp = 30;</code> แล้ว <code>if (hp > 0) { ... } else { ... }</code> — hp เป็น 30 ซึ่งมากกว่า 0',
            xp: 80,
            check: (out, code) => eq(out, "สู้ต่อ") && /if\s*\(/.test(code) && /else/.test(code)
          },
          {
            title: "ผังงานลูปแบบ C",
            desc: "เส้นที่วนกลับขึ้นไป = ลูป — ไล่มือค่า i ทุกรอบ: เช็คเงื่อนไข พิมพ์ เพิ่มค่า วนกลับ จนเงื่อนไขเป็นเท็จแล้วออกทางซ้าย",
            goal: 'เขียนโปรแกรม C ตามผังงานนี้:<span class="fc-slot" data-flow="clp0"></span>(ผลลัพธ์: 1 ถึง 4 บรรทัดละเลข ปิดท้ายด้วย <b>จบลูป</b>)',
            starter: "// ภารกิจ: แปลงผังงานลูปเป็นภาษา C\n\n",
            hint: 'ใช้ <code>while (i <= 4)</code> หรือ for ก็ได้ — ในลูปพิมพ์ i แล้วเพิ่มค่า จบลูปค่อยพิมพ์ "จบลูป"',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,2,3,4,จบลูป" && (/while\s*\(/.test(code) || /for\s*\(/.test(code)); }
          },
          {
            title: "ลูปซ้อนลูป: ตารางสูตรคูณ",
            desc: "ลูปซ้อนลูป (nested loop) คือหัวใจของตาราง กราฟิก และเกม — ลูปนอกคุมแถว ลูปในคุมหลัก",
            goal: 'ใช้ลูปซ้อนพิมพ์สูตรคูณแม่ 2: <b>2 x 1 = 2</b> ถึง <b>2 x 3 = 6</b> (3 บรรทัด)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\n",
            hint: '<code>for (int i = 1; i <= 3; i++) { printf("2 x %d = %d\\n", i, 2 * i); }</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.length === 3 && l[0] === "2 x 1 = 2" && l[1] === "2 x 2 = 4" && l[2] === "2 x 3 = 6" && /for\s*\(/.test(code); }
          },
          {
            title: "do-while ทำก่อนเช็ค",
            desc: "do-while ต่างจาก while ตรงที่ทำงานก่อนอย่างน้อย 1 รอบเสมอ แล้วค่อยเช็คเงื่อนไข — เหมาะกับเมนูที่ต้องแสดงอย่างน้อยครั้งเดียว",
            goal: 'ใช้ <b>do-while</b> พิมพ์ <b>1, 2, 3</b> (บรรทัดละเลข) โดยเริ่มจาก n=1 วนจนถึง 3',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int n = 1;\n\n    return 0;\n}\n",
            hint: '<code>do { printf("%d\\n", n); n++; } while (n <= 3);</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,2,3" && /do\s*\{/.test(code) && /while\s*\(/.test(code); }
          }
        ]
      },
      {
        id: "carray", icon: "🗂️", title: "หน่วยที่ 8: อาร์เรย์",
        blurb: "ตู้ล็อกเกอร์หลายช่องในชื่อเดียว — ประกาศ เข้าถึง แก้ไข และวนลูปให้คล่อง",
        lesson: [
          { h: "อาร์เรย์คืออะไร", p: "ตัวแปรหลายช่องเรียงติดกันภายใต้ชื่อเดียว ประกาศพร้อมขนาด และ<b>ช่องแรกคือ [0]</b> เสมอ", code: "int items[3] = {10, 20, 30};\nprintf(\"%d\", items[0]);  // 10\nitems[1] = 99;           // แก้ค่าช่องที่สอง" },
          { h: "เพื่อนแท้ชื่อ for", p: "อาร์เรย์กับ for คือคู่หูตลอดกาล — วนดัชนีจาก 0 ถึง ขนาด-1", code: "for (int i = 0; i < 3; i++) {\n    printf(\"%d\\n\", items[i]);\n}" },
          { h: "C ไม่เช็คขอบเขตให้!", p: "items[99] คอมไพล์ผ่านเฉยเลยแต่พฤติกรรมพังไม่แน่นอน (ต่างจาก Python ที่ฟ้อง IndexError) — เช็คดัชนีเองเสมอ นี่คือทั้งพลังและอันตรายของ C" }
        ],
        stages: [
          {
            title: "ล็อกเกอร์ช่องแรก",
            desc: "ประกาศอาร์เรย์พร้อมค่าเริ่มต้นใน { } แล้วหยิบของด้วยเลขช่อง — เริ่มนับจาก 0!",
            goal: 'ประกาศ <b>int items[3] = {10, 20, 30}</b> แล้วแสดงค่า<b>ช่องแรก</b> (ต้องได้ <b>10</b>)',
            starter: "int main() {\n    int items[3] = {10, 20, 30};\n\n    return 0;\n}\n",
            hint: '<code>printf("%d", items[0]);</code>',
            xp: 50,
            check: (out, code) => eq(out, "10") && /\[0\]/.test(code)
          },
          {
            title: "เปลี่ยนของในช่อง",
            desc: "กำหนดค่าใหม่ให้ช่องไหนก็ได้ตรงๆ เช่น items[1] = 99;",
            goal: 'เปลี่ยนค่า<b>ช่องที่สอง</b> (items[1]) เป็น <b>99</b> แล้วแสดงค่าช่องนั้น (ต้องได้ <b>99</b>)',
            starter: "int main() {\n    int items[3] = {10, 20, 30};\n\n    return 0;\n}\n",
            hint: '<code>items[1] = 99;</code> แล้ว <code>printf("%d", items[1]);</code>',
            xp: 50,
            check: (out, code) => eq(out, "99") && /\[1\]\s*=\s*99/.test(code)
          },
          {
            title: "วนลูปอ่านทุกช่อง",
            desc: "ใช้ for วนดัชนี 0 ถึง 2 เพื่ออ่านทุกช่อง — สูตร: i < ขนาดอาร์เรย์",
            goal: 'มี <b>int a[3] = {5, 10, 15}</b> จงวนลูปแสดงทุกค่า (บรรทัดละค่า: 5, 10, 15)',
            starter: "int main() {\n    int a[3] = {5, 10, 15};\n\n    return 0;\n}\n",
            hint: '<code>for (int i = 0; i < 3; i++) { printf("%d\\n", a[i]); }</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.join(",") === "5,10,15" && /for\s*\(/.test(code) && /a\s*\[\s*i\s*\]/.test(code); }
          },
          {
            title: "รวมค่าทั้งอาร์เรย์",
            desc: "รูปแบบสะสมสุดคลาสสิก: ตัวแปรผลรวมเริ่มที่ 0 แล้ววนบวกทีละช่อง",
            goal: 'มี <b>int a[3] = {12, 30, 25}</b> จงวนรวมทุกค่า แล้วแสดง <b>รวม = 67</b>',
            starter: "int main() {\n    int a[3] = {12, 30, 25};\n    int sum = 0;\n\n    return 0;\n}\n",
            hint: 'ในลูป: <code>sum += a[i];</code> จบลูปค่อย printf',
            xp: 80,
            check: (out, code) => eq(out, "รวม = 67") && /for\s*\(/.test(code) && /\+=|sum\s*=\s*sum/.test(code)
          },
          {
            title: "หาแชมป์ในอาร์เรย์",
            desc: "หาค่ามากสุดแบบไม่มีตัวช่วย (C ไม่มี max() ให้ฟรีๆ แบบ Python): ตั้งแชมป์ชั่วคราว แล้ววนเทียบทีละตัว",
            goal: 'มี <b>int a[3] = {40, 75, 60}</b> จงหาค่ามากที่สุด แล้วแสดง <b>มากสุด = 75</b>',
            starter: "int main() {\n    int a[3] = {40, 75, 60};\n    int best = 0;\n\n    return 0;\n}\n",
            hint: 'ในลูป: <code>if (a[i] > best) { best = a[i]; }</code>',
            xp: 80,
            check: (out, code) => eq(out, "มากสุด = 75") && /for\s*\(/.test(code) && /if\s*\(/.test(code)
          },
          {
            title: "นับของที่ผ่านเกณฑ์",
            desc: "รูปแบบนับแบบมีเงื่อนไข: วนทั้งอาร์เรย์ แล้วเพิ่มตัวนับเฉพาะตัวที่เข้าเกณฑ์ — ใช้ทำสถิติได้สารพัด",
            goal: 'มีคะแนน <b>int s[5] = {45, 80, 60, 30, 95}</b> จงนับว่ามีกี่ตัวที่ ≥ 50 แสดง <b>ผ่าน 3 คน</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int s[5] = {45, 80, 60, 30, 95};\n    int count = 0;\n\n    return 0;\n}\n",
            hint: 'ในลูป: <code>if (s[i] >= 50) { count++; }</code> วนครบ 5 ตัวแล้วค่อย printf',
            xp: 60,
            check: (out, code) => eq(out, "ผ่าน 3 คน") && /for\s*\(/.test(code) && /count/.test(code)
          },
          {
            title: "กลับด้านอาร์เรย์",
            desc: "วนย้อนจากช่องท้ายมาช่องแรกด้วย for นับถอยหลัง — เทคนิคที่ใช้กลับข้อความ กลับลำดับ และอีกมาก",
            goal: 'มี <b>int a[4] = {1, 2, 3, 4}</b> จงพิมพ์<b>จากท้ายมาหน้า</b> (4, 3, 2, 1 บรรทัดละเลข)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int a[4] = {1, 2, 3, 4};\n\n    return 0;\n}\n",
            hint: '<code>for (int i = 3; i >= 0; i--) { printf("%d\\n", a[i]); }</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "4,3,2,1" && /i\s*--|i\s*-=/.test(code); }
          }
        ]
      },
      {
        id: "cptr", icon: "🎯", title: "หน่วยที่ 9: พอยน์เตอร์",
        blurb: "หัวใจของภาษา C — ตัวแปรที่เก็บ \"ที่อยู่\" และพลังการเข้าถึงหน่วยความจำโดยตรง",
        lesson: [
          { h: "พอยน์เตอร์ = ตัวแปรเก็บที่อยู่", p: "ทุกตัวแปรมี \"ที่อยู่\" ในหน่วยความจำ • <b>&x</b> = ที่อยู่ของ x • <b>int *p</b> = ประกาศพอยน์เตอร์ • <b>*p</b> = ค่าที่อยู่ปลายทางที่ p ชี้ (เรียกว่า dereference)", code: "int x = 42;\nint *p = &x;      // p ชี้ไปที่ x\nprintf(\"%d\", *p); // 42" },
          { h: "แก้ค่าผ่านพอยน์เตอร์", p: "<b>*p = 99;</b> คือเขียนค่าลงช่องที่ p ชี้อยู่ — ค่า x จะเปลี่ยนตามทันที เพราะมันคือช่องหน่วยความจำเดียวกัน นี่คือวิธีที่ scanf แก้ค่าตัวแปรของเราได้ (เราส่ง &x ให้มันนั่นเอง!)" },
          { h: "พอยน์เตอร์กับอาร์เรย์", p: "ชื่ออาร์เรย์คือ<b>ที่อยู่ของช่องแรก</b> — กำหนด p = a; ได้เลย แล้ว *(p+1) คือ a[1] เพราะเลขคณิตพอยน์เตอร์เลื่อนทีละช่อง", code: "int a[] = {5, 10, 15};\nint *p = a;\nprintf(\"%d\", *(p + 1));  // 10" }
        ],
        stages: [
          {
            title: "ชี้ครั้งแรก",
            desc: "สามขั้นของพอยน์เตอร์: ประกาศด้วย int *p → ให้ชี้ด้วย p = &x → อ่านค่าปลายทางด้วย *p",
            goal: 'กำหนด <b>x = 42</b> สร้างพอยน์เตอร์ <b>p</b> ชี้ไปที่ x แล้วแสดงค่า <b>*p</b> (ต้องได้ <b>42</b>)',
            starter: "int main() {\n    int x = 42;\n    // สร้างพอยน์เตอร์ชี้ไปที่ x\n\n    return 0;\n}\n",
            hint: '<code>int *p = &x;</code> แล้ว <code>printf("%d", *p);</code>',
            xp: 60,
            check: (out, code) => eq(out, "42") && /\*\s*p/.test(code) && /&\s*x/.test(code)
          },
          {
            title: "แก้ค่าทางไกล",
            desc: "เขียนค่าผ่านพอยน์เตอร์ด้วย *p = ค่าใหม่; — ตัวแปรต้นทางเปลี่ยนทันทีเพราะเป็นช่องเดียวกัน",
            goal: 'จากโค้ดเดิม ใช้ <b>*p = 99;</b> แล้วแสดงค่า <b>x</b> (ไม่ใช่ *p) ในรูปแบบ <b>x = 99</b>',
            starter: "int main() {\n    int x = 42;\n    int *p = &x;\n    // แก้ค่าผ่านพอยน์เตอร์ แล้วพิมพ์ค่า x\n\n    return 0;\n}\n",
            hint: '<code>*p = 99;</code> แล้ว <code>printf("x = %d", x);</code>',
            xp: 60,
            check: (out, code) => eq(out, "x = 99") && /\*\s*p\s*=\s*99/.test(code)
          },
          {
            title: "ชื่ออาร์เรย์คือที่อยู่",
            desc: "ให้พอยน์เตอร์ชี้อาร์เรย์ได้โดยไม่ต้องใส่ & (ชื่ออาร์เรย์เป็นที่อยู่อยู่แล้ว) แล้วเลื่อนดูช่องถัดไปด้วย +1",
            goal: 'มี <b>int a[] = {5, 10, 15}</b> ให้ <b>p = a</b> แล้วแสดงค่า <b>*(p + 1)</b> (ต้องได้ <b>10</b>)',
            starter: "int main() {\n    int a[3] = {5, 10, 15};\n    int *p = a;\n\n    return 0;\n}\n",
            hint: '<code>printf("%d", *(p + 1));</code> — วงเล็บสำคัญ! *p + 1 คือคนละเรื่อง',
            xp: 80,
            check: (out, code) => eq(out, "10") && /\*\s*\(\s*p\s*\+\s*1\s*\)/.test(code)
          },
          {
            title: "เดินอ่านด้วยพอยน์เตอร์",
            desc: "วนอ่านทั้งอาร์เรย์แบบสายพอยน์เตอร์: *(p + i) แทน a[i] — ความจริงแล้ว a[i] ก็คือน้ำตาลเคลือบของ *(a+i) นั่นเอง",
            goal: 'ใช้ลูปกับ <b>*(p + i)</b> แสดงทุกค่าของอาร์เรย์ (บรรทัดละค่า: 5, 10, 15)',
            starter: "int main() {\n    int a[3] = {5, 10, 15};\n    int *p = a;\n\n    return 0;\n}\n",
            hint: '<code>for (int i = 0; i < 3; i++) { printf("%d\\n", *(p + i)); }</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "5,10,15" && /\*\s*\(\s*p\s*\+\s*i\s*\)/.test(code); }
          },
          {
            title: "สลับค่าด้วยพอยน์เตอร์",
            desc: "โจทย์อมตะ: สลับค่า x กับ y ผ่านพอยน์เตอร์สองตัว โดยใช้ตัวแปรพัก (t) — ไล่มือทีละบรรทัดให้เห็นภาพหน่วยความจำ",
            goal: 'กำหนด <b>x = 10</b>, <b>y = 20</b> ใช้พอยน์เตอร์ <b>px, py</b> สลับค่ากัน แล้วแสดง <b>x=20 y=10</b>',
            starter: "int main() {\n    int x = 10, y = 20;\n    int *px = &x;\n    int *py = &y;\n    // สลับค่าผ่าน *px และ *py\n\n    printf(\"x=%d y=%d\", x, y);\n    return 0;\n}\n",
            hint: 'สามจังหวะ: <code>int t = *px;</code> → <code>*px = *py;</code> → <code>*py = t;</code>',
            xp: 100,
            check: (out, code) => eq(out, "x=20 y=10") && /int\s*\*\s*px/.test(code) && /\*\s*px\s*=\s*\*\s*py/.test(code)
          },
          {
            title: "พอยน์เตอร์บวกค่าให้ต้นทาง",
            desc: "รวมทุกอย่าง: ใช้พอยน์เตอร์แก้ค่าตัวแปรต้นทางแบบบวกเพิ่ม — พื้นฐานของการส่งค่ากลับผ่านพารามิเตอร์",
            goal: 'กำหนด <b>hp = 50</b> ให้พอยน์เตอร์ p ชี้ไปที่ hp แล้วใช้ <b>*p += 30</b> เพิ่มพลัง แสดง <b>hp = 80</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int hp = 50;\n    int *p = &hp;\n\n    printf(\"hp = %d\", hp);\n    return 0;\n}\n",
            hint: 'ก่อน printf ใส่ <code>*p += 30;</code> — แก้ผ่านพอยน์เตอร์ ค่า hp เปลี่ยนตาม',
            xp: 100,
            check: (out, code) => eq(out, "hp = 80") && /\*\s*p\s*\+=/.test(code)
          }
        ]
      },
      {
        id: "cfunc", icon: "🧩", title: "หน่วยที่ 10: ฟังก์ชัน",
        blurb: "แบ่งโปรแกรมเป็นชิ้นส่วนที่ใช้ซ้ำได้ — ปิดท้ายด้วยการรวมพอยน์เตอร์เข้ากับฟังก์ชัน",
        lesson: [
          { h: "โครงสร้างฟังก์ชัน", p: "<b>ชนิดค่าที่คืน ชื่อ(พารามิเตอร์) { ... return ค่า; }</b> — ใช้ void เมื่อไม่ต้องคืนค่า", code: "int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf(\"%d\", add(3, 4));  // 7\n    return 0;\n}" },
          { h: "ประกาศก่อนเรียกเสมอ", p: "C อ่านไฟล์จากบนลงล่าง — เขียนฟังก์ชันไว้<b>เหนือ main</b> หรือประกาศโปรโตไทป์ (หัวฟังก์ชัน + ;) ไว้บนสุดก็ได้" },
          { h: "ส่งอาร์เรย์และพอยน์เตอร์เข้าฟังก์ชัน", p: "อาร์เรย์ถูกส่งเป็น<b>ที่อยู่</b> (เขียนพารามิเตอร์เป็น int a[]) • ส่ง <b>&x</b> ให้พารามิเตอร์ <b>int *p</b> เมื่ออยากให้ฟังก์ชันแก้ค่าตัวแปรต้นทางได้จริง — นี่คือเหตุผลที่ต้องเรียนพอยน์เตอร์มาก่อน!", code: "void swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}" }
        ],
        stages: [
          {
            title: "ฟังก์ชันแรก (void)",
            desc: "ฟังก์ชันที่ไม่คืนค่าใช้ void — เขียนไว้เหนือ main แล้วเรียกด้วยชื่อตามด้วยวงเล็บ",
            goal: 'สร้างฟังก์ชัน <b>greet</b> ที่แสดง <b>สวัสดีจากฟังก์ชัน</b> แล้วเรียกใช้ใน main',
            starter: "void greet() {\n    // แสดงข้อความตรงนี้\n}\n\nint main() {\n    // เรียกใช้ greet\n    return 0;\n}\n",
            hint: 'ใน greet: <code>printf("สวัสดีจากฟังก์ชัน");</code> ใน main: <code>greet();</code>',
            xp: 60,
            check: (out, code) => eq(out, "สวัสดีจากฟังก์ชัน") && /void\s+greet/.test(code)
          },
          {
            title: "รับค่าและ return",
            desc: "ฟังก์ชันรับพารามิเตอร์ได้หลายตัว (ต้องระบุชนิดทุกตัว!) และส่งผลกลับด้วย return",
            goal: 'สร้าง <b>int add(int a, int b)</b> ที่คืนผลบวก แล้วแสดงผล add(3, 4) (ต้องได้ <b>7</b>)',
            starter: "int add(int a, int b) {\n    // return ผลบวก\n}\n\nint main() {\n    printf(\"%d\", add(3, 4));\n    return 0;\n}\n",
            hint: '<code>return a + b;</code>',
            xp: 60,
            check: (out, code) => eq(out, "7") && /int\s+add\s*\(\s*int/.test(code) && /return/.test(code)
          },
          {
            title: "ฟังก์ชันคืนทศนิยม",
            desc: "ชนิดค่าที่คืนต้องตรงกับงาน — พื้นที่วงกลมเป็นทศนิยม จึงใช้ float ทั้งพารามิเตอร์และค่าที่คืน",
            goal: 'สร้าง <b>float area(float r)</b> คืนค่า 3.14 × r × r แล้วแสดง area(2) ทศนิยม 2 ตำแหน่ง (ต้องได้ <b>12.56</b>)',
            starter: "float area(float r) {\n    // return พื้นที่วงกลม\n}\n\nint main() {\n    printf(\"%.2f\", area(2));\n    return 0;\n}\n",
            hint: '<code>return 3.14 * r * r;</code>',
            xp: 80,
            check: (out, code) => eq(out, "12.56") && /float\s+area/.test(code)
          },
          {
            title: "ฟังก์ชัน + ลูป",
            desc: "ห่อลูปไว้ในฟังก์ชัน แล้วเรียกซ้ำด้วยค่าต่างกัน — โค้ดชุดเดียว ใช้ได้หลายงาน",
            goal: 'สร้าง <b>void printStars(int n)</b> ที่พิมพ์ดาว n ดวงแล้วขึ้นบรรทัดใหม่ เรียกด้วย 3 และ 5 (ต้องได้ <b>***</b> และ <b>*****</b>)',
            starter: "void printStars(int n) {\n    // วนพิมพ์ * ทีละดวง n รอบ แล้วปิดท้ายด้วย \\n\n}\n\nint main() {\n    printStars(3);\n    printStars(5);\n    return 0;\n}\n",
            hint: '<code>for (int i = 0; i < n; i++) { printf("*"); } printf("\\n");</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "***" && l[1] === "*****" && /for\s*\(/.test(code); }
          },
          {
            title: "ส่งอาร์เรย์เข้าฟังก์ชัน",
            desc: "พารามิเตอร์ int a[] รับอาร์เรย์ (ที่จริงคือรับที่อยู่ช่องแรก) — ส่งขนาดไปด้วยเพราะฟังก์ชันไม่รู้ความยาวเอง",
            goal: 'สร้าง <b>int sumArr(int a[], int n)</b> คืนผลรวม แล้วแสดงผลรวมของ {12, 30, 25} ในรูปแบบ <b>รวม = 67</b>',
            starter: "int sumArr(int a[], int n) {\n    int s = 0;\n    // วนบวกทุกช่อง\n\n    return s;\n}\n\nint main() {\n    int b[3] = {12, 30, 25};\n    printf(\"รวม = %d\", sumArr(b, 3));\n    return 0;\n}\n",
            hint: '<code>for (int i = 0; i < n; i++) { s += a[i]; }</code>',
            xp: 100,
            check: (out, code) => eq(out, "รวม = 67") && /int\s+sumArr\s*\(\s*int\s+\w+\s*\[/.test(code) && /for\s*\(/.test(code)
          },
          {
            title: "บอสใหญ่: swap ของจริง",
            desc: "ด่านสุดท้ายของหลักสูตร! รวมหน่วย 9 + 10: ฟังก์ชัน swap รับพอยน์เตอร์ จึงสลับค่าตัวแปรใน main ได้จริง — ถ้าส่งค่าธรรมดา (ไม่ใช่ &) จะสลับไม่ติดเพราะเป็นแค่สำเนา",
            goal: 'สร้าง <b>void swap(int *a, int *b)</b> สลับค่าปลายทาง แล้วเรียก <b>swap(&x, &y)</b> ให้ได้ผล <b>x=20 y=10</b>',
            starter: "void swap(int *a, int *b) {\n    // สลับค่าผ่าน *a และ *b\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf(\"x=%d y=%d\", x, y);\n    return 0;\n}\n",
            hint: '<code>int t = *a; *a = *b; *b = t;</code>',
            xp: 120,
            check: (out, code) => eq(out, "x=20 y=10") && /void\s+swap\s*\(\s*int\s*\*/.test(code) && /&\s*x/.test(code)
          },
          {
            title: "ฟังก์ชันตรวจเลขคู่",
            desc: "ฟังก์ชันคืนค่า 1/0 (แบบ boolean ของ C) ใช้ตรวจเงื่อนไขที่เรียกซ้ำได้ — ห่อ logic ไว้ในที่เดียว",
            goal: 'สร้าง <b>int isEven(int n)</b> คืน 1 ถ้าคู่ 0 ถ้าคี่ แล้วแสดงผล isEven(4) และ isEven(7) (ต้องได้ <b>1</b> และ <b>0</b> บรรทัดละค่า)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint isEven(int n) {\n    // return 1 ถ้าคู่ ไม่งั้น 0\n}\n\nint main() {\n    printf(\"%d\\n\", isEven(4));\n    printf(\"%d\\n\", isEven(7));\n    return 0;\n}\n",
            hint: '<code>return n % 2 == 0;</code> — ผลเปรียบเทียบเป็น 1/0 อยู่แล้ว',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,0" && /int\s+isEven/.test(code) && /%\s*2/.test(code); }
          },
          {
            title: "บอสสุดท้าย: เครื่องคิดเลขฟังก์ชัน",
            desc: "ปิดคอร์สด้วยการรวมทุกอย่าง: หลายฟังก์ชัน + เรียกใช้ + แสดงผล — โครงสร้างโปรแกรมจริงที่แบ่งงานเป็นส่วนๆ",
            goal: 'สร้าง <b>int add(int,int)</b> และ <b>int mul(int,int)</b> แล้วแสดง 2 บรรทัด: <b>บวก = 12</b> (add 7,5) และ <b>คูณ = 35</b> (mul 7,5)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n// สร้างฟังก์ชัน add และ mul เอง แล้วเรียกใช้ใน main\n\n",
            hint: 'สองฟังก์ชันเหนือ main: <code>int add(int a, int b) { return a + b; }</code> และ mul คืน a*b',
            xp: 150,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "บวก = 12" && l[1] === "คูณ = 35" && /int\s+add/.test(code) && /int\s+mul/.test(code); }
          }
        ]
      }
    ]
  },
  html: {
    name: "HTML5", icon: "🌐",
    tagline: "โครงกระดูกของทุกเว็บไซต์ — เขียนโครงสร้างหน้าเว็บด้วยแท็ก ตั้งแต่ย่อหน้าแรกจนถึงหน้าเว็บที่สมบูรณ์",
    topics: [
      {
        id: "hbasic", icon: "html", title: "หน่วยที่ 1: เริ่มต้น HTML",
        blurb: "แท็กคืออะไร โครงสร้างเอกสาร HTML5 และหลักการซ้อนแท็กให้ถูกต้อง",
        lesson: [
          { h: "HTML คืออะไร", p: "<b>HTML (HyperText Markup Language)</b> คือภาษาที่ใช้บอกเบราว์เซอร์ว่าเนื้อหาแต่ละส่วนคืออะไร — ไม่ใช่ภาษาโปรแกรม แต่เป็น<b>ภาษามาร์กอัป</b> เปรียบเหมือนโครงกระดูกของเว็บ ส่วน CSS คือเสื้อผ้า และ JavaScript คือกล้ามเนื้อที่ทำให้ขยับได้" },
          { h: "แท็ก (Tag) และอิลิเมนต์ (Element)", p: "แท็กเขียนในเครื่องหมาย &lt; &gt; ส่วนใหญ่มาเป็นคู่: <b>แท็กเปิด</b> และ<b>แท็กปิด</b>ที่มี / นำหน้า — แท็กเปิด + เนื้อหา + แท็กปิด รวมกันเรียกว่า <b>element</b> • บางแท็กไม่มีคู่ปิด (void element) เช่น &lt;br&gt;, &lt;hr&gt;, &lt;img&gt;", code: "<h1>หัวข้อใหญ่</h1>\n<p>นี่คือย่อหน้า</p>" },
          { h: "แอตทริบิวต์ (Attribute)", p: "ข้อมูลเพิ่มเติมที่ใส่ในแท็กเปิด เขียนแบบ <b>ชื่อ=\"ค่า\"</b> เช่น <code>lang</code>, <code>id</code>, <code>class</code>, <code>href</code>, <code>src</code>", code: "<html lang=\"th\">\n<a href=\"https://example.com\">ลิงก์</a>" },
          { h: "โครงสร้างเอกสาร HTML5", p: "ทุกหน้าเว็บมีโครงเดียวกัน: <b>&lt;!DOCTYPE html&gt;</b> บอกว่าเป็น HTML5 • <b>&lt;html&gt;</b> ครอบทั้งหมด • <b>&lt;head&gt;</b> ข้อมูลของหน้า (ไม่แสดงผล) เช่น title, meta • <b>&lt;body&gt;</b> เนื้อหาที่ผู้ใช้เห็น", code: "<!DOCTYPE html>\n<html lang=\"th\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>ชื่อหน้าเว็บ</title>\n</head>\n<body>\n  <h1>สวัสดี</h1>\n</body>\n</html>" },
          { h: "คอมเมนต์", p: "ข้อความที่เบราว์เซอร์ข้ามไป ใช้จดโน้ตหรือปิดโค้ดชั่วคราว เขียนด้วย <code>&lt;!-- ... --&gt;</code>" }
        ],
        stages: [
          { title: "หน้าเว็บแรก", desc: "แท็ก h1 ใช้บอกว่าข้อความนี้คือหัวข้อใหญ่ที่สุดของหน้า — เขียนแท็กเปิด เนื้อหา แล้วปิดด้วย /", goal: 'สร้างหัวข้อใหญ่ที่มีข้อความ <b>สวัสดีชาวเว็บ</b>', starter: `<!-- เขียนแท็ก h1 ตรงนี้ -->\n`, hint: '<code>&lt;h1&gt;สวัสดีชาวเว็บ&lt;/h1&gt;</code>', xp: 30, check: (o, c, d) => W.txt(d, "h1") === "สวัสดีชาวเว็บ" },
          { title: "ย่อหน้าข้อความ", desc: "แท็ก p (paragraph) ใช้กับข้อความปกติ แต่ละ p จะขึ้นบรรทัดใหม่ให้เอง", goal: 'สร้าง <b>2 ย่อหน้า</b>: ย่อหน้าแรก <b>ยินดีต้อนรับ</b> ย่อหน้าที่สอง <b>มาเรียน HTML กัน</b>', starter: ``, hint: 'ใช้ <code>&lt;p&gt;...&lt;/p&gt;</code> สองชุด', xp: 40, check: (o, c, d) => { const p = W.qa(d, "p").map(e => W.txt(e)); return p.length === 2 && p[0] === "ยินดีต้อนรับ" && p[1] === "มาเรียน HTML กัน"; } },
          { title: "โครงสร้างเอกสารเต็มรูปแบบ", desc: "หน้าเว็บจริงต้องมีโครงครบ: DOCTYPE, html, head (มี title), body — title คือชื่อที่ขึ้นบนแท็บเบราว์เซอร์", goal: 'เขียนโครงสร้าง HTML5 ให้ครบ โดยมี <b>title</b> = <b>เว็บแรกของฉัน</b> และใน body มี h1 ข้อความ <b>หน้าแรก</b>', starter: `<!DOCTYPE html>\n<html>\n<head>\n\n</head>\n<body>\n\n</body>\n</html>\n`, hint: '<code>&lt;title&gt;เว็บแรกของฉัน&lt;/title&gt;</code> ไว้ใน head และ h1 ไว้ใน body', xp: 50, check: (o, c, d) => /<!DOCTYPE\s+html>/i.test(c) && W.norm(d.title) === "เว็บแรกของฉัน" && W.txt(d, "body h1") === "หน้าแรก" },
          { title: "ภาษาและการเข้ารหัส", desc: "แอตทริบิวต์ lang บอกภาษาของหน้า (ช่วยเรื่อง SEO และโปรแกรมอ่านหน้าจอ) ส่วน meta charset=UTF-8 ทำให้ภาษาไทยไม่กลายเป็นตัวประหลาด", goal: 'เพิ่ม <b>lang="th"</b> ที่แท็ก html และ <b>&lt;meta charset="UTF-8"&gt;</b> ใน head (คงข้อความ <b>ทดสอบภาษาไทย</b> ไว้)', starter: `<!DOCTYPE html>\n<html>\n<head>\n  <title>ทดสอบ</title>\n</head>\n<body>\n  <p>ทดสอบภาษาไทย</p>\n</body>\n</html>\n`, hint: '<code>&lt;html lang="th"&gt;</code> และ <code>&lt;meta charset="UTF-8"&gt;</code>', xp: 50, check: (o, c, d) => W.attr(d, "html", "lang") === "th" && /charset\s*=\s*["']?utf-8/i.test(c) && W.txt(d, "p") === "ทดสอบภาษาไทย" },
          { title: "คอมเมนต์ปิดเนื้อหา", desc: "อยากซ่อนบางส่วนชั่วคราวโดยไม่ลบทิ้ง ใช้คอมเมนต์ครอบไว้ เบราว์เซอร์จะไม่แสดงผลส่วนนั้น", goal: 'ใช้คอมเมนต์ครอบย่อหน้า <b>ยังไม่เสร็จ</b> ให้หายไปจากหน้าเว็บ (เหลือแสดงแค่ <b>พร้อมใช้งาน</b>)', starter: `<p>พร้อมใช้งาน</p>\n<p>ยังไม่เสร็จ</p>\n`, hint: 'ครอบด้วย <code>&lt;!--</code> และ <code>--&gt;</code>', xp: 40, check: (o, c, d) => W.pageText(d) === "พร้อมใช้งาน" && /<!--/.test(c) && /-->/.test(c) },
          { title: "ซ้อนแท็กให้ถูกต้อง", desc: "แท็กซ้อนกันได้ แต่ต้องปิดจากในออกนอก (เปิด p แล้วเปิด strong ต้องปิด strong ก่อนปิด p)", goal: 'สร้างย่อหน้าที่มีข้อความ <b>ราคาพิเศษ ลด 50%</b> โดยคำว่า <b>ลด 50%</b> อยู่ในแท็ก <b>strong</b> ซ้อนอยู่ในย่อหน้านั้น', starter: `<p>ราคาพิเศษ </p>\n`, hint: '<code>&lt;p&gt;ราคาพิเศษ &lt;strong&gt;ลด 50%&lt;/strong&gt;&lt;/p&gt;</code>', xp: 50, check: (o, c, d) => { const s = W.q(d, "p strong"); return !!s && W.txt(s) === "ลด 50%" && W.txt(d, "p").includes("ราคาพิเศษ"); } }
        ]
      },
      {
        id: "htext", icon: "html", title: "หน่วยที่ 2: ข้อความและการจัดรูปแบบ",
        blurb: "หัวข้อ 6 ระดับ ย่อหน้า การเน้นข้อความ อักขระพิเศษ และแท็กข้อความเฉพาะทาง",
        lesson: [
          { h: "หัวข้อ 6 ระดับ", p: "<b>&lt;h1&gt;</b> ถึง <b>&lt;h6&gt;</b> เรียงจากสำคัญที่สุดไปน้อยที่สุด — หนึ่งหน้าควรมี h1 เพียงตัวเดียว (หัวข้อหลักของหน้า) แล้วไล่ลำดับลงไปไม่ข้ามขั้น เพราะ Google และโปรแกรมอ่านหน้าจอใช้ลำดับนี้ทำความเข้าใจหน้าเว็บ" },
          { h: "ขึ้นบรรทัดและเส้นคั่น", p: "<b>&lt;br&gt;</b> ขึ้นบรรทัดใหม่ในย่อหน้าเดียวกัน • <b>&lt;hr&gt;</b> เส้นคั่นแบ่งหัวข้อ — ทั้งคู่เป็นแท็กเดี่ยว ไม่มีตัวปิด • หมายเหตุ: การเคาะ Enter หรือเว้นวรรคหลายครั้งใน HTML จะถูกยุบเหลือช่องว่างเดียว" },
          { h: "เน้นข้อความ", p: "<b>&lt;strong&gt;</b> สำคัญมาก (แสดงเป็นตัวหนา) • <b>&lt;em&gt;</b> เน้นเสียง (ตัวเอียง) • <b>&lt;mark&gt;</b> ไฮไลต์ • <b>&lt;del&gt;</b> ข้อความที่ถูกลบ (ขีดฆ่า) • <b>&lt;ins&gt;</b> ข้อความที่เพิ่มเข้ามา • <b>&lt;small&gt;</b> ตัวเล็ก — นิยมใช้ strong/em มากกว่า b/i เพราะสื่อความหมาย ไม่ใช่แค่รูปลักษณ์" },
          { h: "อักขระพิเศษ (HTML Entity)", p: "อักขระที่ชนกับไวยากรณ์ HTML ต้องเขียนเป็นรหัส: <code>&amp;lt;</code> = &lt; • <code>&amp;gt;</code> = &gt; • <code>&amp;amp;</code> = &amp; • <code>&amp;nbsp;</code> = ช่องว่างที่ไม่ถูกยุบ • <code>&amp;copy;</code> = ©" },
          { h: "แท็กข้อความเฉพาะทาง", p: "<b>&lt;blockquote&gt;</b> ข้อความอ้างอิงยาว • <b>&lt;q&gt;</b> อ้างอิงสั้นในบรรทัด • <b>&lt;code&gt;</b> โค้ด • <b>&lt;pre&gt;</b> คงรูปแบบช่องว่างและการขึ้นบรรทัดไว้ตามที่พิมพ์ • <b>&lt;span&gt;</b> ครอบข้อความบางส่วนไว้จัดสไตล์ทีหลัง" }
        ],
        stages: [
          { title: "ลำดับชั้นหัวข้อ", desc: "ไล่ลำดับหัวข้อจากใหญ่ไปเล็กให้ถูกต้อง h1 → h2 → h3", goal: 'สร้าง <b>h1</b> = <b>บทความของฉัน</b>, <b>h2</b> = <b>บทที่ 1</b>, <b>h3</b> = <b>หัวข้อย่อย</b>', starter: ``, hint: 'เขียนสามแท็ก h1, h2, h3 ตามลำดับ', xp: 40, check: (o, c, d) => W.txt(d, "h1") === "บทความของฉัน" && W.txt(d, "h2") === "บทที่ 1" && W.txt(d, "h3") === "หัวข้อย่อย" },
          { title: "ขึ้นบรรทัดใหม่ด้วย br", desc: "ที่อยู่หรือบทกลอนต้องขึ้นบรรทัดในย่อหน้าเดียว ใช้ br (แท็กเดี่ยว ไม่ต้องปิด)", goal: 'สร้างย่อหน้าเดียวที่มี <b>บรรทัดหนึ่ง</b> และ <b>บรรทัดสอง</b> คั่นด้วย <b>&lt;br&gt;</b> (ต้องมี p แค่ตัวเดียว)', starter: `<p>บรรทัดหนึ่งบรรทัดสอง</p>\n`, hint: 'แทรก <code>&lt;br&gt;</code> ระหว่างสองข้อความ', xp: 40, check: (o, c, d) => W.qa(d, "p").length === 1 && W.qa(d, "p br").length === 1 && W.txt(d, "p").includes("บรรทัดหนึ่ง") && W.txt(d, "p").includes("บรรทัดสอง") },
          { title: "เส้นคั่นและตัวหนา", desc: "hr วาดเส้นแบ่งเนื้อหา ส่วน strong บอกว่าข้อความสำคัญมาก", goal: 'เขียน p <b>ตอนที่ 1</b> → เส้นคั่น <b>&lt;hr&gt;</b> → p ที่มีคำว่า <b>สำคัญ</b> อยู่ในแท็ก strong', starter: ``, hint: '<code>&lt;hr&gt;</code> เป็นแท็กเดี่ยว วางระหว่างสองย่อหน้า', xp: 50, check: (o, c, d) => W.has(d, "hr") && W.txt(d, "p") === "ตอนที่ 1" && W.hasText(d, "strong", "สำคัญ", true) },
          { title: "เน้นด้วย em และ mark", desc: "em = เน้นน้ำเสียง (เอียง), mark = ไฮไลต์เหมือนปากกาเน้นข้อความ", goal: 'ในย่อหน้าเดียว: คำว่า <b>ห้ามพลาด</b> อยู่ใน <b>em</b> และคำว่า <b>วันนี้</b> อยู่ใน <b>mark</b>', starter: `<p>โปรโมชั่น ห้ามพลาด เฉพาะ วันนี้ เท่านั้น</p>\n`, hint: 'ครอบคำด้วย <code>&lt;em&gt;</code> และ <code>&lt;mark&gt;</code>', xp: 50, check: (o, c, d) => W.hasText(d, "em", "ห้ามพลาด", true) && W.hasText(d, "mark", "วันนี้", true) },
          { title: "ราคาลดด้วย del และ ins", desc: "เว็บขายของใช้ del ขีดฆ่าราคาเดิม และ ins แสดงราคาใหม่", goal: 'ในย่อหน้า: <b>1000</b> อยู่ใน <b>del</b> และ <b>790</b> อยู่ใน <b>ins</b>', starter: `<p>ราคา 1000 บาท เหลือ 790 บาท</p>\n`, hint: '<code>&lt;del&gt;1000&lt;/del&gt;</code> และ <code>&lt;ins&gt;790&lt;/ins&gt;</code>', xp: 50, check: (o, c, d) => W.hasText(d, "del", "1000", true) && W.hasText(d, "ins", "790", true) },
          { title: "อักขระพิเศษ", desc: "อยากให้หน้าเว็บแสดงเครื่องหมาย < > & ต้องเขียนเป็นรหัส entity ไม่งั้นเบราว์เซอร์จะคิดว่าเป็นแท็ก", goal: 'สร้างย่อหน้าที่แสดงข้อความ <b>ใช้ &lt;p&gt; & &lt;div&gt;</b> ออกมาบนหน้าเว็บจริงๆ', starter: `<p></p>\n`, hint: 'ใช้ <code>&amp;lt;</code> แทน &lt;, <code>&amp;gt;</code> แทน &gt; และ <code>&amp;amp;</code> แทน &amp;', xp: 60, check: (o, c, d) => W.txt(d, "p") === "ใช้ <p> & <div>" && /&lt;|&amp;/i.test(c) },
          { title: "โค้ดและข้อความอ้างอิง", desc: "blockquote สำหรับคำคม/ข้อความอ้างอิงยาว และ code สำหรับโค้ดในเนื้อหา", goal: 'สร้าง <b>blockquote</b> ข้อความ <b>โค้ดที่ดีคือโค้ดที่อ่านง่าย</b> และย่อหน้าที่มีคำว่า <b>console.log</b> อยู่ในแท็ก <b>code</b>', starter: ``, hint: '<code>&lt;blockquote&gt;...&lt;/blockquote&gt;</code> และ <code>&lt;code&gt;console.log&lt;/code&gt;</code>', xp: 60, check: (o, c, d) => W.txt(d, "blockquote") === "โค้ดที่ดีคือโค้ดที่อ่านง่าย" && W.hasText(d, "code", "console.log", true) }
        ]
      },
      {
        id: "hlist", icon: "html", title: "หน่วยที่ 3: ลิสต์และลิงก์",
        blurb: "รายการแบบจุด/ตัวเลข ลิสต์ซ้อนชั้น และการเชื่อมหน้าเว็บด้วยลิงก์",
        lesson: [
          { h: "ลิสต์ไม่เรียงลำดับ (ul)", p: "<b>&lt;ul&gt;</b> ครอบรายการ แต่ละรายการอยู่ใน <b>&lt;li&gt;</b> — แสดงเป็นจุดนำหน้า เหมาะกับรายการที่ลำดับไม่สำคัญ เช่น เมนู รายการสินค้า", code: "<ul>\n  <li>กาแฟ</li>\n  <li>ชาเขียว</li>\n</ul>" },
          { h: "ลิสต์เรียงลำดับ (ol)", p: "<b>&lt;ol&gt;</b> แสดงเป็นตัวเลข เหมาะกับขั้นตอนที่มีลำดับ — ปรับได้ด้วย <code>type=\"A\"</code> (A,B,C) หรือ <code>start=\"5\"</code> (เริ่มที่ 5)" },
          { h: "ลิสต์ซ้อนและลิสต์นิยาม", p: "ใส่ ul/ol ซ้อนไว้<b>ภายใน li</b> เพื่อทำเมนูหลายชั้น • <b>&lt;dl&gt;</b> คือลิสต์นิยาม ประกอบด้วย <b>&lt;dt&gt;</b> (คำศัพท์) และ <b>&lt;dd&gt;</b> (คำอธิบาย)" },
          { h: "ลิงก์ (a)", p: "<b>&lt;a href=\"ปลายทาง\"&gt;ข้อความ&lt;/a&gt;</b> — href ใส่ได้ทั้ง URL เต็ม, path ไฟล์ในเว็บเดียวกัน, <code>#id</code> เพื่อกระโดดในหน้า, <code>mailto:</code> เปิดอีเมล, <code>tel:</code> โทรออก", code: "<a href=\"https://example.com\">เว็บนอก</a>\n<a href=\"#top\">กลับขึ้นบน</a>" },
          { h: "เปิดแท็บใหม่อย่างปลอดภัย", p: "<code>target=\"_blank\"</code> เปิดแท็บใหม่ ควรใส่ <code>rel=\"noopener\"</code> ควบคู่เสมอ เพื่อกันหน้าปลายทางเข้าถึงหน้าเราผ่าน window.opener (ช่องโหว่ด้านความปลอดภัย)" }
        ],
        stages: [
          { title: "รายการแบบจุด", desc: "ul ครอบรายการทั้งหมด แต่ละบรรทัดเป็น li", goal: 'สร้างลิสต์แบบจุดที่มี 3 รายการ: <b>กาแฟ</b>, <b>ชาเขียว</b>, <b>โกโก้</b>', starter: ``, hint: '<code>&lt;ul&gt;&lt;li&gt;กาแฟ&lt;/li&gt;...&lt;/ul&gt;</code>', xp: 40, check: (o, c, d) => { const li = W.qa(d, "ul li").map(e => W.txt(e)); return li.join(",") === "กาแฟ,ชาเขียว,โกโก้"; } },
          { title: "รายการแบบตัวเลข", desc: "ขั้นตอนที่มีลำดับใช้ ol เบราว์เซอร์ใส่เลขให้อัตโนมัติ", goal: 'สร้างลิสต์แบบตัวเลข 3 ขั้น: <b>ต้มน้ำ</b>, <b>ใส่เส้น</b>, <b>ปรุงรส</b>', starter: ``, hint: 'เปลี่ยนจาก ul เป็น <code>&lt;ol&gt;</code>', xp: 40, check: (o, c, d) => { const li = W.qa(d, "ol li").map(e => W.txt(e)); return li.join(",") === "ต้มน้ำ,ใส่เส้น,ปรุงรส"; } },
          { title: "ลิสต์ซ้อนชั้น", desc: "เมนูหลายชั้นทำได้โดยวาง ul ซ้อนไว้ข้างใน li ของชั้นบน", goal: 'ลิสต์หลักมี <b>เครื่องดื่ม</b> และข้างใน li นั้นมีลิสต์ย่อยอีก 2 รายการ: <b>ร้อน</b>, <b>เย็น</b>', starter: `<ul>\n  <li>เครื่องดื่ม</li>\n</ul>\n`, hint: 'วาง <code>&lt;ul&gt;&lt;li&gt;ร้อน&lt;/li&gt;&lt;li&gt;เย็น&lt;/li&gt;&lt;/ul&gt;</code> ไว้ก่อนปิด li ของเครื่องดื่ม', xp: 60, check: (o, c, d) => { const sub = W.qa(d, "ul li ul li").map(e => W.txt(e)); return sub.join(",") === "ร้อน,เย็น"; } },
          { title: "ลิสต์นิยามศัพท์", desc: "dl ใช้จับคู่คำศัพท์กับคำอธิบาย เหมาะกับอภิธานศัพท์หรือรายละเอียดสินค้า", goal: 'สร้าง dl ที่มี <b>dt</b> = <b>HTML</b> และ <b>dd</b> = <b>ภาษามาร์กอัปสำหรับเว็บ</b>', starter: ``, hint: '<code>&lt;dl&gt;&lt;dt&gt;HTML&lt;/dt&gt;&lt;dd&gt;...&lt;/dd&gt;&lt;/dl&gt;</code>', xp: 50, check: (o, c, d) => W.txt(d, "dl dt") === "HTML" && W.txt(d, "dl dd") === "ภาษามาร์กอัปสำหรับเว็บ" },
          { title: "ลิงก์ไปเว็บอื่น", desc: "a คือหัวใจของ HyperText — href บอกปลายทาง ข้อความระหว่างแท็กคือสิ่งที่ผู้ใช้เห็นและคลิก", goal: 'สร้างลิงก์ข้อความ <b>ไปที่ Google</b> ที่ href เป็น <b>https://www.google.com</b>', starter: ``, hint: '<code>&lt;a href="https://www.google.com"&gt;ไปที่ Google&lt;/a&gt;</code>', xp: 50, check: (o, c, d) => { const a = W.q(d, "a"); return !!a && W.attr(d, a, "href") === "https://www.google.com" && W.txt(a) === "ไปที่ Google"; } },
          { title: "เปิดแท็บใหม่แบบปลอดภัย", desc: "ลิงก์ออกนอกเว็บนิยมเปิดแท็บใหม่ และต้องใส่ rel=\"noopener\" กันช่องโหว่", goal: 'เพิ่ม <b>target="_blank"</b> และ <b>rel="noopener"</b> ให้ลิงก์นี้', starter: `<a href="https://example.com">เว็บตัวอย่าง</a>\n`, hint: 'ใส่สองแอตทริบิวต์เพิ่มในแท็ก a', xp: 50, check: (o, c, d) => W.attr(d, "a", "target") === "_blank" && W.attr(d, "a", "rel").includes("noopener") },
          { title: "ลิงก์กระโดดภายในหน้า", desc: "ใส่ id ให้จุดหมาย แล้วลิงก์ด้วย #id — ใช้ทำสารบัญหรือปุ่มกลับขึ้นบน", goal: 'สร้างลิงก์ <b>ไปหัวข้อสรุป</b> ที่ href = <b>#summary</b> และมี <b>h2 id="summary"</b> ข้อความ <b>สรุป</b>', starter: ``, hint: '<code>&lt;a href="#summary"&gt;</code> และ <code>&lt;h2 id="summary"&gt;สรุป&lt;/h2&gt;</code>', xp: 60, check: (o, c, d) => W.attr(d, "a", "href") === "#summary" && W.txt(d, "h2#summary") === "สรุป" }
        ]
      },
      {
        id: "himg", icon: "html", title: "หน่วยที่ 4: รูปภาพและสื่อ",
        blurb: "แทรกรูป คำบรรยายภาพ เสียง วิดีโอ และการฝังเนื้อหาจากเว็บอื่น",
        lesson: [
          { h: "แท็ก img", p: "<b>&lt;img&gt;</b> เป็นแท็กเดี่ยว มี 2 แอตทริบิวต์สำคัญ: <b>src</b> ที่อยู่ของไฟล์ภาพ และ <b>alt</b> ข้อความแทนภาพ — alt สำคัญมากเพราะแสดงเมื่อโหลดภาพไม่ได้ และเป็นสิ่งที่โปรแกรมอ่านหน้าจอใช้บอกผู้พิการทางสายตา (รวมถึงมีผลต่อ SEO)", code: "<img src=\"cat.jpg\" alt=\"แมวส้มนอนหลับ\" width=\"300\">" },
          { h: "ขนาดและ path ของภาพ", p: "<code>width</code>/<code>height</code> กำหนดขนาด (ควรใส่ไว้กันหน้าเว็บกระตุกตอนโหลด) • path มี 2 แบบ: <b>relative</b> เช่น <code>images/cat.jpg</code> อ้างจากตำแหน่งไฟล์ปัจจุบัน และ <b>absolute</b> คือ URL เต็ม" },
          { h: "figure และ figcaption", p: "<b>&lt;figure&gt;</b> ครอบภาพที่เป็นเนื้อหาชิ้นหนึ่ง และ <b>&lt;figcaption&gt;</b> คือคำบรรยายใต้ภาพ — สื่อความหมายชัดกว่าการใช้ div ธรรมดา", code: "<figure>\n  <img src=\"cat.jpg\" alt=\"แมว\">\n  <figcaption>แมวของผม</figcaption>\n</figure>" },
          { h: "เสียงและวิดีโอ", p: "<b>&lt;audio&gt;</b> และ <b>&lt;video&gt;</b> ใส่ <code>controls</code> เพื่อให้มีปุ่มเล่น/หยุด • เพิ่ม <code>autoplay</code>, <code>loop</code>, <code>muted</code>, <code>poster</code> ได้ • ข้อความระหว่างแท็กจะแสดงเมื่อเบราว์เซอร์ไม่รองรับ", code: "<video src=\"clip.mp4\" controls width=\"400\"></video>" },
          { h: "ฝังเนื้อหาด้วย iframe", p: "<b>&lt;iframe&gt;</b> คือหน้าต่างที่แสดงหน้าเว็บอื่นซ้อนอยู่ในหน้าเรา ใช้ฝัง YouTube, Google Maps — ควรใส่ <code>title</code> อธิบายเนื้อหาเพื่อการเข้าถึง" }
        ],
        stages: [
          { title: "แทรกรูปภาพ", desc: "img ต้องมี src (ไฟล์) และ alt (ข้อความแทนภาพ) เสมอ — ในเกมนี้ไฟล์ภาพไม่มีจริง จึงเห็นเป็นไอคอนภาพเสีย แต่ alt จะทำงานให้เห็น", goal: 'แทรกรูปที่ <b>src="cat.jpg"</b> และ <b>alt="แมวส้ม"</b>', starter: ``, hint: '<code>&lt;img src="cat.jpg" alt="แมวส้ม"&gt;</code>', xp: 40, check: (o, c, d) => W.attr(d, "img", "src") === "cat.jpg" && W.attr(d, "img", "alt") === "แมวส้ม" },
          { title: "กำหนดขนาดภาพ", desc: "ระบุ width/height ช่วยให้เบราว์เซอร์จองพื้นที่ไว้ก่อน หน้าเว็บจะไม่กระตุกตอนภาพโหลดเสร็จ", goal: 'เพิ่ม <b>width="300"</b> และ <b>height="200"</b> ให้รูปนี้', starter: `<img src="banner.png" alt="แบนเนอร์">\n`, hint: 'เพิ่มสองแอตทริบิวต์ในแท็ก img', xp: 50, check: (o, c, d) => W.attr(d, "img", "width") === "300" && W.attr(d, "img", "height") === "200" },
          { title: "ภาพพร้อมคำบรรยาย", desc: "figure จับคู่ภาพกับคำบรรยายให้เป็นชิ้นเนื้อหาเดียวกัน", goal: 'สร้าง <b>figure</b> ที่มี img (src=<b>view.jpg</b>, alt=<b>วิวภูเขา</b>) และ <b>figcaption</b> = <b>ภาพถ่ายจากดอยอินทนนท์</b>', starter: ``, hint: 'วาง img และ figcaption ไว้ใน figure', xp: 60, check: (o, c, d) => W.attr(d, "figure img", "src") === "view.jpg" && W.attr(d, "figure img", "alt") === "วิวภูเขา" && W.txt(d, "figure figcaption") === "ภาพถ่ายจากดอยอินทนนท์" },
          { title: "ฝังวิดีโอ", desc: "video ต้องมี controls ไม่งั้นผู้ใช้จะกดเล่นไม่ได้", goal: 'ฝังวิดีโอ <b>src="clip.mp4"</b> ที่มีปุ่มควบคุม (<b>controls</b>) และกว้าง <b>400</b>', starter: ``, hint: '<code>&lt;video src="clip.mp4" controls width="400"&gt;&lt;/video&gt;</code>', xp: 60, check: (o, c, d) => { const v = W.q(d, "video"); return !!v && W.attr(d, v, "src") === "clip.mp4" && v.hasAttribute("controls") && W.attr(d, v, "width") === "400"; } },
          { title: "ฝังหน้าเว็บด้วย iframe", desc: "iframe เปิดหน้าเว็บอื่นซ้อนในหน้าเรา ควรใส่ title อธิบายเสมอเพื่อการเข้าถึง", goal: 'ฝัง iframe ที่ <b>src="https://example.com"</b> พร้อม <b>title="ตัวอย่างเว็บไซต์"</b>', starter: ``, hint: '<code>&lt;iframe src="https://example.com" title="ตัวอย่างเว็บไซต์"&gt;&lt;/iframe&gt;</code>', xp: 60, check: (o, c, d) => W.attr(d, "iframe", "src") === "https://example.com" && W.attr(d, "iframe", "title") === "ตัวอย่างเว็บไซต์" }
        ]
      },
      {
        id: "htable", icon: "html", title: "หน่วยที่ 5: ตาราง",
        blurb: "แสดงข้อมูลเป็นแถวและคอลัมน์ หัวตาราง และการผสานช่อง",
        lesson: [
          { h: "โครงสร้างตาราง", p: "<b>&lt;table&gt;</b> ครอบทั้งตาราง • <b>&lt;tr&gt;</b> (table row) หนึ่งแถว • <b>&lt;td&gt;</b> (table data) หนึ่งช่องข้อมูล — จำนวน td ในแต่ละ tr ควรเท่ากัน", code: "<table>\n  <tr><td>A1</td><td>B1</td></tr>\n  <tr><td>A2</td><td>B2</td></tr>\n</table>" },
          { h: "หัวตารางและส่วนประกอบ", p: "<b>&lt;th&gt;</b> ช่องหัวตาราง (ตัวหนา จัดกึ่งกลางอัตโนมัติ) • จัดกลุ่มด้วย <b>&lt;thead&gt;</b>, <b>&lt;tbody&gt;</b>, <b>&lt;tfoot&gt;</b> ช่วยให้โครงสร้างชัดและจัดสไตล์ง่าย • <b>&lt;caption&gt;</b> คือชื่อตาราง วางเป็นแท็กแรกใน table" },
          { h: "ผสานช่อง", p: "<b>colspan=\"n\"</b> ผสานช่องในแนวนอน n ช่อง • <b>rowspan=\"n\"</b> ผสานในแนวตั้ง n แถว — เมื่อผสานแล้วต้องลดจำนวน td ในแถวนั้นลงตามที่ผสานไป", code: "<tr>\n  <td colspan=\"2\">กินพื้นที่ 2 ช่อง</td>\n</tr>" },
          { h: "ข้อควรรู้", p: "ตารางมีไว้แสดง<b>ข้อมูลตาราง</b>เท่านั้น ไม่ควรใช้จัดเลย์เอาต์หน้าเว็บ (สมัยก่อนนิยมทำ แต่ปัจจุบันใช้ CSS Flexbox/Grid แทน) — และควรใส่ th กับ caption เพื่อให้โปรแกรมอ่านหน้าจอเข้าใจตาราง" }
        ],
        stages: [
          { title: "ตารางแรก", desc: "table ครอบ, tr คือแถว, td คือช่อง", goal: 'สร้างตาราง <b>1 แถว 2 ช่อง</b>: <b>มะลิ</b> และ <b>15</b>', starter: ``, hint: '<code>&lt;table&gt;&lt;tr&gt;&lt;td&gt;มะลิ&lt;/td&gt;&lt;td&gt;15&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</code>', xp: 40, check: (o, c, d) => { const td = W.qa(d, "table tr td").map(e => W.txt(e)); return td.join(",") === "มะลิ,15"; } },
          { title: "หัวตารางด้วย th", desc: "แถวแรกที่เป็นชื่อคอลัมน์ใช้ th ไม่ใช่ td", goal: 'ตาราง 2 แถว: แถวหัวใช้ <b>th</b> = <b>ชื่อ</b>, <b>อายุ</b> และแถวข้อมูลใช้ td = <b>มะลิ</b>, <b>15</b>', starter: ``, hint: 'แถวแรกใช้ <code>&lt;th&gt;</code> แถวสองใช้ <code>&lt;td&gt;</code>', xp: 50, check: (o, c, d) => { const th = W.qa(d, "table th").map(e => W.txt(e)); const td = W.qa(d, "table td").map(e => W.txt(e)); return th.join(",") === "ชื่อ,อายุ" && td.join(",") === "มะลิ,15"; } },
          { title: "ชื่อตารางและ thead/tbody", desc: "caption คือชื่อตาราง ส่วน thead/tbody แยกส่วนหัวกับส่วนข้อมูลให้ชัดเจน", goal: 'เพิ่ม <b>caption</b> = <b>รายชื่อนักเรียน</b>, ใส่แถวหัวไว้ใน <b>thead</b> และแถวข้อมูลไว้ใน <b>tbody</b>', starter: `<table>\n  <tr><th>ชื่อ</th><th>อายุ</th></tr>\n  <tr><td>มะลิ</td><td>15</td></tr>\n</table>\n`, hint: 'caption วางเป็นแท็กแรกใน table แล้วห่อแถวด้วย thead/tbody', xp: 60, check: (o, c, d) => W.txt(d, "table caption") === "รายชื่อนักเรียน" && W.qa(d, "thead th").length === 2 && W.qa(d, "tbody td").length === 2 },
          { title: "ผสานช่องแนวนอน colspan", desc: "แถวสรุปมักกินพื้นที่หลายคอลัมน์ ใช้ colspan", goal: 'เพิ่มแถวสุดท้ายที่มีช่องเดียวข้อความ <b>รวมทั้งหมด 2 คน</b> โดยใช้ <b>colspan="2"</b>', starter: `<table>\n  <tr><th>ชื่อ</th><th>อายุ</th></tr>\n  <tr><td>มะลิ</td><td>15</td></tr>\n  <tr><td>ฟ้า</td><td>16</td></tr>\n</table>\n`, hint: '<code>&lt;tr&gt;&lt;td colspan="2"&gt;รวมทั้งหมด 2 คน&lt;/td&gt;&lt;/tr&gt;</code>', xp: 60, check: (o, c, d) => { const cell = W.qa(d, "td[colspan]")[0]; return !!cell && W.attr(d, cell, "colspan") === "2" && W.txt(cell) === "รวมทั้งหมด 2 คน"; } },
          { title: "ผสานช่องแนวตั้ง rowspan", desc: "ข้อมูลที่ใช้ร่วมกันหลายแถวใช้ rowspan — แถวถัดไปต้องลด td ลงหนึ่งช่อง", goal: 'ทำให้ช่อง <b>ม.3</b> กินพื้นที่ <b>2 แถว</b> ด้วย <b>rowspan="2"</b> (แถวที่สองจึงเหลือ td แค่ช่องเดียว)', starter: `<table>\n  <tr><td>ม.3</td><td>มะลิ</td></tr>\n  <tr><td>ม.3</td><td>ฟ้า</td></tr>\n</table>\n`, hint: 'ใส่ rowspan ที่ช่อง ม.3 แถวแรก แล้วลบ td ม.3 ของแถวสองทิ้ง', xp: 80, check: (o, c, d) => { const cell = W.q(d, "td[rowspan]"); return !!cell && W.attr(d, cell, "rowspan") === "2" && W.txt(cell) === "ม.3" && W.qa(d, "tr")[1] && W.qa(W.qa(d, "tr")[1], "td").length === 1; } }
        ]
      },
      {
        id: "hform", icon: "html", title: "หน่วยที่ 6: ฟอร์มรับข้อมูล",
        blurb: "ช่องกรอกข้อมูลทุกชนิด ป้ายกำกับ ตัวเลือก และการตรวจสอบข้อมูลด้วย HTML",
        lesson: [
          { h: "โครงสร้างฟอร์ม", p: "<b>&lt;form&gt;</b> ครอบช่องกรอกทั้งหมด มี <code>action</code> (ส่งไปที่ไหน) และ <code>method</code> (<b>GET</b> ต่อท้าย URL เหมาะกับการค้นหา / <b>POST</b> ส่งแบบซ่อน เหมาะกับข้อมูลส่วนตัว)" },
          { h: "input และชนิดของมัน", p: "<b>&lt;input&gt;</b> เป็นแท็กเดี่ยว เปลี่ยนหน้าตาตาม <code>type</code>: <b>text</b> ข้อความ • <b>email</b> อีเมล (ตรวจรูปแบบให้) • <b>password</b> ซ่อนตัวอักษร • <b>number</b> ตัวเลข • <b>date</b> ปฏิทิน • <b>radio</b> เลือกได้อย่างเดียว • <b>checkbox</b> เลือกได้หลายอย่าง • <b>color</b>, <b>range</b>, <b>file</b> • ทุก input ควรมี <code>name</code> เพื่อให้ระบุได้ตอนส่งข้อมูล" },
          { h: "label ที่ผูกกับช่องกรอก", p: "<b>&lt;label for=\"id\"&gt;</b> ผูกกับ input ที่มี <code>id</code> ตรงกัน — คลิกที่ป้ายแล้วเคอร์เซอร์กระโดดเข้าช่องทันที และโปรแกรมอ่านหน้าจอจะอ่านป้ายให้ผู้ใช้", code: "<label for=\"email\">อีเมล</label>\n<input type=\"email\" id=\"email\" name=\"email\">" },
          { h: "ตัวเลือกและข้อความยาว", p: "<b>&lt;select&gt;</b> + <b>&lt;option value=\"...\"&gt;</b> ทำเมนูดรอปดาวน์ • <b>&lt;textarea rows cols&gt;</b> ช่องข้อความหลายบรรทัด • <b>radio</b> ที่ <code>name</code> เดียวกันจะเลือกได้แค่อันเดียวในกลุ่ม" },
          { h: "ตรวจสอบข้อมูลด้วย HTML", p: "ใส่แอตทริบิวต์แล้วเบราว์เซอร์ตรวจให้ฟรี: <b>required</b> ต้องกรอก • <b>min/max</b> ค่าต่ำสุด/สูงสุด • <b>maxlength</b> ความยาวสูงสุด • <b>pattern</b> รูปแบบตาม regex • <b>placeholder</b> ข้อความจางแนะนำ (ไม่ใช่ค่าเริ่มต้น และแทน label ไม่ได้)" }
        ],
        stages: [
          { title: "ฟอร์มและช่องกรอกแรก", desc: "form ครอบ แล้วใส่ input type=text ที่มี name", goal: 'สร้าง <b>form</b> ที่มี <b>input type="text"</b> และ <b>name="username"</b>', starter: ``, hint: '<code>&lt;form&gt;&lt;input type="text" name="username"&gt;&lt;/form&gt;</code>', xp: 40, check: (o, c, d) => { const i = W.q(d, 'form input[type="text"]'); return !!i && W.attr(d, i, "name") === "username"; } },
          { title: "ป้ายกำกับที่คลิกได้", desc: "label ต้องมี for ตรงกับ id ของ input จึงจะผูกกัน", goal: 'สร้าง <b>label for="email"</b> ข้อความ <b>อีเมล</b> ผูกกับ <b>input type="email" id="email"</b>', starter: `<form>\n\n</form>\n`, hint: 'for ของ label ต้องตรงกับ id ของ input เป๊ะๆ', xp: 50, check: (o, c, d) => { const l = W.q(d, "label"); const i = W.q(d, "#email"); return !!l && !!i && W.attr(d, l, "for") === "email" && W.txt(l) === "อีเมล" && W.attr(d, i, "type") === "email"; } },
          { title: "รหัสผ่านและตัวเลข", desc: "type ที่ถูกต้องช่วยทั้งความปลอดภัยและความสะดวก (มือถือจะเด้งแป้นพิมพ์ให้เหมาะกับชนิดข้อมูล)", goal: 'สร้าง input <b>type="password"</b> (name=<b>pwd</b>) และ input <b>type="number"</b> (name=<b>age</b>)', starter: `<form>\n\n</form>\n`, hint: 'สอง input คนละ type', xp: 50, check: (o, c, d) => W.attr(d, 'input[type="password"]', "name") === "pwd" && W.attr(d, 'input[type="number"]', "name") === "age" },
          { title: "ตัวเลือกเดียวด้วย radio", desc: "radio ที่ name เดียวกันจะกลายเป็นกลุ่มเดียวกัน เลือกได้แค่อันเดียว และควรมี value ต่างกัน", goal: 'สร้าง radio 2 ตัวที่ <b>name="gender"</b> เหมือนกัน value เป็น <b>male</b> และ <b>female</b>', starter: `<form>\n\n</form>\n`, hint: '<code>&lt;input type="radio" name="gender" value="male"&gt;</code>', xp: 60, check: (o, c, d) => { const r = W.qa(d, 'input[type="radio"][name="gender"]').map(e => W.attr(d, e, "value")); return r.length === 2 && r.includes("male") && r.includes("female"); } },
          { title: "เมนูดรอปดาวน์", desc: "select ครอบ option แต่ละตัวเลือกควรมี value สำหรับส่งไปเซิร์ฟเวอร์", goal: 'สร้าง <b>select name="city"</b> ที่มี 2 option: value=<b>bkk</b> ข้อความ <b>กรุงเทพ</b> และ value=<b>cnx</b> ข้อความ <b>เชียงใหม่</b>', starter: `<form>\n\n</form>\n`, hint: '<code>&lt;select name="city"&gt;&lt;option value="bkk"&gt;กรุงเทพ&lt;/option&gt;...&lt;/select&gt;</code>', xp: 60, check: (o, c, d) => { const s = W.q(d, 'select[name="city"]'); if (!s) return false; const op = W.qa(s, "option"); return op.length === 2 && W.attr(d, op[0], "value") === "bkk" && W.txt(op[0]) === "กรุงเทพ" && W.attr(d, op[1], "value") === "cnx"; } },
          { title: "ข้อความยาวและปุ่มส่ง", desc: "textarea สำหรับข้อความหลายบรรทัด และปุ่ม submit สำหรับส่งฟอร์ม", goal: 'สร้าง <b>textarea name="message"</b> ที่มี <b>placeholder="พิมพ์ข้อความ"</b> และปุ่ม <b>&lt;button type="submit"&gt;ส่ง&lt;/button&gt;</b>', starter: `<form>\n\n</form>\n`, hint: 'textarea มีแท็กปิดเสมอ ส่วนปุ่มใช้ button type="submit"', xp: 60, check: (o, c, d) => { const t = W.q(d, 'textarea[name="message"]'); const b = W.q(d, 'button[type="submit"]'); return !!t && W.attr(d, t, "placeholder") === "พิมพ์ข้อความ" && !!b && W.txt(b) === "ส่ง"; } },
          { title: "ตรวจข้อมูลอัตโนมัติ", desc: "ใส่แอตทริบิวต์ไม่กี่ตัว เบราว์เซอร์ก็ตรวจให้ฟรีโดยไม่ต้องเขียน JavaScript เลย", goal: 'ทำให้ช่องอีเมล <b>required</b> และช่องอายุ <b>required</b> พร้อมกำหนด <b>min="1"</b> และ <b>max="120"</b>', starter: `<form>\n  <input type="email" name="email">\n  <input type="number" name="age">\n  <button type="submit">สมัคร</button>\n</form>\n`, hint: 'เพิ่ม required ในทั้งสองช่อง และ min/max ในช่อง number', xp: 80, check: (o, c, d) => { const e = W.q(d, 'input[type="email"]'), a = W.q(d, 'input[type="number"]'); return !!e && e.hasAttribute("required") && !!a && a.hasAttribute("required") && W.attr(d, a, "min") === "1" && W.attr(d, a, "max") === "120"; } }
        ]
      },
      {
        id: "hsem", icon: "html", title: "หน่วยที่ 7: Semantic HTML และโครงหน้าเว็บ",
        blurb: "แท็กที่สื่อความหมาย โครงหน้าเว็บมาตรฐาน และ meta สำหรับ SEO",
        lesson: [
          { h: "Semantic คืออะไร ทำไมสำคัญ", p: "แท็ก<b>เชิงความหมาย</b>บอกว่าเนื้อหาส่วนนั้น<b>คืออะไร</b> ไม่ใช่แค่กล่องเปล่าๆ อย่าง div — ผลคือ Google เข้าใจหน้าเว็บดีขึ้น (SEO), โปรแกรมอ่านหน้าจอนำทางผู้พิการได้, และโค้ดอ่านง่ายขึ้นมาก" },
          { h: "แท็กโครงหน้าเว็บ", p: "<b>&lt;header&gt;</b> ส่วนหัว (โลโก้ ชื่อเว็บ) • <b>&lt;nav&gt;</b> เมนูนำทาง • <b>&lt;main&gt;</b> เนื้อหาหลัก (มีได้ 1 อันต่อหน้า) • <b>&lt;section&gt;</b> ส่วนเนื้อหาที่มีหัวข้อ • <b>&lt;article&gt;</b> เนื้อหาที่แยกไปอยู่ที่อื่นได้ เช่น โพสต์บล็อก • <b>&lt;aside&gt;</b> เนื้อหาข้างเคียง • <b>&lt;footer&gt;</b> ส่วนท้าย", code: "<header>...</header>\n<nav>...</nav>\n<main>\n  <article>...</article>\n</main>\n<footer>...</footer>" },
          { h: "div และ span ยังจำเป็น", p: "<b>&lt;div&gt;</b> กล่องระดับบล็อก และ <b>&lt;span&gt;</b> กล่องระดับบรรทัด ไม่มีความหมายในตัว — ใช้เมื่อต้องการกล่องไว้จัดสไตล์เท่านั้น ถ้ามีแท็ก semantic ที่ตรงกว่า ให้เลือกอันนั้นก่อน" },
          { h: "id และ class", p: "<b>id</b> ชื่อเฉพาะตัว ห้ามซ้ำในหน้าเดียว (ใช้กับลิงก์ #anchor และ JavaScript) • <b>class</b> ใช้ซ้ำได้ ใส่หลายค่าคั่นด้วยเว้นวรรค (ใช้จัดสไตล์เป็นกลุ่ม) — นี่คือสะพานเชื่อมไปยัง CSS ที่จะเรียนหน่วยถัดไป" },
          { h: "meta สำหรับ SEO และมือถือ", p: "<code>&lt;meta name=\"description\" content=\"...\"&gt;</code> คำอธิบายที่ Google เอาไปแสดงในผลค้นหา • <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</code> จำเป็นมากสำหรับมือถือ ถ้าไม่ใส่หน้าเว็บจะถูกย่อจนอ่านไม่ออก" }
        ],
        stages: [
          { title: "ส่วนหัวและเมนู", desc: "header คือส่วนหัวเว็บ ข้างในมักมี nav ที่เก็บเมนูเป็นลิสต์ลิงก์", goal: 'สร้าง <b>header</b> ที่มี h1 = <b>ร้านกาแฟ</b> และข้างในมี <b>nav</b> ที่มีลิงก์ 2 อัน: <b>หน้าแรก</b>, <b>เมนู</b>', starter: ``, hint: 'วาง h1 และ nav (ที่มี a สองตัว) ไว้ใน header', xp: 60, check: (o, c, d) => { const a = W.qa(d, "header nav a").map(e => W.txt(e)); return W.txt(d, "header h1") === "ร้านกาแฟ" && a.join(",") === "หน้าแรก,เมนู"; } },
          { title: "เนื้อหาหลักและบทความ", desc: "main คือเนื้อหาหลักของหน้า ส่วน article คือชิ้นเนื้อหาที่สมบูรณ์ในตัว", goal: 'สร้าง <b>main</b> ที่ข้างในมี <b>article</b> ซึ่งมี h2 = <b>เมล็ดกาแฟคั่วใหม่</b> และย่อหน้า <b>หอมกรุ่นทุกเช้า</b>', starter: ``, hint: 'ซ้อนกัน: main > article > (h2 + p)', xp: 60, check: (o, c, d) => W.txt(d, "main article h2") === "เมล็ดกาแฟคั่วใหม่" && W.txt(d, "main article p") === "หอมกรุ่นทุกเช้า" },
          { title: "แถบข้างและส่วนท้าย", desc: "aside คือเนื้อหาเสริมข้างเคียง footer คือส่วนท้ายเว็บ", goal: 'สร้าง <b>aside</b> ข้อความ <b>โปรโมชั่นเดือนนี้</b> และ <b>footer</b> ข้อความ <b>© 2026 ร้านกาแฟ</b>', starter: ``, hint: 'ใช้ <code>&amp;copy;</code> สำหรับเครื่องหมาย ©', xp: 50, check: (o, c, d) => W.txt(d, "aside") === "โปรโมชั่นเดือนนี้" && W.txt(d, "footer") === "© 2026 ร้านกาแฟ" },
          { title: "id และ class", desc: "id ใช้ครั้งเดียว class ใช้ซ้ำได้ — เตรียมไว้ให้ CSS และ JavaScript เรียกใช้", goal: 'สร้าง div ที่มี <b>id="hero"</b> และ 2 ย่อหน้าที่มี <b>class="note"</b> เหมือนกัน (ข้อความ <b>ข้อความหนึ่ง</b> และ <b>ข้อความสอง</b>)', starter: ``, hint: '<code>&lt;div id="hero"&gt;</code> และ <code>&lt;p class="note"&gt;</code> สองตัว', xp: 60, check: (o, c, d) => { const n = W.qa(d, "p.note").map(e => W.txt(e)); return W.has(d, "div#hero") && n.length === 2 && n[0] === "ข้อความหนึ่ง" && n[1] === "ข้อความสอง"; } },
          { title: "meta สำหรับมือถือและ SEO", desc: "สองบรรทัดนี้อยู่ในเว็บมืออาชีพทุกเว็บ — viewport ทำให้แสดงผลบนมือถือถูกต้อง description แสดงในผลค้นหา Google", goal: 'ใน head เพิ่ม <b>meta viewport</b> (content = <b>width=device-width, initial-scale=1.0</b>) และ <b>meta description</b> (content = <b>ร้านกาแฟคั่วสดใจกลางเมือง</b>)', starter: `<!DOCTYPE html>\n<html lang="th">\n<head>\n  <meta charset="UTF-8">\n  <title>ร้านกาแฟ</title>\n\n</head>\n<body>\n  <h1>ร้านกาแฟ</h1>\n</body>\n</html>\n`, hint: '<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>', xp: 60, check: (o, c, d) => { const v = W.q(d, 'meta[name="viewport"]'), s = W.q(d, 'meta[name="description"]'); return !!v && W.attr(d, v, "content").includes("width=device-width") && !!s && W.attr(d, s, "content") === "ร้านกาแฟคั่วสดใจกลางเมือง"; } },
          { title: "ประกอบหน้าเว็บทั้งหน้า", desc: "รวมทุกอย่างที่เรียนมา: โครงหน้าเว็บมาตรฐานที่เว็บจริงใช้กัน header → nav → main → footer", goal: 'สร้างหน้าเว็บที่มีครบ 4 ส่วนตามลำดับ: <b>header</b> (มี h1 = <b>บล็อกของฉัน</b>), <b>nav</b>, <b>main</b> (มี article พร้อม h2 = <b>โพสต์แรก</b>), และ <b>footer</b> (ข้อความ <b>ติดต่อ: mali@example.com</b>)', starter: `<!DOCTYPE html>\n<html lang="th">\n<head>\n  <meta charset="UTF-8">\n  <title>บล็อกของฉัน</title>\n</head>\n<body>\n\n</body>\n</html>\n`, hint: 'เรียง header, nav, main (ข้างในมี article), footer ใน body', xp: 100, check: (o, c, d) => W.txt(d, "header h1") === "บล็อกของฉัน" && W.has(d, "nav") && W.txt(d, "main article h2") === "โพสต์แรก" && W.txt(d, "footer").includes("mali@example.com") }
        ]
      },
      {
        id: "hadv", icon: "html", title: "หน่วยที่ 8: HTML ขั้นสูง",
        blurb: "data attribute การเข้าถึง (a11y) การเชื่อมไฟล์ภายนอก และแท็กสมัยใหม่",
        lesson: [
          { h: "data-* เก็บข้อมูลในแท็ก", p: "แอตทริบิวต์ที่ขึ้นต้นด้วย <b>data-</b> ใช้แนบข้อมูลไว้กับอิลิเมนต์โดยไม่กระทบการแสดงผล เช่น <code>data-id=\"42\"</code> — JavaScript อ่านได้ผ่าน <code>element.dataset.id</code> นิยมมากในเว็บสมัยใหม่" },
          { h: "การเข้าถึง (Accessibility)", p: "ทำให้ทุกคนใช้เว็บได้ รวมถึงผู้พิการทางสายตา: ใส่ <b>alt</b> ทุกภาพ • ใช้ <b>label</b> คู่กับ input • ปุ่มไอคอนที่ไม่มีข้อความต้องมี <b>aria-label</b> บอกว่าปุ่มทำอะไร • ใช้แท็ก semantic แทน div • เรียงหัวข้อ h1-h6 ตามลำดับ" },
          { h: "เชื่อมไฟล์ภายนอก", p: "<b>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b> เชื่อมไฟล์ CSS (วางใน head) • <b>&lt;link rel=\"icon\" href=\"favicon.ico\"&gt;</b> ไอคอนบนแท็บ • <b>&lt;script src=\"app.js\" defer&gt;&lt;/script&gt;</b> เชื่อมไฟล์ JavaScript — <code>defer</code> ทำให้สคริปต์รอจน HTML โหลดเสร็จก่อนค่อยทำงาน (ปลอดภัยกว่าและเร็วกว่า)" },
          { h: "แท็กสมัยใหม่ที่มีประโยชน์", p: "<b>&lt;details&gt;</b> + <b>&lt;summary&gt;</b> กล่องพับเก็บได้โดยไม่ต้องใช้ JavaScript • <b>&lt;progress value max&gt;</b> แถบความคืบหน้า • <b>&lt;meter&gt;</b> มาตรวัด • <b>&lt;time datetime&gt;</b> เวลาที่เครื่องอ่านได้ • <b>&lt;template&gt;</b> เก็บโครง HTML ไว้ให้ JavaScript โคลนไปใช้" }
        ],
        stages: [
          { title: "แนบข้อมูลด้วย data-*", desc: "data-* คือที่เก็บข้อมูลลับในแท็ก ที่ JavaScript หยิบไปใช้ต่อได้", goal: 'สร้างปุ่มข้อความ <b>ซื้อเลย</b> ที่มี <b>data-product-id="42"</b> และ <b>data-price="250"</b>', starter: ``, hint: '<code>&lt;button data-product-id="42" data-price="250"&gt;ซื้อเลย&lt;/button&gt;</code>', xp: 60, check: (o, c, d) => { const b = W.q(d, "button"); return !!b && W.attr(d, b, "data-product-id") === "42" && W.attr(d, b, "data-price") === "250" && W.txt(b) === "ซื้อเลย"; } },
          { title: "ปุ่มไอคอนที่ทุกคนเข้าใจ", desc: "ปุ่มที่มีแต่ไอคอนไม่มีข้อความ ผู้ใช้โปรแกรมอ่านหน้าจอจะไม่รู้ว่าคืออะไร ต้องใส่ aria-label", goal: 'เพิ่ม <b>aria-label="ปิดหน้าต่าง"</b> ให้ปุ่มไอคอนนี้', starter: `<button>✕</button>\n`, hint: '<code>&lt;button aria-label="ปิดหน้าต่าง"&gt;✕&lt;/button&gt;</code>', xp: 60, check: (o, c, d) => W.attr(d, "button", "aria-label") === "ปิดหน้าต่าง" },
          { title: "เชื่อมไฟล์ CSS และ JS", desc: "เว็บจริงแยกไฟล์ CSS และ JS ออกจาก HTML — link วางใน head ส่วน script ใส่ defer", goal: 'ใน head เพิ่ม <b>link stylesheet</b> ไปที่ <b>style.css</b> และ <b>script</b> ที่ <b>src="app.js"</b> พร้อม <b>defer</b>', starter: `<!DOCTYPE html>\n<html lang="th">\n<head>\n  <meta charset="UTF-8">\n  <title>เว็บของฉัน</title>\n\n</head>\n<body>\n  <h1>หน้าแรก</h1>\n</body>\n</html>\n`, hint: '<code>&lt;link rel="stylesheet" href="style.css"&gt;</code> และ <code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code>', xp: 60, check: (o, c, d) => { const l = W.q(d, 'link[rel="stylesheet"]'), s = W.q(d, "script[src]"); return !!l && W.attr(d, l, "href") === "style.css" && !!s && W.attr(d, s, "src") === "app.js" && s.hasAttribute("defer"); } },
          { title: "กล่องพับเก็บได้", desc: "details/summary ทำ FAQ แบบกดเปิด-ปิดได้เลย ไม่ต้องเขียน JavaScript สักบรรทัด", goal: 'สร้าง <b>details</b> ที่มี <b>summary</b> = <b>คำถามที่พบบ่อย</b> และข้างในมีย่อหน้า <b>เราส่งของทุกวันจันทร์</b>', starter: ``, hint: '<code>&lt;details&gt;&lt;summary&gt;...&lt;/summary&gt;&lt;p&gt;...&lt;/p&gt;&lt;/details&gt;</code>', xp: 60, check: (o, c, d) => W.txt(d, "details summary") === "คำถามที่พบบ่อย" && W.txt(d, "details p") === "เราส่งของทุกวันจันทร์" },
          { title: "บอสหน่วย: การ์ดโปรไฟล์", desc: "รวมทุกอย่างในคอร์ส HTML: semantic, รูปพร้อม alt, ลิสต์, ลิงก์, data attribute และการเข้าถึง", goal: 'สร้าง <b>article class="card"</b> ที่ข้างในมีครบ: <b>img</b> (alt=<b>รูปโปรไฟล์</b>), <b>h2</b> = <b>มะลิ นักพัฒนาเว็บ</b>, <b>ul</b> ที่มี 2 li (<b>HTML</b>, <b>CSS</b>) และ <b>a</b> ที่ href = <b>mailto:mali@example.com</b>', starter: `<article class="card">\n\n</article>\n`, hint: 'ใส่ img, h2, ul>li สองตัว และ a href="mailto:..." ไว้ใน article', xp: 120, check: (o, c, d) => { const card = W.q(d, "article.card"); if (!card) return false; const li = W.qa(card, "ul li").map(e => W.txt(e)); return W.attr(d, W.q(card, "img"), "alt") === "รูปโปรไฟล์" && W.txt(W.q(card, "h2")) === "มะลิ นักพัฒนาเว็บ" && li.join(",") === "HTML,CSS" && W.attr(d, W.q(card, "a"), "href") === "mailto:mali@example.com"; } }
        ]
      }
    ]
  },
  css: {
    name: "CSS3", icon: "🎨",
    tagline: "แต่งหน้าทาปากให้เว็บ — สี ตัวอักษร กล่อง เลย์เอาต์ Flexbox/Grid แอนิเมชัน และการรองรับมือถือ",
    topics: [
      {
        id: "cssbasic", icon: "css", title: "หน่วยที่ 1: พื้นฐาน CSS และ Selector",
        blurb: "ไวยากรณ์ CSS วิธีเชื่อมกับ HTML และการเลือกอิลิเมนต์ด้วย element / class / id",
        lesson: [
          { h: "CSS คืออะไร", p: "<b>CSS (Cascading Style Sheets)</b> คือภาษาที่กำหนดหน้าตาให้ HTML — สี ขนาด ระยะห่าง ตำแหน่ง ทุกอย่างที่ทำให้เว็บสวย • คำว่า <b>Cascading</b> หมายถึงกฎจะไหลซ้อนทับกัน ตัวที่เจาะจงกว่าหรือมาทีหลังจะชนะ" },
          { h: "ไวยากรณ์ของกฎ CSS", p: "หนึ่งกฎประกอบด้วย <b>selector</b> (จะแต่งใคร) และ <b>declaration block</b> ใน { } ที่มีคู่ <b>property: value;</b> — อย่าลืมเซมิโคลอนท้ายทุกบรรทัด และคอมเมนต์เขียนด้วย <code>/* ... */</code>", code: "h1 {\n  color: blue;\n  font-size: 32px;\n}" },
          { h: "เชื่อม CSS กับ HTML 3 วิธี", p: "<b>1) External</b> ไฟล์แยก <code>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</code> — วิธีมาตรฐานที่ควรใช้ • <b>2) Internal</b> เขียนใน <code>&lt;style&gt;</code> ในหน้า • <b>3) Inline</b> เขียนใน <code>style=\"...\"</code> ของแท็ก — แรงที่สุดแต่ควรเลี่ยงเพราะแก้ยากและใช้ซ้ำไม่ได้ (ในเกมนี้เราเขียนแบบ internal ให้อัตโนมัติ)" },
          { h: "Selector พื้นฐาน 3 แบบ", p: "<b>element</b> เลือกทุกแท็กนั้น เช่น <code>p { }</code> • <b>.class</b> เลือกตาม class ใช้ซ้ำได้ เช่น <code>.card { }</code> • <b>#id</b> เลือกตาม id ใช้ครั้งเดียว เช่น <code>#header { }</code> • <b>*</b> เลือกทุกอย่าง — ความแรง: inline &gt; id &gt; class &gt; element", code: "p { color: gray; }\n.warn { color: orange; }\n#main { color: black; }" },
          { h: "การสืบทอด (Inheritance)", p: "คุณสมบัติเกี่ยวกับข้อความ เช่น <code>color</code>, <code>font-family</code>, <code>font-size</code> จะ<b>ตกทอด</b>จากพ่อแม่ไปลูกอัตโนมัติ — จึงนิยมตั้งค่าฟอนต์ที่ <code>body</code> ครั้งเดียวแล้วใช้ทั้งเว็บ ส่วนคุณสมบัติอย่าง border, padding ไม่ตกทอด" }
        ],
        stages: [
          { html: `<h1>หัวข้อหลัก</h1>`, title: "กฎ CSS แรก", desc: "เลือกด้วยชื่อแท็ก แล้วกำหนดสีในวงเล็บปีกกา", goal: 'ทำให้ <b>h1</b> เป็นสี <b>blue</b>', starter: `/* เขียนกฎ CSS ตรงนี้ */\n`, hint: '<code>h1 { color: blue; }</code>', xp: 30, check: (o, c, d) => W.cssColor(d, "h1", "color", "blue") },
          { html: `<h1>ร้านกาแฟ</h1><p>เปิดทุกวัน</p>`, title: "หลายกฎในไฟล์เดียว", desc: "เขียนหลายกฎต่อกันได้ แต่ละกฎแต่ง selector คนละตัว", goal: 'ทำให้ <b>h1</b> สี <b>#e74c3c</b> ขนาด <b>40px</b> และ <b>p</b> สี <b>gray</b>', starter: ``, hint: 'สองบล็อกกฎ: h1 { color; font-size; } และ p { color; }', xp: 40, check: (o, c, d) => W.cssColor(d, "h1", "color", "#e74c3c") && W.cssNum(d, "h1", "font-size") === 40 && W.cssColor(d, "p", "color", "gray") },
          { html: `<p class="warn">คำเตือน</p><p>ข้อความปกติ</p>`, title: "เลือกด้วย class", desc: "class ใช้ซ้ำได้ เขียน selector นำหน้าด้วยจุด", goal: 'ทำให้เฉพาะย่อหน้าที่มี <b>class="warn"</b> เป็นสี <b>orange</b> และตัวหนา (<b>font-weight: bold</b>)', starter: ``, hint: '<code>.warn { color: orange; font-weight: bold; }</code>', xp: 50, check: (o, c, d) => W.cssColor(d, ".warn", "color", "orange") && ["bold", "700"].includes(W.cssv(d, ".warn", "font-weight")) },
          { html: `<div id="hero">แบนเนอร์</div><div>กล่องธรรมดา</div>`, title: "เลือกด้วย id", desc: "id ใช้ได้ครั้งเดียวในหน้า เขียน selector นำหน้าด้วย #", goal: 'ทำให้ <b>#hero</b> มีพื้นหลัง <b>#2c3e50</b> ตัวอักษรสี <b>white</b> และ <b>padding: 20px</b>', starter: ``, hint: '<code>#hero { background-color: #2c3e50; color: white; padding: 20px; }</code>', xp: 50, check: (o, c, d) => W.cssColor(d, "#hero", "background-color", "#2c3e50") && W.cssColor(d, "#hero", "color", "white") && W.cssNum(d, "#hero", "padding-top") === 20 },
          { html: `<body><h2>หัวข้อ</h2><p>ข้อความ</p></body>`, title: "การสืบทอดจาก body", desc: "ตั้งค่าที่ body ครั้งเดียว ลูกหลานได้รับไปด้วยทั้งหมด — เทคนิคที่ทุกเว็บใช้", goal: 'ตั้งที่ <b>body</b>: <b>font-family: Arial</b> และ <b>color: #333333</b> (h2 กับ p ต้องได้สีนี้ตามไปด้วยโดยไม่ต้องเขียนเพิ่ม)', starter: ``, hint: 'เขียนกฎเดียวที่ body — ห้ามเขียนกฎให้ h2 หรือ p', xp: 60, check: (o, c, d) => W.cssColor(d, "h2", "color", "#333333") && W.cssColor(d, "p", "color", "#333333") && /font-family/.test(c) && !/^\s*(h2|p)\s*\{/m.test(c) },
          { html: `<p class="note">หมายเหตุ</p>`, title: "คอมเมนต์ใน CSS", desc: "คอมเมนต์ CSS ใช้ /* */ เท่านั้น (ไม่มีแบบ // เหมือนภาษาอื่น)", goal: 'ใช้คอมเมนต์ <b>ปิด</b>บรรทัด background-color ไม่ให้ทำงาน (เหลือแค่สีตัวอักษร <b>green</b>)', starter: `.note {\n  color: green;\n  background-color: red;\n}\n`, hint: 'ครอบบรรทัดนั้นด้วย <code>/*</code> และ <code>*/</code>', xp: 40, check: (o, c, d) => W.cssColor(d, ".note", "color", "green") && !W.cssColor(d, ".note", "background-color", "red") && /\/\*/.test(c) }
        ]
      },
      {
        id: "csstext", icon: "css", title: "หน่วยที่ 2: สีและตัวอักษร",
        blurb: "ระบบสี ฟอนต์ ขนาด น้ำหนัก การจัดข้อความ และระยะห่างบรรทัด",
        lesson: [
          { h: "ระบบสีใน CSS", p: "เขียนสีได้หลายแบบ: <b>ชื่อสี</b> (red, tomato) • <b>HEX</b> <code>#ff0000</code> หรือย่อ <code>#f00</code> • <b>RGB</b> <code>rgb(255,0,0)</code> • <b>RGBA</b> เพิ่มความโปร่งใส <code>rgba(255,0,0,0.5)</code> • <b>HSL</b> <code>hsl(0,100%,50%)</code> ปรับเฉดง่าย — <code>color</code> คือสีตัวอักษร <code>background-color</code> คือสีพื้นหลัง" },
          { h: "ฟอนต์และขนาด", p: "<b>font-family</b> ใส่หลายตัวคั่นด้วย , เป็นลำดับสำรอง (font stack) ปิดท้ายด้วยชนิดทั่วไป เช่น sans-serif • <b>font-size</b> หน่วย <code>px</code> (คงที่), <code>em</code> (เท่าตัวพ่อแม่), <code>rem</code> (เท่าตัว root — แนะนำ), <code>%</code> • <b>font-weight</b> normal/bold หรือ 100-900 • <b>font-style</b> italic", code: "body {\n  font-family: 'Kanit', Arial, sans-serif;\n  font-size: 16px;\n}" },
          { h: "จัดข้อความ", p: "<b>text-align</b> left/center/right/justify • <b>line-height</b> ระยะห่างบรรทัด (นิยมใส่เป็นตัวเลขล้วน เช่น 1.6 = 1.6 เท่าของขนาดฟอนต์ อ่านสบายตาที่สุด) • <b>text-decoration</b> underline/none (ใช้ลบเส้นใต้ลิงก์) • <b>text-transform</b> uppercase/lowercase/capitalize • <b>letter-spacing</b> ระยะห่างตัวอักษร" },
          { h: "เงาและการจัดวางข้อความ", p: "<b>text-shadow: x y blur สี</b> เพิ่มเงาให้ตัวอักษร • <b>text-indent</b> เยื้องบรรทัดแรก • <b>white-space: nowrap</b> ไม่ให้ตัดบรรทัด • <b>text-overflow: ellipsis</b> ตัดข้อความยาวเป็น ... (ต้องใช้คู่กับ overflow: hidden)" }
        ],
        stages: [
          { html: `<h1>พาดหัวข่าว</h1>`, title: "สีแบบ HEX", desc: "HEX คือรหัสสี 6 หลัก แบ่งเป็นแดง-เขียว-น้ำเงินอย่างละ 2 หลัก", goal: 'ทำให้ h1 มีสีตัวอักษร <b>#ffffff</b> และพื้นหลัง <b>#8e44ad</b>', starter: ``, hint: '<code>h1 { color: #ffffff; background-color: #8e44ad; }</code>', xp: 40, check: (o, c, d) => W.cssColor(d, "h1", "color", "#ffffff") && W.cssColor(d, "h1", "background-color", "#8e44ad") },
          { html: `<div class="glass">กล่องโปร่งแสง</div>`, title: "สีโปร่งใสด้วย RGBA", desc: "RGBA เพิ่มค่าที่ 4 คือความทึบ 0 (ใส) ถึง 1 (ทึบ) — ใช้ทำพื้นหลังโปร่งแสงทับรูป", goal: 'ทำให้ <b>.glass</b> มีพื้นหลัง <b>rgba(0, 0, 0, 0.5)</b>', starter: ``, hint: '<code>background-color: rgba(0, 0, 0, 0.5);</code>', xp: 50, check: (o, c, d) => /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.5\s*\)/.test(W.cssv(d, ".glass", "background-color").replace(/\s+/g, " ")) || /rgba\(0,\s*0,\s*0,\s*0?\.5\)/.test(c.replace(/\s+/g, " ")) },
          { html: `<body><p>ข้อความตัวอย่างสำหรับทดสอบฟอนต์</p></body>`, title: "ฟอนต์และ font stack", desc: "ใส่ฟอนต์สำรองหลายตัว ถ้าเครื่องผู้ใช้ไม่มีตัวแรกจะไล่ไปตัวถัดไป", goal: 'ตั้งที่ <b>body</b>: <b>font-family: Kanit, Arial, sans-serif</b> และ <b>font-size: 18px</b>', starter: ``, hint: "<code>font-family: Kanit, Arial, sans-serif;</code>", xp: 50, check: (o, c, d) => { const f = W.cssv(d, "body", "font-family"); return f.includes("kanit") && f.includes("sans-serif") && W.cssNum(d, "body", "font-size") === 18; } },
          { html: `<h2>หัวข้อกลางหน้า</h2><p class="lead">ย่อหน้านำ</p>`, title: "จัดข้อความและน้ำหนัก", desc: "text-align จัดตำแหน่ง ส่วน font-weight คุมความหนา (ตัวเลข 700 = bold)", goal: 'ทำให้ <b>h2</b> จัด <b>กึ่งกลาง</b> และ <b>.lead</b> มี <b>font-weight: 700</b> กับ <b>font-style: italic</b>', starter: ``, hint: '<code>text-align: center;</code> และ <code>font-weight: 700; font-style: italic;</code>', xp: 50, check: (o, c, d) => W.cssv(d, "h2", "text-align") === "center" && ["700", "bold"].includes(W.cssv(d, ".lead", "font-weight")) && W.cssv(d, ".lead", "font-style") === "italic" },
          { html: `<article><p>บทความยาวที่ต้องอ่านสบายตา บรรทัดควรห่างกันพอเหมาะ</p></article>`, title: "ระยะห่างบรรทัดที่อ่านสบาย", desc: "line-height 1.5-1.8 คือช่วงที่อ่านสบายที่สุดสำหรับเนื้อหายาว", goal: 'ทำให้ <b>p</b> มี <b>line-height: 1.7</b> และ <b>letter-spacing: 0.5px</b>', starter: ``, hint: '<code>line-height: 1.7; letter-spacing: 0.5px;</code>', xp: 50, check: (o, c, d) => parseFloat(W.cssv(d, "p", "line-height")) === 1.7 && W.cssNum(d, "p", "letter-spacing") === 0.5 },
          { html: `<a href="#" class="btn">คลิกที่นี่</a>`, title: "ลบเส้นใต้ลิงก์", desc: "ลิงก์มีเส้นใต้มาโดยปริยาย เว็บสมัยใหม่มักลบออกแล้วแต่งเป็นปุ่มแทน", goal: 'ทำให้ <b>.btn</b> ไม่มีเส้นใต้ (<b>text-decoration: none</b>) ตัวพิมพ์ใหญ่ทั้งหมด (<b>text-transform: uppercase</b>) และสี <b>#2980b9</b>', starter: ``, hint: '<code>text-decoration: none; text-transform: uppercase;</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".btn", "text-decoration").includes("none") && W.cssv(d, ".btn", "text-transform") === "uppercase" && W.cssColor(d, ".btn", "color", "#2980b9") }
        ]
      },
      {
        id: "cssbox", icon: "css", title: "หน่วยที่ 3: Box Model",
        blurb: "ทุกอย่างในเว็บคือกล่อง — ขนาด ขอบใน ขอบนอก เส้นขอบ และ box-sizing",
        lesson: [
          { h: "ทุกอิลิเมนต์คือกล่อง", p: "แต่ละกล่องมี 4 ชั้นจากในออกนอก: <b>content</b> เนื้อหา → <b>padding</b> ระยะห่างด้านในระหว่างเนื้อหากับขอบ → <b>border</b> เส้นขอบ → <b>margin</b> ระยะห่างด้านนอกระหว่างกล่องกับเพื่อนบ้าน — เข้าใจโมเดลนี้แล้วจัดหน้าเว็บได้ครึ่งทางแล้ว" },
          { h: "เขียนย่อ 4 ทิศ", p: "<code>padding: 10px;</code> ทุกด้าน • <code>padding: 10px 20px;</code> บน-ล่าง / ซ้าย-ขวา • <code>padding: 5px 10px 15px 20px;</code> เรียงตามเข็มนาฬิกา บน-ขวา-ล่าง-ซ้าย • เจาะจงด้านเดียวได้ เช่น <code>margin-top</code> — เทคนิคยอดฮิต <code>margin: 0 auto;</code> คือจัดกล่องให้อยู่กลางแนวนอน" },
          { h: "เส้นขอบและมุมโค้ง", p: "<b>border: ความหนา รูปแบบ สี</b> เช่น <code>border: 2px solid #333;</code> รูปแบบมี solid, dashed, dotted • <b>border-radius</b> ทำมุมโค้ง (ใส่ <code>50%</code> กับกล่องสี่เหลี่ยมจัตุรัสจะได้วงกลม)" },
          { h: "box-sizing ตัวช่วยชีวิต", p: "ปกติ <code>width: 200px</code> นับเฉพาะเนื้อหา พอเพิ่ม padding กับ border กล่องจะกว้างเกิน 200 — แก้ด้วย <b>box-sizing: border-box</b> ที่ทำให้ width นับรวม padding และ border แล้ว นักพัฒนาส่วนใหญ่ตั้งค่านี้ให้ทุกอิลิเมนต์ตั้งแต่ต้นโปรเจกต์", code: "* {\n  box-sizing: border-box;\n}" },
          { h: "display พื้นฐาน", p: "<b>block</b> กินเต็มบรรทัด ขึ้นบรรทัดใหม่ (div, p, h1) • <b>inline</b> กว้างเท่าเนื้อหา อยู่ในบรรทัดเดียวกัน กำหนด width/height ไม่ได้ (span, a) • <b>inline-block</b> อยู่ในบรรทัดเดียวกันแต่กำหนดขนาดได้ • <b>none</b> ซ่อนหายไปเลย" }
        ],
        stages: [
          { html: `<div class="box">กล่อง</div>`, title: "ขนาดและขอบใน", desc: "width/height คุมขนาดเนื้อหา padding คือช่องว่างด้านในรอบเนื้อหา", goal: 'ทำให้ <b>.box</b> มี <b>width: 200px</b>, <b>padding: 16px</b> และพื้นหลัง <b>#ecf0f1</b>', starter: ``, hint: '<code>.box { width: 200px; padding: 16px; background-color: #ecf0f1; }</code>', xp: 40, check: (o, c, d) => W.cssNum(d, ".box", "width") === 200 && W.cssNum(d, ".box", "padding-top") === 16 && W.cssColor(d, ".box", "background-color", "#ecf0f1") },
          { html: `<div class="card">การ์ด</div>`, title: "เส้นขอบและมุมโค้ง", desc: "border เขียนสามค่ารวดเดียว: หนา-แบบ-สี", goal: 'ทำให้ <b>.card</b> มี <b>border: 2px solid #34495e</b> และ <b>border-radius: 12px</b>', starter: ``, hint: '<code>border: 2px solid #34495e; border-radius: 12px;</code>', xp: 50, check: (o, c, d) => W.cssNum(d, ".card", "border-top-width") === 2 && W.cssv(d, ".card", "border-top-style") === "solid" && W.cssColor(d, ".card", "border-top-color", "#34495e") && W.cssNum(d, ".card", "border-radius") === 12 },
          { html: `<div class="box">กล่องหนึ่ง</div><div class="box">กล่องสอง</div>`, title: "ระยะห่างด้านนอก", desc: "margin ดันกล่องให้ห่างจากเพื่อนบ้าน เขียนย่อ 2 ค่า = บนล่าง / ซ้ายขวา", goal: 'ทำให้ <b>.box</b> มี <b>margin: 20px 10px</b> (บน-ล่าง 20px ซ้าย-ขวา 10px)', starter: ``, hint: '<code>margin: 20px 10px;</code>', xp: 50, check: (o, c, d) => W.cssNum(d, ".box", "margin-top") === 20 && W.cssNum(d, ".box", "margin-left") === 10 },
          { html: `<div class="wrap">กล่องกลางหน้า</div>`, title: "จัดกล่องให้อยู่กลาง", desc: "สูตรคลาสสิก: กำหนดความกว้าง แล้วใส่ margin ซ้ายขวาเป็น auto", goal: 'ทำให้ <b>.wrap</b> มี <b>width: 300px</b> และอยู่กลางหน้าด้วย <b>margin: 0 auto</b>', starter: ``, hint: '<code>width: 300px; margin: 0 auto;</code>', xp: 60, check: (o, c, d) => W.cssNum(d, ".wrap", "width") === 300 && W.cssv(d, ".wrap", "margin-left") === "auto" && W.cssv(d, ".wrap", "margin-right") === "auto" },
          { html: `<div class="btn">ปุ่ม</div>`, title: "box-sizing: border-box", desc: "ตั้งค่านี้แล้วคำนวณขนาดง่ายขึ้นมาก เพราะ width รวม padding และ border ให้แล้ว", goal: 'ทำให้ทุกอิลิเมนต์ (<b>*</b>) มี <b>box-sizing: border-box</b> และให้ <b>.btn</b> มี width 150px, padding 12px, border 3px solid black', starter: ``, hint: 'กฎแรก <code>* { box-sizing: border-box; }</code> แล้วค่อยกฎ .btn', xp: 60, check: (o, c, d) => W.cssv(d, ".btn", "box-sizing") === "border-box" && W.cssNum(d, ".btn", "width") === 150 && W.cssNum(d, ".btn", "padding-top") === 12 },
          { html: `<span class="tag">แท็ก</span><span class="tag">แท็ก</span><p class="hide">ซ่อนฉันที</p>`, title: "display: inline-block และ none", desc: "span เป็น inline กำหนดขนาดไม่ได้ ต้องเปลี่ยนเป็น inline-block ก่อน ส่วน none คือซ่อนหายไปเลย", goal: 'ทำให้ <b>.tag</b> เป็น <b>inline-block</b> พร้อม <b>padding: 4px 10px</b> และทำให้ <b>.hide</b> หายไปด้วย <b>display: none</b>', starter: ``, hint: '<code>.tag { display: inline-block; padding: 4px 10px; }</code> และ <code>.hide { display: none; }</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".tag", "display") === "inline-block" && W.cssNum(d, ".tag", "padding-left") === 10 && W.cssv(d, ".hide", "display") === "none" }
        ]
      },
      {
        id: "csssel", icon: "css", title: "หน่วยที่ 4: Selector ขั้นสูง",
        blurb: "เลือกให้แม่นยำ: ลูกหลาน กลุ่ม pseudo-class pseudo-element และลำดับความแรง",
        lesson: [
          { h: "เลือกตามความสัมพันธ์", p: "<b>A B</b> (เว้นวรรค) = ลูกหลานทุกชั้นของ A • <b>A &gt; B</b> = ลูกโดยตรงเท่านั้น • <b>A + B</b> = พี่น้องที่อยู่ถัดไปทันที • <b>A ~ B</b> = พี่น้องทั้งหมดที่ตามมา", code: "nav a { color: white; }      /* a ทุกตัวใน nav */\nul > li { margin: 4px; }     /* li ที่เป็นลูกตรงของ ul */" },
          { h: "จัดกลุ่มและ selector หลายเงื่อนไข", p: "<b>A, B, C</b> ใช้กฎเดียวกันกับหลาย selector • เขียนติดกันคือต้องตรงทั้งหมด เช่น <code>p.warn</code> = p ที่มี class warn • <code>.a.b</code> = มีทั้งสอง class" },
          { h: "Pseudo-class", p: "สถานะพิเศษของอิลิเมนต์: <b>:hover</b> เมาส์ชี้ • <b>:focus</b> กำลังโฟกัส (สำคัญกับฟอร์ม) • <b>:first-child</b> / <b>:last-child</b> ลูกคนแรก/คนสุดท้าย • <b>:nth-child(2)</b> ลูกลำดับที่ 2 • <b>:nth-child(odd/even)</b> คี่/คู่ (ทำตารางลายทาง) • <b>:not(.x)</b> ที่ไม่ใช่", code: "a:hover { color: red; }\ntr:nth-child(even) { background: #f5f5f5; }" },
          { h: "Pseudo-element", p: "สร้างส่วนที่ไม่มีใน HTML ด้วย <b>::before</b> และ <b>::after</b> (ต้องมี <code>content</code> เสมอ) • <b>::first-line</b>, <b>::first-letter</b>, <b>::placeholder</b> แต่งข้อความจาง", code: ".req::after {\n  content: \" *\";\n  color: red;\n}" },
          { h: "Attribute selector และความแรง", p: "<b>[type=\"text\"]</b> เลือกตามแอตทริบิวต์ • <b>[href^=\"https\"]</b> ขึ้นต้นด้วย • <b>[href$=\".pdf\"]</b> ลงท้ายด้วย • <b>[class*=\"btn\"]</b> มีคำนี้อยู่ — <b>ลำดับความแรง (specificity)</b>: inline style (1000) &gt; id (100) &gt; class/pseudo-class/attribute (10) &gt; element (1) ถ้าแรงเท่ากันตัวที่เขียนทีหลังชนะ" }
        ],
        stages: [
          { html: `<nav><a href="#">หน้าแรก</a><a href="#">เกี่ยวกับ</a></nav><a href="#">ลิงก์นอก nav</a>`, title: "เลือกลูกหลาน", desc: "เว้นวรรคระหว่าง selector = เลือกเฉพาะตัวที่อยู่ข้างใน", goal: 'ทำให้เฉพาะ <b>a ที่อยู่ใน nav</b> มีพื้นหลัง <b>#e67e22</b> และ <b>padding: 6px 12px</b> (ลิงก์นอก nav ต้องไม่เปลี่ยน)', starter: ``, hint: '<code>nav a { background-color: #e67e22; padding: 6px 12px; }</code>', xp: 50, check: (o, c, d) => W.cssColor(d, "nav a", "background-color", "#e67e22") && W.cssNum(d, "nav a", "padding-left") === 12 && !W.cssColor(d, W.qa(d, "a")[2], "background-color", "#e67e22") },
          { html: `<h1>หนึ่ง</h1><h2>สอง</h2><h3>สาม</h3>`, title: "จัดกลุ่ม selector", desc: "คั่นด้วยจุลภาคเพื่อใช้กฎเดียวกับหลายตัว ลดโค้ดซ้ำ", goal: 'ทำให้ <b>h1, h2 และ h3</b> ทั้งหมดมีสี <b>#16a085</b> ด้วยกฎเดียว', starter: ``, hint: '<code>h1, h2, h3 { color: #16a085; }</code>', xp: 50, check: (o, c, d) => ["h1", "h2", "h3"].every(s => W.cssColor(d, s, "color", "#16a085")) && /h1\s*,\s*h2\s*,\s*h3/.test(c) },
          { html: `<ul><li>รายการ 1</li><li>รายการ 2</li><li>รายการ 3</li><li>รายการ 4</li></ul>`, title: "ตารางลายทางด้วย nth-child", desc: "nth-child(even) เลือกลูกลำดับคู่ — เทคนิคทำแถบสลับสีให้อ่านง่าย", goal: 'ทำให้ <b>li ลำดับคู่</b> มีพื้นหลัง <b>#f0f0f0</b> และ <b>li ตัวแรก</b> มี <b>font-weight: bold</b>', starter: ``, hint: '<code>li:nth-child(even) { }</code> และ <code>li:first-child { }</code>', xp: 60, check: (o, c, d) => { const li = W.qa(d, "li"); return W.cssColor(d, li[1], "background-color", "#f0f0f0") && !W.cssColor(d, li[0], "background-color", "#f0f0f0") && ["bold", "700"].includes(W.cssv(d, li[0], "font-weight")); } },
          { html: `<a href="#" class="btn">ปุ่มลอย</a>`, title: "สถานะ hover", desc: ":hover ทำงานตอนเมาส์ชี้ — ลองเอาเมาส์ไปชี้ที่ปุ่มในหน้าพรีวิวได้เลย", goal: 'ให้ <b>.btn</b> พื้นหลัง <b>#3498db</b> สีตัวอักษร white padding 10px 20px และเมื่อ <b>:hover</b> พื้นหลังเปลี่ยนเป็น <b>#2c3e50</b>', starter: ``, hint: 'เขียนสองกฎ: <code>.btn { }</code> และ <code>.btn:hover { }</code>', xp: 60, check: (o, c, d) => W.cssColor(d, ".btn", "background-color", "#3498db") && /\.btn:hover\s*\{[^}]*#2c3e50/i.test(c.replace(/\s+/g, " ")) },
          { html: `<label class="req">ชื่อ</label><input type="text"><input type="email">`, title: "เพิ่มเนื้อหาด้วย ::after", desc: "::after สร้างเนื้อหาใหม่ที่ไม่มีใน HTML ต้องมี content เสมอ", goal: 'ทำให้ <b>.req::after</b> แสดงเครื่องหมาย <b>*</b> (content: " *") สีแดง และใช้ <b>[type="email"]</b> ให้ช่องอีเมลมี border สี <b>#27ae60</b>', starter: ``, hint: '<code>.req::after { content: " *"; color: red; }</code> และ <code>input[type="email"] { border: 1px solid #27ae60; }</code>', xp: 80, check: (o, c, d) => /::after\s*\{[^}]*content/i.test(c.replace(/\s+/g, " ")) && /\*/.test(c) && W.cssColor(d, 'input[type="email"]', "border-top-color", "#27ae60") },
          { html: `<p id="special" class="text">ข้อความทดสอบความแรง</p>`, title: "ลำดับความแรง (Specificity)", desc: "เมื่อหลายกฎชี้ที่อิลิเมนต์เดียวกัน ตัวที่เจาะจงกว่าชนะ: id (100) > class (10) > element (1)", goal: 'เขียน 3 กฎให้ครบ: <b>p</b> สี blue, <b>.text</b> สี green, <b>#special</b> สี <b>#c0392b</b> — ผลลัพธ์สุดท้ายข้อความต้องเป็นสี <b>#c0392b</b> เพราะ id แรงที่สุด', starter: ``, hint: 'เขียนทั้งสามกฎตามลำดับ แล้วสังเกตว่าสีไหนชนะ', xp: 80, check: (o, c, d) => W.cssColor(d, "#special", "color", "#c0392b") && /^\s*p\s*\{/m.test(c) && /\.text\s*\{/.test(c) && /#special\s*\{/.test(c) }
        ]
      },
      {
        id: "cssflex", icon: "css", title: "หน่วยที่ 5: Flexbox",
        blurb: "จัดเรียงของในแถวเดียวอย่างยืดหยุ่น — เครื่องมือจัดเลย์เอาต์ที่ใช้บ่อยที่สุด",
        lesson: [
          { h: "Flexbox คืออะไร", p: "ระบบจัดเรียงแบบ<b>แกนเดียว</b> (แถวหรือคอลัมน์) — ใส่ <code>display: flex</code> ที่<b>กล่องแม่</b> ลูกทุกตัวจะกลายเป็น flex item เรียงในแถวเดียวกันทันที เป็นวิธีจัดเลย์เอาต์ที่ใช้บ่อยที่สุดในเว็บสมัยใหม่", code: ".container {\n  display: flex;\n}" },
          { h: "ทิศทางและการจัดแนวแกนหลัก", p: "<b>flex-direction</b>: row (ค่าเริ่มต้น ซ้าย→ขวา), column (บน→ล่าง), row-reverse • <b>justify-content</b> จัดตำแหน่งตาม<b>แกนหลัก</b>: flex-start, center, flex-end, <b>space-between</b> (ชิดขอบแล้วเว้นเท่ากัน — ยอดนิยมทำ navbar), space-around, space-evenly" },
          { h: "จัดแนวแกนขวางและระยะห่าง", p: "<b>align-items</b> จัดตาม<b>แกนขวาง</b>: stretch (ค่าเริ่มต้น), center (จัดกึ่งกลางแนวตั้ง), flex-start, flex-end, baseline • <b>gap</b> ระยะห่างระหว่างลูกๆ (สะดวกกว่าใส่ margin ทีละตัว) — สูตรจัดกึ่งกลางทั้งแนวตั้งแนวนอน: <code>display:flex; justify-content:center; align-items:center;</code>" },
          { h: "การขึ้นบรรทัดใหม่และการยืดหด", p: "<b>flex-wrap: wrap</b> ให้ขึ้นบรรทัดใหม่เมื่อพื้นที่ไม่พอ (สำคัญมากกับมือถือ) • ที่ตัวลูก: <b>flex-grow</b> ยืดกินพื้นที่ว่าง, <b>flex-shrink</b> ยอมหด, <b>flex-basis</b> ขนาดตั้งต้น — เขียนย่อ <code>flex: 1</code> คือให้ยืดเท่าๆ กัน • <b>align-self</b> จัดแนวเฉพาะลูกตัวนั้น" }
        ],
        stages: [
          { html: `<div class="row"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>`, title: "เปลี่ยนเป็น Flexbox", desc: "ใส่ display:flex ที่กล่องแม่ ลูกที่เคยเรียงลงล่างจะมาเรียงเป็นแถวทันที", goal: 'ทำให้ <b>.row</b> เป็น <b>display: flex</b> และมี <b>gap: 12px</b>', starter: ``, hint: '<code>.row { display: flex; gap: 12px; }</code>', xp: 40, check: (o, c, d) => W.cssv(d, ".row", "display") === "flex" && W.cssNum(d, ".row", "gap") === 12 },
          { html: `<nav class="bar"><div class="logo">โลโก้</div><div class="menu">เมนู</div></nav>`, title: "Navbar ด้วย space-between", desc: "space-between ดันตัวแรกชิดซ้าย ตัวสุดท้ายชิดขวา — สูตรทำแถบเมนูบนสุดของทุกเว็บ", goal: 'ทำให้ <b>.bar</b> เป็น flex, <b>justify-content: space-between</b> และ <b>align-items: center</b>', starter: ``, hint: '<code>display: flex; justify-content: space-between; align-items: center;</code>', xp: 50, check: (o, c, d) => W.cssv(d, ".bar", "display") === "flex" && W.cssv(d, ".bar", "justify-content") === "space-between" && W.cssv(d, ".bar", "align-items") === "center" },
          { html: `<div class="hero"><h2>ตรงกลางพอดี</h2></div>`, title: "จัดกึ่งกลางสมบูรณ์แบบ", desc: "โจทย์คลาสสิกที่เคยยากมากก่อนมี Flexbox — ตอนนี้แค่ 3 บรรทัด", goal: 'ทำให้ <b>.hero</b> สูง <b>200px</b> และจัดเนื้อหาไว้<b>กึ่งกลางทั้งแนวตั้งและแนวนอน</b> (flex + justify-content + align-items เป็น center)', starter: ``, hint: '<code>height: 200px; display: flex; justify-content: center; align-items: center;</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".hero", "display") === "flex" && W.cssv(d, ".hero", "justify-content") === "center" && W.cssv(d, ".hero", "align-items") === "center" && W.cssNum(d, ".hero", "height") === 200 },
          { html: `<div class="col"><div>บน</div><div>กลาง</div><div>ล่าง</div></div>`, title: "เรียงเป็นคอลัมน์", desc: "เปลี่ยนแกนหลักเป็นแนวตั้งด้วย flex-direction: column", goal: 'ทำให้ <b>.col</b> เป็น flex เรียงแบบ <b>column</b> พร้อม <b>gap: 8px</b>', starter: ``, hint: '<code>flex-direction: column;</code>', xp: 50, check: (o, c, d) => W.cssv(d, ".col", "display") === "flex" && W.cssv(d, ".col", "flex-direction") === "column" && W.cssNum(d, ".col", "gap") === 8 },
          { html: `<div class="cards"><div class="card">A</div><div class="card">B</div><div class="card">C</div><div class="card">D</div></div>`, title: "ขึ้นบรรทัดใหม่อัตโนมัติ", desc: "flex-wrap: wrap ทำให้การ์ดตกลงบรรทัดใหม่เมื่อจอแคบ — พื้นฐานของเว็บที่ใช้ได้ทุกจอ", goal: 'ทำให้ <b>.cards</b> เป็น flex ที่ <b>flex-wrap: wrap</b> gap 10px และให้ <b>.card</b> มี <b>width: 45%</b>', starter: ``, hint: '<code>.cards { display: flex; flex-wrap: wrap; gap: 10px; }</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".cards", "display") === "flex" && W.cssv(d, ".cards", "flex-wrap") === "wrap" && W.cssv(d, ".card", "width") === "45%" },
          { html: `<div class="layout"><aside class="side">เมนู</aside><main class="content">เนื้อหาหลัก</main></div>`, title: "แบ่งพื้นที่ด้วย flex: 1", desc: "ตัวลูกที่ใส่ flex:1 จะยืดกินพื้นที่ว่างที่เหลือทั้งหมด — สูตรทำเลย์เอาต์ sidebar + เนื้อหา", goal: 'ทำให้ <b>.layout</b> เป็น flex, <b>.side</b> กว้างคงที่ <b>200px</b> และ <b>.content</b> ยืดเต็มที่เหลือด้วย <b>flex: 1</b>', starter: ``, hint: '<code>.side { width: 200px; }</code> และ <code>.content { flex: 1; }</code>', xp: 80, check: (o, c, d) => W.cssv(d, ".layout", "display") === "flex" && W.cssNum(d, ".side", "width") === 200 && (W.cssNum(d, ".content", "flex-grow") === 1 || /\.content\s*\{[^}]*flex\s*:\s*1/.test(c.replace(/\s+/g, " "))) }
        ]
      },
      {
        id: "cssgrid", icon: "css", title: "หน่วยที่ 6: CSS Grid",
        blurb: "จัดเลย์เอาต์สองมิติ แถวและคอลัมน์พร้อมกัน — เหมาะกับโครงหน้าเว็บทั้งหน้า",
        lesson: [
          { h: "Grid ต่างจาก Flexbox อย่างไร", p: "<b>Flexbox</b> จัดแกนเดียว (แถวหรือคอลัมน์) เหมาะกับกลุ่มของชิ้นเล็กๆ เช่น navbar • <b>Grid</b> จัด<b>สองมิติพร้อมกัน</b> กำหนดทั้งแถวและคอลัมน์ เหมาะกับโครงหน้าเว็บทั้งหน้าหรือแกลเลอรี — ใช้ร่วมกันได้และนิยมใช้คู่กัน" },
          { h: "สร้างตาราง", p: "<b>display: grid</b> ที่กล่องแม่ แล้วกำหนดคอลัมน์ด้วย <b>grid-template-columns</b> • หน่วย <b>fr</b> คือสัดส่วนของพื้นที่ว่าง เช่น <code>1fr 2fr</code> = คอลัมน์ขวากว้างเป็นสองเท่า • <code>repeat(3, 1fr)</code> = 3 คอลัมน์เท่ากัน • <b>gap</b> ระยะห่างระหว่างช่อง", code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}" },
          { h: "ให้ช่องกินหลายคอลัมน์", p: "<b>grid-column: span 2</b> ให้ช่องนั้นกินกว้าง 2 คอลัมน์ • <b>grid-row: span 2</b> กินสูง 2 แถว • ระบุตำแหน่งชัดเจนได้ด้วย <code>grid-column: 1 / 3</code> (เริ่มเส้นที่ 1 ถึงเส้นที่ 3)" },
          { h: "Grid ที่ตอบสนองอัตโนมัติ", p: "สูตรทองของแกลเลอรีที่ปรับตามจอเอง โดยไม่ต้องเขียน media query เลย: <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</code> — แปลว่า \"ยัดคอลัมน์ให้ได้มากที่สุด โดยแต่ละคอลัมน์กว้างอย่างน้อย 200px\"" }
        ],
        stages: [
          { html: `<div class="grid"><div>1</div><div>2</div><div>3</div></div>`, title: "ตารางสามคอลัมน์", desc: "display:grid แล้วบอกว่าจะมีกี่คอลัมน์ กว้างเท่าไหร่", goal: 'ทำให้ <b>.grid</b> เป็น <b>display: grid</b> ที่มี <b>grid-template-columns: 1fr 1fr 1fr</b> และ <b>gap: 10px</b>', starter: ``, hint: '<code>display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;</code>', xp: 50, check: (o, c, d) => W.cssv(d, ".grid", "display") === "grid" && /1fr\s+1fr\s+1fr|repeat\(\s*3\s*,\s*1fr\s*\)/.test(W.cssv(d, ".grid", "grid-template-columns") || c) && W.cssNum(d, ".grid", "gap") === 10 },
          { html: `<div class="grid"><div>A</div><div>B</div><div>C</div><div>D</div></div>`, title: "เขียนย่อด้วย repeat()", desc: "repeat() ช่วยไม่ให้ต้องพิมพ์ 1fr ซ้ำหลายรอบ", goal: 'ทำให้ <b>.grid</b> เป็น grid ที่มี <b>4 คอลัมน์เท่ากัน</b> โดยใช้ <b>repeat()</b> และ gap 8px', starter: ``, hint: '<code>grid-template-columns: repeat(4, 1fr);</code>', xp: 50, check: (o, c, d) => W.cssv(d, ".grid", "display") === "grid" && /repeat\(\s*4\s*,\s*1fr\s*\)/.test(c) && W.cssNum(d, ".grid", "gap") === 8 },
          { html: `<div class="grid"><div class="wide">พาดหัว</div><div>ซ้าย</div><div>ขวา</div></div>`, title: "ช่องที่กินสองคอลัมน์", desc: "grid-column: span 2 ทำให้ช่องนั้นกว้างคร่อมสองคอลัมน์", goal: 'ให้ <b>.grid</b> มี 2 คอลัมน์เท่ากัน และ <b>.wide</b> กิน <b>2 คอลัมน์</b> ด้วย <b>grid-column: span 2</b>', starter: ``, hint: '<code>.wide { grid-column: span 2; }</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".grid", "display") === "grid" && /span\s*2/.test(W.cssv(d, ".wide", "grid-column") || c) },
          { html: `<div class="gallery"><div>รูป1</div><div>รูป2</div><div>รูป3</div><div>รูป4</div><div>รูป5</div></div>`, title: "แกลเลอรีที่ปรับตามจอเอง", desc: "auto-fit + minmax คือสูตรที่ทำให้แกลเลอรีปรับจำนวนคอลัมน์ตามความกว้างจอโดยอัตโนมัติ", goal: 'ทำให้ <b>.gallery</b> เป็น grid ที่ใช้ <b>repeat(auto-fit, minmax(150px, 1fr))</b> และ gap 12px', starter: ``, hint: '<code>grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));</code>', xp: 80, check: (o, c, d) => W.cssv(d, ".gallery", "display") === "grid" && /auto-fit/.test(c) && /minmax\(\s*150px\s*,\s*1fr\s*\)/.test(c.replace(/\s+/g, " ")) },
          { html: `<div class="page"><header class="hd">หัว</header><aside class="sb">เมนู</aside><main class="mn">เนื้อหา</main><footer class="ft">ท้าย</footer></div>`, title: "โครงหน้าเว็บด้วย Grid", desc: "รวมทุกอย่าง: หัวและท้ายกินเต็มความกว้าง ตรงกลางแบ่งเป็นเมนูกับเนื้อหา", goal: 'ให้ <b>.page</b> เป็น grid <b>2 คอลัมน์</b> (<b>200px 1fr</b>) gap 10px โดย <b>.hd</b> และ <b>.ft</b> กิน <b>span 2</b> ทั้งคู่', starter: ``, hint: '<code>.page { display: grid; grid-template-columns: 200px 1fr; gap: 10px; }</code> แล้ว <code>.hd, .ft { grid-column: span 2; }</code>', xp: 100, check: (o, c, d) => W.cssv(d, ".page", "display") === "grid" && /200px\s+1fr/.test(W.cssv(d, ".page", "grid-template-columns") || c) && /span\s*2/.test(W.cssv(d, ".hd", "grid-column") || "") && /span\s*2/.test(W.cssv(d, ".ft", "grid-column") || "") }
        ]
      },
      {
        id: "csspos", icon: "css", title: "หน่วยที่ 7: ตำแหน่งและการซ้อนทับ",
        blurb: "position ทั้ง 5 แบบ การซ้อนชั้นด้วย z-index และการจัดการเนื้อหาล้นกรอบ",
        lesson: [
          { h: "position 5 แบบ", p: "<b>static</b> ค่าเริ่มต้น อยู่ตามลำดับปกติ • <b>relative</b> ขยับจากตำแหน่งเดิมของตัวเอง (ที่ว่างเดิมยังอยู่) • <b>absolute</b> หลุดออกจากลำดับปกติ อ้างอิงกล่องแม่ที่ไม่ใช่ static ตัวใกล้สุด • <b>fixed</b> ตรึงกับหน้าจอ เลื่อนหน้าก็ไม่ขยับ (ทำ navbar ติดบน) • <b>sticky</b> เป็น relative จนกว่าจะเลื่อนถึงจุดที่กำหนดแล้วค่อยตรึง" },
          { h: "ระบุตำแหน่ง", p: "ใช้ <b>top / right / bottom / left</b> ร่วมกับ position (ไม่มีผลกับ static) เช่น <code>position: absolute; top: 0; right: 0;</code> คือมุมขวาบนของกล่องแม่", code: ".badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}" },
          { h: "สูตรสำคัญ: relative ครอบ absolute", p: "ถ้าอยากวางป้ายไว้มุมของการ์ด ต้องใส่ <code>position: relative</code> ที่<b>การ์ด (แม่)</b> แล้วใส่ <code>position: absolute</code> ที่<b>ป้าย (ลูก)</b> — ป้ายจะอ้างอิงมุมของการ์ด ไม่ใช่มุมของทั้งหน้าจอ" },
          { h: "z-index และ overflow", p: "<b>z-index</b> เลขมากอยู่ชั้นบน (ใช้ได้กับอิลิเมนต์ที่ไม่ใช่ static เท่านั้น) • <b>overflow</b> จัดการเนื้อหาที่ล้นกรอบ: visible (ล้นออกมา), hidden (ตัดทิ้ง), scroll, auto (มีแถบเลื่อนเมื่อจำเป็น)" }
        ],
        stages: [
          { html: `<div class="box">กล่องขยับ</div>`, title: "ขยับด้วย relative", desc: "relative ขยับตัวเองจากตำแหน่งเดิม แต่ที่ว่างเดิมยังถูกจองไว้", goal: 'ทำให้ <b>.box</b> เป็น <b>position: relative</b> แล้วขยับ <b>top: 20px</b> และ <b>left: 30px</b>', starter: ``, hint: '<code>position: relative; top: 20px; left: 30px;</code>', xp: 50, check: (o, c, d) => W.cssv(d, ".box", "position") === "relative" && W.cssNum(d, ".box", "top") === 20 && W.cssNum(d, ".box", "left") === 30 },
          { html: `<div class="card">การ์ดสินค้า<span class="badge">ใหม่</span></div>`, title: "ป้ายมุมการ์ด", desc: "สูตรสำคัญที่สุดของ position: แม่เป็น relative ลูกเป็น absolute", goal: 'ให้ <b>.card</b> เป็น <b>relative</b> (พร้อม padding 20px) และ <b>.badge</b> เป็น <b>absolute</b> ที่ <b>top: 0</b> <b>right: 0</b>', starter: ``, hint: '<code>.card { position: relative; padding: 20px; }</code> และ <code>.badge { position: absolute; top: 0; right: 0; }</code>', xp: 80, check: (o, c, d) => W.cssv(d, ".card", "position") === "relative" && W.cssv(d, ".badge", "position") === "absolute" && W.cssNum(d, ".badge", "top") === 0 && W.cssNum(d, ".badge", "right") === 0 },
          { html: `<nav class="topbar">แถบเมนูติดบน</nav><p>เนื้อหา</p>`, title: "แถบเมนูตรึงด้านบน", desc: "fixed ตรึงกับหน้าจอ เลื่อนหน้าอย่างไรก็อยู่ที่เดิม", goal: 'ทำให้ <b>.topbar</b> เป็น <b>position: fixed</b> ที่ <b>top: 0</b> <b>left: 0</b> กว้าง <b>100%</b> และมี <b>z-index: 100</b>', starter: ``, hint: '<code>position: fixed; top: 0; left: 0; width: 100%; z-index: 100;</code>', xp: 80, check: (o, c, d) => W.cssv(d, ".topbar", "position") === "fixed" && W.cssv(d, ".topbar", "width") === "100%" && parseInt(W.cssv(d, ".topbar", "z-index")) === 100 },
          { html: `<div class="back">ชั้นล่าง</div><div class="front">ชั้นบน</div>`, title: "ซ้อนชั้นด้วย z-index", desc: "z-index ตัดสินว่าใครทับใคร ต้องใช้กับ position ที่ไม่ใช่ static", goal: 'ให้ทั้งสองกล่องเป็น <b>relative</b> โดย <b>.back</b> มี <b>z-index: 1</b> และ <b>.front</b> มี <b>z-index: 10</b>', starter: ``, hint: 'ทั้งคู่ต้องมี position: relative ก่อน z-index จึงจะทำงาน', xp: 60, check: (o, c, d) => W.cssv(d, ".back", "position") === "relative" && W.cssv(d, ".front", "position") === "relative" && parseInt(W.cssv(d, ".back", "z-index")) === 1 && parseInt(W.cssv(d, ".front", "z-index")) === 10 },
          { html: `<div class="scrollbox">เนื้อหายาวมากที่ล้นออกนอกกรอบ บรรทัดหนึ่ง บรรทัดสอง บรรทัดสาม บรรทัดสี่ บรรทัดห้า</div>`, title: "เนื้อหาล้นกรอบ", desc: "overflow: auto ใส่แถบเลื่อนให้เฉพาะตอนที่เนื้อหาล้นจริงๆ", goal: 'ทำให้ <b>.scrollbox</b> สูง <b>80px</b> และมี <b>overflow: auto</b> พร้อม border 1px solid gray', starter: ``, hint: '<code>height: 80px; overflow: auto; border: 1px solid gray;</code>', xp: 60, check: (o, c, d) => W.cssNum(d, ".scrollbox", "height") === 80 && ["auto", "scroll"].includes(W.cssv(d, ".scrollbox", "overflow")) }
        ]
      },
      {
        id: "cssadv", icon: "css", title: "หน่วยที่ 8: CSS ขั้นสูงและ Responsive",
        blurb: "ตัวแปร CSS เงา ไล่สี ทรานสิชัน แอนิเมชัน และการรองรับทุกขนาดหน้าจอ",
        lesson: [
          { h: "ตัวแปร CSS (Custom Properties)", p: "ประกาศไว้ที่ <code>:root</code> แล้วเรียกใช้ด้วย <code>var()</code> — เปลี่ยนสีธีมทั้งเว็บได้จากที่เดียว และเป็นพื้นฐานของโหมดมืด (dark mode)", code: ":root {\n  --primary: #7b5cf0;\n  --radius: 12px;\n}\n.btn {\n  background: var(--primary);\n  border-radius: var(--radius);\n}" },
          { h: "เงาและไล่สี", p: "<b>box-shadow: x y เบลอ กระจาย สี</b> เงาของกล่อง (ใส่ <code>inset</code> ให้เป็นเงาด้านใน) • <b>text-shadow</b> เงาข้อความ • <b>linear-gradient(ทิศทาง, สี1, สี2)</b> ไล่สีเป็นเส้นตรง • <b>radial-gradient()</b> ไล่สีเป็นวงกลม — gradient ใช้กับ <code>background</code>", code: ".card {\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n  background: linear-gradient(to right, #7b5cf0, #3498db);\n}" },
          { h: "Transition และ Transform", p: "<b>transition: คุณสมบัติ ระยะเวลา จังหวะ</b> ทำให้การเปลี่ยนแปลงค่อยๆ เกิด ไม่กระโดด เช่น <code>transition: all 0.3s ease;</code> • <b>transform</b> แปลงรูปทรงโดยไม่กระทบเลย์เอาต์: <code>scale()</code> ย่อขยาย, <code>rotate()</code> หมุน, <code>translate()</code> เลื่อน, <code>skew()</code> เอียง — ใช้คู่กับ :hover ได้ผลลัพธ์สวยงามมาก" },
          { h: "Animation ด้วย @keyframes", p: "กำหนดช่วงการเคลื่อนไหวด้วย <b>@keyframes ชื่อ</b> ระบุ from/to หรือเปอร์เซ็นต์ แล้วเรียกใช้ด้วย <b>animation: ชื่อ ระยะเวลา จำนวนรอบ</b>", code: "@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.box {\n  animation: fadeIn 1s ease infinite;\n}" },
          { h: "Responsive ด้วย Media Query", p: "<b>@media</b> ใช้กฎเฉพาะเมื่อหน้าจอเข้าเงื่อนไข — แนวคิด <b>mobile-first</b> คือเขียนสไตล์มือถือเป็นค่าพื้นฐาน แล้วใช้ <code>min-width</code> เพิ่มสไตล์สำหรับจอใหญ่ • หน่วยที่ยืดหยุ่น: <code>%</code>, <code>vw/vh</code> (เทียบขนาดหน้าจอ), <code>rem</code>", code: "@media (max-width: 600px) {\n  .menu { display: none; }\n}" }
        ],
        stages: [
          { html: `<button class="btn">ปุ่มธีม</button>`, title: "ตัวแปร CSS", desc: "ประกาศตัวแปรที่ :root แล้วเรียกใช้ด้วย var() — เปลี่ยนธีมทั้งเว็บจากจุดเดียว", goal: 'ประกาศ <b>--primary: #7b5cf0</b> ที่ <b>:root</b> แล้วใช้ <b>var(--primary)</b> เป็นพื้นหลังของ <b>.btn</b> (พร้อม color: white, padding: 10px 20px)', starter: ``, hint: '<code>:root { --primary: #7b5cf0; }</code> แล้ว <code>.btn { background-color: var(--primary); }</code>', xp: 60, check: (o, c, d) => { const s = c.replace(/\s+/g, " "); return /:root\s*\{[^}]*--primary\s*:\s*#7b5cf0/i.test(s) && /var\(\s*--primary\s*\)/.test(s) && /\.btn/.test(s); } },
          { html: `<div class="card">การ์ดมีเงา</div>`, title: "เงาและมุมโค้ง", desc: "เงาอ่อนๆ ทำให้การ์ดดูลอยขึ้นมาจากพื้น เป็นสไตล์ที่เว็บสมัยใหม่ใช้กันทั่วไป", goal: 'ทำให้ <b>.card</b> มี <b>box-shadow: 0 4px 12px rgba(0,0,0,0.15)</b>, <b>border-radius: 16px</b> และ padding 20px', starter: ``, hint: '<code>box-shadow: 0 4px 12px rgba(0,0,0,0.15);</code>', xp: 60, check: (o, c, d) => { const sh = W.cssv(d, ".card", "box-shadow"); return sh.includes("4px") && sh.includes("12px") && W.cssNum(d, ".card", "border-radius") === 16; } },
          { html: `<div class="hero">แบนเนอร์ไล่สี</div>`, title: "พื้นหลังไล่สี", desc: "linear-gradient ไล่สีจากซ้ายไปขวาหรือทิศทางใดก็ได้", goal: 'ทำให้ <b>.hero</b> มีพื้นหลัง <b>linear-gradient(to right, #7b5cf0, #3498db)</b> สูง 150px และตัวอักษรสีขาว', starter: ``, hint: '<code>background: linear-gradient(to right, #7b5cf0, #3498db);</code>', xp: 60, check: (o, c, d) => /linear-gradient\([^)]*to right[^)]*7b5cf0[^)]*3498db/i.test(c.replace(/\s+/g, " ")) && W.cssNum(d, ".hero", "height") === 150 },
          { html: `<button class="btn">ชี้ที่ฉันสิ</button>`, title: "ทรานสิชันตอน hover", desc: "ใส่ transition ที่สถานะปกติ (ไม่ใช่ที่ :hover) เพื่อให้นุ่มนวลทั้งขาไปและขากลับ", goal: 'ให้ <b>.btn</b> มี <b>transition: all 0.3s ease</b> และเมื่อ <b>:hover</b> ให้ <b>transform: scale(1.1)</b>', starter: ``, hint: '<code>.btn { transition: all 0.3s ease; }</code> และ <code>.btn:hover { transform: scale(1.1); }</code>', xp: 80, check: (o, c, d) => { const s = c.replace(/\s+/g, " "); return /transition\s*:[^;]*0?\.3s/.test(s) && /\.btn:hover\s*\{[^}]*transform\s*:\s*scale\(\s*1\.1\s*\)/i.test(s); } },
          { html: `<div class="pulse">เต้นตุบๆ</div>`, title: "แอนิเมชันด้วย @keyframes", desc: "@keyframes กำหนดช่วงเวลาการเคลื่อนไหว แล้วผูกเข้ากับอิลิเมนต์ด้วย animation", goal: 'สร้าง <b>@keyframes fadeIn</b> (from opacity 0 → to opacity 1) แล้วใช้กับ <b>.pulse</b> ด้วย <b>animation: fadeIn 2s ease infinite</b>', starter: ``, hint: '<code>@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</code>', xp: 80, check: (o, c, d) => { const s = c.replace(/\s+/g, " "); return /@keyframes\s+fadeIn\s*\{[^@]*from\s*\{[^}]*opacity\s*:\s*0[^}]*\}[^@]*to\s*\{[^}]*opacity\s*:\s*1/i.test(s) && /animation\s*:[^;]*fadeIn[^;]*2s/.test(s) && /infinite/.test(s); } },
          { html: `<div class="menu">เมนูเดสก์ท็อป</div>`, title: "Media Query สำหรับมือถือ", desc: "เขียนกฎเฉพาะจอเล็ก — เว็บที่ดีต้องใช้งานได้ทั้งบนคอมและมือถือ", goal: 'ให้ <b>.menu</b> ปกติเป็น <b>display: flex</b> และเพิ่ม <b>@media (max-width: 600px)</b> ที่ทำให้ <b>.menu</b> เป็น <b>display: none</b>', starter: ``, hint: '<code>@media (max-width: 600px) { .menu { display: none; } }</code>', xp: 80, check: (o, c, d) => { const s = c.replace(/\s+/g, " "); return W.cssv(d, ".menu", "display") === "flex" && /@media[^{]*max-width\s*:\s*600px[^{]*\{[^@]*\.menu\s*\{[^}]*display\s*:\s*none/i.test(s); } },
          { html: `<div class="profile"><div class="avatar">รูป</div><div class="info"><h3>มะลิ</h3><p>นักพัฒนาเว็บ</p></div></div>`, title: "บอสหน่วย: การ์ดโปรไฟล์สวยๆ", desc: "รวมทุกอย่างในคอร์ส CSS: ตัวแปร Flexbox เงา มุมโค้ง และทรานสิชัน", goal: 'ทำให้ <b>.profile</b>: เป็น <b>flex</b>, <b>gap: 16px</b>, <b>align-items: center</b>, <b>padding: 20px</b>, <b>border-radius: 16px</b>, <b>box-shadow</b> (มีค่าเบลอ 12px), และ <b>background: var(--card-bg)</b> โดยประกาศ <b>--card-bg: #ffffff</b> ที่ :root', starter: ``, hint: 'ประกาศตัวแปรที่ :root ก่อน แล้วเขียนกฎ .profile ให้ครบทุกข้อ', xp: 120, check: (o, c, d) => { const s = c.replace(/\s+/g, " "); return W.cssv(d, ".profile", "display") === "flex" && W.cssNum(d, ".profile", "gap") === 16 && W.cssv(d, ".profile", "align-items") === "center" && W.cssNum(d, ".profile", "padding-top") === 20 && W.cssNum(d, ".profile", "border-radius") === 16 && W.cssv(d, ".profile", "box-shadow").includes("12px") && /--card-bg\s*:\s*#ffffff/i.test(s) && /var\(\s*--card-bg\s*\)/.test(s); } }
        ]
      }
    ]
  },
  js: {
    name: "JavaScript", icon: "⚡",
    tagline: "ทำให้เว็บมีชีวิต — ตัวแปร ลอจิก ฟังก์ชัน อาร์เรย์ ออบเจ็กต์ การควบคุม DOM เหตุการณ์ และงานแบบ async",
    topics: [
      {
        id: "jsbasic", icon: "js", title: "หน่วยที่ 1: พื้นฐาน JavaScript",
        blurb: "console.log ตัวแปร let/const ชนิดข้อมูล และ template literal",
        lesson: [
          { h: "JavaScript คืออะไร", p: "ภาษาโปรแกรมที่ทำงานในเบราว์เซอร์ ทำให้หน้าเว็บโต้ตอบกับผู้ใช้ได้ — HTML คือโครงกระดูก CSS คือเสื้อผ้า และ <b>JavaScript คือกล้ามเนื้อ</b>ที่ทำให้ขยับ • ปัจจุบันยังใช้เขียนฝั่งเซิร์ฟเวอร์ (Node.js) และแอปมือถือได้ด้วย" },
          { h: "console.log — เพื่อนที่ดีที่สุด", p: "แสดงค่าออกทาง Console ใช้ตรวจสอบว่าโค้ดทำงานถึงไหนและตัวแปรมีค่าอะไร — โปรแกรมเมอร์มืออาชีพใช้คำสั่งนี้ตลอดเวลาในการหาบั๊ก (ในเกมนี้ข้อความจาก console.log จะแสดงในกล่องผลลัพธ์ด้านล่าง)", code: "console.log(\"สวัสดี\");\nconsole.log(10 + 5);" },
          { h: "ตัวแปร: let, const, var", p: "<b>let</b> ประกาศตัวแปรที่เปลี่ยนค่าได้ • <b>const</b> ค่าคงที่ เปลี่ยนไม่ได้ (ควรใช้เป็นค่าเริ่มต้นเสมอ แล้วค่อยเปลี่ยนเป็น let เมื่อจำเป็น) • <b>var</b> แบบเก่า มีปัญหาเรื่องขอบเขต ปัจจุบันเลิกใช้แล้ว • JavaScript ไม่ต้องระบุชนิดข้อมูล", code: "let score = 0;\nconst NAME = \"มะลิ\";\nscore = 10;   // ได้\n// NAME = \"ฟ้า\";  // Error!" },
          { h: "ชนิดข้อมูล", p: "<b>string</b> ข้อความ (ใช้ '', \"\" หรือ ``) • <b>number</b> ตัวเลข (ไม่แยกจำนวนเต็ม/ทศนิยม) • <b>boolean</b> true/false • <b>undefined</b> ยังไม่กำหนดค่า • <b>null</b> ตั้งใจให้ว่าง • <b>object</b> และ <b>array</b> — ตรวจชนิดด้วย <code>typeof</code>" },
          { h: "Template literal", p: "ใช้เครื่องหมาย backtick <code>`</code> แล้วแทรกค่าด้วย <code>${...}</code> — อ่านง่ายกว่าการต่อสตริงด้วย + มาก และขึ้นหลายบรรทัดได้", code: "const name = \"มะลิ\";\nconsole.log(`สวัสดี ${name} อายุ ${10 + 5} ปี`);" }
        ],
        stages: [
          { title: "ข้อความแรกใน Console", desc: "console.log คือคำสั่งที่ใช้บ่อยที่สุดในการเรียน JavaScript", goal: 'แสดงข้อความ <b>สวัสดี JavaScript</b> ออกทาง console', starter: `// เขียนโค้ดตรงนี้\n`, hint: '<code>console.log("สวัสดี JavaScript");</code>', xp: 30, check: (o) => eq(o, "สวัสดี JavaScript") },
          { title: "ตัวแปรด้วย let", desc: "let สร้างตัวแปรที่เปลี่ยนค่าได้ภายหลัง", goal: 'สร้างตัวแปร <b>score</b> ค่าเริ่มต้น <b>10</b> แล้วเปลี่ยนเป็น <b>25</b> จากนั้นแสดงค่าออก console (ต้องได้ <b>25</b>)', starter: ``, hint: '<code>let score = 10;</code> แล้ว <code>score = 25;</code> แล้ว console.log', xp: 40, check: (o, c) => eq(o, "25") && /let\s+score/.test(c) },
          { title: "ค่าคงที่ด้วย const", desc: "const ใช้กับค่าที่ไม่ควรเปลี่ยน เช่น ชื่อร้าน อัตราภาษี — ป้องกันการแก้พลาด", goal: 'สร้าง <b>const PI = 3.14</b> แล้วแสดงพื้นที่วงกลมรัศมี 10 (PI × 10 × 10 — ต้องได้ <b>314</b>)', starter: ``, hint: '<code>const PI = 3.14;</code> แล้ว <code>console.log(PI * 10 * 10);</code>', xp: 40, check: (o, c) => eq(o, "314") && /const\s+PI/.test(c) },
          { title: "ตรวจชนิดข้อมูลด้วย typeof", desc: "typeof บอกว่าค่านั้นเป็นชนิดอะไร ใช้ตรวจสอบเวลาข้อมูลมาจากภายนอก", goal: 'แสดงชนิดของ <b>"มะลิ"</b>, <b>25</b> และ <b>true</b> บรรทัดละค่า (ต้องได้ <b>string</b>, <b>number</b>, <b>boolean</b>)', starter: ``, hint: '<code>console.log(typeof "มะลิ");</code>', xp: 50, check: (o) => lines(o).join(",") === "string,number,boolean" },
          { title: "Template literal", desc: "backtick + ${} ทำให้ประกอบข้อความกับตัวแปรได้สวยงามและอ่านง่าย", goal: 'มี name = "มะลิ" และ age = 15 ใช้ <b>template literal</b> แสดง <b>สวัสดี มะลิ อายุ 15 ปี</b>', starter: `const name = "มะลิ";\nconst age = 15;\n`, hint: '<code>console.log(`สวัสดี ${name} อายุ ${age} ปี`);</code>', xp: 60, check: (o, c) => eq(o, "สวัสดี มะลิ อายุ 15 ปี") && /`/.test(c) && /\$\{/.test(c) },
          { title: "แปลงชนิดข้อมูล", desc: "ข้อมูลจากช่องกรอกเป็น string เสมอ ต้องแปลงเป็นตัวเลขก่อนคำนวณ ไม่งั้นจะกลายเป็นการต่อข้อความ", goal: 'มี a = "10" และ b = "5" (เป็นข้อความ) แสดง 2 บรรทัด: ผลบวกแบบข้อความ (<b>105</b>) และผลบวกหลังแปลงเป็นตัวเลขด้วย <b>Number()</b> (<b>15</b>)', starter: `const a = "10";\nconst b = "5";\n`, hint: '<code>console.log(a + b);</code> แล้ว <code>console.log(Number(a) + Number(b));</code>', xp: 60, check: (o, c) => lines(o).join(",") === "105,15" && /Number\(/.test(c) }
        ]
      },
      {
        id: "jsop", icon: "js", title: "หน่วยที่ 2: ตัวดำเนินการและเงื่อนไข",
        blurb: "คำนวณ เปรียบเทียบ === กับ == ตรรกะ if/else ternary และ switch",
        lesson: [
          { h: "ตัวดำเนินการเลขคณิต", p: "<code>+ - * /</code> พื้นฐาน • <code>%</code> หารเอาเศษ • <code>**</code> ยกกำลัง • <code>++ --</code> เพิ่ม/ลดทีละ 1 • เขียนย่อ <code>+= -= *= /=</code> — ระวัง: <code>+</code> กับ string คือการต่อข้อความ ไม่ใช่บวก" },
          { h: "=== สำคัญกว่าที่คิด", p: "<b>==</b> เทียบค่าโดยแปลงชนิดให้ก่อน (<code>\"5\" == 5</code> เป็น true — อันตราย!) • <b>===</b> เทียบทั้งค่าและชนิด (<code>\"5\" === 5</code> เป็น false) — <b>ใช้ === เสมอ</b> เป็นกฎเหล็กของ JavaScript สมัยใหม่ • ไม่เท่ากันใช้ <code>!==</code>" },
          { h: "ตรรกะและค่า truthy/falsy", p: "<b>&&</b> และ • <b>||</b> หรือ • <b>!</b> ไม่ • ค่าที่ถือเป็นเท็จ (falsy) มี 6 ตัว: <code>false, 0, \"\", null, undefined, NaN</code> นอกนั้นเป็นจริงหมด — เทคนิค: <code>const name = input || \"ผู้เยี่ยมชม\";</code> ใช้ค่าสำรองเมื่อค่าแรกว่าง" },
          { h: "if / else if / else", p: "โครงสร้างเงื่อนไขพื้นฐาน เงื่อนไขอยู่ในวงเล็บ บล็อกอยู่ในปีกกา", code: "if (score >= 80) {\n  console.log(\"A\");\n} else if (score >= 70) {\n  console.log(\"B\");\n} else {\n  console.log(\"F\");\n}" },
          { h: "Ternary และ switch", p: "<b>ternary</b> เขียน if สั้นในบรรทัดเดียว: <code>เงื่อนไข ? ค่าจริง : ค่าเท็จ</code> • <b>switch</b> เลือกตามค่าที่แน่นอน อย่าลืม <code>break</code> ทุก case ไม่งั้นจะไหลลงไปทำ case ถัดไป" }
        ],
        stages: [
          { title: "คำนวณพื้นฐาน", desc: "ทดลองตัวดำเนินการเลขคณิตของ JavaScript", goal: 'แสดง 3 บรรทัด: <b>17 % 5</b>, <b>2 ** 10</b>, <b>7 / 2</b> (ต้องได้ <b>2</b>, <b>1024</b>, <b>3.5</b>)', starter: ``, hint: 'JavaScript หารได้ทศนิยมเสมอ ไม่เหมือนภาษา C', xp: 40, check: (o) => lines(o).join(",") === "2,1024,3.5" },
          { title: "== กับ === ต่างกัน", desc: "กับดักคลาสสิกของ JavaScript ที่ทำให้เกิดบั๊กมานักต่อนัก", goal: 'แสดง 2 บรรทัด: ผลของ <b>"5" == 5</b> และ <b>"5" === 5</b> (ต้องได้ <b>true</b> และ <b>false</b>)', starter: ``, hint: '<code>console.log("5" == 5);</code> และ <code>console.log("5" === 5);</code>', xp: 50, check: (o, c) => lines(o).join(",") === "true,false" && /===/.test(c) },
          { title: "ตัดเกรดด้วย if-else if", desc: "เช็คเงื่อนไขเป็นบันไดจากมากไปน้อย", goal: 'มี score = 75 ตัดเกรด: ≥80 <b>A</b> / ≥70 <b>B</b> / ≥60 <b>C</b> / นอกนั้น <b>F</b> (ต้องได้ <b>B</b>)', starter: `const score = 75;\n`, hint: '<code>if (score >= 80) { ... } else if (score >= 70) { ... }</code>', xp: 50, check: (o, c) => eq(o, "B") && /else\s+if/.test(c) },
          { title: "เงื่อนไขร่วมและ falsy", desc: "|| ใช้ใส่ค่าสำรองเมื่อค่าเดิมว่าง เป็นสำนวนที่เจอบ่อยมากในโค้ดจริง", goal: 'มี <b>let username = ""</b> (ค่าว่าง) ใช้ <b>||</b> ให้แสดง <b>ผู้เยี่ยมชม</b> แทน', starter: `let username = "";\n`, hint: '<code>console.log(username || "ผู้เยี่ยมชม");</code>', xp: 50, check: (o, c) => eq(o, "ผู้เยี่ยมชม") && /\|\|/.test(c) },
          { title: "Ternary หนึ่งบรรทัด", desc: "เขียน if-else แบบสั้น เหมาะกับการเลือกค่าเพียงสองทาง", goal: 'มี age = 20 ใช้ <b>ternary</b> แสดง <b>ผู้ใหญ่</b> ถ้า ≥ 18 ไม่งั้น <b>เยาวชน</b>', starter: `const age = 20;\n`, hint: '<code>console.log(age >= 18 ? "ผู้ใหญ่" : "เยาวชน");</code>', xp: 60, check: (o, c) => eq(o, "ผู้ใหญ่") && /\?/.test(c) && /:/.test(c) },
          { title: "เมนูด้วย switch", desc: "switch อ่านง่ายกว่า if ยาวๆ เมื่อเทียบกับค่าที่แน่นอนหลายค่า", desc2: "", goal: 'มี day = 3 ใช้ <b>switch</b>: 1 = <b>จันทร์</b>, 2 = <b>อังคาร</b>, 3 = <b>พุธ</b>, default = <b>ไม่ทราบ</b> (ต้องได้ <b>พุธ</b>)', starter: `const day = 3;\n`, hint: '<code>switch (day) { case 1: ... break; ... default: ... }</code>', xp: 60, check: (o, c) => eq(o, "พุธ") && /switch/.test(c) && /break/.test(c) }
        ]
      },
      {
        id: "jsloop", icon: "js", title: "หน่วยที่ 3: การวนซ้ำ",
        blurb: "for, while, do-while, break/continue และ for...of",
        lesson: [
          { h: "ลูป for", p: "โครงสร้าง 3 ส่วนในบรรทัดเดียว: ค่าเริ่มต้น; เงื่อนไข; การเปลี่ยนค่า — ใช้เมื่อรู้จำนวนรอบ", code: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}" },
          { h: "while และ do-while", p: "<b>while</b> เช็คเงื่อนไขก่อนทำ (อาจไม่ทำเลยสักรอบ) • <b>do-while</b> ทำก่อนแล้วค่อยเช็ค (ทำอย่างน้อย 1 รอบเสมอ) — ต้องมีบรรทัดเปลี่ยนค่าข้างใน ไม่งั้นลูปไม่จบและเบราว์เซอร์ค้าง" },
          { h: "break และ continue", p: "<b>break</b> ออกจากลูปทันที (เช่น เจอสิ่งที่หาแล้ว) • <b>continue</b> ข้ามรอบปัจจุบันไปรอบถัดไป (เช่น ข้ามข้อมูลที่ไม่ต้องการ)" },
          { h: "for...of และ for...in", p: "<b>for...of</b> วนอ่าน<b>ค่า</b>ในอาร์เรย์หรือ string โดยตรง อ่านง่ายที่สุด • <b>for...in</b> วนอ่าน<b>คีย์</b>ของออบเจ็กต์ — อย่าใช้ for...in กับอาร์เรย์", code: "const fruits = [\"แอปเปิล\", \"กล้วย\"];\nfor (const f of fruits) {\n  console.log(f);\n}" }
        ],
        stages: [
          { title: "นับด้วย for", desc: "โครงลูปมาตรฐานที่ใช้บ่อยที่สุด", goal: 'ใช้ for แสดงเลข <b>1 ถึง 5</b> บรรทัดละเลข', starter: ``, hint: '<code>for (let i = 1; i <= 5; i++) { console.log(i); }</code>', xp: 40, check: (o, c) => lines(o).join(",") === "1,2,3,4,5" && /for\s*\(/.test(c) },
          { title: "ผลรวม 1 ถึง 100", desc: "สะสมค่าในตัวแปรระหว่างวนลูป — รูปแบบที่ใช้ตลอดในงานจริง", goal: 'หาผลรวมของเลข 1 ถึง 100 แล้วแสดงผล (ต้องได้ <b>5050</b>)', starter: `let sum = 0;\n`, hint: 'ในลูป <code>sum += i;</code> จบลูปค่อย console.log(sum)', xp: 50, check: (o, c) => eq(o, "5050") && /for|while/.test(c) },
          { title: "นับถอยหลังด้วย while", desc: "while เหมาะเมื่อไม่รู้จำนวนรอบล่วงหน้า แต่รู้เงื่อนไขที่จะหยุด", goal: 'ใช้ <b>while</b> นับถอยหลัง <b>3, 2, 1</b> แล้วปิดท้ายด้วย <b>เริ่ม!</b>', starter: `let n = 3;\n`, hint: '<code>while (n > 0) { console.log(n); n--; }</code>', xp: 50, check: (o, c) => lines(o).join(",") === "3,2,1,เริ่ม!" && /while/.test(c) },
          { title: "ข้ามและหยุดด้วย continue/break", desc: "continue ข้ามรอบนี้ break ออกจากลูปเลย", goal: 'วน 1 ถึง 10: <b>ข้าม</b>เลข 3 (continue) และ<b>หยุด</b>เมื่อถึง 6 (break) — ต้องได้ <b>1, 2, 4, 5</b>', starter: ``, hint: '<code>if (i === 3) continue;</code> และ <code>if (i === 6) break;</code>', xp: 60, check: (o, c) => lines(o).join(",") === "1,2,4,5" && /continue/.test(c) && /break/.test(c) },
          { title: "วนอ่านด้วย for...of", desc: "for...of หยิบค่าในอาร์เรย์มาให้ตรงๆ ไม่ต้องยุ่งกับดัชนี", goal: 'ใช้ <b>for...of</b> แสดงผลไม้ทุกตัวในอาร์เรย์ (บรรทัดละตัว)', starter: `const fruits = ["แอปเปิล", "กล้วย", "ส้ม"];\n`, hint: '<code>for (const f of fruits) { console.log(f); }</code>', xp: 60, check: (o, c) => lines(o).join(",") === "แอปเปิล,กล้วย,ส้ม" && /for\s*\(\s*(const|let)\s+\w+\s+of\s+/.test(c) }
        ]
      },
      {
        id: "jsfunc", icon: "js", title: "หน่วยที่ 4: ฟังก์ชัน",
        blurb: "สร้างฟังก์ชัน พารามิเตอร์ return ค่าเริ่มต้น arrow function ขอบเขต และ callback",
        lesson: [
          { h: "สร้างและเรียกใช้ฟังก์ชัน", p: "ฟังก์ชันคือกล่องเก็บโค้ดที่เรียกใช้ซ้ำได้ — ประกาศด้วย <b>function</b> แล้วเรียกด้วยชื่อตามด้วยวงเล็บ", code: "function greet(name) {\n  return `สวัสดี ${name}`;\n}\nconsole.log(greet(\"มะลิ\"));" },
          { h: "พารามิเตอร์และค่าเริ่มต้น", p: "รับค่าเข้าได้หลายตัว คั่นด้วย , • กำหนด<b>ค่าเริ่มต้น</b>ได้ด้วย <code>=</code> ถ้าผู้เรียกไม่ส่งค่ามา • <b>return</b> ส่งผลลัพธ์กลับและจบฟังก์ชันทันที (โค้ดหลัง return ไม่ทำงาน)", code: "function add(a, b = 10) {\n  return a + b;\n}" },
          { h: "Arrow function", p: "รูปแบบสั้นที่นิยมมากใน JavaScript สมัยใหม่ — ถ้าเนื้อฟังก์ชันมีบรรทัดเดียว ตัด { } และ return ได้เลย", code: "const double = (x) => x * 2;\nconst add = (a, b) => a + b;\nconsole.log(double(21));  // 42" },
          { h: "ขอบเขตตัวแปร (Scope)", p: "ตัวแปรที่ประกาศด้วย let/const ใน { } จะอยู่แค่ในบล็อกนั้น (block scope) • ตัวแปรในฟังก์ชันเป็นของฟังก์ชันนั้น มองจากข้างนอกไม่เห็น • ฟังก์ชันมองเห็นตัวแปรข้างนอกได้ (closure)" },
          { h: "Callback — ฟังก์ชันเป็นค่าได้", p: "ใน JavaScript ฟังก์ชันเป็นข้อมูลชนิดหนึ่ง จึงส่งฟังก์ชันเข้าไปเป็นพารามิเตอร์ของอีกฟังก์ชันได้ เรียกว่า <b>callback</b> — เป็นหัวใจของ event และงาน async ที่จะเจอในหน่วยต่อไป", code: "function run(fn) {\n  fn();\n}\nrun(() => console.log(\"ทำงานแล้ว\"));" }
        ],
        stages: [
          { title: "ฟังก์ชันแรก", desc: "ประกาศด้วย function แล้วเรียกใช้ด้วยชื่อ", goal: 'สร้างฟังก์ชัน <b>greet()</b> ที่แสดง <b>สวัสดีชาวโลก</b> แล้วเรียกใช้', starter: ``, hint: '<code>function greet() { console.log("สวัสดีชาวโลก"); }</code> แล้ว <code>greet();</code>', xp: 40, check: (o, c) => eq(o, "สวัสดีชาวโลก") && /function\s+greet/.test(c) && /greet\s*\(\s*\)/.test(c) },
          { title: "รับค่าและคืนค่า", desc: "พารามิเตอร์รับข้อมูลเข้า return ส่งผลลัพธ์กลับ", goal: 'สร้าง <b>add(a, b)</b> ที่คืนผลบวก แล้วแสดงผลของ <b>add(7, 5)</b> (ต้องได้ <b>12</b>)', starter: ``, hint: '<code>function add(a, b) { return a + b; }</code>', xp: 50, check: (o, c) => eq(o, "12") && /return/.test(c) },
          { title: "ค่าเริ่มต้นของพารามิเตอร์", desc: "ถ้าผู้เรียกไม่ส่งค่ามา จะใช้ค่าเริ่มต้นแทน", goal: 'สร้าง <b>greet(name = "ผู้เยี่ยมชม")</b> ที่คืน <b>สวัสดี ชื่อ</b> แล้วแสดงผลของ <b>greet()</b> และ <b>greet("มะลิ")</b> (ต้องได้ <b>สวัสดี ผู้เยี่ยมชม</b> และ <b>สวัสดี มะลิ</b>)', starter: ``, hint: '<code>function greet(name = "ผู้เยี่ยมชม") { return `สวัสดี ${name}`; }</code>', xp: 60, check: (o) => lines(o).join("|") === "สวัสดี ผู้เยี่ยมชม|สวัสดี มะลิ" },
          { title: "Arrow function", desc: "รูปแบบสั้นที่โค้ดสมัยใหม่ใช้กันเป็นมาตรฐาน", goal: 'สร้าง arrow function <b>double</b> ที่คืนค่าคูณสอง แล้วแสดง <b>double(21)</b> (ต้องได้ <b>42</b>)', starter: ``, hint: '<code>const double = (x) => x * 2;</code>', xp: 60, check: (o, c) => eq(o, "42") && /=>/.test(c) },
          { title: "ขอบเขตของตัวแปร", desc: "ตัวแปรในฟังก์ชันเป็นคนละตัวกับตัวแปรข้างนอกที่ชื่อเหมือนกัน", goal: 'มี <b>let x = 10</b> ข้างนอก และในฟังก์ชันประกาศ <b>let x = 99</b> — แสดงค่า x ในฟังก์ชันแล้วตามด้วยค่า x ข้างนอก (ต้องได้ <b>99</b> แล้ว <b>10</b>)', starter: `let x = 10;\nfunction test() {\n  // ประกาศ x ตัวใหม่ในนี้ แล้ว log\n}\ntest();\nconsole.log(x);\n`, hint: 'ในฟังก์ชัน: <code>let x = 99; console.log(x);</code>', xp: 60, check: (o) => lines(o).join(",") === "99,10" },
          { title: "Callback ฟังก์ชันในฟังก์ชัน", desc: "ส่งฟังก์ชันเข้าไปให้อีกฟังก์ชันเรียกใช้ — พื้นฐานของ event และ async", goal: 'สร้าง <b>repeat(n, fn)</b> ที่เรียก fn ซ้ำ n ครั้ง แล้วเรียก <b>repeat(3, () => console.log("ทำ"))</b> (ต้องได้ <b>ทำ</b> 3 บรรทัด)', starter: ``, hint: 'ในฟังก์ชันวนลูป n รอบแล้วเรียก <code>fn();</code>', xp: 80, check: (o, c) => lines(o).join(",") === "ทำ,ทำ,ทำ" && /repeat\s*\(/.test(c) }
        ]
      },
      {
        id: "jsarray", icon: "js", title: "หน่วยที่ 5: อาร์เรย์",
        blurb: "เก็บข้อมูลเป็นชุด เพิ่ม-ลบ และเมท็อดทรงพลัง map / filter / reduce",
        lesson: [
          { h: "สร้างและเข้าถึงอาร์เรย์", p: "อาร์เรย์เก็บหลายค่าใน [ ] เข้าถึงด้วยดัชนีเริ่มที่ <b>0</b> • <code>.length</code> จำนวนสมาชิก • ตัวสุดท้ายคือ <code>arr[arr.length - 1]</code> หรือ <code>arr.at(-1)</code>", code: "const fruits = [\"แอปเปิล\", \"กล้วย\"];\nconsole.log(fruits[0]);      // แอปเปิล\nconsole.log(fruits.length);  // 2" },
          { h: "เพิ่มและลบสมาชิก", p: "<b>push()</b> เพิ่มท้าย • <b>pop()</b> ลบท้าย • <b>unshift()</b> เพิ่มหน้า • <b>shift()</b> ลบหน้า • <b>splice(ตำแหน่ง, จำนวน)</b> ลบ/แทรกตรงกลาง • <b>slice(a, b)</b> ตัดสำเนาออกมาโดยไม่แก้ต้นฉบับ" },
          { h: "map, filter, reduce — สามทหารเสือ", p: "<b>map()</b> แปลงทุกตัวเป็นค่าใหม่ ได้อาร์เรย์ใหม่ขนาดเท่าเดิม • <b>filter()</b> คัดเฉพาะตัวที่ผ่านเงื่อนไข • <b>reduce()</b> ยุบทั้งอาร์เรย์ให้เหลือค่าเดียว (เช่น ผลรวม) — สามตัวนี้คือหัวใจของการเขียน JavaScript สมัยใหม่ ใช้แทนลูป for ได้เกือบทุกกรณี", code: "const n = [1, 2, 3, 4];\nconsole.log(n.map(x => x * 2));      // [2,4,6,8]\nconsole.log(n.filter(x => x > 2));   // [3,4]\nconsole.log(n.reduce((s, x) => s + x, 0)); // 10" },
          { h: "ค้นหาและจัดการอื่นๆ", p: "<b>find()</b> หาตัวแรกที่ตรงเงื่อนไข • <b>includes()</b> มีค่านี้ไหม • <b>indexOf()</b> อยู่ตำแหน่งไหน • <b>sort()</b> เรียงลำดับ (ตัวเลขต้องใส่ฟังก์ชันเทียบ <code>(a,b) => a-b</code>) • <b>join()</b> รวมเป็นข้อความ • <b>reverse()</b> กลับด้าน • <b>forEach()</b> วนทำทีละตัว" }
        ],
        stages: [
          { title: "เข้าถึงสมาชิก", desc: "ดัชนีเริ่มที่ 0 เสมอ", goal: 'แสดง 2 บรรทัด: สมาชิก<b>ตัวแรก</b> และ <b>จำนวนสมาชิก</b> (ต้องได้ <b>แอปเปิล</b> และ <b>3</b>)', starter: `const fruits = ["แอปเปิล", "กล้วย", "ส้ม"];\n`, hint: '<code>fruits[0]</code> และ <code>fruits.length</code>', xp: 40, check: (o) => lines(o).join(",") === "แอปเปิล,3" },
          { title: "เพิ่มและลบ", desc: "push เพิ่มท้าย pop ลบท้าย — ทั้งคู่แก้อาร์เรย์ต้นฉบับ", goal: 'เพิ่ม <b>"มะม่วง"</b> ต่อท้าย แล้วลบตัวสุดท้ายออกด้วย <b>pop()</b> จากนั้นแสดงจำนวนสมาชิก (ต้องได้ <b>2</b>)', starter: `const fruits = ["แอปเปิล", "กล้วย"];\n`, hint: '<code>fruits.push("มะม่วง");</code> แล้ว <code>fruits.pop();</code>', xp: 50, check: (o, c) => eq(o, "2") && /push/.test(c) && /pop/.test(c) },
          { title: "แปลงทุกตัวด้วย map", desc: "map สร้างอาร์เรย์ใหม่จากการแปลงทุกสมาชิก โดยไม่แตะต้นฉบับ", goal: 'ใช้ <b>map</b> คูณทุกตัวด้วย 2 แล้วแสดงผลลัพธ์ที่รวมด้วย <b>join(",")</b> (ต้องได้ <b>2,4,6,8</b>)', starter: `const nums = [1, 2, 3, 4];\n`, hint: '<code>const doubled = nums.map(x => x * 2);</code> แล้ว <code>console.log(doubled.join(","));</code>', xp: 60, check: (o, c) => eq(o, "2,4,6,8") && /\.map\(/.test(c) },
          { title: "คัดกรองด้วย filter", desc: "filter เก็บเฉพาะตัวที่เงื่อนไขเป็นจริง", goal: 'ใช้ <b>filter</b> เลือกเฉพาะเลขที่ <b>มากกว่า 50</b> แล้วแสดงด้วย join(",") (ต้องได้ <b>80,95</b>)', starter: `const scores = [45, 80, 30, 95];\n`, hint: '<code>scores.filter(s => s > 50)</code>', xp: 60, check: (o, c) => eq(o, "80,95") && /\.filter\(/.test(c) },
          { title: "รวมค่าด้วย reduce", desc: "reduce ยุบอาร์เรย์เหลือค่าเดียว — พารามิเตอร์ตัวที่สองคือค่าเริ่มต้น", goal: 'ใช้ <b>reduce</b> หาผลรวมของอาร์เรย์ (ต้องได้ <b>67</b>)', starter: `const nums = [12, 30, 25];\n`, hint: '<code>nums.reduce((sum, x) => sum + x, 0)</code>', xp: 80, check: (o, c) => eq(o, "67") && /\.reduce\(/.test(c) },
          { title: "ค้นหาด้วย find และ includes", desc: "find คืนตัวแรกที่ตรงเงื่อนไข ส่วน includes ตอบแค่มีหรือไม่มี", goal: 'แสดง 2 บรรทัด: ใช้ <b>find</b> หาเลขแรกที่มากกว่า 20 (ต้องได้ <b>30</b>) และใช้ <b>includes</b> เช็คว่ามีเลข 12 ไหม (ต้องได้ <b>true</b>)', starter: `const nums = [12, 30, 25];\n`, hint: '<code>nums.find(x => x > 20)</code> และ <code>nums.includes(12)</code>', xp: 60, check: (o, c) => lines(o).join(",") === "30,true" && /\.find\(/.test(c) && /\.includes\(/.test(c) },
          { title: "เรียงลำดับตัวเลข", desc: "sort() เรียงแบบข้อความโดยปริยาย ตัวเลขต้องใส่ฟังก์ชันเทียบเสมอ", goal: 'เรียงอาร์เรย์<b>จากน้อยไปมาก</b>ด้วย <b>sort((a, b) => a - b)</b> แล้วแสดงด้วย join(",") (ต้องได้ <b>5,12,30,100</b>)', starter: `const nums = [30, 5, 100, 12];\n`, hint: 'ถ้าใช้ sort() เฉยๆ จะได้ 100 มาก่อน 12 เพราะเรียงแบบข้อความ', xp: 80, check: (o, c) => eq(o, "5,12,30,100") && /sort\(\s*\(/.test(c) }
        ]
      },
      {
        id: "jsobj", icon: "js", title: "หน่วยที่ 6: ออบเจ็กต์",
        blurb: "เก็บข้อมูลเป็นคู่คีย์-ค่า เมท็อด this การซ้อนชั้น destructuring และ spread",
        lesson: [
          { h: "ออบเจ็กต์คืออะไร", p: "เก็บข้อมูลหลายอย่างของสิ่งเดียวกันไว้ด้วยกันเป็นคู่ <b>คีย์: ค่า</b> — เข้าถึงด้วย <code>obj.key</code> (นิยม) หรือ <code>obj[\"key\"]</code> (ใช้เมื่อคีย์เป็นตัวแปร)", code: "const player = {\n  name: \"มะลิ\",\n  hp: 100,\n  isAlive: true\n};\nconsole.log(player.name);" },
          { h: "เพิ่ม แก้ ลบ property", p: "กำหนดค่าให้คีย์ใหม่เพื่อเพิ่ม คีย์เดิมเพื่อแก้ • <code>delete obj.key</code> ลบ • <code>\"key\" in obj</code> เช็คว่ามีไหม • <code>Object.keys(obj)</code> ได้อาร์เรย์ของคีย์ทั้งหมด, <code>Object.values()</code> ได้ค่าทั้งหมด" },
          { h: "เมท็อดและ this", p: "ฟังก์ชันที่อยู่ในออบเจ็กต์เรียกว่า <b>เมท็อด</b> — ใช้ <b>this</b> อ้างถึงตัวออบเจ็กต์เอง (ระวัง: arrow function ไม่มี this เป็นของตัวเอง จึงไม่ควรใช้เป็นเมท็อด)", code: "const player = {\n  name: \"มะลิ\",\n  greet() {\n    return `ฉันคือ ${this.name}`;\n  }\n};" },
          { h: "ซ้อนชั้นและอาร์เรย์ของออบเจ็กต์", p: "ออบเจ็กต์ซ้อนออบเจ็กต์ หรือเก็บอาร์เรย์ไว้ข้างในได้ • <b>อาร์เรย์ของออบเจ็กต์</b>คือรูปแบบข้อมูลที่พบบ่อยที่สุดในงานจริง (เช่น รายชื่อสินค้าจาก API) ใช้คู่กับ map/filter ได้ทรงพลังมาก" },
          { h: "Destructuring และ Spread", p: "<b>Destructuring</b> ดึงค่าออกมาเป็นตัวแปรในบรรทัดเดียว: <code>const { name, hp } = player;</code> • <b>Spread (...)</b> คลี่ออบเจ็กต์/อาร์เรย์ออกมา ใช้คัดลอกหรือรวม: <code>const copy = { ...player, hp: 50 };</code>" }
        ],
        stages: [
          { title: "อ่านค่าจากออบเจ็กต์", desc: "ใช้จุดตามด้วยชื่อคีย์", goal: 'แสดง 2 บรรทัด: <b>player.name</b> และ <b>player.hp</b> (ต้องได้ <b>มะลิ</b> และ <b>100</b>)', starter: `const player = { name: "มะลิ", hp: 100 };\n`, hint: '<code>console.log(player.name);</code>', xp: 40, check: (o) => lines(o).join(",") === "มะลิ,100" },
          { title: "เพิ่มและแก้ไข property", desc: "กำหนดค่าให้คีย์ใหม่คือเพิ่ม คีย์เดิมคือแก้", goal: 'เพิ่ม <b>level = 5</b> และแก้ <b>hp เป็น 80</b> แล้วแสดง 2 บรรทัด: hp และ level (ต้องได้ <b>80</b> และ <b>5</b>)', starter: `const player = { name: "มะลิ", hp: 100 };\n`, hint: '<code>player.level = 5;</code> และ <code>player.hp = 80;</code>', xp: 50, check: (o) => lines(o).join(",") === "80,5" },
          { title: "เมท็อดและ this", desc: "this ในเมท็อดหมายถึงออบเจ็กต์ที่เมท็อดนั้นสังกัดอยู่", goal: 'เพิ่มเมท็อด <b>greet()</b> ที่คืนข้อความ <b>ฉันคือ มะลิ</b> โดยใช้ <b>this.name</b> แล้วเรียกแสดงผล', starter: `const player = {\n  name: "มะลิ",\n  // เพิ่มเมท็อด greet ตรงนี้\n};\n`, hint: '<code>greet() { return `ฉันคือ ${this.name}`; }</code> แล้ว <code>console.log(player.greet());</code>', xp: 60, check: (o, c) => eq(o, "ฉันคือ มะลิ") && /this\.name/.test(c) },
          { title: "คีย์ทั้งหมดด้วย Object.keys", desc: "Object.keys ได้อาร์เรย์ของชื่อคีย์ นำไปวนลูปต่อได้", goal: 'แสดงคีย์ทั้งหมดของ player รวมด้วย join(",") (ต้องได้ <b>name,hp,level</b>)', starter: `const player = { name: "มะลิ", hp: 100, level: 5 };\n`, hint: '<code>console.log(Object.keys(player).join(","));</code>', xp: 60, check: (o, c) => eq(o, "name,hp,level") && /Object\.keys/.test(c) },
          { title: "อาร์เรย์ของออบเจ็กต์", desc: "รูปแบบข้อมูลที่พบบ่อยที่สุดในงานจริง — ใช้ filter/map จัดการได้เลย", goal: 'ใช้ <b>filter</b> เลือกนักเรียนที่คะแนน ≥ 70 แล้วใช้ <b>map</b> ดึงเฉพาะชื่อ แสดงด้วย join(",") (ต้องได้ <b>ฟ้า,ใบเตย</b>)', starter: `const students = [\n  { name: "มะลิ", score: 65 },\n  { name: "ฟ้า", score: 80 },\n  { name: "ใบเตย", score: 92 }\n];\n`, hint: '<code>students.filter(s => s.score >= 70).map(s => s.name).join(",")</code>', xp: 80, check: (o, c) => eq(o, "ฟ้า,ใบเตย") && /\.filter\(/.test(c) && /\.map\(/.test(c) },
          { title: "Destructuring และ Spread", desc: "สองไวยากรณ์สมัยใหม่ที่เจอในทุกโปรเจกต์ JavaScript ยุคนี้", goal: 'ใช้ <b>destructuring</b> ดึง name กับ hp ออกมาแล้วแสดง <b>มะลิ 100</b> จากนั้นใช้ <b>spread</b> สร้างสำเนาที่ hp = 50 แล้วแสดง hp ของสำเนา (ต้องได้ <b>50</b>)', starter: `const player = { name: "มะลิ", hp: 100 };\n`, hint: '<code>const { name, hp } = player;</code> และ <code>const copy = { ...player, hp: 50 };</code>', xp: 80, check: (o, c) => lines(o).join(",") === "มะลิ 100,50" && /const\s*\{[^}]*\}\s*=/.test(c) && /\.\.\./.test(c) }
        ]
      },
      {
        id: "jsdom", icon: "js", title: "หน่วยที่ 7: จัดการ DOM",
        blurb: "เลือกอิลิเมนต์ เปลี่ยนข้อความ สไตล์ คลาส และสร้างอิลิเมนต์ใหม่ด้วยโค้ด",
        lesson: [
          { h: "DOM คืออะไร", p: "<b>DOM (Document Object Model)</b> คือหน้าเว็บที่ถูกแปลงเป็นออบเจ็กต์ให้ JavaScript เข้าไปอ่านและแก้ไขได้ — เปลี่ยน DOM แล้วหน้าเว็บเปลี่ยนทันทีโดยไม่ต้องโหลดใหม่ นี่คือหัวใจของเว็บยุคใหม่" },
          { h: "เลือกอิลิเมนต์", p: "<b>document.querySelector(\"selector\")</b> เลือกตัวแรกที่ตรง (ใช้ selector แบบ CSS ได้ทั้งหมด — แนะนำให้ใช้ตัวนี้) • <b>document.querySelectorAll()</b> เลือกทั้งหมด ได้ NodeList • <b>getElementById(\"id\")</b> แบบเก่าแต่ยังใช้ได้", code: "const title = document.querySelector(\"#title\");\nconst items = document.querySelectorAll(\".item\");" },
          { h: "อ่านและเปลี่ยนเนื้อหา", p: "<b>textContent</b> ข้อความล้วน (ปลอดภัย แนะนำให้ใช้) • <b>innerHTML</b> ใส่ HTML ได้ (ระวังช่องโหว่ XSS ถ้าใส่ข้อมูลจากผู้ใช้) • <b>value</b> ค่าของช่องกรอก input • <b>src</b>, <b>href</b> เปลี่ยนได้ตรงๆ" },
          { h: "เปลี่ยนสไตล์และคลาส", p: "<b>element.style.color = \"red\"</b> แก้สไตล์ทีละตัว (ชื่อคุณสมบัติเป็น camelCase เช่น backgroundColor) • วิธีที่ดีกว่าคือใช้ <b>classList</b>: <code>add()</code>, <code>remove()</code>, <code>toggle()</code>, <code>contains()</code> แล้วไปกำหนดสไตล์ใน CSS", code: "box.style.backgroundColor = \"tomato\";\nbox.classList.add(\"active\");" },
          { h: "สร้างและลบอิลิเมนต์", p: "<b>document.createElement(\"li\")</b> สร้างใหม่ • ตั้งค่าเนื้อหา แล้ว <b>parent.appendChild(el)</b> หรือ <b>parent.append(el)</b> เพื่อนำไปแปะ • <b>el.remove()</b> ลบทิ้ง • <b>setAttribute(ชื่อ, ค่า)</b> / <b>getAttribute()</b> จัดการแอตทริบิวต์" }
        ],
        stages: [
          { html: `<h1 id="title">ข้อความเดิม</h1>`, title: "เปลี่ยนข้อความในหน้าเว็บ", desc: "เลือกอิลิเมนต์ด้วย querySelector แล้วเปลี่ยน textContent — ดูผลได้ในพรีวิวด้านล่างเลย", goal: 'เปลี่ยนข้อความใน <b>#title</b> เป็น <b>เปลี่ยนด้วย JavaScript</b>', starter: `// เลือก #title แล้วเปลี่ยนข้อความ\n`, hint: '<code>document.querySelector("#title").textContent = "เปลี่ยนด้วย JavaScript";</code>', xp: 50, check: (o, c, d) => W.txt(d, "#title") === "เปลี่ยนด้วย JavaScript" },
          { html: `<div id="box">กล่อง</div>`, title: "เปลี่ยนสไตล์ด้วย JavaScript", desc: "element.style แก้ CSS ได้โดยตรง ชื่อคุณสมบัติที่มีขีดกลางเปลี่ยนเป็น camelCase", goal: 'ทำให้ <b>#box</b> มี <b>backgroundColor = "tomato"</b> และ <b>color = "white"</b>', starter: `const box = document.querySelector("#box");\n`, hint: '<code>box.style.backgroundColor = "tomato";</code>', xp: 60, check: (o, c, d) => W.cssColor(d, "#box", "background-color", "tomato") && W.cssColor(d, "#box", "color", "white") },
          { html: `<style>.active { border: 2px solid green; }</style><div id="card">การ์ด</div>`, title: "เพิ่มคลาสด้วย classList", desc: "วิธีที่มืออาชีพนิยม: กำหนดสไตล์ไว้ใน CSS แล้วให้ JavaScript แค่สลับคลาส", goal: 'เพิ่มคลาส <b>active</b> ให้ <b>#card</b> ด้วย <b>classList.add()</b>', starter: ``, hint: '<code>document.querySelector("#card").classList.add("active");</code>', xp: 60, check: (o, c, d) => { const el = W.q(d, "#card"); return !!el && el.classList.contains("active") && /classList\.add/.test(c); } },
          { html: `<ul id="list"><li>รายการเดิม</li></ul>`, title: "สร้างอิลิเมนต์ใหม่", desc: "createElement + appendChild คือวิธีเพิ่มเนื้อหาใหม่เข้าหน้าเว็บด้วยโค้ด", goal: 'สร้าง <b>li</b> ใหม่ข้อความ <b>รายการใหม่</b> แล้วเพิ่มเข้าไปใน <b>#list</b> (ต้องมี li ทั้งหมด 2 ตัว)', starter: `const list = document.querySelector("#list");\n`, hint: '<code>const li = document.createElement("li"); li.textContent = "รายการใหม่"; list.appendChild(li);</code>', xp: 80, check: (o, c, d) => { const li = W.qa(d, "#list li").map(e => W.txt(e)); return li.length === 2 && li[1] === "รายการใหม่" && /createElement/.test(c); } },
          { html: `<ul id="menu"><li>หนึ่ง</li><li>สอง</li><li>สาม</li></ul>`, title: "วนจัดการหลายอิลิเมนต์", desc: "querySelectorAll ได้หลายตัว นำมาวนด้วย forEach เพื่อจัดการทีเดียวทั้งหมด", goal: 'ใช้ <b>querySelectorAll</b> เลือก li ทุกตัวใน #menu แล้ววนเติมข้อความ <b> ✓</b> ต่อท้ายทุกตัว (เช่น <b>หนึ่ง ✓</b>)', starter: ``, hint: '<code>document.querySelectorAll("#menu li").forEach(li => { li.textContent += " ✓"; });</code>', xp: 80, check: (o, c, d) => { const li = W.qa(d, "#menu li").map(e => W.txt(e)); return li.join(",") === "หนึ่ง ✓,สอง ✓,สาม ✓" && /querySelectorAll/.test(c); } },
          { html: `<img id="pic" src="old.jpg" alt="รูปเดิม">`, title: "จัดการแอตทริบิวต์", desc: "เปลี่ยน src/alt ของรูปได้ด้วย setAttribute หรือกำหนดค่าตรงๆ", goal: 'เปลี่ยน <b>src</b> ของ #pic เป็น <b>new.jpg</b> และ <b>alt</b> เป็น <b>รูปใหม่</b>', starter: `const pic = document.querySelector("#pic");\n`, hint: '<code>pic.src = "new.jpg";</code> หรือ <code>pic.setAttribute("src", "new.jpg");</code>', xp: 60, check: (o, c, d) => W.attr(d, "#pic", "src").includes("new.jpg") && W.attr(d, "#pic", "alt") === "รูปใหม่" },
          { html: `<div id="app"></div>`, title: "สร้างการ์ดจากข้อมูล", desc: "รวมอาร์เรย์ของออบเจ็กต์เข้ากับ DOM — วิธีที่เว็บจริงใช้แสดงรายการสินค้าจากฐานข้อมูล", goal: 'วนอาร์เรย์ <b>items</b> สร้าง <b>&lt;p class="item"&gt;</b> ที่มีข้อความ <b>ชื่อ - ราคา</b> (เช่น <b>กาแฟ - 50</b>) ใส่ลงใน <b>#app</b> ทั้ง 2 รายการ', starter: `const items = [\n  { name: "กาแฟ", price: 50 },\n  { name: "ชาเย็น", price: 45 }\n];\nconst app = document.querySelector("#app");\n`, hint: 'วน forEach สร้าง p ตั้ง textContent แล้ว app.appendChild(p) และอย่าลืม <code>p.className = "item";</code>', xp: 100, check: (o, c, d) => { const p = W.qa(d, "#app p.item").map(e => W.txt(e)); return p.length === 2 && p[0] === "กาแฟ - 50" && p[1] === "ชาเย็น - 45"; } }
        ]
      },
      {
        id: "jsevent", icon: "js", title: "หน่วยที่ 8: เหตุการณ์และฟอร์ม",
        blurb: "ตอบสนองการคลิก การพิมพ์ และการส่งฟอร์ม — ทำให้เว็บโต้ตอบได้จริง",
        lesson: [
          { h: "Event และ addEventListener", p: "<b>เหตุการณ์ (event)</b> คือสิ่งที่เกิดขึ้นบนหน้าเว็บ เช่น คลิก พิมพ์ เลื่อนหน้า — ดักฟังด้วย <b>element.addEventListener(\"ชื่อเหตุการณ์\", ฟังก์ชัน)</b> ฟังก์ชันนั้นเรียกว่า event handler จะทำงานเมื่อเหตุการณ์เกิดขึ้น", code: "btn.addEventListener(\"click\", () => {\n  console.log(\"ถูกคลิกแล้ว\");\n});" },
          { h: "เหตุการณ์ที่ใช้บ่อย", p: "<b>click</b> คลิก • <b>input</b> ทุกครั้งที่พิมพ์ในช่องกรอก • <b>change</b> เมื่อค่าเปลี่ยนและออกจากช่อง • <b>submit</b> ส่งฟอร์ม • <b>keydown</b> กดปุ่มคีย์บอร์ด • <b>mouseover</b> / <b>mouseout</b> เมาส์เข้า-ออก • <b>DOMContentLoaded</b> โหลดหน้าเสร็จ" },
          { h: "ออบเจ็กต์ event", p: "ฟังก์ชัน handler รับพารามิเตอร์ตัวแรกเป็นออบเจ็กต์ <b>event</b> ที่บอกรายละเอียด: <b>event.target</b> อิลิเมนต์ที่ถูกกระทำ • <b>event.target.value</b> ค่าในช่องกรอก • <b>event.key</b> ปุ่มที่กด" },
          { h: "preventDefault กับฟอร์ม", p: "ปกติการกดส่งฟอร์มจะทำให้หน้าเว็บโหลดใหม่ — <b>event.preventDefault()</b> ยกเลิกพฤติกรรมเริ่มต้นนั้น เพื่อให้เราจัดการข้อมูลด้วย JavaScript เองได้ (เว็บสมัยใหม่ทำแบบนี้ทั้งหมด)", code: "form.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  console.log(input.value);\n});" }
        ],
        stages: [
          { html: `<button id="btn">กดฉัน</button><p id="msg">ยังไม่ได้กด</p>`, title: "ปุ่มที่คลิกได้", desc: "addEventListener ผูกฟังก์ชันเข้ากับการคลิก (ระบบจะกดปุ่มให้อัตโนมัติตอนตรวจคำตอบ — และคุณกดเองในพรีวิวได้ด้วย)", goal: 'เมื่อคลิก <b>#btn</b> ให้เปลี่ยนข้อความใน <b>#msg</b> เป็น <b>กดแล้ว!</b>', starter: `const btn = document.querySelector("#btn");\n`, hint: '<code>btn.addEventListener("click", () => { document.querySelector("#msg").textContent = "กดแล้ว!"; });</code>', xp: 60, check: (o, c, d) => { const b = W.q(d, "#btn"); if (!b) return false; b.click(); return W.txt(d, "#msg") === "กดแล้ว!"; } },
          { html: `<button id="counter">0</button>`, title: "ตัวนับการคลิก", desc: "เก็บสถานะไว้ในตัวแปรนอกฟังก์ชัน แล้วอัปเดตทุกครั้งที่คลิก", goal: 'ทุกครั้งที่คลิก <b>#counter</b> ให้เพิ่มตัวเลขบนปุ่มขึ้นทีละ 1 (ระบบจะกด 3 ครั้ง ต้องได้ <b>3</b>)', starter: `let count = 0;\nconst btn = document.querySelector("#counter");\n`, hint: 'ใน handler: <code>count++; btn.textContent = count;</code>', xp: 80, check: (o, c, d) => { const b = W.q(d, "#counter"); if (!b) return false; b.click(); b.click(); b.click(); return W.txt(b) === "3"; } },
          { html: `<input id="name" type="text"><p id="preview">ยังไม่พิมพ์</p>`, title: "แสดงผลขณะพิมพ์", desc: "เหตุการณ์ input เกิดทุกครั้งที่ค่าในช่องเปลี่ยน — ใช้ทำ live preview", goal: 'เมื่อพิมพ์ใน <b>#name</b> ให้ <b>#preview</b> แสดงข้อความที่พิมพ์ทันที (ใช้ <b>event.target.value</b>)', starter: `const input = document.querySelector("#name");\n`, hint: '<code>input.addEventListener("input", (e) => { document.querySelector("#preview").textContent = e.target.value; });</code>', xp: 80, check: (o, c, d) => { const i = W.q(d, "#name"); if (!i) return false; i.value = "ทดสอบ"; i.dispatchEvent(new (d.defaultView.Event)("input", { bubbles: true })); return W.txt(d, "#preview") === "ทดสอบ"; } },
          { html: `<form id="form"><input id="email" type="email" value="test@example.com"><button type="submit">ส่ง</button></form><p id="result"></p>`, title: "รับข้อมูลจากฟอร์ม", desc: "preventDefault กันหน้าเว็บโหลดใหม่ แล้วจัดการข้อมูลเองด้วย JavaScript", goal: 'เมื่อ <b>submit</b> ฟอร์ม ให้เรียก <b>e.preventDefault()</b> แล้วแสดงค่าในช่องอีเมลลงใน <b>#result</b>', starter: `const form = document.querySelector("#form");\n`, hint: '<code>form.addEventListener("submit", (e) => { e.preventDefault(); ... });</code>', xp: 100, check: (o, c, d) => { const f = W.q(d, "#form"); if (!f) return false; f.dispatchEvent(new (d.defaultView.Event)("submit", { bubbles: true, cancelable: true })); return W.txt(d, "#result") === "test@example.com" && /preventDefault/.test(c); } },
          { html: `<style>.done { text-decoration: line-through; }</style><ul id="todo"><li>งานที่หนึ่ง</li><li>งานที่สอง</li></ul>`, title: "บอสหน่วย: รายการที่กดติ๊กได้", desc: "รวม DOM + event + classList — เมื่อคลิกที่รายการไหน รายการนั้นถูกขีดฆ่า", goal: 'ทำให้ทุก <b>li</b> ใน #todo เมื่อ<b>คลิก</b>แล้วได้คลาส <b>done</b> (ใช้ querySelectorAll + forEach + addEventListener + classList)', starter: `const items = document.querySelectorAll("#todo li");\n`, hint: '<code>items.forEach(li => li.addEventListener("click", () => li.classList.add("done")));</code>', xp: 120, check: (o, c, d) => { const li = W.qa(d, "#todo li"); if (li.length !== 2) return false; li[1].click(); return li[1].classList.contains("done") && !li[0].classList.contains("done"); } }
        ]
      },
      {
        id: "jsadv", icon: "js", title: "หน่วยที่ 9: JavaScript ขั้นสูง",
        blurb: "เมท็อดข้อความ JSON การจัดการข้อผิดพลาด งานแบบ async และคลาส",
        lesson: [
          { h: "เมท็อดของข้อความ", p: "<b>.length</b> ความยาว • <b>.toUpperCase() / .toLowerCase()</b> • <b>.trim()</b> ตัดช่องว่างหัวท้าย • <b>.includes()</b> มีคำนี้ไหม • <b>.split(\"x\")</b> แยกเป็นอาร์เรย์ • <b>.replace(a, b)</b> แทนที่ • <b>.slice(a, b)</b> ตัดช่วง • <b>.padStart()</b> เติมด้านหน้า (ทำเลขนาฬิกา 09:05)" },
          { h: "JSON — ภาษากลางของข้อมูล", p: "<b>JSON</b> คือรูปแบบข้อความมาตรฐานที่ใช้รับส่งข้อมูลระหว่างเว็บกับเซิร์ฟเวอร์ • <b>JSON.stringify(obj)</b> แปลงออบเจ็กต์เป็นข้อความ • <b>JSON.parse(str)</b> แปลงข้อความกลับเป็นออบเจ็กต์", code: "const s = JSON.stringify({ name: \"มะลิ\" });\nconst o = JSON.parse(s);\nconsole.log(o.name);" },
          { h: "จัดการข้อผิดพลาด", p: "<b>try { } catch (err) { }</b> ดักข้อผิดพลาดไม่ให้โปรแกรมพังทั้งหน้า • <b>finally</b> ทำเสมอไม่ว่าจะพลาดหรือไม่ • <b>throw new Error(\"ข้อความ\")</b> โยนข้อผิดพลาดเอง — สำคัญมากเมื่อทำงานกับข้อมูลจากภายนอก" },
          { h: "งานแบบ Asynchronous", p: "งานที่ใช้เวลา (โหลดข้อมูล ตั้งเวลา) ไม่หยุดรอทั้งหน้าเว็บ • <b>setTimeout(fn, ms)</b> ทำหลังผ่านไป ms มิลลิวินาที • <b>Promise</b> ตัวแทนของผลลัพธ์ที่จะมาในอนาคต (<code>.then()</code> / <code>.catch()</code>) • <b>async/await</b> เขียน Promise ให้อ่านเหมือนโค้ดปกติ • <b>fetch()</b> ดึงข้อมูลจาก API", code: "async function load() {\n  const res = await fetch(\"/api/data\");\n  const data = await res.json();\n  console.log(data);\n}" },
          { h: "คลาสและ OOP", p: "<b>class</b> คือแม่พิมพ์สร้างออบเจ็กต์ • <b>constructor</b> ทำงานตอนสร้างด้วย <code>new</code> • เมท็อดเขียนในคลาสได้เลย • <b>extends</b> สืบทอดจากคลาสแม่ และเรียก <code>super()</code> เพื่อใช้ constructor ของแม่", code: "class Hero {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `ฉันคือ ${this.name}`;\n  }\n}\nconsole.log(new Hero(\"มะลิ\").greet());" }
        ],
        stages: [
          { title: "จัดการข้อความ", desc: "เมท็อดของ string ที่ใช้บ่อยในการทำความสะอาดข้อมูลจากผู้ใช้", goal: 'มี <b>text = "  Hello World  "</b> แสดง 2 บรรทัด: ตัดช่องว่างหัวท้ายแล้วทำเป็นตัวพิมพ์ใหญ่ (<b>HELLO WORLD</b>) และจำนวนคำที่ได้จากการ split ด้วยช่องว่าง (<b>2</b>)', starter: `const text = "  Hello World  ";\n`, hint: '<code>text.trim().toUpperCase()</code> และ <code>text.trim().split(" ").length</code>', xp: 60, check: (o, c) => lines(o).join(",") === "HELLO WORLD,2" && /trim\(\)/.test(c) },
          { title: "JSON ไปกลับ", desc: "ทุกครั้งที่เว็บคุยกับเซิร์ฟเวอร์ ข้อมูลจะเดินทางในรูปแบบ JSON", goal: 'แปลงออบเจ็กต์เป็นข้อความ JSON แล้วแปลงกลับ จากนั้นแสดง <b>name</b> ของออบเจ็กต์ที่แปลงกลับมา (ต้องได้ <b>มะลิ</b>)', starter: `const player = { name: "มะลิ", hp: 100 };\n`, hint: '<code>const s = JSON.stringify(player); const o = JSON.parse(s); console.log(o.name);</code>', xp: 60, check: (o, c) => eq(o, "มะลิ") && /JSON\.stringify/.test(c) && /JSON\.parse/.test(c) },
          { title: "ดักข้อผิดพลาด", desc: "try-catch กันโปรแกรมพังเมื่อเจอข้อมูลผิดรูปแบบ", goal: 'ใช้ <b>try-catch</b> รอบ <b>JSON.parse("ข้อมูลพัง")</b> ถ้าพลาดให้แสดง <b>ข้อมูลไม่ถูกต้อง</b>', starter: ``, hint: '<code>try { JSON.parse("ข้อมูลพัง"); } catch (e) { console.log("ข้อมูลไม่ถูกต้อง"); }</code>', xp: 60, check: (o, c) => eq(o, "ข้อมูลไม่ถูกต้อง") && /try/.test(c) && /catch/.test(c) },
          { title: "หน่วงเวลาด้วย setTimeout", desc: "setTimeout ไม่หยุดโปรแกรม — บรรทัดถัดไปทำงานก่อน แล้วค่อยถึงคิวของฟังก์ชันที่ตั้งเวลาไว้", goal: 'แสดง <b>เริ่ม</b> ทันที แล้วใช้ <b>setTimeout</b> แสดง <b>ครบเวลา</b> หลังผ่านไป 100 มิลลิวินาที (ผลลัพธ์ต้องเรียงเป็น เริ่ม แล้ว ครบเวลา)', starter: ``, hint: '<code>console.log("เริ่ม"); setTimeout(() => console.log("ครบเวลา"), 100);</code>', xp: 80, check: (o, c) => lines(o).join(",") === "เริ่ม,ครบเวลา" && /setTimeout/.test(c) },
          { title: "async / await", desc: "await รอ Promise ให้เสร็จ ทำให้โค้ด async อ่านง่ายเหมือนโค้ดปกติ", goal: 'สร้าง <b>async function</b> ที่ <b>await</b> Promise ที่ให้ค่า <b>ข้อมูลมาแล้ว</b> แล้วแสดงค่านั้น', starter: `function getData() {\n  return Promise.resolve("ข้อมูลมาแล้ว");\n}\n// เขียน async function ที่ await getData() แล้ว log\n`, hint: '<code>async function main() { const d = await getData(); console.log(d); } main();</code>', xp: 100, check: (o, c) => eq(o, "ข้อมูลมาแล้ว") && /async/.test(c) && /await/.test(c) },
          { title: "คลาสและออบเจ็กต์", desc: "class คือแม่พิมพ์ constructor ตั้งค่าเริ่มต้นตอนสร้างด้วย new", goal: 'สร้าง <b>class Hero</b> ที่ constructor รับ name และมีเมท็อด <b>greet()</b> คืน <b>ฉันคือ ชื่อ</b> แล้วสร้างออบเจ็กต์ชื่อ <b>มะลิ</b> และแสดงผล (ต้องได้ <b>ฉันคือ มะลิ</b>)', starter: ``, hint: '<code>class Hero { constructor(name) { this.name = name; } greet() { return `ฉันคือ ${this.name}`; } }</code>', xp: 100, check: (o, c) => eq(o, "ฉันคือ มะลิ") && /class\s+Hero/.test(c) && /constructor/.test(c) && /new\s+Hero/.test(c) },
          { title: "บอสใหญ่: สืบทอดคลาส", desc: "ด่านสุดท้ายของคอร์ส Web Developer! extends สืบทอดคุณสมบัติจากคลาสแม่ super() เรียก constructor ของแม่", goal: 'สร้าง <b>class Mage extends Hero</b> ที่ constructor รับ name และ mana (เรียก <b>super(name)</b>) และมีเมท็อด <b>cast()</b> คืน <b>ชื่อ ร่ายเวท พลัง มานา</b> — สร้าง Mage("มะลิ", 50) แล้วแสดงผล (ต้องได้ <b>มะลิ ร่ายเวท พลัง 50</b>)', starter: `class Hero {\n  constructor(name) {\n    this.name = name;\n  }\n}\n// สร้าง class Mage ที่สืบทอดจาก Hero\n`, hint: '<code>class Mage extends Hero { constructor(name, mana) { super(name); this.mana = mana; } cast() { return `${this.name} ร่ายเวท พลัง ${this.mana}`; } }</code>', xp: 150, check: (o, c) => eq(o, "มะลิ ร่ายเวท พลัง 50") && /extends/.test(c) && /super\(/.test(c) }
        ]
      }
    ]
  }
};

/* ═══════════════ State ═══════════════ */
let state = { user: null, level: 1, xp: 0, lang: null, topic: null, stage: 0, done: new Set() };
let attempts = 0; // จำนวนครั้งที่รันไม่ผ่านในด่านปัจจุบัน (ใช้ปลดล็อกคำใบ้)
const xpNeed = lv => Math.round(100 * Math.pow(lv, 1.5));
const doneKey = (lang, topic, stage) => `${lang}/${topic}/${stage}`;
const curTopic = () => COURSES[state.lang].topics.find(t => t.id === state.topic);
const levels = () => curTopic().stages;

const $ = id => document.getElementById(id);
const codeEl = $("code"), outEl = $("out"), runBtn = $("runBtn");

/* ═══════════════ Screens ═══════════════ */
function showScreen(name) {
  $("learnScreen").classList.toggle("hide", name !== "learn");
  $("langScreen").classList.toggle("hide", name !== "lang");
  $("topicScreen").classList.toggle("hide", name !== "topic");
  $("lessonScreen").classList.toggle("hide", name !== "lesson");
  $("boardScreen").classList.toggle("hide", name !== "board");
  $("gameScreen").classList.toggle("hide", name !== "game");
  const learnLike = ["learn", "game", "lesson", "topic", "lang"].includes(name);
  $("tabLearn").classList.toggle("on", learnLike);
  $("boardBtn").classList.toggle("on", name === "board");
  window.scrollTo(0, 0);
}

function renderLangs() {
  const g = $("langGrid");
  g.innerHTML = "";
  for (const [id, c] of Object.entries(COURSES)) {
    const el = document.createElement("button");
    el.className = "lang-card";
    const topicCount = c.topics.length;
    const stageCount = c.topics.reduce((n, t) => n + t.stages.length, 0);
    el.innerHTML = `
      <div class="icon-art">${iconFor(id)}</div>
      <h3>${c.name}</h3>
      <p>${c.tagline}</p>
      <div class="meta">${topicCount} หัวข้อ · ${stageCount} ด่าน →</div>
    `;
    el.onclick = () => {
      state.lang = id;
      state.topic = null;
      try { localStorage.setItem("cq_lang", id); } catch {}
      renderTopics();
      showScreen("topic");
    };
    g.appendChild(el);
  }
}

function renderTopics() {
  const c = COURSES[state.lang];
  $("topicEyebrow").textContent = `${c.name.toUpperCase()} COURSE`;
  $("topicTitle").textContent = `${c.icon} ${c.name} — เลือกหัวข้อที่อยากเรียน`;
  const g = $("topicGrid");
  g.innerHTML = "";
  c.topics.forEach((t, idx) => {
    const doneCount = t.stages.filter((_, s) => state.done.has(doneKey(state.lang, t.id, s))).length;
    const total = t.stages.length;
    const totalXp = t.stages.reduce((n, s) => n + s.xp, 0);
    const readOnly = total === 0; // หัวข้อทฤษฎี: บทเรียนอ่านอย่างเดียว ไม่มีด่าน
    const el = document.createElement("button");
    el.className = "topic-card" + (!readOnly && doneCount === total ? " complete" : "") + (t.boss ? " boss" : "") + (readOnly ? " readonly" : "");
    const meta = readOnly
      ? '<div class="t-meta"><span class="read-tag">📖 บทเรียน</span><span>' + (t.lesson ? t.lesson.length : 0) + ' ตอน</span></div>'
      : '<div class="t-meta">' +
          '<span class="' + (doneCount === total ? "done-txt" : "") + '">' + doneCount + ' / ' + total + ' ด่าน</span>' +
          '<span>💰 ' + totalXp + ' EXP</span>' +
        '</div>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + (total ? (doneCount / total) * 100 : 0) + '%"></div></div>';
    el.innerHTML =
      '<div class="t-num pixel">' + (t.boss ? "FINAL" : (readOnly ? "อ่าน" : "TOPIC " + String(idx + 1).padStart(2, "0"))) + '</div>' +
      '<div class="t-head"><span class="icon-art sm">' + iconFor(t.id) + '</span><h3>' + t.title + '</h3></div>' +
      '<p>' + t.blurb + '</p>' +
      meta;
    el.onclick = () => {
      state.topic = t.id;
      try { localStorage.setItem("cq_topic_" + state.lang, t.id); } catch {}
      if (readOnly) openLesson(t);
      else if (lessonRead(t.id)) goLearn();
      else openLesson(t);
    };
    g.appendChild(el);
  });
}

/* FC-BEGIN ═══════════ Flowchart graphics (SVG) ═══════════ */
const FC = (() => {
  const FONT = "font-family:'JetBrains Mono','IBM Plex Sans Thai',sans-serif;font-size:12.5px;font-weight:600";
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tw = s => { let w = 0; for (const ch of String(s)) { if (/[\u0e31\u0e33-\u0e3a\u0e47-\u0e4e]/.test(ch)) continue; w += ch.charCodeAt(0) > 127 ? 10 : 7.6; } return w; };
  const CX = 180, W = 372, RX = 316, LX = 44;

  function node(type, cy, txt, cx) {
    cx = cx || CX;
    const dec = type === "dec", loop = type === "loop";
    const w = Math.max(dec ? 132 : (loop ? 150 : 88), tw(txt) + (dec ? 72 : (loop ? 54 : 34)));
    const h = dec ? 58 : 38, x = cx - w / 2, y = cy - h / 2;
    let s = "";
    if (type === "start" || type === "end")
      s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="19" fill="#e9e4fb" stroke="#7b5cf0" stroke-width="2"/>';
    else if (type === "proc")
      s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" fill="#ffffff" stroke="#7b5cf0" stroke-width="2"/>';
    else if (type === "io")
      s = '<path d="M ' + (x + 13) + ' ' + y + ' H ' + (x + w) + ' L ' + (x + w - 13) + ' ' + (y + h) + ' H ' + x + ' Z" fill="#ecfaf3" stroke="#27c07d" stroke-width="2"/>';
    else if (dec)
      s = '<path d="M ' + cx + ' ' + y + ' L ' + (x + w) + ' ' + cy + ' L ' + cx + ' ' + (y + h) + ' L ' + x + ' ' + cy + ' Z" fill="#fff4dd" stroke="#f5b942" stroke-width="2"/>';
    else if (loop)
      s = '<path d="M ' + (x + 14) + ' ' + y + ' H ' + (x + w - 14) + ' L ' + (x + w) + ' ' + cy + ' L ' + (x + w - 14) + ' ' + (y + h) + ' H ' + (x + 14) + ' L ' + x + ' ' + cy + ' Z" fill="#e8f6fd" stroke="#3fb6e8" stroke-width="2"/>';
    s += '<text x="' + cx + '" y="' + (cy + 4.5) + '" text-anchor="middle" style="' + FONT + '" fill="#2c2b3d">' + esc(txt) + '</text>';
    return { s, w, h };
  }
  const line = (d, mark) => '<path d="' + d + '" fill="none" stroke="#8b89a3" stroke-width="2"' + (mark ? ' marker-end="url(#fcArw)"' : '') + '/>';
  const lbl = (x, y, t, col) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" style="' + FONT + ';font-size:12px" fill="' + (col || "#8b89a3") + '">' + esc(t) + '</text>';
  const wrapSvg = (parts, h) =>
    '<svg width="' + W + '" height="' + h + '" viewBox="0 0 ' + W + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><marker id="fcArw" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#8b89a3"/></marker></defs>' +
    parts.join("") + '</svg>';

  /** ผังแบบแยกสองทาง: เริ่ม → กำหนดค่า → ตัดสินใจ → ใช่/ไม่ → จบ */
  function branchFlow(pre, q, yesNode, noNode) {
    const out = [];
    let y = 32;
    let n = node("start", y, "เริ่ม"); out.push(n.s);
    let prev = y + n.h / 2;
    for (const p of pre) {
      y = prev + 19 + 24;
      n = node("proc", y, p);
      out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
      prev = y + n.h / 2;
    }
    y = prev + 29 + 24;
    const dn = node("dec", y, q);
    out.push(line("M " + CX + " " + prev + " V " + (y - dn.h / 2), true), dn.s);
    const decCy = y, lv = CX - dn.w / 2, rv = CX + dn.w / 2;
    const by = decCy + 84, xl = CX - 96, xr = CX + 96;
    const yn = node(yesNode.o ? "io" : "proc", by, yesNode.o || yesNode.p, xl);
    const nn = node(noNode.o ? "io" : "proc", by, noNode.o || noNode.p, xr);
    out.push(line("M " + lv + " " + decCy + " H " + xl + " V " + (by - yn.h / 2), true), yn.s);
    out.push(line("M " + rv + " " + decCy + " H " + xr + " V " + (by - nn.h / 2), true), nn.s);
    out.push(lbl((lv + xl) / 2, decCy - 7, "ใช่", "#157a4c"), lbl((rv + xr) / 2, decCy - 7, "ไม่", "#c03649"));
    const jy = by + yn.h / 2 + 22;
    out.push(line("M " + xl + " " + (by + yn.h / 2) + " V " + jy + " H " + CX));
    out.push(line("M " + xr + " " + (by + nn.h / 2) + " V " + jy + " H " + CX));
    y = jy + 42;
    n = node("end", y, "จบ");
    out.push(line("M " + CX + " " + jy + " V " + (y - n.h / 2), true), n.s);
    return wrapSvg(out, y + n.h / 2 + 14);
  }

  /** ผังแบบวนลูป: head เป็นข้าวหลามตัด (while) หรือหกเหลี่ยม (for) มีเส้นวนกลับด้านขวา ทางออกด้านซ้าย */
  function loopFlow(o) {
    const out = [];
    let y = 32;
    let n = node("start", y, "เริ่ม"); out.push(n.s);
    let prev = y + n.h / 2;
    for (const p of (o.pre || [])) {
      y = prev + 19 + 24;
      n = node("proc", y, p.p || p.o);
      out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
      prev = y + n.h / 2;
    }
    const isDec = !!o.head.dec;
    y = prev + (isDec ? 29 : 19) + 26;
    const hd = node(isDec ? "dec" : "loop", y, o.head.dec || o.head.loop);
    out.push(line("M " + CX + " " + prev + " V " + (y - hd.h / 2), true), hd.s);
    const headCy = y, headBottom = y + hd.h / 2;
    prev = headBottom;
    let yesShown = false;
    for (const item of (o.body || [])) {
      if (item.d) {
        y = prev + 29 + 24;
        const d2 = node("dec", y, item.d);
        out.push(line("M " + CX + " " + prev + " V " + (y - d2.h / 2), true), d2.s);
        if (!yesShown && isDec) { out.push(lbl(CX + 13, (prev + y - d2.h / 2) / 2, "ใช่", "#157a4c")); yesShown = true; }
        const dcy = y, dlv = CX - d2.w / 2;
        y = dcy + 84;
        const yn = node(item.yes.o ? "io" : "proc", y, item.yes.o || item.yes.p);
        out.push(line("M " + CX + " " + (dcy + d2.h / 2) + " V " + (y - yn.h / 2), true), yn.s);
        out.push(lbl(CX + 13, (dcy + d2.h / 2 + y - yn.h / 2) / 2, "ใช่", "#157a4c"));
        const jy = y + yn.h / 2 + 18;
        out.push(line("M " + dlv + " " + dcy + " H " + (CX - 112) + " V " + jy + " H " + CX));
        out.push(lbl((dlv + CX - 112) / 2, dcy - 7, "ไม่", "#c03649"));
        out.push(line("M " + CX + " " + (y + yn.h / 2) + " V " + jy));
        prev = jy;
      } else {
        y = prev + 19 + 24;
        n = node(item.o ? "io" : "proc", y, item.o || item.p);
        out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
        if (!yesShown && isDec) { out.push(lbl(CX + 13, (prev + y - n.h / 2) / 2, "ใช่", "#157a4c")); yesShown = true; }
        prev = y + n.h / 2;
      }
    }
    // เส้นวนกลับด้านขวา เข้าที่มุมขวาของ head
    const backY = prev + 18;
    out.push(line("M " + CX + " " + prev + " V " + backY + " H " + RX + " V " + headCy + " L " + (CX + hd.w / 2 + 3) + " " + headCy, true));
    // ทางออกด้านซ้ายของ head
    const exitTop = backY + 44;
    out.push(line("M " + (CX - hd.w / 2) + " " + headCy + " H " + LX + " V " + exitTop + " H " + CX + " V " + (exitTop + 12), false));
    out.push(lbl((CX - hd.w / 2 + LX) / 2, headCy - 7, o.no || "ไม่", "#c03649"));
    prev = exitTop + 12;
    y = prev;
    for (const item of (o.exit || [])) {
      y = prev + 19 + 12;
      n = node(item.o ? "io" : "proc", y, item.o || item.p);
      out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
      prev = y + n.h / 2;
    }
    y = prev + 19 + 20;
    n = node("end", y, "จบ");
    out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
    return wrapSvg(out, y + n.h / 2 + 14);
  }

  /** ตารางสัญลักษณ์สำหรับบทเรียน */
  function legend() {
    const rows = [
      ["start", "เริ่ม / จบ", "จุดเริ่มต้นและจุดสิ้นสุดของโปรแกรม"],
      ["proc", "x = 10", "ประมวลผล / กำหนดค่า"],
      ["io", "พิมพ์ x", "รับหรือแสดงผลข้อมูล (print, input)"],
      ["dec", "x > 5 ?", "ตัดสินใจ — แยกทางเป็น ใช่ / ไม่"],
      ["loop", "วน i = 1 ถึง 5", "วนลูปตามจำนวนรอบ"],
    ];
    const out = [];
    let y = 36;
    for (const [type, txt, descTxt] of rows) {
      const n = node(type, y, txt, 92);
      out.push(n.s);
      out.push('<text x="176" y="' + (y + 4.5) + '" style="' + FONT + ';font-weight:500;font-size:13px" fill="#5d5b74">' + esc(descTxt) + '</text>');
      y += 70;
    }
    return '<svg width="480" height="' + (y - 20) + '" viewBox="0 0 480 ' + (y - 20) + '" xmlns="http://www.w3.org/2000/svg">' + out.join("") + '</svg>';
  }

  /** ผังงานลำดับ: เริ่ม → กล่องคำสั่ง/แสดงผลตามลำดับ → จบ */
  function seqFlow(items) {
    const out = [];
    let y = 32;
    let n = node("start", y, "เริ่ม");
    out.push(n.s);
    let prev = y + n.h / 2;
    for (const it of items) {
      y = prev + 19 + 24;
      n = node(it.o ? "io" : "proc", y, it.o || it.p);
      out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
      prev = y + n.h / 2;
    }
    y = prev + 19 + 24;
    n = node("end", y, "จบ");
    out.push(line("M " + CX + " " + prev + " V " + (y - n.h / 2), true), n.s);
    return wrapSvg(out, y + n.h / 2 + 14);
  }

  const FLOWS = {
    legend,
    cseq0: () => seqFlow([{ p: "a = 8" }, { p: "b = 5" }, { o: 'พิมพ์ "ผลต่าง =", a - b' }]),
    cseq1: () => seqFlow([{ o: "รับค่า w1, w2, h" }, { p: "area = (w1 + w2) x h / 2" }, { o: "พิมพ์ area" }]),
    cseq2: () => seqFlow([{ o: "รับค่าปี ค.ศ. (CE)" }, { p: "BE = CE + 543" }, { o: "พิมพ์ BE" }]),
    clp1: () => loopFlow({ pre: [{ p: "count = 0" }, { p: "sum = 0" }], head: { dec: "count < 10 ?" }, body: [{ p: "count = count + 2" }, { p: "sum = sum + count" }], exit: [{ o: "พิมพ์ sum" }] }),
    cbr0: () => branchFlow(["hp = 30"], "hp > 0 ?", { o: 'พิมพ์ "สู้ต่อ"' }, { o: 'พิมพ์ "แพ้แล้ว"' }),
    clp0: () => loopFlow({ pre: [{ p: "i = 1" }], head: { dec: "i <= 4 ?" }, body: [{ o: "พิมพ์ i" }, { p: "i = i + 1" }], exit: [{ o: 'พิมพ์ "จบลูป"' }] }),
    fc0: () => branchFlow(["x = 10"], "x > 5 ?", { o: 'พิมพ์ "มากกว่า"' }, { o: 'พิมพ์ "น้อยกว่า"' }),
    fc1: () => loopFlow({ pre: [{ p: "i = 1" }], head: { dec: "i <= 3 ?" }, body: [{ o: 'พิมพ์ "รอบที่", i' }, { p: "i = i + 1" }], exit: [{ o: 'พิมพ์ "จบ"' }] }),
    fc2: () => loopFlow({ head: { loop: "วน i = 1 ถึง 5" }, body: [{ d: "i เป็นเลขคี่ ?", yes: { o: "พิมพ์ i" } }], no: "ครบแล้ว" }),
    fc3: () => loopFlow({ pre: [{ p: "total = 0" }], head: { loop: "วน i = 1 ถึง 4" }, body: [{ p: "total = total + i*2" }], exit: [{ o: "พิมพ์ total" }], no: "ครบแล้ว" }),
    fc4: () => loopFlow({ pre: [{ p: "best = 0" }], head: { loop: "วน s ใน [40, 75, 60]" }, body: [{ d: "s > best ?", yes: { p: "best = s" } }], exit: [{ o: "พิมพ์ best" }], no: "ครบแล้ว" }),
    fc5: () => loopFlow({ pre: [{ p: "energy = 10" }], head: { dec: "energy >= 4 ?" }, body: [{ o: 'พิมพ์ "โจมตี"' }, { p: "energy = energy - 4" }], exit: [{ o: 'พิมพ์ "หมดแรง"' }] }),
    fc6: () => loopFlow({ pre: [{ p: "i = 2" }], head: { dec: "i <= 8 ?" }, body: [{ o: "พิมพ์ i" }, { p: "i = i + 2" }] }),
  };

  function fill(root) {
    root.querySelectorAll(".fc-slot").forEach(el => {
      const f = FLOWS[el.dataset.flow];
      if (f) el.innerHTML = f();
    });
  }
  return { fill, FLOWS };
})();
/* FC-END */

/* ═══════════════ แผนที่ด่าน (หน้าหลัก) ═══════════════ */
function topicIndex() {
  return COURSES[state.lang].topics.findIndex(t => t.id === state.topic);
}
function pickDefaultTopic() {
  const ts = COURSES[state.lang].topics;
  let saved = null;
  try { saved = localStorage.getItem("cq_topic_" + state.lang); } catch {}
  if (saved && ts.some(t => t.id === saved && t.stages.length > 0)) return saved;
  const firstUndone = ts.find(t => t.stages.some((_, s) => !state.done.has(doneKey(state.lang, t.id, s))));
  if (firstUndone) return firstUndone.id;
  const firstPlayable = ts.find(t => t.stages.length > 0);
  return (firstPlayable || ts[0]).id;
}
function goLearn() {
  if (!state.lang) {
    let sl = null;
    try { sl = localStorage.getItem("cq_lang"); } catch {}
    state.lang = (sl && COURSES[sl]) ? sl : "python";
  }
  const ts = COURSES[state.lang].topics;
  const cur = ts.find(t => t.id === state.topic);
  if (!cur || cur.stages.length === 0) state.topic = pickDefaultTopic();
  try {
    localStorage.setItem("cq_lang", state.lang);
    localStorage.setItem("cq_topic_" + state.lang, state.topic);
  } catch {}
  renderLearn();
  showScreen("learn");
}
function renderLearn() {
  const ts = COURSES[state.lang].topics, t = curTopic(), idx = topicIndex();
  const total = t.stages.length || 1;
  const done = t.stages.filter((_, s) => state.done.has(doneKey(state.lang, t.id, s))).length;
  $("phEyebrow").textContent = COURSES[state.lang].name.toUpperCase() + " · หัวข้อ " + (idx + 1) + "/" + ts.length;
  $("phTitle").textContent = (idx + 1) + ". " + t.title;
  $("phFill").style.width = (done / total * 100) + "%";
  renderPath();
}
function lessonRead(id) {
  try { return JSON.parse(localStorage.getItem("cq_lessons") || "[]").includes(id); } catch { return false; }
}
function markLessonRead(id) {
  try {
    const s = new Set(JSON.parse(localStorage.getItem("cq_lessons") || "[]"));
    s.add(id);
    localStorage.setItem("cq_lessons", JSON.stringify([...s]));
  } catch {}
}
function renderPath() {
  const wrap = $("pathWrap"), t = curTopic(), total = t.stages.length;
  const W = Math.min(wrap.clientWidth || 520, 600), GAP = 106, TOP = 60, n = total + 1;
  const H = TOP + (n - 1) * GAP + 70;
  const xs = [0.5, 0.75, 0.5, 0.25];
  const pts = [];
  for (let i = 0; i < n; i++) pts.push([Math.round(xs[i % 4] * W), TOP + i * GAP]);
  let d = "M " + pts[0][0] + " " + pts[0][1];
  for (let i = 1; i < n; i++) {
    const x = pts[i][0], y = pts[i][1], px = pts[i - 1][0], py = pts[i - 1][1];
    d += " C " + px + " " + (py + GAP / 2) + ", " + x + " " + (y - GAP / 2) + ", " + x + " " + y;
  }
  wrap.style.height = H + "px";
  wrap.innerHTML = '<svg class="path-svg" width="' + W + '" height="' + H + '"><path d="' + d + '" fill="none" stroke="#d9cef7" stroke-width="10" stroke-linecap="round"/></svg>';
  const CHECK = '<svg viewBox="0 0 24 24" width="27" height="27" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const BOOK = '<svg class="n-ico" viewBox="0 0 24 24" width="25" height="25" fill="none"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5c-.8 0-1.5-.7-1.5-1.5v-12zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5v-12z" fill="currentColor"/></svg>';
  const firstUndone = t.stages.findIndex((_, s) => !state.done.has(doneKey(state.lang, t.id, s)));
  const read = lessonRead(t.id);
  function mk(x, y, cls, inner, title) {
    const b = document.createElement("button");
    b.className = "node " + cls;
    b.style.left = x + "px";
    b.style.top = y + "px";
    b.innerHTML = inner;
    if (title) b.title = title;
    return b;
  }
  const ln = mk(pts[0][0], pts[0][1], "lesson " + (read ? "done" : "now"), read ? CHECK : BOOK, "บทเรียน: " + t.title);
  ln.onclick = () => openLesson(t);
  wrap.appendChild(ln);
  t.stages.forEach((st, i) => {
    const isDone = state.done.has(doneKey(state.lang, t.id, i));
    const isNow = i === firstUndone;
    let inner = isDone ? CHECK : '<span class="n-num">' + (i + 1) + '</span>';
    if (isNow) {
      const doneCount = t.stages.filter((_, s) => state.done.has(doneKey(state.lang, t.id, s))).length;
      const R = 35, C = 2 * Math.PI * R, p = doneCount / total;
      inner = '<svg class="ring" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="none" stroke="#ece7fb" stroke-width="6"/><circle cx="40" cy="40" r="35" fill="none" stroke="#7b5cf0" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + (C * p) + ' ' + C + '" transform="rotate(-90 40 40)"/></svg><span class="n-num">' + (i + 1) + '</span>';
    }
    const b = mk(pts[i + 1][0], pts[i + 1][1], isDone ? "done" : (isNow ? "now" : "todo"), inner, "ด่าน " + (i + 1) + ": " + st.title);
    b.onclick = () => { state.stage = i; renderStage(); showScreen("game"); };
    wrap.appendChild(b);
  });
}
window.addEventListener("resize", () => {
  if (!$("learnScreen").classList.contains("hide")) renderPath();
});

/* ═══════════════ Lesson ═══════════════ */
let lessonTopic = null;
function openLesson(t) {
  lessonTopic = t;
  $("lsTitle").textContent = t.title;
  $("lsBlurb").textContent = t.blurb;
  const box = $("lsBody");
  box.innerHTML = "";
  (t.lesson || []).forEach(sec => {
    const d = document.createElement("div");
    d.className = "ls-sec";
    const h = document.createElement("h3");
    h.textContent = sec.h;
    d.appendChild(h);
    const p = document.createElement("p");
    p.innerHTML = sec.p;
    d.appendChild(p);
    if (sec.code) {
      const pre = document.createElement("pre");
      pre.className = "ls-code";
      pre.textContent = sec.code;
      d.appendChild(pre);
    }
    box.appendChild(d);
  });
  FC.fill(box);
  if (!t.stages || t.stages.length === 0) {
    $("lsStart").style.display = "none";
  } else {
    $("lsStart").style.display = "";
    const doneCount = t.stages.filter((_, s) => state.done.has(doneKey(state.lang, t.id, s))).length;
    $("lsStart").textContent = doneCount > 0 ? "อ่านจบแล้ว ทำแบบฝึกหัดต่อ →" : "เข้าใจแล้ว เริ่มทำแบบฝึกหัด →";
  }
  showScreen("lesson");
}
function startExercises() {
  const t = lessonTopic;
  if (!t) return;
  markLessonRead(t.id);
  state.topic = t.id;
  try { localStorage.setItem("cq_topic_" + state.lang, t.id); } catch {}
  const firstUndone = t.stages.findIndex((_, s) => !state.done.has(doneKey(state.lang, t.id, s)));
  state.stage = firstUndone === -1 ? 0 : firstUndone;
  renderStage();
  showScreen("game");
}
$("lsStart").onclick = startExercises;
$("backFromLesson").onclick = () => {
  const t = lessonTopic;
  if (t && (!t.stages || t.stages.length === 0)) { renderTopics(); showScreen("topic"); }
  else if (state.topic) goLearn();
  else { renderTopics(); showScreen("topic"); }
};

/* ═══════════════ Leaderboard ═══════════════ */
async function openBoard() {
  showScreen("board");
  $("boardList").innerHTML = '<div class="board-note">กำลังโหลดตารางอันดับ...</div>';
  $("myRank").textContent = "";
  try {
    const d = await api("/api/leaderboard");
    const list = $("boardList");
    list.innerHTML = "";
    if (!d.top.length) {
      list.innerHTML = '<div class="board-note">ยังไม่มีใครขึ้นกระดาน — สมัครสมาชิกแล้วเป็นคนแรกสิ!</div>';
    }
    const medals = ["🥇", "🥈", "🥉"];
    const maxXp = d.top.length ? Math.max(1, d.top[0].totalXp || 1) : 1;
    d.top.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "brow" + (r.isMe ? " me" : "");
      const rk = i < 3 ? medals[i] : "#" + (i + 1);
      const pct = Math.max(2, Math.round(((r.totalXp || 0) / maxXp) * 100));
      row.innerHTML =
        '<span class="rk ' + (i < 3 ? "medal" : "") + '">' + rk + '</span>' +
        '<span class="bxp"><span class="bn"></span>' +
        '<span class="bxp-bar"><span class="bxp-fill" style="width:' + pct + '%"></span></span></span>' +
        '<span class="bl pixel">LV.' + r.level + '</span>' +
        '<span class="bs">' + fmt(r.totalXp) + ' EXP</span>';
      row.querySelector(".bn").textContent = r.name;
      list.appendChild(row);
    });
    if (d.me) {
      $("myRank").textContent = "อันดับของคุณตอนนี้: #" + d.me.rank + " · LV." + d.me.level + " · สะสม " + fmt(d.me.totalXp) + " EXP";
    } else if (!state.user) {
      $("myRank").textContent = "ล็อกอินเพื่อร่วมจัดอันดับกับนักผจญภัยคนอื่น";
    }
  } catch (e) {
    $("boardList").innerHTML = `<div class="board-note">โหลดตารางอันดับไม่ได้: ${e.message}</div>`;
  }
}

/* ═══════════════ API ═══════════════ */
async function api(path, body) {
  const res = await fetch(path, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "same-origin"
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาด");
  return data;
}

function applySession(data) {
  state.user = data.user;
  state.xp = data.user.xp;
  state.level = data.user.level;
  state.done = new Set((data.progress || []).map(p => doneKey(p.language, p.topic, p.stage)));
  $("pname").textContent = data.user.name;
  $("editHint").textContent = "แตะเพื่อแก้ไขโปรไฟล์";
  $("authBtn").textContent = "ออกจากระบบ";
  $("authOverlay").classList.remove("show");
  renderAvatar();
  renderXP();
  renderLangs();
  goLearn();
}

async function tryRestore() {
  try {
    const data = await api("/api/me");
    applySession(data);
  } catch {
    $("authOverlay").classList.add("show");
  }
}

/* ═══════════════ Auth UI ═══════════════ */
let authMode = "login";
function setAuthMode(mode) {
  authMode = mode;
  $("tabLogin").className = mode === "login" ? "on" : "";
  $("tabRegister").className = mode === "register" ? "on" : "";
  $("fieldName").style.display = mode === "register" ? "block" : "none";
  $("authSubmit").textContent = mode === "login" ? "เข้าสู่ระบบ" : "สมัครและเริ่มเล่น";
  $("authErr").className = "form-msg";
}
$("tabLogin").onclick = () => setAuthMode("login");
$("tabRegister").onclick = () => setAuthMode("register");

$("authSubmit").onclick = async () => {
  const btn = $("authSubmit");
  btn.disabled = true;
  $("authErr").className = "form-msg";
  try {
    const body = { email: $("inEmail").value, password: $("inPass").value, name: $("inName").value };
    const data = await api(authMode === "login" ? "/api/login" : "/api/register", body);
    applySession(data);
  } catch (e) {
    $("authErr").textContent = e.message;
    $("authErr").className = "form-msg err";
  } finally {
    btn.disabled = false;
  }
};

$("guestBtn").onclick = () => { $("authOverlay").classList.remove("show"); goLearn(); };

$("authBtn").onclick = async () => {
  if (state.user) {
    await api("/api/logout", {}).catch(() => {});
    state = { user: null, level: 1, xp: 0, lang: null, topic: null, stage: 0, done: new Set() };
    $("pname").textContent = "ผู้เยี่ยมชม";
    $("editHint").textContent = "แตะเพื่อล็อกอิน";
    $("authBtn").textContent = "เข้าสู่ระบบ";
    renderAvatar();
    renderXP(); renderLangs(); goLearn();
  }
  $("authOverlay").classList.add("show");
};

[$("inEmail"), $("inPass"), $("inName")].forEach(el =>
  el.addEventListener("keydown", e => { if (e.key === "Enter") $("authSubmit").click(); })
);

/* ═══════════════ Profile UI ═══════════════ */
/** แสดงรูปโปรไฟล์ในหัวมุมขวาบน — ถ้าไม่มีรูปใช้อีโมจินักบิน */
function renderAvatar() {
  const box = $("headAvatar");
  if (!box) return;
  if (state.user && state.user.avatar) {
    box.innerHTML = '<img alt="รูปโปรไฟล์" src="' + state.user.avatar + '">';
  } else {
    box.textContent = "🧑‍🚀";
  }
}

/** ย่อรูปที่ผู้ใช้เลือกให้เป็นสี่เหลี่ยมจัตุรัสขนาดพอดี แล้วคืนค่าเป็น data URL */
function resizeImage(file, size = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext("2d");
        const m = Math.min(img.width, img.height);
        const sx = (img.width - m) / 2, sy = (img.height - m) / 2;
        ctx.drawImage(img, sx, sy, m, m, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("เปิดไฟล์รูปไม่ได้"));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("อ่านไฟล์ไม่สำเร็จ"));
    reader.readAsDataURL(file);
  });
}

let pfAvatarPending; // undefined = ไม่เปลี่ยน, null = ลบ, string = รูปใหม่
$("profileBtn").onclick = () => {
  if (!state.user) { $("authOverlay").classList.add("show"); return; }
  $("pfName").value = state.user.name;
  $("pfCur").value = "";
  $("pfNew").value = "";
  $("pfMsg").className = "form-msg";
  pfAvatarPending = undefined;
  paintPfAvatar(state.user.avatar);
  $("profileOverlay").classList.add("show");
};
function paintPfAvatar(src) {
  const el = $("pfAvatar");
  if (src) el.innerHTML = '<img alt="ตัวอย่างรูป" src="' + src + '">';
  else el.textContent = "🧑‍🚀";
}
$("pfPick").onclick = () => $("pfFile").click();
$("pfFile").onchange = async () => {
  const file = $("pfFile").files[0];
  if (!file) return;
  try {
    const dataUrl = await resizeImage(file, 256);
    pfAvatarPending = dataUrl;
    paintPfAvatar(dataUrl);
    $("pfMsg").className = "form-msg";
  } catch (e) {
    $("pfMsg").textContent = e.message;
    $("pfMsg").className = "form-msg err";
  }
  $("pfFile").value = "";
};
$("pfClear").onclick = () => {
  pfAvatarPending = null;
  paintPfAvatar(null);
};
$("pfCancel").onclick = () => $("profileOverlay").classList.remove("show");

$("pfSave").onclick = async () => {
  const btn = $("pfSave");
  btn.disabled = true;
  $("pfMsg").className = "form-msg";
  try {
    const body = { name: $("pfName").value };
    if ($("pfNew").value) {
      body.currentPassword = $("pfCur").value;
      body.newPassword = $("pfNew").value;
    }
    if (pfAvatarPending !== undefined) body.avatar = pfAvatarPending;
    const d = await api("/api/profile", body);
    state.user.name = d.user.name;
    state.user.avatar = d.user.avatar;
    $("pname").textContent = d.user.name;
    renderAvatar();
    pfAvatarPending = undefined;
    $("pfMsg").textContent = "บันทึกเรียบร้อยแล้ว ✓";
    $("pfMsg").className = "form-msg ok";
    $("pfCur").value = ""; $("pfNew").value = "";
    setTimeout(() => $("profileOverlay").classList.remove("show"), 900);
  } catch (e) {
    $("pfMsg").textContent = e.message;
    $("pfMsg").className = "form-msg err";
  } finally {
    btn.disabled = false;
  }
};

/* ═══════════════ Navigation ═══════════════ */
$("homeBtn").onclick = goLearn;
$("tabLearn").onclick = goLearn;
$("pathCard").onclick = () => { renderTopics(); showScreen("topic"); };
$("userChip").onclick = () => $("profileBtn").click();
$("backToLang").onclick = () => { renderLangs(); showScreen("lang"); };
$("backToTopic").onclick = goLearn;
$("lessonBtn").onclick = () => openLesson(curTopic());
$("boardBtn").onclick = openBoard;
$("backFromBoard").onclick = () => {
  if (state.lang && state.topic) goLearn();
  else { renderLangs(); showScreen("lang"); }
};

/* ═══════════════ Pyodide ═══════════════ */
let pyodide = null;
const bootMsgs = ["กำลังปลุกงูหลามให้ตื่น...", "กำลังโหลดเวทมนตร์ WebAssembly...", "เตรียมสนามฝึกโค้ด...", "เกือบเสร็จแล้ว..."];
let bootIdx = 0;
const bootTimer = setInterval(() => {
  bootIdx = (bootIdx + 1) % bootMsgs.length;
  $("bootStatus").textContent = bootMsgs[bootIdx];
}, 1600);

async function initPy() {
  try {
    pyodide = await loadPyodide();
    runBtn.disabled = false;
    $("runOwnBtn").disabled = false;
    runBtn.textContent = "▶ รันโค้ด";
  } catch (e) {
    $("bootStatus").textContent = "โหลด Python ไม่สำเร็จ (ภาษา C ยังเล่นได้ปกติ)";
    runBtn.disabled = false;
    $("runOwnBtn").disabled = false;
    runBtn.textContent = "▶ รันโค้ด";
  } finally {
    clearInterval(bootTimer);
    $("boot").classList.add("hide2");
  }
}

/* ═══════════════ Game render ═══════════════ */
function renderStage() {
  const c = COURSES[state.lang], t = curTopic(), L = levels()[state.stage];
  $("stageTag").textContent = c.name.toUpperCase() + " · " + t.title + " · STAGE " + (state.stage + 1) + "/" + levels().length;
  $("mTitle").textContent = L.title;
  $("mDesc").textContent = L.desc;
  $("mGoal").innerHTML = "🎯 เป้าหมาย: " + L.goal;
  if (L.stdin && L.stdin.length) {
    $("stdinBox").classList.remove("hide");
    $("stdinVals").innerHTML = L.stdin.map(v => '<span class="kbd">' + v + '</span>').join(" ");
  } else {
    $("stdinBox").classList.add("hide");
  }
  FC.fill($("mGoal"));
  $("mReward").textContent = "รางวัลเมื่อผ่านด่าน: " + L.xp + " EXP";
  $("hintBox").innerHTML = L.hint;
  $("hintBox").classList.remove("show");
  attempts = 0;
  updateHintBtn();
  const EXT = { c: ".c", python: ".py", html: ".html", css: ".css", js: ".js" };
  $("fileName").textContent = t.id + "_" + (state.stage + 1) + (EXT[state.lang] || ".txt");
  $("runOwnBtn").style.display = isWeb() ? "none" : "";
  $("outTag").textContent = state.lang === "js" ? "ผลลัพธ์จาก console" : (isWeb() ? "หน้าเว็บที่ได้" : "ผลลัพธ์จากโปรแกรม");
  $("previewWrap").innerHTML = "";
  $("previewWrap").style.display = "none";
  outEl.classList.toggle("compact", isWeb());
  codeEl.value = L.starter;
  $("banner").className = "banner";
  outEl.innerHTML = '<span class="empty">ยังไม่มีผลลัพธ์ — เขียนโค้ดแล้วกดรันดูสิ</span>';
  say("พิมพ์โค้ดแล้วกด \"รันโค้ด\" ได้เลย เราเชียร์อยู่นะ!", "");
  renderDots();
}

function renderDots() {
  const d = $("dots");
  d.innerHTML = "";
  levels().forEach((_, i) => {
    const isDone = state.done.has(doneKey(state.lang, state.topic, i));
    const b = document.createElement("button");
    b.className = "dot" + (i === state.stage ? " active" : "") + (isDone ? " done" : "");
    b.textContent = isDone ? "✓" : i + 1;
    b.onclick = () => { state.stage = i; renderStage(); };
    d.appendChild(b);
  });
}

function totalXpLocal() {
  let t = state.xp;
  for (let l = 1; l < state.level; l++) t += xpNeed(l);
  return t;
}
function renderXP() {
  const need = xpNeed(state.level);
  $("lvlBadge").textContent = "LV." + state.level;
  $("xpText").textContent = state.xp + " / " + need;
  $("xpFill").style.width = Math.min(100, (state.xp / need) * 100) + "%";
  $("chipXp").textContent = fmt(totalXpLocal());
  $("chipStages").textContent = fmt(state.done.size);
}

function say(msg, mood) {
  const s = $("speech");
  s.textContent = msg;
  s.className = "speech " + mood;
  const r = $("robot");
  r.className = "robot";
  if (mood === "ok") { void r.offsetWidth; r.classList.add("happy"); }
  if (mood === "no") { void r.offsetWidth; r.classList.add("sad"); }
}

/** คำใบ้จะปลดล็อกก็ต่อเมื่อลองผิดด้วยตัวเองครบ 2 ครั้ง — ฝึกคิดเองก่อนดูคำใบ้ */
function updateHintBtn() {
  const b = $("hintBtn");
  if (attempts >= 2) {
    b.disabled = false;
    b.textContent = "💡 ขอคำใบ้";
  } else {
    b.disabled = true;
    b.textContent = "🔒 คำใบ้ (ลองเองอีก " + (2 - attempts) + " ครั้งก่อน)";
    $("hintBox").classList.remove("show");
  }
}

/* ═══════════════ Run code ═══════════════ */
const WEB_LANGS = ["html", "css", "js"];
const isWeb = () => WEB_LANGS.includes(state.lang);

async function runCode(ownInput) {
  if (!pyodide && state.lang !== "c" && !isWeb()) return;
  runBtn.disabled = true;
  $("runOwnBtn").disabled = true;
  runBtn.textContent = "⏳ กำลังรัน...";
  let stdout = "", stderr = "";
  pyodide.setStdout({ batched: s => stdout += s + "\n" });
  pyodide.setStderr({ batched: s => stderr += s + "\n" });

  const code = codeEl.value;
  let webDoc = null;
  try {
    if (isWeb()) {
      // HTML/CSS/JS: ประกอบเป็นหน้าเว็บจริงแล้วเรนเดอร์ใน iframe
      const L0 = levels()[state.stage];
      $("previewWrap").style.display = state.lang === "js" && !L0.html ? "none" : "";
      const res = await WEB.runInFrame($("previewWrap"), state.lang, code, L0);
      webDoc = res.doc;
      stdout = res.out;
      if (res.error) stderr = res.error;
    } else if (state.lang === "c") {
      // ภาษา C: รันด้วยตัวแปล CRUN (จำลองหน่วยความจำ/พอยน์เตอร์ในเบราว์เซอร์)
      const provider = ownInput
        ? (spec => { const v = window.prompt("โปรแกรมขอรับค่า " + spec); return v === null ? "" : v; })
        : (levels()[state.stage].stdin || []);
      const res = CRUN.run(code, provider);
      stdout = res.stdout;
      if (res.error) stderr = res.error;
    } else if (ownInput) {
      // โหมดป้อนเอง: input() เด้งกล่องให้ผู้เล่นพิมพ์ค่าเองจริงๆ
      await pyodide.runPythonAsync(
        "import builtins\n" +
        "from js import window\n" +
        "def _game_input(prompt=\"\"):\n" +
        "    v = window.prompt(str(prompt) if prompt else \"ป้อนข้อมูล:\")\n" +
        "    return \"\" if v is None else str(v)\n" +
        "builtins.input = _game_input\n"
      );
      await pyodide.runPythonAsync(code);
    } else {
      // โหมดตรวจคำตอบ: input() อ่านค่าจากคิวที่โจทย์กำหนด (stdin) ตามลำดับ
      const stdinVals = levels()[state.stage].stdin || [];
      await pyodide.runPythonAsync(
        "import builtins, json\n" +
        "_game_inputs = json.loads(" + JSON.stringify(JSON.stringify(stdinVals)) + ")\n" +
        "def _game_input(prompt=\"\"):\n" +
        "    return str(_game_inputs.pop(0)) if _game_inputs else \"\"\n" +
        "builtins.input = _game_input\n"
      );
      await pyodide.runPythonAsync(code);
    }
  } catch (e) {
    stderr += String(e.message || e);
  }
  runBtn.disabled = false;
  $("runOwnBtn").disabled = false;
  runBtn.textContent = "▶ รันโค้ด";

  if (stderr) {
    outEl.innerHTML = "";
    const p = document.createElement("pre");
    p.className = "err";
    p.textContent = (state.lang === "c" || isWeb()) ? stderr : friendlyError(stderr);
    outEl.appendChild(p);
  } else {
    if (isWeb()) {
      outEl.textContent = stdout || (state.lang === "js"
        ? "(ยังไม่มีข้อความจาก console.log)"
        : "(หน้าเว็บว่างเปล่า — ยังไม่มีเนื้อหาที่มองเห็น)");
    } else {
      outEl.textContent = stdout || "(โปรแกรมทำงานเสร็จ แต่ไม่มีข้อความแสดงออกมา)";
    }
  }

  if (ownInput) {
    $("banner").className = "banner";
    say("โหมดป้อนเอง — ผลลัพธ์ขึ้นกับค่าที่คุณพิมพ์ จึงไม่ตรวจคำตอบและไม่ได้ EXP", "");
    return;
  }

  let indentMsg = "";
  if (!stderr && state.lang === "c") {
    const ind = CRUN.checkIndent(code);
    if (!ind.ok) indentMsg = ind.msg;
  }

  const L = levels()[state.stage];
  const banner = $("banner");
  if (!stderr && !indentMsg && L.check(stdout, code, webDoc)) {
    banner.className = "banner pass";
    $("bannerText").textContent = "ภารกิจสำเร็จ!";
    const lastStage = state.stage >= levels().length - 1;
    $("nextBtn").style.display = "inline-block";
    $("nextBtn").textContent = lastStage ? "จบหัวข้อนี้แล้ว! เลือกหัวข้อถัดไป →" : "ด่านถัดไป →";
    say(pick(["เก่งมาก! โค้ดสวยเป๊ะเลย 🎉", "ผ่านฉลุย! ไปด่านต่อกันเถอะ", "สุดยอดโปรแกรมเมอร์!"]), "ok");
    await recordPass();
    renderDots();
  } else {
    banner.className = "banner fail";
    $("bannerText").textContent = stderr
      ? "โค้ดมีข้อผิดพลาด ลองอ่านข้อความสีแดงด้านล่างดูนะ"
      : (indentMsg ? "โปรแกรมทำงานได้ แต่การย่อหน้ายังไม่เรียบร้อย — " + indentMsg : "ผลลัพธ์ยังไม่ตรงเป้าหมาย ลองเทียบกับภารกิจอีกครั้ง");
    $("xpPop").textContent = "";
    $("nextBtn").style.display = "none";
    attempts += 1;
    updateHintBtn();
    say(pick(["เกือบแล้ว! ลองอีกทีนะ", "ไม่เป็นไร ผิดคือครู 💪", attempts >= 2 ? "คำใบ้ปลดล็อกแล้ว กดดูได้เลย" : "ลองปรับแก้ด้วยตัวเองอีกนิดนะ"]), "no");
  }
}

async function recordPass() {
  const key = doneKey(state.lang, state.topic, state.stage);
  if (state.user) {
    try {
      const r = await api("/api/complete", { language: state.lang, topic: state.topic, stage: state.stage });
      if (r.first) state.done.add(key);
      const leveled = r.level > state.level;
      state.xp = r.xp; state.level = r.level;
      $("xpPop").textContent = r.gained > 0 ? `+${r.gained} EXP` : "ด่านนี้เคยผ่านแล้ว — ไม่ได้ EXP ซ้ำ";
      renderXP();
      if (leveled) setTimeout(showLevelUp, 700);
    } catch (e) {
      $("xpPop").textContent = "(บันทึกไม่สำเร็จ: " + e.message + ")";
    }
  } else {
    const first = !state.done.has(key);
    if (first) {
      state.done.add(key);
      const gain = levels()[state.stage].xp;
      $("xpPop").textContent = `+${gain} EXP (ยังไม่ถูกบันทึก — ล็อกอินเพื่อเก็บถาวร)`;
      gainXPLocal(gain);
    } else {
      $("xpPop").textContent = "ด่านนี้เคยผ่านแล้ว — ไม่ได้ EXP ซ้ำ";
    }
  }
}

function friendlyError(err) {
  const last = err.trim().split("\n").pop();
  let tip = "";
  if (/SyntaxError/.test(err)) tip = "\n\n💡 SyntaxError = พิมพ์ผิดไวยากรณ์ เช็ควงเล็บ เครื่องหมายคำพูด และเครื่องหมาย : ดูนะ";
  else if (/IndentationError/.test(err)) tip = "\n\n💡 IndentationError = การย่อหน้าไม่ถูกต้อง บรรทัดใน if/for ต้องเว้นวรรคเข้าไป 4 ช่อง";
  else if (/NameError/.test(err)) tip = "\n\n💡 NameError = ใช้ชื่อตัวแปรที่ยังไม่ได้สร้าง เช็คตัวสะกดดูนะ";
  else if (/TypeError/.test(err)) tip = "\n\n💡 TypeError = ชนิดข้อมูลไม่เข้ากัน เช่น เอาข้อความ + ตัวเลขตรงๆ ไม่ได้ ลองใช้ f-string หรือคั่นด้วย , ใน print";
  else if (/IndexError/.test(err)) tip = "\n\n💡 IndexError = ตำแหน่งที่ขอเกินขนาดของ list — อย่าลืมว่าเริ่มนับจาก 0";
  else if (/KeyError/.test(err)) tip = "\n\n💡 KeyError = ไม่มีช่องชื่อนี้ใน dictionary เช็คตัวสะกดของ key ดูนะ";
  return last + tip;
}

/* ═══════════════ XP / Level (guest) ═══════════════ */
function gainXPLocal(amount) {
  state.xp += amount;
  let leveled = false;
  while (state.xp >= xpNeed(state.level)) {
    state.xp -= xpNeed(state.level);
    state.level++;
    leveled = true;
  }
  renderXP();
  if (leveled) setTimeout(showLevelUp, 700);
}

function showLevelUp() {
  $("newLvl").textContent = state.level;
  $("overlay").classList.add("show");
  confetti();
}

function confetti() {
  const colors = ["#ffb347", "#62e6ff", "#6ee7a0", "#ff6b81", "#c3a4ff"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
    c.style.animationDelay = Math.random() * 0.4 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/* ═══════════════ Events ═══════════════ */
runBtn.onclick = () => runCode(false);
$("runOwnBtn").onclick = () => runCode(true);
$("resetBtn").onclick = () => { codeEl.value = levels()[state.stage].starter; };
$("hintBtn").onclick = () => $("hintBox").classList.toggle("show");
$("nextBtn").onclick = () => {
  if (state.stage < levels().length - 1) {
    state.stage++;
    renderStage();
  } else {
    goLearn();
  }
};
$("closeOverlay").onclick = () => $("overlay").classList.remove("show");
codeEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const s = codeEl.selectionStart;
    const before = codeEl.value.slice(0, s);
    const lineStart = before.lastIndexOf("\n") + 1;
    const curLine = before.slice(lineStart);
    let indent = (curLine.match(/^[ \t]*/) || [""])[0];
    if (/\{\s*$/.test(curLine)) indent += indent.includes("\t") ? "\t" : "    ";
    const insert = "\n" + indent;
    codeEl.value = before + insert + codeEl.value.slice(codeEl.selectionEnd);
    codeEl.selectionStart = codeEl.selectionEnd = s + insert.length;
    return;
  }
  if (e.key === "}") {
    const s = codeEl.selectionStart;
    const before = codeEl.value.slice(0, s);
    const lineStart = before.lastIndexOf("\n") + 1;
    const curLine = before.slice(lineStart);
    if (/^ {4,}$/.test(curLine)) {
      e.preventDefault();
      const newBefore = before.slice(0, s - 4);
      codeEl.value = newBefore + "}" + codeEl.value.slice(codeEl.selectionEnd);
      codeEl.selectionStart = codeEl.selectionEnd = newBefore.length + 1;
      return;
    }
  }
  if (e.key === "Tab") {
    e.preventDefault();
    const s = codeEl.selectionStart;
    codeEl.value = codeEl.value.slice(0, s) + "    " + codeEl.value.slice(codeEl.selectionEnd);
    codeEl.selectionStart = codeEl.selectionEnd = s + 4;
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") runCode(false);
});

/* ═══════════════ Init ═══════════════ */
const CONTENT_VERSION = 16; // ต้องตรงกับ CONTENT_VERSION ใน server.js
async function checkVersion() {
  try {
    const r = await fetch("/api/version");
    if (!r.ok) { $("verWarn").classList.add("show"); return; } // เซิร์ฟเวอร์เก่าไม่มี endpoint นี้ = ไม่ตรงแน่นอน
    const d = await r.json();
    if (d.version !== CONTENT_VERSION) $("verWarn").classList.add("show");
  } catch { /* เปิดเป็นไฟล์ตรงๆ ไม่มีเซิร์ฟเวอร์ — ข้ามได้ */ }
}
renderLangs();
renderXP();
checkVersion();
tryRestore();
initPy();
