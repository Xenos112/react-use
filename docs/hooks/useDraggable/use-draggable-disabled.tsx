import { useState } from 'react'
import { useDraggable } from 'use-reacty'

export default function DraggableDisabled() {
  const [disabled, setDisabled] = useState(true)
  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 100,
    y: 100,
    disabled,
  })

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      height: '300px',
      border: '1px solid var(--vp-c-divider)',
    }}
    >
      <div
        ref={ref}
        style={{
          background: 'var(--vp-c-bg)',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid var(--vp-c-divider)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '200px',
        }}
      >
        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        >
          {disabled ? '🔒' : '✨'}
          {disabled ? 'Dragging disabled' : 'Drag me around!'}
        </div>

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
          onClick={() => setDisabled(prev => !prev)}
          style={{
            background: 'var(--vp-c-bg-soft)',
            border: '1px solid var(--vp-c-divider)',
            color: 'var(--vp-c-text-1)',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.9em',
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          {disabled ? 'Enable' : 'Disable'}
          dragging
        </button>
      </div>

      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        marginTop: '12px',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        width: 'fit-content',
      }}
      >
        Try toggling drag functionality
      </div>
    </div>
  )
}
