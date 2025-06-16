export interface UseAsyncStateOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (err: Error) => void
}

export interface UseAsyncStateReturnType<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isSettled: boolean
}
