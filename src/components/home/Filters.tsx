import type { FilterValues } from "@/types"
import type { JSX } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetClose,
  // SheetFooter,
} from "@/components/ui/sheet"
import TimeFilter from "./TimeFilter"
import DifficultyFilter from "./DifficultyFilter"
import CuisineFilter from "./CuisineFilter"
import TagsFilter from "./TagsFilter"
import FavoritesFilter from "./FavoritesFilter"
import { Trash2, Funnel } from "lucide-react"

type FiltersProps = {
  filterValues: FilterValues
  defaultFilterValues: FilterValues
  onFilterChange: (filterName: keyof FilterValues, value: unknown) => void
  onClearFilters: () => void
}

export default function Filters({
  filterValues,
  defaultFilterValues,
  onFilterChange,
  onClearFilters,
}: FiltersProps): JSX.Element {
  const filtersSelected: boolean =
    JSON.stringify(filterValues) !== JSON.stringify(defaultFilterValues)
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Funnel />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Funnel className="size-4" /> Filter your recipes
          </SheetTitle>
          <SheetDescription>
            Select values to narrow down your results
          </SheetDescription>
        </SheetHeader>

        <div className="no-scrollbar overflow-y-auto px-4">
          <div className="mb-7 flex flex-col gap-7">
            <DifficultyFilter
              difficulty={filterValues.difficulty}
              onChange={onFilterChange}
            />

            <TimeFilter
              type="prepTime"
              maxSelectedTime={filterValues.maxPrepTime}
              onChange={onFilterChange}
            />

            <TimeFilter
              type="cookTime"
              maxSelectedTime={filterValues.maxCookTime}
              onChange={onFilterChange}
            />

            <CuisineFilter
              cuisine={filterValues.cuisine}
              onChange={onFilterChange}
            />

            <TagsFilter
              selectedTags={filterValues.tags}
              onChange={onFilterChange}
            />

            <FavoritesFilter
              favoritesOnly={filterValues.favoritesOnly}
              onChange={onFilterChange}
            />
          </div>

          {filtersSelected && (
            <Button variant="outline" onClick={onClearFilters}>
              {/*<Trash2 className="stroke-red-600" />*/}
              <Trash2 />
              Clear filters
            </Button>
          )}
        </div>

        {/*<SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>*/}
      </SheetContent>
    </Sheet>
  )
}
