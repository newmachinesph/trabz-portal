import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// We mock the _mock-guard module so we can control isMockEnabled() per test.
// By default, mock is enabled (development mode).
// ---------------------------------------------------------------------------
let mockEnabled = true

function buildMockToken(payload: { sub: number; role: string; email: string }): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64')
  return `mock.${encoded}.sig`
}

const MOCK_EMPLOYER_TOKEN = buildMockToken({ sub: 1, role: 'employer', email: 'maria@jollibuild.ph' })
const MOCK_ADMIN_TOKEN = buildMockToken({ sub: 999, role: 'admin', email: 'admin@trabz.ph' })
const MOCK_WORKER_TOKEN = buildMockToken({ sub: 2, role: 'worker', email: 'juan@trabz.ph' })

vi.mock('@/app/api/_mock-guard', () => ({
  isMockEnabled: () => mockEnabled,
  mockNotAvailable: () => NextResponse.json({ detail: 'Not found' }, { status: 404 }),
  parseMockToken: (request: NextRequest) => {
    if (!mockEnabled) return null
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    const token = authHeader.slice(7)
    const parts = token.split('.')
    if (parts.length !== 3 || parts[0] !== 'mock') return null
    try {
      return JSON.parse(Buffer.from(parts[1], 'base64').toString())
    } catch {
      return null
    }
  },
}))

// The route files use relative imports like '../../_mock-guard' or '../_mock-guard'.
// We also need to mock those relative paths. Vitest resolves them via the alias,
// but just in case we also mock common relative patterns.

describe('Mock API routes', () => {
  beforeEach(() => {
    mockEnabled = true
  })

  // ---------------------------------------------------------------------------
  // POST /api/auth/login
  // ---------------------------------------------------------------------------
  describe('POST /api/auth/login', () => {
    it('returns tokens for valid credentials', async () => {
      const { POST } = await import('@/app/api/auth/login/route')

      const req = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@trabz.ph', password: 'password123' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toHaveProperty('access_token')
      expect(body).toHaveProperty('refresh_token')
      expect(body).toHaveProperty('token_type', 'Bearer')
      expect(body.user.role).toBe('admin')
    })

    it('returns 401 for invalid credentials', async () => {
      const { POST } = await import('@/app/api/auth/login/route')

      const req = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'bad@test.com', password: 'wrong' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)

      expect(res.status).toBe(401)
      const body = await res.json()
      expect(body.detail).toBe('Invalid email or password')
    })

    it('authenticates employer account', async () => {
      const { POST } = await import('@/app/api/auth/login/route')

      const req = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'maria@jollibuild.ph', password: 'password123' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.user.role).toBe('employer')
    })
  })

  // ---------------------------------------------------------------------------
  // GET /api/jobs
  // ---------------------------------------------------------------------------
  describe('GET /api/jobs', () => {
    it('returns correct response shape {items, total, page, page_size}', async () => {
      const { GET } = await import('@/app/api/jobs/route')

      const req = new NextRequest('http://localhost:3000/api/jobs', {
        headers: { Authorization: `Bearer ${MOCK_EMPLOYER_TOKEN}` },
      })

      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toHaveProperty('items')
      expect(body).toHaveProperty('total')
      expect(body).toHaveProperty('page')
      expect(body).toHaveProperty('page_size')
      expect(Array.isArray(body.items)).toBe(true)
      expect(typeof body.total).toBe('number')
    })

    it('returns 401 when no auth header provided', async () => {
      const { GET } = await import('@/app/api/jobs/route')

      const req = new NextRequest('http://localhost:3000/api/jobs')

      const res = await GET(req)

      expect(res.status).toBe(401)
    })

    it('supports pagination via query params', async () => {
      const { GET } = await import('@/app/api/jobs/route')

      const req = new NextRequest('http://localhost:3000/api/jobs?page=1&limit=2', {
        headers: { Authorization: `Bearer ${MOCK_EMPLOYER_TOKEN}` },
      })

      const res = await GET(req)
      const body = await res.json()

      expect(body.page).toBe(1)
      expect(body.page_size).toBe(2)
      expect(body.items.length).toBeLessThanOrEqual(2)
    })
  })

  // ---------------------------------------------------------------------------
  // GET /api/admin/stats
  // ---------------------------------------------------------------------------
  describe('GET /api/admin/stats', () => {
    it('returns stats for admin token', async () => {
      const { GET } = await import('@/app/api/admin/stats/route')

      const req = new NextRequest('http://localhost:3000/api/admin/stats', {
        headers: { Authorization: `Bearer ${MOCK_ADMIN_TOKEN}` },
      })

      const res = await GET(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toHaveProperty('total_users')
      expect(body).toHaveProperty('total_jobs')
    })

    it('returns 403 for non-admin token', async () => {
      const { GET } = await import('@/app/api/admin/stats/route')

      const req = new NextRequest('http://localhost:3000/api/admin/stats', {
        headers: { Authorization: `Bearer ${MOCK_WORKER_TOKEN}` },
      })

      const res = await GET(req)

      expect(res.status).toBe(403)
      const body = await res.json()
      expect(body.detail).toContain('Admin')
    })

    it('returns 401 when not authenticated', async () => {
      const { GET } = await import('@/app/api/admin/stats/route')

      const req = new NextRequest('http://localhost:3000/api/admin/stats')

      const res = await GET(req)

      expect(res.status).toBe(401)
    })
  })

  // ---------------------------------------------------------------------------
  // Mock guard — prevents access in non-development
  // ---------------------------------------------------------------------------
  describe('mock guard', () => {
    it('returns 404 when mock is disabled (simulating production)', async () => {
      mockEnabled = false

      const { POST } = await import('@/app/api/auth/login/route')

      const req = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@trabz.ph', password: 'password123' }),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(req)

      expect(res.status).toBe(404)
    })

    it('returns 404 for jobs route when mock is disabled', async () => {
      mockEnabled = false

      const { GET } = await import('@/app/api/jobs/route')

      const req = new NextRequest('http://localhost:3000/api/jobs', {
        headers: { Authorization: `Bearer ${MOCK_EMPLOYER_TOKEN}` },
      })

      const res = await GET(req)

      expect(res.status).toBe(404)
    })
  })
})
