'use strict';

module.exports = (sequelize, DataTypes) => {
  const Petition = sequelize.define('Petition', {
    createdBy: DataTypes.UUID,
    office: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Petition.associate = function(models) {
    // associations can be defined here
  };
  return Petition;
};
