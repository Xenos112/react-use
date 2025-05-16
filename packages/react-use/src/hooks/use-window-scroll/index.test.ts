import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useWindowScroll from '.'

describe('useWindowScroll', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should work', () => {
    const { result } = renderHook(() => useWindowScroll())
    expect(result.current.x).toEqual(0)
    expect(result.current.y).toEqual(0)
  })

  it('should scroll to x = 100', () => {
    let mockScrollX = 0

    Object.defineProperty(window, 'scrollX', {
      configurable: true,
      get: () => mockScrollX,
    })

    vi.stubGlobal('scrollBy', ({ left }: { left: number }) => {
      mockScrollX += left
      window.dispatchEvent(new Event('scroll'))
    })

    const { result } = renderHook(() => useWindowScroll())

    expect(result.current.x).toBe(0)

    act(() => {
      result.current.scrollX(100)
    })

    expect(result.current.x).toBe(100)
  })

  it('should scroll to x = 100', () => {
    let mockScrollY = 0

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => mockScrollY,
    })

    vi.stubGlobal('scrollBy', ({ top }: { top: number }) => {
      mockScrollY += top
      window.dispatchEvent(new Event('scroll'))
    })

    const { result } = renderHook(() => useWindowScroll())

    expect(result.current.y).toBe(0)

    act(() => {
      result.current.scrollY(100)
    })

    expect(result.current.y).toBe(100)
  })
})
