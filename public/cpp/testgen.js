/**
 * testgen.js — สร้าง input ขนาดใหญ่สำหรับ Performance Challenge แบบกำหนดผลได้ (deterministic)
 * ใช้ร่วมกันทั้งเบราว์เซอร์ (window.CPPTestGen) และ tests/test-cpp.js (require) → ข้อมูลตรงกันทุกตัว
 *
 * test.gen = { type, seed, ... }
 *   "ints"   : n, lo, hi [, even] [, plant: [a, b]] [, tail]  →  "n\nv1 v2 …\n" + tail
 *   "ints-q" : n, lo, hi, q, qlo, qhi [, sorted]              →  "n\nv…\nq\nq…\n"
 */
(function (root) {
  /** mulberry32 — PRNG สั้น เร็ว และให้ผลเหมือนกันทุกเครื่อง */
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ints(r, n, lo, hi) {
    const out = new Array(n);
    for (let i = 0; i < n; i++) out[i] = lo + Math.floor(r() * (hi - lo + 1));
    return out;
  }
  function make(g) {
    const r = rng(g.seed || 1);
    if (g.type === "ints") {
      let a = ints(r, g.n, g.lo, g.hi);
      if (g.even) a = a.map(v => v * 2);
      if (g.plant) g.plant.forEach((v, i) => { a[a.length - g.plant.length + i] = v; });
      return g.n + "\n" + a.join(" ") + "\n" + (g.tail != null ? g.tail + "\n" : "");
    }
    if (g.type === "ints-q") {
      const a = ints(r, g.n, g.lo, g.hi);
      if (g.sorted) a.sort((x, y) => x - y);
      const q = ints(r, g.q, g.qlo, g.qhi);
      return g.n + "\n" + a.join(" ") + "\n" + g.q + "\n" + q.join(" ") + "\n";
    }
    throw new Error("ไม่รู้จักชนิดตัวสร้างข้อมูล: " + g.type);
  }
  const api = { make, rng };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CPPTestGen = api;
})(typeof window !== "undefined" ? window : globalThis);
