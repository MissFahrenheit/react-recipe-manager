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
      <h3 className="mb-4 text-xl font-semibold md:mb-0">Tags</h3>

      <Combobox
        multiple
        autoHighlight
        items={tags}
        value={recipeTags}
        onValueChange={onTagsUpdate}
      >
        <div className="mb-2 flex flex-col gap-3 sm:flex-row">
          <Field className="w-full sm:w-1/2">
            <FieldLabel className="h-auto sm:h-5"></FieldLabel>
            <ComboboxInput placeholder="Select recipe tags" showClear />
          </Field>

          <Field className="w-full sm:w-1/2">
            <FieldLabel className="h-5" htmlFor="tag">
              Or, add new tag
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                name="tag"
                id="tag"
                type="text"
                placeholder="My tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                autoComplete="off"
                aria-autocomplete="none"
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
        </div>

        <ComboboxChips
          ref={anchor}
          className="min-h-0 w-full border-none shadow-none dark:bg-transparent"
        >
          <ComboboxValue>
            {(values: string[]) => (
              <>
                {values.map((value: string) => (
                  <ComboboxChip
                    className="rounded-full border bg-white dark:bg-white/20"
                    key={value}
                  >
                    {value}
                  </ComboboxChip>
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
