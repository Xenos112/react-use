import { useSupported } from 'use-reacty'

export default function UseSupported() {
  const isGetBatterySupported = useSupported(() => navigator && 'getBattery' in navigator)
  const isClipboardSupported = useSupported(() => navigator && 'clipboard' in navigator)

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
      {[
        { name: 'Battery API', supported: isGetBatterySupported },
        { name: 'Clipboard API', supported: isClipboardSupported },
      ].map(({ name, supported }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            background: 'var(--vp-c-bg)',
            borderRadius: '6px',
            border: '1px solid var(--vp-c-divider)',
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: supported ? 'var(--vp-c-green-1)' : 'var(--vp-c-danger-1)',
            transition: 'background 0.2s',
          }}
          />
          <span style={{
            color: 'var(--vp-c-text-1)',
            fontSize: '0.9em',
            flex: 1,
          }}
          >
            {name}
          </span>
          <span style={{
            fontSize: '0.9em',
            color: supported ? 'var(--vp-c-green-1)' : 'var(--vp-c-danger-1)',
            fontFamily: 'monospace',
          }}
          >
            {supported ? '✓ Supported' : '✗ Not Supported'}
          </span>
        </div>
      ))}

      <div style={{
        fontSize: '0.9em',
        color: 'var(--vp-c-text-2)',
        padding: '8px 12px',
        background: 'var(--vp-c-bg)',
        borderRadius: '6px',
        border: '1px solid var(--vp-c-divider)',
      }}
      >
        💡 Results based on your current browser support
      </div>
    </div>
  )
}
