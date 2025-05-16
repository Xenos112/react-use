import { useState } from 'react'
import { useClipboard } from 'react-use'

export default function UseClipboard() {
  const [input, setInput] = useState('')
  const { copy, isSupported, copied, text } = useClipboard()

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      {isSupported ? (
        <div>
          <button
            style={{
              background: 'var(--vp-c-success-1)',
              padding: '5px 10px',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '7px',
            }}
            onClick={() => copy(input)}
          >
            copy
          </button>
          {'  '}
          {copied && <span>copied</span>}
        </div>
      ) : (
        <span>not supported</span>
      )}
      <input
        type="text"
        value={input}
        style={{
          fontWeight: 'bold',
          borderRadius: '7px',
          border: '1px solid var(--vp-c-divider)',
          margin: '10px 0',
          padding: '3px 5px',
        }}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>text: {text}</p>
    </div>
  )
}
