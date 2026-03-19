import type { JSX } from "react"
import NewRecipeStep from "./NewRecipeStep"
import { Button } from "../ui/button"
import { FieldError } from "../ui/field"
import { Plus } from "lucide-react"

type InstructionsSectionProps = {
  recipeInstructions: string[]
  instructionsError: boolean
  onUpdateInstructions: (steps: string[]) => void
}

export default function InstructionsSection({
  recipeInstructions,
  instructionsError,
  onUpdateInstructions,
}: InstructionsSectionProps): JSX.Element {
  function showNewStepForm() {
    onUpdateInstructions([...recipeInstructions, ""])
  }

  function updateInstructionStep(index: number, stepText: string) {
    if (stepText.trim() === "") {
      removeStep(index)
      return
    }
    addNewStep(index, stepText)
  }

  function addNewStep(index: number, stepText: string): void {
    const newSteps = [...recipeInstructions]
    newSteps[index] = stepText
    onUpdateInstructions(newSteps)
  }

  function removeStep(index: number): void {
    const newSteps: string[] = recipeInstructions.filter((_, idx) => {
      return idx !== index
    })
    onUpdateInstructions(newSteps)
  }

  return (
    <section className="flex flex-col gap-5">
      <h3 className="text-xl font-semibold">Instructions</h3>
      {recipeInstructions.map((step, i) => (
        <NewRecipeStep
          key={i}
          index={i}
          value={step}
          updateInstructionStep={updateInstructionStep}
        />
      ))}

      {recipeInstructions[recipeInstructions.length - 1] !== "" && (
        <Button variant="outline" type="button" onClick={showNewStepForm}>
          <Plus />
          Add another
        </Button>
      )}

      {instructionsError && <FieldError>Please add at least 1 step</FieldError>}
    </section>
  )
}
