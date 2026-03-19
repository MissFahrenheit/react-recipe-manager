import type { JSX } from "react"
import { useState } from "react"
import { getAllUniqueTags } from "@/data/storeRecipes"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
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
import { Plus } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
type TagsSectionProps = {
  recipeTags: string[]
  onTagsUpdate: (tags: string[]) => void
}

export default function TagsSection({
  recipeTags,
  onTagsUpdate,
}: TagsSectionProps): JSX.Element {
  const [newTag, setNewTag] = useState<string>("")
  const tags: string[] = getAllUniqueTags()
  const anchor = useComboboxAnchor()

  function addNewTag(): void {
    if (!newTag.trim()) {
      return
    }
    onTagsUpdate([...recipeTags, newTag.trim()])
    setNewTag("")
  }

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      e.preventDefault()
      addNewTag()
    }
  }

  return (
    <section>
      <h3 className="mb-4 text-xl font-semibold">Tags</h3>

      <Combobox
        multiple
        autoHighlight
        items={tags}
        value={recipeTags}
        onValueChange={onTagsUpdate}
      >
        <ComboboxInput placeholder="Select recipe tags" showClear />

        <Field className="mt-5 mb-3">
          <FieldLabel htmlFor="tag">Or, add new tag</FieldLabel>
          <InputGroup>
            <InputGroupInput
              name="tag"
              id="tag"
              type="text"
              placeholder="My tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                onClick={addNewTag}
                size="icon-xs"
                className="ml-auto"
              >
                <Plus />
                <span className="sr-only">Add</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <ComboboxChips
          ref={anchor}
          className="min-h-0 w-full border-none shadow-none"
        >
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
    </section>
  )
}
