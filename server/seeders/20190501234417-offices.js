module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Offices', [
    {
      id: 1,
      type: 1,
      name: 'President',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      type: 1,
      name: 'Vice President',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      type: 2,
      name: 'Governor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      type: 2,
      name: 'Deputy Governor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Offices', null, {}),
};
