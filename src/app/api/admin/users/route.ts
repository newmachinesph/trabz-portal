import { NextRequest, NextResponse } from 'next/server'
import { MOCK_WORKERS, MOCK_EMPLOYERS } from '@/lib/mock-data'
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

    // Combine workers and employers
    const allUsers = [
      ...MOCK_EMPLOYERS.map((emp) => ({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        role: 'employer',
        status: emp.status,
        plan: emp.plan,
        company: emp.company,
      })),
      ...MOCK_WORKERS.map((worker) => ({
        id: worker.id + 1000, // Offset to avoid ID collision
        name: worker.name,
        email: worker.email,
        role: 'worker',
        status: 'active',
        location: worker.location,
      })),
    ]

    return NextResponse.json({
      items: allUsers,
      total: allUsers.length,
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
