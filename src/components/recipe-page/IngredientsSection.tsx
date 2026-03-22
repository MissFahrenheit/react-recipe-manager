import type { Ingredient } from "@/types"
import type { JSX } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import IngredientsList from "./IngredientsList"

type IngredientsSectionProps = {
  recipeIngredients: Ingredient[]
}

export default function IngredientsSection({
  recipeIngredients,
}: IngredientsSectionProps): JSX.Element {
  const [ingredientsOpen, setIngredientsOpen] = useState<boolean>(true)

  return (
    <Collapsible
      open={ingredientsOpen}
      onOpenChange={setIngredientsOpen}
      className="flex flex-col gap-3 bg-neutral-100 pt-2 pr-3 pb-4 pl-5 dark:bg-neutral-600"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle ingredients</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-3 flex flex-col gap-3 pr-2 text-sm">
        <IngredientsList recipeIngredients={recipeIngredients} />
      </CollapsibleContent>
    </Collapsible>
  )
}
