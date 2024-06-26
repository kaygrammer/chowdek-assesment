import VendorRepository from "../../repositories/vendor/VendorRepository.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";
import { passwordCompare, passwordHash } from "../../../../middleware/hashing.js";
import { generateAuthResponse } from "../../../../middleware/isAuthenticated.js";

class VendorService {
  constructor() {
    this.vendorRepository = new VendorRepository();
  }

  async register(vendorData) {
    try {
      const existingVendor = await this.vendorRepository.findByEmail(vendorData.email);

      if (existingVendor) {
        throw new CustomError("Email already in use", 400);
      }

      const hashedPassword = await passwordHash(vendorData.password);

      const newVendor = await this.vendorRepository.create({
        ...vendorData,
        password: hashedPassword,
      });

      return generateAuthResponse(newVendor);
    } catch (err) {
      throw err;
    }
  }

  async login(email, password) {
    try {
      const vendor = await this.vendorRepository.findByEmail(email);
      if (!vendor) {
        throw new CustomError("Vendor does not exist", 401);
      }

      const checkPassword = await passwordCompare(password, vendor.password);

      if (!checkPassword) {
        throw new CustomError("Incorrect password, input the correct details and try again");
      }

      return generateAuthResponse(vendor);
    } catch (err) {
      throw err;
    }
  }
  getAllVendors() {
    return this.vendorRepository.findAll();
  }

  getVendorById(id) {
    return this.vendorRepository.findById(id);
  }

  createVendor(vendorData) {
    return this.vendorRepository.create(vendorData);
  }

  updateVendor(id, vendorData) {
    return this.vendorRepository.update(id, vendorData);
  }

  deleteVendor(id) {
    return this.vendorRepository.delete(id);
  }
}

export default VendorService;
