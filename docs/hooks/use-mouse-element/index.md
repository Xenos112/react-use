---
title: useMouseElement
description: A hook To work with mouse positions inside of an element.
---

# useMouseElement

A hook To work with mouse positions inside of an element.

[[toc]]

## Usage

### Basic

the hook accepts a ref object and returns the mouse position.
<br />
all the values are reactive.

```tsx
import { useRef } from 'react'
import { useMouseElement } from 'use-reacty'

export default function UseMouseElement() {
  const ref = useRef(null)
  const position = useMouseElement(ref)

  return (
    <div>
      <div ref={ref}>
        x:
        {' '}
        {position.x}
        <br />
        y:
        {' '}
        {position.y}
      </div>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useMouseElement = <T extends HTMLElement>(ref: RefObject<T | null>): Readonly<Coords>

type Coords = {
  x: number
  y: number
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseMouseElement from './use-mouse-element.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseMouseElement, {}, null))
})

</script>
