---
title: useElementSize
description: A hook work with element sizes in more of a reactive way.
---

# useElementSize

A hook work with element sizes in more of a reactive way.

[[toc]]

## Usage

### Basic

the hook will return a size object with the width and height of the element.
<br />
by default it will listen to the `resize` event on the `ref` object.
<br />
the hook uses the `ResizeObserver` API to observe the element.
<br />
the hook is derived from the [`useElementBounding`](/hooks/use-element-bounding/) hook.

```tsx
import { useRef } from 'react'
import { useElementSize } from 'use-reacty'

export default function UseElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useElementSize(ref)
  return (
    <div ref={ref}>
      {size.width}
      {' '}
      x
      {size.height}
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useElementSize = <T extends HTMLElement>(ref: RefObject<T | null>): Size

type Size = {
  width: number
  height: number
}
```

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
