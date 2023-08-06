const { Sequelize } = require('sequelize');
const { db } = require('./configs/db.config');
const logger = require('./logger');

const sequelize = new Sequelize(
  db.database,
  db.user,
  db.password,
  {
    dialect: db.dialect,
    host: db.host,
    define: {
      freezeTableName: true,
    },
    logging: (msg) => logger.info(msg),
  }
);

const testF = async () => {
  console.log('testF: ', db.database, db.user, db.password, db.dialect, db.host, db.port);
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.debug('Unable to connect to the database:', error);
  }
};

testF();

module.exports = sequelize;
