import type { UseWebSocketOptions, UseWebSocketReturn } from './types'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const webSocketReadyStates = ['connecting', 'open', 'closing', 'closed'] as const

function useWebSocket(url: string | URL, { onOpen, onClose, onError, onMessage, protocols }: UseWebSocketOptions = {}): UseWebSocketReturn {
  const websocket = useMemo(() => new WebSocket(url, protocols), [url, protocols])
  const [status, setStatus] = useState(webSocketReadyStates[websocket.readyState])

  useEffect(() => {
    const updateStatus = () => setStatus(webSocketReadyStates[websocket.readyState])

    websocket.addEventListener('open', updateStatus)
    websocket.addEventListener('close', updateStatus)
    websocket.addEventListener('error', updateStatus)

    return () => {
      websocket.removeEventListener('open', updateStatus)
      websocket.removeEventListener('close', updateStatus)
      websocket.removeEventListener('error', updateStatus)
    }
  }, [websocket])

  useEffect(() => {
    if (onOpen)
      websocket.onopen = onOpen as unknown as (this: WebSocket, e: Event) => void
    if (onClose)
      websocket.onclose = onClose as unknown as (this: WebSocket, e: CloseEvent) => void

    if (onError)
      websocket.onerror = onError as unknown as (this: WebSocket, e: Event) => void

    if (onMessage)
      websocket.onmessage = onMessage as unknown as (this: WebSocket, e: MessageEvent) => void

    return () => {
      websocket.close()
    }
  }, [onClose, onError, onMessage, onOpen, websocket])

  const send = useCallback((data: any) => websocket.send(data), [websocket])
  const close = useCallback(() => websocket.close(), [websocket])

  return {
    send,
    close,
    ws: websocket,
    status,
  }
}

export default useWebSocket
