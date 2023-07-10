import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: [true, "Date is required"] 
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "At least one recipe is required"],
    ref: "Recipe"
  }],
});

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
