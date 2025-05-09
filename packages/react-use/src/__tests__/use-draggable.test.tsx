import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { useDraggable } from '../hooks'
import { afterEach, describe, expect, it } from 'vitest'

const DraggableComponent = ({ x = 0, y = 0 }: { x?: number; y?: number }) => {
  const [ref, position] = useDraggable<HTMLDivElement>({ x, y })

  return (
    <div>
      <div
        ref={ref}
        data-testid="draggable"
        style={{
          width: '100px',
          height: '100px',
        }}
      >
        <p>Position: {`x: ${position.x}, y: ${position.y}`}</p>
      </div>
    </div>
  )
}

afterEach(() => {
  cleanup()
})

describe('useDraggable', () => {
  it('should render the draggable element at the initial position', () => {
    render(<DraggableComponent x={50} y={100} />)

    const draggable = screen.getByTestId('draggable')

    expect(draggable.style.left).toBe('50px')
    expect(draggable.style.top).toBe('100px')
  })

  it('should update position when dragged', async () => {
    render(<DraggableComponent />)

    const draggable = screen.getByTestId('draggable')

    fireEvent.mouseDown(draggable, {
      clientX: 0,
      clientY: 0,
    })
    fireEvent.mouseMove(draggable, {
      clientX: 50,
      clientY: 100,
    })
    fireEvent.mouseUp(draggable)

    expect(draggable.style.left).toBe('50px')
    expect(draggable.style.top).toBe('100px')
  })

  it('should update the internal state when dragged', async () => {
    render(<DraggableComponent />)

    const draggable = screen.getByTestId('draggable')

    fireEvent.mouseDown(draggable, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(draggable, { clientX: 100, clientY: 200 })
    fireEvent.mouseUp(draggable)

    const positionText = screen.getByText(/Position: x: 100, y: 200/)
    expect(positionText).toBeDefined()
  })

  it('should start at the default position when no initial props are given', () => {
    render(<DraggableComponent />)

    const draggable = screen.getByTestId('draggable')

    expect(draggable.style.left).toBe('0px')
    expect(draggable.style.top).toBe('0px')
  })
})
