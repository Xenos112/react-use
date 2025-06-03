import type { UseAsyncStateOptions, UseAsyncStateReturnType } from './types'
import { useEffect, useState } from 'react'

/**
 * @name useAsyncState
 * @description A hook To Load data asynchronously.
 * @param asyncFn The async function to be executed.
 * @param opts The options object.
 * @returns The data, the error and a boolean indicating if the data is loading or not.
 */
function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  { onSuccess, onError }: UseAsyncStateOptions<T> = {},
): UseAsyncStateReturnType<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettled, setIsSettled] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsSettled(false)
    setError(null)
    asyncFn()
      .then((data) => {
        setData(data)
        setIsSettled(true)
        onSuccess?.(data)
      })
      .catch((err) => {
        setError(err)
        onError?.(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [asyncFn, onSuccess, onError])

  return {
    data,
    error,
    isLoading,
    isSettled,
  }
}

export default useAsyncState
