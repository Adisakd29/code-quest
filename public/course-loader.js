/**
 * โหลดข้อมูลหลักสูตรขนาดใหญ่ (C · C++ · Python v2 รวม ~2.2MB ก่อนบีบอัด) แบบไม่บล็อกการแสดงหน้าแรก
 * — เดิมเป็นแท็ก script ธรรมดา มือถือสเปกต่ำต้องรอโหลดและ parse ครบก่อนเห็นปุ่มเริ่ม
 * ไฟล์ลงทะเบียนตัวเองเข้า COURSES เมื่อโหลดเสร็จ (async = false จึงคงลำดับเดิม) · ส่วนที่ต้องใช้ข้อมูลหลักสูตรรอ window.cqCoursesReady
 */
(function () {
  const files = ["courses/cpp.js", "courses/c2.js", "courses/py2.js"];
  window.cqCoursesLoaded = false;
  window.cqCoursesReady = new Promise((resolve, reject) => {
    let left = files.length;
    for (const src of files) {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = () => {
        if (--left === 0) {
          window.cqCoursesLoaded = true;
          document.dispatchEvent(new Event("cq:courses"));
          resolve();
        }
      };
      s.onerror = () => reject(new Error("โหลดข้อมูลหลักสูตรไม่สำเร็จ: " + src));
      document.head.appendChild(s);
    }
  });
  window.cqCoursesReady.catch(e => console.warn("[Code Quest]", e.message));
})();
