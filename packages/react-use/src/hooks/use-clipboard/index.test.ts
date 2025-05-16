import { describe, it, expect, vi } from 'vitest'
import useClipboard from '.'
import { act, renderHook } from '@testing-library/react'

describe('useClipboard', () => {
  it('should copy a value to clipboard', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
    })

    const { result } = renderHook(() => useClipboard())
    act(() => {
      result.current.copy('hello')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    expect(result.current.text).toBe('hello')
  })
})
