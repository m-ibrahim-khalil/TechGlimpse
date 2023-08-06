const { Sequelize } = require("sequelize");
const { logger } = require("../logger");
const { environment } = require("./environment.config");

const db = new Sequelize({
  dialect: environment.DB_DIALECT,
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  database: environment.DB_NAME,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  logging: environment.NODE_ENV === "development" ? (msg) => logger.info(msg): false,
});

async function connectToDb(forceSync = false) {
  try {
    await db.authenticate();
    logger.info('Connection has been established successfully.');
    await db.sync({ force: forceSync });
    logger.info("db synced...");
  } catch (error) {
    logger.debug("Unable to connect to the db:", error);
  }
}

module.exports = { db, connectToDb };