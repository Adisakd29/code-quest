/**
 * c2-fixture.js — หลักสูตรตัวอย่างสำหรับพิสูจน์ pipeline ของ C v2 (ไม่ใช่เนื้อหาจริง ไม่ถูกโหลดในเบราว์เซอร์)
 * รันด้วย: node tests/test-c.js --course=tests/fixtures/c2-fixture.js --sols=tests/fixtures/sols-c2-fixture.js
 */
const V = (i, o) => ({ in: i, out: o });
const H = (i, o, label) => ({ in: i, out: o, hidden: true, label });
const L3 = [{ h: "a", p: "a" }, { h: "b", p: "b" }, { h: "c", p: "c" }];
const hints = ["แนวคิด", "สิ่งที่ควรตรวจ", "โครงสร้าง"];
module.exports = {
  name: "C (fixture)", compiler: "c17",
  prereq: [["\\bmalloc\\s*\\(", 1, "malloc (สอนในบทที่ 2 ของ fixture)"]],
  topics: [
    { id: "c2-fx-basics", title: "พื้นฐาน", lesson: L3, stages: [
      { title: "บวกด้วย scanf", kind: "เขียนโค้ด", desc: "รับจำนวนเต็มสองค่าแล้วแสดงผลบวก", goal: "แสดงผลบวก", xp: 30, hints,
        starter: "#include <stdio.h>\n\nint main(void) {\n    return 0;\n}\n", tests: [V("3 4", "7"), H("-5 2", "-3", "ค่าติดลบ"), H("0 0", "0", "ศูนย์")] },
      { title: "ห้ามมีคำเตือน", kind: "Refactor", desc: "ผลลัพธ์ถูกแต่มีตัวแปรที่ไม่ได้ใช้", goal: "แสดง 42 โดยไม่มีคำเตือน", xp: 40, hints, noWarnings: true,
        starter: "#include <stdio.h>\n\nint main(void) {\n    int unused = 1;\n    printf(\"42\\n\");\n    return 0;\n}\n", tests: [V("", "42")] },
    ] },
    { id: "c2-fx-memory", title: "หน่วยความจำ", lesson: L3, stages: [
      { title: "จองแล้วต้องคืน", kind: "Memory Lab", desc: "จองอาร์เรย์ n ช่อง รวมค่า แล้วคืนหน่วยความจำ", goal: "แสดงผลรวม · ห้ามรั่ว", xp: 60, hints, memcheck: true,
        starter: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 1;\n    int *a = malloc((size_t)n * sizeof *a);\n    if (!a) return 1;\n    long sum = 0;\n    for (int i = 0; i < n; i++) { scanf(\"%d\", &a[i]); sum += a[i]; }\n    printf(\"%ld\\n\", sum);\n    return 0;\n}\n",
        tests: [V("3 1 2 3", "6"), H("1 -5", "-5", "ตัวเดียว"), H("4 0 0 0 0", "0", "ศูนย์ทั้งหมด")] },
      { title: "free ครั้งเดียวพอ", kind: "Memory Lab", desc: "free ซ้ำเป็น undefined behavior", goal: "แสดงข้อความแล้วคืนหน่วยความจำครั้งเดียว", xp: 60, hints, memcheck: true,
        starter: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    char *s = malloc(8);\n    if (!s) return 1;\n    s[0] = 'O'; s[1] = 'K'; s[2] = '\\0';\n    puts(s);\n    free(s);\n    free(s);\n    return 0;\n}\n", tests: [V("", "OK")] },
      { title: "หลายไฟล์ในภาษา C", kind: "Linker Lab", desc: "แยก stats.h / stats.c / main.c", goal: "แสดงค่าเฉลี่ย", xp: 70, hints,
        starter: "// === stats.h ===\n#ifndef STATS_H\n#define STATS_H\ndouble average(const int *a, int n);\n#endif\n\n// === stats.c ===\n#include \"stats.h\"\n\n// === main.c ===\n#include <stdio.h>\n#include \"stats.h\"\n\nint main(void) {\n    int a[] = {1, 2, 4};\n    printf(\"%.2f\\n\", average(a, 3));\n    return 0;\n}\n", tests: [V("", "2.33")] },
    ] },
  ],
};
