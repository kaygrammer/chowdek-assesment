import VendorService from "../../services/vendor/VendorService.js";
import { successResMsg, errorResMsg } from "../../../../utils/lib/response.js";
import { CustomError, NotFoundError } from "../../../../utils/lib/custom-error-handler.js";

class VendorController {
  async listVendors(req, res) {
    try {
      const vendors = await VendorService.getAllVendors();

      if (!vendors || vendors.length === 0) {
        throw new NotFoundError("Vendors not found");
      }

      return successResMsg(res, 200, {
        message: "Vendors fetched successfully",
        vendors,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async getVendor(req, res) {
    const { id } = req.params;
    try {
      const vendor = await VendorService.getVendorById(id);
      if (!vendor) {
        throw new NotFoundError("Vendor not found");
      }
      return successResMsg(res, 200, {
        message: "Vendor fetched successfully",
        vendor,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async createVendor(req, res) {
    const vendorData = req.body;
    try {
      const newVendor = await VendorService.createVendor(vendorData);
      return successResMsg(res, 201, {
        message: "Vendor created successfully",
        newVendor,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async updateVendor(req, res) {
    const { id } = req.params;
    const vendorData = req.body;
    try {
      const updatedVendor = await VendorService.updateVendor(id, vendorData);
      return successResMsg(res, 200, {
        message: "Vendor updated successfully",
        updatedVendor,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async deleteVendor(req, res) {
    const { id } = req.params;
    try {
      await VendorService.deleteVendor(id);
      return successResMsg(res, 200, {
        message: "Vendor deleted successfully",
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }
}

export default new VendorController();
