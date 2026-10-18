import { describe, it, expect } from 'vitest'

describe('Portal smoke tests', () => {
  it('basic assertion works', () => {
    expect(1 + 1).toBe(2)
  })

  it('environment is jsdom', () => {
    expect(typeof document).toBe('object')
  })
})
