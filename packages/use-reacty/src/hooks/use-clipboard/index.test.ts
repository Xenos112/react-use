import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useClipboard from '.'

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
