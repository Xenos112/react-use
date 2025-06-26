import type { UseImageOptions, UseImageReturnType } from './types'
import { createElement, useEffect, useState } from 'react'

/**
 * @name useImage
 * @description a hook to track the image loading status.
 * @param props the image data
 * @returns isLoading, error and Image component to use
 */
function useImage(props: UseImageOptions): UseImageReturnType {
  const {
    width,
    height,
    src,
    sizes,
    srcSet: srcset,
    crossorigin,
    className,
    loading,
    referrerPolicy,
    decoding,
    fetchPriority,
    isMap,
    useMap,
    alt,
  } = props
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const image = new Image(width, height)

    if (crossorigin)
      image.crossOrigin = crossorigin

    if (alt)
      image.alt = alt

    if (className)
      image.className = className

    if (decoding)
      image.decoding = decoding

    if (sizes)
      image.sizes = sizes

    if (srcset)
      image.srcset = srcset

    if (loading)
      image.loading = loading

    if (referrerPolicy)
      image.referrerPolicy = referrerPolicy

    if (fetchPriority)
      image.fetchPriority = fetchPriority

    if (isMap)
      image.isMap = isMap

    if (useMap)
      image.useMap = useMap

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
  }, [
    alt,
    className,
    crossorigin,
    decoding,
    fetchPriority,
    isMap,
    loading,
    referrerPolicy,
    sizes,
    src,
    srcset,
    useMap,
    width,
    height,
  ])

  return {
    isLoading,
    error,
    Image: () => createElement('img', { ...props }),
  }
}

export default useImage
