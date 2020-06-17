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

    Type.belongsToMany(models.Brand, { through: 'BrandTypes' });

    Type.hasMany(models.Product, {
      foreignKey: 'typeId'
    });

  };
  return Type;
};