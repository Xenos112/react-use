import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useAsyncState from '.'

const mockUserData = { id: 1, name: 'John Doe' }
const mockApiResponse = { users: [mockUserData], total: 1 }

function createSuccessfulAsyncFn<T>(data: T, delay = 100) {
  return () => new Promise<T>(resolve => setTimeout(() => resolve(data), delay))
}

function createFailingAsyncFn(errorMessage: string, delay = 100) {
  return () => new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(errorMessage)), delay),
  )
}

function createSlowAsyncFn<T>(data: T, delay = 500) {
  return () => new Promise<T>(resolve => setTimeout(() => resolve(data), delay))
}

describe('useAsyncState Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch data successfully and update state correctly', async () => {
    const asyncFn = createSuccessfulAsyncFn(mockUserData)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
    expect(result.current.isSettled).toBe(false)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockUserData)
    expect(result.current.error).toBe(null)
    expect(result.current.isSettled).toBe(true)
  })

  it('should handle errors properly and set error state', async () => {
    const errorMessage = 'Network request failed'
    const asyncFn = createFailingAsyncFn(errorMessage)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBe(null)
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe(errorMessage)
    expect(result.current.isSettled).toBe(false)
  })

  it('should call onSuccess callback when data is fetched successfully', async () => {
    const onSuccess = vi.fn()
    const asyncFn = createSuccessfulAsyncFn(mockApiResponse)

    renderHook(() => useAsyncState(asyncFn, { onSuccess }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1)
    })

    expect(onSuccess).toHaveBeenCalledWith(mockApiResponse)
  })

  it('should call onError callback when an error occurs', async () => {
    const onError = vi.fn()
    const errorMessage = 'API endpoint not found'
    const asyncFn = createFailingAsyncFn(errorMessage)

    renderHook(() => useAsyncState(asyncFn, { onError }))

    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1)
    })

    expect(onError).toHaveBeenCalledWith(expect.objectContaining({
      message: errorMessage,
    }))
  })

  it('should maintain loading state during slow async operations', async () => {
    const asyncFn = createSlowAsyncFn(mockUserData, 300)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    expect(result.current.isLoading).toBe(true)

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 500 })

    expect(result.current.data).toEqual(mockUserData)
  })

  it('should handle non-Error thrown values by wrapping them in Error', async () => {
    const asyncFn = () => Promise.reject(new Error('String error'))
    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('String error')
  })

  it('should re-execute when asyncFn dependency changes', async () => {
    let callCount = 0
    const createAsyncFn = (value: string) => () => {
      callCount++
      return Promise.resolve(`${value}-${callCount}`)
    }

    const { result, rerender } = renderHook(
      ({ asyncFn }) => useAsyncState(asyncFn),
      { initialProps: { asyncFn: createAsyncFn('first') } },
    )

    await waitFor(() => {
      expect(result.current.data).toBe('first-1')
    })

    rerender({ asyncFn: createAsyncFn('second') })

    await waitFor(() => {
      expect(result.current.data).toBe('second-2')
    })

    expect(callCount).toBe(2)
  })

  it('should re-execute when callback dependencies change', async () => {
    const onSuccess = vi.fn()
    const asyncFn = createSuccessfulAsyncFn(mockUserData)

    const { rerender } = renderHook(
      ({ callback }) => useAsyncState(asyncFn, { onSuccess: callback }),
      { initialProps: { callback: onSuccess } },
    )

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1)
    })

    const newOnSuccess = vi.fn()
    rerender({ callback: newOnSuccess })

    await waitFor(() => {
      expect(newOnSuccess).toHaveBeenCalledTimes(1)
    })

    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  it('should handle empty or undefined data correctly', async () => {
    const asyncFn = createSuccessfulAsyncFn(undefined)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBe(null)
    expect(result.current.isSettled).toBe(true)
  })

  it('should handle array data correctly', async () => {
    const arrayData = [1, 2, 3, 4, 5]
    const asyncFn = createSuccessfulAsyncFn(arrayData)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.data).toEqual(arrayData)
    })

    expect(result.current.isSettled).toBe(true)
  })

  it('should handle complex nested object data', async () => {
    const complexData = {
      user: mockUserData,
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          push: false,
          sms: true,
        },
      },
      lastLogin: new Date('2024-01-15T10:30:00Z'),
    }

    const asyncFn = createSuccessfulAsyncFn(complexData)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.data).toEqual(complexData)
    })

    expect(result.current.isSettled).toBe(true)
  })

  it('should handle race conditions properly', async () => {
    let resolveFirst: (value: string) => void
    let resolveSecond: (value: string) => void

    const firstPromise = new Promise<string>((resolve) => {
      resolveFirst = resolve
    })
    const secondPromise = new Promise<string>((resolve) => {
      resolveSecond = resolve
    })

    const { result, rerender } = renderHook(
      ({ asyncFn }) => useAsyncState(asyncFn),
      { initialProps: { asyncFn: () => firstPromise } },
    )

    expect(result.current.isLoading).toBe(true)

    rerender({ asyncFn: () => secondPromise })

    act(() => {
      resolveSecond('second')
    })

    await waitFor(() => {
      expect(result.current.data).toBe('second')
    })

    act(() => {
      resolveFirst('first')
    })

    expect(result.current.data).toBe('second')
  })

  it('should handle synchronous errors in async function', async () => {
    const asyncFn = () => {
      throw new Error('Immediate error')
    }

    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error?.message).toBe('Immediate error')
    expect(result.current.data).toBe(null)
    expect(result.current.isSettled).toBe(false)
  })

  it('should work correctly without any options provided', async () => {
    const asyncFn = createSuccessfulAsyncFn(mockUserData)
    const { result } = renderHook(() => useAsyncState(asyncFn))

    await waitFor(() => {
      expect(result.current.data).toEqual(mockUserData)
    })

    expect(result.current.error).toBe(null)
    expect(result.current.isSettled).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('should handle state transitions correctly during multiple async calls', async () => {
    const asyncFn = createSuccessfulAsyncFn(mockUserData, 100)
    const { result, rerender } = renderHook(
      ({ fn }) => useAsyncState(fn),
      { initialProps: { fn: asyncFn } },
    )

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isSettled).toBe(false)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isSettled).toBe(true)
    expect(result.current.data).toEqual(mockUserData)

    const newAsyncFn = createSuccessfulAsyncFn({ id: 2, name: 'Jane Doe' }, 100)
    rerender({ fn: newAsyncFn })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isSettled).toBe(false)
    expect(result.current.error).toBe(null)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual({ id: 2, name: 'Jane Doe' })
    expect(result.current.isSettled).toBe(true)
  })
})
