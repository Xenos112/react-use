import { useRef } from 'react'
import { useElementBounding } from 'use-reacty'

export default function UseElementBounding() {
  const ref = useRef<HTMLDivElement>(null)
  const bounding = useElementBounding(ref)

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid var(--vp-c-divider)',
      }}
      ref={ref}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '8px 12px',
        fontSize: '0.9em',
      }}
      >
        {Object.entries(bounding).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'contents',
            }}
          >
            <div style={{
              color: 'var(--vp-c-text-2)',
              fontFamily: 'monospace',
            }}
            >
              {key}
              :
            </div>
            <div style={{
              background: 'var(--vp-c-bg)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid var(--vp-c-divider)',
              fontFamily: 'monospace',
            }}
            >
              {Math.round(value)}
              px
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '16px',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
      }}
      >
        ℹ️ Try resizing your browser window!
      </div>
    </div>
  )
}
