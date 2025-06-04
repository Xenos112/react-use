import type { CSSProperties } from 'react'
import { useSessionStorage } from 'use-reacty'

export default function UseSessionStorage() {
  const [count, setCount] = useSessionStorage('count', {
    initialValue: 0,
  })

  const divStyle: CSSProperties = {
    background: 'var(--vp-c-bg-soft)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    borderRadius: '10px',
  }

  const buttonStyle: CSSProperties = {
    color: 'var(--vp-c-text-1)',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
  }

  return (
    <div style={divStyle}>
      <button type="button" style={buttonStyle} onClick={() => setCount(prev => prev! + 1)}>
        Count:
        {' '}
        {count}
      </button>
    </div>
  )
}
