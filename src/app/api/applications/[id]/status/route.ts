import { NextRequest, NextResponse } from 'next/server'
import { MOCK_APPLICATIONS } from '@/lib/mock-data'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../../../_mock-guard'

const VALID_STATUSES = ['applied', 'screened', 'interviewed', 'offered', 'hired', 'rejected']

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
    // Only pick allowed fields
    const status = body.status
    const notes = body.notes

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const { id } = await params
    const applicationId = parseInt(id)

    if (isNaN(applicationId)) {
      return NextResponse.json(
        { detail: 'Invalid application ID' },
        { status: 400 }
      )
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { detail: 'Invalid status value' },
        { status: 400 }
      )
    }

    const application = MOCK_APPLICATIONS.find((app) => app.id === applicationId)

    if (!application) {
      return NextResponse.json(
        { detail: 'Application not found' },
        { status: 404 }
      )
    }

    // Return updated application
    return NextResponse.json({
      ...application,
      status,
      notes: notes || application.notes,
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Update application status error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
