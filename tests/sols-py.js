/* เฉลยอ้างอิงของทุกด่านในคอร์ส Python (ใช้ทดสอบตัวตรวจ) */
module.exports = {
  "print/0": 'print("สวัสดี Python")',
  "print/1": 'print("Python")\nprint("สนุก")\nprint("มาก")',
  "print/2": 'print("คะแนน:", 100)',
  "print/3": 'print(2026, "07", "09", sep="-")',
  "print/4": 'name = input()\nprint("สวัสดี", name)',
  "print/5": 'n = input()\nprint(int(n) + 10)',

  "variable/0": 'name = "มะลิ"\nprint("ฉันชื่อ", name)',
  "variable/1": 'hp = 80\npotion = 25\nprint(hp + potion)',
  "variable/2": 'coins = 10\ncoins += 8\ncoins -= 3\nprint(coins)',
  "variable/3": 'age = "12"\nprint(int(age) + 1)',
  "variable/4": 'level = 5\nprint(f"ตอนนี้เลเวล {level}")',
  "variable/5": 'a = 5\nb = 9\na, b = b, a\nprint(a)\nprint(b)',

  "datatype/0": 'print(type(3.14))',
  "datatype/1": 'print(7 / 2)\nprint(7 // 2)',
  "datatype/2": 'print(10 > 7)',
  "datatype/3": 'print(int(3.9))',
  "datatype/4": 'print(str(100) + "แต้ม")',

  "string/0": 'word = "victory"\nprint(word.upper())',
  "string/1": 'spell = "abrakadabra"\nprint(len(spell))',
  "string/2": 's = "python-master"\nprint(s[0:6])',
  "string/3": 'msg = "ฉันเกลียดบั๊ก"\nprint(msg.replace("เกลียด", "รัก"))',
  "string/4": 'data = "มะลิ,15,นักเวท"\nparts = data.split(",")\nprint(parts[2])',
  "string/5": 'song = "นานานา นา"\nprint(song.count("นา"))',

  "list/0": 'items = ["ดาบ", "โล่", "ยา"]\nprint(items[0])',
  "list/1": 'items = ["ดาบ", "โล่", "ยา"]\nitems.append("คบเพลิง")\nprint(len(items))',
  "list/2": 'items = ["ดาบ", "โล่", "ยา"]\nprint(items[-1])',
  "list/3": 'powers = [12, 30, 25]\nprint(sum(powers))',
  "list/4": 'items = ["ดาบ", "โล่", "ยา"]\nitems.remove("โล่")\nprint(len(items))',
  "list/5": 'nums = [30, 5, 12]\nnums.sort()\nprint(nums[0])',

  "tupleset/0": 'point = (10, 20)\nprint(point[0])',
  "tupleset/1": 'nums = (3, 6, 9, 12)\nprint(len(nums))',
  "tupleset/2": 'nums = [1, 2, 2, 3, 3, 3]\nprint(len(set(nums)))',
  "tupleset/3": 's = {1, 2, 3}\ns.add(4)\nprint(len(s))',
  "tupleset/4": 'a = {1, 2, 3}\nb = {2, 3, 4}\nprint(len(a & b))',

  "dict/0": 'player = {"name": "มะลิ", "hp": 100}\nprint(player["hp"])',
  "dict/1": 'player = {"name": "มะลิ", "hp": 100}\nplayer["mp"] = 50\nprint(player["mp"])',
  "dict/2": 'player = {"name": "มะลิ", "hp": 100}\nplayer["hp"] = 75\nprint(player["hp"])',
  "dict/3": 'player = {"name": "มะลิ", "hp": 100}\nprint("hp" in player)',
  "dict/4": 'player = {"name": "มะลิ", "hp": 100}\nprint(len(player))',

  "operator/0": 'print(17 % 5)\nprint(17 // 5)',
  "operator/1": 'print(2 ** 10)',
  "operator/2": 'print(True and False)\nprint(True or False)',
  "operator/3": 'print(3 in [1, 2, 3])',
  "operator/4": 'age = 15\nprint(10 <= age <= 18)',
  "operator/5": 'print(5 & 3)',

  "ifelse/0": 'key = 7\nif key > 5:\n    print("ประตูเปิด")\nelse:\n    print("ประตูล็อก")',
  "ifelse/1": 'score = 75\nif score >= 80:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("F")',
  "ifelse/2": 'hp = 50\nhas_key = True\nif hp > 0 and has_key:\n    print("ไปต่อ")\nelse:\n    print("ติดอยู่")',
  "ifelse/3": 'n = 7\nif n % 2 == 0:\n    print("คู่")\nelse:\n    print("คี่")',
  "ifelse/4": 'hp = 70\nlv = 12\nif hp > 50:\n    if lv > 10:\n        print("สู้บอส")\n    else:\n        print("ฝึกต่อ")',

  "loop/0": 'for i in range(1, 6):\n    print("เก็บเหรียญที่", i)',
  "loop/1": 'total = 0\nfor i in range(1, 11):\n    total += i\nprint(total)',
  "loop/2": 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("ทะยาน!")',
  "loop/3": 'for i in range(1, 11):\n    if i % 2 == 0:\n        print(i)',
  "loop/4": 'for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)',
  "loop/5": 'for i in range(3):\n    print("*" * 3)',

  "flowchart/0": 'x = 10\nif x > 5:\n    print("มากกว่า")\nelse:\n    print("น้อยกว่า")',
  "flowchart/1": 'i = 1\nwhile i <= 3:\n    print("รอบที่", i)\n    i += 1\nprint("จบ")',
  "flowchart/2": 'total = 0\nfor i in range(1, 5):\n    total += i * 2\nprint(total)',
  "flowchart/3": 'scores = [40, 75, 60]\nbest = 0\nfor s in scores:\n    if s > best:\n        best = s\nprint(best)',

  "function/0": 'def greet():\n    print("สวัสดีนักผจญภัย")\n\ngreet()',
  "function/1": 'def double(x):\n    return x * 2\n\nprint(double(21))',
  "function/2": 'def attack(name, dmg):\n    print(name, "โจมตี", dmg)\n\nattack("อัศวิน", 30)',
  "function/3": 'def heal(amount=10):\n    return amount\n\nprint(heal())\nprint(heal(50))',
  "function/4": 'square = lambda x: x * x\nprint(square(6))',
  "function/5": 'import math\nprint(math.sqrt(144))',

  "exception/0": 'try:\n    x = 10 / 0\nexcept:\n    print("error")',
  "exception/1": 'try:\n    n = int("abc")\nexcept:\n    print("ไม่ใช่ตัวเลข")',
  "exception/2": 'try:\n    n = int("5")\nexcept:\n    print("error")\nfinally:\n    print("จบการทำงาน")',

  "oop/0": 'class Hero:\n    def __init__(self, name):\n        self.name = name\n\nh = Hero("มะลิ")\nprint(h.name)',
  "oop/1": 'class Hero:\n    def attack(self):\n        print("โจมตี!")\n\nh = Hero()\nh.attack()',
  "oop/2": 'class Hero:\n    def __init__(self, hp):\n        self.hp = hp\n\nh = Hero(100)\nprint(h.hp)',
  "oop/3": 'class Animal:\n    def sound(self):\n        print("...")\n\nclass Cat(Animal):\n    def sound(self):\n        print("เหมียว")\n\nCat().sound()'
};
