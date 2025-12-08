import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail, getInviteEmailHtml } from '@/lib/email'
import {
  AdminCreateUserCommand,
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider'

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

// GET /api/invites - List all invites (for authenticated users)
export async function GET(request: NextRequest) {
  try {
    // TODO: Verify user is authenticated via Cognito token
    // For now, we'll add this check once middleware is set up

    const invites = await prisma.invite.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ invites })
  } catch (error) {
    console.error('Error fetching invites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invites' },
      { status: 500 }
    )
  }
}

// POST /api/invites - Create a new invite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, role = 'MEMBER', message, invitedBy } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!invitedBy?.id || !invitedBy?.email) {
      return NextResponse.json(
        { error: 'Inviter information is required' },
        { status: 400 }
      )
    }

    // Check if there's already a pending invite for this email
    const existingInvite = await prisma.invite.findFirst({
      where: {
        email: email.toLowerCase(),
        status: 'PENDING',
        expiresAt: { gt: new Date() },
      },
    })

    if (existingInvite) {
      return NextResponse.json(
        { error: 'An active invite already exists for this email' },
        { status: 409 }
      )
    }

    // Check if user already exists in Cognito
    try {
      await cognitoClient.send(
        new AdminGetUserCommand({
          UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
          Username: email.toLowerCase(),
        })
      )
      // User already exists
      return NextResponse.json(
        { error: 'User already has an account' },
        { status: 409 }
      )
    } catch (error: unknown) {
      // User doesn't exist, which is what we want
      const cognitoError = error as { name?: string }
      if (cognitoError.name !== 'UserNotFoundException') {
        throw error
      }
    }

    // Create the invite
    const invite = await prisma.invite.create({
      data: {
        email: email.toLowerCase(),
        role,
        message,
        invitedById: invitedBy.id,
        invitedByEmail: invitedBy.email,
        invitedByName: invitedBy.name,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    // Create user in Cognito with FORCE_CHANGE_PASSWORD status
    // This sends them an email with a temporary password
    try {
      await cognitoClient.send(
        new AdminCreateUserCommand({
          UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
          Username: email.toLowerCase(),
          UserAttributes: [
            { Name: 'email', Value: email.toLowerCase() },
            { Name: 'email_verified', Value: 'true' },
          ],
          DesiredDeliveryMediums: ['EMAIL'],
          // Cognito will send temp password email automatically
        })
      )
    } catch (error) {
      // If Cognito user creation fails, delete the invite
      await prisma.invite.delete({ where: { id: invite.id } })
      throw error
    }

    // Send custom invite email via SES
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/accept-invite?token=${invite.token}`

    await sendEmail({
      to: email,
      subject: `${invitedBy.name || invitedBy.email} invited you to Digital DevOps`,
      html: getInviteEmailHtml({
        inviterName: invitedBy.name || invitedBy.email,
        inviteLink,
        message,
      }),
    })

    return NextResponse.json({ invite }, { status: 201 })
  } catch (error) {
    console.error('Error creating invite:', error)
    return NextResponse.json(
      { error: 'Failed to create invite' },
      { status: 500 }
    )
  }
}
