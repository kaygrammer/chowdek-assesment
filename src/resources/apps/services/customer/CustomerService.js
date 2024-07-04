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
    } catch (err) {
      throw err;
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
    } catch (err) {
      throw err;
    }
  }

  static async getAllCustomers() {
    return await CustomerRepository.findAll();
  }

  static async getCustomerById(id) {
    return await CustomerRepository.findById(id);
  }

  static async getCustomerByEmail(email) {
    return await CustomerRepository.findByEmail(email);
  }

  static createCustomer(customerData) {
    return CustomerRepository.create(customerData);
  }

  static updateCustomer(id, customerData) {
    return CustomerRepository.update(id, customerData);
  }

  static deleteCustomer(id) {
    return CustomerRepository.delete(id);
  }
}

export default CustomerService;
