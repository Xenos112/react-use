---
title: useSessionStorage
description: A hook that makes working with session storage easy.
---

# useSessionStorage

A hooks that makes working with session storage easy.

[[toc]]

## Usage

### Basic

`useSessionStorage` works just like `useState` but it will also save the value to session storage.
<br />
passing a key will save the value to session storage with that key.
<br />
passing a default value will use that as the initial value.

```tsx{1,4,5,6}
import { useSessionStorage } from 'use-reacty'

export default function UseSessionStorage() {
  const [count, setCount] = useSessionStorage('count', {
    initialValue: 0,
  })

  return (
    <button style={buttonStyle} onClick={() => setCount((prev) => prev! + 1)}>
      Count: {count}
    </button>
  )
}
```

<div>
    <div ref="demo"></div>
</div>

## Type Declarations

```ts
const useSessionStorage: <T>(
  key: string,
  { initialValue }: UseSessionStorageOpts<T>,
) => ReturnType<T>

type SessionStorageValue<T> = T | undefined

interface UseSessionStorageOpts<T> {
  initialValue?: T
}

type ReturnType<T> = [
  SessionStorageValue<T>,
  (
    value:
      | SessionStorageValue<T>
      | ((value: SessionStorageValue<T>) => SessionStorageValue<T>),
  ) => SessionStorageValue<T>,
]
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseSessionStorage from './use-session-storage.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseSessionStorage, {}, null))
})
</script>
