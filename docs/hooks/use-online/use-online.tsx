import { useOnline } from 'react-use'

export default function UseOnline() {
  const isOnline = useOnline()

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      <span style={{ display: 'block', color: isOnline ? 'green' : 'online' }}>
        isOnline: {isOnline ? 'true' : 'false'}
      </span>
    </div>
  )
}
