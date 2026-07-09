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
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
    CREATE TABLE IF NOT EXISTS progress (
      user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      language  TEXT NOT NULL,
      topic     TEXT NOT NULL,
      stage     INTEGER NOT NULL,
      completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, language, topic, stage)
    );
  `);
  console.log("✅ Database พร้อมใช้งาน");
}

/* ---------------- Game rules (server-side, กันโกง XP) ---------------- */
/**
 * เวอร์ชันเนื้อหา — ต้องตรงกับ CONTENT_VERSION ใน public/index.html
 * ถ้าไม่ตรง หน้าเกมจะแสดงแถบเตือนว่า deploy ไม่ครบทุกไฟล์
 */
const CONTENT_VERSION = 10;

/**
 * XP ของแต่ละด่าน: STAGE_XP[ภาษา][หัวข้อ][ด่าน]
 * ⚠️ ต้องตรงกับค่า xp ในเนื้อหาฝั่งเกม (public/index.html)
 */
const STAGE_XP = {
  python: {
    print:         [30, 40, 40, 50, 50, 50, 60, 50, 60],
    variable:      [40, 40, 50, 50, 60, 60, 60, 50, 60],
    input:         [50, 50, 60, 60, 80, 80],
    string:        [40, 50, 50, 60, 60, 60, 80, 60, 80],
    datastructure: [50, 50, 60, 60, 80, 80, 60, 80, 60, 80],
    operator:      [40, 40, 50, 50, 60, 50, 60, 50, 50],
    ifelse:        [50, 50, 60, 60, 80, 60, 80, 60, 80],
    loop:          [50, 60, 60, 80, 80, 100, 60, 80, 100, 60, 80],
    flowchart:     [80, 80, 100, 100, 100, 100, 100],
    function:      [60, 60, 80, 80, 100, 80, 100, 80, 100],
    project:       [120, 150, 200, 150, 200, 180, 180],
  },
  c: {
    cintro:  [30, 40, 40, 50, 50, 40, 50],
    cvs:     [40, 40, 50, 50, 50, 50],
    concept: [50, 50, 60, 60, 60, 60],
    ctypes:  [40, 50, 50, 50, 60, 60, 60],
    coper:   [40, 40, 50, 60, 60, 50, 60],
    cio:     [50, 50, 60, 60, 80, 60, 80],
    cctrl:   [50, 60, 60, 60, 60, 80, 80, 100, 80, 80],
    carray:  [50, 50, 60, 80, 80, 60, 80],
    cptr:    [60, 60, 80, 80, 100, 100],
    cfunc:   [60, 60, 80, 80, 100, 120, 80, 150],
  },
};
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
function setToken(res, user) {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "ยังไม่ได้ล็อกอิน" });
  try {
    req.userId = jwt.verify(token, JWT_SECRET).id;
    next();
  } catch {
    return res.status(401).json({ error: "เซสชันหมดอายุ กรุณาล็อกอินใหม่" });
  }
}

function needDb(req, res, next) {
  if (!pool)
    return res
      .status(503)
      .json({ error: "เซิร์ฟเวอร์ยังไม่ได้เชื่อมต่อฐานข้อมูล" });
  next();
}

/** เหมือน auth แต่ไม่บังคับ — ใช้กับหน้า leaderboard ที่ดูได้ทั้งสมาชิกและผู้เยี่ยมชม */
function optionalAuth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try { req.userId = jwt.verify(token, JWT_SECRET).id; } catch {}
  }
  next();
}

/* ---------------- Routes ---------------- */
app.post("/api/register", needDb, async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "รูปแบบอีเมลไม่ถูกต้อง" });
    if (!password || password.length < 6)
      return res
        .status(400)
        .json({ error: "รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร" });
    if (!name || !name.trim())
      return res.status(400).json({ error: "กรุณาตั้งชื่อผู้เล่น" });

    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `INSERT INTO users (email, password_hash, display_name)
       VALUES ($1, $2, $3) RETURNING id, display_name, xp, level, avatar`,
      [email.toLowerCase().trim(), hash, name.trim()]
    );
    setToken(res, rows[0]);
    res.json({ user: publicUser(rows[0]), progress: [] });
  } catch (e) {
    if (e.code === "23505")
      return res.status(409).json({ error: "อีเมลนี้ถูกใช้สมัครแล้ว" });
    console.error(e);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
});

app.post("/api/login", needDb, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const { rows } = await pool.query(
      `SELECT id, password_hash, display_name, xp, level, avatar FROM users WHERE email = $1`,
      [(email || "").toLowerCase().trim()]
    );
    if (!rows.length || !(await bcrypt.compare(password || "", rows[0].password_hash)))
      return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });

    setToken(res, rows[0]);
    const progress = await getProgress(rows[0].id);
    res.json({ user: publicUser(rows[0]), progress });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

app.get("/api/me", needDb, auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, display_name, xp, level, avatar FROM users WHERE id = $1`,
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
app.post("/api/complete", needDb, auth, async (req, res) => {
  const client = await pool.connect();
  try {
    const { language, topic, stage } = req.body || {};
    const table = STAGE_XP[language] && STAGE_XP[language][topic];
    if (!table || !Number.isInteger(stage) || stage < 0 || stage >= table.length)
      return res.status(400).json({ error: "ด่านไม่ถูกต้อง" });

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

    res.json({ gained: gain, first, ...next });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ error: "บันทึกความคืบหน้าไม่สำเร็จ" });
  } finally {
    client.release();
  }
});

/** เช็คเวอร์ชันเนื้อหาของเซิร์ฟเวอร์ — ใช้ตรวจว่า deploy ครบทุกไฟล์ */
app.get("/api/version", (req, res) => {
  res.json({ version: CONTENT_VERSION });
});

/** ตารางอันดับ: เรียงตามเลเวล → XP → จำนวนด่านที่ผ่าน */
app.get("/api/leaderboard", needDb, optionalAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT u.id, u.display_name, u.level, u.xp, COUNT(p.stage)::int AS stages
      FROM users u
      LEFT JOIN progress p ON p.user_id = u.id
      GROUP BY u.id
      ORDER BY u.level DESC, u.xp DESC, stages DESC, u.created_at ASC
      LIMIT 20
    `);
    let me = null;
    if (req.userId) {
      const r = await pool.query(
        `SELECT rnk, display_name, level, xp FROM (
           SELECT id, display_name, level, xp,
                  RANK() OVER (ORDER BY level DESC, xp DESC) AS rnk
           FROM users
         ) t WHERE id = $1`,
        [req.userId]
      );
      if (r.rows.length)
        me = {
          rank: Number(r.rows[0].rnk),
          name: r.rows[0].display_name,
          level: r.rows[0].level,
          xp: r.rows[0].xp,
          totalXp: totalXpOf(r.rows[0].level, r.rows[0].xp),
        };
    }
    res.json({
      top: rows.map((r) => ({
        name: r.display_name,
        level: r.level,
        xp: r.xp,
        totalXp: totalXpOf(r.level, r.xp),
        stages: r.stages,
        isMe: req.userId === r.id,
      })),
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
      const ok = await bcrypt.compare(currentPassword || "", rows[0].password_hash);
      if (!ok)
        return res.status(401).json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" });
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ error: "รหัสผ่านใหม่ต้องยาวอย่างน้อย 6 ตัวอักษร" });
      const hash = await bcrypt.hash(newPassword, 10);
      await pool.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [
        hash,
        req.userId,
      ]);
    }

    if (name !== undefined) {
      if (!name || !name.trim())
        return res.status(400).json({ error: "กรุณาตั้งชื่อผู้เล่น" });
      await pool.query(`UPDATE users SET display_name = $1 WHERE id = $2`, [
        name.trim().slice(0, 30),
        req.userId,
      ]);
    }

    if (avatar !== undefined) {
      if (avatar === null || avatar === "") {
        await pool.query(`UPDATE users SET avatar = NULL WHERE id = $1`, [req.userId]);
      } else {
        if (typeof avatar !== "string" || !/^data:image\/(png|jpeg|jpg|webp);base64,/.test(avatar))
          return res.status(400).json({ error: "ไฟล์รูปไม่ถูกต้อง (รองรับ PNG, JPG, WEBP)" });
        if (avatar.length > 1500000)
          return res.status(400).json({ error: "รูปมีขนาดใหญ่เกินไป (หลังย่อแล้วต้องไม่เกิน ~1MB)" });
        await pool.query(`UPDATE users SET avatar = $1 WHERE id = $2`, [avatar, req.userId]);
      }
    }

    const u = await pool.query(
      `SELECT display_name, xp, level, avatar FROM users WHERE id = $1`,
      [req.userId]
    );
    res.json({ user: publicUser(u.rows[0]) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "บันทึกข้อมูลไม่สำเร็จ" });
  }
});

/* ---------------- Helpers ---------------- */
function publicUser(u) {
  return { name: u.display_name, xp: u.xp, level: u.level, avatar: u.avatar || null };
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
  .catch((e) => console.error("Database init ล้มเหลว:", e.message))
  .finally(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Code Quest กำลังทำงานที่ http://localhost:${PORT}`)
    );
  });
