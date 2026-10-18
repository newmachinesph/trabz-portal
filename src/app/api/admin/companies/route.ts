import { NextRequest, NextResponse } from 'next/server'
import { MOCK_COMPANIES } from '@/lib/mock-data'
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

    if (tokenPayload.role !== 'admin') {
      return NextResponse.json(
        { detail: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      items: MOCK_COMPANIES,
      total: MOCK_COMPANIES.length,
    })
  } catch (error) {
    console.error('Get admin companies error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
