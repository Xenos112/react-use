---
title: useMouseElement
description: A React hook for tracking mouse position within specific elements
---

# useMouseElement

A React hook that provides precise mouse position tracking within a specific element using pointer events.

[[toc]]

## Features

- 🎯 Element-specific tracking
- 📍 Offset coordinates
- 🎭 TypeScript support

## Basic Usage

```tsx
import { useRef } from 'react'
import { useMouseElement } from 'use-reacty'

function MouseTracker() {
  const boxRef = useRef<HTMLDivElement>(null)
  const position = useMouseElement(boxRef)

  return (
    <div
      ref={boxRef}
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        background: '#f5f5f5'
      }}
    >
      <h3>Mouse Position Inside Element</h3>
      <p>
        X:
        {position.x}
        px from left
      </p>
      <p>
        Y:
        {position.y}
        px from top
      </p>
    </div>
  )
}
```

## Type Definitions

```typescript
interface Coords {
  // Distance from element's left edge
  x: number
  // Distance from element's top edge
  y: number
}

function useMouseElement<T extends HTMLElement>(
  // Reference to target element
  ref: RefObject<T | null>
): Readonly<Coords>
```

## Advanced Usage

### Interactive Element

```tsx
function InteractiveArea() {
  const areaRef = useRef<HTMLDivElement>(null)
  const pos = useMouseElement(areaRef)

  return (
    <div
      ref={areaRef}
      style={{
        position: 'relative',
        width: '300px',
        height: '200px',
        background: '#eee'
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          background: 'blue',
          borderRadius: '50%'
        }}
      />
    </div>
  )
}
```

### Position Percentage

```tsx
function PercentageTracker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pos = useMouseElement(containerRef)

  const getPercentage = (value: number, total: number) =>
    Math.round((value / total) * 100)

  return (
    <div
      ref={containerRef}
      style={{ width: '400px', height: '300px', border: '1px solid' }}
    >
      <div>
        Horizontal:
        {getPercentage(pos.x, 400)}
        %
        <br />
        Vertical:
        {getPercentage(pos.y, 300)}
        %
      </div>
    </div>
  )
}
```

## Best Practices

1. **Element Size Awareness**

   ```tsx
   function ResponsiveTracker() {
     const elementRef = useRef<HTMLDivElement>(null)
     const pos = useMouseElement(elementRef)

     return (
       <div
         ref={elementRef}
         style={{
           width: '100%',
           minHeight: '200px',
           padding: '1rem',
           border: '1px solid'
         }}
       >
         Position: (
         {pos.x}
         ,
         {pos.y}
         )
       </div>
     )
   }
   ```

2. **Boundary Checks**

   ```tsx
   function BoundaryAware() {
     const boxRef = useRef<HTMLDivElement>(null)
     const pos = useMouseElement(boxRef)

     const isWithinBounds = (pos.x >= 0 && pos.y >= 0)
       && boxRef.current
       && (pos.x <= boxRef.current.offsetWidth)
       && (pos.y <= boxRef.current.offsetHeight)

     return (
       <div ref={boxRef}>
         Mouse is
         {isWithinBounds ? 'inside' : 'outside'}
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
import UseMouseElement from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseMouseElement, {}, null))
})
</script>
