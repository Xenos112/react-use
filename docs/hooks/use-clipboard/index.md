---
title: useClipboard
description: A hook to work with the system clipboard.
---

# useClipboard

A hook to work with the system clipboard.

[[toc]]

## Usage

### Basic

the hook will return a function to copy a text and a boolean to indicate if the browser supports the clipboard api, as well as a boolean to indicate if the copy did happen, the `timeout` option will edit the time of the `copied` boolean
<br />
`useClipboard` will return a `text` state to show the copied text.

```tsx
import { useState } from 'react'
import { useClipboard } from 'react-use'

export default function UseClipboard() {
  const [input, setInput] = useState('')
  const { copy, copied, text } = useClipboard()

  return (
    <div>
      <div>
        <button onClick={() => copy(input)}>copy</button>
        {copied && <span>copied</span>}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <p>
        text:
        {text}
      </p>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useClipboard = (opts: Options): ReturnType

type ReturnType = {
  copy: (text: string) => void
  isSupported: boolean
  text: string
  copied: boolean
}

type Options = {
  timeout?: number
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseClipboard from './use-clipboard.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseClipboard, {}, null))
})

</script>
