import type { UseWebSocketOptions, UseWebSocketReturn } from './types'
import { useCallback, useEffect, useRef, useState } from 'react'

export const webSocketReadyStates = ['connecting', 'open', 'closing', 'closed'] as const

function useWebSocket<T>(url: string | URL, { onOpen, onClose, onError, onMessage, protocols }: UseWebSocketOptions<T> = {}): UseWebSocketReturn {
  const webSocketRef = useRef<WebSocket | null>(null)
  const onOpenRef = useRef(onOpen)
  const onCloseRef = useRef(onClose)
  const onMessageRef = useRef(onMessage)
  const onErrorRef = useRef(onError)
  const [status, setStatus] = useState(webSocketReadyStates[webSocketRef.current?.readyState || 3])

  useEffect(() => {
    onOpenRef.current = onOpen
  }, [onOpen])

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  useEffect(() => {
    if (webSocketRef.current) {
      webSocketRef.current.close()
    }

    const updateStatus = () => {
      setStatus(webSocketReadyStates[webSocketRef.current?.readyState || 3])
    }

    const onOpenHandler = (e: Event) => {
      updateStatus()
      onOpenRef.current?.(e)
    }

    const onCloseHandler = (e: CloseEvent) => {
      updateStatus()
      onCloseRef.current?.(e)
    }

    const onErrorHandler = (e: Event) => {
      updateStatus()
      onErrorRef.current?.(e)
    }

    const onMessageHandler = (e: MessageEvent) => {
      updateStatus()
      onMessageRef.current?.(e)
    }

    const webSocket = new WebSocket(url, protocols)
    webSocketRef.current = webSocket

    webSocket.addEventListener('close', onCloseHandler)
    webSocket.addEventListener('open', onOpenHandler)
    webSocket.addEventListener('error', onErrorHandler)
    webSocket.addEventListener('message', onMessageHandler)

    return () => {
      webSocket.removeEventListener('close', onCloseHandler)
      webSocket.removeEventListener('open', onOpenHandler)
      webSocket.removeEventListener('error', onErrorHandler)
      webSocket.removeEventListener('message', onMessageHandler)
    }
  }, [url, protocols])

  const send = useCallback((data: any) => {
    const websocket = webSocketRef.current
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(data)
    }
    else {
      console.warn('WebSocket is not connected. Unable to send data.')
    }
  }, [])

  const close = useCallback((code?: number, reason?: string) => {
    const websocket = webSocketRef.current
    if (websocket && websocket.readyState !== WebSocket.CLOSED)
      websocket.close(code, reason)
  }, [])

  return {
    status,
    ws: webSocketRef.current as WebSocket,
    close,
    send,
  }
}

export default useWebSocket
