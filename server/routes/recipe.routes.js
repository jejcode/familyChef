import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipeById,
  getOneRecipeByKeyword,
  updateRecipe,
} from "../controllers/recipe.controller.js";
const recipeRouter = Router();

recipeRouter.get("/all", getAllRecipes);
recipeRouter.get("/:id", getOneRecipeById)
recipeRouter.get("/searchfor/:keyword", getOneRecipeByKeyword)
recipeRouter.post("/new", createRecipe);
recipeRouter.put("/:id/edit", updateRecipe);
recipeRouter.delete("/:id/delete", deleteRecipe);

export default recipeRouter;
