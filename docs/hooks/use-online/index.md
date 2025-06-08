---
title: useOnline
description: A React hook for tracking online/offline status with automatic updates
---

# useOnline

A React hook that tracks the browser's online/offline status and provides automatic updates when connectivity changes.

[[toc]]

## Features

- 🌐 Online status tracking
- 🔄 Automatic updates
- 🎭 TypeScript support

## Basic Usage

```tsx
import { useOnline } from 'use-reacty'

function ConnectivityStatus() {
  const isOnline = useOnline()

  return (
    <div>
      <h3>Connection Status</h3>
      <div style={{
        color: isOnline ? '#4CAF50' : '#f44336',
        fontWeight: 'bold'
      }}
      >
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>
    </div>
  )
}
```

## Type Definitions

```typescript
function useOnline(): Readonly<boolean>
```

## Advanced Usage

### Network-Aware Components

```tsx
function DataFetcher() {
  const isOnline = useOnline()
  const [data, setData] = useState<Data>()

  useEffect(() => {
    if (isOnline) {
      fetchData().then(setData)
    }
  }, [isOnline])

  if (!isOnline) {
    return (
      <div className="offline-notice">
        Please check your internet connection
      </div>
    )
  }

  return <DataDisplay data={data} />
}
```

### Connection Monitor

```tsx
function ConnectionMonitor() {
  const isOnline = useOnline()
  const [lastOnline, setLastOnline] = useState<Date>()

  useEffect(() => {
    if (isOnline) {
      setLastOnline(new Date())
    }
  }, [isOnline])

  return (
    <div className="monitor">
      <div className="status">
        {isOnline
          ? (
              <span className="online">
                Connected to network
              </span>
            )
          : (
              <span className="offline">
                Working offline
                {lastOnline && (
                  <div className="last-seen">
                    Last online:
                    {lastOnline.toLocaleString()}
                  </div>
                )}
              </span>
            )}
      </div>
    </div>
  )
}
```

## Best Practices

1. **Optimistic Updates**

   ```tsx
   function OptimisticUI() {
     const isOnline = useOnline()
     const [data, setData] = useState<Data>()

     async function handleSubmit(formData: FormData) {
       if (!isOnline) {
         // Store in local queue
         addToQueue(formData)
         return
       }

       await submitData(formData)
     }

     return (
       <form onSubmit={handleSubmit}>
         {/* Form fields */}
         <button type="submit">
           {isOnline ? 'Submit' : 'Save for later'}
         </button>
       </form>
     )
   }
   ```

2. **Connection Recovery**

   ```tsx
   function AutoRecovery() {
     const isOnline = useOnline()
     const hasOfflineData = useOfflineStore()

     useEffect(() => {
       if (isOnline && hasOfflineData) {
         syncOfflineData()
       }
     }, [isOnline, hasOfflineData])

     return (
       <div>
         {hasOfflineData && isOnline && (
           <div>Syncing offline changes...</div>
         )}
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
import UseOnline from './use-online.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseOnline, {}, null))
})
</script>
