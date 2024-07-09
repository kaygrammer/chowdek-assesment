import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = process.env.DATA_BASE;
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(db, userName, password, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync();
    console.log("Database models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function disconnectDatabase() {
  try {
    await sequelize.close();
    console.log("Database connection closed successfully.");
  } catch (error) {
    console.error("Unable to close the database:", error);
  }
}

export { sequelize, connectDatabase, disconnectDatabase };
