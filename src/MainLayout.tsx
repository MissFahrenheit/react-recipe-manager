import type { JSX } from "react"
import { Outlet, useMatch } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function MainLayout(): JSX.Element {
  const isRecipePage = useMatch("/recipe/:recipeId")

  return (
    // <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
    //   <Header />
    //   <main className="bg-neutral-50 pt-header">
    //     <Outlet />
    //   </main>
    //   {!isRecipePage && <Footer />}
    // </div>
    <>
      <Header />
      <div className="grid min-h-svh grid-rows-[1fr_auto] pt-header">
        <main className="bg-neutral-50">
          <Outlet />
        </main>
        {!isRecipePage && <Footer />}
      </div>
    </>
  )
}
