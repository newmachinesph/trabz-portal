import { NextRequest, NextResponse } from 'next/server'
import { MOCK_APPLICATIONS } from '@/lib/mock-data'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../../../../_mock-guard'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
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
    await new Promise((resolve) => setTimeout(resolve, 250))

    const { jobId: jobIdStr } = await params
    const jobId = parseInt(jobIdStr)
    const applications = MOCK_APPLICATIONS.filter((app) => app.job_id === jobId)

    return NextResponse.json({
      items: applications,
      total: applications.length,
    })
  } catch (error) {
    console.error('Get applications error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
