import { useRef } from 'react'
import { useElementBounding } from 'use-reacty'

export default function UseElementBounding() {
  const ref = useRef<HTMLDivElement>(null)
  const bounding = useElementBounding(ref)
  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
      ref={ref}
    >
      width:
      {' '}
      {bounding.width}
      <br />
      height:
      {' '}
      {bounding.height}
      <br />
      top:
      {' '}
      {bounding.top}
      <br />
      left:
      {' '}
      {bounding.left}
      <br />
      bottom:
      {' '}
      {bounding.bottom}
      <br />
      right:
      {' '}
      {bounding.right}
      <br />
      x:
      {' '}
      {bounding.x}
      <br />
      y:
      {' '}
      {bounding.y}
    </div>
  )
}
