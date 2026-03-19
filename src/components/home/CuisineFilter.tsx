import type { JSX } from "react"
import type { FilterValues } from "@/types"
import { getAllCuisines } from "@/data/storeRecipes"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"

type CuisineFilterProps = {
  cuisine: string
  onChange: (filterName: keyof FilterValues, value: unknown) => void
}

export default function CuisineFilter({
  cuisine,
  onChange,
}: CuisineFilterProps): JSX.Element {
  const cuisineOptions = getAllCuisines()
  return (
    <div className="w-full pb-2">
      <Label className="mb-2">Cuisine</Label>
      <Select
        defaultValue=""
        value={cuisine}
        onValueChange={(val) => onChange("cuisine", val)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectGroup>
            {cuisineOptions.map((option) => (
              <SelectItem key={`cuisine-${option}`} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
