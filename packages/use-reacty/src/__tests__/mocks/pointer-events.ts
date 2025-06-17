export default class MockPointerEvent extends Event {
  clientX: number
  clientY: number
  pointerType: string

  constructor(type: string, props: PointerEventInit) {
    super(type, props)
    this.clientX = props.clientX || 0
    this.clientY = props.clientY || 0
    this.pointerType = props.pointerType || 'mouse'
  }
}
