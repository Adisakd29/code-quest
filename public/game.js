/* ═══════════════ เนื้อหาเกม ═══════════════
   ⚠️ ค่า xp ของแต่ละด่านต้องตรงกับ STAGE_XP ใน server.js */
const eq = (out, s) => out.trim() === s;
const lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));

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
        blurb: "รู้จักภาษาแม่ของโลกโปรแกรมมิ่ง และโครงสร้างโปรแกรม C ที่ถูกต้อง",
        lesson: [
          { h: "ภาษาซีคืออะไร", p: "ภาษาโปรแกรมยุคบุกเบิก (ค.ศ. 1972 โดย Dennis Ritchie) ที่ยังทรงพลังถึงทุกวันนี้ — ระบบปฏิบัติการ เกม และอุปกรณ์ฝังตัวส่วนใหญ่เขียนด้วย C และเป็นต้นแบบของ C++, Java, JavaScript, Python แทบทุกภาษาที่คุณจะได้เจอ" },
          { h: "โครงสร้างโปรแกรม C", p: "ทุกโปรแกรมเริ่มที่ฟังก์ชัน <b>main</b> โค้ดอยู่ในปีกกา { } และทุกคำสั่งต้องปิดท้ายด้วย <b>;</b> เสมอ — ลืม ; คือ error อันดับหนึ่งของมือใหม่", code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello!\");\n    return 0;\n}" },
          { h: "printf ไม่ขึ้นบรรทัดใหม่ให้เอง", p: "ต่างจาก print ของ Python — printf จะพิมพ์ต่อบรรทัดเดิมเสมอ ต้องใส่ <b>\\n</b> เองเมื่ออยากขึ้นบรรทัดใหม่", code: "printf(\"บรรทัดแรก\\nบรรทัดสอง\");" },
          { h: "คอมเมนต์", p: "<code>//</code> คอมเมนต์บรรทัดเดียว และ <code>/* ... */</code> คอมเมนต์หลายบรรทัด — คอมไพเลอร์ข้ามส่วนนี้ทั้งหมด ใช้จดโน้ตหรือปิดโค้ดชั่วคราว" }
        ],
        stages: [
          {
            title: "Hello, C!",
            desc: "ธรรมเนียมของโปรแกรมเมอร์ทุกคน: โปรแกรมแรกต้องทักทายโลก — สังเกตโครงสร้าง #include, main, ปีกกา และ ; ให้ดี",
            goal: 'ทำให้โปรแกรมแสดงข้อความ <b>Hello, C!</b>',
            starter: "// เริ่มด้วย #include <stdio.h> ก่อนเสมอ แล้วเขียนโปรแกรมด้านล่าง\n\nint main() {\n    // เติมข้อความในเครื่องหมายคำพูด\n    printf(\"\");\n    return 0;\n}\n",
            hint: 'เติมข้อความ: <code>printf("Hello, C!");</code>',
            xp: 30,
            check: (out, code) => eq(out, "Hello, C!") && /printf/.test(code)
          },
          {
            title: "เครื่องหมาย ; ที่หายไป",
            desc: "โค้ดนี้คอมไพล์ไม่ผ่านเพราะลืม ; สองจุด — ลองกดรันดู error แล้วแก้ให้ถูก (ทุกคำสั่งใน C ต้องจบด้วย ;)",
            goal: 'แก้โค้ดให้รันผ่าน และได้ผลลัพธ์ <b>สวัสดีภาษาซี</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    printf(\"สวัสดี\")\n    printf(\"ภาษาซี\")\n    return 0;\n}\n",
            hint: 'เติม <code>;</code> ท้ายคำสั่ง printf ทั้งสองบรรทัด',
            xp: 40,
            check: (out) => eq(out, "สวัสดีภาษาซี")
          },
          {
            title: "ขึ้นบรรทัดใหม่ด้วย \\n",
            desc: "printf ไม่ขึ้นบรรทัดใหม่ให้เอง! ใช้รหัส \\n ในข้อความเพื่อบอกให้ขึ้นบรรทัดใหม่ตรงนั้น",
            goal: 'ใช้ printf <b>คำสั่งเดียว</b> แสดง 2 บรรทัด: <b>C คือ</b> และ <b>รากฐานของทุกภาษา</b>',
            starter: "int main() {\n    printf(\"\");\n    return 0;\n}\n",
            hint: 'ลอง <code>printf("C คือ\\nรากฐานของทุกภาษา");</code>',
            xp: 40,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "C คือ" && l[1] === "รากฐานของทุกภาษา" && (code.match(/printf/g) || []).length === 1 && code.includes("\\n"); }
          },
          {
            title: "คอมเมนต์กู้โลก",
            desc: "มีบรรทัดที่ไม่ใช่ภาษา C ปนอยู่ ทำให้คอมไพล์พัง — ใช้ // ปิดบรรทัดนั้นเป็นคอมเมนต์ โปรแกรมจะกลับมาทำงานได้",
            goal: 'ทำให้โปรแกรมรันผ่านโดย<b>ไม่ลบ</b>บรรทัดที่พัง (ใช้คอมเมนต์) และได้ผลลัพธ์ <b>โปรแกรมทำงานแล้ว</b>',
            starter: "#include <stdio.h>\n\nint main() {\n    บรรทัดนี้ไม่ใช่ภาษา C เลยทำให้พัง\n    printf(\"โปรแกรมทำงานแล้ว\");\n    return 0;\n}\n",
            hint: 'เติม <code>//</code> หน้าบรรทัดที่พัง คอมไพเลอร์จะข้ามให้',
            xp: 50,
            check: (out, code) => eq(out, "โปรแกรมทำงานแล้ว") && /\/\//.test(code)
          },
          {
            title: "เขียนเองทั้งโครง",
            desc: "ถึงเวลาพิสูจน์: เขียนโปรแกรม C ที่สมบูรณ์ด้วยตัวเองทั้งหมด ตั้งแต่ main จนถึง return 0",
            goal: 'เขียนโปรแกรมสมบูรณ์ที่แสดงข้อความ <b>จบหน่วยที่ 1</b> (ต้องมี int main และ return 0)',
            starter: "",
            hint: 'โครง: <code>int main() {</code> → printf → <code>return 0;</code> → <code>}</code>',
            xp: 50,
            check: (out, code) => eq(out, "จบหน่วยที่ 1") && /int\s+main/.test(code) && /return\s+0/.test(code)
          },
          {
            title: "printf หลายบรรทัด",
            desc: "โปรแกรมจริงมักพิมพ์หลายบรรทัด — ฝึกใช้ printf หลายคำสั่งและ \\n ให้คล่อง (อย่าลืมพิมพ์ #include เองด้วยนะ)",
            goal: 'แสดงผล 3 บรรทัด: <b>=== เมนู ===</b>, <b>1. เริ่มเกม</b>, <b>2. ออก</b>',
            starter: "// อย่าลืม #include <stdio.h> ด้านบน\n\n",
            hint: 'ใช้ printf 3 ครั้งมี \\n หรือ printf เดียวก็ได้: <code>printf("=== เมนู ===\\n1. เริ่มเกม\\n2. ออก");</code>',
            xp: 40,
            check: (out, code) => { const l = lines(out); return l.length === 3 && l[0] === "=== เมนู ===" && l[1] === "1. เริ่มเกม" && l[2] === "2. ออก" && /#include\s*<stdio\.h>/.test(code); }
          },
          {
            title: "พิมพ์เครื่องหมาย % และ \\\\",
            desc: "อักขระพิเศษบางตัวต้องใช้รหัสหนี: อยากได้ % ต้องพิมพ์ %% ใน printf — เป็นกับดักที่เจอบ่อยเวลาแสดงเปอร์เซ็นต์",
            goal: 'แสดงข้อความ <b>ความคืบหน้า 50%</b> (มีเครื่องหมาย % หนึ่งตัว)',
            starter: "// อย่าลืม #include <stdio.h> ด้านบน\n\nint main() {\n    int p = 50;\n\n    return 0;\n}\n",
            hint: 'ใน printf พิมพ์ %% เพื่อให้ได้ %: <code>printf("ความคืบหน้า %d%%", p);</code>',
            xp: 50,
            check: (out, code) => eq(out, "ความคืบหน้า 50%") && /%%/.test(code)
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
        blurb: "Input → Process → Output, อัลกอริทึม, ซูโดโค้ด และการไล่มือ — คิดก่อนเขียน",
        lesson: [
          { h: "Input → Process → Output", p: "ทุกโปรแกรมคือ 3 ขั้นตอน: <b>รับข้อมูลเข้า → ประมวลผล → แสดงผลลัพธ์</b> ก่อนเขียนโค้ดทุกครั้ง ตอบให้ได้ว่าโจทย์นี้ Input คืออะไร Process ทำอะไร และ Output หน้าตาแบบไหน" },
          { h: "อัลกอริทึมและซูโดโค้ด", p: "อัลกอริทึม = ลำดับขั้นตอนแก้ปัญหา นิยมร่างเป็น<b>ซูโดโค้ด</b> (ภาษาคนกึ่งโค้ด) ก่อน แล้วค่อยแปลงเป็นภาษา C ทีละบรรทัด", code: "เริ่ม\n  x <- 10\n  x <- x * 2\n  แสดงค่า x\nจบ" },
          { h: "ไล่มือ (Trace) ก่อนรัน", p: "จดค่าตัวแปรบนกระดาษทีละบรรทัด — ถ้าไล่มือแล้วได้ผลตรงที่คาด โค้ดมักถูก เทคนิคนี้ใช้หาบั๊กได้ตลอดชีวิตการเป็นโปรแกรมเมอร์ และเป็นข้อสอบยอดฮิต" },
          { h: "สัญลักษณ์ผังงานมาตรฐาน", p: 'ก่อนลงมือเขียนโค้ด นักออกแบบโปรแกรมวาดผังงาน (Flowchart) ด้วยสัญลักษณ์สากลชุดนี้ — จำให้ได้ เพราะจะเจอในแบบฝึกหัดและข้อสอบแน่นอน:<span class="fc-slot" data-flow="legend"></span>' }
        ],
        stages: [
          {
            title: "I-P-O ครบสามขั้น",
            desc: "ฝึกมองโปรแกรมเป็น 3 ขั้น: Input คือค่า a กับ b / Process คือการบวก / Output คือแสดงผลรวม",
            goal: 'กำหนด <b>a = 5</b>, <b>b = 3</b> ประมวลผลรวม แล้วแสดง <b>ผลรวม = 8</b>',
            starter: "int main() {\n    int a = 5;\n    int b = 3;\n    // Process + Output\n\n    return 0;\n}\n",
            hint: '<code>printf("ผลรวม = %d", a + b);</code>',
            xp: 50,
            check: (out, code) => eq(out, "ผลรวม = 8") && /\+/.test(code)
          },
          {
            title: "แปลงซูโดโค้ดเป็น C",
            desc: "อ่านซูโดโค้ดแล้วแปลงเป็นภาษา C ทีละบรรทัด — ทักษะข้อสอบสุดคลาสสิก",
            goal: 'แปลงซูโดโค้ดนี้เป็นภาษา C:<span class="fc">เริ่ม\n  x <- 10\n  x <- x * 2\n  แสดงค่า x\nจบ</span>(ต้องได้ <b>20</b>)',
            starter: "int main() {\n\n    return 0;\n}\n",
            hint: '<code>int x = 10;</code> → <code>x = x * 2;</code> → <code>printf("%d", x);</code>',
            xp: 50,
            check: (out, code) => eq(out, "20") && /x\s*=/.test(code)
          },
          {
            title: "แตกปัญหาเป็นขั้นตอน",
            desc: "โจทย์: หาพื้นที่สามเหลี่ยม — แตกเป็นขั้น: รู้ฐานกับสูง → ใช้สูตร (ฐาน × สูง) / 2 → แสดงผล",
            goal: 'กำหนด <b>base = 10</b>, <b>height = 4</b> คำนวณตามสูตร แล้วแสดง <b>พื้นที่ = 20</b>',
            starter: "int main() {\n    int base = 10;\n    int height = 4;\n\n    return 0;\n}\n",
            hint: '<code>printf("พื้นที่ = %d", base * height / 2);</code>',
            xp: 60,
            check: (out, code) => eq(out, "พื้นที่ = 20") && /\*/.test(code) && /\/\s*2/.test(code)
          },
          {
            title: "ไล่มือให้แม่น",
            desc: "เขียนโค้ดตามขั้นตอน แล้วไล่มือทีละบรรทัดก่อนกดรัน: x เริ่ม 3 → บวก 4 → คูณ 2 — ได้เท่าไหร่?",
            goal: 'เขียนตามลำดับ: x = 3 → x = x + 4 → x = x * 2 → แสดง <b>x สุดท้าย = 14</b>',
            starter: "int main() {\n    int x = 3;\n\n    return 0;\n}\n",
            hint: 'สองบรรทัดอัปเดตค่า แล้ว <code>printf("x สุดท้าย = %d", x);</code>',
            xp: 60,
            check: (out, code) => eq(out, "x สุดท้าย = 14") && /x\s*=\s*x/.test(code)
          },
          {
            title: "อ่านผังงานลำดับ",
            desc: "ผังงานแบบพื้นฐานที่สุด: ลำดับ (sequence) — ทำจากบนลงล่างทีละกล่อง อ่านสัญลักษณ์แต่ละรูปให้ออก แล้วเขียนภาษา C ตาม",
            goal: 'เขียนโปรแกรม C ตามผังงานนี้:<span class="fc-slot" data-flow="cseq0"></span>',
            starter: "// ภารกิจ: แปลงผังงานลำดับเป็นภาษา C\n\n",
            hint: '<code>int a = 8;</code> → <code>int b = 5;</code> → <code>printf("ผลต่าง = %d", a - b);</code>',
            xp: 60,
            check: (out, code) => eq(out, "ผลต่าง = 3") && /int\s+a/.test(code)
          },
          {
            title: "ผังงานหาค่าเฉลี่ย",
            desc: "รวมหลายขั้นตอน: รับค่าคงที่ 3 ตัว → หาผลรวม → หารด้วยจำนวน → แสดงผล เป็นอัลกอริทึมพื้นฐานที่ใช้ได้จริง",
            goal: 'มีคะแนน 3 วิชา <b>80, 90, 70</b> จงหาค่าเฉลี่ย แล้วแสดง <b>เฉลี่ย = 80</b> (ใช้ผลรวมหารด้วย 3)',
            starter: "// เขียนโปรแกรมเองตั้งแต่ #include\n\n",
            hint: '<code>int sum = 80 + 90 + 70;</code> แล้ว <code>printf("เฉลี่ย = %d", sum / 3);</code>',
            xp: 60,
            check: (out, code) => eq(out, "เฉลี่ย = 80") && /\/\s*3/.test(code)
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
  $("fileName").textContent = t.id + "_" + (state.stage + 1) + (state.lang === "c" ? ".c" : ".py");
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
async function runCode(ownInput) {
  if (!pyodide && state.lang !== "c") return;
  runBtn.disabled = true;
  $("runOwnBtn").disabled = true;
  runBtn.textContent = "⏳ กำลังรัน...";
  let stdout = "", stderr = "";
  pyodide.setStdout({ batched: s => stdout += s + "\n" });
  pyodide.setStderr({ batched: s => stderr += s + "\n" });

  const code = codeEl.value;
  try {
    if (state.lang === "c") {
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
    p.textContent = state.lang === "c" ? stderr : friendlyError(stderr);
    outEl.appendChild(p);
  } else {
    outEl.textContent = stdout || "(โปรแกรมทำงานเสร็จ แต่ไม่มีข้อความแสดงออกมา)";
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
  if (!stderr && !indentMsg && L.check(stdout, code)) {
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
const CONTENT_VERSION = 11; // ต้องตรงกับ CONTENT_VERSION ใน server.js
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
