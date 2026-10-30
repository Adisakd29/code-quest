#!/usr/bin/env node
/**
 * backup-progress.js — สำรองและตรวจสอบข้อมูลผู้เรียนก่อน/หลังเปลี่ยนหลักสูตร (เช่น C v2)
 *
 *   DATABASE_URL=... node scripts/backup-progress.js backup [ไฟล์ปลายทาง.json]
 *   DATABASE_URL=... node scripts/backup-progress.js verify ไฟล์สำรอง.json
 *
 * backup: export ตาราง users / progress / rooms / room_members / user_settings / auth_identities เป็น JSON
 *         พร้อม checksum (SHA-256) และสรุปจำนวนแถว · ไฟล์มี password hash → เก็บเป็นความลับ ห้าม commit
 * verify: เทียบฐานข้อมูลปัจจุบันกับไฟล์สำรอง — ทุกผู้ใช้ในไฟล์ต้องมี XP/level เท่าเดิม และทุกแถว progress เดิมต้องยังอยู่
 *         (แถวใหม่ที่เพิ่มหลังสำรองได้ ไม่ถือว่าผิด) · จบด้วย exit code 1 ถ้าพบความต่าง
 */
const fs = require("fs");
const crypto = require("crypto");
const { Pool } = require("pg");

const TABLES = ["users", "progress", "rooms", "room_members", "user_settings", "auth_identities"];
const sha = s => crypto.createHash("sha256").update(s).digest("hex");

async function exists(db, t) {
  const r = await db.query("SELECT to_regclass($1) AS t", ["public." + t]);
  return !!r.rows[0].t;
}

async function backup(db, file) {
  const data = { createdAt: new Date().toISOString(), tables: {}, counts: {}, checksums: {} };
  for (const t of TABLES) {
    if (!(await exists(db, t))) continue;
    const rows = (await db.query(`SELECT * FROM ${t}`)).rows;
    data.tables[t] = rows;
    data.counts[t] = rows.length;
    data.checksums[t] = sha(JSON.stringify(rows));
  }
  data.summary = {
    users: data.counts.users || 0,
    totalXp: (data.tables.users || []).reduce((n, u) => n + Number(u.xp || 0), 0),
    progressByLanguage: (data.tables.progress || []).reduce((m, p) => (m[p.language] = (m[p.language] || 0) + 1, m), {}),
  };
  const out = file || `backup-${data.createdAt.replace(/[:.]/g, "-")}.json`;
  fs.writeFileSync(out, JSON.stringify(data));
  fs.chmodSync(out, 0o600);
  console.log("สำรองแล้ว →", out);
  console.log("  แถว:", JSON.stringify(data.counts));
  console.log("  สรุป:", JSON.stringify(data.summary));
  return out;
}

async function verify(db, file) {
  const saved = JSON.parse(fs.readFileSync(file, "utf8"));
  let problems = 0;
  const bad = m => { problems++; if (problems <= 20) console.log("  ❌", m); };
  const users = new Map((await db.query("SELECT id, xp, level FROM users")).rows.map(u => [u.id, u]));
  for (const u of saved.tables.users || []) {
    const now = users.get(u.id);
    if (!now) { bad(`ผู้ใช้ ${u.id} หายไป`); continue; }
    // XP/level ลดลงไม่ได้ (เพิ่มได้ถ้ามีคนเล่นต่อระหว่าง deploy)
    if (Number(now.level) < Number(u.level) || (Number(now.level) === Number(u.level) && Number(now.xp) < Number(u.xp))) bad(`ผู้ใช้ ${u.id}: XP/level ลดลง (${u.level}/${u.xp} → ${now.level}/${now.xp})`);
  }
  const prog = new Set((await db.query("SELECT user_id, language, topic, stage FROM progress")).rows.map(p => `${p.user_id}|${p.language}|${p.topic}|${p.stage}`));
  let missing = 0;
  for (const p of saved.tables.progress || []) if (!prog.has(`${p.user_id}|${p.language}|${p.topic}|${p.stage}`)) { missing++; if (missing <= 5) bad(`progress หาย: ${p.user_id} ${p.language}/${p.topic}/${p.stage}`); }
  if (missing > 5) bad(`progress หายรวม ${missing} แถว`);
  console.log(problems ? `ตรวจแล้วพบปัญหา ${problems} จุด` : `ตรวจแล้ว: ผู้ใช้ ${(saved.tables.users || []).length} คน และ progress ${(saved.tables.progress || []).length} แถวจากไฟล์สำรองอยู่ครบ XP/level ไม่ลดลง ✓`);
  return problems === 0;
}

(async () => {
  const [cmd, file] = process.argv.slice(2);
  if (!process.env.DATABASE_URL || !["backup", "verify"].includes(cmd) || (cmd === "verify" && !file)) {
    console.log("ใช้: DATABASE_URL=... node scripts/backup-progress.js backup [ไฟล์.json] | verify ไฟล์.json");
    process.exit(2);
  }
  const db = new Pool({ connectionString: process.env.DATABASE_URL, ssl: /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL) ? false : { rejectUnauthorized: false } });
  try {
    if (cmd === "backup") await backup(db, file);
    else if (!(await verify(db, file))) process.exitCode = 1;
  } finally { await db.end(); }
})().catch(e => { console.error("ผิดพลาด:", e.message); process.exit(1); });
