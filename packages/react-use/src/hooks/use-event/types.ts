import { type RefObject } from 'react'

export type EventTypes = keyof (
  | DocumentEventMap
  | WindowEventMap
  | HTMLElementEventMap
)

export type Event<T extends EventTypes> = T extends keyof DocumentEventMap
  ? DocumentEventMap[T]
  : T extends keyof WindowEventMap
    ? WindowEventMap[T]
    : T extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[T]
      : CustomEvent<T>

export type EventHandler<T extends EventTypes> = (event: Event<T>) => void

export type UseEventProps = AddEventListenerOptions | boolean
export type TargetElement = EventTarget | RefObject<EventTarget | null>
