import type { JSX } from "react"
import { Badge } from "../ui/badge"

type TagsSectionProps = {
  recipeTags: string[]
}
export default function TagsSection({
  recipeTags,
}: TagsSectionProps): JSX.Element {
  return (
    <section className="flex flex-wrap gap-2">
      {recipeTags.map((t: string) => (
        <Badge
          key={`tag-${t}`}
          variant="outline"
          className="h-auto bg-white px-3 py-1"
        >
          {t}
        </Badge>
      ))}
    </section>
  )
}
