import type { JSX } from "react"

export default function Footer(): JSX.Element {
  const year: number = new Date().getFullYear()
  return (
    <footer className="bg-neutral-50 p-5">
      <span className="text-sm text-gray-300">Pomelo {year}</span>
    </footer>
  )
}
