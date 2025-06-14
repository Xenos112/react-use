self.onmessage = function (e) {
  const n = Number.parseInt(e.data)
  console.log('Hello world')

  function fib(n: number): number {
    if (n <= 1)
      return n
    return fib(n - 1) + fib(n - 2)
  }

  const result = fib(n)
  self.postMessage(result)
}
