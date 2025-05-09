import { useCallback, useEffect, useState } from 'react'
import type { UseLocalStorageOpts, ReturnType } from './types'

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
  opts?: UseLocalStorageOpts<T>,
): ReturnType<T> => {
  const [localStorageValue, setLocalStorageValue] = useState<T | undefined>(
    () => {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key)!) as T
      } else if (opts?.initialValue) {
        localStorage.setItem(key, JSON.stringify(opts.initialValue))
        return opts.initialValue
      }
      return undefined
    },
  )

  const setValue = useCallback(
    (value: T | undefined) => {
      if (value === undefined) {
        setLocalStorageValue(undefined)
        localStorage.removeItem(key)
        return
      }

      setLocalStorageValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    },
    [key],
  )

  return [localStorageValue, setValue]
}

export default useLocalStorage
