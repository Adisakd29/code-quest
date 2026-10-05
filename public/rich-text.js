/*
 * rich-text.js — แสดงข้อความของเนื้อหาบทเรียน (คำอธิบาย เป้าหมาย คำใบ้ แบบทดสอบ) อย่างปลอดภัย
 *
 * เนื้อหาใช้แท็กจัดรูปแบบจำนวนหนึ่ง (<b>, <code>, <pre> …) แต่ก็มีโค้ดที่เขียนดิบๆ เช่น
 * "#include <stdio.h>" หรือ "static_cast<double>(x)" — ถ้าใส่ลง innerHTML ตรงๆ เบราว์เซอร์จะตีความ
 * <stdio.h> เป็นแท็กแล้วข้อความหายไปเงียบๆ · ถ้าใช้ textContent แท็กจัดรูปแบบก็จะโผล่เป็นตัวอักษร
 *
 * richText() คงไว้เฉพาะแท็กในรายการที่อนุญาต (สำรวจจากเนื้อหาทุกหลักสูตรแล้ว) และ escape ส่วนที่เหลือ
 * ทั้งหมดให้แสดงเป็นตัวอักษร · entity ที่ถูกต้อง (&lt; &amp; &#39; …) คงไว้ · '&' ที่ไม่ใช่ entity ถูก escape
 */
(function (root) {
  "use strict";
  // แท็กจัดรูปแบบที่เนื้อหาตั้งใจใช้ (span มี class/data-* สำหรับผังงาน) — แท็กอื่นทุกตัวถือเป็นตัวอักษร
  // แอตทริบิวต์ที่อนุญาตมีแค่ class และ data-* (ใช้กับผังงาน) — กันแอตทริบิวต์อย่าง onclick หรือ style หลุดผ่าน
  const ALLOWED_TAG = /^<\/?(?:b|strong|i|em|code|pre|br|span|sup|sub|kbd|small)(?:\s+(?:class|data-[a-z0-9-]+)="[^"<>]*")*\s*\/?>/i;
  const ENTITY = /^&(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]*);/i;

  function richText(input) {
    if (input == null) return "";
    const s = String(input);
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === "<") {
        const m = ALLOWED_TAG.exec(s.slice(i));
        if (m) { out += m[0]; i += m[0].length - 1; }
        else out += "&lt;";
      } else if (ch === ">") {
        out += "&gt;";
      } else if (ch === "&") {
        const m = ENTITY.exec(s.slice(i));
        if (m) { out += m[0]; i += m[0].length - 1; }
        else out += "&amp;";
      } else {
        out += ch;
      }
    }
    return out;
  }

  root.richText = richText;
  if (typeof module !== "undefined" && module.exports) module.exports = { richText };
})(typeof window !== "undefined" ? window : globalThis);
