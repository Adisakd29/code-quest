/**
 * sols-cpp.js — เฉลยและคำตอบผิดของหลักสูตร C++ (ใช้ตรวจคุณภาพเนื้อหาเท่านั้น ไม่ส่งให้เบราว์เซอร์)
 * key = "<topicId>/<index ของด่านใน stages>"
 *   sol   : เฉลยที่ต้องผ่านทุกกรณีทดสอบ (และทุก require)
 *   wrong : คำตอบผิดที่ต้อง "ไม่ผ่าน" — พิสูจน์ว่า hidden tests / require กันคำตอบตายตัวและความเข้าใจผิดได้จริง
 */
const M = body => "#include <iostream>\n#include <iomanip>\n#include <string>\n\nint main() {\n" + body + "\n    return 0;\n}\n";

module.exports = {
  // ── Stage 1 ──
  "cppintro/0": { sol: M('    std::cout << "สวัสดี C++" << "\\n";'), wrong: [M('    std::cout << "สวัสดี C" << "\\n";')] },
  "cppintro/1": { sol: M('    std::cout << "Code" << "\\n";\n    std::cout << "Quest" << "\\n";\n    std::cout << "C++" << "\\n";'), wrong: [M('    std::cout << "Code" << "Quest" << "C++" << "\\n";')] },
  "cppintro/2": { sol: M('    std::cout << "พร้อมผจญภัย" << "\\n";'), wrong: [M('    std::cout << "พร้อมผจญภัย" << "\\n"')] },
  "cppintro/3": { sol: M('    std::cout << "หุ่นยนต์ตื่นแล้ว" << "\\n";'), wrong: [M('    cout << "หุ่นยนต์ตื่นแล้ว" << "\\n";')] },
  "cppintro/4": { sol: M('    std::cout << "เริ่มภารกิจ" << "\\n";\n    // std::cout << "DEBUG: x = 42" << "\\n";\n    std::cout << "ภารกิจสำเร็จ" << "\\n";'),
                  wrong: [M('    std::cout << "เริ่มภารกิจ" << "\\n";\n    std::cout << "DEBUG: x = 42" << "\\n";\n    std::cout << "ภารกิจสำเร็จ" << "\\n";')] },
  "cppintro/5": { sol: M('    std::cout << "+-----------+" << "\\n";\n    std::cout << "| CodeBot   |" << "\\n";\n    std::cout << "| \\"ready\\"   |" << "\\n";\n    std::cout << "+-----------+" << "\\n";'),
                  wrong: [M('    std::cout << "+-----------+\\n| CodeBot   |\\n| ready     |\\n+-----------+\\n";')] },
  // ── Stage 2 ──
  "cppio/0": { sol: M('    std::string name;\n    std::cin >> name;\n    std::cout << "สวัสดี, " << name << "!\\n";'), wrong: [M('    std::cout << "สวัสดี, มะลิ!\\n";')] },
  "cppio/1": { sol: M('    int a, b;\n    std::cin >> a >> b;\n    std::cout << a + b << "\\n";'), wrong: [M('    std::cout << 7 << "\\n";'), M('    short a, b;\n    std::cin >> a >> b;\n    short s = a + b;\n    std::cout << s << "\\n";')] },
  "cppio/2": { sol: M('    int age;\n    std::cin >> age;\n    std::cout << "อีก 10 ปี คุณจะอายุ " << age + 10 << " ปี\\n";'), wrong: [M('    std::cout << "อีก 10 ปี คุณจะอายุ 25 ปี\\n";')] },
  "cppio/3": { sol: M('    int hp, damage;\n    std::cin >> hp >> damage;\n    std::cout << hp - damage << "\\n";'), wrong: [M('    int hp, damage;\n    std::cin >> damage >> hp;\n    std::cout << hp - damage << "\\n";')] },
  "cppio/4": { sol: M('    std::string name;\n    int level;\n    std::cin >> name >> level;\n    std::cout << "ผู้เล่น: " << name << "\\n";\n    std::cout << "เลเวล: " << level << "\\n";\n    std::cout << "เลเวลถัดไป: " << level + 1 << "\\n";'),
               wrong: [M('    std::string name;\n    int level;\n    std::cin >> name >> level;\n    std::cout << "ผู้เล่น: " << name << "\\n";\n    std::cout << "เลเวล: " << level << "\\n";\n    std::cout << "เลเวลถัดไป: 6\\n";')] },
  "cppio/5": { sol: M('    double price;\n    std::cin >> price;\n    std::cout << "ราคา: " << std::fixed << std::setprecision(2) << price << " บาท\\n";'),
               wrong: [M('    double price;\n    std::cin >> price;\n    std::cout << "ราคา: " << price << " บาท\\n";')] },
  "cppio/6": { sol: M('    std::string name;\n    int score;\n    std::cin >> name >> score;\n    std::cout << "|" << std::left << std::setw(8) << name << "|" << std::right << std::setw(5) << score << "|\\n";'),
               wrong: [M('    std::string name;\n    int score;\n    std::cin >> name >> score;\n    std::cout << "|" << name << "     |   " << score << "|\\n";')] },
  "cppio/7": { sol: M('    double a, b;\n    std::cin >> a >> b;\n    std::cout << std::fixed << std::setprecision(2);\n    std::cout << a << " + " << b << " = " << a + b << "\\n";\n    std::cout << a << " - " << b << " = " << a - b << "\\n";\n    std::cout << a << " * " << b << " = " << a * b << "\\n";'),
               wrong: [M('    int a, b;\n    std::cin >> a >> b;\n    std::cout << std::fixed << std::setprecision(2);\n    std::cout << a << ".00 + " << b << ".00 = " << a + b << ".00\\n";\n    std::cout << a << ".00 - " << b << ".00 = " << a - b << ".00\\n";\n    std::cout << a << ".00 * " << b << ".00 = " << a * b << ".00\\n";')] },
  // ── Stage 3 ──
  "cppvars/0": { sol: M('    char letter;\n    std::cin >> letter;\n    int code = letter;\n    char next = letter + 1;\n    std::cout << "รหัส: " << code << "\\n";\n    std::cout << "ตัวถัดไป: " << next << "\\n";'),
                 wrong: [M('    std::cout << "รหัส: 65\\nตัวถัดไป: B\\n";'), M('    char letter;\n    std::cin >> letter;\n    char next = letter + 1;\n    std::cout << "รหัส: " << letter << "\\n";\n    std::cout << "ตัวถัดไป: " << next << "\\n";')] },
  "cppvars/1": { sol: M('    const double PI = 3.14159;\n    double r;\n    std::cin >> r;\n    std::cout << std::fixed << std::setprecision(2) << PI * r * r << "\\n";'),
                 wrong: [M('    double PI = 3.14159;\n    double r;\n    std::cin >> r;\n    std::cout << std::fixed << std::setprecision(2) << PI * r * r << "\\n";'), M('    const double PI = 3.14159;\n    int r;\n    std::cin >> r;\n    std::cout << std::fixed << std::setprecision(2) << PI * r * r << "\\n";')] },
  "cppvars/2": { sol: M('    std::cout << "char: " << sizeof(char) << "\\n";\n    std::cout << "int: " << sizeof(int) << "\\n";\n    std::cout << "double: " << sizeof(double) << "\\n";\n    std::cout << "bool: " << sizeof(bool) << "\\n";'),
                 wrong: [M('    std::cout << "char: 1\\nint: 4\\ndouble: 8\\nbool: 1\\n";')] },
  "cppvars/3": { sol: M('    std::string first, last;\n    std::cin >> first >> last;\n    std::string fullName = first + " " + last;\n    std::cout << "ชื่อเต็ม: " << fullName << "\\n";'), wrong: [M('    std::string first, last;\n    std::cin >> first >> last;\n    std::cout << "ชื่อเต็ม: " << first + last << "\\n";')] },
  "cppvars/4": { sol: M('    int total{0};\n    int a, b, c;\n    std::cin >> a >> b >> c;\n    total = total + a;\n    total = total + b;\n    total = total + c;\n    std::cout << total << "\\n";'),
                 wrong: [M('    int total;\n    int a, b, c;\n    std::cin >> a >> b >> c;\n    total = a;\n    total = total + b;\n    total = total + c;\n    std::cout << total << "\\n";')] },
  "cppvars/5": { sol: M('    double coins{9.99};\n    std::cout << "เหรียญ: " << coins << "\\n";'), wrong: [M('    int coins{9.99};\n    std::cout << "เหรียญ: " << coins << "\\n";')] },
  "cppvars/6": { sol: M('    int stock, sold;\n    std::cin >> stock >> sold;\n    int left = stock - sold;\n    std::cout << left << "\\n";'), wrong: [M('    unsigned int stock, sold;\n    std::cin >> stock >> sold;\n    unsigned int left = stock - sold;\n    std::cout << left << "\\n";')] },
  "cppvars/7": { sol: M('    std::string name;\n    int age;\n    double height;\n    char house;\n    std::cin >> name >> age >> height >> house;\n    std::cout << "=== บัตรนักผจญภัย ===\\n";\n    std::cout << "ชื่อ: " << name << "\\n";\n    std::cout << "อายุ: " << age << " ปี\\n";\n    std::cout << "ส่วนสูง: " << std::fixed << std::setprecision(2) << height << " ม.\\n";\n    std::cout << "บ้าน: " << house << "\\n";'),
                 wrong: [M('    std::string name;\n    int age;\n    double height;\n    char house;\n    std::cin >> name >> age >> height >> house;\n    std::cout << "=== บัตรนักผจญภัย ===\\n";\n    std::cout << "ชื่อ: " << name << "\\n";\n    std::cout << "อายุ: " << age << " ปี\\n";\n    std::cout << "ส่วนสูง: " << height << " ม.\\n";\n    std::cout << "บ้าน: " << house << "\\n";')] },
  // ── Stage 4 ──
  "cppops/0": { sol: M('    int candies, kids;\n    std::cin >> candies >> kids;\n    std::cout << "คนละ " << candies / kids << " ชิ้น\\n";\n    std::cout << "เหลือ " << candies % kids << " ชิ้น\\n";'), wrong: [M('    std::cout << "คนละ 3 ชิ้น\\nเหลือ 2 ชิ้น\\n";')] },
  "cppops/1": { sol: M('    int total;\n    std::cin >> total;\n    int hours = total / 3600;\n    int minutes = (total % 3600) / 60;\n    int seconds = total % 60;\n    std::cout << hours << " ชั่วโมง " << minutes << " นาที " << seconds << " วินาที\\n";'),
                wrong: [M('    int total;\n    std::cin >> total;\n    std::cout << total / 3600 << " ชั่วโมง " << total / 60 << " นาที " << total % 60 << " วินาที\\n";')] },
  "cppops/2": { sol: M('    int a, b, c;\n    std::cin >> a >> b >> c;\n    double avg = static_cast<double>(a + b + c) / 3;\n    std::cout << std::fixed << std::setprecision(2) << avg << "\\n";'),
                wrong: [M('    int a, b, c;\n    std::cin >> a >> b >> c;\n    double avg = static_cast<double>((a + b + c) / 3);\n    std::cout << std::fixed << std::setprecision(2) << avg << "\\n";')] },
  "cppops/3": { sol: M('    int score;\n    std::cin >> score;\n    score += 10;\n    score *= 2;\n    score -= 5;\n    score++;\n    std::cout << score << "\\n";'), wrong: [M('    int score;\n    std::cin >> score;\n    score += 10;\n    score *= 2;\n    score -= 5;\n    std::cout << score << "\\n";')] },
  "cppops/4": { sol: M('    int a, b;\n    std::cin >> a >> b;\n    std::cout << std::boolalpha;\n    std::cout << "มากกว่า: " << (a > b) << "\\n";\n    std::cout << "เท่ากัน: " << (a == b) << "\\n";\n    std::cout << "ไม่น้อยกว่า: " << (a >= b) << "\\n";'),
                wrong: [M('    int a, b;\n    std::cin >> a >> b;\n    std::cout << std::boolalpha;\n    std::cout << "มากกว่า: " << (a > b) << "\\n";\n    std::cout << "เท่ากัน: " << (a == b) << "\\n";\n    std::cout << "ไม่น้อยกว่า: " << (a > b) << "\\n";')] },
  "cppops/5": { sol: M('    int age, ticket;\n    std::cin >> age >> ticket;\n    std::cout << std::boolalpha;\n    bool canEnter = age >= 12 && ticket == 1;\n    bool discount = age < 12 || age >= 60;\n    std::cout << "เข้าได้: " << canEnter << "\\n";\n    std::cout << "ส่วนลด: " << discount << "\\n";'),
                wrong: [M('    int age, ticket;\n    std::cin >> age >> ticket;\n    std::cout << std::boolalpha;\n    bool canEnter = age > 12 && ticket == 1;\n    bool discount = age < 12 || age > 60;\n    std::cout << "เข้าได้: " << canEnter << "\\n";\n    std::cout << "ส่วนลด: " << discount << "\\n";')] },
  "cppops/6": { sol: M('    int c;\n    std::cin >> c;\n    double f = c * 9.0 / 5 + 32;\n    std::cout << std::fixed << std::setprecision(1) << f << "\\n";'), wrong: [M('    int c;\n    std::cin >> c;\n    double f = c * (9 / 5) + 32;\n    std::cout << std::fixed << std::setprecision(1) << f << "\\n";')] },
  "cppops/7": { sol: M('    const double DISCOUNT_RATE = 0.10;\n    const double VAT_RATE = 0.07;\n    double price;\n    std::cin >> price;\n    double discounted = price - price * DISCOUNT_RATE;\n    double total = discounted + discounted * VAT_RATE;\n    std::cout << std::fixed << std::setprecision(2) << total << "\\n";'),
                wrong: [M('    const double DISCOUNT_RATE = 0.10;\n    const double VAT_RATE = 0.07;\n    double x;\n    std::cin >> x;\n    double y = x - x * 0.10;\n    double z = y + y * 0.07;\n    std::cout << std::fixed << std::setprecision(2) << z << "\\n";'),
                        M('    double x;\n    std::cin >> x;\n    double y = x - x * 0.10;\n    double z = y + y * 0.07;\n    std::cout << std::fixed << std::setprecision(2) << z << "\\n";')] },
  "cppops/8": { sol: M('    int a, b;\n    std::cin >> a >> b;\n    int q = a / b;\n    int r = a % b;\n    std::cout << "หารเอาส่วน: " << q << "\\n";\n    std::cout << "เศษ: " << r << "\\n";\n    std::cout << "หารจริง: " << std::fixed << std::setprecision(2) << static_cast<double>(a) / b << "\\n";\n    std::cout << "ตรวจสอบ: " << q << " × " << b << " + " << r << " = " << q * b + r << "\\n";'),
                wrong: [M('    int a, b;\n    std::cin >> a >> b;\n    int q = a / b;\n    int r = a % b;\n    std::cout << "หารเอาส่วน: " << q << "\\n";\n    std::cout << "เศษ: " << r << "\\n";\n    std::cout << "หารจริง: " << std::fixed << std::setprecision(2) << static_cast<double>(a / b) << "\\n";\n    std::cout << "ตรวจสอบ: " << q << " × " << b << " + " << r << " = " << q * b + r << "\\n";'),
                        // ความเข้าใจผิดที่พบบ่อย: คิดว่าเศษไม่ติดลบเหมือน Python → ผิดเมื่อตัวตั้งติดลบ
                        M('    int a, b;\n    std::cin >> a >> b;\n    int q = a / b;\n    int r = (a % b + b) % b;\n    std::cout << "หารเอาส่วน: " << q << "\\n";\n    std::cout << "เศษ: " << r << "\\n";\n    std::cout << "หารจริง: " << std::fixed << std::setprecision(2) << static_cast<double>(a) / b << "\\n";\n    std::cout << "ตรวจสอบ: " << q << " × " << b << " + " << r << " = " << q * b + r << "\\n";')] },
};

// ═══════════════ Stage 5–7 (Phase 3b ชุดที่ 1) ═══════════════
const R = String.raw;
const F = (pre, body) => "#include <iostream>\n#include <iomanip>\n#include <string>\n\n" + pre + "\n\nint main() {\n" + body + "\n    return 0;\n}\n";
Object.assign(module.exports, {
  // ── Stage 5: เงื่อนไขและ switch ──
  "cppif/0": { sol: M(R`    int score;
    std::cin >> score;
    if (score >= 50) {
        std::cout << "ผ่าน\n";
    } else {
        std::cout << "ไม่ผ่าน\n";
    }`), wrong: [M(R`    int score;
    std::cin >> score;
    if (score > 50) {
        std::cout << "ผ่าน\n";
    } else {
        std::cout << "ไม่ผ่าน\n";
    }`)] },
  "cppif/1": { sol: M(R`    int n;
    std::cin >> n;
    if (n % 2 == 0) {
        std::cout << "คู่\n";
    } else {
        std::cout << "คี่\n";
    }`), wrong: [M(R`    int n;
    std::cin >> n;
    if (n % 2 == 1) {
        std::cout << "คี่\n";
    } else {
        std::cout << "คู่\n";
    }`)] },
  "cppif/2": { sol: M(R`    int score;
    std::cin >> score;
    if (score < 0 || score > 100) {
        std::cout << "คะแนนไม่ถูกต้อง\n";
    } else if (score >= 80) {
        std::cout << "เกรด: A\n";
    } else if (score >= 70) {
        std::cout << "เกรด: B\n";
    } else if (score >= 60) {
        std::cout << "เกรด: C\n";
    } else if (score >= 50) {
        std::cout << "เกรด: D\n";
    } else {
        std::cout << "เกรด: F\n";
    }`), wrong: [M(R`    int score;
    std::cin >> score;
    if (score >= 50) {
        std::cout << "เกรด: D\n";
    } else if (score >= 60) {
        std::cout << "เกรด: C\n";
    } else if (score >= 70) {
        std::cout << "เกรด: B\n";
    } else if (score >= 80) {
        std::cout << "เกรด: A\n";
    } else {
        std::cout << "เกรด: F\n";
    }`), M(R`    int score;
    std::cin >> score;
    if (score >= 80) {
        std::cout << "เกรด: A\n";
    } else if (score >= 70) {
        std::cout << "เกรด: B\n";
    } else if (score >= 60) {
        std::cout << "เกรด: C\n";
    } else if (score >= 50) {
        std::cout << "เกรด: D\n";
    } else {
        std::cout << "เกรด: F\n";
    }`)] },
  "cppif/3": { sol: M(R`    int x;
    std::cin >> x;
    if (x == 0) {
        std::cout << "ศูนย์\n";
    } else {
        std::cout << "ไม่ใช่ศูนย์\n";
    }`), wrong: [M(R`    int x;
    std::cin >> x;
    if (x != 0) {
        std::cout << "ศูนย์\n";
    } else {
        std::cout << "ไม่ใช่ศูนย์\n";
    }`)] },
  "cppif/4": { sol: M(R`    int choice;
    std::cin >> choice;
    switch (choice) {
        case 1:
            std::cout << "เริ่มเกม\n";
            break;
        case 2:
            std::cout << "ตั้งค่า\n";
            break;
        case 3:
            std::cout << "ออกจากเกม\n";
            break;
        default:
            std::cout << "ไม่มีเมนูนี้\n";
    }`), wrong: [M(R`    int choice;
    std::cin >> choice;
    switch (choice) {
        case 1:
            std::cout << "เริ่มเกม\n";
        case 2:
            std::cout << "ตั้งค่า\n";
            break;
        case 3:
            std::cout << "ออกจากเกม\n";
            break;
        default:
            std::cout << "ไม่มีเมนูนี้\n";
    }`)] },
  "cppif/5": { sol: M(R`    int day;
    std::cin >> day;
    switch (day) {
        case 6:
        case 7:
            std::cout << "วันหยุด\n";
            break;
        case 1: case 2: case 3: case 4: case 5:
            std::cout << "วันทำงาน\n";
            break;
        default:
            std::cout << "ไม่มีวันนี้\n";
    }`), wrong: [M(R`    int day;
    std::cin >> day;
    switch (day) {
        case 6:
            std::cout << "วันหยุด\n";
            break;
        case 1: case 2: case 3: case 4: case 5: case 7:
            std::cout << "วันทำงาน\n";
            break;
        default:
            std::cout << "ไม่มีวันนี้\n";
    }`)] },
  "cppif/6": { sol: M(R`    int score, attendance;
    std::cin >> score >> attendance;
    if (score < 0 || score > 100) {
        std::cout << "คะแนนไม่ถูกต้อง\n";
    } else if (attendance < 80) {
        std::cout << "เกรด: F (เวลาเรียนไม่ครบ)\n";
    } else if (score >= 80) {
        std::cout << "เกรด: A (4.0)\n";
    } else if (score >= 75) {
        std::cout << "เกรด: B+ (3.5)\n";
    } else if (score >= 70) {
        std::cout << "เกรด: B (3.0)\n";
    } else if (score >= 65) {
        std::cout << "เกรด: C+ (2.5)\n";
    } else if (score >= 60) {
        std::cout << "เกรด: C (2.0)\n";
    } else if (score >= 55) {
        std::cout << "เกรด: D+ (1.5)\n";
    } else if (score >= 50) {
        std::cout << "เกรด: D (1.0)\n";
    } else {
        std::cout << "เกรด: F (0.0)\n";
    }`), wrong: [M(R`    int score, attendance;
    std::cin >> score >> attendance;
    if (attendance < 80) {
        std::cout << "เกรด: F (เวลาเรียนไม่ครบ)\n";
    } else if (score < 0 || score > 100) {
        std::cout << "คะแนนไม่ถูกต้อง\n";
    } else if (score >= 80) {
        std::cout << "เกรด: A (4.0)\n";
    } else if (score >= 75) {
        std::cout << "เกรด: B+ (3.5)\n";
    } else if (score >= 70) {
        std::cout << "เกรด: B (3.0)\n";
    } else if (score >= 65) {
        std::cout << "เกรด: C+ (2.5)\n";
    } else if (score >= 60) {
        std::cout << "เกรด: C (2.0)\n";
    } else if (score >= 55) {
        std::cout << "เกรด: D+ (1.5)\n";
    } else if (score >= 50) {
        std::cout << "เกรด: D (1.0)\n";
    } else {
        std::cout << "เกรด: F (0.0)\n";
    }`), M(R`    int score, attendance;
    std::cin >> score >> attendance;
    if (score < 0 || score > 100) {
        std::cout << "คะแนนไม่ถูกต้อง\n";
    } else if (attendance <= 80) {
        std::cout << "เกรด: F (เวลาเรียนไม่ครบ)\n";
    } else if (score >= 80) {
        std::cout << "เกรด: A (4.0)\n";
    } else if (score >= 75) {
        std::cout << "เกรด: B+ (3.5)\n";
    } else if (score >= 70) {
        std::cout << "เกรด: B (3.0)\n";
    } else if (score >= 65) {
        std::cout << "เกรด: C+ (2.5)\n";
    } else if (score >= 60) {
        std::cout << "เกรด: C (2.0)\n";
    } else if (score >= 55) {
        std::cout << "เกรด: D+ (1.5)\n";
    } else if (score >= 50) {
        std::cout << "เกรด: D (1.0)\n";
    } else {
        std::cout << "เกรด: F (0.0)\n";
    }`)] },
  // ── Stage 6: ลูป ──
  "cpploop/0": { sol: M(R`    int n;
    std::cin >> n;
    for (int i = n; i >= 1; i--) {
        std::cout << i << "\n";
    }
    std::cout << "ปล่อยจรวด!\n";`), wrong: [M(R`    int n;
    std::cin >> n;
    for (int i = n; i > 1; i--) {
        std::cout << i << "\n";
    }
    std::cout << "ปล่อยจรวด!\n";`)] },
  "cpploop/1": { sol: M(R`    int n;
    std::cin >> n;
    int sum{0};
    int i{1};
    while (i <= n) {
        sum += i;
        i++;
    }
    std::cout << "ผลรวม 1 ถึง " << n << " = " << sum << "\n";`), wrong: [M(R`    int n;
    std::cin >> n;
    int sum{0};
    int i{1};
    while (i < n) {
        sum += i;
        i++;
    }
    std::cout << "ผลรวม 1 ถึง " << n << " = " << sum << "\n";`)] },
  "cpploop/2": { sol: M(R`    int n;
    std::cin >> n;
    for (int i = 1; i <= 12; i++) {
        std::cout << n << " x " << i << " = " << n * i << "\n";
    }`), wrong: [M(R`    int n;
    std::cin >> n;
    for (int i = 1; i < 12; i++) {
        std::cout << n << " x " << i << " = " << n * i << "\n";
    }`)] },
  "cpploop/3": { sol: M(R`    int n;
    std::cin >> n;
    int sum{0};
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        sum += x;
    }
    std::cout << std::fixed << std::setprecision(2) << static_cast<double>(sum) / n << "\n";`), wrong: [M(R`    int n;
    std::cin >> n;
    int sum{0};
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        sum += x;
    }
    std::cout << std::fixed << std::setprecision(2) << static_cast<double>(sum / n) << "\n";`)] },
  "cpploop/4": { sol: M(R`    int n;
    std::cin >> n;
    long long sum{0};
    for (int i = 0; i < n; i++) {
        int amount;
        std::cin >> amount;
        sum += amount;
    }
    std::cout << sum << "\n";`), wrong: [M(R`    int n;
    std::cin >> n;
    long long sum{0};
    for (int i = 0; i < n; i++) {
        int amount;
        std::cin >> amount;
        sum = sum + static_cast<int>(sum + amount) - sum;
    }
    std::cout << sum << "\n";`)] },
  "cpploop/5": { sol: M(R`    int n;
    std::cin >> n;
    for (int row = 1; row <= n; row++) {
        for (int k = 0; k < row; k++) {
            std::cout << "*";
        }
        std::cout << "\n";
    }`), wrong: [M(R`    int n;
    std::cin >> n;
    for (int row = 1; row <= n; row++) {
        for (int k = 0; k <= row; k++) {
            std::cout << "*";
        }
        std::cout << "\n";
    }`)] },
  "cpploop/6": { sol: M(R`    int sum{0}, skipped{0};
    while (true) {
        int x;
        std::cin >> x;
        if (x == 0) break;
        if (x < 0) {
            skipped++;
            continue;
        }
        sum += x;
    }
    std::cout << "ผลรวมเลขบวก: " << sum << "\n";
    std::cout << "จำนวนที่ข้าม: " << skipped << "\n";`), wrong: [M(R`    int sum{0}, skipped{0};
    while (true) {
        int x;
        std::cin >> x;
        if (x < 0) {
            skipped++;
            continue;
        }
        sum += x;
        if (x == 0) break;
        if (sum > 1000000) break;
    }
    std::cout << "ผลรวมเลขบวก: " << sum + 0 * skipped << "\n";
    std::cout << "จำนวนที่ข้าม: " << skipped + 1 << "\n";`)] },
  "cpploop/7": { sol: M(R`    int secret;
    std::cin >> secret;
    int tries{0};
    int guess;
    do {
        std::cin >> guess;
        tries++;
        if (guess > secret) {
            std::cout << "สูงไป\n";
        } else if (guess < secret) {
            std::cout << "ต่ำไป\n";
        } else {
            std::cout << "ถูกต้อง!\n";
        }
    } while (guess != secret);
    std::cout << "ทายถูกใน " << tries << " ครั้ง\n";`), wrong: [M(R`    int secret;
    std::cin >> secret;
    int tries{0};
    int guess;
    do {
        std::cin >> guess;
        if (guess > secret) {
            std::cout << "สูงไป\n";
        } else if (guess < secret) {
            std::cout << "ต่ำไป\n";
            tries++;
        } else {
            std::cout << "ถูกต้อง!\n";
        }
    } while (guess != secret);
    std::cout << "ทายถูกใน " << tries + 1 << " ครั้ง\n";`)] },
  "cpploop/8": { sol: M(R`    int secret;
    std::cin >> secret;
    int tries{0};
    bool won{false};
    while (tries < 5) {
        int guess;
        std::cin >> guess;
        if (guess < 1 || guess > 100) {
            std::cout << "นอกช่วง 1-100\n";
            continue;
        }
        tries++;
        if (guess == secret) {
            std::cout << "ถูกต้อง!\n";
            won = true;
            break;
        } else if (guess > secret) {
            std::cout << "สูงไป\n";
        } else {
            std::cout << "ต่ำไป\n";
        }
    }
    if (won) {
        std::cout << "ทายถูกใน " << tries << " ครั้ง\n";
    } else {
        std::cout << "แพ้แล้ว! เลขคือ " << secret << "\n";
    }`), wrong: [M(R`    int secret;
    std::cin >> secret;
    int tries{0};
    bool won{false};
    while (tries < 5) {
        int guess;
        std::cin >> guess;
        tries++;
        if (guess < 1 || guess > 100) {
            std::cout << "นอกช่วง 1-100\n";
            continue;
        }
        if (guess == secret) {
            std::cout << "ถูกต้อง!\n";
            won = true;
            break;
        } else if (guess > secret) {
            std::cout << "สูงไป\n";
        } else {
            std::cout << "ต่ำไป\n";
        }
    }
    if (won) {
        std::cout << "ทายถูกใน " << tries << " ครั้ง\n";
    } else {
        std::cout << "แพ้แล้ว! เลขคือ " << secret << "\n";
    }`), M(R`    int secret;
    std::cin >> secret;
    int tries{0};
    bool won{false};
    while (tries < 4) {
        int guess;
        std::cin >> guess;
        if (guess < 1 || guess > 100) {
            std::cout << "นอกช่วง 1-100\n";
            continue;
        }
        tries++;
        if (guess == secret) {
            std::cout << "ถูกต้อง!\n";
            won = true;
            break;
        } else if (guess > secret) {
            std::cout << "สูงไป\n";
        } else {
            std::cout << "ต่ำไป\n";
        }
    }
    if (won) {
        std::cout << "ทายถูกใน " << tries << " ครั้ง\n";
    } else {
        std::cout << "แพ้แล้ว! เลขคือ " << secret << "\n";
    }`)] },
  // ── Stage 7: ฟังก์ชันและขอบเขต ──
  "cppfunc/0": { sol: F(R`int square(int x) {
    return x * x;
}`, R`    int n;
    std::cin >> n;
    std::cout << square(n) << "\n";`), wrong: [F(R`int square(int x) {
    return x * 2;
}`, R`    int n;
    std::cin >> n;
    std::cout << square(n) << "\n";`)] },
  "cppfunc/1": { sol: F(R`int max3(int a, int b, int c) {
    int best = a;
    if (b > best) best = b;
    if (c > best) best = c;
    return best;
}`, R`    int a, b, c;
    std::cin >> a >> b >> c;
    std::cout << "มากที่สุด: " << max3(a, b, c) << "\n";`), wrong: [F(R`int max3(int a, int b, int c) {
    int best = 0;
    if (a > best) best = a;
    if (b > best) best = b;
    if (c > best) best = c;
    return best;
}`, R`    int a, b, c;
    std::cin >> a >> b >> c;
    std::cout << "มากที่สุด: " << max3(a, b, c) << "\n";`), F(R`int max3(int a, int b, int c) {
    if (a > b && a > c) return a;
    if (b > a && b > c) return b;
    return c;
}`, R`    int a, b, c;
    std::cin >> a >> b >> c;
    std::cout << "มากที่สุด: " << max3(a, b, c) << "\n";`)] },
  "cppfunc/2": { sol: F(R`int sign(int x) {
    if (x > 0) {
        return 1;
    } else if (x < 0) {
        return -1;
    }
    return 0;
}`, R`    int x;
    std::cin >> x;
    std::cout << sign(x) << "\n";`), wrong: [F(R`int sign(int x) {
    if (x >= 0) {
        return 1;
    }
    return -1;
}`, R`    int x;
    std::cin >> x;
    std::cout << sign(x) << "\n";`)] },
  "cppfunc/3": { sol: F(R`bool isPrime(int n) {
    if (n < 2) return false;
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}`, R`    int n;
    std::cin >> n;
    if (isPrime(n)) {
        std::cout << "เป็นจำนวนเฉพาะ\n";
    } else {
        std::cout << "ไม่ใช่จำนวนเฉพาะ\n";
    }`), wrong: [F(R`bool isPrime(int n) {
    for (int d = 2; d < n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}`, R`    int n;
    std::cin >> n;
    if (isPrime(n)) {
        std::cout << "เป็นจำนวนเฉพาะ\n";
    } else {
        std::cout << "ไม่ใช่จำนวนเฉพาะ\n";
    }`), F(R`bool isPrime(int n) {
    if (n < 2) return false;
    for (int d = 2; d * d < n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}`, R`    int n;
    std::cin >> n;
    if (isPrime(n)) {
        std::cout << "เป็นจำนวนเฉพาะ\n";
    } else {
        std::cout << "ไม่ใช่จำนวนเฉพาะ\n";
    }`)] },
  "cppfunc/4": { sol: "#include <iostream>\n#include <string>\n\nvoid greet(std::string name);\n\nint main() {\n    std::string name;\n    std::cin >> name;\n    greet(name);\n    return 0;\n}\n\nvoid greet(std::string name) {\n    std::cout << \"สวัสดี, \" << name << \"! พร้อมผจญภัยหรือยัง?\\n\";\n}\n",
                 wrong: ["#include <iostream>\n#include <string>\n\nint main() {\n    std::string name;\n    std::cin >> name;\n    greet(name);\n    return 0;\n}\n\nvoid greet(std::string name) {\n    std::cout << \"สวัสดี, \" << name << \"! พร้อมผจญภัยหรือยัง?\\n\";\n}\n"] },
  "cppfunc/5": { sol: F(R`int nextTicket() {
    static int counter{0};
    counter++;
    return counter;
}`, R`    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cout << "คิวที่ " << nextTicket() << "\n";
    }`), wrong: [F(R`int nextTicket() {
    int counter{0};
    counter++;
    return counter;
}`, R`    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cout << "คิวที่ " << nextTicket() << "\n";
    }`)] },
  "cppfunc/6": { sol: F(R`int addScore(int total, int score) {
    return total + score;
}`, R`    int n;
    std::cin >> n;
    int total{0};
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        total = addScore(total, s);
    }
    std::cout << "รวม: " << total << "\n";`), wrong: [F(R`int total = 0;

int addScore(int t, int score) {
    total = t + score;
    return total;
}`, R`    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        addScore(total, s);
    }
    std::cout << "รวม: " << total << "\n";`), F(R`int addScore(int total, int score) {
    return total + score;
}`, R`    int n;
    std::cin >> n;
    int total{0};
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        addScore(total, s);
    }
    std::cout << "รวม: " << total << "\n";`)] },
  "cppfunc/7": { sol: F(R`double celsiusToF(double c) {
    return c * 9 / 5 + 32;
}

double kmToMiles(double km) {
    return km * 0.621371;
}

double kgToPounds(double kg) {
    return kg * 2.20462;
}`, R`    int k;
    std::cin >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char unit;
        double v;
        std::cin >> unit >> v;
        switch (unit) {
            case 'c':
                std::cout << v << " C = " << celsiusToF(v) << " F\n";
                break;
            case 'k':
                std::cout << v << " km = " << kmToMiles(v) << " mi\n";
                break;
            case 'w':
                std::cout << v << " kg = " << kgToPounds(v) << " lb\n";
                break;
            default:
                std::cout << "ไม่รู้จักหน่วย " << unit << "\n";
        }
    }`), wrong: [F(R`double celsiusToF(double c) {
    return c * (9 / 5) + 32;
}

double kmToMiles(double km) {
    return km * 0.621371;
}

double kgToPounds(double kg) {
    return kg * 2.20462;
}`, R`    int k;
    std::cin >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char unit;
        double v;
        std::cin >> unit >> v;
        switch (unit) {
            case 'c':
                std::cout << v << " C = " << celsiusToF(v) << " F\n";
                break;
            case 'k':
                std::cout << v << " km = " << kmToMiles(v) << " mi\n";
                break;
            case 'w':
                std::cout << v << " kg = " << kgToPounds(v) << " lb\n";
                break;
            default:
                std::cout << "ไม่รู้จักหน่วย " << unit << "\n";
        }
    }`)] },
});

// ═══════════════ Stage 8–10 (Phase 3b ชุดที่ 2) ═══════════════
const ATM2 = R`void deposit(double& balance, double amount) {
    balance += amount;
}

bool withdraw(double& balance, double amount) {
    if (amount > balance) return false;
    balance -= amount;
    return true;
}`;
const ATM2_MAIN = (guard) => R`    int cardPin;
    std::cin >> cardPin;
    std::cout << std::fixed << std::setprecision(2);
    bool ok{false};
    for (int left = 2; left >= 0; left--) {
        int pin;
        std::cin >> pin;
        if (pin == cardPin) {
            ok = true;
            break;
        }
        std::cout << "PIN ไม่ถูกต้อง (เหลือ " << left << " ครั้ง)\n";
    }
    if (!ok) {
        std::cout << "บัตรถูกระงับ\n";
        return 0;
    }
    std::cout << "เข้าสู่ระบบสำเร็จ\n";
    double balance;
    std::cin >> balance;
    while (true) {
        char cmd;
        std::cin >> cmd;
        if (cmd == 'q') {
            std::cout << "ขอบคุณที่ใช้บริการ\n";
            break;
        }
        if (cmd == 'b') {
            std::cout << "คงเหลือ " << balance << "\n";
            continue;
        }
        double amount;
        std::cin >> amount;
        if (` + guard + R`) {
            std::cout << "จำนวนเงินไม่ถูกต้อง\n";
            continue;
        }
        if (cmd == 'd') {
            deposit(balance, amount);
            std::cout << "ฝาก " << amount << " คงเหลือ " << balance << "\n";
        } else if (withdraw(balance, amount)) {
            std::cout << "ถอน " << amount << " คงเหลือ " << balance << "\n";
        } else {
            std::cout << "ยอดเงินไม่พอ (คงเหลือ " << balance << ")\n";
        }
    }`;
const TTT_WIN = R`char winner(char b[3][3]) {
    for (int i = 0; i < 3; i++) {
        if (b[i][0] != '.' && b[i][0] == b[i][1] && b[i][1] == b[i][2]) return b[i][0];
        if (b[0][i] != '.' && b[0][i] == b[1][i] && b[1][i] == b[2][i]) return b[0][i];
    }
    if (b[1][1] != '.' && b[0][0] == b[1][1] && b[1][1] == b[2][2]) return b[1][1];
    if (b[1][1] != '.' && b[0][2] == b[1][1] && b[1][1] == b[2][0]) return b[1][1];
    return '.';
}`;
const TTT2_MAIN = (check) => R`    char board[3][3];
    for (int r = 0; r < 3; r++)
        for (int c = 0; c < 3; c++)
            board[r][c] = '.';
    int k;
    std::cin >> k;
    char player = 'X';
    int placed{0};
    char result = '.';
    for (int i = 0; i < k; i++) {
        int r, c;
        std::cin >> r >> c;
        if (` + check + R`) {
            std::cout << "ช่องนี้ใช้ไม่ได้\n";
            continue;
        }
        board[r - 1][c - 1] = player;
        placed++;
        result = winner(board);
        if (result != '.' || placed == 9) break;
        player = (player == 'X') ? 'O' : 'X';
    }
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) std::cout << board[r][c];
        std::cout << "\n";
    }
    if (result != '.') {
        std::cout << result << " ชนะ\n";
    } else if (placed == 9) {
        std::cout << "เสมอ\n";
    } else {
        std::cout << "ยังเล่นไม่จบ\n";
    }`;
const TEXT2 = (cmp, tieOp) => R`int main() {
    std::string line;
    int lines{0}, words{0};
    std::string longest;
    int freq[26]{};
    while (std::getline(std::cin, line) && line != "END") {
        lines++;
        std::string word;
        for (std::size_t i = 0; i <= line.size(); i++) {
            unsigned char ch = i < line.size() ? static_cast<unsigned char>(line[i]) : ' ';
            if (std::isalpha(ch)) {
                word += static_cast<char>(ch);
                freq[std::tolower(ch) - 'a']++;
            } else if (!word.empty()) {
                words++;
                if (word.size() ` + cmp + R` longest.size()) longest = word;
                word.clear();
            }
        }
    }
    int best = -1;
    for (int c = 0; c < 26; c++) {
        if (freq[c] > 0 && (best == -1 || freq[c] ` + tieOp + R` freq[best])) best = c;
    }
    std::cout << "บรรทัด: " << lines << "\n";
    std::cout << "คำทั้งหมด: " << words << "\n";
    std::cout << "คำที่ยาวที่สุด: " << (longest.empty() ? "-" : longest) << "\n";
    if (best == -1) {
        std::cout << "ตัวอักษรที่พบบ่อยที่สุด: -\n";
    } else {
        std::cout << "ตัวอักษรที่พบบ่อยที่สุด: " << static_cast<char>('a' + best) << " (" << freq[best] << " ครั้ง)\n";
    }
    return 0;
}
`;
const STR = "#include <iostream>\n#include <string>\n#include <cctype>\n\n";
Object.assign(module.exports, {
  // ── Stage 8 ──
  "cppref/0": { sol: F(R`void swapValues(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}`, R`    int a, b;
    std::cin >> a >> b;
    swapValues(a, b);
    std::cout << "a=" << a << " b=" << b << "\n";`), wrong: [F(R`void swapValues(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}`, R`    int a, b;
    std::cin >> a >> b;
    swapValues(a, b);
    std::cout << "a=" << a << " b=" << b << "\n";`), F(R`void swapValues(int& a, int& b) {
    a = b;
    b = a;
}`, R`    int a, b;
    std::cin >> a >> b;
    swapValues(a, b);
    std::cout << "a=" << a << " b=" << b << "\n";`)] },
  "cppref/1": { sol: F(R`void doubleScore(int& score) {
    score *= 2;
}`, R`    int score;
    std::cin >> score;
    doubleScore(score);
    std::cout << "คะแนนใหม่: " << score << "\n";`), wrong: [F(R`void doubleScore(int& score) {
    score += 2;
}`, R`    int score;
    std::cin >> score;
    doubleScore(score);
    std::cout << "คะแนนใหม่: " << score << "\n";`)] },
  "cppref/2": { sol: F(R`const double PI = 3.14159;

double area(double r) {
    return PI * r * r;
}

double area(double w, double h) {
    return w * h;
}`, R`    char shape;
    std::cin >> shape;
    std::cout << std::fixed << std::setprecision(2);
    if (shape == 'c') {
        double r;
        std::cin >> r;
        std::cout << "พื้นที่: " << area(r) << "\n";
    } else {
        double w, h;
        std::cin >> w >> h;
        std::cout << "พื้นที่: " << area(w, h) << "\n";
    }`), wrong: [F(R`const double PI = 3.14159;

double area(double r) {
    return PI * r * r;
}

double area(double w, double h) {
    return w * w + h * 0;
}`, R`    char shape;
    std::cin >> shape;
    std::cout << std::fixed << std::setprecision(2);
    if (shape == 'c') {
        double r;
        std::cin >> r;
        std::cout << "พื้นที่: " << area(r) << "\n";
    } else {
        double w, h;
        std::cin >> w >> h;
        std::cout << "พื้นที่: " << area(w, h) << "\n";
    }`)] },
  "cppref/3": { sol: F(R`double finalPrice(double base, double discount = 0.0) {
    return base - base * discount;
}`, R`    double base;
    std::cin >> base;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "ราคาปกติ: " << finalPrice(base) << "\n";
    std::cout << "ราคาลด 20%: " << finalPrice(base, 0.2) << "\n";`), wrong: [F(R`double finalPrice(double base, double discount = 0.2) {
    return base - base * discount;
}`, R`    double base;
    std::cin >> base;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "ราคาปกติ: " << finalPrice(base) << "\n";
    std::cout << "ราคาลด 20%: " << finalPrice(base, 0.2) << "\n";`)] },
  "cppref/4": { sol: F(R`void printCard(const std::string& name, int level) {
    std::cout << "[ " << name << " | LV." << level << " ]\n";
}`, R`    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string name;
        int level;
        std::cin >> name >> level;
        printCard(name, level);
    }`), wrong: [F(R`void printCard(std::string name, int level) {
    std::cout << "[ " << name << " | LV." << level << " ]\n";
}`, R`    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string name;
        int level;
        std::cin >> name >> level;
        printCard(name, level);
    }`)] },
  "cppref/5": { sol: F(ATM2, R`    double balance;
    int k;
    std::cin >> balance >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char op;
        double amount;
        std::cin >> op >> amount;
        if (op == 'd') {
            deposit(balance, amount);
            std::cout << "ฝาก " << amount << " คงเหลือ " << balance << "\n";
        } else if (withdraw(balance, amount)) {
            std::cout << "ถอน " << amount << " คงเหลือ " << balance << "\n";
        } else {
            std::cout << "ยอดเงินไม่พอ (คงเหลือ " << balance << ")\n";
        }
    }`), wrong: [F(R`void deposit(double& balance, double amount) {
    balance += amount;
}

bool withdraw(double& balance, double amount) {
    if (amount >= balance) return false;
    balance -= amount;
    return true;
}`, R`    double balance;
    int k;
    std::cin >> balance >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char op;
        double amount;
        std::cin >> op >> amount;
        if (op == 'd') {
            deposit(balance, amount);
            std::cout << "ฝาก " << amount << " คงเหลือ " << balance << "\n";
        } else if (withdraw(balance, amount)) {
            std::cout << "ถอน " << amount << " คงเหลือ " << balance << "\n";
        } else {
            std::cout << "ยอดเงินไม่พอ (คงเหลือ " << balance << ")\n";
        }
    }`)] },
  "cppref/6": { sol: F(ATM2, ATM2_MAIN("amount <= 0")), wrong: [F(ATM2, ATM2_MAIN("amount < 0"))] },
  // ── Stage 9 ──
  "cpparr/0": { sol: M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    for (int i = n - 1; i >= 0; i--) std::cout << a[i] << " ";
    std::cout << "\n";`), wrong: [M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    for (int i = n - 1; i > 0; i--) std::cout << a[i] << " ";
    std::cout << "\n";`)] },
  "cpparr/1": { sol: M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[best]) best = i;
    }
    std::cout << "ค่ามากที่สุด: " << a[best] << " (ตำแหน่งที่ " << best + 1 << ")\n";`), wrong: [M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] >= a[best]) best = i;
    }
    std::cout << "ค่ามากที่สุด: " << a[best] << " (ตำแหน่งที่ " << best + 1 << ")\n";`), M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    int best = 0, pos = 0;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
        if (a[i] > best) { best = a[i]; pos = i; }
    }
    std::cout << "ค่ามากที่สุด: " << best << " (ตำแหน่งที่ " << pos + 1 << ")\n";`)] },
  "cpparr/2": { sol: M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    int sum{0};
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    std::cout << "ผลรวม: " << sum << "\n";`), wrong: [M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    int sum{0};
    for (int i = 1; i < n; i++) {
        sum += a[i];
    }
    std::cout << "ผลรวม: " << sum << "\n";`)] },
  "cpparr/3": { sol: M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    int target;
    std::cin >> target;
    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (a[i] == target) {
            pos = i + 1;
            break;
        }
    }
    if (pos == -1) {
        std::cout << "ไม่พบ\n";
    } else {
        std::cout << "พบที่ตำแหน่ง " << pos << "\n";
    }`), wrong: [M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    int target;
    std::cin >> target;
    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (a[i] == target) {
            pos = i + 1;
        }
    }
    if (pos == -1) {
        std::cout << "ไม่พบ\n";
    } else {
        std::cout << "พบที่ตำแหน่ง " << pos << "\n";
    }`)] },
  "cpparr/4": { sol: M(R`    int n;
    std::cin >> n;
    int count[11]{};
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        count[s]++;
    }
    for (int k = 0; k <= 10; k++) {
        if (count[k] > 0) std::cout << "คะแนน " << k << ": " << count[k] << " คน\n";
    }`), wrong: [M(R`    int n;
    std::cin >> n;
    int count[11]{};
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        count[s]++;
    }
    for (int k = 1; k <= 10; k++) {
        if (count[k] > 0) std::cout << "คะแนน " << k << ": " << count[k] << " คน\n";
    }`), M(R`    int n;
    std::cin >> n;
    int count[11]{};
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        count[s]++;
    }
    for (int k = 0; k < 10; k++) {
        if (count[k] > 0) std::cout << "คะแนน " << k << ": " << count[k] << " คน\n";
    }`)] },
  "cpparr/5": { sol: F(TTT_WIN, R`    char board[3][3];
    for (int r = 0; r < 3; r++)
        for (int c = 0; c < 3; c++)
            std::cin >> board[r][c];
    char w = winner(board);
    if (w == '.') {
        std::cout << "ยังไม่มีผู้ชนะ\n";
    } else {
        std::cout << w << " ชนะ\n";
    }`), wrong: [F(R`char winner(char b[3][3]) {
    for (int i = 0; i < 3; i++) {
        if (b[i][0] != '.' && b[i][0] == b[i][1] && b[i][1] == b[i][2]) return b[i][0];
        if (b[0][i] != '.' && b[0][i] == b[1][i] && b[1][i] == b[2][i]) return b[0][i];
    }
    if (b[1][1] != '.' && b[0][0] == b[1][1] && b[1][1] == b[2][2]) return b[1][1];
    return '.';
}`, R`    char board[3][3];
    for (int r = 0; r < 3; r++)
        for (int c = 0; c < 3; c++)
            std::cin >> board[r][c];
    char w = winner(board);
    if (w == '.') {
        std::cout << "ยังไม่มีผู้ชนะ\n";
    } else {
        std::cout << w << " ชนะ\n";
    }`)] },
  "cpparr/6": { sol: F(TTT_WIN, TTT2_MAIN("r < 1 || r > 3 || c < 1 || c > 3 || board[r - 1][c - 1] != '.'")),
                wrong: [F(TTT_WIN, TTT2_MAIN("r < 1 || r > 3 || c < 1 || c > 3")), F(TTT_WIN, TTT2_MAIN("r < 1 || r > 3 || c < 1 || c > 3 || board[r - 1][c - 1] == 'X'"))] },
  // ── Stage 10 ──
  "cppstr/0": { sol: STR + "int main() {\n    std::string name;\n    std::getline(std::cin, name);\n    std::cout << \"สวัสดี, \" << name << \"!\\n\";\n    return 0;\n}\n",
                wrong: [STR + "int main() {\n    std::string name;\n    std::cin >> name;\n    std::cout << \"สวัสดี, \" << name << \"!\\n\";\n    return 0;\n}\n"] },
  "cppstr/1": { sol: STR + R`int main() {
    std::string line;
    std::getline(std::cin, line);
    int count{0};
    for (std::size_t i = 0; i < line.size(); i++) {
        char ch = static_cast<char>(std::tolower(static_cast<unsigned char>(line[i])));
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') count++;
    }
    std::cout << "สระ: " << count << "\n";
    return 0;
}
`, wrong: [STR + R`int main() {
    std::string line;
    std::getline(std::cin, line);
    int count{0};
    for (std::size_t i = 0; i < line.size(); i++) {
        char ch = line[i];
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') count++;
    }
    std::cout << "สระ: " << count << "\n";
    return 0;
}
`] },
  "cppstr/2": { sol: STR + "int main() {\n    int age;\n    std::cin >> age;\n    std::string name;\n    std::getline(std::cin >> std::ws, name);\n    std::cout << name << \" (\" << age << \" ปี)\\n\";\n    return 0;\n}\n",
                wrong: [STR + "int main() {\n    int age;\n    std::cin >> age;\n    std::string name;\n    std::cin >> name;\n    std::cout << name << \" (\" << age << \" ปี)\\n\";\n    return 0;\n}\n"] },
  "cppstr/3": { sol: STR + R`int main() {
    std::string email;
    std::cin >> email;
    std::size_t at = email.find('@');
    if (at == std::string::npos || at == 0 || at == email.size() - 1) {
        std::cout << "อีเมลไม่ถูกต้อง\n";
    } else {
        std::cout << "ชื่อผู้ใช้: " << email.substr(0, at) << "\n";
        std::cout << "โดเมน: " << email.substr(at + 1) << "\n";
    }
    return 0;
}
`, wrong: [STR + R`int main() {
    std::string email;
    std::cin >> email;
    std::size_t at = email.find('@');
    if (at == std::string::npos) {
        std::cout << "อีเมลไม่ถูกต้อง\n";
    } else {
        std::cout << "ชื่อผู้ใช้: " << email.substr(0, at) << "\n";
        std::cout << "โดเมน: " << email.substr(at + 1) << "\n";
    }
    return 0;
}
`] },
  "cppstr/4": { sol: STR + R`int main() {
    std::string line;
    std::getline(std::cin, line);
    std::string clean;
    for (std::size_t i = 0; i < line.size(); i++) {
        unsigned char ch = static_cast<unsigned char>(line[i]);
        if (std::isalnum(ch)) clean += static_cast<char>(std::tolower(ch));
    }
    bool ok{true};
    for (std::size_t i = 0; i < clean.size() / 2; i++) {
        if (clean[i] != clean[clean.size() - 1 - i]) {
            ok = false;
            break;
        }
    }
    std::cout << (ok ? "เป็นพาลินโดรม" : "ไม่เป็นพาลินโดรม") << "\n";
    return 0;
}
`, wrong: [STR + R`int main() {
    std::string line;
    std::getline(std::cin, line);
    bool ok{true};
    for (std::size_t i = 0; i < line.size() / 2; i++) {
        if (line[i] != line[line.size() - 1 - i]) {
            ok = false;
            break;
        }
    }
    std::cout << (ok ? "เป็นพาลินโดรม" : "ไม่เป็นพาลินโดรม") << "\n";
    return 0;
}
`] },
  "cppstr/5": { sol: STR + R`int main() {
    std::string line;
    std::getline(std::cin, line);
    int letters{0}, words{0}, sentences{0};
    bool inWord{false};
    for (std::size_t i = 0; i < line.size(); i++) {
        unsigned char ch = static_cast<unsigned char>(line[i]);
        if (std::isalpha(ch)) letters++;
        if (ch == '.' || ch == '!' || ch == '?') sentences++;
        if (std::isspace(ch)) {
            inWord = false;
        } else if (!inWord) {
            words++;
            inWord = true;
        }
    }
    std::cout << "ตัวอักษร: " << letters << "\n";
    std::cout << "คำ: " << words << "\n";
    std::cout << "ประโยค: " << sentences << "\n";
    return 0;
}
`, wrong: [STR + R`int main() {
    std::string line;
    std::getline(std::cin, line);
    int letters{0}, words{0}, sentences{0};
    for (std::size_t i = 0; i < line.size(); i++) {
        unsigned char ch = static_cast<unsigned char>(line[i]);
        if (std::isalpha(ch)) letters++;
        if (ch == '.' || ch == '!' || ch == '?') sentences++;
        if (ch == ' ') words++;
    }
    if (!line.empty()) words++;
    std::cout << "ตัวอักษร: " << letters << "\n";
    std::cout << "คำ: " << words << "\n";
    std::cout << "ประโยค: " << sentences << "\n";
    return 0;
}
`] },
  "cppstr/6": { sol: STR + TEXT2(">", ">"), wrong: [STR + TEXT2(">=", ">"), STR + TEXT2(">", ">=")] },
});

// ═══════════════ Stage 11–13 (Phase 4 ชุดที่ 1) ═══════════════
const MEM = "#include <iostream>\n#include <iomanip>\n#include <memory>\n#include <utility>\n\n";
const CHAR = (takeDamage) => R`class Character {
public:
    std::string name;
    int hp{0};
    int atk{0};
    bool isAlive() const { return hp > 0; }
    void takeDamage(int d) {
` + takeDamage + R`
    }
    void attack(Character& target) const {
        target.takeDamage(atk);
        std::cout << name << " โจมตี " << target.name << ": HP " << target.name << " เหลือ " << target.hp << "\n";
    }
};`;
const BATTLE = R`    Character a, b;
    std::cin >> a.name >> a.hp >> a.atk >> b.name >> b.hp >> b.atk;
    Character* attacker = &a;
    Character* defender = &b;
    while (a.isAlive() && b.isAlive()) {
        attacker->attack(*defender);
        Character* t = attacker;
        attacker = defender;
        defender = t;
    }
    std::cout << "ผู้ชนะ: " << (a.isAlive() ? a.name : b.name) << "\n";`;
Object.assign(module.exports, {
  // ── Stage 11: พอยน์เตอร์ ──
  "cppptr/0": { sol: M(R`    int x;
    std::cin >> x;
    int* p = &x;
    std::cout << "ค่าเดิม: " << *p << "\n";
    *p += 10;
    std::cout << "ค่าใหม่: " << x << "\n";`), wrong: [M(R`    int x;
    std::cin >> x;
    std::cout << "ค่าเดิม: " << x << "\n";
    x += 10;
    std::cout << "ค่าใหม่: " << x << "\n";`), M(R`    int x;
    std::cin >> x;
    int* p = &x;
    int copy = *p;
    std::cout << "ค่าเดิม: " << copy << "\n";
    copy += 10;
    std::cout << "ค่าใหม่: " << x << "\n";`)] },
  "cppptr/1": { sol: F(R`void swapPtr(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`, R`    int x, y;
    std::cin >> x >> y;
    swapPtr(&x, &y);
    std::cout << "x=" << x << " y=" << y << "\n";`), wrong: [F(R`void swapPtr(int* a, int* b) {
    int* temp = a;
    a = b;
    b = temp;
}`, R`    int x, y;
    std::cin >> x >> y;
    swapPtr(&x, &y);
    std::cout << "x=" << x << " y=" << y << "\n";`)] },
  "cppptr/2": { sol: F(R`int safeValue(const int* p) {
    if (p == nullptr) return -1;
    return *p;
}`, R`    int flag, v;
    std::cin >> flag >> v;
    const int* p = nullptr;
    if (flag == 1) {
        p = &v;
    }
    std::cout << safeValue(p) << "\n";`), wrong: [F(R`int safeValue(const int* p) {
    if (*p == 0) return -1;
    return *p;
}`, R`    int flag, v;
    std::cin >> flag >> v;
    const int* p = nullptr;
    if (flag == 1) {
        p = &v;
    }
    std::cout << safeValue(p) << "\n";`)] },
  "cppptr/3": { sol: M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    int sum{0};
    int best = *a;
    for (const int* p = a; p != a + n; ++p) {
        sum += *p;
        if (*p > best) best = *p;
    }
    std::cout << "ผลรวม: " << sum << "\n";
    std::cout << "มากที่สุด: " << best << "\n";`), wrong: [M(R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> a[i];
    }
    int sum{0};
    int best = 0;
    for (const int* p = a; p != a + n; ++p) {
        sum += *p;
        if (*p > best) best = *p;
    }
    std::cout << "ผลรวม: " << sum << "\n";
    std::cout << "มากที่สุด: " << best << "\n";`)] },
  "cppptr/4": { sol: F(R`int* findFirst(int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return arr + i;
    }
    return nullptr;
}`, R`    const int MAX = 100;
    int arr[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }
    int target;
    std::cin >> target;
    int* p = findFirst(arr, n, target);
    if (p == nullptr) {
        std::cout << "ไม่พบ\n";
    } else {
        std::cout << "พบที่ index " << p - arr << " ค่า " << *p << "\n";
    }`), wrong: [F(R`int* findFirst(int* arr, int n, int target) {
    int* found = nullptr;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) found = arr + i;
    }
    return found;
}`, R`    const int MAX = 100;
    int arr[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];
    }
    int target;
    std::cin >> target;
    int* p = findFirst(arr, n, target);
    if (p == nullptr) {
        std::cout << "ไม่พบ\n";
    } else {
        std::cout << "พบที่ index " << p - arr << " ค่า " << *p << "\n";
    }`)] },
  "cppptr/5": { sol: F(R`double averageNonNegative(const int* arr, int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int v = arr[i];
        if (v < 0) {
            v = 0;
        }
        sum += v;
    }
    return static_cast<double>(sum) / n;
}`, R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    std::cout << std::fixed << std::setprecision(2) << "ค่าเฉลี่ย: " << averageNonNegative(a, n) << "\n";
    std::cout << "ข้อมูลเดิมตัวแรก: " << a[0] << "\n";`), wrong: [F(R`double averageNonNegative(int* arr, int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] < 0) {
            arr[i] = 0;
        }
        sum += arr[i];
    }
    return static_cast<double>(sum) / n;
}`, R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    std::cout << std::fixed << std::setprecision(2) << "ค่าเฉลี่ย: " << averageNonNegative(a, n) << "\n";
    std::cout << "ข้อมูลเดิมตัวแรก: " << a[0] << "\n";`)] },
  "cppptr/6": { sol: F(R`void minMax(const int* arr, int n, int* minOut, int* maxOut) {
    *minOut = arr[0];
    *maxOut = arr[0];
    for (const int* p = arr; p != arr + n; ++p) {
        if (*p < *minOut) *minOut = *p;
        if (*p > *maxOut) *maxOut = *p;
    }
}`, R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    int* left = a;
    int* right = a + n - 1;
    while (left < right) {
        int t = *left;
        *left = *right;
        *right = t;
        ++left;
        --right;
    }
    for (int i = 0; i < n; i++) std::cout << a[i] << " ";
    std::cout << "\n";
    int lo, hi;
    minMax(a, n, &lo, &hi);
    std::cout << "ต่ำสุด: " << lo << "\n";
    std::cout << "สูงสุด: " << hi << "\n";`), wrong: [F(R`void minMax(const int* arr, int n, int* minOut, int* maxOut) {
    *minOut = 0;
    *maxOut = 0;
    for (const int* p = arr; p != arr + n; ++p) {
        if (*p < *minOut) *minOut = *p;
        if (*p > *maxOut) *maxOut = *p;
    }
}`, R`    const int MAX = 100;
    int a[MAX]{};
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) std::cin >> a[i];
    int* left = a;
    int* right = a + n - 1;
    while (left < right) {
        int t = *left;
        *left = *right;
        *right = t;
        ++left;
        --right;
    }
    for (int i = 0; i < n; i++) std::cout << a[i] << " ";
    std::cout << "\n";
    int lo, hi;
    minMax(a, n, &lo, &hi);
    std::cout << "ต่ำสุด: " << lo << "\n";
    std::cout << "สูงสุด: " << hi << "\n";`)] },
  // ── Stage 12: หน่วยความจำ → RAII ──
  "cppmem/0": { sol: M(R`    int n;
    std::cin >> n;
    int* data = new int[n];
    int sum{0};
    for (int i = 0; i < n; i++) {
        std::cin >> data[i];
        sum += data[i];
    }
    std::cout << std::fixed << std::setprecision(2) << "ค่าเฉลี่ย: " << static_cast<double>(sum) / n << "\n";
    delete[] data;`), wrong: [M(R`    int n;
    std::cin >> n;
    int* data = new int[n];
    int sum{0};
    for (int i = 0; i < n; i++) {
        std::cin >> data[i];
        sum += data[i];
    }
    std::cout << std::fixed << std::setprecision(2) << "ค่าเฉลี่ย: " << static_cast<double>(sum) / n << "\n";`)] },
  "cppmem/1": { sol: M(R`    int n;
    std::cin >> n;
    int* data = new int[n];
    for (int i = 0; i < n; i++) std::cin >> data[i];
    int best = data[0];
    for (int i = 1; i < n; i++) {
        if (data[i] > best) best = data[i];
    }
    std::cout << "มากที่สุด: " << best << "\n";
    delete[] data;`), wrong: [M(R`    int n;
    std::cin >> n;
    int* data = new int[n];
    for (int i = 0; i < n; i++) std::cin >> data[i];
    int best = 0;
    for (int i = 0; i < n; i++) {
        if (data[i] > best) best = data[i];
    }
    std::cout << "มากที่สุด: " << best << "\n";
    delete[] data;`)] },
  "cppmem/2": { sol: MEM + R`int main() {
    int n;
    std::cin >> n;
    auto data = std::make_unique<int[]>(n);
    for (int i = 0; i < n; i++) std::cin >> data[i];
    for (int i = 0; i < n; i++) {
        if (data[i] < 0) {
            std::cout << "พบค่าติดลบ\n";
            return 0;
        }
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += data[i];
    std::cout << "ผลรวม: " << sum << "\n";
    return 0;
}
`, wrong: [MEM + R`int main() {
    int n;
    std::cin >> n;
    auto data = std::make_unique<int[]>(n);
    for (int i = 0; i < n; i++) std::cin >> data[i];
    for (int i = 0; i < n; i++) {
        if (data[i] < 0) {
            std::cout << "พบค่าติดลบ\n";
            return 0;
        }
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += data[i];
    std::cout << "ผลรวม: " << sum << "\n";
    int* extra = new int[1];
    delete[] extra;
    return 0;
}
`, MEM + R`int main() {
    int n;
    std::cin >> n;
    auto data = std::make_unique<int[]>(n);
    for (int i = 0; i < n; i++) std::cin >> data[i];
    int sum = 0;
    for (int i = 0; i < n; i++) {
        if (data[i] < 0) {
            std::cout << "พบค่าติดลบ\n";
            return 0;
        }
        sum += data[i];
    }
    std::cout << "ผลรวม: " << sum << "\n";
    return 0;
}
`] },
  "cppmem/3": { sol: MEM + R`int main() {
    auto hp = std::make_unique<int>(100);
    int damage;
    std::cin >> damage;
    *hp -= damage;
    std::cout << "HP: " << *hp << "\n";
    return 0;
}
`, wrong: [MEM + R`int main() {
    auto hp = std::make_unique<int>(100);
    int damage;
    std::cin >> damage;
    *hp -= damage;
    if (*hp < 0) *hp = 0;
    std::cout << "HP: " << *hp << "\n";
    return 0;
}
`] },
  "cppmem/4": { sol: MEM + R`std::unique_ptr<int> makeBox(int v) {
    return std::make_unique<int>(v);
}

int main() {
    int v;
    std::cin >> v;
    auto a = makeBox(v);
    auto b = std::move(a);
    std::cout << "b: " << *b << "\n";
    std::cout << std::boolalpha << "a ว่าง: " << (a == nullptr) << "\n";
    return 0;
}
`, wrong: [MEM + R`std::unique_ptr<int> makeBox(int v) {
    return std::make_unique<int>(v);
}

int main() {
    int v;
    std::cin >> v;
    auto a = makeBox(v);
    auto b = makeBox(*a);
    std::cout << "b: " << *b << "\n";
    std::cout << std::boolalpha << "a ว่าง: " << (a == nullptr) << "\n";
    std::cout << "(ย้ายแล้ว)" << (false ? "" : "") << "\n";
    return std::move(a) ? 0 : 0;
}
`] },
  "cppmem/5": { sol: MEM + R`int main() {
    int capacity = 2, count = 0;
    auto buf = std::make_unique<int[]>(capacity);
    int x;
    while (std::cin >> x && x != 0) {
        if (count == capacity) {
            auto bigger = std::make_unique<int[]>(capacity * 2);
            for (int i = 0; i < count; i++) bigger[i] = buf[i];
            buf = std::move(bigger);
            capacity *= 2;
        }
        buf[count++] = x;
    }
    std::cout << "จำนวน: " << count << "\n";
    std::cout << "ความจุ: " << capacity << "\n";
    std::cout << "ข้อมูล:";
    if (count == 0) std::cout << " -";
    for (int i = 0; i < count; i++) std::cout << " " << buf[i];
    std::cout << "\n";
    return 0;
}
`, wrong: [MEM + R`int main() {
    int capacity = 2, count = 0;
    auto buf = std::make_unique<int[]>(capacity);
    int x;
    while (std::cin >> x && x != 0) {
        buf[count++] = x;
        if (count == capacity) {
            auto bigger = std::make_unique<int[]>(capacity * 2);
            for (int i = 0; i < count; i++) bigger[i] = buf[i];
            buf = std::move(bigger);
            capacity *= 2;
        }
    }
    std::cout << "จำนวน: " << count << "\n";
    std::cout << "ความจุ: " << capacity << "\n";
    std::cout << "ข้อมูล:";
    if (count == 0) std::cout << " -";
    for (int i = 0; i < count; i++) std::cout << " " << buf[i];
    std::cout << "\n";
    return 0;
}
`] },
  "cppmem/6": { sol: MEM + R`double average(const int* scores, int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += scores[i];
    return static_cast<double>(sum) / n;
}

int countAbove(const int* scores, int n, double limit) {
    int c = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] > limit) c++;
    }
    return c;
}

int main() {
    int n;
    std::cin >> n;
    auto scores = std::make_unique<int[]>(n);
    for (int i = 0; i < n; i++) std::cin >> scores[i];
    double avg = average(scores.get(), n);
    int hi = scores[0], lo = scores[0];
    for (int i = 1; i < n; i++) {
        if (scores[i] > hi) hi = scores[i];
        if (scores[i] < lo) lo = scores[i];
    }
    std::cout << std::fixed << std::setprecision(2) << "ค่าเฉลี่ย: " << avg << "\n";
    std::cout << "สูงสุด: " << hi << "\n";
    std::cout << "ต่ำสุด: " << lo << "\n";
    std::cout << "สูงกว่าค่าเฉลี่ย: " << countAbove(scores.get(), n, avg) << " คน\n";
    return 0;
}
`, wrong: [MEM + R`double average(const int* scores, int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += scores[i];
    return static_cast<double>(sum) / n;
}

int countAbove(const int* scores, int n, double limit) {
    int c = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] >= limit) c++;
    }
    return c;
}

int main() {
    int n;
    std::cin >> n;
    auto scores = std::make_unique<int[]>(n);
    for (int i = 0; i < n; i++) std::cin >> scores[i];
    double avg = average(scores.get(), n);
    int hi = scores[0], lo = scores[0];
    for (int i = 1; i < n; i++) {
        if (scores[i] > hi) hi = scores[i];
        if (scores[i] < lo) lo = scores[i];
    }
    std::cout << std::fixed << std::setprecision(2) << "ค่าเฉลี่ย: " << avg << "\n";
    std::cout << "สูงสุด: " << hi << "\n";
    std::cout << "ต่ำสุด: " << lo << "\n";
    std::cout << "สูงกว่าค่าเฉลี่ย: " << countAbove(scores.get(), n, avg) << " คน\n";
    return 0;
}
`] },
  // ── Stage 13: คลาสและออบเจ็กต์ ──
  "cppclass/0": { sol: F(R`struct Point {
    int x{0};
    int y{0};
};

int manhattan(const Point& a, const Point& b) {
    return std::abs(a.x - b.x) + std::abs(a.y - b.y);
}`, R`    Point a, b;
    std::cin >> a.x >> a.y >> b.x >> b.y;
    std::cout << "ระยะแมนฮัตตัน: " << manhattan(a, b) << "\n";`).replace("#include <string>\n", "#include <string>\n#include <cstdlib>\n"),
                  wrong: [F(R`struct Point {
    int x{0};
    int y{0};
};

int manhattan(const Point& a, const Point& b) {
    return (a.x - b.x) + (a.y - b.y);
}`, R`    Point a, b;
    std::cin >> a.x >> a.y >> b.x >> b.y;
    std::cout << "ระยะแมนฮัตตัน: " << manhattan(a, b) << "\n";`)] },
  "cppclass/1": { sol: F(R`class Rectangle {
public:
    double width{0}, height{0};
    double area() const { return width * height; }
    double perimeter() const { return 2 * (width + height); }
};`, R`    Rectangle r;
    std::cin >> r.width >> r.height;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "พื้นที่: " << r.area() << "\n";
    std::cout << "เส้นรอบรูป: " << r.perimeter() << "\n";`), wrong: [F(R`class Rectangle {
public:
    double width{0}, height{0};
    double area() const { return width * height; }
    double perimeter() const { return 2 * width + height; }
};`, R`    Rectangle r;
    std::cin >> r.width >> r.height;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "พื้นที่: " << r.area() << "\n";
    std::cout << "เส้นรอบรูป: " << r.perimeter() << "\n";`)] },
  "cppclass/2": { sol: F(R`class Player {
public:
    std::string name;
    int level{1};
    std::string describe() const {
        return name + " LV." + std::to_string(level);
    }
};

void show(const Player& p) {
    std::cout << p.describe() << "\n";
}`, R`    Player p;
    std::cin >> p.name >> p.level;
    show(p);`), wrong: [F(R`class Player {
public:
    std::string name;
    int level{1};
    std::string describe() const {
        return name + " LV" + std::to_string(level);
    }
};

void show(const Player& p) {
    std::cout << p.describe() << "\n";
}`, R`    Player p;
    std::cin >> p.name >> p.level;
    show(p);`)] },
  "cppclass/3": { sol: F(R`class Counter {
private:
    int count{0};
public:
    void increment() { count++; }
    void decrement() {
        if (count > 0) count--;
    }
    void reset() { count = 0; }
    int value() const { return count; }
};`, R`    Counter c;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'i') c.increment();
        else if (cmd == 'd') c.decrement();
        else if (cmd == 'r') c.reset();
        else if (cmd == 'v') std::cout << c.value() << "\n";
    }`), wrong: [F(R`class Counter {
private:
    int count{0};
public:
    void increment() { count++; }
    void decrement() { count--; }
    void reset() { count = 0; }
    int value() const { return count; }
};`, R`    Counter c;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'i') c.increment();
        else if (cmd == 'd') c.decrement();
        else if (cmd == 'r') c.reset();
        else if (cmd == 'v') std::cout << c.value() << "\n";
    }`)] },
  "cppclass/4": { sol: F(R`class Stopwatch {
public:
    int seconds{0};
    std::string format() const {
        int m = seconds / 60;
        int s = seconds % 60;
        std::string out;
        if (m < 10) out += "0";
        out += std::to_string(m) + ":";
        if (s < 10) out += "0";
        out += std::to_string(s);
        return out;
    }
};`, R`    Stopwatch w;
    std::cin >> w.seconds;
    std::cout << w.format() << "\n";`), wrong: [F(R`class Stopwatch {
public:
    int seconds{0};
    std::string format() const {
        int m = seconds / 60;
        int s = seconds % 60;
        return std::to_string(m) + ":" + std::to_string(s);
    }
};`, R`    Stopwatch w;
    std::cin >> w.seconds;
    std::cout << w.format() << "\n";`)] },
  "cppclass/5": { sol: F(R`class Time {
public:
    int hour{0}, minute{0};
    void addMinutes(int mins) {
        int total = hour * 60 + minute + mins;
        total = ((total % 1440) + 1440) % 1440;
        hour = total / 60;
        minute = total % 60;
    }
    void print() const {
        if (hour < 10) std::cout << "0";
        std::cout << hour << ":";
        if (minute < 10) std::cout << "0";
        std::cout << minute << "\n";
    }
};`, R`    Time t;
    int delta;
    std::cin >> t.hour >> t.minute >> delta;
    t.addMinutes(delta);
    t.print();`), wrong: [F(R`class Time {
public:
    int hour{0}, minute{0};
    void addMinutes(int mins) {
        int total = hour * 60 + minute + mins;
        total = total % 1440;
        hour = total / 60;
        minute = total % 60;
    }
    void print() const {
        if (hour < 10) std::cout << "0";
        std::cout << hour << ":";
        if (minute < 10) std::cout << "0";
        std::cout << minute << "\n";
    }
};`, R`    Time t;
    int delta;
    std::cin >> t.hour >> t.minute >> delta;
    t.addMinutes(delta);
    t.print();`)] },
  "cppclass/6": { sol: F(CHAR(R`        hp -= d;
        if (hp < 0) hp = 0;`), BATTLE), wrong: [F(CHAR(R`        hp -= d;`), BATTLE)] },
});

// ═══════════════ Stage 14–16 (Phase 4 ชุดที่ 2) ═══════════════
const OOP = "#include <iostream>\n#include <iomanip>\n#include <memory>\n#include <sstream>\n#include <string>\n\n";
const LOYAL = (tier, redeemLifetime) => OOP + R`class LoyaltyCard {
public:
    explicit LoyaltyCard(const std::string& n) : name{n} {}
    int addPurchase(int amount) {
        int earned = amount / 50;
        points += earned;
        lifetime += earned;
        return earned;
    }
    bool redeem(int drinks) {
        if (drinks * 10 > points) return false;
        points -= drinks * 10;` + redeemLifetime + R`
        return true;
    }
    std::string tier() const {
` + tier + R`
    }
    int getPoints() const { return points; }
    std::string getName() const { return name; }
private:
    std::string name;
    int points{0};
    int lifetime{0};
};

int main() {
    std::string name;
    std::cin >> name;
    LoyaltyCard card(name);
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 's') {
            std::cout << card.getName() << ": " << card.getPoints() << " แต้ม · ระดับ " << card.tier() << "\n";
            continue;
        }
        int v;
        std::cin >> v;
        if (v <= 0) {
            std::cout << "จำนวนไม่ถูกต้อง\n";
        } else if (cmd == 'b') {
            int got = card.addPurchase(v);
            std::cout << "+" << got << " แต้ม (รวม " << card.getPoints() << ")\n";
        } else if (card.redeem(v)) {
            std::cout << "แลกได้ " << v << " แก้ว · เหลือ " << card.getPoints() << " แต้ม\n";
        } else {
            std::cout << "แต้มไม่พอ (มี " << card.getPoints() << " แต้ม)\n";
        }
    }
    return 0;
}
`;
const TIER_OK = R`        if (lifetime < 50) return "Bronze";
        if (lifetime < 150) return "Silver";
        return "Gold";`;
const FRAC = (norm) => OOP + R`class Fraction {
public:
    Fraction(int n, int d) {
` + norm + R`
    }
    bool isValid() const { return valid; }
    std::string toString() const { return std::to_string(num) + "/" + std::to_string(den); }
private:
    int num{0}, den{1};
    bool valid{true};
};

int main() {
    int n, d;
    std::cin >> n >> d;
    Fraction f(n, d);
    if (f.isValid()) {
        std::cout << f.toString() << "\n";
    } else {
        std::cout << "ตัวส่วนเป็นศูนย์\n";
    }
    return 0;
}
`;
const HEROES = (mageCost) => OOP + R`class Hero {
public:
    explicit Hero(const std::string& n) : name{n} {}
    virtual ~Hero() = default;
    virtual int act() = 0;
    std::string getName() const { return name; }
private:
    std::string name;
};

class Warrior : public Hero {
public:
    explicit Warrior(const std::string& n) : Hero(n) {}
    int act() override { return 10; }
};

class Mage : public Hero {
public:
    Mage(const std::string& n, int m) : Hero(n), mana{m} {}
    int act() override {
        if (mana >= ` + mageCost + R`) {
            mana -= 6;
            return 18;
        }
        return 4;
    }
private:
    int mana;
};

class Archer : public Hero {
public:
    explicit Archer(const std::string& n) : Hero(n) {}
    int act() override {
        shots++;
        return shots % 3 == 0 ? 14 : 7;
    }
private:
    int shots{0};
};

int main() {
    int bossHp, k;
    std::cin >> bossHp >> k;
    std::unique_ptr<Hero> party[10];
    for (int i = 0; i < k; i++) {
        char type;
        std::string name;
        std::cin >> type >> name;
        if (type == 'w') party[i] = std::make_unique<Warrior>(name);
        else if (type == 'm') {
            int mana;
            std::cin >> mana;
            party[i] = std::make_unique<Mage>(name, mana);
        } else party[i] = std::make_unique<Archer>(name);
    }
    for (int round = 1; ; round++) {
        for (int i = 0; i < k; i++) {
            int d = party[i]->act();
            bossHp -= d;
            if (bossHp < 0) bossHp = 0;
            std::cout << party[i]->getName() << " โจมตี " << d << " → บอสเหลือ " << bossHp << "\n";
            if (bossHp == 0) {
                std::cout << "ชนะในรอบที่ " << round << "\n";
                return 0;
            }
        }
    }
}
`;
const CART = (discountRate) => OOP + R`struct Product {
    std::string name;
    double price{0};
    int qty{0};
};

class DiscountPolicy {
public:
    virtual ~DiscountPolicy() = default;
    virtual double discount(double subtotal) const = 0;
};

class NoDiscount : public DiscountPolicy {
public:
    double discount(double) const override { return 0; }
};

class MemberDiscount : public DiscountPolicy {
public:
    double discount(double subtotal) const override { return subtotal * ` + discountRate + R`; }
};

class Cart {
public:
    explicit Cart(const DiscountPolicy& p) : policy{p} {}
    void add(const std::string& name, double price, int qty) {
        for (int i = 0; i < count; i++) {
            if (items[i].name == name) {
                items[i].qty += qty;
                return;
            }
        }
        items[count++] = Product{name, price, qty};
    }
    bool remove(const std::string& name) {
        for (int i = 0; i < count; i++) {
            if (items[i].name == name) {
                for (int j = i; j < count - 1; j++) items[j] = items[j + 1];
                count--;
                return true;
            }
        }
        return false;
    }
    void list() const {
        if (count == 0) {
            std::cout << "ตะกร้าว่าง\n";
            return;
        }
        for (int i = 0; i < count; i++) {
            std::cout << items[i].name << " x " << items[i].qty << " = " << items[i].price * items[i].qty << "\n";
        }
    }
    void total() const {
        double sub = 0;
        for (int i = 0; i < count; i++) sub += items[i].price * items[i].qty;
        double d = policy.discount(sub);
        std::cout << "ยอดรวม " << sub << " · ส่วนลด " << d << " · สุทธิ " << sub - d << "\n";
    }
private:
    const DiscountPolicy& policy;
    Product items[50];
    int count{0};
};

int main() {
    std::string policyName;
    std::cin >> policyName;
    std::cout << std::fixed << std::setprecision(2);
    NoDiscount none;
    MemberDiscount member;
    const DiscountPolicy& policy = (policyName == "member") ? static_cast<const DiscountPolicy&>(member) : none;
    Cart cart(policy);
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'a') {
            std::string name;
            double price;
            int qty;
            std::cin >> name >> price >> qty;
            cart.add(name, price, qty);
        } else if (cmd == 'r') {
            std::string name;
            std::cin >> name;
            if (!cart.remove(name)) std::cout << "ไม่มี " << name << " ในตะกร้า\n";
        } else if (cmd == 'l') {
            cart.list();
        } else if (cmd == 't') {
            cart.total();
        }
    }
    return 0;
}
`;
Object.assign(module.exports, {
  // ── Stage 14 ──
  "cppctor/0": { sol: OOP + R`class Book {
public:
    Book(const std::string& t, int p) : title{t}, pages{p} {}
    std::string describe() const { return title + " (" + std::to_string(pages) + " หน้า)"; }
private:
    std::string title;
    int pages;
};

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string title;
        int pages;
        std::cin >> title >> pages;
        Book b{title, pages};
        std::cout << b.describe() << "\n";
    }
    return 0;
}
`, wrong: [OOP + R`class Book {
public:
    Book(const std::string& t, int p) {
        title = t;
        pages = p;
    }
    std::string describe() const { return title + " (" + std::to_string(pages) + " หน้า)"; }
private:
    std::string title;
    int pages{0};
};

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string title;
        int pages;
        std::cin >> title >> pages;
        Book b{title, pages};
        std::cout << b.describe() << "\n";
    }
    return 0;
}
`] },
  "cppctor/1": { sol: OOP + R`class Timer {
public:
    Timer() : seconds{0} {}
    explicit Timer(int s) : seconds{s} {}
    int get() const { return seconds; }
private:
    int seconds;
};

int main() {
    int n;
    std::cin >> n;
    Timer a;
    Timer b(n);
    std::cout << "a: " << a.get() << "\n";
    std::cout << "b: " << b.get() << "\n";
    return 0;
}
`, wrong: [OOP + R`class Timer {
public:
    Timer() : seconds{0} {}
    explicit Timer(int s) : seconds{s + 0 * s + (s < 0 ? 1 : 0)} {}
    int get() const { return seconds; }
private:
    int seconds;
};

int main() {
    int n;
    std::cin >> n;
    Timer a;
    Timer b(n);
    std::cout << "a: " << a.get() << "\n";
    std::cout << "b: " << b.get() << "\n";
    return 0;
}
`] },
  "cppctor/2": { sol: OOP + R`class Wallet {
public:
    explicit Wallet(double balance) : balance{balance} {}
    double get() const { return balance; }
private:
    double balance{0};
};

int main() {
    double v;
    std::cin >> v;
    Wallet w(v);
    std::cout << std::fixed << std::setprecision(2) << "ยอดเงิน: " << w.get() << "\n";
    return 0;
}
`, wrong: [OOP + R`class Wallet {
public:
    explicit Wallet(double b) : balance{b > 0 ? b : 1} {}
    double get() const { return balance; }
private:
    double balance{0};
};

int main() {
    double v;
    std::cin >> v;
    Wallet w(v);
    std::cout << std::fixed << std::setprecision(2) << "ยอดเงิน: " << w.get() << "\n";
    return 0;
}
`] },
  "cppctor/3": { sol: OOP + R`class Thermostat {
public:
    bool setTarget(int value) {
        if (value < 16 || value > 30) return false;
        target = value;
        return true;
    }
    int get() const { return target; }
private:
    int target{25};
};

int main() {
    Thermostat t;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 's') {
            int v;
            std::cin >> v;
            if (t.setTarget(v)) std::cout << "ตั้งเป็น " << v << " องศา\n";
            else std::cout << "ค่าไม่ถูกต้อง (16-30)\n";
        } else if (cmd == 'g') {
            std::cout << "ตอนนี้ " << t.get() << " องศา\n";
        }
    }
    return 0;
}
`, wrong: [OOP + R`class Thermostat {
public:
    bool setTarget(int value) {
        if (value <= 16 || value >= 30) return false;
        target = value;
        return true;
    }
    int get() const { return target; }
private:
    int target{25};
};

int main() {
    Thermostat t;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 's') {
            int v;
            std::cin >> v;
            if (t.setTarget(v)) std::cout << "ตั้งเป็น " << v << " องศา\n";
            else std::cout << "ค่าไม่ถูกต้อง (16-30)\n";
        } else if (cmd == 'g') {
            std::cout << "ตอนนี้ " << t.get() << " องศา\n";
        }
    }
    return 0;
}
`] },
  "cppctor/4": { sol: OOP + R`class Logger {
public:
    explicit Logger(const std::string& name) : name{name} {
        std::cout << "เปิด " << name << "\n";
    }
    ~Logger() {
        std::cout << "ปิด " << name << "\n";
    }
private:
    std::string name;
};

int main() {
    std::string a, b, c;
    std::cin >> a >> b >> c;
    Logger outer(a);
    {
        Logger middle(b);
        {
            Logger inner(c);
        }
        std::cout << "---\n";
    }
    return 0;
}
`, wrong: [OOP + R`class Logger {
public:
    explicit Logger(const std::string& name) : name{name} {
        std::cout << "เปิด " << name << "\n";
        std::cout << "ปิด " << name << "\n";
    }
private:
    std::string name;
};

int main() {
    std::string a, b, c;
    std::cin >> a >> b >> c;
    Logger outer(a);
    {
        Logger middle(b);
        {
            Logger inner(c);
        }
        std::cout << "---\n";
    }
    return 0;
}
`] },
  "cppctor/5": { sol: FRAC(R`        if (d == 0) {
            valid = false;
            return;
        }
        if (d < 0) {
            n = -n;
            d = -d;
        }
        int a = n < 0 ? -n : n, b = d;
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        if (a == 0) a = 1;
        num = n / a;
        den = d / a;
        if (num == 0) den = 1;`), wrong: [FRAC(R`        if (d == 0) {
            valid = false;
            return;
        }
        int a = n < 0 ? -n : n, b = d < 0 ? -d : d;
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        if (a == 0) a = 1;
        num = n / a;
        den = d / a;
        if (num == 0) den = 1;`), FRAC(R`        if (d == 0) {
            valid = false;
            return;
        }
        if (d < 0) {
            n = -n;
            d = -d;
        }
        num = n;
        den = n == 0 ? 1 : d;`)] },
  "cppctor/6": { sol: LOYAL(TIER_OK, ""), wrong: [LOYAL(R`        if (lifetime <= 50) return "Bronze";
        if (lifetime <= 150) return "Silver";
        return "Gold";`, ""), LOYAL(TIER_OK, "\n        lifetime -= drinks * 10;")] },
  // ── Stage 15 ──
  "cppinherit/0": { sol: OOP + R`class Animal {
public:
    explicit Animal(const std::string& n) : name{n} {}
    virtual ~Animal() = default;
    virtual std::string sound() const { return "..."; }
    std::string getName() const { return name; }
private:
    std::string name;
};

class Dog : public Animal {
public:
    explicit Dog(const std::string& n) : Animal(n) {}
    std::string sound() const override { return "โฮ่ง"; }
};

class Cat : public Animal {
public:
    explicit Cat(const std::string& n) : Animal(n) {}
    std::string sound() const override { return "เหมียว"; }
};

void speak(const Animal& a) {
    std::cout << a.getName() << ": " << a.sound() << "\n";
}

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string type, name;
        std::cin >> type >> name;
        std::unique_ptr<Animal> p;
        if (type == "dog") p = std::make_unique<Dog>(name);
        else if (type == "cat") p = std::make_unique<Cat>(name);
        else p = std::make_unique<Animal>(name);
        speak(*p);
    }
    return 0;
}
`, wrong: [OOP + R`class Animal {
public:
    explicit Animal(const std::string& n) : name{n} {}
    virtual ~Animal() = default;
    virtual std::string sound() const { return "..."; }
    std::string getName() const { return name; }
private:
    std::string name;
};

class Dog : public Animal {
public:
    explicit Dog(const std::string& n) : Animal(n) {}
    std::string sound() const override { return "โฮ่ง"; }
};

class Cat : public Animal {
public:
    explicit Cat(const std::string& n) : Animal(n) {}
    std::string sound() const override { return "เหมียว"; }
};

void speak(const Animal& a) {
    std::cout << a.getName() << ": " << a.sound() << "\n";
}

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string type, name;
        std::cin >> type >> name;
        std::unique_ptr<Animal> p;
        if (type == "cat") p = std::make_unique<Cat>(name);
        else p = std::make_unique<Dog>(name);
        speak(*p);
    }
    return 0;
}
`] },
  "cppinherit/1": { sol: OOP + R`class Employee {
public:
    Employee(const std::string& name, double salary) : name{name}, salary{salary} {}
    virtual ~Employee() = default;
    virtual double totalPay() const { return salary; }
    std::string getName() const { return name; }
protected:
    std::string name;
    double salary;
};

class Manager : public Employee {
public:
    Manager(const std::string& name, double salary, double bonus) : Employee(name, salary), bonus{bonus} {}
    double totalPay() const override { return salary + bonus; }
private:
    double bonus;
};

int main() {
    int k;
    std::cin >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char type;
        std::string name;
        double salary;
        std::cin >> type >> name >> salary;
        std::unique_ptr<Employee> e;
        if (type == 'm') {
            double bonus;
            std::cin >> bonus;
            e = std::make_unique<Manager>(name, salary, bonus);
        } else {
            e = std::make_unique<Employee>(name, salary);
        }
        std::cout << e->getName() << ": " << e->totalPay() << "\n";
    }
    return 0;
}
`, wrong: [OOP + R`class Employee {
public:
    Employee(const std::string& name, double salary) : name{name}, salary{salary} {}
    virtual ~Employee() = default;
    virtual double totalPay() const { return salary; }
    std::string getName() const { return name; }
protected:
    std::string name;
    double salary;
};

class Manager : public Employee {
public:
    Manager(const std::string& name, double salary, double bonus) : Employee(name, salary), bonus{bonus} {}
    double totalPay() const override { return bonus; }
private:
    double bonus;
};

int main() {
    int k;
    std::cin >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char type;
        std::string name;
        double salary;
        std::cin >> type >> name >> salary;
        std::unique_ptr<Employee> e;
        if (type == 'm') {
            double bonus;
            std::cin >> bonus;
            e = std::make_unique<Manager>(name, salary, bonus);
        } else {
            e = std::make_unique<Employee>(name, salary);
        }
        std::cout << e->getName() << ": " << e->totalPay() << "\n";
    }
    return 0;
}
`] },
  "cppinherit/2": { sol: OOP + R`class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const { return 0; }
};

class Square : public Shape {
public:
    explicit Square(double s) : side{s} {}
    double area() const override { return side * side; }
private:
    double side;
};

void report(const Shape& s) {
    std::cout << std::fixed << std::setprecision(2) << "พื้นที่: " << s.area() << "\n";
}

int main() {
    double side;
    std::cin >> side;
    Square sq(side);
    report(sq);
    return 0;
}
`, wrong: [OOP + R`class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const { return 0; }
};

class Square : public Shape {
public:
    explicit Square(double s) : side{s} {}
    double area() const override { return side * 2; }
private:
    double side;
};

void report(const Shape& s) {
    std::cout << std::fixed << std::setprecision(2) << "พื้นที่: " << s.area() << "\n";
}

int main() {
    double side;
    std::cin >> side;
    Square sq(side);
    report(sq);
    return 0;
}
`] },
  "cppinherit/3": { sol: OOP + R`class Shape {
public:
    virtual ~Shape() = default;
    virtual std::string name() const { return "รูปทรง"; }
    virtual double area() const { return 0; }
};

class Circle : public Shape {
public:
    explicit Circle(double r) : r{r} {}
    std::string name() const override { return "วงกลม"; }
    double area() const override { return 3.14159 * r * r; }
private:
    double r;
};

class Square : public Shape {
public:
    explicit Square(double s) : s{s} {}
    std::string name() const override { return "สี่เหลี่ยม"; }
    double area() const override { return s * s; }
private:
    double s;
};

void describe(const Shape& shape) {
    std::cout << std::fixed << std::setprecision(2) << shape.name() << ": " << shape.area() << "\n";
}

int main() {
    char type;
    double v;
    std::cin >> type >> v;
    if (type == 'c') {
        Circle c(v);
        describe(c);
    } else {
        Square s(v);
        describe(s);
    }
    return 0;
}
`, wrong: [OOP + R`class Shape {
public:
    virtual ~Shape() = default;
    virtual std::string name() const { return "รูปทรง"; }
    virtual double area() const { return 0; }
};

class Circle : public Shape {
public:
    explicit Circle(double r) : r{r} {}
    std::string name() const override { return "วงกลม"; }
    double area() const override { return 3.14159 * r * r; }
private:
    double r;
};

class Square : public Shape {
public:
    explicit Square(double s) : s{s} {}
    std::string name() const override { return "สี่เหลี่ยม"; }
    double area() const override { return s * s; }
private:
    double s;
};

void describe(Shape shape) {
    std::cout << std::fixed << std::setprecision(2) << shape.name() << ": " << shape.area() << "\n";
}

int main() {
    char type;
    double v;
    std::cin >> type >> v;
    if (type == 'c') {
        Circle c(v);
        describe(c);
    } else {
        Square s(v);
        describe(s);
    }
    return 0;
}
`] },
  "cppinherit/4": { sol: OOP + R`class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual std::string name() const = 0;
};

class Rect : public Shape {
public:
    Rect(double w, double h) : w{w}, h{h} {}
    double area() const override { return w * h; }
    std::string name() const override { return "สี่เหลี่ยม"; }
private:
    double w, h;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : r{r} {}
    double area() const override { return 3.14159 * r * r; }
    std::string name() const override { return "วงกลม"; }
private:
    double r;
};

class Triangle : public Shape {
public:
    Triangle(double b, double h) : b{b}, h{h} {}
    double area() const override { return 0.5 * b * h; }
    std::string name() const override { return "สามเหลี่ยม"; }
private:
    double b, h;
};

int main() {
    int k;
    std::cin >> k;
    std::unique_ptr<Shape> shapes[20];
    for (int i = 0; i < k; i++) {
        char t;
        std::cin >> t;
        if (t == 'r') {
            double w, h;
            std::cin >> w >> h;
            shapes[i] = std::make_unique<Rect>(w, h);
        } else if (t == 'c') {
            double r;
            std::cin >> r;
            shapes[i] = std::make_unique<Circle>(r);
        } else {
            double b, h;
            std::cin >> b >> h;
            shapes[i] = std::make_unique<Triangle>(b, h);
        }
    }
    double total = 0;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        std::cout << shapes[i]->name() << ": " << shapes[i]->area() << "\n";
        total += shapes[i]->area();
    }
    std::cout << "รวม: " << total << "\n";
    return 0;
}
`, wrong: [OOP + R`class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual std::string name() const = 0;
};

class Rect : public Shape {
public:
    Rect(double w, double h) : w{w}, h{h} {}
    double area() const override { return w * h; }
    std::string name() const override { return "สี่เหลี่ยม"; }
private:
    double w, h;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : r{r} {}
    double area() const override { return 3.14159 * r * r; }
    std::string name() const override { return "วงกลม"; }
private:
    double r;
};

class Triangle : public Shape {
public:
    Triangle(double b, double h) : b{b}, h{h} {}
    double area() const override { return b * h; }
    std::string name() const override { return "สามเหลี่ยม"; }
private:
    double b, h;
};

int main() {
    int k;
    std::cin >> k;
    std::unique_ptr<Shape> shapes[20];
    for (int i = 0; i < k; i++) {
        char t;
        std::cin >> t;
        if (t == 'r') {
            double w, h;
            std::cin >> w >> h;
            shapes[i] = std::make_unique<Rect>(w, h);
        } else if (t == 'c') {
            double r;
            std::cin >> r;
            shapes[i] = std::make_unique<Circle>(r);
        } else {
            double b, h;
            std::cin >> b >> h;
            shapes[i] = std::make_unique<Triangle>(b, h);
        }
    }
    double total = 0;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        std::cout << shapes[i]->name() << ": " << shapes[i]->area() << "\n";
        total += shapes[i]->area();
    }
    std::cout << "รวม: " << total << "\n";
    return 0;
}
`] },
  "cppinherit/5": { sol: OOP + R`class Discount {
public:
    virtual ~Discount() = default;
    virtual double apply(double price) const = 0;
};

class PercentDiscount : public Discount {
public:
    explicit PercentDiscount(double percent) : percent{percent} {}
    double apply(double price) const override {
        return price * (1 - percent / 100);
    }
private:
    double percent;
};

class FixedDiscount : public Discount {
public:
    explicit FixedDiscount(double amount) : amount{amount} {}
    double apply(double price) const override {
        double r = price - amount;
        return r < 0 ? 0 : r;
    }
private:
    double amount;
};

int main() {
    char type;
    double value, price;
    std::cin >> type >> value >> price;
    std::unique_ptr<Discount> d;
    if (type == 'p') d = std::make_unique<PercentDiscount>(value);
    else d = std::make_unique<FixedDiscount>(value);
    std::cout << std::fixed << std::setprecision(2) << "ราคาสุทธิ: " << d->apply(price) << "\n";
    return 0;
}
`, wrong: [OOP + R`class Discount {
public:
    virtual ~Discount() = default;
    virtual double apply(double price) const = 0;
};

class PercentDiscount : public Discount {
public:
    explicit PercentDiscount(double percent) : percent{percent} {}
    double apply(double price) const override {
        return price * (1 - percent / 100);
    }
private:
    double percent;
};

class FixedDiscount : public Discount {
public:
    explicit FixedDiscount(double amount) : amount{amount} {}
    double apply(double price) const override {
        return price - amount;
    }
private:
    double amount;
};

int main() {
    char type;
    double value, price;
    std::cin >> type >> value >> price;
    std::unique_ptr<Discount> d;
    if (type == 'p') d = std::make_unique<PercentDiscount>(value);
    else d = std::make_unique<FixedDiscount>(value);
    std::cout << std::fixed << std::setprecision(2) << "ราคาสุทธิ: " << d->apply(price) << "\n";
    return 0;
}
`] },
  "cppinherit/6": { sol: OOP + R`class Resource {
public:
    virtual ~Resource() { std::cout << "คืนทรัพยากรพื้นฐาน\n"; }
    virtual void use() const = 0;
};

class FileHandle : public Resource {
public:
    explicit FileHandle(const std::string& n) : name{n} { std::cout << "เปิดไฟล์ " << name << "\n"; }
    ~FileHandle() override { std::cout << "ปิดไฟล์ " << name << "\n"; }
    void use() const override { std::cout << "ใช้ไฟล์ " << name << "\n"; }
private:
    std::string name;
};

int main() {
    std::string n;
    std::cin >> n;
    {
        std::unique_ptr<Resource> r = std::make_unique<FileHandle>(n);
        r->use();
    }
    std::cout << "จบ\n";
    return 0;
}
`, wrong: [OOP + R`class Resource {
public:
    virtual ~Resource() { std::cout << "คืนทรัพยากรพื้นฐาน\n"; }
    virtual void use() const = 0;
};

class FileHandle : public Resource {
public:
    explicit FileHandle(const std::string& n) : name{n} { std::cout << "เปิดไฟล์ " << name << "\n"; }
    ~FileHandle() override { std::cout << "คืนทรัพยากรพื้นฐาน\n"; }
    void use() const override { std::cout << "ใช้ไฟล์ " << name << "\n"; }
private:
    std::string name;
};

int main() {
    std::string n;
    std::cin >> n;
    {
        std::unique_ptr<Resource> r = std::make_unique<FileHandle>(n);
        r->use();
    }
    std::cout << "จบ\n";
    return 0;
}
`] },
  "cppinherit/7": { sol: HEROES("6"), wrong: [HEROES("0")] },
  // ── Stage 16 ──
  "cppcomp/0": { sol: OOP + R`class Engine {
public:
    explicit Engine(int hp) : horsepower{hp} {}
    std::string start() const { return "เครื่องยนต์ " + std::to_string(horsepower) + " แรงม้า ติดแล้ว"; }
private:
    int horsepower;
};

class Car {
public:
    Car(const std::string& m, int hp, double f) : model{m}, engine{hp}, fuel{f} {}
    void start() const { std::cout << model << ": " << engine.start() << "\n"; }
    double drive(double km) {
        double need = km * 0.1;
        if (need > fuel) {
            double possible = fuel / 0.1;
            fuel = 0;
            return possible;
        }
        fuel -= need;
        return km;
    }
    double getFuel() const { return fuel; }
private:
    std::string model;
    Engine engine;
    double fuel;
};

int main() {
    std::string model;
    int hp;
    double fuel, km;
    std::cin >> model >> hp >> fuel >> km;
    Car car(model, hp, fuel);
    car.start();
    double driven = car.drive(km);
    std::cout << std::fixed << std::setprecision(1) << "ขับได้ " << driven << " กม. · น้ำมันเหลือ " << car.getFuel() << " ลิตร\n";
    return 0;
}
`, wrong: [OOP + R`class Engine {
public:
    explicit Engine(int hp) : horsepower{hp} {}
    std::string start() const { return "เครื่องยนต์ " + std::to_string(horsepower) + " แรงม้า ติดแล้ว"; }
private:
    int horsepower;
};

class Car {
public:
    Car(const std::string& m, int hp, double f) : model{m}, engine{hp}, fuel{f} {}
    void start() const { std::cout << model << ": " << engine.start() << "\n"; }
    double drive(double km) {
        fuel -= km * 0.1;
        return km;
    }
    double getFuel() const { return fuel; }
private:
    std::string model;
    Engine engine;
    double fuel;
};

int main() {
    std::string model;
    int hp;
    double fuel, km;
    std::cin >> model >> hp >> fuel >> km;
    Car car(model, hp, fuel);
    car.start();
    double driven = car.drive(km);
    std::cout << std::fixed << std::setprecision(1) << "ขับได้ " << driven << " กม. · น้ำมันเหลือ " << car.getFuel() << " ลิตร\n";
    return 0;
}
`] },
  "cppcomp/1": { sol: OOP + R`class IntArray {
public:
    void pushBack(int v) { data[count++] = v; }
    int at(int i) const { return data[i]; }
    int size() const { return count; }
    void removeLast() { count--; }
    void clear() { count = 0; }
private:
    int data[100]{};
    int count{0};
};

class Stack {
public:
    void push(int v) { items.pushBack(v); }
    int pop() {
        int v = items.at(items.size() - 1);
        items.removeLast();
        return v;
    }
    bool empty() const { return items.size() == 0; }
    int size() const { return items.size(); }
private:
    IntArray items;
};

int main() {
    Stack s;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'p') {
            int v;
            std::cin >> v;
            s.push(v);
        } else if (cmd == 'o') {
            if (s.empty()) std::cout << "ว่าง\n";
            else std::cout << s.pop() << "\n";
        } else if (cmd == 's') {
            std::cout << "ขนาด: " << s.size() << "\n";
        }
    }
    return 0;
}
`, wrong: [OOP + R`class IntArray {
public:
    void pushBack(int v) { data[count++] = v; }
    int at(int i) const { return data[i]; }
    int size() const { return count; }
    void removeLast() { count--; }
    void clear() { count = 0; }
private:
    int data[100]{};
    int count{0};
};

class Stack {
public:
    void push(int v) { items.pushBack(v); }
    int pop() {
        int v = items.at(0);
        items.removeLast();
        return v;
    }
    bool empty() const { return items.size() == 0; }
    int size() const { return items.size(); }
private:
    IntArray items;
};

int main() {
    Stack s;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'p') {
            int v;
            std::cin >> v;
            s.push(v);
        } else if (cmd == 'o') {
            if (s.empty()) std::cout << "ว่าง\n";
            else std::cout << s.pop() << "\n";
        } else if (cmd == 's') {
            std::cout << "ขนาด: " << s.size() << "\n";
        }
    }
    return 0;
}
`] },
  "cppcomp/2": { sol: OOP + R`class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void send(const std::string& msg) = 0;
};

class EmailNotifier : public Notifier {
public:
    void send(const std::string& msg) override { std::cout << "[อีเมล] " << msg << "\n"; }
};

class SmsNotifier : public Notifier {
public:
    void send(const std::string& msg) override { std::cout << "[SMS] " << msg << "\n"; }
};

class OrderService {
public:
    explicit OrderService(Notifier& n) : notifier{n} {}
    void placeOrder(const std::string& item, double price) {
        std::ostringstream os;
        os << std::fixed << std::setprecision(2) << "สั่ง " << item << " ราคา " << price << " บาท";
        notifier.send(os.str());
        count++;
        total += price;
    }
    void summary() const {
        std::cout << std::fixed << std::setprecision(2) << "รวม " << count << " รายการ ยอด " << total << " บาท\n";
    }
private:
    Notifier& notifier;
    int count{0};
    double total{0};
};

int main() {
    std::string channel;
    std::cin >> channel;
    EmailNotifier email;
    SmsNotifier sms;
    Notifier& n = (channel == "email") ? static_cast<Notifier&>(email) : sms;
    OrderService service(n);
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        std::string item;
        double price;
        std::cin >> item >> price;
        service.placeOrder(item, price);
    }
    service.summary();
    return 0;
}
`, wrong: [OOP + R`class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void send(const std::string& msg) = 0;
};

class EmailNotifier : public Notifier {
public:
    void send(const std::string& msg) override { std::cout << "[อีเมล] " << msg << "\n"; }
};

class SmsNotifier : public Notifier {
public:
    void send(const std::string& msg) override { std::cout << "[SMS] " << msg << "\n"; }
};

class OrderService {
public:
    explicit OrderService(Notifier& n) : notifier{n} {}
    void placeOrder(const std::string& item, double price) {
        std::ostringstream os;
        os << std::fixed << std::setprecision(2) << "สั่ง " << item << " ราคา " << price << " บาท";
        notifier.send(os.str());
        count++;
        total += price;
    }
    void summary() const {
        std::cout << std::fixed << std::setprecision(2) << "รวม " << count << " รายการ ยอด " << total << " บาท\n";
    }
private:
    Notifier& notifier;
    int count{0};
    double total{0};
};

int main() {
    std::string channel;
    std::cin >> channel;
    EmailNotifier email;
    OrderService service(email);
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        std::string item;
        double price;
        std::cin >> item >> price;
        service.placeOrder(item, price);
    }
    service.summary();
    return 0;
}
`] },
  "cppcomp/3": { sol: OOP + R`class Range {
public:
    Range(int s, int e) : start{s}, end{e}, length{end - start} {}
    void print() const {
        std::cout << start << " ถึง " << end << " ยาว " << length << "\n";
    }
private:
    int start;
    int end;
    int length;
};

int main() {
    int s, e;
    std::cin >> s >> e;
    Range r(s, e);
    r.print();
    return 0;
}
`, wrong: [OOP + R`class Range {
public:
    Range(int s, int e) : start{s}, end{e}, length{e + s} {}
    void print() const {
        std::cout << start << " ถึง " << end << " ยาว " << length << "\n";
    }
private:
    int start;
    int end;
    int length;
};

int main() {
    int s, e;
    std::cin >> s >> e;
    Range r(s, e);
    r.print();
    return 0;
}
`] },
  "cppcomp/4": { sol: CART("0.10"), wrong: [CART("0.01")] },
});

// ═══════════════ Stage 17–19 (Phase 4 ชุดที่ 3 · STL) ═══════════════
const STL = "#include <iostream>\n#include <iomanip>\n#include <algorithm>\n#include <array>\n#include <deque>\n#include <map>\n#include <numeric>\n#include <queue>\n#include <set>\n#include <sstream>\n#include <stack>\n#include <string>\n#include <unordered_map>\n#include <unordered_set>\n#include <utility>\n#include <vector>\n\n";
const S = body => STL + "int main() {\n" + body + "\n    return 0;\n}\n";
const STOCK = (sellCheck) => S(R`    std::vector<Item> stock;
    std::cout << std::fixed << std::setprecision(2);
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'a') {
            std::string name;
            int qty;
            double price;
            std::cin >> name >> qty >> price;
            int i = findItem(stock, name);
            if (i >= 0) stock[i].qty += qty;
            else stock.push_back(Item{name, qty, price});
        } else if (cmd == 's') {
            std::string name;
            int qty;
            std::cin >> name >> qty;
            int i = findItem(stock, name);
            if (i < 0) {
                std::cout << "ไม่มี " << name << "\n";
            } else if (` + sellCheck + R`) {
                std::cout << "มีไม่พอ (เหลือ " << stock[i].qty << ")\n";
            } else {
                stock[i].qty -= qty;
                std::cout << "ขาย " << name << " " << qty << " ชิ้น\n";
                if (stock[i].qty == 0) stock.erase(stock.begin() + i);
            }
        } else if (cmd == 'l') {
            if (stock.empty()) std::cout << "สต็อกว่าง\n";
            for (const Item& it : stock) std::cout << it.name << ": " << it.qty << " ชิ้น\n";
        } else if (cmd == 'v') {
            double total = 0;
            for (const Item& it : stock) total += it.qty * it.price;
            std::cout << "มูลค่ารวม: " << total << "\n";
        }
    }`).replace("int main() {", R`struct Item {
    std::string name;
    int qty{0};
    double price{0};
};

int findItem(const std::vector<Item>& s, const std::string& name) {
    for (int i = 0; i < static_cast<int>(s.size()); i++) {
        if (s[i].name == name) return i;
    }
    return -1;
}

int main() {`);
const LEADER = (cmp) => S(R`    std::map<std::string, int> best;
    std::set<std::pair<int, std::string>> ranking;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'a') {
            std::string name;
            int score;
            std::cin >> name >> score;
            auto it = best.find(name);
            if (it == best.end()) {
                best[name] = score;
                ranking.insert({-score, name});
            } else if (score ` + cmp + R` it->second) {
                ranking.erase({-it->second, name});
                it->second = score;
                ranking.insert({-score, name});
            }
        } else if (cmd == 't') {
            int k;
            std::cin >> k;
            if (ranking.empty()) std::cout << "ยังไม่มีผู้เล่น\n";
            int rank = 1;
            for (const auto& [neg, name] : ranking) {
                if (rank > k) break;
                std::cout << rank << ". " << name << " " << -neg << "\n";
                rank++;
            }
        } else if (cmd == 'r') {
            std::string name;
            std::cin >> name;
            if (best.find(name) == best.end()) {
                std::cout << "ไม่พบ " << name << "\n";
                continue;
            }
            int rank = 1;
            for (const auto& entry : ranking) {
                if (entry.second == name) break;
                rank++;
            }
            std::cout << name << " อยู่อันดับ " << rank << "\n";
        }
    }`);
const LOG = (tie) => S(R`    std::string line;
    std::map<std::string, int> levels;
    std::map<std::string, int> words;
    std::string firstErr, lastErr;
    while (std::getline(std::cin, line) && line != "END") {
        std::istringstream ss(line);
        std::string time, level, w;
        ss >> time >> level;
        levels[level]++;
        if (level == "ERROR") {
            if (firstErr.empty()) firstErr = time;
            lastErr = time;
        }
        while (ss >> w) words[w]++;
    }
    std::cout << "ERROR: " << levels["ERROR"] << " · WARN: " << levels["WARN"] << " · INFO: " << levels["INFO"] << "\n";
    if (firstErr.empty()) std::cout << "ไม่มี ERROR\n";
    else std::cout << "ERROR แรก: " << firstErr << " · สุดท้าย: " << lastErr << "\n";
    std::vector<std::pair<std::string, int>> list(words.begin(), words.end());
    std::sort(list.begin(), list.end(), [](const auto& a, const auto& b) {
        return a.second != b.second ? a.second > b.second : ` + tie + R`;
    });
    std::cout << "คำยอดนิยม: ";
    if (list.empty()) std::cout << "-";
    for (std::size_t i = 0; i < list.size() && i < 3; i++) {
        if (i > 0) std::cout << ", ";
        std::cout << list[i].first << " (" << list[i].second << ")";
    }
    std::cout << "\n";`);
Object.assign(module.exports, {
  // ── Stage 17 ──
  "cppseq/0": { sol: S(R`    std::vector<int> nums;
    int x;
    while (std::cin >> x && x != 0) nums.push_back(x);
    std::cout << "จำนวน: " << nums.size() << "\n";
    std::cout << "ย้อนกลับ:";
    if (nums.empty()) std::cout << " -";
    for (int i = static_cast<int>(nums.size()) - 1; i >= 0; i--) std::cout << " " << nums[i];
    std::cout << "\n";`), wrong: [S(R`    std::vector<int> nums;
    int x;
    while (std::cin >> x && x != 0) nums.push_back(x);
    std::cout << "จำนวน: " << nums.size() << "\n";
    std::cout << "ย้อนกลับ:";
    if (nums.empty()) std::cout << " -";
    for (int v : nums) std::cout << " " << v;
    std::cout << "\n";`)] },
  "cppseq/1": { sol: S(R`    std::vector<int> v;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'a') {
            int x;
            std::cin >> x;
            v.push_back(x);
        } else if (cmd == 'p') {
            if (v.empty()) {
                std::cout << "ว่าง\n";
            } else {
                std::cout << v.back() << "\n";
                v.pop_back();
            }
        } else if (cmd == 's') {
            std::cout << "ขนาด: " << v.size() << "\n";
        }
    }`), wrong: [S(R`    std::vector<int> v;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'a') {
            int x;
            std::cin >> x;
            v.push_back(x);
        } else if (cmd == 'p') {
            if (v.empty()) {
                std::cout << "ว่าง\n";
            } else {
                std::cout << v.front() << "\n";
                v.erase(v.begin());
            }
        } else if (cmd == 's') {
            std::cout << "ขนาด: " << v.size() << "\n";
        }
    }`)] },
  "cppseq/2": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    for (std::size_t i = 0; i < v.size(); ) {
        if (v[i] % 2 == 0) v.erase(v.begin() + i);
        else i++;
    }
    if (v.empty()) std::cout << "-";
    for (int x : v) std::cout << x << " ";
    std::cout << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    for (std::size_t i = 0; i < v.size(); ) {
        if (v[i] % 2 == 1) i++;
        else v.erase(v.begin() + i);
    }
    if (v.empty()) std::cout << "-";
    for (int x : v) std::cout << x << " ";
    std::cout << "\n";`)] },
  "cppseq/3": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        int p;
        std::cin >> p;
        if (p >= 1 && p <= static_cast<int>(v.size())) std::cout << v[p - 1] << "\n";
        else std::cout << "นอกขอบเขต\n";
    }`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        int p;
        std::cin >> p;
        if (p <= static_cast<int>(v.size()) && p != 0) std::cout << v[p - 1] << "\n";
        else std::cout << "นอกขอบเขต\n";
    }`)] },
  "cppseq/4": { sol: S(R`    int n;
    std::cin >> n;
    std::deque<int> pile;
    for (int i = 0; i < n; i++) {
        int x;
        std::cin >> x;
        pile.push_front(x);
    }
    std::cout << "ขนาด: " << pile.size() << "\n";
    std::cout << "หน้า: " << pile[0] << " " << pile[1] << " " << pile[2] << "\n";
    std::cout << "ท้าย: " << pile[n - 3] << " " << pile[n - 2] << " " << pile[n - 1] << "\n";`), wrong: [] },
  "cppseq/5": { sol: S(R`    const std::array<std::string, 7> days{"จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"};
    std::array<int, 7> temps{};
    for (int& t : temps) std::cin >> t;
    std::size_t hot = 0;
    int sum = 0;
    for (std::size_t i = 0; i < temps.size(); i++) {
        if (temps[i] > temps[hot]) hot = i;
        sum += temps[i];
    }
    std::cout << "ร้อนที่สุด: " << days[hot] << " (" << temps[hot] << " องศา)\n";
    std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << static_cast<double>(sum) / 7 << " องศา\n";`), wrong: [S(R`    const std::array<std::string, 7> days{"จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"};
    std::array<int, 7> temps{};
    for (int& t : temps) std::cin >> t;
    std::size_t hot = 0;
    int sum = 0;
    for (std::size_t i = 0; i < temps.size(); i++) {
        if (temps[i] >= temps[hot]) hot = i;
        sum += temps[i];
    }
    std::cout << "ร้อนที่สุด: " << days[hot] << " (" << temps[hot] << " องศา)\n";
    std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << static_cast<double>(sum) / 7 << " องศา\n";`)] },
  "cppseq/6": { sol: STOCK("qty > stock[i].qty"), wrong: [STOCK("qty >= stock[i].qty")] },
  // ── Stage 18 ──
  "cppassoc/0": { sol: S(R`    std::string s;
    std::getline(std::cin, s);
    std::stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            char want = c == ')' ? '(' : (c == ']' ? '[' : '{');
            if (st.empty() || st.top() != want) {
                ok = false;
                break;
            }
            st.pop();
        }
    }
    std::cout << (ok && st.empty() ? "สมดุล" : "ไม่สมดุล") << "\n";`), wrong: [S(R`    std::string s;
    std::getline(std::cin, s);
    int open = 0, close = 0;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') open++;
        else if (c == ')' || c == ']' || c == '}') close++;
    }
    std::cout << (open == close ? "สมดุล" : "ไม่สมดุล") << "\n";`)] },
  "cppassoc/1": { sol: S(R`    std::queue<std::string> line;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'j') {
            std::string name;
            std::cin >> name;
            line.push(name);
        } else if (cmd == 's') {
            if (line.empty()) {
                std::cout << "คิวว่าง\n";
            } else {
                std::cout << "บริการ " << line.front() << "\n";
                line.pop();
            }
        } else if (cmd == 'c') {
            std::cout << "รอ " << line.size() << " คน\n";
        }
    }`), wrong: [S(R`    std::stack<std::string> line;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'j') {
            std::string name;
            std::cin >> name;
            line.push(name);
        } else if (cmd == 's') {
            if (line.empty()) {
                std::cout << "คิวว่าง\n";
            } else {
                std::cout << "บริการ " << line.top() << "\n";
                line.pop();
            }
        } else if (cmd == 'c') {
            std::cout << "รอ " << line.size() << " คน\n";
        }
    }`)] },
  "cppassoc/2": { sol: S(R`    std::map<std::string, int> freq;
    std::string w;
    while (std::cin >> w) freq[w]++;
    for (const auto& [word, n] : freq) std::cout << word << ": " << n << "\n";`), wrong: [S(R`    std::unordered_map<std::string, int> freq;
    std::vector<std::string> order;
    std::string w;
    while (std::cin >> w) {
        if (freq[w]++ == 0) order.push_back(w);
    }
    for (const auto& word : order) std::cout << word << ": " << freq[word] << "\n";`)] },
  "cppassoc/3": { sol: S(R`    int n;
    std::cin >> n;
    std::map<std::string, int> members;
    for (int i = 0; i < n; i++) {
        std::string name;
        int pts;
        std::cin >> name >> pts;
        members[name] = pts;
    }
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        std::string name;
        std::cin >> name;
        auto it = members.find(name);
        if (it == members.end()) std::cout << name << ": ไม่ใช่สมาชิก\n";
        else std::cout << name << ": " << it->second << "\n";
    }
    std::cout << "จำนวนสมาชิก: " << members.size() << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::map<std::string, int> members;
    for (int i = 0; i < n; i++) {
        std::string name;
        int pts;
        std::cin >> name >> pts;
        members[name] = pts;
    }
    std::size_t real = members.size();
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        std::string name;
        std::cin >> name;
        if (members[name] == 0) std::cout << name << ": ไม่ใช่สมาชิก\n";
        else std::cout << name << ": " << members[name] << "\n";
    }
    std::cout << "จำนวนสมาชิก: " << real << "\n";`)] },
  "cppassoc/4": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<long long> a(n);
    for (int i = 0; i < n; i++) std::cin >> a[i];
    long long target;
    std::cin >> target;
    bool found = false;
    std::unordered_set<long long> seen;
    seen.reserve(static_cast<std::size_t>(n) * 2);
    for (long long x : a) {
        if (seen.count(target - x)) {
            found = true;
            break;
        }
        seen.insert(x);
    }
    std::cout << (found ? "มี" : "ไม่มี") << "\n";`), wrong: [] },
  "cppassoc/5": { sol: S(R`    int n;
    std::cin >> n;
    std::priority_queue<int> pq;
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        pq.push(s);
    }
    int k;
    std::cin >> k;
    bool any = false;
    for (int i = 0; i < k && !pq.empty(); i++) {
        if (any) std::cout << " ";
        std::cout << pq.top();
        pq.pop();
        any = true;
    }
    if (!any) std::cout << "-";
    std::cout << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::priority_queue<int> pq;
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        pq.push(s);
    }
    int k;
    std::cin >> k;
    bool any = false;
    for (int i = 0; i < k; i++) {
        if (any) std::cout << " ";
        std::cout << (pq.empty() ? 0 : pq.top());
        if (!pq.empty()) pq.pop();
        any = true;
    }
    if (!any) std::cout << "-";
    std::cout << "\n";`)] },
  "cppassoc/6": { sol: LEADER(">"), wrong: [LEADER("!=")] },
  // ── Stage 19 ──
  "cppalgo/0": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
    if (v.empty()) std::cout << "-";
    for (std::size_t i = 0; i < v.size() && i < 3; i++) std::cout << v[i] << " ";
    std::cout << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    std::sort(v.begin(), v.end());
    if (v.empty()) std::cout << "-";
    for (std::size_t i = 0; i < v.size() && i < 3; i++) std::cout << v[i] << " ";
    std::cout << "\n";`)] },
  "cppalgo/1": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    int total = std::accumulate(v.begin(), v.end(), 0);
    auto passed = std::count_if(v.begin(), v.end(), [](int s) { return s >= 50; });
    int best = *std::max_element(v.begin(), v.end());
    std::cout << "รวม: " << total << "\n";
    std::cout << "ผ่าน (≥ 50): " << passed << " คน\n";
    std::cout << "สูงสุด: " << best << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    int total = std::accumulate(v.begin(), v.end(), 0);
    auto passed = std::count_if(v.begin(), v.end(), [](int s) { return s > 50; });
    int best = *std::max_element(v.begin(), v.end());
    std::cout << "รวม: " << total << "\n";
    std::cout << "ผ่าน (≥ 50): " << passed << " คน\n";
    std::cout << "สูงสุด: " << best << "\n";`)] },
  "cppalgo/2": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> a(n);
    for (int& x : a) std::cin >> x;
    std::sort(a.begin(), a.end());
    auto last = std::unique(a.begin(), a.end());
    std::cout << "ค่าที่ไม่ซ้ำ: " << (last - a.begin()) << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> a(n);
    for (int& x : a) std::cin >> x;
    auto last = std::unique(a.begin(), a.end());
    std::cout << "ค่าที่ไม่ซ้ำ: " << (last - a.begin()) << "\n";`)] },
  "cppalgo/3": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    std::sort(v.begin(), v.end());
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        int x;
        std::cin >> x;
        std::cout << (std::binary_search(v.begin(), v.end(), x) ? "พบ" : "ไม่พบ") << "\n";
    }`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        int x;
        std::cin >> x;
        std::cout << (std::binary_search(v.begin(), v.end(), x) ? "พบ" : "ไม่พบ") << "\n";
    }`)] },
  "cppalgo/4": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    int q;
    std::cin >> q;
    long long sum = 0;
    for (int i = 0; i < q; i++) {
        int x;
        std::cin >> x;
        auto it = std::lower_bound(v.begin(), v.end(), x);
        sum += (it - v.begin());
    }
    std::cout << "ผลรวมตำแหน่ง: " << sum << "\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    int q;
    std::cin >> q;
    long long sum = 0;
    for (int i = 0; i < q; i++) {
        int x;
        std::cin >> x;
        auto it = std::upper_bound(v.begin(), v.end(), x);
        sum += (it - v.begin());
    }
    std::cout << "ผลรวมตำแหน่ง: " << std::lower_bound(v.begin(), v.begin(), 0) - v.begin() + sum << "\n";`)] },
  "cppalgo/5": { sol: S(R`    int n;
    std::cin >> n;
    std::vector<int> t(n);
    for (int& x : t) std::cin >> x;
    int best = *std::max_element(t.begin(), t.end());
    long long sum = std::accumulate(t.begin(), t.end(), 0LL);
    auto hot = std::count_if(t.begin(), t.end(), [](int x) { return x >= 35; });
    std::cout << "สูงสุด: " << best << "\n";
    std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << static_cast<double>(sum) / n << "\n";
    std::cout << "วันที่ร้อน (≥ 35): " << hot << " วัน\n";`), wrong: [S(R`    int n;
    std::cin >> n;
    std::vector<int> t(n);
    for (int& x : t) std::cin >> x;
    int best = *std::max_element(t.begin(), t.end());
    long long sum = std::accumulate(t.begin(), t.end(), 0);
    auto hot = std::count_if(t.begin(), t.end(), [](int x) { return x >= 35; });
    std::cout << "สูงสุด: " << best << "\n";
    std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << static_cast<double>(sum / n) << "\n";
    std::cout << "วันที่ร้อน (≥ 35): " << hot << " วัน\n";`)] },
  "cppalgo/6": { sol: LOG("a.first < b.first"), wrong: [LOG("a.first > b.first")] },
});

// ═══════════════ Stage 20–22 (Phase 5 ชุดที่ 1) ═══════════════
const MOD = "#include <iostream>\n#include <iomanip>\n#include <array>\n#include <concepts>\n#include <map>\n#include <memory>\n#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n#include <variant>\n#include <vector>\n\n";
const LIGHT = (redNext) => MOD + R`enum class Light { Red, Yellow, Green };

Light next(Light l) {
    switch (l) {
        case Light::Red: return ` + redNext + R`;
        case Light::Green: return Light::Yellow;
        case Light::Yellow: return Light::Red;
    }
    return Light::Red;
}

Light fromWord(const std::string& w) {
    if (w == "red") return Light::Red;
    if (w == "yellow") return Light::Yellow;
    return Light::Green;
}

std::string toThai(Light l) {
    switch (l) {
        case Light::Red: return "แดง";
        case Light::Yellow: return "เหลือง";
        case Light::Green: return "เขียว";
    }
    return "";
}

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string w;
        std::cin >> w;
        std::cout << toThai(next(fromWord(w))) << "\n";
    }
    return 0;
}
`;
const AGE = (limitCheck) => MOD + R`std::optional<int> parseAge(const std::string& text) {
    if (text.empty()) return std::nullopt;
    int value = 0;
    for (char c : text) {
        if (c < '0' || c > '9') return std::nullopt;
        value = value * 10 + (c - '0');
        if (value > ` + limitCheck + R`) return std::nullopt;
    }
    return value;
}

int main() {
    std::string line;
    while (std::getline(std::cin, line)) {
        auto age = parseAge(line);
        if (age) std::cout << "อายุ: " << *age << "\n";
        else std::cout << "ไม่ถูกต้อง\n";
    }
    return 0;
}
`;
const CONFIG = (dblFmt) => MOD + R`using Value = std::variant<int, double, std::string>;

void show(const std::string& name, const Value& v) {
    std::cout << name << " = ";
    if (std::holds_alternative<int>(v)) std::cout << std::get<int>(v) << " (int)";
    else if (std::holds_alternative<double>(v)) std::cout << ` + dblFmt + R` << std::get<double>(v) << " (double)";
    else std::cout << "\"" << std::get<std::string>(v) << "\" (string)";
    std::cout << "\n";
}

int main() {
    std::map<std::string, Value> config;
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        std::string name;
        char type;
        std::cin >> name >> type;
        if (type == 'i') { int v; std::cin >> v; config[name] = v; }
        else if (type == 'd') { double v; std::cin >> v; config[name] = v; }
        else { std::string v; std::cin >> v; config[name] = v; }
    }
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        std::string name;
        std::cin >> name;
        auto it = config.find(name);
        if (it == config.end()) std::cout << "ไม่พบ " << name << "\n";
        else show(name, it->second);
    }
    return 0;
}
`;
const BUF = (copyBody) => MOD + R`class Buffer {
public:
    explicit Buffer(int n) : size{n}, data{new int[n]{}} {}
` + copyBody + R`
    ~Buffer() { delete[] data; }
    int& at(int i) { return data[i]; }
    int get(int i) const { return data[i]; }
    int count() const { return size; }
private:
    int size;
    int* data;
};

void print(const char* label, const Buffer& b) {
    std::cout << label;
    for (int i = 0; i < b.count(); i++) std::cout << " " << b.get(i);
    std::cout << "\n";
}

int main() {
    int n;
    std::cin >> n;
    Buffer original(n);
    for (int i = 0; i < n; i++) std::cin >> original.at(i);
    Buffer copy = original;
    for (int i = 0; i < n; i++) copy.at(i) += 100;
    print("ต้นฉบับ:", original);
    print("สำเนา:", copy);
    return 0;
}
`;
const SAMPLES = (moveBody) => MOD + R`class Samples {
public:
    explicit Samples(int n) : size{n}, data{new int[n]{}} {}
    Samples(Samples&& other) noexcept : size{other.size}, data{other.data} {
` + moveBody + R`
    }
    Samples(const Samples&) = delete;
    Samples& operator=(const Samples&) = delete;
    ~Samples() { delete[] data; }
    int& at(int i) { return data[i]; }
    int count() const { return size; }
    long long sum() const {
        long long s = 0;
        for (int i = 0; i < size; i++) s += data[i];
        return s;
    }
private:
    int size{0};
    int* data{nullptr};
};

int main() {
    int n;
    std::cin >> n;
    Samples a(n);
    for (int i = 0; i < n; i++) std::cin >> a.at(i);
    Samples b(std::move(a));
    std::cout << "a: " << a.count() << " ตัว\n";
    std::cout << "b: " << b.count() << " ตัว (ผลรวม " << b.sum() << ")\n";
    return 0;
}
`;
const CACHE = (statusExpr) => MOD + R`class Document {
public:
    explicit Document(int id) : id{id} {}
    ~Document() { std::cout << "ปล่อย " << id << "\n"; }
private:
    int id;
};

int main() {
    std::map<int, std::weak_ptr<Document>> cache;
    std::map<int, std::vector<std::shared_ptr<Document>>> openBy;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        int id;
        std::cin >> id;
        if (cmd == 'o') {
            std::shared_ptr<Document> doc = cache[id].lock();
            if (doc) {
                std::cout << "ใช้จากแคช " << id << "\n";
            } else {
                doc = std::make_shared<Document>(id);
                cache[id] = doc;
                std::cout << "โหลด " << id << "\n";
            }
            openBy[id].push_back(doc);
        } else if (cmd == 'c') {
            auto& users = openBy[id];
            if (users.empty()) std::cout << id << " ไม่ได้เปิดอยู่\n";
            else users.pop_back();
        } else if (cmd == 's') {
            if (auto doc = cache[id].lock()) std::cout << id << ": ผู้ใช้ " << ` + statusExpr + R` << " คน\n";
            else std::cout << id << ": ไม่อยู่ในหน่วยความจำ\n";
        }
    }
    return 0;
}
`;
const RING = (pushFull) => MOD + R`template <typename T, std::size_t N>
class RingBuffer {
public:
    void push(const T& v) {
        if (count < N) {
            items[(start + count) % N] = v;
            count++;
        } else {
` + pushFull + R`
        }
    }
    void print() const {
        if (count == 0) std::cout << "-";
        for (std::size_t i = 0; i < count; i++) {
            if (i > 0) std::cout << " ";
            std::cout << items[(start + i) % N];
        }
        std::cout << "\n";
    }
    std::size_t size() const { return count; }
private:
    std::array<T, N> items{};
    std::size_t start{0};
    std::size_t count{0};
};

int main() {
    RingBuffer<int, 3> nums;
    RingBuffer<std::string, 3> words;
    std::string cmd;
    while (std::cin >> cmd && cmd != "q") {
        if (cmd == "pi") { int v; std::cin >> v; nums.push(v); }
        else if (cmd == "ps") { std::string w; std::cin >> w; words.push(w); }
        else if (cmd == "li") nums.print();
        else if (cmd == "ls") words.print();
        else if (cmd == "ci") std::cout << "จำนวน: " << nums.size() << "\n";
        else if (cmd == "cs") std::cout << "จำนวน: " << words.size() << "\n";
    }
    return 0;
}
`;
const GCD = (absPart) => MOD + R`template <std::integral T>
T gcdOf(T a, T b) {
` + absPart + R`
    while (b != 0) {
        T t = a % b;
        a = b;
        b = t;
    }
    return a;
}

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        long long a, b;
        std::cin >> a >> b;
        std::cout << gcdOf(a, b) << "\n";
    }
    return 0;
}
`;
Object.assign(module.exports, {
  "cppmodern/0": { sol: LIGHT("Light::Green"), wrong: [LIGHT("Light::Yellow")] },
  "cppmodern/1": { sol: AGE("150"), wrong: [AGE("149")] },
  "cppmodern/2": { sol: MOD + R`constexpr int FULL_SCORE = 100;

void printRow(std::string_view name, int score) {
    std::cout << "[" << name << "] " << score << "/" << FULL_SCORE;
    if (score == FULL_SCORE) std::cout << " ★";
    std::cout << "\n";
}

int main() {
    int k;
    std::cin >> k;
    std::vector<std::pair<std::string, int>> rows;
    for (int i = 0; i < k; i++) {
        std::string name;
        int score;
        std::cin >> name >> score;
        rows.push_back({name, score});
    }
    for (const auto& [name, score] : rows) {
        printRow(name, score);
    }
    return 0;
}
`, wrong: [MOD + R`constexpr int FULL_SCORE = 100;

void printRow(std::string_view name, int score) {
    std::cout << "[" << name << "] " << score << "/" << FULL_SCORE;
    if (score >= FULL_SCORE - 1) std::cout << " ★";
    std::cout << "\n";
}

int main() {
    int k;
    std::cin >> k;
    std::vector<std::pair<std::string, int>> rows;
    for (int i = 0; i < k; i++) {
        std::string name;
        int score;
        std::cin >> name >> score;
        rows.push_back({name, score});
    }
    for (const auto& [name, score] : rows) {
        printRow(name, score);
    }
    return 0;
}
`] },
  "cppmodern/3": { sol: CONFIG("std::fixed << std::setprecision(2)"), wrong: [CONFIG("std::setprecision(2)")] },
  "cppown/0": { sol: MOD + R`class Playlist {
public:
    void add(const std::string& s) { songs.push_back(s); }
    std::size_t count() const { return songs.size(); }
    std::string last() const { return songs.back(); }
private:
    std::vector<std::string> songs;
};

int main() {
    int n;
    std::cin >> n;
    Playlist original;
    for (int i = 0; i < n; i++) {
        std::string s;
        std::cin >> s;
        original.add(s);
    }
    std::string extra;
    std::cin >> extra;
    Playlist copy = original;
    copy.add(extra);
    std::cout << "ต้นฉบับ: " << original.count() << " เพลง\n";
    std::cout << "สำเนา: " << copy.count() << " เพลง (ล่าสุด: " << copy.last() << ")\n";
    return 0;
}
`, wrong: [MOD + R`class Playlist {
public:
    void add(const std::string& s) { songs->push_back(s); }
    std::size_t count() const { return songs->size(); }
    std::string last() const { return songs->back(); }
private:
    std::shared_ptr<std::vector<std::string>> songs = std::make_shared<std::vector<std::string>>();
};

int main() {
    int n;
    std::cin >> n;
    Playlist original;
    for (int i = 0; i < n; i++) {
        std::string s;
        std::cin >> s;
        original.add(s);
    }
    std::string extra;
    std::cin >> extra;
    Playlist copy = original;
    copy.add(extra);
    std::cout << "ต้นฉบับ: " << original.count() << " เพลง\n";
    std::cout << "สำเนา: " << copy.count() << " เพลง (ล่าสุด: " << copy.last() << ")\n";
    return 0;
}
`] },
  "cppown/1": { sol: BUF(R`    Buffer(const Buffer& other) : size{other.size}, data{new int[other.size]{}} {
        for (int i = 0; i < size; i++) data[i] = other.data[i];
    }
    Buffer& operator=(const Buffer& other) {
        if (this != &other) {
            int* fresh = new int[other.size]{};
            for (int i = 0; i < other.size; i++) fresh[i] = other.data[i];
            delete[] data;
            data = fresh;
            size = other.size;
        }
        return *this;
    }`), wrong: [BUF(R`    Buffer(const Buffer& other) : size{other.size}, data{new int[other.size]{}} {}
    Buffer& operator=(const Buffer&) = delete;`)] },
  "cppown/2": { sol: SAMPLES(R`        other.data = nullptr;
        other.size = 0;`), wrong: [SAMPLES(R`        other.size = 0;
        data = new int[size]{};`)] },
  "cppown/3": { sol: CACHE("openBy[id].size()"), wrong: [CACHE("doc.use_count()")] },
  "cpptmpl/0": { sol: MOD + R`template <typename T>
T maxOf(const T& a, const T& b) {
    return a < b ? b : a;
}

int main() {
    int k;
    std::cin >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char t;
        std::cin >> t;
        if (t == 'i') { int a, b; std::cin >> a >> b; std::cout << maxOf(a, b) << "\n"; }
        else if (t == 'd') { double a, b; std::cin >> a >> b; std::cout << maxOf(a, b) << "\n"; }
        else { std::string a, b; std::cin >> a >> b; std::cout << maxOf(a, b) << "\n"; }
    }
    return 0;
}
`, wrong: [MOD + R`template <typename T>
T maxOf(const T& a, const T& b) {
    return a < b ? b : a;
}

int main() {
    int k;
    std::cin >> k;
    std::cout << std::fixed << std::setprecision(2);
    for (int i = 0; i < k; i++) {
        char t;
        std::cin >> t;
        if (t == 'i') { int a, b; std::cin >> a >> b; std::cout << maxOf(a, b) << "\n"; }
        else if (t == 'd') { double a, b; std::cin >> a >> b; std::cout << maxOf(static_cast<int>(a), static_cast<int>(b)) << "\n"; }
        else { std::string a, b; std::cin >> a >> b; std::cout << maxOf(a, b) << "\n"; }
    }
    return 0;
}
`] },
  "cpptmpl/1": { sol: MOD + R`template <typename T>
class Stack {
public:
    void push(const T& v) { items.push_back(v); }
    bool empty() const { return items.empty(); }
    T pop() {
        T v = items.back();
        items.pop_back();
        return v;
    }
private:
    std::vector<T> items;
};

int main() {
    Stack<int> ints;
    Stack<std::string> words;
    std::string cmd;
    while (std::cin >> cmd && cmd != "q") {
        if (cmd == "pi") { int v; std::cin >> v; ints.push(v); }
        else if (cmd == "ps") { std::string w; std::cin >> w; words.push(w); }
        else if (cmd == "oi") { if (ints.empty()) std::cout << "ว่าง\n"; else std::cout << ints.pop() << "\n"; }
        else if (cmd == "os") { if (words.empty()) std::cout << "ว่าง\n"; else std::cout << words.pop() << "\n"; }
    }
    return 0;
}
`, wrong: [MOD + R`template <typename T>
class Stack {
public:
    void push(const T& v) { items.push_back(v); }
    bool empty() const { return items.empty(); }
    T pop() {
        T v = items.front();
        items.erase(items.begin());
        return v;
    }
private:
    std::vector<T> items;
};

int main() {
    Stack<int> ints;
    Stack<std::string> words;
    std::string cmd;
    while (std::cin >> cmd && cmd != "q") {
        if (cmd == "pi") { int v; std::cin >> v; ints.push(v); }
        else if (cmd == "ps") { std::string w; std::cin >> w; words.push(w); }
        else if (cmd == "oi") { if (ints.empty()) std::cout << "ว่าง\n"; else std::cout << ints.pop() << "\n"; }
        else if (cmd == "os") { if (words.empty()) std::cout << "ว่าง\n"; else std::cout << words.pop() << "\n"; }
    }
    return 0;
}
`] },
  "cpptmpl/2": { sol: GCD(R`    if (a < 0) a = -a;
    if (b < 0) b = -b;`), wrong: [GCD(R`    if (a < 0) a = -a;`), GCD(R`    if (a < 0) a = -a;
    if (b < 0) b = -b;
    if (b == 0) return 1;`)] },
  "cpptmpl/3": { sol: RING(R`            items[start] = v;
            start = (start + 1) % N;`), wrong: [RING(R`            items[(start + N - 1) % N] = v;`)] },
});

// ═══════════════ Stage 23–25 (Phase 5 ชุดที่ 2) ═══════════════
const ADV = "#include <iostream>\n#include <iomanip>\n#include <algorithm>\n#include <charconv>\n#include <climits>\n#include <fstream>\n#include <map>\n#include <memory>\n#include <optional>\n#include <queue>\n#include <sstream>\n#include <string>\n#include <utility>\n#include <vector>\n\n";
const DIV = (overflowCheck) => ADV + R`enum class DivError { None, DivideByZero, Overflow };

struct DivResult {
    int value{0};
    DivError error{DivError::None};
};

DivResult divide(int a, int b) {
    if (b == 0) return {0, DivError::DivideByZero};
    if (` + overflowCheck + R`) return {0, DivError::Overflow};
    return {a / b, DivError::None};
}

int main() {
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        int a, b;
        std::cin >> a >> b;
        DivResult r = divide(a, b);
        switch (r.error) {
            case DivError::None: std::cout << a << " / " << b << " = " << r.value << "\n"; break;
            case DivError::DivideByZero: std::cout << "ข้อผิดพลาด: หารด้วยศูนย์\n"; break;
            case DivError::Overflow: std::cout << "ข้อผิดพลาด: ผลลัพธ์ล้น\n"; break;
        }
    }
    return 0;
}
`;
const READF = (cond) => ADV + R`int main() {
    std::string name;
    std::cin >> name;
    std::ifstream in("/data/" + name);
    if (!in.is_open()) {
        std::cout << "เปิดไฟล์ไม่ได้: " << name << "\n";
        return 0;
    }
    int x = 0, count = 0;
    long long sum = 0;
    while (` + cond + R`) {
        sum += x;
        count++;
    }
    std::cout << "จำนวน: " << count << "\n";
    if (count == 0) std::cout << "เฉลี่ย: -\n";
    else std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << static_cast<double>(sum) / count << "\n";
    return 0;
}
`;
const CSV = (minVal) => ADV + R`std::optional<int> parsePositive(const std::string& s) {
    int value = 0;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), value);
    if (ec != std::errc{} || ptr != s.data() + s.size() || value < ` + minVal + R`) return std::nullopt;
    return value;
}

std::vector<std::string> splitCsv(const std::string& line) {
    std::vector<std::string> fields;
    std::stringstream ss(line);
    std::string f;
    while (std::getline(ss, f, ',')) fields.push_back(f);
    return fields;
}

int main() {
    std::string name;
    std::cin >> name;
    std::ifstream in("/data/" + name);
    if (!in.is_open()) {
        std::cout << "เปิดไฟล์ไม่ได้: " << name << "\n";
        return 0;
    }
    std::string line;
    std::getline(in, line);
    int lineNo = 1, valid = 0;
    std::vector<int> errors;
    std::map<std::string, std::pair<int, long long>> totals;
    long long grand = 0;
    while (std::getline(in, line)) {
        lineNo++;
        if (line.empty()) continue;
        auto f = splitCsv(line);
        std::optional<int> qty, price;
        if (f.size() == 4) {
            qty = parsePositive(f[2]);
            price = parsePositive(f[3]);
        }
        if (!qty || !price) {
            errors.push_back(lineNo);
            continue;
        }
        valid++;
        auto& t = totals[f[1]];
        t.first += *qty;
        t.second += static_cast<long long>(*qty) * *price;
        grand += static_cast<long long>(*qty) * *price;
    }
    std::cout << "รายการถูกต้อง: " << valid << " · ผิดพลาด: " << errors.size() << "\n";
    for (const auto& [item, t] : totals) std::cout << item << ": " << t.first << " ชิ้น · " << t.second << " บาท\n";
    std::cout << "ยอดรวม: " << grand << " บาท\n";
    std::cout << "บรรทัดผิดพลาด: ";
    if (errors.empty()) std::cout << "-";
    for (std::size_t i = 0; i < errors.size(); i++) std::cout << (i ? ", " : "") << errors[i];
    std::cout << "\n";
    return 0;
}
`;
const LIST = (removeBody) => ADV + R`class IntList {
public:
    void pushFront(int v) {
        auto node = std::make_unique<Node>();
        node->value = v;
        node->next = std::move(head);
        head = std::move(node);
    }
    void pushBack(int v) {
        std::unique_ptr<Node>* cur = &head;
        while (*cur) cur = &(*cur)->next;
        *cur = std::make_unique<Node>();
        (*cur)->value = v;
    }
    bool remove(int v) {
` + removeBody + R`
    }
    void print() const {
        if (!head) { std::cout << "(ว่าง)\n"; return; }
        for (const Node* n = head.get(); n; n = n->next.get()) {
            std::cout << n->value << (n->next ? " -> " : "\n");
        }
    }
private:
    struct Node {
        int value{0};
        std::unique_ptr<Node> next;
    };
    std::unique_ptr<Node> head;
};

int main() {
    IntList list;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'p') { list.print(); continue; }
        int v;
        std::cin >> v;
        if (cmd == 'f') list.pushFront(v);
        else if (cmd == 'b') list.pushBack(v);
        else if (cmd == 'r' && !list.remove(v)) std::cout << "ไม่พบ " << v << "\n";
    }
    return 0;
}
`;
const BST = (dupCmp) => ADV + R`struct Node {
    int value{0};
    std::unique_ptr<Node> left, right;
};

void insert(std::unique_ptr<Node>& node, int v) {
    if (!node) {
        node = std::make_unique<Node>();
        node->value = v;
    } else if (v < node->value) {
        insert(node->left, v);
    } else if (v ` + dupCmp + R` node->value) {
        insert(node->right, v);
    }
}

void printInOrder(const Node* node, bool& first) {
    if (!node) return;
    printInOrder(node->left.get(), first);
    std::cout << (first ? "" : " ") << node->value;
    first = false;
    printInOrder(node->right.get(), first);
}

int height(const Node* node) {
    if (!node) return 0;
    return 1 + std::max(height(node->left.get()), height(node->right.get()));
}

bool contains(const Node* node, int v) {
    if (!node) return false;
    if (v == node->value) return true;
    return v < node->value ? contains(node->left.get(), v) : contains(node->right.get(), v);
}

int main() {
    std::unique_ptr<Node> root;
    int n;
    std::cin >> n;
    for (int i = 0; i < n; i++) {
        int v;
        std::cin >> v;
        insert(root, v);
    }
    std::cout << "เรียงลำดับ: ";
    if (!root) std::cout << "-";
    bool first = true;
    printInOrder(root.get(), first);
    std::cout << "\n";
    std::cout << "ความสูง: " << height(root.get()) << "\n";
    int q;
    std::cin >> q;
    for (int i = 0; i < q; i++) {
        int v;
        std::cin >> v;
        std::cout << (contains(root.get(), v) ? "มี" : "ไม่มี") << "\n";
    }
    return 0;
}
`;
const HASH = (idx) => ADV + R`class HashTable {
public:
    void put(int key, const std::string& value) {
        auto& bucket = buckets[indexOf(key)];
        for (auto& entry : bucket) {
            if (entry.first == key) { entry.second = value; return; }
        }
        bucket.push_back({key, value});
    }
    const std::string* get(int key) const {
        for (const auto& entry : buckets[indexOf(key)]) {
            if (entry.first == key) return &entry.second;
        }
        return nullptr;
    }
private:
    static constexpr int SIZE = 7;
    std::vector<std::vector<std::pair<int, std::string>>> buckets = std::vector<std::vector<std::pair<int, std::string>>>(SIZE);
    int indexOf(int key) const { return ` + idx + R`; }
};

int main() {
    HashTable table;
    std::string cmd;
    while (std::cin >> cmd && cmd != "q") {
        int key;
        std::cin >> key;
        if (cmd == "put") {
            std::string v;
            std::cin >> v;
            table.put(key, v);
        } else if (const std::string* v = table.get(key)) {
            std::cout << *v << "\n";
        } else {
            std::cout << "ไม่พบ " << key << "\n";
        }
    }
    return 0;
}
`;
const HEAP = (childPick) => ADV + R`class MinHeap {
public:
    void push(int v) {
        data.push_back(v);
        std::size_t i = data.size() - 1;
        while (i > 0 && data[i] < data[(i - 1) / 2]) {
            std::swap(data[i], data[(i - 1) / 2]);
            i = (i - 1) / 2;
        }
    }
    int pop() {
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        std::size_t i = 0;
        while (true) {
            std::size_t l = 2 * i + 1, r = 2 * i + 2, best = i;
` + childPick + R`
            if (best == i) break;
            std::swap(data[i], data[best]);
            i = best;
        }
        return top;
    }
    int top() const { return data[0]; }
    bool empty() const { return data.empty(); }
    std::size_t size() const { return data.size(); }
private:
    std::vector<int> data;
};

int main() {
    MinHeap heap;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'a') { int v; std::cin >> v; heap.push(v); }
        else if (cmd == 'p') { if (heap.empty()) std::cout << "ว่าง\n"; else std::cout << heap.pop() << "\n"; }
        else if (cmd == 't') { if (heap.empty()) std::cout << "ว่าง\n"; else std::cout << heap.top() << "\n"; }
        else if (cmd == 's') std::cout << "ขนาด: " << heap.size() << "\n";
    }
    return 0;
}
`;
const BFS = (diag) => ADV + R`int main() {
    int rows, cols;
    std::cin >> rows >> cols;
    std::vector<std::string> grid(rows);
    for (auto& line : grid) std::cin >> line;
    std::vector<std::vector<int>> dist(rows, std::vector<int>(cols, -1));
    std::queue<std::pair<int, int>> q;
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (grid[r][c] == 'S') { dist[r][c] = 0; q.push({r, c}); }
    const int dr[] = {1, -1, 0, 0` + diag + R`}, dc[] = {0, 0, 1, -1` + diag.replace(/-1/g, "X").replace(/1/g, "-1").replace(/X/g, "1") + R`};
    const int dirs = sizeof(dr) / sizeof(dr[0]);
    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();
        if (grid[r][c] == 'E') {
            std::cout << "ระยะทางสั้นที่สุด: " << dist[r][c] << " ก้าว\n";
            return 0;
        }
        for (int d = 0; d < dirs; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (grid[nr][nc] == '#' || dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    std::cout << "ไปไม่ถึง\n";
    return 0;
}
`;
const QUEENS = (diagIdx) => ADV + R`int n, total = 0;
std::vector<int> cols, firstSolution;
std::vector<bool> usedCol, usedDiag1, usedDiag2;

void solve(int row) {
    if (row == n) {
        total++;
        if (firstSolution.empty()) firstSolution = cols;
        return;
    }
    for (int c = 0; c < n; c++) {
        int d1 = ` + diagIdx + R`, d2 = row + c;
        if (usedCol[c] || usedDiag1[d1] || usedDiag2[d2]) continue;
        usedCol[c] = usedDiag1[d1] = usedDiag2[d2] = true;
        cols.push_back(c + 1);
        solve(row + 1);
        cols.pop_back();
        usedCol[c] = usedDiag1[d1] = usedDiag2[d2] = false;
    }
}

int main() {
    std::cin >> n;
    usedCol.assign(n, false);
    usedDiag1.assign(2 * n, false);
    usedDiag2.assign(2 * n, false);
    solve(0);
    std::cout << "จำนวนวิธี: " << total << "\n";
    if (total == 0) {
        std::cout << "ไม่มีวิธีวาง\n";
    } else {
        std::cout << "วิธีแรก:";
        for (int c : firstSolution) std::cout << " " << c;
        std::cout << "\n";
    }
    return 0;
}
`;
Object.assign(module.exports, {
  "cpperr/0": { sol: DIV("a == INT_MIN && b == -1"), wrong: [DIV("false")] },
  "cpperr/1": { sol: READF("in >> x"), wrong: [READF("!in.eof() && (in >> x || true)")] },
  "cpperr/2": { sol: READF("in >> x").replace(/if \(count == 0\)[^\n]*\n[^\n]*\n/, 'std::cout << "ผลรวม: " << sum << "\\n";\n'), wrong: [READF("!in.eof()").replace("    while (!in.eof()) {\n", "    while (!in.eof()) {\n        in >> x;\n").replace(/if \(count == 0\)[^\n]*\n[^\n]*\n/, 'std::cout << "ผลรวม: " << sum << "\\n";\n')] },
  "cpperr/3": { sol: CSV("1"), wrong: [CSV("0")] },
  "cppds/0": { sol: LIST(R`        std::unique_ptr<Node>* cur = &head;
        while (*cur && (*cur)->value != v) cur = &(*cur)->next;
        if (!*cur) return false;
        *cur = std::move((*cur)->next);
        return true;`), wrong: [LIST(R`        if (!head) return false;
        Node* cur = head.get();
        while (cur->next && cur->next->value != v) cur = cur->next.get();
        if (!cur->next) return false;
        cur->next = std::move(cur->next->next);
        return true;`)] },
  "cppds/1": { sol: BST(">"), wrong: [BST(">=")] },
  "cppds/2": { sol: HASH("((key % SIZE) + SIZE) % SIZE"), wrong: [HASH("((key % SIZE) + SIZE) % SIZE").replace("            if (entry.first == key) { entry.second = value; return; }\n", "")] },
  "cppds/3": { sol: HEAP(R`            if (l < data.size() && data[l] < data[best]) best = l;
            if (r < data.size() && data[r] < data[best]) best = r;`), wrong: [HEAP(R`            if (l < data.size() && data[l] < data[best]) best = l;`)] },
  "cppalgo2/0": { sol: ADV + R`int main() {
    std::vector<long long> fib(91);
    fib[0] = 0;
    fib[1] = 1;
    for (int i = 2; i <= 90; i++) fib[i] = fib[i - 1] + fib[i - 2];
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        int n;
        std::cin >> n;
        std::cout << fib[n] << "\n";
    }
    return 0;
}
`, wrong: [] },
  "cppalgo2/1": { sol: BFS(""), wrong: [BFS(", 1, 1, -1, -1")] },
  "cppalgo2/2": { sol: ADV + R`int main() {
    int n;
    std::cin >> n;
    std::vector<int> coins(n);
    for (int& c : coins) std::cin >> c;
    int amount;
    std::cin >> amount;
    const int INF = 1000000000;
    std::vector<int> dp(amount + 1, INF);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int c : coins) {
            if (c <= a && dp[a - c] != INF) {
                dp[a] = std::min(dp[a], dp[a - c] + 1);
            }
        }
    }
    std::cout << (dp[amount] == INF ? -1 : dp[amount]) << "\n";
    return 0;
}
`, wrong: [ADV + R`int main() {
    int n;
    std::cin >> n;
    std::vector<int> coins(n);
    for (int& c : coins) std::cin >> c;
    int amount;
    std::cin >> amount;
    std::sort(coins.rbegin(), coins.rend());
    int used = 0;
    for (int c : coins) {
        used += amount / c;
        amount %= c;
    }
    std::cout << (amount == 0 ? used : -1) << "\n";
    return 0;
}
`] },
  "cppalgo2/3": { sol: QUEENS("row - c + n - 1"), wrong: [QUEENS("(row > c ? row - c : c - row)")] },
});

// ═══════════════ Stage 26–28 (Phase 6 ชุดที่ 1) ═══════════════
const PRO = "#include <iostream>\n#include <iomanip>\n#include <atomic>\n#include <climits>\n#include <functional>\n#include <future>\n#include <map>\n#include <memory>\n#include <mutex>\n#include <queue>\n#include <string>\n#include <utility>\n#include <vector>\n\n";
const PM = body => PRO + "int main() {\n" + body + "\n    return 0;\n}\n";
const LEAP = (extra) => PRO + R`using LeapFn = bool (*)(int);

int runTests(LeapFn isLeap) {
    int failures = 0;
    auto check = [&](bool condition) { if (!condition) failures++; };
    check(isLeap(2024) == true);
` + extra + R`
    return failures;
}

bool correct(int y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }
bool bugOnly4(int y) { return y % 4 == 0; }
bool bugNo400(int y) { return y % 4 == 0 && y % 100 != 0; }
bool bugOnly400(int y) { return y % 400 == 0; }
bool bugAlwaysFalse(int) { return false; }
bool bugAlwaysTrue(int) { return true; }

int main() {
    std::string mode;
    std::cin >> mode;
    LeapFn fn = correct;
    if (mode == "m1") fn = bugOnly4;
    else if (mode == "m2") fn = bugNo400;
    else if (mode == "m3") fn = bugOnly400;
    else if (mode == "m4") fn = bugAlwaysFalse;
    else if (mode == "m5") fn = bugAlwaysTrue;
    std::cout << (runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด") << "\n";
    return 0;
}
`;
const VEND = (changeExpr) => PRO + R`class VendingMachine;

class State {
public:
    virtual ~State() = default;
    virtual void insertCoin(VendingMachine& vm, int coin) = 0;
    virtual void select(VendingMachine& vm, const std::string& item) = 0;
    virtual void refund(VendingMachine& vm) = 0;
};

class VendingMachine {
public:
    VendingMachine();
    void insertCoin(int coin) { state->insertCoin(*this, coin); applyPending(); }
    void select(const std::string& item) { state->select(*this, item); applyPending(); }
    void refund() { state->refund(*this); applyPending(); }
    void changeState(std::unique_ptr<State> next) { pending = std::move(next); }
    int credit{0};
    std::map<std::string, std::pair<int, int>> items{{"A", {15, 2}}, {"B", {20, 1}}};
private:
    void applyPending() { if (pending) state = std::move(pending); }
    std::unique_ptr<State> state;
    std::unique_ptr<State> pending;
};

bool acceptedCoin(int c) { return c == 1 || c == 2 || c == 5 || c == 10; }

class HasCreditState : public State {
public:
    void insertCoin(VendingMachine& vm, int coin) override;
    void select(VendingMachine& vm, const std::string& item) override;
    void refund(VendingMachine& vm) override;
};

class IdleState : public State {
public:
    void insertCoin(VendingMachine& vm, int coin) override {
        if (!acceptedCoin(coin)) { std::cout << "ไม่รับเหรียญ " << coin << "\n"; return; }
        vm.credit += coin;
        std::cout << "เครดิต: " << vm.credit << "\n";
        vm.changeState(std::make_unique<HasCreditState>());
    }
    void select(VendingMachine&, const std::string&) override { std::cout << "กรุณาหยอดเหรียญ\n"; }
    void refund(VendingMachine&) override { std::cout << "ไม่มีเงินให้คืน\n"; }
};

void HasCreditState::insertCoin(VendingMachine& vm, int coin) {
    if (!acceptedCoin(coin)) { std::cout << "ไม่รับเหรียญ " << coin << "\n"; return; }
    vm.credit += coin;
    std::cout << "เครดิต: " << vm.credit << "\n";
}

void HasCreditState::select(VendingMachine& vm, const std::string& item) {
    auto it = vm.items.find(item);
    if (it == vm.items.end()) { std::cout << "ไม่มีสินค้า " << item << "\n"; return; }
    auto& [price, stock] = it->second;
    if (stock == 0) { std::cout << "สินค้า " << item << " หมด\n"; return; }
    if (vm.credit < price) { std::cout << "เงินไม่พอ (ขาด " << price - vm.credit << ")\n"; return; }
    stock--;
    std::cout << "ได้รับ " << item << " · ทอน " << ` + changeExpr + R` << "\n";
    vm.credit = 0;
    vm.changeState(std::make_unique<IdleState>());
}

void HasCreditState::refund(VendingMachine& vm) {
    std::cout << "คืนเงิน " << vm.credit << "\n";
    vm.credit = 0;
    vm.changeState(std::make_unique<IdleState>());
}

VendingMachine::VendingMachine() : state{std::make_unique<IdleState>()} {}

int main() {
    VendingMachine vm;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'c') { int coin; std::cin >> coin; vm.insertCoin(coin); }
        else if (cmd == 's') { std::string item; std::cin >> item; vm.select(item); }
        else if (cmd == 'r') vm.refund();
    }
    return 0;
}
`;
const TQ = (countDone) => PRO + R`class TaskQueue {
public:
    void add(std::function<long long()> task) {
        std::lock_guard<std::mutex> lock(m);
        pending.push(std::move(task));
    }
    void run() {
        std::queue<std::function<long long()>> work;
        {
            std::lock_guard<std::mutex> lock(m);
            std::swap(work, pending);
        }
        if (work.empty()) { std::cout << "ไม่มีงานในคิว\n"; return; }
        std::vector<std::future<long long>> results;
        while (!work.empty()) {
            results.push_back(std::async(std::launch::deferred, work.front()));
            work.pop();
        }
        for (std::size_t i = 0; i < results.size(); i++) {
            std::cout << "งานที่ " << i + 1 << ": " << results[i].get() << "\n";
` + countDone + R`
        }
    }
    int completed() const { return done.load(); }
private:
    std::mutex m;
    std::queue<std::function<long long()>> pending;
    std::atomic<int> done{0};
};

int main() {
    TaskQueue tasks;
    std::string cmd;
    while (std::cin >> cmd && cmd != "q") {
        if (cmd == "sum") {
            long long n;
            std::cin >> n;
            tasks.add([n] { long long s = 0; for (long long i = 1; i <= n; i++) s += i; return s; });
        } else if (cmd == "fact") {
            long long n;
            std::cin >> n;
            tasks.add([n] { long long r = 1; for (long long i = 2; i <= n; i++) r = r * i % 1000000007LL; return r; });
        } else if (cmd == "run") {
            tasks.run();
        } else if (cmd == "count") {
            std::cout << "เสร็จแล้ว " << tasks.completed() << " งาน\n";
        }
    }
    return 0;
}
`;
Object.assign(module.exports, {
  "cppdebug/0": { sol: PM(R`    int n;
    std::cin >> n;
    std::vector<int> scores;
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        scores.push_back(s);
    }
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        int s;
        std::cin >> s;
        scores.push_back(s);
    }
    int bonus;
    std::cin >> bonus;
    scores[0] += bonus;
    std::cout << "คนแรก: " << scores[0] << "\n";
    std::cout << "จำนวน: " << scores.size() << "\n";`), wrong: [PM(R`    int n;
    std::cin >> n;
    std::vector<int> scores;
    for (int i = 0; i < n; i++) {
        int s;
        std::cin >> s;
        scores.push_back(s);
    }
    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        int s;
        std::cin >> s;
        scores.push_back(s);
    }
    int bonus;
    std::cin >> bonus;
    scores.back() += bonus;
    std::cout << "คนแรก: " << scores[0] << "\n";
    std::cout << "จำนวน: " << scores.size() << "\n";`)] },
  "cppdebug/1": { sol: PM(R`    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        int n;
        std::cin >> n;
        long long result = 1;
        bool overflow = false;
        for (int j = 2; j <= n; j++) {
            if (result > LLONG_MAX / j) {
                overflow = true;
                break;
            }
            result *= j;
        }
        if (overflow) std::cout << "ล้น (เกินขอบเขต long long)\n";
        else std::cout << result << "\n";
    }`), wrong: [PM(R`    int k;
    std::cin >> k;
    for (int i = 0; i < k; i++) {
        int n;
        std::cin >> n;
        long long result = 1;
        bool overflow = false;
        for (int j = 2; j <= n; j++) {
            result *= j;
            if (result < 0) {
                overflow = true;
                break;
            }
        }
        if (overflow) std::cout << "ล้น (เกินขอบเขต long long)\n";
        else std::cout << result << "\n";
    }`)] },
  "cppdebug/2": { sol: PRO + R`int priceAt(const std::vector<int>& prices, int index) {
    return prices[index];
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> prices(n);
    for (int& p : prices) std::cin >> p;
    int q;
    std::cin >> q;
    long long sum = 0;
    for (int i = 0; i < q; i++) {
        int idx;
        std::cin >> idx;
        sum += priceAt(prices, idx);
    }
    std::cout << "ผลรวม: " << sum << "\n";
    return 0;
}
`, wrong: [] },
  "cppdebug/3": { sol: PM(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += v[i];
    }
    double avg = static_cast<double>(sum) / n;
    int above = 0;
    for (int x : v) {
        if (x > avg) above++;
    }
    int best = v[0];
    for (int x : v) {
        if (x > best) best = x;
    }
    std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << avg << "\n";
    std::cout << "สูงกว่าค่าเฉลี่ย: " << above << " คน\n";
    std::cout << "สูงสุด: " << best << "\n";`), wrong: [PM(R`    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int& x : v) std::cin >> x;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += v[i];
    }
    double avg = static_cast<double>(sum) / n;
    int above = 0;
    for (int x : v) {
        if (x > avg) above++;
    }
    int best = 0;
    for (int x : v) {
        if (x > best) best = x;
    }
    std::cout << std::fixed << std::setprecision(2) << "เฉลี่ย: " << avg << "\n";
    std::cout << "สูงกว่าค่าเฉลี่ย: " << above << " คน\n";
    std::cout << "สูงสุด: " << best << "\n";`)] },
  "cppconc/0": { sol: PRO + R`class SafeCounter {
public:
    void add(long long n) {
        std::lock_guard<std::mutex> lock(m);
        value += n;
    }
    void increment() { add(1); }
    long long get() const {
        std::lock_guard<std::mutex> lock(m);
        return value;
    }
private:
    mutable std::mutex m;
    long long value{0};
};

int main() {
    SafeCounter c;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'i') c.increment();
        else if (cmd == 'a') { long long n; std::cin >> n; c.add(n); }
        else if (cmd == 'g') std::cout << c.get() << "\n";
    }
    return 0;
}
`, wrong: [PRO + R`class SafeCounter {
public:
    void add(long long n) {
        std::lock_guard<std::mutex> lock(m);
        value += static_cast<int>(n);
    }
    void increment() { add(1); }
    long long get() const {
        std::lock_guard<std::mutex> lock(m);
        return value;
    }
private:
    mutable std::mutex m;
    int value{0};
};

int main() {
    SafeCounter c;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 'i') c.increment();
        else if (cmd == 'a') { long long n; std::cin >> n; c.add(n); }
        else if (cmd == 'g') std::cout << c.get() << "\n";
    }
    return 0;
}
`] },
  "cppconc/1": { sol: PRO + R`struct Account {
    std::string name;
    long long balance{0};
    std::mutex m;
};

bool transfer(Account& from, Account& to, long long amount) {
    if (&from == &to) return false;
    std::scoped_lock lock(from.m, to.m);
    if (from.balance < amount) return false;
    from.balance -= amount;
    to.balance += amount;
    return true;
}

int main() {
    Account a, b;
    a.name = "a";
    b.name = "b";
    std::cin >> a.balance >> b.balance;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 's') {
            std::cout << "a: " << a.balance << " · b: " << b.balance << "\n";
            continue;
        }
        std::string f, t;
        long long amount;
        std::cin >> f >> t >> amount;
        Account& from = (f == "a") ? a : b;
        Account& to = (t == "a") ? a : b;
        if (&from == &to) {
            std::cout << "โอนให้บัญชีเดียวกันไม่ได้\n";
        } else if (transfer(from, to, amount)) {
            std::cout << "โอน " << amount << " จาก " << f << " ไป " << t << "\n";
        } else {
            std::cout << "ยอดไม่พอ\n";
        }
    }
    return 0;
}
`, wrong: [PRO + R`struct Account {
    std::string name;
    long long balance{0};
    std::mutex m;
};

bool transfer(Account& from, Account& to, long long amount) {
    std::scoped_lock lock(from.m, to.m);
    if (from.balance <= amount) return false;
    from.balance -= amount;
    to.balance += amount;
    return true;
}

int main() {
    Account a, b;
    a.name = "a";
    b.name = "b";
    std::cin >> a.balance >> b.balance;
    char cmd;
    while (std::cin >> cmd && cmd != 'q') {
        if (cmd == 's') {
            std::cout << "a: " << a.balance << " · b: " << b.balance << "\n";
            continue;
        }
        std::string f, t;
        long long amount;
        std::cin >> f >> t >> amount;
        Account& from = (f == "a") ? a : b;
        Account& to = (t == "a") ? a : b;
        if (&from == &to) {
            std::cout << "โอนให้บัญชีเดียวกันไม่ได้\n";
        } else if (transfer(from, to, amount)) {
            std::cout << "โอน " << amount << " จาก " << f << " ไป " << t << "\n";
        } else {
            std::cout << "ยอดไม่พอ\n";
        }
    }
    return 0;
}
`] },
  "cppconc/2": { sol: TQ("            done++;"), wrong: [TQ("            if (i == 0) done++;")] },
  "cppdesign/0": { sol: PRO + R`class ShippingStrategy {
public:
    virtual ~ShippingStrategy() = default;
    virtual double cost(double weight) const = 0;
};

class Standard : public ShippingStrategy {
public:
    double cost(double weight) const override { return 30 + 10 * weight; }
};

class Express : public ShippingStrategy {
public:
    double cost(double weight) const override { return 60 + 15 * weight; }
};

class Pickup : public ShippingStrategy {
public:
    double cost(double) const override { return 0; }
};

std::unique_ptr<ShippingStrategy> makeShipping(const std::string& type) {
    if (type == "standard") return std::make_unique<Standard>();
    if (type == "express") return std::make_unique<Express>();
    if (type == "pickup") return std::make_unique<Pickup>();
    return nullptr;
}

int main() {
    std::string type;
    double weight;
    std::cout << std::fixed << std::setprecision(2);
    while (std::cin >> type >> weight) {
        auto s = makeShipping(type);
        if (!s) std::cout << "ไม่รู้จักวิธีส่ง " << type << "\n";
        else std::cout << type << ": " << s->cost(weight) << " บาท\n";
    }
    return 0;
}
`, wrong: [PRO + R`class ShippingStrategy {
public:
    virtual ~ShippingStrategy() = default;
    virtual double cost(double weight) const = 0;
};

class Standard : public ShippingStrategy {
public:
    double cost(double weight) const override { return 30 + 10 * weight; }
};

class Express : public ShippingStrategy {
public:
    double cost(double weight) const override { return 60 + 15 * weight; }
};

std::unique_ptr<ShippingStrategy> makeShipping(const std::string& type) {
    if (type == "express") return std::make_unique<Express>();
    if (type == "pickup") return nullptr;
    return std::make_unique<Standard>();
}

int main() {
    std::string type;
    double weight;
    std::cout << std::fixed << std::setprecision(2);
    while (std::cin >> type >> weight) {
        auto s = makeShipping(type);
        if (!s) std::cout << type << ": 0.00 บาท\n";
        else std::cout << type << ": " << s->cost(weight) << " บาท\n";
    }
    return 0;
}
`] },
  "cppdesign/1": { sol: PRO + R`class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(int price) = 0;
};

class PriceFeed {
public:
    void attach(Observer* o) { observers.push_back(o); }
    void setPrice(int p) {
        for (Observer* o : observers) o->update(p);
    }
private:
    std::vector<Observer*> observers;
};

class LoggerObserver : public Observer {
public:
    void update(int price) override { std::cout << "ราคา: " << price << "\n"; }
};

class AlertObserver : public Observer {
public:
    explicit AlertObserver(int t) : threshold{t} {}
    void update(int price) override {
        if (price > threshold) std::cout << "แจ้งเตือน: ราคา " << price << " สูงกว่า " << threshold << "\n";
    }
private:
    int threshold;
};

int main() {
    int threshold;
    std::cin >> threshold;
    PriceFeed feed;
    LoggerObserver log;
    AlertObserver alert(threshold);
    feed.attach(&log);
    feed.attach(&alert);
    int p;
    while (std::cin >> p && p != 0) feed.setPrice(p);
    return 0;
}
`, wrong: [PRO + R`class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(int price) = 0;
};

class PriceFeed {
public:
    void attach(Observer* o) { observers.push_back(o); }
    void setPrice(int p) {
        for (Observer* o : observers) o->update(p);
    }
private:
    std::vector<Observer*> observers;
};

class LoggerObserver : public Observer {
public:
    void update(int price) override { std::cout << "ราคา: " << price << "\n"; }
};

class AlertObserver : public Observer {
public:
    explicit AlertObserver(int t) : threshold{t} {}
    void update(int price) override {
        if (price >= threshold) std::cout << "แจ้งเตือน: ราคา " << price << " สูงกว่า " << threshold << "\n";
    }
private:
    int threshold;
};

int main() {
    int threshold;
    std::cin >> threshold;
    PriceFeed feed;
    LoggerObserver log;
    AlertObserver alert(threshold);
    feed.attach(&log);
    feed.attach(&alert);
    int p;
    while (std::cin >> p && p != 0) feed.setPrice(p);
    return 0;
}
`] },
  "cppdesign/2": { sol: LEAP(R`    check(isLeap(2023) == false);
    check(isLeap(1900) == false);
    check(isLeap(2000) == true);`), wrong: [LEAP(R`    check(isLeap(2023) == false);
    check(isLeap(1900) == false);`), LEAP(R`    check(isLeap(2023) == false);
    check(isLeap(2000) == true);`), LEAP(R`    check(isLeap(1900) == false);
    check(isLeap(2000) == true);
    check(isLeap(1999) == true);`)] },
  "cppdesign/3": { sol: VEND("vm.credit - price"), wrong: [VEND("price - vm.credit")] },
});

// ═══════════════ Stage 29–30 (Phase 6 ชุดสุดท้าย · หลายไฟล์) ═══════════════
const GEO = (cppBody) => R`// === geometry.h ===
#pragma once

namespace geo {
double circleArea(double r);
double rectArea(double w, double h);
}

// === geometry.cpp ===
#include "geometry.h"

` + cppBody + R`

// === main.cpp ===
#include <iomanip>
#include <iostream>
#include "geometry.h"

int main() {
    char type;
    std::cout << std::fixed << std::setprecision(2);
    while (std::cin >> type) {
        if (type == 'c') {
            double r;
            std::cin >> r;
            std::cout << "พื้นที่: " << geo::circleArea(r) << "\n";
        } else {
            double w, h;
            std::cin >> w >> h;
            std::cout << "พื้นที่: " << geo::rectArea(w, h) << "\n";
        }
    }
    return 0;
}
`;
const SCALE = (cppBody) => R`// === geometry.h ===
#pragma once

namespace geo {
double scale(double value, double factor);
}

// === geometry.cpp ===
#include "geometry.h"

` + cppBody + R`

// === main.cpp ===
#include <iomanip>
#include <iostream>
#include "geometry.h"

int main() {
    double v, f;
    std::cout << std::fixed << std::setprecision(2);
    while (std::cin >> v >> f) {
        std::cout << "ผลลัพธ์: " << geo::scale(v, f) << "\n";
    }
    return 0;
}
`;
const ODR = (utilDef) => R`// === util.h ===
#pragma once

` + utilDef + R`

// === stats.h ===
#pragma once
#include <vector>

double averageClamped(const std::vector<int>& scores);

// === stats.cpp ===
#include "stats.h"
#include "util.h"

double averageClamped(const std::vector<int>& scores) {
    long long sum = 0;
    for (int s : scores) sum += clampScore(s);
    return static_cast<double>(sum) / static_cast<double>(scores.size());
}

// === main.cpp ===
#include <iomanip>
#include <iostream>
#include <vector>
#include "stats.h"
#include "util.h"

int main() {
    int n;
    std::cin >> n;
    std::vector<int> scores(n);
    for (int& s : scores) std::cin >> s;
    std::cout << "คะแนนที่ปรับแล้ว:";
    for (int s : scores) std::cout << " " << clampScore(s);
    std::cout << "\n" << std::fixed << std::setprecision(2) << "เฉลี่ย: " << averageClamped(scores) << "\n";
    return 0;
}
`;
const VOTE = (tieCmp) => R`// === vote.h ===
#pragma once
#include <map>
#include <string>
#include <utility>
#include <vector>

namespace vote {

class Counter {
public:
    int cast(const std::string& name);
    std::vector<std::pair<std::string, int>> top(int n) const;
    int total() const { return totalVotes; }
    std::size_t voters() const { return votes.size(); }
private:
    std::map<std::string, int> votes;
    int totalVotes{0};
};

}

// === vote.cpp ===
#include "vote.h"
#include <algorithm>

namespace vote {

int Counter::cast(const std::string& name) {
    totalVotes++;
    return ++votes[name];
}

std::vector<std::pair<std::string, int>> Counter::top(int n) const {
    std::vector<std::pair<std::string, int>> list(votes.begin(), votes.end());
    std::sort(list.begin(), list.end(), [](const auto& a, const auto& b) {
        return a.second != b.second ? a.second > b.second : ` + tieCmp + R`;
    });
    if (static_cast<int>(list.size()) > n) list.resize(n);
    return list;
}

}

// === main.cpp ===
#include <iostream>
#include <string>
#include "vote.h"

int main() {
    vote::Counter counter;
    std::string cmd;
    while (std::cin >> cmd) {
        if (cmd == "vote") {
            std::string name;
            std::cin >> name;
            int k = counter.cast(name);
            std::cout << "โหวต " << name << " (รวม " << k << ")\n";
        } else if (cmd == "top") {
            int n;
            std::cin >> n;
            if (counter.voters() == 0) { std::cout << "ยังไม่มีการโหวต\n"; continue; }
            auto list = counter.top(n);
            for (std::size_t i = 0; i < list.size(); i++) {
                std::cout << i + 1 << ". " << list[i].first << " — " << list[i].second << " เสียง\n";
            }
        } else if (cmd == "total") {
            std::cout << "รวม " << counter.total() << " เสียง จาก " << counter.voters() << " คน\n";
        }
    }
    return 0;
}
`;
// ระบบห้องสมุดฉบับสมบูรณ์ — ผ่านทุก milestone (1–5, 7, 8) เพราะฟีเจอร์ใหม่ต้องไม่ทำของเดิมพัง
const LIBRARY = R`// === library.h ===
#pragma once
#include <map>
#include <optional>
#include <string>
#include <vector>

namespace lib {

struct Book {
    int id{0};
    std::string title;
    std::string author;
    int year{0};
    bool borrowed{false};
};

enum class AddError { None, Format, Id, Title, Author, Year, Duplicate };

std::optional<int> parseInt(const std::string& s);
std::vector<std::string> split(const std::string& s, char sep);
std::string formatBook(const Book& b);
const char* errorText(AddError e);

class Library {
public:
    AddError add(const std::string& spec, int& idOut);
    std::vector<Book> list() const;
    std::string borrow(int id);
    std::string giveBack(int id);
    std::vector<Book> find(const std::string& keyword) const;
    std::string stats() const;
    int save(const std::string& path) const;
    bool load(const std::string& path, int& loaded, int& skipped);
private:
    std::map<int, Book> books;
    static AddError parseBook(const std::vector<std::string>& fields, Book& out);
};

}

// === library.cpp ===
#include "library.h"
#include <charconv>
#include <fstream>
#include <sstream>

namespace lib {

std::optional<int> parseInt(const std::string& s) {
    int value = 0;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), value);
    if (ec != std::errc{} || ptr != s.data() + s.size() || s.empty()) return std::nullopt;
    return value;
}

std::vector<std::string> split(const std::string& s, char sep) {
    std::vector<std::string> out;
    std::stringstream ss(s);
    std::string part;
    while (std::getline(ss, part, sep)) out.push_back(part);
    return out;
}

std::string formatBook(const Book& b) {
    return std::to_string(b.id) + " | " + b.title + " | " + b.author + " | " + std::to_string(b.year) + " | " + (b.borrowed ? "ถูกยืม" : "ว่าง");
}

const char* errorText(AddError e) {
    switch (e) {
        case AddError::Format: return "ข้อผิดพลาด: รูปแบบไม่ถูกต้อง";
        case AddError::Id: return "ข้อผิดพลาด: รหัสไม่ถูกต้อง";
        case AddError::Title: return "ข้อผิดพลาด: ชื่อเรื่องว่าง";
        case AddError::Author: return "ข้อผิดพลาด: ผู้แต่งว่าง";
        case AddError::Year: return "ข้อผิดพลาด: ปีไม่ถูกต้อง";
        default: return "";
    }
}

AddError Library::parseBook(const std::vector<std::string>& f, Book& out) {
    auto id = parseInt(f[0]);
    if (!id || *id <= 0) return AddError::Id;
    if (f[1].empty()) return AddError::Title;
    if (f[2].empty()) return AddError::Author;
    auto year = parseInt(f[3]);
    if (!year || *year < YEAR_MIN || *year > 2100) return AddError::Year;
    out = Book{*id, f[1], f[2], *year, false};
    return AddError::None;
}

AddError Library::add(const std::string& spec, int& idOut) {
    auto f = split(spec, '|');
    if (f.size() != 4) return AddError::Format;
    Book b;
    AddError e = parseBook(f, b);
    if (e != AddError::None) return e;
    idOut = b.id;
    if (DUP_CHECK) return AddError::Duplicate;
    books[b.id] = b;
    return AddError::None;
}

std::vector<Book> Library::list() const {
    std::vector<Book> out;
    for (const auto& [id, b] : books) out.push_back(b);
    return out;
}

std::string Library::borrow(int id) {
    auto it = books.find(id);
    if (it == books.end()) return "ไม่พบเล่ม " + std::to_string(id);
    if (BORROW_CHECK) return "เล่ม " + std::to_string(id) + " ถูกยืมอยู่";
    it->second.borrowed = true;
    return "ยืมเล่ม " + std::to_string(id) + " สำเร็จ";
}

std::string Library::giveBack(int id) {
    auto it = books.find(id);
    if (it == books.end()) return "ไม่พบเล่ม " + std::to_string(id);
    if (!it->second.borrowed) return "เล่ม " + std::to_string(id) + " ไม่ได้ถูกยืม";
    it->second.borrowed = false;
    return "คืนเล่ม " + std::to_string(id) + " สำเร็จ";
}

std::vector<Book> Library::find(const std::string& keyword) const {
    std::vector<Book> out;
    for (const auto& [id, b] : books) {
        if (b.title.find(keyword) != std::string::npos || b.author.find(keyword) != std::string::npos) out.push_back(b);
    }
    return out;
}

std::string Library::stats() const {
    int available = 0;
    const Book* oldest = nullptr;
    for (const auto& [id, b] : books) {
        if (!b.borrowed) available++;
        if (!oldest || b.year < oldest->year) oldest = &b;
    }
    int total = static_cast<int>(books.size());
    std::string out = "ทั้งหมด " + std::to_string(total) + " เล่ม · ว่าง " + std::to_string(available) + " · ถูกยืม " + std::to_string(total - available);
    if (oldest) out += "\nเก่าที่สุด: " + oldest->title + " (" + std::to_string(oldest->year) + ")";
    return out;
}

int Library::save(const std::string& path) const {
    std::ofstream out(path);
    if (!out.is_open()) return -1;
    for (const auto& [id, b] : books) {
        out << b.id << "|" << b.title << "|" << b.author << "|" << b.year << "|" << (SAVE_FLAG ? 1 : 0) << "\n";
    }
    return static_cast<int>(books.size());
}

bool Library::load(const std::string& path, int& loaded, int& skipped) {
    std::ifstream in(path);
    if (!in.is_open()) return false;
    std::map<int, Book> fresh = LOAD_START;
    loaded = 0;
    skipped = 0;
    std::string line;
    while (std::getline(in, line)) {
        if (line.empty()) continue;
        auto f = split(line, '|');
        Book b;
        if (f.size() != 5 || parseBook(f, b) != AddError::None || (f[4] != "0" && f[4] != "1") || fresh.count(b.id)) {
            skipped++;
            continue;
        }
        b.borrowed = (f[4] == "1");
        fresh[b.id] = b;
        loaded++;
    }
    books = fresh;
    return true;
}

}

// === main.cpp ===
#include <iostream>
#include <string>
#include "library.h"

int main() {
    lib::Library library;
    const std::string dataFile = "/data/library.txt";
    std::string line;
    while (std::getline(std::cin, line)) {
        if (line.empty()) continue;
        std::size_t sp = line.find(' ');
        std::string cmd = line.substr(0, sp);
        std::string rest = sp == std::string::npos ? "" : line.substr(sp + 1);
        if (cmd == "quit") {
            std::cout << "ลาก่อน\n";
            break;
        } else if (cmd == "help") {
            std::cout << "คำสั่ง: add, list, borrow, return, find, stats, save, load, help, quit\n";
        } else if (cmd == "add") {
            int id = 0;
            lib::AddError e = library.add(rest, id);
            if (e == lib::AddError::None) std::cout << "เพิ่มเล่ม " << id << "\n";
            else if (e == lib::AddError::Duplicate) std::cout << "ข้อผิดพลาด: รหัส " << id << " ซ้ำ\n";
            else std::cout << lib::errorText(e) << "\n";
        } else if (cmd == "list") {
            auto books = library.list();
            if (books.empty()) std::cout << "ยังไม่มีหนังสือ\n";
            for (const auto& b : books) std::cout << lib::formatBook(b) << "\n";
        } else if (cmd == "borrow" || cmd == "return") {
            auto id = lib::parseInt(rest);
            if (!id || *id <= 0) std::cout << "ข้อผิดพลาด: รหัสไม่ถูกต้อง\n";
            else std::cout << (cmd == "borrow" ? library.borrow(*id) : library.giveBack(*id)) << "\n";
        } else if (cmd == "find") {
            if (rest.empty()) { std::cout << "ข้อผิดพลาด: ไม่มีคำค้น\n"; continue; }
            auto found = library.find(rest);
            if (found.empty()) std::cout << "ไม่พบผลลัพธ์\n";
            for (const auto& b : found) std::cout << lib::formatBook(b) << "\n";
        } else if (cmd == "stats") {
            std::cout << library.stats() << "\n";
        } else if (cmd == "save") {
            int n = library.save(dataFile);
            if (n < 0) std::cout << "ข้อผิดพลาด: บันทึกไม่ได้\n";
            else std::cout << "บันทึก " << n << " เล่ม\n";
        } else if (cmd == "load") {
            int loaded = 0, skipped = 0;
            if (!library.load(dataFile, loaded, skipped)) {
                std::cout << "ข้อผิดพลาด: ไม่พบไฟล์ข้อมูล\n";
                continue;
            }
            std::cout << "โหลด " << loaded << " เล่ม";
            if (skipped > 0) std::cout << " · ข้าม " << skipped << " บรรทัด";
            std::cout << "\n";
        } else {
            std::cout << "คำสั่งไม่รู้จัก: " << cmd << "\n";
        }
    }
    return 0;
}
`;
const LIB_OK = { YEAR_MIN: "1", DUP_CHECK: "books.count(b.id)", BORROW_CHECK: "it->second.borrowed", SAVE_FLAG: "b.borrowed", LOAD_START: "{}" };
const mkLib = (over = {}, extra = s => s) => {
  const cfg = Object.assign({}, LIB_OK, over);
  return extra(LIBRARY.replace(/YEAR_MIN|DUP_CHECK|BORROW_CHECK|SAVE_FLAG|LOAD_START/g, k => cfg[k]));
};
const ISBN = (extra) => R`#include <iostream>
#include <string>

using IsbnFn = bool (*)(const std::string&);

int runTests(IsbnFn valid) {
    int failures = 0;
    auto check = [&](bool condition) { if (!condition) failures++; };
    check(valid("0306406152") == true);
` + extra + R`
    return failures;
}

int sumWith(const std::string& s, bool allowX, int mod) {
    int total = 0;
    for (int i = 0; i < 10; i++) {
        int v;
        if (s[i] >= '0' && s[i] <= '9') v = s[i] - '0';
        else if (allowX && i == 9 && s[i] == 'X') v = 10;
        else return -1;
        total += (10 - i) * v;
    }
    return total % mod;
}
bool correct(const std::string& s) { return s.size() == 10 && sumWith(s, true, 11) == 0; }
bool bugNoX(const std::string& s) { return s.size() == 10 && sumWith(s, false, 11) == 0; }
bool bugLongOk(const std::string& s) { return s.size() >= 10 && sumWith(s, true, 11) == 0; }
bool bugMod10(const std::string& s) { return s.size() == 10 && sumWith(s, true, 10) == 0; }
bool bugLengthOnly(const std::string& s) { return s.size() == 10; }

int main() {
    std::string mode;
    std::cin >> mode;
    IsbnFn fn = correct;
    if (mode == "m1") fn = bugNoX;
    else if (mode == "m2") fn = bugLongOk;
    else if (mode == "m3") fn = bugMod10;
    else if (mode == "m4") fn = bugLengthOnly;
    std::cout << (runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด") << "\n";
    return 0;
}
`;
Object.assign(module.exports, {
  "cppprof/0": { sol: GEO(R`namespace geo {

double circleArea(double r) {
    return 3.14159 * r * r;
}

double rectArea(double w, double h) {
    return w * h;
}

}`), wrong: [GEO(R`namespace geo {

double circleArea(double r) {
    return 3.14 * r * r;
}

double rectArea(double w, double h) {
    return w * h;
}

}`)] },
  "cppprof/1": { sol: SCALE(R`namespace geo {

double scale(double value, double factor) {
    return value * factor;
}

}`), wrong: [SCALE(R`namespace geo {

double scale(double value, double factor) {
    return value + factor;
}

}`)] },
  "cppprof/2": { sol: ODR(R`inline int clampScore(int s) {
    if (s < 0) return 0;
    if (s > 100) return 100;
    return s;
}`), wrong: [ODR(R`inline int clampScore(int s) {
    if (s < 0) return 0;
    return s;
}`)] },
  "cppprof/3": { sol: VOTE("a.first < b.first"), wrong: [VOTE("a.first > b.first")] },
  "cppcap/0": { sol: mkLib(), wrong: [mkLib({}, s => s.replace('std::cout << "คำสั่งไม่รู้จัก: " << cmd << "\\n";', 'std::cout << "คำสั่งไม่รู้จัก\\n";'))] },
  "cppcap/1": { sol: mkLib(), wrong: [mkLib({ DUP_CHECK: "false" })] },
  "cppcap/2": { sol: mkLib(), wrong: [mkLib({ BORROW_CHECK: "false" })] },
  "cppcap/3": { sol: mkLib(), wrong: [mkLib({ LOAD_START: "books" })] },
  "cppcap/4": { sol: mkLib(), wrong: [mkLib({ YEAR_MIN: "0" })] },
  "cppcap/5": { sol: ISBN(R`    check(valid("080442957X") == true);
    check(valid("0306406153") == false);
    check(valid("03064061520") == false);
    check(valid("030640615") == false);`), wrong: [ISBN(R`    check(valid("0306406153") == false);
    check(valid("03064061520") == false);`), ISBN(R`    check(valid("080442957X") == true);
    check(valid("0306406153") == false);`)] },
  "cppcap/6": { sol: mkLib(), wrong: [mkLib({}, s => s.replace("namespace lib {\n\nstd::optional<int> parseInt", "int callCount = 0;\n\nnamespace lib {\n\nstd::optional<int> parseInt"))] },
  "cppcap/7": { sol: mkLib(), wrong: [mkLib({ SAVE_FLAG: "!b.borrowed" })] },
});
