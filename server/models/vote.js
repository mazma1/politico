'use strict';

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    createdBy: DataTypes.UUID,
    office: DataTypes.INTEGER,
    candidate: DataTypes.INTEGER
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
  };
  return Vote;
};
