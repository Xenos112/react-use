import { webSocketReadyStates } from '.'
export interface UseWebSocketOptions {
  onError?: (ws: WebSocket, event: Event) => void
  onOpen?: (ws: WebSocket, event: Event) => void
  onMessage?: (ws: WebSocket, event: MessageEvent) => void
  onClose?: (ws: WebSocket, event: CloseEvent) => void
  protocols?: string | string[]
}

export interface UseWebSocketReturn {
  send: WebSocket['send']
  close: WebSocket['close'],
  ws: WebSocket,
  status: typeof webSocketReadyStates[number],
}
