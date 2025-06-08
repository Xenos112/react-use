import { useState } from 'react'
import { useObjectUrl } from 'use-reacty'

export default function UseObjectUrl() {
  const [file, setFile] = useState<File>()
  const url = useObjectUrl(file)

  return (
    <div style={{
      background: 'var(--vp-c-bg-soft)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}
    >
      <div style={{
        background: 'var(--vp-c-bg)',
        padding: '20px',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
        textAlign: 'center',
      }}
      >
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0])}
          style={{
            fontSize: '0.9em',
            color: 'var(--vp-c-text-1)',
          }}
        />
      </div>

      {url
        ? (
            <div style={{
              background: 'var(--vp-c-bg)',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid var(--vp-c-divider)',
              fontSize: '0.9em',
            }}
            >
              <div style={{
                color: 'var(--vp-c-text-2)',
                marginBottom: '8px',
              }}
              >
                Generated URL:
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--vp-c-brand)',
                  wordBreak: 'break-all',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '8px',
                  background: 'var(--vp-c-bg-soft)',
                  borderRadius: '4px',
                  transition: 'all 0.2s',
                }}
              >
                {url}
              </a>
            </div>
          )
        : (
            <div style={{
              color: 'var(--vp-c-text-2)',
              fontSize: '0.9em',
              textAlign: 'center',
              padding: '20px',
              background: 'var(--vp-c-bg)',
              borderRadius: '6px',
              border: '1px solid var(--vp-c-divider)',
            }}
            >
              Select a file to generate Object URL ✨
            </div>
          )}
    </div>
  )
}
