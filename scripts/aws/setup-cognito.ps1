# DDO Cognito Setup Script (PowerShell)
# This script creates and configures AWS Cognito User Pool for Digital DevOps
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Appropriate IAM permissions for Cognito and SES
#
# Usage:
#   .\scripts\setup-cognito.ps1
#
# Or with custom values:
#   $env:AWS_REGION="us-west-2"; .\scripts\setup-cognito.ps1

param(
    [string]$AwsRegion = $env:AWS_REGION,
    [string]$UserPoolName = $env:USER_POOL_NAME,
    [string]$AppClientName = $env:APP_CLIENT_NAME,
    [string]$AppDomain = $env:APP_DOMAIN,
    [string]$SesEmail = $env:SES_EMAIL,
    [string]$CognitoDomainPrefix = $env:COGNITO_DOMAIN_PREFIX
)

# Set defaults if not provided
if (-not $AwsRegion) { $AwsRegion = "us-east-1" }
if (-not $UserPoolName) { $UserPoolName = "ddo-user-pool" }
if (-not $AppClientName) { $AppClientName = "ddo-web-client" }
if (-not $AppDomain) { $AppDomain = "http://localhost:3000" }
if (-not $SesEmail) { $SesEmail = "noreply@digitaldevops.io" }
if (-not $CognitoDomainPrefix) { $CognitoDomainPrefix = "ddo-auth" }

$ErrorActionPreference = "Stop"

# Helper function to write UTF-8 without BOM
function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Digital DevOps - Cognito Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:"
Write-Host "  AWS Region:     $AwsRegion"
Write-Host "  User Pool Name: $UserPoolName"
Write-Host "  App Domain:     $AppDomain"
Write-Host "  SES Email:      $SesEmail"
Write-Host ""

# Check if AWS CLI is installed
try {
    $null = Get-Command aws -ErrorAction Stop
} catch {
    Write-Host "ERROR: AWS CLI is not installed. Please install it first." -ForegroundColor Red
    Write-Host "  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
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

# Step 1: Create User Pool
Write-Host "Step 1: Creating Cognito User Pool..." -ForegroundColor Yellow

# Create JSON files for complex parameters (without BOM)
$TempDir = $env:TEMP
$PoliciesFile = Join-Path $TempDir "cognito-policies.json"
$AdminConfigFile = Join-Path $TempDir "cognito-admin-config.json"
$SchemaFile = Join-Path $TempDir "cognito-schema.json"
$RecoveryFile = Join-Path $TempDir "cognito-recovery.json"

$PoliciesJson = @'
{"PasswordPolicy":{"MinimumLength":12,"RequireUppercase":true,"RequireLowercase":true,"RequireNumbers":true,"RequireSymbols":true,"TemporaryPasswordValidityDays":7}}
'@

$AdminConfigJson = @"
{"AllowAdminCreateUserOnly":true,"InviteMessageTemplate":{"EmailSubject":"Welcome to Digital DevOps","EmailMessage":"Hello, you have been invited to Digital DevOps. Your username is {username} and temporary password is {####}. Please sign in at $AppDomain/login"}}
"@

$SchemaJson = @'
[{"Name":"email","AttributeDataType":"String","Required":true,"Mutable":true},{"Name":"name","AttributeDataType":"String","Required":false,"Mutable":true}]
'@

$RecoveryJson = @'
{"RecoveryMechanisms":[{"Priority":1,"Name":"verified_email"}]}
'@

Write-Utf8NoBom -Path $PoliciesFile -Content $PoliciesJson
Write-Utf8NoBom -Path $AdminConfigFile -Content $AdminConfigJson
Write-Utf8NoBom -Path $SchemaFile -Content $SchemaJson
Write-Utf8NoBom -Path $RecoveryFile -Content $RecoveryJson

try {
    Write-Host "  Creating user pool with AWS CLI..." -ForegroundColor Gray

    $CreatePoolCmd = "aws cognito-idp create-user-pool --pool-name `"$UserPoolName`" --region $AwsRegion --policies file://$PoliciesFile --auto-verified-attributes email --username-attributes email --mfa-configuration OFF --admin-create-user-config file://$AdminConfigFile --schema file://$SchemaFile --account-recovery-setting file://$RecoveryFile --output json"

    $UserPoolResult = Invoke-Expression $CreatePoolCmd 2>&1

    if ($LASTEXITCODE -ne 0) {
        throw $UserPoolResult
    }

    $UserPoolJson = $UserPoolResult | ConvertFrom-Json
    $UserPoolId = $UserPoolJson.UserPool.Id

    if (-not $UserPoolId) {
        throw "Failed to parse user pool ID from response"
    }

    Write-Host "  User Pool ID: $UserPoolId" -ForegroundColor Green
} catch {
    Write-Host "  ERROR creating user pool: $_" -ForegroundColor Red

    # Try to find existing user pool
    Write-Host "  Checking for existing user pool..." -ForegroundColor Yellow
    try {
        $ExistingPools = aws cognito-idp list-user-pools --max-results 50 --region $AwsRegion --output json | ConvertFrom-Json
        $ExistingPool = $ExistingPools.UserPools | Where-Object { $_.Name -eq $UserPoolName }

        if ($ExistingPool) {
            $UserPoolId = $ExistingPool.Id
            Write-Host "  Found existing User Pool: $UserPoolId" -ForegroundColor Green
        } else {
            Write-Host "  No existing pool found. Exiting." -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "  Could not list user pools: $_" -ForegroundColor Red
        exit 1
    }
}

# Clean up temp files
Remove-Item -Path $PoliciesFile, $AdminConfigFile, $SchemaFile, $RecoveryFile -ErrorAction SilentlyContinue

# Step 2: Create App Client
Write-Host ""
Write-Host "Step 2: Creating App Client..." -ForegroundColor Yellow

$TokenUnitsFile = Join-Path $TempDir "cognito-token-units.json"
$TokenUnitsJson = '{"AccessToken":"hours","IdToken":"hours","RefreshToken":"days"}'
Write-Utf8NoBom -Path $TokenUnitsFile -Content $TokenUnitsJson

$CallbackUrl = "$AppDomain/api/auth/callback/cognito"

try {
    $CreateClientCmd = "aws cognito-idp create-user-pool-client --user-pool-id $UserPoolId --client-name `"$AppClientName`" --region $AwsRegion --generate-secret --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH ALLOW_USER_SRP_AUTH --supported-identity-providers COGNITO --callback-urls $CallbackUrl --logout-urls $AppDomain --allowed-o-auth-flows code --allowed-o-auth-scopes openid email profile --allowed-o-auth-flows-user-pool-client --prevent-user-existence-errors ENABLED --access-token-validity 1 --id-token-validity 1 --refresh-token-validity 30 --token-validity-units file://$TokenUnitsFile --output json"

    $ClientResult = Invoke-Expression $CreateClientCmd 2>&1

    if ($LASTEXITCODE -ne 0) {
        throw $ClientResult
    }

    $ClientJson = $ClientResult | ConvertFrom-Json
    $ClientId = $ClientJson.UserPoolClient.ClientId
    $ClientSecret = $ClientJson.UserPoolClient.ClientSecret

    Write-Host "  Client ID: $ClientId" -ForegroundColor Green
    Write-Host "  Client Secret: [HIDDEN - see .env.cognito file]" -ForegroundColor Green
} catch {
    Write-Host "  ERROR creating client: $_" -ForegroundColor Red

    # Try to find existing client
    Write-Host "  Checking for existing client..." -ForegroundColor Yellow
    try {
        $ExistingClients = aws cognito-idp list-user-pool-clients --user-pool-id $UserPoolId --region $AwsRegion --output json | ConvertFrom-Json
        $ExistingClient = $ExistingClients.UserPoolClients | Where-Object { $_.ClientName -eq $AppClientName }

        if ($ExistingClient) {
            $ClientId = $ExistingClient.ClientId
            $ClientDetails = aws cognito-idp describe-user-pool-client --user-pool-id $UserPoolId --client-id $ClientId --region $AwsRegion --output json | ConvertFrom-Json
            $ClientSecret = $ClientDetails.UserPoolClient.ClientSecret
            Write-Host "  Found existing Client: $ClientId" -ForegroundColor Green
        } else {
            Write-Host "  No existing client found. Exiting." -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "  Could not list clients: $_" -ForegroundColor Red
        exit 1
    }
}

Remove-Item -Path $TokenUnitsFile -ErrorAction SilentlyContinue

# Step 3: Create Cognito Domain
Write-Host ""
Write-Host "Step 3: Creating Cognito Domain..." -ForegroundColor Yellow

try {
    $DomainResult = aws cognito-idp describe-user-pool-domain --domain $CognitoDomainPrefix --region $AwsRegion --output json 2>&1 | ConvertFrom-Json
    if ($DomainResult.DomainDescription.UserPoolId) {
        Write-Host "  Domain '$CognitoDomainPrefix' already exists" -ForegroundColor Yellow
    } else {
        throw "Domain not found"
    }
} catch {
    try {
        aws cognito-idp create-user-pool-domain --domain $CognitoDomainPrefix --user-pool-id $UserPoolId --region $AwsRegion 2>&1 | Out-Null
        Write-Host "  Domain created: $CognitoDomainPrefix" -ForegroundColor Green
    } catch {
        Write-Host "  Warning: Could not create domain: $_" -ForegroundColor Yellow
    }
}

$CognitoDomain = "https://$CognitoDomainPrefix.auth.$AwsRegion.amazoncognito.com"
Write-Host "  Cognito Domain: $CognitoDomain" -ForegroundColor Green

# Step 4: Create IAM Policy
Write-Host ""
Write-Host "Step 4: Creating IAM Policy..." -ForegroundColor Yellow

$PolicyName = "ddo-cognito-policy"
$PolicyFile = Join-Path $TempDir "cognito-iam-policy.json"

$PolicyJson = @"
{"Version":"2012-10-17","Statement":[{"Sid":"CognitoAdminAccess","Effect":"Allow","Action":["cognito-idp:AdminCreateUser","cognito-idp:AdminDeleteUser","cognito-idp:AdminGetUser","cognito-idp:AdminSetUserPassword","cognito-idp:AdminUpdateUserAttributes","cognito-idp:AdminDisableUser","cognito-idp:AdminEnableUser","cognito-idp:ListUsers"],"Resource":"arn:aws:cognito-idp:${AwsRegion}:${AccountId}:userpool/$UserPoolId"},{"Sid":"SESAccess","Effect":"Allow","Action":["ses:SendEmail","ses:SendRawEmail"],"Resource":"*"}]}
"@

Write-Utf8NoBom -Path $PolicyFile -Content $PolicyJson

# Check if policy exists
$PolicyArn = $null
try {
    $Policies = aws iam list-policies --scope Local --output json | ConvertFrom-Json
    $ExistingPolicy = $Policies.Policies | Where-Object { $_.PolicyName -eq $PolicyName }
    if ($ExistingPolicy) {
        $PolicyArn = $ExistingPolicy.Arn
        Write-Host "  Policy '$PolicyName' already exists: $PolicyArn" -ForegroundColor Yellow
    }
} catch {}

if (-not $PolicyArn) {
    try {
        $PolicyResult = aws iam create-policy --policy-name $PolicyName --policy-document "file://$PolicyFile" --description "IAM policy for DDO Cognito and SES access" --output json | ConvertFrom-Json
        $PolicyArn = $PolicyResult.Policy.Arn
        Write-Host "  Policy ARN: $PolicyArn" -ForegroundColor Green
    } catch {
        Write-Host "  Warning: Could not create policy: $_" -ForegroundColor Yellow
        $PolicyArn = "arn:aws:iam::${AccountId}:policy/$PolicyName"
    }
}

Remove-Item -Path $PolicyFile -ErrorAction SilentlyContinue

# Step 5: Generate .env values
Write-Host ""
Write-Host "Step 5: Generating environment configuration..." -ForegroundColor Yellow

# Generate NextAuth secret
$RNG = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$bytes = New-Object byte[] 32
$RNG.GetBytes($bytes)
$NextAuthSecret = [Convert]::ToBase64String($bytes)
$RNG.Dispose()

$CognitoIssuer = "https://cognito-idp.$AwsRegion.amazonaws.com/$UserPoolId"

# Create .env.cognito file
$EnvFile = ".env.cognito"
$EnvContent = @"
# ==============================================
# AWS Cognito Configuration
# Generated by setup-cognito.ps1 on $(Get-Date)
# ==============================================

# Cognito User Pool
COGNITO_USER_POOL_ID=$UserPoolId
COGNITO_CLIENT_ID=$ClientId
COGNITO_CLIENT_SECRET=$ClientSecret
COGNITO_ISSUER=$CognitoIssuer
COGNITO_DOMAIN=$CognitoDomain

# AWS Region
AWS_REGION=$AwsRegion

# AWS Credentials (replace with your actual credentials)
# IMPORTANT: Use IAM user/role with the policy: $PolicyArn
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here

# SES Configuration
SES_FROM_EMAIL=$SesEmail

# NextAuth.js
NEXTAUTH_URL=$AppDomain
NEXTAUTH_SECRET=$NextAuthSecret

# ==============================================
# INSTRUCTIONS:
# 1. Copy these values to your .env file
# 2. Replace AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
#    with credentials from an IAM user attached to:
#    $PolicyArn
# 3. Verify your SES_FROM_EMAIL in AWS SES
# ==============================================
"@

Write-Utf8NoBom -Path $EnvFile -Content $EnvContent
Write-Host "  Environment file created: $EnvFile" -ForegroundColor Green

# Step 6: Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Resources Created:" -ForegroundColor White
Write-Host "  - User Pool:   $UserPoolId"
Write-Host "  - App Client:  $ClientId"
Write-Host "  - Domain:      $CognitoDomain"
Write-Host "  - IAM Policy:  $PolicyArn"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "  1. Copy values from .env.cognito to your .env file"
Write-Host "  2. Create an IAM user and attach the policy: $PolicyName"
Write-Host "  3. Add the IAM user's credentials to .env"
Write-Host "  4. Verify your email domain in AWS SES"
Write-Host "  5. Run: npx prisma migrate dev"
Write-Host "  6. Restart your dev server"
Write-Host ""
Write-Host "Useful Commands:" -ForegroundColor White
Write-Host ""
Write-Host "  # Create a test user" -ForegroundColor Gray
Write-Host "  aws cognito-idp admin-create-user --user-pool-id $UserPoolId --username test@example.com --user-attributes Name=email,Value=test@example.com --region $AwsRegion"
Write-Host ""
Write-Host "  # List users" -ForegroundColor Gray
Write-Host "  aws cognito-idp list-users --user-pool-id $UserPoolId --region $AwsRegion"
Write-Host ""
