export interface UseImageReturnType {
  error: Error | null
  isLoading: boolean
  Image: () => React.ReactElement
}

export interface UseImageOptions {
  src: string
  srcSet?: string
  sizes?: string
  alt?: string
  className?: string
  loading?: HTMLImageElement['loading']
  crossorigin?: string
  referrerPolicy?: HTMLImageElement['referrerPolicy']
  width?: HTMLImageElement['width']
  height?: HTMLImageElement['height']
  decoding?: HTMLImageElement['decoding']
  fetchPriority?: HTMLImageElement['fetchPriority']
  isMap?: HTMLImageElement['isMap']
  useMap?: HTMLImageElement['useMap']
  style?: React.CSSProperties
}
