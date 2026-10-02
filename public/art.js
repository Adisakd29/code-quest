/**
 * ART — ภาพประกอบของ Code Quest (SVG วาดเอง แนว Space Adventure + Soft Vector)
 * ใช้ SVG แทนไฟล์รูปเพื่อให้เบา คมทุกขนาดจอ และไม่ต้องโหลดไฟล์เพิ่ม
 */
const ART = (() => {
  const defs = (id, a, b) => '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs>';

  /** นักบินอวกาศพิมพ์โค้ดบนแล็ปท็อป (ภาพหน้าแรก) */
  const astronaut = `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="นักบินอวกาศกำลังเขียนโค้ด">
    <defs>
      <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d3f7"/></linearGradient>
      <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b3fd8"/><stop offset=".6" stop-color="#22b8ff"/><stop offset="1" stop-color="#8ff0ff"/></linearGradient>
      <linearGradient id="laptop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d2a4a"/><stop offset="1" stop-color="#191533"/></linearGradient>
      <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#7c4dff" stop-opacity=".35"/><stop offset="1" stop-color="#7c4dff" stop-opacity="0"/></radialGradient>
    </defs>
    <circle cx="160" cy="150" r="140" fill="url(#glow)"/>
    <g opacity=".9"><circle cx="46" cy="60" r="3" fill="#ffd166"/><circle cx="276" cy="48" r="2.5" fill="#fff"/><circle cx="290" cy="170" r="3.5" fill="#8ff0ff"/><circle cx="28" cy="200" r="2.5" fill="#ff5fa2"/></g>
    <ellipse cx="258" cy="80" rx="30" ry="30" fill="#ffb020"/><ellipse cx="258" cy="80" rx="48" ry="11" fill="none" stroke="#ff7eb6" stroke-width="5" transform="rotate(-18 258 80)"/>
    <g class="astro-float">
      <rect x="118" y="150" width="84" height="80" rx="30" fill="url(#suit)" stroke="#b39dff" stroke-width="3"/>
      <rect x="96" y="160" width="34" height="58" rx="17" fill="url(#suit)" stroke="#b39dff" stroke-width="3" transform="rotate(20 113 189)"/>
      <rect x="190" y="160" width="34" height="58" rx="17" fill="url(#suit)" stroke="#b39dff" stroke-width="3" transform="rotate(-20 207 189)"/>
      <rect x="140" y="176" width="40" height="20" rx="6" fill="#7c4dff"/><circle cx="150" cy="186" r="4" fill="#12b981"/><circle cx="162" cy="186" r="4" fill="#ffb020"/><circle cx="174" cy="186" r="4" fill="#f4436c"/>
      <circle cx="160" cy="110" r="52" fill="url(#suit)" stroke="#b39dff" stroke-width="3"/>
      <rect x="122" y="88" width="76" height="52" rx="26" fill="url(#visor)"/>
      <path d="M134 100 q10 -8 22 -6" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".75"/>
      <circle cx="146" cy="116" r="5" fill="#fff"/><circle cx="174" cy="116" r="5" fill="#fff"/><path d="M150 128 q10 8 20 0" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <rect x="156" y="52" width="8" height="14" rx="4" fill="#b39dff"/><circle cx="160" cy="48" r="7" fill="#ff5fa2"/>
    </g>
    <path d="M86 238 h148 l-14 -64 h-120 z" fill="url(#laptop)"/>
    <rect x="104" y="186" width="112" height="44" rx="4" fill="#0f0c24"/>
    <g font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">
      <text x="112" y="202" fill="#8ff0ff">print(</text><text x="152" y="202" fill="#ffd166">"Hi!"</text><text x="188" y="202" fill="#8ff0ff">)</text>
      <text x="112" y="220" fill="#b39dff">&lt;/&gt;</text><rect x="138" y="211" width="8" height="12" fill="#12b981" class="blink"/>
    </g>
    <rect x="72" y="238" width="176" height="12" rx="6" fill="#3a3560"/>
  </svg>`;

  /** CodeBot — หุ่นยนต์ผู้ช่วย ใช้ในช่องผลลัพธ์และคำใบ้ (อารมณ์: idle / think / happy / oops) */
  function codebot(mood) {
    mood = mood || "idle";
    const eyes = mood === "happy"
      ? '<path d="M21 27 q4 -5 8 0 M35 27 q4 -5 8 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : mood === "oops"
        ? '<path d="M21 23 l7 7 M28 23 l-7 7 M36 23 l7 7 M43 23 l-7 7" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'
        : '<circle cx="25" cy="27" r="4.5" fill="#fff"/><circle cx="39" cy="27" r="4.5" fill="#fff"/>';
    const mouth = mood === "happy" ? '<path d="M24 36 q8 7 16 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : mood === "oops" ? '<path d="M25 39 q7 -5 14 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : '<rect x="26" y="35" width="12" height="3.5" rx="1.75" fill="#fff"/>';
    const extra = mood === "think" ? '<circle cx="58" cy="10" r="3" fill="#ffd166"/><circle cx="54" cy="16" r="2" fill="#ffd166"/>' : "";
    return `<svg viewBox="0 0 64 70" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CodeBot">
      ${defs("cbg", "#9d7bff", "#5a2fe0")}
      <line x1="32" y1="4" x2="32" y2="12" stroke="#b39dff" stroke-width="3"/><circle cx="32" cy="4" r="4" fill="#22b8ff"/>
      <rect x="8" y="12" width="48" height="36" rx="14" fill="url(#cbg)"/>
      <rect x="13" y="17" width="38" height="26" rx="10" fill="#191533"/>
      ${eyes}${mouth}${extra}
      <rect x="18" y="50" width="28" height="14" rx="7" fill="#b39dff"/><circle cx="32" cy="57" r="3" fill="#12b981"/>
      <rect x="4" y="26" width="6" height="12" rx="3" fill="#b39dff"/><rect x="54" y="26" width="6" height="12" rx="3" fill="#b39dff"/>
    </svg>`;
  }

  /** ดาวเคราะห์ประจำแต่ละภาษา = "โลก" ที่ผู้เล่นเลือกผจญภัย */
  const P = (id, a, b, ring, deco) => `<svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="pl${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient></defs>
    <ellipse cx="70" cy="108" rx="40" ry="6" fill="#241f45" opacity=".12"/>
    ${ring ? `<ellipse cx="70" cy="60" rx="62" ry="15" fill="none" stroke="${ring}" stroke-width="6" opacity=".55" transform="rotate(-14 70 60)"/>` : ""}
    <circle cx="70" cy="58" r="42" fill="url(#pl${id})"/>
    <path d="M40 38 q18 -14 40 -6" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".35"/>
    ${deco}
    ${ring ? `<path d="M9 72 q61 28 122 -26" fill="none" stroke="${ring}" stroke-width="6" opacity=".8" transform="rotate(-2 70 60)"/>` : ""}
  </svg>`;
  const planets = {
    python: P("py", "#8ef0b5", "#10976a", "#ffd43b",
      '<path d="M44 66 q10 -14 22 -2 t24 -4" stroke="#0b6b4a" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/><circle cx="58" cy="44" r="7" fill="#3776ab"/><circle cx="84" cy="74" r="7" fill="#ffd43b"/><path d="M86 30 l6 -10 l6 10 z M96 40 l5 -8 l5 8 z" fill="#0b6b4a" opacity=".55"/>'),
    c: P("c", "#c7d4ea", "#40628f", "#ff9f43",
      '<circle cx="70" cy="58" r="15" fill="none" stroke="#1f3c66" stroke-width="7" stroke-dasharray="6 4"/><circle cx="70" cy="58" r="6" fill="#ff9f43"/><rect x="42" y="72" width="16" height="10" rx="2" fill="#1f3c66" opacity=".6"/><rect x="86" y="34" width="14" height="9" rx="2" fill="#1f3c66" opacity=".6"/>'),
    html: P("html", "#ffc39a", "#e4572e", "",
      '<rect x="46" y="48" width="12" height="28" rx="2" fill="#7a2410" opacity=".55"/><rect x="62" y="38" width="14" height="38" rx="2" fill="#7a2410" opacity=".55"/><rect x="80" y="54" width="12" height="22" rx="2" fill="#7a2410" opacity=".55"/><text x="70" y="98" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="13" fill="#fff" opacity=".9">&lt;/&gt;</text>'),
    css: P("css", "#9fdcff", "#6a4dff", "#ff5fa2",
      '<circle cx="54" cy="66" r="7" fill="#ff5fa2"/><circle cx="54" cy="66" r="3" fill="#ffd166"/><circle cx="84" cy="46" r="8" fill="#ffd166"/><circle cx="84" cy="46" r="3.5" fill="#ff5fa2"/><circle cx="80" cy="78" r="6" fill="#12b981"/><text x="70" y="36" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="12" fill="#fff" opacity=".85">{ }</text>'),
    js: P("js", "#fff29a", "#e0a800", "#22b8ff",
      '<rect x="44" y="56" width="10" height="22" fill="#6b4f00" opacity=".45"/><rect x="58" y="44" width="10" height="34" fill="#6b4f00" opacity=".45"/><rect x="72" y="50" width="10" height="28" fill="#6b4f00" opacity=".45"/><rect x="86" y="38" width="10" height="40" fill="#6b4f00" opacity=".45"/><path d="M64 30 l-6 12 h7 l-4 10 l12 -15 h-7 l4 -7 z" fill="#22b8ff"/>'),
    locked: P("lk", "#8a86a8", "#3f3b5e", "",
      '<rect x="56" y="54" width="28" height="22" rx="5" fill="#241f45" opacity=".7"/><path d="M62 54 v-7 a8 8 0 0 1 16 0 v7" stroke="#241f45" stroke-width="5" fill="none" opacity=".7"/>'),
  };

  /** บอสท้ายบท (เอเลี่ยนน่ารัก ไม่น่ากลัว) */
  const boss = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${defs("bs", "#ff7eb6", "#c2185b")}
    <ellipse cx="32" cy="36" rx="24" ry="20" fill="url(#bs)"/>
    <path d="M14 22 l-6 -12 M50 22 l6 -12" stroke="#c2185b" stroke-width="4" stroke-linecap="round"/><circle cx="8" cy="9" r="4" fill="#ffd166"/><circle cx="56" cy="9" r="4" fill="#ffd166"/>
    <circle cx="23" cy="33" r="7" fill="#fff"/><circle cx="41" cy="33" r="7" fill="#fff"/><circle cx="24" cy="34" r="3.5" fill="#241f45"/><circle cx="40" cy="34" r="3.5" fill="#241f45"/>
    <path d="M18 24 l9 4 M46 24 l-9 4" stroke="#241f45" stroke-width="3" stroke-linecap="round"/>
    <path d="M24 46 q8 5 16 0" stroke="#241f45" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;

  /** หีบสมบัติ (ภารกิจประจำวัน / รางวัล) */
  const chest = `<svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${defs("ch", "#ffc15a", "#d97706")}
    <path d="M8 24 q24 -22 48 0 v6 h-48 z" fill="url(#ch)" stroke="#8a4b00" stroke-width="3"/>
    <rect x="8" y="28" width="48" height="24" rx="4" fill="url(#ch)" stroke="#8a4b00" stroke-width="3"/>
    <rect x="28" y="26" width="8" height="12" rx="2" fill="#ffe08a" stroke="#8a4b00" stroke-width="2"/>
    <circle cx="20" cy="8" r="2.5" fill="#ffd166"/><circle cx="46" cy="6" r="2" fill="#8ff0ff"/>
  </svg>`;

  return { astronaut, codebot, planets, boss, chest };
})();
if (typeof module !== "undefined") module.exports = ART;
