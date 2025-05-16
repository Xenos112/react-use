import useEvent from '../use-event'
import { WindowSize } from './types'
import { useState } from 'react'

/**
 * @name useWindowSize
 * @description returns the current window size
 * @returns WindowSize - the current window size
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEvent('resize', handleResize)

  return windowSize
}

export default useWindowSize
