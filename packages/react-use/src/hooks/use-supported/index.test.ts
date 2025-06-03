import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useSupported from '.'

describe('useSupported', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      copy: 'hello',
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return false', () => {
    const { result } = renderHook(() => useSupported(() => navigator && 'getBattery' in navigator))

    expect(result.current).toBeFalsy()
  })

  it('should return true', () => {
    const { result } = renderHook(() => useSupported(() => navigator && 'copy' in navigator))

    expect(result.current).toBeTruthy()
  })
})
