import { type RefObject } from 'react'

export type EventHandler<T extends keyof DocumentEventMap> = (
  event: DocumentEventMap[T],
) => void

export type UseEventProps = AddEventListenerOptions | boolean
export type TargetElement = EventTarget | RefObject<EventTarget | null>
