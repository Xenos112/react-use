---
title: useMounted
description: A React hook for tracking component mount state
---

# useMounted

A simple React hook that provides a reliable way to track whether a component is currently mounted.

[[toc]]

## Features

- 📌 Mount state tracking
- 🎭 TypeScript support
- 🎯 Readonly state

## Basic Usage

```tsx
import { useMounted } from 'use-reacty'

function MountTracker() {
  const isMounted = useMounted()

  return (
    <div>
      Current State:
      {isMounted ? 'Mounted' : 'Not Mounted'}
    </div>
  )
}
```

## Type Definitions

```typescript
function useMounted(): Readonly<boolean>
```

## Advanced Usage

### With Loading States

```tsx
function LoadingComponent() {
  const isMounted = useMounted()
  const [data, setData] = useState<Data>()

  useEffect(() => {
    fetchData().then((result) => {
      // Only update state if component is still mounted
      if (isMounted)
        setData(result)
    })
  }, [isMounted])

  return (
    <div>
      {!isMounted
        ? (
            <div>Initializing...</div>
          )
        : data
          ? (
              <div>Data loaded!</div>
            )
          : (
              <div>Loading data...</div>
            )}
    </div>
  )
}
```

### Mount Detection

```tsx
function MountAwareComponent() {
  const isMounted = useMounted()

  useEffect(() => {
    if (isMounted) {
      console.log('Component is ready')
      // Initialize after mount
      setupComponent()
    }
  }, [isMounted])

  return (
    <div>
      Status:
      {isMounted ? 'Ready' : 'Preparing'}
    </div>
  )
}
```

## Best Practices

1. **Async Operations**

   ```tsx
   function SafeAsync() {
     const isMounted = useMounted()

     async function handleClick() {
       const result = await someAsyncOperation()
       // Prevent updates if unmounted
       if (isMounted) {
         updateState(result)
       }
     }

     return <button onClick={handleClick}>Load Data</button>
   }
   ```

2. **Cleanup Handling**

   ```tsx
   function CleanupAware() {
     const isMounted = useMounted()

     useEffect(() => {
       const subscription = subscribe()

       return () => {
         // Extra safety for cleanup
         if (!isMounted) {
           subscription.unsubscribe()
         }
       }
     }, [isMounted])

     return <div>Subscribed</div>
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
import UseMounted from './use-mounted.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseMounted, {}, null))
})
</script>
