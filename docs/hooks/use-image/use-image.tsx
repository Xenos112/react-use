import { useState } from 'react'
import { useImage } from 'react-use'

export default function UseImage() {
  const urls: string[] = [
    'https://picsum.photos/200/200',
    'https://picsum.photos/200/201',
    'https://picsum.photos/200/202',
    'https://picsum.photos/200/203',
  ]
  const [number, setNumber] = useState(0)
  const { image, error, isLoading } = useImage({
    src: urls[number],
  })

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      {image && <img src={image} />}
      {error && <p>Error: {error}</p>}
      {isLoading && <p>Loading...</p>}
      <div>
        <button
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
