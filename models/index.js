const sequelize = require('./sequelize');
const fs = require('fs');
const path = require('path');

const connect = async ({ sync = false, force = false, alter = false }) => {
    await sequelize.authenticate();

    const models = fs.readdirSync(path.join(__dirname, '/'));

    for (let [index, model] of models.entries()) {
        model = require(path.join(__dirname, '/', model));
        if (model && model.tableName) {
            sequelize.models[model] = model;
            models[index] = model;
        }
    }

    for (const model of models) {
        if (model && model.associate) {
            model.associate(sequelize.models)
        }
    }
    
    // sequelize.sync({ force: true });

    if (sync) {
        sequelize.sync();
    }

    if (force) {
        sequelize.sync({ force: true });
    }

    if (alter) {
        sequelize.sync({ alter: true });
    }

}
module.exports = {
    User: require('./user'),
    connect
};