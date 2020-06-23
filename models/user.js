'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Ticket, { foreignKey: 'userId' });
  };
  return User;
};