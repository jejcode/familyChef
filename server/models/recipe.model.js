import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: 40
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: 250
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
    type: [{
      item: {type: String, required:[true, "Ingredient needs a name"]},
      amount: {type: String, required: [true, "Amount is required"]},
      measurement: {type: String, required: [true, "Measurement/Qunatity is required"]}
    }],
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
