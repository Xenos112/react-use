import { MDXProvider } from '@mdx-js/react'
import { createFileRoute } from '@tanstack/react-router'
import Entry from './index.mdx'

export const Route = createFileRoute('/entry/')({
  component: App,
})

function App() {
  return (
    <MDXProvider>
      <Entry />
    </MDXProvider>
  )
}
