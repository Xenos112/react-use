---
title: useInterval
description: A React hook for managing interval timers with pause/resume functionality
---

# useInterval

A React hook for managing interval timers with pause and resume capabilities.

[[toc]]

## Features

- 🕒 Interval management
- ⏯️ Pause/Resume controls
- 🎭 TypeScript support
- ⚡ Callback memoization

## Type Definitions

```typescript
interface UseIntervalReturn {
  // Pause the interval
  pause: () => void
  // Resume the interval
  resume: () => void
  // Current active state
  isActive: boolean
}

function useInterval(
  // Function to run on interval
  intervalFn: () => void,
  // Interval threshold in milliseconds
  threshold?: number = 1000
): UseIntervalReturn
```

## Basic Usage

```tsx
import { useInterval } from 'use-reacty'

function Counter() {
  const [count, setCount] = useState(0)
  const { isActive, pause, resume } = useInterval(() => {
    setCount(prev => prev + 1)
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={isActive ? pause : resume}>
        {isActive ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}
```

## Advanced Usage

### Custom Threshold

```tsx
function CustomTimer() {
  const [time, setTime] = useState(0)
  const { isActive } = useInterval(() => {
    setTime(prev => prev + 0.1)
  }, 100) // Updates every 100ms

  return <div>Time: {time.toFixed(1)}s</div>
}
```

### With Controls

```tsx
function ControlledTimer() {
  const [count, setCount] = useState(0)
  const { isActive, pause, resume } = useInterval(() => {
    setCount(prev => prev + 1)
  })

  return (
    <div>
      <div>Count: {count}</div>
      <div>Status: {isActive ? 'Running' : 'Paused'}</div>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
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
import UseInterval from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseInterval, {}, null))
})
</script>
