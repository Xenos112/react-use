---
title: useImage
description: A hook to load images in more efficient way.
---

# useImage

A hook to load images in more efficient way.

[[toc]]

## Usage

### Basic

the `useImage` hook returns an object with the following properties:

- `image`: the image url.
- `error`: the error message if any.
- `isLoading`: a boolean indicating if the image is loading.
  <br />
  you can pass a `src` prop to the hook to load the image.
  <br />
  you cab also pass a `onLoad` and `onError` props to the hook to handle the loading and error events.

```tsx
const { image, error, isLoading } = useImage({
  src: 'https://picsum.photos/200/300',
  onLoad: () => {
    console.log('image loaded')
  },
  onError: (err) => {
    console.log('error', err)
  },
})
```

```tsx
import { useState } from 'react'
import { useImage } from 'react-use'

export default function UseImage() {
  const urls: string[] = [
    'https://picsum.photos/200/200',
    'https://picsum.photos/200/201',
    'https://picsum.photos/200/202',
    'https://picsum.photos/200/203',
  ]
  const [number, setNumber] = useState(0)
  const { image, error, isLoading } = useImage({
    src: urls[number],
  })

  return (
    <div>
      {image && <img src={image} />}
      {error && <p>Error: {error}</p>}
      {isLoading && <p>Loading...</p>}
      <div>
        <button onClick={() => setNumber((number + 1) % urls.length)}>
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

type UseImageProps = {
  src: string
  onLoad?: () => void
  onError?: (err: Error) => void
}

type UseImageReturnType = {
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
