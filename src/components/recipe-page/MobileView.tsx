import type { Recipe } from "@/types"
import type { JSX } from "react"
import { formatDate } from "@/lib/helpers"
import Footer from "@/components/Footer"
import BasicInfoSection from "@/components/recipe-page/BasicInfoSection"
import IngredientsSection from "@/components/recipe-page/IngredientsSection"
import InstructionsSection from "@/components/recipe-page/InstructionsSection"
import TagsSection from "@/components/recipe-page/TagsSection"
import EditButton from "@/components/recipe-page/EditButton"
import AddToFavorites from "@/components/AddToFavorites"
import DifficultyBadge from "@/components/DifficultyBadge"
import { Separator } from "@/components/ui/separator"

type MobileViewProps = {
  recipe: Recipe
}

export default function MobileView({ recipe }: MobileViewProps): JSX.Element {
  return (
    <article>
      <div className="relative">
        <img src={recipe.image} alt={recipe.name} />
        <AddToFavorites
          recipe={recipe}
          cssClass="absolute top-4 right-5 z-30 h-10 w-10 rounded-full bg-yellow-100 hover:bg-yellow-100 aria-pressed:bg-yellow-100 data-[state=on]:bg-yellow-200"
        />
        <DifficultyBadge
          difficulty={recipe.difficulty}
          cssClass="absolute bottom-4 left-5 p-3 text-sm"
        />
      </div>
      <div className="flex flex-col gap-6 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-semibold">{recipe.name}</h1>
            <EditButton recipeId={recipe.id} />
          </div>
          <BasicInfoSection recipe={recipe} />
        </div>

        {recipe.ingredients && (
          <IngredientsSection recipeIngredients={recipe.ingredients} />
        )}

        {recipe.instructions && (
          <InstructionsSection recipeInstructions={recipe.instructions} />
        )}
        {recipe.notes && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">Notes</h2>
            <p>{recipe.notes}</p>
          </section>
        )}

        {recipe.tags && <TagsSection recipeTags={recipe.tags} />}

        <div>
          <Separator className="mb-2" />
          <span className="text-xs text-muted-foreground">
            Created on: {formatDate(recipe.createdAt)}
          </span>
        </div>
      </div>
      <Footer />
    </article>
  )
}
