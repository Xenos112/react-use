---
title: useWindowSize
description: A React hook for tracking window dimensions with automatic updates
---

# useWindowSize

A React hook that provides real-time window dimensions tracking with automatic updates on resize events.

[[toc]]

## Features

- 📏 Window size tracking
- 🔄 Real-time updates
- 🎭 TypeScript support
- 📐 Responsive design

## Basic Usage

```tsx
import { useWindowSize } from 'use-reacty'

function WindowSizeTracker() {
  const { width, height } = useWindowSize()

  return (
    <div>
      <h3>Window Dimensions</h3>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  )
}
```

## Type Definitions

```typescript
type WindowSize = Readonly<{
  // Window width in pixels
  width: number
  // Window height in pixels
  height: number
}>

function useWindowSize(): WindowSize
```

## Advanced Usage

### Responsive Layout

```tsx
function ResponsiveComponent() {
  const { width } = useWindowSize()

  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  return (
    <div className={`layout ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
      {isMobile && <MobileNav />}
      {isTablet && <TabletNav />}
      {isDesktop && <DesktopNav />}
    </div>
  )
}
```

### Dynamic Styling

```tsx
function DynamicGrid() {
  const { width } = useWindowSize()

  const columns = Math.floor(width / 200) // 200px per item

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '1rem'
    }}>
      {items.map(item => (
        <GridItem key={item.id} data={item} />
      ))}
    </div>
  )
}
```

## Best Practices

1. **Performance Optimization**

   ```tsx
   function OptimizedLayout() {
     const { width } = useWindowSize()

     // Round to nearest breakpoint to prevent unnecessary rerenders
     const breakpoint = useMemo(() => {
       if (width < 640) return 'sm'
       if (width < 1024) return 'md'
       return 'lg'
     }, [Math.floor(width / 100)])

     return <div className={`container-${breakpoint}`}>Content</div>
   }
   ```

2. **Aspect Ratio**

   ```tsx
   function AspectRatioContainer() {
     const { width, height } = useWindowSize()
     const aspectRatio = width / height

     return (
       <div>
         <p>Current Aspect Ratio: {aspectRatio.toFixed(2)}</p>
         <div style={{
           width: '100%',
           paddingBottom: `${(1 / aspectRatio) * 100}%`,
           position: 'relative'
         }}>
           Content
         </div>
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
import UseWindowSize from './use-window-size.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseWindowSize, {}, null))
})
</script>
