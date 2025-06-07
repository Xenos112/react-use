---
title: useWindowScroll
description: A hook To scroll the window
---

# useWindowScroll

A hook To scroll the window

[[toc]]

## Usage

### Basic

`useWindowScroll` retuns an object that contains the current scroll position and methods to scroll the window.

```tsx
import { useWindowScroll } from 'use-reacty'

export default function UseWindowScroll() {
  const { scrollY, scrollX, y, x } = useWindowScroll()

  return (
    <div>
      <div>
        <button onClick={() => scrollY(100)}>Scroll Down</button>
        <button onClick={() => scrollX(100)}>Scroll Right</button>
      </div>
      <div>
        Position:
        {' '}
        {x}
        ,
        {y}
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
const useWindowScroll = (): WindowScroll

type WindowScroll ={
    scrollX: (value: number) => void
    scrollY: (value: number) => void
    scroll: (x: number, y: number) => void
    x: number
    y: number
}
```

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
