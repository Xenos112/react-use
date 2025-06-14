import { act, renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useElementBounding from '.'

const global = globalThis

class MockResizeObserver {
  callback: ResizeObserverCallback
  elements: Set<Element> = new Set()

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe(element: Element) {
    this.elements.add(element)
  }

  unobserve(element: Element) {
    this.elements.delete(element)
  }

  disconnect() {
    this.elements.clear()
  }

  triggerResize(entries: ResizeObserverEntry[]) {
    this.callback(entries, this)
  }
}

function createMockDOMRect(props: Partial<DOMRect>): DOMRect {
  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...props,
  }
}

describe('useElementBounding Hook', () => {
  let mockResizeObserver: MockResizeObserver
  let mockElement: HTMLElement
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()

    mockResizeObserver = new MockResizeObserver(() => { })
    global.ResizeObserver = vi.fn(() => mockResizeObserver)

    mockElement = document.createElement('div')
    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 100,
        height: 50,
        top: 10,
        left: 20,
        bottom: 60,
        right: 120,
        x: 20,
        y: 10,
      }),
    )

    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return initial bounding values when ref is null', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementBounding(ref)
    })

    expect(result.current).toEqual({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
    })
  })

  it('should calculate bounding rect correctly when element is attached', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current).toEqual({
      width: 100,
      height: 50,
      top: 10,
      left: 20,
      bottom: 60,
      right: 120,
      x: 20,
      y: 10,
    })
  })

  it('should setup and cleanup ResizeObserver correctly', () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(global.ResizeObserver).toHaveBeenCalledWith(expect.any(Function))
    expect(mockResizeObserver.elements.has(mockElement)).toBe(true)

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    const disconnectSpy = vi.spyOn(mockResizeObserver, 'disconnect')
    unmount()

    expect(disconnectSpy).toHaveBeenCalled()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should update bounding on scroll events', () => {
    let scrollHandler: () => void

    addEventListenerSpy.mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler as () => void
      }
    })

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current.top).toBe(10)

    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 100,
        height: 50,
        top: 100,
        left: 20,
        bottom: 150,
        right: 120,
        x: 20,
        y: 100,
      }),
    )

    act(() => {
      scrollHandler()
    })

    expect(result.current.top).toBe(100)
  })

  it.todo('should update bounding when ResizeObserver triggers', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current.width).toBe(100)
    expect(result.current.height).toBe(50)

    mockElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 200,
        height: 100,
        top: 10,
        left: 20,
        bottom: 110,
        right: 220,
        x: 20,
        y: 10,
      }),
    )

    act(() => {
      mockResizeObserver.triggerResize([])
    })

    expect(result.current.width).toBe(200)
    expect(result.current.height).toBe(100)
  })

  it.todo('should handle ref changes correctly', () => {
    let currentRef: HTMLDivElement | null = null

    const { result, rerender } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = currentRef
      return useElementBounding(ref)
    })

    expect(result.current.width).toBe(0)

    currentRef = mockElement as HTMLDivElement
    rerender()

    expect(result.current.width).toBe(100)

    currentRef = null
    rerender()

    expect(result.current.width).toBe(100)
  })

  it('should handle different element dimensions correctly', () => {
    const mockElement2 = document.createElement('div')
    mockElement2.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 300,
        height: 200,
        top: 50,
        left: 100,
        bottom: 250,
        right: 400,
        x: 100,
        y: 50,
      }),
    )

    const { result: result1 } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    const { result: result2 } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement2 as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result1.current.width).toBe(100)
    expect(result1.current.height).toBe(50)

    expect(result2.current.width).toBe(300)
    expect(result2.current.height).toBe(200)
  })

  it('should handle zero-sized elements', () => {
    const zeroElement = document.createElement('div')
    zeroElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = zeroElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current).toEqual({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
    })
  })

  it('should handle negative positioning correctly', () => {
    const negativeElement = document.createElement('div')
    negativeElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 100,
        height: 50,
        top: -20,
        left: -10,
        bottom: 30,
        right: 90,
        x: -10,
        y: -20,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = negativeElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current.top).toBe(-20)
    expect(result.current.left).toBe(-10)
    expect(result.current.x).toBe(-10)
    expect(result.current.y).toBe(-20)
  })

  it('should handle large element dimensions', () => {
    const largeElement = document.createElement('div')
    largeElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 1920,
        height: 1080,
        top: 0,
        left: 0,
        bottom: 1080,
        right: 1920,
        x: 0,
        y: 0,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = largeElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current.width).toBe(1920)
    expect(result.current.height).toBe(1080)
  })

  it('should handle fractional dimensions correctly', () => {
    const fractionalElement = document.createElement('div')
    fractionalElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 150.5,
        height: 75.25,
        top: 10.75,
        left: 20.5,
        bottom: 86,
        right: 171,
        x: 20.5,
        y: 10.75,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = fractionalElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current.width).toBe(150.5)
    expect(result.current.height).toBe(75.25)
    expect(result.current.top).toBe(10.75)
    expect(result.current.left).toBe(20.5)
  })

  it.todo('should handle rapid resize events efficiently', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    let width = 100

    for (let i = 0; i < 10; i++) {
      width += 10
      mockElement.getBoundingClientRect = vi.fn(() =>
        createMockDOMRect({
          width,
          height: 50,
          top: 10,
          left: 20,
          bottom: 60,
          right: 20 + width,
          x: 20,
          y: 10,
        }),
      )

      act(() => {
        mockResizeObserver.triggerResize([])
      })
    }

    expect(result.current.width).toBe(200)
  })

  it('should prevent memory leaks on unmount', () => {
    const disconnectSpy = vi.spyOn(MockResizeObserver.prototype, 'disconnect')

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = mockElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    unmount()

    expect(disconnectSpy).toHaveBeenCalled()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it.todo('should handle modal positioning scenario', () => {
    const modalElement = document.createElement('div')
    modalElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 400,
        height: 300,
        top: 100,
        left: 200,
        bottom: 400,
        right: 600,
        x: 200,
        y: 100,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = modalElement as HTMLDivElement
      return useElementBounding(ref)
    })

    expect(result.current.width).toBe(400)
    expect(result.current.height).toBe(300)
    expect(result.current.top).toBe(100)
    expect(result.current.left).toBe(200)

    modalElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 400,
        height: 300,
        top: 150,
        left: 300,
        bottom: 450,
        right: 700,
        x: 300,
        y: 150,
      }),
    )

    act(() => {
      mockResizeObserver.triggerResize([])
    })

    expect(result.current.top).toBe(150)
    expect(result.current.left).toBe(300)
  })

  it('should handle tooltip positioning relative to trigger element', () => {
    const triggerElement = document.createElement('button')
    triggerElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 80,
        height: 32,
        top: 200,
        left: 150,
        bottom: 232,
        right: 230,
        x: 150,
        y: 200,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLButtonElement>(null)
      ref.current = triggerElement as HTMLButtonElement
      return useElementBounding(ref)
    })

    const tooltipTop = result.current.top - 40
    const tooltipLeft = result.current.left + (result.current.width / 2) - 50

    expect(tooltipTop).toBe(160)
    expect(tooltipLeft).toBe(140)
    expect(result.current.width).toBe(80)
    expect(result.current.height).toBe(32)
  })

  it('should handle sticky header scroll behavior', () => {
    let scrollHandler: () => void
    addEventListenerSpy.mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler as () => void
      }
    })

    const headerElement = document.createElement('header')
    headerElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 1200,
        height: 64,
        top: 0,
        left: 0,
        bottom: 64,
        right: 1200,
        x: 0,
        y: 0,
      }),
    )

    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null)
      ref.current = headerElement
      return useElementBounding(ref)
    })

    expect(result.current.top).toBe(0)

    headerElement.getBoundingClientRect = vi.fn(() =>
      createMockDOMRect({
        width: 1200,
        height: 64,
        top: 0,
        left: 0,
        bottom: 64,
        right: 1200,
        x: 0,
        y: 0,
      }),
    )

    act(() => {
      scrollHandler()
    })

    expect(result.current.top).toBe(0)
    expect(result.current.width).toBe(1200)
    expect(result.current.height).toBe(64)
  })
})
