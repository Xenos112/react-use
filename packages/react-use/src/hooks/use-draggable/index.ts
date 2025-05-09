import { useLayoutEffect, useRef, useState } from 'react'
import type { UseDraggableProps, ReturnType } from './types'

// TODO: add a localStorage key to save the position in the session
/**
 * useDraggable
 * @param opts
 * @returns [RefObject<T | null>, { x: number; y: number }]
 * @description A hook that makes an element draggable
 * @example const [ref, { x, y }] = useDraggable<HTMLDivElement>({ y: 100 })
 */
const useDraggable = <T extends HTMLElement>(
  opts?: UseDraggableProps,
): ReturnType<T> => {
  const ref = useRef<T>(null)
  const x = opts?.x || 0
  const y = opts?.y || 0
  let startX: number | null = 0
  let startY: number | null = 0
  const [xPosition, setXPosition] = useState(x)
  const [yPosition, setYPostion] = useState(y)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.position = 'fixed'
      ref.current.style.left = x + 'px'
      ref.current.style.top = y + 'px'
      ref.current.style.cursor = 'move'
      ref.current.style.zIndex = '1000'

      // prevent text selection
      ref.current.style.userSelect = 'none'

      const handleMouseDown = (event: MouseEvent) => {
        startX = event.clientX - ref.current!.offsetLeft
        startY = event.clientY - ref.current!.offsetTop

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }

      const handleMouseMove = (event: MouseEvent) => {
        if (startX !== null && startY !== null) {
          const newLeft = event.clientX - startX
          const newTop = event.clientY - startY

          ref.current!.style.left = newLeft + 'px'
          ref.current!.style.top = newTop + 'px'

          setXPosition(newLeft)
          setYPostion(newTop)
        }
      }

      const handleMouseUp = () => {
        startX = null
        startY = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      ref.current.addEventListener('mousedown', handleMouseDown)

      return () => {
        ref.current &&
          ref.current.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [x, y])

  return [ref, { x: xPosition, y: yPosition }]
}

export default useDraggable
