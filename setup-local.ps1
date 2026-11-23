# LiwuAI Connect - Local Setup Script
# Run this in PowerShell from: E:\Websites\Kilo LywuAi Connect

Write-Host "=== LiwuAI Connect Local Setup ===" -ForegroundColor Cyan

# Check prerequisites
Write-Host "`n[1/6] Checking prerequisites..." -ForegroundColor Yellow
node --version | Write-Host
pnpm --version | Write-Host

# Install dependencies
Write-Host "`n[2/6] Installing dependencies..." -ForegroundColor Yellow
pnpm install

# Create local Cloudflare resources
Write-Host "`n[3/6] Creating local D1 database..." -ForegroundColor Yellow
$d1Output = npx wrangler d1 create liwuai-db --local 2>&1
Write-Host $d1Output

# Extract D1 database ID from output
$d1Id = ($d1Output | Select-String -Pattern "database_id\s*=\s*""([^""]+)""" | ForEach-Object { $_.Matches.Groups[1].Value })
if (-not $d1Id) {
    Write-Host "Could not auto-extract D1 ID. You'll need to add it manually to wrangler.toml" -ForegroundColor Red
} else {
    Write-Host "D1 ID: $d1Id" -ForegroundColor Green
}

Write-Host "`n[4/6] Creating local KV namespace..." -ForegroundColor Yellow
$kvOutput = npx wrangler kv:namespace create LIWUAI_SESSIONS --local 2>&1
Write-Host $kvOutput

$kvId = ($kvOutput | Select-String -Pattern "id\s*=\s*""([^""]+)""" | ForEach-Object { $_.Matches.Groups[1].Value })
if ($kvId) {
    Write-Host "KV ID: $kvId" -ForegroundColor Green
}

Write-Host "`n[5/6] Creating local R2 bucket..." -ForegroundColor Yellow
npx wrangler r2 bucket create liwuai-uploads --local 2>&1 | Write-Host

# Update wrangler.toml with actual IDs
Write-Host "`n[6/6] Updating wrangler.toml..." -ForegroundColor Yellow
$tomlPath = "apps/api/wrangler.toml"
$tomlContent = Get-Content $tomlPath -Raw

if ($d1Id) {
    $tomlContent = $tomlContent -replace 'database_id = "your-d1-database-id-here"', "database_id = ""$d1Id"""
}
if ($kvId) {
    $tomlContent = $tomlContent -replace 'id = "your-kv-namespace-id-here"', "id = ""$kvId"""
}

Set-Content $tomlPath $tomlContent

# Run database schema
Write-Host "`n[7/7] Applying database schema..." -ForegroundColor Yellow
npx wrangler d1 execute liwuai-db --local --file=packages/db/schema.sql 2>&1 | Write-Host

Write-Host "`n=== Setup Complete! ===" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  Terminal 1: cd apps/api && npx wrangler dev src/index.ts --local"
Write-Host "  Terminal 2: cd apps/web && pnpm run dev"
Write-Host "  Open: http://localhost:5173" -ForegroundColor Green
