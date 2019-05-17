module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Petitions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdBy: {
      type: Sequelize.UUID,
    },
    office: {
      type: Sequelize.INTEGER,
    },
    body: {
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
  }),

  down: queryInterface => queryInterface.dropTable('Petitions'),
};
