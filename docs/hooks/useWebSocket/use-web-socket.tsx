import { useWebSocket } from 'use-reacty'

export default function UseWebSocket() {
  const { status, send, close } = useWebSocket('wss://ws.postman-echo.com/raw')

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
          background: status === 'open' ? 'var(--vp-c-green-1)' : 'var(--vp-c-danger-1)',
          transition: 'background 0.2s',
        }}
        />
        <span style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-1)',
        }}
        >
          Status:
          {' '}
          {status}
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
      }}
      >
        <button
          type="button"
          onClick={() => send('Hello')}
          style={{
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            border: '1px solid var(--vp-c-divider)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
          }}
          disabled={status !== 'open'}
        >
          Send Message
        </button>
        <button
          type="button"
          onClick={() => close()}
          style={{
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            border: '1px solid var(--vp-c-divider)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
          }}
          disabled={status !== 'open'}
        >
          Close
        </button>
      </div>
      <p style={{
        color: 'var(--vp-c-text-2)',
        fontSize: '0.9em',
        textAlign: 'center',
        padding: '20px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
      }}
      >
        ✨ Check the network tab
      </p>
    </div>
  )
}
