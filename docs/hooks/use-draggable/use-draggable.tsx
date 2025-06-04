import type { CSSProperties } from 'react'
import { useDraggable } from 'use-reacty'

export default function Draggable() {
  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 100,
    y: 100,
  })
  const styles: CSSProperties = {
    background: 'var(--vp-c-bg)',
    padding: 10,
    border: '1px solid var(--vp-c-divider)',
    borderRadius: 7,
  }

  return (
    <div style={styles} ref={ref}>
      Drag me 🥳
      <br />
      {position.x}
      x
      {position.y}
    </div>
  )
}
