---
title: useAsyncState
description: A React hook for handling asynchronous operations with loading, error, and success states
---

# useAsyncState

A powerful React hook that simplifies handling asynchronous operations by managing loading, error, and success states. It provides a clean interface to work with promises while handling common async patterns.

[[toc]]

## Basic Usage

Here's a simple example fetching data from an API:

```tsx
import { useAsyncState } from 'use-reacty'

function UserProfile() {
  const { data, error, isLoading, isSettled } = useAsyncState(() =>
    fetch('https://api.example.com/user/1').then(res => res.json())
  )

  if (isLoading)
    return <div>Loading...</div>
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }
  if (!data)
    return null

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  )
}
```

## Advanced Usage

### With Callbacks

The hook accepts callbacks for success and error scenarios:

```tsx
import { useAsyncState } from 'use-reacty'

function TodoList() {
  const { data, error, isLoading } = useAsyncState(
    () => fetch('https://api.example.com/todos').then(res => res.json()),
    {
      onSuccess: (data) => {
        console.log('Todos loaded:', data)
        // You can trigger side effects here
      },
      onError: (error) => {
        console.error('Failed to load todos:', error)
        // Handle error specifically
      }
    }
  )

  return (
    <div>
      {isLoading && <div>Loading todos...</div>}
      {error && (
        <div>
          Failed to load:
          {error.message}
        </div>
      )}
      {data && (
        <ul>
          {data.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### With TypeScript

The hook is fully typed and provides great TypeScript support:

```tsx
interface User {
  id: number
  name: string
  email: string
}

function UserDirectory() {
  const { data, error, isLoading, isSettled } = useAsyncState<User[]>(
    async () => {
      const response = await fetch('https://api.example.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      return response.json()
    }
  )

  return (
    <div>
      {isLoading && <div>Loading users...</div>}
      {error && (
        <div>
          Error:
          {error.message}
        </div>
      )}
      {data && (
        <ul>
          {data.map(user => (
            <li key={user.id}>
              {user.name}
              (
              {user.email}
              )
            </li>
          ))}
        </ul>
      )}
      {isSettled && <div>Request completed</div>}
    </div>
  )
}
```

## API Reference

### Parameters

#### `asyncFn`

- Type: `() => Promise<T>`
- Required: Yes
- Description: An async function that returns a promise resolving to type `T`

#### `options`

- Type: `UseAsyncStateOptions<T>`
- Required: No
- Description: Configuration options object

### Return Value

The hook returns an object with the following properties:

```typescript
interface UseAsyncStateReturnType<T> {
  // The resolved data from the async function
  data: T | null
  // Any error that occurred during execution
  error: Error | null
  // Whether the async function is currently executing
  isLoading: boolean
  // Whether the async operation has completed (success or error)
  isSettled: boolean
}
```

### Options Interface

```typescript
interface UseAsyncStateOptions<T> {
  // Called when the async function successfully resolves
  onSuccess?: (data: T) => void
  // Called when the async function throws an error
  onError?: (error: Error) => void
}
```

## Best Practices

1. **Error Boundaries**: Consider using React Error Boundaries with this hook for better error handling
2. **Loading States**: Always handle the loading state to provide good UX
3. **Type Safety**: Use TypeScript generics to ensure type safety
4. **Cleanup**: The hook handles cleanup automatically on unmount

## Examples

### Fetching with Abort Controller

```tsx
function SearchResults() {
  const { data, isLoading } = useAsyncState(async () => {
    const controller = new AbortController()
    const response = await fetch('https://api.example.com/search', {
      signal: controller.signal
    })
    return response.json()
  })

  return (
    <div>
      {isLoading ? <Spinner /> : <ResultsList data={data} />}
    </div>
  )
}
```

### Handling Different States

```tsx
function DataLoader() {
  const { data, error, isLoading, isSettled } = useAsyncState(async () => {
    const response = await fetch('https://api.example.com/data')
    return response.json()
  })

  return (
    <div>
      <div>
        Status:
        {isSettled ? 'Completed' : 'Pending'}
      </div>

      {isLoading && (
        <div className="loading-state">
          <Spinner />
          <p>Loading your data...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <ErrorIcon />
          <h3>Something went wrong</h3>
          <p>{error.message}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {data && (
        <div className="success-state">
          <SuccessIcon />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

## Live Demo

<div>
<div ref="demo"></div>
</div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseAsyncState from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseAsyncState, {}, null))
})
</script>
