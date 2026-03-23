import type { JSX } from "react"
import { Link } from "react-router-dom"
import { usePageTitle } from "@/lib/usePageTitle"
import { Button } from "@/components/ui/button"

export default function Error404(): JSX.Element {
  usePageTitle("Page not found 404")
  return (
    <div className="flex flex-col items-center gap-2 py-20">
      <span className="font-medium tracking-tight">404 - Not Found</span>
      <span className="text-sm/relaxed text-muted-foreground">
        The page you're looking for doesn't exist.
      </span>
      <Button variant="outline" asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
