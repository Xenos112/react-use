// eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
function useSupported(cb: () => unknown): boolean {
  return Boolean(cb())
}

export default useSupported
