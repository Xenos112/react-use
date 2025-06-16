/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
/**
 * @name useSupported
 * @description a hook to check if a feature is useable in the browser
 * @param cb - a callback to check if the feature exists
 * @returns boolean to indicate if it exist
 */
function useSupported(cb: () => unknown): boolean {
  return Boolean(cb())
}

export default useSupported
