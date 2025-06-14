export interface UseWebWorkerOptions<T> extends WorkerOptions {
  onError?: (event: ErrorEvent) => void
  onMessage?: (event: MessageEvent) => void
  onMessageError?: (event: MessageEvent<T>) => void
}
export type WorkerStatus = 'RUNNING' | 'IDLE' | 'ERROR' | 'SUCCESS' | 'PENDING' | 'TERMINATED'

export interface UseWebWorkerReturn {
  worker: Worker
  postMessage: (message: any, transfer?: Transferable[]) => void
  terminate: () => void
  status: WorkerStatus
  error: Error | null
  isReady: boolean
  pendingMessages: number
}
