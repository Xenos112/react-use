import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useImage from '.'

describe('useImage', () => {
  it('should fetch the image', async () => {
    const imageSrc = 'https://placehold.co/600x400'
    const { result } = renderHook(() => useImage(imageSrc))

    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeNull()

    await act(async () => {
      setTimeout(() => {
        expect(result.current).toEqual({
          isLoading: false,
          error: null,
        })
      }, 5000)
    })
  })

  it('should handle image load error', async () => {
    const invalidImageSrc = 'https://example.com/non-existent-image.jpg'
    const { result } = renderHook(() => useImage(invalidImageSrc))

    await act(async () => {
      // setting a timeout for the fetch
      setTimeout(() => {
        expect(result.current).toEqual({
          isLoading: false,
          error: expect.any(Error),
        })
      }, 5000)
    })
  }, { timeout: 10000 })
})
