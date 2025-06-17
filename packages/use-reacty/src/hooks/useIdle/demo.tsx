import { useIdle } from 'use-reacty'

export default function UseIdle() {
  const { isIdle, lastActive } = useIdle()

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
        gap: '8px',
      }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isIdle ? 'var(--vp-c-danger-1)' : 'var(--vp-c-green-1)',
          transition: 'background 0.2s',
        }}
        />
        <span style={{
          color: 'var(--vp-c-text-1)',
          fontSize: '0.9em',
        }}
        >
          {isIdle ? '😴 User is idle' : '👋 User is active'}
        </span>
      </div>

      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        fontFamily: 'monospace',
      }}
      >
        Last active:
        {lastActive}
      </div>

      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        fontStyle: 'italic',
      }}
      >
        Try not moving your mouse for a few seconds
      </div>
    </div>
  )
}
