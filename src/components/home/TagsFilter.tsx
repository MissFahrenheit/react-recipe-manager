import type { JSX } from "react"
import { getAllUniqueTags } from "@/data/recipeService"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxInput,
} from "@/components/ui/combobox"
import type { FilterValues } from "@/types"
import { Label } from "../ui/label"

type TagsFilterProps = {
  selectedTags: string[]
  onChange: (filterName: keyof FilterValues, value: unknown) => void
}

export default function TagsFilter({
  selectedTags,
  onChange,
}: TagsFilterProps): JSX.Element {
  const tags: string[] = getAllUniqueTags()
  const anchor = useComboboxAnchor()

  return (
    <div>
      <Label className="mb-2">Tags</Label>
      <Combobox
        multiple
        autoHighlight
        items={tags}
        value={selectedTags}
        onValueChange={(val) => onChange("tags", val)}
      >
        <ComboboxInput
          className="[&_input]:text-sm"
          placeholder="Select tags"
          showClear
        />

        <ComboboxChips ref={anchor} className="mt-2 min-h-0 w-full border-0">
          <ComboboxValue>
            {(values: string[]) => (
              <>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(tag: string) => (
              <ComboboxItem key={tag} value={tag}>
                {tag}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
