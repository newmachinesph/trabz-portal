import { NextRequest, NextResponse } from 'next/server'
import { MOCK_JOBS } from '@/lib/mock-data'
import { isMockEnabled, mockNotAvailable, parseMockToken } from '../../_mock-guard'

// Allowed fields for job updates
const ALLOWED_UPDATE_FIELDS = [
  'title', 'description', 'category', 'location',
  'salary_min', 'salary_max', 'job_type', 'status',
  'requirements', 'benefits', 'expires_at',
] as const

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
    const jobId = parseInt(id)

    if (isNaN(jobId)) {
      return NextResponse.json(
        { detail: 'Invalid job ID' },
        { status: 400 }
      )
    }

    const job = MOCK_JOBS.find((j) => j.id === jobId)

    if (!job) {
      return NextResponse.json(
        { detail: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Get job error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
    const jobId = parseInt(id)

    if (isNaN(jobId)) {
      return NextResponse.json(
        { detail: 'Invalid job ID' },
        { status: 400 }
      )
    }

    const job = MOCK_JOBS.find((j) => j.id === jobId)

    if (!job) {
      return NextResponse.json(
        { detail: 'Job not found' },
        { status: 404 }
      )
    }

    // Pick only allowed fields — do not spread raw body
    const picked: Record<string, unknown> = {}
    for (const key of ALLOWED_UPDATE_FIELDS) {
      if (key in body) picked[key] = body[key]
    }

    // Return updated job
    return NextResponse.json({
      ...job,
      ...picked,
    })
  } catch (error) {
    console.error('Update job error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
    await new Promise((resolve) => setTimeout(resolve, 250))

    const { id } = await params
    const jobId = parseInt(id)

    if (isNaN(jobId)) {
      return NextResponse.json(
        { detail: 'Invalid job ID' },
        { status: 400 }
      )
    }

    const job = MOCK_JOBS.find((j) => j.id === jobId)

    if (!job) {
      return NextResponse.json(
        { detail: 'Job not found' },
        { status: 404 }
      )
    }

    // In real app, would delete from database
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete job error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
