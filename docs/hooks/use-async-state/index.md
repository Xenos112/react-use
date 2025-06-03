---
title: useAsyncState
description: A hook To Load data asynchronously.
---

# useAsyncState

A hook To Load data asynchronously.

[[toc]]

## Usage

### Basic

the hook will load the data asynchronously and return a boolean indicating if the data is loading or not.

```tsx
import { useAsyncState } from 'react-use'

export default function UseAsyncState() {
  const { data, error, isLoading } = useAsyncState(() =>
    fetch('https://jsonplaceholder.typicode.com/todos/1').then(res =>
      res.json(),
    ),
  )

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {error.message}
        </p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

### Options

```tsx
import { useAsyncState } from 'react-use'

export default function UseAyncState() {
  const { data, error, isLoading } = useAsyncState(() =>
    fetch('https://jsonplaceholder.typicode.com/todos/1').then(
      res => res.json(),
      {
        onSuccess: (data) => {
          console.log('onSuccess', data)
        },
        onError: (err) => {
          console.log('onError', err)
        },
      },
    ),
  )

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {error.message}
        </p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

## Types Definitions

```ts
const useAyncState = <T>(asyncFn:() => Promise<T>,opts: UseAsyncStateOptions<T> = {}): UseAsyncStateReturnType<T>

type UseAsyncStateOptions<T> = {
  onSuccess?: (data: T) => void
  onError?: (err: Error) => void
}

type UseAsyncStateReturnType<T> = {
  data: T | null
  error: Error | null
  isLoading: boolean
  isSettled: boolean
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseAyncState from './use-async-state.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseAyncState, {}, null))
})

</script>
