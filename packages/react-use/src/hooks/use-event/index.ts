import { useEffect, useRef } from 'react'
import type {
  EventHandler,
  EventTypes,
  TargetElement,
  Event,
  UseEventProps,
} from './types'
import { isRef } from '../../utils/isRef'

/**
 * A hook that handles events in a very simple way.
 *
 * @param type - The type of event to listen to.
 * @param handler - The callback function to be called when the event is fired.
 * @param target - The element to listen to the event on. Default is window.
 * @param options - The options to pass to the addEventListener method.
 * @returns Nothing.
 * @example
 * const handleClick = () => console.log('Button clicked!')
 *
 * useEvent('click', handleClick)
 */
const useEvent = <T extends EventTypes>(
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
    const eventListener = (event: Event<T>) => savedHandler.current(event)
    targetElement.addEventListener(
      type,
      eventListener as EventListener,
      options,
    )

    return () => {
      targetElement.removeEventListener(
        type,
        eventListener as EventListener,
        options,
      )
    }
  }, [type, target, options])
}

export default useEvent
