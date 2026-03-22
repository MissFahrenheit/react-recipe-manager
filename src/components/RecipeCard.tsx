import type { JSX } from "react"
import { useState } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Utensils } from "lucide-react"
import AddToFavorites from "./AddToFavorites"
import DifficultyBadge from "./DifficultyBadge"

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [blurLoaded, setBlurLoaded] = useState(false)
  const blurUrl = recipe.image.replace("/upload/", "/upload/w_50,e_blur:1000/")

  return (
    <Card className="w-full max-w-120 pt-0">
      <div className="relative">
        <Link
          to={`recipe/${recipe.id}`}
          className="relative block aspect-video w-full"
        >
          <img
            src={recipe.image}
            alt={recipe.name}
            onLoad={() => setImageLoaded(true)}
            className="relative z-20 aspect-video w-full object-cover"
          />
          {!imageLoaded && (
            <img
              src={blurUrl}
              alt={recipe.name}
              onLoad={() => setBlurLoaded(true)}
              className="absolute top-0 z-30 aspect-video w-full object-cover"
            />
          )}
          {!blurLoaded && (
            <Skeleton className="absolute top-0 z-30 aspect-video w-full" />
          )}
        </Link>
        <AddToFavorites
          recipe={recipe}
          cssClass="absolute top-4 right-5 z-40 h-10 w-10 rounded-full bg-white hover:bg-white aria-pressed:bg-white data-[state=on]:bg-white border-0 shadow-md hover:scale-110 transition-transform"
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
