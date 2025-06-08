import { useLocalStorage } from 'use-reacty'

export default function UseLocalStorage() {
  const [count, setCount] = useLocalStorage('count', {
    initialValue: 0,
  })

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
        gap: '8px',
        alignItems: 'center',
      }}
      >
        <button
          type="button"
          onClick={() => setCount(prev => (prev ?? 0) + 1)}
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
          Increment
        </button>
        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-1)',
          fontFamily: 'monospace',
        }}
        >
          Count:
          {count}
        </div>
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
        💡 Try refreshing the page - the count persists!
      </div>
    </div>
  )
}
