import type { JSX } from "react"
import type { Difficulty } from "@/types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DIFFICULTY_CSS_CLASSES } from "@/lib/helpers"

type DifficultyBadgeProps = {
  difficulty: Difficulty
  cssClass: string
}

export default function DifficultyBadge({
  difficulty,
  cssClass,
}: DifficultyBadgeProps): JSX.Element {
  return (
    <Badge
      variant="secondary"
      className={cn(DIFFICULTY_CSS_CLASSES[difficulty], cssClass)}
    >
      {difficulty}
    </Badge>
  )
}
