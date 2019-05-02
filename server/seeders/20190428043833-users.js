'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstname: 'Emmanuel',
        lastname: 'Akas',
        email: 'emma@ymail.com',
        phoneNumber: '08035754567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Mary',
        lastname: 'Mazi',
        email: 'mary@ymail.com',
        phoneNumber: '08035754568',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
