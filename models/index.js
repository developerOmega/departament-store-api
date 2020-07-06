'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json');
const { DatabaseEnv } = require('../server/config/config');
const db = {};

config.production.username = DatabaseEnv.user;
config.production.password = DatabaseEnv.password;
config.production.database = DatabaseEnv.database;
config.production.host = DatabaseEnv.host;

let sequelize = new Sequelize(DatabaseEnv.database, DatabaseEnv.user, DatabaseEnv.password, {
  dialect: DatabaseEnv.dialect
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
