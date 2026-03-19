import type { JSX } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import uploadFile from "@/lib/uploadFile"
import type { Recipe, Ingredient } from "@/types"
import { v4 as uuidv4 } from "uuid"
import { addRecipe } from "@/data/storeRecipes"
import IngredientsSection from "@/components/recipe-form/IngredientsSection"
import BasicInfoSection from "@/components/recipe-form/BasicInfoSection"
import ImageSection from "@/components/recipe-form/ImageSection"
import NotesSection from "@/components/recipe-form/NotesSection"
import TagsSection from "@/components/recipe-form/TagsSection"
import InstructionsSection from "@/components/recipe-form/InstructionsSection"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Recipe(): JSX.Element {
  const [recipeTags, setRecipeTags] = useState<string[]>([])
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([])
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>([""])
  const [imageFile, setImageFile] = useState<File | null>(null)

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

  const navigate = useNavigate()
  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1604634077373-a279cadc62c5"

  function updateRecipeForm(field: keyof Recipe, value: unknown): void {
    setRecipeForm((prev) => ({ ...prev, [field]: value }))
  }

  async function createRecipe(): Promise<void> {
    const imageSrc = imageFile ? await uploadFile(imageFile) : DEFAULT_IMAGE
    const newRecipeId = uuidv4()

    if (!recipeIngredients.length) {
      setIngredientsError(true)
      return
    }

    const filledInstructions = recipeInstructions.filter((s) => s.trim() !== "")
    if (!filledInstructions.length) {
      setInstructionsError(true)
      return
    }

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
    navigate(`/recipe/${newRecipeId}`)
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
    <div className="p-5">
      <h2 className="mb-4 text-2xl font-semibold">Add a new recipe</h2>

      <form
        className="white-form flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          createRecipe()
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
          Create recipe
        </Button>
      </form>
    </div>
  )
}
