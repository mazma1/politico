const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstname: 'Emmanuel',
      lastname: 'Akas',
      email: 'emma@ymail.com',
      phoneNumber: '08035754567',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: 'Mary',
      lastname: 'Mazi',
      email: 'mary@ymail.com',
      phoneNumber: '08035754568',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
