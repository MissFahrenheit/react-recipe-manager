import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import RecipePage from "./pages/Recipe"
import EditRecipe from "./pages/EditRecipe"
import CreateRecipe from "./pages/CreateRecipe"
import MainLayout from "./MainLayout"
import Error404 from "./pages/Error404"

export function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route path="/recipe/:recipeId/edit" element={<EditRecipe />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
