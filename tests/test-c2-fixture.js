/* ตรวจ pipeline ของ C v2 ด้วยหลักสูตรตัวอย่าง: C17 · hidden tests · Memory Checker (leak / invalid free) · ห้ามมีคำเตือน · หลายไฟล์ .c/.h · โค้ด C++ ต้องไม่ผ่าน */
process.argv.push("--lang=c", "--course=" + require("path").join(__dirname, "fixtures/c2-fixture.js"), "--sols=" + require("path").join(__dirname, "fixtures/sols-c2-fixture.js"));
require("./test-cpp.js");
