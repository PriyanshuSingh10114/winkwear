# ==============================================================================
# WinkWear — AWS Production Deployment & Validation Automation (PowerShell)
# ==============================================================================
# Prerequisites:
# 1. AWS CLI configured (aws configure)
# 2. Docker Desktop running
# ==============================================================================

param(
    [string]$AwsRegion = "ap-south-1",
    [string]$S3FrontendBucket = "winkwear-frontend-prod",
    [string]$S3MediaBucket = "winkwear-media-prod",
    [string]$CloudFrontDistId = "",
    [string]$AppRunnerServiceName = "winkwear-backend-api"
)

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "     WINKWEAR — AWS DEPLOYMENT PIPELINE           " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Step 1: Verify AWS Authentication
Write-Host "`n[Step 1/5] Verifying AWS Identity..." -ForegroundColor Yellow
try {
    $caller = aws sts get-caller-identity | ConvertFrom-Json
    Write-Host "✓ Authenticated as AWS Account: $($caller.Account) | ARN: $($caller.Arn)" -ForegroundColor Green
} catch {
    Write-Error "AWS Authentication failed. Please run 'aws configure' or set AWS credentials."
    exit 1
}

# Step 2: Build FrontEnd Production Bundle
Write-Host "`n[Step 2/5] Building FrontEnd Production Assets..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\..\FrontEnd"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "FrontEnd build failed."
    exit 1
}
Write-Host "✓ FrontEnd production build completed." -ForegroundColor Green

# Step 3: Deploy Frontend to S3 with Optimal Cache Policies
Write-Host "`n[Step 3/5] Syncing FrontEnd to S3 ($S3FrontendBucket)..." -ForegroundColor Yellow

# Sync hashed assets with 1-year immutable caching
Write-Host "  -> Uploading hashed assets (/assets/*) with 1-year immutable cache..."
aws s3 sync dist/assets/ "s3://$S3FrontendBucket/assets/" `
    --cache-control "public, max-age=31536000, immutable" `
    --region $AwsRegion

# Sync remaining static files (favicon, manifest, images)
aws s3 sync dist/ "s3://$S3FrontendBucket/" `
    --exclude "assets/*" `
    --exclude "index.html" `
    --cache-control "public, max-age=86400" `
    --region $AwsRegion

# Upload index.html with no-cache / revalidate policy
Write-Host "  -> Uploading index.html with revalidation policy..."
aws s3 cp dist/index.html "s3://$S3FrontendBucket/index.html" `
    --cache-control "public, max-age=0, must-revalidate" `
    --region $AwsRegion

Write-Host "✓ FrontEnd assets uploaded to S3." -ForegroundColor Green

# Step 4: Invalidate CloudFront Cache (if Distribution ID provided)
if ($CloudFrontDistId -ne "") {
    Write-Host "`n[Step 4/5] Invalidating CloudFront Cache ($CloudFrontDistId)..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $CloudFrontDistId --paths "/*"
    Write-Host "✓ CloudFront cache invalidation initiated." -ForegroundColor Green
} else {
    Write-Host "`n[Step 4/5] Skipping CloudFront invalidation (no Distribution ID passed)." -ForegroundColor Gray
}

# Step 5: Build and Containerize Backend
Write-Host "`n[Step 5/5] Building BackEnd Docker Image..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\..\BackEnd"
docker build -t winkwear-backend:latest .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ BackEnd Docker image built successfully." -ForegroundColor Green
    Write-Host "  Image: winkwear-backend:latest (Ready for ECR / App Runner)" -ForegroundColor Cyan
}

Set-Location -Path "$PSScriptRoot\.."
Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "     DEPLOYMENT PIPELINE COMPLETED SUCCESSFULLY   " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
