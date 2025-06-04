import { useWindowSize } from 'use-reacty'

export default function UseWindowSize() {
  const { width, height } = useWindowSize()
  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      window size:
      {' '}
      {width}
      x
      {height}
    </div>
  )
}
