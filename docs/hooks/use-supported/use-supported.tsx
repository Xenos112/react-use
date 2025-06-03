import { useSupported } from 'react-use'

export default function UseIdle() {
  const isSupported = useSupported(() => navigator && 'getBattery' in navigator)

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      {isSupported ? 'Does Support' : 'Doesn\'t Support'}
    </div>
  )
}
