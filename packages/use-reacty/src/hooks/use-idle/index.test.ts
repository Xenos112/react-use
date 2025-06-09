import { fireEvent, renderHook, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useIdle } from '..'

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

  it('should update in each 200ms', async () => {
    const { result } = renderHook(() => useIdle({ threshold: 0.2 }))
    await waitFor(() => {
      expect(result.current).toEqual({
        isIdle: true,
        lastActive: 1.2,
      })
    }, { timeout: 2200 })

    fireEvent.click(document)

    expect(result.current).toEqual({
      isIdle: false,
      lastActive: -1,
    })
  })
  it('should update threshold with useState', async () => {
    const { result: state } = renderHook(() => useState(0.2))
    const { result } = renderHook(() => useIdle({ threshold: state.current[0] }))
    await waitFor(() => {
      expect(result.current).toEqual({
        isIdle: true,
        lastActive: 1.2,
      })
    }, { timeout: 2200 })

    state.current[1](1)
    fireEvent.click(document)

    await waitFor(() => {
      expect(result.current).not.toEqual({
        isIdle: false,
        lastActive: 1.2,
      })
    }, { timeout: 2200 })
  })
})
