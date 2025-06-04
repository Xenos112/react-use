import { useEffect, useState } from 'react'

/**
 * @name useMounted
 * @description hook to check if the dom is mounted
 * @returns a readonly value to see if the dom is mounted
 */
function useMounted(): Readonly<boolean> {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}

export default useMounted
