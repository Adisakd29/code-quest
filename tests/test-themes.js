/* ชุดทดสอบธีมโลก: คอนทราสต์ของสีข้อความ (WCAG AA) และความครบของ config */
const WT = require("../public/world-themes.js");
const D = require("../public/icon-data.js");
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
const lum = h => { const [r, g, b] = rgb(h); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
let bad = 0;
const rows = [];
for (const [lang, t] of Object.entries(WT.LANGUAGE_THEME_MAP)) {
  const onWhite = ratio(t.accent.ink, "#ffffff"), onSoft = ratio(t.accent.ink, t.accent.soft);
  rows.push(lang.padEnd(7) + " ink " + t.accent.ink + "  บนขาว " + onWhite.toFixed(2) + ":1  บนพื้นโลก " + onSoft.toFixed(2) + ":1");
  if (onWhite < 4.5 || onSoft < 4.5) { console.log("❌ " + lang + ": สีข้อความคอนทราสต์ไม่ถึง 4.5:1"); bad++; }
  for (const k of ["displayName", "worldName", "tagline", "mood", "pattern", "emblem", "badgeStyle"]) if (!t[k]) { console.log("❌ " + lang + ": ไม่มี " + k); bad++; }
  if (!WT.PATTERNS[t.pattern]) { console.log("❌ " + lang + ": ไม่มีลวดลาย " + t.pattern); bad++; }
  for (const ic of [...t.props, t.emblem]) if (!D.ui[ic]) { console.log("❌ " + lang + ": ไม่มีไอคอน " + ic); bad++; }
  if (Buffer.byteLength(WT.PATTERNS[t.pattern](t.accent.line)) > 1024) { console.log("❌ " + lang + ": ลวดลายใหญ่เกิน 1KB"); bad++; }
}
rows.forEach(r => console.log("  " + r));
console.log("\nธีมโลก: " + Object.keys(WT.LANGUAGE_THEME_MAP).length + " ภาษา" + (bad ? " | พบปัญหา " + bad + " จุด" : " — คอนทราสต์ผ่าน WCAG AA ครบ ✓"));
process.exit(bad ? 1 : 0);
