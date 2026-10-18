import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Cookies from 'js-cookie'

// We need to mock fetch globally before importing the module
const fetchMock = vi.fn()
vi.stubGlobal('fetch', fetchMock)

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

// Import after mocks are set up
import {
  login,
  logout,
  getMe,
  listJobs,
  getJob,
  getAdminStats,
  refreshToken,
  ApiError,
} from '@/lib/api'

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('API client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset cookie store
    ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined)
  })

  // ---------------------------------------------------------------------------
  // buildQS (tested indirectly via listJobs)
  // ---------------------------------------------------------------------------
  describe('buildQS via listJobs', () => {
    it('appends query string params to the URL', async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ items: [], total: 0, page: 1, page_size: 10 })
      )
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue('tok')

      await listJobs({ page: '2', limit: '5' })

      const url = fetchMock.mock.calls[0][0] as string
      expect(url).toContain('page=2')
      expect(url).toContain('limit=5')
    })

    it('does not append query string when params are undefined', async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ items: [], total: 0, page: 1, page_size: 10 })
      )
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue('tok')

      await listJobs()

      const url = fetchMock.mock.calls[0][0] as string
      expect(url).not.toContain('?')
    })
  })

  // ---------------------------------------------------------------------------
  // request() — auth header
  // ---------------------------------------------------------------------------
  describe('request() auth header', () => {
    it('adds Authorization header when access_token cookie exists', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
        (key: string) => (key === 'access_token' ? 'my-token' : undefined)
      )
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ id: 1, name: 'Test', email: 'a@b.c', role: 'worker' })
      )

      await getMe()

      const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>
      expect(headers['Authorization']).toBe('Bearer my-token')
    })

    it('does not add Authorization header when no token', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined)
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ id: 1, name: 'Test', email: 'a@b.c', role: 'worker' })
      )

      await getMe()

      const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>
      expect(headers['Authorization']).toBeUndefined()
    })
  })

  // ---------------------------------------------------------------------------
  // request() — error handling
  // ---------------------------------------------------------------------------
  describe('request() error handling', () => {
    it('throws ApiError on non-ok response', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue('tok')
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ detail: 'Not found' }, 404)
      )

      await expect(getJob(999)).rejects.toThrow(ApiError)
      try {
        fetchMock.mockResolvedValueOnce(
          jsonResponse({ detail: 'Not found' }, 404)
        )
        await getJob(999)
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError)
        expect((err as ApiError).status).toBe(404)
      }
    })

    it('throws ApiError with status 401 on unauthorized', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue('bad-tok')
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ detail: 'Unauthorized' }, 401)
      )

      await expect(getMe()).rejects.toThrow(ApiError)
    })
  })

  // ---------------------------------------------------------------------------
  // login()
  // ---------------------------------------------------------------------------
  describe('login()', () => {
    it('sets access_token and refresh_token cookies on success', async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({
          access_token: 'at-123',
          refresh_token: 'rt-456',
          token_type: 'Bearer',
        })
      )

      const result = await login('admin@trabz.ph', 'password123')

      expect(result.access_token).toBe('at-123')
      expect(result.refresh_token).toBe('rt-456')
      expect(Cookies.set).toHaveBeenCalledWith(
        'access_token',
        'at-123',
        expect.objectContaining({ secure: true, sameSite: 'strict' })
      )
      expect(Cookies.set).toHaveBeenCalledWith(
        'refresh_token',
        'rt-456',
        expect.objectContaining({ secure: true, sameSite: 'strict' })
      )
    })

    it('sends email and password as JSON body', async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({
          access_token: 'at',
          refresh_token: 'rt',
          token_type: 'Bearer',
        })
      )

      await login('test@test.com', 'pass')

      const opts = fetchMock.mock.calls[0][1]
      expect(opts.method).toBe('POST')
      expect(JSON.parse(opts.body)).toEqual({
        email: 'test@test.com',
        password: 'pass',
      })
    })
  })

  // ---------------------------------------------------------------------------
  // logout()
  // ---------------------------------------------------------------------------
  describe('logout()', () => {
    it('removes access_token and refresh_token cookies', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
        (key: string) => (key === 'refresh_token' ? 'rt-old' : 'at-old')
      )
      fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))

      await logout()

      expect(Cookies.remove).toHaveBeenCalledWith('access_token')
      expect(Cookies.remove).toHaveBeenCalledWith('refresh_token')
    })

    it('still clears cookies even if logout API call fails', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
        (key: string) => (key === 'refresh_token' ? 'rt-old' : undefined)
      )
      fetchMock.mockRejectedValueOnce(new Error('Network error'))

      await logout()

      expect(Cookies.remove).toHaveBeenCalledWith('access_token')
      expect(Cookies.remove).toHaveBeenCalledWith('refresh_token')
    })
  })

  // ---------------------------------------------------------------------------
  // refreshToken()
  // ---------------------------------------------------------------------------
  describe('refreshToken()', () => {
    it('throws when no refresh_token cookie exists', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined)

      await expect(refreshToken()).rejects.toThrow('No refresh token')
    })

    it('sets new cookies on success', async () => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockImplementation(
        (key: string) => (key === 'refresh_token' ? 'old-rt' : undefined)
      )
      fetchMock.mockResolvedValueOnce(
        jsonResponse({
          access_token: 'new-at',
          refresh_token: 'new-rt',
          token_type: 'Bearer',
        })
      )

      const result = await refreshToken()

      expect(result.access_token).toBe('new-at')
      expect(Cookies.set).toHaveBeenCalledWith(
        'access_token',
        'new-at',
        expect.any(Object)
      )
    })
  })

  // ---------------------------------------------------------------------------
  // API functions return correct types
  // ---------------------------------------------------------------------------
  describe('API return types', () => {
    beforeEach(() => {
      ;(Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue('tok')
    })

    it('listJobs returns JobListResponse shape', async () => {
      const payload = { items: [], total: 0, page: 1, page_size: 10 }
      fetchMock.mockResolvedValueOnce(jsonResponse(payload))

      const result = await listJobs()

      expect(result).toHaveProperty('items')
      expect(result).toHaveProperty('total')
      expect(result).toHaveProperty('page')
      expect(result).toHaveProperty('page_size')
    })

    it('getMe returns User shape', async () => {
      const user = { id: 1, name: 'Juan', email: 'j@t.ph', role: 'worker', created_at: '2025-01-01' }
      fetchMock.mockResolvedValueOnce(jsonResponse(user))

      const result = await getMe()

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('role')
    })

    it('getAdminStats returns PlatformStats shape', async () => {
      const stats = {
        total_users: 100,
        total_jobs: 50,
        total_applications: 200,
        total_companies: 10,
        total_hires: 30,
      }
      fetchMock.mockResolvedValueOnce(jsonResponse(stats))

      const result = await getAdminStats()

      expect(result).toHaveProperty('total_users')
      expect(result).toHaveProperty('total_jobs')
      expect(result).toHaveProperty('total_applications')
    })
  })
})
