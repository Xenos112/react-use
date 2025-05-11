---
title: useEvent
description: A hook that handles events in a very simple way.
---

# useEvent

A hooks that handles events in a very simple way.

[[toc]]

## Usage

### Basic

by default the hook will listen to the `window` object, but you can pass a ref to listen to a specific element.
<br />
it will clean up the event listener when the component unmounts.

```tsx
import { useEvent } from 'react-use'

export default function UseEvent() {
  useEvent('click', () => console.log('clicked!'))
  return <div>Click me!</div>
}
```

### With a ref

you can pass a ref to the element you want to listen to the event on.

```tsx
import { useEvent } from 'react-use'
import { useRef, useState } from 'react'

export default function UseEvent() {
  const [count, setCount] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEvent(
    'click',
    () => {
      setCount(count + 1)
    },
    buttonRef,
  )
  return <button ref={buttonRef}>Count: {count}</button>
}
```

<div>
    <div ref="demo"></div>
</div>

## Types

```ts
const useEvent = <T extends keyof DocumentEventMap>(
  type: T,
  handler: EventHandler<T>,
  target: TargetElement, // default is window
  options?: UseEventProps,
): void


type EventHandler<T extends keyof DocumentEventMap> = (
  event: DocumentEventMap[T],
) => void

type TargetElement = EventTarget | RefObject<EventTarget | null>
type UseEventProps = AddEventListenerOptions | boolean
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseEvent from './use-event.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseEvent, {}, null))
})

</script>
