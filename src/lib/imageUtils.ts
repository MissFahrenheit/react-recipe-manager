const DEFAULT_IMAGE_BASE = "/images/default_recipe_image"
const CLOUDINARY_UPLOAD_PATH = "/upload/"
const ORPHANED_IMAGES_KEY = "orphaned_image_public_ids"

export function isDefaultImage(url: string): boolean {
  return url.startsWith(DEFAULT_IMAGE_BASE)
}

export function getCloudinaryUrl(url: string, width: number): string {
  return url.replace(CLOUDINARY_UPLOAD_PATH, `/upload/w_${width},c_fill/`)
}

export function getDefaultImageUrl(width: number): string {
  return `${DEFAULT_IMAGE_BASE}_${width}.jpg`
}

export function getSrcSetUrl(url: string, width: number): string {
  return isDefaultImage(url)
    ? `${getDefaultImageUrl(width)} ${width}w`
    : `${getCloudinaryUrl(url, width)} ${width}w`
}

export function addOrphanedPublicId(publicId: string): void {
  const existing: string[] = JSON.parse(
    localStorage.getItem(ORPHANED_IMAGES_KEY) ?? "[]"
  )
  localStorage.setItem(
    ORPHANED_IMAGES_KEY,
    JSON.stringify([...existing, publicId])
  )
}

export function markPublicIdAsUsed(publicId: string): void {
  const existing: string[] = JSON.parse(
    localStorage.getItem(ORPHANED_IMAGES_KEY) ?? "[]"
  )
  localStorage.setItem(
    ORPHANED_IMAGES_KEY,
    JSON.stringify(existing.filter((id) => id !== publicId))
  )
}
