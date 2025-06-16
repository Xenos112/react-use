import type { UseWebWorkerOptions } from './types'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useWebWorker from '.'

class MockWorker {
  url: string | URL
  options: WorkerOptions
  onmessage: ((this: Worker, ev: MessageEvent) => any) | null = null
  onmessageerror: ((this: Worker, ev: MessageEvent) => any) | null = null
  onerror: ((this: Worker, ev: ErrorEvent) => any) | null = null

  private eventListeners: Map<string, ((e: Event) => void)[]> = new Map()

  constructor(scriptURL: string | URL, options?: WorkerOptions) {
    this.url = scriptURL
    this.options = options || {}
  }

  postMessage = vi.fn()
  terminate = vi.fn()

  addEventListener(type: string, listener: ((e: Event) => void)) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, [])
    }
    this.eventListeners.get(type)!.push(listener)
  }

  removeEventListener(type: string, listener: ((e: Event) => void)) {
    const listeners = this.eventListeners.get(type)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  dispatchEvent(event: Event) {
    const listeners = this.eventListeners.get(event.type)
    if (listeners) {
      listeners.forEach(listener => listener(event))
    }
    return true
  }

  simulateMessage(data: any) {
    const event = new MessageEvent('message', { data })
    this.dispatchEvent(event)
  }

  simulateError(message: string = 'Worker error') {
    const event = new ErrorEvent('error', { message })
    this.dispatchEvent(event)
  }

  simulateMessageError(data: any) {
    const event = new MessageEvent('messageerror', { data })
    this.dispatchEvent(event)
  }
}

const mockWorkerInstances: MockWorker[] = []
const global = globalThis as any

global.Worker = vi.fn().mockImplementation((url: string | URL, options?: WorkerOptions) => {
  const worker = new MockWorker(url, options)
  mockWorkerInstances.push(worker)
  return worker
}) as any

describe('useWebWorker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockWorkerInstances.length = 0
  })

  afterEach(() => {
    mockWorkerInstances.forEach((worker) => {
      worker.terminate()
    })
  })

  describe('initialization', () => {
    it('should create a worker with string path', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js'),
      )

      expect(global.Worker).toHaveBeenCalledWith('/worker.js', {
        credentials: undefined,
        name: undefined,
        type: undefined,
      })

      expect(result.current.worker).toBeInstanceOf(MockWorker)
      expect(result.current.status).toBe('IDLE')
    })

    it.todo('should create a worker with URL path', () => {
      const url = new URL('/worker.js', 'http://localhost')
      const { result } = renderHook(() =>
        useWebWorker(url),
      )

      expect(global.Worker).toHaveBeenCalledWith(url)
      expect(result.current.worker).toBeInstanceOf(MockWorker)
    })

    it('should create a worker with all options', () => {
      const options: UseWebWorkerOptions<any> = {
        credentials: 'include',
        name: 'test-worker',
        type: 'module',
        onError: vi.fn(),
        onMessage: vi.fn(),
        onMessageError: vi.fn(),
      }

      renderHook(() => useWebWorker('/worker.js', options))

      expect(global.Worker).toHaveBeenCalledWith('/worker.js', {
        credentials: 'include',
        name: 'test-worker',
        type: 'module',
      })
    })

    it('should initialize with IDLE status', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', {}),
      )

      expect(result.current.status).toBe('IDLE')
    })
  })

  describe('event Handling', () => {
    it('should handle message events and update status to SUCCESS', async () => {
      const onMessage = vi.fn()
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', { onMessage }),
      )

      const worker = mockWorkerInstances[0]
      const testData = { result: 'test' }

      act(() => {
        worker.simulateMessage(testData)
      })

      expect(onMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'message',
          data: testData,
        }),
      )
      expect(result.current.status).toBe('SUCCESS')
    })

    it('should handle error events and update status to ERROR', async () => {
      const onError = vi.fn()
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', { onError }),
      )

      const worker = mockWorkerInstances[0]

      act(() => {
        worker.simulateError('Test error')
      })

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          message: 'Test error',
        }),
      )
      expect(result.current.status).toBe('ERROR')
    })

    it('should handle messageerror events and update status to ERROR', async () => {
      const onMessageError = vi.fn()
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', { onMessageError }),
      )

      const worker = mockWorkerInstances[0]
      const testData = { error: 'parse error' }

      act(() => {
        worker.simulateMessageError(testData)
      })

      expect(onMessageError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'messageerror',
          data: testData,
        }),
      )
      expect(result.current.status).toBe('ERROR')
    })

    it('should work without optional callback functions', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', {}),
      )

      const worker = mockWorkerInstances[0]

      expect(() => {
        act(() => {
          worker.simulateMessage({ data: 'test' })
          worker.simulateError('test error')
          worker.simulateMessageError({ error: 'test' })
        })
      }).not.toThrow()

      expect(result.current.status).toBe('ERROR')
    })
  })

  describe('return Values', () => {
    it('should return correct worker instance', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', {}),
      )

      expect(result.current.worker).toBe(mockWorkerInstances[0])
    })

    it.todo('should return postMessage function', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', {}),
      )

      expect(typeof result.current.postMessage).toBe('function')

      const workerPostMessage = result.current.postMessage('test')
      expect(workerPostMessage).toBe(mockWorkerInstances[0].postMessage)
    })

    it.todo('should return terminate function', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', {}),
      )

      expect(typeof result.current.terminate).toBe('function')

      const workerTerminate = result.current.terminate()
      expect(workerTerminate).toBe(mockWorkerInstances[0].terminate)
    })
  })

  describe('memoization and Dependencies', () => {
    it('should create new worker when path changes', () => {
      const { result, rerender } = renderHook(
        ({ path }) => useWebWorker(path, {}),
        { initialProps: { path: '/worker1.js' } },
      )

      const firstWorker = result.current.worker

      rerender({ path: '/worker2.js' })

      expect(result.current.worker).not.toBe(firstWorker)
      expect(global.Worker).toHaveBeenCalledTimes(2)
      expect(global.Worker).toHaveBeenLastCalledWith('/worker2.js', {
        credentials: undefined,
        name: undefined,
        type: undefined,
      })
    })

    it('should create new worker when options change', () => {
      const { result, rerender } = renderHook(
        ({ options }) => useWebWorker('/worker.js', options),
        { initialProps: { options: { name: 'worker1' } } },
      )

      const firstWorker = result.current.worker

      rerender({ options: { name: 'worker2' } })

      expect(result.current.worker).not.toBe(firstWorker)
      expect(global.Worker).toHaveBeenCalledTimes(2)
    })

    it('should not recreate worker when callbacks change', () => {
      const { result, rerender } = renderHook(
        ({ onMessage }: { onMessage: (e: MessageEvent) => void }) => useWebWorker('/worker.js', { onMessage }),
        { initialProps: { onMessage: vi.fn() } },
      )

      const firstWorker = result.current.worker

      rerender({ onMessage: vi.fn() })

      expect(result.current.worker).toBe(firstWorker)
      expect(global.Worker).toHaveBeenCalledTimes(1)
    })

    it('should update event listeners when callbacks change', () => {
      const onMessage1 = vi.fn()
      const onMessage2 = vi.fn()

      const { rerender } = renderHook(
        ({ onMessage }) => useWebWorker('/worker.js', { onMessage }),
        { initialProps: { onMessage: onMessage1 } },
      )

      const worker = mockWorkerInstances[0]

      act(() => {
        worker.simulateMessage({ data: 'test1' })
      })

      expect(onMessage1).toHaveBeenCalledTimes(1)
      expect(onMessage2).not.toHaveBeenCalled()

      rerender({ onMessage: onMessage2 })

      vi.clearAllMocks()

      act(() => {
        worker.simulateMessage({ data: 'test2' })
      })

      expect(onMessage1).not.toHaveBeenCalled()
      expect(onMessage2).toHaveBeenCalledTimes(1)
    })
  })

  describe('cleanup', () => {
    it('should remove event listeners on unmount', () => {
      const { unmount } = renderHook(() =>
        useWebWorker('/worker.js', {
          onMessage: vi.fn(),
          onError: vi.fn(),
          onMessageError: vi.fn(),
        }),
      )

      const worker = mockWorkerInstances[0]
      const removeEventListenerSpy = vi.spyOn(worker, 'removeEventListener')

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3)
      expect(removeEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function))
      expect(removeEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function))
      expect(removeEventListenerSpy).toHaveBeenCalledWith('messageerror', expect.any(Function))
    })

    it('should remove event listeners when dependencies change', () => {
      const { rerender } = renderHook(
        ({ onMessage }: { onMessage: (e: MessageEvent) => void }) => useWebWorker('/worker.js', { onMessage }),
        { initialProps: { onMessage: vi.fn() } },
      )

      const worker = mockWorkerInstances[0]
      const removeEventListenerSpy = vi.spyOn(worker, 'removeEventListener')

      rerender({ onMessage: vi.fn() })

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3)
    })
  })

  describe('typeScript Generic Support', () => {
    it('should work with typed data', () => {
      interface WorkerData {
        id: number
        message: string
      }

      const onMessage = vi.fn()
      const onMessageError = vi.fn()

      const { result } = renderHook(() =>
        useWebWorker<WorkerData>('/worker.js', {
          onMessage,
          onMessageError,
        }),
      )

      const worker = mockWorkerInstances[0]
      const testData: WorkerData = { id: 1, message: 'test' }

      act(() => {
        worker.simulateMessage(testData)
      })

      expect(result.current.worker).toBeDefined()
      expect(onMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          data: testData,
        }),
      )
    })
  })

  describe('status Transitions', () => {
    it('should transition from IDLE to SUCCESS on message', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', { onMessage: vi.fn() }),
      )

      expect(result.current.status).toBe('IDLE')

      act(() => {
        mockWorkerInstances[0].simulateMessage({ data: 'test' })
      })

      expect(result.current.status).toBe('SUCCESS')
    })

    it('should transition from IDLE to ERROR on error', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', { onError: vi.fn() }),
      )

      expect(result.current.status).toBe('IDLE')

      act(() => {
        mockWorkerInstances[0].simulateError()
      })

      expect(result.current.status).toBe('ERROR')
    })

    it('should transition from SUCCESS back to ERROR', () => {
      const { result } = renderHook(() =>
        useWebWorker('/worker.js', {
          onMessage: vi.fn(),
          onError: vi.fn(),
        }),
      )

      act(() => {
        mockWorkerInstances[0].simulateMessage({ data: 'test' })
      })
      expect(result.current.status).toBe('SUCCESS')

      act(() => {
        mockWorkerInstances[0].simulateError()
      })
      expect(result.current.status).toBe('ERROR')
    })

    it('should reset status to IDLE when worker changes', () => {
      const { result, rerender } = renderHook(
        ({ path }) => useWebWorker(path, { onMessage: vi.fn() }),
        { initialProps: { path: '/worker1.js' } },
      )

      act(() => {
        mockWorkerInstances[0].simulateMessage({ data: 'test' })
      })
      expect(result.current.status).toBe('SUCCESS')

      rerender({ path: '/worker2.js' })

      expect(result.current.status).toBe('IDLE')
    })
  })

  describe('edge Cases', () => {
    it('should handle rapid successive events', () => {
      const onMessage = vi.fn()
      const onError = vi.fn()

      const { result } = renderHook(() =>
        useWebWorker('/worker.js', { onMessage, onError }),
      )

      const worker = mockWorkerInstances[0]

      act(() => {
        worker.simulateMessage({ data: 'test1' })
        worker.simulateError('error1')
        worker.simulateMessage({ data: 'test2' })
        worker.simulateError('error2')
      })

      expect(onMessage).toHaveBeenCalledTimes(2)
      expect(onError).toHaveBeenCalledTimes(2)
      expect(result.current.status).toBe('ERROR')
    })

    it('should handle URL object paths correctly', () => {
      const url1 = new URL('/worker1.js', 'http://localhost')
      const url2 = new URL('/worker2.js', 'http://localhost')

      const { result, rerender } = renderHook(
        ({ url }) => useWebWorker(url, {}),
        { initialProps: { url: url1 } },
      )

      const firstWorker = result.current.worker

      rerender({ url: url2 })

      expect(result.current.worker).not.toBe(firstWorker)
      expect(global.Worker).toHaveBeenCalledWith(url2, expect.any(Object))
    })
  })
})
