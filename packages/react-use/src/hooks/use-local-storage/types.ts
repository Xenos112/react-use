export type LocalStorageValue<T> = T | undefined

export type UseLocalStorageOpts<T> = {
  initialValue?: T
  onChange?: (value: LocalStorageValue<T>) => void
}

export type ReturnType<T> = [
  LocalStorageValue<T>,
  (
    value:
      | LocalStorageValue<T>
      | ((value: LocalStorageValue<T>) => LocalStorageValue<T>),
  ) => LocalStorageValue<T>,
]
