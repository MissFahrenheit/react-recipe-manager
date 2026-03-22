import type { JSX } from "react"
import { cn } from "@/lib/utils"
import { RED_BUTTON_CSS_CLASSES } from "@/lib/helpers"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
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
    <header className="fixed inset-x-0 top-0 z-50 flex h-header items-center justify-between bg-white px-4 py-2 dark:bg-neutral-900">
      <a href="/" title="Home" className="flex items-center gap-3">
        <img src={logoSmall} alt="unforgetti Recipe Manager" width="40" />
        <span className="font-logo text-3xl">unforgetti</span>
      </a>

      {!isCreateOrEditPage && (
        <Button
          className={cn("rounded-full px-4 py-2", RED_BUTTON_CSS_CLASSES)}
          onClick={handleCreateClick}
        >
          Add new
        </Button>
      )}
    </header>
  )
}
