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
/* ไอคอนหัวข้อ: ใช้โมดูลกลาง stage-icons.js (Lucide ชุดเดียว) — ICONS ด้านบนเก็บไว้เผื่ออ้างอิง ไม่ได้ใช้บนแผนที่แล้ว */
const iconFor = id => (typeof StageIcons !== "undefined" ? StageIcons.renderStageIcon(id) : "");
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
          { h: "โครงสร้างโปรแกรม Python", p: "Python ใช้<b>การย่อหน้า (indentation)</b> แทนปีกกาเพื่อจัดกลุ่มคำสั่ง (ปกติ 4 ช่อง) และ<b>ไม่ต้องมี ; ท้ายบรรทัด</b> คอมเมนต์ใช้ <code>#</code> — ความเรียบง่ายนี้คือเหตุผลที่ Python ได้รับความนิยม", code: "# นี่คือคอมเมนต์\nprint(\"บรรทัดแรก\")\nprint(\"บรรทัดสอง\")" },
          { h: "ประวัติและจุดเด่นของ Python", p: "Python สร้างโดย <b>Guido van Rossum</b> เปิดตัวปี ค.ศ. 1991 ตั้งชื่อตามรายการตลก Monty Python ไม่ใช่งู! จุดเด่นคือ <b>อ่านง่ายเหมือนภาษาอังกฤษ</b>, เขียนสั้น, มีไลบรารีมหาศาล (\"batteries included\"), รันได้ทุกระบบปฏิบัติการ และเป็นภาษายอดนิยมอันดับต้นของโลกด้าน AI, Data Science และการศึกษา" },
          { h: "Python ถูกใช้ทำอะไรบ้าง", p: "<b>เว็บไซต์</b> (Django, Flask — Instagram, Pinterest) • <b>วิเคราะห์ข้อมูลและ AI</b> (NumPy, Pandas, TensorFlow — ChatGPT ก็ฝึกด้วยเครื่องมือสาย Python) • <b>ระบบอัตโนมัติ</b> (สคริปต์จัดการไฟล์ ส่งอีเมล) • <b>เกม</b> (Pygame) • <b>IoT</b> (Raspberry Pi) • <b>งานวิทยาศาสตร์</b> (NASA ใช้ Python)" },
          { h: "ภาษาระดับต่ำ vs ระดับสูง", p: "<b>ภาษาเครื่อง</b> (0 และ 1) → <b>Assembly</b> (คำย่อแทนคำสั่งเครื่อง) → <b>ภาษาระดับสูง</b> (C, Java, Python) ยิ่งสูงยิ่งใกล้ภาษามนุษย์ เขียนง่ายขึ้น แต่ควบคุมฮาร์ดแวร์ได้น้อยลง — Python อยู่ระดับสูงมาก ส่วน C อยู่ระดับกลาง จึงเร็วกว่าแต่เขียนยากกว่า" },
          { h: "เปรียบเทียบเครื่องมือเขียน Python", p: "<b>IDLE</b> — มากับ Python ฟรี เบา เหมาะกับการเริ่มต้น • <b>PyCharm</b> — IDE ครบครัน เติมโค้ดอัตโนมัติ ดีบักเกอร์ดีมาก เหมาะกับโปรเจกต์ใหญ่ • <b>Jupyter Notebook</b> — รันทีละเซลล์ เห็นผลทันที แทรกกราฟและคำอธิบายได้ เหมาะกับงานข้อมูล • <b>VS Code</b> — เบา ขยายด้วยส่วนเสริม นิยมที่สุดในหมู่นักพัฒนา" }
        ],
        stages: [
          {
            title: "📝 แบบทดสอบทฤษฎี ชุดที่ 1",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "Python ถูกสร้างโดยใคร", c: ["Dennis Ritchie", "Guido van Rossum", "Brendan Eich", "Tim Berners-Lee"], a: 1, e: "Guido van Rossum เปิดตัว Python ปี 1991 (Ritchie สร้าง C, Eich สร้าง JavaScript, Berners-Lee สร้างเว็บ)" },
              { t: "tf", q: "Python เป็นภาษาแบบอินเตอร์พรีเตอร์ที่แปลและรันทีละบรรทัด", a: true, e: "จึงทดลองโค้ดได้ทันทีและหาจุดผิดพลาดได้ง่าย" },
              { t: "mc", q: "ข้อใดไม่ใช่จุดเด่นของ Python", c: ["อ่านง่าย", "มีไลบรารีมาก", "เร็วที่สุดในทุกภาษา", "รันได้หลายระบบปฏิบัติการ"], a: 2, e: "Python ช้ากว่าภาษาคอมไพล์อย่าง C แต่แลกมากับความง่ายในการเขียน" },
              { t: "fill", q: "Python ใช้การ ___ แทนเครื่องหมายปีกกาในการจัดกลุ่มคำสั่ง", a: ["ย่อหน้า", "indentation", "เยื้อง"], e: "ปกติย่อหน้า 4 ช่อง" },
              { t: "order", q: "เรียงระดับภาษาจากใกล้เครื่องไปใกล้มนุษย์", items: ["ภาษาเครื่อง (0/1)", "Assembly", "ภาษา C", "Python"], e: "ยิ่งสูงยิ่งเขียนง่าย แต่ควบคุมฮาร์ดแวร์ได้น้อยลง" }
            ]
          },
          {
            title: "📝 แบบทดสอบทฤษฎี ชุดที่ 2",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "เครื่องมือใดเหมาะกับงานวิเคราะห์ข้อมูลที่ต้องรันทีละส่วนและแทรกกราฟ", c: ["IDLE", "Notepad", "Jupyter Notebook", "Command Prompt"], a: 2, e: "Jupyter รันทีละเซลล์และแสดงกราฟในหน้าเดียวกัน" },
              { t: "tf", q: "ใน Python ต้องใส่ ; ท้ายทุกบรรทัดเหมือนภาษาซี", a: false, e: "Python ไม่ต้องใช้ ; การขึ้นบรรทัดใหม่คือการจบคำสั่ง" },
              { t: "mc", q: "เฟรมเวิร์กใดใช้สร้างเว็บไซต์ด้วย Python", c: ["React", "Django", "Laravel", "Spring"], a: 1, e: "Django และ Flask คือเฟรมเวิร์กเว็บของ Python" },
              { t: "fill", q: "คอมเมนต์ใน Python ขึ้นต้นด้วยเครื่องหมาย ___", a: ["#"], e: "ข้อความหลัง # จนจบบรรทัดจะถูกข้าม" },
              { t: "mc", q: "Python ตั้งชื่อตามอะไร", c: ["งูเหลือม", "รายการตลก Monty Python", "เมืองในกรีก", "นักวิทยาศาสตร์"], a: 1, e: "Guido เป็นแฟนรายการตลก Monty Python's Flying Circus" }
            ]
          }
        ]
      },
      {
        id: "print", icon: "print", title: "บทที่ 3: เริ่มเขียนโปรแกรม (print/input)",
        blurb: "การแสดงผลด้วย print() และรับข้อมูลด้วย input() — ก้าวแรกของการสื่อสารกับโปรแกรม",
        lesson: [
          { h: "print() แสดงผลออกจอ", p: "คำสั่งพื้นฐานที่สุด แสดงข้อความหรือค่าออกทางหน้าจอ ข้อความ (string) ต้องอยู่ในเครื่องหมายคำพูดเสมอ", code: "print(\"สวัสดีชาวโลก\")" },
          { h: "พิมพ์หลายค่า + ตัวเลือกเสริม", p: "คั่นค่าด้วย <code>,</code> print จะเว้นวรรคให้ • <code>\\n</code> ขึ้นบรรทัดใหม่ • <code>sep=</code> เปลี่ยนตัวคั่น • <code>end=</code> เปลี่ยนตัวปิดท้าย", code: "print(\"คะแนน:\", 99)\nprint(1, 2, 3, sep=\"-\")\nprint(\"ต่อ\", end=\"\")" },
          { h: "input() รับข้อมูลจากผู้ใช้", p: "หยุดรอรับสิ่งที่ผู้ใช้พิมพ์ แล้วคืนค่าเป็น<b>ข้อความเสมอ</b> ถ้าจะคำนวณต้องแปลงด้วย int() หรือ float() ก่อน", code: "name = input(\"ชื่อ: \")\nage = int(input(\"อายุ: \"))\nprint(name, \"อายุ\", age + 1, \"ในปีหน้า\")" },
          { h: "⚠️ กับดักที่มือใหม่เจอบ่อย", p: "<b>1) ลืมแปลงชนิด</b> — <code>input() + 1</code> จะพัง เพราะข้อความบวกตัวเลขไม่ได้ • <b>2) ลืมเครื่องหมายคำพูด</b> — <code>print(สวัสดี)</code> Python จะคิดว่าเป็นชื่อตัวแปรแล้วฟ้อง NameError • <b>3) ใช้เครื่องหมายคำพูดไม่เข้าคู่</b> — เปิดด้วย \" ต้องปิดด้วย \" • <b>4) พิมพ์ Print ตัว P ใหญ่</b> — Python แยกตัวพิมพ์เล็กใหญ่ ต้องเป็น print เท่านั้น" },
          { h: "💡 เคล็ดลับมืออาชีพ", p: "ใช้ <b>f-string</b> แทนการต่อข้อความด้วย + เพราะอ่านง่ายกว่าและไม่ต้องแปลงชนิดเอง • ตั้งชื่อตัวแปรให้สื่อความหมาย (<code>student_name</code> ดีกว่า <code>s</code>) • เขียนคอมเมนต์อธิบาย<b>เหตุผล</b>ที่ทำ ไม่ใช่อธิบายสิ่งที่โค้ดทำอยู่แล้ว", code: "# ไม่ดี: ต่อสตริงยาว อ่านยาก\nprint(\"สวัสดี \" + name + \" อายุ \" + str(age))\n# ดีกว่า: f-string\nprint(f\"สวัสดี {name} อายุ {age}\")" }
        ],
        stages: [
          { title: "สวัสดี Python", desc: "print() แสดงข้อความออกจอ — ข้อความต้องอยู่ในเครื่องหมายคำพูด", goal: "แสดงข้อความ <b>สวัสดี Python</b>", starter: "# แสดงข้อความออกหน้าจอ\n", hint: "<code>print(\"สวัสดี Python\")</code>", xp: 30, check: (out) => eq(out, "สวัสดี Python") },
          { title: "หลายบรรทัด", desc: "เรียก print หลายครั้ง ได้ผลลัพธ์หลายบรรทัด", goal: "แสดง 3 บรรทัด: <b>Python</b>, <b>สนุก</b>, <b>มาก</b>", starter: "", hint: "print 3 ครั้ง", xp: 40, check: (out) => { const l = lines(out); return l.length === 3 && l[0] === "Python" && l[1] === "สนุก" && l[2] === "มาก"; } },
          { title: "พิมพ์หลายค่า", desc: "คั่นค่าด้วย , print เว้นวรรคให้อัตโนมัติ", goal: "ใช้ print เดียวแสดง <b>คะแนน: 100</b> (คั่นด้วย ,)", starter: "", hint: "<code>print(\"คะแนน:\", 100)</code>", xp: 40, check: (out, code) => eq(out, "คะแนน: 100") && code.includes(",") },
          { title: "เปลี่ยนตัวคั่น sep", desc: "sep= เปลี่ยนตัวที่คั่นระหว่างค่า", goal: "ใช้ sep แสดง <b>2026-07-09</b>", starter: "", hint: "<code>print(2026, \"07\", \"09\", sep=\"-\")</code>", xp: 50, check: (out, code) => eq(out, "2026-07-09") && code.includes("sep") },
          { title: "รับชื่อมาทักทาย", desc: "input() รับข้อมูลเก็บในตัวแปร (ระบบป้อนค่าให้ในกล่อง ⌨️)", goal: "รับชื่อแล้วแสดง <b>สวัสดี มะลิ</b> (ระบบป้อน \"มะลิ\")", starter: "name = input()\n", hint: "<code>print(\"สวัสดี\", name)</code>", xp: 50, stdin: ["มะลิ"], check: (out, code) => eq(out, "สวัสดี มะลิ") && /input\(/.test(code) },
          { title: "รับเลขมาบวก", desc: "input() ได้ข้อความเสมอ ต้องแปลงเป็น int ก่อนคำนวณ", goal: "รับเลขแล้วแสดงค่าที่บวก 10 (ระบบป้อน \"5\" ต้องได้ <b>15</b>)", starter: "n = input()\n", hint: "<code>print(int(n) + 10)</code>", xp: 60, stdin: ["5"], check: (out, code) => eq(out, "15") && /int\(/.test(code) },
          {
            title: "ใบเสร็จหลายบรรทัด",
            desc: "ฝึกจัดรูปแบบผลลัพธ์ให้สวยงามด้วย print หลายคำสั่งและการคั่นค่า",
            goal: 'แสดง 3 บรรทัด: <b>=== ใบเสร็จ ===</b>, <b>กาแฟ 50 บาท</b>, <b>รวม 50 บาท</b>',
            starter: "price = 50\n",
            hint: 'ใช้ตัวแปร price ใน print เช่น <code>print("กาแฟ", price, "บาท")</code>',
            xp: 50,
            check: (out) => { const l = lines(out); return l.length === 3 && l[0] === "=== ใบเสร็จ ===" && l[1] === "กาแฟ 50 บาท" && l[2] === "รวม 50 บาท"; }
          },
          {
            title: "รับสองค่ามาคำนวณ",
            desc: "รับข้อมูลสองครั้งแล้วนำมาคำนวณต่อ — รูปแบบพื้นฐานของโปรแกรมโต้ตอบ",
            goal: 'รับความกว้างและความยาว แล้วแสดง <b>พื้นที่ = 24</b> (ระบบป้อน "4" และ "6")',
            starter: "",
            hint: '<code>w = int(input())</code> สองครั้ง แล้ว <code>print("พื้นที่ =", w * h)</code>',
            xp: 60,
            stdin: ["4", "6"],
            check: (out, code) => eq(out, "พื้นที่ = 24") && (code.match(/input\(/g) || []).length >= 2
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ข้อใดแสดงข้อความ <code>สวัสดี</code> ได้ถูกต้อง", c: ["print(สวัสดี)", "print(\"สวัสดี\")", "Print(\"สวัสดี\")", "echo \"สวัสดี\""], a: 1, e: "ข้อความต้องอยู่ในเครื่องหมายคำพูด และ print ต้องเป็นตัวพิมพ์เล็ก เพราะ Python แยกตัวพิมพ์เล็ก-ใหญ่" },
              { t: "tf", q: "<code>input()</code> คืนค่าเป็นตัวเลขอัตโนมัติ ถ้าผู้ใช้พิมพ์ตัวเลข", a: false, e: "input() คืนค่าเป็นข้อความ (str) เสมอ ต้องแปลงด้วย int() หรือ float() ก่อนนำไปคำนวณ" },
              { t: "fill", q: "อยากให้ print ใช้ขีดคั่นแทนช่องว่าง ต้องใส่อาร์กิวเมนต์ <code>___=\"-\"</code>", a: ["sep"], e: "sep กำหนดตัวคั่นระหว่างค่า ส่วน end กำหนดตัวปิดท้าย (ค่าเริ่มต้นคือขึ้นบรรทัดใหม่)" },
              { t: "mc", q: "<code>print(\"A\", end=\"\")</code> แล้วตามด้วย <code>print(\"B\")</code> จะได้ผลลัพธ์อย่างไร", c: ["A B", "AB", "A แล้ว B คนละบรรทัด", "Error"], a: 1, e: "end=\"\" ทำให้ไม่ขึ้นบรรทัดใหม่หลังพิมพ์ A คำสั่งถัดไปจึงพิมพ์ต่อกันเป็น AB" },
              { t: "order", q: "เรียงขั้นตอนของโปรแกรมที่รับอายุแล้วแสดงอายุในปีหน้า", items: ["รับค่าด้วย input()", "แปลงเป็นตัวเลขด้วย int()", "บวก 1", "แสดงผลด้วย print()"], e: "ต้องแปลงชนิดก่อนคำนวณเสมอ ไม่งั้นจะเอาข้อความไปบวกกับตัวเลขไม่ได้" }
            ]
          }
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
          { title: "สลับค่า", desc: "Python สลับค่าตัวแปรได้ในบรรทัดเดียว: a, b = b, a", goal: "a=5, b=9 สลับค่ากัน แล้วแสดง a และ b (ต้องได้ <b>9</b> แล้ว <b>5</b>)", starter: "a = 5\nb = 9\n", hint: "<code>a, b = b, a</code>", xp: 60, check: (out) => { const l = lines(out); return l.length === 2 && l[0] === "9" && l[1] === "5"; } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ชื่อตัวแปรใดตั้งได้ถูกกฎของ Python", c: ["2name", "my name", "my_name", "class"], a: 2, e: "ห้ามขึ้นต้นด้วยตัวเลข ห้ามเว้นวรรค และห้ามใช้คำสงวนอย่าง class — ใช้ _ เชื่อมคำแทน" },
              { t: "tf", q: "ตัวแปร <code>Age</code> กับ <code>age</code> ใน Python คือตัวแปรเดียวกัน", a: false, e: "Python แยกตัวพิมพ์เล็ก-ใหญ่ (case-sensitive) จึงเป็นคนละตัวแปร" },
              { t: "fill", q: "<code>x = 5</code> แล้ว <code>x += 3</code> ตอนนี้ x มีค่าเท่ากับ ___", a: ["8"], e: "x += 3 คือการย่อของ x = x + 3" },
              { t: "mc", q: "<code>a, b = 1, 2</code> แล้ว <code>a, b = b, a</code> ค่าของ a คือ", c: ["1", "2", "3", "Error"], a: 1, e: "Python สลับค่าได้ในบรรทัดเดียว a จึงได้ค่าเดิมของ b คือ 2" },
              { t: "tf", q: "<code>f\"{name}\"</code> คือ f-string ที่แทรกค่าตัวแปรลงในข้อความได้", a: true, e: "ใส่ตัวอักษร f หน้าเครื่องหมายคำพูด แล้วครอบชื่อตัวแปรด้วยปีกกา" }
            ]
          }
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
          { title: "แปลงเลขเป็นข้อความ", desc: "str() แปลงตัวเลขเป็นข้อความ เพื่อนำไปต่อกับข้อความอื่น", goal: "แปลง 100 เป็น str แล้วต่อกับ \"แต้ม\" ให้ได้ <b>100แต้ม</b>", starter: "", hint: "<code>print(str(100) + \"แต้ม\")</code>", xp: 50, check: (out, code) => eq(out, "100แต้ม") && /str\(/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>type(3.0)</code> ให้ผลลัพธ์ชนิดใด", c: ["int", "float", "str", "complex"], a: 1, e: "ตัวเลขที่มีจุดทศนิยมเป็น float แม้ทศนิยมจะเป็น .0" },
              { t: "mc", q: "<code>7 // 2</code> มีค่าเท่าใด", c: ["3.5", "3", "4", "1"], a: 1, e: "// คือหารแล้วปัดลงเป็นจำนวนเต็ม ส่วน / ได้ทศนิยมเสมอ" },
              { t: "tf", q: "<code>int(3.9)</code> ให้ผลลัพธ์เป็น 4 เพราะปัดขึ้น", a: false, e: "int() ตัดทศนิยมทิ้ง (ไม่ปัด) จึงได้ 3 — ถ้าต้องการปัดให้ใช้ round()" },
              { t: "fill", q: "ค่าความจริงใน Python มี 2 ค่าคือ True และ ___", a: ["False"], e: "Boolean มีแค่ True และ False โดยขึ้นต้นด้วยตัวพิมพ์ใหญ่" },
              { t: "mc", q: "ข้อใดเป็นการแปลงชนิดแบบ Implicit (Python แปลงให้เอง)", c: ["int(\"5\")", "str(10)", "5 + 2.0 ได้ 7.0", "float(\"3.2\")"], a: 2, e: "เมื่อ int บวกกับ float Python แปลง int เป็น float ให้อัตโนมัติ ส่วนข้ออื่นเป็นการแปลงแบบ Explicit ที่เราสั่งเอง" }
            ]
          }
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
          { title: "นับคำ", desc: ".count(คำ) นับจำนวนครั้งที่พบ", goal: "นับคำว่า \"นา\" ใน \"นานานา นา\" (ต้องได้ <b>4</b>)", starter: "song = \"นานานา นา\"\n", hint: "<code>print(song.count(\"นา\"))</code>", xp: 60, check: (out, code) => eq(out, "4") && /\.count\(/.test(code) },
          {
            title: "ตรวจรหัสผ่านสั้นไป",
            desc: "รวม len() กับเงื่อนไข — งานตรวจข้อมูลที่เจอในทุกระบบสมัครสมาชิก",
            goal: 'pwd = "abc123" ถ้ายาว ≥ 8 ตัวแสดง <b>ผ่าน</b> ไม่งั้นแสดง <b>สั้นเกินไป</b> (ต้องได้ <b>สั้นเกินไป</b>)',
            starter: 'pwd = "abc123"\n',
            hint: '<code>if len(pwd) >= 8:</code>',
            xp: 60,
            check: (out, code) => eq(out, "สั้นเกินไป") && /len\(/.test(code) && /if\s+/.test(code)
          },
          {
            title: "กลับข้อความและตรวจพาลินโดรม",
            desc: "slice แบบ [::-1] กลับข้อความได้ในบรรทัดเดียว — เทคนิคเฉพาะตัวของ Python",
            goal: 'word = "level" แสดง 2 บรรทัด: ข้อความที่กลับด้าน (<b>level</b>) และผลเทียบว่าเหมือนเดิมไหม (<b>True</b>)',
            starter: 'word = "level"\n',
            hint: '<code>print(word[::-1])</code> แล้ว <code>print(word == word[::-1])</code>',
            xp: 80,
            check: (out, code) => lines(out).join(",") === "level,True" && /\[::-1\]/.test(code)
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>\"Python\"[0]</code> ให้ผลลัพธ์อะไร", c: ["P", "y", "n", "Python"], a: 0, e: "ดัชนีของ string เริ่มนับที่ 0 ตัวแรกจึงเป็น P" },
              { t: "mc", q: "<code>\"Python\"[1:4]</code> ให้ผลลัพธ์อะไร", c: ["Pyt", "yth", "ytho", "ython"], a: 1, e: "slice [1:4] เอาตำแหน่ง 1, 2, 3 (ไม่รวม 4) จึงได้ yth" },
              { t: "tf", q: "<code>\"abc\".upper()</code> จะเปลี่ยนตัวแปรต้นฉบับให้เป็นตัวใหญ่ถาวร", a: false, e: "string แก้ไขไม่ได้ (immutable) เมท็อดคืนค่าใหม่เสมอ ต้องเก็บผลลัพธ์ใส่ตัวแปรเอง" },
              { t: "fill", q: "เมท็อดที่ใช้แยกข้อความเป็นลิสต์ตามตัวคั่นคือ <code>.___()</code>", a: ["split"], e: "เช่น \"a,b\".split(\",\") ได้ ['a', 'b']" },
              { t: "mc", q: "<code>len(\"สวัสดี\")</code> นับอะไร", c: ["จำนวนคำ", "จำนวนตัวอักษรรวมสระและวรรณยุกต์", "จำนวนไบต์", "จำนวนพยางค์"], a: 1, e: "len() นับจำนวนอักขระ ภาษาไทยจึงนับสระและวรรณยุกต์แยกเป็นตัวด้วย" }
            ]
          }
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
          { title: "เรียงลำดับ", desc: ".sort() เรียงจากน้อยไปมาก", goal: "เรียง [30, 5, 12] แล้วแสดงตัวแรก (ต้องได้ <b>5</b>)", starter: "nums = [30, 5, 12]\n", hint: "<code>nums.sort()</code> แล้ว <code>print(nums[0])</code>", xp: 60, check: (out, code) => eq(out, "5") && /\.sort\(\)/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>items[-1]</code> หมายถึงอะไร", c: ["ตัวแรก", "ตัวสุดท้าย", "Error", "ตัวรองสุดท้าย"], a: 1, e: "ดัชนีลบนับจากท้าย -1 คือตัวสุดท้าย -2 คือตัวรองสุดท้าย" },
              { t: "mc", q: "เมท็อดใดเพิ่มสมาชิกต่อท้าย list", c: ["add()", "push()", "append()", "insert(0)"], a: 2, e: "append() เพิ่มท้าย ส่วน push() เป็นของ JavaScript" },
              { t: "tf", q: "list ใน Python เก็บข้อมูลต่างชนิดปนกันได้ เช่น [1, \"a\", True]", a: true, e: "list ยืดหยุ่นมาก เก็บได้ทุกชนิดรวมถึง list ซ้อน list" },
              { t: "fill", q: "ฟังก์ชันที่หาผลรวมของตัวเลขทั้งลิสต์คือ <code>___(nums)</code>", a: ["sum"], e: "sum() รวมค่า ส่วน len() นับจำนวน max()/min() หาค่ามาก/น้อยสุด" },
              { t: "order", q: "เรียงผลลัพธ์ของ <code>[30, 5, 12]</code> หลังเรียกใช้ .sort()", items: ["5", "12", "30"], e: "sort() เรียงจากน้อยไปมากโดยปริยาย และแก้ไข list ต้นฉบับเลย" }
            ]
          }
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
          { title: "สมาชิกร่วม", desc: "& หาสมาชิกที่อยู่ในทั้งสองเซต", goal: "หาค่าร่วมของ {1,2,3} และ {2,3,4} แล้วแสดงจำนวน (ต้องได้ <b>2</b>)", starter: "a = {1, 2, 3}\nb = {2, 3, 4}\n", hint: "<code>print(len(a & b))</code>", xp: 60, check: (out, code) => eq(out, "2") && /&/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ข้อใดคือจุดเด่นของ tuple", c: ["แก้ไขค่าได้", "แก้ไขค่าไม่ได้", "ไม่มีลำดับ", "ห้ามมีค่าซ้ำ"], a: 1, e: "tuple เป็น immutable เหมาะกับข้อมูลที่ไม่ควรเปลี่ยน เช่น พิกัด" },
              { t: "mc", q: "<code>len({1, 2, 2, 3})</code> มีค่าเท่าใด", c: ["4", "3", "2", "Error"], a: 1, e: "set เก็บเฉพาะค่าไม่ซ้ำ เลข 2 ที่ซ้ำจึงถูกตัดทิ้ง เหลือ 3 ตัว" },
              { t: "tf", q: "set มีลำดับ จึงเข้าถึงด้วย s[0] ได้", a: false, e: "set ไม่มีลำดับ จึงใช้ดัชนีเข้าถึงไม่ได้" },
              { t: "fill", q: "เครื่องหมายที่หาสมาชิกร่วม (intersection) ของสองเซตคือ ___", a: ["&"], e: "& คืออินเตอร์เซกชัน | คือยูเนียน - คือผลต่าง" },
              { t: "mc", q: "ข้อใดสร้าง tuple ที่มีสมาชิกตัวเดียวได้ถูกต้อง", c: ["(5)", "(5,)", "[5]", "{5}"], a: 1, e: "(5) เป็นแค่ตัวเลขในวงเล็บ ต้องมีจุลภาคต่อท้าย (5,) จึงจะเป็น tuple" }
            ]
          }
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
          { title: "หาความยาว", desc: "len() นับจำนวนคู่คีย์-ค่า", goal: "แสดงจำนวนคีย์ใน player (ต้องได้ <b>2</b>)", starter: "player = {\"name\": \"มะลิ\", \"hp\": 100}\n", hint: "<code>print(len(player))</code>", xp: 50, check: (out, code) => eq(out, "2") && /len\(/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "เข้าถึงค่าใน dictionary ด้วยอะไร", c: ["ดัชนีตัวเลข", "คีย์ (key)", "ลำดับที่เพิ่ม", "ค่า (value)"], a: 1, e: "dict เก็บเป็นคู่ key: value และเข้าถึงค่าผ่าน key" },
              { t: "tf", q: "กำหนดค่าให้คีย์ที่ยังไม่มี เช่น d[\"new\"] = 1 จะเกิด Error", a: false, e: "จะเป็นการเพิ่มคีย์ใหม่เข้าไป — Error จะเกิดตอนอ่านคีย์ที่ไม่มีเท่านั้น" },
              { t: "fill", q: "เมท็อดที่คืนคู่ key-value ทั้งหมดไว้ใช้กับลูปคือ <code>.___()</code>", a: ["items"], e: "for k, v in d.items(): วนได้ทั้งคีย์และค่า" },
              { t: "mc", q: "วิธีอ่านค่าอย่างปลอดภัยเมื่อไม่แน่ใจว่ามีคีย์นั้นไหม", c: ["d[\"key\"]", "d.get(\"key\")", "d.key", "d[0]"], a: 1, e: "get() คืน None (หรือค่าที่กำหนด) แทนที่จะเกิด KeyError" },
              { t: "tf", q: "<code>\"hp\" in player</code> ใช้ตรวจว่ามีคีย์ hp ในพจนานุกรมไหม", a: true, e: "in กับ dict จะตรวจที่คีย์ ไม่ใช่ค่า" }
            ]
          }
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
          { title: "bitwise AND", desc: "& ทำ AND ระดับบิต", goal: "แสดงผลของ <b>5 & 3</b> (ต้องได้ <b>1</b>)", starter: "", hint: "<code>print(5 & 3)</code>", xp: 60, check: (out, code) => eq(out, "1") && /&/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>17 % 5</code> มีค่าเท่าใด", c: ["3", "2", "3.4", "12"], a: 1, e: "% คือหารเอาเศษ 17 หาร 5 ได้ 3 เศษ 2" },
              { t: "mc", q: "<code>2 ** 3</code> มีค่าเท่าใด", c: ["6", "8", "9", "5"], a: 1, e: "** คือยกกำลัง 2 ยกกำลัง 3 = 8" },
              { t: "tf", q: "<code>True and False</code> มีค่าเป็น True", a: false, e: "and ต้องจริงทั้งคู่จึงจะจริง" },
              { t: "fill", q: "ตัวดำเนินการที่ตรวจว่าค่าอยู่ในลำดับหรือไม่ (membership) คือ ___", a: ["in"], e: "เช่น 3 in [1,2,3] ได้ True" },
              { t: "order", q: "เรียงลำดับความสำคัญของตัวดำเนินการจากทำก่อนไปทำทีหลัง", items: ["** ยกกำลัง", "* / คูณหาร", "+ - บวกลบ", "and / or ตรรกะ"], e: "เหมือนคณิตศาสตร์: ยกกำลังก่อน แล้วคูณหาร บวกลบ สุดท้ายคือตรรกะ ถ้าไม่แน่ใจให้ใส่วงเล็บ" }
            ]
          }
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
          { title: "เงื่อนไขซ้อน", desc: "if ซ้อนใน if ตรวจเป็นชั้นๆ", goal: "hp=70, lv=12 ถ้า hp>50 และ lv>10 แสดง <b>สู้บอส</b>", starter: "hp = 70\nlv = 12\n", hint: "if hp>50 ข้างในมี if lv>10 อีกชั้น", xp: 60, check: (out, code) => eq(out, "สู้บอส") && (code.match(/if\s+/g) || []).length >= 2 },
          {
            title: "ส่วนลดตามยอดซื้อ",
            desc: "โจทย์ธุรกิจจริง: เงื่อนไขหลายชั้นที่ต้องเรียงจากมากไปน้อยให้ถูก",
            goal: 'total = 1200 — ถ้า ≥ 1000 ลด 20% / ≥ 500 ลด 10% / นอกนั้นไม่ลด แล้วแสดงราคาที่ต้องจ่าย (ต้องได้ <b>960.0</b>)',
            starter: "total = 1200\n",
            hint: '<code>if total >= 1000: print(total * 0.8)</code>',
            xp: 60,
            check: (out, code) => eq(out, "960.0") && /if\s+/.test(code)
          },
          {
            title: "ตรวจปีอธิกสุรทิน",
            desc: "โจทย์คลาสสิกที่ใช้ตรรกะซับซ้อน: ปีอธิกสุรทินคือปีที่หารด้วย 4 ลงตัว แต่ถ้าหารด้วย 100 ลงตัวต้องหารด้วย 400 ลงตัวด้วย",
            goal: 'year = 2024 ตรวจว่าเป็นปีอธิกสุรทินไหม แสดง <b>อธิกสุรทิน</b> หรือ <b>ปีปกติ</b> (ต้องได้ <b>อธิกสุรทิน</b>)',
            starter: "year = 2024\n",
            hint: '<code>if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:</code>',
            xp: 80,
            check: (out, code) => eq(out, "อธิกสุรทิน") && /%\s*4/.test(code) && /(and|or)/.test(code)
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "อะไรบอกว่าคำสั่งไหนอยู่ในบล็อก if ใน Python", c: ["ปีกกา { }", "การย่อหน้า", "คำว่า end", "เซมิโคลอน"], a: 1, e: "Python ใช้การย่อหน้า (ปกติ 4 ช่อง) แทนปีกกา" },
              { t: "tf", q: "ต้องมีเครื่องหมาย : ท้ายบรรทัด if, elif และ else เสมอ", a: true, e: "ลืม : คือ SyntaxError ยอดฮิตของมือใหม่" },
              { t: "mc", q: "score = 85 จะเข้าเงื่อนไขใดก่อน: <code>if score >= 50</code> / <code>elif score >= 80</code>", c: ["score >= 50", "score >= 80", "ทั้งสองเงื่อนไข", "ไม่เข้าเลย"], a: 0, e: "Python เช็คจากบนลงล่างและเข้าเงื่อนไขแรกที่จริงเท่านั้น จึงควรเรียงจากมากไปน้อย" },
              { t: "fill", q: "คำสำคัญที่ใช้เช็คเงื่อนไขเพิ่มเติมต่อจาก if คือ ___", a: ["elif"], e: "elif ย่อมาจาก else if" },
              { t: "tf", q: "เงื่อนไข <code>10 &lt;= x &lt;= 20</code> เขียนแบบนี้ใน Python ได้", a: true, e: "Python เขียนเปรียบเทียบต่อกันเป็นช่วงได้ อ่านง่ายเหมือนคณิตศาสตร์" }
            ]
          }
        ]
      },
      {
        id: "loop", icon: "loop", title: "บทที่ 8: คำสั่งทำซ้ำ (Loop)",
        blurb: "while และ for พร้อม break, continue, else และลูปซ้อน",
        lesson: [
          { h: "ลูป for", p: "วนตามลำดับหรือช่วงตัวเลข <b>range(a, b)</b> ให้เลข a ถึง b-1 — เหมาะเมื่อรู้จำนวนรอบ", code: "for i in range(1, 4):\n    print(i)  # 1 2 3" },
          { h: "ลูป while", p: "วนตราบใดที่เงื่อนไขจริง — ต้องมีบรรทัดเปลี่ยนค่าเพื่อให้เงื่อนไขเป็นเท็จ ไม่งั้นวนไม่จบ", code: "n = 3\nwhile n > 0:\n    print(n)\n    n -= 1" },
          { h: "break และ continue", p: "<b>break</b> ออกจากลูปทันที • <b>continue</b> ข้ามไปรอบถัดไป — ใช้ควบคุมการวนละเอียดขึ้น", code: "for i in range(1, 6):\n    if i == 3:\n        continue  # ข้าม 3\n    print(i)  # 1 2 4 5" },
          { h: "range() แบบเต็มรูปแบบ", p: "<code>range(5)</code> = 0-4 • <code>range(1, 6)</code> = 1-5 (ไม่รวมตัวท้าย) • <code>range(0, 10, 2)</code> = 0,2,4,6,8 (ก้าวทีละ 2) • <code>range(5, 0, -1)</code> = 5,4,3,2,1 (นับถอยหลัง) — จำไว้ว่า<b>ตัวท้ายไม่ถูกรวมเสมอ</b> คือกับดักอันดับหนึ่งของ range" },
          { h: "⚠️ ลูปไม่รู้จบและการย่อหน้า", p: "<b>while</b> ที่ลืมเปลี่ยนค่าตัวแปรเงื่อนไขจะวนไม่จบและทำให้หน้าเว็บค้าง — ตรวจเสมอว่ามีบรรทัดที่ทำให้เงื่อนไขเป็นเท็จได้ • การ<b>ย่อหน้าผิด</b>ทำให้คำสั่งหลุดออกนอกลูป เช่น บรรทัด print ที่ควรอยู่ในลูปแต่ย่อหน้าเท่ากับ for จะทำงานแค่ครั้งเดียวหลังลูปจบ" },
          { h: "💡 ลูปซ้อนและ enumerate", p: "ลูปซ้อนใช้ทำตาราง/รูปทรง แต่ระวังจำนวนรอบคูณกัน (10×10 = 100 รอบ) • เมื่อต้องใช้ทั้งลำดับและค่า ใช้ <b>enumerate()</b> จะสวยกว่าการใช้ range(len(...))", code: "for i, name in enumerate([\"ก\", \"ข\"], start=1):\n    print(i, name)  # 1 ก / 2 ข" }
        ],
        stages: [
          { title: "วนด้วย for", desc: "range(1, 6) ให้ 1 ถึง 5", goal: "แสดง <b>เก็บเหรียญที่ 1</b> ถึง <b>5</b>", starter: "", hint: "<code>for i in range(1, 6): print(\"เก็บเหรียญที่\", i)</code>", xp: 50, check: (out, code) => { const l = lines(out); return l.length === 5 && l[0] === "เก็บเหรียญที่ 1" && l[4] === "เก็บเหรียญที่ 5" && /for\s+/.test(code); } },
          { title: "ผลรวม 1 ถึง 10", desc: "สะสมค่าในตัวแปรระหว่างวนลูป", goal: "หาผลรวม 1 ถึง 10 (ต้องได้ <b>55</b>)", starter: "total = 0\n", hint: "<code>for i in range(1, 11): total += i</code> จบลูปค่อย print", xp: 60, check: (out, code) => eq(out, "55") && /for\s+/.test(code) },
          { title: "นับถอยหลัง while", desc: "while วนจนเงื่อนไขเป็นเท็จ", goal: "count=3 นับถอยหลัง 3,2,1 แล้วแสดง <b>ทะยาน!</b>", starter: "count = 3\n", hint: "<code>while count > 0:</code> print แล้ว <code>count -= 1</code>", xp: 60, check: (out, code) => { const l = lines(out); return l.join(",") === "3,2,1,ทะยาน!" && /while/.test(code); } },
          { title: "เฉพาะเลขคู่", desc: "รวม for กับ if กรองค่า", goal: "แสดงเลขคู่ 1 ถึง 10 (2,4,6,8,10 บรรทัดละเลข)", starter: "", hint: "<code>for i in range(1, 11): if i % 2 == 0: print(i)</code>", xp: 60, check: (out) => { const l = lines(out); return l.join(",") === "2,4,6,8,10"; } },
          { title: "continue ข้ามค่า", desc: "continue ข้ามไปรอบถัดไป", goal: "แสดง 1-5 แต่ข้าม 3 (ต้องได้ 1,2,4,5)", starter: "", hint: "<code>if i == 3: continue</code>", xp: 60, check: (out, code) => { const l = lines(out); return l.join(",") === "1,2,4,5" && /continue/.test(code); } },
          { title: "ลูปซ้อน", desc: "ลูปใน ลูป — สร้างตาราง/รูปทรง", goal: "พิมพ์ตาราง 3 แถว แต่ละแถวมี *** (ดาว 3 ดวง)", starter: "", hint: "<code>for i in range(3): print(\"*\" * 3)</code> หรือลูปซ้อน", xp: 80, check: (out) => { const l = lines(out); return l.length === 3 && l.every(s => s === "***"); } },
          {
            title: "สูตรคูณแม่ 7",
            desc: "ลูปกับการคำนวณและจัดรูปแบบข้อความในบรรทัดเดียว",
            goal: 'แสดงสูตรคูณแม่ 7 ตั้งแต่ <b>7 x 1 = 7</b> ถึง <b>7 x 5 = 35</b> (5 บรรทัด)',
            starter: "",
            hint: '<code>for i in range(1, 6): print(f"7 x {i} = {7 * i}")</code>',
            xp: 60,
            check: (out) => { const l = lines(out); return l.length === 5 && l[0] === "7 x 1 = 7" && l[4] === "7 x 5 = 35"; }
          },
          {
            title: "พีระมิดดาว",
            desc: "รวมลูปกับการทำซ้ำข้อความ — โจทย์ยอดฮิตวัดความเข้าใจเรื่องลูป",
            goal: 'สร้างพีระมิด 4 ชั้น: บรรทัดแรก <b>*</b> เพิ่มทีละดวงจนบรรทัดสุดท้าย <b>****</b>',
            starter: "",
            hint: '<code>for i in range(1, 5): print("*" * i)</code>',
            xp: 80,
            check: (out) => lines(out).join(",") === "*,**,***,****"
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>range(1, 5)</code> ให้ตัวเลขอะไรบ้าง", c: ["1,2,3,4,5", "1,2,3,4", "0,1,2,3,4", "2,3,4,5"], a: 1, e: "ตัวท้ายของ range ไม่ถูกรวม" },
              { t: "mc", q: "คำสั่งใดข้ามไปทำรอบถัดไปทันที", c: ["break", "continue", "pass", "return"], a: 1, e: "continue ข้ามรอบนี้ break ออกจากลูป pass ไม่ทำอะไร" },
              { t: "tf", q: "ลูป while ที่เงื่อนไขเป็นจริงตลอดและไม่มี break จะวนไม่รู้จบ", a: true, e: "ต้องมีบรรทัดที่ทำให้เงื่อนไขเป็นเท็จได้เสมอ" },
              { t: "fill", q: "<code>range(0, 10, 2)</code> ก้าวทีละ ___", a: ["2"], e: "อาร์กิวเมนต์ตัวที่สามคือขนาดก้าว" },
              { t: "order", q: "เรียงผลลัพธ์ของ <code>for i in range(3, 0, -1): print(i)</code>", items: ["3", "2", "1"], e: "ขนาดก้าวติดลบทำให้นับถอยหลัง และไม่รวมเลข 0 ที่เป็นตัวท้าย" }
            ]
          }
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
          { title: "ผังงานหาค่ามากสุด", desc: "ลูป + เงื่อนไขหาค่าสูงสุด", goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc4"></span>(ต้องได้ <b>75</b>)', starter: "", hint: "best=0 วนเทียบ ถ้า s>best ให้ best=s", xp: 100, check: (out, code) => eq(out, "75") && /if\s+/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "สัญลักษณ์ข้าวหลามตัดในผังงานหมายถึงอะไร", c: ["เริ่ม/จบ", "ประมวลผล", "การตัดสินใจ", "แสดงผล"], a: 2, e: "ข้าวหลามตัดใช้กับเงื่อนไข มีทางออก ใช่/ไม่" },
              { t: "mc", q: "สี่เหลี่ยมด้านขนานในผังงานใช้กับอะไร", c: ["การคำนวณ", "รับหรือแสดงข้อมูล", "การวนซ้ำ", "จุดเชื่อมต่อ"], a: 1, e: "สี่เหลี่ยมด้านขนานคือ input/output" },
              { t: "tf", q: "เส้นที่ลากย้อนกลับขึ้นไปในผังงาน แสดงถึงการวนซ้ำ", a: true, e: "การวนกลับไปยังจุดตัดสินใจคือโครงสร้างลูป" },
              { t: "fill", q: "สัญลักษณ์วงรีในผังงานใช้แทนจุด เริ่ม และจุด ___", a: ["จบ", "สิ้นสุด", "stop"], e: "ผังงานทุกผังต้องมีจุดเริ่มและจุดจบ" },
              { t: "order", q: "เรียงขั้นตอนการแก้ปัญหาด้วยผังงาน", items: ["วิเคราะห์ปัญหา", "เขียนผังงาน", "เขียนโค้ดตามผัง", "ทดสอบโปรแกรม"], e: "คิดและออกแบบก่อนลงมือเขียนโค้ดเสมอ" }
            ]
          }
        ]
      },
      {
        id: "function", icon: "function", title: "บทที่ 9: ฟังก์ชันและโมดูล",
        blurb: "สร้างฟังก์ชัน, พารามิเตอร์, return, ค่าเริ่มต้น, Lambda และการใช้โมดูล",
        lesson: [
          { h: "สร้างฟังก์ชัน", p: "ใช้ <b>def</b> ตามด้วยชื่อและ ( ) — จัดกลุ่มโค้ดที่ใช้ซ้ำ เรียกใช้ด้วยชื่อฟังก์ชัน", code: "def greet():\n    print(\"สวัสดี\")\n\ngreet()  # เรียกใช้" },
          { h: "พารามิเตอร์และ return", p: "รับค่าเข้าผ่านพารามิเตอร์ ส่งผลกลับด้วย <b>return</b> — ตั้งค่าเริ่มต้นให้พารามิเตอร์ได้ด้วย =", code: "def add(a, b=10):\n    return a + b\n\nprint(add(5))     # 15\nprint(add(5, 3))  # 8" },
          { h: "Lambda และโมดูล", p: "<b>lambda</b> ฟังก์ชันสั้นบรรทัดเดียว • <b>import</b> เรียกใช้โมดูลสำเร็จรูป เช่น math, random", code: "square = lambda x: x * x\nprint(square(5))  # 25\n\nimport math\nprint(math.sqrt(16))  # 4.0" },
          { h: "ขอบเขตตัวแปร (Scope)", p: "ตัวแปรที่สร้างในฟังก์ชันเป็น<b>ตัวแปรเฉพาะที่ (local)</b> มองจากข้างนอกไม่เห็นและหายไปเมื่อฟังก์ชันจบ • ฟังก์ชันอ่านตัวแปรข้างนอก (global) ได้ แต่ถ้าจะ<b>แก้ค่า</b>ต้องประกาศ <code>global</code> ก่อน — ทางที่ดีกว่าคือรับค่าเข้าทางพารามิเตอร์และส่งผลออกทาง return" },
          { h: "⚠️ กับดักของฟังก์ชัน", p: "<b>1) ลืม return</b> — ฟังก์ชันที่ไม่มี return จะคืน <code>None</code> เสมอ ทำให้เอาไปคำนวณต่อแล้วพัง • <b>2) สับสน print กับ return</b> — print แค่แสดงผลออกจอ ส่วน return ส่งค่ากลับไปใช้ต่อได้ • <b>3) ค่าเริ่มต้นเป็น list</b> — <code>def f(x=[])</code> อันตรายเพราะ list ตัวเดิมถูกใช้ซ้ำทุกครั้ง ให้ใช้ <code>x=None</code> แทน" },
          { h: "💡 ฟังก์ชันที่ดีเป็นอย่างไร", p: "<b>ทำสิ่งเดียวให้ดี</b> (ถ้าอธิบายด้วยประโยคเดียวไม่ได้ แปลว่าควรแยกเป็นหลายฟังก์ชัน) • ตั้งชื่อเป็น<b>คำกริยา</b> เช่น calculate_total, is_valid • ไม่ควรยาวเกินหน้าจอเดียว • ใส่ docstring อธิบายไว้ในบรรทัดแรกของฟังก์ชัน", code: "def calculate_total(price, qty):\n    \"\"\"คืนราคารวมของสินค้า\"\"\"\n    return price * qty" }
        ],
        stages: [
          { title: "ฟังก์ชันแรก", desc: "def สร้างฟังก์ชัน แล้วเรียกใช้ด้วยชื่อ", goal: "สร้างฟังก์ชัน greet ที่แสดง <b>สวัสดีนักผจญภัย</b> แล้วเรียกใช้", starter: "def greet():\n    # เติมโค้ด\n\n", hint: "ในฟังก์ชัน print แล้วข้างนอกเรียก <code>greet()</code>", xp: 60, check: (out, code) => eq(out, "สวัสดีนักผจญภัย") && /def\s+greet/.test(code) },
          { title: "return ค่า", desc: "return ส่งผลลัพธ์กลับ", goal: "สร้าง double(x) คืน x*2 แล้วแสดง double(21) (ต้องได้ <b>42</b>)", starter: "def double(x):\n    # return x คูณ 2\n\nprint(double(21))\n", hint: "<code>return x * 2</code>", xp: 60, check: (out, code) => eq(out, "42") && /return/.test(code) },
          { title: "หลายพารามิเตอร์", desc: "ฟังก์ชันรับหลายค่าได้", goal: "สร้าง attack(name, dmg) แสดง <b>อัศวิน โจมตี 30</b> เมื่อเรียก attack(\"อัศวิน\", 30)", starter: "def attack(name, dmg):\n    # แสดงผล\n\nattack(\"อัศวิน\", 30)\n", hint: "<code>print(name, \"โจมตี\", dmg)</code>", xp: 80, check: (out, code) => eq(out, "อัศวิน โจมตี 30") && /def\s+attack/.test(code) },
          { title: "ค่าเริ่มต้น", desc: "พารามิเตอร์มีค่าเริ่มต้นได้", goal: "สร้าง heal(amount=10) คืน amount แสดง heal() และ heal(50) (ต้องได้ <b>10</b> และ <b>50</b>)", starter: "def heal(amount=10):\n    return amount\n\n", hint: "<code>print(heal())</code> และ <code>print(heal(50))</code>", xp: 80, check: (out) => { const l = lines(out); return l[0] === "10" && l[1] === "50"; } },
          { title: "Lambda", desc: "lambda ฟังก์ชันสั้นบรรทัดเดียว", goal: "สร้าง lambda square คืนกำลังสอง แสดง square(6) (ต้องได้ <b>36</b>)", starter: "square = lambda x: x * x\n", hint: "<code>print(square(6))</code>", xp: 80, check: (out, code) => eq(out, "36") && /lambda/.test(code) },
          { title: "ใช้โมดูล math", desc: "import เรียกใช้โมดูลสำเร็จรูป", goal: "ใช้ math.sqrt หารากที่สองของ 144 (ต้องได้ <b>12.0</b>)", starter: "import math\n", hint: "<code>print(math.sqrt(144))</code>", xp: 80, check: (out, code) => eq(out, "12.0") && /import\s+math/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "คำสำคัญที่ใช้สร้างฟังก์ชันใน Python คือ", c: ["function", "def", "func", "lambda เท่านั้น"], a: 1, e: "def ย่อมาจาก define" },
              { t: "tf", q: "ฟังก์ชันที่ไม่มีคำสั่ง return จะคืนค่า None", a: true, e: "ถ้านำผลลัพธ์ไปใช้ต่อจะได้ None ซึ่งมักเป็นต้นเหตุของบั๊ก" },
              { t: "mc", q: "ข้อต่างสำคัญระหว่าง print() กับ return", c: ["เหมือนกันทุกประการ", "print แสดงผลออกจอ return ส่งค่ากลับไปใช้ต่อ", "return แสดงผลออกจอ", "print ทำงานเร็วกว่า"], a: 1, e: "return ทำให้นำผลลัพธ์ไปคำนวณต่อได้ print ทำไม่ได้" },
              { t: "fill", q: "<code>square = ___ x: x * x</code> คือฟังก์ชันแบบสั้นบรรทัดเดียว", a: ["lambda"], e: "lambda สร้างฟังก์ชันไม่มีชื่อ เหมาะกับงานสั้นๆ" },
              { t: "mc", q: "ตัวแปรที่สร้างภายในฟังก์ชันเรียกว่าอะไร", c: ["global variable", "local variable", "constant", "parameter เสมอ"], a: 1, e: "ตัวแปร local มองเห็นเฉพาะในฟังก์ชันและหายไปเมื่อฟังก์ชันจบ" }
            ]
          }
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
          { title: "finally ทำเสมอ", desc: "finally ทำงานทุกกรณี", goal: "try แปลง int(\"5\") สำเร็จ แล้ว finally แสดง <b>จบการทำงาน</b>", starter: "try:\n    n = int(\"5\")\nexcept:\n    print(\"error\")\n", hint: "<code>finally: print(\"จบการทำงาน\")</code>", xp: 80, check: (out, code) => eq(out, "จบการทำงาน") && /finally/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "บล็อกใดทำงาน<b>เสมอ</b> ไม่ว่าจะเกิดข้อผิดพลาดหรือไม่", c: ["try", "except", "else", "finally"], a: 3, e: "finally เหมาะกับงานเก็บกวาด เช่น ปิดไฟล์หรือปิดการเชื่อมต่อ" },
              { t: "tf", q: "บล็อก else ของ try จะทำงานเมื่อไม่เกิดข้อผิดพลาดเท่านั้น", a: true, e: "else อยู่หลัง except และทำงานเมื่อ try ผ่านไปได้ด้วยดี" },
              { t: "fill", q: "คำสั่งที่ใช้สร้างข้อผิดพลาดเองคือ ___", a: ["raise"], e: "เช่น raise ValueError(\"อายุติดลบไม่ได้\")" },
              { t: "mc", q: "<code>int(\"abc\")</code> ทำให้เกิดข้อผิดพลาดชนิดใด", c: ["TypeError", "ValueError", "ZeroDivisionError", "KeyError"], a: 1, e: "ValueError คือค่ามีชนิดถูกแต่รูปแบบใช้งานไม่ได้" },
              { t: "order", q: "เรียงลำดับบล็อกของการจัดการข้อผิดพลาดให้ถูกต้อง", items: ["try", "except", "else", "finally"], e: "โครงสร้างเต็มรูปแบบต้องเรียงตามนี้เสมอ" }
            ]
          }
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
          { title: "การสืบทอด", desc: "คลาสลูกสืบทอดจากคลาสแม่ด้วย (แม่)", goal: "คลาส Cat สืบทอดจาก Animal มีเมท็อด sound แสดง <b>เหมียว</b> แล้วเรียกใช้", starter: "class Animal:\n    def sound(self):\n        print(\"...\")\n\nclass Cat(Animal):\n    def sound(self):\n        # แสดงเหมียว\n\nCat().sound()\n", hint: "ใน Cat.sound: <code>print(\"เหมียว\")</code>", xp: 100, check: (out, code) => eq(out, "เหมียว") && /class\s+Cat\s*\(\s*Animal\s*\)/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "เมท็อดใดทำงานอัตโนมัติตอนสร้างออบเจ็กต์", c: ["__str__", "__init__", "__main__", "create()"], a: 1, e: "__init__ คือคอนสตรักเตอร์ ใช้กำหนดค่าเริ่มต้น" },
              { t: "tf", q: "<code>self</code> หมายถึงตัวออบเจ็กต์ที่กำลังเรียกใช้เมท็อดนั้นอยู่", a: true, e: "self ต้องเป็นพารามิเตอร์ตัวแรกของเมท็อดทุกตัวในคลาส" },
              { t: "mc", q: "<code>class Cat(Animal):</code> หมายความว่าอะไร", c: ["Cat เป็นคลาสแม่ของ Animal", "Cat สืบทอดคุณสมบัติจาก Animal", "Cat กับ Animal เป็นคลาสเดียวกัน", "Error"], a: 1, e: "นี่คือการสืบทอด (Inheritance) Cat ได้ทุกอย่างที่ Animal มี" },
              { t: "fill", q: "หลักการที่เมท็อดชื่อเดียวกันทำงานต่างกันในแต่ละคลาสเรียกว่า ___", a: ["polymorphism", "โพลีมอร์ฟิซึม"], e: "เช่น sound() ของ Cat ร้องเหมียว ของ Dog ร้องโฮ่ง" },
              { t: "mc", q: "การซ่อนข้อมูลในคลาสด้วยการใส่ __ นำหน้าชื่อเรียกว่าอะไร", c: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], a: 1, e: "Encapsulation ป้องกันการแก้ข้อมูลโดยตรง ให้เข้าถึงผ่านเมท็อดแทน" }
            ]
          }
        ]
      },
      {
        id: "filehandling", icon: "datastructure", title: "บทที่ 11: การจัดการไฟล์ (File Handling)",
        blurb: "อ่าน-เขียนไฟล์ Text และ CSV บนระบบไฟล์เสมือน พร้อมแบบทดสอบทฤษฎี",
        lesson: [
          { h: "เปิดและเขียนไฟล์", p: "ใช้ <b>open(ชื่อไฟล์, โหมด)</b> โหมด: <code>\"r\"</code> อ่าน • <code>\"w\"</code> เขียนทับ • <code>\"a\"</code> เขียนต่อท้าย — เขียนด้วย <code>.write()</code> อ่านด้วย <code>.read()</code> และควรปิดไฟล์ด้วย <code>.close()</code>", code: "f = open(\"data.txt\", \"w\")\nf.write(\"สวัสดี\")\nf.close()" },
          { h: "with statement", p: "การเปิดไฟล์ด้วย <b>with</b> จะปิดไฟล์ให้อัตโนมัติเมื่อจบบล็อก ปลอดภัยกว่าและเป็นวิธีที่แนะนำ", code: "with open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    print(content)" },
          { h: "ไฟล์ CSV และ Excel", p: "<b>CSV</b> ใช้โมดูล csv หรือ pandas อ่าน-เขียนข้อมูลตาราง • <b>Excel</b> ใช้ openpyxl หรือ pandas — เหมาะกับข้อมูลจำนวนมากที่เป็นตาราง (หมายเหตุ: ต้องรันบนเครื่องจริงที่มีระบบไฟล์)", code: "import pandas as pd\ndf = pd.read_csv(\"data.csv\")\nprint(df.head())" },
          { h: "โหมดการเปิดไฟล์ทั้งหมด", p: "<code>\"r\"</code> อ่านอย่างเดียว (ค่าเริ่มต้น ไฟล์ต้องมีอยู่แล้ว) • <code>\"w\"</code> เขียนใหม่ — <b>ลบเนื้อหาเดิมทิ้งทั้งหมด</b> ถ้าไม่มีไฟล์จะสร้างใหม่ • <code>\"a\"</code> เขียนต่อท้าย เนื้อหาเดิมยังอยู่ • <code>\"x\"</code> สร้างใหม่ ถ้ามีอยู่แล้วจะ Error • เติม <code>\"b\"</code> สำหรับไฟล์ไบนารี เช่น รูปภาพ (<code>\"rb\"</code>) • ภาษาไทยควรใส่ <code>encoding=\"utf-8\"</code> เสมอ" },
          { h: "วิธีอ่านไฟล์ 3 แบบ", p: "<b>read()</b> อ่านทั้งไฟล์เป็นข้อความเดียว • <b>readline()</b> อ่านทีละบรรทัด • <b>readlines()</b> อ่านทุกบรรทัดเป็นลิสต์ — วิธีที่ประหยัดหน่วยความจำที่สุดคือวน for ตรงๆ กับไฟล์ เพราะไม่ต้องโหลดทั้งไฟล์เข้าหน่วยความจำพร้อมกัน", code: "with open(\"data.txt\", encoding=\"utf-8\") as f:\n    for line in f:\n        print(line.strip())" },
          { h: "ไฟล์ CSV", p: "CSV คือไฟล์ตารางที่คั่นคอลัมน์ด้วยจุลภาค เปิดได้ใน Excel — ใช้โมดูล <b>csv</b>: <code>csv.reader</code> อ่านเป็นลิสต์ทีละแถว, <code>csv.DictReader</code> อ่านเป็น dict โดยใช้แถวแรกเป็นชื่อคอลัมน์ (อ่านง่ายกว่ามาก), <code>csv.writer</code> เขียนไฟล์", code: "import csv\nwith open(\"students.csv\", encoding=\"utf-8\") as f:\n    for row in csv.DictReader(f):\n        print(row[\"name\"], row[\"score\"])" },
          { h: "🖥️ ระบบไฟล์เสมือนในเกมนี้", p: "ด่านในหัวข้อนี้รันบน<b>ระบบไฟล์เสมือน</b>ในเบราว์เซอร์ — สร้าง อ่าน เขียนไฟล์ได้จริงทุกคำสั่งเหมือนบนเครื่องคอมพิวเตอร์ บางด่านระบบจะเตรียมไฟล์ตั้งต้นไว้ให้ (ดูชื่อไฟล์ในโจทย์) ไฟล์จะหายไปเมื่อรันใหม่ จึงไม่ต้องกลัวทำเครื่องพัง" }
        ],
        stages: [
          { title: "เขียนไฟล์แรก", desc: "เปิดไฟล์ด้วยโหมด \"w\" แล้วเขียนข้อความลงไป จากนั้นเปิดอ่านกลับมาพิมพ์ เพื่อยืนยันว่าเขียนสำเร็จจริง", goal: 'เขียนข้อความ <b>สวัสดีไฟล์</b> ลงไฟล์ <b>note.txt</b> แล้วอ่านกลับมาแสดงผล', starter: "# เขียนไฟล์ด้วยโหมด \"w\" แล้วอ่านกลับมาแสดง\n", hint: '<code>open("note.txt", "w", encoding="utf-8").write("สวัสดีไฟล์")</code> แล้ว <code>print(open("note.txt", encoding="utf-8").read())</code>', xp: 60, check: (out, code) => eq(out, "สวัสดีไฟล์") && /open\(/.test(code) && /["']w["']/.test(code) },
          { title: "นับบรรทัดในไฟล์", files: { "fruits.txt": "แอปเปิล\nกล้วย\nส้ม\nมะม่วง\n" }, desc: "ระบบเตรียมไฟล์ fruits.txt ไว้ให้แล้ว (ผลไม้บรรทัดละชนิด) อ่านแล้วนับว่ามีกี่บรรทัด", goal: 'อ่านไฟล์ <b>fruits.txt</b> แล้วแสดงจำนวนบรรทัด (ต้องได้ <b>4</b>)', starter: "# อ่านไฟล์ fruits.txt แล้วนับจำนวนบรรทัด\n", hint: '<code>lines = open("fruits.txt", encoding="utf-8").readlines()</code> แล้ว <code>print(len(lines))</code>', xp: 60, check: (out, code) => eq(out, "4") && /fruits\.txt/.test(code) },
          { title: "เปิดไฟล์อย่างปลอดภัยด้วย with", files: { "score.txt": "85" }, desc: "with ปิดไฟล์ให้อัตโนมัติแม้เกิดข้อผิดพลาดกลางทาง — วิธีที่นักพัฒนามืออาชีพใช้ทุกครั้ง", goal: 'ใช้ <b>with open</b> อ่านคะแนนจาก <b>score.txt</b> แล้วแสดงคะแนนที่บวกเพิ่ม 10 (ต้องได้ <b>95</b>)', starter: "# ใช้ with open(...) as f: อ่านคะแนน\n", hint: '<code>with open("score.txt", encoding="utf-8") as f:</code> แล้ว <code>print(int(f.read()) + 10)</code>', xp: 70, check: (out, code) => eq(out, "95") && /with\s+open/.test(code) },
          { title: "เขียนต่อท้ายด้วยโหมด a", files: { "log.txt": "เริ่มระบบ\n" }, desc: "โหมด \"a\" เพิ่มข้อความต่อท้ายโดยไม่ลบของเดิม (ถ้าใช้ \"w\" ของเดิมจะหายหมด!) — ใช้ทำไฟล์บันทึกเหตุการณ์", goal: 'เพิ่มบรรทัด <b>บันทึกสำเร็จ</b> ต่อท้าย <b>log.txt</b> แล้วแสดงทุกบรรทัดในไฟล์ (ต้องได้ <b>เริ่มระบบ</b> แล้ว <b>บันทึกสำเร็จ</b>)', starter: "# เปิด log.txt ด้วยโหมด \"a\" แล้วเขียนต่อท้าย\n", hint: '<code>with open("log.txt", "a", encoding="utf-8") as f: f.write("บันทึกสำเร็จ\\n")</code> แล้วอ่านทั้งไฟล์มาพิมพ์', xp: 70, check: (out, code) => lines(out).join(",") === "เริ่มระบบ,บันทึกสำเร็จ" && /["']a["']/.test(code) },
          { title: "หาค่าเฉลี่ยจากไฟล์ CSV", files: { "students.csv": "name,score\nมะลิ,80\nฟ้า,92\nใบเตย,86\n" }, desc: "งานจริงที่เจอบ่อย: อ่านข้อมูลตารางจากไฟล์ CSV แล้วคำนวณสถิติ — ใช้ csv.DictReader อ่านง่ายที่สุด", goal: 'อ่าน <b>students.csv</b> ด้วยโมดูล <b>csv</b> แล้วแสดงคะแนนเฉลี่ย (ต้องได้ <b>86.0</b>)', starter: "import csv\n\n", hint: 'วน <code>for row in csv.DictReader(f):</code> เก็บ <code>int(row["score"])</code> ลงลิสต์ แล้ว <code>print(sum(s) / len(s))</code>', xp: 90, check: (out, code) => eq(out, "86.0") && /import\s+csv/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "โหมดใดลบเนื้อหาเดิมทิ้งทั้งหมดก่อนเขียน", c: ["\"r\"", "\"w\"", "\"a\"", "\"x\""], a: 1, e: "\"w\" เขียนทับ ถ้าต้องการเก็บของเดิมไว้ให้ใช้ \"a\"" },
              { t: "tf", q: "การเปิดไฟล์ด้วย with จะปิดไฟล์ให้อัตโนมัติเมื่อจบบล็อก", a: true, e: "แม้เกิดข้อผิดพลาดกลางบล็อก ไฟล์ก็ยังถูกปิดอย่างถูกต้อง" },
              { t: "fill", q: "เมท็อดที่อ่านทุกบรรทัดของไฟล์ออกมาเป็นลิสต์คือ .___()", a: ["readlines"], e: "read() อ่านทั้งไฟล์เป็นข้อความ readline() อ่านทีละบรรทัด" },
              { t: "mc", q: "การเปิดไฟล์ภาษาไทยควรกำหนดอะไรเพิ่ม", c: ["mode=\"th\"", "encoding=\"utf-8\"", "lang=\"th\"", "charset=thai"], a: 1, e: "ป้องกันตัวอักษรเพี้ยนเมื่อเปิดบนเครื่องต่างระบบ" },
              { t: "order", q: "เรียงขั้นตอนการทำงานกับไฟล์แบบดั้งเดิม (ไม่ใช้ with)", items: ["open() เปิดไฟล์", "read() หรือ write()", "close() ปิดไฟล์"], e: "ถ้าลืม close() ข้อมูลอาจเขียนไม่ครบ — นี่คือเหตุผลที่ควรใช้ with" }
            ]
          }
        ]
      },
      {
        id: "gui", icon: "operator", title: "บทที่ 13: สร้าง GUI ด้วย Tkinter",
        blurb: "สร้างหน้าต่างโปรแกรมจริงบนเครื่องเสมือน Tkinter — กดปุ่มและพิมพ์ได้จริง",
        lesson: [
          { h: "รู้จัก Tkinter", p: "<b>Tkinter</b> คือไลบรารีสร้างหน้าต่างโปรแกรม (GUI) ที่มากับ Python — สร้างหน้าต่างด้วย <code>Tk()</code> และแสดงด้วย <code>mainloop()</code> ส่วน <b>ttk</b> คือ widget รุ่นใหม่ที่สวยกว่า", code: "import tkinter as tk\nwin = tk.Tk()\nwin.title(\"โปรแกรมแรก\")\nwin.mainloop()" },
          { h: "Widget พื้นฐาน", p: "<b>Label</b> ข้อความ • <b>Button</b> ปุ่ม • <b>Entry</b> ช่องกรอก • <b>Text</b> กล่องข้อความหลายบรรทัด • <b>Checkbutton/Radiobutton</b> ตัวเลือก — แต่ละ widget มี option ปรับสี ขนาด ฟอนต์ได้", code: "label = tk.Label(win, text=\"สวัสดี\")\nbtn = tk.Button(win, text=\"กดฉัน\")\nlabel.pack()\nbtn.pack()" },
          { h: "การจัดวาง (Layout)", p: "3 วิธีจัดวาง widget: <b>pack()</b> เรียงต่อกัน • <b>grid()</b> จัดเป็นตารางแถว-คอลัมน์ • <b>place()</b> ระบุพิกัดเอง — และผูกเหตุการณ์ปุ่มด้วย command หรือ bind()" },
          { h: "Event-driven Programming", p: "โปรแกรม GUI ทำงานต่างจากโปรแกรมทั่วไป: แทนที่จะทำจากบนลงล่างแล้วจบ มันจะ<b>รอเหตุการณ์</b> (คลิก พิมพ์ เลื่อนเมาส์) แล้วเรียกฟังก์ชันที่ผูกไว้ — <code>mainloop()</code> คือวงรอบที่คอยฟังเหตุการณ์ตลอดเวลาจนกว่าจะปิดหน้าต่าง จึงต้องเป็นบรรทัดสุดท้ายเสมอ" },
          { h: "ผูกปุ่มกับฟังก์ชัน", p: "ใส่ชื่อฟังก์ชันใน <code>command=</code> <b>โดยไม่ใส่วงเล็บ</b> — ถ้าใส่ <code>command=hello()</code> ฟังก์ชันจะทำงานทันทีตอนสร้างปุ่ม แทนที่จะรอให้กด นี่คือบั๊กอันดับหนึ่งของมือใหม่!", code: "def hello():\n    label.config(text=\"สวัสดี!\")\n\nbtn = tk.Button(root, text=\"กด\", command=hello)  # ไม่มีวงเล็บ" },
          { h: "อ่านและเปลี่ยนค่า widget", p: "<b>entry.get()</b> อ่านข้อความที่ผู้ใช้พิมพ์ • <b>label.config(text=...)</b> เปลี่ยนข้อความ • <b>StringVar</b> ผูกตัวแปรกับ widget ให้อัปเดตอัตโนมัติ • <b>messagebox.showinfo(หัวเรื่อง, ข้อความ)</b> แสดงป๊อปอัป" },
          { h: "pack vs grid vs place", p: "<b>pack()</b> เรียงต่อกันง่ายที่สุด เหมาะกับหน้าต่างเรียบง่าย • <b>grid(row, column)</b> จัดเป็นตาราง เหมาะกับฟอร์มที่มีป้ายคู่ช่องกรอก • <b>place(x, y)</b> ระบุพิกัดเอง แม่นยำแต่ไม่ยืดหยุ่นเมื่อขยายหน้าต่าง — <b>ห้ามใช้ pack กับ grid ปนกันในกล่องแม่เดียวกัน</b> โปรแกรมจะค้าง" },
          { h: "🖥️ เครื่องเสมือน Tkinter ในเกมนี้", p: "เบราว์เซอร์เปิดหน้าต่าง Tkinter จริงไม่ได้ เกมนี้จึงมี<b>เครื่องเสมือน</b>ที่จำลอง Tkinter ขึ้นมา — เขียนโค้ดเหมือนบนเครื่องจริงทุกประการ แล้วหน้าต่างโปรแกรมจะปรากฏในกล่องด้านล่าง <b>กดปุ่มและพิมพ์ในช่องกรอกได้จริง</b> ตอนตรวจคำตอบ ระบบจะพิมพ์/กดปุ่มตามโจทย์ให้อัตโนมัติ" }
        ],
        stages: [
          { gui: true, title: "หน้าต่างแรก", desc: "ทุกโปรแกรม GUI เริ่มจากสร้างหน้าต่างหลักด้วย Tk() ตั้งชื่อ แล้วปิดท้ายด้วย mainloop() — หน้าต่างจะโผล่ในเครื่องเสมือนด้านล่าง", goal: 'สร้างหน้าต่างที่มีชื่อ <b>โปรแกรมแรกของฉัน</b> และขนาด <b>300x200</b>', starter: "import tkinter as tk\n\nroot = tk.Tk()\n# ตั้งชื่อและขนาดหน้าต่าง\n\nroot.mainloop()\n", hint: '<code>root.title("โปรแกรมแรกของฉัน")</code> และ <code>root.geometry("300x200")</code>', xp: 60, check: (o, c, g) => VM.title(g) === "โปรแกรมแรกของฉัน" && g.windows[0].geometry === "300x200" },
          { gui: true, title: "ป้ายข้อความ Label", desc: "Label แสดงข้อความในหน้าต่าง — สร้างแล้วต้องเรียก pack() เสมอ ไม่งั้นจะไม่ปรากฏ!", goal: 'เพิ่ม Label ข้อความ <b>สวัสดี Tkinter</b> ตัวอักษรขนาด 18 แล้ววางด้วย <b>pack()</b>', starter: "import tkinter as tk\n\nroot = tk.Tk()\nroot.title(\"ทักทาย\")\n# สร้าง Label แล้ว pack\n\nroot.mainloop()\n", hint: '<code>tk.Label(root, text="สวัสดี Tkinter", font=("Arial", 18)).pack()</code>', xp: 60, check: (o, c, g) => VM.placed(g, "Label").some(w => w.text === "สวัสดี Tkinter") && /font/.test(c) },
          { gui: true, vmClick: "กดฉัน", title: "ปุ่มที่ทำงานได้", desc: "ผูกฟังก์ชันกับปุ่มด้วย command= (ห้ามใส่วงเล็บหลังชื่อฟังก์ชัน!) — ตอนตรวจคำตอบระบบจะกดปุ่มให้ 1 ครั้ง และคุณกดเองในหน้าต่างเสมือนได้ด้วย", goal: 'เมื่อกดปุ่ม <b>กดฉัน</b> ให้ Label เปลี่ยนข้อความเป็น <b>ถูกกดแล้ว!</b>', starter: "import tkinter as tk\n\ndef on_click():\n    # เปลี่ยนข้อความของ label\n    pass\n\nroot = tk.Tk()\nlabel = tk.Label(root, text=\"ยังไม่ได้กด\")\nlabel.pack()\n# สร้างปุ่ม \"กดฉัน\" ที่เรียก on_click\n\nroot.mainloop()\n", hint: 'ในฟังก์ชัน: <code>label.config(text="ถูกกดแล้ว!")</code> และสร้างปุ่ม <code>tk.Button(root, text="กดฉัน", command=on_click).pack()</code>', xp: 80, check: (o, c, g) => VM.widgets(g, "Label").some(w => w.text === "ถูกกดแล้ว!") && VM.placed(g, "Button").some(w => w.text === "กดฉัน" && w.hasCommand) },
          { gui: true, vmInput: "มะลิ", vmClick: "ทักทาย", title: "รับข้อมูลจากช่องกรอก", desc: "Entry รับข้อความจากผู้ใช้ อ่านค่าด้วย .get() — ระบบจะพิมพ์คำว่า มะลิ ลงช่องกรอกแล้วกดปุ่มให้ตอนตรวจ", goal: 'เมื่อกดปุ่ม <b>ทักทาย</b> ให้ Label แสดง <b>สวัสดี</b> ตามด้วยชื่อที่พิมพ์ (เช่น <b>สวัสดี มะลิ</b>)', starter: "import tkinter as tk\n\nroot = tk.Tk()\nentry = tk.Entry(root)\nentry.pack()\nresult = tk.Label(root, text=\"\")\nresult.pack()\n# สร้างฟังก์ชันและปุ่ม \"ทักทาย\"\n\nroot.mainloop()\n", hint: '<code>def greet(): result.config(text="สวัสดี " + entry.get())</code>', xp: 80, check: (o, c, g) => VM.widgets(g, "Label").some(w => w.text === "สวัสดี มะลิ") && /\.get\(\)/.test(c) },
          { gui: true, title: "จัดฟอร์มด้วย grid", desc: "grid จัด widget เป็นตาราง แถว (row) และคอลัมน์ (column) — เหมาะกับฟอร์มที่มีป้ายคู่ช่องกรอก", goal: 'สร้างฟอร์ม 2 แถวด้วย <b>grid</b>: แถว 0 มี Label <b>ชื่อ</b> + Entry, แถว 1 มี Label <b>อายุ</b> + Entry (Label อยู่คอลัมน์ 0, Entry อยู่คอลัมน์ 1)', starter: "import tkinter as tk\n\nroot = tk.Tk()\nroot.title(\"ฟอร์มสมาชิก\")\n# วาง Label และ Entry ด้วย grid(row=..., column=...)\n\nroot.mainloop()\n", hint: '<code>tk.Label(root, text="ชื่อ").grid(row=0, column=0)</code> และ <code>tk.Entry(root).grid(row=0, column=1)</code>', xp: 80, check: (o, c, g) => { const L = VM.placed(g, "Label"), E = VM.placed(g, "Entry"); const lb = t => L.find(w => w.text === t); return !!lb("ชื่อ") && !!lb("อายุ") && lb("ชื่อ").layout.manager === "grid" && lb("อายุ").layout.row === "1" && E.length >= 2 && E.every(e => e.layout.manager === "grid" && e.layout.column === "1"); } },
          { gui: true, title: "รายการด้วย Listbox", desc: "Listbox แสดงรายการหลายบรรทัดให้ผู้ใช้เลือก เพิ่มรายการด้วย insert(tk.END, ...)", goal: 'สร้าง Listbox ที่มี 3 รายการ: <b>กาแฟ</b>, <b>ชาเย็น</b>, <b>โกโก้</b>', starter: "import tkinter as tk\n\nroot = tk.Tk()\nroot.title(\"เมนูเครื่องดื่ม\")\n\nroot.mainloop()\n", hint: '<code>lb = tk.Listbox(root)</code> แล้ว <code>lb.insert(tk.END, "กาแฟ", "ชาเย็น", "โกโก้")</code> และ <code>lb.pack()</code>', xp: 70, check: (o, c, g) => { const lb = VM.placed(g, "Listbox")[0]; return !!lb && (lb.items || []).join(",") === "กาแฟ,ชาเย็น,โกโก้"; } },
          { gui: true, vmClick: "บันทึก", title: "ป๊อปอัปแจ้งเตือน", desc: "messagebox แสดงหน้าต่างข้อความเด้งขึ้นมา — ใช้แจ้งผลการทำงานให้ผู้ใช้ทราบ", goal: 'เมื่อกดปุ่ม <b>บันทึก</b> ให้แสดง <b>messagebox.showinfo</b> หัวเรื่อง <b>สำเร็จ</b> ข้อความ <b>บันทึกข้อมูลแล้ว</b>', starter: "import tkinter as tk\nfrom tkinter import messagebox\n\nroot = tk.Tk()\n# สร้างฟังก์ชันและปุ่ม \"บันทึก\"\n\nroot.mainloop()\n", hint: '<code>def save(): messagebox.showinfo("สำเร็จ", "บันทึกข้อมูลแล้ว")</code>', xp: 80, check: (o, c, g) => (g.messages || []).some(m => m.kind === "showinfo" && m.title === "สำเร็จ" && m.message === "บันทึกข้อมูลแล้ว") },
          { gui: true, vmClick: "+1", title: "บอสหน่วย: แอปนับคะแนน", desc: "รวมทุกอย่าง: หน้าต่าง Label ปุ่ม และตัวแปรสถานะที่อัปเดตทุกครั้งที่กด (ใช้ global หรือ IntVar ก็ได้)", goal: 'สร้างแอปชื่อ <b>ตัวนับคะแนน</b> มี Label เริ่มต้น <b>คะแนน: 0</b> และปุ่ม <b>+1</b> ที่กดแล้ว Label เพิ่มทีละ 1 (ระบบกด 1 ครั้ง ต้องได้ <b>คะแนน: 1</b>)', starter: "import tkinter as tk\n\n", hint: 'เก็บ <code>score = 0</code> ในฟังก์ชันใช้ <code>global score; score += 1; label.config(text=f"คะแนน: {score}")</code>', xp: 100, check: (o, c, g) => VM.title(g) === "ตัวนับคะแนน" && VM.widgets(g, "Label").some(w => w.text === "คะแนน: 1") && VM.placed(g, "Button").some(w => w.text === "+1") },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "บรรทัดใดต้องอยู่ท้ายสุดของโปรแกรม Tkinter เสมอ", c: ["root.title()", "root.mainloop()", "import tkinter", "root.geometry()"], a: 1, e: "mainloop() คือวงรอบคอยฟังเหตุการณ์ โค้ดหลังจากนี้จะทำงานก็ต่อเมื่อปิดหน้าต่างแล้ว" },
              { t: "tf", q: "<code>command=hello()</code> (มีวงเล็บ) คือวิธีผูกปุ่มที่ถูกต้อง", a: false, e: "ต้องใส่แค่ชื่อฟังก์ชัน command=hello ถ้ามีวงเล็บฟังก์ชันจะทำงานทันทีตอนสร้างปุ่ม" },
              { t: "fill", q: "เมท็อดที่อ่านข้อความจากช่อง Entry คือ .___()", a: ["get"], e: "entry.get() คืนข้อความที่ผู้ใช้พิมพ์" },
              { t: "mc", q: "ตัวจัดวางใดเหมาะกับฟอร์มที่มีป้ายคู่ช่องกรอกหลายแถว", c: ["pack", "grid", "place", "stack"], a: 1, e: "grid จัดเป็นแถวและคอลัมน์" },
              { t: "mc", q: "ข้อใดทำให้โปรแกรม Tkinter ค้าง", c: ["ใช้ Label หลายตัว", "ใช้ pack กับ grid ปนกันในกล่องแม่เดียวกัน", "ตั้งชื่อหน้าต่างภาษาไทย", "ใช้ messagebox"], a: 1, e: "ตัวจัดวางสองแบบจะแย่งกันคำนวณตำแหน่งไม่รู้จบ" }
            ]
          }
        ]
      },
      {
        id: "database", icon: "datastructure", title: "บทที่ 14-15: ฐานข้อมูล (MariaDB/MongoDB)",
        blurb: "ฝึกคำสั่ง SQL จริงบนฐานข้อมูลเสมือน SQLite พร้อมทฤษฎี MariaDB/MongoDB",
        lesson: [
          { h: "ฐานข้อมูลและ DBMS", p: "<b>ฐานข้อมูล</b> คือที่เก็บข้อมูลอย่างเป็นระบบ <b>DBMS</b> คือโปรแกรมจัดการฐานข้อมูล — แบ่งเป็น <b>SQL</b> (ตาราง เช่น MariaDB/MySQL) และ <b>NoSQL</b> (เอกสาร เช่น MongoDB)" },
          { h: "เชื่อมต่อ MariaDB", p: "Python เชื่อม MariaDB ด้วยโมดูล <b>pymysql</b> — เชื่อมต่อ, ส่งคำสั่ง SQL (INSERT/SELECT/UPDATE/DELETE), และดึงผลลัพธ์ด้วย fetchall()", code: "import pymysql\nconn = pymysql.connect(host=\"localhost\",\n    user=\"root\", database=\"game\")\ncur = conn.cursor()\ncur.execute(\"SELECT * FROM players\")\nprint(cur.fetchall())" },
          { h: "MongoDB (NoSQL)", p: "MongoDB เก็บข้อมูลเป็น<b>เอกสาร (document)</b> คล้าย dict ของ Python — เชื่อมด้วยโมดูล <b>pymongo</b> จัดการด้วย insert_one(), find(), update_one(), delete_one()", code: "from pymongo import MongoClient\nclient = MongoClient(\"localhost\", 27017)\ndb = client.game\ndb.players.insert_one({\"name\": \"มะลิ\", \"hp\": 100})" },
          { h: "ภาษา SQL พื้นฐาน (CRUD)", p: "งานฐานข้อมูลทั้งหมดสรุปได้ 4 อย่าง เรียกว่า <b>CRUD</b>: <b>C</b>reate = <code>INSERT</code> เพิ่ม • <b>R</b>ead = <code>SELECT</code> อ่าน • <b>U</b>pdate = <code>UPDATE</code> แก้ไข • <b>D</b>elete = <code>DELETE</code> ลบ — และสร้างตารางด้วย <code>CREATE TABLE</code>", code: "CREATE TABLE students (name TEXT, score INTEGER);\nINSERT INTO students VALUES ('มะลิ', 80);\nSELECT name FROM students WHERE score >= 70;\nUPDATE students SET score = 90 WHERE name = 'มะลิ';\nDELETE FROM students WHERE score < 50;" },
          { h: "⚠️ อย่าลืม WHERE และ SQL Injection", p: "<code>UPDATE</code> หรือ <code>DELETE</code> ที่<b>ลืม WHERE</b> จะแก้/ลบ<b>ทุกแถว</b>ในตาราง! • ห้ามเอาข้อมูลจากผู้ใช้ต่อสตริงเข้า SQL ตรงๆ เพราะผู้ไม่หวังดีจะแทรกคำสั่งอันตรายได้ (<b>SQL Injection</b>) — ให้ใช้เครื่องหมาย <code>?</code> เป็นตัวแทน แล้วส่งค่าแยกเป็น tuple", code: "# อันตราย!\ncur.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")\n# ปลอดภัย\ncur.execute(\"SELECT * FROM users WHERE name = ?\", (name,))" },
          { h: "ขั้นตอนใช้ฐานข้อมูลใน Python", p: "1) <code>connect()</code> เชื่อมต่อ → 2) <code>cursor()</code> สร้างตัวชี้ → 3) <code>execute()</code> ส่งคำสั่ง SQL → 4) <code>fetchall()/fetchone()</code> ดึงผลลัพธ์ → 5) <code>commit()</code> ยืนยันการเปลี่ยนแปลง → 6) <code>close()</code> ปิดการเชื่อมต่อ — ขั้นตอนนี้เหมือนกันทั้ง SQLite, MariaDB (pymysql) และ PostgreSQL" },
          { h: "🖥️ ฐานข้อมูลเสมือน SQLite", p: "<b>SQLite</b> คือฐานข้อมูลที่เก็บทั้งหมดในไฟล์เดียว ไม่ต้องติดตั้งเซิร์ฟเวอร์ มากับ Python อยู่แล้ว (โมดูล <code>sqlite3</code>) และใช้ภาษา SQL ชุดเดียวกับ MariaDB/MySQL — ในเกมนี้ใช้ <code>sqlite3.connect(\":memory:\")</code> สร้างฐานข้อมูลในหน่วยความจำ ฝึกคำสั่ง SQL ได้จริงทุกคำสั่ง แล้วนำไปใช้กับ MariaDB ได้ทันที" }
        ],
        stages: [
          { title: "สร้างตารางและเพิ่มข้อมูล", desc: "ขั้นตอนมาตรฐาน: connect → cursor → execute(CREATE TABLE) → execute(INSERT) → นับแถวด้วย SELECT COUNT(*)", goal: 'สร้างตาราง <b>students (name TEXT, score INTEGER)</b> เพิ่มข้อมูล 2 แถว แล้วแสดงจำนวนแถว (ต้องได้ <b>2</b>)', starter: "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ncur = con.cursor()\n# สร้างตาราง เพิ่ม 2 แถว แล้วนับจำนวน\n", hint: '<code>cur.execute("CREATE TABLE students (name TEXT, score INTEGER)")</code> แล้ว INSERT สองครั้ง จากนั้น <code>print(cur.execute("SELECT COUNT(*) FROM students").fetchone()[0])</code>', xp: 70, check: (out, code) => eq(out, "2") && /CREATE\s+TABLE/i.test(code) && /INSERT/i.test(code) },
          { title: "ค้นหาด้วย SELECT ... WHERE", desc: "WHERE กรองเฉพาะแถวที่ต้องการ ORDER BY เรียงลำดับ — คำสั่งที่ใช้บ่อยที่สุดในงานฐานข้อมูล", goal: 'จากตารางที่เตรียมไว้ แสดงชื่อนักเรียนที่คะแนน <b>≥ 70</b> เรียงจากคะแนน<b>มากไปน้อย</b> (ต้องได้ <b>ฟ้า</b> แล้ว <b>มะลิ</b>)', starter: "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ncur = con.cursor()\ncur.execute(\"CREATE TABLE students (name TEXT, score INTEGER)\")\ncur.executemany(\"INSERT INTO students VALUES (?, ?)\", [(\"มะลิ\", 80), (\"ฟ้า\", 92), (\"ใบเตย\", 65)])\n# SELECT ... WHERE ... ORDER BY ...\n", hint: '<code>for row in cur.execute("SELECT name FROM students WHERE score >= 70 ORDER BY score DESC"): print(row[0])</code>', xp: 80, check: (out, code) => lines(out).join(",") === "ฟ้า,มะลิ" && /WHERE/i.test(code) && /ORDER\s+BY/i.test(code) },
          { title: "แก้ไขข้อมูลด้วย UPDATE", desc: "UPDATE ต้องมี WHERE เสมอ ไม่งั้นจะแก้ทุกแถวในตาราง! และอย่าลืม commit() เพื่อยืนยันการเปลี่ยนแปลง", goal: 'แก้คะแนนของ <b>มะลิ</b> เป็น <b>95</b> ด้วย UPDATE แล้ว SELECT คะแนนของมะลิมาแสดง (ต้องได้ <b>95</b>)', starter: "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ncur = con.cursor()\ncur.execute(\"CREATE TABLE students (name TEXT, score INTEGER)\")\ncur.executemany(\"INSERT INTO students VALUES (?, ?)\", [(\"มะลิ\", 80), (\"ฟ้า\", 92)])\n", hint: '<code>cur.execute("UPDATE students SET score = 95 WHERE name = ?", ("มะลิ",))</code> แล้ว <code>con.commit()</code>', xp: 80, check: (out, code) => eq(out, "95") && /UPDATE/i.test(code) && /WHERE/i.test(code) },
          { title: "ลบข้อมูลด้วย DELETE", desc: "ลบเฉพาะแถวที่ตรงเงื่อนไข แล้วนับจำนวนที่เหลือเพื่อยืนยัน", goal: 'ลบนักเรียนที่คะแนน <b>ต่ำกว่า 70</b> แล้วแสดงจำนวนแถวที่เหลือ (ต้องได้ <b>2</b>)', starter: "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ncur = con.cursor()\ncur.execute(\"CREATE TABLE students (name TEXT, score INTEGER)\")\ncur.executemany(\"INSERT INTO students VALUES (?, ?)\", [(\"มะลิ\", 80), (\"ฟ้า\", 92), (\"ใบเตย\", 65)])\n", hint: '<code>cur.execute("DELETE FROM students WHERE score < 70")</code> แล้วนับด้วย <code>SELECT COUNT(*)</code>', xp: 80, check: (out, code) => eq(out, "2") && /DELETE/i.test(code) && /WHERE/i.test(code) },
          { title: "ป้องกัน SQL Injection ด้วย ?", desc: "เมื่อค่ามาจากผู้ใช้ ห้ามต่อสตริงเข้า SQL ให้ใช้ ? เป็นตัวแทนแล้วส่งค่าแยก — แนวปฏิบัติด้านความปลอดภัยที่สำคัญที่สุด", goal: 'เพิ่มสินค้าจากตัวแปร <b>name</b> และ <b>price</b> ด้วย <b>?</b> (placeholder) แล้วค้นหาราคาของ <b>กาแฟ</b> ด้วย ? อีกครั้ง แสดงราคา (ต้องได้ <b>50</b>)', starter: "import sqlite3\n\ncon = sqlite3.connect(\":memory:\")\ncur = con.cursor()\ncur.execute(\"CREATE TABLE products (name TEXT, price INTEGER)\")\nname, price = \"กาแฟ\", 50\n", hint: '<code>cur.execute("INSERT INTO products VALUES (?, ?)", (name, price))</code> และ <code>cur.execute("SELECT price FROM products WHERE name = ?", ("กาแฟ",))</code>', xp: 90, check: (out, code) => eq(out, "50") && (code.match(/\?/g) || []).length >= 3 && !/\+\s*name/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "order", q: "เรียงขั้นตอนการใช้ฐานข้อมูลใน Python", items: ["connect() เชื่อมต่อ", "cursor() สร้างตัวชี้", "execute() ส่งคำสั่ง SQL", "commit() ยืนยันการเปลี่ยนแปลง", "close() ปิดการเชื่อมต่อ"], e: "ขั้นตอนเหมือนกันทั้ง SQLite, MariaDB และ PostgreSQL" },
              { t: "mc", q: "คำสั่ง SQL ใดใช้อ่านข้อมูล", c: ["INSERT", "SELECT", "UPDATE", "DELETE"], a: 1, e: "SELECT คือ R (Read) ใน CRUD" },
              { t: "tf", q: "<code>DELETE FROM students</code> ที่ไม่มี WHERE จะลบทุกแถวในตาราง", a: true, e: "ต้องระวังมาก ตรวจ WHERE ทุกครั้งก่อนรัน UPDATE/DELETE" },
              { t: "fill", q: "เครื่องหมายที่ใช้เป็นตัวแทนค่าเพื่อป้องกัน SQL Injection ใน sqlite3 คือ ___", a: ["?"], e: "เช่น WHERE name = ? แล้วส่งค่าเป็น tuple" },
              { t: "mc", q: "MongoDB ต่างจาก MariaDB อย่างไร", c: ["MongoDB เป็น SQL", "MongoDB เก็บข้อมูลเป็นเอกสาร (document) แบบ NoSQL", "MongoDB ใช้ได้เฉพาะ Windows", "ไม่ต่างกัน"], a: 1, e: "MariaDB เก็บเป็นตาราง (SQL) MongoDB เก็บเป็นเอกสารคล้าย dict (NoSQL)" }
            ]
          }
        ]
      },
      {
        id: "webapp", icon: "operator", title: "บทที่ 16-17: เว็บแอปฯ (Django) และ Web Scraping",
        blurb: "สถาปัตยกรรม Django และฝึกแกะข้อมูลจาก HTML แบบ Web Scraping",
        lesson: [
          { h: "Django MVT Architecture", p: "<b>Django</b> คือเฟรมเวิร์กสร้างเว็บด้วย Python ใช้สถาปัตยกรรม <b>MVT</b>: <b>Model</b> (ข้อมูล/ฐานข้อมูล), <b>View</b> (ตรรกะ), <b>Template</b> (หน้าเว็บ HTML) — สร้างโปรเจกต์ด้วย django-admin startproject" },
          { h: "โครงสร้างโปรเจกต์", p: "แบ่งเว็บเป็น <b>Apps</b> ย่อยๆ แต่ละแอปมี models, views, templates, urls — รันเซิร์ฟเวอร์ทดสอบด้วย <code>python manage.py runserver</code>", code: "# views.py\nfrom django.shortcuts import render\ndef home(request):\n    return render(request, \"home.html\")" },
          { h: "Web Scraping", p: "การดึงข้อมูลจากเว็บด้วย <b>BeautifulSoup</b> (แกะ HTML) และ <b>Requests</b> (โหลดหน้าเว็บ) หรือ <b>Selenium</b> (ควบคุมเบราว์เซอร์) — ควรเคารพไฟล์ robots.txt และกฎหมายลิขสิทธิ์", code: "import requests\nfrom bs4 import BeautifulSoup\nr = requests.get(\"https://example.com\")\nsoup = BeautifulSoup(r.text, \"html.parser\")\nprint(soup.title.text)" },
          { h: "เว็บทำงานอย่างไร", p: "เบราว์เซอร์ (Client) ส่ง<b>คำขอ (Request)</b> ไปยังเซิร์ฟเวอร์ → เซิร์ฟเวอร์ประมวลผล (เช่น โค้ด Django ดึงข้อมูลจากฐานข้อมูล) → ส่ง<b>คำตอบ (Response)</b> กลับมาเป็น HTML → เบราว์เซอร์แสดงผล — ทุกครั้งที่คลิกลิงก์คือวงจรนี้หนึ่งรอบ" },
          { h: "ไฟล์สำคัญในโปรเจกต์ Django", p: "<b>models.py</b> กำหนดโครงสร้างข้อมูล (แปลงเป็นตารางอัตโนมัติด้วย ORM ไม่ต้องเขียน SQL เอง) • <b>views.py</b> ตรรกะที่รับคำขอและส่งคำตอบ • <b>urls.py</b> จับคู่ URL กับ view • <b>templates/</b> ไฟล์ HTML ที่แทรกข้อมูลด้วย <code>{{ ตัวแปร }}</code> • <b>admin.py</b> หน้าจัดการข้อมูลสำเร็จรูป", code: "# urls.py\npath(\"products/\", views.product_list)\n\n# views.py\ndef product_list(request):\n    items = Product.objects.all()\n    return render(request, \"list.html\", {\"items\": items})" },
          { h: "Web Scraping อย่างมีจริยธรรม", p: "ก่อนดึงข้อมูลจากเว็บใดๆ ให้: 1) ตรวจไฟล์ <b>robots.txt</b> ของเว็บนั้นว่าอนุญาตไหม 2) อ่านข้อกำหนดการใช้งาน 3) ไม่ส่งคำขอถี่จนเซิร์ฟเวอร์เขาล่ม (ใส่ time.sleep) 4) ไม่ดึงข้อมูลส่วนบุคคลหรือเนื้อหาที่มีลิขสิทธิ์ไปเผยแพร่ — การแกะโครงสร้าง HTML ใช้ BeautifulSoup หรือ <code>html.parser</code> ที่มากับ Python" }
        ],
        stages: [
          { title: "แกะหัวเรื่องจาก HTML", desc: "หัวใจของ Web Scraping คือการแกะโครงสร้าง HTML — ใช้ HTMLParser ที่มากับ Python ดักข้อความระหว่างแท็ก title (ในงานจริงข้อความ HTML จะได้มาจาก requests.get)", goal: 'จาก HTML ที่ให้มา ดึงข้อความในแท็ก <b>&lt;title&gt;</b> ออกมาแสดง (ต้องได้ <b>ร้านกาแฟมะลิ</b>)', starter: "from html.parser import HTMLParser\n\nhtml = \"<html><head><title>ร้านกาแฟมะลิ</title></head><body><h1>เมนู</h1></body></html>\"\n\nclass TitleParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.in_title = False\n        self.title = \"\"\n    # เขียน handle_starttag, handle_endtag, handle_data\n\n", hint: 'ใน handle_starttag ถ้า tag == "title" ให้ in_title = True, ใน handle_data ถ้า in_title ให้ต่อข้อความ แล้ว <code>p = TitleParser(); p.feed(html); print(p.title)</code>', xp: 90, check: (out, code) => eq(out, "ร้านกาแฟมะลิ") && /HTMLParser/.test(code) && /feed\(/.test(code) },
          { title: "นับลิงก์ในหน้าเว็บ", desc: "นับจำนวนลิงก์และเก็บ href ของแต่ละลิงก์ — งาน scraping พื้นฐานที่ใช้สำรวจโครงสร้างเว็บ", goal: 'นับจำนวนแท็ก <b>&lt;a&gt;</b> ใน HTML แล้วแสดงจำนวน (ต้องได้ <b>3</b>) ตามด้วย href ของลิงก์แรก (<b>/menu</b>)', starter: "from html.parser import HTMLParser\n\nhtml = '<nav><a href=\"/menu\">เมนู</a><a href=\"/about\">เกี่ยวกับ</a><a href=\"/contact\">ติดต่อ</a></nav>'\n\n", hint: 'ใน handle_starttag ถ้า tag == "a" ให้เก็บ <code>dict(attrs)["href"]</code> ลงลิสต์', xp: 90, check: (out, code) => lines(out).join(",") === "3,/menu" && /HTMLParser/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "Django ใช้สถาปัตยกรรมแบบใด", c: ["MVC", "MVT", "MVVM", "REST"], a: 1, e: "MVT = Model, View, Template" },
              { t: "tf", q: "ใน Django ส่วน Template คือไฟล์ HTML ที่แทรกข้อมูลด้วย {{ ตัวแปร }}", a: true, e: "Template ทำหน้าที่แสดงผล แยกจากตรรกะใน View" },
              { t: "fill", q: "คำสั่งที่รันเซิร์ฟเวอร์ทดสอบของ Django คือ python manage.py ___", a: ["runserver"], e: "เปิดเบราว์เซอร์ที่ http://127.0.0.1:8000" },
              { t: "mc", q: "ก่อนทำ Web Scraping ควรตรวจไฟล์ใดของเว็บปลายทาง", c: ["index.html", "robots.txt", "style.css", "sitemap.jpg"], a: 1, e: "robots.txt บอกว่าเว็บอนุญาตให้บอทเข้าถึงส่วนใดบ้าง" },
              { t: "order", q: "เรียงวงจรการทำงานของเว็บ", items: ["เบราว์เซอร์ส่ง Request", "เซิร์ฟเวอร์ประมวลผล", "เซิร์ฟเวอร์ส่ง Response (HTML)", "เบราว์เซอร์แสดงผล"], e: "ทุกครั้งที่คลิกลิงก์คือวงจรนี้หนึ่งรอบ" }
            ]
          }
        ]
      },
      {
        id: "api", icon: "function", title: "บทที่ 18-21: API และ Microservices",
        blurb: "REST API, JSON, จำลอง endpoint และเขียน Automated Test",
        lesson: [
          { h: "REST API คืออะไร", p: "<b>API</b> คือช่องทางให้โปรแกรมคุยกัน <b>REST API</b> ใช้ HTTP Method: <b>GET</b> (ดึงข้อมูล), <b>POST</b> (เพิ่ม), <b>PUT</b> (แก้), <b>DELETE</b> (ลบ) — ส่งข้อมูลในรูปแบบ <b>JSON</b>" },
          { h: "Flask และ FastAPI", p: "<b>Flask</b> เฟรมเวิร์กเล็กยืดหยุ่นสำหรับสร้าง API • <b>FastAPI</b> ทันสมัย เร็ว มีเอกสารอัตโนมัติ (Swagger) — กำหนด endpoint ด้วย decorator", code: "from fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\"/hello\")\ndef hello():\n    return {\"message\": \"สวัสดี\"}" },
          { h: "Automated Testing", p: "<b>Unit Test</b> คือการทดสอบโค้ดอัตโนมัติด้วยโมดูล <b>unittest</b> — เขียน test case ตรวจว่าฟังก์ชันทำงานถูกต้อง ช่วยจับบั๊กก่อนขึ้นระบบจริง", code: "import unittest\nclass TestAdd(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(2 + 3, 5)" },
          { h: "HTTP Method และ Status Code", p: "<b>GET</b> ดึงข้อมูล • <b>POST</b> สร้างข้อมูลใหม่ • <b>PUT/PATCH</b> แก้ไข • <b>DELETE</b> ลบ — เซิร์ฟเวอร์ตอบกลับพร้อม<b>รหัสสถานะ</b>: <b>200</b> สำเร็จ • <b>201</b> สร้างสำเร็จ • <b>400</b> คำขอผิดรูปแบบ • <b>401</b> ยังไม่ยืนยันตัวตน • <b>404</b> ไม่พบ • <b>500</b> เซิร์ฟเวอร์ผิดพลาด — จำง่ายๆ 2xx สำเร็จ 4xx ฝั่งผู้ใช้ผิด 5xx ฝั่งเซิร์ฟเวอร์ผิด" },
          { h: "JSON ใน Python", p: "API ส่งข้อมูลเป็น JSON ใช้โมดูล <b>json</b>: <code>json.dumps(dict)</code> แปลง dict เป็นข้อความ JSON (ใส่ <code>ensure_ascii=False</code> ให้ภาษาไทยอ่านออก) • <code>json.loads(ข้อความ)</code> แปลงกลับเป็น dict — โครงสร้าง JSON ตรงกับ dict/list ของ Python แทบทุกประการ", code: "import json\ndata = {\"name\": \"มะลิ\", \"score\": 90}\ntext = json.dumps(data, ensure_ascii=False)\nback = json.loads(text)\nprint(back[\"score\"])" },
          { h: "ทำไมต้องเขียน Automated Test", p: "โปรแกรมใหญ่ขึ้น การแก้โค้ดจุดหนึ่งอาจทำให้อีกจุดพังโดยไม่รู้ตัว — <b>Unit Test</b> คือโค้ดที่ตรวจโค้ดอัตโนมัติ รันได้ทุกครั้งที่แก้ไข • วิธีง่ายที่สุดคือ <code>assert เงื่อนไข</code> ถ้าเป็นเท็จจะเกิด AssertionError ทันที • โมดูล <b>unittest</b> จัดกลุ่มเทสต์และรายงานผลเป็นระบบ", code: "def add(a, b):\n    return a + b\n\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint(\"ผ่านทุกเทสต์\")" }
        ],
        stages: [
          { title: "สร้างข้อมูลตอบกลับแบบ JSON", desc: "API ส่งข้อมูลเป็นข้อความ JSON — แปลง dict ของ Python เป็น JSON ด้วย json.dumps", goal: 'แปลง dict <b>{"status": "ok", "count": 2}</b> เป็นข้อความ JSON แล้วแสดงผล (ต้องได้ <b>{"status": "ok", "count": 2}</b>)', starter: "import json\n\nresponse = {\"status\": \"ok\", \"count\": 2}\n", hint: '<code>print(json.dumps(response))</code>', xp: 60, check: (out, code) => eq(out, '{"status": "ok", "count": 2}') && /json\.dumps/.test(code) },
          { title: "อ่านข้อมูลจาก API", desc: "ข้อมูลที่ได้จาก API เป็นข้อความ JSON ต้องแปลงเป็น dict ด้วย json.loads ก่อนจึงจะเข้าถึงข้อมูลข้างในได้", goal: 'แปลงข้อความ JSON ที่ได้จาก API แล้วแสดงชื่อของผู้ใช้คนที่สอง (ต้องได้ <b>ฟ้า</b>)', starter: "import json\n\ntext = '{\"users\": [{\"name\": \"มะลิ\"}, {\"name\": \"ฟ้า\"}]}'\n", hint: '<code>data = json.loads(text)</code> แล้ว <code>print(data["users"][1]["name"])</code>', xp: 70, check: (out, code) => eq(out, "ฟ้า") && /json\.loads/.test(code) },
          { title: "ฟังก์ชันจำลอง API endpoint", desc: "จำลองการทำงานของ API: รับ path แล้วคืน (status code, ข้อมูล) — ถ้าไม่พบให้คืน 404 ตามมาตรฐาน HTTP", goal: 'เขียน <b>handle(path)</b> ที่คืน <b>(200, "สวัสดี")</b> เมื่อ path เป็น <b>/hello</b> และ <b>(404, "ไม่พบ")</b> กรณีอื่น แล้วแสดง status code ของ <b>/hello</b> และ <b>/abc</b> (ต้องได้ <b>200</b> แล้ว <b>404</b>)', starter: "def handle(path):\n    # คืน (status, ข้อความ)\n    pass\n\n", hint: '<code>if path == "/hello": return (200, "สวัสดี")</code> แล้ว <code>print(handle("/hello")[0])</code>', xp: 80, check: (out, code) => lines(out).join(",") === "200,404" && /def\s+handle/.test(code) },
          { title: "เขียน Automated Test", desc: "assert ตรวจว่าเงื่อนไขเป็นจริง ถ้าเป็นเท็จโปรแกรมจะหยุดทันที — ทดสอบหลายกรณีรวมถึงกรณีขอบ", goal: 'เขียนฟังก์ชัน <b>discount(price)</b> ลด 10% แล้วเขียน <b>assert</b> อย่างน้อย 2 กรณี ถ้าผ่านทั้งหมดให้แสดง <b>ผ่านทุกเทสต์</b>', starter: "def discount(price):\n    return price * 0.9\n\n# เขียน assert อย่างน้อย 2 บรรทัด\n", hint: '<code>assert discount(100) == 90</code> และ <code>assert discount(0) == 0</code>', xp: 80, check: (out, code) => eq(out, "ผ่านทุกเทสต์") && (code.match(/assert\s+/g) || []).length >= 2 },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "HTTP Method ใดใช้สร้างข้อมูลใหม่", c: ["GET", "POST", "DELETE", "HEAD"], a: 1, e: "POST สร้าง GET อ่าน PUT แก้ไข DELETE ลบ" },
              { t: "mc", q: "Status code 404 หมายถึงอะไร", c: ["สำเร็จ", "ไม่พบข้อมูล", "เซิร์ฟเวอร์ผิดพลาด", "ต้องล็อกอิน"], a: 1, e: "4xx คือข้อผิดพลาดฝั่งผู้ใช้" },
              { t: "tf", q: "FastAPI สร้างหน้าเอกสาร API (Swagger) ให้อัตโนมัติที่ /docs", a: true, e: "เป็นจุดเด่นที่ทำให้ FastAPI นิยมมาก" },
              { t: "fill", q: "ฟังก์ชันที่แปลงข้อความ JSON เป็น dict คือ json.___()", a: ["loads"], e: "dumps แปลงไป loads แปลงกลับ" },
              { t: "order", q: "เรียงรหัสสถานะตามกลุ่ม: สำเร็จ → ผู้ใช้ผิด → เซิร์ฟเวอร์ผิด", items: ["200", "404", "500"], e: "2xx สำเร็จ 4xx ผู้ใช้ผิด 5xx เซิร์ฟเวอร์ผิด" }
            ]
          }
        ]
      },
      {
        id: "datascience", icon: "datastructure", title: "บทที่ 22-26: Data Science",
        blurb: "สถิติ ทำความสะอาดข้อมูล และแนวคิด Machine Learning ลงมือคำนวณจริง",
        lesson: [
          { h: "Data Science กับ Python", p: "Python เป็นภาษายอดนิยมสำหรับ Data Science ด้วยไลบรารีทรงพลัง: <b>NumPy</b> (คำนวณอาร์เรย์), <b>Pandas</b> (จัดการตารางข้อมูล), <b>Matplotlib</b> (กราฟ), <b>Scikit-learn</b> (Machine Learning)" },
          { h: "NumPy และ Pandas", p: "<b>NumPy</b> จัดการอาร์เรย์หลายมิติ (ndarray) คำนวณเร็วมาก • <b>Pandas</b> จัดการข้อมูลตาราง (DataFrame) เหมือน Excel ในโค้ด — อ่านไฟล์ กรอง จัดกลุ่ม วิเคราะห์", code: "import numpy as np\nimport pandas as pd\narr = np.array([1, 2, 3])\nprint(arr.mean())  # 2.0\ndf = pd.DataFrame({\"a\": [1, 2], \"b\": [3, 4]})" },
          { h: "Machine Learning", p: "<b>Scikit-learn</b> ทำ Machine Learning: <b>Supervised</b> (มีเฉลย เช่น Linear Regression, K-NN, SVM), <b>Unsupervised</b> (ไม่มีเฉลย เช่น K-Means) — สอนโมเดลด้วยข้อมูล แล้วให้ทำนายข้อมูลใหม่", code: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npred = model.predict(X_test)" },
          { h: "กระบวนการ Data Science", p: "1) <b>ตั้งคำถาม</b> อยากรู้อะไร → 2) <b>เก็บข้อมูล</b> (ไฟล์ CSV, ฐานข้อมูล, API) → 3) <b>ทำความสะอาดข้อมูล</b> (ลบค่าว่าง ค่าผิดปกติ — ขั้นที่กินเวลามากที่สุดถึง 80%) → 4) <b>วิเคราะห์และสร้างภาพ</b> → 5) <b>สร้างโมเดล</b> ทำนาย → 6) <b>สื่อสารผลลัพธ์</b>" },
          { h: "สถิติพื้นฐานที่ต้องรู้", p: "<b>ค่าเฉลี่ย (mean)</b> ผลรวมหารจำนวน — ถูกค่าสุดโต่งดึงได้ง่าย • <b>มัธยฐาน (median)</b> ค่ากลางเมื่อเรียงลำดับ — ทนต่อค่าสุดโต่ง เหมาะกับข้อมูลรายได้ • <b>ฐานนิยม (mode)</b> ค่าที่พบบ่อยที่สุด • <b>ส่วนเบี่ยงเบนมาตรฐาน (stdev)</b> ข้อมูลกระจายห่างจากค่าเฉลี่ยแค่ไหน — ใช้โมดูล <code>statistics</code> ที่มากับ Python ได้เลย", code: "import statistics as st\nscores = [70, 80, 80, 95]\nprint(st.mean(scores), st.median(scores), st.mode(scores))" },
          { h: "Machine Learning ทำงานอย่างไร", p: "แทนที่จะเขียนกฎเอง เราป้อน<b>ข้อมูลตัวอย่างพร้อมเฉลย</b>ให้คอมพิวเตอร์หารูปแบบเอง (เรียกว่า <b>train</b>) แล้วนำโมเดลไปทำนายข้อมูลใหม่ • แบ่งข้อมูลเป็น <b>training set</b> (ใช้สอน ~80%) และ <b>test set</b> (ใช้วัดผล ~20%) เพื่อตรวจว่าโมเดลไม่ได้แค่ท่องจำ (overfitting)" }
        ],
        stages: [
          { title: "สถิติพื้นฐาน 3 ค่า", desc: "โมดูล statistics มากับ Python คำนวณค่าสถิติได้ในบรรทัดเดียว — จุดเริ่มต้นของการวิเคราะห์ข้อมูลทุกงาน", goal: 'จากคะแนน <b>[70, 80, 80, 90, 95]</b> แสดง 3 บรรทัด: <b>ค่าเฉลี่ย</b>, <b>มัธยฐาน</b>, <b>ฐานนิยม</b> (ต้องได้ <b>83</b>, <b>80</b>, <b>80</b>)', starter: "import statistics\n\nscores = [70, 80, 80, 90, 95]\n", hint: '<code>print(statistics.mean(scores))</code> ตามด้วย median และ mode', xp: 70, check: (out, code) => lines(out).join(",") === "83,80,80" && /statistics/.test(code) },
          { title: "ทำความสะอาดข้อมูล", desc: "ข้อมูลจริงมักมีค่าว่างหรือค่าผิดปกติปนมา ต้องกรองออกก่อนคำนวณ ไม่งั้นผลลัพธ์จะเพี้ยน — ขั้นตอนที่กินเวลามากที่สุดของงานข้อมูล", goal: 'กรองค่า <b>None</b> และค่า<b>ติดลบ</b>ออกจากลิสต์ด้วย list comprehension แล้วแสดงค่าเฉลี่ยของข้อมูลที่เหลือ (ต้องได้ <b>80.0</b>)', starter: "raw = [70, None, 85, -1, 90, None, 75]\n", hint: '<code>clean = [x for x in raw if x is not None and x >= 0]</code> แล้ว <code>print(sum(clean) / len(clean))</code>', xp: 80, check: (out, code) => eq(out, "80.0") && /for\s+\w+\s+in\s+raw/.test(code) },
          { title: "ทำนายด้วยเส้นตรงอย่างง่าย", desc: "แนวคิดของ Linear Regression: หาความสัมพันธ์ y = ax + b จากข้อมูล แล้วใช้ทำนายค่าใหม่ — ด่านนี้คำนวณความชันและจุดตัดด้วยสูตรกำลังสองน้อยที่สุดด้วยตัวเอง", goal: 'ชั่วโมงอ่านหนังสือ <b>x = [1, 2, 3, 4]</b> กับคะแนน <b>y = [50, 60, 70, 80]</b> หาความชัน a และจุดตัด b แล้วทำนายคะแนนเมื่ออ่าน 5 ชั่วโมง (ต้องได้ <b>90.0</b>)', starter: "x = [1, 2, 3, 4]\ny = [50, 60, 70, 80]\nmx = sum(x) / len(x)\nmy = sum(y) / len(y)\n# a = sum((xi-mx)*(yi-my)) / sum((xi-mx)**2)\n# b = my - a*mx\n", hint: '<code>a = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y)) / sum((xi - mx) ** 2 for xi in x)</code> แล้ว <code>print(a * 5 + b)</code>', xp: 100, check: (out, code) => eq(out, "90.0") && /zip\(/.test(code) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 70,
            quiz: [
              { t: "mc", q: "ค่าสถิติใดทนต่อค่าสุดโต่ง (outlier) ได้ดีที่สุด", c: ["ค่าเฉลี่ย", "มัธยฐาน", "ผลรวม", "ค่าสูงสุด"], a: 1, e: "มัธยฐานคือค่ากลางเมื่อเรียงลำดับ ค่าสุดโต่งเพียงไม่กี่ค่าจึงไม่ดึงให้เพี้ยน" },
              { t: "tf", q: "ขั้นตอนทำความสะอาดข้อมูลมักกินเวลามากที่สุดในงาน Data Science", a: true, e: "ข้อมูลจริงมักมีค่าว่าง ค่าผิดรูปแบบ และข้อมูลซ้ำ" },
              { t: "mc", q: "ไลบรารีใดใช้จัดการข้อมูลตาราง (DataFrame)", c: ["NumPy", "Pandas", "Matplotlib", "Tkinter"], a: 1, e: "Pandas จัดการตาราง NumPy คำนวณอาร์เรย์ Matplotlib วาดกราฟ" },
              { t: "fill", q: "การเรียนรู้แบบมีเฉลย (มีข้อมูลคำตอบให้โมเดลเรียน) เรียกว่า ___ Learning", a: ["supervised"], e: "Unsupervised คือไม่มีเฉลย เช่น การจัดกลุ่มด้วย K-Means" },
              { t: "order", q: "เรียงขั้นตอนของกระบวนการ Data Science", items: ["ตั้งคำถาม", "เก็บข้อมูล", "ทำความสะอาดข้อมูล", "วิเคราะห์และสร้างโมเดล", "สื่อสารผลลัพธ์"], e: "เริ่มจากคำถามที่ชัดเจนเสมอ" }
            ]
          }
        ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ภาษาซีถูกคิดค้นโดยใคร", c: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"], a: 1, e: "Dennis Ritchie คิดค้นภาษาซีเมื่อ ค.ศ. 1972 (Guido สร้าง Python, Gosling สร้าง Java, Stroustrup สร้าง C++)" },
              { t: "order", q: "เรียงขั้นตอนการพัฒนาโปรแกรมภาษาซี", items: ["เขียนโปรแกรม (.c)", "คอมไพล์ (.obj)", "เชื่อมโยงกับ library (.exe)", "ประมวลผล (run)"], e: "ขั้นตอนทั้ง 4 คือกระบวนการที่เปลี่ยนโค้ดให้เป็นโปรแกรมที่รันได้" },
              { t: "tf", q: "ภาษาซีใช้ตัวแปลภาษาแบบอินเตอร์พรีเตอร์ที่แปลทีละบรรทัด", a: false, e: "ภาษาซีใช้คอมไพเลอร์ แปลทั้งโปรแกรมทีเดียว จึงทำงานเร็ว" },
              { t: "mc", q: "ชื่อตัวแปรใดผิดกฎการตั้งชื่อของภาษาซี", c: ["_testValue", "app_passwd", "3people", "b1"], a: 2, e: "ห้ามขึ้นต้นด้วยตัวเลข" },
              { t: "fill", q: "คำสั่ง <code>#include &lt;stdio.h&gt;</code> อยู่ในส่วน ___ ของโปรแกรม", a: ["หัว", "ส่วนหัว", "ส่วนหัวของโปรแกรม", "preprocessing directives"], e: "ส่วนหัวของโปรแกรม (Preprocessing Directives) ขึ้นต้นด้วย # เสมอ" }
            ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "คีย์ลัดใดใช้รันโปรแกรมแบบไม่ดีบักใน Visual Studio", c: ["F5", "Ctrl+F5", "Ctrl+Shift+B", "F10"], a: 1, e: "Ctrl+F5 รันแบบไม่ดีบัก หน้าต่างผลลัพธ์จะค้างไว้ให้อ่าน" },
              { t: "tf", q: "ไฟล์ใน Visual Studio ต้องลงท้ายด้วย .c จึงจะถูกคอมไพล์เป็นภาษาซี ถ้าเป็น .cpp จะถูกคอมไพล์เป็น C++", a: true, e: "นามสกุลไฟล์เป็นตัวกำหนดว่าคอมไพเลอร์จะใช้กฎของภาษาใด" },
              { t: "mc", q: "Warning ต่างจาก Error อย่างไร", c: ["เหมือนกัน", "Warning ยังคอมไพล์ผ่านแต่เสี่ยงบั๊ก", "Warning คอมไพล์ไม่ผ่าน", "Error ไม่ต้องแก้"], a: 1, e: "Error ต้องแก้จึงคอมไพล์ผ่าน ส่วน Warning ควรแก้เพื่อป้องกันบั๊ก" },
              { t: "fill", q: "error C2143 ที่ว่า syntax error: missing ';' แปลว่าลืมเครื่องหมาย ___", a: [";"], e: "ทุกคำสั่งในภาษาซีต้องจบด้วยเซมิโคลอน" },
              { t: "order", q: "เรียงขั้นตอนสร้างโปรเจกต์ภาษาซีใน Visual Studio 2022", items: ["Create a new project", "เลือก Empty Project", "เพิ่มไฟล์ใน Source Files", "ตั้งชื่อไฟล์ .c แล้วเขียนโค้ด"], e: "ตั้งค่าโปรเจกต์ให้ถูกตั้งแต่ต้นจะช่วยลดปัญหาภายหลัง" }
            ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "order", q: "เรียงขั้นตอนการพัฒนาโปรแกรม 5 ขั้น", items: ["วิเคราะห์ปัญหา", "วางแผนและออกแบบ", "เขียนโปรแกรม", "ทดสอบโปรแกรม", "จัดทำคู่มือ"], e: "ขั้นวิเคราะห์ปัญหาสำคัญที่สุด เพราะถ้าเข้าใจผิดตั้งแต่ต้น ทุกขั้นที่ตามมาจะผิดหมด" },
              { t: "mc", q: "อัลกอริทึมที่เขียนด้วยประโยคภาษาอังกฤษง่ายๆ เรียกว่าอะไร", c: ["Flowchart", "Pseudocode", "Source code", "Machine code"], a: 1, e: "ซูโดโค้ดอ่านแล้วเข้าใจทันที และแปลงเป็นโค้ดได้ง่าย" },
              { t: "tf", q: "การทดสอบโปรแกรมที่ดีควรทดสอบด้วยข้อมูลหลายๆ ชุด", a: true, e: "ทดสอบชุดเดียวอาจไม่เจอข้อผิดพลาดในกรณีอื่น" },
              { t: "fill", q: "สูตรแปลงปี ค.ศ. เป็น พ.ศ. คือ BE = CE + ___", a: ["543"], e: "ตัวอย่าง: ค.ศ. 2026 = พ.ศ. 2569" },
              { t: "mc", q: "จุดประสงค์หลักของการจัดทำคู่มือ (Documentation) คือ", c: ["ทำให้โปรแกรมเร็วขึ้น", "ช่วยให้ผู้อื่นศึกษาและพัฒนาต่อได้ง่าย", "ลดขนาดโปรแกรม", "ป้องกันการคัดลอก"], a: 1, e: "คู่มือระบุชื่อโปรแกรม ตัวแปร ชนิดข้อมูล และวิธีแก้ปัญหา" }
            ]
          }
        ]
      },
      {
        id: "ctypes", icon: "📦", title: "หน่วยที่ 4: ตัวแปรกับชนิดของข้อมูล",
        blurb: "int, float, double, char และรหัสรูปแบบ %d %f %c — เลือกชนิดให้ถูกกับงาน",
        lesson: [
          { h: "4 ชนิดข้อมูลหลัก", p: "<b>int</b> จำนวนเต็ม • <b>float / double</b> ทศนิยม (double ละเอียดกว่า) • <b>char</b> ตัวอักษรตัวเดียวในเครื่องหมาย ' ' — ประกาศ: ชนิด ชื่อ = ค่า;", code: "int age = 15;\nfloat price = 19.5;\nchar grade = 'A';" },
          { h: "รหัสรูปแบบใน printf", p: "<b>%d</b> = int • <b>%f</b> = float/double (ปกติ 6 ตำแหน่ง ใช้ <b>%.2f</b> คุมเหลือ 2 ตำแหน่ง) • <b>%c</b> = char • <b>%s</b> = ข้อความ", code: "printf(\"อายุ %d ปี\", age);\nprintf(\"ราคา %.2f บาท\", price);" },
          { h: "กับดักการหารจำนวนเต็ม", p: "int หาร int ได้ int เสมอ — เศษถูกตัดทิ้ง! เช่น 7 / 2 = 3 ไม่ใช่ 3.5 ต้องแปลงชนิด (casting) ด้วย (float) ก่อน", code: "int a = 7, b = 2;\nprintf(\"%.1f\", (float)a / b);  // 3.5" },
          { h: "ขนาดหน่วยความจำและช่วงค่า", p: "แต่ละชนิดกินพื้นที่ต่างกันและเก็บค่าได้จำกัด (ใช้ <code>sizeof()</code> ดูขนาดได้): <b>char</b> 1 ไบต์ (-128 ถึง 127) • <b>int</b> ปกติ 4 ไบต์ (ประมาณ -2,147 ล้าน ถึง 2,147 ล้าน) • <b>float</b> 4 ไบต์ ทศนิยมประมาณ 7 หลัก • <b>double</b> 8 ไบต์ ละเอียดประมาณ 15 หลัก — ถ้าใส่ค่าเกินช่วงจะเกิด <b>overflow</b> ค่าวนกลับไปติดลบ", code: "printf(\"%d\", sizeof(int));  // 4" },
          { h: "⚠️ กับดักที่ต้องระวัง", p: "<b>1) ใช้ตัวแปรก่อนกำหนดค่า</b> — ใน C ค่าเริ่มต้นคือขยะในหน่วยความจำ ไม่ใช่ 0 • <b>2) รหัสรูปแบบไม่ตรงชนิด</b> — ใช้ %d กับ float จะได้ค่าเพี้ยนสุดๆ • <b>3) เทียบ float ด้วย ==</b> — ทศนิยมมีความคลาดเคลื่อน ควรเทียบด้วยผลต่างที่ยอมรับได้แทน • <b>4) ลืม & ใน scanf</b> — โปรแกรมพังทันที" },
          { h: "💡 เคล็ดลับ", p: "ประกาศตัวแปรพร้อมกำหนดค่าเริ่มต้นเสมอ (<code>int count = 0;</code>) • ใช้ <b>const</b> กับค่าที่ไม่ควรเปลี่ยน • เลือก <b>double</b> เป็นค่าเริ่มต้นสำหรับงานทศนิยมเพราะละเอียดกว่า float • ตั้งชื่อตัวแปรสื่อความหมายและใช้รูปแบบเดียวกันทั้งโปรแกรม" }
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "รหัสรูปแบบใดใช้แสดงค่า float ทศนิยม 2 ตำแหน่ง", c: ["%d", "%f", "%.2f", "%c"], a: 2, e: "%.2f กำหนดจำนวนตำแหน่งทศนิยม ส่วน %f เฉยๆ แสดง 6 ตำแหน่ง" },
              { t: "mc", q: "<code>7 / 2</code> เมื่อทั้งคู่เป็น int ได้ผลลัพธ์เท่าใดในภาษาซี", c: ["3.5", "3", "4", "Error"], a: 1, e: "int หาร int ได้ int เศษถูกตัดทิ้ง ต้อง casting ด้วย (float) เพื่อให้ได้ 3.5" },
              { t: "tf", q: "ตัวแปร char เก็บตัวอักษรได้เพียงตัวเดียว และจริงๆ แล้วเก็บเป็นรหัสตัวเลข (ASCII)", a: true, e: "เช่น 'A' เก็บเป็นเลข 65 พิมพ์ด้วย %c ได้ตัวอักษร พิมพ์ด้วย %d ได้ตัวเลข" },
              { t: "fill", q: "คำสำคัญที่ประกาศค่าคงที่ซึ่งห้ามแก้ไขคือ ___", a: ["const"], e: "เช่น const float PI = 3.14;" },
              { t: "mc", q: "ชนิดข้อมูลใดเก็บทศนิยมได้ละเอียดที่สุด", c: ["int", "float", "double", "char"], a: 2, e: "double ใช้ 8 ไบต์ ละเอียดประมาณ 15 หลัก มากกว่า float ที่ละเอียดประมาณ 7 หลัก" }
            ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>int x = 5; printf(\"%d\", x++);</code> แสดงค่าอะไร", c: ["5", "6", "4", "Error"], a: 0, e: "x++ ใช้ค่าเดิมก่อนแล้วค่อยเพิ่ม จึงแสดง 5 (หลังบรรทัดนี้ x = 6)" },
              { t: "mc", q: "<code>int x = 5; printf(\"%d\", ++x);</code> แสดงค่าอะไร", c: ["5", "6", "4", "7"], a: 1, e: "++x เพิ่มก่อนแล้วค่อยใช้ค่า จึงแสดง 6" },
              { t: "tf", q: "ในภาษาซี ผลของการเปรียบเทียบ <code>10 &gt; 7</code> คือค่า 1", a: true, e: "ภาษาซีไม่มี true/false แบบ Python ใช้ 1 แทนจริง และ 0 แทนเท็จ" },
              { t: "fill", q: "<code>gold += 50;</code> เท่ากับการเขียน <code>gold = gold ___ 50;</code>", a: ["+"], e: "ตัวดำเนินการย่อช่วยให้โค้ดสั้นลง" },
              { t: "mc", q: "<code>score &gt;= 50 ? \"ผ่าน\" : \"ตก\"</code> เรียกว่าตัวดำเนินการอะไร", c: ["logical", "ternary", "bitwise", "assignment"], a: 1, e: "ternary มี 3 ส่วน: เงื่อนไข ? ค่าเมื่อจริง : ค่าเมื่อเท็จ" }
            ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ข้อใดรับค่าจำนวนเต็มด้วย scanf ได้ถูกต้อง", c: ["scanf(\"%d\", x);", "scanf(\"%d\", &x);", "scanf(x);", "scanf(\"%f\", &x);"], a: 1, e: "ต้องใส่ & หน้าตัวแปรเพื่อส่ง \"ที่อยู่\" ให้ scanf" },
              { t: "tf", q: "การรับข้อความด้วย %s ลงในอาร์เรย์ char ไม่ต้องใส่ & หน้าชื่ออาร์เรย์", a: true, e: "ชื่ออาร์เรย์คือที่อยู่ของช่องแรกอยู่แล้ว" },
              { t: "fill", q: "อยากแสดงเครื่องหมาย % ออกทาง printf ต้องพิมพ์ว่า ___", a: ["%%"], e: "% เดี่ยวคือจุดเริ่มของรหัสรูปแบบ จึงต้องพิมพ์ซ้ำสองครั้ง" },
              { t: "mc", q: "รหัสรูปแบบใดใช้รับตัวอักษรตัวเดียว", c: ["%s", "%c", "%d", "%f"], a: 1, e: "%c สำหรับ char ส่วน %s สำหรับข้อความ" },
              { t: "order", q: "เรียงขั้นตอนของโปรแกรมที่รับเลข 2 จำนวนแล้วแสดงผลบวก", items: ["ประกาศตัวแปร", "รับค่าด้วย scanf", "คำนวณผลบวก", "แสดงผลด้วย printf"], e: "ในภาษาซีต้องประกาศตัวแปรก่อนใช้งานเสมอ" }
            ]
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
          },
          {
            title: "หาค่ามากสุดจากสามค่า",
            desc: "เงื่อนไขซ้อนกันหลายชั้น — โจทย์พื้นฐานที่ออกสอบบ่อยที่สุดเรื่อง if",
            goal: 'มี a=15, b=42, c=8 หาค่ามากที่สุดแล้วแสดง <b>มากสุด = 42</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int a = 15, b = 42, c = 8;\n\n    return 0;\n}\n",
            hint: 'เก็บ max = a แล้วเทียบทีละตัว: <code>if (b > max) max = b;</code>',
            xp: 60,
            check: (out, code) => eq(out, "มากสุด = 42") && /if\s*\(/.test(code)
          },
          {
            title: "พีระมิดดาวด้วยลูปซ้อน",
            desc: "ลูปนอกคุมจำนวนแถว ลูปในคุมจำนวนดาวในแถวนั้น — คลาสสิกของภาษา C",
            goal: 'พิมพ์พีระมิด 4 แถว: <b>*</b>, <b>**</b>, <b>***</b>, <b>****</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\n",
            hint: '<code>for (int i = 1; i <= 4; i++) { for (int j = 0; j < i; j++) printf("*"); printf("\\n"); }</code>',
            xp: 80,
            check: (out, code) => lines(out).join(",") === "*,**,***,****" && (code.match(/for\s*\(/g) || []).length >= 2
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ถ้าลืม <code>break;</code> ใน case ของ switch จะเกิดอะไรขึ้น", c: ["คอมไพล์ไม่ผ่าน", "โปรแกรมจะทำ case ถัดไปต่อด้วย", "ข้ามไปที่ default", "ไม่มีผลอะไร"], a: 1, e: "เรียกว่า fall-through โปรแกรมจะไหลลงไปทำ case ถัดไปจนกว่าจะเจอ break" },
              { t: "tf", q: "ลูป do-while ทำงานอย่างน้อยหนึ่งรอบเสมอ", a: true, e: "do-while ทำก่อนแล้วค่อยเช็คเงื่อนไข ต่างจาก while ที่เช็คก่อน" },
              { t: "mc", q: "ลูป <code>for (int i = 0; i &lt; 5; i++)</code> ทำงานกี่รอบ", c: ["4", "5", "6", "ไม่รู้จบ"], a: 1, e: "i = 0, 1, 2, 3, 4 รวม 5 รอบ" },
              { t: "fill", q: "คำสั่งที่ใช้ออกจากลูปทันทีคือ ___", a: ["break"], e: "break ออกจากลูป ส่วน continue ข้ามไปรอบถัดไป" },
              { t: "order", q: "เรียงลำดับการทำงานของลูป for ในแต่ละรอบ", items: ["กำหนดค่าเริ่มต้น (ทำครั้งแรกครั้งเดียว)", "ตรวจเงื่อนไข", "ทำคำสั่งในลูป", "เปลี่ยนค่าตัวแปร (i++)"], e: "หลังเปลี่ยนค่าจะกลับไปตรวจเงื่อนไขใหม่ วนไปจนกว่าเงื่อนไขเป็นเท็จ" }
            ]
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
          },
          {
            title: "หาค่าเฉลี่ยจากอาร์เรย์",
            desc: "รวมการวนสะสมกับการหารทศนิยม — อย่าลืม casting ไม่งั้นค่าเฉลี่ยจะถูกตัดเศษ",
            goal: 'มี <b>int s[4] = {80, 75, 90, 85}</b> หาค่าเฉลี่ยแล้วแสดง <b>เฉลี่ย = 82.50</b>',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\nint main() {\n    int s[4] = {80, 75, 90, 85};\n    int sum = 0;\n\n    return 0;\n}\n",
            hint: 'วนบวกเข้า sum แล้ว <code>printf("เฉลี่ย = %.2f", (float)sum / 4);</code>',
            xp: 80,
            check: (out, code) => eq(out, "เฉลี่ย = 82.50") && /\(float\)/.test(code) && /for\s*\(/.test(code)
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>int a[5];</code> ช่องสุดท้ายของอาร์เรย์คือ", c: ["a[5]", "a[4]", "a[6]", "a[0]"], a: 1, e: "ดัชนีเริ่มที่ 0 อาร์เรย์ขนาด 5 จึงมีดัชนี 0 ถึง 4" },
              { t: "tf", q: "ภาษาซีตรวจขอบเขตอาร์เรย์ให้ ถ้าใช้ดัชนีเกินจะฟ้อง Error ทันที", a: false, e: "ภาษาซีไม่ตรวจให้ การเข้าถึงเกินขอบเขตจะอ่าน/เขียนหน่วยความจำมั่ว เป็นบั๊กที่อันตรายมาก" },
              { t: "fill", q: "<code>int a[] = {10, 20, 30};</code> ค่าของ a[1] คือ ___", a: ["20"], e: "a[0] = 10, a[1] = 20, a[2] = 30" },
              { t: "mc", q: "วิธีวนลูปอ่านอาร์เรย์ขนาด n ที่ถูกต้องคือ", c: ["for (i = 1; i <= n; i++)", "for (i = 0; i < n; i++)", "for (i = 0; i <= n; i++)", "for (i = 1; i < n; i++)"], a: 1, e: "เริ่มที่ 0 และหยุดก่อนถึง n" },
              { t: "mc", q: "อาร์เรย์เหมาะกับข้อมูลลักษณะใด", c: ["ข้อมูลชนิดเดียวกันหลายค่า", "ข้อมูลต่างชนิดกัน", "ค่าเดียว", "ข้อความยาว"], a: 0, e: "อาร์เรย์เก็บข้อมูลชนิดเดียวกันเรียงต่อกันในหน่วยความจำ" }
            ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>&amp;x</code> หมายถึงอะไร", c: ["ค่าของ x", "ที่อยู่ของ x ในหน่วยความจำ", "x คูณ 2", "ตัวชี้ของ x"], a: 1, e: "& คือ address-of operator ให้ที่อยู่ของตัวแปร" },
              { t: "mc", q: "ถ้า <code>int *p = &amp;x;</code> แล้ว <code>*p</code> คืออะไร", c: ["ที่อยู่ของ p", "ค่าที่เก็บอยู่ใน x", "ค่าของ p", "Error"], a: 1, e: "*p คือการ dereference อ่านค่าปลายทางที่ p ชี้อยู่" },
              { t: "tf", q: "<code>*p = 99;</code> จะทำให้ค่าของตัวแปรที่ p ชี้อยู่เปลี่ยนเป็น 99", a: true, e: "เพราะเป็นช่องหน่วยความจำเดียวกัน" },
              { t: "fill", q: "ถ้า <code>int a[] = {5, 10, 15}; int *p = a;</code> แล้ว <code>*(p + 1)</code> มีค่า ___", a: ["10"], e: "เลขคณิตพอยน์เตอร์เลื่อนไปทีละช่อง *(p+1) คือ a[1]" },
              { t: "mc", q: "ทำไม scanf ต้องรับ &amp;x แทนที่จะรับ x", c: ["เพื่อความเร็ว", "เพื่อให้ scanf เขียนค่าลงตัวแปรต้นทางได้", "เป็นแค่ธรรมเนียม", "เพื่อประหยัดหน่วยความจำ"], a: 1, e: "ถ้าส่งแค่ค่า scanf จะได้สำเนา จึงแก้ตัวแปรจริงไม่ได้" }
            ]
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
          },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ฟังก์ชันที่ไม่คืนค่าต้องระบุชนิดเป็นอะไร", c: ["int", "void", "null", "none"], a: 1, e: "void แปลว่าว่างเปล่า ไม่มีค่าที่ส่งกลับ" },
              { t: "tf", q: "ต้องประกาศฟังก์ชันไว้ก่อน main หรือเขียนโปรโตไทป์ไว้ด้านบน ไม่งั้นคอมไพเลอร์ไม่รู้จัก", a: true, e: "ภาษาซีอ่านไฟล์จากบนลงล่าง" },
              { t: "mc", q: "ทำไมฟังก์ชัน swap ต้องรับพารามิเตอร์เป็นพอยน์เตอร์", c: ["เพื่อให้เร็วขึ้น", "เพื่อให้สลับค่าตัวแปรต้นทางได้จริง", "ภาษาซีบังคับ", "เพื่อประหยัดหน่วยความจำ"], a: 1, e: "การส่งค่าธรรมดาเป็นการส่งสำเนา การสลับภายในฟังก์ชันจึงไม่มีผลกับตัวแปรข้างนอก" },
              { t: "fill", q: "คำสั่งที่ส่งผลลัพธ์กลับจากฟังก์ชันคือ ___", a: ["return"], e: "return ส่งค่ากลับและจบการทำงานของฟังก์ชันทันที" },
              { t: "mc", q: "การส่งอาร์เรย์เข้าฟังก์ชัน จริงๆ แล้วส่งอะไรไป", c: ["สำเนาของทั้งอาร์เรย์", "ที่อยู่ของช่องแรก", "ขนาดของอาร์เรย์", "ค่าช่องสุดท้าย"], a: 1, e: "จึงต้องส่งขนาดไปด้วยเพราะฟังก์ชันไม่รู้ความยาวของอาร์เรย์เอง" }
            ]
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
          { title: "ซ้อนแท็กให้ถูกต้อง", desc: "แท็กซ้อนกันได้ แต่ต้องปิดจากในออกนอก (เปิด p แล้วเปิด strong ต้องปิด strong ก่อนปิด p)", goal: 'สร้างย่อหน้าที่มีข้อความ <b>ราคาพิเศษ ลด 50%</b> โดยคำว่า <b>ลด 50%</b> อยู่ในแท็ก <b>strong</b> ซ้อนอยู่ในย่อหน้านั้น', starter: `<p>ราคาพิเศษ </p>\n`, hint: '<code>&lt;p&gt;ราคาพิเศษ &lt;strong&gt;ลด 50%&lt;/strong&gt;&lt;/p&gt;</code>', xp: 50, check: (o, c, d) => { const s = W.q(d, "p strong"); return !!s && W.txt(s) === "ลด 50%" && W.txt(d, "p").includes("ราคาพิเศษ"); } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "HTML ย่อมาจากอะไร", c: ["Hyper Tool Markup Language", "HyperText Markup Language", "High Text Machine Language", "Home Tool Markup Language"], a: 1, e: "HTML คือภาษามาร์กอัปที่บอกเบราว์เซอร์ว่าเนื้อหาแต่ละส่วนคืออะไร" },
              { t: "order", q: "เรียงแท็กโครงสร้างเอกสาร HTML5 จากนอกสุดเข้าในสุด", items: ["<!DOCTYPE html>", "<html>", "<body>", "<h1>"], e: "DOCTYPE อยู่บรรทัดแรกสุด html ครอบทั้งหมด body เก็บเนื้อหาที่มองเห็น" },
              { t: "tf", q: "ข้อความใน &lt;head&gt; เช่น &lt;title&gt; จะแสดงในเนื้อหาหน้าเว็บ", a: false, e: "head เก็บข้อมูลของหน้า title แสดงบนแท็บเบราว์เซอร์ ไม่ใช่ในเนื้อหา" },
              { t: "fill", q: "แท็กที่ใช้เขียนคอมเมนต์ใน HTML ขึ้นต้นด้วย ___", a: ["<!--"], e: "คอมเมนต์เขียนแบบ &lt;!-- ข้อความ --&gt;" },
              { t: "mc", q: "ข้อใดเป็นแท็กเดี่ยว (ไม่มีแท็กปิด)", c: ["&lt;p&gt;", "&lt;br&gt;", "&lt;h1&gt;", "&lt;div&gt;"], a: 1, e: "void element เช่น br, hr, img, input ไม่มีแท็กปิด" }
            ]
          }
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
          { title: "โค้ดและข้อความอ้างอิง", desc: "blockquote สำหรับคำคม/ข้อความอ้างอิงยาว และ code สำหรับโค้ดในเนื้อหา", goal: 'สร้าง <b>blockquote</b> ข้อความ <b>โค้ดที่ดีคือโค้ดที่อ่านง่าย</b> และย่อหน้าที่มีคำว่า <b>console.log</b> อยู่ในแท็ก <b>code</b>', starter: ``, hint: '<code>&lt;blockquote&gt;...&lt;/blockquote&gt;</code> และ <code>&lt;code&gt;console.log&lt;/code&gt;</code>', xp: 60, check: (o, c, d) => W.txt(d, "blockquote") === "โค้ดที่ดีคือโค้ดที่อ่านง่าย" && W.hasText(d, "code", "console.log", true) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "หนึ่งหน้าเว็บควรมีแท็ก h1 กี่ตัว", c: ["ไม่จำกัด", "1 ตัว", "6 ตัว", "ไม่ควรมี"], a: 1, e: "h1 คือหัวข้อหลักของหน้า มีตัวเดียวดีต่อ SEO และการเข้าถึง" },
              { t: "tf", q: "&lt;strong&gt; ดีกว่า &lt;b&gt; เพราะสื่อความหมายว่าข้อความสำคัญ ไม่ใช่แค่ตัวหนา", a: true, e: "แท็กเชิงความหมายช่วยให้โปรแกรมอ่านหน้าจอเน้นเสียงได้ถูกต้อง" },
              { t: "fill", q: "รหัส entity ของเครื่องหมาย &lt; คือ ___", a: ["&lt;"], e: "&amp;lt; ย่อมาจาก less than" },
              { t: "mc", q: "ถ้าเคาะเว้นวรรค 5 ครั้งติดกันในโค้ด HTML หน้าเว็บจะแสดงกี่ช่อง", c: ["5 ช่อง", "1 ช่อง", "ไม่แสดงเลย", "ขึ้นบรรทัดใหม่"], a: 1, e: "HTML ยุบช่องว่างซ้ำเหลือหนึ่งช่อง ถ้าต้องการคงไว้ใช้ &lt;pre&gt; หรือ &amp;nbsp;" },
              { t: "mc", q: "แท็กใดใช้แสดงราคาเดิมที่ถูกขีดฆ่า", c: ["&lt;del&gt;", "&lt;ins&gt;", "&lt;mark&gt;", "&lt;small&gt;"], a: 0, e: "del คือข้อความที่ถูกลบ ins คือข้อความที่เพิ่มเข้ามา" }
            ]
          }
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
          { title: "ลิงก์กระโดดภายในหน้า", desc: "ใส่ id ให้จุดหมาย แล้วลิงก์ด้วย #id — ใช้ทำสารบัญหรือปุ่มกลับขึ้นบน", goal: 'สร้างลิงก์ <b>ไปหัวข้อสรุป</b> ที่ href = <b>#summary</b> และมี <b>h2 id="summary"</b> ข้อความ <b>สรุป</b>', starter: ``, hint: '<code>&lt;a href="#summary"&gt;</code> และ <code>&lt;h2 id="summary"&gt;สรุป&lt;/h2&gt;</code>', xp: 60, check: (o, c, d) => W.attr(d, "a", "href") === "#summary" && W.txt(d, "h2#summary") === "สรุป" },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ลิสต์แบบมีตัวเลขเรียงลำดับใช้แท็กอะไร", c: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;dl&gt;", "&lt;li&gt;"], a: 1, e: "ol = ordered list ส่วน ul = unordered list" },
              { t: "tf", q: "การทำลิสต์ซ้อน ต้องวาง ul ตัวใหม่ไว้ภายใน li ของลิสต์ชั้นบน", a: true, e: "ul/ol ต้องมีลูกโดยตรงเป็น li เท่านั้น" },
              { t: "fill", q: "แอตทริบิวต์ที่ทำให้ลิงก์เปิดในแท็บใหม่คือ target=\"___\"", a: ["_blank"], e: "ควรใส่ rel=\"noopener\" คู่กันเพื่อความปลอดภัย" },
              { t: "mc", q: "ลิงก์ใดกระโดดไปยังอิลิเมนต์ id=\"top\" ในหน้าเดียวกัน", c: ["href=\"top\"", "href=\"#top\"", "href=\".top\"", "href=\"/top\""], a: 1, e: "ใช้ # ตามด้วย id ของอิลิเมนต์ปลายทาง" },
              { t: "mc", q: "href=\"mailto:a@b.com\" ทำอะไร", c: ["เปิดเว็บไซต์", "เปิดโปรแกรมอีเมลพร้อมผู้รับ", "ดาวน์โหลดไฟล์", "โทรออก"], a: 1, e: "mailto: เปิดโปรแกรมอีเมล ส่วน tel: ใช้โทรออก" }
            ]
          }
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
          { title: "ฝังหน้าเว็บด้วย iframe", desc: "iframe เปิดหน้าเว็บอื่นซ้อนในหน้าเรา ควรใส่ title อธิบายเสมอเพื่อการเข้าถึง", goal: 'ฝัง iframe ที่ <b>src="https://example.com"</b> พร้อม <b>title="ตัวอย่างเว็บไซต์"</b>', starter: ``, hint: '<code>&lt;iframe src="https://example.com" title="ตัวอย่างเว็บไซต์"&gt;&lt;/iframe&gt;</code>', xp: 60, check: (o, c, d) => W.attr(d, "iframe", "src") === "https://example.com" && W.attr(d, "iframe", "title") === "ตัวอย่างเว็บไซต์" },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "แอตทริบิวต์ alt ของ img มีไว้ทำอะไร", c: ["กำหนดขนาด", "ข้อความแทนภาพสำหรับผู้พิการทางสายตาและเมื่อโหลดภาพไม่ได้", "ใส่ลิงก์", "ใส่กรอบภาพ"], a: 1, e: "alt สำคัญต่อการเข้าถึงและ SEO ควรใส่ทุกภาพ" },
              { t: "tf", q: "ควรระบุ width และ height ของภาพ เพื่อป้องกันหน้าเว็บกระตุกตอนภาพโหลด", a: true, e: "เบราว์เซอร์จองพื้นที่ไว้ก่อน เลย์เอาต์จึงไม่เลื่อน" },
              { t: "fill", q: "แอตทริบิวต์ที่ทำให้ video มีปุ่มเล่น/หยุดคือ ___", a: ["controls"], e: "ถ้าไม่ใส่ controls ผู้ใช้จะควบคุมวิดีโอไม่ได้" },
              { t: "mc", q: "แท็กใดใช้ใส่คำบรรยายใต้ภาพภายใน figure", c: ["&lt;caption&gt;", "&lt;figcaption&gt;", "&lt;label&gt;", "&lt;title&gt;"], a: 1, e: "figcaption ใช้คู่กับ figure ส่วน caption ใช้กับตาราง" },
              { t: "mc", q: "path แบบ relative คืออะไร", c: ["URL เต็มขึ้นต้นด้วย https", "path ที่อ้างอิงจากตำแหน่งไฟล์ปัจจุบัน", "path ที่ขึ้นต้นด้วย C:", "path ของเซิร์ฟเวอร์อื่น"], a: 1, e: "เช่น images/cat.jpg อ้างจากโฟลเดอร์ที่ไฟล์ HTML อยู่" }
            ]
          }
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
          { title: "ผสานช่องแนวตั้ง rowspan", desc: "ข้อมูลที่ใช้ร่วมกันหลายแถวใช้ rowspan — แถวถัดไปต้องลด td ลงหนึ่งช่อง", goal: 'ทำให้ช่อง <b>ม.3</b> กินพื้นที่ <b>2 แถว</b> ด้วย <b>rowspan="2"</b> (แถวที่สองจึงเหลือ td แค่ช่องเดียว)', starter: `<table>\n  <tr><td>ม.3</td><td>มะลิ</td></tr>\n  <tr><td>ม.3</td><td>ฟ้า</td></tr>\n</table>\n`, hint: 'ใส่ rowspan ที่ช่อง ม.3 แถวแรก แล้วลบ td ม.3 ของแถวสองทิ้ง', xp: 80, check: (o, c, d) => { const cell = W.q(d, "td[rowspan]"); return !!cell && W.attr(d, cell, "rowspan") === "2" && W.txt(cell) === "ม.3" && W.qa(d, "tr")[1] && W.qa(W.qa(d, "tr")[1], "td").length === 1; } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "แท็ก &lt;tr&gt; หมายถึงอะไร", c: ["หนึ่งช่องข้อมูล", "หนึ่งแถว", "หัวตาราง", "ชื่อตาราง"], a: 1, e: "tr = table row ส่วน td = table data (หนึ่งช่อง)" },
              { t: "tf", q: "ควรใช้ตารางจัดเลย์เอาต์ของหน้าเว็บทั้งหน้า", a: false, e: "ตารางใช้แสดงข้อมูลตารางเท่านั้น เลย์เอาต์ควรใช้ CSS Flexbox/Grid" },
              { t: "fill", q: "แอตทริบิวต์ที่ผสานช่องในแนวนอนคือ ___", a: ["colspan"], e: "colspan ผสานแนวนอน rowspan ผสานแนวตั้ง" },
              { t: "order", q: "เรียงส่วนประกอบของตารางจากบนลงล่าง", items: ["&lt;caption&gt;", "&lt;thead&gt;", "&lt;tbody&gt;", "&lt;tfoot&gt;"], e: "caption ต้องเป็นแท็กแรกใน table" },
              { t: "mc", q: "ช่องหัวตารางที่ตัวหนาและจัดกึ่งกลางอัตโนมัติคือ", c: ["&lt;td&gt;", "&lt;th&gt;", "&lt;tr&gt;", "&lt;thead&gt;"], a: 1, e: "th = table header" }
            ]
          }
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
          { title: "ตรวจข้อมูลอัตโนมัติ", desc: "ใส่แอตทริบิวต์ไม่กี่ตัว เบราว์เซอร์ก็ตรวจให้ฟรีโดยไม่ต้องเขียน JavaScript เลย", goal: 'ทำให้ช่องอีเมล <b>required</b> และช่องอายุ <b>required</b> พร้อมกำหนด <b>min="1"</b> และ <b>max="120"</b>', starter: `<form>\n  <input type="email" name="email">\n  <input type="number" name="age">\n  <button type="submit">สมัคร</button>\n</form>\n`, hint: 'เพิ่ม required ในทั้งสองช่อง และ min/max ในช่อง number', xp: 80, check: (o, c, d) => { const e = W.q(d, 'input[type="email"]'), a = W.q(d, 'input[type="number"]'); return !!e && e.hasAttribute("required") && !!a && a.hasAttribute("required") && W.attr(d, a, "min") === "1" && W.attr(d, a, "max") === "120"; } },
          { html: ``, title: "ฟอร์มสมัครสมาชิกเต็มรูปแบบ", desc: "รวมทุกอย่างในหน่วยนี้: label ครบทุกช่อง ชนิดถูกต้อง และตรวจสอบข้อมูลอัตโนมัติ", goal: 'สร้างฟอร์มที่มี <b>label for="uname"</b> คู่กับ <b>input id="uname" name="username" required</b>, <b>input type="email" name="email" required</b>, <b>select name="plan"</b> ที่มี 2 option และปุ่ม <b>submit</b>', starter: `<form>\n\n</form>\n`, hint: 'ไล่ทีละชิ้น: label+input ข้อความ → input อีเมล → select → button', xp: 100, check: (o, c, d) => { const u = W.q(d, "#uname"), l = W.q(d, 'label[for="uname"]'), e = W.q(d, 'input[type="email"]'), s = W.q(d, 'select[name="plan"]'); return !!l && !!u && W.attr(d, u, "name") === "username" && u.hasAttribute("required") && !!e && e.hasAttribute("required") && !!s && W.qa(s, "option").length >= 2 && W.has(d, 'button[type="submit"], input[type="submit"]'); } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "method ใดเหมาะกับการส่งรหัสผ่าน", c: ["GET", "POST", "PUT", "ไม่สำคัญ"], a: 1, e: "GET ต่อข้อมูลท้าย URL ซึ่งมองเห็นได้ POST ส่งแบบซ่อนในเนื้อหาคำขอ" },
              { t: "tf", q: "label ต้องมี for ตรงกับ id ของ input จึงจะผูกกัน", a: true, e: "คลิกที่ป้ายแล้วเคอร์เซอร์จะกระโดดเข้าช่องกรอก" },
              { t: "fill", q: "แอตทริบิวต์ที่บังคับว่าต้องกรอกข้อมูลคือ ___", a: ["required"], e: "เบราว์เซอร์จะไม่ยอมส่งฟอร์มถ้าช่องนี้ว่าง" },
              { t: "mc", q: "radio หลายตัวจะเลือกได้แค่ตัวเดียวเมื่อ", c: ["มี id เหมือนกัน", "มี name เหมือนกัน", "มี value เหมือนกัน", "อยู่ใน div เดียวกัน"], a: 1, e: "radio ที่ name เดียวกันคือกลุ่มเดียวกัน" },
              { t: "mc", q: "placeholder ต่างจาก label อย่างไร", c: ["เหมือนกัน", "placeholder หายไปเมื่อพิมพ์ จึงแทน label ไม่ได้", "placeholder อ่านได้ด้วยโปรแกรมอ่านหน้าจอเสมอ", "label ใช้ได้เฉพาะ checkbox"], a: 1, e: "placeholder เป็นแค่คำแนะนำจางๆ ควรมี label คู่กันเสมอ" }
            ]
          }
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
          { title: "ประกอบหน้าเว็บทั้งหน้า", desc: "รวมทุกอย่างที่เรียนมา: โครงหน้าเว็บมาตรฐานที่เว็บจริงใช้กัน header → nav → main → footer", goal: 'สร้างหน้าเว็บที่มีครบ 4 ส่วนตามลำดับ: <b>header</b> (มี h1 = <b>บล็อกของฉัน</b>), <b>nav</b>, <b>main</b> (มี article พร้อม h2 = <b>โพสต์แรก</b>), และ <b>footer</b> (ข้อความ <b>ติดต่อ: mali@example.com</b>)', starter: `<!DOCTYPE html>\n<html lang="th">\n<head>\n  <meta charset="UTF-8">\n  <title>บล็อกของฉัน</title>\n</head>\n<body>\n\n</body>\n</html>\n`, hint: 'เรียง header, nav, main (ข้างในมี article), footer ใน body', xp: 100, check: (o, c, d) => W.txt(d, "header h1") === "บล็อกของฉัน" && W.has(d, "nav") && W.txt(d, "main article h2") === "โพสต์แรก" && W.txt(d, "footer").includes("mali@example.com") },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "แท็กใดใช้เก็บเมนูนำทางหลักของเว็บ", c: ["&lt;menu&gt;", "&lt;nav&gt;", "&lt;header&gt;", "&lt;aside&gt;"], a: 1, e: "nav คือ navigation" },
              { t: "tf", q: "หนึ่งหน้าควรมี &lt;main&gt; เพียงตัวเดียว", a: true, e: "main คือเนื้อหาหลักที่ไม่ซ้ำกับส่วนอื่นของเว็บ" },
              { t: "mc", q: "id ต่างจาก class อย่างไร", c: ["เหมือนกัน", "id ใช้ได้ครั้งเดียวต่อหน้า class ใช้ซ้ำได้", "class ใช้ได้ครั้งเดียว", "id ใช้ได้เฉพาะ div"], a: 1, e: "id ต้องไม่ซ้ำกัน class ใช้จัดกลุ่มหลายอิลิเมนต์" },
              { t: "fill", q: "meta ที่ทำให้เว็บแสดงผลบนมือถือถูกต้องคือ name=\"___\"", a: ["viewport"], e: "content=\"width=device-width, initial-scale=1.0\"" },
              { t: "order", q: "เรียงส่วนของโครงหน้าเว็บมาตรฐานจากบนลงล่าง", items: ["&lt;header&gt;", "&lt;nav&gt;", "&lt;main&gt;", "&lt;footer&gt;"], e: "นี่คือโครงที่เว็บส่วนใหญ่ใช้กัน" }
            ]
          }
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
          { title: "บอสหน่วย: การ์ดโปรไฟล์", desc: "รวมทุกอย่างในคอร์ส HTML: semantic, รูปพร้อม alt, ลิสต์, ลิงก์, data attribute และการเข้าถึง", goal: 'สร้าง <b>article class="card"</b> ที่ข้างในมีครบ: <b>img</b> (alt=<b>รูปโปรไฟล์</b>), <b>h2</b> = <b>มะลิ นักพัฒนาเว็บ</b>, <b>ul</b> ที่มี 2 li (<b>HTML</b>, <b>CSS</b>) และ <b>a</b> ที่ href = <b>mailto:mali@example.com</b>', starter: `<article class="card">\n\n</article>\n`, hint: 'ใส่ img, h2, ul>li สองตัว และ a href="mailto:..." ไว้ใน article', xp: 120, check: (o, c, d) => { const card = W.q(d, "article.card"); if (!card) return false; const li = W.qa(card, "ul li").map(e => W.txt(e)); return W.attr(d, W.q(card, "img"), "alt") === "รูปโปรไฟล์" && W.txt(W.q(card, "h2")) === "มะลิ นักพัฒนาเว็บ" && li.join(",") === "HTML,CSS" && W.attr(d, W.q(card, "a"), "href") === "mailto:mali@example.com"; } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "JavaScript อ่านค่าของ data-price ได้ผ่านอะไร", c: ["element.price", "element.dataset.price", "element.data-price", "element.getData()"], a: 1, e: "แอตทริบิวต์ data-* อ่านผ่าน dataset" },
              { t: "tf", q: "ปุ่มที่มีแต่ไอคอนไม่มีข้อความ ควรใส่ aria-label บอกหน้าที่ของปุ่ม", a: true, e: "โปรแกรมอ่านหน้าจอจะอ่าน aria-label ให้ผู้ใช้ฟัง" },
              { t: "fill", q: "แอตทริบิวต์ที่ทำให้ script รอจน HTML โหลดเสร็จก่อนทำงานคือ ___", a: ["defer"], e: "defer ปลอดภัยกว่าและทำให้หน้าเว็บโหลดเร็วขึ้น" },
              { t: "mc", q: "แท็กใดทำกล่องพับเก็บได้โดยไม่ต้องเขียน JavaScript", c: ["&lt;dialog&gt;", "&lt;details&gt;", "&lt;section&gt;", "&lt;toggle&gt;"], a: 1, e: "details คู่กับ summary ที่เป็นหัวข้อให้กด" },
              { t: "mc", q: "การเชื่อมไฟล์ CSS ภายนอกใช้แท็กใด", c: ["&lt;style src&gt;", "&lt;link rel=\"stylesheet\"&gt;", "&lt;css&gt;", "&lt;script&gt;"], a: 1, e: "link วางไว้ใน head" }
            ]
          }
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
          { html: `<p class="note">หมายเหตุ</p>`, title: "คอมเมนต์ใน CSS", desc: "คอมเมนต์ CSS ใช้ /* */ เท่านั้น (ไม่มีแบบ // เหมือนภาษาอื่น)", goal: 'ใช้คอมเมนต์ <b>ปิด</b>บรรทัด background-color ไม่ให้ทำงาน (เหลือแค่สีตัวอักษร <b>green</b>)', starter: `.note {\n  color: green;\n  background-color: red;\n}\n`, hint: 'ครอบบรรทัดนั้นด้วย <code>/*</code> และ <code>*/</code>', xp: 40, check: (o, c, d) => W.cssColor(d, ".note", "color", "green") && !W.cssColor(d, ".note", "background-color", "red") && /\/\*/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ข้อใดเขียนกฎ CSS ได้ถูกต้อง", c: ["h1 = color: red", "h1 { color: red; }", "h1 (color: red)", "{h1: color red}"], a: 1, e: "selector ตามด้วย { property: value; }" },
              { t: "order", q: "เรียงความแรงของ selector จากแรงที่สุดไปอ่อนที่สุด", items: ["inline style", "#id", ".class", "element"], e: "inline 1000 > id 100 > class 10 > element 1" },
              { t: "tf", q: "คุณสมบัติ color ที่กำหนดให้ body จะตกทอดไปยังข้อความในลูกหลาน", a: true, e: "คุณสมบัติเกี่ยวกับข้อความส่วนใหญ่สืบทอดได้" },
              { t: "fill", q: "selector ที่เลือกตาม class ต้องขึ้นต้นด้วยเครื่องหมาย ___", a: ["."], e: "ส่วน id ใช้ #" },
              { t: "mc", q: "วิธีเชื่อม CSS ที่แนะนำสำหรับเว็บจริงคือ", c: ["inline", "internal", "external ไฟล์แยก", "เขียนใน JavaScript"], a: 2, e: "ไฟล์แยกใช้ซ้ำได้ทั้งเว็บและแก้ที่เดียว" }
            ]
          }
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
          { html: `<a href="#" class="btn">คลิกที่นี่</a>`, title: "ลบเส้นใต้ลิงก์", desc: "ลิงก์มีเส้นใต้มาโดยปริยาย เว็บสมัยใหม่มักลบออกแล้วแต่งเป็นปุ่มแทน", goal: 'ทำให้ <b>.btn</b> ไม่มีเส้นใต้ (<b>text-decoration: none</b>) ตัวพิมพ์ใหญ่ทั้งหมด (<b>text-transform: uppercase</b>) และสี <b>#2980b9</b>', starter: ``, hint: '<code>text-decoration: none; text-transform: uppercase;</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".btn", "text-decoration").includes("none") && W.cssv(d, ".btn", "text-transform") === "uppercase" && W.cssColor(d, ".btn", "color", "#2980b9") },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "rgba(0, 0, 0, 0.5) ค่าตัวที่สี่หมายถึงอะไร", c: ["ความสว่าง", "ความทึบ (alpha)", "สีน้ำเงิน", "ความหนา"], a: 1, e: "0 คือใสสนิท 1 คือทึบ" },
              { t: "tf", q: "ควรใส่ฟอนต์สำรองหลายตัวใน font-family ปิดท้ายด้วยชนิดทั่วไปเช่น sans-serif", a: true, e: "ถ้าเครื่องผู้ใช้ไม่มีฟอนต์แรก จะไล่ไปตัวถัดไป" },
              { t: "fill", q: "คุณสมบัติที่ลบเส้นใต้ลิงก์คือ text-decoration: ___", a: ["none"], e: "นิยมใช้เวลาแต่งลิงก์เป็นปุ่ม" },
              { t: "mc", q: "หน่วยใดปรับตามขนาดฟอนต์ที่ผู้ใช้ตั้งไว้ในเบราว์เซอร์ และแนะนำให้ใช้กับขนาดตัวอักษร", c: ["px", "rem", "cm", "pt"], a: 1, e: "rem อ้างอิงขนาดฟอนต์ราก ช่วยเรื่องการเข้าถึง" },
              { t: "mc", q: "line-height ที่อ่านสบายที่สุดสำหรับเนื้อหายาวอยู่ในช่วงใด", c: ["0.8 - 1.0", "1.5 - 1.8", "3 - 4", "10px"], a: 1, e: "ระยะห่างบรรทัดที่พอดีช่วยให้สายตาไม่ล้า" }
            ]
          }
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
          { h: "display พื้นฐาน", p: "<b>block</b> กินเต็มบรรทัด ขึ้นบรรทัดใหม่ (div, p, h1) • <b>inline</b> กว้างเท่าเนื้อหา อยู่ในบรรทัดเดียวกัน กำหนด width/height ไม่ได้ (span, a) • <b>inline-block</b> อยู่ในบรรทัดเดียวกันแต่กำหนดขนาดได้ • <b>none</b> ซ่อนหายไปเลย" },
          { h: "margin ยุบรวมกัน (Collapsing)", p: "พฤติกรรมที่ทำให้มือใหม่งงที่สุด: เมื่อกล่องสองอันวางต่อกันในแนวตั้ง <b>margin ล่างของอันบนกับ margin บนของอันล่างจะยุบรวมเป็นค่าเดียว</b> (เอาค่าที่มากกว่า ไม่ใช่บวกกัน) — เช่น 20px กับ 30px ได้ระยะห่างจริง 30px ไม่ใช่ 50px • เกิดเฉพาะแนวตั้ง และไม่เกิดใน Flexbox/Grid (อีกเหตุผลที่ควรใช้ gap แทน margin)" },
          { h: "หน่วยวัดที่ควรรู้", p: "<b>px</b> คงที่ แม่นยำ • <b>%</b> เทียบกับกล่องแม่ • <b>rem</b> เทียบกับขนาดฟอนต์ราก (ปกติ 16px) — เหมาะที่สุดสำหรับขนาดฟอนต์และระยะห่าง เพราะปรับตามที่ผู้ใช้ตั้งค่าเบราว์เซอร์ไว้ • <b>em</b> เทียบกับฟอนต์ของตัวเอง (ระวังการทบต้นเมื่อซ้อนกัน) • <b>vw/vh</b> เทียบกับขนาดหน้าจอ เหมาะกับ hero เต็มจอ" },
          { h: "💡 ระบบระยะห่างที่มืออาชีพใช้", p: "อย่าสุ่มตัวเลขไปเรื่อย ให้ใช้<b>สเกลคงที่</b> เช่น 4, 8, 12, 16, 24, 32, 48 แล้วเลือกจากชุดนี้เท่านั้น หน้าเว็บจะดูเป็นระเบียบขึ้นทันที • เก็บค่าไว้ในตัวแปร CSS แล้วเรียกใช้ทั้งเว็บ", code: ":root { --sp-2: 8px; --sp-4: 16px; }\n.card { padding: var(--sp-4); }" }
        ],
        stages: [
          { html: `<div class="box">กล่อง</div>`, title: "ขนาดและขอบใน", desc: "width/height คุมขนาดเนื้อหา padding คือช่องว่างด้านในรอบเนื้อหา", goal: 'ทำให้ <b>.box</b> มี <b>width: 200px</b>, <b>padding: 16px</b> และพื้นหลัง <b>#ecf0f1</b>', starter: ``, hint: '<code>.box { width: 200px; padding: 16px; background-color: #ecf0f1; }</code>', xp: 40, check: (o, c, d) => W.cssNum(d, ".box", "width") === 200 && W.cssNum(d, ".box", "padding-top") === 16 && W.cssColor(d, ".box", "background-color", "#ecf0f1") },
          { html: `<div class="card">การ์ด</div>`, title: "เส้นขอบและมุมโค้ง", desc: "border เขียนสามค่ารวดเดียว: หนา-แบบ-สี", goal: 'ทำให้ <b>.card</b> มี <b>border: 2px solid #34495e</b> และ <b>border-radius: 12px</b>', starter: ``, hint: '<code>border: 2px solid #34495e; border-radius: 12px;</code>', xp: 50, check: (o, c, d) => W.cssNum(d, ".card", "border-top-width") === 2 && W.cssv(d, ".card", "border-top-style") === "solid" && W.cssColor(d, ".card", "border-top-color", "#34495e") && W.cssNum(d, ".card", "border-radius") === 12 },
          { html: `<div class="box">กล่องหนึ่ง</div><div class="box">กล่องสอง</div>`, title: "ระยะห่างด้านนอก", desc: "margin ดันกล่องให้ห่างจากเพื่อนบ้าน เขียนย่อ 2 ค่า = บนล่าง / ซ้ายขวา", goal: 'ทำให้ <b>.box</b> มี <b>margin: 20px 10px</b> (บน-ล่าง 20px ซ้าย-ขวา 10px)', starter: ``, hint: '<code>margin: 20px 10px;</code>', xp: 50, check: (o, c, d) => W.cssNum(d, ".box", "margin-top") === 20 && W.cssNum(d, ".box", "margin-left") === 10 },
          { html: `<div class="wrap">กล่องกลางหน้า</div>`, title: "จัดกล่องให้อยู่กลาง", desc: "สูตรคลาสสิก: กำหนดความกว้าง แล้วใส่ margin ซ้ายขวาเป็น auto", goal: 'ทำให้ <b>.wrap</b> มี <b>width: 300px</b> และอยู่กลางหน้าด้วย <b>margin: 0 auto</b>', starter: ``, hint: '<code>width: 300px; margin: 0 auto;</code>', xp: 60, check: (o, c, d) => W.cssNum(d, ".wrap", "width") === 300 && W.cssv(d, ".wrap", "margin-left") === "auto" && W.cssv(d, ".wrap", "margin-right") === "auto" },
          { html: `<div class="btn">ปุ่ม</div>`, title: "box-sizing: border-box", desc: "ตั้งค่านี้แล้วคำนวณขนาดง่ายขึ้นมาก เพราะ width รวม padding และ border ให้แล้ว", goal: 'ทำให้ทุกอิลิเมนต์ (<b>*</b>) มี <b>box-sizing: border-box</b> และให้ <b>.btn</b> มี width 150px, padding 12px, border 3px solid black', starter: ``, hint: 'กฎแรก <code>* { box-sizing: border-box; }</code> แล้วค่อยกฎ .btn', xp: 60, check: (o, c, d) => W.cssv(d, ".btn", "box-sizing") === "border-box" && W.cssNum(d, ".btn", "width") === 150 && W.cssNum(d, ".btn", "padding-top") === 12 },
          { html: `<span class="tag">แท็ก</span><span class="tag">แท็ก</span><p class="hide">ซ่อนฉันที</p>`, title: "display: inline-block และ none", desc: "span เป็น inline กำหนดขนาดไม่ได้ ต้องเปลี่ยนเป็น inline-block ก่อน ส่วน none คือซ่อนหายไปเลย", goal: 'ทำให้ <b>.tag</b> เป็น <b>inline-block</b> พร้อม <b>padding: 4px 10px</b> และทำให้ <b>.hide</b> หายไปด้วย <b>display: none</b>', starter: ``, hint: '<code>.tag { display: inline-block; padding: 4px 10px; }</code> และ <code>.hide { display: none; }</code>', xp: 60, check: (o, c, d) => W.cssv(d, ".tag", "display") === "inline-block" && W.cssNum(d, ".tag", "padding-left") === 10 && W.cssv(d, ".hide", "display") === "none" },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "order", q: "เรียงชั้นของ Box Model จากในสุดออกไปนอกสุด", items: ["content", "padding", "border", "margin"], e: "padding อยู่ในเส้นขอบ margin อยู่นอกเส้นขอบ" },
              { t: "mc", q: "box-sizing: border-box ทำให้ width นับรวมอะไร", c: ["เฉพาะเนื้อหา", "เนื้อหา + padding + border", "รวม margin ด้วย", "ไม่นับอะไรเลย"], a: 1, e: "คำนวณขนาดง่ายขึ้นมาก จึงนิยมตั้งให้ทุกอิลิเมนต์" },
              { t: "tf", q: "margin แนวตั้งของสองกล่องที่ติดกันจะบวกกัน เช่น 20px + 30px = 50px", a: false, e: "margin แนวตั้งยุบรวมกัน (collapse) ได้ค่าที่มากกว่าคือ 30px" },
              { t: "fill", q: "สูตรจัดกล่องให้อยู่กลางแนวนอนคือ margin: 0 ___", a: ["auto"], e: "ต้องกำหนด width ด้วยจึงจะทำงาน" },
              { t: "mc", q: "อิลิเมนต์ display: inline กำหนดอะไรไม่ได้", c: ["สี", "width และ height", "ฟอนต์", "ขนาดตัวอักษร"], a: 1, e: "ต้องเปลี่ยนเป็น inline-block หรือ block ก่อน" }
            ]
          }
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
          { html: `<p id="special" class="text">ข้อความทดสอบความแรง</p>`, title: "ลำดับความแรง (Specificity)", desc: "เมื่อหลายกฎชี้ที่อิลิเมนต์เดียวกัน ตัวที่เจาะจงกว่าชนะ: id (100) > class (10) > element (1)", goal: 'เขียน 3 กฎให้ครบ: <b>p</b> สี blue, <b>.text</b> สี green, <b>#special</b> สี <b>#c0392b</b> — ผลลัพธ์สุดท้ายข้อความต้องเป็นสี <b>#c0392b</b> เพราะ id แรงที่สุด', starter: ``, hint: 'เขียนทั้งสามกฎตามลำดับ แล้วสังเกตว่าสีไหนชนะ', xp: 80, check: (o, c, d) => W.cssColor(d, "#special", "color", "#c0392b") && /^\s*p\s*\{/m.test(c) && /\.text\s*\{/.test(c) && /#special\s*\{/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>nav a</code> เลือกอะไร", c: ["a ที่อยู่ติดกับ nav", "a ทุกตัวที่อยู่ภายใน nav", "nav และ a ทั้งหมด", "a ที่เป็นลูกโดยตรงเท่านั้น"], a: 1, e: "เว้นวรรคคือเลือกลูกหลานทุกชั้น ส่วน &gt; คือลูกโดยตรง" },
              { t: "tf", q: "pseudo-element ::after ต้องมีคุณสมบัติ content เสมอจึงจะแสดงผล", a: true, e: "ถ้าไม่มี content จะไม่ถูกสร้างขึ้นมา" },
              { t: "fill", q: "pseudo-class ที่ทำงานตอนเมาส์ชี้คือ :___", a: ["hover"], e: "ใช้ทำเอฟเฟกต์ปุ่ม" },
              { t: "mc", q: "<code>li:nth-child(even)</code> เลือกอะไร", c: ["li ตัวแรก", "li ลำดับคู่", "li ลำดับคี่", "li ตัวสุดท้าย"], a: 1, e: "นิยมใช้ทำตารางลายทาง" },
              { t: "mc", q: "ถ้า .text กับ #special ชี้อิลิเมนต์เดียวกัน กำหนดสีต่างกัน สีไหนชนะ", c: [".text", "#special", "ตัวที่เขียนทีหลัง", "ตัวที่เขียนก่อน"], a: 1, e: "id มีความแรง (specificity) มากกว่า class" }
            ]
          }
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
          { html: `<div class="layout"><aside class="side">เมนู</aside><main class="content">เนื้อหาหลัก</main></div>`, title: "แบ่งพื้นที่ด้วย flex: 1", desc: "ตัวลูกที่ใส่ flex:1 จะยืดกินพื้นที่ว่างที่เหลือทั้งหมด — สูตรทำเลย์เอาต์ sidebar + เนื้อหา", goal: 'ทำให้ <b>.layout</b> เป็น flex, <b>.side</b> กว้างคงที่ <b>200px</b> และ <b>.content</b> ยืดเต็มที่เหลือด้วย <b>flex: 1</b>', starter: ``, hint: '<code>.side { width: 200px; }</code> และ <code>.content { flex: 1; }</code>', xp: 80, check: (o, c, d) => W.cssv(d, ".layout", "display") === "flex" && W.cssNum(d, ".side", "width") === 200 && (W.cssNum(d, ".content", "flex-grow") === 1 || /\.content\s*\{[^}]*flex\s*:\s*1/.test(c.replace(/\s+/g, " "))) },
          { html: `<div class="pricing"><div class="plan">ฟรี</div><div class="plan hot">มาตรฐาน</div><div class="plan">พรีเมียม</div></div>`, title: "การ์ดราคา 3 ใบเท่ากัน", desc: "งานจริงที่เจอบ่อยที่สุด: การ์ดหลายใบกว้างเท่ากัน เว้นระยะเท่ากัน และเรียงชิดบน", goal: 'ให้ <b>.pricing</b> เป็น flex, <b>gap: 16px</b>, <b>align-items: flex-start</b> และให้ <b>.plan</b> มี <b>flex: 1</b> กับ <b>padding: 24px</b>', starter: ``, hint: '<code>.pricing { display: flex; gap: 16px; align-items: flex-start; }</code> และ <code>.plan { flex: 1; padding: 24px; }</code>', xp: 80, check: (o, c, d) => W.cssv(d, ".pricing", "display") === "flex" && W.cssNum(d, ".pricing", "gap") === 16 && W.cssv(d, ".pricing", "align-items") === "flex-start" && W.cssNum(d, ".plan", "padding-top") === 24 && (W.cssNum(d, ".plan", "flex-grow") === 1 || /\.plan\s*\{[^}]*flex\s*:\s*1/.test(c.replace(/\s+/g, " "))) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ต้องใส่ display: flex ที่ไหน", c: ["ที่ลูกทุกตัว", "ที่กล่องแม่", "ที่ body เท่านั้น", "ที่ลูกตัวแรก"], a: 1, e: "ใส่ที่กล่องแม่ ลูกทุกตัวจะกลายเป็น flex item" },
              { t: "mc", q: "justify-content จัดตำแหน่งตามแกนใด", c: ["แกนหลัก", "แกนขวาง", "แกน z", "ทั้งสองแกน"], a: 0, e: "justify-content = แกนหลัก, align-items = แกนขวาง" },
              { t: "tf", q: "flex-wrap: wrap ทำให้ลูกขึ้นบรรทัดใหม่เมื่อพื้นที่ไม่พอ", a: true, e: "สำคัญมากสำหรับหน้าจอมือถือ" },
              { t: "fill", q: "ค่า justify-content ที่ดันตัวแรกชิดซ้าย ตัวสุดท้ายชิดขวาคือ space-___", a: ["between"], e: "สูตรยอดนิยมสำหรับทำแถบเมนู" },
              { t: "mc", q: "ลูกที่มี flex: 1 จะทำอะไร", c: ["หดเล็กที่สุด", "ยืดกินพื้นที่ว่างที่เหลือ", "หายไป", "อยู่บรรทัดใหม่"], a: 1, e: "ถ้าลูกหลายตัวมี flex: 1 จะแบ่งพื้นที่เท่ากัน" }
            ]
          }
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
          { html: `<div class="page"><header class="hd">หัว</header><aside class="sb">เมนู</aside><main class="mn">เนื้อหา</main><footer class="ft">ท้าย</footer></div>`, title: "โครงหน้าเว็บด้วย Grid", desc: "รวมทุกอย่าง: หัวและท้ายกินเต็มความกว้าง ตรงกลางแบ่งเป็นเมนูกับเนื้อหา", goal: 'ให้ <b>.page</b> เป็น grid <b>2 คอลัมน์</b> (<b>200px 1fr</b>) gap 10px โดย <b>.hd</b> และ <b>.ft</b> กิน <b>span 2</b> ทั้งคู่', starter: ``, hint: '<code>.page { display: grid; grid-template-columns: 200px 1fr; gap: 10px; }</code> แล้ว <code>.hd, .ft { grid-column: span 2; }</code>', xp: 100, check: (o, c, d) => W.cssv(d, ".page", "display") === "grid" && /200px\s+1fr/.test(W.cssv(d, ".page", "grid-template-columns") || c) && /span\s*2/.test(W.cssv(d, ".hd", "grid-column") || "") && /span\s*2/.test(W.cssv(d, ".ft", "grid-column") || "") },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "Grid ต่างจาก Flexbox อย่างไร", c: ["Grid จัดได้สองมิติ (แถวและคอลัมน์)", "Grid จัดได้แกนเดียว", "Grid ใช้ได้เฉพาะตาราง", "ไม่ต่างกัน"], a: 0, e: "Flexbox จัดแกนเดียว Grid จัดสองมิติพร้อมกัน" },
              { t: "fill", q: "หน่วย ___ ใน Grid หมายถึงสัดส่วนของพื้นที่ว่าง", a: ["fr"], e: "เช่น 1fr 2fr คอลัมน์ขวากว้างเป็นสองเท่า" },
              { t: "tf", q: "repeat(3, 1fr) มีความหมายเหมือน 1fr 1fr 1fr", a: true, e: "repeat ช่วยเขียนให้สั้นลง" },
              { t: "mc", q: "ทำให้ช่องหนึ่งกว้างคร่อม 2 คอลัมน์ด้วยอะไร", c: ["width: 2", "grid-column: span 2", "colspan: 2", "flex: 2"], a: 1, e: "span บอกจำนวนช่องที่จะคร่อม" },
              { t: "mc", q: "auto-fit ร่วมกับ minmax(200px, 1fr) ให้ผลอย่างไร", c: ["คอลัมน์คงที่ 200px", "ปรับจำนวนคอลัมน์ตามความกว้างจอเอง", "มีคอลัมน์เดียวเสมอ", "ซ่อนคอลัมน์ที่เกิน"], a: 1, e: "เป็นสูตรแกลเลอรีที่ตอบสนองทุกขนาดจอโดยไม่ต้องใช้ media query" }
            ]
          }
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
          { html: `<div class="scrollbox">เนื้อหายาวมากที่ล้นออกนอกกรอบ บรรทัดหนึ่ง บรรทัดสอง บรรทัดสาม บรรทัดสี่ บรรทัดห้า</div>`, title: "เนื้อหาล้นกรอบ", desc: "overflow: auto ใส่แถบเลื่อนให้เฉพาะตอนที่เนื้อหาล้นจริงๆ", goal: 'ทำให้ <b>.scrollbox</b> สูง <b>80px</b> และมี <b>overflow: auto</b> พร้อม border 1px solid gray', starter: ``, hint: '<code>height: 80px; overflow: auto; border: 1px solid gray;</code>', xp: 60, check: (o, c, d) => W.cssNum(d, ".scrollbox", "height") === 80 && ["auto", "scroll"].includes(W.cssv(d, ".scrollbox", "overflow")) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "position ใดตรึงอยู่กับหน้าจอแม้เลื่อนหน้า", c: ["relative", "absolute", "fixed", "static"], a: 2, e: "fixed ใช้ทำแถบเมนูติดบนสุด" },
              { t: "tf", q: "อิลิเมนต์ absolute จะอ้างอิงตำแหน่งจากกล่องแม่ตัวใกล้ที่สุดที่ position ไม่ใช่ static", a: true, e: "จึงต้องใส่ position: relative ที่กล่องแม่" },
              { t: "fill", q: "คุณสมบัติที่กำหนดว่าอิลิเมนต์ไหนอยู่ชั้นบนคือ z-___", a: ["index"], e: "เลขมากกว่าอยู่ชั้นบน ใช้ได้กับอิลิเมนต์ที่ไม่ใช่ static" },
              { t: "mc", q: "overflow: auto ทำอะไร", c: ["ซ่อนส่วนที่ล้นเสมอ", "แสดงแถบเลื่อนเมื่อเนื้อหาล้นจริงเท่านั้น", "ขยายกล่องอัตโนมัติ", "ไม่มีผลอะไร"], a: 1, e: "scroll จะแสดงแถบเลื่อนตลอดแม้เนื้อหาไม่ล้น" },
              { t: "mc", q: "position: static คือ", c: ["ค่าเริ่มต้นตามลำดับปกติ", "ตรึงกับหน้าจอ", "ลอยอิสระ", "ติดเมื่อเลื่อนถึง"], a: 0, e: "top/left ไม่มีผลกับ static" }
            ]
          }
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
          { html: `<div class="profile"><div class="avatar">รูป</div><div class="info"><h3>มะลิ</h3><p>นักพัฒนาเว็บ</p></div></div>`, title: "บอสหน่วย: การ์ดโปรไฟล์สวยๆ", desc: "รวมทุกอย่างในคอร์ส CSS: ตัวแปร Flexbox เงา มุมโค้ง และทรานสิชัน", goal: 'ทำให้ <b>.profile</b>: เป็น <b>flex</b>, <b>gap: 16px</b>, <b>align-items: center</b>, <b>padding: 20px</b>, <b>border-radius: 16px</b>, <b>box-shadow</b> (มีค่าเบลอ 12px), และ <b>background: var(--card-bg)</b> โดยประกาศ <b>--card-bg: #ffffff</b> ที่ :root', starter: ``, hint: 'ประกาศตัวแปรที่ :root ก่อน แล้วเขียนกฎ .profile ให้ครบทุกข้อ', xp: 120, check: (o, c, d) => { const s = c.replace(/\s+/g, " "); return W.cssv(d, ".profile", "display") === "flex" && W.cssNum(d, ".profile", "gap") === 16 && W.cssv(d, ".profile", "align-items") === "center" && W.cssNum(d, ".profile", "padding-top") === 20 && W.cssNum(d, ".profile", "border-radius") === 16 && W.cssv(d, ".profile", "box-shadow").includes("12px") && /--card-bg\s*:\s*#ffffff/i.test(s) && /var\(\s*--card-bg\s*\)/.test(s); } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ตัวแปร CSS ประกาศและเรียกใช้อย่างไร", c: ["$main และ @main", "--main: ค่า; และ var(--main)", "@var main", "main = ค่า"], a: 1, e: "นิยมประกาศไว้ที่ :root" },
              { t: "tf", q: "ควรใส่ transition ไว้ที่สถานะปกติ ไม่ใช่ที่ :hover เพื่อให้นุ่มนวลทั้งขาไปและขากลับ", a: true, e: "ถ้าใส่ที่ :hover ตอนเอาเมาส์ออกจะกระโดดกลับทันที" },
              { t: "fill", q: "กฎที่ใช้กำหนดช่วงการเคลื่อนไหวของแอนิเมชันคือ @___", a: ["keyframes"], e: "แล้วเรียกใช้ด้วยคุณสมบัติ animation" },
              { t: "mc", q: "@media (max-width: 600px) ทำงานเมื่อใด", c: ["จอกว้างกว่า 600px", "จอกว้างไม่เกิน 600px", "ทุกขนาดจอ", "เฉพาะตอนพิมพ์"], a: 1, e: "ใช้เขียนสไตล์สำหรับจอมือถือ" },
              { t: "mc", q: "แนวคิด mobile-first คืออะไร", c: ["ทำเว็บเฉพาะมือถือ", "เขียนสไตล์มือถือเป็นพื้นฐานแล้วเพิ่มสำหรับจอใหญ่ด้วย min-width", "ห้ามใช้ media query", "ทำแอปมือถือก่อนเว็บ"], a: 1, e: "ทำให้เว็บเบาและรองรับผู้ใช้มือถือที่เป็นส่วนใหญ่" }
            ]
          }
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
          { title: "แปลงชนิดข้อมูล", desc: "ข้อมูลจากช่องกรอกเป็น string เสมอ ต้องแปลงเป็นตัวเลขก่อนคำนวณ ไม่งั้นจะกลายเป็นการต่อข้อความ", goal: 'มี a = "10" และ b = "5" (เป็นข้อความ) แสดง 2 บรรทัด: ผลบวกแบบข้อความ (<b>105</b>) และผลบวกหลังแปลงเป็นตัวเลขด้วย <b>Number()</b> (<b>15</b>)', starter: `const a = "10";\nconst b = "5";\n`, hint: '<code>console.log(a + b);</code> แล้ว <code>console.log(Number(a) + Number(b));</code>', xp: 60, check: (o, c) => lines(o).join(",") === "105,15" && /Number\(/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "คำสำคัญใดประกาศตัวแปรที่เปลี่ยนค่าไม่ได้", c: ["var", "let", "const", "static"], a: 2, e: "ควรใช้ const เป็นค่าเริ่มต้น แล้วเปลี่ยนเป็น let เมื่อต้องแก้ค่า" },
              { t: "mc", q: "<code>\"10\" + 5</code> ได้ผลลัพธ์อะไร", c: ["15", "\"105\"", "Error", "NaN"], a: 1, e: "เมื่อ + เจอข้อความ จะกลายเป็นการต่อข้อความ" },
              { t: "tf", q: "<code>typeof null</code> ให้ผลเป็น \"object\"", a: true, e: "เป็นข้อผิดพลาดดั้งเดิมของภาษาที่ถูกเก็บไว้เพื่อความเข้ากันได้" },
              { t: "fill", q: "template literal ใช้เครื่องหมาย backtick และแทรกค่าด้วย ___{ }", a: ["$"], e: "เช่น `สวัสดี ${name}`" },
              { t: "mc", q: "ไม่ควรใช้ var ในโค้ดสมัยใหม่เพราะอะไร", c: ["ช้ากว่า", "มีปัญหาเรื่องขอบเขตของตัวแปร", "ใช้ได้เฉพาะตัวเลข", "เบราว์เซอร์ไม่รองรับ"], a: 1, e: "var ไม่มี block scope ทำให้เกิดบั๊กได้ง่าย" }
            ]
          }
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
          { title: "เมนูด้วย switch", desc: "switch อ่านง่ายกว่า if ยาวๆ เมื่อเทียบกับค่าที่แน่นอนหลายค่า", desc2: "", goal: 'มี day = 3 ใช้ <b>switch</b>: 1 = <b>จันทร์</b>, 2 = <b>อังคาร</b>, 3 = <b>พุธ</b>, default = <b>ไม่ทราบ</b> (ต้องได้ <b>พุธ</b>)', starter: `const day = 3;\n`, hint: '<code>switch (day) { case 1: ... break; ... default: ... }</code>', xp: 60, check: (o, c) => eq(o, "พุธ") && /switch/.test(c) && /break/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "<code>\"5\" === 5</code> ได้ผลอะไร", c: ["true", "false", "Error", "undefined"], a: 1, e: "=== เทียบทั้งค่าและชนิด จึงเป็น false" },
              { t: "tf", q: "ควรใช้ === แทน == เสมอในโค้ด JavaScript สมัยใหม่", a: true, e: "== แปลงชนิดให้อัตโนมัติ ทำให้เกิดผลลัพธ์ที่คาดไม่ถึง" },
              { t: "mc", q: "ค่าใดเป็น falsy", c: ["\"0\"", "[]", "0", "\"false\""], a: 2, e: "falsy มี false, 0, \"\", null, undefined, NaN ส่วน \"0\" กับ [] เป็น truthy" },
              { t: "fill", q: "ใน switch ต้องใส่ ___ ท้ายแต่ละ case เพื่อไม่ให้ไหลไป case ถัดไป", a: ["break"], e: "ถ้าลืมจะเกิด fall-through" },
              { t: "mc", q: "<code>username || \"ผู้เยี่ยมชม\"</code> เมื่อ username เป็น \"\" ได้อะไร", c: ["\"\"", "\"ผู้เยี่ยมชม\"", "false", "Error"], a: 1, e: "|| คืนค่าแรกที่เป็น truthy ใช้กำหนดค่าสำรอง" }
            ]
          }
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
          { title: "วนอ่านด้วย for...of", desc: "for...of หยิบค่าในอาร์เรย์มาให้ตรงๆ ไม่ต้องยุ่งกับดัชนี", goal: 'ใช้ <b>for...of</b> แสดงผลไม้ทุกตัวในอาร์เรย์ (บรรทัดละตัว)', starter: `const fruits = ["แอปเปิล", "กล้วย", "ส้ม"];\n`, hint: '<code>for (const f of fruits) { console.log(f); }</code>', xp: 60, check: (o, c) => lines(o).join(",") === "แอปเปิล,กล้วย,ส้ม" && /for\s*\(\s*(const|let)\s+\w+\s+of\s+/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "for...of ใช้วนอ่านอะไร", c: ["คีย์ของออบเจ็กต์", "ค่าในอาร์เรย์หรือข้อความ", "ตัวเลขเท่านั้น", "ฟังก์ชัน"], a: 1, e: "for...in ใช้วนคีย์ของออบเจ็กต์" },
              { t: "tf", q: "do-while ทำงานอย่างน้อยหนึ่งรอบเสมอ", a: true, e: "ทำก่อนแล้วค่อยเช็คเงื่อนไข" },
              { t: "fill", q: "คำสั่งที่ข้ามรอบปัจจุบันไปรอบถัดไปคือ ___", a: ["continue"], e: "break ออกจากลูป continue ข้ามรอบ" },
              { t: "order", q: "เรียงผลลัพธ์ของ <code>for (let i = 3; i > 0; i--) console.log(i)</code>", items: ["3", "2", "1"], e: "i-- ลดค่าทีละ 1 และหยุดเมื่อ i ไม่มากกว่า 0" },
              { t: "mc", q: "ลูปใดวนไม่รู้จบ", c: ["for (let i=0; i<3; i++)", "while (true) { }", "for (const x of [1,2])", "do { i++ } while (i < 3)"], a: 1, e: "while (true) ที่ไม่มี break จะค้างตลอด" }
            ]
          }
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
          { title: "Callback ฟังก์ชันในฟังก์ชัน", desc: "ส่งฟังก์ชันเข้าไปให้อีกฟังก์ชันเรียกใช้ — พื้นฐานของ event และ async", goal: 'สร้าง <b>repeat(n, fn)</b> ที่เรียก fn ซ้ำ n ครั้ง แล้วเรียก <b>repeat(3, () => console.log("ทำ"))</b> (ต้องได้ <b>ทำ</b> 3 บรรทัด)', starter: ``, hint: 'ในฟังก์ชันวนลูป n รอบแล้วเรียก <code>fn();</code>', xp: 80, check: (o, c) => lines(o).join(",") === "ทำ,ทำ,ทำ" && /repeat\s*\(/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ข้อใดคือ arrow function ที่คืนค่าคูณสอง", c: ["x => x * 2", "function => x * 2", "x -> x * 2", "(x) { x * 2 }"], a: 0, e: "arrow function บรรทัดเดียวคืนค่าอัตโนมัติไม่ต้องเขียน return" },
              { t: "tf", q: "ฟังก์ชันใน JavaScript ส่งเป็นพารามิเตอร์ให้ฟังก์ชันอื่นได้", a: true, e: "เรียกว่า callback เป็นพื้นฐานของ event และงาน async" },
              { t: "fill", q: "<code>function greet(name = \"คุณ\")</code> — \"คุณ\" เรียกว่าค่า ___ ของพารามิเตอร์", a: ["เริ่มต้น", "default"], e: "ใช้เมื่อผู้เรียกไม่ได้ส่งค่ามา" },
              { t: "mc", q: "ตัวแปรที่ประกาศด้วย let ภายใน { } มองเห็นได้ที่ไหน", c: ["ทั้งโปรแกรม", "เฉพาะในบล็อกนั้น", "เฉพาะในฟังก์ชันแม่", "เฉพาะบรรทัดเดียว"], a: 1, e: "let และ const มี block scope" },
              { t: "mc", q: "โค้ดหลังคำสั่ง return ในฟังก์ชันจะ", c: ["ทำงานต่อ", "ไม่ทำงาน", "ทำงานก่อน return", "เกิด Error"], a: 1, e: "return จบการทำงานของฟังก์ชันทันที" }
            ]
          }
        ]
      },
      {
        id: "jsarray", icon: "js", title: "หน่วยที่ 5: อาร์เรย์",
        blurb: "เก็บข้อมูลเป็นชุด เพิ่ม-ลบ และเมท็อดทรงพลัง map / filter / reduce",
        lesson: [
          { h: "สร้างและเข้าถึงอาร์เรย์", p: "อาร์เรย์เก็บหลายค่าใน [ ] เข้าถึงด้วยดัชนีเริ่มที่ <b>0</b> • <code>.length</code> จำนวนสมาชิก • ตัวสุดท้ายคือ <code>arr[arr.length - 1]</code> หรือ <code>arr.at(-1)</code>", code: "const fruits = [\"แอปเปิล\", \"กล้วย\"];\nconsole.log(fruits[0]);      // แอปเปิล\nconsole.log(fruits.length);  // 2" },
          { h: "เพิ่มและลบสมาชิก", p: "<b>push()</b> เพิ่มท้าย • <b>pop()</b> ลบท้าย • <b>unshift()</b> เพิ่มหน้า • <b>shift()</b> ลบหน้า • <b>splice(ตำแหน่ง, จำนวน)</b> ลบ/แทรกตรงกลาง • <b>slice(a, b)</b> ตัดสำเนาออกมาโดยไม่แก้ต้นฉบับ" },
          { h: "map, filter, reduce — สามทหารเสือ", p: "<b>map()</b> แปลงทุกตัวเป็นค่าใหม่ ได้อาร์เรย์ใหม่ขนาดเท่าเดิม • <b>filter()</b> คัดเฉพาะตัวที่ผ่านเงื่อนไข • <b>reduce()</b> ยุบทั้งอาร์เรย์ให้เหลือค่าเดียว (เช่น ผลรวม) — สามตัวนี้คือหัวใจของการเขียน JavaScript สมัยใหม่ ใช้แทนลูป for ได้เกือบทุกกรณี", code: "const n = [1, 2, 3, 4];\nconsole.log(n.map(x => x * 2));      // [2,4,6,8]\nconsole.log(n.filter(x => x > 2));   // [3,4]\nconsole.log(n.reduce((s, x) => s + x, 0)); // 10" },
          { h: "ค้นหาและจัดการอื่นๆ", p: "<b>find()</b> หาตัวแรกที่ตรงเงื่อนไข • <b>includes()</b> มีค่านี้ไหม • <b>indexOf()</b> อยู่ตำแหน่งไหน • <b>sort()</b> เรียงลำดับ (ตัวเลขต้องใส่ฟังก์ชันเทียบ <code>(a,b) => a-b</code>) • <b>join()</b> รวมเป็นข้อความ • <b>reverse()</b> กลับด้าน • <b>forEach()</b> วนทำทีละตัว" },
          { h: "⚠️ เมท็อดที่แก้ต้นฉบับ vs สร้างใหม่", p: "แยกให้ออกว่าอันไหน<b>แก้อาร์เรย์เดิม (mutating)</b>: push, pop, shift, unshift, splice, sort, reverse — และอันไหน<b>คืนอาร์เรย์ใหม่</b>: map, filter, slice, concat • บั๊กยอดฮิตคือใช้ <code>sort()</code> แล้วเผลอทำลายลำดับต้นฉบับที่โค้ดส่วนอื่นใช้อยู่ — ถ้าไม่อยากให้เดิมเปลี่ยน ให้คัดลอกก่อนด้วย <code>[...arr].sort()</code>" },
          { h: "⚠️ sort() เรียงแบบข้อความ", p: "<code>[10, 9, 100].sort()</code> ได้ <code>[10, 100, 9]</code> เพราะเรียงตามรหัสตัวอักษร ไม่ใช่ค่าตัวเลข — ต้องใส่ฟังก์ชันเทียบเสมอ: <code>(a, b) => a - b</code> น้อยไปมาก และ <code>(a, b) => b - a</code> มากไปน้อย" },
          { h: "💡 ต่อเมท็อดเป็นลูกโซ่ (Chaining)", p: "map/filter คืนอาร์เรย์ใหม่ จึงต่อกันได้เป็นประโยคเดียวที่อ่านเหมือนภาษาอังกฤษ — วิธีเขียนที่เป็นมาตรฐานของ JavaScript สมัยใหม่", code: "const total = orders\n  .filter(o => o.paid)\n  .map(o => o.price)\n  .reduce((s, p) => s + p, 0);" }
        ],
        stages: [
          { title: "เข้าถึงสมาชิก", desc: "ดัชนีเริ่มที่ 0 เสมอ", goal: 'แสดง 2 บรรทัด: สมาชิก<b>ตัวแรก</b> และ <b>จำนวนสมาชิก</b> (ต้องได้ <b>แอปเปิล</b> และ <b>3</b>)', starter: `const fruits = ["แอปเปิล", "กล้วย", "ส้ม"];\n`, hint: '<code>fruits[0]</code> และ <code>fruits.length</code>', xp: 40, check: (o) => lines(o).join(",") === "แอปเปิล,3" },
          { title: "เพิ่มและลบ", desc: "push เพิ่มท้าย pop ลบท้าย — ทั้งคู่แก้อาร์เรย์ต้นฉบับ", goal: 'เพิ่ม <b>"มะม่วง"</b> ต่อท้าย แล้วลบตัวสุดท้ายออกด้วย <b>pop()</b> จากนั้นแสดงจำนวนสมาชิก (ต้องได้ <b>2</b>)', starter: `const fruits = ["แอปเปิล", "กล้วย"];\n`, hint: '<code>fruits.push("มะม่วง");</code> แล้ว <code>fruits.pop();</code>', xp: 50, check: (o, c) => eq(o, "2") && /push/.test(c) && /pop/.test(c) },
          { title: "แปลงทุกตัวด้วย map", desc: "map สร้างอาร์เรย์ใหม่จากการแปลงทุกสมาชิก โดยไม่แตะต้นฉบับ", goal: 'ใช้ <b>map</b> คูณทุกตัวด้วย 2 แล้วแสดงผลลัพธ์ที่รวมด้วย <b>join(",")</b> (ต้องได้ <b>2,4,6,8</b>)', starter: `const nums = [1, 2, 3, 4];\n`, hint: '<code>const doubled = nums.map(x => x * 2);</code> แล้ว <code>console.log(doubled.join(","));</code>', xp: 60, check: (o, c) => eq(o, "2,4,6,8") && /\.map\(/.test(c) },
          { title: "คัดกรองด้วย filter", desc: "filter เก็บเฉพาะตัวที่เงื่อนไขเป็นจริง", goal: 'ใช้ <b>filter</b> เลือกเฉพาะเลขที่ <b>มากกว่า 50</b> แล้วแสดงด้วย join(",") (ต้องได้ <b>80,95</b>)', starter: `const scores = [45, 80, 30, 95];\n`, hint: '<code>scores.filter(s => s > 50)</code>', xp: 60, check: (o, c) => eq(o, "80,95") && /\.filter\(/.test(c) },
          { title: "รวมค่าด้วย reduce", desc: "reduce ยุบอาร์เรย์เหลือค่าเดียว — พารามิเตอร์ตัวที่สองคือค่าเริ่มต้น", goal: 'ใช้ <b>reduce</b> หาผลรวมของอาร์เรย์ (ต้องได้ <b>67</b>)', starter: `const nums = [12, 30, 25];\n`, hint: '<code>nums.reduce((sum, x) => sum + x, 0)</code>', xp: 80, check: (o, c) => eq(o, "67") && /\.reduce\(/.test(c) },
          { title: "ค้นหาด้วย find และ includes", desc: "find คืนตัวแรกที่ตรงเงื่อนไข ส่วน includes ตอบแค่มีหรือไม่มี", goal: 'แสดง 2 บรรทัด: ใช้ <b>find</b> หาเลขแรกที่มากกว่า 20 (ต้องได้ <b>30</b>) และใช้ <b>includes</b> เช็คว่ามีเลข 12 ไหม (ต้องได้ <b>true</b>)', starter: `const nums = [12, 30, 25];\n`, hint: '<code>nums.find(x => x > 20)</code> และ <code>nums.includes(12)</code>', xp: 60, check: (o, c) => lines(o).join(",") === "30,true" && /\.find\(/.test(c) && /\.includes\(/.test(c) },
          { title: "เรียงลำดับตัวเลข", desc: "sort() เรียงแบบข้อความโดยปริยาย ตัวเลขต้องใส่ฟังก์ชันเทียบเสมอ", goal: 'เรียงอาร์เรย์<b>จากน้อยไปมาก</b>ด้วย <b>sort((a, b) => a - b)</b> แล้วแสดงด้วย join(",") (ต้องได้ <b>5,12,30,100</b>)', starter: `const nums = [30, 5, 100, 12];\n`, hint: 'ถ้าใช้ sort() เฉยๆ จะได้ 100 มาก่อน 12 เพราะเรียงแบบข้อความ', xp: 80, check: (o, c) => eq(o, "5,12,30,100") && /sort\(\s*\(/.test(c) },
          { title: "สรุปยอดขายจากข้อมูลจริง", desc: "ต่อเมท็อดเป็นลูกโซ่: กรอง → แปลง → รวม ในประโยคเดียว แบบที่โค้ดมืออาชีพเขียนกัน", goal: 'หา<b>ยอดรวมเฉพาะรายการที่จ่ายแล้ว</b> (paid: true) ด้วย filter + map + reduce (ต้องได้ <b>350</b>)', starter: `const orders = [\n  { item: "กาแฟ", price: 50, paid: true },\n  { item: "เค้ก", price: 120, paid: false },\n  { item: "ชุดเซ็ต", price: 300, paid: true }\n];\n`, hint: '<code>orders.filter(o => o.paid).map(o => o.price).reduce((s, p) => s + p, 0)</code>', xp: 100, check: (o, c) => eq(o, "350") && /\.filter\(/.test(c) && /\.reduce\(/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "เมท็อดใดคืนอาร์เรย์ใหม่ที่ผ่านเงื่อนไขเท่านั้น", c: ["map", "filter", "reduce", "forEach"], a: 1, e: "filter คัดกรอง map แปลงทุกตัว reduce ยุบเหลือค่าเดียว" },
              { t: "mc", q: "<code>[10, 9, 100].sort()</code> ได้ผลอะไร", c: ["[9, 10, 100]", "[10, 100, 9]", "[100, 10, 9]", "Error"], a: 1, e: "sort() เรียงแบบข้อความ ต้องใส่ (a, b) => a - b สำหรับตัวเลข" },
              { t: "tf", q: "push() สร้างอาร์เรย์ใหม่โดยไม่แก้ต้นฉบับ", a: false, e: "push แก้อาร์เรย์เดิม (mutating) ส่วน map/filter คืนอาร์เรย์ใหม่" },
              { t: "fill", q: "อาร์เรย์ <code>[1, 2, 3]</code> มี .___ เท่ากับ 3", a: ["length"], e: "length คือคุณสมบัติ ไม่ใช่เมท็อด จึงไม่มีวงเล็บ" },
              { t: "order", q: "เรียงขั้นตอนการหายอดรวมของรายการที่จ่ายแล้ว", items: ["filter เลือกเฉพาะที่จ่ายแล้ว", "map ดึงเฉพาะราคา", "reduce รวมราคาทั้งหมด"], e: "การต่อเมท็อดเป็นลูกโซ่อ่านง่ายเหมือนประโยค" }
            ]
          }
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
          { title: "Destructuring และ Spread", desc: "สองไวยากรณ์สมัยใหม่ที่เจอในทุกโปรเจกต์ JavaScript ยุคนี้", goal: 'ใช้ <b>destructuring</b> ดึง name กับ hp ออกมาแล้วแสดง <b>มะลิ 100</b> จากนั้นใช้ <b>spread</b> สร้างสำเนาที่ hp = 50 แล้วแสดง hp ของสำเนา (ต้องได้ <b>50</b>)', starter: `const player = { name: "มะลิ", hp: 100 };\n`, hint: '<code>const { name, hp } = player;</code> และ <code>const copy = { ...player, hp: 50 };</code>', xp: 80, check: (o, c) => lines(o).join(",") === "มะลิ 100,50" && /const\s*\{[^}]*\}\s*=/.test(c) && /\.\.\./.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "เข้าถึงค่าในออบเจ็กต์เมื่อชื่อคีย์เก็บอยู่ในตัวแปร k ต้องเขียนแบบใด", c: ["obj.k", "obj[k]", "obj->k", "obj::k"], a: 1, e: "obj.k จะหาคีย์ชื่อ \"k\" ตรงตัว ไม่ใช่ค่าในตัวแปร" },
              { t: "tf", q: "ใช้ arrow function เป็นเมท็อดแล้วอ้าง this ได้ตามปกติ", a: false, e: "arrow function ไม่มี this ของตัวเอง ควรใช้รูปแบบเมท็อดปกติ" },
              { t: "fill", q: "<code>const { name } = player;</code> เรียกว่าการ ___", a: ["destructuring"], e: "ดึงค่าออกจากออบเจ็กต์มาเป็นตัวแปรในบรรทัดเดียว" },
              { t: "mc", q: "<code>{ ...player, hp: 50 }</code> ทำอะไร", c: ["แก้ player โดยตรง", "สร้างสำเนาใหม่ที่ hp เป็น 50", "ลบ hp", "Error"], a: 1, e: "spread (...) คลี่คุณสมบัติเดิมออกมาแล้วเขียนทับ hp" },
              { t: "mc", q: "Object.keys(obj) คืนค่าอะไร", c: ["จำนวนคีย์", "อาร์เรย์ของชื่อคีย์", "อาร์เรย์ของค่า", "ออบเจ็กต์ใหม่"], a: 1, e: "ส่วน Object.values() คืนอาร์เรย์ของค่า" }
            ]
          }
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
          { h: "สร้างและลบอิลิเมนต์", p: "<b>document.createElement(\"li\")</b> สร้างใหม่ • ตั้งค่าเนื้อหา แล้ว <b>parent.appendChild(el)</b> หรือ <b>parent.append(el)</b> เพื่อนำไปแปะ • <b>el.remove()</b> ลบทิ้ง • <b>setAttribute(ชื่อ, ค่า)</b> / <b>getAttribute()</b> จัดการแอตทริบิวต์" },
          { h: "⚠️ textContent ปลอดภัยกว่า innerHTML", p: "<b>innerHTML</b> แปลข้อความเป็น HTML จริง ถ้าเอาข้อมูลจากผู้ใช้มาใส่ตรงๆ ผู้ไม่หวังดีอาจแทรกสคริปต์เข้ามาได้ (ช่องโหว่ <b>XSS</b>) — ใช้ <b>textContent</b> เป็นค่าเริ่มต้นเสมอ แล้วใช้ innerHTML เฉพาะกับ HTML ที่เราสร้างเองและควบคุมได้" },
          { h: "⚠️ สคริปต์ทำงานก่อน HTML โหลดเสร็จ", p: "ถ้าวาง <code>&lt;script&gt;</code> ไว้ใน head โดยไม่มี <code>defer</code> โค้ดจะทำงานตั้งแต่ยังไม่มีอิลิเมนต์ในหน้า ทำให้ querySelector คืน <b>null</b> แล้วพังทันที — แก้ด้วยการใส่ <code>defer</code> หรือวาง script ไว้ท้าย body หรือครอบด้วย <code>DOMContentLoaded</code>", code: "document.addEventListener(\"DOMContentLoaded\", () => {\n  // โค้ดที่ต้องใช้ DOM อยู่ตรงนี้\n});" },
          { h: "💡 ประสิทธิภาพ: อย่าแตะ DOM ในลูป", p: "การแก้ DOM แต่ละครั้งมีต้นทุนสูง ถ้าต้องเพิ่มสมาชิก 100 ตัว อย่า appendChild ทีละตัวในลูป — ให้สร้างข้อความ HTML เก็บไว้ก่อนแล้วใส่ทีเดียว หรือใช้ <b>DocumentFragment</b> รวมไว้แล้วค่อยแปะครั้งเดียว" }
        ],
        stages: [
          { html: `<h1 id="title">ข้อความเดิม</h1>`, title: "เปลี่ยนข้อความในหน้าเว็บ", desc: "เลือกอิลิเมนต์ด้วย querySelector แล้วเปลี่ยน textContent — ดูผลได้ในพรีวิวด้านล่างเลย", goal: 'เปลี่ยนข้อความใน <b>#title</b> เป็น <b>เปลี่ยนด้วย JavaScript</b>', starter: `// เลือก #title แล้วเปลี่ยนข้อความ\n`, hint: '<code>document.querySelector("#title").textContent = "เปลี่ยนด้วย JavaScript";</code>', xp: 50, check: (o, c, d) => W.txt(d, "#title") === "เปลี่ยนด้วย JavaScript" },
          { html: `<div id="box">กล่อง</div>`, title: "เปลี่ยนสไตล์ด้วย JavaScript", desc: "element.style แก้ CSS ได้โดยตรง ชื่อคุณสมบัติที่มีขีดกลางเปลี่ยนเป็น camelCase", goal: 'ทำให้ <b>#box</b> มี <b>backgroundColor = "tomato"</b> และ <b>color = "white"</b>', starter: `const box = document.querySelector("#box");\n`, hint: '<code>box.style.backgroundColor = "tomato";</code>', xp: 60, check: (o, c, d) => W.cssColor(d, "#box", "background-color", "tomato") && W.cssColor(d, "#box", "color", "white") },
          { html: `<style>.active { border: 2px solid green; }</style><div id="card">การ์ด</div>`, title: "เพิ่มคลาสด้วย classList", desc: "วิธีที่มืออาชีพนิยม: กำหนดสไตล์ไว้ใน CSS แล้วให้ JavaScript แค่สลับคลาส", goal: 'เพิ่มคลาส <b>active</b> ให้ <b>#card</b> ด้วย <b>classList.add()</b>', starter: ``, hint: '<code>document.querySelector("#card").classList.add("active");</code>', xp: 60, check: (o, c, d) => { const el = W.q(d, "#card"); return !!el && el.classList.contains("active") && /classList\.add/.test(c); } },
          { html: `<ul id="list"><li>รายการเดิม</li></ul>`, title: "สร้างอิลิเมนต์ใหม่", desc: "createElement + appendChild คือวิธีเพิ่มเนื้อหาใหม่เข้าหน้าเว็บด้วยโค้ด", goal: 'สร้าง <b>li</b> ใหม่ข้อความ <b>รายการใหม่</b> แล้วเพิ่มเข้าไปใน <b>#list</b> (ต้องมี li ทั้งหมด 2 ตัว)', starter: `const list = document.querySelector("#list");\n`, hint: '<code>const li = document.createElement("li"); li.textContent = "รายการใหม่"; list.appendChild(li);</code>', xp: 80, check: (o, c, d) => { const li = W.qa(d, "#list li").map(e => W.txt(e)); return li.length === 2 && li[1] === "รายการใหม่" && /createElement/.test(c); } },
          { html: `<ul id="menu"><li>หนึ่ง</li><li>สอง</li><li>สาม</li></ul>`, title: "วนจัดการหลายอิลิเมนต์", desc: "querySelectorAll ได้หลายตัว นำมาวนด้วย forEach เพื่อจัดการทีเดียวทั้งหมด", goal: 'ใช้ <b>querySelectorAll</b> เลือก li ทุกตัวใน #menu แล้ววนเติมข้อความ <b> ✓</b> ต่อท้ายทุกตัว (เช่น <b>หนึ่ง ✓</b>)', starter: ``, hint: '<code>document.querySelectorAll("#menu li").forEach(li => { li.textContent += " ✓"; });</code>', xp: 80, check: (o, c, d) => { const li = W.qa(d, "#menu li").map(e => W.txt(e)); return li.join(",") === "หนึ่ง ✓,สอง ✓,สาม ✓" && /querySelectorAll/.test(c); } },
          { html: `<img id="pic" src="old.jpg" alt="รูปเดิม">`, title: "จัดการแอตทริบิวต์", desc: "เปลี่ยน src/alt ของรูปได้ด้วย setAttribute หรือกำหนดค่าตรงๆ", goal: 'เปลี่ยน <b>src</b> ของ #pic เป็น <b>new.jpg</b> และ <b>alt</b> เป็น <b>รูปใหม่</b>', starter: `const pic = document.querySelector("#pic");\n`, hint: '<code>pic.src = "new.jpg";</code> หรือ <code>pic.setAttribute("src", "new.jpg");</code>', xp: 60, check: (o, c, d) => W.attr(d, "#pic", "src").includes("new.jpg") && W.attr(d, "#pic", "alt") === "รูปใหม่" },
          { html: `<div id="app"></div>`, title: "สร้างการ์ดจากข้อมูล", desc: "รวมอาร์เรย์ของออบเจ็กต์เข้ากับ DOM — วิธีที่เว็บจริงใช้แสดงรายการสินค้าจากฐานข้อมูล", goal: 'วนอาร์เรย์ <b>items</b> สร้าง <b>&lt;p class="item"&gt;</b> ที่มีข้อความ <b>ชื่อ - ราคา</b> (เช่น <b>กาแฟ - 50</b>) ใส่ลงใน <b>#app</b> ทั้ง 2 รายการ', starter: `const items = [\n  { name: "กาแฟ", price: 50 },\n  { name: "ชาเย็น", price: 45 }\n];\nconst app = document.querySelector("#app");\n`, hint: 'วน forEach สร้าง p ตั้ง textContent แล้ว app.appendChild(p) และอย่าลืม <code>p.className = "item";</code>', xp: 100, check: (o, c, d) => { const p = W.qa(d, "#app p.item").map(e => W.txt(e)); return p.length === 2 && p[0] === "กาแฟ - 50" && p[1] === "ชาเย็น - 45"; } },
          { html: `<ul id="list"><li>หนึ่ง</li><li>สอง</li><li>สาม</li></ul>`, title: "ลบอิลิเมนต์ออกจากหน้า", desc: "remove() เอาอิลิเมนต์ออกจาก DOM ได้ทันที — ใช้ทำปุ่มลบรายการ", goal: 'ลบ <b>li ตัวสุดท้าย</b> ออกจาก #list ให้เหลือ 2 รายการ (ใช้ <b>remove()</b>)', starter: `const items = document.querySelectorAll("#list li");\n`, hint: '<code>items[items.length - 1].remove();</code>', xp: 80, check: (o, c, d) => { const li = W.qa(d, "#list li").map(e => W.txt(e)); return li.join(",") === "หนึ่ง,สอง" && /remove\(/.test(c); } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "DOM ย่อมาจากอะไร", c: ["Data Object Model", "Document Object Model", "Display Output Mode", "Dynamic Object Method"], a: 1, e: "หน้าเว็บที่ถูกแปลงเป็นออบเจ็กต์ให้ JavaScript แก้ไขได้" },
              { t: "tf", q: "textContent ปลอดภัยกว่า innerHTML เมื่อแสดงข้อมูลที่มาจากผู้ใช้", a: true, e: "innerHTML อาจเปิดช่องโหว่ XSS" },
              { t: "fill", q: "เมท็อดที่เลือกอิลิเมนต์ทั้งหมดตาม selector คือ document.querySelector___()", a: ["All"], e: "querySelector เลือกตัวแรก querySelectorAll เลือกทั้งหมด" },
              { t: "order", q: "เรียงขั้นตอนการเพิ่มรายการใหม่ลงในหน้าเว็บ", items: ["createElement(\"li\")", "กำหนด textContent", "appendChild เข้าไปในลิสต์"], e: "สร้าง → ตั้งค่า → แปะเข้าหน้าเว็บ" },
              { t: "mc", q: "วิธีที่มืออาชีพนิยมใช้เปลี่ยนหน้าตาอิลิเมนต์ด้วย JavaScript คือ", c: ["แก้ element.style ทีละคุณสมบัติ", "สลับคลาสด้วย classList แล้วกำหนดสไตล์ใน CSS", "ใช้ document.write", "ลบแล้วสร้างใหม่ทุกครั้ง"], a: 1, e: "แยกหน้าตาไว้ใน CSS ทำให้แก้ไขง่าย" }
            ]
          }
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
          { html: `<style>.done { text-decoration: line-through; }</style><ul id="todo"><li>งานที่หนึ่ง</li><li>งานที่สอง</li></ul>`, title: "บอสหน่วย: รายการที่กดติ๊กได้", desc: "รวม DOM + event + classList — เมื่อคลิกที่รายการไหน รายการนั้นถูกขีดฆ่า", goal: 'ทำให้ทุก <b>li</b> ใน #todo เมื่อ<b>คลิก</b>แล้วได้คลาส <b>done</b> (ใช้ querySelectorAll + forEach + addEventListener + classList)', starter: `const items = document.querySelectorAll("#todo li");\n`, hint: '<code>items.forEach(li => li.addEventListener("click", () => li.classList.add("done")));</code>', xp: 120, check: (o, c, d) => { const li = W.qa(d, "#todo li"); if (li.length !== 2) return false; li[1].click(); return li[1].classList.contains("done") && !li[0].classList.contains("done"); } },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "ผูกฟังก์ชันกับการคลิกปุ่มด้วยอะไร", c: ["btn.onClick()", "btn.addEventListener(\"click\", fn)", "btn.click(fn)", "btn.event(\"click\")"], a: 1, e: "addEventListener ผูกได้หลายฟังก์ชันกับเหตุการณ์เดียว" },
              { t: "tf", q: "e.preventDefault() ใน submit ป้องกันไม่ให้หน้าเว็บโหลดใหม่", a: true, e: "เพื่อให้เราจัดการข้อมูลฟอร์มด้วย JavaScript เอง" },
              { t: "fill", q: "อ่านค่าที่ผู้ใช้พิมพ์ในช่องกรอกผ่าน e.target.___", a: ["value"], e: "e.target คืออิลิเมนต์ที่เกิดเหตุการณ์" },
              { t: "mc", q: "เหตุการณ์ใดเกิดทุกครั้งที่ค่าในช่องกรอกเปลี่ยน", c: ["change", "input", "submit", "load"], a: 1, e: "change เกิดเมื่อออกจากช่องแล้วเท่านั้น" },
              { t: "mc", q: "เหตุการณ์ใดเกิดเมื่อ HTML โหลดเสร็จ", c: ["click", "DOMContentLoaded", "scroll", "resize"], a: 1, e: "ใช้เพื่อให้แน่ใจว่าอิลิเมนต์มีอยู่แล้วก่อนเลือกใช้" }
            ]
          }
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
          { title: "บอสใหญ่: สืบทอดคลาส", desc: "ด่านสุดท้ายของคอร์ส Web Developer! extends สืบทอดคุณสมบัติจากคลาสแม่ super() เรียก constructor ของแม่", goal: 'สร้าง <b>class Mage extends Hero</b> ที่ constructor รับ name และ mana (เรียก <b>super(name)</b>) และมีเมท็อด <b>cast()</b> คืน <b>ชื่อ ร่ายเวท พลัง มานา</b> — สร้าง Mage("มะลิ", 50) แล้วแสดงผล (ต้องได้ <b>มะลิ ร่ายเวท พลัง 50</b>)', starter: `class Hero {\n  constructor(name) {\n    this.name = name;\n  }\n}\n// สร้าง class Mage ที่สืบทอดจาก Hero\n`, hint: '<code>class Mage extends Hero { constructor(name, mana) { super(name); this.mana = mana; } cast() { return `${this.name} ร่ายเวท พลัง ${this.mana}`; } }</code>', xp: 150, check: (o, c) => eq(o, "มะลิ ร่ายเวท พลัง 50") && /extends/.test(c) && /super\(/.test(c) },
          {
            title: "📝 แบบทดสอบทฤษฎี",
            desc: "ทบทวนความเข้าใจภาคทฤษฎีของหัวข้อนี้ อ่านคำถามให้ละเอียด ถ้าตอบผิดจะมีคำอธิบายให้ แก้แล้วส่งใหม่ได้ไม่จำกัด",
            goal: "ตอบคำถามให้ถูกครบทั้ง 5 ข้อ (มีทั้งปรนัย ถูก/ผิด เติมคำ และเรียงลำดับ)",
            xp: 60,
            quiz: [
              { t: "mc", q: "JSON.parse ทำอะไร", c: ["แปลงออบเจ็กต์เป็นข้อความ", "แปลงข้อความ JSON เป็นออบเจ็กต์", "ส่งข้อมูลไปเซิร์ฟเวอร์", "ตรวจรูปแบบอีเมล"], a: 1, e: "JSON.stringify ทำตรงข้ามคือแปลงออบเจ็กต์เป็นข้อความ" },
              { t: "order", q: "<code>console.log(\"A\"); setTimeout(() => console.log(\"B\"), 0); console.log(\"C\");</code> เรียงผลลัพธ์", items: ["A", "C", "B"], e: "setTimeout รอคิวจนโค้ดปกติทำงานเสร็จก่อน แม้ตั้งเวลาเป็น 0" },
              { t: "tf", q: "await ใช้ได้เฉพาะภายในฟังก์ชันที่ประกาศด้วย async", a: true, e: "ยกเว้นในโมดูลที่รองรับ top-level await" },
              { t: "fill", q: "คลาสลูกสืบทอดคลาสแม่ด้วยคำว่า ___", a: ["extends"], e: "และเรียก super() เพื่อใช้ constructor ของแม่" },
              { t: "mc", q: "บล็อกใดดักข้อผิดพลาดไม่ให้โปรแกรมพังทั้งหน้า", c: ["if-else", "try-catch", "switch", "for"], a: 1, e: "finally ทำงานเสมอไม่ว่าจะพลาดหรือไม่" }
            ]
          }
        ]
      }
    ]
  }
};

/* ═══════════════ State ═══════════════ */
const CONTENT_VERSION = 82; // ต้องตรงกับ CONTENT_VERSION ใน server.js (เซิร์ฟเวอร์ปฏิเสธการบันทึกถ้าไม่ตรง)
let updateMode = false;       // true = หน้าเกมกับเซิร์ฟเวอร์คนละเวอร์ชัน → ยังไม่ส่งข้อมูลขึ้นเซิร์ฟเวอร์
let lastProof = null;         // หลักฐานการผ่านด่านล่าสุด (โค้ด/คำตอบ) ให้เซิร์ฟเวอร์ตรวจซ้ำ
let state = { user: null, level: 1, xp: 0, lang: null, topic: null, stage: 0, done: new Set() };
// สถานะโหมดห้องแข่งขัน (ประกาศไว้ก่อนเพราะ showScreen อ้างถึง)
const room = {
  active: false,   // กำลังแข่งอยู่ไหม (มีผลกับการนับคะแนนตอนผ่านด่าน)
  code: null,
  token: null,
  stages: [],      // ชุดโจทย์ที่เซิร์ฟเวอร์สุ่มมา (ทุกคนในห้องเหมือนกัน)
  index: 0,
  isHost: false,
  timer: null,
  score: 0
};
let attempts = 0; // จำนวนครั้งที่รันไม่ผ่านในด่านปัจจุบัน (ใช้ปลดล็อกคำใบ้)
const xpNeed = lv => Math.round(100 * Math.pow(lv, 1.5));
const doneKey = (lang, topic, stage) => `${lang}/${topic}/${stage}`;
/**
 * Course versioning: COURSES[lang].legacyTopics = หัวข้อของหลักสูตรรุ่นก่อน
 * ซ่อนจากแผนที่/ลำดับการล็อก/การสุ่มห้อง แต่ยังหาเจอ (ห้องที่ค้างอยู่ สถิติเหรียญ การตรวจคำตอบ)
 */
const findTopic = (lang, id) => {
  const c = COURSES[lang];
  return c && (c.topics.find(t => t.id === id) || (c.legacyTopics || []).find(t => t.id === id));
};
const isLegacyTopic = (lang, id) => !!(COURSES[lang] && (COURSES[lang].legacyTopics || []).some(t => t.id === id));
/** ใช้ Clang (WebAssembly) ไหม: C++ เสมอ · ภาษาที่คอร์สกำหนด compiler (เช่น C v2 = "c17") ยกเว้นหัวข้อ legacy ที่ยังใช้ตัวรันเดิม */
const usesClang = () => state.lang === "cpp" || (!!(COURSES[state.lang] || {}).compiler && !isLegacyTopic(state.lang, state.topic));
// Python v2: ด่านที่มีกรณีทดสอบ (tests[]) รันใน Web Worker ด้วย py/py-runtime.js · บท Python เดิม (รวม GUI จำลอง) ใช้ตัวรันเดิม
const usesPyTests = () => state.lang === "python" && !isLegacyTopic("python", state.topic) && !!(curTopic() && curTopic().stages[state.stage] && Array.isArray(curTopic().stages[state.stage].tests));
// บทกำหนดมาตรฐานเองได้ (เช่น Bonus Modern C ใช้ "c23") · ไม่กำหนดใช้ของหลักสูตร
const clangMode = () => state.lang === "cpp" ? "cpp" : ((findTopic(state.lang, state.topic) || {}).compiler || (COURSES[state.lang] || {}).compiler);
window.cqFindTopic = findTopic; window.cqUsesClang = usesClang; window.cqUsesPyTests = usesPyTests; window.cqClangMode = () => clangMode();
const curTopic = () => findTopic(state.lang, state.topic);
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
  $("roomScreen").classList.toggle("hide", name !== "room");
  $("landingScreen").classList.toggle("hide", name !== "landing");
  $("homeScreen").classList.toggle("hide", name !== "home");
  document.body.classList.toggle("on-landing", name === "landing");
  const learnLike = ["learn", "game", "lesson", "topic", "lang", "home"].includes(name);
  $("tabLearn").classList.toggle("on", learnLike && !room.active);
  $("boardBtn").classList.toggle("on", name === "board");
  $("roomBtn").classList.toggle("on", name === "room" || (learnLike && room.active));
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

/* ═══════════════ แผนที่ภารกิจ (หน้าหลัก) ═══════════════ */
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
    p.innerHTML = richText(sec.p);
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
async function api(path, body, extraHeaders) {
  const headers = Object.assign({ "X-CQ-Version": String(CONTENT_VERSION) }, body ? { "Content-Type": "application/json" } : {}, extraHeaders || {});
  let res;
  try {
    res = await fetch(path, { method: body ? "POST" : "GET", headers, body: body ? JSON.stringify(body) : undefined, credentials: "same-origin" });
  } catch (e) {
    console.warn("[Code Quest] network error", path, e);
    const err = new Error("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจอินเทอร์เน็ตแล้วลองอีกครั้ง");
    err.code = "NETWORK";
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (data.code === "VERSION") enterUpdateMode("server rejected write on " + path);
    if (res.status >= 500) console.warn("[Code Quest] server error", res.status, path, data);
    const err = new Error(data.error || (res.status >= 500 ? "ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง" : "เกิดข้อผิดพลาด"));
    err.code = data.code || ("HTTP_" + res.status);
    err.status = res.status;
    throw err;
  }
  return data;
}

/** ข้อมูลหลักสูตรโหลดแบบไม่บล็อกหน้า (course-loader.js) — ทุกเส้นทางที่เข้าสู่แอปต้องรอให้พร้อมก่อน */
function coursesReady() { return window.cqCoursesLoaded || !window.cqCoursesReady ? Promise.resolve() : window.cqCoursesReady; }
function applySession(data) {
  if (!window.cqCoursesLoaded && window.cqCoursesReady) return coursesReady().then(() => applySessionNow(data), () => applySessionNow(data));
  return applySessionNow(data);
}
function applySessionNow(data) {
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
  if (typeof goHome === "function") goHome(); else goLearn();
  offerImportPending();
}

/** มีความคืบหน้าที่ทำไว้ตอนยังไม่ล็อกอิน → ถามก่อนนำเข้าบัญชี (ไม่นำเข้าโดยไม่ถาม) */
async function offerImportPending() {
  const n = loadPending().length;
  if (!n || updateMode) return;
  const yes = confirm("พบความคืบหน้าที่ทำไว้ในเครื่องนี้ " + n + " ภารกิจ\nต้องการนำเข้าบัญชี " + state.user.name + " หรือไม่?\n\n(ระบบจะตรวจคำตอบทุกด่านซ้ำก่อนให้ EXP)");
  if (!yes) return;
  const r = await syncPending();
  if (!r) return;
  renderLangs(); goLearn();
  alert("นำเข้าเรียบร้อย\nผ่านการตรวจ " + r.ok + " ภารกิจ ได้ EXP เพิ่ม " + r.gained +
    (r.rejected ? "\nมี " + r.rejected + " ภารกิจที่คำตอบไม่ผ่านการตรวจ จึงไม่ได้นำเข้า" : "") +
    (r.left ? "\nอีก " + r.left + " ภารกิจจะลองส่งใหม่ภายหลัง" : ""));
}
/** ผู้เยี่ยมชม: แสดงด่านที่เคยผ่านไว้ในเครื่อง */
function restoreGuestProgress() {
  for (const p of loadPending()) state.done.add(doneKey(p.language, p.topic, p.stage));
}

async function tryRestore() {
  let data = null;
  try { data = await api("/api/me"); } catch { data = null; }
  if (data) {
    try { await applySession(data); } catch { data = null; }
  }
  if (!data) {
    // ผู้เยี่ยมชม: แสดงหน้าแรกทันที (ไม่ต้องรอข้อมูลหลักสูตร) แล้ววาดข้อมูลภาษาใหม่เมื่อหลักสูตรพร้อม
    restoreGuestProgress();
    renderXP(); renderLangs();
    if (typeof showLanding === "function") showLanding(); else $("authOverlay").classList.add("show");
    coursesReady().then(() => { renderXP(); renderLangs(); }, () => {});
  }
  coursesReady().then(reconnectRoom, reconnectRoom);
}

/* ═══════════════ Auth UI ═══════════════ */
let authMode = "login";
function setAuthMode(mode) {
  authMode = mode;
  const reg = mode === "register";
  $("tabLogin").className = reg ? "" : "on";
  $("tabRegister").className = reg ? "on" : "";
  $("tabLogin").setAttribute("aria-selected", String(!reg));
  $("tabRegister").setAttribute("aria-selected", String(reg));
  $("authTitle").textContent = reg ? "สมัครสมาชิก" : "เข้าสู่ระบบ";
  $("authSub").textContent = reg
    ? "สร้างบัญชีฟรีด้วยชื่อ อีเมล และรหัสผ่าน — ความคืบหน้าที่ทำไว้ในเครื่องนี้นำเข้าบัญชีได้"
    : "ล็อกอินเพื่อเก็บ EXP ขึ้นตารางอันดับ และเล่นต่อได้ทุกอุปกรณ์";
  $("fieldName").style.display = reg ? "block" : "none";
  $("inName").disabled = !reg;
  $("pwHint").style.display = reg ? "block" : "none";
  $("inPass").setAttribute("autocomplete", reg ? "new-password" : "current-password");
  $("inPass").setAttribute("minlength", reg ? "10" : "1");
  $("authSubmit").textContent = reg ? "สมัครและเริ่มเล่น" : "เข้าสู่ระบบ";
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
    if (window.__cqConfirmEmail && window.__cqConfirmEmail === body.email) body.confirmEmail = body.email; // ผู้ใช้ยืนยันว่าโดเมนถูกต้อง
    const data = await api(authMode === "login" ? "/api/login" : "/api/register", body);
    applySession(data);
  } catch (e) {
    $("authErr").textContent = e.message;
    $("authErr").className = "form-msg err";
  } finally {
    btn.disabled = false;
  }
};

$("guestBtn").onclick = () => { $("authOverlay").classList.remove("show"); if (typeof goHome === "function") goHome(); else goLearn(); };

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
    $("pfMsg").innerHTML = UIKit.AppIcon("check-circle", { size: 16 }) + " บันทึกเรียบร้อยแล้ว";
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

/** ซ่อนหน้าจอเริ่มต้นทันที (เดิมรอ Pyodide ~10MB จาก CDN ทำให้ทุกภาษาเปิดช้า) */
function hideBoot() {
  clearInterval(bootTimer);
  $("boot").classList.add("hide2");
  if (!window.cqPyState) window.cqPyState = "idle";
  document.dispatchEvent(new Event("cq:runtime"));
}
/** บท Python เดิม (รวม GUI จำลอง) ใช้ Pyodide บน main thread — โหลดเมื่อเปิดบทเหล่านี้ครั้งแรกเท่านั้น */
function ensureLegacyPy() {
  if (pyodide || window.cqPyState === "loading" || window.cqPyState === "ready") return;
  initPy();
}
async function initPy() {
  window.cqPyState = "loading"; // "loading" | "ready" | "error" — ให้ UI อ่านสถานะจริง
  document.dispatchEvent(new Event("cq:runtime"));
  try {
    // โหลด Pyodide จากเซิร์ฟเวอร์ของเราเมื่อเปิดบทเดิมจริงเท่านั้น (รุ่นเดียวกับ Python v2 · ไม่พึ่ง CDN · ไม่ถ่วงหน้าแรก)
    const ver = (await (await fetch("/api/pyodide-version")).json()).version;
    const base = "/vendor/pyodide/" + ver + "/";
    if (typeof loadPyodide !== "function") await new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = base + "pyodide.js"; s.onload = ok; s.onerror = () => fail(new Error("ไม่พบตัวโหลด Python (ไฟล์ pyodide.js โหลดไม่สำเร็จ)"));
      document.head.appendChild(s);
    });
    pyodide = await loadPyodide({ indexURL: base });
    window.cqPyState = "ready";
    runBtn.disabled = false;
    $("runOwnBtn").disabled = false;
    if (window.setRunState) setRunState("idle"); else runBtn.textContent = "▶ รันโค้ด";
  } catch (e) {
    window.cqPyState = "error";
    window.cqPyError = String(e && e.message || e);
    console.warn("[Code Quest] Python runtime:", window.cqPyError);
    $("bootStatus").textContent = "โหลด Python ไม่สำเร็จ (ตรวจอินเทอร์เน็ตแล้วรีเฟรช) — ภาษา C, HTML, CSS และ JavaScript ยังเล่นได้ปกติ";
    runBtn.disabled = false;
    $("runOwnBtn").disabled = false;
    if (window.setRunState) setRunState("idle"); else runBtn.textContent = "▶ รันโค้ด";
  } finally {
    clearInterval(bootTimer);
    $("boot").classList.add("hide2");
    document.dispatchEvent(new Event("cq:runtime"));
  }
}

/* ═══════════════ Game render ═══════════════ */
function renderStage() {
  const c = COURSES[state.lang], t = curTopic(), L = levels()[state.stage];
  $("stageTag").textContent = c.name.toUpperCase() + " · " + t.title + " · STAGE " + (state.stage + 1) + "/" + levels().length;
  $("mTitle").textContent = L.title;
  $("mDesc").innerHTML = richText(L.desc);   // คำอธิบายมีแท็กจัดรูปแบบ (C++ / C v2) — richText คงแท็กเหล่านั้นและแสดง < อื่นเป็นตัวอักษร
  $("mGoal").innerHTML = '<span class="goal-label">' + UIKit.AppIcon("target", { size: 18 }) + " เป้าหมาย</span> " + richText(L.goal);
  if (usesPyTests() && window.PY) PY.warm().catch(() => {});   // เตรียม Python ล่วงหน้า ผู้เรียนไม่ต้องรอตอนกดรันครั้งแรก
  else if (state.lang === "python") ensureLegacyPy();
  if (L.stdin && L.stdin.length) {
    $("stdinBox").classList.remove("hide");
    $("stdinVals").innerHTML = L.stdin.map(v => '<span class="kbd">' + v + '</span>').join(" ");
  } else {
    $("stdinBox").classList.add("hide");
  }
  FC.fill($("mGoal"));
  $("mReward").textContent = "รางวัลเมื่อผ่านภารกิจ: " + L.xp + " EXP";
  $("hintBox").innerHTML = richText(L.hint);
  $("hintBox").classList.remove("show");
  attempts = 0;
  updateHintBtn();
  const EXT = { c: ".c", cpp: ".cpp", python: ".py", html: ".html", css: ".css", js: ".js" };
  $("fileName").textContent = t.id + "_" + (state.stage + 1) + (EXT[state.lang] || ".txt");
  $("runOwnBtn").style.display = isWeb() ? "none" : "";
  $("outTag").textContent = state.lang === "js" ? "ผลลัพธ์จาก console" : (isWeb() ? "หน้าเว็บที่ได้" : "ผลลัพธ์จากโปรแกรม");
  const rb = $("roomBar");
  if (rb) {
    rb.classList.toggle("hide", !room.active);
    if (room.active) rb.innerHTML = '<span class="rb-tag">' + UIKit.AppIcon("battle", { size: 16 }) + ' แข่งขัน</span> ข้อที่ <b>' + (room.index + 1) + '</b> / ' + room.stages.length +
      ' · คะแนนของคุณ <b>' + room.score + '</b> <button class="mini-btn ghost" id="rbBack">' + UIKit.AppIcon("users", { size: 16 }) + '<span>กระดานคะแนน</span></button>';
    const bb = $("rbBack");
    if (bb) bb.onclick = () => { showScreen("room"); pollRoom(); };
  }
  $("previewWrap").innerHTML = "";
  $("previewWrap").style.display = "none";
  outEl.classList.toggle("compact", isWeb());
  const isQuiz = Array.isArray(L.quiz);
  document.querySelector("#gameScreen .editor-card").classList.toggle("hide", isQuiz);
  $("quizCard").classList.toggle("hide", !isQuiz);
  $("hintBtn").style.display = isQuiz && !L.hint ? "none" : "";
  if (isQuiz) {
    $("mReward").textContent = "รางวัลเมื่อตอบถูกครบทุกข้อ: " + L.xp + " EXP";
    renderQuiz(L);
    renderDots();
    return;
  }
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
    if (isDone) { b.innerHTML = UIKit.AppIcon("check", { size: 16, stroke: 3 }); b.setAttribute("aria-label", "ภารกิจที่ " + (i + 1) + " ผ่านแล้ว"); } else b.textContent = i + 1;
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
  const tip = "อีก " + Math.max(0, need - state.xp) + " EXP ถึง Level " + (state.level + 1) + " (เลเวล n ใช้ 100 × n^1.5 EXP)";
  const bar = $("xpFill").parentElement;
  if (bar) { bar.title = tip; bar.setAttribute("aria-label", tip); }
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

/* ═══════════ เครื่องเสมือน (VM) สำหรับ Python ═══════════ */
const vmState = { gui: false };
const usesTk = code => /\bimport\s+tkinter\b|\bfrom\s+tkinter\b/.test(code);

/** เตรียมสภาพแวดล้อมก่อนรัน: โหลดแพ็กเกจ (sqlite3 ฯลฯ), Tkinter จำลอง, ไฟล์ตั้งต้น */
async function prepareVM(code, L) {
  vmState.gui = !!(L && L.gui) || usesTk(code);
  try { await pyodide.loadPackagesFromImports(code); } catch (e) { /* โมดูลที่ไม่มีจะฟ้องตอนรันเอง */ }
  if (vmState.gui) {
    await pyodide.runPythonAsync(VM.TK_MOCK);
    await pyodide.runPythonAsync("_cq_reset()");
  }
  if (L && L.files) await pyodide.runPythonAsync(VM.filesPrelude(L.files));
}
function vmDump() {
  return JSON.parse(pyodide.runPython("_cq_dump()"));
}
/** วาดหน้าต่าง GUI เสมือนลงกล่องพรีวิว กดปุ่มแล้วเรียก command ใน Python จริง */
function drawVM() {
  const mount = $("previewWrap");
  mount.style.display = "";
  $("outTag").textContent = "หน้าต่างโปรแกรมบนเครื่องเสมือน";
  VM.renderGui(mount, vmDump(),
    id => {
      try { pyodide.runPython("_cq_click(" + id + ")"); } catch (e) { outEl.textContent = String(e.message || e); }
      drawVM();
    },
    (id, value) => {
      try { pyodide.globals.get("_cq_set_entry")(id, value); } catch (e) {}
    });
}

/**
 * @param {boolean} [ownInput]  โหมดป้อนค่าเอง (เดิม)
 * @param {"run"|"submit"} [mode]  run = รันดูผลลัพธ์เท่านั้น · submit = ตรวจคำตอบและบันทึกผล (ค่าเริ่มต้น = พฤติกรรมเดิม)
 */
async function runCode(ownInput, mode) {
  if (!pyodide && state.lang !== "c" && !usesClang() && !usesPyTests() && !isWeb()) { ensureLegacyPy(); return; }
  runBtn.disabled = true;
  $("runOwnBtn").disabled = true;
  if (window.setRunState) setRunState("running"); else runBtn.textContent = "กำลังรัน...";
  let stdout = "", stderr = "";
  if (pyodide) { // ภาษา C และเว็บทำงานได้แม้ Python ยังโหลดไม่เสร็จหรือโหลดไม่สำเร็จ
    pyodide.setStdout({ batched: s => stdout += s + "\n" });
    pyodide.setStderr({ batched: s => stderr += s + "\n" });
  }

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
    } else if (usesPyTests()) {
      // Python v2: รันใน Web Worker พร้อม timeout · ตรวจด้วยกรณีทดสอบ (แสดง + ซ่อน) · ผลแสดงผ่านเส้นทางเดียวกับ C/C++
      const res = await PY.runStage(code, levels()[state.stage], { mode: mode === "submit" ? "submit" : "run", ownInput });
      stdout = res.stdout;
      if (res.error) stderr = res.error;
      window.__cppPass = !!res.pass;
      window.__cppFeedback = res.feedback || "";
    } else if (usesClang()) {
      // C++20 / C17: คอมไพล์ด้วย Clang (WebAssembly) ในเบราว์เซอร์ แล้วรันกรณีทดสอบใน Web Worker (cpp/cpp-runtime.js)
      const res = await CPP.runStage(code, levels()[state.stage], { mode: mode === "submit" ? "submit" : "run", ownInput, compiler: clangMode() });
      // คำเตือนของคอมไพเลอร์มักบอกสาเหตุของ Runtime Error (เช่น พอยน์เตอร์ที่ไม่ได้กำหนดค่า) — ต่อท้าย error เมื่อมี ไม่เช่นนั้นต่อท้ายผลลัพธ์
      stdout = res.stdout + (res.error ? "" : (res.warnings || ""));
      if (res.error) stderr = res.error + (res.warnings || "");
      window.__cppPass = !!res.pass;
      window.__cppFeedback = res.feedback || "";
    } else if (state.lang === "c") {
      // ภาษา C: รันด้วยตัวแปล CRUN (จำลองหน่วยความจำ/พอยน์เตอร์ในเบราว์เซอร์)
      const provider = ownInput
        ? (spec => { const v = window.prompt("โปรแกรมขอรับค่า " + spec); return v === null ? "" : v; })
        : (levels()[state.stage].stdin || []);
      const res = CRUN.run(code, provider);
      stdout = res.stdout;
      if (res.error) stderr = res.error;
    } else if (ownInput) {
      await prepareVM(code, levels()[state.stage]);
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
      await prepareVM(code, levels()[state.stage]);
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
  if (!isWeb() && state.lang === "python") {
    if (vmState.gui) {
      try {
        const LS = levels()[state.stage];
        if (!ownInput && !stderr && LS.vmInput) pyodide.runPython("_cq_fill_first_entry(" + JSON.stringify(LS.vmInput) + ")");
        if (!ownInput && !stderr && LS.vmClick) pyodide.runPython("_cq_click_text(" + JSON.stringify(LS.vmClick) + ")");
        webDoc = vmDump();
        drawVM();
      } catch (e) { stderr += String(e.message || e); }
    } else {
      $("previewWrap").style.display = "none";
    }
  }
  runBtn.disabled = false;
  $("runOwnBtn").disabled = false;
  if (window.setRunState) setRunState("idle"); else runBtn.textContent = "▶ รันโค้ด";

  if (stderr) {
    outEl.innerHTML = "";
    // C/C++: แสดงสิ่งที่โปรแกรมพิมพ์ไว้ก่อนเกิดปัญหา — ช่วยให้เห็นว่าพังตรงไหน (เช่น ก่อน double free)
    if ((usesClang() || usesPyTests()) && stdout) {
      const o = document.createElement("pre");
      o.textContent = stdout;
      outEl.appendChild(o);
    }
    const p = document.createElement("pre");
    p.className = "err";
    p.textContent = (state.lang === "c" || usesClang() || usesPyTests() || isWeb()) ? stderr : friendlyError(stderr);
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
  if (mode === "run") {
    // รันอย่างเดียว: แสดงผลลัพธ์แล้วจบ ไม่ตรวจ ไม่นับเป็นความพยายาม ไม่บันทึก EXP
    $("banner").className = "banner";
    $("bannerText").textContent = stderr ? "โค้ดมีข้อผิดพลาด — ดูรายละเอียดในช่องผลลัพธ์" : "รันเสร็จแล้ว — ถ้าพร้อมแล้วกด “ส่งคำตอบ” เพื่อตรวจ";
    say(stderr ? "มีข้อผิดพลาด ลองอ่านข้อความในช่องผลลัพธ์ดูนะ" : "ดูผลลัพธ์ก่อนได้เลย ถ้าตรงเป้าหมายแล้วกดส่งคำตอบ", stderr ? "bad" : "");
    return;
  }

  let indentMsg = "";
  // ตรวจการย่อหน้าเฉพาะหลักสูตร C เดิม (ตัวแปล CRUN) — C v2 คอมไพล์ด้วย Clang จริง และสไตล์การย่อหน้าไม่ใช่ความถูกต้องของโปรแกรม
  // (เช่น #define ที่คอลัมน์ 0 ภายในฟังก์ชันเป็นสไตล์มาตรฐาน แต่ตัวตรวจเดิมถือว่าผิด)
  if (!stderr && state.lang === "c" && !usesClang()) {
    const ind = CRUN.checkIndent(code);
    if (!ind.ok) indentMsg = ind.msg;
  }

  const L = levels()[state.stage];
  const banner = $("banner");
  if (!stderr && !indentMsg && L.check(stdout, code, webDoc)) {
    banner.className = "banner pass";
    $("bannerText").textContent = "ภารกิจสำเร็จ!";
    lastProof = { code };
    if (room.active) {
      const last = room.index >= room.stages.length - 1;
      $("nextBtn").style.display = "inline-block";
      $("nextBtn").textContent = last ? "ส่งคำตอบครบแล้ว! ดูอันดับ →" : "ข้อถัดไป →";
      say(pick(["ผ่าน! รีบไปข้อต่อไปเลย", "เยี่ยม! คู่แข่งตามมาแล้วนะ", "เร็วและแม่น!"]), "ok");
      await recordRoomPass();
    } else {
      lastProof = { code };
      const lastStage = state.stage >= levels().length - 1;
      $("nextBtn").style.display = "inline-block";
      $("nextBtn").textContent = lastStage ? "จบหัวข้อนี้แล้ว! เลือกหัวข้อถัดไป →" : "ภารกิจถัดไป →";
      say(pick(["เก่งมาก! โค้ดสวยเป๊ะเลย", "ผ่านฉลุย! ไปด่านต่อกันเถอะ", "สุดยอดโปรแกรมเมอร์!"]), "ok");
      await recordPass();
      renderDots();
    }
  } else {
    banner.className = "banner fail";
    $("bannerText").textContent = stderr
      ? "โค้ดมีข้อผิดพลาด ลองอ่านข้อความสีแดงด้านล่างดูนะ"
      : (indentMsg ? "โปรแกรมทำงานได้ แต่การย่อหน้ายังไม่เรียบร้อย — " + indentMsg : "ผลลัพธ์ยังไม่ตรงเป้าหมาย ลองเทียบกับภารกิจอีกครั้ง");
    $("xpPop").textContent = "";
    $("nextBtn").style.display = "none";
    attempts += 1;
    updateHintBtn();
    say(pick(["เกือบแล้ว! ลองอีกทีนะ", "ไม่เป็นไร ผิดคือครู", attempts >= 2 ? "คำใบ้ปลดล็อกแล้ว กดดูได้เลย" : "ลองปรับแก้ด้วยตัวเองอีกนิดนะ"]), "no");
  }
}

/* ═══════════════ โหมดห้องแข่งขัน ═══════════════ */

/* token ที่เซิร์ฟเวอร์ออกให้ เก็บแยกตามห้อง — ใช้เชื่อมต่อใหม่เมื่อเน็ตหลุดโดยคะแนนไม่หาย */
function roomStore() { try { return JSON.parse(localStorage.getItem("cq_rooms") || "{}"); } catch { return {}; } }
function roomTokensFor(code) { return roomStore()[code] || {}; }
function saveRoomTokens(code, t) {
  const all = roomStore();
  all[code] = Object.assign({}, all[code] || {}, t);
  try { localStorage.setItem("cq_rooms", JSON.stringify(all)); } catch {}
}
function roomHeaders(code) {
  const t = roomTokensFor(code || room.code), h = {};
  if (t.member) h["X-Room-Token"] = t.member;
  if (t.host) h["X-Host-Token"] = t.host;
  return h;
}
function roomMsg(text, cls) {
  const el = $("roomMsg");
  el.textContent = text || "";
  el.className = "form-msg" + (cls ? " " + cls : "");
}
function saveRoomSession() {
  try {
    if (room.code) localStorage.setItem("cq_room", JSON.stringify({ code: room.code, index: room.index }));
    else localStorage.removeItem("cq_room");
  } catch {}
}

/** วาดกระดานคะแนนสด — ชื่อผู้เล่นเป็นข้อมูลจากผู้ใช้ ต้องใส่ด้วย textContent เท่านั้น (กัน XSS) */
function renderRoom(data) {
  room.isHost = !!data.isHost;
  $("rlCode").textContent = data.code;
  $("rlTitle").textContent = data.title;
  const statusText = data.status === "lobby" ? "กำลังรอผู้เล่น" : (data.status === "playing" ? "กำลังแข่งขัน" : "จบการแข่งขันแล้ว");
  $("rlMeta").textContent = statusText + " · ผู้เล่น " + data.members.length + " คน · " + data.total + " ข้อ · โฮสต์: " + data.hostName;

  const need = data.minPlayers || 2, enough = data.members.length >= need;
  const startBtn = $("rlStart");
  startBtn.style.display = (data.isHost && data.status === "lobby") ? "" : "none";
  startBtn.disabled = !enough;
  startBtn.textContent = enough ? "เริ่มการแข่งขัน (" + data.members.length + " คน)" : "รอผู้เล่นอย่างน้อย " + need + " คน (ตอนนี้ " + data.members.length + " คน)";
  $("rlEnd").style.display = (data.isHost && data.status === "playing") ? "" : "none";

  const box = $("rlBoard");
  box.textContent = "";
  const medal = [1, 2, 3].map(r => '<span class="rank-badge r' + r + '">' + UIKit.AppIcon(r === 1 ? "crown" : "medal", { size: 14 }) + r + "</span>");
  const cell = (cls, text) => { const s = document.createElement("span"); s.className = cls; s.textContent = text; return s; };
  data.members.forEach(m => {
    const row = document.createElement("div");
    row.className = "rb-row" + (m.isMe ? " me" : "") + (m.finished ? " fin" : "");
    const rk = cell("rb-rank", ""); if (medal[m.rank - 1]) rk.innerHTML = medal[m.rank - 1]; else rk.textContent = String(m.rank);
    rk.setAttribute("aria-label", "อันดับ " + m.rank); row.appendChild(rk);
    const name = cell("rb-name", m.name);
    if (m.isMe) { const b = document.createElement("b"); b.textContent = " (คุณ)"; name.appendChild(b); }
    if (m.finished) name.appendChild(cell("rb-fin", "จบแล้ว"));
    row.appendChild(name);
    row.appendChild(cell("rb-solved", m.solved + "/" + data.total));
    row.appendChild(cell("rb-score", String(m.score)));
    box.appendChild(row);
  });

  if (data.status === "playing" && data.stages.length && !room.active) {
    room.stages = data.stages;
    room.active = true;
    room.index = 0;
    try {
      const saved = JSON.parse(localStorage.getItem("cq_room") || "{}");
      if (saved.code === data.code && saved.index > 0) room.index = Math.min(saved.index, data.stages.length - 1);
    } catch {}
    const me = data.members.find(m => m.isMe);
    if (me) room.score = me.score;
    openRoomStage();
  }
  if (data.status === "ended" && room.active) {
    room.active = false;
    showScreen("room");
    say("จบการแข่งขันแล้ว! ดูอันดับสุดท้ายได้เลย", "ok");
  }
}

function openRoomStage() {
  const s = room.stages[room.index];
  if (!s) return;
  state.lang = s.language;
  state.topic = s.topic;
  state.stage = s.stage;
  attempts = 0;
  renderStage();
  showScreen("game");
  saveRoomSession();
}

async function pollRoom() {
  if (!room.code) return;
  try {
    renderRoom(await api("/api/rooms/" + room.code, null, roomHeaders()));
  } catch (e) {
    if (e.status === 404) leaveRoom();
  }
}
function startRoomPolling() {
  clearInterval(room.timer);
  room.timer = setInterval(pollRoom, 2500);
}
function enterRoom(data) {
  room.code = data.code;
  saveRoomTokens(data.code, Object.assign({}, data.memberToken ? { member: data.memberToken } : {}, data.hostToken ? { host: data.hostToken } : {}));
  $("roomEntry").classList.add("hide");
  $("roomLobby").classList.remove("hide");
  $("roomLobby").hidden = false;
  renderRoom(data);
  startRoomPolling();
  saveRoomSession();
  if (!room.active) showScreen("room");
}
function leaveRoom() {
  clearInterval(room.timer);
  Object.assign(room, { active: false, code: null, stages: [], index: 0, isHost: false, score: 0 });
  saveRoomSession();
  $("roomEntry").classList.remove("hide");
  $("roomLobby").classList.add("hide");
  $("roomLobby").hidden = true;
  showScreen("room");
}
/** เปิดหน้าเว็บใหม่ (หรือเน็ตกลับมา) → กลับเข้าห้องเดิมด้วย token เดิมอัตโนมัติ */
async function reconnectRoom() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("cq_room") || "null"); } catch {}
  if (!saved || !saved.code || !roomTokensFor(saved.code).member) return;
  try {
    const data = await api("/api/rooms/" + saved.code + "/join", {}, roomHeaders(saved.code));
    room.code = data.code;
    if (data.status === "ended") { leaveRoom(); return; }
    enterRoom(data);
  } catch (e) {
    if (e.status === 404 || e.status === 400) { try { localStorage.removeItem("cq_room"); } catch {} }
  }
}

$("roomBtn").onclick = () => {
  if (room.code) { showScreen("room"); pollRoom(); return; }
  if (state.user && !$("rcName").value) { $("rcName").value = state.user.name; $("rjName").value = state.user.name; }
  showScreen("room");
};
$("rcCreate").onclick = async () => {
  const langs = Array.from($("rcLangs").querySelectorAll("input:checked")).map(i => i.value);
  if (!langs.length) return roomMsg("เลือกภาษาอย่างน้อย 1 ภาษา", "err");
  try {
    roomMsg("กำลังสร้างห้อง...");
    const data = await api("/api/rooms", { name: $("rcName").value, title: $("rcTitle").value || "ห้องแข่งเขียนโค้ด", languages: langs, count: parseInt($("rcCount").value) || 10 });
    roomMsg("");
    enterRoom(data);
  } catch (e) { roomMsg(e.message, "err"); }
};
$("rjJoin").onclick = async () => {
  const code = ($("rjCode").value || "").trim().toUpperCase();
  if (code.length !== 5) return roomMsg("รหัสห้องต้องมี 5 ตัวอักษร", "err");
  try {
    roomMsg("กำลังเข้าห้อง...");
    const data = await api("/api/rooms/" + code + "/join", { name: $("rjName").value }, roomHeaders(code));
    roomMsg("");
    enterRoom(data);
  } catch (e) { roomMsg(e.message, "err"); }
};
$("rlStart").onclick = async () => {
  try { renderRoom(await api("/api/rooms/" + room.code + "/start", {}, roomHeaders())); }
  catch (e) { alert(e.message); }
};
$("rlEnd").onclick = async () => {
  if (!confirm("ปิดการแข่งขันและประกาศผลตอนนี้เลยไหม?")) return;
  try { renderRoom(await api("/api/rooms/" + room.code + "/end", {}, roomHeaders())); }
  catch (e) { alert(e.message); }
};
$("rlLeave").onclick = () => { if (confirm("ออกจากห้องแข่งขัน? (กลับเข้ามาใหม่ได้ด้วยรหัสห้องเดิม)")) leaveRoom(); };

/** ผ่านด่านในโหมดแข่ง: ส่งหลักฐานให้เซิร์ฟเวอร์ตรวจและคิดคะแนน */
async function recordRoomPass() {
  try {
    const r = await api("/api/rooms/" + room.code + "/solve", { index: room.index, proof: lastProof || {} }, roomHeaders());
    room.score = r.score;
    $("xpPop").textContent = r.repeat ? "ข้อนี้ได้คะแนนไปแล้ว"
      : "+" + r.gained + " คะแนน" + (r.speedBonus ? " (โบนัสเร็ว +" + r.speedBonus + ")" : "");
    pollRoom();
  } catch (e) {
    $("xpPop").textContent = "(ส่งคะแนนไม่สำเร็จ: " + e.message + ")";
  }
}

/* ═══════════════ ข้อสอบทฤษฎี (Quiz) ═══════════════
 * ด่านแบบข้อสอบกำหนดด้วย stage.quiz = [ คำถาม, ... ] รองรับ 4 รูปแบบ
 *  mc    ปรนัย        { t:"mc",    q, c:[ตัวเลือก], a:ดัชนีข้อถูก, e:คำอธิบาย }
 *  tf    ถูก/ผิด      { t:"tf",    q, a:true|false, e }
 *  fill  เติมคำ       { t:"fill",  q:"... ___ ...", a:["คำตอบ", "คำตอบสำรอง"], e }
 *  order เรียงลำดับ   { t:"order", q, items:[ลำดับที่ถูกต้อง], e }
 */
const QUIZ_LABEL = { mc: "ปรนัย", tf: "ถูก / ผิด", fill: "เติมคำ", order: "เรียงลำดับ" };
const normAns = s => String(s == null ? "" : s).trim().toLowerCase().replace(/\s+/g, " ").replace(/[;。]$/, "");
let quizState = { answers: [], orders: [] };

/** สลับลำดับแบบคงที่ (seed จากข้อความคำถาม) เพื่อไม่ให้ลำดับเปลี่ยนทุกครั้งที่วาดใหม่ */
function seededShuffle(arr, seedText) {
  let h = 0;
  for (const ch of seedText) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.join("|") === arr.join("|") && a.length > 1) a.push(a.shift());
  return a;
}

function renderQuiz(L) {
  quizState = { answers: L.quiz.map(() => null), orders: L.quiz.map(q => q.t === "order" ? seededShuffle(q.items, q.q) : null) };
  $("quizResult").className = "quiz-result";
  $("quizResult").textContent = "";
  $("qNext").style.display = "none";
  $("qSubmit").style.display = "";
  const box = $("quizList");
  box.innerHTML = "";
  L.quiz.forEach((q, i) => box.appendChild(renderQuestion(q, i)));
  say("อ่านคำถามให้ครบทุกข้อแล้วกดส่งคำตอบได้เลย ตอบถูกครบทุกข้อถึงจะผ่านนะ!", "");
}

function renderQuestion(q, i) {
  const el = document.createElement("div");
  el.className = "quiz-q";
  el.id = "qq" + i;
  const head = '<div class="qq-head"><span class="qq-num">ข้อ ' + (i + 1) + '</span><span class="qq-type qq-' + q.t + '">' + QUIZ_LABEL[q.t] + "</span></div>";
  const prompt = '<div class="qq-prompt">' + (q.t === "fill" ? richText(q.q).replace("___", '<span class="qq-blank">______</span>') : richText(q.q)) + "</div>";
  let body = "";
  if (q.t === "mc") {
    body = '<div class="qq-choices">' + q.c.map((c, k) =>
      '<button class="qq-choice" data-k="' + k + '"><span class="qq-letter">' + "กขคงจ"[k] + "</span>" + richText(c) + "</button>").join("") + "</div>";
  } else if (q.t === "tf") {
    body = '<div class="qq-choices qq-tf"><button class="qq-choice" data-k="true">' + UIKit.AppIcon("check", { size: 18 }) + '<span>ถูก</span></button><button class="qq-choice" data-k="false">' + UIKit.AppIcon("close", { size: 18 }) + '<span>ผิด</span></button></div>';
  } else if (q.t === "fill") {
    body = '<input class="qq-input" type="text" placeholder="พิมพ์คำตอบ..." autocomplete="off" spellcheck="false">';
  } else if (q.t === "order") {
    body = '<div class="qq-order-list"></div>'; // ชื่อคลาสแยกจากป้ายชนิดคำถาม (.qq-type.qq-order)
  }
  el.innerHTML = head + prompt + body + '<div class="qq-explain"></div>';

  if (q.t === "mc" || q.t === "tf") {
    el.querySelectorAll(".qq-choice").forEach(b => b.onclick = () => {
      if (el.classList.contains("locked")) return;
      el.querySelectorAll(".qq-choice").forEach(x => x.classList.remove("picked"));
      b.classList.add("picked");
      quizState.answers[i] = q.t === "tf" ? b.dataset.k === "true" : parseInt(b.dataset.k);
    });
  } else if (q.t === "fill") {
    const inp = el.querySelector(".qq-input");
    inp.oninput = () => { quizState.answers[i] = inp.value; };
    inp.onkeydown = e => { if (e.key === "Enter") $("qSubmit").click(); };
  } else if (q.t === "order") {
    drawOrder(el, i);
  }
  return el;
}

/** วาดรายการเรียงลำดับ พร้อมปุ่มเลื่อนขึ้น/ลง */
function drawOrder(el, i) {
  const list = el.querySelector(".qq-order-list");
  const items = quizState.orders[i];
  list.innerHTML = items.map((it, k) =>
    '<div class="qo-item"><span class="qo-n">' + (k + 1) + '</span><span class="qo-t">' + richText(it) + "</span>" +
    '<button class="qo-btn" data-k="' + k + '" data-d="-1" ' + (k === 0 ? "disabled" : "") + ">▲</button>" +
    '<button class="qo-btn" data-k="' + k + '" data-d="1" ' + (k === items.length - 1 ? "disabled" : "") + ">▼</button></div>").join("");
  list.querySelectorAll(".qo-btn").forEach(b => b.onclick = () => {
    if (el.classList.contains("locked")) return;
    const k = parseInt(b.dataset.k), d = parseInt(b.dataset.d), a = quizState.orders[i];
    [a[k], a[k + d]] = [a[k + d], a[k]];
    drawOrder(el, i);
  });
}

/** ตรวจคำตอบหนึ่งข้อ (ใช้ร่วมกับชุดทดสอบ) */
function gradeQuestion(q, ans, order) {
  if (q.t === "mc") return ans === q.a;
  if (q.t === "tf") return ans === q.a;
  if (q.t === "fill") return (Array.isArray(q.a) ? q.a : [q.a]).some(x => normAns(x) === normAns(ans));
  if (q.t === "order") return (order || []).join("|") === q.items.join("|");
  return false;
}

async function submitQuiz() {
  const L = levels()[state.stage];
  let right = 0;
  L.quiz.forEach((q, i) => {
    const el = $("qq" + i);
    const ok = gradeQuestion(q, quizState.answers[i], quizState.orders[i]);
    if (ok) right++;
    el.classList.toggle("ok", ok);
    el.classList.toggle("bad", !ok);
    const ex = el.querySelector(".qq-explain");
    ex.innerHTML = (ok ? UIKit.AppIcon("check-circle", { size: 16, cls: "ex-ok" }) + " <b>ถูกต้อง!</b> " : UIKit.AppIcon("x-circle", { size: 16, cls: "ex-bad" }) + " <b>ยังไม่ถูก</b> — ") + richText(q.e);
    if (!ok && q.t === "fill") ex.innerHTML += ' <span class="qq-ans">(คำตอบ: ' + richText(Array.isArray(q.a) ? q.a[0] : q.a) + ")</span>";
  });
  const all = right === L.quiz.length;
  const res = $("quizResult");
  res.className = "quiz-result " + (all ? "ok" : "bad");
  res.textContent = all
    ? "ตอบถูกครบทั้ง " + right + " ข้อ ผ่านภารกิจนี้แล้ว!"
    : "ได้ " + right + " / " + L.quiz.length + " ข้อ — อ่านคำอธิบายใต้ข้อที่ผิด แก้แล้วกดส่งใหม่ได้เลย";
  if (!all) {
    attempts++;
    updateHintBtn();
    say(pick(["เกือบแล้ว! ลองอ่านคำอธิบายแล้วแก้ข้อที่ผิดดูนะ", "ไม่เป็นไร ความผิดพลาดคือครูที่ดีที่สุด", "ลองทบทวนบทเรียนแล้วมาตอบใหม่ได้"]), "bad");
    return;
  }
  lastProof = { answers: quizState.answers.slice(), orders: quizState.orders.map(o => o ? o.slice() : null) };
  document.querySelectorAll("#quizList .quiz-q").forEach(q => q.classList.add("locked"));
  $("qSubmit").style.display = "none";
  $("qNext").style.display = "";
  if (room.active) {
    $("qNext").textContent = room.index >= room.stages.length - 1 ? "ส่งคำตอบครบแล้ว! ดูอันดับ →" : "ข้อถัดไป →";
    say("ถูกหมด! รีบไปข้อต่อไป", "ok");
    await recordRoomPass();
  } else {
    $("qNext").textContent = state.stage >= levels().length - 1 ? "จบหัวข้อนี้แล้ว! เลือกหัวข้อถัดไป →" : "ภารกิจถัดไป →";
    say(pick(["เข้าใจทฤษฎีแน่นมาก!", "ถูกครบทุกข้อ สุดยอด!", "ความรู้แน่นปึ้ก ไปด่านต่อกัน!"]), "ok");
    await recordPass();
    renderDots();
  }
  $("quizResult").textContent += " " + ($("xpPop").textContent || "");
}

/* ── ความคืบหน้าที่ยังไม่ได้ส่งขึ้นเซิร์ฟเวอร์ (ผู้เยี่ยมชม / ระบบกำลังอัปเดต / เน็ตหลุด) ── */
function loadPending() { try { return JSON.parse(localStorage.getItem("cq_pending") || "[]"); } catch { return []; } }
function savePending(list) { try { localStorage.setItem("cq_pending", JSON.stringify(list.slice(-400))); } catch {} }
function queuePending(entry) {
  const list = loadPending().filter(p => !(p.language === entry.language && p.topic === entry.topic && p.stage === entry.stage));
  list.push(entry);
  savePending(list);
}
/** ส่งความคืบหน้าในคิวขึ้นบัญชี — เซิร์ฟเวอร์ตรวจหลักฐานทุกด่านซ้ำเอง */
async function syncPending() {
  const list = loadPending();
  if (!list.length || !state.user || updateMode) return null;
  let ok = 0, rejected = 0, gained = 0;
  const keep = [];
  for (const p of list) {
    try {
      const r = await api("/api/complete", p);
      ok++; gained += r.gained || 0;
      state.done.add(doneKey(p.language, p.topic, p.stage));
      state.xp = r.xp; state.level = r.level;
    } catch (e) {
      if (e.code === "NETWORK" || e.code === "VERSION" || e.code === "RATE_LIMIT") keep.push(p); else rejected++;
    }
  }
  savePending(keep);
  renderXP();
  return { ok, rejected, gained, left: keep.length };
}

async function recordPass() {
  const key = doneKey(state.lang, state.topic, state.stage);
  const entry = { language: state.lang, topic: state.topic, stage: state.stage, proof: lastProof || {} };
  if (state.user && !updateMode) {
    try {
      const r = await api("/api/complete", entry);
      if (r.first) state.done.add(key);
      const leveled = r.level > state.level;
      state.xp = r.xp; state.level = r.level;
      $("xpPop").textContent = r.gained > 0 ? `+${r.gained} EXP` : "ภารกิจนี้เคยผ่านแล้ว — ไม่ได้ EXP ซ้ำ";
      renderXP();
      if (leveled) setTimeout(showLevelUp, 700);
    } catch (e) {
      if (e.code === "NETWORK" || e.code === "VERSION" || e.code === "RATE_LIMIT") {
        queuePending(entry);
        state.done.add(key);
        $("xpPop").textContent = "บันทึกผลไว้ในเครื่องแล้ว จะส่งขึ้นบัญชีให้อัตโนมัติเมื่อระบบพร้อม";
      } else {
        $("xpPop").textContent = "(" + e.message + ")";
      }
    }
  } else {
    const first = !state.done.has(key);
    queuePending(entry);
    state.done.add(key);
    if (updateMode && state.user) {
      $("xpPop").textContent = "บันทึกผลไว้ในเครื่องแล้ว จะส่งขึ้นบัญชีหลังรีเฟรช";
    } else if (first) {
      const gain = levels()[state.stage].xp;
      $("xpPop").textContent = `+${gain} EXP (เก็บไว้ในเครื่อง — สมัครหรือล็อกอินเพื่อนำเข้าบัญชี)`;
      gainXPLocal(gain);
    } else {
      $("xpPop").textContent = "ภารกิจนี้เคยผ่านแล้ว — ไม่ได้ EXP ซ้ำ";
    }
  }
}

function friendlyError(err) {
  const last = err.trim().split("\n").pop();
  let tip = "";
  if (/SyntaxError/.test(err)) tip = "\n\nคำแนะนำ: SyntaxError = พิมพ์ผิดไวยากรณ์ เช็ควงเล็บ เครื่องหมายคำพูด และเครื่องหมาย : ดูนะ";
  else if (/IndentationError/.test(err)) tip = "\n\nคำแนะนำ: IndentationError = การย่อหน้าไม่ถูกต้อง บรรทัดใน if/for ต้องเว้นวรรคเข้าไป 4 ช่อง";
  else if (/NameError/.test(err)) tip = "\n\nคำแนะนำ: NameError = ใช้ชื่อตัวแปรที่ยังไม่ได้สร้าง เช็คตัวสะกดดูนะ";
  else if (/TypeError/.test(err)) tip = "\n\nคำแนะนำ: TypeError = ชนิดข้อมูลไม่เข้ากัน เช่น เอาข้อความ + ตัวเลขตรงๆ ไม่ได้ ลองใช้ f-string หรือคั่นด้วย , ใน print";
  else if (/IndexError/.test(err)) tip = "\n\nคำแนะนำ: IndexError = ตำแหน่งที่ขอเกินขนาดของ list — อย่าลืมว่าเริ่มนับจาก 0";
  else if (/KeyError/.test(err)) tip = "\n\nคำแนะนำ: KeyError = ไม่มีช่องชื่อนี้ใน dictionary เช็คตัวสะกดของ key ดูนะ";
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
runBtn.onclick = () => runCode(false, "run");
if ($("submitBtn")) $("submitBtn").onclick = () => runCode(false, "submit");
$("runOwnBtn").onclick = () => runCode(true);
$("resetBtn").onclick = () => { codeEl.value = levels()[state.stage].starter; };
$("hintBtn").onclick = () => $("hintBox").classList.toggle("show");
$("nextBtn").onclick = () => {
  if (room.active) {
    if (room.index < room.stages.length - 1) {
      room.index++;
      openRoomStage();
    } else {
      showScreen("room");
      pollRoom();
    }
    return;
  }
  if (state.stage < levels().length - 1) {
    state.stage++;
    renderStage();
  } else {
    goLearn();
  }
};
$("closeOverlay").onclick = () => $("overlay").classList.remove("show");
$("qSubmit").onclick = () => submitQuiz();
$("qNext").onclick = () => $("nextBtn").onclick();
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
/** หน้าเกมกับเซิร์ฟเวอร์คนละเวอร์ชัน: บอกผู้ใช้สั้นๆ ให้รีเฟรช รายละเอียดเก็บไว้ใน console สำหรับผู้พัฒนา */
function enterUpdateMode(detail) {
  if (!updateMode) console.warn("[Code Quest] version mismatch —", detail || "", "| client =", CONTENT_VERSION);
  updateMode = true;
  $("verWarn").classList.add("show");
}
async function checkVersion() {
  try {
    const r = await fetch("/api/version", { cache: "no-store" });
    if (!r.ok) return enterUpdateMode("server has no /api/version");
    const d = await r.json();
    if (d.version !== CONTENT_VERSION) enterUpdateMode("server = " + d.version);
  } catch { /* เปิดเป็นไฟล์ตรงๆ ไม่มีเซิร์ฟเวอร์ — ข้ามได้ */ }
}
$("verReload").onclick = () => location.reload();

/* ═══════════════ Dialog ที่เข้าถึงได้ (WCAG / WAI-ARIA dialog pattern) ═══════════════
 * - overlay ที่ปิดอยู่: inert + aria-hidden → กด Tab เข้าไม่ได้ และโปรแกรมอ่านหน้าจอไม่อ่าน
 * - overlay ที่เปิด: เนื้อหาหลักถูก inert แทน, โฟกัสย้ายเข้า dialog และวนอยู่ข้างใน
 * - Esc ปิด dialog ที่ปิดได้ (โปรไฟล์ / เลเวลอัป) แล้วคืนโฟกัสให้ปุ่มที่เปิด */
(function setupDialogs() {
  const overlays = Array.from(document.querySelectorAll(".overlay"));
  const closable = { profileOverlay: true, overlay: true };
  const main = Array.from(document.body.children).filter(el => !el.classList.contains("overlay") && el.tagName !== "SCRIPT");
  let lastFocus = null;
  const focusables = el => Array.from(el.querySelectorAll('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'))
    .filter(x => !x.disabled && x.offsetParent !== null);
  function sync() {
    const open = overlays.filter(o => o.classList.contains("show"));
    overlays.forEach(o => {
      const on = o.classList.contains("show");
      o.inert = !on;
      o.setAttribute("aria-hidden", String(!on));
    });
    main.forEach(el => { el.inert = open.length > 0; });
  }
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      const o = m.target;
      const on = o.classList.contains("show");
      if (on && !o.dataset.wasOpen) {
        lastFocus = document.activeElement;
        o.dataset.wasOpen = "1";
        setTimeout(() => { const f = focusables(o); if (f.length) f[0].focus(); }, 30);
      } else if (!on && o.dataset.wasOpen) {
        delete o.dataset.wasOpen;
        if (lastFocus && document.contains(lastFocus)) setTimeout(() => lastFocus.focus(), 30);
      }
    });
    sync();
  });
  overlays.forEach(o => mo.observe(o, { attributes: true, attributeFilter: ["class"] }));
  document.addEventListener("keydown", e => {
    const o = overlays.find(x => x.classList.contains("show"));
    if (!o) return;
    if (e.key === "Escape" && closable[o.id]) { o.classList.remove("show"); return; }
    if (e.key === "Tab") {
      const f = focusables(o);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  sync();
})();
renderLangs();
renderXP();
checkVersion();
// รอให้สคริปต์ทุกไฟล์ในหน้าทำงานก่อน (DOMContentLoaded) แล้วค่อยตัดสินว่าจะแสดงหน้าไหน:
// เดิมเรียกทันที ถ้า /api/me ตอบกลับก่อน quest.js โหลดเสร็จ (เน็ตช้า) showLanding ยังไม่มี → กล่องเข้าสู่ระบบเด้งทับหน้าแรกเอง
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryRestore, { once: true });
else tryRestore();
hideBoot();   // ไม่รอ Python อีกต่อไป — บท Python เดิมโหลดตัวรันเมื่อเปิดใช้ (ensureLegacyPy) · Python v2 ใช้ Web Worker
