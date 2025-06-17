import { useWindowSize } from 'use-reacty'

export default function UseWindowSize() {
  const { width, height } = useWindowSize()

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold' }}>Width:</span>
          {width}
          px
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Height:</span>
          {height}
          px
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Breakpoint:</span>
          {width < 640 ? 'Mobile' : width < 1024 ? 'Tablet' : 'Desktop'}
        </div>
        <div
          style={{
            width: '100%',
            height: '20px',
            background: 'var(--vp-c-brand)',
            borderRadius: '4px',
            transition: 'width 0.3s ease',
          }}
        />
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '2px dashed var(--vp-c-divider)',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          Resize your browser window to see changes
        </div>
      </div>
    </div>
  )
}
