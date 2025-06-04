/* eslint-disable no-console */
/* eslint-disable ts/no-use-before-define */
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useDraggable } from 'use-reacty'

export default function DraggableEvents() {
  const { ref, position } = useDraggable<HTMLDivElement>({
    x: 300,
    y: 200,
    onStart: (position) => {
      setState('😔')
      console.log(`started at ${position.x}x${position.y}`)
    },
    onMove: (position) => {
      setState('🥳')
      console.log(`moved to ${position.x}x${position.y}`)
    },
    onEnd: (position) => {
      setState('🙂')
      console.log(`ended at ${position.x}x${position.y}`)
    },
  })

  const [state, setState] = useState<'😔' | '🙂' | '🥳'>('🙂')

  const styles: CSSProperties = {
    background: 'var(--vp-c-bg)',
    padding: 10,
    border: '1px solid var(--vp-c-divider)',
    borderRadius: 7,
  }

  return (
    <div style={styles} ref={ref}>
      Drag me
      {' '}
      {state}
      <br />
      Take a look at the console 👀
      <br />
      {position.x}
      x
      {position.y}
    </div>
  )
}
