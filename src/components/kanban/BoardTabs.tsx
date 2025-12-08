'use client'

import { useState, useRef, useEffect } from 'react'

export interface Board {
  id: string
  name: string
  position: number
  _count?: { cards: number }
}

interface BoardTabsProps {
  boards: Board[]
  activeBoard: Board | null
  onSelectBoard: (board: Board) => void
  onCreateBoard: (name: string) => void
  onRenameBoard: (id: string, name: string) => void
  onDeleteBoard: (id: string) => void
}

export default function BoardTabs({
  boards,
  activeBoard,
  onSelectBoard,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
}: BoardTabsProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isCreating])

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [editingId])

  const handleCreateSubmit = () => {
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName.trim())
      setNewBoardName('')
    }
    setIsCreating(false)
  }

  const handleRenameSubmit = (id: string) => {
    if (editName.trim()) {
      onRenameBoard(id, editName.trim())
    }
    setEditingId(null)
  }

  const handleStartEdit = (board: Board) => {
    setEditingId(board.id)
    setEditName(board.name)
  }

  return (
    <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-700 px-2 bg-white dark:bg-zinc-900">
      {boards.map((board) => (
        <div
          key={board.id}
          className={`group relative flex items-center gap-2 px-4 py-2 text-sm cursor-pointer border-b-2 transition-colors ${
            activeBoard?.id === board.id
              ? 'border-brand-600 text-brand-600 dark:text-brand-400 font-medium'
              : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300'
          }`}
          onClick={() => onSelectBoard(board)}
        >
          {editingId === board.id ? (
            <input
              ref={editInputRef}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleRenameSubmit(board.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit(board.id)
                if (e.key === 'Escape') setEditingId(null)
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-24 px-1 py-0 text-sm bg-transparent border-b border-brand-500 focus:outline-none"
            />
          ) : (
            <>
              <span
                onDoubleClick={(e) => {
                  e.stopPropagation()
                  handleStartEdit(board)
                }}
              >
                {board.name}
              </span>
              {board._count && (
                <span className="text-xs text-zinc-400">({board._count.cards})</span>
              )}
              {boards.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm(`Delete board "${board.name}"? Cards will be moved to unassigned.`)) {
                      onDeleteBoard(board.id)
                    }
                  }}
                  className="hidden group-hover:block p-0.5 text-zinc-400 hover:text-red-500 transition-colors"
                  title="Delete board"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      ))}

      {isCreating ? (
        <div className="flex items-center gap-1 px-2">
          <input
            ref={inputRef}
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            onBlur={handleCreateSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateSubmit()
              if (e.key === 'Escape') {
                setIsCreating(false)
                setNewBoardName('')
              }
            }}
            placeholder="Board name..."
            className="w-32 px-2 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          title="Add new board"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>New Board</span>
        </button>
      )}
    </div>
  )
}
