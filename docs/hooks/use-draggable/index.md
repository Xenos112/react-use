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

the hook returns an object with the following properties `ref`, `position` and `isDragging`
<br />
`ref` is a ref object that you can use to access the element
<br />
`position` is an object with the current position of the element
<br />
`isDragging` is a boolean that indicates if the element is being dragged or not
<br />
all the properties are reactive

```tsx{1,4,6,7,8}
import { useDraggable } from 'react-use'

function Draggable() {
  const { ref, position,isDragging } = useDraggable({ x: 100, y: 100 })
  return (
    <div ref={ref}>
      Drag me {position.x}x{position.y}:{isDragging}
    </div>
  )
}
```

### Events

you can pass a callback function to the `onStart` `onMove` and `onEnd` props to handle the events
<br />
the callback function will receive the current position of the element as an argument.

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

you can pass a boolean to the `disabled` prop to disable the dragging
<br />
desabled could be a reactive value, so you can toggle the dragging with a button.

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

you can pass a string to the `axis` prop to move the element in a specific axis
<br />
the axis could be `x`, `y` or `both`
<br />
default value is `both`

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

## Type Definitions

### useDraggable

```ts
function useDraggable<T extends HTMLElement>(options?: {
  x?: number
  y?: number
  disabled?: boolean
  axis?: Axis
  preventDefault?: boolean
  onStart?: (position: Position) => void
  onMove?: (position: Position) => void
  onEnd?: (position: Position) => void
}): { ref: RefObject<T | null>; position: Position; isDragging: boolean }

type Postion = { x: number; y: number }
type Axis = 'x' | 'y' | 'both'

type ReturnType<T> = {
  ref: RefObject<T | null>
  position: Postion
  isDragging: boolean
}

type UseDraggableProps = {
  x?: number
  y?: number
  onStart?: (position: Postion) => void
  onMove?: (position: Postion) => void
  onEnd?: (position: Postion) => void
  disabled?: boolean
  axis?: Axis
  preventDefault?: boolean
}
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
