import { NextRequest, NextResponse } from 'next/server'
import { isMockEnabled, mockNotAvailable } from '../../_mock-guard'

export async function POST(request: NextRequest) {
  if (!isMockEnabled()) return mockNotAvailable()

  try {
    const body = await request.json()
    const { refresh_token } = body

    await new Promise((resolve) => setTimeout(resolve, 200))

    if (!refresh_token || !refresh_token.startsWith('mock_refresh_')) {
      return NextResponse.json(
        { detail: 'Invalid refresh token' },
        { status: 401 }
      )
    }

    const role = refresh_token.split('_')[2]
    const userId = role === 'admin' ? 999 : 1

    const mockPayload = Buffer.from(JSON.stringify({ sub: userId, role, email: `${role}@trabz.ph` })).toString('base64')
    const access_token = `mock.${mockPayload}.sig`
    const new_refresh_token = `mock_refresh_${role}_${Date.now()}`

    return NextResponse.json({
      access_token,
      refresh_token: new_refresh_token,
      token_type: 'Bearer',
    })
  } catch (error) {
    console.error('Refresh error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
