import { useState } from 'react'
import { useDraggable } from 'use-reacty'

export default function DraggableAxis() {
  const [axis, setAxis] = useState<'x' | 'y'>('x')
  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 100,
    y: 100,
    axis,
  })

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '8px',
        padding: '20px',
        height: '300px',
        position: 'relative',
        border: '1px solid var(--vp-c-divider)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        backdropFilter: 'blur(8px)',
      }}
      >
        Current axis:
        <strong>{axis.toUpperCase()}</strong>
      </div>

      <div
        ref={ref}
        style={{
          background: 'var(--vp-c-bg)',
          color: 'var(--vp-c-text-1)',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid var(--vp-c-divider)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '200px',
        }}
      >
        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
        }}
        >
          Position: (
          {Math.round(position.x)}
          ,
          {Math.round(position.y)}
          )
        </div>

        <button
          type="button"
          onClick={() => setAxis(prev => prev === 'x' ? 'y' : 'x')}
          style={{
            background: 'var(--vp-c-bg-soft)',
            border: '1px solid var(--vp-c-divider)',
            color: 'var(--vp-c-text-1)',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.9em',
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          Switch to
          {axis === 'x' ? 'Y' : 'X'}
          axis
        </button>

        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
          textAlign: 'center',
        }}
        >
          ✨ Drag me
          {axis === 'x' ? '←→' : '↑↓'}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        backdropFilter: 'blur(8px)',
      }}
      >
        {axis === 'x' ? 'Horizontal' : 'Vertical'}
        movement only
      </div>
    </div>
  )
}
