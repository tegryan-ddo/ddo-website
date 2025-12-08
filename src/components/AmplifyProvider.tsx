'use client'

import { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

// Configure Amplify on client side
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        email: true,
      },
    },
  },
}

interface AmplifyProviderProps {
  children: React.ReactNode
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    try {
      Amplify.configure(amplifyConfig, { ssr: true })
      setIsConfigured(true)
    } catch (error) {
      console.error('Failed to configure Amplify:', error)
    }
  }, [])

  if (!isConfigured) {
    return null // or a loading spinner
  }

  return <>{children}</>
}

// Wrapper for protected routes that require authentication
interface AuthenticatedProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthenticatedRoute({ children, fallback }: AuthenticatedProps) {
  return (
    <Authenticator
      variation="modal"
      hideSignUp={true} // Users can only sign up via invite
      components={{
        Header() {
          return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
                Digital DevOps
              </h2>
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                Sign in to continue
              </p>
            </div>
          )
        },
      }}
    >
      {({ signOut, user }) => (
        <>
          {children}
        </>
      )}
    </Authenticator>
  )
}
