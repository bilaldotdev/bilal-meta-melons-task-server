import { Sequelize } from 'sequelize';
import { PG_PASSWORD, PG_PORT, PG_USERNAME } from '../config/index.mjs';

const sequelizeInstance = new Sequelize({
  host: 'localhost',
  port: PG_PORT,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  dialect: 'postgres',
});

export const getSequelize = () => sequelizeInstance;

/**
 * @returns {Promise<sequelizeInstance>|Promise<null>}
 */
export const initDB = async () => {
  const sequelize = getSequelize();
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
    console.log('DB Connection has been established!');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return null;
  }
};
