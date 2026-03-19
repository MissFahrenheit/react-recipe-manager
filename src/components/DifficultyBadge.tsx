import type { JSX } from "react"
import type { Difficulty } from "@/types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type DifficultyBadgeProps = {
  difficulty: Difficulty
  cssClass: string
}

export default function DifficultyBadge({
  difficulty,
  cssClass,
}: DifficultyBadgeProps): JSX.Element {
  const difficultyColor = {
    Easy: "bg-green-200",
    Medium: "bg-orange-200",
    Hard: "bg-purple-300",
  }

  return (
    <Badge
      variant="secondary"
      className={cn(difficultyColor[difficulty], cssClass)}
    >
      {difficulty}
    </Badge>
  )
}
