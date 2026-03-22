import type { JSX } from "react"
import { Outlet, useMatch } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Toaster } from "@/components/ui/sonner"

export default function MainLayout(): JSX.Element {
  const isRecipePage = useMatch("/recipe/:recipeId")

  return (
    <>
      <Header />
      <div className="grid min-h-svh grid-rows-[1fr_auto] pt-header">
        <main className="bg-neutral-50 dark:bg-neutral-800">
          <Outlet />
        </main>
        <Toaster />
        {!isRecipePage && <Footer textAlign="left" />}
      </div>
    </>
  )
}
