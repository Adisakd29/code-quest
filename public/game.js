/* ═══════════════ เนื้อหาเกม ═══════════════
   ⚠️ ค่า xp ของแต่ละด่านต้องตรงกับ STAGE_XP ใน server.js */
const eq = (out, s) => out.trim() === s;
const lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));

/* ═══════════════ ไอคอนกราฟิก (SVG) ═══════════════ */
const ICONS = {
  input: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 5v7" stroke="#6ee7a0" stroke-width="3" stroke-linecap="round"/><path d="M20 9l4 4 4-4" fill="#6ee7a0"/><rect x="4" y="15" width="40" height="24" rx="5" fill="#1b2040" stroke="#62e6ff" stroke-width="3"/><rect x="9" y="20" width="5" height="4.5" rx="1.2" fill="#9aa2d8"/><rect x="16.5" y="20" width="5" height="4.5" rx="1.2" fill="#9aa2d8"/><rect x="24" y="20" width="5" height="4.5" rx="1.2" fill="#9aa2d8"/><rect x="31.5" y="20" width="7.5" height="4.5" rx="1.2" fill="#ff6b81"/><rect x="12" y="29" width="24" height="5.5" rx="2.2" fill="#ffb347"/></svg>',
  python: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 13c0-4-4-7-10-7h-6c-6 0-10 3-10 8s4 8 10 8h8c6 0 10 3 10 8s-4 8-10 8h-6c-6 0-9-2-9-6" stroke="#62e6ff" stroke-width="5" stroke-linecap="round"/><circle cx="36" cy="13" r="6" fill="#ffb347"/><circle cx="38" cy="11.5" r="1.6" fill="#0f1226"/><path d="M42 15l4 2-4 2" stroke="#ff6b81" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
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
const iconFor = k => ICONS[k] || "";
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
          { h: "สัญลักษณ์หลักของผังงาน", p: "วงรี = เริ่ม/จบ &nbsp;•&nbsp; สี่เหลี่ยม = คำสั่ง/ประมวลผล &nbsp;•&nbsp; ข้าวหลามตัด (?) = จุดตัดสินใจ แยกเป็นทาง ใช่/ไม่ &nbsp;•&nbsp; ลูกศร = ลำดับการทำงาน" },
          { h: "แปลงผังเป็นโค้ด", p: "ข้าวหลามตัดหนึ่งลูก = <code>if</code> หนึ่งตัว ส่วนเส้นที่วนกลับขึ้นไป = ลูป (<code>while</code> หรือ <code>for</code>) — ไล่ตามลูกศรทีละก้าว แล้วเขียนโค้ดตามลำดับนั้นเป๊ะๆ" },
          { h: "เทคนิคไล่มือ (trace)", p: "จดค่าตัวแปรทุกครั้งที่ผ่านกล่องคำสั่ง แล้วเดินตามเส้นจนถึงจบ — ถ้าไล่มือแล้วได้ผลลัพธ์ตรงกับที่โจทย์บอก โค้ดที่เขียนตามผังก็จะถูกด้วย นี่คือทักษะที่ข้อสอบชอบวัดที่สุด" }
        ],
        stages: [
          {
            title: "อ่านผังงานเงื่อนไข",
            desc: "Flowchart คือแผนภาพแสดงลำดับการทำงานของโปรแกรม สี่เหลี่ยมคือคำสั่ง ข้าวหลามตัด (?) คือจุดตัดสินใจที่แยกเป็นสองทาง จงอ่านผังแล้วเขียนโค้ดให้ตรงเป๊ะ",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">      เริ่ม\n        │\n     x = 10\n        │\n   ┌─ x > 5 ? ─┐\n  ใช่          ไม่\n   │            │\nพิมพ์ "มากกว่า"   พิมพ์ "น้อยกว่า"\n   └─────┬─────┘\n        จบ</span>',
            starter: '# ภารกิจ: แปลงผังงานเป็นโค้ด\n\n',
            hint: 'เริ่มจาก <code>x = 10</code> แล้วใช้ if/else ตามเส้นทางในผัง — x เป็น 10 ซึ่งมากกว่า 5 ผลลัพธ์จึงควรเป็น "มากกว่า"',
            xp: 80,
            check: (out, code) => eq(out, "มากกว่า") && /if\s+/.test(code) && /x\s*=/.test(code)
          },
          {
            title: "อ่านผังงานลูป",
            desc: "ผังงานที่มีเส้นวนกลับขึ้นไปคือลูป! ตามเส้นดูว่าอะไรถูกทำซ้ำ และเงื่อนไขไหนที่ทำให้หลุดออกจากลูป",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">      เริ่ม\n        │\n      i = 1\n        │\n   ┌─ i <= 3 ? ◄──┐\n  ใช่          │\n   │              │\nพิมพ์ "รอบที่", i    │\n   │              │\n  i = i + 1 ──────┘\n\n  ไม่ → พิมพ์ "จบ"</span>',
            starter: '# ภารกิจ: แปลงผังงานลูปเป็นโค้ด\n\n',
            hint: 'ใช้ <code>while i <= 3:</code> ข้างในมี print กับ i = i + 1 แล้วค่อย print("จบ") นอกลูป — หรือใช้ for ก็ได้ถ้าผลลัพธ์ตรงกัน',
            xp: 80,
            check: (out) => { const l = lines(out); return l.length === 4 && l[0] === "รอบที่ 1" && l[1] === "รอบที่ 2" && l[2] === "รอบที่ 3" && l[3] === "จบ"; }
          },
          {
            title: "ผังงานเงื่อนไขในลูป",
            desc: "ผังนี้มีทั้งลูปและจุดตัดสินใจข้างใน — เส้นทาง \"ไม่\" ของเงื่อนไขจะข้ามการพิมพ์แล้ววนต่อเลย",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">      เริ่ม\n        │\n  วน i = 1 ถึง 5 ◄──────┐\n        │               │\n   i เป็นเลขคี่ ? ──ไม่──┤\n       ใช่              │\n        │               │\n     พิมพ์ i ────────────┘\n\n  ครบแล้ว → จบ</span>ผลลัพธ์ที่ถูกต้อง: 1, 3, 5 (บรรทัดละเลข)',
            starter: '# ภารกิจ: แปลงผังงานเป็นโค้ด (เลขคี่คือหาร 2 เหลือเศษ 1)\n\n',
            hint: '<code>for i in range(1, 6):</code> แล้วข้างใน <code>if i % 2 == 1:</code> ค่อย print(i)',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.join(",") === "1,3,5" && /for\s+|while\s+/.test(code) && /if\s+/.test(code); }
          },
          {
            title: "ผังงานสะสมค่า",
            desc: "ผังงานแบบสะสม (accumulator) พบบ่อยมากในข้อสอบ: มีตัวแปรเก็บผลรวม แล้ววนบวกเพิ่มทีละรอบ ค่อยแสดงผลตอนจบ",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">      เริ่ม\n        │\n    total = 0\n        │\n  วน i = 1 ถึง 4 ◄──┐\n        │           │\n total = total + i*2 ┘\n\n  ครบแล้ว → พิมพ์ total</span>(ต้องได้ <b>20</b>)',
            starter: '# ภารกิจ: แปลงผังงานสะสมค่าเป็นโค้ด\n\n',
            hint: '<code>total = 0</code> → <code>for i in range(1, 5):</code> → <code>total += i * 2</code> → print(total) นอกลูป — ลองไล่มือ: 2+4+6+8 = 20',
            xp: 100,
            check: (out, code) => eq(out, "20") && /total\s*/.test(code) && /for\s+|while\s+/.test(code)
          },
          {
            title: "ผังงานหาค่ามากสุด",
            desc: "ผังงานยอดฮิตในข้อสอบ: ตัวแปร best เก็บแชมป์ปัจจุบัน วนเทียบทีละตัว ใครมากกว่าก็ขึ้นแท่นแทน",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">        เริ่ม\n          │\n      best = 0\n          │\n วน s ใน [40, 75, 60] ◄──┐\n          │              │\n     s > best ? ──ไม่────┤\n         ใช่             │\n          │              │\n      best = s ──────────┘\n\n   ครบแล้ว → พิมพ์ best</span>(ต้องได้ <b>75</b>)',
            starter: '# ภารกิจ: หาคะแนนสูงสุดตามผังงาน\nscores = [40, 75, 60]\n\n',
            hint: '<code>best = 0</code> → <code>for s in scores:</code> → <code>if s > best:</code> → <code>best = s</code> → print(best) นอกลูป',
            xp: 100,
            check: (out, code) => eq(out, "75") && /for\s+/.test(code) && /if\s+/.test(code)
          },
          {
            title: "ผังงานใช้พลังงาน",
            desc: "ผัง while ในสถานการณ์จริง: มีพลังงานจำกัด ทำซ้ำจนพลังไม่พอแล้วค่อยจบ — ไล่มือค่าพลังงานทุกรอบให้ดี",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">        เริ่ม\n          │\n     energy = 10\n          │\n   energy >= 4 ? ◄──┐\n         ใช่        │\n          │         │\n     พิมพ์ "โจมตี"    │\n          │         │\n   energy -= 4 ─────┘\n\n  ไม่ → พิมพ์ "หมดแรง"</span>',
            starter: '# ภารกิจ: โจมตีจนกว่าจะหมดแรง\n\n',
            hint: '<code>while energy >= 4:</code> ข้างในพิมพ์กับลดพลัง — ไล่มือ: 10 → 6 → 2 หยุด (โจมตีได้ 2 ครั้ง)',
            xp: 100,
            check: (out, code) => { const l = lines(out); return l.join(",") === "โจมตี,โจมตี,หมดแรง" && /while\s+/.test(code); }
          },
          {
            title: "ผังงานก้าวทีละสอง",
            desc: "ผังลูปที่ตัวนับเพิ่มทีละ 2 — สังเกตกล่องอัปเดตค่าให้ดีว่าเพิ่มเท่าไหร่ต่อรอบ แล้วเขียนตามให้ตรง",
            goal: 'เขียนโค้ดตามผังงานนี้:<span class="fc">        เริ่ม\n          │\n        i = 2\n          │\n     i <= 8 ? ◄──┐\n         ใช่     │\n          │      │\n       พิมพ์ i    │\n          │      │\n     i = i + 2 ──┘\n\n    ไม่ → จบ</span>(ต้องได้ 2, 4, 6, 8 บรรทัดละเลข)',
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
  $("langScreen").classList.toggle("hide", name !== "lang");
  $("topicScreen").classList.toggle("hide", name !== "topic");
  $("lessonScreen").classList.toggle("hide", name !== "lesson");
  $("boardScreen").classList.toggle("hide", name !== "board");
  $("gameScreen").classList.toggle("hide", name !== "game");
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
    el.onclick = () => { state.lang = id; renderTopics(); showScreen("topic"); };
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
    el.onclick = () => openLesson(t);
    g.appendChild(el);
  });
}

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
  const doneCount = t.stages.filter((_, s) => state.done.has(doneKey(state.lang, t.id, s))).length;
  $("lsStart").textContent = doneCount > 0 ? "อ่านจบแล้ว ทำแบบฝึกหัดต่อ →" : "เข้าใจแล้ว เริ่มทำแบบฝึกหัด →";
  showScreen("lesson");
}
function startExercises() {
  const t = lessonTopic;
  if (!t) return;
  state.topic = t.id;
  const firstUndone = t.stages.findIndex((_, s) => !state.done.has(doneKey(state.lang, t.id, s)));
  state.stage = firstUndone === -1 ? 0 : firstUndone;
  renderStage();
  showScreen("game");
}
$("lsStart").onclick = startExercises;
$("backFromLesson").onclick = () => { renderTopics(); showScreen("topic"); };

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
  renderXP();
  renderLangs();
  showScreen("lang");
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

$("guestBtn").onclick = () => { $("authOverlay").classList.remove("show"); showScreen("lang"); };

$("authBtn").onclick = async () => {
  if (state.user) {
    await api("/api/logout", {}).catch(() => {});
    state = { user: null, level: 1, xp: 0, lang: null, topic: null, stage: 0, done: new Set() };
    $("pname").textContent = "ผู้เยี่ยมชม";
    $("editHint").textContent = "แตะเพื่อล็อกอิน";
    $("authBtn").textContent = "เข้าสู่ระบบ";
    renderXP(); renderLangs(); showScreen("lang");
  }
  $("authOverlay").classList.add("show");
};

[$("inEmail"), $("inPass"), $("inName")].forEach(el =>
  el.addEventListener("keydown", e => { if (e.key === "Enter") $("authSubmit").click(); })
);

/* ═══════════════ Profile UI ═══════════════ */
$("profileBtn").onclick = () => {
  if (!state.user) { $("authOverlay").classList.add("show"); return; }
  $("pfName").value = state.user.name;
  $("pfCur").value = "";
  $("pfNew").value = "";
  $("pfMsg").className = "form-msg";
  $("profileOverlay").classList.add("show");
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
    const d = await api("/api/profile", body);
    state.user.name = d.user.name;
    $("pname").textContent = d.user.name;
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
$("homeBtn").onclick = () => { renderLangs(); showScreen("lang"); };
$("backToLang").onclick = () => { renderLangs(); showScreen("lang"); };
$("backToTopic").onclick = () => { renderTopics(); showScreen("topic"); };
$("lessonBtn").onclick = () => openLesson(curTopic());
$("boardBtn").onclick = openBoard;
$("backFromBoard").onclick = () => {
  if (state.lang && state.topic) { renderTopics(); showScreen("topic"); }
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
    runBtn.textContent = "▶ รันโค้ด";
  } catch (e) {
    $("bootStatus").textContent = "โหลด Python ไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้งนะ";
    runBtn.textContent = "โหลดไม่สำเร็จ";
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
  $("mReward").textContent = `รางวัลเมื่อผ่านด่าน: ${L.xp} EXP`;
  $("hintBox").innerHTML = L.hint;
  $("hintBox").classList.remove("show");
  attempts = 0;
  updateHintBtn();
  $("fileName").textContent = `${t.id}_${state.stage + 1}.py`;
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

function renderXP() {
  const need = xpNeed(state.level);
  $("lvlBadge").textContent = "LV." + state.level;
  $("xpText").textContent = `${state.xp} / ${need}`;
  $("xpFill").style.width = Math.min(100, (state.xp / need) * 100) + "%";
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
async function runCode() {
  if (!pyodide) return;
  runBtn.disabled = true;
  runBtn.textContent = "⏳ กำลังรัน...";
  let stdout = "", stderr = "";
  pyodide.setStdout({ batched: s => stdout += s + "\n" });
  pyodide.setStderr({ batched: s => stderr += s + "\n" });

  const code = codeEl.value;
  try {
    // จำลองการป้อนข้อมูล: input() จะอ่านค่าจากคิวที่โจทย์กำหนด (stdin) ตามลำดับ
    const stdinVals = levels()[state.stage].stdin || [];
    await pyodide.runPythonAsync(
      "import builtins, json\n" +
      "_game_inputs = json.loads(" + JSON.stringify(JSON.stringify(stdinVals)) + ")\n" +
      "def _game_input(prompt=\"\"):\n" +
      "    return str(_game_inputs.pop(0)) if _game_inputs else \"\"\n" +
      "builtins.input = _game_input\n"
    );
    await pyodide.runPythonAsync(code);
  } catch (e) {
    stderr += String(e.message || e);
  }
  runBtn.disabled = false;
  runBtn.textContent = "▶ รันโค้ด";

  if (stderr) {
    outEl.innerHTML = "";
    const p = document.createElement("pre");
    p.className = "err";
    p.textContent = friendlyError(stderr);
    outEl.appendChild(p);
  } else {
    outEl.textContent = stdout || "(โปรแกรมทำงานเสร็จ แต่ไม่มีข้อความแสดงออกมา)";
  }

  const L = levels()[state.stage];
  const banner = $("banner");
  if (!stderr && L.check(stdout, code)) {
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
    $("bannerText").textContent = stderr ? "โค้ดมีข้อผิดพลาด ลองอ่านข้อความสีแดงด้านล่างดูนะ" : "ผลลัพธ์ยังไม่ตรงเป้าหมาย ลองเทียบกับภารกิจอีกครั้ง";
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
runBtn.onclick = runCode;
$("resetBtn").onclick = () => { codeEl.value = levels()[state.stage].starter; };
$("hintBtn").onclick = () => $("hintBox").classList.toggle("show");
$("nextBtn").onclick = () => {
  if (state.stage < levels().length - 1) {
    state.stage++;
    renderStage();
  } else {
    renderTopics();
    showScreen("topic");
  }
};
$("closeOverlay").onclick = () => $("overlay").classList.remove("show");
codeEl.addEventListener("keydown", e => {
  if (e.key === "Tab") {
    e.preventDefault();
    const s = codeEl.selectionStart;
    codeEl.value = codeEl.value.slice(0, s) + "    " + codeEl.value.slice(codeEl.selectionEnd);
    codeEl.selectionStart = codeEl.selectionEnd = s + 4;
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") runCode();
});

/* ═══════════════ Init ═══════════════ */
const CONTENT_VERSION = 5; // ต้องตรงกับ CONTENT_VERSION ใน server.js
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
