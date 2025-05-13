import { useState } from 'react'
import type { Coords } from './types'
import useEvent from '../use-event'

const useMouse = () => {
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 })

  useEvent('pointermove', (e) => {
    setCoords({ x: e.clientX, y: e.clientY })
  })

  return coords
}

export default useMouse
