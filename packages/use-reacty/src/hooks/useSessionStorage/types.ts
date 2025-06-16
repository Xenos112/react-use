export type SessionStorageValue<T> = T | undefined

export interface UseSessionStorageOpts<T> {
  initialValue?: T
  onChange?: (value: SessionStorageValue<T>) => void
}

export type ReturnType<T> = [
  SessionStorageValue<T>,
  (
    value:
      | SessionStorageValue<T>
      | ((value: SessionStorageValue<T>) => SessionStorageValue<T>),
  ) => SessionStorageValue<T>,
]
