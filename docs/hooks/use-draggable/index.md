---
title: useDraggable
description: A hook that makes an element draggable
---

<div>
    <div ref="el"></div>
    <div ref="elEvents"></div>
    <div ref="elDisabled"></div>
    <div ref="elAxis"></div>
</div>

# useDraggable

A hooks that makes an element draggable

[[toc]]

## Usage

### Basic

```tsx{1,4,6,7,8}
import { useDraggable } from 'react-use'

function Draggable() {
  const { ref, position } = useDraggable({ x: 100, y: 100 })
  return (
    <div ref={ref}>
      Drag me {position.x}x{position.y}
    </div>
  )
}
```

### Events

```tsx{7,8,9}
import { useDraggable } from 'react-use'

function Draggable() {
  const { ref, position } = useDraggable({
    x: 100,
    y: 100,
    onMove(position) {
      console.log(`moved to ${position.x}x${position.y}`)
    },
  })
  return (
    <div ref={ref}>
      Drag me {position.x}x{position.y}
    </div>
  )
}
```

### Disabled

```tsx{7}
import { useDraggable } from 'react-use'

function Draggable() {
  const { ref, position } = useDraggable({
    x: 100,
    y: 100,
    disabled: true,
  })
  return (
    <div ref={ref}>
      Drag me {position.x}x{position.y}
    </div>
  )
}
```

### Axis

```tsx{7}
import { useDraggable } from 'react-use'

function Draggable() {
  const { ref, position } = useDraggable({
    x: 100,
    y: 100,
    axis: 'x', // move only in the x axis
  })
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
  axis?: Axis
  onStart?: (position: Position) => void
  onMove?: (position: Position) => void
  onEnd?: (position: Position) => void
}): { ref: RefObject<T | null>; position: Position; isDragging: boolean }
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Draggable from './use-draggable.tsx'
import DraggableEvents from './use-draggable-events.tsx'
import DraggableDisabled from './use-draggable-disabled.tsx'
import DraggableAxis from './use-draggable-axis.tsx'

const el = ref()
const elEvents = ref()
const elDisabled = ref()
const elAxis = ref()

onMounted(() => {
  const root1 = createRoot(el.value)
  root1.render(createElement(Draggable, {}, null))

  const root2 = createRoot(elEvents.value)
  root2.render(createElement(DraggableEvents, {}, null))

  const root3 = createRoot(elDisabled.value)
  root3.render(createElement(DraggableDisabled, {}, null))

  const root4 = createRoot(elAxis.value)
  root4.render(createElement(DraggableAxis, {}, null))
})
</script>
