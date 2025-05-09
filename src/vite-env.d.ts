/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { FC } from 'react'

  const content: FC<any>
  export default content
}
