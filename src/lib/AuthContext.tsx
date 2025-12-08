'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  getCurrentUser,
  fetchUserAttributes,
  signOut as amplifySignOut,
  AuthUser,
} from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'

interface UserAttributes {
  email?: string
  name?: string
  sub?: string
  [key: string]: string | undefined
}

interface AuthContextType {
  user: AuthUser | null
  attributes: UserAttributes | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [attributes, setAttributes] = useState<UserAttributes | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      const userAttributes = await fetchUserAttributes()
      setUser(currentUser)
      setAttributes(userAttributes as UserAttributes)
    } catch (error) {
      // User is not authenticated
      setUser(null)
      setAttributes(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await amplifySignOut()
      setUser(null)
      setAttributes(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const refreshUser = async () => {
    setIsLoading(true)
    await fetchUser()
  }

  useEffect(() => {
    fetchUser()

    // Listen for auth events
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          fetchUser()
          break
        case 'signedOut':
          setUser(null)
          setAttributes(null)
          break
        case 'tokenRefresh':
          fetchUser()
          break
      }
    })

    return () => unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    attributes,
    isLoading,
    isAuthenticated: !!user,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
