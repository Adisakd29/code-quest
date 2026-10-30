// @ts-check
/**
 * Responsive smoke test — ตรวจ layout ด้วยการวัดตำแหน่ง (ไม่ใช้ pixel snapshot เพราะเปราะเกินไป)
 *
 * ในแต่ละ viewport:
 *   1. body ไม่มี horizontal overflow (landing / แดชบอร์ด / แผนที่ภารกิจ / หน้าเขียนโค้ด)
 *   2. bottom navigation ไม่บังปุ่มที่กดได้ (ตรวจด้วย elementFromPoint ซึ่งคำนึงถึง z-index)
 *   3. โหนดของแผนที่ภารกิจที่มองเห็นอยู่ในขอบเขตของแผนที่
 *   4. ชื่อหน่วย (label) อยู่ในจอทั้งหมด
 *   5. หน่วยที่ล็อก กด/กด Enter แล้วเข้าไม่ได้
 *   6. หน่วยปัจจุบัน กดแล้วเข้าได้
 * รวมกรณีปลดล็อกตามความคืบหน้าจริง: หน่วยแรก 0/2 และ 1/2 → หน่วยถัดไปล็อก · 2/2 → ปลดล็อก
 */
const { test, expect } = require("@playwright/test");

const VIEWPORTS = [
  { name: "mobile-390x844", width: 390, height: 844, touch: true },
  { name: "mobile-430x932", width: 430, height: 932, touch: true },
  { name: "tablet-768x1024", width: 768, height: 1024, touch: true },
  { name: "tablet-820x1180", width: 820, height: 1180, touch: true },
  { name: "tablet-1024x768", width: 1024, height: 768, touch: true },
  { name: "desktop-1440x900", width: 1440, height: 900, touch: false },
];

/** เข้าโหมดผู้เยี่ยมชมและล้างความคืบหน้า เพื่อให้แต่ละเทสต์เริ่มจากสถานะเดียวกัน */
/**
 * เริ่มเป็นผู้เยี่ยมชม · ค่าตั้งต้นบล็อกการโหลดคอมไพเลอร์ (Clang ~22MB + คอมไพล์ WebAssembly)
 * เพราะหน้าเกม C/C++ โหลดล่วงหน้าทันทีที่เปิด ซึ่งการตรวจ layout ไม่ต้องใช้ และทำให้เครื่องทดสอบหนักจนข้ออื่นหมดเวลา
 * ข้อที่ต้องคอมไพล์จริงให้ส่ง { compiler: true }
 */
async function startAsGuest(page, opts = {}) {
  if (!opts.compiler) await page.route(/\/vendor\/clang\//, route => route.abort());
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
  await page.locator("#ctaGuest").click();
  await expect(page.locator("#homeScreen")).toBeVisible();
}

/** ตั้งความคืบหน้าของหน่วยแรก (Python) เป็น n ด่าน แล้วเปิดแผนที่ภารกิจ */
async function openMapWithProgress(page, firstTopicDone) {
  await page.evaluate((n) => {
    state.done = new Set();
    const t = COURSES.python.topics[0];
    const count = n === "all" ? t.stages.length : n;   // "all" = ผ่านหน่วยแรกครบ (จำนวนด่านอ่านจากข้อมูลคอร์ส ไม่ผูกกับหลักสูตรรุ่นใด)
    for (let i = 0; i < count; i++) state.done.add(doneKey("python", t.id, i));
    state.lang = "python"; state.topic = null;
    renderTopics(); showScreen("topic"); window.scrollTo(0, 0);
  }, firstTopicDone);
  await expect(page.locator("#questMap .qp-row").first()).toBeVisible();
}

async function expectNoHorizontalOverflow(page, where) {
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: window.innerWidth }));
  expect(m.sw, `${where}: body กว้าง ${m.sw}px เกินจอ ${m.vw}px`).toBeLessThanOrEqual(m.vw);
}

for (const vp of VIEWPORTS) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height }, hasTouch: vp.touch });

    test("body ไม่มี horizontal overflow ในหน้าหลัก", async ({ page }) => {
      await page.goto("/");
      await expectNoHorizontalOverflow(page, "landing");
      await startAsGuest(page);
      await expectNoHorizontalOverflow(page, "แดชบอร์ด");
      await openMapWithProgress(page, 0);
      await expectNoHorizontalOverflow(page, "แผนที่ภารกิจ");
      await page.evaluate(() => { state.lang = "c"; state.topic = "c2-welcome"; state.stage = 0; renderStage(); showScreen("game"); });
      await expect(page.locator("#code")).toBeVisible();
      await expectNoHorizontalOverflow(page, "หน้าเขียนโค้ด");
    });

    test("bottom navigation ไม่บังปุ่มที่กดได้", async ({ page }) => {
      await startAsGuest(page);
      await openMapWithProgress(page, 0);
      const covered = await page.evaluate(async () => {
        const nav = document.querySelector(".tabbar");
        const ns = nav && getComputedStyle(nav);
        if (!nav || ns.position !== "fixed" || ns.display === "none") return [];   // เดสก์ท็อป: nav อยู่บนหัวเว็บ
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const nr = nav.getBoundingClientRect(), out = [];
        document.querySelectorAll("#topicScreen button").forEach(b => {
          const r = b.getBoundingClientRect();
          if (!r.width || r.bottom <= nr.top || r.top >= nr.bottom) return;
          const y = (Math.max(r.top, nr.top) + Math.min(r.bottom, nr.bottom)) / 2;
          const hit = document.elementFromPoint(r.left + r.width / 2, y);
          if (hit && nav.contains(hit)) out.push(b.textContent.trim().slice(0, 30));
        });
        return out;
      });
      expect(covered, "ปุ่มที่ถูก bottom nav บังเมื่อเลื่อนสุดหน้า").toEqual([]);
    });

    test("โหนดแผนที่อยู่ในขอบเขตแผนที่ และชื่อหน่วยอยู่ในจอ", async ({ page }) => {
      await startAsGuest(page);
      await openMapWithProgress(page, 0);
      const g = await page.evaluate(() => {
        const map = document.getElementById("questMap").getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        const nodes = [...document.querySelectorAll(".qp-node")].map(n => n.getBoundingClientRect())
          .filter(r => r.bottom > 0 && r.top < innerHeight)                           // เฉพาะที่มองเห็น
          .filter(r => r.left < map.left - 1 || r.right > map.right + 1).length;
        const labels = [...document.querySelectorAll(".qp-title")].map(l => ({ r: l.getBoundingClientRect(), t: l.textContent.trim(), clipped: l.scrollWidth > l.clientWidth + 1 }))
          .filter(x => x.r.left < -1 || x.r.right > vw + 1 || x.clipped).map(x => x.t);
        return { nodesOut: nodes, labelsOut: labels };
      });
      expect(g.nodesOut, "จำนวนโหนดที่หลุดขอบแผนที่").toBe(0);
      expect(g.labelsOut, "ชื่อหน่วยที่หลุดจอหรือถูกตัด").toEqual([]);
      // ชื่อหน่วยที่ยาวที่สุดบนแผนที่ต้องแสดงครบ (เดิมตรึงชื่อหน่วยของหลักสูตรรุ่นเก่า ซึ่งถูกแทนแล้ว)
      const longest = await page.evaluate(() => [...document.querySelectorAll(".qp-title")]
        .filter(l => l.offsetParent !== null)   // เฉพาะหน่วยใน World ที่เปิดอยู่ (World ที่พับซ่อนโดยตั้งใจ)
        .map(l => l.textContent.trim()).sort((a, b) => b.length - a.length)[0]);
      expect(longest, "ต้องมีชื่อหน่วยแสดงบนจอ").toBeTruthy();
      await expect(page.getByRole("heading", { name: longest, exact: true }).first()).toBeVisible();
    });

    test("หน่วยที่ล็อกเข้าไม่ได้ ทั้งคลิกและคีย์บอร์ด (หน่วยแรกยังไม่ครบ)", async ({ page }) => {
      await startAsGuest(page);
      for (const done of [0, 1]) {
        await openMapWithProgress(page, done);
        const locked = page.locator(".qp-row").nth(1);
        await expect(locked).toHaveClass(/is-locked/);
        const btn = locked.locator(".qp-go");
        await expect(btn).toHaveAttribute("aria-disabled", "true");
        // Playwright ถือว่า aria-disabled = กดไม่ได้ (ยืนยันว่าสื่อสถานะถูก) → force เพื่อจำลองการแตะของผู้ใช้จริง
        await btn.click({ force: true });
        await expect(page.locator(".toast").last()).toContainText("ยังไม่ปลดล็อก");
        await expect(page.locator("#topicScreen")).toBeVisible();
        await expect(page.locator("#lessonScreen")).toBeHidden();
        await btn.focus();
        await page.keyboard.press("Enter");
        await expect(page.locator("#lessonScreen")).toBeHidden();
        await expect(page.locator("#learnScreen")).toBeHidden();
      }
      // route guard: เรียกเข้าหน้าภารกิจของหน่วยที่ล็อกตรงๆ ต้องถูกพากลับแผนที่
      await page.evaluate(() => { state.topic = COURSES.python.topics[1].id; state.stage = 0; renderStage(); showScreen("game"); });
      await expect(page.locator("#gameScreen")).toBeHidden();
      await expect(page.locator("#topicScreen")).toBeVisible();
    });

    test("หน่วยปัจจุบันเข้าได้ และผ่านหน่วยแรกครบแล้วปลดล็อกหน่วยถัดไป", async ({ page }) => {
      await startAsGuest(page);
      await openMapWithProgress(page, 0);
      const current = page.locator(".qp-row.is-current");
      await expect(current).toHaveCount(1);
      await current.locator(".qp-go").click();
      await expect(page.locator("#lessonScreen:visible, #learnScreen:visible")).toHaveCount(1);

      await openMapWithProgress(page, "all");
      await expect(page.locator(".qp-row").nth(0)).toHaveClass(/is-done/);
      const next = page.locator(".qp-row").nth(1);
      await expect(next).not.toHaveClass(/is-locked/);
      await expect(next).toHaveClass(/is-current/);
      await next.locator(".qp-go").click();
      await expect(page.locator("#lessonScreen:visible, #learnScreen:visible")).toHaveCount(1);
    });
  });
}

test.describe("regression: ลำดับการโหลดสคริปต์", () => {
  test("เน็ตช้า (quest.js มาช้า): ผู้เยี่ยมชมเห็นหน้าแรก ไม่ใช่กล่องเข้าสู่ระบบเด้งทับ", async ({ page }) => {
    // เดิม tryRestore ตัดสินหน้าแรกก่อน quest.js โหลดเสร็จ → showLanding ยังไม่มี → เปิดกล่องเข้าสู่ระบบแทน (เกิดเป็นครั้งคราว)
    await page.route(/\/quest\.js/, async route => { await new Promise(r => setTimeout(r, 1500)); await route.continue(); });
    await page.goto("/");
    await expect(page.locator("#ctaGuest")).toBeVisible();
    await page.waitForTimeout(800);
    await expect(page.locator("#authOverlay")).not.toHaveClass(/\bshow\b/);
    await page.locator("#ctaGuest").click();
    await expect(page.locator("#homeScreen")).toBeVisible();
  });

  test("ข้อมูลหลักสูตรมาช้า: หน้าแรกแสดงก่อน · กดเริ่มแล้วรอจนพร้อม · หลักสูตรครบ", async ({ page }) => {
    // course-loader.js โหลด C/C++/Python v2 แบบไม่บล็อกหน้า — หน้าแรกต้องไม่รอไฟล์เหล่านี้ และทุกเส้นทางต้องรอให้พร้อมก่อนใช้
    await page.route(/\/courses\/(py2|c2|cpp)\.js/, async route => { await new Promise(r => setTimeout(r, 2500)); await route.continue(); });
    await page.goto("/", { waitUntil: "domcontentloaded" });   // ค่าเริ่มต้นรอ event "load" ซึ่งรอสคริปต์ทุกตัว (รวมที่โหลดภายหลัง)
    await expect(page.locator("#ctaGuest")).toBeVisible();
    expect(await page.evaluate(() => window.cqCoursesLoaded)).toBe(false);   // หน้าแรกแสดงก่อนหลักสูตรโหลดเสร็จ
    await page.locator("#ctaGuest").click();
    await expect(page.locator("#ctaGuest")).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("#homeScreen")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#authOverlay")).not.toHaveClass(/\bshow\b/);
    const counts = await page.evaluate(() => ({ py2: COURSES.python.topics.filter(t => t.id.startsWith("py2-")).length, c: COURSES.c.topics.length, cpp: COURSES.cpp.topics.length }));
    expect(counts.py2).toBeGreaterThanOrEqual(41);
    expect(counts.c).toBeGreaterThanOrEqual(30);
    expect(counts.cpp).toBeGreaterThanOrEqual(30);
  });
});

test.describe("regression: EXP และตัวละคร", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("+EXP ไม่เด้งตอนโหลดข้อมูล แต่เด้งเมื่อผ่านภารกิจจริง", async ({ page }) => {
    await startAsGuest(page, { compiler: true });
    // จำลองการโหลดข้อมูลบัญชี (ค่า EXP เปลี่ยนจาก 0 เป็นค่าจริง) — ต้องไม่ถือเป็นการได้ EXP
    await page.evaluate(() => { state.level = 5; state.xp = 737; renderXP(); });
    await expect(page.locator("#xpFloat")).not.toHaveClass(/go/);
    // ผ่านภารกิจจริง → แสดง +EXP
    await page.evaluate(() => { state.lang = "c"; state.topic = "c2-welcome"; state.stage = 0; renderStage(); showScreen("game"); });
    // ด่านแรกของ C v2 (คำตอบต้องตรงกับด่านนี้) · คอมไพล์ด้วย Clang ในเบราว์เซอร์ ครั้งแรกต้องรอโหลดคอมไพเลอร์
    await page.locator("#code").fill('#include <stdio.h>\n\nint main(void) {\n    printf("สวัสดีภาษา C\\n");\n    return 0;\n}\n');
    await page.waitForFunction(() => window.CPP && CPP.state === "ready", null, { timeout: 120000 });
    await page.locator("#submitBtn").click();
    await expect(page.locator("#xpFloat")).toHaveClass(/go/, { timeout: 60000 });
    await expect(page.locator("#xpFloat")).toContainText("+30 EXP");
  });

  test("ของตกแต่งแสดงบนตัวละครในตัวอย่างรูปโปรไฟล์", async ({ page }) => {
    await startAsGuest(page);
    await page.evaluate(() => { state.user = { name: "ทดสอบ", avatar: null }; state.level = 15; document.getElementById("profileOverlay").classList.add("show"); paintPfAvatar("emoji:🧑‍🚀|👓"); });
    await expect(page.locator("#pfAvatar .av-acc")).toBeVisible();
    const g = await page.evaluate(() => {
      const box = document.getElementById("pfAvatar"), a = box.querySelector(".av-acc").getBoundingClientRect(), e = box.querySelector(".av-emoji").getBoundingClientRect();
      return { overlaps: a.left < e.right && a.right > e.left && a.top < e.bottom && a.bottom > e.top };
    });
    expect(g.overlaps, "แว่นต้องอยู่บนตัวละคร").toBe(true);
  });
});

/**
 * ห้องเขียนโค้ด Python (/code) — สมุดโน้ตหลายเซลล์แบบ Jupyter สำหรับห้องเรียนที่นักเรียนใช้มือถือ
 * ตัวแปรอยู่ต่อข้ามเซลล์ · [n] ลำดับการรัน · Out[n] · input() รอคำตอบจริง · หยุดลูปไม่รู้จบแล้วตัวแปรยังอยู่
 * traceback ภาษาอังกฤษล้วน (ไม่มีคำอธิบายเสริม) · ไม่มีแป้นช่วยพิมพ์ · บันทึกในเครื่อง
 */
test.describe("ห้องเขียนโค้ด Python (/code)", () => {
  async function openNotebook(browser, vp, opts = {}) {
    const ctx = await browser.newContext({ viewport: vp, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    const errors = []; page.on("pageerror", e => errors.push(String(e)));
    if (opts.noIsolation) await page.route(/\/code$/, async route => {
      const res = await route.fetch(); const headers = { ...res.headers() };
      delete headers["cross-origin-opener-policy"]; delete headers["cross-origin-embedder-policy"];
      await route.fulfill({ response: res, headers });
    });
    await page.goto("/code");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator("#status")).toHaveText(/Python พร้อม/, { timeout: 120000 });
    return { ctx, page, errors, cell: i => page.locator(".cell").nth(i) };
  }
  const label = (cell, re) => expect(cell.locator(".cell-label")).toHaveText(re, { timeout: 60000 });

  for (const vp of [{ width: 320, height: 640 }, { width: 390, height: 844 }]) {
    test(`มือถือ ${vp.width}px: หลายเซลล์ ตัวแปรต่อกัน input() และ error`, async ({ browser }) => {
      test.setTimeout(180000);
      const { ctx, page, errors, cell } = await openNotebook(browser, vp);
      expect(await page.evaluate(() => crossOriginIsolated)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const run = await page.locator("#runBtn").boundingBox();
      expect(run.x + run.width).toBeLessThanOrEqual(vp.width);
      expect(await page.locator("#keys, .lab-key, #explain").count()).toBe(0);   // ไม่มีแป้นช่วยพิมพ์/คำอธิบาย error

      // พิมพ์จริง: ย่อหน้าอัตโนมัติหลัง ":" และแปลงเครื่องหมายคำพูดโค้งของคีย์บอร์ดมือถือ
      await cell(0).locator(".cell-code").tap();
      await cell(0).locator(".cell-code").fill("");
      await page.keyboard.type("x = 10");
      await page.keyboard.press("Enter");
      await page.keyboard.type("for i in range(2):");
      await page.keyboard.press("Enter");
      await page.keyboard.type("print(“รอบ”, i)");
      await expect(cell(0).locator(".cell-code")).toHaveValue('x = 10\nfor i in range(2):\n    print("รอบ", i)');
      await page.locator("#runBtn").tap();                       // รันแล้วไปเซลล์ถัดไป (เหมือน Shift+Enter)
      await label(cell(0), "[1]:");
      await expect(cell(0).locator(".out-text")).toHaveText("รอบ 0\nรอบ 1\n");
      await expect(cell(1)).toHaveClass(/active/);

      // เซลล์ถัดไปใช้ตัวแปรเดิม · input() ถามในเซลล์ · นิพจน์สุดท้ายแสดงเป็น Out[n]
      await cell(1).locator(".cell-code").fill('name = input("ชื่อ: ")\nprint("hi", name)\nx * 3');
      await cell(1).locator(".ct-run").tap();
      await cell(1).locator(".cell-ask input").fill("Mali");
      await cell(1).locator(".cell-ask input").press("Enter");
      await label(cell(1), "[2]:");
      await expect(cell(1).locator(".out-text")).toHaveText("ชื่อ: Mali\nhi Mali\n");
      await expect(cell(1).locator(".out-value")).toHaveText(/Out\[2\]:\s*30/);

      // error: traceback ภาษาอังกฤษตามจริง อ้างชื่อเซลล์แบบ Jupyter และแสดงบรรทัดที่ผิด
      await cell(1).locator(".ct-add").tap();
      await cell(2).locator(".cell-code").fill("y = [1, 2]\nprint(y[5])");
      await cell(2).locator(".ct-run").tap();
      await label(cell(2), "[3]:");
      await expect(cell(2).locator(".out-err")).toContainText('File "Cell In[3]", line 2');
      await expect(cell(2).locator(".out-err")).toContainText("print(y[5])");
      await expect(cell(2).locator(".out-err")).toContainText("IndexError: list index out of range");

      // ลูปไม่รู้จบ: กดหยุด → KeyboardInterrupt และตัวแปรเดิมยังอยู่
      await cell(2).locator(".ct-add").tap();
      await cell(3).locator(".cell-code").fill("while True:\n    pass");
      await cell(3).locator(".ct-run").tap();
      await expect(page.locator("#runBtn")).toHaveText(/หยุด/);
      await page.waitForTimeout(800);
      await page.locator("#runBtn").tap();
      await expect(cell(3).locator(".out-err")).toContainText("KeyboardInterrupt");
      await cell(3).locator(".ct-add").tap();
      await cell(4).locator(".cell-code").fill("print(x, name)");
      await cell(4).locator(".ct-run").tap();
      await expect(cell(4).locator(".out-text")).toHaveText("10 Mali\n");

      // บันทึกในเครื่อง: รีโหลดแล้วเซลล์และผลลัพธ์ยังอยู่
      await page.waitForTimeout(700);
      await page.reload();
      await expect(page.locator(".cell")).toHaveCount(5);
      await expect(cell(1).locator(".out-text")).toHaveText("ชื่อ: Mali\nhi Mali\n");
      expect(errors).toEqual([]);
      await ctx.close();
    });
  }

  test("เบราว์เซอร์ที่ไม่มี cross-origin isolation: input() และปุ่มหยุดยังใช้ได้", async ({ browser }) => {
    test.setTimeout(180000);
    const { ctx, page, errors, cell } = await openNotebook(browser, { width: 390, height: 844 }, { noIsolation: true });
    expect(await page.evaluate(() => window.__notebook.K.isolated)).toBe(false);
    await cell(0).locator(".cell-code").fill('a = input("a? ")\nb = input("b? ")\nprint(int(a) + int(b))');
    await cell(0).locator(".ct-run").tap();
    await cell(0).locator(".cell-ask input").fill("2");
    await cell(0).locator(".cell-ask input").press("Enter");
    await cell(0).locator(".cell-ask input").fill("5");
    await cell(0).locator(".cell-ask input").press("Enter");
    await expect(cell(0).locator(".out-text")).toHaveText("a? 2\nb? 5\n7\n");
    await cell(1).locator(".cell-code").fill("while True:\n    pass");
    await cell(1).locator(".ct-run").tap();
    await page.waitForTimeout(800);
    await page.locator("#runBtn").tap();
    await expect(page.locator("#status")).toHaveText(/รีสตาร์ตเคอร์เนล/);
    await expect(page.locator("#runBtn")).toHaveText(/รัน/);
    expect(errors).toEqual([]);
    await ctx.close();
  });

  test("เซลล์ Markdown: กดรันแล้วแสดงผล · แตะซ้ำเพื่อแก้ · ไม่รัน HTML/ลิงก์อันตราย", async ({ browser }) => {
    test.setTimeout(150000);
    const { ctx, page, errors, cell } = await openNotebook(browser, { width: 390, height: 844 });
    await cell(0).locator(".ct-type").tap();                                   // Code → Markdown
    await expect(cell(0).locator(".ct-type")).toHaveText("Markdown");
    await expect(cell(0).locator(".cell-label")).toHaveText("");
    await cell(0).locator(".cell-code").fill("# บทที่ 1\nตัวแปร **x** เก็บค่า `10`\n\n- ข้อแรก\n- ข้อสอง\n\n<img src=x onerror=alert(1)> [กด](javascript:alert(1)) [docs](https://docs.python.org)");
    await page.locator("#runBtn").tap();                                       // รัน = แสดงผล แล้วไปเซลล์ถัดไป
    const md = cell(0).locator(".md-render");
    await expect(md.locator("h1")).toHaveText("บทที่ 1");
    await expect(md.locator("strong")).toHaveText("x");
    await expect(md.locator("code")).toHaveText("10");
    await expect(md.locator("li")).toHaveCount(2);
    await expect(md.locator("img")).toHaveCount(0);                            // HTML ดิบแสดงเป็นตัวอักษร
    await expect(md).toContainText("<img src=x onerror=alert(1)>");
    await expect(md.locator('a[href^="javascript"]')).toHaveCount(0);
    await expect(md.locator('a[href="https://docs.python.org"]')).toHaveAttribute("target", "_blank");
    await expect(cell(0).locator(".cell-editor")).toBeHidden();
    await expect(cell(1)).toHaveClass(/active/);
    // เซลล์โค้ดถัดไปยังนับ [1] (Markdown ไม่ใช้ลำดับการรัน)
    await cell(1).locator(".cell-code").fill("print('hi')");
    await cell(1).locator(".ct-run").tap();
    await label(cell(1), "[1]:");
    // แตะครั้งแรกเลือก แตะซ้ำเพื่อแก้ไข
    await md.tap();
    await expect(cell(0)).toHaveClass(/active/);
    await md.tap();
    await expect(cell(0).locator(".cell-code")).toBeVisible();
    await expect(cell(0).locator(".cell-code")).toBeFocused();
    // รีโหลดแล้วยังเป็น Markdown ที่แสดงผล
    await page.waitForTimeout(700);
    await page.reload();
    await expect(cell(0).locator(".md-render h1")).toHaveText("บทที่ 1");
    expect(errors).toEqual([]);
    await ctx.close();
  });

  test("ทำซ้ำเซลล์ (duplicate): คัดลอกโค้ดและชนิดเซลล์ไว้ใต้เซลล์เดิม", async ({ browser }) => {
    test.setTimeout(150000);
    const { ctx, page, errors, cell } = await openNotebook(browser, { width: 390, height: 844 });
    await cell(0).locator(".cell-code").fill("n = 3\nprint(n * 2)");
    await cell(0).locator(".ct-run").tap();
    await label(cell(0), "[1]:");
    await expect(page.locator(".cell")).toHaveCount(2);
    await cell(0).locator(".ct-dup").tap();
    await expect(page.locator(".cell")).toHaveCount(3);
    await expect(cell(1).locator(".cell-code")).toHaveValue("n = 3\nprint(n * 2)");
    await expect(cell(1)).toHaveClass(/active/);
    await expect(cell(1).locator(".cell-label")).toHaveText("[ ]:");            // สำเนายังไม่ได้รัน ไม่มีผลลัพธ์
    await expect(cell(1).locator(".cell-out")).toBeHidden();
    // แก้สำเนาไม่กระทบต้นฉบับ
    await cell(1).locator(".cell-code").fill("print('copy')");
    await expect(cell(0).locator(".cell-code")).toHaveValue("n = 3\nprint(n * 2)");
    // เซลล์ Markdown ที่แสดงผลแล้ว → สำเนาแสดงผลเช่นกัน
    await cell(2).locator(".cell-code").tap();
    await cell(2).locator(".ct-type").tap();
    await cell(2).locator(".cell-code").fill("## หัวข้อ");
    await cell(2).locator(".ct-run").tap();
    await cell(2).locator(".md-render").tap();
    await cell(2).locator(".ct-dup").tap();
    await expect(cell(3).locator(".md-render h2")).toHaveText("หัวข้อ");
    await page.waitForTimeout(700);
    await page.reload();
    await expect(page.locator(".cell")).toHaveCount(4);
    expect(errors).toEqual([]);
    await ctx.close();
  });

  test("ดาวน์โหลด .ipynb ได้ไฟล์ Jupyter ที่ถูกต้อง", async ({ browser }) => {
    test.setTimeout(150000);
    const { ctx, page, cell } = await openNotebook(browser, { width: 390, height: 844 });
    await cell(0).locator(".cell-code").fill("print('Hello Python')");
    await cell(0).locator(".ct-run").tap();
    await label(cell(0), "[1]:");
    await cell(1).locator(".cell-code").tap();                                 // เลือกเซลล์ก่อน (ปุ่มแสดงเฉพาะเซลล์ที่เลือก)
    await cell(1).locator(".ct-type").tap();
    await cell(1).locator(".cell-code").fill("## สรุป\nใช้ **print**");
    await cell(1).locator(".ct-run").tap();
    await page.locator("#menuBtn").tap();
    // เปลี่ยนชื่อสมุด (Chromium แบบ headless ตั้งชื่อไฟล์ภาษาไทยไม่ได้ จึงใช้ชื่ออังกฤษในการทดสอบ)
    page.once("dialog", d => d.accept("lesson1"));
    await page.locator("#renameBtn").tap();
    await expect(page.locator("#bookName")).toHaveText("lesson1");
    const [dl] = await Promise.all([page.waitForEvent("download"), page.locator("#ipynbBtn").tap()]);
    expect(dl.suggestedFilename()).toBe("lesson1.ipynb");
    const nb = JSON.parse(require("fs").readFileSync(await dl.path(), "utf8"));
    expect(nb.nbformat).toBe(4);
    expect(nb.cells[0].source.join("")).toBe("print('Hello Python')");
    expect(nb.cells[0].execution_count).toBe(1);
    expect(nb.cells[0].outputs[0]).toMatchObject({ output_type: "stream", name: "stdout", text: ["Hello Python\n"] });
    expect(nb.cells[1]).toMatchObject({ cell_type: "markdown", source: ["## สรุป\n", "ใช้ **print**"] });
    expect(nb.cells[1].outputs).toBeUndefined();
    await ctx.close();
  });

  test("เข้าจากหน้าแรกและแถบเมนูได้", async ({ page }) => {
    await page.route(/\/vendor\/clang\//, route => route.abort());
    await page.goto("/");
    await expect(page.locator("#ctaCodeLab")).toHaveAttribute("href", "/code");
    await page.locator("#ctaGuest").click();
    await expect(page.locator("#codeTab")).toBeVisible();
    await page.locator("#codeTab").click();
    await expect(page).toHaveURL(/\/code$/);
    await expect(page.locator(".cell-code").first()).toBeVisible();
  });
});
