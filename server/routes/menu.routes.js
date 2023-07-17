import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  getMenuByDate,
  getMenusByDateRange,
  getOneMenuById,
  updateMenu,
  UpdateMenuByDeletingRecipe,
} from "../controllers/menu.controller.js";

const menuRouter = Router();

menuRouter.get("/all", getAllMenus);
// menuRouter.get("/search/date", getMenuByDate);
menuRouter.get("/search/range", getMenusByDateRange);
menuRouter.get("/:id/view", getOneMenuById);
menuRouter.post("/new", createMenu);
menuRouter.put("/:id/edit", updateMenu);
menuRouter.put("/:id/recipes_list/edit", UpdateMenuByDeletingRecipe);
menuRouter.delete("/:id/delete", deleteMenu);

export default menuRouter;