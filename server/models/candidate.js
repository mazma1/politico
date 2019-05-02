'use strict';

module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define('Candidate', {
    office: DataTypes.INTEGER,
    party: DataTypes.UUID,
    candidate: DataTypes.UUID
  }, {});
  Candidate.associate = function(models) {
    // associations can be defined here
  };
  return Candidate;
};
