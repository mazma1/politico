'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OfficeTypes', [
      {
        id: 1,
        type: 'federal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        type: 'state',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        type: 'legislative',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: 4,
        type: 'local government',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: queryInterface => queryInterface.bulkDelete('OfficeTypes', null, {})
};
