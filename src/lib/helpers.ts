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

export const DIFFICULTY_CSS_CLASSES = {
  Easy: "bg-yellow-100 text-yellow-800/90",
  Medium: "bg-orange-100 text-orange-800/90",
  Hard: "bg-red-100 text-red-800/90",
}
