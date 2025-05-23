import type { CSSProperties } from 'react'
import { useLocalStorage } from 'react-use'

export default function UseLocalStorage() {
  const [count, setCount] = useLocalStorage('count', {
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
      <button style={buttonStyle} onClick={() => setCount((prev) => prev! + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
