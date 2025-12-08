# DDO RDS Setup Script (PowerShell)
# Creates an RDS PostgreSQL instance with multi-environment schema support
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Sufficient IAM permissions for RDS
#
# Usage:
#   .\scripts\aws\setup-rds.ps1
#
# Or with custom values:
#   .\scripts\aws\setup-rds.ps1 -DbIdentifier "my-db" -DbName "myapp"

param(
    [string]$DbIdentifier = $env:RDS_DB_IDENTIFIER,
    [string]$DbName = $env:RDS_DB_NAME,
    [string]$DbUsername = $env:RDS_DB_USERNAME,
    [string]$DbPassword = $env:RDS_DB_PASSWORD,
    [string]$AwsRegion = $env:AWS_REGION,
    [string]$DbInstanceClass = "db.t3.micro",
    [int]$AllocatedStorage = 20
)

# Set defaults
if (-not $DbIdentifier) { $DbIdentifier = "ddo-postgres" }
if (-not $DbName) { $DbName = "ddo" }
if (-not $DbUsername) { $DbUsername = "ddo_admin" }
if (-not $AwsRegion) { $AwsRegion = "us-east-1" }

# Generate password if not provided
if (-not $DbPassword) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    $bytes = New-Object byte[] 24
    $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
    $rng.GetBytes($bytes)
    $DbPassword = -join ($bytes | ForEach-Object { $chars[$_ % $chars.Length] })
    $rng.Dispose()
}

$ErrorActionPreference = "Stop"

# Helper function to write UTF-8 without BOM
function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Digital DevOps - RDS Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:"
Write-Host "  DB Identifier:  $DbIdentifier"
Write-Host "  Database Name:  $DbName"
Write-Host "  Username:       $DbUsername"
Write-Host "  Instance Class: $DbInstanceClass"
Write-Host "  Storage:        ${AllocatedStorage}GB"
Write-Host "  AWS Region:     $AwsRegion"
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

# Step 1: Check if RDS instance already exists
Write-Host "Step 1: Checking for existing RDS instance..." -ForegroundColor Yellow

$ExistingInstance = $null
try {
    $ExistingInstance = aws rds describe-db-instances --db-instance-identifier $DbIdentifier --region $AwsRegion --output json 2>$null | ConvertFrom-Json
} catch {
    # Instance doesn't exist
}

if ($ExistingInstance -and $ExistingInstance.DBInstances.Count -gt 0) {
    $instance = $ExistingInstance.DBInstances[0]
    Write-Host "  RDS instance '$DbIdentifier' already exists" -ForegroundColor Yellow
    Write-Host "  Status: $($instance.DBInstanceStatus)" -ForegroundColor Yellow
    Write-Host "  Endpoint: $($instance.Endpoint.Address):$($instance.Endpoint.Port)" -ForegroundColor Green

    $DbEndpoint = $instance.Endpoint.Address
    $DbPort = $instance.Endpoint.Port
} else {
    # Step 2: Create security group for RDS
    Write-Host ""
    Write-Host "Step 2: Setting up security group..." -ForegroundColor Yellow

    $SgName = "$DbIdentifier-sg"
    $VpcId = $null
    $SgId = $null

    # Get default VPC
    try {
        $Vpcs = aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --region $AwsRegion --output json | ConvertFrom-Json
        if ($Vpcs.Vpcs.Count -gt 0) {
            $VpcId = $Vpcs.Vpcs[0].VpcId
            Write-Host "  Using default VPC: $VpcId" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  Warning: Could not get default VPC" -ForegroundColor Yellow
    }

    # Check if security group exists
    try {
        $ExistingSg = aws ec2 describe-security-groups --filters "Name=group-name,Values=$SgName" --region $AwsRegion --output json | ConvertFrom-Json
        if ($ExistingSg.SecurityGroups.Count -gt 0) {
            $SgId = $ExistingSg.SecurityGroups[0].GroupId
            Write-Host "  Security group already exists: $SgId" -ForegroundColor Yellow
        }
    } catch {
        # Security group doesn't exist
    }

    if (-not $SgId) {
        # Create security group
        try {
            $SgResult = aws ec2 create-security-group `
                --group-name $SgName `
                --description "Security group for DDO RDS PostgreSQL" `
                --vpc-id $VpcId `
                --region $AwsRegion `
                --output json | ConvertFrom-Json
            $SgId = $SgResult.GroupId
            Write-Host "  Created security group: $SgId" -ForegroundColor Green

            # Add inbound rule for PostgreSQL
            aws ec2 authorize-security-group-ingress `
                --group-id $SgId `
                --protocol tcp `
                --port 5432 `
                --cidr "0.0.0.0/0" `
                --region $AwsRegion 2>$null
            Write-Host "  Added inbound rule for PostgreSQL (port 5432)" -ForegroundColor Green
        } catch {
            Write-Host "  Warning: Could not create security group: $_" -ForegroundColor Yellow
        }
    }

    # Step 3: Create RDS instance
    Write-Host ""
    Write-Host "Step 3: Creating RDS PostgreSQL instance..." -ForegroundColor Yellow
    Write-Host "  This may take 5-10 minutes..." -ForegroundColor Gray

    $CreateParams = @(
        "--db-instance-identifier", $DbIdentifier,
        "--db-instance-class", $DbInstanceClass,
        "--engine", "postgres",
        "--engine-version", "15",
        "--master-username", $DbUsername,
        "--master-user-password", $DbPassword,
        "--allocated-storage", $AllocatedStorage.ToString(),
        "--db-name", $DbName,
        "--publicly-accessible",
        "--backup-retention-period", "7",
        "--storage-type", "gp2",
        "--region", $AwsRegion,
        "--output", "json"
    )

    if ($SgId) {
        $CreateParams += "--vpc-security-group-ids"
        $CreateParams += $SgId
    }

    try {
        $CreateResult = aws rds create-db-instance @CreateParams | ConvertFrom-Json
        Write-Host "  RDS instance creation initiated" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR creating RDS instance: $_" -ForegroundColor Red
        exit 1
    }

    # Wait for instance to be available
    Write-Host ""
    Write-Host "Step 4: Waiting for RDS instance to be available..." -ForegroundColor Yellow
    Write-Host "  (This typically takes 5-10 minutes)" -ForegroundColor Gray

    $maxAttempts = 60
    $attempt = 0
    $DbEndpoint = $null
    $DbPort = $null

    while ($attempt -lt $maxAttempts) {
        Start-Sleep -Seconds 30
        $attempt++

        try {
            $Status = aws rds describe-db-instances --db-instance-identifier $DbIdentifier --region $AwsRegion --output json | ConvertFrom-Json
            $instance = $Status.DBInstances[0]
            $currentStatus = $instance.DBInstanceStatus

            Write-Host "  Attempt $attempt/$maxAttempts - Status: $currentStatus" -ForegroundColor Gray

            if ($currentStatus -eq "available") {
                $DbEndpoint = $instance.Endpoint.Address
                $DbPort = $instance.Endpoint.Port
                Write-Host "  RDS instance is now available!" -ForegroundColor Green
                break
            }
        } catch {
            Write-Host "  Waiting..." -ForegroundColor Gray
        }
    }

    if (-not $DbEndpoint) {
        Write-Host "  Timeout waiting for RDS instance. Check AWS Console for status." -ForegroundColor Yellow
        Write-Host "  You can run this script again once the instance is available." -ForegroundColor Yellow
        exit 1
    }
}

# Step 5: Create schemas for each environment
Write-Host ""
Write-Host "Step 5: Environment Schema Setup" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Your RDS instance uses PostgreSQL schemas to separate environments:"
Write-Host "    - local_ddo  : Local development"
Write-Host "    - dev_ddo    : Development/staging"
Write-Host "    - prod_ddo   : Production"
Write-Host ""
Write-Host "  Prisma will create schemas automatically when you run migrations."
Write-Host ""

# Step 6: Generate connection strings
Write-Host "Step 6: Generating connection strings..." -ForegroundColor Yellow

$LocalSchema = "local_ddo"
$DevSchema = "dev_ddo"
$ProdSchema = "prod_ddo"

# URL encode password for connection string
$EncodedPassword = [System.Uri]::EscapeDataString($DbPassword)

$LocalUrl = "postgresql://${DbUsername}:${EncodedPassword}@${DbEndpoint}:${DbPort}/${DbName}?schema=${LocalSchema}"
$DevUrl = "postgresql://${DbUsername}:${EncodedPassword}@${DbEndpoint}:${DbPort}/${DbName}?schema=${DevSchema}"
$ProdUrl = "postgresql://${DbUsername}:${EncodedPassword}@${DbEndpoint}:${DbPort}/${DbName}?schema=${ProdSchema}"

# Save to .env.rds file
$EnvFile = ".env.rds"
$EnvContent = @"
# ==============================================
# AWS RDS PostgreSQL Configuration
# Generated by setup-rds.ps1 on $(Get-Date)
# ==============================================

# RDS Instance Details
RDS_DB_IDENTIFIER=$DbIdentifier
RDS_ENDPOINT=$DbEndpoint
RDS_PORT=$DbPort
RDS_DATABASE=$DbName
RDS_USERNAME=$DbUsername
RDS_PASSWORD=$DbPassword

# ==============================================
# DATABASE_URL for each environment
# Copy the appropriate one to your .env file
# ==============================================

# Local Development
DATABASE_URL="$LocalUrl"

# Development/Staging
# DATABASE_URL="$DevUrl"

# Production
# DATABASE_URL="$ProdUrl"

# ==============================================
# INSTRUCTIONS:
# 1. Copy DATABASE_URL to your .env file
# 2. Run: npx prisma migrate dev
# 3. IMPORTANT: Keep these credentials secure!
# 4. Never commit this file to version control
# ==============================================
"@

Write-Utf8NoBom -Path $EnvFile -Content $EnvContent
Write-Host "  Configuration saved to: $EnvFile" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "RDS Instance Details:" -ForegroundColor White
Write-Host "  Identifier: $DbIdentifier"
Write-Host "  Endpoint:   $DbEndpoint"
Write-Host "  Port:       $DbPort"
Write-Host "  Database:   $DbName"
Write-Host "  Username:   $DbUsername"
Write-Host ""
Write-Host "Environment Schemas:" -ForegroundColor White
Write-Host "  Local:      $LocalSchema"
Write-Host "  Dev:        $DevSchema"
Write-Host "  Production: $ProdSchema"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "  1. Copy DATABASE_URL from .env.rds to your .env file"
Write-Host "  2. Run: npx prisma migrate dev --name init"
Write-Host "  3. Delete .env.rds after copying (for security)"
Write-Host ""
Write-Host "Security Reminder:" -ForegroundColor Yellow
Write-Host "  - Never commit database credentials to git"
Write-Host "  - .env.rds should be in .gitignore"
Write-Host "  - Consider using AWS Secrets Manager for production"
Write-Host ""

# Verify .gitignore includes .env files
$GitignorePath = ".gitignore"
if (Test-Path $GitignorePath) {
    $GitignoreContent = Get-Content $GitignorePath -Raw
    if ($GitignoreContent -notmatch "\.env\.rds") {
        Write-Host "NOTE: Consider adding .env.rds to .gitignore" -ForegroundColor Yellow
    }
}
