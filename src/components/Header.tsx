import type { JSX } from "react"
import { Button } from "./ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import pomelo from "../assets/pomelo.png"

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const isCreateOrEditPage =
    location.pathname === "/recipe/create" || location.pathname.includes("edit")

  function handleCreateClick() {
    navigate(`/recipe/create`)
  }

  return (
    <header className="flex justify-between px-4 py-3">
      <a href="/" title="Home" className="flex items-center gap-3">
        <img src={pomelo} alt="Pomelo Recipe Manager" width="40" />
        <span className="text-2xl text-muted-foreground">Pomelo</span>
      </a>

      {!isCreateOrEditPage && (
        <Button className="mt-2" onClick={handleCreateClick}>
          Add new
        </Button>
      )}
    </header>
  )
}
