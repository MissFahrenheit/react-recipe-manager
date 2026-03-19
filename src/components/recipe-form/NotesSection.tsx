import type { JSX } from "react"
import { Textarea } from "@/components/ui/textarea"
import type { Recipe } from "@/types"

import { Field, FieldLabel } from "@/components/ui/field"

type NotesSectionProps = {
  recipeForm: Partial<Recipe>
  onChange: (field: keyof Recipe, value: unknown) => void
}

export default function NotesSection({
  recipeForm,
  onChange,
}: NotesSectionProps): JSX.Element {
  return (
    <section className="mt-5">
      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          id="notes"
          placeholder="Extra notes or tips"
          name="notes"
          value={recipeForm.notes}
          onChange={(e) => onChange("notes", e.target.value)}
        />
      </Field>
    </section>
  )
}
