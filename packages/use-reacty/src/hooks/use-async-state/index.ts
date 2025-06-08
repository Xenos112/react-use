import type { UseAsyncStateOptions, UseAsyncStateReturnType } from './types'
import { useCallback, useEffect, useState } from 'react'

function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  { onSuccess, onError }: UseAsyncStateOptions<T> = {},
): UseAsyncStateReturnType<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettled, setIsSettled] = useState(false)

  // Use useCallback to memoize the fetch function
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setIsSettled(false)
    setError(null)

    try {
      const result = await asyncFn()
      setData(result)
      setIsSettled(true)
      onSuccess?.(result)
    }
    catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      onError?.(err as Error)
    }
    finally {
      setIsLoading(false)
    }
  }, [asyncFn, onSuccess, onError])

  // Run the fetch on mount and when dependencies change
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    error,
    isLoading,
    isSettled,
  }
}

export default useAsyncState
