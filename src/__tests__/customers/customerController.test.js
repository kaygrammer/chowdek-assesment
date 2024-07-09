import request from "supertest";
import express from "express";
import CustomerController from "../../resources/apps/controllers/customer/CustomerController.js";
import CustomerService from "../../resources/apps/services/customer/CustomerService.js";
import { successResMsg, errorResMsg } from "../../utils/lib/response.js";

jest.mock("../../resources/apps/services/customer/CustomerService.js");
jest.mock("../../utils/lib/response.js");

const app = express();
app.use(express.json());

describe("CustomerController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listCustomers", () => {
    it("should return a list of customers", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const customers = [{ id: 1, email: "test@example.com" }];
      CustomerService.getAllCustomers.mockResolvedValue(customers);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await CustomerController.listCustomers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.getAllCustomers).toHaveBeenCalled();
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "customers fetched successfully",
        customers,
      });
    });

    it("should return 404 if no customers are found", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      CustomerService.getAllCustomers.mockResolvedValue([]);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.listCustomers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(CustomerService.getAllCustomers).toHaveBeenCalled();
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Customers not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.getAllCustomers.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.listCustomers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.getAllCustomers).toHaveBeenCalled();
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "oops something went wrong...");
    });
  });

  describe("getCustomer", () => {
    it("should return a customer by id", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const customer = { id: 1, email: "test@example.com" };
      CustomerService.getCustomerById.mockResolvedValue(customer);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await CustomerController.getCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.getCustomerById).toHaveBeenCalledWith(1);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "customers fetched successfully",
        customer,
      });
    });

    it("should return 404 if customer is not found", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      CustomerService.getCustomerById.mockResolvedValue(null);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.getCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(CustomerService.getCustomerById).toHaveBeenCalledWith(1);
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Customers not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.getCustomerById.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.getCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.getCustomerById).toHaveBeenCalledWith(1);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "oops something went wrong...");
    });
  });

  describe("getCustomerByEmail", () => {
    it("should return a customer by email", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const customer = { id: 1, email: "test@example.com" };
      CustomerService.getCustomerByEmail.mockResolvedValue(customer);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await CustomerController.getCustomerByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.getCustomerByEmail).toHaveBeenCalledWith("test@example.com");
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "customers fetched successfully",
        customer,
      });
    });

    it("should return 404 if customer is not found", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      CustomerService.getCustomerByEmail.mockResolvedValue(null);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.getCustomerByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(CustomerService.getCustomerByEmail).toHaveBeenCalledWith("test@example.com");
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Customers not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.getCustomerByEmail.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.getCustomerByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.getCustomerByEmail).toHaveBeenCalledWith("test@example.com");
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "oops something went wrong...");
    });
  });

  describe("createCustomer", () => {
    it("should create a new customer", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const newCustomer = { id: 1, email: "test@example.com" };
      CustomerService.createCustomer.mockResolvedValue(newCustomer);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await CustomerController.createCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.createCustomer).toHaveBeenCalledWith(req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "customers fetched successfully",
        newCustomer,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.createCustomer.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.createCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.createCustomer).toHaveBeenCalledWith(req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "oops something went wrong...");
    });
  });

  describe("createCustomer", () => {
    it("should create a new customer", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const newCustomer = { id: 1, email: "test@example.com" };
      CustomerService.createCustomer.mockResolvedValue(newCustomer);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await CustomerController.createCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.createCustomer).toHaveBeenCalledWith(req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "customers fetched successfully",
        newCustomer,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.createCustomer.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.createCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.createCustomer).toHaveBeenCalledWith(req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "oops something went wrong...");
    });
  });

  describe("updateCustomer", () => {
    it("should update an existing customer", async () => {
      const req = { params: { id: 1 }, body: { email: "newemail@example.com" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const updatedCustomer = { id: 1, email: "newemail@example.com" };
      CustomerService.updateCustomer.mockResolvedValue(updatedCustomer);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await CustomerController.updateCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(CustomerService.updateCustomer).toHaveBeenCalledWith(1, req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "customers updated successfully",
        updatedCustomer,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: 1 }, body: { email: "newemail@example.com" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      CustomerService.updateCustomer.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await CustomerController.updateCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(CustomerService.updateCustomer).toHaveBeenCalledWith(1, req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "oops something went wrong...");
    });
  });
});
