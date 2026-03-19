import type { JSX } from "react"
import { useState } from "react"
import { numberOrString } from "@/lib/helpers"
import type { Ingredient } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
} from "@/components/ui/combobox"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type NewIngredientProps = {
  ingredientList: string[]
  addIngredient: (ingredient: Ingredient) => void
}

export default function NewIngredient({
  ingredientList,
  addIngredient,
}: NewIngredientProps): JSX.Element {
  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    item: "",
    quantity: "",
    unit: "",
    note: "",
  })
  const [itemError, setItemError] = useState<string>("")
  const [quantityError, setQuantityError] = useState<string>("")
  const isButtonDisabled: boolean =
    newIngredient.item === "" || newIngredient.quantity === ""

  function handleAddIngredient(): void {
    if (!newIngredient.item) {
      setItemError("Please select an ingredient")
      return
    }
    if (!newIngredient.quantity) {
      setQuantityError("Please add quantity")
      return
    }

    const ingredient: Ingredient = {
      item: newIngredient.item as string,
      quantity: newIngredient.quantity as string,
      unit: newIngredient.unit as string,
      note: newIngredient.note,
    }
    addIngredient(ingredient)
  }

  function updateIngredient(field: keyof Ingredient, value: string): void {
    setNewIngredient((prev) => ({ ...prev, [field]: value }))
  }

  function updateIngredientQuantity(value: string): void {
    setQuantityError("")
    setNewIngredient((prevIngredient: Partial<Ingredient>) => {
      return { ...prevIngredient, quantity: numberOrString(value) }
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span className="font-semibold">Add new ingredient</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="ingredientItem">Item *</FieldLabel>
          <Combobox
            id="ingredientItem"
            items={ingredientList}
            value={newIngredient.item}
            onValueChange={(val) => {
              updateIngredient("item", val ?? "")
              setItemError("")
            }}
          >
            <ComboboxInput
              aria-required={true}
              placeholder="Select an ingredient"
              aria-invalid={itemError ? true : false}
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldError>{itemError}</FieldError>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="ingredientQuantity">Quantity *</FieldLabel>
            <Input
              name="ingredientQuantity"
              id="ingredientQuantity"
              type="text"
              placeholder="e.g. 3 or to taste"
              value={newIngredient.quantity}
              onChange={(e) => updateIngredientQuantity(e.target.value)}
              aria-required={true}
            />
            <FieldError>{quantityError}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="ingredientUnit">Unit</FieldLabel>
            <Input
              name="ingredientUnit"
              id="ingredientUnit"
              type="text"
              placeholder="e.g. tbsp or gr"
              value={newIngredient.unit}
              onChange={(e) => updateIngredient("unit", e.target.value)}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="ingredientNote">Note</FieldLabel>
          <Input
            name="ingredientNote"
            id="ingredientNote"
            type="text"
            placeholder="Optional extra info, e.g. grated"
            value={newIngredient.note}
            onChange={(e) => updateIngredient("note", e.target.value)}
          />
        </Field>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="w-full"
          variant="outline"
          onClick={handleAddIngredient}
          disabled={isButtonDisabled}
          aria-disabled={isButtonDisabled}
        >
          Save ingredient
        </Button>
      </CardFooter>
    </Card>
  )
}
