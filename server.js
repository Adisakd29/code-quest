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
  `);
  console.log("✅ Database พร้อมใช้งาน");
}

/* ---------------- Game rules (server-side, กันโกง XP) ---------------- */
/**
 * เวอร์ชันเนื้อหา — ต้องตรงกับ CONTENT_VERSION ใน public/index.html
 * ถ้าไม่ตรง หน้าเกมจะแสดงแถบเตือนว่า deploy ไม่ครบทุกไฟล์
 */
const CONTENT_VERSION = 17;

/**
 * XP ของแต่ละด่าน: STAGE_XP[ภาษา][หัวข้อ][ด่าน]
 * ⚠️ ต้องตรงกับค่า xp ในเนื้อหาฝั่งเกม (public/index.html)
 */
const STAGE_XP = {
  python: {
    print:         [30, 40, 40, 50, 50, 60, 50, 60],
    variable:      [40, 40, 50, 50, 60, 60],
    datatype:      [40, 50, 40, 50, 50],
    string:        [40, 40, 50, 60, 60, 60, 60, 80],
    list:          [40, 50, 50, 50, 60, 60],
    tupleset:      [50, 50, 60, 60, 60],
    dict:          [50, 50, 50, 60, 50],
    operator:      [40, 40, 50, 50, 60, 60],
    ifelse:        [50, 60, 60, 50, 60, 60, 80],
    loop:          [50, 60, 60, 60, 60, 80, 60, 80],
    flowchart:     [80, 80, 100, 100],
    function:      [60, 60, 80, 80, 80, 80],
    exception:     [60, 80, 80],
    oop:           [80, 80, 80, 100],
  },
  c: {
    cintro:  [30, 40, 40, 50, 50, 50, 50, 50],
    cvs:     [40, 40, 50, 50, 50, 50],
    concept: [50, 50, 60, 80, 80, 60, 60, 80],
    ctypes:  [40, 50, 50, 50, 60, 60, 60],
    coper:   [40, 40, 50, 60, 60, 50, 60],
    cio:     [50, 50, 60, 60, 80, 60, 80, 50],
    cctrl:   [50, 60, 60, 60, 60, 80, 80, 100, 80, 80, 60, 80],
    carray:  [50, 50, 60, 80, 80, 60, 80, 80],
    cptr:    [60, 60, 80, 80, 100, 100],
    cfunc:   [60, 60, 80, 80, 100, 120, 80, 150],
  },
  html: {
    hbasic:  [30, 40, 50, 50, 40, 50],
    htext:   [40, 40, 50, 50, 50, 60, 60],
    hlist:   [40, 40, 60, 50, 50, 50, 60],
    himg:    [40, 50, 60, 60, 60],
    htable:  [40, 50, 60, 60, 80],
    hform:   [40, 50, 50, 60, 60, 60, 80, 100],
    hsem:    [60, 60, 50, 60, 60, 100],
    hadv:    [60, 60, 60, 60, 120],
  },
  css: {
    cssbasic: [30, 40, 50, 50, 60, 40],
    csstext:  [40, 50, 50, 50, 50, 60],
    cssbox:   [40, 50, 50, 60, 60, 60],
    csssel:   [50, 50, 60, 60, 80, 80],
    cssflex:  [40, 50, 60, 50, 60, 80, 80],
    cssgrid:  [50, 50, 60, 80, 100],
    csspos:   [50, 80, 80, 60, 60],
    cssadv:   [60, 60, 60, 80, 80, 80, 120],
  },
  js: {
    jsbasic: [30, 40, 40, 50, 60, 60],
    jsop:    [40, 50, 50, 50, 60, 60],
    jsloop:  [40, 50, 50, 60, 60],
    jsfunc:  [40, 50, 60, 60, 60, 80],
    jsarray: [40, 50, 60, 60, 80, 60, 80, 100],
    jsobj:   [40, 50, 60, 60, 80, 80],
    jsdom:   [50, 60, 60, 80, 80, 60, 100, 80],
    jsevent: [60, 80, 80, 100, 120],
    jsadv:   [60, 60, 60, 80, 100, 100, 150],
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
function pickRoomStages(langs, count) {
  const pool = [];
  for (const lang of langs) {
    const topics = STAGE_XP[lang];
    if (!topics) continue;
    for (const topic of Object.keys(topics)) {
      topics[topic].forEach((xp, stage) => pool.push({ language: lang, topic, stage, xp }));
    }
  }
  // คละให้ยากง่ายปนกัน แล้วเรียงจากง่ายไปยากเพื่อให้เกมไหลลื่น
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.max(1, Math.min(count, pool.length))).sort((a, b) => a.xp - b.xp);
}

const publicRoom = (room, members, token) => ({
  code: room.code,
  title: room.title,
  status: room.status,
  hostName: room.host_name,
  isHost: !!token && token === room.host_token,
  total: room.stages.length,
  startedAt: room.started_at,
  stages: room.status === "lobby" ? [] : room.stages.map(s => ({ language: s.language, topic: s.topic, stage: s.stage, xp: s.xp })),
  members: members.map((m, i) => ({
    rank: i + 1,
    name: m.name,
    score: m.score,
    solved: m.solved,
    finished: !!m.finished_at,
    isMe: !!token && m.token === token
  }))
});

async function loadRoom(code) {
  const { rows } = await pool.query(`SELECT * FROM rooms WHERE code = $1`, [String(code || "").toUpperCase()]);
  return rows[0] || null;
}
async function loadMembers(roomId) {
  const { rows } = await pool.query(
    `SELECT * FROM room_members WHERE room_id = $1
     ORDER BY score DESC, solved DESC, COALESCE(finished_at, now()) ASC, joined_at ASC`,
    [roomId]
  );
  return rows;
}

/** สร้างห้องใหม่ — ใครก็สร้างได้ (ไม่ต้องล็อกอิน) ผู้สร้างเป็นโฮสต์ */
app.post("/api/rooms", needDb, optionalAuth, async (req, res) => {
  try {
    const { name, title, languages, count, token } = req.body || {};
    const hostName = String(name || "").trim().slice(0, 30);
    const hostToken = String(token || "").trim().slice(0, 80);
    if (!hostName) return res.status(400).json({ error: "กรุณาใส่ชื่อผู้สร้างห้อง" });
    if (!hostToken) return res.status(400).json({ error: "token ไม่ถูกต้อง" });
    const langs = Array.isArray(languages) && languages.length
      ? languages.filter(l => STAGE_XP[l])
      : Object.keys(STAGE_XP);
    if (!langs.length) return res.status(400).json({ error: "กรุณาเลือกภาษาอย่างน้อย 1 ภาษา" });
    const n = Math.max(3, Math.min(parseInt(count) || 10, 30));
    const stages = pickRoomStages(langs, n);

    let code = "", room = null;
    for (let i = 0; i < 8 && !room; i++) {
      code = makeRoomCode();
      try {
        const r = await pool.query(
          `INSERT INTO rooms (code, host_name, host_token, title, stages)
           VALUES ($1, $2, $3, $4, $5::jsonb) RETURNING *`,
          [code, hostName, hostToken, String(title || "ห้องแข่งเขียนโค้ด").trim().slice(0, 60), JSON.stringify(stages)]
        );
        room = r.rows[0];
      } catch (e) { if (e.code !== "23505") throw e; }
    }
    if (!room) return res.status(500).json({ error: "สร้างห้องไม่สำเร็จ ลองอีกครั้ง" });

    await pool.query(
      `INSERT INTO room_members (room_id, token, name, user_id) VALUES ($1, $2, $3, $4)`,
      [room.id, hostToken, hostName, req.userId || null]
    );
    res.json(publicRoom(room, await loadMembers(room.id), hostToken));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "สร้างห้องไม่สำเร็จ" });
  }
});

/** เข้าร่วมห้องด้วยรหัส — เข้าได้แม้ไม่ได้ล็อกอิน (ใส่แค่ชื่อ) */
app.post("/api/rooms/:code/join", needDb, optionalAuth, async (req, res) => {
  try {
    const { name, token } = req.body || {};
    const memberName = String(name || "").trim().slice(0, 30);
    const memberToken = String(token || "").trim().slice(0, 80);
    if (!memberName) return res.status(400).json({ error: "กรุณาใส่ชื่อผู้เล่น" });
    if (!memberToken) return res.status(400).json({ error: "token ไม่ถูกต้อง" });
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้ — ตรวจรหัสอีกครั้ง" });
    if (room.status === "ended") return res.status(400).json({ error: "ห้องนี้จบการแข่งขันแล้ว" });

    const exists = await pool.query(`SELECT id FROM room_members WHERE room_id = $1 AND token = $2`, [room.id, memberToken]);
    if (!exists.rows.length) {
      if (room.status !== "lobby") return res.status(400).json({ error: "การแข่งขันเริ่มไปแล้ว เข้าร่วมไม่ได้" });
      await pool.query(
        `INSERT INTO room_members (room_id, token, name, user_id) VALUES ($1, $2, $3, $4)`,
        [room.id, memberToken, memberName, req.userId || null]
      );
    } else {
      await pool.query(`UPDATE room_members SET name = $1 WHERE room_id = $2 AND token = $3`, [memberName, room.id, memberToken]);
    }
    res.json(publicRoom(room, await loadMembers(room.id), memberToken));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "เข้าห้องไม่สำเร็จ" });
  }
});

/** ดูสถานะห้อง + กระดานคะแนนสด (ฝั่งหน้าเว็บเรียกซ้ำทุก 2 วินาที) */
app.get("/api/rooms/:code", needDb, async (req, res) => {
  try {
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    res.json(publicRoom(room, await loadMembers(room.id), String(req.query.token || "")));
  } catch (e) {
    res.status(500).json({ error: "ดึงข้อมูลห้องไม่สำเร็จ" });
  }
});

/** โฮสต์เริ่มการแข่งขัน */
app.post("/api/rooms/:code/start", needDb, async (req, res) => {
  try {
    const token = String((req.body || {}).token || "");
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    if (room.host_token !== token) return res.status(403).json({ error: "เฉพาะผู้สร้างห้องเท่านั้นที่เริ่มได้" });
    const { rows } = await pool.query(
      `UPDATE rooms SET status = 'playing', started_at = now() WHERE id = $1 AND status = 'lobby' RETURNING *`,
      [room.id]
    );
    const updated = rows[0] || room;
    res.json(publicRoom(updated, await loadMembers(updated.id), token));
  } catch (e) {
    res.status(500).json({ error: "เริ่มการแข่งขันไม่สำเร็จ" });
  }
});

/**
 * บันทึกว่าผู้เล่นทำด่านหนึ่งผ่าน — เซิร์ฟเวอร์คิดคะแนนเอง
 * คะแนน = XP ของด่าน + โบนัสความเร็ว (ยิ่งตอบเร็วยิ่งได้เพิ่ม สูงสุด 50%)
 */
app.post("/api/rooms/:code/solve", needDb, async (req, res) => {
  try {
    const { token, index } = req.body || {};
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    if (room.status !== "playing") return res.status(400).json({ error: "ห้องนี้ยังไม่เริ่มหรือจบแล้ว" });
    const i = parseInt(index);
    if (!(i >= 0 && i < room.stages.length)) return res.status(400).json({ error: "ด่านไม่ถูกต้อง" });

    const m = (await pool.query(`SELECT * FROM room_members WHERE room_id = $1 AND token = $2`, [room.id, String(token || "")])).rows[0];
    if (!m) return res.status(403).json({ error: "คุณไม่ได้อยู่ในห้องนี้" });
    const doneKeys = Array.isArray(m.done_keys) ? m.done_keys : [];
    if (doneKeys.includes(i)) return res.json({ gained: 0, score: m.score, solved: m.solved, repeat: true });

    const base = room.stages[i].xp || 50;
    const elapsedMin = room.started_at ? (Date.now() - new Date(room.started_at).getTime()) / 60000 : 0;
    const speedBonus = Math.round(base * 0.5 * Math.max(0, 1 - elapsedMin / 15)); // โบนัสลดลงจนหมดใน 15 นาที
    const gained = base + speedBonus;
    const nextKeys = doneKeys.concat([i]);
    const finished = nextKeys.length >= room.stages.length;

    const upd = await pool.query(
      `UPDATE room_members
       SET score = score + $1, solved = $2, done_keys = $3::jsonb,
           finished_at = CASE WHEN $4 THEN now() ELSE finished_at END
       WHERE id = $5 RETURNING score, solved`,
      [gained, nextKeys.length, JSON.stringify(nextKeys), finished, m.id]
    );
    if (finished) {
      const left = await pool.query(`SELECT COUNT(*)::int AS n FROM room_members WHERE room_id = $1 AND finished_at IS NULL`, [room.id]);
      if (left.rows[0].n === 0) await pool.query(`UPDATE rooms SET status = 'ended' WHERE id = $1`, [room.id]);
    }
    res.json({ gained, speedBonus, score: upd.rows[0].score, solved: upd.rows[0].solved, finished });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "บันทึกคะแนนไม่สำเร็จ" });
  }
});

/** โฮสต์ปิดการแข่งขัน (ประกาศผลทันที) */
app.post("/api/rooms/:code/end", needDb, async (req, res) => {
  try {
    const token = String((req.body || {}).token || "");
    const room = await loadRoom(req.params.code);
    if (!room) return res.status(404).json({ error: "ไม่พบห้องนี้" });
    if (room.host_token !== token) return res.status(403).json({ error: "เฉพาะผู้สร้างห้องเท่านั้นที่ปิดได้" });
    await pool.query(`UPDATE rooms SET status = 'ended' WHERE id = $1`, [room.id]);
    const updated = await loadRoom(req.params.code);
    res.json(publicRoom(updated, await loadMembers(updated.id), token));
  } catch (e) {
    res.status(500).json({ error: "ปิดห้องไม่สำเร็จ" });
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
