function start() {
  const global = globalThis as any

  global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  global.ResizeObserver = ResizeObserver
}

export default start
