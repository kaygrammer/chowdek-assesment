import jwt from "jsonwebtoken";
import { errorResMsg } from "../utils/lib/response.js";
import VendorRepository from "../resources/apps/repositories/vendor/VendorRepository.js";
import dotenv from "dotenv";

dotenv.config();

const vendorRepository = new VendorRepository();

class AuthMiddleware {
  async isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return errorResMsg(res, 401, "Authentication failed");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) return errorResMsg(res, 401, "Authentication failed");
      req.user = decoded;
      next();
    } catch (error) {
      return errorResMsg(res, 401, "Authentication failed: 🔒🔒🔒🔒🔒");
    }
  }

  async isVendor(req, res, next) {
    try {
      const vendorId = req.user.id;
      const vendor = await vendorRepository.findById(vendorId);

      if (!vendor) {
        return errorResMsg(res, 401, "You must be a vendor to access this contents");
      }

      next();
    } catch (error) {
      return errorResMsg(res, 403, error.message);
    }
  }
}

export default AuthMiddleware;

const generateAuthResponse = (payload) => {
  const token = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, {
    expiresIn: "2day",
  });
  return {
    token,
    user: {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    },
  };
};

export { generateAuthResponse };
