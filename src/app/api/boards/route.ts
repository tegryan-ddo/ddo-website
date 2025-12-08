import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/boards - List all boards (excluding soft-deleted)
export async function GET(request: NextRequest) {
  try {
    const includeDeleted = request.nextUrl.searchParams.get('includeDeleted') === 'true'

    const boards = await prisma.kanbanBoard.findMany({
      where: includeDeleted ? {} : { isDeleted: false },
      orderBy: [
        { position: 'asc' },
        { createdAt: 'asc' },
      ],
      include: {
        _count: {
          select: { cards: { where: { isDeleted: false } } }
        }
      }
    })

    return NextResponse.json({ boards })
  } catch (error) {
    console.error('Error fetching boards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 }
    )
  }
}

// POST /api/boards - Create a new board
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, createdById, createdByName } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Get the max position
    const maxPosition = await prisma.kanbanBoard.aggregate({
      where: { isDeleted: false },
      _max: { position: true },
    })

    const board = await prisma.kanbanBoard.create({
      data: {
        name,
        position: (maxPosition._max.position ?? -1) + 1,
        createdById,
        createdByName,
      },
    })

    return NextResponse.json({ board }, { status: 201 })
  } catch (error) {
    console.error('Error creating board:', error)
    return NextResponse.json(
      { error: 'Failed to create board' },
      { status: 500 }
    )
  }
}
