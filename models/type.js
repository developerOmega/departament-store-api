'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING,
    adminId: DataTypes.INTEGER
  }, {});
  Type.associate = function(models) {
    Type.belongsTo(models.Admin, {
      foreignKey: "adminId"
    })

    Type.belongsToMany(models.Brand, { as: 'Brands', through: 'BrandTypes', foreignKey: 'typeId' });

    Type.hasMany(models.Product, {
      foreignKey: 'typeId'
    });

  };
  return Type;
};