/**
 * WEB — ตัวรันและตัวตรวจสำหรับคอร์ส HTML5 / CSS3 / JavaScript
 *
 * แนวคิด: โค้ดของผู้เรียนถูกประกอบเป็นหน้าเว็บจริง แล้วเรนเดอร์ใน iframe
 * จากนั้นตัวตรวจ (check) จะเข้าไปอ่าน DOM และ computed style ของหน้านั้นตรงๆ
 * ทำให้ตรวจได้แม่นยำกว่าการเทียบข้อความ เช่น "มี <h1> ที่มีข้อความนี้ไหม"
 * หรือ "พื้นหลังกล่องนี้เป็นสีอะไร"
 *
 * ตัวช่วยทั้งหมด (q, qa, txt, cssv, attr, colorEq, ...) ถูก export
 * เพื่อให้ทั้งเกมและสคริปต์ทดสอบใช้ชุดเดียวกัน
 */
const WEB = (() => {

  /* ═══════════ ประกอบหน้าเว็บจากโค้ดผู้เรียน ═══════════ */

  /**
   * สร้าง source ของหน้าเว็บตามภาษาที่กำลังเรียน
   * - html : ผู้เรียนเขียนทั้งหน้า
   * - css  : โจทย์ให้ HTML มา (stage.html) ผู้เรียนเขียนเฉพาะ CSS
   * - js   : โจทย์อาจให้ HTML มา ผู้เรียนเขียนเฉพาะ JavaScript
   */
  function buildSource(lang, code, stage) {
    stage = stage || {};
    if (lang === "html") return code;
    if (lang === "css") {
      return '<!DOCTYPE html><html><head><meta charset="utf-8"><style>\n' +
        code + '\n</style></head><body>\n' + (stage.html || "") + '\n</body></html>';
    }
    // js
    return '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      (stage.css ? "<style>\n" + stage.css + "\n</style>" : "") +
      '</head><body>\n' + (stage.html || "") +
      '\n<script>\n' + code + '\n</' + 'script></body></html>';
  }

  /* ═══════════ ตัวช่วยสำหรับเขียน check() ═══════════ */

  const norm = s => String(s == null ? "" : s).replace(/\s+/g, " ").trim();

  /** หา element ตัวแรกที่ตรงกับ selector (คืน null ถ้าไม่มี) */
  function q(doc, sel) {
    try { return doc.querySelector(sel); } catch { return null; }
  }
  /** หา element ทั้งหมดที่ตรงกับ selector (คืนเป็น array เสมอ) */
  function qa(doc, sel) {
    try { return Array.from(doc.querySelectorAll(sel)); } catch { return []; }
  }
  /** ข้อความในอิลิเมนต์ (ตัดช่องว่างซ้ำ) — รับได้ทั้ง element และ selector */
  function txt(docOrEl, sel) {
    if (sel === undefined) return norm(docOrEl && docOrEl.textContent);
    const el = q(docOrEl, sel);
    return el ? norm(el.textContent) : "";
  }
  /** ค่า attribute (คืน "" ถ้าไม่มี) */
  function attr(doc, sel, name) {
    const el = typeof sel === "string" ? q(doc, sel) : sel;
    if (!el) return "";
    const v = el.getAttribute(name);
    return v == null ? "" : String(v).trim();
  }
  /** มี element ที่ตรง selector อย่างน้อยหนึ่งตัวไหม */
  const has = (doc, sel) => qa(doc, sel).length > 0;

  /** ค่า computed style ของ element แรกที่ตรง selector */
  function cssv(doc, sel, prop) {
    const el = typeof sel === "string" ? q(doc, sel) : sel;
    if (!el) return "";
    const win = doc.defaultView || (typeof window !== "undefined" ? window : null);
    if (!win) return "";
    try { return String(win.getComputedStyle(el).getPropertyValue(prop) || "").trim().toLowerCase(); }
    catch { return ""; }
  }

  /* ---- เทียบสี: รองรับทั้ง #hex, rgb(), และชื่อสีพื้นฐาน ---- */
  const NAMED = {
    black: [0, 0, 0], white: [255, 255, 255], red: [255, 0, 0], lime: [0, 255, 0],
    green: [0, 128, 0], blue: [0, 0, 255], yellow: [255, 255, 0], cyan: [0, 255, 255],
    aqua: [0, 255, 255], magenta: [255, 0, 255], fuchsia: [255, 0, 255], gray: [128, 128, 128],
    grey: [128, 128, 128], silver: [192, 192, 192], maroon: [128, 0, 0], olive: [128, 128, 0],
    navy: [0, 0, 128], teal: [0, 128, 128], purple: [128, 0, 128], orange: [255, 165, 0],
    pink: [255, 192, 203], gold: [255, 215, 0], tomato: [255, 99, 71], coral: [255, 127, 80],
    salmon: [250, 128, 114], khaki: [240, 230, 140], violet: [238, 130, 238],
    indigo: [75, 0, 130], turquoise: [64, 224, 208], crimson: [220, 20, 60],
    skyblue: [135, 206, 235], steelblue: [70, 130, 180], seagreen: [46, 139, 87],
    hotpink: [255, 105, 180], transparent: null
  };
  /** แปลงสีรูปแบบใดก็ได้เป็น [r,g,b] (คืน null ถ้าแปลงไม่ได้) */
  function rgbOf(v) {
    if (!v) return null;
    const s = String(v).trim().toLowerCase();
    if (NAMED[s] !== undefined) return NAMED[s];
    let m = s.match(/^#([0-9a-f]{3})$/);
    if (m) return [0, 1, 2].map(i => parseInt(m[1][i] + m[1][i], 16));
    m = s.match(/^#([0-9a-f]{6})$/);
    if (m) return [0, 2, 4].map(i => parseInt(m[1].substr(i, 2), 16));
    m = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    if (m) return [1, 2, 3].map(i => Math.round(parseFloat(m[i])));
    return null;
  }
  /** สองค่าสีนี้คือสีเดียวกันไหม (เขียนต่างรูปแบบได้) */
  function colorEq(a, b) {
    const x = rgbOf(a), y = rgbOf(b);
    if (!x || !y) return false;
    return x[0] === y[0] && x[1] === y[1] && x[2] === y[2];
  }
  /** computed style ของ selector เป็นสีที่ต้องการไหม */
  const cssColor = (doc, sel, prop, want) => colorEq(cssv(doc, sel, prop), want);

  /** ตัวเลขจาก computed style เช่น "16px" -> 16 */
  function cssNum(doc, sel, prop) {
    const v = cssv(doc, sel, prop);
    const m = String(v).match(/-?[\d.]+/);
    return m ? parseFloat(m[0]) : NaN;
  }

  /** มี element ที่ตรง selector และมีข้อความตรงตามที่กำหนดไหม */
  function hasText(doc, sel, want, exact) {
    const w = norm(want);
    return qa(doc, sel).some(el => exact ? norm(el.textContent) === w : norm(el.textContent).includes(w));
  }

  /** ข้อความทั้งหน้า (ใช้เป็น out ให้ผู้เรียนเห็นคร่าวๆ) */
  const pageText = doc => norm(doc && doc.body ? doc.body.textContent : "");

  /** ตรวจว่าโค้ดมีการใช้แท็ก/คำสั่งที่โจทย์บังคับ (ตรวจจาก source ไม่ใช่ DOM) */
  const used = (code, re) => re.test(String(code || ""));

  /* ═══════════ รันในเบราว์เซอร์ (iframe) ═══════════ */

  /**
   * เรนเดอร์โค้ดลง iframe ที่กำหนด แล้วคืน { doc, out, error }
   * mount = element ที่จะใส่ iframe (ล้างของเดิมให้อัตโนมัติ)
   */
  function runInFrame(mount, lang, code, stage) {
    return new Promise(resolve => {
      mount.innerHTML = "";
      const logs = [];
      let errMsg = "";
      const iframe = document.createElement("iframe");
      iframe.className = "web-preview";
      iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-forms");
      mount.appendChild(iframe);

      const finish = () => {
        let doc = null;
        try { doc = iframe.contentDocument; } catch { doc = null; }
        resolve({
          doc,
          out: lang === "js" ? logs.join("\n") : (doc ? pageText(doc) : ""),
          logs,
          error: errMsg,
          iframe
        });
      };

      iframe.onload = () => {
        const win = iframe.contentWindow;
        try {
          // ดักข้อความจาก console.log และข้อผิดพลาดของสคริปต์
          const fmt = a => (typeof a === "object" && a !== null) ? JSON.stringify(a) : String(a);
          win.console.log = (...a) => logs.push(a.map(fmt).join(" "));
          win.onerror = (m, s, l) => { errMsg = "บรรทัด " + (l || "?") + ": " + m; };
        } catch {}
        setTimeout(finish, lang === "js" ? 280 : 60); // เผื่อสคริปต์ async เช่น setTimeout/Promise
      };

      // ต้องดัก console ก่อนสคริปต์ทำงาน จึงฉีดตัวดักไว้ใน srcdoc เลย
      const src = buildSource(lang, code, stage);
      const hook =
        '<script>window.__logs=[];(function(){var o=console.log;console.log=function(){' +
        'window.__logs.push([].slice.call(arguments).map(function(a){' +
        'return (typeof a==="object"&&a!==null)?JSON.stringify(a):String(a);}).join(" "));' +
        'o.apply(console,arguments);};window.onerror=function(m,s,l){window.__err="บรรทัด "+(l||"?")+": "+m;};})();</' + 'script>';
      iframe.srcdoc = src.replace(/<head([^>]*)>/i, "<head$1>" + hook).includes(hook)
        ? src.replace(/<head([^>]*)>/i, "<head$1>" + hook)
        : hook + src;

      // สำรอง: ถ้า onload ไม่ยิงภายใน 1.5 วิ ให้จบเลย
      setTimeout(() => {
        try {
          const w = iframe.contentWindow;
          if (w && w.__logs && logs.length === 0) logs.push(...w.__logs);
          if (w && w.__err) errMsg = w.__err;
        } catch {}
        finish();
      }, 1500);
    });
  }

  const api = {
    buildSource, runInFrame,
    q, qa, txt, attr, has, cssv, cssNum, cssColor, colorEq, rgbOf, hasText, pageText, used, norm
  };
  if (typeof module !== "undefined") module.exports = api;
  else window.WEB = api;
  return api;
})();
