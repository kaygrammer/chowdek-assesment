import CustomerService from "../../resources/apps/services/customer/CustomerService.js";
import CustomerRepository from "../../resources/apps/repositories/customer/CustomerRepository.js";
import PasswordService from "../../middleware/hashing.js";
import { generateAuthResponse } from "../../middleware/isAuthenticated.js";
import { CustomError } from "../../utils/lib/custom-error-handler.js";

jest.mock("../../middleware/hashing.js");
jest.mock("../../middleware/isAuthenticated.js");

describe("CustomerService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new customer", async () => {
      const customerData = { email: "test@example.com", password: "password123", name: "kayode", phone: "08155794698" };
      const hashedPassword = "hashedPassword123";
      const newCustomer = { id: 1, ...customerData, password: hashedPassword };

      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue(null);
      jest.spyOn(CustomerRepository, "create").mockResolvedValue(newCustomer);
      PasswordService.hash.mockResolvedValue(hashedPassword);
      generateAuthResponse.mockReturnValue("authResponse");

      const result = await CustomerService.register(customerData);

      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(customerData.email);
      expect(PasswordService.hash).toHaveBeenCalledWith(customerData.password);
      expect(CustomerRepository.create).toHaveBeenCalledWith({ ...customerData, password: hashedPassword });
      expect(generateAuthResponse).toHaveBeenCalledWith(newCustomer);
      expect(result).toBe("authResponse");
    });

    it("should throw an error if email is already in use", async () => {
      const customerData = { email: "test@example.com", password: "password123" };

      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue({ id: 1, email: "test@example.com" });

      await expect(CustomerService.register(customerData)).rejects.toThrow(CustomError);
      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(customerData.email);
    });
  });

  describe("login", () => {
    it("should login a customer with valid credentials", async () => {
      const email = "test@example.com";
      const password = "password123";
      const hashedPassword = "hashedPassword123";
      const customer = { id: 1, email, password: hashedPassword, name: "kayode", phone: "08155794698" };

      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue(customer);
      PasswordService.compare.mockResolvedValue(true);
      generateAuthResponse.mockReturnValue("authResponse");

      const result = await CustomerService.login(email, password);

      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(PasswordService.compare).toHaveBeenCalledWith(password, customer.password);
      expect(generateAuthResponse).toHaveBeenCalledWith(customer);
      expect(result).toBe("authResponse");
    });

    it("should throw an error if email is invalid", async () => {
      const email = "test@example.com";
      const password = "password123";

      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue(null);

      await expect(CustomerService.login(email, password)).rejects.toThrow(CustomError);
      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it("should throw an error if password is incorrect", async () => {
      const email = "test@example.com";
      const password = "password123";
      const hashedPassword = "hashedPassword123";
      const customer = { id: 1, email, password: hashedPassword, name: "kayode", phone: "08155794698" };

      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue(customer);
      PasswordService.compare.mockResolvedValue(false);

      await expect(CustomerService.login(email, password)).rejects.toThrow(CustomError);
      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(PasswordService.compare).toHaveBeenCalledWith(password, customer.password);
    });
  });

  describe("getAllCustomers", () => {
    it("should return all customers", async () => {
      const customers = [
        { id: 1, email: "test1@example.com" },
        { id: 2, email: "test2@example.com" },
      ];
      jest.spyOn(CustomerRepository, "findAll").mockResolvedValue(customers);

      const result = await CustomerService.getAllCustomers();

      expect(CustomerRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(customers);
    });
  });

  describe("getCustomerById", () => {
    it("should return a customer by ID", async () => {
      const customer = { id: 1, email: "test@example.com" };
      jest.spyOn(CustomerRepository, "findById").mockResolvedValue(customer);

      const result = await CustomerService.getCustomerById(1);

      expect(CustomerRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(customer);
    });

    it("should throw an error if customer not found", async () => {
      jest.spyOn(CustomerRepository, "findById").mockResolvedValue(null);

      await expect(CustomerService.getCustomerById(1)).rejects.toThrow(CustomError);
      expect(CustomerRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe("getCustomerByEmail", () => {
    it("should return a customer by email", async () => {
      const customer = { id: 1, email: "test@example.com" };
      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue(customer);

      const result = await CustomerService.getCustomerByEmail("test@example.com");

      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
      expect(result).toEqual(customer);
    });

    it("should throw an error if customer not found", async () => {
      jest.spyOn(CustomerRepository, "findByEmail").mockResolvedValue(null);

      await expect(CustomerService.getCustomerByEmail("test@example.com")).rejects.toThrow(CustomError);
      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
    });
  });

  describe("createCustomer", () => {
    it("should create a new customer", async () => {
      const customerData = { email: "test@example.com", password: "password123", name: "kayode", phone: "08155794698" };
      const newCustomer = { id: 1, ...customerData };

      jest.spyOn(CustomerRepository, "create").mockResolvedValue(newCustomer);

      const result = await CustomerService.createCustomer(customerData);

      expect(CustomerRepository.create).toHaveBeenCalledWith(customerData);
      expect(result).toEqual(newCustomer);
    });
  });

  describe("updateCustomer", () => {
    it("should update a customer", async () => {
      const customerData = { name: "newName" };
      const updatedCustomer = { id: 1, email: "test@example.com", ...customerData };

      jest.spyOn(CustomerRepository, "update").mockResolvedValue(updatedCustomer);

      const result = await CustomerService.updateCustomer(1, customerData);

      expect(CustomerRepository.update).toHaveBeenCalledWith(1, customerData);
      expect(result).toEqual(updatedCustomer);
    });

    it("should throw an error if customer not found", async () => {
      const customerData = { name: "newName" };
      jest.spyOn(CustomerRepository, "update").mockResolvedValue(null);

      await expect(CustomerService.updateCustomer(1, customerData)).rejects.toThrow(CustomError);
      expect(CustomerRepository.update).toHaveBeenCalledWith(1, customerData);
    });
  });

  describe("deleteCustomer", () => {
    it("should delete a customer", async () => {
      const deletedCustomer = { id: 1, email: "test@example.com" };
      jest.spyOn(CustomerRepository, "delete").mockResolvedValue(deletedCustomer);

      const result = await CustomerService.deleteCustomer(1);

      expect(CustomerRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(deletedCustomer);
    });

    it("should throw an error if customer not found", async () => {
      jest.spyOn(CustomerRepository, "delete").mockResolvedValue(null);

      await expect(CustomerService.deleteCustomer(1)).rejects.toThrow(CustomError);
      expect(CustomerRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
