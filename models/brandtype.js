'use strict';
module.exports = (sequelize, DataTypes) => {
  const BrandType = sequelize.define('BrandType', {
    brandId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    typeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {});
  BrandType.associate = function(models) {
    // associations can be defined here
    // models.Brands.belongsToMany(models.Types, { through: BrandType });
    // models.Types.belongsToMany(models.Brands, { through: BrandType });
    BrandType.belongsTo(models.Brand, {foreignKey: "brandId", as: 'Brands'})
    BrandType.belongsTo(models.Type, {foreignKey: "typeId", as: 'Types'})
  };
  return BrandType;
};