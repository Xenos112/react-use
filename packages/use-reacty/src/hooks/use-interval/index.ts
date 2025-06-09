import type { UseIntervalReturn } from './types'
import { useCallback, useEffect, useState } from 'react'

function useInterval(intervalFn: () => void, threshold: number = 1000): UseIntervalReturn {
  const [isActive, setActive] = useState(true)
  const intervalFnCallback = useCallback(intervalFn, [intervalFn])

  const pause = () => setActive(false)
  const resume = () => setActive(true)

  useEffect(() => {
    if (!isActive)
      return
    const interval = setInterval(
      intervalFnCallback,
      threshold,
    )
    return () => {
      clearInterval(interval)
    }
  }, [isActive, intervalFnCallback, threshold])

  return {
    isActive,
    pause,
    resume,
  }
}

export default useInterval
