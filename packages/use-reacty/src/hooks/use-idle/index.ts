/* eslint-disable react-hooks/rules-of-hooks */
import type { UseIdleReturnType } from './types'
import { useEffect, useState } from 'react'
import useEvent from '../use-event'

/**
 * @name useIdle
 * @returns {isIdle: boolean, lastActive: number} - object that have details about the idle
 * @description A hook To detect when the user is idle.
 * @example const { isIdle, lastActive } = useIdle()
 */
function useIdle(): UseIdleReturnType {
  const events = ['mousemove', 'mousedown', 'mouseup', 'click', 'dbclick', 'keydown', 'keyup', 'keypress', 'scroll', 'wheel', 'touchstart', 'touchmove', 'touchend', 'pointermove', 'pointerdown', 'pointerup', 'focus', 'blur', 'resize', 'visibilitychage']
  const [isIdle, setIsIdle] = useState(false)
  const [lastActive, setLastActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsIdle(true)
      setLastActive(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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
