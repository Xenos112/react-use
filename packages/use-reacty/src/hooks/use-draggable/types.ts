import type { RefObject } from 'react'

export interface Position {
  x: number
  y: number
}
export type Axis = 'x' | 'y' | 'both'

export interface ReturnType<T> {
  ref: RefObject<T | null>
  position: Position
  isDragging: boolean
}

export interface UseDraggableProps {
  x?: number
  y?: number
  onStart?: (position: Position) => void
  onMove?: (position: Position) => void
  onEnd?: (position: Position) => void
  disabled?: boolean
  axis?: Axis
  preventDefault?: boolean
}
