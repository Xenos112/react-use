import { fireEvent } from '@testing-library/dom'
import { act, renderHook } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import useMouse from '.'

class MockPointerEvent extends Event {
  clientX: number
  clientY: number
  pointerType: string

  constructor(type: string, props: PointerEventInit) {
    super(type, props)
    this.clientX = props.clientX || 0
    this.clientY = props.clientY || 0
    this.pointerType = props.pointerType || 'mouse'
  }
}

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

    act(() => {
      fireEvent(
        document,
        new MouseEvent('pointermove', {
          clientX: 100,
          clientY: 100,
          bubbles: true,
          cancelable: true,
        }),
      )
    })

    expect(result.current).toEqual({ x: 100, y: 100 })
  })
})
