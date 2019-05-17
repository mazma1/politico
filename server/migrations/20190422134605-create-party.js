module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    .then(() => queryInterface.createTable('Parties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hqAddress: {
        type: Sequelize.STRING,
      },
      logoUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })),

  down: queryInterface => queryInterface.dropTable('Parties'),
};
