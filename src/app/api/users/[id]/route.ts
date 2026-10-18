import { NextRequest, NextResponse } from 'next/server'
import { MOCK_WORKERS } from '@/lib/mock-data'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../../_mock-guard'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    await new Promise((resolve) => setTimeout(resolve, 200))

    const { id } = await params
    const userId = parseInt(id)

    // Find worker by ID
    const worker = MOCK_WORKERS.find((w) => w.id === userId)

    if (!worker) {
      return NextResponse.json(
        { detail: 'User not found' },
        { status: 404 }
      )
    }

    // Return user in API format
    return NextResponse.json({
      id: worker.id,
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      role: 'worker',
      avatar_url: null,
      location: worker.location,
      bio: null,
      skills: worker.skills,
      created_at: '2025-01-01',
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
