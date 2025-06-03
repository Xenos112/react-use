import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useDraggable } from 'react-use'

export default function Draggable() {
  const [disabled, setDisabled] = useState(true)
  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 300,
    y: 40,
    disabled,
  })
  const styles: CSSProperties = {
    background: 'var(--vp-c-bg)',
    padding: 10,
    border: '1px solid var(--vp-c-divider)',
    borderRadius: 7,
  }

  return (
    <div style={styles} ref={ref}>
      {disabled ? 'You can\'t drag me 😔' : 'Drag me 🥳'}
      <br />
      <button onClick={() => setDisabled(prev => !prev)}>
        {disabled ? 'Enable' : 'Disable'}
        {' '}
        dragging
      </button>
      <br />
      {position.x}
      x
      {position.y}
    </div>
  )
}
