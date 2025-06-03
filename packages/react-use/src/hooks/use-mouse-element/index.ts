import type { RefObject } from 'react'
import type { Coords } from '../use-mouse/types'
import { useState } from 'react'
import useEvent from '../use-event'

/**
 * useMouseElement
 *
 * @param ref - The ref object to observe.
 * @returns The mouse position.
 * @description A hook To work with mouse positions.
 */
function useMouseElement<T extends HTMLElement>(
  ref: RefObject<T | null>,
): Readonly<Coords> {
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
  })

  useEvent(
    'pointermove',
    (event) => {
      if (!ref.current)
        return
      setCoords({
        x: event.offsetX,
        y: event.offsetY,
      })
    },
    ref,
  )

  return coords
}

export default useMouseElement
