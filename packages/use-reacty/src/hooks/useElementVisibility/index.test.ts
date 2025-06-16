import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useElementVisibility from '.'

// TODO: should  move this to a test-utils file
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback!: IntersectionObserverCallback
  observedElements: Set<Element> = new Set()

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe(el: Element) {
    this.observedElements.add(el)
    this.callback(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      this as any,
    )
  }

  unobserve(el: Element) {
    this.observedElements.delete(el)
    this.callback(
      [{ isIntersecting: false, target: el } as IntersectionObserverEntry],
      this as any,
    )
  }

  disconnect() {
    this.observedElements.clear()
  }

  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as any

const MockIO = IntersectionObserver as unknown as {
  instances: unknown[]
}

describe('useElementVisibility', () => {
  beforeEach(() => {
    MockIO.instances.length = 0
  })

  it('should return true in the initial render', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useElementVisibility(ref))
    expect(result.current).toBe(true)
  })

  it('should become unobserved (not visible)', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const ref = { current: el }

    const { result } = renderHook(() => useElementVisibility(ref))

    expect(result.current).toBe(true)

    const observerInstance = (IntersectionObserver as any)
      .instances[0] as MockIntersectionObserver

    act(() => {
      observerInstance.unobserve(el)
    })

    expect(result.current).toBe(false)
  })
})
