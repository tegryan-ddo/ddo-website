'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import KanbanCard, { Card } from './KanbanCard'

interface KanbanColumnProps {
  id: string
  title: string
  cards: Card[]
  onUpdateCard: (id: string, updates: Partial<Card>) => void
  onDeleteCard: (id: string) => void
  onAddCard: (status: Card['status']) => void
}

const columnColors = {
  BACKLOG: 'bg-zinc-100 dark:bg-zinc-800/50',
  ON_DECK: 'bg-yellow-50 dark:bg-yellow-900/20',
  IN_PROGRESS: 'bg-blue-50 dark:bg-blue-900/20',
  DONE: 'bg-green-50 dark:bg-green-900/20',
}

const columnHeaderColors = {
  BACKLOG: 'border-zinc-400',
  ON_DECK: 'border-yellow-500',
  IN_PROGRESS: 'border-blue-500',
  DONE: 'border-green-500',
}

export default function KanbanColumn({
  id,
  title,
  cards,
  onUpdateCard,
  onDeleteCard,
  onAddCard,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      className={`flex flex-col w-80 flex-shrink-0 rounded-lg ${
        columnColors[id as keyof typeof columnColors]
      } ${isOver ? 'ring-2 ring-brand-500 ring-opacity-50' : ''}`}
    >
      {/* Column Header */}
      <div
        className={`px-4 py-3 border-b-2 ${
          columnHeaderColors[id as keyof typeof columnHeaderColors]
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-zinc-800 dark:text-zinc-200">
              {title}
            </h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-700 px-2 py-0.5 rounded-full">
              {cards.length}
            </span>
          </div>
          <button
            onClick={() => onAddCard(id as Card['status'])}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 rounded"
            title="Add card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className="flex-1 p-2 space-y-2 min-h-[200px]"
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onUpdate={onUpdateCard}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>

        {cards.length === 0 && (
          <div className="text-center py-8 text-zinc-400 dark:text-zinc-500 text-sm">
            No cards yet
          </div>
        )}
      </div>
    </div>
  )
}
