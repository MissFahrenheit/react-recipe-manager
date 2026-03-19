import type { Recipe } from "@/types"
import type { JSX } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRecipeById } from "@/data/storeRecipes"
import { useIsMobile } from "@/lib/useIsMobile"
import { cn } from "@/lib/utils"
import BasicInfoSection from "@/components/recipe-page/BasicInfoSection"
import IngredientsSection from "@/components/recipe-page/IngredientsSection"
import InstructionsSection from "@/components/recipe-page/InstructionsSection"
import TagsSection from "@/components/recipe-page/TagsSection"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Pencil } from "lucide-react"
import AddToFavorites from "@/components/AddToFavorites"

export default function Recipe(): JSX.Element {
  const isMobile = useIsMobile()
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const difficultyColor = {
    Easy: "bg-green-200",
    Medium: "bg-orange-200",
    Hard: "bg-purple-300",
  }

  const recipe: Recipe | undefined = recipeId
    ? getRecipeById(recipeId)
    : undefined

  function handleEditClick() {
    navigate(`/recipe/${recipeId}/edit`)
  }

  function createdDateFormatted(date: Date): string {
    return new Date(date).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      {recipe ? (
        <article>
          {isMobile ? (
            <>
              <div className="relative">
                <img src={recipe.image} alt={recipe.name} />
                <AddToFavorites recipe={recipe} />
                <Badge
                  variant="secondary"
                  className={cn(
                    difficultyColor[recipe.difficulty],
                    "absolute bottom-4 left-5 p-3 text-sm"
                  )}
                >
                  {recipe.difficulty}
                </Badge>
              </div>
              <div className="flex flex-col gap-6 p-5">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h1 className="text-2xl font-semibold">{recipe.name}</h1>
                    <Button variant="outline" onClick={handleEditClick}>
                      <Pencil />
                      Edit
                    </Button>
                  </div>
                  <BasicInfoSection recipe={recipe} />
                </div>

                {recipe.ingredients && (
                  <IngredientsSection recipeIngredients={recipe.ingredients} />
                )}

                {recipe.instructions && (
                  <InstructionsSection
                    recipeInstructions={recipe.instructions}
                  />
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
                    Created on: {createdDateFormatted(recipe.createdAt)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <ResizablePanelGroup orientation="horizontal" className="">
              <ResizablePanel defaultSize="60%">
                <div className="p-6">
                  <h1 className="text-3xl font-semibold">{recipe.name}</h1>
                  <Button className="mt-2" onClick={handleEditClick}>
                    Edit recipe
                  </Button>
                  <BasicInfoSection recipe={recipe} />

                  {recipe.instructions && (
                    <InstructionsSection
                      recipeInstructions={recipe.instructions}
                    />
                  )}
                  <div>{/*<span>Created on: {createdAtEl()}</span>*/}</div>
                  {/*<div className="flex gap-1">{tagsEl()}</div>*/}
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize="40%">
                <div className="h-screen bg-zinc-50">
                  <img src={recipe.image} alt={recipe.name} />
                  <div className="p-6">
                    {recipe.ingredients && (
                      <IngredientsSection
                        recipeIngredients={recipe.ingredients}
                      />
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </article>
      ) : (
        <span>404</span>
        // @TODO: if no recipe with id, or no id, return 404 page
      )}
    </>
  )
}
