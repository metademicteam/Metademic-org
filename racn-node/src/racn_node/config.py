import json, os
from pathlib import Path

def config_path() -> Path:
    xdg = os.environ.get("XDG_CONFIG_HOME")
    if os.name == "nt":
        base = Path(os.environ.get("APPDATA", str(Path.home()))) / "racn"
    elif xdg:
        base = Path(xdg) / "racn"
    else:
        base = Path.home() / ".racn"
    base.mkdir(parents=True, exist_ok=True)
    return base / "config.json"

def load() -> dict:
    p = config_path()
    if p.exists():
        try: return json.loads(p.read_text(encoding="utf-8"))
        except: return {}
    return {}

def save(d: dict):
    p = config_path()
    p.write_text(json.dumps(d, indent=2), encoding="utf-8")
    return p
