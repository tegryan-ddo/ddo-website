'use client'

import { useState } from 'react'
import { Card } from './KanbanCard'

interface AddCardModalProps {
  onClose: () => void
  onCreate: (cardData: {
    title: string
    content?: string
    priority?: Card['priority']
    type?: Card['type']
  }) => void
  columnName: string
}

const TYPES: { value: Card['type']; label: string; icon: string }[] = [
  { value: 'TASK', label: 'Task', icon: '✓' },
  { value: 'RESEARCH', label: 'Research', icon: '🔍' },
  { value: 'DECISION', label: 'Decision', icon: '⚖️' },
  { value: 'CONFIGURATION', label: 'Configuration', icon: '⚙️' },
  { value: 'BUG', label: 'Bug', icon: '🐛' },
  { value: 'FEATURE', label: 'Feature', icon: '✨' },
]

const PRIORITIES: { value: Card['priority']; label: string; color: string }[] = [
  { value: 'LOW', label: 'Low', color: 'bg-zinc-200 text-zinc-700' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  { value: 'HIGH', label: 'High', color: 'bg-orange-100 text-orange-700' },
  { value: 'URGENT', label: 'Urgent', color: 'bg-red-100 text-red-700' },
]

export default function AddCardModal({ onClose, onCreate, columnName }: AddCardModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState<Card['type']>('TASK')
  const [priority, setPriority] = useState<Card['priority']>('MEDIUM')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onCreate({
        title: title.trim(),
        content: content.trim() || undefined,
        type,
        priority,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Add Card to {columnName}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg
                       bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all
                    ${type === t.value
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                >
                  <span className="mr-1.5">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all
                    ${priority === p.value
                      ? `border-transparent ${p.color}`
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Description
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg
                       bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       resize-none"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              You can add rich content after creating the card.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-zinc-300 dark:border-zinc-600
                       text-zinc-700 dark:text-zinc-300 rounded-lg font-medium
                       hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-lg font-medium
                       hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
