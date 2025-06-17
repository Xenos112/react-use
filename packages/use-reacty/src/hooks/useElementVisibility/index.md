---
title: useElementVisibility
description: A React hook for tracking element visibility in the viewport using Intersection Observer
---

# useElementVisibility

A powerful React hook that tracks element visibility in the viewport using the Intersection Observer API. Perfect for implementing infinite scroll, lazy loading, and visibility-based animations.

[[toc]]

## Features

- 👁️ Real-time visibility tracking
- 🔄 Intersection Observer powered
- 🎯 Customizable thresholds
- 🎭 TypeScript-first design
- 🚀 Zero dependencies
- 📊 High-performance monitoring
- 💫 Automatic cleanup
- 🔬 Root margin support

## Basic Usage

```tsx
import { useRef } from 'react'
import { useElementVisibility } from 'use-reacty'

function VisibilityTracker() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisibility(ref)

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        border: '2px solid',
        borderColor: isVisible ? '#4CAF50' : '#FF5252'
      }}
    >
      <h3>Visibility Status</h3>
      <p>{isVisible ? '✅ Element is visible' : '❌ Element is hidden'}</p>
    </div>
  )
}
```

## Type Definitions

```typescript
interface IntersectionObserverInit {
  // Element that is used as the viewport
  root?: Element | null
  // Margin around the root
  rootMargin?: string
  // Percentage of element visibility
  threshold?: number | number[]
}

function useElementVisibility<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit
): Readonly<boolean>
```

## Advanced Usage

### Custom Threshold

```tsx
function GradualReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisibility(ref, {
    threshold: 0.5 // 50% visibility required
  })

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : '20px'})`,
        transition: 'all 0.3s ease-in-out'
      }}
    >
      I fade in when half visible
    </div>
  )
}
```

### Root Margin

```tsx
function PreloadContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isNearing = useElementVisibility(ref, {
    rootMargin: '100px' // Detect 100px before visible
  })

  return (
    <div ref={ref}>
      {isNearing
        ? (
            <PreloadedContent />
          )
        : (
            <LoadingPlaceholder />
          )}
    </div>
  )
}
```

## Best Practices

### Lazy Loading Images

```tsx
function LazyImage({ src, alt }: { src: string, alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const isVisible = useElementVisibility(imgRef)

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
      loading="lazy"
      style={{ minHeight: '200px' }}
    />
  )
}
```

### Infinite Scroll

```tsx
function InfiniteList() {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isLoadMoreVisible = useElementVisibility(loadMoreRef)
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    if (isLoadMoreVisible) {
      loadMoreItems().then((newItems) => {
        setItems(prev => [...prev, ...newItems])
      })
    }
  }, [isLoadMoreVisible])

  return (
    <div>
      {items.map(item => (
        <ListItem key={item} data={item} />
      ))}
      <div ref={loadMoreRef}>
        Loading more...
      </div>
    </div>
  )
}
```

### Scroll Animations

```tsx
function AnimatedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisibility(sectionRef, {
    threshold: 0.2,
    rootMargin: '50px'
  })

  return (
    <section
      ref={sectionRef}
      className={`section ${isVisible ? 'section--active' : ''}`}
    >
      <h2>Animated Content</h2>
      <p>Animates when 20% visible</p>
    </section>
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
import UseElementVisibility from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseElementVisibility, {}, null))
})
</script>
