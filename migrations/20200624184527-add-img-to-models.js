'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'img',
        {
          type: Sequelize.STRING,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Brands',
        'img',
        {
          type: Sequelize.STRING,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Products',
        'img',
        {
          type: Sequelize.STRING,
          defaultValue: ''
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'img'),
      queryInterface.removeColumn('Brands', 'img'),
      queryInterface.removeColumn('Products', 'img')
    ])
  }
};
