import type { Recipe } from "@/types"
import type { JSX } from "react"
import { Clock, Utensils } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type BasicInfoSectionProps = {
  recipe: Recipe
}

export default function BasicInfoSection({
  recipe,
}: BasicInfoSectionProps): JSX.Element {
  return (
    <>
      <div className="mt-3 mb-2 flex items-center gap-3 font-light text-gray-400">
        <Clock size={16} />
        <div className="flex items-center gap-3 text-sm font-light text-gray-400">
          <span>Prep: {recipe.prepTime}'</span>
          <Separator orientation="vertical" />
          <span>Cook: {recipe.cookTime}'</span>
          <Separator orientation="vertical" />
          <span>Total: {recipe.prepTime + recipe.cookTime}'</span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm font-light text-gray-400">
        <Utensils size={16} />
        <span>Serves: {recipe.servings}</span>
      </div>

      <p>{recipe.description}</p>
    </>
  )
}
