export function numberOrString(val: string): string | number {
  const trimmed = val.trim()

  const normalized = trimmed.replace(",", ".")

  const num = Number(normalized)

  if (trimmed !== "" && !isNaN(num) && isFinite(num)) {
    return num
  }

  return val
}
