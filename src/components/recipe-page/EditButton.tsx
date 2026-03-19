import type { JSX } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

type EditButtonProps = {
  recipeId: string
}

export default function EditButton({ recipeId }: EditButtonProps): JSX.Element {
  const navigate = useNavigate()

  function handleEditClick() {
    navigate(`/recipe/${recipeId}/edit`)
  }

  return (
    <Button variant="outline" onClick={handleEditClick}>
      <Pencil />
      Edit
    </Button>
  )
}
