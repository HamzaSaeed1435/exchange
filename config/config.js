
const dotenv = require('dotenv');
dotenv.config();
  
  
  const loadEnvironmentConfig = () => {
    const environment = process.env.NODE_ENV || 'dev'; // Default to dev if NODE_ENV is not set
    const config = {};

    if (environment === 'dev') {
        config.DB_DATABASE = process.env.DEV_DB_DATABASE;
        config.DB_USERNAME = process.env.DEV_DB_USERNAME;
        config.DB_PASSWORD = process.env.DEV_DB_PASSWORD;
        config.DB_HOST = process.env.DEV_DB_HOST;
        config.DB_PORT = process.env.DEV_DB_PORT;
        config.JWT_SECRET = process.env.DEV_JWT_SECRET;
        config.REFRESH_TOKEN_SECRET = process.env.DEV_REFRESH_TOKEN_SECRET;
    } else if (environment === 'production') {
        config.DB_DATABASE = process.env.PRODUCTION_DB_DATABASE;
        config.DB_USERNAME = process.env.PRODUCTION_DB_USERNAME;
        config.DB_PASSWORD = process.env.PRODUCTION_DB_PASSWORD;
        config.DB_HOST = process.env.PRODUCTION_DB_HOST;
        config.DB_PORT = process.env.PRODUCTION_DB_PORT;
    }

    return config;
}

const config = loadEnvironmentConfig();

module.exports = config;