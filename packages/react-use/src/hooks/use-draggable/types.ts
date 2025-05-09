import { type RefObject } from 'react'

export type ReturnType<T> = [RefObject<T | null>, { x: number; y: number }]
export type UseDraggableProps = {
  x?: number
  y?: number
}
