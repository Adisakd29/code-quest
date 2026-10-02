/**
 * google-oauth.js — เข้าสู่ระบบด้วย Google (OAuth 2.0 / OpenID Connect) แบบ Authorization Code + PKCE ฝั่งเซิร์ฟเวอร์
 *
 * ใช้ไลบรารีทางการ google-auth-library (ไม่เขียนโปรโตคอลเอง):
 *   - PKCE (S256) ด้วย generateCodeVerifierAsync
 *   - แลก code → token ด้วย client secret (อยู่บนเซิร์ฟเวอร์เท่านั้น)
 *   - verifyIdToken ตรวจ signature กับ public key ของ Google + issuer + audience (client id) + expiry
 * โค้ดของเราตรวจเพิ่ม: state (กัน login CSRF) · nonce (กัน replay) · email_verified = true
 *
 * Environment:
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET  — จาก Google Cloud Console (ห้ามใส่ใน source code / frontend)
 *   PUBLIC_URL                              — เช่น https://code-quests.up.railway.app (ใช้สร้าง redirect URI แบบตายตัว
 *                                             ไม่อ่านจาก Host header เพื่อกัน host header injection)
 *   GOOGLE_OAUTH_MOCK=1                     — โหมดจำลองสำหรับทดสอบอัตโนมัติ **ใช้ไม่ได้บน production**
 */
const crypto = require("crypto");
const { OAuth2Client, CodeChallengeMethod } = require("google-auth-library");

const ISSUERS = ["accounts.google.com", "https://accounts.google.com"];
const CALLBACK_PATH = "/api/auth/google/callback";

function createGoogleAuth({ isProd }) {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const publicUrl = String(process.env.PUBLIC_URL || "").replace(/\/+$/, "");
  const mockRequested = process.env.GOOGLE_OAUTH_MOCK === "1";
  if (mockRequested && isProd) console.error("[google-oauth] ปฏิเสธ GOOGLE_OAUTH_MOCK บน production — ปิดโหมดจำลอง");
  const mock = mockRequested && !isProd;
  const configured = mock || !!(clientId && clientSecret && publicUrl);
  const redirectUri = (mock && !publicUrl ? "" : publicUrl) + CALLBACK_PATH;
  const client = configured && !mock ? new OAuth2Client({ clientId, clientSecret, redirectUri }) : null;

  /**
   * เริ่มขั้นตอน: สร้าง state / nonce / PKCE แล้วคืน URL ของหน้ายินยอมของ Google
   * @returns {Promise<{ url: string, flow: { state: string, nonce: string, verifier: string } }>}
   */
  async function begin(mockClaims) {
    const state = crypto.randomBytes(24).toString("base64url");
    const nonce = crypto.randomBytes(24).toString("base64url");
    if (mock) {
      // จำลองว่า Google ยืนยันตัวตนแล้วส่ง code กลับมาที่ callback (claims มาจากผู้ทดสอบ)
      const code = "mock." + Buffer.from(JSON.stringify(mockClaims || {})).toString("base64url");
      return { url: CALLBACK_PATH + "?code=" + encodeURIComponent(code) + "&state=" + encodeURIComponent(state), flow: { state, nonce, verifier: "mock" } };
    }
    const { codeVerifier, codeChallenge } = await client.generateCodeVerifierAsync();
    const url = client.generateAuthUrl({
      scope: ["openid", "email", "profile"],
      state, nonce,
      code_challenge: codeChallenge,
      code_challenge_method: CodeChallengeMethod.S256,
      prompt: "select_account",
      access_type: "online",          // ไม่ขอ refresh token — ไม่ต้องเก็บ token ของ Google ไว้เลย
      include_granted_scopes: true,
    });
    return { url, flow: { state, nonce, verifier: codeVerifier } };
  }

  /**
   * จบขั้นตอน: แลก code แล้วตรวจ ID token — คืนข้อมูลตัวตนที่เชื่อถือได้
   * @returns {Promise<{ sub: string, email: string, emailVerified: boolean, name: string }>}
   */
  async function complete(code, flow) {
    let p;
    if (mock) {
      const claims = JSON.parse(Buffer.from(String(code).replace(/^mock\./, ""), "base64url").toString("utf8"));
      p = Object.assign({ iss: "https://accounts.google.com", aud: clientId || "mock-client", exp: Math.floor(Date.now() / 1000) + 300, nonce: flow.nonce }, claims);
      if (!ISSUERS.includes(p.iss)) throw new Error("issuer ไม่ถูกต้อง");
      if (p.aud !== (clientId || "mock-client")) throw new Error("audience ไม่ถูกต้อง");
      if (p.exp * 1000 < Date.now()) throw new Error("token หมดอายุ");
    } else {
      const { tokens } = await client.getToken({ code, codeVerifier: flow.verifier, redirect_uri: redirectUri });
      if (!tokens.id_token) throw new Error("ไม่ได้รับ id_token");
      const ticket = await client.verifyIdToken({ idToken: tokens.id_token, audience: clientId }); // signature + iss + aud + exp
      p = ticket.getPayload();
      if (!p || !ISSUERS.includes(p.iss)) throw new Error("issuer ไม่ถูกต้อง");
    }
    if (!p.nonce || !flow.nonce || p.nonce.length !== flow.nonce.length ||
        !crypto.timingSafeEqual(Buffer.from(p.nonce), Buffer.from(flow.nonce))) throw new Error("nonce ไม่ตรงกัน");
    if (!p.sub) throw new Error("ไม่มี sub");
    return { sub: String(p.sub), email: String(p.email || "").trim().toLowerCase(), emailVerified: p.email_verified === true || p.email_verified === "true", name: String(p.name || p.given_name || "") };
  }

  return { configured, mock, begin, complete, redirectUri };
}

module.exports = { createGoogleAuth, CALLBACK_PATH };
