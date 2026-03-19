import type { JSX } from "react"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

type InstructionsSectionProps = {
  recipeInstructions: string[]
}

export default function InstructionsSection({
  recipeInstructions,
}: InstructionsSectionProps): JSX.Element {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Steps</h2>
      <div className="relative flex flex-col gap-3">
        <div className="absolute top-2.5 left-3.5 h-11/12 w-0.5 border-l-2 border-amber-100"></div>
        {recipeInstructions.map((instruction: string, idx: number) => (
          <div key={`instruction-${idx}`} className="flex items-center gap-3">
            <div className="z-10 grid aspect-square w-8 shrink-0 place-items-center rounded-4xl bg-amber-100 font-semibold">
              {idx + 1}
            </div>
            <FieldLabel className="py-2 has-data-checked:line-through">
              <Field orientation="horizontal">
                <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                <FieldContent>
                  <FieldTitle>
                    <span className="font-normal">{instruction}</span>
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>
        ))}
      </div>
    </section>
  )
}
