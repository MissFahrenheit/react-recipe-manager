import type { JSX } from "react"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

type EmptyRecipesProps = {
  filtersSelected: boolean
  searchQuery: string
  onClearFilters: () => void
}

export default function EmptyRecipes({
  filtersSelected,
  searchQuery,
  onClearFilters,
}: EmptyRecipesProps): JSX.Element {
  if (searchQuery) {
    return (
      <div
        role="status"
        className="flex h-30 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground"
      >
        <p className="">
          {" "}
          No recipes found for "
          <span className="font-semibold">{searchQuery}</span>".
        </p>
      </div>
    )
  }

  if (filtersSelected) {
    return (
      <div
        role="status"
        className="flex h-30 flex-col items-center justify-center gap-3"
      >
        <span className="text-muted-foreground">
          No recipes found for the selected filters.
        </span>
        <Button
          variant="outline"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          <Trash2 />
          Clear filters
        </Button>
      </div>
    )
  }

  return (
    <div
      role="status"
      className="flex h-30 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground"
    >
      <p className="">No recipes added yet.</p>
      <p>
        {" "}
        Click <span className="font-semibold">Add new</span> on the top right to
        begin.
      </p>
    </div>
  )
}
