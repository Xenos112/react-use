---
title: useWebWorker
description: A React hook for managing Web Workers with TypeScript support
---

# useWebWorker

A React hook that provides a simple interface for managing Web Workers with status tracking and event handling.

[[toc]]

## Features

- 👷‍♂️ Web Worker management
- 🔄 Status tracking
- 🎭 TypeScript support
- 📨 Message handling
- ⚡ Automatic cleanup
- 🚦 Pending messages tracking

## Type Definitions

```typescript
type WorkerStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR' | 'TERMINATED'

interface UseWebWorkerOptions<T> {
  name?: string
  credentials?: RequestCredentials
  type?: WorkerType
  onError?: (error: ErrorEvent) => void
  onMessage?: (event: MessageEvent<T>) => void
  onMessageError?: (event: MessageEvent) => void
}

interface UseWebWorkerReturn {
  worker: Worker | null
  postMessage: (message: any, transfer?: Transferable[]) => void
  terminate: () => void
  status: WorkerStatus
  error: Error | null
  isReady: boolean
  pendingMessages: number
}
```

## Basic Usage

```tsx
import { useWebWorker } from 'use-reacty'

function WebWorkerExample() {
  const { status, postMessage, terminate } = useWebWorker('./worker.js')

  return (
    <div>
      <div>Status: {status}</div>
      <button onClick={() => postMessage('Hello')}>Send Message</button>
      <button onClick={terminate}>Stop Worker</button>
    </div>
  )
}
```

## Advanced Examples

### With Message Handling

```tsx
function MessageHandlingExample() {
  const [result, setResult] = useState(null)
  const { postMessage } = useWebWorker('./compute.js', {
    onMessage: (e) => setResult(e.data),
    onError: (e) => console.error('Worker failed:', e)
  })

  return (
    <button onClick={() => postMessage({ type: 'COMPUTE', data: 42 })}>
      Start Computation
    </button>
  )
}
```

### With Transfer Objects

```tsx
function ArrayTransferExample() {
  const { postMessage } = useWebWorker('./array-worker.js')

  const handleTransfer = () => {
    const buffer = new ArrayBuffer(1024)
    postMessage({ data: buffer }, [buffer]) // Transfer ownership
  }

  return <button onClick={handleTransfer}>Transfer Data</button>
}
```

### With Status Monitoring

```tsx
function StatusMonitorExample() {
  const { status, error, isReady, pendingMessages } = useWebWorker('./worker.js')

  return (
    <div>
      <div>Status: {status}</div>
      <div>Is Ready: {isReady ? 'Yes' : 'No'}</div>
      <div>Pending Messages: {pendingMessages}</div>
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```

### With Cleanup

```tsx
function CleanupExample() {
  const { postMessage, terminate } = useWebWorker('./worker.js')

  useEffect(() => {
    // Worker will be automatically terminated on unmount
    return () => terminate()
  }, [terminate])

  return <button onClick={() => postMessage('Hello')}>Send</button>
}
```
