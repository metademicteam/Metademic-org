import os, asyncio, json, time, uuid, hashlib
from pathlib import Path
import click

from .config import load, save, config_path
from .hardware import probe, engine_hint

try:
    import websockets
except ImportError:
    websockets = None  # type: ignore

def _id() -> str:
    return hashlib.sha256(f"{uuid.getnode()}-{time.time()}".encode()).hexdigest()[:12]

@click.group(invoke_without_command=True)
@click.pass_context
def main(ctx):
    if ctx.invoked_subcommand is None:
        click.echo(ctx.get_help())

@main.command()
@click.option("--coordinator-url", required=True, help="WSS coordinator, e.g. wss://coordinator.metademic.org/ws")
@click.option("--token", default=None, help="Optional auth token")
def init(coordinator_url, token):
    cfg = load()
    if "node_id" not in cfg: cfg["node_id"] = f"node-{_id()}"
    cfg["coordinator_url"] = coordinator_url
    if token: cfg["token"] = token
    cfg["http_url"] = coordinator_url.replace("wss://", "https://").replace("/ws", "").rstrip("/")
    p = save(cfg)
    click.echo(f"✓ config → {p}")
    click.echo(f"  node_id: {cfg['node_id']}")
    click.echo(f"  coordinator: {coordinator_url}")
    if websockets is None: click.echo("  hint: pip install websockets (needed for start)")

@main.command()
def doctor():
    cfg = load()
    info = probe()
    click.echo(f"Config: {config_path()} → {json.dumps(cfg, indent=2) if cfg else '(empty — run init)'}")
    click.echo(f"Hardware: {info['tier']} — {info['engine']} | {info['detail']}")
    click.echo(f"Engine hint: {engine_hint(info)}")
    if not cfg.get("coordinator_url"): click.echo("⚠ no coordinator_url — run: racn-node init --coordinator-url wss://...")
    if websockets is None: click.echo("⚠ websockets not installed — pip install websockets")
    else: click.echo("✓ websockets ok")

@main.command()
@click.option("--coordinator-url", default=None)
def start(coordinator_url):
    cfg = load()
    url = coordinator_url or cfg.get("coordinator_url") or os.environ.get("RACN_COORDINATOR_URL") or "wss://coordinator.metademic.org/ws"
    if not cfg.get("coordinator_url"): click.echo(f"Using coordinator: {url} (not yet saved — run init to persist)")
    if websockets is None:
        click.echo("Missing dependency: websockets. Run: pip install websockets", err=True); raise SystemExit(1)
    asyncio.run(_run(url, cfg))

async def _run(url: str, cfg: dict):
    import websockets as ws
    node_id = cfg.get("node_id", f"node-{_id()}")
    token = cfg.get("token") or os.environ.get("RACN_SERVICE_TOKEN") or ""
    info = probe()
    backoff = 1
    while True:
        try:
            click.echo(f"→ connecting {url} as {node_id} [{info['tier']}/{info['engine']}] ...")
            headers = {"Authorization": f"Bearer {token}"} if token else {}
            async with ws.connect(url, additional_headers=headers) as sock:
                click.echo("✓ connected. Waiting for jobs (prompt → best-GPU → generate())...")
                backoff = 1
                await sock.send(json.dumps({"type": "hello", "node_id": node_id, "tier": info["tier"], "engine": info["engine"]}))
                await sock.send(json.dumps({"type": "register", "node_id": node_id, "hardware": info, "capabilities": {"gpu_tier": info["tier"]}}))
                last_hb = 0
                while True:
                    try:
                        msg = await asyncio.wait_for(sock.recv(), timeout=15)
                    except asyncio.TimeoutError:
                        if time.time() - last_hb > 14:
                            await sock.send(json.dumps({"type": "heartbeat", "node_id": node_id}))
                            last_hb = time.time()
                        continue
                    try: data = json.loads(msg)
                    except: continue
                    t = data.get("type")
                    if t == "job":
                        job_id = data.get("job_id") or data.get("id")
                        prompt = data.get("prompt") or data.get("input") or ""
                        privacy = data.get("privacy_tier", "public")
                        click.echo(f"  job {str(job_id)[:8]} [{privacy}] prompt={len(prompt)} chars → generate()...")
                        output = await _generate(prompt, info)
                        await sock.send(json.dumps({"type": "complete", "job_id": job_id, "node_id": node_id, "output": output}))
                        click.echo(f"  ✓ completed {str(job_id)[:8]}")
                    elif t == "ping":
                        await sock.send(json.dumps({"type": "pong"}))
        except Exception as e:
            click.echo(f"✗ {e} — reconnecting in {backoff}s...", err=True)
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, 30)

async def _generate(prompt: str, info: dict) -> str:
    # stub: replace with vLLM / llama.cpp / MLX call
    await asyncio.sleep(0.2)
    return f"[racn-node {info['tier']}/{info['engine']}] {prompt[:400]}"

if __name__ == "__main__":
    main()
