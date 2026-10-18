import { NextRequest, NextResponse } from 'next/server'
import { MOCK_COMPANIES } from '@/lib/mock-data'
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
    const companyId = parseInt(id)
    const company = MOCK_COMPANIES.find((c) => c.id === companyId)

    if (!company) {
      return NextResponse.json(
        { detail: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Get company error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Allowed fields for company updates
const ALLOWED_COMPANY_FIELDS = [
  'name', 'description', 'logo_url', 'industry', 'size', 'location', 'website',
] as const

export async function PATCH(
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

    const body = await request.json()

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const { id } = await params
    const companyId = parseInt(id)
    const company = MOCK_COMPANIES.find((c) => c.id === companyId)

    if (!company) {
      return NextResponse.json(
        { detail: 'Company not found' },
        { status: 404 }
      )
    }

    // Pick only allowed fields — do not spread raw body
    const picked: Record<string, unknown> = {}
    for (const key of ALLOWED_COMPANY_FIELDS) {
      if (key in body) picked[key] = body[key]
    }

    // Return updated company (in real app, would update in database)
    return NextResponse.json({
      ...company,
      ...picked,
    })
  } catch (error) {
    console.error('Update company error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
