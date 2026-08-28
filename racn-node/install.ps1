param([string]$CoordinatorUrl = "wss://coordinator.metademic.org/ws")
Write-Host "RACN install — coordinator: $CoordinatorUrl"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
pip install -e $dir
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
racn-node init --coordinator-url $CoordinatorUrl
Write-Host "Done. Run: racn-node start  (or racn-node doctor)"
