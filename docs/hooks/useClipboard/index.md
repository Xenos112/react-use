---
title: useClipboard
description: A React hook for seamless clipboard operations with automatic state management
---

# useClipboard

A powerful React hook that provides a simple interface for clipboard operations with automatic state management and browser compatibility checks.

[[toc]]

## Features

- 📋 Easy text copying
- ✨ Automatic state management
- 🔍 Browser compatibility detection
- ⏱️ Configurable feedback duration
- 🎭 TypeScript-first design
- 🔄 Copy success indication

## Basic Usage

```tsx
import { useClipboard } from 'use-reacty'

function CopyButton() {
  const { copy, copied } = useClipboard()

  return (
    <button onClick={() => copy('Hello World!')}>
      {copied ? 'Copied!' : 'Copy Text'}
    </button>
  )
}
```

## Type Definitions

```typescript
interface UseClipboardOptions {
  // Duration (in ms) to show the copied state
  timeout?: number
  // Callback function when text is copied
  onCopy?: (text: string) => void
}

interface UseClipboardReturn {
  // Function to copy text to clipboard
  copy: (text: string) => void
  // Whether the browser supports clipboard API
  isSupported: boolean
  // The last copied text
  text: string
  // Whether text was just copied
  copied: boolean
}
```

## Advanced Usage

### With Custom Timeout

```tsx
function CustomTimeout() {
  const { copy, copied } = useClipboard({
    // Show "Copied!" for 2 seconds
    timeout: 2000
  })

  return (
    <div>
      <button onClick={() => copy('Custom timeout text')}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
```

### With Copy Callback

```tsx
function WithCallback() {
  const { copy } = useClipboard({
    onCopy: (text) => {
      console.log(`Copied: ${text}`)
      // Trigger notifications or other side effects
    }
  })

  return (
    <button onClick={() => copy('Text with callback')}>
      Copy with Callback
    </button>
  )
}
```

### With Input Field

```tsx
function CopyInput() {
  const [input, setInput] = useState('')
  const { copy, copied, text } = useClipboard()

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <button
        onClick={() => copy(input)}
        disabled={!input}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <p>
        Last copied text:
        {text}
      </p>
    </div>
  )
}
```

## Best Practices

1. **Browser Compatibility**

   ```tsx
   function SafeCopy() {
     const { copy, isSupported } = useClipboard()

     if (!isSupported) {
       return <p>Clipboard is not supported in your browser</p>
     }

     return <button onClick={() => copy('text')}>Copy</button>
   }
   ```

2. **User Feedback**

   ```tsx
   function CopyWithFeedback() {
     const { copy, copied } = useClipboard()

     return (
       <div>
         <button
           onClick={() => copy('text')}
           className={copied ? 'success' : ''}
         >
           {copied ? '✓ Copied!' : 'Copy'}
         </button>
       </div>
     )
   }
   ```

3. **Error Handling**

   ```tsx
   function SafeCopyWithFallback() {
     const { copy, isSupported } = useClipboard()

     const handleCopy = async (text: string) => {
       try {
         await copy(text)
       }
       catch (err) {
         console.error('Failed to copy:', err)
         // Fallback to manual copy instruction
         alert('Press Ctrl+C to copy')
       }
     }

     return <button onClick={() => handleCopy('text')}>Copy</button>
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
import UseClipboard from './use-clipboard.tsx'

const demo = ref()

onMounted(() => {
  const root = createRoot(demo.value)
  root.render(createElement(UseClipboard, {}, null))
})
</script>
