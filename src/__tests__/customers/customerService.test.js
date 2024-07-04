import CustomerService from "../../../src/resources/apps/services/customer/CustomerService.js";
import CustomerRepository from "../../../src/resources/apps/repositories/customer/CustomerRepository.js";
import { CustomError } from "../../../src/utils/lib/custom-error-handler.js";
import PasswordService from "../../../src/middleware/hashing.js";
import { generateAuthResponse } from "../../../src/middleware/isAuthenticated.js";

describe("CustomerService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("register", () => {
    const mockCustomerData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    beforeEach(() => {
      jest.clearAllMocks();

      CustomerRepository.findByEmail.mockResolvedValue(null);
      CustomerRepository.create.mockResolvedValue({ id: 1, ...mockCustomerData, password: "hashedPassword123" });
    });

    it("should register a new customer successfully", async () => {
      PasswordService.hash.mockResolvedValue("hashedPassword123");
      generateAuthResponse.mockReturnValue({ token: "fakeToken" });

      const result = await CustomerService.register(mockCustomerData);

      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(mockCustomerData.email);
      expect(PasswordService.hash).toHaveBeenCalledWith(mockCustomerData.password);
      expect(CustomerRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockCustomerData,
          password: "hashedPassword123",
        })
      );
      expect(generateAuthResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          ...mockCustomerData,
          password: "hashedPassword123",
        })
      );
      expect(result).toEqual({ token: "fakeToken" });
    });

    it("should throw an error if email is already in use", async () => {
      CustomerRepository.findByEmail.mockResolvedValue({ id: 1, email: mockCustomerData.email });

      await expect(CustomerService.register(mockCustomerData)).rejects.toThrow(CustomError);
      await expect(CustomerService.register(mockCustomerData)).rejects.toThrow("Email already in use");
      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(mockCustomerData.email);
    });

    it("should throw an error if hashing the password fails", async () => {
      CustomerRepository.findByEmail.mockResolvedValue(null);
      PasswordService.hash.mockRejectedValue(new Error("Hashing failed"));

      await expect(CustomerService.register(mockCustomerData)).rejects.toThrow("Hashing failed");
      expect(CustomerRepository.findByEmail).toHaveBeenCalledWith(mockCustomerData.email);
      expect(PasswordService.hash).toHaveBeenCalledWith(mockCustomerData.password);
    });
  });
});
