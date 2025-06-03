import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useTitle from '.'

describe('useTitle', () => {
  it('should get the initial value of document if not provided', () => {
    document.title = 'hello world'
    const { result } = renderHook(() => useTitle())

    expect(result.current[0]).toBe('hello world')
  })

  it('should set the initial value as provided', () => {
    document.title = 'hello world'
    const { result } = renderHook(() => useTitle('prop title'))

    expect(result.current[0]).toBe('prop title')
  })

  it('should update the title as expected', () => {
    const { result } = renderHook(() => useTitle())

    act(() => {
      result.current[1]('new title')
    })

    expect(result.current[0]).toBe('new title')
  })
})
