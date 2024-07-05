// import bcrypt from "bcrypt";
// const saltRounds = 10;

// export const passwordHash = async (data) => {
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(data, salt);
//     return hash;
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     throw new Error("Hashing failed");
//   }
// };

// export const passwordCompare = async (data, hash) => {
//   try {
//     return await bcrypt.compare(data, hash);
//   } catch (error) {
//     console.error("Error comparing password:", error);
//     throw new Error("Comparison failed");
//   }
// };

import bcrypt from "bcrypt";

class PasswordService {
  static saltRounds = 10;

  static async hash(data) {
    try {
      const salt = await bcrypt.genSalt(PasswordService.saltRounds);
      const hash = await bcrypt.hash(data, salt);
      return hash;
    } catch (error) {
      throw new Error("Hashing failed");
    }
  }

  static async compare(data, hash) {
    try {
      return await bcrypt.compare(data, hash);
    } catch (error) {
      throw new Error("Comparison failed");
    }
  }
}

export default PasswordService;
