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

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 250))

    // Return first company as array (assuming logged in employer belongs to company 1)
    return NextResponse.json([MOCK_COMPANIES[0]])
  } catch (error) {
    console.error('Get company error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
