---
title: useElementVisibility
description: A hook To manage element visibility.
---

# useElementVisibility

A hook To manage element visibility.

[[toc]]

## Usage

### Basic

the `useElementVisibility` hook returns a boolean value that indicates whether the target element is visible or not.
<br/>
the `ref` parameter is a `RefObject` that points to the target element.
<br/>
`useElementVisibility` accepts an optional `IntersectionObserverInit` parameter that allows you to customize the behavior of the `IntersectionObserver`.

```tsx
import { useRef } from 'react'
import { useElementVisibility } from 'react-use'

export default function UseElementVisibility() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisibility(ref)

  return (
    <div ref={ref}>
      <span>
        Element is
        {isVisible ? 'visible' : 'not visible'}
      </span>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useElementVisibility = <T extends HTMLElement>(ref:RefObject<T | null>,opts?:IntersectionObserverInit): Readonly<boolean>

interface IntersectionObserverInit {
  root?: Element | null
  rootMargin?: string
  threshold?: number
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseElementVisibility from './use-element-visibility.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseElementVisibility, {}, null))
})

</script>
