import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/cards - List all cards (excluding soft-deleted)
export async function GET(request: NextRequest) {
  try {
    const includeDeleted = request.nextUrl.searchParams.get('includeDeleted') === 'true'
    const boardId = request.nextUrl.searchParams.get('boardId')

    const where: { isDeleted?: boolean; boardId?: string | null } = includeDeleted ? {} : { isDeleted: false }
    if (boardId) {
      where.boardId = boardId
    } else {
      // If no boardId specified, get cards without a board (legacy cards)
      where.boardId = null
    }

    const cards = await prisma.kanbanCard.findMany({
      where,
      orderBy: [
        { status: 'asc' },
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ cards })
  } catch (error) {
    console.error('Error fetching cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cards' },
      { status: 500 }
    )
  }
}

// POST /api/cards - Create a new card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      status = 'BACKLOG',
      priority = 'MEDIUM',
      type = 'TASK',
      dueDate,
      boardId,
      createdById,
      createdByName,
      assignedToId,
      assignedToName,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Get the max position for the status column
    const maxPosition = await prisma.kanbanCard.aggregate({
      where: { status, isDeleted: false },
      _max: { position: true },
    })

    const card = await prisma.kanbanCard.create({
      data: {
        title,
        content,
        status,
        priority,
        type,
        position: (maxPosition._max.position ?? -1) + 1,
        dueDate: dueDate ? new Date(dueDate) : null,
        boardId,
        createdById,
        createdByName,
        assignedToId,
        assignedToName,
      },
    })

    return NextResponse.json({ card }, { status: 201 })
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    )
  }
}
