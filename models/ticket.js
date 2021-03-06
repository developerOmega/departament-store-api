'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    payment: {
      type: DataTypes.ENUM(['paypal', 'devit', 'oxxo']),
      allowNull: false
    },
    bancAccount: {
      type:DataTypes.BIGINT,
      validate: {
        ifPaymentDevitNull(value){
          if(this.payment !== 'devit' && value != null){
            throw new Error('No es necesario ingresar el número de cuenta')
          }
        },
        ifPaymentDevitAccountNull(value){
          if(this.payment === 'devit' && value == null){
            throw new Error("El número de cuenta no puede estar vacío")
          }
        },
        max: 9999999999999999,
        min: 1000000000000000
      }
    }
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
    Ticket.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Ticket.belongsToMany(models.Product, {as: 'Products', through: 'TicketProducts', foreignKey: 'ticketId'});

  };
  return Ticket;
};