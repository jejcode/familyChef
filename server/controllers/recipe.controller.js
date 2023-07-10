import Recipe from "../models/recipe.model.js";

// CRUD Functionality
// Create
const createRecipe = async (req, res) => {
  try {
    console.log("incoming request:", req.body);
    // check to see if there's another recipe by the same name
    const recipeExists = await Recipe.findOne({ name: req.body.name });
    console.log(recipeExists);
    if (recipeExists) {
      return res
        .status(400)
        .json({ msg: `A recipe named ${req.body.name} already exists.` });
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
const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    return res.json(allRecipes);
  } catch (err) {
    console.log(err);
  }
};

const getOneRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    return res.json(recipe);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getRecipesByKeyword = async (req, res) => {
  let keyword = req.params.keyword.replaceAll('_', ' ')
  try {
    const regex = new RegExp(keyword, "i");
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        {directions: { $regex: regex }},
        { "ingredients.item": { $regex: regex } },
      ],
    });
    if (recipes.length === 0) {
      throw new Error("No recipes found.")
    } else {
      return res.json(recipes);
    };
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Update
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json(updatedRecipe);
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
  } catch (err) {
    res.json(err);
  }
};
export {
  createRecipe,
  getAllRecipes,
  getOneRecipeById,
  getRecipesByKeyword,
  updateRecipe,
  deleteRecipe,
};
