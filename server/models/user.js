'use strict';

import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        not: ['[a-z]', 'i']
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0'
    }
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  User.lookupEmail = async (email) => {
    const user = await User.findOne({ where: { email }});
    if (user) {
      return Promise.reject('Email is already in use')
    } else {
      return Promise.resolve('Email has not been used')
    }
  };

  User.findByLogin = async (login) => {
    const user = await User.findOne({
      where: { email: login }
    });
    return user;
  }

  User.prototype.hashPassword = (user) => user.password = bcrypt.hashSync(
    user.password, bcrypt.genSaltSync(8)
  );

  User.prototype.isCorrectPassword = (reqPassword, user) => bcrypt.compareSync(reqPassword, user.password);

  User.beforeCreate((user) => {
    if (user.password) {
      return user.hashPassword(user);
    }
  });

  return User;
};
