import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}))

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

describe('Button component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn).toBeDefined()
    expect(btn.className).toContain('bg-blue-600')
  })

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const btn = screen.getByRole('button', { name: 'Delete' })
    expect(btn.className).toContain('bg-red-600')
  })

  it('renders with outline variant', () => {
    render(<Button variant="outline">Cancel</Button>)
    const btn = screen.getByRole('button', { name: 'Cancel' })
    expect(btn.className).toContain('border')
    expect(btn.className).toContain('bg-white')
  })

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button', { name: 'Ghost' })
    expect(btn.className).toContain('hover:bg-gray-100')
  })

  it('renders with link variant', () => {
    render(<Button variant="link">Link</Button>)
    const btn = screen.getByRole('button', { name: 'Link' })
    expect(btn.className).toContain('text-blue-600')
    expect(btn.className).toContain('underline-offset-4')
  })

  it('renders with different sizes', () => {
    const { container } = render(
      <>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">I</Button>
      </>
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons[0].className).toContain('h-8')
    expect(buttons[1].className).toContain('h-12')
    expect(buttons[2].className).toContain('w-10')
  })

  it('passes disabled attribute', () => {
    render(<Button disabled>Disabled</Button>)
    const btn = screen.getByRole('button', { name: 'Disabled' })
    expect(btn).toHaveProperty('disabled', true)
  })
})

describe('Badge component', () => {
  it('renders with default variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge.className).toContain('bg-blue-100')
    expect(badge.className).toContain('text-blue-800')
  })

  it('renders with success variant', () => {
    render(<Badge variant="success">Active</Badge>)
    const badge = screen.getByText('Active')
    expect(badge.className).toContain('bg-green-100')
    expect(badge.className).toContain('text-green-800')
  })

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Pending</Badge>)
    const badge = screen.getByText('Pending')
    expect(badge.className).toContain('bg-yellow-100')
    expect(badge.className).toContain('text-yellow-800')
  })

  it('renders with danger variant', () => {
    render(<Badge variant="danger">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge.className).toContain('bg-red-100')
    expect(badge.className).toContain('text-red-800')
  })

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Inactive</Badge>)
    const badge = screen.getByText('Inactive')
    expect(badge.className).toContain('bg-gray-100')
    expect(badge.className).toContain('text-gray-800')
  })
})

describe('Card component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeDefined()
  })

  it('renders with header, title, and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Body text</p>
        </CardContent>
      </Card>
    )
    expect(screen.getByText('My Title')).toBeDefined()
    expect(screen.getByText('Body text')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Hello</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('custom-class')
    expect(card.className).toContain('rounded-xl')
  })
})

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeDefined()
    expect(input.tagName).toBe('INPUT')
  })

  it('supports type prop', () => {
    render(<Input type="email" placeholder="Email" />)
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement
    expect(input.type).toBe('email')
  })

  it('applies base styles', () => {
    render(<Input placeholder="Styled" />)
    const input = screen.getByPlaceholderText('Styled')
    expect(input.className).toContain('rounded-lg')
    expect(input.className).toContain('border')
  })

  it('supports disabled state', () => {
    render(<Input disabled placeholder="Disabled" />)
    const input = screen.getByPlaceholderText('Disabled') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })
})
