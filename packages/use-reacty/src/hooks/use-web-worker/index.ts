import type { UseWebWorkerOptions, UseWebWorkerReturn, WorkerStatus } from './types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function useWebWorker<T = any>(
  path: URL | string,
  { credentials, name, type, onError, onMessage, onMessageError }: UseWebWorkerOptions<T> = {},
): UseWebWorkerReturn {
  const [status, setStatus] = useState<WorkerStatus>('IDLE')
  const [error, setError] = useState<Error | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const pendingMessagesRef = useRef<number>(0)

  const worker = useMemo(() => {
    try {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
      const newWorker = new Worker(path, { credentials, name, type })
      workerRef.current = newWorker
      pendingMessagesRef.current = 0
      setStatus('IDLE')
      setError(null)
      return newWorker
    }
    catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create worker')
      setError(error)
      setStatus('ERROR')
      return null
    }
  }, [credentials, name, path, type])

  useEffect(() => {
    if (!worker)
      return

    const currentWorker = worker

    const onErrorFn = (e: ErrorEvent) => {
      const error = new Error(e.message || 'Worker error')
      setError(error)
      setStatus('ERROR')
      pendingMessagesRef.current = 0
      onError?.(e)
    }

    const onMessageFn = (e: MessageEvent<T>) => {
      pendingMessagesRef.current = Math.max(0, pendingMessagesRef.current - 1)

      if (pendingMessagesRef.current > 0) {
        setStatus('PENDING')
      }
      else {
        setStatus('SUCCESS')
      }

      setError(null)
      onMessage?.(e)
    }

    const onMessageErrorFn = (e: MessageEvent) => {
      pendingMessagesRef.current = Math.max(0, pendingMessagesRef.current - 1)
      const error = new Error('Message error')
      setError(error)
      setStatus('ERROR')
      onMessageError?.(e)
    }

    currentWorker.addEventListener('error', onErrorFn)
    currentWorker.addEventListener('message', onMessageFn)
    currentWorker.addEventListener('messageerror', onMessageErrorFn)

    return () => {
      currentWorker.removeEventListener('error', onErrorFn)
      currentWorker.removeEventListener('message', onMessageFn)
      currentWorker.removeEventListener('messageerror', onMessageErrorFn)
    }
  }, [onError, onMessage, onMessageError, worker])

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
        workerRef.current = null
      }
    }
  }, [])

  const postMessage = useCallback((
    message: any,
    transfer?: Transferable[],
  ) => {
    if (!worker) {
      throw new Error('Worker not available')
    }

    setError(null)
    pendingMessagesRef.current += 1
    setStatus('PENDING')

    try {
      if (transfer) {
        worker.postMessage(message, transfer)
      }
      else {
        worker.postMessage(message)
      }
    }
    catch (err) {
      pendingMessagesRef.current = Math.max(0, pendingMessagesRef.current - 1)
      const error = err instanceof Error ? err : new Error('Failed to post message')
      setError(error)
      setStatus('ERROR')
      throw error
    }
  }, [worker])

  const terminate = useCallback(() => {
    if (worker) {
      worker.terminate()
      pendingMessagesRef.current = 0
      setStatus('TERMINATED')
      setError(null)
    }
  }, [worker])

  return {
    worker,
    postMessage,
    terminate,
    status,
    error,
    isReady: status !== 'ERROR' && worker !== null,
    pendingMessages: pendingMessagesRef.current,
  }
}

export default useWebWorker
