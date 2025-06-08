import { useMouse } from 'use-reacty'

export default function UseMouse() {
  const position = useMouse()

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      height: '200px',
      position: 'relative',
      border: '1px solid var(--vp-c-divider)',
      cursor: 'crosshair',
    }}
    >
      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        textAlign: 'center',
        marginTop: '80px',
        pointerEvents: 'none',
      }}
      >
        Move your mouse anywhere on the page ✨
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
        <span style={{ opacity: 0.7 }}>🎯</span>
        <span>
          (
          {Math.round(position.x)}
          ,
          {Math.round(position.y)}
          )
        </span>
      </div>
    </div>
  )
}
