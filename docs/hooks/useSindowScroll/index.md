---
title: useWindowScroll
description: A React hook for managing window scroll position and smooth scrolling
---

# useWindowScroll

A React hook that provides smooth window scrolling functionality and real-time scroll position tracking.

[[toc]]

## Features

- 📜 Window scroll management
- 🔄 Real-time position tracking
- 🎭 TypeScript support
- ⚡ Smooth scrolling

## Basic Usage

```tsx
import { useWindowScroll } from 'use-reacty'

function ScrollManager() {
  const { scrollY, scrollX, x, y } = useWindowScroll()

  return (
    <div>
      <div className="controls">
        <button onClick={() => scrollY(100)}>
          Scroll Down 100px
        </button>
        <button onClick={() => scrollX(100)}>
          Scroll Right 100px
        </button>
      </div>
      <div className="position">
        Current Position: (
        {x}
        ,
        {y}
        )
      </div>
    </div>
  )
}
```

## Type Definitions

```typescript
interface WindowScroll {
  // Scroll horizontally
  scrollX: (value: number) => void
  // Scroll vertically
  scrollY: (value: number) => void
  // Scroll in both directions
  scroll: (x: number, y: number) => void
  // Current horizontal position
  x: number
  // Current vertical position
  y: number
}

function useWindowScroll(): WindowScroll
```

## Advanced Usage

### Scroll To Element

```tsx
function ScrollToElement() {
  const { scroll } = useWindowScroll()
  const targetRef = useRef<HTMLDivElement>(null)

  const scrollToElement = () => {
    if (targetRef.current) {
      const { offsetTop, offsetLeft } = targetRef.current
      scroll(offsetLeft, offsetTop)
    }
  }

  return (
    <div>
      <button onClick={scrollToElement}>
        Scroll To Element
      </button>
      <div
        ref={targetRef}
        style={{ marginTop: '1000px' }}
      >
        Target Element
      </div>
    </div>
  )
}
```

### Scroll Position Monitor

```tsx
function ScrollMonitor() {
  const { y } = useWindowScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsScrolled(y > 100)
  }, [y])

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <nav>Website Navigation</nav>
    </header>
  )
}
```

## Best Practices

1. **Smooth Navigation**

   ```tsx
   function SmoothNav() {
     const { scrollY } = useWindowScroll()

     const sections = {
       home: 0,
       about: 500,
       contact: 1000
     }

     return (
       <nav>
         {Object.entries(sections).map(([name, position]) => (
           <button
             key={name}
             onClick={() => scrollY(position)}
           >
             {name}
           </button>
         ))}
       </nav>
     )
   }
   ```

2. **Position-Based Effects**

   ```tsx
   function ScrollEffects() {
     const { y } = useWindowScroll()

     return (
       <div style={{
         opacity: Math.max(0, Math.min(1, 1 - (y / 500))),
         transform: `translateY(${y * 0.5}px)`
       }}
       >
         Parallax Effect
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
import UseWindowScroll from './use-window-scroll.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseWindowScroll, {}, null))
})
</script>
