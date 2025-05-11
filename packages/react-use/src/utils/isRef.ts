import { type RefObject } from 'react'

export function isRef(obj: any): obj is RefObject<any> {
  return obj && typeof obj === 'object' && 'current' in obj
}
