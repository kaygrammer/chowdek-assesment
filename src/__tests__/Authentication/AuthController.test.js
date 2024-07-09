import request from "supertest";
import express from "express";
import AuthController from "../../resources/apps/controllers/authentication/AuthController.js";
import CustomerService from "../../resources/apps/services/customer/CustomerService.js";
import VendorService from "../../resources/apps/services/vendor/VendorService.js";
import { successResMsg, errorResMsg } from "../../utils/lib/response.js";
import { customerSchema } from "../../utils/validation/validation.js";

jest.mock("../../resources/apps/services/customer/CustomerService.js");
jest.mock("../../resources/apps/services/vendor/VendorService.js");
jest.mock("../../utils/lib/response.js");
jest.mock("../../utils/validation/validation.js");

const app = express();
app.use(express.json());

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("customerSignup", () => {
    it("should register a customer", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const response = { id: 1, email: "test@example.com" };
      customerSchema.validate.mockReturnValue({ error: null });
      CustomerService.register.mockResolvedValue(response);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await AuthController.customerSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(CustomerService.register).toHaveBeenCalledWith(req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 201, {
        message: "Customer registered successfully",
        ...response,
      });
    });

    it("should return 400 if validation fails", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const validationError = { message: "Validation error" };
      customerSchema.validate.mockReturnValue({ error: validationError });
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await AuthController.customerSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(customerSchema.validate).toHaveBeenCalledWith(req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 400, validationError.message);
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      customerSchema.validate.mockReturnValue({ error: null });
      CustomerService.register.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await AuthController.customerSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.register).toHaveBeenCalledWith(req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("customerLogin", () => {
    it("should log in a customer", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const response = { id: 1, email: "test@example.com" };
      CustomerService.login.mockResolvedValue(response);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await AuthController.customerLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.login).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Customer logged in successfully",
        ...response,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.login.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await AuthController.customerLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.login).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("vendorSignup", () => {
    it("should register a vendor", async () => {
      const req = { body: { email: "vendor@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const response = { id: 1, email: "vendor@example.com" };
      VendorService.register.mockResolvedValue(response);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await AuthController.vendorSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(VendorService.register).toHaveBeenCalledWith(req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 201, {
        message: "Vendor registered successfully",
        ...response,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "vendor@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.register.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await AuthController.vendorSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.register).toHaveBeenCalledWith(req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("vendorLogin", () => {
    it("should log in a vendor", async () => {
      const req = { body: { email: "vendor@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const response = { id: 1, email: "vendor@example.com" };
      VendorService.login.mockResolvedValue(response);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await AuthController.vendorLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(VendorService.login).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Vendor logged in successfully",
        ...response,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "vendor@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      VendorService.login.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await AuthController.vendorLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(VendorService.login).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });
});
