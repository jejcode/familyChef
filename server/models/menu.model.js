import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: [true, "Date is required"] 
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  notes: {
    type: String,
    maxlength: 250
  }
});

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
