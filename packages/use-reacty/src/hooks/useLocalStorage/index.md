---
title: useLocalStorage
description: A type-safe React hook for managing localStorage state
---

# useLocalStorage

A powerful React hook that provides a type-safe interface for managing localStorage state with automatic value serialization and parsing.

[[toc]]

## Features

- 🔄 Automatic state synchronization
- 📦 Type-safe storage management
- 🎭 TypeScript-first design
- 💾 Persistent state
- 🎯 useState-like API
- ⚙️ Change callbacks
- 🔍 Default value support

## Basic Usage

```tsx
import { useLocalStorage } from 'use-reacty'

function Counter() {
  const [count, setCount] = useLocalStorage('count', {
    initialValue: 0
  })

  return (
    <button onClick={() => setCount(prev => (prev ?? 0) + 1)}>
      Count:
      {count ?? 0}
    </button>
  )
}
```

## Type Definitions

```typescript
interface UseLocalStorageOpts<T> {
  // Initial value if none exists in storage
  initialValue?: T
  // Callback when value changes
  onChange?: (value: T | undefined) => void
}

type SetStorageValue<T> = (
  value: T | undefined | ((prev: T | undefined) => T | undefined)
) => T | undefined

function useLocalStorage<T>(
  // Storage key
  key: string,
  // Configuration options
  options: UseLocalStorageOpts<T>
): [T | undefined, SetStorageValue<T>]
```

## Advanced Usage

### With Complex Types

```tsx
interface User {
  name: string
  theme: 'light' | 'dark'
  preferences: Record<string, boolean>
}

function UserSettings() {
  const [user, setUser] = useLocalStorage<User>('user', {
    initialValue: {
      name: 'John',
      theme: 'light',
      preferences: {}
    },
    onChange: (newUser) => {
      console.log('User settings updated:', newUser)
    }
  })

  return (
    <div>
      <input
        value={user?.name}
        onChange={e => setUser(prev => ({
          ...prev!,
          name: e.target.value
        }))}
      />
      <select
        value={user?.theme}
        onChange={e => setUser(prev => ({
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

### With Default Values

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', {
    initialValue: 'light' as const
  })

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Current Theme:
      {theme}
    </button>
  )
}
```

## Best Practices

1. **Type Safety**

   ```tsx
   // Define explicit types for better type inference
   const [value, setValue] = useLocalStorage<string>('key', {
     initialValue: 'default'
   })
   ```

2. **Handle Undefined Values**

   ```tsx
   const [count, setCount] = useLocalStorage<number>('count', {
     initialValue: 0
   })

   // Always provide fallback for potentially undefined values
   const displayCount = count ?? 0
   ```

3. **Change Monitoring**
   ```tsx
   const [data, setData] = useLocalStorage('data', {
     initialValue: [],
     onChange: (newData) => {
       // React to changes
       updateUI(newData)
     }
   })
   ```

## Live Demo

<div>
<div ref="demo"></div>
</div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseLocalStorage from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseLocalStorage, {}, null))
})
</script>
