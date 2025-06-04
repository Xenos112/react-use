import { useRef } from 'react'
import { useElementVisibility } from 'use-reacty'

export default function UseElementVisibility() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisibility(ref)
  return (
    <div
      ref={ref}
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      Target Element (Scroll down to see it)
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          margin: '10px',
          padding: '10px',
          borderRadius: '7px',
          background: 'var(--vp-c-bg-soft)',
          color: 'var(--vp-c-text-2)',
          zIndex: 100,
        }}
      >
        Element is
        {' '}
        <span style={{ color: isVisible ? 'green' : 'red' }}>
          {isVisible ? 'visible' : 'not visible'}
        </span>
      </div>
    </div>
  )
}
