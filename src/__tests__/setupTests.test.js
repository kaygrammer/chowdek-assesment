import supertest from "supertest";
import app from "../app.js";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

global.request = supertest(app);

const sequelize = new Sequelize(process.env.DATA_BASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

// Mock implementations for CustomerRepository and PasswordService
jest.mock("../../src/resources/apps/repositories/customer/CustomerRepository.js");
jest.mock("../../src/middleware/hashing.js");
jest.mock("../../src/middleware/isAuthenticated.js");

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Menu Endpoints", () => {
  it("should get a welcome message", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Welcome to Kitchen Backend 💵💵💵");
  });
});
