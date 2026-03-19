import type { JSX } from "react"
import type { Recipe } from "@/types"
import { Badge } from "@/components/ui/badge"
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

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  const difficultyColor = {
    Easy: "bg-green-200",
    Medium: "bg-orange-200",
    Hard: "bg-purple-300",
  }

  return (
    <Card className="mx-auto w-full pt-0">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="relative z-20 aspect-video w-full object-cover"
        />
        <AddToFavorites recipe={recipe} />
      </div>
      <CardHeader>
        <CardAction>
          <Badge
            variant="secondary"
            className={difficultyColor[recipe.difficulty]}
          >
            {recipe.difficulty}
          </Badge>
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
