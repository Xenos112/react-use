export interface WindowScroll {
  scrollX: (value: number) => void
  scrollY: (value: number) => void
  scroll: (x: number, y: number) => void
  x: number
  y: number
}
