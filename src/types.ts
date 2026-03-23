export type Difficulty = "Easy" | "Medium" | "Hard"
export type SortDirection = "asc" | "desc"
export type SortableField = "createdAt" | "difficulty" | "totalTime"
export type DifficultyOption = "Any" | "Easy" | "Medium" | "Hard"

export interface Ingredient {
  item: string
  quantity: number | string
  unit: string
  note?: string
}

export interface Recipe {
  id: string
  name: string
  description: string
  cuisine: string
  difficulty: Difficulty
  prepTime: number // minutes
  cookTime: number // minutes
  servings: number
  image: string
  tags: string[]
  ingredients: Ingredient[]
  instructions: string[]
  notes?: string
  isFavorite: boolean
  createdAt: Date
}

export interface FilterValues {
  maxPrepTime: number | null
  maxCookTime: number | null
  difficulty: DifficultyOption
  cuisine: string
  tags: string[]
  favoritesOnly: boolean
}
