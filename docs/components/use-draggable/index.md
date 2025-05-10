---
title: useDraggable
description: A hook that makes an element draggable
---

<div ref="el"></div>

# useDraggable

A hooks that makes an element draggable

## Usage

```tsx
import { useDraggable } from 'react-use'

function Draggable() {
  const [ref, position] = useDraggable({ x: 100, y: 100 })
  return (
    <div ref={ref}>
      Drag me {position.x}x{position.y}
    </div>
  )
}
```

## Reference

### useDraggable

```ts
function useDraggable<T extends HTMLElement>(options?: {
  x?: number
  y?: number
  disabled?: boolean
  onStart?: (position: Position) => void
  onMove?: (position: Position) => void
  onEnd?: (position: Position) => void
}): [RefObject<T | null>, Position, isDragging: boolean]
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Draggable from './use-draggable.tsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Draggable, {}, null))
})
</script>
