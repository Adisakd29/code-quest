/**
 * quest.js — ประสบการณ์แบบเกมผจญภัย "นักสำรวจจักรวาลแห่งโค้ด"
 * ต่อยอดจาก game.js (ใช้ state / COURSES / ฟังก์ชันเดิม) โดยไม่แก้ตรรกะการตรวจคำตอบ
 */
(() => {
  /* ═══════════ ข้อมูลโลก (ดาวเคราะห์) ═══════════ */
  /* ข้อมูลโลกมาจาก world-themes.js (แหล่งเดียว) — คงรูปแบบ WORLDS เดิมไว้ให้โค้ดส่วนอื่นใช้ต่อได้ */
  /** ลำดับภาษาในทุกหน้า = ลำดับโลกใน world-themes.js (ตรงกับหน้าแรก) */
  const langOrder = () => [...Object.keys(WorldThemes.LANGUAGE_THEME_MAP).filter(k => COURSES[k]), ...Object.keys(COURSES).filter(k => !WorldThemes.LANGUAGE_THEME_MAP[k])];
  const WORLDS = Object.fromEntries(Object.entries(WorldThemes.LANGUAGE_THEME_MAP).map(([k, t]) =>
    [k, { name: t.worldName, sub: t.tagline, color: t.accent.base, rec: !!t.recommended }]));

  const LOADING_LINES = { python: "งูน้อยกำลังคิด...", c: "กำลังประกอบเฟือง...", html: "กำลังก่ออิฐ HTML...", css: "กำลังผสมสี...", js: "กำลังปลุกเมือง JavaScript..." };
  const reduceMotion = () => document.body.classList.contains("reduce-motion") || (!document.body.classList.contains("allow-motion") && window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
                  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
  const shortTitle = t => String(t).replace(/^(หน่วยที่|บทที่)\s*[\d\-]+:\s*/, "");
  const diffOf = xp => (xp >= 80 ? 3 : xp >= 60 ? 2 : 1);
  const STAR_LABEL = ["", "ง่าย", "ปานกลาง", "ท้าทาย"];
  const stars = n => "★".repeat(n) + "☆".repeat(3 - n);
  /** ด่านบอส = ด่านเขียนโค้ดสุดท้ายของหัวข้อ (ข้อสอบทฤษฎีท้ายหัวข้อไม่นับเป็นบอส) */
  const bossIndex = t => { for (let i = t.stages.length - 1; i >= 0; i--) if (!t.stages[i].quiz) return t.stages.length > 1 ? i : -1; return -1; };
  window.QUEST = { WORLDS, diffOf, stars, esc, store };

  /* ═══════════ เสียงประกอบ (สังเคราะห์ด้วย WebAudio ไม่ต้องโหลดไฟล์ ไม่มีเพลงเล่นอัตโนมัติ) ═══════════ */
  let actx = null;
  const soundOn = () => store.get("cq_sound", true);
  function tone(f, t0, dur, type, vol) {
    if (!soundOn()) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain(), now = actx.currentTime + t0;
      o.type = type || "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(vol || 0.07, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.connect(g); g.connect(actx.destination); o.start(now); o.stop(now + dur + 0.02);
    } catch {}
  }
  const SFX = {
    pass: () => [523, 659, 784].forEach((f, i) => tone(f, i * 0.09, 0.22, "triangle")),
    fail: () => tone(220, 0, 0.25, "sine", 0.05),
    level: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.35, "triangle", 0.08)),
    badge: () => [880, 1175].forEach((f, i) => tone(f, i * 0.1, 0.25, "sine")),
    join: () => tone(660, 0, 0.12, "sine", 0.05),
    tick: () => tone(440, 0, 0.12, "square", 0.04),
    go: () => tone(880, 0, 0.35, "square", 0.05),
  };
  window.QUEST.SFX = SFX;
  function paintSound() {
    const b = $("soundBtn"), on = soundOn();
    b.innerHTML = UIKit.AppIcon(on ? "volume-on" : "volume-off");
    b.setAttribute("aria-pressed", String(on));
    b.setAttribute("aria-label", on ? "ปิดเสียงประกอบ" : "เปิดเสียงประกอบ");
  }
  $("soundBtn").onclick = () => { store.set("cq_sound", !soundOn()); paintSound(); if (soundOn()) SFX.join(); };
  paintSound();
  $("appVer").textContent = String(CONTENT_VERSION); // ใช้ตรวจว่า Production deploy เวอร์ชันล่าสุดแล้ว

  /* ═══════════ Toast แจ้งเตือนสั้นๆ ═══════════ */
  function toast(html, kind) {
    if (window.cqToastFilter && !window.cqToastFilter(html)) return;   // ผู้ใช้ปิดการแจ้งเตือนหมวดนี้ในหน้าตั้งค่า
    const el = document.createElement("div");
    el.className = "toast " + (kind || "");
    el.innerHTML = html;
    $("toasts").appendChild(el);
    setTimeout(() => el.classList.add("out"), 3200);
    setTimeout(() => el.remove(), 3800);
  }
  window.QUEST.toast = toast;
  setTimeout(() => { if (typeof stats === "function") window.QUEST.stats = stats; });   // ให้ชุดทดสอบตรวจสถิติของเหรียญได้

  /* ═══════════ CodeBot แทนหุ่นยนต์เดิม: อารมณ์เปลี่ยนตามผลลัพธ์ ═══════════ */
  const robot = $("robot");
  const paintBot = mood => { if (robot) robot.innerHTML = ART.codebot(mood); };
  paintBot("idle");
  const origSay = say;
  say = function (msg, mood) {
    origSay(msg, mood);
    paintBot(mood === "ok" ? "happy" : mood === "bad" ? "oops" : "idle");
    if (mood === "ok") SFX.pass(); else if (mood === "bad") SFX.fail();
  };

  /* ═══════════ ความคืบหน้า ═══════════ */
  function langProgress(lang) {
    let done = 0, total = 0;
    COURSES[lang].topics.forEach(t => t.stages.forEach((_, i) => { total++; if (state.done.has(doneKey(lang, t.id, i))) done++; }));
    return { done, total };
  }
  /* ด่าน bonus (ต่อท้ายบทที่ deploy แล้ว) ได้ XP ตามปกติ แต่ไม่ใช่เงื่อนไขว่าบทผ่านครบ
   * — ผู้เรียนที่เคยผ่านบทครบจึงไม่ถูกล็อกบทถัดไปเมื่อมีด่านเสริมเพิ่มภายหลัง */
  function topicProgress(lang, t) {
    const isDone = i => state.done.has(doneKey(lang, t.id, i));
    const done = t.stages.filter((_, i) => isDone(i)).length;
    const required = t.stages.map((s, i) => [s, i]).filter(([s]) => !s.bonus);
    return { done, total: t.stages.length, complete: required.length > 0 && required.every(([, i]) => isDone(i)) };
  }
  /**
   * หน่วยที่ i เปิดเมื่อ: เป็นหน่วยแรก · หรือหน่วยก่อนหน้าผ่านครบ · หรือหน่วยนี้มีความคืบหน้าอยู่แล้ว
   * (ข้อสุดท้ายเพื่อไม่ให้ผู้เล่นเดิมที่ทำข้ามลำดับไว้ถูกล็อกออกจากงานของตัวเอง) · โหมดห้องแข่งไม่ล็อก
   * หน่วยที่เป็นบทเรียนล้วน (ไม่มีด่าน) นับว่าผ่านเมื่ออ่านบทเรียนแล้ว
   */
  function topicUnlocked(lang, t) {
    if (typeof room !== "undefined" && room.active) return true;
    const c = COURSES[lang], ts = c.topics, i = ts.indexOf(t);
    if (i <= 0) return true;
    if (t.stages.length && topicProgress(lang, t).done > 0) return true;
    const doneTopic = x => x && (x.stages.length ? topicProgress(lang, x).complete : lessonRead(x.id));
    // carry-over: บทเดิมที่ยังแสดงอยู่ เปิดได้ถ้าเคยเปิดได้ตามลำดับเดิม (บทแทนที่แทรกเข้ามาไม่ทำให้สิทธิ์ที่ได้แล้วหายไป)
    if (c.legacyOrder && (c.legacyTopics || []).includes(t)) {
      const j = c.legacyOrder.indexOf(t.id);
      if (j <= 0 || doneTopic(c.legacyTopics.find(x => x.id === c.legacyOrder[j - 1]))) return true;
    }
    // skip-ahead: บท v2 เปิดได้ถ้าเคยผ่านบทเดิมที่เทียบเท่าครบ (ปลดล็อกอย่างเดียว ไม่นับว่าผ่าน ไม่ได้ XP)
    if (Array.isArray(t.legacyEquivalent) && t.legacyEquivalent.length && c.legacyTopics &&
        t.legacyEquivalent.every(id => doneTopic(c.legacyTopics.find(x => x.id === id)))) return true;
    // requires: หน่วยที่ระบุบทที่ต้องผ่านเอง (เช่น Career Track ที่เปิดเมื่อผ่านบทที่ 27) ใช้แทน "หน่วยก่อนหน้า"
    if (t.requires) return !!doneTopic(ts.find(x => x.id === t.requires));
    const prev = ts[i - 1];
    return prev.stages.length ? topicProgress(lang, prev).complete : lessonRead(prev.id);
  }
  window.topicUnlocked = (lang, idOrTopic) => {
    const t = typeof idOrTopic === "string" ? COURSES[lang].topics.find(x => x.id === idOrTopic) : idOrTopic;
    return !t || topicUnlocked(lang, t);
  };
  const lockedToast = (lang, t) => {
    const ts = COURSES[lang].topics, i = ts.indexOf(t);
    toast('<span class="t-ico">' + UIKit.AppIcon("lock", { size: 22 }) + "</span><div><b>หน่วยนี้ยังไม่ปลดล็อก</b><br>ผ่าน “" + esc(shortTitle(ts[i - 1].title)) + "” ให้ครบก่อนนะ</div>");
  };
  window.cqLockedToast = (lang, id) => { const t = COURSES[lang].topics.find(x => x.id === id); if (t) lockedToast(lang, t); };

  function currentTopicOf(lang) {
    const ts = COURSES[lang].topics;
    const saved = store.get("cq_topic_" + lang, null) || (() => { try { return localStorage.getItem("cq_topic_" + lang); } catch { return null; } })();
    const s = ts.find(t => t.id === saved && t.stages.length && !topicProgress(lang, t).complete && topicUnlocked(lang, t));
    return s || ts.find(t => t.stages.length && !topicProgress(lang, t).complete && topicUnlocked(lang, t)) || ts.find(t => t.stages.length);
  }

  /* ═══════════ หน้าแรก (Landing) ═══════════ */
  window.showLanding = function () {
    if (!state.user) { try { localStorage.removeItem("cq_had_session"); } catch {} }
    showScreen("landing");
    window.scrollTo(0, 0);
  };
  /* ป้าย "โหมดทดลองเล่น" + เลิกซ่อนหน้าระหว่างรอตรวจ session */
  const origShow = showScreen;
  showScreen = function (name) {
    origShow(name);
    document.body.classList.remove("booting");
    const gb = $("guestBanner");
    if (gb) gb.classList.toggle("hide", !!state.user || name === "landing");
  };
  $("guestSignup").onclick = () => { setAuthMode("register"); $("authOverlay").classList.add("show"); };
  $("ctaStart").onclick = () => { setAuthMode("register"); $("authOverlay").classList.add("show"); };
  $("ctaLogin").onclick = () => { setAuthMode("login"); $("authOverlay").classList.add("show"); };
  $("ctaGuest").onclick = () => {
    if (window.cqCoursesLoaded || !window.cqCoursesReady) return goHome();
    // กดก่อนข้อมูลหลักสูตรโหลดเสร็จ (มือถือเน็ตช้า) → บอกสถานะแล้วไปต่อเองเมื่อพร้อม
    const b = $("ctaGuest"), html = b.innerHTML;
    b.disabled = true; b.setAttribute("aria-busy", "true");
    b.innerHTML = UIKit.AppIcon("spinner", { size: 18 }) + "<span>กำลังเตรียมบทเรียน…</span>";
    const done = () => { b.disabled = false; b.removeAttribute("aria-busy"); b.innerHTML = html; goHome(); };
    window.cqCoursesReady.then(done, done);
  };
  $("ctaStart2").onclick = () => $("ctaStart").onclick();

  /* ═══════════ ดาวเคราะห์ (เลือกภาษา) ═══════════ */
  /** ประวัติหลักสูตรรุ่นก่อน (ถ้าเคยเรียน) — แสดงบนการ์ดโลกเพื่อให้รู้ว่าความคืบหน้าเดิมไม่ได้หาย */
  function legacyNote(lang) {
    const lt = COURSES[lang].legacyTopics || [];
    if (!lt.length) return "";
    let done = 0, total = 0;
    lt.forEach(t => t.stages.forEach((_, i) => { total++; if (state.done.has(doneKey(lang, t.id, i))) done++; }));
    return done ? '<div class="wc-legacy">' + UIKit.AppIcon("award", { size: 14 }) + "หลักสูตรรุ่นแรก: ผ่าน " + done + " / " + total + " ด่าน (เก็บไว้เป็นประวัติ)</div>" : "";
  }
  function worldCard(id) {
    const w = WORLDS[id], c = COURSES[id], p = langProgress(id);
    const el = document.createElement("button");
    const selected = state.lang === id;
    el.className = "world-card" + (selected ? " selected" : "");
    if (selected) el.setAttribute("aria-current", "true");
    el.innerHTML =
      '<div class="wc-top">' + UIKit.LanguageIcon(id, { box: 72, logo: 42, title: false }) +
        '<span class="status-pill ok">' + UIKit.AppIcon("check-circle", { size: 14 }) + "พร้อมเล่น</span></div>" +
      "<h3>" + esc(c.name) + "</h3>" +
      '<div class="wc-world">' + esc(w.name) + (w.rec && !p.done ? ' · <b class="wc-rec-inline">แนะนำสำหรับมือใหม่</b>' : "") + "</div>" +
      "<p>" + esc(w.sub) + "</p>" + legacyNote(id) +
      '<div class="wc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + p.total + '" aria-valuenow="' + p.done + '" aria-label="ความคืบหน้า"><i style="width:' + (p.total ? (p.done / p.total * 100) : 0) + '%"></i></div>' +
      '<div class="wc-meta"><span>' + p.done + " / " + p.total + " ภารกิจ</span><b>" + (p.done ? "เล่นต่อ" : "เริ่มเลย") + UIKit.AppIcon("chevron-right", { size: 16 }) + "</b></div>";
    el.setAttribute("aria-label", c.name + " — " + w.name + " ผ่านแล้ว " + p.done + " จาก " + p.total + " ภารกิจ" + (selected ? " (กำลังเรียน)" : ""));
    WorldThemes.decorateAccentCard(el, id); // หลังเขียนเนื้อหาการ์ด เพื่อไม่ให้ตราโลกถูกเขียนทับ
    el.onclick = () => {
      state.lang = id; state.topic = null;
      try { localStorage.setItem("cq_lang", id); } catch {}
      renderTopics(); showScreen("topic");
    };
    return el;
  }
  function lockedWorld() {
    const el = document.createElement("div");
    el.className = "world-card locked";
    el.setAttribute("aria-disabled", "true");
    el.innerHTML = '<div class="wc-top"><span class="lang-icon placeholder" style="--box:72px">' + UIKit.AppIcon("lock", { size: 30 }) + '</span><span class="status-pill muted">' + UIKit.AppIcon("lock", { size: 14 }) + 'เร็วๆ นี้</span></div><h3>ภาษาใหม่</h3><div class="wc-world">Coming Soon</div><p>ภาษาถัดไปกำลังเตรียมภารกิจอยู่</p>';
    return el;
  }
  renderLangs = function () {
    for (const gid of ["langGrid", "homeWorlds"]) {
      const g = $(gid);
      if (!g) continue;
      g.textContent = "";
      langOrder().forEach(id => g.appendChild(worldCard(id)));
      if (gid === "langGrid") g.appendChild(lockedWorld());
    }
  };

  /* ═══════════ แผนที่ภารกิจ: เส้นทางแนวตั้ง (timeline) ═══════════
   * แต่ละหัวข้อ = 1 แถว: โหนดบนเส้นทาง + การ์ดข้างเส้น (เดสก์ท็อปสลับซ้าย/ขวา · มือถือคอลัมน์เดียว)
   * ข้อมูลทั้งหมดมาจากระบบเดิม: COURSES, state.done, topicProgress(), currentTopicOf(), lessonRead()
   * สถานะ: done (ผ่านแล้ว) · current (กำลังเรียน) · started (ทำไปบางส่วน) · available (ยังไม่เริ่ม)
   *        theory (บทเรียนล้วน) · locked (รองรับไว้ ระบบยังไม่มีการล็อก) · และธง boss (หัวข้อสุดท้าย)
   */
  /** @typedef {"done"|"current"|"started"|"available"|"theory"|"locked"} QuestStatus */

  /** @returns {QuestStatus} */
  function questStatus(lang, t, cur) {
    if (!topicUnlocked(lang, t)) return "locked";
    if (!t.stages.length) return "theory";
    const p = topicProgress(lang, t);
    if (p.complete) return "done";
    if (cur && cur.id === t.id) return "current";
    return p.done > 0 ? "started" : "available";
  }
  const STATUS_PILL = {
    done: ["ok", "check-circle", "ผ่านแล้ว"], current: ["run", "play", "กำลังเรียน"], started: ["muted", "timer", "ทำไปบางส่วน"],
    available: ["muted", "circle-dot", "ยังไม่เริ่ม"], theory: ["muted", "book", "บทเรียน"], locked: ["muted", "lock", "ยังไม่ปลดล็อก"],
  };
  /** การกระทำหลักของหัวข้อ (logic เดิมของปุ่มในแผงรายละเอียด) */
  function goTopic(t) {
    if (!topicUnlocked(state.lang, t)) return lockedToast(state.lang, t);
    state.topic = t.id;
    try { localStorage.setItem("cq_topic_" + state.lang, t.id); } catch {}
    if (!t.stages.length || !lessonRead(t.id)) openLesson(t); else goLearn();
  }

  /** <QuestNode /> — วงกลมบนเส้นทาง: ไอคอนหัวข้อ + ป้ายสถานะเล็ก */
  function questNode(t, st, isBoss) {
    const badge = st === "done" ? "check" : st === "locked" ? "lock" : st === "theory" ? "book" : isBoss ? "crown" : "";
    return '<div class="qp-node" aria-hidden="true">' + StageIcons.renderStageIcon(t, { size: isBoss ? 28 : 24 }) +
      (badge ? '<span class="qp-node-badge">' + UIKit.AppIcon(badge, { size: 12, stroke: 3 }) + "</span>" : "") + "</div>";
  }

  /** <QuestCard /> — ข้อมูลหัวข้อข้างโหนด: ลำดับ ชื่อ คำอธิบาย ความคืบหน้า ความยาก EXP และปุ่ม */
  function questCard(lang, t, i, st, isBoss) {
    const p = topicProgress(lang, t), xps = t.stages.map(x => x.xp);
    const dmin = xps.length ? diffOf(Math.min(...xps)) : 0, dmax = xps.length ? diffOf(Math.max(...xps)) : 0;
    const [pc, pi, pt] = STATUS_PILL[st];
    const primary = st === "current";
    const act = st === "done" ? ["repeat", "ทบทวน"] : st === "theory" ? ["book", "อ่านบทเรียน"] : st === "locked" ? ["lock", "ล็อกอยู่"]
      : ["play", p.done ? "เล่นต่อ" : "เริ่มภารกิจ"];
    return '<article class="qp-card">' +
      '<div class="qp-card-head"><span class="qp-num">หน่วยที่ ' + (i + 1) + "</span>" +
        '<span class="status-pill ' + pc + ' sm">' + UIKit.AppIcon(pi, { size: 12 }) + pt + "</span>" +
        (isBoss ? '<span class="status-pill boss sm">' + UIKit.AppIcon("crown", { size: 12 }) + "ภารกิจบอส</span>" : "") + "</div>" +
      '<h3 class="qp-title" id="qpt-' + t.id + '">' + esc(shortTitle(t.title)) + "</h3>" +
      (t.blurb ? '<p class="qp-desc">' + esc(t.blurb) + "</p>" : "") +
      (t.stages.length ? '<div class="qp-progress"><div class="qp-bar" role="progressbar" aria-labelledby="qpt-' + t.id + '" aria-valuemin="0" aria-valuemax="' + p.total + '" aria-valuenow="' + p.done + '"><i style="width:' + (p.total ? p.done / p.total * 100 : 0) + '%"></i></div>' +
        '<span class="qp-count">' + p.done + "/" + p.total + "</span></div>" +
        '<div class="qp-meta"><span>' + UIKit.AppIcon("target", { size: 13 }) + " ความยาก " + STAR_LABEL[dmin] + (dmax !== dmin ? "–" + STAR_LABEL[dmax] : "") + "</span>" +
        "<span>" + UIKit.AppIcon("star", { size: 13 }) + " " + xps.reduce((a, b) => a + b, 0) + " EXP</span></div>" : "") +
      '<div class="qp-actions">' +
        '<button type="button" class="' + (primary ? "btn-hero qp-go" : "qp-btn qp-go") + '"' + (st === "locked" ? ' aria-disabled="true"' : "") + ' aria-describedby="qpt-' + t.id + (st === "locked" ? " qpl-" + t.id : "") + '">' +
          UIKit.AppIcon(act[0], { size: 16 }) + "<span>" + act[1] + "</span></button>" +
        (t.stages.length && st !== "locked" ? '<button type="button" class="qp-btn ghost qp-lesson" aria-describedby="qpt-' + t.id + '">' + UIKit.AppIcon("book", { size: 16 }) + "<span>บทเรียน</span></button>" : "") +
      "</div>" +
      (st === "locked" ? '<div class="qp-lock-note" id="qpl-' + t.id + '">' + UIKit.AppIcon("lock", { size: 13 }) + "ผ่านหน่วยที่ " + i + " ให้ครบเพื่อปลดล็อก</div>" : "") +
      "</article>";
  }

  /** สรุปความคืบหน้าของโลกด้านบนแผนที่ + ทางลัดไปภารกิจปัจจุบัน */
  function questSummary(lang, ts, cur) {
    const lp = langProgress(lang), doneTopics = ts.filter(t => topicProgress(lang, t).complete).length;
    let earned = 0;
    ts.forEach(t => t.stages.forEach((x, i) => { if (state.done.has(doneKey(lang, t.id, i))) earned += x.xp; }));
    const pct = lp.total ? Math.round(lp.done / lp.total * 100) : 0;
    return '<div class="qps-main">' + UIKit.LanguageIcon(lang, { box: 48, logo: 28, title: false }) +
      '<div class="qps-text"><div class="qps-label">ความคืบหน้าใน ' + esc(WORLDS[lang].name) + '</div>' +
        '<div class="qps-bar" role="progressbar" aria-label="ความคืบหน้าทั้งโลก" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>' +
        '<div class="qps-stats"><span><b>' + pct + "%</b></span><span>" + UIKit.AppIcon("check-circle", { size: 14 }) + " หัวข้อ <b>" + doneTopics + "/" + ts.length + "</b></span>" +
        "<span>" + UIKit.AppIcon("target", { size: 14 }) + " ภารกิจ <b>" + lp.done + "/" + lp.total + "</b></span>" +
        "<span>" + UIKit.AppIcon("star", { size: 14 }) + " <b>" + fmt(earned) + "</b> EXP</span></div></div></div>" +
      (cur ? '<button type="button" class="btn-hero qps-jump" id="qpJump">' + UIKit.AppIcon("map", { size: 18 }) + "<span>ไปที่ภารกิจปัจจุบัน</span></button>" : "");
  }

  /* อุ่นเครื่อง Python v2 เบื้องหลังเมื่อผู้เรียนเปิดแผนที่ Python (ไฟล์ ~5MB หลังบีบอัด · มือถือเน็ตช้าใช้หลายสิบวินาที)
   * ระหว่างเลือกบทและอ่านบทเรียน — ไม่ทำเมื่อเปิดโหมดประหยัดข้อมูล และรอให้หน้าจอว่างก่อนจะได้ไม่ถ่วงแผนที่ */
  function warmPythonSoon() {
    if (!window.PY || !PY.warm || PY.state === "ready" || PY.state === "loading") return;
    const conn = navigator.connection;
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;
    const go = () => { try { PY.warm(); } catch (e) { /* ล้มเหลวได้ — ด่านจะโหลดใหม่เมื่อเปิดใช้จริง */ } };
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 3000 }); else setTimeout(go, 1500);
  }

  renderTopics = function () {
    const lang = state.lang || "python", c = COURSES[lang], w = WORLDS[lang];
    if (lang === "python") warmPythonSoon();
    $("topicEyebrow").textContent = w.name.toUpperCase();
    $("topicTitle").innerHTML = UIKit.LanguageIcon(lang, { box: 44, title: false }) + " แผนที่ภารกิจ " + esc(c.name);
    WorldThemes.applyWorldTheme($("topicScreen"), lang);
    const ts = c.topics, cur = currentTopicOf(lang);
    const bossIdx = (() => { for (let i = ts.length - 1; i >= 0; i--) if (ts[i].stages.length) return i; return -1; })();

    let sum = $("qpSummary");
    if (!sum) { sum = document.createElement("div"); sum.id = "qpSummary"; sum.className = "qp-summary"; $("questMap").before(sum); }
    sum.innerHTML = questSummary(lang, ts, cur);

    const map = $("questMap");
    map.className = "quest-path";
    map.removeAttribute("style");
    if (Array.isArray(c.worlds) && c.worlds.length) return renderWorldMap(lang, c, ts, cur, bossIdx, map);
    const list = document.createElement("ol");
    list.className = "qp-list";
    list.setAttribute("aria-label", "เส้นทางภารกิจ " + c.name + " " + ts.length + " หัวข้อ");
    ts.forEach((t, i) => {
      const st = questStatus(lang, t, cur), isBoss = i === bossIdx;
      const li = document.createElement("li");
      li.className = "qp-row is-" + st + (isBoss ? " is-boss" : "") + (i % 2 ? " side-left" : " side-right");
      li.dataset.topic = t.id;
      if (st === "current") li.setAttribute("aria-current", "step");
      li.innerHTML = questNode(t, st, isBoss) + questCard(lang, t, i, st, isBoss);
      li.querySelector(".qp-go").onclick = () => goTopic(t);
      const les = li.querySelector(".qp-lesson");
      if (les) les.onclick = () => { state.topic = t.id; openLesson(t); };
      list.appendChild(li);
    });
    map.replaceChildren(list);
    // เส้นความคืบหน้า: เติมจากโหนดแรกถึงโหนดปัจจุบัน (คำนวณจากตำแหน่งจริง รองรับทุกขนาดจอ)
    const fill = document.createElement("div");
    fill.className = "qp-fill"; fill.setAttribute("aria-hidden", "true");
    list.prepend(fill);
    const layoutFill = () => {
      const nodes = list.querySelectorAll(".qp-node");
      if (!nodes.length) return;
      const top = list.getBoundingClientRect().top;
      const first = nodes[0].getBoundingClientRect(), last = nodes[nodes.length - 1].getBoundingClientRect();
      const target = list.querySelector(".qp-row.is-current .qp-node") || [...list.querySelectorAll(".qp-row.is-done .qp-node")].pop();
      const y0 = first.top + first.height / 2 - top;
      list.style.setProperty("--qp-line-top", y0 + "px");
      list.style.setProperty("--qp-line-h", (last.top + last.height / 2 - top - y0) + "px");
      fill.style.top = y0 + "px";
      fill.style.height = target ? (target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2 - top - y0) + "px" : "0px";
    };
    requestAnimationFrame(layoutFill);
    if (window.ResizeObserver) { if (map._ro) map._ro.disconnect(); map._ro = new ResizeObserver(layoutFill); map._ro.observe(list); }

    const jump = $("qpJump");
    if (jump) jump.onclick = () => {
      const row = list.querySelector(".qp-row.is-current");
      if (!row) return;
      row.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "center" });
      setTimeout(() => row.querySelector(".qp-go").focus({ preventScroll: true }), reduceMotion() ? 0 : 450);
    };
  };

  /* ═══════════ แผนที่แบบ World (Chapter → Stage) ═══════════
   * ใช้เมื่อคอร์สมี c.worlds: แต่ละ World เป็นกลุ่มพับได้ หัวกลุ่มคือปุ่มจริง (aria-expanded) · เปิดเฉพาะ World ที่มีหน่วยปัจจุบัน
   * แถวของหน่วยใช้ markup เดิมทั้งหมด (questNode/questCard · คลาสสถานะ · ตัวจัดการคลิก) จึงพฤติกรรมเหมือนแผนที่ปกติ */
  const worldOpen = {};   // สถานะเปิด/ปิดที่ผู้เรียนเลือกเองในรอบนี้ ต่อภาษา
  function attachFill(list) {
    const fill = document.createElement("div");
    fill.className = "qp-fill"; fill.setAttribute("aria-hidden", "true");
    list.prepend(fill);
    const layout = () => {
      const nodes = list.querySelectorAll(".qp-node");
      if (!nodes.length || !list.offsetParent) return;
      const top = list.getBoundingClientRect().top;
      const first = nodes[0].getBoundingClientRect(), last = nodes[nodes.length - 1].getBoundingClientRect();
      const target = list.querySelector(".qp-row.is-current .qp-node") || [...list.querySelectorAll(".qp-row.is-done .qp-node")].pop();
      const y0 = first.top + first.height / 2 - top;
      list.style.setProperty("--qp-line-top", y0 + "px");
      list.style.setProperty("--qp-line-h", (last.top + last.height / 2 - top - y0) + "px");
      fill.style.top = y0 + "px";
      fill.style.height = target ? (target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2 - top - y0) + "px" : "0px";
    };
    requestAnimationFrame(layout);
    if (window.ResizeObserver) { const ro = new ResizeObserver(layout); ro.observe(list); list._ro = ro; }
    return layout;
  }
  function renderWorldMap(lang, c, ts, cur, bossIdx, map) {
    const groups = [];
    ts.forEach((t, i) => {
      const w = c.worlds.find(x => x.id === t.world) || { id: "other", name: "Other", th: "อื่นๆ" };
      let g = groups[groups.length - 1];
      if (!g || g.world.id !== w.id) { g = { world: w, items: [] }; groups.push(g); }
      g.items.push({ t, i });
    });
    const open = worldOpen[lang] || (worldOpen[lang] = {});
    const wrap = document.createElement("div");
    wrap.className = "qp-worlds";
    wrap.setAttribute("aria-label", "แผนที่ภารกิจ " + c.name + " · " + groups.length + " โลก · " + ts.length + " หน่วย");
    const layouts = [];
    groups.forEach((g, gi) => {
      const stats = g.items.map(({ t }) => questStatus(lang, t, cur));
      const doneUnits = g.items.filter(({ t }) => t.stages.length && topicProgress(lang, t).complete).length;
      const hasCurrent = stats.includes("current");
      const status = doneUnits === g.items.length ? "done" : hasCurrent ? "current" : stats[0] === "locked" ? "locked" : "available";
      const isOpen = open[g.world.id] !== undefined ? open[g.world.id] : hasCurrent || (!cur && gi === 0);
      const sec = document.createElement("section");
      sec.className = "qp-world is-" + status + (isOpen ? " is-open" : "");
      sec.dataset.world = g.world.id;
      const bodyId = "qpWorld-" + lang + "-" + g.world.id;
      const icon = status === "done" ? "check-circle" : status === "locked" ? "lock" : status === "current" ? "map" : "circle-dot";
      const label = { done: "ผ่านครบแล้ว", current: "กำลังเรียน", locked: "ยังไม่ปลดล็อก", available: "ยังไม่เริ่ม" }[status];
      sec.innerHTML = '<button type="button" class="qp-world-head" aria-expanded="' + isOpen + '" aria-controls="' + bodyId + '">' +
        '<span class="qpw-ico">' + UIKit.AppIcon(icon, { size: 20 }) + "</span>" +
        '<span class="qpw-text"><span class="qpw-eyebrow">โลกที่ ' + (gi + 1) + " · " + esc(g.world.name) + '</span><span class="qpw-title">' + esc(g.world.th) + "</span></span>" +
        '<span class="qpw-meta"><span class="qpw-count">' + doneUnits + "/" + g.items.length + ' หน่วย</span><span class="qpw-status">' + label + "</span></span>" +
        '<span class="qpw-chev" aria-hidden="true">' + UIKit.AppIcon("chevron-right", { size: 18 }) + "</span></button>";
      const body = document.createElement("div");
      body.className = "qp-world-body"; body.id = bodyId;
      if (!isOpen) body.hidden = true;
      const list = document.createElement("ol");
      list.className = "qp-list";
      list.setAttribute("aria-label", g.world.th + " " + g.items.length + " หน่วย");
      g.items.forEach(({ t, i }, k) => {
        const st = stats[k], isBoss = i === bossIdx;
        const li = document.createElement("li");
        li.className = "qp-row is-" + st + (isBoss ? " is-boss" : "") + (k % 2 ? " side-left" : " side-right");
        li.dataset.topic = t.id;
        if (st === "current") li.setAttribute("aria-current", "step");
        li.innerHTML = questNode(t, st, isBoss) + questCard(lang, t, i, st, isBoss);
        li.querySelector(".qp-go").onclick = () => goTopic(t);
        const les = li.querySelector(".qp-lesson");
        if (les) les.onclick = () => { state.topic = t.id; openLesson(t); };
        list.appendChild(li);
      });
      body.appendChild(list);
      sec.appendChild(body);
      const layout = attachFill(list);
      layouts.push(layout);
      sec.querySelector(".qp-world-head").onclick = () => {
        const now = body.hidden;
        body.hidden = !now;
        open[g.world.id] = now;
        sec.classList.toggle("is-open", now);
        sec.querySelector(".qp-world-head").setAttribute("aria-expanded", String(now));
        if (now) requestAnimationFrame(layout);
      };
      wrap.appendChild(sec);
    });
    map.replaceChildren(wrap);
    const jump = $("qpJump");
    if (jump) jump.onclick = () => {
      const row = wrap.querySelector(".qp-row.is-current");
      if (!row) return;
      const sec = row.closest(".qp-world"), body = sec.querySelector(".qp-world-body");
      if (body.hidden) sec.querySelector(".qp-world-head").click();
      row.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "center" });
      setTimeout(() => row.querySelector(".qp-go").focus({ preventScroll: true }), reduceMotion() ? 0 : 450);
    };
  }

  /* ═══════════ แดชบอร์ด: ผจญภัยต่อ + ภารกิจประจำวัน + เหรียญ ═══════════ */
  function lastLang() {
    let l = null;
    try { l = localStorage.getItem("cq_lang"); } catch {}
    if (l && COURSES[l]) return l;
    const played = Object.keys(COURSES).find(k => langProgress(k).done);
    return played || "python";
  }
  window.goHome = function () {
    if (state.user) { try { localStorage.setItem("cq_had_session", "1"); } catch {} }
    const lang = lastLang(), t = currentTopicOf(lang), w = WORLDS[lang];
    const lp = langProgress(lang), tp = topicProgress(lang, t);
    const next = t.stages.findIndex((_, i) => !state.done.has(doneKey(lang, t.id, i)));
    const fresh = !Object.keys(COURSES).some(k => langProgress(k).done);
    const who = state.user ? esc(state.user.name) : "นักสำรวจ";
    WorldThemes.applyWorldTheme($("continueCard"), lang);
    $("continueCard").innerHTML =
      '<div class="cc-art">' + UIKit.LanguageIcon(lang, { box: 96, logo: 56, title: false }) + "</div>" +
      '<div class="cc-body">' +
        (fresh
          ? '<div class="cc-eyebrow">ยินดีต้อนรับ ' + who + "</div><h2>เริ่มภารกิจแรกของคุณ</h2><p>แนะนำให้เริ่มที่ <b>Python</b> — ภารกิจแรกใช้เวลาแค่ 1 นาที อ่านบทเรียนสั้นๆ แล้วลองเขียนโค้ดบรรทัดแรกได้เลย</p>"
          : '<div class="cc-eyebrow">ผจญภัยต่อ · ' + esc(w.name) + "</div><h2>" + esc(t.title) + "</h2>" +
            "<p>ภารกิจถัดไป: <b>" + esc(next >= 0 ? t.stages[next].title : "ทบทวนหัวข้อนี้") + "</b></p>" +
            '<div class="wc-bar"><i style="width:' + (tp.total ? tp.done / tp.total * 100 : 0) + '%"></i></div>' +
            '<div class="cc-meta">หัวข้อนี้ ' + tp.done + "/" + tp.total + " · ทั้งดาว " + lp.done + "/" + lp.total + " ภารกิจ</div>") +
        '<div class="cc-actions"><button class="btn-hero" id="ccGo">' + UIKit.AppIcon(fresh ? "rocket" : "play") + "<span>" + (fresh ? "เริ่มภารกิจแรก" : "เล่นต่อ") + '</span></button>' +
        '<button class="btn-ghost" id="ccMap">' + UIKit.AppIcon("map") + '<span>ดูแผนที่ภารกิจ</span></button></div>' +
      "</div>";
    $("ccGo").onclick = () => {
      state.lang = lang; state.topic = t.id;
      try { localStorage.setItem("cq_lang", lang); localStorage.setItem("cq_topic_" + lang, t.id); } catch {}
      if (!lessonRead(t.id)) { openLesson(t); return; }
      state.stage = Math.max(0, next); renderStage(); showScreen("game");
    };
    $("ccMap").onclick = () => { state.lang = lang; renderTopics(); showScreen("topic"); };
    renderDaily(); renderBadges(); renderLangs();
    showScreen("home");
  };
  $("tabLearn").onclick = () => goHome();
  $("pathCard").onclick = () => { renderTopics(); showScreen("topic"); };

  /* ภารกิจประจำวัน — ไม่ลงโทษถ้าวันไหนไม่ได้เล่น */
  const today = () => new Date().toISOString().slice(0, 10);
  const DAILY_GOAL = 3;
  function daily() {
    const d = store.get("cq_daily", { date: "", count: 0, streak: 0, last: "" });
    if (d.date !== today()) { d.date = today(); d.count = 0; }
    return d;
  }
  function renderDaily() {
    const d = daily(), done = d.count >= DAILY_GOAL;
    $("dailyCard").innerHTML =
      '<div class="dc-art' + (done ? " open" : "") + '">' + UIKit.AppIcon(done ? "gift" : "target", { size: 34 }) + "</div>" +
      '<div class="dc-body"><div class="cc-eyebrow">ภารกิจประจำวัน</div><h3>ผ่าน ' + DAILY_GOAL + " ภารกิจวันนี้</h3>" +
      '<div class="dc-dots">' + Array.from({ length: DAILY_GOAL }, (_, i) => '<i class="' + (i < d.count ? "on" : "") + '"></i>').join("") + "</div>" +
      "<p>" + (done ? "สำเร็จแล้ว! กลับมาใหม่พรุ่งนี้นะ" : "อีก " + (DAILY_GOAL - d.count) + " ภารกิจ") +
      (d.streak > 1 ? ' · เล่นต่อเนื่อง ' + d.streak + " วัน" : "") + "</p></div>";
  }
  function bumpDaily() {
    const d = daily(), before = d.count;
    d.count++;
    if (d.last !== today()) {
      const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      d.streak = d.last === y ? (d.streak || 0) + 1 : 1;
      d.last = today();
    }
    store.set("cq_daily", d);
    if (before < DAILY_GOAL && d.count >= DAILY_GOAL) toast('<span class="t-ico">' + UIKit.AppIcon("gift", { size: 26 }) + "</span><div><b>ภารกิจประจำวันสำเร็จ!</b> เก่งมาก</div>", "gold");
  }

  /* ═══════════ เหรียญรางวัล (Achievements) ═══════════ */
  function stats() {
    const byLang = {}, legacy = {}; let quiz = 0, boss = 0, total = 0; const complete = new Set();
    for (const lang of Object.keys(COURSES)) {
      byLang[lang] = 0;
      legacy[lang] = (COURSES[lang].legacyTopics || []).reduce((n, t) => n + t.stages.filter((_, i) => state.done.has(doneKey(lang, t.id, i))).length, 0);
      [...COURSES[lang].topics, ...(COURSES[lang].legacyTopics || [])].forEach(t => {
        let all = t.stages.some(s => !s.bonus);
        t.stages.forEach((s, i) => {
          if (state.done.has(doneKey(lang, t.id, i))) {
            byLang[lang]++; total++;
            if (s.quiz) quiz++;
            if (i === bossIndex(t)) boss++;
          } else if (!s.bonus) all = false;
        });
        if (all) complete.add(lang + ":" + t.id);
      });
    }
    const c = store.get("cq_counters", { noHint: 0, firstTry: 0, racer: 0 });
    return { byLang, legacy, quiz, boss, total, complete, level: state.level, ...c };
  }
  const BADGES = [
    { id: "first", icon: "hand", name: "Hello World", desc: "ผ่านภารกิจแรก", test: s => s.total >= 1 },
    // Course versioning (Option C): ผู้ที่เคยเรียนหลักสูตร C รุ่นแรก ได้เหรียญเป็นประวัติ — ความคืบหน้าและ XP เดิมไม่หาย
    { id: "c-pioneer", icon: "award", name: "ผู้บุกเบิกภาษา C", desc: "ผ่านด่านในหลักสูตร C รุ่นแรก (ก่อน C v2)", test: s => (s.legacy && s.legacy.c) > 0 },
    { id: "py10", icon: "code", name: "Python Explorer", desc: "ผ่าน Python 10 ภารกิจ", test: s => s.byLang.python >= 10 },
    { id: "c10", icon: "cog", name: "C Mechanic", desc: "ผ่านภาษา C 10 ภารกิจ", test: s => s.byLang.c >= 10 },
    { id: "web10", icon: "blocks", name: "Web Builder", desc: "ผ่าน HTML/CSS/JS รวม 10 ภารกิจ", test: s => s.byLang.html + s.byLang.css + s.byLang.js >= 10 },
    { id: "loop", icon: "repeat", name: "Loop Master", desc: "ผ่านทุกภารกิจในหัวข้อลูปของ Python", test: s => s.complete.has("python:loop") },
    { id: "quiz5", icon: "quiz", name: "Theory Scholar", desc: "ผ่านแบบทดสอบทฤษฎี 5 ชุด", test: s => s.quiz >= 5 },
    { id: "nohint", icon: "bug", name: "No Hint Hero", desc: "ผ่าน 5 ภารกิจโดยไม่เปิดคำใบ้", test: s => s.noHint >= 5 },
    { id: "perfect", icon: "target", name: "Perfect Run", desc: "ผ่านภารกิจในการรันครั้งแรก 5 ครั้ง", test: s => s.firstTry >= 5 },
    { id: "boss", icon: "shield", name: "Boss Slayer", desc: "ชนะภารกิจบอสท้ายหัวข้อ 3 ภารกิจ", test: s => s.boss >= 3 },
    { id: "galaxy", icon: "globe", name: "Galaxy Traveler", desc: "ผ่านอย่างน้อย 1 ภารกิจครบทุกดาว (" + Object.keys(COURSES).length + " ดาว)", test: s => Object.values(s.byLang).every(n => n > 0) },
    { id: "racer", icon: "flag", name: "Speed Racer", desc: "ทำโจทย์ครบทุกข้อในห้องแข่ง", test: s => s.racer >= 1 },
    { id: "lv5", icon: "star", name: "Rising Star", desc: "ถึงเลเวล 5", test: s => s.level >= 5 },
    { id: "lv10", icon: "crown", name: "Code Hero", desc: "ถึงเลเวล 10", test: s => s.level >= 10 },
  ];
  window.QUEST.BADGES = BADGES;
  function renderBadges() {
    const s = stats(), row = $("badgeRow");
    // ครั้งแรกที่เปิดระบบเหรียญ: บันทึกเหรียญที่มีอยู่แล้วแบบเงียบๆ ไม่เด้งแจ้งเตือนย้อนหลัง
    if (store.get("cq_badges", null) === null) store.set("cq_badges", BADGES.filter(b => b.test(s)).map(b => b.id));
    if (!row) return;
    row.textContent = "";
    let got = 0;
    const expanded = row.dataset.expanded === "1";
    // เหรียญที่เคยได้แล้วยังแสดงอยู่ แม้เงื่อนไขเปลี่ยน (เช่น Galaxy Traveler เมื่อมีภาษาเพิ่ม)
    const earned = new Set(store.get("cq_badges", []));
    const sorted = BADGES.map(b => ({ b, on: b.test(s) || earned.has(b.id) })).sort((x, y) => y.on - x.on);
    got = sorted.filter(x => x.on).length;
    const shown = expanded ? sorted : sorted.slice(0, Math.max(6, got));
    shown.forEach(({ b, on }) => {
      const el = document.createElement("div");
      el.className = "badge" + (on ? " on" : "");
      el.innerHTML = '<span class="b-ico">' + UIKit.AppIcon(on ? b.icon : "lock", { size: 26 }) + '</span><b>' + esc(b.name) + "</b><small>" + esc(b.desc) + "</small>";
      el.setAttribute("aria-label", b.name + (on ? " (ได้แล้ว)" : " (ยังไม่ได้)") + " — " + b.desc);
      el.title = b.name + " — " + b.desc;
      row.appendChild(el);
    });
    $("badgeCount").innerHTML = got + " / " + BADGES.length + (shown.length < BADGES.length || expanded
      ? ' · <button class="link-btn inline" id="badgeMore">' + (expanded ? "ย่อ" : "ดูทั้งหมด") + "</button>" : "");
    const more = $("badgeMore");
    if (more) more.onclick = () => { row.dataset.expanded = expanded ? "0" : "1"; renderBadges(); };
  }
  /** ตรวจเหรียญใหม่หลังผ่านด่าน → แจ้งเตือนครั้งเดียว */
  function checkNewBadges() {
    const s = stats(), had = new Set(store.get("cq_badges", [])), fresh = [];
    BADGES.forEach(b => { if (b.test(s) && !had.has(b.id)) { had.add(b.id); fresh.push(b); } });
    store.set("cq_badges", [...had]);
    fresh.forEach((b, i) => setTimeout(() => { toast('<span class="t-ico">' + UIKit.AppIcon(b.icon, { size: 26 }) + "</span><div><b>ได้เหรียญใหม่: " + esc(b.name) + "</b><br>" + esc(b.desc) + "</div>", "gold"); SFX.badge(); }, 700 + i * 900));
    return fresh;
  }
  window.QUEST.checkNewBadges = checkNewBadges;
  window.QUEST.bumpCounter = (k) => { const c = store.get("cq_counters", { noHint: 0, firstTry: 0, racer: 0 }); c[k] = (c[k] || 0) + 1; store.set("cq_counters", c); };

  /* ═══════════ หลังผ่านด่าน: ภารกิจประจำวัน / สถิติ / เหรียญ ═══════════ */
  let hintLevel = 0;
  const origRecordPass = recordPass;
  recordPass = async function () {
    const wasDone = state.done.has(doneKey(state.lang, state.topic, state.stage));
    await origRecordPass();
    if (!wasDone) {
      bumpDaily();
      if (hintLevel === 0) QUEST.bumpCounter("noHint");
      if (attempts === 0) QUEST.bumpCounter("firstTry");
    }
    checkNewBadges();
  };

  /* ═══════════ หัวภารกิจ: ดาว · ความยาก · EXP · บอส + คำใบ้ 3 ขั้น ═══════════ */
  const origRenderStage = renderStage;
  renderStage = function () {
    hintLevel = 0;
    origRenderStage();
    const t = curTopic(), L = levels()[state.stage], w = WORLDS[state.lang];
    WorldThemes.applyWorldTheme($("gameScreen"), state.lang);
    const topicNo = COURSES[state.lang].topics.indexOf(t) + 1, isBoss = state.stage === bossIndex(t);
    $("stageTag").innerHTML = UIKit.LanguageIcon(state.lang, { box: 26, title: false }) + " " + esc(COURSES[state.lang].name.toUpperCase()) + " · ภารกิจ " + topicNo + "-" + (state.stage + 1);
    let meta = $("mMeta");
    if (!meta) { meta = document.createElement("div"); meta.id = "mMeta"; meta.className = "m-meta"; $("mTitle").after(meta); }
    const dv = diffOf(L.xp);
    meta.innerHTML = '<span class="m-stars" aria-label="ความยาก ' + STAR_LABEL[dv] + '">' + stars(dv) + " " + STAR_LABEL[dv] + '</span><span class="m-xp">+' + L.xp + " EXP</span>" +
      (L.quiz ? '<span class="m-type">' + UIKit.AppIcon("quiz", { size: 14 }) + " " + esc(L.kind || "ข้อสอบทฤษฎี") + "</span>" : L.kind && !isBoss ? '<span class="m-type">' + UIKit.AppIcon("code", { size: 14 }) + " " + esc(L.kind) + "</span>" : "") + (isBoss ? '<span class="m-boss">' + UIKit.AppIcon("shield", { size: 14 }) + ' ภารกิจบอส</span>' : "") +
      (L.project ? '<span class="m-project">' + UIKit.AppIcon("blocks", { size: 14 }) + " โปรเจกต์: " + esc(L.project.name) + " · ตอน " + L.project.part + "/" + L.project.of + "</span>" : "");
    // ช่องผลลัพธ์ว่าง: CodeBot บอกว่าต้องทำอะไร
    if (!L.quiz && outEl.querySelector(".empty")) {
      outEl.innerHTML = '<div class="bot-empty">' + ART.codebot("think") + '<span>เขียนโค้ดแล้วกดปุ่ม <b>รัน</b> (หรือ Ctrl + Enter)<br>ผลลัพธ์จะแสดงที่นี่</span></div>';
    }
    runBtn.dataset.loading = LOADING_LINES[state.lang] || "กำลังรัน...";
    $("hintBox").innerHTML = "";
    const noHints = typeof room !== "undefined" && room.active && room.settings && room.settings.hints === false;
    $("hintBtn").style.display = L.quiz || noHints ? "none" : "";
    updateHintBtn();
  };
  const maxHint = () => {
    return state.stage === bossIndex(curTopic()) ? 2 : 3; // ด่านบอสให้คำใบ้แค่ 2 ขั้น
  };
  /** ขั้น 2: ปิดค่าที่เป็นคำตอบในโค้ดตัวอย่าง เหลือแค่โครงสร้างคำสั่ง */
  const maskHint = h => String(h || "").replace(/<code>([\s\S]*?)<\/code>/g, (_, c) =>
    "<code>" + c.replace(/(&quot;|")([^"&]|&(?!quot;))*?(&quot;|")/g, '"…"').replace(/'[^']*'/g, "'…'").replace(/\b\d+(\.\d+)?\b/g, "…") + "</code>");
  updateHintBtn = function () {
    const b = $("hintBtn"), max = maxHint();
    if (attempts < 2) {
      b.disabled = true;
      b.innerHTML = UIKit.AppIcon("lock", { size: 18 }) + "<span>คำใบ้ (ลองเองอีก " + (2 - attempts) + " ครั้งก่อน)</span>";
      return;
    }
    b.disabled = hintLevel >= max;
    b.innerHTML = UIKit.AppIcon("hint", { size: 18 }) + "<span>" + (hintLevel >= max ? "ใช้คำใบ้ครบแล้ว" : "ขอคำใบ้ขั้นที่ " + (hintLevel + 1) + "/" + max) + "</span>";
  };
  $("hintBtn").onclick = () => {
    const L = levels()[state.stage], max = maxHint();
    if (hintLevel >= max) return;
    hintLevel++;
    const box = $("hintBox");
    const custom = Array.isArray(L.hints) && L.hints.length === 3;   // ด่าน C++ กำหนดคำใบ้ 3 ขั้นเอง: แนวคิด → syntax → โครงสร้าง
    const parts = custom ? [
      '<div class="hint-step"><span class="hs-n">1</span><div><b>แนวคิด</b> — ' + richText(L.hints[0]) + "</div></div>",
      '<div class="hint-step"><span class="hs-n">2</span><div><b>คำสั่งที่ใช้</b> — ' + richText(L.hints[1]) + "</div></div>",
      '<div class="hint-step"><span class="hs-n">3</span><div><b>โครงสร้าง</b> — ' + richText(L.hints[2]) + "</div></div>",
    ] : [
      '<div class="hint-step"><span class="hs-n">1</span><div><b>คิดก่อน</b> — ' + richText(L.desc) + "<br><i>ลองถามตัวเองว่า เป้าหมายต้องการผลลัพธ์แบบไหน และบทเรียนสอนคำสั่งอะไรที่ใช้ได้?</i></div></div>",
      '<div class="hint-step"><span class="hs-n">2</span><div><b>โครงสร้างที่ใช้</b> — ' + maskHint(richText(L.hint)) + "</div></div>",
      '<div class="hint-step"><span class="hs-n">3</span><div><b>แนวทางเต็ม</b> — ' + richText(L.hint) + "</div></div>",
    ];
    box.innerHTML = '<div class="hint-bot">' + ART.codebot("think") + '<span>CodeBot มาช่วยแล้ว! ใช้คำใบ้ยังได้ EXP เต็ม แต่จะไม่นับเหรียญ No Hint Hero</span></div>' + parts.slice(0, hintLevel).join("") +
      (max === 2 && hintLevel === 2 ? '<div class="hint-step boss-note">' + UIKit.AppIcon("shield", { size: 16 }) + ' ภารกิจบอสให้คำใบ้ได้แค่ 2 ขั้น — ลุยต่อด้วยตัวเองนะ!</div>' : "");
    box.classList.add("show");
    updateHintBtn();
  };

  /* ข้อความระหว่างรันตามบุคลิกของแต่ละภาษา */
  /* ข้อความปุ่มรันตามภาษา: ย้ายไปอยู่ในระบบ state ของ ui.js (setRunState) */

  /* ═══════════ หน้าบทเรียน: แบนเนอร์ของโลก (เนื้อหาบทเรียนเหมือนเดิม) ═══════════ */
  const origOpenLesson = openLesson;
  openLesson = function (t) {
    origOpenLesson(t);
    const screen = $("lessonScreen"), lang = state.lang || "python";
    WorldThemes.applyWorldTheme(screen, lang);
    let b = $("lsBanner");
    if (!b) { b = document.createElement("div"); b.id = "lsBanner"; $("lsTitle").before(b); }
    b.innerHTML = WorldThemes.LanguageThemeBanner(lang, { eyebrow: WORLDS[lang].name + " · บทเรียน" });
  };

  /* ═══════════ แผนที่ด่านในหัวข้อ: ทำเครื่องหมายด่านบอส ═══════════ */
  const origRenderPath = renderPath;
  let pathW = 0;
  renderPath = function () {
    origRenderPath();
    const wrap = $("pathWrap");
    pathW = wrap.clientWidth;
    // วาดตอนหน้ายังซ่อน (ความกว้าง = 0) → รอให้หน้าแสดงแล้ววาดใหม่ด้วยความกว้างจริง
    if (!pathW) requestAnimationFrame(() => { if ($("pathWrap").clientWidth) renderPath(); });
    if (window.ResizeObserver && !wrap._ro) {
      wrap._ro = new ResizeObserver(() => { const w = wrap.clientWidth; if (w && Math.abs(w - pathW) > 4) renderPath(); });
      wrap._ro.observe(wrap);
    }
    if (window.decoratePathLocks) decoratePathLocks();
    const nodes = Array.from(document.querySelectorAll("#pathWrap .node")).filter(n => !n.classList.contains("lesson"));
    const bi = bossIndex(curTopic());
    if (bi >= 0 && nodes[bi]) {
      const last = nodes[bi];
      last.classList.add("boss");
      last.title = "ภารกิจบอส: " + (last.title || "");
      const tag = document.createElement("span"); tag.className = "boss-tag"; tag.innerHTML = UIKit.AppIcon("battle", { size: 16 }); last.appendChild(tag);
    }
  };

  /* ═══════════ เลเวลอัป: บอกสิ่งที่ปลดล็อก + เคารพการตั้งค่าลดการเคลื่อนไหว ═══════════ */
  const ACC_UNLOCK = { 2: "🎓 หมวกบัณฑิต", 3: "🪖 หมวกนักบิน", 5: "👓 แว่นโปรแกรมเมอร์", 7: "🎧 หูฟัง", 10: "👑 มงกุฎ", 12: "🚀 จรวดคู่ใจ", 15: "✨ ประกายดาว" };
  window.QUEST.ACC_UNLOCK = ACC_UNLOCK;
  const origConfetti = confetti;
  confetti = function () { if (!reduceMotion()) origConfetti(); };
  const origLevelUp = showLevelUp;
  showLevelUp = function () {
    origLevelUp();
    SFX.level();
    const un = [];
    if (ACC_UNLOCK[state.level]) un.push(UIKit.AppIcon("gift", { size: 18 }) + " ปลดล็อกของตกแต่งตัวละคร: <b>" + ACC_UNLOCK[state.level] + "</b>");
    const fresh = checkNewBadges();
    fresh.forEach(b => un.push(UIKit.AppIcon("award", { size: 18 }) + " เหรียญใหม่: <b>" + esc(b.name) + "</b>"));
    $("lvlMsg").textContent = "พลังการเขียนโค้ดของคุณเพิ่มขึ้น — ตอนนี้คุณคือ LV." + state.level;
    $("lvlUnlocks").innerHTML = un.length ? un.map(x => "<div>" + x + "</div>").join("") : '<div class="muted">ผ่านด่านต่อเพื่อปลดล็อกของตกแต่งชิ้นถัดไป</div>';
  };

  /* ═══════════ ออกจากระบบ → กลับหน้าแรก ═══════════ */
  $("authBtn").onclick = async () => {
    if (state.user) {
      await api("/api/logout", {}).catch(() => {});
      state = { user: null, level: 1, xp: 0, lang: null, topic: null, stage: 0, done: new Set() };
      $("pname").textContent = "ผู้เยี่ยมชม";
      try { localStorage.removeItem("cq_had_session"); } catch {}
      $("editHint").textContent = "แตะเพื่อล็อกอิน";
      $("authBtn").textContent = "เข้าสู่ระบบ";
      renderAvatar(); renderXP(); renderLangs();
      showLanding();
      return;
    }
    setAuthMode("login");
    $("authOverlay").classList.add("show");
  };
})();
