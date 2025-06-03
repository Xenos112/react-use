import { useWindowScroll } from 'react-use'

export default function UseWindowScroll() {
  const { scrollY, scrollX, y, x } = useWindowScroll()

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            color: 'var(--vp-c-text-3)',
            padding: '4px 10px',
            background: 'var(--vp-c-success-1)',
          }}
          onClick={() => scrollY(100)}
        >
          Scroll Down
        </button>
        <button
          style={{
            color: 'var(--vp-c-text-3)',
            padding: '4px 10px',
            background: 'var(--vp-c-success-1)',
          }}
          onClick={() => scrollX(100)}
        >
          Scroll Right
        </button>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          margin: '10px',
          padding: '10px',
          borderRadius: '7px',
          background: 'var(--vp-c-bg-soft)',
          zIndex: 100,
        }}
      >
        x:
        {x}
        {' '}
        y:
        {y}
      </div>
    </div>
  )
}
