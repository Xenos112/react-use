import * as hooks from 'use-reacty'

export default function listHooks() {
  const listedHooks: string[] = []

  for (const k in hooks) {
    if (k.startsWith('use')) {
      listedHooks.push(k)
    }
  }

  return listedHooks
}
