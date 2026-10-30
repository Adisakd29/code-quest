/* หลักสูตรตัวอย่างสำหรับพิสูจน์สายการตรวจ Python v2 (ไม่แสดงให้ผู้เรียน) — ครอบคลุมทุกรูปแบบโจทย์ที่ Phase 1+ ใช้ */
const PY2 = require("../../public/courses/py2.js");
const { V, H, CALL, check, predict } = PY2.helpers;

module.exports = {
  name: "Python", version: 2,
  topics: [
    {
      id: "py2-fx-basics", title: "Fixture: พื้นฐาน", blurb: "ตรวจสายการทำงาน",
      lesson: [
        { h: "ส่วนที่ 1", p: "ตัวอย่างต้องรันได้จริง", code: "print('hello')" },
        { h: "ส่วนที่ 2", p: "อ่านค่าและคำนวณ", code: "x = 3\nprint(x * 2)" },
        { h: "ส่วนที่ 3", p: "f-string", code: "name = 'Ann'\nprint(f'Hi {name}')" },
      ],
      stages: [
        { title: "รวมเลขสองค่า", kind: "Write Program", desc: "อ่านจำนวนเต็มสองค่า (บรรทัดละค่า) แล้วแสดงผลรวม", goal: "แสดง <b>ผลรวม: n</b>",
          starter: "a = int(input())\nb = int(input())\n", xp: 40,
          hints: ["อ่านแล้วแปลงเป็น int", "ใช้ + แล้ว print", "print(f'ผลรวม: {a + b}')"],
          tests: [V("2\n3\n", "ผลรวม: 5"), H("-4\n4\n", "ผลรวม: 0", "ค่าติดลบ"), H("1000000\n1\n", "ผลรวม: 1000001", "ค่าใหญ่")], check },
        { title: "ค่าเฉลี่ยที่ตรวจข้อมูล", kind: "Write Function", desc: "เขียน <code>average(scores)</code> คืนค่าเฉลี่ย · ลิสต์ว่างต้อง <code>raise ValueError</code>", goal: "ฟังก์ชันคืนค่า float",
          starter: "def average(scores):\n    pass\n", xp: 60,
          hints: ["sum หารด้วย len", "ตรวจลิสต์ว่างก่อนหาร", "if not scores: raise ValueError('ว่าง')"],
          tests: [CALL("average", "([80, 90],)", "85.0"), CALL("average", "([1, 2, 2],)", "1.6666666666666667", { hidden: true, label: "ทศนิยม" }),
                  CALL("average", "([],)", { raises: "ValueError" }, { hidden: true, label: "ลิสต์ว่าง" }), CALL("average", "([7],)", "7.0", { hidden: true, label: "ค่าเดียว" })], check },
        predict("ทำนายผล: slicing", "s = 'python'\nprint(s[1:4], s[-1])", ["yth n", "pyt n", "yth p", "ytho n"], 0, "s[1:4] คือตำแหน่ง 1 ถึง 3 · s[-1] คือตัวสุดท้าย", 30),
        { title: "แบบทดสอบ", desc: "ทบทวน", goal: "ตอบถูกครบ", xp: 30,
          quiz: [{ t: "mc", q: "ผลของ <code>7 // 2</code>", c: ["3", "3.5", "4", "1"], a: 0, e: "// คือหารปัดลง" }] },
      ],
    },
    {
      id: "py2-fx-advanced", title: "Fixture: ขั้นสูง", blurb: "หลายไฟล์ ไฟล์ข้อมูล async และข้อมูลใหญ่",
      lesson: [
        { h: "แพ็กเกจ", p: "หลายไฟล์", code: "import math\nprint(math.sqrt(16))" },
        { h: "ไฟล์", p: "pathlib", code: "from pathlib import Path\nprint(Path('a.txt').suffix)" },
        { h: "async", p: "asyncio.run", code: "import asyncio\nasync def m():\n    return 1\nprint(asyncio.run(m()))" },
      ],
      stages: [
        { title: "แพ็กเกจคำนวณภาษี", kind: "Write Program", desc: "แยกโค้ดเป็นแพ็กเกจ <code>shop</code>", goal: "แสดงราคารวมภาษี 7%",
          starter: "from shop import with_vat\nprint(with_vat(float(input())))\n# === shop/__init__.py ===\n", xp: 70,
          hints: ["__init__.py นำเข้าจากโมดูลย่อย", "relative import: from .tax import with_vat", "def with_vat(p): return round(p * 1.07, 2)"],
          tests: [V("100\n", "107.0"), H("0\n", "0.0", "ศูนย์")], check },
        { title: "นับบรรทัดในไฟล์", kind: "File/Data", desc: "อ่าน <code>scores.csv</code> แล้วนับแถวที่คะแนน ≥ 50", goal: "แสดง <b>ผ่าน: n</b>",
          starter: "from pathlib import Path\n", xp: 60,
          hints: ["read_text แล้ว splitlines", "แยกด้วย split(',')", "นับเมื่อ int(score) >= 50"],
          tests: [{ in: "", out: "ผ่าน: 2", files: { "scores.csv": "a,80\nb,40\nc,50\n" } }, { in: "", out: "ผ่าน: 0", hidden: true, label: "ไม่มีใครผ่าน", files: { "scores.csv": "x,1\n" } }], check },
        { title: "งานพร้อมกัน", kind: "Async", desc: "ใช้ <code>asyncio.gather</code> รวมผล", goal: "แสดงลิสต์ผลลัพธ์ตามลำดับ",
          starter: "import asyncio\n", xp: 80,
          hints: ["async def แล้ว await asyncio.sleep", "gather คืนผลตามลำดับที่ส่ง", "asyncio.run(main())"],
          tests: [V("3\n", "[0, 2, 4]"), H("1\n", "[0]", "งานเดียว")], check },
        { title: "หาค่าซ้ำในข้อมูลใหญ่", kind: "Performance", desc: "นับค่าที่ไม่ซ้ำจากตัวเลข n ตัว", goal: "แสดง <b>ไม่ซ้ำ: k</b>",
          starter: "n = int(input())\nxs = list(map(int, input().split()))\n", xp: 90, timeoutMs: 3000,
          hints: ["set เก็บค่าไม่ซ้ำ", "len(set(xs))", "เลี่ยงการวนซ้อนเทียบทุกคู่"],
          tests: [V("5\n1 2 2 3 3\n", "ไม่ซ้ำ: 3"), { gen: { type: "ints", n: 100000, lo: 1, hi: 1000000, seed: 29 }, out: "ไม่ซ้ำ: 95185", hidden: true, label: "ข้อมูล 100,000 ตัว" }], check },
      ],
    },
  ],
};
