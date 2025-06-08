export default function getCoordinates(event: MouseEvent | TouchEvent) {
  if ('touches' in event) {
    return {
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY,
    }
  }
  return {
    clientX: (event as MouseEvent).clientX,
    clientY: (event as MouseEvent).clientY,
  }
}
