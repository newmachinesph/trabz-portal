import { NextRequest, NextResponse } from 'next/server'
import { isMockEnabled, mockNotAvailable } from '../../_mock-guard'

// Mock test accounts — only available in development
const MOCK_ACCOUNTS = [
  {
    email: 'admin@trabz.ph',
    password: 'password123',
    role: 'admin',
    name: 'Lino Navarra',
  },
  {
    email: 'maria@jollibuild.ph',
    password: 'password123',
    role: 'employer',
    name: 'Maria Santos',
    company_id: 1,
  },
  {
    email: 'juan.delacruz@gmail.com',
    password: 'password123',
    role: 'worker',
    name: 'Juan Dela Cruz',
  },
]

export async function POST(request: NextRequest) {
  if (!isMockEnabled()) return mockNotAvailable()

  try {
    const body = await request.json()
    const { email, password } = body

    await new Promise((resolve) => setTimeout(resolve, 300))

    const account = MOCK_ACCOUNTS.find(
      (acc) => acc.email === email && acc.password === password
    )

    if (!account) {
      return NextResponse.json(
        { detail: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const userId = account.role === 'admin' ? 999 : 1
    const mockPayload = Buffer.from(JSON.stringify({ sub: userId, role: account.role, email: account.email })).toString('base64')
    const access_token = `mock.${mockPayload}.sig`
    const refresh_token = `mock_refresh_${account.role}_${Date.now()}`

    return NextResponse.json({
      access_token,
      refresh_token,
      token_type: 'Bearer',
      user: {
        id: account.role === 'admin' ? 999 : 1,
        email: account.email,
        name: account.name,
        role: account.role,
        company_id: (account as { company_id?: number }).company_id,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}
