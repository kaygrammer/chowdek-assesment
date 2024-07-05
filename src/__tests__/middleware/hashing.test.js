import bcrypt from "bcrypt";
import PasswordService from "../../middleware/hashing.js";

jest.mock("bcrypt");

describe("PasswordService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hash", () => {
    it("should hash the password successfully", async () => {
      const data = "password123";
      const salt = "randomsalt";
      const hashedPassword = "hashedpassword123";

      bcrypt.genSalt.mockResolvedValue(salt);
      bcrypt.hash.mockResolvedValue(hashedPassword);

      const result = await PasswordService.hash(data);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(PasswordService.saltRounds);
      expect(bcrypt.hash).toHaveBeenCalledWith(data, salt);
      expect(result).toEqual(hashedPassword);
    });

    it("should handle errors during hashing", async () => {
      const data = "password123";
      const errorMessage = "Hashing failed";

      bcrypt.genSalt.mockRejectedValue(new Error(errorMessage));

      await expect(PasswordService.hash(data)).rejects.toThrow(Error);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(PasswordService.saltRounds);
    });
  });

  describe("compare", () => {
    it("should compare passwords successfully", async () => {
      const data = "password123";
      const hash = "hashedpassword123";
      const comparisonResult = true;

      bcrypt.compare.mockResolvedValue(comparisonResult);

      const result = await PasswordService.compare(data, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(data, hash);
      expect(result).toEqual(comparisonResult);
    });

    it("should handle errors during comparison", async () => {
      const data = "password123";
      const hash = "hashedpassword123";
      const errorMessage = "Comparison failed";

      bcrypt.compare.mockRejectedValue(new Error(errorMessage));

      await expect(PasswordService.compare(data, hash)).rejects.toThrow(Error);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, hash);
    });
  });
});
