"""
harness.py — ตัวรันโค้ดของผู้เรียนสำหรับ Python v2 (ใช้ตัวเดียวกันทั้งเบราว์เซอร์และเซิร์ฟเวอร์)

ทุกการรันได้สภาพแวดล้อมใหม่: namespace ใหม่ · โฟลเดอร์ทำงานใหม่ · ล้างโมดูลของผู้เรียนรอบก่อน
- input() อ่านจากข้อมูลของกรณีทดสอบ (ไม่แสดงข้อความ prompt ในผลลัพธ์ · หมดข้อมูลแล้วเกิด EOFError แบบเครื่องจริง)
- จำกัดขนาด output · ปิดโมดูล js (ไม่ให้แตะหน้าเว็บหรือ network)
- หลายไฟล์: แบ่งด้วยบรรทัด "# === ชื่อไฟล์.py ===" · ไฟล์แรกที่ไม่มีบรรทัดแบ่งคือ main.py
- asyncio.run(...) ระดับบนสุด → await (Pyodide มี event loop ของเบราว์เซอร์อยู่แล้ว)
- timeout ทำโดยฝั่ง JavaScript (หยุด worker) เพราะโค้ดที่วนไม่รู้จบไม่คืนการควบคุมให้ Python
"""
import ast
import builtins
import io
import json
import math
import os
import re
import sys
import traceback

_RUN_ROOT = "/tmp/cqrun"
_MARKER = re.compile(r"^#\s*=+\s*([\w./-]+\.\w+)\s*=+\s*$")
_run_counter = [0]
_blocked = False


def _block_host_modules():
    """ปิดโมดูลที่เข้าถึงสภาพแวดล้อมภายนอก (หน้าเว็บ · fetch) — เรียกครั้งเดียวหลังโหลด harness"""
    global _blocked
    if _blocked:
        return
    for name in ("js", "pyodide_js", "pyodide.http"):
        sys.modules[name] = None
    _blocked = True


class _LimitedWriter(io.TextIOBase):
    def __init__(self, limit):
        self.parts = []
        self.size = 0
        self.limit = limit
        self.truncated = False

    def writable(self):
        return True

    def write(self, s):
        if not isinstance(s, str):
            raise TypeError("write() argument must be str, not " + type(s).__name__)
        if self.truncated:
            return len(s)
        room = self.limit - self.size
        if len(s) > room:
            self.parts.append(s[:max(room, 0)])
            self.size = self.limit
            self.truncated = True
            raise _OutputLimit()
        self.parts.append(s)
        self.size += len(s)
        return len(s)

    def getvalue(self):
        return "".join(self.parts)


class _OutputLimit(BaseException):
    """ไม่สืบจาก Exception — except Exception ของผู้เรียนจึงดักไม่ได้"""


def _split_files(code):
    files, name, buf = {}, "main.py", []
    for line in code.split("\n"):
        m = _MARKER.match(line.strip())
        if m:
            if buf and any(x.strip() for x in buf) or name != "main.py":
                files[name] = "\n".join(buf)
            name, buf = m.group(1), []
        else:
            buf.append(line)
    files[name] = "\n".join(buf)
    if "main.py" not in files:
        first = next(iter(files))
        files["main.py"] = files.pop(first)
    return files


class _RunToAwait(ast.NodeTransformer):
    """asyncio.run(X) ที่อยู่ระดับโมดูล (คำสั่งเดี่ยว · การกำหนดค่า · อาร์กิวเมนต์ เช่น print(asyncio.run(m())) · ใน if) → await X
    ไม่ลงไปในฟังก์ชัน คลาส หรือ lambda — ในนั้น await ใช้ไม่ได้ และ asyncio.run ที่นั่นต้องทำงานตามปกติ"""

    def visit_FunctionDef(self, node):
        return node

    visit_AsyncFunctionDef = visit_FunctionDef
    visit_ClassDef = visit_FunctionDef
    visit_Lambda = visit_FunctionDef

    def visit_Call(self, node):
        self.generic_visit(node)
        f = node.func
        if (isinstance(f, ast.Attribute) and f.attr == "run" and isinstance(f.value, ast.Name)
                and f.value.id == "asyncio" and len(node.args) == 1 and not node.keywords):
            return ast.copy_location(ast.Await(node.args[0]), node)
        return node

    def fix(self, body):
        return [self.visit(st) for st in body]


def _prepare_workdir(files, data_files):
    _run_counter[0] += 1
    wd = f"{_RUN_ROOT}/r{_run_counter[0]}"
    os.makedirs(wd, exist_ok=True)
    # ล้างโมดูลของผู้เรียนจากรอบก่อน (อยู่ใต้ /tmp/cqrun)
    for mod_name, mod in list(sys.modules.items()):
        f = getattr(mod, "__file__", None) if mod is not None else None
        if f and str(f).startswith(_RUN_ROOT):
            del sys.modules[mod_name]
    sys.path[:] = [p for p in sys.path if not str(p).startswith(_RUN_ROOT)]
    sys.path.insert(0, wd)
    for name, text in {**(data_files or {}), **files}.items():
        if name == "main.py":
            continue
        path = os.path.join(wd, name)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(text)
    os.chdir(wd)
    return wd


def _format_exc(exc, wd):
    """traceback แบบเครื่องจริง แต่ตัดเฟรมของ harness ออก และแสดงชื่อไฟล์แบบสั้น"""
    tb = traceback.TracebackException.from_exception(exc)
    frames = [fr for fr in tb.stack if fr.filename == "main.py" or str(fr.filename).startswith(wd)]
    tb.stack = traceback.StackSummary.from_list(frames)
    text = "".join(tb.format())
    return text.replace(wd + "/", "")


def _compile_main(src):
    tree = ast.parse(src, filename="main.py")
    tree.body = _RunToAwait().fix(tree.body)
    ast.fix_missing_locations(tree)
    return compile(tree, "main.py", "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)


async def _exec_user(code, data_files, stdin_text, out_limit):
    """รันโปรแกรมของผู้เรียน คืน (namespace, ผลลัพธ์, ข้อผิดพลาด)"""
    files = _split_files(code)
    wd = _prepare_workdir(files, data_files)
    out = _LimitedWriter(out_limit)
    err = _LimitedWriter(out_limit)
    lines = io.StringIO(stdin_text or "")

    def _input(prompt=""):
        line = lines.readline()
        if line == "":
            raise EOFError("EOF when reading a line")
        return line[:-1] if line.endswith("\n") else line

    ns = {"__name__": "__main__", "__file__": os.path.join(wd, "main.py"), "__builtins__": builtins}
    saved = (sys.stdout, sys.stderr, builtins.input)
    result = {"stdout": "", "stderr": "", "error": None, "errorType": None, "truncated": False, "exitCode": 0}
    sys.stdout, sys.stderr, builtins.input = out, err, _input
    try:
        try:
            code_obj = _compile_main(files["main.py"])
        except SyntaxError as e:
            result["errorType"] = type(e).__name__
            result["error"] = "".join(traceback.format_exception_only(type(e), e))
            return ns, result, wd
        r = eval(code_obj, ns)
        if hasattr(r, "__await__"):
            await r
    except _OutputLimit:
        result["truncated"] = True
    except SystemExit as e:
        code_ = e.code
        if code_ not in (None, 0):
            result["exitCode"] = code_ if isinstance(code_, int) else 1
            if not isinstance(code_, int):
                result["error"] = str(code_)
    except BaseException as e:   # noqa: BLE001 — ต้องรายงานทุกอย่างที่โปรแกรมของผู้เรียนโยนออกมา
        result["errorType"] = type(e).__name__
        result["error"] = _format_exc(e, wd)
    finally:
        sys.stdout, sys.stderr, builtins.input = saved
        result["stdout"] = out.getvalue()
        result["stderr"] = err.getvalue()
        result["truncated"] = result["truncated"] or out.truncated
    return ns, result, wd


def _literal(text):
    return ast.literal_eval(text) if isinstance(text, str) else text


def _same(got, want):
    if isinstance(want, float) and isinstance(got, (int, float)) and not isinstance(got, bool):
        return math.isclose(got, want, rel_tol=1e-9, abs_tol=1e-9)
    if type(want) is bool or type(got) is bool:
        return type(got) is type(want) and got == want
    if isinstance(want, (list, tuple)) and isinstance(got, (list, tuple)):
        return type(got) is type(want) and len(got) == len(want) and all(_same(a, b) for a, b in zip(got, want))
    return got == want


async def run_job(job_json):
    """
    job: { code, files?, out_limit?, test }
      test แบบ I/O:      { in, out }               → เทียบ stdout ฝั่ง JavaScript
      test แบบฟังก์ชัน:  { call, args?, kwargs?, expect? | raises? }  (args/kwargs/expect เป็น Python literal)
    """
    _block_host_modules()
    job = json.loads(job_json)
    test = job.get("test") or {}
    limit = int(job.get("out_limit") or 65536)
    ns, res, wd = await _exec_user(job["code"], job.get("files") or test.get("files"), test.get("in", ""), limit)
    if "call" in test and not res["error"] and not res["truncated"]:
        fn = ns.get(test["call"])
        args = _literal(test.get("args", "()"))
        if not isinstance(args, tuple):
            args = (args,)
        kwargs = _literal(test.get("kwargs", "{}"))
        res["callText"] = test["call"] + "(" + ", ".join([repr(a) for a in args] + [f"{k}={v!r}" for k, v in kwargs.items()]) + ")"
        if not callable(fn):
            res["callOk"] = False
            res["callMessage"] = f"ไม่พบฟังก์ชัน {test['call']}() — ตั้งชื่อให้ตรงตามโจทย์"
        else:
            out = _LimitedWriter(limit)
            saved = sys.stdout
            sys.stdout = out
            try:
                value = fn(*args, **kwargs)
                if hasattr(value, "__await__"):
                    value = await value
                if "raises" in test:
                    res["callOk"] = False
                    res["callMessage"] = f"ต้องเกิด {test['raises']} แต่ฟังก์ชันคืนค่า {value!r}"
                else:
                    want = _literal(test.get("expect", "None"))
                    res["callOk"] = _same(value, want)
                    res["got"] = repr(value)
                    res["want"] = repr(want)
            except _OutputLimit:
                res["truncated"] = True
                res["callOk"] = False
            except BaseException as e:   # noqa: BLE001
                if "raises" in test and type(e).__name__ == test["raises"]:
                    res["callOk"] = True
                elif "raises" in test:
                    res["callOk"] = False
                    res["callMessage"] = f"ต้องเกิด {test['raises']} แต่เกิด {type(e).__name__}"
                else:
                    res["callOk"] = False
                    res["errorType"] = type(e).__name__
                    res["error"] = _format_exc(e, wd)
            finally:
                sys.stdout = saved
                res["stdout"] += out.getvalue()
    return json.dumps(res, ensure_ascii=False)
