const { Sequelize } = require('sequelize');
const { dbConfig } = require('./configs/configuration');
const logger = require('./logger');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    define: {
      freezeTableName: true,
    },
    logging: (msg) => logger.info(msg),
  }
);

const testF = async () => {
  console.log('testF: ', dbConfig.database, dbConfig.user, dbConfig.password, dbConfig.dialect, dbConfig.host, dbConfig.port);
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.debug('Unable to connect to the database:', error);
  }
};

testF();

module.exports = sequelize;
