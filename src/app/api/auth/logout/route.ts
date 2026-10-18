import { NextRequest, NextResponse } from 'next/server'
import { isMockEnabled, mockNotAvailable } from '../../_mock-guard'

export async function POST(request: NextRequest) {
  if (!isMockEnabled()) return mockNotAvailable()

  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
