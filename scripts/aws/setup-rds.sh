#!/bin/bash

# DDO RDS Setup Script (Bash)
# Creates an RDS PostgreSQL instance with multi-environment schema support
#
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Sufficient IAM permissions for RDS
#
# Usage:
#   chmod +x scripts/aws/setup-rds.sh
#   ./scripts/aws/setup-rds.sh
#
# Or with custom values:
#   RDS_DB_IDENTIFIER="my-db" RDS_DB_NAME="myapp" ./scripts/aws/setup-rds.sh

set -e

# Configuration
DB_IDENTIFIER="${RDS_DB_IDENTIFIER:-ddo-postgres}"
DB_NAME="${RDS_DB_NAME:-ddo}"
DB_USERNAME="${RDS_DB_USERNAME:-ddo_admin}"
DB_PASSWORD="${RDS_DB_PASSWORD}"
AWS_REGION="${AWS_REGION:-us-east-1}"
DB_INSTANCE_CLASS="${RDS_INSTANCE_CLASS:-db.t3.micro}"
ALLOCATED_STORAGE="${RDS_ALLOCATED_STORAGE:-20}"

# Generate password if not provided
if [ -z "$DB_PASSWORD" ]; then
    DB_PASSWORD=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9!@#$%^&*' | head -c 24)
fi

echo "============================================"
echo "  Digital DevOps - RDS Setup Script"
echo "============================================"
echo ""
echo "Configuration:"
echo "  DB Identifier:  $DB_IDENTIFIER"
echo "  Database Name:  $DB_NAME"
echo "  Username:       $DB_USERNAME"
echo "  Instance Class: $DB_INSTANCE_CLASS"
echo "  Storage:        ${ALLOCATED_STORAGE}GB"
echo "  AWS Region:     $AWS_REGION"
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

# Step 1: Check if RDS instance already exists
echo "Step 1: Checking for existing RDS instance..."

DB_ENDPOINT=""
DB_PORT=""

if EXISTING_INSTANCE=$(aws rds describe-db-instances --db-instance-identifier "$DB_IDENTIFIER" --region "$AWS_REGION" --output json 2>/dev/null); then
    STATUS=$(echo "$EXISTING_INSTANCE" | grep -o '"DBInstanceStatus": "[^"]*"' | cut -d'"' -f4)
    ENDPOINT=$(echo "$EXISTING_INSTANCE" | grep -o '"Address": "[^"]*"' | head -1 | cut -d'"' -f4)
    PORT=$(echo "$EXISTING_INSTANCE" | grep -o '"Port": [0-9]*' | head -1 | grep -o '[0-9]*')

    echo "  RDS instance '$DB_IDENTIFIER' already exists"
    echo "  Status: $STATUS"
    echo "  Endpoint: $ENDPOINT:$PORT"

    DB_ENDPOINT="$ENDPOINT"
    DB_PORT="$PORT"
else
    # Step 2: Create security group for RDS
    echo ""
    echo "Step 2: Setting up security group..."

    SG_NAME="$DB_IDENTIFIER-sg"
    SG_ID=""

    # Get default VPC
    VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --region "$AWS_REGION" --query 'Vpcs[0].VpcId' --output text 2>/dev/null)
    if [ -n "$VPC_ID" ] && [ "$VPC_ID" != "None" ]; then
        echo "  Using default VPC: $VPC_ID"
    fi

    # Check if security group exists
    EXISTING_SG=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=$SG_NAME" --region "$AWS_REGION" --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null)

    if [ -n "$EXISTING_SG" ] && [ "$EXISTING_SG" != "None" ]; then
        SG_ID="$EXISTING_SG"
        echo "  Security group already exists: $SG_ID"
    else
        # Create security group
        SG_ID=$(aws ec2 create-security-group \
            --group-name "$SG_NAME" \
            --description "Security group for DDO RDS PostgreSQL" \
            --vpc-id "$VPC_ID" \
            --region "$AWS_REGION" \
            --query 'GroupId' \
            --output text 2>/dev/null) || true

        if [ -n "$SG_ID" ]; then
            echo "  Created security group: $SG_ID"

            # Add inbound rule for PostgreSQL
            aws ec2 authorize-security-group-ingress \
                --group-id "$SG_ID" \
                --protocol tcp \
                --port 5432 \
                --cidr "0.0.0.0/0" \
                --region "$AWS_REGION" 2>/dev/null || true
            echo "  Added inbound rule for PostgreSQL (port 5432)"
        fi
    fi

    # Step 3: Create RDS instance
    echo ""
    echo "Step 3: Creating RDS PostgreSQL instance..."
    echo "  This may take 5-10 minutes..."

    CREATE_PARAMS=(
        --db-instance-identifier "$DB_IDENTIFIER"
        --db-instance-class "$DB_INSTANCE_CLASS"
        --engine postgres
        --engine-version "15"
        --master-username "$DB_USERNAME"
        --master-user-password "$DB_PASSWORD"
        --allocated-storage "$ALLOCATED_STORAGE"
        --db-name "$DB_NAME"
        --publicly-accessible
        --backup-retention-period 7
        --storage-type gp2
        --region "$AWS_REGION"
    )

    if [ -n "$SG_ID" ]; then
        CREATE_PARAMS+=(--vpc-security-group-ids "$SG_ID")
    fi

    if aws rds create-db-instance "${CREATE_PARAMS[@]}" > /dev/null 2>&1; then
        echo "  RDS instance creation initiated"
    else
        echo "  ERROR creating RDS instance"
        exit 1
    fi

    # Wait for instance to be available
    echo ""
    echo "Step 4: Waiting for RDS instance to be available..."
    echo "  (This typically takes 5-10 minutes)"

    MAX_ATTEMPTS=60
    ATTEMPT=0

    while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
        sleep 30
        ATTEMPT=$((ATTEMPT + 1))

        if STATUS_JSON=$(aws rds describe-db-instances --db-instance-identifier "$DB_IDENTIFIER" --region "$AWS_REGION" --output json 2>/dev/null); then
            CURRENT_STATUS=$(echo "$STATUS_JSON" | grep -o '"DBInstanceStatus": "[^"]*"' | cut -d'"' -f4)
            echo "  Attempt $ATTEMPT/$MAX_ATTEMPTS - Status: $CURRENT_STATUS"

            if [ "$CURRENT_STATUS" = "available" ]; then
                DB_ENDPOINT=$(echo "$STATUS_JSON" | grep -o '"Address": "[^"]*"' | head -1 | cut -d'"' -f4)
                DB_PORT=$(echo "$STATUS_JSON" | grep -o '"Port": [0-9]*' | head -1 | grep -o '[0-9]*')
                echo "  RDS instance is now available!"
                break
            fi
        else
            echo "  Waiting..."
        fi
    done

    if [ -z "$DB_ENDPOINT" ]; then
        echo "  Timeout waiting for RDS instance. Check AWS Console for status."
        echo "  You can run this script again once the instance is available."
        exit 1
    fi
fi

# Step 5: Create schemas for each environment
echo ""
echo "Step 5: Environment Schema Setup"
echo ""
echo "  Your RDS instance uses PostgreSQL schemas to separate environments:"
echo "    - local_ddo  : Local development"
echo "    - dev_ddo    : Development/staging"
echo "    - prod_ddo   : Production"
echo ""
echo "  Prisma will create schemas automatically when you run migrations."
echo ""

# Step 6: Generate connection strings
echo "Step 6: Generating connection strings..."

LOCAL_SCHEMA="local_ddo"
DEV_SCHEMA="dev_ddo"
PROD_SCHEMA="prod_ddo"

# URL encode password for connection string
ENCODED_PASSWORD=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$DB_PASSWORD'))" 2>/dev/null || echo "$DB_PASSWORD")

LOCAL_URL="postgresql://${DB_USERNAME}:${ENCODED_PASSWORD}@${DB_ENDPOINT}:${DB_PORT}/${DB_NAME}?schema=${LOCAL_SCHEMA}"
DEV_URL="postgresql://${DB_USERNAME}:${ENCODED_PASSWORD}@${DB_ENDPOINT}:${DB_PORT}/${DB_NAME}?schema=${DEV_SCHEMA}"
PROD_URL="postgresql://${DB_USERNAME}:${ENCODED_PASSWORD}@${DB_ENDPOINT}:${DB_PORT}/${DB_NAME}?schema=${PROD_SCHEMA}"

# Save to .env.rds file
ENV_FILE=".env.rds"
cat > "$ENV_FILE" <<EOF
# ==============================================
# AWS RDS PostgreSQL Configuration
# Generated by setup-rds.sh on $(date)
# ==============================================

# RDS Instance Details
RDS_DB_IDENTIFIER=$DB_IDENTIFIER
RDS_ENDPOINT=$DB_ENDPOINT
RDS_PORT=$DB_PORT
RDS_DATABASE=$DB_NAME
RDS_USERNAME=$DB_USERNAME
RDS_PASSWORD=$DB_PASSWORD

# ==============================================
# DATABASE_URL for each environment
# Copy the appropriate one to your .env file
# ==============================================

# Local Development
DATABASE_URL="$LOCAL_URL"

# Development/Staging
# DATABASE_URL="$DEV_URL"

# Production
# DATABASE_URL="$PROD_URL"

# ==============================================
# INSTRUCTIONS:
# 1. Copy DATABASE_URL to your .env file
# 2. Run: npx prisma migrate dev
# 3. IMPORTANT: Keep these credentials secure!
# 4. Never commit this file to version control
# ==============================================
EOF

echo "  Configuration saved to: $ENV_FILE"

# Summary
echo ""
echo "============================================"
echo "  Setup Complete!"
echo "============================================"
echo ""
echo "RDS Instance Details:"
echo "  Identifier: $DB_IDENTIFIER"
echo "  Endpoint:   $DB_ENDPOINT"
echo "  Port:       $DB_PORT"
echo "  Database:   $DB_NAME"
echo "  Username:   $DB_USERNAME"
echo ""
echo "Environment Schemas:"
echo "  Local:      $LOCAL_SCHEMA"
echo "  Dev:        $DEV_SCHEMA"
echo "  Production: $PROD_SCHEMA"
echo ""
echo "Next Steps:"
echo "  1. Copy DATABASE_URL from .env.rds to your .env file"
echo "  2. Run: npx prisma migrate dev --name init"
echo "  3. Delete .env.rds after copying (for security)"
echo ""
echo "Security Reminder:"
echo "  - Never commit database credentials to git"
echo "  - .env.rds should be in .gitignore"
echo "  - Consider using AWS Secrets Manager for production"
echo ""

# Verify .gitignore includes .env files
if [ -f ".gitignore" ]; then
    if ! grep -q "\.env\.rds" .gitignore; then
        echo "NOTE: Consider adding .env.rds to .gitignore"
    fi
fi
