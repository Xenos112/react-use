---
title: useEvent
description: A powerful React hook for handling DOM events with TypeScript support
---

# useEvent

A powerful React hook that provides a simple interface for handling DOM events with automatic cleanup and TypeScript support.

[[toc]]

## Features

- 🎯 Simple event handling
- 🧹 Automatic cleanup
- 🎭 TypeScript-first design
- 🔄 Reference stability
- 🎨 Window/Document/Element support
- 📦 Zero dependencies
- 💫 Memory leak prevention
- ⚡ High performance

## Basic Usage

By default, the hook listens to the `window` object:

```tsx
import { useEvent } from 'use-reacty'

function WindowEvents() {
  useEvent('click', (event) => {
    console.log('Window clicked at:', event.clientX, event.clientY)
  })

  return <div>Click anywhere on the window!</div>
}
```

## Advanced Usage

### With Element Reference

Listen to events on specific elements using refs:

```tsx
import { useRef, useState } from 'react'
import { useEvent } from 'use-reacty'

function ButtonCounter() {
  const [count, setCount] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEvent('click', () => {
    setCount(prev => prev + 1)
  }, buttonRef)

  return (
    <button ref={buttonRef} className="counter-button">
      Clicked
      {count}
      times
    </button>
  )
}
```

### With Event Options

Use event listener options for more control:

```tsx
function EventCapture() {
  const divRef = useRef<HTMLDivElement>(null)

  useEvent('click', (e) => {
    e.stopPropagation()
    console.log('Captured in capture phase!')
  }, divRef, { capture: true })

  return (
    <div ref={divRef}>
      Click me (capturing phase)
    </div>
  )
}
```

### Multiple Events

Handle different types of events on the same element:

```tsx
function InteractiveElement() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEvent('mouseenter', () => {
    console.log('Mouse entered')
  }, elementRef)

  useEvent('mouseleave', () => {
    console.log('Mouse left')
  }, elementRef)

  return <div ref={elementRef}>Hover me!</div>
}
```

## Type Definitions

```typescript
type EventTypes = keyof (
  | DocumentEventMap
  | WindowEventMap
  | HTMLElementEventMap
  | GlobalEventHandlersEventMap
) | 'online' | 'offline'

type EventT<T extends EventTypes> = T extends keyof DocumentEventMap
  ? DocumentEventMap[T]
  : T extends keyof WindowEventMap
    ? WindowEventMap[T]
    : T extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[T]
      : T extends 'online' | 'offline'
        ? Event
        : CustomEvent<T>

type EventHandler<T extends EventTypes> = (event: EventT<T>) => void

type UseEventProps = AddEventListenerOptions | boolean

function useEvent<T extends EventTypes>(
  // Event type to listen for
  type: T,
  // Event handler callback
  handler: EventHandler<T>,
  // Target element (defaults to window)
  target?: TargetElement,
  // Event listener options
  options?: UseEventProps
): void
```

## Best Practices

### Event Cleanup

The hook automatically handles cleanup:

```tsx
function AutoCleanup() {
  const modalRef = useRef<HTMLDivElement>(null)

  useEvent('keydown', (e) => {
    if (e.key === 'Escape')
      closeModal()
  }, modalRef)

  return <div ref={modalRef}>Press ESC to close</div>
}
```

### Performance Optimization

Use stable references for handlers:

```tsx
function OptimizedHandler() {
  const handler = useCallback((e: MouseEvent) => {
    console.log('Clicked at:', e.clientX, e.clientY)
  }, [])

  useEvent('click', handler)

  return <div>Optimized click handling</div>
}
```

### Type Safety

Leverage TypeScript for better type inference:

```tsx
function TypeSafeEvents() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEvent('input', (e) => {
    // e is correctly typed as InputEvent
    console.log('New value:', e.currentTarget.value)
  }, inputRef)

  return <input ref={inputRef} />
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
import UseEvent from './demo.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseEvent, {}, null))
})
</script>
