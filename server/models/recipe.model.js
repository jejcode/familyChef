import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  prepTime: {
    type: String,
  },
  servings: {
    type: Number,
  },
  directions: {
    type: String,
    required: [true, "Directions are required"],
  },
  ingredients: {
    type: [{}],
    required: [true, "Ingredients are required"],
  },
  menus: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
});
const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
