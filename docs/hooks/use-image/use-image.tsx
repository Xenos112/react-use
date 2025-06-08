import { useState } from 'react'
import { useImage } from 'use-reacty'

export default function UseImage() {
  const urls: string[] = [
    'https://picsum.photos/200/200',
    'https://picsum.photos/200/201',
    'https://picsum.photos/200/202',
    'https://picsum.photos/200/203',
    'https://invalid.url',
  ]
  const [number, setNumber] = useState(0)
  const { error, isLoading, Image } = useImage({
    src: urls[number],
    width: 200,
    height: 200,
    style: { borderRadius: '8px' },
  })

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
    }}
    >
      <div style={{
        width: 200,
        height: 200,
        background: 'var(--vp-c-bg)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--vp-c-divider)',
      }}
      >
        {isLoading
          ? (
              <div style={{ color: 'var(--vp-c-text-2)', fontSize: '0.9em' }}>
                Loading...
              </div>
            )
          : (
              <Image />
            )}
      </div>

      {error && (
        <div style={{
          color: 'var(--vp-c-danger-1)',
          background: 'var(--vp-c-danger-soft)',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '0.9em',
          width: '100%',
          textAlign: 'center',
        }}
        >
          ⚠️ Error:
          {' '}
          {error.message}
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
      >
        <button
          type="button"
          onClick={() => setNumber((number + 1) % urls.length)}
          style={{
            background: 'var(--vp-c-bg)',
            color: 'var(--vp-c-text-1)',
            border: '1px solid var(--vp-c-divider)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'all 0.2s',
          }}
        >
          Next Image (
          {number + 1}
          /
          {urls.length}
          )
        </button>

        <div style={{
          fontSize: '0.9em',
          color: 'var(--vp-c-text-2)',
        }}
        >
          {number === urls.length - 1 ? '⚠️ Next is invalid URL' : '✨ Loading random image'}
        </div>
      </div>
    </div>
  )
}
