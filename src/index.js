import app from "./app.js";
import dotenv from "dotenv";
import logger from "./utils/log/logger.js";
import { connectDatabase } from "./database/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});
