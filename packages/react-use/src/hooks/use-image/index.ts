import { useEffect, useState } from 'react'
import type { UseImageProps, UseImageReturnType } from './types'

/**
 * @name useImage
 * @description a hook to load an image from a url.
 * @param opts the options object.
 * @returns the image url, the error and a boolean indicating if the image is loading.
 */
const useImage = ({
  src,
  onLoad = () => {},
  onError = () => {},
}: UseImageProps): UseImageReturnType => {
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!src) {
      setImage(null)
      setError('src is required')
      return
    }
    setIsLoading(true)
    fetch(src, {})
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setImage(url)
        onLoad()
      })
      .catch((err) => {
        onError(err)
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      image && URL.revokeObjectURL(image)
      setImage(null)
      setError(null)
    }
  }, [src])

  return {
    image,
    error,
    isLoading,
  }
}

export default useImage
