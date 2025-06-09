import { act, fireEvent, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIdle } from '..'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useIdle', () => {
  it('should return the initial values', () => {
    const { result } = renderHook(() => useIdle())
    expect(result.current).toEqual({
      isIdle: false,
      lastActive: 0,
    })
  })

  it('should return the correct values when the user is idle', () => {
    const { result } = renderHook(() => useIdle())

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current).toEqual({
      isIdle: true,
      lastActive: 3,
    })
  })

  it('should run the onIdle callback when user is idle', () => {
    const onIdle = vi.fn()
    const { result } = renderHook(() => useIdle({ onIdle }))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current).toEqual({
      isIdle: true,
      lastActive: 2,
    })

    expect(onIdle).toHaveBeenCalledTimes(2)
    expect(onIdle).toHaveBeenCalledWith(0)
  })

  it('should update in each 200ms', () => {
    const { result } = renderHook(() => useIdle({ threshold: 0.2 }))

    act(() => {
      vi.advanceTimersByTime(1200)
    })

    expect(result.current).toEqual({
      isIdle: true,
      lastActive: 1.2,
    })

    act(() => {
      fireEvent.click(document)
    })

    expect(result.current).toEqual({
      isIdle: false,
      lastActive: -1,
    })
  })

  it('should update threshold with useState', () => {
    const { result: state } = renderHook(() => useState(0.2))

    const { result, rerender } = renderHook(
      () => useIdle({ threshold: state.current[0] }),
    )

    act(() => {
      vi.advanceTimersByTime(1200)
    })

    expect(result.current).toEqual({
      isIdle: true,
      lastActive: 1.2,
    })

    act(() => {
      state.current[1](1)
    })

    rerender()

    act(() => {
      fireEvent.click(document)
    })

    act(() => {
      vi.advanceTimersByTime(1200)
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.lastActive).toBeLessThan(1.2)
  })
})
