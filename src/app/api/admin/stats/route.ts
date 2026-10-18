import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PLATFORM_STATS } from '@/lib/mock-data'
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

    return NextResponse.json(MOCK_PLATFORM_STATS)
  } catch (error) {
    console.error('Get admin stats error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
