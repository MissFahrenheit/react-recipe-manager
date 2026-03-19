import type { JSX } from "react"
import type { FilterValues, DifficultyOption } from "@/types"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "../ui/label"

type DifficultyFilterProps = {
  difficulty: DifficultyOption
  onChange: (filterName: keyof FilterValues, value: unknown) => void
}

export default function DifficultyFilter({
  difficulty,
  onChange,
}: DifficultyFilterProps): JSX.Element {
  return (
    <div className="w-full pb-2">
      <Label className="mb-2">Difficulty</Label>
      <ToggleGroup
        type="single"
        defaultValue={difficulty}
        variant="outline"
        className="w-full"
        onValueChange={(val) => onChange("difficulty", val)}
      >
        <ToggleGroupItem value="Any" aria-label="Toggle Any" className="grow">
          Any
        </ToggleGroupItem>
        <ToggleGroupItem value="Easy" aria-label="Toggle Easy" className="grow">
          Easy
        </ToggleGroupItem>
        <ToggleGroupItem
          value="Medium"
          aria-label="Toggle Medium"
          className="grow"
        >
          Medium
        </ToggleGroupItem>

        <ToggleGroupItem value="Hard" aria-label="Toggle Hard" className="grow">
          Hard
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
