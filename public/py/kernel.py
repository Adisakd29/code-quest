"""
kernel.py — เคอร์เนลแบบ Jupyter สำหรับห้องเขียนโค้ด (/code)

- ตัวแปรอยู่ต่อข้ามเซลล์ (namespace เดียวจนกว่าจะรีสตาร์ตเคอร์เนล)
- เซลล์ที่จบด้วยนิพจน์ แสดงค่าของนิพจน์นั้นเป็น Out[n] (เหมือน Jupyter) และเก็บไว้ใน _
- print() ส่งผลลัพธ์ออกทีละช่วงระหว่างรัน (เห็นผลก่อนเซลล์จบ)
- input(): โหมดปกติอ่านแบบรอคำตอบจริง (SharedArrayBuffer) · โหมดสำรองใช้คำตอบที่สะสมแล้วรันเซลล์ใหม่
- traceback แสดงชื่อเซลล์แบบ Jupyter: File "Cell In[3]", line 2
"""
import ast
import builtins
import io
import linecache
import sys
import traceback

_KERNEL_FILE = "<exec>"
_OUT_LIMIT = 200_000
_ns = {}


def reset():
    """รีสตาร์ตเคอร์เนล: ล้างตัวแปรทั้งหมด"""
    _ns.clear()
    _ns.update({"__name__": "__main__", "__builtins__": builtins})


reset()


class _NeedInput(BaseException):
    pass


class _TooMuchOutput(BaseException):
    pass


class _Stream(io.TextIOBase):
    """ส่งข้อความออกเป็นช่วง (ขึ้นบรรทัดใหม่ หรือสะสมเกิน 2KB) — ลดจำนวนข้อความข้าม worker"""

    def __init__(self, name, emit, counter):
        self.name, self.emit, self.counter, self.buf = name, emit, counter, []

    def writable(self):
        return True

    def write(self, s):
        if not isinstance(s, str):
            raise TypeError("write() argument must be str, not " + type(s).__name__)
        self.counter[0] += len(s)
        if self.counter[0] > _OUT_LIMIT:
            self.flush()
            raise _TooMuchOutput()
        self.buf.append(s)
        if "\n" in s or sum(len(x) for x in self.buf) > 2048:
            self.flush()
        return len(s)

    def flush(self):
        if self.buf:
            text = "".join(self.buf)
            self.buf = []
            self.emit(self.name, text)


def _format_exc(exc):
    tb = traceback.TracebackException.from_exception(exc)
    tb.stack = traceback.StackSummary.from_list([fr for fr in tb.stack if fr.filename != _KERNEL_FILE])
    return "".join(tb.format())


def run_cell(code, count, emit, read_input=None, replay=None):
    """
    รันโค้ดหนึ่งเซลล์ใน namespace ร่วม
      emit(name, text)     ส่งผลลัพธ์ stdout/stderr ออกไปแสดง
      read_input(prompt)   (โหมดปกติ) รอคำตอบจากผู้ใช้ · คืน None เมื่อถูกขัดจังหวะ
      replay               (โหมดสำรอง) รายการคำตอบที่ผู้ใช้ป้อนแล้ว
    คืน dict: status = ok | error | need_input, value (repr ของนิพจน์สุดท้าย), error, error_type, prompt
    """
    filename = f"Cell In[{count}]"
    counter = [0]
    out, err = _Stream("stdout", emit, counter), _Stream("stderr", emit, counter)
    answers = list(replay or [])

    def _input(prompt=""):
        prompt = str(prompt)
        out.flush()
        if read_input is not None:
            value = read_input(prompt)
            if value is None:
                raise KeyboardInterrupt
            return str(value)
        # โหมดสำรอง: แสดง prompt + คำตอบเดิมเหมือนหน้าจอเทอร์มินัล · หมดคำตอบแล้วหยุดเพื่อถามผู้ใช้
        out.write(prompt)
        if not answers:
            out.flush()
            raise _NeedInput(prompt)
        value = answers.pop(0)
        out.write(value + "\n")
        return value

    result = {"status": "ok", "value": None, "error": None, "error_type": None, "prompt": None}
    saved = (sys.stdout, sys.stderr, builtins.input)
    sys.stdout, sys.stderr, builtins.input = out, err, _input
    # ให้ traceback แสดงบรรทัดโค้ดที่ผิดได้ (เหมือนรันไฟล์ .py จริง) — linecache หาแหล่งของ "Cell In[n]" ไม่เจอเอง
    linecache.cache[filename] = (len(code), None, code.splitlines(True), filename)
    try:
        try:
            tree = ast.parse(code, filename=filename)
        except SyntaxError as e:
            result.update(status="error", error_type=type(e).__name__,
                          error="".join(traceback.format_exception_only(type(e), e)))
            return result
        last = None
        if tree.body and isinstance(tree.body[-1], ast.Expr):
            last = ast.Expression(tree.body.pop().value)
        exec(compile(tree, filename, "exec"), _ns)
        if last is not None:
            value = eval(compile(last, filename, "eval"), _ns)
            if value is not None:
                _ns["_"] = value
                result["value"] = repr(value)
    except _NeedInput as e:
        result.update(status="need_input", prompt=e.args[0] if e.args else "")
    except _TooMuchOutput:
        result.update(status="error", error_type="OutputLimit",
                      error=f"ผลลัพธ์ยาวเกิน {_OUT_LIMIT:,} ตัวอักษร — หยุดเซลล์นี้แล้ว\n")
    except BaseException as e:  # noqa: BLE001 — รายงานทุกอย่างที่โค้ดของผู้เรียนโยนออกมา (รวม KeyboardInterrupt / SystemExit)
        result.update(status="error", error_type=type(e).__name__, error=_format_exc(e))
    finally:
        try:
            out.flush()
            err.flush()
        except BaseException:  # noqa: BLE001
            pass
        sys.stdout, sys.stderr, builtins.input = saved
    return result
