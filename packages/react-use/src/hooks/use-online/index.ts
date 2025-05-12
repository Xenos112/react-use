import { useState } from 'react'
import useEvent from '../use-event'

/**
 * useOnline
 * @returns {boolean}
 * @description A hook that returns true if the user is online
 * @example const isOnline = useOnline()
 */
const useOnline = (): boolean => {
  const [online, setOnline] = useState(navigator.onLine)

  useEvent('online', () => setOnline(true))
  useEvent('offline', () => setOnline(false))

  return online
}

export default useOnline
