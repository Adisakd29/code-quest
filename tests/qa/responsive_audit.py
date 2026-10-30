"""
Responsive QA audit ของ Code Quest (Playwright + Python)

รัน:  BASE=http://localhost:3000 OUT=/tmp/qa-before python3 tests/qa/responsive_audit.py
ผลลัพธ์: OUT/report.json + screenshots ของทุก viewport

ตรวจทุกหน้าใน flow ตั้งแต่ Landing จน Profile ในทุก viewport ที่กำหนด แล้วบันทึก
  overflow   : element ที่ล้นขอบจอ (ไม่นับที่อยู่ใน scroll container ที่ตั้งใจ)
  clip       : หัวข้อ/ปุ่ม/ป้ายที่ข้อความถูกตัด
  touch      : ปุ่ม/ลิงก์/ช่องกรอกที่เล็กกว่า 44x44 (เฉพาะจอ ≤ 1024)
  navOverlap : ปุ่มที่ถูก bottom navigation บังเมื่อเลื่อนสุดหน้า
  modal      : dialog ที่สูงเกินจอและเลื่อนไม่ได้
  iosZoom    : input/textarea ที่ font-size < 16px (Safari จะซูมเอง)
  noName     : ปุ่มที่ไม่มีชื่อสำหรับโปรแกรมอ่านหน้าจอ
  console/network errors
"""
import json, os, re, time
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
OUT = os.environ.get("OUT", "/tmp/qa")
os.makedirs(OUT, exist_ok=True)

VIEWPORTS = [
    ("m-320x568", 320, 568, True), ("m-360x800", 360, 800, True), ("m-375x812", 375, 812, True),
    ("m-390x844", 390, 844, True), ("m-393x852", 393, 852, True), ("m-430x932", 430, 932, True),
    ("ml-844x390", 844, 390, True), ("ml-932x430", 932, 430, True),
    ("t-600x960", 600, 960, True), ("t-768x1024", 768, 1024, True), ("t-820x1180", 820, 1180, True), ("t-834x1194", 834, 1194, True),
    ("tl-1024x768", 1024, 768, True), ("tl-1180x820", 1180, 820, True), ("tl-1194x834", 1194, 834, True),
    ("d-1280x800", 1280, 800, False), ("d-1440x900", 1440, 900, False),
]
if os.environ.get("ONLY"):
    VIEWPORTS = [v for v in VIEWPORTS if v[0] in os.environ["ONLY"].split(",")]

CHECK = r"""(opts) => {
  const vw = document.documentElement.clientWidth, vh = window.innerHeight, issues = [];
  const vis = e => { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const sel = e => { let s = e.tagName.toLowerCase(); if (e.id) return s + '#' + e.id; const c = [...e.classList].slice(0, 2).join('.'); return s + (c ? '.' + c : ''); };
  const path = e => { const p = []; for (let x = e; x && x !== document.body && p.length < 3; x = x.parentElement) p.unshift(sel(x)); return p.join(' > '); };
  const inScroller = e => { for (let x = e.parentElement; x && x !== document.body; x = x.parentElement) { const s = getComputedStyle(x); if (/(auto|scroll)/.test(s.overflowX) && x.scrollWidth > x.clientWidth + 1) return true; if (/(hidden|clip)/.test(s.overflowX) && x !== document.documentElement) { const r = x.getBoundingClientRect(); if (r.right <= vw + 1 && r.left >= -1) return true; } } return false; };
  const all = [...document.querySelectorAll('body *')].filter(e => !['SCRIPT','STYLE','TEMPLATE','svg','path','circle','rect','line','g','polyline','ellipse'].includes(e.tagName) && !e.closest('svg') && vis(e));
  // 1) body overflow + element ที่ล้นจอ
  const bodyOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;
  const over = all.filter(e => { const r = e.getBoundingClientRect(); return (r.right > vw + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !inScroller(e); });
  const overTop = over.filter(e => !over.includes(e.parentElement)).slice(0, 8).map(e => { const r = e.getBoundingClientRect(); return path(e) + ` [${Math.round(r.left)}→${Math.round(r.right)}]`; });
  if (bodyOverflow) issues.push({ type: 'bodyOverflow', detail: document.documentElement.scrollWidth + ' > ' + window.innerWidth });
  overTop.forEach(d => issues.push({ type: 'overflow', detail: d }));
  // 2) ข้อความถูกตัด
  all.filter(e => e.matches('h1,h2,h3,button,label,.qp-title,.qm-label,.status-pill,.tab,.wc-world,.qp-num') && e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow !== 'visible' && getComputedStyle(e).textOverflow !== 'ellipsis')
     .slice(0, 6).forEach(e => issues.push({ type: 'clip', detail: path(e) + ' "' + e.textContent.trim().slice(0, 30) + '"' }));
  // 3) touch target
  if (opts.touch) all.filter(e => e.matches('button,a[href],input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select,[role=tab]') && !e.disabled && !e.closest('.editor-help,.pw-hint'))
     .filter(e => { const r = e.getBoundingClientRect(); return r.width < 43.5 || r.height < 43.5; })
     .slice(0, 10).forEach(e => { const r = e.getBoundingClientRect(); issues.push({ type: 'touch', detail: path(e) + ` ${Math.round(r.width)}x${Math.round(r.height)}` }); });
  // 4) iOS auto-zoom
  if (opts.touch) all.filter(e => e.matches('input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea,select') && parseFloat(getComputedStyle(e).fontSize) < 16)
     .forEach(e => issues.push({ type: 'iosZoom', detail: path(e) + ' ' + getComputedStyle(e).fontSize }));
  // 5) ปุ่มไม่มีชื่อ
  all.filter(e => e.matches('button,[role=button],a[href]') && !(e.getAttribute('aria-label') || e.textContent.trim() || e.getAttribute('title')))
     .forEach(e => issues.push({ type: 'noName', detail: path(e) }));
  // 6) dialog สูงเกินจอ
  document.querySelectorAll('.overlay.show').forEach(o => { const c = o.firstElementChild; if (!c) return; const r = c.getBoundingClientRect(); const sc = c.scrollHeight > c.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(c).overflowY);
     if ((r.top < -1 || r.bottom > vh + 1) && !sc && !(o.scrollHeight > o.clientHeight && /(auto|scroll)/.test(getComputedStyle(o).overflowY))) issues.push({ type: 'modal', detail: sel(c) + ` top ${Math.round(r.top)} bottom ${Math.round(r.bottom)} vh ${vh}` }); });
  return issues;
}"""

NAV_OVERLAP = r"""() => {
  const nav = document.querySelector('.tabbar'); if (!nav) return [];
  const ns = getComputedStyle(nav); if (ns.position !== 'fixed' || ns.display === 'none' || ns.visibility === 'hidden') return [];
  window.scrollTo(0, document.documentElement.scrollHeight);
  const nr = nav.getBoundingClientRect(), out = [];
  document.querySelectorAll('button,a[href],input,textarea,select').forEach(e => { if (nav.contains(e) || e.closest('.toasts')) return; const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') return;
    const r = e.getBoundingClientRect(); if (!r.width || !r.height) return; if (e.closest('.overlay:not(.show)')) return;
    if (r.bottom > nr.top + 1 && r.top < nr.bottom) {
      // บังจริงไหม: จุดกลางส่วนที่ทับกับ nav ถูกแตะแล้วโดน nav หรือไม่ (คำนึงถึง z-index)
      const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1), y = Math.min(Math.max((Math.max(r.top, nr.top) + Math.min(r.bottom, nr.bottom)) / 2, 1), innerHeight - 1);
      const hit = document.elementFromPoint(x, y);
      if (!hit || !nav.contains(hit)) return;
    }
    if (r.bottom > nr.top + 1 && r.top < nr.bottom) out.push({ type: 'navOverlap', detail: (e.id ? '#' + e.id : e.className.toString().split(' ')[0] || e.tagName) + ` bottom ${Math.round(r.bottom)} nav ${Math.round(nr.top)}` }); });
  window.scrollTo(0, 0);
  return out.slice(0, 6);
}"""

SEED = "() => { COURSES.python.topics.slice(0,3).forEach(t => t.stages.forEach((_,i) => state.done.add(doneKey('python', t.id, i)))); state.done.add(doneKey('python', COURSES.python.topics[3].id, 0)); }"

def audit_viewport(b, name, w, h, touch):
    ctx = b.new_context(viewport={"width": w, "height": h}, is_mobile=touch and w < 1024, has_touch=touch)
    pg = ctx.new_page()
    cons, net = [], []
    pg.on("console", lambda m: cons.append(m.text[:160]) if m.type == "error" else None)
    pg.on("pageerror", lambda e: cons.append("pageerror: " + str(e)[:160]))
    pg.on("requestfailed", lambda r: net.append(r.url[:90] + " " + (r.failure or "")[:40]))
    pg.on("response", lambda r: net.append(str(r.status) + " " + r.url[:90]) if r.status >= 400 else None)
    pg.on("dialog", lambda d: d.accept())
    res = {}

    def jsclick(selector, page_name):
        """กดผ่าน JS เพื่อให้ audit เดินต่อได้ และบันทึกว่าปุ่มนั้นผู้ใช้เอื้อมถึงไหม (อยู่ในจอหลังเลื่อน)"""
        reach = pg.evaluate("""(s) => { const e = document.querySelector(s); if (!e) return 'missing';
            e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect();
            return (r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= document.documentElement.clientWidth) ? 'ok' : 'unreachable ' + Math.round(r.top) + '..' + Math.round(r.bottom) + ' vh ' + innerHeight; }""", selector)
        if reach != "ok": res.setdefault(page_name, []).append({"type": "unreachable", "detail": selector + " " + reach})
        pg.evaluate("(s) => document.querySelector(s) && document.querySelector(s).click()", selector)

    def check(page_name, shot=False):
        time.sleep(0.25)
        # รอแอนิเมชันที่มีจุดจบ (เช่น modal ขยาย) ให้เสร็จก่อนวัด — กันผลบวกลวงจากขนาดระหว่าง scale
        pg.evaluate("() => Promise.race([Promise.all(document.getAnimations().filter(a => { const t = a.effect && a.effect.getTiming(); return t && t.iterations !== Infinity; }).map(a => a.finished.catch(() => {}))), new Promise(r => setTimeout(r, 1500))])")
        issues = pg.evaluate(CHECK, {"touch": touch}) + pg.evaluate(NAV_OVERLAP)
        res[page_name] = res.get(page_name, []) + issues
        if shot: pg.screenshot(path=f"{OUT}/{name}__{page_name}.png")

    pg.goto(BASE, wait_until="networkidle"); time.sleep(0.8)
    check("landing", True)
    jsclick("#ctaStart", "landing"); time.sleep(0.3); check("register-modal", True)
    jsclick("#tabLogin", "login-modal"); time.sleep(0.2); check("login-modal")
    jsclick("#authSubmit", "login-modal"); jsclick("#guestBtn", "login-modal"); time.sleep(0.4); check("home-guest")
    pg.evaluate(SEED)
    pg.evaluate("() => { state.lang='python'; renderLangs(); showScreen('lang'); }"); check("language-select")
    pg.evaluate("() => { state.lang='python'; state.topic=null; renderTopics(); showScreen('topic'); window.scrollTo(0,0); }"); check("quest-map", True)
    pg.evaluate("() => { state.lang='python'; openLesson(COURSES.python.topics[3]); showScreen('lesson'); window.scrollTo(0,0); }"); check("lesson")
    pg.evaluate("() => { state.lang='python'; state.topic='print'; localStorage.setItem('cq_lesson_read_print','1'); goLearn(); window.scrollTo(0,0); }"); time.sleep(0.4); check("stage-path", True)
    pg.evaluate("() => { state.lang='c'; state.topic='cintro'; state.stage=0; renderStage(); showScreen('game'); window.scrollTo(0,0); }")
    pg.fill("#code", '#include <stdio.h>\n\nint main() {\n    printf("' + "ข้อความยาวมาก" * 20 + '");\n    return 0;\n}\n')
    jsclick("#runBtn", "code-run-output"); time.sleep(0.8); check("code-run-output", True)
    pg.fill("#code", '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}\n')
    jsclick("#submitBtn", "submit-pass"); time.sleep(1.2); check("submit-pass")
    pg.evaluate("() => { state.stage = levels().findIndex(s => s.quiz); COURSES.c.topics[0].stages.forEach((_,i) => state.done.add(doneKey('c','cintro',i))); renderStage(); window.scrollTo(0,0); }"); check("quiz")
    pg.evaluate("() => { showScreen('board'); openBoard(); }"); time.sleep(0.8); check("leaderboard")
    pg.evaluate("() => document.getElementById('roomBtn').click()"); time.sleep(0.3); check("room-create", True)
    pg.fill("#rcName", "ครูทดสอบ"); pg.evaluate("() => document.getElementById('rcCreate').click()"); time.sleep(1.2); check("room-lobby", True)
    pg.evaluate("() => { if (typeof leaveRoom === 'function') leaveRoom(); }")
    # สมัครสมาชิกแล้วเปิดโปรไฟล์
    pg.evaluate("() => { setAuthMode('register'); document.getElementById('authOverlay').classList.add('show'); }")
    pg.fill("#inName", "ผู้ทดสอบ " + name); pg.fill("#inEmail", f"qa{int(time.time()*1000)}{w}@gmail.com"); pg.fill("#inPass", "ชอบกินมะม่วงตอนเช้า2026")
    pg.evaluate("() => document.getElementById('authSubmit').click()"); time.sleep(2.5)
    pg.evaluate("() => document.getElementById('profileBtn').click()"); time.sleep(0.4); check("profile-modal", True)
    ctx.close()
    net_real = [n for n in net if "pyodide" not in n and "jsdelivr" not in n]   # CDN ของ Python ถูกบล็อกใน sandbox นี้เท่านั้น
    return {"viewport": name, "w": w, "h": h, "pages": res, "console": sorted(set(cons)), "network": sorted(set(net_real)),
            "network_sandbox_only": sorted(set(n for n in net if n not in net_real))[:3]}

if __name__ == "__main__":
    report = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        for v in VIEWPORTS:
            r = audit_viewport(b, *v)
            report.append(r)
            n = sum(len(x) for x in r["pages"].values())
            print(f"{v[0]:>12}: {n:3d} issues | console {len(r['console'])} | network {len(r['network'])}")
        b.close()
    json.dump(report, open(f"{OUT}/report.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
