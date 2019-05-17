module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Candidates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    office: {
      type: Sequelize.INTEGER,
    },
    party: {
      type: Sequelize.UUID,
    },
    candidate: {
      type: Sequelize.UUID,
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

  down: queryInterface => queryInterface.dropTable('Candidates'),
};
