/**
 * ui-kit.js — Component กลางของ Icon Design System
 *
 *   AppIcon(name, opts)       ไอคอน UI จาก Lucide (ชุดเดียวทั้งเว็บ)
 *   LanguageIcon(lang, opts)  โลโก้ภาษาโปรแกรมจาก Simple Icons ในกรอบขนาดมาตรฐาน
 *   AvatarFallback(name)      รูปประจำตัวเริ่มต้นจากอักษรแรกของชื่อ (ไม่ใช้ emoji)
 *
 * ใช้ได้ทั้งในเบราว์เซอร์ (window.UIKit) และบนเซิร์ฟเวอร์ (require) —
 * เซิร์ฟเวอร์ใช้แทนที่ {{icon:ชื่อ}} / {{lang:ภาษา}} ใน index.html ก่อนส่ง
 */
(function (root) {
  const DATA = typeof ICON_DATA !== "undefined" ? ICON_DATA : require("./icon-data.js");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /** ขนาดไอคอนมาตรฐาน (ตรงกับ design token --icon-*) */
  const SIZE = { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 };

  /**
   * ไอคอน UI — ค่าเริ่มต้นเป็นไอคอนตกแต่ง (aria-hidden) ถ้าเป็นปุ่มไอคอนอย่างเดียวให้ส่ง label
   * @param {string} name  ชื่อไอคอน เช่น "trophy", "play", "hint"
   * @param {{size?: number|string, label?: string, cls?: string, stroke?: number}} [o]
   */
  function AppIcon(name, o) {
    o = o || {};
    const inner = DATA.ui[name];
    if (!inner) return "";
    const px = typeof o.size === "number" ? o.size : SIZE[o.size || "md"];
    const a11y = o.label ? ' role="img" aria-label="' + esc(o.label) + '"' : ' aria-hidden="true" focusable="false"';
    return '<svg class="ic ic-' + name + (o.cls ? " " + o.cls : "") + '" width="' + px + '" height="' + px +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (o.stroke || 2) +
      '" stroke-linecap="round" stroke-linejoin="round"' + a11y + ">" + inner + "</svg>";
  }

  /**
   * โลโก้ภาษาในกรอบขนาดเท่ากันทุกภาษา — สีแบรนด์ใช้เฉพาะตัวโลโก้/เส้นขอบบางๆ
   * @param {"python"|"c"|"html"|"css"|"js"} lang
   * @param {{box?: number, logo?: number, title?: boolean}} [o] box = ขนาดกรอบ, logo = ขนาดโลโก้
   */
  function LanguageIcon(lang, o) {
    o = o || {};
    const l = DATA.lang[lang];
    if (!l) return "";
    const box = o.box || 72, logo = o.logo || Math.round(box * (l.img ? 0.68 : 0.58));   // โลโก้รูปโล่/หกเหลี่ยมมีขอบในตัว จึงแสดงใหญ่ขึ้นเล็กน้อย
    const title = o.title === false ? ' aria-hidden="true"' : ' role="img" aria-label="' + esc(l.title) + '"';
    const mark = l.img
      ? '<img src="' + l.img + '" width="' + logo + '" height="' + logo + '" alt="" decoding="async" loading="lazy" draggable="false">'   // โลโก้หลายสี
      : '<svg viewBox="0 0 24 24" width="' + logo + '" height="' + logo + '" aria-hidden="true" focusable="false"><path fill="' + l.hex + '" d="' + l.path + '"/></svg>';
    return '<span class="lang-icon' + (l.onDark ? " on-dark" : "") + (l.img ? " has-img" : "") + '" style="--brand:' + l.hex + ";--box:" + box + "px;--logo:" + logo + 'px"' + title + ">" + mark + "</span>";
  }

  /** ข้อมูลแบรนด์ (ชื่อ/สี) จากแพ็กเกจ */
  const langInfo = lang => DATA.lang[lang] || null;

  /** รูปประจำตัวเริ่มต้น: อักษรแรกของชื่อบนพื้นสีที่คำนวณจากชื่อ (ชื่อเดิมได้สีเดิมเสมอ) */
  const AV_COLORS = ["#6d4aff", "#0e9f6e", "#e4572e", "#1c7ed6", "#c2255c", "#b8860b", "#5f3dc4", "#087f8c"];
  function AvatarFallback(name) {
    const s = String(name || "?").trim() || "?";
    let h = 0;
    for (const ch of s) h = (h * 31 + ch.codePointAt(0)) >>> 0;
    // อักษรไทยตัวแรกที่เป็นพยัญชนะ/ตัวอักษร (ข้ามสระนำ เช่น เ แ โ ใ ไ)
    const chars = Array.from(s);
    const first = (chars.find(c => /[A-Za-z0-9ก-ฮ]/.test(c)) || chars[0]).toUpperCase();
    return '<span class="av-initial" style="--av:' + AV_COLORS[h % AV_COLORS.length] + '" aria-hidden="true">' + esc(first) + "</span>";
  }

  /** แทนที่ {{icon:ชื่อ|ขนาด}} และ {{lang:ภาษา|ขนาดกรอบ}} ในข้อความ HTML (ใช้บนเซิร์ฟเวอร์) */
  function renderPlaceholders(html) {
    return html
      .replace(/\{\{icon:([\w-]+)(?:\|(\d+))?\}\}/g, (m, n, sz) => AppIcon(n, sz ? { size: +sz } : {}) || m)
      .replace(/\{\{lang:(\w+)(?:\|(\d+))?\}\}/g, (m, l, sz) => LanguageIcon(l, sz ? { box: +sz } : {}) || m);
  }

  const api = { AppIcon, LanguageIcon, AvatarFallback, langInfo, renderPlaceholders, SIZE, esc };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.UIKit = api;
})(typeof window !== "undefined" ? window : globalThis);
