import jwt from "jsonwebtoken";
import AuthMiddleware from "../../middleware/isAuthenticated.js";
import VendorRepository from "../../resources/apps/repositories/vendor/VendorRepository.js";
import { errorResMsg } from "../../utils/lib/response.js";
import { generateAuthResponse } from "../../middleware/isAuthenticated.js";

jest.mock("jsonwebtoken");
jest.mock("../../resources/apps/repositories/vendor/VendorRepository.js");

jest.mock("../../utils/lib/response.js", () => ({
  errorResMsg: jest.fn(),
}));

describe("AuthMiddleware", () => {
  let req, res, next;
  const mockedUserId = "1234567890";
  const mockedToken = "mocked.token.string";
  const authMiddleware = new AuthMiddleware();

  beforeEach(() => {
    req = {
      headers: {
        authorization: `Bearer ${mockedToken}`,
      },
      user: null,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("isAuthenticated", () => {
    it("should pass authentication and set user in request", async () => {
      const mockedDecodedToken = { id: mockedUserId };

      jwt.verify.mockReturnValue(mockedDecodedToken);

      await authMiddleware.isAuthenticated(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(mockedToken, process.env.JWT_SECRET);
      expect(req.user).toEqual(mockedDecodedToken);
      expect(next).toHaveBeenCalled();
    });

    it("should fail authentication with missing token", async () => {
      req.headers.authorization = undefined;

      await authMiddleware.isAuthenticated(req, res, next);

      expect(errorResMsg).toHaveBeenCalledWith(res, 401, "Authentication failed: 🔒🔒🔒🔒🔒");
      expect(next).not.toHaveBeenCalled();
    });

    it("should fail authentication with invalid token", async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await authMiddleware.isAuthenticated(req, res, next);

      expect(errorResMsg).toHaveBeenCalledWith(res, 401, "Authentication failed: 🔒🔒🔒🔒🔒");
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("isVendor", () => {
    it("should pass if user is a vendor", async () => {
      const mockedVendor = { id: mockedUserId, name: "Vendor Name", email: "vendor@example.com" };

      req.user = { id: mockedUserId };
      VendorRepository.findById.mockResolvedValue(mockedVendor);

      await authMiddleware.isVendor(req, res, next);

      expect(VendorRepository.findById).toHaveBeenCalledWith(mockedUserId);
      expect(next).toHaveBeenCalled();
    });

    it("should fail if user is not a vendor", async () => {
      req.user = { id: mockedUserId };
      VendorRepository.findById.mockResolvedValue(null);

      await authMiddleware.isVendor(req, res, next);

      expect(errorResMsg).toHaveBeenCalledWith(res, 401, "You must be a vendor to access this contents");
      expect(next).not.toHaveBeenCalled();
    });

    it("should handle errors during vendor check", async () => {
      req.user = { id: mockedUserId };
      const errorMessage = "Database error";
      VendorRepository.findById.mockRejectedValue(new Error(errorMessage));

      await authMiddleware.isVendor(req, res, next);

      expect(errorResMsg).toHaveBeenCalledWith(res, 403, errorMessage);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("generateAuthResponse", () => {
    const mockedPayload = { id: "user_id", name: "John Doe", email: "john.doe@example.com" };
    const mockedToken = "mocked.token.string";

    beforeEach(() => {
      jwt.sign.mockReturnValue(mockedToken);
    });

    it("should generate auth response with token and user information", () => {
      const expectedToken = mockedToken;
      const expectedUser = {
        id: mockedPayload.id,
        name: mockedPayload.name,
        email: mockedPayload.email,
      };

      const authResponse = generateAuthResponse(mockedPayload);

      expect(jwt.sign).toHaveBeenCalledWith({ id: mockedPayload.id }, process.env.JWT_SECRET, {
        expiresIn: "2day",
      });

      expect(authResponse.token).toEqual(expectedToken);
      expect(authResponse.user).toEqual(expectedUser);
    });
  });
});
