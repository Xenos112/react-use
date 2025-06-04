import { useRef } from 'react'
import { useMouseElement } from 'use-reacty'

export default function UseMouseElement() {
  const ref = useRef(null)
  const position = useMouseElement(ref)

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={ref}
        style={{
          width: 300,
          height: 300,
          border: '2px solid var(--vp-c-divider)',
          borderRadius: '7px',
          padding: '10px',
        }}
      >
        x:
        {' '}
        {position.x}
        <br />
        y:
        {' '}
        {position.y}
      </div>
    </div>
  )
}
