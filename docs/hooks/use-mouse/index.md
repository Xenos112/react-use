---
title: useMouse
description: A hook To work with mouse positions.
---

# useMouse

A hook To work with mouse positions.

[[toc]]

## Usage

### Basic

the hook returns the mouse position.

```tsx
import { useMouse } from 'react-use'

export default function UseIdle() {
  const position = useMouse()
  return (
    <div>
      x: {position.x}
      <br />
      y: {position.y}
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useMouse = (): Readonly<Coords>

type Coords = {
  x: number
  y: number
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseMouse from './use-mouse.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseMouse, {}, null))
})

</script>
