import type { JSX } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "../ui/textarea"

type NewRecipeStepProps = {
  updateInstructionStep: (index: number, val: string) => void
  index: number
  value: string
}

export default function NewRecipeStep({
  updateInstructionStep,
  index,
  value,
}: NewRecipeStepProps): JSX.Element {
  return (
    <Field>
      <FieldLabel htmlFor={`step-${index}`}>Step {index + 1}</FieldLabel>
      <Textarea
        id={`step-${index}`}
        name={`step-${index}`}
        placeholder="Step by step instructions"
        value={value}
        onChange={(e) => updateInstructionStep(index, e.target.value)}
      />
    </Field>
  )
}
