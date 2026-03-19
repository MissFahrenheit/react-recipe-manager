import type { Recipe } from "@/types"
import type { JSX } from "react"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRecipeById } from "@/data/storeRecipes"
import { useIsMobile } from "@/lib/useIsMobile"
import MobileView from "@/components/recipe-page/MobileView"
import DesktopView from "@/components/recipe-page/DesktopView"

export default function Recipe(): JSX.Element {
  const isMobile = useIsMobile()
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const recipe: Recipe | undefined = recipeId
    ? getRecipeById(recipeId)
    : undefined

  const recipeExists: boolean = recipe !== undefined
  useEffect(() => {
    if (!recipeExists) {
      navigate("/404")
    }
  }, [recipeExists, navigate])

  return (
    <>
      {isMobile && recipe ? (
        <MobileView recipe={recipe} />
      ) : (
        recipe && <DesktopView recipe={recipe} />
      )}
    </>
  )
}
