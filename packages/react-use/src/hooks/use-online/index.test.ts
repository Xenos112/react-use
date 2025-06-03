import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useOnline from '.'

describe('useOnline', () => {
  it('should return true if the user is online', () => {
    const { result } = renderHook(() => useOnline())
    expect(result.current).toBe(true)
  })

  it('should be reactive to online and offline events', () => {
    const { result, rerender } = renderHook(() => useOnline())
    expect(result.current).toBe(true)

    window.dispatchEvent(new Event('offline'))
    rerender()
    expect(result.current).toBe(false)

    window.dispatchEvent(new Event('online'))
    rerender()
    expect(result.current).toBe(true)
  })
})
