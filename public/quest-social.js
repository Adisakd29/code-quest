/**
 * quest-social.js — ส่วนที่เล่นกับคนอื่น: ห้องแข่ง, กระดานอันดับ, ตัวละคร
 */
(() => {
  const { esc, store, SFX, toast } = QUEST;
  const reduceMotion = () => document.body.classList.contains("reduce-motion") || (!document.body.classList.contains("allow-motion") && window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const AVATARS = ["🧑‍🚀", "👩‍🚀", "👨‍🚀", "🤖", "👾", "🐱", "🦊", "🐼", "🐸", "🦉", "🐙", "🦄"];
  const ACCESSORIES = { "": 1, "🎓": 2, "🪖": 3, "👓": 5, "🎧": 7, "👑": 10, "🚀": 12, "✨": 15 };
  /** ตำแหน่งของตกแต่งแต่ละชิ้นบนตัวละคร (หมวกบนหัว · แว่นที่ตา · หูฟังครอบหัว · จรวด/ประกายข้างตัว) */
  const ACC_SLOT = { "🎓": "acc-hat", "🪖": "acc-hat", "👑": "acc-hat", "👓": "acc-eyes", "🎧": "acc-ears", "🚀": "acc-side", "✨": "acc-corner" };
  /** ตัวละครประจำชื่อ (ใช้กับผู้เล่นที่ยังไม่ได้เลือก) — ชื่อเดียวกันได้ตัวเดิมเสมอ */
  const avatarForName = name => { let h = 0; for (const ch of String(name)) h = (h * 31 + ch.codePointAt(0)) >>> 0; return AVATARS[h % AVATARS.length]; };
  /** แปลงค่า avatar เป็น HTML: "emoji:🦊|👑" / รูปอัปโหลด / ค่าเริ่มต้น */
  function avatarHtml(value, name) {
    if (typeof value === "string" && value.startsWith("emoji:")) {
      const [e, acc] = value.slice(6).split("|");
      // ตัวละคร + ของตกแต่งซ้อนในกล่องเดียวกัน (ตำแหน่งของตกแต่งอ้างอิงตัวละครเสมอ ไม่ว่าอยู่ในกรอบไหน)
      return '<span class="av-stack">' + '<span class="av-emoji">' + esc(e) + "</span>" +
        (acc ? '<span class="av-acc ' + (ACC_SLOT[acc] || "acc-corner") + '" aria-hidden="true">' + esc(acc) + "</span>" : "") + "</span>";
    }
    if (typeof value === "string" && value.startsWith("data:image/")) return '<img alt="" src="' + esc(value) + '">';
    return UIKit.AvatarFallback(name || "?"); // ค่าเริ่มต้น: อักษรแรกของชื่อ ไม่ใช้ emoji
  }
  QUEST.avatarHtml = avatarHtml;

  /* ═══════════ ตัวละครของผู้เล่น ═══════════ */
  renderAvatar = function () {
    const box = $("headAvatar");
    if (!box) return;
    box.innerHTML = state.user ? avatarHtml(state.user.avatar, state.user.name) : UIKit.AppIcon("user", { size: 20 });
  };
  paintPfAvatar = function (src) {
    $("pfAvatar").innerHTML = avatarHtml(src, state.user && state.user.name);
    drawPicker(src);
  };
  function drawPicker(current) {
    const cur = typeof current === "string" && current.startsWith("emoji:") ? current.slice(6).split("|") : [null, ""];
    const lv = state.level || 1;
    const chars = $("cpChars"), accs = $("cpAcc");
    chars.textContent = ""; accs.textContent = "";
    AVATARS.forEach(e => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "cp-item" + (cur[0] === e ? " on" : "");
      b.textContent = e; b.setAttribute("aria-label", "เลือกตัวละคร " + e);
      b.onclick = () => choose(e, cur[1] || "");
      chars.appendChild(b);
    });
    Object.entries(ACCESSORIES).forEach(([a, need]) => {
      const b = document.createElement("button");
      const locked = lv < need;
      b.type = "button"; b.className = "cp-item acc" + ((cur[1] || "") === a && cur[0] ? " on" : "") + (locked ? " locked" : "");
      b.innerHTML = a ? esc(a) : "∅";
      b.title = locked ? "ปลดล็อกที่ LV." + need : (a ? "ของตกแต่ง" : "ไม่ใส่ของตกแต่ง");
      b.setAttribute("aria-label", b.title);
      b.disabled = locked;
      b.onclick = () => choose(cur[0] || AVATARS[0], a);
      if (locked) { const s = document.createElement("small"); s.textContent = "LV." + need; b.appendChild(s); }
      accs.appendChild(b);
    });
  }
  function choose(e, a) {
    pfAvatarPending = "emoji:" + e + (a ? "|" + a : "");
    paintPfAvatar(pfAvatarPending);
  }
  const origProfile = $("profileBtn").onclick;
  $("profileBtn").onclick = () => { origProfile(); if (state.user) drawPicker(state.user.avatar); };

  /* ═══════════ กระดานอันดับ: โพเดียม + รายสัปดาห์/ตลอดกาล ═══════════ */
  let period = "week";
  document.querySelectorAll("#boardSeg button").forEach(b => b.onclick = () => {
    period = b.dataset.period;
    document.querySelectorAll("#boardSeg button").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", String(x === b)); });
    openBoard();
  });
  openBoard = async function () {
    showScreen("board");
    const list = $("boardList"), pod = $("podium");
    list.innerHTML = '<div class="board-skel" aria-busy="true" aria-label="กำลังโหลดตารางอันดับ">' + '<div class="skel-row"></div>'.repeat(5) + "</div>"; pod.textContent = ""; $("myRank").textContent = "";
    try {
      const d = await api("/api/leaderboard?period=" + period);
      list.textContent = "";
      if (!d.top.length) {
        list.innerHTML = '<div class="board-note">' + (period === "week" ? "สัปดาห์นี้ยังไม่มีใครผ่านภารกิจ — เป็นคนแรกที่ขึ้นโพเดียมสิ!" : "ยังไม่มีใครขึ้นกระดาน — สมัครสมาชิกแล้วเป็นคนแรกสิ!") + "</div>";
      }
      // โพเดียม 3 อันดับแรก (เรียง 2-1-3)
      [1, 0, 2].forEach(i => {
        const r = d.top[i]; if (!r) return;
        const el = document.createElement("div");
        el.className = "pod p" + (i + 1) + (r.isMe ? " me" : "");
        el.innerHTML = '<div class="pod-av">' + avatarHtml(r.avatar, r.name) + '</div><div class="pod-name"></div><div class="pod-meta">LV.' + r.level + " · " + fmt(r.totalXp) + ' EXP</div><div class="pod-step">' + UIKit.AppIcon(i === 0 ? "crown" : "medal", { size: 26 }) + "<b>" + (i + 1) + "</b></div>";
        el.setAttribute("aria-label", "อันดับ " + (i + 1) + " " + r.name + " เลเวล " + r.level + " " + r.totalXp + " EXP" + (r.isMe ? " (คุณ)" : ""));
        el.querySelector(".pod-name").textContent = r.name;
        pod.appendChild(el);
      });
      const maxXp = d.top.length ? Math.max(1, d.top[0].totalXp || 1) : 1;
      d.top.slice(3).forEach((r, k) => {
        const i = k + 3, row = document.createElement("div");
        row.className = "brow" + (r.isMe ? " me" : "");
        const pct = Math.max(2, Math.round(((r.totalXp || 0) / maxXp) * 100));
        if (r.isMe) row.setAttribute("aria-current", "true");
        row.innerHTML = '<span class="rk">' + (i + 1) + '</span><span class="b-av">' + avatarHtml(r.avatar, r.name) + '</span><span class="bxp"><span class="bn"></span><span class="bxp-bar"><span class="bxp-fill" style="width:' + pct + '%"></span></span></span><span class="bl pixel">LV.' + r.level + '</span><span class="bs">' + fmt(r.totalXp) + " EXP</span>";
        row.querySelector(".bn").textContent = r.name;
        list.appendChild(row);
      });
      if (d.me) $("myRank").textContent = "อันดับของคุณ" + (period === "week" ? "สัปดาห์นี้" : "") + ": #" + d.me.rank + " · LV." + d.me.level + " · " + fmt(d.me.totalXp) + " EXP";
      else if (!state.user) $("myRank").textContent = "ล็อกอินเพื่อร่วมจัดอันดับกับนักสำรวจคนอื่น";
    } catch (e) {
      list.textContent = "";
      const n = document.createElement("div"); n.className = "board-note err"; n.setAttribute("role", "alert");
      n.innerHTML = UIKit.AppIcon("warning", { size: 20 }) + '<span></span><button type="button" class="mini-btn">' + UIKit.AppIcon("refresh", { size: 16 }) + "<span>ลองใหม่</span></button>";
      n.querySelector("span").textContent = "โหลดตารางอันดับไม่ได้: " + e.message;
      n.querySelector("button").onclick = openBoard;
      list.appendChild(n);
    }
  };
  $("boardBtn").onclick = openBoard;

  /* ═══════════ ห้องแข่ง: สร้างห้องพร้อมการตั้งค่า ═══════════ */
  $("rcCreate").onclick = async () => {
    const langs = Array.from($("rcLangs").querySelectorAll("input:checked")).map(i => i.value);
    const lvls = Array.from($("rcLevels").querySelectorAll("input:checked")).map(i => +i.value);
    if (!langs.length) return roomMsg("เลือกภาษาอย่างน้อย 1 ภาษา", "err");
    if (!lvls.length) return roomMsg("เลือกระดับความยากอย่างน้อย 1 ระดับ", "err");
    try {
      roomMsg("กำลังสร้างห้อง...");
      const data = await api("/api/rooms", {
        name: $("rcName").value, title: $("rcTitle").value || "ห้องแข่งเขียนโค้ด", languages: langs,
        count: parseInt($("rcCount").value) || 10, timeLimit: parseInt($("rcTime").value) || 0, levels: lvls, hints: $("rcHints").checked
      });
      roomMsg("");
      enterRoom(data);
    } catch (e) { roomMsg(e.message, "err"); }
  };

  /* ═══════════ ห้องแข่ง: ล็อบบี้ / แจ้งคนเข้า / นับถอยหลัง / แถบแข่ง ═══════════ */
  let known = new Set(), knownCode = null, countingDown = false;
  const shownCountdown = new Set(store.get("cq_cd_shown", []));
  function runCountdown(done) {
    countingDown = true;
    const cd = $("countdown"), n = $("cdNum");
    cd.classList.remove("hide");
    const seq = ["3", "2", "1", "CODE!"];
    let i = 0;
    const step = () => {
      if (i >= seq.length) { cd.classList.add("hide"); countingDown = false; done(); return; }
      n.textContent = seq[i];
      n.classList.remove("pop"); void n.offsetWidth; if (!reduceMotion()) n.classList.add("pop");
      i === seq.length - 1 ? SFX.go() : SFX.tick();
      i++;
      setTimeout(step, i === seq.length ? 700 : 800);
    };
    step();
  }
  const origRenderRoom = renderRoom;
  renderRoom = function (data) {
    if (countingDown) return;
    room.settings = { hints: data.hints !== false, timeLimit: data.timeLimit || 0, endsAt: data.endsAt, skew: Date.parse(data.serverNow || new Date().toISOString()) - Date.now() };
    // แจ้งเตือนเมื่อมีคนเข้าห้องใหม่
    if (knownCode !== data.code) { knownCode = data.code; known = new Set(data.members.map(m => m.name)); }
    else data.members.forEach(m => { if (!known.has(m.name)) { known.add(m.name); if (!m.isMe) { toast('<span class="t-ico av-toast">' + avatarHtml(m.avatar, m.name) + "</span><div><b>" + esc(m.name) + "</b> เข้าห้องแล้ว</div>"); SFX.join(); } } });
    // เริ่มแข่ง: นับถอยหลังก่อนเข้าโจทย์ข้อแรก (ครั้งเดียวต่อห้อง)
    if (data.status === "playing" && !room.active && !shownCountdown.has(data.code)) {
      shownCountdown.add(data.code); store.set("cq_cd_shown", [...shownCountdown].slice(-20));
      runCountdown(() => origRenderRoom(data));
      return;
    }
    origRenderRoom(data);
    decorateBoard(data);
    const me = data.members.find(m => m.isMe);
    if (me && me.finished && !store.get("cq_racer_" + data.code, false)) {
      store.set("cq_racer_" + data.code, true); QUEST.bumpCounter("racer"); QUEST.checkNewBadges();
    }
    const chip = (ic, txt) => '<span class="info-chip">' + ic + "<span>" + esc(txt) + "</span></span>";
    const langs = (data.languages || []).map(l => UIKit.LanguageIcon(l, { box: 24, logo: 15 })).join("");
    let info = $("rlInfo");
    if (!info) { info = document.createElement("div"); info.id = "rlInfo"; info.className = "info-row"; $("rlMeta").after(info); }
    info.innerHTML =
      chip(UIKit.AppIcon("users", { size: 15 }), data.members.length + " ผู้เล่น") +
      chip(UIKit.AppIcon("checklist", { size: 15 }), data.total + " ข้อ") +
      (langs ? '<span class="info-chip langs" aria-label="ภาษาที่ใช้แข่ง">' + langs + "</span>" : "") +
      chip(UIKit.AppIcon("timer", { size: 15 }), data.timeLimit ? data.timeLimit + " นาที" : "ไม่จำกัดเวลา") +
      chip(UIKit.AppIcon(data.hints === false ? "lock" : "hint", { size: 15 }), data.hints === false ? "ปิดคำใบ้" : "ใช้คำใบ้ได้") +
      chip(UIKit.AppIcon("star", { size: 15 }), "ความยาก " + (data.levels || [1, 2, 3]).map(l => "★".repeat(l)).join(" / "));
    $("rlMeta").textContent = (data.status === "lobby" ? "ล็อบบี้ — รอผู้เล่น" : data.status === "playing" ? "กำลังแข่งขัน" : "จบการแข่งขันแล้ว") + " · โฮสต์: " + data.hostName;
  };
  /** ล็อบบี้ = การ์ดตัวละคร · ระหว่างแข่ง = แถบแข่งรถแสดงความคืบหน้า */
  function decorateBoard(data) {
    const box = $("rlBoard");
    if (data.status === "lobby") {
      box.className = "room-board lobby";
      box.textContent = "";
      data.members.forEach(m => {
        const tile = document.createElement("div");
        tile.className = "lobby-tile" + (m.isMe ? " me" : "");
        tile.innerHTML = '<span class="lt-av">' + avatarHtml(m.avatar, m.name) + '</span><span class="lt-name"></span>' +
          (m.isHost ? '<span class="lt-host">' + UIKit.AppIcon("crown", { size: 13 }) + "โฮสต์</span>" : "") +
          '<span class="status-pill ok sm">' + UIKit.AppIcon("check", { size: 12 }) + "พร้อม</span>" + (m.isMe ? '<span class="lt-you">คุณ</span>' : "");
        tile.setAttribute("aria-label", m.name + (m.isHost ? " (โฮสต์)" : "") + (m.isMe ? " (คุณ)" : "") + " พร้อมแข่ง");
        tile.querySelector(".lt-name").textContent = m.name;
        box.appendChild(tile);
      });
      const wait = document.createElement("div");
      wait.className = "lobby-wait";
      wait.textContent = data.isHost ? "แชร์รหัสห้องให้เพื่อน แล้วกดเริ่มเมื่อพร้อม" : "รอโฮสต์กดเริ่มการแข่งขัน...";
      box.appendChild(wait);
      return;
    }
    box.className = "room-board race";
    Array.from(box.querySelectorAll(".rb-row")).forEach((row, i) => {
      const m = data.members[i]; if (!m) return;
      const av = document.createElement("span"); av.className = "rb-av"; av.innerHTML = avatarHtml(m.avatar, m.name);
      row.insertBefore(av, row.children[1]);
      const bar = document.createElement("span"); bar.className = "rb-track";
      bar.innerHTML = '<i style="width:' + (data.total ? m.solved / data.total * 100 : 0) + '%"></i><b>' + UIKit.AppIcon(m.finished ? "flag" : "rocket", { size: 16 }) + "</b>";
      if (m.isHost) { const hb = document.createElement("span"); hb.className = "lt-host inline"; hb.innerHTML = UIKit.AppIcon("crown", { size: 12 }) + "โฮสต์"; row.querySelector(".rb-name").appendChild(hb); }
      const st = document.createElement("span"); st.className = "status-pill sm " + (m.finished ? "ok" : "run");
      st.textContent = m.finished ? "จบแล้ว" : "ข้อ " + Math.min(m.solved + 1, data.total) + "/" + data.total;
      row.querySelector(".rb-name").appendChild(st);
      bar.querySelector("b").style.left = "calc(" + (data.total ? m.solved / data.total * 100 : 0) + "% - 10px)";
      row.querySelector(".rb-name").appendChild(bar);
    });
  }

  /* ═══════════ นาฬิกานับถอยหลังในแถบแข่ง (อิงเวลาเซิร์ฟเวอร์) ═══════════ */
  setInterval(() => {
    const bar = $("roomBar");
    if (!bar || bar.classList.contains("hide") || !room.active || !room.settings || !room.settings.endsAt) return;
    let t = bar.querySelector(".rb-timer");
    if (!t) { t = document.createElement("span"); t.className = "rb-timer"; bar.insertBefore(t, bar.querySelector("button")); }
    const left = Math.max(0, Date.parse(room.settings.endsAt) - (Date.now() + (room.settings.skew || 0)));
    const m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
    t.innerHTML = UIKit.AppIcon("timer", { size: 15 }) + "<span>" + m + ":" + String(s).padStart(2, "0") + "</span>";
    t.setAttribute("aria-label", "เหลือเวลา " + m + " นาที " + s + " วินาที");
    t.classList.toggle("low", left < 60000);
    if (left === 0) pollRoom();
  }, 1000);
})();
