import { useState } from 'react'
import useEvent from '../use-event'

/**
 * @name useOnline
 * @returns {boolean} - boolean to indicate if the user is online
 * @description A hook that returns true if the user is online
 * @example const isOnline = useOnline()
 */
function useOnline(): boolean {
  const [online, setOnline] = useState(navigator.onLine)

  useEvent('online', () => setOnline(true))
  useEvent('offline', () => setOnline(false))

  return online
}

export default useOnline
