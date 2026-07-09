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
const ICON_ALIAS = { concept: "flowchart", ctypes: "variable", coper: "operator", cio: "input", cctrl: "ifelse", carray: "datastructure", cfunc: "function" };
const iconFor = k => ICONS[k] || ICONS[ICON_ALIAS[k]] || "";
const fmt = n => (n || 0).toLocaleString("th-TH");

const COURSES = {
  python: {
    name: "Python", icon: "🐍",
    tagline: "ภาษายอดนิยมที่อ่านง่ายที่สุด เหมาะกับผู้เริ่มต้น ใช้ได้ตั้งแต่ AI ยันเว็บไซต์",
    topics: [
      {
        id: "print", icon: "🖨️", title: "คำสั่ง Print",
        blurb: "ก้าวแรกของทุกโปรแกรมเมอร์ — สั่งให้คอมพิวเตอร์พูดกับเรา",
        lesson: [
          { h: "print() คืออะไร", p: "คำสั่งพื้นฐานที่สุดของ Python ใช้แสดงข้อความหรือค่าออกทางหน้าจอ ข้อความ (string) ต้องอยู่ในเครื่องหมายคำพูดเสมอ ไม่งั้น Python จะคิดว่าเป็นชื่อตัวแปร", code: 'print("สวัสดีชาวโลก")\n# ผลลัพธ์: สวัสดีชาวโลก' },
          { h: "พิมพ์หลายค่าในคำสั่งเดียว", p: "คั่นแต่ละค่าด้วยจุลภาค <code>,</code> แล้ว print จะเว้นวรรคให้อัตโนมัติ — ตัวเลขไม่ต้องใส่เครื่องหมายคำพูด", code: 'print("คะแนน:", 99)\n# ผลลัพธ์: คะแนน: 99' },
          { h: "รหัสพิเศษและตัวเลือกเสริม", p: "<code>\\n</code> ในข้อความ = ขึ้นบรรทัดใหม่, <code>sep=</code> เปลี่ยนตัวคั่นระหว่างค่า, <code>end=</code> เปลี่ยนตัวปิดท้าย (ปกติคือการขึ้นบรรทัดใหม่)", code: 'print("A\\nB")             # A กับ B คนละบรรทัด\nprint(1, 2, 3, sep="-")   # 1-2-3\nprint("ต่อ", end="")       # บรรทัดถัดไปพิมพ์ต่อท้าย' }
        ],
        stages: [
          {
            title: "คำทักทายแรก",
            desc: "ในภาษา Python เราใช้คำสั่ง print() เพื่อแสดงข้อความออกทางหน้าจอ ข้อความต้องอยู่ในเครื่องหมายคำพูดเสมอ",
            goal: 'ทำให้โปรแกรมแสดงข้อความ <b>สวัสดี Python</b> ออกมา 1 บรรทัด',
            starter: '# ภารกิจ: แสดงข้อความ สวัสดี Python\nprint("")\n',
            hint: 'ใส่ข้อความไว้ในเครื่องหมายคำพูด เช่น <code>print("สวัสดี Python")</code>',
            xp: 30,
            check: (out) => eq(out, "สวัสดี Python")
          },
          {
            title: "ป้ายประกาศสามบรรทัด",
            desc: "print หนึ่งคำสั่งจะขึ้นบรรทัดใหม่ให้เสมอ ถ้าอยากได้หลายบรรทัด ก็ใช้ print หลายครั้ง",
            goal: 'แสดงป้ายประกาศ 3 บรรทัด: <b>ยินดีต้อนรับ</b> / <b>สู่โลกของ</b> / <b>Python</b>',
            starter: '# ภารกิจ: พิมพ์ป้ายประกาศ 3 บรรทัด\nprint("ยินดีต้อนรับ")\n\n',
            hint: 'เพิ่ม print อีก 2 บรรทัด: <code>print("สู่โลกของ")</code> และ <code>print("Python")</code>',
            xp: 40,
            check: (out) => { const l = lines(out); return l.length === 3 && l[0] === "ยินดีต้อนรับ" && l[1] === "สู่โลกของ" && l[2] === "Python"; }
          },
          {
            title: "\\n ขึ้นบรรทัดใหม่ในพริบตา",
            desc: "รหัสพิเศษ \\n ในข้อความหมายถึง \"ขึ้นบรรทัดใหม่\" ทำให้ print ครั้งเดียวได้หลายบรรทัด",
            goal: 'ใช้ print <b>คำสั่งเดียว</b> กับ \\n เพื่อแสดง <b>บรรทัดหนึ่ง</b> และ <b>บรรทัดสอง</b> คนละบรรทัด',
            starter: '# ภารกิจ: สองบรรทัดจาก print เดียว\nprint("")\n',
            hint: 'ลอง <code>print("บรรทัดหนึ่ง\\nบรรทัดสอง")</code> — \\n จะกลายเป็นการขึ้นบรรทัดใหม่',
            xp: 40,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "บรรทัดหนึ่ง" && l[1] === "บรรทัดสอง" && (code.match(/print/g) || []).length === 1 && code.includes("\\n"); }
          },
          {
            title: "พิมพ์หลายค่าพร้อมกัน",
            desc: "print รับได้หลายค่าโดยคั่นด้วยเครื่องหมายจุลภาค (,) แล้วมันจะเว้นวรรคให้เองอัตโนมัติ",
            goal: 'ใช้ print <b>คำสั่งเดียว</b> แสดงข้อความและตัวเลขคู่กัน ให้ได้ผลลัพธ์ <b>HP: 100</b>',
            starter: '# ภารกิจ: พิมพ์ HP: 100 ด้วย print เดียว โดยคั่นค่าด้วย ,\nprint()\n',
            hint: 'ลอง <code>print("HP:", 100)</code> — สังเกตว่าตัวเลขไม่ต้องมีเครื่องหมายคำพูด',
            xp: 50,
            check: (out, code) => eq(out, "HP: 100") && code.includes(",")
          },
          {
            title: "เปลี่ยนตัวคั่นด้วย sep",
            desc: "ปกติ print คั่นแต่ละค่าด้วยช่องว่าง แต่เราสั่งให้ใช้ตัวคั่นอื่นได้ด้วย sep= เช่น sep=\"-\"",
            goal: 'ใช้ print กับ <b>sep="-"</b> แสดงวันที่ <b>2026-07-06</b> จากสามค่า "2026", "07", "06"',
            starter: '# ภารกิจ: ประกอบวันที่ด้วยตัวคั่น -\nprint("2026", "07", "06")\n',
            hint: 'เพิ่มท้ายวงเล็บ: <code>print("2026", "07", "06", sep="-")</code>',
            xp: 50,
            check: (out, code) => eq(out, "2026-07-06") && /sep\s*=/.test(code)
          },
          {
            title: "ต่อบรรทัดด้วย end",
            desc: "ปกติ print ปิดท้ายด้วยการขึ้นบรรทัดใหม่เสมอ แต่ใส่ end=\"\" เพื่อให้ print คำสั่งถัดไปพิมพ์ต่อท้ายบรรทัดเดิมได้",
            goal: 'แก้โค้ดให้สองคำสั่ง print ต่อกันเป็น<b>บรรทัดเดียว</b>: <b>โจมตีคอมโบ!</b>',
            starter: '# ภารกิจ: เชื่อมสองคำสั่งเป็นบรรทัดเดียวด้วย end=""\nprint("โจมตี")\nprint("คอมโบ!")\n',
            hint: 'เติมที่คำสั่งแรก: <code>print("โจมตี", end="")</code>',
            xp: 50,
            check: (out, code) => eq(out, "โจมตีคอมโบ!") && /end\s*=/.test(code) && (code.match(/print/g) || []).length >= 2
          },
          {
            title: "ป้ายหน้าร้านค้า",
            desc: "เอาทุกท่าที่เรียนมาวาดของจริงกัน — โปรแกรมเมอร์ยุคแรกก็วาดภาพด้วยตัวอักษรแบบนี้แหละ",
            goal: 'พิมพ์ป้ายร้าน 3 บรรทัดให้ตรงเป๊ะ:<span class="fc">+------+\n| SHOP |\n+------+</span>',
            starter: '# ภารกิจ: วาดป้ายหน้าร้านค้า\n\n',
            hint: 'ใช้ print 3 ครั้ง บรรทัดแรกกับบรรทัดสุดท้ายเหมือนกัน: <code>print("+------+")</code>',
            xp: 60,
            check: (out) => { const l = lines(out); return l.length === 3 && l[0] === "+------+" && l[1] === "| SHOP |" && l[2] === "+------+"; }
          },
          {
            title: "เครื่องหมายคำพูดในข้อความ",
            desc: "อยากพิมพ์เครื่องหมายคำพูดคู่ (\") ในข้อความ? ครอบข้อความด้วยคำพูดเดี่ยว (') แทน — Python ใช้ได้ทั้งสองแบบ",
            goal: 'พิมพ์ประโยคนี้ให้มีเครื่องหมายคำพูดติดมาด้วย: <b>เขาตะโกนว่า "สู้ๆ"</b>',
            starter: "# ภารกิจ: พิมพ์ประโยคที่มีเครื่องหมายคำพูดข้างใน\n\n",
            hint: "ครอบด้วยคำพูดเดี่ยว: <code>print('เขาตะโกนว่า \"สู้ๆ\"')</code>",
            xp: 50,
            check: (out) => eq(out, 'เขาตะโกนว่า "สู้ๆ"')
          },
          {
            title: "พีระมิดดาว",
            desc: "ช่องว่างในเครื่องหมายคำพูดมีความหมายเสมอ — จัดช่องว่างนำหน้าให้พอดีเพื่อวาดรูปทรง",
            goal: 'พิมพ์พีระมิด 3 ชั้นให้ตรงเป๊ะ (ระวังช่องว่างนำหน้า):<span class="fc">  *\n ***\n*****</span>',
            starter: '# ภารกิจ: ก่อพีระมิดดาว\n\n',
            hint: 'ชั้นแรกมีช่องว่างนำ 2 ช่อง: <code>print("  *")</code> ชั้นสอง 1 ช่อง ชั้นสามไม่มี',
            xp: 60,
            check: (out) => { const r = out.replace(/\s+$/, "").split("\n").map(s => s.replace(/\s+$/, "")); return r.length === 3 && r[0] === "  *" && r[1] === " ***" && r[2] === "*****"; }
          }
        ]
      },
      {
        id: "variable", icon: "📦", title: "ตัวแปร (Variable)",
        blurb: "กล่องวิเศษสำหรับเก็บข้อมูล ตั้งชื่อแล้วหยิบมาใช้เมื่อไหร่ก็ได้",
        lesson: [
          { h: "ตัวแปรคือกล่องเก็บข้อมูล", p: "ใช้ <code>=</code> เก็บค่าไว้ใต้ชื่อที่เราตั้ง แล้วเรียกใช้ผ่านชื่อนั้นได้ทุกที่ — ตั้งชื่อเป็นภาษาอังกฤษ ห้ามเว้นวรรค ห้ามขึ้นต้นด้วยตัวเลข", code: 'name = "มะลิ"\nhp = 100' },
          { h: "คำนวณและอัปเดตค่า", p: "ตัวแปรตัวเลขเอามา + - * / กันได้ และเปลี่ยนค่าได้ตลอด — <code>x += 5</code> คือคำย่อของ <code>x = x + 5</code>", code: 'gold = 10\ngold += 5   # ตอนนี้ gold = 15\ngold -= 3   # ตอนนี้ gold = 12' },
          { h: "ชนิดข้อมูลและการแปลง", p: '"12" (ข้อความ) ไม่เท่ากับ 12 (ตัวเลข)! ใช้ <code>int()</code> แปลงข้อความเป็นจำนวนเต็ม และ <code>str()</code> แปลงตัวเลขกลับเป็นข้อความ', code: 'age = int("12") + 1   # ได้ 13' },
          { h: "f-string แทรกค่าลงประโยค", p: "ใส่ <code>f</code> หน้าเครื่องหมายคำพูด แล้วครอบตัวแปรด้วย <code>{}</code> — วิธีประกอบข้อความที่นิยมที่สุดใน Python ยุคใหม่", code: 'level = 5\nprint(f"ตอนนี้เลเวล {level}")' }
        ],
        stages: [
          {
            title: "กล่องใส่ชื่อ",
            desc: "ตัวแปรคือการตั้งชื่อให้ข้อมูล ใช้เครื่องหมาย = เพื่อเก็บค่า เช่น name = \"มะลิ\" แล้วเรียกใช้ผ่านชื่อได้เลย",
            goal: 'สร้างตัวแปร <b>name</b> เก็บชื่อของคุณ แล้วแสดงผล <b>ฉันชื่อ ...</b> ตามด้วยชื่อในตัวแปร',
            starter: '# ภารกิจ: ใส่ชื่อในตัวแปร name\nname = ""\nprint("ฉันชื่อ " + name)\n',
            hint: 'แค่เติมชื่อในเครื่องหมายคำพูด เช่น <code>name = "มะลิ"</code>',
            xp: 40,
            check: (out, code) => /ฉันชื่อ .+/.test(out.trim()) && /name\s*=/.test(code)
          },
          {
            title: "คำนวณพลังชีวิต",
            desc: "ตัวแปรเก็บตัวเลขได้ด้วย และเอามาบวกลบคูณหารกันได้เหมือนเลขคณิตปกติ",
            goal: 'สร้างตัวแปร <b>hp = 80</b> และ <b>potion = 25</b> แล้ว print ผลรวมของทั้งสอง (ต้องได้ <b>105</b>)',
            starter: '# ภารกิจ: ดื่มยาเพิ่มพลัง! รวม hp กับ potion\nhp = 80\npotion = 25\n\n',
            hint: 'พิมพ์ <code>print(hp + potion)</code> — Python จะคำนวณให้เอง',
            xp: 40,
            check: (out, code) => eq(out, "105") && /hp\s*=/.test(code) && /\+/.test(code)
          },
          {
            title: "อัปเดตค่าในกล่อง",
            desc: "ตัวแปรเปลี่ยนค่าได้ตลอด เช่น coins = coins - 3 คือ \"เอาค่าเดิมมาลบ 3 แล้วเก็บกลับที่เดิม\" (ย่อได้เป็น coins -= 3)",
            goal: 'เริ่มด้วย <b>coins = 10</b> ซื้อของไป <b>3 เหรียญ</b> แล้วได้รางวัล <b>8 เหรียญ</b> จากนั้น print ยอดสุดท้าย (ต้องได้ <b>15</b>)',
            starter: '# ภารกิจ: อัปเดตยอดเหรียญ\ncoins = 10\n# ซื้อของ -3\n\n# ได้รางวัล +8\n\nprint(coins)\n',
            hint: 'สองบรรทัด: <code>coins = coins - 3</code> แล้ว <code>coins = coins + 8</code> (หรือใช้ -= และ +=)',
            xp: 50,
            check: (out, code) => eq(out, "15") && (/coins\s*[+\-]=/.test(code) || /coins\s*=\s*coins/.test(code))
          },
          {
            title: "แปลงชนิดข้อมูล",
            desc: "\"12\" (ข้อความ) กับ 12 (ตัวเลข) ไม่เหมือนกัน! ถ้าอยากคำนวณต้องแปลงข้อความเป็นตัวเลขด้วย int() ก่อน",
            goal: 'มี <b>age = "12"</b> เป็นข้อความ จงแปลงเป็นตัวเลข บวก 1 แล้ว print (ต้องได้ <b>13</b>)',
            starter: '# ภารกิจ: ปีหน้าอายุเท่าไหร่?\nage = "12"\n# แปลงเป็นตัวเลขก่อนค่อยบวก\n\n',
            hint: 'ลอง <code>print(int(age) + 1)</code> — int() แปลงข้อความเป็นจำนวนเต็ม',
            xp: 50,
            check: (out, code) => eq(out, "13") && /int\(/.test(code)
          },
          {
            title: "f-string เวทมนตร์แทรกค่า",
            desc: "f-string คือวิธีแทรกตัวแปรลงในข้อความแบบเท่ๆ แค่ใส่ f หน้าเครื่องหมายคำพูด แล้วครอบตัวแปรด้วย {}",
            goal: 'สร้างตัวแปร <b>level = 5</b> แล้วใช้ f-string แสดงผล <b>ตอนนี้เลเวล 5 แล้ว</b>',
            starter: '# ภารกิจ: ใช้ f-string แทรกค่า level ลงในประโยค\nlevel = 5\nprint(f"")\n',
            hint: 'ลอง <code>print(f"ตอนนี้เลเวล {level} แล้ว")</code> — ตัวแปรใน {} จะถูกแทนที่ด้วยค่าจริง',
            xp: 60,
            check: (out, code) => eq(out, "ตอนนี้เลเวล 5 แล้ว") && /f["']/.test(code)
          },
          {
            title: "สลับค่าสองกล่อง",
            desc: "ท่าเด็ดเฉพาะของ Python: a, b = b, a สลับค่าตัวแปรสองตัวได้ในบรรทัดเดียว (ภาษาอื่นต้องใช้ตัวแปรพักถึงสามบรรทัด!)",
            goal: 'กำหนด <b>a = 5</b> และ <b>b = 9</b> จงสลับค่ากัน แล้ว print(a) และ print(b) (ต้องได้ <b>9</b> และ <b>5</b>)',
            starter: '# ภารกิจ: สลับของในกล่อง a กับ b\na = 5\nb = 9\n# สลับค่าตรงนี้\n\nprint(a)\nprint(b)\n',
            hint: 'บรรทัดเดียวจบ: <code>a, b = b, a</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.join(",") === "9,5" && /print\(\s*a\s*\)/.test(code) && /print\(\s*b\s*\)/.test(code); }
          },
          {
            title: "เครื่องคิดส่วนลด",
            desc: "โจทย์ประยุกต์: ใช้ตัวแปรกับเลขคณิตแก้ปัญหาในชีวิตจริง — ส่วนลด 20% คือราคาคูณ 20 หาร 100",
            goal: 'สินค้าราคา <b>price = 250</b> ลดราคา <b>20%</b> จงคำนวณแล้ว print ราคาที่ต้องจ่ายจริง (ต้องได้ <b>200</b>)',
            starter: '# ภารกิจ: ลดกระหน่ำ 20% ต้องจ่ายเท่าไหร่?\nprice = 250\n\n',
            hint: 'ส่วนลดคือ <code>price * 20 // 100</code> แล้วเอาราคาตั้งลบส่วนลด',
            xp: 60,
            check: (out, code) => { const t = out.trim(); return (t === "200" || t === "200.0") && /price/.test(code); }
          },
          {
            title: "พื้นที่ห้องสมบัติ",
            desc: "ตัวแปรหลายตัวคูณกันได้ตรงๆ — สูตรพื้นที่สี่เหลี่ยมคือ กว้าง × สูง",
            goal: 'ห้องสมบัติกว้าง <b>w = 7</b> สูง <b>h = 4</b> จง print พื้นที่ห้อง (ต้องได้ <b>28</b>)',
            starter: '# ภารกิจ: คำนวณพื้นที่ห้องสมบัติ\nw = 7\nh = 4\n\n',
            hint: '<code>print(w * h)</code>',
            xp: 50,
            check: (out, code) => eq(out, "28") && /w\s*\*\s*h|h\s*\*\s*w/.test(code)
          },
          {
            title: "สองกล่องในบรรทัดเดียว",
            desc: "Python ประกาศหลายตัวแปรพร้อมกันได้: x, y = 3, 4 — ค่าแรกเข้าตัวแรก ค่าสองเข้าตัวสอง",
            goal: 'ประกาศ <b>x, y = 3, 4</b> ในบรรทัดเดียว แล้ว print ผลรวม (ต้องได้ <b>7</b>)',
            starter: '# ภารกิจ: ประกาศสองตัวแปรในบรรทัดเดียว\n\n',
            hint: '<code>x, y = 3, 4</code> แล้ว <code>print(x + y)</code>',
            xp: 60,
            check: (out, code) => eq(out, "7") && /\w+\s*,\s*\w+\s*=/.test(code)
          }
        ]
      },
      {
        id: "input", icon: "⌨️", title: "รับข้อมูล (Input)",
        blurb: "คุยกับโปรแกรมได้จริง — รับข้อมูลจากผู้ใช้ด้วย input() แล้วเอาไปใช้ต่อ",
        lesson: [
          { h: "input() — หยุดรอรับข้อมูล", p: "input() ทำให้โปรแกรมหยุดรอให้ผู้ใช้พิมพ์อะไรบางอย่าง แล้วคืนค่านั้นกลับมาให้เราเก็บใส่ตัวแปร <b>ในเกมนี้ระบบจะป้อนค่าให้อัตโนมัติ</b>ตามที่โจทย์กำหนด (ดูกล่อง ⌨️ ในแต่ละด่าน)", code: 'name = input()\nprint("สวัสดี", name)' },
          { h: "ใส่ข้อความถามได้", p: "เขียนคำถามไว้ในวงเล็บเพื่อบอกผู้ใช้ว่าต้องพิมพ์อะไร เช่น input(\"ชื่อของคุณ: \") — หมายเหตุ: ในเกมนี้ข้อความถามจะไม่ถูกนับรวมในช่องผลลัพธ์ ตรวจเฉพาะสิ่งที่ print ออกมา", code: 'name = input("ชื่อของคุณ: ")' },
          { h: "ได้ข้อความ (string) เสมอ!", p: "กับดักอันดับหนึ่งของมือใหม่: input() คืนค่าเป็นข้อความเสมอ แม้ผู้ใช้จะพิมพ์ตัวเลข ถ้าอยากคำนวณต้องแปลงด้วย int() ก่อน", code: 'age = int(input())\nprint(age + 1)' },
          { h: "รับหลายค่า", p: "เรียก input() กี่ครั้งก็ได้ ค่าจะถูกป้อนให้ตามลำดับ ครั้งแรกได้ค่าแรก ครั้งที่สองได้ค่าถัดไป", code: 'a = int(input())\nb = int(input())\nprint(a + b)' }
        ],
        stages: [
          {
            title: "ทักทายผู้มาเยือน",
            desc: "input() รับข้อมูลเข้ามาเก็บในตัวแปร แล้วเอาไปใช้ต่อได้เหมือนตัวแปรปกติ — สังเกตกล่อง ⌨️ ด้านบน นั่นคือค่าที่ระบบจะป้อนให้",
            goal: 'รับชื่อด้วย input() แล้วแสดง <b>สวัสดี</b> ตามด้วยชื่อที่รับมา (ระบบจะป้อน "มะลิ" ให้ ผลลัพธ์ต้องได้ <b>สวัสดี มะลิ</b>)',
            starter: '# ภารกิจ: รับชื่อแล้วทักทาย\nname = input()\n\n',
            hint: 'บรรทัดถัดมา: <code>print("สวัสดี", name)</code>',
            xp: 50,
            stdin: ["มะลิ"],
            check: (out, code) => eq(out, "สวัสดี มะลิ") && /input\(/.test(code)
          },
          {
            title: "ถามก่อนรับ",
            desc: "ใส่คำถามในวงเล็บของ input เพื่อบอกผู้ใช้ว่าต้องพิมพ์อะไร (ในเกมนี้คำถามจะไม่แสดงในช่องผลลัพธ์ ตรวจเฉพาะที่ print)",
            goal: 'ใช้ <b>input("ชื่ออะไร: ")</b> รับชื่อ แล้วแสดง <b>ยินดีที่รู้จัก</b> ตามด้วยชื่อ (ระบบป้อน "โบ้" ผลลัพธ์ต้องได้ <b>ยินดีที่รู้จัก โบ้</b>)',
            starter: '# ภารกิจ: ถามชื่อแบบสุภาพ\nname = input("ชื่ออะไร: ")\n\n',
            hint: '<code>print("ยินดีที่รู้จัก", name)</code>',
            xp: 50,
            stdin: ["โบ้"],
            check: (out, code) => eq(out, "ยินดีที่รู้จัก โบ้") && /input\(\s*["']/.test(code)
          },
          {
            title: "กับดักตัวเลขปลอม",
            desc: "input() คืนค่าเป็นข้อความเสมอ! \"7\" + 3 จะพัง ต้องแปลงเป็นตัวเลขด้วย int() ก่อนถึงจะคำนวณได้",
            goal: 'รับตัวเลขด้วย input แปลงเป็น int แล้ว print ค่าที่<b>บวก 3</b> (ระบบป้อน "7" ผลลัพธ์ต้องได้ <b>10</b>)',
            starter: '# ภารกิจ: รับเลขแล้วบวก 3 — ระวังชนิดข้อมูล!\nn = input()\n\n',
            hint: 'แปลงก่อนบวก: <code>print(int(n) + 3)</code> หรือรับแบบแปลงเลย <code>n = int(input())</code>',
            xp: 60,
            stdin: ["7"],
            check: (out, code) => eq(out, "10") && /int\(/.test(code) && /input\(/.test(code)
          },
          {
            title: "รับสองค่ามารวมกัน",
            desc: "เรียก input() หลายครั้งได้ ระบบจะป้อนค่าให้ตามลำดับในกล่อง ⌨️ — ครั้งแรกได้ค่าแรก ครั้งที่สองได้ค่าที่สอง",
            goal: 'รับตัวเลข <b>สองค่า</b> ด้วย input สองครั้ง แล้ว print ผลรวม (ระบบป้อน "12" และ "30" ผลลัพธ์ต้องได้ <b>42</b>)',
            starter: '# ภารกิจ: เครื่องบวกเลขจากผู้ใช้\na = int(input())\n\n',
            hint: 'รับตัวที่สอง: <code>b = int(input())</code> แล้ว <code>print(a + b)</code>',
            xp: 60,
            stdin: ["12", "30"],
            check: (out, code) => eq(out, "42") && (code.match(/input\(/g) || []).length >= 2
          },
          {
            title: "แนะนำตัวสุดเท่",
            desc: "รวม input กับ f-string: รับข้อมูลหลายอย่างแล้วประกอบเป็นประโยคสวยๆ — สูตรของทุกฟอร์มลงทะเบียนในโลก",
            goal: 'รับ<b>ชื่อ</b>และ<b>อายุ</b> แล้วใช้ f-string แสดง <b>ฉันชื่อ มะลิ อายุ 15 ปี</b> (ระบบป้อน "มะลิ" และ "15")',
            starter: '# ภารกิจ: สร้างประโยคแนะนำตัวจากข้อมูลที่รับมา\nname = input()\nage = input()\n\n',
            hint: '<code>print(f"ฉันชื่อ {name} อายุ {age} ปี")</code>',
            xp: 80,
            stdin: ["มะลิ", "15"],
            check: (out, code) => eq(out, "ฉันชื่อ มะลิ อายุ 15 ปี") && /f["']/.test(code) && (code.match(/input\(/g) || []).length >= 2
          },
          {
            title: "ประตูรหัสลับ",
            desc: "input + if = โปรแกรมโต้ตอบของจริง: รับข้อมูลแล้วตัดสินใจตามค่าที่ได้ — เหมือนระบบล็อกอินย่อส่วน",
            goal: 'รับรหัสผ่านด้วย input ถ้าตรงกับ <b>"1234"</b> ให้แสดง <b>ปลดล็อกสำเร็จ</b> ไม่งั้นแสดง <b>รหัสผิด</b> (ระบบป้อน "1234")',
            starter: '# ภารกิจ: ระบบล็อกประตูฐานลับ\npassword = input()\n\n',
            hint: '<code>if password == "1234":</code> — เทียบเป็นข้อความ อย่าลืมเครื่องหมายคำพูด',
            xp: 80,
            stdin: ["1234"],
            check: (out, code) => eq(out, "ปลดล็อกสำเร็จ") && /if\s+/.test(code) && /input\(/.test(code)
          }
        ]
      },
      {
        id: "string", icon: "🔤", title: "ข้อความ (String)",
        blurb: "จัดการตัวอักษรอย่างเซียน — แปลงตัวใหญ่ ตัดคำ นับตัวอักษร ค้นหาคำ",
        lesson: [
          { h: "method — ท่าติดตัวของข้อความ", p: "ข้อความมีความสามารถในตัว เรียกใช้ด้วยจุดตามด้วยชื่อท่า เช่น <code>.upper()</code> ตัวพิมพ์ใหญ่, <code>.lower()</code> ตัวพิมพ์เล็ก, <code>.replace(เก่า, ใหม่)</code> เปลี่ยนคำ", code: '"hero".upper()            # "HERO"\n"a-b".replace("-", "+")   # "a+b"' },
          { h: "len() และการตัดข้อความ (slicing)", p: "<code>len()</code> นับจำนวนตัวอักษร ส่วน <code>[เริ่ม:จบ]</code> ตัดเอาบางส่วน — นับจาก 0 และหยุดก่อนตำแหน่งจบเสมอ", code: 'word = "python"\nlen(word)    # 6\nword[0:3]    # "pyt"' },
          { h: "ค้นหาและทำซ้ำ", p: "<code>in</code> เช็คว่ามีคำนี้อยู่ในข้อความไหม (ได้ True/False) ส่วน <code>*</code> ทำซ้ำข้อความกี่รอบก็ได้", code: '"py" in "python"   # True\n"ฮ่า" * 3           # "ฮ่าฮ่าฮ่า"' },
          { h: "split — หั่นข้อความเป็นชิ้น", p: "<code>.split(ตัวคั่น)</code> หั่นข้อความออกเป็น list ตามตัวคั่น ใช้บ่อยมากตอนอ่านข้อมูลดิบ", code: '"a,b,c".split(",")   # ["a", "b", "c"]' }
        ],
        stages: [
          {
            title: "ตะโกนด้วย upper()",
            desc: "String มี \"ท่าติดตัว\" เรียกว่า method เรียกใช้ด้วยจุดตามด้วยชื่อท่า เช่น .upper() แปลงเป็นตัวพิมพ์ใหญ่ทั้งหมด",
            goal: 'มีตัวแปร <b>word = "victory"</b> จง print แบบตัวพิมพ์ใหญ่ทั้งหมด (ต้องได้ <b>VICTORY</b>)',
            starter: '# ภารกิจ: ตะโกนคำว่าชัยชนะ!\nword = "victory"\n\n',
            hint: 'ลอง <code>print(word.upper())</code>',
            xp: 40,
            check: (out, code) => eq(out, "VICTORY") && /\.upper\(\)/.test(code)
          },
          {
            title: "นับความยาวคาถา",
            desc: "len() บอกจำนวนตัวอักษรในข้อความ (ใช้นับจำนวนสมาชิกใน list ได้ด้วย — ฟังก์ชันสารพัดประโยชน์)",
            goal: 'มีตัวแปร <b>spell = "abrakadabra"</b> จง print จำนวนตัวอักษรของคาถานี้ (ต้องได้ <b>11</b>)',
            starter: '# ภารกิจ: คาถานี้ยาวกี่ตัวอักษร?\nspell = "abrakadabra"\n\n',
            hint: 'ลอง <code>print(len(spell))</code>',
            xp: 50,
            check: (out, code) => eq(out, "11") && /len\(/.test(code)
          },
          {
            title: "ตัดข้อความ (Slicing)",
            desc: "ใช้ [เริ่ม:จบ] ตัดเอาบางส่วนของข้อความ โดยนับจาก 0 และหยุดก่อนตำแหน่งจบ เช่น [0:3] ได้ 3 ตัวแรก",
            goal: 'มีตัวแปร <b>code_name = "python-master"</b> จง print เฉพาะ <b>6 ตัวแรก</b> (ต้องได้ <b>python</b>)',
            starter: '# ภารกิจ: ถอดรหัสลับ เอาเฉพาะส่วนแรก\ncode_name = "python-master"\n\n',
            hint: 'ลอง <code>print(code_name[0:6])</code>',
            xp: 50,
            check: (out, code) => eq(out, "python") && /\[\s*\d*\s*:\s*\d+\s*\]/.test(code)
          },
          {
            title: "ค้นหาคำด้วย in",
            desc: "คีย์เวิร์ด in ใช้เช็คว่ามีคำนี้อยู่ในข้อความไหม ให้คำตอบเป็น True/False — ใช้ใน if ได้เลย",
            goal: 'มีประโยค <b>sentence = "มังกรเฝ้าสมบัติอยู่ในถ้ำ"</b> จง print ผลการเช็คว่ามีคำว่า <b>"มังกร"</b> อยู่ไหม (ต้องได้ <b>True</b>)',
            starter: '# ภารกิจ: สแกนหามังกรในประโยค\nsentence = "มังกรเฝ้าสมบัติอยู่ในถ้ำ"\n\n',
            hint: 'ลอง <code>print("มังกร" in sentence)</code>',
            xp: 60,
            check: (out, code) => eq(out, "True") && /\bin\b/.test(code)
          },
          {
            title: "ทำซ้ำข้อความด้วย *",
            desc: "เครื่องหมาย * กับข้อความคือการทำซ้ำ เช่น \"ab\" * 3 ได้ \"ababab\" — เหมาะกับการสร้างลวดลายหรือเสียงหัวเราะ",
            goal: 'มีตัวแปร <b>laugh = "ฮ่า"</b> จง print เสียงหัวเราะ 3 รอบติดกัน (ต้องได้ <b>ฮ่าฮ่าฮ่า</b>)',
            starter: '# ภารกิจ: หัวเราะสามรอบรวด\nlaugh = "ฮ่า"\n\n',
            hint: 'ลอง <code>print(laugh * 3)</code>',
            xp: 60,
            check: (out, code) => eq(out, "ฮ่าฮ่าฮ่า") && /\*/.test(code)
          },
          {
            title: "เสกคำใหม่ด้วย replace",
            desc: ".replace(เก่า, ใหม่) เปลี่ยนคำในข้อความ — ใช้แก้คำผิด เซ็นเซอร์คำ หรือเสกประโยคใหม่ได้เลย",
            goal: 'มี <b>msg = "ฉันเกลียดบั๊ก"</b> จงใช้ replace เปลี่ยน <b>เกลียด</b> เป็น <b>รัก</b> แล้ว print (ต้องได้ <b>ฉันรักบั๊ก</b>)',
            starter: '# ภารกิจ: ปรับทัศนคติต่อบั๊กสักหน่อย\nmsg = "ฉันเกลียดบั๊ก"\n\n',
            hint: 'ลอง <code>print(msg.replace("เกลียด", "รัก"))</code>',
            xp: 60,
            check: (out, code) => eq(out, "ฉันรักบั๊ก") && /\.replace\(/.test(code)
          },
          {
            title: "แยกข้อมูลด้วย split",
            desc: ".split(ตัวคั่น) หั่นข้อความเป็น list — นี่คือวิธีอ่านข้อมูลแบบ CSV ที่ใช้กันจริงในทุกวงการ",
            goal: 'มีข้อมูล <b>data = "มะลิ,15,นักเวท"</b> จง split ด้วยจุลภาค แล้ว print เฉพาะ<b>อาชีพ</b> (ส่วนที่สาม ต้องได้ <b>นักเวท</b>)',
            starter: '# ภารกิจ: อ่านบัตรนักผจญภัยจากข้อมูลดิบ\ndata = "มะลิ,15,นักเวท"\n\n',
            hint: 'สองจังหวะ: <code>parts = data.split(",")</code> แล้ว <code>print(parts[2])</code>',
            xp: 80,
            check: (out, code) => eq(out, "นักเวท") && /\.split\(/.test(code)
          },
          {
            title: "เทียบแบบไม่สนตัวพิมพ์",
            desc: "ผู้ใช้อาจพิมพ์ YES, Yes หรือ yes — แปลงเป็นตัวเล็กด้วย .lower() ก่อนเทียบ จะครอบคลุมทุกแบบ",
            goal: 'มี <b>ans = "YES"</b> จง print ผลการเทียบว่า ans (แปลงเป็นตัวเล็กแล้ว) เท่ากับ <b>"yes"</b> ไหม (ต้องได้ <b>True</b>)',
            starter: '# ภารกิจ: เช็คคำตอบแบบใจกว้าง\nans = "YES"\n\n',
            hint: '<code>print(ans.lower() == "yes")</code>',
            xp: 60,
            check: (out, code) => eq(out, "True") && /\.lower\(\)/.test(code)
          },
          {
            title: "นับคำด้วย count",
            desc: ".count(คำ) นับว่าคำนั้นปรากฏกี่ครั้งในข้อความ — ใช้วิเคราะห์เนื้อเพลง ข้อความ หรือ DNA ก็ยังได้",
            goal: 'มีเนื้อเพลง <b>song = "นานานา นา"</b> จง print จำนวนครั้งที่มีคำว่า <b>"นา"</b> (ต้องได้ <b>4</b>)',
            starter: '# ภารกิจ: นับท่อนฮุกในเพลง\nsong = "นานานา นา"\n\n',
            hint: '<code>print(song.count("นา"))</code>',
            xp: 80,
            check: (out, code) => eq(out, "4") && /\.count\(/.test(code)
          }
        ]
      },
      {
        id: "datastructure", icon: "🗂️", title: "โครงสร้างข้อมูล",
        blurb: "จัดระเบียบข้อมูลด้วย List และ Dictionary — กระเป๋าเก็บของของโปรแกรมเมอร์",
        lesson: [
          { h: "List — เก็บหลายค่าในตัวแปรเดียว", p: "เขียนใน <code>[]</code> เข้าถึงสมาชิกด้วยตำแหน่ง — เริ่มนับจาก 0 และใช้เลขติดลบนับจากท้ายได้ (-1 คือตัวสุดท้าย)", code: 'items = ["ดาบ", "โล่", "ยา"]\nitems[0]    # "ดาบ"\nitems[-1]   # "ยา"' },
          { h: "เพิ่ม ลบ เรียง", p: "<code>.append(ค่า)</code> เพิ่มต่อท้าย, <code>.remove(ค่า)</code> ลบตัวที่ตรงกับค่า, <code>.sort()</code> เรียงจากน้อยไปมากทันที", code: 'items.append("คบเพลิง")\nitems.remove("โล่")\nnums.sort()' },
          { h: "ฟังก์ชันคู่ใจของ list", p: "<code>len()</code> นับจำนวนสมาชิก, <code>sum()</code> รวมตัวเลขทั้งหมด, <code>max()</code>/<code>min()</code> หาค่ามาก/น้อยสุด", code: 'len(items)         # 3\nsum([1, 2, 3])     # 6\nmax([4, 9, 2])     # 9' },
          { h: "Dictionary — ข้อมูลแบบมีชื่อช่อง", p: "เก็บเป็นคู่ <code>ชื่อช่อง: ค่า</code> ใน <code>{}</code> — เข้าถึงหรือเพิ่มช่องใหม่ด้วยชื่อช่องได้เลย เหมาะกับข้อมูลที่มีหลายด้าน เช่น ตัวละครหนึ่งตัว", code: 'p = {"name": "มะลิ", "hp": 100}\np["hp"]        # 100\np["mp"] = 50   # เพิ่มช่องใหม่' }
        ],
        stages: [
          {
            title: "กระเป๋านักผจญภัย (List)",
            desc: "List คือรายการข้อมูลหลายชิ้นในตัวแปรเดียว เขียนใน [] และหยิบของชิ้นที่ต้องการด้วยเลขตำแหน่ง (เริ่มนับจาก 0!)",
            goal: 'มี list ชื่อ <b>items</b> อยู่แล้ว จง print ของ<b>ชิ้นแรก</b>ในกระเป๋า (ต้องได้ <b>ดาบ</b>)',
            starter: '# ภารกิจ: หยิบของชิ้นแรกจากกระเป๋า\nitems = ["ดาบ", "โล่", "ยาฟื้นพลัง"]\n\n',
            hint: 'ตำแหน่งแรกคือ 0 — ลอง <code>print(items[0])</code>',
            xp: 50,
            check: (out, code) => eq(out, "ดาบ") && /\[0\]/.test(code)
          },
          {
            title: "เก็บของเพิ่มเข้ากระเป๋า",
            desc: "ใช้ .append() เพื่อเพิ่มของเข้าท้าย list และ len() เพื่อนับว่ามีของกี่ชิ้น",
            goal: 'เพิ่ม <b>"คบเพลิง"</b> เข้าไปใน items แล้ว print จำนวนของทั้งหมด (ต้องได้ <b>4</b>)',
            starter: '# ภารกิจ: เก็บคบเพลิงเข้ากระเป๋า แล้วนับของ\nitems = ["ดาบ", "โล่", "ยาฟื้นพลัง"]\n\n',
            hint: 'สองบรรทัด: <code>items.append("คบเพลิง")</code> แล้ว <code>print(len(items))</code>',
            xp: 50,
            check: (out, code) => eq(out, "4") && /\.append\(/.test(code) && /len\(/.test(code)
          },
          {
            title: "หยิบจากท้ายด้วยเลขติดลบ",
            desc: "เคล็ดลับ Python: ตำแหน่ง -1 คือชิ้นสุดท้าย -2 คือรองสุดท้าย ไม่ต้องรู้ความยาว list ก็หยิบจากท้ายได้",
            goal: 'จาก list เดิม จง print ของ<b>ชิ้นสุดท้าย</b>โดยใช้เลขติดลบ (ต้องได้ <b>ยาฟื้นพลัง</b>)',
            starter: '# ภารกิจ: หยิบของชิ้นสุดท้ายแบบเซียน\nitems = ["ดาบ", "โล่", "ยาฟื้นพลัง"]\n\n',
            hint: 'ลอง <code>print(items[-1])</code>',
            xp: 60,
            check: (out, code) => eq(out, "ยาฟื้นพลัง") && /\[-1\]/.test(code)
          },
          {
            title: "รวมพลังทั้งทีม",
            desc: "sum() รวมตัวเลขทั้งหมดใน list ในคำสั่งเดียว (มี min() และ max() หาค่าน้อยสุด/มากสุดด้วยนะ)",
            goal: 'มีพลังโจมตีของทีม <b>powers = [12, 30, 25]</b> จง print พลังรวมทั้งทีม (ต้องได้ <b>67</b>)',
            starter: '# ภารกิจ: รวมพลังโจมตีของทั้งทีม\npowers = [12, 30, 25]\n\n',
            hint: 'ลอง <code>print(sum(powers))</code>',
            xp: 60,
            check: (out, code) => eq(out, "67") && /sum\(/.test(code)
          },
          {
            title: "บัตรประจำตัว (Dictionary)",
            desc: "Dictionary เก็บข้อมูลเป็นคู่ ชื่อช่อง: ค่า เขียนใน {} เหมาะกับข้อมูลที่มีหลายด้าน เช่น ข้อมูลตัวละคร",
            goal: 'มี dict ชื่อ <b>player</b> อยู่แล้ว จง print ค่าพลังชีวิตจากช่อง <b>"hp"</b> (ต้องได้ <b>100</b>)',
            starter: '# ภารกิจ: อ่านค่า hp จากบัตรตัวละคร\nplayer = {"name": "นักผจญภัย", "hp": 100}\n\n',
            hint: 'เข้าถึงค่าใน dict ด้วยชื่อช่อง: <code>print(player["hp"])</code>',
            xp: 80,
            check: (out, code) => eq(out, "100") && /\[\s*["']hp["']\s*\]/.test(code)
          },
          {
            title: "เพิ่มช่องใหม่ให้บัตร",
            desc: "เพิ่มหรือแก้ข้อมูลใน dict ง่ายมาก แค่กำหนดค่าให้ช่องนั้นตรงๆ เช่น player[\"mp\"] = 50 ถ้าช่องยังไม่มีจะถูกสร้างใหม่ให้เอง",
            goal: 'เพิ่มช่อง <b>"mp"</b> ค่า <b>50</b> เข้าไปใน player แล้ว print ค่า mp ออกมา (ต้องได้ <b>50</b>)',
            starter: '# ภารกิจ: ปลดล็อกพลังเวท เพิ่ม mp ให้ตัวละคร\nplayer = {"name": "นักผจญภัย", "hp": 100}\n\n',
            hint: 'สองบรรทัด: <code>player["mp"] = 50</code> แล้ว <code>print(player["mp"])</code>',
            xp: 80,
            check: (out, code) => eq(out, "50") && /\[\s*["']mp["']\s*\]\s*=/.test(code)
          },
          {
            title: "ทิ้งของด้วย remove",
            desc: ".remove(ค่า) ลบสมาชิกตัวแรกที่ตรงกับค่านั้นออกจาก list ทันที",
            goal: 'กระเป๋าหนักไป! จง remove <b>"โล่"</b> ออกจาก items แล้ว print จำนวนของที่เหลือ (ต้องได้ <b>2</b>)',
            starter: '# ภารกิจ: ทิ้งโล่เพื่อวิ่งให้เร็วขึ้น\nitems = ["ดาบ", "โล่", "ยาฟื้นพลัง"]\n\n',
            hint: '<code>items.remove("โล่")</code> แล้ว <code>print(len(items))</code>',
            xp: 60,
            check: (out, code) => eq(out, "2") && /\.remove\(/.test(code)
          },
          {
            title: "จัดเรียงด้วย sort",
            desc: ".sort() เรียงสมาชิกใน list จากน้อยไปมากทันที (list เดิมถูกเรียงใหม่เลย ไม่ต้องรับค่ากลับ)",
            goal: 'มีค่าพลัง <b>nums = [30, 5, 12]</b> จง sort แล้ว print ค่าที่<b>น้อยที่สุด</b> (ตัวแรกหลังเรียง ต้องได้ <b>5</b>)',
            starter: '# ภารกิจ: เรียงพลังจากน้อยไปมาก แล้วดูตัวอ่อนสุด\nnums = [30, 5, 12]\n\n',
            hint: '<code>nums.sort()</code> แล้ว <code>print(nums[0])</code>',
            xp: 80,
            check: (out, code) => eq(out, "5") && /\.sort\(\)/.test(code)
          },
          {
            title: "หาตัวแข็งแกร่งสุด",
            desc: "max() หาค่ามากสุดใน list ในคำสั่งเดียว (คู่กับ min() ที่หาค่าน้อยสุด) — ไม่ต้องเขียนลูปเองเลย",
            goal: 'มีพลังโจมตี <b>powers = [12, 30, 25]</b> จง print ค่าพลังที่<b>มากที่สุด</b> (ต้องได้ <b>30</b>)',
            starter: '# ภารกิจ: หานักสู้ที่แข็งแกร่งที่สุด\npowers = [12, 30, 25]\n\n',
            hint: '<code>print(max(powers))</code>',
            xp: 60,
            check: (out, code) => eq(out, "30") && /max\(/.test(code)
          },
          {
            title: "อ่านบัตรด้วย f-string",
            desc: "ดึงค่าจาก dict มาใส่ f-string ได้เลย — เคล็ดลับ: ข้างใน {} ใช้คำพูดเดี่ยว player['name'] เพื่อไม่ชนกับคำพูดคู่ข้างนอก",
            goal: 'จาก dict player จงแสดง <b>นักผจญภัย มีพลัง 100</b> ด้วย f-string เดียว',
            starter: '# ภารกิจ: ประกาศข้อมูลตัวละครในประโยคเดียว\nplayer = {"name": "นักผจญภัย", "hp": 100}\n\n',
            hint: "<code>print(f\"{player['name']} มีพลัง {player['hp']}\")</code>",
            xp: 80,
            check: (out, code) => eq(out, "นักผจญภัย มีพลัง 100") && /f["']/.test(code) && /player\[/.test(code)
          }
        ]
      },
      {
        id: "operator", icon: "➗", title: "ตัวดำเนินการ (Operator)",
        blurb: "เครื่องมือคำนวณและเปรียบเทียบ — หาเศษ ยกกำลัง และตรรกะ and/or",
        lesson: [
          { h: "เลขคณิตครบชุด", p: "นอกจาก <code>+ - * /</code> แล้ว มีอีกสามตัวที่ออกข้อสอบบ่อยสุด: <code>%</code> หารเอาเศษ, <code>//</code> หารปัดเศษลง, <code>**</code> ยกกำลัง", code: '17 % 5    # 2  (เศษ)\n17 // 5   # 3  (ผลหารปัดลง)\n2 ** 10   # 1024' },
          { h: "เปรียบเทียบ — ได้คำตอบ True/False", p: "<code>&gt; &lt; &gt;= &lt;=</code> ตามคณิตศาสตร์, <code>==</code> เท่ากับ (สองตัว! ตัวเดียวคือการเก็บค่า), <code>!=</code> ไม่เท่ากับ — เขียนต่อกันเป็นช่วงได้ด้วย", code: '10 > 7          # True\nx == 5          # เช็คว่า x เท่ากับ 5 ไหม\n10 <= age <= 18 # อยู่ในช่วง 10-18 ไหม' },
          { h: "ตรรกะ and / or / not", p: "<code>and</code> จริงเมื่อทั้งสองฝั่งจริง, <code>or</code> จริงเมื่อมีอย่างน้อยหนึ่งฝั่งจริง, <code>not</code> กลับค่าจริงเป็นเท็จ", code: 'True and False   # False\nTrue or False    # True\nnot True         # False' }
        ],
        stages: [
          {
            title: "หารเอาเศษ กับหารปัดเศษ",
            desc: "นอกจาก + - * / แล้ว Python ยังมี % (หารเอาเศษ) และ // (หารปัดเศษลง) ที่ใช้บ่อยมากในเกมและโจทย์จริง",
            goal: 'print สองบรรทัด: บรรทัดแรกคือ <b>17 % 5</b> บรรทัดสองคือ <b>17 // 5</b> (ต้องได้ <b>2</b> และ <b>3</b>)',
            starter: '# ภารกิจ: แบ่งเหรียญ 17 อันให้เพื่อน 5 คน\n# เหลือเศษกี่อัน? ได้คนละกี่อัน?\n\n',
            hint: 'สองบรรทัด: <code>print(17 % 5)</code> และ <code>print(17 // 5)</code>',
            xp: 40,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "2" && l[1] === "3" && code.includes("%") && code.includes("//"); }
          },
          {
            title: "ยกกำลังด้วย **",
            desc: "เครื่องหมาย ** คือการยกกำลัง เช่น 2 ** 3 ได้ 8 — พลังของมันโตเร็วมาก ลองดู",
            goal: 'จง print ค่า <b>2 ยกกำลัง 10</b> (ต้องได้ <b>1024</b>)',
            starter: '# ภารกิจ: มังกรแยกร่างเท่าตัว 10 รอบ จะมีกี่ตัว?\n\n',
            hint: 'ลอง <code>print(2 ** 10)</code>',
            xp: 40,
            check: (out, code) => eq(out, "1024") && code.includes("**")
          },
          {
            title: "เครื่องเปรียบเทียบ",
            desc: "ตัวดำเนินการเปรียบเทียบ เช่น > < == != จะให้คำตอบเป็น True หรือ False ซึ่งเป็นหัวใจของการตัดสินใจในโปรแกรม",
            goal: 'print สองบรรทัด: <b>10 > 7</b> และ <b>3 == 5</b> (ต้องได้ <b>True</b> และ <b>False</b>)',
            starter: '# ภารกิจ: ให้ Python ตอบคำถามจริง/เท็จ\n# ระวัง: เท่ากับ ใช้ == (สองตัว) ไม่ใช่ =\n\n',
            hint: '<code>print(10 > 7)</code> และ <code>print(3 == 5)</code> — ไม่ต้องใส่เครื่องหมายคำพูด',
            xp: 50,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "True" && l[1] === "False" && code.includes("=="); }
          },
          {
            title: "ตรรกะ and / or",
            desc: "and จะเป็น True เมื่อทั้งสองฝั่งจริง ส่วน or เป็น True เมื่อฝั่งใดฝั่งหนึ่งจริง ใช้รวมหลายเงื่อนไขเข้าด้วยกัน",
            goal: 'มีตัวแปร key และ torch อยู่แล้ว จง print <b>key and torch</b> แล้วตามด้วย <b>key or torch</b> (ต้องได้ <b>False</b> และ <b>True</b>)',
            starter: '# ภารกิจ: มีกุญแจแต่ไม่มีคบเพลิง จะเข้าถ้ำได้ไหม?\nkey = True\ntorch = False\n\n',
            hint: '<code>print(key and torch)</code> และ <code>print(key or torch)</code>',
            xp: 50,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "False" && l[1] === "True" && /\band\b/.test(code) && /\bor\b/.test(code); }
          },
          {
            title: "ทางลัด += และ -=",
            desc: "โปรแกรมเมอร์ตัวจริงชอบเขียนสั้น: gold += 50 คือเพิ่ม 50 และ gold -= 30 คือลด 30 — สั้นกว่า gold = gold + 50 เยอะ",
            goal: 'เริ่มด้วย <b>gold = 100</b> ใช้ <b>+=</b> เพิ่ม 50 แล้วใช้ <b>-=</b> ลด 30 จากนั้น print (ต้องได้ <b>120</b>)',
            starter: '# ภารกิจ: รับรางวัลแล้วจ่ายค่าที่พัก\ngold = 100\n\n',
            hint: 'สองบรรทัด: <code>gold += 50</code> แล้ว <code>gold -= 30</code> แล้วค่อย print',
            xp: 60,
            check: (out, code) => eq(out, "120") && code.includes("+=") && code.includes("-=")
          },
          {
            title: "เปรียบเทียบสามชั้น",
            desc: "Python เขียนเงื่อนไขช่วงได้เหมือนคณิตศาสตร์เลย: 10 <= age <= 18 เช็คว่า age อยู่ระหว่าง 10 ถึง 18 ในนัดเดียว",
            goal: 'กำหนด <b>age = 15</b> จง print ผลเช็คว่า age อยู่ในช่วง <b>10 ถึง 18</b> โดยเขียนเงื่อนไขต่อกันในนิพจน์เดียว (ต้องได้ <b>True</b>)',
            starter: '# ภารกิจ: เช็คว่าเป็นวัยรุ่นไหมในบรรทัดเดียว\nage = 15\n\n',
            hint: 'ลอง <code>print(10 <= age <= 18)</code>',
            xp: 50,
            check: (out, code) => eq(out, "True") && (code.match(/<=/g) || []).length >= 2
          },
          {
            title: "แปลงนาทีเป็นชั่วโมง",
            desc: "โจทย์คลาสสิกของ % กับ //: // ได้จำนวนชั่วโมงเต็ม ส่วน % ได้นาทีที่เหลือเศษ",
            goal: 'ภารกิจใช้เวลา <b>135 นาที</b> จง print ในรูปแบบ <b>2 ชั่วโมง 15 นาที</b> โดยคำนวณจากตัวแปร minutes (ห้ามพิมพ์เลขคำตอบตรงๆ)',
            starter: '# ภารกิจ: 135 นาที คือกี่ชั่วโมงกี่นาที?\nminutes = 135\n\n',
            hint: 'ลอง <code>print(minutes // 60, "ชั่วโมง", minutes % 60, "นาที")</code>',
            xp: 60,
            check: (out, code) => lines(out)[0] === "2 ชั่วโมง 15 นาที" && code.includes("//") && code.includes("%")
          },
          {
            title: "วงเล็บเปลี่ยนโลก",
            desc: "Python คูณหารก่อนบวกลบเสมอ (เหมือนคณิตศาสตร์) — ใส่วงเล็บเมื่ออยากให้คิดส่วนไหนก่อน",
            goal: 'print สองบรรทัด: <b>(2 + 3) * 4</b> และ <b>2 + 3 * 4</b> แล้วดูว่าต่างกันแค่ไหน (ต้องได้ <b>20</b> และ <b>14</b>)',
            starter: '# ภารกิจ: พิสูจน์พลังของวงเล็บ\n\n',
            hint: '<code>print((2 + 3) * 4)</code> แล้ว <code>print(2 + 3 * 4)</code>',
            xp: 50,
            check: (out, code) => { const l = lines(out); return l.join(",") === "20,14" && /\(\s*2\s*\+\s*3\s*\)/.test(code); }
          },
          {
            title: "ไม่เท่ากับ !=",
            desc: "!= คือ \"ไม่เท่ากับ\" — คู่ตรงข้ามของ == ใช้บ่อยเวลาเช็คว่าค่าเปลี่ยนไปหรือยัง",
            goal: 'print สองบรรทัด: <b>5 != 3</b> และ <b>"a" != "a"</b> (ต้องได้ <b>True</b> และ <b>False</b>)',
            starter: '# ภารกิจ: ทดสอบเครื่องหมายไม่เท่ากับ\n\n',
            hint: '<code>print(5 != 3)</code> และ <code>print("a" != "a")</code>',
            xp: 50,
            check: (out, code) => { const l = lines(out); return l.join(",") === "True,False" && code.includes("!="); }
          }
        ]
      },
      {
        id: "ifelse", icon: "🚪", title: "เงื่อนไข If-Else",
        blurb: "สอนโปรแกรมให้ตัดสินใจ — ถ้าเจอแบบนี้ให้ทำอย่างนั้น ไม่งั้นทำอีกอย่าง",
        lesson: [
          { h: "โครงสร้าง if / elif / else", p: "Python เช็คเงื่อนไขจากบนลงล่าง เจอทางแรกที่เป็นจริงก็เดินทางนั้นแล้วจบ — อย่าลืม <code>:</code> ท้ายบรรทัดเงื่อนไข และย่อหน้า 4 ช่องให้โค้ดในแต่ละทาง", code: 'if score >= 80:\n    print("A")\nelif score >= 50:\n    print("B")\nelse:\n    print("F")' },
          { h: "รวมหลายเงื่อนไขในบรรทัดเดียว", p: "ใช้ <code>and</code> / <code>or</code> / <code>not</code> ผสมในเงื่อนไข if ได้เลย เช่น ต้องมีทั้งพลังชีวิตและกุญแจ", code: 'if hp > 0 and has_key:\n    print("ไปต่อได้")' },
          { h: "if ซ้อน if", p: "ใน if มี if อีกชั้นได้ (ย่อหน้าลึกเข้าไปอีกขั้น) — ใช้กับการตัดสินใจที่มีลำดับ เช่น เช็คพลังก่อน ค่อยเช็คเลเวล", code: 'if hp > 50:\n    if level > 10:\n        print("พร้อมลุย!")' }
        ],
        stages: [
          {
            title: "ประตูลับ",
            desc: "if ใช้ตรวจเงื่อนไข ถ้าจริงจะทำบรรทัดที่ย่อหน้าเข้าไป ถ้าไม่จริงจะไปทำในส่วน else แทน อย่าลืมเครื่องหมาย : ท้ายบรรทัด",
            goal: 'กำหนด <b>key = 7</b> ถ้า key มากกว่า 5 ให้พิมพ์ <b>ประตูเปิดแล้ว!</b> ไม่งั้นพิมพ์ <b>ประตูล็อกอยู่</b>',
            starter: '# ภารกิจ: ใช้ if/else เปิดประตูลับ\nkey = 7\n\n',
            hint: 'โครงสร้าง: <code>if key > 5:</code> (ขึ้นบรรทัดใหม่ ย่อหน้า) <code>print(...)</code> แล้ว <code>else:</code> อีกชุด',
            xp: 50,
            check: (out, code) => eq(out, "ประตูเปิดแล้ว!") && /if\s+/.test(code) && /else\s*:/.test(code)
          },
          {
            title: "ตัดเกรดด้วย elif",
            desc: "ถ้ามีมากกว่า 2 ทางเลือก ใช้ elif (else if) คั่นกลาง Python จะเช็คจากบนลงล่างแล้วเลือกทางแรกที่เป็นจริง",
            goal: 'กำหนด <b>score = 75</b> ถ้า ≥ 80 พิมพ์ <b>เก่งมาก</b> / ถ้า ≥ 50 พิมพ์ <b>ผ่าน</b> / นอกนั้นพิมพ์ <b>ลองใหม่</b> (คำตอบต้องได้ <b>ผ่าน</b>)',
            starter: '# ภารกิจ: ตัดเกรดคะแนนสอบเวทมนตร์\nscore = 75\n\n',
            hint: 'เรียงเป็น <code>if score >= 80:</code> → <code>elif score >= 50:</code> → <code>else:</code>',
            xp: 50,
            check: (out, code) => eq(out, "ผ่าน") && /elif\s+/.test(code)
          },
          {
            title: "เงื่อนไขซ้อนด้วย and",
            desc: "บางครั้งต้องผ่านหลายเงื่อนไขพร้อมกัน เช่น ต้องมีพลังชีวิตเหลือ และ มีกุญแจ ถึงจะไปต่อได้ ใช้ and เชื่อมใน if ได้เลย",
            goal: 'กำหนด <b>hp = 50</b> และ <b>has_key = True</b> ถ้า hp มากกว่า 0 <b>และ</b> has_key เป็นจริง พิมพ์ <b>ไปต่อได้!</b> ไม่งั้นพิมพ์ <b>ติดอยู่ที่เดิม</b>',
            starter: '# ภารกิจ: เช็คสองเงื่อนไขก่อนเข้าด่านต่อไป\nhp = 50\nhas_key = True\n\n',
            hint: 'เขียน <code>if hp > 0 and has_key:</code> — ตัวแปร True/False ใช้เดี่ยวๆ ในเงื่อนไขได้เลย',
            xp: 60,
            check: (out, code) => eq(out, "ไปต่อได้!") && /\band\b/.test(code) && /if\s+/.test(code)
          },
          {
            title: "กลับค่าด้วย not",
            desc: "not กลับความจริงเป็นเท็จและเท็จเป็นจริง เช่น not False ได้ True — อ่านเป็นภาษาคนได้ว่า \"ถ้าไม่...\"",
            goal: 'กำหนด <b>is_locked = False</b> ถ้าประตู<b>ไม่</b>ล็อก (ใช้ not) พิมพ์ <b>เข้าไปได้</b> ไม่งั้นพิมพ์ <b>ต้องหากุญแจ</b>',
            starter: '# ภารกิจ: ประตูไม่ล็อก ก็เข้าไปเลยสิ!\nis_locked = False\n\n',
            hint: 'เขียน <code>if not is_locked:</code> — อ่านว่า "ถ้าไม่ล็อก"',
            xp: 60,
            check: (out, code) => eq(out, "เข้าไปได้") && /\bnot\b/.test(code)
          },
          {
            title: "if ซ้อน if",
            desc: "ใน if สามารถมี if อีกชั้นได้ (ย่อหน้าลึกเข้าไปอีกขั้น) ใช้เมื่อการตัดสินใจมีลำดับชั้น เช่น เช็คพลังก่อน แล้วค่อยเช็คเลเวล",
            goal: 'กำหนด <b>hp = 70</b>, <b>level = 12</b> ถ้า hp > 50: เช็คต่อว่าถ้า level > 10 พิมพ์ <b>พร้อมสู้บอส!</b> ไม่งั้นพิมพ์ <b>ฝึกอีกนิด</b> / แต่ถ้า hp ไม่ถึง พิมพ์ <b>พักก่อน</b>',
            starter: '# ภารกิจ: เช็คความพร้อมสองชั้นก่อนสู้บอส\nhp = 70\nlevel = 12\n\n',
            hint: 'if ชั้นในต้องย่อหน้าลึกกว่าชั้นนอก: <code>if hp > 50:</code> แล้วข้างในมี <code>if level > 10:</code> กับ <code>else:</code> ของมันเอง',
            xp: 80,
            check: (out, code) => eq(out, "พร้อมสู้บอส!") && (code.match(/if\s+/g) || []).length >= 2
          },
          {
            title: "คู่หรือคี่?",
            desc: "สูตรที่เจอในทุกข้อสอบ: เลขคู่คือเลขที่หาร 2 ลงตัว (n % 2 == 0) — จับคู่ % กับ if ให้คล่องไว้เลย",
            goal: 'กำหนด <b>n = 7</b> ถ้าเป็นเลขคู่พิมพ์ <b>คู่</b> ไม่งั้นพิมพ์ <b>คี่</b> (คำตอบต้องได้ <b>คี่</b>)',
            starter: '# ภารกิจ: เครื่องตรวจเลขคู่เลขคี่\nn = 7\n\n',
            hint: 'เช็ค <code>if n % 2 == 0:</code> แล้วตามด้วย else',
            xp: 60,
            check: (out, code) => eq(out, "คี่") && /%/.test(code) && /if\s+/.test(code)
          },
          {
            title: "เครื่องขายตั๋วอัตโนมัติ",
            desc: "โจทย์ประยุกต์ elif: ราคาตั๋วขึ้นกับช่วงอายุ — เขียนเงื่อนไขให้ครอบคลุมทุกกรณีโดยไม่ทับซ้อนกัน",
            goal: 'กำหนด <b>age = 10</b> ถ้าอายุน้อยกว่า 12 พิมพ์ <b>เด็ก 50 บาท</b> / ถ้า 60 ขึ้นไป พิมพ์ <b>สูงวัย 60 บาท</b> / นอกนั้น <b>ผู้ใหญ่ 100 บาท</b>',
            starter: '# ภารกิจ: เครื่องขายตั๋วสวนสนุก\nage = 10\n\n',
            hint: '<code>if age < 12:</code> → <code>elif age >= 60:</code> → <code>else:</code>',
            xp: 80,
            check: (out, code) => eq(out, "เด็ก 50 บาท") && /elif\s+/.test(code)
          },
          {
            title: "ร่ายคาถาให้ถูกคำ",
            desc: "if เทียบข้อความได้ด้วย == เหมือนตัวเลขเลย — แต่ต้องสะกดตรงเป๊ะทุกตัวอักษร",
            goal: 'กำหนด <b>spell = "ไฟ"</b> ถ้าคาถาคือ <b>"ไฟ"</b> ให้แสดง <b>ลุกโชน!</b> ไม่งั้นแสดง <b>แชะ... ไม่มีอะไรเกิดขึ้น</b>',
            starter: '# ภารกิจ: เครื่องตรวจคาถา\nspell = "ไฟ"\n\n',
            hint: '<code>if spell == "ไฟ":</code> — เทียบข้อความต้องมีเครื่องหมายคำพูด',
            xp: 60,
            check: (out, code) => eq(out, "ลุกโชน!") && /==\s*["']/.test(code)
          },
          {
            title: "if แบบบรรทัดเดียว",
            desc: "ท่าลัดของ Python: ค่า1 if เงื่อนไข else ค่า2 — เลือกค่าตามเงื่อนไขจบในบรรทัดเดียว (เรียกว่า conditional expression)",
            goal: 'กำหนด <b>hp = 1</b> จงสร้างตัวแปร status ด้วย if บรรทัดเดียว: ได้ <b>"ชนะ"</b> ถ้า hp > 0 ไม่งั้น <b>"แพ้"</b> แล้ว print (ต้องได้ <b>ชนะ</b>)',
            starter: '# ภารกิจ: ตัดสินผลแบบมือโปร\nhp = 1\n# status = ... if ... else ...\n\nprint(status)\n',
            hint: '<code>status = "ชนะ" if hp > 0 else "แพ้"</code>',
            xp: 80,
            check: (out, code) => eq(out, "ชนะ") && /if\s+.+\s+else\s+/.test(code)
          }
        ]
      },
      {
        id: "loop", icon: "🔁", title: "ลูป For / While",
        blurb: "ทำงานซ้ำร้อยรอบด้วยโค้ดไม่กี่บรรทัด — พลังที่แท้จริงของคอมพิวเตอร์",
        lesson: [
          { h: "for + range — วนตามจำนวนรอบ", p: "<code>range(1, 6)</code> ให้เลข 1 ถึง 5 (หยุดก่อนตัวหลังเสมอ) — โค้ดที่จะทำซ้ำต้องย่อหน้าเข้าไปในลูป", code: 'for i in range(1, 6):\n    print(i)   # 1 2 3 4 5' },
          { h: "for วน list โดยตรง", p: "หยิบสมาชิกใน list มาให้ทีละตัว ไม่ต้องยุ่งกับตำแหน่งเลย — อ่านเป็นภาษาคนว่า \"สำหรับของแต่ละชิ้นใน...\"", code: 'for item in items:\n    print(item)' },
          { h: "while — วนตามเงื่อนไข", p: "วนตราบใดที่เงื่อนไขยังจริง ใช้เมื่อไม่รู้จำนวนรอบล่วงหน้า — <b>ต้องมี</b>บรรทัดที่ทำให้เงื่อนไขเป็นเท็จได้ ไม่งั้นลูปไม่มีวันจบ!", code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1' },
          { h: "break / continue และลูปซ้อนลูป", p: "<code>break</code> หยุดลูปทันที, <code>continue</code> ข้ามรอบนี้ไปรอบถัดไป — และใน for มี for อีกชั้นได้ สำหรับงานแบบตาราง/กระดาน", code: 'for i in range(10):\n    if i == 3:\n        continue   # ข้าม 3\n    if i == 6:\n        break      # หยุดที่ 6\n    print(i)' }
        ],
        stages: [
          {
            title: "วนลูปเก็บเหรียญ",
            desc: "for i in range(1, 6) จะวน 5 รอบ โดย i มีค่า 1,2,3,4,5 (range หยุดก่อนเลขตัวหลัง) บรรทัดในลูปต้องย่อหน้าเข้าไป",
            goal: 'ใช้ <b>for loop</b> แสดง <b>เก็บเหรียญที่ 1</b> ไปจนถึง <b>เก็บเหรียญที่ 5</b> (5 บรรทัด)',
            starter: '# ภารกิจ: วนลูปเก็บเหรียญ 5 อัน\nfor i in range(1, 6):\n    print()\n',
            hint: 'ในลูป ลอง <code>print("เก็บเหรียญที่", i)</code>',
            xp: 50,
            check: (out, code) => { const l = lines(out); return /for\s+/.test(code) && l.length === 5 && l.every((s, i) => s === `เก็บเหรียญที่ ${i + 1}`); }
          },
          {
            title: "รวมสมบัติทั้งหมด",
            desc: "รูปแบบที่ใช้บ่อยสุดของลูป: สร้างตัวแปรผลรวมไว้ก่อน แล้วบวกสะสมทีละรอบ",
            goal: 'ใช้ for loop รวมตัวเลข <b>1 ถึง 10</b> เก็บในตัวแปร total แล้ว print ออกมา (ต้องได้ <b>55</b>)',
            starter: '# ภารกิจ: รวมค่าสมบัติ 1 ถึง 10\ntotal = 0\nfor i in range(1, 11):\n    # บวก i เข้าไปใน total\n\nprint(total)\n',
            hint: 'ในลูปเขียน <code>total = total + i</code> (หรือย่อเป็น <code>total += i</code>)',
            xp: 60,
            check: (out, code) => eq(out, "55") && /for\s+/.test(code) && /range\(/.test(code)
          },
          {
            title: "นับถอยหลังด้วย While",
            desc: "while จะวนไปเรื่อยๆ ตราบใดที่เงื่อนไขยังจริง ระวัง! ต้องมีบรรทัดที่ทำให้เงื่อนไขเป็นเท็จได้ ไม่งั้นลูปจะไม่มีวันจบ",
            goal: 'ใช้ <b>while</b> นับถอยหลัง <b>3, 2, 1</b> (บรรทัดละเลข) แล้วปิดท้ายด้วย <b>ทะยานออกไป!</b>',
            starter: '# ภารกิจ: นับถอยหลังปล่อยจรวด\ncount = 3\nwhile count > 0:\n    print(count)\n    # อย่าลืมลดค่า count!\n\nprint("ทะยานออกไป!")\n',
            hint: 'ในลูปเพิ่ม <code>count = count - 1</code> (หรือ <code>count -= 1</code>) ไม่งั้นลูปไม่จบ',
            xp: 60,
            check: (out, code) => { const l = lines(out); return /while\s+/.test(code) && l.length === 4 && l[0] === "3" && l[1] === "2" && l[2] === "1" && l[3] === "ทะยานออกไป!"; }
          },
          {
            title: "กรองเฉพาะเลขคู่",
            desc: "รวมพลังลูปกับ if: วนดูตัวเลขทีละตัว แล้วเลือกทำเฉพาะตัวที่เข้าเงื่อนไข เลขคู่คือเลขที่หาร 2 ลงตัว (เศษเป็น 0)",
            goal: 'วนลูปเลข 1 ถึง 10 แล้ว print <b>เฉพาะเลขคู่</b> (ต้องได้ 2, 4, 6, 8, 10 บรรทัดละเลข)',
            starter: '# ภารกิจ: เดินเก็บเฉพาะเหรียญเลขคู่\nfor i in range(1, 11):\n    # print เฉพาะตอนที่ i เป็นเลขคู่\n\n',
            hint: 'ในลูปเช็ค <code>if i % 2 == 0:</code> แล้วค่อย <code>print(i)</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return /for\s+/.test(code) && /%/.test(code) && l.join(",") === "2,4,6,8,10"; }
          },
          {
            title: "หยุดทันทีด้วย break",
            desc: "break สั่งให้ลูปหยุดกลางคันทันทีที่เจอ ใช้ตอน \"เจอสิ่งที่ตามหาแล้ว ไม่ต้องหาต่อ\" ประหยัดเวลาไปเยอะ",
            goal: 'วนลูปเปิดหีบใน <b>chest</b> เมื่อเจอ <b>"กุญแจ"</b> ให้พิมพ์ <b>เจอกุญแจแล้ว!</b> แล้ว <b>break</b> ทันที (ผลลัพธ์ต้องมีแค่บรรทัดเดียว)',
            starter: '# ภารกิจ: หากุญแจในหีบ เจอแล้วหยุดหาทันที\nchest = ["หิน", "ผ้า", "กุญแจ", "เหรียญ"]\nfor item in chest:\n    # ถ้า item คือกุญแจ ให้พิมพ์แล้ว break\n\n',
            hint: 'ในลูป: <code>if item == "กุญแจ":</code> แล้วข้างในมี print กับ <code>break</code>',
            xp: 80,
            check: (out, code) => eq(out, "เจอกุญแจแล้ว!") && /\bbreak\b/.test(code)
          },
          {
            title: "ลูปซ้อนลูป",
            desc: "ลูปข้างในลูปอีกชั้น! ลูปนอกคุมแถว ลูปในคุมของในแต่ละแถว — นี่คือวิธีวาดตาราง กระดานเกม หรือแผนที่",
            goal: 'ใช้ <b>ลูปซ้อนลูป</b> (for สองชั้น) วาดกำแพงดาว 3 แถว แถวละ 3 ดวง:<span class="fc">***\n***\n***</span>',
            starter: '# ภารกิจ: ก่อกำแพงดาว 3x3 ด้วยลูปซ้อนลูป\nfor i in range(3):\n    row = ""\n    for j in range(3):\n        # ต่อ * เข้าไปใน row\n\n    print(row)\n',
            hint: 'ในลูปชั้นใน: <code>row = row + "*"</code> (หรือ <code>row += "*"</code>) แล้ว print(row) อยู่ในลูปชั้นนอก',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.length === 3 && l.every(s => s === "***") && (code.match(/for\s/g) || []).length >= 2; }
          },
          {
            title: "ลาดตระเวนทั้ง list",
            desc: "for วน list ได้โดยตรง: for item in items จะหยิบสมาชิกมาให้ทีละตัว ไม่ต้องยุ่งกับตำแหน่งเลย",
            goal: 'มี <b>monsters = ["สไลม์", "ค้างคาว", "มังกร"]</b> จงวนลูปพิมพ์ <b>พบ ...</b> ตามด้วยชื่อมอนสเตอร์ทีละตัว (3 บรรทัด)',
            starter: '# ภารกิจ: ออกลาดตระเวนสำรวจมอนสเตอร์\nmonsters = ["สไลม์", "ค้างคาว", "มังกร"]\n\n',
            hint: '<code>for m in monsters:</code> แล้วข้างใน <code>print("พบ", m)</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.length === 3 && l[0] === "พบ สไลม์" && l[1] === "พบ ค้างคาว" && l[2] === "พบ มังกร" && /for\s+\w+\s+in\s+monsters/.test(code); }
          },
          {
            title: "ข้ามรอบด้วย continue",
            desc: "continue สั่งข้ามรอบปัจจุบันไปเริ่มรอบถัดไปทันที — คู่แฝดของ break แต่ไม่หยุดลูป แค่โดดข้าม",
            goal: 'วนเลข 1 ถึง 5 แต่ใช้ <b>continue</b> ข้ามเลข <b>3</b> (ต้องได้ 1, 2, 4, 5 บรรทัดละเลข)',
            starter: '# ภารกิจ: เดินข้ามกับดักช่องที่ 3\nfor i in range(1, 6):\n    # ถ้า i คือ 3 ให้ continue\n\n    print(i)\n',
            hint: 'ก่อน print: <code>if i == 3:</code> แล้วข้างในใส่ <code>continue</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,2,4,5" && /\bcontinue\b/.test(code); }
          },
          {
            title: "ท่องสูตรคูณแม่ 2",
            desc: "รวมลูปกับ f-string สร้างตารางสูตรคูณ — แบบฝึกหัดอมตะที่โปรแกรมเมอร์ทุกคนต้องเคยเขียน",
            goal: 'ใช้ลูปพิมพ์สูตรคูณแม่ 2 ตั้งแต่ x1 ถึง x6 ในรูปแบบ <b>2 x 1 = 2</b> ไปจนถึง <b>2 x 6 = 12</b> (6 บรรทัด)',
            starter: '# ภารกิจ: ท่องสูตรคูณด้วยลูป\nfor i in range(1, 7):\n    # พิมพ์ 2 x i = ผลคูณ\n\n',
            hint: 'ในลูป: <code>print(f"2 x {i} = {2 * i}")</code>',
            xp: 100,
            check: (out, code) => { const l = lines(out); if (l.length !== 6 || !/for\s+/.test(code)) return false; for (let k = 0; k < 6; k++) { if (l[k] !== "2 x " + (k + 1) + " = " + (2 * (k + 1))) return false; } return true; }
          },
          {
            title: "สะกดทีละตัวอักษร",
            desc: "for วนข้อความได้ด้วย! จะได้ตัวอักษรมาทีละตัว — ใช้วิเคราะห์หรือแปลงข้อความทีละอักขระ",
            goal: 'วนลูปข้อความ <b>"code"</b> แล้ว print ตัวอักษร<b>ทีละตัว</b> (4 บรรทัด: c, o, d, e)',
            starter: '# ภารกิจ: สะกดคำทีละตัว\nword = "code"\n\n',
            hint: '<code>for ch in word:</code> แล้ว <code>print(ch)</code>',
            xp: 60,
            check: (out, code) => { const l = lines(out); return l.join(",") === "c,o,d,e" && /for\s+\w+\s+in\s+/.test(code); }
          },
          {
            title: "นับถอยหลังด้วย range",
            desc: "range รับค่าที่สามเป็น \"ก้าว\" ได้: range(5, 0, -1) คือเริ่ม 5 ถอยทีละ 1 จนก่อนถึง 0 — ลูปถอยหลังไม่ต้องพึ่ง while",
            goal: 'ใช้ <b>for กับ range สามค่า</b> นับถอยหลัง <b>5 ถึง 1</b> (บรรทัดละเลข)',
            starter: '# ภารกิจ: นับถอยหลังฉบับ range\n\n',
            hint: '<code>for i in range(5, 0, -1):</code> แล้ว <code>print(i)</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "5,4,3,2,1" && /range\([^)]*-\s*1\s*\)/.test(code); }
          }
        ]
      },
      {
        id: "flowchart", icon: "🧭", title: "Flowchart สู่โค้ด",
        blurb: "อ่านผังงานให้เป็น แล้วแปลงเป็นโค้ด — ทักษะออกแบบโปรแกรมก่อนลงมือเขียน",
        lesson: [
          { h: "สัญลักษณ์มาตรฐานของผังงาน", p: 'แต่ละรูปทรงมีความหมายตายตัว จำ 5 ตัวนี้ได้ก็อ่านผังงานได้ทุกแบบ ลูกศรคือลำดับการทำงาน:<span class="fc-slot" data-flow="legend"></span>' },
          { h: "แปลงผังเป็นโค้ด", p: "ข้าวหลามตัดหนึ่งลูก = <code>if</code> หนึ่งตัว ส่วนเส้นที่วนกลับขึ้นไป = ลูป (<code>while</code> หรือ <code>for</code>) — ไล่ตามลูกศรทีละก้าว แล้วเขียนโค้ดตามลำดับนั้นเป๊ะๆ" },
          { h: "เทคนิคไล่มือ (trace)", p: "จดค่าตัวแปรทุกครั้งที่ผ่านกล่องคำสั่ง แล้วเดินตามเส้นจนถึงจบ — ถ้าไล่มือแล้วได้ผลลัพธ์ตรงกับที่โจทย์บอก โค้ดที่เขียนตามผังก็จะถูกด้วย นี่คือทักษะที่ข้อสอบชอบวัดที่สุด" }
        ],
        stages: [
          {
            title: "อ่านผังงานเงื่อนไข",
            desc: "Flowchart คือแผนภาพแสดงลำดับการทำงานของโปรแกรม สี่เหลี่ยมคือคำสั่ง ข้าวหลามตัด (?) คือจุดตัดสินใจที่แยกเป็นสองทาง จงอ่านผังแล้วเขียนโค้ดให้ตรงเป๊ะ",
            goal: 'เขียนโค้ดตามผังงานนี้ให้ตรงเป๊ะ:<span class="fc-slot" data-flow="fc0"></span>',
            starter: '# ภารกิจ: แปลงผังงานเป็นโค้ด\n\n',
            hint: 'เริ่มจาก <code>x = 10</code> แล้วใช้ if/else ตามเส้นทางในผัง — x เป็น 10 ซึ่งมากกว่า 5 ผลลัพธ์จึงควรเป็น "มากกว่า"',
            xp: 80,
            check: (out, code) => eq(out, "มากกว่า") && /if\s+/.test(code) && /x\s*=/.test(code)
          },
          {
            title: "อ่านผังงานลูป",
            desc: "ผังงานที่มีเส้นวนกลับขึ้นไปคือลูป! ตามเส้นดูว่าอะไรถูกทำซ้ำ และเงื่อนไขไหนที่ทำให้หลุดออกจากลูป",
            goal: 'เขียนโค้ดตามผังงานนี้ (สังเกตเส้นที่วนกลับขึ้นไป):<span class="fc-slot" data-flow="fc1"></span>',
            starter: '# ภารกิจ: แปลงผังงานลูปเป็นโค้ด\n\n',
            hint: 'ใช้ <code>while i <= 3:</code> ข้างในมี print กับ i = i + 1 แล้วค่อย print("จบ") นอกลูป — หรือใช้ for ก็ได้ถ้าผลลัพธ์ตรงกัน',
            xp: 80,
            check: (out) => { const l = lines(out); return l.length === 4 && l[0] === "รอบที่ 1" && l[1] === "รอบที่ 2" && l[2] === "รอบที่ 3" && l[3] === "จบ"; }
          },
          {
            title: "ผังงานเงื่อนไขในลูป",
            desc: "ผังนี้มีทั้งลูปและจุดตัดสินใจข้างใน — เส้นทาง \"ไม่\" ของเงื่อนไขจะข้ามการพิมพ์แล้ววนต่อเลย",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc2"></span>ผลลัพธ์ที่ถูกต้อง: 1, 3, 5 (บรรทัดละเลข)',
            starter: '# ภารกิจ: แปลงผังงานเป็นโค้ด (เลขคี่คือหาร 2 เหลือเศษ 1)\n\n',
            hint: '<code>for i in range(1, 6):</code> แล้วข้างใน <code>if i % 2 == 1:</code> ค่อย print(i)',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,3,5" && /for\s+|while\s+/.test(code) && /if\s+/.test(code); }
          },
          {
            title: "ผังงานสะสมค่า",
            desc: "ผังงานแบบสะสม (accumulator) พบบ่อยมากในข้อสอบ: มีตัวแปรเก็บผลรวม แล้ววนบวกเพิ่มทีละรอบ ค่อยแสดงผลตอนจบ",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc3"></span>(ต้องได้ <b>20</b>)',
            starter: '# ภารกิจ: แปลงผังงานสะสมค่าเป็นโค้ด\n\n',
            hint: '<code>total = 0</code> → <code>for i in range(1, 5):</code> → <code>total += i * 2</code> → print(total) นอกลูป — ลองไล่มือ: 2+4+6+8 = 20',
            xp: 100,
            check: (out, code) => eq(out, "20") && /total\s*/.test(code) && /for\s+|while\s+/.test(code)
          },
          {
            title: "ผังงานหาค่ามากสุด",
            desc: "ผังงานยอดฮิตในข้อสอบ: ตัวแปร best เก็บแชมป์ปัจจุบัน วนเทียบทีละตัว ใครมากกว่าก็ขึ้นแท่นแทน",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc4"></span>(ต้องได้ <b>75</b>)',
            starter: '# ภารกิจ: หาคะแนนสูงสุดตามผังงาน\nscores = [40, 75, 60]\n\n',
            hint: '<code>best = 0</code> → <code>for s in scores:</code> → <code>if s > best:</code> → <code>best = s</code> → print(best) นอกลูป',
            xp: 100,
            check: (out, code) => eq(out, "75") && /for\s+/.test(code) && /if\s+/.test(code)
          },
          {
            title: "ผังงานใช้พลังงาน",
            desc: "ผัง while ในสถานการณ์จริง: มีพลังงานจำกัด ทำซ้ำจนพลังไม่พอแล้วค่อยจบ — ไล่มือค่าพลังงานทุกรอบให้ดี",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc5"></span>',
            starter: '# ภารกิจ: โจมตีจนกว่าจะหมดแรง\n\n',
            hint: '<code>while energy >= 4:</code> ข้างในพิมพ์กับลดพลัง — ไล่มือ: 10 → 6 → 2 หยุด (โจมตีได้ 2 ครั้ง)',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.join(",") === "โจมตี,โจมตี,หมดแรง" && /while\s+/.test(code); }
          },
          {
            title: "ผังงานก้าวทีละสอง",
            desc: "ผังลูปที่ตัวนับเพิ่มทีละ 2 — สังเกตกล่องอัปเดตค่าให้ดีว่าเพิ่มเท่าไหร่ต่อรอบ แล้วเขียนตามให้ตรง",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc-slot" data-flow="fc6"></span>(ต้องได้ 2, 4, 6, 8 บรรทัดละเลข)',
            starter: '# ภารกิจ: เดินก้าวละสองช่องตามผัง\n\n',
            hint: '<code>while i <= 8:</code> ข้างในพิมพ์แล้ว <code>i += 2</code> — หรือใช้ <code>range(2, 9, 2)</code> ก็ได้',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.join(",") === "2,4,6,8" && (/while\s+/.test(code) || /for\s+/.test(code)); }
          }
        ]
      },
      {
        id: "function", icon: "🧩", title: "ฟังก์ชัน (Function)",
        blurb: "ห่อโค้ดเป็นท่าไม้ตาย ตั้งชื่อไว้ แล้วเรียกใช้ซ้ำได้ไม่จำกัด",
        lesson: [
          { h: "สร้างด้วย def เรียกด้วยชื่อ()", p: "ห่อโค้ดไว้ใต้ชื่อที่ตั้งเอง โค้ดข้างในจะยังไม่ทำงานจนกว่าจะถูก \"เรียก\" ด้วยชื่อตามด้วยวงเล็บ", code: 'def greet():\n    print("สวัสดี")\n\ngreet()   # เรียกใช้ตรงนี้' },
          { h: "parameter และ return", p: "รับข้อมูลเข้าทางวงเล็บ (parameter) และส่งผลลัพธ์กลับด้วย <code>return</code> เพื่อเอาไปใช้ต่อ — เจอ return เมื่อไหร่ ฟังก์ชันจบทันที", code: 'def double(x):\n    return x * 2\n\nprint(double(21))   # 42' },
          { h: "หลายค่า และค่าเริ่มต้น", p: "รับได้หลาย parameter คั่นด้วยจุลภาค และตั้งค่าเริ่มต้น (default) ได้ ถ้าผู้เรียกไม่ส่งค่ามาก็ใช้ค่านั้นแทน", code: 'def heal(target, amount=10):\n    print(target, "+", amount)\n\nheal("มะลิ")        # มะลิ + 10\nheal("มะลิ", 50)    # มะลิ + 50' },
          { h: "ฟังก์ชันเรียกฟังก์ชัน", p: "ฟังก์ชันใช้ฟังก์ชันอื่นข้างในได้ — โปรแกรมใหญ่ๆ ทั้งหลายก็คือฟังก์ชันเล็กๆ ที่เรียกต่อกันเป็นทอดๆ นั่นเอง", code: 'def tax(p):\n    return p // 10\n\ndef total(p):\n    return p + tax(p)' }
        ],
        stages: [
          {
            title: "ท่าไม้ตายแรก",
            desc: "def คือการสร้างฟังก์ชัน — ห่อโค้ดไว้ใต้ชื่อที่เราตั้ง โค้ดจะยังไม่ทำงานจนกว่าจะถูก \"เรียก\" ด้วยชื่อตามด้วยวงเล็บ",
            goal: 'สร้างฟังก์ชัน <b>greet</b> ที่พิมพ์ <b>สวัสดีนักผจญภัย</b> แล้วเรียกใช้มัน 1 ครั้ง',
            starter: '# ภารกิจ: สร้างและเรียกใช้ฟังก์ชันแรก\ndef greet():\n    print("สวัสดีนักผจญภัย")\n\n# เรียกใช้ฟังก์ชันตรงนี้\n',
            hint: 'เรียกฟังก์ชันด้วยชื่อ + วงเล็บ: <code>greet()</code> (ไม่ต้องมี def)',
            xp: 60,
            check: (out, code) => eq(out, "สวัสดีนักผจญภัย") && /def\s+greet/.test(code)
          },
          {
            title: "รับค่าและส่งค่ากลับ",
            desc: "ฟังก์ชันรับข้อมูลผ่านวงเล็บ (parameter) และส่งผลลัพธ์กลับด้วย return ทำให้เอาผลไปใช้ต่อได้",
            goal: 'สร้างฟังก์ชัน <b>double(x)</b> ที่ return ค่า x คูณ 2 แล้ว <b>print(double(21))</b> (ต้องได้ <b>42</b>)',
            starter: '# ภารกิจ: สร้างเวทเพิ่มพลังสองเท่า\ndef double(x):\n    # return ค่า x คูณ 2\n\nprint(double(21))\n',
            hint: 'ในฟังก์ชันเขียน <code>return x * 2</code>',
            xp: 60,
            check: (out, code) => eq(out, "42") && /def\s+double/.test(code) && /return/.test(code)
          },
          {
            title: "รับหลายค่าพร้อมกัน",
            desc: "ฟังก์ชันรับ parameter ได้หลายตัว คั่นด้วยจุลภาค ทำให้ท่าไม้ตายของเรายืดหยุ่นขึ้นมาก",
            goal: 'สร้างฟังก์ชัน <b>attack(name, dmg)</b> ที่พิมพ์ <b>{name} โจมตี {dmg} ดาเมจ</b> แล้วเรียก <b>attack("อัศวิน", 30)</b> (ต้องได้ <b>อัศวิน โจมตี 30 ดาเมจ</b>)',
            starter: '# ภารกิจ: สร้างท่าโจมตีที่ใครก็ใช้ได้\ndef attack(name, dmg):\n    # พิมพ์ข้อความโจมตีด้วย f-string\n\nattack("อัศวิน", 30)\n',
            hint: 'ในฟังก์ชัน: <code>print(f"{name} โจมตี {dmg} ดาเมจ")</code>',
            xp: 80,
            check: (out, code) => eq(out, "อัศวิน โจมตี 30 ดาเมจ") && /def\s+attack\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(code)
          },
          {
            title: "ค่าเริ่มต้น (Default)",
            desc: "กำหนดค่าเริ่มต้นให้ parameter ได้ เช่น def heal(amount=10) — ถ้าเรียกโดยไม่ส่งค่า จะใช้ 10 อัตโนมัติ",
            goal: 'สร้างฟังก์ชัน <b>heal(amount=10)</b> ที่ return amount แล้ว print ผลของ <b>heal()</b> และ <b>heal(50)</b> (ต้องได้ <b>10</b> และ <b>50</b>)',
            starter: '# ภารกิจ: ยาสามัญฟื้น 10 แต่ระบุเองก็ได้\n# สร้างฟังก์ชัน heal ที่มีค่าเริ่มต้น\n\nprint(heal())\nprint(heal(50))\n',
            hint: '<code>def heal(amount=10):</code> แล้วข้างใน <code>return amount</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "10" && l[1] === "50" && /def\s+heal\s*\(\s*\w+\s*=\s*10\s*\)/.test(code); }
          },
          {
            title: "ฟังก์ชัน + ลูป = คอมโบ",
            desc: "รวมทุกอย่างที่เรียนมา: สร้างฟังก์ชันแล้วเรียกใช้ซ้ำๆ ในลูป นี่คือวิธีที่โปรแกรมจริงทำงาน",
            goal: 'สร้างฟังก์ชัน <b>power_up(lv)</b> ที่ return ค่า lv + 10 แล้วใช้ for loop เรียกกับเลข 1 ถึง 3 และ print ผลลัพธ์ (ต้องได้ <b>11, 12, 13</b> บรรทัดละเลข)',
            starter: '# ภารกิจ: อัพพลังทีมทั้ง 3 คน\ndef power_up(lv):\n    return lv + 10\n\n# วนลูป 1 ถึง 3 แล้ว print(power_up(i))\n',
            hint: '<code>for i in range(1, 4):</code> แล้วในลูป <code>print(power_up(i))</code>',
            xp: 100,
            check: (out, code) => { const l = lines(out); return /def\s+power_up/.test(code) && /for\s+/.test(code) && l.join(",") === "11,12,13"; }
          },
          {
            title: "ฟังก์ชันนักตัดสิน",
            desc: "ใส่ if ในฟังก์ชันเพื่อให้มัน \"ตัดสินใจ\" แล้ว return คำตอบต่างกัน — สังเกตว่าเจอ return ปุ๊บ ฟังก์ชันจบทันที",
            goal: 'สร้างฟังก์ชัน <b>rank(score)</b> ที่ return <b>ทอง</b> ถ้า score ≥ 80 ไม่งั้น return <b>เงิน</b> แล้ว print ผลของ rank(90) และ rank(55) (ต้องได้ <b>ทอง</b> และ <b>เงิน</b>)',
            starter: '# ภารกิจ: เครื่องแจกเหรียญรางวัล\ndef rank(score):\n    # return "ทอง" หรือ "เงิน"\n\nprint(rank(90))\nprint(rank(55))\n',
            hint: 'ในฟังก์ชัน: <code>if score >= 80: return "ทอง"</code> บรรทัดถัดมา <code>return "เงิน"</code>',
            xp: 80,
            check: (out, code) => { const l = lines(out); return l.join(",") === "ทอง,เงิน" && /def\s+rank/.test(code) && /return/.test(code); }
          },
          {
            title: "ฟังก์ชันเรียกฟังก์ชัน",
            desc: "ฟังก์ชันใช้ฟังก์ชันอื่นข้างในได้ — โปรแกรมใหญ่ๆ ทั้งหลายคือฟังก์ชันเล็กๆ ที่เรียกต่อกันเป็นทอดๆ นี่แหละ",
            goal: 'สร้าง <b>tax(p)</b> ที่ return p // 10 (ภาษี 10%) และ <b>total(p)</b> ที่ return p บวกกับ tax(p) แล้ว print(total(200)) (ต้องได้ <b>220</b>)',
            starter: '# ภารกิจ: คิดราคารวมภาษีแบบมืออาชีพ\ndef tax(p):\n    return p // 10\n\ndef total(p):\n    # return ราคารวมภาษี โดยเรียกใช้ tax\n\nprint(total(200))\n',
            hint: 'ใน total: <code>return p + tax(p)</code>',
            xp: 100,
            check: (out, code) => eq(out, "220") && (code.match(/def\s+/g) || []).length >= 2
          },
          {
            title: "ท่าตะโกน",
            desc: "ฟังก์ชันทำงานกับข้อความได้เหมือนตัวเลข — รับข้อความ แปลงร่าง แล้ว return กลับ",
            goal: 'สร้างฟังก์ชัน <b>shout(msg)</b> ที่ return ข้อความตัวพิมพ์ใหญ่ + <b>"!"</b> ต่อท้าย แล้ว print(shout("victory")) (ต้องได้ <b>VICTORY!</b>)',
            starter: '# ภารกิจ: เครื่องขยายเสียงเวทมนตร์\ndef shout(msg):\n    # return ตัวพิมพ์ใหญ่ตามด้วย !\n\nprint(shout("victory"))\n',
            hint: '<code>return msg.upper() + "!"</code>',
            xp: 80,
            check: (out, code) => eq(out, "VICTORY!") && /def\s+shout/.test(code) && /\.upper\(\)/.test(code)
          },
          {
            title: "ฟังก์ชันนับคนผ่าน",
            desc: "ฟังก์ชันรับ list ได้ด้วย! รวมลูปกับตัวนับไว้ในฟังก์ชัน แล้วเรียกใช้กับข้อมูลชุดไหนก็ได้ — นี่คือโค้ดที่นำกลับมาใช้ซ้ำได้จริง",
            goal: 'สร้างฟังก์ชัน <b>count_pass(scores)</b> ที่วนนับจำนวนคะแนน ≥ 50 แล้ว return จากนั้น print(count_pass([40, 60, 80])) (ต้องได้ <b>2</b>)',
            starter: '# ภารกิจ: เครื่องนับผู้ผ่านการทดสอบ\ndef count_pass(scores):\n    count = 0\n    # วนนับคะแนนที่ >= 50\n\n    return count\n\nprint(count_pass([40, 60, 80]))\n',
            hint: 'ในฟังก์ชัน: <code>for s in scores:</code> แล้ว <code>if s >= 50: count += 1</code>',
            xp: 100,
            check: (out, code) => eq(out, "2") && /def\s+count_pass/.test(code) && /for\s+/.test(code)
          }
        ]
      },
      {
        id: "project", icon: "🏆", title: "ด่านบอส: รวมพลัง",
        blurb: "โจทย์ใหญ่ที่ต้องใช้ทุกวิชาที่เรียนมา — ผ่านได้คือของจริง!",
        lesson: [
          { h: "สนามสอบรวมยอด", p: "ด่านบอสไม่มีความรู้ใหม่ — ทุกข้อคือสิ่งที่เรียนมาแล้วเอามาผสมกัน: ลูป + เงื่อนไข + ตัวแปรสะสม + ฟังก์ชัน ถ้าติดตรงไหน กลับไปทบทวนหัวข้อนั้นก่อนได้เสมอ" },
          { h: "สูตรเอาชนะโจทย์ยาก 4 ขั้น", p: "1) อ่านโจทย์แล้ว<b>ไล่มือ</b>ผลลัพธ์ที่คาดหวังก่อน &nbsp;2) เขียนโครงใหญ่ (ลูป/เงื่อนไข) &nbsp;3) ค่อยเติมรายละเอียดข้างใน &nbsp;4) รันแล้วเทียบผลทีละบรรทัด ผิดตรงไหนแก้ตรงนั้น" },
          { h: "ลำดับเงื่อนไขสำคัญมาก", p: "เคสที่<b>เจาะจงที่สุดต้องเช็คก่อน</b> เช่น \"หารทั้ง 3 และ 5 ลงตัว\" ต้องมาก่อน \"หาร 3 ลงตัว\" — เพราะ Python เลือกทางแรกที่จริงแล้วข้ามที่เหลือทันที" }
        ],
        boss: true,
        stages: [
          {
            title: "บอสที่ 1: เวทกับดาบ",
            desc: "โจทย์คลาสสิกระดับตำนาน (FizzBuzz)! ต้องใช้ลูป เงื่อนไข และตัวดำเนินการ % พร้อมกัน — ระวังลำดับการเช็คเงื่อนไขให้ดี",
            goal: 'วนเลข 1 ถึง 15: ถ้าหารด้วย <b>ทั้ง 3 และ 5</b> ลงตัว พิมพ์ <b>เวทดาบ</b> / หาร 3 ลงตัว พิมพ์ <b>เวท</b> / หาร 5 ลงตัว พิมพ์ <b>ดาบ</b> / นอกนั้นพิมพ์ตัวเลขนั้น (บรรทัดละหนึ่งอย่าง)',
            starter: '# ด่านบอส: เวทกับดาบ (FizzBuzz)\n# เคล็ดลับ: เช็คกรณี "หารทั้งคู่ลงตัว" ก่อนเสมอ!\nfor i in range(1, 16):\n    pass  # ลบ pass แล้วเขียนเงื่อนไขของคุณ\n',
            hint: 'โครงสร้าง: <code>if i % 3 == 0 and i % 5 == 0:</code> → <code>elif i % 3 == 0:</code> → <code>elif i % 5 == 0:</code> → <code>else: print(i)</code>',
            xp: 120,
            check: (out, code) => {
              const expect = ["1","2","เวท","4","ดาบ","เวท","7","8","เวท","ดาบ","11","เวท","13","14","เวทดาบ"];
              return lines(out).join("|") === expect.join("|") && /for\s+/.test(code);
            }
          },
          {
            title: "บอสที่ 2: ตัดเกรดทั้งชั้น",
            desc: "รวมฟังก์ชัน + ลูป + เงื่อนไข: สร้างเครื่องตัดเกรดหนึ่งครั้ง แล้วใช้กับนักเรียนทุกคนด้วยลูป — นี่แหละพลังของฟังก์ชัน",
            goal: 'มี <b>scores = [45, 82, 60, 95, 30]</b> จงสร้างฟังก์ชัน <b>grade(s)</b> ที่ return <b>ผ่าน</b> ถ้า s ≥ 50 ไม่งั้น return <b>ไม่ผ่าน</b> แล้ววนลูป print ผลของทุกคน (ต้องได้ ไม่ผ่าน, ผ่าน, ผ่าน, ผ่าน, ไม่ผ่าน)',
            starter: '# ด่านบอส: ตัดเกรดนักเรียนทั้งชั้น\nscores = [45, 82, 60, 95, 30]\n\ndef grade(s):\n    # return "ผ่าน" หรือ "ไม่ผ่าน"\n\n# วนลูป scores แล้ว print(grade(...))\n',
            hint: 'ในฟังก์ชัน: <code>if s >= 50: return "ผ่าน"</code> ไม่งั้น <code>return "ไม่ผ่าน"</code> แล้ววน <code>for s in scores: print(grade(s))</code>',
            xp: 150,
            check: (out, code) => {
              const expect = ["ไม่ผ่าน","ผ่าน","ผ่าน","ผ่าน","ไม่ผ่าน"];
              return lines(out).join("|") === expect.join("|") && /def\s+grade/.test(code) && /for\s+/.test(code);
            }
          },
          {
            title: "บอสใหญ่: ร้านยาปริศนา",
            desc: "ด่านสุดท้ายของคอร์ส! จำลองการเดินซื้อของจริง: มีเงินจำกัด เดินดูราคาทีละชิ้น ซื้อได้ก็ซื้อ ไม่พอก็บอกตรงๆ — ใช้ลูป เงื่อนไข ตัวแปรสะสม และ f-string ครบทุกท่า",
            goal: 'มี <b>gold = 120</b> และ <b>prices = [30, 50, 80]</b> วนดูราคาทีละชิ้น: ถ้าเงินพอ (gold ≥ price) ให้หักเงินแล้วพิมพ์ <b>ซื้อยาราคา {price}</b> / ถ้าไม่พอพิมพ์ <b>เงินไม่พอ</b> / จบแล้วพิมพ์ <b>เหลือเงิน {gold}</b><span class="fc">ผลที่ถูกต้อง:\nซื้อยาราคา 30\nซื้อยาราคา 50\nเงินไม่พอ\nเหลือเงิน 40</span>',
            starter: '# ด่านบอสใหญ่: ร้านยาปริศนา\ngold = 120\nprices = [30, 50, 80]\n\nfor price in prices:\n    pass  # เช็คเงิน ซื้อ หรือบอกว่าไม่พอ\n\n# จบลูปแล้ว พิมพ์เงินที่เหลือ\n',
            hint: 'ในลูป: <code>if gold >= price:</code> → <code>gold -= price</code> และ <code>print(f"ซื้อยาราคา {price}")</code> / else พิมพ์ "เงินไม่พอ" — ปิดท้ายนอกลูปด้วย <code>print(f"เหลือเงิน {gold}")</code>',
            xp: 200,
            check: (out, code) => {
              const expect = ["ซื้อยาราคา 30","ซื้อยาราคา 50","เงินไม่พอ","เหลือเงิน 40"];
              return lines(out).join("|") === expect.join("|") && /for\s+/.test(code) && /if\s+/.test(code);
            }
          },
          {
            title: "บอสที่ 4: นักสถิติประจำกิลด์",
            desc: "งานวิเคราะห์ข้อมูลของจริงย่อส่วน: วนดูข้อมูล นับตัวที่เข้าเงื่อนไข และรวมค่า — สองตัวแปรสะสมทำงานพร้อมกันในลูปเดียว",
            goal: 'มี <b>scores = [55, 90, 72, 38, 64]</b> จงนับจำนวนคนที่ผ่าน (≥ 50) และรวมคะแนนทั้งหมด แล้วพิมพ์ 2 บรรทัด: <b>ผ่าน 4 คน</b> และ <b>คะแนนรวม 319</b>',
            starter: '# ด่านบอส: สรุปสถิติกิลด์\nscores = [55, 90, 72, 38, 64]\ncount = 0\ntotal = 0\n\nfor s in scores:\n    pass  # นับคนผ่าน และรวมคะแนน\n\nprint("ผ่าน", count, "คน")\nprint("คะแนนรวม", total)\n',
            hint: 'ในลูป: <code>total += s</code> ทุกรอบ และ <code>if s >= 50:</code> ค่อย <code>count += 1</code>',
            xp: 150,
            check: (out, code) => { const l = lines(out); return l.length === 2 && l[0] === "ผ่าน 4 คน" && l[1] === "คะแนนรวม 319" && /for\s+/.test(code) && /if\s+/.test(code); }
          },
          {
            title: "บอสสุดท้าย: บันไดเลเวล",
            desc: "จำลองระบบเลเวลของเกมนี้เองเลย! ล่ามอนสเตอร์เก็บ EXP ครบ 100 เมื่อไหร่ก็อัพเลเวลแล้วหัก 100 ออก — ไล่มือให้ดีทีละตัว",
            goal: 'เริ่มที่ <b>xp = 0, level = 1</b> วนล่า <b>monsters = [50, 80, 120, 200]</b> แต่ละตัวได้ EXP เท่าค่าในลิสต์ ถ้า xp ถึง 100 ให้ level เพิ่ม 1 และ xp ลด 100 จบแล้วพิมพ์ <b>เลเวล 4 เหลือ 150 EXP</b>',
            starter: '# ด่านบอสสุดท้าย: ไต่บันไดเลเวล\nxp = 0\nlevel = 1\nmonsters = [50, 80, 120, 200]\n\nfor m in monsters:\n    pass  # รับ EXP แล้วเช็คอัพเลเวล\n\nprint(f"เลเวล {level} เหลือ {xp} EXP")\n',
            hint: 'ในลูป: <code>xp += m</code> แล้ว <code>if xp >= 100:</code> ข้างใน <code>level += 1</code> กับ <code>xp -= 100</code> — ไล่มือ: 50 → 130(อัพ,30) → 150(อัพ,50) → 250(อัพ,150)',
            xp: 200,
            check: (out, code) => eq(out, "เลเวล 4 เหลือ 150 EXP") && /for\s+/.test(code) && /if\s+/.test(code)
          },
          {
            title: "บอสพิเศษ: ฮีโร่รับคำสั่ง",
            desc: "รวม input + int + ลูป + f-string: โปรแกรมที่ปรับพฤติกรรมตามข้อมูลที่รับเข้ามา — หัวใจของทุกแอปที่คุณเคยใช้",
            goal: 'รับ<b>ชื่อฮีโร่</b>และ<b>จำนวนครั้ง n</b> ด้วย input แล้ววนแสดง <b>อัศวิน โจมตีครั้งที่ 1</b> ถึงครั้งที่ n ปิดท้ายด้วย <b>ชนะแล้ว!</b> (ระบบป้อน "อัศวิน" และ "3")',
            starter: '# ด่านบอส: ฮีโร่ทำตามคำสั่งผู้เล่น\nname = input()\nn = int(input())\n\n# วนลูป 1 ถึง n\n\nprint("ชนะแล้ว!")\n',
            hint: '<code>for i in range(1, n + 1):</code> ข้างใน <code>print(f"{name} โจมตีครั้งที่ {i}")</code>',
            xp: 180,
            stdin: ["อัศวิน", "3"],
            check: (out, code) => { const l = lines(out); return l.length === 4 && l[0] === "อัศวิน โจมตีครั้งที่ 1" && l[1] === "อัศวิน โจมตีครั้งที่ 2" && l[2] === "อัศวิน โจมตีครั้งที่ 3" && l[3] === "ชนะแล้ว!" && (code.match(/input\(/g) || []).length >= 2 && /for\s+/.test(code); }
          },
          {
            title: "บอสพิเศษ: บัญชีร้านยา",
            desc: "วนลูป dict ได้ด้วย! for day in sales จะได้ \"ชื่อช่อง\" มาทีละตัว แล้วใช้ sales[day] ดึงค่าของช่องนั้น — สรุปยอดขายทั้งสัปดาห์ในไม่กี่บรรทัด",
            goal: 'มียอดขาย <b>sales = {"จันทร์": 3, "อังคาร": 5, "พุธ": 2}</b> จงวนรวมยอดทั้งหมด แล้วแสดง <b>ขายได้ทั้งหมด 10 ขวด</b>',
            starter: '# ด่านบอส: ปิดบัญชีร้านยาประจำสัปดาห์\nsales = {"จันทร์": 3, "อังคาร": 5, "พุธ": 2}\ntotal = 0\n\nfor day in sales:\n    pass  # บวกยอดของแต่ละวันเข้า total\n\nprint("ขายได้ทั้งหมด", total, "ขวด")\n',
            hint: 'ในลูป: <code>total += sales[day]</code>',
            xp: 180,
            check: (out, code) => { const l = lines(out); return l[l.length - 1] === "ขายได้ทั้งหมด 10 ขวด" && /for\s+/.test(code) && /sales\[/.test(code); }
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
    const el = document.createElement("button");
    el.className = "topic-card" + (doneCount === total ? " complete" : "") + (t.boss ? " boss" : "");
    el.innerHTML = `
      <div class="t-num pixel">${t.boss ? "FINAL" : "TOPIC " + String(idx + 1).padStart(2, "0")}</div>
      <div class="t-head"><span class="icon-art sm">${iconFor(t.id)}</span><h3>${t.title}</h3></div>
      <p>${t.blurb}</p>
      <div class="t-meta">
        <span class="${doneCount === total ? "done-txt" : ""}">${doneCount} / ${total} ด่าน</span>
        <span>💰 ${totalXp} EXP</span>
      </div>
      <div class="mini-bar"><div class="mini-fill" style="width:${(doneCount / total) * 100}%"></div></div>
    `;
    el.onclick = () => {
      state.topic = t.id;
      try { localStorage.setItem("cq_topic_" + state.lang, t.id); } catch {}
      if (lessonRead(t.id)) goLearn();
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
  if (saved && ts.some(t => t.id === saved)) return saved;
  const firstUndone = ts.find(t => t.stages.some((_, s) => !state.done.has(doneKey(state.lang, t.id, s))));
  return (firstUndone || ts[0]).id;
}
function goLearn() {
  if (!state.lang) {
    let sl = null;
    try { sl = localStorage.getItem("cq_lang"); } catch {}
    state.lang = (sl && COURSES[sl]) ? sl : "python";
  }
  const ts = COURSES[state.lang].topics;
  if (!state.topic || !ts.some(t => t.id === state.topic)) state.topic = pickDefaultTopic();
  try {
    localStorage.setItem("cq_lang", state.lang);
    localStorage.setItem("cq_topic_" + state.lang, state.topic);
  } catch {}
  renderLearn();
  showScreen("learn");
}
function renderLearn() {
  const ts = COURSES[state.lang].topics, t = curTopic(), idx = topicIndex();
  const total = t.stages.length;
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
  const doneCount = t.stages.filter((_, s) => state.done.has(doneKey(state.lang, t.id, s))).length;
  $("lsStart").textContent = doneCount > 0 ? "อ่านจบแล้ว ทำแบบฝึกหัดต่อ →" : "เข้าใจแล้ว เริ่มทำแบบฝึกหัด →";
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
$("backFromLesson").onclick = () => { if (state.topic) goLearn(); else { renderTopics(); showScreen("topic"); } };

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
const CONTENT_VERSION = 10; // ต้องตรงกับ CONTENT_VERSION ใน server.js
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
