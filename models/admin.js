'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    superAdmin: DataTypes.BOOLEAN
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
    Admin.hasMany(models.Brand, {
      foreignKey: 'adminId'
    });

    Admin.hasMany(models.Type, {
      foreignKey: 'adminId'
    })

    Admin.hasMany(models.Product, {
      foreignKey: 'adminId'
    })
  };
  return Admin;
};