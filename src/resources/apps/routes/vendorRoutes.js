import { Router } from "express";
import vendorController from "../controllers/vendor/VendorController.js";
import authController from "../controllers/authentication/AuthController.js";

const router = Router();

router.post("/auth/sign-up", authController.vendorSignup);
router.post("/auth/log-in", authController.vendorLogin);

router.get("/", vendorController.listVendors);
router.post("/", vendorController.createVendor);
router.get("/:id", vendorController.getVendor);
router.put("/:id", vendorController.updateVendor);
router.delete("/:id", vendorController.deleteVendor);

export default router;
