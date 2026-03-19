import type { JSX } from "react"
import type { Difficulty, Recipe } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type BasicInfoSectionProps = {
  recipeForm: Partial<Recipe>
  onChange: (field: keyof Recipe, value: unknown) => void
}

export default function BasicInfoSection({
  recipeForm,
  onChange,
}: BasicInfoSectionProps): JSX.Element {
  return (
    <section className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="name">Recipe Title</FieldLabel>
        <Input
          name="name"
          id="name"
          type="text"
          placeholder="Spaghetti Bolognese"
          required={true}
          aria-required={true}
          value={recipeForm.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="cuisine">Cuisine</FieldLabel>
        <Input
          name="cuisine"
          id="cuisine"
          type="text"
          placeholder="Italian, Mexican..."
          // required={true}
          // aria-required={true}
          value={recipeForm.cuisine}
          onChange={(e) => onChange("cuisine", e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          placeholder="A few words about this recipe"
          name="description"
          // required={true}
          // aria-required={true}
          //
          value={recipeForm.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="prepTime">Prep time (minutes)</FieldLabel>
        <Input
          name="prepTime"
          id="prepTime"
          type="number"
          placeholder="10"
          // required={true}
          // aria-required={true}
          //
          value={recipeForm.prepTime === 0 ? "" : recipeForm.prepTime}
          onChange={(e) => onChange("prepTime", Number(e.target.value))}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="cookTime">Cook time (minutes)</FieldLabel>
        <Input
          name="cookTime"
          id="cookTime"
          type="number"
          placeholder="10"
          // required={true}
          // aria-required={true}
          //
          value={recipeForm.cookTime === 0 ? "" : recipeForm.cookTime}
          onChange={(e) => onChange("cookTime", Number(e.target.value))}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="servings">Serves</FieldLabel>
        <Input
          name="servings"
          id="servings"
          type="number"
          placeholder="4"
          min={1}
          // required={true}
          // aria-required={true}
          //
          value={recipeForm.servings === 0 ? "" : recipeForm.servings}
          onChange={(e) => onChange("servings", Number(e.target.value))}
        />
      </Field>
      <Field>
        <FieldLabel>Difficulty</FieldLabel>
        <Select
          defaultValue="Easy"
          value={recipeForm.difficulty}
          onValueChange={(val) => onChange("difficulty", val as Difficulty)}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="difficulty-easy" value="Easy">
                Easy
              </SelectItem>
              <SelectItem key="difficulty-medium" value="Medium">
                Medium
              </SelectItem>
              <SelectItem key="difficulty-hard" value="Hard">
                Hard
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </section>
  )
}
