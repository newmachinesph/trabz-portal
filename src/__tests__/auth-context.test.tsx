import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { type ReactNode } from 'react'
import Cookies from 'js-cookie'

// Mock next/navigation
const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, back: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock js-cookie
vi.mock('js-cookie', () => {
  const store: Record<string, string> = {}
  return {
    default: {
      get: vi.fn((key: string) => store[key]),
      set: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      remove: vi.fn((key: string) => {
        delete store[key]
      }),
    },
  }
})

// Mock the API module
const getMeMock = vi.fn()
const logoutMock = vi.fn()
const refreshTokenMock = vi.fn()

vi.mock('@/lib/api', () => ({
  getMe: (...args: unknown[]) => getMeMock(...args),
  logout: (...args: unknown[]) => logoutMock(...args),
  refreshToken: (...args: unknown[]) => refreshTokenMock(...args),
  ApiError: class ApiError extends Error {
    status: number
    data: unknown
    constructor(message: string, status: number, data?: unknown) {
      super(message)
      this.name = 'ApiError'
      this.status = status
      this.data = data
    }
  },
}))

// Import after mocks
import { AuthProvider, useAuth } from '@/lib/auth-context'

// Import ApiError from our mock so instanceof works
const { ApiError } = await import('@/lib/api')

// Helper component that displays auth state
function AuthConsumer() {
  const { user, loading, logout } = useAuth()
  if (loading) return <div data-testid="loading">Loading...</div>
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'null'}</div>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    pushMock.mockReset()
    getMeMock.mockReset()
    logoutMock.mockReset()
    refreshTokenMock.mockReset()
    ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined)
  })

  it('renders children', async () => {
    ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined)

    render(
      <AuthProvider>
        <div data-testid="child">Hello</div>
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeDefined()
    })
  })

  it('returns user after successful getMe()', async () => {
    const mockUser = {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@test.ph',
      phone: null,
      role: 'worker',
      avatar_url: null,
      location: null,
      bio: null,
      skills: null,
      created_at: '2025-01-01',
    }

    ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
      (key: string) => (key === 'access_token' ? 'valid-token' : undefined)
    )
    getMeMock.mockResolvedValueOnce(mockUser)

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('Juan Dela Cruz')
    })
  })

  it('returns null user when no token', async () => {
    ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined)

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('null')
    })

    expect(getMeMock).not.toHaveBeenCalled()
  })

  it('logout clears user state and redirects', async () => {
    const mockUser = {
      id: 1,
      name: 'Maria',
      email: 'maria@test.ph',
      phone: null,
      role: 'employer',
      avatar_url: null,
      location: null,
      bio: null,
      skills: null,
      created_at: '2025-01-01',
    }

    ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
      (key: string) => (key === 'access_token' ? 'valid-token' : undefined)
    )
    getMeMock.mockResolvedValueOnce(mockUser)
    logoutMock.mockResolvedValueOnce(undefined)

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    // Wait for user to load
    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('Maria')
    })

    // Click logout
    await act(async () => {
      screen.getByTestId('logout-btn').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('null')
    })
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('attempts refresh when getMe returns 401', async () => {
    const mockUser = {
      id: 1,
      name: 'Refreshed User',
      email: 'r@test.ph',
      phone: null,
      role: 'worker',
      avatar_url: null,
      location: null,
      bio: null,
      skills: null,
      created_at: '2025-01-01',
    }

    ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
      (key: string) => (key === 'access_token' ? 'expired-token' : 'refresh-token')
    )

    // First getMe fails with 401
    getMeMock.mockRejectedValueOnce(new ApiError('Unauthorized', 401))
    // refreshToken succeeds
    refreshTokenMock.mockResolvedValueOnce({
      access_token: 'new-at',
      refresh_token: 'new-rt',
      token_type: 'Bearer',
    })
    // Second getMe succeeds after refresh
    getMeMock.mockResolvedValueOnce(mockUser)

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('Refreshed User')
    })

    expect(refreshTokenMock).toHaveBeenCalledTimes(1)
    expect(getMeMock).toHaveBeenCalledTimes(2)
  })
})
