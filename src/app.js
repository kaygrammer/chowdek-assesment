import express from "express";
import customerRoutes from "./resources/apps/routes/customerRoutes.js";
import vendorRoutes from "./resources/apps/routes/vendorRoutes.js";
import menuRoutes from "./resources/apps/routes/menuRoutes.js";
import sequelize from "./database/db.js";
import logger from "./utils/log/logger.js";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Kitchen Backend 💵💵💵");
});

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/menus", menuRoutes);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync();
    //await sequelize.sync({ alter: true, force: true });
    console.log("Database models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectDatabase();
export default app;
