import type { UseIdleOptions, UseIdleReturnType } from './types'
import { useEffect, useState } from 'react'

/**
 * @name useIdle
 * @param opts options for the hook
 * @param opts.onIdle function that will be called when the user is idle
 * @param opts.threshold time pass to update the state
 * @returns {isIdle: boolean, lastActive: number} - object that have details about the idle
 * @description A hook To detect when the user is idle.
 * @example const { isIdle, lastActive } = useIdle()
 */
function useIdle({ onIdle, threshold = 1 }: UseIdleOptions = {}): UseIdleReturnType {
  const events = [
    'mousemove',
    'mousedown',
    'mouseup',
    'click',
    'dbclick',
    'keydown',
    'keyup',
    'keypress',
    'scroll',
    'wheel',
    'touchstart',
    'touchmove',
    'touchend',
    'pointermove',
    'pointerdown',
    'pointerup',
    'focus',
    'blur',
    'resize',
    'visibilitychage',
  ]
  const [isIdle, setIsIdle] = useState(false)
  const [lastActive, setLastActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsIdle(true)
      setLastActive(prev => prev + (threshold || 1))
      onIdle?.(lastActive)
    }, threshold * 1000 || 1000)

    function setNotIdle() {
      setIsIdle(false)
      setLastActive(-1)
    }

    for (const event of events) {
      document.addEventListener(event, setNotIdle)
    }

    return () => {
      clearInterval(interval)

      for (const event of events) {
        document.removeEventListener(event, setNotIdle)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActive, onIdle, threshold])

  return {
    isIdle,
    lastActive,
  }
}

export default useIdle
