import { v4 as uuidv4 } from "uuid"
import type { Recipe } from "@/types"

export const seedRecipes: Recipe[] = [
  {
    id: uuidv4(),
    name: "Spaghetti alla Carbonara",
    description: "Iconic Roman dish - creamy and flavorful, no cream!",
    cuisine: "Italian",
    difficulty: "Medium",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image:
      "https://res.cloudinary.com/dwiqiojeb/image/upload/v1774169250/je3ywcs98wcp2qs1gicn.jpg",
    tags: ["Pasta", "Roman", "Comfort Food", "Quick"],
    ingredients: [
      {
        item: "Spaghetti",
        quantity: 400,
        unit: "g",
      },
      {
        item: "Guanciale",
        quantity: 150,
        unit: "g",
      },
      {
        item: "Eggs",
        quantity: 4,
        unit: "whole",
      },
      {
        item: "Pecorino Romano DOP",
        quantity: 100,
        unit: "g",
        note: "grated",
      },
      {
        item: "Black pepper",
        quantity: "to taste",
        unit: "",
      },
    ],
    instructions: [
      "Bring water to boil for pasta (salt when boiling)",
      "Cut guanciale into strips and cook in pan until golden (no oil needed!)",
      "In a bowl, beat eggs with grated pecorino and abundant black pepper",
      "Cook spaghetti al dente, reserve 1 cup pasta water",
      "Drain pasta and add to pan with guanciale (heat off!)",
      "Add egg-pecorino mixture and mix quickly, adding pasta water for creaminess",
      "Serve immediately with freshly ground black pepper and extra pecorino",
    ],
    notes:
      "Secret - creaminess comes from egg-pecorino-pasta water emulsion, NOT cream! Heat must be off when adding eggs to avoid scrambling.",
    isFavorite: false,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Classic Mac and Cheese",
    description:
      "The ultimate American comfort food - creamy, cheesy, perfect!",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 20,
    servings: 6,
    image:
      "https://res.cloudinary.com/dwiqiojeb/image/upload/v1774169367/httpt8wijdzvntfxkjft.jpg",
    tags: ["Comfort Food", "Pasta", "Cheese", "Family Favorite"],
    ingredients: [
      {
        item: "Elbow macaroni",
        quantity: 450,
        unit: "g",
      },
      {
        item: "Butter",
        quantity: 60,
        unit: "g",
      },
      {
        item: "All-purpose flour",
        quantity: 60,
        unit: "g",
      },
      {
        item: "Whole milk",
        quantity: 700,
        unit: "ml",
      },
      {
        item: "Sharp Cheddar cheese",
        quantity: 300,
        unit: "g",
        note: "grated",
      },
      {
        item: "Mozzarella",
        quantity: 150,
        unit: "g",
        note: "grated",
      },
      {
        item: "Dijon mustard",
        quantity: 1,
        unit: "tsp",
      },
      {
        item: "Paprika",
        quantity: 0.5,
        unit: "tsp",
      },
      {
        item: "Salt and pepper",
        quantity: "to taste",
        unit: "",
      },
      {
        item: "Breadcrumbs",
        quantity: 50,
        unit: "g",
        note: "optional for topping",
      },
    ],
    instructions: [
      "Cook macaroni according to package (1-2 min less for al dente). Drain and set aside",
      "In same pot, melt butter over medium heat",
      "Add flour and whisk for 1-2 minutes (roux) until slightly golden",
      "Gradually pour in milk while whisking constantly to prevent lumps",
      "Cook while stirring until thickened (5-7 min)",
      "Reduce heat, add cheeses, mustard, paprika, salt and pepper. Stir until fully melted",
      "Add macaroni to sauce and mix well",
      "OPTIONAL: transfer to baking dish, top with breadcrumbs and broil at 180°C for 15 min",
      "Serve hot with a sprinkle of paprika",
    ],
    notes:
      "Pro tip - use freshly grated cheese, not pre-shredded (contains anti-caking agents that prevent optimal creaminess). For extra creaminess add a tablespoon of cream cheese.",
    isFavorite: true,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Chicken Parmigiana",
    description:
      "Italian-American fusion - breaded chicken with marinara and melted mozzarella",
    cuisine: "Italian-American",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    image:
      "https://res.cloudinary.com/dwiqiojeb/image/upload/v1774169420/xcbinl0fyivlanzytkbo.jpg",
    tags: [
      "Chicken",
      "Cheese",
      "Italian-American",
      "Comfort Food",
      "Weeknight Dinner",
    ],
    ingredients: [
      {
        item: "Chicken breasts",
        quantity: 4,
        unit: "pieces",
        note: "pounded thin",
      },
      {
        item: "All-purpose flour",
        quantity: 100,
        unit: "g",
      },
      {
        item: "Eggs",
        quantity: 2,
        unit: "whole",
        note: "beaten",
      },
      {
        item: "Breadcrumbs",
        quantity: 150,
        unit: "g",
      },
      {
        item: "Parmesan cheese",
        quantity: 50,
        unit: "g",
        note: "grated",
      },
      {
        item: "Fresh mozzarella",
        quantity: 250,
        unit: "g",
        note: "sliced",
      },
      {
        item: "Marinara sauce",
        quantity: 500,
        unit: "ml",
      },
      {
        item: "Fresh basil",
        quantity: "to taste",
        unit: "",
      },
      {
        item: "Olive oil",
        quantity: "as needed",
        unit: "",
      },
      {
        item: "Salt and pepper",
        quantity: "to taste",
        unit: "",
      },
    ],
    instructions: [
      "Preheat oven to 200°C (400°F)",
      "Prepare three dishes: flour, beaten eggs, breadcrumbs mixed with parmesan",
      "Salt and pepper the pounded chicken breasts",
      "Dredge each breast in: flour → eggs → breadcrumbs, pressing well",
      "Heat oil in pan over medium-high heat and fry breasts 3-4 min per side until golden",
      "Transfer breasts to baking dish, pour marinara sauce over them",
      "Top each breast with mozzarella slices and sprinkle of parmesan",
      "Bake for 15-20 min until cheese is melted and lightly golden",
      "Garnish with fresh basil and serve with spaghetti or salad",
    ],
    notes:
      "Light version - instead of frying, bake breaded breasts at 200°C for 20 min, flipping halfway, then proceed with sauce and cheese. For extra flavor add garlic powder and oregano to breadcrumbs.",
    isFavorite: false,
    createdAt: new Date(),
  },
]
