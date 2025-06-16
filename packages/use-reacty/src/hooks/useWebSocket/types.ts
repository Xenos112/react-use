import type { webSocketReadyStates } from '.'

export interface UseWebSocketOptions<T> {
  onError?: (event: Event) => void
  onOpen?: (event: Event) => void
  onMessage?: (event: MessageEvent<T>) => void
  onClose?: (event: CloseEvent) => void
  protocols?: string | string[]
}

export interface UseWebSocketReturn {
  send: WebSocket['send']
  close: WebSocket['close']
  ws: WebSocket
  status: typeof webSocketReadyStates[number]
}
