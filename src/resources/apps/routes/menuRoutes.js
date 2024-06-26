import { Router } from "express";
import menuController from "../controllers/menu/MenuController.js";
import AuthMiddleware from "../../../middleware/isAuthenticated.js";

const router = Router();
const authMiddleware = new AuthMiddleware();

router.get("/", authMiddleware.isAuthenticated, menuController.listMenus);
router.get("/all/:vendorId", authMiddleware.isAuthenticated, menuController.listMenusByVendor);
router.post("/", authMiddleware.isAuthenticated, authMiddleware.isVendor, menuController.createMenu);
router.get("/:id", authMiddleware.isAuthenticated, menuController.getMenu);
router.put("/:id", authMiddleware.isAuthenticated, authMiddleware.isVendor, menuController.updateMenu);

router.delete("/:id", authMiddleware.isAuthenticated, authMiddleware.isVendor, menuController.deleteMenu);

export default router;
