/* ชุดทดสอบคอร์สเว็บ: รันเฉลยของทุกด่านผ่าน jsdom แล้วให้ตัวตรวจของด่านตัดสิน */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");
const W = require("../public/web-run.js");
global.W = W;
global.eq = (out, s) => out.trim() === s;
global.lines = out => out.trim().split("\n").map(x => x.trim().replace(/\s+/g, " "));

const src = fs.readFileSync(path.join(__dirname, "../public/game.js"), "utf8");
const eq = global.eq, lines = global.lines;
const COURSES = eval("(" + src.match(/const COURSES = ({[\s\S]*?});\n\n\/\* ═══════════════ State/)[1] + ")");
const SOL = require("./sols-web.js");

function render(lang, code, stage) {
  const logs = [];
  const vc = new VirtualConsole();
  vc.on("log", (...a) => logs.push(a.map(x => (typeof x === "object" && x !== null) ? JSON.stringify(x) : String(x)).join(" ")));
  vc.on("jsdomError", () => {});
  const source = W.buildSource(lang, code, stage || {});
  const dom = new JSDOM(source, { runScripts: lang === "js" ? "dangerously" : undefined, virtualConsole: vc, pretendToBeVisual: true });
  return { doc: dom.window.document, logs };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let pass = 0, fail = 0;
  for (const lang of ["html", "css", "js"]) {
    for (const topic of COURSES[lang].topics) {
      for (let i = 0; i < topic.stages.length; i++) {
        const stage = topic.stages[i];
        const key = lang + ":" + topic.id + "/" + i;
        const sol = SOL[key];
        if (sol === undefined) { console.log("❌ " + key + " — ไม่มีเฉลย (" + stage.title + ")"); fail++; continue; }
        let r;
        try { r = render(lang, sol, stage); } catch (e) { console.log("❌ " + key + " — render พัง: " + e.message); fail++; continue; }
        if (lang === "js") await sleep(320);
        const out = lang === "js" ? r.logs.join("\n") : W.pageText(r.doc);
        let ok = false, err = "";
        try { ok = !!stage.check(out, sol, r.doc); } catch (e) { err = " (check โยน error: " + e.message + ")"; }
        if (ok) pass++;
        else { console.log("❌ " + key + " \"" + stage.title + "\" — เฉลยไม่ผ่าน" + err + (lang === "js" ? " | out: " + JSON.stringify(out) : "")); fail++; }
        // เทสต์เชิงลบ: starter ที่ยังไม่แก้ต้องไม่ผ่าน
        try {
          const r2 = render(lang, stage.starter || "", stage);
          if (lang === "js") await sleep(20);
          const out2 = lang === "js" ? r2.logs.join("\n") : W.pageText(r2.doc);
          if (stage.check(out2, stage.starter || "", r2.doc)) { console.log("⚠️ " + key + " — starter ที่ยังไม่แก้ดันผ่าน!"); fail++; }
        } catch {}
      }
    }
  }
  console.log("\nคอร์สเว็บ: ผ่าน " + pass + " / " + (pass + fail));
  process.exit(fail ? 1 : 0);
})();
