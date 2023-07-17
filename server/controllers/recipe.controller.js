import Recipe from "../models/recipe.model.js";
// import Menu from "../models/menu.model.js";
// import { UpdateMenuByDeletingRecipe } from "./menu.controller.js";

// CRUD Functionality
// Create
const createRecipe = async (req, res) => {
  try {
    // check to see if there's another recipe by the same title
    const recipeExists = await Recipe.findOne({ title: req.body.title });
    if (recipeExists) {
      return res
        .status(409)
        .json({ msg: `A recipe named ${req.body.title} already exists.` });
    } else {
      const newRecipe = await Recipe.create(req.body);
      return res.status(201).json(newRecipe);
    }
  } catch (err) {
    console.log("server returns this error:", err);
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
  let keyword = req.params.keyword.replaceAll("_", " ");
  try {
    const regex = new RegExp(keyword, "i");
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { directions: { $regex: regex } },
        { "ingredients.item": { $regex: regex } },
      ],
    });
    if (recipes.length === 0) {
      throw new Error("No recipes found.");
    } else {
      return res.json(recipes);
    }
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

const updateAllRecipesOnMenu = async (req, res) => {
  //req.body has menuId and an array of recipeIds
  // console.log('menuId:', req.body.menuId)
  // console.log('recipe Ids:', req.body.recipeIds)
  try {
    const recipesWithMenus = await Recipe.updateMany(
      { _id: { $in: req.body.recipeIds } },
      { $push: { menus: req.body.menuId } },
      {new: true}
    );
    return res.json(recipesWithMenus.data)
  } catch (err) {
    console.log(err);
  }
};

// Delete
const deleteRecipe = async (req, res) => {
  try {
    console.log('deleteing called')
    const recipeId = req.params.id
    // const removeRecipeFromMenus = await Menu.UpdateMenuByDeletingRecipe({_id: recipeId})
    const deleteConfirmed = await Recipe.findByIdAndDelete({
      _id: recipeId,
    });
    // delete recipe Id from any menus
    return res.json(deleteConfirmed);
  } catch (err) {
    res.json(err);
  }
};

const deleteAllMenus = async (req, res) => {
  try {
    const nuclearBlast = await Recipe.updateMany({}, { $unset: {menus: []}})
    console.log(nuclearBlast)
  } catch (error) {
    console.log(error)
  }
}
export {
  createRecipe,
  getAllRecipes,
  getOneRecipeById,
  getRecipesByKeyword,
  updateRecipe,
  updateAllRecipesOnMenu,
  deleteRecipe,
  deleteAllMenus
};
