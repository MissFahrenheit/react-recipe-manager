import type { JSX } from "react"
import { useState } from "react"
import { Skeleton } from "./ui/skeleton"

type RecipeImageProps = {
  recipeImg: string
  recipeName: string
}

export default function RecipeImage({
  recipeImg,
  recipeName,
}: RecipeImageProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [blurLoaded, setBlurLoaded] = useState(false)
  const blurUrl = recipeImg.replace("/upload/", "/upload/w_50,e_blur:1000/")
  return (
    <>
      <img
        src={recipeImg}
        alt={recipeName}
        onLoad={() => setImageLoaded(true)}
        className="relative z-20 aspect-video w-full object-cover"
      />
      {!imageLoaded && (
        <img
          src={blurUrl}
          alt={recipeName}
          onLoad={() => setBlurLoaded(true)}
          className="absolute top-0 z-30 aspect-video w-full object-cover"
        />
      )}
      {!blurLoaded && (
        <Skeleton className="absolute top-0 z-30 aspect-video w-full" />
      )}
    </>
  )
}
