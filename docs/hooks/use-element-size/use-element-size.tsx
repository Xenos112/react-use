import { useRef } from 'react'
import { useElementSize } from 'use-reacty'

export default function UseElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useElementSize(ref)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
    >
      <div
        ref={ref}
        style={{
          background: 'var(--vp-c-bg-soft)',
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid var(--vp-c-divider)',
          resize: 'both',
          overflow: 'auto',
          minWidth: '200px',
          minHeight: '100px',
        }}
      >
        <div style={{
          fontSize: '0.9em',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--vp-c-text-2)',
          }}
          >
            <span>📏</span>
            <span style={{ fontFamily: 'monospace' }}>
              {Math.round(size.width)}
              {' '}
              ×
              {Math.round(size.height)}
              {' '}
              pixels
            </span>
          </div>
          <div style={{
            fontSize: '0.9em',
            color: 'var(--vp-c-text-2)',
            fontStyle: 'italic',
          }}
          >
            ↘️ Drag the bottom-right corner to resize
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '8px 12px',
        padding: '12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        fontSize: '0.9em',
      }}
      >
        <div style={{ color: 'var(--vp-c-text-2)' }}>Width:</div>
        <div style={{ fontFamily: 'monospace' }}>
          {Math.round(size.width)}
          px
        </div>
        <div style={{ color: 'var(--vp-c-text-2)' }}>Height:</div>
        <div style={{ fontFamily: 'monospace' }}>
          {Math.round(size.height)}
          px
        </div>
      </div>
    </div>
  )
}
