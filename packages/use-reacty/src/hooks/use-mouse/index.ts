import type { Coords } from './types'
import { useEffect, useState } from 'react'
import getCoordinates from '../../utils/getCoordinates'

/**
 * @name useMouse
 * @returns The mouse position.
 * @description A hook To work with mouse positions.
 */
function useMouse(): Readonly<Coords> {
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 })

  useEffect(() => {
    function onMove(e: PointerEvent | TouchEvent) {
      const { clientX, clientY } = getCoordinates(e)
      setCoords({ x: clientX, y: clientY })
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('touchmove', onMove)

    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('touchmove', onMove)
    }
  }, [])

  return coords
}

export default useMouse
