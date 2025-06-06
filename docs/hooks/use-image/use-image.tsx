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
    style: { borderRadius: '10px' },
  })

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      {isLoading
        ? (
            <p style={{ color: 'var(--vp-c-text-2)' }}>Loading...</p>
          )
        : (
            <Image />
          )}
      {error && (
        <p style={{ color: 'var(--vp-c-danger-soft)' }}>
          Error:
          {error.message}
        </p>
      )}
      <div>
        <button
          type="button"
          style={{
            padding: '5px 10px',
            fontWeight: 'bold',
            marginTop: '10px',
            background: 'var(--vp-c-success-1',
          }}
          onClick={() => setNumber((number + 1) % urls.length)}
        >
          Change image
        </button>
      </div>
    </div>
  )
}
