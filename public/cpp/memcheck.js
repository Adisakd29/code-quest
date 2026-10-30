/**
 * memcheck.js — Memory Checker ของ Code Quest (แทน AddressSanitizer ที่ใช้ใน WebAssembly ไม่ได้)
 * ด่านที่ตั้ง memcheck: true จะคอมไพล์ด้วย -include cq_memcheck.h → malloc/calloc/realloc/free ของผู้เรียนถูกห่อด้วยตัวติดตาม
 * ตรวจได้: หน่วยความจำรั่วตอนจบโปรแกรม (exit 97) · free ซ้ำ / free พอยน์เตอร์ที่ไม่ได้จอง / realloc พอยน์เตอร์ที่ไม่ได้จอง (exit 98)
 * หน่วยความจำที่ free แล้วถูกเติมด้วย 0xDD เพื่อให้บั๊ก use-after-free แสดงอาการชัดขึ้น (ตรวจจับโดยตรงไม่ได้)
 */
(function (root) {
  const header = `#ifndef CQ_MEMCHECK_H
#define CQ_MEMCHECK_H
#include <stddef.h>
#include <stdlib.h>
#include <string.h>
void *cq_malloc(size_t n, const char *file, int line);
void *cq_calloc(size_t c, size_t n, const char *file, int line);
void *cq_realloc(void *p, size_t n, const char *file, int line);
void cq_free(void *p, const char *file, int line);
#define malloc(n) cq_malloc((n), __FILE__, __LINE__)
#define calloc(c, n) cq_calloc((c), (n), __FILE__, __LINE__)
#define realloc(p, n) cq_realloc((p), (n), __FILE__, __LINE__)
#define free(p) cq_free((p), __FILE__, __LINE__)
#endif
`;
  const source = `#include <stdio.h>
#undef malloc
#undef calloc
#undef realloc
#undef free
#define CQ_MAX 4096
#define CQ_FREED 256
typedef struct { void *p; size_t n; const char *file; int line; } CqRec;
static CqRec cq_recs[CQ_MAX];
static void *cq_freed[CQ_FREED];
static size_t cq_freed_pos;
static int cq_registered;

static void cq_fail(int code) { fflush(NULL); _Exit(code); }

static void cq_report(void) {
    size_t blocks = 0, bytes = 0;
    for (size_t i = 0; i < CQ_MAX; i++) if (cq_recs[i].p) { blocks++; bytes += cq_recs[i].n; }
    if (!blocks) return;
    fflush(stdout);
    fprintf(stderr, "[memcheck] หน่วยความจำรั่ว %zu ก้อน (%zu ไบต์) — จองแล้วไม่ได้ free\\n", blocks, bytes);
    size_t shown = 0;
    for (size_t i = 0; i < CQ_MAX && shown < 5; i++) if (cq_recs[i].p) { fprintf(stderr, "  จองที่ %s:%d (%zu ไบต์)\\n", cq_recs[i].file, cq_recs[i].line, cq_recs[i].n); shown++; }
    cq_fail(97);
}
static CqRec *cq_find(void *p) {
    for (size_t i = 0; i < CQ_MAX; i++) if (cq_recs[i].p == p) return &cq_recs[i];
    return NULL;
}
static void cq_track(void *p, size_t n, const char *file, int line) {
    if (!cq_registered) { atexit(cq_report); cq_registered = 1; }
    for (size_t i = 0; i < CQ_FREED; i++) if (cq_freed[i] == p) cq_freed[i] = NULL;
    CqRec *r = cq_find(NULL);
    if (r) { r->p = p; r->n = n; r->file = file; r->line = line; }
}
void *cq_malloc(size_t n, const char *file, int line) {
    void *p = malloc(n);
    if (p) cq_track(p, n, file, line);
    return p;
}
void *cq_calloc(size_t c, size_t n, const char *file, int line) {
    void *p = calloc(c, n);
    if (p) cq_track(p, c * n, file, line);
    return p;
}
void cq_free(void *p, const char *file, int line) {
    if (!p) return;
    CqRec *r = cq_find(p);
    if (!r) {
        int twice = 0;
        for (size_t i = 0; i < CQ_FREED; i++) if (cq_freed[i] == p) twice = 1;
        fflush(stdout);
        if (twice) fprintf(stderr, "[memcheck] free ซ้ำ (double free) ที่ %s:%d — พอยน์เตอร์นี้ถูก free ไปแล้ว\\n", file, line);
        else fprintf(stderr, "[memcheck] free พอยน์เตอร์ที่ไม่ได้มาจาก malloc/calloc/realloc ที่ %s:%d\\n", file, line);
        cq_fail(98);
    }
    memset(p, 0xDD, r->n);
    free(p);
    r->p = NULL;
    cq_freed[cq_freed_pos++ % CQ_FREED] = p;
}
void *cq_realloc(void *p, size_t n, const char *file, int line) {
    if (!p) return cq_malloc(n, file, line);
    CqRec *r = cq_find(p);
    if (!r) {
        fflush(stdout);
        fprintf(stderr, "[memcheck] realloc พอยน์เตอร์ที่ไม่ได้จองหรือถูก free แล้ว ที่ %s:%d\\n", file, line);
        cq_fail(98);
    }
    void *q = realloc(p, n);
    if (q) { r->p = q; r->n = n; r->file = file; r->line = line; }
    return q;
}
`;
  const api = { header, source };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CPPMemcheck = api;
})(typeof window !== "undefined" ? window : globalThis);
