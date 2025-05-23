import { useState } from 'react'
import type {
  UseLocalStorageOpts,
  ReturnType,
  LocalStorageValue,
} from './types'

/**
 * useLocalStorage
 * @param key - The key to use for localStorage
 * @param opts - The options for the hook
 * @returns [T | undefined, (value: T) => void]
 * @description A hook that allows you to use localStorage in more type-safe way
 * @example const [value, setValue] = useLocalStorage<string>('key', { initialValue: 'value' })
 */
const useLocalStorage = <T>(
  key: string,
  { initialValue = undefined }: UseLocalStorageOpts<T>,
): ReturnType<T> => {
  const [localStorageValue, setLocalStorageValue] = useState<
    LocalStorageValue<T>
  >(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue) return JSON.parse(storedValue) as T
    if (initialValue !== undefined) {
      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }

    return
  })

  const setValue = (
    value:
      | LocalStorageValue<T>
      | ((prev: LocalStorageValue<T>) => LocalStorageValue<T>),
  ) => {
    const newValue =
      typeof value === 'function'
        ? (value as (v: LocalStorageValue<T>) => LocalStorageValue<T>)(
            localStorageValue,
          )
        : value

    if (newValue === undefined) {
      setLocalStorageValue(undefined)
      localStorage.removeItem(key)
    } else {
      setLocalStorageValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    }
    return newValue
  }

  return [localStorageValue, setValue]
}

export default useLocalStorage
