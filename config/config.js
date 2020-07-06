const fs = require('fs');
const { DatabaseEnv } = require('../server/config/config');

module.exports = {
  development: {
    username: "postgres",
    password: "1234",
    database: "departament_store",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: DatabaseEnv.user,
    password: DatabaseEnv.password,
    database: DatabaseEnv.database,
    host: DatabaseEnv.host,
    dialect: DatabaseEnv.dialect,
    // ssl: true,
    // dialectOptions: {
    //     "ssl": true
    // }
  }
};