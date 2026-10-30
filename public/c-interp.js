/**
 * CRUN — ตัวแปลภาษา C ย่อส่วนสำหรับ Code Quest
 * รองรับ: int/float/double/char/void, printf/scanf, if/else, switch/case,
 * for/while/do-while, break/continue, อาร์เรย์ 1 มิติ, พอยน์เตอร์ (& * เลขคณิตพอยน์เตอร์),
 * ฟังก์ชัน (พารามิเตอร์/return/recursion), ++/--, casting, คอมเมนต์ // และ /* ... *​/
 * หน่วยความจำถูกจำลองจริง ทำให้พอยน์เตอร์ทำงานเหมือน C แท้ๆ
 */
const CRUN = (() => {
  const KEYWORDS = new Set(["int","float","double","char","void","if","else","for","while","do","return","break","continue","switch","case","default","const","long","short","unsigned","signed"]);
  const TYPEKW = new Set(["int","float","double","char","void","long","short","unsigned","signed","const"]);

  function cerr(line, msg) {
    const e = new Error((line ? "บรรทัด " + line + ": " : "") + msg);
    e.cerr = true;
    throw e;
  }
  const unesc = c => c === "n" ? "\n" : c === "t" ? "\t" : c === "0" ? "\0" : c === "r" ? "\r" : c;

  /* ---------------- Lexer ---------------- */
  function lex(src) {
    const toks = [];
    let i = 0, line = 1;
    const push = (t, v) => toks.push({ t, v, line });
    const OPS2 = ["==","!=","<=",">=","&&","||","++","--","+=","-=","*=","/=","%=","->"];
    while (i < src.length) {
      const c = src[i];
      if (c === "\n") { line++; i++; continue; }
      if (/\s/.test(c)) { i++; continue; }
      if (c === "#") { while (i < src.length && src[i] !== "\n") i++; continue; }
      if (c === "/" && src[i + 1] === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }
      if (c === "/" && src[i + 1] === "*") {
        i += 2;
        while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) { if (src[i] === "\n") line++; i++; }
        if (i >= src.length) cerr(line, "คอมเมนต์ /* ไม่มี */ ปิด");
        i += 2; continue;
      }
      if (/[A-Za-z_\u0e00-\u0e7f]/.test(c)) {
        let j = i;
        while (j < src.length && /[A-Za-z0-9_\u0e00-\u0e7f]/.test(src[j])) j++;
        const w = src.slice(i, j);
        push(KEYWORDS.has(w) ? w : "id", w);
        i = j; continue;
      }
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] || ""))) {
        let j = i, dot = false;
        while (j < src.length && (/[0-9]/.test(src[j]) || (src[j] === "." && !dot))) { if (src[j] === ".") dot = true; j++; }
        const numStr = src.slice(i, j);
        while (j < src.length && /[fFlLuU]/.test(src[j])) { if (/[fF]/.test(src[j])) dot = true; j++; }
        push("num", { val: parseFloat(numStr), isFloat: dot });
        i = j; continue;
      }
      if (c === '"') {
        let j = i + 1, s = "";
        while (j < src.length && src[j] !== '"') {
          if (src[j] === "\n") cerr(line, 'ข้อความในเครื่องหมาย " ห้ามขึ้นบรรทัดใหม่ (ลืมปิด " หรือเปล่า?)');
          if (src[j] === "\\") { s += unesc(src[j + 1]); j += 2; } else { s += src[j]; j++; }
        }
        if (j >= src.length) cerr(line, 'เครื่องหมายคำพูด " ไม่ปิด');
        push("str", s); i = j + 1; continue;
      }
      if (c === "'") {
        let j = i + 1, ch;
        if (src[j] === "\\") { ch = unesc(src[j + 1]); j += 2; } else { ch = src[j]; j++; }
        if (src[j] !== "'") cerr(line, "ตัวอักษรในเครื่องหมาย ' ต้องมีตัวเดียวและปิดด้วย '");
        push("num", { val: ch.charCodeAt(0), isFloat: false });
        i = j + 1; continue;
      }
      const two = src.substr(i, 2);
      if (OPS2.includes(two)) { push(two, two); i += 2; continue; }
      if ("+-*/%<>=!&|(){}[];,?:.".includes(c)) { push(c, c); i++; continue; }
      cerr(line, "ไม่รู้จักสัญลักษณ์ '" + c + "'");
    }
    push("eof", "");
    return toks;
  }

  /* ---------------- Parser ---------------- */
  function parse(toks) {
    let p = 0;
    const peek = (k = 0) => toks[p + k];
    const at = t => toks[p].t === t;
    const eat = t => {
      if (toks[p].t !== t) cerr(toks[p].line, "คาดว่าจะเจอ '" + t + "' แต่เจอ '" + (toks[p].v && toks[p].v.val !== undefined ? toks[p].v.val : toks[p].v || toks[p].t) + "'" + (t === ";" ? " — ลืมเครื่องหมาย ; ท้ายคำสั่งหรือเปล่า?" : ""));
      return toks[p++];
    };
    const isTypeStart = () => TYPEKW.has(toks[p].t) && toks[p].t !== "void" || toks[p].t === "void";

    function parseBaseType() {
      while (at("const") || at("unsigned") || at("signed")) p++;
      let base = null;
      if (at("long") || at("short")) { p++; if (at("int")) p++; base = "int"; }
      else if (at("int")) { p++; base = "int"; }
      else if (at("float")) { p++; base = "float"; }
      else if (at("double")) { p++; base = "double"; }
      else if (at("char")) { p++; base = "char"; }
      else if (at("void")) { p++; base = "void"; }
      else cerr(toks[p].line, "คาดว่าจะเจอชนิดข้อมูล (int, float, char, ...)");
      return base;
    }

    function parseProgram() {
      const fns = [], globals = [];
      while (!at("eof")) {
        const line = toks[p].line;
        let base, ptr = 0;
        if (at("id") && peek(1).t === "(") {
          base = "int"; // สไตล์ K&R ตามตำรา: main() ไม่ระบุชนิด ให้ถือเป็น int
        } else {
          base = parseBaseType();
          while (at("*")) { p++; ptr++; }
        }
        const name = eat("id").v;
        if (at("(")) {
          p++;
          const params = [];
          if (!at(")")) {
            while (true) {
              if (at("void") && peek(1).t === ")") { p++; break; }
              const pb = parseBaseType();
              let pptr = 0;
              while (at("*")) { p++; pptr++; }
              const pn = eat("id").v;
              if (at("[")) { p++; if (at("num")) p++; eat("]"); pptr = 1; }
              params.push({ base: pb, ptr: pptr, name: pn });
              if (at(",")) { p++; continue; }
              break;
            }
          }
          eat(")");
          if (at(";")) { p++; continue; } // prototype — ข้ามได้
          const body = parseBlock();
          fns.push({ k: "fn", ret: { base, ptr }, name, params, body, line });
        } else {
          const decl = parseDeclRest(base, ptr, name, line);
          eat(";");
          globals.push(decl);
        }
      }
      return { fns, globals };
    }

    function parseDeclRest(base, ptr, name, line) {
      const vars = [];
      let first = { name, ptr, arr: null, init: null };
      const finish = v => {
        if (at("[")) {
          p++;
          v.arr = at("]") ? -1 : eat("num").v.val;
          eat("]");
        }
        if (at("=")) {
          p++;
          if (at("{")) {
            p++;
            const items = [];
            if (!at("}")) { items.push(parseAssign()); while (at(",")) { p++; items.push(parseAssign()); } }
            eat("}");
            v.init = { k: "arrinit", items };
          } else v.init = parseAssign();
        }
      };
      finish(first);
      vars.push(first);
      while (at(",")) {
        p++;
        let vp = 0;
        while (at("*")) { p++; vp++; }
        const vn = eat("id").v;
        const v = { name: vn, ptr: vp, arr: null, init: null };
        finish(v);
        vars.push(v);
      }
      return { k: "decl", base, vars, line };
    }

    function parseBlock() {
      eat("{");
      const body = [];
      while (!at("}")) body.push(parseStmt());
      eat("}");
      return { k: "block", body };
    }

    function parseStmt() {
      const line = toks[p].line;
      if (at("{")) return parseBlock();
      if (at(";")) { p++; return { k: "empty" }; }
      if (isTypeStart()) {
        const base = parseBaseType();
        let ptr = 0;
        while (at("*")) { p++; ptr++; }
        const name = eat("id").v;
        const d = parseDeclRest(base, ptr, name, line);
        eat(";");
        return d;
      }
      if (at("if")) {
        p++; eat("(");
        const cond = parseExpr();
        eat(")");
        const then = parseStmt();
        let els = null;
        if (at("else")) { p++; els = parseStmt(); }
        return { k: "if", cond, then, els, line };
      }
      if (at("while")) {
        p++; eat("(");
        const cond = parseExpr();
        eat(")");
        return { k: "while", cond, body: parseStmt(), line };
      }
      if (at("do")) {
        p++;
        const body = parseStmt();
        eat("while"); eat("(");
        const cond = parseExpr();
        eat(")"); eat(";");
        return { k: "dowhile", cond, body, line };
      }
      if (at("for")) {
        p++; eat("(");
        let init = null;
        if (!at(";")) {
          if (isTypeStart()) {
            const base = parseBaseType();
            let ptr = 0;
            while (at("*")) { p++; ptr++; }
            const name = eat("id").v;
            init = parseDeclRest(base, ptr, name, line);
          } else init = { k: "expr", e: parseExpr() };
        }
        eat(";");
        const cond = at(";") ? null : parseExpr();
        eat(";");
        const post = at(")") ? null : parseExpr();
        eat(")");
        return { k: "for", init, cond, post, body: parseStmt(), line };
      }
      if (at("switch")) {
        p++; eat("(");
        const disc = parseExpr();
        eat(")"); eat("{");
        const cases = [];
        let def = null;
        while (!at("}")) {
          if (at("case")) {
            p++;
            const val = parseAssign();
            eat(":");
            const body = [];
            while (!at("case") && !at("default") && !at("}")) body.push(parseStmt());
            cases.push({ val, body });
          } else if (at("default")) {
            p++; eat(":");
            const body = [];
            while (!at("case") && !at("default") && !at("}")) body.push(parseStmt());
            def = body;
          } else cerr(toks[p].line, "ใน switch ต้องเป็น case หรือ default");
        }
        eat("}");
        return { k: "switch", disc, cases, def, line };
      }
      if (at("return")) {
        p++;
        const e = at(";") ? null : parseExpr();
        eat(";");
        return { k: "return", e, line };
      }
      if (at("break")) { p++; eat(";"); return { k: "break", line }; }
      if (at("continue")) { p++; eat(";"); return { k: "continue", line }; }
      const e = parseExpr();
      eat(";");
      return { k: "expr", e, line };
    }

    function parseExpr() {
      let e = parseAssign();
      while (at(",")) { p++; const r = parseAssign(); e = { k: "comma", l: e, r }; }
      return e;
    }
    function parseAssign() {
      const l = parseTernary();
      if (at("=") || at("+=") || at("-=") || at("*=") || at("/=") || at("%=")) {
        const op = toks[p].t; p++;
        const r = parseAssign();
        return { k: "assign", op, l, r, line: l.line };
      }
      return l;
    }
    function parseTernary() {
      const c = parseOr();
      if (at("?")) {
        p++;
        const a = parseAssign();
        eat(":");
        const b = parseAssign();
        return { k: "ternary", c, a, b };
      }
      return c;
    }
    const bin = (next, ops) => () => {
      let l = next();
      while (ops.includes(toks[p].t)) {
        const op = toks[p].t; p++;
        const r = next();
        l = { k: "bin", op, l, r };
      }
      return l;
    };
    const parseMul = bin(() => parseUnary(), ["*", "/", "%"]);
    const parseAdd = bin(parseMul, ["+", "-"]);
    const parseRel = bin(parseAdd, ["<", ">", "<=", ">="]);
    const parseEq = bin(parseRel, ["==", "!="]);
    const parseAnd = bin(parseEq, ["&&"]);
    const parseOr = bin(parseAnd, ["||"]);

    function parseUnary() {
      const line = toks[p].line;
      if (at("(") && TYPEKW.has(peek(1).t)) {
        p++;
        const base = parseBaseType();
        let ptr = 0;
        while (at("*")) { p++; ptr++; }
        eat(")");
        return { k: "cast", base, ptr, e: parseUnary(), line };
      }
      if (at("!")) { p++; return { k: "not", e: parseUnary(), line }; }
      if (at("-")) { p++; return { k: "neg", e: parseUnary(), line }; }
      if (at("+")) { p++; return parseUnary(); }
      if (at("*")) { p++; return { k: "deref", e: parseUnary(), line }; }
      if (at("&")) { p++; return { k: "addr", e: parseUnary(), line }; }
      if (at("++")) { p++; return { k: "preinc", d: 1, e: parseUnary(), line }; }
      if (at("--")) { p++; return { k: "preinc", d: -1, e: parseUnary(), line }; }
      return parsePostfix();
    }
    function parsePostfix() {
      let e = parsePrimary();
      while (true) {
        if (at("(")) {
          p++;
          const args = [];
          if (!at(")")) { args.push(parseAssign()); while (at(",")) { p++; args.push(parseAssign()); } }
          eat(")");
          e = { k: "call", fn: e, args, line: e.line };
        } else if (at("[")) {
          p++;
          const idx = parseExpr();
          eat("]");
          e = { k: "index", a: e, i: idx, line: e.line };
        } else if (at("++")) { p++; e = { k: "postinc", d: 1, e, line: e.line }; }
        else if (at("--")) { p++; e = { k: "postinc", d: -1, e, line: e.line }; }
        else break;
      }
      return e;
    }
    function parsePrimary() {
      const t = toks[p], line = t.line;
      if (t.t === "num") { p++; return { k: "num", v: t.v.val, isFloat: t.v.isFloat, line }; }
      if (t.t === "str") { p++; return { k: "str", v: t.v, line }; }
      if (t.t === "id") { p++; return { k: "id", name: t.v, line }; }
      if (t.t === "(") { p++; const e = parseExpr(); eat(")"); return e; }
      cerr(line, "อ่านนิพจน์ไม่ออกตรง '" + (t.v && t.v.val !== undefined ? t.v.val : t.v || t.t) + "'");
    }

    return parseProgram();
  }

  /* ---------------- Runtime ---------------- */
  function run(code, input) {
    let stdout = "";
    const mem = [];
    let steps = 0;
    const MAXSTEPS = 3000000;
    const tick = line => { if (++steps > MAXSTEPS) cerr(line, "โปรแกรมทำงานนานเกินไป — เช็คว่าลูปมีทางจบไหม"); };

    const inputQueue = Array.isArray(input) ? input.slice() : null;
    const inputFn = typeof input === "function" ? input : null;
    let inBuf = "";
    function refill(spec) {
      if (inputQueue && inputQueue.length) inBuf += (inBuf ? "\n" : "") + String(inputQueue.shift());
      else if (inputFn) {
        const v = inputFn(spec);
        inBuf += (inBuf ? "\n" : "") + String(v == null ? "" : v);
      }
    }
    function readToken(spec) {
      let guard = 0;
      while (inBuf.trim() === "" && guard++ < 50) {
        const before = inBuf;
        refill(spec);
        if (inBuf === before && !inputFn) break;
        if (inputFn && inBuf.trim() !== "") break;
        if (!inputQueue || !inputQueue.length) { if (!inputFn) break; }
      }
      inBuf = inBuf.replace(/^\s+/, "");
      if (inBuf === "") cerr(0, "scanf ไม่มีข้อมูลให้อ่านแล้ว (ค่าที่ระบบป้อนหมด)");
      const m = inBuf.match(/^\S+/);
      inBuf = inBuf.slice(m[0].length);
      return m[0];
    }

    function alloc(n) {
      const b = mem.length;
      for (let i = 0; i < n; i++) mem.push(0);
      return b;
    }
    function readStr(addr) {
      let s = "";
      for (let a = addr; a < mem.length && mem[a] !== 0; a++) s += String.fromCharCode(mem[a]);
      return s;
    }
    function writeStr(addr, s) {
      for (let i = 0; i < s.length; i++) mem[addr + i] = s.charCodeAt(i);
      mem[addr + s.length] = 0;
    }

    const fns = {};

    const BRK = { brk: true }, CNT = { cnt: true };
    const globalEnv = { vars: {}, parent: null };

    function lookup(env, name, line) {
      for (let e = env; e; e = e.parent) if (name in e.vars) return e.vars[name];
      cerr(line, "ไม่รู้จักตัวแปร '" + name + "' — ประกาศตัวแปรก่อนใช้เสมอ (เช่น int " + name + ";)");
    }
    const isF = t => !t.ptr && (t.base === "float" || t.base === "double");

    function evalLV(n, env) {
      tick(n.line);
      if (n.k === "id") {
        const v = lookup(env, n.name, n.line);
        if (v.arrLen) cerr(n.line, "กำหนดค่าให้ทั้งอาร์เรย์ '" + n.name + "' ตรงๆ ไม่ได้ ต้องระบุช่อง เช่น " + n.name + "[0]");
        return { addr: v.addr, t: { base: v.base, ptr: v.ptr } };
      }
      if (n.k === "deref") {
        const e = ev(n.e, env);
        if (!e.t.ptr) cerr(n.line, "ใช้ * กับสิ่งที่ไม่ใช่พอยน์เตอร์ไม่ได้");
        return { addr: e.v, t: { base: e.t.base, ptr: e.t.ptr - 1 } };
      }
      if (n.k === "index") {
        const a = ev(n.a, env);
        const i = ev(n.i, env);
        if (!a.t.ptr) cerr(n.line, "ใช้ [ ] กับสิ่งที่ไม่ใช่อาร์เรย์/พอยน์เตอร์ไม่ได้");
        return { addr: a.v + Math.trunc(i.v), t: { base: a.t.base, ptr: a.t.ptr - 1 } };
      }
      cerr(n.line, "ฝั่งซ้ายของ = ต้องเป็นตัวแปร ช่องอาร์เรย์ หรือ *พอยน์เตอร์");
    }

    function store(lv, val) {
      let v = val;
      if (!isF(lv.t)) v = Math.trunc(v);
      mem[lv.addr] = v;
      return v;
    }

    function ev(n, env) {
      tick(n.line);
      switch (n.k) {
        case "num": return { v: n.v, t: { base: n.isFloat ? "double" : "int", ptr: 0 } };
        case "str": {
          if (n._addr === undefined) {
            n._addr = alloc(n.v.length + 1);
            writeStr(n._addr, n.v);
          }
          return { v: n._addr, t: { base: "char", ptr: 1 } };
        }
        case "id": {
          const vi = lookup(env, n.name, n.line);
          if (vi.arrLen) return { v: vi.addr, t: { base: vi.base, ptr: 1 } }; // array decay
          return { v: mem[vi.addr], t: { base: vi.base, ptr: vi.ptr } };
        }
        case "index": case "deref": {
          const lv = evalLV(n, env);
          if (lv.t.ptr) return { v: mem[lv.addr], t: lv.t };
          return { v: mem[lv.addr], t: lv.t };
        }
        case "addr": {
          const lv = evalLV(n.e, env);
          return { v: lv.addr, t: { base: lv.t.base, ptr: lv.t.ptr + 1 } };
        }
        case "assign": {
          const lv = evalLV(n.l, env);
          let r = ev(n.r, env).v;
          if (n.op !== "=") {
            const cur = mem[lv.addr];
            if (n.op === "+=") r = cur + r;
            else if (n.op === "-=") r = cur - r;
            else if (n.op === "*=") r = cur * r;
            else if (n.op === "/=") r = isF(lv.t) ? cur / r : Math.trunc(cur / r);
            else if (n.op === "%=") r = cur % r;
          }
          return { v: store(lv, r), t: lv.t };
        }
        case "preinc": {
          const lv = evalLV(n.e, env);
          const v = mem[lv.addr] + n.d;
          mem[lv.addr] = v;
          return { v, t: lv.t };
        }
        case "postinc": {
          const lv = evalLV(n.e, env);
          const v = mem[lv.addr];
          mem[lv.addr] = v + n.d;
          return { v, t: lv.t };
        }
        case "bin": {
          const l = ev(n.l, env);
          if (n.op === "&&") return { v: (l.v !== 0 && ev(n.r, env).v !== 0) ? 1 : 0, t: { base: "int", ptr: 0 } };
          if (n.op === "||") return { v: (l.v !== 0 || ev(n.r, env).v !== 0) ? 1 : 0, t: { base: "int", ptr: 0 } };
          const r = ev(n.r, env);
          const fl = isF(l.t) || isF(r.t);
          let v;
          switch (n.op) {
            case "+": v = l.v + r.v; break;
            case "-": v = l.v - r.v; break;
            case "*": v = l.v * r.v; break;
            case "/":
              if (r.v === 0 && !fl) cerr(n.line, "หารด้วยศูนย์ไม่ได้");
              v = fl ? l.v / r.v : Math.trunc(l.v / r.v);
              break;
            case "%":
              if (Math.trunc(r.v) === 0) cerr(n.line, "หารเอาเศษด้วยศูนย์ไม่ได้");
              v = Math.trunc(l.v) % Math.trunc(r.v);
              break;
            case "<": return { v: l.v < r.v ? 1 : 0, t: { base: "int", ptr: 0 } };
            case ">": return { v: l.v > r.v ? 1 : 0, t: { base: "int", ptr: 0 } };
            case "<=": return { v: l.v <= r.v ? 1 : 0, t: { base: "int", ptr: 0 } };
            case ">=": return { v: l.v >= r.v ? 1 : 0, t: { base: "int", ptr: 0 } };
            case "==": return { v: l.v === r.v ? 1 : 0, t: { base: "int", ptr: 0 } };
            case "!=": return { v: l.v !== r.v ? 1 : 0, t: { base: "int", ptr: 0 } };
          }
          const t = l.t.ptr ? l.t : (r.t.ptr ? r.t : { base: fl ? "double" : "int", ptr: 0 });
          if (!t.ptr && !fl) v = Math.trunc(v);
          return { v, t };
        }
        case "not": return { v: ev(n.e, env).v === 0 ? 1 : 0, t: { base: "int", ptr: 0 } };
        case "neg": {
          const e = ev(n.e, env);
          return { v: -e.v, t: e.t };
        }
        case "cast": {
          const e = ev(n.e, env);
          const t = { base: n.base, ptr: n.ptr };
          return { v: isF(t) ? e.v : Math.trunc(e.v), t };
        }
        case "ternary": return ev(n.c, env).v !== 0 ? ev(n.a, env) : ev(n.b, env);
        case "comma": { ev(n.l, env); return ev(n.r, env); }
        case "call": {
          if (n.fn.k !== "id") cerr(n.line, "เรียกฟังก์ชันด้วยชื่อเท่านั้น");
          const name = n.fn.name;
          if (name === "printf") return doPrintf(n, env);
          if (name === "scanf") return doScanf(n, env);
          if (name === "puts") {
            const a = ev(n.args[0], env);
            stdout += readStr(a.v) + "\n";
            return { v: 0, t: { base: "int", ptr: 0 } };
          }
          if (name === "strlen") {
            const a = ev(n.args[0], env);
            return { v: readStr(a.v).length, t: { base: "int", ptr: 0 } };
          }
          const f = fns[name];
          if (!f) cerr(n.line, "ไม่รู้จักฟังก์ชัน '" + name + "' — สะกดถูกไหม หรือยังไม่ได้สร้าง?");
          if (n.args.length !== f.params.length) cerr(n.line, "ฟังก์ชัน " + name + " ต้องการ " + f.params.length + " ค่า แต่ส่งมา " + n.args.length + " ค่า");
          const frame = { vars: {}, parent: globalEnv };
          for (let i = 0; i < f.params.length; i++) {
            const pv = f.params[i];
            const a = ev(n.args[i], env);
            const addr = alloc(1);
            mem[addr] = (pv.ptr || isF(pv)) ? a.v : Math.trunc(a.v);
            frame.vars[pv.name] = { addr, base: pv.base, ptr: pv.ptr, arrLen: 0 };
          }
          try {
            execBlock(f.body, frame);
          } catch (e) {
            if (e && e.ret !== undefined) {
              let v = e.ret;
              if (!isF(f.ret) && !f.ret.ptr) v = Math.trunc(v);
              return { v, t: f.ret };
            }
            throw e;
          }
          return { v: 0, t: f.ret };
        }
      }
      cerr(n.line, "ประมวลผลนิพจน์ไม่ได้");
    }

    function fmtPrintf(fmt, args) {
      let out = "", ai = 0;
      for (let i = 0; i < fmt.length; i++) {
        const ch = fmt[i];
        if (ch !== "%") { out += ch; continue; }
        let j = i + 1, left = false, width = "", prec = "";
        if (fmt[j] === "%") { out += "%"; i = j; continue; }
        if (fmt[j] === "-") { left = true; j++; }
        while (/[0-9]/.test(fmt[j])) { width += fmt[j]; j++; }
        if (fmt[j] === ".") { j++; while (/[0-9]/.test(fmt[j])) { prec += fmt[j]; j++; } }
        while (/[lh]/.test(fmt[j])) j++;
        const conv = fmt[j];
        const a = args[ai++];
        if (a === undefined) cerr(0, "printf: จำนวน % ในข้อความ มากกว่าค่าที่ส่งมา");
        let s = "";
        if (conv === "d" || conv === "i" || conv === "u") s = String(Math.trunc(a.v));
        else if (conv === "f") s = Number(a.v).toFixed(prec === "" ? 6 : parseInt(prec));
        else if (conv === "c") s = String.fromCharCode(Math.trunc(a.v));
        else if (conv === "s") s = readStr(a.v);
        else { s = "%" + (conv || ""); ai--; }
        if (width) { const w = parseInt(width); s = left ? s.padEnd(w) : s.padStart(w); }
        out += s;
        i = j;
      }
      return out;
    }
    function doPrintf(n, env) {
      if (!n.args.length || n.args[0].k !== "str") cerr(n.line, 'printf ต้องเริ่มด้วยข้อความในเครื่องหมายคำพูด เช่น printf("สวัสดี");');
      const fmt = n.args[0].v;
      const args = n.args.slice(1).map(a => ev(a, env));
      const s = fmtPrintf(fmt, args);
      stdout += s;
      return { v: s.length, t: { base: "int", ptr: 0 } };
    }
    function doScanf(n, env) {
      if (!n.args.length || n.args[0].k !== "str") cerr(n.line, 'scanf ต้องเริ่มด้วยรูปแบบ เช่น scanf("%d", &x);');
      const fmt = n.args[0].v;
      const specs = [...fmt.matchAll(/%(l|h)*([dfcsu]|lf)/g)].map(m => m[2][0] === "l" ? "f" : m[2]);
      let ai = 1;
      for (const sp of specs) {
        const argNode = n.args[ai++];
        if (!argNode) cerr(n.line, "scanf: จำนวน % มากกว่าตัวแปรที่ส่งมา");
        const a = ev(argNode, env);
        if (!a.t.ptr) cerr(n.line, "scanf ต้องส่ง \"ที่อยู่\" ของตัวแปร — อย่าลืมเครื่องหมาย & หน้าตัวแปร เช่น &x");
        if (sp === "d" || sp === "u") {
          const tk = readToken("%d (จำนวนเต็ม)");
          const v = parseInt(tk, 10);
          if (isNaN(v)) cerr(n.line, 'scanf: อ่าน "' + tk + '" เป็นจำนวนเต็มไม่ได้');
          mem[a.v] = v;
        } else if (sp === "f") {
          const tk = readToken("%f (ทศนิยม)");
          const v = parseFloat(tk);
          if (isNaN(v)) cerr(n.line, 'scanf: อ่าน "' + tk + '" เป็นทศนิยมไม่ได้');
          mem[a.v] = v;
        } else if (sp === "c") {
          const tk = readToken("%c (ตัวอักษร)");
          mem[a.v] = tk.charCodeAt(0);
        } else if (sp === "s") {
          const tk = readToken("%s (ข้อความ)");
          writeStr(a.v, tk);
        }
      }
      return { v: specs.length, t: { base: "int", ptr: 0 } };
    }

    function declare(d, env) {
      for (const v of d.vars) {
        if (env.vars[v.name] !== undefined) cerr(d.line, "ตัวแปร '" + v.name + "' ถูกประกาศซ้ำใน scope เดียวกัน");
        if (v.arr !== null) {
          let len = v.arr;
          let initVals = null;
          if (v.init && v.init.k === "arrinit") initVals = v.init.items.map(e => ev(e, env).v);
          else if (v.init && v.init.k === "str") initVals = [...v.init.v].map(c => c.charCodeAt(0)).concat([0]);
          if (len === -1) {
            if (!initVals) cerr(d.line, "อาร์เรย์ '" + v.name + "' ต้องระบุขนาด หรือกำหนดค่าเริ่มต้น");
            len = initVals.length;
          }
          const addr = alloc(Math.max(len, initVals ? initVals.length : 0));
          if (initVals) for (let i = 0; i < initVals.length; i++) mem[addr + i] = (d.base === "float" || d.base === "double") ? initVals[i] : Math.trunc(initVals[i]);
          env.vars[v.name] = { addr, base: d.base, ptr: 0, arrLen: len };
        } else {
          const addr = alloc(1);
          if (v.init) {
            const iv = ev(v.init, env).v;
            mem[addr] = (v.ptr || d.base === "float" || d.base === "double") ? iv : Math.trunc(iv);
          }
          env.vars[v.name] = { addr, base: d.base, ptr: v.ptr, arrLen: 0 };
        }
      }
    }

    function execBlock(b, parentEnv) {
      const env = { vars: {}, parent: parentEnv };
      for (const s of b.body) exec(s, env);
    }

    function exec(s, env) {
      tick(s.line);
      switch (s.k) {
        case "block": return execBlock(s, env);
        case "empty": return;
        case "decl": return declare(s, env);
        case "expr": ev(s.e, env); return;
        case "if":
          if (ev(s.cond, env).v !== 0) exec(s.then, env);
          else if (s.els) exec(s.els, env);
          return;
        case "while":
          while (ev(s.cond, env).v !== 0) {
            try { exec(s.body, env); } catch (e) { if (e === BRK) break; if (e === CNT) continue; throw e; }
          }
          return;
        case "dowhile":
          do {
            try { exec(s.body, env); } catch (e) { if (e === BRK) break; if (e === CNT) continue; throw e; }
          } while (ev(s.cond, env).v !== 0);
          return;
        case "for": {
          const env2 = { vars: {}, parent: env };
          if (s.init) exec(s.init.k === "decl" ? s.init : { k: "expr", e: s.init.e, line: s.line }, env2);
          while (s.cond === null || ev(s.cond, env2).v !== 0) {
            try { exec(s.body, env2); } catch (e) { if (e === BRK) break; if (e === CNT) { if (s.post) ev(s.post, env2); continue; } throw e; }
            if (s.post) ev(s.post, env2);
          }
          return;
        }
        case "switch": {
          const dv = ev(s.disc, env).v;
          let matched = false;
          try {
            for (const c of s.cases) {
              if (!matched && ev(c.val, env).v === dv) matched = true;
              if (matched) for (const st of c.body) exec(st, env);
            }
            if (!matched && s.def) for (const st of s.def) exec(st, env);
          } catch (e) { if (e !== BRK) throw e; }
          return;
        }
        case "return": throw { ret: s.e ? ev(s.e, env).v : 0 };
        case "break": throw BRK;
        case "continue": throw CNT;
      }
      cerr(s.line, "ประมวลผลคำสั่งไม่ได้");
    }

    try {
      if (/\b(printf|scanf|puts)\s*\(/.test(code) && !/#include\s*<stdio\.h>/.test(code))
        cerr(1, "ใช้ printf/scanf ต้องมี #include <stdio.h> ไว้บรรทัดบนสุดของโปรแกรม");
      const prog = parse(lex(code));
      for (const f of prog.fns) fns[f.name] = f;
      if (!fns.main) cerr(0, "ไม่พบฟังก์ชัน main — โปรแกรม C ต้องมี int main() เสมอ");
      for (const g of prog.globals) declare(g, globalEnv);
      try {
        execBlock(fns.main.body, globalEnv);
      } catch (e) {
        if (!(e && e.ret !== undefined)) throw e;
      }
      return { stdout, error: null };
    } catch (e) {
      return { stdout, error: e && e.message ? e.message : String(e) };
    }
  }

  /* ---------------- ตรวจการย่อหน้า ---------------- */
  function stripLine(s, st) {
    // ตัดสตริง คอมเมนต์ และตัวอักษรออก เพื่อนับปีกกาอย่างถูกต้อง
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (st.blockComment) {
        if (c === "*" && s[i + 1] === "/") { st.blockComment = false; i++; }
        continue;
      }
      if (c === "/" && s[i + 1] === "/") break;
      if (c === "/" && s[i + 1] === "*") { st.blockComment = true; i++; continue; }
      if (c === '"') { i++; while (i < s.length && s[i] !== '"') { if (s[i] === "\\") i++; i++; } continue; }
      if (c === "'") { i++; while (i < s.length && s[i] !== "'") { if (s[i] === "\\") i++; i++; } continue; }
      out += c;
    }
    return out;
  }
  function checkIndent(code) {
    const rows = code.split("\n");
    let depth = 0, unit = 0, unitChar = null;
    const st = { blockComment: false };
    for (let li = 0; li < rows.length; li++) {
      const raw = rows[li];
      const wasInComment = st.blockComment;
      const clean = stripLine(raw, st);
      if (raw.trim() === "" || wasInComment) continue;
      const m = raw.match(/^[ \t]*/)[0];
      if (m.includes(" ") && m.includes("\t"))
        return { ok: false, msg: "บรรทัดที่ " + (li + 1) + ": ใช้ tab ปนกับ space — เลือกใช้อย่างใดอย่างหนึ่งให้เหมือนกันทั้งไฟล์" };
      if (unitChar && m.length > 0 && m[0] !== unitChar)
        return { ok: false, msg: "บรรทัดที่ " + (li + 1) + ": ใช้ tab ปนกับ space — เลือกใช้อย่างใดอย่างหนึ่งให้เหมือนกันทั้งไฟล์" };
      const body = clean.trim() || raw.trim();
      let d = depth;
      if (body.startsWith("}")) d = Math.max(0, depth - 1);
      if (unit === 0 && m.length > 0 && d > 0) { unit = Math.max(1, Math.round(m.length / d)); unitChar = m[0]; }
      const u = unit || 4;
      const expected = d * u;
      const okWidth = m.length === expected || m.length === expected + u;
      if (!okWidth) {
        const what = unitChar === "\t" ? " tab" : " ช่อง";
        if (m.length < expected)
          return { ok: false, msg: "บรรทัดที่ " + (li + 1) + ": ย่อหน้าน้อยไป — บรรทัดในปีกกาชั้นนี้ควรย่อหน้า " + expected + what };
        return { ok: false, msg: "บรรทัดที่ " + (li + 1) + ": ย่อหน้าไม่ตรงระดับปีกกา — ควรเป็น " + expected + what + " (ตอนนี้ " + m.length + ")" };
      }
      for (const ch of clean) {
        if (ch === "{") depth++;
        else if (ch === "}") depth = Math.max(0, depth - 1);
      }
    }
    return { ok: true };
  }

  return { run, checkIndent };
})();

if (typeof module !== "undefined") module.exports = CRUN;
else window.CRUN = CRUN;
