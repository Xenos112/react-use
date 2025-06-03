import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useWindowScroll from '.'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('useWindowScroll', () => {
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
    expect(window.scrollX).toBe(result.current.x)
  })

  it('should scroll to y = 100', () => {
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
    expect(window.scrollY).toBe(result.current.y)
  })

  it('should move to x and y positions', () => {
    let mockScrollY = 0
    let mockScrollX = 0

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => mockScrollY,
    })

    Object.defineProperty(window, 'scrollX', {
      configurable: true,
      get: () => mockScrollX,
    })

    vi.stubGlobal(
      'scrollBy',
      ({ top, left }: { top: number, left: number }) => {
        mockScrollY += top
        mockScrollX += left
        window.dispatchEvent(new Event('scroll'))
      },
    )

    const { result } = renderHook(() => useWindowScroll())

    expect(result.current.y).toBe(0)
    expect(result.current.x).toBe(0)

    act(() => {
      result.current.scroll(100, 200)
    })

    expect(result.current.y).toBe(200)
    expect(window.scrollY).toBe(result.current.y)
    expect(result.current.x).toBe(100)
    expect(window.scrollX).toBe(result.current.x)
  })
})
