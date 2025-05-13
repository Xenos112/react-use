import { useMouse } from 'react-use'

export default function UseMouse() {
  const position = useMouse()
  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      x: {position.x}
      <br />
      y: {position.y}
    </div>
  )
}
