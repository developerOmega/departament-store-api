'use strict';
module.exports = (sequelize, DataTypes) => {
  const TicketProduct = sequelize.define('TicketProduct', {
    ticketId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {});
  TicketProduct.associate = function(models) {
    // associations can be defined here

    TicketProduct.belongsTo( models.Ticket, {foreignKey: 'ticketId', as: 'Tickets', /*onDelete: 'CASCADE'*/} );
    TicketProduct.belongsTo( models.Product, { foreignKey: 'productId', as: 'Products', /*onDelete: 'CASCADE'*/ } )

  };
  return TicketProduct;
};