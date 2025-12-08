# DDO IAM User Setup Script (PowerShell)
# Creates an IAM user for the DDO application with appropriate permissions
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - IAM permissions to create users and access keys
# - Run setup-cognito.ps1 first to create the policy
#
# Usage:
#   .\scripts\aws\setup-iam-user.ps1
#
# Or with custom values:
#   .\scripts\aws\setup-iam-user.ps1 -UserName "my-app-user"

param(
    [string]$UserName = $env:IAM_USER_NAME,
    [string]$PolicyName = $env:IAM_POLICY_NAME
)

# Set defaults
if (-not $UserName) { $UserName = "ddo-app-user" }
if (-not $PolicyName) { $PolicyName = "ddo-cognito-policy" }

$ErrorActionPreference = "Stop"

# Helper function to write UTF-8 without BOM
function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Digital DevOps - IAM User Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:"
Write-Host "  User Name:   $UserName"
Write-Host "  Policy Name: $PolicyName"
Write-Host ""

# Check if AWS CLI is installed
try {
    $null = Get-Command aws -ErrorAction Stop
} catch {
    Write-Host "ERROR: AWS CLI is not installed. Please install it first." -ForegroundColor Red
    exit 1
}

# Check AWS credentials
Write-Host "Checking AWS credentials..."
try {
    $identity = aws sts get-caller-identity --output json | ConvertFrom-Json
    $AccountId = $identity.Account
    Write-Host "  AWS Account: $AccountId" -ForegroundColor Green
} catch {
    Write-Host "ERROR: AWS credentials not configured. Run 'aws configure' first." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 1: Check if policy exists
Write-Host "Step 1: Checking for IAM policy..." -ForegroundColor Yellow

$PolicyArn = $null
try {
    $Policies = aws iam list-policies --scope Local --output json | ConvertFrom-Json
    $ExistingPolicy = $Policies.Policies | Where-Object { $_.PolicyName -eq $PolicyName }
    if ($ExistingPolicy) {
        $PolicyArn = $ExistingPolicy.Arn
        Write-Host "  Found policy: $PolicyArn" -ForegroundColor Green
    } else {
        Write-Host "  ERROR: Policy '$PolicyName' not found." -ForegroundColor Red
        Write-Host "  Please run setup-cognito.ps1 first to create the policy." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  ERROR checking policies: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Create IAM User
Write-Host ""
Write-Host "Step 2: Creating IAM user..." -ForegroundColor Yellow

$UserExists = $false
try {
    $ExistingUser = aws iam get-user --user-name $UserName --output json 2>&1 | ConvertFrom-Json
    if ($ExistingUser.User) {
        $UserExists = $true
        Write-Host "  User '$UserName' already exists" -ForegroundColor Yellow
    }
} catch {
    # User doesn't exist, we'll create it
}

if (-not $UserExists) {
    try {
        aws iam create-user --user-name $UserName --output json | Out-Null
        Write-Host "  Created user: $UserName" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR creating user: $_" -ForegroundColor Red
        exit 1
    }
}

# Step 3: Attach policy to user
Write-Host ""
Write-Host "Step 3: Attaching policy to user..." -ForegroundColor Yellow

try {
    aws iam attach-user-policy --user-name $UserName --policy-arn $PolicyArn 2>&1 | Out-Null
    Write-Host "  Attached policy: $PolicyName" -ForegroundColor Green
} catch {
    Write-Host "  Warning: Could not attach policy (may already be attached): $_" -ForegroundColor Yellow
}

# Step 4: Create access keys
Write-Host ""
Write-Host "Step 4: Creating access keys..." -ForegroundColor Yellow

# Check existing access keys
try {
    $ExistingKeys = aws iam list-access-keys --user-name $UserName --output json | ConvertFrom-Json
    $KeyCount = $ExistingKeys.AccessKeyMetadata.Count

    if ($KeyCount -ge 2) {
        Write-Host "  WARNING: User already has 2 access keys (maximum)." -ForegroundColor Yellow
        Write-Host "  You can delete an old key with:" -ForegroundColor Yellow
        Write-Host "    aws iam delete-access-key --user-name $UserName --access-key-id <KEY_ID>" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  Existing keys:" -ForegroundColor Yellow
        foreach ($key in $ExistingKeys.AccessKeyMetadata) {
            Write-Host "    - $($key.AccessKeyId) (Created: $($key.CreateDate), Status: $($key.Status))" -ForegroundColor Gray
        }

        $AccessKeyId = "EXISTING_KEY_CHECK_AWS_CONSOLE"
        $SecretAccessKey = "EXISTING_KEY_CHECK_AWS_CONSOLE"
    } else {
        # Create new access key
        $KeyResult = aws iam create-access-key --user-name $UserName --output json | ConvertFrom-Json
        $AccessKeyId = $KeyResult.AccessKey.AccessKeyId
        $SecretAccessKey = $KeyResult.AccessKey.SecretAccessKey

        Write-Host "  Access Key ID: $AccessKeyId" -ForegroundColor Green
        Write-Host "  Secret Access Key: [HIDDEN - see .env.iam file]" -ForegroundColor Green
    }
} catch {
    Write-Host "  ERROR creating access key: $_" -ForegroundColor Red
    exit 1
}

# Step 5: Generate output file
Write-Host ""
Write-Host "Step 5: Generating configuration..." -ForegroundColor Yellow

$EnvFile = ".env.iam"
$EnvContent = @"
# ==============================================
# AWS IAM User Credentials
# Generated by setup-iam-user.ps1 on $(Get-Date)
# ==============================================

# IAM User: $UserName
# Policy: $PolicyArn

AWS_ACCESS_KEY_ID=$AccessKeyId
AWS_SECRET_ACCESS_KEY=$SecretAccessKey

# ==============================================
# INSTRUCTIONS:
# 1. Copy these values to your .env file
# 2. IMPORTANT: Keep these credentials secure!
# 3. Never commit this file to version control
# 4. Delete this file after copying the values
# ==============================================
"@

Write-Utf8NoBom -Path $EnvFile -Content $EnvContent
Write-Host "  Credentials saved to: $EnvFile" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Resources Created:" -ForegroundColor White
Write-Host "  - IAM User:   $UserName"
Write-Host "  - Policy:     $PolicyName"
if ($AccessKeyId -ne "EXISTING_KEY_CHECK_AWS_CONSOLE") {
    Write-Host "  - Access Key: $AccessKeyId"
}
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "  1. Copy AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from .env.iam to .env"
Write-Host "  2. Delete .env.iam after copying (for security)"
Write-Host "  3. Verify SES email/domain in AWS Console"
Write-Host "  4. Run: npx prisma migrate dev"
Write-Host "  5. Restart your dev server"
Write-Host ""
Write-Host "Security Reminder:" -ForegroundColor Yellow
Write-Host "  - Never commit AWS credentials to git"
Write-Host "  - .env and .env.iam should be in .gitignore"
Write-Host "  - Rotate keys periodically"
Write-Host ""

# Verify .gitignore includes .env files
$GitignorePath = ".gitignore"
if (Test-Path $GitignorePath) {
    $GitignoreContent = Get-Content $GitignorePath -Raw
    if ($GitignoreContent -notmatch "\.env") {
        Write-Host "WARNING: .env may not be in .gitignore!" -ForegroundColor Red
        Write-Host "  Add these lines to .gitignore:" -ForegroundColor Yellow
        Write-Host "    .env" -ForegroundColor Gray
        Write-Host "    .env.*" -ForegroundColor Gray
        Write-Host "    !.env.example" -ForegroundColor Gray
    }
}
