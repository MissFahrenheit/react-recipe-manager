import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import type { JSX } from "react"

export default function MainLayout(): JSX.Element {
  const year = new Date().getFullYear()
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="bg-neutral-50">
        <Outlet />
      </main>
      <footer className="bg-neutral-50 p-5">
        <span className="text-sm text-gray-300">Pomelo {year}</span>
      </footer>
    </div>
  )
}
