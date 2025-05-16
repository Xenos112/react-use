import { describe, it, expect } from 'vitest'
import useWindowSize from '.'
import { act, renderHook } from '@testing-library/react'

describe('useWindowSize', () => {
  it('should return the initial window size', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    })

    Object.defineProperty(window, 'innerHeight', {
      value: 768,
      writable: true,
    })
    const { result } = renderHook(() => useWindowSize())
    expect(result.current).toEqual({ width: 1024, height: 768 })
  })

  it('should return the updated window size', () => {
    const { result } = renderHook(() => useWindowSize())
    expect(result.current).toEqual({ width: 1024, height: 768 })

    Object.defineProperty(window, 'innerWidth', {
      value: 2048,
      writable: true,
    })

    Object.defineProperty(window, 'innerHeight', {
      value: 1024,
      writable: true,
    })

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({ width: 2048, height: 1024 })
  })
})
