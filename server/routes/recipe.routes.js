import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  findAllRecipes,
  findOneRecipe,
  updateRecipe,
} from "../controllers/recipe.controller.js";
const recipeRouter = Router();

recipeRouter.get("/all", findAllRecipes);
recipeRouter.get("/:id", findOneRecipe)
recipeRouter.post("/new", createRecipe);
recipeRouter.put("/:id/edit", updateRecipe);
recipeRouter.delete("/:id/delete", deleteRecipe);

export default recipeRouter;
