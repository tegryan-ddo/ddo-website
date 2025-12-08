'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { useCallback, useEffect } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  editable?: boolean
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Add description...',
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-2',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg my-2',
        },
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[100px] p-3',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const addLink = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addYoutube = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter YouTube URL:')
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      {editable && (
        <div className="flex flex-wrap gap-1 p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <s>S</s>
          </ToolbarButton>
          <div className="w-px bg-zinc-300 dark:bg-zinc-600 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading"
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Subheading"
          >
            H3
          </ToolbarButton>
          <div className="w-px bg-zinc-300 dark:bg-zinc-600 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <span className="text-xs">• List</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <span className="text-xs">1. List</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            active={editor.isActive('taskList')}
            title="Checklist"
          >
            <span className="text-xs">☑ Check</span>
          </ToolbarButton>
          <div className="w-px bg-zinc-300 dark:bg-zinc-600 mx-1" />
          <ToolbarButton onClick={addLink} title="Add Link">
            <span className="text-xs">🔗</span>
          </ToolbarButton>
          <ToolbarButton onClick={addImage} title="Add Image">
            <span className="text-xs">🖼</span>
          </ToolbarButton>
          <ToolbarButton onClick={addYoutube} title="Add YouTube Video">
            <span className="text-xs">▶</span>
          </ToolbarButton>
          <div className="w-px bg-zinc-300 dark:bg-zinc-600 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Quote"
          >
            <span className="text-xs">&ldquo;</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <span className="text-xs font-mono">&lt;/&gt;</span>
          </ToolbarButton>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-sm rounded transition-colors ${
        active
          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
          : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
      }`}
    >
      {children}
    </button>
  )
}
