import { cleanup, render, renderHook, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useMounted from '.'

function UseMounted() {
  const isMounted = useMounted()
  return <div data-testid="status">{String(isMounted)}</div>
}

describe('useMounted', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should return true initially when mounted', () => {
    const { result } = renderHook(() => useMounted())

    expect(result.current).toBeTruthy()
  })

  it('component should show "false" and then unmount cleanly', () => {
    const { unmount } = render(<UseMounted />)

    expect(screen.getByTestId('status').textContent).toBe('true')

    unmount()
    expect(screen.queryByTestId('status')).toBeNull()
  })
})
