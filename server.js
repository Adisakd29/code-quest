/**
 * Code Quest — server
 * Express + PostgreSQL + JWT cookie auth
 *
 * Environment variables:
 *   DATABASE_URL  — connection string ของ PostgreSQL (Railway ใส่ให้อัตโนมัติเมื่อ reference ตัว database)
 *   JWT_SECRET    — สตริงลับสำหรับเซ็น token (ตั้งเองใน Railway Variables)
 *   PORT          — Railway ใส่ให้อัตโนมัติ
 */
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

app.use(express.json({ limit: "2mb" }));
app.set("trust proxy", 1); // Railway อยู่หลัง proxy — ให้ req.ip เป็น IP จริงของผู้ใช้

const crypto = require("crypto");
const { verify } = require("./verify.js");
const { checkEmail } = require("./email-check.js");
const mailer = require("./mailer.js");
const { createGoogleAuth } = require("./google-oauth.js");
const IS_PROD = process.env.NODE_ENV === "production" || !!process.env.RAILWAY_ENVIRONMENT;

/* ---------------- Rate limit (ในหน่วยความจำ ไม่ต้องพึ่งแพ็กเกจเพิ่ม) ---------------- */
const buckets = new Map();
setInterval(() => { const now = Date.now(); for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k); }, 60000).unref();
/**
 * จำกัดจำนวนครั้งต่อช่วงเวลา — keyFn คืนคีย์ (เช่น IP หรือ IP+อีเมล) ได้หลายคีย์
 * เกินกำหนดจะตอบ 429 พร้อม Retry-After และข้อความภาษาไทยที่ผู้ใช้เข้าใจ
 */
function rateLimit(name, max, windowMs, keyFn) {
  return (req, res, next) => {
    const keys = [].concat(keyFn(req)).filter(Boolean);
    const now = Date.now();
    for (const k of keys) {
      const id = name + ":" + k;
      let b = buckets.get(id);
      if (!b || b.reset < now) { b = { n: 0, reset: now + windowMs }; buckets.set(id, b); }
      b.n++;
      if (b.n > max) {
        const wait = Math.ceil((b.reset - now) / 1000);
        res.set("Retry-After", String(wait));
        return res.status(429).json({ error: "ทำรายการถี่เกินไป กรุณารอ " + wait + " วินาทีแล้วลองใหม่", code: "RATE_LIMIT" });
      }
    }
    next();
  };
}
const byIp = req => req.ip;
const byIpEmail = req => req.ip + "|" + String((req.body || {}).email || "").toLowerCase().trim();

/* ---------------- นโยบายรหัสผ่าน (อิงแนวทาง OWASP / NIST SP 800-63B) ---------------- */
const MIN_PASSWORD = Math.max(8, parseInt(process.env.MIN_PASSWORD_LENGTH) || 10);
const COMMON_PASSWORDS = new Set(["1234567890", "12345678910", "0123456789", "qwertyuiop", "password123", "passw0rd123",
  "abcdefghij", "1111111111", "0000000000", "iloveyou123", "qwerty1234", "codequest123", "asdfghjkl1"]);
function passwordProblem(pw, email) {
  if (typeof pw !== "string" || pw.length < MIN_PASSWORD) return "รหัสผ่านต้องยาวอย่างน้อย " + MIN_PASSWORD + " ตัวอักษร (แนะนำให้ใช้ประโยคยาวๆ ที่จำง่าย)";
  if (pw.length > 128) return "รหัสผ่านยาวได้ไม่เกิน 128 ตัวอักษร";
  if (COMMON_PASSWORDS.has(pw.toLowerCase()) || /^(.)\1+$/.test(pw)) return "รหัสผ่านนี้เดาง่ายเกินไป ลองใช้ประโยคที่มีความหมายสำหรับคุณ";
  // ตัวเลขล้วนสั้นกว่า 15 หลัก (เช่น เบอร์โทร วันเกิด เลขบัตร) อยู่ในพจนานุกรมเดารหัสทั่วไป
  if (/^\d+$/.test(pw) && pw.length < 15) return "รหัสผ่านที่เป็นตัวเลขล้วน (เช่น เบอร์โทร วันเกิด) เดาง่าย — ผสมตัวอักษร หรือใช้ประโยคที่จำง่าย";
  const local = String(email || "").split("@")[0].toLowerCase();
  if (local && local.length >= 4 && pw.toLowerCase().includes(local)) return "รหัสผ่านไม่ควรมีชื่ออีเมลของคุณอยู่ข้างใน";
  return null;
}

/** ทำความสะอาดชื่อที่แสดงต่อผู้อื่น: ตัดอักขระควบคุม ช่องว่างซ้ำ และจำกัดความยาว (หน้าเว็บ escape อีกชั้นตอนแสดงผล) */
function cleanName(s, max) {
  return String(s || "").replace(/[\u0000-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max || 24);
}

/**
 * กันการบันทึกข้อมูลเมื่อหน้าเกมกับเซิร์ฟเวอร์คนละเวอร์ชัน
 * หน้าเกมส่ง header X-CQ-Version มาทุกคำขอ ถ้าไม่ตรง (หรือไม่ส่ง = หน้าเกมเก่าที่ค้างใน cache) จะไม่ให้เขียนข้อมูล
 */
function requireVersion(req, res, next) {
  const v = parseInt(req.get("X-CQ-Version"));
  if (v === CONTENT_VERSION) return next();
  console.warn("[version] ปฏิเสธการบันทึก: client=" + (req.get("X-CQ-Version") || "ไม่มี") + " server=" + CONTENT_VERSION + " path=" + req.path);
  return res.status(409).json({ error: "ระบบกำลังอัปเดต กรุณารีเฟรชหน้าเว็บอีกครั้ง", code: "VERSION" });
}
app.use(cookieParser());
/**
 * หน้าแรก: เซิร์ฟเวอร์ใส่ตัวเลขจริง (จำนวนภารกิจ, เวอร์ชัน) ลงใน HTML ก่อนส่ง
 * ทำให้ search engine และเครื่องมือที่ไม่รัน JavaScript เห็นข้อมูลถูกต้อง และตัวเลขมาจากแหล่งเดียวกับเกม
 */
const { COURSES: GAME_COURSES } = require("./verify.js");
const UIKIT = require("./public/ui-kit.js"); // ไอคอนชุดเดียวกับหน้าเว็บ ใส่ลง HTML ก่อนส่ง
const stageCount = lang => GAME_COURSES[lang].topics.reduce((n, t) => n + t.stages.length, 0);
let indexHtml = null;
function renderIndex() {
  if (indexHtml && IS_PROD) return indexHtml;
  // ค่าทั้งหมดของหน้าแรกคำนวณจากข้อมูลคอร์ส (landing.js) — ไม่มีจำนวน/รายชื่อภาษาเขียนตายตัว
  const vals = Object.assign(require("./landing.js").landingValues(GAME_COURSES, (lang, box) => UIKIT.LanguageIcon(lang, { box })), { VERSION: CONTENT_VERSION });

  const raw = fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8");
  indexHtml = UIKIT.renderPlaceholders(raw).replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vals ? String(vals[k]) : m));
  return indexHtml;
}
app.get(["/", "/index.html"], (req, res) => {
  res.set("Cache-Control", "no-cache"); // หน้าแรกต้องสดเสมอ ป้องกันหน้าเก่าค้างหลัง deploy
  res.type("html").send(renderIndex());
});
/**
 * หน้านโยบายความเป็นส่วนตัว / ข้อกำหนดการใช้งาน (Google ต้องการลิงก์เหล่านี้ก่อนเผยแพร่ "เข้าสู่ระบบด้วย Google")
 * อีเมลติดต่อมาจาก env CONTACT_EMAIL — ไม่เขียนตายในโค้ด
 */
const LEGAL_UPDATED = "3 ตุลาคม 2569";
function renderLegal(file) {
  const esc = v => String(v).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const contact = (process.env.CONTACT_EMAIL || "").trim();
  return fs.readFileSync(path.join(__dirname, "legal", file), "utf8")
    .replace(/\{\{CONTACT_EMAIL\}\}/g, contact ? '<a href="mailto:' + esc(contact) + '">' + esc(contact) + "</a>" : "(ผู้ดูแลระบบยังไม่ได้ระบุ — ตั้งค่า CONTACT_EMAIL)")
    .replace(/\{\{UPDATED\}\}/g, LEGAL_UPDATED)
    .replace(/\{\{SITE\}\}/g, esc(process.env.PUBLIC_URL || "code-quests.up.railway.app"));
}
app.get(["/privacy", "/privacy.html"], (req, res) => res.type("html").send(renderLegal("privacy.html")));
app.get(["/terms", "/terms.html"], (req, res) => res.type("html").send(renderLegal("terms.html")));
/**
 * คอมไพเลอร์ C++ ในเบราว์เซอร์ (@yowasp/clang ~100MB ดิบ) — ติดตั้งผ่าน npm ไม่ commit ลง git
 * บีบอัดเป็น brotli/gzip ครั้งแรกที่เซิร์ฟเวอร์เริ่ม (ทำเบื้องหลัง) แล้วส่งตาม Accept-Encoding → ~20MB ต่อผู้เรียน และ cache ถาวร
 */
const zlib = require("zlib");
const CLANG_DIR = path.join(__dirname, "node_modules/@yowasp/clang/gen");
// แพ็กเกจกำหนด "exports" ไว้ จึง require("@yowasp/clang/package.json") ไม่ได้ → อ่านไฟล์โดยตรง
const CLANG_VER = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "node_modules/@yowasp/clang/package.json"), "utf8")).version; } catch { return null; } })();
if (!CLANG_VER) console.warn("[cpp] ไม่พบ @yowasp/clang — โลก C++ จะคอมไพล์ไม่ได้ (รัน npm install)");
const CLANG_FILES = { "bundle.js": "text/javascript", "llvm.core.wasm": "application/wasm", "llvm.core2.wasm": "application/wasm",
  "llvm.core3.wasm": "application/wasm", "llvm.core4.wasm": "application/wasm", "llvm-resources.tar": "application/x-tar" };
const PRECOMP_DIR = path.join(require("os").tmpdir(), "cq-clang-" + (CLANG_VER || "none"));
const precompressed = {};   // file → { br: path, gz: path }
function precompressClang() {
  if (!CLANG_VER) return;
  fs.mkdirSync(PRECOMP_DIR, { recursive: true });
  const jobs = [];
  for (const f of Object.keys(CLANG_FILES)) for (const [enc, ext, make] of [["gz", ".gz", () => zlib.createGzip({ level: 6 })],
    ["br", ".br", () => zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })]]) {
    const out = path.join(PRECOMP_DIR, f + ext);
    if (fs.existsSync(out)) { (precompressed[f] = precompressed[f] || {})[enc] = out; continue; }
    jobs.push(() => new Promise(res => {
      const tmp = out + ".part";
      fs.createReadStream(path.join(CLANG_DIR, f)).pipe(make()).pipe(fs.createWriteStream(tmp))
        .on("finish", () => { fs.renameSync(tmp, out); (precompressed[f] = precompressed[f] || {})[enc] = out; res(); }).on("error", () => res());
    }));
  }
  jobs.reduce((p, j) => p.then(j), Promise.resolve()).then(() => jobs.length && console.log("[cpp] บีบอัดคอมไพเลอร์ C++ เสร็จ"));
}
precompressClang();
app.get("/vendor/clang/:ver/:file", (req, res) => {
  const type = CLANG_FILES[req.params.file];
  if (!CLANG_VER || !type) return res.status(404).end();
  res.set({ "Content-Type": type, "Cache-Control": req.params.ver === CLANG_VER ? "public, max-age=31536000, immutable" : "no-cache", "Vary": "Accept-Encoding" });
  const acc = String(req.get("accept-encoding") || ""), pc = precompressed[req.params.file] || {};
  if (/\bbr\b/.test(acc) && pc.br) { res.set("Content-Encoding", "br"); return res.sendFile(pc.br); }
  if (/\bgzip\b/.test(acc) && pc.gz) { res.set("Content-Encoding", "gzip"); return res.sendFile(pc.gz); }
  res.sendFile(path.join(CLANG_DIR, req.params.file));
});
app.use("/vendor/wasi-shim", express.static(path.join(__dirname, "node_modules/@bjorn3/browser_wasi_shim/dist"), { maxAge: "7d" }));
app.use(express.static(path.join(__dirname, "public"), { index: false }));

/* ---------------- Database ---------------- */
let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : false,
  });
} else {
  console.warn(
    "⚠️  ไม่พบ DATABASE_URL — เกมยังเล่นแบบผู้เยี่ยมชมได้ แต่ระบบสมาชิกจะใช้ไม่ได้"
  );
}

/** กันอีเมลซ้ำแบบไม่สนตัวพิมพ์ — ตรวจข้อมูลซ้ำก่อนสร้าง index (ถ้ามีจะแจ้งใน log และไม่หยุดเซิร์ฟเวอร์) */
async function ensureEmailUniqueIndex() {
  const dup = await pool.query(`SELECT lower(email) AS e, COUNT(*)::int AS n FROM users GROUP BY lower(email) HAVING COUNT(*) > 1`);
  if (dup.rows.length) {
    console.warn("[migration] พบอีเมลซ้ำ (ต่างกันแค่ตัวพิมพ์) " + dup.rows.length + " รายการ — ยังไม่สร้าง unique index ให้แก้ข้อมูลก่อน:", dup.rows.map(r => r.e).join(", "));
    return;
  }
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email))`);
}

async function initDb() {
  if (!pool) return;
  // migration: โครงสร้างเวอร์ชันแรกไม่มีคอลัมน์ topic — ถ้าเจอให้สร้างตารางใหม่
  await pool.query(`
    DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'progress')
         AND NOT EXISTS (SELECT 1 FROM information_schema.columns
                         WHERE table_name = 'progress' AND column_name = 'topic') THEN
        DROP TABLE progress;
      END IF;
    END $$;
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name  TEXT NOT NULL,
      xp            INTEGER NOT NULL DEFAULT 0,
      level         INTEGER NOT NULL DEFAULT 1,
      avatar        TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_hash TEXT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_expires TIMESTAMPTZ;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_attempts INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_sent_at TIMESTAMPTZ;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS token_version INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
    UPDATE users SET email_verified_at = COALESCE(email_verified_at, created_at) WHERE email_verified AND email_verified_at IS NULL;
    CREATE TABLE IF NOT EXISTS user_sessions (
      id           TEXT PRIMARY KEY,
      user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      user_agent   TEXT,
      revoked_at   TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS user_sessions_user_idx ON user_sessions (user_id);
    CREATE TABLE IF NOT EXISTS user_settings (
      user_id    INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      prefs      JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS auth_identities (
      id               SERIAL PRIMARY KEY,
      user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      provider         TEXT NOT NULL,
      provider_user_id TEXT NOT NULL,
      email_at_link    TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (provider, provider_user_id),
      UNIQUE (user_id, provider)
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      language  TEXT NOT NULL,
      topic     TEXT NOT NULL,
      stage     INTEGER NOT NULL,
      completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, language, topic, stage)
    );
    CREATE TABLE IF NOT EXISTS rooms (
      id         SERIAL PRIMARY KEY,
      code       TEXT UNIQUE NOT NULL,
      host_name  TEXT NOT NULL,
      host_token TEXT NOT NULL,
      title      TEXT NOT NULL,
      stages     JSONB NOT NULL,
      status     TEXT NOT NULL DEFAULT 'lobby',
      started_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS room_members (
      id         SERIAL PRIMARY KEY,
      room_id    INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
      token      TEXT NOT NULL,
      name       TEXT NOT NULL,
      user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
      score      INTEGER NOT NULL DEFAULT 0,
      solved     INTEGER NOT NULL DEFAULT 0,
      done_keys  JSONB NOT NULL DEFAULT '[]'::jsonb,
      finished_at TIMESTAMPTZ,
      joined_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (room_id, token)
    );
    ALTER TABLE rooms ADD COLUMN IF NOT EXISTS time_limit INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE rooms ADD COLUMN IF NOT EXISTS hints BOOLEAN NOT NULL DEFAULT true;
    ALTER TABLE rooms ADD COLUMN IF NOT EXISTS levels JSONB NOT NULL DEFAULT '[1,2,3]'::jsonb;
  `);
  console.log("✅ Database พร้อมใช้งาน");
}

/* ---------------- Game rules (server-side, กันโกง XP) ---------------- */
/**
 * เวอร์ชันเนื้อหา — ต้องตรงกับ CONTENT_VERSION ใน public/index.html
 * ถ้าไม่ตรง หน้าเกมจะแสดงแถบเตือนว่า deploy ไม่ครบทุกไฟล์
 */
const CONTENT_VERSION = 61;

/**
 * XP ของแต่ละด่าน: STAGE_XP[ภาษา][หัวข้อ][ด่าน]
 * ⚠️ ต้องตรงกับค่า xp ในเนื้อหาฝั่งเกม (public/index.html)
 */
const STAGE_XP = {
  python: {
    intro: [70, 70],
    print: [30, 40, 40, 50, 50, 60, 50, 60, 60],
    variable: [40, 40, 50, 50, 60, 60, 60],
    datatype: [40, 50, 40, 50, 50, 60],
    string: [40, 40, 50, 60, 60, 60, 60, 80, 60],
    list: [40, 50, 50, 50, 60, 60, 60],
    tupleset: [50, 50, 60, 60, 60, 60],
    dict: [50, 50, 50, 60, 50, 60],
    operator: [40, 40, 50, 50, 60, 60, 60],
    ifelse: [50, 60, 60, 50, 60, 60, 80, 60],
    loop: [50, 60, 60, 60, 60, 80, 60, 80, 60],
    flowchart: [80, 80, 100, 100, 60],
    function: [60, 60, 80, 80, 80, 80, 60],
    exception: [60, 80, 80, 60],
    oop: [80, 80, 80, 100, 60],
    filehandling: [60, 60, 70, 70, 90, 70],
    gui: [60, 60, 80, 80, 80, 70, 80, 100, 70],
    database: [70, 80, 80, 80, 90, 70],
    webapp: [90, 90, 70],
    api: [60, 70, 80, 80, 70],
    datascience: [70, 80, 100, 70],
  },
  c: {
    cintro: [30, 40, 40, 50, 50, 50, 50, 50, 60],
    cvs: [40, 40, 50, 50, 50, 50, 60],
    concept: [50, 50, 60, 80, 80, 60, 60, 80, 60],
    ctypes: [40, 50, 50, 50, 60, 60, 60, 60],
    coper: [40, 40, 50, 60, 60, 50, 60, 60],
    cio: [50, 50, 60, 60, 80, 60, 80, 50, 60],
    cctrl: [50, 60, 60, 60, 60, 80, 80, 100, 80, 80, 60, 80, 60],
    carray: [50, 50, 60, 80, 80, 60, 80, 80, 60],
    cptr: [60, 60, 80, 80, 100, 100, 60],
    cfunc: [60, 60, 80, 80, 100, 120, 80, 150, 60],
  },
  html: {
    hbasic: [30, 40, 50, 50, 40, 50, 60],
    htext: [40, 40, 50, 50, 50, 60, 60, 60],
    hlist: [40, 40, 60, 50, 50, 50, 60, 60],
    himg: [40, 50, 60, 60, 60, 60],
    htable: [40, 50, 60, 60, 80, 60],
    hform: [40, 50, 50, 60, 60, 60, 80, 100, 60],
    hsem: [60, 60, 50, 60, 60, 100, 60],
    hadv: [60, 60, 60, 60, 120, 60],
  },
  css: {
    cssbasic: [30, 40, 50, 50, 60, 40, 60],
    csstext: [40, 50, 50, 50, 50, 60, 60],
    cssbox: [40, 50, 50, 60, 60, 60, 60],
    csssel: [50, 50, 60, 60, 80, 80, 60],
    cssflex: [40, 50, 60, 50, 60, 80, 80, 60],
    cssgrid: [50, 50, 60, 80, 100, 60],
    csspos: [50, 80, 80, 60, 60, 60],
    cssadv: [60, 60, 60, 80, 80, 80, 120, 60],
  },
  js: {
    jsbasic: [30, 40, 40, 50, 60, 60, 60],
    jsop: [40, 50, 50, 50, 60, 60, 60],
    jsloop: [40, 50, 50, 60, 60, 60],
    jsfunc: [40, 50, 60, 60, 60, 80, 60],
    jsarray: [40, 50, 60, 60, 80, 60, 80, 100, 60],
    jsobj: [40, 50, 60, 60, 80, 80, 60],
    jsdom: [50, 60, 60, 80, 80, 60, 100, 80, 60],
    jsevent: [60, 80, 80, 100, 120, 60],
    jsadv: [60, 60, 60, 80, 100, 100, 150, 60],
  },
};
// C++ อยู่ไฟล์หลักสูตรแยก → สร้างตาราง XP จากไฟล์นั้นโดยตรง (แหล่งเดียว ไม่ต้องแก้มือเมื่อเพิ่มด่าน)
/**
 * โหมดทดสอบ migration (CQ_C_LEGACY_ONLY=1): จำลองสภาพ "ก่อน" เปลี่ยนเป็น C v2 — แสดงเฉพาะหัวข้อ C เดิม
 * ใช้ในชุดทดสอบ e2e-c-migration.js เท่านั้น และปฏิเสธบน production
 */
if (process.env.CQ_C_LEGACY_ONLY === "1") {
  if (process.env.RAILWAY_ENVIRONMENT === "production" || process.env.NODE_ENV === "production") throw new Error("CQ_C_LEGACY_ONLY ใช้บน production ไม่ได้");
  const c = GAME_COURSES.c;
  c.topics = c.legacyTopics; delete c.legacyTopics; delete c.compiler; delete c.version;
  console.warn("[test] CQ_C_LEGACY_ONLY: หลักสูตร C อยู่ในโหมดจำลองก่อน migration");
}
STAGE_XP.cpp = Object.fromEntries(require("./public/courses/cpp.js").topics.map(t => [t.id, t.stages.map(st => st.xp)]));
// หัวข้อปัจจุบันของ C ที่ยังไม่มีในตาราง (C v2) สร้าง XP จากข้อมูลคอร์ส · หัวข้อเดิมในตารางคงไว้ทั้งหมด
for (const t of GAME_COURSES.c.topics) if (!STAGE_XP.c[t.id]) STAGE_XP.c[t.id] = t.stages.map(st => st.xp);
const xpNeed = (level) => Math.round(100 * Math.pow(level, 1.5));

/** EXP สะสมทั้งหมด = EXP ที่ใช้ผ่านเลเวลก่อนๆ + EXP ปัจจุบัน (ใช้โชว์บน leaderboard) */
function totalXpOf(level, xp) {
  let t = xp;
  for (let l = 1; l < level; l++) t += xpNeed(l);
  return t;
}

function applyXp(xp, level, gain) {
  xp += gain;
  let leveledUp = false;
  while (xp >= xpNeed(level)) {
    xp -= xpNeed(level);
    level++;
    leveledUp = true;
  }
  return { xp, level, leveledUp };
}

/* ---------------- Auth helpers ---------------- */
/**
 * ออก session ใหม่ (หรือใช้ sid เดิมเมื่อ keepSid) แล้วตั้ง cookie
 * บันทึกเฉพาะ user agent เพื่อแสดงชื่ออุปกรณ์ — ไม่เก็บ IP หรือตำแหน่ง
 */
async function setToken(req, res, user, opts = {}) {
  let sid = opts.keepSid || null;
  if (!sid && pool) {
    sid = crypto.randomBytes(18).toString("base64url");
    await pool.query(`INSERT INTO user_sessions (id, user_id, user_agent) VALUES ($1, $2, $3)`,
      [sid, user.id, String((req && req.get && req.get("user-agent")) || "").slice(0, 300)]);
  }
  const token = jwt.sign({ id: user.id, tv: user.token_version || 0, sid }, JWT_SECRET, { expiresIn: "30d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PROD,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

/** ตรวจ JWT + token_version (token เก่าที่ไม่มี tv ถือเป็น 0 → session ของผู้ใช้เดิมใช้ต่อได้หลังอัปเดต) */
async function sessionInfo(token) {
  if (!token) return null;
  let p;
  try { p = jwt.verify(token, JWT_SECRET); } catch { return null; }
  if (!pool) return { id: p.id, sid: null };
  const r = await pool.query(`SELECT token_version FROM users WHERE id = $1`, [p.id]);
  if (!r.rows.length || (r.rows[0].token_version || 0) !== (p.tv || 0)) return null;
  let createdAt = null;
  if (p.sid) {   // token รุ่นเก่าไม่มี sid → ใช้ได้ (ยกเลิกด้วย "ออกจากระบบทุกอุปกรณ์")
    const se = await pool.query(`SELECT user_id, created_at, last_seen_at, revoked_at FROM user_sessions WHERE id = $1`, [p.sid]);
    const row = se.rows[0];
    if (!row || row.revoked_at || row.user_id !== p.id) return null;
    createdAt = row.created_at;
    if (Date.now() - new Date(row.last_seen_at).getTime() > 5 * 60 * 1000)
      pool.query(`UPDATE user_sessions SET last_seen_at = now() WHERE id = $1`, [p.sid]).catch(() => {});
  }
  return { id: p.id, sid: p.sid || null, createdAt };
}
async function sessionUserId(token) { const s = await sessionInfo(token); return s ? s.id : null; }
async function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "ยังไม่ได้ล็อกอิน" });
  try {
    const si = await sessionInfo(token);
    if (!si) return res.status(401).json({ error: "เซสชันหมดอายุ กรุณาล็อกอินใหม่" });
    req.userId = si.id; req.sessionId = si.sid; req.sessionCreatedAt = si.createdAt;
    next();
  } catch (e) { next(e); }
}

function needDb(req, res, next) {
  if (!pool)
    return res
      .status(503)
      .json({ error: "เซิร์ฟเวอร์ยังไม่ได้เชื่อมต่อฐานข้อมูล" });
  next();
}

/** เหมือน auth แต่ไม่บังคับ — ใช้กับหน้า leaderboard ที่ดูได้ทั้งสมาชิกและผู้เยี่ยมชม */
async function optionalAuth(req, res, next) {
  try { const id = await sessionUserId(req.cookies.token); if (id) req.userId = id; } catch {}
  next();
}

/* ---------------- Routes ---------------- */
app.post("/api/register", needDb, rateLimit("register", 40, 10 * 60 * 1000, byIp), async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    const ec = await checkEmail(email, { allowTypo: !!email && (req.body || {}).confirmEmail === email });
    if (!ec.ok) return res.status(400).json({ error: ec.error, code: "EMAIL_" + String(ec.reason || "").toUpperCase(), suggestion: ec.suggestion });
    const pwErr = passwordProblem(password, email);
    if (pwErr) return res.status(400).json({ error: pwErr });
    if (!cleanName(name, 30))
      return res.status(400).json({ error: "กรุณาตั้งชื่อผู้เล่น" });

    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `INSERT INTO users (email, password_hash, display_name)
       VALUES ($1, $2, $3) RETURNING ${USER_COLS}`,
      [email.toLowerCase().trim(), hash, cleanName(name, 30)]
    );
    await setToken(req, res, rows[0]);
    let verification = null;
    if (mailer.enabled()) {
      const sent = await issueEmailCode(rows[0].id, email.toLowerCase().trim(), rows[0].display_name);
      verification = { required: true, sent: sent.ok };
    }
    res.json({ user: publicUser(rows[0]), progress: [], verification });
  } catch (e) {
    if (e.code === "23505")
      return res.status(409).json({ error: "อีเมลนี้มีบัญชีอยู่แล้ว — เข้าสู่ระบบแทน หรือใช้ “ดำเนินการต่อด้วย Google” ถ้าเคยสมัครด้วย Google", code: "EMAIL_TAKEN" });
    console.error(e);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
});

/* ---------------- เข้าสู่ระบบด้วย Google ---------------- */
const google = createGoogleAuth({ isProd: IS_PROD });
const DUMMY_HASH = bcrypt.hashSync("code-quest-timing-dummy", 10);
const SIGNED_COOKIE = { httpOnly: true, sameSite: "lax", secure: IS_PROD, path: "/" };
/** cookie อายุสั้นที่เซ็นด้วย JWT_SECRET (เก็บ state/nonce/PKCE และคำขอเชื่อมบัญชี) */
function setSigned(res, name, data, minutes) {
  res.cookie(name, jwt.sign(data, JWT_SECRET, { expiresIn: minutes * 60 }), Object.assign({ maxAge: minutes * 60 * 1000 }, SIGNED_COOKIE));
}
function readSigned(req, name) {
  try { return req.cookies[name] ? jwt.verify(req.cookies[name], JWT_SECRET) : null; } catch { return null; }
}
/** กลับหน้าเว็บด้วยผลลัพธ์แบบตายตัว (ไม่มี open redirect) */
const backTo = (res, auth, extra) => res.redirect("/?auth=" + encodeURIComponent(auth) + (extra ? "&" + new URLSearchParams(extra).toString() : ""));

app.get("/api/auth/config", (req, res) => res.json({ google: google.configured, emailVerification: mailer.enabled() }));

app.get("/api/auth/google/start", rateLimit("google-start", 30, 10 * 60 * 1000, byIp), async (req, res) => {
  if (!google.configured || !pool) return backTo(res, "google-error", { reason: "config" });
  try {
    const mockClaims = google.mock ? { sub: req.query.mock_sub, email: req.query.mock_email, email_verified: req.query.mock_verified !== "0", name: req.query.mock_name, nonce: req.query.mock_nonce } : null;
    if (mockClaims && !mockClaims.nonce) delete mockClaims.nonce;
    const { url, flow } = await google.begin(mockClaims);
    const mode = ["link", "reauth"].includes(req.query.mode) ? req.query.mode : "login";
    if (mode === "link") {
      const si = await sessionInfo(req.cookies.token);
      if (!si) return backTo(res, "google-error", { reason: "session", open: "settings" });
      flow.linkUid = si.id;
    }
    flow.mode = mode;
    if (req.query.open === "settings" || mode !== "login") flow.open = "settings";
    setSigned(res, "cq_goauth", flow, 10);
    res.redirect(url);
  } catch (e) { console.error("[google] start:", e.message); backTo(res, "google-error", { reason: "server" }); }
});

app.get("/api/auth/google/callback", rateLimit("google-cb", 30, 10 * 60 * 1000, byIp), async (req, res) => {
  const flow = readSigned(req, "cq_goauth");
  res.clearCookie("cq_goauth", SIGNED_COOKIE);   // ใช้ได้ครั้งเดียว
  if (req.query.error) return backTo(res, "google-error", { reason: "denied" });
  if (!flow || !req.query.state || req.query.state !== flow.state) return backTo(res, "google-error", { reason: "state" });
  let g;
  try { g = await google.complete(String(req.query.code || ""), flow); }
  catch (e) { console.warn("[google] ตรวจ token ไม่ผ่าน:", e.message); return backTo(res, "google-error", { reason: "token" }); }
  if (!g.email || !g.emailVerified) return backTo(res, "google-error", { reason: "unverified" });
  const openX = flow.open ? { open: flow.open } : null;
  if (flow.mode === "link") {
    // เชื่อม Google กับบัญชีที่ล็อกอินอยู่ (ผู้ใช้ยืนยันตัวตนทั้งสองฝั่งแล้ว)
    try {
      const si = await sessionInfo(req.cookies.token);
      if (!si || si.id !== flow.linkUid) return backTo(res, "google-error", { reason: "session", open: "settings" });
      const other = await pool.query(`SELECT user_id FROM auth_identities WHERE provider = 'google' AND provider_user_id = $1`, [g.sub]);
      if (other.rows.length && other.rows[0].user_id !== si.id) return backTo(res, "google-error", { reason: "linked-other", open: "settings" });
      if (!other.rows.length) {
        const has = await pool.query(`SELECT 1 FROM auth_identities WHERE user_id = $1 AND provider = 'google'`, [si.id]);
        if (has.rows.length) return backTo(res, "google-error", { reason: "already-linked", open: "settings" });
        await pool.query(`INSERT INTO auth_identities (user_id, provider, provider_user_id, email_at_link) VALUES ($1, 'google', $2, $3)`, [si.id, g.sub, g.email]);
      }
      return backTo(res, "google-linked", { open: "settings" });
    } catch (e) { console.error("[google] link:", e); return backTo(res, "google-error", { reason: "server", open: "settings" }); }
  }
  try {
    // (ก) เคยเข้าด้วย Google นี้แล้ว → บัญชีเดิม (อ้างอิง sub ไม่ใช่อีเมล)
    const idn = await pool.query(`SELECT user_id FROM auth_identities WHERE provider = 'google' AND provider_user_id = $1`, [g.sub]);
    if (idn.rows.length) {
      const u = (await pool.query(`SELECT ${USER_COLS} FROM users WHERE id = $1`, [idn.rows[0].user_id])).rows[0];
      await setToken(req, res, u);
      return backTo(res, "google-ok", openX);
    }
    // (ข) มีบัญชีอีเมลนี้อยู่แล้ว → ห้ามเชื่อมอัตโนมัติ ต้องพิสูจน์ความเป็นเจ้าของบัญชีเดิมก่อน
    const ex = await pool.query(`SELECT id, email_verified, (password_hash IS NOT NULL) AS has_password FROM users WHERE lower(email) = $1`, [g.email]);
    if (ex.rows.length) {
      setSigned(res, "cq_glink", { sub: g.sub, email: g.email }, 15);
      return backTo(res, "google-link", { email: maskEmail(g.email), claimable: ex.rows[0].email_verified ? "0" : "1" });
    }
    // (ค) ผู้ใช้ใหม่ → สร้างบัญชีที่ยืนยันอีเมลแล้ว ไม่มีรหัสผ่าน
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const name = cleanName(g.name, 30) || g.email.split("@")[0].slice(0, 30);
      const u = (await client.query(
        `INSERT INTO users (email, password_hash, display_name, email_verified, email_verified_at) VALUES ($1, NULL, $2, true, now()) RETURNING id`, [g.email, name])).rows[0];
      await client.query(`INSERT INTO auth_identities (user_id, provider, provider_user_id, email_at_link) VALUES ($1, 'google', $2, $3)`, [u.id, g.sub, g.email]);
      await client.query("COMMIT");
      await setToken(req, res, { id: u.id, token_version: 0 });
      return backTo(res, "google-ok", { new: "1" });
    } catch (e) { await client.query("ROLLBACK"); throw e; } finally { client.release(); }
  } catch (e) {
    console.error("[google] callback:", e);
    return backTo(res, "google-error", { reason: "server" });
  }
});

/**
 * ยึดบัญชีคืนด้วย Google — ใช้ได้เฉพาะบัญชีที่ "ยังไม่ยืนยันอีเมล"
 * เจ้าของอีเมลตัวจริง (Google ยืนยันแล้ว) อาจถูกคนอื่นสมัครอีเมลนี้ไว้ก่อน → เชื่อม Google, ยืนยันอีเมล,
 * ลบรหัสผ่านเดิมทิ้ง และยกเลิกทุก session เดิม (คนที่รู้รหัสเดิมเข้าไม่ได้อีก) · ความคืบหน้าในบัญชียังอยู่
 */
app.post("/api/auth/google/claim", needDb, rateLimit("google-claim", 10, 10 * 60 * 1000, byIp), async (req, res) => {
  const pending = readSigned(req, "cq_glink");
  if (!pending) return res.status(400).json({ error: "คำขอเชื่อมบัญชีหมดอายุ กรุณาเข้าสู่ระบบด้วย Google อีกครั้ง" });
  try {
    const u = (await pool.query(`SELECT id, email_verified FROM users WHERE lower(email) = $1`, [pending.email])).rows[0];
    if (!u) return res.status(404).json({ error: "ไม่พบบัญชี" });
    if (u.email_verified) return res.status(409).json({ error: "บัญชีนี้ยืนยันอีเมลแล้ว — เข้าสู่ระบบด้วยรหัสผ่านเดิมเพื่อเชื่อม Google", code: "NEEDS_PASSWORD" });
    await pool.query(`INSERT INTO auth_identities (user_id, provider, provider_user_id, email_at_link) VALUES ($1, 'google', $2, $3) ON CONFLICT DO NOTHING`, [u.id, pending.sub, pending.email]);
    const r = await pool.query(
      `UPDATE users SET email_verified = true, email_verified_at = now(), password_hash = NULL, email_code_hash = NULL, token_version = token_version + 1
       WHERE id = $1 RETURNING ${USER_COLS}`, [u.id]);
    res.clearCookie("cq_glink", SIGNED_COOKIE);
    await setToken(req, res, r.rows[0]);
    res.json({ user: publicUser(r.rows[0]), progress: await getProgress(u.id), claimed: true });
  } catch (e) { console.error(e); res.status(500).json({ error: "เชื่อมบัญชีไม่สำเร็จ" }); }
});
app.post("/api/auth/google/link/cancel", (req, res) => { res.clearCookie("cq_glink", SIGNED_COOKIE); res.json({ ok: true }); });

/* ═══════════════ บัญชีผู้ใช้: ภาพรวม · ความปลอดภัย · อุปกรณ์ · การตั้งค่า · ข้อมูลของฉัน ═══════════════ */

/**
 * ยืนยันตัวตนซ้ำก่อนทำรายการสำคัญ (ส่งออก/ลบบัญชี/ยกเลิกการเชื่อม Google)
 * บัญชีที่มีรหัสผ่าน → ต้องใส่รหัสผ่าน · บัญชี Google-only → session ต้องเพิ่งเข้าสู่ระบบภายใน 15 นาที
 */
async function recentAuthProblem(req) {
  const u = (await pool.query(`SELECT password_hash FROM users WHERE id = $1`, [req.userId])).rows[0];
  if (!u) return { status: 401, error: "ไม่พบผู้ใช้" };
  if (u.password_hash) {
    const ok = await bcrypt.compare(String((req.body || {}).password || ""), u.password_hash);
    return ok ? null : { status: 401, error: "รหัสผ่านไม่ถูกต้อง", code: "REAUTH_REQUIRED" };
  }
  const fresh = req.sessionCreatedAt && Date.now() - new Date(req.sessionCreatedAt).getTime() < 15 * 60 * 1000;
  return fresh ? null : { status: 401, error: "เพื่อความปลอดภัย กรุณาเข้าสู่ระบบด้วย Google อีกครั้งก่อนทำรายการนี้", code: "REAUTH_GOOGLE" };
}

/** แปลง user agent เป็นชื่ออุปกรณ์ที่อ่านง่าย (ไม่ใช้ไลบรารีเพิ่ม) */
function deviceLabel(ua) {
  ua = String(ua || "");
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /SamsungBrowser/.test(ua) ? "Samsung Internet" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "เบราว์เซอร์";
  const os = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Windows/.test(ua) ? "Windows" : /Mac OS X/.test(ua) ? "macOS" : /CrOS/.test(ua) ? "ChromeOS" : /Linux/.test(ua) ? "Linux" : "อุปกรณ์ไม่ทราบชนิด";
  const mobile = /Mobile|iPhone|Android/.test(ua) && !/iPad/.test(ua);
  return { browser, os, kind: /iPad|Tablet/.test(ua) ? "tablet" : mobile ? "mobile" : "desktop" };
}

/** การตั้งค่าที่รับได้ (อื่นนอกเหนือจากนี้ถูกทิ้ง) — ค่าแรกของแต่ละรายการคือค่าเริ่มต้น */
const PREF_SCHEMA = {
  fontScale: [100, 115, 130], highContrast: [false, true], reduceMotion: ["system", "on", "off"], strongFocus: [false, true], largeTargets: [false, true],
  sound: [true, false],
  editorFontSize: [16, 14, 18, 20, 22], editorTheme: ["dark", "light"], lineNumbers: [true, false], wordWrap: [false, true], tabSize: [4, 2],
  language: ["th"], dateCalendar: ["buddhist", "gregorian"], timeFormat: ["24", "12"],
  timezone: ["Asia/Bangkok", "Asia/Singapore", "Asia/Tokyo", "Asia/Kolkata", "Europe/London", "America/New_York", "UTC"],
  showOnLeaderboard: [true, false], notifyBadges: [true, false], notifyDaily: [true, false], notifyRoomJoin: [true, false],
};
function sanitizePrefs(input) {
  const out = {};
  for (const [k, allowed] of Object.entries(PREF_SCHEMA)) if (input && k in input && allowed.includes(input[k])) out[k] = input[k];
  return out;
}

app.get("/api/account/overview", needDb, auth, async (req, res) => {
  try {
    const u = (await pool.query(`SELECT ${USER_COLS}, created_at, email_verified_at FROM users WHERE id = $1`, [req.userId])).rows[0];
    if (!u) return res.status(401).json({ error: "ไม่พบผู้ใช้" });
    const ids = (await pool.query(`SELECT provider, email_at_link, created_at FROM auth_identities WHERE user_id = $1`, [req.userId])).rows;
    res.json({ user: publicUser(u), createdAt: u.created_at, emailVerifiedAt: u.email_verified_at,
      identities: ids.map(i => ({ provider: i.provider, email: maskEmail(i.email_at_link), linkedAt: i.created_at })),
      googleAvailable: google.configured, emailVerificationAvailable: mailer.enabled() });
  } catch (e) { console.error(e); res.status(500).json({ error: "โหลดข้อมูลบัญชีไม่สำเร็จ" }); }
});

/** เปลี่ยน/ตั้งรหัสผ่าน — บัญชี Google-only ตั้งครั้งแรกได้โดยไม่ต้องมีรหัสเดิม · ยกเลิก session อื่นทั้งหมด */
app.post("/api/account/password", needDb, auth, rateLimit("acct-pw", 10, 15 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    const u = (await pool.query(`SELECT password_hash, email FROM users WHERE id = $1`, [req.userId])).rows[0];
    if (!u) return res.status(401).json({ error: "ไม่พบผู้ใช้" });
    if (u.password_hash && !(await bcrypt.compare(String(currentPassword || ""), u.password_hash)))
      return res.status(401).json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" });
    const pwErr = passwordProblem(newPassword, u.email);
    if (pwErr) return res.status(400).json({ error: pwErr });
    const hash = await bcrypt.hash(newPassword, 10);
    const up = await pool.query(`UPDATE users SET password_hash = $1, token_version = token_version + 1 WHERE id = $2 RETURNING id, token_version`, [hash, req.userId]);
    await pool.query(`UPDATE user_sessions SET revoked_at = now() WHERE user_id = $1 AND id IS DISTINCT FROM $2 AND revoked_at IS NULL`, [req.userId, req.sessionId]);
    await setToken(req, res, up.rows[0], { keepSid: req.sessionId });
    res.json({ ok: true, firstPassword: !u.password_hash });
  } catch (e) { console.error(e); res.status(500).json({ error: "เปลี่ยนรหัสผ่านไม่สำเร็จ" }); }
});

app.get("/api/account/sessions", needDb, auth, async (req, res) => {
  try {
    const rows = (await pool.query(`SELECT id, created_at, last_seen_at, user_agent FROM user_sessions WHERE user_id = $1 AND revoked_at IS NULL ORDER BY last_seen_at DESC LIMIT 50`, [req.userId])).rows;
    res.json({ sessions: rows.map(r => Object.assign({ id: r.id, createdAt: r.created_at, lastSeenAt: r.last_seen_at, current: r.id === req.sessionId }, deviceLabel(r.user_agent))),
      legacyCurrent: !req.sessionId });
  } catch (e) { console.error(e); res.status(500).json({ error: "โหลดรายการอุปกรณ์ไม่สำเร็จ" }); }
});
app.post("/api/account/sessions/:id/revoke", needDb, auth, async (req, res) => {
  try {
    const r = await pool.query(`UPDATE user_sessions SET revoked_at = now() WHERE id = $1 AND user_id = $2 AND revoked_at IS NULL RETURNING id`, [req.params.id, req.userId]);
    if (!r.rows.length) return res.status(404).json({ error: "ไม่พบอุปกรณ์นี้" });
    if (req.params.id === req.sessionId) res.clearCookie("token");
    res.json({ ok: true, current: req.params.id === req.sessionId });
  } catch (e) { console.error(e); res.status(500).json({ error: "ออกจากระบบอุปกรณ์ไม่สำเร็จ" }); }
});
/** ออกจากระบบทุกอุปกรณ์อื่น (รวม token รุ่นเก่าที่ไม่มี sid) — อุปกรณ์นี้ยังใช้ต่อได้ */
app.post("/api/account/sessions/revoke-others", needDb, auth, async (req, res) => {
  try {
    await pool.query(`UPDATE user_sessions SET revoked_at = now() WHERE user_id = $1 AND id IS DISTINCT FROM $2 AND revoked_at IS NULL`, [req.userId, req.sessionId]);
    const up = await pool.query(`UPDATE users SET token_version = token_version + 1 WHERE id = $1 RETURNING id, token_version`, [req.userId]);
    await setToken(req, res, up.rows[0], { keepSid: req.sessionId });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ error: "ออกจากระบบอุปกรณ์อื่นไม่สำเร็จ" }); }
});

/** ยกเลิกการเชื่อม Google — ห้ามถ้าเป็นช่องทางเข้าสู่ระบบสุดท้าย (ไม่มีรหัสผ่าน) */
app.post("/api/account/google/unlink", needDb, auth, rateLimit("acct-unlink", 10, 15 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    const u = (await pool.query(`SELECT password_hash FROM users WHERE id = $1`, [req.userId])).rows[0];
    if (!u.password_hash) return res.status(400).json({ error: "Google เป็นช่องทางเข้าสู่ระบบเดียวของบัญชีนี้ — ตั้งรหัสผ่านก่อน จึงจะยกเลิกการเชื่อมได้", code: "LAST_METHOD" });
    const ra = await recentAuthProblem(req);
    if (ra) return res.status(ra.status).json({ error: ra.error, code: ra.code });
    const r = await pool.query(`DELETE FROM auth_identities WHERE user_id = $1 AND provider = 'google' RETURNING id`, [req.userId]);
    if (!r.rows.length) return res.status(404).json({ error: "บัญชีนี้ยังไม่ได้เชื่อม Google" });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ error: "ยกเลิกการเชื่อมไม่สำเร็จ" }); }
});

app.get("/api/account/prefs", needDb, auth, async (req, res) => {
  try {
    const r = await pool.query(`SELECT prefs, updated_at FROM user_settings WHERE user_id = $1`, [req.userId]);
    res.json({ prefs: r.rows.length ? sanitizePrefs(r.rows[0].prefs) : null, updatedAt: r.rows.length ? r.rows[0].updated_at : null });
  } catch (e) { console.error(e); res.status(500).json({ error: "โหลดการตั้งค่าไม่สำเร็จ" }); }
});
app.post("/api/account/prefs", needDb, auth, rateLimit("acct-prefs", 120, 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    const clean = sanitizePrefs((req.body || {}).prefs);
    const r = await pool.query(
      `INSERT INTO user_settings (user_id, prefs) VALUES ($1, $2::jsonb)
       ON CONFLICT (user_id) DO UPDATE SET prefs = user_settings.prefs || EXCLUDED.prefs, updated_at = now() RETURNING prefs`,
      [req.userId, JSON.stringify(clean)]);
    res.json({ prefs: sanitizePrefs(r.rows[0].prefs) });
  } catch (e) { console.error(e); res.status(500).json({ error: "บันทึกการตั้งค่าไม่สำเร็จ" }); }
});

/** ส่งออกข้อมูลของฉัน (JSON) — ไม่มี password hash / token / รหัสยืนยัน / secret */
app.post("/api/account/export", needDb, auth, rateLimit("acct-export", 5, 60 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    const ra = await recentAuthProblem(req);
    if (ra) return res.status(ra.status).json({ error: ra.error, code: ra.code });
    const q = (sql) => pool.query(sql, [req.userId]).then(r => r.rows);
    const [u] = await q(`SELECT email, display_name, level, xp, avatar, email_verified, email_verified_at, created_at FROM users WHERE id = $1`);
    const data = {
      exportedAt: new Date().toISOString(), service: "Code Quest",
      profile: { email: u.email, displayName: u.display_name, level: u.level, xp: u.xp, avatar: u.avatar, emailVerified: u.email_verified, emailVerifiedAt: u.email_verified_at, createdAt: u.created_at },
      linkedAccounts: (await q(`SELECT provider, email_at_link, created_at FROM auth_identities WHERE user_id = $1`)).map(i => ({ provider: i.provider, email: i.email_at_link, linkedAt: i.created_at })),
      settings: ((await q(`SELECT prefs FROM user_settings WHERE user_id = $1`))[0] || {}).prefs || {},
      progress: (await q(`SELECT language, topic, stage, completed_at FROM progress WHERE user_id = $1 ORDER BY completed_at`)).map(p => ({ language: p.language, topic: p.topic, stage: p.stage, completedAt: p.completed_at })),
      competitions: (await q(`SELECT r.code, r.title, m.name, m.score, m.solved, m.joined_at FROM room_members m JOIN rooms r ON r.id = m.room_id WHERE m.user_id = $1 ORDER BY m.joined_at`))
        .map(c => ({ room: c.code, title: c.title, nameInRoom: c.name, score: c.score, solved: c.solved, joinedAt: c.joined_at })),
      devices: (await q(`SELECT created_at, last_seen_at, user_agent, revoked_at FROM user_sessions WHERE user_id = $1 ORDER BY created_at`))
        .map(d => Object.assign({ signedInAt: d.created_at, lastActiveAt: d.last_seen_at, signedOutAt: d.revoked_at }, deviceLabel(d.user_agent))),
    };
    res.set("Cache-Control", "no-store");
    res.json(data);
  } catch (e) { console.error(e); res.status(500).json({ error: "ส่งออกข้อมูลไม่สำเร็จ" }); }
});

/**
 * ลบบัญชีถาวร — ยืนยันตัวตนซ้ำ + พิมพ์คำยืนยัน
 * ลบ: ผู้ใช้ ความคืบหน้า การเชื่อม Google อุปกรณ์ การตั้งค่า (CASCADE)
 * ประวัติห้องแข่ง: เปลี่ยนชื่อเป็น "ผู้เล่นที่ลบบัญชี" และตัดการเชื่อมกับบัญชี (คะแนนของผู้เล่นอื่นในห้องยังถูกต้อง)
 */
app.post("/api/account/delete", needDb, auth, rateLimit("acct-delete", 5, 60 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  const client = await pool.connect();
  try {
    if (String((req.body || {}).confirm || "").trim() !== "ลบบัญชี") return res.status(400).json({ error: "พิมพ์คำว่า “ลบบัญชี” เพื่อยืนยัน", code: "CONFIRM_REQUIRED" });
    const ra = await recentAuthProblem(req);
    if (ra) return res.status(ra.status).json({ error: ra.error, code: ra.code });
    await client.query("BEGIN");
    await client.query(`UPDATE room_members SET name = 'ผู้เล่นที่ลบบัญชี', user_id = NULL WHERE user_id = $1`, [req.userId]);
    await client.query(`DELETE FROM users WHERE id = $1`, [req.userId]);
    await client.query("COMMIT");
    res.clearCookie("token");
    res.json({ ok: true });
  } catch (e) { try { await client.query("ROLLBACK"); } catch {} console.error(e); res.status(500).json({ error: "ลบบัญชีไม่สำเร็จ" }); }
  finally { client.release(); }
});

/** เปลี่ยนอีเมล (เฉพาะบัญชีที่ยังไม่ยืนยัน เช่น พิมพ์อีเมลผิดตอนสมัคร) — ต้องยืนยันด้วยรหัสผ่าน */
app.post("/api/email/change", needDb, auth, rateLimit("email-change", 5, 60 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const u = (await pool.query(`SELECT id, display_name, password_hash, email_verified FROM users WHERE id = $1`, [req.userId])).rows[0];
    if (!u) return res.status(401).json({ error: "ไม่พบผู้ใช้" });
    if (u.email_verified) return res.status(400).json({ error: "บัญชีที่ยืนยันอีเมลแล้วเปลี่ยนอีเมลที่นี่ไม่ได้" });
    if (!u.password_hash || !(await bcrypt.compare(String(password || ""), u.password_hash))) return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
    const ec = await checkEmail(email);
    if (!ec.ok) return res.status(400).json({ error: ec.error, suggestion: ec.suggestion });
    const norm = String(email).trim().toLowerCase();
    try {
      await pool.query(`UPDATE users SET email = $1, email_code_hash = NULL, email_code_sent_at = NULL WHERE id = $2`, [norm, u.id]);
    } catch (e) { if (e.code === "23505") return res.status(409).json({ error: "อีเมลนี้มีบัญชีอยู่แล้ว" }); throw e; }
    let sent = null;
    if (mailer.enabled()) sent = (await issueEmailCode(u.id, norm, u.display_name)).ok;
    const r = await pool.query(`SELECT ${USER_COLS} FROM users WHERE id = $1`, [u.id]);
    res.json({ user: publicUser(r.rows[0]), sent });
  } catch (e) { console.error(e); res.status(500).json({ error: "เปลี่ยนอีเมลไม่สำเร็จ" }); }
});

/* ---------------- ยืนยันอีเมลด้วย OTP (ทำงานเมื่อตั้งค่าบริการส่งอีเมลแล้ว) ---------------- */
app.post("/api/email/send-code", needDb, auth, rateLimit("email-send", 5, 60 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    if (!mailer.enabled()) return res.status(400).json({ error: "ระบบยืนยันอีเมลยังไม่เปิดใช้งาน" });
    const u = (await pool.query(`SELECT id, email, display_name, email_verified, email_code_sent_at FROM users WHERE id = $1`, [req.userId])).rows[0];
    if (!u) return res.status(401).json({ error: "ไม่พบผู้ใช้" });
    if (u.email_verified) return res.json({ ok: true, alreadyVerified: true });
    const since = u.email_code_sent_at ? (Date.now() - new Date(u.email_code_sent_at).getTime()) / 1000 : 999;
    if (since < 60) return res.status(429).json({ error: "เพิ่งส่งรหัสไป รออีก " + Math.ceil(60 - since) + " วินาทีแล้วขอใหม่ได้", code: "RATE_LIMIT", retryAfter: Math.ceil(60 - since) });
    const sent = await issueEmailCode(u.id, u.email, u.display_name);
    if (!sent.ok) return res.status(502).json({ error: sent.error });
    res.json({ ok: true, ttlMinutes: mailer.CODE_TTL_MIN });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "ส่งรหัสไม่สำเร็จ" });
  }
});

app.post("/api/email/verify", needDb, auth, rateLimit("email-verify", 15, 10 * 60 * 1000, req => "u" + req.userId), async (req, res) => {
  try {
    const code = String((req.body || {}).code || "").trim();
    const u = (await pool.query(`SELECT id, email_verified, email_code_hash, email_code_expires, email_code_attempts FROM users WHERE id = $1`, [req.userId])).rows[0];
    if (!u) return res.status(401).json({ error: "ไม่พบผู้ใช้" });
    if (u.email_verified) return res.json({ ok: true, alreadyVerified: true });
    if (!u.email_code_hash || !u.email_code_expires || new Date(u.email_code_expires) < new Date())
      return res.status(400).json({ error: "รหัสหมดอายุแล้ว กดขอรหัสใหม่", code: "CODE_EXPIRED" });
    if (u.email_code_attempts >= mailer.MAX_ATTEMPTS)
      return res.status(400).json({ error: "กรอกผิดหลายครั้งเกินไป กดขอรหัสใหม่", code: "CODE_LOCKED" });
    if (!mailer.codeMatches(u.id, code, u.email_code_hash)) {
      await pool.query(`UPDATE users SET email_code_attempts = email_code_attempts + 1 WHERE id = $1`, [u.id]);
      const left = mailer.MAX_ATTEMPTS - u.email_code_attempts - 1;
      return res.status(400).json({ error: "รหัสไม่ถูกต้อง" + (left > 0 ? " (ลองได้อีก " + left + " ครั้ง)" : " — กดขอรหัสใหม่"), code: "CODE_WRONG" });
    }
    const { rows } = await pool.query(
      `UPDATE users SET email_verified = true, email_verified_at = now(), email_code_hash = NULL, email_code_expires = NULL, email_code_attempts = 0
       WHERE id = $1 RETURNING ${USER_COLS}`, [u.id]);
    res.json({ ok: true, user: publicUser(rows[0]) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "ยืนยันไม่สำเร็จ" });
  }
});

app.post("/api/login", needDb, rateLimit("login", 8, 60 * 1000, byIpEmail), rateLimit("login-ip", 120, 60 * 1000, byIp), async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const { rows } = await pool.query(
      `SELECT password_hash, ${USER_COLS} FROM users WHERE email = $1`,
      [(email || "").toLowerCase().trim()]
    );
    // เทียบกับ hash หลอกเมื่อไม่พบผู้ใช้หรือบัญชีไม่มีรหัสผ่าน → เวลาตอบใกล้เคียงกัน เดาไม่ได้ว่าอีเมลไหนมีบัญชี
    const hash = rows.length && rows[0].password_hash ? rows[0].password_hash : DUMMY_HASH;
    const okPw = await bcrypt.compare(String(password || ""), hash);
    if (!rows.length || !rows[0].password_hash || !okPw)
      return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });

    let user = rows[0], linked = false;
    const pending = readSigned(req, "cq_glink");
    if (pending && pending.email === String(email || "").toLowerCase().trim()) {
      // ผู้ใช้พิสูจน์ความเป็นเจ้าของบัญชีเดิมด้วยรหัสผ่านแล้ว และ Google ยืนยันอีเมลนี้แล้ว → เชื่อมได้อย่างปลอดภัย
      await pool.query(`INSERT INTO auth_identities (user_id, provider, provider_user_id, email_at_link) VALUES ($1, 'google', $2, $3) ON CONFLICT DO NOTHING`, [user.id, pending.sub, pending.email]);
      const u2 = await pool.query(`UPDATE users SET email_verified = true, email_verified_at = COALESCE(email_verified_at, now()), email_code_hash = NULL
                                   WHERE id = $1 RETURNING ${USER_COLS}`, [user.id]);
      user = u2.rows[0]; linked = true;
      res.clearCookie("cq_glink", SIGNED_COOKIE);
    }
    await setToken(req, res, user);
    const progress = await getProgress(user.id);
    res.json({ user: publicUser(user), progress, linked });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
});

app.post("/api/logout", async (req, res) => {
  // ยกเลิก session นี้ที่ฝั่งเซิร์ฟเวอร์ด้วย (token ที่ถูกขโมยไปใช้ต่อไม่ได้)
  try { const si = await sessionInfo(req.cookies.token); if (si && si.sid) await pool.query(`UPDATE user_sessions SET revoked_at = now() WHERE id = $1`, [si.sid]); } catch {}
  res.clearCookie("token");
  res.json({ ok: true });
});

app.get("/api/me", needDb, auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${USER_COLS} FROM users WHERE id = $1`,
      [req.userId]
    );
    if (!rows.length) return res.status(401).json({ error: "ไม่พบผู้ใช้" });
    const progress = await getProgress(req.userId);
    res.json({ user: publicUser(rows[0]), progress });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
});

/** บันทึกการผ่านด่าน — เซิร์ฟเวอร์เป็นคนคำนวณ XP เอง */
app.post("/api/complete", needDb, auth, requireVersion, rateLimit("complete", 60, 60 * 1000, req => "u" + req.userId), async (req, res) => {
  const client = await pool.connect();
  try {
    const { language, topic, stage, proof } = req.body || {};
    const table = STAGE_XP[language] && STAGE_XP[language][topic];
    if (!table || !Number.isInteger(stage) || stage < 0 || stage >= table.length)
      return res.status(400).json({ error: "ด่านไม่ถูกต้อง" });

    // เซิร์ฟเวอร์ตรวจคำตอบซ้ำเอง — ไม่เชื่อผลตรวจจาก browser
    const v = verify(language, topic, stage, proof);
    if (!v.ok) return res.status(422).json({ error: v.reason || "คำตอบยังไม่ถูกต้อง", code: "NOT_PASSED" });

    await client.query("BEGIN");
    const ins = await client.query(
      `INSERT INTO progress (user_id, language, topic, stage)
       VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING stage`,
      [req.userId, language, topic, stage]
    );
    const first = ins.rows.length > 0;

    // ด่านที่เคยผ่านแล้ว เล่นซ้ำไม่ได้ EXP — กันการกดรันซ้ำเพื่อฟาร์ม
    if (!first) {
      await client.query("COMMIT");
      const u = await client.query(
        `SELECT xp, level FROM users WHERE id = $1`,
        [req.userId]
      );
      return res.json({
        gained: 0,
        first: false,
        xp: u.rows[0].xp,
        level: u.rows[0].level,
        leveledUp: false,
      });
    }
    const gain = table[stage];

    const u = await client.query(
      `SELECT xp, level FROM users WHERE id = $1 FOR UPDATE`,
      [req.userId]
    );
    const next = applyXp(u.rows[0].xp, u.rows[0].level, gain);
    await client.query(`UPDATE users SET xp = $1, level = $2 WHERE id = $3`, [
      next.xp,
      next.level,
      req.userId,
    ]);
    await client.query("COMMIT");

    res.json({ gained: gain, first, verified: v.verified, ...next });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ error: "บันทึกความคืบหน้าไม่สำเร็จ" });
  } finally {
    client.release();
  }
});

/* ═══════════════ ระดับความยาก / Avatar ═══════════════ */
/** ★ ง่าย (≤50 EXP) · ★★ ปานกลาง (60–70) · ★★★ ท้าทาย (≥80) — หน้าเว็บใช้เกณฑ์เดียวกัน */
const difficultyOf = xp => (xp >= 80 ? 3 : xp >= 60 ? 2 : 1);
const AVATARS = ["🧑‍🚀", "👩‍🚀", "👨‍🚀", "🤖", "👾", "🐱", "🦊", "🐼", "🐸", "🦉", "🐙", "🦄"];
/** ของตกแต่งปลดล็อกด้วยเลเวล — ใช้ EXP ให้มีความหมายโดยไม่มีระบบซื้อขาย */
const ACCESSORIES = { "": 1, "🎓": 2, "🪖": 3, "👓": 5, "🎧": 7, "👑": 10, "🚀": 12, "✨": 15 };
function avatarProblem(value, level) {
  const m = /^emoji:([^|]+)(?:\|(.*))?$/.exec(value);
  if (!m || !AVATARS.includes(m[1])) return "ตัวละครไม่ถูกต้อง";
  const acc = m[2] || "";
  if (!(acc in ACCESSORIES)) return "ของตกแต่งไม่ถูกต้อง";
  if (level < ACCESSORIES[acc]) return "ต้องถึง LV." + ACCESSORIES[acc] + " ก่อนจึงจะใช้ของชิ้นนี้ได้";
  return null;
}
const publicAvatar = a => (typeof a === "string" && a.startsWith("emoji:") ? a : null); // รูปอัปโหลดใหญ่เกินกว่าจะส่งในรายการอันดับ

/* ═══════════════ โหมดห้องแข่งขัน (Competition Room) ═══════════════ */

/** สร้างรหัสห้อง 5 ตัวอักษร เลี่ยงตัวที่สับสนง่าย (0/O/1/I) */
function makeRoomCode() {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += A[Math.floor(Math.random() * A.length)];
  return s;
}

/**
 * สุ่มชุดด่านสำหรับการแข่ง จากตาราง STAGE_XP ฝั่งเซิร์ฟเวอร์
 * (สุ่มฝั่งเซิร์ฟเวอร์เพื่อให้ทุกคนในห้องได้โจทย์ชุดเดียวกันและตรวจคะแนนได้)
 */
function pickRoomStages(langs, count, levels) {
  const lv = Array.isArray(levels) && levels.length ? levels : [1, 2, 3];
  const pool = [];
  for (const lang of langs) {
    const topics = STAGE_XP[lang];
    if (!topics) continue;
    // สุ่มเฉพาะหัวข้อปัจจุบัน — หัวข้อ legacy ยังมี XP ในตาราง (ห้องเก่าและการตรวจคำตอบต้องใช้) แต่ไม่ถูกสุ่มเข้าห้องใหม่
    const current = new Set((GAME_COURSES[lang] ? GAME_COURSES[lang].topics : []).map(t => t.id));
    for (const topic of Object.keys(topics)) {
      if (!current.has(topic)) continue;
      const tObj = GAME_COURSES[lang].topics.find(t => t.id === topic);
      topics[topic].forEach((xp, stage) => {
        // ห้องแข่งขันต้องให้เซิร์ฟเวอร์ตรวจคำตอบเองได้ (คะแนนยุติธรรม): ด่านโค้ดที่คอมไพล์ด้วย Clang ฝั่งเบราว์เซอร์ (C v2) จึงไม่ถูกสุ่ม — ใช้เฉพาะด่านข้อสอบของหัวข้อนั้น
        const st = tObj && tObj.stages[stage];
        if (st && Array.isArray(st.tests) && !st.quiz) return;
        if (lv.includes(difficultyOf(xp))) pool.push({ language: lang, topic, stage, xp });
      });
    }
  }
  // คละให้ยากง่ายปนกัน แล้วเรียงจากง่ายไปยากเพื่อให้เกมไหลลื่น
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.max(1, Math.min(count, pool.length))).sort((a, b) => a.xp - b.xp);
}

const newToken = () => crypto.randomBytes(24).toString("hex");
const MIN_PLAYERS = 2;

/**
 * ข้อมูลห้องที่ส่งให้หน้าเว็บ — ไม่มี token ของใครหลุดออกไปเด็ดขาด
 * memberToken ใช้ระบุ "คุณ" บนกระดาน, hostToken ใช้ยืนยันสิทธิ์โฮสต์
 */
const publicRoom = (room, members, memberToken, hostToken) => ({
  code: room.code,
  title: room.title,
  status: room.status,
  hostName: room.host_name,
  isHost: !!hostToken && hostToken === room.host_token,
  total: room.stages.length,
  minPlayers: MIN_PLAYERS,
  timeLimit: room.time_limit || 0,
  hints: room.hints !== false,
  levels: room.levels || [1, 2, 3],
  endsAt: room.started_at && room.time_limit ? new Date(new Date(room.started_at).getTime() + room.time_limit * 60000).toISOString() : null,
  startedAt: room.started_at,
  serverNow: new Date().toISOString(),
  stages: room.status === "lobby" ? [] : room.stages.map(s => ({ language: s.language, topic: s.topic, stage: s.stage, xp: s.xp })),
  languages: [...new Set(room.stages.map(s => s.language))], // ภาษาที่ใช้แข่ง (ไม่เปิดเผยตัวโจทย์)
  members: members.map((m, i) => ({
    rank: i + 1,
    name: m.name,
    score: m.score,
    solved: m.solved,
    finished: !!m.finished_at,
    avatar: publicAvatar(m.user_avatar),
    isHost: m.id === Math.min(...members.map(x => x.id)), // โฮสต์คือสมาชิกคนแรกที่ถูกสร้างพร้อมห้อง
    isMe: !!memberToken && m.token === memberToken
  }))
});
const roomTokens = req => ({ member: String(req.get("X-Room-Token") || ""), host: String(req.get("X-Host-Token") || "") });

async function loadRoom(code) {
  const { rows } = await pool.query(`SELECT * FROM rooms WHERE code = $1`, [String(code || "").toUpperCase().slice(0, 8)]);
  const room = rows[0] || null;
  // หมดเวลาแข่งแล้ว → ปิดห้องอัตโนมัติ (เวลาอ้างอิงจากเซิร์ฟเวอร์เท่านั้น)
  if (room && room.status === "playing" && room.time_limit && room.started_at &&
      Date.now() > new Date(room.started_at).getTime() + room.time_limit * 60000) {
    await pool.query(`UPDATE rooms SET status = 'ended' WHERE id = $1`, [room.id]);
    room.status = "ended";
  }
  return room;
}
async function loadMembers(roomId) {
  const { rows } = await pool.query(
    `SELECT m.*, u.avatar AS user_avatar FROM room_members m LEFT JOIN users u ON u.id = m.user_id
     WHERE m.room_id = $1
     ORDER BY m.score DESC, m.solved DESC, COALESCE(m.finished_at, now()) ASC, m.joined_at ASC`,
    [roomId]
  );
  return rows;
}

/** สร้างห้อง — เซิร์ฟเวอร์สร้าง hostToken (สิทธิ์โฮสต์) และ memberToken (ตัวตนผู้เล่น) แยกกัน */
app.post("/api/rooms", needDb, optionalAuth, rateLimit("room-create", 20, 10 * 60 * 1000, byIp), async (req, res) => {
  try {
    const { name, title, languages, count, timeLimit, hints, levels } = req.body || {};
    const hostName = cleanName(name);
    const tl = [0, 5, 10, 15, 30].includes(parseInt(timeLimit)) ? parseInt(timeLimit) : 0;
    const lv = Array.isArray(levels) ? levels.map(Number).filter(x => [1, 2, 3].includes(x)) : [1, 2, 3];
    if (!hostName) return res.status(400).json({ error: "กรุณาใส่ชื่อผู้สร้างห้อง" });
    const langs = Array.isArray(languages) && languages.length ? languages.filter(l => STAGE_XP[l]) : Object.keys(STAGE_XP);
    if (!langs.length) return res.status(400).json({ error: "กรุณาเลือกภาษาอย่างน้อย 1 ภาษา" });
    const n = Math.max(3, Math.min(parseInt(count) || 10, 30));
    const stages = pickRoomStages(langs, n, lv.length ? lv : [1, 2, 3]);
    if (!stages.length) return res.status(400).json({ error: "ไม่มีโจทย์ตรงกับระดับความยากที่เลือก" });
    const hostToken = newToken(), memberToken = newToken();

    let room = null;
    for (let i = 0; i < 8 && !room; i++) {
      try {
        const r = await pool.query(
          `INSERT INTO rooms (code, host_name, host_token, title, stages, time_limit, hints, levels)
           VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8::jsonb) RETURNING *`,
          [makeRoomCode(), hostName, hostToken, cleanName(title, 60) || "ห้องแข่งเขียนโค้ด", JSON.stringify(stages), tl, hints !== false, JSON.stringify(lv.length ? lv : [1, 2, 3])]
        );
        room = r.rows[0];
      } catch (e) { if (e.code !== "23505") throw e; }
    }
    if (!room) return res.status(500).json({ error: "สร้างห้องไม่สำเร็จ ลองอีกครั้ง" });
    await pool.query(`INSERT INTO room_members (room_id, token, name, user_id) VALUES ($1, $2, $3, $4)`,
      [room.id, memberToken, hostName, req.userId || null]);
    res.json({ ...publicRoom(room, await loadMembers(room.id), memberToken, hostToken), hostToken, memberToken });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "สร้างห้องไม่สำเร็จ" });
  }
});

/**
 * เข้าร่วมห้อง — เข้าได้โดยไม่ต้องล็อกอิน
 * ถ้าส่ง X-Room-Token ที่เคยได้รับมาด้วย = เชื่อมต่อใหม่ (เช่น Wi-Fi หลุด) กลับเข้าตัวเดิมโดยคะแนนไม่หาย
 */
app.post("/api/rooms/:code/join", needDb, optionalAuth, rateLimit("room-join", 120, 60 * 1000, byIp), async (req, res) => {
  try {
    const memberName = cleanName((req.body || {}).name);
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้ — ตรวจรหัสอีกครั้ง" });
    const tk = roomTokens(req);

    if (tk.member) {
      const m = (await pool.query(`SELECT id FROM room_members WHERE room_id = $1 AND token = $2`, [room.id, tk.member])).rows[0];
      if (m) {
        if (memberName) await pool.query(`UPDATE room_members SET name = $1 WHERE id = $2`, [memberName, m.id]);
        return res.json({ ...publicRoom(room, await loadMembers(room.id), tk.member, tk.host), memberToken: tk.member, reconnected: true });
      }
    }
    if (!memberName) return res.status(400).json({ error: "กรุณาใส่ชื่อผู้เล่น" });
    if (room.status === "ended") return res.status(400).json({ error: "ห้องนี้จบการแข่งขันแล้ว" });
    if (room.status !== "lobby") return res.status(400).json({ error: "การแข่งขันเริ่มไปแล้ว เข้าร่วมไม่ได้" });
    const memberToken = newToken();
    await pool.query(`INSERT INTO room_members (room_id, token, name, user_id) VALUES ($1, $2, $3, $4)`,
      [room.id, memberToken, memberName, req.userId || null]);
    res.json({ ...publicRoom(room, await loadMembers(room.id), memberToken, tk.host), memberToken });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "เข้าห้องไม่สำเร็จ" });
  }
});

/** สถานะห้อง + กระดานคะแนนสด (หน้าเว็บเรียกซ้ำทุก 2.5 วินาที) */
app.get("/api/rooms/:code", needDb, async (req, res) => {
  try {
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    const tk = roomTokens(req);
    res.json(publicRoom(room, await loadMembers(room.id), tk.member, tk.host));
  } catch (e) {
    res.status(500).json({ error: "ดึงข้อมูลห้องไม่สำเร็จ" });
  }
});

/** โฮสต์เริ่มการแข่งขัน — ต้องมี hostToken ที่ถูกต้อง และผู้เล่นครบขั้นต่ำ */
app.post("/api/rooms/:code/start", needDb, async (req, res) => {
  try {
    const tk = roomTokens(req);
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    if (!tk.host || tk.host !== room.host_token) return res.status(403).json({ error: "เฉพาะผู้สร้างห้องเท่านั้นที่เริ่มได้" });
    const members = await loadMembers(room.id);
    if (room.status === "lobby" && members.length < MIN_PLAYERS)
      return res.status(400).json({ error: "ต้องมีผู้เล่นอย่างน้อย " + MIN_PLAYERS + " คนจึงจะเริ่มได้" });
    const { rows } = await pool.query(
      `UPDATE rooms SET status = 'playing', started_at = now() WHERE id = $1 AND status = 'lobby' RETURNING *`, [room.id]);
    const updated = rows[0] || room;
    res.json(publicRoom(updated, await loadMembers(updated.id), tk.member, tk.host));
  } catch (e) {
    res.status(500).json({ error: "เริ่มการแข่งขันไม่สำเร็จ" });
  }
});

/**
 * ผู้เล่นส่งคำตอบหนึ่งข้อ — เซิร์ฟเวอร์ตรวจคำตอบเอง แล้วคิดคะแนนเองทั้งหมด
 * คะแนน = XP ของด่าน + โบนัสความเร็ว (คิดจากเวลาเริ่มที่เซิร์ฟเวอร์บันทึก ไม่ใช่นาฬิกาเครื่องผู้เล่น)
 */
app.post("/api/rooms/:code/solve", needDb, requireVersion, rateLimit("room-solve", 60, 60 * 1000, req => String(req.get("X-Room-Token") || req.ip)), async (req, res) => {
  const client = await pool.connect();
  try {
    const { index, proof } = req.body || {};
    const tk = roomTokens(req);
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    if (room.status !== "playing") return res.status(400).json({ error: "ห้องนี้ยังไม่เริ่มหรือจบแล้ว" });
    const i = parseInt(index);
    if (!(i >= 0 && i < room.stages.length)) return res.status(400).json({ error: "ด่านไม่ถูกต้อง" });

    const s = room.stages[i];
    const v = verify(s.language, s.topic, s.stage, proof);
    if (!v.ok) return res.status(422).json({ error: v.reason || "คำตอบยังไม่ถูกต้อง", code: "NOT_PASSED" });

    await client.query("BEGIN");
    const m = (await client.query(`SELECT * FROM room_members WHERE room_id = $1 AND token = $2 FOR UPDATE`, [room.id, tk.member])).rows[0];
    if (!m) { await client.query("ROLLBACK"); return res.status(403).json({ error: "คุณไม่ได้อยู่ในห้องนี้" }); }
    const doneKeys = Array.isArray(m.done_keys) ? m.done_keys : [];
    if (doneKeys.includes(i)) { await client.query("COMMIT"); return res.json({ gained: 0, score: m.score, solved: m.solved, repeat: true }); }

    const base = s.xp || 50;
    const elapsedMin = room.started_at ? (Date.now() - new Date(room.started_at).getTime()) / 60000 : 0;
    const speedBonus = Math.round(base * 0.5 * Math.max(0, 1 - elapsedMin / 15));
    const gained = base + speedBonus;
    const nextKeys = doneKeys.concat([i]);
    const finished = nextKeys.length >= room.stages.length;
    const upd = await client.query(
      `UPDATE room_members SET score = score + $1, solved = $2, done_keys = $3::jsonb,
         finished_at = CASE WHEN $4 THEN now() ELSE finished_at END
       WHERE id = $5 RETURNING score, solved`,
      [gained, nextKeys.length, JSON.stringify(nextKeys), finished, m.id]
    );
    await client.query("COMMIT");
    if (finished) {
      const left = await pool.query(`SELECT COUNT(*)::int AS n FROM room_members WHERE room_id = $1 AND finished_at IS NULL`, [room.id]);
      if (left.rows[0].n === 0) await pool.query(`UPDATE rooms SET status = 'ended' WHERE id = $1`, [room.id]);
    }
    res.json({ gained, speedBonus, score: upd.rows[0].score, solved: upd.rows[0].solved, finished, verified: v.verified });
  } catch (e) {
    try { await client.query("ROLLBACK"); } catch {}
    console.error(e);
    res.status(500).json({ error: "บันทึกคะแนนไม่สำเร็จ" });
  } finally {
    client.release();
  }
});

/** โฮสต์ปิดการแข่งขันและประกาศผล */
app.post("/api/rooms/:code/end", needDb, async (req, res) => {
  try {
    const tk = roomTokens(req);
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    if (!tk.host || tk.host !== room.host_token) return res.status(403).json({ error: "เฉพาะผู้สร้างห้องเท่านั้นที่ปิดได้" });
    await pool.query(`UPDATE rooms SET status = 'ended' WHERE id = $1`, [room.id]);
    const updated = await loadRoom(req.params.code);
    res.json(publicRoom(updated, await loadMembers(updated.id), tk.member, tk.host));
  } catch (e) {
    res.status(500).json({ error: "ปิดห้องไม่สำเร็จ" });
  }
});

/** เช็คเวอร์ชันเนื้อหาของเซิร์ฟเวอร์ — ใช้ตรวจว่า deploy ครบทุกไฟล์ */
app.get("/api/version", (req, res) => {
  res.json({ version: CONTENT_VERSION });
});

/** ตารางอันดับ: เรียงตามเลเวล → XP → จำนวนด่านที่ผ่าน */
/**
 * ตารางอันดับ: ?period=all (ทั้งหมด เรียงตามเลเวล/EXP) หรือ ?period=week (EXP ที่ได้ใน 7 วันล่าสุด)
 * อันดับรายสัปดาห์ให้ผู้เล่นใหม่มีโอกาสแข่งขัน ไม่ต้องไล่คนที่สะสมมานานหลายเดือน
 * ส่งเฉพาะชื่อเล่นและตัวละคร — ไม่มีอีเมลหรือข้อมูลส่วนตัว
 */
app.get("/api/leaderboard", needDb, optionalAuth, async (req, res) => {
  try {
    const period = req.query.period === "week" ? "week" : "all";
    if (period === "week") {
      const { rows } = await pool.query(`
        SELECT u.id, u.display_name, u.level, u.xp, u.avatar, p.language, p.topic, p.stage
        FROM progress p JOIN users u ON u.id = p.user_id
        WHERE p.completed_at > now() - interval '7 days' AND u.id NOT IN (SELECT user_id FROM user_settings WHERE prefs->>'showOnLeaderboard' = 'false')` + (mailer.enabled() ? ` AND u.email_verified` : ``));
      const byUser = new Map();
      for (const r of rows) {
        const xp = (STAGE_XP[r.language] && STAGE_XP[r.language][r.topic] && STAGE_XP[r.language][r.topic][r.stage]) || 0;
        const u = byUser.get(r.id) || { id: r.id, name: r.display_name, level: r.level, avatar: publicAvatar(r.avatar), weekXp: 0, stages: 0 };
        u.weekXp += xp; u.stages++;
        byUser.set(r.id, u);
      }
      const all = [...byUser.values()].sort((x, y) => y.weekXp - x.weekXp || y.stages - x.stages);
      const top = all.slice(0, 20).map(u => ({ name: u.name, level: u.level, avatar: u.avatar, totalXp: u.weekXp, stages: u.stages, isMe: req.userId === u.id }));
      const mi = req.userId ? all.findIndex(u => u.id === req.userId) : -1;
      return res.json({ period, top, me: mi >= 0 ? { rank: mi + 1, name: all[mi].name, level: all[mi].level, totalXp: all[mi].weekXp } : null });
    }
    const { rows } = await pool.query(`
      SELECT u.id, u.display_name, u.level, u.xp, u.avatar, COUNT(p.stage)::int AS stages
      FROM users u
      LEFT JOIN progress p ON p.user_id = u.id
      WHERE u.id NOT IN (SELECT user_id FROM user_settings WHERE prefs->>'showOnLeaderboard' = 'false') ${mailer.enabled() ? "AND u.email_verified" : ""}
      GROUP BY u.id
      ORDER BY u.level DESC, u.xp DESC, stages DESC, u.created_at ASC
      LIMIT 20
    `);
    let me = null;
    if (req.userId) {
      const r = await pool.query(
        `SELECT rnk, display_name, level, xp FROM (
           SELECT id, display_name, level, xp, RANK() OVER (ORDER BY level DESC, xp DESC) AS rnk FROM users
         ) t WHERE id = $1`, [req.userId]);
      if (r.rows.length)
        me = { rank: Number(r.rows[0].rnk), name: r.rows[0].display_name, level: r.rows[0].level, xp: r.rows[0].xp, totalXp: totalXpOf(r.rows[0].level, r.rows[0].xp) };
    }
    res.json({
      period,
      top: rows.map(r => ({ name: r.display_name, level: r.level, xp: r.xp, avatar: publicAvatar(r.avatar), totalXp: totalXpOf(r.level, r.xp), stages: r.stages, isMe: req.userId === r.id })),
      me,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "โหลดตารางอันดับไม่สำเร็จ" });
  }
});

/** แก้ไขข้อมูลส่วนตัว: เปลี่ยนชื่อ และ/หรือ เปลี่ยนรหัสผ่าน */
app.post("/api/profile", needDb, auth, async (req, res) => {
  try {
    const { name, currentPassword, newPassword, avatar } = req.body || {};
    const { rows } = await pool.query(
      `SELECT password_hash FROM users WHERE id = $1`,
      [req.userId]
    );
    if (!rows.length) return res.status(401).json({ error: "ไม่พบผู้ใช้" });

    if (newPassword) {
      if (rows[0].password_hash) {   // บัญชีที่มีรหัสผ่านต้องยืนยันรหัสเดิม · บัญชี Google-only ตั้งรหัสครั้งแรกได้
        const ok = await bcrypt.compare(currentPassword || "", rows[0].password_hash);
        if (!ok) return res.status(401).json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" });
      }
      const pwErr = passwordProblem(newPassword, "");
      if (pwErr) return res.status(400).json({ error: pwErr });
      const hash = await bcrypt.hash(newPassword, 10);
      const up = await pool.query(`UPDATE users SET password_hash = $1, token_version = token_version + 1 WHERE id = $2 RETURNING id, token_version`, [hash, req.userId]);
      await pool.query(`UPDATE user_sessions SET revoked_at = now() WHERE user_id = $1 AND id IS DISTINCT FROM $2 AND revoked_at IS NULL`, [req.userId, req.sessionId]);
      await setToken(req, res, up.rows[0], { keepSid: req.sessionId });   // session นี้ใช้ต่อได้ · เครื่องอื่นถูกยกเลิก
    }

    if (name !== undefined) {
      if (!name || !name.trim())
        return res.status(400).json({ error: "กรุณาตั้งชื่อผู้เล่น" });
      await pool.query(`UPDATE users SET display_name = $1 WHERE id = $2`, [
        cleanName(name, 30),
        req.userId,
      ]);
    }

    if (avatar !== undefined) {
      if (avatar === null || avatar === "") {
        await pool.query(`UPDATE users SET avatar = NULL WHERE id = $1`, [req.userId]);
      } else {
        if (typeof avatar === "string" && avatar.startsWith("emoji:")) {
          const lvl = (await pool.query(`SELECT level FROM users WHERE id = $1`, [req.userId])).rows[0].level;
          const err = avatarProblem(avatar, lvl);
          if (err) return res.status(400).json({ error: err });
          await pool.query(`UPDATE users SET avatar = $1 WHERE id = $2`, [avatar, req.userId]);
        } else if (typeof avatar !== "string" || !/^data:image\/(png|jpeg|jpg|webp);base64,/.test(avatar))
          return res.status(400).json({ error: "ไฟล์รูปไม่ถูกต้อง (รองรับ PNG, JPG, WEBP)" });
        if (avatar.length > 1500000)
          return res.status(400).json({ error: "รูปมีขนาดใหญ่เกินไป (หลังย่อแล้วต้องไม่เกิน ~1MB)" });
        await pool.query(`UPDATE users SET avatar = $1 WHERE id = $2`, [avatar, req.userId]);
      }
    }

    const u = await pool.query(
      `SELECT ${USER_COLS} FROM users WHERE id = $1`,
      [req.userId]
    );
    res.json({ user: publicUser(u.rows[0]) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "บันทึกข้อมูลไม่สำเร็จ" });
  }
});

/* ---------------- Helpers ---------------- */
const USER_COLS = `id, display_name, xp, level, avatar, email_verified, email, token_version,
  (password_hash IS NOT NULL) AS has_password,
  EXISTS (SELECT 1 FROM auth_identities ai WHERE ai.user_id = users.id AND ai.provider = 'google') AS google_linked`;

/** แสดงอีเมลแบบปิดบางส่วน เช่น s*****t@gmail.com */
function maskEmail(e) {
  const [u, d] = String(e || "").split("@");
  if (!d) return "";
  return (u.length <= 2 ? u[0] + "*" : u[0] + "*".repeat(Math.min(u.length - 2, 5)) + u[u.length - 1]) + "@" + d;
}

/** ข้อมูลผู้ใช้ที่ส่งให้หน้าเว็บ — ไม่มี password hash / token / อีเมลเต็ม */
function publicUser(u) {
  return { name: u.display_name, xp: u.xp, level: u.level, avatar: u.avatar || null,
    emailVerified: !!u.email_verified, verifyEnabled: mailer.enabled(),
    emailMasked: maskEmail(u.email), hasPassword: u.has_password !== false, googleLinked: !!u.google_linked };
}

/** สร้างรหัสใหม่ เก็บ hash แล้วส่งอีเมล (ไม่ทำให้การสมัครล้มถ้าส่งไม่สำเร็จ) */
async function issueEmailCode(userId, email, name) {
  const code = mailer.newCode();
  await pool.query(
    `UPDATE users SET email_code_hash = $1, email_code_expires = now() + ($2 || ' minutes')::interval,
       email_code_attempts = 0, email_code_sent_at = now() WHERE id = $3`,
    [mailer.hashCode(userId, code), String(mailer.CODE_TTL_MIN), userId]);
  return mailer.sendVerificationCode(email, name, code);
}

async function getProgress(userId) {
  const { rows } = await pool.query(
    `SELECT language, topic, stage FROM progress WHERE user_id = $1`,
    [userId]
  );
  return rows;
}

/* ---------------- Start ---------------- */
initDb()
  .then(() => (pool ? ensureEmailUniqueIndex() : null))
  .catch((e) => console.error("Database init ล้มเหลว:", e.message))
  .finally(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Code Quest กำลังทำงานที่ http://localhost:${PORT}`)
    );
  });
