import { type RefObject, useState, useLayoutEffect } from 'react'
import type { Bounding } from './types'

/**
 * useElementBounding
 *
 * @param ref - The ref object to observe.
 * @returns The bounding object.
 * @description A hook work with element boundings in more of a reactive way.
 */
const useElementBounding = <T extends HTMLElement>(
  ref: RefObject<T | null>,
): Bounding => {
  const [bounding, setBounding] = useState<Omit<DOMRect, 'toJSON'>>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  })

  useLayoutEffect(() => {
    if (!ref.current) return
    const update = () => {
      const { width, height, top, left, bottom, right, x, y } =
        ref.current!.getBoundingClientRect()
      setBounding({
        width,
        height,
        top,
        left,
        bottom,
        right,
        x,
        y,
      })
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return bounding
}

export default useElementBounding
