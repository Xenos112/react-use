import { useTitle } from 'use-reacty'

export default function UseTitle() {
  const [title, setTitle] = useTitle()

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
        padding: '12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
      }}
      >
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Change page title..."
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--vp-c-text-1)',
            fontSize: '0.9em',
            width: '100%',
            outline: 'none',
          }}
        />
      </div>

      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      >
        <span>📝</span>
        Current page title:
        <span style={{ fontFamily: 'monospace' }}>{title}</span>
      </div>
    </div>
  )
}
