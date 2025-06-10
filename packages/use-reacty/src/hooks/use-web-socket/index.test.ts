import type { UseWebSocketOptions } from './types'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useWebSocket from '.'

let wsInstance: any

const listeners: Record<string, UseWebSocketOptions['onOpen'][]> = {
  open: [],
  message: [],
  error: [],
  close: [],
}

class MockWebSocket {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3

  url: string
  protocols?: string | string[]
  readyState: number = MockWebSocket.CONNECTING
  onopen: UseWebSocketOptions['onOpen'] | null = null
  onmessage: UseWebSocketOptions['onMessage'] | null = null
  onerror: UseWebSocketOptions['onError'] | null = null
  onclose: UseWebSocketOptions['onClose'] | null = null

  constructor(url: string, protocols?: string | string[]) {
    this.url = url
    this.protocols = protocols
    wsInstance = this as this
  }

  send = vi.fn()
  close = vi.fn().mockImplementation(() => {
    this.readyState = MockWebSocket.CLOSED
    this.trigger('close')
  })

  addEventListener(event: string, fn: UseWebSocketOptions['onOpen']) {
    listeners[event].push(fn)
  }

  removeEventListener(event: string, fn: UseWebSocketOptions['onOpen']) {
    listeners[event] = listeners[event].filter(f => f !== fn)
  }

  trigger(event: string, data?: any) {
    if (event === 'open')
      this.readyState = MockWebSocket.OPEN
    if (event === 'close')
      this.readyState = MockWebSocket.CLOSED

    const handler = this[`on${event}` as keyof this]
    if (typeof handler === 'function')
      handler(data)

    listeners[event].forEach(fn => fn?.(this as unknown as WebSocket, data))
  }
}

beforeEach(() => {
  const global = globalThis
  // @ts-expect-error it just throws cuz of the mock
  global.WebSocket = MockWebSocket
  wsInstance = null
  Object.keys(listeners).forEach((key) => {
    listeners[key] = []
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useWebSocket', () => {
  it('creates WebSocket with correct URL and protocols', () => {
    const url = 'ws://test.com'
    const protocols = ['protocol1', 'protocol2']

    renderHook(() => useWebSocket(url, { protocols }))

    expect(wsInstance).toBeInstanceOf(MockWebSocket)
    expect(wsInstance.url).toBe(url)
    expect(wsInstance.protocols).toEqual(protocols)
  })

  it('sets correct event handlers', () => {
    const handlers = {
      onOpen: vi.fn(),
      onMessage: vi.fn(),
      onError: vi.fn(),
      onClose: vi.fn(),
    }

    renderHook(() =>
      useWebSocket('ws://test.com', handlers as UseWebSocketOptions),
    )

    act(() => wsInstance.trigger('open'))
    expect(handlers.onOpen).toHaveBeenCalled()

    act(() => wsInstance.trigger('message', 'data'))
    expect(handlers.onMessage).toHaveBeenCalledWith('data')

    act(() => wsInstance.trigger('error'))
    expect(handlers.onError).toHaveBeenCalled()

    act(() => wsInstance.trigger('close'))
    expect(handlers.onClose).toHaveBeenCalled()
  })

  it('closes WebSocket on unmount', () => {
    const { unmount } = renderHook(() => useWebSocket('ws://test.com'))
    unmount()
    expect(wsInstance.close).toHaveBeenCalled()
    expect(wsInstance.readyState).toBe(MockWebSocket.CLOSED)
  })

  it('returns correct status during lifecycle', () => {
    const { result } = renderHook(() => useWebSocket('ws://test.com'))

    expect(result.current.status).toBe('connecting')

    act(() => {
      wsInstance.readyState = MockWebSocket.OPEN
      wsInstance.trigger('open')
    })
    expect(result.current.status).toBe('open')

    act(() => {
      wsInstance.readyState = MockWebSocket.CLOSING
      wsInstance.trigger('close')
    })
    expect(result.current.status).toBe('closed')
  })

  it('provides working send and close methods', () => {
    const { result } = renderHook(() => useWebSocket('ws://test.com'))

    result.current.send('test-data')
    expect(wsInstance.send).toHaveBeenCalledWith('test-data')

    result.current.close()
    expect(wsInstance.close).toHaveBeenCalled()
  })
})
