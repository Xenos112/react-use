---
title: useTitle
description: A React hook for managing document title with automatic updates
---

# useTitle

A React hook that provides a simple interface for managing the document title with automatic updates when the value changes.

[[toc]]

## Features

- 📝 Document title management
- 🔄 Automatic updates
- 🎭 TypeScript support
- 🎯 useState-like API

## Basic Usage

```tsx
import { useTitle } from 'use-reacty'

function PageTitle() {
  const [title, setTitle] = useTitle('Welcome')

  return (
    <div>
      <h3>
        Current Title:
        {title}
      </h3>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Change page title..."
      />
    </div>
  )
}
```

## Type Definitions

```typescript
type UseTitleReturn = [
  // Current title value
  string,
  // Title setter function
  Dispatch<SetStateAction<string>>
]

function useTitle(
  // Optional initial title
  initialTitle?: string
): UseTitleReturn
```

## Advanced Usage

### Dynamic Titles

```tsx
function DynamicTitle() {
  const [count, setCount] = useState(0)
  const [_, setTitle] = useTitle('Notifications')

  useEffect(() => {
    setTitle(`(${count}) New Messages`)
  }, [count])

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Add Notification
    </button>
  )
}
```

### With Route Changes

```tsx
function RouteTitle() {
  const { pathname } = useLocation()
  const [_, setTitle] = useTitle()

  useEffect(() => {
    const formatted = pathname
      .slice(1)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    setTitle(formatted || 'Home')
  }, [pathname])

  return (
    <div>
      Current route:
      {pathname}
    </div>
  )
}
```

## Best Practices

1. **Initial Value**

   ```tsx
   function HomePage() {
     // Provide default title
     const [title] = useTitle('Welcome | My App')
     return <h1>{title}</h1>
   }
   ```

2. **Dynamic Updates**

   ```tsx
   function BlogPost({ post }) {
     const [_, setTitle] = useTitle()

     useEffect(() => {
       setTitle(`${post.title} | Blog`)
       // Reset on unmount
       return () => setTitle('Blog')
     }, [post.title])

     return <article>{post.content}</article>
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
import UseTitle from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseTitle, {}, null))
})
</script>
