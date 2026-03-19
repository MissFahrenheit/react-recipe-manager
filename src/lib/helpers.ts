export function numberOrString(val: string): string | number {
  const trimmed = val.trim()

  const normalized = trimmed.replace(",", ".")

  const num = Number(normalized)

  if (trimmed !== "" && !isNaN(num) && isFinite(num)) {
    return num
  }

  return val
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
