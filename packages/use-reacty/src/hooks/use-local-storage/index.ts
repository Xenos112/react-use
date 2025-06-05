import type {
  LocalStorageValue,
  ReturnType,
  UseLocalStorageOpts,
} from './types'
import { useState } from 'react'
import typeToString from '../../utils/typeToString'

/**
 * useLocalStorage
 * @param key - The key to use for localStorage
 * @param opts - The options for the hook
 * @param opts.initialValue - The initial value for the storage item
 * @param opts.onChange - callback to run when the value is updated
 * @returns [T | undefined, (value: T) => void]
 * @description A hook that allows you to use localStorage in more type-safe way
 * @example const [value, setValue] = useLocalStorage<string>('key', { initialValue: 'value' })
 */
function useLocalStorage<T>(
  key: string,
  { initialValue = undefined, onChange = () => { } }: UseLocalStorageOpts<T>,
): ReturnType<T> {
  const [localStorageValue, setLocalStorageValue] = useState<
    LocalStorageValue<T>
  >(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue)
      return JSON.parse(storedValue) as T
    if (initialValue !== undefined) {
      const value = typeToString(initialValue)
      localStorage.setItem(key, value as string)
      return initialValue
    }
  })

  const setValue = (
    value:
      | LocalStorageValue<T>
      | ((prev: LocalStorageValue<T>) => LocalStorageValue<T>),
  ) => {
    const newValue
      = typeof value === 'function'
        ? (value as (v: LocalStorageValue<T>) => LocalStorageValue<T>)(
            localStorageValue,
          )
        : value

    const valueToString = typeToString(newValue)

    if (newValue === undefined) {
      setLocalStorageValue(undefined)
      localStorage.removeItem(key)
    }
    else {
      setLocalStorageValue(newValue)
      localStorage.setItem(key, valueToString as string)
    }

    onChange(newValue)

    return newValue
  }

  return [localStorageValue, setValue]
}

export default useLocalStorage
