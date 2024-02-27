const config = require('../config/config')


const Sequelize = require('sequelize');
console.log('config',config);
const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgresql'
});


module.exports = sequelize;