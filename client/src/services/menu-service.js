import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const createMenu = async (formData) => {
  try {
    const newMenu = await instance.post("menus/new", formData);
    return newMenu.data;
  } catch (err) {
    console.log(err);
  }
};
const getAllMenus = async () => {
  try {
    const allMenus = await instance.get("menus/all");
    return allMenus.data;
  } catch (err) {
    console.log(err);
  }
};

const getMenuById = async (menuId) => {
  try {
    const menu = await instance.get(`menus/${menuId}/view`);
    return menu.data;
  } catch (error) {
    console.log(error);
  }
};

const getMenuByDate = async (dateString) => {
  try {
    const menu = await instance.get(`/menus/search/date`, { dateString });
    return menu.data;
  } catch (error) {
    console.log(error);
  }
};
const getMenusByDateRange = async (dateRange) => {
  try {
    console.log(dateRange)
    const filteredMenus = await instance.get('/menus/search/range', {params: dateRange});
    console.log(filteredMenus.data)
    return filteredMenus.data;
  } catch (error) {
    console.log(error);
  }
};

const updateMenuById = async (menuId, menuData) => {
  try {
    const updatedMenu = await instance.put(`menus/${menuId}/edit`, menuData);
    return updatedMenu.data;
  } catch (error) {
    console.log(error);
  }
};

const updateMenuRecipes = async (menuId, recipeId) => {
  try {
    const menuWithoutRecipe = await instance.put(
      `/menus/${menuId}/recipes_list/edit`,
      { _id: recipeId }
    );
    return menuWithoutRecipe.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteMenuById = async (menuId) => {
  try {
    const deletedMenu = await instance.delete(`/menus/${menuId}/delete`);
    return deletedMenu.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createMenu,
  getAllMenus,
  getMenuById,
  getMenuByDate,
  getMenusByDateRange,
  updateMenuById,
  updateMenuRecipes,
  deleteMenuById
};
