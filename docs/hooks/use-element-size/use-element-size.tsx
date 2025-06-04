import { useRef } from 'react'
import { useElementSize } from 'use-reacty'

export default function UseElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useElementSize(ref)
  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
      ref={ref}
    >
      {size.width}
      {' '}
      x
      {size.height}
    </div>
  )
}
