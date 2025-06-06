import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import useAsyncState from '.'

describe('useAsyncState', () => {
  it('should return initial state', async () => {
    const { result } = renderHook(() => useAsyncState(async () => await Promise.resolve()))
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeNull()
    expect(result.current.isSettled).toBeFalsy()
    expect(result.current.data).toBeNull()
  })

  it('should call the function and resolve it', async () => {
    const asyncFn = vi.fn(() => Promise.resolve('data'))
    const { result } = renderHook(() => useAsyncState(asyncFn))

    expect(asyncFn).toBeCalled()
    await waitFor(() => expect(result.current.data).not.toBeNull())

    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeNull()
    expect(result.current.data).toBe('data')
  })

  it('should reject the promise and return error', async () => {
    const asyncFn = vi.fn(() => Promise.reject(new Error('error')))
    const { result } = renderHook(() => useAsyncState(asyncFn))

    expect(asyncFn).toBeCalled()
    await waitFor(() => expect(result.current.error).not.toBeNull())

    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.data).toBeNull()
  })

  it('should call the onSuccess function', async () => {
    const asyncFn = vi.fn(() => Promise.resolve('data'))
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useAsyncState(asyncFn, { onSuccess }))

    expect(asyncFn).toBeCalled()
    await waitFor(() => expect(result.current.data).not.toBeNull())

    expect(onSuccess).toBeCalledWith('data')
  })

  it('should call the onError function', async () => {
    const asyncFn = vi.fn(() => Promise.reject(new Error('error')))
    const onError = vi.fn()
    const { result } = renderHook(() => useAsyncState(asyncFn, { onError }))

    expect(asyncFn).toBeCalled()
    await waitFor(() => expect(result.current.error).not.toBeNull())

    expect(onError).toBeCalledWith(new Error('error'))
  })
})
