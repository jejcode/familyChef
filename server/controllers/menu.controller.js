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
    allMenus = await Menu.find();
    return res.json(allMenus);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getOneMenuById = async (req, res) => {
  try {
    const menu = Menu.findOne({_id: req.params.id})
    return res.json(menu)
  } catch (err) {
    res.status(400).json(err);
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
export { createMenu, getAllMenus, getOneMenuById, updateMenu };
