import { useState } from 'react'
import { useDraggable } from 'use-reacty'

export default function DraggableEvents() {
  const [events, setEvents] = useState<string[]>([])
  const [state, setState] = useState<'😔' | '🙂' | '🥳'>('🙂')

  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 100,
    y: 100,
    onStart: (pos) => {
      setState('😔')
      setEvents(prev => [`Started at (${Math.round(pos.x)}, ${Math.round(pos.y)})`, ...prev.slice(0, 4)])
    },
    onMove: (pos) => {
      setState('🥳')
      setEvents(prev => [`Moved to (${Math.round(pos.x)}, ${Math.round(pos.y)})`, ...prev.slice(0, 4)])
    },
    onEnd: (pos) => {
      setState('🙂')
      setEvents(prev => [`Ended at (${Math.round(pos.x)}, ${Math.round(pos.y)})`, ...prev.slice(0, 4)])
    },
  })

  return (
    <div style={{
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
          borderRadius: '8px',
          border: '1px solid var(--vp-c-divider)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          cursor: 'grab',
          userSelect: 'none',
          width: 'fit-content',
          fontSize: '0.9em',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>{state}</span>
          <span>Drag me around!</span>
        </div>

        <div style={{ color: 'var(--vp-c-text-2)' }}>
          Position: (
          {Math.round(position.x)}
          ,
          {Math.round(position.y)}
          )
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        background: 'var(--vp-c-bg)',
        borderRadius: '8px',
        border: '1px solid var(--vp-c-divider)',
        padding: '12px',
      }}
      >
        <div style={{
          color: 'var(--vp-c-text-2)',
          marginBottom: '8px',
          fontSize: '0.9em',
        }}
        >
          Recent Events:
        </div>
        {events.length === 0
          ? (
              <div style={{
                color: 'var(--vp-c-text-2)',
                fontSize: '0.9em',
                fontStyle: 'italic',
              }}
              >
                No events yet. Try dragging the box above!
              </div>
            )
          : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '0.9em',
              }}
              >
                {events.map((event, i) => (
                  <div
                    key={i}
                    style={{
                      color: 'var(--vp-c-text-2)',
                      padding: '4px 8px',
                      background: i === 0 ? 'var(--vp-c-bg-soft)' : 'transparent',
                      borderRadius: '4px',
                    }}
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
      </div>
    </div>
  )
}
