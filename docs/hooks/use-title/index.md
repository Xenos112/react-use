---
title: useTitle
description: A hook To work with documents titles
---

# useTitle

A hook To work with documents titles

[[toc]]

## Usage

### Basic

the hook will update the document title when the dispatcher is called
<br />
`useTitle` expect user to treat it as `useState` since the underline impementation is just `useState` and `useEffect`
<br />
you can pass initial value as a prop to `useTitle` and the document will be updated as well

```tsx
import { useTitle } from 'use-reacty'

export default function UseTitle() {
  const [title, setTitle] = useTitle()

  return (
    <div>
      {title}
      <input value={title} onChange={e => setTitle(e.target.value)} />
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useTitle = (): UseTitleReturn

type UseTitleReturn = [string, Dispatch<SetStateAction<string>>]
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseTitle from './use-title.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseTitle, {}, null))
})

</script>
