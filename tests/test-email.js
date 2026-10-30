/* ชุดทดสอบตัวกรองอีเมลตอนสมัคร (email-check.js) — ใช้ DNS ปลอมจึงไม่ขึ้นกับเครือข่าย */
const { checkEmail, suggestDomain } = require("../email-check.js");
const fakeDns = {
  "outlook.com": [{ exchange: "outlook-com.olc.protection.outlook.com" }],
  "gmail.com": [{ exchange: "gmail-smtp-in.l.google.com" }],
  "school.ac.th": [{ exchange: "mx.school.ac.th" }],
  "nullmx.test": [{ exchange: "" }],                       // null MX = ประกาศว่าไม่รับอีเมล
};
const resolveMx = async d => { if (fakeDns[d]) return fakeDns[d]; throw Object.assign(new Error("nf"), { code: "ENOTFOUND" }); };
const broken = async () => { throw Object.assign(new Error("t"), { code: "ETIMEOUT" }); };
const cases = [
  ["student.cq@gmail.com", {}, true, null],
  ["teacher@school.ac.th", {}, true, null],
  ["not-an-email", {}, false, "format"],
  ["a@b", {}, false, "format"],
  ["me@gmial.com", {}, false, "typo"],
  ["me@hotmial.com", {}, false, "typo"],
  ["x@mailinator.com", {}, false, "disposable"],
  ["x@yopmail.com", {}, false, "disposable"],
  ["x@thisdomaindoesnotexist-cq.com", {}, false, "nomx"],
  ["x@nullmx.test", {}, false, "nomx"],
  ["x.user@anything.org", { resolveMx: broken }, true, "dns-unavailable"],   // DNS ล่ม → ปล่อยผ่าน ไม่บล็อกผู้ใช้จริง
  // กฎชื่อผู้ใช้ของผู้ให้บริการ: อีเมลที่เป็นไปไม่ได้แม้โดเมนจริง
  ["1@gmail.com", {}, false, "provider"],
  ["abc@gmail.com", {}, false, "provider"],
  ["1@gmail.com", { allowTypo: true }, false, "provider"],             // กฎ Gmail ข้ามไม่ได้
  ["somchai2008@gmail.com", {}, true, null],
  ["first.last+school@gmail.com", {}, true, null],
  ["1user@outlook.com", {}, false, "provider-soft"],
  ["1user@outlook.com", { allowTypo: true }, true, null],              // ผู้ใช้ยืนยันเองได้
];
let bad = 0;
(async () => {
  for (const [email, o, ok, reason] of cases) {
    const r = await checkEmail(email, Object.assign({ resolveMx }, o));
    const pass = r.ok === ok && (reason === null || r.reason === reason);
    if (!pass) { bad++; console.log("❌ " + email + " → " + JSON.stringify(r)); }
  }
  const sug = await checkEmail("me@gmial.com", { resolveMx });
  if (sug.suggestion !== "me@gmail.com") { bad++; console.log("❌ ไม่แนะนำ me@gmail.com: " + sug.suggestion); }
  if (suggestDomain("gmail.com") !== null) { bad++; console.log("❌ แนะนำโดเมนที่ถูกอยู่แล้ว"); }
  console.log("\nตัวกรองอีเมล: ผ่าน " + (cases.length + 2 - bad) + " / " + (cases.length + 2) + (bad ? "" : " ✓"));
  process.exit(bad ? 1 : 0);
})();
