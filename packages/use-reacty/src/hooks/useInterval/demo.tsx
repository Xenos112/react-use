import { useState } from 'react'
import { useInterval } from 'use-reacty'

export default function UseInterval() {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)

  const { isActive, pause, resume } = useInterval(() => {
    setCount(prev => prev + 1)
  }, delay)

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
      >
        <button
          type="button"
          onClick={() => isActive ? pause() : resume()}
          style={{
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            border: '1px solid var(--vp-c-divider)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'all 0.2s',
          }}
        >
          {isActive ? '⏸ Pause' : '▶ Resume'}
        </button>

        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-1)',
          fontFamily: 'monospace',
          padding: '8px 12px',
          background: 'var(--vp-c-bg)',
          borderRadius: '6px',
          border: '1px solid var(--vp-c-divider)',
        }}
        >
          Count:
          {count}
        </div>

        <select
          value={delay}
          onChange={e => setDelay(Number(e.target.value))}
          style={{
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            border: '1px solid var(--vp-c-divider)',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '0.9em',
            cursor: 'pointer',
          }}
        >
          <option value={500}>Fast (500ms)</option>
          <option value={1000}>Normal (1s)</option>
          <option value={2000}>Slow (2s)</option>
        </select>
      </div>

      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
      }}
      >
        ⏱️
        {!isActive
          ? 'Timer is paused'
          : `Updates every ${delay / 1000} second${delay !== 1000 ? 's' : ''}`}
      </div>
    </div>
  )
}
