import { useState } from 'react'
import { useObjectUrl } from 'use-reacty'

export default function UseObjectUrl() {
  const [file, setFile] = useState<File>()
  const url = useObjectUrl(file)

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      <input type="file" onChange={e => setFile(e.target.files?.[0])} />
      {url && (
        <div>
          url:
          <a
            href={url}
            target="_blank"
            style={{ color: 'var(--vp-c-success-1)' }}
          >
            {url}
          </a>
        </div>
      )}
    </div>
  )
}
