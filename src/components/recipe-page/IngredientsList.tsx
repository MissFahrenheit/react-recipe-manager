import type { Ingredient } from "@/types"
import type { JSX } from "react"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

type IngredientsListProps = {
  recipeIngredients: Ingredient[]
}

export default function IngredientsList({
  recipeIngredients,
}: IngredientsListProps): JSX.Element {
  return (
    <>
      {recipeIngredients.map((ingredient: Ingredient, idx: number) => (
        <div key={`ingredient-${idx}`}>
          <Field
            orientation="horizontal"
            className="has-data-checked:line-through"
          >
            <Checkbox id={`ingredient-${idx}`} />
            <Label htmlFor={`ingredient-${idx}`}>
              <span className="font-semibold">{ingredient.item}:</span>
              <span className="font-normal">
                {ingredient.quantity} {ingredient?.unit}
              </span>
              {ingredient.note && (
                <span className="font-normal text-muted-foreground">
                  ({ingredient.note})
                </span>
              )}
            </Label>
          </Field>
          {idx < recipeIngredients.length - 1 && <Separator className="mt-3" />}
        </div>
      ))}
    </>
  )
}
