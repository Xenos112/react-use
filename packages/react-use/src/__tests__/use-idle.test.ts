import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useIdle } from '../hooks'

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
    waitFor(() => {
      new Promise(() => setTimeout(() => {}, 3000)).then(() => {
        expect(result.current).toEqual({
          isIdle: true,
          lastActive: 2,
        })
      })
    })
  })
})
