'use strict';

module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    hqAddress: DataTypes.STRING,
    logoUrl: {
      type: DataTypes.STRING
    }
  }, {});
  Party.associate = function(models) {
    // associations can be defined here
  };
  return Party;
};
