import { useEffect, useState, type RefObject } from 'react'

/**
 * @name useElementVisibility
 * @param ref - A `RefObject` that points to the target element.
 * @returns A readonly boolean value that indicates whether the target element is visible or not.
 * @description a hook To manage element visibility.
 */
const useElementVisibility = <T extends HTMLElement>(
  ref: RefObject<T | null>,
): Readonly<boolean> => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 },
    )

    const element = ref.current
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [ref])

  return isVisible
}

export default useElementVisibility
