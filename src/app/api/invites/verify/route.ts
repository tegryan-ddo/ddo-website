import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/invites/verify?token=xxx - Verify an invite token
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    const invite = await prisma.invite.findUnique({
      where: { token },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid invite token' },
        { status: 404 }
      )
    }

    if (invite.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'This invite has already been used or revoked' },
        { status: 400 }
      )
    }

    if (new Date() > invite.expiresAt) {
      // Update status to expired
      await prisma.invite.update({
        where: { id: invite.id },
        data: { status: 'EXPIRED' },
      })

      return NextResponse.json(
        { error: 'This invite has expired' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      email: invite.email,
      invitedBy: invite.invitedByName || invite.invitedByEmail,
      message: invite.message,
      role: invite.role,
    })
  } catch (error) {
    console.error('Error verifying invite:', error)
    return NextResponse.json(
      { error: 'Failed to verify invite' },
      { status: 500 }
    )
  }
}

// POST /api/invites/verify - Mark invite as accepted
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, userId } = body

    if (!token || !userId) {
      return NextResponse.json(
        { error: 'Token and userId are required' },
        { status: 400 }
      )
    }

    const invite = await prisma.invite.findUnique({
      where: { token },
    })

    if (!invite || invite.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Invalid or expired invite' },
        { status: 400 }
      )
    }

    // Update invite status
    await prisma.invite.update({
      where: { id: invite.id },
      data: {
        status: 'ACCEPTED',
        acceptedById: userId,
      },
    })

    // Create user profile
    await prisma.userProfile.upsert({
      where: { id: userId },
      update: {
        lastLoginAt: new Date(),
      },
      create: {
        id: userId,
        email: invite.email,
        role: invite.role,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error accepting invite:', error)
    return NextResponse.json(
      { error: 'Failed to accept invite' },
      { status: 500 }
    )
  }
}
