'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'country',
        {
          type: Sequelize.STRING,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Users',
        'city',
        {
          type: Sequelize.STRING,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Users',
        'address',
        {
          type: Sequelize.STRING,
          defaultValue: ''
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'country'),  
      queryInterface.removeColumn('Users', 'city'),
      queryInterface.removeColumn('Users', 'address')
    ])
  }
};
