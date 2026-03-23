import type { JSX } from "react"
import type { Recipe } from "@/types"
import { Link } from "react-router-dom"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Clock, Users } from "lucide-react"
import AddToFavorites from "./AddToFavorites"
import DifficultyBadge from "./DifficultyBadge"
import RecipeImage from "./RecipeImage"

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  return (
    <Card className="w-full pt-0">
      <div className="group relative">
        <Link
          aria-hidden="true"
          tabIndex={-1}
          to={`recipe/${recipe.id}`}
          className="relative block aspect-video w-full overflow-hidden"
        >
          <RecipeImage src={recipe.image} alt={recipe.name} variant="card" />
        </Link>
        <AddToFavorites
          recipe={recipe}
          cssClass="absolute top-4 right-5 z-40 h-10 w-10 rounded-full bg-white  aria-pressed:bg-white data-[state=on]:bg-white data-[state=on]:hover:bg-muted border-0 shadow-md  transition-transform hover:bg-muted"
        />
      </div>
      <CardHeader>
        <CardAction>
          <DifficultyBadge difficulty={recipe.difficulty} cssClass="" />
        </CardAction>
        <CardTitle>
          <Link to={`recipe/${recipe.id}`} className="hover:text-red-600">
            {recipe.name}
          </Link>
        </CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1" aria-label="Total time">
            <Clock className="size-4" aria-hidden="true" />
            <span>{recipe.prepTime + recipe.cookTime}'</span>
          </div>
          <div className="flex items-center gap-1" aria-label="Servings">
            <Users className="size-4" aria-hidden="true" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
