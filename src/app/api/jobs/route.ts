import { NextRequest, NextResponse } from 'next/server'
import { MOCK_JOBS } from '@/lib/mock-data'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../_mock-guard'

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

    // Get query params for pagination/filtering
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    // Filter jobs
    let filteredJobs = [...MOCK_JOBS]
    if (status) {
      filteredJobs = filteredJobs.filter((job) => job.status === status)
    }

    // Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

    return NextResponse.json({
      items: paginatedJobs,
      total: filteredJobs.length,
      page,
      page_size: limit,
    })
  } catch (error) {
    console.error('Get jobs error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Allowed fields for job creation
const ALLOWED_JOB_FIELDS = [
  'company_id', 'title', 'description', 'category', 'location',
  'salary_min', 'salary_max', 'job_type', 'requirements', 'benefits', 'expires_at',
] as const

export async function POST(request: NextRequest) {
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
    await new Promise((resolve) => setTimeout(resolve, 350))

    // Pick only allowed fields — do not spread raw body
    const picked: Record<string, unknown> = {}
    for (const key of ALLOWED_JOB_FIELDS) {
      if (key in body) picked[key] = body[key]
    }

    // Create new job with server-generated fields
    const newJob = {
      id: MOCK_JOBS.length + 1,
      company_id: picked.company_id ?? 1,
      company_name: 'JolliBuild Construction',
      posted_by: tokenPayload.sub,
      applications_count: 0,
      views: 0,
      posted_at: new Date().toISOString(),
      status: 'active' as const,
      ...picked,
    }

    // In real app, would save to database
    // MOCK_JOBS.push(newJob)

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.error('Create job error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
