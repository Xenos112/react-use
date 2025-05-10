import { useLayoutEffect, useRef, useState } from 'react'
import type { UseDraggableProps, ReturnType, Postion } from './types'

// TODO: add a localStorage key to save the position in the session
/**
 * useDraggable
 * @param opts
 * @returns [RefObject<T | null>, { x: number; y: number }]
 * @description A hook that makes an element draggable
 * @example const [ref, { x, y }] = useDraggable<HTMLDivElement>({ y: 100 })
 */
const useDraggable = <T extends HTMLElement>({
  x = 0,
  y = 0,
  disabled = false,
  onStart = (position: Postion = { x: 0, y: 0 }) => {},
  onMove = (position: Postion = { x: 0, y: 0 }) => {},
  onEnd = (position: Postion = { x: 0, y: 0 }) => {},
}: UseDraggableProps = {}): ReturnType<T> => {
  const ref = useRef<T>(null)
  let startX: number | null = 0
  let startY: number | null = 0
  const [xPosition, setXPosition] = useState(x)
  const [yPosition, setYPostion] = useState(y)
  const [isDragging, setIsDragging] = useState(false)
  const [lastPosition, setLastPosition] = useState<Postion>({
    x: xPosition,
    y: yPosition,
  })

  useLayoutEffect(() => {
    if (ref.current) {
      const currentX = (lastPosition.x ? lastPosition.x : x) + 'px'
      const currentY = (lastPosition.y ? lastPosition.y : y) + 'px'

      ref.current.style.position = 'fixed'
      ref.current.style.left = currentX
      ref.current.style.top = currentY
      ref.current.style.cursor = 'move'
      ref.current.style.zIndex = '1000'

      // prevent text selection
      ref.current.style.userSelect = 'none'

      const handleMouseDown = (event: MouseEvent) => {
        if (disabled) return
        const offsetX = ref.current!.offsetLeft!
        const offsetY = ref.current!.offsetTop!

        startX = event.clientX - offsetX
        startY = event.clientY - offsetY

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        onStart({ x: offsetX, y: offsetY })
        setLastPosition({ x: offsetX, y: offsetY })
      }

      const handleMouseMove = (event: MouseEvent) => {
        if (startX !== null && startY !== null) {
          const newLeft = event.clientX - startX
          const newTop = event.clientY - startY

          ref.current!.style.left = newLeft + 'px'
          ref.current!.style.top = newTop + 'px'

          onMove({ x: newLeft, y: newTop })
          setIsDragging(true)

          setXPosition(newLeft)
          setYPostion(newTop)
        }
      }

      const handleMouseUp = () => {
        startX = null
        startY = null
        const offsetX = ref.current!.offsetLeft!
        const offsetY = ref.current!.offsetTop!

        onEnd({ x: offsetX, y: offsetY })
        setIsDragging(false)
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
  }, [x, y, disabled])

  useLayoutEffect(() => {}, [disabled])

  return {
    ref,
    position: { x: xPosition, y: yPosition },
    isDragging,
  }
}

export default useDraggable
