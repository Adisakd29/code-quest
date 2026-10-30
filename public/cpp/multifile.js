/**
 * multifile.js — แยกโค้ดในตัวแก้ไขช่องเดียวเป็นหลายไฟล์ด้วยบรรทัดคั่น  // === ชื่อไฟล์ ===
 * ไม่มีบรรทัดคั่น = ไฟล์เดียวชื่อ main.cpp (โจทย์ทั่วไป)
 * ใช้ร่วมกันทั้ง compile-worker.js (เบราว์เซอร์) และ tests/test-cpp.js
 */
(function (root) {
  const MARK = /^\/\/[ \t]*={3,}[ \t]*([\w.\-]+)[ \t]*={3,}[ \t]*$/gm;
  function split(code, defaultName) {
    const marks = [...String(code).matchAll(MARK)];
    if (!marks.length) return { [defaultName || "main.cpp"]: code };
    const files = {};
    marks.forEach((m, i) => {
      const start = m.index + m[0].length;
      const end = i + 1 < marks.length ? marks[i + 1].index : code.length;
      files[m[1]] = code.slice(start, end).replace(/^\r?\n/, "");
    });
    return files;
  }
  /** ไฟล์ที่ต้องคอมไพล์ (translation units) — header ถูก #include เข้าไปเอง */
  const sources = files => Object.keys(files).filter(n => /\.(cpp|cc|cxx|c)$/.test(n));
  const api = { split, sources };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CPPMultiFile = api;
})(typeof window !== "undefined" ? window : globalThis);
