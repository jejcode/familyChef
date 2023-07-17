import Menu from "../models/menu.model.js";

const createMenu = async (req, res) => {
  try {
    const newMenu = await Menu.create(req.body);
    return res.json(newMenu);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllMenus = async (req, res) => {
  try {
    const allMenus = await Menu.find();
    return res.json(allMenus);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getOneMenuById = async (req, res) => {
  try {
    const menu = await Menu.findOne({ _id: req.params.id }).populate("recipes");
    return res.json(menu);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const getMenuByDate = async (req, res) => {
  try {
    const menu = await Menu.findOne({ date: req.body.dateString }).populate(
      "recipes"
    );
    return res.json(menu);
  } catch (error) {
    console.log(error);
  }
};

const getMenusByDateRange = async (req, res) => {
  try {
    const menuRange = await Menu.find({
      date: { $gte: req.query.start, $lte: req.query.end },
    })
      .populate("recipes")
      .sort({ date: 'asc' });
    return res.json(menuRange);
  } catch (error) {
    console.log(error);
  }
};

const updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json(updatedMenu);
  } catch (err) {
    res.status(400).json(err);
  }
};

const UpdateMenuByDeletingRecipe = async (req, res) => {
  try {
    console.log("removing recipeids from menu", req.body);
    const updatedMenu = await Menu.updateMany(
      { recipes: { $in: req.body._id } },
      { $pullAll: { recipes: [req.body._id] } },
      { new: true }
    );
    return res.json(updatedMenu);
  } catch (error) {
    console.log(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const deleteConfirmed = await Menu.findByIdAndDelete({
      _id: req.params.id,
    });
    return res.json(deleteConfirmed);
  } catch (err) {
    return res.status(403).json(err);
  }
};

export {
  createMenu,
  getAllMenus,
  getOneMenuById,
  getMenuByDate,
  getMenusByDateRange,
  updateMenu,
  UpdateMenuByDeletingRecipe,
  deleteMenu,
};
