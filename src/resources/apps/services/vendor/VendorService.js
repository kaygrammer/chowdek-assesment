import VendorRepository from "../../repositories/vendor/VendorRepository.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";
import PasswordService from "../../../../middleware/hashing.js";
import { generateAuthResponse } from "../../../../middleware/isAuthenticated.js";

class VendorService {
  static async register(vendorData) {
    try {
      const existingVendor = await VendorRepository.findByEmail(vendorData.email);

      if (existingVendor) {
        throw new CustomError("Email already in use", 400);
      }

      const hashedPassword = await PasswordService.hash(vendorData.password);

      const newVendor = await VendorRepository.create({
        ...vendorData,
        password: hashedPassword,
      });

      return generateAuthResponse(newVendor);
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const vendor = await VendorRepository.findByEmail(email);
      if (!vendor) {
        throw new CustomError("Vendor does not exist", 401);
      }

      const checkPassword = await PasswordService.compare(password, vendor.password);

      if (!checkPassword) {
        throw new CustomError("Incorrect password, input the correct details and try again");
      }

      return generateAuthResponse(vendor);
    } catch (error) {
      throw error;
    }
  }
  static async getAllVendors() {
    return await VendorRepository.findAll();
  }

  static async getVendorById(id) {
    return await VendorRepository.findById(id);
  }

  static async createVendor(vendorData) {
    return await VendorRepository.create(vendorData);
  }

  static async updateVendor(id, vendorData) {
    return await VendorRepository.update(id, vendorData);
  }

  static async deleteVendor(id) {
    return VendorRepository.delete(id);
  }
}

export default VendorService;
