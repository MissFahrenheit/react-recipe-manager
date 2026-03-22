import type {
  Recipe,
  FilterValues,
  SortDirection,
  SortableField,
} from "@/types"
import { seedRecipes } from "./seedRecipes"

const storageKey: string | undefined = import.meta.env.VITE_STORAGE_KEY

function getStorageKey(): string {
  if (!storageKey) {
    throw new Error(
      "Storage key is not defined. Check your .env file for VITE_STORAGE_KEY."
    )
  }
  return storageKey
}

export function getRecipes(): Recipe[] {
  const recipesJson: string | null = localStorage.getItem(getStorageKey())

  if (recipesJson) {
    return JSON.parse(recipesJson) as Recipe[]
  }

  return storeSeedAndGetRecipes()
}

function storeSeedAndGetRecipes(): Recipe[] {
  localStorage.setItem(getStorageKey(), JSON.stringify(seedRecipes))
  return seedRecipes
}

export function resetRecipesToSeed(): void {
  storeSeedAndGetRecipes()
}

export function addRecipe(newRecipe: Recipe): void {
  const recipesJson: string | null = localStorage.getItem(getStorageKey())
  const recipes: Recipe[] = recipesJson ? JSON.parse(recipesJson) : []
  const updatedRecipes: Recipe[] = [...recipes, newRecipe]
  localStorage.setItem(getStorageKey(), JSON.stringify(updatedRecipes))
}

export function storeUpdatedRecipe(
  recipeId: string,
  updatedRecipe: Recipe
): void {
  const recipesJson: string | null = localStorage.getItem(getStorageKey())
  const recipes: Recipe[] = recipesJson ? JSON.parse(recipesJson) : []

  const updatedRecipes: Recipe[] = recipes.map((recipe: Recipe) => {
    if (recipe.id === recipeId) {
      return updatedRecipe
    }
    return recipe
  })
  localStorage.setItem(getStorageKey(), JSON.stringify(updatedRecipes))
}

export function deleteRecipe(recipeId: string): void {
  const recipes: Recipe[] = getRecipes()
  const updatedRecipes = recipes.filter(
    (recipe: Recipe) => recipe.id !== recipeId
  )
  localStorage.setItem(getStorageKey(), JSON.stringify(updatedRecipes))
}

export function refreshRecipes(): Recipe[] {
  return storeSeedAndGetRecipes()
}

export function getRecipeById(recipeId: string): Recipe | undefined {
  const recipes: Recipe[] = getRecipes()
  return recipes.find((r: Recipe) => r.id === recipeId)
}

export function getAllUniqueTags(): string[] {
  const recipes: Recipe[] = getRecipes()
  const tags: string[] = recipes.reduce(
    (acc: string[], curr: Recipe): string[] => {
      const newTags: string[] = curr.tags.filter(
        (t: string) => !acc.includes(t)
      )
      return acc.concat(newTags)
    },
    []
  )
  return tags
}

export function getMaxTime(timeType: "prepTime" | "cookTime"): number {
  const recipes: Recipe[] = getRecipes()
  const times: number[] = recipes.map((recipe) => recipe[timeType])
  return Math.max(...times)
}

export function getAllCuisines(): string[] {
  const recipes: Recipe[] = getRecipes()
  const cuisines: string[] = recipes.reduce(
    (acc: string[], curr: Recipe): string[] => {
      if (!acc.includes(curr.cuisine)) {
        acc.push(curr.cuisine)
      }
      return acc
    },
    []
  )
  return cuisines
}

export function filterRecipes(filters: FilterValues): Recipe[] {
  const recipes: Recipe[] = getRecipes()
  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    if (filters.maxPrepTime && recipe.prepTime > filters.maxPrepTime) {
      return
    }
    if (filters.maxCookTime && recipe.cookTime > filters.maxCookTime) {
      return
    }
    if (filters.tags.length > 0) {
      const hasMatch = filters.tags.some((item: string) =>
        recipe.tags.includes(item)
      )
      if (!hasMatch) {
        return
      }
    }
    if (
      filters.cuisine &&
      filters.cuisine !== "" &&
      filters.cuisine !== recipe.cuisine
    ) {
      return
    }
    if (
      filters.difficulty !== "Any" &&
      filters.difficulty !== recipe.difficulty
    ) {
      return
    }

    if (filters.favoritesOnly && !recipe.isFavorite) {
      return
    }

    return recipe
  })
  return filteredRecipes
}

export function sortBy(
  recipes: Recipe[],
  field: SortableField,
  direction: SortDirection
): Recipe[] {
  const multiplier = direction === "asc" ? 1 : -1
  const newRecipes = [...recipes]

  switch (field) {
    case "createdAt":
      return newRecipes.sort((a, b) => compareDates(a, b) * multiplier)
    case "totalTime":
      return newRecipes.sort((a, b) => compareTimes(a, b) * multiplier)
    case "difficulty":
      return newRecipes.sort((a, b) => compareDifficulty(a, b) * multiplier)
  }
}

function compareDifficulty(a: Recipe, b: Recipe): number {
  const difficultyNumberMapping = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  }
  const difficultyA: number = difficultyNumberMapping[a.difficulty]
  const difficultyB: number = difficultyNumberMapping[b.difficulty]
  return compareNumbers(difficultyA, difficultyB)
}

function compareTimes(a: Recipe, b: Recipe): number {
  const totalTimeA = a.prepTime + a.cookTime
  const totalTimeB = b.prepTime + b.cookTime
  return compareNumbers(totalTimeA, totalTimeB)
}

function compareDates(a: Recipe, b: Recipe): number {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
}

function compareNumbers(a: number, b: number): number {
  return a - b
}
