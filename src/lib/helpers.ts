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
  Easy: "bg-yellow-100 text-yellow-800/90 dark:bg-yellow-900 dark:text-yellow-300 ",
  Medium:
    "bg-orange-100 text-orange-800/90 dark:bg-orange-900 dark:text-orange-300 ",
  Hard: "bg-red-100 text-red-800/90 dark:bg-red-900 dark:text-red-300 ",
}

export const RED_BUTTON_CSS_CLASSES =
  "rounded-full bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
