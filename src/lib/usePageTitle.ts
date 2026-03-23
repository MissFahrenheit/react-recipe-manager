import { useEffect } from "react"

export function usePageTitle(title: string): void {
  useEffect(() => {
    if (title === "Home") {
      document.title = "unforgetti - Home"
    } else {
      document.title = `${title} - unforgetti`
    }
  }, [title])
}
