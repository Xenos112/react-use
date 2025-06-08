---
title: useSessionStorage
description: A React hook for managing session storage with type-safe state management
---

# useSessionStorage

A powerful React hook that provides a type-safe interface for managing session storage with automatic serialization and state synchronization.

[[toc]]

## Features

- 💾 Session storage persistence
- 🎭 TypeScript support
- ⚡ State synchronization
- 🎯 useState-like API

## Basic Usage

```tsx
import { useSessionStorage } from 'use-reacty'

function Counter() {
  const [count, setCount] = useSessionStorage('count', {
    initialValue: 0
  })

  return (
    <div>
      <h3>Persisted Counter</h3>
      <p>
        Count:
        {count}
      </p>
      <button onClick={() => setCount(prev => (prev ?? 0) + 1)}>
        Increment
      </button>
    </div>
  )
}
```

## Type Definitions

```typescript
interface UseSessionStorageOpts<T> {
  // Initial value if none in storage
  initialValue?: T
  // Callback when value changes
  onChange?: (value: T | undefined) => void
}

type SessionStorageValue<T> = T | undefined

type ReturnType<T> = [
  SessionStorageValue<T>,
  (
    value: SessionStorageValue<T> |
      ((prev: SessionStorageValue<T>) => SessionStorageValue<T>)
  ) => SessionStorageValue<T>
]

function useSessionStorage<T>(
  key: string,
  options: UseSessionStorageOpts<T>
): ReturnType<T>
```

## Advanced Usage

### With Complex Types

```tsx
interface UserPreferences {
  theme: 'light' | 'dark'
  fontSize: number
  notifications: boolean
}

function Settings() {
  const [preferences, setPreferences] = useSessionStorage<UserPreferences>('user-preferences', {
    initialValue: {
      theme: 'light',
      fontSize: 16,
      notifications: true
    },
    onChange: (newPrefs) => {
      console.log('Preferences updated:', newPrefs)
    }
  })

  return (
    <div>
      <h3>User Settings</h3>
      <select
        value={preferences?.theme}
        onChange={e => setPreferences(prev => ({
          ...prev!,
          theme: e.target.value as 'light' | 'dark'
        }))}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
```

### With Form State

```tsx
function PersistentForm() {
  const [formData, setFormData] = useSessionStorage('form-draft', {
    initialValue: {
      title: '',
      content: ''
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev!,
      [name]: value
    }))
  }

  return (
    <form>
      <input
        name="title"
        value={formData?.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={formData?.content}
        onChange={handleChange}
      />
    </form>
  )
}
```

## Best Practices

1. **Type Safety**

   ```tsx
   function TypeSafeStorage() {
     // Explicitly type the stored value
     const [data, setData] = useSessionStorage<string[]>('items', {
       initialValue: []
     })

     return (
       <ul>
         {data?.map(item => (
           <li key={item}>{item}</li>
         ))}
       </ul>
     )
   }
   ```

2. **Handle Undefined Values**

   ```tsx
   function SafeAccess() {
     const [value, setValue] = useSessionStorage<number>('count', {
       initialValue: 0
     })

     // Always provide fallback for undefined
     const displayValue = value ?? 0

     return (
       <div>
         Count:
         {displayValue}
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
import UseSessionStorage from './use-session-storage.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseSessionStorage, {}, null))
})
</script>
