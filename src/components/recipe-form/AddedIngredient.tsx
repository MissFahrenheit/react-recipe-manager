import type { JSX } from "react"
import type { Ingredient } from "@/types"
import { Item, ItemContent, ItemTitle, ItemActions } from "../ui/item"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"

type AddedIngredientProps = {
  ingredient: Ingredient
  index: number
  removeIngredient: (index: number) => void
}

export default function AddedIngredient({
  ingredient,
  index,
  removeIngredient,
}: AddedIngredientProps): JSX.Element {
  return (
    <Item
      variant="outline"
      className="rounded-full border-yellow-300/50 bg-yellow-50 py-1 dark:border-yellow-300/40 dark:bg-yellow-300/20"
    >
      <ItemContent>
        <ItemTitle className="gap-1">
          <span className="font-semibold">{ingredient.item}:</span>
          <span className="font-normal">
            {ingredient.quantity} {ingredient?.unit}
          </span>
          {ingredient.note && (
            <span className="font-normal text-muted-foreground">
              ({ingredient.note})
            </span>
          )}
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="icon-sm"
          variant="outline"
          className="group rounded-full"
          aria-label="Remove ingredient"
          type="button"
          onClick={() => removeIngredient(index)}
        >
          <Trash2 className="group-hover:stroke-red-600" />
        </Button>
      </ItemActions>
    </Item>
  )
}
