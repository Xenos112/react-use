import { useState } from 'react'
import useEvent from '../useEvent'

/**
 * @name useOnline
 * @returns boolean to indicate if the user is online
 * @description A hook that returns true if the user is online
 * @example const isOnline = useOnline()
 */
function useOnline(): Readonly<boolean> {
  const [online, setOnline] = useState(navigator.onLine)

  useEvent('online', () => setOnline(true))
  useEvent('offline', () => setOnline(false))

  return online
}

export default useOnline
