#!/bin/bash

# DDO Cognito Setup Script
# This script creates and configures AWS Cognito User Pool for Digital DevOps
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Appropriate IAM permissions for Cognito and SES
#
# Usage:
#   chmod +x scripts/setup-cognito.sh
#   ./scripts/setup-cognito.sh
#
# Or with custom values:
#   AWS_REGION=us-west-2 APP_DOMAIN=https://digitaldevops.io ./scripts/setup-cognito.sh

set -e

# Configuration - customize these or set as environment variables
AWS_REGION="${AWS_REGION:-us-east-1}"
USER_POOL_NAME="${USER_POOL_NAME:-ddo-user-pool}"
APP_CLIENT_NAME="${APP_CLIENT_NAME:-ddo-web-client}"
APP_DOMAIN="${APP_DOMAIN:-http://localhost:3000}"
SES_EMAIL="${SES_EMAIL:-noreply@digitaldevops.io}"
COGNITO_DOMAIN_PREFIX="${COGNITO_DOMAIN_PREFIX:-ddo-auth}"

echo "============================================"
echo "  Digital DevOps - Cognito Setup Script"
echo "============================================"
echo ""
echo "Configuration:"
echo "  AWS Region:     $AWS_REGION"
echo "  User Pool Name: $USER_POOL_NAME"
echo "  App Domain:     $APP_DOMAIN"
echo "  SES Email:      $SES_EMAIL"
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

# Step 1: Create User Pool
echo "Step 1: Creating Cognito User Pool..."

USER_POOL_ID=$(aws cognito-idp create-user-pool \
    --pool-name "$USER_POOL_NAME" \
    --region "$AWS_REGION" \
    --policies '{
        "PasswordPolicy": {
            "MinimumLength": 12,
            "RequireUppercase": true,
            "RequireLowercase": true,
            "RequireNumbers": true,
            "RequireSymbols": true,
            "TemporaryPasswordValidityDays": 7
        }
    }' \
    --auto-verified-attributes email \
    --username-attributes email \
    --username-configuration '{"CaseSensitive": false}' \
    --mfa-configuration OFF \
    --email-configuration '{
        "EmailSendingAccount": "COGNITO_DEFAULT"
    }' \
    --admin-create-user-config '{
        "AllowAdminCreateUserOnly": true,
        "InviteMessageTemplate": {
            "EmailSubject": "Welcome to Digital DevOps - Your Account",
            "EmailMessage": "Hello,\n\nYou have been invited to Digital DevOps.\n\nYour temporary credentials are:\nEmail: {username}\nTemporary Password: {####}\n\nPlease sign in at: '"$APP_DOMAIN"'/login\n\nYou will be required to change your password on first login.\n\nBest regards,\nDigital DevOps Team"
        }
    }' \
    --schema '[
        {
            "Name": "email",
            "AttributeDataType": "String",
            "Required": true,
            "Mutable": true
        },
        {
            "Name": "name",
            "AttributeDataType": "String",
            "Required": false,
            "Mutable": true
        }
    ]' \
    --account-recovery-setting '{
        "RecoveryMechanisms": [
            {"Priority": 1, "Name": "verified_email"}
        ]
    }' \
    --query 'UserPool.Id' \
    --output text)

echo "  User Pool ID: $USER_POOL_ID"

# Step 2: Create App Client
echo ""
echo "Step 2: Creating App Client..."

CLIENT_RESULT=$(aws cognito-idp create-user-pool-client \
    --user-pool-id "$USER_POOL_ID" \
    --client-name "$APP_CLIENT_NAME" \
    --region "$AWS_REGION" \
    --generate-secret \
    --explicit-auth-flows \
        "ALLOW_USER_PASSWORD_AUTH" \
        "ALLOW_REFRESH_TOKEN_AUTH" \
        "ALLOW_USER_SRP_AUTH" \
    --supported-identity-providers "COGNITO" \
    --callback-urls "$APP_DOMAIN/api/auth/callback/cognito" \
    --logout-urls "$APP_DOMAIN" \
    --allowed-o-auth-flows "code" \
    --allowed-o-auth-scopes "openid" "email" "profile" \
    --allowed-o-auth-flows-user-pool-client \
    --prevent-user-existence-errors "ENABLED" \
    --access-token-validity 1 \
    --id-token-validity 1 \
    --refresh-token-validity 30 \
    --token-validity-units '{
        "AccessToken": "hours",
        "IdToken": "hours",
        "RefreshToken": "days"
    }' \
    --query 'UserPoolClient.[ClientId, ClientSecret]' \
    --output text)

CLIENT_ID=$(echo "$CLIENT_RESULT" | awk '{print $1}')
CLIENT_SECRET=$(echo "$CLIENT_RESULT" | awk '{print $2}')

echo "  Client ID: $CLIENT_ID"
echo "  Client Secret: [HIDDEN - see .env file]"

# Step 3: Create Cognito Domain
echo ""
echo "Step 3: Creating Cognito Domain..."

# Check if domain already exists
if aws cognito-idp describe-user-pool-domain \
    --domain "$COGNITO_DOMAIN_PREFIX" \
    --region "$AWS_REGION" &> /dev/null; then
    echo "  Domain '$COGNITO_DOMAIN_PREFIX' already exists, skipping..."
else
    aws cognito-idp create-user-pool-domain \
        --domain "$COGNITO_DOMAIN_PREFIX" \
        --user-pool-id "$USER_POOL_ID" \
        --region "$AWS_REGION"
    echo "  Domain created: $COGNITO_DOMAIN_PREFIX"
fi

COGNITO_DOMAIN="https://$COGNITO_DOMAIN_PREFIX.auth.$AWS_REGION.amazoncognito.com"
echo "  Cognito Domain: $COGNITO_DOMAIN"

# Step 4: Create IAM Policy for the application
echo ""
echo "Step 4: Creating IAM Policy..."

POLICY_NAME="ddo-cognito-policy"
POLICY_DOCUMENT=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "CognitoAdminAccess",
            "Effect": "Allow",
            "Action": [
                "cognito-idp:AdminCreateUser",
                "cognito-idp:AdminDeleteUser",
                "cognito-idp:AdminGetUser",
                "cognito-idp:AdminSetUserPassword",
                "cognito-idp:AdminUpdateUserAttributes",
                "cognito-idp:AdminDisableUser",
                "cognito-idp:AdminEnableUser",
                "cognito-idp:ListUsers"
            ],
            "Resource": "arn:aws:cognito-idp:$AWS_REGION:$ACCOUNT_ID:userpool/$USER_POOL_ID"
        },
        {
            "Sid": "SESAccess",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
EOF
)

# Check if policy exists
EXISTING_POLICY=$(aws iam list-policies --query "Policies[?PolicyName=='$POLICY_NAME'].Arn" --output text 2>/dev/null)

if [ -n "$EXISTING_POLICY" ]; then
    echo "  Policy '$POLICY_NAME' already exists: $EXISTING_POLICY"
    POLICY_ARN="$EXISTING_POLICY"
else
    POLICY_ARN=$(aws iam create-policy \
        --policy-name "$POLICY_NAME" \
        --policy-document "$POLICY_DOCUMENT" \
        --description "IAM policy for DDO Cognito and SES access" \
        --query 'Policy.Arn' \
        --output text)
    echo "  Policy ARN: $POLICY_ARN"
fi

# Step 5: Generate .env values
echo ""
echo "Step 5: Generating environment configuration..."

NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
COGNITO_ISSUER="https://cognito-idp.$AWS_REGION.amazonaws.com/$USER_POOL_ID"

# Create .env.cognito file
ENV_FILE=".env.cognito"
cat > "$ENV_FILE" <<EOF
# ==============================================
# AWS Cognito Configuration
# Generated by setup-cognito.sh on $(date)
# ==============================================

# Cognito User Pool
COGNITO_USER_POOL_ID=$USER_POOL_ID
COGNITO_CLIENT_ID=$CLIENT_ID
COGNITO_CLIENT_SECRET=$CLIENT_SECRET
COGNITO_ISSUER=$COGNITO_ISSUER
COGNITO_DOMAIN=$COGNITO_DOMAIN

# AWS Region
AWS_REGION=$AWS_REGION

# AWS Credentials (replace with your actual credentials)
# IMPORTANT: Use IAM user/role with the policy: $POLICY_ARN
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here

# SES Configuration
SES_FROM_EMAIL=$SES_EMAIL

# NextAuth.js
NEXTAUTH_URL=$APP_DOMAIN
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# ==============================================
# INSTRUCTIONS:
# 1. Copy these values to your .env file
# 2. Replace AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
#    with credentials from an IAM user attached to:
#    $POLICY_ARN
# 3. Verify your SES_FROM_EMAIL in AWS SES
# ==============================================
EOF

echo "  Environment file created: $ENV_FILE"

# Step 6: Summary
echo ""
echo "============================================"
echo "  Setup Complete!"
echo "============================================"
echo ""
echo "Resources Created:"
echo "  - User Pool:   $USER_POOL_ID"
echo "  - App Client:  $CLIENT_ID"
echo "  - Domain:      $COGNITO_DOMAIN"
echo "  - IAM Policy:  $POLICY_ARN"
echo ""
echo "Next Steps:"
echo "  1. Copy values from .env.cognito to your .env file"
echo "  2. Create an IAM user and attach the policy: $POLICY_NAME"
echo "  3. Add the IAM user's credentials to .env"
echo "  4. Verify your email domain in AWS SES"
echo "  5. Run: npx prisma migrate dev"
echo "  6. Restart your dev server"
echo ""
echo "Useful Commands:"
echo "  # Create a test user"
echo "  aws cognito-idp admin-create-user \\"
echo "    --user-pool-id $USER_POOL_ID \\"
echo "    --username test@example.com \\"
echo "    --user-attributes Name=email,Value=test@example.com \\"
echo "    --region $AWS_REGION"
echo ""
echo "  # List users"
echo "  aws cognito-idp list-users \\"
echo "    --user-pool-id $USER_POOL_ID \\"
echo "    --region $AWS_REGION"
echo ""
echo "  # Delete this user pool (if needed)"
echo "  aws cognito-idp delete-user-pool-domain --domain $COGNITO_DOMAIN_PREFIX --user-pool-id $USER_POOL_ID --region $AWS_REGION"
echo "  aws cognito-idp delete-user-pool --user-pool-id $USER_POOL_ID --region $AWS_REGION"
echo ""
