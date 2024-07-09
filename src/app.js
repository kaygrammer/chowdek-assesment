import express from "express";
import customerRoutes from "./resources/apps/routes/customerRoutes.js";
import vendorRoutes from "./resources/apps/routes/vendorRoutes.js";
import menuRoutes from "./resources/apps/routes/menuRoutes.js";
import { successResMsg } from "./utils/lib/response.js";
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
  return successResMsg(res, 200, {
    message: "Welcome to Kitchen Backend 💵💵💵",
  });
});

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/menus", menuRoutes);

export default app;
