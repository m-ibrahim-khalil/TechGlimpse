import { Sequelize } from "sequelize";
import { logger } from "../logger.js";
import { environment } from "./environment.config.js";

export const dbConfig = new Sequelize({
  dialect: environment.DB_DIALECT,
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  database: environment.DB_NAME,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  logging: environment.NODE_ENV === "development" ? (msg) => logger.info(msg): false,
});

export async function connectToDatabase(forceSync = false) {
  try {
    await database.authenticate();
    logger.info('Connection has been established successfully.');
    await database.sync({ force: forceSync });
    logger.info("Database synced...");
  } catch (error) {
    logger.debug("Unable to connect to the database:", error);
  }
}
