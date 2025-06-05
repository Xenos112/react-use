export default function typeToString(value: unknown) {
  if (typeof value === 'string')
    return value
  if (typeof value === 'number')
    return value.toString()
  if (typeof value === 'boolean')
    return value.toString()
  if (typeof value === 'undefined')
    return undefined
  return JSON.stringify(value)
}
