import type { JSX } from "react"
import type {
  FilterValues,
  Recipe,
  SortableField,
  SortDirection,
} from "@/types"
import { useState } from "react"
import {
  filterRecipes,
  getRecipes,
  sortBy,
  searchRecipesByTitle,
} from "@/data/recipeService"
import { usePageTitle } from "@/lib/usePageTitle"
import SearchBar from "@/components/SearchBar"
import Filters from "@/components/home/Filters"
import SelectedFilters from "@/components/home/SelectedFilters"
import Sorting from "@/components/home/Sorting"
import RecipeCard from "@/components/RecipeCard"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
// import { resetRecipesToSeed } from "@/data/recipeService"

export default function Home(): JSX.Element {
  usePageTitle("Home")

  const allRecipes: Recipe[] = getRecipes()
  const allRecipesSortedByNewestFirst: Recipe[] = sortBy(
    allRecipes,
    "createdAt",
    "desc"
  )
  const [recipes, setRecipes] = useState<Recipe[]>(
    allRecipesSortedByNewestFirst
  )
  const [searchQuery, setSearchQuery] = useState<string>("")
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
    setRecipes(
      sortBy(
        searchRecipesByTitle(filterRecipes(updatedFilters), searchQuery),
        sortField,
        sortDirection
      )
    )
  }

  function resetFilters(): void {
    setFilterValues(defaultFilterValues)
    setRecipes(
      sortBy(
        searchRecipesByTitle(allRecipes, searchQuery),
        sortField,
        sortDirection
      )
    )
  }

  function removeFilter(field: keyof FilterValues): void {
    const defaultValue = defaultFilterValues[field]
    const updatedFilters: FilterValues = {
      ...filterValues,
      [field]: defaultValue,
    }
    setFilterValues(updatedFilters)
    setRecipes(
      sortBy(
        searchRecipesByTitle(filterRecipes(updatedFilters), searchQuery),
        sortField,
        sortDirection
      )
    )
  }

  function sortRecipes(field: SortableField, direction: SortDirection): void {
    setSortDirection(direction)
    setSortField(field)
    setRecipes(
      sortBy(
        searchRecipesByTitle(filterRecipes(filterValues), searchQuery),
        field,
        direction
      )
    )
  }

  function handleSearch(query: string): void {
    setSearchQuery(query)
    const filtered = filterRecipes(filterValues)
    const searched = searchRecipesByTitle(filtered, query)
    setRecipes(sortBy(searched, sortField, sortDirection))
  }

  return (
    <>
      <div className="my-3 px-5">
        {/*<Button variant="outline" onClick={() => resetRecipesToSeed()}>
          Reset recipes
        </Button>*/}
        <div className="mt-4 flex w-full flex-col justify-between gap-2 sm:flex-row sm:gap-4">
          <div className="w-full sm:w-1/2 lg:w-[calc(33.333%-.5rem)] 2xl:w-[calc(25%-.75rem)]">
            <SearchBar value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="flex w-full items-center justify-between gap-2 sm:w-1/2 sm:justify-end lg:w-1/3 2xl:w-1/4">
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
        </div>

        {filtersSelected && (
          <SelectedFilters
            filterValues={filterValues}
            defaultValues={defaultFilterValues}
            onFilterRemove={removeFilter}
          />
        )}

        {recipes.length === 0 &&
          (filtersSelected ? (
            <div
              role="status"
              className="flex h-30 flex-col items-center justify-center gap-3"
            >
              <span className="text-muted-foreground">
                No recipes found for the selected filters.
              </span>
              <Button
                variant="outline"
                onClick={resetFilters}
                aria-label="Clear all filters"
              >
                <Trash2 />
                Clear filters
              </Button>
            </div>
          ) : (
            <div
              role="status"
              className="flex h-30 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground"
            >
              <p className="">No recipes added yet.</p>
              <p>
                {" "}
                Click <span className="font-semibold">Add new</span> on the top
                right to begin.
              </p>
            </div>
          ))}

        <div
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          aria-label="Recipes"
        >
          {recipeCards}
        </div>
      </div>
    </>
  )
}
