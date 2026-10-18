import { NextRequest, NextResponse } from 'next/server'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../../_mock-guard'

export async function GET(request: NextRequest) {
  if (!isMockEnabled()) return mockNotAvailable()

  try {
    const tokenPayload = parseMockToken(request)
    if (!tokenPayload) {
      return NextResponse.json(
        { detail: 'Unauthorized' },
        { status: 401 }
      )
    }

    const role = tokenPayload.role

    await new Promise((resolve) => setTimeout(resolve, 200))

    if (role === 'employer') {
      return NextResponse.json({
        id: 1,
        email: 'maria@jollibuild.ph',
        name: 'Maria Santos',
        role: 'employer',
        company_id: 1,
        created_at: '2025-12-20',
      })
    } else if (role === 'admin') {
      return NextResponse.json({
        id: 999,
        email: 'admin@trabz.ph',
        name: 'Lino Navarra',
        role: 'admin',
        created_at: '2025-12-16',
      })
    } else {
      return NextResponse.json({
        id: 1,
        email: 'juan.delacruz@gmail.com',
        name: 'Juan Dela Cruz',
        role: 'worker',
        created_at: '2026-01-05',
      })
    }
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
