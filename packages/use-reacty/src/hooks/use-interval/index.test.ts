import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useInterval from '.'

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should run the function 2 times with 1s interval', () => {
    const intervalFn = vi.fn()

    renderHook(() => useInterval(intervalFn, 1000))

    // Advance time
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(intervalFn).toHaveBeenCalledTimes(2)
  })

  it('should run once and stop after pause', () => {
    const intervalFn = vi.fn()
    const { result } = renderHook(() => useInterval(intervalFn, 1000))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      result.current.pause()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(intervalFn).toHaveBeenCalledTimes(1)
    expect(result.current.isActive).toBe(false)
  })

  it('should run once and stop after pause and twice after resume', () => {
    const intervalFn = vi.fn()
    const { result } = renderHook(() => useInterval(intervalFn, 1000))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      result.current.pause()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(intervalFn).toHaveBeenCalledTimes(1)
    expect(result.current.isActive).toBe(false)

    act(() => {
      result.current.resume()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(intervalFn).toHaveBeenCalledTimes(3)
    expect(result.current.isActive).toBe(true)
  })
})
