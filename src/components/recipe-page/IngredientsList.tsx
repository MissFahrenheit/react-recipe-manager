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
        <div role="listitem" key={`ingredient-${idx}`}>
          <Field
            orientation="horizontal"
            className="group has-data-checked:text-gray-400 has-data-checked:line-through has-data-checked:dark:text-white/20"
          >
            <Checkbox
              id={`ingredient-${idx}`}
              className="data-checked:border-gray-300 data-checked:bg-transparent data-checked:text-neutral-400 dark:data-checked:border-neutral-700 dark:data-checked:bg-transparent"
            />
            <Label htmlFor={`ingredient-${idx}`}>
              <span className="font-semibold">{ingredient.item}:</span>
              <span className="font-normal">
                {ingredient.quantity} {ingredient?.unit}
              </span>
              {ingredient.note && (
                <span className="font-normal text-muted-foreground group-has-data-checked:text-gray-400 group-has-data-checked:dark:text-white/20">
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
