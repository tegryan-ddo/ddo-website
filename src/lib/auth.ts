import { Amplify } from 'aws-amplify'
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from 'aws-amplify/auth'

// Configure Amplify - this should be called once at app initialization
export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
        signUpVerificationMethod: 'code',
        loginWith: {
          email: true,
          oauth: {
            domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '',
            scopes: ['email', 'profile', 'openid'],
            redirectSignIn: [process.env.NEXT_PUBLIC_APP_URL + '/auth/callback' || 'http://localhost:3000/auth/callback'],
            redirectSignOut: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],
            responseType: 'code',
            providers: ['Google', 'Facebook'] as const,
          },
        },
      },
    },
  })
}

// Auth helper functions
export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signIn({
      username: email,
      password,
    })
    return { success: true, result }
  } catch (error) {
    console.error('Sign in error:', error)
    return { success: false, error }
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  try {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    })
    return { success: true, result }
  } catch (error) {
    console.error('Sign up error:', error)
    return { success: false, error }
  }
}

export async function confirmSignUpWithCode(email: string, code: string) {
  try {
    const result = await confirmSignUp({
      username: email,
      confirmationCode: code,
    })
    return { success: true, result }
  } catch (error) {
    console.error('Confirm sign up error:', error)
    return { success: false, error }
  }
}

export async function signOutUser() {
  try {
    await signOut()
    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    return { success: false, error }
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const result = await resetPassword({ username: email })
    return { success: true, result }
  } catch (error) {
    console.error('Password reset error:', error)
    return { success: false, error }
  }
}

export async function confirmPasswordReset(
  email: string,
  code: string,
  newPassword: string
) {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    })
    return { success: true }
  } catch (error) {
    console.error('Confirm password reset error:', error)
    return { success: false, error }
  }
}

export async function getSession() {
  try {
    const session = await fetchAuthSession()
    return session
  } catch (error) {
    return null
  }
}

export async function getUser() {
  try {
    const user = await getCurrentUser()
    const attributes = await fetchUserAttributes()
    return { user, attributes }
  } catch (error) {
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    await getCurrentUser()
    return true
  } catch {
    return false
  }
}
