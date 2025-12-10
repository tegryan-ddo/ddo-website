'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth'
import { Authenticator } from '@aws-amplify/ui-react'
import KanbanBoard from '@/components/kanban/KanbanBoard'

// Auth bypass removed for production
const DEV_BYPASS_AUTH = false

interface UserData {
  userId: string
  email?: string
  name?: string
}

function PlanningContent({ user }: { user: UserData }) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 text-white">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold">Digital DevOps</h1>
          <nav className="hidden md:flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Main Site
            </a>
            <a
              href="/planning"
              className="text-sm text-white font-medium"
            >
              Board
            </a>
            <a
              href="/planning/users"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Users & Invites
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{user.email}</span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm border border-zinc-600 rounded-md
                     text-white hover:bg-zinc-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Project Planning
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Track tasks, research items, and decisions for the DDO website overhaul.
          </p>
        </div>

        <KanbanBoard userId={user.userId} userName={user.name || user.email} />
      </main>
    </div>
  )
}

export default function PlanningPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Dev bypass - skip auth check
      if (DEV_BYPASS_AUTH) {
        setUser({
          userId: 'dev-user',
          email: 'dev@digitaldevops.io',
          name: 'Dev User',
        })
        setIsLoading(false)
        return
      }

      try {
        const currentUser = await getCurrentUser()
        const attributes = await fetchUserAttributes()
        setUser({
          userId: currentUser.userId,
          email: attributes.email,
          name: attributes.name,
        })
      } catch (error) {
        // Not authenticated - will show Authenticator
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" />
      </div>
    )
  }

  if (user) {
    return <PlanningContent user={user} />
  }

  // Show login form for unauthenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Digital DevOps
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Sign in to access the planning area
        </p>
        <Authenticator
          hideSignUp={true}
          loginMechanisms={['email']}
        >
          {({ user: authUser }) => {
            if (authUser) {
              // Refresh the page to load user data
              window.location.reload()
            }
            return <></>
          }}
        </Authenticator>
      </div>
    </div>
  )
}
