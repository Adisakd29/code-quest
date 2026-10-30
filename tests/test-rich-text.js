/* กันบั๊กกลับมา: ข้อความของเนื้อหา (คำอธิบาย เป้าหมาย คำใบ้ แบบทดสอบ บทเรียน) ต้องผ่าน richText ก่อนแสดง
   เคยเกิดจริง 2 แบบ: (1) คำอธิบายภารกิจใช้ textContent → แท็ก <b> <code> โผล่เป็นตัวอักษร (C++ และ C v2 ราว 350 ด่าน)
   (2) คำใบ้/แบบทดสอบใช้ innerHTML ตรงๆ → "#include <stdio.h>" "static_cast<double>" ถูกตีความเป็นแท็กแล้วหายไป (61 จุด) */
const fs = require("fs"), path = require("path");
const { richText } = require("../public/rich-text.js");
const errors = [];
const cases = [
  ["มี<b>สองจุด</b>ที่ผิด", "มี<b>สองจุด</b>ที่ผิด"],
  ["#include <stdio.h>", "#include &lt;stdio.h&gt;"],
  ["static_cast<double>(x)", "static_cast&lt;double&gt;(x)"],
  ["<code>vector&lt;int&gt;</code>", "<code>vector&lt;int&gt;</code>"],
  ["10 <= x && y", "10 &lt;= x &amp;&amp; y"],
  ["<h1>", "&lt;h1&gt;"],
  ["<code>&amp;lt;</code> = &lt;", "<code>&amp;lt;</code> = &lt;"],
  ['<span class="fc-slot" data-flow="left">x</span>', '<span class="fc-slot" data-flow="left">x</span>'],
  ["<script>x</script>", "&lt;script&gt;x&lt;/script&gt;"],
  ["<b onclick=x>t</b>", "&lt;b onclick=x&gt;t</b>"],
];
for (const [inp, exp] of cases) { const got = richText(inp); if (got !== exp) errors.push("richText(" + JSON.stringify(inp) + ") = " + JSON.stringify(got) + " ควรเป็น " + JSON.stringify(exp)); }
// ทุกจุดที่แสดงข้อความของเนื้อหาต้องเรียก richText
const src = f => fs.readFileSync(path.join(__dirname, "..", "public", f), "utf8");
const game = src("game.js"), quest = src("quest.js"), html = src("index.html");
const mustHave = [
  [game, 'p.innerHTML = richText(sec.p)', "บทเรียน"],
  [game, '$("mDesc").innerHTML = richText(L.desc)', "คำอธิบายภารกิจ"],
  [game, 'richText(L.goal)', "เป้าหมาย"],
  [game, '$("hintBox").innerHTML = richText(L.hint)', "คำใบ้แบบเดี่ยว"],
  [game, 'richText(q.q)', "คำถามในแบบทดสอบ"],
  [game, 'richText(c)', "ตัวเลือก"],
  [game, 'richText(it)', "รายการเรียงลำดับ"],
  [game, 'richText(q.e)', "คำอธิบายเฉลย"],
  [quest, 'richText(L.hints[0])', "คำใบ้ 3 ขั้น (ขั้นที่ 1)"],
  [quest, 'richText(L.hints[2])', "คำใบ้ 3 ขั้น (ขั้นที่ 3)"],
  [quest, 'richText(L.desc)', "คำใบ้ขั้น \"คิดก่อน\""],
];
for (const [s, needle, label] of mustHave) if (!s.includes(needle)) errors.push(label + ": ไม่ได้แสดงผ่าน richText (หา \"" + needle + "\" ไม่เจอ)");
if (/\$\("mDesc"\)\.textContent\s*=/.test(game)) errors.push("คำอธิบายภารกิจกลับไปใช้ textContent — แท็กจัดรูปแบบจะโผล่เป็นตัวอักษร");
const iRich = html.indexOf('src="rich-text.js"'), iGame = html.indexOf('src="game.js"');
if (iRich < 0 || iRich > iGame) errors.push("index.html ต้องโหลด rich-text.js ก่อน game.js");
if (errors.length) { errors.forEach(e => console.log("❌ " + e)); process.exit(1); }
console.log("แสดงข้อความของเนื้อหาผ่าน richText ครบทุกจุด ✓ (" + cases.length + " กรณีของตัวแปลง · " + mustHave.length + " จุดแสดงผล)");
