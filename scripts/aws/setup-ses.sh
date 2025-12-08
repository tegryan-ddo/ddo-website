#!/bin/bash

# DDO SES Setup Script (Bash)
# Configures AWS SES for sending emails from the DDO application
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Domain DNS access (for domain verification)
#
# Usage:
#   chmod +x scripts/aws/setup-ses.sh
#   ./scripts/aws/setup-ses.sh
#
# Or with custom values:
#   SES_DOMAIN="mydomain.com" SES_FROM_EMAIL="noreply@mydomain.com" ./scripts/aws/setup-ses.sh

set -e

# Configuration
DOMAIN="${SES_DOMAIN:-digitaldevops.io}"
FROM_EMAIL="${SES_FROM_EMAIL:-noreply@digitaldevops.io}"
AWS_REGION="${AWS_REGION:-us-east-1}"

echo "============================================"
echo "  Digital DevOps - SES Setup Script"
echo "============================================"
echo ""
echo "Configuration:"
echo "  Domain:     $DOMAIN"
echo "  From Email: $FROM_EMAIL"
echo "  AWS Region: $AWS_REGION"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "ERROR: AWS CLI is not installed. Please install it first."
    echo "  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check AWS credentials
echo "Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "ERROR: AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "  AWS Account: $ACCOUNT_ID"
echo ""

# Step 1: Check SES account status
echo "Step 1: Checking SES account status..."

IN_SANDBOX=true
if ACCOUNT_DETAILS=$(aws sesv2 get-account --region "$AWS_REGION" --output json 2>/dev/null); then
    PRODUCTION_ACCESS=$(echo "$ACCOUNT_DETAILS" | grep -o '"ProductionAccessEnabled": [^,]*' | cut -d' ' -f2)
    SENDING_ENABLED=$(echo "$ACCOUNT_DETAILS" | grep -o '"SendingEnabled": [^,]*' | cut -d' ' -f2)

    if [ "$PRODUCTION_ACCESS" = "true" ]; then
        echo "  Production access: ENABLED"
        IN_SANDBOX=false
    else
        echo "  Production access: DISABLED (Sandbox mode)"
        echo "  Note: In sandbox mode, you can only send to verified emails"
    fi

    if [ "$SENDING_ENABLED" = "true" ]; then
        echo "  Sending enabled: YES"
    else
        echo "  Sending enabled: NO"
    fi
else
    echo "  Could not get account details"
fi

# Step 2: Verify domain identity
echo ""
echo "Step 2: Setting up domain identity ($DOMAIN)..."

DOMAIN_VERIFIED=false

# Check if domain exists
EXISTING_DOMAIN=$(aws sesv2 list-email-identities --region "$AWS_REGION" --query "EmailIdentities[?IdentityName=='$DOMAIN'].IdentityName" --output text 2>/dev/null)

if [ -n "$EXISTING_DOMAIN" ]; then
    echo "  Domain '$DOMAIN' already exists in SES"

    # Get verification status
    DOMAIN_DETAILS=$(aws sesv2 get-email-identity --email-identity "$DOMAIN" --region "$AWS_REGION" --output json 2>/dev/null)
    VERIFIED=$(echo "$DOMAIN_DETAILS" | grep -o '"VerifiedForSendingStatus": [^,]*' | cut -d' ' -f2)

    if [ "$VERIFIED" = "true" ]; then
        echo "  Domain verification: VERIFIED"
        DOMAIN_VERIFIED=true
    else
        echo "  Domain verification: PENDING"
    fi
else
    # Create domain identity
    echo "  Creating domain identity..."
    aws sesv2 create-email-identity --email-identity "$DOMAIN" --region "$AWS_REGION" 2>/dev/null || true
    echo "  Domain identity created"
fi

# Get DKIM tokens
DOMAIN_DETAILS=$(aws sesv2 get-email-identity --email-identity "$DOMAIN" --region "$AWS_REGION" --output json 2>/dev/null)
DKIM_TOKENS=$(echo "$DOMAIN_DETAILS" | grep -o '"Tokens": \[[^]]*\]' | grep -o '"[a-z0-9]*"' | tr -d '"')

if [ -n "$DKIM_TOKENS" ]; then
    echo ""
    echo "  DNS Records Required for DKIM:"
    echo "  Add these CNAME records to your DNS:"
    echo ""
    for token in $DKIM_TOKENS; do
        echo "    Name:  ${token}._domainkey.${DOMAIN}"
        echo "    Value: ${token}.dkim.amazonses.com"
        echo ""
    done
fi

# Step 3: Verify email identity (for sandbox mode)
echo ""
echo "Step 3: Setting up email identity ($FROM_EMAIL)..."

EXISTING_EMAIL=$(aws sesv2 list-email-identities --region "$AWS_REGION" --query "EmailIdentities[?IdentityName=='$FROM_EMAIL'].IdentityName" --output text 2>/dev/null)

if [ -n "$EXISTING_EMAIL" ]; then
    echo "  Email '$FROM_EMAIL' already exists in SES"

    EMAIL_DETAILS=$(aws sesv2 get-email-identity --email-identity "$FROM_EMAIL" --region "$AWS_REGION" --output json 2>/dev/null)
    EMAIL_VERIFIED=$(echo "$EMAIL_DETAILS" | grep -o '"VerifiedForSendingStatus": [^,]*' | cut -d' ' -f2)

    if [ "$EMAIL_VERIFIED" = "true" ]; then
        echo "  Email verification: VERIFIED"
    else
        echo "  Email verification: PENDING"
        echo "  Check inbox for verification email from AWS"
    fi
else
    # Create email identity
    echo "  Creating email identity..."
    aws sesv2 create-email-identity --email-identity "$FROM_EMAIL" --region "$AWS_REGION" 2>/dev/null || true
    echo "  Verification email sent to: $FROM_EMAIL"
    echo "  Please check inbox and click the verification link"
fi

# Step 4: Show sandbox testing instructions
if [ "$IN_SANDBOX" = true ]; then
    echo ""
    echo "Step 4: Sandbox Mode Testing..."
    echo ""
    echo "  Since you're in sandbox mode, you need to verify recipient emails too."
    echo "  To verify a test recipient email, run:"
    echo ""
    echo "    aws sesv2 create-email-identity --email-identity \"test@example.com\" --region $AWS_REGION"
    echo ""
    echo "  To request production access:"
    echo "  1. Go to AWS Console -> SES -> Account dashboard"
    echo "  2. Click 'Request production access'"
    echo "  3. Fill out the form explaining your use case"
    echo ""
fi

# Step 5: Test sending (optional)
echo ""
echo "Step 5: Test Email Configuration"
echo ""
echo "  To send a test email, run:"
echo ""
echo "    aws sesv2 send-email \\"
echo "      --from-email-address \"$FROM_EMAIL\" \\"
echo "      --destination \"ToAddresses=your-verified-email@example.com\" \\"
echo "      --content \"Simple={Subject={Data='Test Email'},Body={Text={Data='Hello from DDO!'}}}\" \\"
echo "      --region $AWS_REGION"
echo ""

# Summary
echo "============================================"
echo "  Setup Summary"
echo "============================================"
echo ""
echo "Domain: $DOMAIN"
if [ "$DOMAIN_VERIFIED" = true ]; then
    echo "  Status: Verified"
else
    echo "  Status: Pending - Add DKIM records to DNS"
fi
echo ""
echo "From Email: $FROM_EMAIL"
echo "  Status: Check verification in AWS Console"
echo ""
echo "Sandbox Mode: $([ "$IN_SANDBOX" = true ] && echo 'YES' || echo 'NO')"
echo ""
echo "Next Steps:"
echo "  1. Add DKIM CNAME records to your DNS (if not done)"
echo "  2. Verify the email address by clicking the link in AWS email"
echo "  3. If in sandbox, verify recipient emails for testing"
echo "  4. Request production access when ready for launch"
echo ""
echo "Useful Commands:"
echo ""
echo "  # Check identity status"
echo "  aws sesv2 get-email-identity --email-identity $DOMAIN --region $AWS_REGION"
echo ""
echo "  # List all identities"
echo "  aws sesv2 list-email-identities --region $AWS_REGION"
echo ""
echo "  # Check sending quota"
echo "  aws sesv2 get-account --region $AWS_REGION"
echo ""
