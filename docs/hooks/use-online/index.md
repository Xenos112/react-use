---
title: useOnline
description: A hook To Work with online and offline with reactivity.
---

# useOnline

A hook To Work with online and offline with reactivity.

[[toc]]

## Usage

### Basic

the hook returns a boolean value that indicates if the user is online or not.
<br />
the returned value is reactive to online and offline events, meaning you can update UI without using `useState` or `useEffect`.

```tsx
import { useOnline } from 'react-use'

export default function UseIdle() {
  const isOnline = useOnline()
  return (
    <div>
      <span>isOnline: {isOnline ? 'true' : 'false'}</span>
    </div>
  )
}
```

<div>
    <div ref="demo"></div>
</div>

## Types Definitions

```ts
const useOnline = (): boolean
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseOnline from './use-online.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseOnline, {}, null))
})

</script>
