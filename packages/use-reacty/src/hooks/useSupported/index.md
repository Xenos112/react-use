---
title: useSupported
description: A React hook for checking browser feature support with TypeScript
---

# useSupported

A React hook that provides a convenient way to check if a browser feature or API is supported in the current environment.

[[toc]]

## Features

- 🔍 Feature detection
- 🎭 TypeScript support
- 🎯 Boolean return value

## Basic Usage

```tsx
import { useSupported } from 'use-reacty'

function FeatureDetection() {
  const isSupported = useSupported(() =>
    typeof window !== 'undefined' && 'IntersectionObserver' in window
  )

  return (
    <div>
      <h3>Feature Support</h3>
      <p>
        IntersectionObserver is
        {isSupported ? ' ✅ supported' : ' ❌ not supported'}
      </p>
    </div>
  )
}
```

## Type Definitions

```typescript
function useSupported(
  // Callback to check feature support
  cb: () => unknown
): boolean
```

## Advanced Usage

### API Detection

```tsx
function APISupport() {
  const hasGeolocation = useSupported(() =>
    navigator && 'geolocation' in navigator
  )

  const hasClipboard = useSupported(() =>
    navigator && 'clipboard' in navigator
  )

  const hasBattery = useSupported(() =>
    navigator && 'getBattery' in navigator
  )

  return (
    <div className="feature-list">
      <div>
        Geolocation API:
        {hasGeolocation ? '✅' : '❌'}
      </div>
      <div>
        Clipboard API:
        {hasClipboard ? '✅' : '❌'}
      </div>
      <div>
        Battery API:
        {hasBattery ? '✅' : '❌'}
      </div>
    </div>
  )
}
```

### Conditional Rendering

```tsx
function ModernFeatures() {
  const hasShare = useSupported(() =>
    navigator && 'share' in navigator
  )

  const hasWebGL = useSupported(() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(window.WebGLRenderingContext
        && (canvas.getContext('webgl')
          || canvas.getContext('experimental-webgl'))
      )
    }
    catch (e) {
      return false
    }
  })

  return (
    <div>
      {hasShare && (
        <button onClick={() => navigator.share({ title: 'Hello' })}>
          Share
        </button>
      )}
      {hasWebGL && (
        <div>WebGL content here</div>
      )}
    </div>
  )
}
```

## Best Practices

1. **Safe Checking**

   ```tsx
   function SafeCheck() {
     const hasFeature = useSupported(() => {
       try {
         return 'someAPI' in window
       }
       catch {
         return false
       }
     })

     return (
       <div>
         Feature:
         {hasFeature ? 'Available' : 'Unavailable'}
       </div>
     )
   }
   ```

2. **Multiple Conditions**

   ```tsx
   function ComplexSupport() {
     const isSupported = useSupported(() =>
       typeof window !== 'undefined'
       && window.CSS
       && CSS.supports
       && CSS.supports('display', 'grid')
     )

     return (
       <div className={isSupported ? 'grid-layout' : 'fallback-layout'}>
         Content
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
import UseSupported from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseSupported, {}, null))
})
</script>
