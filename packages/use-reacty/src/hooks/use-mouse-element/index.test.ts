import { fireEvent } from '@testing-library/dom'
import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import useMouseElement from '.'
import MockPointerEvent from '../../__tests__/mocks/pointer-events'

beforeAll(() => {
  window.PointerEvent = MockPointerEvent as any
})

describe('useMouse', () => {
  it('should return the initial values', () => {
    const { result: refResult } = renderHook(() => useRef<HTMLDivElement>(document.createElement('div')))
    const { result } = renderHook(() => useMouseElement(refResult.current))
    expect(result.current).toEqual({ x: 0, y: 0 })
  })

  it('should return the new values of the pointer position', async () => {
    const { result: refResult } = renderHook(() => useRef<HTMLDivElement>(document.createElement('div')))
    refResult.current.current.style.width = '400px'
    refResult.current.current.style.height = '400px'

    const { result } = renderHook(() => useMouseElement(refResult.current))

    fireEvent.pointerMove(refResult.current.current, {
      clientX: 100,
      clientY: 100,
    })

    expect(result.current).toEqual({ x: 100, y: 100 })
  })
})

describe('useMouse#touch', () => {
  it('should return the new values of the touch position', async () => {
    const { result: refResult } = renderHook(() => useRef<HTMLDivElement>(document.createElement('div')))
    refResult.current.current.style.width = '400px'
    refResult.current.current.style.height = '400px'

    const { result } = renderHook(() => useMouseElement(refResult.current))

    fireEvent.touchMove(refResult.current.current, {
      touches: [
        {
          clientX: 100,
          clientY: 100,
        },
      ],
    })

    expect(result.current).toEqual({ x: 100, y: 100 })
  })
})
