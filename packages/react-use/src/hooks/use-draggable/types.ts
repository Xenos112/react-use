import type { RefObject } from 'react'

export interface Postion {
  x: number
  y: number
}
export type Axis = 'x' | 'y' | 'both'

export interface ReturnType<T> {
  ref: RefObject<T | null>
  position: Postion
  isDragging: boolean
}

export interface UseDraggableProps {
  x?: number
  y?: number
  onStart?: (position: Postion) => void
  onMove?: (position: Postion) => void
  onEnd?: (position: Postion) => void
  disabled?: boolean
  axis?: Axis
  preventDefault?: boolean
}
