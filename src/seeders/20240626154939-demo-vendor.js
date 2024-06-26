"use strict";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert(
      "Vendors",
      [
        {
          id: uuidv4(),
          name: "Vendor One",
          description: "This is the first vendor",
          email: "vendor1@example.com",
          phone: "1234567890",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Vendor Two",
          description: "This is the second vendor",
          email: "vendor2@example.com",
          phone: "0987654321",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Vendors", null, {});
  },
};
