import Recipe from "../models/recipe.model.js";

// CRUD Functionality
// Create
const createRecipe = async (req, res) => {
  try {
    console.log("incoming request:", req.body);
    // check to see if there's another recipe by the same name
    const recipeExists = await Recipe.findOne({ title: req.body.title });
    console.log(recipeExists);
    if (recipeExists) {
      return res
        .status(400)
        .json({ msg: `A recipe named ${req.body.title} already exists.` });
    } else {
      const newRecipe = await Recipe.create(req.body);
      console.log("new recipe:", newRecipe);
      return res.json(newRecipe);
    }
  } catch (err) {
    console.log(err);
  }
};

// Read
const findAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    return res.json(allRecipes);
  } catch (err) {
    console.log(err);
  }
};

// Delete
const deleteRecipe = async (req, res) => {
  try {
    const deleteConfirmed = await Recipe.findByIdAndDelete({
      _id: req.params.id,
    });
    return res.json(deleteConfirmed);
  } catch (err) {}
};
export { createRecipe, findAllRecipes, deleteRecipe };
