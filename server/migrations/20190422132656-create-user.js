'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
      .then(() => queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        firstname: {
          allowNull: false,
          type: Sequelize.STRING
        },
        lastname: {
          allowNull: false,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        phoneNumber: {
          type: Sequelize.STRING,
          validate: {
            not: ['[a-z]', 'i']
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isAdmin: {
          allowNull: false,
          type: Sequelize.ENUM('0', '1'),
          defaultValue: '0'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};