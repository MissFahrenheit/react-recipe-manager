import type { JSX } from "react"
import type { Recipe, Ingredient } from "@/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { cn } from "@/lib/utils"
import { RED_BUTTON_CSS_CLASSES } from "@/lib/helpers"
import { markPublicIdAsUsed } from "@/lib/imageUtils"
import { addRecipe } from "@/data/storeRecipes"
import BasicInfoSection from "@/components/recipe-form/BasicInfoSection"
import ImageSection from "@/components/recipe-form/ImageSection"
import IngredientsSection from "@/components/recipe-form/IngredientsSection"
import InstructionsSection from "@/components/recipe-form/InstructionsSection"
import NotesSection from "@/components/recipe-form/NotesSection"
import TagsSection from "@/components/recipe-form/TagsSection"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function Recipe(): JSX.Element {
  const navigate = useNavigate()
  const DEFAULT_IMAGE = "/images/default_recipe_image_800.jpg"

  const [recipeTags, setRecipeTags] = useState<string[]>([])
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([])
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>([""])
  const [recipeForm, setRecipeForm] = useState<Partial<Recipe>>({
    name: "",
    cuisine: "",
    description: "",
    difficulty: "Easy",
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    notes: "",
  })
  const [instructionsError, setInstructionsError] = useState<boolean>(false)
  const [ingredientsError, setIngredientsError] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [imagePublicId, setImagePublicId] = useState<string>("")

  function handleUploadComplete(url: string, publicId: string): void {
    setImageUrl(url)
    setImagePublicId(publicId)
  }

  function updateRecipeForm(field: keyof Recipe, value: unknown): void {
    setRecipeForm((prev) => ({ ...prev, [field]: value }))
  }

  function createRecipe(): void {
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
      const newRecipeId = uuidv4()
      const recipe = {
        id: newRecipeId,
        ...recipeForm,
        image: imageSrc,
        tags: recipeTags,
        ingredients: recipeIngredients,
        instructions: filledInstructions,
        isFavorite: false,
        createdAt: new Date(),
      } as Recipe

      addRecipe(recipe)

      if (imagePublicId) {
        markPublicIdAsUsed(imagePublicId)
      }

      navigate(`/recipe/${newRecipeId}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleIngredientsUpdate(ingredients: Ingredient[]): void {
    setIngredientsError(false)
    setRecipeIngredients(ingredients)
  }

  function handleInstructionsUpdate(steps: string[]): void {
    setRecipeInstructions(steps)
    setInstructionsError(false)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-5">
        <h2 className="text-2xl font-semibold">Add a new recipe</h2>

        <form
          className="white-form flex w-full max-w-lg flex-col gap-7"
          onSubmit={(e) => {
            e.preventDefault()
            createRecipe()
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

              <NotesSection
                recipeForm={recipeForm}
                onChange={updateRecipeForm}
              />
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
              Create recipe
            </Button>
          </fieldset>
        </form>
      </div>
      <Footer />
    </>
  )
}
