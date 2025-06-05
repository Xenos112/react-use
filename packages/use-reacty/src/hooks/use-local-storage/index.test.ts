import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useLocalStorage } from '..'

const localStorageMock = (() => {
  type Store = Record<string, string>
  let store: Store = {}
  return {
    getItem: vi.fn((key: string): string | null => store[key] || null),
    setItem: vi.fn((key: string, value: string): void => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string): void => {
      delete store[key]
    }),
    clear: vi.fn((): void => {
      store = {}
    }),
  }
})()

beforeEach(() => {
  localStorageMock.clear()
  vi.stubGlobal('localStorage', localStorageMock)
})

describe('useLocalStorage', () => {
  it('should set the initial value', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>('key', {
        initialValue: 'value',
      }),
    )

    const [value, setValue] = result.current
    expect(value).toBe('value')
    expect(setValue).toBeDefined()
  })

  it('should set the update value', async () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>('setkey', {
        initialValue: 'value',
      }),
    )

    await act(async () => {
      result.current[1]('new value')
    })

    expect(localStorageMock.getItem('setkey')).toBe('new value')
    expect(result.current[0]).toBe('new value')
  })

  it('should handle undefined values', async () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | undefined>('testKey', {
        initialValue: 'initial',
      }),
    )

    await act(async () => {
      result.current[1](undefined)
    })

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.removeItem).toHaveBeenCalledWith('testKey')
  })

  it('should handle existing localStorage values', async () => {
    localStorage.setItem('persistedKey', JSON.stringify('existing'))

    const { result } = renderHook(() =>
      useLocalStorage('persistedKey', { initialValue: 'default' }),
    )

    expect(result.current[0]).toBe('existing')
  })
})
