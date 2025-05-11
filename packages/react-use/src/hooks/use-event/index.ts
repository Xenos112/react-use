import { useEffect, useRef } from 'react'
import type { EventHandler, TargetElement, UseEventProps } from './types'
import { isRef } from '../../utils/isRef'

/**
 * A hook that handles events in a very simple way.
 *
 * @param type - The type of event to listen to.
 * @param handler - The callback function to be called when the event is fired.
 * @param target - The element to listen to the event on. Default is window.
 * @param options - The options to pass to the addEventListener method.
 */
const useEvent = <T extends keyof DocumentEventMap>(
  type: T,
  handler: EventHandler<T>,
  target: TargetElement = window,
  options?: UseEventProps,
): void => {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = isRef(target) ? target.current : target

    if (!targetElement) return
    const eventListener = (event: Event) =>
      savedHandler.current(event as DocumentEventMap[T])
    targetElement.addEventListener(type, eventListener, options)

    return () => {
      targetElement.removeEventListener(type, eventListener, options)
    }
  }, [type, target, options])
}

export default useEvent
