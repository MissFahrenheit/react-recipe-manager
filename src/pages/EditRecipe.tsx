import type { JSX } from "react"
import type { Recipe, Ingredient } from "@/types"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRecipeById, storeUpdatedRecipe } from "@/data/storeRecipes"
import BasicInfoSection from "@/components/recipe-form/BasicInfoSection"
import ImageSection from "@/components/recipe-form/ImageSection"
import IngredientsSection from "@/components/recipe-form/IngredientsSection"
import InstructionsSection from "@/components/recipe-form/InstructionsSection"
import NotesSection from "@/components/recipe-form/NotesSection"
import TagsSection from "@/components/recipe-form/TagsSection"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"

export default function Recipe(): JSX.Element {
  const { recipeId } = useParams()
  const navigate = useNavigate()

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
  const [imageFile, setImageFile] = useState<File | null>(null)
  // @TODO: add image update functionality
  // perhaps change createForm to upload files before form submission
  // and use the same component

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const recipeExists: boolean = recipe !== undefined
  useEffect(() => {
    if (!recipeExists) {
      navigate("/404")
    }
  }, [recipeExists, navigate])
  // if (!recipe) return <Error404 /> @TODO add this to notes

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
      console.log({ imageFile })
      const updatedRecipe: Recipe = {
        id: recipeId,
        ...recipeForm,
        tags: recipeTags,
        instructions: filledInstructions,
        ingredients: recipeIngredients,
      } as Recipe

      storeUpdatedRecipe(recipeId ?? "", updatedRecipe)

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

          <Separator />
          <ImageSection onImageChange={setImageFile} />
          <Separator />

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
            className="mx-auto mt-5 w-full rounded-full bg-red-600 hover:bg-red-500 md:w-1/2"
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
