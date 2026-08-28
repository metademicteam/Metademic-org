# racn-node — RACN P2P peer (prompt → coordinator → best-GPU generate)

Local install for Windows / macOS / Linux. Coordinator picks fastest peer by `gpu+mem+bw−lat−queue+trust`; peer runs `generate(prompt)`.

## Install (pick one)

**1. pip (recommended, local package)**
```powershell
# from repo root — Windows PowerShell
pip install -e .\racn-node

racn-node init --coordinator-url wss://coordinator.metademic.org/ws
racn-node start
```

**2. One-liner (Linux/macOS)**
```bash
curl -fsSL https://racn.dev/install | bash
# or locally:
bash ./racn-node/install.sh --coordinator-url wss://coordinator.metademic.org/ws
```

**3. Docker (GPU)**
```powershell
docker build -t racn/peer:latest -f racn-node/Dockerfile .
docker run --gpus all -e COORDINATOR_URL=wss://coordinator.metademic.org/ws racn/peer:latest
# or with docker-compose:
# docker compose -f racn-node/docker-compose.yml up
```

## Env

- `RACN_COORDINATOR_URL` / `RACN_HTTP_URL` in `.env.local` for the website (restart dev server after editing).
- On PowerShell, ephemeral: `$env:RACN_COORDINATOR_URL="wss://coordinator.metademic.org/ws"` (dies when shell closes).
- On Vercel: Dashboard → Settings → Environment Variables.

Run `racn-node doctor` to check WSS + credits.
