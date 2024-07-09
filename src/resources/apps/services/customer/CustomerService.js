import CustomerRepository from "../../repositories/customer/CustomerRepository.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";
import { generateAuthResponse } from "../../../../middleware/isAuthenticated.js";
import PasswordService from "../../../../middleware/hashing.js";

class CustomerService {
  static async register(customerData) {
    try {
      const existingCustomer = await CustomerRepository.findByEmail(customerData.email);

      if (existingCustomer) {
        throw new CustomError("Email already in use", 400);
      }

      const hashedPassword = await PasswordService.hash(customerData.password);

      const newCustomer = await CustomerRepository.create({
        ...customerData,
        password: hashedPassword,
      });

      return generateAuthResponse(newCustomer);
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const customer = await CustomerRepository.findByEmail(email);

      if (!customer) {
        throw new CustomError("Invalid email", 401);
      }

      const checkPassword = await PasswordService.compare(password, customer.password);

      if (!checkPassword) {
        throw new CustomError("Incorrect password, input the correct details and try again", 401);
      }

      return generateAuthResponse(customer);
    } catch (error) {
      throw error;
    }
  }

  static async getAllCustomers() {
    try {
      const cust = await CustomerRepository.findAll();
      return cust;
    } catch (erroor) {
      throw error;
    }
  }

  static async getCustomerById(id) {
    const customer = await CustomerRepository.findById(id);
    if (!customer) {
      throw new CustomError("Customer not found", 404);
    }
    return customer;
  }

  static async getCustomerByEmail(email) {
    try {
      const customer = await CustomerRepository.findByEmail(email);
      if (!customer) {
        throw new CustomError("Customer not found", 404);
      }
      return customer;
    } catch (error) {
      throw error;
    }
  }

  static createCustomer(customerData) {
    try {
      return CustomerRepository.create(customerData);
    } catch (err) {
      throw new CustomError(err.message, 500);
    }
  }

  static async updateCustomer(id, customerData) {
    try {
      const updatedCustomer = await CustomerRepository.update(id, customerData);
      if (!updatedCustomer) {
        throw new CustomError("Customer not found", 404);
      }
      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCustomer(id) {
    try {
      const deletedCustomer = await CustomerRepository.delete(id);
      if (!deletedCustomer) {
        throw new CustomError("Customer not found", 404);
      }
      return deletedCustomer;
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerService;
