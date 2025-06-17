import { useDraggable } from 'use-reacty'

export default function Draggable() {
  const { position, ref } = useDraggable<HTMLDivElement>()

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '8px',
        padding: '20px',
        height: '300px',
        border: '1px solid var(--vp-c-divider)',
      }}
    >
      <div
        ref={ref}
        style={{
          background: 'var(--vp-c-bg)',
          padding: '15px',
          borderRadius: '6px',
          border: '1px solid var(--vp-c-divider)',
          cursor: 'grab',
          userSelect: 'none',
          width: 'fit-content',
        }}
      >
        <div style={{ fontSize: '0.9em' }}>
          ✨ Drag me!
        </div>
        <div style={{
          color: 'var(--vp-c-text-2)',
          fontSize: '0.9em',
          marginTop: '8px',
        }}
        >
          Position: (
          {Math.round(position.x)}
          ,
          {Math.round(position.y)}
          )
        </div>
      </div>
    </div>
  )
}
