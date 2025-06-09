import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useIdle } from '..'

// tests need improvement
describe('useIdle', () => {
  it('should return the initial values', () => {
    const { result } = renderHook(() => useIdle())
    expect(result.current).toEqual({
      isIdle: false,
      lastActive: 0,
    })
  })

  it('should return the correct values when the user is idle', async () => {
    const { result } = renderHook(() => useIdle())
    await waitFor(() => {
      expect(result.current).toEqual({
        isIdle: true,
        lastActive: 2,
      })
    }, { timeout: 3000 })
  })

  it('should run the onIdle callback when use idle', async () => {
    const onIdle = vi.fn()
    const { result } = renderHook(() => useIdle({ onIdle }))
    await waitFor(() => {
      expect(result.current).toEqual({
        isIdle: true,
        lastActive: 1,
      })
    }, { timeout: 2000 })

    expect(onIdle).toHaveBeenCalledTimes(1)
    expect(onIdle).toHaveBeenCalledWith(0)
  })
})
