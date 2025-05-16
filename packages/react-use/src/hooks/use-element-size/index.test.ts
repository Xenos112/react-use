import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import useElementSize from '.'
import resizeObserverMock from '../../__tests__/mocks/resize-observer'

afterEach(() => {
  cleanup()
})

resizeObserverMock()

describe('useElementSize', () => {
  it('should return the element size', async () => {
    const element = document.createElement('div')
    element.style.width = '300px'
    element.style.height = '300px'
    document.body.appendChild(element)

    const ref = { current: element }

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      width: 300,
      height: 300,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => '',
    })

    const { result } = renderHook(() => useElementSize(ref))

    element.getBoundingClientRect()

    expect(result.current).toEqual({ width: 300, height: 300 })
  })

  it('should update size when element resizes', async () => {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.ResizeObserver = ResizeObserver

    // Create real element
    const element = document.createElement('div')
    element.style.width = '300px'
    element.style.height = '300px'
    document.body.appendChild(element)

    // Create ref and test hook
    const ref = { current: element }
    const { result } = renderHook(() => useElementSize(ref))

    // Mock DOMRect
    const mockRect = {
      width: 300,
      height: 300,
      top: 0,
      left: 0,
      bottom: 300,
      right: 300,
      x: 0,
      y: 0,
      toJSON: () => '',
    }
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(mockRect)

    const observerCallback = (entries: ResizeObserverEntry[]) => {
      act(() => {
        result.current = {
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height,
        }
      })
    }

    observerCallback([
      {
        target: element,
        contentRect: { ...mockRect, width: 500, height: 500 },
        contentBoxSize: [{ inlineSize: 500, blockSize: 500 }],
        borderBoxSize: [{ inlineSize: 500, blockSize: 500 }],
        devicePixelContentBoxSize: [{ inlineSize: 500, blockSize: 500 }],
      } as unknown as ResizeObserverEntry,
    ])

    await waitFor(() => {
      expect(result.current).toEqual({ width: 500, height: 500 })
    })
  })
})
