import type { Recipe } from "@/types"
import type { JSX } from "react"
import { formatDate } from "@/lib/helpers"
import Footer from "@/components/Footer"
import AddToFavorites from "@/components/AddToFavorites"
import DifficultyBadge from "@/components/DifficultyBadge"
import BasicInfoSection from "@/components/recipe-page/BasicInfoSection"
import InstructionsSection from "@/components/recipe-page/InstructionsSection"
import TagsSection from "@/components/recipe-page/TagsSection"
import EditButton from "@/components/recipe-page/EditButton"
import IngredientsList from "@/components/recipe-page/IngredientsList"
import { Separator } from "@/components/ui/separator"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

type DesktopViewProps = {
  recipe: Recipe
}

export default function DesktopView({ recipe }: DesktopViewProps): JSX.Element {
  return (
    <article className="max-h-[calc(100svh-var(--header-height))] overflow-scroll">
      <ResizablePanelGroup
        orientation="horizontal"
        className="max-h-[calc(100svh-var(--header-height))]"
      >
        <ResizablePanel defaultSize="63%">
          <div className="flex flex-col gap-7 p-6">
            <div>
              <DifficultyBadge difficulty={recipe.difficulty} cssClass="mb-3" />

              <div className="flex items-start justify-between gap-3">
                <h1 className="text-2xl font-semibold">{recipe.name}</h1>
                <div className="flex items-center gap-3">
                  <AddToFavorites
                    recipe={recipe}
                    cssClass="bg-white hover:!bg-muted data-[state=on]:bg-white data-[state=off]:bg-white aria-pressed:bg-white h-8"
                  />
                  <EditButton recipeId={recipe.id} />
                </div>
              </div>
              <BasicInfoSection recipe={recipe} />
            </div>

            {recipe.instructions && (
              <InstructionsSection recipeInstructions={recipe.instructions} />
            )}

            {recipe.tags && (
              <div className="pt-6">
                <TagsSection recipeTags={recipe.tags} />
              </div>
            )}

            <div>
              <Separator className="mb-2" />
              <span className="text-xs text-muted-foreground">
                Created on: {formatDate(recipe.createdAt)}
              </span>
            </div>
          </div>
          <Footer />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="37%">
          <img src={recipe.image} alt={recipe.name} />
          <div className="p-6">
            {recipe.ingredients && (
              <>
                <h2 className="mb-5 text-xl font-semibold">Ingredients</h2>
                <div className="flex flex-col gap-3 pr-2">
                  <IngredientsList recipeIngredients={recipe.ingredients} />
                </div>
              </>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </article>
  )
}
