import type {
  ReturnType,
  SessionStorageValue,
  UseSessionStorageOpts,
} from './types'
import { useState } from 'react'

/**
 * @name useSessionStorage
 * @param key - The key to use for sessionStorage
 * @param opts - The options for the hook
 * @param opts.initialValue - The initial value for the storage item
 * @returns [T | undefined, (value: T) => void]
 * @description A hook that allows you to use sessionStorage in more type-safe way
 * @example const [value, setValue] = useSessionStorage<string>('key', { initialValue: 'value' })
 */
function useSessionStorage<T>(
  key: string,
  { initialValue = undefined }: UseSessionStorageOpts<T>,
): ReturnType<T> {
  const [localStorageValue, setLocalStorageValue] = useState<
    SessionStorageValue<T>
  >(() => {
    const storedValue = sessionStorage.getItem(key)
    if (storedValue)
      return JSON.parse(storedValue) as T
    if (initialValue !== undefined) {
      sessionStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }
  })

  const setValue = (
    value:
      | SessionStorageValue<T>
      | ((prev: SessionStorageValue<T>) => SessionStorageValue<T>),
  ) => {
    const newValue
      = typeof value === 'function'
        ? (value as (v: SessionStorageValue<T>) => SessionStorageValue<T>)(
            localStorageValue,
          )
        : value

    if (newValue === undefined) {
      setLocalStorageValue(undefined)
      sessionStorage.removeItem(key)
    }
    else {
      setLocalStorageValue(newValue)
      sessionStorage.setItem(key, JSON.stringify(newValue))
    }
    return newValue
  }

  return [localStorageValue, setValue]
}

export default useSessionStorage
