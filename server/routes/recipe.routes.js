import { Router } from "express";
import { createRecipe, deleteRecipe, findAllRecipes } from "../controllers/recipe.controller.js";
const recipeRouter = Router();

recipeRouter.get("/all", findAllRecipes);
recipeRouter.post("/new", createRecipe);
recipeRouter.delete("/:id/delete", deleteRecipe)

export default recipeRouter;
