---
title: useDraggable
description: A powerful React hook for making elements draggable with precise control and callbacks
---

# useDraggable

A powerful React hook that makes elements draggable with support for axis constraints, event callbacks, and controlled movement.

[[toc]]

## Features

- 🎯 Precise drag control
- 📏 Axis constraints (x, y, or both)
- 🔒 Disable/enable dragging
- 🎭 TypeScript-first design
- 🎨 Automatic cursor styling
- 📍 Position tracking
- 🎬 Event callbacks
- 🚫 Text selection prevention

## Basic Usage

The hook provides `ref`, `position`, and `isDragging` to control and monitor the draggable element:

```tsx
import { useDraggable } from 'use-reacty'

function DraggableBox() {
  const { ref, position, isDragging } = useDraggable({
    x: 100,
    y: 100
  })

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        background: isDragging ? '#eee' : '#fff',
        border: '1px solid #ddd'
      }}
    >
      Position:
      {' '}
      {position.x}
      x
      {position.y}
    </div>
  )
}
```

## Advanced Usage

### With Event Callbacks

Monitor and react to drag events:

```tsx
function DraggableWithEvents() {
  const { ref } = useDraggable({
    onStart: pos => console.log('Started:', pos),
    onMove: pos => console.log('Moving:', pos),
    onEnd: pos => console.log('Ended:', pos)
  })

  return <div ref={ref}>Drag me!</div>
}
```

### Axis Constraints

Restrict movement to specific axes:

```tsx
function HorizontalSlider() {
  const { ref, position } = useDraggable({
    axis: 'x', // Only move horizontally
    x: 0,
    y: 0
  })

  return (
    <div ref={ref}>
      Horizontal:
      {' '}
      {position.x}
    </div>
  )
}
```

### Controlled Movement

Enable/disable dragging dynamically:

```tsx
function ControlledDraggable() {
  const [isLocked, setLocked] = useState(false)
  const { ref } = useDraggable({
    disabled: isLocked
  })

  return (
    <>
      <div ref={ref}>
        {isLocked ? '🔒 Locked' : '✋ Draggable'}
      </div>
      <button onClick={() => setLocked(!isLocked)}>
        Toggle Lock
      </button>
    </>
  )
}
```

## Type Definitions

```typescript
interface Position {
  x: number
  y: number
}

type Axis = 'x' | 'y' | 'both'

interface UseDraggableProps {
  // Initial x position
  x?: number
  // Initial y position
  y?: number
  // Drag start callback
  onStart?: (position: Position) => void
  // Drag move callback
  onMove?: (position: Position) => void
  // Drag end callback
  onEnd?: (position: Position) => void
  // Disable dragging
  disabled?: boolean
  // Movement axis constraint
  axis?: Axis
  // Prevent default events
  preventDefault?: boolean
}

interface ReturnType<T> {
  // Ref to attach to draggable element
  ref: RefObject<T | null>
  // Current element position
  position: Position
  // Whether element is being dragged
  isDragging: boolean
}
```

## Best Practices

1. **Use Position Feedback**

   ```tsx
   function DraggableWithFeedback() {
     const { ref, position, isDragging } = useDraggable()

     return (
       <div ref={ref}>
         <div className="position-indicator">
           X:
           {position.x}
           Y:
           {position.y}
         </div>
         <div className="status">
           {isDragging ? 'Moving...' : 'Ready'}
         </div>
       </div>
     )
   }
   ```

2. **Handle Boundaries**

   ```tsx
   function BoundedDraggable() {
     const { ref } = useDraggable({
       onMove: (pos) => {
         // Keep element within viewport
         if (pos.x < 0 || pos.x > window.innerWidth)
           return false
         if (pos.y < 0 || pos.y > window.innerHeight)
           return false
       }
     })

     return <div ref={ref}>Bounded</div>
   }
   ```

3. **Responsive Design**

   ```tsx
   function ResponsiveDraggable() {
     const { ref, position } = useDraggable({
       x: window.innerWidth / 2,
       y: window.innerHeight / 2
     })

     return (
       <div
         ref={ref}
         style={{
           position: 'fixed',
           transform: `translate(${position.x}px, ${position.y}px)`
         }}
       >
         Centered
       </div>
     )
   }
   ```

## Live Demo

> View the elements that are floating

<div>
    <div ref="el"></div>
</div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Draggable from './demo.tsx'

const el = ref()

onMounted(() => {
  const root1 = createRoot(el.value)
  root1.render(createElement(Draggable, {}, null))
})
</script>
