'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id',
          as: 'userId'
        }
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      payment: {
        type: Sequelize.ENUM(['paypal', 'devit', 'oxxo']),
        allowNull: false,
      },
      bancAccount: {
        type: Sequelize.BIGINT,
        validate:{
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
          max: 16,
          min: 16
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
    return queryInterface.dropTable('Tickets');
  }
};