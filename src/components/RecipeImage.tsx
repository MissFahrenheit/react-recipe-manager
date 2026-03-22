import type { JSX } from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  getSrcSetUrl,
  getCloudinaryUrl,
  getDefaultImageUrl,
  isDefaultImage,
} from "@/lib/imageUtils"
import { Skeleton } from "./ui/skeleton"

type RecipeImageVariant = "card" | "page"

type RecipeImageProps = {
  src: string
  alt: string
  variant: RecipeImageVariant
}

const IMAGE_CONFIG: Record<
  RecipeImageVariant,
  {
    widths: number[]
    sizes: string
    fallbackWidth: number
  }
> = {
  card: {
    widths: [400, 480, 800, 960],
    sizes: "(max-width: 640px) 100vw, 480px",
    fallbackWidth: 480,
  },
  page: {
    widths: [400, 800, 900, 1800],
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 480px, 900px",
    fallbackWidth: 800,
  },
}

export default function RecipeImage({
  src,
  alt,
  variant,
}: RecipeImageProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false)

  const config = IMAGE_CONFIG[variant]
  const srcSet = config.widths
    .map((width) => getSrcSetUrl(src, width))
    .join(", ")

  const fallbackSrc = isDefaultImage(src)
    ? getDefaultImageUrl(config.fallbackWidth)
    : getCloudinaryUrl(src, config.fallbackWidth)

  return (
    <>
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={config.sizes}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={cn(
          "relative z-20 aspect-video w-full object-cover",
          variant === "card" ? "transition-transform group-hover:scale-105" : ""
        )}
      />
      {!imageLoaded && (
        <Skeleton className="absolute top-0 z-30 aspect-video w-full rounded-none" />
      )}
    </>
  )
}
