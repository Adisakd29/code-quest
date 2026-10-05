/* ชุดทดสอบการตรวจคำตอบฝั่งเซิร์ฟเวอร์ (verify.js): เฉลยต้องผ่าน, starter/คำตอบผิดต้องไม่ผ่าน */
const { verify, COURSES } = require("../verify.js");
const C = require("./sols-c.js"), WS = require("./sols-web.js");
let ok = 0, bad = 0;
const fail = m => { console.log("❌ " + m); bad++; };
// หัวข้อทั้งหมดรวม legacy (course versioning) — ด่านโค้ดของ C เดิมยังตรวจด้วย CRUN บนเซิร์ฟเวอร์
const allTopics = lang => [...COURSES[lang].topics, ...(COURSES[lang].legacyTopics || [])];
for (const lang of ["c", "html", "css"]) for (const t of allTopics(lang)) t.stages.forEach((s, i) => {
  if (s.quiz) return;
  // ด่านโค้ด C v2 (มี tests) คอมไพล์ด้วย Clang ฝั่งเบราว์เซอร์: เซิร์ฟเวอร์ต้องไม่รันด้วย CRUN และตอบ verified: false
  if (Array.isArray(s.tests)) {
    const r = verify(lang, t.id, i, { code: "int main(void) { return 0; }" });
    if (!(r.ok && r.verified === false)) return fail(lang + ":" + t.id + "/" + i + " ด่าน C v2 ควรตรวจฝั่งเบราว์เซอร์ (verified: false)");
    if (verify(lang, t.id, i, {}).ok) return fail(lang + ":" + t.id + "/" + i + " ไม่ส่งโค้ดแต่ผ่าน");
    ok++; return;
  }
  const sol = lang === "c" ? C[t.id + "/" + i] : WS[lang + ":" + t.id + "/" + i];
  const r = verify(lang, t.id, i, { code: sol });
  if (!(r.ok && r.verified)) return fail(lang + ":" + t.id + "/" + i + " เฉลยไม่ผ่าน (" + r.reason + ")");
  if (verify(lang, t.id, i, { code: s.starter || "x" }).ok) return fail(lang + ":" + t.id + "/" + i + " starter ผ่าน");
  if (verify(lang, t.id, i, {}).ok) return fail(lang + ":" + t.id + "/" + i + " ไม่ส่งโค้ดแต่ผ่าน");
  ok++;
});
for (const lang of Object.keys(COURSES)) for (const t of allTopics(lang)) t.stages.forEach((s, i) => {
  if (!s.quiz) return;
  const answers = s.quiz.map(q => q.t === "fill" ? q.a[0] : (q.t === "order" ? null : q.a));
  const orders = s.quiz.map(q => q.t === "order" ? q.items.slice() : null);
  if (!verify(lang, t.id, i, { answers, orders }).ok) return fail(lang + ":" + t.id + "/" + i + " คำตอบถูกแต่ไม่ผ่าน");
  if (verify(lang, t.id, i, { answers: [], orders: [] }).ok) return fail(lang + ":" + t.id + "/" + i + " ส่งเปล่าแต่ผ่าน");
  ok++;
});
if (verify("c", "nope", 0, { code: "x" }).ok) fail("ด่านที่ไม่มีจริงผ่าน");
console.log("\nตรวจคำตอบฝั่งเซิร์ฟเวอร์: ผ่าน " + ok + " / " + (ok + bad) + " ด่าน (C เดิม + C v2 + HTML + CSS + ข้อสอบทุกชุด)" + (bad ? "" : " ✓"));
process.exit(bad ? 1 : 0);
