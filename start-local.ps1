# LiwuAI Connect - Start Local
# Run this in PowerShell from: E:\Websites\Kilo LywuAi Connect

Write-Host "=== Starting LiwuAI Connect Locally ===" -ForegroundColor Cyan

# Check if wrangler dev is already running on port 8787
$apiPort = 8787
$webPort = 5173

$apiProcess = Get-Process -Name "wrangler" -ErrorAction SilentlyContinue
$webProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($apiProcess) {
    Write-Host "Wrangler may already be running. If port 8787 is in use, stop it first." -ForegroundColor Yellow
}

# Start API in a new terminal window
Write-Host "`n[1/2] Starting API on http://localhost:8787..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `'cd ""E:\Websites\Kilo LywuAi Connect\apps\api""; npx wrangler dev src/index.ts --local`'" -WindowTitle "LiwuAI API"

# Wait a moment for API to start
Start-Sleep -Seconds 3

# Start frontend in a new terminal window
Write-Host "`n[2/2] Starting Frontend on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `'cd ""E:\Websites\Kilo LywuAi Connect\apps\web""; pnpm run dev`'" -WindowTitle "LiwuAI Web"

Write-Host "`n=== Both services starting! ===" -ForegroundColor Cyan
Write-Host "API:      http://localhost:8787" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "`nOpen http://localhost:5173 in your browser" -ForegroundColor Green
Write-Host "`nPress Ctrl+C in each terminal to stop" -ForegroundColor Yellow
