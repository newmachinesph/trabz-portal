import { NextRequest, NextResponse } from 'next/server'
import { isMockEnabled, mockNotAvailable } from '../../_mock-guard'

export async function POST(request: NextRequest) {
  if (!isMockEnabled()) return mockNotAvailable()

  try {
    const body = await request.json()
    const { name, email, password } = body

    await new Promise((resolve) => setTimeout(resolve, 400))

    if (!name || !email || !password) {
      return NextResponse.json(
        { detail: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Always default to 'employer' — never allow the request body to set the role
    const role = 'employer'

    const userId = Math.floor(Math.random() * 1000)
    const mockPayload = Buffer.from(JSON.stringify({ sub: userId, role, email })).toString('base64')
    const access_token = `mock.${mockPayload}.sig`
    const refresh_token = `mock_refresh_${role}_${Date.now()}`

    return NextResponse.json({
      access_token,
      refresh_token,
      token_type: 'Bearer',
      user: {
        id: userId,
        email,
        name,
        role,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
