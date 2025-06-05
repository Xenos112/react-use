import type { UseImageReturnType } from './types'
import { useEffect, useState } from 'react'

/**
 * @name useImage
 * @description a hook to track the image loading status.
 * @param src the image url to fetch
 * @returns the image url, the error and a boolean indicating if the image is loading.
 */
function useImage(src: string): UseImageReturnType {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      setIsLoading(false)
      setError(null)
    }

    image.onerror = () => {
      setIsLoading(false)
      setError(new Error(`Failed to load image: ${src}`))
    }

    return () => {
      setIsLoading(true)
      setError(null)
    }
  }, [src])

  return {
    isLoading,
    error,
  }
}

export default useImage
