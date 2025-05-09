export type UseLocalStorageOpts<T> = {
  initialValue?: T
}

export type ReturnType<T> = [T | undefined, (value: T) => void]
