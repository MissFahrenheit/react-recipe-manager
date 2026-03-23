import type { JSX } from "react"
import { useNavigate } from "react-router-dom"
import { deleteRecipe } from "@/data/recipeService"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type DeleteButtonProps = {
  recipeId: string
  showLabel: boolean
}

export default function DeleteButton({
  recipeId,
  showLabel,
}: DeleteButtonProps): JSX.Element {
  const navigate = useNavigate()

  function handleClick() {
    deleteRecipe(recipeId)
    navigate("/")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 /> {showLabel && "Delete"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete recipe</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this recipe? There's no going back.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            aria-label={showLabel ? undefined : "Delete recipe"}
            onClick={handleClick}
          >
            Delete recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
