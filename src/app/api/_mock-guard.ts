import { NextRequest, NextResponse } from 'next/server'

const NOT_FOUND = NextResponse.json({ detail: 'Not found' }, { status: 404 })

export function isMockEnabled(): boolean {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.ENABLE_MOCK_API === 'true'
  )
}

export function mockNotAvailable(): NextResponse {
  return NOT_FOUND
}

/**
 * Parse a structured mock JWT token and return the decoded payload.
 * Expected format: "mock.<base64-payload>.sig"
 * Returns null if the token is missing or malformed.
 */
export function parseMockToken(
  request: NextRequest
): { sub: number; role: string; email: string } | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  const token = authHeader.slice(7)
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== 'mock') return null

  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
    if (!payload.sub || !payload.role) return null
    return payload
  } catch {
    return null
  }
}
