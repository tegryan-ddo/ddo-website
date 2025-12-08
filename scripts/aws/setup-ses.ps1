# DDO SES Setup Script (PowerShell)
# Configures AWS SES for sending emails from the DDO application
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Domain DNS access (for domain verification)
#
# Usage:
#   .\scripts\aws\setup-ses.ps1
#
# Or with custom values:
#   .\scripts\aws\setup-ses.ps1 -Domain "mydomain.com" -FromEmail "noreply@mydomain.com"

param(
    [string]$Domain = $env:SES_DOMAIN,
    [string]$FromEmail = $env:SES_FROM_EMAIL,
    [string]$AwsRegion = $env:AWS_REGION
)

# Set defaults
if (-not $Domain) { $Domain = "digitaldevops.io" }
if (-not $FromEmail) { $FromEmail = "noreply@digitaldevops.io" }
if (-not $AwsRegion) { $AwsRegion = "us-east-1" }

$ErrorActionPreference = "Stop"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Digital DevOps - SES Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:"
Write-Host "  Domain:     $Domain"
Write-Host "  From Email: $FromEmail"
Write-Host "  AWS Region: $AwsRegion"
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

# Step 1: Check SES account status
Write-Host "Step 1: Checking SES account status..." -ForegroundColor Yellow

try {
    $AccountDetails = aws sesv2 get-account --region $AwsRegion --output json 2>&1 | ConvertFrom-Json

    if ($AccountDetails.ProductionAccessEnabled) {
        Write-Host "  Production access: ENABLED" -ForegroundColor Green
        $InSandbox = $false
    } else {
        Write-Host "  Production access: DISABLED (Sandbox mode)" -ForegroundColor Yellow
        Write-Host "  Note: In sandbox mode, you can only send to verified emails" -ForegroundColor Yellow
        $InSandbox = $true
    }

    if ($AccountDetails.SendingEnabled) {
        Write-Host "  Sending enabled: YES" -ForegroundColor Green
    } else {
        Write-Host "  Sending enabled: NO" -ForegroundColor Red
    }
} catch {
    Write-Host "  Could not get account details: $_" -ForegroundColor Yellow
    $InSandbox = $true
}

# Step 2: Verify domain identity
Write-Host ""
Write-Host "Step 2: Setting up domain identity ($Domain)..." -ForegroundColor Yellow

$DomainVerified = $false
try {
    # Check if domain is already verified
    $Identities = aws sesv2 list-email-identities --region $AwsRegion --output json | ConvertFrom-Json
    $ExistingDomain = $Identities.EmailIdentities | Where-Object { $_.IdentityName -eq $Domain }

    if ($ExistingDomain) {
        Write-Host "  Domain '$Domain' already exists in SES" -ForegroundColor Yellow

        # Get verification status
        $DomainDetails = aws sesv2 get-email-identity --email-identity $Domain --region $AwsRegion --output json | ConvertFrom-Json

        if ($DomainDetails.VerifiedForSendingStatus) {
            Write-Host "  Domain verification: VERIFIED" -ForegroundColor Green
            $DomainVerified = $true
        } else {
            Write-Host "  Domain verification: PENDING" -ForegroundColor Yellow
        }
    } else {
        # Create domain identity
        Write-Host "  Creating domain identity..." -ForegroundColor Gray
        aws sesv2 create-email-identity --email-identity $Domain --region $AwsRegion 2>&1 | Out-Null
        Write-Host "  Domain identity created" -ForegroundColor Green
    }

    # Get DKIM tokens for DNS setup
    $DomainDetails = aws sesv2 get-email-identity --email-identity $Domain --region $AwsRegion --output json | ConvertFrom-Json
    $DkimTokens = $DomainDetails.DkimAttributes.Tokens

    if ($DkimTokens -and $DkimTokens.Count -gt 0) {
        Write-Host ""
        Write-Host "  DNS Records Required for DKIM:" -ForegroundColor Cyan
        Write-Host "  Add these CNAME records to your DNS:" -ForegroundColor White
        Write-Host ""
        foreach ($token in $DkimTokens) {
            Write-Host "    Name:  $token._domainkey.$Domain" -ForegroundColor Gray
            Write-Host "    Value: $token.dkim.amazonses.com" -ForegroundColor Gray
            Write-Host ""
        }
    }
} catch {
    Write-Host "  Error setting up domain: $_" -ForegroundColor Red
}

# Step 3: Verify email identity (for sandbox mode)
Write-Host ""
Write-Host "Step 3: Setting up email identity ($FromEmail)..." -ForegroundColor Yellow

try {
    $Identities = aws sesv2 list-email-identities --region $AwsRegion --output json | ConvertFrom-Json
    $ExistingEmail = $Identities.EmailIdentities | Where-Object { $_.IdentityName -eq $FromEmail }

    if ($ExistingEmail) {
        Write-Host "  Email '$FromEmail' already exists in SES" -ForegroundColor Yellow

        $EmailDetails = aws sesv2 get-email-identity --email-identity $FromEmail --region $AwsRegion --output json | ConvertFrom-Json

        if ($EmailDetails.VerifiedForSendingStatus) {
            Write-Host "  Email verification: VERIFIED" -ForegroundColor Green
        } else {
            Write-Host "  Email verification: PENDING" -ForegroundColor Yellow
            Write-Host "  Check inbox for verification email from AWS" -ForegroundColor Yellow
        }
    } else {
        # Create email identity (sends verification email)
        Write-Host "  Creating email identity..." -ForegroundColor Gray
        aws sesv2 create-email-identity --email-identity $FromEmail --region $AwsRegion 2>&1 | Out-Null
        Write-Host "  Verification email sent to: $FromEmail" -ForegroundColor Green
        Write-Host "  Please check inbox and click the verification link" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  Error setting up email: $_" -ForegroundColor Red
}

# Step 4: Show sandbox testing instructions
if ($InSandbox) {
    Write-Host ""
    Write-Host "Step 4: Sandbox Mode Testing..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Since you're in sandbox mode, you need to verify recipient emails too." -ForegroundColor Yellow
    Write-Host "  To verify a test recipient email, run:" -ForegroundColor White
    Write-Host ""
    Write-Host "    aws sesv2 create-email-identity --email-identity ""test@example.com"" --region $AwsRegion" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  To request production access:" -ForegroundColor White
    Write-Host "  1. Go to AWS Console -> SES -> Account dashboard" -ForegroundColor Gray
    Write-Host "  2. Click 'Request production access'" -ForegroundColor Gray
    Write-Host "  3. Fill out the form explaining your use case" -ForegroundColor Gray
    Write-Host ""
}

# Step 5: Test sending (optional)
Write-Host ""
Write-Host "Step 5: Test Email Configuration" -ForegroundColor Yellow
Write-Host ""
Write-Host "  To send a test email, run:" -ForegroundColor White
Write-Host ""
Write-Host "    aws sesv2 send-email \" -ForegroundColor Gray
Write-Host "      --from-email-address `"$FromEmail`" \" -ForegroundColor Gray
Write-Host "      --destination `"ToAddresses=your-verified-email@example.com`" \" -ForegroundColor Gray
Write-Host "      --content `"Simple={Subject={Data='Test Email'},Body={Text={Data='Hello from DDO!'}}}`" \" -ForegroundColor Gray
Write-Host "      --region $AwsRegion" -ForegroundColor Gray
Write-Host ""

# Summary
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Domain: $Domain"
if ($DomainVerified) {
    Write-Host "  Status: Verified" -ForegroundColor Green
} else {
    Write-Host "  Status: Pending - Add DKIM records to DNS" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "From Email: $FromEmail"
Write-Host "  Status: Check verification in AWS Console" -ForegroundColor Yellow
Write-Host ""
Write-Host "Sandbox Mode: $(if ($InSandbox) { 'YES' } else { 'NO' })"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "  1. Add DKIM CNAME records to your DNS (if not done)" -ForegroundColor Gray
Write-Host "  2. Verify the email address by clicking the link in AWS email" -ForegroundColor Gray
Write-Host "  3. If in sandbox, verify recipient emails for testing" -ForegroundColor Gray
Write-Host "  4. Request production access when ready for launch" -ForegroundColor Gray
Write-Host ""
Write-Host "Useful Commands:" -ForegroundColor White
Write-Host ""
Write-Host "  # Check identity status" -ForegroundColor Gray
Write-Host "  aws sesv2 get-email-identity --email-identity $Domain --region $AwsRegion"
Write-Host ""
Write-Host "  # List all identities" -ForegroundColor Gray
Write-Host "  aws sesv2 list-email-identities --region $AwsRegion"
Write-Host ""
Write-Host "  # Check sending quota" -ForegroundColor Gray
Write-Host "  aws sesv2 get-account --region $AwsRegion"
Write-Host ""
