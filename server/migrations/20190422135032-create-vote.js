module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    createdBy: {
      type: Sequelize.UUID,
    },
    office: {
      type: Sequelize.INTEGER,
    },
    candidate: {
      type: Sequelize.INTEGER,
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

  down: queryInterface => queryInterface.dropTable('Votes'),
};
