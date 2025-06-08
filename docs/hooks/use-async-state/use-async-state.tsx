import { useCallback, useState } from 'react'
import { useAsyncState } from 'use-reacty'

export default function UseAsyncState() {
  const [id, setId] = useState(1)

  // Memoize the async function to prevent unnecessary re-fetches
  const fetchTodo = useCallback(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    if (!res.ok)
      throw new Error('Failed to fetch todo')
    return res.json()
  }, [id])

  const { data, error, isLoading } = useAsyncState(fetchTodo)

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      {/* Input Controls */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="todo-id" style={{ color: 'var(--vp-c-text-2)' }}>
          Todo ID:
        </label>
        <input
          id="todo-id"
          type="number"
          value={id}
          onChange={e => setId(Math.max(1, Math.min(200, Number(e.target.value))))}
          min={1}
          max={200}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--vp-c-divider)',
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            width: '80px',
          }}
        />
      </div>

      {/* Status Display */}
      <div
        style={{
          padding: '15px',
          borderRadius: '6px',
          background: 'var(--vp-c-bg)',
          border: '1px solid var(--vp-c-divider)',
          minHeight: '100px',
        }}
      >
        {isLoading && (
          <div style={{ color: 'var(--vp-c-text-2)' }}>Loading...</div>
        )}

        {error && (
          <div style={{
            color: 'var(--vp-c-danger-1)',
            background: 'var(--vp-c-danger-soft)',
            padding: '10px',
            borderRadius: '6px',
          }}
          >
            ⚠️
            {' '}
            {error.message}
          </div>
        )}

        {data && !isLoading && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
            }}
            >
              <input
                type="checkbox"
                checked={data.completed}
                readOnly
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--vp-c-brand)',
                }}
              />
              <span style={{
                color: data.completed ? 'var(--vp-c-text-2)' : 'var(--vp-c-text-1)',
                textDecoration: data.completed ? 'line-through' : 'none',
              }}
              >
                {data.title}
              </span>
            </div>
            <div style={{
              fontSize: '0.9em',
              color: 'var(--vp-c-text-2)',
            }}
            >
              User ID:
              {data.userId}
            </div>
          </div>
        )}
      </div>

      {/* Example Usage */}
      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        padding: '10px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
      }}
      >
        Try changing the ID to see different todos
      </div>
    </div>
  )
}
