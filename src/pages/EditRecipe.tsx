import type { JSX } from "react"
import type { Recipe, Ingredient } from "@/types"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { RED_BUTTON_CSS_CLASSES } from "@/lib/helpers"
import { markPublicIdAsUsed } from "@/lib/imageUtils"
import { getRecipeById, storeUpdatedRecipe } from "@/data/recipeService"
import BasicInfoSection from "@/components/recipe-form/BasicInfoSection"
import ImageSection from "@/components/recipe-form/ImageSection"
import IngredientsSection from "@/components/recipe-form/IngredientsSection"
import InstructionsSection from "@/components/recipe-form/InstructionsSection"
import NotesSection from "@/components/recipe-form/NotesSection"
import TagsSection from "@/components/recipe-form/TagsSection"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function Recipe(): JSX.Element {
  const { recipeId } = useParams()
  const navigate = useNavigate()
  const DEFAULT_IMAGE = "/images/default_recipe_image_800.jpg"

  const recipe: Recipe | undefined = recipeId
    ? getRecipeById(recipeId)
    : undefined

  const [recipeForm, setRecipeForm] = useState<Partial<Recipe>>(recipe ?? {})
  const [recipeTags, setRecipeTags] = useState<string[]>(recipe?.tags ?? [])
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>(
    recipe?.ingredients ?? []
  )
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>(
    recipe?.instructions ?? []
  )
  const [instructionsError, setInstructionsError] = useState<boolean>(false)
  const [ingredientsError, setIngredientsError] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [imagePublicId, setImagePublicId] = useState<string>("")

  const isRecipeImageDefault = recipe?.image.includes(DEFAULT_IMAGE)
  const [imageUrl, setImageUrl] = useState<string>(
    recipe?.image && !isRecipeImageDefault ? recipe?.image : ""
  )

  const recipeExists: boolean = recipe !== undefined
  useEffect(() => {
    if (!recipeExists) {
      navigate("/404")
    }
  }, [recipeExists, navigate])
  // if (!recipe) return <Error404 /> @TODO add this to notes

  function handleUploadComplete(url: string, publicId: string): void {
    setImageUrl(url)
    setImagePublicId(publicId)
  }

  function handleIngredientsUpdate(ingredients: Ingredient[]): void {
    setIngredientsError(false)
    setRecipeIngredients(ingredients)
  }

  function handleInstructionsUpdate(steps: string[]): void {
    setRecipeInstructions(steps)
    setInstructionsError(false)
  }

  function updateRecipeForm(field: keyof Recipe, value: unknown): void {
    setRecipeForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateRecipe() {
    if (!recipeIngredients.length) {
      setIngredientsError(true)
      return
    }

    const filledInstructions = recipeInstructions.filter((s) => s.trim() !== "")
    if (!filledInstructions.length) {
      setInstructionsError(true)
      return
    }

    setIsSubmitting(true)
    try {
      const imageSrc = imageUrl || DEFAULT_IMAGE
      const updatedRecipe: Recipe = {
        id: recipeId,
        ...recipeForm,
        image: imageSrc,
        tags: recipeTags,
        instructions: filledInstructions,
        ingredients: recipeIngredients,
      } as Recipe

      storeUpdatedRecipe(recipeId ?? "", updatedRecipe)

      if (imagePublicId) {
        markPublicIdAsUsed(imagePublicId)
      }

      navigate(`/recipe/${recipeId}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <h2 className="mb-4 text-2xl font-semibold">Edit recipe</h2>

      <form
        className="white-form flex w-full max-w-lg flex-col gap-7"
        onSubmit={(e) => {
          e.preventDefault()
          updateRecipe()
        }}
      >
        <fieldset disabled={isSubmitting} className="contents">
          <BasicInfoSection
            recipeForm={recipeForm}
            onChange={updateRecipeForm}
          />

          <ImageSection
            recipeImage={imageUrl}
            onUploadComplete={handleUploadComplete}
          />

          <IngredientsSection
            recipeIngredients={recipeIngredients}
            ingredientsError={ingredientsError}
            onUpdateIngredients={handleIngredientsUpdate}
          />
          <div>
            <InstructionsSection
              recipeInstructions={recipeInstructions}
              instructionsError={instructionsError}
              onUpdateInstructions={handleInstructionsUpdate}
            />
            <NotesSection recipeForm={recipeForm} onChange={updateRecipeForm} />
          </div>

          <TagsSection recipeTags={recipeTags} onTagsUpdate={setRecipeTags} />

          <Button
            type="submit"
            size="lg"
            className={cn(
              "mx-auto mt-5 w-full md:w-1/2",
              RED_BUTTON_CSS_CLASSES
            )}
            disabled={isSubmitting}
          >
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Update recipe
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
