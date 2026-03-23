import type { JSX } from "react"
import type { Difficulty } from "@/types"
import { cn } from "@/lib/utils"
import { DIFFICULTY_CSS_CLASSES } from "@/lib/helpers"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

type InstructionsSectionProps = {
  recipeDifficulty: Difficulty
  recipeInstructions: string[]
}

export default function InstructionsSection({
  recipeDifficulty,
  recipeInstructions,
}: InstructionsSectionProps): JSX.Element {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Steps</h2>
      <div className="relative flex flex-col gap-5">
        {recipeInstructions.map((instruction: string, idx: number) => (
          <div key={`instruction-${idx}`} className="flex items-center gap-3">
            <div
              className={cn(
                "grid aspect-square w-8 shrink-0 place-items-center rounded-4xl font-semibold",
                DIFFICULTY_CSS_CLASSES[recipeDifficulty]
              )}
            >
              {idx + 1}
            </div>
            <FieldLabel className="cursor-pointer border-gray-100 bg-white py-2 shadow-md/4 has-data-checked:border-gray-100 has-data-checked:bg-neutral-50 has-data-checked:text-gray-400 has-data-checked:line-through dark:border-neutral-500 dark:bg-neutral-700 has-data-checked:dark:border-neutral-700 has-data-checked:dark:bg-neutral-800 has-data-checked:dark:text-white/20">
              <Field orientation="horizontal">
                <Checkbox
                  id={`step-checkbox-${idx}`}
                  name={`step-checkbox-${idx}`}
                />
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
