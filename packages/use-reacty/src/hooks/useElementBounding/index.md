---
title: useElementBounding
description: A React hook for reactive element boundary tracking and measurements
---

# useElementBounding

A powerful React hook that provides reactive element boundary measurements with automatic updates on resize and scroll events.

[[toc]]

## Features

- 📏 Real-time boundary measurements
- 🔄 Automatic updates on resize
- 📜 Scroll position tracking
- 🎯 Precise positioning data
- 🎭 TypeScript-first design
- 🚀 Zero dependencies
- 📊 Complete boundary information
- 💫 Reactive updates

## Basic Usage

```tsx
import { useRef } from 'react'
import { useElementBounding } from 'use-reacty'

function BoundingExample() {
  const ref = useRef<HTMLDivElement>(null)
  const bounds = useElementBounding(ref)

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        border: '1px solid #ddd'
      }}
    >
      <h3>Element Boundaries:</h3>
      <ul>
        <li>
          Width:
          {bounds.width}
          px
        </li>
        <li>
          Height:
          {bounds.height}
          px
        </li>
        <li>
          Position: (
          {bounds.x}
          ,
          {bounds.y}
          )
        </li>
      </ul>
    </div>
  )
}
```

## Advanced Usage

### Responsive Layouts

```tsx
function ResponsiveContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { width, height } = useElementBounding(containerRef)

  return (
    <div ref={containerRef}>
      {width < 768
        ? (
            <MobileLayout />
          )
        : (
            <DesktopLayout />
          )}
      <div>
        Container size:
        {width}
        x
        {height}
      </div>
    </div>
  )
}
```

### Position Tracking

```tsx
function PositionTracker() {
  const elementRef = useRef<HTMLDivElement>(null)
  const { top, left, bottom, right } = useElementBounding(elementRef)

  return (
    <div ref={elementRef}>
      <div className="position-info">
        <div>
          Top:
          {Math.round(top)}
          px
        </div>
        <div>
          Left:
          {Math.round(left)}
          px
        </div>
        <div>
          Bottom:
          {Math.round(bottom)}
          px
        </div>
        <div>
          Right:
          {Math.round(right)}
          px
        </div>
      </div>
    </div>
  )
}
```

### Scroll-Based Animations

```tsx
function ScrollAnimation() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { top } = useElementBounding(targetRef)

  const opacity = Math.max(0, Math.min(1, 1 - (top / window.innerHeight)))

  return (
    <div
      ref={targetRef}
      style={{
        opacity,
        transition: 'opacity 0.2s'
      }}
    >
      Scroll to fade
    </div>
  )
}
```

## Type Definitions

```typescript
interface ElementBounding {
  // Element width in pixels
  width: number
  // Element height in pixels
  height: number
  // Distance from top of viewport
  top: number
  // Distance from left of viewport
  left: number
  // Distance from bottom of viewport
  bottom: number
  // Distance from right of viewport
  right: number
  // X coordinate relative to viewport
  x: number
  // Y coordinate relative to viewport
  y: number
}

function useElementBounding<T extends HTMLElement>(
  ref: RefObject<T | null>
): ElementBounding
```

## Best Practices

1. **Performance Optimization**

   ```tsx
   function OptimizedTracking() {
     const ref = useRef<HTMLDivElement>(null)
     const bounds = useElementBounding(ref)

     // Memoize calculations based on bounds
     const dimensions = useMemo(() => ({
       area: bounds.width * bounds.height,
       aspect: bounds.width / bounds.height
     }), [bounds.width, bounds.height])

     return (
       <div ref={ref}>
         Area:
         {dimensions.area}
         px²
       </div>
     )
   }
   ```

2. **Boundary Detection**

   ```tsx
   function BoundaryAware() {
     const ref = useRef<HTMLDivElement>(null)
     const { top } = useElementBounding(ref)

     const isInViewport = top >= 0 && top <= window.innerHeight

     return (
       <div ref={ref}>
         {isInViewport ? '👁️ Visible' : '❌ Hidden'}
       </div>
     )
   }
   ```

3. **Responsive Design**

   ```tsx
   function ResponsiveElement() {
     const ref = useRef<HTMLDivElement>(null)
     const { width } = useElementBounding(ref)

     const size = width < 600
       ? 'small'
       : width < 1200 ? 'medium' : 'large'

     return (
       <div ref={ref} className={`container-${size}`}>
         Current size:
         {size}
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
import UseElementBounding from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseElementBounding, {}, null))
})
</script>
