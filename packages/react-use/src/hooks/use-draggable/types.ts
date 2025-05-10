import { type RefObject } from 'react'

export type Postion = { x?: number; y?: number }

export type ReturnType<T> = {
  ref: RefObject<T | null>
  position: Required<Postion>
  isDragging: boolean
}

export type UseDraggableProps = {
  x?: number
  y?: number
  onStart?: (position?: Postion) => void
  onMove?: (position?: Postion) => void
  onEnd?: (position?: Postion) => void
  disabled?: boolean
}
