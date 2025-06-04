---
title: useElementBounding
description: A hook to work with element boundings in more of a reactive way.
---

# useElementBounding

A hook to work with element boundings in more of a reactive way.

[[toc]]

## Usage

### Basic

the hook returns the bounding object of the element.
<br />
when the element is resized, the bounding object will be updated.

```tsx
import { useRef } from 'react'
import { useElementBounding } from 'use-reacty'

export default function UseElementBounding() {
  const ref = useRef<HTMLDivElement>(null)
  const bounding = useElementBounding(ref)
  return (
    <div ref={ref}>
      width:
      {' '}
      {bounding.width}
      <br />
      height:
      {' '}
      {bounding.height}
      <br />
      top:
      {' '}
      {bounding.top}
      <br />
      left:
      {' '}
      {bounding.left}
      <br />
      bottom:
      {' '}
      {bounding.bottom}
      <br />
      right:
      {' '}
      {bounding.right}
      <br />
      x:
      {' '}
      {bounding.x}
      <br />
      y:
      {' '}
      {bounding.y}
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useElementBounding = <T extends HTMLElement>(ref: RefObject<T | null>): Omit<DOMRect, 'toJSON'>
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseElementBounding from './use-element-bounding.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseElementBounding, {}, null))
})

</script>
