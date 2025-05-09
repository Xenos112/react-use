import { createFileRoute } from '@tanstack/react-router'
import { useDraggable } from 'react-use'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [ref, { x, y }] = useDraggable<HTMLDivElement>({ y: 100 })

  return (
    <div className="">
      <div className="bg-red" ref={ref}>
        Hello world {x} {y}
      </div>
    </div>
  )
}
