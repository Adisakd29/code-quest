/**
 * settings.js — หน้าตั้งค่าบัญชีและการใช้งาน (v34)
 *
 * การตั้งค่า (preferences):
 *   - ผู้เยี่ยมชม: เก็บใน localStorage ("cq_prefs")
 *   - ผู้ใช้ที่ล็อกอิน: sync กับเซิร์ฟเวอร์ (/api/account/prefs) — ใช้ค่าจากเซิร์ฟเวอร์เป็นหลัก
 *     ถ้าบัญชียังไม่เคยตั้งค่า จะอัปโหลดค่าจากเครื่องนี้ขึ้นไป (Guest → บัญชีไม่หาย)
 *   - บันทึกอัตโนมัติทุกครั้งที่เปลี่ยน จึงไม่มีสถานะ "ยังไม่ได้บันทึก" ของการตั้งค่า
 * ค่าเริ่มต้นและค่าที่อนุญาตต้องตรงกับ PREF_SCHEMA ใน server.js
 */
(() => {
  const { AppIcon, esc } = UIKit;
  const toast = (ic, html, kind) => QUEST.toast && QUEST.toast('<span class="t-ico">' + AppIcon(ic, { size: 24 }) + "</span><div>" + html + "</div>", kind);

  /* ═══════════ 1) Preferences ═══════════ */
  const DEFAULTS = {
    fontScale: 100, highContrast: false, reduceMotion: "system", strongFocus: false, largeTargets: false, sound: true,
    editorFontSize: 16, editorTheme: "dark", lineNumbers: true, wordWrap: false, tabSize: 4,
    language: "th", dateCalendar: "buddhist", timeFormat: "24", timezone: "Asia/Bangkok",
    showOnLeaderboard: true, notifyBadges: true, notifyDaily: true, notifyRoomJoin: true,
  };
  const readLocal = () => { try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem("cq_prefs") || "{}")); } catch { return Object.assign({}, DEFAULTS); } };
  let prefs = readLocal();
  // ค่าเสียงเดิมก่อนมีหน้าตั้งค่า
  try { const s = localStorage.getItem("cq_sound"); if (s !== null && !localStorage.getItem("cq_prefs")) prefs.sound = JSON.parse(s) !== false; } catch {}
  window.cqPref = k => prefs[k];

  /** นำการตั้งค่าไปใช้กับหน้าเว็บทันที */
  function applyPrefs() {
    const b = document.body.classList;
    b.toggle("hc", !!prefs.highContrast);
    b.toggle("strong-focus", !!prefs.strongFocus);
    b.toggle("large-targets", !!prefs.largeTargets);
    b.toggle("reduce-motion", prefs.reduceMotion === "on");
    b.toggle("allow-motion", prefs.reduceMotion === "off");
    document.documentElement.style.setProperty("--ui-zoom", String(prefs.fontScale / 100));
    b.toggle("ui-zoomed", prefs.fontScale !== 100);
    // editor
    document.documentElement.style.setProperty("--editor-fs", prefs.editorFontSize + "px");
    b.toggle("editor-light", prefs.editorTheme === "light");
    b.toggle("no-line-numbers", !prefs.lineNumbers);
    b.toggle("editor-wrap", !!prefs.wordWrap);
    window.cqTabSize = prefs.tabSize;
    const code = document.getElementById("code");
    if (code) { code.setAttribute("wrap", prefs.wordWrap ? "soft" : "off"); code.style.tabSize = prefs.tabSize; }
    // เสียง (ใช้กลไกเดิมของ quest.js)
    try { localStorage.setItem("cq_sound", JSON.stringify(!!prefs.sound)); } catch {}
    document.documentElement.lang = prefs.language || "th";
  }
  /** กรองการแจ้งเตือนตามที่ผู้ใช้เลือก (quest.js เรียกก่อนแสดง toast) */
  window.cqToastFilter = html => {
    if (!prefs.notifyBadges && /ได้เหรียญใหม่/.test(html)) return false;
    if (!prefs.notifyDaily && /ภารกิจประจำวัน/.test(html)) return false;
    if (!prefs.notifyRoomJoin && /เข้าห้องแล้ว/.test(html)) return false;
    return true;
  };
  applyPrefs();

  let saveTimer = null;
  const status = (t) => { const el = $("stStatus"); if (el) { el.textContent = t; clearTimeout(el._t); if (t) el._t = setTimeout(() => (el.textContent = ""), 2500); } };
  function setPref(k, v) {
    prefs[k] = v;
    try { localStorage.setItem("cq_prefs", JSON.stringify(prefs)); } catch {}
    applyPrefs();
    if (k === "sound") { const sb = $("soundBtn"); if (sb) sb.innerHTML = AppIcon(v ? "volume-on" : "volume-off"); }
    if (!state.user) return status("บันทึกในเครื่องนี้แล้ว");
    status("กำลังบันทึก…");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try { await api("/api/account/prefs", { prefs: { [k]: v } }); status("บันทึกแล้ว ✓"); }
      catch (e) { status("บันทึกไม่สำเร็จ — ลองอีกครั้ง"); }
    }, 400);
  }
  // ปุ่มเสียงบนหัวเว็บ: ให้ตรงกับการตั้งค่า
  const sb = $("soundBtn");
  if (sb) sb.addEventListener("click", () => setTimeout(() => { try { prefs.sound = JSON.parse(localStorage.getItem("cq_sound")) !== false; localStorage.setItem("cq_prefs", JSON.stringify(prefs)); } catch {} }, 0));

  /** หลังล็อกอิน: ดึงค่าจากบัญชี (ถ้ามี) หรืออัปโหลดค่าจากเครื่องนี้ (ถ้าบัญชียังไม่เคยตั้ง) */
  async function syncPrefsOnLogin() {
    try {
      const d = await api("/api/account/prefs");
      if (d.prefs && Object.keys(d.prefs).length) {
        prefs = Object.assign({}, DEFAULTS, d.prefs);
        try { localStorage.setItem("cq_prefs", JSON.stringify(prefs)); } catch {}
        applyPrefs();
      } else {
        await api("/api/account/prefs", { prefs });
      }
      if (isOpen()) renderPrefSections();
    } catch {}
  }
  const origApply = applySession;
  applySession = function (data) { origApply(data); syncPrefsOnLogin(); if (isOpen()) renderAll(); };

  /* ═══════════ 2) วันที่/เวลาตามการตั้งค่าภาษาและภูมิภาค ═══════════ */
  function fmtDate(iso, withTime) {
    if (!iso) return "—";
    const loc = "th-TH" + (prefs.dateCalendar === "gregorian" ? "-u-ca-gregory" : "");
    const o = { timeZone: prefs.timezone, day: "numeric", month: "short", year: "numeric" };
    if (withTime) Object.assign(o, { hour: "2-digit", minute: "2-digit", hour12: prefs.timeFormat === "12" });
    try { return new Intl.DateTimeFormat(loc, o).format(new Date(iso)); } catch { return new Date(iso).toLocaleString("th-TH"); }
  }
  function ago(iso) {
    const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 2) return "ใช้งานอยู่ตอนนี้";
    if (m < 60) return m + " นาทีที่แล้ว";
    if (m < 60 * 24) return Math.round(m / 60) + " ชั่วโมงที่แล้ว";
    return fmtDate(iso, true);
  }

  /* ═══════════ 3) ส่วนประกอบของฟอร์ม ═══════════ */
  const uid = (() => { let n = 0; return p => p + (++n); })();
  function toggle(key, label, desc) {
    const id = uid("pf-");
    return '<div class="st-toggle"><div><label for="' + id + '">' + esc(label) + "</label>" + (desc ? '<p class="st-hint" id="' + id + 'd">' + esc(desc) + "</p>" : "") + "</div>" +
      '<input type="checkbox" role="switch" id="' + id + '" data-pref="' + key + '"' + (prefs[key] ? " checked" : "") + (desc ? ' aria-describedby="' + id + 'd"' : "") + "></div>";
  }
  function choice(key, label, options, desc) {
    const name = uid("pfc-");
    return '<fieldset class="st-choice"><legend>' + esc(label) + "</legend>" + (desc ? '<p class="st-hint">' + esc(desc) + "</p>" : "") + '<div class="st-seg">' +
      options.map(([v, t, dis]) => '<label class="' + (dis ? "disabled" : "") + '"><input type="radio" name="' + name + '" data-pref="' + key + '" value="' + esc(v) + '"' +
        (String(prefs[key]) === String(v) ? " checked" : "") + (dis ? " disabled" : "") + "><span>" + esc(t) + "</span></label>").join("") + "</div></fieldset>";
  }
  function select(key, label, options) {
    const id = uid("pfs-");
    return '<div class="field st-select"><label for="' + id + '">' + esc(label) + '</label><select id="' + id + '" data-pref="' + key + '">' +
      options.map(([v, t]) => '<option value="' + esc(v) + '"' + (String(prefs[key]) === String(v) ? " selected" : "") + ">" + esc(t) + "</option>").join("") + "</select></div>";
  }
  function bindPrefInputs(root) {
    root.querySelectorAll("[data-pref]").forEach(el => {
      el.onchange = () => {
        const k = el.dataset.pref, def = DEFAULTS[k];
        let v = el.type === "checkbox" ? el.checked : el.value;
        if (typeof def === "number") v = Number(v);
        setPref(k, v);
        if (k.startsWith("editor") || k === "lineNumbers" || k === "wordWrap" || k === "tabSize") paintEditorPreview();
        if (["dateCalendar", "timeFormat", "timezone"].includes(k)) { paintRegionPreview(); if (state.user) loadDevices(); }
      };
    });
  }

  /* ═══════════ 4) หน้าตั้งค่า ═══════════ */
  const SECTIONS = [["st-profile", "โปรไฟล์", 1], ["st-security", "ความปลอดภัย", 1], ["st-linked", "บัญชีที่เชื่อมต่อ", 1], ["st-devices", "อุปกรณ์", 1],
    ["st-privacy", "ความเป็นส่วนตัว", 1], ["st-notify", "การแจ้งเตือน", 0], ["st-display", "การแสดงผล", 0], ["st-editor", "Code Editor", 0],
    ["st-region", "ภาษาและภูมิภาค", 0], ["st-data", "ข้อมูลของฉัน", 1], ["st-danger", "โซนอันตราย", 1]];
  const isOpen = () => !$("settingsScreen").classList.contains("hide");
  let overview = null;

  function renderNav() {
    $("stNav").innerHTML = SECTIONS.filter(s => state.user || !s[2]).map(([id, t]) =>
      '<a href="#' + id + '" class="' + (id === "st-danger" ? "danger" : "") + '">' + esc(t) + "</a>").join("");
    $("stNav").querySelectorAll("a").forEach(a => a.onclick = e => {
      e.preventDefault(); const el = $(a.getAttribute("href").slice(1));
      el.scrollIntoView({ behavior: document.body.classList.contains("reduce-motion") ? "auto" : "smooth", block: "start" });
      el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true });
    });
  }

  function renderPrefSections() {
    $("stNotify").innerHTML =
      '<p class="st-hint">การแจ้งเตือนภายในเกม (แสดงมุมจอ) — การแจ้งเตือนทางอีเมลยังไม่เปิดใช้ เพราะระบบส่งอีเมลยังไม่พร้อม</p>' +
      toggle("notifyBadges", "เมื่อได้เหรียญรางวัลใหม่") + toggle("notifyDaily", "เมื่อทำภารกิจประจำวันครบ") + toggle("notifyRoomJoin", "เมื่อมีผู้เล่นเข้าห้องแข่งขัน");
    $("stDisplay").innerHTML =
      choice("fontScale", "ขนาดตัวอักษรและปุ่ม", [[100, "ปกติ"], [115, "ใหญ่"], [130, "ใหญ่มาก"]]) +
      choice("reduceMotion", "ภาพเคลื่อนไหว", [["system", "ตามระบบ"], ["on", "ลดการเคลื่อนไหว"], ["off", "แสดงตามปกติ"]]) +
      toggle("highContrast", "คอนทราสต์สูง", "สีเข้มขึ้น เส้นขอบชัดขึ้น ปิดลวดลายพื้นหลัง") +
      toggle("strongFocus", "กรอบโฟกัสชัดพิเศษ", "เห็นตำแหน่งชัดขึ้นเมื่อใช้คีย์บอร์ด") +
      toggle("largeTargets", "ปุ่มขนาดใหญ่", "เพิ่มพื้นที่กดของปุ่มและช่องกรอกเป็นอย่างน้อย 48px") +
      toggle("sound", "เสียงประกอบ") +
      '<p class="st-hint">โหมดมืดยังไม่รองรับ — กำลังพัฒนา</p>';
    $("stEditor").innerHTML =
      choice("editorFontSize", "ขนาดตัวอักษรในช่องโค้ด", [[14, "14"], [16, "16"], [18, "18"], [20, "20"], [22, "22"]]) +
      choice("editorTheme", "ธีมของช่องโค้ด", [["dark", "เข้ม"], ["light", "สว่าง"]]) +
      choice("tabSize", "ขนาดการย่อหน้า (Tab)", [[2, "2 ช่อง"], [4, "4 ช่อง"]]) +
      toggle("lineNumbers", "แสดงเลขบรรทัด") + toggle("wordWrap", "ตัดบรรทัดยาวอัตโนมัติ", "ถ้าปิด บรรทัดยาวจะเลื่อนแนวนอนภายในช่องโค้ด");
    $("stRegion").innerHTML =
      choice("language", "ภาษาของหน้าเว็บ", [["th", "ไทย"], ["en", "English (เร็วๆ นี้)", 1]]) +
      choice("dateCalendar", "ปีปฏิทิน", [["buddhist", "พ.ศ."], ["gregorian", "ค.ศ."]]) +
      choice("timeFormat", "รูปแบบเวลา", [["24", "24 ชั่วโมง"], ["12", "12 ชั่วโมง"]]) +
      select("timezone", "เขตเวลา", [["Asia/Bangkok", "ไทย (GMT+7)"], ["Asia/Singapore", "สิงคโปร์ (GMT+8)"], ["Asia/Tokyo", "ญี่ปุ่น (GMT+9)"], ["Asia/Kolkata", "อินเดีย (GMT+5:30)"], ["Europe/London", "ลอนดอน"], ["America/New_York", "นิวยอร์ก"], ["UTC", "UTC"]]) +
      '<p class="st-hint" id="stRegionPreview"></p>';
    $("stPrivacy").innerHTML = toggle("showOnLeaderboard", "แสดงชื่อในตารางอันดับ", "ถ้าปิด ชื่อ เลเวล และ EXP ของคุณจะไม่ปรากฏในตารางอันดับ (ยังเข้าห้องแข่งได้ตามปกติ)");
    ["stNotify", "stDisplay", "stEditor", "stRegion", "stPrivacy"].forEach(id => bindPrefInputs($(id)));
    paintEditorPreview(); paintRegionPreview();
  }
  function paintEditorPreview() {
    const tab = " ".repeat(prefs.tabSize);
    const lines = ["def greet(name):", tab + 'print("สวัสดี " + name + " ยินดีต้อนรับสู่ Code Quest นักผจญภัยสายโค้ด")', "", 'greet("มะลิ")'];
    $("stEditorPreview").innerHTML = lines.map((l, i) => '<span class="ln">' + (i + 1) + "</span>" + esc(l)).join("\n");
  }
  function paintRegionPreview() { const el = $("stRegionPreview"); if (el) el.textContent = "ตัวอย่าง: " + fmtDate(new Date().toISOString(), true); }

  async function loadOverview() {
    try { overview = await api("/api/account/overview"); } catch (e) { overview = null; }
    return overview;
  }
  function renderProfile() {
    const u = (overview && overview.user) || state.user;
    $("stProfile").innerHTML =
      '<div class="stp-av">' + QUEST.avatarHtml(u.avatar, u.name) + "</div>" +
      '<div class="stp-info"><div class="stp-name">' + esc(u.name) + "</div>" +
      '<div class="stp-meta">' + esc(u.emailMasked || "") + " · " + (u.emailVerified ? '<span class="status-pill ok sm">' + AppIcon("check-circle", { size: 12 }) + "ยืนยันอีเมลแล้ว</span>" : '<span class="status-pill muted sm">ยังไม่ยืนยันอีเมล</span>') + "</div>" +
      '<div class="stp-meta">LV.' + (state.level || u.level) + " · สมาชิกตั้งแต่ " + fmtDate(overview && overview.createdAt) + "</div></div>" +
      '<button type="button" class="btn-ghost" id="stEditProfile">' + AppIcon("edit", { size: 18 }) + "<span>แก้ไขชื่อและตัวละคร</span></button>";
    $("stEditProfile").onclick = () => openProfileModal();
  }
  function renderSecurity() {
    const u = (overview && overview.user) || state.user;
    const emailRow = u.emailVerified ? "อีเมลของคุณยืนยันแล้ว"
      : overview && overview.emailVerificationAvailable ? 'ยังไม่ได้ยืนยันอีเมล <button type="button" class="link-btn inline" id="stVerifyNow">ยืนยันตอนนี้</button>'
      : "ระบบยืนยันอีเมลยังไม่เปิดใช้งาน";
    $("stEmailRow").innerHTML = AppIcon(u.emailVerified ? "check-circle" : "info", { size: 18 }) + "<span><b>อีเมล:</b> " + esc(u.emailMasked || "") + " — " + emailRow + "</span>";
    if ($("stVerifyNow")) $("stVerifyNow").onclick = () => window.openVerify && window.openVerify(false);
    const hasPw = u.hasPassword !== false;
    $("stPwTitle").textContent = hasPw ? "เปลี่ยนรหัสผ่าน" : "ตั้งรหัสผ่าน (เพื่อเข้าสู่ระบบด้วยอีเมลได้ด้วย)";
    $("stCurWrap").classList.toggle("hide", !hasPw);
    $("stCur").disabled = !hasPw;
    $("stPwUser").value = u.emailMasked || "";
    document.querySelectorAll(".st-reauth").forEach(el => el.classList.toggle("hide", !hasPw));
  }
  function renderLinked() {
    const u = (overview && overview.user) || state.user;
    const g = overview && overview.identities.find(i => i.provider === "google");
    const hasPw = u.hasPassword !== false;
    const gAvail = overview && overview.googleAvailable;
    $("stLinked").innerHTML =
      '<div class="st-linked-row"><svg class="g-logo" viewBox="0 0 48 48" width="28" height="28" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>' +
      '<div class="st-linked-info"><b>Google</b><span class="st-hint">' + (g ? "เชื่อมแล้ว · " + esc(g.email || "") + " · ตั้งแต่ " + fmtDate(g.linkedAt) : gAvail ? "ยังไม่ได้เชื่อม" : "ระบบเข้าสู่ระบบด้วย Google ยังไม่เปิดใช้งาน") + "</span></div>" +
      (g ? (hasPw ? '<button type="button" class="btn-ghost" id="stUnlinkOpen">ยกเลิกการเชื่อม</button>' : '<span class="st-hint st-lock">' + AppIcon("lock", { size: 14 }) + " ช่องทางเข้าสู่ระบบเดียว — ตั้งรหัสผ่านก่อนจึงยกเลิกได้</span>")
         : gAvail ? '<a class="btn-ghost" href="/api/auth/google/start?mode=link">เชื่อม Google</a>' : "") + "</div>" +
      '<form class="st-form hide" id="stUnlinkForm" novalidate><div class="field"><label for="stUnlinkPw">ยืนยันด้วยรหัสผ่าน</label><input id="stUnlinkPw" type="password" autocomplete="current-password" maxlength="128"></div>' +
      '<div class="form-msg" id="stUnlinkMsg" role="alert"></div><div class="st-actions"><button type="submit" class="btn-danger">ยกเลิกการเชื่อม Google</button><button type="button" class="btn-ghost" id="stUnlinkCancel">ไม่ใช่ตอนนี้</button></div></form>' +
      '<p class="st-hint">วิธีเข้าสู่ระบบของบัญชีนี้: ' + [hasPw ? "อีเมลและรหัสผ่าน" : "", g ? "Google" : ""].filter(Boolean).join(" · ") + "</p>";
    if ($("stUnlinkOpen")) $("stUnlinkOpen").onclick = () => { $("stUnlinkForm").classList.remove("hide"); $("stUnlinkPw").focus(); };
    if ($("stUnlinkCancel")) $("stUnlinkCancel").onclick = () => $("stUnlinkForm").classList.add("hide");
    const f = $("stUnlinkForm");
    if (f) f.onsubmit = async e => {
      e.preventDefault();
      try { await api("/api/account/google/unlink", { password: $("stUnlinkPw").value }); toast("check-circle", "<b>ยกเลิกการเชื่อม Google แล้ว</b>"); await refresh(); }
      catch (err) { $("stUnlinkMsg").textContent = err.message; $("stUnlinkMsg").className = "form-msg err"; }
    };
  }
  async function loadDevices() {
    const ul = $("stDevices");
    ul.innerHTML = '<li class="st-hint">กำลังโหลด…</li>';
    try {
      const d = await api("/api/account/sessions");
      ul.innerHTML = d.sessions.map(s =>
        '<li class="st-device' + (s.current ? " current" : "") + '"><span class="dv-ico">' + AppIcon(s.kind === "mobile" ? "keyboard" : "monitor", { size: 20 }) + "</span>" +
        '<div class="dv-info"><b>' + esc(s.browser) + " · " + esc(s.os) + "</b>" + (s.current ? ' <span class="status-pill ok sm">อุปกรณ์นี้</span>' : "") +
        '<span class="st-hint">' + ago(s.lastSeenAt) + " · เข้าสู่ระบบ " + fmtDate(s.createdAt, true) + "</span></div>" +
        (s.current ? "" : '<button type="button" class="btn-ghost sm" data-revoke="' + esc(s.id) + '" aria-label="ออกจากระบบ ' + esc(s.browser + " " + s.os) + '">ออกจากระบบ</button>') + "</li>").join("") +
        (d.legacyCurrent ? '<li class="st-hint">อุปกรณ์นี้เข้าสู่ระบบก่อนมีระบบรายการอุปกรณ์ — จะแสดงหลังเข้าสู่ระบบครั้งถัดไป</li>' : "") ||
        '<li class="st-hint">ไม่มีอุปกรณ์อื่น</li>';
      ul.querySelectorAll("[data-revoke]").forEach(b => b.onclick = async () => {
        b.disabled = true;
        try { await api("/api/account/sessions/" + encodeURIComponent(b.dataset.revoke) + "/revoke", {}); toast("check-circle", "ออกจากระบบอุปกรณ์นั้นแล้ว"); loadDevices(); }
        catch (e) { b.disabled = false; toast("warning", esc(e.message)); }
      });
    } catch (e) { ul.innerHTML = '<li class="form-msg err">' + esc(e.message) + "</li>"; }
  }

  function renderAll() {
    const logged = !!state.user;
    $("stGuest").classList.toggle("hide", logged);
    document.querySelectorAll("#settingsScreen .acct-only").forEach(el => el.classList.toggle("hide", !logged));
    renderNav();
    renderPrefSections();
    if (!logged) return;
    renderProfile(); renderSecurity(); renderLinked(); loadDevices();
    loadOverview().then(() => { if (!state.user) return; renderProfile(); renderSecurity(); renderLinked(); });
  }
  async function refresh() { await loadOverview(); renderAll(); }

  /* ═══════════ 5) การกระทำ ═══════════ */
  $("stGuestSignup").onclick = () => { setAuthMode("register"); $("authOverlay").classList.add("show"); };

  $("stPwForm").onsubmit = async e => {
    e.preventDefault();
    const msg = $("stPwMsg"), n1 = $("stNew").value, n2 = $("stNew2").value;
    msg.className = "form-msg";
    if (n1 !== n2) { msg.textContent = "รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน"; msg.className = "form-msg err"; $("stNew2").focus(); return; }
    const btn = $("stPwSave"); btn.disabled = true;
    try {
      const d = await api("/api/account/password", { currentPassword: $("stCur").value, newPassword: n1 });
      $("stCur").value = $("stNew").value = $("stNew2").value = "";
      msg.textContent = (d.firstPassword ? "ตั้งรหัสผ่านแล้ว" : "เปลี่ยนรหัสผ่านแล้ว") + " — อุปกรณ์อื่นทั้งหมดถูกออกจากระบบ"; msg.className = "form-msg ok";
      await refresh();
    } catch (err) { msg.textContent = err.message; msg.className = "form-msg err"; }
    finally { btn.disabled = false; }
  };

  $("stRevokeOthers").onclick = async () => {
    if (!confirm("ออกจากระบบอุปกรณ์อื่นทั้งหมด? (อุปกรณ์นี้ยังใช้งานต่อได้)")) return;
    try { await api("/api/account/sessions/revoke-others", {}); toast("check-circle", "<b>ออกจากระบบอุปกรณ์อื่นแล้ว</b>"); loadDevices(); }
    catch (e) { toast("warning", esc(e.message)); }
  };
  $("stLogoutAll").onclick = async () => {
    if (!confirm("ออกจากระบบทุกอุปกรณ์ รวมอุปกรณ์นี้ด้วย?")) return;
    try { await api("/api/account/sessions/revoke-others", {}); } catch {}
    $("authBtn").click();   // ออกจากระบบอุปกรณ์นี้ด้วยขั้นตอนเดิม
  };

  /** ข้อความ "ต้องยืนยันตัวตนใหม่" สำหรับบัญชี Google-only */
  const reauthHtml = err => err.code === "REAUTH_GOOGLE"
    ? esc(err.message) + ' <a class="link-btn inline" href="/api/auth/google/start?mode=reauth&open=settings">เข้าสู่ระบบด้วย Google อีกครั้ง</a>' : esc(err.message);

  $("stExport").onclick = async () => {
    const msg = $("stExportMsg"); msg.className = "form-msg";
    const btn = $("stExport"); btn.disabled = true;
    try {
      const data = await api("/api/account/export", { password: $("stExportPw").value });
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "code-quest-data-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      $("stExportPw").value = "";
      msg.textContent = "ดาวน์โหลดแล้ว"; msg.className = "form-msg ok";
    } catch (err) { msg.innerHTML = reauthHtml(err); msg.className = "form-msg err"; }
    finally { btn.disabled = false; }
  };

  $("stDeleteOpen").onclick = () => { $("stDeleteForm").classList.remove("hide"); ($("stDelPw").offsetParent ? $("stDelPw") : $("stDelConfirm")).focus(); };
  $("stDeleteCancel").onclick = () => { $("stDeleteForm").classList.add("hide"); $("stDelPw").value = $("stDelConfirm").value = ""; };
  $("stDeleteForm").onsubmit = async e => {
    e.preventDefault();
    const msg = $("stDelMsg"); msg.className = "form-msg";
    if ($("stDelConfirm").value.trim() !== "ลบบัญชี") { msg.textContent = "พิมพ์คำว่า “ลบบัญชี” ให้ถูกต้องเพื่อยืนยัน"; msg.className = "form-msg err"; $("stDelConfirm").focus(); return; }
    const btn = $("stDelete"); btn.disabled = true;
    try {
      await api("/api/account/delete", { password: $("stDelPw").value, confirm: $("stDelConfirm").value });
      // ล้างข้อมูลของบัญชีนี้ที่ค้างในเครื่อง
      const name = state.user && state.user.name;
      try { Object.keys(localStorage).filter(k => k === "cq_had_session" || (name && k.startsWith("cq_code:v1:u:" + name + ":"))).forEach(k => localStorage.removeItem(k)); } catch {}
      state = { user: null, level: 1, xp: 0, lang: null, topic: null, stage: 0, done: new Set() };
      $("pname").textContent = "ผู้เยี่ยมชม"; $("authBtn").textContent = "เข้าสู่ระบบ";
      renderAvatar(); renderXP(); renderLangs();
      showLanding();
      toast("check-circle", "<b>ลบบัญชีเรียบร้อยแล้ว</b><br>ขอบคุณที่ร่วมผจญภัยกับ Code Quest");
    } catch (err) { msg.innerHTML = reauthHtml(err); msg.className = "form-msg err"; btn.disabled = false; }
  };

  /* ═══════════ 6) การนำทาง: แท็บ "โปรไฟล์" → หน้าตั้งค่า ═══════════ */
  const openProfileModal = $("profileBtn").onclick;   // modal โปรไฟล์เดิม (ชื่อ/ตัวละคร/รูป)
  function openSettings() {
    showScreen("settings");
    renderAll();
    window.scrollTo(0, 0);
  }
  window.openSettings = openSettings;
  $("profileBtn").onclick = openSettings;
  const tabLabel = $("profileBtn").querySelector("span"); if (tabLabel) tabLabel.textContent = "ตั้งค่า";
  $("profileBtn").setAttribute("aria-label", "ตั้งค่าและโปรไฟล์");
  const origShow = showScreen;
  showScreen = function (name) {
    origShow(name);
    $("settingsScreen").classList.toggle("hide", name !== "settings");
    const on = name === "settings";
    $("profileBtn").classList.toggle("on", on);
    if (on) $("profileBtn").setAttribute("aria-current", "page"); else $("profileBtn").removeAttribute("aria-current");
  };
  // modal โปรไฟล์: ย้ายการเปลี่ยนรหัสผ่านไปหน้าตั้งค่า (ช่องเดิมซ่อนไว้ ส่งค่าว่าง = ไม่เปลี่ยน)
  document.querySelector("#profileOverlay .divider") && document.querySelector("#profileOverlay .divider").insertAdjacentHTML("beforebegin",
    '<p class="st-hint pf-moved">เปลี่ยนรหัสผ่านได้ที่ <button type="button" class="link-btn inline" id="pfToSecurity">ตั้งค่า › ความปลอดภัย</button></p>');
  if ($("pfToSecurity")) $("pfToSecurity").onclick = () => { $("profileOverlay").classList.remove("show"); openSettings(); setTimeout(() => $("st-security").scrollIntoView(), 50); };
  // บันทึกโปรไฟล์แล้วรีเฟรชหน้าตั้งค่า
  const pfSave = $("pfSave").onclick;
  $("pfSave").onclick = async e => { await pfSave(e); if (isOpen()) setTimeout(refresh, 300); };

  // กลับจาก Google พร้อม ?open=settings
  if (window.__cqOpen === "settings") setTimeout(openSettings, 1200);
})();
