import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useSessionStorage from '.'

const sessionStorageMock = (() => {
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
  sessionStorageMock.clear()
  vi.stubGlobal('sessionStorage', sessionStorageMock)
})

describe('useLocalStorage', () => {
  it('should set the initial value', () => {
    const { result } = renderHook(() =>
      useSessionStorage<string>('key', {
        initialValue: 'value',
      }),
    )

    const [value, setValue] = result.current
    expect(value).toBe('value')
    expect(setValue).toBeDefined()
  })

  it('should set the update value', async () => {
    const { result } = renderHook(() =>
      useSessionStorage<string>('setkey', {
        initialValue: 'value',
      }),
    )

    await act(async () => {
      result.current[1]('new value')
    })

    expect(sessionStorageMock.getItem('setkey')).toBe('"new value"')
    expect(result.current[0]).toBe('new value')
  })

  it('should handle undefined values', async () => {
    const { result } = renderHook(() =>
      useSessionStorage<string | undefined>('testKey', {
        initialValue: 'initial',
      }),
    )

    await act(async () => {
      result.current[1](undefined)
    })

    expect(result.current[0]).toBeUndefined()
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('testKey')
  })

  it('should handle existing localStorage values', async () => {
    sessionStorage.setItem('persistedKey', JSON.stringify('existing'))

    const { result } = renderHook(() =>
      useSessionStorage('persistedKey', { initialValue: 'default' }),
    )

    expect(result.current[0]).toBe('existing')
  })
})
