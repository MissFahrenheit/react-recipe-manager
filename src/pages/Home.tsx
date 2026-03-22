import type { JSX } from "react"
import type {
  FilterValues,
  Recipe,
  SortableField,
  SortDirection,
} from "@/types"
import { useState } from "react"
import { filterRecipes, getRecipes, sortBy } from "@/data/recipeService"
import Filters from "@/components/home/Filters"
import SelectedFilters from "@/components/home/SelectedFilters"
import Sorting from "@/components/home/Sorting"
import RecipeCard from "@/components/RecipeCard"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
// import { resetRecipesToSeed } from "@/data/recipeService"

export default function Home(): JSX.Element {
  const allRecipes: Recipe[] = getRecipes()
  const allRecipesSortedByNewestFirst: Recipe[] = sortBy(
    allRecipes,
    "createdAt",
    "desc"
  )
  const [recipes, setRecipes] = useState<Recipe[]>(
    allRecipesSortedByNewestFirst
  )
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [sortField, setSortField] = useState<SortableField>("createdAt")

  const defaultFilterValues: FilterValues = {
    maxPrepTime: null,
    maxCookTime: null,
    difficulty: "Any",
    cuisine: "",
    tags: [],
    favoritesOnly: false,
  }
  const [filterValues, setFilterValues] =
    useState<FilterValues>(defaultFilterValues)
  const filtersSelected: boolean =
    JSON.stringify(filterValues) !== JSON.stringify(defaultFilterValues)

  const recipeCards: JSX.Element[] = recipes.map((r: Recipe) => {
    return <RecipeCard key={r.id} recipe={r}></RecipeCard>
  })

  function updateFilters(filterName: keyof FilterValues, value: unknown): void {
    const isTimeFilter =
      filterName === "maxPrepTime" || filterName === "maxCookTime"
    const processedValue: unknown = isTimeFilter
      ? (value as number[])[0]
      : value
    const updatedFilters: FilterValues = {
      ...filterValues,
      [filterName]: processedValue,
    }
    setFilterValues(updatedFilters)
    setRecipes(sortBy(filterRecipes(updatedFilters), sortField, sortDirection))
  }

  function resetFilters(): void {
    setFilterValues(defaultFilterValues)
    setRecipes(sortBy(allRecipes, sortField, sortDirection))
  }

  function removeFilter(field: keyof FilterValues): void {
    const defaultValue = defaultFilterValues[field]
    const updatedFilters: FilterValues = {
      ...filterValues,
      [field]: defaultValue,
    }
    setFilterValues(updatedFilters)
    setRecipes(sortBy(filterRecipes(updatedFilters), sortField, sortDirection))
  }

  function sortRecipes(field: SortableField, direction: SortDirection): void {
    setRecipes(sortBy(recipes, field, direction))
    setSortDirection(direction)
    setSortField(field)
  }

  return (
    <>
      <div className="my-3 px-5">
        {/*<Button variant="outline" onClick={() => resetRecipesToSeed()}>
          Reset recipes
        </Button>*/}
        <div className="flex w-full justify-between gap-3">
          <Filters
            filterValues={filterValues}
            onFilterChange={updateFilters}
            defaultFilterValues={defaultFilterValues}
            onClearFilters={resetFilters}
          />
          <Sorting
            direction={sortDirection}
            field={sortField}
            onChange={sortRecipes}
          />
        </div>
        {/*@TODO: note down why selected Sheet instead of Drawer, even through drawer closes more easily on mobiles
      reminder: it was because slider was not working well, it would move the drawer too*/}
        {filtersSelected && (
          <SelectedFilters
            filterValues={filterValues}
            defaultValues={defaultFilterValues}
            onFilterRemove={removeFilter}
          />
        )}
        {filtersSelected && recipes.length === 0 && (
          <div className="flex h-30 flex-col items-center justify-center gap-3">
            <span className="text-muted-foreground">
              No recipes found for the selected filters.
            </span>
            <Button variant="outline" onClick={resetFilters}>
              <Trash2 />
              Clear filters
            </Button>
          </div>
        )}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {recipeCards}
        </div>
      </div>
      {/*<div className="font-mono text-xs text-muted-foreground">
        (Press <kbd>d</kbd> to toggle dark mode)
      </div>*/}
    </>
  )
}
