import type { UseTitleReturn } from './types'
import { useEffect, useState } from 'react'

/**
 * @name useTitle
 * @description a hook to work with documents titles
 * @param initialTitle - initial state for the document
 * @returns UseTitleReturn - value and set function to update the title state
 */
function useTitle(initialTitle?: string): UseTitleReturn {
  const [title, setTitle] = useState(() => {
    return initialTitle || document.title
  })

  useEffect(() => {
    document.title = title
  }, [title])

  return [title, setTitle]
}

export default useTitle
