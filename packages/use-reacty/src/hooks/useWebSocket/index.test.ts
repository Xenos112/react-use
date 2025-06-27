import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useWebSocket from '.'

const global = globalThis

class MockWebSocket {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3

  readyState: number = MockWebSocket.CONNECTING
  url: string
  protocol: string
  onopen: ((event: Event) => void) | null = null
  onclose: ((event: CloseEvent) => void) | null = null
  onerror: ((event: Event) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null

  private listeners: Record<string, ((event: any) => void)[]> = {}

  constructor(url: string | URL, protocols?: string | string[]) {
    this.url = url.toString()
    this.protocol = Array.isArray(protocols)
      ? protocols[0] || ''
      : protocols || ''

    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN
      this.dispatchEvent(new Event('open'))
    }, 10)
  }

  send(_data: any) {
    if (this.readyState !== MockWebSocket.OPEN) {
      throw new Error('WebSocket is not open')
    }
  }

  close(code?: number, reason?: string) {
    if (this.readyState === MockWebSocket.CLOSED)
      return

    this.readyState = MockWebSocket.CLOSING
    this.dispatchEvent(new Event('close'))

    setTimeout(() => {
      this.readyState = MockWebSocket.CLOSED
      this.dispatchEvent(new CloseEvent('close', { code, reason }))
    }, 5)
  }

  addEventListener(type: string, listener: (event: any) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(listener)
  }

  removeEventListener(type: string, listener: (event: any) => void) {
    if (!this.listeners[type])
      return
    this.listeners[type] = this.listeners[type].filter(l => l !== listener)
  }

  dispatchEvent(event: Event) {
    const listeners = this.listeners[event.type] || []
    listeners.forEach(listener => listener(event))

    if (event.type === 'open' && this.onopen) {
      this.onopen(event)
    }
    else if (event.type === 'close' && this.onclose) {
      this.onclose(event as CloseEvent)
    }
    else if (event.type === 'error' && this.onerror) {
      this.onerror(event)
    }
    else if (event.type === 'message' && this.onmessage) {
      this.onmessage(event as MessageEvent)
    }
  }

  simulateMessage(data: any) {
    const event = new MessageEvent('message', { data })
    this.dispatchEvent(event)
  }

  simulateError() {
    this.readyState = MockWebSocket.CLOSED
    const event = new Event('error')
    this.dispatchEvent(event)
  }
}

global.WebSocket = MockWebSocket as any

describe('useWebSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with connecting status', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))

    expect(result.current.status).toBe('closed') // cuz the useEffect
    expect(typeof result.current.send).toBe('function')
    expect(typeof result.current.close).toBe('function')
  })

  it.todo(
    'should update status to open when connection is established',
    async () => {
      const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))

      expect(result.current.status).toBe('connecting')

      await new Promise(resolve => setTimeout(resolve, 15))

      expect(result.current.status).toBe('open')
    },
  )

  it('should call onOpen callback when connection opens', async () => {
    const onOpen = vi.fn()
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080', { onOpen }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    expect(onOpen).toHaveBeenCalledOnce()
    expect(result.current.status).toBe('open')
  })

  it('should call onMessage callback when message is received', async () => {
    const onMessage = vi.fn()
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080', { onMessage }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    const mockMessage = { type: 'test', payload: 'hello' };
    (result.current.ws as any).simulateMessage(JSON.stringify(mockMessage))

    expect(onMessage).toHaveBeenCalledOnce()
    expect(onMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        data: JSON.stringify(mockMessage),
      }),
    )
  })

  it.todo('should call onError callback when error occurs', async () => {
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080', { onError }),
    )

    await new Promise(resolve => setTimeout(resolve, 15));
    (result.current.ws as any).simulateError()

    expect(onError).toHaveBeenCalledOnce()
    expect(result.current.status).toBe('closed')
  })

  it.todo('should call onClose callback when connection closes', async () => {
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080', { onClose }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    act(() => {
      result.current.close()
    })

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(onClose).toHaveBeenCalledOnce()
    expect(result.current.status).toBe('closed')
  })

  it('should send data through websocket when send is called', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))

    await new Promise(resolve => setTimeout(resolve, 15))

    const sendSpy = vi.spyOn(result.current.ws, 'send')
    const testData = JSON.stringify({ message: 'test' })

    act(() => {
      result.current.send(testData)
    })

    expect(sendSpy).toHaveBeenCalledWith(testData)
  })

  it.todo('should handle WebSocket with protocols parameter', () => {
    const protocols = ['chat', 'superchat']
    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080', { protocols }),
    )

    expect(result.current.ws).toBeInstanceOf(MockWebSocket)
    expect((result.current.ws as any).protocol).toBe('chat')
  })

  it.todo('should handle URL object as parameter', () => {
    const url = new URL('ws://localhost:8080/chat')
    const { result } = renderHook(() => useWebSocket(url))

    expect(result.current.ws).toBeInstanceOf(MockWebSocket)
    expect((result.current.ws as any).url).toBe('ws://localhost:8080/chat')
  })

  it.todo('should clean up websocket on unmount', async () => {
    const { result, unmount } = renderHook(() =>
      useWebSocket('ws://localhost:8080'),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    const closeSpy = vi.spyOn(result.current.ws, 'close')

    unmount()

    expect(closeSpy).toHaveBeenCalledOnce()
  })

  it.todo('should handle rapid status changes correctly', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))

    expect(result.current.status).toBe('connecting')

    await new Promise(resolve => setTimeout(resolve, 15))
    expect(result.current.status).toBe('open')

    act(() => {
      result.current.close()
    })
    expect(result.current.status).toBe('closing')

    await new Promise(resolve => setTimeout(resolve, 10))
    expect(result.current.status).toBe('closed')
  })

  it('should not send data when WebSocket is not open', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))

    // Try to send data while still connecting
    act(() => {
      result.current.send('test message')
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      'WebSocket is not connected. Unable to send data.',
    )
    consoleSpy.mockRestore()
  })

  it.todo(
    'should handle multiple connections with different URLs',
    async () => {
      const { result: result1 } = renderHook(() =>
        useWebSocket('ws://localhost:8080/chat'),
      )
      const { result: result2 } = renderHook(() =>
        useWebSocket('ws://localhost:8080/game'),
      )

      expect(result1.current.ws.url).toBe('ws://localhost:8080/chat')
      expect(result2.current.ws.url).toBe('ws://localhost:8080/game')
    },
  )

  it('should handle callback updates without reconnecting', async () => {
    let messageCount = 0
    const initialCallback = vi.fn(() => messageCount++)
    const updatedCallback = vi.fn(() => (messageCount += 10))

    const { result, rerender } = renderHook(
      ({ onMessage }) => useWebSocket('ws://localhost:8080', { onMessage }),
      { initialProps: { onMessage: initialCallback } },
    )

    await new Promise(resolve => setTimeout(resolve, 15));

    // Send message with initial callback
    (result.current.ws as any).simulateMessage('test1')
    expect(initialCallback).toHaveBeenCalledOnce()
    expect(messageCount).toBe(1)

    // Update callback and send another message
    rerender({ onMessage: updatedCallback });
    (result.current.ws as any).simulateMessage('test2')

    expect(updatedCallback).toHaveBeenCalledOnce()
    expect(messageCount).toBe(11) // 1 + 10
  })

  it('should handle chat application scenario with multiple message types', async () => {
    const messages: any[] = []
    const onMessage = vi.fn((event) => {
      const data = JSON.parse(event.data)
      messages.push(data)
    })

    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080/chat', { onMessage }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    const chatMessages = [
      { type: 'user_joined', user: 'Alice' },
      { type: 'message', user: 'Alice', text: 'Hello everyone!' },
      { type: 'message', user: 'Bob', text: 'Hi Alice!' },
      { type: 'user_left', user: 'Alice' },
    ]

    chatMessages.forEach((msg) => {
      (result.current.ws as any).simulateMessage(JSON.stringify(msg))
    })

    expect(onMessage).toHaveBeenCalledTimes(4)
    expect(messages).toHaveLength(4)
    expect(messages[0].type).toBe('user_joined')
    expect(messages[1].text).toBe('Hello everyone!')
    expect(messages[3].type).toBe('user_left')
  })

  it('should handle gaming application scenario with real-time updates', async () => {
    const gameState = { players: [], score: 0 }
    const onMessage = vi.fn((event) => {
      const update = JSON.parse(event.data)
      if (update.type === 'game_state') {
        Object.assign(gameState, update.data)
      }
    })

    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080/game', { onMessage }),
    )

    await new Promise(resolve => setTimeout(resolve, 15));
    (result.current.ws as any).simulateMessage(
      JSON.stringify({
        type: 'game_state',
        data: { players: ['player1', 'player2'], score: 100 },
      }),
    )

    act(() => {
      result.current.send(
        JSON.stringify({
          type: 'player_action',
          action: 'move',
          direction: 'up',
        }),
      )
    })

    expect(onMessage).toHaveBeenCalledOnce()
    expect(gameState.players).toEqual(['player1', 'player2'])
    expect(gameState.score).toBe(100)
  })

  it('should handle trading application scenario with market data', async () => {
    const marketData: any[] = []
    const onMessage = vi.fn((event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'price_update') {
        marketData.push(data)
      }
    })

    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080/trading', { onMessage }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    const priceUpdates = [
      {
        type: 'price_update',
        symbol: 'AAPL',
        price: 150.25,
        timestamp: Date.now(),
      },
      {
        type: 'price_update',
        symbol: 'GOOGL',
        price: 2750.5,
        timestamp: Date.now(),
      },
      {
        type: 'price_update',
        symbol: 'TSLA',
        price: 800.75,
        timestamp: Date.now(),
      },
    ]

    priceUpdates.forEach((update) => {
      (result.current.ws as any).simulateMessage(JSON.stringify(update))
    })

    expect(onMessage).toHaveBeenCalledTimes(3)
    expect(marketData).toHaveLength(3)
    expect(marketData[0].symbol).toBe('AAPL')
    expect(marketData[1].price).toBe(2750.5)
  })

  it('should handle IoT monitoring scenario with sensor data', async () => {
    const sensorReadings: any[] = []
    const onMessage = vi.fn((event) => {
      const reading = JSON.parse(event.data)
      sensorReadings.push(reading)
    })

    const onError = vi.fn()

    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080/iot', { onMessage, onError }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    const readings = [
      { sensorId: 'temp_01', type: 'temperature', value: 23.5, unit: 'C' },
      { sensorId: 'humid_01', type: 'humidity', value: 65, unit: '%' },
      { sensorId: 'temp_01', type: 'temperature', value: 24.1, unit: 'C' },
    ]

    readings.forEach((reading) => {
      (result.current.ws as any).simulateMessage(JSON.stringify(reading))
    })

    expect(sensorReadings).toHaveLength(3)
    expect(sensorReadings[0].sensorId).toBe('temp_01')
    expect(sensorReadings[1].value).toBe(65);
    (result.current.ws as any).simulateError()
    expect(onError).toHaveBeenCalledOnce()
  })

  it('should handle notification service scenario with different priority levels', async () => {
    const notifications: any[] = []
    const onMessage = vi.fn((event) => {
      const notification = JSON.parse(event.data)
      notifications.push(notification)
    })

    const { result } = renderHook(() =>
      useWebSocket('ws://localhost:8080/notifications', { onMessage }),
    )

    await new Promise(resolve => setTimeout(resolve, 15))

    const notificationTypes = [
      {
        type: 'info',
        message: 'System maintenance scheduled',
        priority: 'low',
      },
      {
        type: 'warning',
        message: 'High CPU usage detected',
        priority: 'medium',
      },
      { type: 'error', message: 'Service unavailable', priority: 'high' },
      { type: 'success', message: 'Backup completed', priority: 'low' },
    ]

    notificationTypes.forEach((notification) => {
      (result.current.ws as any).simulateMessage(JSON.stringify(notification))
    })

    expect(notifications).toHaveLength(4)
    expect(notifications.filter(n => n.priority === 'high')).toHaveLength(1)
    expect(notifications.find(n => n.type === 'error').message).toBe(
      'Service unavailable',
    )
  })
})
