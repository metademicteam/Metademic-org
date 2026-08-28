#!/usr/bin/env bash
set -euo pipefail
COORD="${1:-}"; [[ "$1" == "--coordinator-url" ]] && COORD="$2" || true
COORD="${COORD:-${RACN_COORDINATOR_URL:-wss://coordinator.metademic.org/ws}}"
echo "RACN install — coordinator: $COORD"
if ! command -v python3 >/dev/null 2>&1; then echo "need python3"; exit 1; fi
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
python3 -m pip install -e "$SCRIPT_DIR"
python3 -m racn_node.cli init --coordinator-url "$COORD"
echo "✓ installed. Run: racn-node start  (or: racn-node doctor)"
