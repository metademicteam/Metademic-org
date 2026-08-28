import platform, subprocess, shutil, os

TIERS = {
    "H1": "16GB+ GPU (A100/H100/4090) — vLLM",
    "H2": "10-16GB GPU (3090/4080) — vLLM/llama.cpp",
    "H3": "6-10GB GPU (3060/4060) — llama.cpp",
    "H4": "4-6GB GPU — llama.cpp (quantized)",
    "H5": "CPU only — llama.cpp",
    "H6": "Apple Silicon / low CPU — MLX / llama.cpp",
}

def probe() -> dict:
    info: dict = {"platform": platform.platform(), "machine": platform.machine(), "tier": "H5", "engine": "llama.cpp", "detail": ""}
    try:
        if platform.system() == "Darwin" and platform.machine() == "arm64":
            info["tier"] = "H6"; info["engine"] = "MLX"; info["detail"] = "Apple Silicon"
            return info
    except: pass
    if shutil.which("nvidia-smi"):
        try:
            out = subprocess.check_output(["nvidia-smi", "--query-gpu=memory.total", "--format=csv,noheader,nounits"], text=True, timeout=5)
            mems = [int(x.strip()) for x in out.strip().splitlines() if x.strip().isdigit()]
            max_mem = max(mems) if mems else 0
            info["detail"] = f"{max_mem} MB VRAM"
            if max_mem >= 16000: info["tier"] = "H1"; info["engine"] = "vLLM"
            elif max_mem >= 10000: info["tier"] = "H2"; info["engine"] = "vLLM"
            elif max_mem >= 6000: info["tier"] = "H3"; info["engine"] = "llama.cpp"
            elif max_mem >= 4000: info["tier"] = "H4"; info["engine"] = "llama.cpp"
            else: info["tier"] = "H4"; info["engine"] = "llama.cpp"
            return info
        except: pass
    info["detail"] = "No GPU detected — CPU fallback"
    return info

def engine_hint(info: dict) -> str:
    tier = info.get("tier", "H5")
    if tier in ("H1", "H2"): return "pip install vllm  (or llama.cpp as fallback)"
    if tier == "H6": return "pip install mlx  (Apple Silicon)"
    return "pip install llama-cpp-python  (CPU)"
