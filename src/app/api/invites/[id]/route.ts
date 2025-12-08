import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

// GET /api/invites/[id] - Get a specific invite
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const invite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invite not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ invite })
  } catch (error) {
    console.error('Error fetching invite:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invite' },
      { status: 500 }
    )
  }
}

// DELETE /api/invites/[id] - Revoke an invite
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const invite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invite not found' },
        { status: 404 }
      )
    }

    if (invite.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Can only revoke pending invites' },
        { status: 400 }
      )
    }

    // Delete the user from Cognito if they haven't confirmed yet
    try {
      await cognitoClient.send(
        new AdminDeleteUserCommand({
          UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
          Username: invite.email,
        })
      )
    } catch (error: unknown) {
      // User might not exist in Cognito, that's okay
      const cognitoError = error as { name?: string }
      if (cognitoError.name !== 'UserNotFoundException') {
        console.error('Error deleting Cognito user:', error)
      }
    }

    // Update invite status
    await prisma.invite.update({
      where: { id },
      data: { status: 'REVOKED' },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error revoking invite:', error)
    return NextResponse.json(
      { error: 'Failed to revoke invite' },
      { status: 500 }
    )
  }
}

// PATCH /api/invites/[id] - Resend invite email
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action } = body

    const invite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invite not found' },
        { status: 404 }
      )
    }

    if (action === 'resend') {
      if (invite.status !== 'PENDING') {
        return NextResponse.json(
          { error: 'Can only resend pending invites' },
          { status: 400 }
        )
      }

      // Update expiry and resend email
      const { sendEmail, getInviteEmailHtml } = await import('@/lib/email')

      const updatedInvite = await prisma.invite.update({
        where: { id },
        data: {
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      })

      const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/accept-invite?token=${invite.token}`

      await sendEmail({
        to: invite.email,
        subject: `Reminder: ${invite.invitedByName || invite.invitedByEmail} invited you to Digital DevOps`,
        html: getInviteEmailHtml({
          inviterName: invite.invitedByName || invite.invitedByEmail,
          inviteLink,
          message: invite.message || undefined,
        }),
      })

      return NextResponse.json({ invite: updatedInvite })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating invite:', error)
    return NextResponse.json(
      { error: 'Failed to update invite' },
      { status: 500 }
    )
  }
}
