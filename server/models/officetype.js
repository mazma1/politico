'use strict';

module.exports = (sequelize, DataTypes) => {
  const OfficeType = sequelize.define('OfficeType', {
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  OfficeType.associate = function(models) {
    // associations can be defined here
  };
  return OfficeType;
};
