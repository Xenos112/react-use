import { useMounted } from 'use-reacty'

export default function UseMounted() {
  const isMounted = useMounted()
  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      {isMounted ? 'Mounted' : 'Not Mounted'}
    </div>
  )
}
