'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parties', [
      {
        name: 'Young Progressive Party',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fresh Dew Party',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: queryInterface => queryInterface.bulkDelete('Parties', null, {})
};
