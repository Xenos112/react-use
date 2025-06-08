---
title: useMouse
description: A React hook for tracking mouse position with real-time updates
---

# useMouse

A React hook that provides real-time mouse position tracking using pointer events.

[[toc]]

## Features

- 🖱️ Mouse position tracking
- 🔄 Real-time updates
- 🎭 TypeScript support
- 📍 Coordinate system

## Basic Usage

```tsx
import { useMouse } from 'use-reacty'

function MouseTracker() {
  const position = useMouse()

  return (
    <div>
      <h3>Mouse Position</h3>
      <p>
        X:
        {position.x}
      </p>
      <p>
        Y:
        {position.y}
      </p>
    </div>
  )
}
```

## Type Definitions

```typescript
interface Coords {
  // Horizontal position from left edge
  x: number
  // Vertical position from top edge
  y: number
}

function useMouse(): Readonly<Coords>
```

## Advanced Usage

### Position Visualization

```tsx
function PositionVisualizer() {
  const pos = useMouse()

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          background: 'red',
          borderRadius: '50%'
        }}
      />
      <div style={{ position: 'fixed', top: 20, left: 20 }}>
        (
        {pos.x}
        ,
        {pos.y}
        )
      </div>
    </div>
  )
}
```

### Movement Detection

```tsx
function MovementTracker() {
  const pos = useMouse()
  const [isMoving, setIsMoving] = useState(false)
  const prevPos = useRef(pos)

  useEffect(() => {
    const hasChanged = prevPos.current.x !== pos.x
      || prevPos.current.y !== pos.y

    if (hasChanged) {
      setIsMoving(true)
      const timer = setTimeout(() => setIsMoving(false), 100)
      return () => clearTimeout(timer)
    }

    prevPos.current = pos
  }, [pos])

  return (
    <div>
      Status:
      {isMoving ? '🏃 Moving' : '🧍 Still'}
      <br />
      Position: (
      {pos.x}
      ,
      {pos.y}
      )
    </div>
  )
}
```

## Best Practices

1. **Performance Optimization**

   ```tsx
   function OptimizedTracker() {
     const pos = useMouse()

     // Throttle updates for performance
     const roundedPos = useMemo(() => ({
       x: Math.round(pos.x),
       y: Math.round(pos.y)
     }), [Math.round(pos.x / 5), Math.round(pos.y / 5)])

     return (
       <div>
         Pos: (
         {roundedPos.x}
         ,
         {roundedPos.y}
         )
       </div>
     )
   }
   ```

2. **Boundary Detection**

   ```tsx
   function BoundaryAware() {
     const pos = useMouse()
     const isInBounds = pos.x > 0 && pos.x < window.innerWidth
       && pos.y > 0 && pos.y < window.innerHeight

     return (
       <div>
         Mouse is
         {isInBounds ? 'inside' : 'outside'}
         viewport
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
import UseMouse from './use-mouse.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseMouse, {}, null))
})
</script>
