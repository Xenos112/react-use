export type ReturnType = {
  copy: (text: string) => void
  isSupported: boolean
  text: string
  copied: boolean
}

export type Options = {
  timeout?: number
  onCopy?: (text: string) => void
}
