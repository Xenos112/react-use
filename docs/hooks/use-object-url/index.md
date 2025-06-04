---
title: useObjectUrl
description: a hook to create an object url from a file or blob.
---

# useObjectUrl

a hook to create an object url from a file or blob.

[[toc]]

## Usage

### Basic

the hook will return a url to the target file, using the `URL.createObjectURL` method.
<br />
it will clean up the url when the component unmounts.
<br />
you can pass a `File`, `Blob` or `MediaSource` object.

```tsx
import { useState } from 'react'
import { useObjectUrl } from 'use-reacty'

export default function UseObjectUrl() {
  const [file, setFile] = useState<File>()
  const url = useObjectUrl(file)

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files?.[0])} />
      {url && (
        <a href={url} target="_blank">
          {url}
        </a>
      )}
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

### Blob

if you pass a `Blob` object, the hook will return a url to the blob.
<br />
make sure to use `useMemo` when you create a blob using `new Blob`, as this will cause the hook to go into an infinite loop.

```tsx
import { useState } from 'react'
import { useObjectUrl } from 'use-reacty'

export default function UseObjectUrl() {
  const blob = useMemo(() => new Blob(['hello'], { type: 'text/plain' }), [])
  const url = useObjectUrl(blob)

  return (
    <div>
      url:
      <a href={url} target="_blank">
        {url}
      </a>
    </div>
  )
}
```

## Types Definitions

```ts
const useObjectUrl = (target?: File | Blob | MediaSource): string | undefined
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseIdle from './use-idle.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseIdle, {}, null))
})

</script>
