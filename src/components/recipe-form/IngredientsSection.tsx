import type { JSX } from "react"
import { useEffect, useState } from "react"
import type { Ingredient } from "@/types"
import NewIngredient from "@/components/recipe-form/NewIngredient"
import { FieldError } from "@/components/ui/field"
import AddedIngredient from "./AddedIngredient"

type IngredientsSectionProps = {
  recipeIngredients: Ingredient[]
  ingredientsError: boolean
  onUpdateIngredients: (ingredients: Ingredient[]) => void
}

type extIngredient = {
  idIngredient: string
  strIngredient: string
  strDescription: string
  strThumb: string
  strType: string | null
}

export default function IngredientsSection({
  recipeIngredients,
  ingredientsError,
  onUpdateIngredients,
}: IngredientsSectionProps): JSX.Element {
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [ingredientFormKey, setIngredientFormKey] = useState(0)

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((data) => {
        const meals = data.meals
        const list: string[] = meals.reduce(
          (acc: string[], cur: extIngredient) => {
            const ingr: string = cur.strIngredient
            acc.push(ingr)
            return acc
          },
          []
        )
        setIngredientList(list)
      })
  }, [])

  function handleRemoveIngredient(index: number): void {
    const updatedIngredients: Ingredient[] = recipeIngredients.filter(
      (_, idx) => {
        return idx !== index
      }
    )
    onUpdateIngredients(updatedIngredients)
  }

  function handleAddIngredient(ingredient: Ingredient): void {
    const updatedIngredients: Ingredient[] = [...recipeIngredients, ingredient]
    onUpdateIngredients(updatedIngredients)
    setIngredientFormKey((prev) => prev + 1)
  }

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Ingredients</h3>

      {recipeIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2" role="list">
          {recipeIngredients.map((ingredient: Ingredient, idx: number) => (
            <AddedIngredient
              key={idx}
              ingredient={ingredient}
              index={idx}
              removeIngredient={handleRemoveIngredient}
            />
          ))}
        </div>
      )}
      <NewIngredient
        key={ingredientFormKey}
        addIngredient={handleAddIngredient}
        ingredientList={ingredientList}
      />

      {ingredientsError && (
        <FieldError role="alert">Please add at least 1 ingredient</FieldError>
      )}
    </section>
  )
}
