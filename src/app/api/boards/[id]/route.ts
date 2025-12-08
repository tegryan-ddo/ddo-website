import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/boards/[id] - Get a single board with its cards
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const board = await prisma.kanbanBoard.findUnique({
      where: { id },
      include: {
        cards: {
          where: { isDeleted: false },
          orderBy: [
            { status: 'asc' },
            { position: 'asc' },
          ],
        },
      },
    })

    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ board })
  } catch (error) {
    console.error('Error fetching board:', error)
    return NextResponse.json(
      { error: 'Failed to fetch board' },
      { status: 500 }
    )
  }
}

// PATCH /api/boards/[id] - Update a board
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, position } = body

    const updateData: { name?: string; position?: number } = {}
    if (name !== undefined) updateData.name = name
    if (position !== undefined) updateData.position = position

    const board = await prisma.kanbanBoard.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ board })
  } catch (error) {
    console.error('Error updating board:', error)
    return NextResponse.json(
      { error: 'Failed to update board' },
      { status: 500 }
    )
  }
}

// DELETE /api/boards/[id] - Soft delete a board
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const board = await prisma.kanbanBoard.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })

    return NextResponse.json({ board })
  } catch (error) {
    console.error('Error deleting board:', error)
    return NextResponse.json(
      { error: 'Failed to delete board' },
      { status: 500 }
    )
  }
}

// PUT /api/boards/[id] - Restore a soft-deleted board
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    if (body.action === 'restore') {
      const board = await prisma.kanbanBoard.update({
        where: { id },
        data: {
          isDeleted: false,
          deletedAt: null,
        },
      })

      return NextResponse.json({ board })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error restoring board:', error)
    return NextResponse.json(
      { error: 'Failed to restore board' },
      { status: 500 }
    )
  }
}
