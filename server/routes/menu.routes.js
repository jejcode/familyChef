import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  getOneMenuById,
  updateMenu,
} from "../controllers/menu.controller.js";

const menuRouter = Router();

menuRouter.get("/all", getAllMenus);
menuRouter.get("/:id", getOneMenuById);
menuRouter.post("/new", createMenu);
menuRouter.put("/:id/edit", updateMenu);
menuRouter.delete("/:id/delete", deleteMenu);

export default menuRouter;