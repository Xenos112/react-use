import { useState } from 'react'
import type { WindowScroll } from './types'
import useEvent from '../use-event'
import { ScrollRestoration } from '@tanstack/react-router'

/**
 * @name useWindowScroll
 * @returns A `WindowScroll` object that contains the current scroll position and methods to scroll the window.
 * @description a hook To manage window scroll.
 */
const useWindowScroll = (): WindowScroll => {
  const [position, setPosition] = useState({
    x: window.scrollX,
    y: window.scrollY,
  })

  const scroll = (x: number, y: number) =>
    window.scrollBy({
      behavior: 'smooth',
      left: x,
      top: y,
    })

  useEvent('scroll', () => {
    setPosition({
      x: window.scrollX,
      y: window.scrollY,
    })
  })

  return {
    scrollX: (x) => scroll(x, 0),
    scrollY: (y) => scroll(0, y),
    scroll,
    ...position,
  }
}

export default useWindowScroll
