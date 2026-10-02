-- Migration: Email verification + Google sign-in (Code Quest v29–v30)
-- เซิร์ฟเวอร์รันส่วน UP ให้อัตโนมัติตอนเริ่มทำงาน (initDb) แบบ idempotent — ไฟล์นี้มีไว้เป็นเอกสารและสำหรับรันด้วยมือ
-- ทุกคำสั่งเป็นการ "เพิ่ม" ไม่ลบหรือแก้ข้อมูลเดิม: xp, level, display_name, avatar, progress, ประวัติห้องแข่ง อยู่ครบ

-- ======================== UP ========================
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified      BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at   TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_hash     TEXT;         -- HMAC ของรหัส OTP (ไม่เก็บรหัสจริง)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_expires  TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_code_sent_at  TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS token_version       INTEGER NOT NULL DEFAULT 0;  -- เพิ่มค่าเพื่อยกเลิกทุก session
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;                                   -- บัญชี Google-only ไม่มีรหัสผ่าน
UPDATE users SET email_verified_at = COALESCE(email_verified_at, created_at) WHERE email_verified AND email_verified_at IS NULL;

CREATE TABLE IF NOT EXISTS auth_identities (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider         TEXT NOT NULL,              -- 'google'
  provider_user_id TEXT NOT NULL,              -- Google "sub" (ไม่เปลี่ยนแม้ผู้ใช้เปลี่ยนอีเมล)
  email_at_link    TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_user_id),
  UNIQUE (user_id, provider)
);

-- อีเมลห้ามซ้ำแบบไม่สนตัวพิมพ์ — ตรวจก่อนว่ามีข้อมูลซ้ำไหม (เซิร์ฟเวอร์ตรวจให้อัตโนมัติและข้ามถ้าพบ):
--   SELECT lower(email), COUNT(*) FROM users GROUP BY lower(email) HAVING COUNT(*) > 1;
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email));

-- ======================= DOWN =======================
-- ย้อนกลับได้ แต่บัญชี Google-only (password_hash เป็น NULL) ต้องจัดการก่อน เพราะคอลัมน์จะกลับเป็น NOT NULL
-- DROP INDEX IF EXISTS users_email_lower_idx;
-- DROP TABLE IF EXISTS auth_identities;
-- DELETE FROM users WHERE password_hash IS NULL;   -- ⚠ ลบบัญชี Google-only พร้อมความคืบหน้า — ส่งออกข้อมูลก่อน
-- ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL;
-- ALTER TABLE users DROP COLUMN IF EXISTS token_version, DROP COLUMN IF EXISTS email_verified_at,
--   DROP COLUMN IF EXISTS email_code_sent_at, DROP COLUMN IF EXISTS email_code_attempts,
--   DROP COLUMN IF EXISTS email_code_expires, DROP COLUMN IF EXISTS email_code_hash, DROP COLUMN IF EXISTS email_verified;
