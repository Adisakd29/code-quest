/* ตรวจคุณภาพเนื้อหาหลักสูตร C v2 (C17) ด้วย engine เดียวกับ C++ — ดูรายละเอียดใน test-cpp.js
 * (tests/test-c.js คือชุดทดสอบของหลักสูตร C เดิม ซึ่งยังต้องผ่านตลอดเพราะหัวข้อเดิมกลายเป็น legacy) */
if (!process.argv.some(a => a.startsWith("--lang="))) process.argv.push("--lang=c");
require("./test-cpp.js");
