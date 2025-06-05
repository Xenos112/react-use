export interface UseIdleReturnType {
  /**
   * isIdle
   * @description a boolean indicating is the user is in idle mode or not
   * @default false
   */
  isIdle: boolean
  /**
   * lastActive
   * @description integer that got updated each second, when its > 0 it mean the user is idle
   * @default -1
   */
  lastActive: number
}
