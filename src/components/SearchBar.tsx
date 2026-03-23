import type { JSX } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import { Search, X } from "lucide-react"

type SearchBarProps = {
  value: string
  onChange: (query: string) => void
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps): JSX.Element {
  return (
    <InputGroup className="w-full bg-white dark:bg-transparent">
      <InputGroupInput
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search recipes by title"
      />
      <InputGroupAddon>
        <Search aria-hidden="true" />
      </InputGroupAddon>

      {value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            aria-label="Clear search query"
            size="icon-xs"
            onClick={() => onChange("")}
          >
            <X aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
