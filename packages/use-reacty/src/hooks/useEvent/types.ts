import type { RefObject } from 'react'

export type EventTypes
  = | keyof (
    | DocumentEventMap
    | WindowEventMap
    | HTMLElementEventMap
    | GlobalEventHandlersEventMap
  )
  | 'online'
  | 'offline'

export type EventT<T extends EventTypes> = T extends keyof DocumentEventMap
  ? DocumentEventMap[T]
  : T extends keyof WindowEventMap
    ? WindowEventMap[T]
    : T extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[T]
      : T extends 'online' | 'offline'
        ? Event
        : CustomEvent<T>

export type EventHandler<T extends EventTypes> = (event: EventT<T>) => void

export type UseEventProps = AddEventListenerOptions | boolean
export type TargetElement = EventTarget | RefObject<EventTarget | null>
