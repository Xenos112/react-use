import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import useEvent from '.'

describe('useEventListener', () => {
  it('should run the callback when the event is fired', async () => {
    const onClick = vi.fn()

    const button = document.createElement('button')
    document.body.appendChild(button)
    renderHook(() => useEvent('click', () => onClick(), button))
    button.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should run the callback twice when the event is fired', async () => {
    const onClick = vi.fn()

    renderHook(() => useEvent('click', () => onClick()))
    window.dispatchEvent(new Event('click'))
    window.dispatchEvent(new Event('click'))
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('should run the event on the window but not the document', async () => {
    const onClick = vi.fn()

    renderHook(() => useEvent('click', () => onClick())) // default target is window
    document.dispatchEvent(new Event('click'))
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it('should run the second handler when the event is fired', async () => {
    const onClick = vi.fn()
    const onClick2 = vi.fn()

    renderHook(() => useEvent('click', () => onClick()))
    renderHook(() => useEvent('click', () => onClick2()))
    window.dispatchEvent(new Event('click'))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick2).toHaveBeenCalledTimes(1)
  })

  it('should run event on the ref with a custom event', async () => {
    const onClick = vi.fn()
    const { result } = renderHook(() => useRef<HTMLButtonElement>(null))

    // attach the ref to the button
    const button = document.createElement('button')
    document.body.appendChild(button)
    result.current.current = button

    renderHook(() => useEvent('click', () => onClick(), result.current))
    result.current.current?.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
