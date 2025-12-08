'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import KanbanColumn from './KanbanColumn'
import KanbanCard, { Card } from './KanbanCard'
import AddCardModal from './AddCardModal'
import BoardTabs, { Board } from './BoardTabs'

const COLUMNS = [
  { id: 'BACKLOG', title: 'Backlog' },
  { id: 'ON_DECK', title: 'On Deck' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
] as const

interface DeletedCard {
  card: Card
  deletedAt: Date
}

interface KanbanBoardProps {
  userId?: string
  userName?: string
}

export default function KanbanBoard({ userId, userName }: KanbanBoardProps) {
  const [boards, setBoards] = useState<Board[]>([])
  const [activeBoard, setActiveBoard] = useState<Board | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [deletedCards, setDeletedCards] = useState<DeletedCard[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [addToColumn, setAddToColumn] = useState<Card['status']>('BACKLOG')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Fetch boards on mount
  useEffect(() => {
    fetchBoards()
  }, [])

  // Fetch cards when active board changes
  useEffect(() => {
    if (activeBoard) {
      fetchCards(activeBoard.id)
    } else {
      // Fetch legacy cards (no board assigned)
      fetchCards(null)
    }
  }, [activeBoard])

  // Auto-clear deleted cards after 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDeletedCards((prev) =>
        prev.filter(
          (d) => Date.now() - d.deletedAt.getTime() < 30000
        )
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchBoards = async () => {
    try {
      const res = await fetch('/api/boards')
      const data = await res.json()
      if (data.boards && data.boards.length > 0) {
        setBoards(data.boards)
        // Select first board if none selected
        if (!activeBoard) {
          setActiveBoard(data.boards[0])
        }
      } else {
        // Create a default board if none exist
        const createRes = await fetch('/api/boards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Main Board',
            createdById: userId,
            createdByName: userName,
          }),
        })
        const createData = await createRes.json()
        if (createData.board) {
          setBoards([createData.board])
          setActiveBoard(createData.board)
        }
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCards = async (boardId: string | null) => {
    try {
      const url = boardId
        ? `/api/cards?boardId=${boardId}`
        : '/api/cards'
      const res = await fetch(url)
      const data = await res.json()
      if (data.cards) {
        setCards(data.cards)
      }
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  }

  const handleCreateBoard = async (name: string) => {
    try {
      const res = await fetch('/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          createdById: userId,
          createdByName: userName,
        }),
      })
      const data = await res.json()
      if (data.board) {
        setBoards((prev) => [...prev, data.board])
        setActiveBoard(data.board)
      }
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  const handleRenameBoard = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (data.board) {
        setBoards((prev) =>
          prev.map((b) => (b.id === id ? { ...b, name } : b))
        )
        if (activeBoard?.id === id) {
          setActiveBoard((prev) => prev ? { ...prev, name } : null)
        }
      }
    } catch (error) {
      console.error('Error renaming board:', error)
    }
  }

  const handleDeleteBoard = async (id: string) => {
    try {
      await fetch(`/api/boards/${id}`, { method: 'DELETE' })
      const remainingBoards = boards.filter((b) => b.id !== id)
      setBoards(remainingBoards)
      if (activeBoard?.id === id && remainingBoards.length > 0) {
        setActiveBoard(remainingBoards[0])
      }
    } catch (error) {
      console.error('Error deleting board:', error)
    }
  }

  const handleAddCard = (status: Card['status']) => {
    setAddToColumn(status)
    setShowAddModal(true)
  }

  const createCard = async (cardData: {
    title: string
    content?: string
    priority?: Card['priority']
    type?: Card['type']
  }) => {
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cardData,
          status: addToColumn,
          boardId: activeBoard?.id,
          createdById: userId,
          createdByName: userName,
        }),
      })
      const data = await res.json()
      if (data.card) {
        setCards((prev) => [...prev, data.card])
      }
      setShowAddModal(false)
    } catch (error) {
      console.error('Error creating card:', error)
    }
  }

  const updateCard = useCallback(async (id: string, updates: Partial<Card>) => {
    try {
      // Optimistic update
      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, ...updates } : card
        )
      )

      const res = await fetch(`/api/cards/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        // Revert on failure
        if (activeBoard) {
          fetchCards(activeBoard.id)
        }
      }
    } catch (error) {
      console.error('Error updating card:', error)
      if (activeBoard) {
        fetchCards(activeBoard.id)
      }
    }
  }, [activeBoard])

  const deleteCard = useCallback(async (id: string) => {
    const cardToDelete = cards.find((c) => c.id === id)
    if (!cardToDelete) return

    // Optimistic delete with undo support
    setCards((prev) => prev.filter((c) => c.id !== id))
    setDeletedCards((prev) => [
      ...prev,
      { card: cardToDelete, deletedAt: new Date() },
    ])

    try {
      await fetch(`/api/cards/${id}`, { method: 'DELETE' })
    } catch (error) {
      console.error('Error deleting card:', error)
      // Restore on failure
      setCards((prev) => [...prev, cardToDelete])
      setDeletedCards((prev) => prev.filter((d) => d.card.id !== id))
    }
  }, [cards])

  const restoreCard = useCallback(async (id: string) => {
    const deletedEntry = deletedCards.find((d) => d.card.id === id)
    if (!deletedEntry) return

    try {
      const res = await fetch(`/api/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' }),
      })

      if (res.ok) {
        const data = await res.json()
        setCards((prev) => [...prev, data.card])
        setDeletedCards((prev) => prev.filter((d) => d.card.id !== id))
      }
    } catch (error) {
      console.error('Error restoring card:', error)
    }
  }, [deletedCards])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = cards.find((c) => c.id === active.id)
    setActiveCard(card || null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the cards
    const draggedCard = cards.find((c) => c.id === activeId)
    if (!draggedCard) return

    // Check if we're over a column
    const overColumn = COLUMNS.find((col) => col.id === overId)
    if (overColumn) {
      // Moving to an empty column or the column header
      if (draggedCard.status !== overColumn.id) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === activeId
              ? { ...card, status: overColumn.id as Card['status'] }
              : card
          )
        )
      }
      return
    }

    // We're over another card
    const overCard = cards.find((c) => c.id === overId)
    if (!overCard || draggedCard.id === overCard.id) return

    // If different columns, move to that column
    if (draggedCard.status !== overCard.status) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === activeId
            ? { ...card, status: overCard.status }
            : card
        )
      )
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const draggedCard = cards.find((c) => c.id === activeId)
    if (!draggedCard) return

    // Determine the target column
    let targetStatus = draggedCard.status
    const overColumn = COLUMNS.find((col) => col.id === overId)
    const overCard = cards.find((c) => c.id === overId)

    if (overColumn) {
      targetStatus = overColumn.id as Card['status']
    } else if (overCard) {
      targetStatus = overCard.status
    }

    // Calculate new position
    const cardsInTargetColumn = cards
      .filter((c) => c.status === targetStatus && c.id !== activeId)
      .sort((a, b) => a.position - b.position)

    let newPosition = 0
    if (overCard && overCard.id !== activeId) {
      const overIndex = cardsInTargetColumn.findIndex((c) => c.id === overCard.id)
      newPosition = overIndex >= 0 ? overIndex : cardsInTargetColumn.length
    } else {
      newPosition = cardsInTargetColumn.length
    }

    // Update via API
    try {
      const res = await fetch('/api/cards/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: activeId,
          newStatus: targetStatus,
          newPosition,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setCards(data.cards)
      } else {
        if (activeBoard) {
          fetchCards(activeBoard.id)
        }
      }
    } catch (error) {
      console.error('Error reordering:', error)
      if (activeBoard) {
        fetchCards(activeBoard.id)
      }
    }
  }

  const getCardsForColumn = (status: Card['status']) => {
    return cards
      .filter((card) => card.status === status)
      .sort((a, b) => a.position - b.position)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" />
      </div>
    )
  }

  return (
    <div className="h-full">
      {/* Board Tabs */}
      <BoardTabs
        boards={boards}
        activeBoard={activeBoard}
        onSelectBoard={setActiveBoard}
        onCreateBoard={handleCreateBoard}
        onRenameBoard={handleRenameBoard}
        onDeleteBoard={handleDeleteBoard}
      />

      {/* Undo Banner */}
      {deletedCards.length > 0 && (
        <div className="mt-4 p-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg flex items-center justify-between">
          <span>
            {deletedCards.length} card{deletedCards.length > 1 ? 's' : ''} deleted
          </span>
          <div className="flex gap-2">
            {deletedCards.map((d) => (
              <button
                key={d.card.id}
                onClick={() => restoreCard(d.card.id)}
                className="px-3 py-1 text-sm bg-white text-zinc-800 rounded hover:bg-zinc-100"
              >
                Undo &ldquo;{d.card.title.substring(0, 20)}
                {d.card.title.length > 20 ? '...' : ''}&rdquo;
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Board */}
      <div className="mt-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {COLUMNS.map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                cards={getCardsForColumn(column.id as Card['status'])}
                onUpdateCard={updateCard}
                onDeleteCard={deleteCard}
                onAddCard={handleAddCard}
              />
            ))}
          </div>

          <DragOverlay>
            {activeCard && (
              <div className="rotate-3 opacity-90">
                <KanbanCard
                  card={activeCard}
                  onUpdate={() => {}}
                  onDelete={() => {}}
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <AddCardModal
          onClose={() => setShowAddModal(false)}
          onCreate={createCard}
          columnName={COLUMNS.find((c) => c.id === addToColumn)?.title || 'Backlog'}
        />
      )}
    </div>
  )
}
