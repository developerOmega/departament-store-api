'use strict';

// const { INTEGER } = require("sequelize/types");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Admin, {
      foreignKey: "adminId"
    });

    Product.belongsTo(models.Brand, {
      foreignKey: "brandId",
      onDelete: 'CASCADE'
    });

    Product.belongsTo(models.Type, {
      foreignKey: "typeId"
    });
  };
  return Product;
};