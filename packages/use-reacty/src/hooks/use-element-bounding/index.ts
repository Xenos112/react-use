import type { RefObject } from 'react'
import { useCallback, useLayoutEffect, useState } from 'react'
import useEvent from '../use-event'

/**
 * @name useElementBounding
 * @param ref - The ref object to observe.
 * @returns The bounding object.
 * @description A hook work with element boundings in more of a reactive way.
 */
function useElementBounding<T extends HTMLElement>(
  ref: RefObject<T | null>,
): Omit<DOMRect, 'toJSON'> {
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

  const update = useCallback(() => {
    if (!ref.current)
      return
    const { width, height, top, left, bottom, right, x, y }
      = ref.current!.getBoundingClientRect()
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
  }, [ref])

  useLayoutEffect(() => {
    if (!ref.current)
      return
    update()

    const observer = new ResizeObserver(update)
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, update])

  useEvent('scroll', update)

  return bounding
}

export default useElementBounding
