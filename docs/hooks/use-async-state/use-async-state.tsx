import { useAsyncState } from 'react-use'

export default function UseAsyncState() {
  const { data, error, isLoading } = useAsyncState(() =>
    fetch('https://jsonplaceholder.typicode.com/todos/1').then(res =>
      res.json(),
    ),
  )

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {error.message}
        </p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
