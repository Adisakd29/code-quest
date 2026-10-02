# 🕹️ Code Quest

เกมฝึกเขียนโปรแกรมบนเว็บ — เขียนโค้ด Python แล้วรันได้ทันทีในเบราว์เซอร์ (Pyodide/WebAssembly)
พร้อมระบบสมัครสมาชิก สะสม EXP อัพเลเวล บันทึกความคืบหน้าลง PostgreSQL

## โครงสร้างโปรเจกต์

```
code-quest/
├── server.js          # Express API: สมัคร/ล็อกอิน + บันทึก EXP และด่านที่ผ่าน
├── package.json
├── public/
│   └── index.html     # ตัวเกม (editor, Pyodide, ระบบด่าน, แอนิเมชัน)
└── README.md
```

## รันบนเครื่องตัวเอง

```bash
npm install
npm start
# เปิด http://localhost:3000
```

> ถ้ายังไม่ตั้ง `DATABASE_URL` เกมจะเล่นได้ในโหมดผู้เยี่ยมชม
> (ระบบสมัครสมาชิกจะใช้ได้เมื่อเชื่อมฐานข้อมูลแล้ว)

---

## 🚀 Deploy ขึ้น Railway (ผ่าน GitHub)

### ขั้นที่ 1 — เอาโค้ดขึ้น GitHub

1. สร้าง repository ใหม่บน https://github.com/new (ตั้งชื่อเช่น `code-quest`)
2. ในโฟลเดอร์โปรเจกต์นี้ รันคำสั่ง:

```bash
git init
git add .
git commit -m "Initial commit: Code Quest"
git branch -M main
git remote add origin https://github.com/<ชื่อผู้ใช้ของคุณ>/code-quest.git
git push -u origin main
```

### ขั้นที่ 2 — สร้างโปรเจกต์บน Railway

1. เข้า https://railway.app แล้วล็อกอินด้วยบัญชี GitHub
2. กด **New Project → Deploy from GitHub repo** แล้วเลือก repo `code-quest`
   (ครั้งแรก Railway จะขอสิทธิ์เข้าถึง GitHub — กดอนุญาต)
3. Railway จะตรวจเจอว่าเป็นแอป Node.js และ build ให้อัตโนมัติ

### ขั้นที่ 3 — เพิ่มฐานข้อมูล PostgreSQL

1. ในหน้าโปรเจกต์เดียวกัน กด **+ New → Database → Add PostgreSQL**
2. คลิกที่ service ของแอป (code-quest) → แท็บ **Variables** → กด **New Variable**
   - ชื่อ: `DATABASE_URL`
   - ค่า: กด **Add Reference** แล้วเลือก `Postgres → DATABASE_URL`
3. เพิ่มตัวแปรอีกตัว:
   - ชื่อ: `JWT_SECRET`
   - ค่า: สตริงยาวๆ สุ่มเอง เช่นผลลัพธ์จาก `openssl rand -hex 32`

ตาราง `users` และ `progress` จะถูกสร้างให้อัตโนมัติตอนเซิร์ฟเวอร์เริ่มทำงาน

### ขั้นที่ 4 — เปิดโดเมนสาธารณะ

1. คลิก service ของแอป → **Settings → Networking → Generate Domain**
2. จะได้ URL ประมาณ `https://code-quest-production.up.railway.app` — เปิดเล่นได้เลย!

### หลังจากนี้

ทุกครั้งที่ `git push` ขึ้น branch `main` Railway จะ **deploy เวอร์ชันใหม่ให้อัตโนมัติ**
นี่คือ workflow หลักของการพัฒนาต่อจากนี้

---

## API

| Method | Path            | หน้าที่                                        |
|--------|-----------------|------------------------------------------------|
| POST   | `/api/register` | สมัครสมาชิก `{email, password, name}`          |
| POST   | `/api/login`    | เข้าสู่ระบบ `{email, password}`                |
| POST   | `/api/logout`   | ออกจากระบบ                                     |
| GET    | `/api/me`       | ข้อมูลผู้เล่น + ด่านที่ผ่านแล้ว                |
| POST   | `/api/complete` | บันทึกการผ่านด่าน `{language, stage}` — เซิร์ฟเวอร์คำนวณ EXP เองเพื่อกันโกง |

## โครงสร้างเกม

ลำดับการเล่น: **ล็อกอิน → เลือกภาษา → เลือกหัวข้อ → อ่านบทเรียน → ทำแบบฝึกหัด**

ทุกหัวข้อมี**บทเรียน**สรุปแนวคิด + ตัวอย่างโค้ดให้อ่านก่อนเริ่มทำแบบฝึกหัด (ระหว่างเล่นกดปุ่ม "ทบทวนบทเรียน" กลับมาอ่านได้) และ**คำใบ้จะถูกล็อกไว้ จนกว่าจะลองผิดด้วยตัวเอง 2 ครั้ง** เพื่อฝึกให้คิดเองก่อน

หัวข้อของคอร์ส Python (14 หัวข้อเล่นได้ 73 ด่าน + 7 หัวข้อทฤษฎี):

| # | หัวข้อ | จำนวนด่าน |
|---|--------|-----------|
| 1 | คำสั่ง Print | 9 |
| 2 | ตัวแปร (Variable) | 9 |
| 3 | รับข้อมูล (Input) | 6 |
| 4 | ข้อความ (String) | 9 |
| 5 | โครงสร้างข้อมูล (List / Dict) | 10 |
| 6 | ตัวดำเนินการ (Operator) | 9 |
| 7 | เงื่อนไข If-Else | 9 |
| 8 | ลูป For / While | 11 |
| 9 | Flowchart สู่โค้ด | 7 |
| 10 | ฟังก์ชัน (Function) | 9 |
| 11 | 🏆 ด่านบอส: รวมพลัง | 7 |

















## 🧭 หลักสูตร C v2 (C17) — Phase 1 Foundations (v48 · เนื้อหาใหม่เปิดใช้แล้ว)

**ไฟล์:** `public/courses/c2.js` (เนื้อหา + กฎ prerequisite ของภาษา C) · `tests/sols-c2.js` (เฉลย/คำตอบผิด) · ตรวจด้วย `npm run test:c2` (อยู่ใน run-all)
**Stage 1–4:** ยินดีต้อนรับสู่ภาษา C · รับและแสดงผล · ตัวแปร ค่าคงที่ และชนิดข้อมูล · ตัวดำเนินการและการแปลงชนิด (Boss 1: ใบเสร็จร้านกาแฟ) — 33 ภารกิจ (โค้ด 24 · คำถาม 9)
**Phase 2 (v49) · Stage 5–8:** การตัดสินใจ (มินิโปรเจกต์ตัดเกรด) · ลูปและการควบคุม (เกมทายเลข · Boss 2 เครื่องคิดเลขแบบเมนู · Program Trace) · ฟังก์ชัน (prototype, pass by value, math.h, Refactor) · ขอบเขต อายุ และ recursion (static local, shadowing, Performance ขั้นบันได) — รวม C v2 = 8 บท 70 ภารกิจ (โค้ด 52 · คำถาม 18)
**Phase 3 (v50) · Stage 9–11:** อาร์เรย์และเมทริกซ์ (Matrix Toolkit · Boss 3) · สตริงในภาษา C (strncpy/snprintf/ctype · Word Counter) · รับข้อมูลอย่างทนทาน (fgets/strtol/sscanf/strtok · Boss 4 Text Analyzer) — รวม C v2 = 11 บท 100 ภารกิจ
**Phase 4 ชุดที่ 1 (v51) · Stage 12–14:** พื้นฐานพอยน์เตอร์ · พอยน์เตอร์กับฟังก์ชัน (swap, output parameter, คืนสถานะ, maxPtr) · พอยน์เตอร์กับอาร์เรย์ ([begin, end), ptrdiff_t, strchr) พร้อม Pointer Trace — รวม C v2 = 14 บท 126 ภารกิจ
**Phase 4 ครบ (v52) · Stage 15–17:** พอยน์เตอร์ซ้อน/const/กับดัก (UB Detective · Boss 5 แยกคำด้วยพอยน์เตอร์) · หน่วยความจำแบบพลวัต (malloc/calloc/realloc/free · Dynamic Array Manager) · รูปแบบการจัดการหน่วยความจำ (goto cleanup · use-after-free · realloc ที่ปลอดภัย · String Utility · Boss 6 สมุดรายชื่อ) — Memory Checker เปิดใน 15 ด่าน · รวม C v2 = 17 บท 156 ภารกิจ
**Phase 5 ชุดที่ 1 (v53) · Stage 18–20:** struct/typedef/enum (Student Grade Manager) · ไฟล์ข้อความ (fopen/fgets/fprintf · กับดัก feof · โหมด w กับ a · Expense Tracker) · ไฟล์ไบนารี union และ data layout (fread/fwrite/fseek · padding/offsetof · endianness · tagged union · Boss 7 ทะเบียนไบนารีแก้ในที่เดิมด้วย r+b) — รวม C v2 = 20 บท 183 ภารกิจ
**Phase 5 ครบ (v54) · Stage 21–22:** โปรแกรมหลายไฟล์และการ link (include guard · undefined/duplicate symbol จริง · static/extern · header hygiene · Linker Detective) · พรีโปรเซสเซอร์และมาโคร (วงเล็บ · multiple evaluation · do-while(0) · conditional compilation ตามแพลตฟอร์ม · # stringize · Preprocessor Puzzle · Boss 8 ตัวจัดการไฟล์ตั้งค่าแบบหลายไฟล์) — รวม C v2 = 22 บท 200 ภารกิจ
**Stage 23–25 (v55):** Function Pointer และ Generic C (dispatch table · comparator ที่ไม่ล้น · callback · _Generic · void * · qsort/bsearch) · Dynamic Array และ Linked List (IntVec API · Node ** · คืนลิสต์ถูกวิธี · ลิสต์สองทาง · Task Manager) · Stack, Queue และ Hash Table (วงเล็บ · ring buffer · RPN · djb2 แบบ uint32_t · พจนานุกรม rehash · คิวเครื่องพิมพ์) — รวม C v2 = 25 บท 226 ภารกิจ
**Stage 26–28 (v56):** Tree, Heap และ Graph (BST · ลบสามกรณี · min-heap · Boss 9 ระเบียนใน BST) · Algorithms และ Big-O (insertion sort/inversions · Performance Lab merge sort และ binary search ที่ 200,000 ตัว · BFS/DFS บนตาราง · CSV processor) · Debugging, UB และ Memory Safety (assert · ตรวจล้นก่อนคูณ · buffer overflow ใน struct · stderr · unspecified order · char signedness · log analyzer · UB Detective · gdb) — รวม C v2 = 28 บท 254 ภารกิจ
**Stage 29–30 (v57):** Testing และ Performance (mutation testing วันที่ · มาโคร CHECK · regression · ตัดค่าซ้ำ 100,000 ตัว · ลดการคัดลอก struct · safeAdd) · Professional C (opaque struct · error code · สัญญาความเป็นเจ้าของ · semantic versioning · Make/CMake · Boss 10 ไลบรารี ring) — รวม C v2 = 30 บท 270 ภารกิจ
**Stage 31 Capstone (v58):** StockKeeper ระบบคลังสินค้า 12 milestone (Requirements · Architecture · Data Structures · File Format · Parser · Core Modules · Memory · Error Handling · Tests · Performance · Docs · Final Review) — หลักสูตรหลัก C v2 ครบ 31 บท 282 ภารกิจ
**แก้การแสดงข้อความของเนื้อหา (v61):** ทุกจุดที่แสดงบทเรียน คำอธิบาย เป้าหมาย คำใบ้ และแบบทดสอบ ผ่าน `richText()` (`public/rich-text.js`) ซึ่งคงไว้เฉพาะแท็กจัดรูปแบบที่เนื้อหาใช้ (b strong i em code pre br span sup sub kbd small · แอตทริบิวต์ได้แค่ class และ data-*) และ escape `<` อื่นทั้งหมด · ก่อนแก้: คำอธิบายภารกิจของ C++ และ C v2 แสดงแท็กดิบ (~350 ด่าน) และคำใบ้/แบบทดสอบที่มี `<stdio.h>` หรือ `static_cast<double>` ข้อความหายไป (61 จุด) · ทดสอบถาวร `tests/test-rich-text.js`
**โบนัส B1 Systems Track (v60) — หลักสูตร C v2 ครบตาม Blueprint:** register และ bit field · มาโครจัดการบิต · signed shift · parser โปรโตคอลไบนารี (big-endian + XOR checksum) · state machine แบบตาราง · pool allocator แบบไม่ใช้ heap · อ่านโค้ด POSIX (fork/pipe/thread/signal ซึ่ง WebAssembly ไม่มี) — รวม C v2 = 33 บท 299 ภารกิจ (หลัก 31 บท + โบนัส 2 บท)
**โบนัส B2 Modern C (v59):** บท `c2-modern` ตั้ง `compiler: "c23"` — หน้าเกม (clangMode) และตัวตรวจ (flagsFor) ใช้ `-std=c23` เฉพาะบทนี้ · บทอื่นยังเป็น C17 · cache ของตัวตรวจแยกตามมาตรฐาน · รวม C v2 = 32 บท 291 ภารกิจ
**ข้อจำกัด C23 ของตัวรัน (ทดลองยืนยันแล้ว):** คอมไพเลอร์รองรับครบ (bool/nullptr/typeof/constexpr/auto/attributes/0b/digit separator/= {}/#embed/#elifdef/stdckdint/_BitInt) แต่ C library ยังไม่มี `<stdbit.h>`, `strndup`, `memccpy` — ด่าน Portability สอนตรวจด้วย `__has_include`
**สร้าง Capstone จากแหล่งเดียว:** `scripts/build-c2-capstone.py` สร้างทั้งโจทย์และเฉลยจากโค้ดชุดเดียวกัน (milestone หลังๆ ได้โค้ดจาก milestone ก่อนหน้าแบบตรงกันทุกตัวอักษร) · แก้ capstone ให้แก้ที่สคริปต์แล้วสร้างใหม่ · เฉลยในไฟล์ใช้ `R\`…\`` (String.raw) จึงห้าม escape backslash ซ้ำ
**แก้บั๊กสำคัญ (มีผลกับด่านที่ deploy แล้ว):** หน้าเกมเคยเรียกตัวตรวจการย่อหน้าของ C เดิม (CRUN.checkIndent) กับด่าน C v2 ด้วย ทำให้โค้ดที่ถูกต้องแต่ย่อหน้าต่างสไตล์ (เช่น ป้าย goto หรือ #define ที่คอลัมน์ 0) ถูกตัดสินว่าไม่ผ่าน · ตอนนี้ตรวจเฉพาะหลักสูตร C เดิม · มีการทดสอบถาวร `tests/test-c2-indent.js`
**require กับ noComments:** noComments ลบบรรทัดแบ่งไฟล์ `// === x.c ===` ไปด้วย — ห้ามใช้คู่กับ regex ที่อ้างถึงบรรทัดนั้น (ตัวตรวจเนื้อหาล้มให้อัตโนมัติ)
**กรณีทดสอบ "พอดีเส้น":** คำตอบผิดแบบ `<` กับ `<=` / `>` กับ `>=` แยกได้เฉพาะเมื่อมีกรณีที่ค่าอยู่บนขอบพอดี (เช่น price = INT_MAX / qty, ไบต์ 127, ขอบช่วงที่เป็นค่าในต้นไม้) — ต้องมีกรณีเหล่านี้เสมอ
**ความ portable ของแฮช:** unsigned long บน WebAssembly เป็น 32 บิต (Linux 64 บิตเป็น 64) และ char มีเครื่องหมาย — โจทย์บังคับ uint32_t + unsigned char และใช้ข้อความไทยเป็นกรณีทดสอบที่แยกคำตอบผิดได้ (680 กับ 208)
**require ที่ตรวจเนื้อหา "เฉพาะไฟล์หนึ่ง" ในโจทย์หลายไฟล์:** จำกัดช่วงด้วย `(?:(?!//\s*=+)[\s\S])*` ไม่เช่นนั้น regex จะค้นข้ามไปไฟล์ถัดไป
**ไฟล์ในโจทย์:** /data ถูกเตรียมให้เสมอ (โปรแกรมสร้างไฟล์เองได้) · ไฟล์ข้อความของโจทย์กำหนดต่อกรณีทดสอบด้วย `files` · ไฟล์ไบนารีให้โปรแกรมเขียนเองแล้วอ่านกลับ · data layout สอนแบบบอกตรงๆ ว่าเป็นค่าของแพลตฟอร์มนี้ (WebAssembly 32 บิต little-endian)
**การแสดงผลเมื่อโปรแกรม C/C++ มีปัญหาตอนรัน:** แสดงสิ่งที่โปรแกรมพิมพ์ไว้ก่อน แล้วตามด้วย error และคำเตือน (Memory Error ไม่ต่อข้อความ memcheck ซ้ำ)
**บั๊กที่ทดสอบด้วยผลลัพธ์ไม่ได้:** เช่น `hi - lo + 1` ล้น int ให้ผลไม่เป็นบวกเสมอ จึงตรงกับเฉลยโดยบังเอิญ — สอนในคำใบ้/บทเรียน แต่คำตอบผิดในชุดตรวจต้องเป็นความผิดพลาดที่แยกได้ด้วยผลลัพธ์
**UB ในโค้ดตั้งต้น:** อาการอาจต่างกันระหว่างเบราว์เซอร์กับตัวตรวจ (เช่น wild pointer: เบราว์เซอร์หยุดทำงานเพราะคอมไพเลอร์แปลง UB เป็นคำสั่งหยุด ตัวตรวจได้ค่าผิด) — โจทย์จึงบอกว่า "อาจหยุดหรือผิดเงียบๆ" และทั้งสองแบบต้องไม่ผ่าน
**คำเตือนคู่กับ Runtime Error:** หน้าเกมต่อคำเตือนของคอมไพเลอร์ท้ายข้อความ error (คำเตือนมักบอกสาเหตุ)
**บั๊กขอบเขตแบบไม่เป็น UB:** Memory Checker ตรวจได้เฉพาะ malloc/free (เริ่มบทที่ 16) — โจทย์ขอบเขตบน stack จึงออกแบบให้แสดงอาการแน่นอนภายในอาร์เรย์ (เช่น บัฟเฟอร์ที่เติม X ไว้ก่อน · ช่องถัดไปที่เป็น 0)
**ชุดทดสอบ responsive:** `startAsGuest` บล็อกการโหลดคอมไพเลอร์ (`/vendor/clang/`) โดยค่าตั้งต้น — หน้าเกม C/C++ โหลดคอมไพเลอร์ล่วงหน้าทันทีซึ่งทำให้ข้อตรวจ layout หมดเวลา · ข้อที่ต้องคอมไพล์จริงใช้ `startAsGuest(page, { compiler: true })`
**ตรวจ recursion ด้วย require:** regex ต้องค้นจนจบตัวฟังก์ชัน (บรรทัดที่ขึ้นต้นด้วย `}`) ไม่ใช่แค่ถึง `}` ตัวแรก ไม่เช่นนั้น recursion ที่ใส่ปีกกาให้ if จะถูกมองว่าไม่ใช่ recursion
**Migration ที่เกิดขึ้นจริง:** เมื่อโหลด c2.js หัวข้อ C เดิม 10 หัวข้อย้ายไป `COURSES.c.legacyTopics` ทั้งเบราว์เซอร์และเซิร์ฟเวอร์ (`verify.js`) · ความคืบหน้า/XP/เหรียญเดิมไม่หาย · ด่านเดิมยังตรวจด้วย CRUN · ด่านโค้ด v2 ตรวจฝั่งเบราว์เซอร์ (verified: false) · ด่านข้อสอบ v2 ตรวจฝั่งเซิร์ฟเวอร์
**ประวัติ (Option C):** เหรียญ "ผู้บุกเบิกภาษา C" · การ์ดโลกแสดง "หลักสูตรรุ่นแรก: ผ่าน X / 88 ด่าน (เก็บไว้เป็นประวัติ)"
**ห้องแข่งขัน:** สุ่มเฉพาะด่านที่เซิร์ฟเวอร์ตรวจได้ — ด่านโค้ด C v2 ไม่ถูกสุ่ม (คะแนนยุติธรรม และไม่ต้องรอคอมไพล์) · ใช้ด่านข้อสอบ/ทำนายผลของ v2
**โหมดทดสอบ:** `CQ_C_LEGACY_ONLY=1` จำลองสภาพก่อน migration (ใช้ใน `npm run test:migration` · ปฏิเสธบน production)

## 🧭 หลักสูตร C v2 — Phase 0 (v47 · ระบบพร้อม ยังไม่เปลี่ยนเนื้อหาที่ผู้เรียนเห็น)

**Course versioning:** `COURSES[lang].legacyTopics` = หัวข้อรุ่นก่อน — ซ่อนจากแผนที่ ลำดับการล็อก การสุ่มห้อง และจำนวนบนหน้าแรก แต่ยังหาเจอสำหรับห้องที่ค้างอยู่ สถิติเหรียญ และการตรวจคำตอบ (`findTopic`, `verify.js`) · หัวข้อ C v2 ใช้ ID ใหม่ (`c2-…`) ไม่ชนของเดิม · XP ของหัวข้อใหม่สร้างจากข้อมูลคอร์ส · XP ของหัวข้อเดิมคงไว้
**ตัวรัน:** คอร์สที่ตั้ง `compiler: "c17"` ใช้ Clang (หัวข้อ legacy ยังใช้ CRUN) · `clang -x c -std=c17 -O1 -Wall -Wextra -Wpedantic` (ไม่ใช้ -Werror) · ไฟล์เริ่มต้น main.c · หลายไฟล์ .c/.h
**Memory Checker** (`public/cpp/memcheck.js`, ด่าน `memcheck: true`): ห่อ malloc/calloc/realloc/free ด้วย `-include` · leak ตอนจบ = exit 97 · free ซ้ำ/free พอยน์เตอร์แปลก/realloc ผิด = exit 98 · free แล้วเติม 0xDD · แทน ASan/UBSan ที่ใช้ใน WebAssembly ไม่ได้
**`noWarnings: true`:** ด่าน Professional ต้องไม่มีคำเตือน · **ประเภทข้อความ:** Compilation Error · Linker Error · Warning · Runtime Error · Test Failed · Timeout · Memory Error
**ตัวตรวจ:** `test-cpp.js --lang=c` (wrapper `test-c2.js`) · prerequisite ของ C กำหนดในไฟล์คอร์ส (`prereq`) · `test-c2-fixture.js` ตรวจ pipeline ด้วยหลักสูตรตัวอย่าง (อยู่ใน run-all) · `tests/test-c.js` = ชุดทดสอบหลักสูตร C เดิม (ต้องผ่านตลอด)
**Backup ก่อน deploy production:** `DATABASE_URL=... npm run backup -- ไฟล์.json` → deploy → `npm run backup:verify -- ไฟล์.json` (ทุกผู้ใช้ต้องมี XP/level ไม่ลดลงและ progress เดิมครบ) · ไฟล์มี password hash ห้าม commit
**Regression test:** `npm run test:migration` — จำลอง migration บนฐานข้อมูลเดียวกันด้วย `CQ_C_LEGACY_FIXTURE=1` (ปฏิเสธบน production)

## ⚙️ C++ Foundry — หลักสูตร C++20 (v46 · ครบหลักสูตร: 30 บท · 252 ภารกิจ)

**Phase 6 ชุดสุดท้าย:** Stage 29 Professional C++ (header/source, namespace, linker error ของจริง, ODR, CMake, API design, code review boss) · Stage 30 Capstone ระบบห้องสมุด 8 milestones + rubric
**คอมไพล์หลายไฟล์:** แบ่งไฟล์ในตัวแก้ไขด้วยบรรทัด `// === ชื่อไฟล์ ===` · `public/cpp/multifile.js` แยกไฟล์ (ใช้ร่วมกันทั้งเบราว์เซอร์และ test-cpp.js) · คอมไพล์ทุก .cpp แล้ว link · ข้อความ wasm-ld แสดงเป็น "ข้อผิดพลาดตอน link"
**Capstone:** สเปกคำสั่งฉบับเดียวในบทเรียน · ระบบฉบับสมบูรณ์ตัวเดียวต้องผ่านทุก milestone · กฎ "ชนิดโจทย์ห้ามซ้ำติดกัน" ยกเว้นชนิด Capstone
**test-cpp.js:** `--topic=cppcap/0,cppcap/1` เลือกเฉพาะบางด่านได้

### (เดิม) Phase 6 ชุดที่ 1 (v45)

**Phase 6 ชุดที่ 1:** Stage 26 debugging/UB/sanitizer/performance (dangling reference หลัง vector ขยาย, ตรวจ overflow ก่อนคูณ, คัดลอกโดยไม่จำเป็น, ล่าบั๊ก 4 ตัว) · Stage 27 concurrency (แนวคิด + mutex/lock_guard/scoped_lock/atomic/async แบบ deferred รันใน thread เดียว) · Stage 28 SOLID, Strategy/Factory/Observer/State, unit test
**ชนิดโจทย์ใหม่: Testing (mutation testing)** — ผู้เรียนเขียนชุดทดสอบ ตัวตรวจรันชุดนั้นกับฟังก์ชันที่ถูก (ต้องผ่าน) และเวอร์ชันที่มีบั๊ก (ต้องจับได้) ผ่าน stdin ที่เลือกเวอร์ชัน · label ของกรณีซ่อนบอกว่าบั๊กแบบไหนหลุด

### (เดิม) Phase 5 ครบ (v44)

**Phase 5 ชุดที่ 2:** Stage 23 ข้อผิดพลาด 3 แบบ + exceptions (แนวคิด) + error code/enum class/from_chars + fstream/CSV · Stage 24 linked list/BST/hash table/heap ด้วย unique_ptr + recursion · Stage 25 Big-O, DP (fib, ทอนเหรียญ), BFS, backtracking (N-Queens)
**ไฟล์ต่อกรณีทดสอบ:** `{ in, out, files: { "ชื่อ.txt": "เนื้อหา" } }` (หรือ `files` ระดับด่าน) — โปรแกรมเปิดได้ที่ `/data/ชื่อ.txt` ทั้งในเบราว์เซอร์และ test-cpp.js
**คำตอบอ้างอิงของอัลกอริทึม** (N-Queens, BFS, fib, ทอนเหรียญ) คำนวณด้วย Python แยกก่อนเขียนกรณีทดสอบ

### (เดิม) Phase 5 ชุดที่ 1 (v43)

**Phase 5 ชุดที่ 1:** Stage 20 Modern C++ (ตารางฟีเจอร์ตามมาตรฐาน, enum class, constexpr, optional, variant, string_view, structured bindings, span) · Stage 21 copy/move, Rule of 0/3/5, shallow vs deep copy, move constructor, shared_ptr/weak_ptr · Stage 22 function/class template, non-type parameter, variadic/fold, concepts
**ขนาดบทที่เหลือ:** บทละ 4 ด่านโค้ด + ข้อสอบ + ทำนายผล (ไม่มีด่านอ่านโค้ด) เพื่อคุมจำนวนรวมไม่ให้เกินช่วง roadmap มาก

### (เดิม) Phase 4 ครบ (v42)

**Phase 4 ชุดที่ 3 (STL):** Stage 17 vector/array/deque/list + iterator invalidation · Stage 18 stack/queue/priority_queue/set/map/unordered + pair · Stage 19 iterator/lambda/sort/accumulate/count_if/unique/lower_bound + การอ่านเอกสาร
**Performance Challenge:** `public/cpp/testgen.js` สร้าง input ใหญ่จาก seed (เบราว์เซอร์และ test-cpp.js ใช้โมดูลเดียวกัน) · กรณีทดสอบ `{ gen: {...}, out, hidden, label }` ใช้ได้เฉพาะโจทย์ชนิด Performance · ไม่ผ่านเพราะช้าแสดง "ช้าเกินไปสำหรับข้อมูลขนาดใหญ่ (n = …)"
**กฎการเลือกขนาด:** วัดเวลาจริงของวิธีช้า (เช่น vector::insert หน้า n = 400,000 ใช้ 8.6 วินาที) ให้เกินเกณฑ์ 3 วินาทีชัดเจน · test-cpp.js ตรวจว่าเฉลยไม่หมดเวลา และโค้ดตั้งต้น/คำตอบช้าต้องไม่ผ่าน

### (เดิม) Phase 4 ชุดที่ 2 (v41)

**Phase 4 ชุดที่ 2:** Stage 14 constructor/initializer list/explicit/destructor/encapsulation · Stage 15 inheritance/virtual/override/abstract + กับดัก object slicing และ virtual destructor · Stage 16 composition/interface/dependency injection/ลำดับการสร้างสมาชิก
**ชนิดโจทย์ใหม่:** ออกแบบ (Design Challenge)
**ข้อความคอมไพเลอร์:** ตัด "In file included from…" และรายละเอียดภายในไลบรารีมาตรฐาน · เก็บข้อความคำเตือนและทุกบรรทัดที่ชี้ main.cpp · จำกัด 60 บรรทัด

### (เดิม) Phase 4 ชุดที่ 1 (v40)

**Phase 4 ชุดที่ 1:** Stage 11 พอยน์เตอร์ (nullptr, pointer arithmetic, const กับพอยน์เตอร์, output parameter) · Stage 12 new/delete เพื่อเข้าใจโค้ดเก่า → ปัญหา (leak, ผิดคู่) → RAII + unique_ptr/make_unique/move · Stage 13 struct/class/เมธอด/const member function/private เบื้องต้น
**ชนิดโจทย์ใหม่: อ่านโค้ด (`reading(...)`)** — ถามว่าโค้ดทำอะไร · โค้ดถูกคอมไพล์ใน test-cpp.js ต้องผ่านและไม่มีคำเตือน
**`require` แบบ `noComments: true`** — ตรวจโค้ดหลังตัดคอมเมนต์ (เช่น "ห้ามใช้ new/delete" ไม่ตกเพราะคำในคอมเมนต์)

### (เดิม) Phase 3b (v39)

**Phase 3b ชุดที่ 2:** Stage 8 reference/const&/overload/default args + ตู้ ATM · Stage 9 อาร์เรย์/2 มิติ/ค้นหา/นับความถี่ + Tic-Tac-Toe · Stage 10 std::string/getline/std::ws/find/substr/cctype/C-string + ตัววิเคราะห์ข้อความ
**มินิโปรเจกต์ทั้งหมด (6):** เครื่องคิดเลข · โปรแกรมตัดเกรด · เกมทายเลข · ตู้ ATM · Tic-Tac-Toe · ตัววิเคราะห์ข้อความ

### (เดิม) Phase 3b ชุดที่ 1 (v38)

**Phase 3b ชุดที่ 1:** Stage 5 เงื่อนไข/switch · Stage 6 ลูป (รวม long long/overflow) · Stage 7 ฟังก์ชัน/ขอบเขต/static/เลี่ยง global
**มินิโปรเจกต์:** ฟิลด์ `project: { id, name, part, of }` แสดงป้าย "โปรเจกต์: X · ตอน n/m" — เครื่องคิดเลข (บท 2+4) · โปรแกรมตัดเกรด (บท 5) · เกมทายเลข (บท 6)
**ชนิดโจทย์ใหม่:** เติมฟังก์ชัน (Complete Function) · มินิโปรเจกต์
**ตัวตรวจ:** prerequisite รายบท (if ตั้งแต่บท 5, ลูป/long long บท 6, ฟังก์ชันบท 7, reference บท 8, อาร์เรย์บท 9, getline บท 10, vector บท 17…) · ตรวจตอนของมินิโปรเจกต์ต่อเนื่อง · require รองรับ flags

### (เดิม) Phase 3a (v37)

**Phase 3a (ตามผล audit):** แทนที่ด่านซ้ำ "HP หลังโดนโจมตี" ด้วย "รหัสลับของตัวอักษร" (char/ASCII) · เครื่องคิดเลขภาค 2 เน้นการหาร + พิสูจน์ a = q×b + r (ไม่ซ้ำภาค 1) · "คอมเมนต์ปิดบรรทัด" ตรวจว่าใช้ // จริง · เพิ่ม Predict Output บทละ 1 ข้อ
**กฎสำคัญเมื่อแก้หลักสูตร:** ความคืบหน้าผู้เล่นบันทึกตาม "ลำดับด่านในหัวข้อ" → ด่านใหม่ต้อง**ต่อท้าย**หัวข้อ · แก้ด่านเดิมให้แก้ในตำแหน่งเดิม · ห้ามลบหรือแทรกกลาง
**ด่านทำนายผล (`predict(...)`):** ใช้ระบบข้อสอบ (เซิร์ฟเวอร์ตรวจเอง) · ทุกข้อมี `src` ที่ test-cpp.js คอมไพล์และรันจริง — เฉลยต้องตรงผลจริงและต้องไม่มีตัวเลือกอื่นตรงด้วย

### (เดิม) Phase 0 + Stage 1–4 (v35)

**ตัวรัน (แบบ A — ฟรี คอมไพล์ในเบราว์เซอร์):** Clang 22 (`@yowasp/clang`) คอมไพล์ C++20 เป็น WebAssembly ในเครื่องของผู้เรียน
- ติดตั้งผ่าน npm (ไม่ commit ลง git) · เซิร์ฟเวอร์บีบอัด brotli/gzip ให้ครั้งแรกที่เริ่มทำงาน (เบื้องหลัง ~1 นาที) → ผู้เรียนดาวน์โหลด ~21.8MB ครั้งเดียว แล้ว cache ถาวร (`/vendor/clang/<version>/`)
- `public/cpp/compile-worker.js` คอมไพล์ด้วย `-std=c++20 -O1 -Wall -Wextra -fno-exceptions` · หน่วยความจำโปรแกรม ≤ 64MB · stack 1MB · ตัด path ภายในออกจากข้อความ error
- `public/cpp/run-worker.js` รันใน worker ใหม่ทุกครั้ง (WASI ผ่าน `@bjorn3/browser_wasi_shim`) · หมดเวลา 3 วินาที → terminate · ผลลัพธ์ ≤ 64KB · ระบบไฟล์จำลอง `/data`
- `public/cpp/cpp-runtime.js` (`window.CPP`) จัดการโหลด/สถานะ/cache ผลคอมไพล์/ตัวตรวจหลายกรณี
- **ข้อจำกัดของ toolchain:** ไม่มี exceptions และ `std::thread` → บท Exceptions สอนผ่านข้อสอบอ่านโค้ด + ด่านใช้ `optional`/error code/`expected` · บท Concurrency เป็นแนวคิด + mutex/atomic แบบ thread เดียว
- การตรวจเกิดในเบราว์เซอร์ (แบบเดียวกับ Python) — เซิร์ฟเวอร์รับผลด่านโค้ด C++ แบบ `verified:false` แต่ตรวจข้อสอบ C++ เอง

**เนื้อหา:** `public/courses/cpp.js` (แยกจาก game.js) · ฟิลด์เพิ่ม: `kind` (ชนิดโจทย์) · `hints` (3 ขั้น) · `tests` [{in, out, hidden, label}] · `require` (เฉพาะโจทย์ที่ระบุความต้องการด้านโค้ด) · ตาราง XP ฝั่งเซิร์ฟเวอร์สร้างจากไฟล์นี้อัตโนมัติ
**เฉลย:** `tests/sols-cpp.js` (นอก public/) — เฉลย + คำตอบผิดที่ต้องไม่ผ่าน
**ตรวจคุณภาพ:** `npm run test:cpp` (รวมใน `run-all`) — คอมไพล์เฉลย/คำตอบผิด/โค้ดตั้งต้นทุกข้อด้วย Clang จริง, ตรวจ schema, prerequisite, ความหลากหลายของชนิดโจทย์, ความซ้ำ · cache ผลใน tmp (`--topic=<id>` ตรวจเฉพาะบท)

| Stage | ด่านโค้ด | ข้อสอบ | บอส/โปรเจกต์ |
|---|---|---|---|
| 1 รู้จัก C++ | 6 | 5 | ป้ายชื่อหุ่นยนต์ |
| 2 รับและแสดงผล | 8 | 5 | เครื่องคิดเลข ภาค 1 |
| 3 ตัวแปรและชนิดข้อมูล | 8 | 6 | บัตรนักผจญภัย |
| 4 ตัวดำเนินการและการแปลงชนิด | 9 | 6 | เครื่องคิดเลข ภาค 2 |

## ⚙️ หน้าตั้งค่าบัญชี (v34)

แท็บ **ตั้งค่า** (เดิมคือ "โปรไฟล์") เปิดหน้า Settings แบบเต็มจอ — เมนูหมวดด้านซ้าย (เดสก์ท็อป) / แถบเลื่อนแนวนอน (มือถือ) · ผู้เยี่ยมชมใช้ส่วนการแสดงผล/editor/ภาษาได้ (เก็บในเครื่อง)

| หมวด | สิ่งที่ทำได้ |
|---|---|
| โปรไฟล์ | ดูชื่อ อีเมล (ปิดบางส่วน) สถานะยืนยัน เลเวล วันที่สมัคร · แก้ชื่อ/ตัวละคร/รูปผ่าน modal เดิม |
| ความปลอดภัย | เปลี่ยน/ตั้งรหัสผ่าน (บัญชี Google-only ตั้งครั้งแรกได้) → อุปกรณ์อื่นหลุดทั้งหมด · สถานะยืนยันอีเมล |
| บัญชีที่เชื่อมต่อ | เชื่อม Google ขณะล็อกอิน · ยกเลิกการเชื่อม (ต้องมีรหัสผ่าน + ยืนยันรหัส — ห้ามลบช่องทางเข้าสู่ระบบสุดท้าย) |
| อุปกรณ์ | รายการอุปกรณ์ (เบราว์เซอร์ · ระบบ · ใช้ล่าสุด) · ออกจากระบบทีละเครื่อง / ทุกเครื่องอื่น — ไม่เก็บ IP หรือตำแหน่ง |
| ความเป็นส่วนตัว | ซ่อนชื่อจากตารางอันดับ |
| การแจ้งเตือน | เปิด/ปิดการแจ้งเตือนในเกม (เหรียญ, ภารกิจประจำวัน, ผู้เล่นเข้าห้อง) — อีเมลยังไม่เปิดใช้ |
| การแสดงผล | ขนาดตัวอักษร 100/115/130% · คอนทราสต์สูง · ลดการเคลื่อนไหว · กรอบโฟกัสชัด · ปุ่มใหญ่ 48px · เสียง |
| Code Editor | ขนาดตัวอักษร · ธีมเข้ม/สว่าง · Tab 2/4 · เลขบรรทัด · ตัดบรรทัด (มีตัวอย่างแสดงผลทันที) |
| ภาษาและภูมิภาค | ภาษา (ไทย) · พ.ศ./ค.ศ. · 12/24 ชั่วโมง · เขตเวลา |
| ข้อมูลของฉัน | ดาวน์โหลด JSON (โปรไฟล์ ความคืบหน้า การตั้งค่า ห้องแข่ง อุปกรณ์) — ไม่มี hash/token/secret |
| โซนอันตราย | ออกจากระบบทุกอุปกรณ์ · ลบบัญชีถาวร (ยืนยันรหัส + พิมพ์ "ลบบัญชี") |

**Session ต่ออุปกรณ์:** ตาราง `user_sessions` + `sid` ใน JWT · logout ยกเลิก session ที่เซิร์ฟเวอร์ (token ที่ถูกคัดลอกใช้ต่อไม่ได้) · token รุ่นเก่าที่ไม่มี sid ยังใช้ได้และถูกยกเลิกด้วย "ออกจากระบบอุปกรณ์อื่น"
**Recent auth:** ส่งออกข้อมูล / ลบบัญชี / ยกเลิก Google → บัญชีที่มีรหัสผ่านต้องใส่รหัส · บัญชี Google-only ต้องเข้าสู่ระบบภายใน 15 นาที (มีปุ่มเข้า Google ใหม่แล้วกลับหน้าตั้งค่า)
**การตั้งค่า:** ตาราง `user_settings.prefs` (JSONB) ตรวจด้วย `PREF_SCHEMA` ฝั่งเซิร์ฟเวอร์ · บันทึกอัตโนมัติ · ผู้เยี่ยมชมเก็บ `cq_prefs` ในเครื่อง → ตอนสมัครอัปโหลดขึ้นบัญชี (ถ้าบัญชียังไม่เคยตั้ง)
**ลบบัญชี:** ลบผู้ใช้ + ความคืบหน้า + identity + session + การตั้งค่า (CASCADE) · ประวัติห้องแข่งเปลี่ยนชื่อเป็น "ผู้เล่นที่ลบบัญชี" · อีเมลสมัครใหม่ได้

ทดสอบ: `GOOGLE_OAUTH_MOCK=1 node server.js` แล้ว `BASE=... DATABASE_URL=... npm run test:account` (33 กรณี)

## 🔐 Authentication: Google Sign-In + ยืนยันอีเมล (v30)

**สถาปัตยกรรม:** Express + PostgreSQL · JWT ใน cookie `token` (HttpOnly, SameSite=Lax, Secure บน production, 30 วัน) · bcryptjs cost 10 · ผู้เยี่ยมชมเก็บความคืบหน้าใน localStorage แล้วนำเข้าตอนมีบัญชีโดยเซิร์ฟเวอร์ตรวจคำตอบซ้ำ (union ไม่นับ XP ซ้ำ)

**Account model:** `users` (password_hash เป็น NULL ได้สำหรับบัญชี Google-only) + `auth_identities (provider, provider_user_id)` ผูก Google ด้วย `sub` ไม่ใช่อีเมล — เลือกตารางแยกแทนคอลัมน์ `google_sub` เพราะรองรับผู้ให้บริการเพิ่มในอนาคต (Microsoft/Apple) ได้โดยไม่แก้ `users` และบังคับ unique ต่อผู้ให้บริการได้ชัดเจน (แลกกับ join เพิ่มหนึ่งครั้งตอนเข้าสู่ระบบ)

**การเชื่อมบัญชี (ห้ามเชื่อมจากอีเมลอย่างเดียว):**
- Google `sub` เคยผูกแล้ว → บัญชีเดิม (แม้ผู้ใช้เปลี่ยนอีเมล Google)
- อีเมลซ้ำกับบัญชีที่**ยืนยันแล้ว** → ต้องเข้าสู่ระบบด้วยรหัสผ่านเดิมก่อน แล้วจึงเชื่อม
- อีเมลซ้ำกับบัญชีที่**ยังไม่ยืนยัน** → เลือกได้: เข้าด้วยรหัสผ่านเดิม หรือยืนยันความเป็นเจ้าของด้วย Google (เชื่อม + ลบรหัสผ่านเดิม + ยกเลิกทุก session เดิม ความคืบหน้าอยู่ครบ) — กันกรณีคนอื่นสมัครอีเมลเราไว้ก่อน
- Google ที่ `email_verified=false` → ไม่รับ

**Session:** JWT มี `tv` (token_version) เพิ่มค่าเมื่อเปลี่ยนรหัสผ่าน/ยึดบัญชีคืน → session เดิมทุกเครื่องใช้ไม่ได้ · token รุ่นเก่า (ไม่มี tv) ยังใช้ได้ ผู้ใช้เดิมไม่ถูกออกจากระบบหลังอัปเดต

### ตั้งค่า Google Cloud Console (เจ้าของระบบทำเอง)
1. https://console.cloud.google.com → สร้าง/เลือกโปรเจกต์
2. **Google Auth Platform → Branding** (OAuth consent screen): ชื่อแอป "Code Quest", อีเมลติดต่อ, โดเมนที่ได้รับอนุญาต (เช่น `up.railway.app` หรือโดเมนของคุณ) · Audience = External · scope: `openid`, `email`, `profile` (ไม่ต้องขอ scope อื่น จึงไม่ต้องผ่านการตรวจแอปแบบเต็ม)
3. **Clients → Create client → Web application**
   - Authorized JavaScript origins: `https://code-quests.up.railway.app` และ `http://localhost:3000`
   - Authorized redirect URIs:
     - Production: `https://code-quests.up.railway.app/api/auth/google/callback`
     - Development: `http://localhost:3000/api/auth/google/callback`
4. คัดลอก Client ID และ Client Secret → ใส่ใน Railway (ห้ามใส่ในโค้ดหรือ commit)
5. ระหว่างทดสอบ ถ้าแอปอยู่สถานะ Testing ต้องเพิ่มบัญชีทดสอบใน Audience ก่อน · เปิดให้ทุกคนใช้ → กด Publish app

### Environment variables (Railway → Service → Variables)
| ตัวแปร | จำเป็น | ค่า |
|---|---|---|
| `JWT_SECRET` | ✓ | สตริงสุ่มยาว ≥ 32 ตัว (มีอยู่แล้ว) |
| `PUBLIC_URL` | สำหรับ Google | `https://code-quests.up.railway.app` (ไม่มี `/` ท้าย) — ใช้สร้าง redirect URI แบบตายตัว |
| `GOOGLE_CLIENT_ID` | สำหรับ Google | จากขั้นตอนด้านบน |
| `GOOGLE_CLIENT_SECRET` | สำหรับ Google | จากขั้นตอนด้านบน (เซิร์ฟเวอร์เท่านั้น) |
| `RESEND_API_KEY` | สำหรับยืนยันอีเมล | จาก resend.com |
| `MAIL_FROM` | สำหรับยืนยันอีเมล | `Code Quest <noreply@โดเมนของคุณ>` |
| `CONTACT_EMAIL` | สำหรับเผยแพร่ Google | อีเมลติดต่อที่แสดงในหน้า `/privacy` และ `/terms` |
| `GOOGLE_OAUTH_MOCK` | **ห้ามตั้งบน production** | ใช้ทดสอบในเครื่องเท่านั้น (เซิร์ฟเวอร์ปฏิเสธเองถ้ารันบน Railway) |

ปุ่ม Google แสดงเองเมื่อตั้ง `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` + `PUBLIC_URL` ครบ · ระบบยืนยันอีเมลเปิดเองเมื่อตั้ง `RESEND_API_KEY`

### ทดสอบ
`MAIL_PROVIDER=log GOOGLE_OAUTH_MOCK=1 node server.js` แล้ว `BASE=http://localhost:3000 LOG=<ไฟล์ log> DATABASE_URL=... npm run test:auth` — 42 กรณี (รูปแบบอีเมล, อีเมลซ้ำ, OTP หมดอายุ/ใช้ซ้ำ/cooldown, Google ใหม่/ครั้งถัดไป/เปลี่ยนอีเมล, state/nonce ปลอม, การเชื่อมบัญชี, ยึดคืน + ยกเลิก session, Guest → Google/อีเมล, logout/login, ผู้ใช้เดิมก่อน migration)

Migration: `migrations/2026-10-auth.sql` (up/down) — เซิร์ฟเวอร์รันส่วน up ให้อัตโนมัติแบบ idempotent

## ✉️ ตรวจสอบอีเมลตอนสมัคร (v29)

**ชั้นที่ 2 — กรองตอนสมัคร (ทำงานทันที ไม่ต้องตั้งค่า)** · `email-check.js`
- รูปแบบอีเมล · โดเมนพิมพ์ผิด (เช่น `gmial.com` → แนะนำ `gmail.com` พร้อมปุ่มแก้ในคลิกเดียว และปุ่ม "อีเมลเดิมถูกต้องแล้ว" สำหรับโดเมนที่มีจริง)
- โดเมนที่ไม่มีระบบรับอีเมล (ตรวจ MX record, รองรับ null MX) · อีเมลใช้แล้วทิ้ง (เพิ่มโดเมนได้ด้วย env `DISPOSABLE_EMAIL_DOMAINS`)
- DNS ขัดข้อง → ปล่อยผ่าน (ไม่บล็อกผู้ใช้จริงเพราะปัญหาเครือข่าย) · ปิดการตรวจ MX ได้ด้วย `EMAIL_MX_CHECK=off`
- กฎชื่อผู้ใช้ของผู้ให้บริการ (v31): Gmail ต้องยาว 6–30 ตัว a-z/0-9/จุด (`1@gmail.com` สมัครไม่ได้ ข้ามไม่ได้) · Outlook/Hotmail, Yahoo, iCloud มีกฎพื้นฐาน ผู้ใช้กด "อีเมลเดิมถูกต้องแล้ว" ได้ (เผื่อบัญชีรุ่นเก่า)
- รหัสผ่านตัวเลขล้วนสั้นกว่า 15 หลัก (เบอร์โทร วันเกิด) ไม่รับ
- **กันไม่ได้:** ชื่อผู้ใช้ที่ถูกกฎแต่ไม่มีเจ้าของจริง (เช่น `abc123xyz@gmail.com`) → ต้องใช้ชั้นที่ 1

**ชั้นที่ 1 — ยืนยันด้วยรหัส OTP ทางอีเมล (เปิดเมื่อตั้งค่า)** · `mailer.js`
1. สมัครที่ [resend.com](https://resend.com) → เพิ่มและยืนยันโดเมนของคุณ (ตั้ง DNS ตามที่ Resend บอก) → สร้าง API key
2. ตั้ง environment variable บน Railway: `RESEND_API_KEY=re_...` และ `MAIL_FROM=Code Quest <noreply@โดเมนของคุณ>`
3. Deploy ใหม่ — ระบบยืนยันเปิดเองอัตโนมัติ

พฤติกรรมเมื่อเปิดใช้: สมัครแล้วเล่นและบันทึกความคืบหน้าได้ทันที · หน้าต่างกรอกรหัสเปิดเอง · รหัส 6 หลักใช้ได้ 10 นาที · ผิดได้ 5 ครั้ง · ขอรหัสใหม่ได้ทุก 60 วินาที (สูงสุด 5 ครั้ง/ชั่วโมง) · เก็บเฉพาะ HMAC hash ของรหัส · บัญชีที่ยังไม่ยืนยันไม่ขึ้นตารางอันดับและมีแถบเตือน · บัญชีเดิมไม่ถูกล็อกหรือลบ
ถ้าไม่ตั้งค่า → ระบบยืนยันปิด ทุกอย่างทำงานเหมือนเดิม · ทดสอบในเครื่องด้วย `MAIL_PROVIDER=log` (พิมพ์รหัสลง log แทนการส่ง — ห้ามใช้บน production)

## 📱 Responsive QA (v27)

**ทดสอบ:** `npm run test:responsive` — Playwright smoke test 30 กรณี (6 viewport: 390×844, 430×932, 768×1024, 820×1180, 1024×768, 1440×900) เปิดเซิร์ฟเวอร์ให้เองในโหมดผู้เยี่ยมชม ไม่ต้องมีฐานข้อมูล · ตรวจด้วยการวัดตำแหน่ง ไม่ใช้ pixel snapshot:
body ไม่ล้นแนวนอน · bottom nav ไม่บังปุ่ม (ตรวจด้วย `elementFromPoint`) · โหนดแผนที่อยู่ในขอบเขต · ชื่อหน่วยอยู่ในจอและไม่ถูกตัด · หน่วยที่ล็อกเข้าไม่ได้ทั้งคลิกและ Enter (0/2, 1/2) · route guard · หน่วยปัจจุบันเข้าได้ · 2/2 ปลดล็อกหน่วยถัดไป

**Audit เต็ม:** `BASE=http://localhost:3000 OUT=/tmp/qa npm run qa:responsive` — ไล่ทุก flow (Landing → Profile) ใน 17 viewport ตรวจ overflow, ข้อความถูกตัด, touch target < 44px, bottom nav บัง, modal เลื่อนไม่ได้, input < 16px (iOS zoom), ปุ่มไม่มีชื่อ, console/network errors พร้อม screenshot

**สิ่งที่แก้:**
- Dialog เลื่อนได้เมื่อสูงเกินจอ (เดิมกดปุ่มสมัครไม่ได้บนจอเล็ก/แนวนอน) และอยู่เหนือ bottom nav
- ขนาดสำหรับจอสัมผัสผูกกับ `@media (pointer: coarse)` แทนความกว้างจอ → แท็บเล็ตและมือถือแนวนอนได้ touch target ≥ 44px · input 16px กัน iOS ซูม
- `viewport-fit=cover` + padding เผื่อ bottom nav และ safe area · ซ่อน bottom nav เมื่อคีย์บอร์ดเปิด · หัวเว็บไม่ติดค้างบนจอเตี้ย
- โพเดียมอันดับย่อตามพื้นที่ · grid หน้าภารกิจ `min-width:0` · editor ไม่ตัดบรรทัด (เลื่อนในช่อง) · console เลื่อนในกล่อง · ปิด blur บนจอสัมผัส
- **ข้อสอบเรียงลำดับใช้งานไม่ได้มาตั้งแต่ v18** (ชื่อคลาสชนกัน รายการไปอยู่ในป้าย) — แก้แล้ว
- ปลดล็อกหน่วยบนแผนที่ตามลำดับ (หน่วยที่มีความคืบหน้าแล้วไม่ถูกล็อก) · สถานะล็อกใช้ `aria-disabled` ยังโฟกัสได้และบอกเหตุผล · route guard ระดับหน่วยและด่าน

## 🛠️ UX/UI fixes (v26)

- **มือถือ:** เส้นทางด่านในหัวข้อ (หน้า learn) เคยถูกวาดตอนหน้ายังซ่อน → ได้ความกว้างสำรอง 520px จนโหนดหลุดจอและกดไม่ได้ · ตอนนี้วาดใหม่เมื่อหน้าแสดงจริงและเมื่อขนาดจอเปลี่ยน
- **ปลดล็อกด่านตามลำดับ (UI):** ด่านแรกเปิดเสมอ · ด่านที่ผ่านแล้วเปิดเสมอ · ด่านอื่นต้องผ่านด่านก่อนหน้า · route guard อยู่ที่ `renderStage` ซึ่งเป็นจุดเข้าเดียวของทุกทาง (จุดเลข, เส้นทาง, ปุ่มถัดไป, เล่นต่อ) · โหมดห้องแข่งไม่ถูกล็อก · เซิร์ฟเวอร์ไม่เปลี่ยน
- **Run กับ Submit แยกกัน:** รัน = ดูผลลัพธ์ (ไม่ตรวจ ไม่นับความพยายาม) · ส่งคำตอบ = ตรวจและบันทึกผล (พฤติกรรมเดิม) · `Ctrl+Enter` รัน · `Ctrl+Shift+Enter` ส่งคำตอบ
- **สถานะตัวรัน:** `window.cqPyState` (`loading` / `ready` / `error`) ตั้งโดย `initPy` แทนการเดาจากข้อความ · ป้ายสถานะข้างชื่อไฟล์ · Python โหลดไม่ได้ → แจ้งชัดพร้อมปุ่ม "ลองใหม่" (เดิมค้างสถานะกำลังโหลดถ้าพังเร็ว)
- **บันทึกโค้ดอัตโนมัติ:** `cq_code:v1:<ผู้เล่น>:<ภาษา>:<หัวข้อ>:<ด่าน>` ใน localStorage · กู้คืนเมื่อเปิดด่านพร้อมแจ้งและปุ่ม "ใช้โค้ดเริ่มต้นแทน" · รีเซ็ตแล้วลบโค้ดที่บันทึก · ไม่กู้คืนในโหมดแข่ง
- **เวอร์ชันเนื้อหา:** ไม่แสดง `?` / `{{VERSION}}` อีก (เซิร์ฟเวอร์เติม + หน้าเว็บเติมสำรอง + แจ้งถ้าไม่ตรงกับเซิร์ฟเวอร์)
- **Lobby ห้องแข่ง:** ใช้ `hidden` attribute คู่กับคลาสเดิม แสดงเฉพาะหลังสร้าง/เข้าห้องสำเร็จ
- **emoji ที่ยังแสดงบนจอ → ไอคอน:** อันดับในห้องแข่ง, จุดด่านที่ผ่าน, ตัวเลือกถูก/ผิด, ผลตรวจข้อสอบ, คำแนะนำใน error, ข้อความ CodeBot

## 🧭 แผนที่ภารกิจแบบเส้นทางแนวตั้ง (v25)

แทนแผนที่เดิมที่วางโหนดด้วยพิกัดคำนวณ + ป้ายลอย + แผงรายละเอียดแยก ด้วย **timeline แนวตั้ง** (CSS Grid ไม่มีพิกัดคำนวณ จึงไม่ทับกัน)
- **เดสก์ท็อป:** เส้นทางตรงกลาง โหนดบนเส้น การ์ดสลับซ้าย/ขวา · **มือถือ/แท็บเล็ต (≤760px):** เส้นชิดซ้าย การ์ดคอลัมน์เดียว
- **สรุปด้านบน:** % ความคืบหน้าของโลก, หัวข้อที่ผ่าน, ภารกิจ, EXP ที่ได้ + ปุ่ม "ไปที่ภารกิจปัจจุบัน" (เลื่อนไปและโฟกัสปุ่มให้กด Enter ต่อได้)
- **การ์ด:** หน่วยที่ · ชื่อ · คำอธิบาย 2 บรรทัด · แถบความคืบหน้า · ความยาก (ง่าย/ปานกลาง/ท้าทาย) · EXP · ปุ่มหลัก + ปุ่มบทเรียน
- **สถานะ:** ผ่านแล้ว (โหนดเขียว + ✓) · กำลังเรียน (โหนดม่วงทึบ + วงแหวน + การ์ดขอบม่วง + ปุ่มหลัก) · ทำไปบางส่วน · ยังไม่เริ่ม (โหนดขอบเส้น) · บทเรียน (ขอบประ) · ภารกิจบอส (โหนดใหญ่ขึ้น กรอบทอง มงกุฎ) · ล็อก (รองรับไว้ ระบบยังไม่มีการล็อก)
- **เส้นความคืบหน้า:** เส้นทึบเขียวถึงโหนดปัจจุบัน ต่อด้วยเส้นประ — คำนวณจากตำแหน่งจริงและอัปเดตเมื่อขนาดจอเปลี่ยน
- **Map tokens** (`.quest-path` ใน style.css): `--qp-node`, `--qp-node-boss`, `--qp-rail`, `--qp-line`, `--qp-row-gap`, `--qp-card-max`, สีสถานะ `--qp-c-*` (เหมือนกันทุกโลก)
- ข้อมูลทั้งหมดมาจากระบบเดิม (`COURSES`, `state.done`, `topicProgress`, `currentTopicOf`) · โครงเป็น `<ol>` พร้อม `aria-current="step"` · ปุ่มทุกปุ่มสูง ≥ 44px

## 🌌 4 โลกย่อยในจักรวาลเดียว (v24)

**แกนกลางที่เหมือนกันทุกโลก:** typography · โครงการ์ด · border radius · spacing · ปุ่ม · interaction · ไอคอน (Lucide) · layout ของ editor/เกม — ตรวจอัตโนมัติแล้วว่าโครง DOM ของการ์ด ฟอนต์ ขนาดตัวอักษร radius padding ขนาดโหนด และปุ่มหลัก เท่ากันทุกภาษา

**สิ่งที่ต่าง (flavor):** accent · ลวดลายพื้นหลัง · ของประกอบฉาก · ตราโลก · ลายมุมกรอบโลโก้ · คำบรรยายโลก

| โลก | ภาษา | อารมณ์ | ลวดลาย | ของประกอบ |
|-----|------|--------|--------|-----------|
| jungle | Python | เป็นมิตร สงบ เหมาะเริ่มต้น | เถาวัลย์/ใบไม้ | leaf, sprout, trees, compass |
| forge | C | เทคนิค แม่นยำ เป็นระบบ | ตาราง + ลายวงจร | cog, cpu, circuit-board, terminal |
| builder | HTML / CSS | สร้างสรรค์ ประกอบทีละชิ้น | โครงหน้าเว็บ | building/layout/hammer/ruler (HTML ส้ม · CSS น้ำเงิน) |
| energy | JavaScript | มีพลัง ตอบสนองไว | โหนดเชื่อมกัน + ประกายไฟ | zap, share-2, activity, sparkles |

- **`public/world-themes.js`** — แหล่งเดียวของรสทุกโลก: `LANGUAGE_THEME_MAP`, `PATTERNS`, `getLanguageTheme()`, `applyWorldTheme(el, lang)`, `LanguageThemeBanner()`, `QuestWorldDecoration()`, `decorateAccentCard()`
- `applyWorldTheme` ใส่ `data-world` + ตัวแปร `--w-accent / --w-ink / --w-soft / --w-line / --w-pattern` — CSS ของทุก component อ่านจากตัวแปรเท่านั้น ไม่มีสีภาษา hardcode
- ลวดลายเป็น SVG เล็กกว่า 1KB ต่อโลก (ไม่มีไฟล์ภาพ), ของประกอบไม่รับคลิก (`pointer-events:none`), ลดจำนวนบนจอเล็ก, ไม่มีแอนิเมชันเพิ่ม
- ใช้ที่: การ์ดภาษา · การ์ดผจญภัยต่อ · แผนที่ภารกิจ (+ แผงรายละเอียด) · แบนเนอร์หน้าบทเรียน · หัวการ์ดโจทย์ · ชิปภาษาในห้องแข่ง — ส่วนเมนู HUD อันดับ โปรไฟล์ คงเป็นระบบกลาง
- `tests/test-themes.js` ตรวจคอนทราสต์ของสีข้อความแต่ละโลก (WCAG AA ≥ 4.5:1 บนพื้นขาวและพื้นของโลก), ความครบของ config, ไอคอน และขนาดลวดลาย

## 🗺️ ไอคอนด่านบนแผนที่ภารกิจ (v23)

ไอคอนทุกหัวข้อมาจาก `public/stage-icons.js` (Lucide ชุดเดียว ขนาด 30px เส้น 2px เท่ากันทุกด่าน) แทนภาพประกอบหลายสไตล์เดิม
- `STAGE_ICON_MAP` — id หัวข้อ → ชื่อไอคอน (ครบทั้ง 56 หัวข้อของ 5 ภาษา)
- `STAGE_ICON_RULES` — กฎสำรองจับคู่จากชื่อหัวข้อ สำหรับหัวข้อใหม่ที่ยังไม่อยู่ใน map
- `DEFAULT_STAGE_ICON` (`circle-dot`) — เมื่อหาคู่ไม่เจอ
- `getStageIcon(topicOrTitle)` / `renderStageIcon(topic)` — ใช้ได้ทุกหน้า
- สีตามสถานะอยู่ใน CSS (`.stage-icon`): ปกติ = สีกลาง · ผ่านแล้ว = เขียว + เครื่องหมายถูก · กำลังเรียน = เหลืองพร้อมกรอบทอง · บทเรียน = เทา · บอส = ชมพู + ป้ายดาบ · `.locked` = จางและเป็นสีเทา (รองรับไว้ ระบบยังไม่มีการล็อกหัวข้อ)
- `tests/test-icons.js` ตรวจว่าทุกชื่อไอคอนที่โค้ดเรียกใช้มีอยู่จริง และทุกหัวข้อมีไอคอน

## 🎨 Icon Design System และ UI/UX (v22)

**หลักการ:** ไอคอน UI ใช้ **Lucide ชุดเดียว** · โลโก้ภาษาใช้ **Simple Icons** (โลโก้จริง + สีทางการจากแพ็กเกจ) · ไม่ใช้ emoji เป็นไอคอนหลัก · ทุกอย่างเป็นไฟล์ในโปรเจกต์ (ไม่ hotlink)

| ไฟล์ | หน้าที่ |
|------|---------|
| `tools/build-icons.js` | สร้าง `public/icon-data.js` และ `public/img/lang-*.svg` จากแพ็กเกจ (`npm run build:icons` เมื่อเพิ่ม/ลดไอคอน) — เลือกพื้นเข้มให้โลโก้สีอ่อน (C, JavaScript) อัตโนมัติจากค่าความสว่าง WCAG |
| `public/img/lang/*.png` | โลโก้ภาษาแบบหลายสี 192px (v33) — แทนที่ได้โดยวางไฟล์ชื่อเดิมแล้วรัน `npm run build:icons` |
| `public/icon-data.js` | ข้อมูลไอคอน + โลโก้ 5 ภาษา (ไฟล์ที่สร้างอัตโนมัติ commit ไว้แล้ว production ไม่ต้อง build) |
| `public/ui-kit.js` | Component กลาง: `AppIcon(name, {size, label})`, `LanguageIcon(lang, {box, logo})`, `AvatarFallback(name)` — ใช้ได้ทั้งเบราว์เซอร์และเซิร์ฟเวอร์ |
| `public/ui.js` | ปรับ UX แบบ incremental บนระบบเดิม (ไม่แตะตรรกะตรวจคำตอบ/EXP/การแข่งขัน) |
| `public/ICONS-LICENSES.md` | สัญญาอนุญาต Lucide (ISC) และ Simple Icons (CC0) + ข้อความเรื่องเครื่องหมายการค้า |

ใน `index.html` ใช้ `{{icon:ชื่อ|ขนาด}}` และ `{{lang:ภาษา|ขนาดกรอบ}}` — เซิร์ฟเวอร์แทนที่เป็น SVG ก่อนส่ง จึงเห็นไอคอนได้แม้ไม่รัน JavaScript

**Design tokens** (`:root` ใน `style.css`): spacing `--sp-*` (ฐาน 4px) · radius `--r-*` · shadow `--sh-1..3` · type scale `--fs-*` · icon size `--icon-*` · สีเชิงความหมาย `--c-primary / success / warning / error / muted` (muted ปรับให้คอนทราสต์ ≥ 4.5:1)

**สิ่งที่ปรับ:** การ์ดภาษา (โลโก้ในกรอบ 72px/โลโก้ 42px, ชื่อ, คำอธิบาย, ความคืบหน้า, สถานะพร้อมเล่น/เร็วๆ นี้, hover/selected/focus) · Navigation icon+text พร้อม `aria-current` และ bottom navigation บนมือถือ · หน้าโหลดใช้ข้อความกลางและ**ไม่บังแอประหว่างรอ Python** (ข้อความงูหลามแสดงเฉพาะตอนเล่น Python) · ปุ่มรันมี state Loading runtime / Ready / Running / Passed / Error · Editor: เลขบรรทัด, Tab/Shift+Tab, Ctrl/⌘+Enter, เต็มจอ, ยืนยันก่อนรีเซ็ต · Console vs Live Preview ตามภาษา · HUD เลเวล/EXP พร้อมแอนิเมชันเล็กๆ ที่ไม่ขยับ layout · ฟอร์ม: แสดง/ซ่อนรหัสผ่าน, เตือน Caps Lock, ตรวจอีเมล, สถานะกำลังส่ง/สำเร็จ · ห้องแข่ง: คัดลอกรหัส, ตัวพิมพ์ใหญ่อัตโนมัติ + วาง, stepper + slider, ป้ายโฮสต์, สถานะผู้เล่น, ชิปข้อมูลห้อง, แยกปุ่มปิดห้องเป็นโซนอันตราย · อันดับ: ไอคอนแทนเหรียญ emoji, skeleton ตอนโหลด, error + ปุ่มลองใหม่ · รูปประจำตัวเริ่มต้นเป็นอักษรแรกของชื่อ

## 🧭 หน้าแรกสำหรับทุกคน + โครงสร้าง HTML (v21)

**ปัญหาเดิม:** ทุกหน้าจอ (Login, Register, แดชบอร์ด, ห้องแข่ง, หน้าเกม) อยู่ใน HTML ไฟล์เดียวแล้วซ่อนด้วย CSS — เครื่องมือที่อ่าน HTML โดยไม่รัน JavaScript (search engine, เครื่องมือตรวจเว็บ, บางโปรแกรมอ่านหน้าจอ) จึงเห็นทุกอย่างปนกัน

**วิธีแก้:**
- หน้าจอของแอปทั้งหมดอยู่ใน `<template data-mount>` ซึ่งเบราว์เซอร์ไม่แสดงและไม่อ่าน จนกว่าสคริปต์เล็กๆ ท้ายหน้าจะเปิดใช้ (ก่อนสคริปต์อื่นทุกตัว) — HTML ดิบจึงเหลือเฉพาะหน้าแรก
- เซิร์ฟเวอร์ใส่ตัวเลขจริงลงหน้าแรกก่อนส่ง (`{{STAGES}}`, `{{VERSION}}`, จำนวนภารกิจของแต่ละดาว) จากข้อมูลคอร์สชุดเดียวกับเกม และส่ง `Cache-Control: no-cache` กันหน้าเก่าค้างหลัง deploy
- ภาพหน้าแรกเป็นไฟล์ `public/img/*.svg` พร้อม alt (เห็นได้แม้ไม่รัน JS) · meta description / Open Graph · `<noscript>` · landmark `<main>` เดียว
- Pyodide (~10MB) ย้ายไปโหลดท้ายหน้า — หน้าแรกแสดงผลทันทีโดยไม่ต้องรอ Python
- ผู้ใช้ที่ล็อกอินค้างไว้จะไม่เห็นหน้าแรกแวบก่อนเข้าแดชบอร์ด

**หน้าแรก:** Hero + CTA หลัก "เริ่มผจญภัย" / รอง "เข้าสู่ระบบ" / ลิงก์ "ทดลองเล่นโดยไม่สมัคร" · เล่นอย่างไร 3 ขั้น · ตัวอย่างภารกิจแรก · 5 ดาวเคราะห์พร้อมจำนวนภารกิจ · เหมาะกับใคร (นักเรียน / ครู / คนทั่วไป) · CTA ท้ายหน้า — ปุ่ม "เข้าสู่ระบบ" บนหัวเว็บซ่อนในหน้าแรกเพื่อไม่ให้ซ้ำ

**โหมดทดลองเล่น:** ใช้คำเดียวกันทุกที่ ("ทดลองเล่นโดยไม่สมัคร") กดแล้วเข้าแดชบอร์ดทันทีโดยไม่มี popup และมีป้าย "🧪 โหมดทดลองเล่น — ความคืบหน้าเก็บไว้ในเครื่องนี้เท่านั้น" พร้อมปุ่มสมัคร · คำเรียกหน่วยการเล่นใช้ "ภารกิจ" ทั้งระบบ

## 🚀 ธีม "นักสำรวจจักรวาลแห่งโค้ด" (v20)

- **หน้าแรก (Landing)** ภาพนักบินอวกาศเขียนโค้ด พร้อม CTA หลัก "เริ่มผจญภัย" (สมัคร), CTA รอง "เข้าสู่ระบบ" และลิงก์ "ทดลองเล่นโดยไม่สมัคร"
- **แดชบอร์ด** การ์ด "ผจญภัยต่อ" (เปิดภารกิจถัดไปได้ในคลิกเดียว), ภารกิจประจำวัน (ไม่ลงโทษถ้าไม่ได้เล่น), เหรียญรางวัล
- **5 ดาวเคราะห์** Python Planet · C Forge · HTML World · CSS Garden · JavaScript City พร้อมความคืบหน้าของแต่ละดาว
- **แผนที่ภารกิจ** เส้นทางคดเคี้ยวแบบเกม: ผ่านแล้ว / คุณอยู่ที่นี่ / บทเรียน / บอสท้ายดาว + แผงรายละเอียดด้านล่าง
- **หัวภารกิจ** ความยาก ★☆☆–★★★ (≤50 / 60–70 / ≥80 EXP), EXP, ป้ายด่านบอส (ด่านเขียนโค้ดสุดท้ายของหัวข้อ)
- **CodeBot** หุ่นยนต์ผู้ช่วยเปลี่ยนสีหน้าตามผลลัพธ์ และ**คำใบ้ 3 ขั้น** (คิดก่อน → โครงสร้างโดยซ่อนคำตอบ → แนวทางเต็ม) ด่านบอสให้แค่ 2 ขั้น
- **เหรียญรางวัล 13 แบบ** เช่น Hello World, Loop Master, No Hint Hero, Perfect Run, Boss Slayer, Galaxy Traveler — แจ้งเตือนเมื่อได้เหรียญใหม่
- **เลเวลอัป** บอกสิ่งที่ปลดล็อก · **ตัวละคร 12 แบบ + ของตกแต่ง 7 ชิ้น** ปลดล็อกตามเลเวล (เซิร์ฟเวอร์ตรวจเลเวลก่อนบันทึก)
- **ห้องแข่ง** ตั้งเวลา (5–30 นาที), เลือกความยาก, เปิด/ปิดคำใบ้ · ล็อบบี้แบบการ์ดตัวละคร · แจ้งเตือนคนเข้าห้อง · นับถอยหลัง 3-2-1 · แถบแข่งพร้อมจรวด · นาฬิกาอิงเวลาเซิร์ฟเวอร์ · ห้องปิดอัตโนมัติเมื่อหมดเวลา
- **กระดานอันดับ** โพเดียม 3 อันดับ + ตัวกรอง "สัปดาห์นี้ / ตลอดกาล" (อันดับรายสัปดาห์ให้ผู้เล่นใหม่มีโอกาส)
- **เสียงประกอบ** สังเคราะห์ด้วย WebAudio มีปุ่ม 🔊/🔇 ไม่มีเพลงเล่นอัตโนมัติ · เคารพการตั้งค่า "ลดการเคลื่อนไหว" ของระบบ
- ภาพทั้งหมดเป็น SVG ที่วาดเอง (`public/art.js`) — ไม่พึ่งไฟล์ภาพภายนอก

### ตรวจว่า Production เป็นเวอร์ชันล่าสุด
ท้ายทุกหน้ามีข้อความ "Code Quest · เวอร์ชันเนื้อหา N" และ `GET /api/version` ต้องได้เลขเดียวกัน ถ้าไม่ตรงหรือไม่เห็นข้อความนี้ แปลว่ายัง deploy ไม่ครบไฟล์

## 🔒 ความปลอดภัยและความน่าเชื่อถือของคะแนน (v19)

แก้ตามผลรีวิว P0 ทั้งหมด — ทดสอบด้วย `tests/e2e-security.js` (27 กรณี ยิง API จริง)

**EXP และคะแนนห้องแข่ง — เซิร์ฟเวอร์เป็นผู้ตัดสิน**
- client ส่งมาแค่ `stageId` + **หลักฐาน** (โค้ดหรือคำตอบข้อสอบ) เซิร์ฟเวอร์ตรวจซ้ำเองด้วย `verify.js` ซึ่งโหลดตัวตรวจชุดเดียวกับหน้าเกม: ข้อสอบทฤษฎี (gradeQuestion), ภาษา C (รันด้วย CRUN + ตรวจย่อหน้า), HTML/CSS (jsdom แบบปิดสคริปต์) — ครอบคลุม **232 ด่าน**
- Python และ JavaScript ต้องรันโค้ดผู้เรียน ซึ่งไม่ปลอดภัยที่จะรันบนเซิร์ฟเวอร์โดยไม่มี sandbox จึงยังตรวจฝั่ง browser (ผลตอบกลับมี `verified: false`) — ความเสียหายจำกัดเพราะค่า EXP มาจากตารางฝั่งเซิร์ฟเวอร์และแต่ละด่านได้ครั้งเดียว
- ค่า EXP/คะแนนที่ client ส่งมาถูกเพิกเฉยทั้งหมด · กัน EXP ซ้ำด้วย PRIMARY KEY + transaction + `FOR UPDATE` (ยิงพร้อมกัน 5 ครั้งได้ครั้งเดียว)
- ห้องแข่ง: เวลาเริ่ม คะแนน โบนัสความเร็ว และลำดับ คิดจากฝั่งเซิร์ฟเวอร์ทั้งหมด

**เวอร์ชันหน้าเกม/เซิร์ฟเวอร์** — หน้าเกมส่ง `X-CQ-Version` ทุกคำขอ ถ้าไม่ตรง (หรือหน้าเกมเก่าค้างใน cache) เซิร์ฟเวอร์ตอบ 409 และไม่บันทึกข้อมูล ผู้ใช้เห็นแค่ "ระบบกำลังอัปเดต กรุณารีเฟรช" ส่วนรายละเอียดอยู่ใน console และ log เซิร์ฟเวอร์ ความคืบหน้าระหว่างนั้นเก็บในเครื่องแล้วส่งภายหลัง

**บัญชีผู้ใช้**
- รหัสผ่านขั้นต่ำ **10 ตัว** (ตั้งได้ด้วย env `MIN_PASSWORD_LENGTH`) สูงสุด 128 ปฏิเสธรหัสยอดนิยม/ตัวซ้ำ/มีชื่ออีเมล รองรับภาษาไทย การวาง และ password manager (`autocomplete` ถูกต้องทั้งสองแท็บ) — หมายเหตุ: NIST SP 800-63B แนะนำ 15 ตัวสำหรับระบบที่ไม่มี MFA เลือก 10 เพื่อให้เหมาะกับนักเรียน ปรับเพิ่มได้ทาง env
- bcrypt · cookie `HttpOnly` + `SameSite=Lax` + `Secure` (อัตโนมัติเมื่อรันบน Railway/production)
- **Rate limit**: เข้าสู่ระบบ 8 ครั้ง/นาที ต่อ IP+อีเมล (รวมไม่เกิน 120/นาที ต่อ IP), สมัคร 40 ครั้ง/10 นาที ต่อ IP, สร้างห้อง 20/10 นาที, เข้าห้อง 120/นาที, ส่งคำตอบ 60/นาที — ตั้งค่าให้ห้องเรียนที่ใช้ IP เดียวกันทั้งห้อง (NAT) ใช้งานได้ ตอบ 429 พร้อม `Retry-After`

**ห้องแข่งขัน** — เซิร์ฟเวอร์ออก `hostToken` (สิทธิ์โฮสต์) และ `memberToken` (ตัวตนผู้เล่น) แยกกันแบบสุ่ม 192 บิต ส่งผ่าน header (`X-Host-Token`, `X-Room-Token`) ไม่อยู่ใน URL และไม่ถูกส่งให้ผู้เล่นคนอื่น · เริ่มได้เมื่อมีผู้เล่นอย่างน้อย 2 คน · **เชื่อมต่อใหม่** ด้วย token เดิมเมื่อ Wi-Fi หลุดโดยคะแนนไม่หาย

**ชื่อผู้เล่น (กัน XSS)** — เซิร์ฟเวอร์ตัดอักขระควบคุมและ `< >` และหน้าเว็บแสดงชื่อด้วย `textContent` เท่านั้น (แก้จุดที่กระดานห้องแข่งเคยใช้ innerHTML)

**Guest → บัญชี** — ผู้เยี่ยมชมเล่นได้และความคืบหน้าเก็บในเครื่อง (อยู่รอดแม้รีเฟรช) เมื่อสมัคร/ล็อกอินจะถาม "นำเข้าบัญชีไหม" แล้วส่งหลักฐานของทุกด่านให้เซิร์ฟเวอร์ตรวจซ้ำ ด่านที่ปลอมคำตอบจะไม่ถูกนำเข้า

**การเข้าถึง** — overlay เป็น `role="dialog"` + `aria-modal` · dialog ที่ปิดอยู่เป็น `inert` + `aria-hidden` (Tab เข้าไม่ได้ โปรแกรมอ่านหน้าจอไม่อ่าน) · เปิดแล้วโฟกัสย้ายเข้าและวนอยู่ใน dialog · Esc ปิดได้ · focus ring ชัดเจน · ปุ่มบนมือถือสูงอย่างน้อย 44px

## 📝 แบบทดสอบทฤษฎี (ทุกหัวข้อ ทุกภาษา)

ทุกหัวข้อในทั้ง 5 คอร์สมี**แบบทดสอบทฤษฎี**ท้ายหัวข้อ รวม **57 ชุด 285 ข้อ** ใน 4 รูปแบบ:

| รูปแบบ | จำนวน | ลักษณะ |
|--------|------|--------|
| ปรนัย | 142 | เลือกคำตอบที่ถูกจาก 4 ตัวเลือก |
| ถูก / ผิด | 60 | ตัดสินข้อความ มักเป็นความเข้าใจผิดที่พบบ่อย |
| เติมคำ | 57 | พิมพ์คำตอบ (ไม่สนตัวพิมพ์เล็ก-ใหญ่และช่องว่าง รองรับคำตอบหลายแบบ) |
| เรียงลำดับ | 26 | กดลูกศรเรียงขั้นตอน เช่น ขั้นตอนพัฒนาโปรแกรม |

ตอบผิดได้ไม่จำกัด ทุกข้อมีคำอธิบายเหตุผลเมื่อส่งคำตอบ ต้องถูกครบทุกข้อจึงผ่าน — ข้อสอบกำหนดในด่านด้วย `quiz: [...]` แทนโค้ด และถูกสุ่มเข้าห้องแข่งขันได้ด้วย

## 🖥️ เครื่องเสมือน (Virtual Machine) สำหรับหัวข้อปฏิบัติที่ซับซ้อน

หัวข้อที่เบราว์เซอร์ทำไม่ได้โดยตรง ถูกแปลงจาก "บทเรียนอ่านอย่างเดียว" เป็น**ด่านเขียนโค้ดจริง**ด้วย `public/vm.js`:

- **Tkinter จำลอง** (หัวข้อ GUI, 8 ด่าน) — โมดูล tkinter เขียนด้วย Python ล้วน ติดตั้งเข้า Pyodide เขียนโค้ดเหมือนบนเครื่องจริง แล้ว**หน้าต่างโปรแกรมปรากฏในเกม กดปุ่มและพิมพ์ได้จริง** (เรียก command กลับเข้า Python) รองรับ Label, Button, Entry, Text, Listbox, Checkbutton, Radiobutton, Scale, Canvas, Frame/LabelFrame, messagebox, ttk และตัวจัดวาง pack/grid/place — ตอนตรวจคำตอบระบบพิมพ์และกดปุ่มให้อัตโนมัติตาม `vmInput` / `vmClick` ของด่าน
- **ระบบไฟล์เสมือน** (หัวข้อจัดการไฟล์, 5 ด่าน) — open/read/write/append/with/csv ทำงานจริง ด่านเตรียมไฟล์ตั้งต้นได้ด้วย `files: {...}`
- **ฐานข้อมูลเสมือน SQLite** (หัวข้อฐานข้อมูล, 5 ด่าน) — CREATE/INSERT/SELECT/UPDATE/DELETE และการป้องกัน SQL Injection ด้วย `?` (โหลด sqlite3 อัตโนมัติด้วย `loadPackagesFromImports`)
- ด่านปฏิบัติเพิ่มในหัวข้อ Web Scraping (html.parser), API (json, จำลอง endpoint, assert-based test) และ Data Science (statistics, ทำความสะอาดข้อมูล, linear regression คำนวณเอง)

ตัวจำลองเป็น Python ธรรมดา จึงทดสอบด้วย python3 จริงในชุดทดสอบได้ด้วย

## 🏁 โหมดห้องแข่งขัน (Competition Room)

ให้นักเรียนทั้งห้อง (หรือใครก็ได้) แข่งเขียนโค้ดพร้อมกันแบบเรียลไทม์

**วิธีใช้:** โฮสต์กดแท็บ **แข่งขัน** → เลือกภาษาที่จะออกสอบและจำนวนข้อ (3–30) → ได้**รหัสห้อง 5 ตัวอักษร** → ผู้เล่นใส่ชื่อกับรหัสเพื่อเข้าร่วม (**ไม่ต้องล็อกอิน** เหมาะกับการใช้ในห้องเรียน) → โฮสต์กดเริ่ม ทุกคนถูกพาเข้าโจทย์ชุดเดียวกันพร้อมกันอัตโนมัติ

**กติกาและการคิดคะแนน (คำนวณฝั่งเซิร์ฟเวอร์ กันโกง):**
- โจทย์สุ่มจากคลังทั้งเกม เรียงจากง่ายไปยาก ทุกคนในห้องได้ชุดเดียวกัน
- คะแนน = XP ของด่าน **+ โบนัสความเร็ว** (สูงสุด 50% ลดลงเรื่อยๆ จนหมดใน 15 นาที)
- ส่งข้อเดิมซ้ำไม่ได้คะแนนเพิ่ม และคนนอกห้องส่งคะแนนไม่ได้
- **กระดานคะแนนสด** อัปเดตทุก 2.5 วินาที เห็นอันดับ จำนวนข้อที่ทำได้ และใครจบแล้ว
- โฮสต์เท่านั้นที่เริ่ม/ปิดห้องได้ เมื่อทุกคนทำครบห้องจะปิดและประกาศผลอัตโนมัติ

**API:** `POST /api/rooms` (สร้าง) · `POST /api/rooms/:code/join` · `GET /api/rooms/:code` (สถานะ+กระดาน) · `POST /api/rooms/:code/start` · `POST /api/rooms/:code/solve` · `POST /api/rooms/:code/end` — เก็บข้อมูลในตาราง `rooms` และ `room_members`

## คอร์ส Web Developer (ใหม่!)

3 คอร์สสำหรับสายเว็บ รวม **25 หน่วย 154 ด่าน** — รันในเบราว์เซอร์ได้โดยตรง มี**พรีวิวหน้าเว็บสด** (iframe) ใต้ช่องเขียนโค้ด และตรวจคำตอบจาก **DOM + computed style** ไม่ใช่การเทียบข้อความ (ตัวรัน/ตัวตรวจอยู่ใน `public/web-run.js`)

| คอร์ส | หน่วย | ด่าน | เนื้อหา |
|------|------|------|---------|
| **HTML5** | 8 | 48 | โครงสร้างเอกสาร/แท็ก/attribute, ข้อความและ entity, ลิสต์และลิงก์, รูปภาพ/วิดีโอ/iframe, ตาราง (colspan/rowspan), ฟอร์มครบทุก input + validation, Semantic HTML + meta SEO, ขั้นสูง (data-*, aria-label, details) |
| **CSS3** | 8 | 47 | ไวยากรณ์/selector/inheritance, สีและตัวอักษร, Box Model, selector ขั้นสูง (nth-child, ::after, specificity), Flexbox, Grid, position/z-index, ขั้นสูง (ตัวแปร CSS, gradient, transition, @keyframes, media query) |
| **JavaScript** | 9 | 55 | พื้นฐาน/let-const/typeof, ตัวดำเนินการและเงื่อนไข, ลูป, ฟังก์ชัน/arrow/callback, อาร์เรย์ (map/filter/reduce), ออบเจ็กต์/destructuring/spread, DOM, Event + ฟอร์ม, ขั้นสูง (JSON, try-catch, async/await, class) |

ด่านหมวด Event ระบบจะ**กดปุ่มหรือส่งฟอร์มให้จริง**แล้วตรวจว่า DOM เปลี่ยนถูกต้องไหม เมื่อเรียนจบทั้งสามคอร์สจะสร้างเว็บไซต์ที่มีโครงสร้าง สไตล์ และการโต้ตอบได้ครบด้วยตัวเอง

## ชุดทดสอบ (tests/)

รันทั้งหมดด้วย `node tests/run-all.js` — ทดสอบเฉลยอ้างอิงของทุกด่านกับตัวตรวจจริง พร้อมเทสต์เชิงลบ (starter ที่ยังไม่แก้ต้องไม่ผ่าน) และตรวจว่า XP ฝั่งเกมตรงกับตารางฝั่งเซิร์ฟเวอร์

- `test-py.js` (108 ด่าน — รันด้วย python3 จริง รวมด่านเครื่องเสมือน: ไฟล์ / Tkinter / SQLite)
- `test-c.js` (78 ด่าน — รันผ่านตัวแปล CRUN + ตรวจการย่อหน้า)
- `test-web.js` (154 ด่าน — เรนเดอร์ด้วย jsdom แล้วตรวจ DOM/สไตล์)
- `test-quiz.js` (57 ชุด 285 ข้อ — ตรวจโครงสร้างและยืนยันกับตัวตรวจคำตอบตัวจริงของเกม)
- `test-verify.js` (232 ด่าน — ตรวจคำตอบฝั่งเซิร์ฟเวอร์: เฉลยผ่าน, starter/คำตอบผิดไม่ผ่าน)
- `e2e-security.js` (27 กรณี — ต้องรันเซิร์ฟเวอร์ก่อน: `BASE=http://localhost:3000 npm run test:e2e`)

## คอร์สภาษา C (ใหม่!)

10 หน่วยตามหลักสูตร รวม 75 ด่าน — รันด้วย **ตัวแปลภาษา C ย่อส่วน** (`public/c-interp.js`) ที่เขียนขึ้นเองใน JavaScript จำลองหน่วยความจำจริง ทำให้พอยน์เตอร์ / อาร์เรย์ / scanf ทำงานเหมือน C แท้ๆ โดยไม่ต้องมีคอมไพเลอร์:

| หน่วย | เนื้อหา | ด่าน |
|------|---------|------|
| 1 | แนะนำภาษาซี (Introduction to C) — ประวัติ, ขั้นตอนพัฒนา, โครงสร้าง 3 ส่วน, คอมเมนต์, กฎการตั้งชื่อ (ตรงกับบทที่ 1 ในหนังสือ) | 8 |
| 2 | โปรแกรม Visual Studio 2022 | 6 |
| 3 | แนวคิดในการเขียนโปรแกรม (Concept of Programming) — 5 ขั้นตอนพัฒนา, ซูโดโค้ด/โฟลวชาร์ต, ตัวอย่างที่ 3.1-3.5 + แบบฝึกหัดท้ายหน่วย (ตรงกับบทที่ 4 ในหนังสือ) | 8 |
| 4 | ตัวแปรกับชนิดของข้อมูล (Variables and Data Types) | 7 |
| 5 | โอเปอเรเตอร์และการดำเนินการ (Operators) | 7 |
| 6 | การรับและแสดงผลข้อมูล (Input/Output) | 8 |
| 7 | คำสั่งควบคุม (Control Statements) | 10 |
| 8 | อาร์เรย์ (Array) | 7 |
| 9 | พอยน์เตอร์ (Pointers) | 6 |
| 10 | ฟังก์ชัน (Functions) | 8 |

ในคอร์ส C ผู้เรียน**พิมพ์เองทั้งหมดตั้งแต่ `#include <stdio.h>`** (ถ้าลืมจะ error เหมือนคอมไพเลอร์จริง) และระบบ**บังคับการย่อหน้า (indent) ให้ตรงระดับปีกกา** — โปรแกรมที่ผลลัพธ์ถูกแต่ย่อหน้ามั่วจะยังไม่ผ่านด่าน มีตัวช่วยย่อหน้าอัตโนมัติในช่องพิมพ์โค้ด (Enter สืบทอดย่อหน้า/เพิ่มหลัง `{`, พิมพ์ `}` ถอยย่อหน้าให้เอง) และหน่วยที่ 3, 7 มี**ด่านอ่านผังงานสัญลักษณ์** (Flowchart SVG) ให้แปลงเป็นโค้ด C

ตัวแปลรองรับ: int/float/double/char, printf (%d %f %.2f %c %s), scanf (+&), if/else, switch-case, for/while/do-while, break/continue, อาร์เรย์ 1 มิติ, พอยน์เตอร์ (& * เลขคณิตพอยน์เตอร์), ฟังก์ชัน/recursion, ++/--, casting, คอมเมนต์ และแจ้ง error เป็นภาษาไทย (เช่น ลืม ; / ลืม & / ลูปไม่จบ)

ทุกหัวข้อมี **บทเรียน** ให้อ่านก่อนเริ่มทำแบบฝึกหัด (กดเข้าหัวข้อจะเจอบทเรียนก่อน และในหน้าเล่นเกมมีปุ่ม "ทบทวนบทเรียน")

ฟีเจอร์อื่น:

- **อัปโหลดรูปโปรไฟล์** — ผู้เล่นเลือกรูปจากเครื่องได้ในหน้าโปรไฟล์ ระบบย่อรูปเป็นสี่เหลี่ยมจัตุรัสในเบราว์เซอร์ก่อนส่ง (เก็บเป็น data URL ในคอลัมน์ `avatar`) แสดงที่หัวมุมขวาบน
- **ภาษา C พิมพ์เองตั้งแต่ `#include <stdio.h>`** — starter ของด่าน C ส่วนใหญ่ให้เริ่มจากว่าง (ยกเว้นด่านแก้บั๊ก) ตัวแปลบังคับต้องมี `#include <stdio.h>` เมื่อใช้ printf/scanf และ**ตรวจการย่อหน้า** (indentation) ให้ตรงระดับปีกกา ถ้าย่อหน้าไม่เรียบร้อยจะยังไม่ผ่านด่าน พร้อมตัวช่วยย่อหน้าอัตโนมัติในช่องพิมพ์โค้ด
- **ผังงานเป็นแผนภาพจริง** — หัวข้อ Flowchart ใช้แผนภาพ SVG สัญลักษณ์มาตรฐาน (วงรีเริ่ม/จบ, สี่เหลี่ยมประมวลผล, สี่เหลี่ยมด้านขนานแสดงผล, ข้าวหลามตัดตัดสินใจ, หกเหลี่ยมวนลูป) พร้อมตารางสัญลักษณ์ในบทเรียน — วาดด้วยโมดูล `FC` ใน game.js เพิ่มด่านใหม่ได้โดยเขียนสเปกสั้นๆ
- **โหมดป้อนข้อมูลเอง** — ปุ่ม "⌨ ป้อนเอง" ในหน้าเล่น รันโค้ดโดยให้ผู้เล่นพิมพ์ค่า input() เองผ่านกล่องของเบราว์เซอร์ (โหมดทดลอง ไม่ตรวจคำตอบ/ไม่ได้ EXP ส่วนปุ่มรันปกติใช้ค่าจำลองเพื่อตรวจแม่นยำ)
- **หน้าแผนที่ด่าน (ธีมสว่าง)** — UI ใหม่โทนม่วง: แถบแท็บ เรียน/อันดับ/โปรไฟล์, ชิปสถิติ EXP·เลเวล·ด่าน, การ์ดหัวข้อ และเส้นทางด่านแบบคดเคี้ยว (โหนดบทเรียน → โหนดด่าน, ติ๊กถูกเมื่อผ่าน, โหนดปัจจุบันมีวงแหวนความคืบหน้า)
- **จำลองการป้อนข้อมูล (input)** — ด่านที่ใช้ input() จะกำหนดค่าที่ระบบป้อนให้ (ฟิลด์ `stdin` ของด่าน) เกมจะสวม input() เวอร์ชันพิเศษให้อ่านค่าตามลำดับ ตรวจคำตอบได้แม่นยำแบบ online judge
- **คำใบ้แบบต้องพยายามก่อน** — คำใบ้ถูกล็อกไว้ จะปลดล็อกเมื่อรันไม่ผ่าน 2 ครั้งในด่านนั้น
- **ไอคอนกราฟิก SVG** — การ์ดภาษา/หัวข้อใช้ภาพวาดเวกเตอร์ฝังในไฟล์ ไม่พึ่งอิโมจิ
- **Leaderboard** (`GET /api/leaderboard`) — จัดอันดับตามเลเวลและ EXP สะสมรวมทุกเลเวล พร้อมแถบเปรียบเทียบกับอันดับ 1 และอันดับของตัวเอง
- **แก้ไขโปรไฟล์** (`POST /api/profile`) — เปลี่ยนชื่อผู้เล่น และเปลี่ยนรหัสผ่าน (ต้องยืนยันรหัสผ่านเดิม)
- **กัน EXP ซ้ำ** — ด่านที่ผ่านแล้ว เล่นซ้ำได้แต่ไม่ได้ EXP เพิ่ม (เซิร์ฟเวอร์เป็นคนตัดสิน ฝั่งเบราว์เซอร์โกงไม่ได้)
- **เช็คเวอร์ชัน** (`GET /api/version`) — ถ้าหน้าเกมกับเซิร์ฟเวอร์คนละเวอร์ชัน จะมีแถบเตือนบนจอทันที (เวอร์ชันปัจจุบัน: 4)
- **ไอคอนกราฟิก SVG** — ภาพประจำหัวข้อวาดด้วย SVG ในไฟล์เดียว ไม่ต้องโหลดรูปจากภายนอก

### วิธีเพิ่มเนื้อหา

- **เพิ่มด่าน/หัวข้อ:** แก้ `COURSES` ใน `public/index.html` และเพิ่มค่า XP ให้ตรงกันใน `STAGE_XP` ที่ `server.js` (สองที่นี้ต้องตรงกันเสมอ)
- **เพิ่มภาษาใหม่:** เพิ่ม key ใหม่ใน `COURSES` และ `STAGE_XP` — ตอนนี้หน้าเลือกภาษาจะแสดงเฉพาะภาษาที่พร้อมเล่น ภาษาที่กำลังพัฒนาไม่ถูกเปิดเผยให้ผู้เล่นเห็น

> ℹ️ ถ้าเคย deploy เวอร์ชันก่อนหน้า (progress ไม่มีคอลัมน์ topic) เซิร์ฟเวอร์จะ
> สร้างตาราง progress ใหม่ให้อัตโนมัติตอนเริ่มทำงาน (ข้อมูลด่านที่ผ่านเดิมจะถูกล้าง แต่ XP/Level ยังอยู่)

## แผนพัฒนาต่อ

- [ ] เพิ่มภาษาโปรแกรมภาษาถัดไป (ความลับ 🤫)
- [ ] Badge / achievement รายหัวข้อ
- [ ] ล็อกอินด้วย GitHub OAuth
