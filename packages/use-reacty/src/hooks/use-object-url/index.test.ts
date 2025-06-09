import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useObjectUrl from '.'

describe('useObjectUrl', () => {
  beforeEach(() => {
    const fakeMediaSource = vi.fn(() => { })
    vi.stubGlobal('MediaSource', fakeMediaSource)
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

  it('should create a object url from the MediaSource', () => {
    const blob = new Blob(['hello'], { type: 'text/plain' })
    const file = new File([blob], 'main.txt')

    const { result } = renderHook(() => useObjectUrl(file))
    expect(vi.mocked(window.URL.createObjectURL).mock.calls).toEqual([[file]])
    expect(result.current).toBe('mocked-url')
  })

  it('should create an object URL from the MediaSource', () => {
    const mediaSource = new MediaSource()

    const { result } = renderHook(() => useObjectUrl(mediaSource))

    expect(vi.mocked(window.URL.createObjectURL).mock.calls).toEqual([[mediaSource]])
    expect(result.current).toBe('mocked-url')
  })
})
