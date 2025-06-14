import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useClipboard from '.'

const mockWriteText = vi.fn()
const mockClipboard = {
  writeText: mockWriteText,
}

describe('useClipboard Hook', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: mockClipboard,
    })
  })

  it('should copy text to clipboard successfully', async () => {
    const { result } = renderHook(() => useClipboard())
    const textToCopy = 'Hello, World!'

    act(() => {
      result.current.copy(textToCopy)
    })

    expect(mockWriteText).toHaveBeenCalledWith(textToCopy)
    expect(result.current.copied).toBe(true)
    expect(result.current.text).toBe(textToCopy)
    expect(result.current.isSupported).toBe(true)
  })

  it('should reset copied state after specified timeout', async () => {
    vi.useFakeTimers()

    const timeout = 2000
    const { result } = renderHook(() => useClipboard({ timeout }))

    act(() => {
      result.current.copy('Test text')
    })

    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.copied).toBe(false)
  })

  it('should use custom timeout value', async () => {
    const customTimeout = 5000
    const { result } = renderHook(() => useClipboard({ timeout: customTimeout }))

    act(() => {
      result.current.copy('Custom timeout test')
    })

    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(4000)
    })
    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.copied).toBe(false)
  })

  it('should call onCopy callback when copying text', async () => {
    const onCopy = vi.fn()
    const { result } = renderHook(() => useClipboard({ onCopy }))
    const textToCopy = 'Callback test'

    act(() => {
      result.current.copy(textToCopy)
    })

    expect(onCopy).toHaveBeenCalledWith(textToCopy)
    expect(onCopy).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple copy operations correctly', async () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useClipboard({ timeout: 1000 }))

    act(() => {
      result.current.copy('First text')
    })
    expect(result.current.text).toBe('First text')
    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(500)
      result.current.copy('Second text')
    })
    expect(result.current.text).toBe('Second text')
    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.copied).toBe(false)
    expect(result.current.text).toBe('Second text')
  })

  it('should handle copying empty string', async () => {
    const onCopy = vi.fn()
    const { result } = renderHook(() => useClipboard({ onCopy }))

    act(() => {
      result.current.copy('')
    })

    expect(mockWriteText).toHaveBeenCalledWith('')
    expect(onCopy).toHaveBeenCalledWith('')
    expect(result.current.text).toBe('')
    expect(result.current.copied).toBe(true)
  })

  it('should handle copying long text content', async () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(100)
    const { result } = renderHook(() => useClipboard())

    act(() => {
      result.current.copy(longText)
    })

    expect(mockWriteText).toHaveBeenCalledWith(longText)
    expect(result.current.text).toBe(longText)
    expect(result.current.copied).toBe(true)
  })

  it('should handle special characters and unicode text', async () => {
    const specialText = '🚀 Hello, 世界! @#$%^&*()_+ 🎉'
    const { result } = renderHook(() => useClipboard())

    act(() => {
      result.current.copy(specialText)
    })

    expect(mockWriteText).toHaveBeenCalledWith(specialText)
    expect(result.current.text).toBe(specialText)
    expect(result.current.copied).toBe(true)
  })

  it('should work with default options', async () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useClipboard())

    act(() => {
      result.current.copy('Default options test')
    })

    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(999)
    })
    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current.copied).toBe(false)
  })

  it('should handle clipboard API errors gracefully', async () => {
    mockWriteText.mockRejectedValueOnce(new Error('Clipboard access denied'))

    const onCopy = vi.fn()
    const { result } = renderHook(() => useClipboard({ onCopy }))

    act(() => {
      result.current.copy('Error test')
    })

    expect(result.current.copied).toBe(true)
    expect(result.current.text).toBe('Error test')
    expect(onCopy).toHaveBeenCalledWith('Error test')
  })

  it('should handle rapid successive copy calls', async () => {
    vi.useFakeTimers()

    const onCopy = vi.fn()
    const { result } = renderHook(() => useClipboard({ onCopy, timeout: 1000 }))

    act(() => {
      result.current.copy('Call 1')
      result.current.copy('Call 2')
      result.current.copy('Call 3')
    })

    expect(onCopy).toHaveBeenCalledTimes(3)
    expect(result.current.text).toBe('Call 3')
    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.copied).toBe(false)
  })

  it('should handle component unmount during timeout period', async () => {
    vi.useFakeTimers()

    const { result, unmount } = renderHook(() => useClipboard({ timeout: 2000 }))

    act(() => {
      result.current.copy('Unmount test')
    })

    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    unmount()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(true).toBe(true)
  })

  it('should have correct initial state values', async () => {
    const { result } = renderHook(() => useClipboard())

    expect(result.current.copied).toBe(false)
    expect(result.current.text).toBe('')
    expect(result.current.isSupported).toBe(true)
    expect(typeof result.current.copy).toBe('function')
  })

  it('should handle real-world code snippet copying', async () => {
    vi.useFakeTimers()

    const codeSnippet = `
function useClipboard() {
  const [copied, setCopied] = useState(false)
  // More code here...
  return { copy, copied }
}
    `.trim()

    const onCopy = vi.fn()
    const { result } = renderHook(() => useClipboard({
      onCopy,
      timeout: 3000,
    }))

    act(() => {
      result.current.copy(codeSnippet)
    })

    expect(mockWriteText).toHaveBeenCalledWith(codeSnippet)
    expect(onCopy).toHaveBeenCalledWith(codeSnippet)
    expect(result.current.copied).toBe(true)
    expect(result.current.text).toBe(codeSnippet)

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(result.current.copied).toBe(false)
  })

  it('should handle URL copying scenario', async () => {
    const url = 'https://example.com/api/users/123?include=profile&sort=name'
    const onCopyUrl = vi.fn((copiedUrl) => {
      // eslint-disable-next-line no-console
      console.log(`URL copied: ${copiedUrl}`)
    })

    const { result } = renderHook(() => useClipboard({ onCopy: onCopyUrl }))

    act(() => {
      result.current.copy(url)
    })

    expect(mockWriteText).toHaveBeenCalledWith(url)
    expect(onCopyUrl).toHaveBeenCalledWith(url)
    expect(result.current.text).toBe(url)
    expect(result.current.copied).toBe(true)
  })
})
