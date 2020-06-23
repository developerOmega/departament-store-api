'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TicketProducts', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      ticketId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Tickets',
          key: 'id',
          as: 'ticketId'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TicketProducts');
  }
};