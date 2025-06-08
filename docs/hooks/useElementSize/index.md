---
title: useElementSize
description: A React hook for reactive element size tracking and measurements
---

# useElementSize

A powerful React hook that provides reactive element size measurements using ResizeObserver for automatic updates when elements change dimensions.

[[toc]]

## Features

- 📏 Real-time size measurements
- 🔄 Automatic updates on resize
- 🎯 High-performance tracking
- 🎭 TypeScript-first design
- 🚀 Zero dependencies
- 📊 Width and height tracking
- 💫 Reactive updates
- 🔬 ResizeObserver powered

## Basic Usage

```tsx
import { useRef } from 'react'
import { useElementSize } from 'use-reacty'

function SizeTracker() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useElementSize(ref)

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        resize: 'both',
        overflow: 'auto'
      }}
    >
      <h3>Element Size:</h3>
      <p>
        Width:
        {size.width}
        px
      </p>
      <p>
        Height:
        {size.height}
        px
      </p>
    </div>
  )
}
```

## Advanced Usage

### Responsive Components

```tsx
function ResponsiveCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(cardRef)

  const cardSize = width < 300
    ? 'small'
    : width < 600 ? 'medium' : 'large'

  return (
    <div
      ref={cardRef}
      className={`card card--${cardSize}`}
    >
      <h2>Responsive Card</h2>
      <p>
        Current size:
        {cardSize}
      </p>
      <p>
        Width:
        {width}
        px
      </p>
    </div>
  )
}
```

### Grid Layout

```tsx
function DynamicGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(gridRef)

  const columns = Math.floor(width / 200) // 200px per item

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1rem'
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="grid-item">
          Item
          {i + 1}
        </div>
      ))}
    </div>
  )
}
```

## Type Definitions

```typescript
interface Size {
  // Element width in pixels
  width: number
  // Element height in pixels
  height: number
}

function useElementSize<T extends HTMLElement>(
  ref: RefObject<T | null>
): Size
```

## Best Practices

1. **Performance Optimization**

   ```tsx
   function OptimizedComponent() {
     const ref = useRef<HTMLDivElement>(null)
     const { width, height } = useElementSize(ref)

     // Memoize calculations based on size
     const dimensions = useMemo(() => ({
       area: width * height,
       ratio: width / height
     }), [width, height])

     return (
       <div ref={ref}>
         Area:
         {dimensions.area}
         px²
         Ratio:
         {dimensions.ratio.toFixed(2)}
       </div>
     )
   }
   ```

2. **Conditional Rendering**

   ```tsx
   function AdaptiveContent() {
     const ref = useRef<HTMLDivElement>(null)
     const { width } = useElementSize(ref)

     return (
       <div ref={ref}>
         {width < 500
           ? (
               <MobileContent />
             )
           : (
               <DesktopContent />
             )}
       </div>
     )
   }
   ```

3. **Size Constraints**

   ```tsx
   function ConstrainedBox() {
     const ref = useRef<HTMLDivElement>(null)
     const { width, height } = useElementSize(ref)

     const isValid = width >= 200 && height >= 200

     return (
       <div ref={ref}>
         {!isValid && (
           <div className="warning">
             Box must be at least 200x200px
           </div>
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
import UseElementSize from './use-element-size.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseElementSize, {}, null))
})
</script>
