import type { JSX } from "react"
import type { FilterValues } from "@/types"
import { Button } from "../ui/button"
import { X } from "lucide-react"

type SelectedFiltersProps = {
  filterValues: FilterValues
  defaultValues: FilterValues
  onFilterRemove: (field: keyof FilterValues) => void
}
export default function SelectedFilters({
  filterValues,
  defaultValues,
  onFilterRemove,
}: SelectedFiltersProps): JSX.Element {
  function filterValuesLabel(
    field: keyof FilterValues,
    value: unknown
  ): string {
    switch (field) {
      case "maxPrepTime":
        return `Prep up to ${value}'`
      case "maxCookTime":
        return `Cook up to ${value}'`
      case "difficulty":
        return `${value} difficulty`
      case "cuisine":
        return value as string
      case "tags":
        return `Tags: ${(value as string[]).join(", ")}`
      case "favoritesOnly":
        return "Only favorites"
    }
  }

  function filterBadge(
    field: keyof FilterValues,
    value: unknown,
    defaultValues: FilterValues
  ): JSX.Element | null {
    if (value === defaultValues[field]) return null
    if (Array.isArray(value) && value.length === 0) {
      return null
    }

    return (
      <Button
        variant="outline"
        className="h-auto rounded-2xl py-1 pl-3 text-xs"
        aria-label={`Remove filter: ${filterValuesLabel(field, value)}`}
        onClick={() => onFilterRemove(field)}
      >
        {filterValuesLabel(field, value)}
        <X className="size-3" aria-hidden="true" />
      </Button>
    )
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {Object.entries(filterValues).map(([field, value]) =>
        filterBadge(field as keyof FilterValues, value, defaultValues)
      )}
    </div>
  )
}
