import VendorService from "../../resources/apps/services/vendor/VendorService.js";
import VendorRepository from "../../resources/apps/repositories/vendor/VendorRepository.js";
import { CustomError } from "../../utils/lib/custom-error-handler.js";
import PasswordService from "../../middleware/hashing.js";
import { generateAuthResponse } from "../../middleware/isAuthenticated.js";

jest.mock("../../resources/apps/repositories/vendor/VendorRepository.js", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findByEmail: jest.fn(),
  delete: jest.fn(),
}));

jest.mock("../../middleware/hashing.js");
jest.mock("../../middleware/isAuthenticated.js");

describe("VendorService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new vendor", async () => {
      const vendorData = { email: "test@example.com", password: "password123" };
      const hashedPassword = "hashedPassword123";
      const newVendor = { id: "123e4567-e89b-12d3-a456-426614174000", ...vendorData, password: hashedPassword };
      const authResponse = { token: "jwt-token", vendor: newVendor };

      VendorRepository.findByEmail.mockResolvedValue(null);
      PasswordService.hash.mockResolvedValue(hashedPassword);
      VendorRepository.create.mockResolvedValue(newVendor);
      generateAuthResponse.mockReturnValue(authResponse);

      const result = await VendorService.register(vendorData);

      expect(VendorRepository.findByEmail).toHaveBeenCalledWith(vendorData.email);
      expect(PasswordService.hash).toHaveBeenCalledWith(vendorData.password);
      expect(VendorRepository.create).toHaveBeenCalledWith({ ...vendorData, password: hashedPassword });
      expect(generateAuthResponse).toHaveBeenCalledWith(newVendor);
      expect(result).toEqual(authResponse);
    });

    it("should handle errors during vendor registration", async () => {
      const vendorData = { email: "test@example.com", password: "password123" };
      const errorMessage = "Database error";

      VendorRepository.findByEmail.mockRejectedValue(new CustomError(errorMessage, 500));

      await expect(VendorService.register(vendorData)).rejects.toThrow(CustomError);
      expect(VendorRepository.findByEmail).toHaveBeenCalledWith(vendorData.email);
    });
  });

  describe("login", () => {
    it("should log in an existing vendor", async () => {
      const email = "test@example.com";
      const password = "password123";
      const vendor = { id: "123e4567-e89b-12d3-a456-426614174000", email, password: "hashedPassword123" };
      const authResponse = { token: "jwt-token", vendor };

      VendorRepository.findByEmail.mockResolvedValue(vendor);
      PasswordService.compare.mockResolvedValue(true);
      generateAuthResponse.mockReturnValue(authResponse);

      const result = await VendorService.login(email, password);

      expect(VendorRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(PasswordService.compare).toHaveBeenCalledWith(password, vendor.password);
      expect(generateAuthResponse).toHaveBeenCalledWith(vendor);
      expect(result).toEqual(authResponse);
    });

    it("should handle incorrect password during login", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";
      const vendor = { id: "123e4567-e89b-12d3-a456-426614174000", email, password: "hashedPassword123" };

      VendorRepository.findByEmail.mockResolvedValue(vendor);
      PasswordService.compare.mockResolvedValue(false);

      await expect(VendorService.login(email, password)).rejects.toThrow(CustomError);
      expect(VendorRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(PasswordService.compare).toHaveBeenCalledWith(password, vendor.password);
    });

    it("should handle errors during vendor login", async () => {
      const email = "test@example.com";
      const password = "password123";
      const errorMessage = "Database error";

      VendorRepository.findByEmail.mockRejectedValue(new Error(errorMessage));

      await expect(VendorService.login(email, password)).rejects.toThrow(Error);
      expect(VendorRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe("getAllVendors", () => {
    it("should fetch all vendors", async () => {
      const vendors = [
        { id: "1", email: "vendor1@example.com" },
        { id: "2", email: "vendor2@example.com" },
      ];

      VendorRepository.findAll.mockResolvedValue(vendors);

      const result = await VendorService.getAllVendors();

      expect(VendorRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(vendors);
    });

    it("should handle errors during fetching all vendors", async () => {
      const errorMessage = "Database error";

      VendorRepository.findAll.mockRejectedValue(new CustomError(errorMessage, 500));

      await expect(VendorService.getAllVendors()).rejects.toThrow(CustomError);
      expect(VendorRepository.findAll).toHaveBeenCalled();
    });
  });

  describe("getVendorById", () => {
    it("should fetch vendor by ID", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const vendor = { id, email: "test@example.com" };

      VendorRepository.findById.mockResolvedValue(vendor);

      const result = await VendorService.getVendorById(id);

      expect(VendorRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(vendor);
    });

    it("should handle errors during fetching vendor by ID", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const errorMessage = "Database error";

      VendorRepository.findById.mockRejectedValue(new CustomError(errorMessage, 500));

      await expect(VendorService.getVendorById(id)).rejects.toThrow(CustomError);
      expect(VendorRepository.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("createVendor", () => {
    it("should create a new vendor", async () => {
      const vendorData = { email: "test@example.com", password: "password123" };
      const newVendor = { id: "123e4567-e89b-12d3-a456-426614174000", ...vendorData };

      VendorRepository.create.mockResolvedValue(newVendor);

      const result = await VendorService.createVendor(vendorData);

      expect(VendorRepository.create).toHaveBeenCalledWith(vendorData);
      expect(result).toEqual(newVendor);
    });

    it("should handle errors during vendor creation", async () => {
      const vendorData = { email: "test@example.com", password: "password123" };
      const errorMessage = "Database error";

      VendorRepository.create.mockRejectedValue(new CustomError(errorMessage, 500));

      await expect(VendorService.createVendor(vendorData)).rejects.toThrow(CustomError);
      expect(VendorRepository.create).toHaveBeenCalledWith(vendorData);
    });
  });

  describe("updateVendor", () => {
    it("should update a vendor", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const vendorData = { email: "updated@example.com" };
      const updatedVendor = { id, ...vendorData };

      VendorRepository.update.mockResolvedValue([1, [updatedVendor]]);

      const result = await VendorService.updateVendor(id, vendorData);

      expect(VendorRepository.update).toHaveBeenCalledWith(id, vendorData);
      expect(result).toEqual([1, [updatedVendor]]);
    });

    it("should handle errors during vendor update", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const vendorData = { email: "updated@example.com" };
      const errorMessage = "Database error";

      VendorRepository.update.mockRejectedValue(new CustomError(errorMessage, 500));

      await expect(VendorService.updateVendor(id, vendorData)).rejects.toThrow(CustomError);
      expect(VendorRepository.update).toHaveBeenCalledWith(id, vendorData);
    });
  });

  describe("deleteVendor", () => {
    it("should delete a vendor", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";

      VendorRepository.delete.mockResolvedValue(1);

      const result = await VendorService.deleteVendor(id);

      expect(VendorRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(1);
    });

    it("should handle errors during vendor deletion", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const errorMessage = "Database error";

      VendorRepository.delete.mockRejectedValue(new CustomError(errorMessage, 500));

      await expect(VendorService.deleteVendor(id)).rejects.toThrow(CustomError);
      expect(VendorRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
