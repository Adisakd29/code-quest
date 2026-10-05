/**
 * VM — "เครื่องเสมือน" สำหรับหัวข้อภาคปฏิบัติที่ซับซ้อน
 *
 * 1) Tkinter จำลอง: โมดูล tkinter ที่เขียนด้วย Python ล้วน ถูกติดตั้งเข้าไปใน Pyodide
 *    ทุก widget ที่ผู้เรียนสร้างจะถูกบันทึกเป็นโครงสร้างข้อมูล แล้ววาดออกมาเป็น
 *    "หน้าต่างโปรแกรม" ในเบราว์เซอร์ กดปุ่มได้จริง (เรียก command กลับเข้า Python)
 *    และตัวตรวจคำตอบอ่านโครงสร้าง widget ได้โดยตรง
 * 2) ระบบไฟล์เสมือน: สร้างไฟล์ตั้งต้นให้โจทย์ (Pyodide มี MEMFS ในตัว open() ใช้ได้เลย)
 * 3) ฐานข้อมูลเสมือน: sqlite3 ของ Pyodide (โหลดอัตโนมัติเมื่อโค้ด import sqlite3)
 *
 * TK_MOCK เป็นโค้ด Python ธรรมดา จึงรันได้ทั้งใน Pyodide และ CPython (ใช้ในชุดทดสอบ)
 */
const VM = (() => {

  const TK_MOCK = String.raw`
import sys, json, types

_cq_widgets = []
_cq_windows = []
_cq_msgs = []
_cq_id = [0]

class _Var:
    def __init__(self, master=None, value=None):
        self._v = self._default() if value is None else value
    def _default(self): return ""
    def get(self): return self._v
    def set(self, v): self._v = v

class StringVar(_Var): pass
class IntVar(_Var):
    def _default(self): return 0
class DoubleVar(_Var):
    def _default(self): return 0.0
class BooleanVar(_Var):
    def _default(self): return False

class Misc:
    _kind = "Widget"
    def __init__(self, master=None, **kw):
        _cq_id[0] += 1
        self._id = _cq_id[0]
        self.master = master
        self.opts = dict(kw)
        self.layout = None
        self.children = []
        self._value = ""
        self._binds = {}
        if isinstance(master, Misc):
            master.children.append(self)
        _cq_widgets.append(self)
    # ---- ตั้งค่า / อ่านค่า option ----
    def config(self, **kw): self.opts.update(kw)
    configure = config
    def __setitem__(self, k, v): self.opts[k] = v
    def __getitem__(self, k): return self.opts.get(k)
    def cget(self, k): return self.opts.get(k)
    def text(self):
        tv = self.opts.get("textvariable")
        if tv is not None: return str(tv.get())
        return str(self.opts.get("text", ""))
    # ---- การจัดวาง 3 แบบ ----
    def pack(self, **kw): self.layout = {"manager": "pack", **{k: str(v) for k, v in kw.items()}}; return self
    def grid(self, **kw): self.layout = {"manager": "grid", **{k: str(v) for k, v in kw.items()}}; return self
    def place(self, **kw): self.layout = {"manager": "place", **{k: str(v) for k, v in kw.items()}}; return self
    def pack_forget(self): self.layout = None
    def grid_forget(self): self.layout = None
    def destroy(self):
        self.layout = None
        if self in _cq_widgets: _cq_widgets.remove(self)
    def bind(self, event, fn): self._binds[event] = fn
    def after(self, ms, fn=None, *args):
        if fn: fn(*args)
    def focus(self): pass
    def focus_set(self): pass
    def update(self): pass
    def winfo_children(self): return list(self.children)

class Tk(Misc):
    _kind = "Tk"
    def __init__(self, *a, **kw):
        super().__init__(None, **kw)
        self._title = "tk"
        self._geometry = ""
        self._bg = ""
        _cq_windows.append(self)
    def title(self, t=None):
        if t is not None: self._title = str(t)
        return self._title
    def geometry(self, g=None):
        if g is not None: self._geometry = str(g)
        return self._geometry
    def resizable(self, *a, **kw): pass
    def minsize(self, *a, **kw): pass
    def mainloop(self, *a, **kw): pass
    def quit(self): pass

class Toplevel(Tk):
    _kind = "Toplevel"

class Frame(Misc): _kind = "Frame"
class LabelFrame(Misc): _kind = "LabelFrame"
class Label(Misc): _kind = "Label"
class Message(Misc): _kind = "Message"

class Button(Misc):
    _kind = "Button"
    def invoke(self):
        cmd = self.opts.get("command")
        if callable(cmd): return cmd()

class Entry(Misc):
    _kind = "Entry"
    def get(self):
        tv = self.opts.get("textvariable")
        return str(tv.get()) if tv is not None else self._value
    def insert(self, index, s):
        tv = self.opts.get("textvariable")
        if tv is not None: tv.set(str(tv.get()) + str(s))
        else: self._value = self._value + str(s)
    def delete(self, a, b=None):
        tv = self.opts.get("textvariable")
        if tv is not None: tv.set("")
        else: self._value = ""

class Text(Misc):
    _kind = "Text"
    def get(self, a="1.0", b="end"): return self._value
    def insert(self, index, s): self._value = self._value + str(s)
    def delete(self, a, b=None): self._value = ""

class Checkbutton(Misc):
    _kind = "Checkbutton"
    def select(self):
        v = self.opts.get("variable")
        if v is not None: v.set(self.opts.get("onvalue", True))
    def deselect(self):
        v = self.opts.get("variable")
        if v is not None: v.set(self.opts.get("offvalue", False))

class Radiobutton(Misc): _kind = "Radiobutton"

class Listbox(Misc):
    _kind = "Listbox"
    def __init__(self, master=None, **kw):
        super().__init__(master, **kw)
        self.items = []
    def insert(self, index, *items):
        for it in items:
            if index == "end" or index == END: self.items.append(str(it))
            else: self.items.insert(int(index), str(it))
    def delete(self, a, b=None):
        if b is None and a != 0 and a != "0": 
            try: self.items.pop(int(a))
            except Exception: pass
        else: self.items = []
    def get(self, a, b=None):
        if b is None: return self.items[int(a)]
        return tuple(self.items)
    def size(self): return len(self.items)
    def curselection(self): return ()

class Scale(Misc):
    _kind = "Scale"
    def get(self):
        v = self.opts.get("variable")
        return v.get() if v is not None else self.opts.get("from_", 0)
    def set(self, x):
        v = self.opts.get("variable")
        if v is not None: v.set(x)

class Spinbox(Entry): _kind = "Spinbox"
class Canvas(Misc):
    _kind = "Canvas"
    def __init__(self, master=None, **kw):
        super().__init__(master, **kw)
        self.shapes = []
    def create_rectangle(self, *c, **kw): self.shapes.append({"shape": "rect", "coords": list(c), **{k: str(v) for k, v in kw.items()}}); return len(self.shapes)
    def create_oval(self, *c, **kw): self.shapes.append({"shape": "oval", "coords": list(c), **{k: str(v) for k, v in kw.items()}}); return len(self.shapes)
    def create_line(self, *c, **kw): self.shapes.append({"shape": "line", "coords": list(c), **{k: str(v) for k, v in kw.items()}}); return len(self.shapes)
    def create_text(self, *c, **kw): self.shapes.append({"shape": "text", "coords": list(c), **{k: str(v) for k, v in kw.items()}}); return len(self.shapes)
    def delete(self, *a): self.shapes = []

class Scrollbar(Misc): _kind = "Scrollbar"
class Menu(Misc):
    _kind = "Menu"
    def add_command(self, **kw): self.children.append(("command", kw.get("label", "")))
    def add_cascade(self, **kw): self.children.append(("cascade", kw.get("label", "")))
    def add_separator(self): pass

END = "end"; LEFT = "left"; RIGHT = "right"; TOP = "top"; BOTTOM = "bottom"
BOTH = "both"; X = "x"; Y = "y"; N = "n"; S = "s"; E = "e"; W = "w"; CENTER = "center"
NW = "nw"; NE = "ne"; SW = "sw"; SE = "se"; NSEW = "nsew"; HORIZONTAL = "horizontal"; VERTICAL = "vertical"
NORMAL = "normal"; DISABLED = "disabled"; YES = True; NO = False; INSERT = "insert"

# ---- messagebox จำลอง: บันทึกข้อความไว้แสดงเป็นป๊อปอัป ----
def _mb(kind):
    def f(title="", message="", **kw):
        _cq_msgs.append({"kind": kind, "title": str(title), "message": str(message)})
        return True if kind.startswith("ask") else "ok"
    return f
messagebox = types.ModuleType("tkinter.messagebox")
for _k in ["showinfo", "showwarning", "showerror", "askyesno", "askokcancel", "askquestion"]:
    setattr(messagebox, _k, _mb(_k))

# ---- ttk ใช้ widget ชุดเดียวกัน ----
ttk = types.ModuleType("tkinter.ttk")
class Combobox(Entry):
    _kind = "Combobox"
    def current(self, i=None):
        vals = list(self.opts.get("values", []))
        if i is not None and vals:
            self._value = str(vals[int(i)])
        return 0
for _n in ["Frame", "Label", "Button", "Entry", "Checkbutton", "Radiobutton", "Scale", "Spinbox", "Scrollbar", "LabelFrame"]:
    setattr(ttk, _n, globals()[_n])
ttk.Combobox = Combobox
class Progressbar(Misc): _kind = "Progressbar"
ttk.Progressbar = Progressbar

def _ser(w):
    d = {"id": w._id, "type": w._kind, "text": w.text(), "layout": w.layout, "hasCommand": callable(w.opts.get("command"))}
    for k in ["bg", "background", "fg", "foreground", "font", "width", "height", "state", "relief", "padx", "pady", "values"]:
        if k in w.opts:
            v = w.opts[k]
            d[k] = list(v) if isinstance(v, (list, tuple)) and k == "values" else str(v)
    if isinstance(w, (Entry, Text)): d["value"] = w.get() if not isinstance(w, Text) else w._value
    if isinstance(w, Listbox): d["items"] = list(w.items)
    if isinstance(w, Canvas): d["shapes"] = w.shapes
    if isinstance(w, (Checkbutton, Radiobutton)):
        v = w.opts.get("variable")
        d["checked"] = (v is not None and v.get() == w.opts.get("value", w.opts.get("onvalue", True)))
    if isinstance(w, Scale):
        d["from"] = str(w.opts.get("from_", 0)); d["to"] = str(w.opts.get("to", 100)); d["value"] = str(w.get())
    if isinstance(w, Progressbar): d["value"] = str(w.opts.get("value", 0)); d["maximum"] = str(w.opts.get("maximum", 100))
    d["children"] = [_ser(c) for c in w.children if isinstance(c, Misc) and c in _cq_widgets]
    return d

def _cq_dump():
    wins = [{"title": t._title, "geometry": t._geometry, "bg": str(t.opts.get("bg", t.opts.get("background", ""))),
             "children": [_ser(c) for c in t.children if isinstance(c, Misc) and c in _cq_widgets]} for t in _cq_windows]
    return json.dumps({"windows": wins, "messages": list(_cq_msgs)}, ensure_ascii=False)

def _cq_find(i):
    for w in _cq_widgets:
        if w._id == i: return w
    return None

def _cq_click(i):
    w = _cq_find(int(i))
    if w is not None and callable(w.opts.get("command")):
        w.opts["command"]()

def _cq_click_text(t):
    """กดปุ่มที่มีข้อความตรงกับ t (ใช้ตอนตรวจคำตอบอัตโนมัติ)"""
    for w in list(_cq_widgets):
        if isinstance(w, Button) and w.text() == t:
            cmd = w.opts.get("command")
            if callable(cmd): cmd()
            return True
    return False

def _cq_fill_first_entry(value):
    """พิมพ์ค่าลงช่องกรอกช่องแรก (ใช้ตอนตรวจคำตอบอัตโนมัติ)"""
    for w in list(_cq_widgets):
        if isinstance(w, Entry):
            _cq_set_entry(w._id, value)
            return True
    return False

def _cq_set_entry(i, value):
    w = _cq_find(int(i))
    if w is None: return
    tv = w.opts.get("textvariable")
    if tv is not None: tv.set(value)
    else: w._value = value

def _cq_reset():
    _cq_widgets.clear(); _cq_windows.clear(); _cq_msgs.clear(); _cq_id[0] = 0

_this = sys.modules.get("tkinter") or types.ModuleType("tkinter")
for _k, _v in list(globals().items()):
    if not _k.startswith("__"):
        setattr(_this, _k, _v)
_this.messagebox = messagebox
_this.ttk = ttk
sys.modules["tkinter"] = _this
sys.modules["tkinter.messagebox"] = messagebox
sys.modules["tkinter.ttk"] = ttk
`;

  /** โค้ด Python สำหรับสร้างไฟล์ตั้งต้นในระบบไฟล์เสมือน (ใช้ได้ทั้ง Pyodide และ CPython) */
  function filesPrelude(files) {
    if (!files) return "";
    let s = "";
    for (const name of Object.keys(files)) {
      s += "open(" + JSON.stringify(name) + ", 'w', encoding='utf-8').write(" + JSON.stringify(files[name]) + ")\n";
    }
    return s;
  }

  /* ═══════════ วาดหน้าต่าง GUI จากโครงสร้าง widget ═══════════ */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const colorOf = w => w.bg || w.background || "";
  const fgOf = w => w.fg || w.foreground || "";

  function styleOf(w) {
    const st = [];
    if (colorOf(w)) st.push("background:" + colorOf(w));
    if (fgOf(w)) st.push("color:" + fgOf(w));
    if (w.font) {
      const m = String(w.font).match(/(\d+)/);
      if (m) st.push("font-size:" + Math.min(36, Math.max(10, parseInt(m[1]) + 3)) + "px");
      if (/bold/i.test(w.font)) st.push("font-weight:700");
    }
    return st.join(";");
  }

  /** จัดวางลูกตามตัวจัดวางจริง: grid → ตาราง CSS Grid ตาม row/column, pack/place → เรียงลงล่าง */
  function layoutChildren(children) {
    const kids = (children || []).filter(c => c.layout);
    if (kids.some(c => c.layout.manager === "grid")) {
      return '<div class="vm-grid">' + kids.map(c => {
        const r = (parseInt(c.layout.row) || 0) + 1, col = (parseInt(c.layout.column) || 0) + 1;
        const span = parseInt(c.layout.columnspan) || 1;
        return '<div style="grid-row:' + r + ";grid-column:" + col + " / span " + span + '">' + widgetHtml(c) + "</div>";
      }).join("") + "</div>";
    }
    return kids.map(widgetHtml).join("");
  }

  function widgetHtml(w) {
    const s = styleOf(w);
    const kids = layoutChildren(w.children);
    const lay = w.layout || {};
    const side = lay.manager === "pack" && /left|right/.test(lay.side || "") ? " vm-inline" : "";
    const wrap = inner => '<div class="vm-w' + side + '" data-type="' + w.type + '">' + inner + "</div>";
    switch (w.type) {
      case "Label": case "Message": return wrap('<div class="vm-label" style="' + s + '">' + esc(w.text) + "</div>");
      case "Button": return wrap('<button class="vm-btn" data-id="' + w.id + '" style="' + s + '"' + (w.state === "disabled" ? " disabled" : "") + ">" + esc(w.text || "Button") + "</button>");
      case "Entry": case "Spinbox": case "Combobox":
        return wrap('<input class="vm-entry" data-id="' + w.id + '" value="' + esc(w.value || "") + '" style="' + s + '">');
      case "Text": return wrap('<textarea class="vm-entry vm-text" data-id="' + w.id + '">' + esc(w.value || "") + "</textarea>");
      case "Checkbutton": return wrap('<label class="vm-check"><input type="checkbox"' + (w.checked ? " checked" : "") + " disabled> " + esc(w.text) + "</label>");
      case "Radiobutton": return wrap('<label class="vm-check"><input type="radio"' + (w.checked ? " checked" : "") + " disabled> " + esc(w.text) + "</label>");
      case "Listbox": return wrap('<div class="vm-list">' + (w.items || []).map(i => "<div>" + esc(i) + "</div>").join("") + "</div>");
      case "Scale": return wrap('<input type="range" min="' + esc(w.from) + '" max="' + esc(w.to) + '" value="' + esc(w.value) + '" disabled>');
      case "Progressbar": return wrap('<progress max="' + esc(w.maximum) + '" value="' + esc(w.value) + '"></progress>');
      case "Canvas": {
        const shapes = (w.shapes || []).map(sh => {
          const c = sh.coords || [], fill = sh.fill || "none", out = sh.outline || "#333";
          if (sh.shape === "rect") return '<rect x="' + c[0] + '" y="' + c[1] + '" width="' + (c[2] - c[0]) + '" height="' + (c[3] - c[1]) + '" fill="' + esc(fill) + '" stroke="' + esc(out) + '"/>';
          if (sh.shape === "oval") return '<ellipse cx="' + (c[0] + c[2]) / 2 + '" cy="' + (c[1] + c[3]) / 2 + '" rx="' + Math.abs(c[2] - c[0]) / 2 + '" ry="' + Math.abs(c[3] - c[1]) / 2 + '" fill="' + esc(fill) + '" stroke="' + esc(out) + '"/>';
          if (sh.shape === "line") return '<line x1="' + c[0] + '" y1="' + c[1] + '" x2="' + c[2] + '" y2="' + c[3] + '" stroke="' + esc(sh.fill || "#333") + '" stroke-width="2"/>';
          if (sh.shape === "text") return '<text x="' + c[0] + '" y="' + c[1] + '" text-anchor="middle" fill="' + esc(sh.fill || "#333") + '">' + esc(sh.text || "") + "</text>";
          return "";
        }).join("");
        return wrap('<svg class="vm-canvas" width="' + esc(w.width || 300) + '" height="' + esc(w.height || 150) + '" style="background:' + esc(colorOf(w) || "#fff") + '">' + shapes + "</svg>");
      }
      case "Frame": case "LabelFrame":
        return wrap('<div class="vm-frame' + (w.type === "LabelFrame" ? " vm-lframe" : "") + '" style="' + s + '">' + (w.type === "LabelFrame" && w.text ? '<div class="vm-legend">' + esc(w.text) + "</div>" : "") + kids + "</div>");
      default: return wrap('<div class="vm-label">' + esc(w.type) + "</div>");
    }
  }

  /**
   * วาดหน้าต่างทั้งหมดลงใน mount
   * onClick(id) ถูกเรียกเมื่อผู้ใช้กดปุ่ม · onEntry(id, value) เมื่อพิมพ์ในช่องกรอก
   */
  function renderGui(mount, tree, onClick, onEntry) {
    if (!tree || !tree.windows || !tree.windows.length) {
      mount.innerHTML = '<div class="vm-empty">🖥️ เครื่องเสมือนยังไม่พบหน้าต่าง — สร้างด้วย <code>root = tk.Tk()</code> แล้วใส่ widget ด้วย pack()/grid()/place()</div>';
      return;
    }
    mount.innerHTML = tree.windows.map(win =>
      '<div class="vm-window">' +
        '<div class="vm-titlebar"><span class="vm-dots"><i></i><i></i><i></i></span><span class="vm-title">' + esc(win.title || "tk") + '</span><span class="vm-geo">' + esc(win.geometry || "") + "</span></div>" +
        '<div class="vm-body" style="' + (win.bg ? "background:" + esc(win.bg) : "") + '">' +
          layoutChildren(win.children) +
        "</div>" +
      "</div>"
    ).join("") +
    (tree.messages || []).map(m =>
      '<div class="vm-msg vm-' + esc(m.kind) + '"><b>' + esc(m.title || "ข้อความ") + "</b><div>" + esc(m.message) + "</div></div>"
    ).join("");
    mount.querySelectorAll(".vm-btn").forEach(b => b.onclick = () => onClick && onClick(parseInt(b.dataset.id)));
    mount.querySelectorAll(".vm-entry").forEach(i => i.oninput = () => onEntry && onEntry(parseInt(i.dataset.id), i.value));
  }

  /* ---- ตัวช่วยสำหรับเขียน check() ของด่าน GUI ---- */
  function flat(tree) {
    const out = [];
    const walk = arr => (arr || []).forEach(w => { out.push(w); walk(w.children); });
    (tree && tree.windows || []).forEach(win => walk(win.children));
    return out;
  }
  const widgets = (tree, type) => flat(tree).filter(w => !type || w.type === type);
  const placed = (tree, type) => widgets(tree, type).filter(w => w.layout);
  const title = tree => (tree && tree.windows && tree.windows[0] && tree.windows[0].title) || "";
  const hasText = (tree, type, text) => widgets(tree, type).some(w => String(w.text).trim() === text);

  const api = { TK_MOCK, filesPrelude, renderGui, flat, widgets, placed, title, hasText };
  if (typeof module !== "undefined") module.exports = api;
  else window.VM = api;
  return api;
})();
