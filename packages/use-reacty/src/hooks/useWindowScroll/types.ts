export interface WindowScroll {
  /**
   * scrollX
   * @description function to navigate in the X axis
   */
  scrollX: (value: number) => void

  /**
   * scrollY
   * @description function to navigate in the Y axis
   */
  scrollY: (value: number) => void

  /**
   * scroll
   * @description function to navigate in the X and Y axis
   */
  scroll: (x: number, y: number) => void

  /**
   * x
   * @description current x position
   */
  x: number

  /**
   * y
   * @description current y positionA
   */
  y: number
}
