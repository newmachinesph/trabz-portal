import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { proxy as middleware } from '@/proxy'

function createRequest(path: string, cookieToken?: string): NextRequest {
  const url = new URL(path, 'http://localhost:3000')
  const req = new NextRequest(url)

  if (cookieToken) {
    // NextRequest cookies are read-only so we build a proper request with the cookie header
    const reqWithCookie = new NextRequest(url, {
      headers: {
        cookie: `access_token=${cookieToken}`,
      },
    })
    return reqWithCookie
  }

  return req
}

describe('middleware', () => {
  // ---------------------------------------------------------------------------
  // Unauthenticated access to protected routes
  // ---------------------------------------------------------------------------
  it('redirects unauthenticated /dashboard to /login', () => {
    const req = createRequest('/dashboard')
    const res = middleware(req)

    expect(res.status).toBe(307)
    const location = new URL(res.headers.get('location')!)
    expect(location.pathname).toBe('/login')
    expect(location.searchParams.get('redirect')).toBe('/dashboard')
  })

  it('redirects unauthenticated /admin to /login', () => {
    const req = createRequest('/admin')
    const res = middleware(req)

    expect(res.status).toBe(307)
    const location = new URL(res.headers.get('location')!)
    expect(location.pathname).toBe('/login')
    expect(location.searchParams.get('redirect')).toBe('/admin')
  })

  it('redirects unauthenticated /admin/users to /login', () => {
    const req = createRequest('/admin/users')
    const res = middleware(req)

    expect(res.status).toBe(307)
    const location = new URL(res.headers.get('location')!)
    expect(location.pathname).toBe('/login')
  })

  // ---------------------------------------------------------------------------
  // Authenticated access to auth pages
  // ---------------------------------------------------------------------------
  it('redirects authenticated /login to /dashboard', () => {
    const req = createRequest('/login', 'valid-token')
    const res = middleware(req)

    expect(res.status).toBe(307)
    const location = new URL(res.headers.get('location')!)
    expect(location.pathname).toBe('/dashboard')
  })

  it('redirects authenticated /register to /dashboard', () => {
    const req = createRequest('/register', 'valid-token')
    const res = middleware(req)

    expect(res.status).toBe(307)
    const location = new URL(res.headers.get('location')!)
    expect(location.pathname).toBe('/dashboard')
  })

  // ---------------------------------------------------------------------------
  // Passthrough — static, API, and public routes
  // ---------------------------------------------------------------------------
  it('does not intercept /_next paths', () => {
    const req = createRequest('/_next/static/chunk.js')
    const res = middleware(req)

    // NextResponse.next() does not set a location header
    expect(res.headers.get('location')).toBeNull()
  })

  it('does not intercept /api routes', () => {
    const req = createRequest('/api/auth/login')
    const res = middleware(req)

    expect(res.headers.get('location')).toBeNull()
  })

  it('does not intercept static files', () => {
    const paths = ['/logo.svg', '/photo.png', '/bg.jpg', '/icon.ico', '/styles.css']
    for (const p of paths) {
      const req = createRequest(p)
      const res = middleware(req)
      expect(res.headers.get('location')).toBeNull()
    }
  })

  // ---------------------------------------------------------------------------
  // Authenticated access to protected routes passes through
  // ---------------------------------------------------------------------------
  it('allows authenticated access to /dashboard', () => {
    const req = createRequest('/dashboard', 'valid-token')
    const res = middleware(req)

    expect(res.headers.get('location')).toBeNull()
  })

  // ---------------------------------------------------------------------------
  // Unauthenticated access to public pages passes through
  // ---------------------------------------------------------------------------
  it('allows unauthenticated access to /login', () => {
    const req = createRequest('/login')
    const res = middleware(req)

    expect(res.headers.get('location')).toBeNull()
  })

  it('allows unauthenticated access to /', () => {
    const req = createRequest('/')
    const res = middleware(req)

    expect(res.headers.get('location')).toBeNull()
  })
})
