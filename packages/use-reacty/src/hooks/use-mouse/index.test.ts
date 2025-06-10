import { fireEvent } from '@testing-library/dom'
import { renderHook } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import useMouse from '.'
import MockPointerEvent from '../../__tests__/mocks/pointer-events'

beforeAll(() => {
  window.PointerEvent = MockPointerEvent as any
})

describe('useMouse', () => {
  it('should return the initial values', () => {
    const { result } = renderHook(() => useMouse())
    expect(result.current).toEqual({ x: 0, y: 0 })
  })

  it('should return the new values of the pointer position', async () => {
    const { result } = renderHook(() => useMouse())

    fireEvent.touchMove(document, {
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

describe('useMouse#touch', () => {
  it('should return the new values of the touch position', async () => {
    const { result } = renderHook(() => useMouse())

    fireEvent.touchMove(document, {
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
