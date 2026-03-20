import type { JSX } from "react"
import { Button } from "./ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import logoSmall from "../assets/unforgetti-logo-40.png"

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const isCreateOrEditPage =
    location.pathname === "/recipe/create" || location.pathname.includes("edit")

  function handleCreateClick() {
    navigate(`/recipe/create`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-header items-center justify-between bg-white px-4 py-2">
      <a href="/" title="Home" className="flex items-center gap-3">
        <img src={logoSmall} alt="unforgetti Recipe Manager" width="40" />
        <span className="font-logo text-3xl">unforgetti</span>
      </a>

      {!isCreateOrEditPage && (
        <Button
          className="rounded-full bg-red-600 px-4 py-2 hover:bg-red-500"
          onClick={handleCreateClick}
        >
          Add new
        </Button>
      )}
    </header>
  )
}
