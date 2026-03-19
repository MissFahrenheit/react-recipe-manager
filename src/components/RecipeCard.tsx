import type { JSX } from "react"
import type { Recipe } from "@/types"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Utensils } from "lucide-react"
import AddToFavorites from "./AddToFavorites"
import DifficultyBadge from "./DifficultyBadge"

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  return (
    <Card className="w-full max-w-120 pt-0">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="relative z-20 aspect-video w-full object-cover"
        />
        <AddToFavorites
          recipe={recipe}
          cssClass="absolute top-4 right-5 z-30 h-10 w-10 rounded-full bg-yellow-100 hover:bg-yellow-100 aria-pressed:bg-yellow-100 data-[state=on]:bg-yellow-200"
        />
      </div>
      <CardHeader>
        <CardAction>
          <DifficultyBadge difficulty={recipe.difficulty} cssClass="" />
        </CardAction>
        <CardTitle>
          <Link to={`recipe/${recipe.id}`}>{recipe.name}</Link>
        </CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{recipe.prepTime + recipe.cookTime}'</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-1">
            <Utensils className="size-4" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
