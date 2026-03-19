import type { FilterValues } from "@/types"
import type { JSX } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { getMaxTime } from "@/data/storeRecipes"

type TimeFilterProps = {
  type: "prepTime" | "cookTime"
  maxSelectedTime: number | null
  onChange: (filterName: keyof FilterValues, value: unknown) => void
}

export default function TimeFilter({
  type,
  maxSelectedTime,
  onChange,
}: TimeFilterProps): JSX.Element {
  const maxTimeOption: number = getMaxTime(type)
  const labelName: string = `Max ${type === "prepTime" ? "prep" : "cook"} time`
  const filterName: keyof FilterValues =
    type === "prepTime" ? "maxPrepTime" : "maxCookTime"
  const value: number = maxSelectedTime ? maxSelectedTime : maxTimeOption
  return (
    <div className="pb-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Label htmlFor="slider-time">{labelName}</Label>
        <span className="text-sm text-muted-foreground">{value + " min"}</span>
      </div>
      <Slider
        id="slider-time"
        defaultValue={[maxTimeOption]}
        max={maxTimeOption}
        step={5}
        className="w-full"
        value={[value]}
        onValueChange={(val) => onChange(filterName, val)}
      />
    </div>
  )
}
