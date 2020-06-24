'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Ticket, { foreignKey: 'userId' });
  };

  User.prototype.imageUrl =  function(url){
    if(url.match(/www.dropbox.com/)){
      let regex = /www.dropbox.com/;
      let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
      imageUrl = imageUrl.replace( /[?]dl=0/, '' );
      return imageUrl;
    }
  }

  return User;
};