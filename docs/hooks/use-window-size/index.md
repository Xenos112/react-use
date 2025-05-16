---
title: useWindowSize
description: A hook To use the window size.
---

# useWindowSize

A hook To use the window size.

[[toc]]

## Usage

### Basic

the hook returns the current window size.
<br />
when resizing the window, the hook will update the window size.

```tsx
import { useIdle } from 'react-use'

export default function UseIdle() {
  const { isIdle, lastActive } = useIdle()
  return (
    <div>
      <span>isIdle: {isIdle ? 'true' : 'false'}</span>
      <span>lastActive: {lastActive}</span>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useWindowSize = (): WindowSize

type WindowSize = Readonly<{
height: number,
width: number
}>
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseWindowSize from './use-window-size.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseWindowSize, {}, null))
})

</script>
