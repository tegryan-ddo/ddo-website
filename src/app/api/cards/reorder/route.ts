import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// POST /api/cards/reorder - Reorder cards after drag-and-drop
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cardId, newStatus, newPosition } = body

    if (!cardId || newStatus === undefined || newPosition === undefined) {
      return NextResponse.json(
        { error: 'cardId, newStatus, and newPosition are required' },
        { status: 400 }
      )
    }

    const card = await prisma.kanbanCard.findUnique({
      where: { id: cardId },
    })

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }

    const oldStatus = card.status
    const oldPosition = card.position

    // Use a transaction for atomicity
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (oldStatus === newStatus) {
        // Same column reorder
        if (newPosition > oldPosition) {
          // Moving down
          await tx.kanbanCard.updateMany({
            where: {
              status: oldStatus,
              isDeleted: false,
              position: { gt: oldPosition, lte: newPosition },
              id: { not: cardId },
            },
            data: { position: { decrement: 1 } },
          })
        } else if (newPosition < oldPosition) {
          // Moving up
          await tx.kanbanCard.updateMany({
            where: {
              status: oldStatus,
              isDeleted: false,
              position: { gte: newPosition, lt: oldPosition },
              id: { not: cardId },
            },
            data: { position: { increment: 1 } },
          })
        }
      } else {
        // Moving to different column
        // Decrement positions in old column
        await tx.kanbanCard.updateMany({
          where: {
            status: oldStatus,
            isDeleted: false,
            position: { gt: oldPosition },
          },
          data: { position: { decrement: 1 } },
        })

        // Increment positions in new column to make room
        await tx.kanbanCard.updateMany({
          where: {
            status: newStatus,
            isDeleted: false,
            position: { gte: newPosition },
          },
          data: { position: { increment: 1 } },
        })
      }

      // Update the card's position and status
      await tx.kanbanCard.update({
        where: { id: cardId },
        data: {
          status: newStatus,
          position: newPosition,
        },
      })
    })

    // Fetch updated cards
    const cards = await prisma.kanbanCard.findMany({
      where: { isDeleted: false },
      orderBy: [
        { status: 'asc' },
        { position: 'asc' },
      ],
    })

    return NextResponse.json({ success: true, cards })
  } catch (error) {
    console.error('Error reordering cards:', error)
    return NextResponse.json(
      { error: 'Failed to reorder cards' },
      { status: 500 }
    )
  }
}
