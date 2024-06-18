export function formatNumericalData(value: number) {
  return value.toFixed(2).replace('.', ',')
}