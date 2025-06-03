export interface ReturnType {
  copy: (text: string) => void
  isSupported: boolean
  text: string
  copied: boolean
}

export interface Options {
  timeout?: number
  onCopy?: (text: string) => void
}
