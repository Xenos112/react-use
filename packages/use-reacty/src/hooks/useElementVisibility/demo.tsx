import { useRef } from 'react'
import { useElementVisibility } from 'use-reacty'

export default function UseElementVisibility() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisibility(ref)

  return (
    <div style={{ height: '150vh' }}>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '8px',
        border: '1px solid var(--vp-c-divider)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        fontSize: '0.9em',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isVisible ? 'var(--vp-c-green-1)' : 'var(--vp-c-danger-1)',
        }}
        />
        Element is
        {isVisible ? 'visible' : 'hidden'}
      </div>

      <div
        ref={ref}
        style={{
          marginTop: '120vh',
          padding: '20px',
          background: 'var(--vp-c-bg-soft)',
          borderRadius: '8px',
          border: '1px solid var(--vp-c-divider)',
          textAlign: 'center',
        }}
      >
        Target Element
      </div>
    </div>
  )
}
