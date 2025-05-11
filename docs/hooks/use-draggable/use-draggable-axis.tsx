import { useState, type CSSProperties } from 'react'
import { useDraggable } from 'react-use'

export default function Draggable() {
  const [axis, setAxis] = useState<'x' | 'y'>('x')
  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 200,
    y: 100,
    axis,
  })
  const styles: CSSProperties = {
    background: 'var(--vp-c-bg)',
    padding: 10,
    border: '1px solid var(--vp-c-divider)',
    borderRadius: 7,
  }

  return (
    <div style={styles} ref={ref}>
      <button onClick={() => setAxis((prev) => (prev === 'x' ? 'y' : 'x'))}>
        Click me to change the axis to {axis === 'x' ? 'y' : 'x'} 🥳
      </button>
      <br />
      {position.x}x{position.y}
    </div>
  )
}
