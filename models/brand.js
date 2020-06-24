'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    img: {
      type: DataTypes.STRING, 
      defaultValue: ''  
    },
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

  Brand.prototype.imageUrl =  function(url){
    if(url.match(/www.dropbox.com/)){
      let regex = /www.dropbox.com/;
      let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
      imageUrl = imageUrl.replace( /[?]dl=0/, '' );
      return imageUrl;
    }
  }

  return Brand;
};