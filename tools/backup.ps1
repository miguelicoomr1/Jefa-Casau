# Copia de seguridad local del sitio en un ZIP fechado (sin node_modules ni .git).
# Uso: powershell -File tools/backup.ps1
$root = Split-Path -Parent $PSScriptRoot
$dest = Join-Path (Split-Path -Parent $root) "backups"
New-Item -ItemType Directory -Force $dest | Out-Null
$zip = Join-Path $dest ("climatsol-" + (Get-Date -Format "yyyy-MM-dd-HHmm") + ".zip")
$items = Get-ChildItem $root -Force | Where-Object { $_.Name -notin @("node_modules", ".git") }
Compress-Archive -Path $items.FullName -DestinationPath $zip
Write-Host "Copia creada: $zip"
