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
    img: {
      type: DataTypes.STRING, 
      defaultValue: ''  
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
    },
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

    Product.belongsToMany( models.Ticket, { through: 'TicketProducts' } );
  };

  Product.prototype.imageUrl =  function(url){
    if(url.match(/www.dropbox.com/)){
      let regex = /www.dropbox.com/;
      let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
      imageUrl = imageUrl.replace( /[?]dl=0/, '' );
      return imageUrl;
    }
  }

  return Product;
};