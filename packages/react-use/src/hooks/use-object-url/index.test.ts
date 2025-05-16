import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useObjectUrl from '.'

describe('useObjectUrl', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'mocked-url'),
      revokeObjectURL: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return a undefined when first called', () => {
    const { result } = renderHook(() => useObjectUrl())
    expect(result.current).toBe(undefined)
  })

  it('should create a object url from the blob', () => {
    const blob = new Blob(['hello'], { type: 'text/plain' })
    const { result } = renderHook(() => useObjectUrl(blob))
    expect(vi.mocked(window.URL.createObjectURL).mock.calls).toEqual([[blob]])
    expect(result.current).toBe('mocked-url')
  })
})
