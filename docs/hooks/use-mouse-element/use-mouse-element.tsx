import { useRef } from 'react'
import { useMouseElement } from 'use-reacty'

export default function UseMouseElement() {
  const ref = useRef(null)
  const position = useMouseElement(ref)

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div
        ref={ref}
        style={{
          width: 300,
          height: 200,
          border: '1px solid var(--vp-c-divider)',
          borderRadius: '6px',
          padding: '20px',
          background: 'var(--vp-c-bg)',
          cursor: 'crosshair',
        }}
      >
        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
          textAlign: 'center',
          marginTop: '60px',
          pointerEvents: 'none',
        }}
        >
          Move your mouse inside this box ✨
        </div>

        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          padding: '8px 12px',
          background: 'var(--vp-c-bg-soft)',
          borderRadius: '6px',
          border: '1px solid var(--vp-c-divider)',
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
          pointerEvents: 'none',
        }}
        >
          (
          {Math.round(position.x)}
          ,
          {Math.round(position.y)}
          )
        </div>
      </div>
    </div>
  )
}
