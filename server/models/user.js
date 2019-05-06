'use strict';

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
  
  return User;
};
