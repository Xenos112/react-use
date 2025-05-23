import { useEffect, useState } from 'react'
import type { UseImageReturnType } from './types'

/**
 * @name useImage
 * @description a hook to track the image loading status.
 * @param opts the options object.
 * @returns the image url, the error and a boolean indicating if the image is loading.
 */
const useImage = (src: string): UseImageReturnType => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | string>('')

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      setIsLoading(false)
      setError(null)
    }

    image.onerror = () => {
      setIsLoading(false)
      setError('failed to load image')
    }
    return () => {
      image.onload = null
      image.onerror = null
      setIsLoading(true)
      setError(null)
    }
  }, [src])

  return {
    error,
    isLoading,
  }
}

export default useImage
