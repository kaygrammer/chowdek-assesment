import CustomerRepository from "../../repositories/customer/CustomerRepository.js";
import { CustomError, NotFoundError } from "../../../../utils/lib/custom-error-handler.js";
import { generateAuthResponse } from "../../../../middleware/isAuthenticated.js";
import { passwordCompare, passwordHash } from "../../../../middleware/hashing.js";

class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async register(customerData) {
    try {
      const existingCustomer = await this.customerRepository.findByEmail(customerData.email);

      if (existingCustomer) {
        throw new CustomError("Email already in use", 400);
      }

      const hashedPassword = await passwordHash(customerData.password);

      const newCustomer = await this.customerRepository.create({
        ...customerData,
        password: hashedPassword,
      });

      return generateAuthResponse(newCustomer);
    } catch (err) {
      throw err;
    }
  }

  async login(email, password) {
    try {
      const customer = await this.customerRepository.findByEmail(email);

      if (!customer) {
        throw new CustomError("Invalid email", 401);
      }

      const checkPassword = await passwordCompare(password, customer.password);

      if (!checkPassword) {
        throw new CustomError("Incorrect password, input the correct details and try again", 401);
      }

      return generateAuthResponse(customer);
    } catch (err) {
      throw err;
    }
  }

  getAllCustomers() {
    return this.customerRepository.findAll();
  }

  getCustomerById(id) {
    return this.customerRepository.findById(id);
  }

  getCustomerByEmail(email) {
    return this.customerRepository.findByEmail(email);
  }

  createCustomer(customerData) {
    return this.customerRepository.create(customerData);
  }

  updateCustomer(id, customerData) {
    return this.customerRepository.update(id, customerData);
  }

  deleteCustomer(id) {
    return this.customerRepository.delete(id);
  }
}

export default CustomerService;
