'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn, confirmSignIn, getCurrentUser } from 'aws-amplify/auth'

interface InviteData {
  valid: boolean
  email: string
  invitedBy: string
  message?: string
  role: string
}

type Step = 'loading' | 'verify' | 'enter-temp-password' | 'set-new-password' | 'completing' | 'error'

function AcceptInviteContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [step, setStep] = useState<Step>('loading')
  const [inviteData, setInviteData] = useState<InviteData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [tempPassword, setTempPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // For handling the Cognito challenge
  const [signInOutput, setSignInOutput] = useState<Awaited<ReturnType<typeof signIn>> | null>(null)

  useEffect(() => {
    if (!token) {
      setError('No invite token provided')
      setStep('error')
      return
    }

    // Verify the invite token
    fetch(`/api/invites/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setStep('error')
        } else {
          setInviteData(data)
          setStep('verify')
        }
      })
      .catch(() => {
        setError('Failed to verify invite')
        setStep('error')
      })
  }, [token])

  const handleTempPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteData || !tempPassword) return

    setIsSubmitting(true)
    setError(null)

    try {
      const output = await signIn({
        username: inviteData.email,
        password: tempPassword,
      })

      if (output.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        setSignInOutput(output)
        setStep('set-new-password')
      } else if (output.isSignedIn) {
        // Already signed in (shouldn't happen with temp password, but handle it)
        await completeInviteAcceptance()
      } else {
        setError(`Unexpected authentication step: ${output.nextStep.signInStep}`)
      }
    } catch (err) {
      const authError = err as Error
      if (authError.name === 'NotAuthorizedException') {
        setError('Incorrect temporary password. Please check the email you received.')
      } else if (authError.name === 'UserNotFoundException') {
        setError('Account not found. Please contact support.')
      } else {
        setError(authError.message || 'Failed to sign in')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || !confirmPassword) return

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const output = await confirmSignIn({
        challengeResponse: newPassword,
      })

      if (output.isSignedIn) {
        await completeInviteAcceptance()
      } else {
        setError('Failed to complete password setup')
      }
    } catch (err) {
      const authError = err as Error
      if (authError.name === 'InvalidPasswordException') {
        setError('Password does not meet requirements. Use at least 8 characters with uppercase, lowercase, numbers, and symbols.')
      } else {
        setError(authError.message || 'Failed to set password')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const completeInviteAcceptance = async () => {
    setStep('completing')

    try {
      const user = await getCurrentUser()

      // Mark invite as accepted
      const response = await fetch('/api/invites/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          userId: user.userId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete invite acceptance')
      }

      // Redirect to planning page
      router.push('/planning')
    } catch (err) {
      console.error('Error completing invite acceptance:', err)
      setError('Account created but failed to complete setup. Please sign in manually.')
      setStep('error')
    }
  }

  // Loading state
  if (step === 'loading') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Verifying your invitation...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (step === 'error') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconError}>!</div>
          <h1 style={styles.title}>Unable to Accept Invite</h1>
          <p style={styles.errorMessage}>{error}</p>
          <a href="/" style={styles.linkButton}>
            Return to Homepage
          </a>
        </div>
      </div>
    )
  }

  // Completing state
  if (step === 'completing') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Setting up your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Digital DevOps</h1>

        {inviteData && (
          <div style={styles.inviteInfo}>
            <p style={styles.subtitle}>
              You&apos;ve been invited by <strong>{inviteData.invitedBy}</strong>
            </p>
            {inviteData.message && (
              <blockquote style={styles.message}>
                &ldquo;{inviteData.message}&rdquo;
              </blockquote>
            )}
            <p style={styles.email}>
              Account: <strong>{inviteData.email}</strong>
            </p>
            <p style={styles.role}>
              Role: <span style={styles.roleBadge}>{inviteData.role}</span>
            </p>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        {step === 'verify' && (
          <div style={styles.stepContainer}>
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>1</div>
              <div>
                <h2 style={styles.stepTitle}>Enter Temporary Password</h2>
                <p style={styles.stepDescription}>
                  Check your email for the temporary password sent by AWS Cognito
                </p>
              </div>
            </div>
            <form onSubmit={handleTempPasswordSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Temporary Password</label>
                <input
                  type="password"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  placeholder="Enter temporary password from email"
                  required
                  style={styles.input}
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !tempPassword}
                style={{
                  ...styles.button,
                  opacity: isSubmitting || !tempPassword ? 0.6 : 1,
                }}
              >
                {isSubmitting ? 'Verifying...' : 'Continue'}
              </button>
            </form>
          </div>
        )}

        {step === 'set-new-password' && (
          <div style={styles.stepContainer}>
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>2</div>
              <div>
                <h2 style={styles.stepTitle}>Create Your Password</h2>
                <p style={styles.stepDescription}>
                  Choose a secure password for your account
                </p>
              </div>
            </div>
            <form onSubmit={handleNewPasswordSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  style={styles.input}
                  autoComplete="new-password"
                />
                <p style={styles.hint}>
                  At least 8 characters with uppercase, lowercase, numbers, and symbols
                </p>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  style={styles.input}
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !newPassword || !confirmPassword}
                style={{
                  ...styles.button,
                  opacity: isSubmitting || !newPassword || !confirmPassword ? 0.6 : 1,
                }}
              >
                {isSubmitting ? 'Creating Account...' : 'Complete Setup'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Loading...</p>
          </div>
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f5',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#18181b',
    marginBottom: '8px',
    textAlign: 'center' as const,
  },
  inviteInfo: {
    textAlign: 'center' as const,
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e4e4e7',
  },
  subtitle: {
    fontSize: '16px',
    color: '#3f3f46',
    marginBottom: '12px',
  },
  message: {
    backgroundColor: '#f4f4f5',
    padding: '16px',
    borderRadius: '6px',
    fontStyle: 'italic',
    color: '#52525b',
    margin: '16px 0',
    borderLeft: '3px solid #18181b',
    textAlign: 'left' as const,
  },
  email: {
    fontSize: '14px',
    color: '#71717a',
    marginBottom: '4px',
  },
  role: {
    fontSize: '14px',
    color: '#71717a',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
  },
  stepContainer: {
    marginTop: '24px',
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#18181b',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#18181b',
    margin: 0,
  },
  stepDescription: {
    fontSize: '14px',
    color: '#71717a',
    margin: '4px 0 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#18181b',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #d4d4d8',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  hint: {
    fontSize: '12px',
    color: '#71717a',
    margin: 0,
  },
  button: {
    padding: '14px 24px',
    backgroundColor: '#18181b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'opacity 0.2s',
  },
  error: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e4e4e7',
    borderTop: '3px solid #18181b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
  loadingText: {
    fontSize: '16px',
    color: '#71717a',
    textAlign: 'center' as const,
    margin: 0,
  },
  iconError: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
  },
  errorMessage: {
    fontSize: '16px',
    color: '#3f3f46',
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  linkButton: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#18181b',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
  },
}
