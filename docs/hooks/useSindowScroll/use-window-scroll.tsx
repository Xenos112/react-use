import { useWindowScroll } from 'use-reacty'

export default function UseWindowScroll() {
  const { scrollY, scrollX, y, x } = useWindowScroll()

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
      }}
      >
        <button
          type="button"
          onClick={() => scrollY(100)}
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
          Scroll Down 100px
        </button>
        <button
          type="button"
          onClick={() => scrollX(100)}
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
          Scroll Right 100px
        </button>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 16px',
        background: 'var(--vp-c-bg)',
        borderRadius: '12px',
        border: '1px solid var(--vp-c-divider)',
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        zIndex: 50,
        transition: 'transform 0.2s ease',
        transform: 'translateY(0)',
      }}
      >
        <span style={{ fontFamily: 'monospace' }}>
          x:
          {Math.round(x)}
          y:
          {Math.round(y)}
        </span>
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
        💡 Try scrolling or using the buttons above
      </div>
    </div>
  )
}
