import type { JSX } from "react"
import type { SortableField, SortDirection } from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowDownUp } from "lucide-react"

type SortingProps = {
  field: SortableField
  direction: SortDirection
  onChange: (field: SortableField, direction: SortDirection) => void
}

export default function Sorting({
  field,
  direction,
  onChange,
}: SortingProps): JSX.Element {
  const sortingOptions: {
    field: SortableField
    direction: SortDirection
    label: string
  }[] = [
    { field: "createdAt", direction: "desc", label: "Newest" },
    { field: "createdAt", direction: "asc", label: "Oldest" },
    { field: "difficulty", direction: "asc", label: "Easiest" },
    { field: "difficulty", direction: "desc", label: "Hardest" },
    { field: "totalTime", direction: "asc", label: "Shortest" },
    { field: "totalTime", direction: "desc", label: "Longest" },
  ]

  const currentLabel: string =
    sortingOptions.find(
      (option) => option.field === field && option.direction === direction
    )?.label ?? ""

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="text-muted-foreground">Sort by:</span> {currentLabel}
          <ArrowDownUp className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {sortingOptions.map((option) => (
            <DropdownMenuItem
              key={`${option.field}-${option.direction}`}
              onClick={() => onChange(option.field, option.direction)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
