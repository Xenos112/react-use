---
title: useObjectUrl
description: A React hook for creating and managing object URLs from files, blobs, or media sources
---

# useObjectUrl

A React hook that creates and manages object URLs from Files, Blobs, or MediaSource objects with automatic cleanup.

[[toc]]

## Features

- 🔗 Automatic URL creation
- 📁 File support
- 💾 Blob support
- 🎥 MediaSource support
- 🎭 TypeScript support

## Basic Usage

```tsx
import { useState } from 'react'
import { useObjectUrl } from 'use-reacty'

function FilePreview() {
  const [file, setFile] = useState<File>()
  const url = useObjectUrl(file)

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0])}
      />
      {url && (
        <div>
          <img src={url} alt="Preview" style={{ maxWidth: '300px' }} />
          <br />
          <a href={url} target="_blank" rel="noopener">
            Open in new tab
          </a>
        </div>
      )}
    </div>
  )
}
```

## Type Definitions

```typescript
function useObjectUrl(
  // File, Blob, or MediaSource to create URL from
  target?: File | Blob | MediaSource
): string | undefined
```

## Advanced Usage

### With Blob Data

```tsx
function BlobExample() {
  // Use useMemo to prevent recreation on every render
  const blob = useMemo(() =>
    new Blob(['Hello, World!'], { type: 'text/plain' }), [])

  const url = useObjectUrl(blob)

  return (
    <div>
      {url && (
        <a
          href={url}
          download="hello.txt"
          className="download-link"
        >
          Download Text File
        </a>
      )}
    </div>
  )
}
```

### With MediaSource

```tsx
function VideoStream() {
  const [mediaSource] = useState(() => new MediaSource())
  const url = useObjectUrl(mediaSource)

  useEffect(() => {
    if (mediaSource.readyState === 'open') {
      const sourceBuffer = mediaSource.addSourceBuffer('video/mp4')
      // Add video data to the source buffer
    }
  }, [mediaSource])

  return (
    <div>
      {url && (
        <video controls>
          <source src={url} type="video/mp4" />
          Your browser does not support video playback
        </video>
      )}
    </div>
  )
}
```

## Best Practices

1. **Memory Management**

   ```tsx
   function OptimizedUsage() {
     // Create blob once and memoize
     const blob = useMemo(() =>
       new Blob(['content'], { type: 'text/plain' }), [])

     const url = useObjectUrl(blob)

     return (
       <div>
         URL:
         {url}
       </div>
     )
   }
   ```

2. **Conditional Usage**

   ```tsx
   function ConditionalPreview() {
     const [file, setFile] = useState<File>()
     // URL only created when file exists
     const url = useObjectUrl(file)

     return (
       <div>
         <input
           type="file"
           onChange={e => setFile(e.target.files?.[0])}
         />
         {url
           ? (
               <img src={url} alt="Preview" />
             )
           : (
               <p>Select a file to preview</p>
             )}
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
import UseObjectUrl from './use-object-url.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseObjectUrl, {}, null))
})
</script>
