const Sequelize = require('sequelize');
const { DatabaseEnv } = require('../config/config');

const sequelize = new Sequelize(DatabaseEnv.database, DatabaseEnv.user, DatabaseEnv.password, {
    host: DatabaseEnv.host,
    dialect: 'mysql'
});  
        


module.exports = sequelize;