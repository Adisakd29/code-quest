/**
 * stage-icons.js — ไอคอนประจำหัวข้อ/ด่านบนแผนที่ภารกิจ (แหล่งเดียวของทั้งระบบ)
 *
 * ใช้ไอคอน Lucide ชุดเดียวผ่าน UIKit.AppIcon → ขนาด เส้น และน้ำหนักเท่ากันทุกด่าน
 * ไฟล์นี้ทำหน้าที่ "เลือกไอคอน" เท่านั้น ไม่รู้เรื่องความคืบหน้า/สถานะ (อยู่ใน quest.js)
 * และไม่กำหนดสี (อยู่ใน style.css: .stage-icon)
 *
 * ── ปรับเองได้ง่าย ──
 *   • เปลี่ยนไอคอนของหัวข้อ   → แก้ STAGE_ICON_MAP (key = id หัวข้อในข้อมูลคอร์ส)
 *   • หัวข้อใหม่ที่ยังไม่ใส่ map → ระบบเดาจากชื่อด้วย STAGE_ICON_RULES อัตโนมัติ
 *   • ใช้ไอคอน Lucide ตัวใหม่   → เพิ่มชื่อใน tools/build-icons.js แล้วรัน npm run build:icons
 *   • ปรับขนาด/เส้นทั้งระบบ     → แก้ STAGE_ICON_STYLE ด้านล่าง
 */
(function (root) {
  /**
   * @typedef {Object} TopicLike
   * @property {string} [id]     id หัวข้อ เช่น "variable", "cflex"
   * @property {string} [title]  ชื่อหัวข้อ เช่น "บทที่ 3-1: ตัวแปร (Variables)"
   */
  /**
   * @typedef {"default"|"done"|"current"|"locked"|"theory"|"boss"} StageVisualState
   */

  /** ขนาดและเส้นของไอคอนด่าน — ค่าเดียวใช้ทุกด่าน */
  const STAGE_ICON_STYLE = { size: 30, stroke: 2 };

  /** ไอคอนเมื่อหาคู่ไม่เจอ */
  const DEFAULT_STAGE_ICON = "circle-dot";

  /**
   * id หัวข้อ → ชื่อไอคอน Lucide (ต้องมีใน tools/build-icons.js)
   * @type {Record<string, string>}
   */
  const STAGE_ICON_MAP = {
    // ── Python ──
    intro: "square-terminal",        // รู้จัก Python และเครื่องมือ
    print: "code",                   // เริ่มเขียนโปรแกรม (print/input)
    variable: "package",             // ตัวแปร — กล่องเก็บค่า
    datatype: "layers",              // ชนิดข้อมูล
    string: "quote",                 // ข้อความ (String)
    list: "list",                    // ลิสต์
    tupleset: "brackets",            // Tuple และ Set
    dict: "key-round",               // Dictionary — คู่ key/value
    operator: "calculator",          // ตัวดำเนินการ
    ifelse: "split",                 // คำสั่งเงื่อนไข — ทางแยก
    loop: "repeat",                  // คำสั่งทำซ้ำ
    flowchart: "workflow",           // Flowchart สู่โค้ด
    function: "square-function",     // ฟังก์ชันและโมดูล
    exception: "shield-alert",       // การจัดการข้อผิดพลาด
    oop: "boxes",                    // เชิงวัตถุ
    filehandling: "file-text",       // จัดการไฟล์
    gui: "app-window",               // GUI Tkinter
    database: "database",            // ฐานข้อมูล
    webapp: "globe",                 // เว็บแอป / Web Scraping
    api: "plug",                     // API และ Microservices
    datascience: "chart-column",     // Data Science
    // ── C ──
    cintro: "square-terminal",       // แนะนำภาษาซี
    cvs: "laptop",                   // Visual Studio 2022
    concept: "lightbulb",            // แนวคิดในการเขียนโปรแกรม
    ctypes: "package",               // ตัวแปรกับชนิดข้อมูล
    coper: "calculator",             // โอเปอเรเตอร์
    cio: "arrow-left-right",         // รับและแสดงผลข้อมูล
    cctrl: "split",                  // คำสั่งควบคุม
    carray: "list-ordered",          // อาร์เรย์ — มีลำดับช่อง
    cptr: "at-sign",                 // พอยน์เตอร์ — ที่อยู่ (&)
    cfunc: "square-function",        // ฟังก์ชัน
    // ── HTML ──
    hbasic: "code-xml",              // เริ่มต้น HTML
    htext: "type",                   // ข้อความและการจัดรูปแบบ
    hlist: "link",                   // ลิสต์และลิงก์
    himg: "image",                   // รูปภาพและสื่อ
    htable: "table",                 // ตาราง
    hform: "text-cursor-input",      // ฟอร์ม
    hsem: "layout-template",         // Semantic HTML
    hadv: "sparkles",                // HTML ขั้นสูง
    // ── CSS ──
    cssbasic: "palette",             // พื้นฐาน CSS
    csstext: "baseline",             // สีและตัวอักษร
    cssbox: "square-dashed",         // Box Model
    csssel: "crosshair",             // Selector ขั้นสูง
    cssflex: "columns-3",            // Flexbox
    cssgrid: "layout-grid",          // CSS Grid
    csspos: "move",                  // ตำแหน่งและการซ้อนทับ
    cssadv: "monitor-smartphone",    // ขั้นสูงและ Responsive
    // ── C++ ──
    cppintro: "square-terminal",     // รู้จัก C++
    cppio: "arrow-left-right",       // รับและแสดงผล
    cppvars: "package",              // ตัวแปรและชนิดข้อมูล
    cppops: "calculator",            // ตัวดำเนินการและการแปลงชนิด
    // ── JavaScript ──
    jsbasic: "square-terminal",      // พื้นฐาน JavaScript
    jsop: "toggle-right",            // ตัวดำเนินการและเงื่อนไข
    jsloop: "repeat",                // การวนซ้ำ
    jsfunc: "square-function",       // ฟังก์ชัน
    jsarray: "list-ordered",         // อาร์เรย์
    jsobj: "braces",                 // ออบเจ็กต์
    jsdom: "network",                // จัดการ DOM — ต้นไม้ของอิลิเมนต์
    jsevent: "mouse-pointer-click",  // เหตุการณ์และฟอร์ม
    jsadv: "hourglass",              // ขั้นสูง (async, class)
  };

  /**
   * กฎสำรอง: จับคู่จากชื่อหัวข้อ (ใช้กับหัวข้อใหม่ที่ยังไม่อยู่ใน STAGE_ICON_MAP) — ตรวจจากบนลงล่าง
   * @type {Array<[RegExp, string]>}
   */
  const STAGE_ICON_RULES = [
    [/เครื่องมือ|แนะนำ|intro/i, "square-terminal"],
    [/print|input|เริ่มเขียน/i, "code"],
    [/ตัวแปร|variable/i, "package"],
    [/ชนิดข้อมูล|data ?type/i, "layers"],
    [/ข้อความ|string|text/i, "quote"],
    [/ลิสต์|list|อาร์เรย์|array/i, "list"],
    [/dict|object|ออบเจ็กต์/i, "braces"],
    [/ตัวดำเนินการ|operator|โอเปอเรเตอร์/i, "calculator"],
    [/เงื่อนไข|if|ควบคุม/i, "split"],
    [/ทำซ้ำ|loop|วนซ้ำ/i, "repeat"],
    [/ฟังก์ชัน|function/i, "square-function"],
    [/ข้อผิดพลาด|error|exception/i, "shield-alert"],
    [/ไฟล์|file/i, "file-text"],
    [/ฐานข้อมูล|database|sql/i, "database"],
    [/api/i, "plug"],
    [/ฟอร์ม|form/i, "text-cursor-input"],
    [/ตาราง|table/i, "table"],
    [/รูปภาพ|image|สื่อ/i, "image"],
    [/grid/i, "layout-grid"],
    [/flex/i, "columns-3"],
    [/responsive|ขั้นสูง|advanced/i, "sparkles"],
  ];

  /**
   * เลือกไอคอนของหัวข้อ: id ใน map → กฎจากชื่อ → ค่าเริ่มต้น
   * @param {TopicLike|string} topicOrTitle  ออบเจ็กต์หัวข้อ หรือ id หรือชื่อหัวข้อ
   * @returns {string} ชื่อไอคอน Lucide
   */
  function getStageIcon(topicOrTitle) {
    const t = typeof topicOrTitle === "string" ? { id: topicOrTitle, title: topicOrTitle } : (topicOrTitle || {});
    if (t.id && STAGE_ICON_MAP[t.id]) return STAGE_ICON_MAP[t.id];
    const title = String(t.title || "");
    for (const [re, icon] of STAGE_ICON_RULES) if (re.test(title)) return icon;
    return DEFAULT_STAGE_ICON;
  }

  /**
   * HTML ของไอคอนด่าน (ใช้แทน emoji/ภาพประกอบเดิม) — สีมาจาก CSS ตามคลาสสถานะของ node
   * @param {TopicLike|string} topicOrTitle
   * @param {{size?: number}} [o]
   * @returns {string}
   */
  function renderStageIcon(topicOrTitle, o) {
    const size = (o && o.size) || STAGE_ICON_STYLE.size;
    return '<span class="stage-icon" aria-hidden="true">' +
      UIKit.AppIcon(getStageIcon(topicOrTitle), { size: size, stroke: STAGE_ICON_STYLE.stroke }) + "</span>";
  }

  const api = { STAGE_ICON_MAP, STAGE_ICON_RULES, DEFAULT_STAGE_ICON, STAGE_ICON_STYLE, getStageIcon, renderStageIcon };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.StageIcons = api;
})(typeof window !== "undefined" ? window : globalThis);
