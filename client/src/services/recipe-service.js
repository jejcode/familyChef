import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const createRecipe = async (formData) => {
  try {
    const newRecipe = await instance.post(`recipes/new`, formData);
    return newRecipe;
  } catch (err) {
    console.log("This is the error", err);
  }
};

const getAllRecipes = async () => {
  try {
    const allRecipes = await instance.get("recipes/all");
    return allRecipes.data;
  } catch (err) {
    console.log(err);
  }
};

const getRecipeById = async (id) => {
  try {
    const recipe = await instance.get(`recipes/${id}`);
    return recipe.data;
  } catch (err) {
    console.log(err);
  }
};

const updateRecipe = async (id, formData) => {
  try {
    const updatedRecipe = await instance.put(`/recipes/${id}/edit`, formData);
    return updatedRecipe.data;
  } catch (err) {
    console.log(err);
  }
};

const updateAllRecipesOnMenu = async (recipes) => {
  try {
    const recipesWithMenuIds = await instance.put("/recipes/menus/update", recipes);
    console.log(recipesWithMenuIds);
    return recipesWithMenuIds.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteRecipeById = async (recipeId) => {
  try {
    console.log('services is deleting...')
    const deletedRecipe = await instance.delete(`/recipes/${recipeId}/delete`)
    return deletedRecipe.data
  } catch (error) {
    console.log(error)
  }
}
export {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateAllRecipesOnMenu,
  deleteRecipeById
};
