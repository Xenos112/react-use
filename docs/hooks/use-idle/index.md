---
title: useIdle
description: A hook To detect when the user is idle.
---

# useIdle

A hooks To detect when the user is idle.

[[toc]]

## Usage

### Basic

the hook will listen to all events on the `document` object and return a boolean indicating if the user is idle or not.
<br />
it will clean up the event listener when the component unmounts.

```tsx
import { useIdle } from 'use-reacty'

export default function UseIdle() {
  const { isIdle, lastActive } = useIdle()
  return (
    <div>
      <span>
        isIdle:
        {isIdle ? 'true' : 'false'}
      </span>
      <span>
        lastActive:
        {lastActive}
      </span>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useIdle = (): UseIdleReturnType

type UseIdleReturnType = {
  isIdle: boolean
  lastActive: number
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseIdle from './use-idle.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseIdle, {}, null))
})

</script>
