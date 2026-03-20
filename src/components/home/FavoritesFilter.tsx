import type { JSX } from "react"
import type { FilterValues } from "@/types"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type CuisineFilterProps = {
  favoritesOnly: boolean
  onChange: (filterName: keyof FilterValues, value: unknown) => void
}

export default function CuisineFilter({
  favoritesOnly,
  onChange,
}: CuisineFilterProps): JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="favorites-only"
        checked={favoritesOnly}
        onCheckedChange={(val) => onChange("favoritesOnly", val)}
      />
      <Label htmlFor="favorites-only">Show only favorites</Label>
    </div>
  )
}
