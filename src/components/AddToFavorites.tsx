import type { JSX } from "react"
import { useState } from "react"
import type { Recipe } from "@/types"
import { storeUpdatedRecipe } from "@/data/storeRecipes"
import { Toggle } from "./ui/toggle"
import { Heart } from "lucide-react"

type AddToFavoritesProps = {
  recipe: Recipe
}

export default function AddToFavorites({
  recipe,
}: AddToFavoritesProps): JSX.Element {
  const [favorite, setFavorite] = useState<boolean>(recipe.isFavorite)

  function toggleFavoriteRecipe() {
    const updatedRecipe = { ...recipe, isFavorite: !favorite }
    storeUpdatedRecipe(recipe.id, updatedRecipe)
    setFavorite((prevState: boolean) => !prevState)
  }

  return (
    <Toggle
      onClick={toggleFavoriteRecipe}
      aria-label="Add recipe to favorites"
      size="lg"
      data-state={favorite ? "on" : "off"}
      // className="absolute top-1.5 right-1.5 z-30 hover:bg-transparent aria-pressed:bg-transparent data-[state=on]:bg-transparent"
      className="absolute top-4 right-5 z-30 h-10 w-10 rounded-full bg-yellow-100 hover:bg-yellow-100 aria-pressed:bg-yellow-100 data-[state=on]:bg-yellow-200"
    >
      <Heart
        // className="size-5 stroke-green-300 group-data-[state=on]/toggle:fill-green-300"
        className="size-5 fill-white stroke-gray-500 stroke-1 group-data-[state=on]/toggle:fill-green-300"
      />
    </Toggle>
  )
}
