import { NextRequest, NextResponse } from 'next/server'
import { MOCK_COMPANIES } from '@/lib/mock-data'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../../../../_mock-guard'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
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

    if (tokenPayload.role !== 'admin') {
      return NextResponse.json(
        { detail: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { verified } = body

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 350))

    const { companyId: companyIdStr } = await params
    const companyId = parseInt(companyIdStr)
    const company = MOCK_COMPANIES.find((c) => c.id === companyId)

    if (!company) {
      return NextResponse.json(
        { detail: 'Company not found' },
        { status: 404 }
      )
    }

    // Return updated company
    return NextResponse.json({
      ...company,
      verified,
    })
  } catch (error) {
    console.error('Verify company error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
