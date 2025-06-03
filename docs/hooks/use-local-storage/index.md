---
title: useLocalStorage
description: A hook that makes working with local storage easy.
---

# useLocalStorage

A hooks that makes working with local storage easy.

[[toc]]

## Usage

### Basic

`useLocalStorage` works just like `useState` but it will also save the value to local storage.
<br />
passing a key will save the value to local storage with that key.
<br />
passing a default value will use that as the initial value.

```tsx{1,4,5,6}
import { useLocalStorage } from 'react-use'

export default function UseLocalStorage() {
  const [count, setCount] = useLocalStorage('count', {
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
const useLocalStorage: <T>(
  key: string,
  { initialValue }: UseLocalStorageOpts<T>,
) => ReturnType<T>

type LocalStorageValue<T> = T | undefined

interface UseLocalStorageOpts<T> {
  initialValue?: T
}

type ReturnType<T> = [
  LocalStorageValue<T>,
  (
    value:
      | LocalStorageValue<T>
      | ((value: LocalStorageValue<T>) => LocalStorageValue<T>),
  ) => LocalStorageValue<T>,
]
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseLocalStorage from './use-local-storage.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseLocalStorage, {}, null))
})
</script>
