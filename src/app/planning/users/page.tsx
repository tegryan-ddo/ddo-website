'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth'

// Auth bypass removed for production
const DEV_BYPASS_AUTH = false

interface Invite {
  id: string
  email: string
  role: string
  status: string
  invitedByEmail: string
  invitedByName?: string
  createdAt: string
  expiresAt: string
}

interface UserData {
  userId: string
  email?: string
  name?: string
}

export default function UsersPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [invites, setInvites] = useState<Invite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('MEMBER')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      // Dev bypass - skip auth check
      if (DEV_BYPASS_AUTH) {
        setUser({
          userId: 'dev-user',
          email: 'dev@digitaldevops.io',
          name: 'Dev User',
        })
        await fetchInvites()
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
        await fetchInvites()
      } catch (error) {
        router.push('/planning')
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [router])

  const fetchInvites = async () => {
    try {
      const res = await fetch('/api/invites')
      const data = await res.json()
      if (data.invites) {
        setInvites(data.invites)
      }
    } catch (error) {
      console.error('Error fetching invites:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
          message: message || undefined,
          invitedBy: {
            id: user?.userId,
            email: user?.email,
            name: user?.name,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send invite')
      }

      setSuccess(`Invite sent to ${email}`)
      setEmail('')
      setMessage('')
      await fetchInvites()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send invite')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRevoke = async (inviteId: string) => {
    if (!confirm('Are you sure you want to revoke this invite?')) return

    try {
      const res = await fetch(`/api/invites/${inviteId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to revoke invite')
      }

      await fetchInvites()
    } catch (error) {
      setError('Failed to revoke invite')
    }
  }

  const handleResend = async (inviteId: string) => {
    try {
      const res = await fetch(`/api/invites/${inviteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend' }),
      })

      if (!res.ok) {
        throw new Error('Failed to resend invite')
      }

      setSuccess('Invite resent successfully')
      await fetchInvites()
    } catch (error) {
      setError('Failed to resend invite')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    )
  }

  const pendingInvites = invites.filter((i) => i.status === 'PENDING')
  const otherInvites = invites.filter((i) => i.status !== 'PENDING')

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <a href="/planning" style={styles.backLink}>
            ← Back
          </a>
          <h1 style={styles.logo}>User Management</h1>
        </div>
        <div style={styles.userSection}>
          <span style={styles.userName}>{user?.email}</span>
          <button onClick={handleSignOut} style={styles.signOutButton}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* Invite Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Invite New User</h2>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.select}
              >
                <option value="VIEWER">Viewer</option>
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Personal Message (optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hey! I'd like to invite you to join our team..."
                rows={3}
                style={styles.textarea}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Invite'}
            </button>
          </form>
        </div>

        {/* Pending Invites */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Pending Invites</h2>
          {pendingInvites.length === 0 ? (
            <p style={styles.emptyText}>No pending invites</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Invited By</th>
                  <th style={styles.th}>Expires</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvites.map((invite) => (
                  <tr key={invite.id}>
                    <td style={styles.td}>{invite.email}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>{invite.role}</span>
                    </td>
                    <td style={styles.td}>
                      {invite.invitedByName || invite.invitedByEmail}
                    </td>
                    <td style={styles.td}>
                      {new Date(invite.expiresAt).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleResend(invite.id)}
                        style={styles.actionButton}
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => handleRevoke(invite.id)}
                        style={styles.dangerButton}
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Invite History */}
        {otherInvites.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Invite History</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Invited By</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {otherInvites.map((invite) => (
                  <tr key={invite.id}>
                    <td style={styles.td}>{invite.email}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor:
                            invite.status === 'ACCEPTED'
                              ? '#dcfce7'
                              : invite.status === 'EXPIRED'
                              ? '#fef3c7'
                              : '#fee2e2',
                          color:
                            invite.status === 'ACCEPTED'
                              ? '#166534'
                              : invite.status === 'EXPIRED'
                              ? '#92400e'
                              : '#991b1b',
                        }}
                      >
                        {invite.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {invite.invitedByName || invite.invitedByEmail}
                    </td>
                    <td style={styles.td}>
                      {new Date(invite.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#18181b',
    color: '#fff',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  backLink: {
    color: '#a1a1aa',
    textDecoration: 'none',
    fontSize: '14px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 600,
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userName: {
    fontSize: '14px',
    color: '#a1a1aa',
  },
  signOutButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #52525b',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    padding: '40px 32px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#18181b',
    marginBottom: '20px',
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
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d4d4d8',
    fontSize: '14px',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d4d4d8',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  textarea: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d4d4d8',
    fontSize: '14px',
    resize: 'vertical' as const,
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#18181b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  error: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  success: {
    padding: '12px 16px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  emptyText: {
    color: '#71717a',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 8px',
    borderBottom: '1px solid #e4e4e7',
    fontSize: '12px',
    fontWeight: 600,
    color: '#71717a',
    textTransform: 'uppercase' as const,
  },
  td: {
    padding: '12px 8px',
    borderBottom: '1px solid #f4f4f5',
    fontSize: '14px',
    color: '#3f3f46',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#f4f4f5',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
  },
  actionButton: {
    padding: '6px 12px',
    backgroundColor: '#fff',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  dangerButton: {
    padding: '6px 12px',
    backgroundColor: '#fff',
    border: '1px solid #fca5a5',
    color: '#dc2626',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
