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

ลำดับการเล่น: **ล็อกอิน → เลือกภาษา → เลือกหัวข้อ → เล่นด่านในหัวข้อ**

หัวข้อของคอร์ส Python (24 ด่าน):

| # | หัวข้อ | จำนวนด่าน |
|---|--------|-----------|
| 1 | คำสั่ง Print | 3 |
| 2 | ตัวแปร (Variable) | 3 |
| 3 | โครงสร้างข้อมูล (List / Dict) | 3 |
| 4 | ตัวดำเนินการ (Operator) | 3 |
| 5 | เงื่อนไข If-Else | 3 |
| 6 | ลูป For / While | 4 |
| 7 | Flowchart สู่โค้ด | 2 |
| 8 | ฟังก์ชัน (Function) | 3 |

### วิธีเพิ่มเนื้อหา

- **เพิ่มด่าน/หัวข้อ:** แก้ `COURSES` ใน `public/index.html` และเพิ่มค่า XP ให้ตรงกันใน `STAGE_XP` ที่ `server.js` (สองที่นี้ต้องตรงกันเสมอ)
- **เพิ่มภาษาใหม่:** เพิ่ม key ใหม่ใน `COURSES` และ `STAGE_XP` — JavaScript รันในเบราว์เซอร์ได้เลยโดยไม่ต้องใช้ Pyodide

> ℹ️ ถ้าเคย deploy เวอร์ชันก่อนหน้า (progress ไม่มีคอลัมน์ topic) เซิร์ฟเวอร์จะ
> สร้างตาราง progress ใหม่ให้อัตโนมัติตอนเริ่มทำงาน (ข้อมูลด่านที่ผ่านเดิมจะถูกล้าง แต่ XP/Level ยังอยู่)

## แผนพัฒนาต่อ

- [ ] เพิ่มภาษา JavaScript (รันใน browser ได้เลย ไม่ต้องใช้ Pyodide)
- [ ] Leaderboard จัดอันดับ EXP
- [ ] Badge / achievement รายหัวข้อ
- [ ] ล็อกอินด้วย GitHub OAuth
