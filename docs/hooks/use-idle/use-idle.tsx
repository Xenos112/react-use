import { useIdle } from 'react-use'

export default function UseIdle() {
  const { isIdle, lastActive } = useIdle()
  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      <span style={{ display: 'block', color: isIdle ? 'red' : 'green' }}>
        isIdle:
        {' '}
        {isIdle ? 'true' : 'false'}
      </span>
      <span>
        lastActive:
        {lastActive}
      </span>
    </div>
  )
}
