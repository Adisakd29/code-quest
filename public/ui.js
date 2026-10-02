/**
 * ui.js — ปรับประสบการณ์ใช้งาน (UI/UX) แบบ incremental บนระบบเดิม
 * ไม่แตะตรรกะตรวจคำตอบ / EXP / การแข่งขัน — เปลี่ยนเฉพาะการแสดงผลและการโต้ตอบ
 */
(() => {
  const { AppIcon, LanguageIcon, esc } = UIKit;
  const reduceMotion = () => document.body.classList.contains("reduce-motion") || (!document.body.classList.contains("allow-motion") && window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const setBtn = (el, icon, label, size) => { if (el) el.innerHTML = (icon ? AppIcon(icon, { size: size || 18 }) : "") + "<span>" + esc(label) + "</span>"; };

  /* ═══════════ 1) หน้าจอโหลด: ข้อความกลาง และไม่บล็อกทั้งแอประหว่างรอ Python ═══════════ */
  try { clearInterval(bootTimer); } catch {}
  $("bootStatus").textContent = "กำลังเตรียมโลกแห่งการเขียนโค้ด...";
  setTimeout(() => $("boot").classList.add("hide2"), 350); // Python โหลดต่อเบื้องหลัง ภาษาอื่นเล่นได้ทันที

  /* ═══════════ 2) ปุ่ม Run / Submit + สถานะ runtime ═══════════
   * Run    = รันดูผลลัพธ์ (ไม่ตรวจ ไม่นับความพยายาม)   · Submit = ส่งคำตอบให้ตรวจ (พฤติกรรมเดิมของปุ่มรัน)
   * สถานะ Python อ่านจาก window.cqPyState ที่ initPy ตั้งให้ ("loading" | "ready" | "error")
   */
  let resultTimer = null, lastMode = "run";
  const submitBtn = $("submitBtn");
  const pyState = () => (typeof pyodide !== "undefined" && pyodide ? "ready" : window.cqPyState || "loading");
  const blockedByRuntime = () => (state.lang === "python" && pyState() === "loading") || ((window.cqUsesClang && cqUsesClang()) && window.CPP && CPP.state === "loading");
  const RUN_LABEL = { python: "รัน", c: "รัน", cpp: "คอมไพล์และรัน", html: "แสดงผล", css: "แสดงผล", js: "รัน" };
  /**
   * @param {"idle"|"loading"|"ready"|"running"|"passed"|"error"|"ran"} s  idle = คืนสู่สถานะพร้อม/รอโหลดตามภาษา
   */
  window.setRunState = function (st) {
    if (st === "idle") st = blockedByRuntime() ? "loading" : "ready";
    clearTimeout(resultTimer);
    runBtn.dataset.state = st; submitBtn.dataset.state = st;
    const busy = st === "loading" || st === "running";
    runBtn.disabled = busy; submitBtn.disabled = busy;
    runBtn.toggleAttribute("aria-busy", busy); submitBtn.toggleAttribute("aria-busy", busy);
    const own = $("runOwnBtn"); if (own) own.disabled = busy;
    if (st === "loading") {
      setBtn(runBtn, "spinner", (window.cqUsesClang && cqUsesClang()) ? "รอคอมไพเลอร์..." : "รอ Python...");
      setBtn(submitBtn, "check-circle", "ส่งคำตอบ");
    } else if (st === "running") {
      if (lastMode === "submit") { setBtn(submitBtn, "spinner", "กำลังตรวจ..."); setBtn(runBtn, "play", RUN_LABEL[state.lang] || "รัน"); }
      else { setBtn(runBtn, "spinner", "กำลังรัน..."); setBtn(submitBtn, "check-circle", "ส่งคำตอบ"); }
    } else {
      setBtn(runBtn, "play", st === "ran" ? "รันแล้ว" : RUN_LABEL[state.lang] || "รัน");
      setBtn(submitBtn, st === "passed" ? "check-circle" : st === "error" ? "x-circle" : "check-circle",
        st === "passed" ? "ผ่านแล้ว!" : st === "error" ? "ยังไม่ผ่าน ลองใหม่" : "ส่งคำตอบ");
      if (st === "passed" || st === "error" || st === "ran") resultTimer = setTimeout(() => setRunState("ready"), 2200);
    }
    runBtn.title = "รันดูผลลัพธ์ (Ctrl + Enter) — ยังไม่ตรวจคำตอบ";
    submitBtn.title = "ส่งคำตอบให้ระบบตรวจ (Ctrl + Shift + Enter)";
    paintRuntime();
  };

  /** ป้ายสถานะตัวรันของภาษาปัจจุบัน + ปุ่มลองโหลด Python ใหม่เมื่อพัง */
  function paintRuntime() {
    const chip = $("rtChip");
    if (!chip) return;
    if ((window.cqUsesClang && cqUsesClang()) && window.CPP) {
      const cs = CPP.state;
      chip.className = "rt-chip " + (cs === "ready" ? "ok" : cs === "error" ? "err" : "wait");
      chip.title = "";
      chip.innerHTML = cs === "ready" ? AppIcon("check-circle", { size: 14 }) + "<span>C++20 พร้อม</span>"
        : cs === "error" ? AppIcon("warning", { size: 14 }) + '<span>โหลดคอมไพเลอร์ไม่สำเร็จ</span><button type="button" class="rt-retry" id="rtRetryCpp">' + AppIcon("refresh", { size: 14 }) + "<span>ลองใหม่</span></button>"
        : cs === "loading" ? AppIcon("spinner", { size: 14 }) + "<span>กำลังโหลดคอมไพเลอร์ C++ " + (CPP.progress || 0) + "% (ครั้งแรก ~20MB)</span>"
        : AppIcon("info", { size: 14 }) + "<span>คอมไพเลอร์จะโหลดเมื่อรันครั้งแรก</span>";
      const rc = $("rtRetryCpp"); if (rc) rc.onclick = () => CPP.warm().catch(() => {});
      return;
    }
    if (state.lang !== "python") {
      chip.className = "rt-chip ok";
      chip.innerHTML = AppIcon("check-circle", { size: 14 }) + "<span>พร้อมรัน</span>";
      chip.title = "ภาษานี้รันในเบราว์เซอร์ได้ทันที";
      return;
    }
    const st = pyState();
    chip.className = "rt-chip " + (st === "ready" ? "ok" : st === "error" ? "err" : "wait");
    chip.title = st === "error" ? (window.cqPyError || "") : "";
    chip.innerHTML = st === "ready" ? AppIcon("check-circle", { size: 14 }) + "<span>Python พร้อม</span>"
      : st === "error" ? AppIcon("warning", { size: 14 }) + '<span>โหลด Python ไม่สำเร็จ</span><button type="button" class="rt-retry" id="rtRetry">' + AppIcon("refresh", { size: 14 }) + "<span>ลองใหม่</span></button>"
      : AppIcon("spinner", { size: 14 }) + "<span>กำลังโหลด Python (ครั้งแรกใช้เวลาสักครู่)</span>";
    const r = $("rtRetry");
    if (r) r.onclick = retryPython;
  }
  /** โหลด Python ใหม่: ถ้าไฟล์ตัวโหลดหายไปด้วย ให้โหลดไฟล์ใหม่ก่อน */
  function retryPython() {
    window.cqPyState = "loading"; setRunState("idle");
    const go = () => initPy();
    if (typeof loadPyodide === "function") return go();
    const sc = document.createElement("script");
    sc.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
    sc.onload = go;
    sc.onerror = () => { window.cqPyState = "error"; window.cqPyError = "ดาวน์โหลดตัวโหลด Python ไม่ได้ (ตรวจอินเทอร์เน็ต)"; setRunState("idle"); };
    document.head.appendChild(sc);
  }
  document.addEventListener("cq:runtime", () => setRunState("idle"));
  // C++: สถานะคอมไพเลอร์เปลี่ยน → อัปเดตปุ่มและป้าย · เข้าด่าน C++ → เริ่มโหลดคอมไพเลอร์ล่วงหน้า
  if (window.CPP) CPP.onChange(() => { if ((window.cqUsesClang && cqUsesClang())) setRunState(runBtn.dataset.state === "running" ? "running" : "idle"); });

  const origRunCode = runCode;
  runCode = async function (ownInput, mode) {
    if (Array.isArray(levels()[state.stage].quiz)) return;
    lastMode = mode === "submit" ? "submit" : "run";
    setRunState("running");
    await origRunCode(ownInput, mode);
    if (ownInput) return setRunState("ready");
    if (mode !== "submit") return setRunState("ran");
    const b = $("banner").className;
    // C++: บอกผลกรณีทดสอบ (กรณีซ่อนบอกแค่ประเภท ไม่เปิดเผย input)
    if ((window.cqUsesClang && cqUsesClang()) && window.__cppFeedback && !/\bpass\b/.test(b)) {
      const box = document.createElement("div");
      box.className = "cpp-feedback"; box.setAttribute("role", "status");
      box.textContent = window.__cppFeedback;
      const old = document.querySelector(".cpp-feedback"); if (old) old.remove();
      $("banner").after(box);
    } else { const old = document.querySelector(".cpp-feedback"); if (old) old.remove(); }
    setRunState(/\bpass\b/.test(b) ? "passed" : "error");
    if (/\bpass\b/.test(b)) celebrate($("banner"));
  };
  runBtn.onclick = () => runCode(false, "run");
  submitBtn.onclick = () => runCode(false, "submit");

  /* ═══════════ 3) Code Editor: เลขบรรทัด · Tab · Ctrl/Cmd+Enter · เต็มจอ · ยืนยันรีเซ็ต ═══════════ */
  const wrap = document.createElement("div");
  wrap.className = "code-wrap";
  const gutter = document.createElement("div");
  gutter.className = "gutter"; gutter.setAttribute("aria-hidden", "true");
  codeEl.parentNode.insertBefore(wrap, codeEl);
  wrap.appendChild(gutter); wrap.appendChild(codeEl);
  codeEl.setAttribute("aria-label", "ช่องเขียนโค้ด");
  const help = document.createElement("div");
  help.id = "editorHelp"; help.className = "editor-help";
  help.innerHTML = "<kbd>Tab</kbd> ย่อหน้า · <kbd>Shift</kbd>+<kbd>Tab</kbd> ลดย่อหน้า · <kbd>Esc</kbd> แล้ว <kbd>Tab</kbd> เพื่อออกจากช่อง · <kbd>Ctrl</kbd>+<kbd>Enter</kbd> รัน · <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Enter</kbd> ส่งคำตอบ";
  wrap.after(help);
  codeEl.setAttribute("aria-describedby", "editorHelp");
  function updateGutter() {
    const n = codeEl.value.split("\n").length;
    if (gutter.childElementCount !== n) gutter.innerHTML = Array.from({ length: n }, (_, i) => "<span>" + (i + 1) + "</span>").join("");
    gutter.scrollTop = codeEl.scrollTop;
  }
  codeEl.addEventListener("input", updateGutter);
  codeEl.addEventListener("scroll", () => { gutter.scrollTop = codeEl.scrollTop; });
  window.updateGutter = updateGutter;

  let tabEscape = false;
  document.addEventListener("keydown", e => {
    if (e.target !== codeEl) return;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault(); e.stopImmediatePropagation();
      const target = e.shiftKey ? submitBtn : runBtn;
      if (!target.disabled) target.click();
      return;
    }
    if (e.key === "Escape") { tabEscape = true; return; }
    if (e.key === "Tab" && !tabEscape) {
      e.preventDefault(); e.stopImmediatePropagation();
      const v = codeEl.value, a = codeEl.selectionStart, b = codeEl.selectionEnd;
      const ls = v.lastIndexOf("\n", a - 1) + 1;
      if (a === b && !e.shiftKey) {
        codeEl.setRangeText(" ".repeat(window.cqTabSize || 4), a, b, "end");
      } else {
        // ย่อหน้า/ลดย่อหน้าหลายบรรทัดที่เลือก
        const le = v.indexOf("\n", b); const end = le === -1 ? v.length : le;
        const block = v.slice(ls, end).split("\n").map(l => e.shiftKey ? l.replace(new RegExp("^( {1," + (window.cqTabSize || 4) + "}|\\t)"), "") : " ".repeat(window.cqTabSize || 4) + l).join("\n");
        codeEl.setRangeText(block, ls, end, "preserve");
        codeEl.selectionStart = ls; codeEl.selectionEnd = ls + block.length;
      }
      codeEl.dispatchEvent(new Event("input"));
      return;
    }
    tabEscape = false;
  }, true);

  // ปุ่มเต็มจอ (ไอคอนอย่างเดียว ต้องมี aria-label)
  const fsBtn = document.createElement("button");
  fsBtn.type = "button"; fsBtn.className = "ghost icon-btn"; fsBtn.id = "fsBtn";
  const card = document.querySelector("#gameScreen .editor-card");
  const paintFs = () => { const on = card.classList.contains("fullscreen"); fsBtn.innerHTML = AppIcon(on ? "minimize" : "maximize", { size: 18 }); fsBtn.setAttribute("aria-label", on ? "ออกจากโหมดเต็มจอ" : "ขยาย editor เต็มจอ"); fsBtn.setAttribute("aria-pressed", String(on)); };
  fsBtn.onclick = () => { card.classList.toggle("fullscreen"); document.body.classList.toggle("editor-fs", card.classList.contains("fullscreen")); paintFs(); codeEl.focus(); };
  document.querySelector("#gameScreen .editor-head .actions").prepend(fsBtn);
  paintFs();
  document.addEventListener("keydown", e => { if (e.key === "Escape" && card.classList.contains("fullscreen") && e.target !== codeEl) fsBtn.click(); });

  // รีเซ็ต: ถามก่อนถ้าโค้ดจะหาย
  $("resetBtn").onclick = () => {
    const starter = levels()[state.stage].starter || "";
    if (codeEl.value.trim() !== starter.trim() && !confirm("รีเซ็ตโค้ดกลับเป็นค่าเริ่มต้น?\nโค้ดที่คุณเขียนไว้จะหายไป")) return;
    codeEl.value = starter; updateGutter(); codeEl.focus();
    Autosave.clear();
  };

  // หัวข้อช่องผลลัพธ์: Console สำหรับ Python/C · Live Preview + Console สำหรับเว็บ
  const previewHead = document.createElement("div");
  previewHead.className = "panel-head"; previewHead.id = "previewHead";
  previewHead.innerHTML = AppIcon("monitor", { size: 16 }) + "<span>Live Preview — หน้าเว็บที่ได้</span>";
  $("previewWrap").before(previewHead);
  /* ── (2) ปลดล็อกด่านตามลำดับ: ด่านแรกเปิดเสมอ · ด่านที่ผ่านแล้วเปิดเสมอ · ด่านอื่นต้องผ่านด่านก่อนหน้า ──
   * ใช้ข้อมูลความคืบหน้าเดิม (state.done) · โหมดห้องแข่งไม่ถูกล็อก (โจทย์สุ่มจากเซิร์ฟเวอร์) */
  const isDone = (lang, topic, i) => state.done.has(doneKey(lang, topic, i));
  window.stageUnlocked = function (lang, topicId, i) {
    if (typeof room !== "undefined" && room.active) return true;
    return i <= 0 || isDone(lang, topicId, i) || isDone(lang, topicId, i - 1);
  };
  const firstOpenStage = (lang, t) => {
    const i = t.stages.findIndex((_, k) => !isDone(lang, t.id, k));
    return i === -1 ? 0 : i;
  };

  /* ── (8) บันทึกโค้ดอัตโนมัติ: แยกตามผู้เล่น/ภาษา/หัวข้อ/ด่าน · ไม่กู้คืนในโหมดแข่ง (กันเอาคำตอบเดิมมาใช้) ── */
  const Autosave = (() => {
    const owner = () => (state.user ? "u:" + state.user.name : "guest");
    const key = () => "cq_code:v1:" + owner() + ":" + state.lang + ":" + state.topic + ":" + state.stage;
    const enabled = () => !(typeof room !== "undefined" && room.active) && !Array.isArray((levels()[state.stage] || {}).quiz);
    let timer = null;
    const status = (html, cls) => { const el = $("saveState"); if (el) { el.className = "save-state " + (cls || ""); el.innerHTML = html; } };
    return {
      restore() {
        status("");
        document.querySelector(".restore-note") && document.querySelector(".restore-note").remove();
        if (!enabled()) return;
        let saved = null;
        try { saved = localStorage.getItem(key()); } catch {}
        const starter = levels()[state.stage].starter || "";
        if (saved == null || saved === starter) return;
        codeEl.value = saved;
        const note = document.createElement("div");
        note.className = "restore-note"; note.setAttribute("role", "status");
        note.innerHTML = AppIcon("refresh", { size: 14 }) + "<span>กู้คืนโค้ดที่คุณเขียนไว้ล่าสุด</span>" +
          '<button type="button" class="link-btn inline">ใช้โค้ดเริ่มต้นแทน</button>';
        note.querySelector("button").onclick = () => { codeEl.value = starter; updateGutter(); Autosave.clear(); note.remove(); codeEl.focus(); };
        document.querySelector("#gameScreen .editor-help").after(note);
        status(AppIcon("check", { size: 13 }) + "บันทึกไว้แล้ว", "ok");
      },
      save() {
        if (!enabled()) return;
        clearTimeout(timer);
        status(AppIcon("spinner", { size: 13 }) + "กำลังบันทึก...", "wait");
        timer = setTimeout(() => {
          try {
            if (codeEl.value.length > 20000) throw new Error("too long");
            localStorage.setItem(key(), codeEl.value);
            status(AppIcon("check", { size: 13 }) + "บันทึกอัตโนมัติแล้ว", "ok");
          } catch { status(AppIcon("warning", { size: 13 }) + "บันทึกอัตโนมัติไม่ได้", "err"); }
        }, 500);
      },
      clear() { try { localStorage.removeItem(key()); } catch {} status(""); },
    };
  })();
  codeEl.addEventListener("input", () => Autosave.save());
  // ช่องโค้ดไม่ตัดบรรทัด (เลื่อนแนวนอนภายในช่องแทน) → เลขบรรทัดตรงกับบรรทัดจริง
  codeEl.setAttribute("wrap", "off");
  // จอสัมผัส: โฟกัสช่องพิมพ์ = คีย์บอร์ดเปิด → ซ่อน bottom nav ไม่ให้บังปุ่มรัน/ส่งคำตอบ
  if (matchMedia("(pointer: coarse)").matches) {
    let kbTimer = null;
    const typing = e => e.target.matches && e.target.matches("input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea,select");
    document.addEventListener("focusin", e => { if (typing(e)) { clearTimeout(kbTimer); document.body.classList.add("kb-open"); } });
    document.addEventListener("focusout", e => { if (typing(e)) kbTimer = setTimeout(() => document.body.classList.remove("kb-open"), 150); });
  }

  const origRenderStage = renderStage;
  renderStage = function () {
    // route guard: จุดเข้าหน้าภารกิจทุกทาง (จุดเลข, เส้นทาง, ปุ่มถัดไป, เล่นต่อ) ผ่านฟังก์ชันนี้
    const t = curTopic();
    if (t && window.topicUnlocked && !topicUnlocked(state.lang, state.topic)) {
      // หน่วยยังไม่ปลดล็อก → กลับแผนที่ (ไม่วนซ้ำ: แผนที่ไม่เรียก renderStage)
      window.cqLockedToast && cqLockedToast(state.lang, state.topic);
      state.topic = null; renderTopics(); showScreen("topic");
      // ตั้งธงหลังเปลี่ยนหน้าแล้ว: กันผู้เรียกที่จะสั่งเปิดหน้าเกมต่อทันที (เช่น โหนดเส้นทางเรียก renderStage แล้ว showScreen("game"))
      // และล้างธงในรอบถัดไปเสมอ เพื่อไม่ให้ค้างไปบล็อกการเปิดหน้าเกมครั้งต่อๆ ไปที่ถูกต้อง
      window.__cqBlockGame = true;
      setTimeout(() => { window.__cqBlockGame = false; }, 0);
      return;
    }
    if (t && !stageUnlocked(state.lang, state.topic, state.stage)) {
      const to = firstOpenStage(state.lang, t);
      QUEST.toast && QUEST.toast('<span class="t-ico">' + AppIcon("lock", { size: 22 }) + "</span><div><b>ภารกิจที่ " + (state.stage + 1) + " ยังล็อกอยู่</b><br>ผ่านภารกิจที่ " + (to + 1) + " ก่อนนะ</div>");
      state.stage = to;
    }
    origRenderStage();
    Autosave.restore();
    updateGutter();
    if ((window.cqUsesClang && cqUsesClang()) && window.CPP && CPP.state === "idle" && !Array.isArray((levels()[state.stage] || {}).quiz)) CPP.warm().catch(() => {});
    const oldFb = document.querySelector(".cpp-feedback"); if (oldFb) oldFb.remove();
    const web = ["html", "css", "js"].includes(state.lang);
    const tag = $("outTag");
    tag.innerHTML = AppIcon("terminal", { size: 15 }) + "<span>" + (state.lang === "js" ? "Console (console.log)" : web ? "ข้อความบนหน้าเว็บ" : "Console — ผลลัพธ์จากโปรแกรม") + "</span>";
    previewHead.classList.toggle("hide", !web || state.lang === "js" && !levels()[state.stage].html);
    if (card.classList.contains("fullscreen") && Array.isArray(levels()[state.stage].quiz)) fsBtn.click();
    setRunState("idle");
  };

const lockedStageToast = i => QUEST.toast && QUEST.toast('<span class="t-ico">' + AppIcon("lock", { size: 22 }) + "</span><div><b>ภารกิจที่ " + (i + 1) + " ยังล็อกอยู่</b><br>ผ่านภารกิจที่ " + i + " ก่อนนะ</div>");
  /* จุดเลขด่านใต้การ์ดโจทย์: ด่านที่ล็อกกดไม่ได้และมีไอคอนกุญแจ */
  const origDots = renderDots;
  renderDots = function () {
    origDots();
    [...$("dots").children].forEach((b, i) => {
      if (stageUnlocked(state.lang, state.topic, i)) return;
      b.setAttribute("aria-disabled", "true"); b.classList.add("locked");
      b.onclick = e => { e.preventDefault(); lockedStageToast(i); };
      b.innerHTML = AppIcon("lock", { size: 14 });
      b.setAttribute("aria-label", "ภารกิจที่ " + (i + 1) + " ล็อกอยู่ — ผ่านภารกิจก่อนหน้าก่อน");
    });
  };
  /* เส้นทางด่านในหัวข้อ (หน้า learn): ด่านที่ล็อกกดไม่ได้ */
  window.decoratePathLocks = function () {
    const nodes = [...document.querySelectorAll("#pathWrap .node")].filter(n => !n.classList.contains("lesson"));
    nodes.forEach((n, i) => {
      if (stageUnlocked(state.lang, state.topic, i)) return;
      n.setAttribute("aria-disabled", "true"); n.classList.add("locked");
      n.onclick = e => { e.preventDefault(); lockedStageToast(i); };
      n.innerHTML = AppIcon("lock", { size: 22 });
      n.setAttribute("aria-label", "ภารกิจที่ " + (i + 1) + " ล็อกอยู่ — ผ่านภารกิจก่อนหน้าก่อน");
      n.title = "ผ่านภารกิจก่อนหน้าก่อน";
    });
  };

  /* ═══════════ 4) Navigation: icon + text, aria-current, bottom nav บนมือถือ (CSS) ═══════════ */
  const NAV = { tabLearn: ["learn", "lang", "topic", "lesson", "game", "home"], roomBtn: ["room"], boardBtn: ["board"] };
  const origShow = showScreen;
  showScreen = function (name) {
    if (window.__cqBlockGame && (name === "game" || name === "learn" || name === "lesson")) { window.__cqBlockGame = false; return; }
    origShow(name);
    for (const id of Object.keys(NAV)) {
      const el = $(id);
      if (!el) continue;
      const on = el.classList.contains("on");
      if (on) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current");
    }
    // ออกจากหน้าเกมแล้วปิดโหมดเต็มจอ
    if (name !== "game" && card.classList.contains("fullscreen")) fsBtn.click();
  };
  $("soundBtn").classList.add("icon-btn");
  // มือถือ: ย้ายแถบเมนูไปท้าย body เป็น bottom navigation
  // (header มี backdrop-filter ซึ่งทำให้ position:fixed อ้างอิง header แทนหน้าจอ)
  const tabbar = document.querySelector(".tabbar"), tabHome = tabbar.parentNode, tabNext = tabbar.nextSibling;
  tabbar.setAttribute("aria-label", "เมนูหลัก");
  const mq = matchMedia("(max-width: 720px)");
  const placeNav = () => { if (mq.matches) document.body.appendChild(tabbar); else tabHome.insertBefore(tabbar, tabNext); };
  (mq.addEventListener ? mq.addEventListener("change", placeNav) : mq.addListener(placeNav));
  placeNav();
  // ปุ่มที่ซ่อนข้อความบนจอเล็ก ต้องยังมีชื่อให้โปรแกรมอ่านหน้าจอ
  new MutationObserver(() => $("authBtn").setAttribute("aria-label", $("authBtn").textContent.trim())).observe($("authBtn"), { childList: true, subtree: true, characterData: true });
  $("authBtn").setAttribute("aria-label", $("authBtn").textContent.trim());

  /* ── เวอร์ชันเนื้อหาท้ายหน้า ── */
  (function fixVersion() {
    const el = $("appVer");
    if (!el) return;
    if (!/^\d+$/.test(el.textContent.trim())) el.textContent = String(CONTENT_VERSION);
    fetch("/api/version", { cache: "no-store" }).then(r => (r.ok ? r.json() : null)).then(d => {
      if (d && d.version && d.version !== CONTENT_VERSION) el.textContent = CONTENT_VERSION + " (เซิร์ฟเวอร์ " + d.version + ")";
    }).catch(() => {});
  })();

  /* ═══════════ 5) HUD เลเวล / EXP ═══════════ */
  const chips = document.querySelector("header .chips");
  chips.classList.add("hud");
  chips.innerHTML =
    '<div class="hud-level" id="hudLevel">' + AppIcon("award", { size: 18 }) + '<span class="lvl-badge" id="lvlBadge">LV.1</span></div>' +
    '<div class="hud-xp">' +
      '<div class="hud-xp-top"><span id="xpText">0 / 100</span><span class="muted" id="hudNext"></span></div>' +
      '<div class="xp-bar" role="progressbar" aria-label="EXP สู่เลเวลถัดไป" aria-valuemin="0"><div class="xp-fill" id="xpFill"></div></div>' +
      '<span class="xp-float" id="xpFloat" aria-hidden="true"></span>' +
    "</div>" +
    '<div class="hud-stat" title="EXP สะสมทั้งหมด">' + AppIcon("star", { size: 16 }) + '<b id="chipXp">0</b><span>EXP รวม</span></div>' +
    '<div class="hud-stat" title="ภารกิจที่ผ่านแล้ว">' + AppIcon("check-circle", { size: 16 }) + '<b id="chipStages">0</b><span>ภารกิจ</span></div>';
  let lastTotal = null, lastLevel = null;
  const origRenderXP = renderXP;
  renderXP = function () {
    origRenderXP();
    const need = xpNeed(state.level);
    $("hudNext").textContent = "อีก " + fmt(Math.max(0, need - state.xp)) + " EXP ถึง LV." + (state.level + 1);
    $("xpText").textContent = fmt(state.xp) + " / " + fmt(need) + " EXP";
    const bar = document.querySelector(".hud .xp-bar");
    bar.setAttribute("aria-valuemax", String(need)); bar.setAttribute("aria-valuenow", String(state.xp));
    const total = totalXpLocal();
    // แสดง +EXP / เลเวลอัปเฉพาะเมื่อได้ EXP จากการผ่านภารกิจจริง (ระหว่าง recordPass)
    // ไม่ใช่ตอนเปิดหน้า/รีเฟรช/ล็อกอินที่ค่าเปลี่ยนจาก 0 เป็นค่าจริงของบัญชี
    if (!window.__xpFromPlay) { lastTotal = total; lastLevel = state.level; return; }
    if (lastTotal !== null && total > lastTotal && !reduceMotion()) {
      const f = $("xpFloat");
      f.textContent = "+" + fmt(total - lastTotal) + " EXP";
      f.classList.remove("go"); void f.offsetWidth; f.classList.add("go");
    }
    if (lastLevel !== null && state.level > lastLevel && !reduceMotion()) {
      const l = $("hudLevel"); l.classList.remove("up"); void l.offsetWidth; l.classList.add("up");
    }
    lastTotal = total; lastLevel = state.level;
  };
  renderXP();
  const recordPassForXp = recordPass;
  recordPass = async function () {
    window.__xpFromPlay = true;
    try { await recordPassForXp(); } finally { window.__xpFromPlay = false; }
  };

  /** เอฟเฟกต์เล็กๆ ตอนผ่านภารกิจ (ไม่ขยับ layout) */
  function celebrate(el) {
    if (!el || reduceMotion()) return;
    el.classList.remove("pop-ok"); void el.offsetWidth; el.classList.add("pop-ok");
  }

  /* ═══════════ 6) ปุ่มที่ข้อความถูกเปลี่ยนจากโค้ดเดิม: เติมไอคอนให้อัตโนมัติ ═══════════ */
  function decorate(el, pick) {
    if (!el) return;
    const apply = () => {
      if (el.querySelector("svg.ic")) return;
      const text = el.textContent.replace(/[→←]/g, "").trim();
      const r = pick(text);
      if (!r) return;
      mo.disconnect();
      el.innerHTML = (r.before ? AppIcon(r.icon, { size: 18 }) : "") + "<span>" + esc(text) + "</span>" + (r.before ? "" : AppIcon(r.icon, { size: 18 }));
      mo.observe(el, { childList: true, characterData: true, subtree: true });
    };
    const mo = new MutationObserver(apply);
    mo.observe(el, { childList: true, characterData: true, subtree: true });
    apply();
  }
  decorate($("authBtn"), t => ({ icon: /ออก/.test(t) ? "logout" : "login", before: true }));
  decorate($("nextBtn"), () => ({ icon: "chevron-right", before: false }));
  decorate($("qNext"), () => ({ icon: "chevron-right", before: false }));
  decorate($("rlStart"), t => ({ icon: /รอผู้เล่น/.test(t) ? "users" : "play", before: true }));
  decorate($("qSubmit"), () => ({ icon: "check", before: true }));
  decorate($("rcCreate"), () => ({ icon: "flag", before: true }));
  decorate($("rjJoin"), () => ({ icon: "login", before: true }));
  decorate($("authSubmit"), t => (/กำลัง/.test(t) ? null : { icon: /สมัคร/.test(t) ? "user-plus" : "login", before: true }));
  decorate($("guestBtn"), () => ({ icon: "guest", before: true }));
  decorate($("editHint"), () => null);

  /* ═══════════ 7) ฟอร์มเข้าสู่ระบบ / สมัคร ═══════════ */
  // แสดง/ซ่อนรหัสผ่าน + เตือน Caps Lock (ทุกช่องรหัสผ่าน รวมในหน้าโปรไฟล์)
  document.querySelectorAll('input[type="password"]').forEach(inp => {
    const box = document.createElement("div");
    box.className = "pw-wrap";
    inp.parentNode.insertBefore(box, inp); box.appendChild(inp);
    const t = document.createElement("button");
    t.type = "button"; t.className = "pw-toggle icon-btn";
    const paint = () => { const shown = inp.type === "text"; t.innerHTML = AppIcon(shown ? "eye-off" : "eye", { size: 18 }); t.setAttribute("aria-label", shown ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"); t.setAttribute("aria-pressed", String(shown)); };
    t.onclick = () => { inp.type = inp.type === "password" ? "text" : "password"; paint(); inp.focus(); };
    box.appendChild(t); paint();
    const caps = document.createElement("div");
    caps.className = "field-note warn hide"; caps.setAttribute("role", "status");
    caps.innerHTML = AppIcon("warning", { size: 14 }) + "<span>เปิด Caps Lock อยู่</span>";
    box.after(caps);
    const chk = e => { if (e.getModifierState) caps.classList.toggle("hide", !e.getModifierState("CapsLock")); };
    inp.addEventListener("keyup", chk); inp.addEventListener("keydown", chk);
    inp.addEventListener("blur", () => caps.classList.add("hide"));
  });
  // ข้อกำหนดรหัสผ่านแบบสั้น + ตรวจแบบทันที
  $("pwHint").innerHTML = '<span class="req" id="pwReq">' + AppIcon("check-circle", { size: 14 }) + "อย่างน้อย 10 ตัวอักษร</span> · " +
    '<span class="req" id="pwReq2">' + AppIcon("check-circle", { size: 14 }) + "ไม่ใช่ตัวเลขล้วน</span> · แนะนำประโยคที่จำง่าย";
  $("inPass").addEventListener("input", () => {
    const v = $("inPass").value;
    $("pwReq").classList.toggle("met", v.length >= 10);
    $("pwReq2").classList.toggle("met", v.length > 0 && !(/^\d+$/.test(v) && v.length < 15));
  });
  // ตรวจรูปแบบอีเมล
  const emailNote = document.createElement("div");
  emailNote.className = "field-note err hide"; emailNote.id = "emailNote"; emailNote.setAttribute("role", "status");
  emailNote.innerHTML = AppIcon("warning", { size: 14 }) + "<span>รูปแบบอีเมลไม่ถูกต้อง เช่น name@example.com</span>";
  $("inEmail").after(emailNote);
  $("inEmail").setAttribute("aria-describedby", "emailNote");
  const emailOk = () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($("inEmail").value.trim());
  $("inEmail").addEventListener("blur", () => { const bad = $("inEmail").value.trim() !== "" && !emailOk(); emailNote.classList.toggle("hide", !bad); $("inEmail").setAttribute("aria-invalid", String(bad)); });
  $("inEmail").addEventListener("input", () => { if (emailOk()) { emailNote.classList.add("hide"); $("inEmail").setAttribute("aria-invalid", "false"); } });
  // สถานะกำลังส่ง / สำเร็จ (ใช้ตัวจัดการเดิมทั้งหมด แค่ครอบการแสดงผล)
  const origSubmit = $("authSubmit").onclick;
  $("authSubmit").onclick = async (e) => {
    if (!emailOk()) { emailNote.classList.remove("hide"); $("inEmail").focus(); return; }
    const btn = $("authSubmit"), label = btn.textContent.trim();
    btn.disabled = true; btn.setAttribute("aria-busy", "true");
    setBtn(btn, "spinner", authMode === "register" ? "กำลังสร้างบัญชี..." : "กำลังเข้าสู่ระบบ...");
    try { await origSubmit(e); }
    finally {
      btn.disabled = false; btn.removeAttribute("aria-busy");
      setBtn(btn, authMode === "register" ? "user-plus" : "login", label);
    }
    if (state.user && !$("authOverlay").classList.contains("show") && QUEST.toast) {
      QUEST.toast('<span class="t-ico">' + AppIcon("check-circle", { size: 24 }) + "</span><div><b>ยินดีต้อนรับ " + esc(state.user.name) + "</b><br>ความคืบหน้าของคุณถูกบันทึกแล้ว</div>");
    }
  };
  ["inEmail", "inPass", "inName"].forEach(id => $(id).addEventListener("keydown", e => { if (e.key === "Enter") $("authSubmit").click(); }));

  /* ═══════════ 8) ห้องแข่ง ═══════════ */
  // เลือกภาษา: โลโก้จริงในชิป
  document.querySelectorAll("#rcLangs .chip-pick").forEach(lab => {
    const inp = lab.querySelector("input");
    const name = lab.textContent.trim();
    lab.innerHTML = ""; lab.appendChild(inp);
    lab.insertAdjacentHTML("beforeend", LanguageIcon(inp.value, { box: 28, logo: 18, title: false }) + "<span>" + esc(name) + "</span>");
    if (window.WorldThemes) WorldThemes.applyWorldTheme(lab, inp.value);
  });
  $("rcLangs").setAttribute("role", "group"); $("rcLangs").setAttribute("aria-labelledby", "rcLangsLabel");
  // จำนวนข้อ: stepper + slider (ยังใช้ช่อง #rcCount เดิมให้โค้ดเดิมอ่านค่าได้)
  const cnt = $("rcCount");
  const step = document.createElement("div");
  step.className = "stepper";
  cnt.parentNode.insertBefore(step, cnt);
  const minus = document.createElement("button"), plus = document.createElement("button");
  minus.type = plus.type = "button"; minus.className = plus.className = "icon-btn step-btn";
  minus.innerHTML = "−"; plus.innerHTML = "+"; minus.setAttribute("aria-label", "ลดจำนวนข้อ"); plus.setAttribute("aria-label", "เพิ่มจำนวนข้อ");
  step.append(minus, cnt, plus);
  const range = document.createElement("input");
  range.type = "range"; range.min = "3"; range.max = "30"; range.value = cnt.value; range.className = "count-range"; range.setAttribute("aria-label", "จำนวนข้อ (สไลเดอร์)");
  step.after(range);
  const clampCount = v => Math.max(3, Math.min(30, parseInt(v) || 10));
  const setCount = v => { cnt.value = range.value = clampCount(v); };
  minus.onclick = () => setCount(+cnt.value - 1); plus.onclick = () => setCount(+cnt.value + 1);
  range.oninput = () => setCount(range.value); cnt.onchange = () => setCount(cnt.value);
  // รหัสห้อง: ตัวพิมพ์ใหญ่อัตโนมัติ รองรับการวาง และกด Enter เพื่อเข้า
  const code = $("rjCode");
  code.setAttribute("autocomplete", "off"); code.setAttribute("autocapitalize", "characters"); code.setAttribute("inputmode", "text"); code.setAttribute("spellcheck", "false");
  const cleanCode = v => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
  code.addEventListener("input", () => { const p = code.selectionStart; code.value = cleanCode(code.value); code.setSelectionRange(p, p); });
  code.addEventListener("paste", e => { e.preventDefault(); code.value = cleanCode((e.clipboardData || window.clipboardData).getData("text")); });
  code.addEventListener("keydown", e => { if (e.key === "Enter") $("rjJoin").click(); });
  // คัดลอกรหัสห้อง
  $("rlCopy").onclick = async () => {
    const txt = $("rlCode").textContent.trim();
    if (!txt) return;
    let ok = false;
    try { await navigator.clipboard.writeText(txt); ok = true; } catch {
      const r = document.createRange(); r.selectNodeContents($("rlCode")); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      try { ok = document.execCommand("copy"); } catch {}
    }
    $("rlCopy").innerHTML = AppIcon(ok ? "check" : "copy");
    setTimeout(() => { $("rlCopy").innerHTML = AppIcon("copy"); }, 1600);
    if (QUEST.toast) QUEST.toast('<span class="t-ico">' + AppIcon(ok ? "check-circle" : "info", { size: 24 }) + "</span><div>" + (ok ? "คัดลอกรหัสแล้ว <b>" + esc(txt) + "</b>" : "กด Ctrl+C เพื่อคัดลอกรหัสที่เลือกไว้") + "</div>");
  };
  // แยก action อันตราย (ปิดห้อง) ออกจากปุ่มหลัก
  const danger = document.createElement("div");
  danger.className = "danger-zone";
  danger.innerHTML = '<div class="dz-text">' + AppIcon("warning", { size: 18 }) + "<span>ปิดห้องทันทีและประกาศผล — ผู้เล่นทุกคนจะหยุดแข่ง</span></div>";
  const endBtn = $("rlEnd");
  endBtn.className = "btn-danger"; setBtn(endBtn, "flag", "ปิดห้องและประกาศผล", 16);
  danger.appendChild(endBtn);
  document.querySelector("#roomLobby .room-actions").after(danger);
  const origEndDisplay = () => { danger.classList.toggle("hide", endBtn.style.display === "none"); };
  new MutationObserver(origEndDisplay).observe(endBtn, { attributes: true, attributeFilter: ["style"] });
  origEndDisplay();
  // ปุ่มเริ่มเป็น primary action เดียวในแถว
  $("rlStart").classList.add("btn-hero");
})();

/* ═══════════ ยืนยันอีเมล (OTP) — แสดงเฉพาะเมื่อเซิร์ฟเวอร์เปิดระบบนี้ (user.verifyEnabled) ═══════════ */
(() => {
  const { AppIcon, esc } = UIKit;
  const needVerify = () => !!(state.user && state.user.verifyEnabled && !state.user.emailVerified);
  const paintBanner = () => {
    const b = $("verifyBanner");
    if (b) b.classList.toggle("hide", !needVerify() || document.body.classList.contains("on-landing"));
  };
  const msg = (t, ok) => { const m = $("verifyMsg"); m.textContent = t || ""; m.className = "form-msg" + (t ? (ok ? " ok" : " err") : ""); };
  let cooldown = 0, cdTimer = null;
  const paintResend = () => {
    const r = $("verifyResend");
    r.disabled = cooldown > 0;
    r.textContent = cooldown > 0 ? "ส่งรหัสใหม่ได้ใน " + cooldown + " วินาที" : "ส่งรหัสใหม่";
  };
  const startCooldown = s => {
    cooldown = s; paintResend(); clearInterval(cdTimer);
    cdTimer = setInterval(() => { cooldown--; paintResend(); if (cooldown <= 0) clearInterval(cdTimer); }, 1000);
  };
  function openVerify(justSent) {
    msg("");
    $("verifySub").textContent = justSent
      ? "เราส่งรหัส 6 หลักไปที่อีเมลของคุณแล้ว (ถ้าไม่เห็น ลองดูในโฟลเดอร์สแปม)"
      : "กด “ส่งรหัสใหม่” เพื่อรับรหัส 6 หลักทางอีเมล แล้วกรอกด้านล่าง";
    $("verifyCode").value = "";
    $("verifyOverlay").classList.add("show");
    if (justSent) startCooldown(60); else paintResend();
  }
  window.openVerify = openVerify;

  $("verifyOpen").onclick = () => openVerify(false);
  $("verifyLater").onclick = () => $("verifyOverlay").classList.remove("show");
  $("verifyCode").addEventListener("input", e => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6); if (e.target.value.length === 6) $("verifySubmit").click(); });
  $("verifyCode").addEventListener("keydown", e => { if (e.key === "Enter") $("verifySubmit").click(); });
  $("verifyResend").onclick = async () => {
    try {
      const r = await api("/api/email/send-code", {});
      if (r.alreadyVerified) { state.user.emailVerified = true; paintBanner(); $("verifyOverlay").classList.remove("show"); return; }
      msg("ส่งรหัสใหม่แล้ว — รหัสใช้ได้ " + (r.ttlMinutes || 10) + " นาที", true);
      startCooldown(60);
    } catch (e) { msg(e.message); if (e.status === 429) startCooldown(parseInt((e.message.match(/\d+/) || [60])[0])); }
  };
  $("verifySubmit").onclick = async () => {
    const code = $("verifyCode").value.trim();
    if (!/^\d{6}$/.test(code)) return msg("กรอกรหัสตัวเลข 6 หลัก");
    const btn = $("verifySubmit"); btn.disabled = true;
    try {
      const r = await api("/api/email/verify", { code });
      if (r.user) state.user = Object.assign(state.user, r.user); else state.user.emailVerified = true;
      $("verifyOverlay").classList.remove("show");
      paintBanner();
      QUEST.toast && QUEST.toast('<span class="t-ico">' + AppIcon("check-circle", { size: 24 }) + "</span><div><b>ยืนยันอีเมลเรียบร้อย</b><br>บัญชีของคุณพร้อมขึ้นตารางอันดับแล้ว</div>", "gold");
    } catch (e) { msg(e.message); } finally { btn.disabled = false; }
  };

  // หลังสมัคร/ล็อกอิน: อัปเดตแถบเตือน และเปิดหน้าต่างกรอกรหัสทันทีถ้าเพิ่งส่งรหัสไป
  const origApply = applySession;
  applySession = function (data) {
    origApply(data);
    paintBanner();
    if (data && data.verification && data.verification.required) setTimeout(() => window.openVerify(data.verification.sent), 400); // รุ่นล่าสุด (แสดงอีเมลแบบปิดบางส่วน)
  };
  const origShowV = showScreen;
  showScreen = function (name) { origShowV(name); paintBanner(); };

  // สมัครด้วยโดเมนที่พิมพ์ผิด: ให้ปุ่มแก้ในคลิกเดียว (ข้อความจากเซิร์ฟเวอร์ “หมายถึง x@gmail.com หรือเปล่า?”)
  new MutationObserver(() => {
    const el = $("authErr"), m = /หมายถึง (\S+@\S+) หรือเปล่า/.exec(el.textContent || "");
    if (!m && /ถ้าแน่ใจว่าถูกต้อง/.test(el.textContent || "") && !el.querySelector(".fix-email")) {
      // กฎชื่อผู้ใช้ที่อาจมีข้อยกเว้น (เช่น บัญชี Outlook รุ่นเก่า) → ให้ผู้ใช้ยืนยันเองได้
      const keep = document.createElement("button");
      keep.type = "button"; keep.className = "link-btn inline fix-email keep"; keep.textContent = "อีเมลเดิมถูกต้องแล้ว";
      keep.onclick = () => { window.__cqConfirmEmail = $("inEmail").value; el.textContent = ""; el.className = "form-msg"; $("authSubmit").click(); };
      el.appendChild(document.createTextNode(" ")); el.appendChild(keep);
      return;
    }
    if (!m || el.querySelector(".fix-email")) return;
    const b = document.createElement("button");
    b.type = "button"; b.className = "link-btn inline fix-email"; b.textContent = "ใช้ " + m[1];
    b.onclick = () => { $("inEmail").value = m[1]; el.textContent = ""; el.className = "form-msg"; $("inEmail").focus(); };
    // โดเมนที่ระบบสงสัยอาจมีอยู่จริง → ให้ผู้ใช้ยืนยันว่าอีเมลเดิมถูกต้องแล้วสมัครต่อได้
    const keep = document.createElement("button");
    keep.type = "button"; keep.className = "link-btn inline fix-email keep"; keep.textContent = "อีเมลเดิมถูกต้องแล้ว";
    keep.onclick = () => { window.__cqConfirmEmail = $("inEmail").value; el.textContent = ""; el.className = "form-msg"; $("authSubmit").click(); };
    el.appendChild(document.createTextNode(" ")); el.appendChild(b);
    el.appendChild(document.createTextNode(" · ")); el.appendChild(keep);
  }).observe($("authErr"), { childList: true, characterData: true, subtree: true });
})();

/* ═══════════ Google Sign-In · ยืนยันรหัสผ่าน · เชื่อมบัญชี · เปลี่ยนอีเมล (v30) ═══════════ */
(() => {
  const { AppIcon, esc } = UIKit;
  const toast = (ic, html, kind) => QUEST.toast && QUEST.toast('<span class="t-ico">' + AppIcon(ic, { size: 24 }) + "</span><div>" + html + "</div>", kind);

  // ── ปุ่ม Google: แสดงเมื่อเซิร์ฟเวอร์ตั้งค่าแล้ว · ข้อความ/โหมดตามแท็บ ──
  let googleOn = false;
  fetch("/api/auth/config", { cache: "no-store" }).then(r => r.ok ? r.json() : {}).then(c => { googleOn = !!c.google; paintAuthExtras(); }).catch(() => {});
  function paintAuthExtras() {
    const reg = authMode === "register";
    $("googleBlock").classList.toggle("hide", !googleOn);
    $("googleBtn").href = "/api/auth/google/start?mode=" + (reg ? "register" : "login");
    $("googleBtnText").textContent = reg ? "สมัครด้วย Google" : "ดำเนินการต่อด้วย Google";
    $("fieldPass2").classList.toggle("hide", !reg);
    $("inPass2").disabled = !reg;
  }
  const origMode = setAuthMode;
  setAuthMode = function (mode) { origMode(mode); paintAuthExtras(); };
  paintAuthExtras();

  // ── ยืนยันรหัสผ่าน (ช่วยผู้ใช้เท่านั้น เซิร์ฟเวอร์ยังตรวจนโยบายรหัสผ่านเอง) ──
  const submitBefore = $("authSubmit").onclick;
  $("authSubmit").onclick = async (e) => {
    if (authMode === "register" && $("inPass2").value !== $("inPass").value) {
      const el = $("authErr"); el.textContent = "รหัสผ่านทั้งสองช่องไม่ตรงกัน"; el.className = "form-msg err show";
      $("inPass2").setAttribute("aria-invalid", "true"); $("inPass2").focus();
      return;
    }
    $("inPass2").removeAttribute("aria-invalid");
    return submitBefore(e);
  };

  // ── ผลลัพธ์จาก Google (เซิร์ฟเวอร์ redirect กลับมาพร้อม ?auth=...) ──
  const ERR = {
    denied: "คุณยกเลิกการเข้าสู่ระบบด้วย Google", state: "การเข้าสู่ระบบหมดเวลาหรือไม่ปลอดภัย ลองอีกครั้ง",
    token: "ตรวจสอบบัญชี Google ไม่สำเร็จ ลองอีกครั้ง", unverified: "บัญชี Google นี้ยังไม่ยืนยันอีเมล จึงใช้สมัครไม่ได้",
    config: "ระบบเข้าสู่ระบบด้วย Google ยังไม่เปิดใช้งาน", server: "ระบบขัดข้องชั่วคราว ลองอีกครั้ง",
    "linked-other": "บัญชี Google นี้เชื่อมกับบัญชี Code Quest อื่นอยู่แล้ว", "already-linked": "บัญชีนี้เชื่อมกับ Google บัญชีอื่นอยู่แล้ว — ยกเลิกการเชื่อมเดิมก่อน",
    session: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่ก่อนเชื่อม Google",
  };
  const q = new URLSearchParams(location.search), result = q.get("auth");
  window.__cqOpen = q.get("open");   // เปิดหน้าตั้งค่าต่อหลังกลับจาก Google (settings.js อ่านค่านี้)
  if (result) {
    history.replaceState(null, "", location.pathname);   // ล้างพารามิเตอร์ออกจาก URL
    if (result === "google-ok") setTimeout(() => toast("check-circle", "<b>เข้าสู่ระบบด้วย Google แล้ว</b>" + (q.get("new") ? "<br>ยินดีต้อนรับสู่ Code Quest!" : ""), "gold"), 900);
    if (result === "google-linked") setTimeout(() => toast("check-circle", "<b>เชื่อม Google กับบัญชีเรียบร้อย</b>", "gold"), 900);
    if (result === "google-error") setTimeout(() => toast("warning", "<b>" + esc(ERR[q.get("reason")] || ERR.server) + "</b>"), 600);
    if (result === "google-link") setTimeout(() => openLink(q.get("email") || "", q.get("claimable") === "1"), 700);
  }

  // ── เชื่อม Google กับบัญชีเดิม ──
  const linkMsg = (t) => { $("linkMsg").textContent = t || ""; $("linkMsg").className = "form-msg" + (t ? " err" : ""); };
  function openLink(masked, claimable) {
    linkMsg("");
    $("linkSub").innerHTML = "อีเมล <b>" + esc(masked) + "</b> มีบัญชี Code Quest อยู่แล้ว เพื่อความปลอดภัย ระบบจะไม่เชื่อมบัญชีให้อัตโนมัติ — พิสูจน์ว่าบัญชีนี้เป็นของคุณก่อน";
    $("claimBox").classList.toggle("hide", !claimable);
    $("linkOverlay").classList.add("show");
  }
  $("linkWithPassword").onclick = () => {
    $("linkOverlay").classList.remove("show");
    setAuthMode("login");
    const el = $("authErr"); el.textContent = "เข้าสู่ระบบด้วยอีเมลและรหัสผ่านของบัญชีเดิม ระบบจะเชื่อม Google ให้ทันที"; el.className = "form-msg show";
    $("authOverlay").classList.add("show");
  };
  $("linkClaim").onclick = async () => {
    try {
      const d = await api("/api/auth/google/claim", {});
      $("linkOverlay").classList.remove("show");
      applySession(d);
      toast("shield", "<b>ยืนยันความเป็นเจ้าของแล้ว</b><br>เชื่อม Google และปิดรหัสผ่านเดิมเรียบร้อย", "gold");
    } catch (e) { linkMsg(e.message); }
  };
  $("linkCancel").onclick = () => { api("/api/auth/google/link/cancel", {}).catch(() => {}); $("linkOverlay").classList.remove("show"); };
  const applyLinked = applySession;
  applySession = function (data) {
    applyLinked(data);
    if (data && data.linked) toast("check-circle", "<b>เชื่อม Google กับบัญชีของคุณแล้ว</b><br>ครั้งหน้ากด “ดำเนินการต่อด้วย Google” ได้เลย", "gold");
  };

  // ── หน้าต่างยืนยันอีเมล: แสดงอีเมลแบบปิดบางส่วน + เปลี่ยนอีเมล ──
  const openV = window.openVerify;
  window.openVerify = function (justSent) {
    openV(justSent);
    $("changeBox").classList.add("hide");
    const m = state.user && state.user.emailMasked;
    if (m) $("verifySub").innerHTML = (justSent ? "เราส่งรหัส 6 หลักไปที่ <b>" : "รับรหัส 6 หลักทางอีเมล <b>") + esc(m) + "</b>" + (justSent ? " แล้ว (ถ้าไม่เห็น ลองดูในโฟลเดอร์สแปม)" : " โดยกด “ส่งรหัสใหม่”");
    $("verifyChangeOpen").classList.toggle("hide", !(state.user && state.user.hasPassword));
  };
  $("verifyOpen").onclick = () => window.openVerify(false);
  $("verifyChangeOpen").onclick = () => { $("changeBox").classList.toggle("hide"); $("chEmail").focus(); };
  $("chSubmit").onclick = async () => {
    const m = $("verifyMsg");
    try {
      const d = await api("/api/email/change", { email: $("chEmail").value, password: $("chPass").value });
      state.user = Object.assign(state.user, d.user);
      $("chPass").value = "";
      window.openVerify(!!d.sent);
      m.textContent = "เปลี่ยนอีเมลแล้ว" + (d.sent ? " — ส่งรหัสไปที่อีเมลใหม่แล้ว" : ""); m.className = "form-msg ok";
    } catch (e) { m.textContent = e.message; m.className = "form-msg err"; }
  };
})();
