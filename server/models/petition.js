module.exports = (sequelize, DataTypes) => {
  const Petition = sequelize.define('Petition', {
    createdBy: DataTypes.UUID,
    office: DataTypes.INTEGER,
    body: DataTypes.STRING,
  }, {});

  return Petition;
};
