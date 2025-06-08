---
title: useImage
description: A React hook for managing image loading states with automatic cleanup
---

# useImage

A powerful React hook that manages image loading states and provides a convenient Image component with automatic error handling and loading states.

[[toc]]

## Features

- 🖼️ Image loading state tracking
- ❌ Automatic error handling
- 🎭 TypeScript-first design
- 📦 Zero dependencies
- 🎨 Full image attributes support
- 💫 Lazy loading support

## Basic Usage

```tsx
import { useImage } from 'use-reacty'

function ImageLoader() {
  const { isLoading, error, Image } = useImage({
    src: 'https://example.com/image.jpg',
    alt: 'Example image'
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          Error:
          {error.message}
        </div>
      )}
      <Image />
    </div>
  )
}
```

## Type Definitions

```typescript
interface UseImageOptions {
  // Image source URL
  src: string
  // Alternative text
  alt?: string
  // Image width
  width?: number
  // Image height
  height?: number
  // CSS classes
  className?: string
  // Loading behavior
  loading?: 'eager' | 'lazy'
  // Cross-origin setting
  crossorigin?: 'anonymous' | 'use-credentials'
  // Decoding hint
  decoding?: 'sync' | 'async' | 'auto'
  // Fetch priority
  fetchPriority?: 'high' | 'low' | 'auto'
  // Responsive images
  sizes?: string
  srcSet?: string
  // Image map attributes
  isMap?: boolean
  useMap?: string
  // Referrer policy
  referrerPolicy?: ReferrerPolicy
}

interface UseImageReturnType {
  // Whether the image is loading
  isLoading: boolean
  // Error if loading failed
  error: Error | null
  // React component to render the image
  Image: () => JSX.Element
}
```

## Advanced Usage

### With Loading States

```tsx
function ResponsiveImage() {
  const { isLoading, error, Image } = useImage({
    src: 'https://example.com/image.jpg',
    loading: 'lazy',
    srcSet: 'image-320w.jpg 320w, image-640w.jpg 640w',
    sizes: '(max-width: 320px) 280px, 640px'
  })

  return (
    <div className="image-container">
      {isLoading && <div className="skeleton" />}
      {error && <div className="error-state">{error.message}</div>}
      <Image />
    </div>
  )
}
```

### With Image Gallery

```tsx
function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ]

  const { isLoading, error, Image } = useImage({
    src: images[currentIndex],
    width: 800,
    height: 600,
    fetchPriority: 'high'
  })

  return (
    <div className="gallery">
      {isLoading
        ? (
            <div>
              Loading image
              {currentIndex + 1}
              ...
            </div>
          )
        : error
          ? (
              <div>
                Failed to load image:
                {error.message}
              </div>
            )
          : (
              <Image />
            )}
      <button
        onClick={() => setCurrentIndex(i => (i + 1) % images.length)}
      >
        Next Image
      </button>
    </div>
  )
}
```

## Best Practices

1. **Always Provide Alt Text**

   ```tsx
   const { Image } = useImage({
     src: 'image.jpg',
     alt: 'Descriptive text for accessibility'
   })
   ```

2. **Use Lazy Loading**

   ```tsx
   const { Image } = useImage({
     src: 'image.jpg',
     loading: 'lazy',
     fetchPriority: 'low'
   })
   ```

3. **Handle Error States**

   ```tsx
   const { error, Image } = useImage({
     src: 'image.jpg'
   })

   if (error) {
     return (
       <div>
         Failed to load:
         {error.message}
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
import UseImage from './use-image.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseImage, {}, null))
})
</script>
