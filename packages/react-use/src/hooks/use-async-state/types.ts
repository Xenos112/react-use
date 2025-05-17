export type UseAsyncStateOptions<T> = {
  onSuccess?: (data: T) => void
  onError?: (err: Error) => void
}

export type UseAsyncStateReturnType<T> = {
  data: T | null
  error: Error | null
  isLoading: boolean
  isSettled: boolean
}
