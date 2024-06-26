import { Router } from "express";
import customerController from "../controllers/customer/CustomerController.js";
import vendorController from "../controllers/vendor/VendorController.js";
import authController from "../controllers/authentication/AuthController.js";
import AuthMiddleware from "../../../middleware/isAuthenticated.js";

const router = Router();

const authMiddleware = new AuthMiddleware();

router.post("/auth/sign-up", authController.customerSignup);
router.post("/auth/log-in", authController.customerLogin);

router.get("/vendors/all", authMiddleware.isAuthenticated, vendorController.listVendors);
router.get("/vendor/:id", authMiddleware.isAuthenticated, vendorController.getVendor);

router.get("/cust", customerController.getCustomerByEmail);
router.get("/", customerController.listCustomers);
router.post("/", customerController.createCustomer);
router.get("/:id", customerController.getCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;
