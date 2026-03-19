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
    console.log({ imageFile })
    const updatedRecipe: Recipe = {
      id: recipeId,
      ...recipeForm,
      tags: recipeTags,
      instructions: recipeInstructions,
      ingredients: recipeIngredients,
    } as Recipe

    storeUpdatedRecipe(recipeId ?? "", updatedRecipe)

    navigate(`/recipe/${recipeId}`)
  }

  return (
    <div className="p-5">
      <h2 className="mb-4 text-2xl font-semibold">Edit recipe</h2>

      <form
        className="white-form flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          updateRecipe()
        }}
      >
        <BasicInfoSection recipeForm={recipeForm} onChange={updateRecipeForm} />

        <Separator />
        <ImageSection onImageChange={setImageFile} />
        <Separator />

        <IngredientsSection
          recipeIngredients={recipeIngredients}
          ingredientsError={ingredientsError}
          onUpdateIngredients={handleIngredientsUpdate}
        />
        <Separator />
        <InstructionsSection
          recipeInstructions={recipeInstructions}
          instructionsError={instructionsError}
          onUpdateInstructions={handleInstructionsUpdate}
        />

        <NotesSection recipeForm={recipeForm} onChange={updateRecipeForm} />

        <Separator />
        <TagsSection recipeTags={recipeTags} onTagsUpdate={setRecipeTags} />

        <Button type="submit" size="lg" className="">
          Update recipe
        </Button>
      </form>
    </div>
  )
}
