/*
 * code-lab.js — ห้องเขียนโค้ด Python แบบ Jupyter Notebook (/code)
 *
 * ใช้ในห้องเรียนที่คอมพิวเตอร์ไม่พอ: นักเรียนเปิดบนมือถือ พิมพ์โค้ดทีละเซลล์ กดรัน ครูเดินดูผลลัพธ์ที่โต๊ะ
 * - หลายเซลล์ ตัวแปรอยู่ต่อข้ามเซลล์ (เคอร์เนลเดียว) · [n] ลำดับการรัน · นิพจน์ท้ายเซลล์แสดงเป็น Out[n]
 * - รัน Python จริง (Pyodide) ใน Web Worker (py/nb-worker.js + py/kernel.py) · ไม่ต้องล็อกอิน · โค้ดอยู่ในเครื่องผู้ใช้
 * - input() ถามในเซลล์ · ปุ่มหยุดส่ง KeyboardInterrupt (ตัวแปรไม่หาย) เมื่อหน้าเว็บ cross-origin isolated
 * - ไม่มีแป้นช่วยพิมพ์ ไม่มีคำอธิบาย error — นักเรียนพิมพ์เองและฝึกอ่าน traceback ภาษาอังกฤษเอง (ตามที่ครูขอ)
 *   ช่วยเฉพาะสิ่งที่คีย์บอร์ดมือถือทำผิดเอง: แปลงเครื่องหมายคำพูดโค้ง “ ” ‘ ’ เป็น " ' · ย่อหน้าอัตโนมัติหลัง ":"
 * - เซลล์ Markdown แบบ Jupyter: กดรันเพื่อแสดงผล · แตะเซลล์ที่เลือกอยู่เพื่อแก้ (แปลงด้วย marked · ไม่อนุญาต HTML ดิบ/ลิงก์ javascript:)
 * - ระบายสีโค้ด (syntax highlighting) โทนเดียวกับ Jupyter: ชั้น <pre> สีอยู่ใต้ textarea ที่ตัวอักษรโปร่งใส
 * - บันทึกอัตโนมัติใน localStorage หลายสมุด · ดาวน์โหลด .ipynb (เปิดต่อใน Jupyter ได้) และ .py
 */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const STORE = "cq-notebook-v1", OLD_STORE = "cq-code-lab-v1";
  const OUT_KEEP = 20000;               // เก็บผลลัพธ์ต่อเซลล์ใน localStorage สูงสุดเท่านี้ตัวอักษร
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const newCell = (code, type) => ({ id: uid(), type: type || "code", code: code || "", out: "", err: "", value: null, count: null });
  const isMd = cell => cell.type === "markdown";
  const newBook = (name, cells) => ({ id: uid(), name, cells: cells || [newCell()], updated: Date.now() });

  /* ───────── ที่เก็บสมุดโน้ต (localStorage อาจใช้ไม่ได้ในโหมดส่วนตัว → ใช้งานได้แต่ไม่บันทึก) ───────── */
  let db = null;
  try { db = JSON.parse(localStorage.getItem(STORE) || "null"); } catch (e) { db = null; }
  if (!db || !Array.isArray(db.books) || !db.books.length) {
    db = { books: [], current: null, font: 16 };
    // ย้ายโปรแกรมจากห้องเขียนโค้ดแบบเดิม (ช่องเดียว) มาเป็นสมุด 1 เซลล์ — งานเดิมของนักเรียนไม่หาย
    try {
      const old = JSON.parse(localStorage.getItem(OLD_STORE) || "null");
      if (old && Array.isArray(old.files)) old.files.forEach(f => db.books.push(Object.assign(newBook(f.name, [newCell(f.code)]), { updated: f.updated || Date.now() })));
      if (old && old.font) db.font = old.font;
    } catch (e) { /* ไม่มีของเดิม */ }
    if (!db.books.length) db.books.push(newBook("สมุดที่ 1", [newCell('print("Hello Python")'), newCell("")]));
    db.current = db.books[0].id;
  }
  let book = db.books.find(b => b.id === db.current) || db.books[0];
  let saveTimer = null;
  function persist() {
    try { localStorage.setItem(STORE, JSON.stringify(db)); } catch (e) { setStatus("บันทึกในเครื่องไม่ได้ (โหมดส่วนตัว?)", "bad"); }
  }
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(() => { book.updated = Date.now(); persist(); }, 400); }
  window.addEventListener("pagehide", () => { clearTimeout(saveTimer); persist(); });

  /* ───────── สถานะ ───────── */
  const statusEl = $("status");
  function setStatus(text, kind) { statusEl.textContent = text; statusEl.className = "nb-status" + (kind ? " " + kind : ""); }

  /* ───────── ขนาดตัวอักษร ───────── */
  function applyFont() {
    db.font = Math.max(12, Math.min(26, db.font || 16));
    document.documentElement.style.setProperty("--code-fs", db.font + "px");
    document.querySelectorAll(".cell-code").forEach(grow);
  }

  /* ═══════════════ เคอร์เนล ═══════════════ */
  const K = { worker: null, ready: null, isolated: false, ctl: null, data: null, intr: null, count: 0, waitingInput: false };
  let current = null;         // งานที่กำลังรัน { cell, id, replay, resolve }
  let seq = 0;
  const queue = [];

  function startKernel() {
    const w = new Worker("/py/nb-worker.js");
    K.worker = w; K.count = 0;
    const iso = typeof SharedArrayBuffer !== "undefined" && self.crossOriginIsolated === true;
    const boot = { type: "boot" };
    if (iso) {
      K.ctl = new Int32Array(new SharedArrayBuffer(8));
      K.data = new Uint8Array(new SharedArrayBuffer(1 << 16));
      K.intr = new Uint8Array(new SharedArrayBuffer(1));
      Object.assign(boot, { ctl: K.ctl.buffer, data: K.data.buffer, intr: K.intr.buffer });
    } else { K.ctl = K.data = K.intr = null; }
    setStatus("กำลังเตรียม Python… (ครั้งแรกอาจใช้เวลาครู่หนึ่ง พิมพ์โค้ดรอได้เลย)", "wait");
    K.ready = fetch("/api/pyodide-version").then(r => r.json()).then(v => new Promise((resolve, reject) => {
      boot.ver = v.version;
      const onMsg = ({ data }) => {
        if (data.type === "ready") { w.removeEventListener("message", onMsg); K.isolated = data.isolated; setStatus("Python พร้อม", "ok"); resolve(); }
        else if (data.type === "fatal") { w.removeEventListener("message", onMsg); reject(new Error(data.error)); }
      };
      w.addEventListener("message", onMsg);
      w.postMessage(boot);
    }));
    K.ready.catch(() => { setStatus("โหลด Python ไม่สำเร็จ — ตรวจอินเทอร์เน็ตแล้วกด ⋯ → รีสตาร์ตเคอร์เนล", "bad"); });
    w.addEventListener("message", onKernelMessage);
    w.addEventListener("error", () => { if (K.worker === w) setStatus("เคอร์เนลหยุดทำงาน — กด ⋯ → รีสตาร์ตเคอร์เนล", "bad"); });
  }

  function restartKernel(reason) {
    if (K.worker) K.worker.terminate();
    if (current) { const c = current; current = null; finishCell(c, { status: "error", error_type: "Restart", error: "" }, true); }
    queue.length = 0;
    startKernel();
    book.cells.forEach(c => { c.count = null; });
    renderAll();
    if (reason) setStatus(reason, "wait");
  }

  function onKernelMessage({ data }) {
    if (!current || data.id !== current.id) return;
    const v = viewOf(current.cell);
    if (data.type === "stream") {
      if (data.name === "stderr") current.cell.err += data.text; else current.cell.out += data.text;
      appendOut(v, data.text, data.name === "stderr");
    } else if (data.type === "input") {
      K.waitingInput = true;
      showAsk(v, data.prompt);
    } else if (data.type === "done") {
      if (K.intr) K.intr[0] = 0;   // ล้างคำขอหยุดที่ค้าง (โค้ดจบก่อนเคอร์เนลเห็น)
      const c = current; current = null;
      finishCell(c, data.result);
      pump();
    }
  }

  /** เข้าคิวรันเซลล์ (รันทีละเซลล์ตามลำดับ เหมือน Jupyter) */
  function runCell(cell) {
    if (isMd(cell)) { renderMd(cell); return; }
    if (queue.includes(cell) || (current && current.cell === cell)) return;
    queue.push(cell);
    const v = viewOf(cell);
    if (v) v.label.textContent = "[*]:";
    pump();
    updateRunBtn();
  }
  async function pump() {
    if (current || !queue.length) { updateRunBtn(); return; }
    const cell = queue.shift();
    current = { cell, id: ++seq, replay: [] };
    try { await K.ready; } catch (e) { const c = current; current = null; finishCell(c, { status: "error", error_type: "LoadError", error: "Python ยังไม่พร้อม\n" }); queue.length = 0; return; }
    cell.count = ++K.count;
    send(current);
    updateRunBtn();
  }
  function send(job) {
    const cell = job.cell, v = viewOf(cell);
    cell.out = ""; cell.err = ""; cell.value = null;
    if (v) { v.out.textContent = ""; v.value.classList.add("hide"); v.ask.classList.add("hide"); v.outBox.classList.remove("hide"); v.label.textContent = "[*]:"; }
    setStatus("กำลังรัน…", "wait");
    K.worker.postMessage({ type: "run", id: job.id, code: cell.code, count: cell.count, replay: K.isolated ? null : job.replay });
  }

  function finishCell(job, r, silent) {
    const cell = job.cell, v = viewOf(cell);
    K.waitingInput = false;
    if (r.status === "need_input") {
      // โหมดสำรอง (ไม่มี SharedArrayBuffer): ถามคำตอบ แล้วรันเซลล์เดิมใหม่พร้อมคำตอบที่สะสม
      current = job;
      K.waitingInput = true;
      showAsk(v, r.prompt, true);
      setStatus("รอคำตอบของ input()", "wait");
      return;
    }
    if (r.status === "error" && r.error) {
      cell.err += r.error;
      if (v) appendOut(v, r.error, true);
    }
    if (r.value != null) cell.value = r.value;
    if (v) {
      v.ask.classList.add("hide");
      v.label.textContent = cell.count ? "[" + cell.count + "]:" : "[ ]:";
      if (cell.value != null) { v.valueLabel.textContent = "Out[" + cell.count + "]:"; v.valueText.textContent = cell.value; v.value.classList.remove("hide"); }
      v.outBox.classList.toggle("hide", !cell.out && !cell.err && cell.value == null);
    }
    trimForStorage(cell);
    scheduleSave();
    if (!silent) setStatus(r.status === "error" ? (r.error_type === "KeyboardInterrupt" ? "หยุดแล้ว (KeyboardInterrupt)" : "มี error ในเซลล์ [" + cell.count + "]") : "Python พร้อม", r.status === "error" ? "bad" : "ok");
    updateRunBtn();
  }
  function trimForStorage(cell) {
    if (cell.out.length > OUT_KEEP) cell.out = cell.out.slice(0, OUT_KEEP) + "\n…";
    if (cell.err.length > OUT_KEEP) cell.err = cell.err.slice(0, OUT_KEEP) + "\n…";
  }

  function stop() {
    queue.length = 0;
    if (!current) { updateRunBtn(); return; }
    if (K.isolated) {
      if (K.waitingInput) { Atomics.store(K.ctl, 0, 2); Atomics.notify(K.ctl, 0); }
      else K.intr[0] = 2;   // SIGINT → KeyboardInterrupt ในเคอร์เนล ตัวแปรยังอยู่
    } else if (K.waitingInput && current) {
      const c = current; current = null;
      finishCell(c, { status: "error", error_type: "KeyboardInterrupt", error: "KeyboardInterrupt\n" });
    } else {
      restartKernel("หยุดแล้ว — เบราว์เซอร์นี้หยุดได้ด้วยการรีสตาร์ตเคอร์เนลเท่านั้น ตัวแปรเดิมหายหมด ต้องรันเซลล์ก่อนหน้าใหม่");
    }
  }

  function submitAnswer(v, text) {
    if (!current || !K.waitingInput) return;
    text = text.replace(SMART, SMART_MAP);
    K.waitingInput = false;
    v.ask.classList.add("hide");
    if (K.isolated) {
      appendOut(v, text + "\n");
      current.cell.out += text + "\n";
      const bytes = new TextEncoder().encode(text).slice(0, K.data.length);
      K.data.set(bytes);
      Atomics.store(K.ctl, 1, bytes.length);
      Atomics.store(K.ctl, 0, 1);
      Atomics.notify(K.ctl, 0);
      setStatus("กำลังรัน…", "wait");
    } else {
      current.replay.push(text);
      send(current);
    }
  }

  /* ═══════════════ เซลล์ ═══════════════ */
  const list = $("cells");
  const views = new Map();   // cell.id → องค์ประกอบของเซลล์
  let active = null;
  const viewOf = cell => views.get(cell.id);

  // คีย์บอร์ดมือถือ (โดยเฉพาะ iPhone) ใส่เครื่องหมายคำพูดโค้งเอง → Python อ่านไม่ออก · แทนที่แบบตัวต่อตัว เคอร์เซอร์ไม่เลื่อน
  const SMART = /[“”„‟″‶＂‘’‚‛′‵＇]/g;
  const SMART_MAP = c => ("“”„‟″‶＂".includes(c) ? '"' : "'");

  /* ───────── ระบายสีโค้ด Python (โทนเดียวกับ Jupyter) ───────── */
  const PY_KW = new Set("and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case".split(" "));
  const PY_CONST = new Set(["True", "False", "None"]);
  const PY_BUILTIN = new Set(("print input int float str bool len range list dict set tuple type isinstance sum min max abs round sorted reversed enumerate zip map filter " +
    "open any all chr ord hex bin oct divmod pow format repr id hash iter next super object property staticmethod classmethod getattr setattr hasattr " +
    "Exception ValueError TypeError ZeroDivisionError IndexError KeyError NameError AttributeError RuntimeError StopIteration self").split(" "));
  // 1 คอมเมนต์ · 2 สตริง (มี prefix f/r/b ได้ · สามอัญประกาศ · ยังไม่ปิดก็ระบายถึงท้ายบรรทัด) · 3 ตัวเลข · 4 decorator · 5 ชื่อ (รวมภาษาไทย) · 6 ตัวดำเนินการ
  const TOKEN = /(#[^\n]*)|((?:[rRbBuUfF]{1,2})?(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?))|(\b(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?j?)|\.\d+(?:[eE][+-]?\d+)?j?)|(@[A-Za-z_][\w.]*)|([A-Za-z_฀-๿][\w฀-๿]*)|(:=|[-+*/%=<>!&|^~]+)/g;
  function highlightPy(src) {
    let out = "", last = 0, m, prevWord = "";
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src))) {
      if (m[0] === "") { TOKEN.lastIndex++; continue; }
      out += esc(src.slice(last, m.index));
      let cls = "";
      if (m[1]) cls = "hl-com";
      else if (m[2]) cls = "hl-str";
      else if (m[3]) cls = "hl-num";
      else if (m[4]) cls = "hl-dec";
      else if (m[5]) {
        const w = m[5];
        if (prevWord === "def") cls = "hl-def";
        else if (prevWord === "class") cls = "hl-cls";
        else if (PY_KW.has(w)) cls = "hl-kw";
        else if (PY_CONST.has(w)) cls = "hl-const";
        else if (PY_BUILTIN.has(w)) cls = "hl-bi";
      } else if (m[6]) cls = "hl-op";
      prevWord = m[5] || "";
      out += cls ? '<span class="' + cls + '">' + esc(m[0]) + "</span>" : esc(m[0]);
      last = TOKEN.lastIndex;
    }
    return out + esc(src.slice(last)) + "\n";   // \n ท้ายสุด: บรรทัดว่างบรรทัดสุดท้ายสูงเท่า textarea
  }

  function grow(ta) {
    ta.style.height = "auto";
    // บรรทัดยาวเลื่อนแนวนอนในช่องโค้ด · เผื่อความสูงของแถบเลื่อน (คอมพิวเตอร์) ไม่ให้บังบรรทัดสุดท้าย
    ta.style.height = (ta.scrollHeight + (ta.offsetHeight - ta.clientHeight)) + "px";
    const hl = ta.parentNode.querySelector(".cell-hl");
    if (hl && !ta.closest(".cell.md")) { hl.innerHTML = highlightPy(ta.value); hl.scrollLeft = ta.scrollLeft; }
    const g = ta.closest(".cell-editor").querySelector(".cell-gutter");
    const n = ta.value.split("\n").length;
    if (g && g.dataset.n !== String(n)) { g.dataset.n = n; g.textContent = Array.from({ length: n }, (_, i) => i + 1).join("\n"); }
  }
  function insertText(ta, text) {
    // execCommand คงประวัติ undo ของเบราว์เซอร์ไว้ · ใช้ setRangeText เมื่อไม่รองรับ
    if (!document.execCommand || !document.execCommand("insertText", false, text)) {
      ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, "end");
    }
  }

  function buildCell(cell) {
    const el = document.createElement("div");
    el.className = "cell";
    el.innerHTML =
      '<div class="cell-label" aria-hidden="true">[ ]:</div>' +
      '<div class="cell-main">' +
        '<div class="cell-editor"><pre class="cell-gutter" aria-hidden="true">1</pre><div class="code-wrap"><pre class="cell-hl" aria-hidden="true"></pre>' +
          '<textarea class="cell-code" rows="1" wrap="off" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-label="โค้ดในเซลล์"></textarea></div></div>' +
        '<div class="md-render hide"></div>' +
        '<div class="cell-tools">' +
          '<button class="ct-run" type="button" aria-label="รันเซลล์นี้">' + ICON_PLAY + "<span>รัน</span></button>" +
          '<button class="ct-add" type="button" aria-label="เพิ่มเซลล์ด้านล่าง">+ เซลล์</button>' +
          '<button class="ct-dup" type="button" aria-label="ทำซ้ำเซลล์ (duplicate)" title="ทำซ้ำเซลล์">' + ICON_COPY + "</button>" +
          '<button class="ct-type" type="button"></button>' +
          '<span class="ct-gap"></span>' +
          '<button class="ct-up" type="button" aria-label="เลื่อนเซลล์ขึ้น">↑</button>' +
          '<button class="ct-down" type="button" aria-label="เลื่อนเซลล์ลง">↓</button>' +
          '<button class="ct-del" type="button" aria-label="ลบเซลล์">ลบ</button>' +
        "</div>" +
        '<div class="cell-out hide">' +
          '<pre class="out-text"></pre>' +
          '<form class="cell-ask hide" autocomplete="off"><span class="ask-prompt"></span>' +
            '<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="send" aria-label="คำตอบของ input()">' +
            '<button type="submit">ส่ง</button></form>' +
          '<div class="out-value hide"><span class="out-value-label"></span><pre class="out-value-text"></pre></div>' +
        "</div>" +
      "</div>";
    const v = {
      el, ta: el.querySelector(".cell-code"), label: el.querySelector(".cell-label"), outBox: el.querySelector(".cell-out"),
      out: el.querySelector(".out-text"), ask: el.querySelector(".cell-ask"), askPrompt: el.querySelector(".ask-prompt"),
      askInput: el.querySelector(".cell-ask input"), value: el.querySelector(".out-value"),
      valueLabel: el.querySelector(".out-value-label"), valueText: el.querySelector(".out-value-text"),
      editor: el.querySelector(".cell-editor"), md: el.querySelector(".md-render"), typeBtn: el.querySelector(".ct-type"),
    };
    views.set(cell.id, v);
    v.ta.value = cell.code;
    v.label.textContent = cell.count ? "[" + cell.count + "]:" : "[ ]:";
    if (cell.out) v.out.appendChild(document.createTextNode(cell.out));
    if (cell.err) { const s = document.createElement("span"); s.className = "out-err"; s.textContent = cell.err; v.out.appendChild(s); }
    if (cell.value != null) { v.valueLabel.textContent = "Out[" + (cell.count || " ") + "]:"; v.valueText.textContent = cell.value; v.value.classList.remove("hide"); }
    v.outBox.classList.toggle("hide", !cell.out && !cell.err && cell.value == null);
    applyType(cell, v);
    if (isMd(cell) && cell.code.trim()) renderMd(cell, true);

    v.ta.addEventListener("focus", () => setActive(cell));
    const hlEl = v.el.querySelector(".cell-hl");
    v.ta.addEventListener("blur", () => { v.ta.scrollLeft = 0; hlEl.scrollLeft = 0; });
    v.ta.addEventListener("scroll", () => { hlEl.scrollLeft = v.ta.scrollLeft; });   // เลิกพิมพ์แล้วให้เห็นต้นบรรทัดเสมอ (ครูเดินดูอ่านง่าย)
    el.addEventListener("pointerdown", () => setActive(cell));
    v.ta.addEventListener("input", e => {
      const ta = v.ta;
      if (isMd(cell)) { cell.code = ta.value; grow(ta); scheduleSave(); return; }   // Markdown: พิมพ์อิสระ ไม่แปลงอะไร
      if (SMART.test(ta.value)) {
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.replace(SMART, SMART_MAP);
        ta.setSelectionRange(s, en);
      }
      SMART.lastIndex = 0;
      // ย่อหน้าอัตโนมัติ: บรรทัดใหม่ใช้ย่อหน้าเดียวกับบรรทัดก่อน (+4 ถ้าบรรทัดก่อนจบด้วย ":")
      const p = ta.selectionStart;
      if ((e.inputType === "insertLineBreak" || e.inputType === "insertParagraph") && p === ta.selectionEnd && ta.value[p - 1] === "\n") {
        const prev = ta.value.slice(ta.value.lastIndexOf("\n", p - 2) + 1, p - 1);
        let ind = /^[ \t]*/.exec(prev)[0];
        if (/:\s*(#.*)?$/.test(prev)) ind += "    ";
        if (ind) insertText(ta, ind);
      }
      cell.code = ta.value;
      grow(ta);
      scheduleSave();
    });
    v.ta.addEventListener("keydown", e => {
      if (e.key === "Enter" && e.shiftKey) { e.preventDefault(); runAndAdvance(cell); }
      else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runCell(cell); }
      else if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); insertText(v.ta, "    "); }
    });
    el.querySelector(".ct-run").onclick = () => { v.ta.blur(); runCell(cell); };
    el.querySelector(".ct-add").onclick = () => addCellAfter(cell, true);
    el.querySelector(".ct-dup").onclick = () => duplicateCell(cell);
    el.querySelector(".ct-up").onclick = () => moveCell(cell, -1);
    el.querySelector(".ct-down").onclick = () => moveCell(cell, 1);
    el.querySelector(".ct-del").onclick = () => deleteCell(cell);
    v.typeBtn.onclick = () => setType(cell, isMd(cell) ? "code" : "markdown");
    // Markdown ที่แสดงผลแล้ว: แตะครั้งแรกเลือกเซลล์ แตะซ้ำ (หรือดับเบิลคลิก) เพื่อแก้ไข — ลิงก์ในข้อความยังกดได้ตามปกติ
    let wasActive = false;
    v.md.addEventListener("pointerdown", () => { wasActive = active === cell; });
    v.md.addEventListener("click", e => { if (!e.target.closest("a") && wasActive) editMd(cell); });
    v.md.addEventListener("dblclick", () => editMd(cell));
    v.ask.addEventListener("submit", e => { e.preventDefault(); submitAnswer(v, v.askInput.value); });
    return v;
  }

  /* ───────── Markdown ───────── */
  const mdEsc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  if (window.marked) {
    window.marked.use({
      gfm: true,
      renderer: {
        html(token) { return mdEsc(token.text || token.raw || ""); },                         // HTML ดิบแสดงเป็นตัวอักษร
        link(token) {
          const text = this.parser.parseInline(token.tokens);
          return /^(https?:|mailto:|#)/i.test(token.href || "") ? '<a href="' + mdEsc(token.href) + '" target="_blank" rel="noopener noreferrer">' + text + "</a>" : text;
        },
        image(token) {
          return /^https?:/i.test(token.href || "") ? '<img src="' + mdEsc(token.href) + '" alt="' + mdEsc(token.text || "") + '" loading="lazy" crossorigin="anonymous">' : mdEsc(token.text || "");
        },
      },
    });
  }
  const mdToHtml = src => (window.marked ? window.marked.parse(src) : "<pre>" + mdEsc(src) + "</pre>");
  function applyType(cell, v) {
    const md = isMd(cell);
    v.el.classList.toggle("md", md);
    v.ta.setAttribute("wrap", md ? "soft" : "off");
    v.ta.setAttribute("aria-label", md ? "ข้อความ Markdown ในเซลล์" : "โค้ดในเซลล์");
    v.ta.setAttribute("spellcheck", "false");
    v.typeBtn.textContent = md ? "Markdown" : "Code";
    v.typeBtn.setAttribute("aria-label", md ? "ชนิดเซลล์: Markdown (แตะเพื่อเปลี่ยนเป็นโค้ด)" : "ชนิดเซลล์: Code (แตะเพื่อเปลี่ยนเป็น Markdown)");
    if (md) { v.label.textContent = ""; v.outBox.classList.add("hide"); }
    else { v.label.textContent = cell.count ? "[" + cell.count + "]:" : "[ ]:"; v.md.classList.add("hide"); v.editor.classList.remove("hide"); }
  }
  function renderMd(cell, quiet) {
    const v = viewOf(cell); if (!v) return;
    if (!cell.code.trim()) { editMd(cell, quiet); return; }
    v.md.innerHTML = mdToHtml(cell.code);
    v.md.classList.remove("hide");
    v.editor.classList.add("hide");
    v.el.classList.add("rendered");
  }
  function editMd(cell, quiet) {
    const v = viewOf(cell); if (!v) return;
    v.md.classList.add("hide");
    v.editor.classList.remove("hide");
    v.el.classList.remove("rendered");
    grow(v.ta);
    if (!quiet) { setActive(cell); v.ta.focus({ preventScroll: true }); }
  }
  function setType(cell, type) {
    if (cell.type === type) return;
    if (current && current.cell === cell) return;
    const qi = queue.indexOf(cell); if (qi >= 0) queue.splice(qi, 1);
    cell.type = type;
    cell.out = ""; cell.err = ""; cell.value = null; cell.count = null;
    const v = viewOf(cell);
    v.out.textContent = ""; v.value.classList.add("hide"); v.outBox.classList.add("hide"); v.el.classList.remove("rendered");
    applyType(cell, v);
    grow(v.ta);
    scheduleSave();
  }

  function appendOut(v, text, isErr) {
    if (!v) return;
    v.outBox.classList.remove("hide");
    if (isErr) { const s = document.createElement("span"); s.className = "out-err"; s.textContent = text; v.out.appendChild(s); }
    else {
      const last = v.out.lastChild;
      if (last && last.nodeType === 3) last.appendData(text); else v.out.appendChild(document.createTextNode(text));
    }
  }
  function showAsk(v, prompt, fallback) {
    if (!v) return;
    v.outBox.classList.remove("hide");
    if (!fallback) { appendOut(v, prompt); if (current) current.cell.out += prompt; }
    v.askPrompt.textContent = "";
    v.askInput.value = "";
    v.ask.classList.remove("hide");
    setStatus("รอคำตอบของ input()", "wait");
    setTimeout(() => { v.askInput.focus({ preventScroll: true }); v.ask.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, 30);
  }

  function setActive(cell) {
    if (active === cell) return;
    // แถบปุ่มแสดงเฉพาะเซลล์ที่เลือก · ถ้าซ่อนแถบปุ่มของเซลล์เดิม (ที่อยู่ด้านบน) ทันที เนื้อหาจะเลื่อนขึ้นระหว่างนิ้วแตะ
    // แล้ว click ไปโดนปุ่มที่เลื่อนมาแทน → ค้างแถบปุ่มเดิมไว้ครู่หนึ่ง แล้วค่อยซ่อนพร้อมชดเชย scroll
    const old = active && viewOf(active);
    if (old) { old.el.classList.remove("active"); old.el.classList.add("hold"); }
    active = cell;
    const v = viewOf(cell);
    if (v) v.el.classList.add("active");
    if (old) setTimeout(() => {
      if (!old.el.classList.contains("hold")) return;
      const anchor = active && viewOf(active), before = anchor ? anchor.el.getBoundingClientRect().top : 0;
      old.el.classList.remove("hold");
      if (anchor) { const shift = anchor.el.getBoundingClientRect().top - before; if (shift) list.scrollTop += shift; }
    }, 450);
  }
  function renderAll() {
    list.innerHTML = ""; views.clear();
    book.cells.forEach(c => list.appendChild(buildCell(c).el));
    requestAnimationFrame(() => document.querySelectorAll(".cell-code").forEach(grow));
    const a = book.cells.includes(active) ? active : book.cells[0];
    active = null; setActive(a);
    $("bookName").textContent = book.name;
  }
  function addCellAfter(cell, focus, copy) {
    const c = copy || newCell("");
    const i = book.cells.indexOf(cell);
    book.cells.splice(i + 1, 0, c);
    const v = buildCell(c);
    const ref = viewOf(cell);
    if (ref && ref.el.nextSibling) list.insertBefore(v.el, ref.el.nextSibling); else list.appendChild(v.el);
    grow(v.ta);
    setActive(c);
    if (copy) v.el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (focus) { v.ta.focus({ preventScroll: true }); v.el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    scheduleSave();
    return c;
  }
  /** ทำซ้ำเซลล์: คัดลอกโค้ด/ข้อความและชนิดเซลล์ไว้ใต้เซลล์เดิม (ไม่คัดลอกผลลัพธ์ — ยังไม่ได้รัน) */
  function duplicateCell(cell) {
    const v = viewOf(cell);
    const copy = newCell(cell.code, cell.type);
    addCellAfter(cell, false, copy);
    if (isMd(copy) && v && v.el.classList.contains("rendered")) renderMd(copy, true);
  }
  function moveCell(cell, d) {
    const i = book.cells.indexOf(cell), j = i + d;
    if (j < 0 || j >= book.cells.length) return;
    book.cells.splice(i, 1); book.cells.splice(j, 0, cell);
    const v = viewOf(cell), other = viewOf(book.cells[d < 0 ? j + 1 : j - 1]);
    if (d < 0) list.insertBefore(v.el, other.el); else list.insertBefore(v.el, other.el.nextSibling);
    v.el.scrollIntoView({ block: "nearest" });
    scheduleSave();
  }
  function deleteCell(cell) {
    if (current && current.cell === cell) return;
    if (cell.code.trim() && !confirm("ลบเซลล์นี้?")) return;
    const i = book.cells.indexOf(cell);
    book.cells.splice(i, 1);
    const qi = queue.indexOf(cell); if (qi >= 0) queue.splice(qi, 1);
    viewOf(cell).el.remove(); views.delete(cell.id);
    if (!book.cells.length) { book.cells.push(newCell("")); list.appendChild(buildCell(book.cells[0]).el); }
    active = null;
    setActive(book.cells[Math.min(i, book.cells.length - 1)]);
    scheduleSave();
  }
  /** เหมือน Shift+Enter ใน Jupyter: รันเซลล์นี้แล้วไปเซลล์ถัดไป (ถ้าเป็นเซลล์สุดท้ายสร้างเซลล์ใหม่) */
  function runAndAdvance(cell) {
    runCell(cell);
    const i = book.cells.indexOf(cell);
    const next = book.cells[i + 1];
    if (next) { setActive(next); viewOf(next).el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    else addCellAfter(cell, false);
  }

  /* ───────── ปุ่มรัน/หยุดด้านบน ───────── */
  const runBtn = $("runBtn");
  const busy = () => !!current || queue.length > 0;
  function updateRunBtn() {
    const b = busy();
    runBtn.classList.toggle("stop", b);
    runBtn.querySelector("span").textContent = b ? "หยุด" : "รัน";
    runBtn.setAttribute("aria-label", b ? "หยุดเซลล์ที่กำลังรัน" : "รันเซลล์ที่เลือกแล้วไปเซลล์ถัดไป");
  }
  runBtn.addEventListener("pointerdown", e => { if (document.activeElement && document.activeElement.classList.contains("cell-code")) e.preventDefault(); });
  runBtn.onclick = () => {
    if (busy()) { stop(); return; }
    if (document.activeElement) document.activeElement.blur();
    runAndAdvance(active || book.cells[0]);
  };

  /* ───────── เมนู ───────── */
  const sheet = $("sheet");
  function renderBooks() {
    const ul = $("bookList"); ul.innerHTML = "";
    db.books.slice().sort((a, b) => b.updated - a.updated).forEach(b => {
      const li = document.createElement("li");
      li.className = "nb-book" + (b.id === book.id ? " on" : "");
      const open = document.createElement("button");
      open.className = "nb-book-open";
      open.innerHTML = "<b>" + esc(b.name) + "</b><small>" + b.cells.length + " เซลล์ · " + new Date(b.updated).toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" }) + "</small>";
      open.onclick = () => { openBook(b); closeSheet(); };
      li.appendChild(open);
      if (db.books.length > 1) {
        const del = document.createElement("button");
        del.className = "nb-book-del"; del.textContent = "ลบ"; del.setAttribute("aria-label", "ลบ " + b.name);
        del.onclick = () => {
          if (!confirm('ลบสมุด "' + b.name + '"? กู้คืนไม่ได้')) return;
          db.books = db.books.filter(x => x.id !== b.id);
          if (b.id === book.id) openBook(db.books[0]);
          persist(); renderBooks();
        };
        li.appendChild(del);
      }
      ul.appendChild(li);
    });
  }
  function openBook(b) {
    persist();
    book = b; db.current = b.id;
    restartKernel("เปิดสมุด \"" + b.name + "\" — เคอร์เนลเริ่มใหม่");
    persist();
  }
  function openSheet() { persist(); renderBooks(); sheet.classList.remove("hide"); $("sheetClose").focus(); }
  function closeSheet() { sheet.classList.add("hide"); $("menuBtn").focus(); }
  $("menuBtn").onclick = openSheet;
  $("sheetClose").onclick = closeSheet;
  sheet.addEventListener("click", e => { if (e.target === sheet) closeSheet(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !sheet.classList.contains("hide")) closeSheet(); });

  $("newBookBtn").onclick = () => {
    let n = db.books.length + 1;
    while (db.books.some(b => b.name === "สมุดที่ " + n)) n++;
    const b = newBook("สมุดที่ " + n);
    db.books.push(b); openBook(b); closeSheet();
  };
  $("renameBtn").onclick = () => {
    const name = (prompt("ชื่อสมุด", book.name) || "").trim().slice(0, 40);
    if (!name) return;
    book.name = name; $("bookName").textContent = name; persist(); renderBooks();
  };
  $("runAllBtn").onclick = () => { closeSheet(); book.cells.forEach(runCell); };
  $("restartBtn").onclick = () => { closeSheet(); restartKernel("รีสตาร์ตเคอร์เนลแล้ว — ตัวแปรทั้งหมดถูกล้าง"); };
  $("clearBtn").onclick = () => {
    closeSheet();
    book.cells.forEach(c => { c.out = ""; c.err = ""; c.value = null; if (!busy()) c.count = null; });
    renderAll(); scheduleSave();
  };
  $("zoomIn").onclick = () => { db.font += 2; applyFont(); persist(); };
  $("zoomOut").onclick = () => { db.font -= 2; applyFont(); persist(); };
  const fileSafe = () => (book.name.replace(/[\\/:*?"<>|]+/g, "_") || "notebook");
  function download(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  // .ipynb (nbformat 4) — นักเรียนเอาไปเปิดต่อใน Jupyter / Google Colab ได้
  $("ipynbBtn").onclick = () => {
    const lines = s => s.split("\n").map((l, i, a) => (i < a.length - 1 ? l + "\n" : l)).filter((l, i, a) => !(i === a.length - 1 && l === ""));
    const nb = {
      nbformat: 4, nbformat_minor: 5,
      metadata: { kernelspec: { name: "python3", display_name: "Python 3", language: "python" }, language_info: { name: "python" } },
      cells: book.cells.map(c => {
        const outputs = [];
        if (c.out) outputs.push({ output_type: "stream", name: "stdout", text: lines(c.out) });
        if (c.err) outputs.push({ output_type: "stream", name: "stderr", text: lines(c.err) });
        if (c.value != null) outputs.push({ output_type: "execute_result", execution_count: c.count, metadata: {}, data: { "text/plain": lines(c.value) } });
        if (isMd(c)) return { cell_type: "markdown", id: c.id.slice(0, 12), metadata: {}, source: lines(c.code) };
        return { cell_type: "code", id: c.id.slice(0, 12), metadata: {}, execution_count: c.count, source: lines(c.code), outputs };
      }),
    };
    download(fileSafe() + ".ipynb", JSON.stringify(nb, null, 1), "application/x-ipynb+json");
  };
  $("pyBtn").onclick = () => download(fileSafe() + ".py", book.cells.map(c => isMd(c) ? "# %% [markdown]\n" + c.code.replace(/\s+$/, "").split("\n").map(l => ("# " + l).trimEnd()).join("\n") : "# %%\n" + c.code.replace(/\s+$/, "")).join("\n\n") + "\n", "text/x-python");

  // ความสูงของหน้าจอที่เห็นจริง (คีย์บอร์ดมือถือบังส่วนล่าง)
  function fitViewport() {
    const vv = window.visualViewport;
    document.documentElement.style.setProperty("--vvh", (vv ? vv.height : window.innerHeight) + "px");
  }
  if (window.visualViewport) visualViewport.addEventListener("resize", fitViewport);
  window.addEventListener("resize", fitViewport);
  fitViewport();

  /* ───────── เริ่มต้น ───────── */
  const ICON_PLAY = $("iconPlay").innerHTML;
  const ICON_COPY = $("iconCopy").innerHTML;
  applyFont();
  renderAll();
  startKernel();
  window.__notebook = { book: () => book, runCell, K };
})();
