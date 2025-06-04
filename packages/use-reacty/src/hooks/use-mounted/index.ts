import { useEffect, useState } from 'react'

/**
 * @name useMounted
 * @description hook to check if the dom is mounted
 * @returns a readonly value to see if the dom is mounted
 */
function useMounted(): Readonly<boolean> {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}

export default useMounted
