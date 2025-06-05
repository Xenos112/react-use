import type { Coords } from './types'
import { useState } from 'react'
import useEvent from '../use-event'

/**
 * @name useMouse
 * @returns The mouse position.
 * @description A hook To work with mouse positions.
 */
function useMouse(): Readonly<Coords> {
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 })

  useEvent('pointermove', (e) => {
    setCoords({ x: e.clientX, y: e.clientY })
  })

  return coords
}

export default useMouse
