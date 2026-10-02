/**
 * sols-c2.js — เฉลยและคำตอบผิดของหลักสูตร C v2 (ใช้ตรวจคุณภาพเท่านั้น ไม่ส่งให้เบราว์เซอร์)
 * key = "<topicId>/<index ของด่าน>" · sol ต้องผ่านทุกกรณี · wrong ต้องไม่ผ่าน
 */
const R = String.raw;
const M = body => "#include <stdio.h>\n\nint main(void) {\n" + body + "\n    return 0;\n}\n";
const MI = (inc, body) => inc + "\n\nint main(void) {\n" + body + "\n    return 0;\n}\n";
const RECEIPT = (discExpr, vatExpr) => M(R`    long long price = 0, qty = 0, percent = 0;
    scanf("%lld %lld %lld", &price, &qty, &percent);
    long long total = price * qty;
    long long discount = ` + discExpr + R`;
    long long after = total - discount;
    long long vat = ` + vatExpr + R`;
    long long net = after + vat;
    printf("รวม: %lld.%02lld บาท\n", total / 100, total % 100);
    printf("ส่วนลด: %lld.%02lld บาท\n", discount / 100, discount % 100);
    printf("หลังลด: %lld.%02lld บาท\n", after / 100, after % 100);
    printf("VAT 7%%: %lld.%02lld บาท\n", vat / 100, vat % 100);
    printf("สุทธิ: %lld.%02lld บาท\n", net / 100, net % 100);`);
module.exports = {
  // ── Stage 1 ──
  "c2-welcome/0": { sol: M(R`    printf("สวัสดีภาษา C\n");`), wrong: [M(R`    printf("สวัสดีภาษา C++\n");`)] },
  "c2-welcome/1": { sol: M(R`    puts("เริ่ม");
    printf("กลาง\n");
    puts("จบ");`), wrong: [M(R`    printf("เริ่ม");
    printf("กลาง\n");
    puts("จบ");`)] },
  "c2-welcome/2": { sol: "#include <stdio.h>\n\nint main(void) {\n    printf(\"พร้อมเรียนรู้\\n\");\n    return 0;\n}\n", wrong: ["#include <stdlib.h>\n\nint main(void) {\n    printf(\"พร้อมเรียนรู้\\n\");\n    return 0;\n}\n"] },
  "c2-welcome/3": { sol: M(R`    printf("C แยกตัวพิมพ์เล็กใหญ่\n");`), wrong: [M(R`    printf("C แยกตัวพิมพ์เล็กใหญ่\n")`)] },
  "c2-welcome/4": { sol: M(R`    puts("เริ่มภารกิจ");
    /*
    puts("DEBUG: x = 1");
    puts("DEBUG: y = 2");
    */
    puts("ภารกิจสำเร็จ");`), wrong: [M(R`    puts("เริ่มภารกิจ");
    puts("ภารกิจสำเร็จ");`)] },
  // ── Stage 2 ──
  "c2-io/0": { sol: M(R`    int age;
    scanf("%d", &age);
    printf("อายุ %d ปี\n", age);`), wrong: [M(R`    printf("อายุ 15 ปี\n");`)] },
  "c2-io/1": { sol: M(R`    int qty;
    double price;
    scanf("%d %lf", &qty, &price);
    printf("|%-8s|%4d|%.2f|\n", "Pen", qty, price);`), wrong: [M(R`    int qty;
    double price;
    scanf("%d %lf", &qty, &price);
    printf("|%8s|%4d|%.2f|\n", "Pen", qty, price);`)] },
  "c2-io/2": { sol: M(R`    int a = 0, b = 0;
    int got = scanf("%d %d", &a, &b);
    printf("อ่านได้ %d ค่า\n", got);`), wrong: [M(R`    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("อ่านได้ %d ค่า\n", 2);`)] },
  "c2-io/3": { sol: M(R`    int score = 0;
    scanf("%d", &score);
    printf("คะแนนใหม่: %d\n", score + 5);`), wrong: [M(R`    int score = 0;
    scanf("%d", &score);
    printf("คะแนนใหม่: %d\n", score);`)] },
  "c2-io/4": { sol: M(R`    int c = getchar();
    putchar(c);
    putchar(c);
    putchar(c);
    putchar('\n');
    printf("รหัส: %d\n", c);`), wrong: [M(R`    int c = getchar();
    putchar(c);
    putchar(c);
    putchar('\n');
    printf("รหัส: %d\n", c);`)] },
  "c2-io/5": { sol: M(R`    double km;
    scanf("%lf", &km);
    printf("%.2f กม. = %.2f ไมล์\n", km, km * 0.621371);
    printf("%.2f กม. = %.0f เมตร\n", km, km * 1000);`), wrong: [M(R`    double km;
    scanf("%lf", &km);
    printf("%.2f กม. = %.2f ไมล์\n", km, km * 0.62);
    printf("%.2f กม. = %.0f เมตร\n", km, km * 1000);`)] },
  // ── Stage 3 ──
  "c2-types/0": { sol: M(R`    printf("char: %zu\n", sizeof(char));
    printf("short: %zu\n", sizeof(short));
    printf("int: %zu\n", sizeof(int));
    printf("long long: %zu\n", sizeof(long long));
    printf("double: %zu\n", sizeof(double));`), wrong: [M(R`    printf("char: 1\nshort: 2\nint: 4\nlong long: 8\ndouble: 8\n");`)] },
  "c2-types/1": { sol: MI("#include <stdio.h>\n#include <limits.h>", R`    printf("INT_MAX = %d\n", INT_MAX);
    printf("INT_MIN = %d\n", INT_MIN);
    printf("UINT_MAX = %u\n", UINT_MAX);
    printf("CHAR_BIT = %d\n", CHAR_BIT);`), wrong: [MI("#include <stdio.h>\n#include <limits.h>", R`    printf("INT_MAX = %d\n", INT_MAX);
    printf("INT_MIN = %d\n", INT_MIN);
    printf("UINT_MAX = %d\n", UINT_MAX);
    printf("CHAR_BIT = %d\n", CHAR_BIT);`)] },
  "c2-types/2": { sol: MI("#include <stdio.h>\n#include <stdint.h>", R`    unsigned v = 0, k = 0;
    scanf("%u %u", &v, &k);
    uint8_t stored = v + k;
    printf("ผลจริง: %u\n", v + k);
    printf("เก็บใน uint8_t: %d\n", stored);`), wrong: [MI("#include <stdio.h>\n#include <stdint.h>", R`    unsigned v = 0, k = 0;
    scanf("%u %u", &v, &k);
    unsigned stored = v + k;
    printf("ผลจริง: %u\n", v + k);
    printf("เก็บใน uint8_t: %u\n", stored);`)] },
  "c2-types/3": { sol: M(R`    long long years = 0;
    scanf("%lld", &years);
    long long seconds = years * 365 * 24 * 60 * 60;
    printf("วินาที: %lld\n", seconds);`), wrong: [M(R`    int years = 0;
    scanf("%d", &years);
    int seconds = years * 365 * 24 * 60 * 60;
    printf("วินาที: %d\n", seconds);`)] },
  "c2-types/4": { sol: M(R`    char ch = 0;
    scanf(" %c", &ch);
    char next = ch + 1;
    printf("รหัส: %d\n", ch);
    printf("ตัวถัดไป: %c\n", next);`), wrong: [M(R`    char ch = 0;
    scanf(" %c", &ch);
    printf("รหัส: %c\n", ch);
    printf("ตัวถัดไป: %c\n", ch + 1);`)] },
  "c2-types/5": { sol: MI("#include <stdio.h>\n#include <stdint.h>\n#include <inttypes.h>", R`    int64_t years = 0;
    scanf("%" SCNd64, &years);
    int64_t ms = years * 365 * 24 * 60 * 60 * 1000;
    printf("มิลลิวินาที: %" PRId64 "\n", ms);`), wrong: [MI("#include <stdio.h>\n#include <stdint.h>\n#include <inttypes.h>", R`    int64_t years = 0;
    scanf("%" SCNd64, &years);
    int64_t ms = years * (365 * 24 * 60 * 60 * 1000);
    printf("มิลลิวินาที: %" PRId64 "\n", ms);`)] },
  // ── Stage 4 ──
  "c2-ops/0": { sol: M(R`    int eggs = 0;
    scanf("%d", &eggs);
    printf("กล่องเต็ม: %d\n", eggs / 12);
    printf("เหลือ: %d ฟอง\n", eggs % 12);
    printf("ต้องใช้: %d กล่อง\n", (eggs + 11) / 12);`), wrong: [M(R`    int eggs = 0;
    scanf("%d", &eggs);
    printf("กล่องเต็ม: %d\n", eggs / 12);
    printf("เหลือ: %d ฟอง\n", eggs % 12);
    printf("ต้องใช้: %d กล่อง\n", eggs / 12 + 1);`)] },
  "c2-ops/1": { sol: M(R`    int sum = 0, count = 1;
    scanf("%d %d", &sum, &count);
    double avg = (double)sum / count;
    printf("เฉลี่ย: %.2f\n", avg);`), wrong: [M(R`    int sum = 0, count = 1;
    scanf("%d %d", &sum, &count);
    double avg = (double)(sum / count);
    printf("เฉลี่ย: %.2f\n", avg);`)] },
  "c2-ops/2": { sol: M(R`    int grams = 0;
    scanf("%d", &grams);
    int blocks = (grams + 499) / 500;
    int cost = 30 + blocks * 15;
    printf("ค่าส่ง: %d บาท\n", cost);`), wrong: [M(R`    int grams = 0;
    scanf("%d", &grams);
    int blocks = grams / 500 + 1;
    int cost = 30 + blocks * 15;
    printf("ค่าส่ง: %d บาท\n", cost);`)] },
  "c2-ops/3": { sol: M(R`    int balance = 0;
    unsigned limit = 100;
    scanf("%d", &balance);
    printf("ต่ำกว่าเกณฑ์: %d\n", balance < (int)limit);`), wrong: [M(R`    int balance = 0;
    unsigned limit = 100;
    scanf("%d", &balance);
    printf("ต่ำกว่าเกณฑ์: %d\n", (unsigned)balance < limit);`)] },
  "c2-ops/4": { sol: MI("#include <stdio.h>\n#include <stdint.h>", R`    unsigned ra = 0, rb = 0;
    scanf("%u %u", &ra, &rb);
    uint8_t a = ra, b = rb;
    uint8_t sum8 = a + b;
    printf("เฉลี่ย: %d\n", (a + b) / 2);
    printf("ผลรวมใน uint8_t: %d\n", sum8);`), wrong: [MI("#include <stdio.h>\n#include <stdint.h>", R`    unsigned ra = 0, rb = 0;
    scanf("%u %u", &ra, &rb);
    uint8_t a = ra, b = rb;
    uint8_t sum8 = a + b;
    printf("เฉลี่ย: %d\n", sum8 / 2);
    printf("ผลรวมใน uint8_t: %d\n", sum8);`)] },
  "c2-ops/5": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    printf("วันหมายเลข: %d\n", ((n % 7) + 7) % 7);`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    printf("วันหมายเลข: %d\n", (n + 7) % 7);`)] },
  "c2-ops/6": { sol: RECEIPT("total * percent / 100", "after * 7 / 100"), wrong: [RECEIPT("(long long)(total * (percent / 100.0) + 0.5)", "after * 7 / 100"), RECEIPT("total * percent / 100", "(long long)(after * 0.07 + 0.5)")] },
  // ── Stage 5: การตัดสินใจ ──
  "c2-decide/0": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    if (n % 2 == 0) {
        printf("%d เป็นเลขคู่\n", n);
    } else {
        printf("%d เป็นเลขคี่\n", n);
    }`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    if (n % 2 == 1) {
        printf("%d เป็นเลขคี่\n", n);
    } else {
        printf("%d เป็นเลขคู่\n", n);
    }`)] },
  "c2-decide/1": { sol: M(R`    int temp = 0;
    scanf("%d", &temp);
    if (temp <= 0) {
        puts("สถานะ: น้ำแข็ง");
    } else if (temp < 100) {
        puts("สถานะ: น้ำ");
    } else {
        puts("สถานะ: ไอน้ำ");
    }`), wrong: [M(R`    int temp = 0;
    scanf("%d", &temp);
    if (temp < 0) {
        puts("สถานะ: น้ำแข็ง");
    } else if (temp <= 100) {
        puts("สถานะ: น้ำ");
    } else {
        puts("สถานะ: ไอน้ำ");
    }`)] },
  "c2-decide/2": { sol: M(R`    int stock = 0;
    scanf("%d", &stock);
    if (stock == 0) {
        puts("สินค้าหมด");
    } else {
        printf("เหลือ %d ชิ้น\n", stock);
    }`), wrong: [M(R`    int stock = 0;
    scanf("%d", &stock);
    if (stock != 0) {
        puts("สินค้าหมด");
    } else {
        printf("เหลือ %d ชิ้น\n", stock);
    }`)] },
  "c2-decide/3": { sol: M(R`    int age = 0, student = 0, price = 0, fare = 0;
    scanf("%d %d %d", &age, &student, &price);
    if (age < 12 || age >= 60) {
        fare = price * 50 / 100;
    } else if (student) {
        fare = price * 80 / 100;
    } else {
        fare = price;
    }
    printf("ค่าโดยสาร: %d บาท\n", fare);`), wrong: [M(R`    int age = 0, student = 0, price = 0, fare = 0;
    scanf("%d %d %d", &age, &student, &price);
    if (age < 12 && age >= 60) {
        fare = price * 50 / 100;
    } else if (student) {
        fare = price * 80 / 100;
    } else {
        fare = price;
    }
    printf("ค่าโดยสาร: %d บาท\n", fare);`)] },
  "c2-decide/4": { sol: M(R`    int code = 0;
    scanf("%d", &code);
    switch (code) {
        case 1: puts("กาแฟ 45 บาท"); break;
        case 2: puts("ชาเย็น 40 บาท"); break;
        case 3: puts("โกโก้ 50 บาท"); break;
        case 4: puts("น้ำเปล่า 10 บาท"); break;
        default: puts("ไม่มีรายการนี้");
    }`), wrong: [M(R`    int code = 0;
    scanf("%d", &code);
    switch (code) {
        case 1: puts("กาแฟ 45 บาท"); break;
        case 2: puts("ชาเย็น 40 บาท"); break;
        case 3: puts("โกโก้ 50 บาท"); break;
        default: puts("น้ำเปล่า 10 บาท");
    }`)] },
  "c2-decide/5": { sol: M(R`    char size = 0;
    int extra = 0, valid = 1;
    scanf(" %c", &size);
    switch (size) {
        case 'S': extra = 0; break;
        case 'M': extra = 10; break;
        case 'L': extra = 20; break;
        default: valid = 0;
    }
    if (valid) {
        printf("ราคารวม: %d บาท\n", 40 + extra);
    } else {
        puts("ไม่มีขนาดนี้");
    }`), wrong: [M(R`    char size = 0;
    int extra = 0;
    scanf(" %c", &size);
    switch (size) {
        case 'S': extra = 0; break;
        case 'M': extra = 10; break;
        case 'L': extra = 20; break;
    }
    printf("ราคารวม: %d บาท\n", 40 + extra);`)] },
  "c2-decide/6": { sol: M(R`    int score = 0;
    if (scanf("%d", &score) != 1 || score < 0 || score > 100) {
        puts("คะแนนไม่ถูกต้อง");
        return 0;
    }
    if (score >= 80) {
        puts("เกรด: A (4.0)");
    } else if (score >= 75) {
        puts("เกรด: B+ (3.5)");
    } else if (score >= 70) {
        puts("เกรด: B (3.0)");
    } else if (score >= 65) {
        puts("เกรด: C+ (2.5)");
    } else if (score >= 60) {
        puts("เกรด: C (2.0)");
    } else if (score >= 55) {
        puts("เกรด: D+ (1.5)");
    } else if (score >= 50) {
        puts("เกรด: D (1.0)");
    } else {
        puts("เกรด: F (0.0)");
    }`), wrong: [M(R`    int score = 0;
    scanf("%d", &score);
    if (score > 80) {
        puts("เกรด: A (4.0)");
    } else if (score > 75) {
        puts("เกรด: B+ (3.5)");
    } else if (score > 70) {
        puts("เกรด: B (3.0)");
    } else if (score > 65) {
        puts("เกรด: C+ (2.5)");
    } else if (score > 60) {
        puts("เกรด: C (2.0)");
    } else if (score > 55) {
        puts("เกรด: D+ (1.5)");
    } else if (score > 50) {
        puts("เกรด: D (1.0)");
    } else {
        puts("เกรด: F (0.0)");
    }`)] },
  // ── Stage 6: ลูปและการควบคุม ──
  "c2-loops/0": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    long long sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("ผลรวม: %lld\n", sum);`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("ผลรวม: %d\n", sum);`)] },
  "c2-loops/1": { sol: M(R`    int x = 0, count = 0, best = 0;
    while (scanf("%d", &x) == 1 && x != -1) {
        if (count == 0 || x > best) {
            best = x;
        }
        count++;
    }
    if (count == 0) {
        puts("ไม่มีข้อมูล");
    } else {
        printf("จำนวน: %d มากที่สุด: %d\n", count, best);
    }`), wrong: [M(R`    int x = 0, count = 0, best = 0;
    while (scanf("%d", &x) == 1 && x != -1) {
        if (x > best) {
            best = x;
        }
        count++;
    }
    if (count == 0) {
        puts("ไม่มีข้อมูล");
    } else {
        printf("จำนวน: %d มากที่สุด: %d\n", count, best);
    }`)] },
  "c2-loops/2": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    for (int i = 1; i <= 12; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i <= 12; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }`)] },
  "c2-loops/3": { sol: M(R`    int v = 0, tries = 0, ok = 1;
    do {
        if (scanf("%d", &v) != 1) {
            ok = 0;
            break;
        }
        tries++;
    } while (v < 1 || v > 5);
    if (ok) {
        printf("เลือก: %d (พยายาม %d ครั้ง)\n", v, tries);
    } else {
        puts("ไม่ได้รับตัวเลือก");
    }`), wrong: [M(R`    int v = 0, tries = 0, ok = 1;
    do {
        if (scanf("%d", &v) != 1) {
            ok = 0;
            break;
        }
        tries++;
    } while (v < 1 || v >= 5);
    if (ok) {
        printf("เลือก: %d (พยายาม %d ครั้ง)\n", v, tries);
    } else {
        puts("ไม่ได้รับตัวเลือก");
    }`)] },
  "c2-loops/4": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    long long m = n;
    if (m < 0) {
        m = -m;
    }
    int digits = 0, sum = 0;
    do {
        sum += (int)(m % 10);
        m /= 10;
        digits++;
    } while (m > 0);
    printf("จำนวนหลัก: %d ผลรวมหลัก: %d\n", digits, sum);`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    if (n < 0) {
        n = -n;
    }
    int digits = 0, sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
        digits++;
    }
    printf("จำนวนหลัก: %d ผลรวมหลัก: %d\n", digits, sum);`)] },
  "c2-loops/5": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            putchar('*');
        }
        putchar('\n');
    }`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n; j++) {
            putchar('*');
        }
        putchar('\n');
    }`)] },
  "c2-loops/6": { sol: M(R`    unsigned n = 0;
    scanf("%u", &n);
    for (int i = (int)n; i >= 0; i--) {
        printf("%d ", i);
    }
    puts("ปล่อยจรวด!");`), wrong: [M(R`    unsigned n = 0;
    scanf("%u", &n);
    for (int i = (int)n; i > 0; i--) {
        printf("%d ", i);
    }
    puts("ปล่อยจรวด!");`)] },
  "c2-loops/7": { sol: M(R`    int secret = 0, g = 0, tries = 0, state = 0;
    scanf("%d", &secret);
    for (tries = 1; tries <= 7; tries++) {
        if (scanf("%d", &g) != 1) {
            state = 2;
            break;
        }
        if (g == secret) {
            state = 1;
            break;
        }
        puts(g > secret ? "มากไป" : "น้อยไป");
    }
    if (state == 1) {
        printf("ถูกต้อง! ใช้ %d ครั้ง\n", tries);
    } else if (state == 2) {
        puts("ยังทายไม่ถูก");
    } else {
        printf("หมดโอกาส เลขลับคือ %d\n", secret);
    }`), wrong: [M(R`    int secret = 0, g = 0, tries = 0, found = 0;
    scanf("%d", &secret);
    while (scanf("%d", &g) == 1) {
        tries++;
        if (g == secret) {
            found = 1;
            break;
        }
        puts(g > secret ? "มากไป" : "น้อยไป");
    }
    if (found) {
        printf("ถูกต้อง! ใช้ %d ครั้ง\n", tries);
    } else {
        puts("ยังทายไม่ถูก");
    }`)] },
  "c2-loops/8": { sol: M(R`    char op = 0;
    long long a = 0, b = 0;
    int done = 0, running = 1;
    while (running && scanf(" %c", &op) == 1) {
        if (op == 'q') {
            break;
        }
        if (scanf("%lld %lld", &a, &b) != 2) {
            puts("ข้อมูลไม่ถูกต้อง");
            break;
        }
        switch (op) {
            case '+': printf("= %lld\n", a + b); done++; break;
            case '-': printf("= %lld\n", a - b); done++; break;
            case '*': printf("= %lld\n", a * b); done++; break;
            case '/':
            case '%':
                if (b == 0) {
                    puts("หารด้วยศูนย์ไม่ได้");
                } else {
                    printf("= %lld\n", op == '/' ? a / b : a % b);
                    done++;
                }
                break;
            default: printf("ไม่รู้จักเครื่องหมาย %c\n", op);
        }
    }
    printf("คำนวณสำเร็จ %d ครั้ง\n", done);`), wrong: [M(R`    char op = 0;
    long long a = 0, b = 0;
    int done = 0;
    while (scanf(" %c", &op) == 1) {
        if (op == 'q') {
            break;
        }
        if (scanf("%lld %lld", &a, &b) != 2) {
            puts("ข้อมูลไม่ถูกต้อง");
            break;
        }
        switch (op) {
            case '+': printf("= %lld\n", a + b); done++; break;
            case '-': printf("= %lld\n", a - b); done++; break;
            case '*': printf("= %lld\n", a * b); done++; break;
            case '/': printf("= %lld\n", b == 0 ? 0 : a / b); done++; break;
            case '%': printf("= %lld\n", b == 0 ? 0 : a % b); done++; break;
            default: printf("ไม่รู้จักเครื่องหมาย %c\n", op);
        }
    }
    printf("คำนวณสำเร็จ %d ครั้ง\n", done);`)] },
  // ── Stage 7: ฟังก์ชัน ──
  "c2-func/0": { sol: R`#include <stdio.h>

int max3(int a, int b, int c) {
    int m = a;
    if (b > m) {
        m = b;
    }
    if (c > m) {
        m = c;
    }
    return m;
}

int main(void) {
    int a = 0, b = 0, c = 0;
    scanf("%d %d %d", &a, &b, &c);
    printf("มากที่สุด: %d\n", max3(a, b, c));
    return 0;
}
`, wrong: [R`#include <stdio.h>

int max3(int a, int b, int c) {
    int m = 0;
    if (a > m) {
        m = a;
    }
    if (b > m) {
        m = b;
    }
    if (c > m) {
        m = c;
    }
    return m;
}

int main(void) {
    int a = 0, b = 0, c = 0;
    scanf("%d %d %d", &a, &b, &c);
    printf("มากที่สุด: %d\n", max3(a, b, c));
    return 0;
}
`] },
  "c2-func/1": { sol: R`#include <stdio.h>

double celsiusToF(double c);

int main(void) {
    double c = 0;
    scanf("%lf", &c);
    printf("%.1f°F\n", celsiusToF(c));
    return 0;
}

double celsiusToF(double c) {
    return c * 9.0 / 5.0 + 32.0;
}
`, wrong: [R`#include <stdio.h>

int celsiusToF(int c);

int main(void) {
    double c = 0;
    scanf("%lf", &c);
    printf("%.1f°F\n", (double)celsiusToF((int)c));
    return 0;
}

int celsiusToF(int c) {
    return c * 9 / 5 + 32;
}
`] },
  "c2-func/2": { sol: R`#include <stdio.h>

int applyBonus(int score) {
    score = score + 10;
    if (score > 100) {
        score = 100;
    }
    return score;
}

int main(void) {
    int s = 0;
    scanf("%d", &s);
    s = applyBonus(s);
    printf("คะแนน: %d\n", s);
    return 0;
}
`, wrong: [R`#include <stdio.h>

int applyBonus(int score) {
    score = score + 10;
    if (score > 100) {
        score = 100;
    }
    return score;
}

int main(void) {
    int s = 0;
    scanf("%d", &s);
    applyBonus(s);
    printf("คะแนน: %d\n", s + 10);
    return 0;
}
`] },
  "c2-func/3": { sol: R`#include <stdio.h>

int isPrime(int n) {
    if (n < 2) {
        return 0;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int count = 0;
    for (int i = 2; i <= n; i++) {
        if (isPrime(i)) {
            count++;
        }
    }
    printf("จำนวนเฉพาะที่ไม่เกิน %d: %d ตัว\n", n, count);
    printf("%d เป็นจำนวนเฉพาะ: %d\n", n, isPrime(n));
    return 0;
}
`, wrong: [R`#include <stdio.h>

int isPrime(int n) {
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int count = 0;
    for (int i = 2; i <= n; i++) {
        if (isPrime(i)) {
            count++;
        }
    }
    printf("จำนวนเฉพาะที่ไม่เกิน %d: %d ตัว\n", n, count);
    printf("%d เป็นจำนวนเฉพาะ: %d\n", n, isPrime(n));
    return 0;
}
`] },
  "c2-func/4": { sol: R`#include <stdio.h>

int rectArea(int w, int h) {
    if (w > 0 && h > 0) {
        return w * h;
    }
    return 0;
}

int main(void) {
    int w1, h1, w2, h2, w3, h3;
    scanf("%d %d %d %d %d %d", &w1, &h1, &w2, &h2, &w3, &h3);
    int a1 = rectArea(w1, h1);
    int a2 = rectArea(w2, h2);
    int a3 = rectArea(w3, h3);
    printf("รูปที่ 1: %d\nรูปที่ 2: %d\nรูปที่ 3: %d\nรวม: %d\n", a1, a2, a3, a1 + a2 + a3);
    return 0;
}
`, wrong: [R`#include <stdio.h>

int rectArea(int w, int h) {
    return w * h;
}

int main(void) {
    int w1, h1, w2, h2, w3, h3;
    scanf("%d %d %d %d %d %d", &w1, &h1, &w2, &h2, &w3, &h3);
    int a1 = rectArea(w1, h1);
    int a2 = rectArea(w2, h2);
    int a3 = rectArea(w3, h3);
    printf("รูปที่ 1: %d\nรูปที่ 2: %d\nรูปที่ 3: %d\nรวม: %d\n", a1, a2, a3, a1 + a2 + a3);
    return 0;
}
`] },
  "c2-func/5": { sol: R`#include <stdio.h>
#include <math.h>

double distance(double x1, double y1, double x2, double y2) {
    double dx = x2 - x1, dy = y2 - y1;
    return sqrt(dx * dx + dy * dy);
}

int main(void) {
    double x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    scanf("%lf %lf %lf %lf", &x1, &y1, &x2, &y2);
    printf("ระยะทาง: %.3f\n", distance(x1, y1, x2, y2));
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <math.h>

double distance(double x1, double y1, double x2, double y2) {
    return sqrt(fabs(x2 - x1) + fabs(y2 - y1));
}

int main(void) {
    double x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    scanf("%lf %lf %lf %lf", &x1, &y1, &x2, &y2);
    printf("ระยะทาง: %.3f\n", distance(x1, y1, x2, y2));
    return 0;
}
`] },
  // ── Stage 8: ขอบเขต อายุ และ recursion ──
  "c2-scope/0": { sol: R`#include <stdio.h>

int nextTicket(void) {
    static int counter = 0;
    counter++;
    return counter;
}

int main(void) {
    int k = 0;
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        printf("บัตรคิวที่ %d\n", nextTicket());
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

int nextTicket(void) {
    int counter = 0;
    static int unused = 0;
    (void)unused;
    counter++;
    return counter;
}

int main(void) {
    int k = 0;
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        printf("บัตรคิวที่ %d\n", nextTicket());
    }
    return 0;
}
`] },
  "c2-scope/1": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        int x = 0;
        scanf("%d", &x);
        total += x;
    }
    printf("รวม: %d\n", total);`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        int x = 0;
        scanf("%d", &x);
        total = x;
    }
    printf("รวม: %d\n", total);`)] },
  "c2-scope/2": { sol: R`#include <stdio.h>

long long power(long long base, int exp) {
    if (exp == 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}

int main(void) {
    long long base = 0;
    int exp = 0;
    scanf("%lld %d", &base, &exp);
    printf("ผล: %lld\n", power(base, exp));
    return 0;
}
`, wrong: [R`#include <stdio.h>

long long power(long long base, int exp) {
    if (exp == 1) {
        return base;
    }
    return base * power(base, exp - 1);
}

int main(void) {
    long long base = 0;
    int exp = 0;
    scanf("%lld %d", &base, &exp);
    printf("ผล: %lld\n", exp == 0 ? 0 : power(base, exp));
    return 0;
}
`] },
  "c2-scope/3": { sol: R`#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

int main(void) {
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("ห.ร.ม.: %d\n", gcd(a, b));
    return 0;
}
`, wrong: [R`#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return b;
    }
    return gcd(b, a % b);
}

int main(void) {
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("ห.ร.ม.: %d\n", gcd(a, b));
    return 0;
}
`] },
  "c2-scope/4": { sol: R`#include <stdio.h>

int countDigits(long long n) {
    if (n > -10 && n < 10) {
        return 1;
    }
    return 1 + countDigits(n / 10);
}

int main(void) {
    long long n = 0;
    scanf("%lld", &n);
    printf("จำนวนหลัก: %d\n", countDigits(n));
    return 0;
}
`, wrong: [R`#include <stdio.h>

int countDigits(long long n) {
    if (n == 0) {
        return 0;
    }
    return 1 + countDigits(n / 10);
}

int main(void) {
    long long n = 0;
    scanf("%lld", &n);
    printf("จำนวนหลัก: %d\n", countDigits(n));
    return 0;
}
`] },
  "c2-scope/5": { sol: R`#include <stdio.h>

long long ways(int n) {
    long long a = 1, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main(void) {
    int k = 0;
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        int n = 0;
        scanf("%d", &n);
        printf("%lld\n", ways(n));
    }
    return 0;
}
`, wrong: [] },

  // ── Stage 9: อาร์เรย์ ──
  "c2-arrays/0": { sol: M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("ย้อนกลับ:");
    if (n == 0) {
        printf(" -");
    }
    for (int i = n - 1; i >= 0; i--) {
        printf(" %d", a[i]);
    }
    printf("\n");`), wrong: [M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("ย้อนกลับ:");
    if (n == 0) {
        printf(" -");
    }
    for (int i = n - 1; i > 0; i--) {
        printf(" %d", a[i]);
    }
    printf("\n");`)] },
  "c2-arrays/1": { sol: R`#include <stdio.h>

long long sumArray(const int a[], int n) {
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return s;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("ผลรวม: %lld\n", sumArray(a, n));
    return 0;
}
`, wrong: [R`#include <stdio.h>

int sumArray(const int a[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return s;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("ผลรวม: %d\n", sumArray(a, n));
    return 0;
}
`] },
  "c2-arrays/2": { sol: R`#include <stdio.h>

double average(const int a[], int n) {
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return (double)s / n;
}

int main(void) {
    int scores[5];
    for (int i = 0; i < 5; i++) {
        scanf("%d", &scores[i]);
    }
    printf("เฉลี่ย: %.2f\n", average(scores, 5));
    return 0;
}
`, wrong: [R`#include <stdio.h>

double average(const int a[], int n) {
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return (double)(s / n);
}

int main(void) {
    int scores[5];
    for (int i = 0; i < 5; i++) {
        scanf("%d", &scores[i]);
    }
    printf("เฉลี่ย: %.2f\n", average(scores, 5));
    return 0;
}
`] },
  "c2-arrays/3": { sol: M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int lo = 0, hi = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] < a[lo]) {
            lo = i;
        }
        if (a[i] > a[hi]) {
            hi = i;
        }
    }
    printf("ต่ำสุด: %d (ตำแหน่ง %d)\n", a[lo], lo);
    printf("สูงสุด: %d (ตำแหน่ง %d)\n", a[hi], hi);`), wrong: [M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int lo = 0, hi = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] <= a[lo]) {
            lo = i;
        }
        if (a[i] >= a[hi]) {
            hi = i;
        }
    }
    printf("ต่ำสุด: %d (ตำแหน่ง %d)\n", a[lo], lo);
    printf("สูงสุด: %d (ตำแหน่ง %d)\n", a[hi], hi);`)] },
  "c2-arrays/4": { sol: M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int best = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > best) {
            best = a[i];
        }
    }
    printf("สูงสุด: %d\n", best);`), wrong: [M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int best = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] > best) {
            best = a[i];
        }
    }
    printf("สูงสุด: %d\n", best);`)] },
  "c2-arrays/5": { sol: M(R`    int count[7] = {0};
    int n = 0, bad = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        if (v >= 1 && v <= 6) {
            count[v]++;
        } else {
            bad++;
        }
    }
    for (int k = 1; k <= 6; k++) {
        printf("หน้า %d: %d ครั้ง\n", k, count[k]);
    }
    printf("ไม่ถูกต้อง: %d ค่า\n", bad);`), wrong: [M(R`    int count[7] = {0};
    int n = 0, bad = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        if (v >= 0 && v <= 6) {
            count[v]++;
        } else {
            bad++;
        }
    }
    for (int k = 1; k <= 6; k++) {
        printf("หน้า %d: %d ครั้ง\n", k, count[k]);
    }
    printf("ไม่ถูกต้อง: %d ค่า\n", bad);`)] },
  "c2-arrays/6": { sol: M(R`    int m[10][10] = {{0}};
    int r = 0, c = 0;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &m[i][j]);
        }
    }
    for (int j = 0; j < c; j++) {
        for (int i = 0; i < r; i++) {
            printf(i ? " %d" : "%d", m[i][j]);
        }
        printf("\n");
    }`), wrong: [M(R`    int m[10][10] = {{0}};
    int r = 0, c = 0;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &m[i][j]);
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            printf(j ? " %d" : "%d", m[i][j]);
        }
        printf("\n");
    }`)] },
  "c2-arrays/7": { sol: R`#include <stdio.h>

#define N 10

void readMatrix(int m[][N], int r, int c) {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &m[i][j]);
        }
    }
}

void printMatrix(int m[][N], int r, int c) {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            printf(j ? " %d" : "%d", m[i][j]);
        }
        printf("\n");
    }
}

int main(void) {
    char op = 0;
    int a[N][N] = {{0}}, b[N][N] = {{0}}, res[N][N] = {{0}};
    int r1 = 0, c1 = 0, r2 = 0, c2 = 0;
    scanf(" %c", &op);
    scanf("%d %d", &r1, &c1);
    readMatrix(a, r1, c1);
    scanf("%d %d", &r2, &c2);
    readMatrix(b, r2, c2);
    if (op == '+') {
        if (r1 != r2 || c1 != c2) {
            puts("ขนาดไม่ตรงกัน");
            return 0;
        }
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c1; j++) {
                res[i][j] = a[i][j] + b[i][j];
            }
        }
        printMatrix(res, r1, c1);
    } else {
        if (c1 != r2) {
            puts("ขนาดไม่ตรงกัน");
            return 0;
        }
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                for (int k = 0; k < c1; k++) {
                    res[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        printMatrix(res, r1, c2);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define N 10

int main(void) {
    char op = 0;
    int a[N][N] = {{0}}, b[N][N] = {{0}};
    int r1 = 0, c1 = 0, r2 = 0, c2 = 0;
    scanf(" %c", &op);
    scanf("%d %d", &r1, &c1);
    for (int i = 0; i < r1; i++) for (int j = 0; j < c1; j++) scanf("%d", &a[i][j]);
    scanf("%d %d", &r2, &c2);
    for (int i = 0; i < r2; i++) for (int j = 0; j < c2; j++) scanf("%d", &b[i][j]);
    if (r1 != r2 || c1 != c2) {
        puts("ขนาดไม่ตรงกัน");
        return 0;
    }
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) {
            printf(j ? " %d" : "%d", op == '+' ? a[i][j] + b[i][j] : a[i][j] * b[i][j]);
        }
        printf("\n");
    }
    return 0;
}
`] },
  "c2-arrays/8": { sol: R`#include <stdio.h>

#define MAXN 20
#define MAXM 10

double rowAverage(int s[][MAXM], int row, int m) {
    long long sum = 0;
    for (int j = 0; j < m; j++) {
        sum += s[row][j];
    }
    return (double)sum / m;
}

int columnMax(int s[][MAXM], int col, int n) {
    int best = s[0][col];
    for (int i = 1; i < n; i++) {
        if (s[i][col] > best) {
            best = s[i][col];
        }
    }
    return best;
}

int main(void) {
    int s[MAXN][MAXM] = {{0}};
    int n = 0, m = 0;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &s[i][j]);
        }
    }
    int best = 0;
    for (int i = 0; i < n; i++) {
        double avg = rowAverage(s, i, m);
        printf("นักเรียน %d: เฉลี่ย %.2f\n", i + 1, avg);
        if (avg > rowAverage(s, best, m)) {
            best = i;
        }
    }
    for (int j = 0; j < m; j++) {
        printf("วิชา %d: สูงสุด %d\n", j + 1, columnMax(s, j, n));
    }
    printf("ดีที่สุด: นักเรียน %d (เฉลี่ย %.2f)\n", best + 1, rowAverage(s, best, m));
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define MAXN 20
#define MAXM 10

double rowAverage(int s[][MAXM], int row, int m) {
    long long sum = 0;
    for (int j = 0; j < m; j++) {
        sum += s[row][j];
    }
    return (double)sum / m;
}

int columnMax(int s[][MAXM], int col, int n) {
    int best = 0;
    for (int i = 0; i < n; i++) {
        if (s[i][col] > best) {
            best = s[i][col];
        }
    }
    return best;
}

int main(void) {
    int s[MAXN][MAXM] = {{0}};
    int n = 0, m = 0;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &s[i][j]);
        }
    }
    int best = 0;
    for (int i = 0; i < n; i++) {
        double avg = rowAverage(s, i, m);
        printf("นักเรียน %d: เฉลี่ย %.2f\n", i + 1, avg);
        if (avg >= rowAverage(s, best, m)) {
            best = i;
        }
    }
    for (int j = 0; j < m; j++) {
        printf("วิชา %d: สูงสุด %d\n", j + 1, columnMax(s, j, n));
    }
    printf("ดีที่สุด: นักเรียน %d (เฉลี่ย %.2f)\n", best + 1, rowAverage(s, best, m));
    return 0;
}
`] },
  // ── Stage 10: สตริง ──
  "c2-strings/0": { sol: M(R`    char w[50] = "";
    scanf("%49s", w);
    int len = 0, vowels = 0;
    for (int i = 0; w[i] != '\0'; i++) {
        len++;
        char c = w[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            vowels++;
        }
    }
    printf("ความยาว: %d\nสระ: %d\n", len, vowels);`), wrong: [M(R`    char w[50] = "";
    scanf("%49s", w);
    int len = 0, vowels = 0;
    for (int i = 0; w[i] != '\0'; i++) {
        len++;
        char c = w[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            vowels++;
        }
    }
    printf("ความยาว: %d\nสระ: %d\n", len, vowels);`)] },
  "c2-strings/1": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char a[50] = "", b[50] = "";
    scanf("%49s %49s", a, b);
    int r = strcmp(a, b);
    if (r < 0) {
        printf("%s มาก่อน %s\n", a, b);
    } else if (r > 0) {
        printf("%s มาก่อน %s\n", b, a);
    } else {
        puts("เหมือนกัน");
    }`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char a[50] = "", b[50] = "";
    scanf("%49s %49s", a, b);
    if (strlen(a) < strlen(b)) {
        printf("%s มาก่อน %s\n", a, b);
    } else if (strlen(a) > strlen(b)) {
        printf("%s มาก่อน %s\n", b, a);
    } else {
        puts("เหมือนกัน");
    }`)] },
  "c2-strings/2": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char src[64] = "";
    scanf("%63s", src);
    char area[16];
    memset(area, 'X', sizeof area - 1);
    area[sizeof area - 1] = '\0';
    snprintf(area, 8, "%s", src);
    printf("ป้าย: %s\n", area);`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char src[64] = "";
    scanf("%63s", src);
    char area[16];
    memset(area, 'X', sizeof area - 1);
    area[sizeof area - 1] = '\0';
    strncpy(area, src, 8);
    area[8] = '\0';
    printf("ป้าย: %s\n", area);`)] },
  "c2-strings/3": { sol: M(R`    int n = 0;
    char cc[16] = "";
    scanf("%d %15s", &n, cc);
    char id[16];
    int need = snprintf(id, sizeof id, "ID-%05d-%s", n, cc);
    if (need >= (int)sizeof id) {
        printf("ยาวเกิน (ต้องใช้ %d ตัวอักษร)\n", need);
    } else {
        printf("รหัส: %s\n", id);
    }`), wrong: [M(R`    int n = 0;
    char cc[16] = "";
    scanf("%d %15s", &n, cc);
    char id[16];
    snprintf(id, sizeof id, "ID-%05d-%s", n, cc);
    printf("รหัส: %s\n", id);`)] },
  "c2-strings/4": { sol: MI("#include <stdio.h>\n#include <ctype.h>", R`    char w[50] = "";
    scanf("%49s", w);
    w[0] = (char)toupper((unsigned char)w[0]);
    for (int i = 1; w[i] != '\0'; i++) {
        w[i] = (char)tolower((unsigned char)w[i]);
    }
    puts(w);`), wrong: [MI("#include <stdio.h>\n#include <ctype.h>", R`    char w[50] = "";
    scanf("%49s", w);
    w[0] = (char)toupper((unsigned char)w[0]);
    puts(w);`)] },
  "c2-strings/5": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char pass[32] = "";
    scanf("%31s", pass);
    if (strcmp(pass, "open-sesame") == 0) {
        puts("ยินดีต้อนรับ");
    } else {
        puts("รหัสผิด");
    }`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char pass[32] = "";
    scanf("%31s", pass);
    if (strncmp(pass, "open-sesame", 11) == 0) {
        puts("ยินดีต้อนรับ");
    } else {
        puts("รหัสผิด");
    }`)] },
  "c2-strings/6": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char text[100] = "", pat[20] = "";
    scanf("%99s %19s", text, pat);
    int len = (int)strlen(text), m = (int)strlen(pat), count = 0;
    for (int i = 0; i + m <= len; i++) {
        if (strncmp(&text[i], pat, (size_t)m) == 0) {
            count++;
        }
    }
    printf("พบ %d ครั้ง\n", count);`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char text[100] = "", pat[20] = "";
    scanf("%99s %19s", text, pat);
    int len = (int)strlen(text), m = (int)strlen(pat), count = 0;
    for (int i = 0; i + m <= len; ) {
        if (strncmp(&text[i], pat, (size_t)m) == 0) {
            count++;
            i += m;
        } else {
            i++;
        }
    }
    printf("พบ %d ครั้ง\n", count);`)] },
  "c2-strings/7": { sol: MI("#include <stdio.h>\n#include <string.h>\n#include <ctype.h>", R`    char w[50] = "", longest[50] = "";
    int words = 0, upper = 0;
    size_t best = 0;
    while (scanf("%49s", w) == 1) {
        words++;
        if (strlen(w) > best) {
            best = strlen(w);
            strcpy(longest, w);
        }
        if (isupper((unsigned char)w[0])) {
            upper++;
        }
    }
    printf("จำนวนคำ: %d\n", words);
    if (words == 0) {
        puts("คำที่ยาวที่สุด: -");
    } else {
        printf("คำที่ยาวที่สุด: %s (%zu ตัวอักษร)\n", longest, best);
    }
    printf("ขึ้นต้นด้วยตัวพิมพ์ใหญ่: %d คำ\n", upper);`), wrong: [MI("#include <stdio.h>\n#include <string.h>\n#include <ctype.h>", R`    char w[50] = "", longest[50] = "";
    int words = 0, upper = 0;
    size_t best = 0;
    while (scanf("%49s", w) == 1) {
        words++;
        if (strlen(w) >= best) {
            best = strlen(w);
            strcpy(longest, w);
        }
        if (isupper((unsigned char)w[0])) {
            upper++;
        }
    }
    printf("จำนวนคำ: %d\n", words);
    if (words == 0) {
        puts("คำที่ยาวที่สุด: -");
    } else {
        printf("คำที่ยาวที่สุด: %s (%zu ตัวอักษร)\n", longest, best);
    }
    printf("ขึ้นต้นด้วยตัวพิมพ์ใหญ่: %d คำ\n", upper);`)] },
  // ── Stage 11: รับข้อมูลอย่างทนทาน ──
  "c2-input/0": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char name[128];
    if (fgets(name, sizeof name, stdin) == NULL) {
        puts("ไม่มีข้อมูล");
        return 0;
    }
    name[strcspn(name, "\n")] = '\0';
    printf("สวัสดีคุณ %s\n", name);
    printf("ความยาว: %zu ไบต์\n", strlen(name));`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char name[128] = "";
    if (scanf("%127s", name) != 1) {
        puts("ไม่มีข้อมูล");
        return 0;
    }
    printf("สวัสดีคุณ %s\n", name);
    printf("ความยาว: %zu ไบต์\n", strlen(name));`)] },
  "c2-input/1": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char line[256];
    int count = 0;
    size_t longest = 0;
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        count++;
        size_t len = strlen(line);
        if (len > longest) {
            longest = len;
        }
    }
    printf("บรรทัด: %d ยาวสุด: %zu\n", count, longest);`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char line[256];
    int count = 0;
    size_t longest = 0;
    while (fgets(line, sizeof line, stdin) != NULL) {
        count++;
        size_t len = strlen(line);
        if (len > longest) {
            longest = len;
        }
    }
    printf("บรรทัด: %d ยาวสุด: %zu\n", count, longest);`)] },
  "c2-input/2": { sol: MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <errno.h>\n#include <limits.h>", R`    char line[128] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    char *end;
    errno = 0;
    long v = strtol(line, &end, 10);
    if (end == line || *end != '\0') {
        puts("ไม่ใช่ตัวเลข");
    } else if (errno == ERANGE || v < INT_MIN || v > INT_MAX) {
        puts("เกินขอบเขต");
    } else {
        printf("ค่า: %ld\n", v);
    }`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <errno.h>\n#include <limits.h>", R`    char line[128] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    char *end;
    long v = strtol(line, &end, 10);
    if (end == line) {
        puts("ไม่ใช่ตัวเลข");
    } else if (errno == ERANGE) {
        puts("เกินขอบเขต");
    } else {
        printf("ค่า: %ld\n", v);
    }`)] },
  "c2-input/3": { sol: MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>", R`    char line[64] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        return 0;
    }
    line[strcspn(line, "\n")] = '\0';
    char *end;
    long v = strtol(line, &end, 10);
    if (end == line || *end != '\0' || v < 0 || v > 150) {
        puts("ข้อมูลไม่ถูกต้อง");
    } else {
        printf("อายุ %ld ปี\n", v);
    }`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>", R`    char line[64] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        return 0;
    }
    line[strcspn(line, "\n")] = '\0';
    char *end;
    long v = strtol(line, &end, 10);
    if (end == line || v <= 0 || v > 150) {
        puts("ข้อมูลไม่ถูกต้อง");
    } else {
        printf("อายุ %ld ปี\n", v);
    }`)] },
  "c2-input/4": { sol: MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>", R`    char line[128] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        puts("รูปแบบไม่ถูกต้อง");
        return 0;
    }
    line[strcspn(line, "\n")] = '\0';
    char *field[4];
    int count = 0;
    char *tok = strtok(line, ",");
    while (tok != NULL && count < 4) {
        field[count++] = tok;
        tok = strtok(NULL, ",");
    }
    if (count != 3) {
        puts("รูปแบบไม่ถูกต้อง");
        return 0;
    }
    char *end;
    long score = strtol(field[1], &end, 10);
    if (end == field[1] || *end != '\0' || score < 0 || score > 100) {
        puts("รูปแบบไม่ถูกต้อง");
        return 0;
    }
    printf("ชื่อ: %s\nคะแนน: %ld\nเกรด: %s\n", field[0], score, field[2]);`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>", R`    char line[128] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        puts("รูปแบบไม่ถูกต้อง");
        return 0;
    }
    line[strcspn(line, "\n")] = '\0';
    char *field[4];
    int count = 0;
    char *tok = strtok(line, ",");
    while (tok != NULL && count < 3) {
        field[count++] = tok;
        tok = strtok(NULL, ",");
    }
    if (count != 3) {
        puts("รูปแบบไม่ถูกต้อง");
        return 0;
    }
    printf("ชื่อ: %s\nคะแนน: %d\nเกรด: %s\n", field[0], atoi(field[1]), field[2]);`)] },
  "c2-input/5": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char line[64] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        puts("เวลาไม่ถูกต้อง");
        return 0;
    }
    line[strcspn(line, "\n")] = '\0';
    int h = 0, m = 0;
    char extra = 0;
    int got = sscanf(line, "%d:%d %c", &h, &m, &extra);
    if (got != 2 || h < 0 || h > 23 || m < 0 || m > 59) {
        puts("เวลาไม่ถูกต้อง");
    } else {
        printf("นาทีจากเที่ยงคืน: %d\n", h * 60 + m);
    }`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char line[64] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        puts("เวลาไม่ถูกต้อง");
        return 0;
    }
    line[strcspn(line, "\n")] = '\0';
    int h = 0, m = 0;
    int got = sscanf(line, "%d:%d", &h, &m);
    if (got != 2 || h < 0 || h > 23 || m < 0 || m > 59) {
        puts("เวลาไม่ถูกต้อง");
    } else {
        printf("นาทีจากเที่ยงคืน: %d\n", h * 60 + m);
    }`)] },
  "c2-input/6": { sol: MI("#include <stdio.h>\n#include <string.h>\n#include <ctype.h>", R`    char line[256];
    char longest[256] = "";
    int freq[26] = {0};
    int lines = 0, words = 0, letters = 0, digits = 0;
    long chars = 0;
    size_t bestLen = 0;
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        lines++;
        size_t len = strlen(line);
        chars += (long)len;
        size_t i = 0;
        while (i < len) {
            while (i < len && isspace((unsigned char)line[i])) {
                i++;
            }
            if (i >= len) {
                break;
            }
            size_t start = i;
            while (i < len && !isspace((unsigned char)line[i])) {
                i++;
            }
            size_t wl = i - start;
            words++;
            if (wl > bestLen) {
                bestLen = wl;
                memcpy(longest, &line[start], wl);
                longest[wl] = '\0';
            }
        }
        for (size_t k = 0; k < len; k++) {
            unsigned char c = (unsigned char)line[k];
            if (isalpha(c)) {
                letters++;
                freq[tolower(c) - 'a']++;
            } else if (isdigit(c)) {
                digits++;
            }
        }
    }
    printf("บรรทัด: %d\n", lines);
    printf("คำ: %d\n", words);
    printf("ตัวอักษร (ไม่รวมขึ้นบรรทัด): %ld\n", chars);
    printf("ตัวอักษรภาษาอังกฤษ: %d · ตัวเลข: %d\n", letters, digits);
    printf("คำที่ยาวที่สุด: %s\n", words ? longest : "-");
    int top = 0;
    for (int k = 1; k < 26; k++) {
        if (freq[k] > freq[top]) {
            top = k;
        }
    }
    if (freq[top] == 0) {
        puts("ตัวอักษรที่พบบ่อยที่สุด: -");
    } else {
        printf("ตัวอักษรที่พบบ่อยที่สุด: %c (%d ครั้ง)\n", 'a' + top, freq[top]);
    }`), wrong: [MI("#include <stdio.h>\n#include <string.h>\n#include <ctype.h>", R`    char line[256];
    char longest[256] = "";
    int freq[26] = {0};
    int lines = 0, words = 0, letters = 0, digits = 0;
    long chars = 0;
    size_t bestLen = 0;
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        lines++;
        size_t len = strlen(line);
        chars += (long)len;
        for (size_t i = 0; i < len; i++) {
            if (!isspace((unsigned char)line[i]) && (i == 0 || isspace((unsigned char)line[i - 1]))) {
                words++;
                size_t j = i;
                while (j < len && !isspace((unsigned char)line[j])) j++;
                if (j - i > bestLen) { bestLen = j - i; memcpy(longest, &line[i], j - i); longest[j - i] = '\0'; }
            }
            unsigned char c = (unsigned char)line[i];
            if (isalpha(c)) { letters++; freq[c - 'a' < 26 ? c - 'a' : 0]++; }
            else if (isdigit(c)) digits++;
        }
    }
    printf("บรรทัด: %d\n", lines);
    printf("คำ: %d\n", words);
    printf("ตัวอักษร (ไม่รวมขึ้นบรรทัด): %ld\n", chars);
    printf("ตัวอักษรภาษาอังกฤษ: %d · ตัวเลข: %d\n", letters, digits);
    printf("คำที่ยาวที่สุด: %s\n", words ? longest : "-");
    int top = 0;
    for (int k = 1; k < 26; k++) if (freq[k] > freq[top]) top = k;
    if (freq[top] == 0) puts("ตัวอักษรที่พบบ่อยที่สุด: -");
    else printf("ตัวอักษรที่พบบ่อยที่สุด: %c (%d ครั้ง)\n", 'a' + top, freq[top]);`)] },

  // ── Stage 12: พื้นฐานพอยน์เตอร์ ──
  "c2-ptr/0": { sol: M(R`    int x = 0;
    scanf("%d", &x);
    int *p = &x;
    printf("ค่าผ่านพอยน์เตอร์: %d\n", *p);
    printf("ชี้ไปที่ x: %d\n", p == &x);
    *p = *p * 2;
    printf("x ใหม่: %d\n", x);`), wrong: [M(R`    int x = 0;
    scanf("%d", &x);
    int *p = &x;
    int copy = *p;
    printf("ค่าผ่านพอยน์เตอร์: %d\n", copy);
    printf("ชี้ไปที่ x: %d\n", p == &x);
    copy = copy * 2;
    *p = *p;
    printf("x ใหม่: %d\n", x);`)] },
  "c2-ptr/1": { sol: M(R`    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    int *p = &a;
    *p += 5;
    p = &b;
    *p = *p * 2;
    printf("a=%d b=%d\n", a, b);`), wrong: [M(R`    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    int *p = &a;
    *p += 5;
    *p = b;
    *p = *p * 2;
    printf("a=%d b=%d\n", a, b);`)] },
  "c2-ptr/2": { sol: M(R`    int x = 0, v = 0;
    scanf("%d", &v);
    int *p = &x;
    *p = v;
    printf("x = %d\n", x);`), wrong: [M(R`    int x = 0, v = 0;
    scanf("%d", &v);
    int *p = &v;
    *p = v;
    printf("x = %d\n", x);`)] },
  "c2-ptr/3": { sol: M(R`    int flag = 0, a = 0, b = 0;
    scanf("%d %d %d", &flag, &a, &b);
    int *chosen = NULL;
    if (flag == 1) {
        chosen = &a;
    } else if (flag == 2) {
        chosen = &b;
    }
    if (chosen != NULL) {
        printf("ค่าที่เลือก: %d\n", *chosen);
    } else {
        puts("ไม่ได้เลือก");
    }`), wrong: [M(R`    int flag = 0, a = 0, b = 0;
    scanf("%d %d %d", &flag, &a, &b);
    int *chosen = NULL;
    if (flag == 1) {
        chosen = &a;
    } else if (flag == 2) {
        chosen = &b;
    }
    if (chosen != NULL && *chosen != 0) {
        printf("ค่าที่เลือก: %d\n", *chosen);
    } else {
        puts("ไม่ได้เลือก");
    }`)] },
  "c2-ptr/4": { sol: M(R`    double *dp = NULL;
    printf("int*: %zu\n", sizeof(int *));
    printf("char*: %zu\n", sizeof(char *));
    printf("double*: %zu\n", sizeof(double *));
    printf("double ที่ชี้: %zu\n", sizeof *dp);`), wrong: [M(R`    double *dp = NULL;
    printf("int*: %zu\n", sizeof(int *));
    printf("char*: %zu\n", sizeof(char));
    printf("double*: %zu\n", sizeof(double *));
    printf("double ที่ชี้: %zu\n", sizeof *dp);`)] },
  "c2-ptr/5": { sol: M(R`    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    int *lo = &a, *hi = &b;
    if (b < a) {
        lo = &b;
        hi = &a;
    }
    *lo += 10;
    *hi -= 10;
    printf("a=%d b=%d\n", a, b);`), wrong: [M(R`    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    int *lo = &a, *hi = &b;
    if (b <= a) {
        lo = &b;
        hi = &a;
    }
    *lo += 10;
    *hi -= 10;
    printf("a=%d b=%d\n", a, b);`)] },
  // ── Stage 13: พอยน์เตอร์กับฟังก์ชัน ──
  "c2-ptrfn/0": { sol: R`#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int main(void) {
    int x = 0, y = 0;
    scanf("%d %d", &x, &y);
    swap(&x, &y);
    printf("x=%d y=%d\n", x, y);
    return 0;
}
`, wrong: [R`#include <stdio.h>

void swap(int *a, int *b) {
    *a = *b;
    *b = *a;
}

int main(void) {
    int x = 0, y = 0;
    scanf("%d %d", &x, &y);
    swap(&x, &y);
    printf("x=%d y=%d\n", x, y);
    return 0;
}
`] },
  "c2-ptrfn/1": { sol: R`#include <stdio.h>

void minMax(const int a[], int n, int *mn, int *mx) {
    *mn = a[0];
    *mx = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < *mn) {
            *mn = a[i];
        }
        if (a[i] > *mx) {
            *mx = a[i];
        }
    }
}

int main(void) {
    int a[100] = {0};
    int n = 0, lo = 0, hi = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    minMax(a, n, &lo, &hi);
    printf("ต่ำสุด: %d สูงสุด: %d\n", lo, hi);
    return 0;
}
`, wrong: [R`#include <stdio.h>

void minMax(const int a[], int n, int *mn, int *mx) {
    *mn = 0;
    *mx = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] < *mn) {
            *mn = a[i];
        }
        if (a[i] > *mx) {
            *mx = a[i];
        }
    }
}

int main(void) {
    int a[100] = {0};
    int n = 0, lo = 0, hi = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    minMax(a, n, &lo, &hi);
    printf("ต่ำสุด: %d สูงสุด: %d\n", lo, hi);
    return 0;
}
`] },
  "c2-ptrfn/2": { sol: R`#include <stdio.h>

void clampNegative(int *p) {
    if (*p < 0) {
        *p = 0;
    }
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        clampNegative(&v);
        sum += v;
    }
    printf("ผลรวม: %lld\n", sum);
    return 0;
}
`, wrong: [R`#include <stdio.h>

void clampNegative(int *p) {
    if (*p <= 0) {
        *p = 1;
    }
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        clampNegative(&v);
        sum += v;
    }
    printf("ผลรวม: %lld\n", sum);
    return 0;
}
`] },
  "c2-ptrfn/3": { sol: R`#include <stdio.h>
#include <limits.h>

int divmod(int a, int b, int *q, int *r) {
    if (b == 0 || (a == INT_MIN && b == -1)) {
        return 0;
    }
    *q = a / b;
    *r = a % b;
    return 1;
}

int main(void) {
    int a = 0, b = 0, q = 0, r = 0;
    scanf("%d %d", &a, &b);
    if (divmod(a, b, &q, &r)) {
        printf("ผลหาร: %d เศษ: %d\n", q, r);
    } else {
        puts("หารไม่ได้");
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <limits.h>

int divmod(int a, int b, int *q, int *r) {
    if (b == 0) {
        return 0;
    }
    *q = a / b;
    *r = ((a % b) + b) % b;
    return 1;
}

int main(void) {
    int a = 0, b = 0, q = 0, r = 0;
    scanf("%d %d", &a, &b);
    if (divmod(a, b, &q, &r)) {
        printf("ผลหาร: %d เศษ: %d\n", q, r);
    } else {
        puts("หารไม่ได้");
    }
    return 0;
}
`] },
  "c2-ptrfn/4": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int parseScore(const char *s, int *out) {
    char *end;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || v < 0 || v > 100) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

int main(void) {
    char line[64];
    int last = 0, valid = 0, invalid = 0;
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (parseScore(line, &last)) {
            valid++;
        } else {
            invalid++;
        }
    }
    printf("ถูกต้อง: %d · ไม่ถูกต้อง: %d\n", valid, invalid);
    if (valid == 0) {
        puts("ล่าสุด: -");
    } else {
        printf("ล่าสุด: %d\n", last);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int parseScore(const char *s, int *out) {
    char *end;
    long v = strtol(s, &end, 10);
    *out = (int)v;
    if (end == s || *end != '\0' || v < 0 || v > 100) {
        return 0;
    }
    return 1;
}

int main(void) {
    char line[64];
    int last = 0, valid = 0, invalid = 0;
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (parseScore(line, &last)) {
            valid++;
        } else {
            invalid++;
        }
    }
    printf("ถูกต้อง: %d · ไม่ถูกต้อง: %d\n", valid, invalid);
    if (valid == 0) {
        puts("ล่าสุด: -");
    } else {
        printf("ล่าสุด: %d\n", last);
    }
    return 0;
}
`] },
  "c2-ptrfn/5": { sol: R`#include <stdio.h>

int *maxPtr(int a[], int n) {
    if (n == 0) {
        return NULL;
    }
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[best]) {
            best = i;
        }
    }
    return &a[best];
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int *p = maxPtr(a, n);
    if (p == NULL) {
        puts("ว่าง");
        return 0;
    }
    *p *= 2;
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
    return 0;
}
`, wrong: [R`#include <stdio.h>

int *maxPtr(int a[], int n) {
    if (n == 0) {
        return NULL;
    }
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] >= a[best]) {
            best = i;
        }
    }
    return &a[best];
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int *p = maxPtr(a, n);
    if (p == NULL) {
        puts("ว่าง");
        return 0;
    }
    *p *= 2;
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
    return 0;
}
`] },
  // ── Stage 14: พอยน์เตอร์กับอาร์เรย์ ──
  "c2-ptrarr/0": { sol: R`#include <stdio.h>

long long sumPtr(const int *begin, const int *end) {
    long long s = 0;
    for (const int *p = begin; p < end; p++) {
        s += *p;
    }
    return s;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("ผลรวม: %lld\n", sumPtr(a, a + n));
    return 0;
}
`, wrong: [R`#include <stdio.h>

long long sumPtr(const int *begin, const int *end) {
    long long s = 0;
    for (const int *p = begin; p < end - 1; p++) {
        s += *p;
    }
    return s;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("ผลรวม: %lld\n", sumPtr(a, a + n));
    return 0;
}
`] },
  "c2-ptrarr/1": { sol: M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int *p = a;
    int *last = &a[n - 1];
    printf("ช่องที่ 3: %d %d %d\n", a[2], *(p + 2), p[2]);
    printf("ระยะห่าง: %td\n", last - p);`), wrong: [M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int *p = a;
    int *last = &a[n - 1];
    printf("ช่องที่ 3: %d %d %d\n", a[2], *p + 2, p[2]);
    printf("ระยะห่าง: %td\n", last - p);`)] },
  "c2-ptrarr/2": { sol: M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    if (n == 0) {
        puts("-");
        return 0;
    }
    int *left = a, *right = a + n - 1;
    while (left < right) {
        int t = *left;
        *left = *right;
        *right = t;
        left++;
        right--;
    }
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");`), wrong: [M(R`    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    if (n == 0) {
        puts("-");
        return 0;
    }
    int *left = a, *right = a + n - 1;
    while (left < right) {
        int t = *left;
        *left = *right;
        *right = t;
        left++;
    }
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");`)] },
  "c2-ptrarr/3": { sol: M(R`    int a[100] = {0};
    int n = 0, target = 0, count = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    scanf("%d", &target);
    for (const int *p = a; p < a + n; p++) {
        if (*p == target) {
            count++;
        }
    }
    printf("พบ: %d ตัว\n", count);`), wrong: [M(R`    int a[100] = {0};
    int n = 0, target = 0, count = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    scanf("%d", &target);
    for (const int *p = a + 1; p < a + n; p++) {
        if (*p == target) {
            count++;
        }
    }
    printf("พบ: %d ตัว\n", count);`)] },
  "c2-ptrarr/4": { sol: R`#include <stdio.h>
#include <ctype.h>
#include <stddef.h>

size_t myStrlen(const char *s) {
    const char *p = s;
    while (*p != '\0') {
        p++;
    }
    return (size_t)(p - s);
}

void toUpperInPlace(char *s) {
    for (char *p = s; *p != '\0'; p++) {
        *p = (char)toupper((unsigned char)*p);
    }
}

int main(void) {
    char w[64] = "";
    scanf("%63s", w);
    printf("ความยาว: %zu\n", myStrlen(w));
    toUpperInPlace(w);
    printf("ตัวพิมพ์ใหญ่: %s\n", w);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <ctype.h>
#include <stddef.h>

size_t myStrlen(const char *s) {
    const char *p = s;
    while (*p != '\0') {
        p++;
    }
    return (size_t)(p - s) + 1;
}

void toUpperInPlace(char *s) {
    for (char *p = s; *p != '\0'; p++) {
        *p = (char)toupper((unsigned char)*p);
    }
}

int main(void) {
    char w[64] = "";
    scanf("%63s", w);
    printf("ความยาว: %zu\n", myStrlen(w));
    toUpperInPlace(w);
    printf("ตัวพิมพ์ใหญ่: %s\n", w);
    return 0;
}
`] },
  "c2-ptrarr/5": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char text[128] = "", key[16] = "";
    if (fgets(text, sizeof text, stdin) == NULL) {
        text[0] = '\0';
    }
    text[strcspn(text, "\n")] = '\0';
    if (fgets(key, sizeof key, stdin) == NULL) {
        key[0] = '\0';
    }
    char c = key[0];
    char *hit = NULL;
    if (c != '\0' && c != '\n') {
        hit = strchr(text, c);
    }
    if (hit != NULL) {
        printf("พบที่ตำแหน่ง %td\n", hit - text);
    } else {
        puts("ไม่พบ");
    }`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char text[128] = "", key[16] = "";
    if (fgets(text, sizeof text, stdin) == NULL) {
        text[0] = '\0';
    }
    text[strcspn(text, "\n")] = '\0';
    if (fgets(key, sizeof key, stdin) == NULL) {
        key[0] = '\0';
    }
    char c = key[0];
    char *hit = strchr(text, c);
    if (hit != NULL) {
        printf("พบที่ตำแหน่ง %td\n", hit - text);
    } else {
        puts("ไม่พบ");
    }`)] },

  // ── Stage 15: พอยน์เตอร์ซ้อน const และกับดัก ──
  "c2-ptradv/0": { sol: R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

void skipSpaces(const char **p) {
    while (**p != '\0' && isspace((unsigned char)**p)) {
        (*p)++;
    }
}

int main(void) {
    char line[128] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    const char *rest = line;
    skipSpaces(&rest);
    printf("[%s]\n", rest);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

void skipSpaces(const char **p) {
    while (**p == ' ') {
        (*p)++;
    }
}

int main(void) {
    char line[128] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    const char *rest = line;
    skipSpaces(&rest);
    printf("[%s]\n", rest);
    return 0;
}
`] },
  "c2-ptradv/1": { sol: M(R`    int a = 1, b = 2;
    const int *p1 = &a;
    int *const p2 = &a;
    p1 = &b;
    *p2 = 10;
    printf("%d %d %d\n", *p1, a, *p2);`), wrong: [M(R`    int a = 1, b = 2;
    int *const p1 = &a;
    const int *p2 = &a;
    p1 = &b;
    *p2 = 10;
    printf("%d %d %d\n", *p1, a, *p2);`)] },
  "c2-ptradv/2": { sol: R`#include <stdio.h>

void printScores(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        int shown = a[i] > 100 ? 100 : a[i];
        printf(i ? " %d" : "%d", shown);
    }
    printf("\n");
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printScores(a, n);
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    printf("เฉลี่ยจริง: %.2f\n", (double)sum / n);
    return 0;
}
`, wrong: [R`#include <stdio.h>

void printScores(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printScores(a, n);
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    printf("เฉลี่ยจริง: %.2f\n", (double)sum / n);
    return 0;
}
`] },
  "c2-ptradv/3": { sol: R`#include <stdio.h>

void pointToMax(int *a, int n, int **out) {
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[best]) {
            best = i;
        }
    }
    *out = &a[best];
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int *m = NULL;
    pointToMax(a, n, &m);
    if (m == NULL) {
        puts("ไม่มี");
        return 0;
    }
    *m = 0;
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
    return 0;
}
`, wrong: [R`#include <stdio.h>

void pointToMax(int *a, int n, int **out) {
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] >= a[best]) {
            best = i;
        }
    }
    *out = &a[best];
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int *m = NULL;
    pointToMax(a, n, &m);
    if (m == NULL) {
        puts("ไม่มี");
        return 0;
    }
    *m = 0;
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
    return 0;
}
`] },
  "c2-ptradv/4": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char buf[10][32];
    char *ptrs[10];
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%31s", buf[i]);
        ptrs[i] = buf[i];
    }
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (strcmp(ptrs[j], ptrs[i]) < 0) {
                char *t = ptrs[i];
                ptrs[i] = ptrs[j];
                ptrs[j] = t;
            }
        }
    }
    printf("เรียงแล้ว:");
    for (int i = 0; i < n; i++) {
        printf(" %s", ptrs[i]);
    }
    printf("\nคำแรกในบัฟเฟอร์: %s\n", buf[0]);`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char buf[10][32];
    char *ptrs[10];
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%31s", buf[i]);
        ptrs[i] = buf[i];
    }
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (strcmp(ptrs[j], ptrs[i]) < 0) {
                char *t = ptrs[i];
                ptrs[i] = ptrs[j];
                ptrs[j] = t;
            }
        }
    }
    printf("เรียงแล้ว:");
    for (int i = 0; i < n; i++) {
        printf(" %s", ptrs[i]);
    }
    printf("\nคำแรกในบัฟเฟอร์: %s\n", ptrs[0]);`)] },
  "c2-ptradv/5": { sol: R`#include <stdio.h>

static const char *const MONTHS[12] = {
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
};

int main(void) {
    int m = 0;
    scanf("%d", &m);
    if (m >= 1 && m <= 12) {
        puts(MONTHS[m - 1]);
    } else {
        puts("ไม่มีเดือนนี้");
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

static const char *const MONTHS[12] = {
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
};

int main(void) {
    int m = 0;
    scanf("%d", &m);
    if (m >= 0 && m < 12) {
        puts(MONTHS[m]);
    } else {
        puts("ไม่มีเดือนนี้");
    }
    return 0;
}
`] },
  "c2-ptradv/6": { sol: R`#include <stdio.h>

static void inc(int *count) {
    (*count)++;
}

int main(void) {
    char w[64] = "";
    scanf("%63s", w);
    int vowels = 0;
    for (int i = 0; w[i] != '\0'; i++) {
        char c = w[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            inc(&vowels);
        }
    }
    printf("สระ: %d\n", vowels);
    return 0;
}
`, wrong: [R`#include <stdio.h>

static void inc(int *count) {
    *count + 1;
}

int main(void) {
    char w[64] = "";
    scanf("%63s", w);
    int vowels = 0;
    for (int i = 0; w[i] != '\0'; i++) {
        char c = w[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            inc(&vowels);
        }
    }
    printf("สระ: %d\n", vowels);
    return 0;
}
`] },
  "c2-ptradv/7": { sol: R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

int splitWords(char *line, char *words[], int max) {
    int n = 0;
    char *p = line;
    while (*p != '\0' && n < max) {
        while (*p != '\0' && isspace((unsigned char)*p)) {
            p++;
        }
        if (*p == '\0') {
            break;
        }
        words[n++] = p;
        while (*p != '\0' && !isspace((unsigned char)*p)) {
            p++;
        }
        if (*p != '\0') {
            *p = '\0';
            p++;
        }
    }
    return n;
}

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    char *words[32];
    int n = splitWords(line, words, 32);
    printf("จำนวนคำ: %d\n", n);
    if (n == 0) {
        puts("ย้อนลำดับ: -\nยาวที่สุด: -\nตัวพิมพ์ใหญ่: -");
        return 0;
    }
    printf("ย้อนลำดับ:");
    for (int i = n - 1; i >= 0; i--) {
        printf(" %s", words[i]);
    }
    const char *longest = words[0];
    for (int i = 1; i < n; i++) {
        if (strlen(words[i]) > strlen(longest)) {
            longest = words[i];
        }
    }
    printf("\nยาวที่สุด: %s\n", longest);
    for (int i = 0; i < n; i++) {
        words[i][0] = (char)toupper((unsigned char)words[i][0]);
    }
    printf("ตัวพิมพ์ใหญ่:");
    for (int i = 0; i < n; i++) {
        printf(" %s", words[i]);
    }
    printf("\n");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

int splitWords(char *line, char *words[], int max) {
    int n = 0;
    char *p = line;
    while (*p != '\0' && n < max) {
        while (*p == ' ') {
            p++;
        }
        if (*p == '\0') {
            break;
        }
        words[n++] = p;
        while (*p != '\0' && *p != ' ') {
            p++;
        }
        if (*p != '\0') {
            *p = '\0';
            p++;
        }
    }
    return n;
}

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    char *words[32];
    int n = splitWords(line, words, 32);
    for (int i = 0; i < n; i++) {
        words[i][0] = (char)toupper((unsigned char)words[i][0]);
    }
    printf("จำนวนคำ: %d\n", n);
    if (n == 0) {
        puts("ย้อนลำดับ: -\nยาวที่สุด: -\nตัวพิมพ์ใหญ่: -");
        return 0;
    }
    printf("ย้อนลำดับ:");
    for (int i = n - 1; i >= 0; i--) {
        printf(" %s", words[i]);
    }
    const char *longest = words[0];
    for (int i = 1; i < n; i++) {
        if (strlen(words[i]) > strlen(longest)) {
            longest = words[i];
        }
    }
    printf("\nยาวที่สุด: %s\n", longest);
    printf("ตัวพิมพ์ใหญ่:");
    for (int i = 0; i < n; i++) {
        printf(" %s", words[i]);
    }
    printf("\n");
    return 0;
}
`] },
  // ── Stage 16: หน่วยความจำแบบพลวัต ──
  "c2-malloc/0": { sol: MI("#include <stdio.h>\n#include <stdlib.h>", R`    int n = 0;
    scanf("%d", &n);
    int *a = malloc((size_t)n * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        sum += a[i];
    }
    printf("เฉลี่ย: %.2f\n", (double)sum / n);
    free(a);`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>", R`    int n = 0;
    scanf("%d", &n);
    int *a = malloc((size_t)n * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        sum += a[i];
    }
    printf("เฉลี่ย: %.2f\n", (double)sum / n);
    if (n > 1) {
        free(a);
    }`)] },
  "c2-malloc/1": { sol: MI("#include <stdio.h>\n#include <stdlib.h>", R`    int m = 0, n = 0, outside = 0;
    scanf("%d %d", &m, &n);
    int *count = calloc((size_t)m + 1, sizeof *count);
    if (count == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        if (v >= 0 && v <= m) {
            count[v]++;
        } else {
            outside++;
        }
    }
    for (int v = 0; v <= m; v++) {
        if (count[v] > 0) {
            printf("%d: %d\n", v, count[v]);
        }
    }
    printf("นอกช่วง: %d\n", outside);
    free(count);`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>", R`    int m = 0, n = 0, outside = 0;
    scanf("%d %d", &m, &n);
    int *count = calloc((size_t)m, sizeof *count);
    if (count == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        if (v >= 0 && v < m) {
            count[v]++;
        } else {
            outside++;
        }
    }
    for (int v = 0; v < m; v++) {
        if (count[v] > 0) {
            printf("%d: %d\n", v, count[v]);
        }
    }
    printf("นอกช่วง: %d\n", outside);
    free(count);`)] },
  "c2-malloc/2": { sol: MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <ctype.h>", R`    int k = 0;
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        char w[64] = "";
        scanf("%63s", w);
        char *copy = malloc(strlen(w) + 1);
        if (copy == NULL) {
            return 1;
        }
        strcpy(copy, w);
        for (char *p = copy; *p != '\0'; p++) {
            *p = (char)toupper((unsigned char)*p);
        }
        puts(copy);
        free(copy);
    }`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <ctype.h>", R`    int k = 0;
    scanf("%d", &k);
    char *copy = NULL;
    for (int i = 0; i < k; i++) {
        char w[64] = "";
        scanf("%63s", w);
        copy = malloc(strlen(w) + 1);
        if (copy == NULL) {
            return 1;
        }
        strcpy(copy, w);
        for (char *p = copy; *p != '\0'; p++) {
            *p = (char)toupper((unsigned char)*p);
        }
        puts(copy);
    }
    free(copy);`)] },
  "c2-malloc/3": { sol: R`#include <stdio.h>
#include <stdlib.h>

int *makeRange(int lo, int hi, size_t *count) {
    long long n = (long long)hi - lo + 1;
    if (n <= 0 || n > 1000) {
        *count = 0;
        return NULL;
    }
    int *a = malloc((size_t)n * sizeof *a);
    if (a == NULL) {
        *count = 0;
        return NULL;
    }
    for (long long i = 0; i < n; i++) {
        a[i] = (int)(lo + i);
    }
    *count = (size_t)n;
    return a;
}

int main(void) {
    int lo = 0, hi = 0;
    scanf("%d %d", &lo, &hi);
    size_t count = 0;
    int *r = makeRange(lo, hi, &count);
    if (r == NULL) {
        puts(hi < lo ? "ช่วงว่าง" : "ช่วงใหญ่เกิน");
    } else {
        for (size_t i = 0; i < count; i++) {
            printf(i ? " %d" : "%d", r[i]);
        }
        printf("\n");
    }
    free(r);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

int *makeRange(int lo, int hi, size_t *count) {
    long long n = (long long)hi - lo + 1;
    if (n <= 0) {
        *count = 0;
        return NULL;
    }
    int *a = malloc((size_t)n * sizeof *a);
    if (a == NULL) {
        *count = 0;
        return NULL;
    }
    for (long long i = 0; i < n; i++) {
        a[i] = (int)(lo + i);
    }
    *count = (size_t)n;
    return a;
}

int main(void) {
    int lo = 0, hi = 0;
    scanf("%d %d", &lo, &hi);
    size_t count = 0;
    int *r = makeRange(lo, hi, &count);
    if (r == NULL) {
        puts(hi < lo ? "ช่วงว่าง" : "ช่วงใหญ่เกิน");
    } else {
        for (size_t i = 0; i < count; i++) {
            printf(i ? " %d" : "%d", r[i]);
        }
        printf("\n");
    }
    free(r);
    return 0;
}
`] },
  "c2-malloc/4": { sol: MI("#include <stdio.h>\n#include <stdlib.h>", R`    size_t cap = 2, count = 0;
    int *a = malloc(cap * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    int x = 0;
    while (scanf("%d", &x) == 1 && x != 0) {
        if (count == cap) {
            int *tmp = realloc(a, cap * 2 * sizeof *a);
            if (tmp == NULL) {
                free(a);
                return 1;
            }
            a = tmp;
            cap *= 2;
        }
        a[count++] = x;
    }
    printf("จำนวน: %zu\nความจุ: %zu\nย้อนกลับ:", count, cap);
    if (count == 0) {
        printf(" -");
    }
    for (size_t i = count; i > 0; i--) {
        printf(" %d", a[i - 1]);
    }
    printf("\n");
    free(a);`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>", R`    size_t cap = 2, count = 0;
    int *a = malloc(cap * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    int x = 0;
    while (scanf("%d", &x) == 1 && x != 0) {
        if (count == cap) {
            int *tmp = realloc(a, (cap + 1) * sizeof *a);
            if (tmp == NULL) {
                free(a);
                return 1;
            }
            a = tmp;
            cap += 1;
        }
        a[count++] = x;
    }
    printf("จำนวน: %zu\nความจุ: %zu\nย้อนกลับ:", count, cap);
    if (count == 0) {
        printf(" -");
    }
    for (size_t i = count; i > 0; i--) {
        printf(" %d", a[i - 1]);
    }
    printf("\n");
    free(a);`)] },
  "c2-malloc/5": { sol: R`#include <stdio.h>
#include <stdlib.h>

static void report(const int *data, int n) {
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += data[i];
    }
    printf("ผลรวม: %lld\n", s);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *data = malloc((size_t)n * sizeof *data);
    if (data == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &data[i]);
    }
    report(data, n);
    printf("ตัวแรก: %d\n", data[0]);
    free(data);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static void report(const int *data, int n) {
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += data[i];
    }
    printf("ผลรวม: %lld\n", s);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *data = malloc((size_t)n * sizeof *data);
    if (data == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &data[i]);
    }
    report(data, n);
    printf("ตัวแรก: %d\n", data[0]);
    return 0;
}
`] },
  "c2-malloc/6": { sol: R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = NULL;
    size_t size = 0, cap = 0;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1 && cmd != 'q') {
        if (cmd == 'a') {
            int v = 0;
            scanf("%d", &v);
            if (size == cap) {
                size_t newCap = cap ? cap * 2 : 4;
                int *tmp = realloc(data, newCap * sizeof *data);
                if (tmp == NULL) {
                    free(data);
                    return 1;
                }
                data = tmp;
                cap = newCap;
            }
            data[size++] = v;
        } else if (cmd == 'd' || cmd == 'g') {
            long i = 0;
            scanf("%ld", &i);
            if (i < 0 || (size_t)i >= size) {
                puts("ตำแหน่งไม่ถูกต้อง");
            } else if (cmd == 'g') {
                printf("ค่า: %d\n", data[i]);
            } else {
                for (size_t k = (size_t)i; k + 1 < size; k++) {
                    data[k] = data[k + 1];
                }
                size--;
            }
        } else if (cmd == 's') {
            long long sum = 0;
            for (size_t k = 0; k < size; k++) {
                sum += data[k];
            }
            printf("ขนาด: %zu · ความจุ: %zu · ผลรวม: %lld\n", size, cap, sum);
        } else if (cmd == 'p') {
            if (size == 0) {
                puts("(ว่าง)");
            } else {
                for (size_t k = 0; k < size; k++) {
                    printf(k ? " %d" : "%d", data[k]);
                }
                printf("\n");
            }
        }
    }
    free(data);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = NULL;
    size_t size = 0, cap = 0;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'q') {
            free(data);
            return 0;
        }
        if (cmd == 'a') {
            int v = 0;
            scanf("%d", &v);
            if (size == cap) {
                size_t newCap = cap ? cap * 2 : 4;
                int *tmp = realloc(data, newCap * sizeof *data);
                if (tmp == NULL) {
                    free(data);
                    return 1;
                }
                data = tmp;
                cap = newCap;
            }
            data[size++] = v;
        } else if (cmd == 'd' || cmd == 'g') {
            long i = 0;
            scanf("%ld", &i);
            if (i < 0 || (size_t)i >= size) {
                puts("ตำแหน่งไม่ถูกต้อง");
            } else if (cmd == 'g') {
                printf("ค่า: %d\n", data[i]);
            } else {
                for (size_t k = (size_t)i; k + 1 < size; k++) {
                    data[k] = data[k + 1];
                }
                size--;
            }
        } else if (cmd == 's') {
            long long sum = 0;
            for (size_t k = 0; k < size; k++) {
                sum += data[k];
            }
            printf("ขนาด: %zu · ความจุ: %zu · ผลรวม: %lld\n", size, cap, sum);
        } else if (cmd == 'p') {
            if (size == 0) {
                puts("(ว่าง)");
            } else {
                for (size_t k = 0; k < size; k++) {
                    printf(k ? " %d" : "%d", data[k]);
                }
                printf("\n");
            }
        }
    }
    return 0;
}
`] },
  // ── Stage 17: รูปแบบการจัดการหน่วยความจำ ──
  "c2-memory/0": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

int main(void) {
    char *words[50];
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        char buf[64] = "";
        scanf("%63s", buf);
        words[i] = dupString(buf);
    }
    if (n == 0) {
        puts("-");
    } else {
        for (int i = n - 1; i >= 0; i--) {
            printf(i == n - 1 ? "%s" : " %s", words[i]);
        }
        printf("\n");
    }
    for (int i = 0; i < n; i++) {
        free(words[i]);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

int main(void) {
    char *words[50];
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        char buf[64] = "";
        scanf("%63s", buf);
        words[i] = dupString(buf);
    }
    if (n == 0) {
        puts("-");
    } else {
        for (int i = n - 1; i >= 0; i--) {
            printf(i == n - 1 ? "%s" : " %s", words[i]);
        }
        printf("\n");
    }
    for (int i = 1; i < n; i++) {
        free(words[i]);
    }
    return 0;
}
`] },
  "c2-memory/1": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int *parseList(const char *line, int *count) {
    int *vals = malloc((strlen(line) / 2 + 1) * sizeof *vals);
    if (vals == NULL) {
        return NULL;
    }
    int n = 0;
    const char *p = line;
    while (*p != '\0') {
        while (isspace((unsigned char)*p)) {
            p++;
        }
        if (*p == '\0') {
            break;
        }
        char *end;
        long v = strtol(p, &end, 10);
        if (end == p || (*end != '\0' && !isspace((unsigned char)*end))) {
            free(vals);
            return NULL;
        }
        vals[n++] = (int)v;
        p = end;
    }
    *count = n;
    return vals;
}

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    int n = 0;
    int *vals = parseList(line, &n);
    if (vals == NULL) {
        puts("ข้อมูลไม่ถูกต้อง");
        return 0;
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += vals[i];
    }
    printf("ผลรวม: %lld (%d ค่า)\n", sum, n);
    free(vals);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int *parseList(const char *line, int *count) {
    int *vals = malloc((strlen(line) / 2 + 1) * sizeof *vals);
    if (vals == NULL) {
        return NULL;
    }
    int n = 0;
    const char *p = line;
    while (*p != '\0') {
        while (isspace((unsigned char)*p)) {
            p++;
        }
        if (*p == '\0') {
            break;
        }
        char *end;
        long v = strtol(p, &end, 10);
        if (end == p || (*end != '\0' && !isspace((unsigned char)*end))) {
            *count = n;
            return vals;
        }
        vals[n++] = (int)v;
        p = end;
    }
    *count = n;
    return vals;
}

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    int n = 0;
    int *vals = parseList(line, &n);
    if (vals == NULL) {
        puts("ข้อมูลไม่ถูกต้อง");
        return 0;
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += vals[i];
    }
    printf("ผลรวม: %lld (%d ค่า)\n", sum, n);
    free(vals);
    return 0;
}
`] },
  "c2-memory/2": { sol: R`#include <stdio.h>
#include <stdlib.h>

static int sumSquares(const int *src, int n, long long *out) {
    int result = -1;
    int *copy = NULL;
    long long *squares = NULL;
    copy = malloc(((size_t)n + 1) * sizeof *copy);
    if (copy == NULL) {
        goto cleanup;
    }
    squares = malloc(((size_t)n + 1) * sizeof *squares);
    if (squares == NULL) {
        goto cleanup;
    }
    long long total = 0;
    for (int i = 0; i < n; i++) {
        copy[i] = src[i];
        squares[i] = (long long)copy[i] * copy[i];
        total += squares[i];
    }
    *out = total;
    result = 0;
cleanup:
    free(squares);
    free(copy);
    return result;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    long long s = 0;
    if (sumSquares(a, n, &s) != 0) {
        return 1;
    }
    printf("ผลรวมกำลังสอง: %lld\n", s);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static int sumSquares(const int *src, int n, long long *out) {
    int result = -1;
    int *copy = NULL;
    long long *squares = NULL;
    copy = malloc(((size_t)n + 1) * sizeof *copy);
    if (copy == NULL) {
        goto cleanup;
    }
    squares = malloc(((size_t)n + 1) * sizeof *squares);
    if (squares == NULL) {
        goto cleanup;
    }
    long long total = 0;
    for (int i = 0; i < n; i++) {
        copy[i] = src[i];
        squares[i] = (long long)copy[i] * copy[i];
        total += squares[i];
    }
    *out = total;
    result = 0;
cleanup:
    free(copy);
    return result;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    long long s = 0;
    if (sumSquares(a, n, &s) != 0) {
        return 1;
    }
    printf("ผลรวมกำลังสอง: %lld\n", s);
    return 0;
}
`] },
  "c2-memory/3": { sol: MI("#include <stdio.h>\n#include <stdlib.h>", R`    int n = 0;
    scanf("%d", &n);
    int *best = malloc(sizeof *best);
    if (best == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        if (i == 0 || v > *best) {
            *best = v;
        }
    }
    printf("สูงสุด: %d\n", *best);
    free(best);
    best = NULL;`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>", R`    int n = 0;
    scanf("%d", &n);
    int *best = malloc(sizeof *best);
    if (best == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        if (i == 0 || v > *best) {
            *best = v;
        }
    }
    printf("สูงสุด: %d\n", *best);`)] },
  "c2-memory/4": { sol: MI("#include <stdio.h>\n#include <stdlib.h>", R`    size_t cap = 4, count = 0;
    int *buf = malloc(cap * sizeof *buf);
    if (buf == NULL) {
        return 1;
    }
    int v = 0;
    while (scanf("%d", &v) == 1) {
        if (count == cap) {
            size_t newCap = cap * 2;
            int *tmp = realloc(buf, newCap * sizeof *buf);
            if (tmp == NULL) {
                free(buf);
                return 1;
            }
            buf = tmp;
            cap = newCap;
        }
        buf[count++] = v;
    }
    if (count == 0) {
        puts("จำนวน: 0");
    } else {
        int best = buf[0];
        for (size_t i = 1; i < count; i++) {
            if (buf[i] > best) {
                best = buf[i];
            }
        }
        printf("จำนวน: %zu · มากที่สุด: %d\n", count, best);
    }
    free(buf);`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>", R`    size_t cap = 4, count = 0;
    int *buf = malloc(cap * sizeof *buf);
    if (buf == NULL) {
        return 1;
    }
    int v = 0;
    while (scanf("%d", &v) == 1) {
        if (count == cap) {
            size_t newCap = cap * 2;
            int *tmp = realloc(buf, newCap * sizeof *buf);
            if (tmp == NULL) {
                free(buf);
                return 1;
            }
            buf = tmp;
            cap = newCap;
        }
        buf[count++] = v;
    }
    if (count == 0) {
        puts("จำนวน: 0");
    } else {
        int best = 0;
        for (size_t i = 0; i < count; i++) {
            if (buf[i] > best) {
                best = buf[i];
            }
        }
        printf("จำนวน: %zu · มากที่สุด: %d\n", count, best);
    }
    free(buf);`)] },
  "c2-memory/5": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void destroyBuffer(char **pbuf) {
    free(*pbuf);
    *pbuf = NULL;
}

int main(void) {
    char w[64] = "";
    scanf("%63s", w);
    char *buf = malloc(strlen(w) + 1);
    if (buf == NULL) {
        return 1;
    }
    strcpy(buf, w);
    printf("ข้อความ: %s\n", buf);
    destroyBuffer(&buf);
    destroyBuffer(&buf);
    printf("ปล่อยแล้ว: %d\n", buf == NULL);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void destroyBuffer(char **pbuf) {
    free(*pbuf);
}

int main(void) {
    char w[64] = "";
    scanf("%63s", w);
    char *buf = malloc(strlen(w) + 1);
    if (buf == NULL) {
        return 1;
    }
    strcpy(buf, w);
    printf("ข้อความ: %s\n", buf);
    destroyBuffer(&buf);
    destroyBuffer(&buf);
    printf("ปล่อยแล้ว: %d\n", buf == NULL);
    return 0;
}
`] },
  "c2-memory/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *joinWords(char *words[], int n, const char *sep) {
    size_t total = 1, seplen = strlen(sep);
    for (int i = 0; i < n; i++) {
        total += strlen(words[i]) + (i ? seplen : 0);
    }
    char *out = malloc(total);
    if (out == NULL) {
        return NULL;
    }
    out[0] = '\0';
    char *p = out;
    for (int i = 0; i < n; i++) {
        if (i) {
            memcpy(p, sep, seplen);
            p += seplen;
        }
        size_t len = strlen(words[i]);
        memcpy(p, words[i], len);
        p += len;
    }
    *p = '\0';
    return out;
}

char *repeatString(const char *s, long k) {
    long long len = (long long)strlen(s);
    if (len * k > 1000) {
        return NULL;
    }
    char *out = malloc((size_t)(len * k) + 1);
    if (out == NULL) {
        return NULL;
    }
    char *p = out;
    for (long i = 0; i < k; i++) {
        memcpy(p, s, (size_t)len);
        p += len;
    }
    *p = '\0';
    return out;
}

int main(void) {
    char line[512];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *tok[64];
        int n = 0;
        char *t = strtok(line, " ");
        while (t != NULL && n < 64) {
            tok[n++] = t;
            t = strtok(NULL, " ");
        }
        if (n >= 2 && strcmp(tok[0], "join") == 0) {
            if (n == 2) {
                puts("-");
                continue;
            }
            char *r = joinWords(&tok[2], n - 2, tok[1]);
            if (r == NULL) {
                return 1;
            }
            puts(r);
            free(r);
        } else if (n == 3 && strcmp(tok[0], "repeat") == 0) {
            char *end;
            long k = strtol(tok[1], &end, 10);
            if (end == tok[1] || *end != '\0' || k < 0) {
                puts("จำนวนไม่ถูกต้อง");
                continue;
            }
            char *r = repeatString(tok[2], k);
            if (r == NULL) {
                puts("ยาวเกิน");
                continue;
            }
            puts(r[0] ? r : "(ว่าง)");
            free(r);
        } else {
            puts("ไม่รู้จักคำสั่ง");
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *joinWords(char *words[], int n, const char *sep) {
    size_t total = 1, seplen = strlen(sep);
    for (int i = 0; i < n; i++) {
        total += strlen(words[i]) + (i ? seplen : 0);
    }
    char *out = malloc(total);
    if (out == NULL) {
        return NULL;
    }
    out[0] = '\0';
    for (int i = 0; i < n; i++) {
        if (i) {
            strcat(out, sep);
        }
        strcat(out, words[i]);
    }
    return out;
}

char *repeatString(const char *s, long k) {
    long long len = (long long)strlen(s);
    if (len * k > 1000) {
        return NULL;
    }
    char *out = malloc((size_t)(len * k) + 1);
    if (out == NULL) {
        return NULL;
    }
    out[0] = '\0';
    for (long i = 0; i < k; i++) {
        strcat(out, s);
    }
    return out;
}

int main(void) {
    char line[512];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *tok[64];
        int n = 0;
        char *t = strtok(line, " ");
        while (t != NULL && n < 64) {
            tok[n++] = t;
            t = strtok(NULL, " ");
        }
        if (n >= 2 && strcmp(tok[0], "join") == 0) {
            if (n == 2) {
                puts("-");
                continue;
            }
            char *r = joinWords(&tok[2], n - 2, tok[1]);
            if (r == NULL) {
                return 1;
            }
            puts(r);
        } else if (n == 3 && strcmp(tok[0], "repeat") == 0) {
            char *end;
            long k = strtol(tok[1], &end, 10);
            if (end == tok[1] || *end != '\0' || k < 0) {
                puts("จำนวนไม่ถูกต้อง");
                continue;
            }
            char *r = repeatString(tok[2], k);
            if (r == NULL) {
                puts("ยาวเกิน");
                continue;
            }
            puts(r[0] ? r : "(ว่าง)");
            free(r);
        } else {
            puts("ไม่รู้จักคำสั่ง");
        }
    }
    return 0;
}
`] },
  "c2-memory/7": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

static long findName(char **names, size_t count, const char *name) {
    for (size_t i = 0; i < count; i++) {
        if (strcmp(names[i], name) == 0) {
            return (long)i;
        }
    }
    return -1;
}

static int grow(char ***names, char ***phones, size_t *cap) {
    size_t newCap = *cap ? *cap * 2 : 2;
    char **n2 = realloc(*names, newCap * sizeof **names);
    if (n2 == NULL) {
        return 0;
    }
    *names = n2;
    char **p2 = realloc(*phones, newCap * sizeof **phones);
    if (p2 == NULL) {
        return 0;
    }
    *phones = p2;
    *cap = newCap;
    return 1;
}

int main(void) {
    char **names = NULL, **phones = NULL;
    size_t count = 0, cap = 0;
    char cmd[16], a[64], b[64];
    int ok = 1;
    while (ok && scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0 && scanf("%63s %63s", a, b) == 2) {
            if (findName(names, count, a) >= 0) {
                puts("มีชื่อนี้แล้ว");
                continue;
            }
            if (count == cap && !grow(&names, &phones, &cap)) {
                ok = 0;
                break;
            }
            names[count] = dupString(a);
            phones[count] = dupString(b);
            count++;
            printf("เพิ่ม %s\n", a);
        } else if (strcmp(cmd, "del") == 0 && scanf("%63s", a) == 1) {
            long i = findName(names, count, a);
            if (i < 0) {
                printf("ไม่พบ %s\n", a);
                continue;
            }
            free(names[i]);
            free(phones[i]);
            for (size_t k = (size_t)i; k + 1 < count; k++) {
                names[k] = names[k + 1];
                phones[k] = phones[k + 1];
            }
            count--;
            printf("ลบ %s\n", a);
        } else if (strcmp(cmd, "find") == 0 && scanf("%63s", a) == 1) {
            long i = findName(names, count, a);
            if (i < 0) {
                printf("ไม่พบ %s\n", a);
            } else {
                printf("%s: %s\n", names[i], phones[i]);
            }
        } else if (strcmp(cmd, "list") == 0) {
            if (count == 0) {
                puts("(ว่าง)");
                continue;
            }
            for (size_t i = 0; i < count; i++) {
                for (size_t j = i + 1; j < count; j++) {
                    if (strcmp(names[j], names[i]) < 0) {
                        char *t = names[i]; names[i] = names[j]; names[j] = t;
                        t = phones[i]; phones[i] = phones[j]; phones[j] = t;
                    }
                }
            }
            for (size_t i = 0; i < count; i++) {
                printf("%s: %s\n", names[i], phones[i]);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวน: %zu · ความจุ: %zu\n", count, cap);
        }
    }
    for (size_t i = 0; i < count; i++) {
        free(names[i]);
        free(phones[i]);
    }
    free(names);
    free(phones);
    return ok ? 0 : 1;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

static long findName(char **names, size_t count, const char *name) {
    for (size_t i = 0; i < count; i++) {
        if (strcmp(names[i], name) == 0) {
            return (long)i;
        }
    }
    return -1;
}

int main(void) {
    char **names = NULL, **phones = NULL;
    size_t count = 0, cap = 0;
    char cmd[16], a[64], b[64];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0 && scanf("%63s %63s", a, b) == 2) {
            if (findName(names, count, a) >= 0) {
                puts("มีชื่อนี้แล้ว");
                continue;
            }
            if (count == cap) {
                size_t newCap = cap ? cap * 2 : 2;
                char **n2 = realloc(names, newCap * sizeof *names);
                char **p2 = realloc(phones, newCap * sizeof *phones);
                if (n2 == NULL || p2 == NULL) {
                    return 1;
                }
                names = n2;
                phones = p2;
                cap = newCap;
            }
            names[count] = dupString(a);
            phones[count] = dupString(b);
            count++;
            printf("เพิ่ม %s\n", a);
        } else if (strcmp(cmd, "del") == 0 && scanf("%63s", a) == 1) {
            long i = findName(names, count, a);
            if (i < 0) {
                printf("ไม่พบ %s\n", a);
                continue;
            }
            for (size_t k = (size_t)i; k + 1 < count; k++) {
                names[k] = names[k + 1];
                phones[k] = phones[k + 1];
            }
            count--;
            printf("ลบ %s\n", a);
        } else if (strcmp(cmd, "find") == 0 && scanf("%63s", a) == 1) {
            long i = findName(names, count, a);
            if (i < 0) {
                printf("ไม่พบ %s\n", a);
            } else {
                printf("%s: %s\n", names[i], phones[i]);
            }
        } else if (strcmp(cmd, "list") == 0) {
            if (count == 0) {
                puts("(ว่าง)");
                continue;
            }
            for (size_t i = 0; i < count; i++) {
                for (size_t j = i + 1; j < count; j++) {
                    if (strcmp(names[j], names[i]) < 0) {
                        char *t = names[i]; names[i] = names[j]; names[j] = t;
                        t = phones[i]; phones[i] = phones[j]; phones[j] = t;
                    }
                }
            }
            for (size_t i = 0; i < count; i++) {
                printf("%s: %s\n", names[i], phones[i]);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวน: %zu · ความจุ: %zu\n", count, cap);
        }
    }
    for (size_t i = 0; i < count; i++) {
        free(names[i]);
        free(phones[i]);
    }
    free(names);
    free(phones);
    return 0;
}
`] },

  // ── Stage 18: struct typedef และ enum ──
  "c2-struct/0": { sol: R`#include <stdio.h>
#include <stdlib.h>

struct Point {
    int x;
    int y;
};

int manhattan(struct Point a, struct Point b) {
    return abs(a.x - b.x) + abs(a.y - b.y);
}

int main(void) {
    struct Point a, b;
    scanf("%d %d %d %d", &a.x, &a.y, &b.x, &b.y);
    printf("ระยะแมนฮัตตัน: %d\n", manhattan(a, b));
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

struct Point {
    int x;
    int y;
};

int manhattan(struct Point a, struct Point b) {
    return abs(a.x - b.x + a.y - b.y);
}

int main(void) {
    struct Point a, b;
    scanf("%d %d %d %d", &a.x, &a.y, &b.x, &b.y);
    printf("ระยะแมนฮัตตัน: %d\n", manhattan(a, b));
    return 0;
}
`] },
  "c2-struct/1": { sol: R`#include <stdio.h>

typedef struct {
    char name[32];
    int hp;
    int atk;
} Hero;

int main(void) {
    int dmg = 0;
    scanf("%d", &dmg);
    Hero h = { .name = "Aria", .hp = 100, .atk = 15 };
    Hero *p = &h;
    p->hp -= dmg;
    if (p->hp < 0) {
        p->hp = 0;
    }
    printf("%s HP: %d ATK: %d\n", h.name, h.hp, p->atk);
    return 0;
}
`, wrong: [R`#include <stdio.h>

typedef struct {
    char name[32];
    int hp;
    int atk;
} Hero;

int main(void) {
    int dmg = 0;
    scanf("%d", &dmg);
    Hero h = { .name = "Aria", .hp = 100, .atk = 15 };
    Hero copy = h;
    copy.hp -= dmg;
    printf("%s HP: %d ATK: %d\n", h.name, h.hp, h.atk);
    return 0;
}
`] },
  "c2-struct/2": { sol: R`#include <stdio.h>

typedef struct {
    char name[32];
    int level;
    int hp;
} Hero;

void levelUp(Hero *h) {
    h->level++;
    h->hp += 20;
}

int main(void) {
    Hero h = { .name = "Bo", .level = 1, .hp = 100 };
    int times = 0;
    scanf("%d", &times);
    for (int i = 0; i < times; i++) {
        levelUp(&h);
    }
    printf("%s Lv.%d HP %d\n", h.name, h.level, h.hp);
    return 0;
}
`, wrong: [R`#include <stdio.h>

typedef struct {
    char name[32];
    int level;
    int hp;
} Hero;

void levelUp(Hero *h) {
    h->level++;
    h->hp += 2;
}

int main(void) {
    Hero h = { .name = "Bo", .level = 1, .hp = 100 };
    int times = 0;
    scanf("%d", &times);
    for (int i = 0; i < times; i++) {
        levelUp(&h);
    }
    printf("%s Lv.%d HP %d\n", h.name, h.level, h.hp);
    return 0;
}
`] },
  "c2-struct/3": { sol: R`#include <stdio.h>

enum Status { PENDING, PAID, SHIPPED, DELIVERED, CANCELLED };

const char *statusName(enum Status s) {
    switch (s) {
        case PENDING: return "รอชำระ";
        case PAID: return "ชำระแล้ว";
        case SHIPPED: return "กำลังจัดส่ง";
        case DELIVERED: return "ส่งถึงแล้ว";
        case CANCELLED: return "ยกเลิก";
    }
    return "";
}

int main(void) {
    int code = 0;
    scanf("%d", &code);
    if (code < PENDING || code > CANCELLED) {
        puts("ไม่รู้จักสถานะ");
        return 0;
    }
    enum Status s = (enum Status)code;
    puts(statusName(s));
    printf("ยกเลิกได้: %s\n", (s == PENDING || s == PAID) ? "ใช่" : "ไม่");
    return 0;
}
`, wrong: [R`#include <stdio.h>

enum Status { PENDING, PAID, SHIPPED, DELIVERED, CANCELLED };

const char *statusName(enum Status s) {
    switch (s) {
        case PENDING: return "รอชำระ";
        case PAID: return "ชำระแล้ว";
        case SHIPPED: return "กำลังจัดส่ง";
        case DELIVERED: return "ส่งถึงแล้ว";
        case CANCELLED: return "ยกเลิก";
    }
    return "";
}

int main(void) {
    int code = 0;
    scanf("%d", &code);
    if (code < PENDING || code > CANCELLED) {
        puts("ไม่รู้จักสถานะ");
        return 0;
    }
    enum Status s = (enum Status)code;
    puts(statusName(s));
    printf("ยกเลิกได้: %s\n", (s != CANCELLED) ? "ใช่" : "ไม่");
    return 0;
}
`] },
  "c2-struct/4": { sol: R`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[32];
    int score;
} Entry;

static int before(const Entry *a, const Entry *b) {
    if (a->score != b->score) {
        return a->score > b->score;
    }
    return strcmp(a->name, b->name) < 0;
}

int main(void) {
    Entry e[50];
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%31s %d", e[i].name, &e[i].score);
    }
    if (n == 0) {
        puts("(ไม่มีข้อมูล)");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (before(&e[j], &e[i])) {
                Entry t = e[i];
                e[i] = e[j];
                e[j] = t;
            }
        }
    }
    for (int i = 0; i < n; i++) {
        printf("%d. %s %d\n", i + 1, e[i].name, e[i].score);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[32];
    int score;
} Entry;

int main(void) {
    Entry e[50];
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%31s %d", e[i].name, &e[i].score);
    }
    if (n == 0) {
        puts("(ไม่มีข้อมูล)");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (e[j].score > e[i].score) {
                Entry t = e[i];
                e[i] = e[j];
                e[j] = t;
            }
        }
    }
    for (int i = 0; i < n; i++) {
        printf("%d. %s %d\n", i + 1, e[i].name, e[i].score);
    }
    return 0;
}
`] },
  "c2-struct/5": { sol: R`#include <stdio.h>

struct Point {
    int x;
    int y;
};

struct Rect {
    struct Point topLeft;
    int w;
    int h;
};

static int contains(const struct Rect *r, struct Point p) {
    return p.x >= r->topLeft.x && p.x <= r->topLeft.x + r->w &&
           p.y >= r->topLeft.y && p.y <= r->topLeft.y + r->h;
}

int main(void) {
    struct Rect r;
    scanf("%d %d %d %d", &r.topLeft.x, &r.topLeft.y, &r.w, &r.h);
    int q = 0;
    scanf("%d", &q);
    for (int i = 0; i < q; i++) {
        struct Point p;
        scanf("%d %d", &p.x, &p.y);
        puts(contains(&r, p) ? "ใน" : "นอก");
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

struct Point {
    int x;
    int y;
};

struct Rect {
    struct Point topLeft;
    int w;
    int h;
};

static int contains(const struct Rect *r, struct Point p) {
    return p.x >= r->topLeft.x && p.x < r->topLeft.x + r->w &&
           p.y >= r->topLeft.y && p.y < r->topLeft.y + r->h;
}

int main(void) {
    struct Rect r;
    scanf("%d %d %d %d", &r.topLeft.x, &r.topLeft.y, &r.w, &r.h);
    int q = 0;
    scanf("%d", &q);
    for (int i = 0; i < q; i++) {
        struct Point p;
        scanf("%d %d", &p.x, &p.y);
        puts(contains(&r, p) ? "ใน" : "นอก");
    }
    return 0;
}
`] },
  "c2-struct/6": { sol: R`#include <stdio.h>
#include <string.h>

typedef struct {
    char id[16];
    char name[32];
    int s[3];
} Student;

static double average(const Student *st) {
    return (st->s[0] + st->s[1] + st->s[2]) / 3.0;
}

static int findId(const Student list[], int n, const char *id) {
    for (int i = 0; i < n; i++) {
        if (strcmp(list[i].id, id) == 0) {
            return i;
        }
    }
    return -1;
}

int main(void) {
    Student list[50];
    int n = 0;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            Student st;
            if (scanf("%15s %31s %d %d %d", st.id, st.name, &st.s[0], &st.s[1], &st.s[2]) != 5) {
                break;
            }
            if (findId(list, n, st.id) >= 0) {
                puts("รหัสซ้ำ");
            } else if (st.s[0] < 0 || st.s[0] > 100 || st.s[1] < 0 || st.s[1] > 100 || st.s[2] < 0 || st.s[2] > 100) {
                puts("คะแนนไม่ถูกต้อง");
            } else if (n < 50) {
                list[n++] = st;
                printf("เพิ่ม %s\n", st.id);
            }
        } else if (strcmp(cmd, "avg") == 0) {
            char id[16];
            if (scanf("%15s", id) != 1) {
                break;
            }
            int i = findId(list, n, id);
            if (i < 0) {
                printf("ไม่พบ %s\n", id);
            } else {
                printf("%s %s เฉลี่ย %.2f\n", list[i].id, list[i].name, average(&list[i]));
            }
        } else if (strcmp(cmd, "top") == 0) {
            if (n == 0) {
                puts("ยังไม่มีนักเรียน");
                continue;
            }
            int best = 0;
            for (int i = 1; i < n; i++) {
                if (average(&list[i]) > average(&list[best])) {
                    best = i;
                }
            }
            printf("สูงสุด: %s %s (%.2f)\n", list[best].id, list[best].name, average(&list[best]));
        } else if (strcmp(cmd, "list") == 0) {
            if (n == 0) {
                puts("ยังไม่มีนักเรียน");
                continue;
            }
            Student sorted[50];
            for (int i = 0; i < n; i++) {
                sorted[i] = list[i];
            }
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (strcmp(sorted[j].id, sorted[i].id) < 0) {
                        Student t = sorted[i];
                        sorted[i] = sorted[j];
                        sorted[j] = t;
                    }
                }
            }
            for (int i = 0; i < n; i++) {
                printf("%s %s %.2f\n", sorted[i].id, sorted[i].name, average(&sorted[i]));
            }
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

typedef struct {
    char id[16];
    char name[32];
    int s[3];
} Student;

static double average(const Student *st) {
    return (st->s[0] + st->s[1] + st->s[2]) / 3.0;
}

static int findId(const Student list[], int n, const char *id) {
    for (int i = 0; i < n; i++) {
        if (strcmp(list[i].id, id) == 0) {
            return i;
        }
    }
    return -1;
}

int main(void) {
    Student list[50];
    int n = 0;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            Student st;
            if (scanf("%15s %31s %d %d %d", st.id, st.name, &st.s[0], &st.s[1], &st.s[2]) != 5) {
                break;
            }
            if (findId(list, n, st.id) >= 0) {
                puts("รหัสซ้ำ");
            } else if (st.s[0] < 0 || st.s[0] > 100 || st.s[1] < 0 || st.s[1] > 100 || st.s[2] < 0 || st.s[2] > 100) {
                puts("คะแนนไม่ถูกต้อง");
            } else if (n < 50) {
                list[n++] = st;
                printf("เพิ่ม %s\n", st.id);
            }
        } else if (strcmp(cmd, "avg") == 0) {
            char id[16];
            if (scanf("%15s", id) != 1) {
                break;
            }
            int i = findId(list, n, id);
            if (i < 0) {
                printf("ไม่พบ %s\n", id);
            } else {
                printf("%s %s เฉลี่ย %.2f\n", list[i].id, list[i].name, average(&list[i]));
            }
        } else if (strcmp(cmd, "top") == 0) {
            if (n == 0) {
                puts("ยังไม่มีนักเรียน");
                continue;
            }
            int best = 0;
            for (int i = 1; i < n; i++) {
                if (average(&list[i]) > average(&list[best])) {
                    best = i;
                }
            }
            printf("สูงสุด: %s %s (%.2f)\n", list[best].id, list[best].name, average(&list[best]));
        } else if (strcmp(cmd, "list") == 0) {
            if (n == 0) {
                puts("ยังไม่มีนักเรียน");
                continue;
            }
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (strcmp(list[j].id, list[i].id) < 0) {
                        Student t = list[i];
                        list[i] = list[j];
                        list[j] = t;
                    }
                }
            }
            for (int i = 0; i < n; i++) {
                printf("%s %s %.2f\n", list[i].id, list[i].name, average(&list[i]));
            }
        }
    }
    return 0;
}
`] },
  // ── Stage 19: ไฟล์ข้อความ ──
  "c2-textfile/0": { sol: M(R`    FILE *f = fopen("/data/scores.txt", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    int x = 0, count = 0;
    long long sum = 0;
    while (fscanf(f, "%d", &x) == 1) {
        count++;
        sum += x;
    }
    fclose(f);
    printf("จำนวน: %d · รวม: %lld\n", count, sum);`), wrong: [M(R`    FILE *f = fopen("/data/scores.txt", "r");
    int x = 0, count = 0;
    long long sum = 0;
    while (fscanf(f, "%d", &x) == 1) {
        count++;
        sum += x;
    }
    fclose(f);
    printf("จำนวน: %d · รวม: %lld\n", count, sum);`)] },
  "c2-textfile/1": { sol: M(R`    int n = 0;
    scanf("%d", &n);
    FILE *f = fopen("/data/squares.txt", "w");
    if (f == NULL) {
        return 1;
    }
    for (int i = 1; i <= n; i++) {
        fprintf(f, "%d\n", i * i);
    }
    fclose(f);
    f = fopen("/data/squares.txt", "r");
    if (f == NULL) {
        return 1;
    }
    int x = 0, lines = 0;
    long long sum = 0;
    while (fscanf(f, "%d", &x) == 1) {
        lines++;
        sum += x;
    }
    fclose(f);
    printf("บรรทัด: %d · รวม: %lld\n", lines, sum);`), wrong: [M(R`    int n = 0;
    scanf("%d", &n);
    FILE *f = fopen("/data/squares.txt", "w");
    if (f == NULL) {
        return 1;
    }
    for (int i = 1; i < n; i++) {
        fprintf(f, "%d\n", i * i);
    }
    fclose(f);
    f = fopen("/data/squares.txt", "r");
    if (f == NULL) {
        return 1;
    }
    int x = 0, lines = 0;
    long long sum = 0;
    while (fscanf(f, "%d", &x) == 1) {
        lines++;
        sum += x;
    }
    fclose(f);
    printf("บรรทัด: %d · รวม: %lld\n", lines, sum);`)] },
  "c2-textfile/2": { sol: M(R`    FILE *f = fopen("/data/nums.txt", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    int x = 0, count = 0;
    long long sum = 0;
    while (fscanf(f, "%d", &x) == 1) {
        count++;
        sum += x;
    }
    fclose(f);
    printf("จำนวน: %d · รวม: %lld\n", count, sum);`), wrong: [M(R`    FILE *f = fopen("/data/nums.txt", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    int x = 0, count = 0;
    long long sum = 0;
    while (!feof(f)) {
        if (fscanf(f, "%d", &x) != 1) {
            x = 0;
        }
        count++;
        sum += x;
    }
    fclose(f);
    printf("จำนวน: %d · รวม: %lld\n", count, sum);`)] },
  "c2-textfile/3": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    char msg[128] = "";
    if (fgets(msg, sizeof msg, stdin) == NULL) {
        return 0;
    }
    msg[strcspn(msg, "\n")] = '\0';
    FILE *f = fopen("/data/log.txt", "a");
    if (f == NULL) {
        return 1;
    }
    fprintf(f, "LOG: %s\n", msg);
    fclose(f);
    f = fopen("/data/log.txt", "r");
    if (f == NULL) {
        return 1;
    }
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        fputs(line, stdout);
    }
    fclose(f);`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    char msg[128] = "";
    if (fgets(msg, sizeof msg, stdin) == NULL) {
        return 0;
    }
    msg[strcspn(msg, "\n")] = '\0';
    FILE *f = fopen("/data/log.txt", "a");
    if (f == NULL) {
        return 1;
    }
    fprintf(f, "LOG: %s\n", msg);
    fclose(f);
    printf("LOG: %s\n", msg);`)] },
  "c2-textfile/4": { sol: MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>", R`    FILE *f = fopen("/data/expenses.csv", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    char line[256];
    int valid = 0, skipped = 0;
    long long total = 0;
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        char *field[4];
        int n = 0;
        char *tok = strtok(line, ",");
        while (tok != NULL && n < 4) {
            field[n++] = tok;
            tok = strtok(NULL, ",");
        }
        char *end = NULL;
        long v = n == 3 ? strtol(field[2], &end, 10) : -1;
        if (n != 3 || end == field[2] || *end != '\0' || v < 0) {
            skipped++;
            continue;
        }
        valid++;
        total += v;
    }
    fclose(f);
    printf("รายการที่ใช้ได้: %d · รวม: %lld บาท\nข้าม: %d บรรทัด\n", valid, total, skipped);`), wrong: [MI("#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>", R`    FILE *f = fopen("/data/expenses.csv", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    char line[256];
    int valid = 0, skipped = 0;
    long long total = 0;
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *field[4];
        int n = 0;
        char *tok = strtok(line, ",");
        while (tok != NULL && n < 4) {
            field[n++] = tok;
            tok = strtok(NULL, ",");
        }
        if (n != 3) {
            skipped++;
            continue;
        }
        valid++;
        total += atoi(field[2]);
    }
    fclose(f);
    printf("รายการที่ใช้ได้: %d · รวม: %lld บาท\nข้าม: %d บรรทัด\n", valid, total, skipped);`)] },
  "c2-textfile/5": { sol: MI("#include <stdio.h>\n#include <string.h>", R`    FILE *in = fopen("/data/poem.txt", "r");
    if (in == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    FILE *out = fopen("/data/numbered.txt", "w");
    if (out == NULL) {
        fclose(in);
        return 1;
    }
    char line[256];
    int no = 0;
    while (fgets(line, sizeof line, in) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        fprintf(out, "%d: %s\n", ++no, line);
    }
    fclose(in);
    fclose(out);
    FILE *back = fopen("/data/numbered.txt", "r");
    if (back == NULL) {
        return 1;
    }
    while (fgets(line, sizeof line, back) != NULL) {
        fputs(line, stdout);
    }
    fclose(back);`), wrong: [MI("#include <stdio.h>\n#include <string.h>", R`    FILE *in = fopen("/data/poem.txt", "r");
    if (in == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    FILE *out = fopen("/data/numbered.txt", "w");
    if (out == NULL) {
        fclose(in);
        return 1;
    }
    char line[256];
    int no = 0;
    while (fgets(line, sizeof line, in) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        fprintf(out, "%d: %s\n", ++no, line);
    }
    fclose(in);
    fclose(out);
    FILE *back = fopen("/data/numbered.txt", "r");
    if (back == NULL) {
        return 1;
    }
    while (fgets(line, sizeof line, back) != NULL) {
        fputs(line, stdout);
    }
    fclose(back);`)] },
  "c2-textfile/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILE_PATH "/data/expenses.txt"

typedef struct {
    char name[32];
    long long sum;
} Category;

static int loadAll(Category list[], int max) {
    FILE *f = fopen(FILE_PATH, "r");
    if (f == NULL) {
        return 0;
    }
    int n = 0;
    char name[32];
    long long amount = 0;
    while (fscanf(f, "%31s %lld", name, &amount) == 2) {
        int i = 0;
        while (i < n && strcmp(list[i].name, name) != 0) {
            i++;
        }
        if (i == n) {
            if (n == max) {
                continue;
            }
            strcpy(list[n].name, name);
            list[n].sum = 0;
            n++;
        }
        list[i].sum += amount;
    }
    fclose(f);
    return n;
}

int main(void) {
    char cmd[16], cat[32], amount[32];
    Category list[100];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            if (scanf("%31s %31s", cat, amount) != 2) {
                break;
            }
            char *end;
            long long v = strtoll(amount, &end, 10);
            if (end == amount || *end != '\0' || v < 0) {
                puts("จำนวนไม่ถูกต้อง");
                continue;
            }
            FILE *f = fopen(FILE_PATH, "a");
            if (f == NULL) {
                return 1;
            }
            fprintf(f, "%s %lld\n", cat, v);
            fclose(f);
            printf("บันทึก %s %lld\n", cat, v);
        } else if (strcmp(cmd, "total") == 0) {
            int n = loadAll(list, 100);
            long long t = 0;
            for (int i = 0; i < n; i++) {
                t += list[i].sum;
            }
            printf("รวม: %lld บาท\n", t);
        } else if (strcmp(cmd, "by") == 0) {
            if (scanf("%31s", cat) != 1) {
                break;
            }
            int n = loadAll(list, 100);
            long long t = 0;
            for (int i = 0; i < n; i++) {
                if (strcmp(list[i].name, cat) == 0) {
                    t = list[i].sum;
                }
            }
            printf("%s: %lld บาท\n", cat, t);
        } else if (strcmp(cmd, "cats") == 0) {
            int n = loadAll(list, 100);
            if (n == 0) {
                puts("(ไม่มีข้อมูล)");
                continue;
            }
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (strcmp(list[j].name, list[i].name) < 0) {
                        Category t = list[i];
                        list[i] = list[j];
                        list[j] = t;
                    }
                }
            }
            for (int i = 0; i < n; i++) {
                printf("%s: %lld บาท\n", list[i].name, list[i].sum);
            }
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILE_PATH "/data/expenses.txt"

int main(void) {
    char cmd[16], cat[32], amount[32];
    long long total = 0;
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            if (scanf("%31s %31s", cat, amount) != 2) {
                break;
            }
            char *end;
            long long v = strtoll(amount, &end, 10);
            if (end == amount || *end != '\0' || v < 0) {
                puts("จำนวนไม่ถูกต้อง");
                continue;
            }
            total += v;
            printf("บันทึก %s %lld\n", cat, v);
        } else if (strcmp(cmd, "total") == 0) {
            printf("รวม: %lld บาท\n", total);
        } else if (strcmp(cmd, "by") == 0) {
            if (scanf("%31s", cat) != 1) {
                break;
            }
            printf("%s: %lld บาท\n", cat, total);
        } else if (strcmp(cmd, "cats") == 0) {
            puts("(ไม่มีข้อมูล)");
        }
    }
    return 0;
}
`] },
  // ── Stage 20: ไฟล์ไบนารี union และ data layout ──
  "c2-binfile/0": { sol: M(R`    int a[100] = {0}, b[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    FILE *f = fopen("/data/nums.bin", "wb");
    if (f == NULL) {
        return 1;
    }
    fwrite(a, sizeof a[0], (size_t)n, f);
    fclose(f);
    f = fopen("/data/nums.bin", "rb");
    if (f == NULL) {
        return 1;
    }
    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    rewind(f);
    size_t got = fread(b, sizeof b[0], 100, f);
    fclose(f);
    long long sum = 0;
    for (size_t i = 0; i < got; i++) {
        sum += b[i];
    }
    printf("ขนาดไฟล์: %ld ไบต์\nอ่านได้: %zu ค่า · รวม: %lld\n", size, got, sum);`), wrong: [M(R`    int a[100] = {0}, b[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    FILE *f = fopen("/data/nums.bin", "wb");
    if (f == NULL) {
        return 1;
    }
    fwrite(a, 1, (size_t)n, f);
    fclose(f);
    f = fopen("/data/nums.bin", "rb");
    if (f == NULL) {
        return 1;
    }
    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    rewind(f);
    size_t got = fread(b, sizeof b[0], 100, f);
    fclose(f);
    long long sum = 0;
    for (size_t i = 0; i < got; i++) {
        sum += b[i];
    }
    printf("ขนาดไฟล์: %ld ไบต์\nอ่านได้: %zu ค่า · รวม: %lld\n", size, got, sum);`)] },
  "c2-binfile/1": { sol: R`#include <stdio.h>

struct Rec {
    int id;
    int score;
};

int main(void) {
    int k = 0;
    scanf("%d", &k);
    FILE *f = fopen("/data/recs.bin", "wb");
    if (f == NULL) {
        return 1;
    }
    for (int i = 0; i < k; i++) {
        struct Rec r = { .id = i + 1, .score = 0 };
        scanf("%d", &r.score);
        fwrite(&r, sizeof r, 1, f);
    }
    fclose(f);
    int idx = 0;
    scanf("%d", &idx);
    if (idx < 0 || idx >= k) {
        puts("ไม่มีรายการนี้");
        return 0;
    }
    f = fopen("/data/recs.bin", "rb");
    if (f == NULL) {
        return 1;
    }
    struct Rec r = {0};
    fseek(f, (long)(idx * sizeof(struct Rec)), SEEK_SET);
    if (fread(&r, sizeof r, 1, f) == 1) {
        printf("รายการที่ %d: id=%d score=%d\n", idx, r.id, r.score);
    }
    fclose(f);
    return 0;
}
`, wrong: [R`#include <stdio.h>

struct Rec {
    int id;
    int score;
};

int main(void) {
    int k = 0;
    scanf("%d", &k);
    FILE *f = fopen("/data/recs.bin", "wb");
    if (f == NULL) {
        return 1;
    }
    for (int i = 0; i < k; i++) {
        struct Rec r = { .id = i + 1, .score = 0 };
        scanf("%d", &r.score);
        fwrite(&r, sizeof r, 1, f);
    }
    fclose(f);
    int idx = 0;
    scanf("%d", &idx);
    if (idx < 0 || idx >= k) {
        puts("ไม่มีรายการนี้");
        return 0;
    }
    f = fopen("/data/recs.bin", "rb");
    if (f == NULL) {
        return 1;
    }
    struct Rec r = {0};
    fseek(f, (long)idx, SEEK_SET);
    if (fread(&r, sizeof r, 1, f) == 1) {
        printf("รายการที่ %d: id=%d score=%d\n", idx, r.id, r.score);
    }
    fclose(f);
    return 0;
}
`] },
  "c2-binfile/2": { sol: R`#include <stdio.h>
#include <stddef.h>

struct A {
    char c;
    int i;
    char d;
};

struct B {
    int i;
    char c;
    char d;
};

int main(void) {
    printf("sizeof(A): %zu\n", sizeof(struct A));
    printf("sizeof(B): %zu\n", sizeof(struct B));
    printf("offsetof(A, i): %zu\n", offsetof(struct A, i));
    printf("offsetof(B, c): %zu\n", offsetof(struct B, c));
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stddef.h>

struct A {
    char c;
    int i;
    char d;
};

struct B {
    int i;
    char c;
    char d;
};

int main(void) {
    printf("sizeof(A): %zu\n", sizeof(char) + sizeof(int) + sizeof(char));
    printf("sizeof(B): %zu\n", sizeof(struct B));
    printf("offsetof(A, i): %zu\n", offsetof(struct A, i));
    printf("offsetof(B, c): %zu\n", offsetof(struct B, c));
    return 0;
}
`] },
  "c2-binfile/3": { sol: R`#include <stdio.h>

struct Rec {
    int amount;
};

int main(void) {
    int k = 0;
    scanf("%d", &k);
    FILE *f = fopen("/data/pay.bin", "wb");
    if (f == NULL) {
        return 1;
    }
    for (int i = 0; i < k; i++) {
        struct Rec w = {0};
        scanf("%d", &w.amount);
        fwrite(&w, sizeof w, 1, f);
    }
    fclose(f);
    f = fopen("/data/pay.bin", "rb");
    if (f == NULL) {
        return 1;
    }
    struct Rec r = {0};
    int n = 0;
    long long total = 0;
    while (fread(&r, sizeof r, 1, f) == 1) {
        n++;
        total += r.amount;
    }
    fclose(f);
    printf("อ่านได้: %d รายการ · รวม: %lld\n", n, total);
    return 0;
}
`, wrong: [R`#include <stdio.h>

struct Rec {
    int amount;
};

int main(void) {
    int k = 0;
    scanf("%d", &k);
    FILE *f = fopen("/data/pay.bin", "wb");
    if (f == NULL) {
        return 1;
    }
    for (int i = 0; i < k; i++) {
        struct Rec w = {0};
        scanf("%d", &w.amount);
        fwrite(&w, sizeof w, 1, f);
    }
    fclose(f);
    f = fopen("/data/pay.bin", "rb");
    if (f == NULL) {
        return 1;
    }
    struct Rec r = {0};
    int n = 0;
    long long total = 0;
    while (!feof(f)) {
        fread(&r, sizeof r, 1, f);
        n++;
        total += r.amount;
    }
    fclose(f);
    printf("อ่านได้: %d รายการ · รวม: %lld\n", n, total);
    return 0;
}
`] },
  "c2-binfile/4": { sol: MI("#include <stdio.h>\n#include <stdint.h>\n#include <inttypes.h>", R`    uint32_t v = 0;
    scanf("%" SCNu32, &v);
    printf("ค่า: 0x%08" PRIX32 "\n", v);
    const unsigned char *b = (const unsigned char *)&v;
    printf("ไบต์ในหน่วยความจำ: %02X %02X %02X %02X\n", b[0], b[1], b[2], b[3]);
    uint32_t one = 1;
    printf("เครื่องนี้: %s\n", *(const unsigned char *)&one == 1 ? "little-endian" : "big-endian");`), wrong: [MI("#include <stdio.h>\n#include <stdint.h>\n#include <inttypes.h>", R`    uint32_t v = 0;
    scanf("%" SCNu32, &v);
    printf("ค่า: 0x%08" PRIX32 "\n", v);
    const unsigned char *b = (const unsigned char *)&v;
    printf("ไบต์ในหน่วยความจำ: %02X %02X %02X %02X\n", b[0], b[1], b[2], b[3]);
    printf("เครื่องนี้: %s\n", b[0] == (v & 0xFF) && v != 0 ? "little-endian" : "big-endian");`)] },
  "c2-binfile/5": { sol: R`#include <stdio.h>

enum Kind { KIND_INT, KIND_REAL, KIND_TEXT };

struct Value {
    enum Kind kind;
    union {
        long i;
        double d;
        char s[16];
    } as;
};

int main(void) {
    struct Value vals[20];
    int n = 0;
    char t = 0;
    while (n < 20 && scanf(" %c", &t) == 1) {
        if (t == 'i' && scanf("%ld", &vals[n].as.i) == 1) {
            vals[n++].kind = KIND_INT;
        } else if (t == 'd' && scanf("%lf", &vals[n].as.d) == 1) {
            vals[n++].kind = KIND_REAL;
        } else if (t == 's' && scanf("%15s", vals[n].as.s) == 1) {
            vals[n++].kind = KIND_TEXT;
        } else {
            scanf("%*s");
            printf("ไม่รู้จักชนิด %c\n", t);
        }
    }
    if (n == 0) {
        puts("(ไม่มีข้อมูล)");
    }
    for (int i = 0; i < n; i++) {
        switch (vals[i].kind) {
            case KIND_INT: printf("จำนวนเต็ม: %ld\n", vals[i].as.i); break;
            case KIND_REAL: printf("ทศนิยม: %.2f\n", vals[i].as.d); break;
            case KIND_TEXT: printf("ข้อความ: %s\n", vals[i].as.s); break;
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

enum Kind { KIND_INT, KIND_REAL, KIND_TEXT };

struct Value {
    enum Kind kind;
    union {
        long i;
        double d;
        char s[16];
    } as;
};

int main(void) {
    struct Value vals[20];
    int n = 0;
    char t = 0;
    while (n < 20 && scanf(" %c", &t) == 1) {
        if (t == 'i' && scanf("%ld", &vals[n].as.i) == 1) {
            vals[n++].kind = KIND_INT;
        } else if (t == 'd' && scanf("%lf", &vals[n].as.d) == 1) {
            vals[n++].kind = KIND_REAL;
        } else if (t == 's' && scanf("%15s", vals[n].as.s) == 1) {
            vals[n++].kind = KIND_TEXT;
        } else {
            scanf("%*s");
            printf("ไม่รู้จักชนิด %c\n", t);
        }
    }
    if (n == 0) {
        puts("(ไม่มีข้อมูล)");
    }
    for (int i = 0; i < n; i++) {
        switch (vals[i].kind) {
            case KIND_INT: printf("จำนวนเต็ม: %ld\n", vals[i].as.i); break;
            case KIND_REAL: printf("ทศนิยม: %.2f\n", (double)vals[i].as.i); break;
            case KIND_TEXT: printf("ข้อความ: %s\n", vals[i].as.s); break;
        }
    }
    return 0;
}
`] },
  "c2-binfile/6": { sol: R`#include <stdio.h>
#include <string.h>

#define DB "/data/students.db"

typedef struct {
    int id;
    char name[24];
    int score;
} Student;

static long findRecord(int id, Student *out) {
    FILE *f = fopen(DB, "rb");
    if (f == NULL) {
        return -1;
    }
    Student s;
    long idx = 0;
    while (fread(&s, sizeof s, 1, f) == 1) {
        if (s.id == id) {
            if (out != NULL) {
                *out = s;
            }
            fclose(f);
            return idx;
        }
        idx++;
    }
    fclose(f);
    return -1;
}

int main(void) {
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int id = 0, score = 0;
            char name[64];
            if (scanf("%d %63s %d", &id, name, &score) != 3) {
                break;
            }
            if (findRecord(id, NULL) >= 0) {
                puts("รหัสซ้ำ");
                continue;
            }
            if (score < 0 || score > 100) {
                puts("คะแนนไม่ถูกต้อง");
                continue;
            }
            Student s;
            memset(&s, 0, sizeof s);
            s.id = id;
            snprintf(s.name, sizeof s.name, "%s", name);
            s.score = score;
            FILE *f = fopen(DB, "ab");
            if (f == NULL) {
                return 1;
            }
            fwrite(&s, sizeof s, 1, f);
            fclose(f);
            printf("เพิ่ม %d\n", id);
        } else if (strcmp(cmd, "get") == 0) {
            int id = 0;
            if (scanf("%d", &id) != 1) {
                break;
            }
            Student s;
            if (findRecord(id, &s) < 0) {
                printf("ไม่พบ %d\n", id);
            } else {
                printf("%d %s %d\n", s.id, s.name, s.score);
            }
        } else if (strcmp(cmd, "update") == 0) {
            int id = 0, score = 0;
            if (scanf("%d %d", &id, &score) != 2) {
                break;
            }
            if (score < 0 || score > 100) {
                puts("คะแนนไม่ถูกต้อง");
                continue;
            }
            Student s;
            long idx = findRecord(id, &s);
            if (idx < 0) {
                printf("ไม่พบ %d\n", id);
                continue;
            }
            s.score = score;
            FILE *f = fopen(DB, "r+b");
            if (f == NULL) {
                return 1;
            }
            fseek(f, idx * (long)sizeof(Student), SEEK_SET);
            fwrite(&s, sizeof s, 1, f);
            fclose(f);
            printf("แก้ไข %d\n", id);
        } else if (strcmp(cmd, "list") == 0 || strcmp(cmd, "stats") == 0) {
            FILE *f = fopen(DB, "rb");
            Student s;
            int n = 0;
            long long sum = 0;
            int isList = strcmp(cmd, "list") == 0;
            while (f != NULL && fread(&s, sizeof s, 1, f) == 1) {
                n++;
                sum += s.score;
                if (isList) {
                    printf("%d %s %d\n", s.id, s.name, s.score);
                }
            }
            if (f != NULL) {
                fclose(f);
            }
            if (isList && n == 0) {
                puts("(ว่าง)");
            } else if (!isList) {
                if (n == 0) {
                    puts("จำนวน: 0");
                } else {
                    printf("จำนวน: %d · เฉลี่ย: %.2f\n", n, (double)sum / n);
                }
            }
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

#define DB "/data/students.db"

typedef struct {
    int id;
    char name[24];
    int score;
} Student;

static long findRecord(int id, Student *out) {
    FILE *f = fopen(DB, "rb");
    if (f == NULL) {
        return -1;
    }
    Student s;
    long idx = 0;
    while (fread(&s, sizeof s, 1, f) == 1) {
        if (s.id == id) {
            if (out != NULL) {
                *out = s;
            }
            fclose(f);
            return idx;
        }
        idx++;
    }
    fclose(f);
    return -1;
}

int main(void) {
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int id = 0, score = 0;
            char name[64];
            if (scanf("%d %63s %d", &id, name, &score) != 3) {
                break;
            }
            if (findRecord(id, NULL) >= 0) {
                puts("รหัสซ้ำ");
                continue;
            }
            if (score < 0 || score > 100) {
                puts("คะแนนไม่ถูกต้อง");
                continue;
            }
            Student s;
            memset(&s, 0, sizeof s);
            s.id = id;
            snprintf(s.name, sizeof s.name, "%s", name);
            s.score = score;
            FILE *f = fopen(DB, "ab");
            if (f == NULL) {
                return 1;
            }
            fwrite(&s, sizeof s, 1, f);
            fclose(f);
            printf("เพิ่ม %d\n", id);
        } else if (strcmp(cmd, "get") == 0) {
            int id = 0;
            if (scanf("%d", &id) != 1) {
                break;
            }
            Student s;
            if (findRecord(id, &s) < 0) {
                printf("ไม่พบ %d\n", id);
            } else {
                printf("%d %s %d\n", s.id, s.name, s.score);
            }
        } else if (strcmp(cmd, "update") == 0) {
            int id = 0, score = 0;
            if (scanf("%d %d", &id, &score) != 2) {
                break;
            }
            if (score < 0 || score > 100) {
                puts("คะแนนไม่ถูกต้อง");
                continue;
            }
            Student s;
            long idx = findRecord(id, &s);
            if (idx < 0) {
                printf("ไม่พบ %d\n", id);
                continue;
            }
            s.score = score;
            FILE *f = fopen(DB, "r+b");
            if (f == NULL) {
                return 1;
            }
            fseek(f, 0, SEEK_END);
            fwrite(&s, sizeof s, 1, f);
            fclose(f);
            printf("แก้ไข %d\n", id);
        } else if (strcmp(cmd, "list") == 0 || strcmp(cmd, "stats") == 0) {
            FILE *f = fopen(DB, "rb");
            Student s;
            int n = 0;
            long long sum = 0;
            int isList = strcmp(cmd, "list") == 0;
            while (f != NULL && fread(&s, sizeof s, 1, f) == 1) {
                n++;
                sum += s.score;
                if (isList) {
                    printf("%d %s %d\n", s.id, s.name, s.score);
                }
            }
            if (f != NULL) {
                fclose(f);
            }
            if (isList && n == 0) {
                puts("(ว่าง)");
            } else if (!isList) {
                if (n == 0) {
                    puts("จำนวน: 0");
                } else {
                    printf("จำนวน: %d · เฉลี่ย: %.2f\n", n, (double)sum / n);
                }
            }
        }
    }
    return 0;
}
`] },

  // ── Stage 21: โปรแกรมหลายไฟล์และการ link ──
  "c2-modular/0": { sol: R`// === mathutil.h ===
#ifndef MATHUTIL_H
#define MATHUTIL_H
int clamp(int v, int lo, int hi);
int gcd(int a, int b);
#endif

// === mathutil.c ===
#include "mathutil.h"

int clamp(int v, int lo, int hi) {
    if (v < lo) {
        return lo;
    }
    if (v > hi) {
        return hi;
    }
    return v;
}

int gcd(int a, int b) {
    while (b != 0) {
        int t = a % b;
        a = b;
        b = t;
    }
    return a;
}

// === main.c ===
#include <stdio.h>
#include "mathutil.h"

int main(void) {
    int v = 0, lo = 0, hi = 0, a = 0, b = 0;
    scanf("%d %d %d %d %d", &v, &lo, &hi, &a, &b);
    printf("clamp: %d\ngcd: %d\n", clamp(v, lo, hi), gcd(a, b));
    return 0;
}
`, wrong: [R`// === mathutil.h ===
#ifndef MATHUTIL_H
#define MATHUTIL_H
int clamp(int v, int lo, int hi);
int gcd(int a, int b);
#endif

// === mathutil.c ===
#include "mathutil.h"

int clamp(int v, int lo, int hi) {
    if (v > hi) {
        return hi;
    }
    return v;
}

int gcd(int a, int b) {
    while (b != 0) {
        int t = a % b;
        a = b;
        b = t;
    }
    return a;
}

// === main.c ===
#include <stdio.h>
#include "mathutil.h"

int main(void) {
    int v = 0, lo = 0, hi = 0, a = 0, b = 0;
    scanf("%d %d %d %d %d", &v, &lo, &hi, &a, &b);
    printf("clamp: %d\ngcd: %d\n", clamp(v, lo, hi), gcd(a, b));
    return 0;
}
`] },
  "c2-modular/1": { sol: R`// === point.h ===
#ifndef POINT_H
#define POINT_H

typedef struct {
    int x;
    int y;
} Point;

Point point_add(Point a, Point b);

#endif

// === geometry.h ===
#ifndef GEOMETRY_H
#define GEOMETRY_H
#include "point.h"

int point_dist2(Point a, Point b);

#endif

// === point.c ===
#include "point.h"

Point point_add(Point a, Point b) {
    Point r = { a.x + b.x, a.y + b.y };
    return r;
}

// === geometry.c ===
#include "geometry.h"

int point_dist2(Point a, Point b) {
    int dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx + dy * dy;
}

// === main.c ===
#include <stdio.h>
#include "point.h"
#include "geometry.h"

int main(void) {
    Point a, b;
    scanf("%d %d %d %d", &a.x, &a.y, &b.x, &b.y);
    Point s = point_add(a, b);
    printf("ผลบวก: (%d, %d)\nระยะยกกำลังสอง: %d\n", s.x, s.y, point_dist2(a, b));
    return 0;
}
`, wrong: [R`// === point.h ===
#ifndef POINT_H
#define POINT_H

typedef struct {
    int x;
    int y;
} Point;

Point point_add(Point a, Point b);

#endif

// === geometry.h ===
#ifndef GEOMETRY_H
#define GEOMETRY_H
#include "point.h"

int point_dist2(Point a, Point b);

#endif

// === point.c ===
#include "point.h"

Point point_add(Point a, Point b) {
    Point r = { a.x + b.x, a.y + b.y };
    return r;
}

// === geometry.c ===
#include "geometry.h"

int point_dist2(Point a, Point b) {
    int dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx - dy * dy;
}

// === main.c ===
#include <stdio.h>
#include "point.h"
#include "geometry.h"

int main(void) {
    Point a, b;
    scanf("%d %d %d %d", &a.x, &a.y, &b.x, &b.y);
    Point s = point_add(a, b);
    printf("ผลบวก: (%d, %d)\nระยะยกกำลังสอง: %d\n", s.x, s.y, point_dist2(a, b));
    return 0;
}
`] },
  "c2-modular/2": { sol: R`// === stats.h ===
#ifndef STATS_H
#define STATS_H

double average(const int *a, int n);

#endif

// === stats.c ===
#include "stats.h"

double average(const int *a, int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    return (double)sum / n;
}

// === main.c ===
#include <stdio.h>
#include "stats.h"

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("เฉลี่ย: %.2f\n", average(a, n));
    return 0;
}
`, wrong: [R`// === stats.h ===
#ifndef STATS_H
#define STATS_H

double average(const int *a, int n);

#endif

// === stats.c ===
#include "stats.h"

double average(const int *a, int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    return (double)(sum / n);
}

// === main.c ===
#include <stdio.h>
#include "stats.h"

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    printf("เฉลี่ย: %.2f\n", average(a, n));
    return 0;
}
`] },
  "c2-modular/3": { sol: R`// === counter.h ===
#ifndef COUNTER_H
#define COUNTER_H

extern int counter;
void count_word(void);

#endif

// === counter.c ===
#include "counter.h"

int counter = 0;

void count_word(void) {
    counter++;
}

// === main.c ===
#include <stdio.h>
#include "counter.h"

int main(void) {
    char w[64];
    while (scanf("%63s", w) == 1) {
        count_word();
    }
    printf("นับได้: %d คำ\n", counter);
    return 0;
}
`, wrong: [R`// === counter.h ===
#ifndef COUNTER_H
#define COUNTER_H

extern int counter;
void count_word(void);

#endif

// === counter.c ===
#include "counter.h"

int counter = 1;

void count_word(void) {
    counter++;
}

// === main.c ===
#include <stdio.h>
#include "counter.h"

int main(void) {
    char w[64];
    while (scanf("%63s", w) == 1) {
        count_word();
    }
    printf("นับได้: %d คำ\n", counter);
    return 0;
}
`] },
  "c2-modular/4": { sol: R`// === idgen.h ===
#ifndef IDGEN_H
#define IDGEN_H

int idgen_next(void);
void idgen_reset(int start);

#endif

// === idgen.c ===
#include "idgen.h"

static int nextId = 1;

static int atLeastOne(int v) {
    return v < 1 ? 1 : v;
}

int idgen_next(void) {
    return nextId++;
}

void idgen_reset(int start) {
    nextId = atLeastOne(start);
}

// === main.c ===
#include <stdio.h>
#include "idgen.h"

int main(void) {
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'n') {
            printf("ID: %d\n", idgen_next());
        } else if (cmd == 'r') {
            int v = 0;
            if (scanf("%d", &v) != 1) {
                break;
            }
            idgen_reset(v);
        }
    }
    return 0;
}
`, wrong: [R`// === idgen.h ===
#ifndef IDGEN_H
#define IDGEN_H

int idgen_next(void);
void idgen_reset(int start);

#endif

// === idgen.c ===
#include "idgen.h"

static int nextId = 1;

int idgen_next(void) {
    return nextId++;
}

void idgen_reset(int start) {
    nextId = start;
}

// === main.c ===
#include <stdio.h>
#include "idgen.h"

int main(void) {
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'n') {
            printf("ID: %d\n", idgen_next());
        } else if (cmd == 'r') {
            int v = 0;
            if (scanf("%d", &v) != 1) {
                break;
            }
            idgen_reset(v);
        }
    }
    return 0;
}
`] },
  "c2-modular/5": { sol: R`// === shapes.h ===
#ifndef SHAPES_H
#define SHAPES_H

double rect_area(double w, double h);
double circle_area(double r);

#endif

// === shapes.c ===
#include "shapes.h"

double rect_area(double w, double h) {
    return w * h;
}

double circle_area(double r) {
    return 3.14159 * r * r;
}

// === main.c ===
#include <stdio.h>
#include "shapes.h"

int main(void) {
    double w = 0, h = 0, r = 0;
    scanf("%lf %lf %lf", &w, &h, &r);
    printf("สี่เหลี่ยม: %.2f\nวงกลม: %.2f\n", rect_area(w, h), circle_area(r));
    return 0;
}
`, wrong: [R`// === shapes.h ===
#ifndef SHAPES_H
#define SHAPES_H

double rect_area(double w, double h);
double circle_area(double r);

#endif

// === shapes.c ===
#include "shapes.h"

double rect_area(double w, double h) {
    return w * h;
}

double circle_area(double r) {
    return 3.14 * r * r;
}

// === main.c ===
#include <stdio.h>
#include "shapes.h"

int main(void) {
    double w = 0, h = 0, r = 0;
    scanf("%lf %lf %lf", &w, &h, &r);
    printf("สี่เหลี่ยม: %.2f\nวงกลม: %.2f\n", rect_area(w, h), circle_area(r));
    return 0;
}
`] },
  // ── Stage 22: พรีโปรเซสเซอร์และมาโคร ──
  "c2-preproc/0": { sol: R`#include <stdio.h>

#define MAX_SCORE 100
#define PASS_MARK 50

int main(void) {
    int n = 0, pass = 0, fail = 0, bad = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int s = 0;
        scanf("%d", &s);
        if (s < 0 || s > MAX_SCORE) {
            bad++;
        } else if (s >= PASS_MARK) {
            pass++;
        } else {
            fail++;
        }
    }
    printf("ผ่าน: %d · ไม่ผ่าน: %d · ไม่ถูกต้อง: %d\n", pass, fail, bad);
    printf("มาตรฐาน C: %ld\n", __STDC_VERSION__);
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define MAX_SCORE 100
#define PASS_MARK 50

int main(void) {
    int n = 0, pass = 0, fail = 0, bad = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int s = 0;
        scanf("%d", &s);
        if (s < 0 || s > MAX_SCORE) {
            bad++;
        } else if (s > PASS_MARK) {
            pass++;
        } else {
            fail++;
        }
    }
    printf("ผ่าน: %d · ไม่ผ่าน: %d · ไม่ถูกต้อง: %d\n", pass, fail, bad);
    printf("มาตรฐาน C: %ld\n", __STDC_VERSION__);
    return 0;
}
`] },
  "c2-preproc/1": { sol: R`#include <stdio.h>

#define AREA(w, h) ((w) * (h))

int main(void) {
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    int total = AREA(a + 2, b + 2);
    int inner = AREA(a, b);
    printf("พื้นที่รวมกรอบ: %d\nพื้นที่รูป: %d\nพื้นที่กรอบ: %d\n", total, inner, total - inner);
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define AREA(w, h) ((w) * (h))

int main(void) {
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    int total = AREA(a + 1, b + 1);
    int inner = AREA(a, b);
    printf("พื้นที่รวมกรอบ: %d\nพื้นที่รูป: %d\nพื้นที่กรอบ: %d\n", total, inner, total - inner);
    return 0;
}
`] },
  "c2-preproc/2": { sol: R`#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int k = 0; k < n; k++) {
        scanf("%d", &a[k]);
    }
    int best = a[0];
    int i = 1;
    while (i < n) {
        best = MAX(a[i], best);
        i++;
    }
    printf("สูงสุด: %d\n", best);
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int k = 0; k < n; k++) {
        scanf("%d", &a[k]);
    }
    int best = 0;
    int i = 0;
    while (i < n) {
        best = MAX(a[i], best);
        i++;
    }
    printf("สูงสุด: %d\n", best);
    return 0;
}
`] },
  "c2-preproc/3": { sol: R`#include <stdio.h>

#ifndef BUFFER_SIZE
#define BUFFER_SIZE 64
#endif

#if defined(__wasm__)
#define PLATFORM_NAME "WebAssembly"
#elif defined(_WIN32)
#define PLATFORM_NAME "Windows"
#elif defined(__linux__)
#define PLATFORM_NAME "Linux"
#elif defined(__APPLE__)
#define PLATFORM_NAME "macOS"
#else
#define PLATFORM_NAME "ไม่ทราบ"
#endif

#if __STDC_VERSION__ >= 201112L
#define HAS_C11 "ใช่"
#else
#define HAS_C11 "ไม่"
#endif

int main(void) {
    printf("แพลตฟอร์ม: %s\n", PLATFORM_NAME);
    printf("BUFFER_SIZE: %d\n", BUFFER_SIZE);
    printf("รองรับ C11: %s\n", HAS_C11);
    return 0;
}
`, wrong: [R`#include <stdio.h>

#ifndef BUFFER_SIZE
#define BUFFER_SIZE 64
#endif

#if defined(_WIN32)
#define PLATFORM_NAME "Windows"
#elif defined(__linux__) || defined(__wasm__)
#define PLATFORM_NAME "Linux"
#else
#define PLATFORM_NAME "ไม่ทราบ"
#endif

#if __STDC_VERSION__ >= 201112L
#define HAS_C11 "ใช่"
#else
#define HAS_C11 "ไม่"
#endif

int main(void) {
    printf("แพลตฟอร์ม: %s\n", PLATFORM_NAME);
    printf("BUFFER_SIZE: %d\n", BUFFER_SIZE);
    printf("รองรับ C11: %s\n", HAS_C11);
    return 0;
}
`] },
  "c2-preproc/4": { sol: R`#include <stdio.h>

#define SWAP(a, b) do { int t_ = (a); (a) = (b); (b) = t_; } while (0)

int main(void) {
    int x = 0, y = 0;
    scanf("%d %d", &x, &y);
    if (x > y)
        SWAP(x, y);
    else
        puts("เรียงอยู่แล้ว");
    printf("%d %d\n", x, y);
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define SWAP(a, b) do { int t_ = (a); (a) = (b); (b) = t_; } while (0)

int main(void) {
    int x = 0, y = 0;
    scanf("%d %d", &x, &y);
    if (x >= y)
        SWAP(x, y);
    else
        puts("เรียงอยู่แล้ว");
    printf("%d %d\n", x, y);
    return 0;
}
`] },
  "c2-preproc/5": { sol: R`// === config.h ===
#ifndef CONFIG_H
#define CONFIG_H

#define CONFIG_MAX_ENTRIES 32
#define CONFIG_KEY_LEN 32
#define CONFIG_VALUE_LEN 64

typedef struct {
    char key[CONFIG_KEY_LEN];
    char value[CONFIG_VALUE_LEN];
} ConfigEntry;

typedef struct {
    ConfigEntry entries[CONFIG_MAX_ENTRIES];
    int count;
    int invalid;
} Config;

int config_load(Config *c, const char *path);
const char *config_get(const Config *c, const char *key);
int config_get_int(const Config *c, const char *key, long *out);

#endif

// === config.c ===
#include "config.h"
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *trim(char *s) {
    while (*s != '\0' && isspace((unsigned char)*s)) {
        s++;
    }
    size_t len = strlen(s);
    while (len > 0 && isspace((unsigned char)s[len - 1])) {
        s[--len] = '\0';
    }
    return s;
}

static int findKey(const Config *c, const char *key) {
    for (int i = 0; i < c->count; i++) {
        if (strcmp(c->entries[i].key, key) == 0) {
            return i;
        }
    }
    return -1;
}

int config_load(Config *c, const char *path) {
    c->count = 0;
    c->invalid = 0;
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        return 0;
    }
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *t = trim(line);
        if (*t == '\0' || *t == '#') {
            continue;
        }
        char *eq = strchr(t, '=');
        if (eq == NULL) {
            c->invalid++;
            continue;
        }
        *eq = '\0';
        char *key = trim(t);
        char *value = trim(eq + 1);
        if (*key == '\0') {
            c->invalid++;
            continue;
        }
        int i = findKey(c, key);
        if (i < 0) {
            if (c->count == CONFIG_MAX_ENTRIES) {
                continue;
            }
            i = c->count++;
            snprintf(c->entries[i].key, CONFIG_KEY_LEN, "%s", key);
        }
        snprintf(c->entries[i].value, CONFIG_VALUE_LEN, "%s", value);
    }
    fclose(f);
    return 1;
}

const char *config_get(const Config *c, const char *key) {
    int i = findKey(c, key);
    return i < 0 ? NULL : c->entries[i].value;
}

int config_get_int(const Config *c, const char *key, long *out) {
    const char *v = config_get(c, key);
    if (v == NULL) {
        return -1;
    }
    char *end;
    long n = strtol(v, &end, 10);
    if (end == v || *end != '\0') {
        return 0;
    }
    *out = n;
    return 1;
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "config.h"

int main(void) {
    Config cfg;
    if (!config_load(&cfg, "/data/app.conf")) {
        puts("ไม่พบไฟล์ตั้งค่า (ใช้ค่าว่าง)");
    }
    char cmd[16], key[64];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "get") == 0 && scanf("%63s", key) == 1) {
            const char *v = config_get(&cfg, key);
            if (v == NULL) {
                printf("ไม่มี %s\n", key);
            } else {
                printf("%s = %s\n", key, v[0] ? v : "(ว่าง)");
            }
        } else if (strcmp(cmd, "getint") == 0 && scanf("%63s", key) == 1) {
            long n = 0;
            int r = config_get_int(&cfg, key, &n);
            if (r < 0) {
                printf("ไม่มี %s\n", key);
            } else if (r == 0) {
                printf("%s ไม่ใช่ตัวเลข\n", key);
            } else {
                printf("%s = %ld\n", key, n);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวนค่า: %d\n", cfg.count);
        } else if (strcmp(cmd, "invalid") == 0) {
            printf("บรรทัดผิดรูปแบบ: %d\n", cfg.invalid);
        }
    }
    return 0;
}
`, wrong: [R`// === config.h ===
#ifndef CONFIG_H
#define CONFIG_H

#define CONFIG_MAX_ENTRIES 32
#define CONFIG_KEY_LEN 32
#define CONFIG_VALUE_LEN 64

typedef struct {
    char key[CONFIG_KEY_LEN];
    char value[CONFIG_VALUE_LEN];
} ConfigEntry;

typedef struct {
    ConfigEntry entries[CONFIG_MAX_ENTRIES];
    int count;
    int invalid;
} Config;

int config_load(Config *c, const char *path);
const char *config_get(const Config *c, const char *key);
int config_get_int(const Config *c, const char *key, long *out);

#endif

// === config.c ===
#include "config.h"
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *trim(char *s) {
    while (*s != '\0' && isspace((unsigned char)*s)) {
        s++;
    }
    size_t len = strlen(s);
    while (len > 0 && isspace((unsigned char)s[len - 1])) {
        s[--len] = '\0';
    }
    return s;
}

int config_load(Config *c, const char *path) {
    c->count = 0;
    c->invalid = 0;
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        return 0;
    }
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *t = trim(line);
        if (*t == '\0' || *t == '#') {
            continue;
        }
        char *eq = strchr(t, '=');
        if (eq == NULL) {
            c->invalid++;
            continue;
        }
        *eq = '\0';
        char *key = trim(t);
        char *value = trim(eq + 1);
        if (*key == '\0') {
            c->invalid++;
            continue;
        }
        if (c->count == CONFIG_MAX_ENTRIES) {
            continue;
        }
        int i = c->count++;
        snprintf(c->entries[i].key, CONFIG_KEY_LEN, "%s", key);
        snprintf(c->entries[i].value, CONFIG_VALUE_LEN, "%s", value);
    }
    fclose(f);
    return 1;
}

const char *config_get(const Config *c, const char *key) {
    for (int i = 0; i < c->count; i++) {
        if (strcmp(c->entries[i].key, key) == 0) {
            return c->entries[i].value;
        }
    }
    return NULL;
}

int config_get_int(const Config *c, const char *key, long *out) {
    const char *v = config_get(c, key);
    if (v == NULL) {
        return -1;
    }
    char *end;
    long n = strtol(v, &end, 10);
    if (end == v || *end != '\0') {
        return 0;
    }
    *out = n;
    return 1;
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "config.h"

int main(void) {
    Config cfg;
    if (!config_load(&cfg, "/data/app.conf")) {
        puts("ไม่พบไฟล์ตั้งค่า (ใช้ค่าว่าง)");
    }
    char cmd[16], key[64];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "get") == 0 && scanf("%63s", key) == 1) {
            const char *v = config_get(&cfg, key);
            if (v == NULL) {
                printf("ไม่มี %s\n", key);
            } else {
                printf("%s = %s\n", key, v[0] ? v : "(ว่าง)");
            }
        } else if (strcmp(cmd, "getint") == 0 && scanf("%63s", key) == 1) {
            long n = 0;
            int r = config_get_int(&cfg, key, &n);
            if (r < 0) {
                printf("ไม่มี %s\n", key);
            } else if (r == 0) {
                printf("%s ไม่ใช่ตัวเลข\n", key);
            } else {
                printf("%s = %ld\n", key, n);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวนค่า: %d\n", cfg.count);
        } else if (strcmp(cmd, "invalid") == 0) {
            printf("บรรทัดผิดรูปแบบ: %d\n", cfg.invalid);
        }
    }
    return 0;
}
`] },

  // ── Stage 23: Function pointer และ Generic C ──
  "c2-funcptr/0": { sol: R`#include <stdio.h>

typedef int (*BinOp)(int, int);

static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }
static int maxOf(int a, int b) { return a > b ? a : b; }
static int minOf(int a, int b) { return a < b ? a : b; }

BinOp pickOp(char c) {
    switch (c) {
        case '+': return add;
        case '-': return sub;
        case '*': return mul;
        case 'M': return maxOf;
        case 'm': return minOf;
    }
    return NULL;
}

int main(void) {
    int a = 0, b = 0;
    char op = 0;
    while (scanf("%d %c %d", &a, &op, &b) == 3) {
        BinOp f = pickOp(op);
        if (f == NULL) {
            printf("ไม่รู้จัก %c\n", op);
        } else {
            printf("= %d\n", f(a, b));
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

typedef int (*BinOp)(int, int);

static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }
static int maxOf(int a, int b) { return a > b ? a : b; }
static int minOf(int a, int b) { return a < b ? a : b; }

BinOp pickOp(char c) {
    switch (c) {
        case '+': return add;
        case '-': return sub;
        case '*': return mul;
        case 'M': return minOf;
        case 'm': return maxOf;
    }
    return NULL;
}

int main(void) {
    int a = 0, b = 0;
    char op = 0;
    while (scanf("%d %c %d", &a, &op, &b) == 3) {
        BinOp f = pickOp(op);
        if (f == NULL) {
            printf("ไม่รู้จัก %c\n", op);
        } else {
            printf("= %d\n", f(a, b));
        }
    }
    return 0;
}
`] },
  "c2-funcptr/1": { sol: R`#include <stdio.h>
#include <stdlib.h>

static int cmpDesc(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (y > x) - (y < x);
}

int main(void) {
    int arr[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    qsort(arr, (size_t)n, sizeof arr[0], cmpDesc);
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", arr[i]);
    }
    printf("\n");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static int cmpDesc(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int arr[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    qsort(arr, (size_t)n, sizeof arr[0], cmpDesc);
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", arr[i]);
    }
    printf("\n");
    return 0;
}
`] },
  "c2-funcptr/2": { sol: R`#include <stdio.h>
#include <stdlib.h>

static int cmpAsc(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int arr[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    qsort(arr, (size_t)n, sizeof arr[0], cmpAsc);
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", arr[i]);
    }
    printf("\n");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static int cmpAsc(const void *a, const void *b) {
    long x = *(const int *)a;
    long y = *(const int *)b;
    return (int)(x - y);
}

int main(void) {
    int arr[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    qsort(arr, (size_t)n, sizeof arr[0], cmpAsc);
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", arr[i]);
    }
    printf("\n");
    return 0;
}
`] },
  "c2-funcptr/3": { sol: R`#include <stdio.h>
#include <string.h>

static void doubleIt(int *x) { *x *= 2; }
static void negate(int *x) { *x = -*x; }
static void square(int *x) { *x = *x * *x; }
static int isEven(int x) { return x % 2 == 0; }
static int isPositive(int x) { return x > 0; }

void forEach(int *a, int n, void (*fn)(int *)) {
    for (int i = 0; i < n; i++) {
        fn(&a[i]);
    }
}

int countIf(const int *a, int n, int (*pred)(int)) {
    int c = 0;
    for (int i = 0; i < n; i++) {
        if (pred(a[i])) {
            c++;
        }
    }
    return c;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "double") == 0) {
            forEach(a, n, doubleIt);
        } else if (strcmp(cmd, "negate") == 0) {
            forEach(a, n, negate);
        } else if (strcmp(cmd, "square") == 0) {
            forEach(a, n, square);
        } else if (strcmp(cmd, "even") == 0) {
            printf("even: %d\n", countIf(a, n, isEven));
        } else if (strcmp(cmd, "positive") == 0) {
            printf("positive: %d\n", countIf(a, n, isPositive));
        } else if (strcmp(cmd, "print") == 0) {
            for (int i = 0; i < n; i++) {
                printf(i ? " %d" : "%d", a[i]);
            }
            printf("\n");
        } else {
            printf("ไม่รู้จักคำสั่ง %s\n", cmd);
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

static void doubleIt(int *x) { *x *= 2; }
static void negate(int *x) { *x = -*x; }
static void square(int *x) { *x = *x * *x; }
static int isEven(int x) { return x % 2 == 1; }
static int isPositive(int x) { return x >= 0; }

void forEach(int *a, int n, void (*fn)(int *)) {
    for (int i = 0; i < n; i++) {
        fn(&a[i]);
    }
}

int countIf(const int *a, int n, int (*pred)(int)) {
    int c = 0;
    for (int i = 0; i < n; i++) {
        if (pred(a[i])) {
            c++;
        }
    }
    return c;
}

int main(void) {
    int a[100] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "double") == 0) {
            forEach(a, n, doubleIt);
        } else if (strcmp(cmd, "negate") == 0) {
            forEach(a, n, negate);
        } else if (strcmp(cmd, "square") == 0) {
            forEach(a, n, square);
        } else if (strcmp(cmd, "even") == 0) {
            printf("even: %d\n", n - countIf(a, n, isEven));
        } else if (strcmp(cmd, "positive") == 0) {
            printf("positive: %d\n", countIf(a, n, isPositive));
        } else if (strcmp(cmd, "print") == 0) {
            for (int i = 0; i < n; i++) {
                printf(i ? " %d" : "%d", a[i]);
            }
            printf("\n");
        } else {
            printf("ไม่รู้จักคำสั่ง %s\n", cmd);
        }
    }
    return 0;
}
`] },
  "c2-funcptr/4": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define TYPE_NAME(x) _Generic((x), int: "int", char: "char", double: "double", default: "อื่นๆ")
#define ABS(x) _Generic((x), int: abs, long: labs, double: fabs)(x)

int main(void) {
    int i = 0;
    double d = 0;
    scanf("%d %lf", &i, &d);
    printf("ABS(i) = %d\n", ABS(i));
    printf("ABS(d) = %.2f\n", ABS(d));
    printf("ชนิดของ i: %s\n", TYPE_NAME(i));
    printf("ชนิดของ d: %s\n", TYPE_NAME(d));
    printf("ชนิดของ i + d: %s\n", TYPE_NAME(i + d));
    printf("ชนิดของ 'A': %s\n", TYPE_NAME('A'));
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define TYPE_NAME(x) _Generic((x), int: "int", char: "char", double: "double", default: "อื่นๆ")
#define ABS(x) _Generic((x), int: abs, long: labs, double: fabs)(x)

int main(void) {
    int i = 0;
    double d = 0;
    scanf("%d %lf", &i, &d);
    printf("ABS(i) = %d\n", ABS(i));
    printf("ABS(d) = %.2f\n", ABS(d));
    printf("ชนิดของ i: %s\n", TYPE_NAME(i));
    printf("ชนิดของ d: %s\n", TYPE_NAME(d));
    printf("ชนิดของ i + d: %s\n", TYPE_NAME(i + d));
    printf("ชนิดของ 'A': %s\n", "char");
    return 0;
}
`] },
  "c2-funcptr/5": { sol: R`#include <stdio.h>
#include <string.h>

void swapAny(void *a, void *b, size_t size) {
    unsigned char tmp[64];
    memcpy(tmp, a, size);
    memcpy(a, b, size);
    memcpy(b, tmp, size);
}

void reverseAny(void *base, size_t n, size_t size) {
    unsigned char *p = base;
    for (size_t i = 0; i < n / 2; i++) {
        swapAny(p + i * size, p + (n - 1 - i) * size, size);
    }
}

int main(void) {
    int a[100] = {0};
    double d[100] = {0};
    int n = 0, m = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%lf", &d[i]);
    }
    reverseAny(a, (size_t)n, sizeof a[0]);
    reverseAny(d, (size_t)m, sizeof d[0]);
    if (n == 0) {
        printf("-");
    }
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
    if (m == 0) {
        printf("-");
    }
    for (int i = 0; i < m; i++) {
        printf(i ? " %.1f" : "%.1f", d[i]);
    }
    printf("\n");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

void swapAny(void *a, void *b, size_t size) {
    unsigned char tmp[64];
    memcpy(tmp, a, size);
    memcpy(a, b, size);
    memcpy(b, tmp, size);
}

void reverseAny(void *base, size_t n, size_t size) {
    unsigned char *p = base;
    for (size_t i = 0; i < n / 2; i++) {
        swapAny(p + i, p + (n - 1 - i), size);
    }
}

int main(void) {
    int a[100] = {0};
    double d[100] = {0};
    int n = 0, m = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%lf", &d[i]);
    }
    reverseAny(a, (size_t)n, sizeof a[0]);
    reverseAny(d, (size_t)m, sizeof d[0]);
    if (n == 0) {
        printf("-");
    }
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\n");
    if (m == 0) {
        printf("-");
    }
    for (int i = 0; i < m; i++) {
        printf(i ? " %.1f" : "%.1f", d[i]);
    }
    printf("\n");
    return 0;
}
`] },
  "c2-funcptr/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    char phone[16];
} Contact;

static int cmpName(const void *a, const void *b) {
    return strcmp(((const Contact *)a)->name, ((const Contact *)b)->name);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    Contact *list = malloc(((size_t)n + 1) * sizeof *list);
    if (list == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%31s %15s", list[i].name, list[i].phone);
    }
    qsort(list, (size_t)n, sizeof *list, cmpName);
    for (int i = 0; i < n; i++) {
        printf("%s: %s\n", list[i].name, list[i].phone);
    }
    char q[64];
    while (scanf("%63s", q) == 1) {
        Contact key;
        snprintf(key.name, sizeof key.name, "%s", q);
        Contact *hit = bsearch(&key, list, (size_t)n, sizeof *list, cmpName);
        if (hit == NULL) {
            printf("%s → ไม่พบ\n", q);
        } else {
            printf("%s → %s\n", q, hit->phone);
        }
    }
    free(list);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    char phone[16];
} Contact;

static int cmpName(const void *a, const void *b) {
    return strcmp(((const Contact *)a)->name, ((const Contact *)b)->name);
}

static int cmpPhone(const void *a, const void *b) {
    return strcmp(((const Contact *)a)->phone, ((const Contact *)b)->phone);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    Contact *list = malloc(((size_t)n + 1) * sizeof *list);
    if (list == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%31s %15s", list[i].name, list[i].phone);
    }
    qsort(list, (size_t)n, sizeof *list, cmpPhone);
    for (int i = 0; i < n; i++) {
        printf("%s: %s\n", list[i].name, list[i].phone);
    }
    char q[64];
    while (scanf("%63s", q) == 1) {
        Contact key;
        snprintf(key.name, sizeof key.name, "%s", q);
        Contact *hit = bsearch(&key, list, (size_t)n, sizeof *list, cmpName);
        if (hit == NULL) {
            printf("%s → ไม่พบ\n", q);
        } else {
            printf("%s → %s\n", q, hit->phone);
        }
    }
    free(list);
    return 0;
}
`] },
  // ── Stage 24: Dynamic array และ linked list ──
  "c2-lists/0": { sol: R`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t cap;
} IntVec;

void vec_init(IntVec *v) {
    v->data = NULL;
    v->size = 0;
    v->cap = 0;
}

int vec_push(IntVec *v, int x) {
    if (v->size == v->cap) {
        size_t nc = v->cap ? v->cap * 2 : 4;
        int *t = realloc(v->data, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        v->data = t;
        v->cap = nc;
    }
    v->data[v->size++] = x;
    return 1;
}

int vec_get(const IntVec *v, long i, int *out) {
    if (i < 0 || (size_t)i >= v->size) {
        return 0;
    }
    *out = v->data[i];
    return 1;
}

void vec_free(IntVec *v) {
    free(v->data);
    v->data = NULL;
    v->size = 0;
    v->cap = 0;
}

int main(void) {
    IntVec v;
    vec_init(&v);
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int x = 0;
        scanf("%d", &x);
        if (!vec_push(&v, x)) {
            vec_free(&v);
            return 1;
        }
    }
    printf("ขนาด: %zu · ความจุ: %zu\n", v.size, v.cap);
    int q = 0;
    scanf("%d", &q);
    for (int i = 0; i < q; i++) {
        long idx = 0;
        int out = 0;
        scanf("%ld", &idx);
        if (vec_get(&v, idx, &out)) {
            printf("ค่า: %d\n", out);
        } else {
            puts("ตำแหน่งไม่ถูกต้อง");
        }
    }
    vec_free(&v);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t cap;
} IntVec;

void vec_init(IntVec *v) {
    v->data = NULL;
    v->size = 0;
    v->cap = 0;
}

int vec_push(IntVec *v, int x) {
    if (v->size == v->cap) {
        size_t nc = v->cap + 4;
        int *t = realloc(v->data, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        v->data = t;
        v->cap = nc;
    }
    v->data[v->size++] = x;
    return 1;
}

int vec_get(const IntVec *v, long i, int *out) {
    if (i < 0 || (size_t)i >= v->size) {
        return 0;
    }
    *out = v->data[i];
    return 1;
}

void vec_free(IntVec *v) {
    free(v->data);
    v->data = NULL;
    v->size = 0;
    v->cap = 0;
}

int main(void) {
    IntVec v;
    vec_init(&v);
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int x = 0;
        scanf("%d", &x);
        if (!vec_push(&v, x)) {
            vec_free(&v);
            return 1;
        }
    }
    printf("ขนาด: %zu · ความจุ: %zu\n", v.size, v.cap);
    int q = 0;
    scanf("%d", &q);
    for (int i = 0; i < q; i++) {
        long idx = 0;
        int out = 0;
        scanf("%ld", &idx);
        if (vec_get(&v, idx, &out)) {
            printf("ค่า: %d\n", out);
        } else {
            puts("ตำแหน่งไม่ถูกต้อง");
        }
    }
    vec_free(&v);
    return 0;
}
`] },
  "c2-lists/1": { sol: R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

static void push_front(Node **head, int v) {
    Node *n = malloc(sizeof *n);
    if (n == NULL) {
        exit(1);
    }
    n->value = v;
    n->next = *head;
    *head = n;
}

int main(void) {
    Node *head = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        push_front(&head, v);
    }
    if (head == NULL) {
        puts("(ว่าง)");
    }
    for (Node *p = head; p != NULL; p = p->next) {
        printf(p == head ? "%d" : " %d", p->value);
    }
    if (head != NULL) {
        printf("\n");
    }
    Node *cur = head;
    while (cur != NULL) {
        Node *next = cur->next;
        free(cur);
        cur = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

static void push_front(Node **head, int v) {
    Node *n = malloc(sizeof *n);
    if (n == NULL) {
        exit(1);
    }
    n->value = v;
    n->next = *head;
    *head = n;
}

int main(void) {
    Node *head = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        push_front(&head, v);
    }
    if (head == NULL) {
        puts("(ว่าง)");
    }
    for (Node *p = head; p != NULL; p = p->next) {
        printf(p == head ? "%d" : " %d", p->value);
    }
    if (head != NULL) {
        printf("\n");
    }
    free(head);
    return 0;
}
`] },
  "c2-lists/2": { sol: R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        Node *n = malloc(sizeof *n);
        if (n == NULL) {
            return 1;
        }
        n->value = v;
        n->next = head;
        head = n;
    }
    long long sum = 0;
    for (Node *p = head; p != NULL; p = p->next) {
        sum += p->value;
    }
    printf("ผลรวม: %lld\n", sum);
    Node *cur = head;
    while (cur != NULL) {
        Node *next = cur->next;
        free(cur);
        cur = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        Node *n = malloc(sizeof *n);
        if (n == NULL) {
            return 1;
        }
        n->value = v;
        n->next = head;
        head = n;
    }
    long long sum = 0;
    for (Node *p = head; p != NULL; p = p->next) {
        sum += p->value;
    }
    printf("ผลรวม: %lld\n", sum);
    if (head != NULL) {
        free(head->next);
        free(head);
    }
    return 0;
}
`] },
  "c2-lists/3": { sol: R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL, *tail = NULL;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'a') {
            int v = 0;
            scanf("%d", &v);
            Node *n = malloc(sizeof *n);
            if (n == NULL) {
                return 1;
            }
            n->value = v;
            n->next = NULL;
            if (tail == NULL) {
                head = n;
            } else {
                tail->next = n;
            }
            tail = n;
        } else if (cmd == 'r') {
            int v = 0;
            scanf("%d", &v);
            Node **pp = &head;
            while (*pp != NULL && (*pp)->value != v) {
                pp = &(*pp)->next;
            }
            if (*pp == NULL) {
                printf("ไม่พบ %d\n", v);
                continue;
            }
            Node *dead = *pp;
            *pp = dead->next;
            if (dead == tail) {
                tail = NULL;
                for (Node *p = head; p != NULL; p = p->next) {
                    tail = p;
                }
            }
            free(dead);
            printf("ลบ %d\n", v);
        } else if (cmd == 'p') {
            if (head == NULL) {
                puts("(ว่าง)");
                continue;
            }
            for (Node *p = head; p != NULL; p = p->next) {
                printf(p == head ? "%d" : " %d", p->value);
            }
            printf("\n");
        } else if (cmd == 'c') {
            int c = 0;
            for (Node *p = head; p != NULL; p = p->next) {
                c++;
            }
            printf("จำนวน: %d\n", c);
        }
    }
    while (head != NULL) {
        Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL, *tail = NULL;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'a') {
            int v = 0;
            scanf("%d", &v);
            Node *n = malloc(sizeof *n);
            if (n == NULL) {
                return 1;
            }
            n->value = v;
            n->next = NULL;
            if (tail == NULL) {
                head = n;
            } else {
                tail->next = n;
            }
            tail = n;
        } else if (cmd == 'r') {
            int v = 0;
            scanf("%d", &v);
            Node **pp = &head;
            while (*pp != NULL && (*pp)->value != v) {
                pp = &(*pp)->next;
            }
            if (*pp == NULL) {
                printf("ไม่พบ %d\n", v);
                continue;
            }
            Node *dead = *pp;
            *pp = dead->next;
            if (head == NULL) {
                tail = NULL;
            }
            free(dead);
            printf("ลบ %d\n", v);
        } else if (cmd == 'p') {
            if (head == NULL) {
                puts("(ว่าง)");
                continue;
            }
            for (Node *p = head; p != NULL; p = p->next) {
                printf(p == head ? "%d" : " %d", p->value);
            }
            printf("\n");
        } else if (cmd == 'c') {
            int c = 0;
            for (Node *p = head; p != NULL; p = p->next) {
                c++;
            }
            printf("จำนวน: %d\n", c);
        }
    }
    while (head != NULL) {
        Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}
`] },
  "c2-lists/4": { sol: R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL, *tail = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        Node *n = malloc(sizeof *n);
        if (n == NULL) {
            return 1;
        }
        n->value = v;
        n->next = NULL;
        if (tail == NULL) {
            head = n;
        } else {
            tail->next = n;
        }
        tail = n;
    }
    Node **pp = &head;
    while (*pp != NULL) {
        if ((*pp)->value < 0) {
            Node *dead = *pp;
            *pp = dead->next;
            free(dead);
        } else {
            pp = &(*pp)->next;
        }
    }
    if (head == NULL) {
        puts("(ว่าง)");
    }
    for (Node *p = head; p != NULL; p = p->next) {
        printf(p == head ? "%d" : " %d", p->value);
    }
    if (head != NULL) {
        printf("\n");
    }
    Node *cur = head;
    while (cur != NULL) {
        Node *next = cur->next;
        free(cur);
        cur = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL, *tail = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        Node *n = malloc(sizeof *n);
        if (n == NULL) {
            return 1;
        }
        n->value = v;
        n->next = NULL;
        if (tail == NULL) {
            head = n;
        } else {
            tail->next = n;
        }
        tail = n;
    }
    Node **pp = &head;
    while (*pp != NULL) {
        if ((*pp)->value < 0) {
            Node *dead = *pp;
            *pp = dead->next;
            free(dead);
        }
        if (*pp != NULL) {
            pp = &(*pp)->next;
        }
    }
    if (head == NULL) {
        puts("(ว่าง)");
    }
    for (Node *p = head; p != NULL; p = p->next) {
        printf(p == head ? "%d" : " %d", p->value);
    }
    if (head != NULL) {
        printf("\n");
    }
    Node *cur = head;
    while (cur != NULL) {
        Node *next = cur->next;
        free(cur);
        cur = next;
    }
    return 0;
}
`] },
  "c2-lists/5": { sol: R`#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int value;
    struct DNode *prev;
    struct DNode *next;
} DNode;

int main(void) {
    DNode *head = NULL, *tail = NULL;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'a') {
            int v = 0;
            scanf("%d", &v);
            DNode *n = malloc(sizeof *n);
            if (n == NULL) {
                return 1;
            }
            n->value = v;
            n->prev = tail;
            n->next = NULL;
            if (tail != NULL) {
                tail->next = n;
            } else {
                head = n;
            }
            tail = n;
        } else if (cmd == 'f' || cmd == 'b') {
            if (head == NULL) {
                puts("ว่าง");
                continue;
            }
            DNode *d = cmd == 'f' ? head : tail;
            if (cmd == 'f') {
                head = d->next;
                if (head != NULL) {
                    head->prev = NULL;
                } else {
                    tail = NULL;
                }
            } else {
                tail = d->prev;
                if (tail != NULL) {
                    tail->next = NULL;
                } else {
                    head = NULL;
                }
            }
            printf("ออก %d\n", d->value);
            free(d);
        } else if (cmd == 'p' || cmd == 'r') {
            if (head == NULL) {
                puts("(ว่าง)");
                continue;
            }
            int first = 1;
            for (DNode *p = cmd == 'p' ? head : tail; p != NULL; p = cmd == 'p' ? p->next : p->prev) {
                printf(first ? "%d" : " %d", p->value);
                first = 0;
            }
            printf("\n");
        }
    }
    while (head != NULL) {
        DNode *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int value;
    struct DNode *prev;
    struct DNode *next;
} DNode;

int main(void) {
    DNode *head = NULL, *tail = NULL;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'a') {
            int v = 0;
            scanf("%d", &v);
            DNode *n = malloc(sizeof *n);
            if (n == NULL) {
                return 1;
            }
            n->value = v;
            n->prev = tail;
            n->next = NULL;
            if (tail != NULL) {
                tail->next = n;
            } else {
                head = n;
            }
            tail = n;
        } else if (cmd == 'f' || cmd == 'b') {
            if (head == NULL) {
                puts("ว่าง");
                continue;
            }
            DNode *d = cmd == 'f' ? head : tail;
            if (cmd == 'f') {
                head = d->next;
                if (head == NULL) {
                    tail = NULL;
                }
            } else {
                tail = d->prev;
                if (tail != NULL) {
                    tail->next = NULL;
                } else {
                    head = NULL;
                }
            }
            printf("ออก %d\n", d->value);
            free(d);
        } else if (cmd == 'p' || cmd == 'r') {
            if (head == NULL) {
                puts("(ว่าง)");
                continue;
            }
            int first = 1;
            for (DNode *p = cmd == 'p' ? head : tail; p != NULL; p = cmd == 'p' ? p->next : p->prev) {
                printf(first ? "%d" : " %d", p->value);
                first = 0;
            }
            printf("\n");
        }
    }
    while (head != NULL) {
        DNode *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}
`] },
  "c2-lists/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Task {
    int id;
    int pri;
    char *title;
    int done;
    struct Task *next;
} Task;

static Task *findTask(Task *head, int id) {
    for (Task *t = head; t != NULL; t = t->next) {
        if (t->id == id) {
            return t;
        }
    }
    return NULL;
}

int main(void) {
    Task *head = NULL;
    int nextId = 1;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int pri = 0;
            char title[64];
            if (scanf("%d %63s", &pri, title) != 2) {
                break;
            }
            Task *t = malloc(sizeof *t);
            size_t len = strlen(title) + 1;
            char *copy = malloc(len);
            if (t == NULL || copy == NULL) {
                free(t);
                free(copy);
                break;
            }
            memcpy(copy, title, len);
            t->id = nextId++;
            t->pri = pri;
            t->title = copy;
            t->done = 0;
            Task **pp = &head;
            while (*pp != NULL && (*pp)->pri <= pri) {
                pp = &(*pp)->next;
            }
            t->next = *pp;
            *pp = t;
            printf("เพิ่ม #%d\n", t->id);
        } else if (strcmp(cmd, "done") == 0 || strcmp(cmd, "rm") == 0) {
            int id = 0;
            if (scanf("%d", &id) != 1) {
                break;
            }
            if (strcmp(cmd, "done") == 0) {
                Task *t = findTask(head, id);
                if (t == NULL) {
                    printf("ไม่พบ #%d\n", id);
                } else {
                    t->done = 1;
                    printf("เสร็จ #%d\n", id);
                }
                continue;
            }
            Task **pp = &head;
            while (*pp != NULL && (*pp)->id != id) {
                pp = &(*pp)->next;
            }
            if (*pp == NULL) {
                printf("ไม่พบ #%d\n", id);
                continue;
            }
            Task *dead = *pp;
            *pp = dead->next;
            free(dead->title);
            free(dead);
            printf("ลบ #%d\n", id);
        } else if (strcmp(cmd, "list") == 0) {
            if (head == NULL) {
                puts("(ว่าง)");
            }
            for (Task *t = head; t != NULL; t = t->next) {
                printf("[%c] #%d (%d) %s\n", t->done ? 'x' : ' ', t->id, t->pri, t->title);
            }
        } else if (strcmp(cmd, "next") == 0) {
            Task *t = head;
            while (t != NULL && t->done) {
                t = t->next;
            }
            if (t == NULL) {
                puts("ไม่มีงานค้าง");
            } else {
                printf("ถัดไป: #%d %s\n", t->id, t->title);
            }
        }
    }
    while (head != NULL) {
        Task *next = head->next;
        free(head->title);
        free(head);
        head = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Task {
    int id;
    int pri;
    char *title;
    int done;
    struct Task *next;
} Task;

static Task *findTask(Task *head, int id) {
    for (Task *t = head; t != NULL; t = t->next) {
        if (t->id == id) {
            return t;
        }
    }
    return NULL;
}

int main(void) {
    Task *head = NULL;
    int nextId = 1;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int pri = 0;
            char title[64];
            if (scanf("%d %63s", &pri, title) != 2) {
                break;
            }
            Task *t = malloc(sizeof *t);
            size_t len = strlen(title) + 1;
            char *copy = malloc(len);
            if (t == NULL || copy == NULL) {
                free(t);
                free(copy);
                break;
            }
            memcpy(copy, title, len);
            t->id = nextId++;
            t->pri = pri;
            t->title = copy;
            t->done = 0;
            Task **pp = &head;
            while (*pp != NULL && (*pp)->pri < pri) {
                pp = &(*pp)->next;
            }
            t->next = *pp;
            *pp = t;
            printf("เพิ่ม #%d\n", t->id);
        } else if (strcmp(cmd, "done") == 0 || strcmp(cmd, "rm") == 0) {
            int id = 0;
            if (scanf("%d", &id) != 1) {
                break;
            }
            if (strcmp(cmd, "done") == 0) {
                Task *t = findTask(head, id);
                if (t == NULL) {
                    printf("ไม่พบ #%d\n", id);
                } else {
                    t->done = 1;
                    printf("เสร็จ #%d\n", id);
                }
                continue;
            }
            Task **pp = &head;
            while (*pp != NULL && (*pp)->id != id) {
                pp = &(*pp)->next;
            }
            if (*pp == NULL) {
                printf("ไม่พบ #%d\n", id);
                continue;
            }
            Task *dead = *pp;
            *pp = dead->next;
            free(dead->title);
            free(dead);
            printf("ลบ #%d\n", id);
        } else if (strcmp(cmd, "list") == 0) {
            if (head == NULL) {
                puts("(ว่าง)");
            }
            for (Task *t = head; t != NULL; t = t->next) {
                printf("[%c] #%d (%d) %s\n", t->done ? 'x' : ' ', t->id, t->pri, t->title);
            }
        } else if (strcmp(cmd, "next") == 0) {
            Task *t = head;
            while (t != NULL && t->done) {
                t = t->next;
            }
            if (t == NULL) {
                puts("ไม่มีงานค้าง");
            } else {
                printf("ถัดไป: #%d %s\n", t->id, t->title);
            }
        }
    }
    while (head != NULL) {
        Task *next = head->next;
        free(head->title);
        free(head);
        head = next;
    }
    return 0;
}
`] },

  // ── Stage 25: Stack, queue และ hash table ──
  "c2-hash/0": { sol: R`#include <stdio.h>
#include <string.h>

static char openerOf(char c) {
    return c == ')' ? '(' : c == ']' ? '[' : '{';
}

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    int stack[256];
    int top = 0;
    for (int i = 0; line[i] != '\0'; i++) {
        char c = line[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[top++] = i;
        } else if (c == ')' || c == ']' || c == '}') {
            if (top == 0 || line[stack[top - 1]] != openerOf(c)) {
                printf("ไม่สมดุลที่ตำแหน่ง %d\n", i);
                return 0;
            }
            top--;
        }
    }
    if (top > 0) {
        printf("ไม่สมดุลที่ตำแหน่ง %d\n", stack[0]);
    } else {
        puts("สมดุล");
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

static char openerOf(char c) {
    return c == ')' ? '(' : c == ']' ? '[' : '{';
}

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    int stack[256];
    int top = 0;
    for (int i = 0; line[i] != '\0'; i++) {
        char c = line[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[top++] = i;
        } else if (c == ')' || c == ']' || c == '}') {
            if (top == 0 || line[stack[top - 1]] != openerOf(c)) {
                printf("ไม่สมดุลที่ตำแหน่ง %d\n", i);
                return 0;
            }
            top--;
        }
    }
    if (top > 0) {
        printf("ไม่สมดุลที่ตำแหน่ง %d\n", stack[top - 1]);
    } else {
        puts("สมดุล");
    }
    return 0;
}
`] },
  "c2-hash/1": { sol: R`#include <stdio.h>

#define CAP 4

typedef struct {
    int data[CAP];
    int head;
    int count;
} Queue;

int main(void) {
    Queue q = { .head = 0, .count = 0 };
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'e') {
            int v = 0;
            scanf("%d", &v);
            if (q.count == CAP) {
                puts("คิวเต็ม");
                continue;
            }
            q.data[(q.head + q.count) % CAP] = v;
            q.count++;
        } else if (cmd == 'd') {
            if (q.count == 0) {
                puts("คิวว่าง");
                continue;
            }
            printf("ออก %d\n", q.data[q.head]);
            q.head = (q.head + 1) % CAP;
            q.count--;
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define CAP 4

typedef struct {
    int data[CAP];
    int head;
    int count;
} Queue;

int main(void) {
    Queue q = { .head = 0, .count = 0 };
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'e') {
            int v = 0;
            scanf("%d", &v);
            if (q.count == CAP) {
                puts("คิวเต็ม");
                continue;
            }
            q.data[q.count % CAP] = v;
            q.count++;
        } else if (cmd == 'd') {
            if (q.count == 0) {
                puts("คิวว่าง");
                continue;
            }
            printf("ออก %d\n", q.data[q.head]);
            q.head = (q.head + 1) % CAP;
            q.count--;
        }
    }
    return 0;
}
`] },
  "c2-hash/2": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    long stack[128];
    int top = 0;
    for (char *tok = strtok(line, " "); tok != NULL; tok = strtok(NULL, " ")) {
        char *end;
        long v = strtol(tok, &end, 10);
        if (end != tok && *end == '\0') {
            stack[top++] = v;
            continue;
        }
        if (strlen(tok) != 1 || strchr("+-*/", tok[0]) == NULL || top < 2) {
            puts("นิพจน์ไม่ถูกต้อง");
            return 0;
        }
        long right = stack[--top];
        long left = stack[--top];
        long r = 0;
        switch (tok[0]) {
            case '+': r = left + right; break;
            case '-': r = left - right; break;
            case '*': r = left * right; break;
            case '/':
                if (right == 0) {
                    puts("หารด้วยศูนย์");
                    return 0;
                }
                r = left / right;
                break;
        }
        stack[top++] = r;
    }
    if (top != 1) {
        puts("นิพจน์ไม่ถูกต้อง");
    } else {
        printf("ผลลัพธ์: %ld\n", stack[0]);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    long stack[128];
    int top = 0;
    for (char *tok = strtok(line, " "); tok != NULL; tok = strtok(NULL, " ")) {
        char *end;
        long v = strtol(tok, &end, 10);
        if (end != tok && *end == '\0') {
            stack[top++] = v;
            continue;
        }
        if (strlen(tok) != 1 || strchr("+-*/", tok[0]) == NULL || top < 2) {
            puts("นิพจน์ไม่ถูกต้อง");
            return 0;
        }
        long right = stack[--top];
        long left = stack[--top];
        long r = 0;
        switch (tok[0]) {
            case '+': r = left + right; break;
            case '-': r = left - right; break;
            case '*': r = left * right; break;
            case '/':
                if (right == 0) {
                    puts("หารด้วยศูนย์");
                    return 0;
                }
                r = left / right;
                break;
        }
        stack[top++] = r;
    }
    if (top < 1) {
        puts("นิพจน์ไม่ถูกต้อง");
    } else {
        printf("ผลลัพธ์: %ld\n", stack[0]);
    }
    return 0;
}
`] },
  "c2-hash/3": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

uint32_t djb2(const char *s) {
    uint32_t h = 5381;
    for (const unsigned char *p = (const unsigned char *)s; *p != '\0'; p++) {
        h = h * 33 + *p;
    }
    return h;
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        printf("%s → %" PRIu32 "\n", line[0] ? line : "(ว่าง)", djb2(line) % 1000);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

uint32_t djb2(const char *s) {
    uint32_t h = 5381;
    for (const char *p = s; *p != '\0'; p++) {
        h = h * 33 + *p;
    }
    return h;
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        printf("%s → %" PRIu32 "\n", line[0] ? line : "(ว่าง)", djb2(line) % 1000);
    }
    return 0;
}
`] },
  "c2-hash/4": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t nbuckets;
    size_t count;
} Table;

static uint32_t djb2(const char *s) {
    uint32_t h = 5381;
    for (const unsigned char *p = (const unsigned char *)s; *p != '\0'; p++) {
        h = h * 33 + *p;
    }
    return h;
}

static char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

static Entry **slotFor(Table *t, const char *key) {
    Entry **pp = &t->buckets[djb2(key) % t->nbuckets];
    while (*pp != NULL && strcmp((*pp)->key, key) != 0) {
        pp = &(*pp)->next;
    }
    return pp;
}

static int rehash(Table *t) {
    size_t nb = t->nbuckets * 2;
    Entry **fresh = calloc(nb, sizeof *fresh);
    if (fresh == NULL) {
        return 0;
    }
    for (size_t i = 0; i < t->nbuckets; i++) {
        Entry *e = t->buckets[i];
        while (e != NULL) {
            Entry *next = e->next;
            size_t j = djb2(e->key) % nb;
            e->next = fresh[j];
            fresh[j] = e;
            e = next;
        }
    }
    free(t->buckets);
    t->buckets = fresh;
    t->nbuckets = nb;
    return 1;
}

int main(void) {
    Table t = { calloc(4, sizeof(Entry *)), 4, 0 };
    if (t.buckets == NULL) {
        return 1;
    }
    char cmd[16], k[64], v[64];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "put") == 0 && scanf("%63s %63s", k, v) == 2) {
            Entry **pp = slotFor(&t, k);
            if (*pp != NULL) {
                char *nv = dupString(v);
                if (nv == NULL) {
                    break;
                }
                free((*pp)->value);
                (*pp)->value = nv;
                printf("อัปเดต %s\n", k);
                continue;
            }
            Entry *e = malloc(sizeof *e);
            if (e == NULL) {
                break;
            }
            e->key = dupString(k);
            e->value = dupString(v);
            e->next = NULL;
            *pp = e;
            t.count++;
            printf("เพิ่ม %s\n", k);
            if (t.count * 4 > t.nbuckets * 3) {
                if (!rehash(&t)) { break; };
            }
        } else if (strcmp(cmd, "get") == 0 && scanf("%63s", k) == 1) {
            Entry **pp = slotFor(&t, k);
            if (*pp == NULL) {
                printf("ไม่มี %s\n", k);
            } else {
                printf("%s = %s\n", k, (*pp)->value);
            }
        } else if (strcmp(cmd, "del") == 0 && scanf("%63s", k) == 1) {
            Entry **pp = slotFor(&t, k);
            if (*pp == NULL) {
                printf("ไม่มี %s\n", k);
                continue;
            }
            Entry *dead = *pp;
            *pp = dead->next;
            free(dead->key);
            free(dead->value);
            free(dead);
            t.count--;
            printf("ลบ %s\n", k);
        } else if (strcmp(cmd, "size") == 0) {
            printf("จำนวน: %zu · บัคเก็ต: %zu\n", t.count, t.nbuckets);
        }
    }
    for (size_t i = 0; i < t.nbuckets; i++) {
        Entry *e = t.buckets[i];
        while (e != NULL) {
            Entry *next = e->next;
            free(e->key);
            free(e->value);
            free(e);
            e = next;
        }
    }
    free(t.buckets);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t nbuckets;
    size_t count;
} Table;

static uint32_t djb2(const char *s) {
    uint32_t h = 5381;
    for (const unsigned char *p = (const unsigned char *)s; *p != '\0'; p++) {
        h = h * 33 + *p;
    }
    return h;
}

static char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

static Entry **slotFor(Table *t, const char *key) {
    Entry **pp = &t->buckets[djb2(key) % t->nbuckets];
    while (*pp != NULL && strcmp((*pp)->key, key) != 0) {
        pp = &(*pp)->next;
    }
    return pp;
}

static int rehash(Table *t) {
    size_t nb = t->nbuckets * 2;
    Entry **fresh = calloc(nb, sizeof *fresh);
    if (fresh == NULL) {
        return 0;
    }
    for (size_t i = 0; i < t->nbuckets; i++) {
        Entry *e = t->buckets[i];
        while (e != NULL) {
            Entry *next = e->next;
            size_t j = djb2(e->key) % nb;
            e->next = fresh[j];
            fresh[j] = e;
            e = next;
        }
    }
    free(t->buckets);
    t->buckets = fresh;
    t->nbuckets = nb;
    return 1;
}

int main(void) {
    Table t = { calloc(4, sizeof(Entry *)), 4, 0 };
    if (t.buckets == NULL) {
        return 1;
    }
    char cmd[16], k[64], v[64];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "put") == 0 && scanf("%63s %63s", k, v) == 2) {
            Entry **pp = slotFor(&t, k);
            if (*pp != NULL) {
                char *nv = dupString(v);
                if (nv == NULL) {
                    break;
                }
                free((*pp)->value);
                (*pp)->value = nv;
                printf("อัปเดต %s\n", k);
                continue;
            }
            Entry *e = malloc(sizeof *e);
            if (e == NULL) {
                break;
            }
            e->key = dupString(k);
            e->value = dupString(v);
            e->next = NULL;
            *pp = e;
            t.count++;
            printf("เพิ่ม %s\n", k);
            if (t.count * 4 > t.nbuckets * 3) {
                (void)rehash;
            }
        } else if (strcmp(cmd, "get") == 0 && scanf("%63s", k) == 1) {
            Entry **pp = slotFor(&t, k);
            if (*pp == NULL) {
                printf("ไม่มี %s\n", k);
            } else {
                printf("%s = %s\n", k, (*pp)->value);
            }
        } else if (strcmp(cmd, "del") == 0 && scanf("%63s", k) == 1) {
            Entry **pp = slotFor(&t, k);
            if (*pp == NULL) {
                printf("ไม่มี %s\n", k);
                continue;
            }
            Entry *dead = *pp;
            *pp = dead->next;
            free(dead->key);
            free(dead->value);
            free(dead);
            t.count--;
            printf("ลบ %s\n", k);
        } else if (strcmp(cmd, "size") == 0) {
            printf("จำนวน: %zu · บัคเก็ต: %zu\n", t.count, t.nbuckets);
        }
    }
    for (size_t i = 0; i < t.nbuckets; i++) {
        Entry *e = t.buckets[i];
        while (e != NULL) {
            Entry *next = e->next;
            free(e->key);
            free(e->value);
            free(e);
            e = next;
        }
    }
    free(t.buckets);
    return 0;
}
`] },
  "c2-hash/5": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Job {
    char name[32];
    int remaining;
    struct Job *next;
} Job;

int main(void) {
    Job *head = NULL, *tail = NULL;
    long clock = 0;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            char name[64];
            int pages = 0;
            if (scanf("%63s %d", name, &pages) != 2) {
                break;
            }
            if (pages < 1) {
                puts("จำนวนหน้าไม่ถูกต้อง");
                continue;
            }
            Job *j = malloc(sizeof *j);
            if (j == NULL) {
                break;
            }
            snprintf(j->name, sizeof j->name, "%s", name);
            j->remaining = pages;
            j->next = NULL;
            if (tail == NULL) {
                head = j;
            } else {
                tail->next = j;
            }
            tail = j;
            printf("เข้าคิว %s\n", name);
        } else if (strcmp(cmd, "tick") == 0) {
            int k = 0;
            if (scanf("%d", &k) != 1) {
                break;
            }
            for (int i = 0; i < k; i++) {
                clock++;
                if (head == NULL) {
                    continue;
                }
                head->remaining--;
                if (head->remaining == 0) {
                    printf("เสร็จ: %s (เวลา %ld)\n", head->name, clock);
                    Job *done = head;
                    head = head->next;
                    if (head == NULL) {
                        tail = NULL;
                    }
                    free(done);
                }
            }
        } else if (strcmp(cmd, "status") == 0) {
            printf("คิว:");
            if (head == NULL) {
                printf(" (ว่าง)");
            }
            for (Job *j = head; j != NULL; j = j->next) {
                printf(" %s(%d)", j->name, j->remaining);
            }
            printf("\n");
        }
    }
    while (head != NULL) {
        Job *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Job {
    char name[32];
    int remaining;
    struct Job *next;
} Job;

int main(void) {
    Job *head = NULL, *tail = NULL;
    long clock = 0;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            char name[64];
            int pages = 0;
            if (scanf("%63s %d", name, &pages) != 2) {
                break;
            }
            if (pages < 1) {
                puts("จำนวนหน้าไม่ถูกต้อง");
                continue;
            }
            Job *j = malloc(sizeof *j);
            if (j == NULL) {
                break;
            }
            snprintf(j->name, sizeof j->name, "%s", name);
            j->remaining = pages;
            j->next = NULL;
            if (tail == NULL) {
                head = j;
            } else {
                tail->next = j;
            }
            tail = j;
            printf("เข้าคิว %s\n", name);
        } else if (strcmp(cmd, "tick") == 0) {
            int k = 0;
            if (scanf("%d", &k) != 1) {
                break;
            }
            for (int i = 0; i < k; i++) {
                clock++;
                if (head == NULL) {
                    continue;
                }
                head->remaining--;
                if (head->remaining == 0) {
                    printf("เสร็จ: %s (เวลา %ld)\n", head->name, clock);
                    Job *done = head;
                    head = head->next;
                    if (head == NULL) {
                        tail = NULL;
                    }
                    free(done);
                }
            }
        } else if (strcmp(cmd, "status") == 0) {
            printf("คิว:");
            if (head == NULL) {
                printf(" (ว่าง)");
            }
            for (Job *j = head; j != NULL; j = j->next) {
                printf(" %s(%d)", j->name, j->remaining);
            }
            printf("\n");
        }
    }
    (void)tail;
    return 0;
}
`] },

  // ── Stage 26: Tree, heap และ graph ──
  "c2-trees/0": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static int height(const Tree *t) {
    if (t == NULL) {
        return 0;
    }
    int l = height(t->left), r = height(t->right);
    return 1 + (l > r ? l : r);
}

static void inorder(const Tree *t, int *first) {
    if (t == NULL) {
        return;
    }
    inorder(t->left, first);
    printf(" %d", t->key);
    *first = 0;
    inorder(t->right, first);
}

int main(void) {
    Tree *root = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        root = insert(root, v);
    }
    printf("เรียง:");
    if (root == NULL) {
        printf(" -");
    }
    int first = 1;
    inorder(root, &first);
    printf("\nความสูง: %d\n", height(root));
    freeTree(root);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static int height(const Tree *t) {
    if (t == NULL) {
        return 0;
    }
    int l = height(t->left), r = height(t->right);
    return 1 + (l > r ? l : r);
}

static void inorder(const Tree *t, int *first) {
    if (t == NULL) {
        return;
    }
    inorder(t->left, first);
    printf(" %d", t->key);
    *first = 0;
    inorder(t->right, first);
}

int main(void) {
    Tree *root = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        root = insert(root, v);
    }
    printf("เรียง:");
    if (root == NULL) {
        printf(" -");
    }
    int first = 1;
    inorder(root, &first);
    printf("\nความสูง: %d\n", height(root) - (root != NULL));
    freeTree(root);
    return 0;
}
`] },
  "c2-trees/1": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}


static int count(const Tree *t) {
    if (t == NULL) {
        return 0;
    }
    return 1 + count(t->left) + count(t->right);
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

int main(void) {
    Tree *root = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        root = insert(root, v);
    }
    printf("จำนวนโหนด: %d\n", count(root));
    freeTree(root);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}


static int count(const Tree *t) {
    if (t == NULL) {
        return 0;
    }
    return 1 + count(t->left) + count(t->right);
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    if (t->left == NULL && t->right == NULL) { free(t); }
}

int main(void) {
    Tree *root = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        root = insert(root, v);
    }
    printf("จำนวนโหนด: %d\n", count(root));
    freeTree(root);
    return 0;
}
`] },
  "c2-trees/2": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static long long sum(const Tree *t) {
    return t == NULL ? 0 : t->key + sum(t->left) + sum(t->right);
}

int main(void) {
    Tree *root = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        root = insert(root, v);
    }
    printf("ผลรวม: %lld\n", sum(root));
    freeTree(root);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static long long sum(const Tree *t) {
    return t == NULL ? 0 : t->key + sum(t->left) + sum(t->right);
}

int main(void) {
    Tree *root = NULL;
    int v = 0;
    while (scanf("%d", &v) == 1) {
        root = insert(root, v);
    }
    printf("ผลรวม: %lld\n", sum(root));
    free(root);
    return 0;
}
`] },
  "c2-trees/3": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static int find(const Tree *t, int key) {
    while (t != NULL) {
        if (key == t->key) {
            return 1;
        }
        t = key < t->key ? t->left : t->right;
    }
    return 0;
}

static int countRange(const Tree *t, int a, int b) {
    if (t == NULL) {
        return 0;
    }
    if (t->key < a) {
        return countRange(t->right, a, b);
    }
    if (t->key > b) {
        return countRange(t->left, a, b);
    }
    return 1 + countRange(t->left, a, b) + countRange(t->right, a, b);
}

int main(void) {
    Tree *root = NULL;
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        root = insert(root, v);
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "find") == 0) {
            int v = 0;
            scanf("%d", &v);
            printf(find(root, v) ? "พบ %d\n" : "ไม่พบ %d\n", v);
        } else if (strcmp(cmd, "min") == 0 || strcmp(cmd, "max") == 0) {
            if (root == NULL) {
                puts("ต้นไม้ว่าง");
                continue;
            }
            const Tree *t = root;
            int isMin = strcmp(cmd, "min") == 0;
            while ((isMin ? t->left : t->right) != NULL) {
                t = isMin ? t->left : t->right;
            }
            printf(isMin ? "ต่ำสุด: %d\n" : "สูงสุด: %d\n", t->key);
        } else if (strcmp(cmd, "range") == 0) {
            int a = 0, b = 0;
            scanf("%d %d", &a, &b);
            printf("ในช่วง: %d\n", countRange(root, a, b));
        }
    }
    freeTree(root);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static int find(const Tree *t, int key) {
    while (t != NULL) {
        if (key == t->key) {
            return 1;
        }
        t = key < t->key ? t->left : t->right;
    }
    return 0;
}

static int countRange(const Tree *t, int a, int b) {
    if (t == NULL) {
        return 0;
    }
    if (t->key <= a) {
        return countRange(t->right, a, b);
    }
    if (t->key > b) {
        return countRange(t->left, a, b);
    }
    return 1 + countRange(t->left, a, b) + countRange(t->right, a, b);
}

int main(void) {
    Tree *root = NULL;
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v = 0;
        scanf("%d", &v);
        root = insert(root, v);
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "find") == 0) {
            int v = 0;
            scanf("%d", &v);
            printf(find(root, v) ? "พบ %d\n" : "ไม่พบ %d\n", v);
        } else if (strcmp(cmd, "min") == 0 || strcmp(cmd, "max") == 0) {
            if (root == NULL) {
                puts("ต้นไม้ว่าง");
                continue;
            }
            const Tree *t = root;
            int isMin = strcmp(cmd, "min") == 0;
            while ((isMin ? t->left : t->right) != NULL) {
                t = isMin ? t->left : t->right;
            }
            printf(isMin ? "ต่ำสุด: %d\n" : "สูงสุด: %d\n", t->key);
        } else if (strcmp(cmd, "range") == 0) {
            int a = 0, b = 0;
            scanf("%d %d", &a, &b);
            printf("ในช่วง: %d\n", countRange(root, a, b));
        }
    }
    freeTree(root);
    return 0;
}
`] },
  "c2-trees/4": { sol: R`#include <stdio.h>
#include <string.h>

#define CAP 100

static void swapInt(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

static void siftUp(int *h, int i) {
    while (i > 0 && h[(i - 1) / 2] > h[i]) {
        swapInt(&h[(i - 1) / 2], &h[i]);
        i = (i - 1) / 2;
    }
}

static void siftDown(int *h, int n, int i) {
    for (;;) {
        int l = 2 * i + 1, r = 2 * i + 2, m = i;
        if (l < n && h[l] < h[m]) {
            m = l;
        }
        if (r < n && h[r] < h[m]) {
            m = r;
        }
        if (m == i) {
            return;
        }
        swapInt(&h[i], &h[m]);
        i = m;
    }
}

int main(void) {
    int heap[CAP];
    int n = 0;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "push") == 0) {
            int v = 0;
            scanf("%d", &v);
            if (n < CAP) {
                heap[n] = v;
                siftUp(heap, n);
                n++;
            }
        } else if (strcmp(cmd, "pop") == 0) {
            if (n == 0) {
                puts("ว่าง");
                continue;
            }
            printf("ออก %d\n", heap[0]);
            heap[0] = heap[--n];
            siftDown(heap, n, 0);
        } else if (strcmp(cmd, "peek") == 0) {
            if (n == 0) {
                puts("ว่าง");
            } else {
                printf("บนสุด: %d\n", heap[0]);
            }
        } else if (strcmp(cmd, "size") == 0) {
            printf("ขนาด: %d\n", n);
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

#define CAP 100

static void swapInt(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

static void siftUp(int *h, int i) {
    while (i > 0 && h[(i - 1) / 2] > h[i]) {
        swapInt(&h[(i - 1) / 2], &h[i]);
        i = (i - 1) / 2;
    }
}

static void siftDown(int *h, int n, int i) {
    for (;;) {
        int l = 2 * i + 1, r = 2 * i + 2, m = i;
        if (l < n && h[l] < h[m]) {
            m = l;
        }
        if (r < n && h[r] < h[m]) {
            m = r;
        }
        if (m == i) {
            return;
        }
        swapInt(&h[i], &h[m]);
        i = m;
    }
}

int main(void) {
    int heap[CAP];
    int n = 0;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "push") == 0) {
            int v = 0;
            scanf("%d", &v);
            if (n < CAP) {
                heap[n] = v;
                siftUp(heap, n);
                n++;
            }
        } else if (strcmp(cmd, "pop") == 0) {
            if (n == 0) {
                puts("ว่าง");
                continue;
            }
            printf("ออก %d\n", heap[0]);
            heap[0] = heap[--n];
            if (n > 1 && heap[1] < heap[0]) swapInt(&heap[0], &heap[1]);
        } else if (strcmp(cmd, "peek") == 0) {
            if (n == 0) {
                puts("ว่าง");
            } else {
                printf("บนสุด: %d\n", heap[0]);
            }
        } else if (strcmp(cmd, "size") == 0) {
            printf("ขนาด: %d\n", n);
        }
    }
    return 0;
}
`] },
  "c2-trees/5": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static const Tree *findNode(const Tree *t, int key) {
    while (t != NULL && t->key != key) {
        t = key < t->key ? t->left : t->right;
    }
    return t;
}

static Tree *removeKey(Tree *t, int key) {
    if (t == NULL) {
        return NULL;
    }
    if (key < t->key) {
        t->left = removeKey(t->left, key);
    } else if (key > t->key) {
        t->right = removeKey(t->right, key);
    } else if (t->left == NULL) {
        Tree *r = t->right;
        free(t);
        return r;
    } else if (t->right == NULL) {
        Tree *l = t->left;
        free(t);
        return l;
    } else {
        Tree *m = t->right;
        while (m->left != NULL) {
            m = m->left;
        }
        t->key = m->key;
        t->right = removeKey(t->right, m->key);
    }
    return t;
}

static void preorder(const Tree *t, int *first) {
    if (t == NULL) {
        return;
    }
    printf(*first ? "%d" : " %d", t->key);
    *first = 0;
    preorder(t->left, first);
    preorder(t->right, first);
}

int main(void) {
    Tree *root = NULL;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        int v = 0;
        if (cmd == 'i' && scanf("%d", &v) == 1) {
            root = insert(root, v);
        } else if (cmd == 'd' && scanf("%d", &v) == 1) {
            if (findNode(root, v) == NULL) {
                printf("ไม่พบ %d\n", v);
            } else {
                root = removeKey(root, v);
                printf("ลบ %d\n", v);
            }
        } else if (cmd == 'p') {
            if (root == NULL) {
                puts("(ว่าง)");
                continue;
            }
            int first = 1;
            preorder(root, &first);
            printf("\n");
        }
    }
    freeTree(root);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Tree {
    int key;
    struct Tree *left;
    struct Tree *right;
} Tree;

static Tree *insert(Tree *t, int key) {
    if (t == NULL) {
        t = malloc(sizeof *t);
        if (t == NULL) {
            exit(1);
        }
        t->key = key;
        t->left = t->right = NULL;
    } else if (key < t->key) {
        t->left = insert(t->left, key);
    } else if (key > t->key) {
        t->right = insert(t->right, key);
    }
    return t;
}

static void freeTree(Tree *t) {
    if (t == NULL) {
        return;
    }
    freeTree(t->left);
    freeTree(t->right);
    free(t);
}

static const Tree *findNode(const Tree *t, int key) {
    while (t != NULL && t->key != key) {
        t = key < t->key ? t->left : t->right;
    }
    return t;
}

static Tree *removeKey(Tree *t, int key) {
    if (t == NULL) {
        return NULL;
    }
    if (key < t->key) {
        t->left = removeKey(t->left, key);
    } else if (key > t->key) {
        t->right = removeKey(t->right, key);
    } else if (t->left == NULL) {
        Tree *r = t->right;
        free(t);
        return r;
    } else if (t->right == NULL) {
        Tree *l = t->left;
        free(t);
        return l;
    } else {
        Tree *m = t->right;
        t->key = m->key;
        t->right = removeKey(t->right, m->key);
    }
    return t;
}

static void preorder(const Tree *t, int *first) {
    if (t == NULL) {
        return;
    }
    printf(*first ? "%d" : " %d", t->key);
    *first = 0;
    preorder(t->left, first);
    preorder(t->right, first);
}

int main(void) {
    Tree *root = NULL;
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        int v = 0;
        if (cmd == 'i' && scanf("%d", &v) == 1) {
            root = insert(root, v);
        } else if (cmd == 'd' && scanf("%d", &v) == 1) {
            if (findNode(root, v) == NULL) {
                printf("ไม่พบ %d\n", v);
            } else {
                root = removeKey(root, v);
                printf("ลบ %d\n", v);
            }
        } else if (cmd == 'p') {
            if (root == NULL) {
                puts("(ว่าง)");
                continue;
            }
            int first = 1;
            preorder(root, &first);
            printf("\n");
        }
    }
    freeTree(root);
    return 0;
}
`] },
  "c2-trees/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Rec {
    int id;
    char name[32];
    int score;
    struct Rec *left;
    struct Rec *right;
} Rec;

static Rec *findRec(Rec *t, int id) {
    while (t != NULL && t->id != id) {
        t = id < t->id ? t->left : t->right;
    }
    return t;
}

static Rec *insertRec(Rec *t, Rec *n) {
    if (t == NULL) {
        return n;
    }
    if (n->id < t->id) {
        t->left = insertRec(t->left, n);
    } else {
        t->right = insertRec(t->right, n);
    }
    return t;
}

static Rec *removeRec(Rec *t, int id) {
    if (t == NULL) {
        return NULL;
    }
    if (id < t->id) {
        t->left = removeRec(t->left, id);
    } else if (id > t->id) {
        t->right = removeRec(t->right, id);
    } else if (t->left == NULL || t->right == NULL) {
        Rec *child = t->left != NULL ? t->left : t->right;
        free(t);
        return child;
    } else {
        Rec *m = t->right;
        while (m->left != NULL) {
            m = m->left;
        }
        t->id = m->id;
        memcpy(t->name, m->name, sizeof t->name);
        t->score = m->score;
        t->right = removeRec(t->right, m->id);
    }
    return t;
}

static int height(const Rec *t) {
    if (t == NULL) {
        return 0;
    }
    int l = height(t->left), r = height(t->right);
    return 1 + (l > r ? l : r);
}

static int count(const Rec *t) {
    return t == NULL ? 0 : 1 + count(t->left) + count(t->right);
}

static int printRange(const Rec *t, int a, int b) {
    if (t == NULL) {
        return 0;
    }
    int n = 0;
    if (t->id > a) {
        n += printRange(t->left, a, b);
    }
    if (t->id >= a && t->id <= b) {
        printf("%d %s %d\n", t->id, t->name, t->score);
        n++;
    }
    if (t->id < b) {
        n += printRange(t->right, a, b);
    }
    return n;
}

static void freeAll(Rec *t) {
    if (t == NULL) {
        return;
    }
    freeAll(t->left);
    freeAll(t->right);
    free(t);
}

int main(void) {
    Rec *root = NULL;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int id = 0, score = 0;
            char name[64];
            if (scanf("%d %63s %d", &id, name, &score) != 3) {
                break;
            }
            if (findRec(root, id) != NULL) {
                puts("รหัสซ้ำ");
                continue;
            }
            Rec *n = malloc(sizeof *n);
            if (n == NULL) {
                break;
            }
            n->id = id;
            snprintf(n->name, sizeof n->name, "%s", name);
            n->score = score;
            n->left = n->right = NULL;
            root = insertRec(root, n);
            printf("เพิ่ม %d\n", id);
        } else if (strcmp(cmd, "get") == 0) {
            int id = 0;
            scanf("%d", &id);
            Rec *r = findRec(root, id);
            if (r == NULL) {
                printf("ไม่พบ %d\n", id);
            } else {
                printf("%d %s %d\n", r->id, r->name, r->score);
            }
        } else if (strcmp(cmd, "del") == 0) {
            int id = 0;
            scanf("%d", &id);
            if (findRec(root, id) == NULL) {
                printf("ไม่พบ %d\n", id);
            } else {
                root = removeRec(root, id);
                printf("ลบ %d\n", id);
            }
        } else if (strcmp(cmd, "list") == 0) {
            if (root == NULL) {
                puts("(ว่าง)");
            } else {
                printRange(root, -2147483647 - 1, 2147483647);
            }
        } else if (strcmp(cmd, "range") == 0) {
            int a = 0, b = 0;
            scanf("%d %d", &a, &b);
            if (printRange(root, a, b) == 0) {
                puts("(ไม่มี)");
            }
        } else if (strcmp(cmd, "stats") == 0) {
            printf("จำนวน: %d · ความสูง: %d", count(root), height(root));
            if (root != NULL) {
                const Rec *lo = root, *hi = root;
                while (lo->left != NULL) {
                    lo = lo->left;
                }
                while (hi->right != NULL) {
                    hi = hi->right;
                }
                printf(" · รหัส: %d–%d", lo->id, hi->id);
            }
            printf("\n");
        }
    }
    freeAll(root);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Rec {
    int id;
    char name[32];
    int score;
    struct Rec *left;
    struct Rec *right;
} Rec;

static Rec *findRec(Rec *t, int id) {
    while (t != NULL && t->id != id) {
        t = id < t->id ? t->left : t->right;
    }
    return t;
}

static Rec *insertRec(Rec *t, Rec *n) {
    if (t == NULL) {
        return n;
    }
    if (n->id < t->id) {
        t->left = insertRec(t->left, n);
    } else {
        t->right = insertRec(t->right, n);
    }
    return t;
}

static Rec *removeRec(Rec *t, int id) {
    if (t == NULL) {
        return NULL;
    }
    if (id < t->id) {
        t->left = removeRec(t->left, id);
    } else if (id > t->id) {
        t->right = removeRec(t->right, id);
    } else if (t->left == NULL || t->right == NULL) {
        Rec *child = t->left != NULL ? t->left : t->right;
        free(t);
        return child;
    } else {
        Rec *m = t->right;
        while (m->left != NULL) {
            m = m->left;
        }
        t->id = m->id;
        t->right = removeRec(t->right, m->id);
    }
    return t;
}

static int height(const Rec *t) {
    if (t == NULL) {
        return 0;
    }
    int l = height(t->left), r = height(t->right);
    return 1 + (l > r ? l : r);
}

static int count(const Rec *t) {
    return t == NULL ? 0 : 1 + count(t->left) + count(t->right);
}

static int printRange(const Rec *t, int a, int b) {
    if (t == NULL) {
        return 0;
    }
    int n = 0;
    if (t->id > a) {
        n += printRange(t->left, a, b);
    }
    if (t->id >= a && t->id <= b) {
        printf("%d %s %d\n", t->id, t->name, t->score);
        n++;
    }
    if (t->id < b) {
        n += printRange(t->right, a, b);
    }
    return n;
}

static void freeAll(Rec *t) {
    if (t == NULL) {
        return;
    }
    freeAll(t->left);
    freeAll(t->right);
    free(t);
}

int main(void) {
    Rec *root = NULL;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int id = 0, score = 0;
            char name[64];
            if (scanf("%d %63s %d", &id, name, &score) != 3) {
                break;
            }
            if (findRec(root, id) != NULL) {
                puts("รหัสซ้ำ");
                continue;
            }
            Rec *n = malloc(sizeof *n);
            if (n == NULL) {
                break;
            }
            n->id = id;
            snprintf(n->name, sizeof n->name, "%s", name);
            n->score = score;
            n->left = n->right = NULL;
            root = insertRec(root, n);
            printf("เพิ่ม %d\n", id);
        } else if (strcmp(cmd, "get") == 0) {
            int id = 0;
            scanf("%d", &id);
            Rec *r = findRec(root, id);
            if (r == NULL) {
                printf("ไม่พบ %d\n", id);
            } else {
                printf("%d %s %d\n", r->id, r->name, r->score);
            }
        } else if (strcmp(cmd, "del") == 0) {
            int id = 0;
            scanf("%d", &id);
            if (findRec(root, id) == NULL) {
                printf("ไม่พบ %d\n", id);
            } else {
                root = removeRec(root, id);
                printf("ลบ %d\n", id);
            }
        } else if (strcmp(cmd, "list") == 0) {
            if (root == NULL) {
                puts("(ว่าง)");
            } else {
                printRange(root, -2147483647 - 1, 2147483647);
            }
        } else if (strcmp(cmd, "range") == 0) {
            int a = 0, b = 0;
            scanf("%d %d", &a, &b);
            if (printRange(root, a, b) == 0) {
                puts("(ไม่มี)");
            }
        } else if (strcmp(cmd, "stats") == 0) {
            printf("จำนวน: %d · ความสูง: %d", count(root), height(root));
            if (root != NULL) {
                const Rec *lo = root, *hi = root;
                while (lo->left != NULL) {
                    lo = lo->left;
                }
                while (hi->right != NULL) {
                    hi = hi->right;
                }
                printf(" · รหัส: %d–%d", lo->id, hi->id);
            }
            printf("\n");
        }
    }
    freeAll(root);
    return 0;
}
`] },

  // ── Stage 27: Algorithms และ Big-O ──
  "c2-algo/0": { sol: R`#include <stdio.h>

int main(void) {
    int a[1000] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    long long shifts = 0;
    for (int i = 1; i < n; i++) {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
            shifts++;
        }
        a[j + 1] = key;
    }
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\nการเลื่อน: %lld\n", shifts);
    return 0;
}
`, wrong: [R`#include <stdio.h>

int main(void) {
    int a[1000] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    long long shifts = 0;
    for (int i = 1; i < n; i++) {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] >= key) {
            a[j + 1] = a[j];
            j--;
            shifts++;
        }
        a[j + 1] = key;
    }
    for (int i = 0; i < n; i++) {
        printf(i ? " %d" : "%d", a[i]);
    }
    printf("\nการเลื่อน: %lld\n", shifts);
    return 0;
}
`] },
  "c2-algo/1": { sol: R`#include <stdio.h>
#include <stdlib.h>

static void mergeSort(int *a, int *tmp, int lo, int hi) {
    if (hi - lo <= 1) {
        return;
    }
    int mid = lo + (hi - lo) / 2;
    mergeSort(a, tmp, lo, mid);
    mergeSort(a, tmp, mid, hi);
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    }
    while (i < mid) {
        tmp[k++] = a[i++];
    }
    while (j < hi) {
        tmp[k++] = a[j++];
    }
    for (int x = lo; x < hi; x++) {
        a[x] = tmp[x];
    }
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *a = malloc(((size_t)n + 1) * sizeof *a);
    int *tmp = malloc(((size_t)n + 1) * sizeof *tmp);
    if (a == NULL || tmp == NULL) {
        free(a);
        free(tmp);
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    mergeSort(a, tmp, 0, n);
    int distinct = n > 0;
    for (int i = 1; i < n; i++) {
        if (a[i] != a[i - 1]) {
            distinct++;
        }
    }
    printf("ค่ากลาง: %d\nค่าที่ต่างกัน: %d\n", a[n / 2], distinct);
    free(a);
    free(tmp);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static void mergeSort(int *a, int *tmp, int lo, int hi) {
    if (hi - lo <= 1) {
        return;
    }
    int mid = lo + (hi - lo) / 2;
    mergeSort(a, tmp, lo, mid);
    mergeSort(a, tmp, mid, hi);
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    }
    while (i < mid) {
        tmp[k++] = a[i++];
    }
    while (j < hi) {
        tmp[k++] = a[j++];
    }
    for (int x = lo; x < hi; x++) {
        a[x] = tmp[x];
    }
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *a = malloc(((size_t)n + 1) * sizeof *a);
    int *tmp = malloc(((size_t)n + 1) * sizeof *tmp);
    if (a == NULL || tmp == NULL) {
        free(a);
        free(tmp);
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    mergeSort(a, tmp, 0, n);
    int distinct = n > 0;
    for (int i = 1; i < n; i++) {
        if (a[i] != a[i - 1]) {
            distinct++;
        }
    }
    printf("ค่ากลาง: %d\nค่าที่ต่างกัน: %d\n", a[n / 2 - (n > 1)], distinct);
    free(a);
    free(tmp);
    return 0;
}
`] },
  "c2-algo/2": { sol: R`#include <stdio.h>
#include <stdlib.h>

static int upperBound(const int *a, int n, int x) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] <= x) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *a = malloc(((size_t)n + 1) * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int q = 0;
    scanf("%d", &q);
    long long total = 0;
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        total += upperBound(a, n, x);
    }
    printf("ผลรวม: %lld\n", total);
    free(a);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static int upperBound(const int *a, int n, int x) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < x) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *a = malloc(((size_t)n + 1) * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int q = 0;
    scanf("%d", &q);
    long long total = 0;
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        total += upperBound(a, n, x);
    }
    printf("ผลรวม: %lld\n", total);
    free(a);
    return 0;
}
`] },
  "c2-algo/3": { sol: R`#include <stdio.h>

static int lowerBound(const int *a, int n, int x) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < x) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

int main(void) {
    int a[1000] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int q = 0;
    scanf("%d", &q);
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        printf("ตำแหน่ง: %d\n", lowerBound(a, n, x));
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

static int lowerBound(const int *a, int n, int x) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] <= x) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

int main(void) {
    int a[1000] = {0};
    int n = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int q = 0;
    scanf("%d", &q);
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        printf("ตำแหน่ง: %d\n", lowerBound(a, n, x));
    }
    return 0;
}
`] },
  "c2-algo/4": { sol: R`#include <stdio.h>
#include <string.h>

int main(void) {
    char g[50][51];
    int r = 0, c = 0;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) {
        scanf("%50s", g[i]);
    }
    int dist[50][50];
    int qr[2500], qc[2500], head = 0, tail = 0;
    memset(dist, -1, sizeof dist);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (g[i][j] == 'S') {
                dist[i][j] = 0;
                qr[tail] = i;
                qc[tail++] = j;
            }
        }
    }
    const int dr[4] = {1, -1, 0, 0}, dc[4] = {0, 0, 1, -1};
    while (head < tail) {
        int y = qr[head], x = qc[head++];
        if (g[y][x] == 'E') {
            printf("ระยะสั้นสุด: %d\n", dist[y][x]);
            return 0;
        }
        for (int d = 0; d < 4; d++) {
            int ny = y + dr[d], nx = x + dc[d];
            if (ny < 0 || ny >= r || nx < 0 || nx >= c || g[ny][nx] == '#' || dist[ny][nx] != -1) {
                continue;
            }
            dist[ny][nx] = dist[y][x] + 1;
            qr[tail] = ny;
            qc[tail++] = nx;
        }
    }
    puts("ไปไม่ถึง");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

int main(void) {
    char g[50][51];
    int r = 0, c = 0;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) {
        scanf("%50s", g[i]);
    }
    int dist[50][50];
    int qr[2500], qc[2500], head = 0, tail = 0;
    memset(dist, -1, sizeof dist);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (g[i][j] == 'S') {
                dist[i][j] = 0;
                qr[tail] = i;
                qc[tail++] = j;
            }
        }
    }
    const int dr[4] = {1, -1, 0, 0}, dc[4] = {0, 0, 1, -1};
    while (head < tail) {
        int y = qr[head], x = qc[head++];
        if (g[y][x] == 'E') {
            printf("ระยะสั้นสุด: %d\n", dist[y][x]);
            return 0;
        }
        for (int d = 0; d < 3; d++) {
            int ny = y + dr[d], nx = x + dc[d];
            if (ny < 0 || ny >= r || nx < 0 || nx >= c || g[ny][nx] == '#' || dist[ny][nx] != -1) {
                continue;
            }
            dist[ny][nx] = dist[y][x] + 1;
            qr[tail] = ny;
            qc[tail++] = nx;
        }
    }
    puts("ไปไม่ถึง");
    return 0;
}
`] },
  "c2-algo/5": { sol: R`#include <stdio.h>

static char g[50][51];
static int R, C;

static int fill(int r, int c) {
    if (r < 0 || r >= R || c < 0 || c >= C || g[r][c] != '#') {
        return 0;
    }
    g[r][c] = '.';
    return 1 + fill(r + 1, c) + fill(r - 1, c) + fill(r, c + 1) + fill(r, c - 1);
}

int main(void) {
    scanf("%d %d", &R, &C);
    for (int i = 0; i < R; i++) {
        scanf("%50s", g[i]);
    }
    int islands = 0, biggest = 0;
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (g[i][j] == '#') {
                int size = fill(i, j);
                islands++;
                if (size > biggest) {
                    biggest = size;
                }
            }
        }
    }
    printf("เกาะ: %d · ใหญ่สุด: %d\n", islands, biggest);
    return 0;
}
`, wrong: [R`#include <stdio.h>

static char g[50][51];
static int R, C;

static int fill(int r, int c) {
    if (r < 0 || r >= R || c < 0 || c >= C || g[r][c] != '#') {
        return 0;
    }
    g[r][c] = '.';
    return 1 + fill(r + 1, c) + fill(r - 1, c) + fill(r, c + 1) + fill(r, c - 1) + fill(r + 1, c + 1) + fill(r - 1, c - 1) + fill(r + 1, c - 1) + fill(r - 1, c + 1);
}

int main(void) {
    scanf("%d %d", &R, &C);
    for (int i = 0; i < R; i++) {
        scanf("%50s", g[i]);
    }
    int islands = 0, biggest = 0;
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (g[i][j] == '#') {
                int size = fill(i, j);
                islands++;
                if (size > biggest) {
                    biggest = size;
                }
            }
        }
    }
    printf("เกาะ: %d · ใหญ่สุด: %d\n", islands, biggest);
    return 0;
}
`] },
  "c2-algo/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    long long total;
} Region;

static int cmpRegion(const void *pa, const void *pb) {
    const Region *a = pa, *b = pb;
    if (a->total != b->total) {
        return (b->total > a->total) - (b->total < a->total);
    }
    return strcmp(a->name, b->name);
}

int main(void) {
    FILE *f = fopen("/data/sales.csv", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    Region list[50];
    int n = 0, skipped = 0;
    long long all = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        char *field[4];
        int k = 0;
        for (char *t = strtok(line, ","); t != NULL && k < 4; t = strtok(NULL, ",")) {
            field[k++] = t;
        }
        char *end = NULL;
        long long v = k == 3 ? strtoll(field[2], &end, 10) : -1;
        if (k != 3 || end == field[2] || *end != '\0' || v < 0) {
            skipped++;
            continue;
        }
        int i = 0;
        while (i < n && strcmp(list[i].name, field[0]) != 0) {
            i++;
        }
        if (i == n) {
            if (n == 50) {
                skipped++;
                continue;
            }
            snprintf(list[n].name, sizeof list[n].name, "%s", field[0]);
            list[n].total = 0;
            n++;
        }
        list[i].total += v;
        all += v;
    }
    fclose(f);
    qsort(list, (size_t)n, sizeof list[0], cmpRegion);
    for (int i = 0; i < n; i++) {
        printf("%s: %lld\n", list[i].name, list[i].total);
    }
    printf("รวมทั้งหมด: %lld · ข้าม: %d\n", all, skipped);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    long long total;
} Region;

static int cmpRegion(const void *pa, const void *pb) {
    const Region *a = pa, *b = pb;
    if (a->total != b->total) {
        return (b->total > a->total) - (b->total < a->total);
    }
    return strcmp(b->name, a->name);
}

int main(void) {
    FILE *f = fopen("/data/sales.csv", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    Region list[50];
    int n = 0, skipped = 0;
    long long all = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        char *field[4];
        int k = 0;
        for (char *t = strtok(line, ","); t != NULL && k < 4; t = strtok(NULL, ",")) {
            field[k++] = t;
        }
        char *end = NULL;
        long long v = k == 3 ? strtoll(field[2], &end, 10) : -1;
        if (k != 3 || end == field[2] || *end != '\0' || v < 0) {
            skipped++;
            continue;
        }
        int i = 0;
        while (i < n && strcmp(list[i].name, field[0]) != 0) {
            i++;
        }
        if (i == n) {
            if (n == 50) {
                skipped++;
                continue;
            }
            snprintf(list[n].name, sizeof list[n].name, "%s", field[0]);
            list[n].total = 0;
            n++;
        }
        list[i].total += v;
        all += v;
    }
    fclose(f);
    qsort(list, (size_t)n, sizeof list[0], cmpRegion);
    for (int i = 0; i < n; i++) {
        printf("%s: %lld\n", list[i].name, list[i].total);
    }
    printf("รวมทั้งหมด: %lld · ข้าม: %d\n", all, skipped);
    return 0;
}
`] },
  // ── Stage 28: Debugging, UB และ memory safety ──
  "c2-debug/0": { sol: R`#include <stdio.h>
#include <assert.h>

static double average(const int *a, int n) {
    assert(n > 0);
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return (double)s / n;
}

int main(void) {
    int a[100];
    int n = 0;
    while (n < 100 && scanf("%d", &a[n]) == 1) {
        n++;
    }
    if (n == 0) {
        puts("ไม่มีข้อมูล");
    } else {
        printf("เฉลี่ย: %.2f\n", average(a, n));
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <assert.h>

static double average(const int *a, int n) {
    assert(n > 0);
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
    }
    return (double)s / n;
}

int main(void) {
    int a[100];
    int n = 0;
    while (n < 100 && scanf("%d", &a[n]) == 1) {
        n++;
    }
    if (n == 0) {
        puts("เฉลี่ย: 0.00");
    } else {
        printf("เฉลี่ย: %.2f\n", average(a, n));
    }
    return 0;
}
`] },
  "c2-debug/1": { sol: R`#include <stdio.h>
#include <limits.h>

int main(void) {
    int qty = 0, price = 0;
    scanf("%d %d", &qty, &price);
    if (qty != 0 && price > INT_MAX / qty) {
        puts("ยอดเกินขอบเขต");
    } else {
        printf("ยอดรวม: %d\n", qty * price);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <limits.h>

int main(void) {
    int qty = 0, price = 0;
    scanf("%d %d", &qty, &price);
    if (qty != 0 && price >= INT_MAX / qty) {
        puts("ยอดเกินขอบเขต");
    } else {
        printf("ยอดรวม: %d\n", qty * price);
    }
    return 0;
}
`] },
  "c2-debug/2": { sol: R`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[8];
    int score;
} Player;

int main(void) {
    Player p;
    char buf[64] = "";
    scanf("%d %63s", &p.score, buf);
    snprintf(p.name, sizeof p.name, "%s", buf);
    printf("%s: %d\n", p.name, p.score);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[8];
    int score;
} Player;

int main(void) {
    Player p;
    char buf[64] = "";
    scanf("%d %63s", &p.score, buf);
    memcpy(p.name, buf, sizeof p.name);
    printf("%s: %d\n", p.name, p.score);
    return 0;
}
`] },
  "c2-debug/3": { sol: R`#include <stdio.h>
#include <string.h>

int main(void) {
    int k = 0, count = 0;
    scanf("%d", &k);
    char w[64];
    while (scanf("%63s", w) == 1) {
        fprintf(stderr, "DEBUG: คำ=%s ความยาว=%zu\n", w, strlen(w));
        if (strlen(w) > (size_t)k) {
            count++;
        }
    }
    printf("ยาวกว่า %d: %d คำ\n", k, count);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

int main(void) {
    int k = 0, count = 0;
    scanf("%d", &k);
    char w[64];
    while (scanf("%63s", w) == 1) {
        fprintf(stderr, "DEBUG: คำ=%s ความยาว=%zu\n", w, strlen(w));
        if (strlen(w) >= (size_t)k) {
            count++;
        }
    }
    printf("ยาวกว่า %d: %d คำ\n", k, count);
    return 0;
}
`] },
  "c2-debug/4": { sol: R`#include <stdio.h>

static int counter = 0;

static int next(void) {
    return ++counter;
}

int main(void) {
    int a = next();
    int b = next();
    printf("%d %d\n", a, b);
    int c = next();
    int d = next();
    printf("%d %d\n", c, d);
    return 0;
}
`, wrong: [R`#include <stdio.h>

static int counter = 0;

static int next(void) {
    return ++counter;
}

int main(void) {
    int a = next();
    int b = next();
    printf("%d %d\n", a, b);
    int c = next();
    int d = next();
    printf("%d %d\n", d, c);
    return 0;
}
`] },
  "c2-debug/5": { sol: R`#include <stdio.h>
#include <string.h>

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    int ascii = 0, other = 0;
    for (size_t i = 0; line[i] != '\0'; i++) {
        unsigned char c = (unsigned char)line[i];
        if (c >= 128) {
            other++;
        } else {
            ascii++;
        }
    }
    printf("ASCII: %d · ไม่ใช่ ASCII: %d\n", ascii, other);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

int main(void) {
    char line[256] = "";
    if (fgets(line, sizeof line, stdin) == NULL) {
        line[0] = '\0';
    }
    line[strcspn(line, "\n")] = '\0';
    int ascii = 0, other = 0;
    for (size_t i = 0; line[i] != '\0'; i++) {
        unsigned char c = (unsigned char)line[i];
        if (c >= 127) {
            other++;
        } else {
            ascii++;
        }
    }
    printf("ASCII: %d · ไม่ใช่ ASCII: %d\n", ascii, other);
    return 0;
}
`] },
  "c2-debug/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *msg;
    int count;
} ErrStat;

static char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

int main(void) {
    FILE *f = fopen("/data/server.log", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    ErrStat *stats = NULL;
    size_t nstats = 0, cap = 0;
    int info = 0, warn = 0, error = 0, bad = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        char *sp = strchr(line, ' ');
        if (sp == NULL || sp[1] == '\0') {
            bad++;
            continue;
        }
        *sp = '\0';
        const char *msg = sp + 1;
        if (strcmp(line, "INFO") == 0) {
            info++;
        } else if (strcmp(line, "WARN") == 0) {
            warn++;
        } else if (strcmp(line, "ERROR") == 0) {
            error++;
            size_t i = 0;
            while (i < nstats && strcmp(stats[i].msg, msg) != 0) {
                i++;
            }
            if (i == nstats) {
                if (nstats == cap) {
                    size_t nc = cap ? cap * 2 : 4;
                    ErrStat *t = realloc(stats, nc * sizeof *t);
                    if (t == NULL) {
                        break;
                    }
                    stats = t;
                    cap = nc;
                }
                stats[nstats].msg = dupString(msg);
                stats[nstats].count = 0;
                nstats++;
            }
            stats[i].count++;
        } else {
            bad++;
        }
    }
    fclose(f);
    printf("INFO: %d · WARN: %d · ERROR: %d\nผิดรูปแบบ: %d\n", info, warn, error, bad);
    size_t best = 0;
    for (size_t i = 1; i < nstats; i++) {
        if (stats[i].count > stats[best].count) {
            best = i;
        }
    }
    if (nstats == 0) {
        puts("ERROR ที่พบบ่อยที่สุด: -");
    } else {
        printf("ERROR ที่พบบ่อยที่สุด: %s (%d ครั้ง)\n", stats[best].msg, stats[best].count);
    }
    for (size_t i = 0; i < nstats; i++) {
        free(stats[i].msg);
    }
    free(stats);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *msg;
    int count;
} ErrStat;

static char *dupString(const char *s) {
    size_t len = strlen(s) + 1;
    char *p = malloc(len);
    if (p != NULL) {
        memcpy(p, s, len);
    }
    return p;
}

int main(void) {
    FILE *f = fopen("/data/server.log", "r");
    if (f == NULL) {
        puts("เปิดไฟล์ไม่ได้");
        return 0;
    }
    ErrStat *stats = NULL;
    size_t nstats = 0, cap = 0;
    int info = 0, warn = 0, error = 0, bad = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        char *sp = strchr(line, ' ');
        if (sp == NULL || sp[1] == '\0') {
            bad++;
            continue;
        }
        *sp = '\0';
        const char *msg = sp + 1;
        if (strcmp(line, "INFO") == 0) {
            info++;
        } else if (strcmp(line, "WARN") == 0) {
            warn++;
        } else if (strcmp(line, "ERROR") == 0) {
            error++;
            size_t i = 0;
            while (i < nstats && strcmp(stats[i].msg, msg) != 0) {
                i++;
            }
            if (i == nstats) {
                if (nstats == cap) {
                    size_t nc = cap ? cap * 2 : 4;
                    ErrStat *t = realloc(stats, nc * sizeof *t);
                    if (t == NULL) {
                        break;
                    }
                    stats = t;
                    cap = nc;
                }
                stats[nstats].msg = dupString(msg);
                stats[nstats].count = 0;
                nstats++;
            }
            stats[i].count++;
        } else {
            bad++;
        }
    }
    fclose(f);
    printf("INFO: %d · WARN: %d · ERROR: %d\nผิดรูปแบบ: %d\n", info, warn, error, bad);
    size_t best = 0;
    for (size_t i = 1; i < nstats; i++) {
        if (stats[i].count >= stats[best].count) {
            best = i;
        }
    }
    if (nstats == 0) {
        puts("ERROR ที่พบบ่อยที่สุด: -");
    } else {
        printf("ERROR ที่พบบ่อยที่สุด: %s (%d ครั้ง)\n", stats[best].msg, stats[best].count);
    }
    for (size_t i = 0; i < nstats; i++) {
        free(stats[i].msg);
    }
    free(stats);
    return 0;
}
`] },

  // ── Stage 29: Testing และ Performance ──
  "c2-test/0": { sol: R`#include <stdio.h>
#include <string.h>

typedef int (*DateFn)(int y, int m, int d);

/* ── ชุดทดสอบของคุณ ── */
static int runTests(DateFn valid) {
    int failures = 0;
#define CHECK(cond) do { if (!(cond)) failures++; } while (0)
    CHECK(valid(2024, 1, 15) == 1);
    CHECK(valid(2024, 2, 29) == 1);
    CHECK(valid(2023, 2, 29) == 0);
    CHECK(valid(1900, 2, 29) == 0);
    CHECK(valid(2000, 2, 29) == 1);
    CHECK(valid(2024, 4, 31) == 0);
    CHECK(valid(2024, 4, 30) == 1);
    CHECK(valid(2024, 13, 1) == 0);
    CHECK(valid(2024, 1, 0) == 0);
    CHECK(valid(2024, 12, 31) == 1);
#undef CHECK
    return failures;
}

/* ── ฟังก์ชันที่ถูก และเวอร์ชันที่มีบั๊ก (ห้ามแก้) ── */
static int leapOk(int y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }
static int daysIn(int y, int m, int (*leap)(int)) {
    static const int dm[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    return m == 2 && leap(y) ? 29 : dm[m - 1];
}
static int noLeap(int y) { (void)y; return 0; }
static int leap4(int y) { return y % 4 == 0; }
static int leapNo400(int y) { return y % 4 == 0 && y % 100 != 0; }
static int correct(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, leapOk); }
static int bugNoLeap(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, noLeap); }
static int bugLeap4(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, leap4); }
static int bugMonth13(int y, int m, int d) { return m >= 1 && m <= 13 && d >= 1 && d <= (m == 13 ? 31 : daysIn(y, m, leapOk)); }
static int bugAll31(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= (m == 2 ? daysIn(y, m, leapOk) : 31); }
static int bugDayZero(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 0 && d <= daysIn(y, m, leapOk); }
static int bugNo400(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, leapNo400); }

int main(void) {
    char mode[8] = "";
    scanf("%7s", mode);
    DateFn fn = correct;
    if (strcmp(mode, "m1") == 0) fn = bugNoLeap;
    else if (strcmp(mode, "m2") == 0) fn = bugLeap4;
    else if (strcmp(mode, "m3") == 0) fn = bugMonth13;
    else if (strcmp(mode, "m4") == 0) fn = bugAll31;
    else if (strcmp(mode, "m5") == 0) fn = bugDayZero;
    else if (strcmp(mode, "m6") == 0) fn = bugNo400;
    puts(runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

typedef int (*DateFn)(int y, int m, int d);

/* ── ชุดทดสอบของคุณ ── */
static int runTests(DateFn valid) {
    int failures = 0;
#define CHECK(cond) do { if (!(cond)) failures++; } while (0)
    CHECK(valid(2024, 1, 15) == 1);
    CHECK(valid(2024, 2, 29) == 1);
    CHECK(valid(2023, 2, 29) == 0);
    CHECK(valid(1900, 2, 29) == 0);
    CHECK(valid(2024, 4, 31) == 0);
    CHECK(valid(2024, 4, 30) == 1);
    CHECK(valid(2024, 13, 1) == 0);
    CHECK(valid(2024, 1, 0) == 0);
    CHECK(valid(2024, 12, 31) == 1);
#undef CHECK
    return failures;
}

/* ── ฟังก์ชันที่ถูก และเวอร์ชันที่มีบั๊ก (ห้ามแก้) ── */
static int leapOk(int y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }
static int daysIn(int y, int m, int (*leap)(int)) {
    static const int dm[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    return m == 2 && leap(y) ? 29 : dm[m - 1];
}
static int noLeap(int y) { (void)y; return 0; }
static int leap4(int y) { return y % 4 == 0; }
static int leapNo400(int y) { return y % 4 == 0 && y % 100 != 0; }
static int correct(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, leapOk); }
static int bugNoLeap(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, noLeap); }
static int bugLeap4(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, leap4); }
static int bugMonth13(int y, int m, int d) { return m >= 1 && m <= 13 && d >= 1 && d <= (m == 13 ? 31 : daysIn(y, m, leapOk)); }
static int bugAll31(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= (m == 2 ? daysIn(y, m, leapOk) : 31); }
static int bugDayZero(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 0 && d <= daysIn(y, m, leapOk); }
static int bugNo400(int y, int m, int d) { return m >= 1 && m <= 12 && d >= 1 && d <= daysIn(y, m, leapNo400); }

int main(void) {
    char mode[8] = "";
    scanf("%7s", mode);
    DateFn fn = correct;
    if (strcmp(mode, "m1") == 0) fn = bugNoLeap;
    else if (strcmp(mode, "m2") == 0) fn = bugLeap4;
    else if (strcmp(mode, "m3") == 0) fn = bugMonth13;
    else if (strcmp(mode, "m4") == 0) fn = bugAll31;
    else if (strcmp(mode, "m5") == 0) fn = bugDayZero;
    else if (strcmp(mode, "m6") == 0) fn = bugNo400;
    puts(runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด");
    return 0;
}
`] },
  "c2-test/1": { sol: R`#include <stdio.h>

static int tests = 0, failures = 0;

#define CHECK(cond) do { tests++; if (!(cond)) { failures++; fprintf(stderr, "FAIL บรรทัด %d: %s\n", __LINE__, #cond); } } while (0)

static int maxOf(const int *a, int n) {
    int m = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > m) {
            m = a[i];
        }
    }
    return m;
}

int main(void) {
    int a[] = {3, 9, 1}, b[] = {-5, -2, -9}, c[] = {7}, d[] = {4, 4};
    CHECK(maxOf(a, 3) == 9);
    CHECK(maxOf(b, 3) == -2);
    CHECK(maxOf(c, 1) == 7);
    CHECK(maxOf(d, 2) == 4);
    printf("ผ่าน %d / %d\n", tests - failures, tests);
    return 0;
}
`, wrong: [R`#include <stdio.h>

static int tests = 0, failures = 0;

#define CHECK(cond) do { tests++; if (!(cond)) { failures++; fprintf(stderr, "FAIL บรรทัด %d: %s\n", __LINE__, #cond); } } while (0)

static int maxOf(const int *a, int n) {
    int m = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > m) {
            m = a[i];
        }
    }
    return m;
}

int main(void) {
    int a[] = {3, 9, 1}, b[] = {-5, -2, -9}, c[] = {7}, d[] = {4, 4};
    CHECK(maxOf(a, 3) == 9);
    CHECK(maxOf(b, 3) == -2);
    CHECK(maxOf(c, 1) == 7);
    CHECK(maxOf(d, 2) == 4);
    CHECK(maxOf(c, 1) == 0);
    printf("ผ่าน %d / %d\n", tests, tests + failures);
    return 0;
}
`] },
  "c2-test/2": { sol: R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

static int wordCount(const char *s) {
    int n = 0, inWord = 0;
    for (size_t i = 0; s[i] != '\0'; i++) {
        if (isspace((unsigned char)s[i])) {
            inWord = 0;
        } else if (!inWord) {
            inWord = 1;
            n++;
        }
    }
    return n;
}

static int tests = 0, failures = 0;
#define CHECK(cond) do { tests++; if (!(cond)) { failures++; fprintf(stderr, "FAIL บรรทัด %d: %s\n", __LINE__, #cond); } } while (0)

int main(void) {
    CHECK(wordCount("a b") == 2);
    CHECK(wordCount("") == 0);
    CHECK(wordCount("  lead") == 1);
    CHECK(wordCount("a  b") == 2);
    CHECK(wordCount("trail  ") == 1);
    CHECK(wordCount("one") == 1);
    printf("ผ่าน %d / %d\n", tests - failures, tests);
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        printf("คำ: %d\n", wordCount(line));
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

static int wordCount(const char *s) {
    int n = 0, inWord = 0;
    for (size_t i = 0; s[i] != '\0'; i++) {
        if (s[i] == ' ') {
            inWord = 0;
        } else if (!inWord) {
            inWord = 1;
            n++;
        }
    }
    return n;
}

static int tests = 0, failures = 0;
#define CHECK(cond) do { tests++; if (!(cond)) { failures++; fprintf(stderr, "FAIL บรรทัด %d: %s\n", __LINE__, #cond); } } while (0)

int main(void) {
    CHECK(wordCount("a b") == 2);
    CHECK(wordCount("") == 0);
    CHECK(wordCount("  lead") == 1);
    CHECK(wordCount("a  b") == 2);
    CHECK(wordCount("trail  ") == 1);
    CHECK(wordCount("one") == 1);
    printf("ผ่าน %d / %d\n", tests - failures, tests);
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        printf("คำ: %d\n", wordCount(line));
    }
    return 0;
}
`] },
  "c2-test/3": { sol: R`#include <stdio.h>
#include <stdlib.h>

static int cmpInt(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *a = malloc(((size_t)n + 1) * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    qsort(a, (size_t)n, sizeof *a, cmpInt);
    int unique = 0;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || a[i] != a[i - 1]) {
            unique++;
            sum += a[i];
        }
    }
    printf("ค่าที่ไม่ซ้ำ: %d\nผลรวม: %lld\n", unique, sum);
    free(a);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static int cmpInt(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *a = malloc(((size_t)n + 1) * sizeof *a);
    if (a == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    qsort(a, (size_t)n, sizeof *a, cmpInt);
    int unique = 0;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || a[i] > a[i - 1] + 1) {
            unique++;
            sum += a[i];
        }
    }
    printf("ค่าที่ไม่ซ้ำ: %d\nผลรวม: %lld\n", unique, sum);
    free(a);
    return 0;
}
`] },
  "c2-test/4": { sol: R`#include <stdio.h>
#include <string.h>

typedef struct {
    int values[5000];
    int count;
} Samples;

static double mean(const Samples *s) {
    long long sum = 0;
    for (int i = 0; i < s->count; i++) {
        sum += s->values[i];
    }
    return (double)sum / s->count;
}

static int maxOf(const Samples *s) {
    int m = s->values[0];
    for (int i = 1; i < s->count; i++) {
        if (s->values[i] > m) {
            m = s->values[i];
        }
    }
    return m;
}

int main(void) {
    static Samples s;
    scanf("%d", &s.count);
    for (int i = 0; i < s.count; i++) {
        scanf("%d", &s.values[i]);
    }
    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "mean") == 0) {
            printf("เฉลี่ย: %.2f\n", mean(&s));
        } else if (strcmp(cmd, "max") == 0) {
            printf("สูงสุด: %d\n", maxOf(&s));
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

typedef struct {
    int values[5000];
    int count;
} Samples;

static double mean(const Samples *s) {
    long long sum = 0;
    for (int i = 0; i < s->count; i++) {
        sum += s->values[i];
    }
    return (double)(sum / s->count);
}

static int maxOf(const Samples *s) {
    int m = s->values[0];
    for (int i = 1; i < s->count; i++) {
        if (s->values[i] > m) {
            m = s->values[i];
        }
    }
    return m;
}

int main(void) {
    static Samples s;
    scanf("%d", &s.count);
    for (int i = 0; i < s.count; i++) {
        scanf("%d", &s.values[i]);
    }
    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "mean") == 0) {
            printf("เฉลี่ย: %.2f\n", mean(&s));
        } else if (strcmp(cmd, "max") == 0) {
            printf("สูงสุด: %d\n", maxOf(&s));
        }
    }
    return 0;
}
`] },
  "c2-test/5": { sol: R`#include <stdio.h>
#include <limits.h>

int safeAdd(int a, int b, int *out) {
    if ((b > 0 && a > INT_MAX - b) || (b < 0 && a < INT_MIN - b)) {
        return 0;
    }
    *out = a + b;
    return 1;
}

int main(void) {
    int a = 0, b = 0;
    while (scanf("%d %d", &a, &b) == 2) {
        int r = 0;
        if (safeAdd(a, b, &r)) {
            printf("ผล: %d\n", r);
        } else {
            puts("ล้น");
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <limits.h>

int safeAdd(int a, int b, int *out) {
    if (b > 0 && a > INT_MAX - b) {
        return 0;
    }
    *out = a + b;
    return 1;
}

int main(void) {
    int a = 0, b = 0;
    while (scanf("%d %d", &a, &b) == 2) {
        int r = 0;
        if (safeAdd(a, b, &r)) {
            printf("ผล: %d\n", r);
        } else {
            puts("ล้น");
        }
    }
    return 0;
}
`] },
  // ── Stage 30: Professional C ──
  "c2-api/0": { sol: R`// === counter.h ===
#ifndef COUNTER_H
#define COUNTER_H

typedef struct Counter Counter;

Counter *counter_create(int start);
void counter_destroy(Counter *c);
int counter_next(Counter *c);
int counter_peek(const Counter *c);

#endif

// === counter.c ===
#include "counter.h"
#include <stdlib.h>

struct Counter {
    int value;
};

Counter *counter_create(int start) {
    Counter *c = malloc(sizeof *c);
    if (c != NULL) {
        c->value = start;
    }
    return c;
}

void counter_destroy(Counter *c) {
    free(c);
}

int counter_next(Counter *c) {
    return c->value++;
}

int counter_peek(const Counter *c) {
    return c->value;
}

// === main.c ===
#include <stdio.h>
#include "counter.h"

int main(void) {
    int start = 0;
    scanf("%d", &start);
    Counter *c = counter_create(start);
    if (c == NULL) {
        return 1;
    }
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'n') {
            printf("ได้ %d\n", counter_next(c));
        } else if (cmd == 'p') {
            printf("ดู %d\n", counter_peek(c));
        }
    }
    counter_destroy(c);
    return 0;
}
`, wrong: [R`// === counter.h ===
#ifndef COUNTER_H
#define COUNTER_H

typedef struct Counter Counter;

Counter *counter_create(int start);
void counter_destroy(Counter *c);
int counter_next(Counter *c);
int counter_peek(const Counter *c);

#endif

// === counter.c ===
#include "counter.h"
#include <stdlib.h>

struct Counter {
    int value;
};

Counter *counter_create(int start) {
    Counter *c = malloc(sizeof *c);
    if (c != NULL) {
        c->value = start;
    }
    return c;
}

void counter_destroy(Counter *c) {
    free(c);
}

int counter_next(Counter *c) {
    return ++c->value;
}

int counter_peek(const Counter *c) {
    return c->value;
}

// === main.c ===
#include <stdio.h>
#include "counter.h"

int main(void) {
    int start = 0;
    scanf("%d", &start);
    Counter *c = counter_create(start);
    if (c == NULL) {
        return 1;
    }
    char cmd = 0;
    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'n') {
            printf("ได้ %d\n", counter_next(c));
        } else if (cmd == 'p') {
            printf("ดู %d\n", counter_peek(c));
        }
    }
    counter_destroy(c);
    return 0;
}
`] },
  "c2-api/1": { sol: R`#include <stdio.h>

typedef enum {
    ACC_OK = 0,
    ACC_ERR_FUNDS,
    ACC_ERR_AMOUNT
} AccStatus;

static const char *acc_strerror(AccStatus s) {
    switch (s) {
        case ACC_OK: return "สำเร็จ";
        case ACC_ERR_FUNDS: return "ยอดเงินไม่พอ";
        case ACC_ERR_AMOUNT: return "จำนวนไม่ถูกต้อง";
    }
    return "ไม่ทราบสาเหตุ";
}

static AccStatus acc_withdraw(long *balance, long amount) {
    if (amount <= 0) {
        return ACC_ERR_AMOUNT;
    }
    if (amount > *balance) {
        return ACC_ERR_FUNDS;
    }
    *balance -= amount;
    return ACC_OK;
}

int main(void) {
    long bal = 0, amount = 0;
    scanf("%ld", &bal);
    while (scanf("%ld", &amount) == 1) {
        AccStatus st = acc_withdraw(&bal, amount);
        if (st == ACC_OK) {
            printf("ถอน %ld เหลือ %ld\n", amount, bal);
        } else {
            printf("ข้อผิดพลาด: %s\n", acc_strerror(st));
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

typedef enum {
    ACC_OK = 0,
    ACC_ERR_FUNDS,
    ACC_ERR_AMOUNT
} AccStatus;

static const char *acc_strerror(AccStatus s) {
    switch (s) {
        case ACC_OK: return "สำเร็จ";
        case ACC_ERR_FUNDS: return "ยอดเงินไม่พอ";
        case ACC_ERR_AMOUNT: return "จำนวนไม่ถูกต้อง";
    }
    return "ไม่ทราบสาเหตุ";
}

static AccStatus acc_withdraw(long *balance, long amount) {
    if (amount <= 0) {
        return ACC_ERR_AMOUNT;
    }
    if (amount >= *balance) {
        return ACC_ERR_FUNDS;
    }
    *balance -= amount;
    return ACC_OK;
}

int main(void) {
    long bal = 0, amount = 0;
    scanf("%ld", &bal);
    while (scanf("%ld", &amount) == 1) {
        AccStatus st = acc_withdraw(&bal, amount);
        if (st == ACC_OK) {
            printf("ถอน %ld เหลือ %ld\n", amount, bal);
        } else {
            printf("ข้อผิดพลาด: %s\n", acc_strerror(st));
        }
    }
    return 0;
}
`] },
  "c2-api/2": { sol: R`// === store.h ===
#ifndef STORE_H
#define STORE_H

typedef struct Store Store;

Store *store_create(void);                 /* ผู้เรียกต้อง store_destroy */
void store_destroy(Store *s);              /* รับ NULL ได้ · คืนค่าทั้งหมดที่เก็บไว้ */
int store_set(Store *s, const char *key, const char *value);   /* คืน 0 ถ้าเต็มหรือจองไม่ได้ */
const char *store_get(const Store *s, const char *key);       /* Store เป็นเจ้าของผลลัพธ์ — ห้าม free · NULL ถ้าไม่มี */

#endif

// === store.c ===
#include "store.h"
#include <stdlib.h>
#include <string.h>

#define STORE_MAX 16

struct Store {
    char *keys[STORE_MAX];
    char *values[STORE_MAX];
    int count;
};

static char *dup(const char *s) {
    size_t n = strlen(s) + 1;
    char *p = malloc(n);
    if (p != NULL) {
        memcpy(p, s, n);
    }
    return p;
}

Store *store_create(void) {
    Store *s = malloc(sizeof *s);
    if (s != NULL) {
        s->count = 0;
    }
    return s;
}

void store_destroy(Store *s) {
    if (s == NULL) {
        return;
    }
    for (int i = 0; i < s->count; i++) {
        free(s->keys[i]);
        free(s->values[i]);
    }
    free(s);
}

int store_set(Store *s, const char *key, const char *value) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->keys[i], key) == 0) {
            char *v = dup(value);
            if (v == NULL) {
                return 0;
            }
            free(s->values[i]);
            s->values[i] = v;
            return 1;
        }
    }
    if (s->count == STORE_MAX) {
        return 0;
    }
    s->keys[s->count] = dup(key);
    s->values[s->count] = dup(value);
    s->count++;
    return 1;
}

const char *store_get(const Store *s, const char *key) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->keys[i], key) == 0) {
            return s->values[i];
        }
    }
    return NULL;
}

// === main.c ===
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "store.h"

int main(void) {
    Store *s = store_create();
    if (s == NULL) {
        return 1;
    }
    char cmd[8], k[64], v[64];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "set") == 0 && scanf("%63s %63s", k, v) == 2) {
            store_set(s, k, v);
        } else if (strcmp(cmd, "get") == 0 && scanf("%63s", k) == 1) {
            const char *val = store_get(s, k);
            if (val == NULL) {
                printf("ไม่มี %s\n", k);
            } else {
                printf("%s = %s\n", k, val);
            }
        }
    }
    store_destroy(s);
    return 0;
}
`, wrong: [R`// === store.h ===
#ifndef STORE_H
#define STORE_H

typedef struct Store Store;

Store *store_create(void);                 /* ผู้เรียกต้อง store_destroy */
void store_destroy(Store *s);              /* รับ NULL ได้ · คืนค่าทั้งหมดที่เก็บไว้ */
int store_set(Store *s, const char *key, const char *value);   /* คืน 0 ถ้าเต็มหรือจองไม่ได้ */
const char *store_get(const Store *s, const char *key);       /* Store เป็นเจ้าของผลลัพธ์ — ห้าม free · NULL ถ้าไม่มี */

#endif

// === store.c ===
#include "store.h"
#include <stdlib.h>
#include <string.h>

#define STORE_MAX 16

struct Store {
    char *keys[STORE_MAX];
    char *values[STORE_MAX];
    int count;
};

static char *dup(const char *s) {
    size_t n = strlen(s) + 1;
    char *p = malloc(n);
    if (p != NULL) {
        memcpy(p, s, n);
    }
    return p;
}

Store *store_create(void) {
    Store *s = malloc(sizeof *s);
    if (s != NULL) {
        s->count = 0;
    }
    return s;
}

void store_destroy(Store *s) {
    if (s == NULL) {
        return;
    }
    for (int i = 0; i < s->count; i++) {
        free(s->keys[i]);
        free(s->values[i]);
    }
    free(s);
}

int store_set(Store *s, const char *key, const char *value) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->keys[i], key) == 0) {
            char *v = dup(value);
            if (v == NULL) {
                return 0;
            }
            free(s->values[i]);
            s->values[i] = v;
            return 1;
        }
    }
    if (s->count == STORE_MAX) {
        return 0;
    }
    s->keys[s->count] = dup(key);
    s->values[s->count] = dup(value);
    s->count++;
    return 1;
}

const char *store_get(const Store *s, const char *key) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->keys[i], key) == 0) {
            return s->values[i];
        }
    }
    return NULL;
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "store.h"

int main(void) {
    Store *s = store_create();
    if (s == NULL) {
        return 1;
    }
    char cmd[8], k[64], v[64];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "set") == 0 && scanf("%63s %63s", k, v) == 2) {
            store_set(s, k, v);
        } else if (strcmp(cmd, "get") == 0 && scanf("%63s", k) == 1) {
            const char *val = store_get(s, k);
            if (val == NULL) {
                printf("ไม่มี %s\n", k);
            } else {
                printf("%s = %s\n", k, val);
            }
        }
    }
    return 0;
}
`] },
  "c2-api/3": { sol: R`#include <stdio.h>

#define LIB_VERSION_MAJOR 2
#define LIB_VERSION_MINOR 3
#define LIB_VERSION_PATCH 1

int lib_compatible(int major, int minor, int patch) {
    if (major != LIB_VERSION_MAJOR) {
        return 0;
    }
    return minor < LIB_VERSION_MINOR || (minor == LIB_VERSION_MINOR && patch <= LIB_VERSION_PATCH);
}

int main(void) {
    int a = 0, b = 0, c = 0;
    while (scanf("%d %d %d", &a, &b, &c) == 3) {
        printf("%s (ต้องการ %d.%d.%d · มี %d.%d.%d)\n", lib_compatible(a, b, c) ? "ใช้ได้" : "ใช้ไม่ได้",
               a, b, c, LIB_VERSION_MAJOR, LIB_VERSION_MINOR, LIB_VERSION_PATCH);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define LIB_VERSION_MAJOR 2
#define LIB_VERSION_MINOR 3
#define LIB_VERSION_PATCH 1

int lib_compatible(int major, int minor, int patch) {
    if (major != LIB_VERSION_MAJOR) {
        return 0;
    }
    return minor <= LIB_VERSION_MINOR && patch <= LIB_VERSION_PATCH;
}

int main(void) {
    int a = 0, b = 0, c = 0;
    while (scanf("%d %d %d", &a, &b, &c) == 3) {
        printf("%s (ต้องการ %d.%d.%d · มี %d.%d.%d)\n", lib_compatible(a, b, c) ? "ใช้ได้" : "ใช้ไม่ได้",
               a, b, c, LIB_VERSION_MAJOR, LIB_VERSION_MINOR, LIB_VERSION_PATCH);
    }
    return 0;
}
`] },
  "c2-api/4": { sol: R`// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

typedef struct Inventory Inventory;

Inventory *inventory_create(void);
void inventory_destroy(Inventory *inv);
int inventory_add(Inventory *inv, int v);
int inventory_count(const Inventory *inv);
long long inventory_total(const Inventory *inv);

#endif

// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>

struct Inventory {
    int items[100];
    int count;
    long long total;
};

Inventory *inventory_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->count = 0;
        inv->total = 0;
    }
    return inv;
}

void inventory_destroy(Inventory *inv) {
    free(inv);
}

int inventory_add(Inventory *inv, int v) {
    if (v < 0 || inv->count >= 100) {
        return 0;
    }
    inv->items[inv->count++] = v;
    inv->total += v;
    return 1;
}

int inventory_count(const Inventory *inv) {
    return inv->count;
}

long long inventory_total(const Inventory *inv) {
    return inv->total;
}

// === main.c ===
#include <stdio.h>
#include "inventory.h"

int main(void) {
    Inventory *inv = inventory_create();
    if (inv == NULL) {
        return 1;
    }
    int v = 0;
    while (scanf("%d", &v) == 1) {
        inventory_add(inv, v);
    }
    printf("จำนวน: %d · รวม: %lld\n", inventory_count(inv), inventory_total(inv));
    inventory_destroy(inv);
    return 0;
}
`, wrong: [R`// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

typedef struct Inventory Inventory;

Inventory *inventory_create(void);
void inventory_destroy(Inventory *inv);
int inventory_add(Inventory *inv, int v);
int inventory_count(const Inventory *inv);
long long inventory_total(const Inventory *inv);

#endif

// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>

struct Inventory {
    int items[100];
    int count;
    long long total;
};

Inventory *inventory_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->count = 0;
        inv->total = 0;
    }
    return inv;
}

void inventory_destroy(Inventory *inv) {
    free(inv);
}

int inventory_add(Inventory *inv, int v) {
    if (v <= 0 || inv->count >= 100) {
        return 0;
    }
    inv->items[inv->count++] = v;
    inv->total += v;
    return 1;
}

int inventory_count(const Inventory *inv) {
    return inv->count;
}

long long inventory_total(const Inventory *inv) {
    return inv->total;
}

// === main.c ===
#include <stdio.h>
#include "inventory.h"

int main(void) {
    Inventory *inv = inventory_create();
    if (inv == NULL) {
        return 1;
    }
    int v = 0;
    while (scanf("%d", &v) == 1) {
        inventory_add(inv, v);
    }
    printf("จำนวน: %d · รวม: %lld\n", inventory_count(inv), inventory_total(inv));
    inventory_destroy(inv);
    return 0;
}
`] },
  "c2-api/5": { sol: R`// === ring.h ===
#ifndef RING_H
#define RING_H

#include <stddef.h>

#define RING_VERSION_MAJOR 1
#define RING_VERSION_MINOR 2
#define RING_VERSION_PATCH 0

typedef struct Ring Ring;

typedef enum {
    RING_OK = 0,
    RING_ERR_FULL,
    RING_ERR_EMPTY,
    RING_ERR_NULL,
    RING_ERR_ARG
} RingStatus;

/* สร้างคิวความจุ cap (1–1000) · คืน NULL และตั้ง *st เมื่อผิดพลาด · ผู้เรียกต้อง ring_destroy */
Ring *ring_create(size_t cap, RingStatus *st);
/* รับ NULL ได้ */
void ring_destroy(Ring *r);
RingStatus ring_push(Ring *r, int v);
RingStatus ring_pop(Ring *r, int *out);
RingStatus ring_peek(const Ring *r, int *out);
size_t ring_size(const Ring *r);
size_t ring_capacity(const Ring *r);
const char *ring_strerror(RingStatus s);

#endif

// === ring.c ===
#include "ring.h"
#include <stdlib.h>

struct Ring {
    int *data;
    size_t cap;
    size_t head;
    size_t count;
};

Ring *ring_create(size_t cap, RingStatus *st) {
    if (cap < 1 || cap > 1000) {
        if (st != NULL) {
            *st = RING_ERR_ARG;
        }
        return NULL;
    }
    Ring *r = malloc(sizeof *r);
    int *data = malloc(cap * sizeof *data);
    if (r == NULL || data == NULL) {
        free(r);
        free(data);
        if (st != NULL) {
            *st = RING_ERR_ARG;
        }
        return NULL;
    }
    r->data = data;
    r->cap = cap;
    r->head = 0;
    r->count = 0;
    if (st != NULL) {
        *st = RING_OK;
    }
    return r;
}

void ring_destroy(Ring *r) {
    if (r == NULL) {
        return;
    }
    free(r->data);
    free(r);
}

RingStatus ring_push(Ring *r, int v) {
    if (r == NULL) {
        return RING_ERR_NULL;
    }
    if (r->count == r->cap) {
        return RING_ERR_FULL;
    }
    r->data[(r->head + r->count) % r->cap] = v;
    r->count++;
    return RING_OK;
}

RingStatus ring_pop(Ring *r, int *out) {
    if (r == NULL) {
        return RING_ERR_NULL;
    }
    if (r->count == 0) {
        return RING_ERR_EMPTY;
    }
    *out = r->data[r->head];
    r->head = (r->head + 1) % r->cap;
    r->count--;
    return RING_OK;
}

RingStatus ring_peek(const Ring *r, int *out) {
    if (r == NULL) {
        return RING_ERR_NULL;
    }
    if (r->count == 0) {
        return RING_ERR_EMPTY;
    }
    *out = r->data[r->head];
    return RING_OK;
}

size_t ring_size(const Ring *r) {
    return r == NULL ? 0 : r->count;
}

size_t ring_capacity(const Ring *r) {
    return r == NULL ? 0 : r->cap;
}

const char *ring_strerror(RingStatus s) {
    switch (s) {
        case RING_OK: return "สำเร็จ";
        case RING_ERR_FULL: return "เต็ม";
        case RING_ERR_EMPTY: return "ว่าง";
        case RING_ERR_NULL: return "ยังไม่ได้สร้าง";
        case RING_ERR_ARG: return "ความจุไม่ถูกต้อง";
    }
    return "ไม่ทราบสาเหตุ";
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "ring.h"

static void report(RingStatus st) {
    printf("ข้อผิดพลาด: %s\n", ring_strerror(st));
}

int main(void) {
    Ring *r = NULL;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "new") == 0) {
            long n = 0;
            if (scanf("%ld", &n) != 1) {
                break;
            }
            RingStatus st = RING_OK;
            Ring *fresh = n < 1 ? NULL : ring_create((size_t)n, &st);
            if (fresh == NULL) {
                report(RING_ERR_ARG);
                continue;
            }
            ring_destroy(r);
            r = fresh;
            printf("สร้างความจุ %ld\n", n);
        } else if (strcmp(cmd, "push") == 0) {
            int v = 0;
            if (scanf("%d", &v) != 1) {
                break;
            }
            RingStatus st = ring_push(r, v);
            if (st == RING_OK) {
                printf("ใส่ %d\n", v);
            } else {
                report(st);
            }
        } else if (strcmp(cmd, "pop") == 0 || strcmp(cmd, "peek") == 0) {
            int v = 0;
            int isPop = strcmp(cmd, "pop") == 0;
            RingStatus st = isPop ? ring_pop(r, &v) : ring_peek(r, &v);
            if (st != RING_OK) {
                report(st);
            } else {
                printf(isPop ? "ออก %d\n" : "หน้า: %d\n", v);
            }
        } else if (strcmp(cmd, "size") == 0) {
            if (r == NULL) {
                report(RING_ERR_NULL);
            } else {
                printf("ขนาด: %zu/%zu\n", ring_size(r), ring_capacity(r));
            }
        } else if (strcmp(cmd, "version") == 0) {
            printf("ring %d.%d.%d\n", RING_VERSION_MAJOR, RING_VERSION_MINOR, RING_VERSION_PATCH);
        }
    }
    ring_destroy(r);
    return 0;
}
`, wrong: [R`// === ring.h ===
#ifndef RING_H
#define RING_H

#include <stddef.h>

#define RING_VERSION_MAJOR 1
#define RING_VERSION_MINOR 2
#define RING_VERSION_PATCH 0

typedef struct Ring Ring;

typedef enum {
    RING_OK = 0,
    RING_ERR_FULL,
    RING_ERR_EMPTY,
    RING_ERR_NULL,
    RING_ERR_ARG
} RingStatus;

/* สร้างคิวความจุ cap (1–1000) · คืน NULL และตั้ง *st เมื่อผิดพลาด · ผู้เรียกต้อง ring_destroy */
Ring *ring_create(size_t cap, RingStatus *st);
/* รับ NULL ได้ */
void ring_destroy(Ring *r);
RingStatus ring_push(Ring *r, int v);
RingStatus ring_pop(Ring *r, int *out);
RingStatus ring_peek(const Ring *r, int *out);
size_t ring_size(const Ring *r);
size_t ring_capacity(const Ring *r);
const char *ring_strerror(RingStatus s);

#endif

// === ring.c ===
#include "ring.h"
#include <stdlib.h>

struct Ring {
    int *data;
    size_t cap;
    size_t head;
    size_t count;
};

Ring *ring_create(size_t cap, RingStatus *st) {
    if (cap < 1 || cap > 1000) {
        if (st != NULL) {
            *st = RING_ERR_ARG;
        }
        return NULL;
    }
    Ring *r = malloc(sizeof *r);
    int *data = malloc(cap * sizeof *data);
    if (r == NULL || data == NULL) {
        free(r);
        free(data);
        if (st != NULL) {
            *st = RING_ERR_ARG;
        }
        return NULL;
    }
    r->data = data;
    r->cap = cap;
    r->head = 0;
    r->count = 0;
    if (st != NULL) {
        *st = RING_OK;
    }
    return r;
}

void ring_destroy(Ring *r) {
    if (r == NULL) {
        return;
    }
    free(r->data);
    free(r);
}

RingStatus ring_push(Ring *r, int v) {
    if (r == NULL) {
        return RING_ERR_NULL;
    }
    if (r->count == r->cap) {
        return RING_ERR_FULL;
    }
    r->data[(r->head + r->count) % r->cap] = v;
    r->count++;
    return RING_OK;
}

RingStatus ring_pop(Ring *r, int *out) {
    if (r == NULL) {
        return RING_ERR_NULL;
    }
    if (r->count == 0) {
        return RING_ERR_EMPTY;
    }
    *out = r->data[r->head];
    r->head = (r->head + 1) % r->cap;
    r->count--;
    return RING_OK;
}

RingStatus ring_peek(const Ring *r, int *out) {
    if (r == NULL) {
        return RING_ERR_NULL;
    }
    if (r->count == 0) {
        return RING_ERR_EMPTY;
    }
    *out = r->data[r->head];
    return RING_OK;
}

size_t ring_size(const Ring *r) {
    return r == NULL ? 0 : r->count;
}

size_t ring_capacity(const Ring *r) {
    return r == NULL ? 0 : r->cap;
}

const char *ring_strerror(RingStatus s) {
    switch (s) {
        case RING_OK: return "สำเร็จ";
        case RING_ERR_FULL: return "เต็ม";
        case RING_ERR_EMPTY: return "ว่าง";
        case RING_ERR_NULL: return "ยังไม่ได้สร้าง";
        case RING_ERR_ARG: return "ความจุไม่ถูกต้อง";
    }
    return "ไม่ทราบสาเหตุ";
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "ring.h"

static void report(RingStatus st) {
    printf("ข้อผิดพลาด: %s\n", ring_strerror(st));
}

int main(void) {
    Ring *r = NULL;
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "new") == 0) {
            long n = 0;
            if (scanf("%ld", &n) != 1) {
                break;
            }
            RingStatus st = RING_OK;
            Ring *fresh = n < 1 ? NULL : ring_create((size_t)n, &st);
            if (fresh == NULL) {
                report(RING_ERR_ARG);
                continue;
            }
            r = fresh;
            printf("สร้างความจุ %ld\n", n);
        } else if (strcmp(cmd, "push") == 0) {
            int v = 0;
            if (scanf("%d", &v) != 1) {
                break;
            }
            RingStatus st = ring_push(r, v);
            if (st == RING_OK) {
                printf("ใส่ %d\n", v);
            } else {
                report(st);
            }
        } else if (strcmp(cmd, "pop") == 0 || strcmp(cmd, "peek") == 0) {
            int v = 0;
            int isPop = strcmp(cmd, "pop") == 0;
            RingStatus st = isPop ? ring_pop(r, &v) : ring_peek(r, &v);
            if (st != RING_OK) {
                report(st);
            } else {
                printf(isPop ? "ออก %d\n" : "หน้า: %d\n", v);
            }
        } else if (strcmp(cmd, "size") == 0) {
            if (r == NULL) {
                report(RING_ERR_NULL);
            } else {
                printf("ขนาด: %zu/%zu\n", ring_size(r), ring_capacity(r));
            }
        } else if (strcmp(cmd, "version") == 0) {
            printf("ring %d.%d.%d\n", RING_VERSION_MAJOR, RING_VERSION_MINOR, RING_VERSION_PATCH);
        }
    }
    ring_destroy(r);
    return 0;
}
`] },

  // ── Stage 31: Capstone StockKeeper ──
  "c2-capstone/2": { sol: R`// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

#include <stddef.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

typedef struct Inventory Inventory;

Inventory *inv_create(void);                                  /* NULL ถ้าจองไม่ได้ · ผู้เรียกต้อง inv_destroy */
void inv_destroy(Inventory *inv);                             /* รับ NULL ได้ */
int inv_add(Inventory *inv, const Item *it);                  /* 1 = เพิ่มแล้ว · 0 = รหัสซ้ำหรือจองไม่ได้ */
Item *inv_find(Inventory *inv, const char *sku);              /* NULL ถ้าไม่พบ · inventory เป็นเจ้าของ */
size_t inv_count(const Inventory *inv);
const Item *inv_at(const Inventory *inv, size_t i);           /* ลำดับที่เพิ่ม · NULL ถ้าเกิน */

#endif

// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>
#include <string.h>

struct Inventory {
    Item *items;
    size_t count;
    size_t cap;
};

Inventory *inv_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->items = NULL;
        inv->count = 0;
        inv->cap = 0;
    }
    return inv;
}

void inv_destroy(Inventory *inv) {
    if (inv == NULL) {
        return;
    }
    free(inv->items);
    free(inv);
}

Item *inv_find(Inventory *inv, const char *sku) {
    for (size_t i = 0; i < inv->count; i++) {
        if (strcmp(inv->items[i].sku, sku) == 0) {
            return &inv->items[i];
        }
    }
    return NULL;
}

int inv_add(Inventory *inv, const Item *it) {
    if (inv_find(inv, it->sku) != NULL) {
        return 0;
    }
    if (inv->count == inv->cap) {
        size_t nc = inv->cap ? inv->cap * 2 : 4;
        Item *t = realloc(inv->items, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        inv->items = t;
        inv->cap = nc;
    }
    inv->items[inv->count++] = *it;
    return 1;
}

size_t inv_count(const Inventory *inv) {
    return inv->count;
}

const Item *inv_at(const Inventory *inv, size_t i) {
    return i < inv->count ? &inv->items[i] : NULL;
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "inventory.h"

int main(void) {
    Inventory *inv = inv_create();
    if (inv == NULL) {
        return 1;
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            Item it;
            memset(&it, 0, sizeof it);
            if (scanf("%15s %47s %d %ld", it.sku, it.name, &it.qty, &it.price) != 4) {
                break;
            }
            puts(inv_add(inv, &it) ? "เพิ่มแล้ว" : "รหัสซ้ำ");
        } else if (strcmp(cmd, "find") == 0) {
            char sku[16];
            if (scanf("%15s", sku) != 1) {
                break;
            }
            const Item *it = inv_find(inv, sku);
            if (it == NULL) {
                printf("ไม่พบ %s\n", sku);
            } else {
                printf("%s: %s · คงเหลือ %d · ราคา %ld.%02ld บาท\n", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวนสินค้า: %zu\n", inv_count(inv));
        }
    }
    inv_destroy(inv);
    return 0;
}
`, wrong: [R`// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

#include <stddef.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

typedef struct Inventory Inventory;

Inventory *inv_create(void);                                  /* NULL ถ้าจองไม่ได้ · ผู้เรียกต้อง inv_destroy */
void inv_destroy(Inventory *inv);                             /* รับ NULL ได้ */
int inv_add(Inventory *inv, const Item *it);                  /* 1 = เพิ่มแล้ว · 0 = รหัสซ้ำหรือจองไม่ได้ */
Item *inv_find(Inventory *inv, const char *sku);              /* NULL ถ้าไม่พบ · inventory เป็นเจ้าของ */
size_t inv_count(const Inventory *inv);
const Item *inv_at(const Inventory *inv, size_t i);           /* ลำดับที่เพิ่ม · NULL ถ้าเกิน */

#endif

// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>
#include <string.h>

struct Inventory {
    Item *items;
    size_t count;
    size_t cap;
};

Inventory *inv_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->items = NULL;
        inv->count = 0;
        inv->cap = 0;
    }
    return inv;
}

void inv_destroy(Inventory *inv) {
    if (inv == NULL) {
        return;
    }
    free(inv->items);
    free(inv);
}

Item *inv_find(Inventory *inv, const char *sku) {
    for (size_t i = 0; i < inv->count; i++) {
        if (strcmp(inv->items[i].sku, sku) == 0) {
            return &inv->items[i];
        }
    }
    return NULL;
}

int inv_add(Inventory *inv, const Item *it) {
    if (inv->count == inv->cap) {
        size_t nc = inv->cap ? inv->cap * 2 : 4;
        Item *t = realloc(inv->items, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        inv->items = t;
        inv->cap = nc;
    }
    inv->items[inv->count++] = *it;
    return 1;
}

size_t inv_count(const Inventory *inv) {
    return inv->count;
}

const Item *inv_at(const Inventory *inv, size_t i) {
    return i < inv->count ? &inv->items[i] : NULL;
}

// === main.c ===
#include <stdio.h>
#include <string.h>
#include "inventory.h"

int main(void) {
    Inventory *inv = inv_create();
    if (inv == NULL) {
        return 1;
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            Item it;
            memset(&it, 0, sizeof it);
            if (scanf("%15s %47s %d %ld", it.sku, it.name, &it.qty, &it.price) != 4) {
                break;
            }
            puts(inv_add(inv, &it) ? "เพิ่มแล้ว" : "รหัสซ้ำ");
        } else if (strcmp(cmd, "find") == 0) {
            char sku[16];
            if (scanf("%15s", sku) != 1) {
                break;
            }
            const Item *it = inv_find(inv, sku);
            if (it == NULL) {
                printf("ไม่พบ %s\n", sku);
            } else {
                printf("%s: %s · คงเหลือ %d · ราคา %ld.%02ld บาท\n", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวนสินค้า: %zu\n", inv_count(inv));
        }
    }
    inv_destroy(inv);
    return 0;
}
`] },
  "c2-capstone/3": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* คืน NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนข้อความบอกเหตุผล */
static const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    char *p = buf;
    field[n++] = p;
    for (; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    if (!validSku(field[0])) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(field[1]);
    if (nl < 1 || nl > 47) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int qty = 0;
    if (!parseQty(field[2], &qty)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long price = 0;
    if (!parsePrice(field[3], &price)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", field[0]);
    snprintf(out->name, sizeof out->name, "%s", field[1]);
    out->qty = qty;
    out->price = price;
    return NULL;
}

static void item_format(const Item *it, char *buf, size_t size) {
    snprintf(buf, size, "%s|%s|%d|%ld.%02ld", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        Item it;
        const char *err = item_parse(line, &it);
        if (err != NULL) {
            printf("ผิด: %s\n", err);
        } else {
            char out[128];
            item_format(&it, out, sizeof out);
            printf("ถูกต้อง: %s\n", out);
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        while (isdigit((unsigned char)s[i])) {
            sat = sat * 10 + (s[i] - '0');
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* คืน NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนข้อความบอกเหตุผล */
static const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    char *p = buf;
    field[n++] = p;
    for (; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    if (!validSku(field[0])) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(field[1]);
    if (nl < 1 || nl > 47) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int qty = 0;
    if (!parseQty(field[2], &qty)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long price = 0;
    if (!parsePrice(field[3], &price)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", field[0]);
    snprintf(out->name, sizeof out->name, "%s", field[1]);
    out->qty = qty;
    out->price = price;
    return NULL;
}

static void item_format(const Item *it, char *buf, size_t size) {
    snprintf(buf, size, "%s|%s|%d|%ld.%02ld", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        Item it;
        const char *err = item_parse(line, &it);
        if (err != NULL) {
            printf("ผิด: %s\n", err);
        } else {
            char out[128];
            item_format(&it, out, sizeof out);
            printf("ถูกต้อง: %s\n", out);
        }
    }
    return 0;
}
`] },
  "c2-capstone/4": { sol: R`#include <stdio.h>
#include <string.h>

/* แยกคำสั่งในที่เดิม · "…" รวมเป็นหนึ่งอาร์กิวเมนต์ (ใส่ได้เฉพาะต้นอาร์กิวเมนต์) · คืนจำนวน หรือ -1 พร้อม *err */
static int tokenize(char *line, char *argv[], int max, const char **err) {
    int n = 0;
    char *p = line;
    for (;;) {
        while (*p == ' ' || *p == '\t') {
            p++;
        }
        if (*p == '\0') {
            return n;
        }
        if (n == max) {
            *err = "อาร์กิวเมนต์มากเกินไป";
            return -1;
        }
        if (*p == '"') {
            p++;
            argv[n++] = p;
            while (*p != '\0' && *p != '"') {
                p++;
            }
            if (*p != '"') {
                *err = "เครื่องหมายคำพูดไม่ครบ";
                return -1;
            }
            *p++ = '\0';
        } else {
            argv[n++] = p;
            while (*p != '\0' && *p != ' ' && *p != '\t') {
                p++;
            }
            if (*p != '\0') {
                *p++ = '\0';
            }
        }
    }
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *argv[8];
        const char *err = NULL;
        int n = tokenize(line, argv, 8, &err);
        if (n < 0) {
            printf("ผิด: %s\n", err);
        } else if (n == 0) {
            puts("(ว่าง)");
        } else {
            for (int i = 0; i < n; i++) {
                printf(i ? " [%s]" : "[%s]", argv[i]);
            }
            printf("\n");
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

/* แยกคำสั่งในที่เดิม · "…" รวมเป็นหนึ่งอาร์กิวเมนต์ (ใส่ได้เฉพาะต้นอาร์กิวเมนต์) · คืนจำนวน หรือ -1 พร้อม *err */
static int tokenize(char *line, char *argv[], int max, const char **err) {
    int n = 0;
    char *p = line;
    for (;;) {
        while (*p == ' ' || *p == '\t') {
            p++;
        }
        if (*p == '\0') {
            return n;
        }
        if (n == max) {
            *err = "อาร์กิวเมนต์มากเกินไป";
            return -1;
        }
        if (*p == '"') {
            p++;
            argv[n++] = p;
            while (*p != '\0' && *p != '"') {
                p++;
            }
            if (*p == '"') {
                *p++ = '\0';
            }
        } else {
            argv[n++] = p;
            while (*p != '\0' && *p != ' ' && *p != '\t') {
                p++;
            }
            if (*p != '\0') {
                *p++ = '\0';
            }
        }
    }
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *argv[8];
        const char *err = NULL;
        int n = tokenize(line, argv, 8, &err);
        if (n < 0) {
            printf("ผิด: %s\n", err);
        } else if (n == 0) {
            puts("(ว่าง)");
        } else {
            for (int i = 0; i < n; i++) {
                printf(i ? " [%s]" : "[%s]", argv[i]);
            }
            printf("\n");
        }
    }
    return 0;
}
`] },
  "c2-capstone/5": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

typedef enum {
    STOCK_OK = 0,
    STOCK_NOT_FOUND,
    STOCK_BAD_AMOUNT,
    STOCK_INSUFFICIENT,
    STOCK_OVERFLOW
} StockStatus;

typedef struct {
    Item items[100];
    int count;
} Store;

static Item *findItem(Store *s, const char *sku) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->items[i].sku, sku) == 0) {
            return &s->items[i];
        }
    }
    return NULL;
}

StockStatus stock_sell(Store *s, const char *sku, int n) {
    Item *it = findItem(s, sku);
    if (it == NULL) {
        return STOCK_NOT_FOUND;
    }
    if (n <= 0) {
        return STOCK_BAD_AMOUNT;
    }
    if (n > it->qty) {
        return STOCK_INSUFFICIENT;
    }
    it->qty -= n;
    return STOCK_OK;
}

StockStatus stock_restock(Store *s, const char *sku, int n) {
    Item *it = findItem(s, sku);
    if (it == NULL) {
        return STOCK_NOT_FOUND;
    }
    if (n <= 0) {
        return STOCK_BAD_AMOUNT;
    }
    if (it->qty > INT_MAX - n) {
        return STOCK_OVERFLOW;
    }
    it->qty += n;
    return STOCK_OK;
}

long long stock_value(const Store *s) {
    long long total = 0;
    for (int i = 0; i < s->count; i++) {
        total += (long long)s->items[i].qty * s->items[i].price;
    }
    return total;
}

int main(void) {
    static Store s;
    scanf("%d", &s.count);
    for (int i = 0; i < s.count; i++) {
        Item *it = &s.items[i];
        scanf("%15s %47s %d %ld", it->sku, it->name, &it->qty, &it->price);
    }
    char cmd[16], sku[16];
    int n = 0;
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "value") == 0) {
            long long v = stock_value(&s);
            printf("มูลค่ารวม: %lld.%02lld บาท\n", v / 100, v % 100);
            continue;
        }
        if (scanf("%15s %d", sku, &n) != 2) {
            break;
        }
        int selling = strcmp(cmd, "sell") == 0;
        StockStatus st = selling ? stock_sell(&s, sku, n) : stock_restock(&s, sku, n);
        const Item *it = findItem(&s, sku);
        switch (st) {
            case STOCK_OK:
                printf(selling ? "ขาย %s %d เหลือ %d\n" : "เติม %s %d รวม %d\n", sku, n, it->qty);
                break;
            case STOCK_NOT_FOUND: printf("ไม่พบ %s\n", sku); break;
            case STOCK_BAD_AMOUNT: puts("จำนวนไม่ถูกต้อง"); break;
            case STOCK_INSUFFICIENT: printf("สินค้าไม่พอ (มี %d)\n", it->qty); break;
            case STOCK_OVERFLOW: puts("เกินขีดจำกัด"); break;
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

typedef enum {
    STOCK_OK = 0,
    STOCK_NOT_FOUND,
    STOCK_BAD_AMOUNT,
    STOCK_INSUFFICIENT,
    STOCK_OVERFLOW
} StockStatus;

typedef struct {
    Item items[100];
    int count;
} Store;

static Item *findItem(Store *s, const char *sku) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->items[i].sku, sku) == 0) {
            return &s->items[i];
        }
    }
    return NULL;
}

StockStatus stock_sell(Store *s, const char *sku, int n) {
    Item *it = findItem(s, sku);
    if (it == NULL) {
        return STOCK_NOT_FOUND;
    }
    if (n <= 0) {
        return STOCK_BAD_AMOUNT;
    }
    if (n > it->qty) {
        return STOCK_INSUFFICIENT;
    }
    it->qty -= n;
    return STOCK_OK;
}

StockStatus stock_restock(Store *s, const char *sku, int n) {
    Item *it = findItem(s, sku);
    if (it == NULL) {
        return STOCK_NOT_FOUND;
    }
    if (n <= 0) {
        return STOCK_BAD_AMOUNT;
    }
    if (it->qty > INT_MAX - n) {
        return STOCK_OVERFLOW;
    }
    it->qty += n;
    return STOCK_OK;
}

long long stock_value(const Store *s) {
    long long total = 0;
    for (int i = 0; i < s->count; i++) {
        total += s->items[i].qty * s->items[i].price;
    }
    return total;
}

int main(void) {
    static Store s;
    scanf("%d", &s.count);
    for (int i = 0; i < s.count; i++) {
        Item *it = &s.items[i];
        scanf("%15s %47s %d %ld", it->sku, it->name, &it->qty, &it->price);
    }
    char cmd[16], sku[16];
    int n = 0;
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "value") == 0) {
            long long v = stock_value(&s);
            printf("มูลค่ารวม: %lld.%02lld บาท\n", v / 100, v % 100);
            continue;
        }
        if (scanf("%15s %d", sku, &n) != 2) {
            break;
        }
        int selling = strcmp(cmd, "sell") == 0;
        StockStatus st = selling ? stock_sell(&s, sku, n) : stock_restock(&s, sku, n);
        const Item *it = findItem(&s, sku);
        switch (st) {
            case STOCK_OK:
                printf(selling ? "ขาย %s %d เหลือ %d\n" : "เติม %s %d รวม %d\n", sku, n, it->qty);
                break;
            case STOCK_NOT_FOUND: printf("ไม่พบ %s\n", sku); break;
            case STOCK_BAD_AMOUNT: puts("จำนวนไม่ถูกต้อง"); break;
            case STOCK_INSUFFICIENT: printf("สินค้าไม่พอ (มี %d)\n", it->qty); break;
            case STOCK_OVERFLOW: puts("เกินขีดจำกัด"); break;
        }
    }
    return 0;
}
`] },
  "c2-capstone/6": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *text;
    struct Entry *next;
} Entry;

static char *dupString(const char *s) {
    size_t n = strlen(s) + 1;
    char *p = malloc(n);
    if (p != NULL) {
        memcpy(p, s, n);
    }
    return p;
}

static int history_add(Entry **head, const char *text) {
    Entry *e = malloc(sizeof *e);
    char *copy = dupString(text);
    if (e == NULL || copy == NULL) {
        free(e);
        free(copy);
        return 0;
    }
    e->text = copy;
    e->next = *head;
    *head = e;
    return 1;
}

/* ถอดรายการล่าสุดออก · คัดลอกข้อความลง buf · คืน 0 ถ้าว่าง */
static int history_undo(Entry **head, char *buf, size_t size) {
    Entry *e = *head;
    if (e == NULL) {
        return 0;
    }
    snprintf(buf, size, "%s", e->text);
    *head = e->next;
    free(e->text);
    free(e);
    return 1;
}

/* คืนทุกรายการ · คืนจำนวนที่ลบ */
static int history_clear(Entry **head) {
    int n = 0;
    Entry *e = *head;
    while (e != NULL) {
        Entry *next = e->next;
        free(e->text);
        free(e);
        e = next;
        n++;
    }
    *head = NULL;
    return n;
}

int main(void) {
    Entry *head = NULL;
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (strncmp(line, "log ", 4) == 0) {
            if (!history_add(&head, line + 4)) {
                break;
            }
        } else if (strcmp(line, "undo") == 0) {
            char buf[256];
            if (history_undo(&head, buf, sizeof buf)) {
                printf("ยกเลิก: %s\n", buf);
            } else {
                puts("ไม่มีประวัติ");
            }
        } else if (strcmp(line, "show") == 0) {
            if (head == NULL) {
                puts("(ว่าง)");
            }
            int i = 1;
            for (const Entry *e = head; e != NULL; e = e->next) {
                printf("%d. %s\n", i++, e->text);
            }
        } else if (strcmp(line, "clear") == 0) {
            printf("ล้างแล้ว %d รายการ\n", history_clear(&head));
        }
    }
    history_clear(&head);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *text;
    struct Entry *next;
} Entry;

static char *dupString(const char *s) {
    size_t n = strlen(s) + 1;
    char *p = malloc(n);
    if (p != NULL) {
        memcpy(p, s, n);
    }
    return p;
}

static int history_add(Entry **head, const char *text) {
    Entry *e = malloc(sizeof *e);
    char *copy = dupString(text);
    if (e == NULL || copy == NULL) {
        free(e);
        free(copy);
        return 0;
    }
    e->text = copy;
    e->next = *head;
    *head = e;
    return 1;
}

/* ถอดรายการล่าสุดออก · คัดลอกข้อความลง buf · คืน 0 ถ้าว่าง */
static int history_undo(Entry **head, char *buf, size_t size) {
    Entry *e = *head;
    if (e == NULL) {
        return 0;
    }
    snprintf(buf, size, "%s", e->text);
    *head = e->next;
    free(e);
    return 1;
}

/* คืนทุกรายการ · คืนจำนวนที่ลบ */
static int history_clear(Entry **head) {
    int n = 0;
    Entry *e = *head;
    while (e != NULL) {
        Entry *next = e->next;
        free(e->text);
        free(e);
        e = next;
        n++;
    }
    *head = NULL;
    return n;
}

int main(void) {
    Entry *head = NULL;
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (strncmp(line, "log ", 4) == 0) {
            if (!history_add(&head, line + 4)) {
                break;
            }
        } else if (strcmp(line, "undo") == 0) {
            char buf[256];
            if (history_undo(&head, buf, sizeof buf)) {
                printf("ยกเลิก: %s\n", buf);
            } else {
                puts("ไม่มีประวัติ");
            }
        } else if (strcmp(line, "show") == 0) {
            if (head == NULL) {
                puts("(ว่าง)");
            }
            int i = 1;
            for (const Entry *e = head; e != NULL; e = e->next) {
                printf("%d. %s\n", i++, e->text);
            }
        } else if (strcmp(line, "clear") == 0) {
            printf("ล้างแล้ว %d รายการ\n", history_clear(&head));
        }
    }
    history_clear(&head);
    return 0;
}
`] },
  "c2-capstone/7": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* คืน NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนข้อความบอกเหตุผล */
static const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    char *p = buf;
    field[n++] = p;
    for (; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    if (!validSku(field[0])) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(field[1]);
    if (nl < 1 || nl > 47) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int qty = 0;
    if (!parseQty(field[2], &qty)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long price = 0;
    if (!parsePrice(field[3], &price)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", field[0]);
    snprintf(out->name, sizeof out->name, "%s", field[1]);
    out->qty = qty;
    out->price = price;
    return NULL;
}


/* โหลดทั้งไฟล์แบบ "ทั้งหมดหรือไม่เลย" · คืน 1 สำเร็จ (ได้ *items และ *count ที่ผู้เรียกต้อง free)
   คืน 0 เมื่อไม่มีไฟล์ · คืน -1 เมื่อไฟล์เสีย (ตั้ง *badLine และ *why) */
static int load_items(const char *path, Item **items, int *count, int *badLine, const char **why) {
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        return 0;
    }
    Item *list = NULL;
    int n = 0, cap = 0, lineNo = 0;
    int result = -1;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        lineNo++;
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        Item it;
        const char *err = item_parse(line, &it);
        if (err != NULL) {
            *badLine = lineNo;
            *why = err;
            goto cleanup;
        }
        if (n == cap) {
            int nc = cap ? cap * 2 : 4;
            Item *t = realloc(list, (size_t)nc * sizeof *t);
            if (t == NULL) {
                *badLine = lineNo;
                *why = "หน่วยความจำไม่พอ";
            goto cleanup;
            }
            list = t;
            cap = nc;
        }
        list[n++] = it;
    }
    *items = list;
    *count = n;
    list = NULL;
    result = 1;
cleanup:
    free(list);
    fclose(f);
    return result;
}

int main(void) {
    Item *items = NULL;
    int count = 0, badLine = 0;
    const char *why = NULL;
    int r = load_items("/data/stock.db", &items, &count, &badLine, &why);
    if (r == 0) {
        puts("ยังไม่มีไฟล์ข้อมูล (เริ่มด้วยคลังว่าง)");
    } else if (r < 0) {
        printf("ไฟล์เสียที่บรรทัด %d: %s\n", badLine, why);
        puts("เริ่มด้วยคลังว่าง");
    } else {
        printf("โหลดแล้ว %d รายการ\n", count);
        for (int i = 0; i < count; i++) {
            printf("%s %s %d %ld.%02ld\n", items[i].sku, items[i].name, items[i].qty, items[i].price / 100, items[i].price % 100);
        }
    }
    free(items);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* คืน NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนข้อความบอกเหตุผล */
static const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    char *p = buf;
    field[n++] = p;
    for (; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    if (!validSku(field[0])) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(field[1]);
    if (nl < 1 || nl > 47) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int qty = 0;
    if (!parseQty(field[2], &qty)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long price = 0;
    if (!parsePrice(field[3], &price)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", field[0]);
    snprintf(out->name, sizeof out->name, "%s", field[1]);
    out->qty = qty;
    out->price = price;
    return NULL;
}


/* โหลดทั้งไฟล์แบบ "ทั้งหมดหรือไม่เลย" · คืน 1 สำเร็จ (ได้ *items และ *count ที่ผู้เรียกต้อง free)
   คืน 0 เมื่อไม่มีไฟล์ · คืน -1 เมื่อไฟล์เสีย (ตั้ง *badLine และ *why) */
static int load_items(const char *path, Item **items, int *count, int *badLine, const char **why) {
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        return 0;
    }
    Item *list = NULL;
    int n = 0, cap = 0, lineNo = 0;
    int result = -1;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        lineNo++;
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        Item it;
        const char *err = item_parse(line, &it);
        if (err != NULL) {
            *badLine = lineNo;
            *why = err;
            fclose(f);
            return -1;
        }
        if (n == cap) {
            int nc = cap ? cap * 2 : 4;
            Item *t = realloc(list, (size_t)nc * sizeof *t);
            if (t == NULL) {
                *badLine = lineNo;
                *why = "หน่วยความจำไม่พอ";
            fclose(f);
            return -1;
            }
            list = t;
            cap = nc;
        }
        list[n++] = it;
    }
    *items = list;
    *count = n;
    list = NULL;
    result = 1;
    fclose(f);
    return result;
}

int main(void) {
    Item *items = NULL;
    int count = 0, badLine = 0;
    const char *why = NULL;
    int r = load_items("/data/stock.db", &items, &count, &badLine, &why);
    if (r == 0) {
        puts("ยังไม่มีไฟล์ข้อมูล (เริ่มด้วยคลังว่าง)");
    } else if (r < 0) {
        printf("ไฟล์เสียที่บรรทัด %d: %s\n", badLine, why);
        puts("เริ่มด้วยคลังว่าง");
    } else {
        printf("โหลดแล้ว %d รายการ\n", count);
        for (int i = 0; i < count; i++) {
            printf("%s %s %d %ld.%02ld\n", items[i].sku, items[i].name, items[i].qty, items[i].price / 100, items[i].price % 100);
        }
    }
    free(items);
    return 0;
}
`] },
  "c2-capstone/8": { sol: R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

typedef int (*PriceFn)(const char *s, long *out);

/* ── ชุดทดสอบของคุณ ── */
static int runTests(PriceFn parse) {
    int failures = 0;
    long v = 0;
#define ACCEPT(s, expected) do { v = -1; if (!parse((s), &v) || v != (expected)) failures++; } while (0)
#define REJECT(s) do { if (parse((s), &v)) failures++; } while (0)
    ACCEPT("12.50", 1250);
    ACCEPT("12.5", 1250);
    ACCEPT("12", 1200);
    ACCEPT("0", 0);
    ACCEPT("10000000.00", 1000000000L);
    REJECT("1.234");
    REJECT("-1");
    REJECT(".5");
    REJECT("7.");
    REJECT("");
    REJECT("10000000.01");
#undef ACCEPT
#undef REJECT
    return failures;
}

/* ── ฟังก์ชันที่ถูก และเวอร์ชันที่มีบั๊ก (ห้ามแก้) ── */
/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int correct(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugThreeDigits(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        while (isdigit((unsigned char)s[i])) {
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugOneDigitAsSatang(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = s[i] - '0';
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat = sat * 10 + (s[i] - '0');
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugNeedDecimal(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] != '.') {
        return 0;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugAllowMinus(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (s[0] == '-') {
        i++;
    }
    if (!isdigit((unsigned char)s[i])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugLeadingDot(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0]) && s[0] != '.') {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugNoLimit(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0') {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugTrailingDot(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat = (s[i] - '0') * 10;
            i++;
        }
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

int main(void) {
    char mode[8] = "";
    scanf("%7s", mode);
    PriceFn fn = correct;
    PriceFn bugs[] = { bugThreeDigits, bugOneDigitAsSatang, bugNeedDecimal, bugAllowMinus, bugLeadingDot, bugNoLimit, bugTrailingDot };
    if (mode[0] == 'm' && mode[1] >= '1' && mode[1] <= '7' && mode[2] == '\0') {
        fn = bugs[mode[1] - '1'];
    }
    puts(runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>
#include <ctype.h>

typedef int (*PriceFn)(const char *s, long *out);

/* ── ชุดทดสอบของคุณ ── */
static int runTests(PriceFn parse) {
    int failures = 0;
    long v = 0;
#define ACCEPT(s, expected) do { v = -1; if (!parse((s), &v) || v != (expected)) failures++; } while (0)
#define REJECT(s) do { if (parse((s), &v)) failures++; } while (0)
    ACCEPT("12.50", 1250);
    ACCEPT("12.5", 1250);
    ACCEPT("12", 1200);
    ACCEPT("0", 0);
    ACCEPT("10000000.00", 1000000000L);
    REJECT("1.234");
    REJECT("-1");
    REJECT(".5");
    REJECT("7.");
    REJECT("");
#undef ACCEPT
#undef REJECT
    return failures;
}

/* ── ฟังก์ชันที่ถูก และเวอร์ชันที่มีบั๊ก (ห้ามแก้) ── */
/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int correct(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugThreeDigits(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        while (isdigit((unsigned char)s[i])) {
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugOneDigitAsSatang(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = s[i] - '0';
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat = sat * 10 + (s[i] - '0');
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugNeedDecimal(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] != '.') {
        return 0;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugAllowMinus(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (s[0] == '-') {
        i++;
    }
    if (!isdigit((unsigned char)s[i])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugLeadingDot(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0]) && s[0] != '.') {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugNoLimit(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0') {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int bugTrailingDot(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat = (s[i] - '0') * 10;
            i++;
        }
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

int main(void) {
    char mode[8] = "";
    scanf("%7s", mode);
    PriceFn fn = correct;
    PriceFn bugs[] = { bugThreeDigits, bugOneDigitAsSatang, bugNeedDecimal, bugAllowMinus, bugLeadingDot, bugNoLimit, bugTrailingDot };
    if (mode[0] == 'm' && mode[1] >= '1' && mode[1] <= '7' && mode[2] == '\0') {
        fn = bugs[mode[1] - '1'];
    }
    puts(runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด");
    return 0;
}
`] },
  "c2-capstone/9": { sol: R`#include <stdio.h>
#include <stdlib.h>

static int cmpInt(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *ids = malloc(((size_t)n + 1) * sizeof *ids);
    if (ids == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &ids[i]);
    }
    qsort(ids, (size_t)n, sizeof *ids, cmpInt);
    int q = 0, found = 0;
    scanf("%d", &q);
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        if (bsearch(&x, ids, (size_t)n, sizeof *ids, cmpInt) != NULL) {
            found++;
        }
    }
    printf("พบ: %d\n", found);
    free(ids);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>

static int cmpInt(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *ids = malloc(((size_t)n + 1) * sizeof *ids);
    if (ids == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &ids[i]);
    }
        int q = 0, found = 0;
    scanf("%d", &q);
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        if (bsearch(&x, ids, (size_t)n, sizeof *ids, cmpInt) != NULL) {
            found++;
        }
    }
    printf("พบ: %d\n", found);
    free(ids);
    return 0;
}
`] },
  "c2-capstone/11": { sol: R`// === item.h ===
#ifndef ITEM_H
#define ITEM_H

#include <stddef.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

const char *item_parse(const char *line, Item *out);   /* NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนเหตุผล */
const char *item_make(const char *sku, const char *name, const char *qty, const char *price, Item *out);
void item_format(const Item *it, char *buf, size_t size);

#endif

// === item.c ===
#include "item.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

const char *item_make(const char *sku, const char *name, const char *qty, const char *price, Item *out) {
    if (!validSku(sku)) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(name);
    if (nl < 1 || nl > 47 || strchr(name, '|') != NULL) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int q = 0;
    if (!parseQty(qty, &q)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long p = 0;
    if (!parsePrice(price, &p)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", sku);
    snprintf(out->name, sizeof out->name, "%s", name);
    out->qty = q;
    out->price = p;
    return NULL;
}

const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    field[n++] = buf;
    for (char *p = buf; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    return item_make(field[0], field[1], field[2], field[3], out);
}

void item_format(const Item *it, char *buf, size_t size) {
    snprintf(buf, size, "%s|%s|%d|%ld.%02ld", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
}

// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

#include <stddef.h>
#include "item.h"

typedef struct Inventory Inventory;

Inventory *inv_create(void);
void inv_destroy(Inventory *inv);
int inv_add(Inventory *inv, const Item *it);       /* 0 = รหัสซ้ำหรือจองไม่ได้ */
Item *inv_find(Inventory *inv, const char *sku);   /* inventory เป็นเจ้าของ · ใช้ได้จนกว่าจะ inv_add ครั้งถัดไป */
size_t inv_count(const Inventory *inv);
const Item *inv_at(const Inventory *inv, size_t i);
void inv_sort_by_sku(Inventory *inv);

#endif

// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>
#include <string.h>

struct Inventory {
    Item *items;
    size_t count;
    size_t cap;
};

Inventory *inv_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->items = NULL;
        inv->count = 0;
        inv->cap = 0;
    }
    return inv;
}

void inv_destroy(Inventory *inv) {
    if (inv == NULL) {
        return;
    }
    free(inv->items);
    free(inv);
}

Item *inv_find(Inventory *inv, const char *sku) {
    for (size_t i = 0; i < inv->count; i++) {
        if (strcmp(inv->items[i].sku, sku) == 0) {
            return &inv->items[i];
        }
    }
    return NULL;
}

int inv_add(Inventory *inv, const Item *it) {
    if (inv_find(inv, it->sku) != NULL) {
        return 0;
    }
    if (inv->count == inv->cap) {
        size_t nc = inv->cap ? inv->cap * 2 : 4;
        Item *t = realloc(inv->items, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        inv->items = t;
        inv->cap = nc;
    }
    inv->items[inv->count++] = *it;
    return 1;
}

size_t inv_count(const Inventory *inv) {
    return inv->count;
}

const Item *inv_at(const Inventory *inv, size_t i) {
    return i < inv->count ? &inv->items[i] : NULL;
}

static int cmpSku(const void *a, const void *b) {
    return strcmp(((const Item *)a)->sku, ((const Item *)b)->sku);
}

void inv_sort_by_sku(Inventory *inv) {
    qsort(inv->items, inv->count, sizeof *inv->items, cmpSku);
}

// === main.c ===
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include "item.h"
#include "inventory.h"

#define DB_PATH "/data/stock.db"

/* แยกคำสั่งในที่เดิม · "…" รวมเป็นหนึ่งอาร์กิวเมนต์ (ใส่ได้เฉพาะต้นอาร์กิวเมนต์) · คืนจำนวน หรือ -1 พร้อม *err */
static int tokenize(char *line, char *argv[], int max, const char **err) {
    int n = 0;
    char *p = line;
    for (;;) {
        while (*p == ' ' || *p == '\t') {
            p++;
        }
        if (*p == '\0') {
            return n;
        }
        if (n == max) {
            *err = "อาร์กิวเมนต์มากเกินไป";
            return -1;
        }
        if (*p == '"') {
            p++;
            argv[n++] = p;
            while (*p != '\0' && *p != '"') {
                p++;
            }
            if (*p != '"') {
                *err = "เครื่องหมายคำพูดไม่ครบ";
                return -1;
            }
            *p++ = '\0';
        } else {
            argv[n++] = p;
            while (*p != '\0' && *p != ' ' && *p != '\t') {
                p++;
            }
            if (*p != '\0') {
                *p++ = '\0';
            }
        }
    }
}

static int parseAmount(const char *s, int *out) {
    char *end;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || v <= 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* คืน 1 โหลดสำเร็จ · 0 ไม่มีไฟล์ · -1 ไฟล์เสีย (inv ถูกล้างเป็นว่าง) */
static int load(Inventory **inv, int *badLine, const char **why) {
    FILE *f = fopen(DB_PATH, "r");
    if (f == NULL) {
        return 0;
    }
    int result = -1, lineNo = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        lineNo++;
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        Item it;
        const char *err = item_parse(line, &it);
        if (err == NULL && !inv_add(*inv, &it)) {
            err = "รหัสซ้ำ";
        }
        if (err != NULL) {
            *badLine = lineNo;
            *why = err;
            goto cleanup;
        }
    }
    result = 1;
cleanup:
    fclose(f);
    if (result < 0) {
        Inventory *fresh = inv_create();
        inv_destroy(*inv);
        *inv = fresh;
    }
    return result;
}

static int save(const Inventory *inv) {
    FILE *f = fopen(DB_PATH, "w");
    if (f == NULL) {
        return 0;
    }
    char buf[128];
    for (size_t i = 0; i < inv_count(inv); i++) {
        item_format(inv_at(inv, i), buf, sizeof buf);
        fprintf(f, "%s\n", buf);
    }
    return fclose(f) == 0;
}

int main(void) {
    Inventory *inv = inv_create();
    if (inv == NULL) {
        return 1;
    }
    int badLine = 0;
    const char *why = NULL;
    int r = load(&inv, &badLine, &why);
    if (inv == NULL) {
        return 1;
    }
    if (r == 0) {
        puts("ยังไม่มีไฟล์ข้อมูล");
    } else if (r < 0) {
        printf("ไฟล์เสียที่บรรทัด %d: %s\n", badLine, why);
    } else {
        printf("โหลดแล้ว %zu รายการ\n", inv_count(inv));
    }
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *argv[8];
        const char *err = NULL;
        int argc = tokenize(line, argv, 8, &err);
        if (argc < 0) {
            puts("คำสั่งไม่ถูกต้อง");
            continue;
        }
        if (argc == 0) {
            continue;
        }
        const char *cmd = argv[0];
        if (strcmp(cmd, "add") == 0 && argc == 5) {
            Item it;
            const char *e = item_make(argv[1], argv[2], argv[3], argv[4], &it);
            if (e != NULL) {
                puts(e);
            } else if (!inv_add(inv, &it)) {
                printf("%s ซ้ำ\n", it.sku);
            } else {
                printf("เพิ่ม %s\n", it.sku);
            }
        } else if ((strcmp(cmd, "sell") == 0 || strcmp(cmd, "restock") == 0) && argc == 3) {
            Item *it = inv_find(inv, argv[1]);
            int n = 0;
            if (it == NULL) {
                printf("ไม่พบ %s\n", argv[1]);
            } else if (!parseAmount(argv[2], &n)) {
                puts("จำนวนไม่ถูกต้อง");
            } else if (cmd[0] == 's') {
                if (n > it->qty) {
                    printf("สินค้าไม่พอ (มี %d)\n", it->qty);
                } else {
                    it->qty -= n;
                    printf("ขาย %s %d เหลือ %d\n", it->sku, n, it->qty);
                }
            } else if (it->qty > INT_MAX - n) {
                puts("เกินขีดจำกัด");
            } else {
                it->qty += n;
                printf("เติม %s %d รวม %d\n", it->sku, n, it->qty);
            }
        } else if (strcmp(cmd, "list") == 0 && argc == 1) {
            inv_sort_by_sku(inv);
            if (inv_count(inv) == 0) {
                puts("(ว่าง)");
            }
            for (size_t i = 0; i < inv_count(inv); i++) {
                const Item *it = inv_at(inv, i);
                printf("%s %s %d %ld.%02ld\n", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
            }
        } else if (strcmp(cmd, "value") == 0 && argc == 1) {
            long long total = 0;
            for (size_t i = 0; i < inv_count(inv); i++) {
                const Item *it = inv_at(inv, i);
                total += (long long)it->qty * it->price;
            }
            printf("มูลค่ารวม: %lld.%02lld บาท\n", total / 100, total % 100);
        } else if (strcmp(cmd, "save") == 0 && argc == 1) {
            if (save(inv)) {
                printf("บันทึก %zu รายการ\n", inv_count(inv));
            } else {
                puts("บันทึกไม่สำเร็จ");
            }
        } else {
            puts("คำสั่งไม่ถูกต้อง");
        }
    }
    inv_destroy(inv);
    return 0;
}
`, wrong: [R`// === item.h ===
#ifndef ITEM_H
#define ITEM_H

#include <stddef.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

const char *item_parse(const char *line, Item *out);   /* NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนเหตุผล */
const char *item_make(const char *sku, const char *name, const char *qty, const char *price, Item *out);
void item_format(const Item *it, char *buf, size_t size);

#endif

// === item.c ===
#include "item.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>
#include <limits.h>

static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}

const char *item_make(const char *sku, const char *name, const char *qty, const char *price, Item *out) {
    if (!validSku(sku)) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(name);
    if (nl < 1 || nl > 47 || strchr(name, '|') != NULL) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int q = 0;
    if (!parseQty(qty, &q)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long p = 0;
    if (!parsePrice(price, &p)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", sku);
    snprintf(out->name, sizeof out->name, "%s", name);
    out->qty = q;
    out->price = p;
    return NULL;
}

const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    field[n++] = buf;
    for (char *p = buf; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    return item_make(field[0], field[1], field[2], field[3], out);
}

void item_format(const Item *it, char *buf, size_t size) {
    snprintf(buf, size, "%s|%s|%d|%ld.%02ld", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
}

// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

#include <stddef.h>
#include "item.h"

typedef struct Inventory Inventory;

Inventory *inv_create(void);
void inv_destroy(Inventory *inv);
int inv_add(Inventory *inv, const Item *it);       /* 0 = รหัสซ้ำหรือจองไม่ได้ */
Item *inv_find(Inventory *inv, const char *sku);   /* inventory เป็นเจ้าของ · ใช้ได้จนกว่าจะ inv_add ครั้งถัดไป */
size_t inv_count(const Inventory *inv);
const Item *inv_at(const Inventory *inv, size_t i);
void inv_sort_by_sku(Inventory *inv);

#endif

// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>
#include <string.h>

struct Inventory {
    Item *items;
    size_t count;
    size_t cap;
};

Inventory *inv_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->items = NULL;
        inv->count = 0;
        inv->cap = 0;
    }
    return inv;
}

void inv_destroy(Inventory *inv) {
    if (inv == NULL) {
        return;
    }
    free(inv->items);
    free(inv);
}

Item *inv_find(Inventory *inv, const char *sku) {
    for (size_t i = 0; i < inv->count; i++) {
        if (strcmp(inv->items[i].sku, sku) == 0) {
            return &inv->items[i];
        }
    }
    return NULL;
}

int inv_add(Inventory *inv, const Item *it) {
    if (inv_find(inv, it->sku) != NULL) {
        return 0;
    }
    if (inv->count == inv->cap) {
        size_t nc = inv->cap ? inv->cap * 2 : 4;
        Item *t = realloc(inv->items, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        inv->items = t;
        inv->cap = nc;
    }
    inv->items[inv->count++] = *it;
    return 1;
}

size_t inv_count(const Inventory *inv) {
    return inv->count;
}

const Item *inv_at(const Inventory *inv, size_t i) {
    return i < inv->count ? &inv->items[i] : NULL;
}

static int cmpSku(const void *a, const void *b) {
    return strcmp(((const Item *)a)->sku, ((const Item *)b)->sku);
}

void inv_sort_by_sku(Inventory *inv) {
    qsort(inv->items, inv->count, sizeof *inv->items, cmpSku);
}

// === main.c ===
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include "item.h"
#include "inventory.h"

#define DB_PATH "/data/stock.db"

/* แยกคำสั่งในที่เดิม · "…" รวมเป็นหนึ่งอาร์กิวเมนต์ (ใส่ได้เฉพาะต้นอาร์กิวเมนต์) · คืนจำนวน หรือ -1 พร้อม *err */
static int tokenize(char *line, char *argv[], int max, const char **err) {
    int n = 0;
    char *p = line;
    for (;;) {
        while (*p == ' ' || *p == '\t') {
            p++;
        }
        if (*p == '\0') {
            return n;
        }
        if (n == max) {
            *err = "อาร์กิวเมนต์มากเกินไป";
            return -1;
        }
        if (*p == '"') {
            p++;
            argv[n++] = p;
            while (*p != '\0' && *p != '"') {
                p++;
            }
            if (*p != '"') {
                *err = "เครื่องหมายคำพูดไม่ครบ";
                return -1;
            }
            *p++ = '\0';
        } else {
            argv[n++] = p;
            while (*p != '\0' && *p != ' ' && *p != '\t') {
                p++;
            }
            if (*p != '\0') {
                *p++ = '\0';
            }
        }
    }
}

static int parseAmount(const char *s, int *out) {
    char *end;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || v <= 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* คืน 1 โหลดสำเร็จ · 0 ไม่มีไฟล์ · -1 ไฟล์เสีย (inv ถูกล้างเป็นว่าง) */
static int load(Inventory **inv, int *badLine, const char **why) {
    FILE *f = fopen(DB_PATH, "r");
    if (f == NULL) {
        return 0;
    }
    int result = -1, lineNo = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        lineNo++;
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        Item it;
        const char *err = item_parse(line, &it);
        if (err == NULL && !inv_add(*inv, &it)) {
            err = "รหัสซ้ำ";
        }
        if (err != NULL) {
            *badLine = lineNo;
            *why = err;
            goto cleanup;
        }
    }
    result = 1;
cleanup:
    fclose(f);
    if (result < 0) {
        *inv = inv_create();
    }
    return result;
}

static int save(const Inventory *inv) {
    FILE *f = fopen(DB_PATH, "w");
    if (f == NULL) {
        return 0;
    }
    char buf[128];
    for (size_t i = 0; i < inv_count(inv); i++) {
        item_format(inv_at(inv, i), buf, sizeof buf);
        fprintf(f, "%s\n", buf);
    }
    return fclose(f) == 0;
}

int main(void) {
    Inventory *inv = inv_create();
    if (inv == NULL) {
        return 1;
    }
    int badLine = 0;
    const char *why = NULL;
    int r = load(&inv, &badLine, &why);
    if (inv == NULL) {
        return 1;
    }
    if (r == 0) {
        puts("ยังไม่มีไฟล์ข้อมูล");
    } else if (r < 0) {
        printf("ไฟล์เสียที่บรรทัด %d: %s\n", badLine, why);
    } else {
        printf("โหลดแล้ว %zu รายการ\n", inv_count(inv));
    }
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *argv[8];
        const char *err = NULL;
        int argc = tokenize(line, argv, 8, &err);
        if (argc < 0) {
            puts("คำสั่งไม่ถูกต้อง");
            continue;
        }
        if (argc == 0) {
            continue;
        }
        const char *cmd = argv[0];
        if (strcmp(cmd, "add") == 0 && argc == 5) {
            Item it;
            const char *e = item_make(argv[1], argv[2], argv[3], argv[4], &it);
            if (e != NULL) {
                puts(e);
            } else if (!inv_add(inv, &it)) {
                printf("%s ซ้ำ\n", it.sku);
            } else {
                printf("เพิ่ม %s\n", it.sku);
            }
        } else if ((strcmp(cmd, "sell") == 0 || strcmp(cmd, "restock") == 0) && argc == 3) {
            Item *it = inv_find(inv, argv[1]);
            int n = 0;
            if (it == NULL) {
                printf("ไม่พบ %s\n", argv[1]);
            } else if (!parseAmount(argv[2], &n)) {
                puts("จำนวนไม่ถูกต้อง");
            } else if (cmd[0] == 's') {
                if (n > it->qty) {
                    printf("สินค้าไม่พอ (มี %d)\n", it->qty);
                } else {
                    it->qty -= n;
                    printf("ขาย %s %d เหลือ %d\n", it->sku, n, it->qty);
                }
            } else if (it->qty > INT_MAX - n) {
                puts("เกินขีดจำกัด");
            } else {
                it->qty += n;
                printf("เติม %s %d รวม %d\n", it->sku, n, it->qty);
            }
        } else if (strcmp(cmd, "list") == 0 && argc == 1) {
            inv_sort_by_sku(inv);
            if (inv_count(inv) == 0) {
                puts("(ว่าง)");
            }
            for (size_t i = 0; i < inv_count(inv); i++) {
                const Item *it = inv_at(inv, i);
                printf("%s %s %d %ld.%02ld\n", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
            }
        } else if (strcmp(cmd, "value") == 0 && argc == 1) {
            long long total = 0;
            for (size_t i = 0; i < inv_count(inv); i++) {
                const Item *it = inv_at(inv, i);
                total += (long long)it->qty * it->price;
            }
            printf("มูลค่ารวม: %lld.%02lld บาท\n", total / 100, total % 100);
        } else if (strcmp(cmd, "save") == 0 && argc == 1) {
            if (save(inv)) {
                printf("บันทึก %zu รายการ\n", inv_count(inv));
            } else {
                puts("บันทึกไม่สำเร็จ");
            }
        } else {
            puts("คำสั่งไม่ถูกต้อง");
        }
    }
    inv_destroy(inv);
    return 0;
}
`] },

  // ── โบนัส B2: Modern C (C23) ──
  "c2-modern/0": { sol: R`#include <stdio.h>
#include <stddef.h>

constexpr int MAX = 8;

static const int *firstNegative(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        if (a[i] < 0) {
            return &a[i];
        }
    }
    return nullptr;
}

int main(void) {
    int a[MAX] = {};
    int n = 0;
    scanf("%d", &n);
    if (n > MAX) {
        n = MAX;
    }
    bool allPositive = true;
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        if (a[i] <= 0) {
            allPositive = false;
        }
    }
    const int *p = firstNegative(a, n);
    if (p == nullptr) {
        puts("ไม่มีค่าติดลบ");
    } else {
        printf("ค่าติดลบแรก: %d ที่ตำแหน่ง %td\n", *p, p - a);
    }
    printf("ทุกตัวเป็นบวก: %s\n", allPositive ? "true" : "false");
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stddef.h>

constexpr int MAX = 8;

static const int *firstNegative(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        if (a[i] < 0) {
            return &a[i];
        }
    }
    return nullptr;
}

int main(void) {
    int a[MAX] = {};
    int n = 0;
    scanf("%d", &n);
    if (n > MAX) {
        n = MAX;
    }
    bool allPositive = true;
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        if (a[i] < 0) {
            allPositive = false;
        }
    }
    const int *p = firstNegative(a, n);
    if (p == nullptr) {
        puts("ไม่มีค่าติดลบ");
    } else {
        printf("ค่าติดลบแรก: %d ที่ตำแหน่ง %td\n", *p, p - a);
    }
    printf("ทุกตัวเป็นบวก: %s\n", allPositive ? "true" : "false");
    return 0;
}
`] },
  "c2-modern/1": { sol: R`#include <stdio.h>

#define SWAP(a, b) do { typeof(a) t_ = (a); (a) = (b); (b) = t_; } while (0)

int main(void) {
    int x = 0, y = 0;
    double p = 0, q = 0;
    scanf("%d %d %lf %lf", &x, &y, &p, &q);
    const char *s = "ซ้าย", *t = "ขวา";
    SWAP(x, y);
    SWAP(p, q);
    SWAP(s, t);
    printf("%d %d %.1f %.1f %s %s\n", x, y, p, q, s, t);
    return 0;
}
`, wrong: [R`#include <stdio.h>

#define SWAP(a, b) do { int t_ = (int)(a); (a) = (b); (b) = t_; } while (0)

int main(void) {
    int x = 0, y = 0;
    double p = 0, q = 0;
    scanf("%d %d %lf %lf", &x, &y, &p, &q);
    const char *s = "ซ้าย", *t = "ขวา";
    SWAP(x, y);
    SWAP(p, q);
        printf("%d %d %.1f %.1f %s %s\n", x, y, p, q, s, t);
    return 0;
}
`] },
  "c2-modern/2": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <limits.h>

[[nodiscard]] static bool parse_int(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < INT_MIN || v > INT_MAX) {
        return false;
    }
    *out = (int)v;
    return true;
}

int main(void) {
    char line[64];
    while (fgets(line, sizeof line, stdin) != nullptr) {
        line[strcspn(line, "\n")] = '\0';
        int v = 0;
        if (parse_int(line, &v)) {
            printf("ค่า: %d\n", v);
        } else {
            puts("ไม่ใช่ตัวเลข");
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <limits.h>

[[nodiscard]] static bool parse_int(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || errno == ERANGE || v < INT_MIN || v > INT_MAX) {
        return false;
    }
    *out = (int)v;
    return true;
}

int main(void) {
    char line[64];
    while (fgets(line, sizeof line, stdin) != nullptr) {
        line[strcspn(line, "\n")] = '\0';
        int v = 0;
        if (parse_int(line, &v)) {
            printf("ค่า: %d\n", v);
        } else {
            puts("ไม่ใช่ตัวเลข");
        }
    }
    return 0;
}
`] },
  "c2-modern/3": { sol: R`#include <stdio.h>
#include <stdckdint.h>

int main(void) {
    int qty = 0, price = 0;
    int total = 0;
    bool totalOverflow = false;
    while (scanf("%d %d", &qty, &price) == 2) {
        int line = 0;
        if (ckd_mul(&line, qty, price)) {
            puts("ยอด: ล้น");
            continue;
        }
        printf("ยอด: %d\n", line);
        if (!totalOverflow && ckd_add(&total, total, line)) {
            totalOverflow = true;
        }
    }
    if (totalOverflow) {
        puts("รวมทั้งหมด: ล้น");
    } else {
        printf("รวมทั้งหมด: %d\n", total);
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdckdint.h>

int main(void) {
    int qty = 0, price = 0;
    int total = 0;
    bool totalOverflow = false;
    while (scanf("%d %d", &qty, &price) == 2) {
        int line = 0;
        if (ckd_mul(&line, qty, price)) {
            puts("ยอด: ล้น");
            continue;
        }
        printf("ยอด: %d\n", line);
        totalOverflow = ckd_add(&total, total, line);
    }
    if (totalOverflow) {
        puts("รวมทั้งหมด: ล้น");
    } else {
        printf("รวมทั้งหมด: %d\n", total);
    }
    return 0;
}
`] },
  "c2-modern/4": { sol: R`#include <stdio.h>
#include <string.h>

constexpr unsigned PERM_READ = 0b100;
constexpr unsigned PERM_WRITE = 0b010;
constexpr unsigned PERM_EXEC = 0b001;

static unsigned maskOf(char c) {
    return c == 'r' ? PERM_READ : c == 'w' ? PERM_WRITE : c == 'x' ? PERM_EXEC : 0;
}

int main(void) {
    unsigned perms = 0;
    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "show") == 0) {
            printf("สิทธิ์: 0b%u%u%u (%c%c%c)\n", (perms >> 2) & 1u, (perms >> 1) & 1u, perms & 1u,
                   perms & PERM_READ ? 'r' : '-', perms & PERM_WRITE ? 'w' : '-', perms & PERM_EXEC ? 'x' : '-');
            continue;
        }
        unsigned m = strlen(cmd) == 2 ? maskOf(cmd[1]) : 0;
        if (m == 0) {
            puts("คำสั่งไม่ถูกต้อง");
        } else if (cmd[0] == '+') {
            perms |= m;
        } else if (cmd[0] == '-') {
            perms &= ~m;
        } else if (cmd[0] == '?') {
            printf("มี %c: %s\n", cmd[1], (perms & m) != 0 ? "ใช่" : "ไม่");
        } else {
            puts("คำสั่งไม่ถูกต้อง");
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

constexpr unsigned PERM_READ = 0b100;
constexpr unsigned PERM_WRITE = 0b010;
constexpr unsigned PERM_EXEC = 0b001;

static unsigned maskOf(char c) {
    return c == 'r' ? PERM_READ : c == 'w' ? PERM_WRITE : c == 'x' ? PERM_EXEC : 0;
}

int main(void) {
    unsigned perms = 0;
    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "show") == 0) {
            printf("สิทธิ์: 0b%u%u%u (%c%c%c)\n", (perms >> 2) & 1u, (perms >> 1) & 1u, perms & 1u,
                   perms & PERM_READ ? 'r' : '-', perms & PERM_WRITE ? 'w' : '-', perms & PERM_EXEC ? 'x' : '-');
            continue;
        }
        unsigned m = strlen(cmd) == 2 ? maskOf(cmd[1]) : 0;
        if (m == 0) {
            puts("คำสั่งไม่ถูกต้อง");
        } else if (cmd[0] == '+') {
            perms |= m;
        } else if (cmd[0] == '-') {
            perms ^= m;
        } else if (cmd[0] == '?') {
            printf("มี %c: %s\n", cmd[1], (perms & m) != 0 ? "ใช่" : "ไม่");
        } else {
            puts("คำสั่งไม่ถูกต้อง");
        }
    }
    return 0;
}
`] },
  "c2-modern/5": { sol: R`#include <stdio.h>

#if __has_include(<stdbit.h>)
#include <stdbit.h>
#define HAVE_STDBIT 1
#else
#define HAVE_STDBIT 0
#endif

#if !HAVE_STDBIT
static unsigned countOnes(unsigned v) {
    unsigned c = 0;
    while (v != 0) {
        c += v & 1u;
        v >>= 1;
    }
    return c;
}

static unsigned bitWidth(unsigned v) {
    unsigned w = 0;
    while (v != 0) {
        w++;
        v >>= 1;
    }
    return w;
}
#endif

int main(void) {
#if __STDC_VERSION__ >= 202311L
    printf("มาตรฐาน: C23 (%ld)\n", __STDC_VERSION__);
#else
    puts("มาตรฐาน: ต่ำกว่า C23");
#endif
#if HAVE_STDBIT
    puts("stdbit.h: มี");
#else
    puts("stdbit.h: ไม่มี — ใช้ฟังก์ชันสำรอง");
#endif
    unsigned v = 0;
    while (scanf("%u", &v) == 1) {
#if HAVE_STDBIT
        printf("%u: บิตที่เป็น 1 = %u · ความกว้าง = %u\n", v, (unsigned)stdc_count_ones(v), (unsigned)stdc_bit_width(v));
#else
        printf("%u: บิตที่เป็น 1 = %u · ความกว้าง = %u\n", v, countOnes(v), bitWidth(v));
#endif
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>

#if __has_include(<stdbit.h>)
#include <stdbit.h>
#define HAVE_STDBIT 1
#else
#define HAVE_STDBIT 0
#endif

#if !HAVE_STDBIT
static unsigned countOnes(unsigned v) {
    unsigned c = 0;
    while (v != 0) {
        c += v & 1u;
        v >>= 1;
    }
    return c;
}

static unsigned bitWidth(unsigned v) {
    unsigned w = 0;
    while (v > 1) {
        w++;
        v >>= 1;
    }
    return w;
}
#endif

int main(void) {
#if __STDC_VERSION__ >= 202311L
    printf("มาตรฐาน: C23 (%ld)\n", __STDC_VERSION__);
#else
    puts("มาตรฐาน: ต่ำกว่า C23");
#endif
#if HAVE_STDBIT
    puts("stdbit.h: มี");
#else
    puts("stdbit.h: ไม่มี — ใช้ฟังก์ชันสำรอง");
#endif
    unsigned v = 0;
    while (scanf("%u", &v) == 1) {
#if HAVE_STDBIT
        printf("%u: บิตที่เป็น 1 = %u · ความกว้าง = %u\n", v, (unsigned)stdc_count_ones(v), (unsigned)stdc_bit_width(v));
#else
        printf("%u: บิตที่เป็น 1 = %u · ความกว้าง = %u\n", v, countOnes(v), bitWidth(v));
#endif
    }
    return 0;
}
`] },
  "c2-modern/6": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <string.h>

constexpr int BITS = 128;
static_assert(BITS % 32 == 0);

[[nodiscard]] static bool valid(int i) {
    return i >= 0 && i < BITS;
}

[[nodiscard]] static bool bit_test(const uint32_t *w, int i) {
    return (w[i / 32] >> (i % 32)) & 1u;
}

[[nodiscard]] static int count_ones(uint32_t v) {
    int c = 0;
    while (v != 0) {
        c += (int)(v & 1u);
        v >>= 1;
    }
    return c;
}

int main(void) {
    uint32_t words[BITS / 32] = {};
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "count") == 0) {
            int n = 0;
            for (int k = 0; k < BITS / 32; k++) {
                n += count_ones(words[k]);
            }
            printf("จำนวนบิต: %d\n", n);
            continue;
        }
        if (strcmp(cmd, "list") == 0) {
            int first = 1;
            for (int i = 0; i < BITS; i++) {
                if (bit_test(words, i)) {
                    printf(first ? "%d" : " %d", i);
                    first = 0;
                }
            }
            puts(first ? "(ว่าง)" : "");
            continue;
        }
        int i = 0;
        if (scanf("%d", &i) != 1) {
            break;
        }
        if (!valid(i)) {
            puts("ตำแหน่งไม่ถูกต้อง");
            continue;
        }
        uint32_t m = (uint32_t)1 << (i % 32);
        if (strcmp(cmd, "set") == 0) {
            words[i / 32] |= m;
        } else if (strcmp(cmd, "clear") == 0) {
            words[i / 32] &= ~m;
        } else if (strcmp(cmd, "flip") == 0) {
            words[i / 32] ^= m;
        } else if (strcmp(cmd, "test") == 0) {
            printf("บิต %d: %d\n", i, bit_test(words, i) ? 1 : 0);
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <string.h>

constexpr int BITS = 128;
static_assert(BITS % 32 == 0);

[[nodiscard]] static bool valid(int i) {
    return i >= 0 && i <= BITS;
}

[[nodiscard]] static bool bit_test(const uint32_t *w, int i) {
    return (w[i / 32] >> (i % 32)) & 1u;
}

[[nodiscard]] static int count_ones(uint32_t v) {
    int c = 0;
    while (v != 0) {
        c += (int)(v & 1u);
        v >>= 1;
    }
    return c;
}

int main(void) {
    uint32_t words[BITS / 32] = {};
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "count") == 0) {
            int n = 0;
            for (int k = 0; k < BITS / 32; k++) {
                n += count_ones(words[k]);
            }
            printf("จำนวนบิต: %d\n", n);
            continue;
        }
        if (strcmp(cmd, "list") == 0) {
            int first = 1;
            for (int i = 0; i < BITS; i++) {
                if (bit_test(words, i)) {
                    printf(first ? "%d" : " %d", i);
                    first = 0;
                }
            }
            puts(first ? "(ว่าง)" : "");
            continue;
        }
        int i = 0;
        if (scanf("%d", &i) != 1) {
            break;
        }
        if (!valid(i)) {
            puts("ตำแหน่งไม่ถูกต้อง");
            continue;
        }
        uint32_t m = (uint32_t)1 << (i % 32);
        if (strcmp(cmd, "set") == 0) {
            words[i / 32] |= m;
        } else if (strcmp(cmd, "clear") == 0) {
            words[i / 32] &= ~m;
        } else if (strcmp(cmd, "flip") == 0) {
            words[i / 32] ^= m;
        } else if (strcmp(cmd, "test") == 0) {
            printf("บิต %d: %d\n", i, bit_test(words, i) ? 1 : 0);
        }
    }
    return 0;
}
`] },

  // ── โบนัส B1: Systems Track ──
  "c2-systems/0": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

typedef struct {
    const char *name;
    unsigned shift;
    unsigned width;
} Field;

static const Field FIELDS[] = {
    { "EN", 0, 1 },
    { "MODE", 1, 2 },
    { "IRQ", 3, 1 },
    { "SPEED", 4, 4 },
};

static const Field *findField(const char *name) {
    for (size_t i = 0; i < sizeof FIELDS / sizeof FIELDS[0]; i++) {
        if (strcmp(FIELDS[i].name, name) == 0) {
            return &FIELDS[i];
        }
    }
    return NULL;
}

int main(void) {
    uint32_t reg = 0;
    scanf("%" SCNx32, &reg);
    char cmd[8], name[16];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "show") == 0) {
            printf("REG = 0x%08" PRIX32 "\n", reg);
            continue;
        }
        if (scanf("%15s", name) != 1) {
            break;
        }
        unsigned v = 0;
        if (strcmp(cmd, "set") == 0 && scanf("%u", &v) != 1) {
            break;
        }
        const Field *f = findField(name);
        if (f == NULL) {
            puts("ไม่รู้จักฟิลด์");
            continue;
        }
        uint32_t mask = (1u << f->width) - 1u;
        if (strcmp(cmd, "get") == 0) {
            printf("%s = %" PRIu32 "\n", f->name, (reg >> f->shift) & mask);
        } else if (v > mask) {
            puts("ค่าเกินขนาดฟิลด์");
        } else {
            reg = (reg & ~(mask << f->shift)) | ((uint32_t)v << f->shift);
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

typedef struct {
    const char *name;
    unsigned shift;
    unsigned width;
} Field;

static const Field FIELDS[] = {
    { "EN", 0, 1 },
    { "MODE", 1, 2 },
    { "IRQ", 3, 1 },
    { "SPEED", 4, 4 },
};

static const Field *findField(const char *name) {
    for (size_t i = 0; i < sizeof FIELDS / sizeof FIELDS[0]; i++) {
        if (strcmp(FIELDS[i].name, name) == 0) {
            return &FIELDS[i];
        }
    }
    return NULL;
}

int main(void) {
    uint32_t reg = 0;
    scanf("%" SCNx32, &reg);
    char cmd[8], name[16];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "show") == 0) {
            printf("REG = 0x%08" PRIX32 "\n", reg);
            continue;
        }
        if (scanf("%15s", name) != 1) {
            break;
        }
        unsigned v = 0;
        if (strcmp(cmd, "set") == 0 && scanf("%u", &v) != 1) {
            break;
        }
        const Field *f = findField(name);
        if (f == NULL) {
            puts("ไม่รู้จักฟิลด์");
            continue;
        }
        uint32_t mask = (1u << f->width) - 1u;
        if (strcmp(cmd, "get") == 0) {
            printf("%s = %" PRIu32 "\n", f->name, (reg >> f->shift) & mask);
        } else if (v > mask) {
            puts("ค่าเกินขนาดฟิลด์");
        } else {
            reg |= (uint32_t)v << f->shift;
        }
    }
    return 0;
}
`] },
  "c2-systems/1": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

#define BIT(n) (1u << (n))
#define MASK(width) ((1u << (width)) - 1u)
#define FIELD_GET(reg, shift, width) (((reg) >> (shift)) & MASK(width))
#define FIELD_SET(reg, shift, width, v) (((reg) & ~(MASK(width) << (shift))) | (((v) & MASK(width)) << (shift)))

int main(void) {
    uint32_t reg = 0;
    scanf("%" SCNx32, &reg);
    printf("บิต 3: %d\n", (reg & BIT(3)) != 0);
    printf("ฟิลด์ [4,8): %" PRIu32 "\n", FIELD_GET(reg, 4, 4));
    printf("ตั้งฟิลด์ [4,8) = 0xA: 0x%08" PRIX32 "\n", (uint32_t)FIELD_SET(reg, 4, 4, 0xAu));
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

#define BIT(n) (1u << (n))
#define MASK(width) ((1u << (width)) - 1u)
#define FIELD_GET(reg, shift, width) (((reg) >> (shift)) & MASK(width))
#define FIELD_SET(reg, shift, width, v) ((reg) | (((v) & MASK(width)) << (shift)))

int main(void) {
    uint32_t reg = 0;
    scanf("%" SCNx32, &reg);
    printf("บิต 3: %d\n", (reg & BIT(3)) != 0);
    printf("ฟิลด์ [4,8): %" PRIu32 "\n", FIELD_GET(reg, 4, 4));
    printf("ตั้งฟิลด์ [4,8) = 0xA: 0x%08" PRIX32 "\n", (uint32_t)FIELD_SET(reg, 4, 4, 0xAu));
    return 0;
}
`] },
  "c2-systems/2": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

int main(void) {
    uint32_t raw = 0;
    scanf("%" SCNx32, &raw);
    unsigned version = raw >> 28;
    unsigned flags = (raw >> 24) & 0xFu;
    unsigned length = raw & 0xFFFFu;
    printf("version: %u · flags: %u · length: %u\n", version, flags, length);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

int main(void) {
    uint32_t raw = 0;
    scanf("%" SCNx32, &raw);
    unsigned version = raw >> 28;
    unsigned flags = (raw >> 24) & 0x7u;
    unsigned length = raw & 0xFFFFu;
    printf("version: %u · flags: %u · length: %u\n", version, flags, length);
    return 0;
}
`] },
  "c2-systems/3": { sol: R`#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <ctype.h>

static int isHexByte(const char *t) {
    size_t n = strlen(t);
    if (n < 1 || n > 2) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        if (!isxdigit((unsigned char)t[i])) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    char line[512];
    while (fgets(line, sizeof line, stdin) != NULL) {
        uint8_t b[128];
        int n = 0, bad = 0;
        for (char *t = strtok(line, " \t\n"); t != NULL; t = strtok(NULL, " \t\n")) {
            if (!isHexByte(t) || n == 128) {
                bad = 1;
                break;
            }
            b[n++] = (uint8_t)strtol(t, NULL, 16);
        }
        if (bad) {
            puts("ข้อมูลไม่ใช่เลขฐานสิบหก");
            continue;
        }
        if (n < 4) {
            puts("เฟรมสั้นเกิน");
            continue;
        }
        if (b[0] != 0xAA) {
            puts("ส่วนหัวผิด");
            continue;
        }
        if (n != b[2] + 4) {
            puts("ความยาวไม่ตรง");
            continue;
        }
        uint8_t cs = 0;
        for (int i = 1; i < n - 1; i++) {
            cs ^= b[i];
        }
        if (cs != b[n - 1]) {
            puts("checksum ผิด");
            continue;
        }
        const uint8_t *d = &b[3];
        if (b[1] == 0x01) {
            if (b[2] != 2) {
                puts("ขนาดข้อมูลไม่ถูกชนิด");
                continue;
            }
            unsigned raw = ((unsigned)d[0] << 8) | d[1];
            int v = raw >= 0x8000u ? (int)raw - 0x10000 : (int)raw;
            printf("อุณหภูมิ: %s%d.%d °C\n", v < 0 ? "-" : "", abs(v) / 10, abs(v) % 10);
        } else if (b[1] == 0x02) {
            if (b[2] != 4) {
                puts("ขนาดข้อมูลไม่ถูกชนิด");
                continue;
            }
            uint32_t c = ((uint32_t)d[0] << 24) | ((uint32_t)d[1] << 16) | ((uint32_t)d[2] << 8) | d[3];
            printf("ตัวนับ: %lu\n", (unsigned long)c);
        } else {
            printf("ชนิดไม่รู้จัก 0x%02X\n", b[1]);
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <ctype.h>

static int isHexByte(const char *t) {
    size_t n = strlen(t);
    if (n < 1 || n > 2) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        if (!isxdigit((unsigned char)t[i])) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    char line[512];
    while (fgets(line, sizeof line, stdin) != NULL) {
        uint8_t b[128];
        int n = 0, bad = 0;
        for (char *t = strtok(line, " \t\n"); t != NULL; t = strtok(NULL, " \t\n")) {
            if (!isHexByte(t) || n == 128) {
                bad = 1;
                break;
            }
            b[n++] = (uint8_t)strtol(t, NULL, 16);
        }
        if (bad) {
            puts("ข้อมูลไม่ใช่เลขฐานสิบหก");
            continue;
        }
        if (n < 4) {
            puts("เฟรมสั้นเกิน");
            continue;
        }
        if (b[0] != 0xAA) {
            puts("ส่วนหัวผิด");
            continue;
        }
        if (n != b[2] + 4) {
            puts("ความยาวไม่ตรง");
            continue;
        }
        uint8_t cs = 0;
        for (int i = 1; i < n - 1; i++) {
            cs ^= b[i];
        }
        if (cs != b[n - 1]) {
            puts("checksum ผิด");
            continue;
        }
        const uint8_t *d = &b[3];
        if (b[1] == 0x01) {
            if (b[2] != 2) {
                puts("ขนาดข้อมูลไม่ถูกชนิด");
                continue;
            }
            unsigned raw = ((unsigned)d[0] << 8) | d[1];
            int v = raw >= 0x8000u ? (int)raw - 0x10000 : (int)raw;
            printf("อุณหภูมิ: %d.%d °C\n", v / 10, abs(v) % 10);
        } else if (b[1] == 0x02) {
            if (b[2] != 4) {
                puts("ขนาดข้อมูลไม่ถูกชนิด");
                continue;
            }
            uint32_t c = ((uint32_t)d[0] << 24) | ((uint32_t)d[1] << 16) | ((uint32_t)d[2] << 8) | d[3];
            printf("ตัวนับ: %lu\n", (unsigned long)c);
        } else {
            printf("ชนิดไม่รู้จัก 0x%02X\n", b[1]);
        }
    }
    return 0;
}
`] },
  "c2-systems/4": { sol: R`#include <stdio.h>
#include <string.h>

typedef enum { OFF, IDLE, BUSY, ERROR, STATE_COUNT, INVALID } State;
typedef enum { EV_POWER, EV_START, EV_DONE, EV_FAULT, EV_RESET, EVENT_COUNT } Event;

static const char *const STATE_NAME[STATE_COUNT] = { "OFF", "IDLE", "BUSY", "ERROR" };
static const char *const EVENT_NAME[EVENT_COUNT] = { "power", "start", "done", "fault", "reset" };

static const State next[STATE_COUNT][EVENT_COUNT] = {
    /*            power    start    done     fault    reset   */
    [OFF]   = { IDLE,    INVALID, INVALID, INVALID, INVALID },
    [IDLE]  = { OFF,     BUSY,    INVALID, ERROR,   INVALID },
    [BUSY]  = { INVALID, INVALID, IDLE,    ERROR,   INVALID },
    [ERROR] = { INVALID, INVALID, INVALID, INVALID, OFF     },
};

int main(void) {
    State s = OFF;
    int changes = 0;
    char ev[16];
    while (scanf("%15s", ev) == 1) {
        int e = 0;
        while (e < EVENT_COUNT && strcmp(EVENT_NAME[e], ev) != 0) {
            e++;
        }
        if (e == EVENT_COUNT) {
            printf("ไม่รู้จักเหตุการณ์ %s\n", ev);
            continue;
        }
        State t = next[s][e];
        if (t == INVALID) {
            printf("%s: ไม่รับเหตุการณ์ %s\n", STATE_NAME[s], ev);
            continue;
        }
        printf("%s --%s--> %s\n", STATE_NAME[s], ev, STATE_NAME[t]);
        s = t;
        changes++;
    }
    printf("สถานะสุดท้าย: %s · เปลี่ยนสถานะ %d ครั้ง\n", STATE_NAME[s], changes);
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <string.h>

typedef enum { OFF, IDLE, BUSY, ERROR, STATE_COUNT, INVALID } State;
typedef enum { EV_POWER, EV_START, EV_DONE, EV_FAULT, EV_RESET, EVENT_COUNT } Event;

static const char *const STATE_NAME[STATE_COUNT] = { "OFF", "IDLE", "BUSY", "ERROR" };
static const char *const EVENT_NAME[EVENT_COUNT] = { "power", "start", "done", "fault", "reset" };

static const State next[STATE_COUNT][EVENT_COUNT] = {
    /*            power    start    done     fault    reset   */
    [OFF]   = { IDLE,    INVALID, INVALID, INVALID, INVALID },
    [IDLE]  = { OFF,     BUSY,    INVALID, ERROR,   INVALID },
    [BUSY]  = { OFF    , INVALID, IDLE,    ERROR,   INVALID },
    [ERROR] = { INVALID, INVALID, INVALID, INVALID, OFF     },
};

int main(void) {
    State s = OFF;
    int changes = 0;
    char ev[16];
    while (scanf("%15s", ev) == 1) {
        int e = 0;
        while (e < EVENT_COUNT && strcmp(EVENT_NAME[e], ev) != 0) {
            e++;
        }
        if (e == EVENT_COUNT) {
            printf("ไม่รู้จักเหตุการณ์ %s\n", ev);
            continue;
        }
        State t = next[s][e];
        if (t == INVALID) {
            printf("%s: ไม่รับเหตุการณ์ %s\n", STATE_NAME[s], ev);
            continue;
        }
        printf("%s --%s--> %s\n", STATE_NAME[s], ev, STATE_NAME[t]);
        s = t;
        changes++;
    }
    printf("สถานะสุดท้าย: %s · เปลี่ยนสถานะ %d ครั้ง\n", STATE_NAME[s], changes);
    return 0;
}
`] },
  "c2-systems/5": { sol: R`#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

#define BLOCK_SIZE 32
#define BLOCK_COUNT 8

static unsigned char storage[BLOCK_COUNT][BLOCK_SIZE];
static int nextFree[BLOCK_COUNT];
static bool inUse[BLOCK_COUNT];
static int head = 0;
static int used = 0;

static void pool_init(void) {
    for (int i = 0; i < BLOCK_COUNT; i++) {
        nextFree[i] = i + 1 < BLOCK_COUNT ? i + 1 : -1;
    }
    head = 0;
}

void *pool_alloc(void) {
    if (head < 0) {
        return NULL;
    }
    int i = head;
    head = nextFree[i];
    inUse[i] = true;
    used++;
    return storage[i];
}

int pool_free(void *p) {
    uintptr_t a = (uintptr_t)p, lo = (uintptr_t)&storage[0][0];
    if (a < lo || a >= lo + sizeof storage || (a - lo) % BLOCK_SIZE != 0) {
        return 1;
    }
    int i = (int)((a - lo) / BLOCK_SIZE);
    if (!inUse[i]) {
        return 2;
    }
    inUse[i] = false;
    nextFree[i] = head;
    head = i;
    used--;
    return 0;
}

int pool_used(void) {
    return used;
}

static int blockIndex(const void *p) {
    return (int)(((uintptr_t)p - (uintptr_t)&storage[0][0]) / BLOCK_SIZE);
}

static void report(int r, const char *name) {
    if (r == 0) {
        printf("คืน %s\n", name);
    } else if (r == 1) {
        puts("ไม่ใช่บล็อกของ pool");
    } else {
        puts("free ซ้ำ");
    }
}

int main(void) {
    pool_init();
    void *handles[26] = {0};
    char cmd[16], name[4];
    int local = 0;
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "stats") == 0) {
            printf("ใช้ไป %d/%d\n", pool_used(), BLOCK_COUNT);
            continue;
        }
        if (strcmp(cmd, "freebad") == 0) {
            report(pool_free(&local), "");
            continue;
        }
        if (strcmp(cmd, "freemid") == 0) {
            report(pool_free(&storage[2][5]), "");
            continue;
        }
        if (scanf("%3s", name) != 1 || name[0] < 'A' || name[0] > 'Z' || name[1] != '\0') {
            break;
        }
        void **h = &handles[name[0] - 'A'];
        if (strcmp(cmd, "alloc") == 0) {
            void *p = pool_alloc();
            if (p == NULL) {
                puts("pool เต็ม");
            } else {
                *h = p;
                printf("%s = บล็อก %d\n", name, blockIndex(p));
            }
        } else if (strcmp(cmd, "free") == 0) {
            if (*h == NULL) {
                printf("%s ไม่ได้ถือบล็อก\n", name);
            } else {
                report(pool_free(*h), name);
            }
        }
    }
    return 0;
}
`, wrong: [R`#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

#define BLOCK_SIZE 32
#define BLOCK_COUNT 8

static unsigned char storage[BLOCK_COUNT][BLOCK_SIZE];
static int nextFree[BLOCK_COUNT];
static bool inUse[BLOCK_COUNT];
static int head = 0;
static int used = 0;

static void pool_init(void) {
    for (int i = 0; i < BLOCK_COUNT; i++) {
        nextFree[i] = i + 1 < BLOCK_COUNT ? i + 1 : -1;
    }
    head = 0;
}

void *pool_alloc(void) {
    if (head < 0) {
        return NULL;
    }
    int i = head;
    head = nextFree[i];
    inUse[i] = true;
    used++;
    return storage[i];
}

int pool_free(void *p) {
    uintptr_t a = (uintptr_t)p, lo = (uintptr_t)&storage[0][0];
    if (a < lo || a >= lo + sizeof storage || (a - lo) % BLOCK_SIZE != 0) {
        return 1;
    }
    int i = (int)((a - lo) / BLOCK_SIZE);
    if (!inUse[i]) {
        return 2;
    }
    inUse[i] = false;
    nextFree[i] = -1;
    if (head < 0) {
        head = i;
    } else {
        int t = head;
        while (nextFree[t] >= 0) {
            t = nextFree[t];
        }
        nextFree[t] = i;
    }
    used--;
    return 0;
}

int pool_used(void) {
    return used;
}

static int blockIndex(const void *p) {
    return (int)(((uintptr_t)p - (uintptr_t)&storage[0][0]) / BLOCK_SIZE);
}

static void report(int r, const char *name) {
    if (r == 0) {
        printf("คืน %s\n", name);
    } else if (r == 1) {
        puts("ไม่ใช่บล็อกของ pool");
    } else {
        puts("free ซ้ำ");
    }
}

int main(void) {
    pool_init();
    void *handles[26] = {0};
    char cmd[16], name[4];
    int local = 0;
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "stats") == 0) {
            printf("ใช้ไป %d/%d\n", pool_used(), BLOCK_COUNT);
            continue;
        }
        if (strcmp(cmd, "freebad") == 0) {
            report(pool_free(&local), "");
            continue;
        }
        if (strcmp(cmd, "freemid") == 0) {
            report(pool_free(&storage[2][5]), "");
            continue;
        }
        if (scanf("%3s", name) != 1 || name[0] < 'A' || name[0] > 'Z' || name[1] != '\0') {
            break;
        }
        void **h = &handles[name[0] - 'A'];
        if (strcmp(cmd, "alloc") == 0) {
            void *p = pool_alloc();
            if (p == NULL) {
                puts("pool เต็ม");
            } else {
                *h = p;
                printf("%s = บล็อก %d\n", name, blockIndex(p));
            }
        } else if (strcmp(cmd, "free") == 0) {
            if (*h == NULL) {
                printf("%s ไม่ได้ถือบล็อก\n", name);
            } else {
                report(pool_free(*h), name);
            }
        }
    }
    return 0;
}
`] },

};
