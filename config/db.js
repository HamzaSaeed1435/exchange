const Sequelize = require('sequelize');
const config = require('./config');

const db = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgresql',
});

// Function to start the database connection
async function startConnection() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        return db;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw new Error('Failed to establish database connection');
    }
}

// Function to close the database connection
async function closeConnection() {
    try {
        await db.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw new Error('Failed to close database connection');
    }
}

module.exports = db;
