import type { JSX } from "react"
import type { Recipe } from "@/types"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { storeUpdatedRecipe } from "@/data/recipeService"
import { Toggle } from "./ui/toggle"
import { toast } from "sonner"
import { Heart } from "lucide-react"

type AddToFavoritesProps = {
  recipe: Recipe
  cssClass?: string
}

export default function AddToFavorites({
  recipe,
  cssClass,
}: AddToFavoritesProps): JSX.Element {
  const [favorite, setFavorite] = useState<boolean>(recipe.isFavorite)

  function toggleFavoriteRecipe() {
    const updatedRecipe = { ...recipe, isFavorite: !favorite }
    storeUpdatedRecipe(recipe.id, updatedRecipe)
    setFavorite((prevState: boolean) => !prevState)
    toast.success(
      favorite ? "Recipe removed from favorites" : "Recipe added to favorites",
      { position: "top-center" }
    )
  }

  return (
    <Toggle
      onClick={toggleFavoriteRecipe}
      aria-label="Add recipe to favorites"
      size="lg"
      data-state={favorite ? "on" : "off"}
      variant="outline"
      className={cn(cssClass, "")}
    >
      <Heart className="size-5 fill-white stroke-gray-500 group-data-[state=on]/toggle:fill-red-600 group-data-[state=on]/toggle:stroke-red-600" />
    </Toggle>
  )
}
