---
title: useMounted
description: A hook To view the state of component
---

# useMounted

A hook To view the state of component

[[toc]]

## Usage

### Basic

hook will return a boolean undicating if the component is mounted or Not
<br />
the return value is readonly and it's statuful

```tsx
import { useMounted } from 'use-reacty'

export default function UseMounted() {
  const isMounted = useMounted()
  return (
    <div>
      {isMounted ? 'Mounted' : 'Not Mounted'}
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useMounted = (): Readonly<boolean>
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseMounted from './use-mounted.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseMounted, {}, null))
})

</script>
