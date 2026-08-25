/* เฉลยอ้างอิงของทุกด่านในคอร์สภาษา C (ใช้ทดสอบตัวตรวจและตัวแปล CRUN) */
const H = "#include <stdio.h>\n\n";
module.exports = {
  // หน่วยที่ 1: แนะนำภาษาซี
  "cintro/0": H + 'int main() {\n    printf("Hello World");\n    return 0;\n}',
  "cintro/1": H + 'int main() {\n    printf("สวัสดี");\n    printf("ภาษาซี");\n    return 0;\n}',
  "cintro/2": H + 'int main() {\n    printf("C คือ\\nรากฐานของทุกภาษา");\n    return 0;\n}',
  "cintro/3": H + 'int main() {\n    // บรรทัดนี้ไม่ใช่ภาษา C เลยทำให้พัง\n    printf("โปรแกรมทำงานแล้ว");\n    return 0;\n}',
  "cintro/4": H + 'int main() {\n    /* โน้ตบรรทัดที่หนึ่ง\n    โน้ตบรรทัดที่สอง */\n    printf("คอมไพล์ผ่านแล้ว");\n    return 0;\n}',
  "cintro/5": H + 'int main() {\n    int people3 = 5;\n    int user_name = 10;\n    printf("รวม = %d", people3 + user_name);\n    return 0;\n}',
  "cintro/6": H + 'int main() {\n    int score = 80;\n    printf("คะแนน %d", score);\n    return 0;\n}',
  "cintro/7": H + 'int main() {\n    printf("จบหน่วยที่ 1");\n    return 0;\n}',

  // หน่วยที่ 2: Visual Studio 2022
  "cvs/0": H + 'int main() {\n    printf("Build สำเร็จ!");\n    return 0;\n}',
  "cvs/1": H + 'int main() {\n    int score = 100;\n    printf("คะแนน %d", score);\n    return 0;\n}',
  "cvs/2": H + 'int main() {\n    int x;\n    x = 7;\n    printf("ค่า x = %d", x);\n    return 0;\n}',
  "cvs/3": H + 'int main() {\n    int answer = 42;\n    printf("ผลลัพธ์: %d\\n", answer);\n    printf("กด Enter เพื่อปิดหน้าต่าง...");\n    return 0;\n}',
  "cvs/4": H + 'int main() {\n    float avg = 8.5;\n    printf("ค่าเฉลี่ย %.2f", avg);\n    return 0;\n}',
  "cvs/5": H + 'int main() {\n    int price = 120;\n    int qty = 3;\n    printf("รวมเป็นเงิน %d บาท", price * qty);\n    return 0;\n}',

  // หน่วยที่ 3: แนวคิดในการเขียนโปรแกรม
  "concept/0": H + 'int main() {\n    int x, y, sum;\n    scanf("%d", &x);\n    scanf("%d", &y);\n    sum = x + y;\n    printf("Sum of %d + %d is %d", x, y, sum);\n    return 0;\n}',
  "concept/1": H + 'int main() {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    int sum = x + y;\n    printf("%d", sum);\n    return 0;\n}',
  "concept/2": H + 'int main() {\n    int w1, w2, h;\n    scanf("%d %d %d", &w1, &w2, &h);\n    printf("พื้นที่ = %d", (w1 + w2) * h / 2);\n    return 0;\n}',
  "concept/3": H + 'int main() {\n    int points = 73;\n    if (points >= 80) printf("เกรด A");\n    else if (points >= 70) printf("เกรด B");\n    else if (points >= 60) printf("เกรด C");\n    else if (points >= 50) printf("เกรด D");\n    else printf("เกรด F");\n    return 0;\n}',
  "concept/4": H + 'int main() {\n    int count = 0;\n    int sum = 0;\n    while (count < 10) {\n        count = count + 2;\n        sum = sum + count;\n    }\n    printf("ผลบวกเลขคู่ = %d", sum);\n    return 0;\n}',
  "concept/5": H + 'int main() {\n    int ce, be;\n    scanf("%d", &ce);\n    be = ce + 543;\n    printf("พ.ศ. %d", be);\n    return 0;\n}',
  "concept/6": H + 'int main() {\n    int n;\n    scanf("%d", &n);\n    if (n % 2 == 0) {\n        printf("เลขคู่");\n    } else {\n        printf("เลขคี่");\n    }\n    return 0;\n}',
  "concept/7": H + 'int main() {\n    int sum = 0;\n    for (int i = 1; i <= 50; i++) {\n        sum = sum + i;\n    }\n    printf("ผลรวม = %d", sum);\n    return 0;\n}',

  // หน่วยที่ 4: ตัวแปรกับชนิดข้อมูล
  "ctypes/0": H + 'int main() {\n    int age = 15;\n    printf("อายุ %d ปี", age);\n    return 0;\n}',
  "ctypes/1": H + 'int main() {\n    float price = 19.5;\n    printf("ราคา %.2f บาท", price);\n    return 0;\n}',
  "ctypes/2": H + "int main() {\n    char grade = 'A';\n    printf(\"ได้เกรด %c\", grade);\n    return 0;\n}",
  "ctypes/3": H + 'int main() {\n    int w = 7;\n    int h = 4;\n    printf("กว้าง %d สูง %d พื้นที่ %d", w, h, w * h);\n    return 0;\n}',
  "ctypes/4": H + 'int main() {\n    int a = 7;\n    int b = 2;\n    printf("%d\\n", a / b);\n    printf("%.1f", (float)a / b);\n    return 0;\n}',
  "ctypes/5": H + 'int main() {\n    const float PI = 3.14;\n    printf("เส้นรอบวง = %.2f", 2 * PI * 10);\n    return 0;\n}',
  "ctypes/6": H + "int main() {\n    char c = 'A';\n    printf(\"%c มีรหัส %d\", c, c);\n    return 0;\n}",

  // หน่วยที่ 5: โอเปอเรเตอร์
  "coper/0": H + 'int main() {\n    int a = 17;\n    int b = 5;\n    printf("%d\\n", a + b);\n    printf("%d\\n", a - b);\n    printf("%d\\n", a * b);\n    printf("%d\\n", a / b);\n    return 0;\n}',
  "coper/1": H + 'int main() {\n    printf("เศษ = %d", 17 % 5);\n    return 0;\n}',
  "coper/2": H + 'int main() {\n    int x = 5;\n    x++;\n    printf("%d\\n", x);\n    x--;\n    x--;\n    printf("%d\\n", x);\n    return 0;\n}',
  "coper/3": H + 'int main() {\n    int x = 5;\n    printf("%d\\n", ++x);\n    printf("%d\\n", x++);\n    printf("%d\\n", x);\n    return 0;\n}',
  "coper/4": H + 'int main() {\n    printf("%d\\n", 10 > 7);\n    printf("%d\\n", 5 == 3);\n    printf("%d\\n", 1 && 0);\n    printf("%d\\n", 1 || 0);\n    return 0;\n}',
  "coper/5": H + 'int main() {\n    int gold = 100;\n    gold += 50;\n    gold -= 30;\n    gold *= 2;\n    printf("gold = %d", gold);\n    return 0;\n}',
  "coper/6": H + 'int main() {\n    int score = 45;\n    printf("%s", score >= 50 ? "ผ่าน" : "ตก");\n    return 0;\n}',

  // หน่วยที่ 6: รับและแสดงผลข้อมูล
  "cio/0": H + 'int main() {\n    int x;\n    scanf("%d", &x);\n    printf("คุณพิมพ์ %d", x);\n    return 0;\n}',
  "cio/1": H + 'int main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("รวม = %d", a + b);\n    return 0;\n}',
  "cio/2": H + 'int main() {\n    float price;\n    scanf("%f", &price);\n    printf("จ่าย %.2f บาท", price);\n    return 0;\n}',
  "cio/3": H + 'int main() {\n    char grade;\n    scanf("%c", &grade);\n    printf("ได้เกรด %c", grade);\n    return 0;\n}',
  "cio/4": H + 'int main() {\n    char name[20];\n    scanf("%s", name);\n    printf("สวัสดี %s", name);\n    return 0;\n}',
  "cio/5": H + 'int main() {\n    int w, h;\n    scanf("%d %d", &w, &h);\n    printf("พื้นที่ = %d", w * h);\n    return 0;\n}',
  "cio/6": H + 'int main() {\n    int choice;\n    scanf("%d", &choice);\n    if (choice == 1) {\n        printf("คุณเลือกเริ่มเกม");\n    } else {\n        printf("ออกจากโปรแกรม");\n    }\n    return 0;\n}',
  "cio/7": H + 'int main() {\n    int p = 50;\n    printf("ความคืบหน้า %d%%", p);\n    return 0;\n}',

  // หน่วยที่ 7: คำสั่งควบคุม
  "cctrl/0": H + 'int main() {\n    int score = 75;\n    if (score >= 50) {\n        printf("ผ่าน");\n    } else {\n        printf("ไม่ผ่าน");\n    }\n    return 0;\n}',
  "cctrl/1": H + 'int main() {\n    int score = 75;\n    if (score >= 80) printf("เกรด A");\n    else if (score >= 70) printf("เกรด B");\n    else if (score >= 60) printf("เกรด C");\n    else printf("เกรด F");\n    return 0;\n}',
  "cctrl/2": H + 'int main() {\n    int menu = 2;\n    switch (menu) {\n        case 1: printf("กาแฟ"); break;\n        case 2: printf("ชาเย็น"); break;\n        case 3: printf("โกโก้"); break;\n        default: printf("น้ำเปล่า");\n    }\n    return 0;\n}',
  "cctrl/3": H + 'int main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("รอบที่ %d\\n", i);\n    }\n    return 0;\n}',
  "cctrl/4": H + 'int main() {\n    int n = 3;\n    while (n > 0) {\n        printf("%d\\n", n);\n        n--;\n    }\n    printf("เริ่ม!");\n    return 0;\n}',
  "cctrl/5": H + 'int main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            printf("%d\\n", i);\n        }\n    }\n    return 0;\n}',
  "cctrl/6": H + 'int main() {\n    int hp = 30;\n    if (hp > 0) {\n        printf("สู้ต่อ");\n    } else {\n        printf("แพ้แล้ว");\n    }\n    return 0;\n}',
  "cctrl/7": H + 'int main() {\n    int i = 1;\n    while (i <= 4) {\n        printf("%d\\n", i);\n        i = i + 1;\n    }\n    printf("จบลูป");\n    return 0;\n}',
  "cctrl/8": H + 'int main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("2 x %d = %d\\n", i, 2 * i);\n    }\n    return 0;\n}',
  "cctrl/9": H + 'int main() {\n    int n = 1;\n    do {\n        printf("%d\\n", n);\n        n++;\n    } while (n <= 3);\n    return 0;\n}',

  // หน่วยที่ 8: อาร์เรย์
  "carray/0": H + 'int main() {\n    int items[3] = {10, 20, 30};\n    printf("%d", items[0]);\n    return 0;\n}',
  "carray/1": H + 'int main() {\n    int items[3] = {10, 20, 30};\n    items[1] = 99;\n    printf("%d", items[1]);\n    return 0;\n}',
  "carray/2": H + 'int main() {\n    int a[3] = {5, 10, 15};\n    for (int i = 0; i < 3; i++) {\n        printf("%d\\n", a[i]);\n    }\n    return 0;\n}',
  "carray/3": H + 'int main() {\n    int a[3] = {12, 30, 25};\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        sum += a[i];\n    }\n    printf("รวม = %d", sum);\n    return 0;\n}',
  "carray/4": H + 'int main() {\n    int a[3] = {40, 75, 60};\n    int best = 0;\n    for (int i = 0; i < 3; i++) {\n        if (a[i] > best) {\n            best = a[i];\n        }\n    }\n    printf("มากสุด = %d", best);\n    return 0;\n}',
  "carray/5": H + 'int main() {\n    int s[5] = {45, 80, 60, 30, 95};\n    int count = 0;\n    for (int i = 0; i < 5; i++) {\n        if (s[i] >= 50) {\n            count++;\n        }\n    }\n    printf("ผ่าน %d คน", count);\n    return 0;\n}',
  "carray/6": H + 'int main() {\n    int a[4] = {1, 2, 3, 4};\n    for (int i = 3; i >= 0; i--) {\n        printf("%d\\n", a[i]);\n    }\n    return 0;\n}',

  // หน่วยที่ 9: พอยน์เตอร์
  "cptr/0": H + 'int main() {\n    int x = 42;\n    int *p = &x;\n    printf("%d", *p);\n    return 0;\n}',
  "cptr/1": H + 'int main() {\n    int x = 42;\n    int *p = &x;\n    *p = 99;\n    printf("x = %d", x);\n    return 0;\n}',
  "cptr/2": H + 'int main() {\n    int a[3] = {5, 10, 15};\n    int *p = a;\n    printf("%d", *(p + 1));\n    return 0;\n}',
  "cptr/3": H + 'int main() {\n    int a[3] = {5, 10, 15};\n    int *p = a;\n    for (int i = 0; i < 3; i++) {\n        printf("%d\\n", *(p + i));\n    }\n    return 0;\n}',
  "cptr/4": H + 'int main() {\n    int x = 10, y = 20;\n    int *px = &x;\n    int *py = &y;\n    int t = *px;\n    *px = *py;\n    *py = t;\n    printf("x=%d y=%d", x, y);\n    return 0;\n}',
  "cptr/5": H + 'int main() {\n    int hp = 50;\n    int *p = &hp;\n    *p += 30;\n    printf("hp = %d", hp);\n    return 0;\n}',

  // หน่วยที่ 10: ฟังก์ชัน
  "cfunc/0": H + 'void greet() {\n    printf("สวัสดีจากฟังก์ชัน");\n}\n\nint main() {\n    greet();\n    return 0;\n}',
  "cfunc/1": H + 'int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf("%d", add(3, 4));\n    return 0;\n}',
  "cfunc/2": H + 'float area(float r) {\n    return 3.14 * r * r;\n}\n\nint main() {\n    printf("%.2f", area(2));\n    return 0;\n}',
  "cfunc/3": H + 'void printStars(int n) {\n    for (int i = 0; i < n; i++) {\n        printf("*");\n    }\n    printf("\\n");\n}\n\nint main() {\n    printStars(3);\n    printStars(5);\n    return 0;\n}',
  "cfunc/4": H + 'int sumArr(int a[], int n) {\n    int s = 0;\n    for (int i = 0; i < n; i++) {\n        s += a[i];\n    }\n    return s;\n}\n\nint main() {\n    int b[3] = {12, 30, 25};\n    printf("รวม = %d", sumArr(b, 3));\n    return 0;\n}',
  "cfunc/5": H + 'void swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d y=%d", x, y);\n    return 0;\n}',
  "cfunc/6": H + 'int isEven(int n) {\n    return n % 2 == 0;\n}\n\nint main() {\n    printf("%d\\n", isEven(4));\n    printf("%d\\n", isEven(7));\n    return 0;\n}',
  "cfunc/7": H + 'int add(int a, int b) {\n    return a + b;\n}\n\nint mul(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    printf("บวก = %d\\n", add(7, 5));\n    printf("คูณ = %d", mul(7, 5));\n    return 0;\n}'
};
