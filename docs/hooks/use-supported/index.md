---
title: useSupported
description: A hook To view if the feature is supported in the browser.
---

# useSupported

A hook To view if the feature is supported in the browser.

[[toc]]

## Usage

### Basic

`useSupported` returns a boolean to indicate if the feature does exist in the browser or not

```tsx
import { useSupported } from 'use-reacty'

export default function UseSupported() {
  const isSupported = useSupported(() => navigator && 'getBattery' in navigator)

  return (
    <div>
      {isSupported ? 'Does Support' : 'Doesn\'t Support'}
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useSupported = (): boolean
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseSupported from './use-supported.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseSupported, {}, null))
})

</script>
