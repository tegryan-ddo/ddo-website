import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/cards/[id] - Get a specific card
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const card = await prisma.kanbanCard.findUnique({
      where: { id },
    })

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ card })
  } catch (error) {
    console.error('Error fetching card:', error)
    return NextResponse.json(
      { error: 'Failed to fetch card' },
      { status: 500 }
    )
  }
}

// PATCH /api/cards/[id] - Update a card
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingCard = await prisma.kanbanCard.findUnique({
      where: { id },
    })

    if (!existingCard) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }

    // Handle move to different column
    if (body.status && body.status !== existingCard.status) {
      // Get max position in the new column
      const maxPosition = await prisma.kanbanCard.aggregate({
        where: { status: body.status, isDeleted: false },
        _max: { position: true },
      })
      body.position = (maxPosition._max.position ?? -1) + 1
    }

    // Handle position reordering within the same column
    if (body.position !== undefined && body.status === existingCard.status) {
      const targetPosition = body.position
      const currentPosition = existingCard.position

      if (targetPosition !== currentPosition) {
        // Shift other cards
        if (targetPosition > currentPosition) {
          // Moving down: shift cards between current and target up
          await prisma.kanbanCard.updateMany({
            where: {
              status: existingCard.status,
              isDeleted: false,
              position: { gt: currentPosition, lte: targetPosition },
            },
            data: { position: { decrement: 1 } },
          })
        } else {
          // Moving up: shift cards between target and current down
          await prisma.kanbanCard.updateMany({
            where: {
              status: existingCard.status,
              isDeleted: false,
              position: { gte: targetPosition, lt: currentPosition },
            },
            data: { position: { increment: 1 } },
          })
        }
      }
    }

    const card = await prisma.kanbanCard.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.priority !== undefined && { priority: body.priority }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.position !== undefined && { position: body.position }),
        ...(body.dueDate !== undefined && { dueDate: body.dueDate ? new Date(body.dueDate) : null }),
        ...(body.assignedToId !== undefined && { assignedToId: body.assignedToId }),
        ...(body.assignedToName !== undefined && { assignedToName: body.assignedToName }),
      },
    })

    return NextResponse.json({ card })
  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json(
      { error: 'Failed to update card' },
      { status: 500 }
    )
  }
}

// DELETE /api/cards/[id] - Soft delete a card (for undo support)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const permanent = request.nextUrl.searchParams.get('permanent') === 'true'

    const card = await prisma.kanbanCard.findUnique({
      where: { id },
    })

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }

    if (permanent) {
      // Permanently delete
      await prisma.kanbanCard.delete({
        where: { id },
      })
      return NextResponse.json({ success: true, message: 'Card permanently deleted' })
    } else {
      // Soft delete
      await prisma.kanbanCard.update({
        where: { id },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      })
      return NextResponse.json({ success: true, message: 'Card deleted', cardId: id })
    }
  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json(
      { error: 'Failed to delete card' },
      { status: 500 }
    )
  }
}

// PUT /api/cards/[id] - Restore a soft-deleted card
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (body.action === 'restore') {
      const card = await prisma.kanbanCard.findUnique({
        where: { id },
      })

      if (!card) {
        return NextResponse.json(
          { error: 'Card not found' },
          { status: 404 }
        )
      }

      if (!card.isDeleted) {
        return NextResponse.json(
          { error: 'Card is not deleted' },
          { status: 400 }
        )
      }

      // Restore the card
      const restoredCard = await prisma.kanbanCard.update({
        where: { id },
        data: {
          isDeleted: false,
          deletedAt: null,
        },
      })

      return NextResponse.json({ card: restoredCard, message: 'Card restored' })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error restoring card:', error)
    return NextResponse.json(
      { error: 'Failed to restore card' },
      { status: 500 }
    )
  }
}
