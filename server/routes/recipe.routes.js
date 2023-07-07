import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  findAllRecipes,
  updateRecipe,
} from "../controllers/recipe.controller.js";
const recipeRouter = Router();

recipeRouter.get("/all", findAllRecipes);
recipeRouter.post("/new", createRecipe);
recipeRouter.put("/:id/edit", updateRecipe);
recipeRouter.delete("/:id/delete", deleteRecipe);

export default recipeRouter;
