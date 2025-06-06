import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useImage from '.'

describe('useImage', () => {
  it('should fetch the image', async () => {
    const imageSrc = 'https://placehold.co/600x400'
    const { result } = renderHook(() => useImage({ src: imageSrc }))

    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeNull()

    await act(async () => {
      setTimeout(() => {
        expect(result.current).toEqual({
          isLoading: false,
          error: null,
          Image: expect.not.stringContaining,
        })
      }, 5000)
    })
  })

  it('should handle image load error', async () => {
    const invalidImageSrc = 'https://example.com/non-existent-image.jpg'
    const { result } = renderHook(() => useImage({ src: invalidImageSrc }))

    await act(async () => {
      setTimeout(() => {
        expect(result.current).toEqual({
          isLoading: false,
          error: expect.any(Error),
          Image: expect.not.stringContaining,
        })
      }, 5000)
    })
  })
})
