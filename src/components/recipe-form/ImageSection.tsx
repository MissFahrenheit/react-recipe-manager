import type { JSX } from "react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Image, X } from "lucide-react"
import { addOrphanedPublicId } from "@/lib/imageUtils"

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? ""
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`

type ImageSectionProps = {
  recipeImage: string
  onUploadComplete: (url: string, publicId: string) => void
}

export default function ImageSection({
  recipeImage,
  onUploadComplete,
}: ImageSectionProps): JSX.Element {
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    recipeImage ?? null
  )
  const [error, setError] = useState<string>("")

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return
      setPreviewUrl(URL.createObjectURL(file))

      async function uploadToCloudinary(file: File): Promise<void> {
        setIsUploading(true)
        setUploadProgress(0)
        setError("")

        const fd = new FormData()
        fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        fd.append("tags", "browser_upload")
        fd.append("file", file)

        try {
          const { data } = await axios.post(UPLOAD_URL, fd, {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                )
                setUploadProgress(percent)
              }
            },
          })

          setPreviewUrl(data.secure_url)
          addOrphanedPublicId(data.public_id)
          onUploadComplete(data.secure_url, data.public_id)
        } catch {
          setError("Upload failed. Please try again.")
        } finally {
          setIsUploading(false)
        }
      }

      uploadToCloudinary(file)
    },
    [onUploadComplete]
  )

  function handleRemove(): void {
    setPreviewUrl(null)
    setUploadProgress(0)
    onUploadComplete("", "")
    // publicId stays in localStorage as orphaned, cleanup job handles deletion
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop,
    disabled: isUploading,
  })

  return (
    <section>
      <Field>
        <FieldLabel>Image</FieldLabel>

        {previewUrl ? (
          <div className="group relative">
            <img
              src={previewUrl}
              alt="Recipe preview"
              className="relative z-1 max-h-64 w-full rounded-lg object-cover"
            />

            {isUploading && (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-0 z-2 flex flex-col items-center justify-center rounded-lg bg-black/40"
              >
                <span className="mb-2 text-sm font-medium text-white">
                  Uploading... {uploadProgress}%
                </span>
                <div className="h-2 w-2/3 rounded-full bg-white/30">
                  <div
                    className="h-2 rounded-full bg-white transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            {!isUploading && (
              <>
                <div className="absolute inset-0 z-2 flex flex-col items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-80"></div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Remove image"
                  className="absolute top-2 right-2 z-10 rounded-full bg-white dark:bg-neutral-600 dark:hover:bg-neutral-900"
                  onClick={handleRemove}
                >
                  <X aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            role="button"
            aria-label="Upload recipe image"
            className={`flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors ${
              isDragActive
                ? "border-red-400 bg-red-50 dark:bg-red-500/10"
                : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <Image
                size="60"
                className="mx-auto text-gray-300"
                aria-hidden="true"
              />
              {isDragActive ? (
                <>
                  <div className="mt-4 text-xl font-semibold text-gray-300">
                    <p>Drop it like it's hot</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4 flex text-sm/6 text-gray-600 dark:text-gray-400">
                    <span className="cursor-pointer font-semibold text-red-600 hover:text-red-500">
                      Upload a file
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600 dark:text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {error && <FieldError>{error}</FieldError>}
      </Field>
    </section>
  )
}
