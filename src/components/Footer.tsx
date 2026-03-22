import type { JSX } from "react"

type FooterProps = {
  textAlign?: "left" | "center"
}
export default function Footer({ textAlign }: FooterProps): JSX.Element {
  const year: number = new Date().getFullYear()
  return (
    <footer
      className={`bg-neutral-50 p-5 text-center dark:bg-neutral-800 md:text-${textAlign}`}
    >
      <span className="text-sm text-gray-300 dark:text-gray-500">
        unforgetti {year}
      </span>
    </footer>
  )
}
