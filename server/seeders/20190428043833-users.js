const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@ymail.com',
      phoneNumber: '08035754569',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
      isAdmin: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: 'Emmanuel',
      lastname: 'Akas',
      email: 'emma@ymail.com',
      phoneNumber: '08035754567',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
      isAdmin: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: 'Mary',
      lastname: 'Mazi',
      email: 'mary@ymail.com',
      phoneNumber: '08035754568',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
      isAdmin: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
