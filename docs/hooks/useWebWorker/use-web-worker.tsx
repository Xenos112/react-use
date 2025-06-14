import { useState } from 'react'
import { useWebWorker } from 'use-reacty'

export default function UseWebWorker() {
  const [result, setResult] = useState<number | null>(null)
  const [input, setInput] = useState(10)

  const { status, postMessage } = useWebWorker('./worker.ts', {
    onMessage: e => setResult(e.data),
    onError: e => console.error('Worker error:', e),
  })

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: status === 'SUCCESS' ? 'var(--vp-c-green-1)' : 'var(--vp-c-danger-1)',
          transition: 'background 0.2s',
        }}
        />
        <span style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-1)',
        }}
        >
          Status:
          {' '}
          {status}
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
      >
        <input
          type="number"
          value={input}
          onChange={e => setInput(Number(e.target.value))}
          min={1}
          max={40}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--vp-c-divider)',
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            width: '80px',
            fontSize: '0.9em',
          }}
        />
        <button
          onClick={() => postMessage(input)}
          style={{
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            border: '1px solid var(--vp-c-divider)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
          }}
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
          padding: '8px 12px',
          background: 'var(--vp-c-bg)',
          borderRadius: '6px',
          border: '1px solid var(--vp-c-divider)',
          fontFamily: 'monospace',
        }}
        >
          Fibonacci(
          {input}
          ) =
          {' '}
          {result}
        </div>
      )}
    </div>
  )
}
