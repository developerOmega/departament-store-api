'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    adminId: DataTypes.INTEGER
  }, {});
  Brand.associate = function(models) {
    // associations can be defined here
    Brand.belongsTo(models.Admin, {
      foreignKey: 'adminId'
    });

    Brand.belongsToMany(models.Type, { through: 'BrandTypes' });

    Brand.hasMany(models.Product, {
      foreignKey: 'brandId'
    })

  };
  return Brand;
};