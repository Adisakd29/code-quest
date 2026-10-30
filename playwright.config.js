// @ts-check
/**
 * Playwright config สำหรับ responsive smoke test
 * รัน: npx playwright test        (เซิร์ฟเวอร์เปิดให้อัตโนมัติ ไม่ต้องมีฐานข้อมูล — ทดสอบในโหมดผู้เยี่ยมชม)
 */
const { defineConfig } = require("@playwright/test");

const PORT = process.env.SMOKE_PORT || 3999;

module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Python runtime โหลดจาก CDN — ไม่เกี่ยวกับ layout และอาจถูกบล็อกใน CI จึงไม่รอ
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node server.js`,
    url: `http://localhost:${PORT}/api/version`,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
    env: { PORT: String(PORT), JWT_SECRET: "smoke-test" },
  },
});
