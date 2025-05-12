import { useEffect, useState } from 'react'
import useEvent from '../use-event'
import type { UseIdleReturnType } from './types'

/**
 * useIdle
 *
 * @returns {isIdle: boolean, lastActive: number}
 * @description A hook To detect when the user is idle.
 * @example const { isIdle, lastActive } = useIdle()
 */
const useIdle = (): UseIdleReturnType => {
  let events: string[] = []
  const [isIdle, setIsIdle] = useState(false)
  const [lastActive, setLastActive] = useState(0)

  // get all events
  for (const property in document) {
    var match = property.match(/^on(.*)/)
    if (match) {
      events.push(match[1])
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsIdle(true)
      setLastActive((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // this might be a bit heavy, but it's the only way to get the events from the document
  // maybe later we should only listen to just the events we need
  for (const event of events) {
    useEvent(event as any, () => {
      setIsIdle(false)
      setLastActive(-1)
    })
  }

  return {
    isIdle,
    lastActive,
  }
}

export default useIdle
