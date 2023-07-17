import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipeById,
  getRecipesByKeyword,
  updateRecipe,
  updateAllRecipesOnMenu,
  deleteAllMenus
} from "../controllers/recipe.controller.js";
const recipeRouter = Router();

recipeRouter.get("/all", getAllRecipes);
recipeRouter.get("/:id", getOneRecipeById);
recipeRouter.get("/searchfor/:keyword", getRecipesByKeyword);
recipeRouter.post("/new", createRecipe);
recipeRouter.put("/:id/edit", updateRecipe);
recipeRouter.delete("/:id/delete", deleteRecipe);
recipeRouter.put("/menus/delete", deleteAllMenus)

export default recipeRouter;
