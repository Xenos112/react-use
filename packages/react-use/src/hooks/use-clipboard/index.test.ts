import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useClipboard from '.'
import { act, renderHook } from '@testing-library/react'

describe('useClipboard', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(),
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should copy a value to clipboard', () => {
    const { result } = renderHook(() => useClipboard())
    act(() => {
      result.current.copy('hello')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    expect(result.current.text).toBe('hello')
  })

  it('it should copy and call onCopy function', () => {
    const onCopy = vi.fn()
    const { result } = renderHook(() =>
      useClipboard({
        onCopy,
      }),
    )
    act(() => {
      result.current.copy('hello')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    expect(result.current.text).toBe('hello')
    expect(onCopy).toHaveBeenCalledWith('hello')
  })
})
