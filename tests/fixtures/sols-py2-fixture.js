/* เฉลยและคำตอบผิดของหลักสูตรตัวอย่าง Python v2 — คำตอบผิดต้องไม่ผ่านอย่างน้อยหนึ่งกรณีเสมอ */
const R = String.raw;
module.exports = {
  "py2-fx-basics/0": {
    sol: R`a = int(input())
b = int(input())
print(f"ผลรวม: {a + b}")
`,
    wrong: [R`a = input()
b = input()
print(f"ผลรวม: {a + b}")
`],
  },
  "py2-fx-basics/1": {
    sol: R`def average(scores):
    if not scores:
        raise ValueError("ต้องมีคะแนนอย่างน้อยหนึ่งค่า")
    return sum(scores) / len(scores)
`,
    wrong: [R`def average(scores):
    return sum(scores) / len(scores)
`, R`def average(scores):
    if not scores:
        return 0
    return sum(scores) // len(scores)
`],
  },
  "py2-fx-advanced/0": {
    sol: R`from shop import with_vat
print(with_vat(float(input())))
# === shop/__init__.py ===
from .tax import with_vat
# === shop/tax.py ===
VAT = 0.07

def with_vat(price):
    return round(price * (1 + VAT), 2)
`,
    wrong: [R`from shop import with_vat
print(with_vat(float(input())))
# === shop/__init__.py ===
from .tax import with_vat
# === shop/tax.py ===
def with_vat(price):
    return price * 1.7
`],
  },
  "py2-fx-advanced/1": {
    sol: R`from pathlib import Path

passed = 0
for line in Path("scores.csv").read_text(encoding="utf-8").splitlines():
    name, score = line.split(",")
    if int(score) >= 50:
        passed += 1
print(f"ผ่าน: {passed}")
`,
    wrong: [R`from pathlib import Path

passed = 0
for line in Path("scores.csv").read_text(encoding="utf-8").splitlines():
    name, score = line.split(",")
    if int(score) > 50:
        passed += 1
print(f"ผ่าน: {passed}")
`],
  },
  "py2-fx-advanced/2": {
    sol: R`import asyncio


async def double(i):
    await asyncio.sleep(0.01)
    return i * 2


async def main():
    n = int(input())
    results = await asyncio.gather(*(double(i) for i in range(n)))
    print(results)


if __name__ == "__main__":
    asyncio.run(main())
`,
    wrong: [R`import asyncio


async def double(i):
    await asyncio.sleep(0.01)
    return i * 2


async def main():
    n = int(input())
    results = [double(i) for i in range(n)]
    print(results)


asyncio.run(main())
`],
  },
  "py2-fx-advanced/3": {
    sol: R`n = int(input())
xs = list(map(int, input().split()))
print(f"ไม่ซ้ำ: {len(set(xs))}")
`,
    wrong: [R`n = int(input())
xs = list(map(int, input().split()))
seen = []
for x in xs:
    if x not in seen:
        seen.append(x)
print(f"ไม่ซ้ำ: {len(seen)}")
`],
  },
};
