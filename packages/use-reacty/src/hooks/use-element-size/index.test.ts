import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useElementSize from '.'
import useElementBounding from '../use-element-bounding'

vi.mock('../use-element-bounding', () => ({
  default: vi.fn(),
}))

const mockUseElementBounding = vi.mocked(useElementBounding)

describe('useElementSize', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return width and height from useElementBounding', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 100,
      height: 200,
    })
  })

  it('should return zero dimensions when element has no size', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 0,
      height: 0,
    })
  })

  it('should handle fractional dimensions', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 150.5,
      height: 75.25,
      top: 0,
      left: 0,
      right: 150.5,
      bottom: 75.25,
      x: 0,
      y: 0,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 150.5,
      height: 75.25,
    })
  })

  it('should handle very large dimensions', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 9999,
      height: 8888,
      top: 0,
      left: 0,
      right: 9999,
      bottom: 8888,
      x: 0,
      y: 0,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 9999,
      height: 8888,
    })
  })

  it('should work with null ref', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 0,
      height: 0,
    })
  })

  it('should update when dimensions change', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
    })

    const { result, rerender } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 100,
      height: 200,
    })

    mockUseElementBounding.mockReturnValue({
      width: 300,
      height: 400,
      top: 0,
      left: 0,
      right: 300,
      bottom: 400,
      x: 0,
      y: 0,
    })

    rerender()

    expect(result.current).toEqual({
      width: 300,
      height: 400,
    })
  })

  it('should handle negative dimensions gracefully', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: -10,
      height: -20,
      top: 0,
      left: 0,
      right: -10,
      bottom: -20,
      x: 0,
      y: 0,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: -10,
      height: -20,
    })
  })

  it.todo('should return same object reference when dimensions do not change', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
    })

    const { result, rerender } = renderHook(() => TestComponent())
    const firstResult = result.current

    rerender()

    expect(result.current).toBe(firstResult)
  })

  it('should work with different element types', () => {
    const DivTestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    const SpanTestComponent = () => {
      const ref = useRef<HTMLSpanElement>(null)
      return useElementSize(ref)
    }

    const ImgTestComponent = () => {
      const ref = useRef<HTMLImageElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 50,
      height: 25,
      top: 0,
      left: 0,
      right: 50,
      bottom: 25,
      x: 0,
      y: 0,
    })

    const { result: divResult } = renderHook(() => DivTestComponent())
    const { result: spanResult } = renderHook(() => SpanTestComponent())
    const { result: imgResult } = renderHook(() => ImgTestComponent())

    expect(divResult.current).toEqual({ width: 50, height: 25 })
    expect(spanResult.current).toEqual({ width: 50, height: 25 })
    expect(imgResult.current).toEqual({ width: 50, height: 25 })
  })

  it('should handle rapid dimension changes', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
    })

    const { result, rerender } = renderHook(() => TestComponent())

    expect(result.current).toEqual({ width: 100, height: 200 })

    mockUseElementBounding.mockReturnValue({
      width: 150,
      height: 250,
      top: 0,
      left: 0,
      right: 150,
      bottom: 250,
      x: 0,
      y: 0,
    })
    rerender()
    expect(result.current).toEqual({ width: 150, height: 250 })

    mockUseElementBounding.mockReturnValue({
      width: 200,
      height: 300,
      top: 0,
      left: 0,
      right: 200,
      bottom: 300,
      x: 0,
      y: 0,
    })
    rerender()
    expect(result.current).toEqual({ width: 200, height: 300 })

    mockUseElementBounding.mockReturnValue({
      width: 75,
      height: 125,
      top: 0,
      left: 0,
      right: 75,
      bottom: 125,
      x: 0,
      y: 0,
    })
    rerender()
    expect(result.current).toEqual({ width: 75, height: 125 })
  })

  it('should only extract width and height properties', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 50,
      left: 25,
      right: 125,
      bottom: 250,
      x: 25,
      y: 50,
    })

    const { result } = renderHook(() => TestComponent())

    expect(result.current).toEqual({
      width: 100,
      height: 200,
    })
    expect(Object.keys(result.current)).toEqual(['width', 'height'])
    expect(result.current).not.toHaveProperty('top')
    expect(result.current).not.toHaveProperty('left')
    expect(result.current).not.toHaveProperty('right')
    expect(result.current).not.toHaveProperty('bottom')
    expect(result.current).not.toHaveProperty('x')
    expect(result.current).not.toHaveProperty('y')
  })

  it('should handle edge case where only width changes', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
    })

    const { result, rerender } = renderHook(() => TestComponent())

    expect(result.current).toEqual({ width: 100, height: 200 })

    mockUseElementBounding.mockReturnValue({
      width: 150,
      height: 200,
      top: 0,
      left: 0,
      right: 150,
      bottom: 200,
      x: 0,
      y: 0,
    })

    rerender()

    expect(result.current).toEqual({ width: 150, height: 200 })
  })

  it('should handle edge case where only height changes', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      return useElementSize(ref)
    }

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
    })

    const { result, rerender } = renderHook(() => TestComponent())

    expect(result.current).toEqual({ width: 100, height: 200 })

    mockUseElementBounding.mockReturnValue({
      width: 100,
      height: 250,
      top: 0,
      left: 0,
      right: 100,
      bottom: 250,
      x: 0,
      y: 0,
    })

    rerender()

    expect(result.current).toEqual({ width: 100, height: 250 })
  })
})
