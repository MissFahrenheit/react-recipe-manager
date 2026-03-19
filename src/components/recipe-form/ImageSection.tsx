import type { JSX } from "react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type ImageSectionProps = {
  onImageChange: (file: File | null) => void
}

export default function ImageSection({
  onImageChange,
}: ImageSectionProps): JSX.Element {
  return (
    <section>
      <Field>
        <FieldLabel htmlFor="image">Picture</FieldLabel>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
        />
        <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>
    </section>
  )
}
