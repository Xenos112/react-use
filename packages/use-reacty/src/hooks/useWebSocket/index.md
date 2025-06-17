---
title: useWebSocket
description: A React hook for managing WebSocket connections with automatic cleanup
---

# useWebSocket

A React hook for managing WebSocket connections.

[[toc]]

## Features

- 🔌 WebSocket connection management
- 🎭 TypeScript support
- 📨 Message handling
- ⚡ Automatic cleanup
- 🔍 Status tracking

## Type Definitions

```typescript
type WebSocketStatus = typeof webSocketReadyStates[number]
const webSocketReadyStates = ['connecting', 'open', 'closing', 'closed'] as const

interface UseWebSocketOptions {
  onError?: (event: Event) => void
  onOpen?: (event: Event) => void
  onMessage?: (event: MessageEvent) => void
  onClose?: (event: CloseEvent) => void
  protocols?: string | string[]
}

interface UseWebSocketReturn {
  send: WebSocket['send']
  close: WebSocket['close']
  ws: WebSocket
  status: WebSocketStatus
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

## Advanced Examples

### With Event Handlers

```tsx
function WebSocketWithHandlers() {
  const { status, send } = useWebSocket('wss://echo.websocket.org', {
    onOpen: (event) => console.log('Connected!', event),
    onMessage: (event) => console.log('Received:', event.data),
    onError: (event) => console.error('WebSocket error:', event),
    onClose: (event) => console.log('Disconnected:', event)
  })

  return <div>Status: {status}</div>
}
```

### With Protocols

```tsx
function WebSocketWithProtocol() {
  const { status } = useWebSocket('wss://echo.websocket.org', {
    protocols: ['v1.protocol.example']
  })

  return <div>Status: {status}</div>
}
```

### With URL Object

```tsx
function WebSocketWithURL() {
  const url = new URL('wss://echo.websocket.org')
  const { status } = useWebSocket(url)

  return <div>Status: {status}</div>
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
import UseWebSocket from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseWebSocket, {}, null))
})
</script>
