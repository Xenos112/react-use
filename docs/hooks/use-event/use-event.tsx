import { useEvent } from 'react-use'
import { useRef, useState, type CSSProperties } from 'react'

export default function UseEvent() {
  const [count, setCount] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  useEvent(
    'click',
    () => {
      setCount(count + 1)
    },
    buttonRef,
  )
  return (
    <div style={divStyle}>
      <button style={buttonStyle} ref={buttonRef}>
        Count: {count}
      </button>
    </div>
  )
}
