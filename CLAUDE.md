# Digital DevOps Website

## Project Overview

This is the corporate website for **Digital DevOps, Inc.** (DDO), an AI enablement consultancy based in Ucluelet, BC, Canada. The company is pivoting from DevOps consulting to AI enablement, leveraging deep expertise in DevOps, infrastructure, and security.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript + JavaScript (migration in progress)
- **Styling**: Bootstrap 3 + custom CSS (legacy, to be replaced with Tailwind)
- **Authentication**: AWS Cognito via AWS Amplify
- **Database**: PostgreSQL (AWS RDS) via Prisma ORM
- **Email**: AWS SES
- **Hosting**: AWS Amplify (planned)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with AmplifyProvider
│   ├── page.js              # Home page
│   ├── globals.css          # Global styles
│   ├── api/
│   │   └── invites/         # Invite system API routes
│   │       ├── route.ts     # GET (list) / POST (create)
│   │       ├── [id]/route.ts # GET/DELETE/PATCH individual invites
│   │       └── verify/route.ts # Verify invite tokens
│   ├── auth/
│   │   └── accept-invite/page.tsx  # Accept invite flow
│   ├── planning/
│   │   ├── page.tsx         # Protected planning dashboard
│   │   └── users/page.tsx   # User management & invites
│   ├── about/page.js
│   ├── apply/page.js
│   ├── clients/page.js
│   ├── contact/page.js
│   ├── hire-us/page.js
│   └── services/page.js
├── components/
│   ├── AmplifyProvider.tsx  # AWS Amplify configuration
│   ├── Header.js
│   ├── Footer.js
│   └── ... (other components)
├── lib/
│   ├── prisma.ts            # Prisma client singleton
│   ├── auth.ts              # Amplify auth helpers
│   ├── AuthContext.tsx      # React auth context
│   └── email.ts             # AWS SES email sending
prisma/
└── schema.prisma            # Database schema (Invite, UserProfile)
```

## Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint

# Prisma
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema to database
npx prisma studio     # Open Prisma Studio
```

## Environment Variables

Required in `.env`:
```
# Database
DATABASE_URL="postgresql://..."

# AWS Cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID=""
NEXT_PUBLIC_COGNITO_CLIENT_ID=""
NEXT_PUBLIC_COGNITO_DOMAIN=""

# AWS General
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""

# AWS SES
SES_FROM_EMAIL="noreply@digitaldevops.io"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Authentication System

### Overview
- **Provider**: AWS Cognito (managed via AWS Amplify SDK)
- **Sign-up**: Invite-only (no public registration)
- **Sign-in**: Email/password (Cognito hosted UI or custom)
- **OAuth**: Configurable (Google, Facebook) via Cognito

### Invite Flow
1. Authenticated user creates invite via `/planning/users`
2. API creates user in Cognito (FORCE_CHANGE_PASSWORD state)
3. SES sends custom invite email with link
4. Recipient clicks link → `/auth/accept-invite?token=xxx`
5. User sets password, invite marked as ACCEPTED
6. UserProfile created in database

### Protected Routes
- `/planning` - requires authentication
- `/planning/users` - user management (invite/revoke)

## Database Schema

### Invite
Tracks user invitations:
- `email`, `token`, `role`, `status`
- `invitedById`, `invitedByEmail`, `invitedByName`
- `acceptedById`, `expiresAt`

### UserProfile
Extended user data (Cognito handles auth):
- `id` (Cognito sub)
- `email`, `role`, `displayName`, `avatarUrl`, `bio`

## Related Documents

- [STRATEGY.md](STRATEGY.md) - Business strategy for AI enablement pivot
- [PLAN.md](PLAN.md) - Website implementation plan (6 phases)

## Git Branches

- `main` - default remote branch
- `master` - current working branch

## AWS Setup Requirements

1. **Cognito User Pool** - Create with email sign-in
2. **RDS PostgreSQL** - Create database instance
3. **SES** - Verify sending domain/email
4. **IAM** - Create user with Cognito admin + SES permissions
