import { type RefObject, useLayoutEffect, useState } from 'react'
import type { Size } from './types'
import useEvent from '../use-event'

/**
 * useElementSize
 *
 * @description A hook work with element sizes in more of a reactive way.
 * @param ref The ref object to listen to the resize event.
 * @returns The size object with the width and height of the element.
 */
const useElementSize = <T extends HTMLElement>(
  ref: RefObject<T | null>,
): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return
    const { width, height } = ref.current.getBoundingClientRect()
    setSize({
      width,
      height,
    })
  }, [])

  useEvent(
    'resize',
    () => {
      if (!ref.current) return

      const { width, height } = ref.current.getBoundingClientRect()
      setSize({
        width,
        height,
      })
    },
    ref,
  )

  return size
}

export default useElementSize
