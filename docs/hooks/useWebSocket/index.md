---
title: useWebSocket
description: A React hook for managing WebSocket connections with automatic cleanup
---

# useWebSocket

A React hook for managing WebSocket connections.

[[toc]]

## Features

- 🔌 WebSocket connection management
- 🔄 Auto-reconnection
- 🎭 TypeScript support
- 📨 Message handling

## Type Definitions

```typescript
type WebSocketStatus = 'connecting' | 'open' | 'closed'
const webSocketReadyStates = ['connecting', 'open', 'closing', 'closed'] as const

export interface UseWebSocketReturn {
  send: WebSocket['send']
  close: WebSocket['close'],
  ws: WebSocket,
  status: typeof webSocketReadyStates,
}

interface UseWebSocketOptions {
  protocols?: string | string[]
  onOpen?: (ws: WebSocket, event:Event) => void
  onMessage?: (ws:WebSocket, event:MessageEvent) => void
  onError?: (ws:WebSocket, error: Event) => void
  onClose?: (ws:WebSocket, event: CloseEvent) => void
}

export interface UseWebSocketReturn {
  send: WebSocket['send']
  close: WebSocket['close'],
  ws: WebSocket,
  status: typeof webSocketReadyStates,
}

```

## Basic Usage

```tsx
import { useWebSocket } from 'use-reacty'

function WebSocketExample() {
  const { status, send, close } = useWebSocket('wss://echo.websocket.org')

  return (
    <div>
      <div>Status: {status}</div>
      <button onClick={() => send('Hello')}>Send Message</button>
      <button onClick={close}>Close Connection</button>
    </div>
  )
}
```

## Live Demo

<div>
<div ref="demo"></div>
</div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseWebSocket from './use-web-socket.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseWebSocket, {}, null))
})
</script>
