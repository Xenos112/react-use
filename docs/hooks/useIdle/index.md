---
title: useIdle
description: A React hook for detecting user inactivity with automatic event cleanup
---

# useIdle

A powerful React hook that detects user inactivity by monitoring various DOM events and provides idle state tracking.

[[toc]]

## Features

- 👁️ Real-time idle detection
- 🎯 Multiple event monitoring
- 🧹 Automatic event cleanup
- ⏱️ Idle time tracking
- 🎭 TypeScript-first design
- 📦 Zero dependencies
- 🔄 Automatic state updates

## Basic Usage

```tsx
import { useIdle } from 'use-reacty'

function IdleDetector() {
  const { isIdle, lastActive } = useIdle()

  return (
    <div>
      <div style={{ color: isIdle ? 'red' : 'green' }}>
        Status:
        {isIdle ? 'Idle' : 'Active'}
      </div>
      <div>
        Seconds inactive:
        {lastActive}
      </div>
    </div>
  )
}
```

## Type Definitions

```typescript
interface UseIdleReturnType {
  // Whether the user is currently idle
  isIdle: boolean
  // Seconds since last activity (-1 when active)
  lastActive: number
}

function useIdle(): UseIdleReturnType
```

## Monitored Events

The hook automatically tracks the following user interactions:

- Mouse events: `mousemove`, `mousedown`, `mouseup`, `click`, `dbclick`
- Keyboard events: `keydown`, `keyup`, `keypress`
- Touch events: `touchstart`, `touchmove`, `touchend`
- Pointer events: `pointermove`, `pointerdown`, `pointerup`
- Window events: `scroll`, `wheel`, `resize`
- Document events: `focus`, `blur`, `visibilitychage`

## Advanced Usage

### Activity Monitoring

```tsx
function ActivityMonitor() {
  const { isIdle, lastActive } = useIdle()

  return (
    <div className="monitor">
      <h3>User Activity Monitor</h3>
      <div className={`status status--${isIdle ? 'idle' : 'active'}`}>
        {isIdle ? '💤 User is idle' : '🏃 User is active'}
      </div>
      {isIdle && (
        <div className="idle-time">
          Idle for:
          {lastActive}
          seconds
        </div>
      )}
    </div>
  )
}
```

### Auto Logout Example

```tsx
function AutoLogout() {
  const { isIdle, lastActive } = useIdle()
  const LOGOUT_THRESHOLD = 300 // 5 minutes

  useEffect(() => {
    if (lastActive >= LOGOUT_THRESHOLD) {
      logout()
    }
  }, [lastActive])

  return (
    <div>
      <h3>Session Monitor</h3>
      <div>
        {isIdle
          ? (
              <p>
                ⚠️ Session will expire in:
                {LOGOUT_THRESHOLD - lastActive}
                s
              </p>
            )
          : (
              <p>✅ Session active</p>
            )}
      </div>
    </div>
  )
}
```

## Best Practices

### State Management

```tsx
function IdleStateManager() {
  const { isIdle } = useIdle()

  useEffect(() => {
    if (isIdle) {
      // Pause background operations
      pausePolling()
    }
    else {
      // Resume operations
      resumePolling()
    }
  }, [isIdle])

  return (
    <div>
      Background tasks:
      {isIdle ? 'Paused' : 'Running'}
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
import UseIdle from './use-idle.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseIdle, {}, null))
})
</script>
