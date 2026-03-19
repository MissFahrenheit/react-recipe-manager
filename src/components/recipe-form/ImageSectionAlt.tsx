import type { JSX } from "react"
import { useDropzone } from "react-dropzone"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Image } from "lucide-react"

type ImageSectionProps = {
  onImageChange: (file: File | null) => void
}

export default function ImageSection({
  onImageChange,
}: ImageSectionProps): JSX.Element {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      onImageChange(acceptedFiles[0] ?? null)
    },
  })

  return (
    <section>
      <Field>
        <FieldLabel htmlFor="image">Picture</FieldLabel>
        <div
          {...getRootProps()}
          className="flex justify-center rounded-lg border border-dashed px-6 py-10"
        >
          {isDragActive ? (
            <span>Drop it!</span>
          ) : (
            <div className="text-center">
              <Image size="60" className="mx-auto text-gray-300" />
              <div className="mt-4 flex text-sm/6 text-gray-600">
                <label
                  htmlFor="image"
                  className="relative cursor-pointer rounded-md font-semibold text-lime-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lime-800 hover:text-lime-800"
                >
                  <span>Upload a file</span>
                  <Input
                    {...getInputProps()}
                    id="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </div>
      </Field>
    </section>
  )
}
