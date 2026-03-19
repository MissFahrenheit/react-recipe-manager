import type { JSX } from "react"
import { useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

type NumberInputWithButtonsProps = {
  label: string
  min?: number
  max?: number
  description?: string
  name: string
  id: string
  placeholder?: string
}
export default function NumberInputWithButtons({
  label,
  min = 0,
  max,
  description,
  name,
  id,
  placeholder,
}: NumberInputWithButtonsProps): JSX.Element {
  const [value, setValue] = useState<number>(0)

  function decrementValue(): void {
    setValue((preVal: number) => preVal - 1)
  }
  function incrementValue(): void {
    setValue((preVal: number) => preVal + 1)
  }

  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
          placeholder={placeholder}
          name={name}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full grow px-3 py-2 text-center tabular-nums outline-none selection:bg-primary selection:text-primary-foreground"
        />
        <InputGroupAddon align="inline-start">
          <Button onClick={decrementValue}>
            <MinusIcon />
            <span className="sr-only">Decrement</span>
          </Button>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button onClick={incrementValue} slot="increment">
            <PlusIcon />
            <span className="sr-only">Increment</span>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  )
}
