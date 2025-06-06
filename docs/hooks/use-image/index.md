---
title: useImage
description: a hook to track the image loading status.
---

# useImage

a hook to track the image loading status.

[[toc]]

## Usage

### Basic

`useImage` will load the image via `Image` constructor and then return a `isLoading` boolean indicating if the image is loading or not.
<br />
you can pass a `src` prop to the hook to load the image.

```tsx
import { useState } from 'react'
import { useImage } from 'use-reacty'

export default function UseImage() {
  const urls: string[] = [
    'https://picsum.photos/200/200',
    'https://picsum.photos/200/201',
    'https://picsum.photos/200/202',
    'https://picsum.photos/200/203',
    'https://invalid.url',
  ]
  const [number, setNumber] = useState(0)
  const { error, isLoading, Image } = useImage({
    src: urls[number],
    width: 200,
    height: 200,
  })

  return (
    <div>
      {isLoading
        ? (
            <p>Loading...</p>
          )
        : (
            <Image />
          )}
      {error && (
        <p>
          Error:
          {error.message}
        </p>
      )}
      <div>
        <button
          onClick={() => setNumber((number + 1) % urls.length)}
        >
          Change image
        </button>
      </div>
    </div>
  )
}
```

<div>
<div ref="demo"></div>
</div>

## Types Definitions

```ts
const useImage: ({ src, onLoad, onError }: UseImageProps) => UseImageReturnType

interface UseImageProps {
  src: string
  onLoad?: () => void
  onError?: (err: Error) => void
}

interface UseImageReturnType {
  image: string | null
  error: string | null
  isLoading: boolean
}
```

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UseImage from './use-image.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseImage, {}, null))
})

</script>
