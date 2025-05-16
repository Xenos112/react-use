export type UseImageReturnType = {
  image: string | null
  error: string | null
  isLoading: boolean
}

export type UseImageProps = {
  src: string
  onLoad?: () => void
  onError?: (err: Error) => void
}
