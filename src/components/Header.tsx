import type { JSX } from "react"
import { cn } from "@/lib/utils"
import { RED_BUTTON_CSS_CLASSES } from "@/lib/helpers"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Button } from "./ui/button"
import logoSmall from "../assets/logo-100.png"

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
      <Link to="/" title="Home" className="flex items-center gap-3">
        <img src={logoSmall} alt="unforgetti Recipe Manager" width="40" />
        <span className="font-logo text-3xl text-neutral-700 dark:text-neutral-200">
          unforgetti
        </span>
      </Link>

      {!isCreateOrEditPage && (
        <Button
          className={cn("rounded-full px-4 py-2", RED_BUTTON_CSS_CLASSES)}
          onClick={handleCreateClick}
          aria-label="Add new recipe"
        >
          Add new
        </Button>
      )}
    </header>
  )
}
