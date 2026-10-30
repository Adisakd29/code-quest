import json, re

def J(s): return json.dumps(s, ensure_ascii=False)

# ─────────────── shared C pieces ───────────────
VALID = r'''static int validSku(const char *s) {
    size_t n = strlen(s);
    if (n < 1 || n > 15) {
        return 0;
    }
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-')) {
            return 0;
        }
    }
    return 1;
}

static int parseQty(const char *s, int *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE || v < 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* ราคาเป็นบาทที่มีทศนิยมไม่เกิน 2 ตำแหน่ง → สตางค์ · ไม่เกิน 10,000,000.00 บาท */
static int parsePrice(const char *s, long *out) {
    size_t i = 0;
    long baht = 0, sat = 0;
    if (!isdigit((unsigned char)s[0])) {
        return 0;
    }
    while (isdigit((unsigned char)s[i])) {
        baht = baht * 10 + (s[i] - '0');
        if (baht > 10000000L) {
            return 0;
        }
        i++;
    }
    if (s[i] == '.') {
        i++;
        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;
        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }
    }
    if (s[i] != '\0' || baht * 100 + sat > 1000000000L) {
        return 0;
    }
    *out = baht * 100 + sat;
    return 1;
}
'''

ITEM_T = r'''typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;
'''

PARSE = r'''/* คืน NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนข้อความบอกเหตุผล */
static const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    char *p = buf;
    field[n++] = p;
    for (; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    if (!validSku(field[0])) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(field[1]);
    if (nl < 1 || nl > 47) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int qty = 0;
    if (!parseQty(field[2], &qty)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long price = 0;
    if (!parsePrice(field[3], &price)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", field[0]);
    snprintf(out->name, sizeof out->name, "%s", field[1]);
    out->qty = qty;
    out->price = price;
    return NULL;
}

static void item_format(const Item *it, char *buf, size_t size) {
    snprintf(buf, size, "%s|%s|%d|%ld.%02ld", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
}
'''

HDR = "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <ctype.h>\n#include <errno.h>\n#include <limits.h>\n\n"

stages = []
sols = {}

def add(stage, sol=None, wrong=None):
    stages.append(stage)
    if sol is not None:
        sols["c2-capstone/%d" % (len(stages) - 1)] = {"sol": sol, "wrong": wrong}

# ─────────────── M1 Requirements ───────────────
add({"title": "Milestone 1: เก็บความต้องการ", "kind": "M1 · Requirements", "desc": "ร้านค้าแห่งหนึ่งขอระบบคลังสินค้าแบบบรรทัดคำสั่ง: \"บันทึกสินค้า ขาย เติมของ ดูมูลค่าคลัง และเก็บข้อมูลลงไฟล์\" — ก่อนเขียนโค้ด วิศวกรต้องเปลี่ยนคำขอกว้างๆ ให้เป็นข้อกำหนดที่ทดสอบได้", "goal": "ตอบถูกครบทุกข้อ", "xp": 50,
     "quiz": [
         {"t": "mc", "q": "ควรเก็บราคาสินค้าเป็นชนิดใด", "c": ["จำนวนเต็มหน่วยสตางค์ (long)", "float หน่วยบาท", "double หน่วยบาท", "สตริงตามที่ผู้ใช้พิมพ์"], "a": 0, "e": "ทศนิยมฐานสองแทน 0.1 ได้ไม่ตรง — เงินควรเก็บเป็นจำนวนเต็มของหน่วยย่อยที่สุด"},
         {"t": "mc", "q": "ข้อใดเป็นข้อกำหนดที่ทดสอบได้", "c": ["ขายเกินจำนวนคงเหลือต้องถูกปฏิเสธ และจำนวนคงเหลือไม่เปลี่ยน", "ระบบต้องใช้งานง่าย", "ระบบต้องเร็ว", "ข้อมูลต้องปลอดภัย"], "a": 0, "e": "ข้อกำหนดที่ดีบอกได้ชัดว่าผ่านหรือไม่ผ่าน — \"เร็ว\" ต้องเปลี่ยนเป็นตัวเลข เช่น ค้นหา 100,000 รายการได้ภายใน 1 วินาที"},
         {"t": "mc", "q": "ถ้าไฟล์ข้อมูลเสียบางบรรทัดตอนเปิดโปรแกรม ควรตกลงพฤติกรรมอย่างไร", "c": ["ตัดสินใจล่วงหน้าและเขียนเป็นข้อกำหนด เช่น ปฏิเสธทั้งไฟล์และรายงานบรรทัดที่เสีย", "ปล่อยให้โปรแกรมพังไปเอง", "ข้ามบรรทัดเสียแบบเงียบๆ เสมอ", "ไม่ต้องคิด เพราะไฟล์ไม่น่าจะเสีย"], "a": 0, "e": "กรณีผิดพลาดคือส่วนหนึ่งของข้อกำหนด — ระบบจริงเจอเสมอ"},
         {"t": "tf", "q": "\"รหัสสินค้า\" ควรกำหนดรูปแบบให้ชัด (ตัวอักษรที่ใช้ได้และความยาว) ตั้งแต่ขั้นความต้องการ", "a": True, "e": "รูปแบบไฟล์ ตัวตรวจข้อมูล และการทดสอบทั้งหมดขึ้นกับข้อนี้"},
     ]})

# ─────────────── M2 Architecture ───────────────
add({"title": "Milestone 2: ออกแบบโครงสร้าง", "kind": "M2 · Architecture", "desc": "แบ่งระบบเป็นโมดูลที่แต่ละส่วนมีหน้าที่เดียว: <b>item</b> (ตรวจและแปลงข้อมูลสินค้า) · <b>inventory</b> (เก็บสินค้า · opaque) · <b>cli</b> (รับคำสั่งและแสดงผล) — แล้วตัดสินใจว่าความรับผิดชอบแต่ละอย่างอยู่ที่ไหน", "goal": "ตอบถูกครบทุกข้อ", "xp": 50,
     "quiz": [
         {"t": "order", "q": "เรียงลำดับการสร้างจากส่วนที่ไม่พึ่งใครไปหาส่วนที่พึ่งส่วนอื่น", "items": ["item: ตรวจและแปลงข้อมูลสินค้า", "inventory: เก็บและค้นหาสินค้า", "การบันทึก/โหลดไฟล์ (ใช้ item + inventory)", "cli: รับคำสั่งจากผู้ใช้"], "e": "สร้างและทดสอบจากล่างขึ้นบน — โมดูลล่างทดสอบได้โดยไม่ต้องมี cli"},
         {"t": "mc", "q": "โมดูลใดควรพิมพ์ข้อความถึงผู้ใช้", "c": ["cli เท่านั้น — โมดูลอื่นคืนสถานะหรือข้อความผิดพลาดให้ cli ตัดสินใจ", "ทุกโมดูลพิมพ์เองเมื่อเกิดข้อผิดพลาด", "inventory เพราะรู้ข้อมูลมากที่สุด", "item เพราะเป็นตัวตรวจข้อมูล"], "a": 0, "e": "แยกตรรกะออกจากการแสดงผล ทำให้นำโมดูลไปใช้ซ้ำและทดสอบได้"},
         {"t": "mc", "q": "ทำไม inventory ควรเป็น opaque type", "c": ["cli แก้จำนวนสินค้าตรงๆ ไม่ได้ ต้องผ่านฟังก์ชันที่ตรวจกฎ และเปลี่ยนโครงสร้างภายในได้ภายหลัง", "เพื่อให้โปรแกรมเร็วขึ้น", "เพราะ struct ใหญ่เกินไป", "เพราะ C บังคับ"], "a": 0, "e": "เช่น เปลี่ยนจากอาร์เรย์เป็น hash table โดย cli ไม่ต้องแก้"},
     ]})

# ─────────────── M3 Data structures (multi-file) ───────────────
INV_H = r'''// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

#include <stddef.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

typedef struct Inventory Inventory;

Inventory *inv_create(void);                                  /* NULL ถ้าจองไม่ได้ · ผู้เรียกต้อง inv_destroy */
void inv_destroy(Inventory *inv);                             /* รับ NULL ได้ */
int inv_add(Inventory *inv, const Item *it);                  /* 1 = เพิ่มแล้ว · 0 = รหัสซ้ำหรือจองไม่ได้ */
Item *inv_find(Inventory *inv, const char *sku);              /* NULL ถ้าไม่พบ · inventory เป็นเจ้าของ */
size_t inv_count(const Inventory *inv);
const Item *inv_at(const Inventory *inv, size_t i);           /* ลำดับที่เพิ่ม · NULL ถ้าเกิน */

#endif
'''
INV_C_SOL = r'''// === inventory.c ===
#include "inventory.h"
#include <stdlib.h>
#include <string.h>

struct Inventory {
    Item *items;
    size_t count;
    size_t cap;
};

Inventory *inv_create(void) {
    Inventory *inv = malloc(sizeof *inv);
    if (inv != NULL) {
        inv->items = NULL;
        inv->count = 0;
        inv->cap = 0;
    }
    return inv;
}

void inv_destroy(Inventory *inv) {
    if (inv == NULL) {
        return;
    }
    free(inv->items);
    free(inv);
}

Item *inv_find(Inventory *inv, const char *sku) {
    for (size_t i = 0; i < inv->count; i++) {
        if (strcmp(inv->items[i].sku, sku) == 0) {
            return &inv->items[i];
        }
    }
    return NULL;
}

int inv_add(Inventory *inv, const Item *it) {
    if (inv_find(inv, it->sku) != NULL) {
        return 0;
    }
    if (inv->count == inv->cap) {
        size_t nc = inv->cap ? inv->cap * 2 : 4;
        Item *t = realloc(inv->items, nc * sizeof *t);
        if (t == NULL) {
            return 0;
        }
        inv->items = t;
        inv->cap = nc;
    }
    inv->items[inv->count++] = *it;
    return 1;
}

size_t inv_count(const Inventory *inv) {
    return inv->count;
}

const Item *inv_at(const Inventory *inv, size_t i) {
    return i < inv->count ? &inv->items[i] : NULL;
}
'''
M3_MAIN = r'''// === main.c ===
#include <stdio.h>
#include <string.h>
#include "inventory.h"

int main(void) {
    Inventory *inv = inv_create();
    if (inv == NULL) {
        return 1;
    }
    char cmd[16];
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            Item it;
            memset(&it, 0, sizeof it);
            if (scanf("%15s %47s %d %ld", it.sku, it.name, &it.qty, &it.price) != 4) {
                break;
            }
            puts(inv_add(inv, &it) ? "เพิ่มแล้ว" : "รหัสซ้ำ");
        } else if (strcmp(cmd, "find") == 0) {
            char sku[16];
            if (scanf("%15s", sku) != 1) {
                break;
            }
            const Item *it = inv_find(inv, sku);
            if (it == NULL) {
                printf("ไม่พบ %s\n", sku);
            } else {
                printf("%s: %s · คงเหลือ %d · ราคา %ld.%02ld บาท\n", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
            }
        } else if (strcmp(cmd, "count") == 0) {
            printf("จำนวนสินค้า: %zu\n", inv_count(inv));
        }
    }
    inv_destroy(inv);
    return 0;
}
'''
M3_STARTER = INV_H + "\n// === inventory.c ===\n#include \"inventory.h\"\n#include <stdlib.h>\n#include <string.h>\n\n/* struct Inventory { … }; แล้วนิยาม API ทั้งหมดตามที่ header สัญญาไว้ (อาร์เรย์ที่ขยายได้ · ความจุ 0 → 4 → ×2) */\n\n" + M3_MAIN
M3_SOL = INV_H + "\n" + INV_C_SOL + "\n" + M3_MAIN
M3_WRONG = M3_SOL.replace('''    if (inv_find(inv, it->sku) != NULL) {
        return 0;
    }
    if''', '''    if''')
add({"title": "Milestone 3: โครงสร้างข้อมูลของคลัง", "kind": "M3 · Data Structures", "memcheck": True,
     "desc": "เขียน <code>inventory.c</code> ให้ทำตามสัญญาใน <code>inventory.h</code> (ให้มาแล้ว · ห้ามแก้): เก็บสินค้าในอาร์เรย์ที่ขยายได้ภายใน opaque struct · ห้ามรหัสซ้ำ · <code>inv_find</code> คืนพอยน์เตอร์ที่ inventory เป็นเจ้าของ · main.c ให้มาแล้วเช่นกัน",
     "goal": "input: คำสั่ง <code>add SKU ชื่อ จำนวน ราคาสตางค์</code> · <code>find SKU</code> · <code>count</code> · ผลลัพธ์ตามที่ main.c พิมพ์ · ต้องไม่รั่ว",
     "starter": M3_STARTER, "xp": 90,
     "hints": ["struct Inventory { Item *items; size_t count; size_t cap; }; — อยู่ใน inventory.c เท่านั้น", "inv_add: ตรวจรหัสซ้ำด้วย inv_find ก่อน · เต็มแล้วขยายด้วย realloc ผ่าน tmp · คัดลอกทั้ง struct ด้วย inv->items[inv->count++] = *it;", "inv_destroy: free(inv->items); free(inv); (รับ NULL ได้)"],
     "require": [{"re": "^(?![\\s\\S]*//\\s*=+\\s*inventory\\.h\\s*=+(?:(?!//\\s*=+)[\\s\\S])*struct\\s+Inventory\\s*\\{)", "msg": "ห้ามเปิดเผยสมาชิกของ struct Inventory ใน header"}, {"re": "//\\s*=+\\s*inventory\\.c\\s*=+(?:(?!//\\s*=+)[\\s\\S])*struct\\s+Inventory\\s*\\{", "msg": "นิยาม struct Inventory ใน inventory.c"}],
     "tests": [["V", "add TEA-01 GreenTea 10 1250\nadd COF-02 Coffee 5 4500\nadd TEA-01 Dup 1 1\nfind TEA-01\nfind XX\ncount", "เพิ่มแล้ว\nเพิ่มแล้ว\nรหัสซ้ำ\nTEA-01: GreenTea · คงเหลือ 10 · ราคา 12.50 บาท\nไม่พบ XX\nจำนวนสินค้า: 2"],
               ["H", "count\nfind A", "จำนวนสินค้า: 0\nไม่พบ A", "คลังว่าง"],
               ["H", "add A1 a 1 5\nadd A2 b 2 5\nadd A3 c 3 5\nadd A4 d 4 5\nadd A5 e 5 7\nfind A1\nfind A5\ncount", "เพิ่มแล้ว\nเพิ่มแล้ว\nเพิ่มแล้ว\nเพิ่มแล้ว\nเพิ่มแล้ว\nA1: a · คงเหลือ 1 · ราคา 0.05 บาท\nA5: e · คงเหลือ 5 · ราคา 0.07 บาท\nจำนวนสินค้า: 5", "ขยายความจุแล้วข้อมูลเดิมยังอยู่ครบ"]]},
    M3_SOL, M3_WRONG)

# ─────────────── M4 File format ───────────────
M4_MAIN = r'''int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        Item it;
        const char *err = item_parse(line, &it);
        if (err != NULL) {
            printf("ผิด: %s\n", err);
        } else {
            char out[128];
            item_format(&it, out, sizeof out);
            printf("ถูกต้อง: %s\n", out);
        }
    }
    return 0;
}
'''
M4_SOL = HDR + ITEM_T + "\n" + VALID + "\n" + PARSE + "\n" + M4_MAIN
M4_STARTER = HDR + ITEM_T + "\n/* เขียน validSku · parseQty · parsePrice · item_parse · item_format\n   item_parse คืน NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนข้อความเหตุผลตามลำดับการตรวจในโจทย์ */\n\n" + M4_MAIN
M4_WRONG = M4_SOL.replace('''        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }''', '''        while (isdigit((unsigned char)s[i])) {
            sat = sat * 10 + (s[i] - '0');
            i++;
        }''')
add({"title": "Milestone 4: รูปแบบไฟล์ข้อมูล", "kind": "M4 · File Format",
     "desc": "กำหนดรูปแบบบรรทัดในไฟล์: <code>SKU|ชื่อ|จำนวน|ราคา</code> แล้วเขียนตัวแปลงสองทาง · <code>item_parse</code> ตรวจตามลำดับ: ต้องมี 4 ช่องพอดี → รหัส (A–Z 0–9 - ยาว 1–15) → ชื่อ (1–47 ไบต์) → จำนวน (จำนวนเต็ม ≥ 0) → ราคา (บาท ทศนิยมไม่เกิน 2 ตำแหน่ง ต้องมีตัวเลขหน้าจุด ไม่เกิน 10,000,000.00) · <code>item_format</code> เขียนกลับในรูปแบบมาตรฐาน (ราคา 2 ตำแหน่งเสมอ) — แยกช่องเอง เพราะ strtok ข้ามช่องว่าง",
     "goal": "input: บรรทัดข้อมูลจนจบ · แสดง <b>ถูกต้อง: รูปแบบมาตรฐาน</b> หรือ <b>ผิด: เหตุผล</b> (จำนวนช่องไม่ครบ · รหัสสินค้าไม่ถูกต้อง · ชื่อว่างหรือยาวเกิน · จำนวนไม่ถูกต้อง · ราคาไม่ถูกต้อง)",
     "starter": M4_STARTER, "xp": 90,
     "hints": ["แยกช่อง: คัดลอกบรรทัดลงบัฟเฟอร์ แล้วเดินแทน '|' ด้วย '\\0' เก็บพอยน์เตอร์ต้นแต่ละช่อง · นับได้ไม่ใช่ 4 = ช่องไม่ครบ (ช่องว่างยังนับเป็นช่อง)", "ราคา: อ่านตัวเลขหน้าจุดเป็นบาท · ถ้ามีจุดต้องตามด้วย 1–2 หลัก (1 หลัก = ×10 สตางค์) · ต้องจบสตริงพอดี · ตรวจขอบบนระหว่างอ่านกันล้น", "format: snprintf(buf, size, \"%s|%s|%d|%ld.%02ld\", sku, name, qty, price / 100, price % 100);"],
     "tests": [["V", "TEA-01|ชาเขียว|10|12.5\ntea|x|1|1\nA||1|1", "ถูกต้อง: TEA-01|ชาเขียว|10|12.50\nผิด: รหัสสินค้าไม่ถูกต้อง\nผิด: ชื่อว่างหรือยาวเกิน"],
               ["H", "A|x|-1|1\nA|x|1x|1\nA|x|1|1.234\nA|x|1|.5\nA|x|1|7.", "ผิด: จำนวนไม่ถูกต้อง\nผิด: จำนวนไม่ถูกต้อง\nผิด: ราคาไม่ถูกต้อง\nผิด: ราคาไม่ถูกต้อง\nผิด: ราคาไม่ถูกต้อง", "จำนวนและราคาที่ผิดรูปแบบ"],
               ["H", "A|x|1\nA|x|1|1|9\n\n", "ผิด: จำนวนช่องไม่ครบ\nผิด: จำนวนช่องไม่ครบ\nผิด: จำนวนช่องไม่ครบ", "ช่องขาด ช่องเกิน และบรรทัดว่าง"],
               ["H", "Z-9|n|0|0\nB|n|2147483647|10000000.00\nB|n|1|10000000.01\nABCDEFGHIJKLMNOP|n|1|1", "ถูกต้อง: Z-9|n|0|0.00\nถูกต้อง: B|n|2147483647|10000000.00\nผิด: ราคาไม่ถูกต้อง\nผิด: รหัสสินค้าไม่ถูกต้อง", "ค่าขอบของทุกช่อง"]]},
    M4_SOL, M4_WRONG)

# ─────────────── M5 Parser ───────────────
TOK = r'''/* แยกคำสั่งในที่เดิม · "…" รวมเป็นหนึ่งอาร์กิวเมนต์ (ใส่ได้เฉพาะต้นอาร์กิวเมนต์) · คืนจำนวน หรือ -1 พร้อม *err */
static int tokenize(char *line, char *argv[], int max, const char **err) {
    int n = 0;
    char *p = line;
    for (;;) {
        while (*p == ' ' || *p == '\t') {
            p++;
        }
        if (*p == '\0') {
            return n;
        }
        if (n == max) {
            *err = "อาร์กิวเมนต์มากเกินไป";
            return -1;
        }
        if (*p == '"') {
            p++;
            argv[n++] = p;
            while (*p != '\0' && *p != '"') {
                p++;
            }
            if (*p != '"') {
                *err = "เครื่องหมายคำพูดไม่ครบ";
                return -1;
            }
            *p++ = '\0';
        } else {
            argv[n++] = p;
            while (*p != '\0' && *p != ' ' && *p != '\t') {
                p++;
            }
            if (*p != '\0') {
                *p++ = '\0';
            }
        }
    }
}
'''
M5_MAIN = r'''int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *argv[8];
        const char *err = NULL;
        int n = tokenize(line, argv, 8, &err);
        if (n < 0) {
            printf("ผิด: %s\n", err);
        } else if (n == 0) {
            puts("(ว่าง)");
        } else {
            for (int i = 0; i < n; i++) {
                printf(i ? " [%s]" : "[%s]", argv[i]);
            }
            printf("\n");
        }
    }
    return 0;
}
'''
M5_SOL = "#include <stdio.h>\n#include <string.h>\n\n" + TOK + "\n" + M5_MAIN
M5_STARTER = "#include <stdio.h>\n#include <string.h>\n\n/* int tokenize(char *line, char *argv[], int max, const char **err) */\n\n" + M5_MAIN
M5_WRONG = M5_SOL.replace('''            if (*p != '"') {
                *err = "เครื่องหมายคำพูดไม่ครบ";
                return -1;
            }
            *p++ = '\\0';''', '''            if (*p == '"') {
                *p++ = '\\0';
            }''')
add({"title": "Milestone 5: ตัวแยกคำสั่ง", "kind": "M5 · Parser",
     "desc": "ชื่อสินค้ามีช่องว่างได้ เช่น <code>add TEA-01 \"Green Tea\" 10 12.5</code> — เขียน <code>tokenize</code> ที่แยกบรรทัด<b>ในบัฟเฟอร์เดิม</b> (เขียน '\\0' และเก็บพอยน์เตอร์ · ไม่จองหน่วยความจำ) · ช่องว่างและแท็บคั่น · <code>\"…\"</code> ที่ต้นอาร์กิวเมนต์รวมเป็นหนึ่งอาร์กิวเมนต์ (ว่างได้) · ไม่ปิดคำพูด หรือเกิน 8 อาร์กิวเมนต์ = ผิดพลาด",
     "goal": "input: บรรทัดคำสั่งจนจบ · แสดง <b>[arg1] [arg2] …</b> หรือ <b>(ว่าง)</b> หรือ <b>ผิด: เครื่องหมายคำพูดไม่ครบ</b> / <b>ผิด: อาร์กิวเมนต์มากเกินไป</b>",
     "starter": M5_STARTER, "xp": 80,
     "hints": ["วน: ข้ามช่องว่าง → จบสตริงคืนจำนวน → ถ้าเต็ม max แล้วคือผิดพลาด → ถ้าขึ้นต้นด้วย \" เก็บตำแหน่งถัดไปแล้วเดินหา \" ปิด · ไม่เช่นนั้นเดินจนเจอช่องว่าง", "ปิดอาร์กิวเมนต์ด้วยการเขียน '\\0' ทับตัวคั่น (หรือทับ \" ปิด) แล้วเลื่อนต่อ", "เทคนิคเดียวกับ splitWords ในบอส 5 (บทที่ 15)"],
     "require": [{"re": "^(?![\\s\\S]*\\b(?:malloc|strtok)\\s*\\()", "noComments": True, "msg": "แยกในบัฟเฟอร์เดิมด้วยพอยน์เตอร์ (ไม่จองหน่วยความจำและไม่ใช้ strtok)"}],
     "tests": [["V", "add TEA-01 \"Green Tea\" 10 12.5\n   \nadd \"x", "[add] [TEA-01] [Green Tea] [10] [12.5]\n(ว่าง)\nผิด: เครื่องหมายคำพูดไม่ครบ"],
               ["H", "\"\" a\nlist", "[] [a]\n[list]", "คำพูดว่างและคำเดียว"],
               ["H", "a b c d e f g h\na b c d e f g h i", "[a] [b] [c] [d] [e] [f] [g] [h]\nผิด: อาร์กิวเมนต์มากเกินไป", "8 อาร์กิวเมนต์พอดีและเกินหนึ่ง"],
               ["H", "\tsell\t\tA   3  \nsay a\"b", "[sell] [A] [3]\n[say] [a\"b]", "แท็บ ช่องว่างซ้อน และคำพูดกลางคำ"]]},
    M5_SOL, M5_WRONG)

# ─────────────── M6 Core operations ───────────────
M6_TOP = HDR + ITEM_T + r'''
typedef enum {
    STOCK_OK = 0,
    STOCK_NOT_FOUND,
    STOCK_BAD_AMOUNT,
    STOCK_INSUFFICIENT,
    STOCK_OVERFLOW
} StockStatus;

typedef struct {
    Item items[100];
    int count;
} Store;

static Item *findItem(Store *s, const char *sku) {
    for (int i = 0; i < s->count; i++) {
        if (strcmp(s->items[i].sku, sku) == 0) {
            return &s->items[i];
        }
    }
    return NULL;
}
'''
M6_OPS = r'''StockStatus stock_sell(Store *s, const char *sku, int n) {
    Item *it = findItem(s, sku);
    if (it == NULL) {
        return STOCK_NOT_FOUND;
    }
    if (n <= 0) {
        return STOCK_BAD_AMOUNT;
    }
    if (n > it->qty) {
        return STOCK_INSUFFICIENT;
    }
    it->qty -= n;
    return STOCK_OK;
}

StockStatus stock_restock(Store *s, const char *sku, int n) {
    Item *it = findItem(s, sku);
    if (it == NULL) {
        return STOCK_NOT_FOUND;
    }
    if (n <= 0) {
        return STOCK_BAD_AMOUNT;
    }
    if (it->qty > INT_MAX - n) {
        return STOCK_OVERFLOW;
    }
    it->qty += n;
    return STOCK_OK;
}

long long stock_value(const Store *s) {
    long long total = 0;
    for (int i = 0; i < s->count; i++) {
        total += (long long)s->items[i].qty * s->items[i].price;
    }
    return total;
}
'''
M6_MAIN = r'''
int main(void) {
    static Store s;
    scanf("%d", &s.count);
    for (int i = 0; i < s.count; i++) {
        Item *it = &s.items[i];
        scanf("%15s %47s %d %ld", it->sku, it->name, &it->qty, &it->price);
    }
    char cmd[16], sku[16];
    int n = 0;
    while (scanf("%15s", cmd) == 1) {
        if (strcmp(cmd, "value") == 0) {
            long long v = stock_value(&s);
            printf("มูลค่ารวม: %lld.%02lld บาท\n", v / 100, v % 100);
            continue;
        }
        if (scanf("%15s %d", sku, &n) != 2) {
            break;
        }
        int selling = strcmp(cmd, "sell") == 0;
        StockStatus st = selling ? stock_sell(&s, sku, n) : stock_restock(&s, sku, n);
        const Item *it = findItem(&s, sku);
        switch (st) {
            case STOCK_OK:
                printf(selling ? "ขาย %s %d เหลือ %d\n" : "เติม %s %d รวม %d\n", sku, n, it->qty);
                break;
            case STOCK_NOT_FOUND: printf("ไม่พบ %s\n", sku); break;
            case STOCK_BAD_AMOUNT: puts("จำนวนไม่ถูกต้อง"); break;
            case STOCK_INSUFFICIENT: printf("สินค้าไม่พอ (มี %d)\n", it->qty); break;
            case STOCK_OVERFLOW: puts("เกินขีดจำกัด"); break;
        }
    }
    return 0;
}
'''
M6_SOL = M6_TOP + "\n" + M6_OPS + M6_MAIN
M6_STARTER = M6_TOP + "\n/* StockStatus stock_sell(Store *s, const char *sku, int n)     ตรวจตามลำดับ: ไม่พบ → จำนวน ≤ 0 → ไม่พอ\n   StockStatus stock_restock(Store *s, const char *sku, int n)  ไม่พบ → จำนวน ≤ 0 → จำนวนรวมจะเกิน INT_MAX\n   long long stock_value(const Store *s)                        ผลรวมของ จำนวน × ราคา (สตางค์) */\n" + M6_MAIN
M6_WRONG = M6_SOL.replace("total += (long long)s->items[i].qty * s->items[i].price;", "total += s->items[i].qty * s->items[i].price;")
add({"title": "Milestone 6: กฎทางธุรกิจของคลัง", "kind": "M6 · Core Modules",
     "desc": "เขียนตรรกะหลักเป็นฟังก์ชันที่<b>คืนสถานะ</b> (ไม่พิมพ์เอง · main เป็นคนแปลสถานะเป็นข้อความ): ขาย · เติมของ · มูลค่ารวม — ระวังการคูณ จำนวน × ราคา ที่อาจเกินช่วงของ long บนแพลตฟอร์มนี้ (32 บิต) และการเติมของที่ทำให้จำนวนเกิน INT_MAX",
     "goal": "input: n สินค้า (<code>SKU ชื่อ จำนวน ราคาสตางค์</code>) แล้วคำสั่ง <code>sell SKU n</code> · <code>restock SKU n</code> · <code>value</code> · ผลลัพธ์ตามที่ main พิมพ์",
     "starter": M6_STARTER, "xp": 80,
     "hints": ["ตรวจตามลำดับที่กำหนดแล้ว return สถานะทันทีที่เจอปัญหา · แก้จำนวนเฉพาะเมื่อผ่านทุกการตรวจ", "เกินขีดจำกัด: it->qty > INT_MAX - n (ตรวจก่อนบวก · บทที่ 28)", "มูลค่า: แปลงเป็น long long ก่อนคูณ — long บนแพลตฟอร์มนี้มีแค่ 32 บิต"],
     "tests": [["V", "2\nTEA-01 Tea 10 1250\nCOF-02 Coffee 5 4500\nsell TEA-01 3\nsell COF-02 9\nrestock COF-02 5\nsell XX 1\nvalue", "ขาย TEA-01 3 เหลือ 7\nสินค้าไม่พอ (มี 5)\nเติม COF-02 5 รวม 10\nไม่พบ XX\nมูลค่ารวม: 537.50 บาท"],
               ["H", "1\nA a 5 100\nsell A 0\nrestock A -2\nsell A 5\nvalue", "จำนวนไม่ถูกต้อง\nจำนวนไม่ถูกต้อง\nขาย A 5 เหลือ 0\nมูลค่ารวม: 0.00 บาท", "จำนวนผิดและขายหมดพอดี"],
               ["H", "1\nB b 2147483000 1\nrestock B 1000\nrestock B 647\nvalue", "เกินขีดจำกัด\nเติม B 647 รวม 2147483647\nมูลค่ารวม: 21474836.47 บาท", "จำนวนใกล้ INT_MAX"],
               ["H", "1\nC c 3000000 100000000\nvalue", "มูลค่ารวม: 3000000000000.00 บาท", "จำนวน × ราคา เกิน 32 บิต"]]},
    M6_SOL, M6_WRONG)

# ─────────────── M7 Memory ───────────────
M7_BASE = r'''#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *text;
    struct Entry *next;
} Entry;

static char *dupString(const char *s) {
    size_t n = strlen(s) + 1;
    char *p = malloc(n);
    if (p != NULL) {
        memcpy(p, s, n);
    }
    return p;
}

static int history_add(Entry **head, const char *text) {
    Entry *e = malloc(sizeof *e);
    char *copy = dupString(text);
    if (e == NULL || copy == NULL) {
        free(e);
        free(copy);
        return 0;
    }
    e->text = copy;
    e->next = *head;
    *head = e;
    return 1;
}

/* ถอดรายการล่าสุดออก · คัดลอกข้อความลง buf · คืน 0 ถ้าว่าง */
static int history_undo(Entry **head, char *buf, size_t size) {
    Entry *e = *head;
    if (e == NULL) {
        return 0;
    }
    snprintf(buf, size, "%s", e->text);
    *head = e->next;
UNDO_FREE
    return 1;
}

/* คืนทุกรายการ · คืนจำนวนที่ลบ */
static int history_clear(Entry **head) {
    int n = 0;
CLEAR_BODY
    *head = NULL;
    return n;
}

int main(void) {
    Entry *head = NULL;
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        if (strncmp(line, "log ", 4) == 0) {
            if (!history_add(&head, line + 4)) {
                break;
            }
        } else if (strcmp(line, "undo") == 0) {
            char buf[256];
            if (history_undo(&head, buf, sizeof buf)) {
                printf("ยกเลิก: %s\n", buf);
            } else {
                puts("ไม่มีประวัติ");
            }
        } else if (strcmp(line, "show") == 0) {
            if (head == NULL) {
                puts("(ว่าง)");
            }
            int i = 1;
            for (const Entry *e = head; e != NULL; e = e->next) {
                printf("%d. %s\n", i++, e->text);
            }
        } else if (strcmp(line, "clear") == 0) {
            printf("ล้างแล้ว %d รายการ\n", history_clear(&head));
        }
    }
    history_clear(&head);
    return 0;
}
'''
CLEAR_BAD = '''    for (Entry *e = *head; e != NULL; e = e->next) {
        free(e->text);
        free(e);
        n++;
    }'''
CLEAR_OK = '''    Entry *e = *head;
    while (e != NULL) {
        Entry *next = e->next;
        free(e->text);
        free(e);
        e = next;
        n++;
    }'''
M7_STARTER = M7_BASE.replace("UNDO_FREE\n", "    free(e);\n").replace("CLEAR_BODY", CLEAR_BAD)
M7_SOL = M7_BASE.replace("UNDO_FREE\n", "    free(e->text);\n    free(e);\n").replace("CLEAR_BODY", CLEAR_OK)
M7_WRONG = M7_BASE.replace("UNDO_FREE\n", "    free(e);\n").replace("CLEAR_BODY", CLEAR_OK)
add({"title": "Milestone 7: ตรวจหน่วยความจำของประวัติรายการ", "kind": "M7 · Memory", "memcheck": True,
     "desc": "โมดูลประวัติรายการ (ใช้ทำ undo) ผ่านการทดสอบตามปกติ แต่มี<b>บั๊กหน่วยความจำสองจุด</b> — หาและแก้ให้ Memory Checker ผ่านทุกเส้นทาง (ทั้ง undo · clear · และตอนจบโปรแกรม)",
     "goal": "input: คำสั่ง <code>log ข้อความ</code> · <code>undo</code> · <code>show</code> · <code>clear</code> · ผลลัพธ์ตามที่ main พิมพ์ · ต้องไม่รั่วและไม่ใช้หน่วยความจำที่คืนแล้ว",
     "starter": M7_STARTER, "xp": 80,
     "hints": ["ลองส่ง: กรณีที่มี undo จะรั่ว (Memory Error บอกบรรทัดที่จอง) · กรณีที่ล้างประวัติหลายรายการจะใช้หน่วยความจำที่คืนแล้ว", "undo ถอดโหนดออกแล้ว ใครเป็นเจ้าของ e->text? (คัดลอกลง buf แล้ว ต้นฉบับไม่มีใครใช้)", "clear: เก็บ next ไว้ก่อน free โหนด (บทที่ 24)"],
     "tests": [["V", "log ขายชา 3\nlog เติมกาแฟ 5\nshow\nundo\nshow", "1. เติมกาแฟ 5\n2. ขายชา 3\nยกเลิก: เติมกาแฟ 5\n1. ขายชา 3"],
               ["H", "log a\nlog b\nlog c\nclear\nshow\nundo", "ล้างแล้ว 3 รายการ\n(ว่าง)\nไม่มีประวัติ", "ล้างหลายรายการ"],
               ["H", "undo\nlog x\nundo\nundo\nshow", "ไม่มีประวัติ\nยกเลิก: x\nไม่มีประวัติ\n(ว่าง)", "undo จนหมด"],
               ["H", "log 1\nlog 2", "", "จบโปรแกรมโดยยังมีประวัติ (ต้องคืนตอนจบ)"]]},
    M7_SOL, M7_WRONG)

# ─────────────── M8 Error handling ───────────────
LOAD_BASE = r'''/* โหลดทั้งไฟล์แบบ "ทั้งหมดหรือไม่เลย" · คืน 1 สำเร็จ (ได้ *items และ *count ที่ผู้เรียกต้อง free)
   คืน 0 เมื่อไม่มีไฟล์ · คืน -1 เมื่อไฟล์เสีย (ตั้ง *badLine และ *why) */
static int load_items(const char *path, Item **items, int *count, int *badLine, const char **why) {
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        return 0;
    }
    Item *list = NULL;
    int n = 0, cap = 0, lineNo = 0;
    int result = -1;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        lineNo++;
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        Item it;
        const char *err = item_parse(line, &it);
        if (err != NULL) {
            *badLine = lineNo;
            *why = err;
BAD_EXIT
        }
        if (n == cap) {
            int nc = cap ? cap * 2 : 4;
            Item *t = realloc(list, (size_t)nc * sizeof *t);
            if (t == NULL) {
                *badLine = lineNo;
                *why = "หน่วยความจำไม่พอ";
BAD_EXIT
            }
            list = t;
            cap = nc;
        }
        list[n++] = it;
    }
    *items = list;
    *count = n;
    list = NULL;
    result = 1;
CLEANUP
}
'''
M8_MAIN = r'''
int main(void) {
    Item *items = NULL;
    int count = 0, badLine = 0;
    const char *why = NULL;
    int r = load_items("/data/stock.db", &items, &count, &badLine, &why);
    if (r == 0) {
        puts("ยังไม่มีไฟล์ข้อมูล (เริ่มด้วยคลังว่าง)");
    } else if (r < 0) {
        printf("ไฟล์เสียที่บรรทัด %d: %s\n", badLine, why);
        puts("เริ่มด้วยคลังว่าง");
    } else {
        printf("โหลดแล้ว %d รายการ\n", count);
        for (int i = 0; i < count; i++) {
            printf("%s %s %d %ld.%02ld\n", items[i].sku, items[i].name, items[i].qty, items[i].price / 100, items[i].price % 100);
        }
    }
    free(items);
    return 0;
}
'''
M8_PRE = HDR + ITEM_T + "\n" + VALID + "\n" + PARSE[:PARSE.find("static void item_format")] + "\n"
M8_STARTER = M8_PRE + LOAD_BASE.replace("BAD_EXIT", "            return -1;").replace("CLEANUP\n", "    fclose(f);\n    return result;\n") + M8_MAIN
M8_SOL = M8_PRE + LOAD_BASE.replace("BAD_EXIT", "            goto cleanup;").replace("CLEANUP\n", "cleanup:\n    free(list);\n    fclose(f);\n    return result;\n") + M8_MAIN
M8_WRONG = M8_PRE + LOAD_BASE.replace("BAD_EXIT", "            fclose(f);\n            return -1;").replace("CLEANUP\n", "    fclose(f);\n    return result;\n") + M8_MAIN
add({"title": "Milestone 8: โหลดไฟล์แบบทั้งหมดหรือไม่เลย", "kind": "M8 · Error Handling", "memcheck": True,
     "desc": "ข้อกำหนดจาก Milestone 1: ไฟล์เสียแม้บรรทัดเดียว = <b>ไม่ใช้ข้อมูลจากไฟล์เลย</b> และบอกบรรทัดที่เสีย — แต่ <code>load_items</code> return กลางลูปทันทีที่เจอปัญหา ทำให้อาร์เรย์ที่โหลดไปแล้วรั่วและไฟล์ไม่ถูกปิด · ปรับเป็น <b>goto cleanup</b> ให้ทุกเส้นทางคืนทรัพยากรที่จุดเดียว",
     "goal": "แสดง <b>โหลดแล้ว k รายการ</b> พร้อมรายการ · หรือ <b>ไฟล์เสียที่บรรทัด N: เหตุผล</b> + <b>เริ่มด้วยคลังว่าง</b> · หรือ <b>ยังไม่มีไฟล์ข้อมูล (เริ่มด้วยคลังว่าง)</b> · ต้องไม่รั่ว",
     "starter": M8_STARTER, "xp": 80,
     "hints": ["ทุกจุดที่ return -1 ในลูปทิ้ง list และ f ไว้ — เปลี่ยนเป็น goto ไปจุด cleanup เดียว", "ที่ cleanup: free(list); fclose(f); return result; — เส้นทางสำเร็จตั้ง list = NULL หลังส่งต่อความเป็นเจ้าของให้ผู้เรียกแล้ว จึง free(NULL) ได้อย่างปลอดภัย", "บรรทัดว่างข้ามได้แต่ยังนับเลขบรรทัด"],
     "require": [{"re": "\\bgoto\\s+cleanup\\s*;", "msg": "รวมการคืนทรัพยากรไว้ที่จุด cleanup เดียว (goto cleanup)"}],
     "tests": [{"in": "", "out": "โหลดแล้ว 2 รายการ\nTEA-01 ชาเขียว 10 12.50\nCOF-02 กาแฟ 5 45.00", "files": {"stock.db": "TEA-01|ชาเขียว|10|12.50\n\nCOF-02|กาแฟ|5|45\n"}},
               {"in": "", "out": "ไฟล์เสียที่บรรทัด 3: ราคาไม่ถูกต้อง\nเริ่มด้วยคลังว่าง", "hidden": True, "label": "บรรทัดที่ 3 เสีย (สองบรรทัดแรกโหลดไปแล้วต้องถูกคืน)", "files": {"stock.db": "A|a|1|1\nB|b|2|2\nC|c|3|x\nD|d|4|4\n"}},
               ["H", "", "ยังไม่มีไฟล์ข้อมูล (เริ่มด้วยคลังว่าง)", "ไม่มีไฟล์"],
               {"in": "", "out": "ไฟล์เสียที่บรรทัด 1: จำนวนช่องไม่ครบ\nเริ่มด้วยคลังว่าง", "hidden": True, "label": "เสียตั้งแต่บรรทัดแรก", "files": {"stock.db": "garbage\n"}},
               {"in": "", "out": "โหลดแล้ว 5 รายการ\nA1 a 1 0.01\nA2 a 1 0.01\nA3 a 1 0.01\nA4 a 1 0.01\nA5 a 1 0.01", "hidden": True, "label": "ต้องขยายอาร์เรย์ระหว่างโหลด", "files": {"stock.db": "A1|a|1|0.01\nA2|a|1|0.01\nA3|a|1|0.01\nA4|a|1|0.01\nA5|a|1|0.01\n"}}]},
    M8_SOL, M8_WRONG)

# ─────────────── M9 Tests (mutation) ───────────────
PP_OK = VALID[VALID.find("/* ราคาเป็นบาท"):]
def pp_variant(name, body): return body.replace("static int parsePrice(", "static int " + name + "(")
M9_MUT = {
    "bugThreeDigits": PP_OK.replace('''        if (isdigit((unsigned char)s[i])) {
            sat += s[i] - '0';
            i++;
        }''', '''        while (isdigit((unsigned char)s[i])) {
            i++;
        }'''),
    "bugOneDigitAsSatang": PP_OK.replace("sat = (s[i] - '0') * 10;", "sat = s[i] - '0';").replace("sat += s[i] - '0';", "sat = sat * 10 + (s[i] - '0');"),
    "bugNeedDecimal": PP_OK.replace("    if (s[i] == '.') {", "    if (s[i] != '.') {\n        return 0;\n    }\n    if (s[i] == '.') {"),
    "bugAllowMinus": PP_OK.replace("    if (!isdigit((unsigned char)s[0])) {\n        return 0;\n    }", "    if (s[0] == '-') {\n        i++;\n    }\n    if (!isdigit((unsigned char)s[i])) {\n        return 0;\n    }"),
    "bugLeadingDot": PP_OK.replace("    if (!isdigit((unsigned char)s[0])) {\n        return 0;\n    }", "    if (!isdigit((unsigned char)s[0]) && s[0] != '.') {\n        return 0;\n    }"),
    "bugNoLimit": PP_OK.replace(" || baht * 100 + sat > 1000000000L", ""),
    "bugTrailingDot": PP_OK.replace('''        if (!isdigit((unsigned char)s[i])) {
            return 0;
        }
        sat = (s[i] - '0') * 10;
        i++;''', '''        if (isdigit((unsigned char)s[i])) {
            sat = (s[i] - '0') * 10;
            i++;
        }'''),
}
for k in list(M9_MUT): assert M9_MUT[k] != PP_OK, k
M9_FUNCS = "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\ntypedef int (*PriceFn)(const char *s, long *out);\n\n/* ── ชุดทดสอบของคุณ ── */\nTESTS\n\n/* ── ฟังก์ชันที่ถูก และเวอร์ชันที่มีบั๊ก (ห้ามแก้) ── */\n" + pp_variant("correct", PP_OK) + "\n" + "\n".join(pp_variant(k, v) for k, v in M9_MUT.items()) + r'''
int main(void) {
    char mode[8] = "";
    scanf("%7s", mode);
    PriceFn fn = correct;
    PriceFn bugs[] = { bugThreeDigits, bugOneDigitAsSatang, bugNeedDecimal, bugAllowMinus, bugLeadingDot, bugNoLimit, bugTrailingDot };
    if (mode[0] == 'm' && mode[1] >= '1' && mode[1] <= '7' && mode[2] == '\0') {
        fn = bugs[mode[1] - '1'];
    }
    puts(runTests(fn) == 0 ? "ผ่านทั้งหมด" : "พบความผิดพลาด");
    return 0;
}
'''
M9_T_START = r'''static int runTests(PriceFn parse) {
    int failures = 0;
    long v = 0;
#define ACCEPT(s, expected) do { v = -1; if (!parse((s), &v) || v != (expected)) failures++; } while (0)
#define REJECT(s) do { if (parse((s), &v)) failures++; } while (0)
    ACCEPT("12.50", 1250);
    /* เพิ่มกรณีทดสอบ: ทศนิยมหนึ่งหลัก ไม่มีจุด ติดลบ ขึ้นต้นด้วยจุด จบด้วยจุด สามหลัก และขอบบน 10,000,000.00 */
#undef ACCEPT
#undef REJECT
    return failures;
}'''
M9_T_SOL = M9_T_START.replace('''    ACCEPT("12.50", 1250);
    /* เพิ่มกรณีทดสอบ: ทศนิยมหนึ่งหลัก ไม่มีจุด ติดลบ ขึ้นต้นด้วยจุด จบด้วยจุด สามหลัก และขอบบน 10,000,000.00 */''', '''    ACCEPT("12.50", 1250);
    ACCEPT("12.5", 1250);
    ACCEPT("12", 1200);
    ACCEPT("0", 0);
    ACCEPT("10000000.00", 1000000000L);
    REJECT("1.234");
    REJECT("-1");
    REJECT(".5");
    REJECT("7.");
    REJECT("");
    REJECT("10000000.01");''')
M9_SOL = M9_FUNCS.replace("TESTS", M9_T_SOL)
M9_WRONG = M9_FUNCS.replace("TESTS", M9_T_SOL.replace('    REJECT("10000000.01");\n', ''))
add({"title": "Milestone 9: ชุดทดสอบของตัวแปลงราคา", "kind": "M9 · Tests",
     "desc": "ตัวแปลงราคาคือจุดที่ผิดได้ง่ายที่สุดของระบบ (เงินผิด = ปัญหาจริง) · เขียนกรณีทดสอบใน <code>runTests</code> ด้วยมาโคร <code>ACCEPT</code> / <code>REJECT</code> ให้ผ่านกับฟังก์ชันที่ถูก และ<b>จับเวอร์ชันที่มีบั๊กได้ครบ 7 แบบ</b> · กฎ: ตัวเลขหน้าจุดอย่างน้อยหนึ่งหลัก · ถ้ามีจุดต้องตามด้วย 1–2 หลัก · ไม่ติดลบ · ไม่เกิน 10,000,000.00",
     "goal": "แก้เฉพาะ <code>runTests</code> · ฟังก์ชันที่ถูก → <b>ผ่านทั้งหมด</b> · เวอร์ชันที่มีบั๊ก → <b>พบความผิดพลาด</b>",
     "starter": M9_FUNCS.replace("TESTS", M9_T_START), "xp": 80,
     "hints": ["คิดถึงบั๊กที่น่าจะเกิดกับแต่ละกฎ แล้วเขียนกรณีที่อยู่ \"พอดีเส้น\" ของกฎนั้น", "ACCEPT ตรวจทั้งว่ารับ และค่าที่ได้ถูก (12.5 ต้องได้ 1250 ไม่ใช่ 1205) · REJECT ตรวจว่าต้องปฏิเสธ", "ขอบบน: ACCEPT(\"10000000.00\", 1000000000L) และ REJECT(\"10000000.01\")"],
     "tests": [["V", "ok", "ผ่านทั้งหมด"]] + [["H", "m%d" % (i + 1), "พบความผิดพลาด", lab] for i, lab in enumerate(["บั๊ก: รับทศนิยมสามหลัก", "บั๊ก: ทศนิยมหนึ่งหลักกลายเป็นสตางค์", "บั๊ก: บังคับต้องมีจุด", "บั๊ก: รับค่าติดลบ", "บั๊ก: รับ .5", "บั๊ก: ไม่มีขอบบน", "บั๊ก: รับ 7."])]},
    M9_SOL, M9_WRONG)

# ─────────────── M10 Performance ───────────────
M10_START = r'''#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *ids = malloc(((size_t)n + 1) * sizeof *ids);
    if (ids == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &ids[i]);
    }
    int q = 0, found = 0;
    scanf("%d", &q);
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        for (int i = 0; i < n; i++) {
            if (ids[i] == x) {
                found++;
                break;
            }
        }
    }
    printf("พบ: %d\n", found);
    free(ids);
    return 0;
}
'''
M10_SOL = r'''#include <stdio.h>
#include <stdlib.h>

static int cmpInt(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n = 0;
    scanf("%d", &n);
    int *ids = malloc(((size_t)n + 1) * sizeof *ids);
    if (ids == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &ids[i]);
    }
    qsort(ids, (size_t)n, sizeof *ids, cmpInt);
    int q = 0, found = 0;
    scanf("%d", &q);
    for (int k = 0; k < q; k++) {
        int x = 0;
        scanf("%d", &x);
        if (bsearch(&x, ids, (size_t)n, sizeof *ids, cmpInt) != NULL) {
            found++;
        }
    }
    printf("พบ: %d\n", found);
    free(ids);
    return 0;
}
'''
M10_WRONG = M10_SOL.replace("qsort(ids, (size_t)n, sizeof *ids, cmpInt);\n", "")
add({"title": "Milestone 10: ค้นหาเร็วพอสำหรับร้านใหญ่", "kind": "Performance", "memcheck": True,
     "desc": "ข้อกำหนดด้านความเร็วจาก Milestone 1: คลัง 100,000 รายการ ค้น 100,000 ครั้งต้องทันเวลา — การค้นแบบเส้นตรงคือ O(n × q) ไม่ทัน · ใช้แนวทางจาก Stage 27: เรียงครั้งเดียว แล้วค้นด้วย binary search (รหัสสินค้าในด่านนี้เป็นตัวเลข เพื่อให้สร้างข้อมูลขนาดใหญ่ได้)",
     "goal": "input: n แล้วรหัส n ตัว · q แล้วรหัสที่ค้น q ตัว · แสดง <b>พบ: k</b>",
     "starter": M10_START, "xp": 90,
     "hints": ["เรียงครั้งเดียว O(n log n) แล้วค้นแต่ละครั้ง O(log n)", "qsort(ids, (size_t)n, sizeof *ids, cmpInt); ด้วย comparator ที่ไม่ล้น", "bsearch(&x, ids, (size_t)n, sizeof *ids, cmpInt) คืน NULL ถ้าไม่พบ"],
     "tests": [["V", "5\n40 10 30 20 50\n4\n30 35 10 60", "พบ: 2"], ["H", "0\n2\n1 2", "พบ: 0", "คลังว่าง"], ["H", "3\n7 7 7\n2\n7 8", "พบ: 1", "รหัสซ้ำในข้อมูล"],
               {"gen": {"type": "ints-q", "n": 100000, "lo": 1, "hi": 300000, "seed": 31, "sorted": False, "q": 100000, "qlo": 1, "qhi": 300000}, "out": "พบ: 28539", "hidden": True, "label": "100,000 รายการ · ค้น 100,000 ครั้ง"}]},
    M10_SOL, M10_WRONG)

# ─────────────── M11 Docs ───────────────
add({"title": "Milestone 11: เอกสารและสัญญาของ API", "kind": "M11 · Docs", "desc": "โค้ดที่คนอื่น (หรือตัวคุณในอีก 6 เดือน) ใช้ต่อได้ ต้องมีเอกสารที่บอกสิ่งที่คอมไพเลอร์ตรวจให้ไม่ได้", "goal": "ตอบถูกครบทุกข้อ", "xp": 50,
     "quiz": [
         {"t": "mc", "q": "ความเห็นใน header ของ <code>Item *inv_find(Inventory *inv, const char *sku);</code> ควรบอกอะไรมากที่สุด", "c": ["คืน NULL เมื่อไม่พบ · inventory เป็นเจ้าของ ห้าม free · ใช้ได้จนกว่าจะเพิ่มสินค้าครั้งถัดไป (อาร์เรย์อาจย้ายที่)", "ฟังก์ชันนี้หาสินค้า", "ใช้ for loop ข้างใน", "เขียนโดยใคร เมื่อไร"], "a": 0, "e": "พอยน์เตอร์เข้าไปในอาร์เรย์ที่ realloc ได้จะกลายเป็น dangling เมื่ออาร์เรย์ขยาย — ต้องบอกผู้ใช้"},
         {"t": "mc", "q": "README ของโปรเจกต์ควรมีอะไร", "c": ["วิธีคอมไพล์และรัน · รูปแบบไฟล์ข้อมูล · คำสั่งที่รองรับพร้อมตัวอย่าง · ข้อจำกัดที่รู้อยู่", "โค้ดทั้งหมดของโปรแกรม", "ประวัติการแก้ไขทุกบรรทัด", "ไม่จำเป็นถ้าโค้ดอ่านง่าย"], "a": 0, "e": "ผู้ใช้ต้องเริ่มได้โดยไม่ต้องอ่านโค้ด"},
         {"t": "tf", "q": "ความเห็นที่ดีอธิบาย \"ทำไม\" และสัญญาของฟังก์ชัน มากกว่าการเล่าซ้ำว่าโค้ดแต่ละบรรทัดทำอะไร", "a": True, "e": "โค้ดบอก \"ทำอะไร\" อยู่แล้ว — สิ่งที่หายไปคือเหตุผลและเงื่อนไข"},
         {"t": "mc", "q": "รูปแบบไฟล์ <code>SKU|ชื่อ|จำนวน|ราคา</code> ควรถูกบันทึกไว้ที่ใด", "c": ["ในเอกสาร (README หรือ docs) พร้อมกฎของแต่ละช่องและตัวอย่าง", "จำไว้ในหัวก็พอ", "ในชื่อไฟล์", "ไม่ต้องบันทึก เพราะโปรแกรมรู้อยู่แล้ว"], "a": 0, "e": "รูปแบบไฟล์คือสัญญากับข้อมูลที่มีอยู่แล้ว — เปลี่ยนโดยไม่บันทึกคือทำลายข้อมูลของผู้ใช้"},
     ]})

# ─────────────── M12 Final (multi-file) ───────────────
ITEM_H = r'''// === item.h ===
#ifndef ITEM_H
#define ITEM_H

#include <stddef.h>

typedef struct {
    char sku[16];
    char name[48];
    int qty;
    long price;   /* สตางค์ */
} Item;

const char *item_parse(const char *line, Item *out);   /* NULL ถ้าถูกต้อง ไม่เช่นนั้นคืนเหตุผล */
const char *item_make(const char *sku, const char *name, const char *qty, const char *price, Item *out);
void item_format(const Item *it, char *buf, size_t size);

#endif
'''
ITEM_C = "// === item.c ===\n#include \"item.h\"\n" + HDR.replace("#include <stdio.h>\n", "#include <stdio.h>\n", 1) + VALID + r'''
const char *item_make(const char *sku, const char *name, const char *qty, const char *price, Item *out) {
    if (!validSku(sku)) {
        return "รหัสสินค้าไม่ถูกต้อง";
    }
    size_t nl = strlen(name);
    if (nl < 1 || nl > 47 || strchr(name, '|') != NULL) {
        return "ชื่อว่างหรือยาวเกิน";
    }
    int q = 0;
    if (!parseQty(qty, &q)) {
        return "จำนวนไม่ถูกต้อง";
    }
    long p = 0;
    if (!parsePrice(price, &p)) {
        return "ราคาไม่ถูกต้อง";
    }
    snprintf(out->sku, sizeof out->sku, "%s", sku);
    snprintf(out->name, sizeof out->name, "%s", name);
    out->qty = q;
    out->price = p;
    return NULL;
}

const char *item_parse(const char *line, Item *out) {
    char buf[256];
    if (strlen(line) >= sizeof buf) {
        return "จำนวนช่องไม่ครบ";
    }
    strcpy(buf, line);
    char *field[4];
    int n = 0;
    field[n++] = buf;
    for (char *p = buf; *p != '\0'; p++) {
        if (*p == '|') {
            if (n == 4) {
                return "จำนวนช่องไม่ครบ";
            }
            *p = '\0';
            field[n++] = p + 1;
        }
    }
    if (n != 4) {
        return "จำนวนช่องไม่ครบ";
    }
    return item_make(field[0], field[1], field[2], field[3], out);
}

void item_format(const Item *it, char *buf, size_t size) {
    snprintf(buf, size, "%s|%s|%d|%ld.%02ld", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
}
'''
INV12_H = r'''// === inventory.h ===
#ifndef INVENTORY_H
#define INVENTORY_H

#include <stddef.h>
#include "item.h"

typedef struct Inventory Inventory;

Inventory *inv_create(void);
void inv_destroy(Inventory *inv);
int inv_add(Inventory *inv, const Item *it);       /* 0 = รหัสซ้ำหรือจองไม่ได้ */
Item *inv_find(Inventory *inv, const char *sku);   /* inventory เป็นเจ้าของ · ใช้ได้จนกว่าจะ inv_add ครั้งถัดไป */
size_t inv_count(const Inventory *inv);
const Item *inv_at(const Inventory *inv, size_t i);
void inv_sort_by_sku(Inventory *inv);

#endif
'''
INV12_C = INV_C_SOL + r'''
static int cmpSku(const void *a, const void *b) {
    return strcmp(((const Item *)a)->sku, ((const Item *)b)->sku);
}

void inv_sort_by_sku(Inventory *inv) {
    qsort(inv->items, inv->count, sizeof *inv->items, cmpSku);
}
'''
MAIN12 = r'''// === main.c ===
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include "item.h"
#include "inventory.h"

#define DB_PATH "/data/stock.db"

''' + TOK + r'''
static int parseAmount(const char *s, int *out) {
    char *end;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || v <= 0 || v > INT_MAX) {
        return 0;
    }
    *out = (int)v;
    return 1;
}

/* คืน 1 โหลดสำเร็จ · 0 ไม่มีไฟล์ · -1 ไฟล์เสีย (inv ถูกล้างเป็นว่าง) */
static int load(Inventory **inv, int *badLine, const char **why) {
    FILE *f = fopen(DB_PATH, "r");
    if (f == NULL) {
        return 0;
    }
    int result = -1, lineNo = 0;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        lineNo++;
        line[strcspn(line, "\n")] = '\0';
        if (line[0] == '\0') {
            continue;
        }
        Item it;
        const char *err = item_parse(line, &it);
        if (err == NULL && !inv_add(*inv, &it)) {
            err = "รหัสซ้ำ";
        }
        if (err != NULL) {
            *badLine = lineNo;
            *why = err;
            goto cleanup;
        }
    }
    result = 1;
cleanup:
    fclose(f);
    if (result < 0) {
        Inventory *fresh = inv_create();
        inv_destroy(*inv);
        *inv = fresh;
    }
    return result;
}

static int save(const Inventory *inv) {
    FILE *f = fopen(DB_PATH, "w");
    if (f == NULL) {
        return 0;
    }
    char buf[128];
    for (size_t i = 0; i < inv_count(inv); i++) {
        item_format(inv_at(inv, i), buf, sizeof buf);
        fprintf(f, "%s\n", buf);
    }
    return fclose(f) == 0;
}

int main(void) {
    Inventory *inv = inv_create();
    if (inv == NULL) {
        return 1;
    }
    int badLine = 0;
    const char *why = NULL;
    int r = load(&inv, &badLine, &why);
    if (inv == NULL) {
        return 1;
    }
    if (r == 0) {
        puts("ยังไม่มีไฟล์ข้อมูล");
    } else if (r < 0) {
        printf("ไฟล์เสียที่บรรทัด %d: %s\n", badLine, why);
    } else {
        printf("โหลดแล้ว %zu รายการ\n", inv_count(inv));
    }
    char line[256];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        char *argv[8];
        const char *err = NULL;
        int argc = tokenize(line, argv, 8, &err);
        if (argc < 0) {
            puts("คำสั่งไม่ถูกต้อง");
            continue;
        }
        if (argc == 0) {
            continue;
        }
        const char *cmd = argv[0];
        if (strcmp(cmd, "add") == 0 && argc == 5) {
            Item it;
            const char *e = item_make(argv[1], argv[2], argv[3], argv[4], &it);
            if (e != NULL) {
                puts(e);
            } else if (!inv_add(inv, &it)) {
                printf("%s ซ้ำ\n", it.sku);
            } else {
                printf("เพิ่ม %s\n", it.sku);
            }
        } else if ((strcmp(cmd, "sell") == 0 || strcmp(cmd, "restock") == 0) && argc == 3) {
            Item *it = inv_find(inv, argv[1]);
            int n = 0;
            if (it == NULL) {
                printf("ไม่พบ %s\n", argv[1]);
            } else if (!parseAmount(argv[2], &n)) {
                puts("จำนวนไม่ถูกต้อง");
            } else if (cmd[0] == 's') {
                if (n > it->qty) {
                    printf("สินค้าไม่พอ (มี %d)\n", it->qty);
                } else {
                    it->qty -= n;
                    printf("ขาย %s %d เหลือ %d\n", it->sku, n, it->qty);
                }
            } else if (it->qty > INT_MAX - n) {
                puts("เกินขีดจำกัด");
            } else {
                it->qty += n;
                printf("เติม %s %d รวม %d\n", it->sku, n, it->qty);
            }
        } else if (strcmp(cmd, "list") == 0 && argc == 1) {
            inv_sort_by_sku(inv);
            if (inv_count(inv) == 0) {
                puts("(ว่าง)");
            }
            for (size_t i = 0; i < inv_count(inv); i++) {
                const Item *it = inv_at(inv, i);
                printf("%s %s %d %ld.%02ld\n", it->sku, it->name, it->qty, it->price / 100, it->price % 100);
            }
        } else if (strcmp(cmd, "value") == 0 && argc == 1) {
            long long total = 0;
            for (size_t i = 0; i < inv_count(inv); i++) {
                const Item *it = inv_at(inv, i);
                total += (long long)it->qty * it->price;
            }
            printf("มูลค่ารวม: %lld.%02lld บาท\n", total / 100, total % 100);
        } else if (strcmp(cmd, "save") == 0 && argc == 1) {
            if (save(inv)) {
                printf("บันทึก %zu รายการ\n", inv_count(inv));
            } else {
                puts("บันทึกไม่สำเร็จ");
            }
        } else {
            puts("คำสั่งไม่ถูกต้อง");
        }
    }
    inv_destroy(inv);
    return 0;
}
'''
M12_SOL = ITEM_H + "\n" + ITEM_C + "\n" + INV12_H + "\n" + INV12_C + "\n" + MAIN12
M12_WRONG = M12_SOL.replace('''    if (result < 0) {
        Inventory *fresh = inv_create();
        inv_destroy(*inv);
        *inv = fresh;
    }''', '''    if (result < 0) {
        *inv = inv_create();
    }''')
M12_STARTER = ITEM_H + "\n// === item.c ===\n#include \"item.h\"\n\n/* นำตัวตรวจและตัวแปลงจาก Milestone 4 มาไว้ที่นี่ (validSku · parseQty · parsePrice เป็น static)\n   item_make ตรวจทีละช่องจากสตริงที่แยกแล้ว · item_parse แยก | แล้วเรียก item_make */\n\n" + INV12_H + "\n// === inventory.c ===\n#include \"inventory.h\"\n\n/* นำ inventory จาก Milestone 3 มาไว้ที่นี่ และเพิ่ม inv_sort_by_sku */\n\n// === main.c ===\n#include <stdio.h>\n#include \"item.h\"\n#include \"inventory.h\"\n\n#define DB_PATH \"/data/stock.db\"\n\n/* tokenize จาก Milestone 5 · โหลดแบบทั้งหมดหรือไม่เลยจาก Milestone 8 · บันทึก · วนรับคำสั่ง */\n\nint main(void) {\n    return 0;\n}\n"
add({"title": "Milestone 12: StockKeeper ฉบับสมบูรณ์", "kind": "M12 · Final Review", "memcheck": True,
     "desc": "รวมทุก milestone เป็นโปรแกรมหลายไฟล์: <code>item</code> (ตรวจและแปลงข้อมูล) · <code>inventory</code> (opaque · เรียงตามรหัส) · <code>main.c</code> (โหลดไฟล์แบบทั้งหมดหรือไม่เลย · ตัวแยกคำสั่งที่รองรับ \"…\" · บันทึกไฟล์) — header ให้มาแล้ว · ผลงานนี้คือหลักฐานว่าคุณเขียน C ระดับวิศวกรได้: แยกโมดูล จัดการหน่วยความจำ จัดการข้อผิดพลาด และทำตามข้อกำหนดทุกข้อ",
     "goal": "เริ่มต้น: <b>โหลดแล้ว k รายการ</b> / <b>ยังไม่มีไฟล์ข้อมูล</b> / <b>ไฟล์เสียที่บรรทัด N: เหตุผล</b> (แล้วเริ่มคลังว่าง)<br>คำสั่ง: <code>add SKU \"ชื่อ\" จำนวน ราคา</code> → <b>เพิ่ม SKU</b> / <b>SKU ซ้ำ</b> / เหตุผลจาก Milestone 4 · <code>sell SKU n</code> → <b>ขาย SKU n เหลือ q</b> / <b>สินค้าไม่พอ (มี q)</b> · <code>restock SKU n</code> → <b>เติม SKU n รวม q</b> / <b>เกินขีดจำกัด</b> · (ไม่พบ → <b>ไม่พบ SKU</b> · n ≤ 0 → <b>จำนวนไม่ถูกต้อง</b>) · <code>list</code> → <b>SKU ชื่อ จำนวน ราคา</b> เรียงตามรหัส หรือ <b>(ว่าง)</b> · <code>value</code> → <b>มูลค่ารวม: B.SS บาท</b> · <code>save</code> → <b>บันทึก k รายการ</b> · อื่นๆ → <b>คำสั่งไม่ถูกต้อง</b>",
     "starter": M12_STARTER, "xp": 150,
     "hints": ["เริ่มจาก item.c และ inventory.c ที่ทำไว้แล้วใน Milestone 3–4 — สร้างทีละโมดูลแล้วรันทดสอบก่อนไปต่อ", "load: ใช้ goto cleanup (Milestone 8) · ไฟล์เสีย → สร้าง inventory ใหม่ที่ว่างก่อน แล้วจึง destroy ตัวเดิม (ตัวเดิมมีข้อมูลบางส่วนที่ต้องคืน)",
               "คำสั่ง: tokenize (Milestone 5) แล้วตรวจจำนวนอาร์กิวเมนต์ให้ตรงกับคำสั่ง · sell/restock หาสินค้าก่อน แล้วจึงตรวจจำนวน · value คูณด้วย long long (Milestone 6)"],
     "require": [{"re": "^(?![\\s\\S]*//\\s*=+\\s*inventory\\.h\\s*=+(?:(?!//\\s*=+)[\\s\\S])*struct\\s+Inventory\\s*\\{)", "msg": "inventory ต้องเป็น opaque (ห้ามเปิดเผยสมาชิกใน header)"},
                 {"re": "//\\s*=+\\s*item\\.c\\s*=+", "msg": "ต้องมีไฟล์ item.c"}, {"re": "//\\s*=+\\s*inventory\\.c\\s*=+", "msg": "ต้องมีไฟล์ inventory.c"},
                 {"re": "//\\s*=+\\s*main\\.c\\s*=+(?![\\s\\S]*->(?:items|cap)\\b)", "msg": "main.c ต้องใช้ inventory ผ่าน API"}],
     "tests": [{"in": "list\nsell TEA-01 3\nsell COF-02 9\nadd MLK-03 \"นมสด แท้\" 4 20\nadd TEA-01 x 1 1\nrestock COF-02 5\nvalue\nsave\nlist", "out": "โหลดแล้ว 2 รายการ\nCOF-02 กาแฟ 5 45.00\nTEA-01 ชาเขียว 10 12.50\nขาย TEA-01 3 เหลือ 7\nสินค้าไม่พอ (มี 5)\nเพิ่ม MLK-03\nTEA-01 ซ้ำ\nเติม COF-02 5 รวม 10\nมูลค่ารวม: 617.50 บาท\nบันทึก 3 รายการ\nCOF-02 กาแฟ 10 45.00\nMLK-03 นมสด แท้ 4 20.00\nTEA-01 ชาเขียว 7 12.50",
                "files": {"stock.db": "TEA-01|ชาเขียว|10|12.50\nCOF-02|กาแฟ|5|45.00\n"}},
               ["H", "add A-1 \"x\" 1 0.5\nsave\nlist", "ยังไม่มีไฟล์ข้อมูล\nเพิ่ม A-1\nบันทึก 1 รายการ\nA-1 x 1 0.50", "เริ่มจากไม่มีไฟล์"],
               {"in": "list\nvalue", "out": "ไฟล์เสียที่บรรทัด 2: จำนวนช่องไม่ครบ\n(ว่าง)\nมูลค่ารวม: 0.00 บาท", "hidden": True, "label": "ไฟล์เสีย (ต้องคืนข้อมูลที่โหลดไปแล้ว)", "files": {"stock.db": "A|x|1|1\nbad line\n"}},
               {"in": "list", "out": "ไฟล์เสียที่บรรทัด 2: รหัสซ้ำ\n(ว่าง)", "hidden": True, "label": "รหัสซ้ำในไฟล์", "files": {"stock.db": "A|x|1|1\nA|y|2|2\n"}},
               ["H", "sell X 1\nadd lower \"n\" 1 1\nadd B \"\" 1 1\nadd B \"n\" -1 1\nadd B \"n\" 1 1.999\nadd B \"n\"\nfoo\nsell B 0\nadd B \"x", "ยังไม่มีไฟล์ข้อมูล\nไม่พบ X\nรหัสสินค้าไม่ถูกต้อง\nชื่อว่างหรือยาวเกิน\nจำนวนไม่ถูกต้อง\nราคาไม่ถูกต้อง\nคำสั่งไม่ถูกต้อง\nคำสั่งไม่ถูกต้อง\nไม่พบ B\nคำสั่งไม่ถูกต้อง", "ข้อผิดพลาดทุกแบบ"],
               ["H", "add A \"a\" 1 1\nadd B \"b\" 1 1\nadd C \"c\" 1 1\nadd D \"d\" 1 1\nadd E \"e\" 2147483647 1\nrestock E 1\nsell A 1\nsell A 1\nvalue", "ยังไม่มีไฟล์ข้อมูล\nเพิ่ม A\nเพิ่ม B\nเพิ่ม C\nเพิ่ม D\nเพิ่ม E\nเกินขีดจำกัด\nขาย A 1 เหลือ 0\nสินค้าไม่พอ (มี 0)\nมูลค่ารวม: 2147483650.00 บาท", "ขยายคลังและค่าขอบ"]]},
    M12_SOL, M12_WRONG)

# ─────────────── emit JS ───────────────
def test_js(t):
    if isinstance(t, dict):
        return json.dumps(t, ensure_ascii=False)
    if t[0] == "V":
        return "V(%s, %s)" % (J(t[1]), J(t[2]))
    return "H(%s, %s, %s)" % (J(t[1]), J(t[2]), J(t[3]))

def stage_js(st):
    parts = []
    for k in ["title", "kind", "memcheck", "desc", "goal", "starter", "xp", "hints", "require", "quiz"]:
        if k in st:
            parts.append("%s: %s" % (k, json.dumps(st[k], ensure_ascii=False)))
    if "tests" in st:
        parts.append("tests: [" + ", ".join(test_js(t) for t in st["tests"]) + "], check")
    return "{ " + ",\n            ".join(parts) + " }"

lesson = [
    {"h": "Capstone: StockKeeper", "p": "โปรเจกต์ปิดหลักสูตรคือ<b>ระบบคลังสินค้าแบบบรรทัดคำสั่ง</b> สร้างตามขั้นตอนของวิศวกรจริง 12 milestone: ความต้องการ → โครงสร้าง → โครงสร้างข้อมูล → รูปแบบไฟล์ → ตัวแยกคำสั่ง → กฎทางธุรกิจ → หน่วยความจำ → การจัดการข้อผิดพลาด → การทดสอบ → ประสิทธิภาพ → เอกสาร → รวมระบบ<br>ทุก milestone ใช้ข้อกำหนดชุดเดียวกัน — โค้ดที่ผ่าน milestone ก่อนหน้าคือชิ้นส่วนของ milestone สุดท้าย"},
    {"h": "ข้อกำหนดของระบบ", "p": "<b>สินค้า:</b> รหัส (A–Z 0–9 - ยาว 1–15) · ชื่อ (1–47 ไบต์) · จำนวน (จำนวนเต็ม ≥ 0) · ราคา (เก็บเป็น<b>สตางค์</b>ในจำนวนเต็ม ไม่เกิน 10,000,000.00 บาท)<br><b>ไฟล์:</b> บรรทัดละ <code>SKU|ชื่อ|จำนวน|ราคา</code> (ราคาทศนิยม 2 ตำแหน่ง) · ไฟล์เสียแม้บรรทัดเดียว = ไม่ใช้ข้อมูลจากไฟล์เลยและบอกบรรทัดที่เสีย<br><b>คำสั่ง:</b> add · sell · restock · list · value · save · ชื่อที่มีช่องว่างใช้ \"…\"<br><b>ความเร็ว:</b> ค้นหาในคลัง 100,000 รายการ 100,000 ครั้งได้ทันเวลา"},
    {"h": "โครงสร้างโมดูล", "p": "<pre>item.h / item.c          ตรวจและแปลงข้อมูลสินค้า (ไม่พิมพ์ ไม่จองหน่วยความจำ)\ninventory.h / inventory.c เก็บสินค้า (opaque · อาร์เรย์ที่ขยายได้ · เป็นเจ้าของข้อมูล)\nmain.c                   ตัวแยกคำสั่ง · โหลด/บันทึกไฟล์ · แสดงผล</pre>ทิศทางการพึ่งพา: main → inventory → item · ไม่มีวงกลม · เฉพาะ main พิมพ์ข้อความถึงผู้ใช้"},
    {"h": "เกณฑ์ของงานระดับวิศวกร", "p": "คอมไพล์ด้วย <code>-std=c17 -Wall -Wextra -Wpedantic</code> โดยไม่มีคำเตือน · ไม่มี memory leak, double free, use-after-free (Memory Checker ตรวจทุก milestone ที่ใช้ heap) · ทุกข้อผิดพลาดมีเส้นทางจัดการที่ชัดเจน · ชุดทดสอบจับบั๊กได้จริง · เอกสารบอกสัญญาของ API และรูปแบบไฟล์ — Capstone นี้คือผลงานที่นำไปแสดงได้"},
]
out = "      /* ═══════════════ STAGE 31 — Capstone: StockKeeper ═══════════════ */\n      {\n        id: \"c2-capstone\", icon: \"c\", title: \"บทที่ 31: Capstone — StockKeeper\",\n        blurb: \"โปรเจกต์ปิดหลักสูตร 12 milestone: ระบบคลังสินค้าหลายไฟล์ ตั้งแต่ความต้องการจนถึงโปรแกรมที่โหลด แก้ไข และบันทึกไฟล์จริง\",\n        lesson: " + json.dumps(lesson, ensure_ascii=False) + ",\n        stages: [\n          " + ",\n          ".join(stage_js(st) for st in stages) + ",\n        ],\n      },\n"
open("/tmp/c2_stage31.js", "w", encoding="utf-8").write(out)
json.dump(sols, open("/tmp/c2_stage31_sols.json", "w", encoding="utf-8"), ensure_ascii=False)
print("stages:", len(stages), "| coding sols:", len(sols))
