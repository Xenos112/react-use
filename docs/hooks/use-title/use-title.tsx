import { useTitle } from 'use-reacty'

export default function UseTitle() {
  const [title, setTitle] = useTitle()

  return (
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        borderRadius: '7px',
        padding: '10px',
      }}
    >
      <span>
        {title}
      </span>
      <br />
      <input value={title} onChange={e => setTitle(e.target.value)} />
    </div>
  )
}
