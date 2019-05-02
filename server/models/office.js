'use strict';

module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('Office', {
    type: {
      allowNull: false,
      type:DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Office.associate = function(models) {
    // associations can be defined here
  };
  return Office;
};
