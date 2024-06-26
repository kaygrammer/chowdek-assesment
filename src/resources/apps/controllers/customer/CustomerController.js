import CustomerService from "../../services/customer/CustomerService.js";
import { successResMsg, errorResMsg } from "../../../../utils/lib/response.js";
import { CustomError, NotFoundError } from "../../../../utils/lib/custom-error-handler.js";
import { customerSchema } from "../../../../utils/validation/validation.js";

const customerService = new CustomerService();

class CustomerController {
  async listCustomers(req, res) {
    try {
      const customers = await customerService.getAllCustomers();

      if (!customers || customers.length === 0) {
        throw new NotFoundError("Customers not found");
      }

      return successResMsg(res, 200, {
        message: "customers fetched successfully",
        customers,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "oops something went wrong...");
      }
    }
  }

  async getCustomer(req, res) {
    const { id } = req.params;
    try {
      const customer = await customerService.getCustomerById(id);
      if (!customer) {
        throw new NotFoundError("Customers not found");
      }
      return successResMsg(res, 200, {
        message: "customers fetched successfully",
        customer,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "oops something went wrong...");
      }
    }
  }

  async getCustomerByEmail(req, res) {
    const { email } = req.body;
    try {
      const customer = await customerService.getCustomerByEmail(email);
      if (!customer) {
        throw new NotFoundError("Customers not found");
      }
      return successResMsg(res, 200, {
        message: "customers fetched successfully",
        customer,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "oops something went wrong...");
      }
    }
  }

  async createCustomer(req, res) {
    const customerData = req.body;
    try {
      const newCustomer = await customerService.createCustomer(customerData);
      return successResMsg(res, 200, {
        message: "customers fetched successfully",
        newCustomer,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "oops something went wrong...");
      }
    }
  }

  async updateCustomer(req, res) {
    const { id } = req.params;
    const customerData = req.body;
    try {
      const updatedCustomer = await customerService.updateCustomer(id, customerData);
      return successResMsg(res, 200, {
        message: "customers updated successfully",
        updatedCustomer,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "oops something went wrong...");
      }
    }
  }

  async deleteCustomer(req, res) {
    const { id } = req.params;
    try {
      await customerService.deleteCustomer(id);

      return successResMsg(res, 200, {
        message: "customer deleted successfully",
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "oops something went wrong...");
      }
    }
  }
}

export default new CustomerController();
