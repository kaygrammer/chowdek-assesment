import VendorController from "../../resources/apps/controllers/vendor/VendorController.js";
import VendorService from "../../resources/apps/services/vendor/VendorService.js";
import { successResMsg, errorResMsg } from "../../utils/lib/response.js";

jest.mock("../../resources/apps/services/vendor/VendorService.js");
jest.mock("../../utils/lib/response.js");

describe("VendorController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listVendors", () => {
    it("should return a list of vendors", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const vendors = [{ id: 1, name: "Vendor 1" }];
      VendorService.getAllVendors.mockResolvedValue(vendors);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await VendorController.listVendors(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(VendorService.getAllVendors).toHaveBeenCalled();
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Vendors fetched successfully",
        vendors,
      });
    });

    it("should return 404 if no vendors are found", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      VendorService.getAllVendors.mockResolvedValue([]);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.listVendors(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(VendorService.getAllVendors).toHaveBeenCalled();
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Vendors not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.getAllVendors.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.listVendors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.getAllVendors).toHaveBeenCalled();
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("getVendor", () => {
    it("should return a vendor by id", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const vendor = { id: 1, name: "Vendor 1" };
      VendorService.getVendorById.mockResolvedValue(vendor);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await VendorController.getVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(VendorService.getVendorById).toHaveBeenCalledWith("1");
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Vendor fetched successfully",
        vendor,
      });
    });

    it("should return 404 if vendor not found", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      VendorService.getVendorById.mockResolvedValue(null);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.getVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(VendorService.getVendorById).toHaveBeenCalledWith("1");
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Vendor not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.getVendorById.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.getVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.getVendorById).toHaveBeenCalledWith("1");
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("createVendor", () => {
    it("should create a new vendor", async () => {
      const req = { body: { name: "New Vendor" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const newVendor = { id: 1, name: "New Vendor" };
      VendorService.createVendor.mockResolvedValue(newVendor);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await VendorController.createVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(VendorService.createVendor).toHaveBeenCalledWith(req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 201, {
        message: "Vendor created successfully",
        newVendor,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { name: "New Vendor" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.createVendor.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.createVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.createVendor).toHaveBeenCalledWith(req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("updateVendor", () => {
    it("should update an existing vendor", async () => {
      const req = { params: { id: "1" }, body: { name: "Updated Vendor" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const updatedVendor = { id: 1, name: "Updated Vendor" };
      VendorService.updateVendor.mockResolvedValue(updatedVendor);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await VendorController.updateVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(VendorService.updateVendor).toHaveBeenCalledWith("1", req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Vendor updated successfully",
        updatedVendor,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" }, body: { name: "Updated Vendor" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.updateVendor.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.updateVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.updateVendor).toHaveBeenCalledWith("1", req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("deleteVendor", () => {
    it("should delete an existing vendor", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      VendorService.deleteVendor.mockResolvedValue();
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await VendorController.deleteVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(VendorService.deleteVendor).toHaveBeenCalledWith("1");
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Vendor deleted successfully",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.deleteVendor.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await VendorController.deleteVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.deleteVendor).toHaveBeenCalledWith("1");
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });
});
