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
import DeleteButton from "@/components/recipe-page/DeleteButton"
import IngredientsList from "@/components/recipe-page/IngredientsList"
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
    <article className="overflow-scroll">
      <ResizablePanelGroup
        orientation="horizontal"
        className="max-h-[calc(100svh-var(--header-height))] min-h-[calc(100svh-var(--header-height))]"
      >
        <ResizablePanel defaultSize="63%">
          <div className="grid h-full grid-rows-[1fr_auto]">
            <div className="flex flex-col gap-7 p-6">
              <div>
                <DifficultyBadge
                  difficulty={recipe.difficulty}
                  cssClass="mb-3"
                />

                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-2xl font-semibold">{recipe.name}</h1>
                  <div className="flex items-center gap-3">
                    <DeleteButton recipeId={recipe.id} showLabel={true} />
                    <EditButton recipeId={recipe.id} />
                    <AddToFavorites
                      recipe={recipe}
                      cssClass="bg-white hover:!bg-muted data-[state=on]:bg-white data-[state=off]:bg-white aria-pressed:bg-white h-8"
                    />
                  </div>
                </div>
                <BasicInfoSection recipe={recipe} />
              </div>

              {recipe.instructions && (
                <InstructionsSection
                  recipeDifficulty={recipe.difficulty}
                  recipeInstructions={recipe.instructions}
                />
              )}

              {recipe.notes && (
                <section className="mt-3">
                  <h2 className="mb-2 text-xl font-semibold">Notes</h2>
                  <p>{recipe.notes}</p>
                </section>
              )}

              {recipe.tags && <TagsSection recipeTags={recipe.tags} />}

              <div>
                <span className="text-xs text-muted-foreground">
                  Created on: {formatDate(recipe.createdAt)}
                </span>
              </div>
            </div>
            <Footer textAlign="left" />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="37%">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="aspect-video w-full object-cover"
          />
          <div className="p-6">
            {recipe.ingredients && (
              <>
                <h2 className="mb-5 text-xl font-semibold">Ingredients</h2>
                <div className="flex flex-col gap-3 pr-2 md:gap-5">
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
