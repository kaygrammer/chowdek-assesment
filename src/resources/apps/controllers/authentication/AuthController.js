import CustomerService from "../../services/customer/CustomerService.js";
import VendorService from "../../services/vendor/VendorService.js";
import { successResMsg, errorResMsg } from "../../../../utils/lib/response.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";
import { customerSchema } from "../../../../utils/validation/validation.js";

const customerService = new CustomerService();
const vendorService = new VendorService();

class AuthController {
  async customerSignup(req, res) {
    try {
      const customerData = req.body;
      const { error } = customerSchema.validate(req.body);
      if (error) {
        return errorResMsg(res, 400, error.message);
      }

      const response = await customerService.register(customerData);

      return successResMsg(res, 201, {
        message: "Customer registered successfully",
        ...response,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async customerLogin(req, res) {
    const { email, password } = req.body;
    try {
      const response = await customerService.login(email, password);
      return successResMsg(res, 200, {
        message: "Customer logged in successfully",
        ...response,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async vendorSignup(req, res) {
    try {
      const customerData = req.body;
      const response = await vendorService.register(customerData);

      return successResMsg(res, 201, {
        message: "Vendor registered successfully",
        ...response,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, err.message);
      }
    }
  }

  async vendorLogin(req, res) {
    const { email, password } = req.body;
    try {
      const response = await vendorService.login(email, password);
      return successResMsg(res, 200, {
        message: "Vendor logged in successfully",
        ...response,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }
}

export default new AuthController();
