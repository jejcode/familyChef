import { Router } from "express";
import { createMenu, getAllMenus } from "../controllers/menu.controller.js";

const menuRouter = Router()

menuRouter.get("/all", getAllMenus)
menuRouter.post("/new", createMenu)

export default menuRouter

