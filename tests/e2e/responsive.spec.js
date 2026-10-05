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
