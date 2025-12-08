'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with TipTap
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-32 bg-zinc-100 dark:bg-zinc-700 rounded animate-pulse" />
})

export interface Card {
  id: string
  title: string
  content: string | null
  status: 'BACKLOG' | 'ON_DECK' | 'IN_PROGRESS' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  type: 'TASK' | 'RESEARCH' | 'DECISION' | 'CONFIGURATION' | 'BUG' | 'FEATURE'
  position: number
  dueDate: string | null
  createdById: string | null
  createdByName: string | null
  assignedToId: string | null
  assignedToName: string | null
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface KanbanCardProps {
  card: Card
  onUpdate: (id: string, updates: Partial<Card>) => void
  onDelete: (id: string) => void
}

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  MEDIUM: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  HIGH: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  URGENT: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const typeIcons = {
  TASK: '📋',
  RESEARCH: '🔍',
  DECISION: '🤔',
  CONFIGURATION: '⚙️',
  BUG: '🐛',
  FEATURE: '✨',
}

const typeColors = {
  TASK: 'border-l-zinc-400',
  RESEARCH: 'border-l-purple-500',
  DECISION: 'border-l-yellow-500',
  CONFIGURATION: 'border-l-cyan-500',
  BUG: 'border-l-red-500',
  FEATURE: 'border-l-green-500',
}

export default function KanbanCard({ card, onUpdate, onDelete }: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(card.title)
  const [editContent, setEditContent] = useState(card.content || '')
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = () => {
    onUpdate(card.id, { title: editTitle, content: editContent })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(card.title)
    setEditContent(card.content || '')
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-zinc-800 rounded-lg shadow-sm border-l-4 ${typeColors[card.type]} ${
        isDragging ? 'opacity-50 shadow-lg ring-2 ring-brand-500' : ''
      }`}
    >
      {/* Card Header - Always visible, draggable */}
      <div
        {...attributes}
        {...listeners}
        className="p-3 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 text-sm font-medium border rounded dark:bg-zinc-700 dark:border-zinc-600"
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {card.title}
              </h3>
            )}
          </div>
          <span className="text-base" title={card.type}>
            {typeIcons[card.type]}
          </span>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[card.priority]}`}>
            {card.priority}
          </span>
          {card.assignedToName && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              → {card.assignedToName}
            </span>
          )}
          {card.dueDate && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              📅 {new Date(card.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Expand/Collapse Content */}
      {(card.content || isEditing) && (
        <div className="border-t border-zinc-100 dark:border-zinc-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center justify-center gap-1"
          >
            {isExpanded ? '▲ Collapse' : '▼ Expand'}
          </button>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-zinc-100 dark:border-zinc-700">
          {isEditing ? (
            <div className="mt-2">
              <RichTextEditor
                content={editContent}
                onChange={setEditContent}
                placeholder="Add description, checklists, links..."
              />
            </div>
          ) : (
            card.content && (
              <div
                className="mt-2 prose prose-sm max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300"
                dangerouslySetInnerHTML={{ __html: card.content }}
              />
            )
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-700">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-xs bg-brand-600 text-white hover:bg-brand-700 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(card.id)}
                  className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick actions when collapsed */}
      {!isExpanded && !isEditing && (
        <div className="px-3 pb-2 flex justify-end gap-1">
          <button
            onClick={() => {
              setIsExpanded(true)
              setIsEditing(true)
            }}
            className="p-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="p-1 text-xs text-zinc-400 hover:text-red-600"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  )
}
