/* เฉลยและคำตอบผิดของหลักสูตร Python v2 — คำตอบผิดต้องไม่ผ่านอย่างน้อยหนึ่งกรณีเสมอ (ตรวจด้วย tests/test-py2.js) */
const R = String.raw;
module.exports = {
  // ── Stage 1: ยินดีต้อนรับสู่ Python ──
  "py2-welcome/0": { sol: R`print("สวัสดี Python!")
`, wrong: [R`print("สวัสดี Python")
`] },
  "py2-welcome/1": { sol: R`print("เมนูวันนี้")
print("1. ลาเต้ 55")
print("2. ชาเย็น 45")
`, wrong: [R`print("เมนูวันนี้", "1. ลาเต้ 55", "2. ชาเย็น 45")
`] },
  "py2-welcome/2": { sol: R`print("Hello")
print('Bye')
`, wrong: [R`print("Hello")
print('Bye")
`] },
  "py2-welcome/3": { sol: R`print("เริ่มต้น")
print("อายุ", 15)
`, wrong: [R`print("เริ่มต้น")
print("อายุ" + "15")
`] },
  "py2-welcome/4": { sol: R`print("=" * 20)
print("  Code Quest Python")
print("=" * 20)
`, wrong: [R`print("=" * 20)
print("Code Quest Python")
print("=" * 20)
`, R`print("=" * 2)
print("  Code Quest Python")
print("=" * 20)
`] },
  // ── Stage 2: ตัวแปรและการผูกชื่อ ──
  "py2-names/0": { sol: R`item = "ปากกา"
price = 12
print(item, "ราคา", price, "บาท")
`, wrong: [R`item = "ปากกา"
price = 12
print(item, "ราคา", price)
`] },
  "py2-names/1": { sol: R`score = 88
print("คะแนน", score)
`, wrong: [R`score = 88
print("คะแนน", "score")
`] },
  "py2-names/2": { sol: R`left = "แอปเปิล"
right = "ส้ม"
left, right = right, left
print("ซ้าย:", left, "ขวา:", right)
`, wrong: [R`left = "แอปเปิล"
right = "ส้ม"
left = right
right = left
print("ซ้าย:", left, "ขวา:", right)
`] },
  "py2-names/3": { sol: R`second_place = "B"
grade = "A"
first_name = "C"
print(second_place, grade, first_name)
`, wrong: [R`second_place = "B"
grade = "A"
first_name = "C"
print(grade, second_place, first_name)
`] },
  "py2-names/4": { sol: R`price = 200
VAT_RATE = 0.07
print("ราคารวมภาษี", price * (1 + VAT_RATE))
`, wrong: [R`price = 200
VAT_RATE = 0.07
print("ราคารวมภาษี", price * VAT_RATE)
`] },
  "py2-names/5": { sol: R`visitors = 0
visitors = visitors + 1
visitors = visitors + 1
visitors = visitors + 1
print("ผู้เข้าชม", visitors, "คน")
`, wrong: [R`visitors = 0
visitors = visitors + 1
print("ผู้เข้าชม", visitors, "คน")
`] },
  // ── Stage 3: ชนิดข้อมูลพื้นฐาน ──
  "py2-types/0": { sol: R`print(type(42).__name__)
print(type(3.14).__name__)
print(type("Python").__name__)
print(type(False).__name__)
print(type(None).__name__)
`, wrong: [R`print(type(42).__name__)
print(type(3.14).__name__)
print(type("Python").__name__)
print(type(False).__name__)
print(type("None").__name__)
`] },
  "py2-types/1": { sol: R`a = 3
b = 3.0
c = "3"
print(isinstance(a, int), isinstance(b, int), isinstance(c, int))
`, wrong: [R`a = 3
b = 3.0
c = "3"
print(isinstance(a, int), isinstance(b, float), isinstance(c, int))
`] },
  "py2-types/2": { sol: R`total = 100 + 50
print("รวม", total, "บาท")
`, wrong: [R`total = 100 + 50
print("รวม", "total", "บาท")
`] },
  "py2-types/3": { sol: R`print(10 / 2)
print(7 / 2)
print(type(10 / 2).__name__)
`, wrong: [R`print(10 // 2)
print(7 / 2)
print(type(10 // 2).__name__)
`] },
  "py2-types/4": { sol: R`print(True + True, isinstance(True, int), False * 10)
`, wrong: [R`print(True and True, isinstance(True, int), False * 10)
`] },
  "py2-types/5": { sol: R`print("5" * 3, 5 * 3)
print(type("5").__name__, type(5).__name__)
`, wrong: [R`print("5" * 3, "5" * 3)
print(type("5").__name__, type(5).__name__)
`] },
  // ── Stage 4: รับและแสดงผล ──
  "py2-io/0": { sol: R`name = input()
print(f"สวัสดี {name} ยินดีต้อนรับ")
`, wrong: [R`name = input()
print("สวัสดี" + name + " ยินดีต้อนรับ")
`] },
  "py2-io/1": { sol: R`a = int(input())
b = int(input())
print("ผลรวม", a + b)
`, wrong: [R`a = float(input())
b = float(input())
print("ผลรวม", a + b)
`] },
  "py2-io/2": { sol: R`a = input()
b = input()
c = input()
print(a, b, c, sep="-", end="!")
print()
`, wrong: [R`a = input()
b = input()
c = input()
print(a, b, c, sep="- ", end="!")
print()
`] },
  "py2-io/3": { sol: R`price = float(input())
qty = int(input())
print(f"รวม {price * qty:.2f} บาท")
`, wrong: [R`price = float(input())
qty = int(input())
print(f"รวม {round(price * qty, 2)} บาท")
`] },
  "py2-io/4": { sol: R`name = input()
score = int(input())
print(f"|{name:<10}|{score:>4}|")
`, wrong: [R`name = input()
score = int(input())
print(f"|{name:>10}|{score:>4}|")
`, R`name = input()
score = int(input())
print(f"|{name[:10]:<10}|{score:>4}|")
`] },
  "py2-io/5": { sol: R`n = int(input())
print(f"{n:,}")
`, wrong: [R`n = int(input())
print(f"{n:,.2f}")
`] },
  "py2-io/6": { sol: R`km = float(input())
miles = km * 0.621371
meters = km * 1000
print(f"{km:.2f} กม. = {miles:.2f} ไมล์ = {meters:,.0f} เมตร")
`, wrong: [R`km = float(input())
miles = km / 0.621371
meters = km * 1000
print(f"{km:.2f} กม. = {miles:.2f} ไมล์ = {meters:,.0f} เมตร")
`] },
  // ── Stage 5: ตัวดำเนินการ ──
  "py2-ops/0": { sol: R`amount = int(input())
ten = amount // 10
rest = amount % 10
five = rest // 5
one = rest % 5
print(f"10: {ten} · 5: {five} · 1: {one}")
`, wrong: [R`amount = int(input())
ten = amount // 10
five = amount // 5
one = amount % 5
print(f"10: {ten} · 5: {five} · 1: {one}")
`] },
  "py2-ops/1": { sol: R`seconds = int(input())
h = seconds // 3600
m = seconds % 3600 // 60
s = seconds % 60
print(f"{h}:{m:02d}:{s:02d}")
`, wrong: [R`seconds = int(input())
h = seconds // 3600
m = seconds // 60
s = seconds % 60
print(f"{h}:{m:02d}:{s:02d}")
`] },
  "py2-ops/2": { sol: R`a = int(input())
b = int(input())
average = (a + b) / 2
print("เฉลี่ย", average)
`, wrong: [R`a = int(input())
b = int(input())
average = (a + b) // 2
print("เฉลี่ย", average)
`] },
  "py2-ops/3": { sol: R`score = int(input())
print(0 <= score <= 100)
`, wrong: [R`score = int(input())
print(0 < score < 100)
`] },
  "py2-ops/4": { sol: R`word = input()
part = input()
print(part in word)
`, wrong: [R`word = input()
part = input()
print(word in part)
`] },
  "py2-ops/5": { sol: R`role = input()
print(role == "admin")
`, wrong: [R`role = input()
print("admin" in role)
`] },
  "py2-ops/6": { sol: R`total = 0
total += int(input())
total += int(input())
total += int(input())
print(f"รวม {total}")
`, wrong: [R`total = 0
total = int(input())
total = int(input())
total += int(input())
print(f"รวม {total}")
`] },
  // ── Stage 6: การแปลงชนิดข้อมูล ──
  "py2-convert/0": { sol: R`points = int(input())
print("ได้ " + str(points * 2) + " แต้ม")
`, wrong: [R`points = int(input())
print("ได้ " + str(points) * 2 + " แต้ม")
`] },
  "py2-convert/1": { sol: R`n = int(float(input()))
print("จำนวนเต็ม", n)
`, wrong: [R`n = round(float(input()))
print("จำนวนเต็ม", n)
`] },
  "py2-convert/2": { sol: R`text = input()
print(bool(text), text == "True")
`, wrong: [R`text = input()
print(text == "True", text == "True")
`] },
  "py2-convert/3": { sol: R`import math

a = float(input())
b = float(input())
target = float(input())
print(math.isclose(a + b, target))
`, wrong: [R`a = float(input())
b = float(input())
target = float(input())
print(round(a + b) == round(target))
`] },
  "py2-convert/4": { sol: R`x = float(input())
print(round(x), f"{x:.0f}")
`, wrong: [R`x = float(input())
print(int(x + 0.5), f"{x:.0f}")
`] },
  "py2-convert/5": { sol: R`name = input()
price = float(input())
qty = int(input())
discount = int(input())
net = price * qty * (100 - discount) / 100
print(f"สินค้า: {name}")
print(f"ราคา: {price:,.2f} x {qty}")
print(f"ส่วนลด: {discount}%")
print(f"สุทธิ: {net:,.2f} บาท")
`, wrong: [R`name = input()
price = float(input())
qty = int(input())
discount = int(input())
net = price * qty - discount
print(f"สินค้า: {name}")
print(f"ราคา: {price:,.2f} x {qty}")
print(f"ส่วนลด: {discount}%")
print(f"สุทธิ: {net:,.2f} บาท")
`, R`name = input()
price = float(input())
qty = int(input())
discount = int(input())
net = price * qty * (100 - discount) / 100
print(f"สินค้า: {name}")
print(f"ราคา: {price:.2f} x {qty}")
print(f"ส่วนลด: {discount}%")
print(f"สุทธิ: {net:.2f} บาท")
`] },

  // ── Stage 7: เงื่อนไขและตรรกะ ──
  "py2-if/0": { sol: R`score = int(input())
if score >= 50:
    print("ผ่าน")
else:
    print("ไม่ผ่าน")
`, wrong: [R`score = int(input())
if score > 50:
    print("ผ่าน")
else:
    print("ไม่ผ่าน")
`] },
  "py2-if/1": { sol: R`score = int(input())
if not 0 <= score <= 100:
    print("คะแนนไม่ถูกต้อง")
elif score >= 80:
    print("เกรด A")
elif score >= 70:
    print("เกรด B")
elif score >= 60:
    print("เกรด C")
elif score >= 50:
    print("เกรด D")
else:
    print("เกรด F")
`, wrong: [R`score = int(input())
if score >= 80:
    print("เกรด A")
elif score >= 70:
    print("เกรด B")
elif score >= 60:
    print("เกรด C")
elif score >= 50:
    print("เกรด D")
else:
    print("เกรด F")
`, R`score = int(input())
if not 0 <= score <= 100:
    print("คะแนนไม่ถูกต้อง")
elif score > 80:
    print("เกรด A")
elif score > 70:
    print("เกรด B")
elif score > 60:
    print("เกรด C")
elif score > 50:
    print("เกรด D")
else:
    print("เกรด F")
`] },
  "py2-if/2": { sol: R`weight = float(input())
if weight <= 1:
    print("ค่าส่ง 40 บาท")
elif weight <= 5:
    print("ค่าส่ง 80 บาท")
elif weight <= 20:
    print("ค่าส่ง 150 บาท")
else:
    print("เกินขนาด")
`, wrong: [R`weight = float(input())
if weight < 1:
    print("ค่าส่ง 40 บาท")
elif weight < 5:
    print("ค่าส่ง 80 บาท")
elif weight < 20:
    print("ค่าส่ง 150 บาท")
else:
    print("เกินขนาด")
`] },
  "py2-if/3": { sol: R`year = int(input())
if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print("ปีอธิกสุรทิน")
else:
    print("ไม่ใช่ปีอธิกสุรทิน")
`, wrong: [R`year = int(input())
if year % 4 == 0:
    print("ปีอธิกสุรทิน")
else:
    print("ไม่ใช่ปีอธิกสุรทิน")
`, R`year = int(input())
if year % 4 == 0 and year % 100 != 0:
    print("ปีอธิกสุรทิน")
else:
    print("ไม่ใช่ปีอธิกสุรทิน")
`] },
  "py2-if/4": { sol: R`name = input()
if name:
    print(f"สวัสดี {name}")
else:
    print("ไม่ระบุชื่อ")
`, wrong: [R`name = input()
if name and name != "0":
    print(f"สวัสดี {name}")
else:
    print("ไม่ระบุชื่อ")
`] },
  "py2-if/5": { sol: R`total = int(input())
count = int(input())
if count > 0 and total / count > 50:
    print("เฉลี่ยเกิน 50")
else:
    print("ไม่เกิน 50")
`, wrong: [R`total = int(input())
count = int(input())
if count > 0 and total / count >= 50:
    print("เฉลี่ยเกิน 50")
else:
    print("ไม่เกิน 50")
`] },
  "py2-if/6": { sol: R`cmd = input()
match cmd:
    case "start":
        print("เริ่มเกม")
    case "stop" | "quit":
        print("จบเกม")
    case "help":
        print("คำสั่ง: start stop quit help")
    case _:
        print("ไม่รู้จักคำสั่ง")
`, wrong: [R`cmd = input()
match cmd:
    case "start":
        print("เริ่มเกม")
    case "stop":
        print("จบเกม")
    case "help":
        print("คำสั่ง: start stop quit help")
    case _:
        print("ไม่รู้จักคำสั่ง")
`] },
  "py2-if/7": { sol: R`a = int(input())
b = int(input())
c = int(input())
biggest = a
if b > biggest:
    biggest = b
if c > biggest:
    biggest = c
print(f"มากสุด {biggest}")
`, wrong: [R`a = int(input())
b = int(input())
c = int(input())
biggest = a
if b > a:
    biggest = b
if c > a:
    biggest = c
print(f"มากสุด {biggest}")
`] },
  // ── Stage 8: วนซ้ำด้วย while ──
  "py2-while/0": { sol: R`n = int(input())
while n > 0:
    print(n)
    n -= 1
print("ปล่อยจรวด!")
`, wrong: [R`n = int(input())
while n > 1:
    print(n)
    n -= 1
print("ปล่อยจรวด!")
`] },
  "py2-while/1": { sol: R`total = 0
count = 0
x = int(input())
while x != 0:
    total += x
    count += 1
    x = int(input())
print(f"รวม {total} · จำนวน {count} ค่า")
`, wrong: [R`total = 0
count = 0
x = int(input())
while x > 0:
    total += x
    count += 1
    x = int(input())
print(f"รวม {total} · จำนวน {count} ค่า")
`] },
  "py2-while/2": { sol: R`n = int(input())
i = 0
while i < n:
    print(i)
    i += 1
`, wrong: [R`n = int(input())
i = 0
while i <= n:
    print(i)
    i += 1
`] },
  "py2-while/3": { sol: R`tries = 1
x = int(input())
while not 1 <= x <= 5:
    x = int(input())
    tries += 1
print(f"ได้คะแนน {x} (ป้อน {tries} ครั้ง)")
`, wrong: [R`tries = 0
x = int(input())
while not 1 <= x <= 5:
    x = int(input())
    tries += 1
print(f"ได้คะแนน {x} (ป้อน {tries} ครั้ง)")
`, R`tries = 1
x = int(input())
while not 1 < x < 5:
    x = int(input())
    tries += 1
print(f"ได้คะแนน {x} (ป้อน {tries} ครั้ง)")
`] },
  "py2-while/4": { sol: R`n = int(input())
digits = 0
total = 0
if n == 0:
    digits = 1
while n > 0:
    digits += 1
    total += n % 10
    n //= 10
print(f"หลัก: {digits} · ผลรวมหลัก: {total}")
`, wrong: [R`n = int(input())
digits = 0
total = 0
while n > 0:
    digits += 1
    total += n % 10
    n //= 10
print(f"หลัก: {digits} · ผลรวมหลัก: {total}")
`] },
  "py2-while/5": { sol: R`secret = int(input())
guess = int(input())
tries = 1
while guess != secret:
    if guess > secret:
        print("มากไป")
    else:
        print("น้อยไป")
    guess = int(input())
    tries += 1
print(f"ถูกต้อง! ทาย {tries} ครั้ง")
`, wrong: [R`secret = int(input())
guess = int(input())
tries = 1
while guess != secret:
    if guess < secret:
        print("มากไป")
    else:
        print("น้อยไป")
    guess = int(input())
    tries += 1
print(f"ถูกต้อง! ทาย {tries} ครั้ง")
`] },

  // ── Stage 9: วนซ้ำด้วย for ──
  "py2-for/0": { sol: R`n = int(input())
for i in range(1, 13):
    print(f"{n} x {i} = {n * i}")
`, wrong: [R`n = int(input())
for i in range(1, 12):
    print(f"{n} x {i} = {n * i}")
`] },
  "py2-for/1": { sol: R`a = int(input())
b = int(input())
start = a if a % 2 == 0 else a + 1
total = 0
for x in range(start, b + 1, 2):
    total += x
print(f"ผลรวมเลขคู่ {total}")
`, wrong: [R`a = int(input())
b = int(input())
total = 0
for x in range(a, b, 2):
    total += x
print(f"ผลรวมเลขคู่ {total}")
`, R`a = int(input())
b = int(input())
start = a if a % 2 == 0 else a + 1
total = 0
for x in range(start, b, 2):
    total += x
print(f"ผลรวมเลขคู่ {total}")
`] },
  "py2-for/2": { sol: R`n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print("ผลรวม", total)
`, wrong: [R`n = int(input())
total = 0
for i in range(n):
    total += i
print("ผลรวม", total)
`] },
  "py2-for/3": { sol: R`n = int(input())
total = 0
best = None
for _ in range(n):
    x = int(input())
    total += x
    if best is None or x > best:
        best = x
if n == 0:
    print("ไม่มีข้อมูล")
else:
    print(f"เฉลี่ย {total / n:.2f} · สูงสุด {best}")
`, wrong: [R`n = int(input())
total = 0
best = 0
for _ in range(n):
    x = int(input())
    total += x
    if x > best:
        best = x
if n == 0:
    print("ไม่มีข้อมูล")
else:
    print(f"เฉลี่ย {total / n:.2f} · สูงสุด {best}")
`] },
  "py2-for/4": { sol: R`word = input()
for i, ch in enumerate(word, 1):
    print(f"{i}. {ch}")
`, wrong: [R`word = input()
for i, ch in enumerate(word):
    print(f"{i}. {ch}")
`] },
  "py2-for/5": { sol: R`key = input()
answers = input()
if len(key) != len(answers):
    print("ความยาวไม่เท่ากัน")
else:
    correct = 0
    for k, a in zip(key, answers):
        if k == a:
            correct += 1
    print(f"ถูก {correct} จาก {len(key)}")
`, wrong: [R`key = input()
answers = input()
correct = 0
for k, a in zip(key, answers):
    if k == a:
        correct += 1
print(f"ถูก {correct} จาก {len(key)}")
`] },
  "py2-for/6": { sol: R`n = int(input())
total = 0
for i in range(n):
    total += int(input())
print("รวม", total)
`, wrong: [R`n = int(input())
total = 0
for i in range(n):
    total = int(input())
print("รวม", total)
`] },
  "py2-for/7": { sol: R`n = int(input())
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * i)
`, wrong: [R`n = int(input())
for i in range(1, n + 1):
    print("*" * i)
`] },
  // ── Stage 10: ควบคุมลูปและการไล่โปรแกรม ──
  "py2-loopctl/0": { sol: R`n = int(input())
for d in range(2, n):
    if n % d == 0:
        print(f"หารด้วย {d} ลงตัว")
        break
else:
    print("จำนวนเฉพาะ")
`, wrong: [R`n = int(input())
for d in range(2, n):
    if n % d == 0:
        print(f"หารด้วย {d} ลงตัว")
        break
print("จำนวนเฉพาะ")
`, R`n = int(input())
for d in range(3, n):
    if n % d == 0:
        print(f"หารด้วย {d} ลงตัว")
        break
else:
    print("จำนวนเฉพาะ")
`] },
  "py2-loopctl/1": { sol: R`n = int(input())
total = 0
for i in range(1, n + 1):
    if i % 3 == 0:
        continue
    total += i
print("รวม", total)
`, wrong: [R`n = int(input())
total = 0
for i in range(1, n + 1):
    if i % 3 == 0:
        break
    total += i
print("รวม", total)
`] },
  "py2-loopctl/2": { sol: R`n = int(input())
target = int(input())
found = False
for a in range(1, n + 1):
    for b in range(a + 1, n + 1):
        if a + b == target:
            print(f"{a} + {b} = {target}")
            found = True
            break
    if found:
        break
if not found:
    print("ไม่พบ")
`, wrong: [R`n = int(input())
target = int(input())
found = False
for a in range(1, n + 1):
    for b in range(a + 1, n):
        if a + b == target:
            print(f"{a} + {b} = {target}")
            found = True
            break
    if found:
        break
if not found:
    print("ไม่พบ")
`] },
  "py2-loopctl/3": { sol: R`days = 0
bad = 0
total = 0
best = None
while True:
    line = input()
    if line == "end":
        break
    amount = int(line)
    if amount < 0:
        bad += 1
        continue
    days += 1
    total += amount
    if best is None or amount > best:
        best = amount
print(f"วันที่บันทึก: {days} · ข้อมูลผิด: {bad}")
if days == 0:
    print("ไม่มีข้อมูลที่ใช้ได้")
else:
    print(f"รวม: {total} · เฉลี่ย: {total / days:.2f}")
    print(f"สูงสุด: {best}")
`, wrong: [R`days = 0
bad = 0
total = 0
best = None
while True:
    line = input()
    if line == "end":
        break
    amount = int(line)
    if amount <= 0:
        bad += 1
        continue
    days += 1
    total += amount
    if best is None or amount > best:
        best = amount
print(f"วันที่บันทึก: {days} · ข้อมูลผิด: {bad}")
if days == 0:
    print("ไม่มีข้อมูลที่ใช้ได้")
else:
    print(f"รวม: {total} · เฉลี่ย: {total / days:.2f}")
    print(f"สูงสุด: {best}")
`, R`days = 0
bad = 0
total = 0
best = None
while True:
    line = input()
    if line == "end":
        break
    amount = int(line)
    if amount < 0:
        bad += 1
    days += 1
    total += amount
    if best is None or amount > best:
        best = amount
print(f"วันที่บันทึก: {days} · ข้อมูลผิด: {bad}")
if days == 0:
    print("ไม่มีข้อมูลที่ใช้ได้")
else:
    print(f"รวม: {total} · เฉลี่ย: {total / days:.2f}")
    print(f"สูงสุด: {best}")
`] },
  "py2-loopctl/4": { sol: R`money = int(input())
while True:
    code = int(input())
    if code == 0:
        tens = money // 10
        fives = money % 10 // 5
        ones = money % 5
        print(f"ทอน {money} บาท (10×{tens} 5×{fives} 1×{ones})")
        break
    match code:
        case 1:
            name, price = "น้ำ", 15
        case 2:
            name, price = "ชา", 20
        case 3:
            name, price = "กาแฟ", 25
        case _:
            print("ไม่มีสินค้านี้")
            continue
    if money >= price:
        money -= price
        print(f"ได้ {name} เหลือ {money} บาท")
    else:
        print(f"เงินไม่พอ (ขาด {price - money} บาท)")
`, wrong: [R`money = int(input())
while True:
    code = int(input())
    if code == 0:
        tens = money // 10
        fives = money // 5
        ones = money % 5
        print(f"ทอน {money} บาท (10×{tens} 5×{fives} 1×{ones})")
        break
    match code:
        case 1:
            name, price = "น้ำ", 15
        case 2:
            name, price = "ชา", 20
        case 3:
            name, price = "กาแฟ", 25
        case _:
            print("ไม่มีสินค้านี้")
            continue
    if money >= price:
        money -= price
        print(f"ได้ {name} เหลือ {money} บาท")
    else:
        print(f"เงินไม่พอ (ขาด {price - money} บาท)")
`, R`money = int(input())
while True:
    code = int(input())
    if code == 0:
        tens = money // 10
        fives = money % 10 // 5
        ones = money % 5
        print(f"ทอน {money} บาท (10×{tens} 5×{fives} 1×{ones})")
        break
    match code:
        case 1:
            name, price = "น้ำ", 15
        case 2:
            name, price = "ชา", 20
        case 3:
            name, price = "กาแฟ", 25
        case _:
            print("ไม่มีสินค้านี้")
            continue
    if money > price:
        money -= price
        print(f"ได้ {name} เหลือ {money} บาท")
    else:
        print(f"เงินไม่พอ (ขาด {price - money} บาท)")
`] },

  // ── Stage 11: สตริงพื้นฐาน ──
  "py2-str1/0": { sol: R`word = input()
print(f"ตัวแรก: {word[0]} · ตัวสุดท้าย: {word[-1]} · ยาว: {len(word)}")
`, wrong: [R`word = input()
print(f"ตัวแรก: {word[0]} · ตัวสุดท้าย: {word[len(word) - 2]} · ยาว: {len(word)}")
`] },
  "py2-str1/1": { sol: R`word = input()
print(word[::-1])
w = word.lower()
if w == w[::-1]:
    print("เป็น palindrome")
else:
    print("ไม่เป็น palindrome")
`, wrong: [R`word = input()
print(word[::-1])
if word == word[::-1]:
    print("เป็น palindrome")
else:
    print("ไม่เป็น palindrome")
`] },
  "py2-str1/2": { sol: R`word = input()
if word:
    word = word[0].upper() + word[1:]
print(word)
`, wrong: [R`word = input()
print(word.capitalize())
`, R`word = input()
word = word[0].upper() + word[1:]
print(word)
`] },
  "py2-str1/3": { sol: R`line = input()
print(" ".join(line.split()))
`, wrong: [R`line = input()
print(" ".join(line.split(" ")))
`] },
  "py2-str1/4": { sol: R`text = input()
word = input()
pos = text.find(word)
if pos != -1:
    print("พบที่ตำแหน่ง", pos)
else:
    print("ไม่พบ")
`, wrong: [R`text = input()
word = input()
pos = text.find(word)
if pos > 0:
    print("พบที่ตำแหน่ง", pos)
else:
    print("ไม่พบ")
`] },
  "py2-str1/5": { sol: R`filename = input()
name = filename.lower()
if name.endswith((".png", ".jpg", ".jpeg")):
    print("รูปภาพ")
elif name.endswith((".pdf", ".docx")):
    print("เอกสาร")
else:
    print("ไม่รู้จัก")
`, wrong: [R`filename = input()
name = filename.lower()
if name.endswith(("png", "jpg", "jpeg")):
    print("รูปภาพ")
elif name.endswith(("pdf", "docx")):
    print("เอกสาร")
else:
    print("ไม่รู้จัก")
`, R`filename = input()
if filename.endswith((".png", ".jpg", ".jpeg")):
    print("รูปภาพ")
elif filename.endswith((".pdf", ".docx")):
    print("เอกสาร")
else:
    print("ไม่รู้จัก")
`] },
  "py2-str1/6": { sol: R`text = input()
text = text.replace("bad", "***")
print(text)
`, wrong: [R`text = input()
text = text.lower().replace("bad", "***")
print(text)
`] },
  "py2-str1/7": { sol: R`text = input()
count = 0
for ch in text.lower():
    if ch in "aeiou":
        count += 1
print(f"สระ {count} ตัว")
`, wrong: [R`text = input()
count = 0
for ch in text:
    if ch in "aeiou":
        count += 1
print(f"สระ {count} ตัว")
`] },
  // ── Stage 12: ประมวลผลข้อความ ──
  "py2-str2/0": { sol: R`text = input()
parts = text.split("-")
if len(parts) != 3:
    print("รูปแบบไม่ถูกต้อง")
else:
    y, m, d = parts
    print(f"วันที่ {int(d)} เดือน {int(m)} ปี {int(y)}")
`, wrong: [R`text = input()
parts = text.split("-")
if len(parts) != 3:
    print("รูปแบบไม่ถูกต้อง")
else:
    y, m, d = parts
    print(f"วันที่ {d} เดือน {m} ปี {y}")
`] },
  "py2-str2/1": { sol: R`password = input()
has_digit = has_upper = has_lower = False
for ch in password:
    if ch.isdigit():
        has_digit = True
    elif ch.isupper():
        has_upper = True
    elif ch.islower():
        has_lower = True
problems = 0
if len(password) < 8:
    print("สั้นเกินไป")
    problems += 1
if not has_digit:
    print("ต้องมีตัวเลข")
    problems += 1
if not has_upper:
    print("ต้องมีตัวพิมพ์ใหญ่")
    problems += 1
if not has_lower:
    print("ต้องมีตัวพิมพ์เล็ก")
    problems += 1
if problems == 0:
    print("รหัสผ่านใช้ได้")
`, wrong: [R`password = input()
has_digit = has_upper = has_lower = False
for ch in password:
    if ch.isdigit():
        has_digit = True
    elif ch.isupper():
        has_upper = True
    elif ch.islower():
        has_lower = True
if len(password) <= 8:
    print("สั้นเกินไป")
elif not has_digit:
    print("ต้องมีตัวเลข")
elif not has_upper:
    print("ต้องมีตัวพิมพ์ใหญ่")
elif not has_lower:
    print("ต้องมีตัวพิมพ์เล็ก")
else:
    print("รหัสผ่านใช้ได้")
`] },
  "py2-str2/2": { sol: R`text = input()
digits = text[1:] if text.startswith("-") else text
if digits.isdigit():
    print("จำนวนเต็ม")
else:
    print("ไม่ใช่จำนวนเต็ม")
`, wrong: [R`text = input()
if text.replace("-", "").isdigit():
    print("จำนวนเต็ม")
else:
    print("ไม่ใช่จำนวนเต็ม")
`] },
  "py2-str2/3": { sol: R`n = int(input())
total = 0
for _ in range(n):
    name, price = input().split(",")
    price = float(price)
    total += price
    print(f"{name:<12}{price:>8.2f}")
print(f"{'รวม':<12}{total:>8.2f}")
`, wrong: [R`n = int(input())
total = 0
for _ in range(n):
    name, price = input().split(",")
    price = float(price)
    total += price
    print(f"{name:<12}{price:>8}")
print(f"{'รวม':<12}{total:>8}")
`] },
  "py2-str2/4": { sol: R`text = input()
if text:
    print(f"ยาว {len(text)} · U+{ord(text[0]):04X}")
else:
    print("ยาว 0")
`, wrong: [R`text = input()
if text:
    print(f"ยาว {len(text)} · U+{ord(text[0]):X}")
else:
    print("ยาว 0")
`] },
  "py2-str2/5": { sol: R`answer = input()
if answer.strip().lower() == "bangkok":
    print("ถูกต้อง")
else:
    print("ผิด")
`, wrong: [R`answer = input()
if "bangkok" in answer.lower().replace(" ", ""):
    print("ถูกต้อง")
else:
    print("ผิด")
`] },
  "py2-str2/6": { sol: R`lines = 0
words = 0
letters = 0
longest = ""
while True:
    line = input()
    if line == "END":
        break
    lines += 1
    for w in line.split():
        words += 1
        letters += len(w)
        if len(w) > len(longest):
            longest = w
avg = letters / words if words else 0
print(f"บรรทัด: {lines}")
print(f"คำ: {words}")
print(f"ตัวอักษร (ไม่รวมช่องว่าง): {letters}")
print(f"คำยาวที่สุด: {longest or '-'}")
print(f"ความยาวคำเฉลี่ย: {avg:.2f}")
`, wrong: [R`lines = 0
words = 0
letters = 0
longest = ""
while True:
    line = input()
    if line == "END":
        break
    lines += 1
    for w in line.split():
        words += 1
        letters += len(w)
        if len(w) >= len(longest):
            longest = w
avg = letters / words if words else 0
print(f"บรรทัด: {lines}")
print(f"คำ: {words}")
print(f"ตัวอักษร (ไม่รวมช่องว่าง): {letters}")
print(f"คำยาวที่สุด: {longest or '-'}")
print(f"ความยาวคำเฉลี่ย: {avg:.2f}")
`, R`lines = 0
words = 0
letters = 0
longest = ""
while True:
    line = input()
    if line == "END":
        break
    lines += 1
    for w in line.split():
        words += 1
        if len(w) > len(longest):
            longest = w
    letters += len(line)
avg = letters / words if words else 0
print(f"บรรทัด: {lines}")
print(f"คำ: {words}")
print(f"ตัวอักษร (ไม่รวมช่องว่าง): {letters}")
print(f"คำยาวที่สุด: {longest or '-'}")
print(f"ความยาวคำเฉลี่ย: {avg:.2f}")
`] },

  // ── Stage 13: ลิสต์ ──
  "py2-list/0": { sol: R`n = int(input())
scores = []
for _ in range(n):
    scores.append(int(input()))
print(scores)
print(f"จำนวน {len(scores)} · รวม {sum(scores)}")
`, wrong: [R`n = int(input())
scores = []
for _ in range(n):
    scores.append(input())
print(scores)
print(f"จำนวน {len(scores)} · รวม {len(scores)}")
`] },
  "py2-list/1": { sol: R`line = input()
nums = []
for tok in line.split():
    nums.append(int(tok))
if not nums:
    print("ไม่มีข้อมูล")
else:
    top = sorted(nums, reverse=True)[:3]
    parts = []
    for x in top:
        parts.append(str(x))
    print("อันดับสูงสุด: " + " ".join(parts))
`, wrong: [R`line = input()
nums = []
for tok in line.split():
    nums.append(int(tok))
if not nums:
    print("ไม่มีข้อมูล")
else:
    top = sorted(nums)[-3:]
    parts = []
    for x in top:
        parts.append(str(x))
    print("อันดับสูงสุด: " + " ".join(parts))
`, R`line = input()
nums = line.split()
if not nums:
    print("ไม่มีข้อมูล")
else:
    top = sorted(nums, reverse=True)[:3]
    print("อันดับสูงสุด: " + " ".join(top))
`] },
  "py2-list/2": { sol: R`nums = []
for tok in input().split():
    nums.append(int(tok))
ranked = sorted(nums)
print("เดิม:", nums)
print("เรียง:", ranked)
print(f"ต่ำสุด {ranked[0]} · สูงสุด {ranked[-1]}")
`, wrong: [R`nums = []
for tok in input().split():
    nums.append(int(tok))
nums.sort()
ranked = nums
print("เดิม:", nums)
print("เรียง:", ranked)
print(f"ต่ำสุด {ranked[0]} · สูงสุด {ranked[-1]}")
`] },
  "py2-list/3": { sol: R`n = int(input())
queue = []
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        queue.append(parts[1])
    elif cmd == "vip":
        queue.insert(0, parts[1])
    elif cmd == "next":
        if queue:
            print("เรียก", queue.pop(0))
        else:
            print("คิวว่าง")
    elif cmd == "leave":
        if parts[1] in queue:
            queue.remove(parts[1])
        else:
            print("ไม่พบ", parts[1])
    elif cmd == "show":
        print("คิว: " + (", ".join(queue) if queue else "(ว่าง)"))
`, wrong: [R`n = int(input())
queue = []
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        queue.append(parts[1])
    elif cmd == "vip":
        queue.insert(0, parts[1])
    elif cmd == "next":
        if queue:
            print("เรียก", queue.pop())
        else:
            print("คิวว่าง")
    elif cmd == "leave":
        if parts[1] in queue:
            queue.remove(parts[1])
        else:
            print("ไม่พบ", parts[1])
    elif cmd == "show":
        print("คิว: " + (", ".join(queue) if queue else "(ว่าง)"))
`] },
  "py2-list/4": { sol: R`nums = []
for tok in input().split():
    nums.append(int(tok))
kept = []
for x in nums:
    if x >= 0:
        kept.append(x)
print(kept)
`, wrong: [R`nums = []
for tok in input().split():
    nums.append(int(tok))
kept = []
for x in nums:
    if x > 0:
        kept.append(x)
print(kept)
`] },
  "py2-list/5": { sol: R`nums = []
for tok in input().split():
    nums.append(int(tok))
doubled = nums.copy()
for i in range(len(doubled)):
    doubled[i] *= 2
print("เดิม:", nums)
print("ใหม่:", doubled)
`, wrong: [R`nums = []
for tok in input().split():
    nums.append(int(tok))
doubled = nums
for i in range(len(doubled)):
    doubled[i] = doubled[i] * 2
print("เดิม:", nums)
print("ใหม่:", doubled)
`] },
  "py2-list/6": { sol: R`r = int(input())
c = int(input())
grid = []
for _ in range(r):
    row = []
    for tok in input().split():
        row.append(int(tok))
    grid.append(row)
for i in range(r):
    print(f"แถว {i + 1}: {sum(grid[i])}")
col = [0] * c
for i in range(r):
    for j in range(c):
        col[j] += grid[i][j]
parts = []
for x in col:
    parts.append(str(x))
print("คอลัมน์: " + " ".join(parts))
`, wrong: [R`r = int(input())
c = int(input())
grid = []
for _ in range(r):
    row = []
    for tok in input().split():
        row.append(int(tok))
    grid.append(row)
for i in range(r):
    print(f"แถว {i + 1}: {sum(grid[i])}")
col = [0] * c
for i in range(r):
    for j in range(c):
        col[j] += grid[j][i] if j < r and i < c else 0
parts = []
for x in col:
    parts.append(str(x))
print("คอลัมน์: " + " ".join(parts))
`] },
  "py2-list/7": { sol: R`n = int(input())
students = []
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        students.append([parts[1], int(parts[2])])
    elif cmd == "remove":
        for s in students:
            if s[0] == parts[1]:
                students.remove(s)
                break
        else:
            print("ไม่พบ", parts[1])
    elif not students:
        print("ไม่มีนักเรียน")
    elif cmd == "top":
        best = students[0]
        for s in students:
            if s[1] > best[1]:
                best = s
        print(f"สูงสุด: {best[0]} {best[1]}")
    elif cmd == "avg":
        total = 0
        for s in students:
            total += s[1]
        print(f"เฉลี่ย: {total / len(students):.2f}")
    elif cmd == "list":
        ranked = []
        for s in students:
            ranked.append([-s[1], s[0]])
        for i, (neg, name) in enumerate(sorted(ranked), 1):
            print(f"{i}. {name} {-neg}")
`, wrong: [R`n = int(input())
students = []
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        students.append([parts[1], int(parts[2])])
    elif cmd == "remove":
        for s in students:
            if s[0] == parts[1]:
                students.remove(s)
                break
        else:
            print("ไม่พบ", parts[1])
    elif not students:
        print("ไม่มีนักเรียน")
    elif cmd == "top":
        best = students[0]
        for s in students:
            if s[1] >= best[1]:
                best = s
        print(f"สูงสุด: {best[0]} {best[1]}")
    elif cmd == "avg":
        total = 0
        for s in students:
            total += s[1]
        print(f"เฉลี่ย: {total / len(students):.2f}")
    elif cmd == "list":
        ranked = []
        for s in students:
            ranked.append([s[1], s[0]])
        for i, (score, name) in enumerate(sorted(ranked, reverse=True), 1):
            print(f"{i}. {name} {score}")
`] },
  // ── Stage 14: ทูเพิลและเซต ──
  "py2-tupleset/0": { sol: R`x1, y1 = input().split(",")
x2, y2 = input().split(",")
p1 = (int(x1), int(y1))
p2 = (int(x2), int(y2))
ax, ay = p1
bx, by = p2
print(f"ระยะ {abs(ax - bx) + abs(ay - by)}")
`, wrong: [R`x1, y1 = input().split(",")
x2, y2 = input().split(",")
print(f"ระยะ {(int(x2) - int(x1)) + (int(y2) - int(y1))}")
`] },
  "py2-tupleset/1": { sol: R`point = (3, 4)
new_x = int(input())
point = (new_x, point[1])
print(point)
`, wrong: [R`point = (3, 4)
new_x = int(input())
point = [new_x, point[1]]
print(point)
`] },
  "py2-tupleset/2": { sol: R`line = input()
words = set(line.lower().split())
if words:
    print(f"ไม่ซ้ำ {len(words)} คำ: " + ", ".join(sorted(words)))
else:
    print("ไม่ซ้ำ 0 คำ")
`, wrong: [R`line = input()
words = set(line.split())
if words:
    print(f"ไม่ซ้ำ {len(words)} คำ: " + ", ".join(sorted(words)))
else:
    print("ไม่ซ้ำ 0 คำ")
`] },
  "py2-tupleset/3": { sol: R`math = set(input().split())
science = set(input().split())
both = sorted(math & science)
only_math = sorted(math - science)
only_sci = sorted(science - math)
print("ทั้งสองวิชา: " + (", ".join(both) if both else "-"))
print("แค่คณิต: " + (", ".join(only_math) if only_math else "-"))
print("แค่วิทย์: " + (", ".join(only_sci) if only_sci else "-"))
print(f"ทั้งหมด {len(math | science)} คน")
`, wrong: [R`math = set(input().split())
science = set(input().split())
both = sorted(math & science)
only_math = sorted(math - science)
only_sci = sorted(science - math)
print("ทั้งสองวิชา: " + (", ".join(both) if both else "-"))
print("แค่คณิต: " + (", ".join(only_math) if only_math else "-"))
print("แค่วิทย์: " + (", ".join(only_sci) if only_sci else "-"))
print(f"ทั้งหมด {len(math) + len(science)} คน")
`] },
  "py2-tupleset/4": { sol: R`n = int(input())
ids = set()
for tok in input().split():
    ids.add(int(tok))
q = int(input())
found = 0
for tok in input().split():
    if int(tok) in ids:
        found += 1
print("พบ", found)
`, wrong: [R`n = int(input())
ids = []
for tok in input().split():
    ids.append(int(tok))
q = int(input())
found = 0
for tok in input().split():
    if int(tok) in ids:
        found += 1
print("พบ", found)
`] },
  "py2-tupleset/5": { sol: R`n = int(input())
results = []
for _ in range(n):
    name, time = input().split()
    m, s = time.split(":")
    results.append((int(m), int(s), name))
for i, (m, s, name) in enumerate(sorted(results)[:3], 1):
    print(f"{i}. {name} {m}:{s:02d}")
`, wrong: [R`n = int(input())
results = []
for _ in range(n):
    name, time = input().split()
    results.append((time, name))
for i, (time, name) in enumerate(sorted(results)[:3], 1):
    print(f"{i}. {name} {time}")
`] },

  // ── Stage 15: ดิกชันนารี ──
  "py2-dict/0": { sol: R`n = int(input())
phone = {}
for _ in range(n):
    name, number = input().split()
    phone[name] = number
while True:
    name = input()
    if name == "end":
        break
    if name in phone:
        print(f"{name}: {phone[name]}")
    else:
        print("ไม่พบ", name)
`, wrong: [R`n = int(input())
phone = {}
for _ in range(n):
    name, number = input().split()
    if name not in phone:
        phone[name] = number
while True:
    name = input()
    if name == "end":
        break
    if name in phone:
        print(f"{name}: {phone[name]}")
    else:
        print("ไม่พบ", name)
`] },
  "py2-dict/1": { sol: R`text = input()
counts = {}
for ch in text:
    if ch != " ":
        counts[ch] = counts.get(ch, 0) + 1
for ch in sorted(counts):
    print(f"{ch}: {counts[ch]}")
`, wrong: [R`text = input()
counts = {}
for ch in text.lower():
    if ch != " ":
        counts[ch] = counts.get(ch, 0) + 1
for ch in sorted(counts):
    print(f"{ch}: {counts[ch]}")
`] },
  "py2-dict/2": { sol: R`votes = {}
while True:
    name = input()
    if name == "end":
        break
    votes[name] = votes.get(name, 0) + 1
if not votes:
    print("ไม่มีคะแนนโหวต")
else:
    order = []
    for name, n in votes.items():
        order.append((-n, name))
    for neg, name in sorted(order):
        print(f"{name}: {-neg}")
    best = max(votes.values())
    winners = []
    for name, n in votes.items():
        if n == best:
            winners.append(name)
    winners.sort()
    if len(winners) == 1:
        print("ผู้ชนะ:", winners[0])
    else:
        print("เสมอ: " + ", ".join(winners))
`, wrong: [R`votes = {}
while True:
    name = input()
    if name == "end":
        break
    votes[name] = votes.get(name, 0) + 1
if not votes:
    print("ไม่มีคะแนนโหวต")
else:
    for neg, name in sorted((-n, name) for name, n in votes.items()):
        print(f"{name}: {-neg}")
    best = max(votes.values())
    for name in sorted(votes):
        if votes[name] == best:
            print("ผู้ชนะ:", name)
            break
`] },
  "py2-dict/3": { sol: R`counts = {}
while True:
    line = input()
    if line == "END":
        break
    for w in line.lower().split():
        w = w.strip(".,!?")
        if w:
            counts[w] = counts.get(w, 0) + 1
print(f"คำทั้งหมด: {sum(counts.values())} · ไม่ซ้ำ: {len(counts)}")
pairs = []
for w, n in counts.items():
    pairs.append((-n, w))
for neg, w in sorted(pairs)[:3]:
    print(f"{w}: {-neg}")
`, wrong: [R`counts = {}
while True:
    line = input()
    if line == "END":
        break
    for w in line.lower().split():
        counts[w] = counts.get(w, 0) + 1
print(f"คำทั้งหมด: {sum(counts.values())} · ไม่ซ้ำ: {len(counts)}")
for neg, w in sorted((-n, w) for w, n in counts.items())[:3]:
    print(f"{w}: {-neg}")
`, R`counts = {}
while True:
    line = input()
    if line == "END":
        break
    for w in line.lower().split():
        w = w.strip(".,!?")
        if w:
            counts[w] = counts.get(w, 0) + 1
print(f"คำทั้งหมด: {sum(counts.values())} · ไม่ซ้ำ: {len(counts)}")
for neg, w in sorted([(-n, w) for w, n in counts.items()], reverse=True)[:3]:
    print(f"{w}: {-neg}")
`] },
  "py2-dict/4": { sol: R`n = int(input())
grades = {}
for _ in range(n):
    name, subject, score = input().split()
    grades.setdefault(name, {})[subject] = int(score)
for name in sorted(grades):
    subjects = grades[name]
    print(f"{name}: {sum(subjects.values()) / len(subjects):.2f} ({len(subjects)} วิชา)")
`, wrong: [R`n = int(input())
grades = {}
for _ in range(n):
    name, subject, score = input().split()
    grades.setdefault(name, []).append(int(score))
for name in sorted(grades):
    scores = grades[name]
    print(f"{name}: {sum(scores) / len(scores):.2f} ({len(scores)} วิชา)")
`] },
  "py2-dict/5": { sol: R`n = int(input())
stock = {}
for _ in range(n):
    name, qty = input().split()
    stock[name] = int(qty)
for name in list(stock):
    if stock[name] == 0:
        del stock[name]
for name in stock:
    print(f"{name}: {stock[name]}")
`, wrong: [R`n = int(input())
stock = {}
for _ in range(n):
    name, qty = input().split()
    stock[name] = int(qty)
for name in sorted(stock):
    if stock[name] != 0:
        print(f"{name}: {stock[name]}")
`] },
  "py2-dict/6": { sol: R`n = int(input())
points = {}
for _ in range(n):
    parts = input().split()
    if parts[0] == "score":
        points[parts[1]] = points.get(parts[1], 0) + int(parts[2])
        continue
    order = []
    for name, p in points.items():
        order.append((-p, name))
    order.sort()
    if parts[0] == "show":
        if not order:
            print("(ว่าง)")
        for i, (neg, name) in enumerate(order[:3], 1):
            print(f"{i}. {name} {-neg}")
    elif parts[0] == "rank":
        target = parts[1]
        for i, (neg, name) in enumerate(order, 1):
            if name == target:
                print(f"{name} อันดับ {i} จาก {len(order)}")
                break
        else:
            print("ไม่พบ", target)
`, wrong: [R`n = int(input())
points = {}
for _ in range(n):
    parts = input().split()
    if parts[0] == "score":
        points[parts[1]] = int(parts[2])
        continue
    order = sorted((-p, name) for name, p in points.items())
    if parts[0] == "show":
        if not order:
            print("(ว่าง)")
        for i, (neg, name) in enumerate(order[:3], 1):
            print(f"{i}. {name} {-neg}")
    elif parts[0] == "rank":
        target = parts[1]
        for i, (neg, name) in enumerate(order, 1):
            if name == target:
                print(f"{name} อันดับ {i} จาก {len(order)}")
                break
        else:
            print("ไม่พบ", target)
`] },
  "py2-dict/7": { sol: R`config = {}
for _ in range(int(input())):
    key, value = input().split("=", 1)
    config[key] = value
for _ in range(int(input())):
    key, value = input().split("=", 1)
    config[key] = value
for key, value in config.items():
    print(f"{key} = {value}")
`, wrong: [R`config = {}
for _ in range(int(input())):
    key, value = input().split("=")[:2]
    config[key] = value
for _ in range(int(input())):
    key, value = input().split("=")[:2]
    config[key] = value
for key, value in config.items():
    print(f"{key} = {value}")
`, R`config = {}
for _ in range(int(input())):
    key, value = input().split("=", 1)
    config[key] = value
for _ in range(int(input())):
    key, value = input().split("=", 1)
    config.pop(key, None)
    config[key] = value
for key, value in config.items():
    print(f"{key} = {value}")
`] },
  // ── Stage 16: เลือก Collection และ Comprehension ──
  "py2-choose/0": { sol: R`nums = [int(t) for t in input().split()]
squares = [x * x for x in nums if x % 2 == 0]
print(squares)
`, wrong: [R`nums = [int(t) for t in input().split()]
squares = [x * x for x in nums if x % 2 == 0 and x > 0]
print(squares)
`] },
  "py2-choose/1": { sol: R`n = int(input())
items = []
for _ in range(n):
    name, price = input().split()
    items.append((name, float(price)))
with_vat = {name: price * 1.07 for name, price in items}
for name in sorted(with_vat):
    print(f"{name}: {with_vat[name]:.2f}")
`, wrong: [R`n = int(input())
items = []
for _ in range(n):
    name, price = input().split()
    items.append((name, float(price)))
with_vat = {name: price * 1.07 for name, price in items}
for name in with_vat:
    print(f"{name}: {with_vat[name]:.2f}")
`] },
  "py2-choose/2": { sol: R`n = int(input())
emails = []
for _ in range(n):
    emails.append(input())
domains = {e.split("@")[1].lower() for e in emails}
if domains:
    print(f"โดเมน {len(domains)}: " + ", ".join(sorted(domains)))
else:
    print("โดเมน 0")
`, wrong: [R`n = int(input())
emails = []
for _ in range(n):
    emails.append(input())
domains = {e.split("@")[1] for e in emails}
if domains:
    print(f"โดเมน {len(domains)}: " + ", ".join(sorted(domains)))
else:
    print("โดเมน 0")
`] },
  "py2-choose/3": { sol: R`n = int(input())
rows = [input().split() for _ in range(n)]
bad = 0
for r in rows:
    if len(r) != 2 or not r[1].lstrip("-").isdigit():
        bad += 1
        continue
    name, score = r[0], int(r[1])
    if score >= 50:
        print(f"{name}: ผ่าน")
    else:
        print(f"{name}: ไม่ผ่าน")
print("ข้อมูลผิด", bad)
`, wrong: [R`n = int(input())
rows = [input().split() for _ in range(n)]
bad = 0
for r in rows:
    if len(r) != 2 or not r[1].isdigit():
        bad += 1
        continue
    name, score = r[0], int(r[1])
    if score >= 50:
        print(f"{name}: ผ่าน")
    else:
        print(f"{name}: ไม่ผ่าน")
print("ข้อมูลผิด", bad)
`] },
  "py2-choose/4": { sol: R`nums = [int(t) for t in input().split()]
positive = [x for x in nums if x > 0]
print(positive)
`, wrong: [R`nums = [int(t) for t in input().split()]
positive = [x for x in nums if x >= 0]
print(positive)
`] },
  "py2-choose/5": { sol: R`pieces = {}
bought = {}
item_total = {}
while True:
    line = input()
    if line == "END":
        break
    customer, item, qty = line.split(",")
    qty = int(qty)
    pieces[customer] = pieces.get(customer, 0) + qty
    bought.setdefault(customer, set()).add(item)
    item_total[item] = item_total.get(item, 0) + qty
if not pieces:
    print("ไม่มีคำสั่งซื้อ")
else:
    for customer in sorted(pieces):
        items = sorted(bought[customer])
        print(f"{customer}: {pieces[customer]} ชิ้น · {len(items)} รายการ ({', '.join(items)})")
    neg, best = sorted((-n, item) for item, n in item_total.items())[0]
    print(f"ขายดีที่สุด: {best} ({-neg} ชิ้น)")
`, wrong: [R`pieces = {}
bought = {}
item_total = {}
while True:
    line = input()
    if line == "END":
        break
    customer, item, qty = line.split(",")
    qty = int(qty)
    pieces[customer] = pieces.get(customer, 0) + qty
    bought.setdefault(customer, []).append(item)
    item_total[item] = item_total.get(item, 0) + qty
if not pieces:
    print("ไม่มีคำสั่งซื้อ")
else:
    for customer in sorted(pieces):
        items = sorted(bought[customer])
        print(f"{customer}: {pieces[customer]} ชิ้น · {len(items)} รายการ ({', '.join(items)})")
    neg, best = sorted((-n, item) for item, n in item_total.items())[0]
    print(f"ขายดีที่สุด: {best} ({-neg} ชิ้น)")
`] },
  "py2-choose/6": { sol: R`n = int(input())
stock = {}
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        name, qty, price = parts[1], int(parts[2]), float(parts[3])
        if name in stock:
            stock[name][0] += qty
            stock[name][1] = price
        else:
            stock[name] = [qty, price]
        print(f"เพิ่ม {name} (คงเหลือ {stock[name][0]})")
    elif cmd == "sell":
        name, qty = parts[1], int(parts[2])
        if name not in stock:
            print("ไม่มีสินค้า", name)
        elif stock[name][0] < qty:
            print(f"สินค้าไม่พอ: {name} เหลือ {stock[name][0]}")
        else:
            stock[name][0] -= qty
            print(f"ขาย {name} {qty} ชิ้น ได้ {qty * stock[name][1]:,.2f} บาท")
    elif cmd == "remove":
        if parts[1] in stock:
            del stock[parts[1]]
            print("ลบ", parts[1])
        else:
            print("ไม่มีสินค้า", parts[1])
    elif cmd == "report":
        if not stock:
            print("คลังว่าง")
        else:
            total = 0
            for name in sorted(stock):
                qty, price = stock[name]
                total += qty * price
                print(f"{name}: {qty} ชิ้น @ {price:,.2f}")
            print(f"มูลค่ารวม: {total:,.2f} บาท")
    elif cmd == "low":
        limit = int(parts[1])
        low = sorted(name for name in stock if stock[name][0] < limit)
        print("ใกล้หมด: " + ", ".join(low) if low else "ไม่มีสินค้าใกล้หมด")
`, wrong: [R`n = int(input())
stock = {}
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        name, qty, price = parts[1], int(parts[2]), float(parts[3])
        stock[name] = [qty, price]
        print(f"เพิ่ม {name} (คงเหลือ {stock[name][0]})")
    elif cmd == "sell":
        name, qty = parts[1], int(parts[2])
        if name not in stock:
            print("ไม่มีสินค้า", name)
        elif stock[name][0] < qty:
            print(f"สินค้าไม่พอ: {name} เหลือ {stock[name][0]}")
        else:
            stock[name][0] -= qty
            print(f"ขาย {name} {qty} ชิ้น ได้ {qty * stock[name][1]:,.2f} บาท")
    elif cmd == "remove":
        if parts[1] in stock:
            del stock[parts[1]]
            print("ลบ", parts[1])
        else:
            print("ไม่มีสินค้า", parts[1])
    elif cmd == "report":
        if not stock:
            print("คลังว่าง")
        else:
            total = 0
            for name in sorted(stock):
                qty, price = stock[name]
                total += qty * price
                print(f"{name}: {qty} ชิ้น @ {price:,.2f}")
            print(f"มูลค่ารวม: {total:,.2f} บาท")
    elif cmd == "low":
        limit = int(parts[1])
        low = sorted(name for name in stock if stock[name][0] <= limit)
        print("ใกล้หมด: " + ", ".join(low) if low else "ไม่มีสินค้าใกล้หมด")
`, R`n = int(input())
stock = {}
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "add":
        name, qty, price = parts[1], int(parts[2]), float(parts[3])
        if name in stock:
            stock[name][0] += qty
            stock[name][1] = price
        else:
            stock[name] = [qty, price]
        print(f"เพิ่ม {name} (คงเหลือ {stock[name][0]})")
    elif cmd == "sell":
        name, qty = parts[1], int(parts[2])
        if name not in stock:
            print("ไม่มีสินค้า", name)
        elif stock[name][0] < qty:
            print(f"สินค้าไม่พอ: {name} เหลือ {stock[name][0]}")
        else:
            stock[name][0] -= qty
            print(f"ขาย {name} {qty} ชิ้น ได้ {qty * stock[name][1]:.2f} บาท")
    elif cmd == "remove":
        if parts[1] in stock:
            del stock[parts[1]]
            print("ลบ", parts[1])
        else:
            print("ไม่มีสินค้า", parts[1])
    elif cmd == "report":
        if not stock:
            print("คลังว่าง")
        else:
            total = 0
            for name in sorted(stock):
                qty, price = stock[name]
                total += qty * price
                print(f"{name}: {qty} ชิ้น @ {price:.2f}")
            print(f"มูลค่ารวม: {total:.2f} บาท")
    elif cmd == "low":
        limit = int(parts[1])
        low = sorted(name for name in stock if stock[name][0] < limit)
        print("ใกล้หมด: " + ", ".join(low) if low else "ไม่มีสินค้าใกล้หมด")
`] },

  // ── Stage 17: ฟังก์ชันและอาร์กิวเมนต์ ──
  "py2-func/0": { sol: R`def greet(name):
    return f"สวัสดี, {name}!"
`, wrong: [R`def greet(name):
    print(f"สวัสดี, {name}!")
`] },
  "py2-func/1": { sol: R`def area_rectangle(w, h):
    """คืนพื้นที่สี่เหลี่ยม · ด้านติดลบเกิด ValueError"""
    if w < 0 or h < 0:
        raise ValueError("ความยาวต้องไม่ติดลบ")
    return w * h
`, wrong: [R`def area_rectangle(w, h):
    if w < 0:
        raise ValueError("ความยาวต้องไม่ติดลบ")
    return w * h
`, R`def area_rectangle(w, h):
    if w < 0 or h < 0:
        return 0
    return w * h
`] },
  "py2-func/2": { sol: R`def total(prices):
    s = 0
    for p in prices:
        s += p
    return s
`, wrong: [R`def total(prices):
    s = 0
    for p in prices:
        s += p
        return s
`] },
  "py2-func/3": { sol: R`def format_price(amount, currency="บาท"):
    return f"{amount:,.2f} {currency}"
`, wrong: [R`def format_price(amount, currency="บาท"):
    return f"{amount:.2f} {currency}"
`] },
  "py2-func/4": { sol: R`def make_tag(text, *, bold=False, italic=False):
    if italic:
        text = f"<i>{text}</i>"
    if bold:
        text = f"<b>{text}</b>"
    return text
`, wrong: [R`def make_tag(text, bold=False, italic=False):
    if italic:
        text = f"<i>{text}</i>"
    if bold:
        text = f"<b>{text}</b>"
    return text
`, R`def make_tag(text, *, bold=False, italic=False):
    if bold:
        text = f"<b>{text}</b>"
    if italic:
        text = f"<i>{text}</i>"
    return text
`] },
  "py2-func/5": { sol: R`def clamp(x, lo, hi):
    """คืน x ที่ถูกจำกัดให้อยู่ระหว่าง lo ถึง hi · lo มากกว่า hi เกิด ValueError"""
    if lo > hi:
        raise ValueError("lo ต้องไม่มากกว่า hi")
    if x < lo:
        return lo
    if x > hi:
        return hi
    return x
`, wrong: [R`def clamp(x, lo, hi):
    """คืน x ที่ถูกจำกัดให้อยู่ระหว่าง lo ถึง hi"""
    if x < lo:
        return lo
    if x > hi:
        return hi
    return x
`] },
  "py2-func/6": { sol: R`def has_negative(nums):
    for x in nums:
        if x < 0:
            return True
    return False
`, wrong: [R`def has_negative(nums):
    for x in nums:
        if x <= 0:
            return True
    return False
`] },
  "py2-func/7": { sol: R`def add_contact(book, name, phone):
    message = f"อัปเดต {name}" if name in book else f"เพิ่ม {name}"
    book[name] = phone
    return message


def find_contact(book, name):
    if name in book:
        return f"{name}: {book[name]}"
    return f"ไม่พบ {name}"


def delete_contact(book, name):
    if name in book:
        del book[name]
        return f"ลบ {name}"
    return f"ไม่พบ {name}"


def list_contacts(book):
    if not book:
        return ["(ว่าง)"]
    return [f"{name}: {book[name]}" for name in sorted(book)]


def run(commands):
    book = {}
    output = []
    for line in commands:
        parts = line.split()
        if parts[0] == "add":
            output.append(add_contact(book, parts[1], parts[2]))
        elif parts[0] == "find":
            output.append(find_contact(book, parts[1]))
        elif parts[0] == "delete":
            output.append(delete_contact(book, parts[1]))
        elif parts[0] == "list":
            output.extend(list_contacts(book))
    return output
`, wrong: [R`def add_contact(book, name, phone):
    book[name] = phone
    return f"เพิ่ม {name}"


def find_contact(book, name):
    if name in book:
        return f"{name}: {book[name]}"
    return f"ไม่พบ {name}"


def delete_contact(book, name):
    if name in book:
        del book[name]
        return f"ลบ {name}"
    return f"ไม่พบ {name}"


def run(commands):
    book = {}
    output = []
    for line in commands:
        parts = line.split()
        if parts[0] == "add":
            output.append(add_contact(book, parts[1], parts[2]))
        elif parts[0] == "find":
            output.append(find_contact(book, parts[1]))
        elif parts[0] == "delete":
            output.append(delete_contact(book, parts[1]))
        elif parts[0] == "list":
            if not book:
                output.append("(ว่าง)")
            for name in book:
                output.append(f"{name}: {book[name]}")
    return output
`] },
  // ── Stage 18: อาร์กิวเมนต์ขั้นสูงและขอบเขต ──
  "py2-scope/0": { sol: R`def average(*nums):
    if not nums:
        raise ValueError("ต้องมีอย่างน้อยหนึ่งค่า")
    return sum(nums) / len(nums)
`, wrong: [R`def average(*nums):
    if not nums:
        return 0
    return sum(nums) / len(nums)
`] },
  "py2-scope/1": { sol: R`def build_query(**params):
    return "&".join(f"{k}={params[k]}" for k in sorted(params))
`, wrong: [R`def build_query(**params):
    return "&".join(f"{k}={v}" for k, v in params.items())
`] },
  "py2-scope/2": { sol: R`def volume(w, h, d):
    return w * h * d

def volume_from(dims):
    if isinstance(dims, dict):
        return volume(**dims)
    return volume(*dims)
`, wrong: [R`def volume(w, h, d):
    return w * h * d

def volume_from(dims):
    if isinstance(dims, dict):
        return volume(*dims.values())
    return volume(*dims)
`] },
  "py2-scope/3": { sol: R`count = 0

def increment():
    global count
    count += 1

for _ in range(int(input())):
    increment()
print(count)
`, wrong: [R`count = 0

def increment():
    count = 1

for _ in range(int(input())):
    increment()
print(count)
`] },
  "py2-scope/4": { sol: R`def make_counter():
    count = 0
    def step():
        nonlocal count
        count += 1
        return count
    return step

c = make_counter()
d = make_counter()
print(c(), c(), d(), c())
`, wrong: [R`count = 0

def make_counter():
    def step():
        global count
        count += 1
        return count
    return step

c = make_counter()
d = make_counter()
print(c(), c(), d(), c())
`] },
  "py2-scope/5": { sol: R`def total_and_max(nums):
    total = 0
    for x in nums:
        total += x
    return total, max(nums)
`, wrong: [R`def total_and_max(nums):
    total = 0
    biggest = 0
    for x in nums:
        total += x
        if x > biggest:
            biggest = x
    return total, biggest
`] },

  // ── Stage 19: ฟังก์ชันเป็นค่า แลมบ์ดา และรีเคอร์ชัน ──
  "py2-firstclass/0": { sol: R`def add(a, b):
    return a + b


def sub(a, b):
    return a - b


def mul(a, b):
    return a * b


def div(a, b):
    return a / b


OPS = {"+": add, "-": sub, "*": mul, "/": div}


def calculate(op, a, b):
    if op not in OPS:
        raise ValueError(f"ไม่รู้จักเครื่องหมาย {op}")
    return OPS[op](a, b)
`, wrong: [R`def add(a, b):
    return a + b


def sub(a, b):
    return a - b


def mul(a, b):
    return a * b


def div(a, b):
    return a / b if b != 0 else 0


OPS = {"+": add, "-": sub, "*": mul, "/": div}


def calculate(op, a, b):
    if op not in OPS:
        raise ValueError(f"ไม่รู้จักเครื่องหมาย {op}")
    return OPS[op](a, b)
`, R`def add(a, b):
    return a + b


def sub(a, b):
    return a - b


def mul(a, b):
    return a * b


def div(a, b):
    return a / b


OPS = {"+": add, "-": sub, "*": mul, "/": div}


def calculate(op, a, b):
    return OPS.get(op, add)(a, b)
`] },
  "py2-firstclass/1": { sol: R`def sort_by_length(words):
    return sorted(words, key=lambda w: (len(w), w))
`, wrong: [R`def sort_by_length(words):
    return sorted(words, key=len)
`] },
  "py2-firstclass/2": { sol: R`def shipping_cost(weight):
    """ค่าส่งตามน้ำหนัก (กก.) · น้ำหนักไม่เกิน 0 หรือเกิน 20 เกิด ValueError"""
    if weight <= 0 or weight > 20:
        raise ValueError("น้ำหนักต้องมากกว่า 0 และไม่เกิน 20 กก.")
    if weight <= 1:
        return 40
    if weight <= 5:
        return 80
    return 150
`, wrong: [R`def shipping_cost(weight):
    """ค่าส่งตามน้ำหนัก (กก.)"""
    if weight > 20:
        raise ValueError("เกินขนาด")
    if weight <= 1:
        return 40
    if weight <= 5:
        return 80
    return 150
`] },
  "py2-firstclass/3": { sol: R`def flatten(nested):
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result
`, wrong: [R`def flatten(nested):
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(item)
        else:
            result.append(item)
    return result
`] },
  "py2-firstclass/4": { sol: R`def sum_digits(n):
    if n == 0:
        return 0
    return n % 10 + sum_digits(n // 10)
`, wrong: [R`def sum_digits(n):
    if n < 10:
        return 0
    return n % 10 + sum_digits(n // 10)
`] },
  "py2-firstclass/5": { sol: R`def clean_words(text):
    words = []
    for w in text.lower().split():
        w = w.strip(".,!?")
        if w:
            words.append(w)
    return words


def text_stats(text):
    words = clean_words(text)
    counts = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    top = sorted(counts.items(), key=lambda p: (-p[1], p[0]))[:3]
    return {"words": len(words), "unique": len(counts), "top": top}
`, wrong: [R`def text_stats(text):
    counts = {}
    for w in text.lower().split():
        w = w.strip(".,!?")
        if w:
            counts[w] = counts.get(w, 0) + 1
    top = sorted(counts.items(), key=lambda p: p[1], reverse=True)[:3]
    return {"words": sum(counts.values()), "unique": len(counts), "top": top}
`, R`def text_stats(text):
    counts = {}
    for w in text.lower().split():
        w = w.strip(".,!?")
        if w:
            counts[w] = counts.get(w, 0) + 1
    top = [[w, n] for w, n in sorted(counts.items(), key=lambda p: (-p[1], p[0]))[:3]]
    return {"words": sum(counts.values()), "unique": len(counts), "top": top}
`] },
  "py2-firstclass/6": { sol: R`def letter_grade(percent):
    if percent >= 80:
        return "A"
    if percent >= 70:
        return "B"
    if percent >= 60:
        return "C"
    if percent >= 50:
        return "D"
    return "F"


def is_correct(question, answer):
    return answer.strip().lower() == question["answer"].strip().lower()


def grade_quiz(questions, answers):
    if len(questions) != len(answers):
        raise ValueError("จำนวนคำตอบต้องเท่ากับจำนวนข้อ")
    score = 0
    total = 0
    wrong = []
    for number, (question, answer) in enumerate(zip(questions, answers), 1):
        total += question["points"]
        if is_correct(question, answer):
            score += question["points"]
        else:
            wrong.append(number)
    percent = round(score / total * 100, 1) if total else 0.0
    return {"score": score, "max": total, "percent": percent, "wrong": wrong, "grade": letter_grade(percent)}
`, wrong: [R`def grade_quiz(questions, answers):
    score = 0
    total = 0
    wrong = []
    for number, (question, answer) in enumerate(zip(questions, answers), 1):
        total += question["points"]
        if answer.strip().lower() == question["answer"]:
            score += question["points"]
        else:
            wrong.append(number)
    percent = round(score / total * 100, 1) if total else 0.0
    grade = "A" if percent >= 80 else "B" if percent >= 70 else "C" if percent >= 60 else "D" if percent >= 50 else "F"
    return {"score": score, "max": total, "percent": percent, "wrong": wrong, "grade": grade}
`, R`def grade_quiz(questions, answers):
    if len(questions) != len(answers):
        raise ValueError("จำนวนคำตอบต้องเท่ากับจำนวนข้อ")
    score = 0
    total = 0
    wrong = []
    for number, (question, answer) in enumerate(zip(questions, answers), 1):
        total += question["points"]
        if answer == question["answer"]:
            score += question["points"]
        else:
            wrong.append(number)
    percent = round(score / total * 100, 1) if total else 0.0
    grade = "A" if percent >= 80 else "B" if percent >= 70 else "C" if percent >= 60 else "D" if percent >= 50 else "F"
    return {"score": score, "max": total, "percent": percent, "wrong": wrong, "grade": grade}
`, R`def grade_quiz(questions, answers):
    if len(questions) != len(answers):
        raise ValueError("จำนวนคำตอบต้องเท่ากับจำนวนข้อ")
    score = 0
    total = 0
    wrong = []
    for number, (question, answer) in enumerate(zip(questions, answers), 1):
        total += question["points"]
        if answer.strip().lower() == question["answer"]:
            score += question["points"]
        else:
            wrong.append(number)
    percent = round(score / total * 100, 1) if total else 0.0
    grade = "A" if percent > 80 else "B" if percent > 70 else "C" if percent > 60 else "D" if percent > 50 else "F"
    return {"score": score, "max": total, "percent": percent, "wrong": wrong, "grade": grade}
`] },
  // ── Stage 20: โมเดลวัตถุของ Python ──
  "py2-objmodel/0": { sol: R`def add_bonus(scores, bonus):
    return [s + bonus for s in scores]

original = [int(x) for x in input().split()]
new = add_bonus(original, 5)
print("เดิม:", original)
print("ใหม่:", new)
`, wrong: [R`def add_bonus(scores, bonus):
    result = scores
    for i in range(len(result)):
        result[i] = result[i] + bonus
    return result[:]

original = [int(x) for x in input().split()]
new = add_bonus(original, 5)
print("เดิม:", original)
print("ใหม่:", new)
`] },
  "py2-objmodel/1": { sol: R`def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart

print(add_item("ปากกา"))
print(add_item("สมุด"))
print(add_item("ยางลบ", ["ไม้บรรทัด"]))
shared = []
add_item("x", shared)
print(shared)
`, wrong: [R`def add_item(item, cart=None):
    if not cart:
        cart = []
    cart.append(item)
    return cart

print(add_item("ปากกา"))
print(add_item("สมุด"))
print(add_item("ยางลบ", ["ไม้บรรทัด"]))
shared = []
add_item("x", shared)
print(shared)
`] },
  "py2-objmodel/2": { sol: R`import copy

def clone_board(board):
    return copy.deepcopy(board)

board = [[0, 0], [0, 0]]
clone = clone_board(board)
clone[0][0] = 1
print("ต้นฉบับ:", board)
print("สำเนา:", clone)
`, wrong: [R`import copy

def clone_board(board):
    return list(board)

board = [[0, 0], [0, 0]]
clone = clone_board(board)
clone[0][0] = 1
print("ต้นฉบับ:", board)
print("สำเนา:", clone)
`] },
  "py2-objmodel/3": { sol: R`multipliers = [lambda x, i=i: x * i for i in range(1, 4)]
n = int(input())
print([m(n) for m in multipliers])
`, wrong: [R`multipliers = [lambda x, i=i: x * i for i in range(3)]
n = int(input())
print([m(n) for m in multipliers])
`] },
  "py2-objmodel/4": { sol: R`def describe(a, b):
    if a is b:
        return "เท่ากันและเป็นวัตถุเดียวกัน"
    if a == b:
        return "เท่ากันแต่คนละวัตถุ"
    return "ไม่เท่ากัน"
`, wrong: [R`def describe(a, b):
    if a == b:
        return "เท่ากันแต่คนละวัตถุ"
    if a is b:
        return "เท่ากันและเป็นวัตถุเดียวกัน"
    return "ไม่เท่ากัน"
`] },

  // ── Stage 21: ข้อผิดพลาดและ Exception ──
  "py2-except/0": { sol: R`def safe_int(text, default=0):
    try:
        return int(text)
    except ValueError:
        return default
`, wrong: [R`def safe_int(text, default=0):
    try:
        return int(text)
    except Exception:
        return default
`, R`def safe_int(text, default=0):
    if text.strip().lstrip("-").isdigit():
        return int(text)
    return 0
`] },
  "py2-except/1": { sol: R`def average(nums):
    try:
        return sum(nums) / len(nums)
    except ZeroDivisionError:
        return 0.0
`, wrong: [R`def average(nums):
    try:
        return sum(nums) / len(nums)
    except (ZeroDivisionError, TypeError):
        return 0.0
`] },
  "py2-except/2": { sol: R`processed = 0
success = 0
while True:
    line = input()
    if line == "end":
        break
    try:
        a, b = line.split()
        result = float(a) / float(b)
    except ZeroDivisionError:
        print("หารด้วยศูนย์ไม่ได้")
    except ValueError:
        print("ข้อมูลผิด:", line)
    else:
        print(f"ผลลัพธ์ {result:.2f}")
        success += 1
    finally:
        processed += 1
print(f"ประมวลผล {processed} บรรทัด · สำเร็จ {success}")
`, wrong: [R`processed = 0
success = 0
while True:
    line = input()
    if line == "end":
        break
    try:
        a, b = line.split()
        result = float(a) / float(b)
        print(f"ผลลัพธ์ {result:.2f}")
        success += 1
        processed += 1
    except ZeroDivisionError:
        print("หารด้วยศูนย์ไม่ได้")
    except ValueError:
        print("ข้อมูลผิด:", line)
print(f"ประมวลผล {processed} บรรทัด · สำเร็จ {success}")
`] },
  "py2-except/3": { sol: R`class InsufficientFundsError(ValueError):
    pass


def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("จำนวนเงินต้องมากกว่า 0")
    if amount > balance:
        raise InsufficientFundsError("ยอดเงินไม่พอ")
    return balance - amount
`, wrong: [R`class InsufficientFundsError(ValueError):
    pass


def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError("ยอดเงินไม่พอ")
    if amount <= 0:
        raise InsufficientFundsError("จำนวนเงินไม่ถูกต้อง")
    return balance - amount
`, R`def withdraw(balance, amount):
    if amount <= 0 or amount > balance:
        raise ValueError("ถอนไม่ได้")
    return balance - amount
`] },
  "py2-except/4": { sol: R`class ConfigError(Exception):
    pass

def parse_config(lines):
    config = {}
    for n, line in enumerate(lines, 1):
        try:
            key, value = line.split("=")
            config[key.strip()] = int(value)
        except ValueError as err:
            raise ConfigError(f"บรรทัด {n} ไม่ถูกต้อง: {line}") from err
    return config

lines = []
while True:
    line = input()
    if line == "end":
        break
    lines.append(line)
try:
    print(parse_config(lines))
except ConfigError as e:
    print("ConfigError:", e)
    print("สาเหตุ:", type(e.__cause__).__name__)
`, wrong: [R`class ConfigError(Exception):
    pass

def parse_config(lines):
    config = {}
    for n, line in enumerate(lines, 1):
        try:
            key, value = line.split("=")
            config[key.strip()] = int(value)
        except ValueError:
            raise ConfigError(f"บรรทัด {n} ไม่ถูกต้อง: {line}") from None
    return config

lines = []
while True:
    line = input()
    if line == "end":
        break
    lines.append(line)
try:
    print(parse_config(lines))
except ConfigError as e:
    print("ConfigError:", e)
    print("สาเหตุ:", type(e.__cause__).__name__)
`] },
  "py2-except/5": { sol: R`def last_n(items, n):
    return [items[len(items) - 1 - i] for i in range(n)]
`, wrong: [R`def last_n(items, n):
    return items[-n:]
`] },
  "py2-except/6": { sol: R`def parse_score(text):
    score = int(text)
    if not 0 <= score <= 100:
        raise ValueError("คะแนนต้องอยู่ระหว่าง 0 ถึง 100")
    return score
`, wrong: [R`def parse_score(text):
    try:
        score = int(text)
    except ValueError:
        return -1
    if not 0 <= score <= 100:
        raise ValueError("คะแนนต้องอยู่ระหว่าง 0 ถึง 100")
    return score
`, R`def parse_score(text):
    score = int(text)
    if not 0 < score <= 100:
        raise ValueError("คะแนนต้องอยู่ระหว่าง 0 ถึง 100")
    return score
`] },
  // ── Stage 22: ไฟล์และข้อมูล ──
  "py2-files/0": { sol: R`try:
    with open("notes.txt", encoding="utf-8") as f:
        text = f.read()
except FileNotFoundError:
    print("ไม่พบไฟล์ notes.txt")
else:
    print(f"บรรทัด: {len(text.splitlines())} · คำ: {len(text.split())}")
`, wrong: [R`try:
    with open("notes.txt", encoding="utf-8") as f:
        text = f.read()
except FileNotFoundError:
    print("ไม่พบไฟล์ notes.txt")
else:
    print(f"บรรทัด: {text.count(chr(10))} · คำ: {len(text.split())}")
`] },
  "py2-files/1": { sol: R`n = int(input())
with open("log.txt", "a", encoding="utf-8") as f:
    for _ in range(n):
        f.write(f"- {input()}\n")
with open("log.txt", encoding="utf-8") as f:
    print(f.read(), end="")
`, wrong: [R`n = int(input())
with open("log.txt", "w", encoding="utf-8") as f:
    for _ in range(n):
        f.write(f"- {input()}\n")
with open("log.txt", encoding="utf-8") as f:
    print(f.read(), end="")
`] },
  "py2-files/2": { sol: R`rows = int(input())
with open("report.txt", "w", encoding="utf-8") as f:
    for i in range(1, rows + 1):
        f.write(f"แถวที่ {i}\n")
with open("report.txt", encoding="utf-8") as r:
    print(r.read(), end="")
print("จบรายงาน")
`, wrong: [R`rows = int(input())
f = open("report.txt", "w", encoding="utf-8")
for i in range(1, rows + 1):
    f.write(f"แถวที่ {i}\n")
f.flush
with open("report.txt", encoding="utf-8") as r:
    print(r.read(), end="")
print("จบรายงาน")
`] },
  "py2-files/3": { sol: R`from pathlib import Path

inbox = Path("inbox")
if not inbox.exists():
    print("ไม่มีโฟลเดอร์ inbox")
else:
    counts = {}
    for p in inbox.iterdir():
        if p.is_file():
            ext = p.suffix.lower().lstrip(".") or "(ไม่มีนามสกุล)"
            counts[ext] = counts.get(ext, 0) + 1
    for ext in sorted(counts):
        print(f"{ext}: {counts[ext]}")
`, wrong: [R`from pathlib import Path

inbox = Path("inbox")
if not inbox.exists():
    print("ไม่มีโฟลเดอร์ inbox")
else:
    counts = {}
    for p in inbox.iterdir():
        if p.is_file():
            ext = p.suffix.lstrip(".") or "(ไม่มีนามสกุล)"
            counts[ext] = counts.get(ext, 0) + 1
    for ext in sorted(counts):
        print(f"{ext}: {counts[ext]}")
`] },
  "py2-files/4": { sol: R`import csv

try:
    with open("grades.csv", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
except FileNotFoundError:
    print("ไม่พบไฟล์ grades.csv")
else:
    valid = []
    bad = 0
    for row in rows:
        try:
            valid.append((row["name"], int(row["score"])))
        except ValueError:
            bad += 1
    print(f"นักเรียน: {len(valid)} คน · ข้อมูลผิด: {bad}")
    if not valid:
        print("ไม่มีข้อมูลที่ใช้ได้")
    else:
        scores = [s for _, s in valid]
        best = valid[0]
        for item in valid:
            if item[1] > best[1]:
                best = item
        print(f"เฉลี่ย: {sum(scores) / len(scores):.2f}")
        print(f"สูงสุด: {best[0]} ({best[1]})")
        print(f"ผ่าน: {sum(1 for s in scores if s >= 50)} คน")
`, wrong: [R`try:
    with open("grades.csv", encoding="utf-8") as f:
        lines = f.read().splitlines()[1:]
except FileNotFoundError:
    print("ไม่พบไฟล์ grades.csv")
else:
    valid = []
    bad = 0
    for line in lines:
        parts = line.split(",")
        try:
            valid.append((parts[0], int(parts[1])))
        except (ValueError, IndexError):
            bad += 1
    print(f"นักเรียน: {len(valid)} คน · ข้อมูลผิด: {bad}")
    if not valid:
        print("ไม่มีข้อมูลที่ใช้ได้")
    else:
        scores = [s for _, s in valid]
        best = valid[0]
        for item in valid:
            if item[1] > best[1]:
                best = item
        print(f"เฉลี่ย: {sum(scores) / len(scores):.2f}")
        print(f"สูงสุด: {best[0]} ({best[1]})")
        print(f"ผ่าน: {sum(1 for s in scores if s >= 50)} คน")
`] },
  "py2-files/5": { sol: R`import json

name = input()
score = int(input())
with open("profile.json", "w", encoding="utf-8") as f:
    json.dump({"name": name, "score": score}, f, ensure_ascii=False)
with open("profile.json", encoding="utf-8") as f:
    print(f.read())
with open("profile.json", encoding="utf-8") as f:
    print(json.load(f)["name"])
`, wrong: [R`import json

name = input()
score = int(input())
with open("profile.json", "w", encoding="utf-8") as f:
    json.dump({"name": name, "score": score}, f, ensure_ascii=False, indent=2)
with open("profile.json", encoding="utf-8") as f:
    print(f.read())
with open("profile.json", encoding="utf-8") as f:
    print(json.load(f)["name"])
`] },
  "py2-files/6": { sol: R`import json
from pathlib import Path

PATH = Path("expenses.json")


def load():
    try:
        return json.loads(PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        print("ไฟล์เสีย เริ่มใหม่")
        return []


def save(expenses):
    PATH.write_text(json.dumps(expenses, ensure_ascii=False, indent=2), encoding="utf-8")


expenses = load()
while True:
    parts = input().split()
    cmd = parts[0]
    if cmd == "end":
        break
    if cmd == "add":
        item, amount, category = parts[1], float(parts[2]), parts[3]
        expenses.append({"item": item, "amount": amount, "category": category})
        print(f"เพิ่ม {item} {amount:.2f}")
    elif cmd == "total":
        print(f"รวม: {sum(e['amount'] for e in expenses):.2f} บาท")
    elif cmd == "by-category":
        totals = {}
        for e in expenses:
            totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
        if not totals:
            print("(ไม่มีรายการ)")
        for category in sorted(totals):
            print(f"{category}: {totals[category]:.2f}")
    elif cmd == "save":
        save(expenses)
        print(f"บันทึก {len(expenses)} รายการ")
    elif cmd == "reload":
        expenses = load()
        print(f"โหลด {len(expenses)} รายการ")
`, wrong: [R`import json
from pathlib import Path

PATH = Path("expenses.json")


def load():
    try:
        return json.loads(PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []


def save(expenses):
    PATH.write_text(json.dumps(expenses, ensure_ascii=False, indent=2), encoding="utf-8")


expenses = load()
while True:
    parts = input().split()
    cmd = parts[0]
    if cmd == "end":
        break
    if cmd == "add":
        item, amount, category = parts[1], float(parts[2]), parts[3]
        expenses.append({"item": item, "amount": amount, "category": category})
        print(f"เพิ่ม {item} {amount:.2f}")
    elif cmd == "total":
        print(f"รวม: {sum(e['amount'] for e in expenses):.2f} บาท")
    elif cmd == "by-category":
        totals = {}
        for e in expenses:
            totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
        if not totals:
            print("(ไม่มีรายการ)")
        for category in sorted(totals):
            print(f"{category}: {totals[category]:.2f}")
    elif cmd == "save":
        save(expenses)
        print(f"บันทึก {len(expenses)} รายการ")
    elif cmd == "reload":
        expenses = load()
        print(f"โหลด {len(expenses)} รายการ")
`, R`import json
from pathlib import Path

PATH = Path("expenses.json")


def load():
    try:
        return json.loads(PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        print("ไฟล์เสีย เริ่มใหม่")
        return []


expenses = load()
while True:
    parts = input().split()
    cmd = parts[0]
    if cmd == "end":
        break
    if cmd == "add":
        item, amount, category = parts[1], float(parts[2]), parts[3]
        expenses.append({"item": item, "amount": amount, "category": category})
        print(f"เพิ่ม {item} {amount:.2f}")
    elif cmd == "total":
        print(f"รวม: {sum(e['amount'] for e in expenses):.2f} บาท")
    elif cmd == "by-category":
        totals = {}
        for e in expenses:
            totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
        if not totals:
            print("(ไม่มีรายการ)")
        for category in sorted(totals):
            print(f"{category}: {totals[category]:.2f}")
    elif cmd == "save":
        print(f"บันทึก {len(expenses)} รายการ")
    elif cmd == "reload":
        expenses = load()
        print(f"โหลด {len(expenses)} รายการ")
`] },

  // ── Stage 23: โมดูลและแพ็กเกจ ──
  "py2-modules/0": { sol: R`import geometry

r = float(input())
print(f"{geometry.circle_area(r):.2f}")
print(f"{geometry.circle_perimeter(r):.2f}")
# === geometry.py ===
import math

def circle_area(r):
    return math.pi * r ** 2

def circle_perimeter(r):
    return 2 * math.pi * r
`, wrong: [R`import geometry

r = float(input())
print(f"{geometry.circle_area(r):.2f}")
print(f"{geometry.circle_perimeter(r):.2f}")
# === geometry.py ===
def circle_area(r):
    return 3.14 * r ** 2

def circle_perimeter(r):
    return 2 * 3.14 * r
`] },
  "py2-modules/1": { sol: R`from textutils import shout

print(shout(input()))
# === textutils.py ===
def shout(text):
    return text.upper() + "!"

if __name__ == "__main__":
    print("ทดสอบ:", shout("hi"))
`, wrong: [R`from textutils import shout

print(shout(input()))
# === textutils.py ===
def shout(text):
    return text.upper() + "!"

if __name__ == "textutils":
    print("ทดสอบ:", shout("hi"))
`] },
  "py2-modules/2": { sol: R`from shop import with_vat

print(with_vat(float(input())))
# === shop/__init__.py ===
from .tax import with_vat
# === shop/tax.py ===
VAT = 0.07

def with_vat(price):
    return round(price * (1 + VAT), 2)
`, wrong: [R`from shop import with_vat

print(with_vat(float(input())))
# === shop/__init__.py ===
def with_vat(price):
    return price * 1.07
# === shop/tax.py ===
VAT = 0.07
`] },
  "py2-modules/3": { sol: R`from todo import load_tasks, save_tasks, add_task, complete_task, format_tasks

tasks = load_tasks()
while True:
    line = input()
    if line == "end":
        break
    cmd, _, rest = line.partition(" ")
    if cmd == "add":
        print(add_task(tasks, rest))
    elif cmd == "done":
        print(complete_task(tasks, int(rest)))
    elif cmd == "list":
        for row in format_tasks(tasks):
            print(row)
    elif cmd == "save":
        save_tasks(tasks)
        print(f"บันทึก {len(tasks)} งาน")
# === todo/__init__.py ===
from .storage import load_tasks, save_tasks
from .commands import add_task, complete_task, format_tasks
# === todo/storage.py ===
import json
from pathlib import Path

PATH = Path("tasks.json")


def load_tasks():
    try:
        return json.loads(PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []


def save_tasks(tasks):
    PATH.write_text(json.dumps(tasks, ensure_ascii=False, indent=2), encoding="utf-8")
# === todo/commands.py ===
def add_task(tasks, text):
    tasks.append({"text": text, "done": False})
    return f"เพิ่ม #{len(tasks)}: {text}"


def complete_task(tasks, number):
    if not 1 <= number <= len(tasks):
        return f"ไม่พบงาน #{number}"
    tasks[number - 1]["done"] = True
    return f"เสร็จ #{number}"


def format_tasks(tasks):
    if not tasks:
        return ["(ไม่มีงาน)"]
    return [f"[{'x' if t['done'] else ' '}] #{i} {t['text']}" for i, t in enumerate(tasks, 1)]
`, wrong: [R`from todo import load_tasks, save_tasks, add_task, complete_task, format_tasks

tasks = load_tasks()
while True:
    line = input()
    if line == "end":
        break
    cmd, _, rest = line.partition(" ")
    if cmd == "add":
        print(add_task(tasks, rest))
    elif cmd == "done":
        print(complete_task(tasks, int(rest)))
    elif cmd == "list":
        for row in format_tasks(tasks):
            print(row)
    elif cmd == "save":
        save_tasks(tasks)
        print(f"บันทึก {len(tasks)} งาน")
# === todo/__init__.py ===
from .storage import load_tasks, save_tasks
from .commands import add_task, complete_task, format_tasks
# === todo/storage.py ===
import json
from pathlib import Path

PATH = Path("tasks.json")


def load_tasks():
    try:
        return json.loads(PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []


def save_tasks(tasks):
    PATH.write_text(json.dumps(tasks, ensure_ascii=False, indent=2), encoding="utf-8")
# === todo/commands.py ===
def add_task(tasks, text):
    tasks.append({"text": text, "done": False})
    return f"เพิ่ม #{len(tasks)}: {text}"


def complete_task(tasks, number):
    try:
        tasks[number - 1]["done"] = True
    except IndexError:
        return f"ไม่พบงาน #{number}"
    return f"เสร็จ #{number}"


def format_tasks(tasks):
    if not tasks:
        return ["(ไม่มีงาน)"]
    return [f"[{'x' if t['done'] else ' '}] #{i} {t['text']}" for i, t in enumerate(tasks, 1)]
`] },
  "py2-modules/4": { sol: R`from loganalyzer import analyze

try:
    result = analyze("server.log")
except FileNotFoundError:
    print("ไม่พบไฟล์ล็อก")
else:
    counts = result["counts"]
    print(" · ".join(f"{level}: {counts[level]}" for level in ("INFO", "WARNING", "ERROR")))
    print(f"บรรทัดผิดรูปแบบ: {result['malformed']}")
    if result["first"]:
        print(f"ช่วงเวลา: {result['first']} → {result['last']}")
    else:
        print("ช่วงเวลา: -")
    if result["top_error"]:
        message, n = result["top_error"]
        print(f"ข้อผิดพลาดที่พบบ่อยที่สุด: {message} ({n} ครั้ง)")
    else:
        print("ไม่มีข้อผิดพลาด")
# === loganalyzer.py ===
LEVELS = ("INFO", "WARNING", "ERROR")


def parse_line(line):
    """คืน (เวลา, ระดับ, ข้อความ) หรือ None ถ้าผิดรูปแบบ"""
    parts = line.split(maxsplit=3)
    if len(parts) != 4 or parts[2] not in LEVELS:
        return None
    date, time, level, message = parts
    return f"{date} {time}", level, message


def analyze(path):
    counts = {level: 0 for level in LEVELS}
    errors = {}
    malformed = 0
    first = last = None
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            entry = parse_line(line)
            if entry is None:
                malformed += 1
                continue
            stamp, level, message = entry
            counts[level] += 1
            first = first or stamp
            last = stamp
            if level == "ERROR":
                errors[message] = errors.get(message, 0) + 1
    top = min(errors.items(), key=lambda p: (-p[1], p[0])) if errors else None
    return {"counts": counts, "malformed": malformed, "first": first, "last": last, "top_error": top}
`, wrong: [R`from loganalyzer import analyze

try:
    result = analyze("server.log")
except FileNotFoundError:
    print("ไม่พบไฟล์ล็อก")
else:
    counts = result["counts"]
    print(" · ".join(f"{level}: {counts[level]}" for level in ("INFO", "WARNING", "ERROR")))
    print(f"บรรทัดผิดรูปแบบ: {result['malformed']}")
    if result["first"]:
        print(f"ช่วงเวลา: {result['first']} → {result['last']}")
    else:
        print("ช่วงเวลา: -")
    if result["top_error"]:
        message, n = result["top_error"]
        print(f"ข้อผิดพลาดที่พบบ่อยที่สุด: {message} ({n} ครั้ง)")
    else:
        print("ไม่มีข้อผิดพลาด")
# === loganalyzer.py ===
LEVELS = ("INFO", "WARNING", "ERROR")


def analyze(path):
    counts = {level: 0 for level in LEVELS}
    errors = {}
    malformed = 0
    first = last = None
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(" ")
            if len(parts) < 3 or parts[2] not in LEVELS:
                malformed += 1
                continue
            stamp = f"{parts[0]} {parts[1]}"
            message = " ".join(parts[3:])
            counts[parts[2]] += 1
            first = first or stamp
            last = stamp
            if parts[2] == "ERROR":
                errors[message] = errors.get(message, 0) + 1
    top = max(errors.items(), key=lambda p: p[1]) if errors else None
    return {"counts": counts, "malformed": malformed, "first": first, "last": last, "top_error": top}
`] },

  // ── Stage 24: คลาสและวัตถุ ──
  "py2-oop1/0": { sol: R`class Rectangle:
    def __init__(self, w, h):
        if w <= 0 or h <= 0:
            raise ValueError("ด้านต้องมากกว่า 0")
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

w, h = (float(x) for x in input().split())
try:
    r = Rectangle(w, h)
except ValueError as e:
    print("ข้อมูลผิด:", e)
else:
    print(f"พื้นที่ {r.area():.2f} · เส้นรอบรูป {r.perimeter():.2f}")
`, wrong: [R`class Rectangle:
    def __init__(self, w, h):
        if w < 0 or h < 0:
            raise ValueError("ด้านต้องมากกว่า 0")
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

w, h = (float(x) for x in input().split())
try:
    r = Rectangle(w, h)
except ValueError as e:
    print("ข้อมูลผิด:", e)
else:
    print(f"พื้นที่ {r.area():.2f} · เส้นรอบรูป {r.perimeter():.2f}")
`] },
  "py2-oop1/1": { sol: R`import math

class Circle:
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r ** 2

c = Circle(float(input()))
print(f"{c.area():.2f}")
`, wrong: [R`import math

class Circle:
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r * 2

c = Circle(float(input()))
print(f"{c.area():.2f}")
`] },
  "py2-oop1/2": { sol: R`class Cart:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

a = Cart()
b = Cart()
for item in input().split():
    a.add(item)
b.add("ของแถม")
print("A:", a.items)
print("B:", b.items)
`, wrong: [R`class Cart:
    items = []

    def __init__(self):
        self.items.clear()

    def add(self, item):
        self.items.append(item)

a = Cart()
b = Cart()
for item in input().split():
    a.add(item)
b.add("ของแถม")
print("A:", a.items)
print("B:", b.items)
`] },
  "py2-oop1/3": { sol: R`class Temperature:
    ABSOLUTE_ZERO = -273.15

    def __init__(self, celsius=0):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < self.ABSOLUTE_ZERO:
            raise ValueError("ต่ำกว่าศูนย์สัมบูรณ์")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5 / 9

t = Temperature()
while True:
    parts = input().split()
    if parts[0] == "end":
        break
    try:
        if parts[0] == "c":
            t.celsius = float(parts[1])
        elif parts[0] == "f":
            t.fahrenheit = float(parts[1])
        elif parts[0] == "show":
            print(f"{t.celsius:.2f}°C = {t.fahrenheit:.2f}°F")
    except ValueError as e:
        print("ข้อผิดพลาด:", e)
`, wrong: [R`class Temperature:
    def __init__(self, celsius=0):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("ต่ำกว่าศูนย์สัมบูรณ์")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5 / 9

t = Temperature()
while True:
    parts = input().split()
    if parts[0] == "end":
        break
    try:
        if parts[0] == "c":
            t.celsius = float(parts[1])
        elif parts[0] == "f":
            t.fahrenheit = float(parts[1])
        elif parts[0] == "show":
            print(f"{t.celsius:.2f}°C = {t.fahrenheit:.2f}°F")
    except ValueError as e:
        print("ข้อผิดพลาด:", e)
`] },
  "py2-oop1/4": { sol: R`class Counter:
    created = 0

    def __init__(self, name):
        Counter.created += 1
        self.name = name
        self.count = 0

    def click(self):
        self.count += 1

counters = {}
while True:
    parts = input().split()
    if parts[0] == "end":
        break
    if parts[0] == "new":
        counters[parts[1]] = Counter(parts[1])
    elif parts[0] == "click":
        counters[parts[1]].click()
    elif parts[0] == "show":
        for c in counters.values():
            print(f"{c.name}: {c.count}")
        print(f"สร้างทั้งหมด {Counter.created} ตัว")
`, wrong: [R`class Counter:
    created = 0

    def __init__(self, name):
        self.created += 1
        self.name = name
        self.count = 0

    def click(self):
        self.count += 1

counters = {}
while True:
    parts = input().split()
    if parts[0] == "end":
        break
    if parts[0] == "new":
        counters[parts[1]] = Counter(parts[1])
    elif parts[0] == "click":
        counters[parts[1]].click()
    elif parts[0] == "show":
        for c in counters.values():
            print(f"{c.name}: {c.count}")
        print(f"สร้างทั้งหมด {Counter.created} ตัว")
`] },
  "py2-oop1/5": { sol: R`class History:
    def __init__(self):
        self._actions = []

    def do(self, action):
        self._actions.append(action)

    def undo(self):
        if not self._actions:
            raise IndexError("ไม่มีอะไรให้เลิกทำ")
        return self._actions.pop()

    @property
    def can_undo(self):
        return bool(self._actions)

    @property
    def size(self):
        return len(self._actions)

h = History()
while True:
    line = input()
    if line == "end":
        break
    cmd, _, arg = line.partition(" ")
    if cmd == "do":
        h.do(arg)
        print("ทำ:", arg)
    elif cmd == "undo":
        try:
            print("เลิกทำ:", h.undo())
        except IndexError as e:
            print(e)
    elif cmd == "status":
        print(f"เลิกทำได้: {h.can_undo} · ประวัติ {h.size} รายการ")
`, wrong: [R`class History:
    def __init__(self):
        self._actions = []

    def do(self, action):
        self._actions.append(action)

    def undo(self):
        if not self._actions:
            raise IndexError("ไม่มีอะไรให้เลิกทำ")
        return self._actions.pop(0)

    @property
    def can_undo(self):
        return bool(self._actions)

    @property
    def size(self):
        return len(self._actions)

h = History()
while True:
    line = input()
    if line == "end":
        break
    cmd, _, arg = line.partition(" ")
    if cmd == "do":
        h.do(arg)
        print("ทำ:", arg)
    elif cmd == "undo":
        try:
            print("เลิกทำ:", h.undo())
        except IndexError as e:
            print(e)
    elif cmd == "status":
        print(f"เลิกทำได้: {h.can_undo} · ประวัติ {h.size} รายการ")
`] },
  "py2-oop1/6": { sol: R`class InsufficientFundsError(ValueError):
    pass


class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = 0
        self.history = []
        self._balance = balance
        self.history.append(f"เปิด {balance:.2f}")

    @property
    def balance(self):
        return self._balance

    @staticmethod
    def _check_amount(amount):
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")

    def deposit(self, amount, label="ฝาก"):
        self._check_amount(amount)
        self._balance += amount
        self.history.append(f"{label} {amount:.2f}")

    def withdraw(self, amount, label="ถอน"):
        self._check_amount(amount)
        if amount > self._balance:
            raise InsufficientFundsError("ยอดเงินไม่พอ")
        self._balance -= amount
        self.history.append(f"{label} {amount:.2f}")

    def transfer(self, other, amount):
        self.withdraw(amount, "โอนออก")
        other.deposit(amount, "โอนเข้า")


accounts = {}


def get(name):
    if name not in accounts:
        raise KeyError(name)
    return accounts[name]


while True:
    parts = input().split()
    if parts[0] == "end":
        break
    cmd = parts[0]
    try:
        if cmd == "open":
            if parts[1] in accounts:
                print(f"มีบัญชี {parts[1]} แล้ว")
                continue
            accounts[parts[1]] = BankAccount(parts[1], float(parts[2]))
            print(f"เปิดบัญชี {parts[1]} ยอด {accounts[parts[1]].balance:.2f}")
        elif cmd == "deposit":
            acc = get(parts[1])
            acc.deposit(float(parts[2]))
            print(f"ฝาก {parts[1]} {float(parts[2]):.2f} · ยอด {acc.balance:.2f}")
        elif cmd == "withdraw":
            acc = get(parts[1])
            acc.withdraw(float(parts[2]))
            print(f"ถอน {parts[1]} {float(parts[2]):.2f} · ยอด {acc.balance:.2f}")
        elif cmd == "transfer":
            src, dst = get(parts[1]), get(parts[2])
            src.transfer(dst, float(parts[3]))
            print(f"โอน {parts[1]} → {parts[2]} {float(parts[3]):.2f}")
        elif cmd == "history":
            for entry in get(parts[1]).history:
                print(entry)
    except KeyError as e:
        print("ไม่พบบัญชี", e.args[0])
    except ValueError as e:
        print(e)
`, wrong: [R`class InsufficientFundsError(ValueError):
    pass


class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance
        self.history = [f"เปิด {balance:.2f}"]

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount, label="ฝาก"):
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")
        self._balance += amount
        self.history.append(f"{label} {amount:.2f}")

    def withdraw(self, amount, label="ถอน"):
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")
        if amount > self._balance:
            raise InsufficientFundsError("ยอดเงินไม่พอ")
        self._balance -= amount
        self.history.append(f"{label} {amount:.2f}")


accounts = {}
while True:
    parts = input().split()
    if parts[0] == "end":
        break
    cmd = parts[0]
    try:
        if cmd == "open":
            if parts[1] in accounts:
                print(f"มีบัญชี {parts[1]} แล้ว")
                continue
            accounts[parts[1]] = BankAccount(parts[1], float(parts[2]))
            print(f"เปิดบัญชี {parts[1]} ยอด {accounts[parts[1]].balance:.2f}")
        elif cmd == "deposit":
            acc = accounts[parts[1]]
            acc.deposit(float(parts[2]))
            print(f"ฝาก {parts[1]} {float(parts[2]):.2f} · ยอด {acc.balance:.2f}")
        elif cmd == "withdraw":
            acc = accounts[parts[1]]
            acc.withdraw(float(parts[2]))
            print(f"ถอน {parts[1]} {float(parts[2]):.2f} · ยอด {acc.balance:.2f}")
        elif cmd == "transfer":
            accounts[parts[1]].withdraw(float(parts[3]), "โอนออก")
            accounts[parts[2]].deposit(float(parts[3]), "โอนเข้า")
            print(f"โอน {parts[1]} → {parts[2]} {float(parts[3]):.2f}")
        elif cmd == "history":
            for entry in accounts[parts[1]].history:
                print(entry)
    except KeyError as e:
        print("ไม่พบบัญชี", e.args[0])
    except ValueError as e:
        print(e)
`] },

  // ── Stage 25: OOP ขั้นสูงและ dataclass ──
  "py2-oop2/0": { sol: R`import math

class Shape:
    name = "รูปทรง"

    def area(self):
        raise NotImplementedError


class Circle(Shape):
    def __init__(self, r):
        self.name = "วงกลม"
        self.r = r

    def area(self):
        return math.pi * self.r ** 2


class Square(Shape):
    def __init__(self, s):
        self.name = "สี่เหลี่ยมจัตุรัส"
        self.s = s

    def area(self):
        return self.s ** 2


class Triangle(Shape):
    def __init__(self, b, h):
        self.name = "สามเหลี่ยม"
        self.b = b
        self.h = h

    def area(self):
        return 0.5 * self.b * self.h

KINDS = {"circle": Circle, "square": Square, "triangle": Triangle}
shapes = []
for _ in range(int(input())):
    kind, *values = input().split()
    if kind not in KINDS:
        print("ไม่รู้จักรูปทรง:", kind)
        continue
    shapes.append(KINDS[kind](*[float(v) for v in values]))
for s in shapes:
    print(f"{s.name}: {s.area():.2f}")
print(f"รวม: {sum(s.area() for s in shapes):.2f}")
`, wrong: [R`import math

class Shape:
    name = "รูปทรง"

    def area(self):
        raise NotImplementedError


class Circle(Shape):
    def __init__(self, r):
        self.name = "วงกลม"
        self.r = r

    def area(self):
        return math.pi * self.r ** 2


class Square(Shape):
    def __init__(self, s):
        self.name = "สี่เหลี่ยมจัตุรัส"
        self.s = s

    def area(self):
        return self.s ** 2


class Triangle(Shape):
    def __init__(self, b, h):
        self.name = "สามเหลี่ยม"
        self.b = b
        self.h = h

    def area(self):
        return self.b * self.h

KINDS = {"circle": Circle, "square": Square, "triangle": Triangle}
shapes = []
for _ in range(int(input())):
    kind, *values = input().split()
    if kind not in KINDS:
        print("ไม่รู้จักรูปทรง:", kind)
        continue
    shapes.append(KINDS[kind](*[float(v) for v in values]))
for s in shapes:
    print(f"{s.name}: {s.area():.2f}")
print(f"รวม: {sum(s.area() for s in shapes):.2f}")
`] },
  "py2-oop2/1": { sol: R`class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __str__(self):
        return f"{self.amount:.2f} {self.currency}"

    def __repr__(self):
        return f"Money({self.amount!r}, {self.currency!r})"

    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount and self.currency == other.currency

    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("สกุลเงินต่างกัน")
        return Money(self.amount + other.amount, self.currency)

x, c1, y, c2 = input().split()
a = Money(float(x), c1)
b = Money(float(y), c2)
print(str(a))
print(repr(b))
print(a == b)
try:
    print(a + b)
except ValueError as e:
    print("ข้อผิดพลาด:", e)
`, wrong: [R`class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __str__(self):
        return f"{self.amount:.2f} {self.currency}"

    def __repr__(self):
        return f"Money({self.amount}, {self.currency})"

    def __eq__(self, other):
        return self.amount == other.amount

    def __add__(self, other):
        return Money(self.amount + other.amount, self.currency)

x, c1, y, c2 = input().split()
a = Money(float(x), c1)
b = Money(float(y), c2)
print(str(a))
print(repr(b))
print(a == b)
try:
    print(a + b)
except ValueError as e:
    print("ข้อผิดพลาด:", e)
`] },
  "py2-oop2/2": { sol: R`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def describe(self):
        return f"{self.name} เงินเดือน {self.salary:,}"


class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size

    def describe(self):
        return super().describe() + f" · ทีม {self.team_size} คน"


name, salary, team = input().split()
print(Manager(name, int(salary), int(team)).describe())
`, wrong: [R`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def describe(self):
        return f"{self.name} เงินเดือน {self.salary}"


class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size

    def describe(self):
        return super().describe() + f" · ทีม {self.team_size} คน"


name, salary, team = input().split()
print(Manager(name, int(salary), int(team)).describe())
`] },
  "py2-oop2/3": { sol: R`import csv
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: float
    qty: int

    def total(self):
        return self.price * self.qty


def load(path):
    products, bad = [], 0
    with open(path, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            try:
                qty = int(row["qty"])
                if qty < 0:
                    raise ValueError("จำนวนติดลบ")
                products.append(Product(row["name"], float(row["price"]), qty))
            except ValueError:
                bad += 1
    return products, bad


try:
    products, bad = load("products.csv")
except FileNotFoundError:
    print("ไม่พบไฟล์ products.csv")
else:
    if not products:
        print("ไม่มีสินค้า")
    else:
        print(repr(products[0]))
        for p in sorted(products, key=lambda p: p.total(), reverse=True):
            print(f"{p.name}: {p.total():.2f}")
    print(f"ข้อมูลผิด: {bad}")
`, wrong: [R`import csv
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: float
    qty: int

    def total(self):
        return self.price * self.qty


try:
    products, bad = [], 0
    with open("products.csv", encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            try:
                products.append(Product(row["name"], float(row["price"]), int(row["qty"])))
            except ValueError:
                bad += 1
except FileNotFoundError:
    print("ไม่พบไฟล์ products.csv")
else:
    if not products:
        print("ไม่มีสินค้า")
    else:
        print(repr(products[0]))
        for p in sorted(products, key=lambda p: p.total(), reverse=True):
            print(f"{p.name}: {p.total():.2f}")
    print(f"ข้อมูลผิด: {bad}")
`] },
  "py2-oop2/4": { sol: R`class Engine:
    def __init__(self, hp):
        self.hp = hp

    def start(self):
        return f"เครื่องยนต์ {self.hp} แรงม้าทำงาน"


class Car:
    def __init__(self, model, hp):
        self.model = model
        self.engine = Engine(hp)

    def swap_engine(self, hp):
        self.engine = Engine(hp)

    def drive(self):
        return f"{self.model}: {self.engine.start()}"


model, hp, new_hp = input().split()
car = Car(model, int(hp))
print(car.drive())
car.swap_engine(int(new_hp))
print(car.drive())
print(isinstance(car, Engine))
`, wrong: [R`class Engine:
    def __init__(self, hp):
        self.hp = hp

    def start(self):
        return f"เครื่องยนต์ {self.hp} แรงม้าทำงาน"


class Car:
    def __init__(self, model, hp):
        self.model = model
        self.engine = Engine(hp)

    def swap_engine(self, hp):
        self.engine.hp = self.engine.hp

    def drive(self):
        return f"{self.model}: {self.engine.start()}"


model, hp, new_hp = input().split()
car = Car(model, int(hp))
print(car.drive())
car.swap_engine(int(new_hp))
print(car.drive())
print(isinstance(car, Engine))
`] },
  "py2-oop2/5": { sol: R`class Character:
    def __init__(self, name, hp, attack):
        self.name = name
        self.hp = hp
        self.attack_power = attack

    @property
    def is_alive(self):
        return self.hp > 0

    def take_damage(self, damage):
        self.hp = max(0, self.hp - damage)
        return damage

    def damage_dealt(self):
        return self.attack_power

    def attack(self, target):
        return target.take_damage(self.damage_dealt())


class Warrior(Character):
    def take_damage(self, damage):
        return super().take_damage(max(0, damage - 2))


class Mage(Character):
    def __init__(self, name, hp, attack):
        super().__init__(name, hp, attack)
        self._attacks = 0

    def damage_dealt(self):
        self._attacks += 1
        power = self.attack_power
        return power * 2 if self._attacks % 3 == 0 else power


CLASSES = {"fighter": Character, "warrior": Warrior, "mage": Mage}


def make(line):
    kind, name, hp, atk = line.split()
    if kind not in CLASSES:
        raise ValueError(f"ไม่รู้จักอาชีพ: {kind}")
    return CLASSES[kind](name, int(hp), int(atk))


try:
    a = make(input())
    b = make(input())
except ValueError as e:
    print(e)
else:
    winner = None
    for _ in range(20):
        for attacker, defender in ((a, b), (b, a)):
            dealt = attacker.attack(defender)
            print(f"{attacker.name} โจมตี {defender.name} เสียหาย {dealt} (HP เหลือ {defender.hp})")
            if not defender.is_alive:
                winner = attacker
                break
        if winner:
            break
    print(f"ผู้ชนะ: {winner.name}" if winner else "เสมอ (ครบ 20 รอบ)")
`, wrong: [R`class Character:
    def __init__(self, name, hp, attack):
        self.name = name
        self.hp = hp
        self.attack_power = attack

    @property
    def is_alive(self):
        return self.hp > 0

    def take_damage(self, damage):
        self.hp = self.hp - damage
        return damage

    def damage_dealt(self):
        return self.attack_power

    def attack(self, target):
        return target.take_damage(self.damage_dealt())


class Warrior(Character):
    def take_damage(self, damage):
        return super().take_damage(max(0, damage - 2))


class Mage(Character):
    def __init__(self, name, hp, attack):
        super().__init__(name, hp, attack)
        self._attacks = 0

    def damage_dealt(self):
        self._attacks += 1
        power = self.attack_power
        return power * 2 if self._attacks % 3 == 0 else power


CLASSES = {"fighter": Character, "warrior": Warrior, "mage": Mage}


def make(line):
    kind, name, hp, atk = line.split()
    if kind not in CLASSES:
        raise ValueError(f"ไม่รู้จักอาชีพ: {kind}")
    return CLASSES[kind](name, int(hp), int(atk))


try:
    a = make(input())
    b = make(input())
except ValueError as e:
    print(e)
else:
    winner = None
    for _ in range(20):
        for attacker, defender in ((a, b), (b, a)):
            dealt = attacker.attack(defender)
            print(f"{attacker.name} โจมตี {defender.name} เสียหาย {dealt} (HP เหลือ {defender.hp})")
            if not defender.is_alive:
                winner = attacker
                break
        if winner:
            break
    print(f"ผู้ชนะ: {winner.name}" if winner else "เสมอ (ครบ 20 รอบ)")
`] },
  "py2-oop2/6": { sol: R`from dataclasses import dataclass, field


class LibraryError(Exception):
    pass


@dataclass
class Book:
    isbn: str
    title: str
    borrower: str | None = None


@dataclass
class Member:
    name: str
    borrowed: list = field(default_factory=list)


class Library:
    LIMIT = 2

    def __init__(self):
        self.books = {}
        self.members = {}

    def add_book(self, isbn, title):
        if isbn in self.books:
            raise LibraryError(f"มีหนังสือ {isbn} แล้ว")
        self.books[isbn] = Book(isbn, title)
        return f"เพิ่มหนังสือ {isbn}"

    def add_member(self, name):
        if name in self.members:
            raise LibraryError(f"มีสมาชิก {name} แล้ว")
        self.members[name] = Member(name)
        return f"เพิ่มสมาชิก {name}"

    def _find(self, name, isbn):
        if name not in self.members:
            raise LibraryError(f"ไม่พบสมาชิก {name}")
        if isbn not in self.books:
            raise LibraryError(f"ไม่พบหนังสือ {isbn}")
        return self.members[name], self.books[isbn]

    def borrow(self, name, isbn):
        member, book = self._find(name, isbn)
        if book.borrower is not None:
            raise LibraryError(f"หนังสือ {isbn} ถูกยืมอยู่")
        if len(member.borrowed) >= self.LIMIT:
            raise LibraryError(f"{name} ยืมครบ {self.LIMIT} เล่มแล้ว")
        book.borrower = name
        member.borrowed.append(isbn)
        return f"{name} ยืม {book.title}"

    def return_book(self, name, isbn):
        member, book = self._find(name, isbn)
        if isbn not in member.borrowed:
            raise LibraryError(f"{name} ไม่ได้ยืม {isbn}")
        member.borrowed.remove(isbn)
        book.borrower = None
        return f"{name} คืน {book.title}"

    def report(self):
        lines = [f"{b.isbn} {b.title}: " + (f"ยืมโดย {b.borrower}" if b.borrower else "ว่าง") for _, b in sorted(self.books.items())]
        lines = lines or ["(ไม่มีหนังสือ)"]
        members = [f"{m.name}: {len(m.borrowed)} เล่ม" for _, m in sorted(self.members.items())]
        return lines + (members or ["(ไม่มีสมาชิก)"])


library = Library()
while True:
    line = input()
    if line == "end":
        break
    cmd, *args = line.split()
    try:
        if cmd == "book":
            print(library.add_book(args[0], " ".join(args[1:])))
        elif cmd == "member":
            print(library.add_member(args[0]))
        elif cmd == "borrow":
            print(library.borrow(args[0], args[1]))
        elif cmd == "return":
            print(library.return_book(args[0], args[1]))
        elif cmd == "report":
            print("\n".join(library.report()))
    except LibraryError as e:
        print(e)
`, wrong: [R`class LibraryError(Exception):
    pass


class Library:
    def __init__(self):
        self.books = {}
        self.borrower = {}
        self.members = {}

    def run(self, cmd, args):
        if cmd == "book":
            if args[0] in self.books:
                raise LibraryError(f"มีหนังสือ {args[0]} แล้ว")
            self.books[args[0]] = " ".join(args[1:])
            return f"เพิ่มหนังสือ {args[0]}"
        if cmd == "member":
            if args[0] in self.members:
                raise LibraryError(f"มีสมาชิก {args[0]} แล้ว")
            self.members[args[0]] = []
            return f"เพิ่มสมาชิก {args[0]}"
        name, isbn = args
        if name not in self.members:
            raise LibraryError(f"ไม่พบสมาชิก {name}")
        if isbn not in self.books:
            raise LibraryError(f"ไม่พบหนังสือ {isbn}")
        if cmd == "borrow":
            if len(self.members[name]) >= 2:
                raise LibraryError(f"{name} ยืมครบ 2 เล่มแล้ว")
            if isbn in self.borrower:
                raise LibraryError(f"หนังสือ {isbn} ถูกยืมอยู่")
            self.borrower[isbn] = name
            self.members[name].append(isbn)
            return f"{name} ยืม {self.books[isbn]}"
        if isbn not in self.members[name]:
            raise LibraryError(f"{name} ไม่ได้ยืม {isbn}")
        self.members[name].remove(isbn)
        del self.borrower[isbn]
        return f"{name} คืน {self.books[isbn]}"


library = Library()
while True:
    line = input()
    if line == "end":
        break
    cmd, *args = line.split()
    try:
        if cmd == "report":
            for isbn in sorted(library.books):
                who = library.borrower.get(isbn)
                print(f"{isbn} {library.books[isbn]}: " + (f"ยืมโดย {who}" if who else "ว่าง"))
            if not library.books:
                print("(ไม่มีหนังสือ)")
            for name in sorted(library.members):
                print(f"{name}: {len(library.members[name])} เล่ม")
            if not library.members:
                print("(ไม่มีสมาชิก)")
        else:
            print(library.run(cmd, args))
    except LibraryError as e:
        print(e)
`] },

  // ── Stage 26: ตัววนซ้ำและตัวสร้างค่าแบบขี้เกียจ ──
  "py2-iter/0": { sol: R`class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current < 1:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

n = int(input())
c = Countdown(n)
print(list(c))
print(list(c))
for x in Countdown(2):
    print(x, end=" ")
print()
`, wrong: [R`class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        return iter(range(self.start, 0, -1))

n = int(input())
c = Countdown(n)
print(list(c))
print(list(c))
for x in Countdown(2):
    print(x, end=" ")
print()
`] },
  "py2-iter/1": { sol: R`def evens(limit):
    for x in range(0, limit + 1, 2):
        yield x

n = int(input())
print(list(evens(n)))
print(type(evens(n)).__name__)
`, wrong: [R`def evens(limit):
    return [x for x in range(0, limit + 1, 2)]

n = int(input())
print(list(evens(n)))
print(type(evens(n)).__name__)
`, R`def evens(limit):
    for x in range(0, limit, 2):
        yield x

n = int(input())
print(list(evens(n)))
print(type(evens(n)).__name__)
`] },
  "py2-iter/2": { sol: R`from itertools import islice

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

n = int(input())
values = list(islice(fibonacci(), n))
print(values if n <= 15 else values[-1])
`, wrong: [R`from itertools import islice

def fibonacci():
    values = [0, 1]
    while True:
        values.append(values[-1] + values[-2])
        if len(values) > 10 ** 9:
            break
    yield from values

n = int(input())
values = list(islice(fibonacci(), n))
print(values if n <= 15 else values[-1])
`, R`from itertools import islice

def fibonacci():
    a, b = 1, 1
    while True:
        yield a
        a, b = b, a + b

n = int(input())
values = list(islice(fibonacci(), n))
print(values if n <= 15 else values[-1])
`] },
  "py2-iter/3": { sol: R`nums = [int(x) for x in input().split()]
if not nums:
    print("ไม่มีข้อมูล")
else:
    total = sum(nums)
    count = len(nums)
    print(f"รวม {total} · จำนวน {count} · เฉลี่ย {total / count:.2f}")
`, wrong: [R`nums = [int(x) for x in input().split()]
total = sum(nums)
count = len(nums)
print(f"รวม {total} · จำนวน {count} · เฉลี่ย {total / max(count, 1):.2f}")
`] },
  "py2-iter/4": { sol: R`def read_numbers(lines):
    for line in lines:
        try:
            yield int(line)
        except ValueError:
            continue

def running_total(nums):
    total = 0
    for n in nums:
        total += n
        yield total

lines = []
while (line := input()) != "end":
    lines.append(line)
print(list(running_total(read_numbers(lines))))
`, wrong: [R`def read_numbers(lines):
    for line in lines:
        if line.isdigit():
            yield int(line)

def running_total(nums):
    total = 0
    for n in nums:
        total += n
        yield total

lines = []
while (line := input()) != "end":
    lines.append(line)
print(list(running_total(read_numbers(lines))))
`] },
  "py2-iter/5": { sol: R`def stats(numbers):
    values = list(numbers)
    if not values:
        return None
    return max(values), min(values)

print(stats(int(x) for x in input().split()))
`, wrong: [R`def stats(numbers):
    values = list(numbers)
    return max(values, default=None), min(values, default=None)

print(stats(int(x) for x in input().split()))
`] },
  "py2-iter/6": { sol: R`from itertools import count, islice

def chunked(iterable, size):
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk

size = int(input())
print(list(chunked([1, 2, 3, 4, 5], size)))
print(list(islice(chunked(count(), size), 2)))
`, wrong: [R`from itertools import count, islice

def chunked(iterable, size):
    items = list(iterable)
    for i in range(0, len(items), size):
        yield items[i:i + size]

size = int(input())
print(list(chunked([1, 2, 3, 4, 5], size)))
print(list(islice(chunked(count(), size), 2)))
`, R`from itertools import count, islice

def chunked(iterable, size):
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []

size = int(input())
print(list(chunked([1, 2, 3, 4, 5], size)))
print(list(islice(chunked(count(), size), 2)))
`] },
  // ── Stage 27: ตัวตกแต่งฟังก์ชันและตัวจัดการบริบท ──
  "py2-deco/0": { sol: R`def make_multiplier(n):
    def multiply(x):
        return x * n
    return multiply

m = make_multiplier(int(input()))
print(m(1), m(5), m(-2))
m2 = make_multiplier(10)
print(m(3), m2(3))
`, wrong: [R`factor = 1

def make_multiplier(n):
    global factor
    factor = n
    def multiply(x):
        return x * factor
    return multiply

m = make_multiplier(int(input()))
print(m(1), m(5), m(-2))
m2 = make_multiplier(10)
print(m(3), m2(3))
`] },
  "py2-deco/1": { sol: R`from functools import wraps

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper() + "!"
    return wrapper

@shout
def greet(name):
    """ทักทาย"""
    return f"hello {name}"

print(greet(input()))
print(greet.__name__, greet.__doc__)
`, wrong: [R`from functools import wraps

def shout(func):
    @wraps(func)
    def wrapper(name):
        return func(name).upper()
    return wrapper

@shout
def greet(name):
    """ทักทาย"""
    return f"hello {name}"

print(greet(input()))
print(greet.__name__, greet.__doc__)
`] },
  "py2-deco/2": { sol: R`from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            return [func(*args, **kwargs) for _ in range(times)]
        return wrapper
    return decorator

@repeat(2)
def hi(name):
    return f"hi {name}"

n = int(input())
print(hi("Ann"))
print(repeat(n)(str.upper)("ok"))
`, wrong: [R`from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            return [func(*args, **kwargs) for _ in range(max(times, 1))]
        return wrapper
    return decorator

@repeat(2)
def hi(name):
    return f"hi {name}"

n = int(input())
print(hi("Ann"))
print(repeat(n)(str.upper)("ok"))
`] },
  "py2-deco/3": { sol: R`import functools

def logged(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("เรียก", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@logged
def add(a, b):
    """บวกสองจำนวน"""
    return a + b

a, b = (int(x) for x in input().split())
print(add(a, b))
print(add.__name__, add.__doc__)
`, wrong: [R`import functools

def logged(func):
    def wrapper(*args, **kwargs):
        print("เรียก", func.__name__)
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper

@logged
def add(a, b):
    """บวกสองจำนวน"""
    return a + b

a, b = (int(x) for x in input().split())
print(add(a, b))
print(add.__name__, add.__doc__)
`] },
  "py2-deco/4": { sol: R`from functools import wraps

def count_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def square(x):
    return x * x

@count_calls
def cube(x):
    return x ** 3

n = int(input())
results = [square(i) for i in range(n)]
cube(2)
print(results, square.calls, cube.calls)
`, wrong: [R`from functools import wraps

calls = 0

def count_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        global calls
        calls += 1
        wrapper.calls = calls
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def square(x):
    return x * x

@count_calls
def cube(x):
    return x ** 3

n = int(input())
results = [square(i) for i in range(n)]
cube(2)
print(results, square.calls, cube.calls)
`] },
  "py2-deco/5": { sol: R`class Transaction:
    def __init__(self, data):
        self.data = data

    def __enter__(self):
        self.working = dict(self.data)
        return self.working

    def __exit__(self, exc_type, exc, tb):
        if exc_type is None:
            self.data.update(self.working)
        return False

account = {"balance": int(input())}
for amount in [int(x) for x in input().split()]:
    try:
        with Transaction(account) as t:
            t["balance"] -= amount
            if t["balance"] < 0:
                raise ValueError("ยอดติดลบ")
        print("สำเร็จ", account["balance"])
    except ValueError as e:
        print("ยกเลิก:", e, "· ยอด", account["balance"])
`, wrong: [R`class Transaction:
    def __init__(self, data):
        self.data = data

    def __enter__(self):
        return self.data

    def __exit__(self, exc_type, exc, tb):
        return False

account = {"balance": int(input())}
for amount in [int(x) for x in input().split()]:
    try:
        with Transaction(account) as t:
            t["balance"] -= amount
            if t["balance"] < 0:
                raise ValueError("ยอดติดลบ")
        print("สำเร็จ", account["balance"])
    except ValueError as e:
        print("ยกเลิก:", e, "· ยอด", account["balance"])
`, R`class Transaction:
    def __init__(self, data):
        self.data = data

    def __enter__(self):
        self.working = dict(self.data)
        return self.working

    def __exit__(self, exc_type, exc, tb):
        if exc_type is None:
            self.data.update(self.working)
        return True

account = {"balance": int(input())}
for amount in [int(x) for x in input().split()]:
    try:
        with Transaction(account) as t:
            t["balance"] -= amount
            if t["balance"] < 0:
                raise ValueError("ยอดติดลบ")
        print("สำเร็จ", account["balance"])
    except ValueError as e:
        print("ยกเลิก:", e, "· ยอด", account["balance"])
`] },
  "py2-deco/6": { sol: R`from contextlib import contextmanager

@contextmanager
def resource(name):
    print("เปิด", name)
    try:
        yield name
    finally:
        print("ปิด", name)

for name in input().split():
    try:
        with resource(name) as r:
            if r.startswith("x"):
                raise RuntimeError(f"{r} ล้มเหลว")
            print("ใช้", r)
    except RuntimeError as e:
        print("ข้อผิดพลาด:", e)
`, wrong: [R`from contextlib import contextmanager

@contextmanager
def resource(name):
    print("เปิด", name)
    try:
        yield name
    except RuntimeError:
        print("ปิด", name)

for name in input().split():
    try:
        with resource(name) as r:
            if r.startswith("x"):
                raise RuntimeError(f"{r} ล้มเหลว")
            print("ใช้", r)
    except RuntimeError as e:
        print("ข้อผิดพลาด:", e)
`] },
  // ── Stage 28: เครื่องมือเชิงฟังก์ชัน ──
  "py2-functools/0": { sol: R`def check_scores(scores):
    return (
        all(s >= 50 for s in scores),
        any(s == 100 for s in scores),
        sum(1 for s in scores if s < 50),
    )
`, wrong: [R`def check_scores(scores):
    if not scores:
        return (False, False, 0)
    return (
        all(s >= 50 for s in scores),
        any(s == 100 for s in scores),
        sum(1 for s in scores if s < 50),
    )
`, R`def check_scores(scores):
    return (
        all(s > 50 for s in scores),
        any(s == 100 for s in scores),
        sum(1 for s in scores if s <= 50),
    )
`] },
  "py2-functools/1": { sol: R`from itertools import combinations

def pairs_with_sum(nums, target):
    return sorted({tuple(sorted(p)) for p in combinations(nums, 2) if sum(p) == target})
`, wrong: [R`from itertools import combinations

def pairs_with_sum(nums, target):
    return sorted(tuple(sorted(p)) for p in combinations(nums, 2) if sum(p) == target)
`, R`from itertools import combinations, product

def pairs_with_sum(nums, target):
    return sorted({tuple(sorted(p)) for p in product(nums, repeat=2) if sum(p) == target})
`] },
  "py2-functools/2": { sol: R`from functools import reduce
import operator

def product_of(nums):
    return reduce(operator.mul, nums, 1)
`, wrong: [R`from functools import reduce
import operator

def product_of(nums):
    return reduce(operator.mul, nums) if nums else 0
`] },
  "py2-functools/3": { sol: R`def summarize(nums):
    return sum(x * 2 for x in nums if x % 3 == 0)
`, wrong: [R`def summarize(nums):
    return sum(x * 2 for x in nums if x % 3 == 0 and x > 0)
`] },
  "py2-functools/4": { sol: R`from itertools import groupby


def read_lines(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield line


def parse(lines, stats):
    for line in lines:
        parts = line.split()
        try:
            if len(parts) != 5 or not parts[4].endswith("ms"):
                raise ValueError
            time, method, path, status, ms = parts
            entry = {"hour": time[11:13], "path": path, "status": int(status), "ms": int(ms[:-2])}
        except ValueError:
            stats["malformed"] += 1
            continue
        yield entry


stats = {"malformed": 0}
try:
    entries = list(parse(read_lines("access.log"), stats))
except FileNotFoundError:
    print("ไม่พบไฟล์ access.log")
else:
    print(f"คำขอทั้งหมด: {len(entries)} · ผิดรูปแบบ: {stats['malformed']}")
    for hour, group in groupby(entries, key=lambda e: e["hour"]):
        group = list(group)
        errors = sum(1 for e in group if e["status"] >= 500)
        print(f"ชั่วโมง {hour}: {len(group)} คำขอ · ผิดพลาด {errors}")
    print("ช้าที่สุด:")
    slowest = sorted(entries, key=lambda e: (-e["ms"], e["path"]))[:3]
    if not slowest:
        print("(ไม่มีข้อมูล)")
    for e in slowest:
        print(f"{e['path']} {e['ms']}ms")
`, wrong: [R`from itertools import groupby


def read_lines(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield line


def parse(lines, stats):
    for line in lines:
        parts = line.split()
        try:
            time, method, path, status, ms = parts
            entry = {"hour": time[11:13], "path": path, "status": int(status), "ms": int(ms.replace("ms", ""))}
        except ValueError:
            stats["malformed"] += 1
            continue
        yield entry


stats = {"malformed": 0}
try:
    entries = list(parse(read_lines("access.log"), stats))
except FileNotFoundError:
    print("ไม่พบไฟล์ access.log")
else:
    print(f"คำขอทั้งหมด: {len(entries)} · ผิดรูปแบบ: {stats['malformed']}")
    for hour, group in groupby(entries, key=lambda e: e["hour"]):
        group = list(group)
        errors = sum(1 for e in group if e["status"] > 500)
        print(f"ชั่วโมง {hour}: {len(group)} คำขอ · ผิดพลาด {errors}")
    print("ช้าที่สุด:")
    slowest = sorted(entries, key=lambda e: -e["ms"])[:3]
    if not slowest:
        print("(ไม่มีข้อมูล)")
    for e in slowest:
        print(f"{e['path']} {e['ms']}ms")
`] },

  // ── Stage 29: สำรวจไลบรารีมาตรฐาน ──
  "py2-stdlib/0": { sol: R`from collections import Counter

def top_letters(text, n):
    counts = Counter(ch for ch in text.lower() if ch.isalpha())
    return sorted(counts.items(), key=lambda p: (-p[1], p[0]))[:n]
`, wrong: [R`from collections import Counter

def top_letters(text, n):
    counts = Counter(ch for ch in text.lower() if ch.isalpha())
    return counts.most_common(n)
`, R`from collections import Counter

def top_letters(text, n):
    counts = Counter(ch for ch in text if ch.isalpha())
    return sorted(counts.items(), key=lambda p: (-p[1], p[0]))[:n]
`] },
  "py2-stdlib/1": { sol: R`from collections import defaultdict

def group_by_length(words):
    groups = defaultdict(set)
    for w in words:
        groups[len(w)].add(w)
    return {k: sorted(v) for k, v in groups.items()}
`, wrong: [R`from collections import defaultdict

def group_by_length(words):
    groups = defaultdict(list)
    for w in words:
        groups[len(w)].append(w)
    return {k: sorted(v) for k, v in groups.items()}
`] },
  "py2-stdlib/2": { sol: R`from collections import deque

def last_n(items, n):
    return list(deque(items, maxlen=n))
`, wrong: [R`from collections import deque

def last_n(items, n):
    return list(deque(items))[-n:]
`] },
  "py2-stdlib/3": { sol: R`from datetime import date, timedelta

THAI_DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"]

def due_info(start, days):
    due = date.fromisoformat(start) + timedelta(days=days)
    return due.isoformat(), THAI_DAYS[due.weekday()]
`, wrong: [R`from datetime import date, timedelta

THAI_DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"]

def due_info(start, days):
    due = date.fromisoformat(start) + timedelta(days=days)
    return due.isoformat(), THAI_DAYS[due.isoweekday() % 7]
`] },
  "py2-stdlib/4": { sol: R`from decimal import Decimal, ROUND_HALF_UP

def with_vat(price_text):
    total = (Decimal(price_text) * Decimal("1.07")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return str(total)
`, wrong: [R`from decimal import Decimal, ROUND_HALF_UP

def with_vat(price_text):
    total = Decimal(float(price_text) * 1.07).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return str(total)
`, R`from decimal import Decimal

def with_vat(price_text):
    total = (Decimal(price_text) * Decimal("1.07")).quantize(Decimal("0.01"))
    return str(total)
`] },
  "py2-stdlib/5": { sol: R`import heapq
from enum import Enum


class Priority(Enum):
    HIGH = 1
    MEDIUM = 2
    LOW = 3


def task_order(tasks):
    queue = []
    for order, (name, level) in enumerate(tasks):
        heapq.heappush(queue, (Priority[level].value, order, name))
    return [heapq.heappop(queue)[2] for _ in range(len(queue))]
`, wrong: [R`import heapq
from enum import Enum


class Priority(Enum):
    HIGH = 1
    MEDIUM = 2
    LOW = 3


def task_order(tasks):
    queue = []
    for name, level in tasks:
        heapq.heappush(queue, (Priority[level].value, name))
    return [heapq.heappop(queue)[1] for _ in range(len(queue))]
`] },
  "py2-stdlib/6": { sol: R`import json
from collections import ChainMap
from pathlib import Path

DEFAULTS = Path("defaults.json")
USER = Path("user.json")


def load_user():
    try:
        return json.loads(USER.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        print("user.json เสีย ใช้ค่าเริ่มต้น")
        return {}


def convert(name, text, default):
    if isinstance(default, bool):
        if text.lower() not in ("true", "false"):
            raise ValueError(f"{name} ต้องเป็น true หรือ false")
        return text.lower() == "true"
    if isinstance(default, int):
        try:
            return int(text)
        except ValueError:
            raise ValueError(f"{name} ต้องเป็นจำนวนเต็ม") from None
    return text


try:
    defaults = json.loads(DEFAULTS.read_text(encoding="utf-8"))
except FileNotFoundError:
    print("ไม่พบไฟล์ defaults.json")
else:
    user = load_user()
    config = ChainMap(user, defaults)
    while True:
        parts = input().split(maxsplit=2)
        cmd = parts[0]
        if cmd == "end":
            break
        if cmd == "show":
            for key in sorted(config):
                print(f"{key} = {config[key]}")
        elif cmd == "get":
            print(f"{parts[1]} = {config[parts[1]]}" if parts[1] in config else f"ไม่มีค่าตั้ง {parts[1]}")
        elif cmd == "set":
            name, text = parts[1], parts[2]
            if name not in defaults:
                print(f"ไม่มีค่าตั้ง {name}")
                continue
            try:
                user[name] = convert(name, text, defaults[name])
            except ValueError as e:
                print(e)
            else:
                print(f"ตั้งค่า {name} = {user[name]}")
        elif cmd == "save":
            changed = {k: v for k, v in user.items() if defaults.get(k) != v}
            USER.write_text(json.dumps(changed, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")
            print(f"บันทึก {len(changed)} ค่า")
        elif cmd == "reload":
            user = load_user()
            config = ChainMap(user, defaults)
            print("โหลดแล้ว")
`, wrong: [R`import json
from collections import ChainMap
from pathlib import Path

DEFAULTS = Path("defaults.json")
USER = Path("user.json")


def load_user():
    try:
        return json.loads(USER.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def convert(name, text, default):
    if isinstance(default, int):
        try:
            return int(text)
        except ValueError:
            raise ValueError(f"{name} ต้องเป็นจำนวนเต็ม") from None
    if isinstance(default, bool):
        if text.lower() not in ("true", "false"):
            raise ValueError(f"{name} ต้องเป็น true หรือ false")
        return text.lower() == "true"
    return text


try:
    defaults = json.loads(DEFAULTS.read_text(encoding="utf-8"))
except FileNotFoundError:
    print("ไม่พบไฟล์ defaults.json")
else:
    user = load_user()
    config = ChainMap(user, defaults)
    while True:
        parts = input().split(maxsplit=2)
        cmd = parts[0]
        if cmd == "end":
            break
        if cmd == "show":
            for key in sorted(config):
                print(f"{key} = {config[key]}")
        elif cmd == "get":
            print(f"{parts[1]} = {config[parts[1]]}" if parts[1] in config else f"ไม่มีค่าตั้ง {parts[1]}")
        elif cmd == "set":
            name, text = parts[1], parts[2]
            if name not in defaults:
                print(f"ไม่มีค่าตั้ง {name}")
                continue
            try:
                user[name] = convert(name, text, defaults[name])
            except ValueError as e:
                print(e)
            else:
                print(f"ตั้งค่า {name} = {user[name]}")
        elif cmd == "save":
            USER.write_text(json.dumps(user, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")
            print(f"บันทึก {len(user)} ค่า")
        elif cmd == "reload":
            user = load_user()
            config = ChainMap(user, defaults)
            print("โหลดแล้ว")
`] },
  // ── Stage 30: นิพจน์ปกติ ──
  "py2-regex/0": { sol: R`import re

def find_phones(text):
    return [m.replace("-", "") for m in re.findall(r"\b0[689]\d-?\d{3}-?\d{4}\b", text)]
`, wrong: [R`import re

def find_phones(text):
    return [m.replace("-", "") for m in re.findall(r"0[689]\d-?\d{3}-?\d{4}", text)]
`, R`import re

def find_phones(text):
    return [m.replace("-", "") for m in re.findall(r"\b0\d{2}-?\d{3}-?\d{4}\b", text)]
`] },
  "py2-regex/1": { sol: R`import re

def parse_date(text):
    m = re.fullmatch(r"(\d{2})/(\d{2})/(\d{4})", text)
    if not m:
        return None
    day, month, year = m.groups()
    return int(year), int(month), int(day)
`, wrong: [R`import re

def parse_date(text):
    m = re.search(r"(\d{2})/(\d{2})/(\d{4})", text)
    if not m:
        return None
    day, month, year = m.groups()
    return int(year), int(month), int(day)
`] },
  "py2-regex/2": { sol: R`import re

def tags(html):
    return re.findall(r"<[^>]+>", html)
`, wrong: [R`import re

def tags(html):
    return re.findall(r"<\w+>", html)
`] },
  "py2-regex/3": { sol: R`import re

def find_prices(text):
    return [float(p) for p in re.findall(r"฿(\d+\.\d{2})", text)]
`, wrong: [R`import re

def find_prices(text):
    return [float(p) for p in re.findall(r"฿(\d+\.\d+)", text)]
`] },
  "py2-regex/4": { sol: R`import csv
import re
from collections import Counter
from datetime import date

reference = date.fromisoformat(input())

EMAIL = re.compile(r"[\w.+-]+@[\w-]+(\.[\w-]+)+")
PHONE = re.compile(r"0[689]\d{8}")


def birthdate_ok(text):
    try:
        born = date.fromisoformat(text)
    except ValueError:
        return False
    return born <= reference and reference.year - born.year <= 120


def problems(row):
    found = []
    if not row["name"].strip():
        found.append("ชื่อว่าง")
    if not EMAIL.fullmatch(row["email"]):
        found.append("อีเมลไม่ถูกต้อง")
    if not PHONE.fullmatch(row["phone"].replace("-", "")):
        found.append("เบอร์โทรไม่ถูกต้อง")
    if not birthdate_ok(row["birthdate"]):
        found.append("วันเกิดไม่ถูกต้อง")
    return found


try:
    with open("users.csv", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
except FileNotFoundError:
    print("ไม่พบไฟล์ users.csv")
else:
    tally = Counter()
    valid = 0
    for number, row in enumerate(rows, 1):
        found = problems(row)
        if found:
            print(f"แถว {number} ({row['name'].strip() or '-'}): {', '.join(found)}")
            tally.update(found)
        else:
            valid += 1
    print(f"ถูกต้อง {valid} จาก {len(rows)} แถว")
    for reason, n in sorted(tally.items(), key=lambda p: (-p[1], p[0])):
        print(f"- {reason}: {n}")
`, wrong: [R`import csv
import re
from collections import Counter
from datetime import date

reference = date.fromisoformat(input())


def problems(row):
    found = []
    if not row["name"].strip():
        found.append("ชื่อว่าง")
    if not re.search(r"@", row["email"]):
        found.append("อีเมลไม่ถูกต้อง")
    if not re.fullmatch(r"0[689]\d{8}", row["phone"].replace("-", "")):
        found.append("เบอร์โทรไม่ถูกต้อง")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", row["birthdate"]) or date.fromisoformat(row["birthdate"]) > reference:
        found.append("วันเกิดไม่ถูกต้อง")
    return found


try:
    with open("users.csv", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
except FileNotFoundError:
    print("ไม่พบไฟล์ users.csv")
else:
    tally = Counter()
    valid = 0
    for number, row in enumerate(rows, 1):
        try:
            found = problems(row)
        except ValueError:
            found = ["วันเกิดไม่ถูกต้อง"]
        if found:
            print(f"แถว {number} ({row['name'].strip() or '-'}): {', '.join(found)}")
            tally.update(found)
        else:
            valid += 1
    print(f"ถูกต้อง {valid} จาก {len(rows)} แถว")
    for reason, n in sorted(tally.items(), key=lambda p: (-p[1], p[0])):
        print(f"- {reason}: {n}")
`] },
  // ── Stage 31: Type Hints ──
  "py2-typing/0": { sol: R`from typing import get_type_hints

def average(scores: list[float]) -> float:
    return sum(scores) / len(scores) if scores else 0.0

print(get_type_hints(average))
print(average([float(x) for x in input().split()]))
`, wrong: [R`from typing import get_type_hints

def average(scores: list) -> float:
    return sum(scores) / len(scores) if scores else 0.0

print(get_type_hints(average))
print(average([float(x) for x in input().split()]))
`] },
  "py2-typing/1": { sol: R`from typing import get_type_hints

def find_age(ages: dict[str, int], name: str) -> int | None:
    return ages.get(name)

print(get_type_hints(find_age))
print(find_age({"Ann": 30, "Bo": 25}, input()))
`, wrong: [R`from typing import Optional, get_type_hints

def find_age(ages: dict[str, int], name: str) -> Optional[int]:
    return ages.get(name)

print(get_type_hints(find_age))
print(find_age({"Ann": 30, "Bo": 25}, input()))
`] },
  "py2-typing/2": { sol: R`from collections.abc import Callable
from typing import get_type_hints

def apply_twice(func: Callable[[int], int], x: int) -> int:
    return func(func(x))

hints = get_type_hints(apply_twice)
print(hints.get("func"), hints.get("x"), hints.get("return"))
print(apply_twice(lambda n: n * 2, int(input())))
`, wrong: [R`from collections.abc import Callable
from typing import get_type_hints

def apply_twice(func: Callable, x: int) -> int:
    return func(func(x))

hints = get_type_hints(apply_twice)
print(hints.get("func"), hints.get("x"), hints.get("return"))
print(apply_twice(lambda n: n * 2, int(input())))
`] },
  "py2-typing/3": { sol: R`import math
from typing import get_type_hints

type Point = tuple[float, float]


def distance(a: Point, b: Point) -> float:
    return math.dist(a, b)


print(Point.__value__)
print(get_type_hints(distance))
x1, y1, x2, y2 = (float(v) for v in input().split())
print(distance((x1, y1), (x2, y2)))
`, wrong: [R`import math
from typing import get_type_hints

type Point = tuple[float, float]


def distance(a: Point, b: Point) -> float:
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


print(Point.__value__)
print(get_type_hints(distance))
x1, y1, x2, y2 = (float(v) for v in input().split())
print(distance((x1, y1), (x2, y2)))
`] },
  "py2-typing/4": { sol: R`import math
from typing import Protocol, runtime_checkable


@runtime_checkable
class HasArea(Protocol):
    def area(self) -> float: ...


def total_area(shapes: list[HasArea]) -> float:
    return sum(s.area() for s in shapes)


class Square:
    def __init__(self, s: float) -> None:
        self.s = s
    def area(self) -> float:
        return self.s ** 2

class Circle:
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return math.pi * self.r ** 2

s, r = (float(v) for v in input().split())
print(isinstance(Square(s), HasArea), isinstance(Circle(r), HasArea), isinstance(s, HasArea))
print(f"{total_area([Square(s), Circle(r)]):.2f}")
`, wrong: [R`import math
from typing import Protocol, runtime_checkable


@runtime_checkable
class HasArea(Protocol):
    def perimeter(self) -> float: ...


def total_area(shapes: list[HasArea]) -> float:
    return sum(s.area() for s in shapes)


class Square:
    def __init__(self, s: float) -> None:
        self.s = s
    def area(self) -> float:
        return self.s ** 2

class Circle:
    def __init__(self, r: float) -> None:
        self.r = r
    def area(self) -> float:
        return math.pi * self.r ** 2

s, r = (float(v) for v in input().split())
print(isinstance(Square(s), HasArea), isinstance(Circle(r), HasArea), isinstance(s, HasArea))
print(f"{total_area([Square(s), Circle(r)]):.2f}")
`] },
  "py2-typing/5": { sol: R`def first[T](items: list[T]) -> T | None:
    return items[0] if items else None

print(first.__type_params__)
words = input().split()
print(first(words), first([len(w) for w in words]))
`, wrong: [R`from typing import TypeVar

T = TypeVar("T")

def first(items: list[T]) -> T | None:
    return items[0] if items else None

print(first.__type_params__)
words = input().split()
print(first(words), first([len(w) for w in words]))
`] },

  // ── Stage 32–33 (สร้างด้วย json.dumps) ──
  "py2-testing/0": { sol: "import io\nimport unittest\n\ndef is_leap_ok(year):\n    return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0\n\ndef is_leap_m1(year):\n    return year % 4 == 0\n\ndef is_leap_m2(year):\n    return year % 4 == 0 and year % 100 != 0\n\ndef is_leap_m3(year):\n    return year % 400 == 0\n\nVARIANTS = {\"ok\": is_leap_ok, \"m1\": is_leap_m1, \"m2\": is_leap_m2, \"m3\": is_leap_m3}\n\nmode = input()\nis_leap = VARIANTS[mode]\n\n\nclass TestIsLeap(unittest.TestCase):\n    def test_divisible_by_4(self):\n        self.assertTrue(is_leap(2024))\n\n    def test_not_divisible_by_4(self):\n        self.assertFalse(is_leap(2023))\n\n    def test_century_not_leap(self):\n        self.assertFalse(is_leap(1900))\n\n    def test_divisible_by_400(self):\n        self.assertTrue(is_leap(2000))\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestIsLeap)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n", wrong: ["import io\nimport unittest\n\ndef is_leap_ok(year):\n    return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0\n\ndef is_leap_m1(year):\n    return year % 4 == 0\n\ndef is_leap_m2(year):\n    return year % 4 == 0 and year % 100 != 0\n\ndef is_leap_m3(year):\n    return year % 400 == 0\n\nVARIANTS = {\"ok\": is_leap_ok, \"m1\": is_leap_m1, \"m2\": is_leap_m2, \"m3\": is_leap_m3}\n\nmode = input()\nis_leap = VARIANTS[mode]\n\n\nclass TestIsLeap(unittest.TestCase):\n    def test_divisible_by_4(self):\n        self.assertTrue(is_leap(2024))\n\n    def test_not_divisible_by_4(self):\n        self.assertFalse(is_leap(2023))\n\n    def test_divisible_by_400(self):\n        self.assertTrue(is_leap(2000))\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestIsLeap)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n"] },
  "py2-testing/1": { sol: "import io\nimport unittest\n\ndef parse_score_ok(text):\n    score = int(text)\n    if not 0 <= score <= 100:\n        raise ValueError(\"คะแนนต้องอยู่ระหว่าง 0 ถึง 100\")\n    return score\n\ndef parse_score_m1(text):\n    score = int(text)\n    if not 0 <= score <= 101:\n        raise ValueError(\"คะแนนต้องอยู่ระหว่าง 0 ถึง 100\")\n    return score\n\ndef parse_score_m2(text):\n    try:\n        score = int(text)\n    except ValueError:\n        return -1\n    if not 0 <= score <= 100:\n        raise ValueError(\"คะแนนต้องอยู่ระหว่าง 0 ถึง 100\")\n    return score\n\ndef parse_score_m3(text):\n    score = int(text)\n    if score > 100:\n        raise ValueError(\"คะแนนต้องไม่เกิน 100\")\n    return score\n\nVARIANTS = {\"ok\": parse_score_ok, \"m1\": parse_score_m1, \"m2\": parse_score_m2, \"m3\": parse_score_m3}\n\nmode = input()\nparse_score = VARIANTS[mode]\n\n\nclass TestParseScore(unittest.TestCase):\n    def test_valid(self):\n        self.assertEqual(parse_score(\"50\"), 50)\n\n    def test_upper_bound(self):\n        self.assertEqual(parse_score(\"100\"), 100)\n        with self.assertRaises(ValueError):\n            parse_score(\"101\")\n\n    def test_negative(self):\n        with self.assertRaises(ValueError):\n            parse_score(\"-1\")\n\n    def test_not_number(self):\n        with self.assertRaises(ValueError):\n            parse_score(\"abc\")\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestParseScore)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n", wrong: ["import io\nimport unittest\n\ndef parse_score_ok(text):\n    score = int(text)\n    if not 0 <= score <= 100:\n        raise ValueError(\"คะแนนต้องอยู่ระหว่าง 0 ถึง 100\")\n    return score\n\ndef parse_score_m1(text):\n    score = int(text)\n    if not 0 <= score <= 101:\n        raise ValueError(\"คะแนนต้องอยู่ระหว่าง 0 ถึง 100\")\n    return score\n\ndef parse_score_m2(text):\n    try:\n        score = int(text)\n    except ValueError:\n        return -1\n    if not 0 <= score <= 100:\n        raise ValueError(\"คะแนนต้องอยู่ระหว่าง 0 ถึง 100\")\n    return score\n\ndef parse_score_m3(text):\n    score = int(text)\n    if score > 100:\n        raise ValueError(\"คะแนนต้องไม่เกิน 100\")\n    return score\n\nVARIANTS = {\"ok\": parse_score_ok, \"m1\": parse_score_m1, \"m2\": parse_score_m2, \"m3\": parse_score_m3}\n\nmode = input()\nparse_score = VARIANTS[mode]\n\n\nclass TestParseScore(unittest.TestCase):\n    def test_valid(self):\n        self.assertEqual(parse_score(\"50\"), 50)\n\n    def test_upper_bound(self):\n        with self.assertRaises(ValueError):\n            parse_score(\"150\")\n\n    def test_not_number(self):\n        with self.assertRaises(ValueError):\n            parse_score(\"abc\")\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestParseScore)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n"] },
  "py2-testing/2": { sol: "import io\nimport unittest\n\nclass Stack_ok:\n    def __init__(self):\n        self._items = []\n    def push(self, x):\n        self._items.append(x)\n    def pop(self):\n        return self._items.pop()\n    def peek(self):\n        return self._items[-1]\n    def size(self):\n        return len(self._items)\n\nclass Stack_m1(Stack_ok):\n    def pop(self):\n        return self._items.pop(0)\n\nclass Stack_m2(Stack_ok):\n    def __init__(self):\n        super().__init__()\n        self._count = 0\n    def push(self, x):\n        super().push(x)\n        self._count += 1\n    def size(self):\n        return self._count\n\nclass Stack_m3(Stack_ok):\n    def peek(self):\n        return self._items.pop()\n\nVARIANTS = {\"ok\": Stack_ok, \"m1\": Stack_m1, \"m2\": Stack_m2, \"m3\": Stack_m3}\n\nmode = input()\nStack = VARIANTS[mode]\n\n\nclass TestStack(unittest.TestCase):\n    def setUp(self):\n        self.stack = Stack()\n\n    def test_pop_returns_last(self):\n        self.stack.push(1)\n        self.stack.push(2)\n        self.assertEqual(self.stack.pop(), 2)\n\n    def test_size_after_pop(self):\n        self.stack.push(1)\n        self.stack.push(2)\n        self.stack.pop()\n        self.assertEqual(self.stack.size(), 1)\n\n    def test_peek_keeps_item(self):\n        self.stack.push(5)\n        self.assertEqual(self.stack.peek(), 5)\n        self.assertEqual(self.stack.peek(), 5)\n        self.assertEqual(self.stack.size(), 1)\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestStack)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n", wrong: ["import io\nimport unittest\n\nclass Stack_ok:\n    def __init__(self):\n        self._items = []\n    def push(self, x):\n        self._items.append(x)\n    def pop(self):\n        return self._items.pop()\n    def peek(self):\n        return self._items[-1]\n    def size(self):\n        return len(self._items)\n\nclass Stack_m1(Stack_ok):\n    def pop(self):\n        return self._items.pop(0)\n\nclass Stack_m2(Stack_ok):\n    def __init__(self):\n        super().__init__()\n        self._count = 0\n    def push(self, x):\n        super().push(x)\n        self._count += 1\n    def size(self):\n        return self._count\n\nclass Stack_m3(Stack_ok):\n    def peek(self):\n        return self._items.pop()\n\nVARIANTS = {\"ok\": Stack_ok, \"m1\": Stack_m1, \"m2\": Stack_m2, \"m3\": Stack_m3}\n\nmode = input()\nStack = VARIANTS[mode]\n\n\nclass TestStack(unittest.TestCase):\n    def setUp(self):\n        self.stack = Stack()\n\n    def test_push_pop(self):\n        self.stack.push(1)\n        self.assertEqual(self.stack.pop(), 1)\n\n    def test_size(self):\n        self.stack.push(1)\n        self.assertEqual(self.stack.size(), 1)\n\n    def test_peek(self):\n        self.stack.push(5)\n        self.assertEqual(self.stack.peek(), 5)\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestStack)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n"] },
  "py2-testing/3": { sol: "import io\nimport unittest\n\ndef add_ok(a, b):\n    return a + b\n\ndef add_m1(a, b):\n    return a + b + 1\n\ndef add_m2(a, b):\n    return a * b\n\ndef add_m3(a, b):\n    return abs(a) + abs(b)\n\nVARIANTS = {\"ok\": add_ok, \"m1\": add_m1, \"m2\": add_m2, \"m3\": add_m3}\n\nmode = input()\nadd = VARIANTS[mode]\n\n\nclass TestAdd(unittest.TestCase):\n    def test_small(self):\n        self.assertEqual(add(2, 3), 5)\n\n    def test_negative(self):\n        self.assertEqual(add(-1, 1), 0)\n\n    def test_zero(self):\n        self.assertEqual(add(0, 0), 0)\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestAdd)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n", wrong: ["import io\nimport unittest\n\ndef add_ok(a, b):\n    return a + b\n\ndef add_m1(a, b):\n    return a + b + 1\n\ndef add_m2(a, b):\n    return a * b\n\ndef add_m3(a, b):\n    return abs(a) + abs(b)\n\nVARIANTS = {\"ok\": add_ok, \"m1\": add_m1, \"m2\": add_m2, \"m3\": add_m3}\n\nmode = input()\nadd = VARIANTS[mode]\n\n\nclass TestAdd(unittest.TestCase):\n    def test_small(self):\n        self.assertEqual(add(2, 2), 4)\n\n    def test_positive(self):\n        self.assertEqual(add(1, 3), 4)\n\n    def test_zero(self):\n        self.assertEqual(add(0, 0), 0)\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestAdd)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n"] },
  "py2-testing/4": { sol: "import logging\nimport sys\n\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO, format=\"%(levelname)s:%(name)s:%(message)s\", force=True)\nlogger = logging.getLogger(\"inventory\")\n\n\ndef process(lines):\n    logger.info(f\"เริ่มประมวลผล {len(lines)} บรรทัด\")\n    total = 0\n    for i, line in enumerate(lines, 1):\n        try:\n            value = int(line)\n        except ValueError:\n            logger.warning(f\"ข้ามบรรทัด {i}: {line!r}\")\n            continue\n        logger.debug(f\"บวก {value}\")\n        total += value\n    logger.info(f\"รวม {total}\")\n    return total\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nprint(\"ผลลัพธ์\", process(lines))\n", wrong: ["import logging\nimport sys\n\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO, format=\"%(levelname)s:%(name)s:%(message)s\", force=True)\nlogger = logging.getLogger(\"inventory\")\n\n\ndef process(lines):\n    logger.info(f\"เริ่มประมวลผล {len(lines)} บรรทัด\")\n    total = 0\n    for i, line in enumerate(lines, 1):\n        try:\n            value = int(line)\n        except ValueError:\n            logger.warning(f\"ข้ามบรรทัด {i}: {line}\")\n            continue\n        logger.debug(f\"บวก {value}\")\n        total += value\n    logger.info(f\"รวม {total}\")\n    return total\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nprint(\"ผลลัพธ์\", process(lines))\n"] },
  "py2-testing/5": { sol: "def line_total(catalog, item, qty):\n    if item not in catalog:\n        raise ValueError(f\"ไม่มีสินค้า {item}\")\n    return catalog[item][\"price\"] * qty\n\n\ndef total_cost(cart, catalog):\n    return sum(line_total(catalog, item, qty) for item, qty in cart)\n", wrong: ["def line_total(catalog, item, qty):\n    return catalog[item][\"price\"] * qty\n\n\ndef total_cost(cart, catalog):\n    return sum(line_total(catalog, item, qty) for item, qty in cart)\n"] },
  "py2-testing/6": { sol: "import io\nimport unittest\n\ndef median_ok(nums):\n    if not nums:\n        raise ValueError(\"ไม่มีข้อมูล\")\n    s = sorted(nums)\n    mid = len(s) // 2\n    return s[mid] if len(s) % 2 else (s[mid - 1] + s[mid]) / 2\n\ndef median_m1(nums):\n    if not nums:\n        raise ValueError(\"ไม่มีข้อมูล\")\n    mid = len(nums) // 2\n    return nums[mid] if len(nums) % 2 else (nums[mid - 1] + nums[mid]) / 2\n\ndef median_m2(nums):\n    if not nums:\n        raise ValueError(\"ไม่มีข้อมูล\")\n    s = sorted(nums)\n    return s[len(s) // 2]\n\ndef median_m3(nums):\n    if not nums:\n        return 0\n    s = sorted(nums)\n    mid = len(s) // 2\n    return s[mid] if len(s) % 2 else (s[mid - 1] + s[mid]) / 2\n\nVARIANTS = {\"ok\": median_ok, \"m1\": median_m1, \"m2\": median_m2, \"m3\": median_m3}\n\nmode = input()\nmedian = VARIANTS[mode]\n\n\nclass TestMedian(unittest.TestCase):\n    def test_odd_unsorted(self):\n        self.assertEqual(median([3, 1, 2]), 2)\n\n    def test_even_average(self):\n        self.assertEqual(median([4, 1, 3, 2]), 2.5)\n\n    def test_single(self):\n        self.assertEqual(median([7]), 7)\n\n    def test_empty(self):\n        with self.assertRaises(ValueError):\n            median([])\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestMedian)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n", wrong: ["import io\nimport unittest\n\ndef median_ok(nums):\n    if not nums:\n        raise ValueError(\"ไม่มีข้อมูล\")\n    s = sorted(nums)\n    mid = len(s) // 2\n    return s[mid] if len(s) % 2 else (s[mid - 1] + s[mid]) / 2\n\ndef median_m1(nums):\n    if not nums:\n        raise ValueError(\"ไม่มีข้อมูล\")\n    mid = len(nums) // 2\n    return nums[mid] if len(nums) % 2 else (nums[mid - 1] + nums[mid]) / 2\n\ndef median_m2(nums):\n    if not nums:\n        raise ValueError(\"ไม่มีข้อมูล\")\n    s = sorted(nums)\n    return s[len(s) // 2]\n\ndef median_m3(nums):\n    if not nums:\n        return 0\n    s = sorted(nums)\n    mid = len(s) // 2\n    return s[mid] if len(s) % 2 else (s[mid - 1] + s[mid]) / 2\n\nVARIANTS = {\"ok\": median_ok, \"m1\": median_m1, \"m2\": median_m2, \"m3\": median_m3}\n\nmode = input()\nmedian = VARIANTS[mode]\n\n\nclass TestMedian(unittest.TestCase):\n    def test_sorted_odd(self):\n        self.assertEqual(median([1, 2, 3]), 2)\n\n    def test_even(self):\n        self.assertEqual(median([1, 2, 3, 4]), 2.5)\n\n    def test_single(self):\n        self.assertEqual(median([7]), 7)\n\n    def test_empty(self):\n        with self.assertRaises(ValueError):\n            median([])\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestMedian)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n"] },
  "py2-algo/0": { sol: "def contains(values, x):\n    lo, hi = 0, len(values) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            return True\n        if values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return False\n\n\nn = int(input())\nvalues = [int(t) for t in input().split()]\nq = int(input())\nfound = sum(1 for t in input().split() if contains(values, int(t)))\nprint(\"พบ\", found)\n", wrong: ["def contains(values, x):\n    lo, hi = 0, len(values) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if values[mid] == x:\n            return True\n        if values[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return False\n\n\nn = int(input())\nvalues = [int(t) for t in input().split()]\nq = int(input())\nfound = sum(1 for t in input().split() if contains(values, int(t)))\nprint(\"พบ\", found)\n"] },
  "py2-algo/1": { sol: "def merge_sort(nums):\n    if len(nums) <= 1:\n        return list(nums)\n    mid = len(nums) // 2\n    left = merge_sort(nums[:mid])\n    right = merge_sort(nums[mid:])\n    merged = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i])\n            i += 1\n        else:\n            merged.append(right[j])\n            j += 1\n    merged.extend(left[i:])\n    merged.extend(right[j:])\n    return merged\n", wrong: ["def merge_sort(nums):\n    if len(nums) <= 1:\n        return list(nums)\n    mid = len(nums) // 2\n    left = merge_sort(nums[:mid])\n    right = merge_sort(nums[mid:])\n    merged = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i])\n            i += 1\n        else:\n            merged.append(right[j])\n            j += 1\n    return merged\n"] },
  "py2-algo/2": { sol: "from collections import Counter\n\nn = int(input())\nvalues = [int(t) for t in input().split()]\nseen = Counter()\npairs = 0\nfor x in values:\n    pairs += seen[1000 - x]\n    seen[x] += 1\nprint(\"คู่\", pairs)\n", wrong: ["from collections import Counter\n\nn = int(input())\nvalues = [int(t) for t in input().split()]\ncounts = Counter(values)\npairs = 0\nfor x in counts:\n    pairs += counts[x] * counts[1000 - x]\nprint(\"คู่\", pairs // 2)\n"] },
  "py2-algo/3": { sol: "PAIRS = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n\n\ndef is_balanced(text):\n    stack = []\n    for ch in text:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif ch in PAIRS:\n            if not stack or stack.pop() != PAIRS[ch]:\n                return False\n    return not stack\n", wrong: ["def is_balanced(text):\n    return all(text.count(o) == text.count(c) for o, c in (\"()\", \"[]\", \"{}\"))\n"] },
  "py2-algo/4": { sol: "from collections import deque\n\ngrid = []\nwhile (line := input()) != \"end\":\n    grid.append(line)\nstart = next((r, c) for r, row in enumerate(grid) for c, ch in enumerate(row) if ch == \"S\")\nqueue = deque([(start[0], start[1], 0)])\nseen = {start}\nanswer = None\nwhile queue:\n    r, c, d = queue.popleft()\n    if grid[r][c] == \"E\":\n        answer = d\n        break\n    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < len(grid) and 0 <= nc < len(grid[nr]) and grid[nr][nc] != \"#\" and (nr, nc) not in seen:\n            seen.add((nr, nc))\n            queue.append((nr, nc, d + 1))\nprint(f\"ก้าว {answer}\" if answer is not None else \"ไปไม่ถึง\")\n", wrong: ["from collections import deque\n\ngrid = []\nwhile (line := input()) != \"end\":\n    grid.append(line)\nstart = next((r, c) for r, row in enumerate(grid) for c, ch in enumerate(row) if ch == \"S\")\nend = next((r, c) for r, row in enumerate(grid) for c, ch in enumerate(row) if ch == \"E\")\nqueue = deque([start])\nblocked = any(\"#\" in row for row in grid)\nprint(\"ไปไม่ถึง\" if blocked and abs(start[1] - end[1]) > 1 else f\"ก้าว {abs(start[0] - end[0]) + abs(start[1] - end[1])}\")\n"] },
  "py2-algo/5": { sol: "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef count_paths(r, c):\n    if r == 0 or c == 0:\n        return 1\n    return count_paths(r - 1, c) + count_paths(r, c - 1)\n", wrong: ["from functools import lru_cache\n\ndef count_paths(r, c):\n    if r == 0 or c == 0:\n        return 1\n    return count_paths(r - 1, c) + count_paths(r, c - 1)\n"] },
  "py2-algo/6": { sol: "def find_first_ge(nums, x):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n", wrong: ["def find_first_ge(nums, x):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] <= x:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n"] },
  "py2-algo/7": { sol: "import bisect\nimport statistics\n\nn = int(input())\nscores = [int(t) for t in input().split()]\nq = int(input())\nqueries = [int(t) for t in input().split()]\nordered = sorted(scores)\ntop = sorted(set(scores), reverse=True)[:3]\nrank_sum = sum(1 + n - bisect.bisect_right(ordered, x) for x in queries)\nprint(\"สามอันดับแรก: \" + \" \".join(str(s) for s in top))\nprint(f\"ผลรวมอันดับ: {rank_sum}\")\nprint(f\"มัธยฐาน: {statistics.median(ordered):.1f}\")\n", wrong: ["import statistics\n\nn = int(input())\nscores = [int(t) for t in input().split()]\nq = int(input())\nqueries = [int(t) for t in input().split()]\ntop = sorted(set(scores), reverse=True)[:3]\nrank_sum = sum(1 + sum(1 for s in scores if s > x) for x in queries)\nprint(\"สามอันดับแรก: \" + \" \".join(str(s) for s in top))\nprint(f\"ผลรวมอันดับ: {rank_sum}\")\nprint(f\"มัธยฐาน: {statistics.median(scores):.1f}\")\n", "import bisect\nimport statistics\n\nn = int(input())\nscores = [int(t) for t in input().split()]\nq = int(input())\nqueries = [int(t) for t in input().split()]\nordered = sorted(scores)\ntop = sorted(scores, reverse=True)[:3]\nrank_sum = sum(1 + n - bisect.bisect_left(ordered, x) for x in queries)\nprint(\"สามอันดับแรก: \" + \" \".join(str(s) for s in top))\nprint(f\"ผลรวมอันดับ: {rank_sum}\")\nprint(f\"มัธยฐาน: {statistics.median(ordered):.1f}\")\n"] },

  // ── Stage 34–35 (สร้างด้วย json.dumps) ──
  "py2-async/0": { sol: "import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    return f\"{name}:ok\"\n\n\nasync def fetch_all(items):\n    return await asyncio.gather(*(fetch(name, delay) for name, delay in items))\n\n\nasync def main():\n    items = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\n    loop = asyncio.get_running_loop()\n    start = loop.time()\n    results = await fetch_all(items)\n    elapsed = loop.time() - start\n    print(results)\n    total = sum(d for _, d in items) / 100\n    print(\"ทำงานพร้อมกัน:\", len(items) < 2 or elapsed < total * 0.6)\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nasyncio.run(main())\n", wrong: ["import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    return f\"{name}:ok\"\n\n\nasync def fetch_all(items):\n    return [await fetch(name, delay) for name, delay in items]\n\n\nasync def main():\n    items = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\n    loop = asyncio.get_running_loop()\n    start = loop.time()\n    results = await fetch_all(items)\n    elapsed = loop.time() - start\n    print(results)\n    total = sum(d for _, d in items) / 100\n    print(\"ทำงานพร้อมกัน:\", len(items) < 2 or elapsed < total * 0.6)\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nasyncio.run(main())\n"] },
  "py2-async/1": { sol: "import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    return f\"{name}:ok\"\n\n\nasync def fetch_all(items):\n    return await asyncio.gather(*(fetch(name, delay) for name, delay in items))\n\n\nasync def main():\n    items = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\n    loop = asyncio.get_running_loop()\n    start = loop.time()\n    results = await fetch_all(items)\n    elapsed = loop.time() - start\n    print(results)\n    total = sum(d for _, d in items) / 100\n    print(\"ทำงานพร้อมกัน:\", len(items) < 2 or elapsed < total * 0.6)\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nasyncio.run(main())\n", wrong: ["import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    return f\"{name}:ok\"\n\n\nasync def fetch_all(items):\n    return [await fetch(name, delay) for name, delay in items]\n\n\nasync def main():\n    items = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\n    loop = asyncio.get_running_loop()\n    start = loop.time()\n    results = await fetch_all(items)\n    elapsed = loop.time() - start\n    print(results)\n    total = sum(d for _, d in items) / 100\n    print(\"ทำงานพร้อมกัน:\", len(items) < 2 or elapsed < total * 0.6)\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nasyncio.run(main())\n"] },
  "py2-async/2": { sol: "import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    return f\"{name}:ok\"\n\n\nasync def fetch_all(items):\n    return await asyncio.gather(*(fetch(name, delay) for name, delay in items))\n\n\nasync def main():\n    items = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\n    loop = asyncio.get_running_loop()\n    start = loop.time()\n    results = await fetch_all(items)\n    elapsed = loop.time() - start\n    print(results)\n    total = sum(d for _, d in items) / 100\n    print(\"ทำงานพร้อมกัน:\", len(items) < 2 or elapsed < total * 0.6)\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nasyncio.run(main())\n", wrong: ["import asyncio\nimport time\n\n\nasync def fetch(name, delay):\n    time.sleep(delay / 100)\n    await asyncio.sleep(0)\n    return f\"{name}:ok\"\n\n\nasync def fetch_all(items):\n    return await asyncio.gather(*(fetch(name, delay) for name, delay in items))\n\n\nasync def main():\n    items = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\n    loop = asyncio.get_running_loop()\n    start = loop.time()\n    results = await fetch_all(items)\n    elapsed = loop.time() - start\n    print(results)\n    total = sum(d for _, d in items) / 100\n    print(\"ทำงานพร้อมกัน:\", len(items) < 2 or elapsed < total * 0.6)\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nasyncio.run(main())\n"] },
  "py2-async/3": { sol: "import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    if name.startswith(\"bad\"):\n        raise ValueError(f\"{name} ล้มเหลว\")\n    return f\"{name}:ok\"\n\n\nasync def collect(items):\n    try:\n        async with asyncio.TaskGroup() as tg:\n            tasks = [tg.create_task(fetch(name, delay)) for name, delay in items]\n    except* ValueError as group:\n        message = \"ล้มเหลว: \" + str(sorted(str(e) for e in group.exceptions))\n    else:\n        message = None\n    return message if message is not None else [t.result() for t in tasks]\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nitems = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\nprint(asyncio.run(collect(items)))\n", wrong: ["import asyncio\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay / 100)\n    if name.startswith(\"bad\"):\n        raise ValueError(f\"{name} ล้มเหลว\")\n    return f\"{name}:ok\"\n\n\nasync def collect(items):\n    results = await asyncio.gather(*(fetch(n, d) for n, d in items), return_exceptions=True)\n    errors = sorted(str(r) for r in results if isinstance(r, ValueError))\n    try:\n        async with asyncio.TaskGroup() as tg:\n            pass\n    except* ValueError:\n        pass\n    if errors:\n        return \"ล้มเหลว: \" + str(errors)\n    return results\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nitems = [(name, int(delay)) for name, delay in (line.split() for line in lines)]\nprint(asyncio.run(collect(items)))\n"] },
  "py2-async/4": { sol: "import asyncio\n\n\nasync def fetch_with_timeout(delay, limit):\n    try:\n        async with asyncio.timeout(limit):\n            await asyncio.sleep(delay)\n    except TimeoutError:\n        return \"timeout\"\n    return \"ok\"\n", wrong: ["import asyncio\n\n\nasync def fetch_with_timeout(delay, limit):\n    await asyncio.sleep(delay)\n    if delay > limit:\n        return \"timeout\"\n    return \"ok\"\n\n\nasync def _unused():\n    await asyncio.wait_for(asyncio.sleep(0), 1)\n"] },
  "py2-async/5": { sol: "import asyncio\n\n\nasync def fetch(name, delay, kind):\n    await asyncio.sleep(delay / 100)\n    if kind == \"fail\":\n        raise ConnectionError(f\"{name} เชื่อมต่อไม่ได้\")\n    return f\"{name}: ok\"\n\n\nasync def collect(sources):\n    sem = asyncio.Semaphore(2)\n    state = {\"running\": 0, \"peak\": 0}\n\n    async def run(name, delay, kind):\n        async with sem:\n            state[\"running\"] += 1\n            state[\"peak\"] = max(state[\"peak\"], state[\"running\"])\n            try:\n                async with asyncio.timeout(0.2):\n                    await fetch(name, delay, kind)\n                return name, \"ok\"\n            except TimeoutError:\n                return name, \"หมดเวลา\"\n            except ConnectionError:\n                return name, \"ล้มเหลว\"\n            finally:\n                state[\"running\"] -= 1\n\n    results = await asyncio.gather(*(run(n, d, k) for n, d, k in sources))\n    return results, state[\"peak\"]\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nsources = [(name, int(delay), kind) for name, delay, kind in (line.split() for line in lines)]\nresults, peak = asyncio.run(collect(sources))\nfor name, status in results:\n    print(f\"{name}: {status}\")\nstatuses = [s for _, s in results]\nprint(f\"สำเร็จ {statuses.count('ok')} · ล้มเหลว {statuses.count('ล้มเหลว')} · หมดเวลา {statuses.count('หมดเวลา')}\")\nprint(f\"สูงสุดพร้อมกัน {peak}\")\n", wrong: ["import asyncio\n\n\nasync def fetch(name, delay, kind):\n    await asyncio.sleep(delay / 100)\n    if kind == \"fail\":\n        raise ConnectionError(f\"{name} เชื่อมต่อไม่ได้\")\n    return f\"{name}: ok\"\n\n\nasync def collect(sources):\n    sem = asyncio.Semaphore(2)\n    state = {\"running\": 0, \"peak\": 0}\n\n    async def run(name, delay, kind):\n        async with sem:\n            pass\n        state[\"running\"] += 1\n        state[\"peak\"] = max(state[\"peak\"], state[\"running\"])\n        try:\n            async with asyncio.timeout(0.2):\n                await fetch(name, delay, kind)\n            return name, \"ok\"\n        except TimeoutError:\n            return name, \"หมดเวลา\"\n        except ConnectionError:\n            return name, \"ล้มเหลว\"\n        finally:\n            state[\"running\"] -= 1\n\n    results = await asyncio.gather(*(run(n, d, k) for n, d, k in sources))\n    return results, state[\"peak\"]\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nsources = [(name, int(delay), kind) for name, delay, kind in (line.split() for line in lines)]\nresults, peak = asyncio.run(collect(sources))\nfor name, status in results:\n    print(f\"{name}: {status}\")\nstatuses = [s for _, s in results]\nprint(f\"สำเร็จ {statuses.count('ok')} · ล้มเหลว {statuses.count('ล้มเหลว')} · หมดเวลา {statuses.count('หมดเวลา')}\")\nprint(f\"สูงสุดพร้อมกัน {peak}\")\n", "import asyncio\n\n\nasync def fetch(name, delay, kind):\n    await asyncio.sleep(delay / 100)\n    if kind == \"fail\":\n        raise ConnectionError(f\"{name} เชื่อมต่อไม่ได้\")\n    return f\"{name}: ok\"\n\n\nasync def collect(sources):\n    sem = asyncio.Semaphore(2)\n    state = {\"running\": 0, \"peak\": 0}\n\n    async def run(name, delay, kind):\n        try:\n            async with asyncio.timeout(0.2):\n                async with sem:\n                    state[\"running\"] += 1\n                    state[\"peak\"] = max(state[\"peak\"], state[\"running\"])\n                    try:\n                        await fetch(name, delay, kind)\n                    finally:\n                        state[\"running\"] -= 1\n            return name, \"ok\"\n        except TimeoutError:\n            return name, \"หมดเวลา\"\n        except ConnectionError:\n            return name, \"ล้มเหลว\"\n\n    results = await asyncio.gather(*(run(n, d, k) for n, d, k in sources))\n    return results, state[\"peak\"]\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nsources = [(name, int(delay), kind) for name, delay, kind in (line.split() for line in lines)]\nresults, peak = asyncio.run(collect(sources))\nfor name, status in results:\n    print(f\"{name}: {status}\")\nstatuses = [s for _, s in results]\nprint(f\"สำเร็จ {statuses.count('ok')} · ล้มเหลว {statuses.count('ล้มเหลว')} · หมดเวลา {statuses.count('หมดเวลา')}\")\nprint(f\"สูงสุดพร้อมกัน {peak}\")\n"] },
  "py2-data/0": { sol: "import csv\nimport statistics\nfrom collections import defaultdict\n\ntry:\n    with open(\"sales.csv\", encoding=\"utf-8\", newline=\"\") as f:\n        rows = list(csv.DictReader(f))\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ sales.csv\")\nelse:\n    groups = defaultdict(list)\n    skipped = 0\n    for row in rows:\n        try:\n            amount = float(row[\"amount\"])\n        except ValueError:\n            skipped += 1\n            continue\n        groups[row[\"region\"]].append(amount)\n    if not groups:\n        print(\"ไม่มีข้อมูล\")\n    for region, amounts in sorted(groups.items(), key=lambda kv: (-sum(kv[1]), kv[0])):\n        print(f\"{region}: {len(amounts)} รายการ · รวม {sum(amounts):,.2f} · เฉลี่ย {statistics.mean(amounts):,.2f} · มัธยฐาน {statistics.median(amounts):,.2f}\")\n    print(f\"ข้ามข้อมูลผิด {skipped}\")\n", wrong: ["import csv\nimport statistics\nfrom collections import defaultdict\n\ntry:\n    with open(\"sales.csv\", encoding=\"utf-8\", newline=\"\") as f:\n        rows = list(csv.DictReader(f))\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ sales.csv\")\nelse:\n    groups = defaultdict(list)\n    skipped = 0\n    for row in rows:\n        try:\n            groups[row[\"region\"]].append(float(row[\"amount\"]))\n        except ValueError:\n            skipped += 1\n    if not groups:\n        print(\"ไม่มีข้อมูล\")\n    for region, amounts in sorted(groups.items(), key=lambda kv: -sum(kv[1])):\n        print(f\"{region}: {len(amounts)} รายการ · รวม {sum(amounts):.2f} · เฉลี่ย {statistics.mean(amounts):.2f} · มัธยฐาน {statistics.median(amounts):.2f}\")\n    print(f\"ข้ามข้อมูลผิด {skipped}\")\n"] },
  "py2-data/1": { sol: "import csv\nimport json\nimport sys\n\ntry:\n    with open(\"orders.json\", encoding=\"utf-8\") as f:\n        orders = json.load(f)\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ orders.json\")\nelse:\n    writer = csv.DictWriter(sys.stdout, fieldnames=[\"id\", \"customer\", \"city\", \"sku\", \"qty\"], lineterminator=\"\\n\")\n    writer.writeheader()\n    for order in orders:\n        for item in order[\"items\"]:\n            writer.writerow({\"id\": order[\"id\"], \"customer\": order[\"customer\"][\"name\"], \"city\": order[\"customer\"][\"city\"], \"sku\": item[\"sku\"], \"qty\": item[\"qty\"]})\n", wrong: ["import csv\nimport json\nimport sys\n\ntry:\n    with open(\"orders.json\", encoding=\"utf-8\") as f:\n        orders = json.load(f)\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ orders.json\")\nelse:\n    writer = csv.DictWriter(sys.stdout, fieldnames=[\"id\", \"customer\", \"city\", \"sku\", \"qty\"], lineterminator=\"\\n\")\n    writer.writeheader()\n    for order in orders:\n        for item in order[\"items\"]:\n            print(\",\".join(str(v) for v in [order[\"id\"], order[\"customer\"][\"name\"], order[\"customer\"][\"city\"], item[\"sku\"], item[\"qty\"]]))\n"] },
  "py2-data/2": { sol: "import csv\nimport json\nfrom collections import defaultdict\n\nREQUIRED = [\"title\", \"group_by\", \"value\", \"top\"]\n\n\ndef load_config(path):\n    with open(path, encoding=\"utf-8\") as f:\n        config = json.load(f)\n    for key in REQUIRED:\n        if key not in config:\n            raise ValueError(f\"ตั้งค่าไม่ครบ: {key}\")\n    return config\n\n\ndef load_rows(path, config):\n    with open(path, encoding=\"utf-8\", newline=\"\") as f:\n        reader = csv.DictReader(f)\n        for column in (config[\"group_by\"], config[\"value\"]):\n            if column not in (reader.fieldnames or []):\n                raise ValueError(f\"ไม่มีคอลัมน์ {column} ในข้อมูล\")\n        return list(reader)\n\n\ndef summarize(rows, config):\n    groups = defaultdict(list)\n    skipped = 0\n    for row in rows:\n        try:\n            groups[row[config[\"group_by\"]]].append(float(row[config[\"value\"]]))\n        except ValueError:\n            skipped += 1\n    return groups, skipped\n\n\ndef render(config, groups, skipped):\n    key = config[\"group_by\"]\n    lines = [f\"# {config['title']}\", f\"| {key} | รวม | จำนวน |\", \"|---|---:|---:|\"]\n    ranked = sorted(groups.items(), key=lambda kv: (-sum(kv[1]), kv[0]))[: config[\"top\"]]\n    for name, values in ranked:\n        lines.append(f\"| {name} | {sum(values):,.2f} | {len(values)} |\")\n    total = sum(sum(v) for v in groups.values())\n    count = sum(len(v) for v in groups.values())\n    summary = f\"ทั้งหมด {total:,.2f} จาก {count} รายการ\"\n    if skipped:\n        summary += f\" · ข้ามข้อมูลผิด {skipped}\"\n    return \"\\n\".join(lines + [\"\", summary])\n\n\ntry:\n    config = load_config(\"report.json\")\n    rows = load_rows(\"data.csv\", config)\nexcept FileNotFoundError as e:\n    print(f\"ไม่พบไฟล์ {e.filename}\")\nexcept ValueError as e:\n    print(e)\nelse:\n    groups, skipped = summarize(rows, config)\n    print(render(config, groups, skipped))\n", wrong: ["import csv\nimport json\nfrom collections import defaultdict\n\ntry:\n    with open(\"report.json\", encoding=\"utf-8\") as f:\n        config = json.load(f)\n    with open(\"data.csv\", encoding=\"utf-8\", newline=\"\") as f:\n        rows = list(csv.DictReader(f))\nexcept FileNotFoundError as e:\n    print(f\"ไม่พบไฟล์ {e.filename}\")\nelse:\n    groups = defaultdict(list)\n    skipped = 0\n    for row in rows:\n        try:\n            groups[row[config[\"group_by\"]]].append(float(row[config[\"value\"]]))\n        except ValueError:\n            skipped += 1\n    key = config[\"group_by\"]\n    print(f\"# {config['title']}\")\n    print(f\"| {key} | รวม | จำนวน |\")\n    print(\"|---|---:|---:|\")\n    for name, values in sorted(groups.items(), key=lambda kv: (-sum(kv[1]), kv[0]))[: config[\"top\"]]:\n        print(f\"| {name} | {sum(values):,.2f} | {len(values)} |\")\n    print()\n    total = sum(sum(v) for v in groups.values())\n    count = sum(len(v) for v in groups.values())\n    print(f\"ทั้งหมด {total:,.2f} จาก {count} รายการ\" + (f\" · ข้ามข้อมูลผิด {skipped}\" if skipped else \"\"))\n"] },

  // ── Stage 36–37 (สร้างด้วย json.dumps) ──
  "py2-craft/0": { sol: "EXPRESS_FEE = 50\nTIERS = [(1, 40), (5, 80), (20, 150)]\nMAX_WEIGHT_KG = 20\n\n\ndef shipping_fee(weight_kg, express=False):\n    \"\"\"คืนค่าส่ง (บาท) ตามน้ำหนัก · น้ำหนักไม่เกิน 0 หรือเกิน 20 กก. เกิด ValueError\"\"\"\n    if weight_kg <= 0 or weight_kg > MAX_WEIGHT_KG:\n        raise ValueError(\"น้ำหนักต้องมากกว่า 0 และไม่เกิน 20 กก.\")\n    fee = next(price for limit, price in TIERS if weight_kg <= limit)\n    return fee + EXPRESS_FEE if express else fee\n", wrong: ["EXPRESS_FEE = 50\nTIERS = [(1, 40), (5, 80), (20, 150)]\n\n\ndef shipping_fee(weight_kg, express=False):\n    \"\"\"คืนค่าส่ง (บาท) ตามน้ำหนัก\"\"\"\n    for limit, price in TIERS:\n        if weight_kg <= limit:\n            return price + EXPRESS_FEE if express else price\n    return -1\n"] },
  "py2-craft/1": { sol: "def calc_total(prices, tax_rate):\n    \"\"\"คืนยอดรวมหลังบวกภาษี ปัดทศนิยมสองตำแหน่ง\"\"\"\n    if not prices:\n        return 0.0\n    subtotal = sum(prices)\n    return round(subtotal * (1 + tax_rate), 2)\n", wrong: ["def calc_total(prices, tax_rate):\n    subTotal = sum(prices)\n    return round(subTotal * (1 + tax_rate), 2) if prices else 0.0\n", "def calc_total(prices, tax_rate):\n    \"\"\"คืนยอดรวมหลังบวกภาษี\"\"\"\n    subtotal = sum(prices)\n    return subtotal * (1 + tax_rate)\n"] },
  "py2-craft/2": { sol: "def format_line(label, amount):\n    return f\"{label:<12}{amount:>10,.2f}\"\n\n\nsubtotal = float(input())\ndiscount = float(input())\ntotal = subtotal - discount\nfor label, amount in [(\"ยอดรวม\", subtotal), (\"ส่วนลด\", discount), (\"สุทธิ\", total)]:\n    print(format_line(label, amount))\n", wrong: ["def format_line(label, amount):\n    return f\"{label:<12}{amount:>10.2f}\"\n\n\nsubtotal = float(input())\ndiscount = float(input())\ntotal = subtotal - discount\nfor label, amount in [(\"ยอดรวม\", subtotal), (\"ส่วนลด\", discount), (\"สุทธิ\", total)]:\n    print(format_line(label, amount))\n"] },
  "py2-craft/3": { sol: "def record(score, history=None):\n    if history is None:\n        history = []\n    history.append(score)\n    return history\n\n\ndef top(scores, n):\n    return sorted(scores, reverse=True)[:n]\n\n\ndef parse(text):\n    try:\n        return int(text)\n    except ValueError:\n        return 0\n\n\nprint(record(1))\nprint(record(2))\nprint(top([5, 1, 9, 3], 2))\nprint(parse(\"x\"))\ntry:\n    parse(None)\nexcept TypeError:\n    print(\"TypeError\")\n", wrong: ["def record(score, history=None):\n    if history is None:\n        history = []\n    history.append(score)\n    return history\n\n\ndef top(scores, n):\n    return sorted(scores, reverse=True)[:n]\n\n\ndef parse(text):\n    try:\n        return int(text)\n    except Exception:\n        return 0\n\n\nprint(record(1))\nprint(record(2))\nprint(top([5, 1, 9, 3], 2))\nprint(parse(\"x\"))\ntry:\n    parse(None)\nexcept TypeError:\n    print(\"TypeError\")\n"] },
  "py2-perf/0": { sol: "n = int(input())\nvalues = [int(t) for t in input().split()]\nseen = set()\nresult = []\nfor x in values:\n    if x not in seen:\n        seen.add(x)\n        result.append(x)\nprint(\"ไม่ซ้ำ\", len(result))\nprint(\" \".join(str(x) for x in result[:3]))\n", wrong: ["n = int(input())\nvalues = [int(t) for t in input().split()]\nresult = sorted(set(values))\nprint(\"ไม่ซ้ำ\", len(result))\nprint(\" \".join(str(x) for x in result[:3]))\n"] },
  "py2-perf/1": { sol: "from functools import lru_cache\n\n\n@lru_cache(maxsize=None)\ndef edit_distance(a, b):\n    if not a:\n        return len(b)\n    if not b:\n        return len(a)\n    if a[0] == b[0]:\n        return edit_distance(a[1:], b[1:])\n    return 1 + min(\n        edit_distance(a[1:], b),\n        edit_distance(a, b[1:]),\n        edit_distance(a[1:], b[1:]),\n    )\n", wrong: ["memo = {}\n\n\ndef edit_distance(a, b):\n    if not a:\n        return len(b)\n    if not b:\n        return len(a)\n    if a[0] == b[0]:\n        return edit_distance(a[1:], b[1:])\n    return 1 + min(\n        edit_distance(a[1:], b),\n        edit_distance(a, b[1:]),\n        edit_distance(a[1:], b[1:]),\n    )\n"] },
  "py2-perf/2": { sol: "from collections import deque\n\nn = int(input())\nqueue = deque(int(t) for t in input().split())\nsteps = 0\nwhile queue:\n    x = queue.popleft()\n    steps += 1\n    if x % 2 == 0:\n        queue.append(x // 2)\nprint(\"ขั้น\", steps)\n", wrong: ["from collections import deque\n\nn = int(input())\nqueue = list(deque(int(t) for t in input().split()))\nsteps = 0\nwhile queue:\n    x = queue.pop(0)\n    steps += 1\n    if x % 2 == 0:\n        queue.append(x // 2)\nprint(\"ขั้น\", steps)\n"] },
  "py2-perf/3": { sol: "from itertools import accumulate\n\nn = int(input())\nvalues = [int(t) for t in input().split()]\nq = int(input())\nnums = [int(t) for t in input().split()]\nprefix = [0, *accumulate(values)]\ntotal = 0\nfor i in range(0, q, 2):\n    l, r = sorted((nums[i], nums[i + 1]))\n    total += prefix[r] - prefix[l - 1]\nprint(\"ผลรวมคำตอบ\", total)\n", wrong: ["from itertools import accumulate\n\nn = int(input())\nvalues = [int(t) for t in input().split()]\nq = int(input())\nnums = [int(t) for t in input().split()]\nprefix = [0, *accumulate(values)]\ntotal = 0\nfor i in range(0, q, 2):\n    l, r = nums[i], nums[i + 1]\n    total += prefix[r] - prefix[l - 1]\nprint(\"ผลรวมคำตอบ\", total)\n"] },

  // ── Final Capstone C1–C7 (สร้างด้วย json.dumps) ──
  "py2-capstone/0": { sol: "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nwhile (line := input()) != \"end\":\n    sku, name, price = line.split(\",\")\n    try:\n        p = Product(sku, name, Decimal(price))\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\n    else:\n        print(p.sku, p.name, p.price)\n", wrong: ["from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.match(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nwhile (line := input()) != \"end\":\n    sku, name, price = line.split(\",\")\n    try:\n        p = Product(sku, name, Decimal(price))\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\n    else:\n        print(p.sku, p.name, p.price)\n", "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price < 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nwhile (line := input()) != \"end\":\n    sku, name, price = line.split(\",\")\n    try:\n        p = Product(sku, name, Decimal(price))\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\n    else:\n        print(p.sku, p.name, p.price)\n"] },
  "py2-capstone/1": { sol: "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    try:\n        if cmd == \"add\":\n            sku, name, price, qty = args\n            inv.add(Product(sku, name, Decimal(price)), int(qty))\n            print(f\"เพิ่ม {sku} คงเหลือ {inv.stock(sku)}\")\n        elif cmd == \"remove\":\n            inv.remove(args[0], int(args[1]))\n            print(f\"ตัด {args[0]} คงเหลือ {inv.stock(args[0])}\")\n        elif cmd == \"stock\":\n            print(f\"{args[0]}: {inv.stock(args[0])}\")\n        elif cmd == \"list\":\n            print(\", \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()) or \"(ว่าง)\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\n", wrong: ["from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        self._stock[sku] = available - qty\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n\n    def skus(self):\n        return sorted(self._products)\n\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    try:\n        if cmd == \"add\":\n            sku, name, price, qty = args\n            inv.add(Product(sku, name, Decimal(price)), int(qty))\n            print(f\"เพิ่ม {sku} คงเหลือ {inv.stock(sku)}\")\n        elif cmd == \"remove\":\n            inv.remove(args[0], int(args[1]))\n            print(f\"ตัด {args[0]} คงเหลือ {inv.stock(args[0])}\")\n        elif cmd == \"stock\":\n            print(f\"{args[0]}: {inv.stock(args[0])}\")\n        elif cmd == \"list\":\n            print(\", \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()) or \"(ว่าง)\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\n", "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    try:\n        if cmd == \"add\":\n            sku, name, price, qty = args\n            inv.add(Product(sku, name, Decimal(price)), int(qty))\n            print(f\"เพิ่ม {sku} คงเหลือ {inv.stock(sku)}\")\n        elif cmd == \"remove\":\n            inv.remove(args[0], int(args[1]))\n            print(f\"ตัด {args[0]} คงเหลือ {inv.stock(args[0])}\")\n        elif cmd == \"stock\":\n            print(f\"{args[0]}: {inv.stock(args[0])}\")\n        elif cmd == \"list\":\n            print(\", \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()) or \"(ว่าง)\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\n"] },
  "py2-capstone/2": { sol: "from dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\ncatalog = {}\nlines = []\nwhile (line := input()) != \"end\":\n    kind, *args = line.split()\n    try:\n        if kind == \"product\":\n            catalog[args[0]] = Product(args[0], args[1], Decimal(args[2]))\n        elif kind == \"line\":\n            lines.append(OrderLine(catalog[args[0]], int(args[1])))\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\norder = Order(lines)\nfor l in order.lines:\n    print(f\"{l.product.name} x{l.qty} = {l.subtotal:,.2f}\")\nprint(f\"รวม {order.subtotal:,.2f} · VAT {order.vat:,.2f} · สุทธิ {order.total:,.2f}\")\n", wrong: ["from dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return Decimal(str(round(float(self.subtotal) * 0.07, 2)))\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\ncatalog = {}\nlines = []\nwhile (line := input()) != \"end\":\n    kind, *args = line.split()\n    try:\n        if kind == \"product\":\n            catalog[args[0]] = Product(args[0], args[1], Decimal(args[2]))\n        elif kind == \"line\":\n            lines.append(OrderLine(catalog[args[0]], int(args[1])))\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\norder = Order(lines)\nfor l in order.lines:\n    print(f\"{l.product.name} x{l.qty} = {l.subtotal:,.2f}\")\nprint(f\"รวม {order.subtotal:,.2f} · VAT {order.vat:,.2f} · สุทธิ {order.total:,.2f}\")\n", "from dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty < 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\ncatalog = {}\nlines = []\nwhile (line := input()) != \"end\":\n    kind, *args = line.split()\n    try:\n        if kind == \"product\":\n            catalog[args[0]] = Product(args[0], args[1], Decimal(args[2]))\n        elif kind == \"line\":\n            lines.append(OrderLine(catalog[args[0]], int(args[1])))\n    except ValueError as e:\n        print(\"ข้อมูลผิด:\", e)\norder = Order(lines)\nfor l in order.lines:\n    print(f\"{l.product.name} x{l.qty} = {l.subtotal:,.2f}\")\nprint(f\"รวม {order.subtotal:,.2f} · VAT {order.vat:,.2f} · สุทธิ {order.total:,.2f}\")\n"] },
  "py2-capstone/3": { sol: "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\ninv = Inventory()\ninv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 5)\ninv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 2)\ninv.add(Product(\"RL-003\", \"ไม้บรรทัด\", Decimal(\"15\")), 1)\nwhile (line := input()) != \"end\":\n    items = [(sku, int(qty)) for sku, qty in (part.split(\":\") for part in line.split())]\n    try:\n        place_order(inv, items)\n        print(\"สำเร็จ\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n    print(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()))\n", wrong: ["from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    for sku, qty in items:\n        inventory.remove(sku, qty)\n\n\ninv = Inventory()\ninv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 5)\ninv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 2)\ninv.add(Product(\"RL-003\", \"ไม้บรรทัด\", Decimal(\"15\")), 1)\nwhile (line := input()) != \"end\":\n    items = [(sku, int(qty)) for sku, qty in (part.split(\":\") for part in line.split())]\n    try:\n        place_order(inv, items)\n        print(\"สำเร็จ\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n    print(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()))\n", "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    for sku, qty in items:\n        available = inventory.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"สินค้าไม่พอ: {sku} (ต้องการ {qty} เหลือ {available})\")\n    for sku, qty in items:\n        inventory.remove(sku, qty)\n\n\ninv = Inventory()\ninv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 5)\ninv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 2)\ninv.add(Product(\"RL-003\", \"ไม้บรรทัด\", Decimal(\"15\")), 1)\nwhile (line := input()) != \"end\":\n    items = [(sku, int(qty)) for sku, qty in (part.split(\":\") for part in line.split())]\n    try:\n        place_order(inv, items)\n        print(\"สำเร็จ\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n    print(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()))\n"] },
  "py2-capstone/4": { sol: "from dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nimport re\nfrom typing import Protocol\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\nclass DiscountRule(Protocol):\n    def discount(self, order: Order) -> Decimal: ...\n\n\n@dataclass(frozen=True)\nclass PercentOff:\n    percent: int\n    min_subtotal: Decimal\n\n    def discount(self, order):\n        if order.subtotal < self.min_subtotal:\n            return Decimal(\"0\")\n        return (order.subtotal * self.percent / 100).quantize(CENT, rounding=ROUND_HALF_UP)\n\n\n@dataclass(frozen=True)\nclass BuyXGetY:\n    sku: str\n    buy: int\n    free: int\n\n    def discount(self, order):\n        qty = sum(l.qty for l in order.lines if l.product.sku == self.sku)\n        price = next((l.product.price for l in order.lines if l.product.sku == self.sku), Decimal(\"0\"))\n        groups = qty // (self.buy + self.free)\n        return price * self.free * groups\n\n\ndef best_discount(order, rules):\n    best = None\n    for rule in rules:\n        amount = rule.discount(order)\n        if amount > 0 and (best is None or amount > best[1]):\n            best = (rule, amount)\n    return best\n\n\ncatalog = {}\nlines = []\nrules = []\nwhile (line := input()) != \"end\":\n    kind, *args = line.split()\n    if kind == \"product\":\n        catalog[args[0]] = Product(args[0], args[1], Decimal(args[2]))\n    elif kind == \"line\":\n        lines.append(OrderLine(catalog[args[0]], int(args[1])))\n    elif kind == \"percent\":\n        rules.append(PercentOff(int(args[0]), Decimal(args[1])))\n    elif kind == \"bxgy\":\n        rules.append(BuyXGetY(args[0], int(args[1]), int(args[2])))\norder = Order(lines)\nprint(f\"ยอดก่อนส่วนลด {order.subtotal:,.2f}\")\nbest = best_discount(order, rules)\nif best is None:\n    print(\"ไม่มีส่วนลด\")\nelse:\n    rule, amount = best\n    print(f\"ใช้ {rule} ลด {amount:,.2f} · เหลือ {order.subtotal - amount:,.2f}\")\n", wrong: ["from dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nimport re\nfrom typing import Protocol\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\nclass DiscountRule(Protocol):\n    def discount(self, order: Order) -> Decimal: ...\n\n\n@dataclass(frozen=True)\nclass PercentOff:\n    percent: int\n    min_subtotal: Decimal\n\n    def discount(self, order):\n        if order.subtotal < self.min_subtotal:\n            return Decimal(\"0\")\n        return (order.subtotal * self.percent / 100).quantize(CENT, rounding=ROUND_HALF_UP)\n\n\n@dataclass(frozen=True)\nclass BuyXGetY:\n    sku: str\n    buy: int\n    free: int\n\n    def discount(self, order):\n        qty = sum(l.qty for l in order.lines if l.product.sku == self.sku)\n        price = next((l.product.price for l in order.lines if l.product.sku == self.sku), Decimal(\"0\"))\n        groups = qty // self.buy\n        return price * self.free * groups\n\n\ndef best_discount(order, rules):\n    best = None\n    for rule in rules:\n        amount = rule.discount(order)\n        if amount > 0 and (best is None or amount > best[1]):\n            best = (rule, amount)\n    return best\n\n\ncatalog = {}\nlines = []\nrules = []\nwhile (line := input()) != \"end\":\n    kind, *args = line.split()\n    if kind == \"product\":\n        catalog[args[0]] = Product(args[0], args[1], Decimal(args[2]))\n    elif kind == \"line\":\n        lines.append(OrderLine(catalog[args[0]], int(args[1])))\n    elif kind == \"percent\":\n        rules.append(PercentOff(int(args[0]), Decimal(args[1])))\n    elif kind == \"bxgy\":\n        rules.append(BuyXGetY(args[0], int(args[1]), int(args[2])))\norder = Order(lines)\nprint(f\"ยอดก่อนส่วนลด {order.subtotal:,.2f}\")\nbest = best_discount(order, rules)\nif best is None:\n    print(\"ไม่มีส่วนลด\")\nelse:\n    rule, amount = best\n    print(f\"ใช้ {rule} ลด {amount:,.2f} · เหลือ {order.subtotal - amount:,.2f}\")\n", "from dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nimport re\nfrom typing import Protocol\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\nclass DiscountRule(Protocol):\n    def discount(self, order: Order) -> Decimal: ...\n\n\n@dataclass(frozen=True)\nclass PercentOff:\n    percent: int\n    min_subtotal: Decimal\n\n    def discount(self, order):\n        if order.subtotal < self.min_subtotal:\n            return Decimal(\"0\")\n        return (order.subtotal * self.percent / 100).quantize(CENT, rounding=ROUND_HALF_UP)\n\n\n@dataclass(frozen=True)\nclass BuyXGetY:\n    sku: str\n    buy: int\n    free: int\n\n    def discount(self, order):\n        qty = sum(l.qty for l in order.lines if l.product.sku == self.sku)\n        price = next((l.product.price for l in order.lines if l.product.sku == self.sku), Decimal(\"0\"))\n        groups = qty // (self.buy + self.free)\n        return price * self.free * groups\n\n\ndef best_discount(order, rules):\n    best = None\n    for rule in rules:\n        amount = rule.discount(order)\n        if amount > 0 and (best is None or amount >= best[1]):\n            best = (rule, amount)\n    return best\n\n\ncatalog = {}\nlines = []\nrules = []\nwhile (line := input()) != \"end\":\n    kind, *args = line.split()\n    if kind == \"product\":\n        catalog[args[0]] = Product(args[0], args[1], Decimal(args[2]))\n    elif kind == \"line\":\n        lines.append(OrderLine(catalog[args[0]], int(args[1])))\n    elif kind == \"percent\":\n        rules.append(PercentOff(int(args[0]), Decimal(args[1])))\n    elif kind == \"bxgy\":\n        rules.append(BuyXGetY(args[0], int(args[1]), int(args[2])))\norder = Order(lines)\nprint(f\"ยอดก่อนส่วนลด {order.subtotal:,.2f}\")\nbest = best_discount(order, rules)\nif best is None:\n    print(\"ไม่มีส่วนลด\")\nelse:\n    rule, amount = best\n    print(f\"ใช้ {rule} ลด {amount:,.2f} · เหลือ {order.subtotal - amount:,.2f}\")\n"] },
  "py2-capstone/5": { sol: "import json\nfrom pathlib import Path\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\nclass StorageError(ShopError):\n    pass\n\n\ndef save_inventory(inventory, path):\n    data = [{\"sku\": s, \"name\": inventory.product(s).name, \"price\": str(inventory.product(s).price), \"stock\": inventory.stock(s)} for s in inventory.skus()]\n    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\n\ndef load_inventory(path):\n    try:\n        data = json.loads(Path(path).read_text(encoding=\"utf-8\"))\n        inventory = Inventory()\n        for row in data:\n            inventory.add(Product(row[\"sku\"], row[\"name\"], Decimal(row[\"price\"])), int(row[\"stock\"]))\n        return inventory\n    except FileNotFoundError:\n        return Inventory()\n    except (json.JSONDecodeError, KeyError, TypeError, ValueError, ArithmeticError) as e:\n        raise StorageError(f\"ไฟล์ {path} เสีย\") from e\n\n\nPATH = \"inventory.json\"\ntry:\n    inv = load_inventory(PATH)\nexcept StorageError as e:\n    print(e)\n    inv = Inventory()\nprint(\"โหลด\", len(inv.skus()), \"รายการ\")\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    if cmd == \"add\":\n        inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n    elif cmd == \"save\":\n        save_inventory(inv, PATH)\n        print(\"บันทึกแล้ว\")\n    elif cmd == \"reload\":\n        inv = load_inventory(PATH)\n        print(\"โหลดใหม่\", len(inv.skus()), \"รายการ\")\n    elif cmd == \"show\":\n        for s in inv.skus():\n            p = inv.product(s)\n            print(f\"{s} {p.name} {p.price} x{inv.stock(s)}\")\n", wrong: ["import json\nfrom pathlib import Path\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\nclass StorageError(ShopError):\n    pass\n\n\ndef save_inventory(inventory, path):\n    data = [{\"sku\": s, \"name\": inventory.product(s).name, \"price\": float(inventory.product(s).price), \"stock\": inventory.stock(s)} for s in inventory.skus()]\n    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\n\ndef load_inventory(path):\n    try:\n        data = json.loads(Path(path).read_text(encoding=\"utf-8\"))\n        inventory = Inventory()\n        for row in data:\n            inventory.add(Product(row[\"sku\"], row[\"name\"], Decimal(row[\"price\"])), int(row[\"stock\"]))\n        return inventory\n    except FileNotFoundError:\n        return Inventory()\n    except (json.JSONDecodeError, KeyError, TypeError, ValueError, ArithmeticError) as e:\n        raise StorageError(f\"ไฟล์ {path} เสีย\") from e\n\n\nPATH = \"inventory.json\"\ntry:\n    inv = load_inventory(PATH)\nexcept StorageError as e:\n    print(e)\n    inv = Inventory()\nprint(\"โหลด\", len(inv.skus()), \"รายการ\")\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    if cmd == \"add\":\n        inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n    elif cmd == \"save\":\n        save_inventory(inv, PATH)\n        print(\"บันทึกแล้ว\")\n    elif cmd == \"reload\":\n        inv = load_inventory(PATH)\n        print(\"โหลดใหม่\", len(inv.skus()), \"รายการ\")\n    elif cmd == \"show\":\n        for s in inv.skus():\n            p = inv.product(s)\n            print(f\"{s} {p.name} {p.price} x{inv.stock(s)}\")\n", "import json\nfrom pathlib import Path\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\nclass StorageError(ShopError):\n    pass\n\n\ndef save_inventory(inventory, path):\n    data = [{\"sku\": s, \"name\": inventory.product(s).name, \"price\": str(inventory.product(s).price), \"stock\": inventory.stock(s)} for s in inventory.skus()]\n    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\n\ndef load_inventory(path):\n    try:\n        data = json.loads(Path(path).read_text(encoding=\"utf-8\"))\n        inventory = Inventory()\n        for row in data:\n            inventory.add(Product(row[\"sku\"], row[\"name\"], Decimal(row[\"price\"])), int(row[\"stock\"]))\n        return inventory\n    except FileNotFoundError:\n        return Inventory()\n    except json.JSONDecodeError as e:\n        raise StorageError(f\"ไฟล์ {path} เสีย\") from e\n\n\nPATH = \"inventory.json\"\ntry:\n    inv = load_inventory(PATH)\nexcept StorageError as e:\n    print(e)\n    inv = Inventory()\nprint(\"โหลด\", len(inv.skus()), \"รายการ\")\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    if cmd == \"add\":\n        inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n    elif cmd == \"save\":\n        save_inventory(inv, PATH)\n        print(\"บันทึกแล้ว\")\n    elif cmd == \"reload\":\n        inv = load_inventory(PATH)\n        print(\"โหลดใหม่\", len(inv.skus()), \"รายการ\")\n    elif cmd == \"show\":\n        for s in inv.skus():\n            p = inv.product(s)\n            print(f\"{s} {p.name} {p.price} x{inv.stock(s)}\")\n"] },
  "py2-capstone/6": { sol: "import io\nimport unittest\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order_ok(inventory, items):\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = [sku for sku, qty in needed.items() if qty > inventory.stock(sku)]\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\ndef place_order_m1(inventory, items):\n    for sku, qty in items:\n        inventory.remove(sku, qty)\n\n\ndef place_order_m2(inventory, items):\n    for sku, qty in items:\n        if qty > inventory.stock(sku):\n            raise OutOfStockError(\"สินค้าไม่พอ: \" + sku)\n    for sku, qty in items:\n        inventory.remove(sku, qty)\n\n\ndef place_order_m3(inventory, items):\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = [sku for sku, qty in needed.items() if qty > inventory.stock(sku)]\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku in needed:\n        inventory.remove(sku, 1)\n\n\nVARIANTS = {\"ok\": place_order_ok, \"m1\": place_order_m1, \"m2\": place_order_m2, \"m3\": place_order_m3}\n\nmode = input()\nplace_order = VARIANTS[mode]\n\n\ndef make_inventory():\n    inv = Inventory()\n    inv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 5)\n    inv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 2)\n    return inv\n\n\nclass TestPlaceOrder(unittest.TestCase):\n    def setUp(self):\n        self.inv = make_inventory()\n\n    def test_success_deducts_each_item(self):\n        place_order(self.inv, [(\"BK-001\", 2), (\"PN-002\", 1)])\n        self.assertEqual(self.inv.stock(\"BK-001\"), 3)\n        self.assertEqual(self.inv.stock(\"PN-002\"), 1)\n\n    def test_failure_changes_nothing(self):\n        with self.assertRaises(OutOfStockError):\n            place_order(self.inv, [(\"BK-001\", 1), (\"PN-002\", 5)])\n        self.assertEqual(self.inv.stock(\"BK-001\"), 5)\n\n    def test_repeated_sku_is_combined(self):\n        with self.assertRaises(OutOfStockError):\n            place_order(self.inv, [(\"PN-002\", 2), (\"PN-002\", 1)])\n        self.assertEqual(self.inv.stock(\"PN-002\"), 2)\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestPlaceOrder)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n", wrong: ["import io\nimport unittest\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order_ok(inventory, items):\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = [sku for sku, qty in needed.items() if qty > inventory.stock(sku)]\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\ndef place_order_m1(inventory, items):\n    for sku, qty in items:\n        inventory.remove(sku, qty)\n\n\ndef place_order_m2(inventory, items):\n    for sku, qty in items:\n        if qty > inventory.stock(sku):\n            raise OutOfStockError(\"สินค้าไม่พอ: \" + sku)\n    for sku, qty in items:\n        inventory.remove(sku, qty)\n\n\ndef place_order_m3(inventory, items):\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = [sku for sku, qty in needed.items() if qty > inventory.stock(sku)]\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku in needed:\n        inventory.remove(sku, 1)\n\n\nVARIANTS = {\"ok\": place_order_ok, \"m1\": place_order_m1, \"m2\": place_order_m2, \"m3\": place_order_m3}\n\nmode = input()\nplace_order = VARIANTS[mode]\n\n\ndef make_inventory():\n    inv = Inventory()\n    inv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 5)\n    inv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 2)\n    return inv\n\n\nclass TestPlaceOrder(unittest.TestCase):\n    def setUp(self):\n        self.inv = make_inventory()\n\n    def test_success(self):\n        place_order(self.inv, [(\"BK-001\", 1)])\n        self.assertEqual(self.inv.stock(\"BK-001\"), 4)\n\n    def test_failure_raises(self):\n        with self.assertRaises(OutOfStockError):\n            place_order(self.inv, [(\"PN-002\", 5)])\n\n    def test_unknown(self):\n        with self.assertRaises(NotFoundError):\n            place_order(self.inv, [(\"ZZ-999\", 1)])\n\n\nsuite = unittest.defaultTestLoader.loadTestsFromTestCase(TestPlaceOrder)\nresult = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(suite)\nprint(\"ผ่าน\" if result.wasSuccessful() and result.testsRun > 0 else \"ล้มเหลว\")\n"] },

  // ── Final Capstone C8–C14 (สร้างด้วย json.dumps) ──
  "py2-capstone/7": { sol: "import csv\nfrom collections import Counter\nfrom decimal import Decimal, InvalidOperation, ROUND_HALF_UP\n\nCENT = Decimal(\"0.01\")\n\n\ndef load_sales(path):\n    orders = set()\n    revenue = Counter()\n    lines = 0\n    skipped = 0\n    with open(path, encoding=\"utf-8\", newline=\"\") as f:\n        for row in csv.DictReader(f):\n            try:\n                qty = int(row[\"qty\"])\n                price = Decimal(row[\"price\"])\n                if qty <= 0 or price <= 0:\n                    raise ValueError\n            except (ValueError, InvalidOperation):\n                skipped += 1\n                continue\n            orders.add(row[\"order_id\"])\n            revenue[row[\"sku\"]] += price * qty\n            lines += 1\n    return orders, revenue, lines, skipped\n\n\ntry:\n    orders, revenue, lines, skipped = load_sales(\"sales.csv\")\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ sales.csv\")\nelse:\n    if not orders:\n        print(\"ไม่มีข้อมูลการขาย\")\n    else:\n        total = sum(revenue.values(), Decimal(\"0\"))\n        average = (total / len(orders)).quantize(CENT, rounding=ROUND_HALF_UP)\n        print(f\"คำสั่งซื้อ: {len(orders)} · รายการ: {lines}\")\n        print(f\"รายได้รวม: {total:,.2f} บาท\")\n        print(f\"ค่าเฉลี่ยต่อคำสั่งซื้อ: {average:,.2f} บาท\")\n        print(\"สินค้าขายดี (ตามรายได้):\")\n        for rank, (sku, amount) in enumerate(sorted(revenue.items(), key=lambda kv: (-kv[1], kv[0]))[:3], 1):\n            print(f\"{rank}. {sku} {amount:,.2f} บาท\")\n    if skipped:\n        print(f\"ข้ามแถวผิด {skipped}\")\n", wrong: ["import csv\nfrom collections import Counter\nfrom decimal import Decimal, InvalidOperation, ROUND_HALF_UP\n\nCENT = Decimal(\"0.01\")\n\n\ndef load_sales(path):\n    orders = set()\n    revenue = Counter()\n    lines = 0\n    skipped = 0\n    with open(path, encoding=\"utf-8\", newline=\"\") as f:\n        for row in csv.DictReader(f):\n            try:\n                qty = int(row[\"qty\"])\n                price = Decimal(row[\"price\"])\n                if qty <= 0 or price <= 0:\n                    raise ValueError\n            except (ValueError, InvalidOperation):\n                skipped += 1\n                continue\n            orders.add(row[\"order_id\"])\n            revenue[row[\"sku\"]] += price * qty\n            lines += 1\n    return orders, revenue, lines, skipped\n\n\ntry:\n    orders, revenue, lines, skipped = load_sales(\"sales.csv\")\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ sales.csv\")\nelse:\n    if not orders:\n        print(\"ไม่มีข้อมูลการขาย\")\n    else:\n        total = sum(revenue.values(), Decimal(\"0\"))\n        average = (total / lines).quantize(CENT, rounding=ROUND_HALF_UP)\n        print(f\"คำสั่งซื้อ: {len(orders)} · รายการ: {lines}\")\n        print(f\"รายได้รวม: {total:,.2f} บาท\")\n        print(f\"ค่าเฉลี่ยต่อคำสั่งซื้อ: {average:,.2f} บาท\")\n        print(\"สินค้าขายดี (ตามรายได้):\")\n        for rank, (sku, amount) in enumerate(sorted(revenue.items(), key=lambda kv: (-kv[1], kv[0]))[:3], 1):\n            print(f\"{rank}. {sku} {amount:,.2f} บาท\")\n    if skipped:\n        print(f\"ข้ามแถวผิด {skipped}\")\n", "import csv\nfrom collections import Counter\nfrom decimal import Decimal, InvalidOperation, ROUND_HALF_UP\n\nCENT = Decimal(\"0.01\")\n\n\ndef load_sales(path):\n    orders = set()\n    revenue = Counter()\n    lines = 0\n    skipped = 0\n    with open(path, encoding=\"utf-8\", newline=\"\") as f:\n        for row in csv.DictReader(f):\n            try:\n                qty = int(row[\"qty\"])\n                price = Decimal(row[\"price\"])\n                if qty <= 0 or price <= 0:\n                    raise ValueError\n            except (ValueError, InvalidOperation):\n                skipped += 1\n                continue\n            orders.add(row[\"order_id\"])\n            revenue[row[\"sku\"]] += price * qty\n            lines += 1\n    return orders, revenue, lines, skipped\n\n\ntry:\n    orders, revenue, lines, skipped = load_sales(\"sales.csv\")\nexcept FileNotFoundError:\n    print(\"ไม่พบไฟล์ sales.csv\")\nelse:\n    if not orders:\n        print(\"ไม่มีข้อมูลการขาย\")\n    else:\n        total = sum(revenue.values(), Decimal(\"0\"))\n        average = (total / len(orders)).quantize(CENT, rounding=ROUND_HALF_UP)\n        print(f\"คำสั่งซื้อ: {len(orders)} · รายการ: {lines}\")\n        print(f\"รายได้รวม: {total:,.2f} บาท\")\n        print(f\"ค่าเฉลี่ยต่อคำสั่งซื้อ: {average:,.2f} บาท\")\n        print(\"สินค้าขายดี (ตามรายได้):\")\n        for rank, (sku, amount) in enumerate(revenue.most_common(3), 1):\n            print(f\"{rank}. {sku} {amount:,.2f} บาท\")\n    if skipped:\n        print(f\"ข้ามแถวผิด {skipped}\")\n"] },
  "py2-capstone/8": { sol: "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\nCOMMANDS = {}\n\n\ndef command(name):\n    def register(func):\n        COMMANDS[name] = func\n        return func\n    return register\n\n\n@command(\"add\")\ndef add_product(inv, args):\n    sku, name, price, qty = args\n    inv.add(Product(sku, name, Decimal(price)), int(qty))\n    return f\"เพิ่ม {sku} คงเหลือ {inv.stock(sku)}\"\n\n\n@command(\"stock\")\ndef show_stock(inv, args):\n    return f\"{args[0]}: {inv.stock(args[0])}\"\n\n\n@command(\"order\")\ndef order(inv, args):\n    items = []\n    for part in args:\n        sku, qty = part.split(\":\")\n        items.append((sku, int(qty)))\n    place_order(inv, items)\n    return \"สั่งซื้อสำเร็จ\"\n\n\n@command(\"help\")\ndef show_help(inv, args):\n    return \"คำสั่ง: \" + \", \".join(sorted(COMMANDS))\n\n\ndef dispatch(inv, line):\n    name, *args = line.split()\n    handler = COMMANDS.get(name)\n    if handler is None:\n        return f\"ไม่รู้จักคำสั่ง {name} · พิมพ์ help\"\n    try:\n        return handler(inv, args)\n    except ShopError as e:\n        return f\"{type(e).__name__}: {e}\"\n\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    print(dispatch(inv, line))\n", wrong: ["from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\nCOMMANDS = {}\n\n\ndef command(name):\n    def register(func):\n        COMMANDS[name] = func\n        return func\n    return register\n\n\n@command(\"add\")\ndef add_product(inv, args):\n    sku, name, price, qty = args\n    inv.add(Product(sku, name, Decimal(price)), int(qty))\n    return f\"เพิ่ม {sku} คงเหลือ {inv.stock(sku)}\"\n\n\n@command(\"stock\")\ndef show_stock(inv, args):\n    return f\"{args[0]}: {inv.stock(args[0])}\"\n\n\n@command(\"order\")\ndef order(inv, args):\n    items = []\n    for part in args:\n        sku, qty = part.split(\":\")\n        items.append((sku, int(qty)))\n    place_order(inv, items)\n    return \"สั่งซื้อสำเร็จ\"\n\n\n@command(\"help\")\ndef show_help(inv, args):\n    return \"คำสั่ง: add, order, stock\"\n\n\ndef dispatch(inv, line):\n    name, *args = line.split()\n    handler = COMMANDS.get(name)\n    if handler is None:\n        return f\"ไม่รู้จักคำสั่ง {name} · พิมพ์ help\"\n    try:\n        return handler(inv, args)\n    except ShopError as e:\n        return f\"{type(e).__name__}: {e}\"\n\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    print(dispatch(inv, line))\n", "from dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\nCOMMANDS = {}\n\n\ndef command(name):\n    def register(func):\n        COMMANDS[name] = func\n        return func\n    return register\n\n\n@command(\"add\")\ndef add_product(inv, args):\n    sku, name, price, qty = args\n    inv.add(Product(sku, name, Decimal(price)), int(qty))\n    return f\"เพิ่ม {sku} คงเหลือ {inv.stock(sku)}\"\n\n\n@command(\"stock\")\ndef show_stock(inv, args):\n    return f\"{args[0]}: {inv.stock(args[0])}\"\n\n\n@command(\"order\")\ndef order(inv, args):\n    items = []\n    for part in args:\n        sku, qty = part.split(\":\")\n        items.append((sku, int(qty)))\n    place_order(inv, items)\n    return \"สั่งซื้อสำเร็จ\"\n\n\n@command(\"help\")\ndef show_help(inv, args):\n    return \"คำสั่ง: \" + \", \".join(sorted(COMMANDS))\n\n\ndef dispatch(inv, line):\n    name, *args = line.split()\n    handler = COMMANDS.get(name, COMMANDS[\"help\"])\n    try:\n        return handler(inv, args)\n    except ShopError as e:\n        return f\"{type(e).__name__}: {e}\"\n\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    print(dispatch(inv, line))\n"] },
  "py2-capstone/9": { sol: "import logging\nimport sys\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO, format=\"%(levelname)s:%(message)s\", force=True)\nlogger = logging.getLogger(\"shopflow\")\n\n\ndef execute(inv, line):\n    \"\"\"ทำหนึ่งคำสั่ง · รูปแบบผิดหรือข้อมูลผิดเกิด ValueError · ข้อผิดพลาดของระบบเกิด ShopError\"\"\"\n    cmd, *args = line.split()\n    if cmd == \"add\":\n        if len(args) != 4:\n            raise ValueError(\"add ต้องมี SKU ชื่อ ราคา จำนวน\")\n        inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n    elif cmd == \"order\":\n        items = []\n        for part in args:\n            if part.count(\":\") != 1:\n                raise ValueError(\"รูปแบบต้องเป็น SKU:จำนวน\")\n            sku, qty = part.split(\":\")\n            items.append((sku, int(qty)))\n        place_order(inv, items)\n    else:\n        raise ValueError(f\"ไม่รู้จักคำสั่ง {cmd}\")\n\n\ndef run(lines):\n    inv = Inventory()\n    ok = bad = 0\n    for line in lines:\n        try:\n            execute(inv, line)\n        except ShopError as e:\n            logger.warning(f\"{type(e).__name__}: {e}\")\n            bad += 1\n        except ValueError as e:\n            logger.error(f\"ข้อมูลผิด: {line!r} — {e}\")\n            bad += 1\n        else:\n            logger.info(f\"สำเร็จ: {line}\")\n            ok += 1\n    print(f\"สำเร็จ {ok} · ผิดพลาด {bad}\")\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nrun(lines)\n", wrong: ["import logging\nimport sys\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO, format=\"%(levelname)s:%(message)s\", force=True)\nlogger = logging.getLogger(\"shopflow\")\n\n\ndef execute(inv, line):\n    \"\"\"ทำหนึ่งคำสั่ง · รูปแบบผิดหรือข้อมูลผิดเกิด ValueError · ข้อผิดพลาดของระบบเกิด ShopError\"\"\"\n    cmd, *args = line.split()\n    if cmd == \"add\":\n        if len(args) != 4:\n            raise ValueError(\"add ต้องมี SKU ชื่อ ราคา จำนวน\")\n        inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n    elif cmd == \"order\":\n        items = []\n        for part in args:\n            if part.count(\":\") != 1:\n                raise ValueError(\"รูปแบบต้องเป็น SKU:จำนวน\")\n            sku, qty = part.split(\":\")\n            items.append((sku, int(qty)))\n        place_order(inv, items)\n    else:\n        raise ValueError(f\"ไม่รู้จักคำสั่ง {cmd}\")\n\n\ndef run(lines):\n    inv = Inventory()\n    ok = bad = 0\n    for line in lines:\n        try:\n            execute(inv, line)\n        except Exception as e:\n            logger.error(f\"ข้อมูลผิด: {line!r} — {e}\")\n            bad += 1\n        else:\n            logger.info(f\"สำเร็จ: {line}\")\n            ok += 1\n    print(f\"สำเร็จ {ok} · ผิดพลาด {bad}\")\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nrun(lines)\n", "import logging\nimport sys\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n\n\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO, format=\"%(levelname)s:%(message)s\", force=True)\nlogger = logging.getLogger(\"shopflow\")\n\n\ndef execute(inv, line):\n    \"\"\"ทำหนึ่งคำสั่ง · รูปแบบผิดหรือข้อมูลผิดเกิด ValueError · ข้อผิดพลาดของระบบเกิด ShopError\"\"\"\n    cmd, *args = line.split()\n    if cmd == \"add\":\n        if len(args) != 4:\n            raise ValueError(\"add ต้องมี SKU ชื่อ ราคา จำนวน\")\n        inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n    elif cmd == \"order\":\n        items = []\n        for part in args:\n            if part.count(\":\") != 1:\n                raise ValueError(\"รูปแบบต้องเป็น SKU:จำนวน\")\n            sku, qty = part.split(\":\")\n            items.append((sku, int(qty)))\n        place_order(inv, items)\n    else:\n        raise ValueError(f\"ไม่รู้จักคำสั่ง {cmd}\")\n\n\ndef run(lines):\n    inv = Inventory()\n    ok = bad = 0\n    for line in lines:\n        try:\n            execute(inv, line)\n        except ShopError as e:\n            logger.warning(f\"{type(e).__name__}: {e}\")\n            bad += 1\n        except ValueError as e:\n            logger.error(f\"ข้อมูลผิด: {line} — {e}\")\n            bad += 1\n        else:\n            logger.info(f\"สำเร็จ: {line}\")\n            ok += 1\n    print(f\"สำเร็จ {ok} · ผิดพลาด {bad}\")\n\n\nlines = []\nwhile (line := input()) != \"end\":\n    lines.append(line)\nrun(lines)\n"] },
  "py2-capstone/10": { sol: "import bisect\nimport heapq\n\nn = int(input())\nstocks = [int(t) for t in input().split()]\nq = int(input())\nthresholds = [int(t) for t in input().split()]\nordered = sorted(stocks)\nprint(\"ต่ำสุด 3 ค่า:\", \" \".join(str(s) for s in heapq.nsmallest(3, stocks)))\nprint(\"ผลรวมจำนวนที่ต่ำกว่าเกณฑ์:\", sum(bisect.bisect_left(ordered, t) for t in thresholds))\n", wrong: ["import bisect\nimport heapq\n\nn = int(input())\nstocks = [int(t) for t in input().split()]\nq = int(input())\nthresholds = [int(t) for t in input().split()]\nordered = sorted(stocks)\nprint(\"ต่ำสุด 3 ค่า:\", \" \".join(str(s) for s in heapq.nsmallest(3, stocks)))\nprint(\"ผลรวมจำนวนที่ต่ำกว่าเกณฑ์:\", sum(bisect.bisect_right(ordered, t) for t in thresholds))\n"] },
  "py2-capstone/11": { sol: "import asyncio\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\nasync def deliver(sku, delay, qty, kind):\n    await asyncio.sleep(delay / 100)\n    if kind == \"fail\":\n        raise ConnectionError(f\"{sku} ส่งไม่ได้\")\n    return qty\n\n\nasync def restock(inv, orders):\n    async def attempt(sku, delay, qty, kind):\n        try:\n            return \"ok\", sku, await asyncio.wait_for(deliver(sku, delay, qty, kind), timeout=0.2)\n        except TimeoutError:\n            return \"timeout\", sku, None\n        except ConnectionError as e:\n            return \"fail\", sku, str(e)\n\n    for done in asyncio.as_completed([attempt(*o) for o in orders]):\n        status, sku, info = await done\n        if status == \"ok\":\n            inv.add(inv.product(sku), info)\n            print(f\"รับ {sku} +{info} (คงเหลือ {inv.stock(sku)})\")\n        elif status == \"fail\":\n            print(f\"{sku} ล้มเหลว: {info}\")\n        else:\n            print(f\"{sku} หมดเวลา\")\n\n\ninv = Inventory()\ninv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 0)\ninv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 1)\ninv.add(Product(\"RL-003\", \"ไม้บรรทัด\", Decimal(\"15\")), 2)\norders = []\nwhile (line := input()) != \"end\":\n    sku, delay, qty, kind = line.split()\n    orders.append((sku, int(delay), int(qty), kind))\nasyncio.run(restock(inv, orders))\nprint(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()))\n", wrong: ["import asyncio\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n\n\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n\n\nasync def deliver(sku, delay, qty, kind):\n    await asyncio.sleep(delay / 100)\n    if kind == \"fail\":\n        raise ConnectionError(f\"{sku} ส่งไม่ได้\")\n    return qty\n\n\nasync def restock(inv, orders):\n    async def attempt(sku, delay, qty, kind):\n        try:\n            return \"ok\", sku, await asyncio.wait_for(deliver(sku, delay, qty, kind), timeout=0.2)\n        except TimeoutError:\n            return \"timeout\", sku, None\n        except ConnectionError as e:\n            return \"fail\", sku, str(e)\n\n    for status, sku, info in await asyncio.gather(*(attempt(*o) for o in orders)):\n        if status == \"ok\":\n            inv.add(inv.product(sku), info)\n            print(f\"รับ {sku} +{info} (คงเหลือ {inv.stock(sku)})\")\n        elif status == \"fail\":\n            print(f\"{sku} ล้มเหลว: {info}\")\n        else:\n            print(f\"{sku} หมดเวลา\")\n\n\ninv = Inventory()\ninv.add(Product(\"BK-001\", \"สมุด\", Decimal(\"25\")), 0)\ninv.add(Product(\"PN-002\", \"ปากกา\", Decimal(\"12\")), 1)\ninv.add(Product(\"RL-003\", \"ไม้บรรทัด\", Decimal(\"15\")), 2)\norders = []\nwhile (line := input()) != \"end\":\n    sku, delay, qty, kind = line.split()\n    orders.append((sku, int(delay), int(qty), kind))\nasyncio.run(restock(inv, orders))\nprint(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()))\n"] },
  "py2-capstone/12": { sol: "from decimal import Decimal\n\nfrom shopflow import Inventory, Product, ShopError, place_order\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    try:\n        if cmd == \"add\":\n            inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n        elif cmd == \"order\":\n            place_order(inv, [(s, int(q)) for s, q in (p.split(\":\") for p in args)])\n            print(\"สั่งซื้อสำเร็จ\")\n        elif cmd == \"list\":\n            print(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()) or \"(ว่าง)\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n# === shopflow/__init__.py ===\nfrom .errors import NotFoundError, OutOfStockError, ShopError\nfrom .inventory import Inventory\nfrom .models import Product\nfrom .orders import place_order\n# === shopflow/models.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n# === shopflow/errors.py ===\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n# === shopflow/inventory.py ===\nfrom .errors import NotFoundError, OutOfStockError\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n# === shopflow/orders.py ===\nfrom .errors import OutOfStockError\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n", wrong: ["from decimal import Decimal\n\nfrom shopflow import Inventory, Product, ShopError, place_order\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    try:\n        if cmd == \"add\":\n            inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n        elif cmd == \"order\":\n            place_order(inv, [(s, int(q)) for s, q in (p.split(\":\") for p in args)])\n            print(\"สั่งซื้อสำเร็จ\")\n        elif cmd == \"list\":\n            print(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()) or \"(ว่าง)\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n# === shopflow/__init__.py ===\nfrom .errors import NotFoundError, OutOfStockError, ShopError\nfrom .inventory import Inventory\nfrom .models import Product\nfrom .orders import place_order\n# === shopflow/models.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n# === shopflow/errors.py ===\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n# === shopflow/inventory.py ===\nfrom errors import NotFoundError, OutOfStockError\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n# === shopflow/orders.py ===\nfrom .errors import OutOfStockError\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n", "from decimal import Decimal\n\nfrom shopflow import Inventory, Product, ShopError, place_order\n\ninv = Inventory()\nwhile (line := input()) != \"end\":\n    cmd, *args = line.split()\n    try:\n        if cmd == \"add\":\n            inv.add(Product(args[0], args[1], Decimal(args[2])), int(args[3]))\n        elif cmd == \"order\":\n            place_order(inv, [(s, int(q)) for s, q in (p.split(\":\") for p in args)])\n            print(\"สั่งซื้อสำเร็จ\")\n        elif cmd == \"list\":\n            print(\" \".join(f\"{s}={inv.stock(s)}\" for s in inv.skus()) or \"(ว่าง)\")\n    except ShopError as e:\n        print(f\"{type(e).__name__}: {e}\")\n# === shopflow/__init__.py ===\nfrom .errors import NotFoundError, OutOfStockError, ShopError\nfrom .inventory import Inventory\nfrom .models import Product\n# === shopflow/models.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n# === shopflow/errors.py ===\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n# === shopflow/inventory.py ===\nfrom .errors import NotFoundError, OutOfStockError\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n# === shopflow/orders.py ===\nfrom .errors import OutOfStockError\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n"] },
  "py2-capstone/13": { sol: "from decimal import Decimal, ROUND_HALF_UP\n\nfrom shopflow import (BuyXGetY, Inventory, Order, OrderLine, PercentOff, ShopError,\n                      StorageError, best_discount, load_inventory, place_order, save_inventory)\n\nPATH = \"inventory.json\"\nRULES = [PercentOff(10, Decimal(\"500\")), BuyXGetY(\"PN-002\", 2, 1)]\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\ndef parse_items(args):\n    items = []\n    for part in args:\n        if part.count(\":\") != 1:\n            raise ValueError(\"รูปแบบต้องเป็น SKU:จำนวน\")\n        sku, qty = part.split(\":\")\n        items.append((sku, int(qty)))\n    if not items:\n        raise ValueError(\"ไม่มีรายการ\")\n    return items\n\n\ndef checkout(inv, items, number):\n    place_order(inv, items)\n    order = Order([OrderLine(inv.product(sku), qty) for sku, qty in items])\n    best = best_discount(order, RULES)\n    discount = best[1] if best else Decimal(\"0\")\n    net = order.subtotal - discount\n    vat = (net * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n    print(f\"คำสั่งซื้อ #{number}\")\n    for line in order.lines:\n        print(f\"  {line.product.name} x{line.qty} = {line.subtotal:,.2f}\")\n    print(f\"  ส่วนลด: {type(best[0]).__name__} -{discount:,.2f}\" if best else \"  ส่วนลด: -\")\n    print(f\"  สุทธิ {net:,.2f} · VAT {vat:,.2f} · รวม {net + vat:,.2f}\")\n    return net + vat\n\n\ndef main():\n    try:\n        inv = load_inventory(PATH)\n    except StorageError as e:\n        print(e)\n        inv = Inventory()\n    print(f\"โหลดสินค้า {len(inv.skus())} รายการ\")\n    orders = 0\n    revenue = Decimal(\"0\")\n    while (line := input()) != \"end\":\n        cmd, *args = line.split()\n        if cmd == \"stock\":\n            for sku in inv.skus():\n                print(f\"{sku} {inv.product(sku).name} x{inv.stock(sku)}\")\n            if not inv.skus():\n                print(\"(ว่าง)\")\n        elif cmd == \"order\":\n            try:\n                items = parse_items(args)\n                total = checkout(inv, items, orders + 1)\n            except ShopError as e:\n                print(f\"ไม่สำเร็จ: {e}\")\n            except ValueError:\n                print(\"รูปแบบคำสั่งผิด\")\n            else:\n                orders += 1\n                revenue += total\n        elif cmd == \"save\":\n            save_inventory(inv, PATH)\n            print(\"บันทึกแล้ว\")\n    print(f\"สรุป: คำสั่งซื้อ {orders} รายการ · รายได้ {revenue:,.2f} บาท\")\n\n\nmain()\n# === shopflow/__init__.py ===\nfrom .discounts import BuyXGetY, PercentOff, best_discount\nfrom .errors import NotFoundError, OutOfStockError, ShopError\nfrom .inventory import Inventory\nfrom .models import Product\nfrom .orders import Order, OrderLine, place_order\nfrom .storage import StorageError, load_inventory, save_inventory\n# === shopflow/models.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n# === shopflow/errors.py ===\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n# === shopflow/inventory.py ===\nfrom .errors import NotFoundError, OutOfStockError\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n# === shopflow/orders.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\n\nfrom .errors import OutOfStockError\nfrom .models import Product\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n# === shopflow/discounts.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nfrom typing import Protocol\n\nfrom .orders import CENT, Order\n\n\nclass DiscountRule(Protocol):\n    def discount(self, order: Order) -> Decimal: ...\n\n\n@dataclass(frozen=True)\nclass PercentOff:\n    percent: int\n    min_subtotal: Decimal\n\n    def discount(self, order):\n        if order.subtotal < self.min_subtotal:\n            return Decimal(\"0\")\n        return (order.subtotal * self.percent / 100).quantize(CENT, rounding=ROUND_HALF_UP)\n\n\n@dataclass(frozen=True)\nclass BuyXGetY:\n    sku: str\n    buy: int\n    free: int\n\n    def discount(self, order):\n        qty = sum(l.qty for l in order.lines if l.product.sku == self.sku)\n        price = next((l.product.price for l in order.lines if l.product.sku == self.sku), Decimal(\"0\"))\n        groups = qty // (self.buy + self.free)\n        return price * self.free * groups\n\n\ndef best_discount(order, rules):\n    best = None\n    for rule in rules:\n        amount = rule.discount(order)\n        if amount > 0 and (best is None or amount > best[1]):\n            best = (rule, amount)\n    return best\n# === shopflow/storage.py ===\nimport json\nfrom decimal import Decimal\nfrom pathlib import Path\n\nfrom .errors import ShopError\nfrom .inventory import Inventory\nfrom .models import Product\n\n\nclass StorageError(ShopError):\n    pass\n\n\ndef save_inventory(inventory, path):\n    data = [{\"sku\": s, \"name\": inventory.product(s).name, \"price\": str(inventory.product(s).price), \"stock\": inventory.stock(s)} for s in inventory.skus()]\n    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\n\ndef load_inventory(path):\n    try:\n        data = json.loads(Path(path).read_text(encoding=\"utf-8\"))\n        inventory = Inventory()\n        for row in data:\n            inventory.add(Product(row[\"sku\"], row[\"name\"], Decimal(row[\"price\"])), int(row[\"stock\"]))\n        return inventory\n    except FileNotFoundError:\n        return Inventory()\n    except (json.JSONDecodeError, KeyError, TypeError, ValueError, ArithmeticError) as e:\n        raise StorageError(f\"ไฟล์ {path} เสีย\") from e\n", wrong: ["from decimal import Decimal, ROUND_HALF_UP\n\nfrom shopflow import (BuyXGetY, Inventory, Order, OrderLine, PercentOff, ShopError,\n                      StorageError, best_discount, load_inventory, place_order, save_inventory)\n\nPATH = \"inventory.json\"\nRULES = [PercentOff(10, Decimal(\"500\")), BuyXGetY(\"PN-002\", 2, 1)]\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\ndef parse_items(args):\n    items = []\n    for part in args:\n        if part.count(\":\") != 1:\n            raise ValueError(\"รูปแบบต้องเป็น SKU:จำนวน\")\n        sku, qty = part.split(\":\")\n        items.append((sku, int(qty)))\n    if not items:\n        raise ValueError(\"ไม่มีรายการ\")\n    return items\n\n\ndef checkout(inv, items, number):\n    place_order(inv, items)\n    order = Order([OrderLine(inv.product(sku), qty) for sku, qty in items])\n    best = best_discount(order, RULES)\n    discount = best[1] if best else Decimal(\"0\")\n    net = order.subtotal - discount\n    vat = order.vat\n    print(f\"คำสั่งซื้อ #{number}\")\n    for line in order.lines:\n        print(f\"  {line.product.name} x{line.qty} = {line.subtotal:,.2f}\")\n    print(f\"  ส่วนลด: {type(best[0]).__name__} -{discount:,.2f}\" if best else \"  ส่วนลด: -\")\n    print(f\"  สุทธิ {net:,.2f} · VAT {vat:,.2f} · รวม {net + vat:,.2f}\")\n    return net + vat\n\n\ndef main():\n    try:\n        inv = load_inventory(PATH)\n    except StorageError as e:\n        print(e)\n        inv = Inventory()\n    print(f\"โหลดสินค้า {len(inv.skus())} รายการ\")\n    orders = 0\n    revenue = Decimal(\"0\")\n    while (line := input()) != \"end\":\n        cmd, *args = line.split()\n        if cmd == \"stock\":\n            for sku in inv.skus():\n                print(f\"{sku} {inv.product(sku).name} x{inv.stock(sku)}\")\n            if not inv.skus():\n                print(\"(ว่าง)\")\n        elif cmd == \"order\":\n            try:\n                items = parse_items(args)\n                total = checkout(inv, items, orders + 1)\n            except ShopError as e:\n                print(f\"ไม่สำเร็จ: {e}\")\n            except ValueError:\n                print(\"รูปแบบคำสั่งผิด\")\n            else:\n                orders += 1\n                revenue += total\n        elif cmd == \"save\":\n            save_inventory(inv, PATH)\n            print(\"บันทึกแล้ว\")\n    print(f\"สรุป: คำสั่งซื้อ {orders} รายการ · รายได้ {revenue:,.2f} บาท\")\n\n\nmain()\n# === shopflow/__init__.py ===\nfrom .discounts import BuyXGetY, PercentOff, best_discount\nfrom .errors import NotFoundError, OutOfStockError, ShopError\nfrom .inventory import Inventory\nfrom .models import Product\nfrom .orders import Order, OrderLine, place_order\nfrom .storage import StorageError, load_inventory, save_inventory\n# === shopflow/models.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n# === shopflow/errors.py ===\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n# === shopflow/inventory.py ===\nfrom .errors import NotFoundError, OutOfStockError\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n# === shopflow/orders.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\n\nfrom .errors import OutOfStockError\nfrom .models import Product\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n# === shopflow/discounts.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nfrom typing import Protocol\n\nfrom .orders import CENT, Order\n\n\nclass DiscountRule(Protocol):\n    def discount(self, order: Order) -> Decimal: ...\n\n\n@dataclass(frozen=True)\nclass PercentOff:\n    percent: int\n    min_subtotal: Decimal\n\n    def discount(self, order):\n        if order.subtotal < self.min_subtotal:\n            return Decimal(\"0\")\n        return (order.subtotal * self.percent / 100).quantize(CENT, rounding=ROUND_HALF_UP)\n\n\n@dataclass(frozen=True)\nclass BuyXGetY:\n    sku: str\n    buy: int\n    free: int\n\n    def discount(self, order):\n        qty = sum(l.qty for l in order.lines if l.product.sku == self.sku)\n        price = next((l.product.price for l in order.lines if l.product.sku == self.sku), Decimal(\"0\"))\n        groups = qty // (self.buy + self.free)\n        return price * self.free * groups\n\n\ndef best_discount(order, rules):\n    best = None\n    for rule in rules:\n        amount = rule.discount(order)\n        if amount > 0 and (best is None or amount > best[1]):\n            best = (rule, amount)\n    return best\n# === shopflow/storage.py ===\nimport json\nfrom decimal import Decimal\nfrom pathlib import Path\n\nfrom .errors import ShopError\nfrom .inventory import Inventory\nfrom .models import Product\n\n\nclass StorageError(ShopError):\n    pass\n\n\ndef save_inventory(inventory, path):\n    data = [{\"sku\": s, \"name\": inventory.product(s).name, \"price\": str(inventory.product(s).price), \"stock\": inventory.stock(s)} for s in inventory.skus()]\n    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\n\ndef load_inventory(path):\n    try:\n        data = json.loads(Path(path).read_text(encoding=\"utf-8\"))\n        inventory = Inventory()\n        for row in data:\n            inventory.add(Product(row[\"sku\"], row[\"name\"], Decimal(row[\"price\"])), int(row[\"stock\"]))\n        return inventory\n    except FileNotFoundError:\n        return Inventory()\n    except (json.JSONDecodeError, KeyError, TypeError, ValueError, ArithmeticError) as e:\n        raise StorageError(f\"ไฟล์ {path} เสีย\") from e\n", "from decimal import Decimal, ROUND_HALF_UP\n\nfrom shopflow import (BuyXGetY, Inventory, Order, OrderLine, PercentOff, ShopError,\n                      StorageError, best_discount, load_inventory, place_order, save_inventory)\n\nPATH = \"inventory.json\"\nRULES = [PercentOff(10, Decimal(\"500\")), BuyXGetY(\"PN-002\", 2, 1)]\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\ndef parse_items(args):\n    items = []\n    for part in args:\n        if part.count(\":\") != 1:\n            raise ValueError(\"รูปแบบต้องเป็น SKU:จำนวน\")\n        sku, qty = part.split(\":\")\n        items.append((sku, int(qty)))\n    if not items:\n        raise ValueError(\"ไม่มีรายการ\")\n    return items\n\n\ndef checkout(inv, items, number):\n    order = Order([OrderLine(inv.product(sku), qty) for sku, qty in items])\n    for sku, qty in items:\n        inv.remove(sku, qty)\n    best = best_discount(order, RULES)\n    discount = best[1] if best else Decimal(\"0\")\n    net = order.subtotal - discount\n    vat = (net * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n    print(f\"คำสั่งซื้อ #{number}\")\n    for line in order.lines:\n        print(f\"  {line.product.name} x{line.qty} = {line.subtotal:,.2f}\")\n    print(f\"  ส่วนลด: {type(best[0]).__name__} -{discount:,.2f}\" if best else \"  ส่วนลด: -\")\n    print(f\"  สุทธิ {net:,.2f} · VAT {vat:,.2f} · รวม {net + vat:,.2f}\")\n    return net + vat\n\n\ndef main():\n    try:\n        inv = load_inventory(PATH)\n    except StorageError as e:\n        print(e)\n        inv = Inventory()\n    print(f\"โหลดสินค้า {len(inv.skus())} รายการ\")\n    orders = 0\n    revenue = Decimal(\"0\")\n    while (line := input()) != \"end\":\n        cmd, *args = line.split()\n        if cmd == \"stock\":\n            for sku in inv.skus():\n                print(f\"{sku} {inv.product(sku).name} x{inv.stock(sku)}\")\n            if not inv.skus():\n                print(\"(ว่าง)\")\n        elif cmd == \"order\":\n            try:\n                items = parse_items(args)\n                total = checkout(inv, items, orders + 1)\n            except ShopError as e:\n                print(f\"ไม่สำเร็จ: {e}\")\n            except ValueError:\n                print(\"รูปแบบคำสั่งผิด\")\n            else:\n                orders += 1\n                revenue += total\n        elif cmd == \"save\":\n            save_inventory(inv, PATH)\n            print(\"บันทึกแล้ว\")\n    print(f\"สรุป: คำสั่งซื้อ {orders} รายการ · รายได้ {revenue:,.2f} บาท\")\n\n\nmain()\n# === shopflow/__init__.py ===\nfrom .discounts import BuyXGetY, PercentOff, best_discount\nfrom .errors import NotFoundError, OutOfStockError, ShopError\nfrom .inventory import Inventory\nfrom .models import Product\nfrom .orders import Order, OrderLine, place_order\nfrom .storage import StorageError, load_inventory, save_inventory\n# === shopflow/models.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal\nimport re\n\nSKU_PATTERN = re.compile(r\"[A-Z]{2}-\\d{3}\")\n\n\n@dataclass(frozen=True)\nclass Product:\n    sku: str\n    name: str\n    price: Decimal\n\n    def __post_init__(self):\n        if not SKU_PATTERN.fullmatch(self.sku):\n            raise ValueError(f\"รหัสสินค้าไม่ถูกต้อง: {self.sku}\")\n        if not self.name.strip():\n            raise ValueError(\"ชื่อสินค้าว่าง\")\n        if self.price <= 0:\n            raise ValueError(\"ราคาต้องมากกว่า 0\")\n# === shopflow/errors.py ===\nclass ShopError(Exception):\n    pass\n\n\nclass NotFoundError(ShopError):\n    pass\n\n\nclass OutOfStockError(ShopError):\n    pass\n# === shopflow/inventory.py ===\nfrom .errors import NotFoundError, OutOfStockError\n\n\nclass Inventory:\n    def __init__(self):\n        self._products = {}\n        self._stock = {}\n\n    def add(self, product, qty):\n        if qty < 0:\n            raise ValueError(\"จำนวนต้องไม่ติดลบ\")\n        self._products[product.sku] = product\n        self._stock[product.sku] = self._stock.get(product.sku, 0) + qty\n\n    def product(self, sku):\n        if sku not in self._products:\n            raise NotFoundError(f\"ไม่พบสินค้า {sku}\")\n        return self._products[sku]\n\n    def stock(self, sku):\n        self.product(sku)\n        return self._stock[sku]\n\n    def remove(self, sku, qty):\n        available = self.stock(sku)\n        if qty > available:\n            raise OutOfStockError(f\"{sku} เหลือ {available}\")\n        self._stock[sku] = available - qty\n\n    def skus(self):\n        return sorted(self._products)\n# === shopflow/orders.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\n\nfrom .errors import OutOfStockError\nfrom .models import Product\n\n\nVAT_RATE = Decimal(\"0.07\")\nCENT = Decimal(\"0.01\")\n\n\n@dataclass(frozen=True)\nclass OrderLine:\n    product: Product\n    qty: int\n\n    def __post_init__(self):\n        if self.qty <= 0:\n            raise ValueError(\"จำนวนต้องมากกว่า 0\")\n\n    @property\n    def subtotal(self):\n        return self.product.price * self.qty\n\n\n@dataclass\nclass Order:\n    lines: list\n\n    @property\n    def subtotal(self):\n        return sum((line.subtotal for line in self.lines), Decimal(\"0\"))\n\n    @property\n    def vat(self):\n        return (self.subtotal * VAT_RATE).quantize(CENT, rounding=ROUND_HALF_UP)\n\n    @property\n    def total(self):\n        return self.subtotal + self.vat\n\n\ndef place_order(inventory, items):\n    \"\"\"ตัดสต็อกทุกรายการ หรือไม่ตัดเลยถ้ามีรายการใดไม่พอ · items คือลิสต์ของ (sku, qty)\"\"\"\n    needed = {}\n    for sku, qty in items:\n        needed[sku] = needed.get(sku, 0) + qty\n    shortages = []\n    for sku, qty in needed.items():\n        available = inventory.stock(sku)\n        if qty > available:\n            shortages.append(f\"{sku} (ต้องการ {qty} เหลือ {available})\")\n    if shortages:\n        raise OutOfStockError(\"สินค้าไม่พอ: \" + \", \".join(sorted(shortages)))\n    for sku, qty in needed.items():\n        inventory.remove(sku, qty)\n# === shopflow/discounts.py ===\nfrom dataclasses import dataclass\nfrom decimal import Decimal, ROUND_HALF_UP\nfrom typing import Protocol\n\nfrom .orders import CENT, Order\n\n\nclass DiscountRule(Protocol):\n    def discount(self, order: Order) -> Decimal: ...\n\n\n@dataclass(frozen=True)\nclass PercentOff:\n    percent: int\n    min_subtotal: Decimal\n\n    def discount(self, order):\n        if order.subtotal < self.min_subtotal:\n            return Decimal(\"0\")\n        return (order.subtotal * self.percent / 100).quantize(CENT, rounding=ROUND_HALF_UP)\n\n\n@dataclass(frozen=True)\nclass BuyXGetY:\n    sku: str\n    buy: int\n    free: int\n\n    def discount(self, order):\n        qty = sum(l.qty for l in order.lines if l.product.sku == self.sku)\n        price = next((l.product.price for l in order.lines if l.product.sku == self.sku), Decimal(\"0\"))\n        groups = qty // (self.buy + self.free)\n        return price * self.free * groups\n\n\ndef best_discount(order, rules):\n    best = None\n    for rule in rules:\n        amount = rule.discount(order)\n        if amount > 0 and (best is None or amount > best[1]):\n            best = (rule, amount)\n    return best\n# === shopflow/storage.py ===\nimport json\nfrom decimal import Decimal\nfrom pathlib import Path\n\nfrom .errors import ShopError\nfrom .inventory import Inventory\nfrom .models import Product\n\n\nclass StorageError(ShopError):\n    pass\n\n\ndef save_inventory(inventory, path):\n    data = [{\"sku\": s, \"name\": inventory.product(s).name, \"price\": str(inventory.product(s).price), \"stock\": inventory.stock(s)} for s in inventory.skus()]\n    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")\n\n\ndef load_inventory(path):\n    try:\n        data = json.loads(Path(path).read_text(encoding=\"utf-8\"))\n        inventory = Inventory()\n        for row in data:\n            inventory.add(Product(row[\"sku\"], row[\"name\"], Decimal(row[\"price\"])), int(row[\"stock\"]))\n        return inventory\n    except FileNotFoundError:\n        return Inventory()\n    except (json.JSONDecodeError, KeyError, TypeError, ValueError, ArithmeticError) as e:\n        raise StorageError(f\"ไฟล์ {path} เสีย\") from e\n"] },

  // ── ด่านเสริมเติมช่องว่างจาก Blueprint (Debug +8) ──
  "py2-tupleset/8": { sol: "nums = []\nfor t in input().split():\n    nums.append(int(t))\nseen = set()\nunique = []\nfor x in nums:\n    if x not in seen:\n        seen.add(x)\n        unique.append(x)\nparts = []\nfor x in unique:\n    parts.append(str(x))\nprint(\" \".join(parts))\n", wrong: ["nums = []\nfor t in input().split():\n    nums.append(int(t))\nunique = sorted(set(nums))\nparts = []\nfor x in unique:\n    parts.append(str(x))\nprint(\" \".join(parts))\n"] },
  "py2-oop2/9": { sol: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __eq__(self, other):\n        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)\n\n    def __hash__(self):\n        return hash((self.x, self.y))\n\n\npoints = set()\nwhile (line := input()) != \"end\":\n    x, y = (int(v) for v in line.split())\n    points.add(Point(x, y))\nprint(f\"จุดไม่ซ้ำ {len(points)} จุด\")\n", wrong: ["class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __eq__(self, other):\n        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)\n\n    def __hash__(self):\n        return id(self)\n\n\npoints = set()\nwhile (line := input()) != \"end\":\n    x, y = (int(v) for v in line.split())\n    points.add(Point(x, y))\nprint(f\"จุดไม่ซ้ำ {len(points)} จุด\")\n"] },
  "py2-functools/7": { sol: "nums = [int(t) for t in input().split()]\ndoubled = [x * 2 for x in nums]\nprint(sum(doubled))\nprint(max(doubled))\n", wrong: ["nums = [int(t) for t in input().split()]\ndoubled = map(lambda x: x * 2, nums)\nprint(sum(doubled))\nprint(max(nums))\n"] },
  "py2-stdlib/9": { sol: "import calendar\nfrom datetime import date\n\n\ndef add_months(date_text, n):\n    d = date.fromisoformat(date_text)\n    total = d.year * 12 + (d.month - 1) + n\n    year, month = divmod(total, 12)\n    month += 1\n    day = min(d.day, calendar.monthrange(year, month)[1])\n    return date(year, month, day).isoformat()\n", wrong: ["from datetime import date, timedelta\n\n\ndef add_months(date_text, n):\n    return (date.fromisoformat(date_text) + timedelta(days=30 * n)).isoformat()\n", "import calendar\nfrom datetime import date\n\n\ndef add_months(date_text, n):\n    d = date.fromisoformat(date_text)\n    month = d.month + n\n    year = d.year + (month - 1) // 12\n    month = (month - 1) % 12 + 1\n    return date(year, month, d.day).isoformat()\n"] },
  "py2-typing/8": { sol: "from typing import Protocol, runtime_checkable\n\n\n@runtime_checkable\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\n\nclass Circle:\n    def draw(self) -> str:\n        return \"○\"\n\n\nclass Text:\n    def __init__(self, value: str) -> None:\n        self.value = value\n\n\nitems = {\"circle\": Circle(), \"text\": Text(\"hi\"), \"number\": 5}\nfor name in input().split():\n    print(name, isinstance(items[name], Drawable))\n", wrong: ["from typing import Protocol\n\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\n\nclass Circle:\n    def draw(self) -> str:\n        return \"○\"\n\n\nclass Text:\n    def __init__(self, value: str) -> None:\n        self.value = value\n\n\nitems = {\"circle\": Circle(), \"text\": Text(\"hi\"), \"number\": 5}\nfor name in input().split():\n    print(name, hasattr(items[name], \"value\"))\n"] },
  "py2-data/5": { sol: "import csv\n\nwith open(\"data.csv\", encoding=\"utf-8\", newline=\"\") as f:\n    total = sum(int(row[\"amount\"]) for row in csv.DictReader(f))\nprint(\"รวม\", total)\n", wrong: ["import csv\n\nwith open(\"data.csv\", encoding=\"utf-8\", newline=\"\") as f:\n    reader = csv.reader(f)\n    next(reader)\n    total = sum(int(row[1]) for row in reader)\nprint(\"รวม\", total)\n"] },
  "py2-craft/6": { sol: "def cart_total(prices):\n    return sum(prices)\n\n\nfor _ in range(2):\n    print(cart_total([int(t) for t in input().split()]))\n", wrong: ["def cart_total(prices):\n    for p in prices:\n        total = 0\n        total += p\n    return total if prices else 0\n\n\nfor _ in range(2):\n    print(cart_total([int(t) for t in input().split()]))\n"] },
  "py2-perf/6": { sol: "from functools import lru_cache\n\n\n@lru_cache(maxsize=None)\ndef count_ways(coins, amount, i=0):\n    if amount == 0:\n        return 1\n    if amount < 0 or i == len(coins):\n        return 0\n    return count_ways(coins, amount - coins[i], i) + count_ways(coins, amount, i + 1)\n\n\ncoins = tuple(int(t) for t in input().split())\namount = int(input())\nprint(count_ways(coins, amount), \"วิธี\")\n", wrong: ["from functools import lru_cache\n\n\n@lru_cache(maxsize=None)\ndef count_ways(coins, amount):\n    if amount == 0:\n        return 1\n    if amount < 0:\n        return 0\n    return sum(count_ways(coins, amount - c) for c in coins)\n\n\ncoins = tuple(int(t) for t in input().split())\namount = int(input())\nprint(count_ways(coins, amount), \"วิธี\")\n"] },

  // ── Career Track: Web Backend W1–W2 (สร้างด้วย json.dumps) ──
  "py2-web-http/0": { sol: "from urllib.parse import parse_qs\n\n\ndef parse_query(qs):\n    parsed = parse_qs(qs, keep_blank_values=True)\n    return {key: values[0] if len(values) == 1 else values for key, values in parsed.items()}\n", wrong: ["from urllib.parse import parse_qs\n\n\ndef parse_query(qs):\n    return {key: values[0] for key, values in parse_qs(qs).items()}\n", "def parse_query(qs):\n    result = {}\n    for pair in qs.split(\"&\"):\n        if \"=\" in pair:\n            key, value = pair.split(\"=\", 1)\n            result[key] = value\n    return result\n"] },
  "py2-web-http/1": { sol: "from urllib.parse import parse_qs\n\n\ndef app(environ, start_response):\n    if environ[\"PATH_INFO\"] != \"/hello\":\n        start_response(\"404 Not Found\", [(\"Content-Type\", \"text/plain; charset=utf-8\")])\n        return [\"ไม่พบหน้า\".encode(\"utf-8\")]\n    query = parse_qs(environ[\"QUERY_STRING\"])\n    name = query.get(\"name\", [\"คนแปลกหน้า\"])[0]\n    start_response(\"200 OK\", [(\"Content-Type\", \"text/plain; charset=utf-8\")])\n    return [f\"สวัสดี {name}\".encode(\"utf-8\")]\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["from urllib.parse import parse_qs\n\n\ndef app(environ, start_response):\n    if not environ[\"PATH_INFO\"].startswith(\"/hello\"):\n        start_response(\"404 Not Found\", [(\"Content-Type\", \"text/plain; charset=utf-8\")])\n        return [\"ไม่พบหน้า\".encode(\"utf-8\")]\n    query = parse_qs(environ[\"QUERY_STRING\"])\n    name = query.get(\"name\", [\"คนแปลกหน้า\"])[0]\n    start_response(\"200 OK\", [(\"Content-Type\", \"text/plain; charset=utf-8\")])\n    return [f\"สวัสดี {name}\".encode(\"utf-8\")]\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", "from urllib.parse import parse_qs\n\n\ndef app(environ, start_response):\n    if environ[\"PATH_INFO\"] != \"/hello\":\n        start_response(\"200 OK\", [(\"Content-Type\", \"text/plain; charset=utf-8\")])\n        return [\"ไม่พบหน้า\".encode(\"utf-8\")]\n    query = parse_qs(environ[\"QUERY_STRING\"])\n    name = query.get(\"name\", [\"คนแปลกหน้า\"])[0]\n    start_response(\"200 OK\", [(\"Content-Type\", \"text/plain; charset=utf-8\")])\n    return [f\"สวัสดี {name}\".encode(\"utf-8\")]\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-http/2": { sol: "import json\nfrom urllib.parse import parse_qs\n\n\ndef respond(start_response, status, payload, extra_headers=()):\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef app(environ, start_response):\n    path = environ[\"PATH_INFO\"]\n    if path == \"/health\":\n        return respond(start_response, \"200 OK\", {\"status\": \"ok\"})\n    if path == \"/square\":\n        raw = parse_qs(environ[\"QUERY_STRING\"]).get(\"n\", [\"\"])[0]\n        try:\n            n = int(raw)\n        except ValueError:\n            return respond(start_response, \"400 Bad Request\", {\"error\": \"n ต้องเป็นจำนวนเต็ม\"})\n        return respond(start_response, \"200 OK\", {\"n\": n, \"square\": n * n})\n    return respond(start_response, \"404 Not Found\", {\"error\": f\"ไม่พบ {path}\"})\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["import json\nfrom urllib.parse import parse_qs\n\n\ndef respond(start_response, status, payload, extra_headers=()):\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef app(environ, start_response):\n    path = environ[\"PATH_INFO\"]\n    if path == \"/health\":\n        return respond(start_response, \"200 OK\", {\"status\": \"ok\"})\n    if path == \"/square\":\n        raw = parse_qs(environ[\"QUERY_STRING\"]).get(\"n\", [\"\"])[0]\n        try:\n            n = int(raw)\n        except ValueError:\n            return respond(start_response, \"200 OK\", {\"error\": \"n ต้องเป็นจำนวนเต็ม\"})\n        return respond(start_response, \"200 OK\", {\"n\": n, \"square\": n * n})\n    return respond(start_response, \"404 Not Found\", {\"error\": f\"ไม่พบ {path}\"})\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", "import json\nfrom urllib.parse import parse_qs\n\n\ndef respond(start_response, status, payload, extra_headers=()):\n    body = json.dumps(payload, ensure_ascii=True).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef app(environ, start_response):\n    path = environ[\"PATH_INFO\"]\n    if path == \"/health\":\n        return respond(start_response, \"200 OK\", {\"status\": \"ok\"})\n    if path == \"/square\":\n        raw = parse_qs(environ[\"QUERY_STRING\"]).get(\"n\", [\"\"])[0]\n        try:\n            n = int(raw)\n        except ValueError:\n            return respond(start_response, \"400 Bad Request\", {\"error\": \"n ต้องเป็นจำนวนเต็ม\"})\n        return respond(start_response, \"200 OK\", {\"n\": n, \"square\": n * n})\n    return respond(start_response, \"404 Not Found\", {\"error\": f\"ไม่พบ {path}\"})\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-http/3": { sol: "import json\n\n\ndef app(environ, start_response):\n    body = json.dumps({\"message\": \"สวัสดี\", \"path\": environ[\"PATH_INFO\"]}, ensure_ascii=False).encode(\"utf-8\")\n    start_response(\"200 OK\", [(\"Content-Type\", \"application/json; charset=utf-8\"),\n                              (\"Content-Length\", str(len(body)))])\n    return [body]\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    method, path = line.split(\" \", 1)\n    status, headers, text = call(app, method, path)\n    print(f\"{status} | Content-Length: {headers['Content-Length']} | ไบต์จริง: {len(text.encode('utf-8'))} | {text}\")\n", wrong: ["import json\n\n\ndef app(environ, start_response):\n    body = json.dumps({\"message\": \"สวัสดี\", \"path\": environ[\"PATH_INFO\"]}, ensure_ascii=False)\n    start_response(\"200 OK\", [(\"Content-Type\", \"application/json; charset=utf-8\"),\n                              (\"Content-Length\", str(len(body)))])\n    return [body.encode(\"utf-8\")]\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    method, path = line.split(\" \", 1)\n    status, headers, text = call(app, method, path)\n    print(f\"{status} | Content-Length: {headers['Content-Length']} | ไบต์จริง: {len(text.encode('utf-8'))} | {text}\")\n"] },
  "py2-web-http/4": { sol: "import json\n\n\n\ndef respond(start_response, status, payload, extra_headers=()):\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef read_json(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    return json.loads(environ[\"wsgi.input\"].read(length).decode(\"utf-8\"))\n\n\ndef app(environ, start_response):\n    if environ[\"PATH_INFO\"] != \"/items\":\n        return respond(start_response, \"404 Not Found\", {\"error\": \"ไม่พบ\"})\n    if environ[\"REQUEST_METHOD\"] != \"POST\":\n        return respond(start_response, \"405 Method Not Allowed\", {\"error\": \"ใช้ได้เฉพาะ POST\"}, [(\"Allow\", \"POST\")])\n    try:\n        data = read_json(environ)\n    except json.JSONDecodeError:\n        return respond(start_response, \"400 Bad Request\", {\"error\": \"JSON ไม่ถูกต้อง\"})\n    if not isinstance(data, dict) or not isinstance(data.get(\"name\"), str) or not isinstance(data.get(\"qty\"), int) or isinstance(data.get(\"qty\"), bool):\n        return respond(start_response, \"422 Unprocessable Entity\", {\"error\": \"ต้องมี name (ข้อความ) และ qty (จำนวนเต็ม)\"})\n    return respond(start_response, \"201 Created\", {\"created\": {\"name\": data[\"name\"], \"qty\": data[\"qty\"]}})\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["import json\n\n\n\ndef respond(start_response, status, payload, extra_headers=()):\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef read_json(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    return json.loads(environ[\"wsgi.input\"].read(length).decode(\"utf-8\"))\n\n\ndef app(environ, start_response):\n    if environ[\"PATH_INFO\"] != \"/items\":\n        return respond(start_response, \"404 Not Found\", {\"error\": \"ไม่พบ\"})\n    if environ[\"REQUEST_METHOD\"] != \"POST\":\n        return respond(start_response, \"405 Method Not Allowed\", {\"error\": \"ใช้ได้เฉพาะ POST\"}, [(\"Allow\", \"POST\")])\n    try:\n        data = read_json(environ)\n    except json.JSONDecodeError:\n        return respond(start_response, \"400 Bad Request\", {\"error\": \"JSON ไม่ถูกต้อง\"})\n    if not isinstance(data, dict) or not isinstance(data.get(\"name\"), str) or not isinstance(data.get(\"qty\"), int):\n        return respond(start_response, \"422 Unprocessable Entity\", {\"error\": \"ต้องมี name (ข้อความ) และ qty (จำนวนเต็ม)\"})\n    return respond(start_response, \"201 Created\", {\"created\": {\"name\": data[\"name\"], \"qty\": data[\"qty\"]}})\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", "import json\n\n\n\ndef respond(start_response, status, payload, extra_headers=()):\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef read_json(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    return json.loads(environ[\"wsgi.input\"].read(length).decode(\"utf-8\"))\n\n\ndef app(environ, start_response):\n    if environ[\"PATH_INFO\"] != \"/items\":\n        return respond(start_response, \"404 Not Found\", {\"error\": \"ไม่พบ\"})\n    if environ[\"REQUEST_METHOD\"] != \"POST\":\n        return respond(start_response, \"405 Method Not Allowed\", {\"error\": \"ใช้ได้เฉพาะ POST\"})\n    try:\n        data = read_json(environ)\n    except json.JSONDecodeError:\n        return respond(start_response, \"400 Bad Request\", {\"error\": \"JSON ไม่ถูกต้อง\"})\n    if not isinstance(data, dict) or not isinstance(data.get(\"name\"), str) or not isinstance(data.get(\"qty\"), int) or isinstance(data.get(\"qty\"), bool):\n        return respond(start_response, \"422 Unprocessable Entity\", {\"error\": \"ต้องมี name (ข้อความ) และ qty (จำนวนเต็ม)\"})\n    return respond(start_response, \"201 Created\", {\"created\": {\"name\": data[\"name\"], \"qty\": data[\"qty\"]}})\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-router/0": { sol: "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\nclass App:\n    def __init__(self):\n        self.routes = {}\n\n    def route(self, path):\n        def register(handler):\n            self.routes[path] = handler\n            return handler\n        return register\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        handler = self.routes.get(req.path)\n        if handler is None:\n            return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n        code, payload = handler(req)\n        return send(start_response, code, payload)\n\n\napp = App()\n\n\n@app.route(\"/\")\ndef index(req):\n    return 200, {\"message\": \"หน้าแรก\"}\n\n\n@app.route(\"/hello\")\ndef hello(req):\n    return 200, {\"hello\": req.query.get(\"name\", \"world\")}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\nclass App:\n    def __init__(self):\n        self.routes = {}\n\n    def route(self, path):\n        def register(handler):\n            self.routes[path] = handler\n            return handler\n        return register\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        handler = self.routes.get(req.path)\n        if handler is None:\n            return send(start_response, 200, {\"error\": f\"ไม่พบ {req.path}\"})\n        code, payload = handler(req)\n        return send(start_response, code, payload)\n\n\napp = App()\n\n\n@app.route(\"/\")\ndef index(req):\n    return 200, {\"message\": \"หน้าแรก\"}\n\n\n@app.route(\"/hello\")\ndef hello(req):\n    return 200, {\"hello\": req.query.get(\"name\", \"world\")}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-router/1": { sol: "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path):\n        def register(handler):\n            self.routes.append((compile_path(path), handler))\n            return handler\n        return register\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        for pattern, handler in self.routes:\n            match = pattern.match(req.path)\n            if match:\n                code, payload = handler(req, **match.groupdict())\n                return send(start_response, code, payload)\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\n\n\n@app.route(\"/users/<user_id>\")\ndef user(req, user_id):\n    return 200, {\"user\": user_id}\n\n\n@app.route(\"/posts/<post_id>/comments/<comment_id>\")\ndef comment(req, post_id, comment_id):\n    return 200, {\"post\": post_id, \"comment\": comment_id}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>.+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path):\n        def register(handler):\n            self.routes.append((compile_path(path), handler))\n            return handler\n        return register\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        for pattern, handler in self.routes:\n            match = pattern.match(req.path)\n            if match:\n                code, payload = handler(req, **match.groupdict())\n                return send(start_response, code, payload)\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\n\n\n@app.route(\"/users/<user_id>\")\ndef user(req, user_id):\n    return 200, {\"user\": user_id}\n\n\n@app.route(\"/posts/<post_id>/comments/<comment_id>\")\ndef comment(req, post_id, comment_id):\n    return 200, {\"post\": post_id, \"comment\": comment_id}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path))\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path):\n        def register(handler):\n            self.routes.append((compile_path(path), handler))\n            return handler\n        return register\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        for pattern, handler in self.routes:\n            match = pattern.match(req.path)\n            if match:\n                code, payload = handler(req, **match.groupdict())\n                return send(start_response, code, payload)\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\n\n\n@app.route(\"/users/<user_id>\")\ndef user(req, user_id):\n    return 200, {\"user\": user_id}\n\n\n@app.route(\"/posts/<post_id>/comments/<comment_id>\")\ndef comment(req, post_id, comment_id):\n    return 200, {\"post\": post_id, \"comment\": comment_id}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-router/2": { sol: "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\nitems = []\n\n\n@app.route(\"/items\", methods=[\"GET\"])\ndef list_items(req):\n    return 200, {\"items\": items}\n\n\n@app.route(\"/items\", methods=[\"POST\"])\ndef create_item(req):\n    data = req.json()\n    items.append(data)\n    return 201, {\"created\": data}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\nitems = []\n\n\n@app.route(\"/items\", methods=[\"GET\"])\ndef list_items(req):\n    return 200, {\"items\": items}\n\n\n@app.route(\"/items\", methods=[\"POST\"])\ndef create_item(req):\n    data = req.json()\n    items.append(data)\n    return 201, {\"created\": data}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                code, payload = handler(req, **params)\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\nitems = []\n\n\n@app.route(\"/items\", methods=[\"GET\"])\ndef list_items(req):\n    return 200, {\"items\": items}\n\n\n@app.route(\"/items\", methods=[\"POST\"])\ndef create_item(req):\n    data = req.json()\n    items.append(data)\n    return 201, {\"created\": data}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-router/3": { sol: "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\ndef require_token(app, token):\n    \"\"\"middleware: ต้องส่ง Authorization: Bearer <token> ยกเว้น /health\"\"\"\n    def guarded(environ, start_response):\n        if environ[\"PATH_INFO\"] == \"/health\" or environ.get(\"HTTP_AUTHORIZATION\") == f\"Bearer {token}\":\n            return app(environ, start_response)\n        return send(start_response, 401, {\"error\": \"ต้องเข้าสู่ระบบ\"}, [(\"WWW-Authenticate\", \"Bearer\")])\n    return guarded\n\n\napi = App()\n\n\n@api.route(\"/health\")\ndef health(req):\n    return 200, {\"status\": \"ok\"}\n\n\n@api.route(\"/secret\")\ndef secret(req):\n    return 200, {\"secret\": 42}\n\n\napp = require_token(api, \"s3cr3t\")\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 3)\n    token, method, path = parts[0], parts[1], parts[2]\n    body = parts[3] if len(parts) > 3 else \"\"\n    headers = {} if token == \"-\" else {\"Authorization\": f\"Bearer {token}\"}\n    status, response_headers, text = call(app, method, path, body, headers)\n    print(f\"{status} | {text}\")\n", wrong: ["import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\ndef require_token(app, token):\n    \"\"\"middleware: ต้องส่ง Authorization: Bearer <token> ยกเว้น /health\"\"\"\n    def guarded(environ, start_response):\n        if environ[\"PATH_INFO\"] == \"/health\" or token in environ.get(\"HTTP_AUTHORIZATION\", \"\"):\n            return app(environ, start_response)\n        return send(start_response, 401, {\"error\": \"ต้องเข้าสู่ระบบ\"}, [(\"WWW-Authenticate\", \"Bearer\")])\n    return guarded\n\n\napi = App()\n\n\n@api.route(\"/health\")\ndef health(req):\n    return 200, {\"status\": \"ok\"}\n\n\n@api.route(\"/secret\")\ndef secret(req):\n    return 200, {\"secret\": 42}\n\n\napp = require_token(api, \"s3cr3t\")\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 3)\n    token, method, path = parts[0], parts[1], parts[2]\n    body = parts[3] if len(parts) > 3 else \"\"\n    headers = {} if token == \"-\" else {\"Authorization\": f\"Bearer {token}\"}\n    status, response_headers, text = call(app, method, path, body, headers)\n    print(f\"{status} | {text}\")\n", "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\ndef require_token(app, token):\n    \"\"\"middleware: ต้องส่ง Authorization: Bearer <token> ยกเว้น /health\"\"\"\n    def guarded(environ, start_response):\n        if environ.get(\"HTTP_AUTHORIZATION\") == f\"Bearer {token}\":\n            return app(environ, start_response)\n        return send(start_response, 401, {\"error\": \"ต้องเข้าสู่ระบบ\"}, [(\"WWW-Authenticate\", \"Bearer\")])\n    return guarded\n\n\napi = App()\n\n\n@api.route(\"/health\")\ndef health(req):\n    return 200, {\"status\": \"ok\"}\n\n\n@api.route(\"/secret\")\ndef secret(req):\n    return 200, {\"secret\": 42}\n\n\napp = require_token(api, \"s3cr3t\")\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 3)\n    token, method, path = parts[0], parts[1], parts[2]\n    body = parts[3] if len(parts) > 3 else \"\"\n    headers = {} if token == \"-\" else {\"Authorization\": f\"Bearer {token}\"}\n    status, response_headers, text = call(app, method, path, body, headers)\n    print(f\"{status} | {text}\")\n"] },
  "py2-web-router/4": { sol: "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\n\n\n@app.route(\"/users/<user_id>\")\ndef user(req, user_id):\n    return 200, {\"user\": user_id}\n\n\n@app.route(\"/users/me\")\ndef me(req):\n    return 200, {\"profile\": \"บัญชีของฉัน\"}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n", wrong: ["import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        for raw, pattern, methods, handler in self.routes:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\n\n\n@app.route(\"/users/me\")\ndef me(req):\n    return 200, {\"profile\": \"บัญชีของฉัน\"}\n\n\n@app.route(\"/users/<user_id>\")\ndef user(req, user_id):\n    return 200, {\"user\": user_id}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    method, path = parts[0], parts[1]\n    body = parts[2] if len(parts) > 2 else \"\"\n    status, headers, text = call(app, method, path, body)\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {headers.get('Content-Type', '-')} | {text}{extra}\")\n"] },
  "py2-web-router/5": { sol: "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\ntodos = {}\nnext_id = 1\n\n\ndef find(todo_id):\n    if not todo_id.isdigit() or int(todo_id) not in todos:\n        return None\n    return todos[int(todo_id)]\n\n\n@app.route(\"/todos\", methods=[\"GET\"])\ndef list_todos(req):\n    return 200, {\"todos\": list(todos.values())}\n\n\n@app.route(\"/todos\", methods=[\"POST\"])\ndef create_todo(req):\n    global next_id\n    data = req.json()\n    title = data.get(\"title\") if isinstance(data, dict) else None\n    if not isinstance(title, str) or not title.strip():\n        return 422, {\"error\": \"ต้องมี title\"}\n    todo = {\"id\": next_id, \"title\": title.strip(), \"done\": False}\n    todos[next_id] = todo\n    next_id += 1\n    return 201, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"GET\"])\ndef get_todo(req, todo_id):\n    todo = find(todo_id)\n    return (200, todo) if todo else (404, {\"error\": f\"ไม่พบงาน {todo_id}\"})\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"PATCH\"])\ndef update_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    data = req.json()\n    if not isinstance(data, dict) or not isinstance(data.get(\"done\"), bool):\n        return 422, {\"error\": \"done ต้องเป็น true/false\"}\n    todo[\"done\"] = data[\"done\"]\n    return 200, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"DELETE\"])\ndef delete_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    del todos[todo[\"id\"]]\n    return 204, None\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    status, headers, text = call(app, parts[0], parts[1], parts[2] if len(parts) > 2 else \"\")\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {text or '(ว่าง)'}{extra}\")\n", wrong: ["import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\ntodos = {}\nnext_id = 1\n\n\ndef find(todo_id):\n    if not todo_id.isdigit() or int(todo_id) not in todos:\n        return None\n    return todos[int(todo_id)]\n\n\n@app.route(\"/todos\", methods=[\"GET\"])\ndef list_todos(req):\n    return 200, {\"todos\": list(todos.values())}\n\n\n@app.route(\"/todos\", methods=[\"POST\"])\ndef create_todo(req):\n    global next_id\n    data = req.json()\n    title = data.get(\"title\") if isinstance(data, dict) else None\n    if not isinstance(title, str) or not title.strip():\n        return 422, {\"error\": \"ต้องมี title\"}\n    new_id = len(todos) + 1\n    todo = {\"id\": new_id, \"title\": title.strip(), \"done\": False}\n    todos[new_id] = todo\n    return 201, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"GET\"])\ndef get_todo(req, todo_id):\n    todo = find(todo_id)\n    return (200, todo) if todo else (404, {\"error\": f\"ไม่พบงาน {todo_id}\"})\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"PATCH\"])\ndef update_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    data = req.json()\n    if not isinstance(data, dict) or not isinstance(data.get(\"done\"), bool):\n        return 422, {\"error\": \"done ต้องเป็น true/false\"}\n    todo[\"done\"] = data[\"done\"]\n    return 200, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"DELETE\"])\ndef delete_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    del todos[todo[\"id\"]]\n    return 204, None\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    status, headers, text = call(app, parts[0], parts[1], parts[2] if len(parts) > 2 else \"\")\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {text or '(ว่าง)'}{extra}\")\n", "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\ntodos = {}\nnext_id = 1\n\n\ndef find(todo_id):\n    if not todo_id.isdigit() or int(todo_id) not in todos:\n        return None\n    return todos[int(todo_id)]\n\n\n@app.route(\"/todos\", methods=[\"GET\"])\ndef list_todos(req):\n    return 200, {\"todos\": list(todos.values())}\n\n\n@app.route(\"/todos\", methods=[\"POST\"])\ndef create_todo(req):\n    global next_id\n    data = req.json()\n    title = data.get(\"title\") if isinstance(data, dict) else None\n    if not isinstance(title, str) or not title.strip():\n        return 422, {\"error\": \"ต้องมี title\"}\n    todo = {\"id\": next_id, \"title\": title.strip(), \"done\": False}\n    todos[next_id] = todo\n    next_id += 1\n    return 201, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"GET\"])\ndef get_todo(req, todo_id):\n    todo = find(todo_id)\n    return (200, todo) if todo else (404, {\"error\": f\"ไม่พบงาน {todo_id}\"})\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"PATCH\"])\ndef update_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    data = req.json()\n    if not isinstance(data, dict) or not isinstance(data.get(\"done\"), bool):\n        return 422, {\"error\": \"done ต้องเป็น true/false\"}\n    todo[\"done\"] = data[\"done\"]\n    return 200, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"DELETE\"])\ndef delete_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    del todos[todo[\"id\"]]\n    return 200, {\"deleted\": todo[\"id\"]}\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    status, headers, text = call(app, parts[0], parts[1], parts[2] if len(parts) > 2 else \"\")\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {text or '(ว่าง)'}{extra}\")\n", "import json\nimport re\nfrom dataclasses import dataclass, field\nfrom http import HTTPStatus\nfrom urllib.parse import parse_qs\n\n\n@dataclass\nclass Request:\n    method: str\n    path: str\n    query: dict = field(default_factory=dict)\n    body: str = \"\"\n\n    def json(self):\n        return json.loads(self.body)\n\n\ndef make_request(environ):\n    length = int(environ.get(\"CONTENT_LENGTH\") or 0)\n    body = environ[\"wsgi.input\"].read(length).decode(\"utf-8\")\n    query = {k: v[0] for k, v in parse_qs(environ[\"QUERY_STRING\"]).items()}\n    return Request(environ[\"REQUEST_METHOD\"], environ[\"PATH_INFO\"], query, body)\n\n\ndef send(start_response, code, payload, extra_headers=()):\n    status = f\"{code} {HTTPStatus(code).phrase}\"\n    if payload is None:\n        start_response(status, list(extra_headers))\n        return []\n    body = json.dumps(payload, ensure_ascii=False).encode(\"utf-8\")\n    start_response(status, [(\"Content-Type\", \"application/json; charset=utf-8\"), *extra_headers])\n    return [body]\n\n\ndef compile_path(path):\n    \"\"\"แปลง /users/<id> เป็น regex ^/users/(?P<id>[^/]+)$\"\"\"\n    return re.compile(\"^\" + re.sub(r\"<(\\w+)>\", r\"(?P<\\1>[^/]+)\", path) + \"$\")\n\n\nclass App:\n    def __init__(self):\n        self.routes = []\n\n    def route(self, path, methods=(\"GET\",)):\n        def register(handler):\n            self.routes.append((path, compile_path(path), {m.upper() for m in methods}, handler))\n            return handler\n        return register\n\n    def _candidates(self, path):\n        # route ที่ไม่มี parameter ต้องชนะ route ที่มี parameter (เช่น /users/me ก่อน /users/<id>)\n        ordered = sorted(self.routes, key=lambda r: \"<\" in r[0])\n        for raw, pattern, methods, handler in ordered:\n            match = pattern.match(path)\n            if match:\n                yield methods, handler, match.groupdict()\n\n    def __call__(self, environ, start_response):\n        req = make_request(environ)\n        allowed = set()\n        for methods, handler, params in self._candidates(req.path):\n            if req.method in methods:\n                try:\n                    code, payload = handler(req, **params)\n                except json.JSONDecodeError:\n                    return send(start_response, 400, {\"error\": \"JSON ไม่ถูกต้อง\"})\n                return send(start_response, code, payload)\n            allowed |= methods\n        if allowed:\n            return send(start_response, 405, {\"error\": \"ใช้ method นี้ไม่ได้\"}, [(\"Allow\", \", \".join(sorted(allowed)))])\n        return send(start_response, 404, {\"error\": f\"ไม่พบ {req.path}\"})\n\n\napp = App()\ntodos = {}\nnext_id = 1\n\n\ndef find(todo_id):\n    if not todo_id.isdigit() or int(todo_id) not in todos:\n        return None\n    return todos[int(todo_id)]\n\n\n@app.route(\"/todos\", methods=[\"GET\"])\ndef list_todos(req):\n    return 200, {\"todos\": list(todos.values())}\n\n\n@app.route(\"/todos\", methods=[\"POST\"])\ndef create_todo(req):\n    global next_id\n    data = req.json()\n    title = data.get(\"title\") if isinstance(data, dict) else None\n    if not isinstance(title, str) or not title.strip():\n        return 422, {\"error\": \"ต้องมี title\"}\n    todo = {\"id\": next_id, \"title\": title.strip(), \"done\": False}\n    todos[next_id] = todo\n    next_id += 1\n    return 201, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"GET\"])\ndef get_todo(req, todo_id):\n    todo = find(todo_id)\n    return (200, todo) if todo else (404, {\"error\": f\"ไม่พบงาน {todo_id}\"})\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"PATCH\"])\ndef update_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    data = req.json()\n    if not isinstance(data, dict) or \"done\" not in data:\n        return 422, {\"error\": \"done ต้องเป็น true/false\"}\n    todo[\"done\"] = data[\"done\"]\n    return 200, todo\n\n\n@app.route(\"/todos/<todo_id>\", methods=[\"DELETE\"])\ndef delete_todo(req, todo_id):\n    todo = find(todo_id)\n    if not todo:\n        return 404, {\"error\": f\"ไม่พบงาน {todo_id}\"}\n    del todos[todo[\"id\"]]\n    return 204, None\n\n\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\nwhile (line := input()) != \"end\":\n    parts = line.split(\" \", 2)\n    status, headers, text = call(app, parts[0], parts[1], parts[2] if len(parts) > 2 else \"\")\n    extra = f\" | Allow: {headers['Allow']}\" if \"Allow\" in headers else \"\"\n    print(f\"{status} | {text or '(ว่าง)'}{extra}\")\n"] },

  // ── Career Track: Web Backend W3 (สร้างด้วย json.dumps) ──
  "py2-web-client/0": { sol: "from html.parser import HTMLParser\n\n\nclass HeadingParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.depth = 0\n        self.current = []\n        self.headings = []\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"h2\":\n            self.depth += 1\n            self.current = []\n\n    def handle_endtag(self, tag):\n        if tag == \"h2\" and self.depth:\n            self.depth -= 1\n            self.headings.append(\" \".join(\"\".join(self.current).split()))\n\n    def handle_data(self, data):\n        if self.depth:\n            self.current.append(data)\n\n\ndef extract_headings(html):\n    parser = HeadingParser()\n    parser.feed(html)\n    return parser.headings\n", wrong: ["from html.parser import HTMLParser\n\n\nclass HeadingParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.depth = 0\n        self.current = []\n        self.headings = []\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"h2\":\n            self.depth += 1\n            self.current = []\n\n    def handle_endtag(self, tag):\n        if tag == \"h2\" and self.depth:\n            self.depth -= 1\n            self.headings.append(\"\".join(self.current).strip())\n\n    def handle_data(self, data):\n        if self.depth:\n            self.current.append(data)\n\n\ndef extract_headings(html):\n    parser = HeadingParser()\n    parser.feed(html)\n    return parser.headings\n", "import re\n\n\ndef extract_headings(html):\n    return [h.strip() for h in re.findall(r\"<h2>(.*?)</h2>\", html)]\n"] },
  "py2-web-client/1": { sol: "from html.parser import HTMLParser\nfrom urllib.parse import urljoin\n\n\nclass LinkParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.hrefs = []\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"a\":\n            href = dict(attrs).get(\"href\")\n            if href:\n                self.hrefs.append(href)\n\n\ndef extract_links(html, base):\n    parser = LinkParser()\n    parser.feed(html)\n    result = []\n    for href in parser.hrefs:\n        if href.startswith((\"#\", \"mailto:\", \"javascript:\")):\n            continue\n        url = urljoin(base, href)\n        if url not in result:\n            result.append(url)\n    return result\n", wrong: ["from html.parser import HTMLParser\nfrom urllib.parse import urljoin\n\n\nclass LinkParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.hrefs = []\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"a\":\n            href = dict(attrs).get(\"href\")\n            if href:\n                self.hrefs.append(href)\n\n\ndef extract_links(html, base):\n    parser = LinkParser()\n    parser.feed(html)\n    result = []\n    for href in parser.hrefs:\n        if href.startswith((\"#\", \"mailto:\", \"javascript:\")):\n            continue\n        url = base.rstrip(\"/\") + \"/\" + href.lstrip(\"/\")\n        if url not in result:\n            result.append(url)\n    return result\n", "from html.parser import HTMLParser\nfrom urllib.parse import urljoin\n\n\nclass LinkParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.hrefs = []\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"a\":\n            href = dict(attrs).get(\"href\")\n            if href:\n                self.hrefs.append(href)\n\n\ndef extract_links(html, base):\n    parser = LinkParser()\n    parser.feed(html)\n    result = []\n    for href in parser.hrefs:\n        if href.startswith((\"#\", \"mailto:\", \"javascript:\")):\n            continue\n        url = urljoin(base, href)\n        result.append(url)\n    return result\n"] },
  "py2-web-client/2": { sol: "from html.parser import HTMLParser\n\n\nclass TableParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.rows = []\n        self.row = None\n        self.cell = None\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"tr\":\n            self.row = []\n        elif tag == \"td\" and self.row is not None:\n            self.cell = []\n\n    def handle_endtag(self, tag):\n        if tag == \"td\" and self.cell is not None:\n            self.row.append(\" \".join(\"\".join(self.cell).split()))\n            self.cell = None\n        elif tag == \"tr\" and self.row is not None:\n            self.rows.append(self.row)\n            self.row = None\n\n    def handle_data(self, data):\n        if self.cell is not None:\n            self.cell.append(data)\n\n\ndef parse_prices(html):\n    parser = TableParser()\n    parser.feed(html)\n    result = {}\n    for row in parser.rows:\n        if len(row) >= 2:\n            result[row[0]] = float(row[1].replace(\",\", \"\"))\n    return result\n", wrong: ["from html.parser import HTMLParser\n\n\nclass TableParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.rows = []\n        self.row = None\n        self.cell = None\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"tr\":\n            self.row = []\n        elif tag == \"td\" and self.row is not None:\n            self.cell = []\n\n    def handle_endtag(self, tag):\n        if tag == \"td\" and self.cell is not None:\n            self.row.append(\" \".join(\"\".join(self.cell).split()))\n            self.cell = None\n        elif tag == \"tr\" and self.row is not None:\n            self.rows.append(self.row)\n            self.row = None\n\n    def handle_data(self, data):\n        if self.cell is not None:\n            self.cell.append(data)\n\n\ndef parse_prices(html):\n    parser = TableParser()\n    parser.feed(html)\n    result = {}\n    for row in parser.rows:\n        if len(row) >= 2:\n            result[row[0]] = float(row[1])\n    return result\n", "import re\n\n\ndef parse_prices(html):\n    names = re.findall(r\"<td[^>]*>(.*?)</td>\\s*<td\", html)\n    prices = re.findall(r\"</td>\\s*<td[^>]*>(.*?)</td>\", html)\n    return {name: float(price) for name, price in zip(names, prices)}\n"] },
  "py2-web-client/3": { sol: "import json\n\n\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    \"\"\"เรียก transport(url) → (status, body) · ลองใหม่เมื่อ 5xx หรือเชื่อมต่อไม่ได้ (รอ 0.1, 0.2, 0.4 …)\"\"\"\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nscript = input().split()\npending = list(script)\ncalls = []\nwaits = []\n\n\ndef transport(url):\n    calls.append(url)\n    step = pending.pop(0) if pending else \"200\"\n    if step == \"down\":\n        raise ConnectionError(\"เชื่อมต่อไม่ได้\")\n    code = int(step)\n    return code, json.dumps({\"ok\": True, \"attempt\": len(calls)}) if code == 200 else \"{}\"\n\n\ntry:\n    data = fetch_json(transport, \"https://api.shop.th/items\", retries=int(input()), sleep=waits.append)\n    print(\"ผล:\", data)\nexcept ApiError as e:\n    print(\"ApiError:\", e)\nprint(\"เรียก\", len(calls), \"ครั้ง · รอ\", [round(w, 2) for w in waits])\n", wrong: ["import json\n\n\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    \"\"\"เรียก transport(url) → (status, body) · ลองใหม่เมื่อ 5xx หรือเชื่อมต่อไม่ได้ (รอ 0.1, 0.2, 0.4 …)\"\"\"\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nscript = input().split()\npending = list(script)\ncalls = []\nwaits = []\n\n\ndef transport(url):\n    calls.append(url)\n    step = pending.pop(0) if pending else \"200\"\n    if step == \"down\":\n        raise ConnectionError(\"เชื่อมต่อไม่ได้\")\n    code = int(step)\n    return code, json.dumps({\"ok\": True, \"attempt\": len(calls)}) if code == 200 else \"{}\"\n\n\ntry:\n    data = fetch_json(transport, \"https://api.shop.th/items\", retries=int(input()), sleep=waits.append)\n    print(\"ผล:\", data)\nexcept ApiError as e:\n    print(\"ApiError:\", e)\nprint(\"เรียก\", len(calls), \"ครั้ง · รอ\", [round(w, 2) for w in waits])\n", "import json\n\n\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    \"\"\"เรียก transport(url) → (status, body) · ลองใหม่เมื่อ 5xx หรือเชื่อมต่อไม่ได้ (รอ 0.1, 0.2, 0.4 …)\"\"\"\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay)\n        attempt += 1\n\n\nscript = input().split()\npending = list(script)\ncalls = []\nwaits = []\n\n\ndef transport(url):\n    calls.append(url)\n    step = pending.pop(0) if pending else \"200\"\n    if step == \"down\":\n        raise ConnectionError(\"เชื่อมต่อไม่ได้\")\n    code = int(step)\n    return code, json.dumps({\"ok\": True, \"attempt\": len(calls)}) if code == 200 else \"{}\"\n\n\ntry:\n    data = fetch_json(transport, \"https://api.shop.th/items\", retries=int(input()), sleep=waits.append)\n    print(\"ผล:\", data)\nexcept ApiError as e:\n    print(\"ApiError:\", e)\nprint(\"เรียก\", len(calls), \"ครั้ง · รอ\", [round(w, 2) for w in waits])\n", "import json\n\n\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    \"\"\"เรียก transport(url) → (status, body) · ลองใหม่เมื่อ 5xx หรือเชื่อมต่อไม่ได้ (รอ 0.1, 0.2, 0.4 …)\"\"\"\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries - 1:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nscript = input().split()\npending = list(script)\ncalls = []\nwaits = []\n\n\ndef transport(url):\n    calls.append(url)\n    step = pending.pop(0) if pending else \"200\"\n    if step == \"down\":\n        raise ConnectionError(\"เชื่อมต่อไม่ได้\")\n    code = int(step)\n    return code, json.dumps({\"ok\": True, \"attempt\": len(calls)}) if code == 200 else \"{}\"\n\n\ntry:\n    data = fetch_json(transport, \"https://api.shop.th/items\", retries=int(input()), sleep=waits.append)\n    print(\"ผล:\", data)\nexcept ApiError as e:\n    print(\"ApiError:\", e)\nprint(\"เรียก\", len(calls), \"ครั้ง · รอ\", [round(w, 2) for w in waits])\n"] },
  "py2-web-client/4": { sol: "import json\n\n\ndef fetch_all(transport, url):\n    \"\"\"ตามลิงก์ next จนหมด · คืนรายการทั้งหมด · ป้องกันการวนไม่จบเมื่อ next ชี้กลับไปหน้าที่เคยดึง\"\"\"\n    items = []\n    seen = set()\n    while url:\n        if url in seen:\n            raise RuntimeError(f\"วนกลับไปหน้าเดิม: {url}\")\n        seen.add(url)\n        page = json.loads(transport(url))\n        items.extend(page[\"items\"])\n        url = page.get(\"next\")\n    return items\n\n\npages = json.loads(input())\nrequested = []\n\n\ndef transport(url):\n    requested.append(url)\n    return json.dumps(pages[url])\n\n\ntry:\n    items = fetch_all(transport, \"/items?page=1\")\n    print(\"ได้\", len(items), \"รายการ:\", items)\nexcept RuntimeError as e:\n    print(\"RuntimeError:\", e)\nprint(\"ดึง\", len(requested), \"หน้า\")\n", wrong: ["import json\n\n\ndef fetch_all(transport, url):\n    items = []\n    for _ in range(100):\n        if not url:\n            break\n        page = json.loads(transport(url))\n        items.extend(page[\"items\"])\n        url = page.get(\"next\")\n    return items\n\n\npages = json.loads(input())\nrequested = []\n\n\ndef transport(url):\n    requested.append(url)\n    return json.dumps(pages[url])\n\n\ntry:\n    items = fetch_all(transport, \"/items?page=1\")\n    print(\"ได้\", len(items), \"รายการ:\", items)\nexcept RuntimeError as e:\n    print(\"RuntimeError:\", e)\nprint(\"ดึง\", len(requested), \"หน้า\")\n"] },
  "py2-web-client/5": { sol: "import json\nfrom html.parser import HTMLParser\nfrom urllib.parse import parse_qs, urlencode\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\n# ── บริการราคาอ้างอิง (จำลอง) — ล่มชั่วคราวครั้งแรกเมื่อถามราคาหูฟัง ──\nREFERENCE = {\"สมุด\": 25.0, \"ปากกา & ดินสอ\": 40.0, \"หูฟัง\": 990.0, \"ไม้บรรทัด\": 15.0}\nflaky = {\"หูฟัง\": 1}\n\n\ndef reference_app(environ, start_response):\n    name = parse_qs(environ[\"QUERY_STRING\"]).get(\"name\", [\"\"])[0]\n    if flaky.get(name):\n        flaky[name] -= 1\n        start_response(\"503 Service Unavailable\", [(\"Content-Type\", \"application/json\")])\n        return [b\"{}\"]\n    if environ[\"PATH_INFO\"] != \"/reference\" or name not in REFERENCE:\n        start_response(\"404 Not Found\", [(\"Content-Type\", \"application/json\")])\n        return [json.dumps({\"error\": \"ไม่พบ\"}).encode()]\n    start_response(\"200 OK\", [(\"Content-Type\", \"application/json; charset=utf-8\")])\n    return [json.dumps({\"name\": name, \"price\": REFERENCE[name]}, ensure_ascii=False).encode(\"utf-8\")]\n\n\ndef transport(url):\n    status, headers, body = call(reference_app, \"GET\", url)\n    return int(status.split()[0]), body\n\n\n# ── client จาก W15 ──\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nclass ProductParser(HTMLParser):\n    \"\"\"เก็บ (ชื่อ, ข้อความราคา) จากการ์ด <div class=\"product\"> ที่มี <h3> และ <span class=\"price\">\"\"\"\n\n    def __init__(self):\n        super().__init__()\n        self.products = []\n        self.card = None\n        self.field = None\n\n    def handle_starttag(self, tag, attrs):\n        classes = (dict(attrs).get(\"class\") or \"\").split()\n        if tag == \"div\" and \"product\" in classes:\n            self.card = {\"name\": [], \"price\": []}\n        elif self.card is not None and tag == \"h3\":\n            self.field = \"name\"\n        elif self.card is not None and tag == \"span\" and \"price\" in classes:\n            self.field = \"price\"\n\n    def handle_endtag(self, tag):\n        if tag in (\"h3\", \"span\"):\n            self.field = None\n        elif tag == \"div\" and self.card is not None:\n            name = \" \".join(\"\".join(self.card[\"name\"]).split())\n            price = \" \".join(\"\".join(self.card[\"price\"]).split())\n            self.products.append((name, price))\n            self.card = None\n\n    def handle_data(self, data):\n        if self.card is not None and self.field:\n            self.card[self.field].append(data)\n\n\ndef parse_price(text):\n    return float(text.replace(\"฿\", \"\").replace(\",\", \"\").strip())\n\n\ndef watch(html):\n    parser = ProductParser()\n    parser.feed(html)\n    worth = []\n    for name, price_text in parser.products:\n        try:\n            shop = parse_price(price_text)\n        except ValueError:\n            print(f\"{name}: ราคาร้านอ่านไม่ได้\")\n            continue\n        try:\n            ref = fetch_json(transport, \"/reference?\" + urlencode({\"name\": name}), sleep=lambda s: None)[\"price\"]\n        except ApiError:\n            print(f\"{name}: ไม่มีราคาอ้างอิง\")\n            continue\n        diff = (ref - shop) / ref * 100\n        label = f\"ถูกกว่า {diff:.1f}%\" if diff >= 0 else f\"แพงกว่า {-diff:.1f}%\"\n        mark = \" ← คุ้ม\" if diff >= 10 else \"\"\n        print(f\"{name}: ร้าน {shop:,.2f} · อ้างอิง {ref:,.2f} · {label}{mark}\")\n        if diff >= 10:\n            worth.append(name)\n    print(f\"คุ้มค่า {len(worth)} รายการ: \" + \", \".join(worth) if worth else \"ไม่มีรายการที่คุ้มค่า\")\n\n\nwith open(\"shop.html\", encoding=\"utf-8\") as f:\n    watch(f.read())\n", wrong: ["import json\nfrom html.parser import HTMLParser\nfrom urllib.parse import parse_qs, urlencode\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\n# ── บริการราคาอ้างอิง (จำลอง) — ล่มชั่วคราวครั้งแรกเมื่อถามราคาหูฟัง ──\nREFERENCE = {\"สมุด\": 25.0, \"ปากกา & ดินสอ\": 40.0, \"หูฟัง\": 990.0, \"ไม้บรรทัด\": 15.0}\nflaky = {\"หูฟัง\": 1}\n\n\ndef reference_app(environ, start_response):\n    name = parse_qs(environ[\"QUERY_STRING\"]).get(\"name\", [\"\"])[0]\n    if flaky.get(name):\n        flaky[name] -= 1\n        start_response(\"503 Service Unavailable\", [(\"Content-Type\", \"application/json\")])\n        return [b\"{}\"]\n    if environ[\"PATH_INFO\"] != \"/reference\" or name not in REFERENCE:\n        start_response(\"404 Not Found\", [(\"Content-Type\", \"application/json\")])\n        return [json.dumps({\"error\": \"ไม่พบ\"}).encode()]\n    start_response(\"200 OK\", [(\"Content-Type\", \"application/json; charset=utf-8\")])\n    return [json.dumps({\"name\": name, \"price\": REFERENCE[name]}, ensure_ascii=False).encode(\"utf-8\")]\n\n\ndef transport(url):\n    status, headers, body = call(reference_app, \"GET\", url)\n    return int(status.split()[0]), body\n\n\n# ── client จาก W15 ──\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nclass ProductParser(HTMLParser):\n    \"\"\"เก็บ (ชื่อ, ข้อความราคา) จากการ์ด <div class=\"product\"> ที่มี <h3> และ <span class=\"price\">\"\"\"\n\n    def __init__(self):\n        super().__init__()\n        self.products = []\n        self.card = None\n        self.field = None\n\n    def handle_starttag(self, tag, attrs):\n        classes = (dict(attrs).get(\"class\") or \"\").split()\n        if tag == \"div\" and \"product\" in classes:\n            self.card = {\"name\": [], \"price\": []}\n        elif self.card is not None and tag == \"h3\":\n            self.field = \"name\"\n        elif self.card is not None and tag == \"span\" and \"price\" in classes:\n            self.field = \"price\"\n\n    def handle_endtag(self, tag):\n        if tag in (\"h3\", \"span\"):\n            self.field = None\n        elif tag == \"div\" and self.card is not None:\n            name = \" \".join(\"\".join(self.card[\"name\"]).split())\n            price = \" \".join(\"\".join(self.card[\"price\"]).split())\n            self.products.append((name, price))\n            self.card = None\n\n    def handle_data(self, data):\n        if self.card is not None and self.field:\n            self.card[self.field].append(data)\n\n\ndef parse_price(text):\n    return float(text.replace(\"฿\", \"\").replace(\",\", \"\").strip())\n\n\ndef watch(html):\n    parser = ProductParser()\n    parser.feed(html)\n    worth = []\n    for name, price_text in parser.products:\n        try:\n            shop = parse_price(price_text)\n        except ValueError:\n            print(f\"{name}: ราคาร้านอ่านไม่ได้\")\n            continue\n        try:\n            ref = fetch_json(transport, \"/reference?name=\" + name, sleep=lambda s: None)[\"price\"]\n        except ApiError:\n            print(f\"{name}: ไม่มีราคาอ้างอิง\")\n            continue\n        diff = (ref - shop) / ref * 100\n        label = f\"ถูกกว่า {diff:.1f}%\" if diff >= 0 else f\"แพงกว่า {-diff:.1f}%\"\n        mark = \" ← คุ้ม\" if diff >= 10 else \"\"\n        print(f\"{name}: ร้าน {shop:,.2f} · อ้างอิง {ref:,.2f} · {label}{mark}\")\n        if diff >= 10:\n            worth.append(name)\n    print(f\"คุ้มค่า {len(worth)} รายการ: \" + \", \".join(worth) if worth else \"ไม่มีรายการที่คุ้มค่า\")\n\n\nwith open(\"shop.html\", encoding=\"utf-8\") as f:\n    watch(f.read())\n", "import json\nfrom html.parser import HTMLParser\nfrom urllib.parse import parse_qs, urlencode\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\n# ── บริการราคาอ้างอิง (จำลอง) — ล่มชั่วคราวครั้งแรกเมื่อถามราคาหูฟัง ──\nREFERENCE = {\"สมุด\": 25.0, \"ปากกา & ดินสอ\": 40.0, \"หูฟัง\": 990.0, \"ไม้บรรทัด\": 15.0}\nflaky = {\"หูฟัง\": 1}\n\n\ndef reference_app(environ, start_response):\n    name = parse_qs(environ[\"QUERY_STRING\"]).get(\"name\", [\"\"])[0]\n    if flaky.get(name):\n        flaky[name] -= 1\n        start_response(\"503 Service Unavailable\", [(\"Content-Type\", \"application/json\")])\n        return [b\"{}\"]\n    if environ[\"PATH_INFO\"] != \"/reference\" or name not in REFERENCE:\n        start_response(\"404 Not Found\", [(\"Content-Type\", \"application/json\")])\n        return [json.dumps({\"error\": \"ไม่พบ\"}).encode()]\n    start_response(\"200 OK\", [(\"Content-Type\", \"application/json; charset=utf-8\")])\n    return [json.dumps({\"name\": name, \"price\": REFERENCE[name]}, ensure_ascii=False).encode(\"utf-8\")]\n\n\ndef transport(url):\n    status, headers, body = call(reference_app, \"GET\", url)\n    return int(status.split()[0]), body\n\n\n# ── client จาก W15 ──\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nclass ProductParser(HTMLParser):\n    \"\"\"เก็บ (ชื่อ, ข้อความราคา) จากการ์ด <div class=\"product\"> ที่มี <h3> และ <span class=\"price\">\"\"\"\n\n    def __init__(self):\n        super().__init__()\n        self.products = []\n        self.card = None\n        self.field = None\n\n    def handle_starttag(self, tag, attrs):\n        classes = (dict(attrs).get(\"class\") or \"\").split()\n        if tag == \"div\" and dict(attrs).get(\"class\") == \"product\":\n            self.card = {\"name\": [], \"price\": []}\n        elif self.card is not None and tag == \"h3\":\n            self.field = \"name\"\n        elif self.card is not None and tag == \"span\" and \"price\" in classes:\n            self.field = \"price\"\n\n    def handle_endtag(self, tag):\n        if tag in (\"h3\", \"span\"):\n            self.field = None\n        elif tag == \"div\" and self.card is not None:\n            name = \" \".join(\"\".join(self.card[\"name\"]).split())\n            price = \" \".join(\"\".join(self.card[\"price\"]).split())\n            self.products.append((name, price))\n            self.card = None\n\n    def handle_data(self, data):\n        if self.card is not None and self.field:\n            self.card[self.field].append(data)\n\n\ndef parse_price(text):\n    return float(text.replace(\"฿\", \"\").replace(\",\", \"\").strip())\n\n\ndef watch(html):\n    parser = ProductParser()\n    parser.feed(html)\n    worth = []\n    for name, price_text in parser.products:\n        try:\n            shop = parse_price(price_text)\n        except ValueError:\n            print(f\"{name}: ราคาร้านอ่านไม่ได้\")\n            continue\n        try:\n            ref = fetch_json(transport, \"/reference?\" + urlencode({\"name\": name}), sleep=lambda s: None)[\"price\"]\n        except ApiError:\n            print(f\"{name}: ไม่มีราคาอ้างอิง\")\n            continue\n        diff = (ref - shop) / ref * 100\n        label = f\"ถูกกว่า {diff:.1f}%\" if diff >= 0 else f\"แพงกว่า {-diff:.1f}%\"\n        mark = \" ← คุ้ม\" if diff >= 10 else \"\"\n        print(f\"{name}: ร้าน {shop:,.2f} · อ้างอิง {ref:,.2f} · {label}{mark}\")\n        if diff >= 10:\n            worth.append(name)\n    print(f\"คุ้มค่า {len(worth)} รายการ: \" + \", \".join(worth) if worth else \"ไม่มีรายการที่คุ้มค่า\")\n\n\nwith open(\"shop.html\", encoding=\"utf-8\") as f:\n    watch(f.read())\n", "import json\nfrom html.parser import HTMLParser\nfrom urllib.parse import parse_qs, urlencode\nimport io\nimport json\nfrom wsgiref.util import setup_testing_defaults\n\n\ndef call(app, method, path, body=\"\", headers=None):\n    \"\"\"ส่งคำขอจำลองให้แอป WSGI โดยไม่ต้องมีเครือข่าย แล้วคืน (status, headers, body)\"\"\"\n    path, _, query = path.partition(\"?\")\n    data = body.encode(\"utf-8\")\n    environ = {\"REQUEST_METHOD\": method, \"PATH_INFO\": path, \"QUERY_STRING\": query,\n               \"CONTENT_LENGTH\": str(len(data)), \"wsgi.input\": io.BytesIO(data)}\n    for name, value in (headers or {}).items():\n        environ[\"HTTP_\" + name.upper().replace(\"-\", \"_\")] = value\n    setup_testing_defaults(environ)\n    captured = {}\n\n    def start_response(status, response_headers):\n        captured[\"status\"] = status\n        captured[\"headers\"] = dict(response_headers)\n\n    chunks = app(environ, start_response)\n    return captured[\"status\"], captured[\"headers\"], b\"\".join(chunks).decode(\"utf-8\")\n\n\n# ── บริการราคาอ้างอิง (จำลอง) — ล่มชั่วคราวครั้งแรกเมื่อถามราคาหูฟัง ──\nREFERENCE = {\"สมุด\": 25.0, \"ปากกา & ดินสอ\": 40.0, \"หูฟัง\": 990.0, \"ไม้บรรทัด\": 15.0}\nflaky = {\"หูฟัง\": 1}\n\n\ndef reference_app(environ, start_response):\n    name = parse_qs(environ[\"QUERY_STRING\"]).get(\"name\", [\"\"])[0]\n    if flaky.get(name):\n        flaky[name] -= 1\n        start_response(\"503 Service Unavailable\", [(\"Content-Type\", \"application/json\")])\n        return [b\"{}\"]\n    if environ[\"PATH_INFO\"] != \"/reference\" or name not in REFERENCE:\n        start_response(\"404 Not Found\", [(\"Content-Type\", \"application/json\")])\n        return [json.dumps({\"error\": \"ไม่พบ\"}).encode()]\n    start_response(\"200 OK\", [(\"Content-Type\", \"application/json; charset=utf-8\")])\n    return [json.dumps({\"name\": name, \"price\": REFERENCE[name]}, ensure_ascii=False).encode(\"utf-8\")]\n\n\ndef transport(url):\n    status, headers, body = call(reference_app, \"GET\", url)\n    return int(status.split()[0]), body\n\n\n# ── client จาก W15 ──\nclass ApiError(Exception):\n    pass\n\n\ndef fetch_json(transport, url, retries=3, sleep=None, base_delay=0.1):\n    attempt = 0\n    while True:\n        try:\n            status, body = transport(url)\n        except ConnectionError:\n            status, body = None, \"\"\n        if status is not None and 200 <= status < 300:\n            return json.loads(body)\n        if status is not None and 400 <= status < 500:\n            raise ApiError(f\"{status} สำหรับ {url}\")\n        if attempt >= retries:\n            raise ApiError(f\"ล้มเหลวหลังลอง {attempt + 1} ครั้ง: {url}\")\n        sleep(base_delay * 2 ** attempt)\n        attempt += 1\n\n\nclass ProductParser(HTMLParser):\n    \"\"\"เก็บ (ชื่อ, ข้อความราคา) จากการ์ด <div class=\"product\"> ที่มี <h3> และ <span class=\"price\">\"\"\"\n\n    def __init__(self):\n        super().__init__()\n        self.products = []\n        self.card = None\n        self.field = None\n\n    def handle_starttag(self, tag, attrs):\n        classes = (dict(attrs).get(\"class\") or \"\").split()\n        if tag == \"div\" and \"product\" in classes:\n            self.card = {\"name\": [], \"price\": []}\n        elif self.card is not None and tag == \"h3\":\n            self.field = \"name\"\n        elif self.card is not None and tag == \"span\" and \"price\" in classes:\n            self.field = \"price\"\n\n    def handle_endtag(self, tag):\n        if tag in (\"h3\", \"span\"):\n            self.field = None\n        elif tag == \"div\" and self.card is not None:\n            name = \" \".join(\"\".join(self.card[\"name\"]).split())\n            price = \" \".join(\"\".join(self.card[\"price\"]).split())\n            self.products.append((name, price))\n            self.card = None\n\n    def handle_data(self, data):\n        if self.card is not None and self.field:\n            self.card[self.field].append(data)\n\n\ndef parse_price(text):\n    return float(text.replace(\"฿\", \"\").replace(\",\", \"\").strip())\n\n\ndef watch(html):\n    parser = ProductParser()\n    parser.feed(html)\n    worth = []\n    for name, price_text in parser.products:\n        try:\n            shop = parse_price(price_text)\n        except ValueError:\n            print(f\"{name}: ราคาร้านอ่านไม่ได้\")\n            continue\n        try:\n            ref = fetch_json(transport, \"/reference?\" + urlencode({\"name\": name}), retries=0, sleep=lambda s: None)[\"price\"]\n        except ApiError:\n            print(f\"{name}: ไม่มีราคาอ้างอิง\")\n            continue\n        diff = (ref - shop) / ref * 100\n        label = f\"ถูกกว่า {diff:.1f}%\" if diff >= 0 else f\"แพงกว่า {-diff:.1f}%\"\n        mark = \" ← คุ้ม\" if diff >= 10 else \"\"\n        print(f\"{name}: ร้าน {shop:,.2f} · อ้างอิง {ref:,.2f} · {label}{mark}\")\n        if diff >= 10:\n            worth.append(name)\n    print(f\"คุ้มค่า {len(worth)} รายการ: \" + \", \".join(worth) if worth else \"ไม่มีรายการที่คุ้มค่า\")\n\n\nwith open(\"shop.html\", encoding=\"utf-8\") as f:\n    watch(f.read())\n"] },

};
